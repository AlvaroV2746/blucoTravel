import React, { useState } from 'react';
import logoFull from '../assets/logos/logoFull.png';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ onViewChange, onCartToggle }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mobileLinks = [
    { id: 'services', label: t('navbar.services') },
    { id: 'aboutus', label: t('navbar.about') },
    { id: 'contactus', label: t('navbar.contact') },
    { id: 'localproducts', label: t('navbar.products') }
  ];

  return (
    <header className="bg-white border-b border-gray-200 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo a la izquierda */}
        <div className="flex items-center gap-2">
          <img
            src={logoFull}
            alt="Logo BLUCO"
            className="h-20 w-auto object-contain text-blue-900 font-bold uppercase tracking-wider"
            onClick={() => onViewChange('home')}
          />
        </div>

        {/* Menú de navegación desktop */}
        <nav className="hidden sm:flex items-center gap-8">
          {mobileLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className="px-4 py-2 text-sm font-medium text-gray-700 relative after:content-[''] after:absolute after:-bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-600 after:transition-all after:duration-300 group-hover:after:w-full text-blue-900 hover:text-cyan-600 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Botón hamburguesa para mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded hover:bg-gray-100 transition"
          aria-label="Menú principal"
        >
          <span className="block h-1 w-full bg-gray-800 rounded-md mb-1" />
          <span className="block h-1 w-full bg-gray-800 rounded-md" />
        </button>

        {/* Menú mobile drawer */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 absolute right-0 inset-y-0 w-64 bg-white p-6 shadow-lg z-50 transform transition-transform duration-300 ease-out translate-x-full group-[isMenuOpen=true]:translate-x-0">
            <ul className="space-y-6">
              {mobileLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onViewChange(item.id);
                    }}
                    className="w-full text-left px-0 py-2 text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors opacity-0 group-hover:opacity-100"
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
            className="px-3 py-1.5 text-sm font-medium text-gray-600 rounded border border-cyan-300 group-hover:border-cyan-500 transition-colors duration-300"
          >
            ES
          </button>
          {/* Idioma EN */}
          <button onClick={() => i18n.changeLanguage('en')} 
            className="px-3 py-1.5 text-sm font-medium text-gray-600 rounded border border-cyan-300 group-hover:border-cyan-500 transition-colors duration-300"
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;