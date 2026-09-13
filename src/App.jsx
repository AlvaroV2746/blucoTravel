import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
import SchemaOrg from './components/SchemaOrg';
import WebVitalsReporter from './components/WebVitalsReporter';
import { generateWebsiteSchema, generateBreadcrumbList } from './utils/schemas';
import { resolveKey, toLocalizedPath, getRoute } from './utils/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const travelAgencySchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'BLUCO Travel',
  url: 'https://blucotravel.com',
  logo: 'https://blucotravel.com/logoFull.png',
  slogan: 'Turismo sostenible que conecta viajeros con la magia de Colombia',
  telephone: '+57-318-455-9655',
  email: 'info@blucotravel.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CO',
    addressRegion: 'Antioquia',
    addressLocality: 'Medellín',
  },
  areaServed: ['Guatapé', 'San Rafael', 'Antioquia', 'Colombia'],
  priceRange: '$$',
  currenciesAccepted: 'COP',
  description: 'Agencia de turismo sostenible especializada en experiencias auténticas en Guatapé y San Rafael. Alojamientos ecológicos, actividades de aventura y productos artesanales locales.',
  keywords: ['turismo sostenible', 'Guatapé', 'San Rafael', 'alojamiento', 'actividades', 'Colombia'],
  knowsAbout: [
    'Turismo sostenible',
    'Alojamientos ecológicos',
    'Experiencias de aventura',
    'Productos artesanales locales',
  ],
  sameAs: [
    'https://wa.me/573184559655',
    'https://instagram.com/blucotravel',
  ],
};

const GSC_VERIFICATION = 'VnbHtfXkXkX0h82I8aO2KSixPP2Nv7LLce9qKThjD8U';

const ServicesRoute = ({ onSelect, onAdd, openSections, toggleSection, selectedActivity }) => {
  return (
    <div>
      <ServicesPage
        onSelect={onSelect}
        onAdd={onAdd}
        openSections={openSections}
        toggleSection={toggleSection}
      />
      {selectedActivity && (
        <ActivityDetailView
          activity={selectedActivity}
          onBack={() => onSelect(null)}
        />
      )}
    </div>
  );
};

const BlucoApp = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const localized = toLocalizedPath(location.pathname, i18n.language);
    if (localized !== location.pathname) {
      navigate(localized, { replace: true });
    }
  }, [i18n.language, location.pathname, navigate]);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const addToCart = (activity) => {
    if (!cart.find(item => item.id === activity.id && item.type === activity.type)) {
      setCart([...cart, activity]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleQuote = (days, people, needsGuide) => {
    const activityNames = cart.map(item => t(item.name)).join('\n-');
    const guideText = needsGuide ? t('common.guideYes') : t('common.guideNo');

    const message = t('common.whatsappMessage', {
      activityNames,
      days,
      people,
      guideText
    });

    const text = encodeURIComponent(message);
    window.open(`https://wa.me/573184559655?text=${text}`, '_blank');
  };

  const baseUrl = 'https://blucotravel.com';
  const canonicalUrl = `${baseUrl}${location.pathname}`;
  const ogLocale = i18n.language === 'es' ? 'es_CO' : 'en_US';

  const esPath = toLocalizedPath(location.pathname, 'es');
  const enPath = toLocalizedPath(location.pathname, 'en');

  const navLabels = {
    services: t('navbar.services'),
    about: t('navbar.about'),
    contact: t('navbar.contact'),
    products: t('navbar.products'),
  };

  const routeKey = resolveKey(location.pathname);

  const breadcrumbs = generateBreadcrumbList([
    {
      name: t('navbar.home'),
      url: `${baseUrl}`,
    },
    ...(routeKey !== 'home' ? [{
      name: navLabels[routeKey] || '',
      url: `${baseUrl}${getRoute(i18n.language, routeKey)}`,
    }] : []),
  ]);

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        {GSC_VERIFICATION && GSC_VERIFICATION.startsWith('PEGA') ? null : (
          <meta name="google-site-verification" content={GSC_VERIFICATION} />
        )}
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="es" href={`${baseUrl}${esPath}`} />
        <link rel="alternate" hrefLang="en" href={`${baseUrl}${enPath}`} />
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BLUCO Travel" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@blucotravel" />
        <script type="application/ld+json">{JSON.stringify(travelAgencySchema)}</script>
      </Helmet>

      <SchemaOrg schema={[generateWebsiteSchema(), breadcrumbs]} />

      <WebVitalsReporter />

      <div className="max-w-8xl mx-auto">
        <a href="#main-content" className="skip-link">{t('a11y.skipToContent')}</a>
        <Navbar />

        <main className="pt-5" id="main-content">
          <div className="max-w-7xl mx-auto my-30">
            <Routes>
              <Route path="/" element={<HomePage onCartToggle={() => setIsCartOpen(true)} onNavigate={() => navigate(getRoute(i18n.language, 'services'))} />} />
              <Route path="/servicios" element={
                <ServicesRoute
                  onSelect={setSelectedActivity}
                  onAdd={addToCart}
                  openSections={openSections}
                  toggleSection={toggleSection}
                  selectedActivity={selectedActivity}
                />
              } />
              <Route path="/services" element={
                <ServicesRoute
                  onSelect={setSelectedActivity}
                  onAdd={addToCart}
                  openSections={openSections}
                  toggleSection={toggleSection}
                  selectedActivity={selectedActivity}
                />
              } />
              <Route path="/nosotros" element={<AboutPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/productos" element={<LocalProductsPage />} />
              <Route path="/products" element={<LocalProductsPage />} />
            </Routes>
          </div>
        </main>

        <Footer />

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
    </>
  );
};

export default BlucoApp;