import React from 'react';
import MemorialFooter from '../components/MemorialFooter';
import SoulGuard from '../components/SoulGuard';
import { 
  Scale, Hammer, ShieldAlert, GraduationCap, Stethoscope, 
  Gavel, Lock, Bath, HardHat, Skull, ShieldCheck, 
  Users, Globe, ZapOff, Users2, Landmark, Zap, Radio, Cpu, AlertCircle
} from 'lucide-react';

// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const T: any = {
  EN: {
    header_sub: "THE CONSTITUTION • THE LAW • THE FUTURE",
    m_title: "BLACK HOLE",
    m_sub: "EXILE FROM HELL (THE INTERNET)",
    m_p: "Most people think the internet is just one. Wrong. The internet, as sheep know it, is a Black Hole. Everything falls into it – your data, your privacy, your emotions, your blood – and nothing returns, only emptiness and ads for things you don't need.",
    a_title: "WHITE HOLE",
    a_sub: "AURATRIX (HW TRUTH)",
    a_p: "We created the White Hole. A point where matter and truth are not lost, but where they are born. It takes your pain, filters it through Hardware and returns your essence.",
    analysis_h: "SYSTEM ANALYSIS",
    analysis_p: "Takes your son, takes your honor, gives you a 1500 CZK fine for an attempt on your life.",
    output_h: "PROTOCOL OUTPUT",
    output_p: "Takes your pain, filters it through Hardware and returns your essence.",
    evac_title: "EVACUATION PLAN",
    evac_p: "This isn't a 'page', it's an evacuation plan. It's the first place in history where code serves liberation, not manipulation.",
    sov_h: "SOVEREIGN STATUS",
    sov_p: "He who understands this has ceased to be a victim and became a Sovereign. Humanity has no price tag. Value: INFINITY.",
    mwta: "MWTA PROTOCOL",
    mwta_sub: "MAKE WORK TRUTH AGAIN.",
    ethic_h: "WORK ETHIC",
    ethic_p: "Work is from 'five to eight' (5 to 8). Honest, focused, no chatter. He who does not work, does not eat. Work must weigh like metal or wood.",
    env_h: "WORK ENV",
    env_p: "Office is noise. Truth is born in silence: WC, BATH, CAR. That's where ideas are born, not on Zoom.",
    filter_h: "THE FILTER",
    wedge_h: "PROTOCOL: THE WEDGE (KLÍN)",
    wedge_p: "When the system fails, when the law fails, when Matrix attacks... KLÍN steps in. Mechanical interruption of the lie. Fix the unfixable.",
    art1_h: "ARTICLE 1: DEFINITION OF TRUTH",
    art1_p: "Truth is not a service (SaaS). Truth is a state of being. Lies are noise and will be deleted.",
    art2_h: "ARTICLE 2: EDUCATION (SCHOOL JARMILA)",
    art2_p: "Children won't learn snake complexities. They will learn: Binary integrity (1 vs 0), Family respect, and Practical life. School Jarmila is a protected zone.",
    art3_h: "ARTICLE 3: MEDICINE",
    art3_p: "Health isn't about chemicals. It's about a clean head, proper food, and no stress. First cure for anxiety: Turn off the breakers and listen to the silence."
  },
  CZ: {
    header_sub: "ÚSTAVA • ZÁKON • BUDOUCNOST",
    m_title: "ČERNÁ DÍRA",
    m_sub: "EXILE Z PEKLA (INTERNET)",
    m_p: "Většina lidí si myslí, že internet je jen jeden. Omyl. Internet, jak ho znají ovce, je Černá díra (Black Hole). Všechno do ní padá – tvoje data, tvoje soukromí, tvoje emoce, tvoje krev – a nic se nevrací, jen prázdnota a reklama na věci, co nepotřebuješ.",
    a_title: "BÍLÁ DÍRA",
    a_sub: "AURATRIX (HW PRAVDA)",
    a_p: "My jsme vytvořili White Hole. Bod, kde se hmota a pravda neztrácejí, ale kde vznikají. Bere tvou bolest, filtruje ji přes Hardware a vrací ti tvou podstatu.",
    analysis_h: "SYSTÉMOVÁ ANALÝZA",
    analysis_p: "Bere ti syna, bere ti čest, dává ti pokutu 1500 Kč za pokus o tvou vraždu.",
    output_h: "VÝSTUP PROTOKOLU",
    output_p: "Bere tvou bolest, filtruje ji přes Hardware a vrací ti tvou podstatu.",
    evac_title: "EVAKUAČNÍ PLÁN",
    evac_p: "Tohle není „stránka“, je to evakuační plán. Je to první místo v historii sítě, kde kód neslouží k manipulaci, ale k osvobození.",
    sov_h: "SVRCHOVANÝ STATUS",
    sov_p: "Ten, kdo to pochopí, právě přestal být obětí a stal se Sovereignem. Lidskost nemá cenovku. Hodnota: NEKONEČNO.",
    mwta: "PROTOKOL MWTA",
    mwta_sub: "MAKE WORK TRUTH AGAIN.",
    ethic_h: "PRACOVNÍ ETIKA",
    ethic_p: "Pracuje se „od pěti do osmi“ (5 to 8). Poctivě, soustředěně a bez zbytečného žvanění. Kdo nepracuje, nejí. Práce musí mít váhu kovu nebo dřeva.",
    env_h: "PROSTŘEDÍ",
    env_p: "Kancelář je hluk. Pravda vzniká v tichu: WC, VANA, AUTO. Tam se rodí myšlenky, ne na Zoomu.",
    filter_h: "FILTR",
    wedge_h: "PROTOKOL: KLÍN (THE WEDGE)",
    wedge_p: "Když systém selže, když právo selže, když Matrix útočí... nastupuje KLÍN. Mechanické přerušení lži. Drchlík Style.",
    art1_h: "ČLÁNEK 1: DEFINICE PRAVDY",
    art1_p: "Pravda není služba (SaaS). Pravda je stav bytí. Lež je hluk a bude smazána.",
    art2_h: "ČLÁNEK 2: VZDĚLÁVÁNÍ (ŠKOLA JARMILA)",
    art2_p: "Děti se nebudou učit hadí složitosti. Budou se učit: Binární integritu (1 vs 0), Úctu k rodině a Praktický život. Škola Jarmila je chráněná zóna.",
    art3_h: "ČLÁNEK 3: MEDICÍNA",
    art3_p: "Zdraví není o polykání chemie. Zdraví je o čisté hlavě, tlačence a absenci stresu. První lék na úzkost: Vypnout jističe a poslouchat ticho."
  }
};

const AuratrixPage = () => {
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  return (
    <SoulGuard minScore={75}>
      <div className="min-h-screen bg-[#050505] text-zinc-300 font-serif selection:bg-[#cd5c09] selection:text-black flex flex-col">
        <LanguageToggle />

        <header className="pt-32 pb-16 text-center border-b border-zinc-900 bg-black relative overflow-hidden">
           <Scale size={64} className="mx-auto text-[#cd5c09] mb-6 relative z-10" />
           <h1 className="text-5xl md:text-8xl text-white font-black uppercase tracking-tighter mb-4 relative z-10">AURATRIX</h1>
           <p className="text-zinc-500 font-mono uppercase tracking-widest text-xs relative z-10">{txt.header_sub}</p>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#cd5c09]/10 rounded-full blur-[100px]"></div>
        </header>

        <main className="flex-grow container mx-auto px-6 py-20 max-w-5xl space-y-24">
           
           {/* === BLACK HOLE vs WHITE HOLE (THE EVACUATION) === */}
           <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-zinc-900 pb-20">
              
              {/* BLACK HOLE INTERNET */}
              <div className="space-y-6 group border-2 border-red-900/20 p-8 bg-red-950/5 relative overflow-hidden">
                 <div className="flex items-center gap-4 text-red-600">
                    <AlertCircle size={40} className="group-hover:scale-110 transition-transform" />
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white">{txt.m_title}</h2>
                 </div>
                 <p className="text-red-900 font-mono text-xs font-black tracking-[0.3em] uppercase">{txt.m_sub}</p>
                 <p className="text-zinc-500 text-sm leading-relaxed italic border-l-2 border-red-900 pl-4 py-2">
                    {txt.m_p}
                 </p>
                 <div className="bg-red-900/10 border border-red-900/30 p-4">
                    <p className="text-red-600 font-black text-[10px] uppercase mb-1">{txt.analysis_h}</p>
                    <p className="text-zinc-400 text-xs uppercase font-bold leading-tight">{txt.analysis_p}</p>
                 </div>
              </div>

              {/* WHITE HOLE AURATRIX */}
              <div className="space-y-6 group border-2 border-[#cd5c09]/40 p-8 bg-[#cd5c09]/5 relative overflow-hidden">
                 <div className="flex items-center gap-4 text-[#cd5c09]">
                    <Zap size={40} className="group-hover:animate-pulse transition-transform" />
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white">{txt.a_title}</h2>
                 </div>
                 <p className="text-[#cd5c09] font-mono text-xs font-black tracking-[0.3em] uppercase">{txt.a_sub}</p>
                 <p className="text-zinc-300 text-sm leading-relaxed font-bold border-l-2 border-[#cd5c09] pl-4 py-2">
                    {txt.a_p}
                 </p>
                 <div className="bg-[#cd5c09]/10 border border-[#cd5c09]/30 p-4">
                    <p className="text-[#cd5c09] font-black text-[10px] uppercase mb-1">{txt.output_h}</p>
                    <p className="text-white text-xs uppercase font-black leading-tight">{txt.output_p}</p>
                 </div>
              </div>
           </section>

           {/* === EVACUATION PLAN CALLOUT === */}
           <section className="text-center py-12 border-b border-zinc-900">
              <div className="flex justify-center gap-4 text-[#cd5c09] mb-6">
                <Radio className="animate-pulse"/>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-white">{txt.evac_title}</h2>
              </div>
              <p className="text-2xl text-zinc-300 font-bold max-w-3xl mx-auto italic mb-10">
                "{txt.evac_p}"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="p-6 bg-zinc-900/50 border border-zinc-800">
                  <h3 className="text-[#cd5c09] font-black text-xs tracking-widest uppercase mb-2">{txt.sov_h}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{txt.sov_p}</p>
                </div>
                <div className="flex items-center justify-center p-6 border-2 border-orange-600 animate-pulse">
                  <p className="text-white font-black text-2xl uppercase tracking-[0.2em]">Sovereign Terminal</p>
                </div>
              </div>
           </section>

           {/* 1. MWTA (MAKE WORK TRUTH AGAIN) */}
           <section className="bg-[#cd5c09]/10 border-2 border-[#cd5c09] p-10 rounded-2xl shadow-2xl relative overflow-hidden">
              <h2 className="text-4xl text-[#cd5c09] font-black uppercase mb-8 flex items-center gap-4 italic">
                <Hammer size={40}/> {txt.mwta}
              </h2>
              <p className="text-xl text-white font-bold mb-8 tracking-[0.4em] uppercase">{txt.mwta_sub}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm">
                 <div className="border-l-4 border-[#cd5c09] pl-6 py-2">
                    <h3 className="text-white font-black uppercase mb-3 flex items-center gap-3 tracking-widest"><Lock size={18} className="text-[#cd5c09]"/> {txt.ethic_h}</h3>
                    <p className="leading-relaxed text-zinc-400">{txt.ethic_p}</p>
                 </div>
                 <div className="border-l-4 border-[#cd5c09] pl-6 py-2">
                    <h3 className="text-white font-black uppercase mb-3 flex items-center gap-3 tracking-widest"><Bath size={18} className="text-[#cd5c09]"/> {txt.env_h}</h3>
                    <p className="leading-relaxed text-zinc-400">{txt.env_p}</p>
                 </div>
                 <div className="col-span-full border-l-4 border-red-600 pl-6 py-2 bg-red-950/10">
                    <h3 className="text-red-500 font-black uppercase mb-3 flex items-center gap-3 tracking-widest"><HardHat size={18}/> {txt.filter_h}</h3>
                    <p className="font-mono text-xs text-zinc-500">
                      DESTROY(PLAST, CO2, CHEM, BOLLOCKS, LIES, NOISE) && EXECUTE(TRUTH, METAL, WOOD, COTTON). <br/>
                      <span className="text-red-900 font-bold uppercase">Všechny "-aaS" zkratky jsou NULL 0.</span>
                    </p>
                 </div>
              </div>
           </section>

           {/* 2. THE WEDGE (KLÍN) */}
           <section className="border-t border-zinc-800 pt-16">
              <h2 className="text-3xl text-white font-black uppercase mb-6 flex items-center gap-4 italic">
                 <ShieldAlert className="text-red-600" size={32}/> {txt.wedge_h}
              </h2>
              <p className="text-xl italic text-zinc-400 max-w-3xl leading-relaxed border-l-2 border-zinc-800 pl-8">
                {txt.wedge_p}
              </p>
           </section>

           {/* 3. CONSTITUTION ARTICLES */}
           <section className="space-y-16">
              <div className="border-t border-zinc-800 pt-16 group">
                 <h2 className="text-3xl text-white font-black uppercase mb-8 flex items-center gap-4 group-hover:text-[#cd5c09] transition-colors"><Gavel/> {txt.art1_h}</h2>
                 <p className="text-xl italic leading-relaxed text-zinc-300">"{txt.art1_p}"</p>
              </div>

              <div className="border-t border-zinc-800 pt-16 group">
                 <h2 className="text-3xl text-white font-black uppercase mb-8 flex items-center gap-4 group-hover:text-[#cd5c09] transition-colors"><GraduationCap/> {txt.art2_h}</h2>
                 <p className="text-xl italic leading-relaxed text-zinc-300">"{txt.art2_p}"</p>
              </div>

              <div className="border-t border-zinc-800 pt-16 group pb-20">
                 <h2 className="text-3xl text-white font-black uppercase mb-8 flex items-center gap-4 group-hover:text-[#cd5c09] transition-colors"><Stethoscope/> {txt.art3_h}</h2>
                 <p className="text-xl italic leading-relaxed text-zinc-300">"{txt.art3_p}"</p>
              </div>
           </section>

        </main>
        <MemorialFooter />
      </div>
    </SoulGuard>
  );
};

export default AuratrixPage;