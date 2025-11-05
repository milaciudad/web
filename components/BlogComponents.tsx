import React, { useState, useEffect } from 'react';
import { getBlogPosts } from '../services/cms';
import type { BlogPost, NavigationTarget, Page } from '../types';
import { LeadMagnetBanner, useSEOMetadata } from './UIComponents';

const BlogPostCard: React.FC<{ post: BlogPost; navigate: (target: NavigationTarget) => void; className?: string; isPopular?: boolean; originPage?: Page; }> = ({ post, navigate, className = '', isPopular = false, originPage }) => (
    <div 
        onClick={() => navigate({ page: 'blog', postSlug: post.slug, originPage: originPage || 'blog' })}
        className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 ${className} flex flex-col cursor-pointer group h-full`}
    >
        <div className="relative w-full h-48 overflow-hidden">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            {isPopular && (
                <div className="absolute top-2 right-2 bg-cyan-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow z-10">
                    MÁS LEÍDO
                </div>
            )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold font-montserrat text-gray-700 mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-4 text-justify">{post.excerpt}</p>
            <span className="font-semibold text-cyan-600 hover:text-cyan-800 transition-colors self-start mt-auto">
                Leer más &rarr;
            </span>
        </div>
    </div>
);

const SocialShareButtons: React.FC<{ post: BlogPost }> = ({ post }) => {
    const [pageUrl, setPageUrl] = useState('');
    const [copySuccess, setCopySuccess] = useState('');

    useEffect(() => {
        setPageUrl(window.location.href);
    }, []);

    if (!pageUrl) return null;

    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(post.title);
    const encodedExcerpt = encodeURIComponent(post.excerpt);

    const shareLinks = [
        { name: 'WhatsApp', icon: 'fab fa-whatsapp', url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`, color: 'bg-green-500 hover:bg-green-600' },
        { name: 'Facebook', icon: 'fab fa-facebook-f', url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, color: 'bg-blue-600 hover:bg-blue-700' },
        { name: 'Twitter', icon: 'fab fa-twitter', url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, color: 'bg-sky-500 hover:bg-sky-600' },
        { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedExcerpt}`, color: 'bg-blue-700 hover:bg-blue-800' },
        { name: 'Email', icon: 'fas fa-envelope', url: `mailto:?subject=${encodedTitle}&body=He encontrado este artículo y creo que podría interesarte:%0A%0A${encodedUrl}`, color: 'bg-gray-500 hover:bg-gray-600' },
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(pageUrl).then(() => {
            setCopySuccess('¡Copiado!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Error');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    return (
        <div className="my-12 py-8 border-t border-b border-gray-200">
            <h3 className="text-xl font-bold font-montserrat text-center text-gray-700 mb-6">¿Te ha gustado? <strong>¡Compártelo!</strong></h3>
            <div className="flex flex-wrap justify-center items-center gap-3">
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
                    className="bg-gray-200 text-gray-700 h-12 px-4 rounded-full flex items-center gap-2 font-semibold hover:bg-gray-300 transition-colors"
                >
                    <i className="fas fa-link"></i>
                    <span>{copySuccess || 'Copiar enlace'}</span>
                </button>
            </div>
        </div>
    );
};


const ContextualCtaBox: React.FC<{ post: BlogPost; }> = ({ post }) => {
    const getContextualCta = (tags: string[]) => {
        const ctaMap = [
            {
                tags: ['Sueño', 'Insomnio'],
                title: '¿Noches en Vela?',
                text: 'El insomnio no es una sentencia. Hablemos de una <strong>estrategia personalizada</strong> para que recuperes tu descanso en una <strong>Sesión de Claridad Gratuita.</strong>',
                icon: 'fa-moon'
            },
            {
                tags: ['Nutrición', 'Metabolismo', 'Peso', 'Resistencia a la Insulina'],
                title: '¿Tu Metabolismo ha Cambiado?',
                text: 'Podemos trazar un <strong>plan de nutrición adaptado a ti</strong> para que te sientas con más energía y vitalidad. Agenda tu Sesión de Claridad y empecemos a trabajar juntas.',
                icon: 'fa-apple-whole'
            },
            {
                tags: ['Miedo', 'Autoestima', 'Bienestar Emocional', 'Crecimiento Personal'],
                title: '¿Sientes que el Miedo te Frena?',
                text: 'La menopausia es también una revolución emocional. Juntas podemos encontrar las herramientas para que navegues esta etapa con <strong>más calma y confianza.</strong> Hablemos en una Sesión de Claridad.',
                icon: 'fa-heart-pulse'
            },
            {
                tags: ['Menopausia', 'Salud Hormonal', 'Perimenopausia', 'Síntomas'],
                title: '¿Te Sientes Perdida en esta Etapa?',
                text: '<strong>No tienes que pasar por esto sola.</strong> Te ofrezco un espacio seguro para entender tus síntomas y crear un plan de acción. Agenda tu <strong>Sesión de Claridad Gratuita.</strong>',
                icon: 'fa-spa'
            }
        ];

        for (const cta of ctaMap) {
            if (tags.some(tag => cta.tags.includes(tag))) {
                return cta;
            }
        }

        return {
            title: '¿Lista para dar el Siguiente Paso?',
            text: 'Si te sientes identificada y quieres un <strong>acompañamiento personalizado</strong> para navegar esta etapa, estoy aquí para ayudarte. Agenda una <strong>Sesión de Claridad Gratuita</strong> y hablemos.',
            icon: 'fa-rocket'
        };
    };

    const cta = getContextualCta(post.tags);

    return (
        <div className="mt-16 bg-cyan-700 text-white rounded-xl shadow-2xl p-8 md:p-12 text-center">
            <i className={`fas ${cta.icon} text-5xl text-cyan-200 mb-6`}></i>
            <h2 className="text-3xl font-bold font-montserrat">{cta.title}</h2>
            <p className="mt-4 text-lg text-cyan-100 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: cta.text }}></p>
            <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1xusc8tIardp1BNw4BXAY6IuRIxpqy-d8N5C1El2Hfo_30ls6gLiTrmGImyoHyy1xamV3wfzU3" target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-white text-cyan-700 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg text-lg transform hover:-translate-y-1">
                Agendar Sesión de Claridad
            </a>
        </div>
    );
};

const AuthorBioSection: React.FC<{ post: BlogPost; navigate: (target: NavigationTarget) => void; }> = ({ post, navigate }) => (
    <div className="my-16 md:my-24 py-12 text-center border-t border-b border-gray-200">
        <img src={post.authorImage} alt={post.author} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
        <p className="text-sm font-semibold tracking-wider text-gray-500">AUTORA</p>
        <h3 className="text-2xl font-bold font-montserrat text-gray-800">{post.author}</h3>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Enfermera, autora y coach especialista en menopausia. Mi misión es darte las herramientas para que vivas esta etapa con plenitud, fortaleza y autenticidad. <strong>No te doblegues.</strong>
        </p>
        <button onClick={() => navigate({ page: 'servicios' })} className="mt-6 bg-cyan-600 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-700 transition-colors shadow-lg transform hover:-translate-y-0.5">
            Descubre cómo puedo acompañarte
        </button>
    </div>
);


const RelatedPostsSection: React.FC<{ allPosts: BlogPost[]; currentPost: BlogPost; navigate: (target: NavigationTarget) => void; originPage?: Page; }> = ({ allPosts, currentPost, navigate, originPage }) => {
    const relatedPosts = allPosts.filter(
        p => p.slug !== currentPost.slug && p.tags.some(tag => currentPost.tags.includes(tag))
    ).slice(0, 3);

    if (relatedPosts.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 md:mt-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-montserrat text-gray-700">Artículos Relacionados</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map(post => (
                    <BlogPostCard key={post.slug} post={post} navigate={navigate} originPage={originPage} />
                ))}
            </div>
        </section>
    );
};


const BlogPostDetail: React.FC<{ post: BlogPost; allPosts: BlogPost[]; navigate: (target: NavigationTarget) => void; originPage?: Page; }> = ({ post, allPosts, navigate, originPage }) => {
    useSEOMetadata(
        `${post.title} | Blog Mila Ciudad`,
        post.excerpt
    );
    
    const backTargetPage = originPage || 'blog';
    const backButtonTextMap: { [key in Page]?: string } = {
        menopausia: 'Volver al Centro de Recursos',
        home: 'Volver a Inicio',
        blog: 'Volver al Blog',
    };
    const backButtonText = backButtonTextMap[backTargetPage] || 'Volver al Blog';

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="max-w-6xl mx-auto">
                <button onClick={() => navigate({ page: backTargetPage })} className="mb-8 text-cyan-600 font-semibold hover:underline">
                    &larr; {backButtonText}
                </button>
                
                <div className="max-w-4xl mx-auto">
                    <main>
                        <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-700 mb-4">{post.title}</h1>
                        <div className="flex items-center text-gray-500 mb-6">
                            <span>Por <strong>{post.author}</strong></span>
                        </div>
                        
                        <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[500px] object-contain rounded-lg my-8" />
                        
                        <div className="prose prose-lg lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
                        
                        <SocialShareButtons post={post} />

                        <ContextualCtaBox post={post} />
                    </main>
                </div>
                
                <AuthorBioSection post={post} navigate={navigate} />
                
                <RelatedPostsSection allPosts={allPosts} currentPost={post} navigate={navigate} originPage={originPage} />
            </div>
        </div>
    );
};

const FeaturedPostsCarousel: React.FC<{ posts: BlogPost[]; navigate: (target: NavigationTarget) => void; originPage: Page; }> = ({ posts, navigate, originPage }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % posts.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, [posts.length]);

    const goToPrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex(prevIndex => (prevIndex - 1 + posts.length) % posts.length);
    };

    const goToNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex(prevIndex => (prevIndex + 1) % posts.length);
    };
    
    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    if (!posts || posts.length === 0) {
        return null;
    }
    
    const currentPost = posts[currentIndex];

    return (
        <div className="relative rounded-xl overflow-hidden shadow-2xl mb-16 md:mb-24 h-[500px] w-full group">
            {/* Slides */}
            {posts.map((post, index) => (
                <div
                    key={post.slug}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out cursor-pointer ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => navigate({ page: 'blog', postSlug: post.slug, originPage })}
                >
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                </div>
            ))}

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white w-full cursor-pointer" onClick={() => navigate({ page: 'blog', postSlug: currentPost.slug, originPage })}>
                <span className="text-sm font-bold uppercase tracking-widest bg-cyan-600 px-3 py-1 rounded">Lecturas Destacadas</span>
                <h2 className="text-3xl md:text-5xl font-bold font-montserrat mt-4 leading-tight max-w-3xl">{currentPost.title}</h2>
                <p className="mt-2 text-lg text-gray-200 max-w-2xl hidden md:block text-justify">{currentPost.excerpt}</p>
                <div className="mt-6 font-semibold text-white border-b-2 border-cyan-400 pb-1 inline-block hover:text-cyan-300 hover:border-cyan-200 transition-colors">
                    Leer más &rarr;
                </div>
            </div>
            
            {/* Navigation Arrows */}
            <button onClick={goToPrevious} className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors z-10 opacity-0 group-hover:opacity-100" aria-label="Anterior">
                <i className="fas fa-chevron-left"></i>
            </button>
            <button onClick={goToNext} className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors z-10 opacity-0 group-hover:opacity-100" aria-label="Siguiente">
                <i className="fas fa-chevron-right"></i>
            </button>
            
            {/* Indicator Dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {posts.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white'}`}
                        aria-label={`Ir a la diapositiva ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

const BlogListPage: React.FC<{ posts: BlogPost[]; navigate: (target: NavigationTarget) => void; }> = ({ posts, navigate }) => {
    useSEOMetadata(
        'Blog de Salud Activa y Menopausia | Mila Ciudad',
        'Un espacio con conocimientos, reflexiones y herramientas para vivir la menopausia con plenitud, fortaleza y autenticidad.'
    );

    const [selectedCategory, setSelectedCategory] = useState<string>('Ver Todas');
    const categories = [
        { name: 'Menopausia y Salud Hormonal', tags: ['Menopausia', 'Salud Hormonal', 'Perimenopausia', 'Síntomas', 'Salud Femenina', 'Maternidad', 'Adolescencia', 'Familia'] },
        { name: 'Nutrición y Estilo de Vida', tags: ['Nutrición', 'Metabolismo', 'Peso', 'Ejercicio', 'Fuerza', 'Salud Ósea', 'Estilo de Vida', 'Resistencia a la Insulina'] },
        { name: 'Bienestar Emocional', tags: ['Bienestar Emocional', 'Miedo', 'Autoestima', 'Crecimiento Personal', 'Filosofía', 'Comunicación'] },
        { name: 'Salud Natural y Descanso', tags: ['Infusiones', 'Remedios Naturales', 'Bienestar', 'Salud Natural', 'Sueño', 'Insomnio'] }
    ];

    const featuredPosts = posts.filter(p => p.isFeatured);
    const popularPostSlugs = new Set([...posts].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)).slice(0, 3).map(p => p.slug));

    const filteredPosts = selectedCategory === 'Ver Todas'
        ? posts
        : posts.filter(post => {
            const category = categories.find(c => c.name === selectedCategory);
            if (!category) return false;
            return post.tags.some(tag => category.tags.includes(tag));
        });

    return (
        <section className="bg-gray-50/50">
            <div className="container mx-auto px-6 pt-16 md:pt-24 pb-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-cyan-600">Bienvenida a tu Blog DE <strong>SALUD ACTIVA EN MENOPAUSIA</strong></h1>
                    <p className="mt-4 text-lg text-gray-600">Un espacio para compartir conocimientos, reflexiones y herramientas para vivir la menopausia con plenitud.</p>
                </div>

                {featuredPosts.length > 0 && <FeaturedPostsCarousel posts={featuredPosts} navigate={navigate} originPage="blog" />}

                <div className="my-16 md:my-24">
                    <h2 className="text-3xl font-bold font-montserrat text-center text-gray-700 mb-8">Explora por <strong>Colecciones</strong></h2>
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                        <button
                            onClick={() => setSelectedCategory('Ver Todas')}
                            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${selectedCategory === 'Ver Todas' ? 'bg-cyan-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-cyan-100 shadow'}`}
                        >
                            Ver Todas
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.name}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`px-5 py-2 rounded-full font-semibold text-sm text-left transition-all duration-300 ${selectedCategory === cat.name ? 'bg-cyan-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-cyan-100 shadow'}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-montserrat text-gray-700">{selectedCategory === 'Ver Todas' ? 'Inspírate' : `Colección: ${selectedCategory}`}</h2>
                </div>


                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
                            <div key={post.slug} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                                <BlogPostCard post={post} navigate={navigate} isPopular={popularPostSlugs.has(post.slug)} originPage="blog" />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-16 animate-fade-in">
                            <i className="fas fa-folder-open text-4xl mb-4 text-gray-400"></i>
                            <h3 className="text-xl font-semibold">No hay artículos en esta colección.</h3>
                            <p className="mt-2">Prueba a seleccionar otra colección o "Ver Todas".</p>
                        </div>
                    )}
                </div>

                <div className="my-16 md:my-24">
                    <h2 className="text-3xl font-bold font-montserrat text-center text-gray-700 mb-12">Tus <strong>Herramientas Esenciales</strong></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div 
                            onClick={() => navigate({ page: 'menopausia' })} 
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col cursor-pointer h-full"
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
                            onClick={() => navigate({ page: 'diagnostico' })} 
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col cursor-pointer h-full"
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
                            formId="dietas-ideales-blog-compact"
                            redirectUrl="https://dietas.milaciudad.com/"
                            formspreeEndpoint="https://formspree.io/f/mzzkjklk"
                            layout="vertical"
                        />
                        <LeadMagnetBanner
                            title="Guía de <strong>salud activa</strong> gratuita"
                            description="Aprende cómo cuidar tu salud, reconocer los síntomas y prevenir enfermedades como la <strong>diabetes, la hipertensión arterial, la hipercolesterolemia y la arteriosclerosis.</strong>"
                            imageUrl="https://images.squidge.org/images/2025/10/31/Gemini_Generated_Image_81lp3y81lp3y81lp-processedlightpdf.com.md.webp"
                            formId="guia-salud-activa-blog-compact"
                            redirectUrl="https://saludactiva.milaciudad.com/"
                            formspreeEndpoint="https://formspree.io/f/meoprpbv"
                            layout="vertical"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export const BlogPageWrapper: React.FC<{ navigate: (target: NavigationTarget) => void; postSlug?: string; originPage?: Page; }> = ({ navigate, postSlug, originPage }) => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await getBlogPosts();
                setPosts(fetchedPosts);
            } catch (err) {
                setError('No se pudieron cargar las publicaciones. Por favor, inténtalo de nuevo más tarde.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-600"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-20 text-red-600">{error}</div>;
    }

    if (postSlug) {
        const post = posts.find(p => p.slug === postSlug);
        return post ? <BlogPostDetail post={post} allPosts={posts} navigate={navigate} originPage={originPage} /> : <div className="text-center py-20">Publicación no encontrada.</div>;
    }
    
    return <BlogListPage posts={posts} navigate={navigate} />;
};

export const FeaturedPostsSection: React.FC<{ posts: BlogPost[]; navigate: (target: NavigationTarget) => void; originPage: Page; }> = ({ posts, navigate, originPage }) => {
    const featuredPosts = posts.filter(p => p.isFeatured).slice(0, 2);

    if (featuredPosts.length === 0) return null;

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold font-montserrat text-cyan-700">Artículos Destacados</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto text-justify">Una selección de <strong>lecturas esenciales</strong> para empezar tu viaje de conocimiento.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {featuredPosts.map(post => (
                        <BlogPostCard key={post.slug} post={post} navigate={navigate} originPage={originPage} />
                    ))}
                </div>
            </div>
        </section>
    );
};