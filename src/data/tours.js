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
    img: "room.webp",
    gallery: ["room.webp", "room.webp", "room.webp"],
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
    img: "room.webp",
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
    img: "room.webp",
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
    name: "guatapeActivities.RidingTitle",
    img: "horsebackRiding.jpg",
    gallery: ["horsebackRiding.jpg", "river.jpeg", "hiking.jpg"],
    desc: "guatapeActivities.RidingDesc",
    stats: "guatapeActivities.RidingStats",
    type: "guatape-activity",
    lat: 6.23429,
    lng: -75.16335
  },
  {
    id: 2,
    name: "guatapeActivities.riverTitle",
    img: "river.jpeg",
    desc: "guatapeActivities.riverDesc",
    stats: "guatapeActivities.riverStats",
    type: "guatape-activity",
    lat: 6.23429,
    lng: -75.16335
  },
  {
    id: 3,
    name: "guatapeActivities.forestTrekTitle",
    img: "hiking.jpg",
    desc: "guatapeActivities.forestTrekDesc",
    stats: "guatapeActivities.forestTrekStats",
    type: "guatape-activity",
    lat: 6.23429,
    lng: -75.16335
  },
  {
    id: 4,
    name: "guatapeActivities.coffeFarmTitle",
    img: "cacaoTour.jpg",
    desc: "guatapeActivities.coffeFarmDesc",
    stats: "guatapeActivities.coffeFarmStats",
    type: "guatape-activity",
    lat: 6.23429,
    lng: -75.16335
  }
]);

export const sanRafaAcommodations = withImages([
  {
    id: 1,
    name: "sanRafaAccommodations.basicTitle",
    img: "room.webp",
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
    img: "room.webp",
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
    img: "room.webp",
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
    name: "sanRafaActivities.RidingTitle",
    img: "horsebackRiding.jpg",
    desc: "sanRafaActivities.RidingDesc",
    stats: "sanRafaActivities.RidingStats",
    type: "sanrafael-activity",
    lat: 6.29436,
    lng: -75.02589
  },
  {
    id: 3,
    name: "sanRafaActivities.forestTrekTitle",
    img: "hiking.jpg",
    gallery: ["cacaoTour.jpg", "bird.jpeg", "pack.png"],
    desc: "sanRafaActivities.forestTrekDesc",
    stats: "sanRafaActivities.forestTrekStats",
    type: "sanrafael-activity",
    lat: 6.29436,
    lng: -75.02589
  },
  {
    id: 4,
    name: "sanRafaActivities.coffeFarmTitle",
    img: "cacaoTour.jpg",
    desc: "sanRafaActivities.coffeFarmDesc",
    stats: "sanRafaActivities.coffeFarmStats",
    type: "sanrafael-activity",
    lat: 6.29436,
    lng: -75.02589
  },
  {
    id: 5,
    name: "sanRafaActivities.birdWatchingTitle",
    img: "bird.jpeg",
    desc: "sanRafaActivities.birdWatchingDesc",
    stats: "sanRafaActivities.birdWatchingStats",
    type: "sanrafael-activity",
    lat: 6.29436,
    lng: -75.02589
  }
]);

export const packages = withImages([
  { id: 1, name: "packages.birdWatchingTitle", img: "pack.png",gallery: ["room.webp", "bird.jpeg", "cacaoTour.jpg"], desc: "packages.birdWatchingDesc", stats: "packages.birdWatchingStats", type: "package" },
  { id: 2, name: "packages.orientalTitle", img: "pack.png",gallery: ["room.webp", "river.jpeg", "horsebackRiding.jpg"], desc: "packages.orientalDesc", stats: "packages.orientalStats", type: "package" },
  { id: 3, name: "packages.riverTitle", img: "pack.png",gallery: ["room.webp", "hiking.jpg", "horsebackRiding.jpg"], desc: "packages.riverDesc", stats: "packages.riverStats", type: "package" }
]);

export const data = withImages([
  {
    id: 1,
    img: "horsebackRiding.jpg",
    gallery: ["horsebackRiding.jpg", "river.jpeg", "hiking.jpg"]
  },
  { id: 2, img: "cacaoTour.jpg" },
  { id: 3, img: "river.jpeg" }
]);