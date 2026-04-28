const fs = require('fs');
const path = require('path');

console.log("==================================================");
console.log("🛠️ ZAPÍNÁM PNEUMATICKÝ KLADIVO - MAHDAL METAL 🛠️");
console.log("==================================================\n");

// Hledáme MainActivity - zkusíme obě běžný cesty z tvýho repa
const pathsToTry = [
    path.join(__dirname, 'android_app/app/src/main/java/com/nearaura/app/MainActivity.kt'),
    path.join(__dirname, 'android_app/app/src/main/java/com/nearaura/app/ui/MainActivity.kt')
];

let mainActivityPath = null;
for (const p of pathsToTry) {
    if (fs.existsSync(p)) {
        mainActivityPath = p;
        break;
    }
}

if (!mainActivityPath) {
    console.log("❌ CHYBA: Nenašel jsem MainActivity.kt. Jsi ve správný složce?");
    process.exit(1);
}

console.log(`[1] Brousím soubor: ${mainActivityPath}`);

let ktCode = fs.readFileSync(mainActivityPath, 'utf8');

// Ocelová vložka s plnýma cestama, ať neřešíme importy
const metalBlock = `
        // --- MAHDAL METAL NAVAŘENO AUTOMATICKY ---
        try {
            val bottomNav = findViewById<com.google.android.material.bottomnavigation.BottomNavigationView>(R.id.bottom_navigation)
            val navHostFragment = supportFragmentManager.findFragmentById(R.id.nav_host_fragment) as? androidx.navigation.fragment.NavHostFragment
            if (bottomNav != null && navHostFragment != null) {
                androidx.navigation.ui.NavigationUI.setupWithNavController(bottomNav, navHostFragment.navController)
                println("AURA: Navigace úspěšně navařena!")
            } else {
                println("AURA CHYBA: Kontejnery nenalezeny! Zkontroluj activity_main.xml, jestli tam máš id 'bottom_navigation' a 'nav_host_fragment'.")
            }
        } catch (e: Exception) {
            println("AURA CHYBA: Selhalo sváření navigace - \${e.message}")
        }
        // -----------------------------------------
`;

if (ktCode.includes("MAHDAL METAL NAVAŘENO AUTOMATICKY")) {
    console.log("✅ Ocel už je navařená z dřívějška. Přeskakuji MainActivity.kt.");
} else {
    // Najdeme setContentView(R.layout.activity_main) nebo podobný a plácneme to za to
    const regex = /(setContentView\(.*\))/;
    if (regex.test(ktCode)) {
        ktCode = ktCode.replace(regex, `$1\n${metalBlock}`);
        fs.writeFileSync(mainActivityPath, ktCode, 'utf8');
        console.log("✅ Navařeno: setupWithNavController bouchnut do MainActivity.");
    } else {
        console.log("❌ CHYBA: Nenašel jsem setContentView v onCreate. Musíš to tam bouchnout ručně.");
    }
}

console.log("\n[2] Rentgenuju ozubený kola (XML IDčka)...");

const menuPath = path.join(__dirname, 'android_app/app/src/main/res/menu/bottom_nav_menu.xml');
// Prohledá složku navigation, jestli tam je graf
const navDir = path.join(__dirname, 'android_app/app/src/main/res/navigation');
let graphPath = null;
if (fs.existsSync(navDir)) {
    const files = fs.readdirSync(navDir);
    if (files.length > 0) graphPath = path.join(navDir, files[0]);
}

function extractIds(filePath) {
    if (!fs.existsSync(filePath)) return ["Soubor neexistuje"];
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = [...content.matchAll(/android:id="\@\+id\/([^"]+)"/g)];
    return matches.map(m => m[1]);
}

const menuIds = extractIds(menuPath);
const graphIds = graphPath ? extractIds(graphPath) : ["Nenalezen navigační graf"];

console.log("--------------------------------------------------");
console.log("IDčka v menu (bottom_nav_menu.xml):");
menuIds.forEach(id => console.log(`  -> ${id}`));
console.log("\nIDčka v grafech (nav_graph.xml apod.):");
graphIds.forEach(id => console.log(`  -> ${id}`));
console.log("--------------------------------------------------");
console.log("ZÁKON PONKU: Tyhle IDčka se musí u příslušných fragmentů SHODOVAT na písmeno přesně!");
console.log("Pokud se neshodují, flexa ti nepomůže a budeš mít černo.");
console.log("Hotovo. Vypínám kladivo.");