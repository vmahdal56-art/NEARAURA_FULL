import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Video, Image, Mail, Heart } from 'lucide-react';
// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';

const T: any = {
  EN: {
    marquee: [
      "DELIVERING HAPPINESS TO THE MOST VULNERABLE KIDS",
      "NEARAURA SDH IN THE MEMORY OF JARMILA AND HELENKA",
      "DELIVERING WHAT MATRIX COULDN'T DELIVER"
    ],
    dedication: "WITH THANKS TO THEM... BUILT FOR MY PARENTS",
    parents: "(JM, JV)", brother: "(PM)", wife: "(LA)", kids: "(LH, PM, YM, VM)",
    foryou: "...AND FOR YOU!!!",
    core: "CORE", modules: "MODULES", legal: "LEGAL", connect: "CONNECT"
  },
  FR: {
    marquee: [
      "APPORTER DU BONHEUR AUX ENFANTS LES PLUS VULNÉRABLES",
      "NEARAURA SDH EN MÉMOIRE DE JARMILA ET HELENKA",
      "LIVRER CE QUE LA MATRICE N'A PAS PU LIVRER"
    ],
    dedication: "AVEC MES REMERCIEMENTS... CONSTRUIT POUR MES PARENTS",
    parents: "(JM, JV)", brother: "(PM)", wife: "(LA)", kids: "(LH, PM, YM, VM)",
    foryou: "...ET POUR VOUS !!!",
    core: "CŒUR", modules: "MODULES", legal: "JURIDIQUE", connect: "CONTACT"
  },
  DE: {
    marquee: [
      "GLÜCK FÜR DIE VERWUNDBARSTEN KINDER BRINGEN",
      "NEARAURA SDH ZUM GEDENKEN AN JARMILA UND HELENKA",
      "LIEFERN, WAS DIE MATRIX NICHT KONNTE"
    ],
    dedication: "MIT DANK AN SIE... GEBAUT FÜR MEINE ELTERN",
    parents: "(JM, JV)", brother: "(PM)", wife: "(LA)", kids: "(LH, PM, YM, VM)",
    foryou: "...UND FÜR DICH!!!",
    core: "KERN", modules: "MODULE", legal: "RECHTLICHES", connect: "KONTAKT"
  },
  CZ: {
    marquee: [
      "PŘINÁŠÍME ŠTĚSTÍ TĚM NEJZRANITELNĚJŠÍM DĚTEM",
      "NEARAURA SDH NA PAMÁTKU JARMILY A HELENKY",
      "DORUČUJEME TO, CO MATRIX DORUČIT NEDOKÁZAL"
    ],
    dedication: "S PODĚKOVÁNÍM JIM... POSTAVENO PRO MÉ RODIČE",
    parents: "(JM, JV)", brother: "(PM)", wife: "(LA)", kids: "(LH, PM, YM, VM)",
    foryou: "...A PRO VÁS!!!",
    core: "ZÁKLAD", modules: "MODULY", legal: "PRÁVNÍ", connect: "KONTAKT"
  }
};

const MemorialFooter = () => {
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  return (
    <footer className="relative z-[100] w-full bg-black border-t-4 border-[#cd5c09] text-zinc-500 font-sans mt-auto">
      
      {/* 1. MARQUEE (ZACHOVÁNO 1:1) */}
      <div className="w-full bg-[#cd5c09] text-black py-3 overflow-hidden font-black uppercase text-xs tracking-[0.2em] border-b border-black">
         <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
            {txt.marquee.map((m: string, i: number) => (
              <React.Fragment key={i}>
                <span>{m}</span>
                <span>+++</span>
              </React.Fragment>
            ))}
            <span>TA!</span>
         </div>
      </div>

      <div className="pt-20 pb-12 px-6 bg-black">
          
          {/* 2. DEDICATION (ZACHOVÁNO 1:1) */}
          <div className="container mx-auto text-center border-b border-zinc-800 pb-16 mb-16">
             <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-zinc-900 border border-zinc-700 mb-8">
                <Heart size={14} className="text-red-600 fill-current animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Legacy Protocol</span>
             </div>
             
             <h3 className="text-white font-serif italic text-xl md:text-3xl leading-relaxed max-w-5xl mx-auto mb-8">
               "{txt.dedication} <span className="text-[#cd5c09] text-sm not-italic font-mono font-bold">{txt.parents}</span>, 
               MY BROTHER <span className="text-[#cd5c09] text-sm not-italic font-mono font-bold">{txt.brother}</span>, 
               MY WIFE <span className="text-[#cd5c09] text-sm not-italic font-mono font-bold">{txt.wife}</span> 
               AND MY KIDS <span className="text-[#cd5c09] text-sm not-italic font-mono font-bold">{txt.kids}</span>..."
             </h3>
             
             <div>
                <span className="text-[#10b981] font-black uppercase text-3xl md:text-5xl tracking-tighter drop-shadow-2xl">
                  {txt.foryou}
                </span>
             </div>
          </div>

          {/* 3. LINKS GRID (ZACHOVÁNO) */}
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 text-[11px] uppercase tracking-widest font-bold">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-black mb-4 text-xs border-b border-[#cd5c09] pb-2 inline-block w-max">{txt.core}</h4>
              <Link to="/" className="hover:text-[#cd5c09]">Gateway</Link>
              <Link to="/oath" className="hover:text-[#cd5c09]">Oath</Link>
              <Link to="/orchard" className="hover:text-[#cd5c09]">Orchard</Link>
              <Link to="/roots" className="hover:text-[#cd5c09]">Roots</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-black mb-4 text-xs border-b border-[#10b981] pb-2 inline-block w-max">{txt.modules}</h4>
              <Link to="/auranet" className="hover:text-[#10b981]">AuraNet</Link>
              <Link to="/auratrix" className="hover:text-[#10b981]">AuraTrix</Link>
              <Link to="/dr-aura-confessional" className="hover:text-[#10b981]">Dr. Aura</Link>
              <Link to="/kokos" className="hover:text-[#10b981]">Kokos</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-black mb-4 text-xs border-b border-white pb-2 inline-block w-max">{txt.legal}</h4>
              <Link to="/manifesto" className="hover:text-white">Manifesto</Link>
              <Link to="/terms" className="hover:text-white">Terms</Link>
              <Link to="/privacy" className="hover:text-white">Privacy</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-black mb-4 text-xs border-b border-zinc-500 pb-2 inline-block w-max">{txt.connect}</h4>
              <a href="#" className="hover:text-white">Status</a>
              <a href="#" className="hover:text-white">Support</a>
              <a href="#" className="hover:text-white">Donate</a>
            </div>
          </div>

          {/* 4. SOCIALS (ZACHOVÁNO 1:1) */}
          <div className="container mx-auto mb-16 flex flex-wrap gap-8 text-zinc-500 justify-center md:justify-start items-center">
             <a href="https://facebook.com/nearaura" target="_blank" className="hover:text-[#1877F2] hover:scale-125 transition-transform"><Facebook size={28}/></a>
             <a href="https://youtube.com/nearaura" target="_blank" className="hover:text-[#FF0000] hover:scale-125 transition-transform"><Youtube size={28}/></a>
             <a href="https://twitter.com/nearaura" target="_blank" className="hover:text-[#1DA1F2] hover:scale-125 transition-transform"><Twitter size={28}/></a>
             <a href="https://linkedin.com/company/nearaura" target="_blank" className="hover:text-[#0A66C2] hover:scale-125 transition-transform"><Linkedin size={28}/></a>
             
             <div className="w-px h-8 bg-zinc-800 hidden md:block"></div>
             
             <a href="https://instagram.com/nearauraapp" target="_blank" className="hover:text-[#E4405F] hover:scale-125 transition-transform"><Instagram size={28}/></a>
             <a href="https://tiktok.com/@nearauraapp" target="_blank" className="hover:text-white hover:scale-125 transition-transform"><Video size={28}/></a>
             <a href="https://pinterest.com/nearaura" target="_blank" className="hover:text-[#BD081C] hover:scale-125 transition-transform"><Image size={28}/></a>
          </div>

          {/* 5. ADDRESS & COPYRIGHT (ZACHOVÁNO) */}
          <div className="container mx-auto border-t border-zinc-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px]">
            <div className="flex items-center gap-2 text-[#cd5c09]">
               <MapPin size={14} /> <span className="font-bold uppercase tracking-widest">NEARAURA LTD, COVENT GARDEN, LONDON, UNITED KINGDOM</span>
            </div>
            <div className="flex items-center gap-4">
               <Mail size={14}/> <span>legal@nearaura.com</span>
            </div>
            <p className="font-mono opacity-50">© 1916-{new Date().getFullYear()} MAHDAL DYNASTY.</p>
          </div>
      </div>
    </footer>
  );
};

export default MemorialFooter;