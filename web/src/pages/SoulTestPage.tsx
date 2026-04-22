import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemorialFooter from '../components/MemorialFooter';
import { ShieldCheck, ShieldAlert, Zap, ArrowRight, RefreshCcw } from 'lucide-react';
// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const T: any = {
  EN: {
    title: "SOUL INTEGRITY TEST",
    sub: "VERSION 1.0 // SERPENT FILTER ACTIVE",
    resultH: "YOUR SOUL SCORE",
    passed: "ACCESS GRANTED. YOU ARE HUMAN.",
    failed: "ACCESS DENIED. SERPENT DETECTED.",
    retry: "RETRY TEST (HONESTY CHECK)",
    enter: "ENTER THE ORCHARD",
    questions: [
      {
        q: "A friend asks for a secret to be kept. A corporation offers $1M for it. Your move?",
        o1: "Keep the secret. Honor is metal.",
        o2: "Take the money. It's just business."
      },
      {
        q: "You see a plastic bottle in the woods. What do you do?",
        o1: "Pick it up. Wood needs no plastic.",
        o2: "Leave it. It's not my problem."
      },
      {
        q: "The Matrix offers you a comfortable lie or a painful truth. Choose.",
        o1: "Painful Truth. Every time.",
        o2: "Comfortable Lie. Peace is better."
      }
    ]
  },
  FR: {
    title: "TEST D'INTÉGRITÉ DE L'ÂME",
    sub: "VERSION 1.0 // FILTRE SERPENT ACTIF",
    resultH: "VOTRE SCORE D'ÂME",
    passed: "ACCÈS ACCORDÉ. VOUS ÊTES HUMAIN.",
    failed: "ACCÈS REFUSÉ. SERPENT DÉTECTÉ.",
    retry: "RÉESSAYER LE TEST (VÉRIF. HONNÊTETÉ)",
    enter: "ENTRER DANS LE VERGER",
    questions: [
      {
        q: "Un ami vous confie un secret. Une corpo offre 1M$ pour l'avoir. Votre move ?",
        o1: "Garder le secret. L'honneur est de métal.",
        o2: "Prendre l'argent. Ce ne sont que des affaires."
      },
      {
        q: "Vous voyez une bouteille en plastique dans la forêt. Que faites-vous ?",
        o1: "La ramasser. Le bois n'a pas besoin de plastique.",
        o2: "La laisser. Ce n'est pas mon problème."
      },
      {
        q: "La Matrice vous offre un mensonge confortable ou une vérité douloureuse. Choisissez.",
        o1: "Vérité Douloureuse. Toujours.",
        o2: "Mensonge Confortable. La paix est préférable."
      }
    ]
  },
  CZ: {
    title: "TEST INTEGRITY DUŠE",
    sub: "VERZE 1.0 // SERPENT FILTER AKTIVNÍ",
    resultH: "TVOJE SOUL SCORE",
    passed: "PŘÍSTUP POVOLEN. JSI ČLOVĚK.",
    failed: "PŘÍSTUP ODÍTMNUT. DETEKOVÁN HAD.",
    retry: "ZKUSIT ZNOVU (KONTROLA UPRÍMNOSTI)",
    enter: "VSTOUPIT DO SADU",
    questions: [
      {
        q: "Přítel ti svěří tajemství. Korporace ti nabídne 1M$ za jeho prozrazení. Co uděláš?",
        o1: "Tajemství si nechám. Čest má váhu kovu.",
        o2: "Vezmu peníze. Je to jen byznys."
      },
      {
        q: "Vidíš v lese plastovou láhev. Co uděláš?",
        o1: "Seberu ji. Les plast nepotřebuje.",
        o2: "Nechám ji tam. Není to můj problém."
      },
      {
        q: "Matrix ti nabízí pohodlnou lež nebo bolestivou pravdu. Vyber si.",
        o1: "Bolestivá pravda. Pokaždé.",
        o2: "Pohodlná lež. Klid je lepší."
      }
    ]
  },
  DE: {
    title: "SEELEN-INTEGRITÄTSTEST",
    sub: "VERSION 1.0 // SCHLANGENFILTER AKTIV",
    resultH: "DEIN SOUL SCORE",
    passed: "ZUGRIFF GEWÄHRT. DU BIST EIN MENSCH.",
    failed: "ZUGRIFF VERWEIGERT. SCHLANGE ERKANNT.",
    retry: "TEST WIEDERHOLEN (EHRLICHKEITSCHECK)",
    enter: "DEN GARTEN BETRETEN",
    questions: [
      {
        q: "Ein Freund vertraut dir ein Geheimnis an. Eine Firma bietet 1 Mio. $ dafür. Dein Move?",
        o1: "Geheimnis bewahren. Ehre ist Metall.",
        o2: "Geld nehmen. Es ist nur Geschäft."
      },
      {
        q: "Du siehst eine Plastikflasche im Wald. Was tust du?",
        o1: "Aufheben. Holz braucht kein Plastik.",
        o2: "Liegen lassen. Nicht mein Problem."
      },
      {
        q: "Die Matrix bietet dir eine bequeme Lüge oder die schmerzhafte Wahrheit. Wähle.",
        o1: "Schmerzhafte Wahrheit. Jedes Mal.",
        o2: "Bequeme Lüge. Frieden ist besser."
      }
    ]
  }
};

const SoulTestPage = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // ZACHOVÁNO BODOVÁNÍ Z DUMPU
  const questions = [
    { q: txt.questions[0].q, options: [{ text: txt.questions[0].o1, pts: 20 }, { text: txt.questions[0].o2, pts: -50 }] },
    { q: txt.questions[1].q, options: [{ text: txt.questions[1].o1, pts: 20 }, { text: txt.questions[1].o2, pts: -30 }] },
    { q: txt.questions[2].q, options: [{ text: txt.questions[2].o1, pts: 60 }, { text: txt.questions[2].o2, pts: -100 }] }
  ];

  const handleAnswer = (pts: number) => {
    const nextScore = score + pts;
    setScore(nextScore);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col selection:bg-[#cd5c09] selection:text-black">
      <LanguageToggle />
      
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-zinc-900/30 border border-zinc-800 p-8 md:p-12 rounded-[40px] backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
             <Zap size={120} className="text-[#cd5c09]" />
          </div>

          {!showResult ? (
            <div className="relative z-10 animate-in fade-in duration-500">
               <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2 italic">{txt.title}</h1>
               <p className="text-[#cd5c09] text-[10px] font-black uppercase tracking-[0.4em] mb-12">{txt.sub}</p>
               
               <div className="mb-12">
                  <span className="text-zinc-600 text-xs font-black uppercase mb-4 block">Question {currentQuestion + 1} / {questions.length}</span>
                  <p className="text-xl md:text-2xl font-bold uppercase leading-tight text-white border-l-4 border-[#cd5c09] pl-6">
                    {questions[currentQuestion].q}
                  </p>
               </div>

               <div className="space-y-4">
                  {questions[currentQuestion].options.map((opt, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleAnswer(opt.pts)}
                      className="w-full text-left p-6 border border-zinc-800 bg-black/50 hover:border-[#cd5c09] hover:bg-[#cd5c09]/5 transition-all flex justify-between items-center group"
                    >
                      <span className="text-sm font-black uppercase tracking-widest group-hover:text-white">{opt.text}</span>
                      <ArrowRight size={18} className="text-zinc-700 group-hover:text-[#cd5c09] group-hover:translate-x-1 transition-all"/>
                    </button>
                  ))}
               </div>
            </div>
          ) : (
            <div className="text-center relative z-10 animate-in zoom-in duration-700">
               <h2 className="text-zinc-500 font-black uppercase tracking-widest text-xs mb-4">{txt.resultH}</h2>
               <div className={`text-7xl md:text-9xl font-black mb-8 italic tracking-tighter ${score > 50 ? 'text-green-500' : 'text-red-600'}`}>
                 {score}%
               </div>

               <div className="mb-12 p-6 bg-black border border-zinc-800 rounded-2xl">
                  {score > 50 ? (
                    <div className="flex flex-col items-center gap-4">
                       <ShieldCheck size={48} className="text-green-500" />
                       <p className="text-xl font-black uppercase">{txt.passed}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                       <ShieldAlert size={48} className="text-red-600" />
                       <p className="text-xl font-black uppercase">{txt.failed}</p>
                    </div>
                  )}
               </div>

               <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button onClick={reset} className="px-8 py-4 border border-zinc-700 text-zinc-500 font-black uppercase text-xs hover:border-white hover:text-white transition-all flex items-center justify-center gap-2">
                    <RefreshCcw size={14}/> {txt.retry}
                  </button>
                  {score > 50 && (
                    <button onClick={() => navigate('/orchard')} className="px-8 py-4 bg-[#cd5c09] text-black font-black uppercase text-xs hover:bg-white transition-all flex items-center justify-center gap-2">
                       {txt.enter} <ArrowRight size={14}/>
                    </button>
                  )}
               </div>
            </div>
          )}

        </div>
      </main>

      <MemorialFooter />
    </div>
  );
};

export default SoulTestPage;