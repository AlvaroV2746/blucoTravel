import { useTranslation } from 'react-i18next';
import { guatapeAcommodations, guatapeServices, sanRafaAcommodations, sanRafaServices, packages } from '../data/tours';
import TourCard from '../components/TourCard';

const ServicesPage = ({ onSelect, onAdd, openSections, toggleSection }) => {
  const { t } = useTranslation();

  

  return (
    <div className="max-w-7xl mx-auto">
      {/* Guatapé */}
      <div onClick={() => toggleSection('guatape')} className="mb-6 rounded-lg bg-blue-500 text-white font-medium px-4 py-2 hover:bg-blue-600 transition cursor-pointer">
        Guatapé
      </div>
      {openSections['guatape'] && (
        <div className="space-y-8">
          <div onClick={() => toggleSection('guatape-accom')} className="rounded-lg bg-blue-100 text-blue-800 font-medium px-3 py-1.5 hover:bg-blue-200 cursor-pointer flex items-center gap-2">
              <span>{t('common.accommodation')}</span>
            </div>
          {openSections['guatape-accom'] && (
            <div className="grid grid-cols-2 gap-6">
              {guatapeAcommodations.map((activity) => (
                <TourCard key={activity.id} nameKey={activity.name} img={activity.img} desc={activity.desc} stats={activity.stats} onSelect={onSelect} onAdd={onAdd} />
              ))}
            </div>
          )}

          <div onClick={() => toggleSection('guatape-act')} className="rounded-lg bg-blue-100 text-blue-800 font-medium px-3 py-1.5 hover:bg-blue-200 cursor-pointer flex items-center gap-2">
              <span>{t('common.activities')}</span>
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
      <div onClick={() => toggleSection('sanrafael')} className="mb-6 rounded-lg bg-emerald-500 text-white font-medium px-4 py-2 hover:bg-emerald-600 transition cursor-pointer">
        San Rafael
      </div>
      {openSections['sanrafael'] && (
        <div className="space-y-8">
          <div onClick={() => toggleSection('sanrafael-accom')} className="rounded-lg bg-emerald-100 text-emerald-800 font-medium px-3 py-1.5 hover:bg-emerald-200 cursor-pointer flex items-center gap-2">
              <span>{t('common.accommodation')}</span>
            </div>
          {openSections['sanrafael-accom'] && (
            <div className="grid grid-cols-2 gap-6">
              {sanRafaAcommodations.map((activity) => (
                <TourCard key={activity.id} nameKey={activity.name} img={activity.img} desc={activity.desc} stats={activity.stats} onSelect={onSelect} onAdd={onAdd} />
              ))}
            </div>
          )}

          <div onClick={() => toggleSection('sanrafael-act')} className="rounded-lg bg-emerald-100 text-emerald-800 font-medium px-3 py-1.5 hover:bg-emerald-200 cursor-pointer flex items-center gap-2">
              <span>{t('common.activities')}</span>
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
      <div onClick={() => toggleSection('packages')} className="mb-6 rounded-lg bg-red-500 text-white font-medium px-4 py-2 hover:bg-red-600 transition cursor-pointer">
        Paquetes
      </div>
      {openSections['packages'] && (
        <div className="space-y-8">
          <div className="rounded-lg bg-red-100 text-red-800 font-medium px-3 py-1.5 hover:bg-red-200 cursor-pointer flex items-center gap-2">
            <span>{t('common.packages')}</span>
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