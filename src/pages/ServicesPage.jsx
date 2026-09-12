import { useTranslation } from 'react-i18next';
import { guatapeAcommodations, guatapeServices, sanRafaAcommodations, sanRafaServices, packages } from '../data/tours';
import TourCard from '../components/TourCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain, faLeaf, faGift } from '@fortawesome/free-solid-svg-icons';

const ServicesPage = ({ onSelect, onAdd, openSections, toggleSection }) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-2 space-y-0">
      {/* ================= GUATAPÉ ================= */}
      <div 
        onClick={() => toggleSection('guatape')} 
        className={`relative overflow-hidden cursor-pointer h-40 shadow-md hover:shadow-xl transition-all duration-300 ${
          openSections['guatape'] ? 'rounded-t-2xl rounded-b-none' : 'rounded-2xl'
        }`}
      >
        <img src={guatapeAcommodations[0].img} alt="Guatapé" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-blue-900/50"></div>
        <div className="absolute left-4 top-4 z-10">
          <FontAwesomeIcon icon={faMountain} className="text-2xl text-white" />
          <span className="ml-2 text-white font-medium text-sm">Guatapé</span>
        </div>
        <svg 
          className={`absolute right-4 top-1/2 -translate-y-1/2 text-white w-6 h-6 transition-transform duration-500 ${
            openSections['guatape'] ? 'rotate-180' : ''
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7.23 7.23l1.84 1.84 4.58 4.58L7.23 20.77z"/>
        </svg>
      </div>

      <div className={`grid transition-all duration-700 ease-in-out overflow-hidden ${
        openSections['guatape'] ? 'grid-rows-[1fr] opacity-100 mb-6' : 'grid-rows-[0fr] opacity-0'
      }`}>
        <div className="overflow-hidden bg-blue-100/60 p-6 rounded-t-none rounded-b-2xl border border-blue-200 space-y-2">
          {/* Alojamiento Guatapé */}
          <div 
            onClick={() => toggleSection('guatape-accom')} 
            className={`rounded-lg bg-blue-100 text-blue-800 font-medium px-3 py-1.5 hover:bg-blue-200 cursor-pointer flex items-center gap-2 w-fit transition-all duration-300 ${
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
                  <TourCard key={activity.id} id={activity.id} nameKey={activity.name} img={activity.img} desc={activity.desc} stats={activity.stats} onSelect={onSelect} onAdd={onAdd} />
                ))}
              </div>
            </div>
          </div>

          {/* Actividades Guatapé */}
          <div 
            onClick={() => toggleSection('guatape-act')} 
            className={`rounded-lg bg-blue-100 text-blue-800 font-medium px-3 py-1.5 hover:bg-blue-200 cursor-pointer flex items-center gap-2 w-fit transition-all duration-300 ${
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
                  <TourCard key={activity.id} id={activity.id} nameKey={activity.name} img={activity.img} desc={activity.desc} stats={activity.stats} onSelect={onSelect} onAdd={onAdd} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SAN RAFAEL ================= */}
      <div 
        onClick={() => toggleSection('sanrafael')} 
        className={`relative overflow-hidden cursor-pointer h-40 shadow-md hover:shadow-xl transition-all duration-300 ${
          openSections['sanrafael'] ? 'rounded-t-2xl rounded-b-none' : 'rounded-2xl'
        }`}
      >
        <img src={sanRafaAcommodations[0].img} alt="San Rafael" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-emerald-500/50"></div>
        <div className="absolute left-4 top-4 z-10">
          <FontAwesomeIcon icon={faLeaf} className="text-2xl text-white" />
          <span className="ml-2 text-white font-medium text-sm">San Rafael</span>
        </div>
        <svg 
          className={`absolute right-4 top-1/2 -translate-y-1/2 text-white w-6 h-6 transition-transform duration-500 ${
            openSections['sanrafael'] ? 'rotate-180' : ''
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7.23 7.23l1.84 1.84 4.58 4.58L7.23 20.77z"/>
        </svg>
      </div>

      <div className={`grid transition-all duration-700 ease-in-out overflow-hidden ${
        openSections['sanrafael'] ? 'grid-rows-[1fr] opacity-100 mb-6' : 'grid-rows-[0fr] opacity-0'
      }`}>
        <div className="overflow-hidden bg-emerald-100/60 p-6 rounded-t-none rounded-b-2xl border border-emerald-200 space-y-4">
          {/* Alojamiento San Rafael */}
          <div 
            onClick={() => toggleSection('sanrafael-accom')} 
            className={`rounded-lg bg-emerald-100 text-emerald-800 font-medium px-3 py-1.5 hover:bg-emerald-200 cursor-pointer flex items-center gap-2 w-fit transition-all duration-300 ${
              openSections['sanrafael-accom'] ? 'md:px-[135px]' : 'md:px-[30px]'
            }`}
          >
              <FontAwesomeIcon icon={faLeaf} className="text-emerald-600 text-sm mr-2" />
              <span>{t('common.accommodation')}</span>
              <span className="ml-2 text-xs text-emerald-600 font-bold">{sanRafaAcommodations.length}</span>
          </div>

          <div className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
            openSections['sanrafael-accom'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}>
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2">
                {sanRafaAcommodations.map((activity) => (
                  <TourCard key={activity.id} id={activity.id} nameKey={activity.name} img={activity.img} desc={activity.desc} stats={activity.stats} onSelect={onSelect} onAdd={onAdd} />
                ))}
              </div>
            </div>
          </div>

          {/* Actividades San Rafael */}
          <div 
            onClick={() => toggleSection('sanrafael-act')} 
            className={`rounded-lg bg-emerald-100 text-emerald-800 font-medium px-3 py-1.5 hover:bg-emerald-200 cursor-pointer flex items-center gap-2 w-fit transition-all duration-300 ${
              openSections['sanrafael-act'] ? 'md:px-[135px]' : 'md:px-[30px]'
            }`}
          >
              <FontAwesomeIcon icon={faLeaf} className="text-emerald-600 text-sm mr-2" />
              <span>{t('common.activities')}</span>
              <span className="ml-2 text-xs text-emerald-600 font-bold">{sanRafaServices.length}</span>
          </div>

          <div className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
            openSections['sanrafael-act'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}>
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2">
                {sanRafaServices.map((activity) => (
                  <TourCard key={activity.id} id={activity.id} nameKey={activity.name} img={activity.img} desc={activity.desc} stats={activity.stats} onSelect={onSelect} onAdd={onAdd} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PAQUETES ================= */}
      <div 
        onClick={() => toggleSection('packages')} 
        className={`relative overflow-hidden cursor-pointer h-40 shadow-md hover:shadow-xl transition-all duration-300 ${
          openSections['packages'] ? 'rounded-t-2xl rounded-b-none' : 'rounded-2xl'
        }`}
      >
        <img src={packages[0].img} alt="Paquetes" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-red-500/50"></div>
        <div className="absolute left-4 top-4 z-10">
          <FontAwesomeIcon icon={faGift} className="text-2xl text-white" />
          <span className="ml-2 text-white font-medium text-sm">Paquetes</span>
        </div>
        <svg 
          className={`absolute right-4 top-1/2 -translate-y-1/2 text-white w-6 h-6 transition-transform duration-500 ${
            openSections['packages'] ? 'rotate-180' : ''
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7.23 7.23l1.84 1.84 4.58 4.58L7.23 20.77z"/>
        </svg>
      </div>

      <div className={`grid transition-all duration-700 ease-in-out overflow-hidden ${
        openSections['packages'] ? 'grid-rows-[1fr] opacity-100 mb-6' : 'grid-rows-[0fr] opacity-0'
      }`}>
        <div className="overflow-hidden bg-rose-100/60 p-6 rounded-t-none rounded-b-2xl border border-rose-200 space-y-4">
          <div 
            onClick={() => toggleSection('packages-list')} 
            className={`rounded-lg bg-red-100 text-red-800 font-medium px-3 py-1.5 hover:bg-red-200 cursor-pointer flex items-center gap-2 w-fit transition-all duration-300 ${
              openSections['packages-list'] ? 'md:px-[135px]' : 'md:px-[30px]'
            }`}
          >
            <FontAwesomeIcon icon={faGift} className="text-red-600 text-sm mr-2" />
            <span>{t('common.packages')}</span>
            <span className="ml-2 text-xs text-red-600 font-bold">{packages.length}</span>
          </div>

          <div className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
            openSections['packages-list'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}>
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-2">
                {packages.map((activity) => (
                  <TourCard key={activity.id} id={activity.id} nameKey={activity.name} img={activity.img} desc={activity.desc} stats={activity.stats} onSelect={onSelect} onAdd={onAdd} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;