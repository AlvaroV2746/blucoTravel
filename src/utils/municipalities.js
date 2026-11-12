import { IMAGES } from '../data/images'; // Ajusta los puntos según la ubicación real de tu carpeta data/images.js

// Normaliza nombres para comparar municipios con títulos de sección ("Guatapé" vs "Guatape").
export const normalizeName = (value) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

export const MUNICIPALITIES_DATA = [
  {
    id: 'medellin',
    name: 'Medellín',
    imageUrl: IMAGES['Medellin-pict.avif'] || '', // O una URL directa de prueba, ej: 'https://images.unsplash.com/...'
    curiosity: '¿Sabías que en la Plaza Botero de Medellín se encuentra la colección permanente al aire libre más grande del mundo de esculturas del maestro Fernando Botero?',
    curiosityEn: 'Did you know that Medellín\'s Plaza Botero houses the largest permanent open-air collection of sculptures by master Fernando Botero in the world?',
  },
  {
    id: 'guatape',
    name: 'Guatapé',
    imageUrl: IMAGES['bluco-travel-penol-rock-guatape.avif'] || '',
    curiosity: '¿Sabías que los coloridos zócalos que adornan las fachadas de las casas de Guatapé cuentan historias de la tradición, cultura y oficios de sus pobladores?',
    curiosityEn: 'Did you know that the colorful socles decorating Guatapé\'s house facades tell stories of the tradition, culture, and trades of its locals?',
  },
  
];