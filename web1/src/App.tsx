import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// IMPORTY STRÁNEK (Ty soubory, které jsme vytvořili v předchozím kroku)
// Ujisti se, že soubory existují ve složce src/pages/
import OathPage from './pages/OathPage';
import GatewayPage from './pages/GatewayPage';
import OrchardPage from './pages/OrchardPage';
import HelpPage from './pages/HelpPage';
import RootsPage from './pages/RootsPage';

export default function App() { 
  return ( 
    <BrowserRouter>
      <Routes>
        {/* 1. VSTUPNÍ BRÁNA (Slib / Oath) - První kontakt */}
        <Route path="/" element={<OathPage />} />
        
        {/* 2. ROZCESTNÍK (Marquee, Hymny) */}
        <Route path="/gateway" element={<GatewayPage />} />
        
        {/* 3. HLAVNÍ SEKCE */}
        <Route path="/orchard" element={<OrchardPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/roots" element={<RootsPage />} />
      </Routes>
    </BrowserRouter>
  ); 
}