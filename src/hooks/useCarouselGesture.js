import { useState, useRef, useCallback } from 'react';

const useCarouselGesture = (slidesArray) => {
  const safeSlides = Array.isArray(slidesArray) ? slidesArray : [];
  const maxIndex = safeSlides.length > 0 ? safeSlides.length - 1 : 0;

  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef(0);
  const isDown = useRef(false);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goTo = useCallback((index) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  }, [maxIndex]);

  // Manejo de gestos táctiles y ratón
  const handlePointerDown = (e) => {
    isDown.current = true;
    dragStart.current = e.clientX;
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDown.current) return;
    const currentDrag = e.clientX - dragStart.current;
    setDragOffset(currentDrag);
  };

  const handlePointerUp = () => {
    if (!isDown.current) return;
    isDown.current = false;
    setIsDragging(false);

    // Si arrastramos más de 50px, cambiamos de slide
    if (dragOffset > 50) goPrev();
    if (dragOffset < -50) goNext();
    
    setDragOffset(0);
  };

  const handlePointerLeave = () => {
    if (isDown.current) handlePointerUp();
  };

  return {
    safeSlides,
    currentIndex,
    dragOffset,
    isDragging,
    goNext,
    goPrev,
    goTo,
    containerRef,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerLeave,
      onPointerCancel: handlePointerLeave,
    }
  };
};

export default useCarouselGesture;