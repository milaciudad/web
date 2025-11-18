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

// --- PromotionalModal Component ---

interface PromotionalModalProps {
    onClose: () => void;
}

export const PromotionalModal: React.FC<PromotionalModalProps> = ({ onClose }) => {
    // State for toggling the form
    const [showForm, setShowForm] = useState(false);
    
    // States for form handling
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);
    
    // Form submission handler
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        const formData = new FormData();
        formData.append('email', email);
        formData.append('source', 'Promo Modal - Primer Capítulo Libro'); // Be specific

        try {
            // Using a new Formspree endpoint for this specific registration
            const response = await fetch('https://formspree.io/f/myzlyjva', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' },
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                setError('Hubo un error al registrar tu correo. Inténtalo de nuevo.');
            }
        } catch (err) {
            setError('Hubo un error de red. Por favor, revisa tu conexión.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[100] p-4 animate-fade-in"
            aria-modal="true"
            role="dialog"
            onClick={onClose} // Close on backdrop click
        >
            <div 
                className="relative bg-cyan-50 rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 flex flex-col lg:flex-row"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors z-20 p-2 leading-none bg-white/50 rounded-full"
                    aria-label="Cerrar"
                >
                    <i className="fas fa-times text-2xl"></i>
                </button>

                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center text-center order-2 lg:order-1">
                    
                    {!showForm ? (
                        <div className="animate-fade-in">
                            <h2 className="text-2xl sm:text-4xl font-extrabold font-montserrat uppercase tracking-wider gradient-text animate-gradient-text pb-2 leading-none">
                                Próximamente
                            </h2>
                            <div className="mt-6 md:mt-8 text-gray-700 font-lora leading-relaxed space-y-6">
                                <p className="font-lora italic text-lg sm:text-xl lg:text-2xl text-cyan-700 font-bold">
                                    Hablemos de lo que nadie habla.
                                </p>
                                <p className="text-base sm:text-lg lg:text-xl">
                                    La vida de Adriana aparentaba ser perfecta. Sin embargo, en su interior, la menopausia la estaba demoliendo: una metamorfosis que la obligó a enfrentar sus miedos más profundos para encontrar su verdadera liberación.
                                </p>
                                <p className="font-lora italic text-lg sm:text-xl lg:text-2xl text-cyan-700 font-bold">
                                    Porque tu historia también merece ser contada.
                                </p>
                            </div>

                            <div className="mt-8 md:mt-10">
                                <button 
                                    onClick={() => setShowForm(true)}
                                    className="inline-block bg-cyan-600 text-white font-bold py-3 px-6 rounded-full hover:bg-cyan-700 transition-colors shadow-lg transform hover:-translate-y-0.5 animate-pulse-cta text-sm sm:text-base"
                                >
                                    Lee la SINOPSIS de la novela
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="animate-fade-in w-full text-center">
                            <h2 className="text-2xl sm:text-3xl font-extrabold font-montserrat uppercase tracking-wider gradient-text animate-gradient-text pb-1">
                                Próximamente
                            </h2>
                            <h3 className="text-xl font-bold font-montserrat text-cyan-700">Sinopsis: La Metamorfosis de Adriana</h3>
                            <div className="mt-6 text-gray-700 space-y-4 text-justify text-base pr-4 overflow-y-auto max-h-[30vh] lg:max-h-[45vh]">
                                <p>Adriana Alcázar, una de las arquitectas más respetadas de Madrid, ha construido su vida con la misma precisión con la que diseña sus edificios: una carrera impecable, un matrimonio estable con Javier, un catedrático de Historia del Arte, y una familia de la que se siente orgullosa. A sus cincuenta años, Adriana es el epítome de la mujer que lo tiene todo bajo control. Pero bajo esa fachada de éxito, las primeras grietas comienzan a aparecer.</p>
                                <p>Una química interna e incontrolable empieza a demoler su mundo desde dentro. Sofocos que la asaltan en reuniones cruciales, lagunas de memoria que la humillan frente a clientes y la sensación de que su cuerpo se ha convertido en un territorio desconocido la sumen en una crisis silenciosa. Adriana lucha por mantener la normalidad, atribuyendo sus síntomas al estrés, mientras la distancia con Javier crece y la intimidad se convertirá en un campo de batalla emocional.</p>
                                <p>El detonante llega durante un cóctel en la facultad de Javier, donde conoce a Clara Fuentes, una joven y brillante académica cuya vitalidad y agilidad mental se convierten en un espejo cruel de todo lo que Adriana siente que está perdiendo. Este encuentro la obliga a confrontar una verdad aterradora: ya no es la mujer que era. Este torbellino personal se agrava cuando una desastrosa inversión amenaza con destruir el patrimonio familiar, desatando una crisis matrimonial que pone a prueba veinte años de amor y complicidad.</p>
                                <p>Acorralada por una crisis profesional, personal y financiera, y sintiendo que le está fallando incluso a la fundación que creó para ayudar a jóvenes diseñadores, Adriana debe tomar una decisión: seguir luchando por mantener en pie la vida que construyó o permitirse la demolición total para descubrir quién es realmente cuando ya no queda nada.</p>
                                <p>En el camino de la transformación Adriana se apoyará en su "cuartel general": su grupo de amigas de toda la vida. Es en estas cenas, entre copas de vino y confesiones nocturnas, donde descubre que no está sola en su batalla. Cada una de sus amigas libra su propia guerra contra la invisibilidad, las expectativas y los estragos del tiempo, tejiendo una red de sororidad que se convertirá en un refugio seguro.</p>
                                <p className="font-semibold italic text-cyan-800">La Metamorfosis de Adriana﻿ es una novela íntima y visceral sobre el viaje de una mujer a través de la menopausia, la crisis de la mediana edad y la reinvención. Una historia sobre la fragilidad del éxito, la fortaleza que se encuentra en la vulnerabilidad y la liberación que supone aceptar que, para poder volar, primero hay que dejar que todo se derrumbe.</p>
                            </div>
                        
                            <div className="mt-8 text-center">
                                <h4 className="text-xl font-bold text-gray-800">¡No te lo pierdas!</h4>
                                <p className="mt-2 text-gray-600">Introduce tu correo para ser de los primeros en recibir el capítulo de regalo.</p>
                                {isSubmitted ? (
                                     <div className="mt-6 text-center p-4 bg-green-100 text-green-800 rounded-md">
                                         <p className="font-semibold text-lg">¡Gracias por registrarte!</p>
                                         <p>Te avisaremos en cuanto el primer capítulo esté disponible.</p>
                                     </div>
                                 ) : (
                                     <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto">
                                         <div className="flex flex-col sm:flex-row gap-2">
                                             <label htmlFor="promo-modal-email" className="sr-only">Tu mejor correo electrónico</label>
                                             <input
                                                 type="email"
                                                 id="promo-modal-email"
                                                 name="email"
                                                 value={email}
                                                 onChange={(e) => setEmail(e.target.value)}
                                                 placeholder="Tu mejor correo electrónico"
                                                 required
                                                 className="flex-grow p-3 bg-gray-100 border-transparent rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors text-sm text-gray-900"
                                                 disabled={isSubmitting}
                                             />
                                             <button 
                                                 type="submit" 
                                                 className="bg-cyan-600 text-white font-bold py-3 px-5 rounded-md hover:bg-cyan-700 transition-colors shadow disabled:bg-gray-400 text-sm"
                                                 disabled={isSubmitting}
                                             >
                                                 {isSubmitting ? 'Registrando...' : '¡LO QUIERO!'}
                                             </button>
                                         </div>
                                         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                     </form>
                                 )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Image Column (order-1 on mobile, order-2 on desktop) */}
                <div className="lg:w-1/2 h-80 lg:h-auto order-1 lg:order-2 flex items-center justify-center p-6">
                    <img 
                        src="https://images.squidge.org/images/2025/11/16/Libro-Mila-Ciudad-La-metamorfosis-de-Adriana_11zon-1-Photoroom.png" 
                        alt="Próximamente: La metamorfosis de Adriana"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
};


// --- BookPromoModal Component ---

interface BookPromoModalProps {
    onClose: () => void;
}

export const BookPromoModal: React.FC<BookPromoModalProps> = ({ onClose }) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[100] p-4 animate-fade-in"
            aria-modal="true"
            role="dialog"
            onClick={onClose} // Close on backdrop click
        >
            <div 
                className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 flex flex-col lg:flex-row"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors z-20 p-2 leading-none bg-white/50 rounded-full"
                    aria-label="Cerrar"
                >
                    <i className="fas fa-times text-2xl"></i>
                </button>

                {/* Image Column */}
                <div className="lg:w-1/3 flex items-center justify-center p-8 bg-gray-100 rounded-l-xl order-1">
                    <img 
                        src="https://images.squidge.org/images/2025/11/01/Diseno-sin-titulo-_6_-_1_-Photoroom.webp" 
                        alt="Libro Rescatando Padres"
                        className="w-full max-w-[250px] h-auto object-contain transition-transform duration-300 hover:scale-105"
                    />
                </div>
                
                {/* Text Column */}
                <div className="lg:w-2/3 p-8 md:p-12 flex flex-col justify-center text-center order-2">
                    <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-cyan-700 leading-tight">
                        ¿Y si la clave para educar mejor no estuviera en tus hijos, sino en ti?
                    </h2>
                    
                    <div className="mt-6 text-gray-700 font-lora leading-relaxed space-y-4 text-lg">
                        <p>
                            A menudo buscamos soluciones para cambiar el comportamiento de nuestros hijos, sin darnos cuenta de que el verdadero poder de transformación está en nosotros.
                        </p>
                        <p>
                            <strong>"RESCATANDO PADRES"</strong> te invita a un viaje de autodescubrimiento para liderar a tu familia con calma y confianza. Aprende a gestionar tus propias emociones para poder guiar las suyas.
                        </p>
                    </div>

                    <div className="mt-8 md:mt-10">
                        <a 
                            href="https://amzn.to/4qCo1xt" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block bg-cyan-600 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-700 transition-colors shadow-lg transform hover:-translate-y-0.5 animate-pulse-cta text-base"
                        >
                            Quiero empezar el cambio
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};