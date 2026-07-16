import horseImg from "../images/horsebackRiding.jpg";
import cacaoImg from "../images/cacaoTour.jpg";
import riverImg from "../images/river.jpeg";
import birdImg from '../images//bird.jpeg';
import hikingImg from '../images//hiking.jpg';
import braceletImg from '../images//bracelet.webp';
import coffeeImg from '../images//coffeBeans.jpeg';
import honeyImg from '../images//honey.jpeg';
import mugImg from '../images//mug.webp';
import ponchoImg from '../images//poncho.jpeg';
import { useTranslation } from 'react-i18next';


export const data = [
  {
    id: 1, img: horseImg
  },
  {
    id: 2, img:  cacaoImg 
  },
  {
    id: 3, img:  riverImg 
  }
];



export const LOCAL_PRODUCTS = [
  { id: 1, name: "localProducts.ponchoTitle", price: "$45.00", img: ponchoImg, desc: "localProducts.ponchoDesc" },
  { id: 2, name: "localProducts.coffeeTitle", price: "$15.00", img: coffeeImg, desc: "localProducts.coffeeDesc" },
  { id: 3, name: "localProducts.mugTitle", price: "$12.00", img: mugImg, desc: "localProducts.mugDesc" },
  { id: 4, name: "localProducts.bangleTitle", price: "$5.00", img: braceletImg, desc: "localProducts.bangleDesc" },
  { id: 5, name: "localProducts.honeyTitle", price: "$10.00", img: honeyImg, desc: "localProducts.honeyDesc" }
];
