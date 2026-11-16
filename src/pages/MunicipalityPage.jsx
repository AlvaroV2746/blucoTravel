import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import WebServiceCard from '../components/webServices/WebServiceCard';
import ActivityDetailView from '../components/ActivityDetailView';
import { useMunicipalities } from '../hooks/usePublicInventory';
import { toMunicipalitySlug } from '../utils/municipalities';
import { isLodgingItem, pickLocalizedText, toWebServiceActivity } from '../utils/webServices';

const MunicipalityPage = ({ services, onSelect, onAdd, selectedActivity }) => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const { data: municipalities, isLoading } = useMunicipalities();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'es';

  const municipality = municipalities.find(
    (item) => toMunicipalitySlug(item.nameEn || item.name) === slug,
  );

  const section = municipality
    ? services.sections.find((entry) => entry.id === municipality.id)
    : null;

  const name = municipality ? pickLocalizedText(municipality, 'name', lang) : '';
  const description = municipality ? pickLocalizedText(municipality, 'description', lang) : '';
  const sectionTitle = section ? pickLocalizedText(section, 'title', lang) : '';
  const items = (section?.subSections ?? []).flatMap((subSection) => subSection.items ?? []);
  const activities = items.filter((item) => !isLodgingItem(item));
  const lodgings = items.filter(isLodgingItem);

  if (!municipality) {
    if (isLoading) return null;
    return (
      <div className="rounded-2xl bg-slate-100 px-6 py-12 text-center text-gray-600">
        <p>{t('municipality.noServices')}</p>
      </div>
    );
  }

  const renderGroup = (title, list, emptyText) => (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-900 md:text-3xl">{title}</h2>
      {list.length === 0 ? (
        <p className="text-sm text-gray-500">{emptyText}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item) => (
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
      )}
    </section>
  );

  return (
    <>
      <Helmet>
        <title>{name}</title>
        {description && (
          <meta name="description" content={description.slice(0, 160)} />
        )}
      </Helmet>

      <article className="space-y-10">
        <header className="relative overflow-hidden rounded-2xl bg-blue-900">
          {municipality.imageUrl && (
            <img
              src={municipality.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/60 to-blue-950/30" />
          <div className="relative space-y-4 px-6 py-16 text-white md:px-12 md:py-24">
            <h1 className="text-3xl font-extrabold md:text-5xl">{name}</h1>
            {description && (
              <p className="max-w-3xl whitespace-pre-line leading-relaxed text-white/90">
                {description}
              </p>
            )}
          </div>
        </header>

        <h2 className="text-2xl font-bold text-blue-900 md:text-3xl">
          {t('municipality.servicesIn', { name })}
        </h2>

        {renderGroup(
          t('municipality.activities'),
          activities,
          t('municipality.emptyActivities'),
        )}

        {renderGroup(
          t('municipality.lodging'),
          lodgings,
          t('municipality.emptyLodging'),
        )}
      </article>

      {selectedActivity && (
        <ActivityDetailView
          activity={selectedActivity}
          onBack={() => onSelect(null)}
          onAdd={onAdd}
        />
      )}
    </>
  );
};

export default MunicipalityPage;
