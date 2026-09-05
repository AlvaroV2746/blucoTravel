import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { data } from '../data/tours';

const HomePage = ({ onCartToggle }) => {
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

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches[0].screenX);
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentIndex((curr) =>
          curr === data.length - 1 ? 0 : curr + 1
        );
      } else {
        setCurrentIndex((curr) => (curr === 0 ? data.length - 1 : curr - 1));
      }
    }
  };

  const scrollToImage = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((curr) => (curr === 0 ? data.length - 1 : curr - 1));
    } else {
      setCurrentIndex((curr) => (curr === data.length - 1 ? 0 : curr + 1));
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="relative">
        <div className='leftArrow absolute left-0 top-1/2 -translate-y-1/2 text-2xl hover:text-gray-600 transition-colors cursor-pointer z-10' onClick={() => scrollToImage('prev')}>&#10092;</div>
        <div className='rightArrow absolute right-0 top-1/2 -translate-y-1/2 text-2xl hover:text-gray-600 transition-colors cursor-pointer z-10' onClick={() => scrollToImage('next')}>&#10093;</div>
        <div className="container-images relative overflow-hidden rounded-xl h-48 sm:h-72 md:h-80 lg:h-96 w-full select-none">
          <ul ref={listRef} className="flex transition-transform duration-500 h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {data.map((item) => (
              <li key={item.id} className="w-full flex-shrink-0 h-full">
                <img src={item.img} alt={`Slide ${item.id}`} className="object-cover w-full h-full" />
              </li>
            ))}
          </ul>
        </div>
        <div className="dot-container flex justify-center gap-2 pt-4">
          {data.map((_, idx) => (
            <div
              key={idx}
              className={`dot-item w-3 h-3 rounded-full bg-gray-300 transition-colors cursor-pointer ${
                idx === currentIndex ? "bg-cyan-500 w-8" : ""
              }`}
              onClick={() => goToSlide(idx)}>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;