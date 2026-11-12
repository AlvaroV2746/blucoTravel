import { useTranslation } from 'react-i18next';

const AgencyExperience = () => {
  const { t } = useTranslation();

  return (
    <section>
      <h2 className="mb-6 text-center text-2xl font-bold text-blue-900 md:text-3xl">
        {t('home.agency.title')}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex min-h-48 items-center rounded-2xl bg-blue-950 p-8 shadow-md">
          <p className="text-xl font-semibold leading-relaxed text-white md:text-2xl">
            {t('home.agency.experience')}
          </p>
        </div>
        <div className="flex min-h-48 items-center rounded-2xl bg-cyan-500 p-8 shadow-md">
          <p className="text-xl font-semibold leading-relaxed text-white md:text-2xl">
            {t('home.agency.support')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AgencyExperience;
