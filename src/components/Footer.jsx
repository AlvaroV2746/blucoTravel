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
    <footer className="bg-blue-950/95 w-full min-h-[60px] items-end mt-auto">
      <div className="py-2 flex flex-col sm:flex-row items-center gap-10 w-full justify-between">
        {/* Logo a la izquierda - monocromático blanco */}
        <div className="order-1 order-sm-1 justify-start">
          <img
            src={logoFull}
            alt="Logo BLUCO"
            className="h-20 w-auto object-contain filter invert brightness-0 ml-20"
          />
        </div>

        {/* Contactos a la derecha */}
        <div className="order-2 order-sm-2 text-sm text-gray-300 gap-4 mx-20 px-20">
          <a href="mailto:info@blucotravel.com" className="hover:text-cyan-400 transition-colors duration-200 mx-6">
            info@blucotravel.com
          </a>
          <a href="https://wa.me/573184559655" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors duration-200 ml-4 mx-12">
            <FontAwesomeIcon icon={faWhatsapp} className="h-8 w-8 text-cyan-400 scale-300 transform transition-transform duration-200" />
          </a>
          <a href="">
            <FontAwesomeIcon icon={faInstagram} className="h-10 w-10 text-cyan-400 scale-300 transform transition-transform duration-200" />
          </a>
        </div>
      </div>

      {/* Copyright al final */}
      <div className="mt-2 text-center text-sm text-gray-400">
        <p>{t('copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;