import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFile = 'WEB_RESTORED.txt';

if (!fs.existsSync(inputFile)) {
    console.error(`❌ ERROR: ${inputFile} not found!`);
    process.exit(1);
}

console.log(">>> 🧬 STARTING DNA RECOVERY FROM WEB_RESTORED.txt...");

const content = fs.readFileSync(inputFile, 'utf8');
const files = content.split('--- FILE: ');

let restoredCount = 0;

files.forEach(fileBlock => {
    if (!fileBlock.trim()) return;

    const lineBreakIndex = fileBlock.indexOf(' ---');
    if (lineBreakIndex === -1) return;

    const filePathRaw = fileBlock.substring(0, lineBreakIndex).trim();
    const fileBody = fileBlock.substring(fileBlock.indexOf('\n') + 1);

    const targetPath = path.join(process.cwd(), filePathRaw);

    try {
        const targetDir = path.dirname(targetPath);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        fs.writeFileSync(targetPath, fileBody.trimEnd(), 'utf8');
        console.log(`✅ RESTORED: ${filePathRaw}`);
        restoredCount++;
    } catch (e) {
        console.error(`❌ FAILED ${filePathRaw}:`, e.message);
    }
});

console.log(`\n>>> 🏁 RECOVERY COMPLETE. ${restoredCount} files fixed.`);