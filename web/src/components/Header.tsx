import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Menu, X, User } from 'lucide-react';
// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';

const T: any = {
  EN: {
    status: "SYSTEM ONLINE",
    menu: { 
      manifesto: "MANIFESTO", 
      pricing: "COST OF TRUTH", 
      orchard: "ORCHARD (RADAR)", 
      help: "HELP & PHARMACY",
      login: "FOUNDER LOGIN"
    }
  },
  FR: {
    status: "SYSTÈME EN LIGNE",
    menu: { 
      manifesto: "MANIFESTE", 
      pricing: "COÛT DE LA VÉRITÉ", 
      orchard: "VERGER (RADAR)", 
      help: "AIDE & PHARMACIE",
      login: "ACCÈS FONDATEUR"
    }
  },
  DE: {
    status: "SYSTEM AKTIV",
    menu: { 
      manifesto: "MANIFEST", 
      pricing: "PREIS DER WAHRHEIT", 
      orchard: "OBSTGARTEN (RADAR)", 
      help: "HILFE & APOTHEKE",
      login: "GRÜNDER LOGIN"
    }
  },
  CZ: {
    status: "SYSTÉM AKTIVNÍ",
    menu: { 
      manifesto: "MANIFEST", 
      pricing: "CENA PRAVDY", 
      orchard: "SAD (RADAR)", 
      help: "POMOC & LÉKÁRNA",
      login: "VSTUP ZAKLADATELE"
    }
  }
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Funkce pro scroll na Pricing sekci (ZACHOVÁNO 1:1 DLE DUMPU)
  const handlePricingClick = () => {
    if (location.pathname === '/orchard' || location.pathname === '/') {
        const el = document.getElementById('pricing');
        if(el) el.scrollIntoView({behavior:'smooth'});
    } else {
        navigate('/orchard');
        setTimeout(() => {
            const el = document.getElementById('pricing');
            if(el) el.scrollIntoView({behavior:'smooth'});
        }, 500);
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b border-white/5 h-20 flex items-center justify-between px-6 ${
          scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        
        {/* LEFT: LOGO (ZACHOVÁNO) */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => navigate('/orchard')}
        >
          <div className="w-10 h-10 bg-[#cd5c09] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(205,92,9,0.3)]">
             <Shield size={20} className="text-black fill-black" />
          </div>
          <div className="hidden md:block text-left">
             <h1 className="text-white font-black tracking-tighter text-xl leading-none">AURA</h1>
             <p className="text-[9px] text-zinc-500 uppercase tracking-widest group-hover:text-[#cd5c09] transition-colors">
               {txt.status}
             </p>
          </div>
        </div>

        {/* CENTER: MENU (Desktop - ZACHOVÁNO) */}
        <nav className="hidden md:flex gap-8">
           <button 
             onClick={() => navigate('/manifesto')} 
             className={`text-xs font-bold transition-colors uppercase tracking-widest ${location.pathname === '/manifesto' ? 'text-[#cd5c09]' : 'text-zinc-500 hover:text-white'}`}
           >
             {txt.menu.manifesto}
           </button>
           
           <button 
             onClick={handlePricingClick} 
             className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest"
           >
             {txt.menu.pricing}
           </button>

           <button 
             onClick={() => navigate('/orchard')} 
             className={`text-xs font-bold transition-colors uppercase tracking-widest ${location.pathname === '/orchard' ? 'text-[#cd5c09]' : 'text-zinc-500 hover:text-white'}`}
           >
             {txt.menu.orchard}
           </button>

           <button 
             onClick={() => navigate('/help')} 
             className={`text-xs font-bold transition-colors uppercase tracking-widest flex items-center gap-2 ${location.pathname === '/help' ? 'text-green-500' : 'text-zinc-500 hover:text-green-400'}`}
           >
             {txt.menu.help}
           </button>
        </nav>

        {/* RIGHT: LOGIN & MOBILE (ZACHOVÁNO) */}
        <div className="flex items-center gap-4">
           {/* Founder Login Badge */}
           <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-full border border-zinc-800 hover:border-[#cd5c09] transition-colors cursor-pointer group">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase group-hover:text-white">
                {txt.menu.login}
              </span>
           </div>

           {/* Mobile Menu Icon */}
           <button onClick={toggleMenu} className="md:hidden text-white hover:text-[#cd5c09] transition-colors">
             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY (ZACHOVÁNO) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden animate-fade-in">
            <nav className="flex flex-col gap-8 text-center">
               <button onClick={() => { navigate('/manifesto'); toggleMenu(); }} className="text-2xl font-black text-white uppercase tracking-tighter hover:text-[#cd5c09]">
                 {txt.menu.manifesto}
               </button>
               
               <button onClick={() => { toggleMenu(); handlePricingClick(); }} className="text-2xl font-black text-white uppercase tracking-tighter hover:text-[#cd5c09]">
                 {txt.menu.pricing}
               </button>
               
               <button onClick={() => { navigate('/orchard'); toggleMenu(); }} className="text-2xl font-black text-white uppercase tracking-tighter hover:text-[#cd5c09]">
                 {txt.menu.orchard}
               </button>

               <button onClick={() => { navigate('/help'); toggleMenu(); }} className="text-2xl font-black text-green-500 uppercase tracking-tighter hover:text-white">
                 {txt.menu.help}
               </button>

               <div className="w-16 h-1 bg-zinc-800 mx-auto my-4"></div>
               
               <button className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center justify-center gap-2">
                 <User size={16}/> {txt.menu.login}
               </button>
            </nav>
        </div>
      )}
    </>
  );
};

export default Header;