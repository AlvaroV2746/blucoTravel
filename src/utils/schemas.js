export const BASE_URL = 'https://blucotravel.com';

// Función auxiliar para garantizar que las imágenes sean URLs absolutas y en formato de arreglo.
const formatImagesForSchema = (images) => {
  if (!images) return undefined;
  const imgArray = Array.isArray(images) ? images : [images];
  return imgArray.map(img => img.startsWith('http') ? img : `${BASE_URL}${img}`);
};

export const generateTouristAttraction = ({ name, description, image, url, locationName, lat, lng }) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name,
    description,
    image: formatImagesForSchema(image),
    url,
    location: {
      '@type': 'Place',
      name: locationName,
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Antioquia',
        addressCountry: 'CO',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: lat,
        longitude: lng,
      },
      maps: lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : undefined,
    },
    touristType: {
      '@type': 'Audience',
      audienceType: 'travelers',
    },
    isAccessibleForFree: false,
  };
};

export const generateLodgingBusiness = ({
  name,
  description,
  image,
  url,
  priceRange = '$$',
  starRating = 4,
  amenities = [],
  locationName,
  lat,
  lng,
  aggregateRating,
  reviews,
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name,
    description,
    image: formatImagesForSchema(image), // <--- Actualizado
    url,
    priceRange,
    starRating,
    amenityFeature: amenities.map((am) => ({
      '@type': 'LocationFeatureSpecification',
      name: am,
      value: true,
    })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: locationName,
      addressRegion: 'Antioquia',
      addressCountry: 'CO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: lat,
      longitude: lng,
    },
    currenciesAccepted: 'COP',
    ...(aggregateRating ? { aggregateRating } : {}),
    ...(reviews && reviews.length ? { review: reviews } : {}),
  };
};

export const generateReviewSchema = ({ reviewBody, author, datePublished, ratingValue }) => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  reviewBody,
  author: {
    '@type': 'Person',
    name: author,
  },
  datePublished,
  reviewRating: {
    '@type': 'Rating',
    ratingValue,
    bestRating: 5,
  },
});

export const generateAggregateRatingSchema = ({ ratingValue, reviewCount, bestRating = 5 }) => ({
  '@type': 'AggregateRating',
  ratingValue,
  reviewCount,
  bestRating,
});

export const generateProduct = ({ name, description, image, url, price, currency = 'COP', aggregateRating, reviews }) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name,
  description,
  image: formatImagesForSchema(image), // <--- Actualizado
  brand: {
    '@type': 'Brand',
    name: 'BLUCO Travel',
  },
  offers: {
    '@type': 'Offer',
    url,
    priceCurrency: currency,
    price,
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'BLUCO Travel',
    },
  },
  ...(aggregateRating ? { aggregateRating } : {}),
  ...(reviews && reviews.length ? { review: reviews } : {}),
});

export const generateBreadcrumbList = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const generateFAQPageSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'BLUCO Travel',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/servicios?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

export const generateTravelAgencySchema = ({
  name = 'BLUCO Travel',
  description,
  url = BASE_URL,
  logo,
  sameAs = [],
  areaServed = ['Guatapé', 'San Rafael', 'Antioquia'],
  priceRange = '$$',
  currenciesAccepted = 'COP',
  keywords = [],
  knowsAbout = [],
}) => ({
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name,
  description,
  url,
  ...(logo ? { logo: formatImagesForSchema(logo)?.[0] } : {}), // <--- Actualizado para el logo
  ...(sameAs.length ? { sameAs } : {}),
  ...(areaServed.length ? { areaServed } : {}),
  ...(priceRange ? { priceRange } : {}),
  ...(currenciesAccepted ? { currenciesAccepted } : {}),
  ...(keywords.length ? { keywords } : {}),
  ...(knowsAbout.length ? { knowsAbout } : {}),
});