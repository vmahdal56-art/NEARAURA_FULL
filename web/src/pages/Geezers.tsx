import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemorialFooter from '../components/MemorialFooter';
import { MessageSquare, Shield, Users, Hammer, Anchor, ArrowLeft, Send } from 'lucide-react';
// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const T: any = {
  EN: {
    back: "Back to Orchard",
    title: "GEEZERS CHAT",
    sub: "COUNCIL OF ELDERS • RAW WISDOM • NO FILTER",
    desc: "Got a problem? Ask the men who built the world with their hands. No 'soft skills' here. Just metal, wood, and truth.",
    placeholder: "Ask for a piece of advice...",
    btn: "SEND TO THE BENCH",
    characters: [
      { name: "OLD MAHDAL", role: "The Source", quote: "If you don't work, you don't eat. Period." },
      { name: "UNCLE V.", role: "The Fixer", quote: "A wooden wedge fixes what computers break." },
      { name: "THE BLACKSMITH", role: "The Anvil", quote: "Heat it up, hit it hard, let it cool. Same with life." }
    ]
  },
  FR: {
    back: "Retour au Verger",
    title: "CHAT DES ANCIENS",
    sub: "CONSEIL DES SAGES • SAGESSE BRUTE • SANS FILTRE",
    desc: "Un problème ? Demandez aux hommes qui ont construit le monde de leurs mains. Pas de 'soft skills'. Juste du métal, du bois et la vérité.",
    placeholder: "Demander un conseil...",
    btn: "ENVOYER AU BANC",
    characters: [
      { name: "VIEUX MAHDAL", role: "La Source", quote: "Si tu ne travailles pas, tu ne manges pas. Point." },
      { name: "ONCLE V.", role: "Le Réparateur", quote: "Un coin en bois répare ce que les PC cassent." },
      { name: "LE FORGERON", role: "L'Enclume", quote: "Chauffez, frappez fort, laissez refroidir. Comme la vie." }
    ]
  },
  DE: {
    back: "Zurück zum Garten",
    title: "GEEZER CHAT",
    sub: "RAT DER ÄLTESTEN • ROHE WEISHEIT • KEIN FILTER",
    desc: "Problem? Frag die Männer, die die Welt mit ihren Händen gebaut haben. Nur Metall, Holz und Wahrheit.",
    placeholder: "Frag um Rat...",
    btn: "AN DIE BANK SENDEN",
    characters: [
      { name: "DER ALTE MAHDAL", role: "Die Quelle", quote: "Wer nicht arbeitet, isst nicht. Punkt." },
      { name: "ONKEL V.", role: "Der Fixer", quote: "Ein Holzkeil richtet das, was PCs zerstören." },
      { name: "DER SCHMIED", role: "Der Amboss", quote: "Erhitzen, hart schlagen, abkühlen lassen." }
    ]
  },
  CZ: {
    back: "Zpět do Sadu",
    title: "GEEZERS CHAT",
    sub: "RADA STARŠÍCH • SYROVÁ MOUDROST • BEZ FILTRU",
    desc: "Máš problém? Zeptej se chlapů, co postavili svět vlastníma rukama. Žádný 'soft skills'. Jen kov, dřevo a pravda.",
    placeholder: "Požádej o radu...",
    btn: "POSLAT NA LAVIČKU",
    characters: [
      { name: "STARÝ MAHDAL", role: "Zdroj", quote: "Kdo nepracuje, nejí. Tečka." },
      { name: "STRÝC V.", role: "Opravář", quote: "Dřevěný klín opraví to, co počítače rozbijou." },
      { name: "KOVÁŘ", role: "Kovadlina", quote: "Nahřej to, práskni do toho, nech to vychladnout. Jako v životě." }
    ]
  }
};

const Geezers = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<any[]>([
    { from: "OLD MAHDAL", msg: "Sit down. Speak truth or go home." }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newChat = [...chat, { from: "YOU", msg: message }];
    setChat(newChat);
    setMessage("");

    // Geezer Response Simulation
    setTimeout(() => {
      setChat([...newChat, { 
        from: txt.characters[Math.floor(Math.random() * 3)].name, 
        msg: "Work harder. Talk less. Innit." 
      }]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 font-mono flex flex-col selection:bg-[#cd5c09] selection:text-black">
      <LanguageToggle />
      
      <main className="flex-grow pt-24 pb-12 px-6 max-w-5xl mx-auto w-full">
        
        {/* BACK BUTTON */}
        <button onClick={() => navigate('/orchard')} className="flex items-center gap-2 text-zinc-600 hover:text-white transition-colors mb-8 uppercase text-[10px] font-black tracking-widest group">
           <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> {txt.back}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT: THE GEEZERS LIST */}
          <div className="space-y-6">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">{txt.title}</h1>
            <p className="text-[#cd5c09] text-[10px] font-black uppercase tracking-[0.3em] mb-8">{txt.sub}</p>
            
            <div className="space-y-4">
              {txt.characters.map((g: any, i: number) => (
                <div key={i} className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl group hover:border-[#cd5c09] transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-black border border-zinc-700 rounded-lg group-hover:border-[#cd5c09]">
                       {i === 0 ? <Shield size={16}/> : i === 1 ? <Hammer size={16}/> : <Anchor size={16}/>}
                    </div>
                    <div>
                      <h3 className="text-white font-black text-xs uppercase">{g.name}</h3>
                      <p className="text-[9px] text-zinc-600 font-bold uppercase">{g.role}</p>
                    </div>
                  </div>
                  <p className="text-[11px] italic text-zinc-500 leading-relaxed">"{g.quote}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: THE CHAT TERMINAL */}
          <div className="lg:col-span-2 flex flex-col h-[70vh] bg-black border border-zinc-800 rounded-[2rem] overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#cd5c09]/30"></div>
            
            {/* MESSAGES */}
            <div className="flex-grow p-6 overflow-y-auto space-y-4 custom-scrollbar">
              <p className="text-[10px] text-zinc-700 text-center uppercase tracking-widest mb-6">{txt.desc}</p>
              
              {chat.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.from === 'YOU' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[9px] font-black mb-1 uppercase text-zinc-600 tracking-tighter">{m.from}</span>
                  <div className={`max-w-[80% ] p-4 text-xs ${m.from === 'YOU' ? 'bg-zinc-800 text-white rounded-l-xl rounded-tr-xl' : 'bg-zinc-900 border border-zinc-800 text-[#cd5c09] rounded-r-xl rounded-tl-xl'}`}>
                    {m.msg}
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT AREA */}
            <div className="p-6 bg-zinc-900/50 border-t border-zinc-800 flex gap-4 items-center">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={txt.placeholder}
                className="flex-grow bg-black border border-zinc-700 px-6 py-4 text-xs text-white outline-none focus:border-[#cd5c09] transition-colors rounded-full"
              />
              <button 
                onClick={handleSend}
                className="p-4 bg-[#cd5c09] text-black rounded-full hover:bg-white transition-all shadow-lg"
              >
                <Send size={20}/>
              </button>
            </div>
          </div>

        </div>
      </main>

      <MemorialFooter />
    </div>
  );
};

export default Geezers;