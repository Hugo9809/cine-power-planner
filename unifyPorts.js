const fs = require('fs');
let devices = require('./data.js');

// Caches for expensive normalization steps to avoid repeated regex work
const typeNameCache = new Map();
const voltageRangeCache = new Map();
// Cache for parsed power input strings to avoid repeated parsing work
const powerInputCache = new Map();

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
  t = t.replace(/\b(INPUT|OUTPUT)\b/i, "").trim();
  if (/lemo\s*2\s*-?\s*pin/i.test(t)) t = "LEMO 2-pin";
  if (/d[\s-]?tap/i.test(t)) t = "D-Tap";
  if (/usb\s*type[-\s]?c/i.test(t)) t = "USB-C";
  t = t.replace(/\s+/g, " ");
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
    .replace(/DC/gi, "")
    .replace(/V(?:olt)?(?:s)?/gi, "")
    .replace(/[–—]/g, "-")
    .replace(/\bto\b/gi, "-")
    .replace(/\s+/g, " ")
    .replace(/\s*-\s*/g, "-")
    .replace(/\s+\)/g, ")")
    .replace(/\(\s+/g, "(")
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
    port.forEach(cleanPort);
    return;
  }
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

function normalizePortList(list) {
  return list.map(p => {
    const portObj = { type: p.portType || p.type || p };
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
  cleanPort(cam.power?.powerDistributionOutputs);
  cleanPort(cam.videoOutputs);
  cleanPort(cam.fizConnectors);
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
  if (mon.power?.output) cleanPort(mon.power.output);
  cleanPort(mon.audioInput);
  cleanPort(mon.audioOutput);
  cleanPort(mon.audioIo);
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
  if (!str) return null;
  if (powerInputCache.has(str)) return powerInputCache.get(str);
  const arr = splitOutside(str)
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => {
      let type = p;
      let notes = '';

      let m = type.match(/^(.+?)\s*\(([^)]+)\)$/);
      if (m) {
        type = m[1].trim();
        notes = m[2].trim();
      } else {
        m = type.match(/^(.+?)\s*['"]([^'"]+)['"]$/);
        if (m) {
          type = m[1].trim();
          notes = m[2].trim();
        }
      }
      const obj = { type: cleanTypeName(type) };
      if (notes) obj.notes = notes;
      return obj;
    });
  powerInputCache.set(str, arr);
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
  cleanPort(dev.audioInput);
  cleanPort(dev.audioOutput);
  cleanPort(dev.audioIo);

}
function normalizeFiz(dev) {
  if (dev.fizConnector && !dev.fizConnectors) {
    dev.fizConnectors = [{ type: dev.fizConnector }];
    delete dev.fizConnector;
  }
  if (dev.power?.input) cleanPowerInput(dev.power.input);
  cleanPort(dev.fizConnectors);
}

function normalizeCollection(collection, fn) {
  Object.values(collection).forEach(fn);
}

if (require.main === module) {
  normalizeCollection(devices.cameras, normalizeCamera);
  normalizeCollection(devices.monitors, normalizeMonitor);
  normalizeCollection(devices.video, normalizeVideoDevice);
  normalizeCollection(devices.fiz.motors, normalizeFiz);
  normalizeCollection(devices.fiz.controllers, normalizeFiz);
  normalizeCollection(devices.fiz.distance, normalizeFiz);
  deepClean(devices);
  fs.writeFileSync(
    'data.js',
    'let devices=' +
      JSON.stringify(devices, null, 2) +
      ';\nif (typeof module !== "undefined" && module.exports) { module.exports = devices; }\n'
  );
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
