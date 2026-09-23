import { IMAGES } from '../data/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 border-t border-cyan-500/30 shadow-2xl shadow-cyan-950/20 w-full min-h-[120px] items-end mt-auto">
      <div className="pt-6 flex flex-col sm:flex-row items-center gap-8 w-full justify-between px-6 sm:px-12">
        {/* Logo - centrado en mobile, izquierda en PC */}
        <div className="order-1 flex justify-center sm:justify-start w-full sm:w-auto">
          <img
            src={IMAGES['bluco-travel-Logo.webp']}
            alt="Logotipo oficial de BLUCO Travel - Agencia de Turismo Sostenible en Antioquia Colombia"
            className="h-16 sm:h-20 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(6,182,212,0.3)] brightness-0 invert mx-auto sm:mx-0"
          />
        </div>

        {/* Contactos - con margen izquierdo de 300px exclusivo para PC (sm:ml-[300px]) */}
        <div className="sm:mr-20 sm:my-4 order-2 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-gray-300 w-full sm:w-auto sm:ml-[300px]">
          <a href="mailto:info@blucotravel.com" className="hover:text-cyan-400 transition-colors duration-200 text-center sm:text-left">
            info@blucotravel.com
          </a>

          {/* Contenedor exclusivo para mantener WhatsApp e Instagram en línea */}
          <div className="flex flex-row items-center gap-6">
            <a href="https://wa.me/573184559655" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors duration-200">
              <FontAwesomeIcon icon={faWhatsapp} className="scale-300 mx-5 h-14 w-14 text-cyan-400 transition-transform duration-200 hover:scale-350" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors duration-200">
              <FontAwesomeIcon icon={faInstagram} className="scale-300 mx-5 h-14 w-14 text-cyan-400 transition-transform duration-200 hover:scale-350" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright al final con una sutil línea divisoria */}
      <div className="sm:mt-2 pb-4 text-center text-sm text-gray-400 px-4">
        <p>{t('copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;