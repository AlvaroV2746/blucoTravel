import { useTranslation } from 'react-i18next';
import { pickLocalizedList, pickLocalizedText } from '../../utils/webServices';

const MAX_VISIBLE_CHIPS = 3;

const WebServiceCard = ({ item, activity, lang, onSelect, onAdd }) => {
  const { t } = useTranslation();

  const title = pickLocalizedText(item, 'title', lang);
  const cover = item.images?.[0] ?? '';
  const included = pickLocalizedList(item, 'includedServices', lang);
  const visibleChips = included.slice(0, MAX_VISIBLE_CHIPS);
  const hiddenChipsCount = included.length - visibleChips.length;

  const openDetail = () => onSelect(activity);

  return (
    <article
      onClick={openDetail}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative flex h-32 w-full items-center justify-center overflow-hidden bg-gray-900">
        {cover && (
          <>
            <img
              src={cover}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-xl"
            />
            <img
              src={cover}
              alt={title}
              loading="lazy"
              decoding="async"
              className="pointer-events-none relative z-10 max-h-full max-w-full object-contain drop-shadow-md"
            />
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 p-3">
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-sm font-bold text-gray-900">{title}</h3>

          {visibleChips.length > 0 && (
            <ul className="flex flex-wrap gap-1">
              {visibleChips.map((service) => (
                <li
                  key={service}
                  className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700"
                >
                  {service}
                </li>
              ))}
              {hiddenChipsCount > 0 && (
                <li className="rounded-full border border-gray-200 px-2 py-0.5 text-[11px] text-gray-500">
                  +{hiddenChipsCount}
                </li>
              )}
            </ul>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openDetail();
            }}
            className="flex-1 rounded-lg border border-cyan-300 py-1.5 text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50"
          >
            {t('common.viewMore')}
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onAdd(activity);
            }}
            className="flex-1 rounded-lg bg-cyan-500 py-1.5 text-xs font-bold text-white transition hover:bg-cyan-600"
          >
            {t('common.add')}
          </button>
        </div>
      </div>
    </article>
  );
};

export default WebServiceCard;
