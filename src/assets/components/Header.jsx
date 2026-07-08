import React from 'react';
import logoFull from './assets/logos/logoFull.png'; 

export default function Header({ setCurrentView, setSelectedActivity }) {
  return (
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
  );
}