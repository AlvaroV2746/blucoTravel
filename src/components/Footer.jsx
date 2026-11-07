import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { IMAGES } from '../data/images';
import { getRoute } from '../utils/routes';

const Footer = () => {
  const { t, i18n } = useTranslation();

  const aboutPath = getRoute(i18n.language, 'about');
  const termsPath = getRoute(i18n.language, 'terms');
  const privacyPath = getRoute(i18n.language, 'privacy');
  const cities = t('footer.cities', { returnObjects: true }) || [];

  return (
    <footer className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 border-t border-cyan-500/30 shadow-2xl shadow-cyan-950/20 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Columna 1: Marca */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <img
              src={IMAGES['bluco-travel-Logo.webp']}
              alt="Logotipo oficial de BLUCO Travel - Agencia de Turismo Sostenible en Antioquia Colombia"
              className="h-16 sm:h-20 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(6,182,212,0.3)] brightness-0 invert mx-auto sm:mx-0"
            />
            <p className="mt-4 text-sm text-gray-300 leading-relaxed max-w-xs">
              {t('footer.slogan')}
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://wa.me/573000726521"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/40 bg-white/5 text-cyan-400 transition-colors duration-200 hover:bg-cyan-500 hover:text-white"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@blucotravel.com"
                aria-label="info@blucotravel.com"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/40 bg-white/5 text-cyan-400 transition-colors duration-200 hover:bg-cyan-500 hover:text-white"
              >
                <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Columna 2: Destinos */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-400 mb-4">
              {t('footer.destinations')}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {cities.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Enlaces */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-400 mb-4">
              {t('footer.links')}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to={aboutPath} className="transition-colors duration-200 hover:text-cyan-400">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to={`${aboutPath}#faq`} className="transition-colors duration-200 hover:text-cyan-400">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link to={termsPath} className="transition-colors duration-200 hover:text-cyan-400">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to={privacyPath} className="transition-colors duration-200 hover:text-cyan-400">
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-400 mb-4">
              {t('footer.contactTitle')}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href="mailto:info@blucotravel.com"
                  className="transition-colors duration-200 hover:text-cyan-400"
                >
                  {t('footer.email')}
                </a>
              </li>
              <li>
                <a
                  href="tel:+573000726521"
                  className="transition-colors duration-200 hover:text-cyan-400"
                >
                  {t('footer.phone')}
                </a>
              </li>
            </ul>
            <p className="mt-4 flex items-center gap-2 text-sm text-gray-400">
              <FontAwesomeIcon icon={faLocationDot} className="text-cyan-400" />
              {t('footer.address')}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-cyan-500/20 py-4 text-center text-sm text-gray-400 px-4">
        <p>{t('copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;
