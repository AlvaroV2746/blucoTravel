import React, { useState, useEffect } from 'react';
import logoFull from './assets/logos/logoFull.png';

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
  { id: 5, name: "Local Honey", price: "$10.00", img: "https://via.placeholder.com/200/1e3a8a/ffffff?text=Honey", desc: "Pure organic honey." }
];

const HERO_SLIDES = [
  { id: 1, title: "DISCOVER THE CLOUD FOREST", img: "https://images.unsplash.com/photo-1518182170546-076616fdfaaf?auto=format&fit=crop&w=1920&q=80" },
  { id: 2, title: "EXPERIENCE THE RIVERS", img: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&w=1920&q=80" },
  { id: 3, title: "SUPPORT LOCAL COMMUNITY", img: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1920&q=80" }
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

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 relative">

      {/* 1. HEADER */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md sticky top-0 z-50">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => { setCurrentView('home'); setSelectedActivity(null); }}
        >
          {/* Logo Placeholder - Reemplazar con <img src={image_0.png} /> */}
          <div className="text-3xl font-black tracking-tighter text-blue-900 flex items-center">
            <div className="flex items-center">
              <img
                src={logoFull}
                alt="Logo BLUCO"
                className="h-16 mr-2"
              />

            </div>
          </div>
        </div>
        <nav className="flex gap-6 font-semibold text-blue-900">
          {['ACTIVITIES', 'ABOUT US', 'CONTACT US', 'LOCAL PRODUCTS'].map((item) => (
            <button
              key={item}
              onClick={() => { setCurrentView(item.toLowerCase().replace(' ', '')); setSelectedActivity(null); }}
              className="hover:text-cyan-500 hover:underline decoration-cyan-500 decoration-2 underline-offset-4 transition-all uppercase"
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {/* RENDERIZADO CONDICIONAL DE VISTAS */}
      <main className="min-h-[80vh]">
        {currentView === 'home' && !selectedActivity && <HeroView setCurrentView={setCurrentView} />}
        {currentView === 'activities' && !selectedActivity && <ActivitiesView onSelect={setSelectedActivity} onAdd={addToCart} />}
        {selectedActivity && <ActivityDetailView activity={selectedActivity} onBack={() => setSelectedActivity(null)} />}
        {currentView === 'aboutus' && !selectedActivity && <AboutUsView />}
        {currentView === 'contactus' && !selectedActivity && <ContactUsView />}
        {currentView === 'localproducts' && !selectedActivity && <LocalProductsView />}
      </main>

      {/* 3. FOOTER */}
      <footer className="bg-blue-950 text-white p-8 mt-12">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="-ml-40">
            <img
              src={logoFull}
              alt="Logo BLUCO"
              className="h-16 mr-2"
            />
          </div>
          <div className="flex gap-4 items-center">
            <a href="https://wa.me/573184559655" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white transition-colors">
              <span className="text-3xl">📱</span> {/* Reemplazar con SVG de WhatsApp */}
            </a>
          </div>
        </div>
      </footer>

      {/* FLOATING CART ICON */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 bg-cyan-500 hover:bg-cyan-400 text-white p-4 rounded-full shadow-2xl z-40 flex items-center justify-center transition-transform hover:scale-110"
      >
        <span className="text-2xl">🛒</span>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-900 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </button>

      {/* CART SIDEBAR / MY ITINERARY */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-96 h-full shadow-2xl flex flex-col animate-slide-in">
            <div className="p-6 bg-blue-900 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold uppercase">My Itinerary</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-2xl hover:text-cyan-400">&times;</button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">No activities selected yet.</p>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 mb-4 border-b pb-4">
                    <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <span className="font-semibold text-blue-950">{item.name}</span>
                  </div>
                ))
              )}
            </div>
            <div className="p-6 bg-gray-50 border-t">
              <button
                onClick={handleQuote}
                disabled={cart.length === 0}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded transition-colors"
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
    <div className="relative h-[80vh] w-full overflow-hidden bg-blue-900 flex items-center justify-center">
      <img
        src={HERO_SLIDES[slideIndex].img}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-1000"
      />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-lg">
          {HERO_SLIDES[slideIndex].title}
        </h1>
        <button className="bg-cyan-500 hover:bg-cyan-400 text-blue-950 font-bold py-3 px-8 rounded-full text-lg transition-all shadow-lg hover:shadow-cyan-500/50">
          EXPLORE NOW
        </button>
      </div>
    </div>
  );
}

// 4a. ACTIVITIES VIEW (5 Columns)
function ActivitiesView({ onSelect, onAdd }) {
  return (
    <div className="max-w-7xl mx-auto py-12 px-8">
      <h2 className="text-3xl font-black text-blue-900 mb-8 uppercase border-b-4 border-cyan-400 inline-block pb-2">Our Activities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {ACTIVITIES.map((activity) => (
          <div key={activity.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-sky-100 hover:shadow-xl transition-shadow flex flex-col">
            <img src={activity.img} alt={activity.name} className="w-full h-40 object-cover cursor-pointer" onClick={() => onSelect(activity)} />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="font-bold text-blue-950 mb-4">{activity.name}</h3>
              <div className="flex justify-between items-center mt-auto">
                <button
                  onClick={() => onSelect(activity)}
                  className="flex items-center text-sm font-semibold text-cyan-600 hover:text-cyan-500"
                >
                  <span className="mr-1">👁️</span> VIEW MORE
                </button>
                <button
                  onClick={() => onAdd(activity)}
                  className="bg-blue-900 hover:bg-blue-800 text-white text-xs px-3 py-2 rounded transition-colors"
                >
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

// 4b. ACTIVITY EXPANDED VIEW (Modal/Ruta)
function ActivityDetailView({ activity, onBack }) {
  return (
    <div className="max-w-5xl mx-auto py-12 px-8 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-sky-100">
        {/* Placeholder para Carrusel de detalles */}
        <div className="h-96 bg-sky-200 w-full relative group">
          <img src={activity.img} alt={activity.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="text-white font-bold tracking-widest bg-black/50 px-4 py-2 rounded">[ EDITABLE IMAGE CAROUSEL PLACEHOLDER ]</span>
          </div>
        </div>
        <div className="p-10">
          <h2 className="text-4xl font-black text-blue-900 mb-4 uppercase">{activity.name}</h2>
          <div className="inline-block bg-sky-100 text-blue-800 px-4 py-2 rounded-full font-semibold mb-6">
            {activity.stats}
          </div>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {activity.desc} [Detailed placeholder text for description. Here you can write extensive paragraphs about the itinerary, what to bring, and expectations.]
          </p>
          <button
            onClick={onBack}
            className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 px-12 rounded shadow-lg transition-colors text-lg"
          >
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
    <div className="max-w-4xl mx-auto py-20 px-8 text-center">
      <h2 className="text-4xl font-black text-blue-900 mb-8 uppercase">Our Story</h2>
      <p className="text-xl text-gray-600 leading-relaxed">
        [Placeholder description for the company]. We are BLUCO, dedicated to community integration and eco-friendly tourism. Our mission is to connect travelers with authentic local experiences while preserving the natural beauty of our surroundings.
      </p>
    </div>
  );
}

// 4d. CONTACT US VIEW
function ContactUsView() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-8 text-center">
      <h2 className="text-4xl font-black text-blue-900 mb-12 uppercase">Contact Us</h2>
      <div className="flex justify-center gap-10">
        {/* Usando emojis como placeholders gráficos */}
        <a href="https://wa.me/573184559655" className="text-6xl hover:scale-110 transition-transform drop-shadow-md">📱</a>
        <a href="#" className="text-6xl hover:scale-110 transition-transform drop-shadow-md">📸</a>
        <a href="#" className="text-6xl hover:scale-110 transition-transform drop-shadow-md">🎵</a>
        <a href="#" className="text-6xl hover:scale-110 transition-transform drop-shadow-md">📧</a>
      </div>
    </div>
  );
}

// 4e. LOCAL PRODUCTS VIEW (5 Columns)
function LocalProductsView() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-8">
      <h2 className="text-3xl font-black text-blue-900 mb-8 uppercase border-b-4 border-cyan-400 inline-block pb-2">Our Community Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {LOCAL_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-sky-100 flex flex-col text-center hover:shadow-xl transition-shadow">
            <img src={product.img} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-blue-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-4 flex-1">{product.desc}</p>
              <div className="text-xl font-black text-cyan-600">{product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}