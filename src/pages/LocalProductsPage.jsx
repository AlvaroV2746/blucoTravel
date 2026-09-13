import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { LOCAL_PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import SchemaOrg from '../components/SchemaOrg';
import { generateProduct, BASE_URL } from '../utils/schemas';
import { getRoute } from '../utils/routes';

const LocalProductsPage = () => {
  const { t, i18n } = useTranslation();

  const productSchemas = LOCAL_PRODUCTS.map((product) =>
    generateProduct({
      name: t(product.name),
      description: t(product.desc),
      image: `${BASE_URL}/og-products.svg`,
      url: `${BASE_URL}${getRoute(i18n.language, 'products')}`,
      price: product.priceValue,
    })
  );

  return (
    <>
      <Helmet>
        <title>{t('meta.products.title')} | BLUCO Travel</title>
        <meta name="description" content={t('seo.products.description')} />
        <meta property="og:title" content="Productos Artesanales - BLUCO Travel Colombia" />
        <meta property="og:description" content={t('seo.products.description')} />
        <meta property="og:image" content="https://blucotravel.com/og-products.svg" />
        <meta name="twitter:title" content="Productos Artesanales - BLUCO Travel Colombia" />
        <meta name="twitter:description" content={t('seo.products.description')} />
        <meta name="twitter:image" content="https://blucotravel.com/og-products.svg" />
      </Helmet>
      <SchemaOrg schema={productSchemas} />
      <div className="max-w-7xl mx-auto py-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-4  border-b-2 border-cyan-500">
          {t('products.title')}
        </h2>
        <p className="text-lg text-gray-500 mb-6">{t('localProducts.lead')}</p>
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
    </>
  );
};

export default LocalProductsPage;