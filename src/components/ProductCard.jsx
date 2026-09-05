import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductCard = ({ nameKey, img, priceKey, desc }) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-xl bg-white shadow-sm overflow-hidden flex flex-col h-full">
      <img src={img} alt={t(nameKey)} className="w-full h-48 object-cover" />
      <div className="p-4 flex-1">
        <h3 className="font-bold text-gray-900 line-clamp-2">{t(nameKey)}</h3>
        {priceKey && <div className="mt-2 text-cyan-600 font-medium">{t(priceKey)}</div>}
        {desc && <p className="mt-1 text-sm text-gray-500 line-clamp-2">{t(desc)}</p>}
      </div>
    </div>
  );
};

export default ProductCard;