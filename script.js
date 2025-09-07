// script.js – Main logic for the Cine List app
/* global texts, categoryNames, gearItems, loadSessionState, saveSessionState, loadProject, saveProject, deleteProject */

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

let deviceSchema;
try {
  deviceSchema = require('./schema.json');
} catch {
  if (typeof fetch === 'function') {
    fetch('schema.json').then(r => r.json()).then(d => { deviceSchema = d; });
  } else {
    deviceSchema = {};
  }
}

var generatePrintableOverview;
try {
  ({ generatePrintableOverview } = require('./overview.js'));
} catch {
  // overview generation not needed in test environments without module support
}

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}

/**
 * Initialize the offline status indicator.
 *
 * Looks for an element with the id `offlineIndicator` and toggles its
 * visibility based on the browser's online state. If the element is not
 * found, the function quietly does nothing.
 */
function setupOfflineIndicator() {
  const offlineIndicator = document.getElementById('offlineIndicator');
  if (!offlineIndicator) return;
  const updateOnlineStatus = () => {
    offlineIndicator.style.display = navigator.onLine ? 'none' : 'block';
  };
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();
}

if (typeof window !== 'undefined') {
  setupOfflineIndicator();
}

/**
 * Escape a string for safe insertion into HTML.
 *
 * The helper delays touching the DOM until first use to avoid
 * ReferenceErrors in environments where `document` is defined as an
 * uninitialised `let` binding (e.g. Safari). When no DOM is present the
 * original string is returned unchanged.
 *
 * @param {string} str - Text that may contain HTML characters.
 * @returns {string} The escaped string.
 */
let escapeDiv;
function escapeHtml(str) {
  if (!escapeDiv && typeof globalThis !== 'undefined' && globalThis.document) {
    escapeDiv = globalThis.document.createElement('div');
  }
  if (!escapeDiv) return String(str);
  escapeDiv.textContent = str;
  return escapeDiv.innerHTML;
}

/**
 * Copy text to the system clipboard with fallbacks for older browsers.
 *
 * Uses the modern Clipboard API when available and falls back to the legacy
 * `document.execCommand('copy')` approach otherwise. The promise rejects when
 * copying fails in all supported mechanisms.
 *
 * @param {string} text - The text to copy.
 * @returns {Promise<void>} Resolves when the text has been copied.
 */
function copyTextToClipboard(text) {
  if (navigator?.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    if (!globalThis.document) {
      reject(new Error('No document available'));
      return;
    }
    const textarea = globalThis.document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    globalThis.document.body.appendChild(textarea);
    textarea.select();
    try {
      const successful = globalThis.document.execCommand('copy');
      if (successful) {
        resolve();
      } else {
        reject(new Error('execCommand failed'));
      }
    } catch (err) {
      reject(err);
    } finally {
      globalThis.document.body.removeChild(textarea);
    }
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

function storeDevices(deviceData) {
  saveDeviceData(deviceData);
}

function loadSession() {
  return typeof loadSessionState === 'function' ? loadSessionState() : null;
}

function storeSession(state) {
  if (typeof saveSessionState === 'function') {
    saveSessionState(state);
  }
}

/**
 * Toggle a dialog element's visibility, gracefully handling browsers that do
 * not support the dialog `showModal` or `close` APIs. When those methods are
 * unavailable the function falls back to manipulating the `open` attribute
 * directly.
 *
 * @param {HTMLDialogElement} dialog - The dialog to operate on.
 * @param {boolean} shouldOpen - Whether the dialog should be opened or
 *   closed.
 */
function toggleDialog(dialog, shouldOpen) {
  if (!dialog) return;
  if (shouldOpen) {
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  } else if (typeof dialog.close === 'function') {
    dialog.close();
  } else {
    dialog.removeAttribute('open');
  }
}

/**
 * Open a dialog element, falling back to setting the `open` attribute when
 * the `showModal` method is unavailable.
 *
 * @param {HTMLDialogElement} dialog - The dialog to open.
 */
function openDialog(dialog) {
  toggleDialog(dialog, true);
}

/**
 * Close a dialog element, removing the `open` attribute if the `close`
 * method is not supported.
 *
 * @param {HTMLDialogElement} dialog - The dialog to close.
 */
function closeDialog(dialog) {
  toggleDialog(dialog, false);
}

/**
 * Memoize a normalisation function for repeated lookups.
 *
 * The provided function receives both the original trimmed string and a
 * lowercase key. Results are cached to avoid recomputing normalisations for
 * the same input.
 *
 * @param {(value: string, key: string) => string} fn - Function that performs
 *   normalisation.
 * @returns {(value: string) => string} Wrapped function with memoisation and
 *   empty-string fallback for falsy inputs.
 */
function memoizeNormalization(fn) {
  const cache = new Map();
  return value => {
    if (!value) return '';
    const str = String(value)
      .replace(/[™®]/g, '')
      .trim();
    const key = str.toLowerCase();
    if (!cache.has(key)) cache.set(key, fn(str, key));
    return cache.get(key);
  };
}

const VIDEO_TYPE_PATTERNS = [
  { needles: ['12g'], value: '12G-SDI' },
  { needles: ['6g'], value: '6G-SDI' },
  { needles: ['3g'], value: '3G-SDI' },
  // Accept both "HD-SDI" and "HD SDI" spellings
  { needles: ['hd', 'sdi'], value: '3G-SDI' },
  { needles: ['mini', 'bnc'], value: 'Mini BNC' },
  { needles: ['micro', 'hdmi'], value: 'Micro HDMI' },
  { needles: ['mini', 'hdmi'], value: 'Mini HDMI' },
  { needles: ['hdmi'], value: 'HDMI' },
  { needles: ['displayport'], value: 'DisplayPort' },
  { needles: ['display', 'port'], value: 'DisplayPort' },
  { needles: ['dp'], value: 'DisplayPort' }
];

const normalizeVideoType = memoizeNormalization((_, key) => {
  const match = VIDEO_TYPE_PATTERNS.find(({ needles }) =>
    needles.every(n => key.includes(n))
  );
  return match ? match.value : '';
});

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
  'usb-c': 'USB-C',
  'usb-c (usb 3.2 / 3.1 gen 1)': 'USB-C',
  'usb-c / gigabit ethernet (via adapter)': 'USB-C',
  'active ef mount': 'Active EF mount',
  'lanc (2.5mm stereo mini jack)': 'LANC',
  '2.5 mm sub-mini (lanc)': 'LANC',
  'remote a (2.5mm)': 'REMOTE A connector',
  'remote control terminal': 'REMOTE A connector',
  'remote 8 pin': 'REMOTE B connector'
};

function createMapNormalizer(map) {
  return memoizeNormalization((str, key) => map[key] || str);
}

const normalizeFizConnectorType = createMapNormalizer(FIZ_CONNECTOR_MAP);

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

const normalizeViewfinderType = createMapNormalizer(VIEWFINDER_TYPE_MAP);

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
  'battery slot': 'Battery Slot',
  'usb-c': 'USB-C',
  'usb type-c': 'USB-C',
  'usb-c pd': 'USB-C PD',
  'usb-c (power delivery)': 'USB-C PD',
  'dc input': 'DC IN',
  'weipu sf610/s2 (12vdc) input': 'Weipu SF610/S2',
  '6-pin 1b dc-in / tb50 battery mount': '6-pin 1B DC-IN / TB50'
};

const mapPowerPortOne = createMapNormalizer(POWER_PORT_TYPE_MAP);

function normalizePowerPortType(type) {
  if (!type) return [];
  const toArray = val =>
    mapPowerPortOne(val)
      .split('/')
      .map(p => mapPowerPortOne(p))
      .filter(Boolean);
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

function applyFixPowerInput(collection) {
  if (!collection || typeof collection !== 'object') return;
  Object.values(collection).forEach(fixPowerInput);
}


// Normalize various camera properties so downstream logic works with
// consistent structures and value formats.
function unifyDevices(devicesData) {
  if (!devicesData || typeof devicesData !== 'object') return;
  Object.values(devicesData.cameras || {}).forEach(cam => {
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

  ['monitors', 'video', 'viewfinders'].forEach(key => {
    applyFixPowerInput(devicesData[key]);
  });

  const fizGroups = devicesData.fiz || {};
  ['motors', 'controllers', 'distance'].forEach(key => {
    applyFixPowerInput(fizGroups[key]);
  });

  // Normalize FIZ motors
  Object.values(devicesData.fiz?.motors || {}).forEach(m => {
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
  Object.values(devicesData.fiz?.controllers || {}).forEach(c => {
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

// Store a deep copy of the initial 'devices' data as defined in the device files.
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
  // Merge stored devices with the defaults so that categories missing
  // from saved data (e.g. FIZ) fall back to the built-in definitions.
  const merged = JSON.parse(JSON.stringify(window.defaultDevices));
  for (const [key, value] of Object.entries(storedDevices)) {
    if (key === 'fiz' && value && typeof value === 'object') {
      merged.fiz = merged.fiz || {};
      for (const [sub, subVal] of Object.entries(value)) {
        merged.fiz[sub] = {
          ...(merged.fiz[sub] || {}),
          ...(subVal || {}),
        };
      }
    } else if (merged[key] && typeof merged[key] === 'object') {
      merged[key] = { ...merged[key], ...(value || {}) };
    } else {
      merged[key] = value;
    }
  }
  devices = merged;
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
  for (const [name, info] of Object.entries(devices.batteries)) {
    if (info && info.mount_type === mountType) out[name] = info;
  }
  return out;
}

function getHotswapsByMount(mountType) {
  const out = {};
  for (const [name, info] of Object.entries(devices.batteryHotswaps || {})) {
    if (info && info.mount_type === mountType) out[name] = info;
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

// Collect a list of FIZ connector type strings from a device definition.
function getFizConnectorTypes(device) {
  if (!device) return [];
  if (Array.isArray(device.fizConnectors)) {
    return device.fizConnectors.map(fc => fc.type);
  }
  return device.fizConnector ? [device.fizConnector] : [];
}

function controllerCamPort(name) {
  const isRf = /cforce.*rf/i.test(name) || /RIA-1/i.test(name);
  if (isRf) return 'Cam';
  const c = devices.fiz?.controllers?.[name];
  if (c) {
    if (/UMC-4/i.test(name)) return '3-Pin R/S';
    const connStr = getFizConnectorTypes(c).join(', ');
    if (hasCamConnector(connStr)) return 'Cam';
    if (hasLemo7PinConnector(connStr)) return 'LEMO 7-pin';
  }
  const m = devices.fiz?.motors?.[name];
  if (m) {
    const connStr = getFizConnectorTypes(m).join(', ');
    if (hasCamConnector(connStr)) return 'Cam';
    if (hasLemo7PinConnector(connStr)) return 'LEMO 7-pin';
  }
  if (isArriOrCmotion(name) && !isRf) return 'LBUS';
  return 'FIZ Port';
}

function controllerDistancePort(name) {
  const c = devices.fiz?.controllers?.[name];
  if (/RIA-1/i.test(name) || /UMC-4/i.test(name)) return 'Serial';
  if (getFizConnectorTypes(c).some(type => /SERIAL/i.test(type))) return 'Serial';
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
  const ps = String(d.powerSource || '').toLowerCase();
  if (ps.includes('internal battery') && !ps.includes('external')) return false;
  return true;
}


function firstConnector(str) {
  if (!str) return '';
  return str.split(',')[0].trim();
}

/**
 * Returns the first FIZ connector for a device, optionally prioritizing
 * connectors that match a set of regular expressions. This consolidates the
 * repeated logic for choosing between `fizConnector` and `fizConnectors` while
 * keeping any existing preference order.
 *
 * @param {object} device - Device object that may include `fizConnector` or
 *   `fizConnectors`.
 * @param {RegExp[]} [preferredMatchers=[]] - Regex patterns to prioritize.
 * @returns {string} The normalized connector label or an empty string if none
 *   is found.
 */
function getFizPort(device, preferredMatchers = []) {
  if (!device) return '';
  const connectors = Array.isArray(device.fizConnectors)
    ? device.fizConnectors
    : [];
  for (const matcher of preferredMatchers) {
    const match = connectors.find(fc => matcher.test(fc.type));
    if (match) return firstConnector(match.type);
  }
  const portStr = device.fizConnector || connectors[0]?.type;
  return firstConnector(portStr);
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
  if (/UMC-4/i.test(name)) {
    return getFizPort(c, [/LCS/i]) || 'LCS (LEMO 7-pin)';
  }
  const port = getFizPort(c);
  return port || (isArriOrCmotion(name) ? 'LBUS' : 'Proprietary');
}

function motorFizPort(name) {
  const m = devices.fiz?.motors?.[name];
  const port = getFizPort(m);
  return port || (isArriOrCmotion(name) ? 'LBUS' : 'Proprietary');
}

function distanceFizPort(name) {
  const d = devices.fiz?.distance?.[name];
  if (!d) return 'LBUS';
  const port = getFizPort(d, [/LBUS/i, /SERIAL/i]);
  if (port) return port;
  return /preston/i.test(name) ? 'Serial' : 'LBUS';
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
  updateViewfinderSettingsVisibility();
  updateViewfinderExtensionVisibility();
  updateMonitoringConfigurationOptions();
}

function updateViewfinderSettingsVisibility() {
  const cam = devices?.cameras?.[cameraSelect?.value];
  const hasViewfinder = Array.isArray(cam?.viewfinder) && cam.viewfinder.length > 0;
  const config = monitoringConfigurationSelect?.value;
  const show = hasViewfinder && (config === 'Viewfinder only' || config === 'Viewfinder and Onboard');
  if (viewfinderSettingsRow) {
    if (show) {
      viewfinderSettingsRow.classList.remove('hidden');
    } else {
      viewfinderSettingsRow.classList.add('hidden');
      const vfSelect = document.getElementById('viewfinderSettings');
      if (vfSelect) {
        Array.from(vfSelect.options).forEach(o => { o.selected = false; });
      }
    }
  }
}

function updateMonitoringConfigurationOptions() {
  if (!monitoringConfigurationSelect) return;
  const cam = devices?.cameras?.[cameraSelect?.value];
  const hasViewfinder = Array.isArray(cam?.viewfinder) && cam.viewfinder.length > 0;
  const monitorSelected = monitorSelect && monitorSelect.value && monitorSelect.value !== 'None';
  const vfOnlyOption = Array.from(monitoringConfigurationSelect.options || [])
    .find(o => o.value === 'Viewfinder only');
  if (!vfOnlyOption) return;
  const show = hasViewfinder && !monitorSelected;
  vfOnlyOption.hidden = !show;
  if (!show && monitoringConfigurationSelect.value === 'Viewfinder only') {
    monitoringConfigurationSelect.value = hasViewfinder ? 'Viewfinder and Onboard' : 'Onboard Only';
  }
  updateViewfinderSettingsVisibility();
}

function updateViewfinderExtensionVisibility() {
  const cam = devices?.cameras?.[cameraSelect?.value];
  const hasViewfinder = Array.isArray(cam?.viewfinder) && cam.viewfinder.length > 0;
  if (viewfinderExtensionRow) {
    if (hasViewfinder) {
      viewfinderExtensionRow.classList.remove('hidden');
    } else {
      viewfinderExtensionRow.classList.add('hidden');
      const vfExtSel = document.getElementById('viewfinderExtension');
      if (vfExtSel) {
        vfExtSel.value = '';
      }
    }
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
  const currentSwap = hotswapSelect.value;
  const plate = getSelectedPlate();
  const camName = cameraSelect.value;
  const supportsB = supportsBMountCamera(camName);
  let swaps;
  if (plate === 'B-Mount') {
    populateSelect(batterySelect, getBatteriesByMount('B-Mount'), true);
    swaps = getHotswapsByMount('B-Mount');
  } else if (plate === 'V-Mount') {
    populateSelect(batterySelect, getBatteriesByMount('V-Mount'), true);
    swaps = getHotswapsByMount('V-Mount');
  } else {
    let bats = devices.batteries;
    if (!supportsB) {
      bats = Object.fromEntries(Object.entries(bats).filter(([, b]) => b.mount_type !== 'B-Mount'));
    }
    populateSelect(batterySelect, bats, true);
    swaps = devices.batteryHotswaps || {};
    if (!supportsB) {
      swaps = Object.fromEntries(Object.entries(swaps).filter(([, b]) => b.mount_type !== 'B-Mount'));
    }
  }
  if (!/FXLion Nano/i.test(current)) {
    swaps = Object.fromEntries(
      Object.entries(swaps).filter(([name]) => name !== 'FX-Lion NANO Dual V-Mount Hot-Swap Plate')
    );
  }

  // Filter out hotswaps that cannot supply the required current
  const totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
  if (isFinite(totalCurrentLow) && totalCurrentLow > 0) {
    swaps = Object.fromEntries(
      Object.entries(swaps).filter(([, info]) => typeof info.pinA !== 'number' || info.pinA >= totalCurrentLow)
    );
  }

  populateSelect(hotswapSelect, swaps, true);
  if (Array.from(batterySelect.options).some(o => o.value === current)) {
    batterySelect.value = current;
  }
  if (Array.from(hotswapSelect.options).some(o => o.value === currentSwap)) {
    hotswapSelect.value = currentSwap;
  }
  updateBatteryLabel();
}

const BRAND_KEYWORDS = {
  arri: 'arri',
  cmotion: 'cmotion',
  focusbug: 'focusbug',
  tilta: 'tilta',
  preston: 'preston',
  chrosziel: 'chrosziel',
  smallrig: 'smallrig',
  dji: 'dji',
  redrock: 'redrock',
  teradek: 'teradek'
};

function detectBrand(name) {
  if (!name || name === 'None') return null;
  const n = name.toLowerCase();
  for (const [keyword, brand] of Object.entries(BRAND_KEYWORDS)) {
    if (n.includes(keyword)) return brand;
  }
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

  const isAmira = /Arri Amira/i.test(camName);
  const onlyCforceMiniPlus = motors.length > 0 && motors.every(n => {
    const lower = n.toLowerCase();
    return ((lower.includes('cforce mini') && !lower.includes('rf')) || lower.includes('cforce plus'));
  });
  const hasRemoteController = controllers.some(n => /ria-1|umc-4|cforce.*rf/i.test(n)) || motors.some(n => /cforce.*rf/i.test(n));
  if (isAmira && onlyCforceMiniPlus && !hasRemoteController) {
    compatElem.textContent = texts[currentLang].amiraCforceRemoteWarning;
    compatElem.style.color = 'red';
    return;
  }

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

let gearItemTranslations = {};
// Load translations when not already present (mainly for tests)
if (typeof texts === 'undefined') {
  try {
    const translations = require('./translations.js');
    window.texts = translations.texts;
    window.categoryNames = translations.categoryNames;
    window.gearItems = translations.gearItems;
    gearItemTranslations = translations.gearItems || {};
  } catch (e) {
    console.warn('Failed to load translations', e);
  }
} else {
  gearItemTranslations = typeof gearItems !== 'undefined' ? gearItems : {};
}


// Determine initial language (default English)
let currentLang = "en";
let lastRuntimeHours = null;
try {
  const savedLang = localStorage.getItem("language");
  const supported = ["en", "de", "es", "fr", "it"];
  if (savedLang && supported.includes(savedLang)) {
    currentLang = savedLang;
  } else if (typeof navigator !== "undefined") {
    const navLangs = Array.isArray(navigator.languages)
      ? navigator.languages
      : [navigator.language];
    for (const lang of navLangs) {
      const short = String(lang).slice(0, 2).toLowerCase();
      if (supported.includes(short)) {
        currentLang = short;
        break;
      }
    }
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
  // Document title and main heading share the same text
  document.title = texts[lang].appTitle;
  document.getElementById("mainTitle").textContent = texts[lang].appTitle;
  document.getElementById("tagline").textContent = texts[lang].tagline;
  if (skipLink) skipLink.textContent = texts[lang].skipToContent;
  const offlineElem = document.getElementById("offlineIndicator");
  if (offlineElem) offlineElem.textContent = texts[lang].offlineIndicator;
  const impressumElem = document.getElementById("impressumLink");
  if (impressumElem) impressumElem.textContent = texts[lang].impressum;
  const privacyElem = document.getElementById("privacyLink");
  if (privacyElem) privacyElem.textContent = texts[lang].privacy;
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

  generateGearListBtn.setAttribute("title", texts[lang].generateGearListBtn);
  generateGearListBtn.setAttribute("data-help", texts[lang].generateGearListHelp);

  const editProjectBtnElem = document.getElementById("editProjectBtn");
  if (editProjectBtnElem) {
    editProjectBtnElem.textContent = texts[lang].editProjectBtn;
    editProjectBtnElem.setAttribute("title", texts[lang].editProjectBtn);
    editProjectBtnElem.setAttribute("data-help", texts[lang].editProjectBtn);
  }

  shareSetupBtn.setAttribute("title", texts[lang].shareSetupBtn);
  shareSetupBtn.setAttribute("data-help", texts[lang].shareSetupHelp);

  applySharedLinkBtn.setAttribute("title", texts[lang].loadSharedLinkBtn);
  applySharedLinkBtn.setAttribute("data-help", texts[lang].applySharedLinkHelp);

  clearSetupBtn.setAttribute("title", texts[lang].clearSetupBtn);
  clearSetupBtn.setAttribute("data-help", texts[lang].clearSetupHelp);

  runtimeFeedbackBtn.setAttribute("title", texts[lang].runtimeFeedbackBtn);
  runtimeFeedbackBtn.setAttribute("data-help", texts[lang].runtimeFeedbackBtnHelp);
  copySummaryBtn.textContent = texts[lang].copySummaryBtn;
  copySummaryBtn.removeAttribute("disabled");
  copySummaryBtn.setAttribute("title", texts[lang].copySummaryBtn);
  copySummaryBtn.setAttribute("data-help", texts[lang].copySummaryBtnHelp);
  // Update the "-- New Setup --" option text
  if (setupSelect.options.length > 0) {
    setupSelect.options[0].textContent = texts[lang].newSetupOption;
  }
  checkSetupChanged();
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

  const cageLabelElem = document.getElementById("cageLabel");
  if (cageLabelElem) {
    cageLabelElem.textContent = texts[lang].cageLabel;
    cageLabelElem.setAttribute("data-help", texts[lang].cageSelectHelp);
  }

  const distanceLabelElem = document.getElementById("distanceLabel");
  distanceLabelElem.textContent = texts[lang].distanceLabel;
  distanceLabelElem.setAttribute("data-help", texts[lang].distanceSelectHelp);

  const batteryPlateLabelElem = document.getElementById("batteryPlateLabel");
  batteryPlateLabelElem.textContent = texts[lang].batteryPlateLabel;
  batteryPlateLabelElem.setAttribute("data-help", texts[lang].batteryPlateSelectHelp);

  const batteryHotswapLabelElem = document.getElementById("batteryHotswapLabel");
  if (batteryHotswapLabelElem) {
    batteryHotswapLabelElem.textContent = texts[lang].batteryHotswapLabel;
    batteryHotswapLabelElem.setAttribute("data-help", texts[lang].batteryHotswapSelectHelp);
  }

  updateBatteryLabel();
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
  if (hotswapWarnElem)
    hotswapWarnElem.setAttribute("data-help", texts[lang].hotswapWarningHelp);
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
  document.getElementById("category_viewfinders").textContent = texts[lang].category_viewfinders;
  document.getElementById("category_monitors").textContent = texts[lang].category_monitors;
  document.getElementById("category_video").textContent = texts[lang].category_video;
  document.getElementById("category_fiz_motors").textContent = texts[lang].category_fiz_motors;
  document.getElementById("category_fiz_controllers").textContent = texts[lang].category_fiz_controllers;
  document.getElementById("category_fiz_distance").textContent = texts[lang].category_fiz_distance;
  document.getElementById("category_batteries").textContent = texts[lang].category_batteries;
  document.getElementById("category_accessory_batteries").textContent = texts[lang].category_accessory_batteries;
  document.getElementById("category_cables").textContent = texts[lang].category_cables;
  document.getElementById("category_camera_support").textContent = texts[lang].category_camera_support;
  document.getElementById("category_chargers").textContent = texts[lang].category_chargers;
  // Add device form labels and button
  document.getElementById("addDeviceHeading").textContent = texts[lang].addDeviceHeading;
  document.getElementById("categoryLabel").textContent = texts[lang].categoryLabel;
  document.getElementById("subcategoryLabel").textContent = texts[lang].subcategoryLabel;
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
  document.getElementById("viewfinderDetailsHeading").textContent = texts[lang].viewfinderDetailsHeading;
  document.getElementById("viewfinderScreenSizeLabel").textContent = texts[lang].viewfinderScreenSizeLabel;
  document.getElementById("viewfinderBrightnessLabel").textContent = texts[lang].viewfinderBrightnessLabel;
  document.getElementById("viewfinderWattLabel").textContent = texts[lang].viewfinderWattLabel;
  document.getElementById("viewfinderVoltageLabel").textContent = texts[lang].viewfinderVoltageLabel;
  document.getElementById("viewfinderPortTypeLabel").textContent = texts[lang].viewfinderPortTypeLabel;
  document.getElementById("viewfinderVideoInputsHeading").textContent = texts[lang].viewfinderVideoInputsHeading;
  document.getElementById("viewfinderVideoOutputsHeading").textContent = texts[lang].viewfinderVideoOutputsHeading;
  document.getElementById("viewfinderVideoInputsLabel").textContent = texts[lang].viewfinderVideoInputsLabel;
  document.getElementById("viewfinderVideoOutputsLabel").textContent = texts[lang].viewfinderVideoOutputsLabel;
  document.getElementById("viewfinderWirelessTxLabel").textContent = texts[lang].viewfinderWirelessTxLabel;
  document.getElementById("viewfinderLatencyLabel").textContent = texts[lang].viewfinderLatencyLabel;
  document.getElementById("videoVideoInputsHeading").textContent = texts[lang].videoVideoInputsHeading;
  document.getElementById("videoVideoInputsLabel").textContent = texts[lang].videoVideoInputsLabel;
  document.getElementById("videoVideoOutputsHeading").textContent = texts[lang].videoVideoOutputsHeading;
  document.getElementById("videoVideoOutputsLabel").textContent = texts[lang].videoVideoOutputsLabel;
  document.getElementById("monitorDetailsHeading").textContent = texts[lang].monitorDetailsHeading;
  document.getElementById("monitorPowerHeading").textContent = texts[lang].monitorPowerHeading;
  // Determine text for Add/Update button
  if (addDeviceBtn.dataset.mode === "edit") {
    addDeviceBtn.textContent = texts[lang].updateDeviceBtn;
    addDeviceBtn.setAttribute('data-help', texts[lang].updateDeviceBtnHelp);
    cancelEditBtn.textContent = texts[lang].cancelEditBtn;
    cancelEditBtn.setAttribute('data-help', texts[lang].cancelEditBtnHelp);
  } else {
    addDeviceBtn.textContent = texts[lang].addDeviceBtn;
    addDeviceBtn.setAttribute('data-help', texts[lang].addDeviceBtnHelp);
    cancelEditBtn.textContent = texts[lang].cancelEditBtn;
    cancelEditBtn.setAttribute('data-help', texts[lang].cancelEditBtnHelp);
  }
  exportBtn.textContent = texts[lang].exportDataBtn;
  exportBtn.setAttribute('data-help', texts[lang].exportDataBtnHelp);
  importDataBtn.textContent = texts[lang].importDataBtn; // New translation for import button
  importDataBtn.setAttribute('data-help', texts[lang].importDataBtnHelp);
  // Placeholders for inputs
  setupNameInput.placeholder = texts[lang].setupNameLabel.replace(":", "");
  newNameInput.placeholder = texts[lang].placeholder_deviceName;
  newWattInput.placeholder = texts[lang].placeholder_watt;
  newCapacityInput.placeholder = texts[lang].placeholder_capacity;
  newPinAInput.placeholder = texts[lang].placeholder_pin;
  newDtapAInput.placeholder = texts[lang].placeholder_dtap;
  cameraVoltageInput.placeholder = texts[lang].placeholder_voltage;
  monitorVoltageInput.placeholder = texts[lang].placeholder_voltage;
  const filterMappings = [
    {input: cameraListFilterInput, label: texts[lang].category_cameras},
    {input: viewfinderListFilterInput, label: texts[lang].category_viewfinders},
    {input: monitorListFilterInput, label: texts[lang].category_monitors},
    {input: videoListFilterInput, label: texts[lang].category_video},
    {input: motorListFilterInput, label: texts[lang].category_fiz_motors},
    {input: controllerListFilterInput, label: texts[lang].category_fiz_controllers},
    {input: distanceListFilterInput, label: texts[lang].category_fiz_distance},
    {input: batteryListFilterInput, label: texts[lang].category_batteries},
    {input: accessoryBatteryListFilterInput, label: texts[lang].category_accessory_batteries},
    {input: cableListFilterInput, label: texts[lang].category_cables},
    {input: cameraSupportListFilterInput, label: texts[lang].category_camera_support},
    {input: chargerListFilterInput, label: texts[lang].category_chargers}
  ];

  filterMappings.forEach(({ input, label }) => {
    if (input) {
      const labelText = label.replace(/[:：]$/, '').toLowerCase();
      const placeholder = texts[lang].placeholder_filter.replace('{item}', labelText);
      input.placeholder = placeholder;
      input.setAttribute('aria-label', placeholder);
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
    toggleDeviceBtn.setAttribute("aria-expanded", "false");
  } else {
    toggleDeviceBtn.textContent = texts[lang].hideDeviceManager;
    toggleDeviceBtn.setAttribute("title", texts[lang].hideDeviceManager);
    toggleDeviceBtn.setAttribute("data-help", texts[lang].hideDeviceManagerHelp);
    toggleDeviceBtn.setAttribute("aria-expanded", "true");
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
  if (reloadButton) {
    reloadButton.setAttribute("title", texts[lang].reloadAppLabel);
    reloadButton.setAttribute("aria-label", texts[lang].reloadAppLabel);
    reloadButton.setAttribute(
      "data-help",
      texts[lang].reloadAppHelp || texts[lang].reloadAppLabel
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
  document.getElementById("exportSetupsBtn").textContent = texts[lang].exportSetupsBtn;
  document.getElementById("importSetupsBtn").textContent = texts[lang].importSetupsBtn;
  document.getElementById("generateOverviewBtn").textContent = texts[lang].generateOverviewBtn;
  document.getElementById("generateGearListBtn").textContent = texts[lang].generateGearListBtn;
  document.getElementById("shareSetupBtn").textContent = texts[lang].shareSetupBtn;
  const exportRevert = document.getElementById("exportAndRevertBtn");
  if (exportRevert) {
    exportRevert.textContent = texts[lang].exportAndRevertBtn;
    exportRevert.setAttribute('data-help', texts[lang].exportAndRevertBtnHelp);
  }

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
    gridSnapToggleBtn.setAttribute("aria-pressed", gridSnap ? "true" : "false");
  }
  if (resetViewBtn) {
    resetViewBtn.innerHTML = `<span class="btn-icon" aria-hidden="true">🔄</span>${texts[lang].resetViewBtn}`;
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
  ensureGearListActions();
  updateDiagramLegend();
}

// Reference elements (DOM Elements)
const cameraSelect    = document.getElementById("cameraSelect");
const monitorSelect   = document.getElementById("monitorSelect");
const videoSelect     = document.getElementById("videoSelect");
const videoDistributionSelect = document.getElementById("videoDistribution");
const cageSelect      = document.getElementById("cageSelect");
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
const hotswapSelect  = document.getElementById("batteryHotswapSelect");
const lensSelect     = document.getElementById("lenses");
const requiredScenariosSelect = document.getElementById("requiredScenarios");
const requiredScenariosSummary = document.getElementById("requiredScenariosSummary");
const remoteHeadOption = requiredScenariosSelect ?
  requiredScenariosSelect.querySelector('option[value="Remote Head"]') : null;
const tripodPreferencesRow = document.getElementById("tripodPreferencesRow");
const tripodPreferencesHeading = document.getElementById("tripodPreferencesHeading");
const tripodHeadBrandSelect = document.getElementById("tripodHeadBrand");
const tripodBowlSelect = document.getElementById("tripodBowl");
const tripodTypesSelect = document.getElementById("tripodTypes");
const tripodSpreaderSelect = document.getElementById("tripodSpreader");
const monitoringConfigurationSelect = document.getElementById("monitoringConfiguration");
const viewfinderSettingsRow = document.getElementById("viewfinderSettingsRow");
const viewfinderExtensionRow = document.getElementById("viewfinderExtensionRow");

const projectFieldIcons = {
  dop: '👤',
  prepDays: '📅',
  shootingDays: '🎬',
  deliveryResolution: '📺',
  recordingResolution: '📹',
  aspectRatio: '🖼️',
  codec: '💾',
  baseFrameRate: '⏱️',
  sensorMode: '🔍',
  requiredScenarios: '🌄',
  lenses: '💎',
  cameraHandle: '🛠️',
  viewfinderExtension: '🔭',
  gimbal: '🌀',
  monitoringSupport: '🧰',
  monitoringConfiguration: '🎛️',
  monitorUserButtons: '🔘',
  cameraUserButtons: '🔘',
  viewfinderUserButtons: '🔘'
};

function updateTripodOptions() {
  const headBrand = tripodHeadBrandSelect ? tripodHeadBrandSelect.value : '';
  const bowl = tripodBowlSelect ? tripodBowlSelect.value : '';
  const headOpts = tripodHeadBrandSelect ? Array.from(tripodHeadBrandSelect.options) : [];
  const bowlOpts = tripodBowlSelect ? Array.from(tripodBowlSelect.options) : [];
  headOpts.forEach(o => { o.hidden = false; });
  bowlOpts.forEach(o => { o.hidden = false; });
  if (headBrand === 'OConnor') {
    const opt = bowlOpts.find(o => o.value === '75mm bowl');
    if (opt) opt.hidden = true;
    if (tripodBowlSelect.value === '75mm bowl') tripodBowlSelect.value = '';
  }
  if (headBrand === 'Sachtler') {
    const opt = bowlOpts.find(o => o.value === 'Mitchell Mount');
    if (opt) opt.hidden = true;
    if (tripodBowlSelect.value === 'Mitchell Mount') tripodBowlSelect.value = '';
  }
  if (bowl === '75mm bowl') {
    const opt = headOpts.find(o => o.value === 'OConnor');
    if (opt) opt.hidden = true;
    if (tripodHeadBrandSelect.value === 'OConnor') tripodHeadBrandSelect.value = '';
  }
  if (bowl === 'Mitchell Mount') {
    const opt = headOpts.find(o => o.value === 'Sachtler');
    if (opt) opt.hidden = true;
    if (tripodHeadBrandSelect.value === 'Sachtler') tripodHeadBrandSelect.value = '';
  }
}

const totalPowerElem      = document.getElementById("totalPower");
const totalCurrent144Elem = document.getElementById("totalCurrent144");
const totalCurrent12Elem  = document.getElementById("totalCurrent12");
const batteryLifeElem     = document.getElementById("batteryLife");
const batteryLifeUnitElem = document.getElementById("batteryLifeUnit");
const batteryLifeLabelElem = document.getElementById("batteryLifeLabel");
const runtimeAverageNoteElem = document.getElementById("runtimeAverageNote");
const batteryCountElem    = document.getElementById("batteryCount");
const pinWarnElem         = document.getElementById("pinWarning");
const dtapWarnElem        = document.getElementById("dtapWarning");
const hotswapWarnElem     = document.getElementById("hotswapWarning");
const powerDiagramElem    = document.getElementById("powerDiagram");
const powerDiagramBarElem = document.getElementById("powerDiagramBar");
const maxPowerTextElem    = document.getElementById("maxPowerText");
const powerDiagramLegendElem = document.getElementById("powerDiagramLegend");

function drawPowerDiagram(availableWatt, segments, maxPinA) {
  if (!powerDiagramElem || !powerDiagramBarElem || !maxPowerTextElem || !powerDiagramLegendElem) return;
  if (!availableWatt || availableWatt <= 0) {
    powerDiagramElem.classList.add("hidden");
    powerDiagramBarElem.innerHTML = "";
    powerDiagramLegendElem.innerHTML = "";
    maxPowerTextElem.textContent = "";
    return;
  }
  powerDiagramElem.classList.remove("hidden");
  powerDiagramBarElem.innerHTML = "";
  powerDiagramLegendElem.innerHTML = "";
  const MAX_WIDTH = 300;
  const total = segments.reduce((sum, s) => sum + s.power, 0);
  const scale = MAX_WIDTH / Math.max(availableWatt, total);
  const limitPos = availableWatt * scale;

  segments.forEach(seg => {
    const width = seg.power * scale;
    if (width <= 0) return;
    const div = document.createElement("div");
    div.className = `segment ${seg.className}`;
    div.style.width = `${width}px`;
    div.setAttribute("title", `${seg.label} ${seg.power.toFixed(1)} W`);
    powerDiagramBarElem.appendChild(div);

    const legendItem = document.createElement("span");
    const swatch = document.createElement("span");
    swatch.className = `swatch ${seg.className}`;
    legendItem.appendChild(swatch);
    legendItem.appendChild(document.createTextNode(seg.label.replace(/:$/, "")));
    powerDiagramLegendElem.appendChild(legendItem);
  });

  if (total > availableWatt) {
    const over = document.createElement("div");
    over.className = "over-usage";
    over.style.left = `${limitPos}px`;
    powerDiagramBarElem.appendChild(over);
  }

  const limit = document.createElement("div");
  limit.className = "limit-line";
  limit.style.left = `${limitPos}px`;
  if (typeof maxPinA === 'number' && maxPinA > 0) {
    const label = document.createElement("span");
    label.className = "limit-label";
    label.textContent = `${texts[currentLang].pinLabel} ${maxPinA} A`;
    limit.appendChild(label);
  }
  powerDiagramBarElem.appendChild(limit);

  powerDiagramElem.classList.toggle("over", total > availableWatt);
  maxPowerTextElem.textContent = `${texts[currentLang].availablePowerLabel} ${availableWatt.toFixed(0)} W`;
  maxPowerTextElem.style.color = total > availableWatt ? "red" : "";
}

const setupSelect     = document.getElementById("setupSelect");
const setupNameInput  = document.getElementById("setupName");
const saveSetupBtn    = document.getElementById("saveSetupBtn");
const deleteSetupBtn  = document.getElementById("deleteSetupBtn");
const clearSetupBtn   = document.getElementById("clearSetupBtn");
const shareSetupBtn   = document.getElementById("shareSetupBtn");
const sharedLinkRow   = document.getElementById("sharedLinkRow");
const sharedLinkInput = document.getElementById("sharedLinkInput");
const applySharedLinkBtn = document.getElementById("applySharedLinkBtn");
const deviceManagerSection = document.getElementById("device-manager");
const toggleDeviceBtn = document.getElementById("toggleDeviceManager");
const cameraListElem  = document.getElementById("cameraList");
const viewfinderListElem = document.getElementById("viewfinderList");
const monitorListElem = document.getElementById("monitorList");
const videoListElem   = document.getElementById("videoList");
const motorListElem   = document.getElementById("motorList");
const controllerListElem = document.getElementById("controllerList");
const distanceListElem   = document.getElementById("distanceList");
const batteryListElem    = document.getElementById("batteryList");
const accessoryBatteryListElem = document.getElementById("accessoryBatteryList");
const cableListElem = document.getElementById("cableList");
const cameraSupportListElem = document.getElementById("cameraSupportList");
const chargerListElem       = document.getElementById("chargerList");
const newCategorySelect  = document.getElementById("newCategory");
const newSubcategorySelect = document.getElementById("newSubcategory");
const subcategoryFieldDiv = document.getElementById("subcategoryField");
const newNameInput    = document.getElementById("newName");
const newWattInput    = document.getElementById("newWatt");
const wattFieldDiv    = document.getElementById("wattField");
const dynamicFieldsDiv = document.getElementById("dynamicFields");
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
const viewfinderFieldsDiv = document.getElementById("viewfinderFields");
const viewfinderScreenSizeInput = document.getElementById("viewfinderScreenSize");
const viewfinderBrightnessInput = document.getElementById("viewfinderBrightness");
const viewfinderWattInput = document.getElementById("viewfinderWatt");
const viewfinderVoltageInput = document.getElementById("viewfinderVoltage");
const viewfinderPortTypeInput = document.getElementById("viewfinderPortType");
const viewfinderVideoInputsContainer = document.getElementById("viewfinderVideoInputsContainer");
const viewfinderVideoOutputsContainer = document.getElementById("viewfinderVideoOutputsContainer");
const viewfinderWirelessTxInput = document.getElementById("viewfinderWirelessTx");
const viewfinderLatencyInput = document.getElementById("viewfinderLatency");
const videoFieldsDiv = document.getElementById("videoFields");
const videoPowerInput = document.getElementById("videoPower");
const videoVideoInputsContainer = document.getElementById("videoVideoInputsContainer");
const videoVideoOutputsContainer = document.getElementById("videoVideoOutputsContainer");
const videoFrequencyInput = document.getElementById("videoFrequency");
const videoLatencyInput = document.getElementById("videoLatency");
const addDeviceForm = wattFieldDiv ? wattFieldDiv.parentNode : null;
function placeWattField(category, data) {
  if (!wattFieldDiv || !addDeviceForm) return;
  const isVideoLike =
    category === "video" ||
    category === "wirelessReceivers" ||
    category === "iosVideo" ||
    (data && (data.videoInputs || data.videoOutputs || data.frequency));
  if (isVideoLike) {
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
const dtapRow         = newDtapAInput ? newDtapAInput.parentElement : null;
const addDeviceBtn    = document.getElementById("addDeviceBtn");
const cancelEditBtn  = document.getElementById("cancelEditBtn");
const exportBtn       = document.getElementById("exportDataBtn");
const exportOutput    = document.getElementById("exportOutput");
const importFileInput = document.getElementById("importFileInput");
const importDataBtn   = document.getElementById("importDataBtn");
const skipLink       = document.getElementById("skipLink");

function getSchemaAttributesForCategory(category) {
  if (!deviceSchema) return [];
  const parts = category.split('.');
  let node = deviceSchema;
  for (const p of parts) {
    node = node && node[p];
    if (!node) return [];
  }
  return Array.isArray(node.attributes) ? node.attributes : [];
}

function clearDynamicFields() {
  if (!dynamicFieldsDiv) return;
  dynamicFieldsDiv.innerHTML = '';
  dynamicFieldsDiv.hidden = true;
}

function buildDynamicFields(category, data = {}) {
  if (!dynamicFieldsDiv) return;
  const attrs = getSchemaAttributesForCategory(category);
  dynamicFieldsDiv.innerHTML = '';
  if (!attrs.length) {
    dynamicFieldsDiv.hidden = true;
    return;
  }
  dynamicFieldsDiv.hidden = false;
  for (const attr of attrs) {
    const row = document.createElement('div');
    row.className = 'form-row';
    const label = document.createElement('label');
    label.setAttribute('for', `attr-${attr}`);
    label.textContent = `${attr}:`;
    const input = document.createElement('input');
    input.type = 'text';
    input.id = `attr-${attr}`;
    input.value = data && data[attr] !== undefined ? data[attr] : '';
    row.appendChild(label);
    row.appendChild(input);
    dynamicFieldsDiv.appendChild(row);
  }
}

function collectDynamicFieldValues(category) {
  const attrs = getSchemaAttributesForCategory(category);
  const result = {};
  for (const attr of attrs) {
    const el = document.getElementById(`attr-${attr}`);
    if (el) {
      const val = el.value.trim();
      if (val !== '') {
        const num = Number(val);
        result[attr] = isNaN(num) ? val : num;
      }
    }
  }
  return result;
}
const languageSelect  = document.getElementById("languageSelect");
const pinkModeToggle  = document.getElementById("pinkModeToggle");
const darkModeToggle  = document.getElementById("darkModeToggle");
const helpButton      = document.getElementById("helpButton");
const reloadButton    = document.getElementById("reloadButton");
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
const copySummaryBtn = document.getElementById("copySummaryBtn");
const runtimeFeedbackBtn = document.getElementById("runtimeFeedbackBtn");
const generateGearListBtn = document.getElementById("generateGearListBtn");
const gearListOutput = document.getElementById("gearListOutput");
const projectRequirementsOutput = document.getElementById("projectRequirementsOutput");

function setEditProjectBtnText() {
  const btn = document.getElementById('editProjectBtn');
  if (btn) {
    btn.textContent = texts[currentLang].editProjectBtn;
    btn.setAttribute('title', texts[currentLang].editProjectBtn);
    btn.setAttribute('data-help', texts[currentLang].editProjectBtn);
  }
}

function ensureEditProjectButton() {
  let container = null;
  if (projectRequirementsOutput && !projectRequirementsOutput.classList.contains('hidden')) {
    container = projectRequirementsOutput;
  } else if (gearListOutput && !gearListOutput.classList.contains('hidden')) {
    container = gearListOutput;
  }
  if (!container) return;
  let btn = document.getElementById('editProjectBtn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'editProjectBtn';
    btn.addEventListener('click', () => {
      populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
      populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
      populateCodecDropdown(currentProjectInfo && currentProjectInfo.codec);
      openDialog(projectDialog);
    });
  }
  const title = container.querySelector('h2');
  if (title && btn.parentElement !== container) {
    title.insertAdjacentElement('afterend', btn);
  } else if (!title && btn.parentElement !== container) {
    container.prepend(btn);
  }
  setEditProjectBtnText();
}

function updateGearListButtonVisibility() {
  const hasGear =
    gearListOutput &&
    !gearListOutput.classList.contains('hidden') &&
    gearListOutput.innerHTML.trim() !== '';
  if (hasGear) {
    generateGearListBtn.classList.add('hidden');
    ensureEditProjectButton();
  } else {
    generateGearListBtn.classList.remove('hidden');
    const btn = document.getElementById('editProjectBtn');
    if (btn) btn.remove();
  }
}

function splitGearListHtml(html) {
  if (!html) return { projectHtml: '', gearHtml: '' };
  // Support legacy storage formats where the gear list and project
  // requirements were saved separately as an object.
  if (typeof html === 'object') {
    const legacyProject = html.projectHtml || html.project || '';
    const legacyGear = html.gearHtml || html.gear || '';
    if (legacyProject || legacyGear) {
      return { projectHtml: legacyProject, gearHtml: legacyGear };
    }
    // Some old exports used a gearList property.
    html = html.gearList || '';
  }
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const title = doc.querySelector('h2');
  const h3s = doc.querySelectorAll('h3');
  const reqHeading = h3s[0];
  const gearHeading = h3s.length > 1 ? h3s[1] : h3s[0];
  const reqGrid = doc.querySelector('.requirements-grid');
  const table = doc.querySelector('.gear-table');
  const titleHtml = title ? title.outerHTML : '';
  const projectHtml = reqHeading && reqGrid ? titleHtml + reqHeading.outerHTML + reqGrid.outerHTML : '';
  const gearHtml = table ? titleHtml + (gearHeading ? gearHeading.outerHTML : '') + table.outerHTML : '';
  return { projectHtml, gearHtml };
}

function describeRequirement(field, value) {
  const val = value || '';
  const parts = [];
  if (field === 'requiredScenarios') {
    const scenarios = val.split(',').map(s => s.trim());
    if (scenarios.includes('Rain Machine') || scenarios.includes('Extreme rain')) {
      parts.push('Adds rain deflector and cables for rain use.');
    }
    if (scenarios.includes('Trinity') || scenarios.includes('Steadicam')) {
      parts.push('Includes D-Tap splitters and extension cables for Steadicam/Trinity rigs.');
    }
    if (scenarios.includes('Gimbal')) {
      parts.push('Adds gimbal rigging and power accessories.');
    }
  } else if (field === 'mattebox') {
    const v = val.toLowerCase();
    if (v.includes('swing')) {
      parts.push('Adds ARRI LMB 4x5 Pro Set and accessories.');
    } else if (v.includes('rod')) {
      parts.push('Adds ARRI LMB 4x5 15mm LWS Set and accessories.');
    } else if (v.includes('clamp')) {
      parts.push('Adds ARRI LMB 4x5 Clamp-On Set with adapter rings.');
    }
  } else if (field === 'cameraHandle') {
    const selections = val.split(',').map(s => s.trim());
    if (selections.includes('Hand Grips')) {
      parts.push('Adds SHAPE Telescopic Handle kit.');
    }
    if (selections.includes('Handle Extension')) {
      parts.push('Adds ARRI HEX-3 handle extension.');
    }
    if (selections.includes('L-Handle')) {
      parts.push('Adds ARRI Handle Extension Set.');
    }
  } else if (field === 'viewfinderExtension') {
    if (val) parts.push('Adds viewfinder extension to support accessories.');
  } else if (field === 'gimbal') {
    if (val) parts.push('Includes selected gimbal and support accessories.');
  } else if (field === 'filter') {
    if (val) parts.push('Adds selected filters to gear list.');
  } else if (field === 'codec') {
    if (val) parts.push('Notes chosen codec for post-production reference.');
  } else if (field === 'monitoringConfiguration') {
    if (val)
      parts.push('Adds default monitors and cable sets for each role.');
  } else if (field === 'videoDistribution') {
    if (val) parts.push('Includes distribution hardware for the selected method.');
  }
  return parts.join(' ');
}

function displayGearAndRequirements(html) {
  const { projectHtml, gearHtml } = splitGearListHtml(html);
  if (projectRequirementsOutput) {
    if (projectHtml) {
      projectRequirementsOutput.innerHTML = projectHtml;
      projectRequirementsOutput.classList.remove('hidden');
      projectRequirementsOutput.querySelectorAll('.requirement-box').forEach(box => {
        const label = box.querySelector('.req-label')?.textContent || '';
        const value = box.querySelector('.req-value')?.textContent || '';
        const field = box.getAttribute('data-field') || '';
        const baseDesc = value ? `${label}: ${value}` : label;
        const logic = describeRequirement(field, value);
        const desc = logic ? `${baseDesc} – ${logic}` : baseDesc;
        box.setAttribute('title', desc);
        box.setAttribute('data-help', desc);
      });
    } else {
      projectRequirementsOutput.innerHTML = '';
      projectRequirementsOutput.classList.add('hidden');
    }
  }
  if (gearListOutput) {
    gearListOutput.innerHTML = gearHtml;
    gearListOutput.classList.remove('hidden');
    const findDevice = name => {
      for (const [catName, cat] of Object.entries(devices)) {
        if (cat && typeof cat === 'object') {
          if (cat[name]) return { info: cat[name], category: catName };
          for (const sub of Object.values(cat)) {
            if (sub && sub[name]) return { info: sub[name], category: catName };
          }
        }
      }
      return { info: null, category: '' };
    };
    gearListOutput.querySelectorAll('.gear-item').forEach(span => {
      const name = span.getAttribute('data-gear-name');
      const { info, category } = findDevice(name);
      const countMatch = span.textContent.trim().match(/^(\d+)x\s+/);
      const count = countMatch ? `${countMatch[1]}x ` : '';
      const parts = [];
      parts.push(`${count}${name}`.trim());
      if (category) parts.push(`Category: ${category}`);
      if (info) {
        let summary = generateConnectorSummary(info);
        summary = summary
          ? summary.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
          : '';
        if (info.notes)
          summary = summary ? `${summary}; Notes: ${info.notes}` : info.notes;
        if (summary) parts.push(summary);
      }
      const desc = parts.join(' – ');
      span.setAttribute('title', desc);
      span.setAttribute('data-help', desc);
    });
  }
  updateGearListButtonVisibility();
}
function getSliderBowlSelect() {
  return gearListOutput ? gearListOutput.querySelector('#gearListSliderBowl') : null;
}
function getSliderBowlValue() {
  const sel = getSliderBowlSelect();
  return sel ? sel.value : '';
}
function setSliderBowlValue(val) {
  const sel = getSliderBowlSelect();
  if (sel) sel.value = val;
}
function getEasyrigSelect() {
  return gearListOutput ? gearListOutput.querySelector('#gearListEasyrig') : null;
}
function getEasyrigValue() {
  const sel = getEasyrigSelect();
  return sel ? sel.value : '';
}
function setEasyrigValue(val) {
  const sel = getEasyrigSelect();
  if (sel) sel.value = val;
}

let currentProjectInfo = null;
let loadedSetupState = null;
let restoringSession = false;

function getCurrentSetupState() {
  const info = projectForm ? collectProjectFormData() : {};
  const projectInfo = Object.values(info).some(v => v) ? info : null;
  return {
    camera: cameraSelect.value,
    monitor: monitorSelect.value,
    video: videoSelect.value,
    cage: cageSelect.value,
    motors: motorSelects.map(sel => sel.value),
    controllers: controllerSelects.map(sel => sel.value),
    distance: distanceSelect.value,
    batteryPlate: batteryPlateSelect.value,
    battery: batterySelect.value,
    batteryHotswap: hotswapSelect.value,
    sliderBowl: getSliderBowlValue(),
    easyrig: getEasyrigValue(),
    projectInfo
  };
}

function checkSetupChanged() {
  if (!saveSetupBtn) return;
  if (
    loadedSetupState &&
    setupSelect.value &&
    setupNameInput.value.trim() === setupSelect.value &&
    JSON.stringify(getCurrentSetupState()) !== JSON.stringify(loadedSetupState)
  ) {
    saveSetupBtn.textContent = texts[currentLang].updateSetupBtn;
  } else {
    saveSetupBtn.textContent = texts[currentLang].saveSetupBtn;
  }
}

const projectDialog = document.getElementById("projectDialog");
const projectForm = document.getElementById("projectForm");
const projectCancelBtn = document.getElementById("projectCancel");
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

if (projectForm) {
    projectForm.querySelectorAll('select[multiple]').forEach(sel => {
        sel.addEventListener('mousedown', e => {
            if (e.target.tagName !== 'OPTION') return;
            e.preventDefault();
            const option = e.target;
            const scrollTop = sel.scrollTop;
            option.selected = !option.selected;
            sel.dispatchEvent(new Event('change'));
            sel.focus();
            sel.scrollTop = scrollTop;
        });
        sel.addEventListener('dblclick', e => {
            e.preventDefault();
        });
    });

    projectForm.querySelectorAll('select').forEach(sel => {
        if (sel.id === 'requiredScenarios') return;
        sel.addEventListener('change', () => updateSelectIconBoxes(sel));
        updateSelectIconBoxes(sel);
    });

    projectForm.querySelectorAll('input, textarea, select').forEach(el => {
        el.addEventListener('change', saveCurrentSession);
    });
}

let manualPositions = {};
let lastDiagramPositions = {};
let gridSnap = false;
let cleanupDiagramInteractions = null;

// CSS used when exporting the setup diagram
const diagramCssLight = `
.node-box{fill:#f0f0f0;stroke:none;}
.node-box.first-fiz{stroke:none;}
.first-fiz-highlight{stroke:url(#firstFizGrad);stroke-width:1px;fill:none;}
.node-icon{font-size:20px;}
.conn{stroke:none;}
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
.node-box{fill:#444;stroke:none;}
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
  viewfinder: "\uD83D\uDC41\uFE0F", // 👁️ viewfinder
  video: "\uD83D\uDCE1", // 📡 wireless video
  motors: "\u2699\uFE0F", // ⚙️ lens motor
  controllers: "\uD83C\uDFAE", // 🎮 game controller
  handle: "\uD83C\uDFAE", // 🎮 handle/grip (same icon as controller)
  // Using a triangular ruler to represent a distance measuring device.
  distance: "\uD83D\uDCD0" // 📐 distance sensor
};

// Map overview section keys to diagram icons
/* exported overviewSectionIcons */
const overviewSectionIcons = {
  category_batteries: diagramIcons.battery,
  category_cameras: diagramIcons.camera,
  category_viewfinders: diagramIcons.viewfinder,
  category_monitors: diagramIcons.monitor,
  category_video: diagramIcons.video,
  category_fiz_motors: diagramIcons.motors,
  category_fiz_controllers: diagramIcons.controllers,
  category_fiz_distance: diagramIcons.distance
};

// Load an image and optionally strip a solid background using Canvas
// List filters for existing device categories
const cameraListFilterInput = document.getElementById("cameraListFilter");
const viewfinderListFilterInput = document.getElementById("viewfinderListFilter");
const monitorListFilterInput = document.getElementById("monitorListFilter");
const videoListFilterInput = document.getElementById("videoListFilter");
const motorListFilterInput = document.getElementById("motorListFilter");
const controllerListFilterInput = document.getElementById("controllerListFilter");
const distanceListFilterInput = document.getElementById("distanceListFilter");
const batteryListFilterInput = document.getElementById("batteryListFilter");
const cameraSupportListFilterInput = document.getElementById("cameraSupportListFilter");
const chargerListFilterInput = document.getElementById("chargerListFilter");
const accessoryBatteryListFilterInput = document.getElementById("accessoryBatteryListFilter");
const cableListFilterInput = document.getElementById("cableListFilter");

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
    if (c && c.powerSource) types.add(c.powerSource);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

function getAllControllerBatteryTypes() {
  const types = new Set();
  Object.values(devices.fiz?.controllers || {}).forEach(c => {
    if (c && c.batteryType) types.add(c.batteryType);
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
    if (d && d.connectionCompatibility) types.add(d.connectionCompatibility);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

function getAllDistanceMethods() {
  const types = new Set();
  Object.values(devices.fiz?.distance || {}).forEach(d => {
    if (d && d.measurementMethod) types.add(d.measurementMethod);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}

function getAllDistanceDisplays() {
  const types = new Set();
  Object.values(devices.fiz?.distance || {}).forEach(d => {
    if (d && d.outputDisplay) types.add(d.outputDisplay);
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
  select.name = 'videoOutput';
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
  select.name = 'monitorVideoInput';
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
  select.name = 'monitorVideoOutput';
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

function createViewfinderVideoInputRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'viewfinder-video-input-select';
  select.name = 'viewfinderVideoInput';
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
    row.after(createViewfinderVideoInputRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (viewfinderVideoInputsContainer && viewfinderVideoInputsContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setViewfinderVideoInputs(list) {
  if (!viewfinderVideoInputsContainer) return;
  viewfinderVideoInputsContainer.innerHTML = '';
  const filtered = filterNoneEntries(list, 'type');
  if (filtered.length) {
    filtered.forEach(item => {
      const t = typeof item === 'string' ? item : item.type || item.portType;
      viewfinderVideoInputsContainer.appendChild(createViewfinderVideoInputRow(t));
    });
  } else {
    viewfinderVideoInputsContainer.appendChild(createViewfinderVideoInputRow());
  }
}

function getViewfinderVideoInputs() {
  if (!viewfinderVideoInputsContainer) return [];
  return Array.from(viewfinderVideoInputsContainer.querySelectorAll('select'))
    .map(sel => ({ type: sel.value }))
    .filter(v => v.type && v.type !== 'None');
}

function clearViewfinderVideoInputs() {
  setViewfinderVideoInputs([]);
}

function createViewfinderVideoOutputRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'viewfinder-video-output-select';
  select.name = 'viewfinderVideoOutput';
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
    row.after(createViewfinderVideoOutputRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (viewfinderVideoOutputsContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setViewfinderVideoOutputs(list) {
  viewfinderVideoOutputsContainer.innerHTML = '';
  const filtered = filterNoneEntries(list, 'type');
  if (filtered.length) {
    filtered.forEach(item => {
      const t = typeof item === 'string' ? item : item.type || item.portType;
      viewfinderVideoOutputsContainer.appendChild(createViewfinderVideoOutputRow(t));
    });
  } else {
    viewfinderVideoOutputsContainer.appendChild(createViewfinderVideoOutputRow());
  }
}

function getViewfinderVideoOutputs() {
  return Array.from(viewfinderVideoOutputsContainer.querySelectorAll('select'))
    .map(sel => ({ type: sel.value }))
    .filter(v => v.type && v.type !== 'None');
}

function clearViewfinderVideoOutputs() {
  setViewfinderVideoOutputs([]);
}

setViewfinderVideoInputs([]);
setViewfinderVideoOutputs([]);

function createVideoInputRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'video-input-select';
  select.name = 'videoInput';
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
  select.name = 'videoIOOutput';
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
  select.name = 'fizConnector';
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
  select.name = 'recordingMediaType';
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
  notesInput.name = 'recordingMediaNotes';
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
  Object.values(devices.viewfinders || {}).forEach(vf => powerInputTypes(vf).forEach(t => types.add(t)));
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
  typeSelect.name = 'batteryPlateType';
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
  mountSelect.name = 'batteryPlateMount';
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
  notesInput.name = 'batteryPlateNotes';
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
  typeSelect.name = 'viewfinderType';
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
  resInput.name = 'viewfinderResolution';
  row.appendChild(createFieldWithLabel(resInput, 'Resolution'));

  const connSelect = document.createElement('select');
  connSelect.className = 'viewfinder-connector-select';
  addEmptyOption(connSelect);
  connSelect.name = 'viewfinderConnector';
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
  notesInput.name = 'viewfinderNotes';
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
  typeSelect.name = 'lensMountType';
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
  mountSelect.name = 'lensMount';
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
  typeSelect.name = 'powerDistType';
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
  voltSelect.name = 'powerDistVoltage';
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
  currSelect.name = 'powerDistCurrent';
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
  wattInput.name = 'powerDistWatt';
  row.appendChild(createFieldWithLabel(wattInput, 'W')); 

  const notesInput = document.createElement('input');
  notesInput.type = 'text';
  notesInput.placeholder = 'Notes';
  notesInput.value = notes;
  notesInput.name = 'powerDistNotes';
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
  typeSelect.name = 'timecodeType';
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
  notesInput.name = 'timecodeNotes';
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
function populateSelect(selectElem, optionsObj = {}, includeNone = true) {
  if (!selectElem) return;
  // Ensure we always work with an object so Object.keys does not throw if
  // `optionsObj` is passed as `null`.
  const opts = optionsObj && typeof optionsObj === "object" ? optionsObj : {};
  selectElem.innerHTML = "";
  if (includeNone) {
    const noneOpt = document.createElement("option");
    noneOpt.value = "None";
    const noneMap = { de: "Keine Auswahl", es: "Ninguno", fr: "Aucun" };
    noneOpt.textContent = noneMap[currentLang] || "None";
    selectElem.appendChild(noneOpt);
  }
  Object.keys(opts)
    .filter(name => name !== "None")
    .sort(localeSort)
    .forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      selectElem.appendChild(opt);
    });
}

function populateMonitorSelect() {
  const filtered = Object.fromEntries(
    Object.entries(devices.monitors || {})
      .filter(([, data]) => !(data.wirelessRX && !data.wirelessTx))
  );
  populateSelect(monitorSelect, filtered, true);
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
    if (typeof timer.unref === 'function') {
      timer.unref();
    }
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
  addInputClearButton(inputElem, callback);
}

function addInputClearButton(inputElem, callback) {
  const label = (texts[currentLang] && texts[currentLang].clearFilter) || "Clear filter";
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = "\u00D7";
  btn.className = "clear-input-btn";
  btn.setAttribute("aria-label", label);
  btn.title = label;
  btn.hidden = true;
  btn.addEventListener("click", () => {
    inputElem.value = "";
    callback();
    inputElem.focus();
  });
  inputElem.insertAdjacentElement("afterend", btn);
  const toggle = () => {
    btn.hidden = !inputElem.value;
  };
  inputElem.addEventListener("input", toggle);
  toggle();
}

function applyFilters() {
  filterDeviceList(cameraListElem, cameraListFilterInput.value);
  filterDeviceList(viewfinderListElem, viewfinderListFilterInput.value);
  filterDeviceList(monitorListElem, monitorListFilterInput.value);
  filterDeviceList(videoListElem, videoListFilterInput.value);
  filterDeviceList(motorListElem, motorListFilterInput.value);
  filterDeviceList(controllerListElem, controllerListFilterInput.value);
  filterDeviceList(distanceListElem, distanceListFilterInput.value);
  filterDeviceList(batteryListElem, batteryListFilterInput.value);
  filterDeviceList(accessoryBatteryListElem, accessoryBatteryListFilterInput.value);
  filterDeviceList(cableListElem, cableListFilterInput.value);
  filterDeviceList(cameraSupportListElem, cameraSupportListFilterInput.value);
  filterDeviceList(chargerListElem, chargerListFilterInput.value);
}

// Initialize device selection dropdowns
populateSelect(cameraSelect, devices.cameras, true);
populateMonitorSelect();
populateSelect(videoSelect, devices.video, true);
if (cageSelect) populateSelect(cageSelect, devices.accessories?.cages || {}, true);
motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
populateSelect(distanceSelect, devices.fiz.distance, true);
populateSelect(batterySelect, devices.batteries, true);
populateSelect(hotswapSelect, devices.batteryHotswaps || {}, true);
updateBatteryPlateVisibility();
updateBatteryOptions();

// Enable search inside dropdowns
[cameraSelect, monitorSelect, videoSelect, distanceSelect, batterySelect, hotswapSelect, lensSelect]
  .forEach(sel => attachSelectSearch(sel));
motorSelects.forEach(sel => attachSelectSearch(sel));
controllerSelects.forEach(sel => attachSelectSearch(sel));
applyFilters();
setVideoOutputs([]);
setMonitorVideoInputs([]);
setMonitorVideoOutputs([]);
setViewfinderVideoInputs([]);
setViewfinderVideoOutputs([]);
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
  let battery       = batterySelect.value;

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

  const segments = [
    { power: cameraW, className: "camera", label: texts[currentLang].cameraLabel },
    { power: monitorW, className: "monitor", label: texts[currentLang].monitorLabel },
    { power: videoW, className: "video", label: texts[currentLang].videoLabel },
    { power: motorsW, className: "motors", label: texts[currentLang].fizMotorsLabel },
    { power: controllersW, className: "controllers", label: texts[currentLang].fizControllersLabel },
    { power: distanceW, className: "distance", label: texts[currentLang].distanceLabel }
  ].filter(s => s.power > 0);

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

  // Update battery and hotswap options based on current draw
  updateBatteryOptions();
  battery = batterySelect.value;

// Wenn kein Akku oder "None" ausgewählt ist: Laufzeit = nicht berechenbar, keine Warnungen
let hours = null;
if (!battery || battery === "None" || !devices.batteries[battery]) {
  batteryLifeElem.textContent = "–";
  batteryCountElem.textContent = "–";
  pinWarnElem.textContent = "";
  pinWarnElem.style.color = "";
  dtapWarnElem.textContent = "";
  dtapWarnElem.style.color = "";
  if (hotswapWarnElem) {
    hotswapWarnElem.textContent = "";
    hotswapWarnElem.style.color = "";
  }
  lastRuntimeHours = null;
  drawPowerDiagram(0, segments, 0);
} else {
    const battData = devices.batteries[battery];
    const hsName = hotswapSelect.value;
    const hsData = devices.batteryHotswaps && devices.batteryHotswaps[hsName];
    const capacityWh = battData.capacity + (hsData?.capacity || 0);
    let maxPinA = battData.pinA;
    const maxDtapA = battData.dtapA;
    if (hsData && typeof hsData.pinA === 'number') {
      if (hsData.pinA < maxPinA) {
        hotswapWarnElem.textContent = texts[currentLang].warnHotswapLower
          .replace("{max}", hsData.pinA)
          .replace("{batt}", battData.pinA);
        hotswapWarnElem.style.color = "orange";
        maxPinA = hsData.pinA;
      } else {
        hotswapWarnElem.textContent = "";
        hotswapWarnElem.style.color = "";
      }
    } else {
      if (hotswapWarnElem) {
      hotswapWarnElem.textContent = "";
      hotswapWarnElem.style.color = "";
    }
  }
    const availableWatt = maxPinA * lowV;
    drawPowerDiagram(availableWatt, segments, maxPinA);
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

      const battData = devices.batteries[battName];
      if (plateFilter && battData.mount_type !== plateFilter) continue;
      if (!plateFilter && !supportsB && battData.mount_type === 'B-Mount') continue;
      const canPin = totalCurrentLow <= battData.pinA;
      const canDTap = !bMountCam && totalCurrentLow <= battData.dtapA;

      if (canPin) {
        const hours = battData.capacity / totalWatt;
        const method = (canDTap ? "both pins and D-Tap" : "pins");
        pinsCandidates.push({ name: battName, hours: hours, method: method });
      } else if (canDTap) {
        const hours = battData.capacity / totalWatt;
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
  refreshGearListIfVisible();
}

function getCurrentSetupKey() {
  const camera = cameraSelect.value || '';
  const monitor = monitorSelect.value || '';
  const video = videoSelect.value || '';
  const cage = cageSelect ? cageSelect.value : '';
  const motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None').sort().join(',');
  const controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None').sort().join(',');
  const distance = distanceSelect.value || '';
  const battery = batterySelect.value || '';
  const hotswap = hotswapSelect.value || '';
  const plate = getSelectedPlate() || '';
  return [camera, monitor, video, cage, motors, controllers, distance, battery, hotswap, plate].join('|');
}

function deleteFeedbackEntry(key, index) {
  const feedbackData = loadFeedbackSafe();
  if (feedbackData[key]) {
    feedbackData[key].splice(index, 1);
    if (!feedbackData[key].length) {
      delete feedbackData[key];
    }
    saveFeedbackSafe(feedbackData);
    updateCalculations();
  }
}

function renderFeedbackTable(currentKey) {
  const container = document.getElementById('feedbackTableContainer');
  const table = document.getElementById('userFeedbackTable');
  const feedbackData = loadFeedbackSafe();
  // Filter out any stored location information to keep the table column hidden
  const entries = (feedbackData[currentKey] || []).map(entry => {
    const rest = { ...entry };
    delete rest.location;
    return rest;
  });

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
      } else if (c.key === 'date') {
        html += `<td>${escapeHtml(formatDateString(entry[c.key]))}</td>`;
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
  compare('viewfinders', window.defaultDevices.viewfinders || {}, devices.viewfinders || {});
  compare('monitors', window.defaultDevices.monitors || {}, devices.monitors || {});
  compare('video', window.defaultDevices.video || {}, devices.video || {});
  compare('batteries', window.defaultDevices.batteries || {}, devices.batteries || {});
  compare('batteryHotswaps', window.defaultDevices.batteryHotswaps || {}, devices.batteryHotswaps || {});
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
  populateMonitorSelect();
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
  const isTouchDevice = (navigator.maxTouchPoints || 0) > 0;

  setupDiagramContainer.querySelectorAll('.diagram-node').forEach(node => {
    const id = node.getAttribute('data-node');
    const info = map[id];
    if (!info) return;
    let deviceData;
    if (info.category === 'fiz.controllers') {
      deviceData = devices.fiz?.controllers?.[info.name];
    } else if (info.category === 'fiz.motors') {
      deviceData = devices.fiz?.motors?.[info.name];
    } else if (info.category === 'fiz.distance') {
      deviceData = devices.fiz?.distance?.[info.name];
    } else {
      deviceData = devices[info.category]?.[info.name];
    }
    const connectors = deviceData ? generateConnectorSummary(deviceData) : '';
    const infoHtml =
      (deviceData && deviceData.latencyMs ?
        `<div class="info-box video-conn"><strong>Latency:</strong> ${escapeHtml(String(deviceData.latencyMs))}</div>` : '') +
      (deviceData && deviceData.frequency ?
        `<div class="info-box video-conn"><strong>Frequency:</strong> ${escapeHtml(String(deviceData.frequency))}</div>` : '');
    const html = `<strong>${escapeHtml(info.name)}</strong>` +
      connectors + infoHtml;

    const show = e => {
      e.stopPropagation();
      const pointer = e.touches && e.touches[0] ? e.touches[0] : e;
      popup.innerHTML = html;
      popup.style.display = 'block';

      const rect = setupDiagramContainer.getBoundingClientRect();
      const relX = pointer.clientX - rect.left;
      const relY = pointer.clientY - rect.top;
      const offset = 10;
      const popupWidth = popup.offsetWidth;

      // Open the popup to the left if it would otherwise overflow the container
      let left = relX + offset;
      if (relX + popupWidth + offset > rect.width) {
        left = Math.max(0, relX - popupWidth - offset);
      }

      popup.style.left = `${left}px`;
      popup.style.top = `${relY + offset}px`;
    };
    const hide = () => { popup.style.display = 'none'; };
    if (isTouchDevice) {
      node.addEventListener('touchstart', show);
      node.addEventListener('click', show);
    } else {
      node.addEventListener('mousemove', show);
      node.addEventListener('mouseout', hide);
      node.addEventListener('click', show);
    }
  });

  if (!setupDiagramContainer.dataset.popupOutsideListeners) {
    const hideOnOutside = e => {
      if (!e.target.closest('.diagram-node')) popup.style.display = 'none';
    };
    if (isTouchDevice) {
      setupDiagramContainer.addEventListener('touchstart', hideOnOutside);
    } else {
      setupDiagramContainer.addEventListener('click', hideOnOutside);
    }
    setupDiagramContainer.dataset.popupOutsideListeners = 'true';
  }
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
  const getPos = e => {
    if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (e.changedTouches && e.changedTouches[0]) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };
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
      manualPositions = {};
      renderSetupDiagram();
    };
  }
  const onSvgMouseDown = e => {
    if (e.target.closest('.diagram-node')) return;
    const pos = getPos(e);
    panning = true;
    panStart = { x: pos.x - pan.x, y: pos.y - pan.y };
    if (e.touches) e.preventDefault();
  };
  const onPanMove = e => {
    if (!panning) return;
    const pos = getPos(e);
    pan.x = pos.x - panStart.x;
    pan.y = pos.y - panStart.y;
    apply();
    if (e.touches) e.preventDefault();
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
    const pos = getPos(e);
    dragStart = { x: pos.x, y: pos.y };
    if (e.touches) e.preventDefault();
    e.stopPropagation();
  };
  const onDragMove = e => {
    if (!dragId) return;
    const start = lastDiagramPositions[dragId];
    if (!start) return;
    const pos = getPos(e);
    const dx = (pos.x - dragStart.x) / scale;
    const dy = (pos.y - dragStart.y) / scale;
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
    if (e.touches) e.preventDefault();
  };
  const onDragEnd = e => {
    if (!dragId) return;
    const start = lastDiagramPositions[dragId];
    if (start) {
      const pos = getPos(e);
      const dx = (pos.x - dragStart.x) / scale;
      const dy = (pos.y - dragStart.y) / scale;
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
    if (e.touches) e.preventDefault();
  };

  svg.addEventListener('mousedown', onSvgMouseDown);
  svg.addEventListener('touchstart', onSvgMouseDown, { passive: false });
  window.addEventListener('mousemove', onPanMove);
  window.addEventListener('touchmove', onPanMove, { passive: false });
  window.addEventListener('mouseup', stopPanning);
  window.addEventListener('touchend', stopPanning);
  svg.addEventListener('mousedown', onDragStart);
  svg.addEventListener('touchstart', onDragStart, { passive: false });
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('touchmove', onDragMove, { passive: false });
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('touchend', onDragEnd);

  cleanupDiagramInteractions = () => {
    svg.removeEventListener('mousedown', onSvgMouseDown);
    svg.removeEventListener('touchstart', onSvgMouseDown);
    window.removeEventListener('mousemove', onPanMove);
    window.removeEventListener('touchmove', onPanMove);
    window.removeEventListener('mouseup', stopPanning);
    window.removeEventListener('touchend', stopPanning);
    svg.removeEventListener('mousedown', onDragStart);
    svg.removeEventListener('touchstart', onDragStart);
    window.removeEventListener('mousemove', onDragMove);
    window.removeEventListener('touchmove', onDragMove);
    window.removeEventListener('mouseup', onDragEnd);
    window.removeEventListener('touchend', onDragEnd);
  };
}

function updateDiagramLegend() {
  if (!diagramLegend) return;
  const legendItems = [
    { cls: 'power', text: texts[currentLang].diagramLegendPower },
    { cls: 'video', text: texts[currentLang].diagramLegendVideo },
    { cls: 'fiz', text: texts[currentLang].diagramLegendFIZ }
  ];
  diagramLegend.innerHTML = legendItems
    .map(({ cls, text }) => `<span><span class="swatch ${cls}"></span>${text}</span>`)
    .join('');
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
    powerSource: 'Power Source',
    batteryType: 'Battery Type',
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
function formatDateString(val) {
  if (!val) return '';
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return String(val);
  return d.toISOString().split('T')[0];
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

  const buildItem = (name, deviceData, subcategory) => {
    if (name === "None") return;
    const li = document.createElement("li");
    const header = document.createElement("div");
    header.className = "device-summary";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = name;
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
    toggleBtn.setAttribute('data-help', texts[currentLang].showDetails);
    header.appendChild(toggleBtn);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.dataset.name = name;
    editBtn.dataset.category = categoryKey;
    if (subcategory) editBtn.dataset.subcategory = subcategory;
    editBtn.textContent = texts[currentLang].editBtn;
    editBtn.setAttribute('data-help', texts[currentLang].editBtnHelp || texts[currentLang].editBtn);
    header.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.dataset.name = name;
    deleteBtn.dataset.category = categoryKey;
    if (subcategory) deleteBtn.dataset.subcategory = subcategory;
    deleteBtn.textContent = texts[currentLang].deleteDeviceBtn;
    deleteBtn.setAttribute('data-help', texts[currentLang].deleteDeviceBtnHelp || texts[currentLang].deleteDeviceBtn);
    header.appendChild(deleteBtn);

    li.appendChild(header);

    const detailsDiv = document.createElement("div");
    detailsDiv.className = "device-details";
    detailsDiv.style.display = "none";
    detailsDiv.appendChild(createDeviceDetailsList(deviceData));
    li.appendChild(detailsDiv);

    ulElement.appendChild(li);
  };

  if (categoryKey === "accessories.cables") {
    for (const [subcat, devs] of Object.entries(categoryDevices)) {
      for (const name in devs) {
        buildItem(name, devs[name], subcat);
      }
    }
  } else {
    for (let name in categoryDevices) {
      buildItem(name, categoryDevices[name]);
    }
  }
}

function refreshDeviceLists() {
  // Merge FIZ cables into the general cables category
  if (devices.fiz?.cables) {
    devices.accessories = devices.accessories || {};
    devices.accessories.cables = devices.accessories.cables || {};
    devices.accessories.cables.fiz = devices.fiz.cables;
  }

  renderDeviceList("cameras", cameraListElem);
  renderDeviceList("viewfinders", viewfinderListElem);
  renderDeviceList("monitors", monitorListElem);
  renderDeviceList("video", videoListElem);
  renderDeviceList("fiz.motors", motorListElem);
  renderDeviceList("fiz.controllers", controllerListElem);
  renderDeviceList("fiz.distance", distanceListElem);
  renderDeviceList("batteries", batteryListElem);
  renderDeviceList("accessories.batteries", accessoryBatteryListElem);
  renderDeviceList("accessories.cables", cableListElem);
  renderDeviceList("accessories.cameraSupport", cameraSupportListElem);
  renderDeviceList("accessories.chargers", chargerListElem);

  filterDeviceList(cameraListElem, cameraListFilterInput.value);
  filterDeviceList(viewfinderListElem, viewfinderListFilterInput.value);
  filterDeviceList(monitorListElem, monitorListFilterInput.value);
  filterDeviceList(videoListElem, videoListFilterInput.value);
  filterDeviceList(motorListElem, motorListFilterInput.value);
  filterDeviceList(controllerListElem, controllerListFilterInput.value);
  filterDeviceList(distanceListElem, distanceListFilterInput.value);
  filterDeviceList(batteryListElem, batteryListFilterInput.value);
  filterDeviceList(accessoryBatteryListElem, accessoryBatteryListFilterInput.value);
  filterDeviceList(cableListElem, cableListFilterInput.value);
  filterDeviceList(cameraSupportListElem, cameraSupportListFilterInput.value);
  filterDeviceList(chargerListElem, chargerListFilterInput.value);
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



bindFilterInput(cameraListFilterInput, () => filterDeviceList(cameraListElem, cameraListFilterInput.value));
bindFilterInput(viewfinderListFilterInput, () => filterDeviceList(viewfinderListElem, viewfinderListFilterInput.value));
bindFilterInput(monitorListFilterInput, () => filterDeviceList(monitorListElem, monitorListFilterInput.value));
bindFilterInput(videoListFilterInput, () => filterDeviceList(videoListElem, videoListFilterInput.value));
bindFilterInput(motorListFilterInput, () => filterDeviceList(motorListElem, motorListFilterInput.value));
bindFilterInput(controllerListFilterInput, () => filterDeviceList(controllerListElem, controllerListFilterInput.value));
bindFilterInput(distanceListFilterInput, () => filterDeviceList(distanceListElem, distanceListFilterInput.value));
bindFilterInput(batteryListFilterInput, () => filterDeviceList(batteryListElem, batteryListFilterInput.value));
bindFilterInput(accessoryBatteryListFilterInput, () => filterDeviceList(accessoryBatteryListElem, accessoryBatteryListFilterInput.value));
bindFilterInput(cableListFilterInput, () => filterDeviceList(cableListElem, cableListFilterInput.value));
bindFilterInput(cameraSupportListFilterInput, () => filterDeviceList(cameraSupportListElem, cameraSupportListFilterInput.value));
bindFilterInput(chargerListFilterInput, () => filterDeviceList(chargerListElem, chargerListFilterInput.value));

// Setup management
saveSetupBtn.addEventListener("click", () => {
  const setupName = setupNameInput.value.trim();
  if (!setupName) {
    alert(texts[currentLang].alertSetupName);
    return;
  }
  const currentSetup = {
    ...getCurrentSetupState(),
    gearList: getCurrentGearListHtml()
  };
  let setups = getSetups();
  setups[setupName] = currentSetup;
  storeSetups(setups);
  populateSetupSelect();
  setupSelect.value = setupName; // Select the newly saved setup
  saveCurrentSession(); // Persist selection so refreshes restore this setup
  loadedSetupState = getCurrentSetupState();
  checkSetupChanged();
  // Ensure the current gear list is persisted with the project so it can be
  // restored even without a manual "Save Gear List" action.
  saveCurrentGearList();
  alert(texts[currentLang].alertSetupSaved.replace("{name}", setupName));
});

deleteSetupBtn.addEventListener("click", () => {
  const setupName = setupSelect.value;
  if (!setupName) {
    alert(texts[currentLang].alertNoSetupSelected);
    return;
  }
  if (
    confirm(texts[currentLang].confirmDeleteSetup.replace("{name}", setupName)) &&
    confirm(texts[currentLang].confirmDeleteSetupAgain)
  ) {
    let setups = getSetups();
    delete setups[setupName];
    storeSetups(setups);
    populateSetupSelect();
    setupNameInput.value = ""; // Clear setup name input
    // Reset dropdowns to "None" or first option after deleting current setup
    [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect].forEach(sel => {
      const noneOption = Array.from(sel.options).find(opt => opt.value === "None");
      if (noneOption) {
        sel.value = "None";
      } else {
        sel.selectedIndex = 0;
      }
    });
    const sbSel = getSliderBowlSelect();
    if (sbSel) sbSel.value = '';
    motorSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    controllerSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    updateCalculations(); // Recalculate after deleting setup
    alert(texts[currentLang].alertSetupDeleted.replace("{name}", setupName));
  }
});

clearSetupBtn.addEventListener("click", () => {
  if (
    confirm(texts[currentLang].confirmClearSetup) &&
    confirm(texts[currentLang].confirmClearSetupAgain)
  ) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('cameraPowerPlanner_session');
    }
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('cameraPowerPlanner_session');
    }
    setupSelect.value = "";
    setupNameInput.value = "";
    [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect].forEach(sel => {
      if (!sel) return;
      const noneOption = Array.from(sel.options).find(opt => opt.value === "None");
      if (noneOption) {
        sel.value = "None";
      } else {
        sel.selectedIndex = 0;
      }
    });
    const sbSel = getSliderBowlSelect();
    if (sbSel) sbSel.value = '';
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
    [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect].forEach(sel => {
      const noneOption = Array.from(sel.options).find(opt => opt.value === "None");
      if (noneOption) {
        sel.value = "None";
      } else {
        sel.selectedIndex = 0;
      }
    });
    const sbSel = getSliderBowlSelect();
    if (sbSel) sbSel.value = '';
    motorSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    controllerSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    updateBatteryPlateVisibility();
    updateBatteryOptions();
    loadedSetupState = null;
    if (gearListOutput) {
      gearListOutput.innerHTML = '';
      gearListOutput.classList.add('hidden');
    }
    if (projectRequirementsOutput) {
      projectRequirementsOutput.innerHTML = '';
      projectRequirementsOutput.classList.add('hidden');
    }
    if (typeof deleteProject === 'function') {
      deleteProject();
    }
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
      if (cageSelect) cageSelect.value = setup.cage || cageSelect.value;
      setup.motors.forEach((val, i) => { if (motorSelects[i]) motorSelects[i].value = val; });
      setup.controllers.forEach((val, i) => { if (controllerSelects[i]) controllerSelects[i].value = val; });
      distanceSelect.value = setup.distance;
      batterySelect.value = setup.battery;
      hotswapSelect.value = setup.batteryHotswap || hotswapSelect.value;
      setSliderBowlValue(setup.sliderBowl || '');
      updateBatteryOptions();
      if (gearListOutput) {
        displayGearAndRequirements(setup.gearList || '');
        currentProjectInfo = setup.projectInfo || null;
        if (currentProjectInfo) populateProjectForm(currentProjectInfo);
        if (setup.gearList) {
          ensureGearListActions();
      bindGearListCageListener();
      bindGearListEasyrigListener();
      bindGearListSliderBowlListener();
      bindGearListEyeLeatherListener();
      bindGearListProGaffTapeListener();
      bindGearListDirectorMonitorListener();
          if (typeof saveProject === 'function') {
            saveProject({ projectInfo: currentProjectInfo, gearList: setup.gearList });
          }
        } else {
          if (typeof deleteProject === 'function') {
            deleteProject();
          }
        }
      }
    }
    loadedSetupState = getCurrentSetupState();
  }
  if (saveSetupBtn) {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  }
  updateCalculations();
  checkSetupChanged();
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
checkSetupChanged();

// Auto-save a backup project after 5 minutes if none selected. The timer is
// long-lived and would keep Node's event loop active in tests or server-side
// rendering scenarios. Calling `unref()` (when available) allows the process to
// exit naturally without waiting for the timeout to fire.
const isNodeEnv = typeof process !== 'undefined' && process.versions && process.versions.node;
const backupTimer = setTimeout(() => {
  if (!setupSelect || setupSelect.value) return;
  const pad = (n) => String(n).padStart(2, "0");
  const now = new Date();
  const backupName = `saved-backup-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}-${pad(now.getMinutes())}`;
  const currentSetup = { ...getCurrentSetupState(), gearList: getCurrentGearListHtml() };
  const setups = getSetups();
  setups[backupName] = currentSetup;
  storeSetups(setups);
  populateSetupSelect();
  setupSelect.value = backupName;
  if (setupNameInput) setupNameInput.value = backupName;
  loadedSetupState = getCurrentSetupState();
  checkSetupChanged();
}, isNodeEnv ? 0 : 5 * 60 * 1000);
if (typeof backupTimer.unref === 'function') {
  backupTimer.unref();
}

// Toggle device manager visibility
if (toggleDeviceBtn) {
  toggleDeviceBtn.addEventListener("click", () => {
    if (deviceManagerSection.classList.contains('hidden')) {
      deviceManagerSection.classList.remove('hidden');
      toggleDeviceBtn.textContent = texts[currentLang].hideDeviceManager;
      toggleDeviceBtn.setAttribute('title', texts[currentLang].hideDeviceManager);
      toggleDeviceBtn.setAttribute('data-help', texts[currentLang].hideDeviceManagerHelp);
      toggleDeviceBtn.setAttribute('aria-expanded', 'true');
      refreshDeviceLists(); // Refresh lists when shown
      updateCalculations(); // Ensure calculations are up to date
    } else {
      deviceManagerSection.classList.add('hidden');
      toggleDeviceBtn.textContent = texts[currentLang].toggleDeviceManager;
      toggleDeviceBtn.setAttribute('title', texts[currentLang].toggleDeviceManager);
      toggleDeviceBtn.setAttribute('data-help', texts[currentLang].toggleDeviceManagerHelp);
      toggleDeviceBtn.setAttribute('aria-expanded', 'false');
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
    button.setAttribute('data-help', texts[currentLang].showDetails);
  } else {
    details.style.display = 'block';
    button.textContent = texts[currentLang].hideDetails;
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('data-help', texts[currentLang].hideDetails);
  }
}

function inferDeviceCategory(key, data) {
  if (key === "batteries" || key.endsWith('.batteries') || data.capacity !== undefined) return "batteries";
  if (key === "cameras" || data.recordingMedia || data.lensMount || data.power?.batteryPlateSupport) return "cameras";
  if (key === "monitors" || (data.screenSizeInches !== undefined && !key.includes("viewfinder"))) return "monitors";
  if (key === "viewfinders" || key.includes("viewfinder")) return "viewfinders";
  if (key === "video" || key === "wirelessReceivers" || key === "iosVideo" || data.videoInputs || data.videoOutputs || data.frequency !== undefined) return "video";
  if (key === "fiz.motors" || data.torqueNm !== undefined || data.gearTypes) return "fiz.motors";
  if (key === "fiz.controllers" || data.powerSource || data.batteryType || data.connectivity) return "fiz.controllers";
  if (key === "fiz.distance" || data.measurementMethod || data.connectionCompatibility || data.measurementRange || data.accuracy) return "fiz.distance";
  return "generic";
}

function populateDeviceForm(categoryKey, deviceData, subcategory) {
  placeWattField(categoryKey, deviceData);
  const type = inferDeviceCategory(categoryKey, deviceData);
  wattFieldDiv.style.display = "block";
  batteryFieldsDiv.style.display = "none";
  cameraFieldsDiv.style.display = "none";
  monitorFieldsDiv.style.display = "none";
  viewfinderFieldsDiv.style.display = "none";
  videoFieldsDiv.style.display = "none";
  motorFieldsDiv.style.display = "none";
  controllerFieldsDiv.style.display = "none";
  distanceFieldsDiv.style.display = "none";
  clearDynamicFields();

  if (type === "batteries") {
    wattFieldDiv.style.display = "none";
    batteryFieldsDiv.style.display = "block";
    newCapacityInput.value = deviceData.capacity || '';
    newPinAInput.value = deviceData.pinA || '';
    if (dtapRow) dtapRow.style.display = categoryKey === "batteryHotswaps" ? "none" : "";
    newDtapAInput.value = categoryKey === "batteryHotswaps" ? '' : (deviceData.dtapA || '');
  } else if (type === "cameras") {
    wattFieldDiv.style.display = "none";
    cameraFieldsDiv.style.display = "block";
    const tmp = firstPowerInputType(deviceData);
    cameraWattInput.value = deviceData.powerDrawWatts || '';
    cameraVoltageInput.value = deviceData.power?.input?.voltageRange || '';
    cameraPortTypeInput.value = tmp || "";
    setBatteryPlates(deviceData.power?.batteryPlateSupport || []);
    setRecordingMedia(deviceData.recordingMedia || []);
    setLensMounts(deviceData.lensMount || []);
    setPowerDistribution(deviceData.power?.powerDistributionOutputs || []);
    setVideoOutputs(deviceData.videoOutputs || []);
    setFizConnectors(deviceData.fizConnectors || []);
    setViewfinders(deviceData.viewfinder || []);
    setTimecodes(deviceData.timecode || []);
  } else if (type === "monitors") {
    monitorFieldsDiv.style.display = "block";
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
  } else if (type === "viewfinders") {
    viewfinderFieldsDiv.style.display = "block";
    viewfinderScreenSizeInput.value = deviceData.screenSizeInches || '';
    viewfinderBrightnessInput.value = deviceData.brightnessNits || '';
    viewfinderWattInput.value = deviceData.powerDrawWatts || '';
    viewfinderVoltageInput.value = deviceData.power?.input?.voltageRange || '';
    const vfpt = firstPowerInputType(deviceData);
    viewfinderPortTypeInput.value = vfpt || "";
    setViewfinderVideoInputs(deviceData.videoInputs || deviceData.video?.inputs || []);
    setViewfinderVideoOutputs(deviceData.videoOutputs || deviceData.video?.outputs || []);
    viewfinderWirelessTxInput.checked = !!deviceData.wirelessTx;
    viewfinderLatencyInput.value = deviceData.latencyMs || '';
  } else if (type === "video") {
    videoFieldsDiv.style.display = "block";
    newWattInput.value = deviceData.powerDrawWatts || '';
    videoPowerInput.value = firstPowerInputType(deviceData);
    setVideoInputs(deviceData.videoInputs || deviceData.video?.inputs || []);
    setVideoOutputsIO(deviceData.videoOutputs || deviceData.video?.outputs || []);
    videoFrequencyInput.value = deviceData.frequency || '';
    videoLatencyInput.value = deviceData.latencyMs || '';
    motorConnectorInput.value = '';
  } else if (type === "fiz.motors") {
    motorFieldsDiv.style.display = "block";
    newWattInput.value = deviceData.powerDrawWatts || '';
    motorConnectorInput.value = deviceData.fizConnector || '';
    motorInternalInput.checked = !!deviceData.internalController;
    motorTorqueInput.value = deviceData.torqueNm || '';
    motorGearInput.value = Array.isArray(deviceData.gearTypes) ? deviceData.gearTypes.join(', ') : '';
    motorNotesInput.value = deviceData.notes || '';
  } else if (type === "fiz.controllers") {
    controllerFieldsDiv.style.display = "block";
    newWattInput.value = deviceData.powerDrawWatts || '';
    const cc = Array.isArray(deviceData.fizConnectors)
      ? deviceData.fizConnectors.map(fc => fc.type).join(', ')
      : (deviceData.fizConnector || '');
    controllerConnectorInput.value = cc;
    controllerPowerInput.value = deviceData.powerSource || '';
    controllerBatteryInput.value = deviceData.batteryType || '';
    controllerConnectivityInput.value = deviceData.connectivity || '';
    controllerNotesInput.value = deviceData.notes || '';
  } else if (type === "fiz.distance") {
    distanceFieldsDiv.style.display = "block";
    newWattInput.value = deviceData.powerDrawWatts || '';
    distanceConnectionInput.value = deviceData.connectionCompatibility || '';
    distanceMethodInput.value = deviceData.measurementMethod || '';
    distanceRangeInput.value = deviceData.measurementRange || '';
    distanceAccuracyInput.value = deviceData.accuracy || '';
    distanceOutputInput.value = deviceData.outputDisplay || '';
    distanceNotesInput.value = deviceData.notes || '';
  } else if (type === "accessories.cables") {
    wattFieldDiv.style.display = "none";
    subcategoryFieldDiv.hidden = false;
    const subcats = Object.keys(devices.accessories?.cables || {});
    newSubcategorySelect.innerHTML = '';
    for (const sc of subcats) {
      const opt = document.createElement('option');
      opt.value = sc;
      opt.textContent = sc.charAt(0).toUpperCase() + sc.slice(1);
      newSubcategorySelect.appendChild(opt);
    }
    newSubcategorySelect.value = subcategory || '';
    newSubcategorySelect.disabled = true;
    buildDynamicFields(`accessories.cables.${subcategory}`, deviceData);
  } else {
    const watt = typeof deviceData === 'object' ? deviceData.powerDrawWatts : deviceData;
    newWattInput.value = watt || '';
    buildDynamicFields(categoryKey, deviceData);
  }
}

// Handle "Edit" and "Delete" buttons in device lists (event delegation)
deviceManagerSection.addEventListener("click", (event) => {
  if (event.target.classList.contains("detail-toggle")) {
    toggleDeviceDetails(event.target);
  } else if (event.target.classList.contains("edit-btn")) {
    const name = event.target.dataset.name;
    const categoryKey = event.target.dataset.category;
    const subcategory = event.target.dataset.subcategory;

    // Ensure category exists in selector
    if (!Array.from(newCategorySelect.options).some(opt => opt.value === categoryKey)) {
      const opt = document.createElement("option");
      opt.value = categoryKey;
      opt.textContent = categoryNames[currentLang]?.[categoryKey] || categoryKey;
      newCategorySelect.appendChild(opt);
    }

    // Set form for editing
    newCategorySelect.value = categoryKey;
    newCategorySelect.disabled = true; // Prevent changing category during edit
    // Trigger change handler so fields are cleared
    newCategorySelect.dispatchEvent(new Event('change'));
    // After the change handler runs, restore the device name for editing
    newNameInput.value = name;

    let deviceData;
    if (categoryKey === "accessories.cables") {
      deviceData = devices.accessories.cables[subcategory][name];
    } else if (categoryKey.includes('.')) {
      const [mainCat, subCat] = categoryKey.split('.');
      deviceData = devices[mainCat][subCat][name];
    } else {
      deviceData = devices[categoryKey][name];
    }

    populateDeviceForm(categoryKey, deviceData, subcategory);
    // Change button to "Update"
    addDeviceBtn.textContent = texts[currentLang].updateDeviceBtn;
    addDeviceBtn.setAttribute('data-help', texts[currentLang].updateDeviceBtnHelp);
    addDeviceBtn.dataset.mode = "edit";
    addDeviceBtn.dataset.originalName = name; // Store original name for update
    if (categoryKey === "accessories.cables") {
      addDeviceBtn.dataset.originalSubcategory = subcategory;
    } else {
      delete addDeviceBtn.dataset.originalSubcategory;
    }
    cancelEditBtn.textContent = texts[currentLang].cancelEditBtn;
    cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
    cancelEditBtn.style.display = "inline";
    document.getElementById("addDeviceHeading").scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (event.target.classList.contains("delete-btn")) {
    const name = event.target.dataset.name;
    const categoryKey = event.target.dataset.category;
    const subcategory = event.target.dataset.subcategory;
    if (confirm(texts[currentLang].confirmDeleteDevice.replace("{name}", name))) {
      if (categoryKey === "accessories.cables") {
        delete devices.accessories.cables[subcategory][name];
      } else if (categoryKey.includes('.')) {
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
      populateMonitorSelect();
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
  clearDynamicFields();
  subcategoryFieldDiv.hidden = true;
  newSubcategorySelect.innerHTML = "";
  newSubcategorySelect.disabled = false;
  if (dtapRow) dtapRow.style.display = "";
  if (val === "batteries" || val === "accessories.batteries" || val === "batteryHotswaps") {
    wattFieldDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    monitorFieldsDiv.style.display = "none";
    viewfinderFieldsDiv.style.display = "none";
    videoFieldsDiv.style.display = "none";
    motorFieldsDiv.style.display = "none";
    controllerFieldsDiv.style.display = "none";
    distanceFieldsDiv.style.display = "none";
    batteryFieldsDiv.style.display = "block";
    if (dtapRow) dtapRow.style.display = val === "batteryHotswaps" ? "none" : "";
  } else if (val === "cameras") {
    wattFieldDiv.style.display = "none";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "block";
    monitorFieldsDiv.style.display = "none";
    viewfinderFieldsDiv.style.display = "none";
    videoFieldsDiv.style.display = "none";
    motorFieldsDiv.style.display = "none";
    controllerFieldsDiv.style.display = "none";
    distanceFieldsDiv.style.display = "none";
  } else if (val === "monitors") {
    wattFieldDiv.style.display = "none";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    monitorFieldsDiv.style.display = "block";
    viewfinderFieldsDiv.style.display = "none";
    videoFieldsDiv.style.display = "none";
    motorFieldsDiv.style.display = "none";
    controllerFieldsDiv.style.display = "none";
    distanceFieldsDiv.style.display = "none";
  } else if (val === "viewfinders") {
    wattFieldDiv.style.display = "none";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    monitorFieldsDiv.style.display = "none";
    viewfinderFieldsDiv.style.display = "block";
    videoFieldsDiv.style.display = "none";
    motorFieldsDiv.style.display = "none";
    controllerFieldsDiv.style.display = "none";
    distanceFieldsDiv.style.display = "none";
  } else if (val === "video" || val === "wirelessReceivers" || val === "iosVideo") {
    wattFieldDiv.style.display = "block";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    monitorFieldsDiv.style.display = "none";
    viewfinderFieldsDiv.style.display = "none";
    videoFieldsDiv.style.display = "block";
    motorFieldsDiv.style.display = "none";
    controllerFieldsDiv.style.display = "none";
    distanceFieldsDiv.style.display = "none";
  } else if (val === "fiz.motors") {
    wattFieldDiv.style.display = "block";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    monitorFieldsDiv.style.display = "none";
    viewfinderFieldsDiv.style.display = "none";
    videoFieldsDiv.style.display = "none";
    motorFieldsDiv.style.display = "block";
    controllerFieldsDiv.style.display = "none";
    distanceFieldsDiv.style.display = "none";
  } else if (val === "fiz.controllers") {
    wattFieldDiv.style.display = "block";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    monitorFieldsDiv.style.display = "none";
    viewfinderFieldsDiv.style.display = "none";
    videoFieldsDiv.style.display = "none";
    motorFieldsDiv.style.display = "none";
    controllerFieldsDiv.style.display = "block";
    distanceFieldsDiv.style.display = "none";
  } else if (val === "fiz.distance") {
    wattFieldDiv.style.display = "block";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    monitorFieldsDiv.style.display = "none";
    viewfinderFieldsDiv.style.display = "none";
    videoFieldsDiv.style.display = "none";
    motorFieldsDiv.style.display = "none";
    controllerFieldsDiv.style.display = "none";
    distanceFieldsDiv.style.display = "block";
  } else if (val === "accessories.cables") {
    wattFieldDiv.style.display = "none";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    monitorFieldsDiv.style.display = "none";
    viewfinderFieldsDiv.style.display = "none";
    videoFieldsDiv.style.display = "none";
    motorFieldsDiv.style.display = "none";
    controllerFieldsDiv.style.display = "none";
    distanceFieldsDiv.style.display = "none";
    subcategoryFieldDiv.hidden = false;
    const subcats = Object.keys(devices.accessories?.cables || {});
    for (const sc of subcats) {
      const opt = document.createElement('option');
      opt.value = sc;
      opt.textContent = sc.charAt(0).toUpperCase() + sc.slice(1);
      newSubcategorySelect.appendChild(opt);
    }
    if (newSubcategorySelect.value) {
      buildDynamicFields(`accessories.cables.${newSubcategorySelect.value}`);
    }
  } else {
    wattFieldDiv.style.display = "block";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    monitorFieldsDiv.style.display = "none";
    viewfinderFieldsDiv.style.display = "none";
    videoFieldsDiv.style.display = "none";
    motorFieldsDiv.style.display = "none";
    controllerFieldsDiv.style.display = "none";
    distanceFieldsDiv.style.display = "none";
    buildDynamicFields(val);
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
  viewfinderScreenSizeInput.value = "";
  viewfinderBrightnessInput.value = "";
  viewfinderWattInput.value = "";
  viewfinderVoltageInput.value = "";
  viewfinderPortTypeInput.value = "";
  viewfinderWirelessTxInput.checked = false;
  viewfinderLatencyInput.value = "";
  clearViewfinderVideoInputs();
  clearViewfinderVideoOutputs();
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
  addDeviceBtn.setAttribute('data-help', texts[currentLang].addDeviceBtnHelp);
  addDeviceBtn.dataset.mode = "add";
  delete addDeviceBtn.dataset.originalName;
  delete addDeviceBtn.dataset.originalSubcategory;
  newNameInput.value = ""; // Clear name to avoid accidental update
  cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
  cancelEditBtn.style.display = "none";
});

newSubcategorySelect.addEventListener('change', () => {
  if (newCategorySelect.value === 'accessories.cables') {
    buildDynamicFields(`accessories.cables.${newSubcategorySelect.value}`);
  }
});

function resetDeviceForm() {
  newCategorySelect.disabled = false;
  cancelEditBtn.style.display = "none";
  // Trigger change handler to reset fields and button text, guarding against
  // missing DOM elements in test environments.
  if (newCategorySelect.isConnected) {
    try {
      newCategorySelect.dispatchEvent(new Event('change'));
    } catch (err) {
      console.warn('resetDeviceForm dispatch failed', err);
    }
  }
}


// Add/Update device logic
addDeviceBtn.addEventListener("click", () => {
  const name = newNameInput.value.trim();
  const category = newCategorySelect.value;
  const isEditing = addDeviceBtn.dataset.mode === "edit";
  const originalName = addDeviceBtn.dataset.originalName;
  const subcategory = category === "accessories.cables" ? newSubcategorySelect.value : null;
  const originalSubcategory = addDeviceBtn.dataset.originalSubcategory;

  if (!name) {
    alert(texts[currentLang].alertDeviceName);
    return;
  }

  let targetCategory;
  if (category === "accessories.cables") {
    if (!subcategory) {
      alert(texts[currentLang].alertDeviceFields);
      return;
    }
    if (!devices.accessories) devices.accessories = {};
    if (!devices.accessories.cables) devices.accessories.cables = {};
    if (!devices.accessories.cables[subcategory]) devices.accessories.cables[subcategory] = {};
    targetCategory = devices.accessories.cables[subcategory];
  } else if (category.includes('.')) {
    const [mainCat, subCat] = category.split('.');
    if (!devices[mainCat]) devices[mainCat] = {};
    if (!devices[mainCat][subCat]) devices[mainCat][subCat] = {};
    targetCategory = devices[mainCat][subCat];
  } else {
    if (!devices[category]) devices[category] = {};
    targetCategory = devices[category];
  }

  // Check for duplicate name if adding, or if name changed during edit
  if ((!isEditing && targetCategory[name] !== undefined) ||
      (isEditing && (name !== originalName || (category === "accessories.cables" && subcategory !== originalSubcategory)) && targetCategory[name] !== undefined)) {
    alert(texts[currentLang].alertDeviceExists);
    return;
  }

  if (category === "batteries" || category === "accessories.batteries" || category === "batteryHotswaps") {
    const capacity = parseFloat(newCapacityInput.value);
    const pinA = parseFloat(newPinAInput.value);
    const dtapA = category === "batteryHotswaps" ? undefined : parseFloat(newDtapAInput.value);
    if (
      isNaN(capacity) ||
      isNaN(pinA) ||
      capacity <= 0 ||
      pinA <= 0 ||
      (category !== "batteryHotswaps" && (isNaN(dtapA) || dtapA < 0))
    ) {
      alert(texts[currentLang].alertDeviceFields);
      return;
    }
    const existing = isEditing ? targetCategory[originalName] : {};
    if (isEditing && name !== originalName) {
      delete targetCategory[originalName];
    }
    if (category === "batteryHotswaps") {
      targetCategory[name] = { ...existing, capacity: capacity, pinA: pinA };
    } else {
      targetCategory[name] = { capacity: capacity, pinA: pinA, dtapA: dtapA };
    }
  } else if (category === "accessories.cables") {
    const existing = isEditing
      ? devices.accessories.cables[originalSubcategory][originalName] || {}
      : {};
    if (isEditing && (name !== originalName || subcategory !== originalSubcategory)) {
      delete devices.accessories.cables[originalSubcategory][originalName];
    }
    const attrs = collectDynamicFieldValues(`accessories.cables.${subcategory}`);
    targetCategory[name] = { ...existing, ...attrs };
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
  } else if (category === "viewfinders") {
    const watt = parseFloat(viewfinderWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    if (isEditing && name !== originalName) {
      delete targetCategory[originalName];
    }
    const screenSize = parseFloat(viewfinderScreenSizeInput.value);
    const brightness = parseFloat(viewfinderBrightnessInput.value);
    targetCategory[name] = {
      screenSizeInches: isNaN(screenSize) ? undefined : screenSize,
      brightnessNits: isNaN(brightness) ? undefined : brightness,
      powerDrawWatts: watt,
      power: {
        input: {
          voltageRange: viewfinderVoltageInput.value,
          type: viewfinderPortTypeInput.value
        },
        output: null
      },
      video: {
        inputs: getViewfinderVideoInputs(),
        outputs: getViewfinderVideoOutputs()
      },
      wirelessTx: viewfinderWirelessTxInput.checked,
      latencyMs: viewfinderWirelessTxInput.checked ? viewfinderLatencyInput.value : undefined
    };
  } else if (category === "video" || category === "wirelessReceivers" || category === "iosVideo") {
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
      powerSource: controllerPowerInput.value,
      batteryType: controllerBatteryInput.value,
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
      connectionCompatibility: distanceConnectionInput.value,
      measurementMethod: distanceMethodInput.value,
      measurementRange: distanceRangeInput.value,
      accuracy: distanceAccuracyInput.value,
      outputDisplay: distanceOutputInput.value,
      notes: distanceNotesInput.value
    };
  } else {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    const existing = isEditing ? targetCategory[originalName] : {};
    if (isEditing && name !== originalName) {
      delete targetCategory[originalName];
    }
    const attrs = collectDynamicFieldValues(category);
    targetCategory[name] = { ...existing, ...attrs, powerDrawWatts: watt };
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
  populateMonitorSelect();
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
      const revertTimer = setTimeout(() => {
        // Step 2: Remove saved database and reload page so device files are re-read
        localStorage.removeItem('cameraPowerPlanner_devices');
        alert(texts[currentLang].alertExportAndRevertSuccess);
        location.reload();
      }, 500); // 500ms delay
      if (typeof revertTimer.unref === 'function') {
        revertTimer.unref();
      }
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
      const expectedKeys = ["cameras", "viewfinders", "monitors", "video", "fiz", "batteries"];
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
        populateMonitorSelect();
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

function batteryPinsSufficient() {
    const batt = batterySelect && batterySelect.value;
    if (!batt || batt === 'None' || !devices.batteries[batt]) return true;
    const battData = devices.batteries[batt];
    const totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
    if (!isFinite(totalCurrentLow)) return true;
    return totalCurrentLow <= battData.pinA;
}

function alertPinExceeded() {
    const batt = batterySelect && batterySelect.value;
    if (!batt || batt === 'None' || !devices.batteries[batt]) return;
    const battData = devices.batteries[batt];
    const totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
    alert(
        texts[currentLang].warnPinExceeded
            .replace('{current}', totalCurrentLow.toFixed(2))
            .replace('{max}', battData.pinA)
    );
}

// Generate a printable gear list for the current setup
generateGearListBtn.addEventListener('click', () => {
    if (!setupSelect.value) {
        alert(texts[currentLang].alertSelectSetupForOverview);
        return;
    }
    if (!batteryPinsSufficient()) {
        alertPinExceeded();
        return;
    }
    populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
    populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
    populateCodecDropdown(currentProjectInfo && currentProjectInfo.codec);
    openDialog(projectDialog);
});

if (projectCancelBtn) {
    projectCancelBtn.addEventListener('click', () => {
        closeDialog(projectDialog);
    });
}

if (projectForm) {
    projectForm.addEventListener('submit', e => {
        e.preventDefault();
        if (!batteryPinsSufficient()) {
            alertPinExceeded();
            return;
        }
        const info = collectProjectFormData();
        currentProjectInfo = info;
        ensureZoomRemoteSetup(info);
        const html = generateGearListHtml(info);
        displayGearAndRequirements(html);
        ensureGearListActions();
        bindGearListCageListener();
        bindGearListEasyrigListener();
        bindGearListSliderBowlListener();
        bindGearListEyeLeatherListener();
        bindGearListProGaffTapeListener();
        bindGearListDirectorMonitorListener();
        saveCurrentGearList();
        closeDialog(projectDialog);
    });
}

shareSetupBtn.addEventListener('click', () => {
  const setupName = (setupNameInput && setupNameInput.value.trim()) ||
    (setupSelect && setupSelect.value) || '';
  const currentSetup = {
    setupName,
    camera: cameraSelect.value,
    monitor: monitorSelect.value,
    video: videoSelect.value,
    cage: cageSelect.value,
    motors: motorSelects.map(sel => sel.value),
    controllers: controllerSelects.map(sel => sel.value),
    distance: distanceSelect.value,
    batteryPlate: batteryPlateSelect.value,
    battery: batterySelect.value,
    batteryHotswap: hotswapSelect.value
  };
  const project = typeof loadProject === 'function' ? loadProject() : null;
  if (project) {
    if (project.gearList) currentSetup.gearList = project.gearList;
    if (project.projectInfo) currentSetup.projectInfo = project.projectInfo;
  }
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
  if (link.length > 2000) {
    alert(texts[currentLang].shareLinkTooLong || 'Shared link is too long.');
    return;
  }
  copyTextToClipboard(link)
    .then(() => alert(texts[currentLang].shareLinkCopied))
    .catch(() => prompt(texts[currentLang].shareSetupPrompt, link));
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

if (copySummaryBtn) {
  copySummaryBtn.addEventListener('click', () => {
    const lines = [
      `${texts[currentLang].totalPowerLabel} ${totalPowerElem.textContent} W`,
      `${texts[currentLang].totalCurrent144Label} ${totalCurrent144Elem.textContent} A`,
      `${texts[currentLang].totalCurrent12Label} ${totalCurrent12Elem.textContent} A`,
      `${texts[currentLang].batteryLifeLabel} ${batteryLifeElem.textContent} ${batteryLifeUnitElem ? batteryLifeUnitElem.textContent : ''}`,
      `${texts[currentLang].batteryCountLabel} ${batteryCountElem.textContent}`
    ];
    const summary = lines.join('\n');
    copyTextToClipboard(summary).then(() => {
      copySummaryBtn.textContent = texts[currentLang].copySummarySuccess;
      const resetTimer = setTimeout(() => {
        copySummaryBtn.textContent = texts[currentLang].copySummaryBtn;
      }, 2000);
      if (typeof resetTimer.unref === 'function') {
        resetTimer.unref();
      }
    }).catch(() => {
      prompt(texts[currentLang].copySummaryBtn, summary);
    });
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
    const cam = devices?.cameras?.[cameraSelect.value];
    document.getElementById('fbResolution').value = cam?.resolutions?.[0] || '';
    document.getElementById('fbCodec').value = cam?.recordingCodecs?.[0] || '';
    document.getElementById('fbControllers').value = ctrlVals.join(', ');
    document.getElementById('fbMotors').value = motVals.join(', ');
    const fbDistance = document.getElementById('fbDistance');
    if (fbDistance && distanceSelect) {
      fbDistance.innerHTML = distanceSelect.innerHTML;
      fbDistance.value = distanceSelect.value || '';
    }
    openDialog(feedbackDialog);
  });

  feedbackCancelBtn.addEventListener('click', () => {
    closeDialog(feedbackDialog);
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
    const subject = encodeURIComponent('Cine List Runtime Feedback');
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:info@lucazanner.de?subject=${subject}&body=${body}`;
    closeDialog(feedbackDialog);
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

function generateConnectorSummary(device) {
    if (!device || typeof device !== 'object') return '';

    let portHtml = '';
    const connectors = [
        { items: device.power?.powerDistributionOutputs, icon: '⚡', cls: 'power-conn', label: 'Power', dir: 'Out' },
        { items: powerInputTypes(device).map(t => ({ type: t })), icon: '🔌', cls: 'power-conn', label: 'Power', dir: 'In' },
        { items: device.fizConnectors, icon: '🎚️', cls: 'fiz-conn', label: 'FIZ Port' },
        { items: device.video?.inputs || device.videoInputs, icon: '📺', cls: 'video-conn', label: 'Video', dir: 'In' },
        { items: device.video?.outputs || device.videoOutputs, icon: '📺', cls: 'video-conn', label: 'Video', dir: 'Out' },
        { items: device.timecode, icon: '⏱️', cls: 'neutral-conn', label: 'Timecode' },
        { items: device.audioInput?.portType ? [{ type: device.audioInput.portType }] : undefined, icon: '🎤', cls: 'neutral-conn', label: 'Audio', dir: 'In' },
        { items: device.audioOutput?.portType ? [{ type: device.audioOutput.portType }] : undefined, icon: '🔊', cls: 'neutral-conn', label: 'Audio', dir: 'Out' },
        { items: device.audioIo?.portType ? [{ type: device.audioIo.portType }] : undefined, icon: '🎚️', cls: 'neutral-conn', label: 'Audio', dir: 'I/O' },
    ];

    for (const { items, icon, cls, label, dir } of connectors) {
        portHtml += connectorBlocks(items, icon, cls, label, dir);
    }

    let specHtml = '';
    if (typeof device.powerDrawWatts === 'number') {
        specHtml += `<span class="info-box power-conn">⚡ Power: ${device.powerDrawWatts} W</span>`;
    }
    if (device.power?.input?.voltageRange) {
        specHtml += `<span class="info-box power-conn">🔋 Voltage: ${escapeHtml(String(device.power.input.voltageRange))}V</span>`;
    }
    if (typeof device.capacity === 'number') {
        specHtml += `<span class="info-box power-conn">🔋 Capacity: ${device.capacity} Wh</span>`;
    }
    if (typeof device.pinA === 'number') {
        specHtml += `<span class="info-box power-conn">Pins: ${device.pinA}A</span>`;
    }
    if (typeof device.dtapA === 'number') {
        specHtml += `<span class="info-box power-conn">D-Tap: ${device.dtapA}A</span>`;
    }
    if (device.mount_type) {
        specHtml += `<span class="info-box power-conn">Mount: ${escapeHtml(String(device.mount_type))}</span>`;
    }
    if (typeof device.screenSizeInches === 'number') {
        specHtml += `<span class="info-box video-conn">📐 Screen: ${device.screenSizeInches}"</span>`;
    }
    if (typeof device.brightnessNits === 'number') {
        specHtml += `<span class="info-box video-conn">💡 Brightness: ${device.brightnessNits} nits</span>`;
    }
    if (typeof device.wirelessTx === 'boolean') {
        specHtml += `<span class="info-box video-conn">📡 Wireless: ${device.wirelessTx}</span>`;
    }
    if (device.internalController) {
        specHtml += `<span class="info-box fiz-conn">🎛️ Controller: Internal</span>`;
    }
    if (typeof device.torqueNm === 'number') {
        specHtml += `<span class="info-box fiz-conn">⚙️ Torque: ${device.torqueNm} Nm</span>`;
    }
    if (device.powerSource) {
        specHtml += `<span class="info-box power-conn">🔌 Power Source: ${escapeHtml(String(device.powerSource))}</span>`;
    }

    let extraHtml = '';
    if (Array.isArray(device.power?.batteryPlateSupport) && device.power.batteryPlateSupport.length) {
        const types = device.power.batteryPlateSupport.map(p => {
            const mount = p.mount ? ` (${escapeHtml(p.mount)})` : '';
            return `${escapeHtml(p.type)}${mount}`;
        });
        extraHtml += `<span class="info-box power-conn">Battery Plate: ${types.join(', ')}</span>`;
    }
    if (Array.isArray(device.recordingMedia) && device.recordingMedia.length) {
        const types = device.recordingMedia.map(m => escapeHtml(m.type));
        extraHtml += `<span class="info-box video-conn">Media: ${types.join(', ')}</span>`;
    }
    if (Array.isArray(device.viewfinder) && device.viewfinder.length) {
        const types = device.viewfinder.map(v => escapeHtml(v.type));
        extraHtml += `<span class="info-box video-conn">Viewfinder: ${types.join(', ')}</span>`;
    }
    if (Array.isArray(device.gearTypes) && device.gearTypes.length) {
        const types = device.gearTypes.map(g => escapeHtml(g));
        extraHtml += `<span class="info-box fiz-conn">Gear: ${types.join(', ')}</span>`;
    }
    if (device.connectivity) {
        extraHtml += `<span class="info-box video-conn">Connectivity: ${escapeHtml(String(device.connectivity))}</span>`;
    }
    if (device.notes) {
        extraHtml += `<span class="info-box neutral-conn">Notes: ${escapeHtml(String(device.notes))}</span>`;
    }

    let lensHtml = '';
    if (Array.isArray(device.lensMount)) {
        const boxes = device.lensMount.map(lm => {
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


function suggestChargerCounts(total) {
    let quad = Math.floor(total / 4);
    const remainder = total % 4;
    let dual = 0;
    let single = 0;
    if (remainder === 0) {
        // nothing
    } else if (remainder === 3) {
        quad += 1;
    } else if (remainder > 0) {
        dual += 1;
    }
    return { quad, dual, single };
}

function addArriKNumber(name) {
    if (!name) return name;
    const d = typeof devices !== 'undefined' ? devices : {};
    const collections = [
        d.viewfinders,
        d.directorMonitors,
        d.iosVideo,
        d.videoAssist,
        d.media,
        d.lenses
    ];
    for (const col of collections) {
        if (col && col[name]) {
            const item = col[name];
            if (item.brand && item.brand.toUpperCase().includes('ARRI') && item.kNumber && !name.includes(item.kNumber)) {
                return name.replace(/^ARRI\s*/i, `ARRI ${item.kNumber} `);
            }
            return name;
        }
    }
    if (d.accessories) {
        for (const col of Object.values(d.accessories)) {
            if (col && col[name]) {
                const item = col[name];
                if (item.brand && item.brand.toUpperCase().includes('ARRI') && item.kNumber && !name.includes(item.kNumber)) {
                    return name.replace(/^ARRI\s*/i, `ARRI ${item.kNumber} `);
                }
                return name;
            }
        }
    }
    return name;
}

function collectAccessories({ hasMotor = false, videoDistPrefs = [] } = {}) {
    const cameraSupport = [];
    const misc = [];
    const monitoringSupport = [
        'BNC Cable 0.5 m',
        'BNC Cable 1 m',
        'BNC Cable 5 m',
        'BNC Cable 10 m',
        'BNC Drum 25 m'
    ];
    const rigging = [];
    const chargers = [];
    const fizCables = [];
    const acc = devices.accessories || {};
    const excludedCables = new Set(['D-Tap to LEMO 2-pin', 'HDMI Cable']);

    if (batterySelect.value) {
        const mount = devices.batteries[batterySelect.value]?.mount_type;
        if (acc.powerPlates) {
            for (const [name, plate] of Object.entries(acc.powerPlates)) {
                if ((!plate.mount || plate.mount === mount) && (!plate.compatible || plate.compatible.includes(cameraSelect.value))) {
                    cameraSupport.push(name);
                }
            }
        }
        if (acc.chargers) {
            let camCount = parseInt(batteryCountElem?.textContent || '', 10);
            if (!Number.isFinite(camCount)) camCount = batterySelect.value ? 1 : 0;
            let monCount = 0;
            if (Array.isArray(videoDistPrefs)) {
                const handheldCount = videoDistPrefs.filter(v => /Monitor(?: \d+")? handheld$/.test(v)).length;
                monCount += handheldCount * 3;
                const largeCount = videoDistPrefs.filter(v => {
                    const m = v.match(/Monitor (\d+(?:\.\d+)?)/);
                    return m && parseFloat(m[1]) > 10 && !/handheld$/.test(v);
                }).length;
                monCount += largeCount * 2;
            }
            if (hasMotor) monCount += 3;
            const total = camCount + monCount;
            if (total > 0) {
                const counts = suggestChargerCounts(total);
                const findName = slots => {
                    for (const [name, charger] of Object.entries(acc.chargers)) {
                        if (charger.mount === mount && charger.slots === slots) return name;
                    }
                    return null;
                };
                const pushCharger = (slots, count) => {
                    const n = findName(slots);
                    if (!n) return;
                    for (let i = 0; i < count; i++) chargers.push(n);
                };
                pushCharger(4, counts.quad);
                pushCharger(2, counts.dual);
                pushCharger(1, counts.single);
            }
        }
    }

    if (cameraSelect.value && acc.cages) {
        if (!cageSelect.value || cageSelect.value === 'None') {
            for (const [name, cage] of Object.entries(acc.cages)) {
                if (!cage.compatible || cage.compatible.includes(cameraSelect.value)) cameraSupport.push(name);
            }
        }
    }

    const powerCableDb = acc.cables?.power || {};
    const gatherPower = (data, target = misc, includeExcluded = false) => {
        const input = data?.power?.input?.type;
        const types = Array.isArray(input) ? input : input ? [input] : [];
        types.forEach(t => {
            for (const [name, cable] of Object.entries(powerCableDb)) {
                const isExcluded = excludedCables.has(name);
                if (cable.to === t && (!isExcluded || includeExcluded)) target.push(name);
            }
        });
    };
    gatherPower(devices.cameras[cameraSelect.value]);
    gatherPower(devices.video[videoSelect.value]);
    const onboardMonitor = devices.monitors[monitorSelect.value];
    if (onboardMonitor) {
        const monitorLabel = 'Onboard monitor';
        const powerType = onboardMonitor?.power?.input?.type;
        const hasLemo2 = Array.isArray(powerType)
            ? powerType.includes('LEMO 2-pin')
            : powerType === 'LEMO 2-pin';
        if (hasLemo2) {
            monitoringSupport.push(
                `D-Tap to Lemo-2-pin Cable 0,5m (${monitorLabel})`,
                `D-Tap to Lemo-2-pin Cable 0,5m (${monitorLabel})`
            );
        }
        const cameraData = devices.cameras[cameraSelect.value];
        const camVideo = (cameraData?.videoOutputs || []).map(v => v.type?.toUpperCase());
        const monVideo = (onboardMonitor.videoInputs || []).map(v => v.type?.toUpperCase());
        const hasSDI = camVideo.some(t => t && t.includes('SDI')) && monVideo.some(t => t && t.includes('SDI'));
        const hasHDMI = camVideo.includes('HDMI') && monVideo.includes('HDMI');
        if (hasSDI) {
            monitoringSupport.push(
                `Ultraslim BNC Cable 0.5 m (${monitorLabel})`,
                `Ultraslim BNC Cable 0.5 m (${monitorLabel})`
            );
        } else if (hasHDMI) {
            monitoringSupport.push(
                `Ultraslim HDMI 0.5 m (${monitorLabel})`,
                `Ultraslim HDMI 0.5 m (${monitorLabel})`
            );
        }
        rigging.push(`ULCS Arm mit 3/8" und 1/4" double (${monitorLabel})`);
    }
    if (videoSelect.value) {
        const rxName = videoSelect.value.replace(/ TX\b/, ' RX');
        if (devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
            gatherPower(devices.wirelessReceivers[rxName]);
        }
    }
    motorSelects.forEach(sel => gatherPower(devices.fiz.motors[sel.value]));
    controllerSelects.forEach(sel => gatherPower(devices.fiz.controllers[sel.value]));
    gatherPower(devices.fiz.distance[distanceSelect.value]);

    const fizCableDb = devices.fiz?.cables || acc.cables?.fiz || {};
    const motorDatas = motorSelects.map(sel => devices.fiz.motors[sel.value]).filter(Boolean);
    const controllerDatas = controllerSelects.map(sel => devices.fiz.controllers[sel.value]).filter(Boolean);
    motorDatas.forEach(m => {
        const mConns = (m.fizConnectors || []).map(fc => fc.type || fc);
        controllerDatas.forEach(c => {
            const cConns = (c.fizConnectors || []).map(fc => fc.type || fc);
            mConns.forEach(mc => {
                cConns.forEach(cc => {
                    if (mc === cc) {
                        for (const [name, cable] of Object.entries(fizCableDb)) {
                            if (cable.from === mc && cable.to === cc) fizCables.push(name);
                        }
                    }
                });
            });
        });
    });

    const miscUnique = [...new Set(misc)];
    const monitoringSupportList = monitoringSupport.slice();
    const riggingUnique = [...new Set(rigging)];
    for (let i = 0; i < 4; i++) monitoringSupportList.push('BNC Connector');
    return {
        cameraSupport: [...new Set(cameraSupport)],
        chargers,
        fizCables: [...new Set(fizCables)],
        misc: miscUnique,
        monitoringSupport: monitoringSupportList,
        rigging: riggingUnique
    };
}

function collectProjectFormData() {
    if (!projectForm) return {};
    const val = name => (projectForm.querySelector(`[name="${name}"]`)?.value || '').trim();
    const multi = name => Array.from(projectForm.querySelector(`[name="${name}"]`)?.selectedOptions || [])
        .map(o => o.value).join(', ');
    const range = (start, end) => [val(start), val(end)].filter(Boolean).join(' to ');
    const viewfinderSettings = multi('viewfinderSettings');
    const frameGuides = multi('frameGuides');
    const aspectMaskOpacity = multi('aspectMaskOpacity');
    return {
        projectName: val('projectName'),
        dop: val('dop'),
        prepDays: range('prepStart','prepEnd'),
        shootingDays: range('shootStart','shootEnd'),
        deliveryResolution: val('deliveryResolution'),
        recordingResolution: val('recordingResolution'),
        aspectRatio: multi('aspectRatio'),
        codec: val('codec'),
        baseFrameRate: val('baseFrameRate'),
        sensorMode: val('sensorMode'),
        lenses: multi('lenses'),
        requiredScenarios: multi('requiredScenarios'),
        cameraHandle: multi('cameraHandle'),
        viewfinderExtension: val('viewfinderExtension'),
        viewfinderEyeLeatherColor: val('viewfinderEyeLeatherColor'),
        mattebox: val('mattebox'),
        gimbal: multi('gimbal'),
        viewfinderSettings,
        frameGuides,
        aspectMaskOpacity,
        videoDistribution: multi('videoDistribution'),
        monitoringConfiguration: val('monitoringConfiguration'),
        monitorUserButtons: multi('monitorUserButtons'),
        cameraUserButtons: multi('cameraUserButtons'),
        viewfinderUserButtons: multi('viewfinderUserButtons'),
        tripodHeadBrand: val('tripodHeadBrand'),
        tripodBowl: val('tripodBowl'),
        tripodTypes: multi('tripodTypes'),
        tripodSpreader: val('tripodSpreader'),
        sliderBowl: getSliderBowlValue(),
        filter: multi('filter')
    };
}

function populateProjectForm(info) {
    if (!projectForm || !info) return;
    const setVal = (name, value) => {
        const field = projectForm.querySelector(`[name="${name}"]`);
        if (field) field.value = value || '';
    };
    const setMulti = (name, values) => {
        const field = projectForm.querySelector(`[name="${name}"]`);
        if (!field) return;
        const arr = Array.isArray(values) ? values : (values ? values.split(',').map(v => v.trim()) : []);
        Array.from(field.options).forEach(opt => {
            opt.selected = arr.includes(opt.value);
        });
    };

    populateRecordingResolutionDropdown(info.recordingResolution);
    populateSensorModeDropdown(info.sensorMode);
    populateCodecDropdown(info.codec);

    setVal('projectName', info.projectName);
    setVal('dop', info.dop);
    const [prepStart, prepEnd] = (info.prepDays || '').split(' to ');
    setVal('prepStart', prepStart);
    setVal('prepEnd', prepEnd);
    const [shootStart, shootEnd] = (info.shootingDays || '').split(' to ');
    setVal('shootStart', shootStart);
    setVal('shootEnd', shootEnd);
    setVal('deliveryResolution', info.deliveryResolution);
    setMulti('aspectRatio', info.aspectRatio);
    setVal('baseFrameRate', info.baseFrameRate);
    setVal('sensorMode', info.sensorMode);
    setMulti('lenses', info.lenses);
    setMulti('requiredScenarios', info.requiredScenarios);
    setMulti('cameraHandle', info.cameraHandle);
    setVal('viewfinderExtension', info.viewfinderExtension);
    setVal('viewfinderEyeLeatherColor', info.viewfinderEyeLeatherColor);
    setVal('mattebox', info.mattebox);
    setMulti('gimbal', info.gimbal);
    setMulti('viewfinderSettings', info.viewfinderSettings);
    setMulti('frameGuides', info.frameGuides);
    setMulti('aspectMaskOpacity', info.aspectMaskOpacity);
    setMulti('videoDistribution', info.videoDistribution);
    setVal('monitoringConfiguration', info.monitoringConfiguration);
    setMulti('monitorUserButtons', info.monitorUserButtons);
    setMulti('cameraUserButtons', info.cameraUserButtons);
    setMulti('viewfinderUserButtons', info.viewfinderUserButtons);
    setVal('tripodHeadBrand', info.tripodHeadBrand);
    setVal('tripodBowl', info.tripodBowl);
    setMulti('tripodTypes', info.tripodTypes);
    setVal('tripodSpreader', info.tripodSpreader);
    setSliderBowlValue(info.sliderBowl || '');
    setMulti('filter', info.filter);
}

function ensureZoomRemoteSetup(info) {
    if (!info || !info.tripodPreferences || !info.tripodPreferences.includes('Zoom Remote handle')) return;
    let motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    if (!motors.length) return;
    if (motors.length < 2 && motorSelects[1]) {
        let second = motors[0];
        if (/cforce.*rf/i.test(second) && devices.fiz.motors['Arri Cforce Mini']) {
            second = 'Arri Cforce Mini';
        }
        motorSelects[1].value = second;
        motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    }
    const allowed = new Set([
        'Arri Master Grip (single unit)',
        'Arri ZMU-4 (body only, wired)',
        'Tilta Nucleus-M Hand Grip (single)',
        'Tilta Nucleus-M II Handle (single)'
    ]);
    const controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    if (!controllers.some(c => allowed.has(c))) {
        const brand = detectBrand(motors[0]);
        let ctrl = null;
        if (brand === 'arri') {
            ctrl = 'Arri Master Grip (single unit)';
        } else if (brand === 'tilta') {
            ctrl = 'Tilta Nucleus-M Hand Grip (single)';
        }
        if (ctrl && controllerSelects[0]) {
            controllerSelects[0].value = ctrl;
        }
    }
    if (typeof updateCalculations === 'function') updateCalculations();
    if (typeof saveCurrentSession === 'function') saveCurrentSession();
}

function generateGearListHtml(info = {}) {
    const getText = sel => sel && sel.options && sel.selectedIndex >= 0
        ? sel.options[sel.selectedIndex].text.trim()
        : '';
    const selectedNames = {
        camera: cameraSelect && cameraSelect.value && cameraSelect.value !== 'None' ? getText(cameraSelect) : '',
        monitor: monitorSelect && monitorSelect.value && monitorSelect.value !== 'None' ? getText(monitorSelect) : '',
        video: videoSelect && videoSelect.value && videoSelect.value !== 'None' ? getText(videoSelect) : '',
        motors: motorSelects
            .map(sel => sel && sel.value && sel.value !== 'None' ? getText(sel) : '')
            .filter(Boolean),
        controllers: controllerSelects
            .map(sel => sel && sel.value && sel.value !== 'None' ? getText(sel) : '')
            .filter(Boolean),
        distance: distanceSelect && distanceSelect.value && distanceSelect.value !== 'None' ? getText(distanceSelect) : '',
        cage: cageSelect && cageSelect.value && cageSelect.value !== 'None' ? getText(cageSelect) : '',
        battery: batterySelect && batterySelect.value && batterySelect.value !== 'None' ? getText(batterySelect) : ''
    };
    const hasMotor = selectedNames.motors.length > 0;
    const videoDistPrefs = info.videoDistribution
        ? info.videoDistribution.split(',').map(s => s.trim()).filter(Boolean)
        : [];
    const handheldPrefs = videoDistPrefs
        .map(p => {
            const m = p.match(/^(Director|Gaffer|DoP) Monitor (?:(\d+)" )?handheld$/);
            return m ? { role: m[1], size: m[2] ? parseFloat(m[2]) : undefined } : null;
        })
        .filter(Boolean);
    const largeMonitorPrefs = videoDistPrefs
        .map(p => {
            const m = p.match(/^(Director|Combo|DoP) Monitor 15-21"$/);
            return m ? { role: m[1] } : null;
        })
        .filter(Boolean);
    if (["Arri Alexa Mini", "Arri Amira"].includes(selectedNames.camera)) {
        selectedNames.viewfinder = "ARRI K2.75004.0 MVF-1 Viewfinder";
    } else {
        selectedNames.viewfinder = "";
    }
    const { cameraSupport: cameraSupportAcc, chargers: chargersAcc, fizCables: fizCableAcc, misc: miscAcc, monitoringSupport: monitoringSupportAcc, rigging: riggingAcc } = collectAccessories({ hasMotor, videoDistPrefs });
    for (let i = 0; i < 2; i++) riggingAcc.push('ULCS Bracket with 1/4 to 1/4');
    for (let i = 0; i < 2; i++) riggingAcc.push('ULCS Bracket with 3/8 to 1/4');
    for (let i = 0; i < 2; i++) riggingAcc.push('Noga Arm');
    for (let i = 0; i < 2; i++) riggingAcc.push('Mini Magic Arm');
    for (let i = 0; i < 4; i++) riggingAcc.push('Cine Quick Release');
    riggingAcc.push('SmallRig - Super lightweight 15mm RailBlock');
    for (let i = 0; i < 3; i++) riggingAcc.push('spigot with male 3/8" and 1/4"');
    for (let i = 0; i < 2; i++) riggingAcc.push('Clapper Stick');
    for (let i = 0; i < 2; i++) riggingAcc.push('D-Tap Splitter');
    const cagesDb = devices.accessories?.cages || {};
    const compatibleCages = [];
    if (cameraSelect && cameraSelect.value && cameraSelect.value !== 'None') {
        for (const [name, cage] of Object.entries(cagesDb)) {
            if (!cage.compatible || cage.compatible.includes(cameraSelect.value)) {
                compatibleCages.push(name);
            }
        }
    }
    const supportAccNoCages = cameraSupportAcc.filter(item => !compatibleCages.includes(item));
    const scenarios = info.requiredScenarios
        ? info.requiredScenarios.split(',').map(s => s.trim()).filter(Boolean)
        : [];
    const hasGimbal = scenarios.includes('Gimbal');
    if (scenarios.includes('Trinity') || scenarios.includes('Steadicam')) {
        for (let i = 0; i < 2; i++) {
            riggingAcc.push('D-Tap Splitter');
            riggingAcc.push('D-Tap Extension 50 cm (Steadicam/Trinity)');
        }
    }
    const handleSelections = info.cameraHandle
        ? info.cameraHandle.split(',').map(r => r.trim()).filter(Boolean)
        : [];
    const viewfinderExtSelections = info.viewfinderExtension
        ? info.viewfinderExtension.split(',').map(r => r.trim()).filter(Boolean)
        : [];
    const monitoringSettings = [
        ...(info.viewfinderSettings ? info.viewfinderSettings.split(',').map(s => s.trim()) : []),
        ...(info.frameGuides ? info.frameGuides.split(',').map(s => s.trim()) : []),
        ...(info.aspectMaskOpacity ? info.aspectMaskOpacity.split(',').map(s => s.trim()) : []),
        ...(info.monitoringSettings ? info.monitoringSettings.split(',').map(s => s.trim()) : []),
    ].filter(Boolean);
    const selectedLensNames = info.lenses
        ? info.lenses.split(',').map(s => s.trim()).filter(Boolean)
        : [];
    const maxLensFront = selectedLensNames.reduce((max, name) => {
        const lens = devices.lenses && devices.lenses[name];
        return Math.max(max, lens && lens.frontDiameterMm || 0);
    }, 0);
    const filterSelections = info.filter
        ? info.filter.split(',').map(s => s.trim()).filter(Boolean)
        : [];
    if (info.mattebox) {
        const matteboxes = devices.accessories?.matteboxes || {};
        for (const [name, mb] of Object.entries(matteboxes)) {
            const normalize = s => s.replace(/[-\s]/g, '').toLowerCase();
            if (mb.type && normalize(mb.type) === normalize(info.mattebox)) {
                filterSelections.unshift(name);
                if (name === 'ARRI LMB 4x5 Pro Set') {
                    filterSelections.push('ARRI LMB 19mm Studio Rod Adapter');
                    filterSelections.push('ARRI LMB 4x5 / LMB-6 Tray Catcher');
                } else if (name === 'ARRI LMB 4x5 15mm LWS Set 3-Stage') {
                    filterSelections.push('ARRI LMB 19mm Studio Rod Adapter');
                    filterSelections.push('ARRI LMB 4x5 / LMB-6 Tray Catcher');
                    filterSelections.push('ARRI LMB 4x5 Side Flags');
                    filterSelections.push('ARRI LMB Flag Holders');
                    filterSelections.push('ARRI LMB 4x5 Set of Mattes spherical');
                    filterSelections.push('ARRI LMB Accessory Adapter');
                    filterSelections.push('ARRI Anti-Reflection Frame 4x5.65');
                } else if (name === 'ARRI LMB 4x5 Clamp-On (3-Stage)') {
                    filterSelections.push('ARRI LMB 4x5 / LMB-6 Tray Catcher');
                    filterSelections.push('ARRI LMB 4x5 Side Flags');
                    filterSelections.push('ARRI LMB Flag Holders');
                    filterSelections.push('ARRI LMB 4x5 Set of Mattes spherical');
                    filterSelections.push('ARRI LMB Accessory Adapter');
                    filterSelections.push('ARRI Anti-Reflection Frame 4x5.65');
                    filterSelections.push('ARRI LMB 4x5 Clamp Adapter Set Pro');
                    const lensNames = info.lenses
                        ? info.lenses.split(',').map(s => s.trim()).filter(Boolean)
                        : [];
                    const diameters = [...new Set(lensNames
                        .map(n => devices.lenses && devices.lenses[n] && devices.lenses[n].frontDiameterMm)
                        .filter(Boolean))];
                    diameters.forEach(d => filterSelections.push(`ARRI LMB 4x5 Clamp Adapter ${d}mm`));
                }
                break;
            }
        }
    }
    viewfinderExtSelections.forEach(vf => supportAccNoCages.push(vf));
    if (scenarios.includes('Rain Machine') || scenarios.includes('Extreme rain')) {
        filterSelections.push('Schulz Sprayoff Micro');
        filterSelections.push('Fischer RS to D-Tap cable 0,5m');
        filterSelections.push('Fischer RS to D-Tap cable 0,5m');
        filterSelections.push('Spare Disc (Schulz Sprayoff Micro)');
    }
    let gimbalSelectionsFinal = [];
    let selectedGimbal = '';
    if (hasGimbal) {
        const gimbalSelections = info.gimbal
            ? info.gimbal.split(',').map(s => s.trim()).filter(Boolean)
            : [];
        const bigLens = maxLensFront > 95;
        if (gimbalSelections.length) {
            gimbalSelectionsFinal = gimbalSelections.map(g => (/Ronin RS4 Pro/i.test(g) && bigLens ? 'DJI Ronin 2' : g));
            if (gimbalSelectionsFinal.length === 1) selectedGimbal = gimbalSelectionsFinal[0];
        } else {
            const cam = devices && devices.cameras && devices.cameras[selectedNames.camera];
            const weight = cam && cam.weight_g;
            const isSmall = weight != null ? weight < 2000 : /(FX3|FX6|R5)/i.test(selectedNames.camera);
            selectedGimbal = bigLens ? 'DJI Ronin 2' : (isSmall ? 'DJI Ronin RS4 Pro Combo' : 'DJI Ronin 2');
            gimbalSelectionsFinal = [selectedGimbal];
        }
        if (/Ronin RS4 Pro/i.test(selectedGimbal) && maxLensFront <= 95) {
            filterSelections.push('Tilta Mirage VND Kit');
            filterSelections.push('Tilta 95 mm Polarizer Filter für Tilta Mirage');
            filterSelections.push('Vaxis 95 mm IRND Filter 0.3 + 0.6 + 0.9 + 1.2 Filter');
            filterSelections.push('Vaxis 95mm Black Mist 1/4 + 1/8 Filter');
        } else {
            filterSelections.push('Arri KK.0038066 Flexible Sunshade Side Flag Holders Set');
        }
    }
    const receiverLabels = [];
    handheldPrefs.forEach(p => receiverLabels.push(`${p.role} handheld`));
    largeMonitorPrefs.forEach(p => receiverLabels.push(`${p.role} 15-21"`));
    if (hasMotor) receiverLabels.push('Focus');
    const receiverCount = receiverLabels.length;
    if (selectedNames.video) {
        monitoringSupportAcc.push('Antenna 5,8GHz 5dBi Long (spare)');
        const rxName = selectedNames.video.replace(/ TX\b/, ' RX');
        if (devices && devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
            const receivers = receiverCount || 1;
            for (let i = 0; i < receivers; i++) {
                monitoringSupportAcc.push('Antenna 5,8GHz 5dBi Long (spare)');
            }
        }
    }
    const addMonitorCables = label => {
        monitoringSupportAcc.push(
            `D-Tap to Lemo-2-pin Cable 0,3m (${label})`,
            `D-Tap to Lemo-2-pin Cable 0,3m (${label})`,
            `Ultraslim BNC Cable 0.3 m (${label})`,
            `Ultraslim BNC Cable 0.3 m (${label})`
        );
    };
    handheldPrefs.forEach(p => addMonitorCables(`${p.role} handheld`));
    const addLargeMonitorCables = label => {
        monitoringSupportAcc.push(
            `D-Tap to Lemo-2-pin Cable 0,5m (${label})`,
            `D-Tap to Lemo-2-pin Cable 0,5m (${label})`,
            `Ultraslim BNC Cable 0.5 m (${label})`,
            `Ultraslim BNC Cable 0.5 m (${label})`
        );
    };
    largeMonitorPrefs.forEach(p => addLargeMonitorCables(`${p.role} 15-21"`));
    if (hasMotor) {
        monitoringSupportAcc.push(
            'D-Tap to Mini XLR 3-pin Cable 0,3m (Focus)',
            'D-Tap to Mini XLR 3-pin Cable 0,3m (Focus)',
            'Ultraslim BNC Cable 0.3 m (Focus)',
            'Ultraslim BNC Cable 0.3 m (Focus)'
        );
    }
    const handleName = 'SHAPE Telescopic Handle ARRI Rosette Kit 12"';
    const addHandle = () => {
        if (!supportAccNoCages.includes(handleName)) {
            supportAccNoCages.push(handleName);
        }
    };
    if (scenarios.includes('Handheld') && scenarios.includes('Easyrig')) {
        addHandle();
    }
    if (handleSelections.includes('Hand Grips')) {
        addHandle();
    }
    if (handleSelections.includes('Handle Extension')) {
        supportAccNoCages.push('ARRI K2.0019797 HEX-3');
    }
    if (handleSelections.includes('L-Handle')) {
        supportAccNoCages.push('ARRI KK.0037820 Handle Extension Set');
    }
    const projectInfo = { ...info };
    if (monitoringSettings.length) {
        projectInfo.monitoringSupport = monitoringSettings.join(', ');
    }
    delete projectInfo.monitoringSettings;
    const projectTitle = escapeHtml(info.projectName || setupNameInput.value);
    const labels = {
        dop: 'DoP',
        prepDays: 'Prep Days',
        shootingDays: 'Shooting Days',
        deliveryResolution: 'Delivery Resolution',
        recordingResolution: 'Recording Resolution',
        aspectRatio: 'Aspect Ratio',
        codec: 'Codec',
        baseFrameRate: 'Base Frame Rate',
        sensorMode: 'Sensor Mode',
        lenses: 'Lenses',
        requiredScenarios: 'Required Scenarios',
        cameraHandle: 'Camera Handle',
        viewfinderExtension: 'Viewfinder Extension',
        viewfinderEyeLeatherColor: 'Viewfinder Eye Leather Color',
        mattebox: 'Mattebox',
        gimbal: 'Gimbal',
        viewfinderSettings: 'Viewfinder Settings',
        frameGuides: 'Frame Guides',
        aspectMaskOpacity: 'Aspect Mask Opacity',
        videoDistribution: 'Video Distribution',
        monitoringSupport: 'Monitoring support',
        monitoringConfiguration: 'Monitoring configuration',
        monitorUserButtons: 'Onboard Monitor User Buttons',
        cameraUserButtons: 'Camera User Buttons',
        viewfinderUserButtons: 'Viewfinder User Buttons',
        tripodHeadBrand: 'Tripod Head Brand',
        tripodBowl: 'Tripod Bowl',
        tripodTypes: 'Tripod Types',
        tripodSpreader: 'Tripod Spreader',
        sliderBowl: 'Slider Bowl',
        filter: 'Filter'
    };
    const excludedFields = new Set([
        'cameraHandle',
        'viewfinderExtension',
        'mattebox',
        'videoDistribution',
        'monitoringConfiguration',
        'filter',
        'tripodHeadBrand',
        'tripodBowl',
        'tripodTypes',
        'tripodSpreader',
        'sliderBowl',
        'lenses'
    ]);
    const infoEntries = Object.entries(projectInfo)
        .filter(([k, v]) => v && k !== 'projectName' && !excludedFields.has(k));
    const boxesHtml = infoEntries.length ? '<div class="requirements-grid">' +
        infoEntries.map(([k, v]) => `<div class="requirement-box" data-field="${k}"><span class="req-icon">${projectFieldIcons[k] || ''}</span><span class="req-label">${escapeHtml(labels[k] || k)}</span><span class="req-value">${escapeHtml(v)}</span></div>`).join('') + '</div>' : '';
    const infoHtml = infoEntries.length ? `<h3>Project Requirements</h3>${boxesHtml}` : '';
    const formatItems = arr => {
        const counts = {};
        arr.filter(Boolean).map(addArriKNumber).forEach(item => {
            const match = item.trim().match(/^(.*?)(?: \(([^()]+)\))?$/);
            const base = match ? match[1].trim() : item.trim();
            const ctx = match && match[2] ? match[2].trim() : '';
            if (!counts[base]) {
                counts[base] = { total: 0, ctxCounts: {} };
            }
            counts[base].total++;
            counts[base].ctxCounts[ctx] = (counts[base].ctxCounts[ctx] || 0) + 1;
        });
        return Object.entries(counts)
            .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
            .map(([base, { total, ctxCounts }]) => {
                const ctxKeys = Object.keys(ctxCounts);
                const hasContext = ctxKeys.some(c => c);
                let ctxParts = [];
                if (hasContext) {
                    if (base === 'sand bag') {
                        const realEntries = Object.entries(ctxCounts)
                            .filter(([c]) => c && c.toLowerCase() !== 'spare')
                            .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                        const usedCount = realEntries.reduce((sum, [, count]) => sum + count, 0);
                        const spareCount = total - usedCount;
                        ctxParts = realEntries.map(([c, count]) => `${count}x ${c}`);
                        if (spareCount > 0) ctxParts.push(`${spareCount}x Spare`);
                    } else if (base.startsWith('Bebob ')) {
                        const realEntries = Object.entries(ctxCounts)
                            .filter(([c]) => c && c.toLowerCase() !== 'spare')
                            .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                        const usedCount = realEntries.reduce((sum, [, count]) => sum + count, 0);
                        const spareCount = total - usedCount;
                        ctxParts = realEntries.map(([c, count]) => `${count}x ${c}`);
                        if (spareCount > 0) ctxParts.push(`${spareCount}x Spare`);
                    } else {
                        const realContexts = ctxKeys.filter(c => c && c.toLowerCase() !== 'spare');
                        const spareCount = total - realContexts.length;
                        ctxParts = realContexts.map(c => `1x ${c}`);
                        if (spareCount > 0) ctxParts.push(`${spareCount}x Spare`);
                    }
                }
                const ctxStr = ctxParts.length ? ` (${ctxParts.join(', ')})` : '';
                const translatedBase = gearItemTranslations[currentLang]?.[base] || base;
                const displayName = `${translatedBase}${ctxStr}`;
                const dataName = `${base}${ctxStr}`;
                return `<span class="gear-item" data-gear-name="${escapeHtml(dataName)}">${total}x ${escapeHtml(displayName)}</span>`;
            })
            .join('<br>');
    };
    const rows = [];
    const addRow = (cat, items) => {
        rows.push(`<tr class="category-row"><td>${cat}</td></tr>`);
        rows.push(`<tr><td>${items}</td></tr>`);
    };
    addRow('Camera', formatItems([selectedNames.camera]));
    const cameraSupportText = formatItems(supportAccNoCages);
    let cageSelectHtml = '';
    if (compatibleCages.length) {
        const options = compatibleCages.map(c => `<option value="${escapeHtml(c)}"${c === selectedNames.cage ? ' selected' : ''}>${escapeHtml(addArriKNumber(c))}</option>`).join('');
        cageSelectHtml = `1x <select id="gearListCage">${options}</select>`;
    }
    addRow('Camera Support', [cameraSupportText, cageSelectHtml].filter(Boolean).join('<br>'));
    let mediaItems = '';
    const cam = devices && devices.cameras && selectedNames.camera ? devices.cameras[selectedNames.camera] : null;
    if (cam && Array.isArray(cam.recordingMedia) && cam.recordingMedia.length) {
        const sizeMap = {
            'CFexpress Type A': '320GB',
            'CFast 2.0': '512GB',
            'CFexpress Type B': '512GB',
            'Codex Compact Drive': '1TB',
            'AXS Memory A-Series slot': '1TB',
            'SD': '128GB',
            'SD Card': '128GB',
            'SDXC': '128GB',
            'XQD Card': '120GB',
            'RED MINI-MAG': '512GB',
            'REDMAG 1.8" SSD': '512GB',
            'Blackmagic Media Module': '8TB',
            'DJI PROSSD': '1TB',
            'USB-C 3.1 Gen 1 expansion port for external media': '1TB',
            'USB-C 3.1 Gen 2 expansion port for external media': '1TB',
            'USB-C to external SSD/HDD': '1TB'
        };
        mediaItems = cam.recordingMedia
            .slice(0, 1)
            .map(m => {
                const type = m && m.type ? m.type : '';
                if (!type) return '';
                let size = '';
                if (m.notes) {
                    const match = m.notes.match(/(\d+(?:\.\d+)?\s*(?:TB|GB))/i);
                    if (match) size = match[1].toUpperCase();
                }
                if (!size) size = sizeMap[type] || '512GB';
                return `4x ${escapeHtml(size)} ${escapeHtml(type)}<br>2x ${escapeHtml(type)} reader with USB-C`;
            })
            .filter(Boolean)
            .join('<br>');
    }
    addRow('Media', mediaItems);
    const lensDisplayNames = selectedLensNames.map(name => {
        const lens = devices.lenses && devices.lenses[name];
        const base = addArriKNumber(name);
        if (!lens) return base;
        const attrs = [];
        if (lens.weight_g) attrs.push(`${lens.weight_g}g`);
        if (lens.clampOn) {
            if (lens.frontDiameterMm) attrs.push(`${lens.frontDiameterMm}mm clamp-on`);
            else attrs.push('clamp-on');
        } else if (lens.clampOn === false) {
            attrs.push('no clamp-on');
        }
        const minFocus = lens.minFocusMeters ?? lens.minFocus ?? (lens.minFocusCm ? lens.minFocusCm / 100 : null);
        if (minFocus) attrs.push(`${minFocus}m min focus`);
        return attrs.length ? `${base} (${attrs.join(', ')})` : base;
    });
    addRow('Lens', formatItems(lensDisplayNames));
    const lensSupportItems = [];
    const requiredRodTypes = new Set();
    const addedRodPairs = new Set();
    selectedLensNames.forEach(name => {
        const lens = devices.lenses && devices.lenses[name];
        if (!lens) return;
        const rodType = lens.rodStandard || '15mm';
        const rodLength = lens.rodLengthCm || (rodType === '19mm' ? 45 : 30);
        const rodKey = `${rodType}-${rodLength}`;
        if (!addedRodPairs.has(rodKey)) {
            lensSupportItems.push(`${rodType} rods ${rodLength}cm`);
            addedRodPairs.add(rodKey);
        }
        requiredRodTypes.add(rodType);
        if (lens.needsLensSupport) {
            lensSupportItems.push(`${rodType} lens support`);
        }
    });
    const cageRod = devices.accessories?.cages?.[selectedNames.cage]?.rodStandard;
    const cageRodTypes = cageRod ? (Array.isArray(cageRod) ? cageRod : [cageRod]) : [];
    requiredRodTypes.forEach(rt => {
        if (cageRodTypes.length && !cageRodTypes.includes(rt)) {
            lensSupportItems.push(`⚠️ cage incompatible with ${rt} rods`);
        }
    });
    addRow('Lens Support', formatItems(lensSupportItems));
    addRow('Matte box + filter', formatItems(filterSelections));
    addRow('LDS (FIZ)', formatItems([...selectedNames.motors, ...selectedNames.controllers, selectedNames.distance, ...fizCableAcc]));
    let batteryItems = '';
    if (selectedNames.battery) {
        let count = batteryCountElem ? parseInt(batteryCountElem.textContent, 10) : NaN;
        if (!count || isNaN(count)) count = 1;
        const safeBatt = escapeHtml(addArriKNumber(selectedNames.battery));
        batteryItems = `${count}x ${safeBatt}`;
        const swapName = hotswapSelect && hotswapSelect.value && hotswapSelect.value !== 'None' ? getText(hotswapSelect) : '';
        if (swapName) {
            batteryItems += `<br>1x ${escapeHtml(swapName)}`;
        }
    }
    addRow('Camera Batteries', batteryItems);
    let monitoringItems = '';
    const monitorSizes = [];
    if (selectedNames.viewfinder) {
        monitoringItems += `1x <strong>Viewfinder</strong> - ${escapeHtml(addArriKNumber(selectedNames.viewfinder))}`;
    }
    if (selectedNames.monitor) {
        const size = devices?.monitors?.[selectedNames.monitor]?.screenSizeInches;
        if (size) monitorSizes.push(size);
        const sizeHtml = size ? `${size}&quot; - ` : '';
        monitoringItems += (monitoringItems ? '<br>' : '') + `1x <strong>Onboard Monitor</strong> - ${sizeHtml}${escapeHtml(addArriKNumber(selectedNames.monitor))} - incl. Sunhood`;
    }
    handheldPrefs.forEach(({ role, size }) => {
        const monitorsDb = devices && devices.monitors ? devices.monitors : {};
        const names = Object.keys(monitorsDb)
            .filter(n => (!monitorsDb[n].wirelessTx || monitorsDb[n].wirelessRX))
            .sort(localeSort);
        let defaultName = names.includes('SmallHD Ultra 7') ? 'SmallHD Ultra 7' : names[0];
        if (size) {
            const sized = names.find(n => monitorsDb[n].screenSizeInches === size);
            if (size === 7 && names.includes('SmallHD Ultra 7')) {
                defaultName = 'SmallHD Ultra 7';
            } else if (sized) {
                defaultName = sized;
            }
        }
        const opts = names
            .map(n => `<option value="${escapeHtml(n)}"${n === defaultName ? ' selected' : ''}>${escapeHtml(addArriKNumber(n))}</option>`)
            .join('');
        const idSuffix = role === 'DoP' ? 'Dop' : role;
        const labelRole = role.replace(/s$/, '');
        const selectedSize = devices && devices.monitors && devices.monitors[defaultName]
            ? devices.monitors[defaultName].screenSizeInches
            : '';
        monitoringItems += (monitoringItems ? '<br>' : '') + `1x <strong>${labelRole} Handheld Monitor</strong> - <span id="monitorSize${idSuffix}">${selectedSize}&quot;</span> - <select id="gearList${idSuffix}Monitor">${opts}</select> incl. Directors cage, shoulder strap, sunhood, rigging for teradeks`;
        monitorSizes.push(selectedSize);
    });
    largeMonitorPrefs.forEach(({ role }) => {
        const dirDb = devices && devices.directorMonitors ? devices.directorMonitors : {};
        const names = Object.keys(dirDb).filter(n => n !== 'None').sort(localeSort);
        const defaultName = 'SmallHD Cine 24" 4K High-Bright Monitor';
        const opts = names
            .map(n => `<option value="${escapeHtml(n)}"${n === defaultName ? ' selected' : ''}>${escapeHtml(addArriKNumber(n))}</option>`)
            .join('');
        const idSuffix = role === 'DoP' ? 'Dop' : role;
        const size = dirDb[defaultName]?.screenSizeInches || '';
        monitoringItems += (monitoringItems ? '<br>' : '') + `1x <strong>${role} Monitor</strong> - ${size}&quot; - <select id="gearList${idSuffix}Monitor15">${opts}</select> incl. sunhood, V-Mount, AC Adapter and Wooden Camera Ultra QR Monitor Mount (Baby Pin, C-Stand)`;
        if (size) monitorSizes.push(size);
    });
    if (hasMotor) {
        const monitorsDb = devices && devices.monitors ? devices.monitors : {};
        const names = Object.keys(monitorsDb)
            .filter(n => (!monitorsDb[n].wirelessTx || monitorsDb[n].wirelessRX))
            .sort(localeSort);
        const defaultName = names.includes('TV Logic F7HS') ? 'TV Logic F7HS' : names[0];
        const opts = names
            .map(n => `<option value="${escapeHtml(n)}"${n === defaultName ? ' selected' : ''}>${escapeHtml(addArriKNumber(n))}</option>`)
            .join('');
        const selectedSize = monitorsDb[defaultName]?.screenSizeInches || '';
        monitoringItems += (monitoringItems ? '<br>' : '') +
            `1x <strong>Focus Monitor</strong> - <span id="monitorSizeFocus">${selectedSize}&quot;</span> - <select id="gearListFocusMonitor">${opts}</select> incl Directors cage, shoulder strap, sunhood, rigging for teradeks`;
        if (selectedSize) monitorSizes.push(selectedSize);
    }
    const monitoringGear = [];
    const wirelessSize = monitorSizes.includes(5) ? 5 : 7;
    if (selectedNames.video) {
        monitoringGear.push(`Wireless Transmitter - ${wirelessSize}&quot; - ${addArriKNumber(selectedNames.video)}`);
        const rxName = selectedNames.video.replace(/ TX\b/, ' RX');
        if (devices && devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
            receiverLabels.forEach(label => {
                monitoringGear.push(`Wireless Receiver - ${wirelessSize}&quot; - ${addArriKNumber(rxName)} (${label})`);
            });
        }
    }
    if (monitoringGear.length) {
        const gearHtml = formatItems(monitoringGear)
            .replace(/>(\d+x )Wireless Transmitter/g, '>$1<strong>Wireless Transmitter</strong>')
            .replace(/>(\d+x )Wireless Receiver/g, '>$1<strong>Wireless Receiver</strong>')
            .replace(/&amp;quot;/g, '&quot;');
        monitoringItems += (monitoringItems ? '<br>' : '') + gearHtml;
    }
    let monitoringBatteryItems = [];
    const bebob98 = Object.keys(devices.batteries || {}).find(n => /V98micro/i.test(n)) || 'Bebob V98micro';
    handheldPrefs.forEach(p => {
        for (let i = 0; i < 3; i++) monitoringBatteryItems.push(`${bebob98} (${p.role} handheld)`);
    });
    if (hasMotor) {
        const bebob150 = Object.keys(devices.batteries || {}).find(n => /V150micro/i.test(n)) || 'Bebob V150micro';
        for (let i = 0; i < 3; i++) monitoringBatteryItems.push(`${bebob150} (Focus)`);
    }
    const bebob290 = Object.keys(devices.batteries || {}).find(n => /V290RM-Cine/i.test(n)) || 'Bebob V290RM-Cine';
    largeMonitorPrefs.forEach(p => {
        monitoringBatteryItems.push(`${bebob290} (${p.role} 15-21")`, `${bebob290} (${p.role} 15-21")`);
    });
    addRow('Monitoring Batteries', formatItems(monitoringBatteryItems));
    addRow('Chargers', formatItems(chargersAcc));
    addRow('Monitoring', monitoringItems);
    const monitoringSupportHardware = formatItems(monitoringSupportAcc);
    const monitoringSupportItems = monitoringSupportHardware;
    addRow('Monitoring support', monitoringSupportItems);
    const cartsTransportationItems = [
        'Magliner Senior - with quick release mount + tripod holder + utility tray + O‘Connor-Aufhängung',
        ...Array(10).fill('Securing Straps (25mm wide)'),
        'Loading Ramp (pair, 420kg)',
        ...Array(20).fill('Ring Fitting for Airline Rails')
    ];
    const gripItems = [];
    let needsStandardTripod = false;
    let sliderSelectHtml = '';
    let easyrigSelectHtml = '';
    handheldPrefs.forEach(p => {
        gripItems.push(`Avenger C-Stand Sliding Leg 20" (${p.role} handheld)`);
        gripItems.push(`Steelfingers Wheel C-Stand 3er Set (${p.role} handheld)`);
        gripItems.push(`Lite-Tite Swivel Aluminium Umbrella Adapter (${p.role} handheld)`);
        riggingAcc.push(`spigot with male 3/8" and 1/4" (${p.role} handheld)`);
    });
    largeMonitorPrefs.forEach(p => {
        gripItems.push(`Matthews Monitor Stand II (249562) (${p.role} 15-21")`);
        gripItems.push(`Avenger C590 Conka Bonka Stativ-Verlängerungen Set (${p.role} 15-21")`);
        gripItems.push(`Impact Baby to Junior Receiver Adapter (${p.role} 15-21")`);
        gripItems.push(`Matthews BIG F'ING Monitor Wheel Set (3 pieces) (${p.role} 15-21")`);
        riggingAcc.push(`ULCS Bracket with 1/4 to 1/4 (${p.role} 15-21")`);
        gripItems.push(`Manfrotto 635 Quick-Action Super Clamp (${p.role} 15-21")`);
        riggingAcc.push(`spigot with male 3/8" and 1/4" (${p.role} 15-21")`);
        riggingAcc.push(`Cine Quick Release (${p.role} 15-21")`);
        riggingAcc.push(`D-Tap Splitter (${p.role} 15-21")`);
        riggingAcc.push(`D-Tap Splitter (${p.role} 15-21")`);
    });
    if (hasMotor) {
        gripItems.push('Avenger C-Stand Sliding Leg 20" (Focus)');
        gripItems.push('Steelfingers Wheel C-Stand 3er Set (Focus)');
        gripItems.push('Lite-Tite Swivel Aluminium Umbrella Adapter (Focus)');
    }
    if (scenarios.includes('Easyrig')) {
        const stabiliser = devices && devices.accessories && devices.accessories.cameraStabiliser && devices.accessories.cameraStabiliser['Easyrig 5 Vario'];
        const opts = stabiliser && Array.isArray(stabiliser.options) ? stabiliser.options : [];
        const options = ['no further stabilisation', ...opts];
        const optsHtml = options.map(o => `<option value="${escapeHtml(o)}">${escapeHtml(addArriKNumber(o))}</option>`).join('');
        easyrigSelectHtml = `1x Easyrig 5 Vario <select id="gearListEasyrig">${optsHtml}</select>`;
    }
    if (hasGimbal) {
        gripItems.push(...gimbalSelectionsFinal);
    }
    const frictionArmCount = hasGimbal ? 2 : 1;
    gripItems.push(...Array(frictionArmCount).fill('Manfrotto 244N Friktion Arm'));
    if (hasGimbal) {
        gripItems.push('Avenger D200B Grip Head');
        gripItems.push('spigot with male 3/8" and 1/4"');
    }
    if (scenarios.includes('Cine Saddle')) gripItems.push('Cinekinetic Cinesaddle');
    if (scenarios.includes('Steadybag')) gripItems.push('Steadybag');
    if (scenarios.includes('Jib')) {
        gripItems.push('Pro Sup EJIb-Arm');
        gripItems.push('jib counter weights');
        needsStandardTripod = true;
    }
    if (scenarios.includes('Slider')) {
        const options = ['', '75er bowl', '100er bowl', '150er bowl', 'Mitchell Mount'].map(o => `<option value="${escapeHtml(o)}"${o === info.sliderBowl ? ' selected' : ''}>${escapeHtml(addArriKNumber(o))}</option>`).join('');
        sliderSelectHtml = `1x Prosup Tango Roller <select id="gearListSliderBowl">${options}</select>`;
        gripItems.push('Avenger Combo Stand 10 A1010CS 64-100 cm black');
        gripItems.push('Avenger Combo Stand 10 A1010CS 64-100 cm black');
        gripItems.push('Avenger Combo Stand 20 A1020B 110-198 cm black');
        gripItems.push('Avenger Combo Stand 20 A1020B 110-198 cm black');
        gripItems.push('Apple Box Set / Bühnenkisten Set');
        gripItems.push('Apple Box Set / Bühnenkisten Set');
        gripItems.push('Paganini set');
        gripItems.push('sand bag (Slider)');
        gripItems.push('sand bag (Slider)');
        gripItems.push('cable mat');
        gripItems.push('cable mat');
        gripItems.push('cable mat');
    }
    if (scenarios.includes('Slider') && scenarios.includes('Undersling mode')) {
        gripItems.push('Tango Beam');
    }
    if (scenarios.includes('Outdoor')) {
        riggingAcc.push('spigot with male 3/8" and 1/4" (Focus Umbrella)');
    }
    if (['Extreme heat', 'Extreme rain', 'Rain Machine'].some(s => scenarios.includes(s))) {
        gripItems.push('Large Umbrella');
        gripItems.push('Avenger A5036CS Roller 36 Low Base with Umbrella Mounting');
    }
    const tripodTypes = info.tripodTypes ? info.tripodTypes.split(',').map(s => s.trim()).filter(Boolean) : [];
    const bowlType = info.tripodBowl;
    const spreader = info.tripodSpreader;
    const headBrand = info.tripodHeadBrand;
    const headMap = {
        'OConnor': {
            '100mm bowl': "O'Connor Ultimate 1040 Fluid-Head",
            '150mm bowl': "O'Connor Ultimate 2560 Fluid-Head",
            'Mitchell Mount': "O'Connor Ultimate 2560 Fluid-Head"
        },
        'Sachtler': {
            '75mm bowl': 'Sachtler aktiv8T S2068T',
            '100mm bowl': 'Sachtler aktiv18T S2088T',
            '150mm bowl': 'Sachtler Cine 30 3007'
        }
    };
    const headName = headMap[headBrand] && headMap[headBrand][bowlType];
    if (headName) {
        gripItems.push(`${headName} ${bowlType}`);
    }
    tripodTypes.forEach(t => {
        const base = bowlType ? `${bowlType} ${t}` : t;
        if (t === 'Hi-Head') {
            gripItems.push(base);
        } else if (spreader) {
            gripItems.push(`${base} + ${spreader}`);
        } else {
            gripItems.push(base);
        }
        if (t === 'Frog Tripod') {
            gripItems.push('sand bag (Frog Tripod)');
        }
        if (t === 'Hi-Head') {
            gripItems.push('sand bag (Hi-Head)');
        }
    });
    if (needsStandardTripod && !gripItems.some(item => /Standard Tripod/.test(item))) {
        gripItems.push('Standard Tripod');
    }
    const standCount = gripItems.filter(item => /\bstand\b/i.test(item) && !/wheel/i.test(item)).length;
    if (standCount) {
        gripItems.push(...Array(standCount * 3).fill('tennis ball'));
    }
    const maglinerCount = cartsTransportationItems.filter(item => /Magliner/i.test(item)).length;
    if (maglinerCount) {
        gripItems.push(...Array(maglinerCount * 2).fill('Wooden wedge'));
    }
    const riggingItems = formatItems(riggingAcc);
    addRow('Rigging', riggingItems);
    const powerItems = [
        'Power Cable Drum 25-50 m',
        ...Array(2).fill('Power Cable 10 m'),
        ...Array(2).fill('Power Cable 5 m'),
        ...Array(3).fill('Power Strip'),
        ...Array(3).fill('PRCD-S (Portable Residual Current Device-Safety)'),
        ...Array(3).fill('Power Three Way Splitter')
    ];
    if (scenarios.includes('Studio')) {
        powerItems.push('Camera Power Supply');
    }
    addRow('Power', formatItems(powerItems));
    addRow('Grip', [sliderSelectHtml, formatItems(gripItems), easyrigSelectHtml].filter(Boolean).join('<br>'));
    addRow('Carts and Transportation', formatItems(cartsTransportationItems));
    const miscExcluded = new Set([
        'D-Tap to LEMO 2-pin',
        'HDMI Cable',
        'BNC SDI Cable',
        'Ultraslim BNC Cable 0.5 m'
    ]);
    const miscItems = [...miscAcc].filter(item => !miscExcluded.has(item));
    const consumables = [];
    const hasViewfinder = Array.isArray(cam?.viewfinder) && cam.viewfinder.length > 0;
    let eyeLeatherColor = 'red';
    const gaffTapeSelections = [
        { id: 1, color: 'red', width: '24mm' },
        { id: 2, color: 'blue', width: '24mm' }
    ];
    if (gearListOutput) {
        const sel = gearListOutput.querySelector('#gearListEyeLeatherColor');
        if (sel && sel.value) eyeLeatherColor = sel.value;
        gaffTapeSelections.forEach(({ id }, idx) => {
            const cSel = gearListOutput.querySelector(`#gearListProGaffColor${id}`);
            const wSel = gearListOutput.querySelector(`#gearListProGaffWidth${id}`);
            if (cSel && cSel.value) gaffTapeSelections[idx].color = cSel.value;
            if (wSel && wSel.value) gaffTapeSelections[idx].width = wSel.value;
        });
    }
    const baseConsumables = [
        { name: 'Kimtech Wipes', count: 1 },
        { name: 'Sprigs Red 1/4"', count: 1, noScale: true },
        { name: 'Clapper Stick', count: 2, klappen: true }
    ];
    let eyeLeatherCount = hasViewfinder ? 2 : 0;
    let shootDays = 0;
    let isWinterShoot = false;
    if (info.shootingDays) {
        const parts = info.shootingDays.split(' to ');
        if (parts.length === 2) {
            const start = new Date(parts[0]);
            const end = new Date(parts[1]);
            if (!isNaN(start) && !isNaN(end)) {
                shootDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
                const winterMonths = new Set([9, 10, 11, 0, 1, 2, 3, 4]);
                const m = new Date(start);
                m.setHours(0, 0, 0, 0);
                while (m <= end) {
                    if (winterMonths.has(m.getMonth())) {
                        isWinterShoot = true;
                        break;
                    }
                    m.setMonth(m.getMonth() + 1);
                }
            }
        }
    }
    let multiplier = 1;
    if (shootDays > 21) {
        multiplier = 4;
    } else if (shootDays > 14) {
        multiplier = 3;
    } else if (shootDays > 7) {
        multiplier = 2;
    }
    const klappenMultiplier = multiplier % 2 === 0 ? multiplier : Math.max(1, multiplier - 1);
    for (const item of baseConsumables) {
        let count = item.count;
        if (item.noScale) {
            // no scaling
        } else if (item.klappen) {
            count *= klappenMultiplier;
        } else {
            count *= multiplier;
        }
        for (let i = 0; i < count; i++) consumables.push(item.name);
    }
    if (eyeLeatherCount) eyeLeatherCount *= multiplier;
    const needsRainProtection = ['Outdoor', 'Extreme rain', 'Rain Machine'].some(s => scenarios.includes(s));
    if (needsRainProtection && selectedNames.camera) {
        miscItems.push(`Rain Cover ${addArriKNumber(selectedNames.camera)}`);
    }
    const needsUmbrellas = needsRainProtection || scenarios.includes('Extreme heat');
    if (needsUmbrellas) {
        if (!miscItems.includes('Umbrella for Focus Monitor')) miscItems.push('Umbrella for Focus Monitor');
        if (!miscItems.includes('Umbrella Magliner incl Mounting to Magliner')) miscItems.push('Umbrella Magliner incl Mounting to Magliner');
    }
    if (needsRainProtection) {
        const monitorSizes = [];
        if (monitorSelect && monitorSelect.value) {
            const m = devices.monitors[monitorSelect.value];
            if (m && m.screenSizeInches) monitorSizes.push(m.screenSizeInches);
        }
        const monitorsAbove10 = monitorSizes.filter(s => s > 10).length;
        const monitorsUnder10 = monitorSizes.filter(s => s <= 10).length;
        for (let i = 0; i < monitorsAbove10 + 2; i++) consumables.push('CapIt Large');
        for (let i = 0; i < monitorsUnder10 + 3; i++) consumables.push('CapIt Medium');
        for (let i = 0; i < 3; i++) consumables.push('CapIt Small');
        for (let i = 0; i < 10; i++) consumables.push('Duschhaube');
        consumables.push('Magliner Rain Cover Transparent');
    }
    const needsHairDryer =
        (isWinterShoot && scenarios.includes('Outdoor')) ||
        scenarios.includes('Extreme cold (snow)');
    const needsHandAndFeetWarmers = scenarios.includes('Extreme cold (snow)');
    if (needsHairDryer) {
        miscItems.push('Hair Dryer');
        if (["Sony Venice 2", "Sony Venice"].includes(selectedNames.camera)) {
            miscItems.push('Denz C0100072 Shut-Eye Heater für Sony');
        } else if (["Arri Alexa Mini", "Arri Amira"].includes(selectedNames.camera)) {
            miscItems.push('Arri K2.0003898 Heated Eyecup HE-7 for the MVF-1');
        }
    }
    if (needsHandAndFeetWarmers) {
        const warmersCount = Math.max(shootDays, 1) * 2;
        for (let i = 0; i < warmersCount; i++) miscItems.push('Hand Warmers');
        for (let i = 0; i < warmersCount; i++) miscItems.push('Feet Warmers');
    }
    const gaffColors = [
        ['red', 'Red'],
        ['blue', 'Blue'],
        ['green', 'Green'],
        ['yellow', 'Yellow'],
        ['black', 'Black'],
        ['pink', 'Pink'],
        ['orange', 'Orange'],
        ['violette', 'Violette'],
        ['white', 'White']
    ];
    const gaffWidths = ['6mm', '12mm', '19mm', '24mm', '48mm'];
    const proGaffCount = multiplier;
    const proGaffHtml = gaffTapeSelections.map(({ id, color, width }) => {
        const colorOpts = gaffColors
            .map(([val, label]) => `<option value="${val}"${val === color ? ' selected' : ''}>${label}</option>`)
            .join('');
        const widthOpts = gaffWidths
            .map(val => `<option value="${val}"${val === width ? ' selected' : ''}>${val}</option>`)
            .join('');
        return `<span class="gear-item" data-gear-name="Pro Gaff Tape">${proGaffCount}x Pro Gaff Tape <select id="gearListProGaffColor${id}">${colorOpts}</select> <select id="gearListProGaffWidth${id}">${widthOpts}</select></span>`;
    }).join('<br>');
    let eyeLeatherHtml = '';
    if (eyeLeatherCount) {
        const colors = [
            ['red', 'Red'],
            ['blue', 'Blue'],
            ['natural', 'Natural'],
            ['green', 'Green'],
            ['purple', 'Purple'],
            ['orange', 'Orange'],
            ['gray', 'Gray'],
            ['yellow', 'Yellow'],
            ['jaguar', 'Jaguar'],
            ['killer bee', 'Killer Bee'],
            ['green rabbit', 'Green Rabbit'],
            ['black', 'Black']
        ];
        const options = colors.map(([val, label]) => `<option value="${val}"${val === eyeLeatherColor ? ' selected' : ''}>${label}</option>`).join('');
        eyeLeatherHtml = `<span class="gear-item" data-gear-name="Bluestar eye leather made of microfiber oval, large">${eyeLeatherCount}x Bluestar eye leather made of microfiber oval, large <select id="gearListEyeLeatherColor">${options}</select></span>`;
    }
    addRow('Miscellaneous', formatItems(miscItems));
    addRow('Consumables', [eyeLeatherHtml, proGaffHtml, formatItems(consumables)].filter(Boolean).join('<br>'));
    let body = `<h2>${projectTitle}</h2>`;
    if (infoHtml) body += infoHtml;
    body += '<h3>Gear List</h3><table class="gear-table">' + rows.join('') + '</table>';
    return body;
}


function getCurrentGearListHtml() {
    if (!gearListOutput && !projectRequirementsOutput) return '';

    const titleElem = (projectRequirementsOutput && projectRequirementsOutput.querySelector('h2'))
        || (gearListOutput && gearListOutput.querySelector('h2'));
    const titleHtml = titleElem ? titleElem.outerHTML : '';

    let projHtml = '';
    if (projectRequirementsOutput) {
        const projClone = projectRequirementsOutput.cloneNode(true);
        const editBtn = projClone.querySelector('#editProjectBtn');
        if (editBtn) editBtn.remove();
        const t = projClone.querySelector('h2');
        if (t) t.remove();
        projHtml = projClone.innerHTML.trim();
    }

    let gearHtml = '';
    if (gearListOutput) {
        const clone = gearListOutput.cloneNode(true);
        const actions = clone.querySelector('#gearListActions');
        if (actions) actions.remove();
        const editBtn = clone.querySelector('#editProjectBtn');
        if (editBtn) editBtn.remove();
        const t = clone.querySelector('h2');
        if (t) t.remove();
        ['Director', 'Dop', 'Gaffer', 'Focus'].forEach(role => {
            const sel = clone.querySelector(`#gearList${role}Monitor`);
            if (sel) {
                const originalSel = gearListOutput.querySelector(`#gearList${role}Monitor`);
                const val = originalSel ? originalSel.value : sel.value;
                Array.from(sel.options).forEach(opt => {
                    if (opt.value === val) {
                        opt.setAttribute('selected', '');
                    } else {
                        opt.removeAttribute('selected');
                    }
                });
            }
        });
        const cageSel = clone.querySelector('#gearListCage');
        if (cageSel) {
            const originalSel = gearListOutput.querySelector('#gearListCage');
            const val = originalSel ? originalSel.value : cageSel.value;
            Array.from(cageSel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        }
        const easyrigSel = clone.querySelector('#gearListEasyrig');
        if (easyrigSel) {
            const originalSel = gearListOutput.querySelector('#gearListEasyrig');
            const val = originalSel ? originalSel.value : easyrigSel.value;
            Array.from(easyrigSel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        }
        const sliderSel = clone.querySelector('#gearListSliderBowl');
        if (sliderSel) {
            const originalSel = gearListOutput.querySelector('#gearListSliderBowl');
            const val = originalSel ? originalSel.value : sliderSel.value;
            Array.from(sliderSel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        }
        const eyeSel = clone.querySelector('#gearListEyeLeatherColor');
        if (eyeSel) {
            const originalSel = gearListOutput.querySelector('#gearListEyeLeatherColor');
            const val = originalSel ? originalSel.value : eyeSel.value;
            Array.from(eyeSel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        }
        [1, 2].forEach(i => {
            const colorSel = clone.querySelector(`#gearListProGaffColor${i}`);
            if (colorSel) {
                const originalSel = gearListOutput.querySelector(`#gearListProGaffColor${i}`);
                const val = originalSel ? originalSel.value : colorSel.value;
                Array.from(colorSel.options).forEach(opt => {
                    if (opt.value === val) {
                        opt.setAttribute('selected', '');
                    } else {
                        opt.removeAttribute('selected');
                    }
                });
            }
            const widthSel = clone.querySelector(`#gearListProGaffWidth${i}`);
            if (widthSel) {
                const originalSel = gearListOutput.querySelector(`#gearListProGaffWidth${i}`);
                const val = originalSel ? originalSel.value : widthSel.value;
                Array.from(widthSel.options).forEach(opt => {
                    if (opt.value === val) {
                        opt.setAttribute('selected', '');
                    } else {
                        opt.removeAttribute('selected');
                    }
                });
            }
        });
        gearHtml = clone.innerHTML.trim();
    }

    return `${titleHtml}${projHtml}${gearHtml}`.trim();
}

function saveCurrentGearList() {
    const html = getCurrentGearListHtml();
    const info = projectForm ? collectProjectFormData() : {};
    currentProjectInfo = Object.values(info).some(v => v) ? info : null;

    if (typeof saveProject === 'function') {
        saveProject({ projectInfo: currentProjectInfo, gearList: html });
    }

    const setupName = (setupSelect && setupSelect.value) ||
        (setupNameInput && setupNameInput.value.trim());
    if (setupName) {
        const setups = getSetups();
        const existing = setups[setupName];
        if (html || existing) {
            const setup = existing || {};
            if (html) setup.gearList = html;
            setup.projectInfo = currentProjectInfo;
            setups[setupName] = setup;
            storeSetups(setups);
        }
    }
}

function exportCurrentGearList() {
    const html = getCurrentGearListHtml();
    if (!html) return;
    const info = projectForm ? collectProjectFormData() : {};
    const proj = Object.values(info).some(v => v) ? info : null;
    const blob = new Blob([JSON.stringify({ projectInfo: proj, gearList: html })], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'gear-list.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}

function handleImportGearList(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        try {
            const obj = JSON.parse(ev.target.result);
            if (obj && obj.gearList) {
            displayGearAndRequirements(obj.gearList);
            currentProjectInfo = obj.projectInfo || null;
            if (currentProjectInfo) populateProjectForm(currentProjectInfo);
            ensureGearListActions();
            bindGearListCageListener();
            bindGearListEasyrigListener();
            bindGearListSliderBowlListener();
            bindGearListEyeLeatherListener();
            bindGearListProGaffTapeListener();
            bindGearListDirectorMonitorListener();
            saveCurrentGearList();
            }
        } catch {
            alert('Invalid gear list file.');
        }
        e.target.value = '';
    };
    reader.readAsText(file);
}

function deleteCurrentGearList() {
    if (!confirm(texts[currentLang].confirmDeleteGearList)) return;
    if (gearListOutput) {
        gearListOutput.innerHTML = '';
        gearListOutput.classList.add('hidden');
    }
    if (projectRequirementsOutput) {
        projectRequirementsOutput.innerHTML = '';
        projectRequirementsOutput.classList.add('hidden');
    }
    if (typeof deleteProject === 'function') {
        deleteProject();
    }
    const setupName = setupSelect && setupSelect.value;
    if (setupName) {
        const setups = getSetups();
        if (setups[setupName]) {
            delete setups[setupName].gearList;
            delete setups[setupName].projectInfo;
            storeSetups(setups);
        }
    }
    updateGearListButtonVisibility();
}

function ensureGearListActions() {
    if (!gearListOutput) return;
    let actions = document.getElementById('gearListActions');
    if (!actions) {
        actions = document.createElement('div');
        actions.id = 'gearListActions';
        const saveBtn = document.createElement('button');
        saveBtn.id = 'saveGearListBtn';
        const exportBtn = document.createElement('button');
        exportBtn.id = 'exportGearListBtn';
        const importBtn = document.createElement('button');
        importBtn.id = 'importGearListBtn';
        const importInput = document.createElement('input');
        importInput.type = 'file';
        importInput.accept = '.json';
        importInput.id = 'importGearListInput';
        importInput.className = 'hidden';
        importInput.name = 'importGearList';
        const deleteBtn = document.createElement('button');
        deleteBtn.id = 'deleteGearListBtn';
        actions.append(saveBtn, exportBtn, importBtn, importInput, deleteBtn);
        gearListOutput.appendChild(actions);
        saveBtn.addEventListener('click', saveCurrentGearList);
        exportBtn.addEventListener('click', exportCurrentGearList);
        importBtn.addEventListener('click', () => importInput.click());
        importInput.addEventListener('change', handleImportGearList);
        deleteBtn.addEventListener('click', deleteCurrentGearList);
    }
    // Update texts for current language
    const saveBtn = document.getElementById('saveGearListBtn');
    const exportBtn = document.getElementById('exportGearListBtn');
    const importBtn = document.getElementById('importGearListBtn');
    const deleteBtn = document.getElementById('deleteGearListBtn');
    const saveHelp = texts[currentLang].saveGearListBtnHelp || texts[currentLang].saveGearListBtn;
    const exportHelp = texts[currentLang].exportGearListBtnHelp || texts[currentLang].exportGearListBtn;
    const importHelp = texts[currentLang].importGearListBtnHelp || texts[currentLang].importGearListBtn;
    const deleteHelp = texts[currentLang].deleteGearListBtnHelp || texts[currentLang].deleteGearListBtn;
    saveBtn.textContent = texts[currentLang].saveGearListBtn;
    saveBtn.setAttribute('title', saveHelp);
    saveBtn.setAttribute('data-help', saveHelp);
    exportBtn.textContent = texts[currentLang].exportGearListBtn;
    exportBtn.setAttribute('title', exportHelp);
    exportBtn.setAttribute('data-help', exportHelp);
    importBtn.textContent = texts[currentLang].importGearListBtn;
    importBtn.setAttribute('title', importHelp);
    importBtn.setAttribute('data-help', importHelp);
    deleteBtn.textContent = texts[currentLang].deleteGearListBtn;
    deleteBtn.setAttribute('title', deleteHelp);
    deleteBtn.setAttribute('data-help', deleteHelp);
}

function bindGearListCageListener() {
    if (!gearListOutput) return;
    const sel = gearListOutput.querySelector('#gearListCage');
    if (sel) {
        sel.addEventListener('change', e => {
            if (cageSelect) {
                cageSelect.value = e.target.value;
                cageSelect.dispatchEvent(new Event('change'));
            }
            saveCurrentGearList();
        });
    }
}

function bindGearListEasyrigListener() {
    if (!gearListOutput) return;
    const sel = gearListOutput.querySelector('#gearListEasyrig');
    if (sel) {
        sel.addEventListener('change', () => {
            saveCurrentGearList();
            saveCurrentSession();
            checkSetupChanged();
        });
    }
}

function bindGearListSliderBowlListener() {
    if (!gearListOutput) return;
    const sel = gearListOutput.querySelector('#gearListSliderBowl');
    if (sel) {
        sel.addEventListener('change', () => {
            saveCurrentGearList();
            saveCurrentSession();
            checkSetupChanged();
        });
    }
}

function bindGearListEyeLeatherListener() {
    if (!gearListOutput) return;
    const sel = gearListOutput.querySelector('#gearListEyeLeatherColor');
    if (sel) {
        sel.addEventListener('change', () => {
            saveCurrentGearList();
        });
    }
}

function bindGearListProGaffTapeListener() {
    if (!gearListOutput) return;
    [1, 2].forEach(i => {
        const colorSel = gearListOutput.querySelector(`#gearListProGaffColor${i}`);
        const widthSel = gearListOutput.querySelector(`#gearListProGaffWidth${i}`);
        [colorSel, widthSel].forEach(sel => {
            if (sel) {
                sel.addEventListener('change', () => {
                    saveCurrentGearList();
                });
            }
        });
    });
}

function bindGearListDirectorMonitorListener() {
    if (!gearListOutput) return;
    ['Director', 'Dop', 'Gaffer', 'Focus'].forEach(role => {
        const sel = gearListOutput.querySelector(`#gearList${role}Monitor`);
        if (sel) {
            sel.addEventListener('change', () => {
                const monitorInfo = devices && devices.monitors && devices.monitors[sel.value];
                const span = gearListOutput.querySelector(`#monitorSize${role}`);
                if (span && monitorInfo && monitorInfo.screenSizeInches) {
                    span.textContent = `${monitorInfo.screenSizeInches}"`;
                }
                saveCurrentGearList();
            });
        }
    });
}


function refreshGearListIfVisible() {
    if (!gearListOutput || gearListOutput.classList.contains('hidden')) return;

    if (projectForm) {
        populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
        populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
        populateCodecDropdown(currentProjectInfo && currentProjectInfo.codec);
        const info = collectProjectFormData();
        currentProjectInfo = Object.values(info).some(v => v) ? info : null;
    }

    const html = generateGearListHtml(currentProjectInfo || {});
    if (currentProjectInfo) {
        displayGearAndRequirements(html);
    } else {
        const { gearHtml } = splitGearListHtml(html);
        gearListOutput.innerHTML = gearHtml;
    }
    ensureGearListActions();
    bindGearListCageListener();
    bindGearListEasyrigListener();
    bindGearListSliderBowlListener();
    bindGearListEyeLeatherListener();
    bindGearListProGaffTapeListener();
    bindGearListDirectorMonitorListener();
    saveCurrentGearList();
}

// --- SESSION STATE HANDLING ---
function saveCurrentSession() {
  if (restoringSession) return;
  const info = projectForm ? collectProjectFormData() : {};
  currentProjectInfo = Object.values(info).some(v => v) ? info : null;
  const state = {
    setupName: setupNameInput ? setupNameInput.value : '',
    setupSelect: setupSelect ? setupSelect.value : '',
    camera: cameraSelect ? cameraSelect.value : '',
    monitor: monitorSelect ? monitorSelect.value : '',
    video: videoSelect ? videoSelect.value : '',
    cage: cageSelect ? cageSelect.value : '',
    motors: motorSelects.map(sel => sel ? sel.value : ''),
    controllers: controllerSelects.map(sel => sel ? sel.value : ''),
    distance: distanceSelect ? distanceSelect.value : '',
    batteryPlate: batteryPlateSelect ? batteryPlateSelect.value : '',
    battery: batterySelect ? batterySelect.value : '',
    batteryHotswap: hotswapSelect ? hotswapSelect.value : '',
    sliderBowl: getSliderBowlValue(),
    easyrig: getEasyrigValue(),
    projectInfo: currentProjectInfo
  };
  storeSession(state);
  // Persist the current gear list and project requirements alongside the
  // session so they survive reloads without requiring a manual save action.
  saveCurrentGearList();
}

function autoSaveCurrentSetup() {
  if (!setupNameInput) return;
  const name = setupNameInput.value.trim();
  if (!name) return;
  const currentSetup = { ...getCurrentSetupState(), gearList: getCurrentGearListHtml() };
  const setups = getSetups();
  setups[name] = currentSetup;
  storeSetups(setups);
  populateSetupSelect();
  if (setupSelect) setupSelect.value = name;
  saveCurrentSession();
  loadedSetupState = getCurrentSetupState();
  checkSetupChanged();
}

function setSelectValue(select, value) {
  if (select && value) select.value = value;
}

function restoreSessionState() {
  restoringSession = true;
  const state = loadSession();
  if (state) {
    if (setupNameInput) {
      setupNameInput.value = state.setupName || '';
      setupNameInput.dispatchEvent(new Event('input'));
    }
    setSelectValue(cameraSelect, state.camera);
    updateBatteryPlateVisibility();
    setSelectValue(batteryPlateSelect, state.batteryPlate);
    updateBatteryOptions();
    setSelectValue(monitorSelect, state.monitor);
    setSelectValue(videoSelect, state.video);
    setSelectValue(cageSelect, state.cage);
    setSelectValue(distanceSelect, state.distance);
    if (Array.isArray(state.motors)) {
      state.motors.forEach((val, i) => { if (motorSelects[i]) motorSelects[i].value = val; });
    }
    if (Array.isArray(state.controllers)) {
      state.controllers.forEach((val, i) => { if (controllerSelects[i]) controllerSelects[i].value = val; });
    }
    setSelectValue(batterySelect, state.battery);
    setSelectValue(hotswapSelect, state.batteryHotswap);
    setSelectValue(setupSelect, state.setupSelect);
    if (state.projectInfo) {
      currentProjectInfo = state.projectInfo;
      if (projectForm) populateProjectForm(currentProjectInfo);
    }
  } else {
    if (gearListOutput) {
      gearListOutput.innerHTML = '';
      gearListOutput.classList.add('hidden');
    }
    if (projectRequirementsOutput) {
      projectRequirementsOutput.innerHTML = '';
      projectRequirementsOutput.classList.add('hidden');
    }
  }
  if (gearListOutput || projectRequirementsOutput) {
    const storedProject = typeof loadProject === 'function' ? loadProject() : null;
    if (storedProject && (storedProject.gearList || storedProject.projectInfo)) {
      if (storedProject.projectInfo) {
        currentProjectInfo = storedProject.projectInfo;
        if (projectForm) populateProjectForm(currentProjectInfo);
      }
      displayGearAndRequirements(storedProject.gearList);
      if (gearListOutput) {
        ensureGearListActions();
        bindGearListCageListener();
        bindGearListEasyrigListener();
        bindGearListSliderBowlListener();
        bindGearListEyeLeatherListener();
        bindGearListProGaffTapeListener();
        bindGearListDirectorMonitorListener();
        setSliderBowlValue(state && state.sliderBowl);
        setEasyrigValue(state && state.easyrig);
      }
    } else if (!state && typeof deleteProject === 'function') {
      deleteProject();
    }
  }
  restoringSession = false;
  saveCurrentSession();
}

function applySharedSetup(shared) {
  try {
    const decoded = JSON.parse(LZString.decompressFromEncodedURIComponent(shared));
    if (decoded.changedDevices) {
      applyDeviceChanges(decoded.changedDevices);
    }
    if (setupNameInput && decoded.setupName) {
      setupNameInput.value = decoded.setupName;
      setupNameInput.dispatchEvent(new Event('input'));
    }
    setSelectValue(cameraSelect, decoded.camera);
    updateBatteryPlateVisibility();
    setSelectValue(batteryPlateSelect, decoded.batteryPlate);
    updateBatteryOptions();
    setSelectValue(monitorSelect, decoded.monitor);
    setSelectValue(videoSelect, decoded.video);
    setSelectValue(cageSelect, decoded.cage);
    setSelectValue(distanceSelect, decoded.distance);
    if (Array.isArray(decoded.motors)) {
      decoded.motors.forEach((val, i) => { if (motorSelects[i]) motorSelects[i].value = val; });
    }
    if (Array.isArray(decoded.controllers)) {
      decoded.controllers.forEach((val, i) => { if (controllerSelects[i]) controllerSelects[i].value = val; });
    }
    setSelectValue(batterySelect, decoded.battery);
    setSelectValue(hotswapSelect, decoded.batteryHotswap);
    saveCurrentSession();
    if (Array.isArray(decoded.feedback) && decoded.feedback.length) {
      const key = getCurrentSetupKey();
      const fb = loadFeedbackSafe();
      fb[key] = (fb[key] || []).concat(decoded.feedback);
      saveFeedbackSafe(fb);
    }
    if (decoded.projectInfo) {
      currentProjectInfo = decoded.projectInfo;
      if (projectForm) populateProjectForm(currentProjectInfo);
    }
    if (decoded.gearList) {
      displayGearAndRequirements(decoded.gearList);
      ensureGearListActions();
      bindGearListCageListener();
      bindGearListEasyrigListener();
      bindGearListSliderBowlListener();
      bindGearListProGaffTapeListener();
      bindGearListDirectorMonitorListener();
    }
    if (decoded.gearList || decoded.projectInfo) {
      saveProject({ gearList: decoded.gearList || '', projectInfo: decoded.projectInfo || null });
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
[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", updateCalculations); });
if (cameraSelect) {
  cameraSelect.addEventListener('change', () => {
    updateBatteryPlateVisibility();
    updateBatteryOptions();
    populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
    populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
  });
}
if (monitoringConfigurationSelect) {
  monitoringConfigurationSelect.addEventListener('change', updateViewfinderSettingsVisibility);
}
if (monitorSelect) {
  monitorSelect.addEventListener('change', updateMonitoringConfigurationOptions);
}
if (batteryPlateSelect) batteryPlateSelect.addEventListener('change', updateBatteryOptions);
if (batterySelect) batterySelect.addEventListener('change', updateBatteryOptions);
if (hotswapSelect) hotswapSelect.addEventListener('change', updateCalculations);

motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", updateCalculations); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", updateCalculations); });

[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect, setupSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentSession); });
motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentSession); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentSession); });
if (setupNameInput) setupNameInput.addEventListener("input", saveCurrentSession);

[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentGearList); });
motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentGearList); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentGearList); });

[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", checkSetupChanged); });
motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", checkSetupChanged); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", checkSetupChanged); });
if (setupNameInput) setupNameInput.addEventListener("input", checkSetupChanged);

[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", autoSaveCurrentSetup); });
motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", autoSaveCurrentSetup); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", autoSaveCurrentSetup); });
if (setupNameInput) setupNameInput.addEventListener("change", autoSaveCurrentSetup);

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

if (reloadButton) {
  reloadButton.addEventListener("click", async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.serviceWorker && navigator.serviceWorker.getRegistrations) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(reg => reg.unregister()));
      }
      if (typeof caches !== "undefined") {
        const keys = await caches.keys();
        await Promise.all(keys.map(key => caches.delete(key)));
      }
    } catch (e) {
      console.warn("Cache clear failed", e);
    } finally {
      window.location.reload(true);
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
    gridSnapToggleBtn.setAttribute('aria-pressed', gridSnap ? 'true' : 'false');
    if (setupDiagramContainer) {
      setupDiagramContainer.classList.toggle('grid-snap', gridSnap);
    }
  });
}

if (helpButton && helpDialog) {
  // --- Help dialog and hover help -----------------------------------------
  // Provides a modal help dialog with live filtering and a "hover for help"
  // mode that exposes descriptions for interface controls. The following
  // functions manage searching, opening/closing the dialog and tooltip-based
  // hover help.
  // Search and filtering for the help dialog. Every keystroke scans both
  // high-level sections and individual FAQ items, restoring their original
  // markup, highlighting matches and hiding entries that do not include the
  // query. A message is shown if nothing matches and the clear button is
  // toggled based on the presence of a query.
  const filterHelp = () => {
    // Bail out early if the search input is missing
    if (!helpSearch) return;
    const query = helpSearch.value.trim().toLowerCase();
    // Treat sections and FAQ items uniformly so the same logic can filter both
    const sections = Array.from(
      helpDialog.querySelectorAll('[data-help-section]')
    );
    const items = Array.from(helpDialog.querySelectorAll('.faq-item'));
    const elements = sections.concat(items);
    let anyVisible = false;
    // Prepare a regex to wrap matches in <mark>; escape to avoid breaking on
    // special characters in the query.
    const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = query ? new RegExp(`(${escapeRegExp(query)})`, 'ig') : null;
    elements.forEach(el => {
      // Save original HTML once so that repeated filtering doesn't permanently
      // insert <mark> tags; restore it before applying a new highlight.
      if (!el.dataset.origHtml) {
        el.dataset.origHtml = el.innerHTML;
      } else {
        el.innerHTML = el.dataset.origHtml;
      }
      const text = el.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        if (query && regex) {
          // Highlight the matching text while preserving the rest of the content
          el.innerHTML = el.innerHTML.replace(regex, '<mark>$1</mark>');
        }
        el.removeAttribute('hidden');
        anyVisible = true;
      } else {
        // Hide entries that do not match
        el.setAttribute('hidden', '');
      }
    });
    if (helpNoResults) {
      // Show or hide the "no results" indicator
      if (anyVisible) {
        helpNoResults.setAttribute('hidden', '');
      } else {
        helpNoResults.removeAttribute('hidden');
      }
    }
    if (helpSearchClear) {
      // Only show the clear button when there is text in the search box
      if (query) {
        helpSearchClear.removeAttribute('hidden');
      } else {
        helpSearchClear.setAttribute('hidden', '');
      }
    }
  };

  // Display the help dialog. The search box is reset so stale filter state
  // doesn't persist between openings, and focus is moved to the search field
  // for immediate typing.
  const openHelp = () => {
    helpDialog.removeAttribute('hidden');
    if (helpSearch) {
      helpSearch.value = '';
      filterHelp(); // ensure all sections are visible again
      helpSearch.focus();
    } else {
      helpDialog.focus();
    }
  };

  // Hide the dialog and return focus to the button that opened it
  const closeHelp = () => {
    helpDialog.setAttribute('hidden', '');
    helpButton.focus();
  };

  // Convenience helper for toggling the dialog open or closed
  const toggleHelp = () => {
    if (helpDialog.hasAttribute('hidden')) {
      openHelp();
    } else {
      closeHelp();
    }
  };

  // Hover help mode displays a tooltip describing whichever element the user
  // points at. It is triggered from a button inside the dialog and uses the
  // same data-help/aria-* attributes that power the dialog content.
  let hoverHelpActive = false;
  let hoverHelpTooltip;

  // Exit hover-help mode and clean up tooltip/cursor state
  const stopHoverHelp = () => {
    hoverHelpActive = false;
    if (hoverHelpTooltip) {
      hoverHelpTooltip.remove();
      hoverHelpTooltip = null;
    }
    document.body.style.cursor = '';
    document.body.classList.remove('hover-help-active');
  };

  // Start hover-help mode: close the dialog, create the tooltip element and
  // switch the cursor to the standard help cursor.
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
    // When hover-help is active, locate the nearest element with descriptive
    // attributes and show its text content in a custom tooltip.
    if (!hoverHelpActive || !hoverHelpTooltip) return;
    const el = e.target.closest(
      '[data-help], [aria-label], [title], [aria-labelledby], [alt]'
    );
    // Ignore non-descriptive elements such as generic sections
    if (!el || el.tagName === 'SECTION') {
      hoverHelpTooltip.setAttribute('hidden', '');
      return;
    }
    let text =
      el.getAttribute('data-help') ||
      el.getAttribute('aria-label') ||
      el.getAttribute('title');
    if (!text) {
      // Fallback to a linked label if aria-labelledby is used
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
    // Show the full help text instead of truncating at 200 characters
    hoverHelpTooltip.textContent = text;
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
    // Any click while in hover-help mode exits the mode and removes the tooltip
    if (hoverHelpActive) {
      e.preventDefault();
      stopHoverHelp();
    }
  });

  if (hoverHelpButton) {
    // Dedicated button inside the dialog to enable hover-help mode
    hoverHelpButton.addEventListener('click', e => {
      e.stopPropagation();
      startHoverHelp(); // activate tooltip mode
    });
  }

  // Wire up button clicks and search field interactions
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
    // Keyboard shortcuts controlling the help dialog and hover-help mode
    if (hoverHelpActive && e.key === 'Escape') {
      // Escape exits hover-help mode
      stopHoverHelp();
    } else if (e.key === 'Escape' && !helpDialog.hasAttribute('hidden')) {
      // Escape closes the help dialog
      closeHelp();
    } else if (
      e.key === 'F1' ||
      ((e.key === '/' || e.key === '?') && (e.ctrlKey || e.metaKey))
    ) {
      // F1 or Ctrl+/ toggles the dialog even while typing
      e.preventDefault();
      toggleHelp();
    } else if (
      (e.key === '?' && !isTextField) ||
      (e.key.toLowerCase() === 'h' && !isTextField)
    ) {
      // Plain ? or H opens the dialog when not typing in a field
      e.preventDefault();
      toggleHelp();
    } else if (
      !helpDialog.hasAttribute('hidden') &&
      ((e.key === '/' && !isTextField) || (e.key.toLowerCase() === 'f' && (e.ctrlKey || e.metaKey)))
    ) {
      // When the dialog is open, / or Ctrl+F moves focus to the search box
      e.preventDefault();
      if (helpSearch) helpSearch.focus();
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
    // Clicking the semi-transparent backdrop (not the dialog content) closes it
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

const scenarioIcons = {
  Indoor: '🏠',
  Outdoor: '🌳',
  Studio: '🎬',
  Tripod: '🎥',
  Handheld: '✋',
  Easyrig: '🎒',
  'Cine Saddle': '💺',
  Steadybag: '👜',
  Dolly: '🛞',
  Slider: '📏',
  Steadicam: '🏃',
  Gimbal: '🌀',
  Trinity: '♾️',
  Rollcage: '🛡️',
  'Car Mount': '🚗',
  Jib: '🪝',
  'Undersling mode': '⬇️',
  Crane: '🏗️',
  'Remote Head': '🎮',
  'Extreme cold (snow)': '❄️',
  'Extreme rain': '🌧️',
  'Extreme heat': '🔥',
  'Rain Machine': '🚿',
  'Slow Motion': '🐌',
  'Battery Belt': '🔋'
};

function updateSelectIconBoxes(sel) {
  if (!sel) return;
  let container = sel.parentNode.querySelector('.icon-box-summary');
  if (!container) {
    container = document.createElement('div');
    container.className = 'icon-box-summary';
    sel.parentNode.insertBefore(container, sel.nextSibling);
  }
  container.innerHTML = '';
  const opts = sel.multiple
    ? Array.from(sel.selectedOptions)
    : (sel.value ? [sel.options[sel.selectedIndex]] : []);
  opts.forEach(opt => {
    const box = document.createElement('span');
    box.className = 'icon-box';
    const iconSpan = document.createElement('span');
    iconSpan.className = 'icon';
    iconSpan.textContent = opt.dataset.icon || projectFieldIcons[sel.name] || '📌';
    box.appendChild(iconSpan);
    box.appendChild(document.createTextNode(opt.value));
    container.appendChild(box);
  });
}

function updateRequiredScenariosSummary() {
  if (!requiredScenariosSelect || !requiredScenariosSummary) return;
  requiredScenariosSummary.innerHTML = '';
  let selected = Array.from(requiredScenariosSelect.selectedOptions).map(o => o.value);
  const hasDolly = selected.includes('Dolly');
  if (remoteHeadOption) {
    if (!hasDolly) {
      remoteHeadOption.hidden = true;
      remoteHeadOption.selected = false;
      selected = selected.filter(v => v !== 'Remote Head');
    } else {
      remoteHeadOption.hidden = false;
    }
  }
  if (
    hasDolly &&
    monitorSelect &&
    (!monitorSelect.value || monitorSelect.value === 'None')
  ) {
    const defaultMonitor = 'SmallHD Ultra 7';
    if (devices?.monitors?.[defaultMonitor]) {
      if (!Array.from(monitorSelect.options).some(o => o.value === defaultMonitor)) {
        const opt = document.createElement('option');
        opt.value = defaultMonitor;
        opt.textContent = defaultMonitor;
        monitorSelect.appendChild(opt);
      }
      monitorSelect.value = defaultMonitor;
      monitorSelect.dispatchEvent(new Event('change'));
    }
  }
  if (videoDistributionSelect) {
    const ensureOption = val => {
      let opt = Array.from(videoDistributionSelect.options).find(o => o.value === val);
      if (!opt) {
        opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        videoDistributionSelect.appendChild(opt);
      }
    };
    ensureOption('DoP Monitor 5" handheld');
    ensureOption('DoP Monitor 7" handheld');
    ensureOption('DoP Monitor 15-21"');
  }
  selected.forEach(val => {
    const box = document.createElement('span');
    box.className = 'scenario-box';
    const iconSpan = document.createElement('span');
    iconSpan.className = 'scenario-icon';
    iconSpan.textContent = scenarioIcons[val] || '📌';
    box.appendChild(iconSpan);
    box.appendChild(document.createTextNode(val));
    requiredScenariosSummary.appendChild(box);
  });
  if (tripodPreferencesRow) {
    if (selected.includes('Tripod')) {
      tripodPreferencesRow.classList.remove('hidden');
      if (tripodPreferencesHeading) tripodPreferencesHeading.classList.remove('hidden');
    } else {
      tripodPreferencesRow.classList.add('hidden');
      if (tripodPreferencesHeading) tripodPreferencesHeading.classList.add('hidden');
      if (tripodHeadBrandSelect) tripodHeadBrandSelect.value = '';
      if (tripodBowlSelect) tripodBowlSelect.value = '';
      if (tripodTypesSelect) Array.from(tripodTypesSelect.options).forEach(o => { o.selected = false; });
      if (tripodSpreaderSelect) tripodSpreaderSelect.value = '';
      updateTripodOptions();
    }
  }
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
  populateLensDropdown();
  populateFilterDropdown();
  populateUserButtonDropdowns();
  document.querySelectorAll('#projectForm select')
    .forEach(sel => attachSelectSearch(sel));
  setLanguage(currentLang);
  resetDeviceForm();
  restoreSessionState();
  applySharedSetupFromUrl();
  if (requiredScenariosSelect) {
    requiredScenariosSelect.addEventListener('change', updateRequiredScenariosSummary);
    updateRequiredScenariosSummary();
  }
  if (tripodHeadBrandSelect) {
    tripodHeadBrandSelect.addEventListener('change', updateTripodOptions);
  }
  if (tripodBowlSelect) {
    tripodBowlSelect.addEventListener('change', updateTripodOptions);
  }
  updateTripodOptions();
  updateViewfinderExtensionVisibility();
  updateCalculations();
  applyFilters();
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

function populateLensDropdown() {
  if (!lensSelect) return;

  lensSelect.innerHTML = '';
  const lensData = devices && devices.lenses;

  if (!lensData || Object.keys(lensData).length === 0) {
    return;
  }

  if (!lensSelect.multiple) {
    const emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    lensSelect.appendChild(emptyOpt);
  }
  Object.keys(lensData).sort(localeSort).forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    const lens = lensData[name] || {};
    const attrs = [];
    if (lens.weight_g) attrs.push(`${lens.weight_g}g`);
    if (lens.clampOn) {
      if (lens.frontDiameterMm) attrs.push(`${lens.frontDiameterMm}mm clamp-on`);
      else attrs.push('clamp-on');
    } else if (lens.clampOn === false) {
      attrs.push('no clamp-on');
    }
    const minFocus = lens.minFocusMeters ?? lens.minFocus ?? (lens.minFocusCm ? lens.minFocusCm / 100 : null);
    if (minFocus) attrs.push(`${minFocus}m min focus`);
    opt.textContent = attrs.length ? `${name} (${attrs.join(', ')})` : name;
    lensSelect.appendChild(opt);
  });
}

function populateCameraPropertyDropdown(selectId, property, selected = '') {
  const dropdown = document.getElementById(selectId);
  if (!dropdown) return;

  dropdown.innerHTML = '';
  const emptyOpt = document.createElement('option');
  emptyOpt.value = '';
  dropdown.appendChild(emptyOpt);

  const camKey = cameraSelect && cameraSelect.value;
  const values =
    camKey && devices && devices.cameras && devices.cameras[camKey]
      ? devices.cameras[camKey][property]
      : null;
  if (Array.isArray(values)) {
    values.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v;
      if (v === selected) opt.selected = true;
      dropdown.appendChild(opt);
    });
  }
}

function populateRecordingResolutionDropdown(selected = '') {
  populateCameraPropertyDropdown('recordingResolution', 'resolutions', selected);
}

function populateSensorModeDropdown(selected = '') {
  populateCameraPropertyDropdown('sensorMode', 'sensorModes', selected);
}

function populateCodecDropdown(selected = '') {
  populateCameraPropertyDropdown('codec', 'recordingCodecs', selected);
}

function populateFilterDropdown() {
  const filterSelect = document.getElementById('filter');
  if (filterSelect && devices && Array.isArray(devices.filterOptions)) {
    if (!filterSelect.multiple) {
      const emptyOpt = document.createElement('option');
      emptyOpt.value = '';
      filterSelect.appendChild(emptyOpt);
    }
    devices.filterOptions.forEach(f => {
      const opt = document.createElement('option');
      opt.value = f;
      opt.textContent = f;
      filterSelect.appendChild(opt);
    });
  }
}

function populateUserButtonDropdowns() {
  const functions = [
    'Toggle LUT',
    'False Color',
    'Peaking',
    'Anamorphic Desqueeze',
    'Surround View',
    '1:1 Zoom',
    'Playback',
    'Record',
    'Zoom',
    'Frame Lines'
  ];
  ['monitorUserButtons', 'cameraUserButtons', 'viewfinderUserButtons'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    functions.forEach(fn => {
      const opt = document.createElement('option');
      opt.value = fn;
      opt.textContent = fn;
      sel.appendChild(opt);
    });
    sel.size = functions.length;
  });
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
    generateGearListHtml,
    ensureZoomRemoteSetup,
    applySharedSetupFromUrl,
    applySharedSetup,
    updateBatteryPlateVisibility,
    updateBatteryOptions,
    renderSetupDiagram,
    enableDiagramInteractions,
    updateDiagramLegend,
    cameraFizPort,
    controllerCamPort,
    controllerDistancePort,
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
    saveCurrentGearList,
    autoSaveCurrentSetup,
    saveCurrentSession,
    restoreSessionState,
    displayGearAndRequirements,
    ensureGearListActions,
    bindGearListEasyrigListener,
    populateLensDropdown,
    populateCameraPropertyDropdown,
    populateRecordingResolutionDropdown,
    populateSensorModeDropdown,
    populateCodecDropdown,
    updateRequiredScenariosSummary,
    updateMonitoringConfigurationOptions,
    updateViewfinderExtensionVisibility,
    scenarioIcons,
  };
}
