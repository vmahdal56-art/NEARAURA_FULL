import React from 'react';
import { ShieldAlert, Fingerprint, Lock, Zap } from 'lucide-react';
// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const T: any = {
  EN: {
    title: "SECURITY ", span: "PORTAL",
    sub: "YOUR CONNECTION TO THE ORCHARD IS TIED TO THIS PHYSICAL DEVICE. IF THIS DEVICE IS EXILED, IT CAN NEVER RETURN.",
    hwid: "REGISTERED HWID",
    trust: "TRUST INDEX",
    verified: "VERIFIED",
    bio: "Biometric Sync",
    e2e: "E2E Messaging",
    bot: "Anti-Bot Shield"
  },
  FR: {
    title: "PORTAIL DE ", span: "SÉCURITÉ",
    sub: "VOTRE CONNEXION AU VERGER EST LIÉE À CET APPAREIL PHYSIQUE. SI CET APPAREIL EST EXILÉ, IL NE POURRA JAMAIS REVENIR.",
    hwid: "ID MATÉRIEL ENREGISTRÉ",
    trust: "INDICE DE CONFIANCE",
    verified: "VÉRIFIÉ",
    bio: "Sync Biométrique",
    e2e: "Messagerie E2E",
    bot: "Bouclier Anti-Bot"
  },
  DE: {
    title: "SICHERHEITS-", span: "PORTAL",
    sub: "IHRE VERBINDUNG ZUM GARTEN IST AN DIESES PHYSISCHE GERÄT GEBUNDEN. WENN DIESES GERÄT VERBANNT WIRD, KANN ES NIE ZURÜCKKEHREN.",
    hwid: "REGISTRIERTE HWID",
    trust: "VERTRAUENSINDEX",
    verified: "VERIFIZIERT",
    bio: "Biometrie-Sync",
    e2e: "E2E-Verschlüsselung",
    bot: "Anti-Bot-Schild"
  },
  CZ: {
    title: "BEZPEČNOSTNÍ ", span: "PORTÁL",
    sub: "VAŠE PŘIPOJENÍ K SADU JE VÁZÁNO NA TOTO FYZICKÉ ZAŘÍZENÍ. POKUD BUDE TOTO ZAŘÍZENÍ VYHOŠTĚNO, UŽ SE NIKDY NEMŮŽE VRÁTIT.",
    hwid: "REGISTROVANÉ HWID",
    trust: "TRUST INDEX",
    verified: "OVĚŘENO",
    bio: "Biometrická synch.",
    e2e: "E2E šifrování",
    bot: "Anti-Bot štít"
  }
};

export default function SecurityPortal() {
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];
  const mockHWID = "8F3A-92DE-0012-XB99"; // In prod, this pulls from the App sync
  
  return (
    <div className="pt-40 pb-20 px-6 bg-[#050000] min-h-screen text-white selection:bg-red-600">
      <LanguageToggle />
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-600/10 border-2 border-red-600/20 p-12 rounded-[60px] mb-12 relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.1)]">
          <ShieldAlert className="absolute -right-10 -top-10 text-red-600/10" size={240} />
          <h1 className="text-5xl font-black italic uppercase mb-6">
            {txt.title}<span className="text-red-600">{txt.span}</span>
          </h1>
          <p className="text-slate-400 font-bold italic uppercase tracking-widest mb-8 leading-relaxed">
            {txt.sub}
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 relative z-10">
            <div className="bg-black/40 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] block mb-2">{txt.hwid}</span>
              <code className="text-[#22D3EE] font-mono font-bold tracking-tighter">{mockHWID}</code>
            </div>
            <div className="bg-black/40 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] block mb-2">{txt.trust}</span>
              <span className="text-2xl font-black italic text-green-500">99.8% {txt.verified}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 border border-white/5 bg-zinc-900/20 rounded-[40px] text-center hover:border-[#D4AF37]/50 transition-all group">
                <Fingerprint className="mx-auto mb-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <h4 className="font-black italic uppercase text-xs text-zinc-500 group-hover:text-white transition-colors">{txt.bio}</h4>
            </div>
            <div className="p-8 border border-white/5 bg-zinc-900/20 rounded-[40px] text-center hover:border-[#D4AF37]/50 transition-all group">
                <Lock className="mx-auto mb-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <h4 className="font-black italic uppercase text-xs text-zinc-500 group-hover:text-white transition-colors">{txt.e2e}</h4>
            </div>
            <div className="p-8 border border-white/5 bg-zinc-900/20 rounded-[40px] text-center hover:border-[#D4AF37]/50 transition-all group">
                <Zap className="mx-auto mb-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <h4 className="font-black italic uppercase text-xs text-zinc-500 group-hover:text-white transition-colors">{txt.bot}</h4>
            </div>
        </div>
      </div>
    </div>
  );
}