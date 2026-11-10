import { useTranslation } from 'react-i18next';
import { pickLocalizedText, toWebServiceActivity } from '../../utils/webServices';
import { hexToRgba } from '../../utils/webServiceTheme';
import WebServiceCard from './WebServiceCard';

const WebServiceSubSection = ({
  subSection,
  lang,
  sectionTitle,
  accentColor,
  isOpen,
  onToggle,
  onSelect,
  onAdd,
}) => {
  const { t } = useTranslation();
  const items = subSection.items ?? [];

  if (items.length === 0) return null;

  const title = pickLocalizedText(subSection, 'title', lang);
  const contentId = `subsection-content-${subSection.id}`;

  return (
    <div
      className="overflow-hidden rounded-xl border bg-white/80"
      style={{ borderColor: hexToRgba(accentColor, 0.3) }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-white"
      >
        <span className="font-semibold text-gray-900">{title}</span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
            {t('webServices.count', { count: items.length })}
          </span>
          <svg
            className={`h-4 w-4 text-gray-500 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
          </svg>
        </span>
      </button>

      <div
        id={contentId}
        inert={!isOpen}
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2">
            {items.map((item) => (
              <WebServiceCard
                key={item.id}
                item={item}
                activity={toWebServiceActivity(item, lang, sectionTitle)}
                lang={lang}
                accentColor={accentColor}
                onSelect={onSelect}
                onAdd={onAdd}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebServiceSubSection;
