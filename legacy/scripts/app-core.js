var deviceFormattingModule = null;
try {
  deviceFormattingModule = require('./device-formatting.js');
} catch (error) {
  void error;
}
var deviceManagerViewModule = null;
try {
  deviceManagerViewModule = require('./device-manager-view.js');
} catch (error) {
  void error;
}
var DEVICE_VIEW_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
var humanizeKey = deviceFormattingModule && typeof deviceFormattingModule.humanizeKey === 'function' ? deviceFormattingModule.humanizeKey : typeof DEVICE_VIEW_SCOPE.humanizeKey === 'function' ? DEVICE_VIEW_SCOPE.humanizeKey : function humanizeKey(key) {
  var map = {
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
  if (typeof key === 'string' && map[key]) return map[key];
  if (typeof key !== 'string' || !key) return '';
  return key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, function (c) {
    return c.toUpperCase();
  });
};
var formatValue = deviceFormattingModule && typeof deviceFormattingModule.formatValue === 'function' ? deviceFormattingModule.formatValue : typeof DEVICE_VIEW_SCOPE.formatValue === 'function' ? DEVICE_VIEW_SCOPE.formatValue : function formatValue(value) {
  if (Array.isArray(value)) {
    return value.map(function (v) {
      return formatValue(v);
    }).join('; ');
  }
  if (value && _typeof(value) === 'object') {
    var parts = [];
    for (var k in value) {
      if (!Object.prototype.hasOwnProperty.call(value, k)) continue;
      var nested = value[k];
      if (nested === '' || nested === null || typeof nested === 'undefined') continue;
      parts.push("".concat(humanizeKey(k), ": ").concat(formatValue(nested)));
    }
    return "{ ".concat(parts.join(', '), " }");
  }
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (value === null || typeof value === 'undefined') return '';
  return String(value);
};
var formatDateString = deviceFormattingModule && typeof deviceFormattingModule.formatDateString === 'function' ? deviceFormattingModule.formatDateString : typeof DEVICE_VIEW_SCOPE.formatDateString === 'function' ? DEVICE_VIEW_SCOPE.formatDateString : function formatDateString(val) {
  if (!val) return '';
  var d = new Date(val);
  if (Number.isNaN(d.getTime())) return String(val);
  return d.toISOString().split('T')[0];
};
var refreshDeviceLists = deviceManagerViewModule && typeof deviceManagerViewModule.refreshDeviceLists === 'function' ? deviceManagerViewModule.refreshDeviceLists : typeof DEVICE_VIEW_SCOPE.refreshDeviceLists === 'function' ? DEVICE_VIEW_SCOPE.refreshDeviceLists : function refreshDeviceLists() {};
if (DEVICE_VIEW_SCOPE && typeof DEVICE_VIEW_SCOPE.refreshDeviceLists !== 'function' && typeof refreshDeviceLists === 'function') {
  DEVICE_VIEW_SCOPE.refreshDeviceLists = refreshDeviceLists;
}