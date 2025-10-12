var devices = {};

function registerDevice(path, data) {
  var parts = path.split('.');
  var obj = devices;
  while (parts.length > 1) {
    var part = parts.shift();
    if (
      part === '__proto__' ||
      part === 'constructor' ||
      part === 'prototype'
    ) {
      throw new Error("Unsafe key in device path: " + part);
    }
    obj = obj[part] = obj[part] || {};
  }
  var last = parts[0];
  if (
    last === '__proto__' ||
    last === 'constructor' ||
    last === 'prototype'
  ) {
    throw new Error("Unsafe key in device path: " + last);
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
