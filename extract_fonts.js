const fs = require('fs');
const path = require('path');

const cssPath = '/Users/lucazanner/Documents/GitHub/cine-power-planner/src/styles/fonts.css';
const outputDir = '/Users/lucazanner/Documents/GitHub/cine-power-planner/src/fonts';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const cssContent = fs.readFileSync(cssPath, 'utf8');

// Regex to find font-family, src url with base64 data
// Looking for: font-family: 'Name'; ... src: url('data:font/format;base64,DATA') ...
const fontFaceRegex = /@font-face\s*{[^}]*?font-family:\s*['"]([^'"]+)['"][^}]*?src:\s*url\(['"]data:([^;]+);base64,([^'"]+)['"]\)([^;}]*?)[;}]/g;

let match;
let count = 0;

let newCssContent = cssContent;

while ((match = fontFaceRegex.exec(cssContent)) !== null) {
    const fullMatch = match[0];
    const fontFamily = match[1];
    const mimeType = match[2];
    const base64Data = match[3];

    let extension = 'woff';
    if (mimeType.includes('woff2')) extension = 'woff2';
    else if (mimeType.includes('truetype')) extension = 'ttf';
    else if (mimeType.includes('opentype')) extension = 'otf';

    // Create a filename. We might have multiple weights/styles for the same family.
    // To be safe and simple, let's try to infer style/weight from the block if possible, 
    // or just use a counter or hash if it's too complex to parse everything perfectly regex-wise.
    // Actually, let's parse the style and weight from the full match string.

    const weightMatch = fullMatch.match(/font-weight:\s*([a-zA-Z0-9]+)/);
    const styleMatch = fullMatch.match(/font-style:\s*([a-zA-Z]+)/);

    const weight = weightMatch ? weightMatch[1] : '400';
    const style = styleMatch ? styleMatch[1] : 'normal';

    const filename = `${fontFamily}-${weight}-${style}.${extension}`;
    const filePath = path.join(outputDir, filename);

    console.log(`Extracting ${filename}...`);

    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filePath, buffer);

    // Replace in CSS
    // We replace the data URI with the local path.
    // The local path in CSS should be relative to the CSS file.
    // CSS is in src/styles/, fonts are in src/fonts/. So path is ../fonts/filename

    const newUrl = `../fonts/${filename}`;
    // We need to be careful with replacement to only replace the specific src line or part of it.
    // The regex matched the whole @font-face block roughly, but capturing groups helped.
    // Let's just replace the data url part in the original string.

    // Construct the new src line
    // src: url('../fonts/filename') format('format');

    // Actually, simpler approach for replacement:
    // We have the exact base64 string. We can just replace "data:....base64,..." with the new url.

    const dataUri = `data:${mimeType};base64,${base64Data}`;
    newCssContent = newCssContent.replace(dataUri, newUrl);

    count++;
}

console.log(`Extracted ${count} fonts.`);

// Write the new CSS file
const newCssPath = '/Users/lucazanner/Documents/GitHub/cine-power-planner/src/styles/fonts_extracted.css';
fs.writeFileSync(newCssPath, newCssContent);
console.log(`Wrote new CSS to ${newCssPath}`);
