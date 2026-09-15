return (
    <div className="min-h-screen flex flex-col"> {/* 1. El contenedor raíz ahora abarca toda la pantalla en columna */}
      <Helmet titleTemplate="%s | BLUCO Travel">
        <html lang={i18n.language} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

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

      {/* 2. Este contenedor central ahora también es flexible y crece para ocupar todo el alto */}
      <div className="max-w-8xl mx-auto w-full flex flex-col flex-grow">
        <a href="#main-content" className="skip-link">{t('a11y.skipToContent')}</a>
        <Navbar />

        {/* 3. ¡El resorte! "flex-grow" hace que este main empuje al footer hacia abajo si sobra pantalla */}
        <main className="pt-5 flex-grow" id="main-content">
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
      </div>

      {/* Botón flotante y carrito se quedan afuera del flujo principal para no estorbar */}
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