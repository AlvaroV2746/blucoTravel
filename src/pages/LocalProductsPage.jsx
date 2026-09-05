import React from 'react';
import { useTranslation } from 'react-i18next';
import { LOCAL_PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

const LocalProductsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('products.title')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {LOCAL_PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            nameKey={product.name}
            img={product.img}
            priceKey={product.price}
            desc={product.desc}
          />
        ))}
      </div>
    </div>
  );
};

export default LocalProductsPage;