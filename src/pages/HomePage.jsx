import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { IMAGES } from '../data/images';
import { data } from '../data/tours';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faFire } from '@fortawesome/free-solid-svg-icons';

const HomePage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToImage = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((curr) => (curr === 0 ? data.length - 1 : curr - 1));
    } else {
      setCurrentIndex((curr) => (curr === data.length - 1 ? 0 : curr + 1));
    }
  };

  return (
    <>
      <Helmet>
        <title>Turismo Sostenible Colombia | Guatapé y San Rafael</title>
        <meta name="description" content={t('seo.home.description')} />
        <meta property="og:title" content="BLUCO Travel Colombia - Turismo Sostenible" />
        <meta property="og:description" content={t('seo.home.description')} />
        <meta property="og:image" content="https://blucotravel.com/og-home.svg" />
        <meta name="twitter:title" content="BLUCO Travel Colombia - Turismo Sostenible" />
        <meta name="twitter:description" content={t('seo.home.description')} />
        <meta name="twitter:image" content="https://blucotravel.com/og-home.svg" />
      </Helmet>
      <div className="max-w-7xl mx-auto py-1">
        <div className="relative">
          <div onClick={() => scrollToImage('prev')} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/85 hover:bg-white text-blue-900 shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-all">
            <FontAwesomeIcon icon={faChevronLeft} className="text-2xl md:text-3xl" />
          </div>
          <div onClick={() => scrollToImage('next')} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/85 hover:bg-white text-blue-900 shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-all">
            <FontAwesomeIcon icon={faChevronRight} className="text-2xl md:text-3xl" />
          </div>

          <div className="container-images relative overflow-hidden rounded-xl h-64 sm:h-80 md:h-100 lg:h-128 w-full select-none">
            <ul ref={listRef} className="flex transition-transform duration-500 h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {data.map((item) => (
                <li key={item.id} className="w-full flex-shrink-0 h-full">
                  <img src={item.img} alt={t('hero.slideAlt', { num: item.id })} className="object-cover w-full h-full transition-opacity duration-500" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="dot-container flex justify-center gap-2">
            {data.map((_item, idx) => {
              const dotClass = currentIndex === idx
                ? 'bg-cyan-500 w-3 h-3 rounded-full shadow-md hover:scale-125 transition-transform duration-200'
                : 'bg-cyan-200 w-3 h-3 rounded-full shadow-md hover:scale-110 transition-transform duration-200';
              return <div key={idx} className={dotClass} />;
            })}
          </div>
        </div>

        <h3 className="mt-10 text-2xl font-bold text-blue-900 mb-6 text-center">{t('common.top')}<FontAwesomeIcon icon={faFire} className="text-4xl text-orange-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.9)] animate-pulse" /></h3>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div
            onClick={() => onNavigate('services')}
            className="group relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img src={IMAGES['room.webp']} alt="Cabaña ecológica con vista al embalse de Guatapé" className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 bg-white/80 p-4">
              <h3 className="font-bold text-blue-900">{t('common.accommodation')}</h3>
              <p className="mt-1 text-sm text-gray-600">Guatapé</p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('services')}
            className="group relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img src={IMAGES['river.jpeg']} alt="Río cristalino en San Rafael para kayak y actividades acuáticas" className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 bg-white/80 p-4">
              <h3 className="font-bold text-emerald-500">{t('common.activities')}</h3>
              <p className="mt-1 text-sm text-gray-600">San Rafael</p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('services')}
            className="group relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img src={IMAGES['pack.png']} alt="Paquete turístico completo con alojamiento y actividades en Guatapé y San Rafael" className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 bg-white/80 p-4">
              <h3 className="font-bold text-red-600">{t('common.packages')}</h3>
              <p className="mt-1 text-sm text-gray-600">Paquetes</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;