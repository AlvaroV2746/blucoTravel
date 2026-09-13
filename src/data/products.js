import { IMAGES } from './images';

const withImages = (items) => items.map(item => ({ ...item, img: IMAGES[item.img] ?? item.img }));

export const LOCAL_PRODUCTS = withImages([
  { id: 1, name: "localProducts.ponchoTitle", img: "poncho.jpeg", desc: "localProducts.ponchoDesc", price: "localProducts.ponchoPrice", priceValue: 120000 },
  { id: 2, name: "localProducts.coffeeTitle", img: "coffeBeans.jpeg", desc: "localProducts.coffeeDesc", price: "localProducts.coffeePrice", priceValue: 35000 },
  { id: 3, name: "localProducts.mugTitle", img: "mug.webp", desc: "localProducts.mugDesc", price: "localProducts.mugPrice", priceValue: 45000 },
  { id: 4, name: "localProducts.bangleTitle", img: "bracelet.webp", desc: "localProducts.bangleDesc", price: "localProducts.banglePrice", priceValue: 20000 },
  { id: 5, name: "localProducts.honeyTitle", img: "honey.jpeg", desc: "localProducts.honeyDesc", price: "localProducts.honeyPrice", priceValue: 28000 }
]);