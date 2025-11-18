import React, { useState, useEffect } from 'react';
import type { Page, NavigationTarget } from './types';
import { Header } from './components/Header';
import { HomePage, AboutPage, ServicesPage, MenopausePage, ContactPage, DiagnosticPage, LegalPages } from './components/PageComponents';
import { BlogPageWrapper } from './components/BlogComponents';
import { Footer, ScrollToTopButton, CookieConsentBanner, PromotionalModal, BookPromoModal } from './components/UIComponents';
import Chatbot from './components/Chatbot';

const parseHash = (hash: string): NavigationTarget => {
    const path = hash.replace(/^#\//, '');
    if (!path) return 'home';

    if (path.startsWith('blog/')) {
        const slug = path.substring(5);
        if (slug) {
            return { page: 'blog', slug };
        }
        return 'blog';
    }

    const validPages: Page[] = ['home', 'sobre-mi', 'servicios', 'menopausia', 'diagnostico', 'blog', 'contacto', 'aviso-legal', 'privacidad', 'cookies'];
    if (validPages.includes(path as Page)) {
        return path as Page;
    }

    return 'home'; // Default to home for unknown paths
};

const App: React.FC = () => {
    const [navigation, setNavigation] = useState<NavigationTarget>(() => parseHash(window.location.hash));
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showCookieBanner, setShowCookieBanner] = useState(false);
    const [showPromoModal, setShowPromoModal] = useState(false);
    const [showBookPromoModal, setShowBookPromoModal] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowCookieBanner(true);
        }
    }, []);
    
    // Effect for handling modals based on navigation changes and session storage
    useEffect(() => {
        let promoTimer: ReturnType<typeof setTimeout>;
        let bookTimer: ReturnType<typeof setTimeout>;

        const currentPage = typeof navigation === 'string' ? navigation : navigation.page;
        
        // Logic for the book promo modal (specific to 'sobre-mi' page)
        const bookPromoShown = sessionStorage.getItem('bookPromoModalShown');
        if (currentPage === 'sobre-mi' && !bookPromoShown) {
            bookTimer = setTimeout(() => {
                setShowBookPromoModal(true);
            }, 1500); // 1.5 second delay
        }

        // Logic for the generic promo modal
        const promoModalShown = sessionStorage.getItem('promoModalShown');
        // Show only once per session on pages other than 'sobre-mi' to avoid being annoying.
        if (!promoModalShown && currentPage !== 'sobre-mi') {
            promoTimer = setTimeout(() => {
                setShowPromoModal(true);
            }, 500); // 0.5 second delay
        }

        // Cleanup timers on component unmount or when navigation changes
        return () => {
            clearTimeout(promoTimer);
            clearTimeout(bookTimer);
        };
    }, [navigation]); // Re-run this logic every time the page changes


    useEffect(() => {
        const handleHashChange = () => {
            const newNavTarget = parseHash(window.location.hash);
            setNavigation(newNavTarget);
            window.scrollTo(0, 0);
        };
        
        window.addEventListener('hashchange', handleHashChange);
        
        // Ensure initial state is correct by running once on mount
        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const handleNavigate = (target: NavigationTarget) => {
        let path = '';
        if (typeof target === 'string') {
            path = `/${target}`;
        } else if (target.page === 'blog' && target.slug) {
            path = `/blog/${target.slug}`;
        } else if (target.page === 'blog' && !target.slug) {
            path = `/blog`;
        }
        
        // Only update if the hash is different to avoid unnecessary history entries
        if (window.location.hash !== `#${path}`) {
            window.location.hash = path;
        } else {
            // If the hash is the same, it means we are navigating to the same page.
            // The desired behavior is to scroll to the top.
            window.scrollTo(0, 0);
        }
    };

    const handleCookieConsent = (consent: 'accepted' | 'rejected' | 'configured') => {
        localStorage.setItem('cookieConsent', consent);
        setShowCookieBanner(false);
        if (consent === 'configured') {
            handleNavigate('cookies');
        }
    };

    const handleClosePromoModal = () => {
        setShowPromoModal(false);
        sessionStorage.setItem('promoModalShown', 'true');
    };
    
    const handleCloseBookPromoModal = () => {
        setShowBookPromoModal(false);
        sessionStorage.setItem('bookPromoModalShown', 'true');
    };

    const currentPage = typeof navigation === 'string' ? navigation : navigation.page;

    const renderPage = () => {
        if (typeof navigation === 'object' && navigation.page === 'blog') {
            return <BlogPageWrapper navigate={handleNavigate} slug={navigation.slug} />;
        }
        
        switch (navigation as Page) {
            case 'home': return <HomePage navigate={handleNavigate} />;
            case 'sobre-mi': return <AboutPage navigate={handleNavigate} />;
            case 'servicios': return <ServicesPage navigate={handleNavigate} />;
            case 'menopausia': return <MenopausePage navigate={handleNavigate} />;
            case 'diagnostico': return <DiagnosticPage navigate={handleNavigate} />;
            case 'blog': return <BlogPageWrapper navigate={handleNavigate} />;
            case 'contacto': return <ContactPage navigate={handleNavigate} />;
            case 'aviso-legal': return <LegalPages page="aviso-legal" />;
            case 'privacidad': return <LegalPages page="privacidad" />;
            case 'cookies': return <LegalPages page="cookies" />;
            default: return <HomePage navigate={handleNavigate} />;
        }
    };

    return (
        <>
            {showPromoModal && <PromotionalModal onClose={handleClosePromoModal} />}
            {showBookPromoModal && <BookPromoModal onClose={handleCloseBookPromoModal} />}
            <Header navigate={handleNavigate} currentPage={currentPage} />
            <main>{renderPage()}</main>
            <Footer navigate={handleNavigate} />
            <ScrollToTopButton />

            {isChatOpen ? (
                <Chatbot closeChat={() => setIsChatOpen(false)} />
            ) : (
                <div className="fixed bottom-24 right-8 z-50 group flex items-center">
                    <span className="bg-cyan-600 text-white text-sm px-3 py-1 rounded-md mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        <strong>¿Necesitas ayuda?</strong>
                    </span>
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="bg-cyan-600 text-white p-4 rounded-full shadow-lg hover:bg-cyan-700 transition-all animate-fade-in"
                        aria-label="Abrir chat de asistente virtual"
                    >
                        <i className="fas fa-comments text-2xl"></i>
                    </button>
                </div>
            )}

            {showCookieBanner && (
                <CookieConsentBanner 
                    onAccept={() => handleCookieConsent('accepted')} 
                    onReject={() => handleCookieConsent('rejected')}
                    onConfigure={() => handleCookieConsent('configured')}
                />
            )}
        </>
    );
};

export default App;