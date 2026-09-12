import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CartSidebar = ({ cart, setIsCartOpen, onRemove, onQuote }) => {
  const { t } = useTranslation();
  const safeCart = cart ? cart : [];
  
  // 1. Estado interno solo para manejar la animación
  const [isAnimating, setIsAnimating] = useState(false);

  // 2. Apenas el componente "nace" (se monta), activamos la animación
  useEffect(() => {
    // Un pequeñísimo retraso (10ms) asegura que el navegador aplique las clases de oculto primero
    const timer = setTimeout(() => setIsAnimating(true), 10);
    return () => clearTimeout(timer); // Limpieza de buenas prácticas
  }, []);

  // 3. Al cerrar, animamos la salida primero y luego cerramos de verdad
  const handleClose = () => {
    setIsAnimating(false); // Empieza a deslizarse hacia afuera
    
    // Esperamos 300ms (lo mismo que dura duration-300) y AHORA SÍ le decimos al padre que lo cierre
    setTimeout(() => {
      setIsCartOpen(false);
    }, 300);
  };

  return (
    // Fondo oscuro: cambia su opacidad según el estado de animación
    <div 
      className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`} 
      onClick={handleClose}
    >
      {/* Panel blanco: se desliza dentro o fuera de la pantalla */}
      <div 
        className={`w-96 h-full bg-white fixed right-0 top-0 bottom-0 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()} // Evita que si das clic dentro del panel blanco, se cierre el carrito
      >
        
        {/* Cabecera */}
        <div className="flex-shrink-0 p-4 bg-blue-900 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase">{t('cart.title')}</h2>
          <button
            onClick={handleClose}
            className="bg-transparent p-2 rounded hover:bg-gray-200 text-2xl cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <FontAwesomeIcon icon={faTimes} className="text-2xl" />
          </button>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 p-6 overflow-y-auto">
          {safeCart.length === 0 ? (
            <div className="p-8 text-center">
              <FontAwesomeIcon icon={faShoppingCart} className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">{t('cart.empty')}</h3>
            </div>
          ) : (
            safeCart.map((item, index) => {
              if (!item || !item.name) return null;
              return (
                <div key={index} className="flex items-center gap-4 mb-4 border-b border-gray-100 pb-4">
                  <img src={item.img} alt={t(item.name)} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <span className="font-semibold text-blue-950">{t(item.name)}</span>
                    <span className="text-sm text-gray-500"></span>
                  </div>
                  <button
                    onClick={() => onRemove(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold cursor-pointer"
                  >
                    X
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Pie del carrito */}
        <div className="flex-shrink-0 p-6 bg-gray-50 border-t border-gray-200">
          <button
            onClick={onQuote}
            disabled={safeCart.length === 0}
            className="w-full bg-cyan-500 text-white font-bold py-3 rounded cursor-pointer hover:bg-cyan-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {t("common.makeQuote")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;