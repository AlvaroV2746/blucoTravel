import { IMAGES } from './images';

const withImages = (items) => items.map(item => ({ ...item, img: IMAGES[item.img] ?? item.img }));

export const guatapeAcommodations = withImages([
  { id: 1, name: "guatapeAccommodations.basicTitle", img: "room.webp", desc: "guatapeAccommodations.basicDesc", stats: "guatapeAccommodations.basicStats" },
  { id: 2, name: "guatapeAccommodations.specialTitle", img: "room.webp", desc: "guatapeAccommodations.specialDesc", stats: "guatapeAccommodations.specialStats" },
  { id: 3, name: "guatapeAccommodations.deluxeTitle", img: "room.webp", desc: "guatapeAccommodations.deluxeDesc", stats: "guatapeAccommodations.deluxeStats" }
]);

export const guatapeServices = withImages([
  { id: 1, name: "guatapeActivities.RidingTitle", img: "horsebackRiding.jpg", desc: "guatapeActivities.RidingDesc", stats: "guatapeActivities.RidingStats" },
  { id: 2, name: "guatapeActivities.riverTitle", img: "river.jpeg", desc: "guatapeActivities.riverDesc", stats: "guatapeActivities.riverStats" },
  { id: 3, name: "guatapeActivities.forestTrekTitle", img: "hiking.jpg", desc: "guatapeActivities.forestTrekDesc", stats: "guatapeActivities.forestTrekStats" },
  { id: 4, name: "guatapeActivities.coffeFarmTitle", img: "cacaoTour.jpg", desc: "guatapeActivities.coffeFarmDesc", stats: "guatapeActivities.coffeFarmStats" }
]);

export const sanRafaAcommodations = withImages([
  { id: 1, name: "sanRafaAccommodations.basicTitle", img: "room.webp", desc: "sanRafaAccommodations.basicDesc", stats: "sanRafaAccommodations.basicStats" },
  { id: 2, name: "sanRafaAccommodations.specialTitle", img: "room.webp", desc: "sanRafaAccommodations.specialDesc", stats: "sanRafaAccommodations.specialStats" },
  { id: 3, name: "sanRafaAccommodations.deluxeTitle", img: "room.webp", desc: "sanRafaAccommodations.deluxeDesc", stats: "sanRafaAccommodations.deluxeStats" }
]);

export const sanRafaServices = withImages([
  { id: 1, name: "sanRafaActivities.RidingTitle", img: "horsebackRiding.jpg", desc: "sanRafaActivities.RidingDesc", stats: "sanRafaActivities.RidingStats" },
  { id: 3, name: "sanRafaActivities.forestTrekTitle", img: "hiking.jpg", desc: "sanRafaActivities.forestTrekDesc", stats: "sanRafaActivities.forestTrekStats" },
  { id: 4, name: "sanRafaActivities.coffeFarmTitle", img: "cacaoTour.jpg", desc: "sanRafaActivities.coffeFarmDesc", stats: "sanRafaActivities.coffeFarmStats" },
  { id: 5, name: "sanRafaActivities.birdWatchingTitle", img: "bird.jpeg", desc: "sanRafaActivities.birdWatchingDesc", stats: "sanRafaActivities.birdWatchingStats" }
]);

export const packages = withImages([
  { id: 1, name: "packages.birdWatchingTitle", img: "pack.png", desc: "packages.birdWatchingDesc", stats: "packages.birdWatchingStats" },
  { id: 2, name: "packages.orientalTitle", img: "pack.png", desc: "packages.orientalDesc", stats: "packages.orientalStats" },
  { id: 3, name: "packages.riverTitle", img: "pack.png", desc: "packages.riverDesc", stats: "packages.riverStats" }
]);

export const data = withImages([
  { id: 1, img: "horsebackRiding.jpg" },
  { id: 2, img: "cacaoTour.jpg" },
  { id: 3, img: "river.jpeg" }
]);