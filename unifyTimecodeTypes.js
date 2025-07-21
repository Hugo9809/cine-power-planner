const fs = require('fs');
const devices = require('./data.js');

const map = {
  '3.5 mm TRS / mini jack': '3.5mm Stereo Input',
  'BNC (Timecode)': 'BNC',
  'BNC / HDMI': 'BNC',
  'BNC terminal': 'BNC',
  'Time code': 'BNC',
  'Timecode In/Out': 'BNC',
  'EXT (LEMO 7-pin)': 'EXT LEMO 7-pin',
  'Multi-function shoe': 'Multi-interface shoe',
  'DIN1.0 / 2.3': 'DIN 1.0/2.3',
  'Timecode interface': 'Timecode Interface',
};

for (const cam of Object.values(devices.cameras)) {
  const list = cam.timecode;
  if (Array.isArray(list)) {
    list.forEach(tc => {
      if (tc && tc.type && map[tc.type]) {
        tc.type = map[tc.type];
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
