import React from 'react';
import logoFull from '../assets/logos/logoFull.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-blue-950/95 w-full min-h-[120px] items-end mt-auto">
      <div className="py-6 flex flex-col sm:flex-row items-center gap-8 w-full justify-between px-4 sm:px-6">
        {/* Logo - centered on mobile, left on desktop */}
        <div className="order-1 order-sm-1 flex justify-center sm:justify-start w-full sm:w-auto">
          <img
            src={logoFull}
            alt="Logo BLUCO"
            className="h-16 sm:h-20 w-auto object-contain filter invert brightness-0 mx-auto sm:mx-0"
          />
        </div>

        {/* Contactos - stacked centered on mobile, row on desktop */}
        <div className="order-2 order-sm-2 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-gray-300 w-full sm:w-auto">
          <a href="mailto:info@blucotravel.com" className="hover:text-cyan-400 transition-colors duration-200 text-center sm:text-left">
            info@blucotravel.com
          </a>
          <a href="https://wa.me/573184559655" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors duration-200">
            <FontAwesomeIcon icon={faWhatsapp} className="h-7 w-7 text-cyan-400 transition-transform duration-200 hover:scale-110" />
          </a>
          <a href="" className="hover:text-cyan-400 transition-colors duration-200">
            <FontAwesomeIcon icon={faInstagram} className="h-7 w-7 text-cyan-400 transition-transform duration-200 hover:scale-110" />
          </a>
        </div>
      </div>

      {/* Copyright al final */}
      <div className="mt-4 sm:mt-2 text-center text-sm text-gray-400 px-4">
        <p>{t('copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;