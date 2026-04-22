import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// --- KONTEXTY ---
import { LanguageProvider } from './context/LanguageContext';
import { GenerationalProvider } from './context/GenerationalContext';

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
    localStorage.setItem('auratrix_hardware_auth', 'TRUE');
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
              {/* --- 1. ZÁKLADNÍ FLOW --- */}
              <Route path="/" element={<OathPage />} />
              <Route path="/gateway" element={<GatewayPage />} />
              <Route path="/5truestory" element={<TrueStoryPage />} /> 
              
              {/* --- 2. THE TRINITY (MENU) --- */}
              <Route path="/orchard" element={<OrchardPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/roots" element={<RootsPage />} />

              {/* --- 3. ARCHIV A AI --- */}
              <Route path="/auranet" element={<AuraNetPage />} />
              <Route path="/auratrix" element={<AuratrixPage />} />

              {/* --- 4. FUNKČNÍ STRÁNKY --- */}
              <Route path="/confessional" element={<DrAuraConfessional />} />
              <Route path="/pharmacy" element={<PharmacyPage />} />
              <Route path="/soul-test" element={<SoulTestPage />} />
              <Route path="/manifesto" element={<ManifestoPage />} />
              <Route path="/valentine" element={<ValentinePage />} />
              <Route path="/security" element={<SecurityPortal />} />
              <Route path="/soul-guard" element={<SoulGuard />} />
              <Route path="/geezers" element={<Geezers />} />
              <Route path="/mentality" element={<Mentality />} />
              <Route path="/matrix" element={<Matrix />} />
              <Route path="/kokos" element={<KokosPage />} />

              {/* --- 5. HELP PROCES --- */}
              <Route path="/help/payment" element={<HelpPaymentPage />} />
              <Route path="/help/ready" element={<HelpReadyToSendPage />} />
              
              {/* --- 6. SOVEREIGN SEKCE --- */}
              <Route path="/dashboard" element={<SovereignDashboard />} />
              <Route path="/sovereign" element={<SovereignHome />} />

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