import React, { useState, useEffect } from 'react';
import logoFull from '../assets/logos/logoFull.png';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ onViewChange, onCartToggle }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mobileLinks = [
    { id: 'services', label: t('navbar.services') },
    { id: 'aboutus', label: t('navbar.about') },
    { id: 'contactus', label: t('navbar.contact') },
    { id: 'localproducts', label: t('navbar.products') }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-30 transition-all duration-1000 ease-in-out ${
      isScrolled
        ? 'bg-blue-950/10 border-b border-blue-900/20 shadow-lg'
        : 'bg-blue-950/95 border-b border-blue-900/50'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo a la izquierda */}
        <div className="flex items-center gap-2">
          <img
            src={logoFull}
            alt="Logo BLUCO"
            className={`h-20 w-auto object-contain transition-all duration-1000 ${
              isScrolled ? 'brightness-0 invert' : ''
            }`}
            onClick={() => onViewChange('home')}
          />
        </div>

        {/* Menú de navegación desktop */}
        <nav className="hidden sm:flex items-center gap-8">
          {mobileLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`px-4 py-2 text-sm font-medium relative after:content-[''] after:absolute after:-bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-600 after:transition-all after:duration-300 hover:after:w-full transition-colors duration-300 ${
                isScrolled ? 'text-gray-900 hover:text-cyan-600' : 'text-white hover:text-cyan-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Botón hamburguesa para mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded transition-colors duration-300"
          aria-label="Menú principal"
        >
          <span className={`block h-1 w-full rounded-md mb-1 transition-colors duration-300 ${isScrolled ? 'bg-gray-900' : 'bg-white'}`} />
          <span className={`block h-1 w-full rounded-md transition-colors duration-300 ${isScrolled ? 'bg-gray-900' : 'bg-white'}`} />
        </button>

        {/* Menú mobile drawer */}
        {isMenuOpen && (
          <div className="md:hidden absolute right-0 top-full w-64 p-6 shadow-lg z-50 transition-colors duration-300 transform transition-transform duration-300 ease-out"
               style={{ backgroundColor: isScrolled ? 'rgba(255,255,255,0.95)' : 'rgba(30,58,138,0.95)' }}>
            <ul className="space-y-6">
              {mobileLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onViewChange(item.id);
                    }}
                    className={`w-full text-left px-0 py-2 text-sm font-medium hover:text-cyan-600 transition-colors ${
                      isScrolled ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Copyright y lenguaje - ya sin carrito superior */}
        <div className="flex items-center gap-3">
          {/* Idioma ES */}
          <button onClick={() => i18n.changeLanguage('es')} 
            className={`px-3 py-1.5 text-sm font-medium rounded border transition-colors duration-300 ${
              isScrolled 
                ? 'text-gray-900 border-gray-400 hover:border-cyan-500 hover:text-cyan-600'
                : 'text-white border-cyan-300 hover:border-cyan-500 hover:text-cyan-300'
            }`}
          >
            ES
          </button>
          {/* Idioma EN */}
          <button onClick={() => i18n.changeLanguage('en')} 
            className={`px-3 py-1.5 text-sm font-medium rounded border transition-colors duration-300 ${
              isScrolled 
                ? 'text-gray-900 border-gray-400 hover:border-cyan-500 hover:text-cyan-600'
                : 'text-white border-cyan-300 hover:border-cyan-500 hover:text-cyan-300'
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;