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
  if (!img) return null;
  const base = img.split('/').pop().replace(/\.webp$/, '');
  const natural = NATURAL_WIDTHS[base];
  if (!natural) return null;
  const mobile = img.replace(/\.webp$/, '-768.webp');
  return {
    srcSet: `${mobile} 768w, ${img} ${natural}w`,
    avifSrcSet: `${mobile.replace(/\.webp$/, '.avif')} 768w, ${img.replace(/\.webp$/, '.avif')} ${natural}w`,
    sizes: '100vw',
  };
};

const SWIPE_THRESHOLD = 0.18;
const ELASTIC_CAP = 0.2;
const ELASTIC_DAMPING = 0.25;
const AUTO_ADVANCE_MS = 10000;

const HeroCarousel = ({ slides }) => {
  const { t } = useTranslation();
  const listRef = useRef();
  const containerRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const dragRef = useRef({ active: false, startX: 0, startIndex: 0 });

  const safeSlides = Array.isArray(slides) ? slides : [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [slides.length, currentIndex]);

  if (safeSlides.length === 0) {
    return null;
  }

  const scrollToImage = (direction) => {
    setCurrentIndex((curr) =>
      direction === 'prev'
        ? (curr === 0 ? slides.length - 1 : curr - 1)
        : (curr === slides.length - 1 ? 0 : curr + 1)
    );
  };

  const dampen = (raw) => {
    const width = containerRef.current?.clientWidth || 1;
    const cap = Math.round(width * ELASTIC_CAP);
    return Math.max(-cap, Math.min(cap, raw * ELASTIC_DAMPING));
  };

  const handlePointerDown = (e) => {
    listRef.current?.setPointerCapture?.(e.pointerId);
    dragRef.current = { active: true, startX: e.clientX, startIndex: currentIndex };
    setDragOffset(0);
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.active) return;
    const raw = e.clientX - dragRef.current.startX;
    const atFirst = dragRef.current.startIndex === 0;
    const atLast = dragRef.current.startIndex === slides.length - 1;
    let offset = raw;
    if ((atFirst && raw > 0) || (atLast && raw < 0)) {
      offset = dampen(raw);
    }
    setDragOffset(offset);
  };

  const endDrag = () => {
    if (!dragRef.current.active) return;
    const { startIndex } = dragRef.current;
    dragRef.current.active = false;
    const width = containerRef.current?.clientWidth || 1;
    const thresholdPx = width * SWIPE_THRESHOLD;
    if (Math.abs(dragOffset) > thresholdPx) {
      const target = dragOffset < 0 ? startIndex + 1 : startIndex - 1;
      if (target >= 0 && target < slides.length) {
        setCurrentIndex(target);
      }
    }
    setDragOffset(0);
  };

  const handlePointerUp = () => endDrag();
  const handlePointerCancel = () => endDrag();

  const firstSrcSet = buildSrcSet(slides[0]?.imgIcon);
  const style = {
    transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
  };

  return (
    <div className="relative">
      <Helmet>
        {firstSrcSet ? (
          <link rel="preload" as="image" imagesrcset={firstSrcSet.avifSrcSet} imagesizes={firstSrcSet.sizes} />
        ) : (
          <link rel="preload" as="image" href={slides[0]?.img} />
        )}
      </Helmet>

      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className="container-images relative overflow-hidden rounded-xl h-64 sm:h-80 md:h-100 lg:h-128 w-full select-none touch-pan-y cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'pan-y' }}
      >
        <ul
          ref={listRef}
          style={style}
          className={`flex h-full ${
            dragOffset !== 0
              ? 'transition-none'
              : 'transition-transform duration-500'
          }`}
        >
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
                  className="object-cover w-full h-full pointer-events-none select-none"
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div onClick={() => scrollToImage('prev')} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/85 hover:bg-white text-blue-900 shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-all" aria-label={t('hero.previousSlide')}>
        <FontAwesomeIcon icon={faChevronLeft} className="text-2xl md:text-3xl" />
      </div>
      <div onClick={() => scrollToImage('next')} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/85 hover:bg-white text-blue-900 shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-all" aria-label={t('hero.nextSlide')}>
        <FontAwesomeIcon icon={faChevronRight} className="text-2xl md:text-3xl" />
      </div>

      <div className="mt-4 text-center">
        <div className="dot-container flex justify-center gap-2">
          {slides.map((_item, idx) => {
            const isActive = currentIndex === idx;
            const dotClass = isActive
              ? 'bg-cyan-500 w-3 h-3 rounded-full shadow-md hover:scale-125 transition-transform duration-200'
              : 'bg-cyan-200 w-3 h-3 rounded-full shadow-md hover:scale-110 transition-transform duration-200';
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={t('hero.dot', { num: idx + 1 })}
                aria-current={isActive ? 'true' : undefined}
                className={`${dotClass} cursor-pointer`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
