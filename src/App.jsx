import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // <--- IMPRESCINDIBLE PARA CONECTAR EL CSS
import logoFull from './assets/logos/logoFull.png';
import horsebackImg from './assets/images/horsebackRiding.jpg';
import cacaoTourImg from './assets/images/cacaoTour.jpg';
import riverImg from './assets/images/river.jpeg';
import birdImg from './assets/images/bird.jpeg';
import hikingImg from './assets/images/hiking.jpg';
import roomImg from './assets/images/room.webp';
import packImg from './assets/images/pack.png';
import { data, LOCAL_PRODUCTS } from './assets/components/data.js'; // <--- IMPORTACIÓN DE DATOS
import carrousel from './assets/components/carrousel.jsx'; // <--- IMPORTACIÓN DEL COMPONENTE CARRUSEL
import './i18n.js';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPlane } from '@fortawesome/free-solid-svg-icons';


{/* 
<FontAwesomeIcon icon={faPlane} />
*/}



// --- PLACEHOLDER DATA ---
const guatapeAcommodations = [
  { id: 1, name: "guatapeAccommodations.basicTitle", img: roomImg, desc: "guatapeAccommodations.basicDesc", stats: "guatapeAccommodations.basicStats" },
  { id: 2, name: "guatapeAccommodations.specialTitle", img: roomImg, desc: "guatapeAccommodations.specialDesc" , stats: "guatapeAccommodations.specialStats" },
  { id: 3, name: "guatapeAccommodations.deluxeTitle", img: roomImg, desc: "guatapeAccommodations.deluxeDesc", stats: "guatapeAccommodations.deluxeStats" }
];
const guatapeServices = [
  { id: 1, name: "guatapeActivities.RidingTitle", img: horsebackImg, desc: "guatapeActivities.RidingDesc", stats: "guatapeActivities.RidingStats" },
  { id: 2, name: "guatapeActivities.riverTitle", img: riverImg, desc: "guatapeActivities.riverDesc", stats: "guatapeActivities.riverStats" },
  { id: 3, name: "guatapeActivities.forestTrekTitle", img: hikingImg, desc: "guatapeActivities.forestTrekDesc", stats: "guatapeActivities.forestTrekStats" },
  { id: 4, name: "guatapeActivities.coffeFarmTitle", img: cacaoTourImg, desc: "guatapeActivities.coffeFarmDesc", stats: "guatapeActivities.coffeFarmStats" }
];

const sanRafaAcommodations = [
  { id: 1, name: "sanRafaAccommodations.basicTitle", img: roomImg, desc: "sanRafaAccommodations.basicDesc", stats: "sanRafaAccommodations.basicStats" },
  { id: 2, name: "sanRafaAccommodations.specialTitle", img: roomImg, desc: "sanRafaAccommodations.specialDesc", stats: "sanRafaAccommodations.specialStats" },
  { id: 3, name: "sanRafaAccommodations.deluxeTitle", img: roomImg, desc: "sanRafaAccommodations.deluxeDesc", stats: "sanRafaAccommodations.deluxeStats" }
];
const sanRafaServices = [
  { id: 1, name: "sanRafaActivities.RidingTitle", img: horsebackImg, desc: "sanRafaActivities.RidingDesc", stats: "sanRafaActivities.RidingStats" },
  { id: 3, name: "sanRafaActivities.forestTrekTitle", img: hikingImg, desc: "sanRafaActivities.forestTrekDesc", stats: "sanRafaActivities.forestTrekStats" },
  { id: 4, name: "sanRafaActivities.coffeFarmTitle", img: cacaoTourImg, desc: "sanRafaActivities.coffeFarmDesc", stats: "sanRafaActivities.coffeFarmStats" },
  { id: 5, name: "sanRafaActivities.birdWatchingTitle", img: birdImg, desc: "sanRafaActivities.birdWatchingDesc", stats: "sanRafaActivities.birdWatchingStats" }
];
const packages = [
  { id: 1, name: "packages.birdWatchingTitle", img: packImg, desc: "packages.birdWatchingDesc", stats: "packages.birdWatchingStats" },
  { id: 2, name: "packages.orientalTitle", img: packImg, desc: "packages.orientalDesc", stats: "packages.orientalStats" },
  { id: 3, name: "packages.riverTitle", img: packImg, desc: "packages.riverDesc", stats: "packages.riverStats" }
];


// --- MAIN APPLICATION COMPONENT ---
export default function BlucoApp() {
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
      [section]: !prev[section] // Invierte el valor (si es true pasa a false y viceversa)
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

  // Carrousel logic
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const listNode = listRef.current;
    if (listNode) {
      const imgNode = listNode.querySelectorAll('li > img')[currentIndex];
      if (imgNode) {
        imgNode.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentIndex]);

  const scrollToImage = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex(curr => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? 0 : curr - 1;
      });
    } else {
      const isLastSlide = currentIndex === data.length - 1;
      if (!isLastSlide) {
        setCurrentIndex(curr => curr + 1);
      }
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (currentView !== 'home') return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [currentView]);

  //function to handle language change

  const changeLang = (lng) => {
    i18n.changeLanguage(lng); // Cambia entre 'es' y 'en' al instante
  };

  return (
    <div className="app-container">
      {/* 1. HEADER */}
      <header className="header">
        <div
          className="logo-container"
          onClick={() => { setCurrentView('home'); setSelectedActivity(null); }}
        >
          <img src={logoFull} alt="Logo BLUCO" className="logo-img" />
        </div>
<nav className="nav-menu">
  {[
    { id: 'services', label: t('navbar.services') },
    { id: 'aboutus', label: t('navbar.about') },
    { id: 'contactus', label: t('navbar.contact') },
    { id: 'localproducts', label: t('navbar.products') }
  ].map((item) => (
    <button
      key={item.id}
      onClick={() => { setCurrentView(item.id); setSelectedActivity(null); }}
      className="nav-btn"
    >
      {item.label}
    </button>
  ))}
</nav>

        {/* Selector de idiomas para el turista */}
      <div className="lang-selector">
        <button onClick={() => changeLang('es')}>ES</button>
        <button onClick={() => changeLang('en')}>EN</button>
      </div>
      </header>

      {/* RENDERIZADO CONDICIONAL DE VISTAS */}
      <main className="main-content">
        <div className="main-container">
          {currentView === 'home' && (
            <div className="container">
              <div className="slider-container">
                <div className='leftArrow' onClick={() => scrollToImage('prev')}>&#10092;</div>
                <div className='rightArrow' onClick={() => scrollToImage('next')}>&#10093;</div>
                <div className="container-images">
                  <ul ref={listRef}>
                    {data.map((item) => (
                      <li key={item.id}>
                        <img src={item.img} width="100%" height="100%" alt={`Slide ${item.id}`} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="dots-container">
                  {data.map((_, idx) => (
                    <div key={idx}
                      className={`dot-container-item ${idx === currentIndex ? "active" : ""}`}
                      onClick={() => goToSlide(idx)}>
                      &#9865;
                    </div>))
                  }
                </div>
              </div>
            </div>
          )}

          {currentView === 'services' && (
            selectedActivity ? (
              <ActivityDetailView
                activity={selectedActivity}
                onBack={() => setSelectedActivity(null)}
              />
            ) : (
              <ActivitiesView
                onSelect={setSelectedActivity}
                onAdd={addToCart}
                openSections={openSections}
                toggleSection={toggleSection}
              />
            )
          )}

          {currentView === 'aboutus' && <AboutUsView />}
          {currentView === 'contactus' && <ContactUsView />}
          {currentView === 'localproducts' && <LocalProductsView />}
        </div>
      </main>

      {/* 3. FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <img src={logoFull} alt="Logo BLUCO" className="logo-img" style={{ filter: 'brightness(0) invert(1)' }} />
          </div>
          <div >
            <a href="https://wa.me/573184559655" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', fontSize: '4rem' } } >
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>
        </div>
      </footer>

      {/* FLOATING CART ICON */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="cart-floating-btn"
      >
        <span style={{ fontSize: '1.5rem' }}><FontAwesomeIcon icon={faPlane} rotation={-45} /></span>
        {cart.length > 0 && (
          <span className="cart-badge">
            {cart.length}
          </span>
        )}
      </button>

      {/* CART SIDEBAR / MY ITINERARY */}
      {isCartOpen && (
        <div className="cart-overlay">
          <div className="cart-sidebar">
            <div className="cart-header">
              <h2>{t('cart.title')}</h2>
              <button onClick={() => setIsCartOpen(false)} className="btn-close">&times;</button>
            </div>
            <div className="cart-items">
              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '2.5rem' }}>{t('cart.empty')}</p>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img src={item.img} alt={t(item.name)} className="cart-item-img" />
                    <span className="cart-item-name">{t(item.name)}</span>
                    <button onClick={() => removeFromCart(index)} className="btn-remove">
                      X
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="cart-footer">
              <button
                onClick={handleQuote}
                disabled={cart.length === 0}
                className="btn-quote"
              >
                {t("common.makeQuote")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUBCOMPONENTES DE VISTAS ---

// 4a. ACTIVITIES VIEW
function ActivitiesView({ onSelect, onAdd, openSections, toggleSection }) {
  const { t } = useTranslation();
  return (
    <div className="placesContainer">
      {/* ----------------------------- Botón Guatape ----------------------------- */}
      <div onClick={() => toggleSection('guatape')} className="guatape places">Guatapé</div>

      {openSections['guatape'] && (
        <div className="guatapeContainer servicesBackground">
          <div onClick={() => toggleSection('guatape-accom')} className="subPlaces">{t('common.accommodation')}</div>
          {openSections['guatape-accom'] &&
            <div className="section-container">
              <div className="grid-5-cols">
                {guatapeAcommodations.map((activity) => (
                  <div key={activity.id} className="card">
                    <img src={activity.img} alt={t(activity.name)} className="card-img" onClick={() => onSelect(activity)} />
                    <div className="card-body">
                      <h3 className="card-title">{t(activity.name)}</h3>
                      <div className="card-actions">
                        <button onClick={() => onSelect(activity)} className="btn-view">
                          &#128065; {t('common.viewMore')}
                        </button>
                        <button onClick={() => onAdd(activity)} className="btn-add">
                          {t('common.add')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }

          <div onClick={() => toggleSection('guatape-act')} className="subPlaces">{t('common.activities')}</div>
          {openSections['guatape-act'] &&
            <div className="guatapeContainer servicesBackground">
              {openSections['guatape-act'] &&
                <div className="section-container">
                  <div className="grid-5-cols ">
                    {guatapeServices.map((activity) => (
                      <div key={activity.id} className="card">
                        <img src={activity.img} alt={t(activity.name)} className="card-img" onClick={() => onSelect(activity)} />
                        <div className="card-body">
                          <h3 className="card-title">{t(activity.name)}</h3>
                          <div className="card-actions">
                            <button onClick={() => onSelect(activity)} className="btn-view">
                              &#128065; {t('common.viewMore')}
                            </button>
                            <button onClick={() => onAdd(activity)} className="btn-add">
                              {t('common.add')}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            </div>
          }
        </div>
      )}
      {/* ----------------------------- fin guatape ----------------------------- */}
      {/* ----------------------------- Botón San Rafael ----------------------------- */}
      <div onClick={() => toggleSection('sanrafael')} className="sanRafa places">San Rafael</div>

      {openSections['sanrafael'] && (
        <div className="sanRafaContainer servicesBackground">
          <div onClick={() => toggleSection('sanrafael-accom')} className="subPlaces">{t('common.accommodation')}</div>
          {openSections['sanrafael-accom'] &&
            <div className="section-container">
              <div className="grid-5-cols centered">
                {sanRafaAcommodations.map((activity) => (
                  <div key={activity.id} className="card">
                    <img src={activity.img} alt={t(activity.name)} className="card-img" onClick={() => onSelect(activity)} />
                    <div className="card-body">
                      <h3 className="card-title">{t(activity.name)}</h3>
                      <div className="card-actions">
                        <button onClick={() => onSelect(activity)} className="btn-view">
                          &#128065; {t('common.viewMore')}
                        </button>
                        <button onClick={() => onAdd(activity)} className="btn-add">
                          {t('common.add')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }

          <div onClick={() => toggleSection('sanrafael-act')} className="subPlaces">{t('common.activities')}</div>
          {openSections['sanrafael-act'] &&
            <div className="section-container">
              <div className="grid-5-cols">
                {sanRafaServices.map((activity) => (
                  <div key={activity.id} className="card">
                    <img src={activity.img} alt={t(activity.name)} className="card-img" onClick={() => onSelect(activity)} />
                    <div className="card-body">
                      <h3 className="card-title">{t(activity.name)}</h3>
                      <div className="card-actions">
                        <button onClick={() => onSelect(activity)} className="btn-view">
                          &#128065; {t('common.viewMore')}
                        </button>
                        <button onClick={() => onAdd(activity)} className="btn-add">
                          {t('common.add')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        </div>
      )}

      {/* ----------------------------- fin San Rafael ----------------------------- */}
      {/* ----------------------------- Inicio Paquetes ----------------------------- */}
      <div onClick={() => toggleSection('packages')} className="packages places ">{t('common.packages')}</div>

      {
        openSections['packages'] && (
          <div className="packagesContainer servicesBackground">
            <div className="section-container ">
              <div className="grid-5-cols ">
                {packages.map((activity) => (
                  <div key={activity.id} className="card">
                    <img src={activity.img} alt={t(activity.name)} className="card-img" onClick={() => onSelect(activity)} />
                    <div className="card-body">
                      <h3 className="card-title">{t(activity.name)}</h3>
                      <div className="card-actions">
                        <button onClick={() => onSelect(activity)} className="btn-view">
                          &#128065; {t('common.viewMore')}
                        </button>
                        {/* <a href="https://wa.me/573184559655" className="contact-icon"><button className="btn-add">  </button></a> */}
                        <button className="btn-add"> <a href="https://wa.me/573184559655">{t('common.makeQuote')}</a></button>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }
      {/* ----------------------------- fin Paquetes ----------------------------- */}

    </div>
  );
}

// 4b. ACTIVITY EXPANDED VIEW
function ActivityDetailView({ activity, onBack }) {
    const { t } = useTranslation();
  return (
    <div className="detail-container">
      <div className="detail-card">
        <div className="detail-img-wrapper">
          <img src={activity.img} alt={t(activity.name)} className="detail-img" />
        </div>
        <div className="detail-body">
          <h2 className="detail-title">{t(activity.name)}</h2>
          <div className="detail-stats">
            {t(activity.stats)}
          </div>
          <p className="detail-desc">
            {t(activity.desc)} [Detailed placeholder text for description. Here you can write extensive paragraphs about the itinerary, what to bring, and expectations.]
          </p>
          <button onClick={onBack} className="btn-back">
            {t('common.goBack')}
          </button>
        </div>
      </div>
    </div>
  );
}

// 4c. ABOUT US VIEW
function AboutUsView() {
  const { t } = useTranslation();

  return (
    <div className="text-view-container">
      <h2 className="text-view-title">{t('about.title')}</h2> 
      <p className="text-view-desc">
        {t('about.description')}
      </p>
    </div>
  );
}

// 4d. CONTACT US VIEW
function ContactUsView() {
  const { t } = useTranslation(); // <-- 1. Llamamos al hook aquí también

  return (
    <div className="text-view-container">
      <h2 className="text-view-title">{t('contact.title')}</h2>
      <div className="contact-icons">
        <a href="https://wa.me/573184559655" className="contact-icon whatsapp"><FontAwesomeIcon icon={faWhatsapp} /></a>
        <a href="#" className="contact-icon instagram"><FontAwesomeIcon icon={faInstagram} /></a>
        <a href="#" className="contact-icon envelope"><FontAwesomeIcon icon={faEnvelope} /></a>
      </div>
    </div>
  );
}

// 4e. LOCAL PRODUCTS VIEW
function LocalProductsView() {
  const { t } = useTranslation(); // <-- 1. Y aquí también

  return (
    <div className="section-container">
      <h2 className="section-title">{t('products.title')}</h2>
      <div className="grid-5-cols">
        {LOCAL_PRODUCTS.map((product) => (
          <div key={product.id} className="card">
            <img src={product.img} alt={t(product.name)} className="card-img" />
            <div className="card-body">
              <h3 className="card-title">{t(product.name)}</h3>
              <p className="product-desc">{t(product.desc)}</p>
              <div className="product-price">{t(product.price)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}