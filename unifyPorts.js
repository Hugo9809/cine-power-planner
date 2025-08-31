const fs = require('fs');
let devices = require('./data.js');
function cleanTypeName(name) {
  let t = String(name).trim();
  // Preserve explicit IN/OUT labels; only remove generic INPUT/OUTPUT words.
  t = t.replace(/\b(INPUT|OUTPUT)\b/i, "").trim();
  if (/lemo\s*2\s*-?\s*pin/i.test(t)) t = "LEMO 2-pin";
  return t.replace(/\s+/g, " ");
}
function cleanVoltageRange(str) {
  if (!str || typeof str !== "string") return str;
  return str
    .replace(/DC/gi, "")
    .replace(/V/gi, "")
    .replace(/\s+/g, " ")
    .replace(/\s*-\s*/g, "-")
    .replace(/\s+\)/g, ")")
    .replace(/\(\s+/g, "(")
    .trim();
}

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
}

function cleanPowerInput(input) {
  if (!input) return;
  cleanPort(input);
  if (Array.isArray(input)) {
    input.forEach(port => {
      if (port.voltageRange) port.voltageRange = cleanVoltageRange(port.voltageRange);
    });
  } else if (input.voltageRange) {
    input.voltageRange = cleanVoltageRange(input.voltageRange);
  }
}

function normalizeVideoPorts(obj) {
  if (!obj) return;
  if (obj.video) {
    if (Array.isArray(obj.video.inputs)) obj.videoInputs = obj.video.inputs;
    if (Array.isArray(obj.video.outputs)) obj.videoOutputs = obj.video.outputs;
    delete obj.video;
  }
  if (Array.isArray(obj.videoInputs)) {
    obj.videoInputs = obj.videoInputs.map(i => ({ type: i.portType || i.type || i }));
    obj.videoInputs.forEach(cleanPort);
  }
  if (Array.isArray(obj.videoOutputs)) {
    obj.videoOutputs = obj.videoOutputs.map(o => ({ type: o.portType || o.type || o }));
    obj.videoOutputs.forEach(cleanPort);
  }
}

function normalizeCamera(cam) {
  if (cam.power && cam.power.input) {
    if (cam.power.input.powerDrawWatts === cam.powerDrawWatts) {
      delete cam.power.input.powerDrawWatts;
    }
    cleanPowerInput(cam.power.input);
  }
  if (Array.isArray(cam.power?.powerDistributionOutputs)) cam.power.powerDistributionOutputs.forEach(cleanPort);
  if (Array.isArray(cam.videoOutputs)) cam.videoOutputs.forEach(cleanPort);
  if (Array.isArray(cam.fizConnectors)) cam.fizConnectors.forEach(cleanPort);
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
  normalizeVideoPorts(mon);
}

function parsePowerInput(str) {
  if (!str) return null;
  const parts = [];
  let buf = "";
  let depth = 0;
  for (const ch of str) {
    if (ch === "(") depth++;
    else if (ch === ")") depth = Math.max(0, depth - 1);
    if (ch === "/" && depth === 0) {
      parts.push(buf);
      buf = "";
      continue;
    }
    buf += ch;
  }
  if (buf) parts.push(buf);
  return parts.map(p => {
    const m = p.trim().match(/^(.+?)(?:\(([^)]+)\))?$/);
    const type = m ? m[1].trim() : p.trim();
    const notes = m && m[2] ? m[2].trim() : "";
    const obj = { type };
    if (notes) obj.notes = notes;
    return obj;
  });
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

}
function normalizeFiz(dev) {
  if (dev.fizConnector && !dev.fizConnectors) {
    dev.fizConnectors = [{ type: dev.fizConnector }];
    delete dev.fizConnector;
  }
  if (dev.power?.input) cleanPowerInput(dev.power.input);
  if (Array.isArray(dev.fizConnectors)) dev.fizConnectors.forEach(cleanPort);
}

if (require.main === module) {
  for (const cam of Object.values(devices.cameras)) {
    normalizeCamera(cam);
  }
  for (const mon of Object.values(devices.monitors)) {
    normalizeMonitor(mon);
  }
  for (const vd of Object.values(devices.video)) {
    normalizeVideoDevice(vd);
  }
  for (const motor of Object.values(devices.fiz.motors)) {
    normalizeFiz(motor);
  }
  for (const ctrl of Object.values(devices.fiz.controllers)) {
    normalizeFiz(ctrl);
  }
  for (const dist of Object.values(devices.fiz.distance)) {
    normalizeFiz(dist);
  }
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
    parsePowerInput,
    devices,
  };
}
