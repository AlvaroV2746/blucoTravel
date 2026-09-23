export const ROUTE_SEGMENTS = {
  es: {
    home: '/',
    services: '/servicios',
    about: '/nosotros',
    contact: '/contacto',
    products: '/productos',
    search: '/buscar',
  },
  en: {
    home: '/',
    services: '/services',
    about: '/about',
    contact: '/contact',
    products: '/products',
    search: '/search',
  },
};
const ALL_MAPS = [ROUTE_SEGMENTS.es, ROUTE_SEGMENTS.en];

export const getRoute = (lang, key) =>
  ROUTE_SEGMENTS[lang]?.[key] || ROUTE_SEGMENTS.es[key];

export const resolveKey = (pathname) => {
  for (const map of ALL_MAPS) {
    const entry = Object.entries(map).find(([, path]) => path === pathname);
    if (entry) return entry[0];
  }
  return 'home';
};

export const toLocalizedPath = (pathname, lang) => {
  if (pathname === '' || pathname === '/') return '/';
  const key = resolveKey(pathname);
  if (key === 'home') return pathname;
  return getRoute(lang, key) ?? pathname;
};