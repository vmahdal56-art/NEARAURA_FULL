import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix pro ES Modules (náhrada za __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🛡️ NEARAURA FUSION: CONNECTING ORGANS (NNN PROTOCOL)...");

function write(filePath, content) {
    const fullPath = path.join(__dirname, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content.trim());
    console.log(`✅ [CREATED] ${filePath}`);
}

function patch(filePath, searchString, replaceString, logMsg) {
    const fullPath = path.join(__dirname, filePath);
    if (!fs.existsSync(fullPath)) {
        console.error(`❌ FILE NOT FOUND: ${filePath}`);
        return;
    }
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Safety check - nedělat patch, pokud už tam je
    if (content.includes(replaceString)) {
        console.log(`⚠️  [SKIP] ${logMsg} (Already present)`);
        return;
    }
    
    if (content.includes(searchString)) {
        content = content.replace(searchString, replaceString);
        fs.writeFileSync(fullPath, content);
        console.log(`✅ [PATCHED] ${logMsg}`);
    } else {
        console.warn(`⚠️  [FAIL] Could not find anchor for: ${logMsg}`);
    }
}

// =============================================================================
// KROK 1: VYTVOŘENÍ BACKEND SLUŽEB (NEEXISTUJÍ, TAKŽE WRITE)
// =============================================================================

write('web/src/services/firebase.ts', `
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// ⚠️ ZDE VLOŽTE SVŮJ FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSy_PLACEHOLDER",
  authDomain: "huddleme-staging.firebaseapp.com",
  projectId: "huddleme-staging",
  storageBucket: "huddleme-staging.appspot.com",
  messagingSenderId: "123",
  appId: "1:123:web:123"
};

let app, db;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch(e) { console.warn("Firebase Init Failed"); }

export const addToWaitlist = async (email: string) => {
    if(!db) throw new Error("No DB");
    await addDoc(collection(db, "waitlist"), { 
        email, 
        timestamp: serverTimestamp(), 
        source: "web_fusion" 
    });
};
`);

// =============================================================================
// KROK 2: INJEKCE MATRIXU 3.0 DO DATABÁZE (PATCH)
// =============================================================================

console.log("💉 INJECTING REALM LOGIC INTO DATABASE...");
const dbPath = 'web/src/ManifestoDatabase.ts';

// Definice Realmů pro export
const realmExport = `
export const REALMS = {
  KIDS: { id: 'KIDS', label: 'KIDS SHIELD', range: '0-15', color: 'text-white', border: 'border-white', bg: 'bg-white/10' },
  YOUTH: { id: 'YOUTH', label: 'YOUTH REALM', range: '15-18', color: 'text-[#22D3EE]', border: 'border-[#22D3EE]', bg: 'bg-[#22D3EE]/10' },
  ADULT: { id: 'ADULT', label: 'SOVEREIGN', range: '18+', color: 'text-[#D4AF37]', border: 'border-[#D4AF37]', bg: 'bg-[#D4AF37]/10' },
  FLUID: { id: 'FLUID', label: 'FLUID REALM', range: '18+', color: 'text-[#EC4899]', border: 'border-[#EC4899]', bg: 'bg-[#EC4899]/10' }
};
`;

// 1. Přidat export REALMS
patch(dbPath, 'export const INITIALS', `${realmExport}\nexport const INITIALS`, 'Added REALMS definition');

// 2. Obohatit ovoce o Realmy (Regex Replacement)
const dbFullPath = path.join(__dirname, dbPath);
if (fs.existsSync(dbFullPath)) {
    let dbContent = fs.readFileSync(dbFullPath, 'utf8');
    const updates = {
        "id: 'hendy'": "realm: ['ADULT','FLUID'],",
        "id: 'pineapple'": "realm: ['YOUTH','ADULT','FLUID'],", // Youth Allowed
        "id: 'pear'": "realm: ['ADULT','FLUID'],",
        "id: 'mango'": "realm: ['FLUID'],",
        "id: 'banana'": "realm: ['ADULT','FLUID'],",
        "id: 'peach'": "realm: ['ADULT','FLUID'],",
        "id: 'orange'": "realm: ['KIDS','YOUTH','ADULT','FLUID'],",
        "id: 'grapes'": "realm: ['KIDS','YOUTH','ADULT','FLUID'],",
        "id: 'coconut'": "realm: ['KIDS','YOUTH','ADULT','FLUID'],",
        "id: 'melon'": "realm: ['KIDS','YOUTH','ADULT','FLUID'],",
        "id: 'cherry'": "realm: ['YOUTH','ADULT','FLUID'],",
        "id: 'youth'": "realm: ['YOUTH'],"
    };

    for (const [key, val] of Object.entries(updates)) {
        // Nahradí "id: 'hendy'," za "id: 'hendy', realm: [...],"
        // Ale jenom pokud tam ten realm už není
        const regexKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex chars
        if (!dbContent.includes(val)) {
            // Hledáme key, za nímž následuje čárka
            const regex = new RegExp(`${regexKey},`, 'g'); 
            dbContent = dbContent.replace(regex, `${key},\n    ${val}`);
        }
    }
    fs.writeFileSync(dbFullPath, dbContent);
    console.log("✅ [PATCHED] Orchard Matrix Rules applied.");
} else {
    console.error("❌ ManifestoDatabase.ts not found for patching!");
}


// =============================================================================
// KROK 3: CHIRURGIE APP.TSX (ZAPOJENÍ ORGÁNŮ)
// =============================================================================

console.log("💉 UPGRADING APP.TSX...");
const appPath = 'web/src/App.tsx';
const appFullPath = path.join(__dirname, appPath);

if (fs.existsSync(appFullPath)) {

    // A. PŘIDÁNÍ IMPORTŮ
    const newImports = `
import { addToWaitlist } from './services/firebase';
import ManifestoRadar from './ManifestoRadar';
import { REALMS } from './ManifestoDatabase';
`;
    patch(appPath, "import { \n    ORCHARD_DATA,", `${newImports}\nimport { \n    ORCHARD_DATA,`, "Added Imports");

    // B. PŘIDÁNÍ STATE (Radar + Realm)
    const stateLogic = `
    const [selectedFruit, setSelectedFruit] = useState<string | null>(null);
    const [activeRealm, setActiveRealm] = useState("ADULT");
    const [unlocked, setUnlocked] = useState(false); // RADAR GATE
`;
    patch(appPath, "const [selectedFruit, setSelectedFruit] = useState<string | null>(null);", stateLogic, "State: Radar & Realm");

    // C. LOGIKA FILTRACE (Matrix 3.0)
    const filterLogic = `
    // MATRIX 3.0 FILTER
    const visibleFruits = ORCHARD_DATA.filter((f:any) => f.realm && f.realm.includes(activeRealm));
    const currentFruit = visibleFruits.find((f:any) => f.id === selectedFruit);
`;
    patch(appPath, "const currentFruit = ORCHARD_DATA.find(f => f.id === selectedFruit);", filterLogic, "Logic: Fruit Filter");

    // D. OPRAVA MAPOVÁNÍ (Aby se zobrazovalo jen filtrované ovoce)
    let appContent = fs.readFileSync(appFullPath, 'utf8');
    // Nahradíme "ORCHARD_DATA.map" za "visibleFruits.map" pouze v sekci renderování gridu
    if (appContent.includes("ORCHARD_DATA.map")) {
        appContent = appContent.replace(/ORCHARD_DATA\.map/g, "visibleFruits.map");
        fs.writeFileSync(appFullPath, appContent);
        console.log("✅ [PATCHED] Grid now uses filtered fruits.");
    }

    // E. ZAPOJENÍ TLAČÍTEK DO HLAVIČKY (Realm Switcher)
    const realmButtons = `
              {/* REALM SWITCHER */}
              <div className="flex gap-2 ml-4 hidden lg:flex">
                 {Object.values(REALMS).map((r:any) => (
                   <button key={r.id} onClick={() => setActiveRealm(r.id)} 
                     className={\`text-[9px] font-black uppercase px-3 py-1 rounded border transition-all \${activeRealm === r.id ? \`\${r.bg} \${r.border} \${r.color}\` : 'border-transparent text-slate-600 hover:text-white'}\`}>
                     {r.label}
                   </button>
                 ))}
              </div>
`;
    // Vložíme za logo divider
    patch(appPath, '<div className="h-8 w-[1px] bg-[#F97316]/50 hidden md:block"></div>', `<div className="h-8 w-[1px] bg-[#F97316]/50 hidden md:block"></div>${realmButtons}`, "Header: Added Realm Buttons");

    // F. ZAPOJENÍ RADARU (BRÁNA)
    // Musíme obalit return <Router>... podmínkou
    const finalGate = `
export default function BootstrapApp() {
    // GATEWAY LOGIC: Pokud není odemčeno, ukaž Radar
    const [radarUnlocked, setRadarUnlocked] = React.useState(false);
    
    if (!radarUnlocked) {
        return <ManifestoRadar onEnter={() => setRadarUnlocked(true)} />;
    }

    return (
`;
    patch(appPath, "export default function BootstrapApp() {\n    return (", finalGate, "Gateway: Connected Radar");

} else {
    console.error("❌ App.tsx not found!");
}

console.log("================================================================");
console.log("🛡️ FUSION COMPLETE. SYSTEM OPERATIONAL.");
console.log("👉 RUN: cd web && npm run dev");
console.log("================================================================");