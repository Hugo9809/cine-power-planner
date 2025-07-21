const fs = require('fs');
const devices = require('./data.js');

const map = {
  'CFast': { type: 'CFast 2.0', notes: '' },
  'CFast card slot': { type: 'CFast 2.0', notes: '' },
  'CFast 2.0 card slot': { type: 'CFast 2.0', notes: '' },
  'CFast 2.0 card slots': { type: 'CFast 2.0', notes: 'Dual Slots' },
  'CFast 2.0 memory cards': { type: 'CFast 2.0', notes: '' },
  'Dual CFexpress slots': { type: 'CFexpress Type B', notes: 'Dual Slots' },
  'SD CARD X2': { type: 'SD Card', notes: 'Dual Slots' },
  'Dual SD card slots for simultaneous recording': { type: 'SD Card', notes: 'Dual Slots' },
  'Dual slot recording function available [P2.1]': { type: 'SD Card', notes: 'UHS-II (Dual Slots)' },
  'SD card slot': { type: 'SD Card', notes: '' },
  'SD card slot (for proxy/backup)': { type: 'SD Card', notes: 'for proxy/backup' },
  'SD Card (SD / SDHC / SDXC)': { type: 'SD Card', notes: '' },
  'SD memory card / SDHC memory card / SDXC memory card (UHS-II V90 recommended)': { type: 'SD Card', notes: 'UHS-II V90 recommended' },
  'UHS-II SD': { type: 'SD Card', notes: 'UHS-II' },
  'SD UHS-II card slot': { type: 'SD Card', notes: 'UHS-II' },
  'SD UHS-II card slots': { type: 'SD Card', notes: 'UHS-II (Dual Slots)' },
  'CFexpress Type B (Dual Slots)': { type: 'CFexpress Type B', notes: 'Dual Slots' },
  'CFexpress Type B (via adapter)': { type: 'CFexpress Type B', notes: 'via adapter' }
};

function normalize(item) {
  if (!item) return null;
  if (typeof item === 'object' && item.type) {
    return { type: item.type, notes: item.notes || '' };
  }
  if (map[item]) return map[item];
  const m = String(item).match(/^(.*?)(?:\((.*)\))?$/);
  let type = m ? m[1].trim() : String(item);
  let notes = m && m[2] ? m[2].trim() : '';
  if (/^SD UHS-II$/i.test(type)) {
    type = 'SD Card';
    notes = notes ? `${notes}; UHS-II` : 'UHS-II';
  } else if (/^SD \(UHS-II\/UHS-I\)$/i.test(type)) {
    type = 'SD Card';
    notes = 'UHS-II/UHS-I';
  }
  return { type, notes };
}

for (const cam of Object.values(devices.cameras)) {
  const list = cam.recordingMedia;
  if (Array.isArray(list)) {
    const result = [];
    const seen = new Set();
    for (const val of list) {
      const item = normalize(val);
      if (!item) continue;
      const key = `${item.type}|${item.notes}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    }
    cam.recordingMedia = result;
  }
}

const content =
  'let devices=' +
  JSON.stringify(devices, null, 2) +
  ';\n' +
  'if (typeof module !== "undefined" && module.exports) { module.exports = devices; }\n';
fs.writeFileSync('data.js', content);
