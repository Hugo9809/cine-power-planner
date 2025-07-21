const fs = require('fs');
const devices = require('./data.js');

for (const cam of Object.values(devices.cameras)) {
  const outputs = cam.power?.powerDistributionOutputs;
  if (Array.isArray(outputs)) {
    const expanded = [];
    for (const entry of outputs) {
      const { count, ...rest } = entry;
      let num = 1;
      if (count !== undefined) {
        const n = parseInt(count, 10);
        if (!Number.isNaN(n)) {
          num = n;
        } else if (typeof count === 'string') {
          const lower = count.toLowerCase();
          if (lower.includes('multiple') || lower.includes('-')) {
            num = 2;
          }
        }
      }
      if (num < 1) num = 1;
      for (let i = 0; i < num; i++) {
        expanded.push({ ...rest });
      }
    }
    cam.power.powerDistributionOutputs = expanded;
  }
}

const content =
  'let devices=' +
  JSON.stringify(devices, null, 2) +
  ';\n' +
  'if (typeof module !== "undefined" && module.exports) { module.exports = devices; }\n';
fs.writeFileSync('data.js', content);
