const fs = require('fs');
const devices = require('./data.js');

const map = {
  'CFast': 'CFast 2.0',
  'CFast card slot': 'CFast 2.0',
  'CFast 2.0 card slot': 'CFast 2.0',
  'CFast 2.0 card slots': 'CFast 2.0',
  'CFast 2.0 memory cards': 'CFast 2.0',
  'Dual CFexpress slots': 'CFexpress Type B (Dual Slots)',
  'SD CARD X2': 'SD Card (Dual Slots)',
  'Dual SD card slots for simultaneous recording': 'SD Card (Dual Slots)',
  'Dual slot recording function available [P2.1]': 'SD UHS-II (Dual Slots)',
  'SD card slot': 'SD Card',
  'SD card slot (for proxy/backup)': 'SD Card (for proxy/backup)',
  'SD Card (SD / SDHC / SDXC)': 'SD Card',
  'SD memory card / SDHC memory card / SDXC memory card (UHS-II V90 recommended)': 'SD UHS-II',
  'UHS-II SD': 'SD UHS-II',
  'SD UHS-II card slot': 'SD UHS-II',
  'SD UHS-II card slots': 'SD UHS-II (Dual Slots)'
};

for (const cam of Object.values(devices.cameras)) {
  const list = cam.recordingMedia;
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      const val = list[i];
      if (map[val]) {
        list[i] = map[val];
      }
    }
  }
}

const content =
  'let devices=' +
  JSON.stringify(devices, null, 2) +
  ';\n' +
  'if (typeof module !== "undefined" && module.exports) { module.exports = devices; }\n';
fs.writeFileSync('data.js', content);
