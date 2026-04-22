import { JuniorRoute } from './routing/JuniorRoute';
import JuniorOrchard from './pages/junior/JuniorOrchard';
import DnaQuizL1 from './pages/junior/DnaQuizL1';
import DnaQuizL2 from './pages/junior/DnaQuizL2';
import JuniorManual from './pages/junior/JuniorManual';
import JuniorArchive from './pages/junior/JuniorArchive';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// --- KONTEXTY ---
import { LanguageProvider } from './context/LanguageContext';
import { GenerationalProvider } from './context/GenerationalContext';

// --- DOPLNĚNÉ JISTIČE (NAŠE OCEL) ---
import { ProtectedRoute } from './routing/ProtectedRoute';
import { Ledger } from './utils/storage';

// --- GLOBÁLNÍ KOMPONENTY ---
import MemorialFooter from './components/MemorialFooter';
import TruthSubtitles from './components/TruthSubtitles';
import DrAuraBubble from './components/DrAuraBubble';
import AgeGate from './components/AgeGate'; // TVŮJ NOVÝ MOST

// --- IMPORTY STRÁNEK ---
import OathPage from './pages/OathPage';
import GatewayPage from './pages/GatewayPage';
import OrchardPage from './pages/OrchardPage';
import HelpPage from './pages/HelpPage';
import RootsPage from './pages/RootsPage';
import AuraNetPage from './pages/AuraNetPage'; 
import AuratrixPage from './pages/AuratrixPage';
import TrueStoryPage from './pages/TrueStoryPage';

// --- DALŠÍ STRÁNKY ---
import DrAuraConfessional from './pages/DrAuraConfessional';
import HelpPaymentPage from './pages/HelpPaymentPage';
import HelpReadyToSendPage from './pages/HelpReadyToSendPage';
import KokosPage from './pages/KokosPage';
import ManifestoPage from './pages/ManifestoPage';
import Matrix from './pages/Matrix';
import Mentality from './pages/Mentality';
import PharmacyPage from './pages/PharmacyPage';
import SecurityPortal from './pages/SecurityPortal';
import SoulGuard from './pages/SoulGuard';
import SoulTestPage from './pages/SoulTestPage';
import SovereignDashboard from './pages/SovereignDashboard';
import SovereignHome from './pages/SovereignHome';
import ValentinePage from './pages/ValentinePage';
import Geezers from './pages/Geezers';

export default function App() { 
  const [authState, setAuthState] = useState<'LOCKED' | 'AUTHENTICATED'>('LOCKED');

  // PERZISTENCE: Aby geezer nemusel skenovat při každém kliku
  useEffect(() => {
    const savedAuth = localStorage.getItem('auratrix_hardware_auth');
    if (savedAuth === 'TRUE') setAuthState('AUTHENTICATED');
  }, []);

  const handleAuthSuccess = () => {
    // Původní logika zachována
    localStorage.setItem('auratrix_hardware_auth', 'TRUE');
    
    // DOPLNĚNO: Synchronizace s novým Ledgerem, aby ProtectedRoute pustila provoz
    Ledger.set('AUTH', 'AUTHENTICATED');
    Ledger.set('OATH', 'signed'); 

    setAuthState('AUTHENTICATED');
  };

  return ( 
    <LanguageProvider>
      <GenerationalProvider>
        <div className="min-h-screen bg-black flex flex-col relative text-zinc-300 font-sans overflow-hidden">
          
          {/* 1. VRSTVA: MLHA (ZACHOVÁNO VŠE PŮVODNÍ) */}
          <div className={`flex-grow transition-all duration-[2000ms] ease-in-out ${
            authState === 'LOCKED' ? 'blur-[45px] scale-105 pointer-events-none' : 'blur-0 scale-100'
          }`}>
            <Routes>
              {/* --- 1. ZÁKLADNÍ FLOW (VEŘEJNÝ VSTUP) --- */}
              <Route path="/" element={<OathPage />} />
              <Route path="/gateway" element={<GatewayPage />} />
              <Route path="/5truestory" element={<TrueStoryPage />} /> 
              <Route path="/manifesto" element={<ManifestoPage />} />
              
              {/* --- 2. THE TRINITY (MENU) - CHRÁNĚNO TREZOREM --- */}
              <Route path="/orchard" element={<ProtectedRoute><OrchardPage /></ProtectedRoute>} />
              <Route path="/help" element={<ProtectedRoute><HelpPage /></ProtectedRoute>} />
              <Route path="/roots" element={<ProtectedRoute><RootsPage /></ProtectedRoute>} />

              {/* --- 3. ARCHIV A AI - CHRÁNĚNO --- */}
              <Route path="/auranet" element={<ProtectedRoute><AuraNetPage /></ProtectedRoute>} />
              <Route path="/auratrix" element={<ProtectedRoute><AuratrixPage /></ProtectedRoute>} />

              {/* --- 4. FUNKČNÍ STRÁNKY - CHRÁNĚNO --- */}
              <Route path="/confessional" element={<ProtectedRoute><DrAuraConfessional /></ProtectedRoute>} />
              <Route path="/pharmacy" element={<ProtectedRoute><PharmacyPage /></ProtectedRoute>} />
              <Route path="/soul-test" element={<ProtectedRoute><SoulTestPage /></ProtectedRoute>} />
              <Route path="/valentine" element={<ProtectedRoute><ValentinePage /></ProtectedRoute>} />
              <Route path="/security" element={<ProtectedRoute><SecurityPortal /></ProtectedRoute>} />
              <Route path="/soul-guard" element={<ProtectedRoute><SoulGuard /></ProtectedRoute>} />
              <Route path="/geezers" element={<ProtectedRoute><Geezers /></ProtectedRoute>} />
              <Route path="/mentality" element={<ProtectedRoute><Mentality /></ProtectedRoute>} />
              <Route path="/matrix" element={<ProtectedRoute><Matrix /></ProtectedRoute>} />
              <Route path="/kokos" element={<ProtectedRoute><KokosPage /></ProtectedRoute>} />

{/* --- JUNIOR SEKCE (TVRDÝ ZÁMEK PRO OGAŘE) --- */}
<Route path="/junior" element={<JuniorRoute><JuniorOrchard /></JuniorRoute>} />
<Route path="/junior/quiz-l1" element={<JuniorRoute><DnaQuizL1 /></JuniorRoute>} />
<Route path="/junior/quiz-l2" element={<JuniorRoute><DnaQuizL2 /></JuniorRoute>} />
<Route path="/junior/manual" element={<JuniorRoute><JuniorManual /></JuniorRoute>} />
<Route path="/junior/archive" element={<JuniorRoute><JuniorArchive /></JuniorRoute>} />

              {/* --- 5. HELP PROCES - CHRÁNĚNO --- */}
              <Route path="/help/payment" element={<ProtectedRoute><HelpPaymentPage /></ProtectedRoute>} />
              <Route path="/help/ready" element={<ProtectedRoute><HelpReadyToSendPage /></ProtectedRoute>} />
              
              {/* --- 6. SOVEREIGN SEKCE - CHRÁNĚNO --- */}
              <Route path="/dashboard" element={<ProtectedRoute><SovereignDashboard /></ProtectedRoute>} />
              <Route path="/sovereign" element={<ProtectedRoute><SovereignHome /></ProtectedRoute>} />

              {/* --- 404 --- */}
              <Route path="*" element={<Navigate to="/gateway" replace />} />
            </Routes>

            <MemorialFooter />
            <TruthSubtitles />
            <DrAuraBubble />
          </div>

          {/* 2. VRSTVA: BRÁNA (MOST) */}
          {authState === 'LOCKED' && (
            <AgeGate onScanSuccess={handleAuthSuccess} />
          )}

          {/* 3. VRSTVA: PLNÉ APK (POUZE PRO OVĚŘENÉ) */}
          {authState === 'AUTHENTICATED' && (
             <div className="fixed bottom-10 right-10 z-[100] animate-pulse">
                <a 
                  href="/auratrust-pro-v2.apk" 
                  className="bg-[#cd5c09] text-black px-6 py-3 font-black uppercase text-[10px] shadow-[0_0_40px_rgba(205,92,9,0.4)] hover:bg-white transition-all border-2 border-white/20"
                >
                  Download Full APK
                </a>
             </div>
          )}
          
        </div>
      </GenerationalProvider>
    </LanguageProvider>
  );
}