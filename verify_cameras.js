const fs = require('fs');
const path = require('path');

const camerasPath = path.join(__dirname, 'src/data/devices/cameras.js');
const camerasContent = fs.readFileSync(camerasPath, 'utf8');

// Extract the object literal content
const match = camerasContent.match(/const cameraData = ({[\s\S]*?});/);
if (!match) {
    console.error('Could not parse cameraData object.');
    process.exit(1);
}

let cameraData;
try {
    cameraData = eval('(' + match[1] + ')');
} catch (e) {
    console.error('Error parsing camera data:', e);
    process.exit(1);
}

const cameraCount = Object.keys(cameraData).length;
console.log(`Successfully parsed camera data.`);
console.log(`Total cameras found: ${cameraCount}`);

if (cameraData['None']) {
    console.log('"None" entry is present.');
} else {
    console.error('"None" entry is MISSING!');
}

if (cameraData['RED DSMC2 GEMINI 5K S35']) {
    console.log('"RED DSMC2 GEMINI 5K S35" is present.');
} else {
    console.error('"RED DSMC2 GEMINI 5K S35" is MISSING!');
}
