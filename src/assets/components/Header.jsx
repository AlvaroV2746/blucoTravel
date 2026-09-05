import React from 'react';
import logoFull from './assets/logos/logoFull.png'; 

export default function Header({ setCurrentView, setSelectedActivity }) {
  return (
    <header className="py-4 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div onClick={() => { setCurrentView('home'); setSelectedActivity(null); }} className="flex items-center gap-2">
          <img src={logoFull} alt="Logo BLUCO" className="h-8 w-auto" />
          <span className="text-xl font-bold tracking-wider">BLUCO</span>
        </div>
        <nav className="hidden sm:flex items-center gap-8">
          {['Activities', 'About', 'Contact', 'Products'].map((item) => (
            <button
              key={item}
              onClick={() => { setCurrentView(item.toLowerCase().replace(' ', '')); setSelectedActivity(null); }}
              className="px-4 py-2 text-sm font-medium text-gray-700 rounded hover:text-cyan-600 transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}