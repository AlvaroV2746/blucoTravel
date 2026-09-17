import { useTranslation } from 'react-i18next';
import { buildSrcSet } from '../utils/images';

const TourCard = ({ id, type, nameKey, img, onSelect, onAdd, priceKey, desc, stats, gallery }) => {
  const { t } = useTranslation();
  const { srcSet, avifSrcSet, sizes } = buildSrcSet(img);

  if (!nameKey) {
    return <div className="rounded-xl bg-white shadow overflow-hidden flex flex-col h-full"> <span>Error: nameKey is required</span> </div>;
  }

  return (
    <div className="group relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white flex flex-col h-full">
      {/* Contenedor de imagen con efecto de fondo difuminado y ajuste completo */}
      <div 
        className="relative w-full h-48 overflow-hidden flex items-center justify-center bg-gray-900 cursor-pointer"
        onClick={() => onSelect({ id, type, name: nameKey, img, desc, stats, gallery })}
      >
        {/* 1. CAPA DE FONDO: Imagen ampliada, con blur y semitransparente para rellenar los espacios */}
        <picture className="absolute inset-0 w-full h-full">
          <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
          <source type="image/webp" srcSet={srcSet} sizes={sizes} />
          <img 
            src={img} 
            alt="" 
            aria-hidden="true"
            className="w-full h-full object-cover filter blur-xl opacity-60 scale-110 pointer-events-none" 
          />
        </picture>

        {/* 2. CAPA PRINCIPAL: Imagen nítida, completa y centrada sin recortes */}
        <picture className="relative z-10 w-full h-full flex items-center justify-center scale-130">
          <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
          <source type="image/webp" srcSet={srcSet} sizes={sizes} />
          <img 
            src={img} 
            alt={t(nameKey)} 
            loading="lazy" 
            decoding="async" 
            className="max-w-full max-h-full object-contain drop-shadow-md" 
          />
        </picture>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-900 line-clamp-2">{t(nameKey)}</h3>
          {priceKey && <div className="mt-2 text-cyan-600 font-medium">{t(priceKey)}</div>}
          {desc && <p className="mt-1 text-sm text-gray-500 line-clamp-2">{t(desc)}</p>}
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={() => onSelect({ id, type, name: nameKey, img, desc, stats })} className="flex-1 text-sm font-semibold text-cyan-600 border border-cyan-300 rounded-lg py-2 hover:bg-cyan-50 transition">
            {t('common.viewMore')}
          </button>
          <button onClick={() => onAdd({ id, type, name: nameKey, img })} className="flex-1 text-sm font-bold text-white bg-cyan-500 rounded-lg py-2 hover:bg-cyan-600 transition">
            {t('common.add')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;