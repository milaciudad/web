import React, { useState, useEffect, useRef } from 'react';
import type { NavigationTarget, Page, Testimonial, BlogPost } from '../types';
import { LeadMagnetBanner, useSEOMetadata, AnimateOnScroll } from './UIComponents';
import { MenopauseJourney } from './MenopauseJourney';
import { FeaturedPostsSection } from './BlogComponents';
import { getBlogPosts } from '../services/cms';
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
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="flex justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                           <img 
                                src="https://images.squidge.org/images/2025/11/01/milaciudad.webp" 
                                alt="Mila Ciudad" 
                                className="w-auto h-[500px] md:h-[650px] lg:h-[750px] animate-float transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-5xl md:text-6xl font-extrabold font-montserrat gradient-text animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                Navega la menopausia con <strong>claridad y fortaleza</strong>
                            </h1>
                            <p className="mt-6 text-xl font-semibold text-gray-800 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>Una enfermera que sabe lo que es vivirla.</p>
                            <p className="mt-2 text-lg text-cyan-600 font-bold uppercase tracking-wider animate-fade-in-up" style={{ animationDelay: '0.6s' }}>EN UNA VIDA HAY MUCHAS VIDAS</p>
                            
                            <AnimateOnScroll className="mt-8" delay="0.8s">
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
                            
                            <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                                <h2 className="text-2xl font-bold font-montserrat text-cyan-600">Mi Lema de Vida</h2>
                                <h3 className="text-4xl font-extrabold font-montserrat text-gray-800 mt-2">NO TE DOBLEGUES</h3>
                                <p className="mt-4 text-gray-600 leading-relaxed text-justify">Más que un lema, es el motor que impulsa mi proyecto vital. Es un recordatorio de <strong>mantenerme fiel a mis valores,</strong> de afrontar la realidad con valentía y de compartir esa fortaleza con quienes me leen y escuchan. Soy enfermera, escritora y cantante; mi vocación es cuidar y dar voz. Esta es la historia de cómo decidí <strong>plantar cara a la menopausia.</strong></p>
                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <button onClick={() => navigate({ page: 'servicios' })} className="bg-cyan-600 text-white font-bold py-4 px-10 text-lg rounded-full hover:bg-cyan-700 transition-colors shadow-lg transform hover:-translate-y-0.5 animate-pulse-cta">
                                        DESCUBRE MI MÉTODO
                                    </button>
                                    <button onClick={() => navigate({ page: 'sobre-mi' })} className="bg-white text-cyan-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors border border-cyan-600 shadow-lg transform hover:-translate-y-0.5">
                                        CONOCE MI HISTORIA
                                    </button>
                                </div>
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
                            formId="sofocos-home"
                            redirectUrl="https://sofocosmenopausia.milaciudad.com/"
                            formspreeEndpoint="https://formspree.io/f/mqagygjl"
                            layout="horizontal"
                        />
                    </div>
                </div>
            </section>
            
            <FeaturedPostsSection posts={posts} navigate={navigate} originPage="home" />

            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        <LeadMagnetBanner
                            title="MI GUÍA <strong>ESENCIAL</strong> PARA LA MENOPAUSIA"
                            description={`<p>Una <strong>guía completa</strong> para entender y navegar esta etapa con claridad, herramientas prácticas y serenidad. Descubre cómo transformar los síntomas en una oportunidad para <strong>cuidarte como nunca.</strong></p>`}
                            imageUrl="https://images.squidge.org/images/2025/11/01/mila-ciudad-guia-meniopausia-Photoroom.md.png"
                            formId="guia-menopausia-home"
                            redirectUrl="https://todosobrelamenopausia.milaciudad.com/"
                            formspreeEndpoint="https://formspree.io/f/mqagygvl"
                            layout="horizontal"
                            imageFit="contain"
                            imageClassName="animate-float"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};


// --- AboutPage ---
export const AboutPage: React.FC<PageProps> = ({ navigate }) => {
    useSEOMetadata(
        'Mi Historia con la Menopausia | Sobre Mila Ciudad',
        'Conoce el viaje personal de Mila Ciudad. De enfermera a coach, descubre la historia que la impulsó a ayudar a otras mujeres a no doblegarse ante la menopausia.'
    );
    return <MenopauseJourney navigate={navigate} />;
};

// --- ServicesPage (Mi Método) ---
export const ServicesPage: React.FC<PageProps> = ({ navigate }) => {
    useSEOMetadata(
        'Mi Método MILACIUDAD+ | Coaching Personalizado de Menopausia',
        'Descubre el método de coaching MILACIUDAD+, un acompañamiento cercano para gestionar los síntomas de la menopausia, recuperar tu energía y sentirte acompañada.'
    );
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [pageUrl, setPageUrl] = useState('');
    const [copySuccess, setCopySuccess] = useState('');

    useEffect(() => {
        // Ensure this runs client-side as window is not defined server-side
        setPageUrl(window.location.href);
    }, []);

    const handleCopy = () => {
        if (!pageUrl) return;
        navigator.clipboard.writeText(pageUrl).then(() => {
            setCopySuccess('¡Copiado!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Error al copiar');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const testimonials: Testimonial[] = [
        {
            quote: "Sentía que había perdido el control de mi cuerpo y mi mente. El método de Mila me dio un mapa claro y, <strong>por primera vez en años, sentí que no estaba sola.</strong> He recuperado mi energía y, lo más importante, la confianza en mí misma.",
            author: "Laura G.",
            age: 52,
            profession: "Abogada",
        },
        {
            quote: "La sesión de claridad fue reveladora. Mila tiene una capacidad increíble para escuchar y hacerte ver las cosas desde otra perspectiva. Salí de esa conversación con <strong>una calma y una motivación que no esperaba.</strong> Fue el primer paso para un cambio real.",
            author: "Sofía M.",
            age: 48,
            profession: "Diseñadora Gráfica",
        },
        {
            quote: "Dudaba si un coaching era para mí, pero la cercanía de Mila y su experiencia como enfermera me convencieron. <strong>Ha sido la mejor inversión en mi salud.</strong> Entiendo mi cuerpo y tengo herramientas para gestionar los síntomas que antes me desbordaban.",
            author: "Carmen R.",
            age: 55,
            profession: "Profesora",
        },
        {
            quote: "Gracias a Mila <strong>he vuelto a dormir noches enteras.</strong> Su enfoque integral, que combina nutrición, hábitos y gestión emocional, ha sido un cambio radical. Me siento más vital y con más claridad mental que hace diez años.",
            author: "Isabel V.",
            age: 50,
            profession: "Empresaria",
        }
    ];

    const faqs = [
        {
            question: "¿Esta sesión tiene algún coste?",
            answer: "No, la Sesión de Claridad es <strong>100% gratuita y sin ningún tipo de compromiso.</strong> Es una conversación honesta para que nos conozcamos, para que yo pueda entender tus desafíos y para que tú puedas ver si mi enfoque resuena contigo."
        },
        {
            question: "¿Qué pasa si después de la sesión decido que no es para mí?",
            answer: "<strong>Absolutamente nada.</strong> Mi prioridad es tu bienestar. Si sientes que mi método no es lo que necesitas en este momento, o si yo misma considero que no soy la persona adecuada para ayudarte, te lo diré con total transparencia. El objetivo es que salgas de la sesión con claridad, no con una obligación."
        },
        {
            question: "¿Se habla de precios en la sesión de claridad?",
            answer: "El foco principal de la sesión es escucharte y aportarte valor. <strong>Solo si al final de nuestra conversación ambas sentimos que hay una conexión real</strong> y que mi programa MILACIUDAD+ es el siguiente paso lógico para ti, te explicaré todos los detalles, incluida la inversión, de forma clara y sin ninguna presión."
        },
        {
            question: "¿Qué pasa si no soy candidata al programa?",
            answer: "Mi compromiso es contigo. Si durante nuestra conversación considero que mis herramientas no son las que mejor se adaptan a tu situación particular, <strong>te lo diré con total honestidad.</strong> Siempre que sea posible, intentaré orientarte hacia otros recursos o profesionales que puedan ser de más ayuda para ti."
        }
    ];

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
    <div className="animate-fade-in bg-white">
        {/* Header */}
        <section className="py-16 md:py-24 bg-gray-50/50">
            <AnimateOnScroll className="container mx-auto px-6 text-center max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-extrabold font-montserrat gradient-text">Mi Método: Un Viaje de <strong>Acompañamiento Personalizado</strong></h1>
                <p className="mt-6 text-lg text-gray-600 leading-relaxed">He diseñado un camino para que <strong>recuperes el control de tu bienestar,</strong> transformes la incertidumbre en poder y te sientas acompañada en cada paso de esta nueva etapa.</p>
            </AnimateOnScroll>
        </section>

        {/* 1. Problem Identification */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-5xl">
                <AnimateOnScroll className="text-center">
                    <h2 className="text-3xl font-bold font-montserrat text-gray-800">¿Te Sientes Identificada?</h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Si asientes con la cabeza al leer esto, quiero que sepas que <strong>no estás sola</strong> y que lo que sientes <strong>tiene solución.</strong></p>
                </AnimateOnScroll>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    <AnimateOnScroll className="h-full">
                        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-cyan-500 text-center h-full">
                            <i className="fas fa-cloud text-5xl text-cyan-400 mb-4"></i>
                            <h3 className="font-bold font-montserrat text-xl text-gray-700">Niebla Mental y Fatiga</h3>
                            <p className="mt-2 text-gray-600">Sientes que tu <strong>energía se ha esfumado</strong> y te cuesta concentrarte en las tareas más simples.</p>
                        </div>
                    </AnimateOnScroll>
                    <AnimateOnScroll className="h-full" delay="0.1s">
                        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-cyan-500 text-center h-full">
                            <i className="fas fa-sync-alt text-5xl text-cyan-400 mb-4"></i>
                            <h3 className="font-bold font-montserrat text-xl text-gray-700">Cambios Inexplicables</h3>
                            <p className="mt-2 text-gray-600">Tu cuerpo parece haber cambiado las reglas del juego <strong>sin avisar,</strong> con síntomas que no entiendes.</p>
                        </div>
                    </AnimateOnScroll>
                    <AnimateOnScroll className="h-full" delay="0.2s">
                        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-cyan-500 text-center h-full">
                            <i className="far fa-comment-dots text-5xl text-cyan-400 mb-4"></i>
                            <h3 className="font-bold font-montserrat text-xl text-gray-700">Soledad e Incomprensión</h3>
                            <p className="mt-2 text-gray-600">Te sientes <strong>invisible,</strong> como si nadie entendiera realmente por lo que estás pasando.</p>
                        </div>
                    </AnimateOnScroll>
                </div>
            </div>
        </section>

        {/* 2. El Método MILACIUDAD+ */}
        <section className="py-16 md:py-24 bg-gray-50/50">
            <div className="container mx-auto px-6 max-w-5xl text-center">
                <AnimateOnScroll>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-montserrat gradient-text animate-gradient-text">
                        El Método MILACIUDAD+
                    </h2>
                    <p className="mt-4 text-xl md:text-2xl text-gray-700 font-lora">
                        Tu Viaje Guiado hacia la <strong>Plenitud</strong>
                    </p>
                </AnimateOnScroll>
                <AnimateOnScroll className="mt-12 max-w-3xl mx-auto">
                    <div className="bg-cyan-50/30 p-10 md:p-12 rounded-xl shadow-lg border-t-4 border-cyan-200 text-center">
                        <i className="fas fa-spa text-5xl text-cyan-400 mb-6"></i>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            <strong className="font-montserrat text-cyan-600">MILACIUDAD+</strong> es más que un programa; es un <strong>espacio de transformación</strong> diseñado exclusivamente para la mujer que está lista para <strong>tomar las riendas de su bienestar.</strong> He fusionado mi doble experiencia, como enfermera y como mujer que ha navegado esta misma transición, para crear un sistema de acompañamiento que te proporciona <strong>claridad, herramientas validadas</strong> y el <strong>apoyo constante</strong> que necesitas para avanzar con confianza y serenidad.
                        </p>
                    </div>
                </AnimateOnScroll>
                
                <div className="grid md:grid-cols-2 gap-8 mt-12 text-left">
                    <AnimateOnScroll>
                        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-cyan-100 hover:-translate-y-1 h-full">
                            <div className="flex items-center gap-4">
                                <div className="bg-cyan-100 text-cyan-600 p-3 rounded-full">
                                    <i className="fas fa-calendar-check text-2xl w-8 text-center"></i>
                                </div>
                                <h3 className="text-xl font-bold font-montserrat text-gray-800">Un Trimestre para tu Transformación</h3>
                            </div>
                            <p className="mt-4 text-gray-600">Un marco de tiempo diseñado para <strong>profundizar, integrar hábitos y lograr cambios sostenibles.</strong> A través de 6 sesiones quincenales, construimos juntas una base sólida para tu bienestar a largo plazo.</p>
                        </div>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay="0.1s">
                        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-cyan-100 hover:-translate-y-1 h-full">
                            <div className="flex items-center gap-4">
                                <div className="bg-cyan-100 text-cyan-600 p-3 rounded-full">
                                    <i className="fas fa-headset text-2xl w-8 text-center"></i>
                                </div>
                                <h3 className="text-xl font-bold font-montserrat text-gray-800">Acompañamiento Cercano y Constante</h3>
                            </div>
                            <p className="mt-4 text-gray-600"><strong>No caminarás sola.</strong> Tienes acceso directo a mí vía WhatsApp para resolver dudas, compartir tus avances o recibir ese impulso de motivación justo cuando más lo necesitas.</p>
                        </div>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay="0.2s">
                        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-cyan-100 hover:-translate-y-1 h-full">
                            <div className="flex items-center gap-4">
                                <div className="bg-cyan-100 text-cyan-600 p-3 rounded-full">
                                    <i className="fas fa-drafting-compass text-2xl w-8 text-center"></i>
                                </div>
                                <h3 className="text-xl font-bold font-montserrat text-gray-800">Una Hoja de Ruta Exclusiva para Ti</h3>
                            </div>
                            <p className="mt-4 text-gray-600">Tu viaje es único. <strong>Co-crearemos un plan de acción a medida,</strong> basado en tus necesidades, tu estilo de vida y tus objetivos personales. No hay soluciones genéricas, solo tu camino.</p>
                        </div>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay="0.3s">
                        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-cyan-100 hover:-translate-y-1 h-full">
                            <div className="flex items-center gap-4">
                                <div className="bg-cyan-100 text-cyan-600 p-3 rounded-full">
                                    <i className="fas fa-leaf text-2xl w-8 text-center"></i>
                                </div>
                                <h3 className="text-xl font-bold font-montserrat text-gray-800">Una Inversión en tu Futuro Bienestar</h3>
                            </div>
                            <p className="mt-4 text-gray-600">Esto no es un gasto, es una <strong>inversión en ti misma.</strong> Adquieres herramientas, conocimientos y una nueva perspectiva que te acompañarán mucho más allá de nuestros tres meses juntas.</p>
                        </div>
                    </AnimateOnScroll>
                </div>
            </div>
        </section>

        {/* 3. Benefits */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-5xl">
                <AnimateOnScroll className="text-center">
                    <h2 className="text-3xl font-bold font-montserrat text-gray-800">Al Finalizar Nuestro Viaje Juntas, Habrás Conseguido:</h2>
                </AnimateOnScroll>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                    <AnimateOnScroll className="text-center p-6"><i className="fas fa-bolt text-4xl text-cyan-500 mb-3"></i><h4 className="font-semibold font-montserrat">Más <strong>Energía y Vitalidad</strong></h4></AnimateOnScroll>
                    <AnimateOnScroll className="text-center p-6" delay="0.1s"><i className="fas fa-brain text-4xl text-cyan-500 mb-3"></i><h4 className="font-semibold font-montserrat"><strong>Claridad Mental</strong> y Enfoque</h4></AnimateOnScroll>
                    <AnimateOnScroll className="text-center p-6" delay="0.2s"><i className="fas fa-heart-pulse text-4xl text-cyan-500 mb-3"></i><h4 className="font-semibold font-montserrat"><strong>Herramientas</strong> para Gestionar Síntomas</h4></AnimateOnScroll>
                    <AnimateOnScroll className="text-center p-6" delay="0.3s"><i className="fas fa-spa text-4xl text-cyan-500 mb-3"></i><h4 className="font-semibold font-montserrat"><strong>Paz con tu Cuerpo</strong> y esta Nueva Etapa</h4></AnimateOnScroll>
                </div>
            </div>
        </section>

        {/* 4. Testimonials */}
        <section className="py-12 md:py-20 bg-cyan-700 text-white">
            <div className="container mx-auto px-6 max-w-7xl">
                <AnimateOnScroll className="text-center">
                    <h2 className="text-3xl font-bold font-montserrat">Lo que Dicen las Mujeres que ya han Recorrido este Camino</h2>
                </AnimateOnScroll>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <AnimateOnScroll key={index} className="h-full" delay={`${index * 0.1}s`}>
                            <div className="bg-cyan-800 p-6 rounded-lg shadow-lg flex flex-col text-center h-full transition-all duration-300 transform hover:-translate-y-2 hover:shadow-cyan-900/50 hover:shadow-xl">
                                <p className="text-base italic text-cyan-100 flex-grow" dangerouslySetInnerHTML={{ __html: `"${testimonial.quote}"` }}></p>
                                <div className="mt-4">
                                    <p className="font-bold">- {testimonial.author}</p>
                                    <p className="text-sm text-cyan-200">{testimonial.age} años, {testimonial.profession}</p>
                                </div>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>
            </div>
        </section>

        {/* 5. CTA - Clarity Session */}
        <AnimateOnScroll>
            <section className="py-20 md:py-32 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Image */}
                        <div className="flex justify-center">
                            <img 
                                src="https://images.squidge.org/images/2025/10/29/Gemini_Generated_Image_anq9g2anq9g2anq9-Photoroom.md.webp" 
                                alt="Mila Ciudad" 
                                className="rounded-lg shadow-2xl max-w-md w-full transform transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <h2 className="text-4xl font-bold font-montserrat text-gray-800">Tu Primer Paso Hacia el Cambio</h2>
                            <p className="mt-4 text-lg font-semibold text-cyan-600">Agenda tu <strong>Sesión de Claridad Gratuita</strong></p>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Este es tu espacio seguro y confidencial. <strong>Una conversación de 30-45 minutos, sin compromiso,</strong> diseñada para que te sientas escuchada y comprendida.
                            </p>
                            
                            <div className="mt-8 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-cyan-100 text-cyan-600 p-3 rounded-full mt-1">
                                        <i className="fas fa-ear-listen text-2xl w-8 text-center"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold font-montserrat text-lg text-gray-700">Escucharé tu Historia</h4>
                                        <p className="text-gray-600">Profundizaremos en tus <strong>desafíos y necesidades únicas</strong> para entender tu punto de partida.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-cyan-100 text-cyan-600 p-3 rounded-full mt-1">
                                        <i className="fas fa-compass text-2xl w-8 text-center"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold font-montserrat text-lg text-gray-700">Trazaré un Primer Mapa</h4>
                                        <p className="text-gray-600">Te llevarás una <strong>visión clara</strong> de los posibles siguientes pasos hacia tu bienestar y tus objetivos.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-cyan-100 text-cyan-600 p-3 rounded-full mt-1">
                                        <i className="fas fa-hands-helping text-2xl w-8 text-center"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold font-montserrat text-lg text-gray-700">Decidiré si Conectamos</h4>
                                        <p className="text-gray-600">Al final, valoraremos juntas si mi método es el adecuado para ti. <strong>Sin presión, con total honestidad.</strong></p>
                                    </div>
                                </div>
                            </div>
                            <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1xusc8tIardp1BNw4BXAY6IuRIxpqy-d8N5C1El2Hfo_30ls6gLiTrmGImyoHyy1xamV3wfzU3" target="_blank" rel="noopener noreferrer" className="mt-10 inline-block bg-cyan-600 text-white font-bold py-4 px-10 rounded-full hover:bg-cyan-700 transition-colors shadow-xl text-lg transform hover:-translate-y-1">
                                RESERVAR MI SESIÓN GRATUITA
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </AnimateOnScroll>


        {/* 6. FAQ */}
        <section className="py-16 md:py-24 bg-gray-50/50">
            <div className="container mx-auto px-6 max-w-3xl">
                <AnimateOnScroll className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-montserrat text-gray-800">Preguntas Frecuentes</h2>
                </AnimateOnScroll>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <AnimateOnScroll key={index} delay={`${index * 0.1}s`}>
                            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-700"
                                >
                                    <span>{faq.question}</span>
                                    <i className={`fas fa-chevron-down transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}></i>
                                </button>
                                <div className={`transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-5 pt-0 text-gray-600">
                                        <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
                                    </div>
                                </div>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>
            </div>
        </section>

        {/* 7. Share Section */}
        {pageUrl && (
            <AnimateOnScroll>
                <section className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <div className="p-8 bg-gray-50/50 rounded-lg shadow-lg border text-center">
                            <i className="fas fa-share-alt text-4xl text-cyan-500 mb-4"></i>
                            <h3 className="text-2xl font-bold font-montserrat text-cyan-700">¿Crees que esto puede ayudar a alguien más?</h3>
                            <p className="mt-2 text-gray-600 max-w-md mx-auto">Si conoces a otras mujeres que se beneficiarían de este enfoque, <strong>compartir esta página</strong> es una forma maravillosa de apoyarlas.</p>
                            <div className="mt-6 flex flex-wrap justify-center items-center gap-4">
                                {/* WhatsApp */}
                                <a href={`https://wa.me/?text=${encodeURIComponent("He encontrado este método para la menopausia de Mila Ciudad y creo que podría interesarte. ¡Echa un vistazo!")}%20${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:bg-green-600 transition-colors transform hover:scale-110" aria-label="Compartir en WhatsApp">
                                    <i className="fab fa-whatsapp"></i>
                                </a>
                                {/* Facebook */}
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:bg-blue-700 transition-colors transform hover:scale-110" aria-label="Compartir en Facebook">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                {/* LinkedIn */}
                                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent("Un método para la menopausia que te puede interesar")}&summary=${encodeURIComponent("He encontrado este método de Mila Ciudad y creo que podría interesarte.")}`} target="_blank" rel="noopener noreferrer" className="bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:bg-blue-800 transition-colors transform hover:scale-110" aria-label="Compartir en LinkedIn">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                {/* Instagram Link to profile */}
                                <a href="https://www.instagram.com/mila.ciudad/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:opacity-90 transition-opacity transform hover:scale-110" aria-label="Visitar Instagram">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                {/* Email */}
                                <a href={`mailto:?subject=${encodeURIComponent("Un método que te puede interesar")}&body=${encodeURIComponent("He encontrado este método para la menopausia de Mila Ciudad y creo que podría interesarte. ¡Echa un vistazo!")}%0D%0A%0D%0A${pageUrl}`} className="bg-gray-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:bg-gray-600 transition-colors transform hover:scale-110" aria-label="Compartir por correo electrónico">
                                    <i className="fas fa-envelope"></i>
                                </a>
                                {/* Copy Link */}
                                <button onClick={handleCopy} className="bg-cyan-600 text-white h-12 px-6 rounded-full flex items-center justify-center hover:bg-cyan-700 transition-colors transform hover:scale-105">
                                    <i className="fas fa-link mr-2"></i> {copySuccess || 'Copiar Enlace'}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimateOnScroll>
        )}
    </div>
    );
};


// --- MenopausePage ---
export const MenopausePage: React.FC<PageProps> = ({ navigate }) => {
    useSEOMetadata(
        'Centro de Recursos para la Menopausia | Mila Ciudad',
        'Información, herramientas y estrategias basadas en la evidencia para que navegues la menopausia con confianza, poder y serenidad.'
    );
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        getBlogPosts().then(setPosts);
    }, []);

    const symptoms = [
        { name: 'Niebla Mental', icon: 'fa-cloud', description: 'Olvidos, falta de concentración y esa sensación de confusión.', linkSlug: 'no-estoy-perdiendo-memoria-cerebro-menopausia' },
        { name: 'Insomnio y Sofocos', icon: 'fa-moon', description: 'Noches interrumpidas y calores súbitos que agotan tu energía.', linkSlug: 'sueno-perdido-estrategia-enfermera' },
        { name: 'Ansiedad y Humor', icon: 'fa-heart-pulse', description: 'Cambios de humor, irritabilidad y una ansiedad que no entiendes.', linkSlug: 'el-miedo-paraliza-tu-valia' },
        { name: 'Cambios Físicos', icon: 'fa-weight-scale', description: 'Aumento de peso, cambios en la piel y dolores articulares.', linkSlug: 'metabolismo-menopausia-no-esta-roto' },
    ];

    const keyArticles = posts.filter(p => ['resistencia-insulina-saboteador-silencioso-menopausia', 'hormonas-revolucion-perimenopausia'].includes(p.slug));

    const SimpleArticleCard: React.FC<{ post: BlogPost }> = ({ post }) => (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col">
            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-contain bg-gray-50" />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold font-montserrat text-gray-800">{post.title}</h3>
                <p className="mt-2 text-gray-600 text-sm flex-grow text-justify">{post.excerpt}</p>
                <button onClick={() => navigate({ page: 'blog', postSlug: post.slug, originPage: 'menopausia' })} className="mt-4 font-semibold text-cyan-600 hover:text-cyan-800 self-start">
                    Leer artículo &rarr;
                </button>
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in bg-white">
            {/* Header */}
            <section className="py-16 md:py-24 bg-gray-50/50">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-montserrat gradient-text">Tu Centro de Recursos para la Menopausia</h1>
                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">Información, herramientas y estrategias <strong>basadas en la evidencia</strong> para que navegues esta etapa con <strong>confianza, poder y serenidad.</strong></p>
                </div>
            </section>

            {/* Symptoms Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-montserrat text-gray-800">Navega por Síntomas</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Haz clic en <strong>tu mayor desafío</strong> para encontrar artículos y soluciones específicas.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {symptoms.map((symptom) => (
                            <div key={symptom.name} onClick={() => navigate({ page: 'blog', postSlug: symptom.linkSlug, originPage: 'menopausia' })} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-cyan-500 text-center transition-all duration-300 hover:shadow-cyan-200 hover:-translate-y-2 cursor-pointer flex flex-col">
                                <i className={`fas ${symptom.icon} text-5xl text-cyan-400 mb-4`}></i>
                                <h3 className="font-bold font-montserrat text-xl text-gray-700">{symptom.name}</h3>
                                <p className="mt-2 text-gray-600 text-sm flex-grow">{symptom.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Articles Section */}
            {keyArticles.length > 0 && (
                <section className="py-16 md:py-24 bg-gray-50/50">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold font-montserrat text-gray-800">Lecturas Clave para Entender esta Etapa</h2>
                            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Dos artículos <strong>esenciales</strong> para comprender los cambios que estás viviendo.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {keyArticles.map(post => <SimpleArticleCard key={post.slug} post={post} />)}
                        </div>
                    </div>
                </section>
            )}

            {/* Tools Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-montserrat text-gray-800">Tus Herramientas Esenciales</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Empieza a <strong>tomar el control hoy mismo</strong> con estas guías prácticas.</p>
                    </div>
                    <div className="grid lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-3">
                            <LeadMagnetBanner
                                title="MI GUÍA <strong>ESENCIAL</strong> PARA LA MENOPAUSIA"
                                description={`
                                    <p class="mb-4">Una <strong>guía completa</strong> para entender y navegar esta etapa con claridad, herramientas prácticas y serenidad. Descubre cómo transformar los síntomas en una oportunidad para <strong>cuidarte como nunca.</strong></p>
                                `}
                                imageUrl="https://images.squidge.org/images/2025/11/01/mila-ciudad-guia-meniopausia-Photoroom.md.png"
                                formId="guia-menopausia-page"
                                redirectUrl="https://todosobrelamenopausia.milaciudad.com/"
                                formspreeEndpoint="https://formspree.io/f/mqagygvl"
                                layout="vertical"
                                imageFit="contain"
                            />
                        </div>
                        <div className="lg:col-span-2 bg-cyan-50/80 rounded-2xl shadow-lg border border-cyan-100/80 overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col p-8 md:p-10 text-center items-center justify-center">
                             <i className="fas fa-spa text-6xl text-cyan-300 mb-6"></i>
                            <h2 className="text-3xl font-bold font-montserrat text-cyan-700">Diagnóstico de Bienestar</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed flex-grow">Evalúa en <strong>2 minutos</strong> las áreas clave de tu salud y obtén una <strong>visión clara</strong> de tu estado actual para saber por dónde empezar.</p>
                             <button onClick={() => navigate({ page: 'diagnostico' })} className="mt-6 bg-cyan-600 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-700 transition-colors shadow-lg transform hover:-translate-y-0.5">
                                HACER EL DIAGNÓSTICO
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 md:py-32 bg-cyan-700 text-white">
                <div className="container mx-auto px-6 text-center max-w-3xl">
                    <h2 className="text-4xl font-bold font-montserrat">¿Lista para un Plan Personalizado?</h2>
                    <p className="mt-6 text-lg text-cyan-100 leading-relaxed">La información es el primer paso, pero <strong>el acompañamiento cercano marca la diferencia.</strong> Si quieres ir más allá de los consejos generales y crear una hoja de ruta <strong>adaptada 100% a ti,</strong> estoy aquí para ayudarte.</p>
                    <button onClick={() => navigate({ page: 'servicios' })} className="mt-10 bg-white text-cyan-700 font-bold py-4 px-10 rounded-full hover:bg-gray-100 transition-colors shadow-xl text-lg transform hover:-translate-y-1">
                        DESCUBRE MI MÉTODO
                    </button>
                </div>
            </section>
        </div>
    );
};


// --- DiagnosticPage ---
export const DiagnosticPage: React.FC<PageProps> = ({ navigate }) => {
    useSEOMetadata(
        'Diagnóstico de Bienestar | Evalúa tu Salud en la Menopausia',
        'Evalúa en 2 minutos las áreas clave de tu salud y obtén una visión clara de tu estado actual para saber por dónde empezar a mejorar tu bienestar.'
    );
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>(new Array(12).fill(0));
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [pageUrl, setPageUrl] = useState('');
    const [copySuccess, setCopySuccess] = useState('');

    useEffect(() => {
        setPageUrl(window.location.href);
    }, []);

    const handleCopy = () => {
        if (!pageUrl) return;
        navigator.clipboard.writeText(pageUrl).then(() => {
            setCopySuccess('¡Copiado!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Error al copiar');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };
    
    const questions = [
        // Síntomas Físicos
        { category: 'Síntomas Físicos', question: '¿Con qué frecuencia experimentas sofocos o sudores nocturnos?' },
        { category: 'Síntomas Físicos', question: '¿Cómo calificarías la calidad de tu sueño?' },
        { category: 'Síntomas Físicos', question: '¿Sientes dolores articulares o musculares inexplicables?' },
        { category: 'Síntomas Físicos', question: '¿Has notado cambios en tu piel (sequedad) o cabello (caída)?' },
        // Bienestar Emocional
        { category: 'Bienestar Emocional', question: '¿Experimentas cambios de humor, irritabilidad o ansiedad?' },
        { category: 'Bienestar Emocional', question: '¿Sientes una falta de motivación o interés en actividades que antes disfrutabas?' },
        { category: 'Bienestar Emocional', question: '¿Cómo está tu nivel de estrés en el día a día?' },
        { category: 'Bienestar Emocional', question: '¿Has notado una disminución de la libido o molestias íntimas?' },
        // Energía y Estilo de Vida
        { category: 'Energía y Estilo de Vida', question: '¿Cómo describirías tus niveles de energía a lo largo del día?' },
        { category: 'Energía y Estilo de Vida', question: '¿Sufres de "niebla mental", olvidos o dificultad para concentrarte?' },
        { category: 'Energía y Estilo de Vida', question: '¿Has notado un aumento de peso, especialmente en la zona abdominal?' },
        { category: 'Energía y Estilo de Vida', question: '¿Con qué frecuencia realizas ejercicio o actividad física?' },
    ];
    
    const options = [
        'Nada / Nunca',
        'Un poco / A veces',
        'Bastante / Frecuentemente',
        'Mucho / Casi siempre'
    ];
    
    const handleAnswer = (value: number) => {
        setSelectedAnswer(value);
    };

    const handleNext = () => {
        if (selectedAnswer === null) return;
        const newAnswers = [...answers];
        newAnswers[step - 1] = selectedAnswer;
        setAnswers(newAnswers);
        setSelectedAnswer(null);
        setStep(step + 1);
    };

    const getResults = () => {
        const physicalScore = answers.slice(0, 4).reduce((a, b) => a + b, 0);
        const emotionalScore = answers.slice(4, 8).reduce((a, b) => a + b, 0);
        const lifestyleScore = answers.slice(8, 12).reduce((a, b) => a + b, 0);
        const totalScore = (physicalScore + emotionalScore + lifestyleScore) / (12 * 3) * 100;
        
        const data = [
            { subject: 'S. Físicos', A: (physicalScore / 12) * 100, fullMark: 100 },
            { subject: 'B. Emocional', A: (emotionalScore / 12) * 100, fullMark: 100 },
            { subject: 'Estilo de Vida', A: (lifestyleScore / 12) * 100, fullMark: 100 },
        ];
        
        const scores = {
            'Síntomas Físicos': (physicalScore / 12) * 100,
            'Bienestar Emocional': (emotionalScore / 12) * 100,
            'Energía y Estilo de Vida': (lifestyleScore / 12) * 100,
        };
        
        const lowestArea = Object.entries(scores).sort(([,a],[,b]) => b-a)[0][0];
        
        return { totalScore, data, lowestArea };
    };

    const resetQuiz = () => {
        setStep(0);
        setAnswers(new Array(12).fill(0));
        setSelectedAnswer(null);
    };

    const currentQuestion = questions[step - 1];
    const progress = step > 0 ? ((step - 1) / questions.length) * 100 : 0;
    
    const renderContent = () => {
        if (step === 0) {
            return (
                 <div className="text-center animate-fade-in">
                    <i className="fas fa-spa text-6xl text-cyan-300 mb-6"></i>
                    <h1 className="text-4xl md:text-5xl font-extrabold font-montserrat text-cyan-700">Diagnóstico de Bienestar</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">¿Sientes que algo ha cambiado? Evalúa en <strong>2 minutos</strong> las áreas clave de tu salud y obtén una <strong>visión clara de tu estado actual</strong> para saber por dónde empezar.</p>
                    <button onClick={() => setStep(1)} className="mt-8 font-semibold text-cyan-600 hover:text-cyan-800 text-lg group">
                        Hacer el diagnóstico <span className="transition-transform duration-300 inline-block group-hover:translate-x-2">&rarr;</span>
                    </button>
                </div>
            );
        }

        if (step <= questions.length) {
            return (
                <div className="animate-fade-in w-full">
                    <div className="text-center mb-8">
                        <p className="font-semibold text-cyan-600">{currentQuestion.category}</p>
                        <h2 className="text-2xl md:text-3xl font-semibold mt-2 text-gray-700">{currentQuestion.question}</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 my-8">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${selectedAnswer === index ? 'bg-cyan-600 text-white border-cyan-700 shadow-lg' : 'bg-white border-gray-200 hover:border-cyan-400 hover:shadow-md'}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                         <button onClick={handleNext} disabled={selectedAnswer === null} className="bg-cyan-600 text-white font-bold py-3 px-12 rounded-full hover:bg-cyan-700 transition-colors shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed">
                            {step === questions.length ? 'Ver mis resultados' : 'Siguiente'}
                        </button>
                    </div>

                    <div className="mt-12">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-cyan-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-center text-sm text-gray-500 mt-2">Progreso: {Math.round(progress)}%</p>
                    </div>
                </div>
            );
        }
        
        const { totalScore, data, lowestArea } = getResults();
        
        const encodedPageUrl = encodeURIComponent(pageUrl);
        const encodedTitle = encodeURIComponent("Diagnóstico de Bienestar para la Menopausia");
        const encodedText = encodeURIComponent("Acabo de hacer este test de bienestar para la menopausia y me ha parecido súper útil. ¡Te animo a hacerlo!");

        return (
            <div className="text-center animate-fade-in">
                <h2 className="text-3xl font-bold font-montserrat text-cyan-700">Tus Resultados de Bienestar</h2>
                <div className="w-full h-80 my-8">
                    <ResponsiveContainer>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                            <Radar name="Bienestar" dataKey="A" stroke="#0891B2" fill="#06B6D4" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-lg text-gray-600">Tu puntuación general de bienestar es de <strong>{100 - Math.round(totalScore)}%</strong>.</p>
                <p className="mt-4 text-lg max-w-xl mx-auto">Veo que tu mayor desafío ahora mismo es el área de <strong>{lowestArea}</strong>. Es completamente normal sentirse así en esta etapa, y quiero que sepas que <strong>no estás sola.</strong></p>
                <div className="mt-8 bg-cyan-50/50 p-6 rounded-lg border border-cyan-200">
                    <p className="text-lg font-semibold text-cyan-700">En tu <strong>sesión de claridad gratuita,</strong> podemos explorar juntas cómo mejorar en esta área y crear un <strong>primer plan de acción</strong> para que empieces a sentirte mejor.</p>
                    <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1xusc8tIardp1BNw4BXAY6IuRIxpqy-d8N5C1El2Hfo_30ls6gLiTrmGImyoHyy1xamV3wfzU3" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-cyan-600 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-700 transition-colors shadow-lg">
                        Agendar mi Sesión Gratuita
                    </a>
                </div>
                <button onClick={resetQuiz} className="mt-6 text-sm text-gray-500 hover:underline">Volver a hacer el diagnóstico</button>
                
                {pageUrl && (
                    <div className="mt-16 p-8 bg-white rounded-lg shadow-lg border">
                        <i className="fas fa-share-alt text-4xl text-cyan-500 mb-4"></i>
                        <h3 className="text-2xl font-bold font-montserrat text-cyan-700">¿Te ha sido útil? ¡Compártelo!</h3>
                        <p className="mt-2 text-gray-600 max-w-md mx-auto">Seguro que conoces a otras mujeres que se sienten como tú. <strong>Compartir esta herramienta</strong> puede ser el primer paso para que ellas también empiecen a cuidarse.</p>
                        <div className="mt-6 flex flex-wrap justify-center items-center gap-4">
                            <a href={`https://wa.me/?text=${encodedText}%20${encodedPageUrl}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:bg-green-600 transition-colors transform hover:scale-110" aria-label="Compartir en WhatsApp">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedPageUrl}`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:bg-blue-700 transition-colors transform hover:scale-110" aria-label="Compartir en Facebook">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href={`https://twitter.com/intent/tweet?url=${encodedPageUrl}&text=${encodedText}`} target="_blank" rel="noopener noreferrer" className="bg-sky-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:bg-sky-600 transition-colors transform hover:scale-110" aria-label="Compartir en Twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedPageUrl}&title=${encodedTitle}&summary=${encodedText}`} target="_blank" rel="noopener noreferrer" className="bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:bg-blue-800 transition-colors transform hover:scale-110" aria-label="Compartir en LinkedIn">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="https://www.instagram.com/mila.ciudad/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:opacity-90 transition-opacity transform hover:scale-110" aria-label="Visitar Instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href={`mailto:?subject=${encodedTitle}&body=${encodedText}%0D%0A%0D%0APuedes hacerlo aquí: ${pageUrl}`} className="bg-gray-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:bg-gray-600 transition-colors transform hover:scale-110" aria-label="Compartir por correo electrónico">
                                <i className="fas fa-envelope"></i>
                            </a>
                            <button onClick={handleCopy} className="bg-cyan-600 text-white h-12 px-6 rounded-full flex items-center justify-center hover:bg-cyan-700 transition-colors transform hover:scale-105">
                                <i className="fas fa-link mr-2"></i> {copySuccess || 'Copiar Enlace'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="py-16 md:py-24 bg-gray-50/50">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border flex justify-center items-center min-h-[600px]">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};


// --- ContactPage ---
export const ContactPage: React.FC = () => {
    useSEOMetadata(
        'Contacto | Habla con Mila Ciudad',
        'Conecta conmigo para agendar tu sesión de claridad, proponer colaboraciones o consultar sobre talleres. Estoy aquí para escucharte.'
    );
    const [activeTab, setActiveTab] = useState('consulta');

    return (
        <div className="animate-fade-in py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
                {/* Intro Section */}
                <section className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold font-montserrat text-cyan-700">Conecta Conmigo,<br/><strong>Hablemos de Tu Bienestar</strong></h1>
                        <p className="mt-6 text-lg text-gray-600 leading-relaxed"><strong>Estoy aquí para escucharte.</strong> Explora mis próximos talleres o envíame un mensaje directo para comenzar tu camino hacia una vida más plena y activa.</p>
                    </div>
                    <div className="animate-fade-in-right flex justify-center">
                        <img src="https://images.squidge.org/images/2025/10/29/Gemini_Generated_Image_anq9g2anq9g2anq9-Photoroom.md.webp" alt="Mila Ciudad" className="rounded-lg shadow-xl max-w-md w-full" />
                    </div>
                </section>
                
                {/* Events Section */}
                <section className="mt-24">
                    <h2 className="text-3xl font-bold font-montserrat text-center text-gray-700 mb-12">Próximas Conferencias y Talleres</h2>
                    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl border overflow-hidden grid md:grid-cols-2 items-center">
                        <div className="p-8 flex flex-col justify-center">
                            <span className="bg-cyan-100 text-cyan-700 font-semibold px-4 py-2 rounded-full self-start">Próximamente</span>
                            <h3 className="text-2xl font-bold font-montserrat text-gray-800 mt-4">Lo Que <strong>Realmente nos Preocupa</strong> en la Menopausia</h3>
                            <p className="mt-2 text-gray-600">Un <strong>testimonio honesto</strong> sobre lo que miles de mujeres compartimos en silencio. Descubre que no estás sola en esta etapa.</p>
                            <a href="#" className="mt-6 inline-block bg-cyan-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-cyan-700 transition-colors self-start shadow-md transform hover:-translate-y-0.5">
                                Más Información
                            </a>
                        </div>
                         <div className="bg-gray-50 h-full flex items-center justify-center">
                            <img src="https://images.squidge.org/images/2025/11/02/Mila-Ciudad-12-1.png" alt="Conferencia sobre menopausia" className="w-auto h-auto max-h-[450px] max-w-full"/>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                <section className="mt-24 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold font-montserrat text-center text-gray-700 mb-8">Envíame tu Consulta</h2>
                    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-2xl border">
                        {/* Tabs */}
                        <div className="flex flex-col sm:flex-row border-b border-gray-200 mb-8">
                            <button 
                                onClick={() => setActiveTab('consulta')}
                                className={`flex-1 py-3 px-4 font-semibold text-center transition-colors duration-300 ${activeTab === 'consulta' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <i className="fas fa-comment-dots mr-2"></i> Consultas sobre Mi Método
                            </button>
                            <button
                                onClick={() => setActiveTab('colaboracion')}
                                className={`flex-1 py-3 px-4 font-semibold text-center transition-colors duration-300 ${activeTab === 'colaboracion' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <i className="fas fa-handshake mr-2"></i> Colaboraciones y Prensa
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div>
                            {activeTab === 'consulta' && (
                                <div className="text-center animate-fade-in p-6 bg-cyan-50/50 rounded-lg border border-cyan-100">
                                    <h3 className="text-2xl font-bold font-montserrat text-cyan-700">La mejor forma de ayudarte es <strong>hablando</strong></h3>
                                    <p className="mt-4 text-gray-600 max-w-lg mx-auto">Para consultas sobre mi método y cómo puedo acompañarte de forma personalizada, la <strong>Sesión de Claridad Gratuita</strong> es nuestro mejor punto de partida. Es una conversación sin compromiso donde podré entender tus necesidades y explicarte todo en detalle.</p>
                                    <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1xusc8tIardp1BNw4BXAY6IuRIxpqy-d8N5C1El2Hfo_30ls6gLiTrmGImyoHyy1xamV3wfzU3" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block bg-cyan-600 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-700 transition-colors shadow-lg transform hover:-translate-y-0.5">
                                        Agendar mi Sesión Gratuita
                                    </a>
                                </div>
                            )}

                            {activeTab === 'colaboracion' && (
                                <form action="https://formspree.io/f/example" method="POST" className="space-y-6 animate-fade-in">
                                    <p className="text-center text-gray-600 mb-6">Para propuestas de conferencias, entrevistas, colaboraciones o prensa, por favor, utiliza este formulario.</p>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Nombre Completo</label>
                                            <input type="text" name="name" id="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-cyan-500 focus:border-cyan-500"/>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
                                            <input type="email" name="email" id="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-cyan-500 focus:border-cyan-500"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-1">Empresa / Medio de Comunicación</label>
                                        <input type="text" name="organization" id="organization" className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-cyan-500 focus:border-cyan-500"/>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">Mensaje</label>
                                        <textarea name="message" id="message" rows={4} required placeholder="Describe brevemente tu propuesta..." className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-cyan-500 focus:border-cyan-500"></textarea>
                                    </div>
                                    <div>
                                        <button type="submit" className="w-full bg-cyan-600 text-white font-bold py-3 px-6 rounded-md hover:bg-cyan-700 transition-colors shadow-md">Enviar Propuesta</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};



// --- LegalPages ---
interface LegalPagesProps extends PageProps {
    page: 'aviso-legal' | 'privacidad' | 'cookies';
}
export const LegalPages: React.FC<LegalPagesProps> = ({ page, navigate }) => {
    const legalContent = {
        'aviso-legal': {
            title: 'Aviso Legal',
            content: `
                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">1. Datos del Titular</h2>
                <p><strong>Titular:</strong> Mila Ciudad<br>
                <strong>Domicilio:</strong> Talavera de la Reina, Toledo, España<br>
                <strong>Correo electrónico:</strong> admin@climaterio360.com<br>
                <strong>Sitio web:</strong> https://milaciudad.com</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">2. Objeto</h2>
                <p>El presente Aviso Legal regula el acceso y uso del sitio web milaciudad.com, cuyo objetivo es ofrecer <strong>información sobre los servicios de coaching y bienestar</strong> de Mila Ciudad, así como contenido divulgativo y educativo a través de su blog profesional especializado en menopausia, salud femenina y transformación personal.</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">3. Propiedad Intelectual e Industrial</h2>
                <p>Todos los contenidos de este sitio web, incluyendo textos, imágenes, diseños, logotipos, gráficos y cualquier otro elemento susceptible de protección, son <strong>propiedad intelectual de Mila Ciudad</strong> o de terceros que han autorizado expresamente su uso. Queda completamente prohibida su reproducción, distribución, comunicación pública o modificación sin autorización expresa por escrito.</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">4. Condiciones de Uso</h2>
                <p>El usuario se compromete a realizar un <strong>uso responsable y conforme a la ley</strong> de los contenidos y servicios ofrecidos en milaciudad.com, actuando de buena fe y respetando el orden público. No está permitido el uso del sitio web para fines ilícitos, fraudulentos o que puedan perjudicar derechos o intereses de Mila Ciudad, sus usuarias o terceros.</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">5. Exclusión de Responsabilidad (Descargo de Responsabilidad)</h2>
                <p><strong>Carácter informativo del contenido:</strong><br>El contenido de este sitio web, especialmente el blog, guías, artículos y recursos educativos, tiene un <strong>carácter meramente informativo y divulgativo.</strong> En ningún caso sustituye el consejo, diagnóstico, evaluación o tratamiento de un profesional de la salud cualificado (médico, ginecólogo, endocrinólogo o profesional sanitario colegiado).</p>
                <p class="mt-4"><strong>Limitación de responsabilidad:</strong><br>Mila Ciudad <strong>no se responsabiliza de las decisiones,</strong> acciones u omisiones tomadas por los usuarios a partir de la información contenida en el sitio web, ni de los posibles daños, perjuicios o consecuencias adversas derivadas de actuaciones basadas únicamente en dicha información.</p>
                <p class="mt-4"><strong>Recomendación médica:</strong><br>Antes de iniciar cualquier cambio en tu dieta, rutina de ejercicio, suplementación o estilo de vida, <strong>consulta siempre con tu médico</strong> o profesional de la salud de referencia. Los servicios de coaching ofrecidos por Mila Ciudad complementan, pero <strong>nunca reemplazan,</strong> la atención médica profesional.</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">6. Legislación Aplicable y Jurisdicción</h2>
                <p>Este Aviso Legal se rige por la <strong>normativa española,</strong> en particular por la Ley de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE) y la Ley Orgánica de Protección de Datos (LOPDGDD).</p>
                <p class="mt-4">Para cualquier controversia, reclamación o litigio que pudiera derivarse del acceso, uso o interpretación del sitio web milaciudad.com, las partes se someten expresamente a la jurisdicción competente de los <strong>Juzgados y Tribunales de Talavera de la Reina (Toledo),</strong> con renuncia expresa a cualquier otro fuero que pudiera corresponderles.</p>

                <h3 class="text-xl font-bold font-montserrat mt-6 mb-3">Contacto</h3>
                <p>Para cualquier cuestión relativa a este Aviso Legal o a milaciudad.com:</p>
                <p>📧 Email: admin@climaterio360.com<br>
                🌐 Web: https://milaciudad.com</p>
            `
        },
        'privacidad': {
            title: 'Política de Privacidad',
            content: `
                <p class="mb-4"><strong>Última actualización:</strong> Noviembre 2025</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">1. ¿Quién es el responsable del tratamiento de tus datos?</h2>
                <p><strong>Responsable:</strong> Mila Ciudad<br>
                <strong>Domicilio:</strong> Talavera de la Reina, Toledo, España<br>
                <strong>Correo electrónico:</strong> admin@climaterio360.com<br>
                <strong>Sitio web:</strong> https://milaciudad.com</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">2. ¿Con qué finalidad tratamos tus datos personales?</h2>
                <p>Tratamos los datos que nos facilitas con las siguientes finalidades:</p>
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li>Gestionar las <strong>consultas, solicitudes y consultas</strong> recibidas a través de los formularios de contacto y formularios de pre-sesión.</li>
                    <li>Procesar las <strong>reservas de sesiones</strong> de coaching y la información de evaluación inicial para personalizar tu experiencia.</li>
                    <li>Enviar nuestra <strong>newsletter, publicaciones, promociones</strong> de servicios y recursos exclusivos a los suscriptores que hayan otorgado su consentimiento.</li>
                    <li>Garantizar el correcto <strong>funcionamiento y seguridad</strong> de nuestro sitio web.</li>
                    <li>Cumplir con <strong>obligaciones legales</strong> derivadas de la relación comercial y fiscal.</li>
                    <li><strong>Mejorar nuestros servicios</strong> y experiencia del usuario a través de análisis y estadísticas anónimas.</li>
                </ul>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">3. ¿Cuál es la base legal para el tratamiento de tus datos?</h2>
                <p>La base legal para el tratamiento de tus datos personales es:</p>
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li><strong>Consentimiento expreso:</strong> Otorgado voluntariamente al marcar la casilla de aceptación y enviar cualquier formulario en milaciudad.com.</li>
                    <li><strong>Ejecución de un contrato:</strong> Cuando reservas una sesión de coaching o te inscribes en un programa, es necesario tratar tus datos para prestar el servicio.</li>
                    <li><strong>Obligación legal:</strong> Para cumplir con obligaciones tributarias, contables o legales aplicables en España.</li>
                    <li><strong>Interés legítimo:</strong> Para mejorar nuestros servicios y prevenir fraude, siempre respetando tus derechos.</li>
                </ul>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">4. ¿A qué destinatarios se comunicarán tus datos?</h2>
                <p>Tus datos personales <strong>no se cederán a terceros sin tu consentimiento,</strong> salvo en los siguientes casos:</p>
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li><strong>Obligación legal:</strong> Cuando sea requerido by autoridades judiciales, fiscales o administrativas.</li>
                    <li><strong>Proveedores de servicios (encargados de tratamiento):</strong>
                        <ul class="list-disc list-inside ml-4 space-y-1 mt-1">
                            <li>Plataforma de email marketing para envío de newsletter</li>
                            <li>Servicio de hosting del sitio web</li>
                            <li>Herramientas de calendario y reservas online</li>
                            <li>Plataformas de pago (Bizum, Stripe, PayPal)</li>
                            <li>Google Forms para encuestas y formularios</li>
                            <li>Google Sheets para análisis de datos</li>
                        </ul>
                    </li>
                </ul>
                <p class="mt-2">Todos estos proveedores tienen suscritos contratos de confidencialidad y tratamiento de datos conforme al RGPD.</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">5. ¿Cuáles son tus derechos cuando nos facilitas tus datos?</h2>
                <p>Conforme a la normativa de protección de datos (RGPD y LOPDGDD), tienes derecho a:</p>
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li><strong>Derecho de acceso:</strong> Obtener confirmación y acceso a tus datos personales.</li>
                    <li><strong>Derecho de rectificación:</strong> Corregir datos inexactos o incompletos.</li>
                    <li><strong>Derecho de supresión ("derecho al olvido"):</strong> Solicitar la eliminación de tus datos.</li>
                    <li><strong>Derecho a la limitación del tratamiento:</strong> Limitar cómo utilizamos tus datos.</li>
                    <li><strong>Derecho a la portabilidad:</strong> Recibir tus datos en formato estructurado.</li>
                    <li><strong>Derecho de oposición:</strong> Oponerte a determinados tratamientos de datos.</li>
                    <li><strong>Derecho a retirar el consentimiento:</strong> En cualquier momento, sin afectar tratamientos previos.</li>
                </ul>
                <p class="mt-2">Para ejercer cualquiera de estos derechos, envía una solicitud firmada a <strong>admin@climaterio360.com</strong> con copia de tu documento de identidad.</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">6. ¿Por cuánto tiempo conservaremos tus datos?</h2>
                <p>El período de conservación de tus datos depende de la finalidad del tratamiento:</p>
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li><strong>Consultas y contacto:</strong> Se conservarán durante 2 años desde la última comunicación, salvo obligación legal superior.</li>
                    <li><strong>Clientes de servicios de coaching:</strong> Se conservarán durante toda la duración de la relación contractual y 6 años posteriores para obligaciones fiscales.</li>
                    <li><strong>Newsletter y suscriptores:</strong> Se conservarán mientras mantengas tu suscripción activa. Al solicitar la baja, se eliminarán en un plazo máximo de 30 días.</li>
                    <li><strong>Datos de encuestas y evaluaciones:</strong> Se conservarán durante 3 años para mejora de servicios, salvo que solicites su eliminación.</li>
                    <li><strong>Obligaciones legales:</strong> Se conservarán el tiempo que marca la ley (habitualmente 6 años para obligaciones fiscales en España).</li>
                </ul>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">7. Seguridad de tus datos</h2>
                <p>Implementamos <strong>medidas técnicas y organizativas apropiadas</strong> para proteger la seguridad, confidencialidad e integridad de tus datos:</p>
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li>Acceso restringido a personal autorizado únicamente.</li>
                    <li>Encriptación de conexiones (SSL/HTTPS).</li>
                    <li>Protección de contraseñas y credenciales.</li>
                    <li>Copias de seguridad regulares.</li>
                    <li>Políticas de control de acceso y autenticación.</li>
                </ul>
                <p class="mt-2">Sin embargo, ningún sistema es completamente seguro. Te recomendamos usar contraseñas seguras y proteger tu información.</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">8. Cookies y tecnologías similares</h2>
                <p>Nuestro sitio web utiliza cookies y tecnologías similares para:</p>
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li>Mantener sesiones y funcionalidad esencial del sitio.</li>
                    <li>Análisis de uso y mejora de servicios.</li>
                    <li>Publicidad personalizada (con tu consentimiento previo).</li>
                </ul>
                <p class="mt-2">Para más información, consulta nuestra <strong>Política de Cookies.</strong></p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">9. Transferencias internacionales de datos</h2>
                <p>Algunos de nuestros proveedores pueden estar ubicados fuera del Espacio Económico Europeo (EEE). En estos casos, garantizamos que:</p>
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li>Se aplicarán mecanismos de protección adecuados (cláusulas contractuales tipo, decisiones de adecuación de la Comisión Europea).</li>
                    <li>Cumplimos con las exigencias del RGPD en materia de transferencias internacionales.</li>
                </ul>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">10. Cambios en esta Política de Privacidad</h2>
                <p>Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Los cambios materiales serán comunicados a través de nuestro sitio web o por correo electrónico si es necesario.</p>
                <p class="mt-2">La versión más actualizada siempre estará disponible en https://milaciudad.com</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">11. Derechos ante la Autoridad de Control</h2>
                <p>Si consideras que tus derechos de protección de datos no están siendo respetados, tienes derecho a presentar una reclamación ante la <strong>Autoridad de Protección de Datos (AEPD)</strong>:</p>
                <p class="mt-2"><strong>Agencia Española de Protección de Datos (AEPD)</strong><br>
                Calle Jorge Juan, 6<br>
                28001 - Madrid, España<br>
                Teléfono: +34 901 100 099<br>
                Web: https://www.aepd.es</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">12. Contacto y Ejercicio de Derechos</h2>
                <p>Para cualquier cuestión relativa a esta Política de Privacidad, o para ejercer tus derechos de protección de datos:</p>
                <p>📧 Email: admin@climaterio360.com<br>
                🌐 Web: https://milaciudad.com<br>
                📍 Domicilio: Talavera de la Reina, Toledo, España</p>

                <h3 class="text-xl font-bold font-montserrat mt-6 mb-3">Resumen de tus Derechos RGPD</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse mt-2">
                        <thead>
                            <tr>
                                <th class="border p-2"><strong>Derecho</strong></th>
                                <th class="border p-2"><strong>Descripción</strong></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td class="border p-2">Acceso</td><td class="border p-2">Saber qué datos tenemos sobre ti</td></tr>
                            <tr><td class="border p-2">Rectificación</td><td class="border p-2">Corregir datos incorrectos</td></tr>
                            <tr><td class="border p-2">Supresión</td><td class="border p-2">Pedir eliminación de tus datos</td></tr>
                            <tr><td class="border p-2">Limitación</td><td class="border p-2">Limitar cómo usamos tus datos</td></tr>
                            <tr><td class="border p-2">Portabilidad</td><td class="border p-2">Recibir tus datos en formato digital</td></tr>
                            <tr><td class="border p-2">Oposición</td><td class="border p-2">Rechazar ciertos tratamientos</td></tr>
                            <tr><td class="border p-2">Retirada de consentimiento</td><td class="border p-2">Cambiar de opinión en cualquier momento</td></tr>
                        </tbody>
                    </table>
                </div>
                <p class="mt-4">Para ejercer cualquiera de estos derechos, contacta con nosotras enviando un email a <strong>admin@climaterio360.com</strong> con copia de tu documento de identidad.</p>
            `
        },
        'cookies': {
            title: 'Política de Cookies',
            content: `
                <p class="mb-4"><strong>Última actualización:</strong> Noviembre 2025</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">1. ¿Qué son las cookies?</h2>
                <p>Una cookie es un <strong>pequeño fichero de texto</strong> que se almacena en tu navegador cuando visitas una página web. Su utilidad es que la web sea capaz de recordar tu visita cuando vuelvas a navegar por esa página. Las cookies suelen almacenar información de carácter técnico, preferencias personales, personalización de contenidos, estadísticas de uso, etc.</p>
                <p class="mt-2">Las cookies no ejecutan código ni virus y no acceden a otros ficheros de tu dispositivo. Son totalmente inofensivas, aunque es importante que entiendas cómo se usan para poder controlar su uso.</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">2. ¿Qué tipos de cookies utiliza milaciudad.com?</h2>
                <h3 class="text-xl font-bold mt-4 mb-2 font-lora">Cookies Técnicas (Necesarias)</h3>
                <p>Son las más elementales y permiten que la web funcione correctamente. Incluyen:</p>
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li>Mantener sesiones activas</li>
                    <li>Gestionar el carrito de compra (si aplica)</li>
                    <li>Recordar preferencias de accesibilidad</li>
                    <li>Detectar si eres un usuario humano o un robot</li>
                </ul>
                <p class="mt-2"><strong>Consentimiento:</strong> No necesitan consentimiento previo, pero sí información clara.</p>

                <h3 class="text-xl font-bold mt-4 mb-2 font-lora">Cookies de Análisis</h3>
                <p>Recogen información sobre cómo utilizas nuestro sitio web para mejorar la experiencia. Incluyen:</p>
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li>Tipo de navegación que realizas</li>
                    <li>Secciones más visitadas</li>
                    <li>Tiempo de permanencia en la web</li>
                    <li>Dispositivo utilizado</li>
                    <li>Idioma configurado</li>
                </ul>
                <p class="mt-2"><strong>Proveedores:</strong> Google Analytics</p>
                <p class="mt-2"><strong>Consentimiento:</strong> Requieren tu consentimiento expreso.</p>

                <h3 class="text-xl font-bold mt-4 mb-2 font-lora">Cookies de Personalización y Preferencias</h3>
                <p>Recuerdan tus preferencias personales para futuras visitas:</p>
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li>Idioma preferido</li>
                    <li>Tema de color (si es aplicable)</li>
                    <li>Configuraciones de accesibilidad</li>
                </ul>
                <p class="mt-2"><strong>Consentimiento:</strong> Requieren consentimiento expreso.</p>

                <h3 class="text-xl font-bold mt-4 mb-2 font-lora">Cookies de Publicidad (Terceros)</h3>
                <p>Pueden utilizarse para mostrar publicidad personalizada basada en tu comportamiento:</p>
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li>Redes sociais (Facebook Pixel, LinkedIn, etc.)</li>
                    <li>Plataformas de publicidad (Google Ads)</li>
                </ul>
                <p class="mt-2"><strong>Consentimiento:</strong> Requieren tu consentimiento expreso.</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">3. Listado Detallado de Cookies Utilizadas</h2>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse mt-2 text-sm">
                        <thead>
                            <tr>
                                <th class="border p-2"><strong>Nombre</strong></th><th class="border p-2"><strong>Tipo</strong></th><th class="border p-2"><strong>Proveedor</strong></th><th class="border p-2"><strong>Finalidad</strong></th><th class="border p-2"><strong>Duración</strong></th><th class="border p-2"><strong>Consentimiento</strong></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td class="border p-2">cookieConsent</td><td class="border p-2">Técnica/Propia</td><td class="border p-2">Mila Ciudad</td><td class="border p-2">Almacena tu consentimiento de cookies</td><td class="border p-2">1 año</td><td class="border p-2">No requiere</td></tr>
                            <tr><td class="border p-2">_ga</td><td class="border p-2">Análisis</td><td class="border p-2">Google Analytics</td><td class="border p-2">Distinguir usuarios y analizar tráfico</td><td class="border p-2">2 años</td><td class="border p-2">Sí, requiere</td></tr>
                            <tr><td class="border p-2">_gid</td><td class="border p-2">Análisis</td><td class="border p-2">Google Analytics</td><td class="border p-2">Identificar sesiones de usuario</td><td class="border p-2">24 horas</td><td class="border p-2">Sí, requiere</td></tr>
                            <tr><td class="border p-2">_gat</td><td class="border p-2">Análisis</td><td class="border p-2">Google Analytics</td><td class="border p-2">Regular tasa de peticiones</td><td class="border p-2">1 minuto</td><td class="border p-2">Sí, requiere</td></tr>
                            <tr><td class="border p-2">NID</td><td class="border p-2">Análisis</td><td class="border p-2">Google</td><td class="border p-2">Publicidad personalizada y análisis</td><td class="border p-2">6 meses</td><td class="border p-2">Sí, requiere</td></tr>
                            <tr><td class="border p-2">IDE</td><td class="border p-2">Análisis</td><td class="border p-2">Google DoubleClick</td><td class="border p-2">Publicidad y seguimiento</td><td class="border p-2">2 años</td><td class="border p-2">Sí, requiere</td></tr>
                            <tr><td class="border p-2">ANID</td><td class="border p-2">Análisis</td><td class="border p-2">Google</td><td class="border p-2">Publicidad y seguimiento</td><td class="border p-2">2 años</td><td class="border p-2">Sí, requiere</td></tr>
                            <tr><td class="border p-2">__Host-gs_scs</td><td class="border p-2">Técnica</td><td class="border p-2">Google</td><td class="border p-2">Gestión de sesiones seguras</td><td class="border p-2">Sesión</td><td class="border p-2">No requiere</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">4. Cómo Gestionar tus Preferencias de Cookies</h2>
                <h3 class="text-xl font-bold mt-4 mb-2 font-lora">En milaciudad.com</h3>
                <p>Al acceder a nuestro sitio web, verás un <strong>banner de cookies</strong> en la parte inferior. Desde allí puedes:</p>
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li><strong>Aceptar</strong> todas las cookies (excepto cookies estrictamente necesarias)</li>
                    <li><strong>Rechazar</strong> cookies no esenciales</li>
                    <li><strong>Configurar</strong> preferencias personalizadas (opción granular para cada tipo)</li>
                    <li>Acceder a esta política de cookies</li>
                </ul>
                <p class="mt-2"><strong>Nota importante:</strong> Si rechazas las cookies de análisis, no podremos mejorar nuestra web basándonos en tu comportamiento, pero la web seguirá funcionando correctamente.</p>

                <h3 class="text-xl font-bold mt-4 mb-2 font-lora">En tu Navegador</h3>
                <p>En cualquier momento puedes <strong>desactivar o eliminar cookies</strong> desde la configuración de tu navegador:</p>
                <p class="mt-2"><strong>Google Chrome:</strong> Abre Chrome, ve a "Configuración" &rarr; "Privacidad y seguridad" &rarr; "Cookies y otros datos de sitios".</p>
                <p class="mt-2"><strong>Mozilla Firefox:</strong> Abre Firefox, ve a "Configuración" &rarr; "Privacidad y seguridad" y busca la sección "Cookies y datos de sitios web".</p>
                <p class="mt-2"><strong>Safari:</strong> Abre Safari, ve a "Safari" &rarr; "Preferencias" &rarr; "Privacidad".</p>
                <p class="mt-2"><strong>Microsoft Edge:</strong> Abre Edge, ve a "Configuración" &rarr; "Privacidad, búsqueda y servicios".</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">5. Consentimiento de Cookies</h2>
                <p>Conforme a la regulación española (LSSI-CE) y europea (ePrivacy Directive y RGPD):</p>
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li><strong>Cookies necesarias:</strong> Se instalan automáticamente sin consentimiento previo.</li>
                    <li><strong>Cookies no necesarias:</strong> Requieren tu consentimiento previo y explícito.</li>
                    <li><strong>Botón "Rechazar":</strong> Visible y con la misma prominencia que el botón "Aceptar".</li>
                    <li><strong>Opción granular:</strong> Puedes aceptar/rechazar por tipo de cookie.</li>
                </ul>
                <p class="mt-2">Al hacer clic en "Aceptar", autorizas el uso de cookies conforme a esta política. Puedes cambiar tus preferencias en cualquier momento.</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">6. Cookies de Terceiros</h2>
                <p>Utilizamos servicios de terceros que pueden instalar sus propias cookies:</p>
                <p class="mt-2"><strong>Google Analytics:</strong> Usado para análisis de tráfico. Política de privacidad: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-cyan-600 underline">https://policies.google.com/privacy</a>.</p>
                <p class="mt-2"><strong>Plataformas de Pago (Stripe, Bizum, PayPal):</strong> Para procesar pagos de forma segura. Consulta las políticas de cada plataforma.</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">7. Seguridad y Protección de Datos</h2>
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li>No compartimos datos recopilados por cookies con terceros sin tu consentimiento.</li>
                    <li>Las cookies se transmiten siempre de forma cifrada (HTTPS).</li>
                    <li>No almacenamos información sensible (contraseñas, números de tarjeta) en cookies.</li>
                    <li>Tus datos están sujetos a nuestra <strong>Política de Privacidad.</strong></li>
                </ul>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">8. Cambios en esta Política de Cookies</h2>
                <p>Nos reservamos el derecho de actualizar esta Política de Cookies en cualquier momento. Si realizamos cambios materiales, te lo comunicaremos a través de nuestro sitio web o por correo electrónico.</p>
                <p class="mt-2">La última versión de esta política siempre estará disponible en: https://milaciudad.com</p>

                <h2 class="text-2xl font-bold font-montserrat mt-6 mb-3">9. Contacto</h2>
                <p>Si tienes dudas sobre nuestra Política de Cookies o quieres reportar un problema:</p>
                <p>📧 Email: admin@climaterio360.com<br>
                🌐 Web: https://milaciudad.com<br>
                📍 Domicilio: Talavera de la Reina, Toledo, España</p>

                <h3 class="text-xl font-bold font-montserrat mt-6 mb-3">Tabla Resumen de Acciones Recomendadas</h3>
                 <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse mt-2 text-sm">
                        <thead>
                            <tr>
                                <th class="border p-2"><strong>Acción</strong></th>
                                <th class="border p-2"><strong>Pasos</strong></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td class="border p-2">Ver todas las cookies</td><td class="border p-2">Abre DevTools (F12) &rarr; Aplicación &rarr; Cookies</td></tr>
                            <tr><td class="border p-2">Borrar cookies</td><td class="border p-2">Configuración del navegador &rarr; Privacidad &rarr; Borrar datos de navegación</td></tr>
                            <tr><td class="border p-2">Desactivar cookies</td><td class="border p-2">Configuración del navegador &rarr; Privacidad &rarr; Ajusta permisos</td></tr>
                            <tr><td class="border p-2">Cambiar preferencias en milaciudad.com</td><td class="border p-2">Haz clic en "Configurar" en el banner de cookies.</td></tr>
                            <tr><td class="border p-2">Reportar problema</td><td class="border p-2">Envía email a admin@climaterio360.com</td></tr>
                        </tbody>
                    </table>
                </div>
            `
        }
    };

    const { title, content } = legalContent[page];

    useSEOMetadata(
        `${title} | Mila Ciudad`,
        `Consulta la página de ${title} de Mila Ciudad para obtener información detallada sobre los términos y condiciones de uso del sitio web.`
    );

    return (
        <div className="animate-fade-in py-16 md:py-24 bg-gray-50/50">
            <div className="container mx-auto px-6 max-w-3xl bg-white p-8 md:p-12 rounded-lg shadow-lg border">
                <h1 className="text-4xl font-bold font-montserrat text-gray-700 mb-8">{title}</h1>
                <div className="prose lg:prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />
                 <button onClick={() => navigate({ page: 'home' })} className="mt-12 text-cyan-600 font-semibold hover:underline">
                    &larr; Volver a la página de inicio
                </button>
            </div>
        </div>
    );
};