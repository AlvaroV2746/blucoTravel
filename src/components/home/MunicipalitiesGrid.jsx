import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IMAGES } from '../../data/images';
import { getRoute } from '../../utils/routes';
import { MUNICIPALITIES_DATA } from '../../utils/municipalities'; // Datos centralizados obligatorios

const LOGO = IMAGES['bluco-travel-Logo.webp'];

const MunicipalityRow = ({ item, index, isOpen, onToggle, lang }) => {
  const { t } = useTranslation();
  const isEven = index % 2 === 0; // Par: Tarjeta a la izquierda, Panel a la derecha
  
  // Selección directa y limpia del dato curioso según el idioma activo
  const curiosity = lang === 'en' ? (item.curiosityEn || item.curiosity) : item.curiosity;
  const servicesUrl = `${getRoute(lang, 'services')}?municipio=${encodeURIComponent(item.name)}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch py-2">
      {isEven ? (
        <>
          {/* Fila Par: Tarjeta a la Izquierda (Al frente de todo con z-30) */}
          <div 
            onClick={onToggle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggle(); }}
            aria-expanded={isOpen}
            className="relative h-64 md:h-72 w-full cursor-pointer transition rounded-2xl shadow-md hover:shadow-lg group z-30"
          >
            {/* Pestaña estática en capa intermedia (z-20) con desvanecimiento de 1 segundo */}
            <div
              className={`absolute top-[15%] h-[70%] z-20 hidden bg-cyan-500 py-3 text-[10px] font-bold text-white shadow-md md:flex flex-col items-center justify-center leading-none tracking-widest right-0 translate-x-[50%] group-hover:translate-x-full rounded-r-md transition-all duration-1000 ${
                isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
              }`}
              style={{ width: '22px' }}
            >
              {t('home.destinations.didYouKnow')
                .toLowerCase()
                .split('')
                .map((char, i) => (
                  <span key={i} className="block my-[1px]">{char === ' ' ? '\u00A0' : char}</span>
                ))}
            </div>

            {/* Tarjeta principal al FRENTE */}
            <div className="relative z-30 h-full w-full overflow-hidden rounded-2xl bg-blue-950">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-950">
                  <img src={LOGO} alt="BLUCO Travel" className="h-24 w-auto object-contain" />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4">
                <h3 className="text-xl font-bold text-white drop-shadow">{item.name}</h3>
              </div>
            </div>

            {/* Botón Mobile */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
              aria-expanded={false}
              className={`mt-2 w-full rounded-xl bg-cyan-500 py-2 text-sm font-bold text-white transition-all duration-1000 hover:bg-cyan-600 md:hidden ${
                isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              {t('home.destinations.didYouKnow')}
            </button>
          </div>

          {/* Panel Emergente Derecho (Atrás de todo en la capa z-10) */}
          <div className="relative h-64 md:h-72 w-full hidden md:block">
            <div 
              className={`absolute top-[5%] h-[90%] w-full bg-slate-100 p-6 shadow-xl rounded-r-2xl rounded-l-none flex flex-col justify-between transition-all duration-1000 ease-in-out ${
                isOpen 
                  ? 'opacity-100 translate-x-0 z-10 pointer-events-auto' 
                  : 'opacity-0 -translate-x-full z-[-10] pointer-events-none'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm font-bold uppercase tracking-wide text-cyan-600">
                    {t('home.destinations.didYouKnow')}
                  </h4>
                  <button
                    type="button"
                    onClick={onToggle}
                    aria-label={t('home.destinations.close')}
                    className="rounded-md px-2 text-lg leading-none text-gray-500 hover:text-gray-800"
                  >
                    ×
                  </button>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">{curiosity}</p>
              </div>
              <Link
                to={servicesUrl}
                className="mt-4 inline-block text-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-600"
              >
                {t('home.destinations.viewMore')}
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Fila Impar: Panel a la Izquierda (Atrás de todo en la capa z-10) */}
          <div className="relative h-64 md:h-72 w-full hidden md:block">
            <div 
              className={`absolute top-[5%] h-[90%] w-full bg-slate-100 p-6 shadow-xl rounded-l-2xl rounded-r-none flex flex-col justify-between transition-all duration-1000 ease-in-out ${
                isOpen 
                  ? 'opacity-100 translate-x-0 z-10 pointer-events-auto' 
                  : 'opacity-0 translate-x-full z-[-10] pointer-events-none'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm font-bold uppercase tracking-wide text-cyan-600">
                    {t('home.destinations.didYouKnow')}
                  </h4>
                  <button
                    type="button"
                    onClick={onToggle}
                    aria-label={t('home.destinations.close')}
                    className="rounded-md px-2 text-lg leading-none text-gray-500 hover:text-gray-800"
                  >
                    ×
                  </button>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">{curiosity}</p>
              </div>
              <Link
                to={servicesUrl}
                className="mt-4 inline-block text-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-600"
              >
                {t('home.destinations.viewMore')}
              </Link>
            </div>
          </div>

          {/* Tarjeta a la Derecha (Al frente de todo con z-30) */}
          <div 
            onClick={onToggle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggle(); }}
            aria-expanded={isOpen}
            className="relative h-64 md:h-72 w-full cursor-pointer transition rounded-2xl shadow-md hover:shadow-lg group z-30"
          >
            {/* Pestaña estática en capa intermedia (z-20) con desvanecimiento de 1 segundo */}
            <div
              className={`absolute top-[15%] h-[70%] z-20 hidden bg-cyan-500 py-3 text-[10px] font-bold text-white shadow-md md:flex flex-col items-center justify-center leading-none tracking-widest left-0 -translate-x-[50%] group-hover:-translate-x-full rounded-l-md transition-all duration-1000 ${
                isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
              }`}
              style={{ width: '22px' }}
            >
              {t('home.destinations.didYouKnow')
                .toLowerCase()
                .split('')
                .map((char, i) => (
                  <span key={i} className="block my-[1px]">{char === ' ' ? '\u00A0' : char}</span>
                ))}
            </div>

            {/* Tarjeta principal al FRENTE */}
            <div className="relative z-30 h-full w-full overflow-hidden rounded-2xl bg-blue-950">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-950">
                  <img src={LOGO} alt="BLUCO Travel" className="h-24 w-auto object-contain" />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4">
                <h3 className="text-xl font-bold text-white drop-shadow">{item.name}</h3>
              </div>
            </div>

            {/* Botón Mobile */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
              aria-expanded={false}
              className={`mt-2 w-full rounded-xl bg-cyan-500 py-2 text-sm font-bold text-white transition-all duration-1000 hover:bg-cyan-600 md:hidden ${
                isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              {t('home.destinations.didYouKnow')}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const MunicipalitiesGrid = () => {
  const { i18n } = useTranslation();
  const [openId, setOpenId] = useState(null);
  const lang = i18n.language?.startsWith('en') ? 'en' : 'es';

  // Forzamos el uso exclusivo de los datos centralizados (Medellín y Guatapé)
  const dataToRender = MUNICIPALITIES_DATA;

  if (!dataToRender || dataToRender.length === 0) return null;

  return (
    <div className="flex flex-col gap-8">
      {dataToRender.map((item, index) => (
        <MunicipalityRow
          key={item.id}
          item={item}
          index={index}
          isOpen={openId === item.id}
          onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
          lang={lang}
        />
      ))}
    </div>
  );
};

export default MunicipalitiesGrid;