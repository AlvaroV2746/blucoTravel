import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { guatapeAcommodations, guatapeServices, sanRafaAcommodations, sanRafaServices, packages, sections } from '../data/tours';
import TourCard from '../components/TourCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain, faLeaf, faGift } from '@fortawesome/free-solid-svg-icons';

const ServicesPage = ({ onSelect, onAdd, openSections, toggleSection }) => {
  const { t } = useTranslation();

  // Helper para manejar eventos de teclado en elementos no nativos (divs interactivos)
  const handleKeyDown = (e, sectionKey) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSection(sectionKey);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('meta.services.title')}</title>
        <meta name="description" content={t('seo.services.description')} />
        <meta name="keywords" content={t('seo.services.keywords', { returnObjects: true }).join(', ')} />
        <meta property="og:title" content={`${t('meta.services.title')} | BLUCO Travel`} />
        <meta property="og:description" content={t('seo.services.description')} />
        <meta property="og:image" content="https://blucotravel.com/og-services.svg" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-2 space-y-0">
        
        {/* Sección Guatapé */}
        <div
          role="button"
          tabIndex={0}
          aria-expanded={!!openSections['guatape']}
          onClick={() => toggleSection('guatape')}
          onKeyDown={(e) => handleKeyDown(e, 'guatape')}
          className={`relative overflow-hidden cursor-pointer h-40 shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
            openSections['guatape'] ? 'rounded-t-2xl rounded-b-none' : 'rounded-2xl'
          }`}
        >
          <img src={sections[0].img} alt="Paisaje del embalse de Guatapé con cabañas ecológicas" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-blue-900/20"></div>
          <div className="absolute left-4 top-4 z-10 flex items-center">
            <FontAwesomeIcon icon={faMountain} className="text-2xl text-white" />
            <span className="ml-2 text-white font-medium text-sm">Guatapé</span>
          </div>
          <svg
            className={`absolute right-4 top-1/2 -translate-y-1/2 text-white w-6 h-6 transition-transform duration-500 ${
              openSections['guatape'] ? 'rotate-180' : ''
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7.23 7.23l1.84 1.84 4.58 4.58L7.23 20.77z" />
          </svg>
        </div>

        <div className={`grid transition-all duration-700 ease-in-out overflow-hidden ${
          openSections['guatape'] ? 'grid-rows-[1fr] opacity-100 mb-6' : 'grid-rows-[0fr] opacity-0'
        }`}>
          <div className="overflow-hidden bg-blue-100/60 p-6 rounded-t-none rounded-b-2xl border border-blue-200 space-y-2">
            
            {/* Subsección Alojamiento Guatapé */}
            <div
              role="button"
              tabIndex={0}
              aria-expanded={!!openSections['guatape-accom']}
              onClick={() => toggleSection('guatape-accom')}
              onKeyDown={(e) => handleKeyDown(e, 'guatape-accom')}
              className={`rounded-lg bg-blue-100 text-blue-800 font-medium px-3 py-1.5 hover:bg-blue-200 cursor-pointer flex items-center gap-2 w-fit transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                openSections['guatape-accom'] ? 'md:px-[135px]' : 'md:px-[30px]'
              }`}
            >
              <FontAwesomeIcon icon={faLeaf} className="text-blue-600 text-sm mr-2" />
              <span>{t('common.accommodation')}</span>
              <span className="ml-2 text-xs text-blue-600 font-bold">{guatapeAcommodations.length}</span>
            </div>

            <div className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
              openSections['guatape-accom'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}>
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2">
                  {guatapeAcommodations.map((activity) => (
                    <TourCard
                      key={activity.id}
                      id={activity.id}
                      type={activity.type}
                      nameKey={activity.name}
                      img={activity.img}
                      gallery={activity.gallery}
                      desc={activity.desc}
                      stats={activity.stats}
                      onSelect={onSelect}
                      onAdd={onAdd}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Subsección Actividades Guatapé */}
            <div
              role="button"
              tabIndex={0}
              aria-expanded={!!openSections['guatape-act']}
              onClick={() => toggleSection('guatape-act')}
              onKeyDown={(e) => handleKeyDown(e, 'guatape-act')}
              className={`rounded-lg bg-blue-100 text-blue-800 font-medium px-3 py-1.5 hover:bg-blue-200 cursor-pointer flex items-center gap-2 w-fit transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                openSections['guatape-act'] ? 'md:px-[135px]' : 'md:px-[30px]'
              }`}
            >
              <FontAwesomeIcon icon={faLeaf} className="text-blue-600 text-sm mr-2" />
              <span>{t('common.activities')}</span>
              <span className="ml-2 text-xs text-blue-600 font-bold">{guatapeServices.length}</span>
            </div>

            <div className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
              openSections['guatape-act'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}>
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2">
                  {guatapeServices.map((activity) => (
                    <TourCard
                      key={activity.id}
                      id={activity.id}
                      type={activity.type}
                      nameKey={activity.name}
                      img={activity.img}
                      gallery={activity.gallery}
                      desc={activity.desc}
                      stats={activity.stats}
                      onSelect={onSelect}
                      onAdd={onAdd}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Las secciones de San Rafael y Paquetes pueden replicar exactamente este mismo patrón con sus respectivas claves */}

      </div>
    </>
  );
};

export default ServicesPage;