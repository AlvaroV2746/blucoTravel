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
    <footer className="bg-blue-950/95 w-full">
      <div className="mx-0 py-12 flex flex-col sm:flex-row items-center gap-8">
        {/* Logo a la izquierda - monocromático blanco */}
        <div className="order-1 order-sm-1">
          <img
            src={logoFull}
            alt="Logo BLUCO"
            className="h-20 w-auto object-contain filter invert brightness(0.8) saturate(0)"
          />
        </div>

        {/* Contactos a la derecha */}
        <div className="order-2 order-sm-2 text-sm text-gray-300">
          <a href="https://wa.me/573184559655" target="_blank" rel="noreferrer" className="hover:scale-105 hover:text-cyan-400 transition-transform transition-colors duration-200">
            <FontAwesomeIcon icon={faWhatsapp} className="mr-2 h-4 w-4 text-cyan-400 transition-transform duration-200" /> +57 318 455 9655
          </a>
          <a href="mailto:info@blucotravel.com" className="hover:scale-105 hover:text-cyan-400 transition-transform transition-colors duration-200">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2 h-4 w-4 text-cyan-400 transition-transform duration-200" /> info@blucotravel.com
          </a>
        </div>

        {/* Redes sociales */}
        <div className="order-3 order-sm-4">
          <FontAwesomeIcon icon={faInstagram} className="h-5 w-5 text-cyan-400 hover:scale-110 transition-transform duration-200" /> Instagram
          <a href="https://wa.me/573184559655" target="_blank" rel="noopener noreferrer" className="hover:scale-105 hover:text-cyan-400 transition-transform duration-200">
            <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5 text-cyan-400 hover:scale-110 transition-transform duration-200" /> WhatsApp
          </a>
        </div>
      </div>

      {/* Copyright al final */}
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;