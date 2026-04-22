import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const functionsPath = path.join(__dirname, 'android_app', 'functions', 'index.js');

console.log(`>>> 🧬 TARGETING DNA AT: ${functionsPath}`);

const cloudFuncSupplement = `
// --- AURANET SDH SUPPLEMENT v4 (CLEAN RETURN) ---
exports.auraServiceIngress = functions.https.onCall(async (data, context) => {
  // Podpora pro v1 i v2 syntaxi
  const rawData = data && data.data ? data.data : data;
  const rawAuth = (data && data.auth) ? data.auth : (context ? context.auth : null);
  
  const { provider, payload, secretKey } = rawData || {};
  const SOVEREIGN_SECRET = "PROPERGEEZERINNIT";

  if (!rawAuth && secretKey !== SOVEREIGN_SECRET) {
    throw new functions.https.HttpsError('unauthenticated', 'Sovereign Access Only');
  }

  try {
    const docRef = await admin.firestore().collection("ledger").add({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      provider: String(provider || "EXTERNAL"),
      payload: JSON.parse(JSON.stringify(payload || {})), 
      verified: true,
      source: rawAuth ? "USER" : "MACHINE"
    });

    console.log("✅ LEDGER ENTRY CREATED:", docRef.id);
    
    // ZÁSADNÍ OPRAVA: Vracíme jen stringy, ne DocumentReference objekt!
    return { 
      status: "success", 
      id: docRef.id,
      msg: "Truth carved into stone."
    };
  } catch (error) {
    console.error("❌ LEDGER WRITE ERROR:", error.message);
    throw new functions.https.HttpsError('internal', 'Stone Carving Failed');
  }
});
`;

if (!fs.existsSync(functionsPath)) {
  console.error("❌ ERROR: index.js not found! Are you in the 'na' root?");
  process.exit(1);
}

const currentContent = fs.readFileSync(functionsPath, 'utf8');
const parts = currentContent.split('// --- AURANET SDH SUPPLEMENT');
fs.writeFileSync(functionsPath, parts[0].trim() + "\\n" + cloudFuncSupplement);

console.log("✅ Universal Solder v4 Applied. TA!");