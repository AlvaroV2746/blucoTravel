import { useTranslation } from 'react-i18next';
import { pickLocalizedText } from '../../utils/webServices';
import { hasThemeColor, hexToRgba } from '../../utils/webServiceTheme';
import WebServiceIcon from './WebServiceIcon';
import WebServiceSubSection from './WebServiceSubSection';

const WebServiceSection = ({
  section,
  lang,
  isOpen,
  onToggle,
  openSections,
  toggleSection,
  onSelect,
  onAdd,
}) => {
  const { t } = useTranslation();

  const title = pickLocalizedText(section, 'title', lang);
  const accent = hasThemeColor(section.colorTheme) ? section.colorTheme : null;
  const overlayColor = accent ? hexToRgba(accent, 0.45) : 'rgba(15, 23, 42, 0.45)';
  const subSections = (section.subSections ?? []).filter(
    (subSection) => (subSection.items ?? []).length > 0,
  );

  return (
    <section>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`relative block h-40 w-full cursor-pointer overflow-hidden text-left shadow-md transition-all duration-300 hover:shadow-xl ${
          isOpen ? 'rounded-b-none rounded-t-2xl' : 'rounded-2xl'
        }`}
        style={{ backgroundColor: accent ?? '#0f172a' }}
      >
        {section.bannerUrl && (
          <img
            src={section.bannerUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0" style={{ backgroundColor: overlayColor }} />

        <div className="absolute left-4 top-4 z-10 flex items-center gap-3 text-white">
          <WebServiceIcon name={section.icon} className="text-2xl" />
          <span className="text-lg font-semibold drop-shadow">{title}</span>
        </div>

        <svg
          className={`absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 text-white transition-transform duration-500 ${
            isOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
        </svg>
      </button>

      <div
        inert={!isOpen}
        className={`grid transition-all duration-700 ease-in-out ${
          isOpen ? 'mb-6 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div
          className="overflow-hidden rounded-b-2xl border border-t-0 p-6"
          style={{
            backgroundColor: accent ? hexToRgba(accent, 0.06) : '#f8fafc',
            borderColor: accent ? hexToRgba(accent, 0.3) : '#e2e8f0',
          }}
        >
          <div className="space-y-4">
            {subSections.length === 0 && (
              <p className="text-sm text-gray-500">{t('webServices.emptySection')}</p>
            )}

            {subSections.map((subSection) => {
              const key = `subsection-${subSection.id}`;

              return (
                <WebServiceSubSection
                  key={subSection.id}
                  subSection={subSection}
                  lang={lang}
                  sectionTitle={title}
                  accentColor={accent ?? '#64748b'}
                  isOpen={Boolean(openSections[key])}
                  onToggle={() => toggleSection(key)}
                  onSelect={onSelect}
                  onAdd={onAdd}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebServiceSection;
