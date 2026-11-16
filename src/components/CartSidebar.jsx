import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingCart, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { translateActivityText } from '../utils/webServices';

const CartSidebar = ({ cart, setIsCartOpen, onRemove, onQuote, isQuoting = false }) => {
  const { t } = useTranslation();
  const itemName = (item) => translateActivityText(t, item.name, item.isDynamic);
  const safeCart = cart ? cart : [];

  // Estados para las 3 nuevas opciones
  const [days, setDays] = useState(1);
  const [people, setPeople] = useState(1);
  const [needsGuide, setNeedsGuide] = useState(false);
  const [clientName, setClientName] = useState('');
  const [quoteError, setQuoteError] = useState('');

  // Estado interno solo para manejar la animación
  const [isAnimating, setIsAnimating] = useState(false);

  // Apenas el componente "nace" (se monta), activamos la animación
  useEffect(() => {
    // Un pequeñísimo retraso (10ms) asegura que el navegador aplique las clases de oculto primero
    const timer = setTimeout(() => setIsAnimating(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Al cerrar, animamos la salida primero y luego cerramos de verdad
  const handleClose = () => {
    setIsAnimating(false);

    // Esperamos 300ms (lo mismo que dura duration-300) y ahora sí le decimos al padre que lo cierre
    setTimeout(() => {
      setIsCartOpen(false);
    }, 300);
  };

  const quoteDisabled = safeCart.length === 0 || isQuoting || clientName.trim().length < 2;

  const submitQuote = async (channel) => {
    setQuoteError('');
    try {
      await onQuote(days, people, needsGuide, clientName.trim(), channel);
    } catch (error) {
      setQuoteError(error.message || t('common.quoteError'));
    }
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
        onClick={(e) => e.stopPropagation()} // Evita que al dar clic dentro del panel se cierre el carrito
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
                  <img src={item.img} alt={itemName(item)} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <span className="font-semibold text-blue-950">{itemName(item)}</span>
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

          {/* Opciones adicionales: visibles SOLO cuando hay productos en el carrito */}
          {safeCart.length > 0 && (
            <div className="mb-4 space-y-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">

              {/* 1. Cantidad de días */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700">
                  {t('cart.days')}
                </label>
                <input
                  type="number"
                  min="1"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* 2. Cantidad de personas */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700">
                  {t('cart.people')}
                </label>
                <input
                  type="number"
                  min="1"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Nombre del cliente */}
              <div className="flex flex-col gap-1">
                <label htmlFor="client-name" className="text-xs font-semibold text-gray-700">
                  {t('cart.clientName')}
                </label>
                <input
                  id="client-name"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  maxLength={150}
                  required
                  className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* 3. Checkbox guía en inglés */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="englishGuide"
                  checked={needsGuide}
                  onChange={(e) => setNeedsGuide(e.target.checked)}
                  className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500 cursor-pointer"
                />
                <label htmlFor="englishGuide" className="text-sm font-medium text-gray-700 cursor-pointer">
                  {t('cart.guide')}
                </label>
              </div>

            </div>
          )}

          {quoteError && <p className="mb-2 text-sm text-red-600">{quoteError}</p>}

          <p className="mb-2 text-sm font-semibold text-blue-950">{t('cart.quoteIntro')}</p>

          <div className="flex overflow-hidden rounded">
            <button
              onClick={() => submitQuote('whatsapp')}
              disabled={quoteDisabled}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold py-3 cursor-pointer hover:bg-emerald-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
              {t('cart.viaWhatsapp')}
            </button>
            <button
              onClick={() => submitQuote('email')}
              disabled={quoteDisabled}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 cursor-pointer hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              {t('cart.viaEmail')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
