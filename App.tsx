import React, { useState, useEffect } from 'react';
import type { NavigationTarget, Page } from './types';
import { Header } from './components/Header';
import { HomePage, AboutPage, ServicesPage, MenopausePage, ContactPage, DiagnosticPage, LegalPages } from './components/PageComponents';
import { BlogPageWrapper } from './components/BlogComponents';
import { Footer, ScrollToTopButton, CookieConsentBanner } from './components/UIComponents';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
    const [target, setTarget] = useState<NavigationTarget>({ page: 'home' });
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showCookieBanner, setShowCookieBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowCookieBanner(true);
        }
    }, []);

    // This effect handles scrolling to sections
    useEffect(() => {
        if (target.section) {
            setTimeout(() => {
                const sectionElement = document.getElementById(target.section);
                if (sectionElement) {
                    sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 100);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [target]);

    const navigate = (newTarget: NavigationTarget) => {
        setTarget(newTarget);
    };
    
    // Fix: Allow 'configured' as a valid consent type to handle the configure button action.
    const handleCookieConsent = (consent: 'accepted' | 'rejected' | 'configured') => {
        localStorage.setItem('cookieConsent', consent);
        setShowCookieBanner(false);
    };

    const renderPage = () => {
        switch (target.page) {
            case 'home':
                return <HomePage navigate={navigate} />;
            case 'sobre-mi':
                return <AboutPage navigate={navigate} />;
            case 'servicios':
                return <ServicesPage navigate={navigate} />;
            case 'menopausia':
                return <MenopausePage navigate={navigate} />;
            case 'diagnostico':
                return <DiagnosticPage navigate={navigate} />;
            case 'blog':
                return <BlogPageWrapper navigate={navigate} postSlug={target.postSlug} originPage={target.originPage} />;
            case 'contacto':
                return <ContactPage />;
            case 'aviso-legal':
            case 'privacidad':
            case 'cookies':
                return <LegalPages page={target.page} navigate={navigate} />;
            default:
                return <HomePage navigate={navigate} />;
        }
    };

    return (
        <>
            <Header navigate={navigate} currentPage={target.page} />
            <main>{renderPage()}</main>
            
            <Footer navigate={navigate} />
            <ScrollToTopButton />
            
            {!isChatOpen ? (
                <div className="fixed bottom-24 right-8 z-50 group flex items-center">
                    <span className="bg-cyan-600 text-white text-sm px-3 py-1 rounded-md mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        ¿Necesitas ayuda?
                    </span>
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="bg-cyan-600 text-white p-4 rounded-full shadow-lg hover:bg-cyan-700 transition-all animate-fade-in"
                        aria-label="Abrir chat de asistente virtual"
                    >
                        <i className="fas fa-comments text-2xl"></i>
                    </button>
                </div>
            ) : (
                <Chatbot closeChat={() => setIsChatOpen(false)} />
            )}
            
            {showCookieBanner && (
                <CookieConsentBanner 
                    onAccept={() => handleCookieConsent('accepted')} 
                    onReject={() => handleCookieConsent('rejected')}
                    onConfigure={() => {
                        handleCookieConsent('configured');
                        navigate({ page: 'cookies' });
                    }}
                />
            )}
        </>
    );
};

export default App;