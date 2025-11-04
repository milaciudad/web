import React, { useState, useEffect, useRef } from 'react';
import type { NavigationTarget, Page } from '../types';

interface HeaderProps {
    navigate: (target: NavigationTarget) => void;
    currentPage: Page;
}

export const Header: React.FC<HeaderProps> = ({ navigate, currentPage }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    // Effect for sticky header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.pageYOffset > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effect to lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const handleNavigate = (target: NavigationTarget) => {
        setMobileMenuOpen(false);
        navigate(target);
    };

    const getLinkClassName = (page: Page) => {
        return currentPage === page
            ? 'text-cyan-600 font-semibold'
            : 'text-gray-600 hover:text-cyan-600 transition-colors';
    };

    const navItems = [
        { page: 'home' as Page, label: 'Inicio' },
        { page: 'sobre-mi' as Page, label: 'Sobre Mí' },
        { page: 'servicios' as Page, label: 'Mi Método' },
        { page: 'blog' as Page, label: 'Blog' },
        { page: 'contacto' as Page, label: 'Contacto' },
    ];
    
    return (
        <>
            <header className={`bg-white shadow-sm sticky top-0 z-50 font-inter transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div>
                        <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate({ page: 'home' })}} className="flex items-center space-x-4">
                            <img src="https://images.squidge.org/images/2025/11/01/logotipo-mila-ciudad.webp" alt="Logotipo Mila Ciudad" className={`transition-all duration-300 w-auto ${isScrolled ? 'h-16' : 'h-24'}`}/>
                            <div className={`${isScrolled ? 'hidden md:block' : ''}`}>
                                 <span className="text-xl font-bold font-montserrat tracking-wider text-cyan-600">MILA CIUDAD</span>
                                 <p className={`text-xs font-light text-gray-500 tracking-wider transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`}>SALUD ACTIVA. NO TE DOBLEGUES.</p>
                            </div>
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center space-x-8 text-base">
                        <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate({ page: 'home' })}} className={getLinkClassName('home')}>Inicio</a>
                        <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate({ page: 'sobre-mi' })}} className={getLinkClassName('sobre-mi')}>Sobre Mí</a>
                        <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate({ page: 'servicios' })}} className={getLinkClassName('servicios')}>Mi Método</a>
                        <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate({ page: 'blog' })}} className={getLinkClassName('blog')}>Blog</a>
                        <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate({ page: 'contacto' })}} className={getLinkClassName('contacto')}>Contacto</a>
                        <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1xusc8tIardp1BNw4BXAY6IuRIxpqy-d8N5C1El2Hfo_30ls6gLiTrmGImyoHyy1xamV3wfzU3" target="_blank" rel="noopener noreferrer" className="bg-cyan-600 text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-cyan-700 transition-colors shadow-md transform hover:-translate-y-0.5">
                            Agendar Sesión
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="relative h-8 w-8 text-gray-600 hover:text-cyan-600 focus:outline-none z-50" aria-label="Toggle menu">
                            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
                            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-black/40"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-hidden="true"
                ></div>

                {/* Menu Panel */}
                <nav className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-8 pt-24">
                        <div className="flex flex-col items-start space-y-6 text-2xl">
                             {navItems.map((item, index) => (
                                <a 
                                    key={item.page}
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); handleNavigate({ page: item.page }); }} 
                                    className={`font-semibold transition-all duration-300 ${getLinkClassName(item.page)} ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                                    style={{ transitionDelay: `${150 + index * 50}ms` }}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <div 
                                className={`w-full pt-6 mt-6 border-t border-gray-200 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                                style={{ transitionDelay: `${150 + navItems.length * 50}ms` }}
                            >
                                <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1xusc8tIardp1BNw4BXAY6IuRIxpqy-d8N5C1El2Hfo_30ls6gLiTrmGImyoHyy1xamV3wfzU3" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-cyan-600 text-white px-5 py-3 rounded-md font-semibold hover:bg-cyan-700 transition-colors shadow-md text-base">
                                    Agendar Sesión de Claridad
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};