import React, { useState, useEffect } from 'react';
// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';

const T: any = {
  EN: {
    btn: "ENTER THE ORCHARD • PICK YOUR TRUTH",
    fruits: {
      hendy: 'Sovereign Soul. Verified Identity.',
      strawberry: 'The Real Orchard. Family Core.',
      pineapple: 'Serious Commitment. High Intent.',
      orange: 'Platonic Friendship.',
      grape: 'Community & Tribe.',
      watermelon: 'Active Lifestyle.',
      coconut: 'Technical Support & Wisdom.',
      mango: 'Identity & Pride.',
      banana: 'Intimacy (Male).',
      peach: 'Intimacy (Female).',
      pear: 'Stability & Anchor.',
      cherry: 'Nightlife Pulse.',
      lemon: 'Healing Node.'
    }
  },
  FR: {
    btn: "ENTRER DANS LE VERGER • CHOISISSEZ VOTRE VÉRITÉ",
    fruits: {
      hendy: 'Âme Souveraine. Identité Vérifiée.',
      strawberry: 'Le Vrai Verger. Noyau Familial.',
      pineapple: 'Engagement Sérieux. Haute Intention.',
      orange: 'Amitié Platonique.',
      grape: 'Communauté et Tribu.',
      watermelon: 'Mode de Vie Actif.',
      coconut: 'Support Technique et Sagesse.',
      mango: 'Identité et Fierté.',
      banana: 'Intimité (Homme).',
      peach: 'Intimité (Femme).',
      pear: 'Stabilité et Ancre.',
      cherry: 'Pouls de la Vie Nocturne.',
      lemon: 'Nœud de Guérison.'
    }
  },
  DE: {
    btn: "DEN GARTEN BETRETEN • WÄHLEN SIE IHRE WAHRHEIT",
    fruits: {
      hendy: 'Souveräne Seele. Verifizierte Identität.',
      strawberry: 'Der wahre Garten. Familienkern.',
      pineapple: 'Ernsthaftes Engagement.',
      orange: 'Platonische Freundschaft.',
      grape: 'Gemeinschaft & Stamm.',
      watermelon: 'Aktiver Lebensstil.',
      coconut: 'Technischer Support & Weisheit.',
      mango: 'Identität & Stolz.',
      banana: 'Intimität (Männlich).',
      peach: 'Intimität (Weiblich).',
      pear: 'Stabilität & Anker.',
      cherry: 'Puls des Nachtlebens.',
      lemon: 'Heilungsknoten.'
    }
  },
  CZ: {
    btn: "VSTUPTE DO SADU • VYBERTE SI SVOU PRAVDU",
    fruits: {
      hendy: 'Svrchovaná duše. Ověřená identita.',
      strawberry: 'Skutečný sad. Jádro rodiny.',
      pineapple: 'Vážný závazek. Vysoký záměr.',
      orange: 'Platonické přátelství.',
      grape: 'Komunita a kmen.',
      watermelon: 'Aktivní životní styl.',
      coconut: 'Technická podpora a moudrost.',
      mango: 'Identita a hrdost.',
      banana: 'Intimita (Muž).',
      peach: 'Intimita (Žena).',
      pear: 'Stabilita a kotva.',
      cherry: 'Tlukot nočního života.',
      lemon: 'Léčivý uzel.'
    }
  }
};

export default function Manifesto() {
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  // PŮVODNÍ DEFINICE OVOCE (ZACHOVÁNO 1:1)
  const FRUITS = [
    { id: 'hendy', icon: '👑', label: 'HENDY', color: 'text-[#22D3EE]', border: 'border-[#22D3EE]', desc: txt.fruits.hendy },
    { id: 'strawberry', icon: '🍓', label: 'STRAWBERRY', color: 'text-red-500', border: 'border-red-500', desc: txt.fruits.strawberry },
    { id: 'pineapple', icon: '🍍', label: 'PINEAPPLE', color: 'text-[#F97316]', border: 'border-[#F97316]', desc: txt.fruits.pineapple },
    { id: 'orange', icon: '🍊', label: 'ORANGE', color: 'text-orange-500', border: 'border-orange-500', desc: txt.fruits.orange },
    { id: 'grape', icon: '🍇', label: 'GRAPE', color: 'text-purple-500', border: 'border-purple-500', desc: txt.fruits.grape },
    { id: 'watermelon', icon: '🍉', label: 'WATERMELON', color: 'text-green-500', border: 'border-green-500', desc: txt.fruits.watermelon },
    { id: 'coconut', icon: '🥥', label: 'COCONUT', color: 'text-white', border: 'border-white', desc: txt.fruits.coconut },
    { id: 'mango', icon: '🥭', label: 'MANGO', color: 'text-pink-500', border: 'border-pink-500', desc: txt.fruits.mango },
    { id: 'banana', icon: '🍌', label: 'BANANA', color: 'text-yellow-400', border: 'border-yellow-400', desc: txt.fruits.banana },
    { id: 'peach', icon: '🍑', label: 'PEACH', color: 'text-rose-400', border: 'border-rose-400', desc: txt.fruits.peach },
    { id: 'pear', icon: '🍐', label: 'PEAR', color: 'text-emerald-500', border: 'border-emerald-500', desc: txt.fruits.pear },
    { id: 'cherry', icon: '🍒', label: 'CHERRY', color: 'text-red-600', border: 'border-red-600', desc: txt.fruits.cherry },
    { id: 'lemon', icon: '🍋', label: 'LEMON', color: 'text-yellow-200', border: 'border-yellow-200', desc: txt.fruits.lemon }
  ];

  const [rot, setRot] = useState(0);
  const [selectedFruit, setSelectedFruit] = useState(FRUITS[2]); 

  useEffect(() => { const i = setInterval(() => setRot(r => r + 0.04), 50); return () => clearInterval(i); }, []);

  return (
    <section className="relative w-full flex flex-col items-center pt-24 md:pt-40 pb-20 px-4 overflow-x-hidden">
      
      {/* CENTRAL BUTTON (ZACHOVÁNO) */}
      <button className="mb-12 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 md:px-10 py-4 rounded-full font-[1000] text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-lg animate-pulse hover:scale-105 transition-transform text-center w-full md:w-auto">
        {txt.btn}
      </button>

      {/* THE SUN ORBIT (ZACHOVÁNO 1:1) */}
      <div className="w-full max-w-7xl grid grid-cols-1 xl:grid-cols-2 gap-12 items-center mb-24">
        <div className="flex justify-center relative min-h-[400px] md:min-h-[500px]">
             <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px]">
                <div className="absolute inset-0 bg-[#F97316]/10 rounded-full blur-[80px]"></div>
                <div className="absolute inset-0 rounded-full" style={{ transform: `rotate(${rot}deg)` }}>
                    {FRUITS.map((f, i) => {
                        const angle = (i * 360) / FRUITS.length;
                        return (
                            <div key={f.id} onClick={() => setSelectedFruit(f)} 
                                 className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 flex items-center justify-center text-3xl md:text-5xl cursor-pointer hover:scale-125 transition-transform"
                                 style={{ transform: `rotate(${angle}deg) translate(240px) rotate(-${angle}deg)` }}>
                                 {f.icon}
                            </div>
                        );
                    })}
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[14rem] pointer-events-none drop-shadow-2xl transition-all duration-500">
                    {selectedFruit.icon}
                </div>
            </div>
        </div>

        {/* INFO CARD (ZACHOVÁNO 1:1) */}
        <div className="flex justify-center w-full">
          <div className={`bg-black/80 border-2 md:border-4 ${selectedFruit.border} p-8 md:p-12 rounded-[40px] md:rounded-[60px] backdrop-blur-xl w-full max-w-[600px] shadow-2xl transition-all duration-500`}>
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 border-b border-white/10 pb-8 text-center sm:text-left">
              <span className="text-7xl sm:text-8xl">{selectedFruit.icon}</span>
              <h2 className={`text-4xl sm:text-6xl font-[1000] uppercase tracking-tighter leading-none ${selectedFruit.color} break-words`}>
                {selectedFruit.label}
              </h2>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white uppercase leading-tight mb-8 italic text-center sm:text-left">
              "{selectedFruit.desc}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}