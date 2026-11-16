import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import MunicipalitiesGrid from '../components/home/MunicipalitiesGrid';

const DestinationsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('meta.destinations.title')}</title>
      </Helmet>
      <section>
        <h2 className="mb-8 text-center text-2xl font-bold text-blue-900 md:text-3xl">
          {t('home.destinations.title')}
        </h2>
        <MunicipalitiesGrid />
      </section>
    </>
  );
};

export default DestinationsPage;
