const fs = require('fs');
const path = require('path');
let devices = require('../src/data');

// Caches for expensive normalization steps to avoid repeated regex work
const typeNameCache = new Map();
const voltageRangeCache = new Map();
// Cache for parsed power input strings to avoid repeated parsing work
const powerInputCache = new Map();

// Precompiled regular expressions reused across calls to avoid recreating them
const IO_WORDS_REGEX = /\b(?:INPUT|OUTPUT)\b/gi;
const LEMO_2PIN_REGEX = /lemo\s*2\s*-?\s*pin/i;
const DTAP_REGEX = /d[\s-]?tap/i;
const USB_TYPEC_REGEX = /usb\s*type[-\s]?c/i;
const CONNECTOR_PORT_REGEX = /\b(?:connector|port)\b/gi;
const MULTISPACE_REGEX = /\s+/g;

const VOLTAGE_DC_REGEX = /DC/gi;
const VOLTAGE_V_REGEX = /V(?:olt)?(?:s)?/gi;
const EN_DASH_REGEX = /[–—]/g;
const TO_WORD_REGEX = /\bto\b/gi;
const SPACE_DASH_SPACE_REGEX = /\s*-\s*/g;
const SPACE_CLOSE_REGEX = /\s+\)/g;
const OPEN_SPACE_REGEX = /\(\s+/g;
const PAREN_NOTES_REGEX = /^(.+?)\s*\(([^)]+)\)$/;
const QUOTE_NOTES_REGEX = /^(.+?)\s*['"]([^'"]+)['"]$/;

/**
 * Standardizes connector type names for easier comparison.
 *
 * @param {string} name - Raw connector name.
 * @returns {string} Normalized connector name.
 */
function cleanTypeName(name) {
  const key = String(name);
  if (typeNameCache.has(key)) return typeNameCache.get(key);
  let t = key.trim();
  // Preserve explicit IN/OUT labels; only remove generic INPUT/OUTPUT words.
  // The regex is precompiled and global to strip multiple occurrences.
  t = t.replace(IO_WORDS_REGEX, "").trim();
  if (LEMO_2PIN_REGEX.test(t)) t = "LEMO 2-pin";
  else if (DTAP_REGEX.test(t)) t = "D-Tap";
  else if (USB_TYPEC_REGEX.test(t)) t = "USB-C";
  t = t.replace(CONNECTOR_PORT_REGEX, "").trim();
  t = t.replace(MULTISPACE_REGEX, " ");
  typeNameCache.set(key, t);
  return t;
}

/**
 * Normalizes voltage range strings by stripping units and excess spacing.
 *
 * @param {string} str - Raw voltage range description.
 * @returns {string} Cleaned voltage range.
 */
function cleanVoltageRange(str) {
  if (!str || typeof str !== "string") return str;
  if (voltageRangeCache.has(str)) return voltageRangeCache.get(str);
  const cleaned = str
    .replace(VOLTAGE_DC_REGEX, "")
    .replace(VOLTAGE_V_REGEX, "")
    .replace(EN_DASH_REGEX, "-")
    .replace(TO_WORD_REGEX, "-")
    .replace(MULTISPACE_REGEX, " ")
    .replace(SPACE_DASH_SPACE_REGEX, "-")
    .replace(SPACE_CLOSE_REGEX, ")")
    .replace(OPEN_SPACE_REGEX, "(")
    .trim();
  voltageRangeCache.set(str, cleaned);
  return cleaned;
}

/**
 * Recursively walks an object, normalizing voltage ranges and connector types.
 *
 * @param {any} obj - Object or array to clean.
 * @returns {any} The mutated input for convenience.
 */
function deepClean(obj) {
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => {
      obj[i] = deepClean(v);
    });
    return obj;
  }
  if (obj && typeof obj === "object") {
    if (obj.voltageRange) obj.voltageRange = cleanVoltageRange(obj.voltageRange);
    if (obj.type) obj.type = cleanTypeName(obj.type);
    for (const key of Object.keys(obj)) {
      obj[key] = deepClean(obj[key]);
    }
    return obj;
  }
  return obj;
}



function cleanPort(port) {
  if (!port) return;
  if (Array.isArray(port)) {
    // Convert primitive entries (e.g. strings) into port objects so that
    // arrays can be normalized consistently. Recursively clean any newly
    // created objects as well as existing ones.
    port.forEach((p, i) => {
      if (typeof p === 'string') {
        port[i] = { type: cleanTypeName(p) };
      }
      cleanPort(port[i]);
    });
    return;
  }
  // Guard against primitive values (e.g. strings) which would cause the
  // `in` operator to throw a TypeError. Such values can't be normalized in
  // place, so we simply ignore them.
  if (typeof port !== 'object') return;

  if ('portType' in port) {
    if (!('type' in port)) port.type = port.portType;
    delete port.portType;
  }
  if (port.type) port.type = cleanTypeName(port.type);
  deepClean(port);
}

function cleanPowerInput(input) {
  if (!input) return;
  cleanPort(input);
}

function cleanPorts(...ports) {
  ports.forEach(cleanPort);
}

function normalizePortList(list) {
  return list.map(p => {
    // Preserve all existing properties on the port definition instead of
    // throwing them away. The previous implementation only kept the type and
    // silently discarded fields like `notes` or custom metadata which are used
    // elsewhere in the application.
    const portObj = (p && typeof p === 'object') ? { ...p } : { type: p };
    cleanPort(portObj);
    return portObj;
  });
}

function normalizeVideoPorts(obj) {
  if (!obj) return;
  if (obj.video) {
    if (Array.isArray(obj.video.inputs)) obj.videoInputs = obj.video.inputs;
    if (Array.isArray(obj.video.outputs)) obj.videoOutputs = obj.video.outputs;
    delete obj.video;
  }
  if (Array.isArray(obj.videoInputs)) obj.videoInputs = normalizePortList(obj.videoInputs);
  if (Array.isArray(obj.videoOutputs)) obj.videoOutputs = normalizePortList(obj.videoOutputs);
}

function normalizeCamera(cam) {
  if (cam.power && cam.power.input) {
    if (cam.power.input.powerDrawWatts === cam.powerDrawWatts) {
      delete cam.power.input.powerDrawWatts;
    }
    cleanPowerInput(cam.power.input);
  }
  cleanPorts(
    cam.power?.powerDistributionOutputs,
    cam.videoOutputs,
    cam.fizConnectors
  );
  if (Array.isArray(cam.lensMount)) {
    cam.lensMount.forEach(m => {
      if (m.mount === 'adapted' && /LDS|Cooke/i.test(m.notes || '')) {
        m.notes = 'No ARRI LDS or Cooke /i lens data';
      }
    });
  }
}

function normalizeMonitor(mon) {
  if (mon.power?.input) cleanPowerInput(mon.power.input);
  cleanPorts(
    mon.power?.output,
    mon.audioInput,
    mon.audioOutput,
    mon.audioIo
  );
  normalizeVideoPorts(mon);
}

/**
 * Splits a string by a delimiter, ignoring delimiters inside parentheses or quotes.
 *
 * @param {string} str - String to split.
 * @param {string} [delimiter='/'] - Delimiter character.
 * @returns {string[]} Array of string segments.
 */
function splitOutside(str, delimiter = '/') {
  if (typeof str !== 'string' || !str.includes(delimiter)) {
    return [str];
  }
  const parts = [];
  let buf = '';
  let depth = 0;
  let quote = null;
  for (const ch of str) {
    if (quote) {
      if (ch === quote) quote = null;
    } else {
      if (ch === '"' || ch === "'") {
        quote = ch;
      } else if (ch === '(') {
        depth++;
      } else if (ch === ')') {
        depth = Math.max(0, depth - 1);
      } else if (ch === delimiter && depth === 0) {
        if (buf) parts.push(buf);
        buf = '';
        continue;
      }
    }
    buf += ch;
  }
  if (buf) parts.push(buf);
  return parts;
}

/**
 * Extracts a connector type and optional notes from a segment.
 *
 * @param {string} segment - Raw segment containing type and optional notes.
 * @returns {{type: string, notes: string}} Parsed type and notes.
 */
function extractTypeAndNotes(segment) {
  let type = segment;
  let notes = '';

  let m = type.match(PAREN_NOTES_REGEX);
  if (m) {
    type = m[1].trim();
    notes = m[2].trim();
  } else {
    m = type.match(QUOTE_NOTES_REGEX);
    if (m) {
      type = m[1].trim();
      notes = m[2].trim();
    }
  }

  return { type, notes };
}

/**
 * Parses a power input description into structured objects.
 *
 * Each segment is separated by `/` unless the slash appears inside parentheses
 * or quotes. Notes inside parentheses or quotes are stored on the returned
 * object.
 *
 * @param {string} str - Power input description (e.g. "LEMO (5V/3A) / D-Tap").
 * @returns {Array<{type: string, notes?: string}>|null} Parsed representation.
 */
function parsePowerInput(str) {
  // Gracefully handle non-string inputs. Consumers may accidentally pass
  // numbers or other types, which previously caused a runtime error when the
  // value was fed into string helpers like `trim`. Treat such inputs as
  // unparsable instead of throwing. Similarly, empty or whitespace-only
  // strings should be considered invalid and yield `null`.
  if (typeof str !== "string") return null;
  const normalized = str.trim();
  if (!normalized) return null;

  if (powerInputCache.has(normalized)) {
    // Return a fresh copy of the cached array so callers can mutate the
    // result without affecting subsequent lookups.
    const cached = powerInputCache.get(normalized);
    return cached.map(obj => ({ ...obj }));
  }

  const segments = splitOutside(normalized)
    .map(p => p.trim())
    .filter(Boolean);
  if (segments.length === 0) return null;

  const arr = segments.map(segment => {
    const { type, notes } = extractTypeAndNotes(segment);
    const obj = { type: cleanTypeName(type) };
    if (notes) obj.notes = notes;
    return obj;
  });

  // Store a defensive copy to keep the cached data immutable.
  powerInputCache.set(
    normalized,
    arr.map(obj => ({ ...obj }))
  );
  return arr;
}

function normalizeVideoDevice(dev) {
  if (dev.powerInput) {
    const arr = parsePowerInput(dev.powerInput);
    if (arr && arr.length === 1) dev.power = { input: arr[0] };
    else if (arr && arr.length) dev.power = { input: arr };
    delete dev.powerInput;
  }
  normalizeVideoPorts(dev);
  if (dev.power?.input) cleanPowerInput(dev.power.input);
  cleanPorts(dev.audioInput, dev.audioOutput, dev.audioIo);
}
function normalizeFiz(dev) {
  if (dev.fizConnector && !dev.fizConnectors) {
    dev.fizConnectors = [{ type: dev.fizConnector }];
    delete dev.fizConnector;
  }
  if (dev.power?.input) cleanPowerInput(dev.power.input);
  cleanPorts(dev.fizConnectors);
}

function normalizeCollection(collection, fn) {
  for (const key in collection) {
    if (Object.prototype.hasOwnProperty.call(collection, key)) {
      fn(collection[key]);
    }
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log(
      [
        'Usage: node unifyPorts.js [options]',
        '',
        'Normalizes connector and port definitions in src/data/index.js and overwrites the file.',
        '',
        'Key actions:',
        '  - Converts legacy powerInput strings into structured power.input entries.',
        '  - Cleans audio, video and FIZ ports, merging duplicates and removing blanks.',
        '  - Aligns voltage ranges and port metadata so dropdown help stays descriptive.',
        '',
        'Recommended workflow:',
        '  1. Normalize data first with `npm run normalize`.',
        '  2. Run this script (`npm run unify-ports`) to synchronize connector metadata across categories.',
        '  3. Regenerate schema.json afterwards with `npm run generate-schema`.',
        '  4. Re-run Jest data tests (`npm run test:data`) to confirm selector expectations still pass.',
        '',
        'The script updates src/data/index.js in place. Review the diff and commit it together with schema changes.',
        '',
        'Examples:',
        '  npm run unify-ports',
        '  npm run unify-ports -- --help',
        '  node unifyPorts.js --help',
        '',
        'Options:',
        '  -h, --help     Show this help message and exit.'
      ].join('\n')
    );
    process.exit(0);
  }
  normalizeCollection(devices.cameras, normalizeCamera);
  normalizeCollection(devices.monitors, normalizeMonitor);
  normalizeCollection(devices.video, normalizeVideoDevice);
  normalizeCollection(devices.directorMonitors, normalizeMonitor);
  normalizeCollection(devices.iosVideo, normalizeVideoDevice);
  normalizeCollection(devices.wirelessReceivers, normalizeVideoDevice);
  normalizeCollection(devices.fiz.motors, normalizeFiz);
  normalizeCollection(devices.fiz.controllers, normalizeFiz);
  normalizeCollection(devices.fiz.distance, normalizeFiz);
  deepClean(devices);
  const serializedDevices = JSON.stringify(devices, null, 2);
  const output = `const devices = ${serializedDevices};
const rentalHouses = require('./rental-houses');

if (devices && !Object.prototype.hasOwnProperty.call(devices, 'rentalHouses')) {
  Object.defineProperty(devices, 'rentalHouses', {
    configurable: false,
    enumerable: false,
    value: rentalHouses,
    writable: false
  });
}

module.exports = devices;
`;

  fs.writeFileSync(path.join(__dirname, '../src/data/index.js'), output);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    cleanTypeName,
    cleanVoltageRange,
    deepClean,
    cleanPort,
    cleanPowerInput,
    normalizeCamera,
    normalizeMonitor,
    normalizeVideoPorts,
    normalizeVideoDevice,
    normalizeFiz,
    splitOutside,
    parsePowerInput,
    devices,
  };
}
