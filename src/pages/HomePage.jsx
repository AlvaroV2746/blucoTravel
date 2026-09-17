import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { IMAGES } from '../data/images';
import { data } from '../data/tours';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import HeroCarousel from '../components/HeroCarousel';

const HomePage = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('meta.home.title')}</title>
        <meta name="description" content={t('seo.home.description')} />
        <meta name="keywords" content={t('seo.home.keywords', { returnObjects: true }).join(', ')} />
        <meta property="og:title" content={`${t('meta.home.title')} | BLUCO Travel`} />
        <meta property="og:description" content={t('seo.home.description')} />
        <meta property="og:image" content="https://blucotravel.com/og-home.svg" />

      </Helmet>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 text-center my-6 tracking-tight ">
        {t('common.title')}
      </h1>      <div className="max-w-7xl mx-auto py-1">
        <HeroCarousel slides={data} />

        <h3 className="mt-10 text-2xl font-bold text-blue-900 mb-6 text-center">{t('common.top')}<FontAwesomeIcon icon={faFire} className="text-4xl text-orange-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.9)] animate-pulse" /></h3>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div
            onClick={() => onNavigate('services')}
            className="group relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img src={IMAGES['basic-lodging-guatape']} alt="Cabaña ecológica con vista al embalse de Guatapé" loading="lazy" decoding="async" className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 bg-white/80 p-4">
              <h3 className="font-bold text-blue-900">{t('guatapeAccommodations.deluxeTitle')}</h3>
              <p className="mt-1 text-sm text-gray-600">
                {t('guatapeAccommodations.deluxeStats').slice(0, 60)}...
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('services')}
            className="group relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img src={IMAGES['bluco-travel-river-nature-landscape-san-rafael.webp']} alt="Río cristalino en San Rafael para kayak y actividades acuáticas" loading="lazy" decoding="async" className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 bg-white/80 p-4">
              <h3 className="font-bold text-emerald-500">{t('common.activities')}</h3>
              <p className="mt-1 text-sm text-gray-600">{t('sanRafaActivities.activity3Title')}</p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('services')}
            className="group relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img src={IMAGES['bluco-travel-birdwatching.webp']} alt="Paquete turístico completo con alojamiento y actividades en Guatapé y San Rafael" loading="lazy" decoding="async" className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 bg-white/80 p-4">
              <h3 className="font-bold text-red-600">{t('common.packages')}</h3>
              <p className="mt-1 text-sm text-gray-600">{t('packages.package1title')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;