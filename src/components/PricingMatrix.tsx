import React, { useState } from 'react';
import { Check, Crown, Star, Shield, Zap } from 'lucide-react';
// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';

const T: any = {
  EN: {
    h2: "CHOOSE WHO ",
    h2Span: "YOU WANT TO BE",
    sub: "WANT TO BE A FOUNDER? BE A FOUNDER. WANT TO BE HOF? BE HOF.",
    featRank: "Feature / Rank",
    monthly: "Monthly Contribution",
    free: "FREE",
    invite: "INVITE",
    btn: "I AM THIS",
    only: "ONLY",
    active: "ACTIVE",
    features: ["Radar Visibility", "See Who Liked You", "Unlimited Swipes", "Orchard Access", "Soul Score Check", "No Ads (Clean Aura)", "Hardware ID Verify", "Intent Lock (48h)", "Jarmila Fund (10%)", "Support Level", "Incognito Mode", "Revenue Multiplier", "Legacy Badge", "Panic Protocol", "Custom Fruit"]
  },
  FR: {
    h2: "CHOISISSEZ QUI ",
    h2Span: "VOUS VOULEZ ÊTRE",
    sub: "VOUS VOULEZ ÊTRE FONDATEUR ? SOYEZ FONDATEUR. HOF ? SOYEZ HOF.",
    featRank: "Caractéristique / Rang",
    monthly: "Contribution Mensuelle",
    free: "GRATUIT",
    invite: "INVITATION",
    btn: "JE SUIS CELA",
    only: "UNIQUEMENT",
    active: "ACTIF",
    features: ["Visibilité Radar", "Voir qui vous a aimé", "Swipes illimités", "Accès Verger", "Soul Score Check", "Pas de pub (Aura Propre)", "Vérif ID Matériel", "Verrou Intent (48h)", "Fonds Jarmila (10%)", "Niveau Support", "Mode Incognito", "Multiplicateur CA", "Badge Héritage", "Protocole Panique", "Fruit Personnalisé"]
  },
  DE: {
    h2: "WÄHLE WER ",
    h2Span: "DU SEIN WILLST",
    sub: "GRÜNDER WERDEN? SEI EIN GRÜNDER. HOF WERDEN? SEI HOF.",
    featRank: "Funktion / Rang",
    monthly: "Monatlicher Beitrag",
    free: "KOSTENLOS",
    invite: "EINLADUNG",
    btn: "DAS BIN ICH",
    only: "NUR",
    active: "AKTIV",
    features: ["Radar Sichtbarkeit", "Wer mag mich?", "Unbegrenzte Swipes", "Garten Zugang", "Soul Score Check", "Keine Werbung", "Hardware ID Check", "Absichtssperre", "Jarmila Fonds (10%)", "Support Ebene", "Inkognito-Modus", "Umsatz-Multiplikator", "Legacy Badge", "Panik-Protokoll", "Eigener Frucht"]
  },
  CZ: {
    h2: "VYBER SI, KÝM ",
    h2Span: "CHCEŠ BÝT",
    sub: "CHCEŠ BÝT ZAKLADATELEM? BUĎ JÍM. CHCEŠ BÝT HOF? BUĎ HOF.",
    featRank: "Funkce / Hodnost",
    monthly: "Měsíční příspěvek",
    free: "ZDARMA",
    invite: "POZVÁNKA",
    btn: "TO JSEM JÁ",
    only: "POUZE",
    active: "AKTIVNÍ",
    features: ["Viditelnost na radaru", "Kdo mě lajknul", "Neomezený swipe", "Přístup do sadu", "Soul Score Check", "Bez reklam (Clean Aura)", "Hardware ID Verify", "Zámek úmyslu (48h)", "Fond Jarmila (10%)", "Úroveň podpory", "Inkognito mód", "Násobič příjmů", "Odznak odkazu", "Panik protokol", "Vlastní ovoce"]
  }
};

const PricingMatrix = () => {
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  const [currency, setCurrency] = useState<'GBP' | 'USD' | 'EUR'>('GBP');

  const PRICING = {
    GBP: { s: '£', t1: '0', t2: '4.99', t3: '14.99', t4: '29.99', t5: '49.99', t6: '69.99', t7: '149', t8: txt.invite },
    USD: { s: '$', t1: '0', t2: '6.50', t3: '19.00', t4: '39.00', t5: '65.00', t6: '89.00', t7: '199', t8: txt.invite },
    EUR: { s: '€', t1: '0', t2: '5.90', t3: '17.50', t4: '35.00', t5: '59.00', t6: '79.00', t7: '179', t8: txt.invite }
  };

  const TIERS = [
    { name: "TOURIST", color: "text-zinc-500", icon: null },
    { name: "RESIDENT", color: "text-zinc-300", icon: null },
    { name: "CITIZEN", color: "text-white", icon: null },
    { name: "PATRIOT", color: "text-[#F97316]", icon: null },
    { name: "ELITE", color: "text-[#EAB308]", icon: Star },
    { name: "FOUNDER", color: "text-[#F97316]", icon: Shield },
    { name: "HOF", color: "text-[#22D3EE]", icon: Crown },
    { name: "SOVEREIGN", color: "text-purple-500", icon: Zap }
  ];

  // FEATURES mapovány na překlady - 100% ZACHOVÁNÍ HODNOT Z DUMPU
  const FEATURES = [
    { name: txt.features[0], t1: "100m", t2: "500m", t3: "2km", t4: "10km", t5: "50km", t6: "Global", t7: "Global+", t8: "Oracle" },
    { name: txt.features[1], t1: false, t2: true, t3: true, t4: true, t5: true, t6: true, t7: true, t8: true },
    { name: txt.features[2], t1: false, t2: true, t3: true, t4: true, t5: true, t6: true, t7: true, t8: true },
    { name: txt.features[3], t1: "View", t2: "Pick 1", t3: "Pick 3", t4: "Full", t5: "Full", t6: "Priority", t7: "VIP", t8: "Owner" },
    { name: txt.features[4], t1: "Basic", t2: "Basic", t3: "Full", t4: "Deep", t5: "Deep", t6: "Deep", t7: "God Mode", t8: "God Mode" },
    { name: txt.features[5], t1: false, t2: true, t3: true, t4: true, t5: true, t6: true, t7: true, t8: true },
    { name: txt.features[6], t1: true, t2: true, t3: true, t4: true, t5: true, t6: true, t7: true, t8: true },
    { name: txt.features[7], t1: false, t2: true, t3: true, t4: true, t5: true, t6: true, t7: true, t8: "Infinite" },
    { name: txt.features[8], t1: false, t2: false, t3: true, t4: true, t5: true, t6: true, t7: true, t8: "Direct" },
    { name: txt.features[9], t1: "None", t2: "Email", t3: "24h", t4: "Priority", t5: "Instant", t6: "Geezer Line", t7: "Concierge", t8: "Direct" },
    { name: txt.features[10], t1: false, t2: false, t3: false, t4: true, t5: true, t6: true, t7: true, t8: true },
    { name: txt.features[11], t1: "1x", t2: "1x", t3: "2x", t4: "5x", t5: "10x", t6: "20x", t7: "50x", t8: "100x" },
    { name: txt.features[12], t1: false, t2: false, t3: false, t4: false, t5: true, t6: true, t7: true, t8: true },
    { name: txt.features[13], t1: true, t2: true, t3: true, t4: true, t5: true, t6: true, t7: true, t8: true },
    { name: txt.features[14], t1: false, t2: false, t3: false, t4: false, t5: true, t6: true, t7: true, t8: true }
  ];

  const SYM = PRICING[currency].s;

  return (
    <section id="pricing" className="py-20 bg-black text-white border-t border-zinc-900 font-sans">
      <div className="max-w-[1600px] mx-auto px-4">
        
        {/* HEADER & CONTROLS */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">
              {txt.h2}<span className="text-[#F97316]">{txt.h2Span}</span>
            </h2>
            <p className="text-zinc-400 font-bold uppercase tracking-[0.2em] text-xs md:text-sm">
              {txt.sub}
            </p>
          </div>

          <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800 mt-6 md:mt-0">
            {['GBP', 'USD', 'EUR'].map((c) => (
              <button key={c} onClick={() => setCurrency(c as any)} className={`px-6 py-2 text-xs font-black rounded-md transition-all uppercase ${currency === c ? 'bg-[#F97316] text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* THE 8x15 GRID (ZACHOVÁNO) */}
        <div className="overflow-x-auto rounded-3xl border border-zinc-800 bg-[#050505]">
          <table className="w-full text-left border-collapse min-w-[1400px]">
            
            <thead>
              <tr className="bg-zinc-900/50">
                <th className="p-4 text-zinc-500 font-black uppercase text-xs sticky left-0 bg-[#050505] z-10 border-b border-zinc-800 border-r">{txt.featRank}</th>
                {TIERS.map((tier) => (
                  <th key={tier.name} className={`p-4 text-center border-b border-zinc-800 min-w-[120px] ${tier.color}`}>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {tier.icon && <tier.icon className="w-3 h-3" />}
                      <span className="text-xs font-black italic tracking-wider">{tier.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
              
              <tr className="bg-zinc-900/30">
                <td className="p-4 font-bold text-zinc-600 text-[10px] uppercase sticky left-0 bg-[#050505] z-10 border-b border-zinc-800 border-r">{txt.monthly}</td>
                <td className="p-4 text-center font-mono text-zinc-500 text-xs border-b border-zinc-800">{txt.free}</td>
                <td className="p-4 text-center font-mono text-zinc-300 text-xs font-bold border-b border-zinc-800">{SYM}{PRICING[currency].t2}</td>
                <td className="p-4 text-center font-mono text-white text-xs font-bold border-b border-zinc-800">{SYM}{PRICING[currency].t3}</td>
                <td className="p-4 text-center font-mono text-[#F97316] text-sm font-black border-b border-zinc-800">{SYM}{PRICING[currency].t4}</td>
                <td className="p-4 text-center font-mono text-[#EAB308] text-sm font-black border-b border-zinc-800">{SYM}{PRICING[currency].t5}</td>
                <td className="p-4 text-center font-mono text-[#F97316] text-lg font-black border-b border-zinc-800 animate-pulse">{SYM}{PRICING[currency].t6}</td>
                <td className="p-4 text-center font-mono text-[#22D3EE] text-sm font-black border-b border-zinc-800">{SYM}{PRICING[currency].t7}</td>
                <td className="p-4 text-center font-mono text-purple-500 text-xs font-black border-b border-zinc-800">{PRICING[currency].t8}</td>
              </tr>
            </thead>

            <tbody>
              {FEATURES.map((f, i) => (
                <tr key={i} className="hover:bg-zinc-900/20 transition-colors group">
                  <td className="p-3 border-b border-zinc-800/50 font-bold text-zinc-400 text-[10px] uppercase sticky left-0 bg-[#050505] z-10 border-r group-hover:bg-[#0a0a0a]">{f.name}</td>
                  {[f.t1, f.t2, f.t3, f.t4, f.t5, f.t6, f.t7, f.t8].map((val, j) => (
                    <td key={j} className="p-3 border-b border-zinc-800/50 text-center">
                      {typeof val === 'boolean' ? (
                        val ? <Check className="w-3 h-3 mx-auto text-[#F97316]" /> : <span className="text-zinc-800">-</span>
                      ) : (
                        <span className={`text-[9px] font-black uppercase ${j >= 6 ? 'text-[#22D3EE]' : j >= 3 ? 'text-white' : 'text-zinc-600'}`}>{val}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td className="p-4 sticky left-0 bg-[#050505] border-r border-zinc-800"></td>
                {TIERS.map((tier, i) => (
                  <td key={tier.name} className="p-4 text-center">
                    {i > 0 && i < 7 ? (
                      <button className={`w-full py-2 rounded-full font-black text-[9px] uppercase tracking-widest transition-transform hover:scale-105 ${tier.name === 'FOUNDER' ? 'bg-[#F97316] text-black hover:bg-white' : tier.name === 'HOF' ? 'bg-[#22D3EE] text-black hover:bg-white' : tier.name === 'ELITE' ? 'bg-[#EAB308] text-black hover:bg-white' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>{txt.btn}</button>
                    ) : i === 7 ? <span className="text-[9px] text-purple-500 font-bold uppercase">{txt.only}</span> : <span className="text-[9px] text-zinc-600 uppercase">{txt.active}</span>}
                  </td>
                ))}
              </tr>
            </tfoot>

          </table>
        </div>
      </div>
    </section>
  );
};

export default PricingMatrix;