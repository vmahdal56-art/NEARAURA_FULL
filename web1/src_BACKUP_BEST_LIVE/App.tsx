import React, { useState, useEffect } from 'react';
import { 
  Shield, Zap, Lock, Share2, Smartphone, Download, HelpCircle, 
  Twitter, Instagram, Youtube, Facebook, Linkedin, MessageCircle, Twitch,
  ArrowDownCircle, CheckCircle2, ShieldCheck, Siren, Brain, ShieldAlert, 
  AlertTriangle, BookOpen, Cpu, Navigation, Globe, Sparkles, Flame, 
  Heart, Users, Smile, Gamepad2, Cherry, MapPin, Check, X, Crown, Info, XCircle, Send
} from 'lucide-react';

// --- ASSETS IMPORT ---
// Ujistěte se, že tyto soubory jsou ve složce src/
import logoPng from './logo.png'; 
import image1 from './image_1.svg';
import image3 from './image_3.svg';
import image4 from './image_4.svg';
// Heatmapa se načítá z public složky jako '/heatmap.png'

const INITIALS = "JV JM PM LA PM LH YM VM";

// --- DATA ---
const ORCHARD_DATA = [
  { id: 'hendy', label: 'Hendy', sub: 'Royal Soul', icon: '👑', color: 'text-[#22D3EE]', border: 'border-[#22D3EE]', desc: 'Elite Integrity Score.', mix: 'Všechny profily s vysokým skóre.', ban: 'Lháři, Nízké Soul Score.' },
  { id: 'pineapple', label: 'Ananas', sub: 'Serious', icon: '🍍', color: 'text-[#D4AF37]', border: 'border-[#D4AF37]', desc: 'Vážný vztah. 48h zámek intentu.', mix: 'Hendy, Ananas, Hruška (budoucí).', ban: 'Banán, Broskev (neslučitelné s úlety).' },
  { id: 'pear', label: 'Hruška', sub: 'Family', icon: '🍐', color: 'text-emerald-400', border: 'border-emerald-400', desc: 'Zadaní / Rodina. Zákaz randění.', mix: 'Kokos, Pomeranč, Hrozny.', ban: 'Ananas, Banán, Broskev, Třešeň.' },
  { id: 'mango', label: 'Mango', sub: 'Queer', icon: '🥭', color: 'text-purple-400', border: 'border-purple-400', desc: 'Safe Queer Space / LGBTQ+.', mix: 'Mango, Hendy, Pomeranč.', ban: 'Netolerantní entity.' },
  { id: 'banana', label: 'Banana', sub: 'Intimacy M', icon: '🍌', color: 'text-yellow-400', border: 'border-yellow-400', desc: 'Mužská intimita (Fyzická).', mix: 'Broskev, Banán (pokud Mango).', ban: 'Ananas, Hruška, Youth.' },
  { id: 'peach', label: 'Broskev', sub: 'Intimacy F', icon: '🍑', color: 'text-pink-500', border: 'border-pink-500', desc: 'Ženská intimita (Fyzická).', mix: 'Banán, Broskev (pokud Mango).', ban: 'Ananas, Hruška, Youth.' },
  { id: 'orange', label: 'Orange', sub: 'Friends', icon: '🍊', color: 'text-[#F97316]', border: 'border-[#F97316]', desc: 'Čisté přátelství. Platonic only.', mix: 'Všechny kromě Intimity.', ban: 'Očekávání sexu.' },
  { id: 'grape', label: 'Hrozny', sub: 'Groups', icon: '🍇', color: 'text-[#A855F7]', border: 'border-[#A855F7]', desc: 'Práce, Networking, Skupiny.', mix: 'Všechny (profesionální kontext).', ban: 'Intimita na pracovišti.' },
  { id: 'coconut', label: 'Kokos', sub: 'DIY Help', icon: '🥥', color: 'text-slate-200', border: 'border-slate-200', desc: 'Kutil & Sousedská výpomoc.', mix: 'Hruška, Pomeranč, Meloun.', ban: 'Žádné.' },
  { id: 'melon', label: 'Meloun', sub: 'Hobby', icon: '🍈', color: 'text-green-400', border: 'border-green-400', desc: 'Sport, Hry, Koníčky.', mix: 'Pomeranč, Hrozny, Kokos.', ban: 'Lenost.' },
  { id: 'cherry', label: 'Cherry', sub: 'Meet Now', icon: '🍒', color: 'text-red-500', border: 'border-red-500', desc: 'Okamžité setkání (do 30 min).', mix: 'Pomeranč, Banán, Broskev.', ban: 'Hruška (pokud není rodinná večeře).' },
  { id: 'youth', label: 'Youth', sub: '15-18 Only', icon: '👻', color: 'text-white', border: 'border-white', desc: 'Skibidi Zone. Oddělený svět.', mix: 'Pouze Youth.', ban: 'Všichni dospělí (18+).' }
];

const MATRIX_FEATURES = [
    { name: "Radar Range", t1: "30m", t2: "100m", t3: "500m", t4: "1km", t5: "Global", t6: "God Mode" },
    { name: "Active Fruits", t1: "1", t2: "2", t3: "3", t4: "4", t5: "All", t6: "All" },
    { name: "See Who Liked", t1: false, t2: false, t3: true, t4: true, t5: true, t6: true },
    { name: "Ghost Mode", t1: false, t2: false, t3: false, t4: true, t5: true, t6: true },
    { name: "Travel (Teleport)", t1: false, t2: false, t3: false, t4: false, t5: true, t6: true },
    { name: "No Ads", t1: false, t2: true, t3: true, t4: true, t5: true, t6: true },
    { name: "Super Likes/Day", t1: "0", t2: "1", t3: "3", t4: "5", t5: "10", t6: "∞" },
    { name: "Rewind (Undo)", t1: false, t2: false, t3: true, t4: true, t5: true, t6: true },
    { name: "Priority Listing", t1: false, t2: false, t3: false, t4: true, t5: true, t6: true },
    { name: "Incognito", t1: false, t2: false, t3: false, t4: true, t5: true, t6: true },
    { name: "Read Receipts", t1: false, t2: false, t3: true, t4: true, t5: true, t6: true },
    { name: "Founder Badge", t1: false, t2: false, t3: false, t4: false, t5: true, t6: true },
    { name: "Hendy Zone Access", t1: false, t2: false, t3: false, t4: false, t5: false, t6: true },
    { name: "Legacy Transfer", t1: false, t2: false, t3: false, t4: false, t5: true, t6: true },
    { name: "Support Level", t1: "Bot", t2: "Email", t3: "24h", t4: "1h", t5: "Direct", t6: "VIP" },
];

const GENESIS_POINTS = [
    { id: "01", t: "100m Radar Proximity", h: "Truth Over Distance", d: "NearAura rejects digital pen-pals. Our 100m Radar is a filter of reality." },
    { id: "02", t: "The 6-Fruit Oath", h: "Locked Intent Protocol", d: "Your word is your bond. You select your fruit and your intent is locked for 48 hours." },
    { id: "03", t: "Soul Score Algorithm", h: "The Math of Integrity", d: "Soul Score is not popularity; it is weight of truth. It tracks your ability to keep oaths." },
    { id: "04", t: "Hardware Exile Protocol", h: "Permanent Digital Death", d: "A standard ban is a joke. We ban the Device ID. If you violate the integrity, you are gone." },
    { id: "05", t: "Jarmila Heart-Cut (10%)", h: "Economy of Mercy", d: "Every interaction carries Jarmila's promise. 10% of fees flows to victims of digital violence." },
    { id: "06", t: "No Swiping Monopoly", h: "Breaking the Dopamine Loop", d: "Swiping is for cattle. NearAura forbids it. Choice in the Orchard is conscious and slow." },
    { id: "07", t: "Identity Sync Biometrics", h: "The Soul Face", d: "Fake photos cannot pass. We ensure the person on the radar is the person you meet." },
    { id: "08", t: "London Zonal Matrix", h: "Strategic Territory Control", d: "We control zones. London is our first stronghold. Each zone has its own heatmap." },
    { id: "09", t: "40x Founder Multiplier", h: "Reward for Builders", d: "The economic model rewards those who built the wall. Founders get a 40x multiplier." },
    { id: "10", t: "The Daughter Protocol", h: "Shield for Sisters", d: "A specialized code built for YM. Every woman is protected by an invisible shield." },
    { id: "11", t: "Zero Ads / Zero Data", h: "Private Sovereign Territory", d: "Your data is not a product. We do not sell your soul to advertisers. Revenue comes from integrity." },
    { id: "12", t: "Intent Locking System", h: "48-Hour Reality", d: "When you choose Pineapple, the world simplifies. You stay true to your choice for 2 days." },
    { id: "13", t: "The Golden 8 Council", h: "Family Governance", d: "NearAura belongs to the Family. The Sovereign Eight guarantee the DNA remains pure." },
    { id: "14", t: "Anti-Ghosting Logic", h: "Social Accountability", d: "Silence has consequences. Ghosting is a serpent behavior and directly lowers your Soul Score." },
    { id: "15", t: "Real-Time Heatmaps", h: "Visual Proof of Truth", d: "Our maps show the intensity of honest intents. See where Sovereigns gather." },
    { id: "16", t: "Genesis Legacy", h: "Built for 2026 and Beyond", d: "This is not a one-year project. It is the foundation of a new social reality." }
];

const MANIFESTO_TEXT = `
🔱 NEARAURA: THE TRUTH PROTOCOL (SOVEREIGN DNA)
Version: FINAL_GENESIS_2026
Dedicated to: Jarmila & The Truth

---

### 1. THE ORIGIN (GENESIS OF PAIN & HOPE)
"NearAura was not born in a boardroom. It was born from a broken heart and a 50-pound ticket to the unknown."

The Root: In late 2011, the world lost Jarmila – a mother, a teacher, and a beacon of honesty. Her departure left a void that could not be filled, only transformed. 
The Journey: In 2012, her son Viktor escaped to London. Alone, broken, with only 50 pounds in his pocket and no plan, he faced the vast anonymity of the metropolis.

The Spark: Amidst the millions of passing faces in the Tube and busy streets, a vision emerged. The realization that we let potential soulmates, friends, and saviors walk past us simply because we lack a safe way to say: "I see you."
The thought "If you read this..." was the first line of code written in the mind of the Architect.

---

### 2. THE PROBLEM (THE VOID)
"The Internet has become a mask for liars."

Current platforms (Tinder, Badoo, etc.) profit from illusion. They allow married men to pose as single, predators to pose as friends, and bots to pose as humans.
The Cost: Broken families, unsafe children, wasted time, and the erosion of trust.
The Verdict: Anonymity without accountability is a weapon. We will no longer tolerate it.

---

### 3. THE SOLUTION (THE ORCHARD)
"We connect the missed connections. We secure the insecure."

The Mechanism: NearAura is not a "dating app." It is a Reality Layer.
We do not trust text. We trust Hardware IDs, Biometrics, and Proximity. If the system says you are there, you are there.
The "Read This" Protocol: The feature "If you read this" is not just a chat opener. It is a digital handshake that can only happen between two verified, real humans who occupy the same space-time.

---

### 4. THE LAW OF TRUTH (JARMILA’S LEGACY)
"Pravda Vítězí (Truth Wins). Lies are the only enemy."

Zero Tolerance: In the NearAura ecosystem, a lie is a fatal error.
The Vacuum Protocol: Any user found lying about their status (marriage, criminal record, identity) or endangering others is permanently exited to The Vacuum.
No Returns: There are no second chances for those who prey on the innocence of others. This is our vow to every parent protecting their child.

---

### 5. THE MISSION
"Pravde čas nevadí, ani lesk všemocných peňazí."

We build this for those who come after us.
We build so that no daughter has to fear a meeting.
We build so that no father has to search for a lost son in vain.
We build to honor the memory of Jarmila, who taught us that a life lived in truth is the only life worth living.

TRUTH WINS.
`;

const RADAR_USERS = [
  { id: 1, name: "Alpha", score: 98, intent: "🍍", x: 30, y: 35 },
  { id: 2, name: "Had", score: 12, intent: "🐍", x: 75, y: 20 },
  { id: 3, name: "Beta", score: 94, intent: "🍌", x: 55, y: 70 },
  { id: 4, name: "Gamma", score: 88, intent: "🍑", x: 82, y: 55 },
];

// --- COMPONENTS ---

const SocialDock = () => (
  <div className="flex gap-4 md:gap-6 mt-10 justify-center md:justify-start flex-wrap">
    <a href="#" className="hover:scale-110 transition-transform"><Twitter size={24} className="text-slate-500 hover:text-[#1DA1F2]" /></a>
    <a href="#" className="hover:scale-110 transition-transform"><Instagram size={24} className="text-slate-500 hover:text-[#E1306C]" /></a>
    <a href="#" className="hover:scale-110 transition-transform"><Youtube size={24} className="text-slate-500 hover:text-[#FF0000]" /></a>
    <a href="#" className="hover:scale-110 transition-transform"><Facebook size={24} className="text-slate-500 hover:text-[#1877F2]" /></a>
    <a href="#" className="hover:scale-110 transition-transform"><Linkedin size={24} className="text-slate-500 hover:text-[#0A66C2]" /></a>
    <a href="#" className="hover:scale-110 transition-transform"><MessageCircle size={24} className="text-slate-500 hover:text-[#25D366]" /></a>
    <a href="#" className="hover:scale-110 transition-transform"><Twitch size={24} className="text-slate-500 hover:text-[#9146FF]" /></a>
  </div>
);

const WaitlistForm = () => {
    const [email, setEmail] = useState("");
    const [joined, setJoined] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(email) setJoined(true);
    };

    if(joined) return <div className="text-[#22D3EE] font-black uppercase tracking-widest bg-[#22D3EE]/10 p-6 rounded-xl border border-[#22D3EE]">Aura Secured. Welcome to the Queue.</div>;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto">
            <h3 className="text-white font-black uppercase tracking-widest text-sm">Join the Sovereign Queue</h3>
            <div className="flex gap-2">
                <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL..." 
                    className="bg-white/5 border border-white/20 p-4 rounded-lg w-full text-white placeholder-slate-500 focus:border-[#F97316] outline-none font-mono text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="bg-[#F97316] text-black px-6 font-black uppercase hover:bg-white transition-colors rounded-lg">
                    <Send size={20} />
                </button>
            </div>
            <p className="text-[10px] text-slate-500 uppercase">You are joining 142 other founders waiting for launch.</p>
        </form>
    );
};

const ReferralActions = () => {
    const shareText = "I found the end of swiping. Join me in the Sovereign Orchard. NearAura.";
    const url = "https://huddleme-staging.web.app";

    return (
        <div className="flex gap-4 justify-center mt-6">
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + url)}`} target="_blank" rel="noreferrer" 
               className="bg-[#25D366] text-black px-6 py-3 rounded-full font-black uppercase text-xs flex items-center gap-2 hover:bg-white transition-colors">
               <MessageCircle size={16}/> Share via WhatsApp
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer"
               className="bg-[#1877F2] text-white px-6 py-3 rounded-full font-black uppercase text-xs flex items-center gap-2 hover:bg-white hover:text-black transition-colors">
               <Facebook size={16}/> Share on Facebook
            </a>
        </div>
    );
};

// --- MAIN APP ---
export default function App() {
  const [selectedFruit, setSelectedFruit] = useState<string | null>(null);
  const [pulse, setPulse] = useState(true);
  const [foundersLeft, setFoundersLeft] = useState(142);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 3000);
    const founderTimer = setInterval(() => setFoundersLeft(prev => prev > 12 ? prev - 1 : 12), 60000);
    return () => { clearInterval(interval); clearInterval(founderTimer); };
  }, []);

  const currentFruit = ORCHARD_DATA.find(f => f.id === selectedFruit);
  const getHexColor = (colorClass: string) => {
     if(colorClass.includes('#')) return colorClass.match(/#[0-9A-Fa-f]{6}/)?.[0] || '#333';
     if(colorClass.includes('pink')) return '#EC4899';
     if(colorClass.includes('yellow')) return '#EAB308';
     if(colorClass.includes('emerald')) return '#10B981';
     if(colorClass.includes('purple')) return '#A855F7';
     if(colorClass.includes('red')) return '#EF4444';
     if(colorClass.includes('green')) return '#22C55E';
     return '#FFFFFF';
  };
  const hexColor = currentFruit ? getHexColor(currentFruit.color) : '#333';
  const glowIntensity = selectedFruit === 'hendy' ? '0 0 100px #22D3EE' : `0 0 60px ${hexColor}`;

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#F97316] overflow-x-hidden text-left relative">
      
      {/* 🔱 NAVIGACE */}
      <nav className="fixed top-0 w-full z-[100] bg-black/90 border-b border-white/10 px-6 py-4 flex justify-between items-center backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <img src={logoPng} alt="NearAura" className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" 
               onError={(e) => { e.currentTarget.style.display='none'; }} />
          <div className="leading-none">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase bg-gradient-to-r from-[#22D3EE] via-[#8B5CF6] to-[#F97316] bg-clip-text text-transparent">NearAura</h1>
            <p className="text-[10px] tracking-[0.4em] text-[#22D3EE] font-bold mt-1 uppercase">Sovereign Protocol 15:06</p>
          </div>
        </div>
        <div className="hidden xl:flex gap-10 text-[11px] font-[1000] tracking-[0.3em] text-slate-400 italic uppercase">
          {["DNA", "Radar", "Matrix", "Exile", "Contact"].map(l => (
            <a key={l} href={'#' + l.toLowerCase()} className="hover:text-white transition-all cursor-pointer border-b border-transparent hover:border-[#F97316] pb-1">{l}</a>
          ))}
        </div>
        <button className="bg-[#F97316] text-black px-10 py-4 font-[1000] text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg skew-x-[-10deg]">
          Exit Trolley 🍍
        </button>
      </nav>

      <main className="pt-32">
        {/* 🔱 HERO: NEURAL HEAD (DESIGN) */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#222_1px,transparent_1px)] bg-[length:30px_30px]" />
          
          {/* DECORATION IMAGE 1 (HERE) */}
          <img src={image1} className="absolute top-1/4 left-10 w-64 opacity-20 pointer-events-none animate-pulse hidden xl:block" alt="" />

          <div className="absolute top-32 right-4 md:right-10 border border-[#D4AF37] p-4 rounded-xl bg-black/50 backdrop-blur-md animate-pulse border-opacity-50 z-20">
            <div className="text-3xl md:text-4xl font-black text-[#D4AF37]">{foundersLeft}</div>
            <div className="text-[9px] uppercase tracking-widest text-slate-400">Founders Left</div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-6xl relative z-10">
            {/* THE HEAD */}
            <div className="relative z-10 w-[320px] h-[320px] md:w-[500px] md:h-[500px] transition-all duration-500 cursor-pointer"
               style={{ filter: `drop-shadow(${glowIntensity})` }}>
               <svg viewBox="0 0 300 300" className="w-full h-full">
                 <defs>
                   <radialGradient id="auraGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                     <stop offset="0%" stopColor={hexColor} stopOpacity="0.3" />
                     <stop offset="100%" stopColor="#000" stopOpacity="0" />
                   </radialGradient>
                 </defs>
                 <circle cx="150" cy="150" r="140" fill="url(#auraGlow)" className={pulse ? 'animate-pulse' : ''} />
                 
                 <path d="M150,50 C120,50 100,80 100,120 C100,150 110,170 120,180 L120,200 C120,220 90,230 90,250 L210,250 C210,230 180,220 180,200 L180,180 C190,170 200,150 200,120 C200,80 180,50 150,50 Z" 
                       fill="#000" stroke={hexColor} strokeWidth="3" />
                 
                 <circle cx="150" cy="110" r="20" fill={hexColor} fillOpacity="0.5" className="animate-ping" />

                 {ORCHARD_DATA.map((fruit, index) => {
                    const angle = (index * 30 - 90) * (Math.PI / 180);
                    const cx = 150 + 130 * Math.cos(angle);
                    const cy = 150 + 130 * Math.sin(angle);
                    return (
                      <g key={fruit.id} onClick={() => setSelectedFruit(fruit.id)} className="hover:scale-125 transition-transform cursor-pointer">
                        <circle cx={cx} cy={cy} r="18" fill="#000" stroke={getHexColor(fruit.color)} strokeWidth="2" className="hover:fill-white/10" />
                        <text x={cx} y={cy} dy="6" textAnchor="middle" fontSize="16">{fruit.icon}</text>
                      </g>
                    );
                 })}
               </svg>
            </div>

            {/* INTEL BUBBLE */}
            <div className="w-full md:w-[400px] min-h-[200px] flex items-center justify-center">
                {selectedFruit ? (
                   <div className={`p-8 border-2 ${currentFruit?.border} bg-black/80 backdrop-blur-xl rounded-3xl w-full animate-fade-in-up shadow-[0_0_50px_rgba(0,0,0,0.5)]`}>
                     <div className="flex items-center gap-4 mb-4">
                        <div className="text-6xl">{currentFruit?.icon}</div>
                        <div>
                            <h2 className={`text-3xl font-black uppercase ${currentFruit?.color}`}>{currentFruit?.label}</h2>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{currentFruit?.sub}</p>
                        </div>
                     </div>
                     <p className="text-sm font-bold text-white uppercase leading-relaxed mb-6 border-b border-white/10 pb-4">
                        "{currentFruit?.desc}"
                     </p>
                     <div className="space-y-2">
                        <div className="flex items-start gap-2 text-xs">
                            <Check className="text-green-500 shrink-0" size={14}/> 
                            <span className="text-slate-300"><strong className="text-white">Compatible:</strong> {currentFruit?.mix}</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs">
                            <XCircle className="text-red-500 shrink-0" size={14}/> 
                            <span className="text-slate-300"><strong className="text-white">Toxic:</strong> {currentFruit?.ban}</span>
                        </div>
                     </div>
                   </div>
                 ) : (
                   <div className="text-center p-10 border border-white/10 rounded-3xl bg-white/5">
                      <p className="text-xs text-slate-500 font-black tracking-widest uppercase animate-pulse mb-2">AWAITING INPUT</p>
                      <h3 className="text-2xl font-black text-white uppercase">SELECT A FRUIT NODE</h3>
                   </div>
                 )}
            </div>
          </div>

          <h1 className="text-[10vw] font-black italic leading-[0.8] uppercase tracking-tighter text-white mb-8 drop-shadow-2xl mt-10">
            THE END OF <br/> 
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#A855F7] to-[#F97316] bg-clip-text text-transparent">SWIPING.</span>
          </h1>
        </section>

        {/* 🔱 WAITLIST & REFERRAL */}
        <section className="bg-[#08080A] py-20 px-4 border-b border-white/10 text-center">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase mb-10">Get Early Access</h2>
                <WaitlistForm />
                
                <div className="mt-20 pt-10 border-t border-white/10">
                    <h3 className="text-[#F97316] font-black uppercase tracking-[0.3em] mb-4">Spread the Truth</h3>
                    <ReferralActions />
                </div>
            </div>
        </section>

        {/* 🔱 O2 INCIDENT */}
        <section className="py-40 px-6 bg-[#0A0A0C] border-b border-white/10 relative overflow-hidden">
            {/* DECORATION IMAGE 3 (HERE) */}
            <img src={image3} className="absolute -right-20 top-0 w-96 opacity-10 rotate-45 pointer-events-none" alt="" />
            
            <div className="max-w-[1500px] mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
                <div>
                    <h3 className="text-[#EC4899] font-black uppercase tracking-[0.5em] mb-4 text-sm">The O2 Arena Incident</h3>
                    <h2 className="text-5xl md:text-8xl font-black italic leading-none mb-8 uppercase">
                        "Are you just <br/> another <br/> <span className="text-slate-700 line-through">dating app?</span>"
                    </h2>
                </div>
                <div className="border-l-4 border-[#22D3EE] pl-10">
                    <h2 className="text-5xl md:text-8xl font-black italic text-[#22D3EE] mb-8 uppercase leading-none">
                        NO. <br/> WE ARE <br/> GENESIS.
                    </h2>
                    <p className="text-lg font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                        We killed the swipe. We restored the truth. <br/>
                        Welcome to the first <span className="text-white">Reality Operating System</span>.
                    </p>
                </div>
            </div>
        </section>

        {/* 🔱 RADARS */}
        <section id="radar" className="grid lg:grid-cols-2 border-b border-white/10 bg-black">
          <div className="p-10 md:p-20 border-r border-white/10 relative overflow-hidden">
            <h3 className="text-4xl md:text-6xl font-black italic mb-20 text-[#22D3EE] uppercase relative z-10">Radar A: Intent Sync</h3>
            <div className="relative aspect-square max-w-[500px] border-2 border-white/10 rounded-full flex items-center justify-center mx-auto mb-12 shadow-[0_0_100px_rgba(34,211,238,0.1)]">
              <div className="absolute inset-0 border-r-4 border-[#22D3EE] animate-spin rounded-full opacity-50" />
              {RADAR_USERS.map((u) => (
                <div key={u.id} className="absolute z-20" style={{ left: `${u.x}%`, top: `${u.y}%` }}>
                  <div className={`w-16 h-16 rounded-full border-2 bg-black flex items-center justify-center text-3xl shadow-xl ${u.score > 80 ? 'border-[#22D3EE]' : 'border-red-600'}`}>
                    {u.intent}
                  </div>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black font-black text-[9px] px-2 py-0.5 uppercase whitespace-nowrap">
                    {u.score}% SOUL
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[#22D3EE] font-black tracking-[0.3em] uppercase text-xs">Biometric Sync Active • 100M Radius</p>
          </div>
          <div className="p-10 md:p-20 relative overflow-hidden bg-[#050505]">
            <h3 className="text-4xl md:text-6xl font-black italic mb-20 text-[#F97316] uppercase relative z-10">Radar B: Zone Matrix</h3>
            <div className="relative aspect-square max-w-[500px] border-2 border-white/10 rounded-full flex items-center justify-center mx-auto mb-12 bg-[#111] overflow-hidden">
               <img src="/heatmap.png" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen" alt="" 
                    onError={(e) => e.currentTarget.style.display = 'none'} />
               <div className="absolute inset-0 bg-gradient-to-tr from-[#F97316]/20 via-transparent to-[#8B5CF6]/20 pointer-events-none"></div>
               <span className="text-[15vw] font-black italic text-white/5 tracking-tighter absolute uppercase select-none z-10">LDN</span>
            </div>
            <p className="text-[#F97316] font-black tracking-[0.3em] uppercase text-xs">London Zone 1 • Heatmap Live</p>
          </div>
        </section>

        {/* 🔱 MATRIX TABLE (6x15) */}
        <section id="matrix" className="py-60 px-6 bg-[#0A0A0C] border-b border-white/10 relative overflow-hidden">
          {/* DECORATION IMAGE 4 (HERE) */}
          <img src={image4} className="absolute bottom-0 left-0 w-full opacity-5 pointer-events-none" alt="" />
          
          <div className="max-w-[1600px] mx-auto relative z-10">
            <h2 className="text-5xl md:text-8xl font-black italic text-white mb-20 uppercase tracking-tighter text-center">
                THE <span className="text-[#D4AF37]">MATRIX</span>
            </h2>
            <div className="overflow-x-auto">
              <div className="min-w-[1000px] grid grid-cols-7 gap-2 text-center border border-white/10 bg-black/50 p-6 md:p-10 rounded-3xl backdrop-blur-md">
                <div className="text-left font-black text-xs text-slate-500 uppercase tracking-widest p-4">Feature</div>
                <div className="font-black text-xs text-slate-400 uppercase tracking-widest p-4">Tourist</div>
                <div className="font-black text-xs text-slate-300 uppercase tracking-widest p-4">Resident</div>
                <div className="font-black text-xs text-slate-200 uppercase tracking-widest p-4">Citizen</div>
                <div className="font-black text-xs text-white uppercase tracking-widest p-4">Patriot</div>
                <div className="font-black text-xs text-[#F97316] uppercase tracking-widest p-4 flex flex-col items-center gap-1"><Zap size={16}/> Founder</div>
                <div className="font-black text-xs text-[#22D3EE] uppercase tracking-widest p-4 flex flex-col items-center gap-1"><Crown size={16}/> Sovereign</div>

                {MATRIX_FEATURES.map((f, i) => (
                  <React.Fragment key={i}>
                    <div className="text-left py-4 border-b border-white/5 font-bold text-slate-300 uppercase text-[10px] tracking-wider px-4 flex items-center">{f.name}</div>
                    
                    <div className="py-4 border-b border-white/5 flex justify-center items-center">
                      {typeof f.t1 === 'boolean' ? (f.t1 ? <Check className="w-4 h-4 text-slate-500"/> : <X className="w-4 h-4 text-slate-800"/>) : <span className="text-slate-500 text-[10px] font-black">{f.t1}</span>}
                    </div>
                    <div className="py-4 border-b border-white/5 flex justify-center items-center">
                      {typeof f.t2 === 'boolean' ? (f.t2 ? <Check className="w-4 h-4 text-slate-400"/> : <X className="w-4 h-4 text-slate-800"/>) : <span className="text-slate-400 text-[10px] font-black">{f.t2}</span>}
                    </div>
                    <div className="py-4 border-b border-white/5 flex justify-center items-center">
                      {typeof f.t3 === 'boolean' ? (f.t3 ? <Check className="w-4 h-4 text-slate-300"/> : <X className="w-4 h-4 text-slate-800"/>) : <span className="text-slate-300 text-[10px] font-black">{f.t3}</span>}
                    </div>
                    <div className="py-4 border-b border-white/5 flex justify-center items-center">
                      {typeof f.t4 === 'boolean' ? (f.t4 ? <Check className="w-4 h-4 text-white"/> : <X className="w-4 h-4 text-slate-800"/>) : <span className="text-white text-[10px] font-black">{f.t4}</span>}
                    </div>
                    <div className="py-4 border-b border-white/5 flex justify-center items-center bg-[#F97316]/5">
                      {typeof f.t5 === 'boolean' ? (f.t5 ? <Check className="w-4 h-4 text-[#F97316]"/> : <X className="w-4 h-4 text-slate-800"/>) : <span className="text-[#F97316] text-[10px] font-black">{f.t5}</span>}
                    </div>
                    <div className="py-4 border-b border-white/5 flex justify-center items-center bg-[#22D3EE]/5">
                      {typeof f.t6 === 'boolean' ? (f.t6 ? <Check className="w-4 h-4 text-[#22D3EE]"/> : <X className="w-4 h-4 text-slate-800"/>) : <span className="text-[#22D3EE] text-[10px] font-black">{f.t6}</span>}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            {/* STATUS DEFINITIONS */}
            <div className="grid md:grid-cols-2 gap-10 mt-20 text-left">
                <div className="bg-[#F97316]/5 border border-[#F97316] p-10 rounded-2xl">
                    <h4 className="text-[#F97316] font-black text-2xl uppercase mb-4 flex items-center gap-2"><Zap/> FOUNDER STATUS</h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        Reserved for the first 1,000 believers who support the Genesis. Includes <strong className="text-white">Global Roaming</strong>, <strong className="text-white">40x Multiplier</strong> on future revenue share, and permanent <strong className="text-white">Gold Badge</strong>.
                    </p>
                    <button className="bg-[#F97316] text-black font-black uppercase text-xs px-4 py-2 rounded">Apply for Founder</button>
                </div>
                <div className="bg-[#22D3EE]/5 border border-[#22D3EE] p-10 rounded-2xl">
                    <h4 className="text-[#22D3EE] font-black text-2xl uppercase mb-4 flex items-center gap-2"><Crown/> SOVEREIGN ELITE</h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        The highest echelon of integrity. Requires <strong className="text-white">Soul Score 95+</strong> and biometric verification. Grants access to <strong className="text-white">God Mode</strong>, <strong className="text-white">Hendy Zone</strong>, and private concierge support.
                    </p>
                    <button className="bg-[#22D3EE] text-black font-black uppercase text-xs px-4 py-2 rounded">View Criteria</button>
                </div>
            </div>
          </div>
        </section>

        {/* 🔱 ORCHARD GRID */}
        <section className="py-40 px-6 bg-[#08080A] border-b border-white/10">
            <h2 className="text-center text-5xl md:text-8xl font-black italic text-white mb-20 uppercase tracking-tighter">
                THE <span className="text-[#F97316]">ORCHARD</span> GRID
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1600px] mx-auto">
                {ORCHARD_DATA.map((item) => (
                    <div key={item.id} className={`p-8 bg-white/5 border ${item.border} rounded-[30px] hover:bg-white/10 transition-all group min-h-[250px] flex flex-col justify-between relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                            <ShieldCheck size={32} className={item.color.replace('text-', 'text-')} />
                        </div>
                        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                        <div>
                            <h3 className={`text-2xl font-black italic uppercase ${item.color} mb-2`}>{item.label}</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* 🔱 GENESIS POINTS */}
        <section className="px-6 md:px-10 py-60 bg-[#0A0A0C] text-white text-left border-t border-white/5">
          <div className="max-w-[1600px] mx-auto">
            <h2 className="text-[10vw] font-[1000] italic leading-[0.8] mb-40 text-[#22D3EE] uppercase">NO. WE ARE GENESIS.</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-32">
              {GENESIS_POINTS.map((p) => (
                <div key={p.id} className="border-l-[6px] border-white/10 pl-10 group hover:border-[#22D3EE] transition-all">
                  <span className="block text-6xl font-[1000] italic text-slate-800 group-hover:text-[#22D3EE] mb-6 transition-colors">{p.id}</span>
                  <h4 className="text-3xl font-[1000] mb-6 tracking-tighter uppercase leading-none">{p.t}</h4>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-loose text-justify">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 🔱 THE CODEX */}
        <section className="bg-[#000] text-white py-40 px-6 border-t border-white/20" id="dna">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-5xl md:text-8xl font-black italic text-[#22D3EE] uppercase tracking-tighter mb-20 text-center">
                    THE CODEX
                </h2>
                <div className="border-l-4 border-[#F97316] pl-8 md:pl-20 py-4 bg-[#050505] p-10 rounded-r-[40px]">
                    <div className="font-mono text-sm md:text-lg leading-loose text-justify text-slate-300 whitespace-pre-wrap">
                        {MANIFESTO_TEXT}
                    </div>
                </div>
            </div>
        </section>
      </main>

      {/* 🔱 FOOTER */}
      <footer className="bg-black py-40 px-6 border-t border-white/20" id="contact">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-4 gap-20">
            <div className="col-span-1 md:col-span-1">
                <img src={logoPng} alt="NearAura" className="w-24 h-24 object-contain mb-6 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]" 
                     onError={(e) => { e.currentTarget.style.display='none'; }}/>
                <p className="text-slate-500 font-bold uppercase text-sm leading-relaxed">
                    The end of lonely swiping.<br/> Built on the promise to Jarmila.<br/> Secured by the Sovereign Eight.
                </p>
                <SocialDock />
            </div>
            
            {[
                { h: "Protocol", l: ["The Orchard", "London Launch", "6-Fruit Oath", "Hardware Exile"] },
                { h: "Security", l: ["Biometric Sync", "Soul Score", "Daughter Protocol", "Serpent Filter"] },
                { h: "Economics", l: ["Multiplier 40x", "Heart-Cut (10%)", "Jarmila Fund", "Founder Legacy"] }
            ].map((col, i) => (
                <div key={i}>
                    <h4 className="text-[#22D3EE] font-black uppercase tracking-[0.2em] mb-10 text-sm">{col.h}</h4>
                    <ul className="space-y-6">
                        {col.l.map(link => (
                            <li key={link} className="text-slate-400 font-black uppercase text-xs hover:text-white cursor-pointer tracking-widest transition-colors">{link}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

        <div className="text-center mt-40 pt-20 border-t border-white/10 opacity-30 hover:opacity-100 transition-opacity">
            <div className="text-[#D4AF37] font-black text-4xl md:text-9xl tracking-[1em] mb-10 select-none overflow-hidden uppercase">
                {INITIALS}
            </div>
            <p className="text-xs uppercase tracking-[1em] font-black italic">Sovereign Logic | © 2026</p>
        </div>
      </footer>
    </div>
  );
}