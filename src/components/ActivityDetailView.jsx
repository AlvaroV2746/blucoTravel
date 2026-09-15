import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SchemaOrg from './SchemaOrg';
import DetailGallery from './DetailGallery';
import { generateTouristAttraction, generateLodgingBusiness, BASE_URL } from '../utils/schemas';

const isAccommodation = (type) => !!type && type.includes('accommodation');

const locationNameFor = (type) => {
  if (type && type.startsWith('sanrafael')) return 'San Rafael';
  return 'Guatapé';
};

const ActivityDetailView = ({ activity, onBack }) => {
  const { t } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onBack();
    }, 300);
  };

  if (!activity) return null;

  //Si activity.gallery existe y tiene elementos, los usamos. 
  // Si no, intentamos usar activity.img, y si todo falla, un arreglo con una imagen por defecto.
  const slides = (Array.isArray(activity.gallery) && activity.gallery.length > 0)
    ? activity.gallery
    : (activity.img ? [activity.img] : ['/images/room.webp']);

  console.log(activity.gallery);
  

  const common = {
    name: t(activity.name),
    description: t(activity.desc),
    image: `${BASE_URL}/og-services.svg`,
    url: window.location.href,
    locationName: locationNameFor(activity.type),
    lat: activity.lat,
    lng: activity.lng,
  };

  const activitySchema = isAccommodation(activity.type)
    ? generateLodgingBusiness({
        ...common,
        priceRange: activity.priceRange,
        starRating: activity.starRating,
        amenities: activity.amenityFeature || [],
      })
    : generateTouristAttraction(common);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <SchemaOrg schema={activitySchema} />

      <div
        className={`bg-white rounded-xl shadow-2xl border border-sky-100 overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out ${
          isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Renderizamos el carrusel con las diapositivas aseguradas */}
        <DetailGallery slides={slides} alt={t(activity.name)} />
        
        <div className="p-10">
          <h2 className="text-4xl font-black text-blue-900 uppercase mb-4">
            {t(activity.name)}
          </h2>
          <div className="inline-block bg-sky-100 text-blue-900 px-4 py-2 rounded-full font-semibold mb-6">
            {t(activity.stats)}
          </div>
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            {t(activity.desc)}
          </p>
          <button
            onClick={handleClose}
            className="bg-cyan-500 text-white font-bold py-4 px-8 rounded text-lg cursor-pointer hover:bg-cyan-600 transition"
          >
            {t('common.goBack')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailView;