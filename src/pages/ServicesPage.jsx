import { useTranslation } from 'react-i18next';
import { guatapeAcommodations, guatapeServices, sanRafaAcommodations, sanRafaServices, packages } from '../data/tours';
import TourCard from '../components/TourCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain, faLeaf, faGift } from '@fortawesome/free-solid-svg-icons';

const ServicesPage = ({ onSelect, onAdd, openSections, toggleSection }) => {
  const { t } = useTranslation();

  
  return (
    <div className="max-w-7xl mx-auto">
      {/* Guatapé */}
      <div 
        onClick={() => toggleSection('guatape')} 
        className="relative rounded-2xl overflow-hidden mb-6 cursor-pointer h-40"
      >
        <img src={guatapeAcommodations[0].img} alt="Guatapé" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-blue-900/50"></div>
        <div className="absolute left-4 top-4 z-10">
          <FontAwesomeIcon icon={faMountain} className="text-2xl text-white" />
          <span className="ml-2 text-white font-medium text-sm">Guatapé</span>
        </div>
        <svg 
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white w-6 h-6 transition-transform duration-300 ${
            openSections['guatape'] ? 'rotate-180' : ''
          }"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7.23 7.23l1.84 1.84 4.58 4.58L7.23 20.77z"/>
        </svg>
      </div>
      {openSections['guatape'] && (
        <div className="space-y-8">
          <div onClick={() => toggleSection('guatape-accom')} className="rounded-lg bg-blue-100 text-blue-800 font-medium px-3 py-1.5 hover:bg-blue-200 cursor-pointer flex items-center gap-2">
              <FontAwesomeIcon icon={faLeaf} className="text-blue-600 text-sm mr-2" />
              <span>{t('common.accommodation')}</span>
              <span className="ml-2 text-xs text-blue-600 font-bold">{guatapeAcommodations.length}</span>
            </div>
          {openSections['guatape-accom'] && (
            <div className="grid grid-cols-2 gap-6">
              {guatapeAcommodations.map((activity) => (
                <TourCard key={activity.id} nameKey={activity.name} img={activity.img} desc={activity.desc} stats={activity.stats} onSelect={onSelect} onAdd={onAdd} />
              ))}
            </div>
          )}

          <div onClick={() => toggleSection('guatape-act')} className="rounded-lg bg-blue-100 text-blue-800 font-medium px-3 py-1.5 hover:bg-blue-200 cursor-pointer flex items-center gap-2">
              <FontAwesomeIcon icon={faLeaf} className="text-blue-600 text-sm mr-2" />
              <span>{t('common.activities')}</span>
              <span className="ml-2 text-xs text-blue-600 font-bold">{guatapeServices.length}</span>
            </div>
          {openSections['guatape-act'] && (
            <div className="grid grid-cols-2 gap-6">
              {guatapeServices.map((activity) => (
                <TourCard key={activity.id} nameKey={activity.name} img={activity.img} desc={activity.desc} stats={activity.stats} onSelect={onSelect} onAdd={onAdd} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* San Rafael */}
      <div 
        onClick={() => toggleSection('sanrafael')} 
        className="relative rounded-2xl overflow-hidden mb-6 cursor-pointer h-40"
      >
        <img src={sanRafaAcommodations[0].img} alt="San Rafael" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-emerald-500/50"></div>
        <div className="absolute left-4 top-4 z-10">
          <FontAwesomeIcon icon={faLeaf} className="text-2xl text-white" />
          <span className="ml-2 text-white font-medium text-sm">San Rafael</span>
        </div>
        <svg 
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white w-6 h-6 transition-transform duration-300 ${
            openSections['sanrafael'] ? 'rotate-180' : ''
          }"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7.23 7.23l1.84 1.84 4.58 4.58L7.23 20.77z"/>
        </svg>
      </div>
      {openSections['sanrafael'] && (
        <div className="space-y-8">
          <div onClick={() => toggleSection('sanrafael-accom')} className="rounded-lg bg-emerald-100 text-emerald-800 font-medium px-3 py-1.5 hover:bg-emerald-200 cursor-pointer flex items-center gap-2">
              <FontAwesomeIcon icon={faLeaf} className="text-emerald-600 text-sm mr-2" />
              <span>{t('common.accommodation')}</span>
              <span className="ml-2 text-xs text-emerald-600 font-bold">{sanRafaAcommodations.length}</span>
            </div>
          {openSections['sanrafael-accom'] && (
            <div className="grid grid-cols-2 gap-6">
              {sanRafaAcommodations.map((activity) => (
                <TourCard key={activity.id} nameKey={activity.name} img={activity.img} desc={activity.desc} stats={activity.stats} onSelect={onSelect} onAdd={onAdd} />
              ))}
            </div>
          )}

          <div onClick={() => toggleSection('sanrafael-act')} className="rounded-lg bg-emerald-100 text-emerald-800 font-medium px-3 py-1.5 hover:bg-emerald-200 cursor-pointer flex items-center gap-2">
              <FontAwesomeIcon icon={faLeaf} className="text-emerald-600 text-sm mr-2" />
              <span>{t('common.activities')}</span>
              <span className="ml-2 text-xs text-emerald-600 font-bold">{sanRafaServices.length}</span>
            </div>
          {openSections['sanrafael-act'] && (
            <div className="grid grid-cols-2 gap-6">
              {sanRafaServices.map((activity) => (
                <TourCard key={activity.id} nameKey={activity.name} img={activity.img} desc={activity.desc} stats={activity.stats} onSelect={onSelect} onAdd={onAdd} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Paquetes */}
      <div 
        onClick={() => toggleSection('packages')} 
        className="relative rounded-2xl overflow-hidden mb-6 cursor-pointer h-40"
      >
        <img src={packages[0].img} alt="Paquetes" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-red-500/50"></div>
        <div className="absolute left-4 top-4 z-10">
          <FontAwesomeIcon icon={faGift} className="text-2xl text-white" />
          <span className="ml-2 text-white font-medium text-sm">Paquetes</span>
        </div>
        <svg 
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white w-6 h-6 transition-transform duration-300 ${
            openSections['packages'] ? 'rotate-180' : ''
          }"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7.23 7.23l1.84 1.84 4.58 4.58L7.23 20.77z"/>
        </svg>
      </div>
      {openSections['packages'] && (
        <div className="space-y-8">
          <div className="rounded-lg bg-red-100 text-red-800 font-medium px-3 py-1.5 hover:bg-red-200 cursor-pointer flex items-center gap-2">
            <FontAwesomeIcon icon={faGift} className="text-red-600 text-sm mr-2" />
            <span>{t('common.packages')}</span>
            <span className="ml-2 text-xs text-red-600 font-bold">{packages.length}</span>
          </div>
          {openSections['packages'] && (
            <div className="grid grid-cols-3 gap-6">
              {packages.map((activity) => (
                <TourCard key={activity.id} nameKey={activity.name} img={activity.img} desc={activity.desc} stats={activity.stats} onSelect={onSelect} onAdd={onAdd} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;