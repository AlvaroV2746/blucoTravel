import { IMAGES } from './images';

const withImages = (items) => items.map(item => ({ ...item, img: IMAGES[item.img] ?? item.img }));

export const guatapeAcommodations = withImages([
  { id: 1, name: "guatapeAccommodations.basicTitle", img: "room.webp", desc: "guatapeAccommodations.basicDesc", stats: "guatapeAccommodations.basicStats", type: "guatape-accommodation" },
  { id: 2, name: "guatapeAccommodations.specialTitle", img: "room.webp", desc: "guatapeAccommodations.specialDesc", stats: "guatapeAccommodations.specialStats", type: "guatape-accommodation" },
  { id: 3, name: "guatapeAccommodations.deluxeTitle", img: "room.webp", desc: "guatapeAccommodations.deluxeDesc", stats: "guatapeAccommodations.deluxeStats", type: "guatape-accommodation" }
]);

export const guatapeServices = withImages([
  { id: 1, name: "guatapeActivities.RidingTitle", img: "horsebackRiding.jpg", desc: "guatapeActivities.RidingDesc", stats: "guatapeActivities.RidingStats", type: "guatape-activity" },
  { id: 2, name: "guatapeActivities.riverTitle", img: "river.jpeg", desc: "guatapeActivities.riverDesc", stats: "guatapeActivities.riverStats", type: "guatape-activity" },
  { id: 3, name: "guatapeActivities.forestTrekTitle", img: "hiking.jpg", desc: "guatapeActivities.forestTrekDesc", stats: "guatapeActivities.forestTrekStats", type: "guatape-activity" },
  { id: 4, name: "guatapeActivities.coffeFarmTitle", img: "cacaoTour.jpg", desc: "guatapeActivities.coffeFarmDesc", stats: "guatapeActivities.coffeFarmStats", type: "guatape-activity" }
]);

export const sanRafaAcommodations = withImages([
  { id: 1, name: "sanRafaAccommodations.basicTitle", img: "room.webp", desc: "sanRafaAccommodations.basicDesc", stats: "sanRafaAccommodations.basicStats", type: "sanrafael-accommodation" },
  { id: 2, name: "sanRafaAccommodations.specialTitle", img: "room.webp", desc: "sanRafaAccommodations.specialDesc", stats: "sanRafaAccommodations.specialStats", type: "sanrafael-accommodation" },
  { id: 3, name: "sanRafaAccommodations.deluxeTitle", img: "room.webp", desc: "sanRafaAccommodations.deluxeDesc", stats: "sanRafaAccommodations.deluxeStats", type: "sanrafael-accommodation" }
]);

export const sanRafaServices = withImages([
  { id: 1, name: "sanRafaActivities.RidingTitle", img: "horsebackRiding.jpg", desc: "sanRafaActivities.RidingDesc", stats: "sanRafaActivities.RidingStats", type: "sanrafael-activity" },
  { id: 3, name: "sanRafaActivities.forestTrekTitle", img: "hiking.jpg", desc: "sanRafaActivities.forestTrekDesc", stats: "sanRafaActivities.forestTrekStats", type: "sanrafael-activity" },
  { id: 4, name: "sanRafaActivities.coffeFarmTitle", img: "cacaoTour.jpg", desc: "sanRafaActivities.coffeFarmDesc", stats: "sanRafaActivities.coffeFarmStats", type: "sanrafael-activity" },
  { id: 5, name: "sanRafaActivities.birdWatchingTitle", img: "bird.jpeg", desc: "sanRafaActivities.birdWatchingDesc", stats: "sanRafaActivities.birdWatchingStats", type: "sanrafael-activity" }
]);

export const packages = withImages([
  { id: 1, name: "packages.birdWatchingTitle", img: "pack.png", desc: "packages.birdWatchingDesc", stats: "packages.birdWatchingStats", type: "package" },
  { id: 2, name: "packages.orientalTitle", img: "pack.png", desc: "packages.orientalDesc", stats: "packages.orientalStats", type: "package" },
  { id: 3, name: "packages.riverTitle", img: "pack.png", desc: "packages.riverDesc", stats: "packages.riverStats", type: "package" }
]);

export const data = withImages([
  { id: 1, img: "horsebackRiding.jpg" },
  { id: 2, img: "cacaoTour.jpg" },
  { id: 3, img: "river.jpeg" }
]);