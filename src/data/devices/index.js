var devices = {};

var NORMALIZED_FLAG_KEY = '__normalized';

function markDevicesNormalized() {
  try {
    Object.defineProperty(devices, NORMALIZED_FLAG_KEY, {
      configurable: true,
      enumerable: false,
      value: true,
      writable: true
    });
  } catch (defineError) {
    void defineError;
    devices[NORMALIZED_FLAG_KEY] = true;
  }
}

function isSafeKey(key) {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
}

function registerDevice(path, data) {
  var parts = path.split('.');
  var obj = devices;
  while (parts.length > 1) {
    var part = parts.shift();
    if (!isSafeKey(part)) {
      throw new Error("Unsafe key in path: '" + part + "'");
    }
    obj = obj[part] = obj[part] || {};
  }
  var last = parts[0];
  if (!isSafeKey(last)) {
    throw new Error("Unsafe key in path: '" + last + "'");
  }
  if (
    obj[last] &&
    typeof obj[last] === 'object' &&
    typeof data === 'object' &&
    !Array.isArray(data)
  ) {
    obj[last] = Object.assign({}, obj[last], data);
  } else {
    obj[last] = data;
  }
  return obj[last];
}

if (typeof module !== 'undefined' && module.exports) {
  globalThis.registerDevice = registerDevice;
  require('./cameras.js');
  require('./monitors.js');
  require('./video.js');
  require('./fiz.js');
  require('./batteries.js');
  require('./batteryHotswaps.js');
  require('./chargers.js');
  require('./cages.js');
  require('./carts.js');
  require('./gearList.js');
  require('./wirelessReceivers.js');
  markDevicesNormalized();
  delete globalThis.registerDevice;
  module.exports = devices;
} else {
  globalThis.registerDevice = registerDevice;
  globalThis.devices = devices;
  markDevicesNormalized();
}
