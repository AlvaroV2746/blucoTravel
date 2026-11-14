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
    curiosity: 
    
    `-En la Plaza Botero de Medellín se encuentra la colección permanente al aire libre más grande del mundo de esculturas del maestro Fernando Botero
    -Medellín es mundialmente conocida como la "Ciudad de la Eterna Primavera" gracias a su ubicación en el Valle de Aburrá, lo que le otorga una temperatura promedio ideal de 22°C durante todo el año
    Explora los mejores tours y actividades en Medellín guiados por expertos con BLUCO Travel.
    `,
    curiosityEn: 'Did you know that Medellín\'s Plaza Botero houses the largest permanent open-air collection of sculptures by master Fernando Botero in the world?',
  },
  {
    id: 'guatape',
    name: 'Guatapé',
    imageUrl: IMAGES['bluco-travel-penol-rock-guatape.avif'] || '',
    curiosity: `-Los coloridos zócalos que adornan las fachadas de las casas de Guatapé cuentan historias de la tradición, cultura y oficios de sus pobladores
    -La imponente Piedra del Peñol es un monolito de más de 220 metros de altura, ofrece una vista panorámica de 360° de islas y embalses de agua
    ¡Navega, asciende y descubre los secretos mejor guardados de la represa! Conoce nuestros planes y experiencias exclusivas en Guatapé con BLUCO Travel`,
    curiosityEn: 'Did you know that the colorful socles decorating Guatapé\'s house facades tell stories of the tradition, culture, and trades of its locals?',
  },
  
];