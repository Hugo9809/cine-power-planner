function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var devices = {};
function registerDevice(path, data) {
  var parts = path.split('.');
  var obj = devices;
  while (parts.length > 1) {
    var part = parts.shift();
    obj = obj[part] = obj[part] || {};
  }
  var last = parts[0];
  if (obj[last] && _typeof(obj[last]) === 'object' && _typeof(data) === 'object' && !Array.isArray(data)) {
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