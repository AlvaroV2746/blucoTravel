import { useTranslation } from 'react-i18next';
import { pickLocalizedText } from '../../utils/webServices';
import { hexToRgba, resolveAccent, tintColor } from '../../utils/webServiceTheme';
import WebServiceIcon from './WebServiceIcon';
import WebServiceSubSection from './WebServiceSubSection';

const ARROW_PATH = 'M7.23 7.23l1.84 1.84 4.58 4.58L7.23 20.77z';

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
  const accent = resolveAccent(section.colorTheme);
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
        style={{ backgroundColor: accent }}
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
        <div className="absolute inset-0" style={{ backgroundColor: hexToRgba(accent, 0.2) }} />

        <div className="absolute left-4 top-4 z-10 flex items-center text-white">
          <WebServiceIcon name={section.icon} className="text-2xl" />
          <span className="ml-2 text-sm font-medium">{title}</span>
        </div>

        <svg
          className={`absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 text-white transition-transform duration-500 ${
            isOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d={ARROW_PATH} />
        </svg>
      </button>

      <div
        inert={!isOpen}
        className={`grid transition-all duration-700 ease-in-out ${
          isOpen ? 'mb-6 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div
          className="space-y-3 overflow-hidden rounded-b-2xl rounded-t-none border p-6"
          style={{
            backgroundColor: tintColor(accent, 0.9),
            borderColor: tintColor(accent, 0.72),
          }}
        >
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
                accentColor={accent}
                isOpen={Boolean(openSections[key])}
                onToggle={() => toggleSection(key)}
                onSelect={onSelect}
                onAdd={onAdd}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WebServiceSection;
