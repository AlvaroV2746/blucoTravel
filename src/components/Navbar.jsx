import React, { useState, useEffect } from 'react';
import logoFull from '../assets/logos/logoFull.png';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ onViewChange }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const mobileLinks = [
    { id: 'services', label: t('navbar.services') },
    { id: 'aboutus', label: t('navbar.about') },
    { id: 'contactus', label: t('navbar.contact') },
    { id: 'localproducts', label: t('navbar.products') }
  ];

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 h-30 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-blue-950/30 border-b border-blue-900/20 shadow-lg'
          : 'bg-blue-950/95 border-b border-blue-900/50'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          {/* Logo a la izquierda */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src={logoFull}
              alt="Logo BLUCO"
              className={`h-20 w-auto object-contain transition-all duration-300 ${
                isScrolled ? 'brightness-0 invert' : ''
              }`}
              onClick={() => {
                onViewChange('home');
                closeMenu();
              }}
            />
          </div>

          {/* Menú de navegación desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {mobileLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className="px-4 py-2 text-sm font-medium text-white relative after:content-[''] after:absolute after:-bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full transition-colors duration-300 cursor-pointer hover:text-cyan-300"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Botones de Idioma y Hamburguesa */}
          <div className="flex items-center gap-4">
            {/* Idiomas Desktop */}
            <div className="hidden sm:flex items-center gap-2">
              <button 
                onClick={() => i18n.changeLanguage('es')} 
                className={`px-3 py-1.5 text-sm font-medium rounded border transition-colors duration-300 cursor-pointer ${
                  i18n.language === 'es'
                    ? 'bg-cyan-500 text-white border-cyan-500'
                    : 'text-white border-cyan-300/50 hover:border-cyan-500 hover:text-cyan-300'
                }`}
              >
                ES
              </button>
              <button 
                onClick={() => i18n.changeLanguage('en')} 
                className={`px-3 py-1.5 text-sm font-medium rounded border transition-colors duration-300 cursor-pointer ${
                  i18n.language === 'en'
                    ? 'bg-cyan-500 text-white border-cyan-500'
                    : 'text-white border-cyan-300/50 hover:border-cyan-500 hover:text-cyan-300'
                }`}
              >
                EN
              </button>
            </div>

            {/* Botón hamburguesa para mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded text-white transition-colors duration-300 cursor-pointer flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <FontAwesomeIcon icon={faXmark} className="text-2xl text-white" />
              ) : (
                <>
                  <span className="block h-0.5 w-6 bg-white rounded-md transition-all duration-300" />
                  <span className="block h-0.5 w-6 bg-white rounded-md transition-all duration-300" />
                  <span className="block h-0.5 w-6 bg-white rounded-md transition-all duration-300" />
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menú mobile drawer - Renderizado FUERA del header para evitar recortes de altura */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed top-30 left-0 right-0 z-40 bg-blue-950/98 backdrop-blur-xl border-b border-blue-900/50 shadow-2xl transition-all duration-300 ease-out p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
        >
          <ul className="space-y-4 text-center">
            {mobileLinks.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    closeMenu();
                    onViewChange(item.id);
                  }}
                  className="w-full px-4 py-3 text-lg font-medium text-white rounded-lg hover:bg-cyan-500/20 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Selector de idioma móvil dentro del menú desplegable */}
          <div className="mt-6 pt-6 border-t border-blue-900/50 flex justify-center gap-4">
            <button 
              onClick={() => { i18n.changeLanguage('es'); closeMenu(); }} 
              className={`px-4 py-2 text-sm font-medium rounded border transition-colors cursor-pointer ${
                i18n.language === 'es'
                  ? 'bg-cyan-500 text-white border-cyan-500'
                  : 'text-white border-cyan-300/50'
              }`}
            >
              Español (ES)
            </button>
            <button 
              onClick={() => { i18n.changeLanguage('en'); closeMenu(); }} 
              className={`px-4 py-2 text-sm font-medium rounded border transition-colors cursor-pointer ${
                i18n.language === 'en'
                  ? 'bg-cyan-500 text-white border-cyan-500'
                  : 'text-white border-cyan-300/50'
              }`}
            >
              English (EN)
            </button>
          </div>
        </div>
      )}

      {/* Backdrop overlay para oscurecer y bloquear la pantalla al abrir el menú móvil */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;