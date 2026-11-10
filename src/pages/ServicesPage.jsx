import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import WebServiceSection from '../components/webServices/WebServiceSection';

const hasVisibleItems = (section) =>
  (section.subSections ?? []).some((subSection) => (subSection.items ?? []).length > 0);

const WHATSAPP_NUMBER = '573000726521';

const StatusBlock = ({ message }) => (
  <div className="rounded-2xl border border-sky-100 bg-sky-50/60 px-6 py-12 text-center text-gray-600">
    <p className="text-sm">{message}</p>
  </div>
);

const MaintenanceBlock = ({ onRetry }) => {
  const { t } = useTranslation();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t('webServices.maintenance.whatsappMessage'),
  )}`;

  return (
    <div className="rounded-2xl border border-sky-100 bg-sky-50/60 px-6 py-12 text-center text-gray-600">
      <p className="text-lg font-semibold text-gray-800">{t('webServices.maintenance.title')}</p>
      <p className="mt-2 text-sm">{t('webServices.maintenance.description')}</p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
        >
          {t('webServices.maintenance.whatsapp')}
        </a>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            {t('webServices.retry')}
          </button>
        )}
      </div>
    </div>
  );
};

const ServicesPage = ({
  sections = [],
  isLoading = false,
  hasError = false,
  onRetry,
  onSelect,
  onAdd,
  openSections,
  toggleSection,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'es';
  const visibleSections = sections.filter(hasVisibleItems);

  return (
    <>
      <Helmet>
        <title>{t('meta.services.title')}</title>
        <meta name="description" content={t('seo.services.description')} />
        <meta name="keywords" content={t('seo.services.keywords', { returnObjects: true }).join(', ')} />
        <meta property="og:title" content={`${t('meta.services.title')} | BLUCO Travel`} />
        <meta property="og:description" content={t('seo.services.description')} />
        <meta property="og:image" content="https://blucotravel.com/og-services.svg" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-2 space-y-0">
        {isLoading && visibleSections.length === 0 && (
          <StatusBlock message={t('webServices.loading')} />
        )}

        {!isLoading && visibleSections.length === 0 && (
          <MaintenanceBlock onRetry={hasError ? onRetry : undefined} />
        )}

        {visibleSections.map((section) => {
          const key = `section-${section.id}`;

          return (
            <WebServiceSection
              key={section.id}
              section={section}
              lang={lang}
              isOpen={Boolean(openSections[key])}
              onToggle={() => toggleSection(key)}
              openSections={openSections}
              toggleSection={toggleSection}
              onSelect={onSelect}
              onAdd={onAdd}
            />
          );
        })}
      </div>
    </>
  );
};

export default ServicesPage;
