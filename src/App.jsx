import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import './App.css'; // <--- IMPRESCINDIBLE PARA CONECTAR EL CSS
import logoFull from './assets/logos/logoFull.png';
import horsebackImg from './assets/images/horsebackRiding.jpg';
import cacaoTourImg from './assets/images/cacaoTour.jpg';
import riverImg from './assets/images/river.jpeg';
import { data } from './assets/components/data.js'; // <--- IMPORTACIÓN DE DATOS
import carrousel from './assets/components/carrousel.jsx'; // <--- IMPORTACIÓN DEL COMPONENTE CARRUSEL


// --- PLACEHOLDER DATA ---
const ACTIVITIES = [
  { id: 1, name: "Ecological Horseback Riding", img: "https://via.placeholder.com/300x200/0ea5e9/ffffff?text=Horseback", desc: "A beautiful ride through the ecological trails.", stats: "Duration: 3h | Difficulty: Easy" },
  { id: 2, name: "River Kayaking", img: "https://via.placeholder.com/300x200/0ea5e9/ffffff?text=Kayaking", desc: "Experience the thrill of the local rivers.", stats: "Duration: 2h | Difficulty: Medium" },
  { id: 3, name: "Cloud Forest Trek", img: "https://via.placeholder.com/300x200/0ea5e9/ffffff?text=Trekking", desc: "Discover the amazing biodiversity of the forest.", stats: "Duration: 5h | Difficulty: Hard" },
  { id: 4, name: "Coffee Farm Tour", img: "https://via.placeholder.com/300x200/0ea5e9/ffffff?text=Coffee+Tour", desc: "Learn the secrets of local coffee production.", stats: "Duration: 4h | Difficulty: Easy" },
  { id: 5, name: "Bird Watching", img: "https://via.placeholder.com/300x200/0ea5e9/ffffff?text=Bird+Watching", desc: "Spot exotic birds in their natural habitat.", stats: "Duration: 3h | Difficulty: Easy" }
];

const LOCAL_PRODUCTS = [
  { id: 1, name: "Handmade Poncho", price: "$45.00", img: "https://via.placeholder.com/200/1e3a8a/ffffff?text=Poncho", desc: "Traditional woven poncho." },
  { id: 2, name: "Organic Coffee Beans", price: "$15.00", img: "https://via.placeholder.com/200/1e3a8a/ffffff?text=Coffee", desc: "1lb of premium local coffee." },
  { id: 3, name: "Artisan Ceramic Mug", price: "$12.00", img: "https://via.placeholder.com/200/1e3a8a/ffffff?text=Mug", desc: "Hand-painted ceramic mug." },
  { id: 4, name: "Woven Bracelet", price: "$5.00", img: "https://via.placeholder.com/200/1e3a8a/ffffff?text=Bracelet", desc: "Colorful traditional bracelet." },
  { id: 5, name: "Local Honey", price: "$10.00", img: "https://via.placeholder.com/200/1e3a8a/ffffff?text=Honey", desc: "Pure organic honey." },
  { id: 6, name: "Handmade Poncho", price: "$45.00", img: "https://via.placeholder.com/200/1e3a8a/ffffff?text=Poncho", desc: "Traditional woven poncho." },
  { id: 7, name: "Organic Coffee Beans", price: "$15.00", img: "https://via.placeholder.com/200/1e3a8a/ffffff?text=Coffee", desc: "1lb of premium local coffee." },
  { id: 8, name: "Artisan Ceramic Mug", price: "$12.00", img: "https://via.placeholder.com/200/1e3a8a/ffffff?text=Mug", desc: "Hand-painted ceramic mug." },
  { id: 9, name: "Woven Bracelet", price: "$5.00", img: "https://via.placeholder.com/200/1e3a8a/ffffff?text=Bracelet", desc: "Colorful traditional bracelet." }
  
];

const HERO_SLIDES = [
  { id: 1, title: "Ecological Horseback Riding", img: horsebackImg },
  { id: 2, title: "Cacao Tour", img: cacaoTourImg },
  { id: 3, title: "Enjoy the rivers", img: riverImg }
];




// --- MAIN APPLICATION COMPONENT ---
export default function BlucoApp() {
  const [currentView, setCurrentView] = useState('home');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Funciones de Lógica
  const addToCart = (activity) => {
    if (!cart.find(item => item.id === activity.id)) {
      setCart([...cart, activity]);
    }
    setIsCartOpen(true);
  };

  const handleQuote = () => {
    const activityNames = cart.map(item => item.name).join(', ');
    const text = encodeURIComponent(`Hello, I would like to quote these activities: ${activityNames}`);
    window.open(`https://wa.me/573184559655?text=${text}`, '_blank');
  };

  //carrousel logic
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll('li > img')[currentIndex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest', // <--- ESTO ES LA CLAVE: evita que salte toda la página
        inline: 'center'  // Centra la imagen en el contenedor
      });

    }
  }, [currentIndex])

  const scrollToImage = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex(curr => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? 0 : curr - 1;
      })
    } else {
      const isLastSlide = currentIndex === data.length - 1;
      if (!isLastSlide) {
        setCurrentIndex(curr => curr + 1);
      }
    }
  }
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  }

  function HomeView({ listRef, dataCarrousel, scrollToImage, currentIndex, goToSlide }) {
    return (
      <div className="slider-container">
        <div className='leftArrow' onClick={() => scrollToImage('prev')}>&#10092;</div>
        <div className='rightArrow' onClick={() => scrollToImage('next')}>&#10093;</div>
        <div className="container-images">
          <ul ref={listRef}>
            {data.map((item) => (
              <li key={item.id}>
                <img src={item.img} width="100%" height="400" alt={`Slide ${item.id}`} />
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
            </div>
          ))}
        </div>
      </div>
    );
  }

  // END carrousel logic

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
          {['ACTIVITIES', 'ABOUT US', 'CONTACT US', 'LOCAL PRODUCTS'].map((item) => (
            <button
              key={item}
              onClick={() => { setCurrentView(item.toLowerCase().replace(' ', '')); setSelectedActivity(null); }}
              className="nav-btn"
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {/* RENDERIZADO CONDICIONAL DE VISTAS */}
<main className="main-content">
  <div className="main-container">
    {/* Aquí decides qué mostrar basándote en 'currentView' */}
    {currentView === 'home' && (
       <div className="container">
          <div className="slider-container">
            <div className='leftArrow' onClick={() => scrollToImage('prev')}>&#10092;</div>
            <div className='rightArrow' onClick={() => scrollToImage('next')}>&#10093;</div>
            <div className="container-images">
              <ul ref={listRef}>
                {data.map((item) => (
                  <li key={item.id}>
                    <img src={item.img} width="100%" height="500" alt={`Slide ${item.id}`} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="dots-container">
              {
                data.map((_, idx) => (
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
    
    {currentView === 'activities' && <ActivitiesView onSelect={setSelectedActivity} onAdd={addToCart} />}
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
          <div>
            <a href="https://wa.me/573184559655" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', fontSize: '2rem' }}>
              📱
            </a>
          </div>
        </div>
      </footer>

      {/* FLOATING CART ICON */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="cart-floating-btn"
      >
        <span style={{ fontSize: '1.5rem' }}>🛒</span>
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
              <h2>My Itinerary</h2>
              <button onClick={() => setIsCartOpen(false)} className="btn-close">&times;</button>
            </div>
            <div className="cart-items">
              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '2.5rem' }}>No activities selected yet.</p>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img src={item.img} alt={item.name} className="cart-item-img" />
                    <span className="cart-item-name">{item.name}</span>
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
                MAKE MY QUOTE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUBCOMPONENTES DE VISTAS ---

// 2. HERO VIEW
function HeroView() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-container">
      <img
        src={HERO_SLIDES[slideIndex].img}
        alt="Hero Background"
        className="hero-img"
      />
      <div className="hero-content">
        <h1 className="hero-title">
          {HERO_SLIDES[slideIndex].title}
        </h1>
        <button className="btn-primary">
          EXPLORE NOW
        </button>
      </div>
    </div>
  );
}

// 4a. ACTIVITIES VIEW
function ActivitiesView({ onSelect, onAdd }) {
  return (
    <div className="section-container">
      <h2 className="section-title">Our Activities</h2>
      <div className="grid-5-cols">
        {ACTIVITIES.map((activity) => (
          <div key={activity.id} className="card">
            <img src={activity.img} alt={activity.name} className="card-img" onClick={() => onSelect(activity)} />
            <div className="card-body">
              <h3 className="card-title">{activity.name}</h3>
              <div className="card-actions">
                <button onClick={() => onSelect(activity)} className="btn-view">
                  👁️ VIEW MORE
                </button>
                <button onClick={() => onAdd(activity)} className="btn-add">
                  ADD
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4b. ACTIVITY EXPANDED VIEW
function ActivityDetailView({ activity, onBack }) {
  return (
    <div className="detail-container">
      <div className="detail-card">
        <div className="detail-img-wrapper">
          <img src={activity.img} alt={activity.name} className="detail-img" />
        </div>
        <div className="detail-body">
          <h2 className="detail-title">{activity.name}</h2>
          <div className="detail-stats">
            {activity.stats}
          </div>
          <p className="detail-desc">
            {activity.desc} [Detailed placeholder text for description. Here you can write extensive paragraphs about the itinerary, what to bring, and expectations.]
          </p>
          <button onClick={onBack} className="btn-back">
            GO BACK
          </button>
        </div>
      </div>
    </div>
  );
}

// 4c. ABOUT US VIEW
function AboutUsView() {
  return (
    <div className="text-view-container">
      <h2 className="text-view-title">Our Story</h2>
      <p className="text-view-desc">
        [Placeholder description for the company]. We are BLUCO, dedicated to community integration and eco-friendly tourism. Our mission is to connect travelers with authentic local experiences while preserving the natural beauty of our surroundings.
      </p>
    </div>
  );
}

// 4d. CONTACT US VIEW
function ContactUsView() {
  return (
    <div className="text-view-container">
      <h2 className="text-view-title">Contact Us</h2>
      <div className="contact-icons">
        <a href="https://wa.me/573184559655" className="contact-icon">📱</a>
        <a href="#" className="contact-icon">📸</a>
        <a href="#" className="contact-icon">🎵</a>
        <a href="#" className="contact-icon">📧</a>
      </div>
    </div>
  );
}

// 4e. LOCAL PRODUCTS VIEW
function LocalProductsView() {
  return (
    <div className="section-container">
      <h2 className="section-title">Our Community Products</h2>
      <div className="grid-5-cols">
        {LOCAL_PRODUCTS.map((product) => (
          <div key={product.id} className="card">
            <img src={product.img} alt={product.name} className="card-img" />
            <div className="card-body">
              <h3 className="card-title">{product.name}</h3>
              <p className="product-desc">{product.desc}</p>
              <div className="product-price">{product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}