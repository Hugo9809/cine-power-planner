const fs = require('fs');
const devices = require('./data.js');

for (const cam of Object.values(devices.cameras)) {
  if (Array.isArray(cam.videoOutputs)) {
    const outputs = [];
    for (const entry of cam.videoOutputs) {
      const {count, ...rest} = entry;
      const n = parseInt(count, 10);
      if (!isNaN(n) && n > 1) {
        for (let i = 0; i < n; i++) {
          outputs.push({...rest});
        }
      } else {
        outputs.push(rest);
      }
    }
    cam.videoOutputs = outputs;
  }
}

const content =
  'let devices=' +
  JSON.stringify(devices, null, 2) +
  ';\n' +
  'if (typeof module !== "undefined" && module.exports) { module.exports = devices; }\n';
fs.writeFileSync('data.js', content);
