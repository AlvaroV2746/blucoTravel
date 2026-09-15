import { useTranslation } from 'react-i18next';
import { buildSrcSet } from '../utils/images';

const TourCard = ({ id, type, nameKey, img, onSelect, onAdd, priceKey, desc, stats, gallery }) => {
  const { t } = useTranslation();
  const { srcSet, avifSrcSet, sizes } = buildSrcSet(img);

  if (!nameKey) {
    return <div className="rounded-xl bg-white shadow overflow-hidden flex flex-col h-full"> <span>Error: nameKey is required</span> </div>;
  }

  return (
    <div className="group relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <picture onClick={() => onSelect({ id, type, name: nameKey, img, desc, stats, gallery })}>
        <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
        <source type="image/webp" srcSet={srcSet} sizes={sizes} />
        <img 
          src={img} 
          alt={t(nameKey)} 
          loading="lazy" 
          decoding="async" 
          className="w-full h-48 object-cover cursor-pointer" 
        />
      </picture>
      <div className="p-4 flex-1">
        <h3 className="font-bold text-gray-900 line-clamp-2">{t(nameKey)}</h3>
        {priceKey && <div className="mt-2 text-cyan-600 font-medium">{t(priceKey)}</div>}
        {desc && <p className="mt-1 text-sm text-gray-500 line-clamp-2">{t(desc)}</p>}
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