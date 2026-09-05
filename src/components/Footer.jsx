import React from 'react';
import logoFull from '../assets/logos/logoFull.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-8 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center gap-8">
        <div>
          <img src={logoFull} alt="Logo BLUCO" className="h-20 w-auto object-contain" />
        </div>
        <div className="text-sm text-gray-500">
          <a href="https://wa.me/573184559655" target="_blank" rel="noreferrer" className="hover:text-cyan-600">
            <FontAwesomeIcon icon={faWhatsapp} className="mr-2 h-5 w-5" /> +57 318 455 9655
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;