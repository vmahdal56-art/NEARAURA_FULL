import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- INIT: SAINT DJANGO REPAIR (RESTORING MISSING PAGES) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_DIR = path.join(__dirname, 'src/pages');

console.log("\n>>> 🚑 SAINT DJANGO: RESTORING MISSING FILES FOR BUILD...");
console.log(">>> 🏆 RESTORING: BadgesPage.tsx");
console.log(">>> 🎥 RESTORING: FilmPage.tsx, SchoolPage.tsx, FarmPage.tsx, LawPage.tsx");

// =============================================================================
// 1. BADGES PAGE (From v11)
// =============================================================================
const badgesPageContent = `
import React from 'react';
import Footer from '../components/Footer';

const Badge = ({ title, limit, desc, color, icon }: any) => (
    <div className={\`border p-8 rounded-3xl text-center relative overflow-hidden group \${color}\`}>
        <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{icon}</div>
        <h3 className="text-2xl font-black uppercase mb-2">{title}</h3>
        <p className="text-xs uppercase tracking-widest mb-4 opacity-70">Global Limit: {limit}</p>
        <p className="font-mono text-sm leading-relaxed opacity-80">{desc}</p>
    </div>
);

const BadgesPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
       <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto w-full">
           <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-center mb-20">HALL OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-white">BADGES</span></h1>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <Badge title="Founder" limit="10,000" desc="The Legion. Early believers with equity access. Jarmila Fund guardians. Floating window access." color="border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10" icon="🏆" />
               <Badge title="Elite" limit="1,000" desc="High-value sovereignty. Direct line to Guv. Rare status for the chosen few." color="border-[#EC4899] text-[#EC4899] bg-[#EC4899]/10" icon="💎" />
               <Badge title="HOF" limit="100" desc="Hall of Fame. The Immortals. Written in the Constitution. Unshakable." color="border-white text-white bg-white/10" icon="🏛️" />
               <Badge title="Launch" limit="Open" desc="Early adopters. Proof of presence at Day Zero. The wave." color="border-[#22D3EE] text-[#22D3EE] bg-[#22D3EE]/10" icon="🚀" />
           </div>
       </div>
       <Footer />
    </div>
  );
};
export default BadgesPage;
`;

// =============================================================================
// 2. FILM PAGE (From v12)
// =============================================================================
const filmPageContent = `
import React from 'react';
import Footer from '../components/Footer';
const FilmPage = () => (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
        <div className="pt-40 pb-20 px-6 text-center max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-9xl font-black uppercase text-purple-500 mb-8">AURA FILM</h1>
            <p className="text-xl uppercase tracking-widest mb-12">70mm Integrity. No CGI. No Green Screen.</p>
            <div className="border border-purple-900/50 p-12 bg-purple-900/10 rounded-3xl">
                <h3 className="text-2xl font-black uppercase mb-4">The Manifesto</h3>
                <p className="font-mono text-zinc-400 text-justify">
                    We reject the pixelated lies of modern cinema. We return to the grain. 
                    Analog cameras. Real light. Real actors. 
                    Hřebejk & Tarantino protocol: Script is King. 
                </p>
            </div>
        </div>
        <Footer />
    </div>
);
export default FilmPage;
`;

// =============================================================================
// 3. SCHOOL PAGE (From v12)
// =============================================================================
const schoolPageContent = `
import React from 'react';
import Footer from '../components/Footer';
const SchoolPage = () => (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
        <div className="pt-40 pb-20 px-6 text-center max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-9xl font-black uppercase text-green-500 mb-8">AURA ACADEMY</h1>
            <p className="text-xl uppercase tracking-widest mb-12">Chalk. Wood. Dirt. Truth.</p>
            <div className="border border-green-900/50 p-12 bg-green-900/10 rounded-3xl">
                <h3 className="text-2xl font-black uppercase mb-4">No Tablets Allowed</h3>
                <p className="font-mono text-zinc-400 text-justify">
                    We are raising creators, not consumers. 
                    Mathematics, Logic, Honor, and Physical Labor.
                </p>
            </div>
        </div>
        <Footer />
    </div>
);
export default SchoolPage;
`;

// =============================================================================
// 4. FARM PAGE (From v12)
// =============================================================================
const farmPageContent = `
import React from 'react';
import Footer from '../components/Footer';
const FarmPage = () => (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
        <div className="pt-40 pb-20 px-6 text-center max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-9xl font-black uppercase text-amber-500 mb-8">AURA FARM</h1>
            <p className="text-xl uppercase tracking-widest mb-12">Taste of 1980. Soil over Hydroponics.</p>
            <div className="border border-amber-900/50 p-12 bg-amber-900/10 rounded-3xl">
                <h3 className="text-2xl font-black uppercase mb-4">The Bůček Standard</h3>
                <p className="font-mono text-zinc-400 text-justify">
                    Food is information. Modern food is noise.
                    No GMO. No 'Smart' Food. Just TCP (Tlačenka, Cibule, Pivo).
                </p>
            </div>
        </div>
        <Footer />
    </div>
);
export default FarmPage;
`;

// =============================================================================
// 5. LAW PAGE (From v12 - Keeping it for compatibility)
// =============================================================================
const lawPageContent = `
import React from 'react';
import Footer from '../components/Footer';
const LawPage = () => (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
        <div className="pt-40 pb-20 px-6 text-center max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-9xl font-black uppercase text-white mb-8">AURA LAW</h1>
            <p className="text-xl uppercase tracking-widest mb-12">The Ledger. The Constitution.</p>
            <div className="border border-zinc-700 p-12 bg-zinc-900 rounded-3xl">
                <h3 className="text-2xl font-black uppercase mb-4">Immutable Truth</h3>
                <p className="font-mono text-zinc-400 text-justify">
                    Truth Wins. Family First. No Bollocks.
                </p>
            </div>
        </div>
        <Footer />
    </div>
);
export default LawPage;
`;

// =============================================================================
// 6. WRITE FILES
// =============================================================================
const files = { 
  'BadgesPage.tsx': badgesPageContent,
  'FilmPage.tsx': filmPageContent,
  'SchoolPage.tsx': schoolPageContent,
  'FarmPage.tsx': farmPageContent,
  'LawPage.tsx': lawPageContent,
};

if (!fs.existsSync(SRC_DIR)) fs.mkdirSync(SRC_DIR, { recursive: true });

Object.entries(files).forEach(([file, content]) => {
  const filePath = path.join(SRC_DIR, file);
  try { 
    fs.writeFileSync(filePath, content, 'utf8'); 
    console.log('✅ RESTORED: ' + file); 
  } 
  catch (e) { console.error('❌ ERROR: ' + file, e); }
});

console.log("\n>>> SAINT DJANGO REPAIR: ALL MISSING PAGES RESTORED.");
console.log(">>> TA! 🚀\n");