import React, { useState, useEffect, useRef } from 'react';
import type { NavigationTarget } from '../types';

// --- SEO Hook ---
export const useSEOMetadata = (title: string, description: string) => {
    useEffect(() => {
        if (document.title !== title) {
            document.title = title;
        }

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        
        metaDescription.setAttribute('content', description);

    }, [title, description]);
};

// --- LeadMagnetBanner Component ---

interface LeadMagnetBannerProps {
    title: string;
    description: string;
    imageUrl: string;
    formId: string;
    redirectUrl: string;
    formspreeEndpoint: string;
    layout?: 'vertical' | 'horizontal' | 'compact';
    imageFit?: 'cover' | 'contain';
    imageClassName?: string;
}

export const LeadMagnetBanner: React.FC<LeadMagnetBannerProps> = ({ title, description, imageUrl, formId, redirectUrl, formspreeEndpoint, layout = 'vertical', imageFit = 'cover', imageClassName = '' }) => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        const formData = new FormData();
        formData.append('email', email);

        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' },
            });

            if (response.ok) {
                setIsSubmitted(true);
                setTimeout(() => {
                    window.location.href = redirectUrl;
                }, 1500);
            } else {
                setError('Hubo un error al registrar tu correo. Inténtalo de nuevo.');
            }
        } catch (err) {
            setError('Hubo un error de red. Por favor, revisa tu conexión.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formElement = (
        <div className="mt-auto pt-6 w-full">
            {isSubmitted ? (
                <div className="text-center p-3 bg-green-100 text-green-800 rounded-md">
                    <p className="font-semibold">¡Gracias! Serás redirigido...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            id={`email-${formId}`}
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Tu mejor correo electrónico"
                            required
                            className="flex-grow p-3 bg-gray-100 border-transparent rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors text-sm"
                            disabled={isSubmitting}
                        />
                        <button 
                            type="submit" 
                            className="bg-cyan-600 text-white font-bold py-3 px-5 rounded-md hover:bg-cyan-700 transition-colors shadow disabled:bg-gray-400 text-sm"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? '...' : '¡LA QUIERO!'}
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>
            )}
        </div>
    );

    if (layout === 'compact') {
        return (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100/80 p-6 h-full flex flex-col text-center items-center justify-center group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <h2 className="text-xl font-bold font-montserrat text-cyan-700 uppercase" dangerouslySetInnerHTML={{ __html: title }}></h2>
                <div className="mt-2 text-gray-600 text-sm leading-relaxed flex-grow text-justify" dangerouslySetInnerHTML={{ __html: description }}></div>
                {formElement}
            </div>
        );
    }
    
    if (layout === 'horizontal') {
        return (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100/80 overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col md:flex-row items-center">
                <div className="p-6 md:p-12 flex flex-col justify-center flex-grow md:w-1/2 w-full text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold font-montserrat text-cyan-700 uppercase" dangerouslySetInnerHTML={{ __html: title }}></h2>
                    <div className="mt-6 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }}></div>
                    <div className="w-full max-w-md mx-auto">{formElement}</div>
                </div>
                <div className="md:w-1/2 w-full flex-shrink-0 h-64 md:h-auto self-stretch">
                    <img src={imageUrl} alt={title} className={`w-full h-full object-${imageFit} ${imageClassName}`} />
                </div>
            </div>
        );
    }
    
    // Default vertical layout (for blog page)
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100/80 overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
            <div className={`w-full overflow-hidden ${imageFit === 'contain' ? 'h-96 bg-gray-50' : 'aspect-[16/9]'}`}>
                <img 
                    src={imageUrl} 
                    alt={title} 
                    className={`w-full h-full object-${imageFit} transition-transform duration-500 group-hover:scale-105 ${imageClassName}`} 
                />
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-cyan-700 text-center uppercase" dangerouslySetInnerHTML={{ __html: title }}></h2>
                <div className="mt-4 text-gray-600 leading-relaxed flex-grow text-justify" dangerouslySetInnerHTML={{ __html: description }}></div>
                {formElement}
            </div>
        </div>
    );
};


// --- ScrollToTopButton Component ---

export const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-cyan-600 text-white p-3 rounded-full shadow-lg hover:bg-cyan-700 transition-opacity duration-300 z-50"
                    aria-label="Volver arriba"
                >
                    <i className="fas fa-arrow-up text-xl"></i>
                </button>
            )}
        </>
    );
};

// --- CookieConsentBanner Component ---

interface CookieConsentBannerProps {
    onAccept: () => void;
    onReject: () => void;
    onConfigure: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onAccept, onReject, onConfigure }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 animate-fade-in-up">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-300">
                    Utilizamos cookies para mejorar tu experiencia en nuestro sitio. Al continuar, aceptas nuestra{' '}
                    <a href="#/cookies" onClick={(e) => { e.preventDefault(); onConfigure(); }} className="underline hover:text-cyan-400"><strong>Política de Cookies</strong></a>.
                </p>
                <div className="flex items-center gap-3 flex-shrink-0">
                    <button onClick={onAccept} className="bg-cyan-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-cyan-700 transition-colors">Aceptar</button>
                    <button onClick={onReject} className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-700 transition-colors">Rechazar</button>
                    <button onClick={onConfigure} className="text-gray-300 underline hover:text-white text-sm">Configurar</button>
                </div>
            </div>
        </div>
    );
};

// --- Footer Component ---
interface FooterProps {
    navigate: (target: NavigationTarget) => void;
}
export const Footer: React.FC<FooterProps> = ({ navigate }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-gray-300 font-inter">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h4 className="font-bold text-white text-lg font-montserrat">MILA CIUDAD</h4>
                        <p className="mt-4 text-sm text-gray-400"><strong>Salud Activa. No te doblegues.</strong> Acompañamiento y coaching para mujeres en la menopausia.</p>
                        <div className="mt-6 flex space-x-4">
                            <a href="https://www.youtube.com/@MilaCiudadCovers" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube"><i className="fab fa-youtube text-2xl"></i></a>
                            <a href="https://www.instagram.com/mila.ciudad/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram"><i className="fab fa-instagram text-2xl"></i></a>
                            <a href="https://es.linkedin.com/in/milaciudadcion" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn"><i className="fab fa-linkedin text-2xl"></i></a>
                        </div>
                    </div>
                    {/* Navigation Links */}
                    <div>
                        <h4 className="font-bold text-white text-lg font-montserrat">Navegación</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#/home" onClick={(e) => {e.preventDefault(); navigate('home')}} className="hover:text-white transition-colors">Inicio</a></li>
                            <li><a href="#/sobre-mi" onClick={(e) => {e.preventDefault(); navigate('sobre-mi')}} className="hover:text-white transition-colors">Sobre Mí</a></li>
                            <li><a href="#/servicios" onClick={(e) => {e.preventDefault(); navigate('servicios')}} className="hover:text-white transition-colors">Mi Método</a></li>
                            <li><a href="#/menopausia" onClick={(e) => {e.preventDefault(); navigate('menopausia')}} className="hover:text-white transition-colors">Recursos Menopausia</a></li>
                            <li><a href="#/blog" onClick={(e) => {e.preventDefault(); navigate('blog')}} className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#/contacto" onClick={(e) => {e.preventDefault(); navigate('contacto')}} className="hover:text-white transition-colors">Contacto</a></li>
                        </ul>
                    </div>
                    {/* Legal Links */}
                    <div>
                        <h4 className="font-bold text-white text-lg font-montserrat">Legal</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#/aviso-legal" onClick={(e) => {e.preventDefault(); navigate('aviso-legal')}} className="hover:text-white transition-colors">Aviso Legal</a></li>
                            <li><a href="#/privacidad" onClick={(e) => {e.preventDefault(); navigate('privacidad')}} className="hover:text-white transition-colors">Política de Privacidad</a></li>
                            <li><a href="#/cookies" onClick={(e) => {e.preventDefault(); navigate('cookies')}} className="hover:text-white transition-colors">Política de Cookies</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 py-4">
                <div className="container mx-auto px-6 text-center text-sm text-gray-500">
                    &copy; {currentYear} Mila Ciudad. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};

// Helper component for animations on scroll
export const AnimateOnScroll: React.FC<{ children: React.ReactNode; className?: string; animationClass?: string; delay?: string; threshold?: number }> = 
({ children, className = '', animationClass = 'animate-fade-in-up', delay = '0s', threshold = 0.15 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { root: null, rootMargin: '0px', threshold }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold]);

    return (
        <div 
            ref={ref} 
            className={`${className} ${isVisible ? animationClass : 'opacity-0'}`}
            style={{ animationDelay: delay }}
        >
            {children}
        </div>
    );
};