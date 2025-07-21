const fs = require('fs');
const devices = require('./data.js');

const map = {
  '2-pin LEMO': 'LEMO 2-pin',
  'Lemo 2-pin': 'LEMO 2-pin',
  'Lemo 2pin': 'LEMO 2-pin',
  '3-pin Fischer': 'Fischer 3-pin',
  'RS 3pin': 'Fischer 3-pin',
  'EXT (LEMO 7-pin)': 'EXT LEMO 7-pin',
  'Hirose 4pin': 'Hirose 4-pin',
  'Hirose 12pin': 'Hirose 12-pin',
  'Lens terminal 12-pin jack': 'Lens terminal 12-pin',
  'D-Tap / P-Tap': 'D-Tap',
  'P-Tap': 'D-Tap',
  'USB': 'USB-A',
  'USB Type-C 3.1 Gen 2': 'USB-C',
  'USB Type-C 3.1 Gen2': 'USB-C',
  'USB Type-C': 'USB-C',
  'USB Type-C®': 'USB-C',
  'USB-C 3.1 Gen 1': 'USB-C',
  'USB-C Data Terminal': 'USB-C',
  'USB-C Terminal (Grip)': 'USB-C',
  'USB-C Terminal (LCD Monitor)': 'USB-C'
};

for (const cam of Object.values(devices.cameras)) {
  const list = cam.power?.powerDistributionOutputs;
  if (Array.isArray(list)) {
    list.forEach(output => {
      if (output && output.type && map[output.type]) {
        output.type = map[output.type];
      }
    });
  }
}

const content =
  'let devices=' +
  JSON.stringify(devices, null, 2) +
  ';\n' +
  'if (typeof module !== "undefined" && module.exports) { module.exports = devices; }\n';
fs.writeFileSync('data.js', content);
