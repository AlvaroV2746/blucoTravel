import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LocalProductsPage from './pages/LocalProductsPage';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import CartSidebar from './components/CartSidebar';

import ActivityDetailView from './components/ActivityDetailView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BlucoApp = () => {
  const { t, i18n } = useTranslation();
  const [currentView, setCurrentView] = useState('home');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Estado para manejar qué menús están abiertos
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Funciones de Lógica
  const addToCart = (activity) => {
    if (!cart.find(item => item.id === activity.id)) {
      setCart([...cart, activity]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleQuote = () => {
    const activityNames = cart.map(item => t(item.name)).join(', ');
    const text = encodeURIComponent(`Hello, I would like to quote these activities: ${activityNames}`);
    window.open(`https://wa.me/573184559655?text=${text}`, '_blank');
  };

  

  return (
    <div className="max-w-7xl mx-auto">
      {/* 1. HEADER */}
      <Navbar onViewChange={setCurrentView} />

      {/* RENDERIZADO CONDICIONAL DE VISTAS */}
      <main>
        <div className="max-w-7xl mx-auto">
          {currentView === 'home' && <HomePage onCartToggle={() => setIsCartOpen(true)} />}
          {currentView === 'services' && (
            selectedActivity ? (
              <ActivityDetailView
                activity={selectedActivity}
                onBack={() => setSelectedActivity(null)}
              />
            ) : (
              <ServicesPage
                onSelect={setSelectedActivity}
                onAdd={addToCart}
                openSections={openSections}
                toggleSection={toggleSection}
              />
            )
          )}

          {currentView === 'aboutus' && <AboutPage />}
          {currentView === 'contactus' && <ContactPage />}
          {currentView === 'localproducts' && <LocalProductsPage />}
        </div>
      </main>

      {/* 3. FOOTER */}
      <Footer />

      {/* FLOATING CART ICON */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 bg-cyan-500 text-white p-4 rounded-full shadow-2xl z-40 cursor-pointer flex items-center justify-center hover:scale-110 hover:bg-cyan-400 transition"
      >
        <span className="relative flex items-center justify-center">
          <span className="text-2xl"><FontAwesomeIcon icon={faPlane} rotation={-45} /></span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-900 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </span>
      </button>

      {isCartOpen && (
  <CartSidebar cart={cart} setIsCartOpen={setIsCartOpen} onRemove={removeFromCart} onQuote={handleQuote} />
)}
    </div>
  );
};

export default BlucoApp;