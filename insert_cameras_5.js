const fs = require('fs');
const path = require('path');

const camerasPath = path.join(__dirname, 'src/data/devices/cameras.js');
const fragmentPath = path.join(__dirname, 'new_cameras_fragment_5.txt');

const camerasContent = fs.readFileSync(camerasPath, 'utf8');
const fragmentContent = fs.readFileSync(fragmentPath, 'utf8');

const targetString = '  "Fujifilm X-H2S": {';
const insertionIndex = camerasContent.indexOf(targetString);

if (insertionIndex === -1) {
    console.error('Target string not found!');
    process.exit(1);
}

const newContent = camerasContent.slice(0, insertionIndex) + fragmentContent + camerasContent.slice(insertionIndex);

fs.writeFileSync(camerasPath, newContent, 'utf8');
console.log('Successfully inserted large batch of camera data.');
