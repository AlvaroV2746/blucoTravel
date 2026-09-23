import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { searchCatalogAll, CATEGORY_KEYS } from '../data/searchCatalog';
import TourCard from '../components/TourCard';

const SearchResultsPage = ({ onSelect, onAdd }) => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const q = (searchParams.get('q') ?? '').trim();
  const results = searchCatalogAll(i18n, q);

  const groups = ['activity', 'accommodation', 'package', 'product']
    .map((category) => ({
      category,
      label: t(CATEGORY_KEYS[category]),
      items: results.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <Helmet>
        <title>{t('search.metaTitle', { query: q })} | BLUCO Travel</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-2 space-y-8">
        <header className="pt-4">
          <h1 className="text-3xl font-black text-blue-900 uppercase">{t('search.title')}</h1>
          {q && (
            <p className="mt-2 text-gray-600">{t('search.results', { count: results.length, query: q })}</p>
          )}
        </header>

        {groups.map((group) => (
          <section key={group.category} aria-label={group.label}>
            <h2 className="font-bold text-cyan-600 uppercase tracking-wide mb-4">{group.label}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((item) => (
                item.category === 'product' ? (
                  <article
                    key={`${item.type}-${item.id}`}
                    className="rounded-2xl overflow-hidden bg-white shadow border border-gray-100 flex flex-col"
                  >
                    <img src={item.img} alt={t(item.nameKey)} className="w-full h-48 object-cover" />
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900">{t(item.nameKey)}</h3>
                      {item.priceKey && <div className="mt-2 text-cyan-600 font-medium">{t(item.priceKey)}</div>}
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{t(item.descKey)}</p>
                    </div>
                  </article>
                ) : (
                  <TourCard
                    key={`${item.type}-${item.id}`}
                    id={item.id}
                    type={item.type}
                    nameKey={item.nameKey}
                    img={item.img}
                    gallery={item.gallery}
                    desc={item.descKey}
                    stats={item.statsKey}
                    onSelect={onSelect}
                    onAdd={onAdd}
                  />
                )
              ))}
            </div>
          </section>
        ))}

        {q && results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600">{t('search.noResults', { query: q })}</p>
            <p className="mt-2 text-sm text-gray-500">{t('search.tryAnother')}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResultsPage;