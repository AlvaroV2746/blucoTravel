import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SearchBar from '../components/SearchBar';
import TourCard from '../components/TourCard';
import { searchCatalogAll, CATEGORY_KEYS } from '../data/searchCatalog';
// (getRoute removido — sin uso)
import { identifierOf } from '../data/searchCatalog';
// (toLocalizedPath removido — sin uso)

const SearchResultsPage = ({ onSelect, onAdd }) => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const q = (searchParams.get('q') ?? '').trim();
  const results = searchCatalogAll(i18n, q);

  const groups = ['activity', 'accommodation', 'package', 'product'].map(
    (category) => ({
      category,
      label: t(CATEGORY_KEYS[category]),
      items: results.filter((item) => item.category === category),
    })
  ).filter((group) => group.items.length > 0);

  const metaTitle = q
    ? t('search.metaTitle', { query: q })
    : t('search.title');

  return (
    <>
      <Helmet>
        <title>{metaTitle} | BLUCO Travel</title>
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <div className="space-y-8">
        <header className="pt-2">
          <h1 className="text-2xl font-bold text-blue-900 uppercase">{t('search.title')}</h1>
          {q && (
            <p className="mt-2 text-gray-600">
              {t('search.results', { count: results.length, query: q })}
            </p>
          )}
        </header>

        <SearchBar className="max-w-2xl" />

        {groups.length === 0 && q && (
          <div className="text-center py-16 space-y-4">
            <p className="text-5xl">ðŸ”</p>
            <p className="text-xl text-gray-700 font-medium">
              {t('search.noResults', { query: q })}
            </p>
            <p className="text-sm text-gray-500">{t('search.tryAnother')}</p>
          </div>
        )}

        {groups.map((group) => (
          <section key={group.category}>
            <h2 className="text-lg font-semibold text-cyan-700 mb-4 uppercase tracking-wide">
              {group.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {group.items.map((item) => (
                item.category === 'product' ? (
                  <article
                    key={identifierOf(item)}
                    className="rounded-2xl overflow-hidden bg-white shadow border border-gray-100 flex flex-col"
                  >
                    <img src={item.img} alt={t(item.nameKey)} loading="lazy" decoding="async" className="w-full h-48 object-cover" />
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900">{t(item.nameKey)}</h3>
                      {item.priceKey && (
                        <p className="mt-2 text-cyan-600 font-medium">{t(item.priceKey)}</p>
                      )}
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{t(item.descKey)}</p>
                    </div>
                  </article>
                ) : (
                  <TourCard
                    key={identifierOf(item)}
                    id={item.id}
                    type={item.type}
                    nameKey={item.nameKey}
                    img={item.img}
                    gallery={item.gallery}
                    desc={item.descKey}
                    stats={item.statsKey}
                    onSelect={() => onSelect({ ...item })}
                    onAdd={() => onAdd(item)}
                  />
                )
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default SearchResultsPage;
