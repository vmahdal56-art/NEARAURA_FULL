const fs = require('fs');
const content = `import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Manifesto from './components/Manifesto';

const Gateway = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col font-sans">
      <style>{\`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&family=Inter:wght@900&display=swap');
        .font-soul { font-family: 'Playfair Display', serif; }
        .font-action { font-family: 'Inter', sans-serif; }
        .bg-orchard { background: linear-gradient(135deg, #051103 0%, #000000 100%); }
        .bg-lava { background: linear-gradient(225deg, #1a0800 0%, #000000 100%); }
      \`}</style>

      <header className="py-24 text-center z-10">
        <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-4">The Truth is Here.</h1>
        <p className="text-zinc-500 font-bold tracking-[0.8em] uppercase text-xs">Select what you want to be</p>
      </header>
      
      <main className="flex-1 flex flex-col md:flex-row border-t border-white/10">
        <div onClick={() => navigate('/orchard')} className="flex-1 group cursor-pointer relative overflow-hidden transition-all duration-1000 bg-orchard border-b md:border-b-0 md:border-r border-white/5 hover:flex-[1.5]">
          <div className="relative h-full flex flex-col items-center justify-center p-12 text-center transition-transform duration-700 group-hover:scale-110">
            <h2 className="text-5xl md:text-7xl font-soul italic text-emerald-100 mb-6">NearAura Orchard</h2>
            <p className="max-w-xs text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Nurture the Soul. Find Connection.</p>
          </div>
        </div>

        <div onClick={() => navigate('/poorkids')} className="flex-1 group cursor-pointer relative overflow-hidden transition-all duration-1000 bg-lava hover:flex-[1.5]">
          <div className="relative h-full flex flex-col items-center justify-center p-12 text-center transition-transform duration-700 group-hover:scale-110">
            <h2 className="text-5xl md:text-7xl font-action italic font-black uppercase text-orange-600 mb-6 tracking-tighter">Be the Help</h2>
            <p className="max-w-xs text-zinc-500 uppercase tracking-widest text-[10px] font-bold">For the most vulnerable kids.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

const OrchardHome = () => (
  <div className="min-h-screen bg-black">
    <Header />
    <Manifesto />
  </div>
);

const PoorKidsPage = () => (
  <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-12 text-center">
    <h1 className="font-action italic text-7xl md:text-9xl text-orange-700 uppercase tracking-tighter mb-12 animate-pulse">Lava Pipe</h1>
    <p className="font-soul text-3xl md:text-5xl text-zinc-300 italic max-w-4xl leading-tight">
      "Michael Tučný to věděl... Jen to nedokázal doručit... Ale my ano."
    </p>
    <button onClick={() => window.location.href='/'} className="mt-20 text-zinc-600 hover:text-white uppercase tracking-[0.6em] text-[10px] font-black transition-all">← Back to selection</button>
  </div>
);

export default function App() { 
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gateway />} />
        <Route path="/orchard" element={<OrchardHome />} />
        <Route path="/poorkids" element={<PoorKidsPage />} />
      </Routes>
    </BrowserRouter>
  ); 
}
`;

fs.writeFileSync('src/App.tsx', content);
console.log('✅ App.tsx BYL TVRDĚ PŘEPSÁN (INTEGRITY 1000x)');
