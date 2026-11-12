import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import HeroCarousel from '../components/HeroCarousel';
import ContactForm from '../components/ContactForm';
import MunicipalitiesGrid from '../components/home/MunicipalitiesGrid';
import FeaturedPackages from '../components/home/FeaturedPackages';
import AgencyExperience from '../components/home/AgencyExperience';
import { useHeroSlides } from '../hooks/useHeroSlides';
import { useFeaturedPackages, useMunicipalities } from '../hooks/usePublicInventory';

const HomePage = () => {
  const { t } = useTranslation();
  const heroSlides = useHeroSlides();
  const { data: municipalities } = useMunicipalities();
  const { data: featuredPackages } = useFeaturedPackages();

  return (
    <>
      <Helmet>
        <title>{t('meta.home.title')}</title>
        <meta name="description" content={t('seo.home.description')} />
        <meta name="keywords" content={t('seo.home.keywords', { returnObjects: true }).join(', ')} />
        <meta property="og:title" content={`${t('meta.home.title')} | BLUCO Travel`} />
        <meta property="og:description" content={t('seo.home.description')} />
        <meta property="og:image" content="https://blucotravel.com/og-home.svg" />
      </Helmet>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 text-center my-6 tracking-tight ">
        {t('common.title')}
      </h1>
      <div className="max-w-7xl mx-auto py-1 space-y-16">
        <HeroCarousel key={heroSlides.length} slides={heroSlides} />

        {/* {para agregar municipios en main page, modificar municipalities.js} */}
        {municipalities.length > 0 && (
          <section>
            <h2 className="mb-8 text-center text-2xl font-bold text-blue-900 md:text-3xl">
              {t('home.destinations.title')}
            </h2>
            <MunicipalitiesGrid municipalities={municipalities} />
          </section>
        )}

        {featuredPackages.length > 0 && (
          <section>
            <h2 className="mb-8 text-center text-2xl font-bold text-blue-900 md:text-3xl">
              {t('home.featured.title')}
            </h2>
            <FeaturedPackages packages={featuredPackages.slice(0, 4)} />
          </section>
        )}

        <AgencyExperience />

        <section>
          <h2 className="mb-2 text-center text-2xl font-bold text-blue-900 md:text-3xl">
            {t('home.contact.title')}
          </h2>
          <p className="mb-8 text-center text-gray-500">{t('home.contact.lead')}</p>
          <div className="mx-auto max-w-3xl">
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
