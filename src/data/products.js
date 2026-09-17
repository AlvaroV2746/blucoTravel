import { IMAGES } from './images';

const withImages = (items) => items.map(item => ({ ...item, img: IMAGES[item.img] ?? item.img }));

export const LOCAL_PRODUCTS = withImages([
  { id: 1, name: "localProducts.coffeeTitle", img: "coffeBeans.jpeg", desc: "localProducts.coffeeDesc", price: "localProducts.coffeePrice", priceValue: 35000 }
]);