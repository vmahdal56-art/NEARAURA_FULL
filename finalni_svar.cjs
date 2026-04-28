const fs = require('fs');
const path = require('path');

console.log("==================================================");
console.log("🛠️ ZAPÍNÁM FINÁLNÍ SVÁŘEČKU - MAHDAL METAL 🛠️");
console.log("==================================================\n");

// 1. ŘEŠENÍ LOCATION SERVICE (Uříznutí fantomových drátů)
const locPath = path.join(__dirname, 'android_app/app/src/main/java/com/nearaura/app/LocationService.kt');
if (fs.existsSync(locPath)) {
    let lines = fs.readFileSync(locPath, 'utf8').split('\n');
    let changed = false;
    for (let i = 0; i < lines.length; i++) {
        if ((lines[i].includes('getHardwareId') || lines[i].includes('getDailyScreenTime')) && !lines[i].trim().startsWith('//')) {
            lines[i] = '// ✂️ MAHDAL METAL: Odříznuto (Nová navigace) -> ' + lines[i];
            changed = true;
        }
    }
    if (changed) {
        fs.writeFileSync(locPath, lines.join('\n'), 'utf8');
        console.log("✅ UŘÍZNUTO: Fantomové funkce v LocationService.kt byly zakomentovány.");
    } else {
        console.log("✅ ČISTÉ: LocationService.kt už neobsahuje aktivní staré dráty.");
    }
} else {
    console.log("⚠️ NENALEZENO: LocationService.kt - přeskočeno.");
}

// 2. ŘEŠENÍ MAIN ACTIVITY (Slícování ID kontejneru)
const mainPath = path.join(__dirname, 'android_app/app/src/main/java/com/nearaura/app/ui/MainActivity.kt');
if (fs.existsSync(mainPath)) {
    let code = fs.readFileSync(mainPath, 'utf8');
    if (code.includes('R.id.nav_host_fragment')) {
        code = code.replace(/R\.id\.nav_host_fragment/g, 'R.id.main_content_frame');
        fs.writeFileSync(mainPath, code, 'utf8');
        console.log("✅ SLÍCOVÁNO: ui/MainActivity.kt teď ukazuje na správné ID kontejneru (main_content_frame).");
    } else {
        console.log("✅ ČISTÉ: ui/MainActivity.kt už má ID opravené.");
    }
} else {
    console.log("❌ CHYBA: Nenalezen ui/MainActivity.kt - jsi ve správné složce?");
}

console.log("\n==================================================");
console.log("HOTOVO. Ocel je studená a pevná.");
console.log("==================================================");