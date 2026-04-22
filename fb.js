import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- INIT: CONFIG LOCK (STAGING) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("\n>>> 🎯 CONFIG LOCK: FORCING TARGET 'huddleme-staging'...");

// =============================================================================
// FIREBASE JSON (LOCKED TO STAGING)
// =============================================================================
const firebaseJsonContent = `{
  "hosting": {
    "site": "huddleme-staging",
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}`;

try {
    fs.writeFileSync(path.join(__dirname, 'firebase.json'), firebaseJsonContent, 'utf8');
    console.log("✅ FIREBASE.JSON UPDATED.");
    console.log(">>> SITE LOCKED TO: huddleme-staging");
    console.log(">>> NOW RUN: firebase deploy --only hosting");
} catch (e) {
    console.error("❌ ERROR WRITING CONFIG:", e);
}