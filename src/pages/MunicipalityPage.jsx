import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import WebServiceCard from '../components/webServices/WebServiceCard';
import ActivityDetailView from '../components/ActivityDetailView';
import { useMunicipalities } from '../hooks/usePublicInventory';
import { toMunicipalitySlug } from '../utils/municipalities';
import { pickLocalizedText, toWebServiceActivity } from '../utils/webServices';

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
  const subSections = (section?.subSections ?? []).filter(
    (subSection) => (subSection.items ?? []).length > 0,
  );

  if (!municipality) {
    if (isLoading) return null;
    return (
      <div className="rounded-2xl bg-slate-100 px-6 py-12 text-center text-gray-600">
        <p>{t('municipality.noServices')}</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{name}</title>
        {description && (
          <meta name="description" content={description.slice(0, 160)} />
        )}
      </Helmet>

      <article className="space-y-10">
        <header className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-blue-900">
          <div className="relative aspect-video w-full">
            {municipality.imageUrl && (
              <img
                src={municipality.imageUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-end px-6 pb-10 text-white [text-shadow:0_2px_10px_rgb(0_0_0/0.8)] md:px-12 md:pb-16">
              <h1 className="text-3xl font-extrabold md:text-5xl">{name}</h1>
            </div>
          </div>
        </header>

        {description && (
          <p className="mx-auto max-w-3xl whitespace-pre-line text-center leading-relaxed text-blue-950">
            {description}
          </p>
        )}

        <h2 className="text-2xl font-bold text-blue-900 md:text-3xl">
          {t('municipality.servicesIn', { name })}
        </h2>

        {subSections.length === 0 && (
          <p className="text-sm text-gray-500">{t('municipality.noServices')}</p>
        )}

        {subSections.map((subSection) => (
          <section key={subSection.id} className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-900 md:text-3xl">
              {pickLocalizedText(subSection, 'title', lang)}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {subSection.items.map((item) => (
                <WebServiceCard
                  key={item.id}
                  item={item}
                  activity={toWebServiceActivity(item, lang, sectionTitle)}
                  lang={lang}
                  onSelect={onSelect}
                  onAdd={onAdd}
                  showActions={false}
                  showDescription
                />
              ))}
            </div>
          </section>
        ))}
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
