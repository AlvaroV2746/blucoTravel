import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faUsers, faMountain } from '@fortawesome/free-solid-svg-icons';
import { IMAGES } from '../data/images';
import FAQSection from '../components/FAQSection';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('meta.about.title')} | BLUCO Travel</title>
        <meta name="description" content={t('seo.about.description')} />
        <meta name="keywords" content={t('seo.about.keywords', { returnObjects: true }).join(', ')} />
        <meta property="og:title" content="Nuestra Historia - BLUCO Travel Colombia" />
        <meta property="og:description" content={t('seo.about.description')} />
        <meta property="og:image" content="https://blucotravel.com/og-about.svg" />
        <meta name="twitter:title" content="Nuestra Historia - BLUCO Travel Colombia" />
        <meta name="twitter:description" content={t('seo.about.description')} />
        <meta name="twitter:image" content="https://blucotravel.com/og-about.svg" />
      </Helmet>
      <div className="max-w-2xl mx-auto py-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 border-b-2 border-cyan-500">
          {t('about.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-600 mb-4">{t('about.description')}</p>

            <h3 className="text-xl font-medium text-blue-900 mb-3">{t('about.mission')}</h3>
            <p className="text-gray-600 mb-4">{t('about.vision')}</p>

            <div className="grid grid-cols-3 gap-3">
              <div className="group hover:scale-105 hover:text-green-600 transition-transform duration-300">
                <FontAwesomeIcon icon={faLeaf} className="text-green-500 text-4xl mb-2 block" />
                <span className="text-sm text-gray-600">{t('about.value1Title')}</span>
                <p className="text-xs text-gray-500">{t('about.value1Desc')}</p>
              </div>
              <div className="group hover:scale-105 hover:text-blue-600 transition-transform duration-300">
                <FontAwesomeIcon icon={faUsers} className="text-blue-500 text-4xl mb-2 block" />
                <span className="text-sm text-gray-600">{t('about.value2Title')}</span>
                <p className="text-xs text-gray-500">{t('about.value2Desc')}</p>
              </div>
              <div className="group hover:scale-105 hover:text-red-600 transition-transform duration-300">
                <FontAwesomeIcon icon={faMountain} className="text-red-500 text-4xl mb-2 block" />
                <span className="text-sm text-gray-600">{t('about.value3Title')}</span>
                <p className="text-xs text-gray-500">{t('about.value3Desc')}</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={IMAGES['cacaoTour.jpg']}
              alt="Experiencia de tour de café en finca cafetera colombiana con BLUCO Travel"
              loading="lazy"
              decoding="async"
              className="w-full h-64 object-cover rounded-md transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 rounded-md"></div>
          </div>
        </div>
      </div>

      <FAQSection />
    </>
  );
};

export default AboutPage;