import { IMAGES } from './images';

const resolveGallery = (item, resolvedImage) => {
  // Si el servicio ya tiene una galería personalizada definida, la usamos
  if (item.gallery && Array.isArray(item.gallery) && item.gallery.length > 0) {
    return item.gallery.map((key) => IMAGES[key] ?? key).filter(Boolean);
  }
  // Si no tiene galería explícita, triplicamos la imagen principal para la prueba
  return [resolvedImage, resolvedImage, resolvedImage];
};

const withImages = (items) =>
  items.map((item) => {
    const resolvedImage = IMAGES[item.img] ?? item.img;
    return {
      ...item,
      img: resolvedImage,
      gallery: resolveGallery(item, resolvedImage),
    };
  });

export const guatapeAcommodations = withImages([
  {
    id: 1,
    name: "guatapeAccommodations.basicTitle",
    img: "basic-lodging-guatape",
    gallery: ["basic-lodging-guatape"],
    desc: "guatapeAccommodations.basicDesc",
    stats: "guatapeAccommodations.basicStats",
    type: "guatape-accommodation",
    lat: 6.23429,
    lng: -75.16335,
    priceRange: "$",
    starRating: 3,
    amenityFeature: ["Wifi incluido", "Desayuno incluido", "Vista al embalse"]
  },
  {
    id: 2,
    name: "guatapeAccommodations.specialTitle",
    img: "bluco-travel-special-lodging-guatape.webp",
    gallery: ["bluco-travel-special-lodging-guatape.webp"],
    desc: "guatapeAccommodations.specialDesc",
    stats: "guatapeAccommodations.specialStats",
    type: "guatape-accommodation",
    lat: 6.23429,
    lng: -75.16335,
    priceRange: "$$",
    starRating: 4,
    amenityFeature: ["Wifi incluido", "Desayuno incluido", "Balcón con vista", "Tour guiado"]
  },
  {
    id: 3,
    name: "guatapeAccommodations.deluxeTitle",
    img: "bluco-travel-deluxe-lodging-guatape.webp",
    gallery: ["bluco-travel-deluxe-lodging-guatape.webp"],
    desc: "guatapeAccommodations.deluxeDesc",
    stats: "guatapeAccommodations.deluxeStats",
    type: "guatape-accommodation",
    lat: 6.23429,
    lng: -75.16335,
    priceRange: "$$$",
    starRating: 5,
    amenityFeature: ["Wifi incluido", "Servicio personalizado", "Piscina", "Hidromasaje", "Transporte privado"]
  }
]);

export const guatapeServices = withImages([
  {
    id: 1,
    name: "guatapeActivities.activity1Title",
    img: "bluco-travel-boat-ride-guatape-reservoir.webp",
    gallery: ["bluco-travel-boat-ride-guatape-reservoir.webp", "bluco-travel-natural-reserve-guatape.webp", "bluco-travel-penol-rock-guatape.webp"],
    desc: "guatapeActivities.activity1Desc",
    stats: "guatapeActivities.activity1Stats",
    type: "guatape-activity",
    lat: 6.23429,
    lng: -75.16335
  },
  {
    id: 2,
    name: "guatapeActivities.activity2Title",
    img: "bluco-travel-penol-rock-guatape.webp",
    gallery: ["bluco-travel-penol-rock-guatape.webp"],
    desc: "guatapeActivities.activity2Desc",
    stats: "guatapeActivities.activity2Stats",
    type: "guatape-activity",
    lat: 6.23429,
    lng: -75.16335
  },
  {
    id: 3,
    name: "guatapeActivities.activity3Title",
    img: "bluco-travel-main-square-zocalos-guatape.webp",
    gallery: ["bluco-travel-main-square-zocalos-guatape.webp", "bluco-travel-colorful-streets-zocalos-guatape.webp"],

    desc: "guatapeActivities.activity3Desc",
    stats: "guatapeActivities.activity3Stats",
    type: "guatape-activity",
    lat: 6.23429,
    lng: -75.16335
  }
]);

export const sanRafaAcommodations = withImages([
  {
    id: 1,
    name: "sanRafaAccommodations.basicTitle",
    img: "bluco-travel-basic-lodging-san-rafael.webp",
    gallery: ["bluco-travel-basic-lodging-san-rafael.webp"],

    desc: "sanRafaAccommodations.basicDesc",
    stats: "sanRafaAccommodations.basicStats",
    type: "sanrafael-accommodation",
    lat: 6.29436,
    lng: -75.02589,
    priceRange: "$",
    starRating: 3,
    amenityFeature: ["Wifi incluido", "Desayuno incluido", "Acceso al río"]
  },
  {
    id: 2,
    name: "sanRafaAccommodations.specialTitle",
    img: "bluco-travel-special-lodging-san-rafael.webp",
    gallery: ["bluco-travel-special-lodging-san-rafael.webp"],

    desc: "sanRafaAccommodations.specialDesc",
    stats: "sanRafaAccommodations.specialStats",
    type: "sanrafael-accommodation",
    lat: 6.29436,
    lng: -75.02589,
    priceRange: "$$",
    starRating: 4,
    amenityFeature: ["Wifi incluido", "Desayuno incluido", "Zona de camping", "Guía local"]
  },
  {
    id: 3,
    name: "sanRafaAccommodations.deluxeTitle",
    img: "bluco-travel-deluxe-lodging-interior-san-rafael.webp",
    gallery: ["bluco-travel-deluxe-lodging-interior-san-rafael.webp"],

    desc: "sanRafaAccommodations.deluxeDesc",
    stats: "sanRafaAccommodations.deluxeStats",
    type: "sanrafael-accommodation",
    lat: 6.29436,
    lng: -75.02589,
    priceRange: "$$$",
    starRating: 5,
    amenityFeature: ["Wifi incluido", "Servicio personalizado", "Piscina natural", "Hidromasaje", "Transporte privado"]
  }
]);

export const sanRafaServices = withImages([
  {
    id: 1,
    name: "sanRafaActivities.activity1Title",
    img: "bluco-travel-artisan-cacao-tour.webp",
    gallery: ["bluco-travel-artisan-cacao-tour.webp", "bluco-travel-handmade-chocolate-bar.webp", "bluco-travel-fresh-cacao-harvest-bucket.webp", "bluco-travel-fresh-split-cacao-experience.webp", "bluco-travel-artisan-heart-cacao.webp", "bluco-travel-cacao-tour-experience.webp"],
    desc: "sanRafaActivities.activity1Desc",
    stats: "sanRafaActivities.activity1Stats",
    type: "sanrafael-activity",
    lat: 6.29436,
    lng: -75.02589
  },
  {
    id: 2,
    name: "sanRafaActivities.activity2Title",
    img: "bluco-travel-coffee-picking-experience-antioquia.webp",
    gallery: ["bluco-travel-coffee-picking-experience-antioquia.webp", "bluco-travel-coffee-tour-bean-picking.webp", "bluco-travel-coffee-harvest-sustainable-tourism.webp"],
    desc: "sanRafaActivities.activity2Desc",
    stats: "sanRafaActivities.activity2Stats",
    type: "sanrafael-activity",
    lat: 6.29436,
    lng: -75.02589
  },
  {
    id: 3,
    name: "sanRafaActivities.activity3Title",
    img: "bluco-travel-river-nature-landscape-san-rafael.webp",
    gallery: ["bluco-travel-river-nature-landscape-san-rafael.webp"],

    desc: "sanRafaActivities.activity3Desc",
    stats: "sanRafaActivities.activity3Stats",
    type: "sanrafael-activity",
    lat: 6.29436,
    lng: -75.02589
  },
  {
    id: 4,
    name: "sanRafaActivities.activity4Title",
    img: "bluco-travel-birdwatching.webp",
    gallery: ["bluco-travel-birdwatching.webp","bluco-travel-bird-1.webp"],

    desc: "sanRafaActivities.activity4Desc",
    stats: "sanRafaActivities.activity4Stats",
    type: "sanrafael-activity",
    lat: 6.29436,
    lng: -75.02589
  }
]);
export const sections = withImages([
  { id: 1, name: "bluco-travel-guatape-seccion", img: "bluco-travel-guatape-seccion.webp", type: "section" },
  { id: 2, name: "bluco-travel-san-rafael-seccion", img: "bluco-travel-san-rafael-seccion.webp", type: "section" },
  { id: 3, name: "bluco-travel-map-package-seccion", img: "bluco-travel-map-package-seccion.webp", type: "section" }
]);

export const packages = withImages([
  { id: 1, name: "packages.package1title", img: "bluco-travel-birdwatching.webp", gallery: ["bluco-travel-birdwatching.webp","bluco-travel-bird-1.webp"], desc: "packages.package1Desc", stats: "packages.package1Stats", type: "package" },
  { id: 2, name: "packages.package2Title", img: "bluco-travel-crystal-clear-river-san-rafael.webp", gallery: ["bluco-travel-crystal-clear-river-san-rafael.webp", "bluco-travel-river-nature-landscape-san-rafael.webp"], desc: "packages.package2Desc", stats: "packages.package2Stats", type: "package" },
  { id: 3, name: "packages.package3Title", img: "bluco-travel-artisan-cacao-tour.webp", gallery: ["bluco-travel-artisan-cacao-tour.webp", "bluco-travel-fresh-cacao-harvest-bucket.webp", "bluco-travel-fresh-split-cacao-experience.webp"], desc: "packages.package3Desc", stats: "packages.package3Stats", type: "package" }
]);

export const data = withImages([
  { id: 1, img: "bluco-travel-ecological-horseback-riding-san-rafael.webp" },
  { id: 2, img: "bluco-travel-penol-rock-guatape.webp" },
  { id: 3, img: "bluco-travel-crystal-clear-river-san-rafael.webp" }
]);