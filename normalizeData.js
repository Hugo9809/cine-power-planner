// normalizeData.js - consolidate data cleanup and expansion utilities

const fs = require('fs');
const path = require('path');
let devices = require('./data.js');

function forEachCamera(cb) {
  Object.values(devices.cameras).forEach(cb);
}

// -- Unify helper functions --
function unifyFizConnectorTypes() {
  const map = {
    'LEMO 4-pin (LBUS)': 'LBUS (LEMO 4-pin)',
    'Lemo 4-pin (LBUS)': 'LBUS (LEMO 4-pin)',
    'LBUS (4-pin Lemo)': 'LBUS (LEMO 4-pin)',
    'LBUS (4-pin Lemo for motors), CAM (7-pin Lemo for camera control)':
      'LBUS (LEMO 4-pin for motors), CAM (LEMO 7-pin for camera control)',
    '2x LBUS (4-pin Lemo for motors), 2x SERIAL (4-pin Lemo), CAM (7-pin Lemo), EXT (6-pin/16-pin depending on camera)':
      '2x LBUS (LEMO 4-pin for motors), 2x SERIAL (LEMO 4-pin), CAM (LEMO 7-pin), EXT (6-pin/16-pin depending on camera)',
    '2x LBUS (4-pin Lemo), 1x CAM (7-pin Lemo), 1x SERIAL (4-pin Lemo)':
      '2x LBUS (LEMO 4-pin), 1x CAM (LEMO 7-pin), 1x SERIAL (LEMO 4-pin)',
    '2x LBUS (4-pin Lemo)': '2x LBUS (LEMO 4-pin)',
    '3x Motor ports (4-pin Lemo), 1x Camera (7-pin Lemo), 1x EXT (4-pin Lemo)':
      '3x Motor ports (LEMO 4-pin), 1x Camera (LEMO 7-pin), 1x EXT (LEMO 4-pin)',
    'Multiple LBUS ports (4-pin Lemo)': 'Multiple LBUS ports (LEMO 4-pin)',
    '6x Motor ports (proprietary Lemo), 1x Camera (7-pin Lemo), 1x Accessory (4-pin Lemo), 1x Ethernet, 1x USB':
      '6x Motor ports (proprietary Lemo), 1x Camera (LEMO 7-pin), 1x Accessory (LEMO 4-pin), 1x Ethernet, 1x USB',
    'USB-C, LEMO 2-pin (power out), 4-pin Lemo (data to MDR)':
      'USB-C, LEMO 2-pin (power out), LEMO 4-pin (data to MDR)',
    'Lemo 4-pin (LBUS), 7-pin Lemo (CAM)': 'LBUS (LEMO 4-pin), CAM (LEMO 7-pin)',
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
    'Remote 8 pin': 'REMOTE B connector',
    'Lemo 4-pin': 'LEMO 4-pin',
    '4-pin Lemo': 'LEMO 4-pin',
    '4-pin 0B Lemo': 'LEMO 4-pin 0B',
    'Lemo 5-pin 0B': 'LEMO 5-pin 0B',
    '7-pin Lemo': 'LEMO 7-pin',
    '7-pin Lemo (LCS)': 'LEMO 7-pin (LCS)',
    'Lemo 7-pin 1B': 'LEMO 7-pin 1B',
    '2x Motor Ports (proprietary 7-pin Lemo), Serial (for Light Ranger 2), Analog (for Micro Force), USB (firmware)':
      '2x Motor Ports (proprietary LEMO 7-pin), Serial (for Light Ranger 2), Analog (for Micro Force), USB (firmware)'
  };
  forEachCamera(cam => {
    const list = cam.fizConnectors;
    if (Array.isArray(list)) {
      list.forEach(conn => {
        if (conn && conn.type && map[conn.type]) {
          conn.type = map[conn.type];
        }
      });
    }
  });

  for (const motor of Object.values(devices.fiz?.motors || {})) {
    if (motor.fizConnector && map[motor.fizConnector]) {
      motor.fizConnector = map[motor.fizConnector];
    }
  }

  for (const controller of Object.values(devices.fiz?.controllers || {})) {
    if (controller.fizConnector && map[controller.fizConnector]) {
      controller.fizConnector = map[controller.fizConnector];
    }
  }
}

function unifyPowerDistTypes() {
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
  forEachCamera(cam => {
    const list = cam.power?.powerDistributionOutputs;
    if (Array.isArray(list)) {
      list.forEach(output => {
        if (output && output.type && map[output.type]) {
          output.type = map[output.type];
        }
      });
    }
  });
}

function unifyPowerInputPortTypes() {
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
  forEachCamera(cam => {
    const input = cam.power?.input;
    if (!input || !input.portType) return;
    const original = input.portType;
    const arr = ([]).concat(original).flatMap(val => {
      const mapped = map[val] || val;
      return mapped.split('/').map(p => map[p.trim()] || p.trim());
    });
    input.portType = arr.length > 1 ? arr : arr[0];
  });
}

function unifyRecordingMedia() {
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
  forEachCamera(cam => {
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
  });
}

function unifyTimecodeTypes() {
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
    'Timecode interface': 'Timecode Interface'
  };
  forEachCamera(cam => {
    const list = cam.timecode;
    if (Array.isArray(list)) {
      list.forEach(tc => {
        if (tc && tc.type && map[tc.type]) {
          tc.type = map[tc.type];
        }
      });
    }
  });
}

function unifyViewfinderTypes() {
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
  forEachCamera(cam => {
    const list = cam.viewfinder;
    if (Array.isArray(list)) {
      list.forEach(vf => {
        if (vf && vf.type && map[vf.type]) {
          vf.type = map[vf.type];
        }
      });
    }
  });
}

function unifyLensMounts() {
  forEachCamera(cam => {
    const list = cam.lensMount;
    if (Array.isArray(list)) {
      const result = [];
      const seen = new Set();
      for (const val of list) {
        if (!val) continue;
        let type = '';
        let mount = 'native';
        let notes = '';
        if (typeof val === 'string') {
          const m = val.match(/([^()]+)(?:\(([^)]+)\))?(?:\s*-\s*(.*))?/);
          type = m ? m[1].trim() : val;
          mount = m && m[2] ? m[2].trim().toLowerCase() : /adapted|via adapter/i.test(val) ? 'adapted' : 'native';
          notes = m && m[3] ? m[3].trim() : (/via adapter/i.test(val) ? 'via adapter' : '');
        } else {
          type = val.type || '';
          mount = val.mount ? val.mount.toLowerCase() : 'native';
          notes = val.notes || '';
        }
        const key = `${type}|${mount}|${notes}`;
        if (!seen.has(key)) {
          seen.add(key);
          result.push({ type, mount, notes });
        }
      }
      cam.lensMount = result;
    }
  });
}

// -- Update helper functions --
function updatePowerDistribution() {
  forEachCamera(cam => {
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
  });
}

function updateVideoOutputs() {
  forEachCamera(cam => {
    if (Array.isArray(cam.videoOutputs)) {
      const outputs = [];
      for (const entry of cam.videoOutputs) {
        const { count, ...rest } = entry;
        const n = parseInt(count, 10);
        if (!isNaN(n) && n > 1) {
          for (let i = 0; i < n; i++) {
            outputs.push({ ...rest });
          }
        } else {
          outputs.push(rest);
        }
      }
      cam.videoOutputs = outputs;
    }
  });
}

function save() {
  const content =
    'let devices=' +
    JSON.stringify(devices, null, 2) +
    ';\n' +
    'if (typeof module !== "undefined" && module.exports) { module.exports = devices; }\n';
  const filePath = path.join(__dirname, 'data.js');
  fs.writeFileSync(filePath, content);
}

function normalizeAll() {
  unifyFizConnectorTypes();
  unifyPowerDistTypes();
  unifyPowerInputPortTypes();
  unifyRecordingMedia();
  unifyTimecodeTypes();
  unifyViewfinderTypes();
  unifyLensMounts();
  updatePowerDistribution();
  updateVideoOutputs();
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log(
      'Usage: node normalizeData.js\n' +
        '\nCleans and expands device data, then overwrites data.js with the result.'
    );
    process.exit(0);
  }
  normalizeAll();
  save();
} else {
  module.exports = { normalizeAll, save };
}
