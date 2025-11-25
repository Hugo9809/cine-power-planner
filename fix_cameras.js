const fs = require('fs');
const path = require('path');

const camerasPath = path.join(__dirname, 'src/data/devices/cameras.js');
let content = fs.readFileSync(camerasPath, 'utf8');

// Extract the object body
const startMarker = 'const cameraData = {';
const endMarker = '};';
const startIndex = content.indexOf(startMarker);
const endIndex = content.lastIndexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find cameraData object boundaries.');
    process.exit(1);
}

const header = content.substring(0, startIndex + startMarker.length);
const body = content.substring(startIndex + startMarker.length, endIndex);
const footer = content.substring(endIndex);

// Process body line by line to fix indentation
const lines = body.split('\n');
let fixedLines = [];
let indentLevel = 1; // Start inside cameraData

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line.length === 0) {
        fixedLines.push('');
        continue;
    }

    // Calculate indent for THIS line
    let printIndent = indentLevel;
    if (line.startsWith('}') || line.startsWith('],') || line.startsWith(']')) {
        printIndent--;
    }

    if (printIndent < 0) {
        console.error(`Error at line ${i}: ${line}`);
        console.error(`Print indent went negative: ${printIndent}`);
        // process.exit(1); // Continue to see full mess
    }
    fixedLines.push('  '.repeat(Math.max(0, printIndent)) + line);

    // Update indent for NEXT line
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    const openBrackets = (line.match(/\[/g) || []).length;
    const closeBrackets = (line.match(/\]/g) || []).length;

    indentLevel += (openBraces - closeBraces);
    indentLevel += (openBrackets - closeBrackets);
}

const fixedBody = fixedLines.join('\n');
const newContent = header + '\n' + fixedBody + footer;

// Write back
fs.writeFileSync(camerasPath, newContent);
console.log('Fixed indentation.');

// Verify
try {
    const match = newContent.match(/const cameraData = ({[\s\S]*?});/);
    eval('(' + match[1] + ')');
    console.log('Verification SUCCESS: Valid JS object.');
} catch (e) {
    console.error('Verification FAILED:', e.message);
}
