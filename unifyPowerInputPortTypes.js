const fs = require('fs');
const devices = require('./data.js');

const map = {
  'LEMO 8-pin (DC In / BAT)': 'Bat LEMO 8-pin',
  'LEMO 8-pin (BAT)': 'Bat LEMO 8-pin',
  'BAT (LEMO 8-pin)': 'Bat LEMO 8-pin',
  'LEMO 8-pin': 'Bat LEMO 8-pin',
  '2-pin DC-Input': '2-pin DC-IN',
  '2-pin XLR': 'XLR 2-pin',
  '2-pin locking connector': 'LEMO 2-pin',
  '2-pin locking connector / 2-pin LEMO': 'LEMO 2-pin',
  '4-pin XLR / DC IN 12V': 'XLR 4-pin',
  '4-pin XLR / V-Lock': 'XLR 4-pin',
  'XLR 4-pin jack': 'XLR 4-pin',
  'XLR 4-pin (main input)': 'XLR 4-pin',
  'XLR-type 4 pin (male) / Square-shaped 5 pin connector (Battery)': 'XLR 4-pin / Square 5-pin',
  '12-pin Molex connector (at battery plate rear) / 4-pin XLR (external power)': 'Molex 12-pin / XLR 4-pin',
  'USB-C (Power Delivery) / Battery Slot': 'Battery Slot / USB-C PD',
  'Battery Slot / USB Type-C®': 'Battery Slot / USB-C',
  'Battery Slot / USB-C': 'Battery Slot / USB-C',
  'Battery Slot / USB-C PD': 'Battery Slot / USB-C PD',
  'DC Input': 'DC IN',
  'Weipu SF610/S2 (12VDC) Input': 'Weipu SF610/S2',
  '6-pin 1B DC-IN / TB50 Battery Mount': '6-pin 1B DC-IN / TB50'
};

for (const cam of Object.values(devices.cameras)) {
  const input = cam.power?.input;
  if (!input || !input.portType) continue;
  const original = input.portType;
  const arr = ([]).concat(original).flatMap(val => {
    const mapped = map[val] || val;
    return mapped.split('/').map(p => map[p.trim()] || p.trim());
  });
  input.portType = arr.length > 1 ? arr : arr[0];
}

const content = 'let devices=' + JSON.stringify(devices, null, 2) + ';\n' +
  'if (typeof module !== "undefined" && module.exports) { module.exports = devices; }\n';
fs.writeFileSync('data.js', content);
