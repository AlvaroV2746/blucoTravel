import React from 'react';
import { useTranslation } from 'react-i18next';

const CartSidebar = ({ cart, setIsCartOpen, onRemove, onQuote }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="w-96 h-full bg-white flex flex-col shadow-[-10px_0_25px_-5px_rgba(0,0,0,0.2)]">
        <div className="p-6 bg-blue-900 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase">{t('cart.title')}</h2>
          <button onClick={() => setIsCartOpen(false)} className="bg-transparent border-none text-2xl cursor-pointer">&times;</button>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 text-sm mt-10">
              {t('cart.empty')}
            </p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex items-center gap-4 mb-4 border-b border-gray-100 pb-4">
                <img src={item.img} alt={t(item.name)} className="w-16 h-16 object-cover rounded" />
                <span className="font-semibold text-blue-950">{t(item.name)}</span>
                <button onClick={() => onRemove(index)} className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold cursor-pointer">
                  X
                </button>
              </div>
            ))
          )}
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <button
            onClick={onQuote}
            disabled={cart.length === 0}
            className="w-full bg-cyan-500 text-white font-bold py-3 rounded cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {t("common.makeQuote")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;