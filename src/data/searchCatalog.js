import { guatapeAcommodations, guatapeServices, sanRafaAcommodations, sanRafaServices, sanCrisServices, packages } from './tours';
import { LOCAL_PRODUCTS } from './products';
import i18n from '../i18n';

export const CATEGORY_KEYS = {
  activity: 'search.categories.activities',
  accommodation: 'search.categories.accommodation',
  package: 'search.categories.packages',
  product: 'search.categories.products',
};

const withMeta = (items, category) =>
  items.map((item) => ({
    ...item,
    category,
    type: item.type ?? category,
    nameKey: item.name,
    descKey: item.desc,
    statsKey: item.stats,
    priceKey: item.price,
  }));

export const SEARCH_CATALOG = [
  ...withMeta(guatapeServices, 'activity'),
  ...withMeta(sanRafaServices, 'activity'),
  ...withMeta(sanCrisServices, 'activity'),
  ...withMeta(guatapeAcommodations, 'accommodation'),
  ...withMeta(sanRafaAcommodations, 'accommodation'),
  ...withMeta(packages, 'package'),
  ...withMeta(LOCAL_PRODUCTS, 'product'),
];

const territoryForString = (type) => {
  if (type.startsWith('sanrafael')) return 'san rafael';
  if (type.startsWith('sancristobal')) return 'san cristobal';
  return 'guatape guatapé';
};

// Pre-calculamos los textos de búsqueda una sola vez al iniciar la app
const CATALOG_WITH_SEARCH_TEXTS = SEARCH_CATALOG.map((item) => {
  const nameEs = i18n.exists(item.nameKey, { lng: 'es' }) ? i18n.t(item.nameKey, { lng: 'es' }) : '';
  const descEs = i18n.exists(item.descKey, { lng: 'es' }) ? i18n.t(item.descKey, { lng: 'es' }) : '';
  const nameEn = i18n.exists(item.nameKey, { lng: 'en' }) ? i18n.t(item.nameKey, { lng: 'en' }) : '';
  const descEn = i18n.exists(item.descKey, { lng: 'en' }) ? i18n.t(item.descKey, { lng: 'en' }) : '';
  const territory = territoryForString(item.type);

  return {
    ...item,
    searchEs: `${nameEs} ${descEs} ${territory}`.toLowerCase(),
    searchEn: `${nameEn} ${descEn} ${territory}`.toLowerCase(),
  };
});

export const searchCatalog = (currentLang, query, limit = 8) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const isEs = currentLang === 'es';
  const results = [];

  for (let i = 0; i < CATALOG_WITH_SEARCH_TEXTS.length; i++) {
    const item = CATALOG_WITH_SEARCH_TEXTS[i];
    const text = isEs ? item.searchEs : item.searchEn;
    if (text.includes(q)) {
      results.push(item);
      if (results.length >= limit) break;
    }
  }
  return results;
};

export const searchCatalogAll = (currentLang, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const isEs = currentLang === 'es';

  return CATALOG_WITH_SEARCH_TEXTS.filter((item) => {
    const text = isEs ? item.searchEs : item.searchEn;
    return text.includes(q);
  });
};

export const resolveCatalogItem = (type, id) =>
  SEARCH_CATALOG.find((item) => item.type === type && item.id === Number(id)) ?? null;

export const identifierOf = (item) => `${item.type}:${item.id}`;