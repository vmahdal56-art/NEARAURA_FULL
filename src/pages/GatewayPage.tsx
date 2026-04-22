import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Lock, Activity, Heart, Clock, Mic, Shield } from 'lucide-react';

// IMPORT DAT
import { ANTHEMS, LYRICS_DATA } from '../data/anthems';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import MemorialFooter from '../components/MemorialFooter';

const T: any = {
  EN: { logo: "NEAR", aura: "AURA", orchard: "ORCHARD", help: "HELP", roots: "ROOTS", waiting: "WAITING...", auranet: "AURANET", auratrix: "AURATRIX" },
  CZ: { logo: "NEAR", aura: "AURA", orchard: "SAD", help: "POMOC", roots: "KOŘENY", waiting: "ČEKÁM...", auranet: "AURANET", auratrix: "AURATRIX" },
  FR: { logo: "NEAR", aura: "AURA", orchard: "VERGER", help: "AIDE", roots: "RACINES", waiting: "EN ATTENTE...", auranet: "AURANET", auratrix: "AURATRIX" },
  DE: { logo: "NEAR", aura: "AURA", orchard: "GARTEN", help: "HILFE", roots: "WURZELN", waiting: "WARTE...", auranet: "AURANET", auratrix: "AURATRIX" }
};

const ScrollingLyrics = ({ sourceKey, lang, delay, textArray }: any) => {
  const [secondsLeft, setSecondsLeft] = useState(delay || 10);
  const [startScroll, setStartScroll] = useState(false);
  const { lang: currentLang } = useLanguage();
  
  const cLang = (currentLang || 'EN').toUpperCase();
  const txt = T[cLang] || T.EN;

  useEffect(() => {
    setSecondsLeft(delay || 10);
    setStartScroll(false);
    const interval = setInterval(() => {
      setSecondsLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(interval);
          setStartScroll(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [delay, sourceKey]);

  const anthem = ANTHEMS[sourceKey as keyof typeof ANTHEMS];
  const artistName = anthem?.artist || 'UNKNOWN';
  const duration = anthem?.duration || 260;
  const colorClass = anthem?.color || 'text-white';

  if (!startScroll) {
     return (
       <div className="absolute inset-0 bg-black/90 z-[40] flex items-center justify-center border border-zinc-800 backdrop-blur-sm pointer-events-none">
         <div className="flex flex-col items-center gap-4 animate-pulse">
            <Mic size={32} className="text-zinc-500" />
            <h3 className="text-5xl font-black text-white font-mono tracking-tighter">{secondsLeft}<span className="text-sm align-top text-zinc-600">s</span></h3>
            <span className={`text-[10px] font-mono uppercase tracking-[0.3em] ${colorClass}`}>{txt?.waiting || 'WAITING'}</span>
         </div>
       </div>
     );
  }

  return (
    <div className="absolute inset-0 bg-black/90 z-[40] overflow-hidden flex flex-col items-center border border-zinc-800 backdrop-blur-sm pointer-events-none">
       <div className="absolute top-0 w-full bg-gradient-to-b from-black via-black to-transparent p-4 z-[60] text-center">
          <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${colorClass}`}>
             {lang} SUBTITLES • {artistName}
          </span>
       </div>
       <div className="w-full px-4 text-center will-change-transform" style={{ animation: `scrollUp ${duration}s linear forwards`, paddingTop: '80%' }}>
          {(textArray || []).map((line: string, i: number) => (
            <p key={i} className={`text-xl md:text-2xl font-black uppercase tracking-wide my-6 leading-tight ${line.includes('---') ? 'text-zinc-700 text-xs tracking-[0.5em] my-12' : 'text-white'}`}>
              {line}
            </p>
          ))}
          <div className="h-[50vh]"></div>
       </div>
    </div>
  );
};

const GatewayPage = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  
  const safeLang = (lang || 'EN').toUpperCase();
  const txt = T[safeLang] || T.EN;

  const [activeAnthem, setActiveAnthem] = useState<keyof typeof ANTHEMS | null>(null);
  const [bassPulse, setBassPulse] = useState(0);

  useEffect(() => {
    let pulseInterval: any;
    if (activeAnthem) {
      pulseInterval = setInterval(() => setBassPulse(Math.random() * 30 + 10), 300);
    } else {
      setBassPulse(0);
    }
    return () => clearInterval(pulseInterval);
  }, [activeAnthem]);

  // FUNKCE PRO PLAY (STOP PROPAGATION JE KLÍČ)
  const handlePlayClick = (key: keyof typeof ANTHEMS, e: React.MouseEvent) => {
    e.stopPropagation(); // Tímhle řekneš prohlížeči: "Neklikej na to okno pod tím, klikni jen na mě"
    setActiveAnthem(activeAnthem === key ? null : key);
  };

  const getLyrics = (key: string, langCode: string) => {
    if (LYRICS_DATA && LYRICS_DATA[key as keyof typeof LYRICS_DATA]) {
      // @ts-ignore
      return LYRICS_DATA[key][langCode.toLowerCase()] || ["TEXT NOT FOUND"];
    }
    return ["..."];
  };

  const getGlowStyle = (key: keyof typeof ANTHEMS) => {
    const colorMap: any = {
      'text-[#FFD700]': '#FFD700',
      'text-[#10b981]': '#10b981',
      'text-[#22D3EE]': '#22D3EE'
    };
    const hex = ANTHEMS[key] ? (colorMap[ANTHEMS[key].color] || '#ffffff') : '#ffffff';
    
    if (activeAnthem === key) {
       return { boxShadow: `inset 0 0 ${bassPulse}px ${hex}`, borderTop: `4px solid ${hex}` };
    }
    return { borderTop: `2px solid ${hex}44` }; 
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center overflow-x-hidden">
      <style>{`
        @keyframes scrollUp { 0% { transform: translateY(0); } 100% { transform: translateY(-100%); } }
        .will-change-transform { will-change: transform; }
      `}</style>

      {/* YT ENGINE */}
      <div className="absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none">
        {activeAnthem && ANTHEMS[activeAnthem] && (
          <iframe width="1" height="1" src={`https://www.youtube.com/embed/${ANTHEMS[activeAnthem].id}?autoplay=1&mute=0&enablejsapi=1`} allow="autoplay"></iframe>
        )}
      </div>

      <div className="w-full flex-grow flex flex-col relative">
         
         {/* HEADER */}
         <div className="w-full bg-black z-50 border-b border-zinc-900 sticky top-0 h-24 relative flex items-center justify-between px-6">
             <div className="flex items-center gap-1 z-20 select-none">
                <span className="text-2xl font-black tracking-tighter text-white uppercase">{txt?.logo || 'NEAR'}</span>
                <span className="text-2xl font-black tracking-tighter text-[#cd5c09] uppercase">{txt?.aura || 'AURA'}</span>
             </div>
             
             <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full md:w-auto text-center hidden md:block">
                <div className="flex items-center justify-center gap-6 bg-black/90 px-8 py-3 rounded-full border border-zinc-800/80 backdrop-blur-md shadow-2xl">
                    <div onClick={() => navigate('/orchard')} className="cursor-pointer text-xs font-black text-[#FFD700] hover:text-white hover:scale-110 transition-all tracking-widest uppercase drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">{txt?.orchard || 'ORCHARD'}</div>
                    <div onClick={() => navigate('/help')} className="cursor-pointer text-xs font-black text-[#10b981] hover:text-white hover:scale-110 transition-all tracking-widest uppercase drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]">{txt?.help || 'HELP'}</div>
                    <div onClick={() => navigate('/roots')} className="cursor-pointer text-xs font-black text-[#22D3EE] hover:text-white hover:scale-110 transition-all tracking-widest uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">{txt?.roots || 'ROOTS'}</div>
                    <div className="w-px h-4 bg-zinc-700 mx-2"></div>
                    <div onClick={() => navigate('/auranet')} className="cursor-pointer text-xs font-black text-zinc-500 hover:text-[#cd5c09] transition-all tracking-widest uppercase flex items-center gap-1 group">{txt?.auranet || 'AURANET'} <Lock size={10} className="group-hover:text-[#cd5c09]"/></div>
                    <div onClick={() => navigate('/auratrix')} className="cursor-pointer text-xs font-black text-zinc-500 hover:text-[#cd5c09] transition-all tracking-widest uppercase flex items-center gap-1 group">{txt?.auratrix || 'AURATRIX'} <Lock size={10} className="group-hover:text-[#cd5c09]"/></div>
                </div>
             </div>

             <div className="z-20"><LanguageToggle /></div>
         </div>

         {/* MAIN WINDOWS */}
         <main className="flex-grow w-full flex flex-col lg:flex-row h-[75vh]">
            
            {/* LEFT (ENTER ORCHARD) */}
            <div 
              className="relative w-full lg:w-1/3 flex flex-col items-center justify-center border-r border-zinc-900 bg-black overflow-hidden group cursor-pointer transition-all duration-500" 
              onClick={() => navigate('/orchard')} 
              style={getGlowStyle('left')}
            >
              {activeAnthem && activeAnthem !== 'left' && <ScrollingLyrics sourceKey={activeAnthem} lang="CZ" delay={ANTHEMS.left?.vocalDelay} textArray={getLyrics(activeAnthem, 'cz')} />}
              
              <div className="text-center z-10 p-8 transform group-hover:scale-105 transition-transform duration-500">
                <Activity size={64} className={`mx-auto mb-6 ${ANTHEMS.left.color} ${activeAnthem === 'left' ? 'animate-pulse drop-shadow-[0_0_25px_rgba(255,215,0,0.8)]' : 'drop-shadow-[0_0_5px_rgba(255,215,0,0.3)]'}`} />
                <h2 className={`text-5xl font-black uppercase mb-2 tracking-tighter leading-none ${ANTHEMS.left.color} drop-shadow-lg`}>ENTER<br/>ORCHARD</h2>
                <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 mb-6">(TRUTH PREVAILS)</p>
                
                {/* TLAČÍTKO PLAY - ODDĚLENÉ OD KLIKNUTÍ NA OKNO */}
                <div 
                   onClick={(e) => handlePlayClick('left', e)}
                   className={`inline-flex items-center gap-3 px-8 py-4 rounded-full border border-zinc-800 bg-zinc-900/90 backdrop-blur-md hover:bg-zinc-800 transition-all relative z-[50] hover:scale-110 cursor-pointer shadow-lg`}
                >
                   {activeAnthem === 'left' ? <Pause className="text-[#FFD700]" size={24}/> : <Play className="text-[#FFD700]" size={24}/>}
                </div>
              </div>
            </div>

            {/* CENTER (BE THE HELP) */}
            <div 
              className="relative w-full lg:w-1/3 flex flex-col items-center justify-center border-r border-zinc-900 bg-black overflow-hidden group cursor-pointer transition-all duration-500" 
              onClick={() => navigate('/help')} 
              style={getGlowStyle('center')}
            >
              {activeAnthem && activeAnthem !== 'center' && <ScrollingLyrics sourceKey={activeAnthem} lang="CZ" delay={ANTHEMS.center?.vocalDelay} textArray={getLyrics(activeAnthem, 'cz')} />}
              
              <div className="text-center z-10 p-8 transform group-hover:scale-105 transition-transform duration-500">
                <Heart size={64} className={`mx-auto mb-6 ${ANTHEMS.center.color} ${activeAnthem === 'center' ? 'animate-bounce drop-shadow-[0_0_25px_rgba(16,185,129,0.8)]' : 'drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]'}`} />
                <h2 className={`text-5xl font-black uppercase mb-2 tracking-tighter leading-none ${ANTHEMS.center.color} drop-shadow-lg`}>BE THE<br/>HELP</h2>
                <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 mb-6">(HEAVENS GATES)</p>
                
                {/* TLAČÍTKO PLAY */}
                <div 
                   onClick={(e) => handlePlayClick('center', e)}
                   className={`inline-flex items-center gap-3 px-8 py-4 rounded-full border border-zinc-800 bg-zinc-900/90 backdrop-blur-md hover:bg-zinc-800 transition-all relative z-[50] hover:scale-110 cursor-pointer shadow-lg`}
                >
                   {activeAnthem === 'center' ? <Pause className="text-[#10b981]" size={24}/> : <Play className="text-[#10b981]" size={24}/>}
                </div>
              </div>
            </div>

            {/* RIGHT (THE ROOTS) */}
            <div 
              className="relative w-full lg:w-1/3 flex flex-col items-center justify-center bg-black overflow-hidden group cursor-pointer transition-all duration-500" 
              onClick={() => navigate('/roots')} 
              style={getGlowStyle('right')}
            >
              {activeAnthem && activeAnthem !== 'right' && <ScrollingLyrics sourceKey={activeAnthem} lang="EN" delay={ANTHEMS.right?.vocalDelay} textArray={getLyrics(activeAnthem, 'en')} />}
              
              <div className="text-center z-10 p-8 transform group-hover:scale-105 transition-transform duration-500">
                <Clock size={64} className={`mx-auto mb-6 ${ANTHEMS.right.color} ${activeAnthem === 'right' ? 'animate-spin-slow drop-shadow-[0_0_25px_rgba(34,211,238,0.8)]' : 'drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]'}`} />
                <h2 className={`text-5xl font-black uppercase mb-2 tracking-tighter leading-none ${ANTHEMS.right.color} drop-shadow-lg`}>THE<br/>ROOTS</h2>
                <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 mb-6">(FINAL COUNTDOWN)</p>
                
                {/* TLAČÍTKO PLAY */}
                <div 
                   onClick={(e) => handlePlayClick('right', e)}
                   className={`inline-flex items-center gap-3 px-8 py-4 rounded-full border border-zinc-800 bg-zinc-900/90 backdrop-blur-md hover:bg-zinc-800 transition-all relative z-[50] hover:scale-110 cursor-pointer shadow-lg`}
                >
                   {activeAnthem === 'right' ? <Pause className="text-[#22D3EE]" size={24}/> : <Play className="text-[#22D3EE]" size={24}/>}
                </div>
              </div>
            </div>
         </main>

         <MemorialFooter />
      </div>
    </div>
  );
};

export default GatewayPage;