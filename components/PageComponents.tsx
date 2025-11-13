import React, { useState, useEffect, useRef } from 'react';
import type { Page, Testimonial, BlogPost, NavigationTarget } from '../types';
import { LeadMagnetBanner, useSEOMetadata, AnimateOnScroll } from './UIComponents';
import { MenopauseJourney } from './MenopauseJourney';
import { FeaturedPostsSection } from './BlogComponents';
import { getBlogPosts } from '../services/cms';
import { GoogleGenAI } from '@google/genai';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface PageProps {
    navigate: (target: NavigationTarget) => void;
}

// --- HomePage ---
export const HomePage: React.FC<PageProps> = ({ navigate }) => {
    useSEOMetadata(
        'Mila Ciudad | Coach de Menopausia y Salud Activa para Mujeres +50',
        'Transforma tu menopausia en una etapa de poder. Descubre el método de Mila Ciudad, enfermera y coach, para navegar los síntomas con claridad y fortaleza.'
    );
    const [posts, setPosts] = useState<BlogPost[]>([]);
    
    useEffect(() => {
        getBlogPosts().then(fetchedPosts => {
            setPosts(fetchedPosts);
        });
    }, []);

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-cyan-50 via-gray-50 to-white py-12 md:py-20 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
                        <div className="flex justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                           <img 
                                src="https://images.squidge.org/images/2025/11/01/milaciudad.webp" 
                                alt="Mila Ciudad" 
                                className="w-full max-w-sm md:max-w-full mx-auto h-auto object-contain max-h-[650px] animate-float transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-5xl lg:text-6xl font-extrabold font-montserrat gradient-text animate-fade-in-up leading-relaxed pb-2" style={{ animationDelay: '0.1s' }}>
                                Navega la menopausia con <strong>claridad y fortaleza</strong>
                            </h1>
                            <p className="mt-8 text-xl font-semibold text-gray-800 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Una enfermera que sabe lo que es vivirla.</p>
                            <p className="mt-2 text-lg text-cyan-600 font-bold uppercase tracking-wider animate-fade-in-up" style={{ animationDelay: '0.3s' }}>EN UNA VIDA HAY MUCHAS VIDAS</p>
                            
                            <AnimateOnScroll className="mt-8" delay="0.4s">
                                <div className="bg-cyan-50/50 p-8 rounded-xl border border-cyan-100 shadow-lg space-y-6">
                                    {/* Pain Point */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 bg-cyan-100 text-cyan-600 w-12 h-12 rounded-full flex items-center justify-center mt-1">
                                            <i className="fas fa-heart-crack text-2xl"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold font-montserrat text-lg text-cyan-700">Cansada de oír “es lo que toca”</h4>
                                            <p className="text-gray-600 text-justify">Tu cabeza quiere actuar, pero <strong>tu cuerpo no responde.</strong> Te miras al espejo y no te reconoces; vives en un “vivo sin vivir en mí”.</p>
                                        </div>
                                    </div>
                                    {/* Hope/Turning Point */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 bg-cyan-100 text-cyan-600 w-12 h-12 rounded-full flex items-center justify-center mt-1">
                                            <i className="fas fa-lightbulb text-2xl"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold font-montserrat text-lg text-cyan-700">Este es tu punto de partida</h4>
                                            <p className="text-gray-600 text-justify">Si estás aquí, es porque algo en ti quiere avanzar. Este es el inicio de tu <strong>liberación</strong> y de una <strong>versión mejorada de ti misma.</strong></p>
                                        </div>
                                    </div>
                                    {/* Solution */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 bg-cyan-100 text-cyan-600 w-12 h-12 rounded-full flex items-center justify-center mt-1">
                                            <i className="fas fa-key text-2xl"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold font-montserrat text-lg text-cyan-700">Te ofrezco un MÉTODO</h4>
                                            <p className="text-gray-600 text-justify">Un acompañamiento cercano que transforma la incertidumbre en poder, <strong>convierte tus talentos en resultados tangibles</strong> y te devuelve el control de tu bienestar.</p>
                                        </div>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>
                    <div className="mt-16 md:mt-24 animate-fade-in-up">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-cyan-600">Mi Lema de Vida</h2>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-montserrat text-gray-800 mt-2 md:leading-tight">NO TE DOBLEGUES</h3>
                            <p className="mt-4 text-lg lg:text-xl text-gray-600 leading-relaxed">Más que un lema, es el motor que impulsa mi proyecto vital. Es un recordatorio de <strong>mantenerme fiel a mis valores,</strong> de afrontar la realidad con valentía y de compartir esa fortaleza con quienes me leen y escuchan. Soy enfermera, escritora y cantante; mi vocación es cuidar y dar voz.</p>
                            <p className="mt-4 text-lg lg:text-xl text-gray-600 leading-relaxed italic">Esta es la historia de cómo decidí <strong>plantar cara a la menopausia.</strong></p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                                <button onClick={() => navigate('servicios')} className="bg-cyan-600 text-white font-bold py-4 px-10 text-lg rounded-full hover:bg-cyan-700 transition-colors shadow-lg transform hover:-translate-y-0.5 animate-pulse-cta">
                                    DESCUBRE MI MÉTODO
                                </button>
                                <button onClick={() => navigate('sobre-mi')} className="bg-white text-cyan-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors border border-cyan-600 shadow-lg transform hover:-translate-y-0.5">
                                    CONOCE MI HISTORIA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-16 md:py-24 bg-gray-50/50">
                 <div className="container mx-auto px-6 text-center">
                    <p className="text-2xl md:text-3xl font-lora italic text-gray-700 max-w-3xl mx-auto">"No importa en qué situación te encuentres, <strong>tu cambio empieza hoy.</strong>"</p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        <LeadMagnetBanner
                            title="Consigue <strong>5 estrategias</strong> para controlar los Sofocos"
                            description="Una <strong>guía práctica y directa</strong> con las estrategias que me ayudaron a mí y a cientos de mujeres a gestionar uno de los síntomas más molestos de la menopausia."
                            imageUrl="https://images.squidge.org/images/2025/10/29/controla-tus-sofocos-mila-ciudad.webp"
                            formId="controla-sofocos-homepage"
                            redirectUrl="https://controlatusofocos.milaciudad.com/"
                            formspreeEndpoint="https://formspree.io/f/mqkvqejb"
                            layout="horizontal"
                        />
                    </div>
                </div>
            </section>
            <TestimonialsSection />
            <FeaturedPostsSection posts={posts.filter(p => p.isFeatured)} navigate={navigate} originPage="home" />
            
            <section className="py-16 md:py-24 bg-cyan-50/50">
                <div className="container mx-auto px-6">
                    <AnimateOnScroll>
                        <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-xl shadow-xl border">
                            <div className="flex justify-center items-center">
                                <img 
                                    src="https://images.squidge.org/images/2025/11/07/Gemini_Generated_Image_69z92769z92769z9.png" 
                                    alt="Centro de Recursos para la Menopausia" 
                                    className="rounded-lg max-w-lg w-full transition-transform duration-300 hover:scale-105 cursor-pointer"
                                    onClick={() => navigate('menopausia')}
                                />
                            </div>
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-cyan-700">Centro de Recursos para la Menopausia</h2>
                                <p className="mt-6 text-lg text-gray-600">
                                    He creado el <strong>Centro de Recursos para la Menopausia</strong>, un espacio completo con información y herramientas para entender, aceptar y vivir esta etapa con plenitud.
                                </p>
                                <p className="mt-4 text-gray-600">
                                    Aquí encontrarás artículos sobre síntomas, nutrición, bienestar emocional y mucho más, todo basado en evidencia científica y mi experiencia como enfermera y coach.
                                </p>
                                <button 
                                    onClick={() => navigate('menopausia')} 
                                    className="mt-8 bg-cyan-600 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-700 transition-colors shadow-lg transform hover:-translate-y-0.5"
                                >
                                    EXPLORAR EL CENTRO DE RECURSOS
                                </button>
                            </div>
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>
        </div>
    );
};

// --- AboutPage ---
export const AboutPage: React.FC<PageProps> = ({ navigate }) => {
    useSEOMetadata(
        'Sobre Mí | Mila Ciudad',
        'De la Ciencia de Cuidar a la Sabiduría de Acompañar. Descubre mi viaje, mi historia y mi misión para acompañarte en la menopausia.'
    );
    return <div className="animate-fade-in"><MenopauseJourney navigate={navigate} /></div>;
};

// --- ServicesPage (Mi Método) ---
export const ServicesPage: React.FC<PageProps> = ({ navigate }) => {
    useSEOMetadata(
        'Mi Método | Mila Ciudad',
        'Un viaje de acompañamiento personalizado para que recuperes el control de tu bienestar, transformes la incertidumbre en poder y te sientas acompañada en esta nueva etapa.'
    );

    const testimonials: Testimonial[] = [
        {
            quote: 'Sentía que había perdido el control de mi cuerpo y mi mente. El método de Mila me dio un mapa claro y por primera vez en años, sentí que no estaba sola. He recuperado mi energía y, lo más importante, la confianza en mi misma.',
            author: 'Laura G.',
            age: 52,
            profession: 'Abogada',
        },
        {
            quote: 'La sesión de claridad fue reveladora. Mila tiene una capacidad increíble para escuchar y hacerte ver las cosas desde otra perspectiva. Salí de esa conversación con una calma y una motivación que no esperaba. Fue el primer paso para un cambio real.',
            author: 'Sofia M.',
            age: 48,
            profession: 'Diseñadora Gráfica',
        },
        {
            quote: 'Dudaba si un coaching era para mí, pero la cercanía de Mila y su experiencia como enfermera me convencieron. Ha sido la mejor inversión en mi salud. Entiendo mi cuerpo y tengo herramientas para gestionar los síntomas que antes me desbordaban.',
            author: 'Carmen R.',
            age: 55,
            profession: 'Profesora',
        },
        {
            quote: 'Gracias a Mila he vuelto a dormir noches enteras. Su enfoque integral, que combina nutrición, hábitos y gestión emocional, ha sido un cambio radical. Me siento más vital y con más claridad mental que hace diez años.',
            author: 'Isabel V.',
            age: 50,
            profession: 'Empresaria',
        },
    ];

    const faqs = [
        {
            question: '¿Esta sesión tiene algún coste?',
            answer: 'La Sesión de Claridad es completamente gratuita y sin ningún tipo de compromiso. Es un espacio de 30-45 minutos diseñado para que nos conozcamos, para que puedas contarme tu historia y para que te lleves una visión clara de tus próximos pasos. Mi objetivo es que salgas de la sesión con valor real, independientemente de si decidimos trabajar juntas o no.'
        },
        {
            question: '¿Qué pasa si después de la sesión decido que no es para mí?',
            answer: 'Absolutamente nada. La sesión es para que ambas valoremos si conectamos y si mi método es el adecuado para ti en este momento. La honestidad y la confianza son la base de mi trabajo. Si sientes que no es tu camino, te lo agradeceré y te desearé lo mejor. No hay ninguna presión.'
        },
        {
            question: '¿Se habla de precios en la sesión de claridad?',
            answer: 'Sí, pero solo al final y únicamente si ambas sentimos que hay una buena conexión y que puedo ayudarte. Si es así, te explicaré con total transparencia en qué consiste mi programa de acompañamiento "MILACIUDAD+", su duración y la inversión que supone, para que tengas toda la información y puedas tomar la mejor decisión para ti.'
        },
        {
            question: '¿Qué pasa si no soy candidata al programa?',
            answer: 'Mi compromiso es con tu bienestar. Si durante la sesión considero que mi programa no es lo que necesitas, o que te beneficiarías más de otro tipo de profesional (un médico especialista, un psicólogo, etc.), te lo diré con total honestidad y te orientaré en la medida de lo posible. No acepto a clientas que no creo poder ayudar genuinamente.'
        }
    ];

    const FaqItem: React.FC<{ faq: { question: string, answer: string } }> = ({ faq }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="border-b border-gray-200 py-4">
                <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-700 hover:text-cyan-600">
                    <span>{faq.question}</span>
                    <i className={`fas fa-chevron-down transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                    <p className="text-gray-600 pr-8">{faq.answer}</p>
                </div>
            </div>
        );
    };
    
    const SharePageSection: React.FC = () => {
        const [pageUrl, setPageUrl] = useState('');
        const [copySuccess, setCopySuccess] = useState('');

        useEffect(() => {
            setPageUrl(window.location.href);
        }, []);

        const shareText = "He encontrado este método de acompañamiento para la menopausia y creo que podría interesarte. ¡Echa un vistazo!";
        const encodedUrl = encodeURIComponent(pageUrl);
        const encodedText = encodeURIComponent(shareText);

        const shareLinks = [
            { name: 'WhatsApp', icon: 'fab fa-whatsapp', url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`, color: 'bg-green-500 hover:bg-green-600' },
            { name: 'Facebook', icon: 'fab fa-facebook-f', url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, color: 'bg-blue-600 hover:bg-blue-700' },
            { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`, color: 'bg-blue-700 hover:bg-blue-800' },
             { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/mila.ciudad/', color: 'bg-pink-500 hover:bg-pink-600' },
            { name: 'Email', icon: 'fas fa-envelope', url: `mailto:?subject=Mira%20este%20m%C3%A9todo%20de%20Mila%20Ciudad&body=${encodedText}%0A%0A${encodedUrl}`, color: 'bg-gray-500 hover:bg-gray-600' },
        ];
        
        const handleCopy = () => {
            navigator.clipboard.writeText(pageUrl).then(() => {
                setCopySuccess('¡Enlace copiado!');
                setTimeout(() => setCopySuccess(''), 2000);
            }, () => {
                setCopySuccess('Error al copiar');
                setTimeout(() => setCopySuccess(''), 2000);
            });
        };
        
        return (
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg border text-center">
                <h3 className="text-xl font-bold text-gray-700">¿Crees que esto puede ayudar a alguien más?</h3>
                <p className="mt-2 text-gray-600">Si conoces a otras mujeres que se beneficiarían de este enfoque, compartir esta página es una forma maravillosa de apoyarlas.</p>
                <div className="mt-5 flex flex-wrap justify-center items-center gap-3">
                     {shareLinks.map(link => (
                         <a 
                            key={link.name} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`w-10 h-10 flex items-center justify-center text-white rounded-full transition-transform transform hover:scale-110 ${link.color}`} 
                            aria-label={`Compartir en ${link.name}`}
                        >
                            <i className={`${link.icon} text-lg`}></i>
                        </a>
                    ))}
                     <button 
                        onClick={handleCopy} 
                        className="bg-gray-200 text-gray-700 h-10 px-4 rounded-full flex items-center gap-2 font-semibold hover:bg-gray-300 transition-colors"
                    >
                        <i className="fas fa-link"></i>
                        <span>{copySuccess || 'Copiar Enlace'}</span>
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="animate-fade-in">
            {/* Hero */}
            <section className="bg-gray-50/50 py-16 md:py-24">
                <div className="container mx-auto px-6 text-center">
                    <AnimateOnScroll>
                        <h1 className="text-4xl md:text-6xl font-extrabold font-montserrat gradient-text animate-gradient-text">Mi Método: Un Viaje de Acompañamiento Personalizado</h1>
                        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">He diseñado un camino para que <strong>recuperes el control de tu bienestar</strong>, transformes la incertidumbre en poder y te sientas acompañada en cada paso de esta nueva etapa.</p>
                    </AnimateOnScroll>
                </div>
            </section>
            
            {/* Pain points */}
            <section className="py-16 md:py-24">
                 <div className="container mx-auto px-6">
                    <AnimateOnScroll>
                        <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center text-gray-800">¿Te Sientes Identificada?</h2>
                        <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">Si asientes con la cabeza al leer esto, quiero que sepas que <strong>no estás sola</strong> y que lo que sientes <strong>tiene solución.</strong></p>
                    </AnimateOnScroll>
                    <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
                        <AnimateOnScroll delay="0.1s">
                             <div className="bg-white p-8 rounded-lg shadow-lg border h-full text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                                <i className="fas fa-cloud text-4xl text-cyan-500"></i>
                                <h3 className="mt-4 text-xl font-bold font-montserrat text-gray-700">Niebla Mental y Fatiga</h3>
                                <p className="mt-2 text-gray-600">Sientes que tu energía <strong>se ha esfumado</strong> y te cuesta concentrarte en las tareas más simples.</p>
                            </div>
                        </AnimateOnScroll>
                         <AnimateOnScroll delay="0.2s">
                             <div className="bg-white p-8 rounded-lg shadow-lg border h-full text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                                <i className="fas fa-arrows-rotate text-4xl text-cyan-500"></i>
                                <h3 className="mt-4 text-xl font-bold font-montserrat text-gray-700">Cambios Inexplicables</h3>
                                <p className="mt-2 text-gray-600">Tu cuerpo parece haber cambiado las reglas del juego <strong>sin avisar</strong>, con síntomas que no entiendes.</p>
                            </div>
                        </AnimateOnScroll>
                        <AnimateOnScroll delay="0.3s">
                            <div className="bg-white p-8 rounded-lg shadow-lg border h-full text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                                <i className="fas fa-comments text-4xl text-cyan-500"></i>
                                <h3 className="mt-4 text-xl font-bold font-montserrat text-gray-700">Soledad e Incomprensión</h3>
                                <p className="mt-2 text-gray-600">Te sientes <strong>invisible</strong>, como si nadie entendiera realmente por lo que estás pasando.</p>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </section>
            
            {/* The Method */}
            <section className="py-16 md:py-24 bg-gray-50/50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <AnimateOnScroll>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-montserrat text-center gradient-text animate-gradient-text">EL Método MILACIUDAD+</h2>
                        <p className="mt-4 text-center text-2xl font-semibold text-cyan-700">Tu Viaje Guiado hacia la <strong>Plenitud</strong></p>
                    </AnimateOnScroll>
                    
                    <AnimateOnScroll className="mt-12">
                        <div className="bg-cyan-50/50 p-8 md:p-12 rounded-xl shadow-xl border-t-4 border-cyan-200 text-center">
                            <i className="fas fa-leaf text-4xl text-cyan-500"></i>
                             <p className="mt-6 text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto"><strong>MILACIUDAD+</strong> es más que un programa; es un <strong>espacio de transformación</strong> diseñado exclusivamente para la mujer que está lista para <strong>tomar las riendas de su bienestar.</strong> He fusionado mi doble experiencia, como enfermera y como mujer que ha navegado esta misma transición, para crear un sistema de acompañamiento que te proporciona <strong>claridad, herramientas validadas</strong> y el <strong>apoyo constante</strong> que necesitas para avanzar con confianza y serenidad.</p>
                        </div>
                    </AnimateOnScroll>
                    
                     <div className="grid md:grid-cols-2 gap-8 mt-8">
                        <AnimateOnScroll delay="0.1s">
                            <div className="bg-white p-8 rounded-lg shadow-lg border h-full">
                                <i className="fas fa-calendar-check text-3xl text-cyan-500"></i>
                                <h3 className="mt-4 text-xl font-bold font-montserrat text-gray-700">Un Trimestre para tu Transformación</h3>
                                <p className="mt-2 text-gray-600">Un marco de tiempo diseñado para <strong>profundizar, integrar hábitos y lograr cambios sostenibles.</strong> A través de 6 sesiones quincenales, construimos juntas una base sólida para tu bienestar a largo plazo.</p>
                            </div>
                        </AnimateOnScroll>
                         <AnimateOnScroll delay="0.2s">
                            <div className="bg-white p-8 rounded-lg shadow-lg border h-full">
                                <i className="fas fa-hand-holding-heart text-3xl text-cyan-500"></i>
                                <h3 className="mt-4 text-xl font-bold font-montserrat text-gray-700">Acompañamiento Cercano y Constante</h3>
                                <p className="mt-2 text-gray-600"><strong>No caminarás sola.</strong> Tienes acceso directo a mí vía WhatsApp para resolver dudas, compartir tus avances o recibir ese impulso de motivación justo cuando más lo necesitas.</p>
                            </div>
                        </AnimateOnScroll>
                         <AnimateOnScroll delay="0.3s">
                            <div className="bg-white p-8 rounded-lg shadow-lg border h-full">
                                <i className="fas fa-map-signs text-3xl text-cyan-500"></i>
                                <h3 className="mt-4 text-xl font-bold font-montserrat text-gray-700">Una Hoja de Ruta Exclusiva para Ti</h3>
                                <p className="mt-2 text-gray-600">Tu viaje es único. Co-crearemos un <strong>plan de acción a medida,</strong> basado en tus necesidades, tu estilo de vida y tus objetivos personales. No hay soluciones genéricas, solo tu camino.</p>
                            </div>
                        </AnimateOnScroll>
                         <AnimateOnScroll delay="0.4s">
                            <div className="bg-white p-8 rounded-lg shadow-lg border h-full">
                                <i className="fas fa-piggy-bank text-3xl text-cyan-500"></i>
                                <h3 className="mt-4 text-xl font-bold font-montserrat text-gray-700">Una Inversión en tu Futuro Bienestar</h3>
                                <p className="mt-2 text-gray-600">Esto no es un gasto, es una <strong>inversión en ti misma.</strong> Adquieres herramientas, conocimientos y una nueva perspectiva que te acompañarán mucho más allá de nuestros tres meses juntas.</p>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </section>
            
             {/* Outcomes */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 text-center max-w-5xl">
                    <AnimateOnScroll>
                        <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-800">Al Finalizar Nuestro Viaje Juntas, Habrás Conseguido:</h2>
                    </AnimateOnScroll>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                        <AnimateOnScroll delay="0.1s">
                            <div className="p-4">
                                <i className="fas fa-bolt text-4xl text-cyan-500"></i>
                                <h3 className="mt-4 text-lg font-bold font-montserrat text-gray-700">Más Energía y Vitalidad</h3>
                            </div>
                        </AnimateOnScroll>
                        <AnimateOnScroll delay="0.2s">
                            <div className="p-4">
                                <i className="fas fa-brain text-4xl text-cyan-500"></i>
                                <h3 className="mt-4 text-lg font-bold font-montserrat text-gray-700">Claridad Mental y Enfoque</h3>
                            </div>
                        </AnimateOnScroll>
                        <AnimateOnScroll delay="0.3s">
                            <div className="p-4">
                                <i className="fas fa-toolbox text-4xl text-cyan-500"></i>
                                <h3 className="mt-4 text-lg font-bold font-montserrat text-gray-700">Herramientas para Gestionar Síntomas</h3>
                            </div>
                        </AnimateOnScroll>
                        <AnimateOnScroll delay="0.4s">
                            <div className="p-4">
                                <i className="fas fa-hand-peace text-4xl text-cyan-500"></i>
                                <h3 className="mt-4 text-lg font-bold font-montserrat text-gray-700">Paz con tu Cuerpo y esta Nueva Etapa</h3>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </section>
            
            {/* Testimonials */}
             <section className="py-16 md:py-24 bg-cyan-700 text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-white">Lo que Dicen las Mujeres que ya han Recorrido este Camino</h2>
                    </div>
                    <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <AnimateOnScroll key={index} delay={`${index * 100}ms`}>
                                <div className="bg-cyan-600 p-6 rounded-xl shadow-lg h-full flex flex-col">
                                    <p className="text-cyan-100 italic my-4 flex-grow">"{testimonial.quote}"</p>
                                    <div className="mt-auto">
                                        <p className="font-bold font-montserrat text-white">{testimonial.author}</p>
                                        <p className="text-sm text-cyan-200">{testimonial.profession}, {testimonial.age} años</p>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* CTA */}
             <section className="py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                         <AnimateOnScroll>
                            <img src="https://images.squidge.org/images/2025/11/01/Gemini_Generated_Image_anq9g2anq9g2anq9-Photoroom.webp" alt="Mila Ciudad" className="w-full h-auto max-w-md mx-auto rounded-lg shadow-xl" />
                        </AnimateOnScroll>
                        <AnimateOnScroll delay="0.2s">
                            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-800">Tu Primer Paso Hacia el Cambio</h2>
                            <h3 className="mt-4 text-xl font-semibold text-cyan-600">Agenda tu Sesión de Claridad Gratuita</h3>
                            <p className="mt-4 text-gray-600">Este es tu espacio seguro y confidencial. Una conversación de 30-45 minutos, <strong>sin compromiso,</strong> diseñada para que te sientas escuchada y comprendida.</p>
                            <ul className="mt-6 space-y-4">
                                <li className="flex items-start">
                                    <i className="fas fa-ear-listen text-2xl text-cyan-500 mr-4 mt-1"></i>
                                    <div>
                                        <h4 className="font-bold text-gray-700">Escucharé tu Historia</h4>
                                        <p className="text-gray-600">Profundizaremos en tus <strong>desafíos y necesidades únicas</strong> para entender tu punto de partida.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-map-marked-alt text-2xl text-cyan-500 mr-4 mt-1"></i>
                                    <div>
                                        <h4 className="font-bold text-gray-700">Trazaré un Primer Mapa</h4>
                                        <p className="text-gray-600">Te llevarás una <strong>visión clara</strong> de los posibles siguientes pasos hacia tu bienestar y tus objetivos.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-handshake text-2xl text-cyan-500 mr-4 mt-1"></i>
                                    <div>
                                        <h4 className="font-bold text-gray-700">Decidiré si Conectamos</h4>
                                        <p className="text-gray-600">Al final, valoraremos juntas si mi método es el adecuado para ti. <strong>Sin presión, con total honestidad.</strong></p>
                                    </div>
                                </li>
                            </ul>
                            <div className="mt-8">
                                <a href="https://calendar.app.google/e66VNHbHuun6zVz38" target="_blank" rel="noopener noreferrer" className="inline-block bg-cyan-600 text-white font-bold py-4 px-10 rounded-full hover:bg-cyan-700 transition-colors shadow-lg text-lg transform hover:-translate-y-1 animate-pulse-cta">
                                    RESERVAR MI SESIÓN GRATUITA
                                </a>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </section>
            
            {/* Essential tools section as per previous request */}
            <section className="py-16 md:py-24 bg-gray-50/50">
                <AnimateOnScroll>
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-extrabold font-montserrat text-center text-cyan-700 mb-12">Tus <strong>Herramientas Esenciales</strong></h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            <div 
                                onClick={() => navigate('menopausia')} 
                                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col cursor-pointer h-full group"
                            >
                                <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                                    <img src="https://images.squidge.org/images/2025/11/02/guiamenomilaciduad-1.md.png" alt="Guía de Menopausia" className="w-full h-full object-contain" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow text-center">
                                    <h3 className="text-xl font-bold font-montserrat text-cyan-700">Centro de Recursos para la Menopausia</h3>
                                    <p className="mt-2 text-gray-600 text-sm flex-grow">Un espacio completo para entender, aceptar y vivir esta etapa con plenitud.</p>
                                    <span className="mt-4 font-semibold text-cyan-600 group-hover:text-cyan-800 self-center">
                                        Explorar &rarr;
                                    </span>
                                </div>
                            </div>
                            <div 
                                onClick={() => navigate('diagnostico')} 
                                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col cursor-pointer h-full group"
                            >
                                <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                                    <img src="https://images.squidge.org/images/2025/11/02/Gemini_Generated_Image_qukf08qukf08qukf-1.png" alt="Diagnóstico de Bienestar" className="w-full h-full object-contain" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow text-center">
                                    <h3 className="text-xl font-bold font-montserrat text-cyan-700">Diagnóstico de Bienestar</h3>
                                    <p className="mt-2 text-gray-600 text-sm flex-grow">Evalúa en <strong>2 minutos</strong> las áreas clave de tu salud y obtén una visión clara.</p>
                                    <span className="mt-4 font-semibold text-cyan-600 group-hover:text-cyan-800 self-center">
                                        Hacer diagnóstico &rarr;
                                    </span>
                                </div>
                            </div>
                            <LeadMagnetBanner
                                title="Guía de <strong>dietas ideales</strong> gratuita"
                                description="La dieta ideal en la menopausia <strong>no debe ser un castigo,</strong> sino un acto de amor propio que te permite nutrir tu cuerpo, equilibrar tus hormonas, fortalecer tus huesos y cuidar tu bienestar físico y emocional en esta nueva etapa de vida."
                                imageUrl="https://images.squidge.org/images/2025/10/31/DIETA-MEDITERRANEA.md.webp"
                                formId="dietas-ideales-servicios-compact"
                                redirectUrl="https://dietas.milaciudad.com/"
                                formspreeEndpoint="https://formspree.io/f/mzzkjklk"
                                layout="vertical"
                            />
                            <LeadMagnetBanner
                                title="Guía de <strong>salud activa</strong> gratuita"
                                description="Aprende cómo cuidar tu salud, reconocer los síntomas y prevenir enfermedades como la <strong>diabetes, la hipertensión arterial, la hipercolesterolemia y la arteriosclerosis.</strong>"
                                imageUrl="https://images.squidge.org/images/2025/10/31/Gemini_Generated_Image_81lp3y81lp3y81lp-processedlightpdf.com.md.webp"
                                formId="guia-salud-activa-servicios-compact"
                                redirectUrl="https://saludactiva.milaciudad.com/"
                                formspreeEndpoint="https://formspree.io/f/meoprpbv"
                                layout="vertical"
                            />
                        </div>
                    </div>
                </AnimateOnScroll>
            </section>
            
            {/* FAQ */}
             <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 max-w-3xl">
                    <AnimateOnScroll>
                        <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center text-gray-800 mb-12">Preguntas Frecuentes</h2>
                        <div className="space-y-2">
                            {faqs.map((faq, index) => (
                                <FaqItem key={index} faq={faq} />
                            ))}
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>

             {/* Share Page */}
             <section className="pb-16 md:pb-24">
                 <div className="container mx-auto px-6">
                    <AnimateOnScroll>
                        <SharePageSection />
                    </AnimateOnScroll>
                </div>
            </section>
        </div>
    );
};

// --- MenopausePage ---
export const MenopausePage: React.FC<PageProps> = ({ navigate }) => {
    useSEOMetadata('Centro de Recursos de Menopausia | Mila Ciudad', 'Un espacio completo con información y herramientas para entender, aceptar y vivir la menopausia con plenitud.');
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        getBlogPosts().then(setPosts);
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        const formData = new FormData();
        formData.append('email', email);

        try {
            const response = await fetch('https://formspree.io/f/mqagygvl', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' },
            });

            if (response.ok) {
                setIsSubmitted(true);
                setTimeout(() => {
                    window.location.href = 'https://todosobrelamenopausia.milaciudad.com/';
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

    const ResourceCard: React.FC<{post: BlogPost}> = ({post}) => (
        <div onClick={() => navigate({ page: 'blog', slug: post.slug })} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col cursor-pointer group h-full">
            <div className="relative w-full h-40 overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold font-montserrat text-gray-700 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-3 text-justify flex-grow">{post.excerpt}</p>
                 <span className="font-semibold text-cyan-600 hover:text-cyan-800 transition-colors self-start mt-auto text-sm">
                    Leer más &rarr;
                </span>
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in">
            <header className="bg-cyan-700 text-white py-16 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold font-montserrat">Centro de Recursos para la Menopausia</h1>
                    <p className="mt-4 text-lg text-cyan-100 max-w-3xl mx-auto">Un espacio para entender, aceptar y vivir esta etapa con plenitud, fortaleza y autenticidad.</p>
                </div>
            </header>
            <main className="container mx-auto px-6 py-12 md:py-16">
                 <section className="mb-16">
                    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg border">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-cyan-700 uppercase">Mi Guía Esencial para la Menopausia</h2>
                                <p className="mt-6 text-gray-600">Una guía <strong>completa</strong> para entender y navegar esta etapa con claridad, herramientas prácticas y serenidad. Descubre cómo transformar los síntomas en una oportunidad para <strong>cuidarte como nunca.</strong></p>
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
                                                    id="email-guia-esencial"
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
                            </div>
                            <div className="flex justify-center">
                                <img src="https://images.squidge.org/images/2025/11/01/mila-ciudad-guia-meniopausia-Photoroom.md.png" alt="Mi Guía Esencial para la Menopausia" className="max-w-xs w-full animate-float" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mb-16">
                    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg border">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="flex justify-center md:order-last">
                                <img 
                                    src="https://images.squidge.org/images/2025/11/02/Gemini_Generated_Image_qukf08qukf08qukf-1.png" 
                                    alt="Diagnóstico de Bienestar" 
                                    className="max-w-xs w-full transition-transform duration-300 hover:scale-105 animate-float" 
                                />
                            </div>
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-cyan-700 uppercase">Diagnóstico Rápido de Bienestar</h2>
                                <p className="mt-6 text-gray-600">
                                    Obtén claridad en <strong>menos de 2 minutos.</strong> Evalúa 6 áreas clave de tu salud para obtener una visión general de tu estado actual y descubrir tus puntos fuertes y las áreas que podrían necesitar más atención.
                                </p>
                                <button 
                                    onClick={() => navigate('diagnostico')} 
                                    className="mt-8 bg-cyan-600 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-700 transition-colors shadow-lg transform hover:-translate-y-0.5"
                                >
                                    COMENZAR DIAGNÓSTICO
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold font-montserrat text-gray-700 mb-8 text-center">Para ti</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <LeadMagnetBanner
                            title="Guía de <strong>dietas ideales</strong> gratuita"
                            description="La dieta ideal en la menopausia <strong>no debe ser un castigo,</strong> sino un acto de amor propio que te permite nutrir tu cuerpo, equilibrar tus hormonas, fortalecer tus huesos y cuidar tu bienestar físico y emocional en esta nueva etapa de vida."
                            imageUrl="https://images.squidge.org/images/2025/10/31/DIETA-MEDITERRANEA.md.webp"
                            formId="dietas-ideales-menopausia-page"
                            redirectUrl="https://dietas.milaciudad.com/"
                            formspreeEndpoint="https://formspree.io/f/mzzkjklk"
                            layout="vertical"
                        />
                        <LeadMagnetBanner
                            title="Guía de <strong>salud activa</strong> gratuita"
                            description="Aprende cómo cuidar tu salud, reconocer los síntomas y prevenir enfermedades como la <strong>diabetes, la hipertensión arterial, la hipercolesterolemia y la arteriosclerosis.</strong>"
                            imageUrl="https://images.squidge.org/images/2025/10/31/Gemini_Generated_Image_81lp3y81lp3y81lp-processedlightpdf.com.md.webp"
                            formId="guia-salud-activa-menopausia-page"
                            redirectUrl="https://saludactiva.milaciudad.com/"
                            formspreeEndpoint="https://formspree.io/f/meoprpbv"
                            layout="vertical"
                        />
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold font-montserrat text-gray-700 mb-8 text-center">Entendiendo los Síntomas</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.filter(p => p.tags.includes('Síntomas')).map(p => <ResourceCard key={p.slug} post={p} />)}
                    </div>
                </section>
                 <section className="mt-16">
                    <h2 className="text-3xl font-bold font-montserrat text-gray-700 mb-8 text-center">Nutrición y Estilo de Vida</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.filter(p => p.tags.includes('Nutrición') || p.tags.includes('Ejercicio') || p.tags.includes('Sueño')).map(p => <ResourceCard key={p.slug} post={p} />)}
                    </div>
                </section>
                 <section className="mt-16">
                    <h2 className="text-3xl font-bold font-montserrat text-gray-700 mb-8 text-center">Salud Hormonal y Terapias</h2>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.filter(p => p.tags.includes('Salud Hormonal')).map(p => <ResourceCard key={p.slug} post={p} />)}
                    </div>
                </section>
                <section className="mt-16">
                    <h2 className="text-3xl font-bold font-montserrat text-gray-700 mb-8 text-center">Bienestar Emocional</h2>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.filter(p => p.tags.includes('Bienestar Emocional')).map(p => <ResourceCard key={p.slug} post={p} />)}
                    </div>
                </section>
            </main>
        </div>
    );
};

// --- ShareResults Component ---
const ShareResults: React.FC = () => {
    const [pageUrl, setPageUrl] = useState('');
    const [copySuccess, setCopySuccess] = useState('');

    useEffect(() => {
        setPageUrl(window.location.origin);
    }, []);

    if (!pageUrl) return null;

    const shareText = "He realizado el Diagnóstico de Bienestar de Mila Ciudad y me ha dado una visión muy clara de mi salud en esta etapa. ¡Te animo a que lo pruebes!";
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedText = encodeURIComponent(shareText);

    const shareLinks = [
        { name: 'WhatsApp', icon: 'fab fa-whatsapp', url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`, color: 'bg-green-500 hover:bg-green-600' },
        { name: 'Facebook', icon: 'fab fa-facebook-f', url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, color: 'bg-blue-600 hover:bg-blue-700' },
        { name: 'X', icon: 'fab fa-twitter', url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`, color: 'bg-black hover:bg-gray-800' },
        { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/mila.ciudad/', color: 'bg-pink-500 hover:bg-pink-600' },
        { name: 'Email', icon: 'fas fa-envelope', url: `mailto:?subject=${encodeURIComponent("Una herramienta de bienestar que te puede interesar")}&body=${encodedText}%0A%0A${encodedUrl}`, color: 'bg-gray-500 hover:bg-gray-600' },
    ];
    
    const handleCopy = () => {
        navigator.clipboard.writeText(pageUrl).then(() => {
            setCopySuccess('¡Enlace copiado!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Error al copiar');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    return (
        <AnimateOnScroll className="mt-16">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border text-center">
                <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-cyan-700">¿Te ha aportado claridad?</h2>
                <p className="mt-3 text-gray-600">Ayuda a que otras mujeres descubran esta herramienta gratuita. ¡Compartir es cuidar!</p>
                <div className="mt-6 flex flex-wrap justify-center items-center gap-4">
                    {shareLinks.map(link => (
                         <a 
                            key={link.name} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`w-12 h-12 flex items-center justify-center text-white rounded-full transition-transform transform hover:scale-110 ${link.color}`} 
                            aria-label={`Compartir en ${link.name}`}
                        >
                            <i className={`${link.icon} text-xl`}></i>
                        </a>
                    ))}
                     <button 
                        onClick={handleCopy} 
                        className="bg-gray-200 text-gray-700 h-12 px-5 rounded-full flex items-center gap-2 font-semibold hover:bg-gray-300 transition-colors"
                    >
                        <i className="fas fa-link"></i>
                        <span>{copySuccess || 'Copiar enlace'}</span>
                    </button>
                </div>
            </div>
        </AnimateOnScroll>
    );
};


// --- DiagnosticPage ---
export const DiagnosticPage: React.FC<PageProps> = ({ navigate }) => {
    useSEOMetadata('Diagnóstico de Bienestar | Mila Ciudad', 'Evalúa en 2 minutos las áreas clave de tu salud y obtén una visión clara de tu bienestar actual.');

    const [step, setStep] = useState(0); // 0 = intro, 1-6 = questions, 7 = results
    const [answers, setAnswers] = useState<{[key: string]: number}>({});
    const [sliderValue, setSliderValue] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [allPosts, setAllPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        getBlogPosts().then(setAllPosts);
    }, []);

    const areas = [
        { name: 'Sueño', icon: 'fa-moon', tags: ['Sueño', 'Insomnio'] },
        { name: 'Energía', icon: 'fa-bolt', tags: ['Estilo de Vida', 'Nutrición'] },
        { name: 'Estado de Ánimo', icon: 'fa-face-smile', tags: ['Bienestar Emocional', 'Miedo', 'Autoestima'] },
        { name: 'Nutrición', icon: 'fa-apple-whole', tags: ['Nutrición', 'Metabolismo', 'Peso', 'Resistencia a la Insulina'] },
        { name: 'Actividad Física', icon: 'fa-person-walking', tags: ['Ejercicio', 'Fuerza', 'Salud Ósea'] },
        { name: 'Claridad Mental', icon: 'fa-brain', tags: ['Menopausia', 'Síntomas'] }
    ];
    
    const questions = [
        "En una escala del 1 al 10, ¿cómo calificarías la calidad de tu sueño nocturno?",
        "Valora tus niveles de energía y vitalidad a lo largo del día.",
        "¿Qué tan estable y positivo consideras que es tu estado de ánimo general?",
        "¿Cómo calificarías tus hábitos de alimentación en cuanto a equilibrio y salud?",
        "Evalúa tu nivel de actividad física y movimiento en tu rutina semanal.",
        "¿Cómo puntuarías tu claridad mental, memoria y capacidad de concentración?"
    ];
    
    const generateAnalysis = async (currentAnswers: { [key: string]: number }) => {
        setIsLoading(true);
        setAnalysisResult(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const scoresText = areas.map(area => `${area.name}: ${currentAnswers[area.name]}`).join(', ');
            
            const prompt = `
                Actúa como Mila Ciudad, una coach de salud experta, empática y profesional. Una usuaria ha completado un diagnóstico de bienestar con las siguientes puntuaciones (de 1 a 10): ${scoresText}.

                Tu tarea es proporcionar un análisis conciso, profesional y esperanzador. Sigue esta estructura estricta usando Markdown:

                **Análisis de tu Bienestar**
                Un párrafo introductorio corto y empático (2-3 líneas) que valide su esfuerzo.

                **Tus Fortalezas Actuales**
                Identifica el área con la puntuación más alta. Escribe un párrafo breve (2-3 líneas) felicitándola por este punto fuerte y explicando por qué es una base importante.

                **Áreas de Enfoque Principal**
                Identifica las 2 áreas con las puntuaciones más bajas. Para cada una, escribe un párrafo corto (2-3 líneas) explicando de forma normalizada y sin alarmismo por qué es común que esta área se vea afectada en esta etapa de la vida.

                **Mis Primeras Recomendaciones**
                Ofrece un consejo práctico y accionable para CADA UNA de las 2 áreas de enfoque. Usa una lista con asteriscos. Deben ser consejos sencillos de implementar.
                
                **Un Mensaje para Ti**
                Un párrafo final de empoderamiento (2-3 líneas), reforzando que esto es un punto de partida y que tiene el poder de mejorar su bienestar.
            `;

            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
            });

            setAnalysisResult(response.text);

        } catch (error) {
            console.error("Error generating analysis:", error);
            setAnalysisResult("Lo siento, ha ocurrido un error al generar tu análisis. Por favor, inténtalo de nuevo más tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNext = () => {
        const currentArea = areas[step - 1].name;
        const newAnswers = { ...answers, [currentArea]: sliderValue };
        setAnswers(newAnswers);
        
        if (step < questions.length) {
            setStep(step + 1);
            setSliderValue(5); // Reset slider for next question
        } else {
            setStep(step + 1); // Move to results view
            generateAnalysis(newAnswers);
        }
    };
    
    const chartData = areas.map(area => ({
        subject: area.name,
        score: answers[area.name] || 0,
        fullMark: 10,
    }));
    
    const getRecommendedPosts = () => {
        if (!Object.keys(answers).length) return [];
        
        // Fix: Explicitly converting sort comparison values to numbers to prevent type errors.
        // The error indicates that the types of `a` and `b` are not suitable for an arithmetic operation.
        const sortedAreas = Object.entries(answers).sort(([, a], [, b]) => Number(a) - Number(b));
        const lowestAreas = sortedAreas.slice(0, 2).map(([name]) => name);
        
        const recommendedPosts = new Set<BlogPost>();
        
        lowestAreas.forEach(areaName => {
            const areaInfo = areas.find(a => a.name === areaName);
            if (!areaInfo) return;
            
            const relatedPost = allPosts.find(p => p.tags.some(tag => areaInfo.tags.includes(tag)) && ![...recommendedPosts].map(rp => rp.slug).includes(p.slug));
            
            if (relatedPost) {
                recommendedPosts.add(relatedPost);
            }
        });

        // Fill up to 2 posts if not enough were found
        if (recommendedPosts.size < 2) {
            const popularPosts = allPosts.filter(p => p.isFeatured && ![...recommendedPosts].map(rp => rp.slug).includes(p.slug));
            for(let i=0; i<popularPosts.length && recommendedPosts.size < 2; i++) {
                recommendedPosts.add(popularPosts[i]);
            }
        }
        
        return Array.from(recommendedPosts).slice(0, 2);
    };

    const recommendedPosts = getRecommendedPosts();
    
    const renderMarkdown = (text: string) => {
        const escapeHtml = (unsafe: string) => unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        let processedText = escapeHtml(text).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        const lines = processedText.split('\n');
        let html = '';
        let inList = false;
        for (const line of lines) {
            if (line.trim().startsWith('* ')) {
                if (!inList) {
                    html += '<ul class="list-disc list-inside space-y-2 mt-2">';
                    inList = true;
                }
                html += `<li>${line.trim().substring(2)}</li>`;
            } else {
                if (inList) { html += '</ul>'; inList = false; }
                if (line.trim()) { html += `<p class="my-3">${line}</p>`; }
            }
        }
        if (inList) { html += '</ul>'; }
        return { __html: html };
    };
    
    return (
        <div className="bg-gray-50/50 min-h-screen animate-fade-in">
            <div className="container mx-auto px-6 py-12 md:py-16">
                {step === 0 && (
                    <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
                        <i className="fas fa-heart-pulse text-5xl text-cyan-500"></i>
                        <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-cyan-700 mt-6">Diagnóstico Rápido de Bienestar</h1>
                        <p className="mt-6 text-lg text-gray-700 leading-relaxed">Esta etapa trae consigo muchos cambios. A veces, es difícil saber por dónde empezar. Esta herramienta está diseñada para darte <strong>claridad en menos de 2 minutos.</strong></p>
                        <p className="mt-4 text-gray-600">Evaluarás 6 áreas clave de tu salud para obtener una visión general de tu estado actual y descubrir tus puntos fuertes y las áreas que podrían necesitar más atención.</p>
                        <button onClick={() => setStep(1)} className="mt-10 bg-cyan-600 text-white font-bold py-4 px-10 rounded-full hover:bg-cyan-700 transition-colors shadow-lg text-lg transform hover:-translate-y-1">
                            Comenzar Diagnóstico
                        </button>
                    </div>
                )}

                {step > 0 && step <= questions.length && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg border p-8 md:p-12 animate-fade-in">
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                                <div className="bg-cyan-600 h-2 rounded-full transition-all duration-500" style={{ width: `${(step / questions.length) * 100}%` }}></div>
                            </div>
                            <div className="text-center">
                                <i className={`fas ${areas[step - 1].icon} text-4xl text-cyan-500 mb-4`}></i>
                                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">{areas[step - 1].name}</h2>
                                <p className="text-lg text-gray-600 my-6">{questions[step - 1]}</p>
                                <div className="my-8">
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={sliderValue}
                                        onChange={(e) => setSliderValue(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-600 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-cyan-600"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                                        <span>Bajo</span>
                                        <span className="font-bold text-lg text-cyan-700 -mt-1">{sliderValue}</span>
                                        <span>Excelente</span>
                                    </div>
                                </div>
                                <button onClick={handleNext} className="mt-6 bg-cyan-600 text-white font-bold py-3 px-12 rounded-full hover:bg-cyan-700 transition-colors shadow">
                                    {step === questions.length ? 'Ver Resultados' : 'Siguiente'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                
                {step > questions.length && (
                    <div className="animate-fade-in">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-cyan-700">Aquí tienes tu Diagnóstico</h1>
                            <p className="mt-4 text-lg text-gray-600">Esta es una instantánea de tu bienestar actual. Úsala como punto de partida.</p>
                        </div>

                        {isLoading && (
                            <div className="mt-16 flex flex-col items-center justify-center text-gray-600">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-600"></div>
                                <p className="mt-6 font-semibold text-lg">Estoy analizando tus respuestas para darte una visión profesional...</p>
                            </div>
                        )}

                        {!isLoading && analysisResult && (
                            <div className="mt-12">
                                <div className="grid lg:grid-cols-5 gap-8">
                                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border">
                                        <h3 className="font-bold font-montserrat text-center text-xl text-gray-700">Tu Rueda del Bienestar</h3>
                                        <div style={{ width: '100%', height: 350 }}>
                                            <ResponsiveContainer>
                                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                                    <PolarGrid />
                                                    <PolarAngleAxis dataKey="subject" />
                                                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                                                    <Radar name="Puntuación" dataKey="score" stroke="#0891b2" fill="#0891b2" fillOpacity={0.7} />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-3 bg-white p-8 rounded-xl shadow-lg border">
                                         <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={renderMarkdown(analysisResult)} />
                                    </div>
                                </div>

                                {recommendedPosts.length > 0 && (
                                    <div className="mt-16">
                                        <h2 className="text-3xl font-bold font-montserrat text-center text-gray-700 mb-8">Recursos Recomendados para Ti</h2>
                                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                            {recommendedPosts.map(post => (
                                                <div key={post.slug} onClick={() => navigate({ page: 'blog', slug: post.slug })} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col cursor-pointer group h-full">
                                                    <div className="relative w-full h-40 overflow-hidden"><img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" /></div>
                                                    <div className="p-4 flex flex-col flex-grow">
                                                        <h3 className="text-lg font-bold font-montserrat text-gray-700 mb-2">{post.title}</h3>
                                                        <span className="font-semibold text-cyan-600 hover:text-cyan-800 transition-colors self-start mt-auto text-sm">Leer más &rarr;</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <ShareResults />

                                <div className="mt-20 text-center max-w-3xl mx-auto p-8 bg-gradient-to-br from-cyan-600 to-cyan-800 text-white rounded-2xl shadow-2xl">
                                    <h2 className="text-3xl md:text-4xl font-bold font-montserrat">¿Lista para tus Próximos Pasos?</h2>
                                    <p className="mt-4 text-lg text-cyan-100">Este diagnóstico es el primer paso hacia la claridad. El siguiente es crear un plan de acción.</p>
                                    <p className="mt-2 text-cyan-100">En una <strong>Sesión de Claridad gratuita de 30 minutos,</strong> podemos hablar de tus resultados y trazar un mapa personalizado para que te sientas mejor. Sin compromiso, solo apoyo real.</p>
                                     <a href="https://calendar.app.google/e66VNHbHuun6zVz38" target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-white text-cyan-700 font-bold py-4 px-10 rounded-full hover:bg-gray-100 transition-colors shadow-lg text-lg transform hover:-translate-y-1 animate-pulse-cta">
                                        Agendar mi Sesión Gratuita
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


// --- ContactPage ---
export const ContactPage: React.FC<PageProps> = ({ navigate }) => {
    useSEOMetadata('Contacto | Mila Ciudad', 'Conecta conmigo para hablar sobre tu bienestar, explorar talleres o proponer colaboraciones. Estoy aquí para escucharte.');
    
    const [activeTab, setActiveTab] = useState<'consultas' | 'colaboraciones'>('consultas');
    const [status, setStatus] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('sending');
        const form = event.currentTarget;
        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/xgegqjle", {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' },
            });

            if (response.ok) {
                setStatus('success');
                form.reset();
            } else {
                const errorData = await response.json();
                console.error("Formspree error:", errorData);
                setStatus('error');
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus('error');
        }
    };
    
    return (
        <div className="animate-fade-in bg-white">
            {/* Hero Section */}
            <section className="bg-white pt-16 md:pt-24">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-cyan-700">Conecta Conmigo, Hablemos de Tu Bienestar</h1>
                            <p className="mt-6 text-lg text-gray-600">Estoy aquí para escucharte. Explora mis próximos talleres o envíame un mensaje directo para comenzar tu camino hacia una vida más plena y activa.</p>
                        </div>
                        <div className="flex justify-center">
                            <img src="https://images.squidge.org/images/2025/11/01/Gemini_Generated_Image_anq9g2anq9g2anq9-Photoroom.webp" alt="Mila Ciudad" className="w-full max-w-sm" />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Workshops Section */}
            <section className="py-16 md:py-24 bg-gray-50/50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold font-montserrat text-center text-gray-800 mb-12">Próximas Conferencias y Talleres</h2>
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border">
                        <div className="grid md:grid-cols-5 items-center">
                            <div className="p-8 md:col-span-3 flex flex-col justify-center">
                                <span className="bg-cyan-100 text-cyan-700 text-xs font-bold px-3 py-1 rounded-full self-start">Próximamente</span>
                                <h3 className="mt-4 text-2xl font-bold font-montserrat text-gray-800">Lo Que Realmente nos Preocupa en la Menopausia</h3>
                                <p className="mt-3 text-gray-600">Un testimonio honesto sobre lo que miles de mujeres compartimos en silencio. Descubre que no estás sola en esta etapa.</p>
                                <button className="mt-6 bg-cyan-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-cyan-700 transition-colors self-start">
                                    Más Información
                                </button>
                            </div>
                            <div className="md:col-span-2 hidden md:flex justify-center items-center p-4">
                                <img src="https://images.squidge.org/images/2025/11/02/Mila-Ciudad-12-1.md.png" alt="Próximas Conferencias" className="w-full h-auto object-contain rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Contact Form Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-3xl font-bold font-montserrat text-center text-gray-800 mb-12">Envíame tu Consulta</h2>
                    <div className="bg-white rounded-xl shadow-lg border p-4 sm:p-8">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('consultas')}
                                className={`flex-1 py-3 text-center font-semibold transition-colors ${activeTab === 'consultas' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <i className="fas fa-comments mr-2"></i> Consultas sobre Mi Método
                            </button>
                            <button
                                onClick={() => setActiveTab('colaboraciones')}
                                className={`flex-1 py-3 text-center font-semibold transition-colors ${activeTab === 'colaboraciones' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <i className="fas fa-handshake mr-2"></i> Colaboraciones y Prensa
                            </button>
                        </div>
                        
                        {/* Tab Content */}
                        <div className="pt-8">
                            {activeTab === 'consultas' && (
                                <div className="text-center animate-fade-in">
                                    <h3 className="text-2xl font-bold text-cyan-700">La mejor forma de ayudarte es hablando</h3>
                                    <p className="mt-4 text-gray-600 max-w-xl mx-auto">Para consultas sobre mi método y cómo puedo acompañarte de forma personalizada, la <strong>Sesión de Claridad Gratuita</strong> es nuestro mejor punto de partida. Es una conversación sin compromiso donde podré entender tus necesidades y explicarte todo en detalle.</p>
                                    <a href="https://calendar.app.google/e66VNHbHuun6zVz38" target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-cyan-600 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-700 transition-colors shadow-lg transform hover:-translate-y-1">
                                        Agendar mi Sesión Gratuita
                                    </a>
                                </div>
                            )}
                            
                            {activeTab === 'colaboraciones' && (
                                <div className="animate-fade-in">
                                    <p className="text-center text-gray-600 mb-6">Para propuestas de conferencias, entrevistas, colaboraciones o prensa, por favor, utiliza este formulario.</p>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                                                <input type="text" name="name" id="name" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white text-gray-900" />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                                                <input type="email" name="email" id="email" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white text-gray-900" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Empresa / Medio de Comunicación</label>
                                            <input type="text" name="company" id="company" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white text-gray-900" />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
                                            <textarea name="message" id="message" rows={5} required placeholder="Describe brevemente tu propuesta..." className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white text-gray-900"></textarea>
                                        </div>
                                        <div>
                                            <button type="submit" disabled={status === 'sending'} className="w-full bg-cyan-600 text-white font-bold py-3 px-6 rounded-md hover:bg-cyan-700 transition-colors shadow disabled:bg-gray-400">
                                                {status === 'sending' ? 'Enviando...' : 'Enviar Propuesta'}
                                            </button>
                                        </div>
                                        {status === 'success' && <p className="text-green-600 text-center">¡Propuesta enviada con éxito! Gracias por tu interés.</p>}
                                        {status === 'error' && <p className="text-red-600 text-center">Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.</p>}
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};


// --- LegalPages ---
export const LegalPages: React.FC<{ page: Page; }> = ({ page }) => {
    const legalContent = {
        'aviso-legal': {
            title: 'Aviso Legal',
            content: `<p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico, a continuación se exponen los datos identificativos de la titular de este sitio web.</p>
            <p class="mt-2"><strong>Titular:</strong> Mila Ciudad</p>
            <p class="mt-2"><strong>Contacto:</strong> hola@milaciudad.com</p>
            <p class="mt-4">El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. El USUARIO se compromete a hacer un uso adecuado de los contenidos y servicios que Mila Ciudad ofrece a través de su portal.</p>`
        },
        'privacidad': {
            title: 'Política de Privacidad',
            content: `<p>De conformidad con lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD), le informamos que los datos personales y dirección de correo electrónico, recabados del propio interesado o de fuentes públicas, serán tratados bajo la responsabilidad de Mila Ciudad para el envío de comunicaciones sobre nuestros productos y servicios y se conservarán mientras exista un interés mutuo para ello.</p>
            <p class="mt-4">Los datos no serán comunicados a terceros, salvo obligación legal. Le informamos que puede ejercer los derechos de acceso, rectificación, portabilidad y supresión de sus datos y los de limitación y oposición a su tratamiento dirigiéndose a hola@milaciudad.com.</p>`
        },
        'cookies': {
            title: 'Política de Cookies',
            content: `<p>Este sitio web utiliza cookies (pequeños archivos de información que el servidor envía al ordenador de quien accede a la página) para llevar a cabo determinadas funciones que son consideradas imprescindibles para el correcto funcionamiento y visualización del sitio.</p>
            <p class="mt-4"><strong>Tipos de cookies utilizadas:</strong></p>
            <ul class="list-disc list-inside mt-2">
                <li><strong>Cookies técnicas:</strong> Son aquellas que permiten al usuario la navegación a través de una página web y la utilización de las diferentes opciones o servicios que en ella existan.</li>
                <li><strong>Cookies de análisis:</strong> Son aquellas que, bien tratadas por nosotros o por terceros, nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado.</li>
                <li><strong>Cookies de terceros:</strong> Este sitio puede utilizar servicios de terceros que recopilarán información con fines estadísticos, de uso del Site por parte del usuario y para la prestación de otros servicios relacionados con la actividad del Website y otros servicios de Internet.</li>
            </ul>
            <p class="mt-4">El usuario tiene la posibilidad de configurar su navegador para ser avisado de la recepción de cookies y para impedir su instalación en su equipo.</p>`
        }
    };
    
    const currentContent = legalContent[page as keyof typeof legalContent] || legalContent['aviso-legal'];
    useSEOMetadata(`${currentContent.title} | Mila Ciudad`, `Información legal sobre ${currentContent.title.toLowerCase()} del sitio web de Mila Ciudad.`);

    return (
        <div className="animate-fade-in container mx-auto px-6 py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold font-montserrat text-gray-700">{currentContent.title}</h1>
                <div className="prose prose-lg max-w-none mt-8" dangerouslySetInnerHTML={{ __html: currentContent.content }} />
            </div>
        </div>
    );
};


// --- Helper Components ---

const TestimonialsSection: React.FC = () => {
    const testimonials: Testimonial[] = [
        {
            quote: 'Mila me dio las herramientas y la confianza que necesitaba. Por primera vez en años, siento que tengo el control de mi cuerpo y no al revés. Su enfoque es práctico, empático y transformador.',
            author: 'Laura G.',
            age: 52,
            profession: 'Abogada',
        },
        {
            quote: 'Pensaba que la menopausia era algo que tenía que "aguantar". Mila me enseñó que es una etapa para florecer. Su método me ha devuelto la energía y la claridad mental que creía perdidas.',
            author: 'Carmen R.',
            age: 49,
            profession: 'Profesora',
        },
        {
            quote: 'El acompañamiento de Mila fue un antes y un después. Me sentía sola e incomprendida. Con ella encontré un espacio seguro para hablar de mis miedos y un plan de acción para sentirme mejor.',
            author: 'Isabel M.',
            age: 55,
            profession: 'Emprendedora',
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-cyan-50/50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-cyan-600">Lo que dicen las mujeres que han trabajado conmigo</h2>
                </div>
                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <AnimateOnScroll key={index} delay={`${index * 100}ms`}>
                            <div className="bg-white p-8 rounded-xl shadow-lg border h-full flex flex-col">
                                <i className="fas fa-quote-left text-3xl text-cyan-200"></i>
                                <p className="text-gray-600 italic my-4 flex-grow">"{testimonial.quote}"</p>
                                <div className="mt-auto">
                                    <p className="font-bold font-montserrat text-gray-800">{testimonial.author}</p>
                                    <p className="text-sm text-gray-500">{testimonial.profession}, {testimonial.age} años</p>
                                </div>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};