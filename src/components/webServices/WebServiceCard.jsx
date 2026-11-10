import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { pickLocalizedList, pickLocalizedText } from '../../utils/webServices';
import { hexToRgba } from '../../utils/webServiceTheme';

const MAX_VISIBLE_CHIPS = 4;
const DESCRIPTION_TOGGLE_LENGTH = 140;

const WebServiceCard = ({ item, activity, lang, accentColor, onSelect, onAdd }) => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const images = item.images ?? [];
  const title = pickLocalizedText(item, 'title', lang);
  const description = pickLocalizedText(item, 'description', lang);
  const included = pickLocalizedList(item, 'includedServices', lang);
  const visibleChips = included.slice(0, MAX_VISIBLE_CHIPS);
  const hiddenChipsCount = included.length - visibleChips.length;
  const currentImage = images[index] ?? images[0] ?? '';

  const goTo = (position) => {
    const total = images.length;
    setIndex(((position % total) + total) % total);
  };

  const chipStyle = {
    borderColor: hexToRgba(accentColor, 0.35),
    backgroundColor: hexToRgba(accentColor, 0.08),
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden bg-gray-900">
        {currentImage && (
          <>
            <img
              src={currentImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-xl"
            />
            <img
              src={currentImage}
              alt={title}
              loading="lazy"
              decoding="async"
              className="relative z-10 h-full w-full object-contain drop-shadow-md"
            />
          </>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label={t('webServices.previousImage')}
              className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-100 transition hover:bg-black/80 md:opacity-0 md:group-hover:opacity-100"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label={t('webServices.nextImage')}
              className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-100 transition hover:bg-black/80 md:opacity-0 md:group-hover:opacity-100"
            >
              ›
            </button>
            <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {images.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  type="button"
                  onClick={() => goTo(dotIndex)}
                  aria-label={`${dotIndex + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    dotIndex === index ? 'w-5 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>

        {visibleChips.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {visibleChips.map((service) => (
              <li
                key={service}
                className="rounded-full border px-2.5 py-1 text-xs font-medium text-gray-700"
                style={chipStyle}
              >
                {service}
              </li>
            ))}
            {hiddenChipsCount > 0 && (
              <li className="rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-500">
                +{hiddenChipsCount}
              </li>
            )}
          </ul>
        )}

        {description && (
          <div>
            <p
              id={`service-desc-${item.id}`}
              className={`text-sm leading-relaxed text-gray-600 ${isDescriptionOpen ? '' : 'line-clamp-3'}`}
            >
              {description}
            </p>
            {description.length > DESCRIPTION_TOGGLE_LENGTH && (
              <button
                type="button"
                onClick={() => setIsDescriptionOpen((current) => !current)}
                aria-expanded={isDescriptionOpen}
                aria-controls={`service-desc-${item.id}`}
                className="mt-1 text-xs font-semibold text-cyan-700 transition hover:underline"
              >
                {isDescriptionOpen ? t('webServices.showLess') : t('webServices.showMore')}
              </button>
            )}
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-2">
          <button
            type="button"
            onClick={() => onSelect(activity)}
            className="flex-1 rounded-lg border border-cyan-300 py-2 text-sm font-semibold text-cyan-600 transition hover:bg-cyan-50"
          >
            {t('common.viewMore')}
          </button>
          <button
            type="button"
            onClick={() => onAdd(activity)}
            className="flex-1 rounded-lg bg-cyan-500 py-2 text-sm font-bold text-white transition hover:bg-cyan-600"
          >
            {t('common.add')}
          </button>
        </div>
      </div>
    </article>
  );
};

export default WebServiceCard;
