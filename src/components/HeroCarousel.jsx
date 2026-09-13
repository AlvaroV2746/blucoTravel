import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const NATURAL_WIDTHS = {
  horsebackRiding: 1007,
  river: 1200,
  hiking: 880,
};

const buildSrcSet = (img) => {
  const base = img.split('/').pop().replace(/\.webp$/, '');
  const natural = NATURAL_WIDTHS[base];
  if (!natural) return null;
  const mobile = img.replace(/\.webp$/, '-768.webp');
  return {
    srcSet: `${mobile} 768w, ${img} ${natural}w`,
    sizes: '100vw',
  };
};

const HeroCarousel = ({ slides }) => {
  const { t } = useTranslation();
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToImage = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    } else {
      setCurrentIndex((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
    }
  };

  const firstSrcSet = buildSrcSet(slides[0]?.img);

  return (
    <div className="relative">
      <Helmet>
        {firstSrcSet ? (
          <link rel="preload" as="image" imagesrcset={firstSrcSet.srcSet} imagesizes={firstSrcSet.sizes} />
        ) : (
          <link rel="preload" as="image" href={slides[0]?.img} />
        )}
      </Helmet>

      <div onClick={() => scrollToImage('prev')} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/85 hover:bg-white text-blue-900 shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-all" aria-label={t('hero.previousSlide')}>
        <FontAwesomeIcon icon={faChevronLeft} className="text-2xl md:text-3xl" />
      </div>
      <div onClick={() => scrollToImage('next')} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/85 hover:bg-white text-blue-900 shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-all" aria-label={t('hero.nextSlide')}>
        <FontAwesomeIcon icon={faChevronRight} className="text-2xl md:text-3xl" />
      </div>

      <div className="container-images relative overflow-hidden rounded-xl h-64 sm:h-80 md:h-100 lg:h-128 w-full select-none">
        <ul ref={listRef} className="flex transition-transform duration-500 h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {slides.map((item, index) => {
            const srcSet = buildSrcSet(item.img);
            const isFirst = index === 0;
            return (
              <li key={item.id} className="w-full flex-shrink-0 h-full">
                <img
                  src={item.img}
                  srcSet={srcSet?.srcSet}
                  sizes={srcSet?.sizes}
                  alt={t('hero.slideAlt', { num: item.id })}
                  loading={isFirst ? 'eager' : 'lazy'}
                  fetchPriority={isFirst ? 'high' : 'auto'}
                  decoding="async"
                  className="object-cover w-full h-full transition-opacity duration-500"
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 text-center">
        <div className="dot-container flex justify-center gap-2">
          {slides.map((_item, idx) => {
            const dotClass = currentIndex === idx
              ? 'bg-cyan-500 w-3 h-3 rounded-full shadow-md hover:scale-125 transition-transform duration-200'
              : 'bg-cyan-200 w-3 h-3 rounded-full shadow-md hover:scale-110 transition-transform duration-200';
            return <span key={idx} className={dotClass} aria-hidden="true" />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;