import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CartSidebar = ({ cart, setIsCartOpen, onRemove, onQuote }) => {
  const { t } = useTranslation();
  const safeCart = cart ? cart : [];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}>
      <div className="w-96 h-full bg-white fixed right-0 top-0 bottom-0 shadow-2xl transform transition-transform duration-300 ease-out ${
        setIsCartOpen ? 'translate-x-0' : 'translate-x-full'
      }">
        <div className="flex-shrink-0 p-4 bg-blue-900 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase">{t('cart.title')}</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="bg-transparent p-2 rounded hover:bg-gray-200 text-2xl cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <FontAwesomeIcon icon={faTimes} className="text-2xl" />
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          {safeCart.length === 0 ? (
            <div className="p-8 text-center">
              <FontAwesomeIcon icon={faShoppingCart} className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">{t('cart.empty')}</h3>
              <p className="text-sm text-gray-400">{t('cart.emptyDescription')}</p>
            </div>
          ) : (
            safeCart.map((item, index) => {
              if (!item || !item.name) return null;
              return (
                <div key={index} className="flex items-center gap-4 mb-4 border-b border-gray-100 pb-4">
                  <img src={item.img} alt={t(item.name)} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <span className="font-semibold text-blue-950">{t(item.name)}</span>
                    <span className="text-sm text-gray-500">x{item.qty || 1}</span>
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

        <div className="p-6 bg-gray-50 border-t border-gray-200">
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