import { useTranslation } from 'react-i18next';
import { pickLocalizedList, pickLocalizedText } from '../../utils/webServices';

const WebServiceCard = ({
  item,
  activity,
  lang,
  onSelect,
  onAdd,
  showActions = true,
  showDescription = false,
}) => {
  const { t } = useTranslation();

  const title = pickLocalizedText(item, 'title', lang);
  const cover = item.images?.[0] ?? '';
  const included = pickLocalizedList(item, 'includedServices', lang);
  const description = showDescription ? pickLocalizedText(item, 'description', lang) : '';

  const openDetail = () => onSelect(activity);

  return (
    <article
      onClick={openDetail}
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg ${
        showDescription ? 'h-[22rem]' : 'h-[18rem]'
      }`}
    >
      <div
        className={`relative flex w-full shrink-0 items-center justify-center overflow-hidden bg-gray-900 ${
          showDescription ? 'aspect-[2/1]' : 'h-32'
        }`}
      >
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

      <div className="flex min-h-0 flex-1 flex-col justify-between gap-3 p-3">
        <div className="min-h-0 space-y-2">
          <h3 className="line-clamp-2 text-sm font-bold text-gray-900">{title}</h3>

          {included.length > 0 && (
            <p className="line-clamp-2 text-xs text-gray-600">{included.join(' · ')}</p>
          )}

          {description && (
            <p className="line-clamp-3 text-xs leading-relaxed text-gray-500">{description}</p>
          )}
        </div>

        {showActions && (
          <div className="flex shrink-0 gap-2">
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
        )}
      </div>
    </article>
  );
};

export default WebServiceCard;
