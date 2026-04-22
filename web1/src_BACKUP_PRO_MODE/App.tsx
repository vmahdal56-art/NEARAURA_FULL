import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// IMPORTY NAŠICH NOVÝCH STRÁNEK
import OathPage from './pages/OathPage';
import GatewayPage from './pages/GatewayPage';

// ZDE BY MĚLY BÝT IMPORTY PRO ORCHARD, HELP, ROOTS (pokud je máš v souborech)
// Pokud ne, musíme je definovat zde nebo vytvořit soubory.
// PRO ÚČELY TOHOTO MERGE PONECHÁVÁM PROVIZORNĚ TYTO KOMPONENTY ZDE (ZJEDNODUŠENÉ),
// ALE IDEÁLNĚ JE PŘESUŇ DO 'pages/OrchardPage.tsx' atd.

import OrchardPage from './pages/OrchardPage'; // Předpokládám, že vytvoříš/existuje
import HelpPage from './pages/HelpPage';       // Předpokládám, že vytvoříš/existuje
import RootsPage from './pages/RootsPage';     // Předpokládám, že vytvoříš/existuje

// Pokud ty soubory ještě neexistují, dej vědět, vygeneruji je.
// Pro teď předpokládám, že "Gateway" a "Oath" byly ten hlavní problém.

export default function App() { 
  return ( 
    <BrowserRouter>
      <Routes>
        {/* 1. VSTUPNÍ STRÁNKA = OATH (SLIB) */}
        <Route path="/" element={<OathPage />} />
        
        {/* 2. HLAVNÍ ROZCESTNÍK */}
        <Route path="/gateway" element={<GatewayPage />} />
        
        {/* 3. PODSTRÁNKY */}
        <Route path="/orchard" element={<OrchardPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/roots" element={<RootsPage />} />
      </Routes>
    </BrowserRouter>
  ); 
}