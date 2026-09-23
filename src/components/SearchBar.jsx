import { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { getRoute } from '../utils/routes';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { searchCatalog, CATEGORY_KEYS, identifierOf, resolveCatalogItem } from '../data/searchCatalog';

const SearchBar = ({ className = '', onCloseMenu }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  
  // Aumentamos a 400ms para evitar ejecuciones innecesarias mientras se escribe rÃ¡pido
  const debouncedQuery = useDebouncedValue(query, 400);

  const results = useMemo(() => {
    return searchCatalog(i18n.language, debouncedQuery);
  }, [i18n.language, debouncedQuery]);

  const normalizedResults = useMemo(() => {
    return results.map((item) => ({
      ...item,
      label: t(item.nameKey),
      badge: t(CATEGORY_KEYS[item.category]),
    }));
  }, [results, t]);

  const servicesPath = getRoute(i18n.language, 'services');
  const searchPath = getRoute(i18n.language, 'search');
  const effectiveActiveIndex = activeIndex >= 0 && activeIndex < normalizedResults.length ? activeIndex : -1;


  useEffect(() => {
    const onPointerDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const goToDetail = (item) => {
    setOpen(false);
    setQuery('');
    onCloseMenu?.();
    if (item.category !== 'product' && resolveCatalogItem(item.type, item.id)) {
      navigate(`${servicesPath}?item=${identifierOf(item)}`);
    } else {
      navigate(`${searchPath}?q=${encodeURIComponent(t(item.nameKey))}`);
    }
  };

  const goToResults = (term) => {
    setOpen(false);
    onCloseMenu?.();
    navigate(`${searchPath}?q=${encodeURIComponent(term.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((prev) => (prev + 1) % Math.max(normalizedResults.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? normalizedResults.length - 1 : prev - 1));
    } else if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (effectiveActiveIndex >= 0 && normalizedResults[effectiveActiveIndex]) {
        goToDetail(normalizedResults[effectiveActiveIndex]);
      } else if (query.trim()) {
        goToResults(query);
      }
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300/70 text-sm pointer-events-none"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t('search.placeholder')}
          aria-label={t('search.searchLabel')}
          aria-expanded={open}
          aria-autocomplete="list"
          className="w-full rounded-full bg-blue-950/40 border border-cyan-400/30 text-white placeholder-cyan-200/60 pl-10 pr-4 py-2 text-sm outline-none focus:border-cyan-400 focus:bg-blue-950/70 transition-colors"
        />
      </div>

      {open && debouncedQuery.trim() && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 max-h-96 overflow-y-auto rounded-xl bg-white shadow-2xl border border-cyan-100 z-50 py-2"
        >
          {normalizedResults.length === 0 && (
            <li className="px-4 py-3 text-sm text-gray-500">{t('search.noResultsInline')}</li>
          )}
          {normalizedResults.map((item, index) => (
            <li key={`${item.type}-${item.id}`}>
              <button
                role="option"
                aria-selected={index === effectiveActiveIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => goToDetail(item)}
                className={`w-full text-left px-4 py-3 flex flex-col transition-colors cursor-pointer ${
                  index === effectiveActiveIndex ? 'bg-cyan-50' : 'hover:bg-cyan-50'
                }`}
              >
                <span className="block truncate text-sm font-medium text-gray-900">{item.label}</span>
                <span className="block text-xs text-cyan-600 mt-0.5">{item.badge}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;