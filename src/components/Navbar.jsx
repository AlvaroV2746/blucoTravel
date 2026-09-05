import React from 'react';
import logoFull from '../assets/logos/logoFull.png';
import { useTranslation } from 'react-i18next';

const Navbar = ({ onViewChange }) => {
  const { t, i18n } = useTranslation();

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2">
        <img src={logoFull} alt="Logo BLUCO" className="h-20 w-auto object-contain" onClick={() => onViewChange('home')} />
      </div>

      <nav className="hidden sm:flex items-center gap-8">
        {[
          { id: 'services', label: t('navbar.services') },
          { id: 'aboutus', label: t('navbar.about') },
          { id: 'contactus', label: t('navbar.contact') },
          { id: 'localproducts', label: t('navbar.products') }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className="px-4 py-2 text-sm font-medium text-gray-700 rounded hover:text-cyan-600 transition-colors"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <button onClick={() => i18n.changeLanguage('es')} className="px-3 py-1.5 text-sm font-medium text-gray-600 rounded border border-cyan-300 hover:border-cyan-500">
          ES
        </button>
        <button onClick={() => i18n.changeLanguage('en')} className="px-3 py-1.5 text-sm font-medium text-gray-600 rounded border border-cyan-300 hover:border-cyan-500">
          EN
        </button>
      </div>
    </header>
  );
};

export default Navbar;