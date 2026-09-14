// Helper DRY de imágenes responsivas AVIF/WebP.
// Único punto de verdad para srcSet/srcSetAVIF usados en tarjetas y picture.

const MOBILE_VARIANTS = new Set(['horsebackRiding', 'river', 'hiking']);

const NATURAL_WIDTHS = {
  horsebackRiding: 1007,
  river: 1200,
  hiking: 880,
};

const baseName = (webpSrc) => webpSrc.split('/').pop().replace(/\.webp$/, '');

/**
 * Construye srcSet WebP + AVIF de forma segura.
 * Si la imagen tiene variante móvil, arma el srcSet responsivo.
 * Si no la tiene, devuelve la ruta base para que igual disfrute de AVIF y WebP.
 */
export const buildSrcSet = (webpSrc) => {
  if (!webpSrc) {
    return { avifSrc: '', srcSet: '', avifSrcSet: '', sizes: '100vw' };
  }

  const base = baseName(webpSrc);
  const natural = NATURAL_WIDTHS[base];
  const avifSrc = webpSrc.replace(/\.webp$/, '.avif');
  const hasMobile = MOBILE_VARIANTS.has(base) && natural;

  if (hasMobile) {
    const mobileWebp = webpSrc.replace(/\.webp$/, '-768.webp');
    const mobileAvif = avifSrc.replace(/\.avif$/, '-768.avif');
    return {
      avifSrc,
      srcSet: `${mobileWebp} 768w, ${webpSrc} ${natural}w`,
      avifSrcSet: `${mobileAvif} 768w, ${avifSrc} ${natural}w`,
      sizes: '100vw',
    };
  }

  // Rescate para el resto de imágenes: no tienen -768, pero sí su versión normal y su AVIF
  return {
    avifSrc,
    srcSet: webpSrc,
    avifSrcSet: avifSrc,
    sizes: '100vw',
  };
};