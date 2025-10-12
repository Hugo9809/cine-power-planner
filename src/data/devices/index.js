var devices = {};

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
  require('./gearList.js');
  require('./wirelessReceivers.js');
  delete globalThis.registerDevice;
  module.exports = devices;
} else {
  globalThis.registerDevice = registerDevice;
  globalThis.devices = devices;
}
