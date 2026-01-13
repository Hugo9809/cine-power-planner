const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(ROOT_DIR, 'src', 'scripts', 'data', 'pink-mode-animated-icons.js');

function checkOutputFile() {
    if (!fs.existsSync(OUTPUT_FILE)) {
        console.error('Output file does not exist.');
        return;
    }

    const content = fs.readFileSync(OUTPUT_FILE, 'utf8');

    // Extract the store object manually or by evaluating (risky but okay for debug)
    // The file structure is:
    // (function(global){ ... var store = {}; store['key'] = "json"; ... })(...);

    // We can regex for the specific key assignment
    const key = 'src/animations/cat.json';
    const regex = new RegExp(`store\\['${key.replace(/\//g, '\\/')}'\\]\\s*=\\s*(".*?");`);
    const match = content.match(regex);

    if (match) {
        console.log(`Found assignment for '${key}'.`);
        try {
            const jsonString = JSON.parse(match[1]); // Parse the string literal
            const data = JSON.parse(jsonString); // Parse the inner JSON
            console.log('Successfully parsed JSON content.');
            console.log('Animation name:', data.nm);
            console.log('Layers count:', data.layers ? data.layers.length : 0);
        } catch (e) {
            console.error('Failed to parse JSON content:', e.message);
        }
    } else {
        console.error(`Could NOT find assignment for '${key}'.`);
    }
}

checkOutputFile();
