const fs = require('fs');
const devices = require('./data.js');

const map = {
  'DSMC3 RED Touch 7" LCD (Optional)': 'RED Touch 7" LCD (Optional)',
  'RED Touch 7.0" LCD (Optional)': 'RED Touch 7" LCD (Optional)',
  'LCD Touch Panel': 'LCD touchscreen',
  'LCD Touchscreen': 'LCD touchscreen',
  'Native LCD Capacitive Touchscreen': 'LCD touchscreen',
  'Integrated Touchscreen LCD': 'LCD touchscreen',
  'Free-angle LCD': 'Vari-angle LCD',
  'LCD Monitor (Native)': 'Integrated LCD monitor',
  'Native LCD Viewfinder': 'Integrated LCD monitor',
  'LCD Monitor LM-V2 (Supplied)': 'LCD Monitor LM-V2',
  'Integrated Main Monitor': 'Integrated LCD monitor',
  'Optional EVF-V70 viewfinder': 'EVF-V70 (Optional)',
  'Optional EVF-V50': 'EVF-V50 (Optional)',
  'Optional OLED viewfinder': 'OLED EVF (Optional)',
  'Blackmagic Pocket Cinema Camera Pro EVF (Optional)': 'Blackmagic Pro EVF (Optional)',
  'External backlit LCD status display': 'LCD status display',
  'Built-in Fold-out LCD': 'Fold-out LCD',
  'OLED LVF (Live View Finder)': 'OLED EVF',
  'LCD capacitive touchscreen': 'LCD touchscreen',
  'LEMO 26 pin': 'LEMO 26-pin port'
};

for (const cam of Object.values(devices.cameras)) {
  const list = cam.viewfinder;
  if (Array.isArray(list)) {
    list.forEach(vf => {
      if (vf && vf.type && map[vf.type]) {
        vf.type = map[vf.type];
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
