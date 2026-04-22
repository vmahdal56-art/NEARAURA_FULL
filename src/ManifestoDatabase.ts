import { 
  Shield, 
  Zap, 
  Lock, 
  Share2, 
  Smartphone, 
  Download, 
  HelpCircle, 
  Twitter, 
  Instagram, 
  Youtube, 
  Facebook, 
  Linkedin, 
  MessageCircle, 
  Twitch, 
  ArrowDownCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Siren, 
  Brain, 
  ShieldAlert, 
  AlertTriangle, 
  BookOpen, 
  Cpu, 
  Navigation, 
  Globe, 
  Sparkles, 
  Flame, 
  Heart, 
  Users, 
  Smile, 
  Gamepad2, 
  Cherry, 
  MapPin, 
  Check, 
  X, 
  Crown, 
  Info, 
  XCircle, 
  Send, 
  FileText, 
  Anchor, 
  ShoppingCart, 
  Ghost, 
  ExternalLink, 
  Apple, 
  Clock, 
  Star, 
  Phone, 
  Battery, 
  Wifi, 
  Signal, 
  Music, 
  Wind, 
  ArrowLeft, 
  Fingerprint
} from 'lucide-react';

// =============================================================================
// 🔱 NEARAURA SOVEREIGN DATABASE - MASTER RECORD
// =============================================================================
// ARCHITECT: Viktor Mahdal
// REVISION:  5.0 (Titan London Edition)
// STATUS:    DNA VERIFIED / NO COMPRESSION
// =============================================================================

// 🔱 SOVEREIGN EIGHT INITIALS

export const REALMS = {
  KIDS: { id: 'KIDS', label: 'KIDS SHIELD', range: '0-15', color: 'text-white', border: 'border-white', bg: 'bg-white/10' },
  YOUTH: { id: 'YOUTH', label: 'YOUTH REALM', range: '15-18', color: 'text-[#22D3EE]', border: 'border-[#22D3EE]', bg: 'bg-[#22D3EE]/10' },
  ADULT: { id: 'ADULT', label: 'SOVEREIGN', range: '18+', color: 'text-[#D4AF37]', border: 'border-[#D4AF37]', bg: 'bg-[#D4AF37]/10' },
  FLUID: { id: 'FLUID', label: 'FLUID REALM', range: '18+', color: 'text-[#EC4899]', border: 'border-[#EC4899]', bg: 'bg-[#EC4899]/10' }
};

export const INITIALS = "JV • JM • PM • VM • PM • LH • YM • VM";

export const ASSETS = {
  logo: "/logo.png", 
  jarmila: "https://placehold.co/400x400/000000/EC4899/png?text=Jarmila&font=playfair", 
  hero_overlay: "https://firebasestorage.googleapis.com/v0/b/huddleme-staging.appspot.com/o/hero_noise.png?alt=media",
  heatmap_path: "https://placehold.co/1200x1200/050505/202020/png?text=ZONE+1+MAP",
  noise_texture: "https://firebasestorage.googleapis.com/v0/b/huddleme-staging.appspot.com/o/noise_subtle.png?alt=media",
  orbit_bg: "https://firebasestorage.googleapis.com/v0/b/huddleme-staging.appspot.com/o/hero_noise.png?alt=media"
};

export const AXIOM = {
    motto: "TRUTH WINS.",
    founded: "2012 / 2026",
    location: "London Zone 1"
};

// =============================================================================
// 🍎 THE ORCHARD MATRIX (12 SOVEREIGN DNA INTENTS)
// =============================================================================
export const ORCHARD_DATA = [
  { 
    id: 'hendy',
    realm: ['ADULT','FLUID'], 
    icon: '👑',
    label: 'Hendy', 
    desc: 'Elite Integrity / High Score Only', 
    color: 'text-cyan-400',
    border: 'border-cyan-400/20',
    mix: 'High Score Profiles', 
    ban: 'Liars, Low Soul Score' 
  },
  { 
    id: 'pineapple',
    realm: ['YOUTH','ADULT','FLUID'], 
    icon: '🍍',
    label: 'Pineapple',
    desc: 'Serious / Marriage (48h Intent Lock)', 
    color: 'text-yellow-400',
    border: 'border-yellow-400/20',
    mix: 'Hendy, Pineapple', 
    ban: 'Banana, Peach' 
  },
  { 
    id: 'pear', 
    icon: '🍐',
    label: 'Pear', 
    desc: 'Family / Engagement / No Dating', 
    color: 'text-lime-400',
    border: 'border-lime-400/20',
    mix: 'Coconut, Orange', 
    ban: 'Pineapple, Banana' 
  },
  { 
    id: 'mango',
    realm: ['FLUID'], 
    icon: '🥭',
    label: 'Mango', 
    desc: 'Safe Queer Space / LGBTQ+ Verified', 
    color: 'text-orange-400',
    border: 'border-orange-400/20',
    mix: 'Mango, Hendy', 
    ban: 'Intolerant Entities' 
  },
  { 
    id: 'banana', 
    icon: '🍌',
    label: 'Banana', 
    desc: 'Male Intimacy / Casual Fun', 
    color: 'text-yellow-200',
    border: 'border-yellow-200/20',
    mix: 'Peach', 
    ban: 'Pineapple, Pear' 
  },
  { 
    id: 'peach', 
    icon: '🍑',
    label: 'Peach', 
    desc: 'Female Intimacy / Casual Fun', 
    color: 'text-pink-400',
    border: 'border-pink-400/20',
    mix: 'Banana', 
    ban: 'Pineapple, Pear' 
  },
  { 
    id: 'orange',
    realm: ['KIDS','YOUTH','ADULT','FLUID'], 
    icon: '🍊',
    label: 'Orange', 
    desc: 'Pure Friendship / Non-Sexual', 
    color: 'text-orange-500',
    border: 'border-orange-500/20',
    mix: 'All Nodes', 
    ban: 'Sexual Intent' 
  },
  { 
    id: 'grapes', 
    icon: '🍇',
    label: 'Grapes', 
    desc: 'Networking / Business / Events', 
    color: 'text-purple-500',
    border: 'border-purple-500/20',
    mix: 'All Nodes', 
    ban: 'Intimacy' 
  },
  { 
    id: 'coconut', 
    icon: '🥥',
    label: 'Coconut', 
    desc: 'Helper / Fixer / DIY Support', 
    color: 'text-stone-300',
    border: 'border-stone-300/20',
    mix: 'Pear, Orange', 
    ban: 'None' 
  },
  { 
    id: 'melon', 
    icon: '🍉',
    label: 'Melon', 
    desc: 'Sport / Hobby / Training', 
    color: 'text-green-500',
    border: 'border-green-500/20',
    mix: 'Orange', 
    ban: 'Laziness / Deception' 
  },
  { 
    id: 'cherry', 
    icon: '🍒',
    label: 'Cherry', 
    desc: 'Meet Now (30 min window)', 
    color: 'text-red-600',
    border: 'border-red-600/20',
    mix: 'Orange, Grapes', 
    ban: 'Pear' 
  },
  { 
    id: 'youth',
    realm: ['YOUTH'], 
    icon: '👻',
    label: 'Youth', 
    desc: '15-18 Years Only (Safe Zone)', 
    color: 'text-white',
    border: 'border-white/20',
    mix: 'Youth Only',
    ban: 'Adult Entities (Strict)' 
  }
];

export const GENESIS_POINTS = [
  { id: "01", t: "Sovereignty", d: "We reject the algorithm. You see who is physically near you. No shadowbanning. No manipulation. The map is the territory." },
  { id: "02", t: "The 12-Fruit Oath", d: "Intent must be declared before interaction. A Pineapple cannot lie to a Cherry. Biology is truth." },
  { id: "03", t: "Jarmila's Law", d: "10% of all revenue goes to the Jarmila Fund to aid victims of digital violence. We pay our tithe to justice." },
  { id: "04", t: "Hardware ID", d: "One human, one device. We ban the phone, not just the email. Bots cannot exist here. Metal is harder to fake than silicon." },
  { id: "05", t: "Ghost Mode", d: "You have the right to disappear. Complete invisibility when you need it. Privacy is not a setting, it is a state of being." },
  { id: "06", t: "Zone 1 Only", d: "We launch where the chaos is greatest. London Zone 1 is the proving ground. If we survive here, we survive anywhere." },
  { id: "07", t: "No Data Sale", d: "You are the customer, not the product. We monetize features, not your privacy. We are the vault, not the marketplace." },
  { id: "08", t: "Truth Wins", d: "The final axiom. If it is not true, it is not code. It is malware. We write only truth." }
];
export const FOOTER_LINKS = [
  { 
    title: "The Ecosystem", 
    links: [
      "The Orchard Protocol", 
      "Directors Manifesto", 
      "Jarmila Fund 10", 
      "London Zone 1 Map", 
      "Roadmap 2026", 
      "Founder Status"
    ] 
  },
  { 
    title: "Sovereign Tech", 
    links: [
      "Hardware ID Exile", 
      "Google Cloud Sentinel", 
      "Anti Ghosting AI", 
      "12 Fruit Oath", 
      "Quantum Encryption", 
      "Offline Mode Beta"
    ] 
  },
  { 
    title: "Legal & Conduct", 
    links: [
      "Terms of Service", 
      "Privacy Policy", 
      "Code of Conduct", 
      "Patent 2026 NA", 
      "Copyright IP", 
      "Law Enforcement Guide"
    ] 
  }
];

export const MANIFESTO_CONTENT: any = {

"default": [
    { type: "h2", text: "Access Denied" },
    { type: "p", text: "This protocol is currently encrypted. Please select a valid node from the Orchard or Footer menu." }
],

"the-orchard-protocol": [
    { type: "h2", text: "Biology Over Algorithm" },
    { type: "p", text: "The Orchard Protocol is not a feature. It is a biological firewall. In the chaotic digital jungle of 2026, human intent has been corrupted by infinite choice. We restore order by forcing a choice before the interaction begins." },
    { type: "image", src: "https://placehold.co/1200x600/050505/22D3EE/png?text=THE+ORCHARD+MATRIX&font=playfair", caption: "Fig 1.1: The 12-Fruit Intent Separation" },
    { type: "h3", text: "The Taxonomy of Intent" },
    { type: "p", text: "We have classified human romantic and social drive into 12 distinct frequencies. A user broadcasting 'Pineapple' (Long Term / Marriage) operates on a completely different frequency than a user broadcasting 'Banana' (Casual). The Protocol ensures these frequencies never cross paths unless explicit consent is given." },
    { type: "h2", text: "The Physics of Separation" },
    { type: "p", text: "This is not a filter you can toggle. It is a reality tunnel. If you select Cherry, you physically cannot see Pineapples on your radar. You are spared the noise of incompatible desires. This creates 'The Orchard' – a space of pure alignment." },
    { type: "h4", text: "Fruit Decay Protocol" },
    { type: "p", text: "Intent is not static. However, to prevent chaos, your Fruit Selection is locked for 48 hours. You cannot wake up a Pineapple and go to sleep a Banana. This enforces emotional stability in the ecosystem." }
],

"directors-manifesto": [
    { type: "h2", text: "The Origin: 50 Pounds & A Dream" },
    { type: "p", text: "NearAura was not born in a boardroom. It was born from a broken heart and a 50-pound ticket to the unknown in 2012. I stood in London Victoria with nothing but a vision and the cold rain of reality. It was not a startup idea; it was a survival mechanism." },
    { type: "image", src: "https://placehold.co/1200x600/050505/F97316/png?text=LONDON+ZONE+1+ORIGIN&font=playfair", caption: "Fig 1.2: The Place of In inception" },
    { type: "h3", text: "The Blood & Code" },
    { type: "p", text: "In late 2011, the world lost Jarmila. Her departure left a void that could not be filled, only transformed. This platform is not a startup, it is a sacrifice. It is the result of over 250,000 lines of sovereign code written in pursuit of one thing: Truth. Every pixel you see on this screen is dedicated to the idea that technology should protect the human heart, not exploit it." },
    { type: "h2", text: "The Spark in the Tube" },
    { type: "p", text: "Amidst the millions of passing faces in London, a vision emerged. We let potential soulmates walk past us simply because we lack a safe way to say: 'I see you.' The thought 'If you read this...' was the first line of code. We are not building a dating app. We are building a Reality Operating System." }
],

"jarmila-fund-10": [
    { type: "h2", text: "The 10% Tithe" },
    { type: "p", text: "We are building a business, yes. But we are also building a shield. 10% of every transaction – every subscription, every boost, every ad revenue – is irrevocably diverted to the Jarmila Fund." },
    { type: "image", src: "https://placehold.co/1200x600/050505/EC4899/png?text=JARMILA+FUND+LEDGER&font=playfair", caption: "Fig 1.3: Economy of Mercy" },
    { type: "h3", text: "Mission Parameters" },
    { type: "p", text: "The Fund has three active directives: 1. Legal Aid for victims of Cyber-Stalking. 2. Emergency Relocation funding for victims of domestic digital abuse. 3. Education on Digital Sovereignty for young women in Central Europe." },
    { type: "h2", text: "Transparent Ledger" },
    { type: "p", text: "We do not hide this money in foundations. The ledger will be public. You will see every GBP sent to aid. When you pay for NearAura, you are paying for justice. This is the economy of mercy." }
],

"terms-of-service": [
    { type: "h2", text: "Article I: The Sovereign Covenant" },
    { type: "p", text: "THIS IS A BINDING LEGAL AGREEMENT between you ('The User') and NearAura Ltd. ('The Sovereign Architecture'). By accessing the Orchard Matrix via any interface (Web, iOS, Android, Neural), you forfeit your right to anonymity within the system and accept the status of 'Identified Entity'. We do not offer a service; we offer a Protocol. Participation is a privilege, not a right." },
    { type: "h3", text: "1.1 The Hardware ID Immutable Bond" },
    { type: "p", text: "You acknowledge that NearAura utilizes proprietary 'Silicon Fingerprinting' technology (Pat. Pend. #2026-NA). We do not track cookies; we track the physical motherboard serial numbers, GPU clock drift, and biometric voltage. If you are banned, your device is bricked from our reality. Creating a new account requires purchasing new physical hardware. You agree that NearAura Ltd. bears no liability for the financial cost of your hardware obsolescence caused by your violation of our community standards." },
    { type: "h3", text: "1.2 The Jarmila Fund Tithe" },
    { type: "p", text: "You irrevocably agree that 10% of all gross payments made by you (Subscriptions, Boosts, Gifts) are automatically diverted to The Jarmila Fund. This is a charitable donation made in your name to aid victims of digital violence. This portion of your payment is non-refundable under any circumstances, including service termination, as it is immediately deployed to legal defense funds across the European Union." }
],

"privacy-policy": [
    { type: "h2", text: "Zero-Knowledge Constitution" },
    { type: "p", text: "We do not sell your data because we do not possess your data in a readable format. NearAura operates on a 'Vault Architecture'. Your messages, biometric templates, and location history are encrypted on your device using Kyber-768 (Post-Quantum Lattice Cryptography) before they ever touch our Google Cloud Sentinel servers." },
    { type: "image", src: "https://placehold.co/1200x600/050505/22D3EE/png?text=ENCRYPTION+LAYER+V4&font=monospace", caption: "Fig 3.1: The Encryption Tunnel" },
    { type: "h3", text: "1. Data We CANNOT See" },
    { type: "p", text: "1. Your Chat Content (E2EE). 2. Your Real-Time Exact Coordinates (We only see proximity hashes). 3. Your Payment Details (Handled solely by Stripe Treasury). Even under court order, we can only provide encrypted gibberish strings." }
],

"code-of-conduct": [
    { type: "h2", text: "The Gentleman's Warfare Manual" },
    { type: "p", text: "The Orchard is a curated space. We enforce a return to chivalry through algorithmic brutality. You are expected to behave with the dignity of a diplomat and the honesty of a monk. The following behaviors trigger the Sentinel AI Defense System:" },
    { type: "h3", text: "Level 1: The Fruit Oath" },
    { type: "p", text: "Do not select 'Pineapple' (Marriage) if you are seeking 'Banana' (Fun). This is fraud. If verified by 3 independent user reports, your account receives a 'Deceiver' badge visible to all future matches for 365 days." }
],

"patent-2026-na": [
    { type: "h2", text: "Intellectual Property Application" },
    { type: "p", text: "The 'Decentralized Proximity Integrity Network' (DPIN™) and the 'Hardware ID Exile Protocol' are proprietary technologies filed under USPTO Provisional Patent Application #2026-NA-UK-01. These claims cover the method of asynchronous intent handshake via BLE without centralized server matchmaking." }
]
};

export const DIRECTOR_FULL_TEXT = [
  { type: "h3", text: "The London Victoria Inception" },
  { type: "p", text: "NearAura was born in 2012 from a broken heart and a 50-pound ticket. I stood in the rain, seeing millions of faces passing by without a way to connect safely. It's a survival mechanism for the soul." },
  { type: "h3", text: "The Blood of Jarmila" },
  { type: "p", text: "This is not a business; it is a sacrifice. 250,000+ lines of code dedicated to one truth: technology must protect humans, not exploit them. Jarmila's legacy is the heartbeat of this system." }
];