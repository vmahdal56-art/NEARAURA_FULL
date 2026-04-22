import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MemorialFooter from '../components/MemorialFooter';
import SoulGuard from '../components/SoulGuard';
import { 
  Wallet, Copy, CheckCircle, ArrowRight, ShieldCheck, 
  Clock, AlertTriangle, Terminal, Hand, FileCheck 
} from 'lucide-react';

// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const T: any = {
  EN: {
    h1Pay: "SECURE CONDUIT",
    h1Succ: "PACT SEALED",
    subPay: "DIRECT CRYPTO TRANSFER",
    subSucc: "MISSION INITIATED",
    amountLabel: "TRANSFER AMOUNT",
    warning: "WARNING: SEND ONLY USDT (ERC20).",
    lawTitle: "PROTOCOL: NIVNICE LAW",
    lawText: "\"IN OUR LAND, IT'S HAND-TO-HAND. NO NAMBY PAMBY. YOU SEND THE FUNDS -> WE TURN THEM INTO MATERIAL -> THE CHILD GETS THE KPZ. PROOF (PHOTO/VIDEO) DELIVERED BY EMAIL. PERIOD.\"",
    confirmBtn: "I HAVE SENT THE FUNDS (HANDSHAKE)",
    successTitle: "HANDSHAKE COMPLETE",
    successSub: "TRANSACTION DETECTED • LOGISTICS ACTIVATED",
    proofTitle: "THE 'SHOW ME THE GOODS' RULE",
    proofText: "We don't keep secrets. You will receive a PROOF OF DELIVERY (Photo/Video of the specific KPZ batch reaching the destination).",
    etaLabel: "EST. DELIVERY",
    statusLabel: "STATUS",
    processing: "PROCESSING...",
    returnBtn: "RETURN TO BASE"
  },
  FR: {
    h1Pay: "CONDUIT SÉCURISÉ",
    h1Succ: "PACTE SCELLÉ",
    subPay: "TRANSFERT CRYPTO DIRECT",
    subSucc: "MISSION INITIÉE",
    amountLabel: "MONTANT DU TRANSFERT",
    warning: "ATTENTION : ENVOYEZ UNIQUEMENT USDT (ERC20).",
    lawTitle: "PROTOCOLE : LOI DE NIVNICE",
    lawText: "\"CHEZ NOUS, C'EST DE LA MAIN À LA MAIN. PAS DE BLABLA. TU ENVOIES LES FONDS -> NOUS LES TRANSFORMONS EN MATÉRIEL -> L'ENFANT REÇOIT L'UNITÉ. PREUVE PAR PHOTO/VIDÉO PAR E-MAIL. POINT FINAL.\"",
    confirmBtn: "J'AI ENVOYÉ LES FONDS (POIGNÉE DE MAIN)",
    successTitle: "POIGNÉE DE MAIN RÉUSSIE",
    successSub: "TRANSACTION DÉTECTÉE • LOGISTIQUE ACTIVÉE",
    proofTitle: "LA RÈGLE 'MONTRE-MOI LE MATÉRIEL'",
    proofText: "Nous n'avons pas de secrets. Vous recevrez une PREUVE DE LIVRAISON (Photo/Vidéo du lot spécifique atteignant sa destination).",
    etaLabel: "LIVRAISON EST.",
    statusLabel: "STATUT",
    processing: "TRAITEMENT...",
    returnBtn: "RETOUR À LA BASE"
  },
  DE: {
    h1Pay: "SICHERE VERBINDUNG",
    h1Succ: "PAKT GESCHLOSSEN",
    subPay: "DIREKTER KRYPTO-TRANSFER",
    subSucc: "MISSION GESTARTET",
    amountLabel: "TRANSFERBETRAG",
    warning: "WARNUNG: NUR USDT (ERC20) SENDEN.",
    lawTitle: "PROTOKOLL: GESETZ VON NIVNICE",
    lawText: "\"BEI UNS GILT: HAND IN HAND. KEIN GEREDE. DU SCHICKST DIE MITTEL -> WIR WANDELN SIE IN MATERIAL UM -> DAS KIND ERHÄLT DIE EINHEIT. BEWEIS PER E-MAIL. PUNKT.\"",
    confirmBtn: "ICH HABE GESENDET (HANDSCHLAG)",
    successTitle: "HANDSCHLAG KOMPLETT",
    successSub: "TRANSAKTION ERKANNT • LOGISTIK AKTIVIERT",
    proofTitle: "DIE 'ZEIG MIR DIE WARE' REGEL",
    proofText: "Wir haben keine Geheimnisse. Sie erhalten einen LIEFERBEWEIS (Foto/Video der Charge am Zielort).",
    etaLabel: "LIEFERUNG CA.",
    statusLabel: "STATUS",
    processing: "IN ARBEIT...",
    returnBtn: "ZURÜCK ZUR BASIS"
  },
  CZ: {
    h1Pay: "BEZPEČNÝ KANÁL",
    h1Succ: "PAKT STVRZEN",
    subPay: "PŘÍMÝ KRYPTO PŘEVOD",
    subSucc: "MISE ZAHÁJENA",
    amountLabel: "ČÁSTKA K PŘEVODU",
    warning: "VAROVÁNÍ: POSÍLEJTE POUZE USDT (ERC20).",
    lawTitle: "PROTOKOL: ZÁKON NIVNICE",
    lawText: "„U NÁS PLATÍ: Z RUKY DO RUKY. ŽÁDNÉ NAMBY PAMBY. TY POŠLEŠ PROSTŘEDKY -> MY JE PŘETAVÍME V MATERIÁL -> DÍTĚ DOSTANE KPZ. DŮKAZ (FOTO/VIDEO) DORUČÍME EMAILEM. TEČKA.“",
    confirmBtn: "ODESLAL JSEM PROSTŘEDKY (PODÁNÍ RUKY)",
    successTitle: "RUKA BYLA PODÁNA",
    successSub: "TRANSAKCE DETEKOVÁNA • LOGISTIKA AKTIVOVÁNA",
    proofTitle: "PRAVIDLO 'UKAŽ ZBOŽÍ'",
    proofText: "Neschováváme tajemství. Obdržíte DŮKAZ O DORUČENÍ (Foto/Video konkrétní várky KPZ přímo z místa určení).",
    etaLabel: "EST. DORUČENÍ",
    statusLabel: "STAV",
    processing: "ZPRACOVÁVÁM...",
    returnBtn: "NÁVRAT NA ZÁKLADNU"
  }
};

const HelpPaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount || 100; 
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];
  
  const [step, setStep] = useState<'PAYMENT' | 'SUCCESS'>('PAYMENT');
  const [copied, setCopied] = useState(false);

  // WALLET ADDRESS (USDT ERC20) - ZACHOVÁNO 1:1
  const walletAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";

  // ETA Calculation
  const etaDate = new Date();
  etaDate.setDate(etaDate.getDate() + 14);
  const etaString = etaDate.toLocaleDateString(lang === 'CZ' ? 'cs-CZ' : 'en-GB');

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    window.scrollTo(0, 0);
    setStep('SUCCESS');
  };

  return (
    <SoulGuard minScore={10}>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-[#cd5c09] selection:text-black flex flex-col relative overflow-hidden">
        <LanguageToggle />
        
        {/* BACKGROUND EFFECT */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 to-black pointer-events-none"></div>

        <header className="pt-24 pb-8 text-center border-b border-zinc-900 bg-black relative z-10">
           <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2 text-white italic">
             {step === 'PAYMENT' ? txt.h1Pay : txt.h1Succ}
           </h1>
           <p className="text-zinc-500 font-mono uppercase tracking-[0.2em] text-[10px] md:text-xs">
             {step === 'PAYMENT' ? txt.subPay : txt.subSucc}
           </p>
        </header>

        <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl flex flex-col items-center justify-center relative z-10">

           {/* === STEP 1: THE WALLET (PAYMENT) === */}
           {step === 'PAYMENT' && (
              <div className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden animate-in fade-in duration-700">
                 
                 <div className="absolute top-0 right-0 bg-[#cd5c09] text-black text-[10px] font-black uppercase px-6 py-2 tracking-widest transform rotate-45 translate-x-10 translate-y-4 shadow-xl z-20">
                    NIVNICE DNA
                 </div>

                 {/* AMOUNT DISPLAY */}
                 <div className="text-center mb-12">
                    <div className="text-zinc-500 text-xs uppercase tracking-widest mb-4 font-bold">{txt.amountLabel}</div>
                    <div className="text-6xl md:text-8xl font-black text-[#cd5c09] tracking-tighter drop-shadow-[0_0_30px_rgba(205,92,9,0.3)]">
                       ${amount.toLocaleString()}
                    </div>
                 </div>

                 {/* WALLET BOX */}
                 <div className="bg-black border border-zinc-700 rounded-xl p-6 mb-8 relative group hover:border-[#cd5c09] transition-colors">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                       <div className="w-40 h-40 bg-white p-3 rounded-2xl flex-shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${walletAddress}`} alt="QR" className="w-full h-full"/>
                       </div>
                       <div className="flex-grow text-center md:text-left overflow-hidden w-full">
                          <div className="text-zinc-500 text-[10px] uppercase font-black mb-2 flex items-center gap-2 justify-center md:justify-start">
                             <Wallet size={12}/> USDT (ERC20 / ETHEREUM NETWORK)
                          </div>
                          <div className="font-mono text-sm md:text-base text-white break-all bg-zinc-900 p-4 rounded-lg border border-zinc-800 mb-4 group-hover:border-zinc-600 transition-colors">
                             {walletAddress}
                          </div>
                          <div className="text-red-500 text-[10px] font-black uppercase flex items-center gap-2 justify-center md:justify-start animate-pulse">
                             <AlertTriangle size={14}/> {txt.warning}
                          </div>
                       </div>
                    </div>
                    <button onClick={handleCopy} className="absolute top-4 right-4 p-3 bg-zinc-800 hover:bg-white hover:text-black rounded-full transition-all shadow-lg active:scale-90">
                       {copied ? <CheckCircle size={24} className="text-green-500"/> : <Copy size={24}/>}
                    </button>
                 </div>

                 {/* THE NIVNICE LAW (TEXT) */}
                 <div className="mb-10 p-6 bg-zinc-900/40 border-l-4 border-[#cd5c09] text-left rounded-r-xl">
                    <h3 className="text-[#cd5c09] font-black uppercase text-sm mb-3 flex items-center gap-2">
                       <Hand size={18}/> {txt.lawTitle}
                    </h3>
                    <p className="text-zinc-300 text-xs md:text-sm font-mono leading-relaxed italic">
                       {txt.lawText}
                    </p>
                 </div>

                 {/* ACTION BUTTON */}
                 <button 
                    onClick={handleConfirm}
                    className="w-full bg-[#cd5c09] text-black py-7 rounded-2xl font-black uppercase tracking-[0.2em] text-xl hover:bg-white hover:scale-[1.01] active:scale-95 transition-all shadow-[0_0_50px_rgba(205,92,9,0.2)]"
                 >
                    {txt.confirmBtn}
                 </button>
              </div>
           )}

           {/* === STEP 2: THE SUCCESS (CONFIRMATION) === */}
           {step === 'SUCCESS' && (
              <div className="w-full text-center space-y-12 animate-in fade-in zoom-in duration-500">
                 
                 <div className="relative inline-block">
                    <div className="absolute inset-0 bg-green-500 blur-[80px] opacity-20 rounded-full animate-pulse"></div>
                    <ShieldCheck size={140} className="text-green-500 relative z-10 drop-shadow-[0_0_30px_rgba(34,197,94,0.4)]" />
                 </div>

                 <div className="space-y-4">
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight italic">
                       {txt.successTitle}
                    </h2>
                    <p className="text-[#cd5c09] font-mono uppercase tracking-[0.3em] text-xs md:text-sm">
                       {txt.successSub}
                    </p>
                 </div>

                 <div className="max-w-2xl mx-auto bg-[#0a0a0a] border-2 border-green-900/30 p-8 md:p-12 rounded-[2rem] text-left relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 bg-green-900 text-green-100 text-[10px] font-black px-4 py-1 uppercase tracking-widest">
                       CONTRACT ACTIVE
                    </div>
                    
                    <div className="flex items-start gap-6 mb-8">
                       <div className="p-4 bg-green-900/10 rounded-2xl border border-green-900/20">
                          <FileCheck size={40} className="text-green-500"/>
                       </div>
                       <div>
                          <h3 className="text-white font-black uppercase text-xl mb-2 tracking-tight">{txt.proofTitle}</h3>
                          <p className="text-zinc-400 text-sm md:text-base leading-relaxed italic font-serif">
                             {txt.proofText}
                          </p>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 border-t border-zinc-900 pt-8">
                       <div>
                          <div className="text-zinc-500 text-[10px] uppercase font-black mb-2 flex items-center gap-2">
                             <Clock size={14}/> {txt.etaLabel}
                          </div>
                          <div className="text-2xl font-black text-white tracking-tighter">
                             {etaString}
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="text-zinc-500 text-[10px] uppercase font-black mb-2">
                             {txt.statusLabel}
                          </div>
                          <div className="text-2xl font-black text-[#cd5c09] animate-pulse uppercase tracking-tighter">
                             {txt.processing}
                          </div>
                       </div>
                    </div>
                 </div>

                 <button 
                    onClick={() => navigate('/orchard')}
                    className="inline-flex items-center gap-3 text-zinc-500 hover:text-white uppercase text-xs font-black tracking-[0.3em] border-b border-transparent hover:border-white pb-2 transition-all mt-8"
                 >
                    {txt.returnBtn} <ArrowRight size={16}/>
                 </button>

              </div>
           )}

        </main>
        <MemorialFooter />
      </div>
    </SoulGuard>
  );
};

export default HelpPaymentPage;