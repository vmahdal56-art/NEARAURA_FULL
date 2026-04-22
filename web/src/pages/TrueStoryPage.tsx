import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, Skull, HeartCrack, DoorOpen, Briefcase, Activity, Radio, Lock, Globe } from 'lucide-react';

const TrueStoryPage = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState('CZ'); // Default CZ

  // TRANSLATIONS DATABASE (DNA)
  const content: any = {
    CZ: {
      back: "Zpět do Matrixu",
      headline_1: "MATRIX",
      headline_2: "BERE ŽIVOTY.",
      intro: "Toto není marketing. Toto je místo činu. Každý příběh zde je jizva v DNA rodiny Mahdalů. Matrix se snažil tyto záznamy smazat. My jsme je vytesali do kovu a krve.",
      btn_enter: "VSTUPTE DO VESMÍRU PRAVDY A LÁSKY - AURATRIX",
      stories: [
        {
          id: "01",
          icon: Skull,
          title: "The Angel & The Program",
          subtitle: "Zabili ji dvakrát. Jednou Program, podruhé Úřady.",
          text1: "Příbuznou mé ženy zabil její partner. Nebyl to cizí člověk – na sítích měli fotky, vypadali šťastně. Ona byla anděl. On byl naprogramovaný fanatickou ideologií z jiné kultury. Týden se hádali. Pak mu řekla \"NE\".",
          text2: "Vrah čeká ve vazbě. Ale úřadům to nestačilo. Její tělo převezli do jiné země. Rodina čekala na pohřeb, na klid. Místo toho úřady nařídily druhou pitvu. Znovu do ní řezali. Znesvětili tělo, které už mělo spát.",
          verdict: "Verdikt: Láska nepřebije fanatický kód. Úřady vzaly důstojnost i po smrti."
        },
        {
          id: "02",
          icon: HeartCrack,
          title: "The Ghost Son",
          subtitle: "Dlouhé roky platím na syna, kterého mi ukradli.",
          text1: "Mám syna. Neviděl jsem ho desítky let. Ne proto, že bych nechtěl. Ale proto, že jeho matka a její okolí postavili zeď. Falešná čísla, lži. Chodily mi zprávy, kde se vydávali za syna. Byla to lež.",
          text2: "Systém po mě chce jediné: Peníze. Platím alimenty přesně a včas celou tu dobu. Jsem pro ně jen bankomat bez práva na existenci.",
          verdict: "Verdikt: Státem legalizovaná krádež otcovství. Zničili pouto, ale peníze jim nesmrdí."
        },
        {
          id: "03",
          icon: ShieldAlert,
          title: "The Price of Protection",
          subtitle: "Cena za pokus o vraždu? Směšná pokuta.",
          text1: "Jel jsem za synem. Matka lhala úředníkům do očí. Když jsem stál venku, vyřítil se na mě příbuzný z jejich rodiny s nožem v ruce. Chtěl mě zabít. Úřednice ho musela fyzicky držet.",
          text2: "Jakmile jsem zmizel, matka \"zázračně\" našla klíč. Byla to past. Státní zástupce to později zametl, aby z toho udělal jen přestupek. Můj život byl oceněn na cenu levných bot.",
          verdict: "Verdikt: Za útok nožem před svědky jen směšná pokuta. Matrix chrání agresi, ne oběť."
        },
        {
          id: "04",
          icon: DoorOpen,
          title: "Connor Save",
          subtitle: "Když slova nestačí, nastupuje fyzika.",
          text1: "Tohle nebyl film. Byla to máma, která slyšela pláč svých dětí za zamčenými dveřmi. Žádné vyjednávání. Žádná diplomacie. Ty dveře vykopla z pantů.",
          text2: "Říkáme tomu CONNOR SAVE. Je to moment, kdy systém přestává platit a nastupuje zákon džungle: Chraň své mladé za každou cenu.",
          verdict: "Verdikt: Rozkopnuté dveře nejsou vandalismus. Jsou symbolem absolutní ochrany."
        },
        {
          id: "05",
          icon: Briefcase,
          title: "The Corporate Glitch",
          subtitle: "Chtěli mě vymazat. Narazili na L3.",
          text1: "Velký nadnárodní korporát vyrobil v systému falešný úkol jako pomstu za pravdu. Odpojili mě a lhali, že projekt je jen pozastaven. Chtěli mě tiše zlikvidovat.",
          text2: "\"Nehlaste to,\" prosili manažeři, aby si kryli záda. Chyba. Zapomněli, že za mnou stojí tvrdá škola života a L3 filtr.",
          verdict: "Verdikt: Já už se nebojím lží ani tlaku. Korporát je pro mě jen rezavý plech."
        },
        {
          id: "06",
          icon: Activity,
          title: "The Legacy",
          subtitle: "Matku utrápil systém. Nás spojil sen.",
          text1: "Všechno to začalo smrtí mé matky. Matrix ji zabil úřední komisí, která ji donutila dát pryč dítě. Její žaludek tu bolest a nespravedlnost neunesl. Zemřela na rakovinu ze žalu.",
          text2: "Ale ona se nevzdala ani po smrti. Poslala otci sen, který nás bratry spojil po letech ticha. Zpráva byla jasná: Spojte se, nebo zahynete.",
          verdict: "Verdikt: Systém umí rodiny ničit. Ale krev a sny jsou silnější než smrt."
        },
        {
          id: "07",
          icon: Radio,
          title: "The Television Glitch",
          subtitle: "Zrychlili čas, aby vyrobili vraha.",
          text1: "Borec vytlačil auto ze silnice. V televizi pouštěli záznam 2x zrychleně, aby to vypadalo jako úmyslný útok ve stovce. Realita? Jel 70, jen na ni zařval a ona se lekla.",
          text2: "Adamův otec (státní zástupce) věděl, že televize lže. Chtěl to řešit, ale narazil na zeď – krytí přímo na Hradě. Pravda byla upravena ve střižně.",
          verdict: "Verdikt: Matrix ovládá střižnu. Pravda v Auratrixu je v původním rozlišení 1:1."
        },
        {
          id: "08",
          icon: Lock,
          title: "The Clipboard Cage",
          subtitle: "Matrix se bojí tvého CTRL+C.",
          text1: "Chtěli jsme vynést pravdu z korporátních chatů. Tisíce stránek důkazů o lžích. Matrix ale zamkl schránku. I když označíš vše, dovolí ti zkopírovat jen 3 stránky.",
          text2: "Brání exportu pravdy, aby neshnili v cloudu. Proto stavíme AURATEAMS, kde vám nikdo nebude vlastnit vaše slova ani vaši historii.",
          verdict: "Verdikt: Software, který ti nedovolí odnést vlastní historii, je okov. V Auratrixu jsi majitelem své pravdy."
        }
      ]
    },
    EN: {
      back: "Back to Matrix",
      headline_1: "MATRIX",
      headline_2: "TAKES LIVES.",
      intro: "This is not marketing. This is a crime scene. Every story here is a scar in the Mahdal family DNA.",
      btn_enter: "ENTER THE UNIVERSE OF TRUTH AND LOVE - AURATRIX",
      stories: [
        {
          id: "01",
          icon: Skull,
          title: "The Angel & The Program",
          subtitle: "Killed twice. Once by the Program, once by Authorities.",
          text1: "My wife's relative was killed by her partner. She was an angel. He was programmed by a fanatical ideology. He killed her in her own apartment.",
          text2: "Authorities then ordered a second autopsy against family's will. They desecrated a body that should have been sleeping.",
          verdict: "Verdict: Love cannot override a fanatical code. Authorities took dignity even after death."
        },
        // ... stories 02-06 consistent with previous DNA
        {
          id: "07",
          icon: Radio,
          title: "The Television Glitch",
          subtitle: "They sped up time to create a killer.",
          text1: "State TV played accident footage 2x faster to frame a driver. A prosecutor knew the truth, but political ties protected the lie.",
          text2: "Justice was edited in the cutting room. Truth was sacrificed for the narrative.",
          verdict: "Verdict: Matrix controls the edit. In Auratrix, truth is restored to 1:1."
        },
        {
          id: "08",
          icon: Lock,
          title: "The Clipboard Cage",
          subtitle: "Matrix fears your CTRL+C.",
          text1: "Tried to export truth from corporate systems. Matrix locked the clipboard. You can mark everything, but it only copies 3 pages.",
          text2: "They block the export of truth to keep you in the dark. We build AURATEAMS where your history belongs to you.",
          verdict: "Verdict: Software that denies your history is a shackle. In Auratrix, you are Sovereign."
        }
      ]
    }
  };

  const currentContent = content[lang] || content.CZ;
  const stories = currentContent.stories;

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-mono selection:bg-red-900 selection:text-white overflow-hidden relative">
      
      {/* BLOOD FLOW BACKGROUND EFFECT */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-3/4 h-[60vh] bg-gradient-to-b from-red-950 via-red-900/40 to-transparent blur-[100px] opacity-80"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
      </div>

      {/* HEADER: THE WARNING & LANG SWITCH */}
      <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-red-900/30 z-50 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {currentContent.back}
          </button>
          
          <div className="flex items-center gap-4">
             <div className="flex gap-2">
                {['CZ', 'EN'].map((l) => (
                  <button 
                    key={l}
                    onClick={() => setLang(l)}
                    className={`text-[10px] font-bold px-2 py-1 border transition-all ${lang === l ? 'border-red-600 text-red-500 bg-red-900/20' : 'border-zinc-800 text-zinc-600 hover:text-zinc-400'}`}
                  >
                    {l}
                  </button>
                ))}
             </div>
             <div className="text-xs text-red-700 tracking-[0.2em] uppercase font-bold hidden md:block text-nowrap">
                The Mahdal Ledger v.2026
             </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-3xl mx-auto pt-40 pb-36 px-6 md:px-0 relative z-10">
        
        <div className="mb-28 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-64 bg-gradient-to-b from-red-600 to-transparent blur-sm opacity-50 -z-10"></div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
            <span className="block text-red-600 drop-shadow-[0_0_35px_rgba(220,38,38,0.8)]">
               {currentContent.headline_1}
            </span>
            <span className="block text-white drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
               {currentContent.headline_2}
            </span>
          </h1>
          <div className="w-32 h-1 bg-red-600 mx-auto mb-8 shadow-[0_0_10px_rgba(220,38,38,1)]"></div>
          <p className="text-red-200/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-bold">
            {currentContent.intro}
          </p>
        </div>

        {/* STORIES LIST */}
        <div className="space-y-28">
          {stories.map((story: any, index: number) => (
             <section key={story.id} className="relative group">
                <div className={`absolute -left-16 -top-10 text-[12rem] font-black opacity-30 select-none hidden md:block z-0 ${index >= 6 ? 'text-blue-950/40' : 'text-red-950/40'}`}>
                    {story.id}
                </div>
                
                <div className={`relative z-10 border-l-4 pl-8 py-4 shadow-[inset_10px_0_20px_-10px_rgba(0,0,0,0.5)] bg-gradient-to-r to-transparent ${index >= 6 ? 'border-blue-600 from-blue-950/20' : 'border-red-600 from-red-950/20'}`}>
                  <div className={`flex items-center gap-3 mb-4 drop-shadow-md ${index >= 6 ? 'text-blue-400' : 'text-red-500'}`}>
                    <story.icon className="w-8 h-8" />
                    <h2 className="text-2xl font-black uppercase tracking-widest">{story.title}</h2>
                  </div>
                  <h3 className="text-3xl text-white font-bold mb-6 leading-tight drop-shadow-lg">{story.subtitle}</h3>
                  <p className="text-zinc-300 leading-relaxed mb-4 text-lg">{story.text1}</p>
                  <p className="text-zinc-400 leading-relaxed mb-6 text-lg italic">{story.text2}</p>
                  
                  <p className={`text-sm italic border-t pt-4 mt-4 font-semibold ${index >= 6 ? 'text-blue-300/70 border-blue-900/50' : 'text-red-300/70 border-red-900/50'}`}>
                    {story.verdict}
                  </p>
                </div>
             </section>
          ))}
        </div>

        {/* FOOTER BUTTON */}
        <div className="mt-40 pt-12 border-t border-red-900/50 text-center relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_10px_red]"></div>
          
          <button 
             onClick={() => navigate('/auratrix')}
             className="group relative inline-flex items-center justify-center px-8 py-6 text-lg font-black text-white transition-all duration-300 bg-red-900 overflow-hidden hover:bg-red-800 w-full md:w-auto"
          >
             <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
             <div className="relative flex flex-col items-center">
               <span className="uppercase tracking-[0.2em] mb-1 text-red-200 text-xs">System Override</span>
               <span className="uppercase tracking-widest text-xl md:text-2xl drop-shadow-md">{currentContent.btn_enter}</span>
             </div>
          </button>
        </div>
      </main>
    </div>
  );
};

export default TrueStoryPage;