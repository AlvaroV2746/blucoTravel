import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductCard = ({ nameKey, img, priceKey, desc }) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-xl bg-white shadow overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <img src={img} alt={t(nameKey)} className="w-full h-48 object-cover" />
      <div className="p-4 flex-1">
        <h3 className="font-bold text-gray-900 line-clamp-2">{t(nameKey)}</h3>
        {priceKey && (
          <div className="mt-2 flex items-center">
            <span className="text-cyan-600 font-medium mr-2">{t(priceKey)}</span>
            <span className="text-xs text-cyan-400">COP</span>
          </div>
        )}
        {desc && <p className="mt-1 text-sm text-gray-500 line-clamp-3">{t(desc)}</p>}
      </div>
    </div>
  );
};

export default ProductCard;