/**
 * Firebase Project Audit Script (ES Module, Path-Correct)
 * Run from repo root: ~/na
 */

import { execSync } from "node:child_process";
import fs from "node:fs";

const OUTPUT_FILE = "firebase_audit_output.txt";

// ✅ Correct paths (relative to ~/na)
const WEB_DIR = "./web";
const ANDROID_DIR = "./android_app";

// Helper to check directory existence
function dirExists(path) {
  return fs.existsSync(path);
}

// Command runner with safe handling
function run(cmd) {
  try {
    return execSync(cmd, {
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024
    }).trim() || "(no output)\n";
  } catch {
    return "(command failed or no matches)\n";
  }
}

let output = "";
output += "======================================\n";
output += "FIREBASE PROJECT AUDIT (PATH-CORRECT)\n";
output += new Date().toISOString() + "\n";
output += "Working directory: " + process.cwd() + "\n";
output += "======================================\n\n";

/* ================= BASIC PROJECT INFO ================= */

output += "PROJECT ROOT FILES\n";
output += "--------------------------------------\n";
output += run("ls") + "\n";

output += "PROJECT DIRECTORY TREE (DEPTH 2)\n";
output += "--------------------------------------\n";
output += run("find . -maxdepth 2 -type d") + "\n";

/* ================= WEB APP ================= */

if (dirExists(WEB_DIR)) {
  output += "WEB APP FOUND ✅ (" + WEB_DIR + ")\n";
  output += "--------------------------------------\n";

  output += "WEB – package.json\n";
  output += run(`cat ${WEB_DIR}/package.json 2>/dev/null`) + "\n";

  output += "WEB – ENTRY POINT FILES\n";
  output += run(
    `find ${WEB_DIR} -maxdepth 4 \\( -iname "main.*" -o -iname "index.*" -o -iname "App.*" \\)`
  ) + "\n";

  output += "WEB – FIREBASE INIT\n";
  output += run(`grep -R "initializeApp" -n ${WEB_DIR}`) + "\n";

  output += "WEB – AUTH FLOW\n";
  output += run(
    `grep -R "onAuthStateChanged\\|getIdTokenResult\\|customClaims" -n ${WEB_DIR}`
  ) + "\n";

  output += "WEB – FIRESTORE USAGE\n";
  output += run(
    `grep -R "collection(\\|doc(\\|where(\\|onSnapshot" -n ${WEB_DIR}`
  ) + "\n";

  output += "WEB – ROUTING\n";
  output += run(`grep -R "router\\|Router" -n ${WEB_DIR}`) + "\n";
} else {
  output += "WEB APP NOT FOUND ❌ (" + WEB_DIR + ")\n\n";
}

/* ================= ANDROID APP ================= */

if (dirExists(ANDROID_DIR)) {
  output += "ANDROID APP FOUND ✅ (" + ANDROID_DIR + ")\n";
  output += "--------------------------------------\n";

  output += "ANDROID – STRUCTURE\n";
  output += run(`find ${ANDROID_DIR} -maxdepth 4 -type d`) + "\n";

  output += "ANDROID – ENTRY POINTS\n";
  output += run(
    `find ${ANDROID_DIR} -iname "MainActivity.*" -o -iname "Application.*"`
  ) + "\n";

  output += "ANDROID – FIREBASE INIT\n";
  output += run(
    `grep -R "FirebaseApp.initializeApp" -n ${ANDROID_DIR}`
  ) + "\n";

  output += "ANDROID – AUTH USAGE\n";
  output += run(`grep -R "FirebaseAuth" -n ${ANDROID_DIR}`) + "\n";

  output += "ANDROID – FIRESTORE USAGE\n";
  output += run(
    `grep -R "FirebaseFirestore\\|collection(" -n ${ANDROID_DIR}`
  ) + "\n";
} else {
  output += "ANDROID APP NOT FOUND ❌ (" + ANDROID_DIR + ")\n\n";
}

/* ================= FIREBASE CONFIG ================= */

output += "FIREBASE CONFIG FILES\n";
output += "--------------------------------------\n";
output += run("ls firebase.json .firebaserc 2>/dev/null") + "\n";

output += "firebase.json\n";
output += run("cat firebase.json 2>/dev/null") + "\n";

/* ================= SECURITY RULES ================= */

output += "SECURITY RULE FILES\n";
output += "--------------------------------------\n";
output += run('find . -iname "*rules*"') + "\n";

output += "FIRESTORE RULES\n";
output += run("cat firestore.rules 2>/dev/null") + "\n";

/* ================= FUNCTIONS ================= */

output += "CLOUD FUNCTIONS\n";
output += "--------------------------------------\n";
output += run("ls functions 2>/dev/null") + "\n";

output += "FUNCTION TRIGGERS\n";
output += run(
  'grep -R "onCall\\|onRequest\\|onCreate\\|onUpdate\\|onDelete" -n functions 2>/dev/null'
) + "\n";

/* ================= METRICS ================= */

output += "FILE COUNTS\n";
output += "--------------------------------------\n";
output += run("find . -type f | wc -l") + "\n";

fs.writeFileSync(OUTPUT_FILE, output);
console.log(`✅ Audit completed → ${OUTPUT_FILE}`);