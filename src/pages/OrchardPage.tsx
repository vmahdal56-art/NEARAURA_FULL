import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Hammer, Zap, Share2, Smartphone, Download, HelpCircle, 
  Shield, ScanFace, ArrowRight, Magnet, Lock, Unlock, 
  QrCode, MessageCircle, Scan, Baby, Compass
} from 'lucide-react';

// --- COMPONENTS ---
import SoulGuard from '../components/SoulGuard';
import MemorialFooter from '../components/MemorialFooter';
import Header from '../components/Header';
import Manifesto from '../components/Manifesto'; 
import HeroSection from '../components/HeroSection'; 
import ManifestoPage from './ManifestoPage'; 
import PricingMatrix from '../components/PricingMatrix'; 
import DrAuraBubble from '../components/DrAuraBubble'; 
import Radar from '../components/Radar'; 

// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';
import { useGeneration } from '../context/GenerationalContext';

// --- TRANSLATIONS (EN/FR/DE/CZ) ---
const T: any = {
  EN: {
    radarA: "RADAR A: SOVEREIGN CODEX",
    radarB: "RADAR B: BIOMETRIC SYNC",
    kokos: "FIND PROPER HANDYMAN (MODULE KOKOS)",
    btns: { waitlist: "Waitlist", referrals: "Referrals", ios: "iOS App", android: "Android", faq: "FAQ" },
    valentine: "VALENTINE'S DAY IS OVER. ARCHIVE.",
    magnet: "MAGNETIC FIELD ACTIVE",
    safeMode: "SAFE MODE",
    dnaUnlocked: "DNA UNLOCKED",
    simulation: "⚠ SIMULATION MODE",
    unlock: "UNLOCK TERMINAL",
    boom: "BOOM.",
    street: "You know the feeling. You walk down the street. Suddenly... BOOM. You are drawn like a magnet. That is the force of Aura.",
    intent: "We just help the magnets snap together."
  },
  FR: {
    radarA: "RADAR A : CODEX SOUVERAIN",
    radarB: "RADAR B : SYNC BIOMÉTRIQUE",
    kokos: "TROUVER UN ARTISAN (MODULE KOKOS)",
    btns: { waitlist: "Liste d'attente", referrals: "Parrainages", ios: "App iOS", android: "Android", faq: "FAQ" },
    valentine: "LA SAINT-VALENTIN EST FINIE. ARCHIVE.",
    magnet: "CHAMP MAGNÉTIQUE ACTIF",
    safeMode: "MODE SÉCURISÉ",
    dnaUnlocked: "ADN DÉVERROUILLÉ",
    simulation: "⚠ MODE SIMULATION",
    unlock: "DÉVERROUILLER LE TERMINAL",
    boom: "BOUM.",
    street: "Vous connaissez cette sensation. Vous marchez dans la rue. Soudain... BOUM. C'est la force d'Aura.",
    intent: "Nous aidons simplement les aimants à s'encliqueter."
  },
  DE: {
    radarA: "RADAR A: SOUVERÄNER KODEX",
    radarB: "RADAR B: BIOMETRISCHE SYNCHRONISATION",
    kokos: "HANDWERKER FINDEN (MODUL KOKOS)",
    btns: { waitlist: "Warteliste", referrals: "Empfehlungen", ios: "iOS App", android: "Android", faq: "FAQ" },
    valentine: "VALENTINSTAG IST VORBEI. ARCHIV.",
    magnet: "MAGNETFELD AKTIV",
    safeMode: "SICHERER MODUS",
    dnaUnlocked: "DNA ENTSPERRT",
    simulation: "⚠ SIMULATIONSMODUS",
    unlock: "TERMINAL ENTSPERREN",
    boom: "KA-WUMM.",
    street: "Sie kennen das. Plötzlich... KA-WUMM. Wie ein Magnet.",
    intent: "Wir schließen den Stromkreis."
  },
  CZ: {
    radarA: "RADAR A: KODEX SVRCHOVANOSTI",
    radarB: "RADAR B: BIOMETRICKÁ SYNCHRONIZACE",
    kokos: "NAJÍT POCTIVÉHO ŘEMESLNÍKA (MODUL KOKOS)",
    btns: { waitlist: "Čekačka", referrals: "Doporučení", ios: "iOS App", android: "Android", faq: "FAQ" },
    valentine: "VALENTÝN SKONČIL. ARCHIV.",
    magnet: "MAGNETICKÉ POLE AKTIVNÍ",
    safeMode: "BEZPEČNÝ REŽIM",
    dnaUnlocked: "DNA ODEMČENA",
    simulation: "⚠ SIMULAČNÍ REŽIM",
    unlock: "ODEMKNOUT TERMINÁL",
    boom: "BOOM.",
    street: "Znáte to. Jdete po ulici. Najednou... BOOM. Přitahuje vás to jako magnet. To je síla Aury.",
    intent: "My jen pomáháme magnetům cvaknout k sobě."
  }
};

const OrchardPage = () => {
  const { lang } = useLanguage();
  const { world, userAge } = useGeneration();
  const txt = T[lang || 'EN'];
  const navigate = useNavigate();

  // --- LOGIKA KIDS (POCTIVÉ ZACHOVÁNÍ) ---
  if (world === 'KIDS') {
      return (
          <div className="min-h-screen bg-sky-400 flex flex-col items-center justify-center p-8 text-white text-center">
              <div className="bg-white/20 p-12 rounded-[4rem] backdrop-blur-md border-4 border-white">
                  {userAge <= 5 ? <Baby size={120} className="mx-auto mb-8 animate-bounce" /> : <Compass size={120} className="mx-auto mb-8 animate-spin-slow" />}
                  <h1 className="text-6xl font-black uppercase mb-4 tracking-tighter">Aura Junior</h1>
                  <p className="text-2xl font-bold italic">"Growing Truth, Step by Step."</p>
                  <button onClick={() => navigate('/gateway')} className="mt-12 bg-white text-sky-500 px-12 py-4 rounded-full font-black uppercase hover:scale-110 transition-transform">Back to Gate</button>
              </div>
          </div>
      );
  }

  // --- LOGIKA ADULT (ZACHOVÁNO 1:1) ---
  const [isVerified, setIsVerified] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [secretClicks, setSecretClicks] = useState(0);

  const handleDirectorOverride = () => {
    const newCount = secretClicks + 1;
    setSecretClicks(newCount);
    if (newCount >= 8) { 
        setIsVerified(true); 
        setSecretClicks(0); 
        setShowQrModal(false); 
    }
  };

  const handleScanSimulation = () => {
    setTimeout(() => { setIsVerified(true); setShowQrModal(false); }, 2000);
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <SoulGuard minScore={20}>
      <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-[#cd5c09] selection:text-black flex flex-col">
        <Header />
        
        <main className="flex-grow w-full pt-20">
          
          {/* SAFE MODE TOGGLE */}
          <div className="pt-6 pb-4 flex justify-center select-none animate-fade-in">
            <button onClick={handleDirectorOverride} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${isVerified ? 'bg-green-900/20 border-green-500 text-green-500' : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:bg-zinc-800'}`}>
                {isVerified ? <Unlock size={12}/> : <Lock size={12}/>}
                {isVerified ? txt.dnaUnlocked : txt.safeMode}
            </button>
          </div>

          {/* HERO SECTION */}
          <div className="py-12 relative text-center px-4">
             <div className="inline-block mb-8">
                <div className="bg-[#cd5c09]/10 border border-[#cd5c09] px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-[#cd5c09] animate-pulse">{txt.magnet}</div>
             </div>
             <div className="max-w-4xl mx-auto mb-12">
                <h1 className="text-6xl md:text-[7rem] font-black italic tracking-tighter leading-[0.9] text-white mb-6">{txt.boom}</h1>
                <p className="text-lg md:text-2xl text-zinc-400 font-serif italic leading-relaxed max-w-2xl mx-auto">"{txt.street}"</p>
                <div className="mt-6 flex items-center justify-center gap-2 text-[#cd5c09] text-xs uppercase tracking-widest"><MessageCircle size={14} /> <span>{txt.intent}</span></div>
             </div>
             <Manifesto />
          </div>

          {/* DUAL RADARS */}
          <section className="max-w-7xl mx-auto px-6 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className={`bg-zinc-900/30 p-8 rounded-[3rem] border border-zinc-800 relative overflow-hidden group hover:border-[#cd5c09] transition-all duration-500 flex flex-col items-center ${!isVerified && 'blur-sm opacity-50'}`}>
                  <h3 className="text-xl font-black text-white mb-8 uppercase tracking-widest flex items-center gap-3 w-full"><Shield size={24} className="text-[#cd5c09] animate-pulse-slow"/> {txt.radarA}</h3>
                  <div className="w-full max-w-md aspect-square relative"><Radar /></div>
              </div>
              <div className={`bg-zinc-900/30 p-8 rounded-[3rem] border border-zinc-800 relative overflow-hidden group hover:border-[#22D3EE] transition-all duration-500 flex flex-col items-center ${!isVerified && 'blur-sm opacity-50'}`}>
                  <h3 className="text-xl font-black text-white mb-8 uppercase tracking-widest flex items-center gap-3 w-full"><ScanFace size={24} className="text-[#22D3EE] animate-pulse-slow"/> {txt.radarB}</h3>
                  <div className="w-full max-w-md aspect-square relative grayscale group-hover:grayscale-0 transition-all duration-700"><Radar /></div>
              </div>
          </section>

          {/* UNLOCK OVERLAY */}
          {!isVerified && (
            <section className="max-w-4xl mx-auto px-6 mb-24 animate-fade-in-up -mt-48 relative z-20">
                <div className="bg-[#0A0A0A] border border-zinc-800 rounded-3xl p-8 md:p-12 relative overflow-hidden text-center shadow-2xl">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-sm z-50 animate-pulse">{txt.simulation}</div>
                    <div className="w-16 h-16 bg-[#cd5c09]/10 rounded-full flex items-center justify-center mx-auto mb-6"><Magnet size={32} className="text-[#cd5c09]"/></div>
                    <button onClick={() => setShowQrModal(true)} className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] hover:bg-[#cd5c09] hover:text-white transition-all shadow-xl flex items-center gap-2 mx-auto"><Scan size={20} /> {txt.unlock}</button>
                </div>
            </section>
          )}

          <HeroSection />
          <div id="pricing" className="py-24 bg-[#050505] border-y border-zinc-900"><PricingMatrix /></div>

          {/* NAV GRID */}
          <section className="grid grid-cols-2 md:grid-cols-5 border-y border-white/10 bg-black">
              {[
                { t: txt.btns.waitlist, c: "bg-[#F97316]", i: Zap },
                { t: txt.btns.referrals, c: "bg-[#22D3EE]", i: Share2 },
                { t: txt.btns.ios, c: "bg-[#8B5CF6]", i: Smartphone },
                { t: txt.btns.android, c: "bg-[#EC4899]", i: Download },
                { t: txt.btns.faq, c: "bg-slate-800", i: HelpCircle }
              ].map((btn) => (
                <button key={btn.t} className={`${btn.c} py-20 flex flex-col items-center justify-center gap-4 hover:brightness-125 transition-all border-r border-black/20 group`}>
                  <div className="text-white group-hover:scale-125 transition-transform"><btn.i size={40} className="drop-shadow-lg"/></div>
                  <span className="text-xl font-black italic tracking-widest text-white uppercase text-center px-2">{btn.t}</span>
                </button>
              ))}
          </section>

          {/* KOKOS LINK */}
          <section className="bg-black py-20 flex justify-center border-b border-zinc-900">
             <Link to="/kokos" className="group relative bg-zinc-900 border-2 border-zinc-700 text-white px-12 py-6 font-black text-xl uppercase tracking-widest hover:bg-[#eab308] hover:text-black hover:border-[#eab308] transition-all transform hover:scale-105 clip-path-polygon shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                <span className="flex items-center gap-4 text-center"><Hammer size={32} className="text-[#eab308] group-hover:text-black transition-colors" /> {txt.kokos}</span>
             </Link>
          </section>

          <div className="bg-black py-8 text-center border-b border-zinc-900/50">
            <button onClick={() => navigate('/valentine')} className="text-[10px] text-zinc-600 hover:text-red-500 uppercase tracking-widest font-bold flex items-center justify-center gap-2 mx-auto transition-colors group">
                <span>{txt.valentine}</span> <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>

          {/* MANIFESTO PAGE CONTENT */}
          <div className="bg-black text-zinc-400"><ManifestoPage /></div>
        </main>

        <MemorialFooter />
        <DrAuraBubble />

        {/* QR MODAL */}
        {showQrModal && (
            <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in p-6 text-center">
                <div className="bg-zinc-900 border border-[#cd5c09] p-8 rounded-3xl max-w-md w-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#cd5c09] animate-scan-down"></div>
                    <QrCode size={120} className="mx-auto text-white mb-6 cursor-pointer hover:scale-105 transition-transform" onClick={handleScanSimulation} />
                    <h2 className="text-2xl font-black text-white uppercase mb-2">SCAN DNA</h2>
                    <p className="text-zinc-500 text-xs mb-8">Tap QR to simulate hardware scan</p>
                    <button onClick={() => setShowQrModal(false)} className="mt-4 text-zinc-500 uppercase text-xs font-bold tracking-widest hover:text-white border border-zinc-800 px-6 py-2 rounded-full">CLOSE</button>
                </div>
            </div>
        )}
      </div>
    </SoulGuard>
  );
};

export default OrchardPage;