/*
 * Utilities to present device information in a human friendly way.
 * This module mirrors the original helper functions that previously
 * lived in app-core.js so the rest of the codebase can continue to
 * rely on the same global function names.
 */
(function (globalScope) {
  'use strict';

  function defaultHumanizeKey(key) {
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
    if (typeof key === 'string' && map[key]) {
      return map[key];
    }
    if (typeof key !== 'string' || !key) {
      return '';
    }
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function (c) { return c.toUpperCase(); });
  }

  function defaultFormatValue(value) {
    if (Array.isArray(value)) {
      return value.map(function (v) { return defaultFormatValue(v); }).join('; ');
    }
    if (value && typeof value === 'object') {
      var parts = [];
      for (var k in value) {
        if (!Object.prototype.hasOwnProperty.call(value, k)) {
          continue;
        }
        var nested = value[k];
        if (nested === '' || nested === null || typeof nested === 'undefined') {
          continue;
        }
        parts.push(defaultHumanizeKey(k) + ': ' + defaultFormatValue(nested));
      }
      return '{ ' + parts.join(', ') + ' }';
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
      return String(value);
    }
    if (value === null || typeof value === 'undefined') {
      return '';
    }
    return String(value);
  }

  function defaultFormatDateString(val) {
    if (!val) {
      return '';
    }
    var d = new Date(val);
    if (Number.isNaN(d.getTime())) {
      return String(val);
    }
    return d.toISOString().split('T')[0];
  }

  var exportsObj = {
    humanizeKey: defaultHumanizeKey,
    formatValue: defaultFormatValue,
    formatDateString: defaultFormatDateString
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exportsObj;
  }

  if (globalScope && typeof globalScope === 'object') {
    globalScope.humanizeKey = defaultHumanizeKey;
    globalScope.formatValue = defaultFormatValue;
    globalScope.formatDateString = defaultFormatDateString;
    if (!globalScope.deviceFormatting || typeof globalScope.deviceFormatting !== 'object') {
      globalScope.deviceFormatting = {
        humanizeKey: defaultHumanizeKey,
        formatValue: defaultFormatValue,
        formatDateString: defaultFormatDateString
      };
    } else {
      globalScope.deviceFormatting.humanizeKey = defaultHumanizeKey;
      globalScope.deviceFormatting.formatValue = defaultFormatValue;
      globalScope.deviceFormatting.formatDateString = defaultFormatDateString;
    }
  }
})(typeof globalThis !== 'undefined'
  ? globalThis
  : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
        ? self
        : this);

