const fs = require('fs');
const devices = require('./data.js');

const map = {
  'LEMO 4-pin (LBUS)': 'LBUS (LEMO 4-pin)',
  'Lemo 4-pin (LBUS)': 'LBUS (LEMO 4-pin)',
  'EXT (LEMO 7-pin)': 'EXT LEMO 7-pin',
  'Hirose 12pin': 'Hirose 12-pin',
  '12-pin Hirose': 'Hirose 12-pin',
  '12pin broadcast connector': 'Hirose 12-pin',
  'Lens 12 pin': 'Hirose 12-pin',
  'Lens terminal 12-pin': 'Hirose 12-pin',
  'Lens terminal 12-pin jack': 'Hirose 12-pin',
  'Lens Terminal': 'Hirose 12-pin',
  'USB Type-C': 'USB-C',
  'USB Type-C®': 'USB-C',
  'USB-C (USB 3.2 / 3.1 Gen 1)': 'USB-C',
  'USB-C / Gigabit Ethernet (via adapter)': 'USB-C',
  'Active EF Mount': 'Active EF mount',
  'LANC (2.5mm stereo mini jack)': 'LANC',
  '2.5 mm Sub-Mini (LANC)': 'LANC',
  'REMOTE A (2.5mm)': 'REMOTE A connector',
  'Remote Control Terminal': 'REMOTE A connector',
  'Remote 8 pin': 'REMOTE B connector'
};

for (const cam of Object.values(devices.cameras)) {
  const list = cam.fizConnectors;
  if (Array.isArray(list)) {
    list.forEach(conn => {
      if (conn && conn.type && map[conn.type]) {
        conn.type = map[conn.type];
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
