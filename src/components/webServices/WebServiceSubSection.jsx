import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { pickLocalizedText, toWebServiceActivity } from '../../utils/webServices';
import { shadeColor, tintColor } from '../../utils/webServiceTheme';
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
  const items = subSection.items ?? [];

  if (items.length === 0) return null;

  const title = pickLocalizedText(subSection, 'title', lang);
  const contentId = `subsection-content-${subSection.id}`;
  const textColor = shadeColor(accentColor, 0.35);

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className={`flex w-fit cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 font-medium transition-all duration-300 hover:brightness-95 ${
          isOpen ? 'md:px-[135px]' : 'md:px-[30px]'
        }`}
        style={{
          backgroundColor: tintColor(accentColor, 0.8),
          color: textColor,
        }}
      >
        <span className="flex text-sm" style={{ color: accentColor }}>
          <FontAwesomeIcon icon={faLeaf} />
        </span>
        <span>{title}</span>
        <span className="ml-2 text-xs font-bold" style={{ color: textColor }}>
          {items.length}
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
          <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <WebServiceCard
                key={item.id}
                item={item}
                activity={toWebServiceActivity(item, lang, sectionTitle)}
                lang={lang}
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
