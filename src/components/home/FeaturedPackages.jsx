import { useTranslation } from 'react-i18next';
import { IMAGES } from '../../data/images';

const LOGO = IMAGES['bluco-travel-Logo.webp'];
const WHATSAPP_NUMBER = '573000726521';

const FeaturedPackages = ({ packages }) => {
  const { t } = useTranslation();

  if (packages.length === 0) return null;

  const openWhatsApp = (pkg) => {
    const message = t('home.featured.whatsappMessage', { code: pkg.code || pkg.name });
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {packages.map((pkg) => (
        <article
          key={pkg.id}
          className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg"
        >
          <div className="aspect-square w-full bg-blue-950">
            {pkg.imageUrl ? (
              <img
                src={pkg.imageUrl}
                alt={pkg.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <img src={LOGO} alt="BLUCO Travel" className="h-24 w-auto object-contain" />
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-3 p-4">
            <h3 className="font-bold text-gray-900">{pkg.name}</h3>
            {pkg.description && (
              <p className="line-clamp-4 text-sm text-gray-600">{pkg.description}</p>
            )}
            <button
              type="button"
              onClick={() => openWhatsApp(pkg)}
              className="mt-auto rounded-lg bg-cyan-500 py-2 text-sm font-bold text-white transition hover:bg-cyan-600"
            >
              {t('home.featured.quote')}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default FeaturedPackages;
