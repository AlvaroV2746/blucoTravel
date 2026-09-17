import useCarouselGesture from '../hooks/useCarouselGesture';

const DetailGallery = ({ slides, alt }) => {
  const {
    safeSlides,
    currentIndex,
    dragOffset,
    isDragging,
    goNext,
    goPrev,
    goTo,
    containerRef,
    handlers
  } = useCarouselGesture(slides);

  // Si no hay slides, mostramos una caja de respaldo en lugar de retornar null (para evitar espacios en blanco invisibles)
  if (safeSlides.length === 0) {
    return (
      <div className="h-96 w-full bg-sky-100 flex items-center justify-center text-blue-900 font-semibold">
        Cargando imágenes...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-64 sm:h-80 md:h-96 w-full bg-gray-900 overflow-hidden select-none touch-pan-y group"
      {...handlers}
    >
      {/* La tira de imágenes */}
      <div
        className={`flex h-full w-full ${isDragging ? '' : 'transition-transform duration-300 ease-out'}`}
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
        }}
      >
        {safeSlides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-gray-900 pointer-events-none">
            {/* 1. CAPA DE FONDO: Difuminado ambiental que rellena los espacios vacíos */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={slide}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover filter blur-xl opacity-60 scale-110 pointer-events-none select-none"
              />
            </div>

            {/* 2. CAPA PRINCIPAL: 100% visible, centrada y sin recortes (object-contain) */}
            <div className="relative z-10 w-full h-full flex items-center justify-center scale-100">
              <img 
                src={slide} 
                alt={`${alt} - foto ${index + 1}`} 
                className="max-w-full max-h-full object-contain drop-shadow-xl pointer-events-none select-none"
                onError={(e) => {
                  console.error("❌ Error al cargar la imagen en el carrusel:", slide);
                  e.target.style.display = 'none'; // Oculta la imagen rota si la ruta falla
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Flechas de navegación */}
      {safeSlides.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
            aria-label="Next slide"
          >
            ›
          </button>

          {/* Puntitos indicadores abajo */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {safeSlides.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); goTo(index); }}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === index ? 'w-6 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DetailGallery;