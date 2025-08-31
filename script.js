// script.js – Main logic for the Camera Power Planner app
/* global texts, categoryNames, loadSessionState, saveSessionState */

// Use `var` here instead of `let` because `index.html` loads the lz-string
// library from a CDN which defines a global `LZString` variable. Using `let`
// would attempt to create a new lexical binding and throw a SyntaxError in
// browsers that already have the global property. `var` simply reuses the
// existing global variable if present.
var LZString;
try {
  LZString = require('lz-string');
} catch {
  if (typeof window !== 'undefined' && window.LZString) {
    LZString = window.LZString;
  } else {
    // Fallback no-op implementation to avoid runtime errors when the
    // dependency is unavailable (e.g. during tests).
    LZString = {
      compressToEncodedURIComponent: s => s,
      decompressFromEncodedURIComponent: s => s
    };
  }
}

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}

// Use a Set for O(1) lookups when validating video output types
const VIDEO_OUTPUT_TYPES = new Set([
  '3G-SDI',
  '6G-SDI',
  '12G-SDI',
  'Mini BNC',
  'HDMI',
  'Mini HDMI',
  'Micro HDMI',
  'DisplayPort'
]);

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
const localeSort = (a, b) => collator.compare(a, b);

// Labels for B-Mount support are defined in translations.js using the keys
// batteryBMountLabel, totalCurrent336Label and totalCurrent216Label.

function getSetups() {
  return loadSetups();
}

function storeSetups(setups) {
  saveSetups(setups);
}

function storeDevices(data) {
  saveDeviceData(data);
}

function loadSession() {
  return typeof loadSessionState === 'function' ? loadSessionState() : null;
}

function storeSession(state) {
  if (typeof saveSessionState === 'function') {
    saveSessionState(state);
  }
}

const VIDEO_TYPE_PATTERNS = [
  { needles: ['12g'], value: '12G-SDI' },
  { needles: ['6g'], value: '6G-SDI' },
  { needles: ['3g'], value: '3G-SDI' },
  { needles: ['hd-sdi'], value: '3G-SDI' },
  { needles: ['mini', 'bnc'], value: 'Mini BNC' },
  { needles: ['micro', 'hdmi'], value: 'Micro HDMI' },
  { needles: ['mini', 'hdmi'], value: 'Mini HDMI' },
  { needles: ['hdmi'], value: 'HDMI' },
  { needles: ['displayport'], value: 'DisplayPort' },
  { needles: ['display', 'port'], value: 'DisplayPort' },
  { needles: ['dp'], value: 'DisplayPort' }
];

// Cache normalized video type lookups to avoid repeated pattern scans
const videoTypeCache = new Map();
function normalizeVideoType(type) {
  if (!type) return '';
  const t = String(type).toLowerCase();
  if (videoTypeCache.has(t)) return videoTypeCache.get(t);
  for (const { needles, value } of VIDEO_TYPE_PATTERNS) {
    if (needles.every(n => t.includes(n))) {
      videoTypeCache.set(t, value);
      return value;
    }
  }
  videoTypeCache.set(t, '');
  return '';
}

const FIZ_CONNECTOR_MAP = {
  'lemo 4-pin (lbus)': 'LBUS (LEMO 4-pin)',
  'lbus (lemo 4-pin)': 'LBUS (LEMO 4-pin)',
  'lbus (4-pin lemo)': 'LBUS (LEMO 4-pin)',
  'lbus (4-pin lemo for motors)': 'LBUS (LEMO 4-pin)',
  '4-pin lemo (lbus)': 'LBUS (LEMO 4-pin)',
  'lemo 4-pin': 'LEMO 4-pin',
  '4-pin lemo': 'LEMO 4-pin',
  'lemo 7-pin': 'LEMO 7-pin',
  'lemo 7-pin 1b': 'LEMO 7-pin',
  '7-pin lemo': 'LEMO 7-pin',
  '7-pin lemo (lcs)': 'LEMO 7-pin (LCS)',
  '7-pin lemo (cam)': 'LEMO 7-pin (CAM)',
  'ext (lemo 7-pin)': 'EXT LEMO 7-pin',
  'hirose 12pin': 'Hirose 12-pin',
  '12-pin hirose': 'Hirose 12-pin',
  '12pin broadcast connector': 'Hirose 12-pin',
  'lens 12 pin': 'Hirose 12-pin',
  'lens terminal 12-pin': 'Hirose 12-pin',
  'lens terminal 12-pin jack': 'Hirose 12-pin',
  'lens terminal': 'Hirose 12-pin',
  'usb type-c': 'USB-C',
  'usb type-c®': 'USB-C',
  'usb-c (usb 3.2 / 3.1 gen 1)': 'USB-C',
  'usb-c / gigabit ethernet (via adapter)': 'USB-C',
  'active ef mount': 'Active EF mount',
  'lanc (2.5mm stereo mini jack)': 'LANC',
  '2.5 mm sub-mini (lanc)': 'LANC',
  'remote a (2.5mm)': 'REMOTE A connector',
  'remote control terminal': 'REMOTE A connector',
  'remote 8 pin': 'REMOTE B connector'
};
function normalizeFizConnectorType(type) {
  if (!type) return '';
  const key = String(type).trim().toLowerCase();
  return FIZ_CONNECTOR_MAP[key] || type;
}

const VIEWFINDER_TYPE_MAP = {
  'dsmc3 red touch 7" lcd (optional)': 'RED Touch 7" LCD (Optional)',
  'red touch 7.0" lcd (optional)': 'RED Touch 7" LCD (Optional)',
  'lcd touch panel': 'LCD touchscreen',
  'lcd touchscreen': 'LCD touchscreen',
  'native lcd capacitive touchscreen': 'LCD touchscreen',
  'integrated touchscreen lcd': 'LCD touchscreen',
  'free-angle lcd': 'Vari-angle LCD',
  'lcd monitor (native)': 'Integrated LCD monitor',
  'native lcd viewfinder': 'Integrated LCD monitor',
  'lcd monitor lm-v2 (supplied)': 'LCD Monitor LM-V2',
  'integrated main monitor': 'Integrated LCD monitor',
  'optional evf-v70 viewfinder': 'EVF-V70 (Optional)',
  'optional evf-v50': 'EVF-V50 (Optional)',
  'optional oled viewfinder': 'OLED EVF (Optional)',
  'blackmagic pocket cinema camera pro evf (optional)': 'Blackmagic Pro EVF (Optional)',
  'external backlit lcd status display': 'LCD status display',
  'built-in fold-out lcd': 'Fold-out LCD',
  'oled lvf (live view finder)': 'OLED EVF',
  'lcd capacitive touchscreen': 'LCD touchscreen',
  'lemo 26 pin': 'LEMO 26-pin port'
};

function normalizeViewfinderType(type) {
  if (!type) return '';
  const trimmed = String(type).trim();
  const key = trimmed.toLowerCase();
  return VIEWFINDER_TYPE_MAP[key] || trimmed;
}

const POWER_PORT_TYPE_MAP = {
  'lemo 8-pin (dc in / bat)': 'Bat LEMO 8-pin',
  'lemo 8-pin (bat)': 'Bat LEMO 8-pin',
  'bat (lemo 8-pin)': 'Bat LEMO 8-pin',
  'lemo 8-pin': 'Bat LEMO 8-pin',
  '2-pin dc-input': '2-pin DC-IN',
  '2-pin xlr': 'XLR 2-pin',
  '2-pin locking connector': 'LEMO 2-pin',
  '2-pin locking connector / 2-pin lemo': 'LEMO 2-pin',
  '4-pin xlr / dc in 12v': 'XLR 4-pin',
  '4-pin xlr / v-lock': 'XLR 4-pin',
  'xlr 4-pin jack': 'XLR 4-pin',
  'xlr 4-pin (main input)': 'XLR 4-pin',
  'xlr-type 4 pin (male) / square-shaped 5 pin connector (battery)': 'XLR 4-pin / Square 5-pin',
  '12-pin molex connector (at battery plate rear) / 4-pin xlr (external power)': 'Molex 12-pin / XLR 4-pin',
  'usb-c (power delivery) / battery slot': 'Battery Slot / USB-C PD',
  'battery slot / usb type-c®': 'Battery Slot / USB-C',
  'battery slot / usb-c': 'Battery Slot / USB-C',
  'battery slot / usb-c pd': 'Battery Slot / USB-C PD',
  'dc input': 'DC IN',
  'weipu sf610/s2 (12vdc) input': 'Weipu SF610/S2',
  '6-pin 1b dc-in / tb50 battery mount': '6-pin 1B DC-IN / TB50'
};

// Cache power port normalization to reduce repeated string operations
const powerPortCache = new Map();
const mapPowerPortOne = val => {
  const trimmed = String(val).trim();
  if (powerPortCache.has(trimmed)) return powerPortCache.get(trimmed);
  const lower = trimmed.toLowerCase();
  const mapped = POWER_PORT_TYPE_MAP[lower] || trimmed;
  powerPortCache.set(trimmed, mapped);
  return mapped;
};

function normalizePowerPortType(type) {
  if (!type) return [];
  const toArray = val =>
    mapPowerPortOne(val)
      .split('/')
      .map(p => mapPowerPortOne(p));
  return Array.isArray(type) ? type.flatMap(toArray) : toArray(type);
}

function ensureList(list, defaults) {
  if (!Array.isArray(list)) return [];
  return list.map(item =>
    typeof item === 'string'
      ? { ...defaults, type: item }
      : { ...defaults, ...(item || {}) }
  );
}

function fixPowerInput(dev) {
  if (!dev) return;
  if (dev.powerInput && !dev.power?.input) {
    dev.power = { ...(dev.power || {}), input: { type: normalizePowerPortType(dev.powerInput) } };
    delete dev.powerInput;
  }
  const input = dev.power?.input;
  if (!input) return;
  const normalizeEntry = it => {
    if (typeof it === 'string') {
      return { type: normalizePowerPortType(it) };
    }
    if (it) {
      const { portType: pType, type: tType, ...rest } = it;
      const typeField = (!tType && pType) ? pType : tType;
      return { ...rest, type: typeField ? normalizePowerPortType(typeField) : [] };
    }
    return { type: [] };
  };
  dev.power.input = Array.isArray(input) ? input.map(normalizeEntry) : normalizeEntry(input);
}


// Normalize various camera properties so downstream logic works with
// consistent structures and value formats.
function unifyDevices(data) {
  if (!data || typeof data !== 'object') return;
  Object.values(data.cameras || {}).forEach(cam => {
    if (cam.power?.input && cam.power.input.powerDrawWatts !== undefined) {
      delete cam.power.input.powerDrawWatts;
    }
    fixPowerInput(cam);
    if (Array.isArray(cam.power?.batteryPlateSupport)) {
      cam.power.batteryPlateSupport = cam.power.batteryPlateSupport.map(it => {
        if (typeof it === 'string') {
          const m = it.match(/([^()]+)(?:\(([^)]+)\))?(?:\s*-\s*(.*))?/);
          const type = m ? m[1].trim() : it;
          let mount = m && m[2] ? m[2].trim().toLowerCase() : '';
          if (!mount) {
            mount = /adapted|via adapter/i.test(it) ? 'adapted' : 'native';
          } else if (/via adapter/i.test(mount)) {
            mount = 'adapted';
          }
          const notes = m && m[3] ? m[3].trim() : (/via adapter/i.test(it) ? 'via adapter' : '');
          return { type, mount, notes };
        }
        return {
          type: it.type || '',
          mount: (it.mount ? it.mount : (it.native ? 'native' : (it.adapted ? 'adapted' : 'native'))).toLowerCase(),
          notes: it.notes || ''
        };
      });
    }
    if (cam.power) {
      cam.power.powerDistributionOutputs = ensureList(cam.power.powerDistributionOutputs, {
        type: '',
        voltage: '',
        current: '',
        wattage: null,
        notes: ''
      });
    }
    cam.videoOutputs = ensureList(cam.videoOutputs, { type: '', notes: '' }).flatMap(vo => {
      const norm = normalizeVideoType(vo.type);
      if (!VIDEO_OUTPUT_TYPES.has(norm)) return [];
      const count = parseInt(vo.count, 10);
      const num = Number.isFinite(count) && count > 0 ? count : 1;
      const notes = vo.notes || '';
      return Array.from({ length: num }, () => ({ type: norm, notes }));
    });
    cam.fizConnectors = ensureList(cam.fizConnectors, { type: '', notes: '' }).map(fc => ({
      type: normalizeFizConnectorType(fc.type),
      notes: fc.notes
    }));
    cam.viewfinder = ensureList(cam.viewfinder, { type: '', resolution: '', connector: '', notes: '' }).map(vf => ({
      type: normalizeViewfinderType(vf.type),
      resolution: vf.resolution,
      connector: vf.connector,
      notes: vf.notes
    }));
    cam.recordingMedia = ensureList(cam.recordingMedia, { type: '', notes: '' }).map(m => {
      let { type = '', notes = '' } = m || {};
      const match = type.match(/^(.*?)(?:\((.*)\))?$/);
      if (match) {
        type = match[1].trim();
        notes = notes || (match[2] ? match[2].trim() : '');
      }
      if (/^SD UHS-II$/i.test(type)) {
        type = 'SD Card';
        notes = notes ? `${notes}; UHS-II` : 'UHS-II';
      } else if (/^SD \(UHS-II\/UHS-I\)$/i.test(type)) {
        type = 'SD Card';
        notes = 'UHS-II/UHS-I';
      } else if (type === 'CFast 2.0 card slots') {
        type = 'CFast 2.0';
        notes = notes || 'Dual Slots';
      } else if (type === 'CFexpress Type B (Dual Slots)') {
        type = 'CFexpress Type B';
        notes = notes || 'Dual Slots';
      } else if (type === 'CFexpress Type B (via adapter)') {
        type = 'CFexpress Type B';
        notes = notes || 'via adapter';
      } else if (/^SD UHS-II \(Dual Slots\)$/i.test(type)) {
        type = 'SD Card';
        notes = notes ? `${notes}; UHS-II (Dual Slots)` : 'UHS-II (Dual Slots)';
      } else if (type === 'SD Card (Dual Slots)') {
        type = 'SD Card';
        notes = notes || 'Dual Slots';
      } else if (type === 'SD card slot (for proxy/backup)') {
        type = 'SD Card';
        notes = notes || 'for proxy/backup';
      }
      return { type, notes };
    });
    cam.timecode = ensureList(cam.timecode, { type: '', notes: '' });
    cam.lensMount = ensureList(cam.lensMount, { type: '', mount: 'native', notes: '' })
      .map(lm => ({
        type: lm.type,
        mount: (lm.mount ? lm.mount.toLowerCase() : 'native'),
        notes: lm.notes || ''
      }))
      .filter((lm, idx, arr) =>
        idx === arr.findIndex(o => o.type === lm.type && o.mount === lm.mount && o.notes === lm.notes)
      );
  });

  Object.values(data.monitors || {}).forEach(mon => {
    fixPowerInput(mon);
  });

  Object.values(data.video || {}).forEach(vd => {
    fixPowerInput(vd);
  });

  Object.values(data.fiz?.motors || {}).forEach(fm => {
    fixPowerInput(fm);
  });

  Object.values(data.fiz?.controllers || {}).forEach(fc => {
    fixPowerInput(fc);
  });

  Object.values(data.fiz?.distance || {}).forEach(fd => {
    fixPowerInput(fd);
  });

  // Normalize FIZ motors
  Object.values(data.fiz?.motors || {}).forEach(m => {
    if (!m) return;
    if (m.connector && !m.fizConnector) {
      m.fizConnector = m.connector;
      delete m.connector;
    }
    if (m.fizConnector) {
      m.fizConnector = normalizeFizConnectorType(m.fizConnector);
    }
  });

  // Normalize FIZ controllers
  Object.values(data.fiz?.controllers || {}).forEach(c => {
    if (!c) return;
    if (c.FIZ_connector && !c.fizConnector && !c.fizConnectors) {
      c.fizConnector = c.FIZ_connector;
      delete c.FIZ_connector;
    }
    if (Array.isArray(c.fizConnectors)) {
      c.fizConnectors = c.fizConnectors.map(fc => {
        if (!fc) return { type: '' };
        const type = normalizeFizConnectorType(fc.type || fc);
        const notes = fc.notes || undefined;
        return notes ? { type, notes } : { type };
      });
    } else if (c.fizConnector) {
      const parts = String(c.fizConnector)
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      c.fizConnectors = parts.map(p => ({ type: normalizeFizConnectorType(p) }));
      delete c.fizConnector;
    } else {
      c.fizConnectors = [];
    }
  });
}

// Store a deep copy of the initial 'devices' data as defined in data.js.
// This 'defaultDevices' will be used when reverting the database.
// Initialize defaultDevices only if it hasn't been declared yet, to prevent
// "already declared" errors if the script is loaded multiple times.
if (window.defaultDevices === undefined) {
  window.defaultDevices = JSON.parse(JSON.stringify(devices));
  unifyDevices(window.defaultDevices);
}

// Load any saved device data from localStorage
let storedDevices = loadDeviceData();
if (storedDevices) {
  devices = storedDevices;
}
unifyDevices(devices);

// Determine if a camera has a native B-Mount battery plate
function isNativeBMountCamera(name) {
  const cam = devices.cameras[name];
  if (!cam || !cam.power || !Array.isArray(cam.power.batteryPlateSupport)) return false;
  return cam.power.batteryPlateSupport.some(bp => bp.type === 'B-Mount' && bp.mount === 'native');
}

function isNativeVMountCamera(name) {
  const cam = devices.cameras[name];
  if (!cam || !cam.power || !Array.isArray(cam.power.batteryPlateSupport)) return false;
  return cam.power.batteryPlateSupport.some(bp => bp.type === 'V-Mount' && bp.mount === 'native');
}

function supportsBMountCamera(name) {
  const cam = devices.cameras[name];
  if (!cam || !cam.power || !Array.isArray(cam.power.batteryPlateSupport)) return false;
  return cam.power.batteryPlateSupport.some(bp => bp.type === 'B-Mount');
}

function getBatteriesByMount(mountType) {
  const out = {};
  for (const [name, data] of Object.entries(devices.batteries)) {
    if (data && data.mount_type === mountType) out[name] = data;
  }
  return out;
}

function getSelectedPlate() {
  const camName = cameraSelect.value;
  const hasB = isNativeBMountCamera(camName);
  const hasV = isNativeVMountCamera(camName);
  if (hasB && hasV) {
    return batteryPlateSelect.value;
  } else if (hasB) {
    return 'B-Mount';
  } else if (hasV) {
    return 'V-Mount';
  }
  return null;
}

function isSelectedPlateNative(camName) {
  const plate = getSelectedPlate();
  const cam = devices.cameras[camName];
  if (!plate || !cam || !cam.power || !Array.isArray(cam.power.batteryPlateSupport)) return false;
  return cam.power.batteryPlateSupport.some(bp => bp.type === plate && bp.mount === 'native');
}

function shortConnLabel(type) {
  if (!type) return '';
  return String(type).replace(/\(.*?\)/, '').trim();
}

function formatConnLabel(from, to) {
  const a = shortConnLabel(from);
  const b = shortConnLabel(to);
  if (!a) return b || '';
  if (!b || a.toLowerCase() === b.toLowerCase()) return a;
  return `${a} to ${b}`;
}


const hasCamConnector = str => /CAM/i.test(str);
const hasLemo7PinConnector = str => /7-pin/i.test(str);

function controllerCamPort(name) {
  const isRf = /cforce.*rf/i.test(name) || /RIA-1/i.test(name);
  if (isRf) return 'Cam';
  const c = devices.fiz?.controllers?.[name];
  if (c) {
    if (/UMC-4/i.test(name)) return '3-Pin R/S';
    const connStr = c.fizConnectors
      ? c.fizConnectors.map(fc => fc.type).join(', ')
      : c.fizConnector || '';
    if (hasCamConnector(connStr)) return 'Cam';
    if (hasLemo7PinConnector(connStr)) return 'LEMO 7-pin';
  }
  const m = devices.fiz?.motors?.[name];
  if (m) {
    const connStr = m.fizConnector || (m.fizConnectors || []).map(fc => fc.type).join(', ');
    if (hasCamConnector(connStr)) return 'Cam';
    if (hasLemo7PinConnector(connStr)) return 'LEMO 7-pin';
  }
  if (isArriOrCmotion(name) && !isRf) return 'LBUS';
  return 'FIZ Port';
}

function controllerDistancePort(name) {
  const c = devices.fiz?.controllers?.[name];
  if (/RIA-1/i.test(name) || /UMC-4/i.test(name)) return 'Serial';
  if (c && (c.fizConnectors || []).some(fc => /SERIAL/i.test(fc.type))) return 'Serial';
  return 'LBUS';
}

function controllerPriority(name) {
  if (/cforce.*rf/i.test(name) || /RIA-1/i.test(name) || /UMC-4/i.test(name)) return 0;
  if (/Master Grip/i.test(name) || /ZMU-4/i.test(name) || /OCU-1/i.test(name)) return 1;
  return 2;
}

function motorPriority(name) {
  const m = devices.fiz?.motors?.[name];
  if (m && m.internalController && /CAM/i.test(m.fizConnector || '')) return 0;
  return 1;
}
function isArriOrCmotion(name) {
  return /^(ARRI|Arri)/i.test(name) || /cmotion/i.test(name);
}

function isArri(name) {
  return /arri/i.test(name);
}
function fizNeedsPower(name) {
  const d = devices.fiz?.controllers?.[name] || devices.fiz?.motors?.[name];
  if (!d) return false;
  const ps = String(d.power_source || '').toLowerCase();
  if (ps.includes('internal battery') && !ps.includes('external')) return false;
  return true;
}


function firstConnector(str) {
  if (!str) return '';
  return str.split(',')[0].trim();
}

function cameraFizPort(camName, controllerPort, deviceName = '') {
  const cam = devices.cameras[camName];
  if (!cam || !Array.isArray(cam.fizConnectors) || cam.fizConnectors.length === 0) return 'LBUS';
  if (!controllerPort) return cam.fizConnectors[0].type;

  // If a non-ARRI FIZ device is attached to an ARRI camera, prefer the EXT port
  if (isArri(camName) && deviceName && !isArri(deviceName)) {
    const ext = cam.fizConnectors.find(fc => /ext/i.test(fc.type));
    if (ext) return ext.type;
  }

  const norm = shortConnLabel(firstConnector(controllerPort)).toLowerCase();
  const match = cam.fizConnectors.find(fc => shortConnLabel(fc.type).toLowerCase() === norm);
  return match ? match.type : cam.fizConnectors[0].type;
}

function controllerFizPort(name) {
  const c = devices.fiz?.controllers?.[name];
  let portStr = '';
  if (/UMC-4/i.test(name)) {
    const lcs = c?.fizConnectors?.find(fc => /LCS/i.test(fc.type));
    portStr = lcs ? lcs.type : 'LCS (LEMO 7-pin)';
  } else if (Array.isArray(c?.fizConnectors) && c.fizConnectors.length) {
    portStr = c.fizConnectors[0].type;
  } else if (c?.fizConnector) {
    portStr = c.fizConnector;
  }
  const port = firstConnector(portStr);
  if (port) return port;
  return isArriOrCmotion(name) ? 'LBUS' : 'Proprietary';
}

function motorFizPort(name) {
  const m = devices.fiz?.motors?.[name];
  const portStr = m?.fizConnector || m?.fizConnectors?.[0]?.type;
  const port = firstConnector(portStr);
  if (port) return port;
  return isArriOrCmotion(name) ? 'LBUS' : 'Proprietary';
}

function distanceFizPort(name) {
  const d = devices.fiz?.distance?.[name];
  if (!d) return 'LBUS';
  let portStr = '';
  if (Array.isArray(d.fizConnectors) && d.fizConnectors.length) {
    const lbus = d.fizConnectors.find(fc => /LBUS/i.test(fc.type));
    const serial = d.fizConnectors.find(fc => /SERIAL/i.test(fc.type));
    if (lbus) portStr = lbus.type;
    else if (serial) portStr = serial.type;
    else portStr = d.fizConnectors[0].type;
  } else if (d.fizConnector) {
    portStr = d.fizConnector;
  }
  const port = firstConnector(portStr);
  if (port) return port;
  if (/preston/i.test(name)) return 'Serial';
  return 'LBUS';
}

function fizPort(name) {
  if (devices.fiz?.controllers?.[name]) return controllerFizPort(name);
  if (devices.fiz?.motors?.[name]) return motorFizPort(name);
  if (devices.fiz?.distance?.[name]) return distanceFizPort(name);
  return 'LBUS';
}

function fizPowerPort(name) {
  if (/cforce.*rf/i.test(name) || /RIA-1/i.test(name)) return 'Cam';
  return fizPort(name);
}

function sdiRate(type) {
  const m = /([\d.]+)G-SDI/i.exec(type || '');
  if (m) return parseFloat(m[1]);
  return /SDI/i.test(type || '') ? 1 : null;
}
function connectionLabel(outType, inType) {
  if (!outType || !inType) return "";
  if (/HDMI/i.test(outType) && /HDMI/i.test(inType)) return "HDMI";
  if (/SDI/i.test(outType) && /SDI/i.test(inType)) {
    const rate = Math.min(sdiRate(outType) || 0, sdiRate(inType) || 0) || sdiRate(outType) || sdiRate(inType) || 0;
    if (rate >= 12) return "12G-SDI";
    if (rate >= 6) return "6G-SDI";
    if (rate >= 3) return "3G-SDI";
    if (rate >= 1.5) return "1.5G-SDI";
    return "SDI";
  }
  if (/HDMI/i.test(outType)) return "HDMI";
  if (/SDI/i.test(outType)) return "SDI";
  return "";
}


function updateBatteryPlateVisibility() {
  const camName = cameraSelect.value;
  const hasB = isNativeBMountCamera(camName);
  const hasV = isNativeVMountCamera(camName);
  if (hasB && hasV) {
    batteryPlateRow.style.display = '';
    if (batteryPlateSelect.options.length === 0) {
      ['V-Mount', 'B-Mount'].forEach(pt => {
        const opt = document.createElement('option');
        opt.value = pt;
        opt.textContent = pt;
        batteryPlateSelect.appendChild(opt);
      });
    }
    if (!['V-Mount', 'B-Mount'].includes(batteryPlateSelect.value)) {
      batteryPlateSelect.value = 'V-Mount';
    }
  } else {
    batteryPlateRow.style.display = 'none';
    if (hasB) batteryPlateSelect.value = 'B-Mount';
    else if (hasV) batteryPlateSelect.value = 'V-Mount';
    else batteryPlateSelect.value = '';
  }
}


function updateBatteryLabel() {
  const label = document.getElementById('batteryLabel');
  if (!label) return;
  label.setAttribute('data-help', texts[currentLang].batterySelectHelp);
  if (getSelectedPlate() === 'B-Mount') {
    label.textContent = texts[currentLang].batteryBMountLabel || 'B-Mount Battery:';
  } else {
    label.textContent = texts[currentLang].batteryLabel;
  }
}

function updateBatteryOptions() {
  const current = batterySelect.value;
  const plate = getSelectedPlate();
  const camName = cameraSelect.value;
  const supportsB = supportsBMountCamera(camName);
  if (plate === 'B-Mount') {
    populateSelect(batterySelect, getBatteriesByMount('B-Mount'), true);
  } else if (plate === 'V-Mount') {
    populateSelect(batterySelect, getBatteriesByMount('V-Mount'), true);
  } else {
    let bats = devices.batteries;
    if (!supportsB) {
      bats = Object.fromEntries(Object.entries(bats).filter(([, b]) => b.mount_type !== 'B-Mount'));
    }
    populateSelect(batterySelect, bats, true);
  }
  if (Array.from(batterySelect.options).some(o => o.value === current)) {
    batterySelect.value = current;
  }
  filterSelect(batterySelect, batteryFilterInput.value);
  updateBatteryLabel();
}

function detectBrand(name) {
  if (!name || name === 'None') return null;
  const n = name.toLowerCase();
  if (n.includes('arri')) return 'arri';
  if (n.includes('cmotion')) return 'cmotion';
  if (n.includes('focusbug')) return 'focusbug';
  if (n.includes('tilta')) return 'tilta';
  if (n.includes('preston')) return 'preston';
  if (n.includes('chrosziel')) return 'chrosziel';
  if (n.includes('smallrig')) return 'smallrig';
  if (n.includes('dji')) return 'dji';
  if (n.includes('redrock')) return 'redrock';
  if (n.includes('teradek')) return 'teradek';
  return 'other';
}

function checkFizCompatibility() {
  const brands = new Set();
  motorSelects.forEach(sel => { const b = detectBrand(sel.value); if (b) brands.add(b); });
  controllerSelects.forEach(sel => { const b = detectBrand(sel.value); if (b) brands.add(b); });
  const distB = detectBrand(distanceSelect.value);
  if (distB) brands.add(distB);
  const cameraBrand = detectBrand(cameraSelect.value);

  const compatElem = document.getElementById('compatWarning');
  if (!compatElem) return;

  let incompatible = false;
  const arr = Array.from(brands);

  if (cameraBrand === 'dji' && arr.some(b => b && b !== 'dji')) {
    incompatible = true;
  } else if (arr.length > 1) {
    const allowed = ['arri', 'cmotion', 'focusbug'];
    if (arr.every(b => allowed.includes(b))) {
      incompatible = false;
    } else {
      const filtered = arr.filter(b => b !== 'other');
      const distinct = new Set(filtered);
      if (distinct.size > 1) incompatible = true;
    }
  }

  if (incompatible) {
    compatElem.textContent = texts[currentLang].incompatibleFIZWarning;
    compatElem.style.color = 'red';
  } else {
    compatElem.textContent = '';
  }
}

function checkFizController() {
  const compatElem = document.getElementById('compatWarning');
  if (!compatElem) return;

  const motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
  if (!motors.length) return;

  const controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
  const camName = cameraSelect.value;
  const cam = devices.cameras[camName];

  const cameraHasLBUS = Array.isArray(cam?.fizConnectors) &&
    cam.fizConnectors.some(fc => /LBUS/i.test(fc.type));
  let hasController = cameraHasLBUS && /arri/i.test(camName);

  controllers.forEach(name => {
    const c = devices.fiz.controllers[name];
    if (!c) return;
    const connStr = (c.fizConnectors || []).map(fc => fc.type).join(', ');
    if (/CAM|SERIAL|Motor/i.test(connStr)) hasController = true;
    if (c.internalController) hasController = true;
  });

  motors.forEach(name => {
    const m = devices.fiz.motors[name];
    if (m && m.internalController) hasController = true;
  });

  const needController = motors.some(name => {
    const m = devices.fiz.motors[name];
    return m && m.internalController === false;
  });

  if (needController && !hasController) {
    compatElem.textContent = texts[currentLang].missingFIZControllerWarning;
    compatElem.style.color = 'red';
  }
}

function checkArriCompatibility() {
  const compatElem = document.getElementById('compatWarning');
  if (!compatElem || compatElem.textContent) return;

  let motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
  motors.sort((a, b) => motorPriority(a) - motorPriority(b));
  const internalIdx = motors.findIndex(name => devices.fiz?.motors?.[name]?.internalController);
  const hasInternalMotor = internalIdx !== -1;
  if (hasInternalMotor && internalIdx > 0) {
    const [m] = motors.splice(internalIdx, 1);
    motors.unshift(m);
  }
  let controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
  controllers.sort((a, b) => controllerPriority(a) - controllerPriority(b));
  const distance = distanceSelect.value;

  const camName = cameraSelect.value;
  const cam = devices.cameras[camName];
  const cameraHasLBUS = Array.isArray(cam?.fizConnectors) &&
    cam.fizConnectors.some(fc => /LBUS/i.test(fc.type));
  const builtInController = cameraHasLBUS && /arri/i.test(camName);

  const usesUMC4 = controllers.some(n => /UMC-4/i.test(n));
  const usesRIA1 = controllers.some(n => /RIA-1/i.test(n));
  const usesRF = controllers.some(n => /cforce.*rf/i.test(n)) || motors.some(m => /cforce.*rf/i.test(m));

  const camCounts = /(Alexa Mini LF|Alexa Mini|Alexa 35)/i.test(camName);
  const onlyMasterGrip =
    controllers.length > 0 &&
    controllers.every(n => /Master Grip/i.test(n)) &&
    !camCounts;

  let msg = '';
  const hasCLM = motors.some(m => /CLM-4|CLM-5/i.test(m));
  if (hasCLM && !usesUMC4) {
    msg = texts[currentLang].arriCLMNoUMC4Warning;
  } else if (usesUMC4 && motors.some(m => !/CLM-4|CLM-5/i.test(m))) {
    msg = texts[currentLang].arriUMC4Warning;
  } else if ((usesRIA1 || usesRF) && motors.some(m => /CLM-4|CLM-5/i.test(m))) {
    msg = texts[currentLang].arriRIA1Warning;
  } else if (
    distance &&
    distance !== 'None' &&
    !(usesUMC4 || usesRIA1 || usesRF || builtInController)
  ) {
    msg = texts[currentLang].distanceControllerWarning;
  } else if (onlyMasterGrip && !usesRF) {
    msg = texts[currentLang].masterGripWirelessWarning;
  }

  if (msg) {
    compatElem.textContent = msg;
    if (msg === texts[currentLang].arriUMC4Warning) {
      compatElem.style.color = 'orange';
    } else {
      compatElem.style.color = 'red';
    }
  }
}

// Load translations when not already present (mainly for tests)
if (typeof texts === 'undefined') {
  try {
    const translations = require('./translations.js');
    window.texts = translations.texts;
    window.categoryNames = translations.categoryNames;
  } catch (e) {
    console.warn('Failed to load translations', e);
  }
}


// Determine initial language (default English)
let currentLang = "en";
let lastRuntimeHours = null;
try {
  const savedLang = localStorage.getItem("language");
  const supported = ["en", "de", "es", "fr", "it"];
  if (savedLang && supported.includes(savedLang)) {
    currentLang = savedLang;
  }
} catch (e) {
  console.warn("Could not load language from localStorage", e);
}

// Helper to apply translations to all UI text
function setLanguage(lang) {
  currentLang = lang;
  // persist selected language
  try {
    localStorage.setItem("language", lang);
  } catch (e) {
    console.warn("Could not save language to localStorage", e);
  }
  // ensure dropdown reflects the active language
  if (languageSelect) {
    languageSelect.value = lang;
  }
  // update html lang attribute for better persistence
  document.documentElement.lang = lang;
  // Document title and main heading
  document.title = texts[lang].appTitle;
  document.getElementById("mainTitle").textContent = texts[lang].appHeading;
  document.getElementById("tagline").textContent = texts[lang].tagline;
  if (skipLink) skipLink.textContent = texts[lang].skipToContent;
  // Section headings with descriptive hover help
  const setupManageHeadingElem = document.getElementById("setupManageHeading");
  setupManageHeadingElem.textContent = texts[lang].setupManageHeading;
  setupManageHeadingElem.setAttribute(
    "data-help",
    texts[lang].setupManageHeadingHelp
  );

  const deviceSelectionHeadingElem = document.getElementById("deviceSelectionHeading");
  deviceSelectionHeadingElem.textContent = texts[lang].deviceSelectionHeading;
  deviceSelectionHeadingElem.setAttribute(
    "data-help",
    texts[lang].deviceSelectionHeadingHelp
  );

  const resultsHeadingElem = document.getElementById("resultsHeading");
  resultsHeadingElem.textContent = texts[lang].resultsHeading; // Fixed typo here
  resultsHeadingElem.setAttribute(
    "data-help",
    texts[lang].resultsHeadingHelp
  );

  const deviceManagerHeadingElem = document.getElementById("deviceManagerHeading");
  deviceManagerHeadingElem.textContent = texts[lang].deviceManagerHeading;
  deviceManagerHeadingElem.setAttribute(
    "data-help",
    texts[lang].deviceManagerHeadingHelp
  );

  const batteryComparisonHeadingElem = document.getElementById("batteryComparisonHeading");
  batteryComparisonHeadingElem.textContent = texts[lang].batteryComparisonHeading;
  batteryComparisonHeadingElem.setAttribute(
    "data-help",
    texts[lang].batteryComparisonHeadingHelp
  );

  const setupDiagramHeadingElem = document.getElementById("setupDiagramHeading");
  setupDiagramHeadingElem.textContent = texts[lang].setupDiagramHeading;
  setupDiagramHeadingElem.setAttribute(
    "data-help",
    texts[lang].setupDiagramHeadingHelp
  );
  // Setup manager labels and buttons
  const savedSetupsLabelElem = document.getElementById("savedSetupsLabel");
  savedSetupsLabelElem.textContent = texts[lang].savedSetupsLabel;
  savedSetupsLabelElem.setAttribute("data-help", texts[lang].setupSelectHelp);
  const setupNameLabelElem = document.getElementById("setupNameLabel");
  setupNameLabelElem.textContent = texts[lang].setupNameLabel;
  setupNameLabelElem.setAttribute("data-help", texts[lang].setupNameHelp);
  const setupActionsHeadingElem = document.getElementById("setupActionsHeading");
  setupActionsHeadingElem.textContent = texts[lang].setupActionsHeading;
  setupActionsHeadingElem.setAttribute(
    "data-help",
    texts[lang].setupActionsHeadingHelp
  );
  saveSetupBtn.textContent = texts[lang].saveSetupBtn;
  deleteSetupBtn.textContent = texts[lang].deleteSetupBtn;
  clearSetupBtn.textContent = texts[lang].clearSetupBtn;
  const sharedLinkLabelElem = document.getElementById("sharedLinkLabel");
  sharedLinkLabelElem.textContent = texts[lang].sharedLinkLabel;
  sharedLinkLabelElem.setAttribute("data-help", texts[lang].sharedLinkHelp);
  applySharedLinkBtn.textContent = texts[lang].loadSharedLinkBtn;
  if (sharedLinkInput) sharedLinkInput.placeholder = texts[lang].sharedLinkPlaceholder;

  // Descriptive hover help for setup management controls
  setupSelect.setAttribute("data-help", texts[lang].setupSelectHelp);
  setupNameInput.setAttribute("data-help", texts[lang].setupNameHelp);

  deleteSetupBtn.setAttribute("title", texts[lang].deleteSetupHelp);
  deleteSetupBtn.setAttribute("aria-label", texts[lang].deleteSetupHelp);
  deleteSetupBtn.setAttribute("data-help", texts[lang].deleteSetupHelp);

  saveSetupBtn.setAttribute("title", texts[lang].saveSetupHelp);
  saveSetupBtn.setAttribute("aria-label", texts[lang].saveSetupHelp);
  saveSetupBtn.setAttribute("data-help", texts[lang].saveSetupHelp);

  exportSetupsBtn.setAttribute("title", texts[lang].exportSetupsBtn);
  exportSetupsBtn.setAttribute("data-help", texts[lang].exportSetupsHelp);

  importSetupsBtn.setAttribute("title", texts[lang].importSetupsBtn);
  importSetupsBtn.setAttribute("data-help", texts[lang].importSetupsHelp);

  generateOverviewBtn.setAttribute("title", texts[lang].generateOverviewBtn);
  generateOverviewBtn.setAttribute("data-help", texts[lang].generateOverviewHelp);

  shareSetupBtn.setAttribute("title", texts[lang].shareSetupBtn);
  shareSetupBtn.setAttribute("data-help", texts[lang].shareSetupHelp);

  applySharedLinkBtn.setAttribute("title", texts[lang].loadSharedLinkBtn);
  applySharedLinkBtn.setAttribute("data-help", texts[lang].applySharedLinkHelp);

  clearSetupBtn.setAttribute("title", texts[lang].clearSetupBtn);
  clearSetupBtn.setAttribute("data-help", texts[lang].clearSetupHelp);

  runtimeFeedbackBtn.setAttribute("title", texts[lang].runtimeFeedbackBtn);
  runtimeFeedbackBtn.setAttribute("data-help", texts[lang].runtimeFeedbackBtnHelp);
  // Update the "-- New Setup --" option text
  if (setupSelect.options.length > 0) {
    setupSelect.options[0].textContent = texts[lang].newSetupOption;
  }
  // Device selection labels with help
  const cameraLabelElem = document.getElementById("cameraLabel");
  cameraLabelElem.textContent = texts[lang].cameraLabel;
  cameraLabelElem.setAttribute("data-help", texts[lang].cameraSelectHelp);

  const monitorLabelElem = document.getElementById("monitorLabel");
  monitorLabelElem.textContent = texts[lang].monitorLabel;
  monitorLabelElem.setAttribute("data-help", texts[lang].monitorSelectHelp);

  const videoLabelElem = document.getElementById("videoLabel");
  videoLabelElem.textContent = texts[lang].videoLabel;
  videoLabelElem.setAttribute("data-help", texts[lang].videoSelectHelp);

  const distanceLabelElem = document.getElementById("distanceLabel");
  distanceLabelElem.textContent = texts[lang].distanceLabel;
  distanceLabelElem.setAttribute("data-help", texts[lang].distanceSelectHelp);

  const batteryPlateLabelElem = document.getElementById("batteryPlateLabel");
  batteryPlateLabelElem.textContent = texts[lang].batteryPlateLabel;
  batteryPlateLabelElem.setAttribute("data-help", texts[lang].batteryPlateSelectHelp);

  updateBatteryLabel();
  clearFiltersBtn.textContent = "\u00d7";
  clearFiltersBtn.setAttribute("aria-label", texts[lang].clearFiltersBtn);
  clearFiltersBtn.setAttribute("title", texts[lang].clearFiltersBtn);
  clearFiltersBtn.setAttribute("data-help", texts[lang].clearFiltersHelp);
  // FIZ legend and labels
  const fizLegendElem = document.getElementById("fizLegend");
  if (fizLegendElem) {
    fizLegendElem.textContent = texts[lang].fizLegend;
    fizLegendElem.setAttribute("data-help", texts[lang].fizLegendHelp);
  }
  const fizMotorsLabelElem = document.getElementById("fizMotorsLabel");
  if (fizMotorsLabelElem) {
    fizMotorsLabelElem.textContent = texts[lang].fizMotorsLabel;
    fizMotorsLabelElem.setAttribute("data-help", texts[lang].fizMotorsHelp);
  }
  const fizControllersLabelElem = document.getElementById("fizControllersLabel");
  if (fizControllersLabelElem) {
    fizControllersLabelElem.textContent = texts[lang].fizControllersLabel;
    fizControllersLabelElem.setAttribute(
      "data-help",
      texts[lang].fizControllersHelp
    );
  }
  document
    .querySelectorAll('#motorNotesLabel,#controllerNotesLabel,#distanceNotesLabel')
    .forEach(el => {
      el.textContent = texts[lang].notesLabel;
    });
  // Results labels
  if (breakdownListElem)
    breakdownListElem.setAttribute("data-help", texts[lang].breakdownListHelp);

  const totalPowerLabelElem = document.getElementById("totalPowerLabel");
  totalPowerLabelElem.textContent = texts[lang].totalPowerLabel;
  totalPowerLabelElem.setAttribute("data-help", texts[lang].totalPowerHelp);

  const totalCurrent144LabelElem = document.getElementById(
    "totalCurrent144Label"
  );
  totalCurrent144LabelElem.textContent = texts[lang].totalCurrent144Label;
  totalCurrent144LabelElem.setAttribute(
    "data-help",
    texts[lang].totalCurrent144Help
  );

  const totalCurrent12LabelElem = document.getElementById("totalCurrent12Label");
  totalCurrent12LabelElem.textContent = texts[lang].totalCurrent12Label;
  totalCurrent12LabelElem.setAttribute(
    "data-help",
    texts[lang].totalCurrent12Help
  );

  const batteryCountLabelElem = document.getElementById("batteryCountLabel");
  batteryCountLabelElem.textContent = texts[lang].batteryCountLabel;
  batteryCountLabelElem.setAttribute(
    "data-help",
    texts[lang].batteryCountHelp
  );

  document.getElementById("runtimeFeedbackBtn").textContent =
    texts[lang].runtimeFeedbackBtn;

  if (pinWarnElem)
    pinWarnElem.setAttribute("data-help", texts[lang].pinWarningHelp);
  if (dtapWarnElem)
    dtapWarnElem.setAttribute("data-help", texts[lang].dtapWarningHelp);
  const unitElem = document.getElementById("batteryLifeUnit");
  if (unitElem) unitElem.textContent = texts[lang].batteryLifeUnit;
  const fb = renderFeedbackTable(getCurrentSetupKey());
  if (batteryLifeLabelElem) {
    let label = texts[lang].batteryLifeLabel;
    if (fb) {
      const userNote = texts[lang].runtimeUserCountNote.replace('{count}', fb.count);
      const idx = label.indexOf(')');
      if (idx !== -1) {
        label = `${label.slice(0, idx)}, ${userNote}${label.slice(idx)}`;
      }
    }
    batteryLifeLabelElem.textContent = label;
    batteryLifeLabelElem.setAttribute(
      "data-help",
      texts[lang].batteryLifeHelp
    );
  }
  if (runtimeAverageNoteElem) {
    runtimeAverageNoteElem.textContent =
      fb && fb.count > 4 ? texts[lang].runtimeAverageNote : '';
  }
  renderTemperatureNote(lastRuntimeHours);
  const tempNoteElem = document.getElementById("temperatureNote");
  if (tempNoteElem)
    tempNoteElem.setAttribute("data-help", texts[lang].temperatureNoteHelp);
  // Device manager category headings
  document.getElementById("category_cameras").textContent = texts[lang].category_cameras;
  document.getElementById("category_monitors").textContent = texts[lang].category_monitors;
  document.getElementById("category_video").textContent = texts[lang].category_video;
  document.getElementById("category_fiz_motors").textContent = texts[lang].category_fiz_motors;
  document.getElementById("category_fiz_controllers").textContent = texts[lang].category_fiz_controllers;
  document.getElementById("category_fiz_distance").textContent = texts[lang].category_fiz_distance;
  document.getElementById("category_batteries").textContent = texts[lang].category_batteries;
  // Add device form labels and button
  document.getElementById("addDeviceHeading").textContent = texts[lang].addDeviceHeading;
  document.getElementById("categoryLabel").textContent = texts[lang].categoryLabel;
  document.getElementById("deviceNameLabel").textContent = texts[lang].deviceNameLabel;
  document.getElementById("consumptionLabel").textContent = texts[lang].consumptionLabel;
  document.getElementById("capacityLabel").textContent = texts[lang].capacityLabel;
  document.getElementById("pinLabel").textContent = texts[lang].pinLabel;
  document.getElementById("dtapLabel").textContent = texts[lang].dtapLabel;
  document.getElementById("cameraWattLabel").textContent = texts[lang].cameraWattLabel;
  document.getElementById("cameraVoltageLabel").textContent = texts[lang].cameraVoltageLabel;
  document.getElementById("cameraPortTypeLabel").textContent = texts[lang].cameraPortTypeLabel;
  document.getElementById("cameraPlatesLabel").textContent = texts[lang].cameraPlatesLabel;
  document.getElementById("cameraMediaLabel").textContent = texts[lang].cameraMediaLabel;
  document.getElementById("cameraLensMountLabel").textContent = texts[lang].cameraLensMountLabel;
  document.getElementById("cameraPowerDistLabel").textContent = texts[lang].powerDistributionLabel;
  document.getElementById("cameraVideoOutputsLabel").textContent = texts[lang].videoOutputsLabel;
  document.getElementById("cameraFIZConnectorLabel").textContent = texts[lang].fizConnectorLabel;
  document.getElementById("cameraViewfinderLabel").textContent = texts[lang].viewfinderLabel;
  document.getElementById("cameraTimecodeLabel").textContent = texts[lang].timecodeLabel;
  document.getElementById("powerInputsHeading").textContent = texts[lang].powerInputsHeading;
  document.getElementById("powerDistributionHeading").textContent = texts[lang].powerDistributionHeading;
  document.getElementById("videoOutputsHeading").textContent = texts[lang].videoOutputsHeading;
  document.getElementById("fizConnectorHeading").textContent = texts[lang].fizConnectorHeading;
  document.getElementById("mediaHeading").textContent = texts[lang].mediaHeading;
  document.getElementById("viewfinderHeading").textContent = texts[lang].viewfinderHeading;
  document.getElementById("lensMountHeading").textContent = texts[lang].lensMountHeading;
  document.getElementById("timecodeHeading").textContent = texts[lang].timecodeHeading;
  document.getElementById("monitorScreenSizeLabel").textContent = texts[lang].monitorScreenSizeLabel;
  document.getElementById("monitorBrightnessLabel").textContent = texts[lang].monitorBrightnessLabel;
  document.getElementById("monitorWattLabel").textContent = texts[lang].monitorWattLabel;
  document.getElementById("monitorVoltageLabel").textContent = texts[lang].monitorVoltageLabel;
  document.getElementById("monitorPortTypeLabel").textContent = texts[lang].monitorPortTypeLabel;
  document.getElementById("monitorVideoInputsHeading").textContent = texts[lang].monitorVideoInputsHeading;
  document.getElementById("monitorVideoOutputsHeading").textContent = texts[lang].monitorVideoOutputsHeading;
  document.getElementById("monitorVideoInputsLabel").textContent = texts[lang].monitorVideoInputsLabel;
  document.getElementById("monitorVideoOutputsLabel").textContent = texts[lang].monitorVideoOutputsLabel;
  document.getElementById("monitorWirelessTxLabel").textContent = texts[lang].monitorWirelessTxLabel;
  document.getElementById("monitorLatencyLabel").textContent = texts[lang].monitorLatencyLabel;
  document.getElementById("monitorAudioOutputLabel").textContent = texts[lang].monitorAudioOutputLabel;
  document.getElementById("videoVideoInputsHeading").textContent = texts[lang].videoVideoInputsHeading;
  document.getElementById("videoVideoInputsLabel").textContent = texts[lang].videoVideoInputsLabel;
  document.getElementById("videoVideoOutputsHeading").textContent = texts[lang].videoVideoOutputsHeading;
  document.getElementById("videoVideoOutputsLabel").textContent = texts[lang].videoVideoOutputsLabel;
  document.getElementById("monitorDetailsHeading").textContent = texts[lang].monitorDetailsHeading;
  document.getElementById("monitorPowerHeading").textContent = texts[lang].monitorPowerHeading;
  // Determine text for Add/Update button
  if (addDeviceBtn.dataset.mode === "edit") {
    addDeviceBtn.textContent = texts[lang].updateDeviceBtn;
    cancelEditBtn.textContent = texts[lang].cancelEditBtn;
  } else {
    addDeviceBtn.textContent = texts[lang].addDeviceBtn;
    cancelEditBtn.textContent = texts[lang].cancelEditBtn;
  }
  exportBtn.textContent = texts[lang].exportDataBtn;
  importDataBtn.textContent = texts[lang].importDataBtn; // New translation for import button
  // Placeholders for inputs
  setupNameInput.placeholder = texts[lang].setupNameLabel.replace(":", "");
  newNameInput.placeholder = texts[lang].placeholder_deviceName;
  newWattInput.placeholder = texts[lang].placeholder_watt;
  newCapacityInput.placeholder = texts[lang].placeholder_capacity;
  newPinAInput.placeholder = texts[lang].placeholder_pin;
  newDtapAInput.placeholder = texts[lang].placeholder_dtap;
  cameraVoltageInput.placeholder = texts[lang].placeholder_voltage;
  monitorVoltageInput.placeholder = texts[lang].placeholder_voltage;
  const filterPlaceholder = texts[lang].placeholder_filter;
  [cameraFilterInput, monitorFilterInput, videoFilterInput, motorFilterInput,
   controllerFilterInput, distanceFilterInput, batteryFilterInput,
   cameraListFilterInput, monitorListFilterInput, videoListFilterInput,
   motorListFilterInput, controllerListFilterInput, distanceListFilterInput,
   batteryListFilterInput].forEach(input => {
   if (input) {
      input.placeholder = filterPlaceholder;
      input.setAttribute('aria-label', filterPlaceholder);
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('autocorrect', 'off');
      input.setAttribute('autocapitalize', 'off');
      input.setAttribute('spellcheck', 'false');
      input.setAttribute('inputmode', 'search');
    }
  });
  // Toggle device manager button text (depends on current visibility)
  if (deviceManagerSection.classList.contains('hidden')) {
    toggleDeviceBtn.textContent = texts[lang].toggleDeviceManager;
    toggleDeviceBtn.setAttribute("title", texts[lang].toggleDeviceManager);
    toggleDeviceBtn.setAttribute("data-help", texts[lang].toggleDeviceManagerHelp);
  } else {
    toggleDeviceBtn.textContent = texts[lang].hideDeviceManager;
    toggleDeviceBtn.setAttribute("title", texts[lang].hideDeviceManager);
    toggleDeviceBtn.setAttribute("data-help", texts[lang].hideDeviceManagerHelp);
  }
  // Update newCategory select option texts
  Array.from(newCategorySelect.options).forEach(opt => {
    if (categoryNames[lang][opt.value] !== undefined) {
      opt.textContent = categoryNames[lang][opt.value];
    }
  });
  // Update "None" option text in all dropdowns
  const noneMap = { de: "Keine Auswahl", es: "Ninguno", fr: "Aucun" };
  document.querySelectorAll('select option[value="None"]').forEach(opt => {
    opt.textContent = noneMap[lang] || "None";
  });
  // Save language preference
  try {
    localStorage.setItem("language", lang);
  } catch (e) {
    console.warn("Could not save language to localStorage", e);
  }
  // Recalculate and update dynamic content (results, breakdown, battery comparison)
  refreshDeviceLists(); // Call refreshDeviceLists to update Edit/Delete buttons in the list
  applyFilters();
  updateCalculations();

  if (existingDevicesHeading) {
    existingDevicesHeading.textContent = texts[lang].existingDevicesHeading;
  }
  if (darkModeToggle) {
    darkModeToggle.setAttribute("title", texts[lang].darkModeLabel);
    darkModeToggle.setAttribute("aria-label", texts[lang].darkModeLabel);
    darkModeToggle.setAttribute(
      "data-help",
      texts[lang].darkModeHelp || texts[lang].darkModeLabel
    );
  }
  if (pinkModeToggle) {
    pinkModeToggle.setAttribute("title", texts[lang].pinkModeLabel);
    pinkModeToggle.setAttribute("aria-label", texts[lang].pinkModeLabel);
    pinkModeToggle.setAttribute(
      "data-help",
      texts[lang].pinkModeHelp || texts[lang].pinkModeLabel
    );
  }
  if (helpButton) {
    helpButton.setAttribute("title", texts[lang].helpButtonTitle || texts[lang].helpButtonLabel);
    helpButton.setAttribute("aria-label", texts[lang].helpButtonLabel);
    helpButton.setAttribute(
      "data-help",
      texts[lang].helpButtonHelp ||
        texts[lang].helpButtonTitle ||
        texts[lang].helpButtonLabel
    );
    if (hoverHelpButton) {
      hoverHelpButton.textContent = texts[lang].hoverHelpButtonLabel;
      hoverHelpButton.setAttribute("aria-label", texts[lang].hoverHelpButtonLabel);
      hoverHelpButton.setAttribute(
        "data-help",
        texts[lang].hoverHelpButtonHelp || texts[lang].hoverHelpButtonLabel
      );
    }
    if (helpSearch) {
      helpSearch.setAttribute("placeholder", texts[lang].helpSearchPlaceholder);
      helpSearch.setAttribute("aria-label", texts[lang].helpSearchLabel);
      helpSearch.setAttribute(
        "data-help",
        texts[lang].helpSearchHelp || texts[lang].helpSearchLabel
      );
    }
    if (helpSearchClear) {
      helpSearchClear.setAttribute("title", texts[lang].helpSearchClear);
      helpSearchClear.setAttribute("aria-label", texts[lang].helpSearchClear);
      helpSearchClear.setAttribute(
        "data-help",
        texts[lang].helpSearchClearHelp || texts[lang].helpSearchClear
      );
    }
    if (closeHelpBtn) {
      closeHelpBtn.textContent = texts[lang].helpClose;
      closeHelpBtn.setAttribute("title", texts[lang].helpClose);
      closeHelpBtn.setAttribute("aria-label", texts[lang].helpClose);
      closeHelpBtn.setAttribute(
        "data-help",
        texts[lang].helpCloseHelp || texts[lang].helpClose
      );
    }
    if (document.getElementById("helpTitle")) {
      document.getElementById("helpTitle").textContent = texts[lang].helpTitle;
    }
    if (helpNoResults) helpNoResults.textContent = texts[lang].helpNoResults;
  }

  // NEW SETUP MANAGEMENT BUTTONS TEXTS
  const setupActionsHeadingElem2 = document.getElementById("setupActionsHeading");
  if (setupActionsHeadingElem2) {
    setupActionsHeadingElem2.textContent = texts[lang].setupActionsHeading;
    setupActionsHeadingElem2.setAttribute(
      "data-help",
      texts[lang].setupActionsHeadingHelp
    );
  }
  document.getElementById("exportSetupsBtn").textContent = texts[lang].exportSetupsBtn;
  document.getElementById("importSetupsBtn").textContent = texts[lang].importSetupsBtn;
  document.getElementById("generateOverviewBtn").textContent = texts[lang].generateOverviewBtn;
  document.getElementById("shareSetupBtn").textContent = texts[lang].shareSetupBtn;
  const exportRevert = document.getElementById("exportAndRevertBtn");
  if (exportRevert) exportRevert.textContent = texts[lang].exportAndRevertBtn;

  if (downloadDiagramBtn) {
    downloadDiagramBtn.textContent = texts[lang].downloadDiagramBtn;
    downloadDiagramBtn.setAttribute("title", texts[lang].downloadDiagramBtn);
    downloadDiagramBtn.setAttribute("aria-label", texts[lang].downloadDiagramBtn);
    downloadDiagramBtn.setAttribute("data-help", texts[lang].downloadDiagramHelp);
  }
  if (gridSnapToggleBtn) {
    gridSnapToggleBtn.textContent = texts[lang].gridSnapToggle;
    gridSnapToggleBtn.setAttribute("title", texts[lang].gridSnapToggle);
    gridSnapToggleBtn.setAttribute("aria-label", texts[lang].gridSnapToggle);
    gridSnapToggleBtn.setAttribute("data-help", texts[lang].gridSnapToggleHelp);
  }
  if (resetViewBtn) {
    resetViewBtn.textContent = texts[lang].resetViewBtn;
    resetViewBtn.setAttribute("title", texts[lang].resetViewBtn);
    resetViewBtn.setAttribute("aria-label", texts[lang].resetViewBtn);
    resetViewBtn.setAttribute("data-help", texts[lang].resetViewHelp);
  }
  if (zoomInBtn) {
    zoomInBtn.setAttribute("title", texts[lang].zoomInLabel);
    zoomInBtn.setAttribute("aria-label", texts[lang].zoomInLabel);
    zoomInBtn.setAttribute("data-help", texts[lang].zoomInHelp);
  }
  if (zoomOutBtn) {
    zoomOutBtn.setAttribute("title", texts[lang].zoomOutLabel);
    zoomOutBtn.setAttribute("aria-label", texts[lang].zoomOutLabel);
    zoomOutBtn.setAttribute("data-help", texts[lang].zoomOutHelp);
  }
  if (diagramHint) {
    diagramHint.textContent = texts[lang].diagramMoveHint;
  }
  updateDiagramLegend();
}

// Reference elements (DOM Elements)
const cameraSelect    = document.getElementById("cameraSelect");
const monitorSelect   = document.getElementById("monitorSelect");
const videoSelect     = document.getElementById("videoSelect");
const motorSelects    = [
  document.getElementById("motor1Select"),
  document.getElementById("motor2Select"),
  document.getElementById("motor3Select"),
  document.getElementById("motor4Select")
];
const controllerSelects = [
  document.getElementById("controller1Select"),
  document.getElementById("controller2Select"),
  document.getElementById("controller3Select"),
  document.getElementById("controller4Select")
];
const distanceSelect = document.getElementById("distanceSelect");
const batterySelect  = document.getElementById("batterySelect");

const totalPowerElem      = document.getElementById("totalPower");
const totalCurrent144Elem = document.getElementById("totalCurrent144");
const totalCurrent12Elem  = document.getElementById("totalCurrent12");
const batteryLifeElem     = document.getElementById("batteryLife");
const batteryLifeLabelElem = document.getElementById("batteryLifeLabel");
const runtimeAverageNoteElem = document.getElementById("runtimeAverageNote");
const batteryCountElem    = document.getElementById("batteryCount");
const pinWarnElem         = document.getElementById("pinWarning");
const dtapWarnElem        = document.getElementById("dtapWarning");

const setupSelect     = document.getElementById("setupSelect");
const setupNameInput  = document.getElementById("setupName");
const saveSetupBtn    = document.getElementById("saveSetupBtn");
const deleteSetupBtn  = document.getElementById("deleteSetupBtn");
const clearSetupBtn   = document.getElementById("clearSetupBtn");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");
const shareSetupBtn   = document.getElementById("shareSetupBtn");
const sharedLinkRow   = document.getElementById("sharedLinkRow");
const sharedLinkInput = document.getElementById("sharedLinkInput");
const applySharedLinkBtn = document.getElementById("applySharedLinkBtn");
const deviceManagerSection = document.getElementById("device-manager");
const toggleDeviceBtn = document.getElementById("toggleDeviceManager");
const cameraListElem  = document.getElementById("cameraList");
const monitorListElem = document.getElementById("monitorList");
const videoListElem   = document.getElementById("videoList");
const motorListElem   = document.getElementById("motorList");
const controllerListElem = document.getElementById("controllerList");
const distanceListElem   = document.getElementById("distanceList");
const batteryListElem    = document.getElementById("batteryList");
const newCategorySelect  = document.getElementById("newCategory");
const newNameInput    = document.getElementById("newName");
const newWattInput    = document.getElementById("newWatt");
const wattFieldDiv    = document.getElementById("wattField");
const cameraFieldsDiv = document.getElementById("cameraFields");
const cameraWattInput = document.getElementById("cameraWatt");
const cameraVoltageInput = document.getElementById("cameraVoltage");
const cameraPortTypeInput = document.getElementById("cameraPortType");
const monitorFieldsDiv = document.getElementById("monitorFields");
const monitorScreenSizeInput = document.getElementById("monitorScreenSize");
const monitorBrightnessInput = document.getElementById("monitorBrightness");
const monitorWattInput = document.getElementById("monitorWatt");
const monitorVoltageInput = document.getElementById("monitorVoltage");
const monitorPortTypeInput = document.getElementById("monitorPortType");
const monitorVideoInputsContainer = document.getElementById("monitorVideoInputsContainer");
const monitorVideoOutputsContainer = document.getElementById("monitorVideoOutputsContainer");
const monitorWirelessTxInput = document.getElementById("monitorWirelessTx");
const monitorLatencyInput = document.getElementById("monitorLatency");
const monitorAudioOutputInput = document.getElementById("monitorAudioOutput");
const videoFieldsDiv = document.getElementById("videoFields");
const videoPowerInput = document.getElementById("videoPower");
const videoVideoInputsContainer = document.getElementById("videoVideoInputsContainer");
const videoVideoOutputsContainer = document.getElementById("videoVideoOutputsContainer");
const videoFrequencyInput = document.getElementById("videoFrequency");
const videoLatencyInput = document.getElementById("videoLatency");
const addDeviceForm = wattFieldDiv.parentNode;
function placeWattField(category) {
  if (category === "video") {
    videoFieldsDiv.insertBefore(wattFieldDiv, videoFieldsDiv.firstChild);
  } else {
    addDeviceForm.insertBefore(wattFieldDiv, cameraFieldsDiv);
  }
}
const motorFieldsDiv = document.getElementById("motorFields");
const motorConnectorInput = document.getElementById("motorConnector");
const motorInternalInput = document.getElementById("motorInternal");
const motorTorqueInput = document.getElementById("motorTorque");
const motorGearInput = document.getElementById("motorGearTypes");
const motorNotesInput = document.getElementById("motorNotes");
const controllerFieldsDiv = document.getElementById("controllerFields");
const controllerConnectorInput = document.getElementById("controllerConnector");
const controllerPowerInput = document.getElementById("controllerPower");
const controllerBatteryInput = document.getElementById("controllerBattery");
const controllerConnectivityInput = document.getElementById("controllerConnectivity");
const controllerNotesInput = document.getElementById("controllerNotes");
const distanceFieldsDiv = document.getElementById("distanceFields");
const distanceConnectionInput = document.getElementById("distanceConnection");
const distanceMethodInput = document.getElementById("distanceMethod");
const distanceRangeInput = document.getElementById("distanceRange");
const distanceAccuracyInput = document.getElementById("distanceAccuracy");
const distanceOutputInput = document.getElementById("distanceOutput");
const distanceNotesInput = document.getElementById("distanceNotes");
const batteryPlatesContainer = document.getElementById("batteryPlatesContainer");
const cameraMediaContainer = document.getElementById("cameraMediaContainer");
const lensMountContainer = document.getElementById("lensMountContainer");
const powerDistContainer = document.getElementById("powerDistContainer");
const videoOutputsContainer = document.getElementById("videoOutputsContainer");
const fizConnectorContainer = document.getElementById("fizConnectorContainer");
const viewfinderContainer = document.getElementById("viewfinderContainer");
const timecodeContainer = document.getElementById("timecodeContainer");
const batteryFieldsDiv = document.getElementById("batteryFields");
const batteryPlateRow = document.getElementById("batteryPlateRow");
const batteryPlateSelect = document.getElementById("batteryPlateSelect");
const newCapacityInput = document.getElementById("newCapacity");
const newPinAInput    = document.getElementById("newPinA");
const newDtapAInput   = document.getElementById("newDtapA");
const addDeviceBtn    = document.getElementById("addDeviceBtn");
const cancelEditBtn  = document.getElementById("cancelEditBtn");
const exportBtn       = document.getElementById("exportDataBtn");
const exportOutput    = document.getElementById("exportOutput");
const importFileInput = document.getElementById("importFileInput");
const importDataBtn   = document.getElementById("importDataBtn");
const skipLink       = document.getElementById("skipLink");
const languageSelect  = document.getElementById("languageSelect");
const pinkModeToggle  = document.getElementById("pinkModeToggle");
const darkModeToggle  = document.getElementById("darkModeToggle");
const helpButton      = document.getElementById("helpButton");
const helpDialog      = document.getElementById("helpDialog");
const closeHelpBtn    = document.getElementById("closeHelp");
const helpSearch      = document.getElementById("helpSearch");
const helpNoResults   = document.getElementById("helpNoResults");
const helpSearchClear = document.getElementById("helpSearchClear");
const hoverHelpButton = document.getElementById("hoverHelpButton");
const existingDevicesHeading = document.getElementById("existingDevicesHeading");
const batteryComparisonSection = document.getElementById("batteryComparison");
const batteryTableElem = document.getElementById("batteryTable");
const breakdownListElem = document.getElementById("breakdownList");
const runtimeFeedbackBtn = document.getElementById("runtimeFeedbackBtn");
const feedbackDialog = document.getElementById("feedbackDialog");
const feedbackForm = document.getElementById("feedbackForm");
const feedbackCancelBtn = document.getElementById("fbCancel");
const feedbackUseLocationBtn = document.getElementById("fbUseLocationBtn");
const loadFeedbackSafe = typeof loadFeedback === 'function' ? loadFeedback : () => ({});
const saveFeedbackSafe = typeof saveFeedback === 'function' ? saveFeedback : () => {};
const setupDiagramContainer = document.getElementById("diagramArea");
const diagramLegend = document.getElementById("diagramLegend");
const downloadDiagramBtn = document.getElementById("downloadDiagram");
const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");
const resetViewBtn = document.getElementById("resetView");
const gridSnapToggleBtn = document.getElementById("gridSnapToggle");
const diagramHint = document.getElementById("diagramHint");

let manualPositions = {};
let lastDiagramPositions = {};
let gridSnap = false;
let cleanupDiagramInteractions = null;

// CSS used when exporting the setup diagram
const diagramCssLight = `
.node-box{fill:#e8f0fe;stroke:none;}
.node-box.first-fiz{stroke:none;}
.first-fiz-highlight{stroke:url(#firstFizGrad);stroke-width:1px;fill:none;}
.node-icon{font-size:20px;}
.conn{stroke:#333;stroke-width:1px;}
.conn.red{fill:#d33;}
.conn.blue{fill:#369;}
.conn.green{fill:#090;}
text{font-family:system-ui,sans-serif;}
.edge-label{font-size:10px;}
line{stroke:#333;stroke-width:2px;}
path.edge-path{stroke:#333;stroke-width:2px;fill:none;}
path.power{stroke:#d33;}
path.video{stroke:#369;}
path.fiz{stroke:#090;}
.diagram-placeholder{font-style:italic;color:#666;margin:0;}
`;
const diagramCssDark = `
.node-box{fill:#333;stroke:none;}
.node-box.first-fiz{stroke:none;}
.first-fiz-highlight{stroke:url(#firstFizGrad);}
text{fill:#fff;font-family:system-ui,sans-serif;}
line{stroke:#fff;}
path.edge-path{stroke:#fff;}
path.power{stroke:#ff6666;}
path.video{stroke:#7ec8ff;}
path.fiz{stroke:#6f6;}
.conn.red{fill:#ff6666;}
.conn.blue{fill:#7ec8ff;}
.conn.green{fill:#6f6;}
.diagram-placeholder{color:#bbb;}
`;

function getDiagramCss(includeDark = true) {
  return diagramCssLight + (includeDark ? `@media (prefers-color-scheme: dark){${diagramCssDark}}` : '');
}

// Icons for setup diagram nodes

const diagramIcons = {
  battery: "\uD83D\uDD0B", // 🔋 battery
  camera: "\uD83C\uDFA5", // 🎥 camera
  monitor: "\uD83D\uDDA5\uFE0F", // 🖥️ monitor
  video: "\uD83D\uDCE1", // 📡 wireless video
  motors: "\u2699\uFE0F", // ⚙️ lens motor
  controllers: "\uD83C\uDFAE", // 🎮 game controller
  handle: "\uD83C\uDFAE", // 🎮 handle/grip (same icon as controller)
  // Using a triangular ruler to represent a distance measuring device.
  distance: "\uD83D\uDCD0" // 📐 distance sensor
};

// Map overview section keys to diagram icons
const overviewSectionIcons = {
  category_batteries: diagramIcons.battery,
  category_cameras: diagramIcons.camera,
  category_monitors: diagramIcons.monitor,
  category_video: diagramIcons.video,
  category_fiz_motors: diagramIcons.motors,
  category_fiz_controllers: diagramIcons.controllers,
  category_fiz_distance: diagramIcons.distance
};

// Load an image and optionally strip a solid background using Canvas
// Filter inputs
const cameraFilterInput = document.getElementById("cameraFilter");
const monitorFilterInput = document.getElementById("monitorFilter");
const videoFilterInput = document.getElementById("videoFilter");
const motorFilterInput = document.getElementById("motorFilter");
const controllerFilterInput = document.getElementById("controllerFilter");
const distanceFilterInput = document.getElementById("distanceFilter");
const batteryFilterInput = document.getElementById("batteryFilter");

// List filters for existing device categories
const cameraListFilterInput = document.getElementById("cameraListFilter");
const monitorListFilterInput = document.getElementById("monitorListFilter");
const videoListFilterInput = document.getElementById("videoListFilter");
const motorListFilterInput = document.getElementById("motorListFilter");
const controllerListFilterInput = document.getElementById("controllerListFilter");
const distanceListFilterInput = document.getElementById("distanceListFilter");
const batteryListFilterInput = document.getElementById("batteryListFilter");

// NEW SETUP MANAGEMENT DOM ELEMENTS
const exportSetupsBtn = document.getElementById('exportSetupsBtn');
const importSetupsBtn = document.getElementById('importSetupsBtn');
const importSetupsInput = document.getElementById('importSetupsInput');
const generateOverviewBtn = document.getElementById('generateOverviewBtn');

const videoOutputOptions = [
  '3G-SDI',
  '6G-SDI',
  '12G-SDI',
  'Mini BNC',
  'HDMI',
  'Mini HDMI',
  'Micro HDMI'
];

function getAllFizConnectorTypes() {
  const types = new Set();
  Object.values(devices.cameras).forEach(cam => {
    if (Array.isArray(cam.fizConnectors)) {
      cam.fizConnectors.forEach(fc => {
        if (fc && fc.type) types.add(fc.type);
      });
    }
  });
  return Array.from(types).sort(localeSort);
}

let fizConnectorOptions = getAllFizConnectorTypes();

function updateFizConnectorOptions() {
  fizConnectorOptions = getAllFizConnectorTypes();
  document.querySelectorAll('.fiz-connector-select').forEach(sel => {
    const current = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    fizConnectorOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      sel.appendChild(opt);
    });
    if (fizConnectorOptions.includes(current)) {
      sel.value = current;
    }
  });
}

function getAllMotorConnectorTypes() {
  const types = new Set();
  Object.values(devices.fiz?.motors || {}).forEach(m => {
    if (m && m.fizConnector) types.add(m.fizConnector);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

let motorConnectorOptions = getAllMotorConnectorTypes();

function updateMotorConnectorOptions() {
  motorConnectorOptions = getAllMotorConnectorTypes();
  if (motorConnectorInput) {
    const cur = motorConnectorInput.value;
    motorConnectorInput.innerHTML = '';
    addEmptyOption(motorConnectorInput);
    motorConnectorOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      motorConnectorInput.appendChild(opt);
    });
    if (motorConnectorOptions.includes(cur)) motorConnectorInput.value = cur;
  }
}

function getAllControllerConnectors() {
  const types = new Set();
  Object.values(devices.fiz?.controllers || {}).forEach(c => {
    if (c && Array.isArray(c.fizConnectors)) {
      c.fizConnectors.forEach(fc => { if (fc && fc.type) types.add(fc.type); });
    }
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

function getAllControllerPowerSources() {
  const types = new Set();
  Object.values(devices.fiz?.controllers || {}).forEach(c => {
    if (c && c.power_source) types.add(c.power_source);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

function getAllControllerBatteryTypes() {
  const types = new Set();
  Object.values(devices.fiz?.controllers || {}).forEach(c => {
    if (c && c.battery_type) types.add(c.battery_type);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

function getAllControllerConnectivity() {
  const types = new Set();
  Object.values(devices.fiz?.controllers || {}).forEach(c => {
    if (c && c.connectivity) types.add(c.connectivity);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

let controllerConnectorOptions = getAllControllerConnectors();
let controllerPowerOptions = getAllControllerPowerSources();
let controllerBatteryOptions = getAllControllerBatteryTypes();
let controllerConnectivityOptions = getAllControllerConnectivity();

function updateControllerConnectorOptions() {
  controllerConnectorOptions = getAllControllerConnectors();
  if (controllerConnectorInput) {
    const cur = controllerConnectorInput.value;
    controllerConnectorInput.innerHTML = '';
    addEmptyOption(controllerConnectorInput);
    controllerConnectorOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      controllerConnectorInput.appendChild(opt);
    });
    if (controllerConnectorOptions.includes(cur)) controllerConnectorInput.value = cur;
  }
}

function updateControllerPowerOptions() {
  controllerPowerOptions = getAllControllerPowerSources();
  if (controllerPowerInput) {
    const cur = controllerPowerInput.value;
    controllerPowerInput.innerHTML = '';
    addEmptyOption(controllerPowerInput);
    controllerPowerOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      controllerPowerInput.appendChild(opt);
    });
    if (controllerPowerOptions.includes(cur)) controllerPowerInput.value = cur;
  }
}

function updateControllerBatteryOptions() {
  controllerBatteryOptions = getAllControllerBatteryTypes();
  if (controllerBatteryInput) {
    const cur = controllerBatteryInput.value;
    controllerBatteryInput.innerHTML = '';
    addEmptyOption(controllerBatteryInput);
    controllerBatteryOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      controllerBatteryInput.appendChild(opt);
    });
    if (controllerBatteryOptions.includes(cur)) controllerBatteryInput.value = cur;
  }
}

function updateControllerConnectivityOptions() {
  controllerConnectivityOptions = getAllControllerConnectivity();
  if (controllerConnectivityInput) {
    const cur = controllerConnectivityInput.value;
    controllerConnectivityInput.innerHTML = '';
    addEmptyOption(controllerConnectivityInput);
    controllerConnectivityOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      controllerConnectivityInput.appendChild(opt);
    });
    if (controllerConnectivityOptions.includes(cur)) controllerConnectivityInput.value = cur;
  }
}

function getAllDistanceConnections() {
  const types = new Set();
  Object.values(devices.fiz?.distance || {}).forEach(d => {
    if (d && d.connection_compatibility) types.add(d.connection_compatibility);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

function getAllDistanceMethods() {
  const types = new Set();
  Object.values(devices.fiz?.distance || {}).forEach(d => {
    if (d && d.measurement_method) types.add(d.measurement_method);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

function getAllDistanceDisplays() {
  const types = new Set();
  Object.values(devices.fiz?.distance || {}).forEach(d => {
    if (d && d.output_display) types.add(d.output_display);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

let distanceConnectionOptions = getAllDistanceConnections();
let distanceMethodOptions = getAllDistanceMethods();
let distanceDisplayOptions = getAllDistanceDisplays();

function updateDistanceConnectionOptions() {
  distanceConnectionOptions = getAllDistanceConnections();
  if (distanceConnectionInput) {
    const cur = distanceConnectionInput.value;
    distanceConnectionInput.innerHTML = '';
    addEmptyOption(distanceConnectionInput);
    distanceConnectionOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      distanceConnectionInput.appendChild(opt);
    });
    if (distanceConnectionOptions.includes(cur)) distanceConnectionInput.value = cur;
  }
}

function updateDistanceMethodOptions() {
  distanceMethodOptions = getAllDistanceMethods();
  if (distanceMethodInput) {
    const cur = distanceMethodInput.value;
    distanceMethodInput.innerHTML = '';
    addEmptyOption(distanceMethodInput);
    distanceMethodOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      distanceMethodInput.appendChild(opt);
    });
    if (distanceMethodOptions.includes(cur)) distanceMethodInput.value = cur;
  }
}

function updateDistanceDisplayOptions() {
  distanceDisplayOptions = getAllDistanceDisplays();
  if (distanceOutputInput) {
    const cur = distanceOutputInput.value;
    distanceOutputInput.innerHTML = '';
    addEmptyOption(distanceOutputInput);
    distanceDisplayOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      distanceOutputInput.appendChild(opt);
    });
    if (distanceDisplayOptions.includes(cur)) distanceOutputInput.value = cur;
  }
}

// Wrap a form field with a div containing a data-label attribute for styling.
function createFieldWithLabel(el, label) {
  const wrapper = document.createElement('div');
  wrapper.className = 'field-with-label';
  wrapper.dataset.label = label;
  wrapper.appendChild(el);
  return wrapper;
}

// Helper used by select-row builders to insert an empty option.
// Previously this inserted a blank option at the top of each select.
// The UI no longer requires an empty choice, so this function is now a
// no-op but kept for backward compatibility with existing calls.
function addEmptyOption(/* select */) {
  // Intentionally left blank
}

// Utility to remove entries with value "None" or empty string
function filterNoneEntries(list, prop = 'type') {
  if (!Array.isArray(list)) return [];
  return list.filter(item => {
    if (typeof item === 'string') {
      return item && item !== 'None';
    }
    if (item && Object.prototype.hasOwnProperty.call(item, prop)) {
      const val = item[prop];
      return val !== undefined && val !== null && val !== '' && val !== 'None';
    }
    return true;
  });
}

// Build a single row of the video output editor UI.
function createVideoOutputRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'video-output-select';
  addEmptyOption(select);
  videoOutputOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  select.value = value;
  row.appendChild(createFieldWithLabel(select, 'Type'));
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createVideoOutputRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (videoOutputsContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setVideoOutputs(list) {
  videoOutputsContainer.innerHTML = '';
  const filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(item => {
      const t = typeof item === 'string' ? item : item.type;
      videoOutputsContainer.appendChild(createVideoOutputRow(t));
    });
  } else {
    videoOutputsContainer.appendChild(createVideoOutputRow());
  }
}

function getVideoOutputs() {
  return Array.from(videoOutputsContainer.querySelectorAll('select'))
    .map(sel => ({ type: sel.value }))
    .filter(vo => vo.type && vo.type !== 'None');
}

function clearVideoOutputs() {
  setVideoOutputs([]);
}

function createMonitorVideoInputRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'monitor-video-input-select';
  addEmptyOption(select);
  videoOutputOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  select.value = value;
  row.appendChild(createFieldWithLabel(select, 'Type'));
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createMonitorVideoInputRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (monitorVideoInputsContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setMonitorVideoInputs(list) {
  monitorVideoInputsContainer.innerHTML = '';
  const filtered = filterNoneEntries(list, 'type');
  if (filtered.length) {
    filtered.forEach(item => {
      const t = typeof item === 'string' ? item : item.type || item.portType;
      monitorVideoInputsContainer.appendChild(createMonitorVideoInputRow(t));
    });
  } else {
    monitorVideoInputsContainer.appendChild(createMonitorVideoInputRow());
  }
}

function getMonitorVideoInputs() {
  return Array.from(monitorVideoInputsContainer.querySelectorAll('select'))
    .map(sel => ({ type: sel.value }))
    .filter(v => v.type && v.type !== 'None');
}

function clearMonitorVideoInputs() {
  setMonitorVideoInputs([]);
}

function createMonitorVideoOutputRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'monitor-video-output-select';
  addEmptyOption(select);
  videoOutputOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  select.value = value;
  row.appendChild(createFieldWithLabel(select, 'Type'));
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createMonitorVideoOutputRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (monitorVideoOutputsContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setMonitorVideoOutputs(list) {
  monitorVideoOutputsContainer.innerHTML = '';
  const filtered = filterNoneEntries(list, 'type');
  if (filtered.length) {
    filtered.forEach(item => {
      const t = typeof item === 'string' ? item : item.type || item.portType;
      monitorVideoOutputsContainer.appendChild(createMonitorVideoOutputRow(t));
    });
  } else {
    monitorVideoOutputsContainer.appendChild(createMonitorVideoOutputRow());
  }
}

function getMonitorVideoOutputs() {
  return Array.from(monitorVideoOutputsContainer.querySelectorAll('select'))
    .map(sel => ({ type: sel.value }))
    .filter(v => v.type && v.type !== 'None');
}

function clearMonitorVideoOutputs() {
  setMonitorVideoOutputs([]);
}

function createVideoInputRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'video-input-select';
  addEmptyOption(select);
  videoOutputOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  select.value = value;
  row.appendChild(createFieldWithLabel(select, 'Type'));
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createVideoInputRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (videoVideoInputsContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setVideoInputs(list) {
  videoVideoInputsContainer.innerHTML = '';
  const filtered = filterNoneEntries(list, 'type');
  if (filtered.length) {
    filtered.forEach(item => {
      const t = typeof item === 'string' ? item : item.type || item.portType;
      videoVideoInputsContainer.appendChild(createVideoInputRow(t));
    });
  } else {
    videoVideoInputsContainer.appendChild(createVideoInputRow());
  }
}

function getVideoInputs() {
  return Array.from(videoVideoInputsContainer.querySelectorAll('select'))
    .map(sel => ({ type: sel.value }))
    .filter(v => v.type && v.type !== 'None');
}

function clearVideoInputs() { setVideoInputs([]); }

function createVideoIOOutputRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'video-output-select-io';
  addEmptyOption(select);
  videoOutputOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  select.value = value;
  row.appendChild(createFieldWithLabel(select, 'Type'));
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createVideoIOOutputRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (videoVideoOutputsContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setVideoOutputsIO(list) {
  videoVideoOutputsContainer.innerHTML = '';
  const filtered = filterNoneEntries(list, 'type');
  if (filtered.length) {
    filtered.forEach(item => {
      const t = typeof item === 'string' ? item : item.type || item.portType;
      videoVideoOutputsContainer.appendChild(createVideoIOOutputRow(t));
    });
  } else {
    videoVideoOutputsContainer.appendChild(createVideoIOOutputRow());
  }
}

function getVideoOutputsIO() {
  return Array.from(videoVideoOutputsContainer.querySelectorAll('select'))
    .map(sel => ({ type: sel.value }))
    .filter(v => v.type && v.type !== 'None');
}

function clearVideoOutputsIO() { setVideoOutputsIO([]); }

// Build a row for editing a FIZ connector entry.
function createFizConnectorRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'fiz-connector-select';
  addEmptyOption(select);
  fizConnectorOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  select.value = value;
  row.appendChild(createFieldWithLabel(select, 'Type'));
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createFizConnectorRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (fizConnectorContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setFizConnectors(list) {
  fizConnectorContainer.innerHTML = '';
  const filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(item => {
      const t = typeof item === 'string' ? item : item.type;
      fizConnectorContainer.appendChild(createFizConnectorRow(t));
    });
  } else {
    fizConnectorContainer.appendChild(createFizConnectorRow());
  }
}

function getFizConnectors() {
  return Array.from(fizConnectorContainer.querySelectorAll('select'))
    .map(sel => ({ type: sel.value }))
    .filter(fc => fc.type && fc.type !== 'None');
}

function clearFizConnectors() {
  setFizConnectors([]);
}

function getAllRecordingMedia() {
  const media = new Set();
  Object.values(devices.cameras).forEach(cam => {
    if (Array.isArray(cam.recordingMedia)) {
      cam.recordingMedia.forEach(m => { if (m && m.type) media.add(m.type); });
    }
  });
  return Array.from(media).sort(localeSort);
}

let recordingMediaOptions = getAllRecordingMedia();

function updateRecordingMediaOptions() {
  recordingMediaOptions = getAllRecordingMedia();
  document.querySelectorAll('.recording-media-select').forEach(sel => {
    const cur = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    recordingMediaOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      sel.appendChild(opt);
    });
    if (recordingMediaOptions.includes(cur)) sel.value = cur;
  });
}

// Build a row allowing the user to specify recording media details.
function createRecordingMediaRow(type = '', notes = '') {
  const row = document.createElement('div');
  row.className = 'form-row';

  const select = document.createElement('select');
  select.className = 'recording-media-select';
  addEmptyOption(select);
  recordingMediaOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  if (type) {
    if (!recordingMediaOptions.includes(type)) {
      const opt = document.createElement('option');
      opt.value = type;
      opt.textContent = type;
      select.appendChild(opt);
    }
    select.value = type;
  }
  row.appendChild(createFieldWithLabel(select, 'Type'));

  const notesInput = document.createElement('input');
  notesInput.type = 'text';
  notesInput.placeholder = 'Notes';
  notesInput.value = notes;
  row.appendChild(createFieldWithLabel(notesInput, 'Notes'));

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createRecordingMediaRow());
  });
  row.appendChild(addBtn);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (cameraMediaContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);

  return row;
}

function setRecordingMedia(list) {
  cameraMediaContainer.innerHTML = '';
  const filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(item => {
      const { type = '', notes = '' } = item || {};
      cameraMediaContainer.appendChild(createRecordingMediaRow(type, notes));
    });
  } else {
    cameraMediaContainer.appendChild(createRecordingMediaRow());
  }
}

function getRecordingMedia() {
  return Array.from(cameraMediaContainer.querySelectorAll('.form-row'))
    .map(row => {
      const [sel, notesInput] = row.querySelectorAll('select, input');
      return { type: sel.value, notes: notesInput.value };
    })
    .filter(m => m.type && m.type !== 'None');
}

function clearRecordingMedia() {
  setRecordingMedia([]);
}

function powerInputTypes(dev) {
  const out = [];
  if (!dev) return out;
  const add = t => {
    normalizePowerPortType(t).forEach(pt => out.push(pt));
  };
  if (dev.powerInput) {
    String(dev.powerInput)
      .split('/')
      .forEach(t => {
        if (t.trim()) add(t.trim());
      });
  }
  const inp = dev.power?.input;
  if (Array.isArray(inp)) {
    inp.forEach(i => {
      const typeVal = i && (i.type || i.portType);
      if (typeVal) add(typeVal);
    });
  } else if (inp) {
    const typeVal = inp.type || inp.portType;
    if (typeVal) add(typeVal);
  }
  return out;
}

function firstPowerInputType(dev) {
  const list = powerInputTypes(dev);
  return list.length ? list[0] : '';
}

function getAllPowerPortTypes() {
  const types = new Set();
  Object.values(devices.cameras).forEach(cam => powerInputTypes(cam).forEach(t => types.add(t)));
  Object.values(devices.monitors || {}).forEach(mon => powerInputTypes(mon).forEach(t => types.add(t)));
  Object.values(devices.video || {}).forEach(vd => powerInputTypes(vd).forEach(t => types.add(t)));
  Object.values(devices.fiz?.motors || {}).forEach(m => powerInputTypes(m).forEach(t => types.add(t)));
  Object.values(devices.fiz?.controllers || {}).forEach(c => powerInputTypes(c).forEach(t => types.add(t)));
  Object.values(devices.fiz?.distance || {}).forEach(d => powerInputTypes(d).forEach(t => types.add(t)));
  return Array.from(types).sort(localeSort);
}

let powerPortOptions = getAllPowerPortTypes();

function updatePowerPortOptions() {
  powerPortOptions = getAllPowerPortTypes();
  const current = cameraPortTypeInput.value;
  cameraPortTypeInput.innerHTML = '';
  addEmptyOption(cameraPortTypeInput);
  powerPortOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    cameraPortTypeInput.appendChild(opt);
  });
  if (powerPortOptions.includes(current)) cameraPortTypeInput.value = current;

  if (monitorPortTypeInput) {
    const curMon = monitorPortTypeInput.value;
    monitorPortTypeInput.innerHTML = '';
    addEmptyOption(monitorPortTypeInput);
    powerPortOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      monitorPortTypeInput.appendChild(opt);
    });
    if (powerPortOptions.includes(curMon)) monitorPortTypeInput.value = curMon;
  }
}

function getAllPlateTypes() {
  const types = new Set();
  Object.values(devices.cameras).forEach(cam => {
    const list = cam.power?.batteryPlateSupport;
    if (Array.isArray(list)) {
      list.forEach(bp => {
        if (bp && bp.type) types.add(bp.type);
      });
    }
  });
  return Array.from(types).sort(localeSort);
}

let plateTypeOptions = getAllPlateTypes();

function updatePlateTypeOptions() {
  plateTypeOptions = getAllPlateTypes();
  document.querySelectorAll('.battery-plate-type-select').forEach(sel => {
    const current = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    plateTypeOptions.forEach(pt => {
      const opt = document.createElement('option');
      opt.value = pt;
      opt.textContent = pt;
      sel.appendChild(opt);
    });
    if (plateTypeOptions.includes(current)) sel.value = current;
  });
}

// Build a battery plate row with type, mount and optional notes fields.
function createBatteryPlateRow(type = '', mount = 'native', notes = '') {
  const row = document.createElement('div');
  row.className = 'form-row';

  const typeSelect = document.createElement('select');
  typeSelect.className = 'battery-plate-type-select';
  addEmptyOption(typeSelect);
  plateTypeOptions.forEach(pt => {
    const opt = document.createElement('option');
    opt.value = pt;
    opt.textContent = pt;
    typeSelect.appendChild(opt);
  });
  if (type && !plateTypeOptions.includes(type)) {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = type;
    typeSelect.appendChild(opt);
  }
  typeSelect.value = type;
  row.appendChild(createFieldWithLabel(typeSelect, 'Type'));

  const mountSelect = document.createElement('select');
  addEmptyOption(mountSelect);
  ['native','adapted'].forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    mountSelect.appendChild(opt);
  });
  mountSelect.value = mount || '';
  row.appendChild(createFieldWithLabel(mountSelect, 'Mount'));

  const notesInput = document.createElement('input');
  notesInput.type = 'text';
  notesInput.placeholder = 'Notes';
  notesInput.value = notes;
  row.appendChild(createFieldWithLabel(notesInput, 'Notes'));

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createBatteryPlateRow());
  });
  row.appendChild(addBtn);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (batteryPlatesContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);

  return row;
}

function setBatteryPlates(list) {
  batteryPlatesContainer.innerHTML = '';
  const filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(item => {
      const { type = '', mount = 'native', notes = '' } = item || {};
      batteryPlatesContainer.appendChild(createBatteryPlateRow(type, mount, notes));
    });
  } else {
    batteryPlatesContainer.appendChild(createBatteryPlateRow());
  }
}

function getBatteryPlates() {
  return Array.from(batteryPlatesContainer.querySelectorAll('.form-row'))
    .map(row => {
      const [typeSel, mountSel, notesInput] = row.querySelectorAll('select, input');
      return { type: typeSel.value, mount: mountSel.value, notes: notesInput.value };
    })
    .filter(bp => bp.type && bp.type !== 'None');
}

function clearBatteryPlates() {
  setBatteryPlates([]);
}

function getAllViewfinderTypes() {
  const types = new Set();
  Object.values(devices.cameras).forEach(cam => {
    if (Array.isArray(cam.viewfinder)) {
      cam.viewfinder.forEach(vf => {
        if (vf && vf.type) types.add(vf.type);
      });
    }
  });
  return Array.from(types).sort(localeSort);
}

function getAllViewfinderConnectors() {
  const conns = new Set();
  Object.values(devices.cameras).forEach(cam => {
    if (Array.isArray(cam.viewfinder)) {
      cam.viewfinder.forEach(vf => {
        if (vf && vf.connector) conns.add(vf.connector);
      });
    }
  });
  return Array.from(conns).filter(c => c).sort(localeSort);
}

let viewfinderTypeOptions = getAllViewfinderTypes();
let viewfinderConnectorOptions = getAllViewfinderConnectors();

// Build a viewfinder configuration row used in the camera editor.
function createViewfinderRow(type = '', resolution = '', connector = '', notes = '') {
  const row = document.createElement('div');
  row.className = 'form-row';

  const typeSelect = document.createElement('select');
  typeSelect.className = 'viewfinder-type-select';
  addEmptyOption(typeSelect);
  viewfinderTypeOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    typeSelect.appendChild(opt);
  });
  if (type && !viewfinderTypeOptions.includes(type)) {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = type;
    typeSelect.appendChild(opt);
  }
  typeSelect.value = type;
  row.appendChild(createFieldWithLabel(typeSelect, 'Type'));

  const resInput = document.createElement('input');
  resInput.type = 'text';
  resInput.placeholder = 'Resolution';
  resInput.value = resolution;
  row.appendChild(createFieldWithLabel(resInput, 'Resolution'));

  const connSelect = document.createElement('select');
  connSelect.className = 'viewfinder-connector-select';
  addEmptyOption(connSelect);
  viewfinderConnectorOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    connSelect.appendChild(opt);
  });
  if (connector && !viewfinderConnectorOptions.includes(connector)) {
    const opt = document.createElement('option');
    opt.value = connector;
    opt.textContent = connector;
    connSelect.appendChild(opt);
  }
  connSelect.value = connector;
  row.appendChild(createFieldWithLabel(connSelect, 'Connector'));

  const notesInput = document.createElement('input');
  notesInput.type = 'text';
  notesInput.placeholder = 'Notes';
  notesInput.value = notes;
  row.appendChild(createFieldWithLabel(notesInput, 'Notes'));

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createViewfinderRow());
  });
  row.appendChild(addBtn);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (viewfinderContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);

  return row;
}

function setViewfinders(list) {
  viewfinderContainer.innerHTML = '';
  const filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(item => {
      const { type = '', resolution = '', connector = '', notes = '' } = item || {};
      viewfinderContainer.appendChild(createViewfinderRow(type, resolution, connector, notes));
    });
  } else {
    viewfinderContainer.appendChild(createViewfinderRow());
  }
}

function getViewfinders() {
  return Array.from(viewfinderContainer.querySelectorAll('.form-row'))
    .map(row => {
      const [typeSelect, resInput, connSelect, notesInput] = row.querySelectorAll('select, input');
      return {
        type: typeSelect.value,
        resolution: resInput.value,
        connector: connSelect.value,
        notes: notesInput.value
      };
    })
    .filter(vf => vf.type && vf.type !== 'None');
}

function clearViewfinders() {
  setViewfinders([]);
}

function getAllMountTypes() {
  const types = new Set();
  Object.values(devices.cameras).forEach(cam => {
    if (Array.isArray(cam.lensMount)) {
      cam.lensMount.forEach(lm => {
        if (lm && lm.type) types.add(lm.type);
      });
    }
  });
  return Array.from(types).sort(localeSort);
}

let mountTypeOptions = getAllMountTypes();

function updateMountTypeOptions() {
  mountTypeOptions = getAllMountTypes();
  document.querySelectorAll('.lens-mount-type-select').forEach(sel => {
    const current = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    mountTypeOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      sel.appendChild(opt);
    });
    if (mountTypeOptions.includes(current)) sel.value = current;
  });
}

// Build a lens mount row with type and mount selection fields.
function createLensMountRow(type = '', mount = 'native') {
  const row = document.createElement('div');
  row.className = 'form-row';

  const typeSelect = document.createElement('select');
  typeSelect.className = 'lens-mount-type-select';
  addEmptyOption(typeSelect);
  mountTypeOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    typeSelect.appendChild(opt);
  });
  if (type && !mountTypeOptions.includes(type)) {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = type;
    typeSelect.appendChild(opt);
  }
  typeSelect.value = type;
  row.appendChild(createFieldWithLabel(typeSelect, 'Type'));

  const mountSelect = document.createElement('select');
  addEmptyOption(mountSelect);
  ['native', 'adapted'].forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    mountSelect.appendChild(opt);
  });
  mountSelect.value = mount || '';
  row.appendChild(createFieldWithLabel(mountSelect, 'Mount'));

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createLensMountRow());
  });
  row.appendChild(addBtn);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (lensMountContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);

  return row;
}

function setLensMounts(list) {
  lensMountContainer.innerHTML = '';
  const filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(item => {
      const { type = '', mount = 'native' } = item || {};
      lensMountContainer.appendChild(createLensMountRow(type, mount));
    });
  } else {
    lensMountContainer.appendChild(createLensMountRow());
  }
}

function getLensMounts() {
  return Array.from(lensMountContainer.querySelectorAll('.form-row'))
    .map(row => {
      const [typeSel, mountSel] = row.querySelectorAll('select');
      return { type: typeSel.value, mount: mountSel.value };
    })
    .filter(lm => lm.type && lm.type !== 'None');
}

function clearLensMounts() {
  setLensMounts([]);
}

function getAllPowerDistTypes() {
  const types = new Set();
  Object.values(devices.cameras).forEach(cam => {
    const list = cam.power?.powerDistributionOutputs;
    if (Array.isArray(list)) {
      list.forEach(pd => { if (pd && pd.type) types.add(pd.type); });
    }
  });
  return Array.from(types).sort(localeSort);
}

let powerDistTypeOptions = getAllPowerDistTypes();
function getAllPowerDistVoltages() {
  const volts = new Set();
  Object.values(devices.cameras).forEach(cam => {
    const list = cam.power?.powerDistributionOutputs;
    if (Array.isArray(list)) {
      list.forEach(pd => { if (pd && pd.voltage) volts.add(pd.voltage); });
    }
  });
  return Array.from(volts).filter(v => v).sort(localeSort);
}

function getAllPowerDistCurrents() {
  const currents = new Set();
  Object.values(devices.cameras).forEach(cam => {
    const list = cam.power?.powerDistributionOutputs;
    if (Array.isArray(list)) {
      list.forEach(pd => { if (pd && pd.current) currents.add(pd.current); });
    }
  });
  return Array.from(currents).filter(c => c).sort(localeSort);
}

let powerDistVoltageOptions = getAllPowerDistVoltages();
let powerDistCurrentOptions = getAllPowerDistCurrents();

function updatePowerDistVoltageOptions() {
  powerDistVoltageOptions = getAllPowerDistVoltages();
  document.querySelectorAll('.power-dist-voltage-select').forEach(sel => {
    const cur = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    powerDistVoltageOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      sel.appendChild(opt);
    });
    if (powerDistVoltageOptions.includes(cur)) sel.value = cur;
  });
}

function updatePowerDistCurrentOptions() {
  powerDistCurrentOptions = getAllPowerDistCurrents();
  document.querySelectorAll('.power-dist-current-select').forEach(sel => {
    const cur = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    powerDistCurrentOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      sel.appendChild(opt);
    });
    if (powerDistCurrentOptions.includes(cur)) sel.value = cur;
  });
}

function updatePowerDistTypeOptions() {
  powerDistTypeOptions = getAllPowerDistTypes();
  document.querySelectorAll('.power-dist-type-select').forEach(sel => {
    const cur = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    powerDistTypeOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      sel.appendChild(opt);
    });
    if (powerDistTypeOptions.includes(cur)) sel.value = cur;
  });
}

// Build a power distribution output row for the editor UI.
function createPowerDistRow(type = '', voltage = '', current = '', wattage = '', notes = '') {
  const row = document.createElement('div');
  row.className = 'form-row';

  const typeSelect = document.createElement('select');
  typeSelect.className = 'power-dist-type-select';
  addEmptyOption(typeSelect);
  powerDistTypeOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    typeSelect.appendChild(opt);
  });
  if (type && !powerDistTypeOptions.includes(type)) {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = type;
    typeSelect.appendChild(opt);
  }
  typeSelect.value = type;
  row.appendChild(createFieldWithLabel(typeSelect, 'Type'));

  const voltSelect = document.createElement('select');
  voltSelect.className = 'power-dist-voltage-select';
  addEmptyOption(voltSelect);
  powerDistVoltageOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    voltSelect.appendChild(opt);
  });
  if (voltage && !powerDistVoltageOptions.includes(voltage)) {
    const opt = document.createElement('option');
    opt.value = voltage;
    opt.textContent = voltage;
    voltSelect.appendChild(opt);
  }
  voltSelect.value = voltage;
  row.appendChild(createFieldWithLabel(voltSelect, 'Voltage'));

  const currSelect = document.createElement('select');
  currSelect.className = 'power-dist-current-select';
  addEmptyOption(currSelect);
  powerDistCurrentOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    currSelect.appendChild(opt);
  });
  if (current && !powerDistCurrentOptions.includes(current)) {
    const opt = document.createElement('option');
    opt.value = current;
    opt.textContent = current;
    currSelect.appendChild(opt);
  }
  currSelect.value = current;
  row.appendChild(createFieldWithLabel(currSelect, 'Current'));

  const wattInput = document.createElement('input');
  wattInput.type = 'number';
  wattInput.step = '0.1';
  wattInput.placeholder = 'W';
  wattInput.value = wattage === null || wattage === undefined ? '' : wattage;
  row.appendChild(createFieldWithLabel(wattInput, 'W')); 

  const notesInput = document.createElement('input');
  notesInput.type = 'text';
  notesInput.placeholder = 'Notes';
  notesInput.value = notes;
  row.appendChild(createFieldWithLabel(notesInput, 'Notes'));

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createPowerDistRow());
  });
  row.appendChild(addBtn);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (powerDistContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);

  return row;
}

function setPowerDistribution(list) {
  powerDistContainer.innerHTML = '';
  const filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(item => {
      const { type = '', voltage = '', current = '', wattage = '', notes = '' } = item || {};
      powerDistContainer.appendChild(createPowerDistRow(type, voltage, current, wattage, notes));
    });
  } else {
    powerDistContainer.appendChild(createPowerDistRow());
  }
}

function getPowerDistribution() {
  return Array.from(powerDistContainer.querySelectorAll('.form-row'))
    .map(row => {
      const [typeSel, voltSel, currSel, wattInput, notesInput] = row.querySelectorAll('select, input');
      return {
        type: typeSel.value,
        voltage: voltSel.value,
        current: currSel.value,
        wattage: wattInput.value ? parseFloat(wattInput.value) : null,
        notes: notesInput.value
      };
    })
    .filter(pd => pd.type && pd.type !== 'None');
}

function clearPowerDistribution() {
  setPowerDistribution([]);
}

function getAllTimecodeTypes() {
  const types = new Set();
  Object.values(devices.cameras).forEach(cam => {
    const list = cam.timecode;
    if (Array.isArray(list)) {
      list.forEach(tc => { if (tc && tc.type) types.add(tc.type); });
    }
  });
  return Array.from(types).sort(localeSort);
}

let timecodeTypeOptions = getAllTimecodeTypes();

function updateTimecodeTypeOptions() {
  timecodeTypeOptions = getAllTimecodeTypes();
  document.querySelectorAll('.timecode-type-select').forEach(sel => {
    const cur = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    timecodeTypeOptions.forEach(optVal => {
      const opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      sel.appendChild(opt);
    });
    if (timecodeTypeOptions.includes(cur)) sel.value = cur;
  });
}

// Build a timecode connector row used for editing camera properties.
function createTimecodeRow(type = '', notes = '') {
  const row = document.createElement('div');
  row.className = 'form-row';

  const typeSelect = document.createElement('select');
  typeSelect.className = 'timecode-type-select';
  addEmptyOption(typeSelect);
  timecodeTypeOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    typeSelect.appendChild(opt);
  });
  if (type && !timecodeTypeOptions.includes(type)) {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = type;
    typeSelect.appendChild(opt);
  }
  typeSelect.value = type;
  row.appendChild(createFieldWithLabel(typeSelect, 'Type'));

  const notesInput = document.createElement('input');
  notesInput.type = 'text';
  notesInput.placeholder = 'Notes';
  notesInput.value = notes;
  row.appendChild(createFieldWithLabel(notesInput, 'Notes'));

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createTimecodeRow());
  });
  row.appendChild(addBtn);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (timecodeContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);

  return row;
}

function setTimecodes(list) {
  timecodeContainer.innerHTML = '';
  const filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(item => {
      const { type = '', notes = '' } = item || {};
      timecodeContainer.appendChild(createTimecodeRow(type, notes));
    });
  } else {
    timecodeContainer.appendChild(createTimecodeRow());
  }
}

function getTimecodes() {
  return Array.from(timecodeContainer.querySelectorAll('.form-row'))
    .map(row => {
      const [typeSel, notesInput] = row.querySelectorAll('select, input');
      return { type: typeSel.value, notes: notesInput.value };
    })
    .filter(tc => tc.type && tc.type !== 'None');
}

function clearTimecodes() {
  setTimecodes([]);
}


// Populate dropdowns with device options
function populateSelect(selectElem, optionsObj, includeNone=true) {
  selectElem.innerHTML = "";
  if (includeNone) {
    const noneOpt = document.createElement("option");
    noneOpt.value = "None";
    const noneMap = { de: "Keine Auswahl", es: "Ninguno", fr: "Aucun" };
    noneOpt.textContent = noneMap[currentLang] || "None";
    selectElem.appendChild(noneOpt);
  }
  Object.keys(optionsObj)
    .filter(name => name !== "None")
    .sort(localeSort)
    .forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      selectElem.appendChild(opt);
    });
}

function filterSelect(selectElem, filterValue) {
  const text = filterValue.toLowerCase();
  Array.from(selectElem.options).forEach(opt => {
    if (opt.value === "None" || text === "" || opt.textContent.toLowerCase().includes(text)) {
      opt.hidden = false;
      opt.disabled = false;
    } else {
      opt.hidden = true;
      opt.disabled = true;
    }
  });
}

function filterDeviceList(listElem, filterValue) {
  const text = filterValue.toLowerCase();
  Array.from(listElem.querySelectorAll('li')).forEach(li => {
    const nameSpan = li.querySelector('.device-summary span');
    const name = nameSpan ? nameSpan.textContent.toLowerCase() : '';
    if (text === '' || name.includes(text)) {
      li.style.display = '';
    } else {
      li.style.display = 'none';
    }
  });
}

// Attach in-select search filtering for a dropdown
function attachSelectSearch(selectElem) {
  let searchStr = "";
  let timer;

  selectElem.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      searchStr = searchStr.slice(0, -1);
      filterSelect(selectElem, searchStr);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      searchStr = "";
      filterSelect(selectElem, searchStr);
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      searchStr += e.key.toLowerCase();
      filterSelect(selectElem, searchStr);
      e.preventDefault();
    } else {
      return;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      searchStr = "";
    }, 1000);
  });

  selectElem.addEventListener('blur', () => {
    searchStr = "";
    filterSelect(selectElem, "");
  });
}

function bindFilterInput(inputElem, callback) {
  if (!inputElem) {
    return;
  }
  inputElem.addEventListener("input", callback);
  inputElem.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      inputElem.value = "";
      callback();
    }
  });
}

function clearAllFilters() {
  [cameraFilterInput, monitorFilterInput, videoFilterInput, motorFilterInput,
   controllerFilterInput, distanceFilterInput, batteryFilterInput].forEach(input => {
    if (input) input.value = "";
  });
  filterSelect(cameraSelect, "");
  filterSelect(monitorSelect, "");
  filterSelect(videoSelect, "");
  motorSelects.forEach(sel => filterSelect(sel, ""));
  controllerSelects.forEach(sel => filterSelect(sel, ""));
  filterSelect(distanceSelect, "");
  filterSelect(batterySelect, "");
}

function applyFilters() {
  filterSelect(cameraSelect, cameraFilterInput.value);
  filterSelect(monitorSelect, monitorFilterInput.value);
  filterSelect(videoSelect, videoFilterInput.value);
  motorSelects.forEach(sel => filterSelect(sel, motorFilterInput.value));
  controllerSelects.forEach(sel => filterSelect(sel, controllerFilterInput.value));
  filterSelect(distanceSelect, distanceFilterInput.value);
  filterSelect(batterySelect, batteryFilterInput.value);

  filterDeviceList(cameraListElem, cameraListFilterInput.value);
  filterDeviceList(monitorListElem, monitorListFilterInput.value);
  filterDeviceList(videoListElem, videoListFilterInput.value);
  filterDeviceList(motorListElem, motorListFilterInput.value);
  filterDeviceList(controllerListElem, controllerListFilterInput.value);
  filterDeviceList(distanceListElem, distanceListFilterInput.value);
  filterDeviceList(batteryListElem, batteryListFilterInput.value);
}

// Initialize device selection dropdowns
populateSelect(cameraSelect, devices.cameras, true);
populateSelect(monitorSelect, devices.monitors, true);
populateSelect(videoSelect, devices.video, true);
motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
populateSelect(distanceSelect, devices.fiz.distance, true);
populateSelect(batterySelect, devices.batteries, true);
updateBatteryPlateVisibility();
updateBatteryOptions();

// Enable search inside dropdowns
[cameraSelect, monitorSelect, videoSelect, distanceSelect, batterySelect]
  .forEach(sel => attachSelectSearch(sel));
motorSelects.forEach(sel => attachSelectSearch(sel));
controllerSelects.forEach(sel => attachSelectSearch(sel));
applyFilters();
setVideoOutputs([]);
setMonitorVideoInputs([]);
setMonitorVideoOutputs([]);
setFizConnectors([]);
updateFizConnectorOptions();
updateMotorConnectorOptions();
updateControllerConnectorOptions();
updateControllerPowerOptions();
updateControllerBatteryOptions();
updateControllerConnectivityOptions();
updateDistanceConnectionOptions();
updateDistanceMethodOptions();
updateDistanceDisplayOptions();
setViewfinders([]);
setBatteryPlates([]);
setRecordingMedia([]);
updateRecordingMediaOptions();
updatePlateTypeOptions();
setLensMounts([]);
updateMountTypeOptions();
updatePowerPortOptions();
setPowerDistribution([]);
updatePowerDistTypeOptions();
updatePowerDistVoltageOptions();
updatePowerDistCurrentOptions();
setTimecodes([]);
updateTimecodeTypeOptions();
updateDistanceConnectionOptions();
updateDistanceMethodOptions();
updateDistanceDisplayOptions();

// Set default selections for dropdowns

// Kamera: Wenn Option „None“ existiert, dann setze sie – sonst erste Option
const noneCameraOption = Array.from(cameraSelect.options).find(opt => opt.value === "None");
if (noneCameraOption) {
  cameraSelect.value = "None";
} else {
  cameraSelect.selectedIndex = 0;
}

// Für die anderen Dropdowns
[monitorSelect, videoSelect, distanceSelect, batterySelect].forEach(sel => {
  const noneOption = Array.from(sel.options).find(opt => opt.value === "None");
  if (noneOption) {
    sel.value = "None";
  } else {
    sel.selectedIndex = 0;
  }
});

// FIZ Dropdowns
motorSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
controllerSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });

// Calculation function to update results and warnings
function renderTemperatureNote(baseHours) {
  const container = document.getElementById("temperatureNote");
  if (!container) return;
  const heading = texts[currentLang].temperatureNoteHeading;
  let html = `<p>${heading}</p>`;
  if (!baseHours || !isFinite(baseHours)) {
    container.innerHTML = html;
    return;
  }
  const scenarios = [
    { t: "+40 \u00B0C", factor: 1.0, color: "#d9534f" },
    { t: "+25 \u00B0C", factor: 1.0, color: "#5cb85c" },
    { t: "0 \u00B0C", factor: 0.8, color: "#f0ad4e" },
    { t: "\u201310 \u00B0C", factor: 0.625, color: "#5bc0de" },
    { t: "\u201320 \u00B0C", factor: 0.5, color: "#0275d8" }
  ];
  html += `<table><tr><th>${texts[currentLang].temperatureLabel}</th><th>${texts[currentLang].runtimeLabel}</th><th>${texts[currentLang].batteryCountTempLabel}</th></tr>`;
  scenarios.forEach(s => {
    const runtime = baseHours * s.factor;
    const batteries = Math.ceil(10 / runtime + 1);
    html += `<tr><td style="color:${s.color}">${s.t}</td><td>${runtime.toFixed(2)}</td><td>${batteries}</td></tr>`;
  });
  html += "</table>";
  container.innerHTML = html;
}

// Calculation function to update results and warnings
function updateCalculations() {
  // Gather selected values
  const camera      = cameraSelect.value;
  const monitor     = monitorSelect.value;
  const video       = videoSelect.value;
  const motors      = motorSelects.map(sel => sel.value);
  const controllers = controllerSelects.map(sel => sel.value);
  const distance    = distanceSelect.value;
  const battery     = batterySelect.value;

  // Calculate total power consumption (W)
  let cameraW = 0;
  if (devices.cameras[camera] !== undefined) {
    const camData = devices.cameras[camera];
    cameraW = typeof camData === 'object' ? camData.powerDrawWatts || 0 : camData;
  }
  let monitorW = 0;
  if (devices.monitors[monitor] !== undefined) {
    const mData = devices.monitors[monitor];
    monitorW = typeof mData === 'object' ? mData.powerDrawWatts || 0 : mData;
  }
  let videoW = 0;
  if (devices.video[video] !== undefined) {
    const vData = devices.video[video];
    videoW = typeof vData === 'object' ? vData.powerDrawWatts || 0 : vData;
  }
  let motorsW = 0;
  motors.forEach(m => {
    if (devices.fiz.motors[m] !== undefined) {
      const d = devices.fiz.motors[m];
      motorsW += typeof d === 'object' ? d.powerDrawWatts || 0 : d;
    }
  });
  let controllersW = 0;
  controllers.forEach(c => {
    if (devices.fiz.controllers[c] !== undefined) {
      const d = devices.fiz.controllers[c];
      controllersW += typeof d === 'object' ? d.powerDrawWatts || 0 : d;
    }
  });
  let distanceW = 0;
  if (devices.fiz.distance[distance] !== undefined) {
    const d = devices.fiz.distance[distance];
    distanceW = typeof d === 'object' ? d.powerDrawWatts || 0 : d;
  }

  const totalWatt = cameraW + monitorW + videoW + motorsW + controllersW + distanceW;
  totalPowerElem.textContent = totalWatt.toFixed(1);

  // Update breakdown by category
  breakdownListElem.innerHTML = "";
  if (cameraW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].cameraLabel}</strong> ${cameraW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }
  if (monitorW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].monitorLabel}</strong> ${monitorW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }
  if (videoW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].videoLabel}</strong> ${videoW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }
  if (motorsW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].fizMotorsLabel}</strong> ${motorsW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }
  if (controllersW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].fizControllersLabel}</strong> ${controllersW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }
  if (distanceW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].distanceLabel}</strong> ${distanceW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }

  // Calculate currents depending on battery type
  const bMountCam = getSelectedPlate() === 'B-Mount';
  let highV = bMountCam ? 33.6 : 14.4;
  let lowV = bMountCam ? 21.6 : 12.0;
  let totalCurrentHigh = 0;
  let totalCurrentLow = 0;
  if (totalWatt > 0) {
    totalCurrentHigh = totalWatt / highV;
    totalCurrentLow = totalWatt / lowV;
  }
  const currentHighLabel = document.getElementById("totalCurrent144Label");
  currentHighLabel.textContent = bMountCam
    ? texts[currentLang].totalCurrent336Label
    : texts[currentLang].totalCurrent144Label;
  currentHighLabel.setAttribute(
    "data-help",
    bMountCam
      ? texts[currentLang].totalCurrent336Help
      : texts[currentLang].totalCurrent144Help
  );
  const currentLowLabel = document.getElementById("totalCurrent12Label");
  currentLowLabel.textContent = bMountCam
    ? texts[currentLang].totalCurrent216Label
    : texts[currentLang].totalCurrent12Label;
  currentLowLabel.setAttribute(
    "data-help",
    bMountCam
      ? texts[currentLang].totalCurrent216Help
      : texts[currentLang].totalCurrent12Help
  );
  totalCurrent144Elem.textContent = totalCurrentHigh.toFixed(2);
  totalCurrent12Elem.textContent = totalCurrentLow.toFixed(2);

// Wenn kein Akku oder "None" ausgewählt ist: Laufzeit = nicht berechenbar, keine Warnungen
let hours = null;
if (!battery || battery === "None" || !devices.batteries[battery]) {
  batteryLifeElem.textContent = "–";
  batteryCountElem.textContent = "–";
  pinWarnElem.textContent = "";
  pinWarnElem.style.color = "";
  dtapWarnElem.textContent = "";
  dtapWarnElem.style.color = "";
  lastRuntimeHours = null;
} else {
    const battData = devices.batteries[battery];
    const capacityWh = battData.capacity;
    const maxPinA = battData.pinA;
    const maxDtapA = battData.dtapA;
    totalCurrent144Elem.textContent = totalCurrentHigh.toFixed(2);
    totalCurrent12Elem.textContent = totalCurrentLow.toFixed(2);
    if (totalWatt === 0) {
      hours = Infinity;
      batteryLifeElem.textContent = "∞";
    } else {
      hours = capacityWh / totalWatt;
      batteryLifeElem.textContent = hours.toFixed(2);
    }
    lastRuntimeHours = hours;
    // Round up total batteries (including one spare) to the next full number
    const batteriesNeeded = Math.ceil(10 / hours + 1);
    batteryCountElem.textContent = batteriesNeeded.toString();
    // Warnings about current draw vs battery limits
    pinWarnElem.textContent = "";
    dtapWarnElem.textContent = "";
    let pinSeverity = "";
    let dtapSeverity = "";
    if (totalCurrentLow > maxPinA) {
      pinWarnElem.textContent = texts[currentLang].warnPinExceeded
        .replace("{current}", totalCurrentLow.toFixed(2))
        .replace("{max}", maxPinA);
      pinSeverity = texts[currentLang].warnPinExceededLevel;
    } else if (totalCurrentLow > maxPinA * 0.8) {
      pinWarnElem.textContent = texts[currentLang].warnPinNear
        .replace("{current}", totalCurrentLow.toFixed(2))
        .replace("{max}", maxPinA);
      pinSeverity = texts[currentLang].warnPinNearLevel;
    }
    if (!bMountCam) {
      if (totalCurrentLow > maxDtapA) {
        dtapWarnElem.textContent = texts[currentLang].warnDTapExceeded
          .replace("{current}", totalCurrentLow.toFixed(2))
          .replace("{max}", maxDtapA);
        dtapSeverity = texts[currentLang].warnDTapExceededLevel;
      } else if (totalCurrentLow > maxDtapA * 0.8) {
        dtapWarnElem.textContent = texts[currentLang].warnDTapNear
          .replace("{current}", totalCurrentLow.toFixed(2))
          .replace("{max}", maxDtapA);
        dtapSeverity = texts[currentLang].warnDTapNearLevel;
      }
    }
    // Show max current capability and status (OK/Warning) for Pin and D-Tap
    if (pinWarnElem.textContent === "") {
      pinWarnElem.textContent = texts[currentLang].pinOk
        .replace("{max}", maxPinA);
      pinWarnElem.style.color = "green";
    } else {
      if (pinSeverity === texts[currentLang].warnPinExceededLevel) {
        pinWarnElem.style.color = "red";
      } else if (pinSeverity === texts[currentLang].warnPinNearLevel) {
        pinWarnElem.style.color = "orange";
      } else {
        pinWarnElem.style.color = "";
      }
    }
    if (!bMountCam) {
      if (dtapWarnElem.textContent === "") {
        dtapWarnElem.textContent = texts[currentLang].dtapOk
          .replace("{max}", maxDtapA);
        dtapWarnElem.style.color = "green";
      } else {
        if (dtapSeverity === texts[currentLang].warnDTapExceededLevel) {
          dtapWarnElem.style.color = "red";
        } else if (dtapSeverity === texts[currentLang].warnDTapNearLevel) {
          dtapWarnElem.style.color = "orange";
        } else {
          dtapWarnElem.style.color = "";
        }
      }
    } else {
      dtapWarnElem.textContent = "";
      dtapWarnElem.style.color = "";
    }
  }

  // Battery comparison table update
  if (totalWatt > 0) {
    // Build lists of batteries that can supply this current (via Pin or D-Tap)
    const selectedBatteryName = batterySelect.value;
    const camName = cameraSelect.value;
    const plateFilter = getSelectedPlate();
    const supportsB = supportsBMountCamera(camName);
    let selectedCandidate = null;
    if (selectedBatteryName && selectedBatteryName !== "None" && devices.batteries[selectedBatteryName]) {
      const selData = devices.batteries[selectedBatteryName];
      if ((!plateFilter || selData.mount_type === plateFilter) && (supportsB || selData.mount_type !== 'B-Mount')) {
        const pinOK_sel = totalCurrentLow <= selData.pinA;
        const dtapOK_sel = !bMountCam && totalCurrentLow <= selData.dtapA;
        if (pinOK_sel || dtapOK_sel) {
          const selHours = selData.capacity / totalWatt;
          let selMethod;
          if (pinOK_sel && dtapOK_sel) selMethod = "both pins and D-Tap";
          else if (pinOK_sel) selMethod = "pins";
          else selMethod = "dtap";
          selectedCandidate = { name: selectedBatteryName, hours: selHours, method: selMethod };
        }
      }
    }

    const pinsCandidates = [];
    const dtapCandidates = [];
    for (let battName in devices.batteries) {
      if (battName === "None") continue;
      if (selectedCandidate && battName === selectedCandidate.name) continue;

      const data = devices.batteries[battName];
      if (plateFilter && data.mount_type !== plateFilter) continue;
      if (!plateFilter && !supportsB && data.mount_type === 'B-Mount') continue;
      const canPin = totalCurrentLow <= data.pinA;
      const canDTap = !bMountCam && totalCurrentLow <= data.dtapA;

      if (canPin) {
        const hours = data.capacity / totalWatt;
        const method = (canDTap ? "both pins and D-Tap" : "pins");
        pinsCandidates.push({ name: battName, hours: hours, method: method });
      } else if (canDTap) {
        const hours = data.capacity / totalWatt;
        dtapCandidates.push({ name: battName, hours: hours, method: "dtap" });
      }
    }

    // Sort by runtime (hours) descending within each group
    pinsCandidates.sort((a, b) => b.hours - a.hours);
    dtapCandidates.sort((a, b) => b.hours - a.hours);

    // Prepare table HTML
    let tableHtml = `<tr><th>${texts[currentLang].batteryTableLabel}</th><th>${texts[currentLang].runtimeLabel}</th><th></th></tr>`;

    if ((selectedCandidate ? 1 : 0) + pinsCandidates.length + dtapCandidates.length === 0) {
      // No battery can supply via either output
      tableHtml += `<tr><td colspan="3">${texts[currentLang].noBatterySupports}</td></tr>`;
    } else {
      const allCandidatesForMax = (selectedCandidate ? [selectedCandidate] : []).concat(pinsCandidates, dtapCandidates);
      const maxHours = Math.max(...allCandidatesForMax.map(c => c.hours)) || 1; // Ensure not dividing by zero

      // Helper function to get the correct bar class
      const getBarClass = (method) => {
          return method === "pins" ? "bar bar-pins-only" : "bar";
      };
      // Helper to display method label
      const getMethodLabel = (method) => {
            if (method === "pins") return `<span style="color:#FF9800;">${texts[currentLang].methodPinsOnly}</span>`;
            if (method === "both pins and D-Tap") return `<span style="color:#4CAF50;">${texts[currentLang].methodPinsAndDTap}</span>`;
            if (method === "infinite") return `<span style="color:#007bff;">${texts[currentLang].methodInfinite}</span>`;
            return method;
        };

      // Add selected battery first, if it's a valid candidate
      if (selectedCandidate) {
        tableHtml += `<tr class="selectedBatteryRow">
                        <td>${escapeHtml(selectedCandidate.name)}</td>
                        <td>${selectedCandidate.hours.toFixed(2)}h (${getMethodLabel(selectedCandidate.method)})</td>
                        <td>
                          <div class="barContainer">
                            <div class="${getBarClass(selectedCandidate.method)}" style="width: ${(selectedCandidate.hours / maxHours) * 100}%;"></div>
                          </div>
                        </td>
                      </tr>`;
      }
      // Add other candidates
      pinsCandidates.forEach(candidate => {
        if (selectedCandidate && candidate.name === selectedCandidate.name) return; // Already added if selected
        tableHtml += `<tr>
                        <td>${escapeHtml(candidate.name)}</td>
                        <td>${candidate.hours.toFixed(2)}h (${getMethodLabel(candidate.method)})</td>
                        <td>
                          <div class="barContainer">
                            <div class="${getBarClass(candidate.method)}" style="width: ${(candidate.hours / maxHours) * 100}%;"></div>
                          </div>
                        </td>
                      </tr>`;
      });
       dtapCandidates.forEach(candidate => {
        if (selectedCandidate && candidate.name === selectedCandidate.name) return; // Already added if selected
        // Only add if not already in pinsCandidates (to avoid duplicates if a battery can do both but was only listed under dtapCandidates)
        const alreadyInPins = pinsCandidates.some(p => p.name === candidate.name);
        if (!alreadyInPins) {
            tableHtml += `<tr>
                            <td>${escapeHtml(candidate.name)}</td>
                            <td>${candidate.hours.toFixed(2)}h (${getMethodLabel(candidate.method)})</td>
                            <td>
                              <div class="barContainer">
                                <div class="${getBarClass(candidate.method)}" style="width: ${(candidate.hours / maxHours) * 100}%;"></div>
                              </div>
                            </td>
                          </tr>`;
        }
      });
    }
    batteryTableElem.innerHTML = tableHtml;
    batteryComparisonSection.style.display = "block";
  } else {
    batteryComparisonSection.style.display = "none";
  }
  const feedback = renderFeedbackTable(getCurrentSetupKey());
  if (feedback !== null) {
    let combinedRuntime = feedback.runtime;
    if (Number.isFinite(hours)) {
      combinedRuntime =
        (feedback.runtime * feedback.weight + hours) / (feedback.weight + 1);
    }
    batteryLifeElem.textContent = combinedRuntime.toFixed(2);
    lastRuntimeHours = combinedRuntime;
    if (batteryLifeLabelElem) {
      let label = texts[currentLang].batteryLifeLabel;
      const userNote = texts[currentLang].runtimeUserCountNote.replace('{count}', feedback.count);
      const idx = label.indexOf(')');
      if (idx !== -1) {
        label = `${label.slice(0, idx)}, ${userNote}${label.slice(idx)}`;
      }
      batteryLifeLabelElem.textContent = label;
      batteryLifeLabelElem.setAttribute(
        "data-help",
        texts[currentLang].batteryLifeHelp
      );
    }
    if (runtimeAverageNoteElem) {
      runtimeAverageNoteElem.textContent =
        feedback.count > 4 ? texts[currentLang].runtimeAverageNote : '';
    }
    const batteriesNeeded = Math.ceil(10 / combinedRuntime + 1);
    batteryCountElem.textContent = batteriesNeeded.toString();
  } else {
    if (batteryLifeLabelElem) {
      batteryLifeLabelElem.textContent = texts[currentLang].batteryLifeLabel;
      batteryLifeLabelElem.setAttribute(
        "data-help",
        texts[currentLang].batteryLifeHelp
      );
    }
    if (runtimeAverageNoteElem) {
      runtimeAverageNoteElem.textContent = '';
    }
  }
  renderTemperatureNote(lastRuntimeHours);
  checkFizCompatibility();
  checkFizController();
  checkArriCompatibility();
  if (setupDiagramContainer) renderSetupDiagram();
}

function getCurrentSetupKey() {
  const camera = cameraSelect.value || '';
  const monitor = monitorSelect.value || '';
  const video = videoSelect.value || '';
  const motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None').sort().join(',');
  const controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None').sort().join(',');
  const distance = distanceSelect.value || '';
  const battery = batterySelect.value || '';
  const plate = getSelectedPlate() || '';
  return [camera, monitor, video, motors, controllers, distance, battery, plate].join('|');
}

function deleteFeedbackEntry(key, index) {
  const data = loadFeedbackSafe();
  if (data[key]) {
    data[key].splice(index, 1);
    if (!data[key].length) {
      delete data[key];
    }
    saveFeedbackSafe(data);
    updateCalculations();
  }
}

function renderFeedbackTable(currentKey) {
  const container = document.getElementById('feedbackTableContainer');
  const table = document.getElementById('userFeedbackTable');
  const data = loadFeedbackSafe();
  const entries = data[currentKey] || [];

  if (!entries.length) {
    if (table) {
      table.innerHTML = '';
      table.classList.add('hidden');
    }
    if (container) container.classList.add('hidden');
    return null;
  }

  const columns = [
    { key: 'username', label: 'User' },
    { key: 'date', label: 'Date' },
    { key: 'location', label: 'Location' },
    { key: 'cameraWifi', label: 'WIFI' },
    { key: 'resolution', label: 'Res' },
    { key: 'codec', label: 'Codec' },
    { key: 'framerate', label: 'FPS' },
    { key: 'firmware', label: 'Firmware' },
    { key: 'batteryAge', label: 'Battery Age' },
    { key: 'monitorBrightness', label: 'Monitor Brightness' },
    { key: 'temperature', label: 'temp' },
    { key: 'charging', label: 'Charging' },
    { key: 'runtime', label: 'runtime' },
    { key: 'batteriesPerDay', label: 'batteries a day' },
    { key: 'weighting', label: 'weight' }
  ];

  // Helper functions for weighting factors
  const parseResolution = str => {
    if (!str) return null;
    const s = String(str).toLowerCase();
    const kMatch = s.match(/(\d+(?:\.\d+)?)\s*k/);
    if (kMatch) return parseFloat(kMatch[1]) * 1000;
    const pMatch = s.match(/(\d{3,4})p/);
    if (pMatch) return parseInt(pMatch[1], 10);
    const xMatch = s.match(/x\s*(\d{3,4})/);
    if (xMatch) return parseInt(xMatch[1], 10);
    const numMatch = s.match(/(\d{3,4})/);
    return numMatch ? parseInt(numMatch[1], 10) : null;
  };
  const parseFramerate = str => {
    if (!str) return null;
    const m = String(str).match(/\d+(?:\.\d+)?/);
    return m ? parseFloat(m[0]) : null;
  };
  const tempFactor = temp => {
    if (Number.isNaN(temp)) return 1;
    if (temp >= 25) return 1;
    if (temp >= 0) return 1 + (25 - temp) * 0.01;
    if (temp >= -10) return 1.25 + (-temp) * 0.035;
    if (temp >= -20) return 1.6 + (-10 - temp) * 0.04;
    return 2;
  };

  const resolutionWeight = res => {
    if (res >= 12000) return 3;
    if (res >= 8000) return 2;
    if (res >= 4000) return 1.5;
    if (res >= 1080) return 1;
    return res / 1080;
  };

  const codecWeight = codec => {
    if (!codec) return 1;
    const c = String(codec).toLowerCase();
    if (
      /(prores\s*raw|braw|arriraw|r3d|redcode|cinema\s*dng|cdng|canon\s*raw|x-ocn|raw)/.test(c)
    )
      return 1;
    if (/prores/.test(c)) return 1.1;
    if (/dnx|avid/.test(c)) return 1.2;
    if (/\ball[\s-]?i\b|all\s*intra|intra/.test(c)) return 1.3;
    if (/h265|h\.265|hevc|xavc\s*hs|xhevc/.test(c)) return 1.7;
    if (/h264|h\.264|avc|xavc|avchd|mpeg-4/.test(c)) return 1.5;
    return 1;
  };

  const camPower = devices?.cameras?.[cameraSelect?.value]?.powerDrawWatts || 0;
  const monitorPower = devices?.monitors?.[monitorSelect?.value]?.powerDrawWatts || 0;
  const videoPower = devices?.video?.[videoSelect?.value]?.powerDrawWatts || 0;
  const motorPower = motorSelects.reduce(
    (sum, sel) => sum + (devices?.fiz?.motors?.[sel.value]?.powerDrawWatts || 0),
    0
  );
  const controllerPower = controllerSelects.reduce(
    (sum, sel) => sum + (devices?.fiz?.controllers?.[sel.value]?.powerDrawWatts || 0),
    0
  );
  const distancePower = devices?.fiz?.distance?.[distanceSelect?.value]?.powerDrawWatts || 0;
  const otherPower = videoPower + motorPower + controllerPower + distancePower;
  const totalPower = camPower + monitorPower + otherPower;
  const specBrightness = devices?.monitors?.[monitorSelect?.value]?.brightnessNits;

  let weightedSum = 0;
  let weightTotal = 0;
  let count = 0;
  const breakdown = entries.map(e => {
    const rt = parseFloat(e.runtime);
    if (Number.isNaN(rt)) return null;

    let camFactor = 1;
    let monitorFactor = 1;

    const res = parseResolution(e.resolution);
    if (res) camFactor *= resolutionWeight(res);

    const fps = parseFramerate(e.framerate);
    if (fps) camFactor *= fps / 24;

    const wifi = (e.cameraWifi || '').toLowerCase();
    if (wifi.includes('on')) camFactor *= 1.1;

    const codec = e.codec;
    if (codec) camFactor *= codecWeight(codec);

    const entryBrightness = parseFloat(e.monitorBrightness);
    if (!Number.isNaN(entryBrightness) && specBrightness) {
      const ratio = entryBrightness / specBrightness;
      if (ratio < 1) monitorFactor *= ratio;
    }

    let weight = 1;
    if (totalPower > 0) {
      weight =
        (camFactor * camPower + monitorFactor * monitorPower + otherPower) /
        totalPower;
    }

    const temp = parseFloat(e.temperature);
    const tempMul = tempFactor(temp);
    const adjustedRuntime = rt * tempMul;

    weightedSum += adjustedRuntime * weight;
    weightTotal += weight;
    count++;

    return {
      temperature: tempMul,
      resolution: res ? resolutionWeight(res) : 1,
      framerate: fps ? fps / 24 : 1,
      wifi: wifi.includes('on') ? 1.1 : 1,
      codec: codec ? codecWeight(codec) : 1,
      monitor: monitorFactor,
      weight
    };
  });

  const maxWeight = Math.max(...breakdown.filter(Boolean).map(b => b.weight), 0);
  let html = '<tr>' + columns.map(c => `<th>${escapeHtml(c.label)}</th>`).join('') + '<th></th></tr>';
  entries.forEach((entry, index) => {
    html += '<tr>';
    columns.forEach(c => {
      if (c.key === 'weighting') {
        const b = breakdown[index];
        if (b) {
          const percent = maxWeight ? (b.weight / maxWeight) * 100 : 0;
          const share = b.weight * 100;
          const tooltip =
            `Temp ×${b.temperature.toFixed(2)}\n` +
            `Res ×${b.resolution.toFixed(2)}\n` +
            `FPS ×${b.framerate.toFixed(2)}\n` +
            `Codec ×${b.codec.toFixed(2)}\n` +
            `Wi-Fi ×${b.wifi.toFixed(2)}\n` +
            `Monitor ×${b.monitor.toFixed(2)}\n` +
            `Share ${share.toFixed(1)}%`;
          html +=
            `<td><div class="weightingRow"><div class="barContainer"><div class="weightBar" style="width:${percent}%" title="${escapeHtml(tooltip)}"></div></div><span class="weightingPercent">${share.toFixed(1)}%</span></div></td>`;
        } else {
          html += '<td></td>';
        }
      } else {
        html += `<td>${escapeHtml(entry[c.key] || '')}</td>`;
      }
    });
    html += `<td><button data-key="${encodeURIComponent(currentKey)}" data-index="${index}" class="deleteFeedbackBtn">Delete</button></td>`;
    html += '</tr>';
  });
  table.innerHTML = html;
  table.classList.remove('hidden');
  if (container) container.classList.remove('hidden');
  table.querySelectorAll('.deleteFeedbackBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = decodeURIComponent(btn.dataset.key);
      const idx = parseInt(btn.dataset.index, 10);
      deleteFeedbackEntry(key, idx);
    });
  });

  if (count >= 3 && weightTotal > 0) {
    return { runtime: weightedSum / weightTotal, count, weight: weightTotal };
  }
  return null;
}

// Determine differences between the default device database and the current
// in-memory `devices` object. Only changed, added or removed entries are
// returned so they can be shared in a generated link.
function getDeviceChanges() {
  if (!window.defaultDevices) return {};
  const diff = {};
  const record = (cat, name, val, sub) => {
    if (sub) {
      diff.fiz = diff.fiz || {};
      diff.fiz[sub] = diff.fiz[sub] || {};
      diff.fiz[sub][name] = val;
    } else {
      diff[cat] = diff[cat] || {};
      diff[cat][name] = val;
    }
  };
  const compare = (cat, defCat, curCat, sub) => {
    Object.keys(curCat).forEach(name => {
      const cur = curCat[name];
      const def = defCat[name];
      if (!def || JSON.stringify(cur) !== JSON.stringify(def)) {
        record(cat, name, cur, sub);
      }
    });
    Object.keys(defCat).forEach(name => {
      if (!curCat[name]) record(cat, name, null, sub);
    });
  };
  compare('cameras', window.defaultDevices.cameras || {}, devices.cameras || {});
  compare('monitors', window.defaultDevices.monitors || {}, devices.monitors || {});
  compare('video', window.defaultDevices.video || {}, devices.video || {});
  compare('batteries', window.defaultDevices.batteries || {}, devices.batteries || {});
  ['motors', 'controllers', 'distance'].forEach(sub => {
    const defCat = window.defaultDevices.fiz ? (window.defaultDevices.fiz[sub] || {}) : {};
    const curCat = devices.fiz ? (devices.fiz[sub] || {}) : {};
    compare('fiz', defCat, curCat, sub);
    if (diff.fiz && diff.fiz[sub] && !Object.keys(diff.fiz[sub]).length) {
      delete diff.fiz[sub];
    }
  });
  if (diff.fiz && !Object.keys(diff.fiz).length) delete diff.fiz;
  Object.keys(diff).forEach(cat => {
    if (cat !== 'fiz' && !Object.keys(diff[cat]).length) delete diff[cat];
  });
  return diff;
}

// Apply a set of device changes to the current in-memory database and update
// all related UI elements and localStorage. `changes` mirrors the structure
// returned by getDeviceChanges().
function applyDeviceChanges(changes) {
  if (!changes || typeof changes !== 'object') return;

  const applyToCategory = (target, delta) => {
    Object.keys(delta).forEach(name => {
      const val = delta[name];
      if (val === null) {
        delete target[name];
      } else {
        target[name] = val;
      }
    });
  };

  Object.keys(changes).forEach(cat => {
    if (cat === 'fiz') {
      Object.keys(changes.fiz || {}).forEach(sub => {
        devices.fiz[sub] = devices.fiz[sub] || {};
        applyToCategory(devices.fiz[sub], changes.fiz[sub]);
      });
    } else {
      devices[cat] = devices[cat] || {};
      applyToCategory(devices[cat], changes[cat]);
    }
  });

  unifyDevices(devices);
  storeDevices(devices);
  refreshDeviceLists();

  // Re-populate dropdowns to include any newly added devices
  populateSelect(cameraSelect, devices.cameras, true);
  populateSelect(monitorSelect, devices.monitors, true);
  populateSelect(videoSelect, devices.video, true);
  motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
  controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
  populateSelect(distanceSelect, devices.fiz.distance, true);
  populateSelect(batterySelect, devices.batteries, true);

  updateFizConnectorOptions();
  updateMotorConnectorOptions();
  updateControllerConnectorOptions();
  updateControllerPowerOptions();
  updateControllerBatteryOptions();
  updateControllerConnectivityOptions();
  updateDistanceConnectionOptions();
  updateDistanceMethodOptions();
  updateDistanceDisplayOptions();
}

function renderSetupDiagram() {
  if (!setupDiagramContainer) return;

  const camName = cameraSelect.value;
  const cam = devices.cameras[camName];
  const monitorName = monitorSelect.value;
  const monitor = devices.monitors[monitorName];
  const videoName = videoSelect.value;
  const video = devices.video[videoName];
  const batteryName = batterySelect.value;

  const distanceName = distanceSelect.value;

  let motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
  motors.sort((a, b) => motorPriority(a) - motorPriority(b));
  const internalIdx = motors.findIndex(name => devices.fiz?.motors?.[name]?.internalController);
  const hasInternalMotor = internalIdx !== -1;
  if (hasInternalMotor && internalIdx > 0) {
    const [m] = motors.splice(internalIdx, 1);
    motors.unshift(m);
  }
  let controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
  controllers.sort((a, b) => controllerPriority(a) - controllerPriority(b));

  const inlineControllers = controllers;

  const nodes = [];
  const pos = {};
  const nodeMap = {};
  const step = 300; // extra spacing for edge labels
  const VIDEO_LABEL_SPACING = 10;
  const baseY = 220;
  let x = 80;

  if (batteryName && batteryName !== 'None') {
    let batteryLabel = batteryName;
    const battMount = devices.batteries[batteryName]?.mount_type;
    if (cam && battMount && cam.power?.batteryPlateSupport?.some(bp => bp.type === battMount && bp.mount === 'native')) {
      batteryLabel += ` on native ${battMount} plate via Pins`;
    }
    pos.battery = { x, y: baseY, label: batteryLabel };
    nodes.push('battery');
    nodeMap.battery = { category: 'batteries', name: batteryName };
    x += step;
  }

  if (camName && camName !== 'None') {
    pos.camera = { x, y: baseY, label: camName };
    nodes.push('camera');
    nodeMap.camera = { category: 'cameras', name: camName };
    x += step;
  }

  const controllerIds = controllers.map((_, idx) => `controller${idx}`);
  const motorIds = motors.map((_, idx) => `motor${idx}`);

  const hasMainCtrl = controllers.some(n => controllerPriority(n) === 0);
  let useMotorFirst = (!hasMainCtrl && hasInternalMotor) ||
    (!controllerIds.length && motorIds.length && motorPriority(motors[0]) === 0);

  const addNode = (id, category, label) => {
    pos[id] = { x, y: baseY, label };
    nodes.push(id);
    nodeMap[id] = { category, name: label };
    x += step;
  };

  if (useMotorFirst && motorIds.length) {
    addNode(motorIds[0], 'fiz.motors', motors[0]);
    controllerIds.forEach((id, idx) => {
      addNode(id, 'fiz.controllers', inlineControllers[idx]);
    });
    motorIds.slice(1).forEach((id, idx) => {
      addNode(id, 'fiz.motors', motors[idx + 1]);
    });
  } else {
    controllerIds.forEach((id, idx) => {
      addNode(id, 'fiz.controllers', inlineControllers[idx]);
    });
    motorIds.forEach((id, idx) => {
      addNode(id, 'fiz.motors', motors[idx]);
    });
  }

  if (monitorName && monitorName !== 'None') {
    pos.monitor = { x: pos.camera ? pos.camera.x : 60, y: baseY - step, label: monitorName };
    nodes.push('monitor');
    nodeMap.monitor = { category: 'monitors', name: monitorName };
  }
  if (videoName && videoName !== 'None') {
    pos.video = { x: pos.camera ? pos.camera.x : 60, y: baseY + step, label: videoName };
    nodes.push('video');
    nodeMap.video = { category: 'video', name: videoName };
  }

  let inlineDistance = false;
  let dedicatedDistance = false;
  if (distanceName && distanceName !== 'None') {
    const attach = inlineControllers.length ? controllerIds[0] : motorIds[0];
    if (attach) {
      const arriDevices = [...inlineControllers, ...motors].some(n => isArri(n));
      const hasDedicatedPort = inlineControllers.some(n => /RIA-1/i.test(n) || /UMC-4/i.test(n));
      dedicatedDistance = hasDedicatedPort && arriDevices;
      inlineDistance = arriDevices && !hasDedicatedPort && inlineControllers.length;
      if (inlineDistance && motorIds.length) {
        const nextId = motorIds[0];
        pos.distance = { x: (pos[attach].x + pos[nextId].x) / 2, y: baseY - step, label: distanceName };
      } else {
        pos.distance = { x: pos[attach].x, y: baseY - step, label: distanceName };
      }
      nodes.push('distance');
    nodeMap.distance = { category: 'fiz.distance', name: distanceName };
    }
  }

  // Apply any manually moved node positions and cleanup
  Object.keys(manualPositions).forEach(id => { if (!pos[id]) delete manualPositions[id]; });
  Object.entries(pos).forEach(([id, p]) => {
    if (manualPositions[id]) {
      p.x = manualPositions[id].x;
      p.y = manualPositions[id].y;
    }
  });

  let firstFizId;
  if (hasInternalMotor && motorIds.length && !hasMainCtrl) {
    firstFizId = motorIds[0];
  } else {
    firstFizId = controllerIds.length ? controllerIds[0] : motorIds[0];
  }

  // Determine node heights and widths based on label length so text fits inside
  const DEFAULT_NODE_H = 80;
  const DEFAULT_NODE_W = 160;
  const nodeHeights = {};
  const nodeWidths = {};
  nodes.forEach(id => {
    const label = pos[id].label || id;
    const lines = wrapLabel(label);
    // Extra space if an icon is shown
    const hasIcon = diagramIcons[id] || id.startsWith('controller') || id.startsWith('motor');
    nodeHeights[id] = Math.max(
      DEFAULT_NODE_H,
      lines.length * 12 + (hasIcon ? 30 : 20)
    );
    const longest = lines.reduce((m, l) => Math.max(m, l.length), 0);
    nodeWidths[id] = Math.max(DEFAULT_NODE_W, longest * 9 + 20);
  });
  const NODE_W = Math.max(...Object.values(nodeWidths), DEFAULT_NODE_W);
  const NODE_H = Math.max(...Object.values(nodeHeights), DEFAULT_NODE_H);
  const getNodeHeight = id => nodeHeights[id] || NODE_H;

  let viewWidth;

  let chain = [];
  const edges = [];
  const usedConns = {};
  const markUsed = (id, side) => { usedConns[`${id}|${side}`] = true; };
  const isUsed = (id, side) => usedConns[`${id}|${side}`];
  const pushEdge = (edge, type) => {
    if (!edge.fromSide || !edge.toSide) {
      const pair = closestConnectorPair(edge.from, edge.to, usedConns);
      if (pair) {
        if (!edge.fromSide) edge.fromSide = pair.fromSide;
        if (!edge.toSide) edge.toSide = pair.toSide;
      }
    } else {
      if (isUsed(edge.from, edge.fromSide) || isUsed(edge.to, edge.toSide)) return;
    }
    markUsed(edge.from, edge.fromSide);
    markUsed(edge.to, edge.toSide);
    edges.push({ ...edge, type });
  };
  const battMount = devices.batteries[batteryName]?.mount_type;
  if (cam && batteryName && batteryName !== 'None') {
    const plateType = getSelectedPlate();
    const nativePlate = plateType && isSelectedPlateNative(camName);
    const camPort = firstPowerInputType(cam);
    const inLabel = camPort || plateType;
    const label = nativePlate ? '' : formatConnLabel(battMount, inLabel);
    pushEdge({ from: 'battery', to: 'camera', label, fromSide: 'right', toSide: 'left' }, 'power');
  }
  if (monitor && firstPowerInputType(monitor)) {
    const mPort = firstPowerInputType(monitor);
    if (batteryName && batteryName !== 'None') {
      pushEdge({ from: 'battery', to: 'monitor', label: formatConnLabel(battMount, mPort), fromSide: 'top', toSide: 'left' }, 'power');
    }
  }
  if (video && firstPowerInputType(video)) {
    const pPort = firstPowerInputType(video);
    if (batteryName && batteryName !== 'None') {
      pushEdge({ from: 'battery', to: 'video', label: formatConnLabel(battMount, pPort), fromSide: 'bottom', toSide: 'left' }, 'power');
    }
  }
  if (cam && cam.videoOutputs?.length) {
    const camOut = cam.videoOutputs[0].type;
    const monInObj = monitor && (monitor.video?.inputs?.[0] || monitor.videoInputs?.[0]);
    const vidInObj = video && (video.videoInputs?.[0] || (video.video ? video.video.inputs[0] : null));
    if (monitor && monInObj) {
      const monIn = monInObj.portType || monInObj.type || monInObj;
      pushEdge({ from: 'camera', to: 'monitor', label: connectionLabel(camOut, monIn), fromSide: 'top', toSide: 'bottom', labelSpacing: VIDEO_LABEL_SPACING }, 'video');
    }
    if (video && vidInObj) {
      const vidIn = vidInObj.portType || vidInObj.type || vidInObj;
      pushEdge({ from: 'camera', to: 'video', label: connectionLabel(camOut, vidIn), fromSide: 'bottom', toSide: 'top', labelSpacing: VIDEO_LABEL_SPACING }, 'video');
    }
  }
  useMotorFirst = (!hasMainCtrl && hasInternalMotor) ||
    (!controllerIds.length && motorIds.length && motorPriority(motors[0]) === 0);
  const distanceSelected = distanceName && distanceName !== 'None';
  const distanceInChain = distanceSelected && !dedicatedDistance;

  let firstController = false;
  let firstMotor = false;

  if (useMotorFirst && motorIds.length) {
    chain.push(motorIds[0]);
    firstMotor = true;
  } else if (controllerIds.length) {
    chain.push(controllerIds[0]);
    firstController = true;
  } else if (motorIds.length) {
    chain.push(motorIds[0]);
    firstMotor = true;
  }

  if (distanceInChain) chain.push('distance');

  if (controllerIds.length) chain = chain.concat(controllerIds.slice(firstController ? 1 : 0));
  if (motorIds.length) chain = chain.concat(motorIds.slice(firstMotor ? 1 : 0));

  if (cam && chain.length) {
    let first = chain[0];
    if (first === 'distance' && chain.length > 1 && (controllerIds.length || hasInternalMotor)) {
      first = chain[1];
    }
    let firstName = null;
    if (first.startsWith('controller')) {
      const idx = controllerIds.indexOf(first);
      firstName = inlineControllers[idx] || controllers[idx];
    } else if (first.startsWith('motor')) {
      const idx = motorIds.indexOf(first);
      firstName = motors[idx];
    }
    const port = first === 'distance' ? 'LBUS' : controllerCamPort(firstName);
    const camPort = cameraFizPort(camName, port, firstName);
    pushEdge({ from: 'camera', to: first, label: formatConnLabel(camPort, port), noArrow: true }, 'fiz');
  } else if (motorIds.length && cam) {
    const camPort = cameraFizPort(camName, motorFizPort(motors[0]), motors[0]);
    pushEdge({ from: 'camera', to: motorIds[0], label: formatConnLabel(camPort, motorFizPort(motors[0])), noArrow: true }, 'fiz');
  }

  for (let i = 0; i < chain.length - 1; i++) {
    const a = chain[i];
    const b = chain[i + 1];
    let fromName = null, toName = null;
    if (a.startsWith('controller')) fromName = inlineControllers[controllerIds.indexOf(a)] || controllers[controllerIds.indexOf(a)];
    else if (a.startsWith('motor')) fromName = motors[motorIds.indexOf(a)];
    if (b.startsWith('controller')) toName = inlineControllers[controllerIds.indexOf(b)] || controllers[controllerIds.indexOf(b)];
    else if (b.startsWith('motor')) toName = motors[motorIds.indexOf(b)];
    pushEdge({ from: a, to: b, label: formatConnLabel(fizPort(fromName), fizPort(toName)), noArrow: true }, 'fiz');
  }



  if (dedicatedDistance && controllerIds.length && distanceSelected) {
    const ctrlName = inlineControllers[0] || controllers[0];
    const distPort = controllerDistancePort(ctrlName);
    const portLabel = formatConnLabel(fizPort(ctrlName), distPort);
    pushEdge({ from: controllerIds[0], to: 'distance', label: portLabel, noArrow: true, toSide: 'bottom-right' }, 'fiz');
  }


  const fizList = [];
  controllerIds.forEach((id, idx) => {
    fizList.push({ id, name: inlineControllers[idx] || controllers[idx] });
  });
  motorIds.forEach((id, idx) => {
    fizList.push({ id, name: motors[idx] });
  });

  const isMainCtrl = name => /RIA-1/i.test(name) || /UMC-4/i.test(name) || /cforce.*rf/i.test(name);
  let powerTarget = null;
  const main = fizList.find(d => isMainCtrl(d.name));
  if (main) {
    powerTarget = main;
  } else {
    powerTarget = fizList.find(d => fizNeedsPower(d.name));
  }

  if (powerTarget && fizNeedsPower(powerTarget.name)) {
    const { id: fizId, name } = powerTarget;
    const powerSrc = batteryName && batteryName !== 'None' ? 'battery' : null;
    const label = formatConnLabel('D-Tap', fizPowerPort(name));
    const skipBatt = isArri(camName) && isArriOrCmotion(name);
    if (powerSrc && !skipBatt) {
      pushEdge({
        from: powerSrc,
        to: fizId,
        label,
        fromSide: 'bottom-left',
        toSide: 'bottom',
        route: 'down-right-up'
      }, 'power');
    }
  }
  if (nodes.length === 0) {
    setupDiagramContainer.innerHTML = `<p class="diagram-placeholder">${texts[currentLang].setupDiagramPlaceholder}</p>`;
    return;
  }

  const xs = Object.values(pos).map(p => p.x);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const contentWidth = maxX - minX;
  viewWidth = Math.max(500, contentWidth + NODE_W);
  let shiftX = 0;
  if (Object.keys(manualPositions).length === 0) {
    shiftX = viewWidth / 2 - (minX + maxX) / 2;
    Object.values(pos).forEach(p => { p.x += shiftX; });
  }

  const ys = Object.values(pos).map(p => p.y);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const viewHeight = (maxY - minY) + NODE_H + 120;

  function computePath(fromId, toId, labelSpacing = 0, opts = {}) {
    const from = connectorPos(fromId, opts.fromSide);
    const to = connectorPos(toId, opts.toSide);
    let path, lx, ly, angle = 0;

    if (opts.route === 'down-right-up') {
      const bottomY = maxY + NODE_H;
      path = `M ${from.x} ${from.y} V ${bottomY} H ${to.x} V ${to.y}`;
      lx = (from.x + to.x) / 2;
      ly = bottomY - 6 - labelSpacing;
    } else {
      path = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      angle = Math.atan2(dy, dx) * 180 / Math.PI;
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;
      const len = Math.hypot(dx, dy) || 1;
      let off = 8 + labelSpacing;
      if (Math.abs(dx) < Math.abs(dy)) {
        off = 4 + labelSpacing;
      }
      const perpX = (dy / len) * off;
      const perpY = (-dx / len) * off;
      lx = midX + perpX;
      ly = midY + perpY;
    }

    return { path, labelX: lx, labelY: ly, angle };
  }

  function wrapLabel(text, maxLen = 16) {
    const words = text.split(' ');
    const lines = [];
    let line = '';
    words.forEach(w => {
      if ((line + ' ' + w).trim().length > maxLen && line) {
        lines.push(line.trim());
        line = w;
      } else {
        line += ` ${w}`;
      }
    });
    if (line.trim()) lines.push(line.trim());
    return lines;
  }

  let svg = `<svg viewBox="0 ${minY - NODE_H/2 - 20} ${viewWidth} ${viewHeight}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<defs>
    <linearGradient id="firstFizGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#090" />
      <stop offset="100%" stop-color="#d33" />
    </linearGradient>
  </defs>`;
  svg += `<g id="diagramRoot">`;

  edges.forEach(e => {
    if (!pos[e.from] || !pos[e.to]) return;
    const { path, labelX, labelY, angle } = computePath(e.from, e.to, e.labelSpacing || 0, e);
    if (!path) return;
    const cls = e.type ? `edge-path ${e.type}` : 'edge-path';
    svg += `<path class="${cls}" d="${path}" />`;
    if (e.label) {
      const rot = ` transform="rotate(${angle} ${labelX} ${labelY})"`;
      svg += `<text class="edge-label" x="${labelX}" y="${labelY}" text-anchor="middle" dominant-baseline="middle"${rot}>${escapeHtml(e.label)}</text>`;
    }
  });


  function connectorsFor(id) {
    switch (id) {
      case 'battery':
        return [
          { side: 'top', color: 'red' },
          { side: 'right', color: 'red' },
          { side: 'bottom', color: 'red' },
          { side: 'bottom-left', color: 'red' }
        ];
      case 'monitor':
        return [
          { side: 'left', color: 'red' },
          { side: 'bottom', color: 'blue' }
        ];
      case 'video':
        return [
          { side: 'left', color: 'red' },
          { side: 'top', color: 'blue' }
        ];
      case 'camera':
        return [
          { side: 'left', color: 'red' },
          { side: 'top', color: 'blue' },
          { side: 'bottom', color: 'blue' },
          { side: 'right', color: 'green' }
        ];
      case 'distance':
        return [
          { side: 'bottom', color: 'green' },
          { side: 'bottom-right', color: 'green' }
        ];
      default:
        if (id.startsWith('controller') || id.startsWith('motor')) {
          if (firstFizId && id === firstFizId) {
            return [
              { side: 'top', color: 'green' },
              { side: 'left', color: 'green' },
              { side: 'right', color: 'green' },
              { side: 'bottom', color: 'red' }
            ];
          }
          return [
            { side: 'left', color: 'green' },
            { side: 'right', color: 'green' }
          ];
        }
    }
    return [];
  }

  function connectorPos(nodeId, side) {
    const p = pos[nodeId];
    if (!p) return { x: 0, y: 0 };
    const h = getNodeHeight(nodeId);
    switch (side) {
      case 'top':
        return { x: p.x, y: p.y - h / 2 };
      case 'bottom':
        return { x: p.x, y: p.y + h / 2 };
      case 'bottom-left':
        return { x: p.x - NODE_W / 2 + NODE_W / 3, y: p.y + h / 2 };
      case 'bottom-right':
        return { x: p.x + NODE_W / 2 - NODE_W / 3, y: p.y + h / 2 };
      case 'left':
        return { x: p.x - NODE_W / 2, y: p.y };
      case 'right':
        return { x: p.x + NODE_W / 2, y: p.y };
      default:
        return { x: p.x, y: p.y };
    }
  }

  function closestConnectorPair(idA, idB, used = {}) {
    const aConns = connectorsFor(idA);
    const bConns = connectorsFor(idB);
    let best = null;
    let bestDist = Infinity;
    aConns.forEach(ac => {
      if (used[`${idA}|${ac.side}`]) return;
      const ap = connectorPos(idA, ac.side);
      bConns.forEach(bc => {
        if (ac.color !== bc.color) return;
        if (used[`${idB}|${bc.side}`]) return;
        const bp = connectorPos(idB, bc.side);
        const d = Math.hypot(ap.x - bp.x, ap.y - bp.y);
        if (d < bestDist) {
          bestDist = d;
          best = { fromSide: ac.side, toSide: bc.side };
        }
      });
    });
    return best;
  }

  nodes.forEach(id => {
    const p = pos[id];
    if (!p) return;
    const h = getNodeHeight(id);
    const nodeCls = id === firstFizId ? 'diagram-node first-fiz' : 'diagram-node';
    const rectCls = id === firstFizId ? 'node-box first-fiz' : 'node-box';
    svg += `<g class="${nodeCls}" data-node="${id}">`;
    svg += `<rect class="${rectCls}" x="${p.x - NODE_W/2}" y="${p.y - h/2}" width="${NODE_W}" height="${h}" rx="4" ry="4" />`;
    if (id === firstFizId) {
      const xLeft = p.x - NODE_W / 2;
      const yBottom = p.y + h / 2;
      const r = 4;
      const highlight = `M ${xLeft} ${p.y} L ${xLeft} ${yBottom - r} A ${r} ${r} 0 0 1 ${xLeft + r} ${yBottom} L ${p.x} ${yBottom}`;
      svg += `<path class="first-fiz-highlight" d="${highlight}" />`;
    }

    const conns = connectorsFor(id);
    conns.forEach(c => {
      let cx = p.x, cy = p.y;
      if (c.side === 'top') { cx = p.x; cy = p.y - h / 2; }
      else if (c.side === 'bottom') { cx = p.x; cy = p.y + h / 2; }
      else if (c.side === 'bottom-left') { cx = p.x - NODE_W / 2 + NODE_W / 3; cy = p.y + h / 2; }
      else if (c.side === 'bottom-right') { cx = p.x + NODE_W / 2 - NODE_W / 3; cy = p.y + h / 2; }
      else if (c.side === 'left') { cx = p.x - NODE_W / 2; cy = p.y; }
      else if (c.side === 'right') { cx = p.x + NODE_W / 2; cy = p.y; }
      svg += `<circle class="conn ${c.color}" cx="${cx}" cy="${cy}" r="4" />`;
    });

    let icon = diagramIcons[id];
    if (!icon) {
      if (id.startsWith('motor')) {
        icon = diagramIcons.motors;
      } else if (id.startsWith('controller')) {
        const name = (nodeMap[id]?.name || '').toLowerCase();
        if (/handle|grip/.test(name)) icon = diagramIcons.handle;
        else icon = diagramIcons.controllers;
      } else if (id === 'distance') {
        icon = diagramIcons.distance;
      }
    }

    const lines = wrapLabel(p.label || id);

    if (icon) {
      svg += `<text class="node-icon" x="${p.x}" y="${p.y - 10}" text-anchor="middle" dominant-baseline="middle">${icon}</text>`;
      svg += `<text x="${p.x}" y="${p.y + 14}" text-anchor="middle" font-size="10">`;
      lines.forEach((line, i) => { svg += `<tspan x="${p.x}" dy="${i === 0 ? 0 : 12}">${escapeHtml(line)}</tspan>`; });
      svg += `</text>`;
    } else {
      svg += `<text x="${p.x}" y="${p.y}" text-anchor="middle" dominant-baseline="middle" font-size="12">`;
      lines.forEach((line, i) => { svg += `<tspan x="${p.x}" dy="${i === 0 ? 0 : 12}">${escapeHtml(line)}</tspan>`; });
      svg += `</text>`;
    }
    svg += `</g>`;
  });

  svg += '</g></svg>';
  let popup = document.getElementById('diagramPopup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'diagramPopup';
    popup.className = 'diagram-popup';
  }
  setupDiagramContainer.innerHTML = '';
  setupDiagramContainer.appendChild(popup);
  setupDiagramContainer.insertAdjacentHTML('beforeend', svg);

  lastDiagramPositions = JSON.parse(JSON.stringify(pos));

  attachDiagramPopups(nodeMap);

  enableDiagramInteractions();

}

function attachDiagramPopups(map) {
  if (!setupDiagramContainer) return;
  const popup = document.getElementById('diagramPopup');
  if (!popup) return;
  popup.style.display = 'none';

  setupDiagramContainer.querySelectorAll('.diagram-node').forEach(node => {
    const id = node.getAttribute('data-node');
    const info = map[id];
    if (!info) return;
    let data;
    if (info.category === 'fiz.controllers') {
      data = devices.fiz?.controllers?.[info.name];
    } else if (info.category === 'fiz.motors') {
      data = devices.fiz?.motors?.[info.name];
    } else if (info.category === 'fiz.distance') {
      data = devices.fiz?.distance?.[info.name];
    } else {
      data = devices[info.category]?.[info.name];
    }
    const connectors = data ? generateConnectorSummary(data) : '';
    const infoHtml =
      (data && data.latencyMs ?
        `<div class="info-box video-conn"><strong>Latency:</strong> ${escapeHtml(String(data.latencyMs))}</div>` : '') +
      (data && data.frequency ?
        `<div class="info-box video-conn"><strong>Frequency:</strong> ${escapeHtml(String(data.frequency))}</div>` : '');
    const html = `<strong>${escapeHtml(info.name)}</strong>` +
      connectors + infoHtml;

    const show = e => {
      popup.innerHTML = html;
      popup.style.display = 'block';
      const rect = setupDiagramContainer.getBoundingClientRect();
      popup.style.left = `${e.clientX - rect.left + 10}px`;
      popup.style.top = `${e.clientY - rect.top + 10}px`;
    };
    const hide = () => { popup.style.display = 'none'; };
    node.addEventListener('mousemove', show);
    node.addEventListener('mouseout', hide);
  });
}

function enableDiagramInteractions() {
  if (!setupDiagramContainer) return;
  const svg = setupDiagramContainer.querySelector('svg');
  if (!svg) return;

  if (cleanupDiagramInteractions) cleanupDiagramInteractions();

  const root = svg.querySelector('#diagramRoot') || svg;
  let pan = { x: 0, y: 0 };
  let scale = 1;
  let panning = false;
  let panStart = { x: 0, y: 0 };
  const apply = () => {
    root.setAttribute('transform', `translate(${pan.x},${pan.y}) scale(${scale})`);
  };
  if (zoomInBtn) {
    zoomInBtn.onclick = () => {
      scale *= 1.1;
      apply();
    };
  }
  if (zoomOutBtn) {
    zoomOutBtn.onclick = () => {
      scale *= 0.9;
      apply();
    };
  }
  if (resetViewBtn) {
    resetViewBtn.onclick = () => {
      pan = { x: 0, y: 0 };
      scale = 1;
      apply();
    };
  }
  const onSvgMouseDown = e => {
    if (e.target.closest('.diagram-node')) return;
    panning = true;
    panStart = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };
  const onPanMove = e => {
    if (!panning) return;
    pan.x = e.clientX - panStart.x;
    pan.y = e.clientY - panStart.y;
    apply();
  };
  const stopPanning = () => { panning = false; };

  let dragId = null;
  let dragStart = null;
  let dragNode = null;
  const onDragStart = e => {
    const node = e.target.closest('.diagram-node');
    if (!node) return;
    dragId = node.getAttribute('data-node');
    dragNode = node;
    dragStart = { x: e.clientX, y: e.clientY };
    e.stopPropagation();
  };
  const onDragMove = e => {
    if (!dragId) return;
    const start = lastDiagramPositions[dragId];
    if (!start) return;
    const dx = (e.clientX - dragStart.x) / scale;
    const dy = (e.clientY - dragStart.y) / scale;
    let newX = start.x + dx;
    let newY = start.y + dy;
    if (gridSnap) {
      const g = 20 / scale;
      newX = Math.round(newX / g) * g;
      newY = Math.round(newY / g) * g;
    }
    const tx = newX - start.x;
    const ty = newY - start.y;
    if (dragNode) dragNode.setAttribute('transform', `translate(${tx},${ty})`);
  };
  const onDragEnd = e => {
    if (!dragId) return;
    const start = lastDiagramPositions[dragId];
    if (start) {
      const dx = (e.clientX - dragStart.x) / scale;
      const dy = (e.clientY - dragStart.y) / scale;
      let newX = start.x + dx;
      let newY = start.y + dy;
      if (gridSnap) {
        const g = 20 / scale;
        newX = Math.round(newX / g) * g;
        newY = Math.round(newY / g) * g;
      }
      manualPositions[dragId] = { x: newX, y: newY };
    }
    dragId = null;
    dragNode = null;
    renderSetupDiagram();
  };

  svg.addEventListener('mousedown', onSvgMouseDown);
  window.addEventListener('mousemove', onPanMove);
  window.addEventListener('mouseup', stopPanning);
  svg.addEventListener('mousedown', onDragStart);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);

  cleanupDiagramInteractions = () => {
    svg.removeEventListener('mousedown', onSvgMouseDown);
    window.removeEventListener('mousemove', onPanMove);
    window.removeEventListener('mouseup', stopPanning);
    svg.removeEventListener('mousedown', onDragStart);
    window.removeEventListener('mousemove', onDragMove);
    window.removeEventListener('mouseup', onDragEnd);
  };
}

function updateDiagramLegend() {
  if (!diagramLegend) return;
  diagramLegend.innerHTML =
    `<span><span class="swatch power"></span>${texts[currentLang].diagramLegendPower}</span>` +
    `<span><span class="swatch video"></span>${texts[currentLang].diagramLegendVideo}</span>` +
    `<span><span class="swatch fiz"></span>${texts[currentLang].diagramLegendFIZ}</span>`;
}

// Convert a camelCase or underscore key to a human friendly label
function humanizeKey(key) {
  const map = {
    powerDrawWatts: 'Power (W)',
    capacity: 'Capacity (Wh)',
    pinA: 'Pin A',
    dtapA: 'D-Tap A',
    mount_type: 'Mount',
    screenSizeInches: 'Screen Size (in)',
    brightnessNits: 'Brightness (nits)',
    torqueNm: 'Torque (Nm)',
    internalController: 'Internal Controller',
    power_source: 'Power Source',
    battery_type: 'Battery Type',
    connectivity: 'Connectivity'
  };
  if (map[key]) return map[key];
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase());
}

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.map((v) => formatValue(v)).join('; ');
  }
  if (value && typeof value === 'object') {
    const parts = [];
    for (const k in value) {
      if (value[k] === '' || value[k] === null || value[k] === undefined) continue;
      parts.push(`${humanizeKey(k)}: ${formatValue(value[k])}`);
    }
    return `{ ${parts.join(', ')} }`;
  }
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}

function createDeviceDetailsList(deviceData) {
  const list = document.createElement('ul');
  list.className = 'device-detail-list';

  const appendItem = (key, value, parent) => {
    if (value === '' || value === null || value === undefined) return;
    const li = document.createElement('li');
    const label = document.createElement('strong');
    label.textContent = humanizeKey(key) + ':';
    li.appendChild(label);

    if (Array.isArray(value)) {
      if (value.length && typeof value[0] === 'object') {
        const subList = document.createElement('ul');
        subList.className = 'device-detail-list';
        value.forEach((v) => {
          const subLi = document.createElement('li');
          subLi.appendChild(createDeviceDetailsList(v));
          subList.appendChild(subLi);
        });
        li.appendChild(subList);
      } else {
        li.appendChild(document.createTextNode(value.map((v) => formatValue(v)).join(', ')));
      }
    } else if (value && typeof value === 'object') {
      li.appendChild(createDeviceDetailsList(value));
    } else {
      li.appendChild(document.createTextNode(formatValue(value)));
    }

    parent.appendChild(li);
  };

  if (typeof deviceData !== 'object') {
    appendItem('powerDrawWatts', deviceData, list);
  } else {
    Object.keys(deviceData).forEach((k) => appendItem(k, deviceData[k], list));
  }

  return list;
}

const escapeDiv = document.createElement('div');
function escapeHtml(str) {
  escapeDiv.textContent = str;
  return escapeDiv.innerHTML;
}

// Helper to render existing devices in the manager section
function renderDeviceList(categoryKey, ulElement) {
  ulElement.innerHTML = "";
  let categoryDevices = devices[categoryKey];
  // Handle nested FIZ categories
  if (categoryKey.includes('.')) {
    const [mainCat, subCat] = categoryKey.split('.');
    categoryDevices = devices[mainCat] && devices[mainCat][subCat];
  }
  if (!categoryDevices) return;

  for (let name in categoryDevices) {
    if (name === "None") continue;
    const deviceData = categoryDevices[name];
    const li = document.createElement("li");
    const header = document.createElement("div");
    header.className = "device-summary";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = name;
    // Add a hover description summarizing connectors and notes
    let summary = generateConnectorSummary(deviceData);
    summary = summary ? summary.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
    if (deviceData.notes) {
      summary = summary ? `${summary}; Notes: ${deviceData.notes}` : deviceData.notes;
    }
    if (summary) {
      nameSpan.setAttribute('title', summary);
      nameSpan.setAttribute('data-help', summary);
    }
    header.appendChild(nameSpan);

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "detail-toggle";
    toggleBtn.type = "button";
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.textContent = texts[currentLang].showDetails;
    header.appendChild(toggleBtn);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.dataset.name = name;
    editBtn.dataset.category = categoryKey;
    editBtn.textContent = texts[currentLang].editBtn;
    header.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.dataset.name = name;
    deleteBtn.dataset.category = categoryKey;
    deleteBtn.textContent = texts[currentLang].deleteDeviceBtn;
    header.appendChild(deleteBtn);

    li.appendChild(header);

    const detailsDiv = document.createElement("div");
    detailsDiv.className = "device-details";
    detailsDiv.style.display = "none";
    detailsDiv.appendChild(createDeviceDetailsList(deviceData));
    li.appendChild(detailsDiv);

    ulElement.appendChild(li);
  }
}

function refreshDeviceLists() {
  renderDeviceList("cameras", cameraListElem);
  renderDeviceList("monitors", monitorListElem);
  renderDeviceList("video", videoListElem);
  renderDeviceList("fiz.motors", motorListElem);
  renderDeviceList("fiz.controllers", controllerListElem);
  renderDeviceList("fiz.distance", distanceListElem);
  renderDeviceList("batteries", batteryListElem);

  filterDeviceList(cameraListElem, cameraListFilterInput.value);
  filterDeviceList(monitorListElem, monitorListFilterInput.value);
  filterDeviceList(videoListElem, videoListFilterInput.value);
  filterDeviceList(motorListElem, motorListFilterInput.value);
  filterDeviceList(controllerListElem, controllerListFilterInput.value);
  filterDeviceList(distanceListElem, distanceListFilterInput.value);
  filterDeviceList(batteryListElem, batteryListFilterInput.value);
}

// Initial render of device lists
refreshDeviceLists();

// --- EVENT LISTENERS ---

// Language selection
languageSelect.addEventListener("change", (event) => {
  setLanguage(event.target.value);
});

if (skipLink) {
  skipLink.addEventListener("click", () => {
    const main = document.getElementById("mainContent");
    if (main) main.focus();
  });
}

// Filtering inputs
bindFilterInput(cameraFilterInput, () => filterSelect(cameraSelect, cameraFilterInput.value));
bindFilterInput(monitorFilterInput, () => filterSelect(monitorSelect, monitorFilterInput.value));
bindFilterInput(videoFilterInput, () => filterSelect(videoSelect, videoFilterInput.value));
bindFilterInput(motorFilterInput, () => motorSelects.forEach(sel => filterSelect(sel, motorFilterInput.value)));
bindFilterInput(controllerFilterInput, () => controllerSelects.forEach(sel => filterSelect(sel, controllerFilterInput.value)));
bindFilterInput(distanceFilterInput, () => filterSelect(distanceSelect, distanceFilterInput.value));
bindFilterInput(batteryFilterInput, () => filterSelect(batterySelect, batteryFilterInput.value));

clearFiltersBtn.addEventListener("click", clearAllFilters);

bindFilterInput(cameraListFilterInput, () => filterDeviceList(cameraListElem, cameraListFilterInput.value));
bindFilterInput(monitorListFilterInput, () => filterDeviceList(monitorListElem, monitorListFilterInput.value));
bindFilterInput(videoListFilterInput, () => filterDeviceList(videoListElem, videoListFilterInput.value));
bindFilterInput(motorListFilterInput, () => filterDeviceList(motorListElem, motorListFilterInput.value));
bindFilterInput(controllerListFilterInput, () => filterDeviceList(controllerListElem, controllerListFilterInput.value));
bindFilterInput(distanceListFilterInput, () => filterDeviceList(distanceListElem, distanceListFilterInput.value));
bindFilterInput(batteryListFilterInput, () => filterDeviceList(batteryListElem, batteryListFilterInput.value));

// Setup management
saveSetupBtn.addEventListener("click", () => {
  const setupName = setupNameInput.value.trim();
  if (!setupName) {
    alert(texts[currentLang].alertSetupName);
    return;
  }
  const currentSetup = {
    camera: cameraSelect.value,
    monitor: monitorSelect.value,
    video: videoSelect.value,
    motors: motorSelects.map(sel => sel.value),
    controllers: controllerSelects.map(sel => sel.value),
    distance: distanceSelect.value,
    batteryPlate: batteryPlateSelect.value,
    battery: batterySelect.value
  };
  let setups = getSetups();
  setups[setupName] = currentSetup;
  storeSetups(setups);
  populateSetupSelect();
  setupSelect.value = setupName; // Select the newly saved setup
  alert(texts[currentLang].alertSetupSaved.replace("{name}", setupName));
});

deleteSetupBtn.addEventListener("click", () => {
  const setupName = setupSelect.value;
  if (!setupName) {
    alert(texts[currentLang].alertNoSetupSelected);
    return;
  }
  if (confirm(texts[currentLang].confirmDeleteSetup.replace("{name}", setupName))) {
    let setups = getSetups();
    delete setups[setupName];
    storeSetups(setups);
    populateSetupSelect();
    setupNameInput.value = ""; // Clear setup name input
    // Reset dropdowns to "None" or first option after deleting current setup
    [cameraSelect, monitorSelect, videoSelect, distanceSelect, batterySelect].forEach(sel => {
      const noneOption = Array.from(sel.options).find(opt => opt.value === "None");
      if (noneOption) {
        sel.value = "None";
      } else {
        sel.selectedIndex = 0;
      }
    });
    motorSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    controllerSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    updateCalculations(); // Recalculate after clearing setup
  }
});

clearSetupBtn.addEventListener("click", () => {
  if (
    confirm(texts[currentLang].confirmClearSetup) &&
    confirm(texts[currentLang].confirmClearSetupAgain)
  ) {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('cameraPowerPlanner_session');
    }
    setupSelect.value = "";
    setupNameInput.value = "";
    [cameraSelect, monitorSelect, videoSelect, distanceSelect, batterySelect, batteryPlateSelect].forEach(sel => {
      if (!sel) return;
      const noneOption = Array.from(sel.options).find(opt => opt.value === "None");
      if (noneOption) {
        sel.value = "None";
      } else {
        sel.selectedIndex = 0;
      }
    });
    motorSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    controllerSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    updateBatteryPlateVisibility();
    updateBatteryOptions();
    updateCalculations();
  }
});


setupSelect.addEventListener("change", (event) => {
  const setupName = event.target.value;
  if (setupName === "") { // "-- New Setup --" selected
    setupNameInput.value = "";
    // Reset all dropdowns to "None" or first option
    [cameraSelect, monitorSelect, videoSelect, distanceSelect, batterySelect].forEach(sel => {
      const noneOption = Array.from(sel.options).find(opt => opt.value === "None");
      if (noneOption) {
        sel.value = "None";
      } else {
        sel.selectedIndex = 0;
      }
    });
    motorSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    controllerSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    updateBatteryPlateVisibility();
    updateBatteryOptions();
  } else {
    let setups = getSetups();
    const setup = setups[setupName];
    if (setup) {
      setupNameInput.value = setupName;
      cameraSelect.value = setup.camera;
      updateBatteryPlateVisibility();
      batteryPlateSelect.value = setup.batteryPlate || batteryPlateSelect.value;
      monitorSelect.value = setup.monitor;
      videoSelect.value = setup.video;
      setup.motors.forEach((val, i) => { if (motorSelects[i]) motorSelects[i].value = val; });
      setup.controllers.forEach((val, i) => { if (controllerSelects[i]) controllerSelects[i].value = val; });
      distanceSelect.value = setup.distance;
      batterySelect.value = setup.battery;
      updateBatteryOptions();
    }
  }
  updateCalculations();
});


function populateSetupSelect() {
  const setups = getSetups();
  setupSelect.innerHTML = `<option value="">${texts[currentLang].newSetupOption}</option>`;
  for (const name in setups) {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    setupSelect.appendChild(opt);
  }
}
populateSetupSelect(); // Initial populate of setups


// Toggle device manager visibility
if (toggleDeviceBtn) {
  toggleDeviceBtn.addEventListener("click", () => {
    if (deviceManagerSection.classList.contains('hidden')) {
      deviceManagerSection.classList.remove('hidden');
      toggleDeviceBtn.textContent = texts[currentLang].hideDeviceManager;
      toggleDeviceBtn.setAttribute('title', texts[currentLang].hideDeviceManager);
      toggleDeviceBtn.setAttribute('data-help', texts[currentLang].hideDeviceManagerHelp);
      refreshDeviceLists(); // Refresh lists when shown
      updateCalculations(); // Ensure calculations are up to date
    } else {
      deviceManagerSection.classList.add('hidden');
      toggleDeviceBtn.textContent = texts[currentLang].toggleDeviceManager;
      toggleDeviceBtn.setAttribute('title', texts[currentLang].toggleDeviceManager);
      toggleDeviceBtn.setAttribute('data-help', texts[currentLang].toggleDeviceManagerHelp);
    }
  });
}


function toggleDeviceDetails(button) {
  const details = button.closest('li').querySelector('.device-details');
  const expanded = button.getAttribute('aria-expanded') === 'true';
  if (expanded) {
    details.style.display = 'none';
    button.textContent = texts[currentLang].showDetails;
    button.setAttribute('aria-expanded', 'false');
  } else {
    details.style.display = 'block';
    button.textContent = texts[currentLang].hideDetails;
    button.setAttribute('aria-expanded', 'true');
  }
}

// Handle "Edit" and "Delete" buttons in device lists (event delegation)
deviceManagerSection.addEventListener("click", (event) => {
  if (event.target.classList.contains("detail-toggle")) {
    toggleDeviceDetails(event.target);
  } else if (event.target.classList.contains("edit-btn")) {
    const name = event.target.dataset.name;
    const categoryKey = event.target.dataset.category;

    // Set form for editing
    newCategorySelect.value = categoryKey;
    newCategorySelect.disabled = true; // Prevent changing category during edit
    // Trigger change handler so correct fields are shown and others cleared
    newCategorySelect.dispatchEvent(new Event('change'));
    // After the change handler runs, restore the device name for editing
    newNameInput.value = name;

    let deviceData;
    if (categoryKey.includes('.')) {
      const [mainCat, subCat] = categoryKey.split('.');
      deviceData = devices[mainCat][subCat][name];
    } else {
      deviceData = devices[categoryKey][name];
    }
    placeWattField(categoryKey);

    if (categoryKey === "batteries") {
      wattFieldDiv.style.display = "none";
      cameraFieldsDiv.style.display = "none";
      batteryFieldsDiv.style.display = "block";
      newCapacityInput.value = deviceData.capacity;
      newPinAInput.value = deviceData.pinA;
      newDtapAInput.value = deviceData.dtapA;
    } else if (categoryKey === "cameras") {
      wattFieldDiv.style.display = "none";
      batteryFieldsDiv.style.display = "none";
      cameraFieldsDiv.style.display = "block";
      monitorFieldsDiv.style.display = "none";
      cameraWattInput.value = deviceData.powerDrawWatts || '';
      cameraVoltageInput.value = deviceData.power?.input?.voltageRange || '';
      const tmp = firstPowerInputType(deviceData);
      cameraPortTypeInput.value = tmp || "";
      setBatteryPlates(deviceData.power?.batteryPlateSupport || []);
      setRecordingMedia(deviceData.recordingMedia || []);
      setLensMounts(deviceData.lensMount || []);
      setPowerDistribution(deviceData.power?.powerDistributionOutputs || []);
      setVideoOutputs(deviceData.videoOutputs || []);
      setFizConnectors(deviceData.fizConnectors || []);
      setViewfinders(deviceData.viewfinder || []);
      setTimecodes(deviceData.timecode || []);
    } else if (categoryKey === "monitors") {
      wattFieldDiv.style.display = "none";
      batteryFieldsDiv.style.display = "none";
      cameraFieldsDiv.style.display = "none";
      monitorFieldsDiv.style.display = "block";
      videoFieldsDiv.style.display = "none";
      motorFieldsDiv.style.display = "none";
      controllerFieldsDiv.style.display = "none";
      distanceFieldsDiv.style.display = "none";
      monitorScreenSizeInput.value = deviceData.screenSizeInches || '';
      monitorBrightnessInput.value = deviceData.brightnessNits || '';
      monitorWattInput.value = deviceData.powerDrawWatts || '';
      monitorVoltageInput.value = deviceData.power?.input?.voltageRange || '';
      const mpt = firstPowerInputType(deviceData);
      monitorPortTypeInput.value = mpt || "";
      setMonitorVideoInputs(deviceData.videoInputs || deviceData.video?.inputs || []);
      setMonitorVideoOutputs(deviceData.videoOutputs || deviceData.video?.outputs || []);
      monitorWirelessTxInput.checked = !!deviceData.wirelessTx;
      monitorLatencyInput.value = deviceData.latencyMs || '';
      monitorAudioOutputInput.value =
        deviceData.audioOutput?.portType ||
        deviceData.audioOutput?.type ||
        deviceData.audioOutput || '';
    } else if (categoryKey === "video") {
      wattFieldDiv.style.display = "block";
      cameraFieldsDiv.style.display = "none";
      monitorFieldsDiv.style.display = "none";
      batteryFieldsDiv.style.display = "none";
      videoFieldsDiv.style.display = "block";
      motorFieldsDiv.style.display = "none";
      controllerFieldsDiv.style.display = "none";
      distanceFieldsDiv.style.display = "none";
      newWattInput.value = deviceData.powerDrawWatts || '';
      videoPowerInput.value = firstPowerInputType(deviceData);
      setVideoInputs(deviceData.videoInputs || deviceData.video?.inputs || []);
      setVideoOutputsIO(deviceData.videoOutputs || deviceData.video?.outputs || []);
      videoFrequencyInput.value = deviceData.frequency || '';
      videoLatencyInput.value = deviceData.latencyMs || '';
      motorConnectorInput.value = '';
    } else if (categoryKey === "fiz.motors") {
      wattFieldDiv.style.display = "block";
      videoFieldsDiv.style.display = "none";
      monitorFieldsDiv.style.display = "none";
      cameraFieldsDiv.style.display = "none";
      batteryFieldsDiv.style.display = "none";
      motorFieldsDiv.style.display = "block";
      controllerFieldsDiv.style.display = "none";
      distanceFieldsDiv.style.display = "none";
      newWattInput.value = deviceData.powerDrawWatts || '';
      motorConnectorInput.value = deviceData.fizConnector || '';
      motorInternalInput.checked = !!deviceData.internalController;
      motorTorqueInput.value = deviceData.torqueNm || '';
      motorGearInput.value = Array.isArray(deviceData.gearTypes) ? deviceData.gearTypes.join(', ') : '';
      motorNotesInput.value = deviceData.notes || '';
    } else if (categoryKey === "fiz.controllers") {
      wattFieldDiv.style.display = "block";
      videoFieldsDiv.style.display = "none";
      monitorFieldsDiv.style.display = "none";
      cameraFieldsDiv.style.display = "none";
      batteryFieldsDiv.style.display = "none";
      motorFieldsDiv.style.display = "none";
      controllerFieldsDiv.style.display = "block";
      distanceFieldsDiv.style.display = "none";
      newWattInput.value = deviceData.powerDrawWatts || '';
      const cc = Array.isArray(deviceData.fizConnectors)
        ? deviceData.fizConnectors.map(fc => fc.type).join(', ')
        : (deviceData.fizConnector || '');
      controllerConnectorInput.value = cc;
      controllerPowerInput.value = deviceData.power_source || '';
      controllerBatteryInput.value = deviceData.battery_type || '';
      controllerConnectivityInput.value = deviceData.connectivity || '';
      controllerNotesInput.value = deviceData.notes || '';
    } else if (categoryKey === "fiz.distance") {
      wattFieldDiv.style.display = "block";
      videoFieldsDiv.style.display = "none";
      monitorFieldsDiv.style.display = "none";
      cameraFieldsDiv.style.display = "none";
      batteryFieldsDiv.style.display = "none";
      motorFieldsDiv.style.display = "none";
      controllerFieldsDiv.style.display = "none";
      distanceFieldsDiv.style.display = "block";
      newWattInput.value = deviceData.powerDrawWatts || '';
      distanceConnectionInput.value = deviceData.connection_compatibility || '';
      distanceMethodInput.value = deviceData.measurement_method || '';
      distanceRangeInput.value = deviceData.measurement_range || '';
      distanceAccuracyInput.value = deviceData.accuracy || '';
      distanceOutputInput.value = deviceData.output_display || '';
      distanceNotesInput.value = deviceData.notes || '';
    } else {
      wattFieldDiv.style.display = "block";
      batteryFieldsDiv.style.display = "none";
      cameraFieldsDiv.style.display = "none";
      monitorFieldsDiv.style.display = "none";
      videoFieldsDiv.style.display = "none";
      motorFieldsDiv.style.display = "none";
      controllerFieldsDiv.style.display = "none";
      distanceFieldsDiv.style.display = "none";
      const watt = typeof deviceData === 'object' ? deviceData.powerDrawWatts : deviceData;
      newWattInput.value = watt;
    }
    // Change button to "Update"
    addDeviceBtn.textContent = texts[currentLang].updateDeviceBtn;
    addDeviceBtn.dataset.mode = "edit";
    addDeviceBtn.dataset.originalName = name; // Store original name for update
    cancelEditBtn.textContent = texts[currentLang].cancelEditBtn;
    cancelEditBtn.style.display = "inline";
    document.getElementById("addDeviceHeading").scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (event.target.classList.contains("delete-btn")) {
    const name = event.target.dataset.name;
    const categoryKey = event.target.dataset.category;
    if (confirm(texts[currentLang].confirmDeleteDevice.replace("{name}", name))) {
      if (categoryKey.includes('.')) {
        const [mainCat, subCat] = categoryKey.split('.');
        delete devices[mainCat][subCat][name];
      } else {
        delete devices[categoryKey][name];
      }
      storeDevices(devices);
      viewfinderTypeOptions = getAllViewfinderTypes();
      viewfinderConnectorOptions = getAllViewfinderConnectors();
      refreshDeviceLists();
      // Re-populate all dropdowns and update calculations
      populateSelect(cameraSelect, devices.cameras, true);
      populateSelect(monitorSelect, devices.monitors, true);
      populateSelect(videoSelect, devices.video, true);
      motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
      controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
      populateSelect(distanceSelect, devices.fiz.distance, true);
      populateSelect(batterySelect, devices.batteries, true);
        updateFizConnectorOptions();
        updateMotorConnectorOptions();
        updateControllerConnectorOptions();
        updateControllerPowerOptions();
        updateControllerBatteryOptions();
        updateControllerConnectivityOptions();
        updatePowerDistTypeOptions();
        updatePowerDistVoltageOptions();
        updatePowerDistCurrentOptions();
        updateTimecodeTypeOptions();
        updateDistanceConnectionOptions();
        updateDistanceMethodOptions();
        updateDistanceDisplayOptions();
      applyFilters();
      updateCalculations();
    }
  }
});

deviceManagerSection.addEventListener('keydown', (event) => {
  if (event.target.classList.contains('detail-toggle') && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    toggleDeviceDetails(event.target);
  }
});

// Category selection in add device form
newCategorySelect.addEventListener("change", () => {
  const val = newCategorySelect.value;
  placeWattField(val);
  if (val === "batteries") {
    wattFieldDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    monitorFieldsDiv.style.display = "none";
    videoFieldsDiv.style.display = "none";
    motorFieldsDiv.style.display = "none";
    controllerFieldsDiv.style.display = "none";
    distanceFieldsDiv.style.display = "none";
    batteryFieldsDiv.style.display = "block";
  } else if (val === "cameras") {
    wattFieldDiv.style.display = "none";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "block";
    monitorFieldsDiv.style.display = "none";
    videoFieldsDiv.style.display = "none";
    motorFieldsDiv.style.display = "none";
    controllerFieldsDiv.style.display = "none";
    distanceFieldsDiv.style.display = "none";
  } else if (val === "monitors") {
    wattFieldDiv.style.display = "none";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    monitorFieldsDiv.style.display = "block";
    videoFieldsDiv.style.display = "none";
    motorFieldsDiv.style.display = "none";
    controllerFieldsDiv.style.display = "none";
    distanceFieldsDiv.style.display = "none";
  } else if (val === "video") {
    wattFieldDiv.style.display = "block";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    monitorFieldsDiv.style.display = "none";
    videoFieldsDiv.style.display = "block";
    motorFieldsDiv.style.display = "none";
    controllerFieldsDiv.style.display = "none";
    distanceFieldsDiv.style.display = "none";
  } else if (val === "fiz.motors") {
    wattFieldDiv.style.display = "block";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    monitorFieldsDiv.style.display = "none";
    videoFieldsDiv.style.display = "none";
    motorFieldsDiv.style.display = "block";
    controllerFieldsDiv.style.display = "none";
    distanceFieldsDiv.style.display = "none";
  } else if (val === "fiz.controllers") {
    wattFieldDiv.style.display = "block";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    monitorFieldsDiv.style.display = "none";
    videoFieldsDiv.style.display = "none";
    motorFieldsDiv.style.display = "none";
    controllerFieldsDiv.style.display = "block";
    distanceFieldsDiv.style.display = "none";
  } else if (val === "fiz.distance") {
    wattFieldDiv.style.display = "block";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    monitorFieldsDiv.style.display = "none";
    videoFieldsDiv.style.display = "none";
    motorFieldsDiv.style.display = "none";
    controllerFieldsDiv.style.display = "none";
    distanceFieldsDiv.style.display = "block";
  } else {
    wattFieldDiv.style.display = "block";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    monitorFieldsDiv.style.display = "none";
    videoFieldsDiv.style.display = "none";
    motorFieldsDiv.style.display = "none";
    controllerFieldsDiv.style.display = "none";
    distanceFieldsDiv.style.display = "none";
  }
  newWattInput.value = "";
  newCapacityInput.value = "";
  newPinAInput.value = "";
  newDtapAInput.value = "";
  cameraWattInput.value = "";
  cameraVoltageInput.value = "";
  cameraPortTypeInput.value = "";
  monitorScreenSizeInput.value = "";
  monitorBrightnessInput.value = "";
  monitorWattInput.value = "";
  monitorVoltageInput.value = "";
  monitorPortTypeInput.value = "";
  monitorWirelessTxInput.checked = false;
  monitorLatencyInput.value = "";
  monitorAudioOutputInput.value = "";
  clearMonitorVideoInputs();
  clearMonitorVideoOutputs();
  clearBatteryPlates();
  clearRecordingMedia();
  clearLensMounts();
  clearPowerDistribution();
  clearVideoOutputs();
  clearFizConnectors();
  clearViewfinders();
  clearTimecodes();
  videoPowerInput.value = "";
  clearVideoInputs();
  clearVideoOutputsIO();
  videoFrequencyInput.value = "";
  videoLatencyInput.value = "";
  motorConnectorInput.value = "";
  motorInternalInput.checked = false;
  motorTorqueInput.value = "";
  motorGearInput.value = "";
  motorNotesInput.value = "";
  controllerConnectorInput.value = "";
  controllerPowerInput.value = "";
  controllerBatteryInput.value = "";
  controllerConnectivityInput.value = "";
  controllerNotesInput.value = "";
  distanceConnectionInput.value = "";
  distanceMethodInput.value = "";
  distanceRangeInput.value = "";
  distanceAccuracyInput.value = "";
  distanceOutputInput.value = "";
  distanceNotesInput.value = "";
  // Reset add/update button to "Add" and clear originalName in dataset
  addDeviceBtn.textContent = texts[currentLang].addDeviceBtn;
  addDeviceBtn.dataset.mode = "add";
  delete addDeviceBtn.dataset.originalName;
  newNameInput.value = ""; // Clear name to avoid accidental update
  cancelEditBtn.style.display = "none";
});

function resetDeviceForm() {
  newCategorySelect.disabled = false;
  cancelEditBtn.style.display = "none";
  // Trigger change handler to reset fields and button text
  newCategorySelect.dispatchEvent(new Event('change'));
}


// Add/Update device logic
addDeviceBtn.addEventListener("click", () => {
  const name = newNameInput.value.trim();
  const category = newCategorySelect.value;
  const isEditing = addDeviceBtn.dataset.mode === "edit";
  const originalName = addDeviceBtn.dataset.originalName;

  if (!name) {
    alert(texts[currentLang].alertDeviceName);
    return;
  }

  let targetCategory;
  if (category.includes('.')) {
    const [mainCat, subCat] = category.split('.');
    if (!devices[mainCat]) devices[mainCat] = {};
    if (!devices[mainCat][subCat]) devices[mainCat][subCat] = {};
    targetCategory = devices[mainCat][subCat];
  } else {
    if (!devices[category]) devices[category] = {};
    targetCategory = devices[category];
  }

  // Check for duplicate name if adding, or if name changed during edit
  if ((!isEditing && targetCategory[name] !== undefined) || (isEditing && name !== originalName && targetCategory[name] !== undefined)) {
    alert(texts[currentLang].alertDeviceExists);
    return;
  }

  if (category === "batteries") {
    const capacity = parseFloat(newCapacityInput.value);
    const pinA = parseFloat(newPinAInput.value);
    const dtapA = parseFloat(newDtapAInput.value);
    if (isNaN(capacity) || isNaN(pinA) || isNaN(dtapA) || capacity <= 0 || pinA <= 0 || dtapA < 0) {
      alert(texts[currentLang].alertDeviceFields);
      return;
    }
    // Delete original name entry if name changed during edit
    if (isEditing && name !== originalName) {
        delete targetCategory[originalName];
    }
    targetCategory[name] = { capacity: capacity, pinA: pinA, dtapA: dtapA };
  } else if (category === "cameras") {
    const watt = parseFloat(cameraWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    if (isEditing && name !== originalName) {
      delete targetCategory[originalName];
    }
    let powerDist, videoOut, fizCon, viewfinder, timecode, plateSupport;
    try {
      powerDist = getPowerDistribution();
      videoOut = getVideoOutputs();
      fizCon = getFizConnectors();
      viewfinder = getViewfinders();
      timecode = getTimecodes();
      plateSupport = getBatteryPlates();
    } catch (e) {
      console.error("Invalid camera JSON input:", e);
      alert(texts[currentLang].alertInvalidCameraJSON);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      power: {
        input: {
          voltageRange: cameraVoltageInput.value,
          type: cameraPortTypeInput.value
        },
        batteryPlateSupport: plateSupport,
        powerDistributionOutputs: powerDist
      },
      videoOutputs: videoOut,
      fizConnectors: fizCon,
      recordingMedia: getRecordingMedia(),
      viewfinder: viewfinder,
      lensMount: getLensMounts(),
      timecode: timecode
    };
  } else if (category === "monitors") {
    const watt = parseFloat(monitorWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    if (isEditing && name !== originalName) {
      delete targetCategory[originalName];
    }
    const screenSize = parseFloat(monitorScreenSizeInput.value);
    const brightness = parseFloat(monitorBrightnessInput.value);
    targetCategory[name] = {
      screenSizeInches: isNaN(screenSize) ? undefined : screenSize,
      brightnessNits: isNaN(brightness) ? undefined : brightness,
      powerDrawWatts: watt,
      power: {
        input: {
          voltageRange: monitorVoltageInput.value,
          type: monitorPortTypeInput.value
        },
        output: null
      },
      video: {
        inputs: getMonitorVideoInputs(),
        outputs: getMonitorVideoOutputs()
      },
      wirelessTx: monitorWirelessTxInput.checked,
      latencyMs: monitorWirelessTxInput.checked ? monitorLatencyInput.value : undefined,
      audioOutput: monitorAudioOutputInput.value ? { portType: monitorAudioOutputInput.value } : undefined
    };
  } else if (category === "video") {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    if (isEditing && name !== originalName) {
      delete targetCategory[originalName];
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      power: { input: { type: videoPowerInput.value } },
      videoInputs: getVideoInputs(),
      videoOutputs: getVideoOutputsIO(),
      frequency: videoFrequencyInput.value,
      latencyMs: videoLatencyInput.value
    };
  } else if (category === "fiz.motors") {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    if (isEditing && name !== originalName) {
      delete targetCategory[originalName];
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      fizConnector: motorConnectorInput.value,
      internalController: motorInternalInput.checked,
      torqueNm: motorTorqueInput.value ? parseFloat(motorTorqueInput.value) : null,
      gearTypes: motorGearInput.value ? motorGearInput.value.split(',').map(s => s.trim()).filter(Boolean) : [],
      notes: motorNotesInput.value
    };
  } else if (category === "fiz.controllers") {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    if (isEditing && name !== originalName) {
      delete targetCategory[originalName];
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      fizConnector: controllerConnectorInput.value,
      power_source: controllerPowerInput.value,
      battery_type: controllerBatteryInput.value,
      connectivity: controllerConnectivityInput.value,
      notes: controllerNotesInput.value
    };
  } else if (category === "fiz.distance") {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    if (isEditing && name !== originalName) {
      delete targetCategory[originalName];
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      connection_compatibility: distanceConnectionInput.value,
      measurement_method: distanceMethodInput.value,
      measurement_range: distanceRangeInput.value,
      accuracy: distanceAccuracyInput.value,
      output_display: distanceOutputInput.value,
      notes: distanceNotesInput.value
    };
  } else {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    if (isEditing && name !== originalName) {
      delete targetCategory[originalName];
    }
    targetCategory[name] = { powerDrawWatts: watt };
  }

  // After adding/updating, reset form and refresh lists
  resetDeviceForm();

  storeDevices(devices);
  viewfinderTypeOptions = getAllViewfinderTypes();
  viewfinderConnectorOptions = getAllViewfinderConnectors();
  updatePlateTypeOptions();
  updatePowerPortOptions();
  updatePowerDistTypeOptions();
  updatePowerDistVoltageOptions();
  updatePowerDistCurrentOptions();
  updateRecordingMediaOptions();
  updateTimecodeTypeOptions();
  refreshDeviceLists();
  // Re-populate all dropdowns to include the new/updated device
  populateSelect(cameraSelect, devices.cameras, true);
  populateSelect(monitorSelect, devices.monitors, true);
  populateSelect(videoSelect, devices.video, true);
  motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
  controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
  populateSelect(distanceSelect, devices.fiz.distance, true);
  populateSelect(batterySelect, devices.batteries, true);
  updateFizConnectorOptions();
  applyFilters();
  updateCalculations(); // Update calculations after device data changes

  let categoryKey = category.replace(".", "_");
  let categoryDisplay = texts[currentLang]["category_" + categoryKey] || category;
  if (isEditing) {
      alert(texts[currentLang].alertDeviceUpdated.replace("{name}", name).replace("{category}", categoryDisplay));
  } else {
      alert(texts[currentLang].alertDeviceAdded.replace("{name}", name).replace("{category}", categoryDisplay));
  }
});

// Cancel editing and revert form to add mode
cancelEditBtn.addEventListener("click", () => {
  resetDeviceForm();
});

// Export device data
exportBtn.addEventListener("click", () => {
  const dataStr = JSON.stringify(devices, null, 2);
  exportOutput.style.display = "block";
  exportOutput.value = dataStr;
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "device_data_export.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

const exportAndRevertBtn = document.getElementById('exportAndRevertBtn'); 

if (exportAndRevertBtn) {
  exportAndRevertBtn.addEventListener('click', () => {
    // Step 1: Export the current database
    if (confirm(texts[currentLang].confirmExportAndRevert)) { // Confirmation for both actions
      // Reusing the export logic from the existing 'Export Database' button
      const dataStr = JSON.stringify(devices, null, 2);
      // For simplicity, let's just trigger a download directly.
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "device_data_backup_before_revert.json"; // Suggests it's a backup
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Give a small delay to ensure download prompt appears before next step
      setTimeout(() => {
        // Step 2: Remove saved database and reload page so data.js is re-read
        localStorage.removeItem('cameraPowerPlanner_devices');
        alert(texts[currentLang].alertExportAndRevertSuccess);
        location.reload();
      }, 500); // 500ms delay
    }
  });
}

// Import device data
importDataBtn.addEventListener("click", () => {
  importFileInput.click(); // Trigger the file input click
});

importFileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target.result);
      // Basic validation: check if it has expected top-level keys
      const expectedKeys = ["cameras", "monitors", "video", "fiz", "batteries"];
      const hasAllKeys = expectedKeys.every(key => Object.prototype.hasOwnProperty.call(importedData, key));

      if (hasAllKeys && typeof importedData.fiz === 'object' &&
          Object.prototype.hasOwnProperty.call(importedData.fiz,'motors') &&
          Object.prototype.hasOwnProperty.call(importedData.fiz,'controllers') &&
          Object.prototype.hasOwnProperty.call(importedData.fiz,'distance')) {
        devices = importedData; // Overwrite current devices with imported data
        storeDevices(devices);
        viewfinderTypeOptions = getAllViewfinderTypes();
        viewfinderConnectorOptions = getAllViewfinderConnectors();
        refreshDeviceLists(); // Update device manager lists
        // Re-populate all dropdowns and update calculations
        populateSelect(cameraSelect, devices.cameras, true);
        populateSelect(monitorSelect, devices.monitors, true);
        populateSelect(videoSelect, devices.video, true);
        motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
        controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
        populateSelect(distanceSelect, devices.fiz.distance, true);
        populateSelect(batterySelect, devices.batteries, true);
        updateFizConnectorOptions();
        updateMotorConnectorOptions();
        updateControllerConnectorOptions();
        updateControllerPowerOptions();
        updateControllerBatteryOptions();
        updateControllerConnectivityOptions();
        updateDistanceConnectionOptions();
        updateDistanceMethodOptions();
        updateDistanceDisplayOptions();
        applyFilters();
        updateCalculations();

        // Count total devices imported for the alert message
        let deviceCount = 0;
        for (const category in importedData) {
            if (category === "fiz") {
                for (const subcategory in importedData.fiz) {
                    deviceCount += Object.keys(importedData.fiz[subcategory]).length;
                }
            } else {
                deviceCount += Object.keys(importedData[category]).length;
            }
        }
        alert(texts[currentLang].alertImportSuccess.replace("{num_devices}", deviceCount));
        exportOutput.style.display = "block"; // Show the textarea
        exportOutput.value = JSON.stringify(devices, null, 2); // Display the newly imported data
      } else {
        alert(texts[currentLang].alertImportError);
      }
    } catch (error) {
      console.error("Error parsing or importing data:", error);
      alert(texts[currentLang].alertImportError);
    }
  };
  reader.readAsText(file);
  event.target.value = ''; // Clear the file input for re-selection of the same file
});


// --- NEW SETUP MANAGEMENT FUNCTIONS ---

// Export all saved setups to a JSON file
exportSetupsBtn.addEventListener('click', () => {
    const setupsToExport = getSetups();
    if (Object.keys(setupsToExport).length === 0) {
        alert(texts[currentLang].alertNoSetupsToExport);
        return;
    }
    const dataStr = JSON.stringify(setupsToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'camera_power_setups.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});

// Trigger file input when "Import Setups" is clicked
importSetupsBtn.addEventListener('click', () => {
    importSetupsInput.click();
});

// Handle the file import for setups
importSetupsInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedSetups = JSON.parse(e.target.result);
            // Basic validation: must be a non-null object
            if (importedSetups && typeof importedSetups === 'object' && !Array.isArray(importedSetups)) {
                storeSetups(importedSetups);
                populateSetupSelect(); // Refresh dropdown
                alert(texts[currentLang].alertImportSetupsSuccess.replace("{num_setups}", Object.keys(importedSetups).length));
                // Reset form to "-- New Setup --" by clearing selection and
                // triggering the change handler that initializes a new setup
                setupSelect.value = "";
                setupSelect.dispatchEvent(new Event('change'));
            } else {
                throw new Error("Invalid format: not a valid setup object.");
            }
        } catch (error) {
            console.error("Error parsing or importing setups:", error);
            alert(texts[currentLang].alertImportSetupsError);
        }
    };
    reader.readAsText(file);
    event.target.value = ''; // Clear file input
});

// Generate a printable overview of the current selected setup in a new tab
generateOverviewBtn.addEventListener('click', () => {
    if (!setupSelect.value) { // Ensure a setup is selected
        alert(texts[currentLang].alertSelectSetupForOverview);
        return;
    }
    generatePrintableOverview();
});

shareSetupBtn.addEventListener('click', () => {
  const setupName = (setupNameInput && setupNameInput.value.trim()) ||
    (setupSelect && setupSelect.value) || '';
  const currentSetup = {
    setupName,
    camera: cameraSelect.value,
    monitor: monitorSelect.value,
    video: videoSelect.value,
    motors: motorSelects.map(sel => sel.value),
    controllers: controllerSelects.map(sel => sel.value),
    distance: distanceSelect.value,
    batteryPlate: batteryPlateSelect.value,
    battery: batterySelect.value
  };
  const deviceChanges = getDeviceChanges();
  if (Object.keys(deviceChanges).length) {
    currentSetup.changedDevices = deviceChanges;
  }
  const key = getCurrentSetupKey();
  const feedback = loadFeedbackSafe()[key] || [];
  if (feedback.length) {
    currentSetup.feedback = feedback;
  }
  const encoded = LZString.compressToEncodedURIComponent(JSON.stringify(currentSetup));
  const link = `${window.location.origin}${window.location.pathname}?shared=${encoded}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(link)
      .then(() => alert(texts[currentLang].shareLinkCopied))
      .catch(() => prompt(texts[currentLang].shareSetupPrompt, link));
  } else {
    prompt(texts[currentLang].shareSetupPrompt, link);
  }
});

if (applySharedLinkBtn && sharedLinkInput) {
  applySharedLinkBtn.addEventListener('click', () => {
    const url = sharedLinkInput.value.trim();
    if (!url) return;
    let shared;
    try {
      const params = new URL(url, window.location.href).searchParams;
      shared = params.get('shared');
    } catch {
      shared = null;
    }
    if (!shared) {
      alert(texts[currentLang].invalidSharedLink);
      return;
    }
    applySharedSetup(shared);
    updateCalculations();
  });
}

// Open feedback dialog and handle submission
if (runtimeFeedbackBtn && feedbackDialog && feedbackForm) {
  runtimeFeedbackBtn.addEventListener('click', () => {
    const today = new Date().toISOString().split('T')[0];
    const motVals = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    const ctrlVals = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    document.getElementById('fbDate').value = today;
    document.getElementById('fbCamera').value = cameraSelect.value || '';
    document.getElementById('fbBatteryPlate').value = getSelectedPlate() || '';
    document.getElementById('fbBattery').value = batterySelect.value || '';
    document.getElementById('fbWirelessVideo').value = videoSelect.value || '';
    document.getElementById('fbMonitor').value = monitorSelect.value || '';
    document.getElementById('fbControllers').value = ctrlVals.join(', ');
    document.getElementById('fbMotors').value = motVals.join(', ');
    const fbDistance = document.getElementById('fbDistance');
    if (fbDistance && distanceSelect) {
      fbDistance.innerHTML = distanceSelect.innerHTML;
      fbDistance.value = distanceSelect.value || '';
    }
    feedbackDialog.showModal();
  });

  feedbackCancelBtn.addEventListener('click', () => {
    feedbackDialog.close();
  });

  if (feedbackUseLocationBtn) {
    feedbackUseLocationBtn.addEventListener('click', () => {
      const locationInput = document.getElementById('fbLocation');
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
      }
      feedbackUseLocationBtn.disabled = true;
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          locationInput.value = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
          feedbackUseLocationBtn.disabled = false;
        },
        () => {
          feedbackUseLocationBtn.disabled = false;
          alert('Unable to retrieve your location');
        }
      );
    });
  }

  feedbackForm.addEventListener('submit', e => {
    e.preventDefault();
    const entry = {
      username: document.getElementById('fbUsername').value.trim(),
      date: document.getElementById('fbDate').value,
      location: document.getElementById('fbLocation').value.trim(),
      camera: document.getElementById('fbCamera').value.trim(),
      batteryPlate: document.getElementById('fbBatteryPlate').value.trim(),
      lensMount: document.getElementById('fbLensMount').value.trim(),
      resolution: document.getElementById('fbResolution').value.trim(),
      codec: document.getElementById('fbCodec').value.trim(),
      framerate: document.getElementById('fbFramerate').value.trim(),
      cameraWifi: document.getElementById('fbWifi').value,
      firmware: document.getElementById('fbFirmware').value.trim(),
      battery: document.getElementById('fbBattery').value.trim(),
      batteryAge: document.getElementById('fbBatteryAge').value.trim(),
      wirelessVideo: document.getElementById('fbWirelessVideo').value.trim(),
      monitor: document.getElementById('fbMonitor').value.trim(),
      monitorBrightness: document.getElementById('fbMonitorBrightness').value.trim(),
      lens: document.getElementById('fbLens').value.trim(),
      lensData: document.getElementById('fbLensData').value.trim(),
      controllers: document.getElementById('fbControllers').value.trim(),
      motors: document.getElementById('fbMotors').value.trim(),
      distance: document.getElementById('fbDistance').value.trim(),
      temperature: document.getElementById('fbTemperature').value.trim(),
      charging: document.getElementById('fbCharging').value.trim(),
      runtime: document.getElementById('fbRuntime').value.trim(),
      batteriesPerDay: document.getElementById('fbBatteriesPerDay').value.trim()
    };
    const key = getCurrentSetupKey();
    const feedback = loadFeedbackSafe();
    if (!feedback[key]) feedback[key] = [];
    feedback[key].push(entry);
    saveFeedbackSafe(feedback);
    const lines = [];
    Object.entries(entry).forEach(([k, v]) => {
      lines.push(`${k}: ${v}`);
    });
    const subject = encodeURIComponent('Camera Power Planner Runtime Feedback');
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:info@lucazanner.de?subject=${subject}&body=${body}`;
    feedbackDialog.close();
    updateCalculations();
  });
}


function summarizeByType(list) {
    if (!Array.isArray(list)) return {};
    return list.reduce((counts, it) => {
        if (it?.type) {
            counts[it.type] = (counts[it.type] || 0) + 1;
        }
        return counts;
    }, {});
}

function connectorBlocks(items, icon, cls = 'neutral-conn', label = '', dir = '') {
    if (!Array.isArray(items) || items.length === 0) return '';
    const counts = summarizeByType(items);
    const entries = Object.entries(counts).map(([type, count]) => {
        return `${escapeHtml(type)}${count > 1 ? ` ×${count}` : ''}`;
    });
    if (!entries.length) return '';
    const prefix = label ? `${label}${dir ? ` ${dir}` : ''}: ` : '';
    return `<span class="connector-block ${cls}">${icon} ${prefix}${entries.join(', ')}</span>`;
}

function generateConnectorSummary(data) {
    if (!data || typeof data !== 'object') return '';

    let portHtml = '';
    const connectors = [
        { items: data.power?.powerDistributionOutputs, icon: '⚡', cls: 'power-conn', label: 'Power', dir: 'Out' },
        { items: powerInputTypes(data).map(t => ({ type: t })), icon: '🔌', cls: 'power-conn', label: 'Power', dir: 'In' },
        { items: data.fizConnectors, icon: '🎚️', cls: 'fiz-conn', label: 'FIZ Port' },
        { items: data.video?.inputs || data.videoInputs, icon: '📺', cls: 'video-conn', label: 'Video', dir: 'In' },
        { items: data.video?.outputs || data.videoOutputs, icon: '📺', cls: 'video-conn', label: 'Video', dir: 'Out' },
        { items: data.timecode, icon: '⏱️', cls: 'neutral-conn', label: 'Timecode' },
        { items: data.audioInput?.portType ? [{ type: data.audioInput.portType }] : undefined, icon: '🎤', cls: 'neutral-conn', label: 'Audio', dir: 'In' },
        { items: data.audioOutput?.portType ? [{ type: data.audioOutput.portType }] : undefined, icon: '🔊', cls: 'neutral-conn', label: 'Audio', dir: 'Out' },
        { items: data.audioIo?.portType ? [{ type: data.audioIo.portType }] : undefined, icon: '🎚️', cls: 'neutral-conn', label: 'Audio', dir: 'I/O' },
    ];

    for (const { items, icon, cls, label, dir } of connectors) {
        portHtml += connectorBlocks(items, icon, cls, label, dir);
    }

    let specHtml = '';
    if (typeof data.powerDrawWatts === 'number') {
        specHtml += `<span class="info-box power-conn">⚡ Power: ${data.powerDrawWatts} W</span>`;
    }
    if (data.power?.input?.voltageRange) {
        specHtml += `<span class="info-box power-conn">🔋 Voltage: ${escapeHtml(String(data.power.input.voltageRange))}V</span>`;
    }
    if (typeof data.capacity === 'number') {
        specHtml += `<span class="info-box power-conn">🔋 Capacity: ${data.capacity} Wh</span>`;
    }
    if (typeof data.pinA === 'number') {
        specHtml += `<span class="info-box power-conn">Pins: ${data.pinA}A</span>`;
    }
    if (typeof data.dtapA === 'number') {
        specHtml += `<span class="info-box power-conn">D-Tap: ${data.dtapA}A</span>`;
    }
    if (data.mount_type) {
        specHtml += `<span class="info-box power-conn">Mount: ${escapeHtml(String(data.mount_type))}</span>`;
    }
    if (typeof data.screenSizeInches === 'number') {
        specHtml += `<span class="info-box video-conn">📐 Screen: ${data.screenSizeInches}"</span>`;
    }
    if (typeof data.brightnessNits === 'number') {
        specHtml += `<span class="info-box video-conn">💡 Brightness: ${data.brightnessNits} nits</span>`;
    }
    if (typeof data.wirelessTx === 'boolean') {
        specHtml += `<span class="info-box video-conn">📡 Wireless: ${data.wirelessTx}</span>`;
    }
    if (data.internalController) {
        specHtml += `<span class="info-box fiz-conn">🎛️ Controller: Internal</span>`;
    }
    if (typeof data.torqueNm === 'number') {
        specHtml += `<span class="info-box fiz-conn">⚙️ Torque: ${data.torqueNm} Nm</span>`;
    }
    if (data.power_source) {
        specHtml += `<span class="info-box power-conn">🔌 Power Source: ${escapeHtml(String(data.power_source))}</span>`;
    }

    let extraHtml = '';
    if (Array.isArray(data.power?.batteryPlateSupport) && data.power.batteryPlateSupport.length) {
        const types = data.power.batteryPlateSupport.map(p => {
            const mount = p.mount ? ` (${escapeHtml(p.mount)})` : '';
            return `${escapeHtml(p.type)}${mount}`;
        });
        extraHtml += `<span class="info-box power-conn">Battery Plate: ${types.join(', ')}</span>`;
    }
    if (Array.isArray(data.recordingMedia) && data.recordingMedia.length) {
        const types = data.recordingMedia.map(m => escapeHtml(m.type));
        extraHtml += `<span class="info-box video-conn">Media: ${types.join(', ')}</span>`;
    }
    if (Array.isArray(data.viewfinder) && data.viewfinder.length) {
        const types = data.viewfinder.map(v => escapeHtml(v.type));
        extraHtml += `<span class="info-box video-conn">Viewfinder: ${types.join(', ')}</span>`;
    }
    if (Array.isArray(data.gearTypes) && data.gearTypes.length) {
        const types = data.gearTypes.map(g => escapeHtml(g));
        extraHtml += `<span class="info-box fiz-conn">Gear: ${types.join(', ')}</span>`;
    }
    if (data.connectivity) {
        extraHtml += `<span class="info-box video-conn">Connectivity: ${escapeHtml(String(data.connectivity))}</span>`;
    }
    if (data.notes) {
        extraHtml += `<span class="info-box neutral-conn">Notes: ${escapeHtml(String(data.notes))}</span>`;
    }

    let lensHtml = '';
    if (Array.isArray(data.lensMount)) {
        const boxes = data.lensMount.map(lm => {
            const mount = lm.mount ? ` (${escapeHtml(lm.mount)})` : '';
            return `<span class="info-box neutral-conn">${escapeHtml(lm.type)}${mount}</span>`;
        }).join('');
        if (boxes) lensHtml = `<div class="lens-mount-box">${boxes}</div>`;
    }

    let html = '';
    const section = (label, content) => {
        if (!content) return '';
        return `<div class="info-label">${label}</div>${content}`;
    };

    html += section('Ports', portHtml);
    html += section('Specs', specHtml);
    html += section('Extras', extraHtml);
    if (lensHtml) html += `<div class="info-label">Lens Mount</div>${lensHtml}`;

    return html ? `<div class="connector-summary">${html}</div>` : '';
}

function generatePrintableOverview() {
    const setupName = setupNameInput.value;
    const now = new Date();
    const localeMap = { de: 'de-DE', es: 'es-ES', fr: 'fr-FR', en: 'en-US' };
    const locale = localeMap[currentLang] || 'en-US';
    const dateTimeString = now.toLocaleDateString(locale) + ' ' + now.toLocaleTimeString();
    const t = texts[currentLang];

    let deviceListHtml = '<div class="device-category-container">';
    const sections = {};
    const sectionOrder = [];
    const addToSection = (key, itemHtml) => {
        if (!sections[key]) {
            sections[key] = [];
            sectionOrder.push(key);
        }
        sections[key].push(itemHtml);
    };
    const processSelectForOverview = (selectElement, headingKey, category, subcategory = null) => {
        if (selectElement.value && selectElement.value !== "None") {
            const deviceKey = selectElement.value;
            const deviceName = selectElement.options[selectElement.selectedIndex].text;
            let data;
            if (subcategory) {
                data = devices[category] &&
                       devices[category][subcategory] &&
                       devices[category][subcategory][deviceKey];
            } else {
                data = devices[category] && devices[category][deviceKey];
            }
            const safeName = escapeHtml(deviceName);
            let details = '';
            if (data !== undefined && data !== null) {
                const connectors = generateConnectorSummary(data);
                const infoBoxes =
                    (data.latencyMs !== undefined ? `<div class="info-box video-conn"><strong>Latency:</strong> ${escapeHtml(String(data.latencyMs))}</div>` : '') +
                    (data.frequency ? `<div class="info-box video-conn"><strong>Frequency:</strong> ${escapeHtml(String(data.frequency))}</div>` : '');
                details = connectors + infoBoxes;
            }
            addToSection(headingKey, `<div class="device-block"><strong>${safeName}</strong>${details}</div>`);
        }
    };

    processSelectForOverview(cameraSelect, 'category_cameras', 'cameras');
    processSelectForOverview(monitorSelect, 'category_monitors', 'monitors');
    processSelectForOverview(videoSelect, 'category_video', 'video'); // Original data.js uses 'video', not 'wirelessVideo'
    processSelectForOverview(distanceSelect, 'category_fiz_distance', 'fiz', 'distance');
    motorSelects.forEach(sel => processSelectForOverview(sel, 'category_fiz_motors', 'fiz', 'motors'));
    controllerSelects.forEach(sel => processSelectForOverview(sel, 'category_fiz_controllers', 'fiz', 'controllers'));
    processSelectForOverview(batterySelect, 'category_batteries', 'batteries'); // Handle battery separately for capacity

      sectionOrder.forEach(key => {
          const heading = t[key] || key;
          const icon = overviewSectionIcons[key] || '';
          const iconHtml = icon ? `<span class="category-icon" aria-hidden="true">${icon}</span>` : '';
          const gridClasses = (key === 'category_fiz_motors' || key === 'category_fiz_controllers') ? 'device-block-grid two-column' : 'device-block-grid single-column';
        deviceListHtml += `<div class="device-category"><h3>${iconHtml}${heading}</h3><div class="${gridClasses}">${sections[key].join('')}</div></div>`;
      });
      deviceListHtml += '</div>';

    const breakdownHtml = breakdownListElem.innerHTML;
    const batteryLifeUnitElem = document.getElementById("batteryLifeUnit");
    const resultsHtml = `
        <ul id="breakdownList">${breakdownHtml}</ul>
        <p><strong>${t.totalPowerLabel}</strong> ${totalPowerElem.textContent} W</p>
        <p><strong>${t.totalCurrent144Label}</strong> ${totalCurrent144Elem.textContent} A</p>
        <p><strong>${t.totalCurrent12Label}</strong> ${totalCurrent12Elem.textContent} A</p>
        <p><strong>${t.batteryLifeLabel}</strong> ${batteryLifeElem.textContent} ${batteryLifeUnitElem ? batteryLifeUnitElem.textContent : ''}</p>
        <p><strong>${t.batteryCountLabel}</strong> ${batteryCountElem.textContent}</p>
    `;

    // Get current warning messages with their colors
    let warningHtml = '';
    if (pinWarnElem.textContent.trim() !== '') {
        warningHtml += `<p style="color: ${pinWarnElem.style.color}; font-weight: bold;">${pinWarnElem.textContent}</p>`;
    }
    if (dtapWarnElem.textContent.trim() !== '') {
        warningHtml += `<p style="color: ${dtapWarnElem.style.color}; font-weight: bold;">${dtapWarnElem.textContent}</p>`;
    }

    // REGENERATE BATTERY TABLE HTML WITH BARS FOR OVERVIEW
    let batteryTableHtml = '';
    const totalWatt = parseFloat(totalPowerElem.textContent);
    if (totalWatt > 0) {
        const totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
        const selectedBatteryName = batterySelect.value;
        const camName = cameraSelect.value;
        const plateFilter = getSelectedPlate();
        const supportsB = supportsBMountCamera(camName);
        const bMountCam = plateFilter === 'B-Mount';
        let selectedCandidate = null;
        if (selectedBatteryName && selectedBatteryName !== 'None' && devices.batteries[selectedBatteryName]) {
            const selData = devices.batteries[selectedBatteryName];
            if ((!plateFilter || selData.mount_type === plateFilter) && (supportsB || selData.mount_type !== 'B-Mount')) {
                const pinOK_sel = totalCurrentLow <= selData.pinA;
                const dtapOK_sel = !bMountCam && totalCurrentLow <= selData.dtapA;
                if (pinOK_sel || dtapOK_sel) {
                    const selHours = selData.capacity / totalWatt;
                    let selMethod;
                    if (pinOK_sel && dtapOK_sel) selMethod = 'both pins and D-Tap';
                    else if (pinOK_sel) selMethod = 'pins';
                    else selMethod = 'dtap';
                    selectedCandidate = { name: selectedBatteryName, hours: selHours, method: selMethod };
                }
            }
        }

        const pinsCandidates = [];
        const dtapCandidates = [];
        for (let battName in devices.batteries) {
            if (battName === 'None') continue;
            if (selectedCandidate && battName === selectedCandidate.name) continue;
            const data = devices.batteries[battName];
            if (plateFilter && data.mount_type !== plateFilter) continue;
            if (!plateFilter && !supportsB && data.mount_type === 'B-Mount') continue;
            const canPin = totalCurrentLow <= data.pinA;
            const canDTap = !bMountCam && totalCurrentLow <= data.dtapA;
            if (canPin) {
                const hours = data.capacity / totalWatt;
                const method = canDTap ? 'both pins and D-Tap' : 'pins';
                pinsCandidates.push({ name: battName, hours, method });
            } else if (canDTap) {
                const hours = data.capacity / totalWatt;
                dtapCandidates.push({ name: battName, hours, method: 'dtap' });
            }
        }

        pinsCandidates.sort((a, b) => b.hours - a.hours);
        dtapCandidates.sort((a, b) => b.hours - a.hours);

        let tableHtml = `<h2>${t.batteryComparisonHeading}</h2><table border="1"><tr><th>${t.batteryTableLabel}</th><th>${t.runtimeLabel}</th><th></th></tr>`;

        if ((selectedCandidate ? 1 : 0) + pinsCandidates.length + dtapCandidates.length === 0) {
            tableHtml += `<tr><td colspan="3">${t.noBatterySupports}</td></tr>`;
        } else {
            const allCandidatesForMax = (selectedCandidate ? [selectedCandidate] : []).concat(pinsCandidates, dtapCandidates);
            const maxHours = Math.max(...allCandidatesForMax.map(c => c.hours)) || 1;
            const getBarClass = method => method === 'pins' ? 'bar bar-pins-only' : 'bar';
            const getMethodLabel = method => {
                if (method === 'pins') return `<span style="color:#FF9800;">${texts[currentLang].methodPinsOnly}</span>`;
                if (method === 'both pins and D-Tap') return `<span style="color:#4CAF50;">${texts[currentLang].methodPinsAndDTap}</span>`;
                return method;
            };
            if (selectedCandidate) {
                tableHtml += `<tr class="selectedBatteryRow">
                                <td>${escapeHtml(selectedCandidate.name)}</td>
                                <td>${selectedCandidate.hours.toFixed(2)}h (${getMethodLabel(selectedCandidate.method)})</td>
                                <td>
                                  <div class="barContainer">
                                    <div class="${getBarClass(selectedCandidate.method)}" style="width: ${(selectedCandidate.hours / maxHours) * 100}%;"></div>
                                  </div>
                                </td>
                              </tr>`;
            }
            pinsCandidates.forEach(candidate => {
                if (selectedCandidate && candidate.name === selectedCandidate.name) return;
                tableHtml += `<tr>
                                <td>${escapeHtml(candidate.name)}</td>
                                <td>${candidate.hours.toFixed(2)}h (${getMethodLabel(candidate.method)})</td>
                                <td>
                                  <div class="barContainer">
                                    <div class="${getBarClass(candidate.method)}" style="width: ${(candidate.hours / maxHours) * 100}%;"></div>
                                  </div>
                                </td>
                              </tr>`;
            });
            dtapCandidates.forEach(candidate => {
                if (selectedCandidate && candidate.name === selectedCandidate.name) return;
                const alreadyInPins = pinsCandidates.some(p => p.name === candidate.name);
                if (!alreadyInPins) {
                    tableHtml += `<tr>
                                    <td>${escapeHtml(candidate.name)}</td>
                                    <td>${candidate.hours.toFixed(2)}h (${getMethodLabel(candidate.method)})</td>
                                    <td>
                                      <div class="barContainer">
                                        <div class="${getBarClass(candidate.method)}" style="width: ${(candidate.hours / maxHours) * 100}%;"></div>
                                      </div>
                                    </td>
                                  </tr>`;
                }
            });
        }
        tableHtml += `</table>`;
        batteryTableHtml = tableHtml;
    } else {
        batteryTableHtml = '';
    }
    
    const safeSetupName = escapeHtml(setupName);
    const diagramCss = getDiagramCss(false);

    let diagramAreaHtml = '';
    if (setupDiagramContainer) {
      const areaClone = setupDiagramContainer.cloneNode(true);
      const svg = areaClone.querySelector('svg');
      if (svg) {
        const style = document.createElement('style');
        style.textContent = diagramCss;
        svg.insertBefore(style, svg.firstChild);
      }
      diagramAreaHtml = areaClone.outerHTML;
    }
    const diagramLegendHtml = diagramLegend ? diagramLegend.outerHTML : '';
    const diagramControlsHtml = document.querySelector('.diagram-controls') ? document.querySelector('.diagram-controls').outerHTML : '';
    const diagramHintHtml = diagramHint ? diagramHint.outerHTML : '';
    const diagramDescHtml = document.getElementById('diagramDesc') ? document.getElementById('diagramDesc').outerHTML : '';
    const diagramSectionHtml = diagramAreaHtml ? `<section id="setupDiagram"><h2>${t.setupDiagramHeading}</h2>${diagramDescHtml}${diagramAreaHtml}${diagramLegendHtml}${diagramControlsHtml}${diagramHintHtml}</section>` : '';
    const diagramSectionHtmlWithBreak = diagramSectionHtml ? `<div class="page-break"></div>${diagramSectionHtml}` : '';
    const batteryTableHtmlWithBreak = batteryTableHtml ? `<div class="page-break"></div>${batteryTableHtml}` : '';

    const overviewHtml = `
        <div id="overviewDialogContent">
            <button id="closeOverviewBtn" class="back-btn">${t.backToAppBtn}</button>
            <button onclick="window.print()" class="print-btn">Print</button>
            <h1>${t.overviewTitle}</h1>
            <p><strong>${t.setupNameLabel}</strong> ${safeSetupName}</p>
            <p><em>Generated on: ${dateTimeString}</em></p>

            <h2>${t.deviceSelectionHeading}</h2>
            ${deviceListHtml}

            <div class="page-break"></div>

            <h2>${t.resultsHeading}</h2>
            ${resultsHtml}
            ${warningHtml}

            ${diagramSectionHtmlWithBreak}
            ${batteryTableHtmlWithBreak}
        </div>
    `;

    const overviewDialog = document.getElementById('overviewDialog');
    overviewDialog.innerHTML = overviewHtml;
    const content = overviewDialog.querySelector('#overviewDialogContent');
    ['dark-mode', 'pink-mode'].forEach(cls => {
        if (document.body.classList.contains(cls)) {
            content.classList.add(cls);
        }
    });
    const closeBtn = overviewDialog.querySelector('#closeOverviewBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => overviewDialog.close());
    }
    if (typeof overviewDialog.showModal === 'function') {
        overviewDialog.showModal();
    } else {
        overviewDialog.setAttribute('open', '');
    }
    window.addEventListener('afterprint', () => { overviewDialog.close(); }, { once: true });
}


// --- SESSION STATE HANDLING ---
function saveCurrentSession() {
  const state = {
    setupName: setupNameInput ? setupNameInput.value : '',
    setupSelect: setupSelect ? setupSelect.value : '',
    camera: cameraSelect ? cameraSelect.value : '',
    monitor: monitorSelect ? monitorSelect.value : '',
    video: videoSelect ? videoSelect.value : '',
    motors: motorSelects.map(sel => sel ? sel.value : ''),
    controllers: controllerSelects.map(sel => sel ? sel.value : ''),
    distance: distanceSelect ? distanceSelect.value : '',
    batteryPlate: batteryPlateSelect ? batteryPlateSelect.value : '',
    battery: batterySelect ? batterySelect.value : ''
  };
  storeSession(state);
}

function restoreSessionState() {
  const state = loadSession();
  if (!state) return;
  if (setupNameInput) setupNameInput.value = state.setupName || '';
  if (cameraSelect && state.camera) cameraSelect.value = state.camera;
  updateBatteryPlateVisibility();
  if (batteryPlateSelect && state.batteryPlate) batteryPlateSelect.value = state.batteryPlate;
  updateBatteryOptions();
  if (monitorSelect && state.monitor) monitorSelect.value = state.monitor;
  if (videoSelect && state.video) videoSelect.value = state.video;
  if (distanceSelect && state.distance) distanceSelect.value = state.distance;
  if (Array.isArray(state.motors)) {
    state.motors.forEach((val, i) => { if (motorSelects[i]) motorSelects[i].value = val; });
  }
  if (Array.isArray(state.controllers)) {
    state.controllers.forEach((val, i) => { if (controllerSelects[i]) controllerSelects[i].value = val; });
  }
  if (batterySelect && state.battery) batterySelect.value = state.battery;
  if (setupSelect && state.setupSelect) setupSelect.value = state.setupSelect;
}

function applySharedSetup(shared) {
  try {
    const decoded = JSON.parse(LZString.decompressFromEncodedURIComponent(shared));
    if (decoded.changedDevices) {
      applyDeviceChanges(decoded.changedDevices);
    }
    if (setupNameInput && decoded.setupName) setupNameInput.value = decoded.setupName;
    if (cameraSelect && decoded.camera) cameraSelect.value = decoded.camera;
    updateBatteryPlateVisibility();
    if (batteryPlateSelect && decoded.batteryPlate) batteryPlateSelect.value = decoded.batteryPlate;
    updateBatteryOptions();
    if (monitorSelect && decoded.monitor) monitorSelect.value = decoded.monitor;
    if (videoSelect && decoded.video) videoSelect.value = decoded.video;
    if (distanceSelect && decoded.distance) distanceSelect.value = decoded.distance;
    if (Array.isArray(decoded.motors)) {
      decoded.motors.forEach((val, i) => { if (motorSelects[i]) motorSelects[i].value = val; });
    }
    if (Array.isArray(decoded.controllers)) {
      decoded.controllers.forEach((val, i) => { if (controllerSelects[i]) controllerSelects[i].value = val; });
    }
    if (batterySelect && decoded.battery) batterySelect.value = decoded.battery;
    saveCurrentSession();
    if (Array.isArray(decoded.feedback) && decoded.feedback.length) {
      const key = getCurrentSetupKey();
      const fb = loadFeedbackSafe();
      fb[key] = (fb[key] || []).concat(decoded.feedback);
      saveFeedbackSafe(fb);
    }
  } catch (e) {
    console.error('Failed to apply shared setup', e);
    alert(texts[currentLang].invalidSharedLink);
  }
}

function applySharedSetupFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const shared = params.get('shared');
  if (!shared) return;
  applySharedSetup(shared);
  if (window.history && window.history.replaceState) {
    history.replaceState(null, '', window.location.pathname);
  }
}

// --- EVENT LISTENERS FÜR NEUBERECHNUNG ---

// Sicherstellen, dass Änderungen an den Selects auch neu berechnen
[cameraSelect, monitorSelect, videoSelect, distanceSelect, batterySelect, batteryPlateSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", updateCalculations); });
if (cameraSelect) {
  cameraSelect.addEventListener('change', () => {
    updateBatteryPlateVisibility();
    updateBatteryOptions();
  });
}
if (batteryPlateSelect) batteryPlateSelect.addEventListener('change', updateBatteryOptions);

motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", updateCalculations); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", updateCalculations); });

[cameraSelect, monitorSelect, videoSelect, distanceSelect, batterySelect, batteryPlateSelect, setupSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentSession); });
motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentSession); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentSession); });
if (setupNameInput) setupNameInput.addEventListener("input", saveCurrentSession);

// Enable Save button only when a setup name is entered and allow Enter to save
if (setupNameInput && saveSetupBtn) {
  const toggleSaveSetupBtn = () => {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  };
  toggleSaveSetupBtn();
  setupNameInput.addEventListener("input", toggleSaveSetupBtn);
  setupNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !saveSetupBtn.disabled) {
      saveSetupBtn.click();
    }
  });
}

// Dark mode handling
function updateThemeColor(isDark) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', isDark ? '#1c1c1e' : '#ffffff');
  }
}

function applyDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add("dark-mode");
    document.documentElement.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    document.documentElement.classList.remove("light-mode");
    if (darkModeToggle) {
      darkModeToggle.textContent = "☀️";
      darkModeToggle.setAttribute("aria-pressed", "true");
    }
  } else {
    document.body.classList.remove("dark-mode");
    document.documentElement.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    document.documentElement.classList.add("light-mode");
    if (darkModeToggle) {
      darkModeToggle.textContent = "🌙";
      darkModeToggle.setAttribute("aria-pressed", "false");
    }
  }
  updateThemeColor(enabled);
}

let darkModeEnabled = false;
try {
  const stored = localStorage.getItem("darkMode");
  if (stored !== null) {
    darkModeEnabled = stored === "true";
  } else if (typeof window.matchMedia === "function") {
    darkModeEnabled = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
} catch (e) {
  console.warn("Could not load dark mode preference", e);
}
applyDarkMode(darkModeEnabled);

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    darkModeEnabled = !document.body.classList.contains("dark-mode");
    applyDarkMode(darkModeEnabled);
    try {
      localStorage.setItem("darkMode", darkModeEnabled);
    } catch (e) {
      console.warn("Could not save dark mode preference", e);
    }
  });
}

// Pink mode handling
function applyPinkMode(enabled) {
  if (enabled) {
    document.body.classList.add("pink-mode");
    if (pinkModeToggle) {
      pinkModeToggle.textContent = "🦄";
      pinkModeToggle.setAttribute("aria-pressed", "true");
    }
  } else {
    document.body.classList.remove("pink-mode");
    if (pinkModeToggle) {
      pinkModeToggle.textContent = "🐴";
      pinkModeToggle.setAttribute("aria-pressed", "false");
    }
  }
}

let pinkModeEnabled = false;
try {
  pinkModeEnabled = localStorage.getItem("pinkMode") === "true";
} catch (e) {
  console.warn("Could not load pink mode preference", e);
}
applyPinkMode(pinkModeEnabled);

if (pinkModeToggle) {
  pinkModeToggle.addEventListener("click", () => {
    pinkModeEnabled = !document.body.classList.contains("pink-mode");
    applyPinkMode(pinkModeEnabled);
    try {
      localStorage.setItem("pinkMode", pinkModeEnabled);
    } catch (e) {
      console.warn("Could not save pink mode preference", e);
    }
  });
}

function exportDiagramSvg() {
  if (!setupDiagramContainer) return '';
  const svgEl = setupDiagramContainer.querySelector('svg');
  if (!svgEl) return '';

  const clone = svgEl.cloneNode(true);
  const labels = svgEl.querySelectorAll('.edge-label');
  const cloneLabels = clone.querySelectorAll('.edge-label');
  labels.forEach((lbl, idx) => {
    if (cloneLabels[idx]) {
      // innerHTML isn't consistently supported for SVG <text> elements in all browsers,
      // which could result in empty connection labels in the exported SVG. Using
      // textContent ensures the label text is preserved across environments.
      cloneLabels[idx].textContent = lbl.textContent;
    }
  });
  const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  // Always export using the bright theme regardless of the current mode
  style.textContent = getDiagramCss(false);
  clone.insertBefore(style, clone.firstChild);
  const serializer = new XMLSerializer();
  return serializer.serializeToString(clone);
}

if (downloadDiagramBtn) {
  downloadDiagramBtn.addEventListener('click', (e) => {
    const source = exportDiagramSvg();
    if (!source) return;

    navigator.clipboard.writeText(source).catch(() => {});

    const saveSvg = () => {
      const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'setup-diagram.svg';
      a.click();
      URL.revokeObjectURL(url);
    };

    if (e.shiftKey) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'setup-diagram.jpg';
          a.click();
          URL.revokeObjectURL(url);
        }, 'image/jpeg', 0.95);
      };
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
    } else {
      saveSvg();
    }
  });
}

if (gridSnapToggleBtn) {
  gridSnapToggleBtn.addEventListener('click', () => {
    gridSnap = !gridSnap;
    gridSnapToggleBtn.classList.toggle('active', gridSnap);
    if (setupDiagramContainer) {
      setupDiagramContainer.classList.toggle('grid-snap', gridSnap);
    }
  });
}

if (helpButton && helpDialog) {
  const filterHelp = () => {
    if (!helpSearch) return;
    const query = helpSearch.value.trim().toLowerCase();
    const sections = Array.from(
      helpDialog.querySelectorAll('[data-help-section]')
    );
    const items = Array.from(helpDialog.querySelectorAll('.faq-item'));
    const elements = sections.concat(items);
    let anyVisible = false;
    const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = query ? new RegExp(`(${escapeRegExp(query)})`, 'ig') : null;
    elements.forEach(el => {
      if (!el.dataset.origHtml) {
        el.dataset.origHtml = el.innerHTML;
      } else {
        el.innerHTML = el.dataset.origHtml;
      }
      const text = el.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        if (query && regex) {
          el.innerHTML = el.innerHTML.replace(regex, '<mark>$1</mark>');
        }
        el.removeAttribute('hidden');
        anyVisible = true;
      } else {
        el.setAttribute('hidden', '');
      }
    });
    if (helpNoResults) {
      if (anyVisible) {
        helpNoResults.setAttribute('hidden', '');
      } else {
        helpNoResults.removeAttribute('hidden');
      }
    }
    if (helpSearchClear) {
      if (query) {
        helpSearchClear.removeAttribute('hidden');
      } else {
        helpSearchClear.setAttribute('hidden', '');
      }
    }
  };

  const openHelp = () => {
    helpDialog.removeAttribute('hidden');
    if (helpSearch) {
      helpSearch.value = '';
      filterHelp();
      helpSearch.focus();
    } else {
      helpDialog.focus();
    }
  };

  const closeHelp = () => {
    helpDialog.setAttribute('hidden', '');
    helpButton.focus();
  };

  const toggleHelp = () => {
    if (helpDialog.hasAttribute('hidden')) {
      openHelp();
    } else {
      closeHelp();
    }
  };

  let hoverHelpActive = false;
  let hoverHelpTooltip;

  const stopHoverHelp = () => {
    hoverHelpActive = false;
    if (hoverHelpTooltip) {
      hoverHelpTooltip.remove();
      hoverHelpTooltip = null;
    }
    document.body.style.cursor = '';
    document.body.classList.remove('hover-help-active');
  };

  const startHoverHelp = () => {
    hoverHelpActive = true;
    closeHelp();
    document.body.style.cursor = 'help';
    document.body.classList.add('hover-help-active');
    hoverHelpTooltip = document.createElement('div');
    hoverHelpTooltip.id = 'hoverHelpTooltip';
    hoverHelpTooltip.setAttribute('hidden', '');
    document.body.appendChild(hoverHelpTooltip);
  };

  document.addEventListener('mouseover', e => {
    if (!hoverHelpActive || !hoverHelpTooltip) return;
    const el = e.target.closest(
      '[data-help], [aria-label], [title], [aria-labelledby], [alt]'
    );
    if (!el || el.tagName === 'SECTION') {
      hoverHelpTooltip.setAttribute('hidden', '');
      return;
    }
    let text =
      el.getAttribute('data-help') ||
      el.getAttribute('aria-label') ||
      el.getAttribute('title');
    if (!text) {
      const labelled = el.getAttribute('aria-labelledby');
      if (labelled) {
        const labelEl = document.getElementById(labelled);
        if (labelEl)
          text =
            labelEl.getAttribute('data-help') ||
            labelEl.getAttribute('aria-label') ||
            labelEl.getAttribute('title') ||
            labelEl.textContent.trim();
      }
    }
    if (!text) text = el.getAttribute('alt');
    if (!text) {
      hoverHelpTooltip.setAttribute('hidden', '');
      return;
    }
    hoverHelpTooltip.textContent = text.slice(0, 200);
    const rect = el.getBoundingClientRect();
    hoverHelpTooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
    hoverHelpTooltip.style.left = `${rect.left + window.scrollX}px`;
    hoverHelpTooltip.removeAttribute('hidden');
  });

  // Prevent interacting with controls like dropdowns while hover help is active
  document.addEventListener(
    'mousedown',
    e => {
      if (hoverHelpActive) {
        e.preventDefault();
      }
    },
    true
  );

  document.addEventListener('click', e => {
    if (hoverHelpActive) {
      e.preventDefault();
      stopHoverHelp();
    }
  });

  if (hoverHelpButton) {
    hoverHelpButton.addEventListener('click', e => {
      e.stopPropagation();
      startHoverHelp();
    });
  }

  helpButton.addEventListener('click', toggleHelp);
  if (closeHelpBtn) closeHelpBtn.addEventListener('click', closeHelp);
  if (helpSearch) helpSearch.addEventListener('input', filterHelp);
  if (helpSearchClear) helpSearchClear.addEventListener('click', () => {
    if (helpSearch) {
      helpSearch.value = '';
      filterHelp();
      helpSearch.focus();
    }
  });

  document.addEventListener('keydown', e => {
    const tag = document.activeElement.tagName;
    const isTextField = tag === 'INPUT' || tag === 'TEXTAREA';
    if (hoverHelpActive && e.key === 'Escape') {
      stopHoverHelp();
    } else if (e.key === 'Escape' && !helpDialog.hasAttribute('hidden')) {
      closeHelp();
    } else if (
      e.key === 'F1' ||
      ((e.key === '/' || e.key === '?') && (e.ctrlKey || e.metaKey))
    ) {
      e.preventDefault();
      toggleHelp();
    } else if ((e.key === '?' || e.key.toLowerCase() === 'h') && !isTextField) {
      toggleHelp();
    } else if (e.key.toLowerCase() === 'd' && !isTextField) {
      darkModeEnabled = !document.body.classList.contains('dark-mode');
      applyDarkMode(darkModeEnabled);
      try {
        localStorage.setItem('darkMode', darkModeEnabled);
      } catch (err) {
        console.warn('Could not save dark mode preference', err);
      }
    } else if (e.key.toLowerCase() === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (saveSetupBtn && !saveSetupBtn.disabled) {
        saveSetupBtn.click();
      }
    } else if (e.key.toLowerCase() === 'p' && !isTextField) {
      pinkModeEnabled = !document.body.classList.contains('pink-mode');
      applyPinkMode(pinkModeEnabled);
      try {
        localStorage.setItem('pinkMode', pinkModeEnabled);
      } catch (err) {
        console.warn('Could not save pink mode preference', err);
      }
    }
  });

  helpDialog.addEventListener('click', e => {
    if (e.target === helpDialog) closeHelp();
  });
}

// Initial calculation and language set after DOM is ready
// Initialize immediately if DOM is already loaded (e.g. when scripts are
// injected after `DOMContentLoaded` fired). Otherwise wait for the event.

function isRunningPWA() {
  return (
    (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
    window.navigator.standalone === true
  );
}

function initApp() {
  if (sharedLinkRow) {
    if (isRunningPWA()) {
      sharedLinkRow.classList.remove('hidden');
    } else {
      sharedLinkRow.classList.add('hidden');
    }
  }
  populateEnvironmentDropdowns();
  setLanguage(currentLang);
  resetDeviceForm();
  restoreSessionState();
  applySharedSetupFromUrl();
  updateCalculations();
}

function populateEnvironmentDropdowns() {
  const tempSelect = document.getElementById('fbTemperature');
  if (tempSelect) {
    const emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    tempSelect.appendChild(emptyOpt);
    for (let i = -20; i <= 50; i++) {
      const opt = document.createElement('option');
      opt.value = String(i);
      opt.textContent = i;
      tempSelect.appendChild(opt);
    }
  }

}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

// Export functions for testing in Node environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    setLanguage,
    updateCalculations,
    setBatteryPlates,
    getBatteryPlates,
    setRecordingMedia,
    getRecordingMedia,
    applyDarkMode,
    applyPinkMode,
    generatePrintableOverview,
    applySharedSetupFromUrl,
    applySharedSetup,
    updateBatteryPlateVisibility,
    updateBatteryOptions,
    renderSetupDiagram,
    enableDiagramInteractions,
    updateDiagramLegend,
    cameraFizPort,
    controllerCamPort,
    detectBrand,
    connectionLabel,
    generateConnectorSummary,
    exportDiagramSvg,
    fixPowerInput,
    ensureList,
    normalizeVideoType,
    normalizeFizConnectorType,
    normalizeViewfinderType,
    normalizePowerPortType,
    getCurrentSetupKey,
    renderFeedbackTable,
    clearAllFilters,
  };
}
