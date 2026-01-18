var _excluded = ["portType", "type"],
  _excluded2 = ["count"],
  _excluded3 = ["type"],
  _excluded4 = ["type"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function createCineDeviceNormalizationModule() {
  var globalScope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || {};
  var VIDEO_OUTPUT_TYPES = new Set(['3G-SDI', '6G-SDI', '12G-SDI', 'Mini BNC', 'HDMI', 'Mini HDMI', 'Micro HDMI', 'DisplayPort']);
  var NORMALIZED_FLAG_KEY = '__normalized';
  function memoizeNormalization(fn) {
    var cache = new Map();
    return function (value) {
      if (!value) return '';
      var str = String(value).replace(/[™®]/g, '').trim();
      var key = str.toLowerCase();
      if (!cache.has(key)) cache.set(key, fn(str, key));
      return cache.get(key);
    };
  }
  var VIDEO_TYPE_PATTERNS = [{
    needles: ['12g'],
    value: '12G-SDI'
  }, {
    needles: ['6g'],
    value: '6G-SDI'
  }, {
    needles: ['3g'],
    value: '3G-SDI'
  }, {
    needles: ['hd', 'sdi'],
    value: '3G-SDI'
  }, {
    needles: ['mini', 'bnc'],
    value: 'Mini BNC'
  }, {
    needles: ['micro', 'hdmi'],
    value: 'Micro HDMI'
  }, {
    needles: ['mini', 'hdmi'],
    value: 'Mini HDMI'
  }, {
    needles: ['hdmi'],
    value: 'HDMI'
  }, {
    needles: ['displayport'],
    value: 'DisplayPort'
  }, {
    needles: ['display', 'port'],
    value: 'DisplayPort'
  }, {
    needles: ['dp'],
    value: 'DisplayPort'
  }];
  var normalizeVideoType = memoizeNormalization(function (_, key) {
    var match = VIDEO_TYPE_PATTERNS.find(function (_ref) {
      var needles = _ref.needles;
      return needles.every(function (n) {
        return key.includes(n);
      });
    });
    return match ? match.value : '';
  });
  var FIZ_CONNECTOR_MAP = {
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
    return memoizeNormalization(function (str, key) {
      return map[key] || str;
    });
  }
  var normalizeFizConnectorType = createMapNormalizer(FIZ_CONNECTOR_MAP);
  var VIEWFINDER_TYPE_MAP = {
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
  var normalizeViewfinderType = createMapNormalizer(VIEWFINDER_TYPE_MAP);
  var POWER_PORT_TYPE_MAP = {
    'lemo 8-pin (dc in / bat)': 'Bat LEMO 8-pin',
    'lemo 8-pin (bat)': 'Bat LEMO 8-pin',
    'bat (lemo 8-pin)': 'Bat LEMO 8-pin',
    'lemo 8-pin': 'Bat LEMO 8-pin',
    '2-pin dc-input': '2-pin DC-IN',
    'dc-': 'DC IN',
    'dc': 'DC IN',
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
    'usb-c pd,dc coupler': 'USB-C PD / DC Coupler',
    'dc coupler': 'DC Coupler',
    'dc coupler (dr-e6c)': 'DC Coupler',
    'dc input': 'DC IN',
    'dc barrel': 'DC Barrel',
    'dc (barrel)': 'DC Barrel',
    'locking dc barrel': 'DC Barrel',
    'dc 24v terminal': 'DC Barrel',
    'weipu sf610/s2 (12vdc) input': 'Weipu SF610/S2',
    '6-pin 1b dc-in / tb50 battery mount': '6-pin 1B DC-IN',
    '6-pin 1b dc-,tb50': '6-pin 1B DC-IN'
  };
  var mapPowerPortOne = createMapNormalizer(POWER_PORT_TYPE_MAP);
  function normalizePowerPortType(type) {
    if (!type) return [];
    var toArray = function toArray(val) {
      var normalized = mapPowerPortOne(val);
      if (!normalized) return [];
      return normalized.split(/[/,]/).map(function (piece) {
        return mapPowerPortOne(piece.trim());
      }).map(function (piece) {
        return piece && piece.trim() || '';
      }).filter(Boolean);
    };
    return Array.isArray(type) ? type.flatMap(toArray) : toArray(type);
  }
  function ensureList(list, defaults) {
    if (!Array.isArray(list)) return [];
    return list.map(function (item) {
      return typeof item === 'string' ? _objectSpread(_objectSpread({}, defaults), {}, {
        type: item
      }) : _objectSpread(_objectSpread({}, defaults), item || {});
    });
  }
  function fixPowerInput(dev) {
    var _dev$power, _dev$power2;
    if (!dev) return;
    if (dev.powerInput && !((_dev$power = dev.power) !== null && _dev$power !== void 0 && _dev$power.input)) {
      dev.power = _objectSpread(_objectSpread({}, dev.power || {}), {}, {
        input: {
          type: normalizePowerPortType(dev.powerInput)
        }
      });
      delete dev.powerInput;
    }
    var input = (_dev$power2 = dev.power) === null || _dev$power2 === void 0 ? void 0 : _dev$power2.input;
    if (!input) return;
    var normalizeEntry = function normalizeEntry(it) {
      if (typeof it === 'string') {
        return {
          type: normalizePowerPortType(it)
        };
      }
      if (it) {
        var pType = it.portType,
          tType = it.type,
          rest = _objectWithoutProperties(it, _excluded);
        var typeField = !tType && pType ? pType : tType;
        return _objectSpread(_objectSpread({}, rest), {}, {
          type: typeField ? normalizePowerPortType(typeField) : []
        });
      }
      return {
        type: []
      };
    };
    dev.power.input = Array.isArray(input) ? input.map(normalizeEntry) : normalizeEntry(input);
  }
  function applyFixPowerInput(collection) {
    if (!collection || _typeof(collection) !== 'object') return;
    Object.values(collection).forEach(fixPowerInput);
  }
  function hasNormalizedDevicesMarker(bundle) {
    return Boolean(bundle && Object.prototype.hasOwnProperty.call(bundle, NORMALIZED_FLAG_KEY) && bundle[NORMALIZED_FLAG_KEY]);
  }
  function markDevicesNormalized(bundle) {
    if (!bundle || _typeof(bundle) !== 'object') {
      return bundle;
    }
    try {
      Object.defineProperty(bundle, NORMALIZED_FLAG_KEY, {
        configurable: true,
        enumerable: false,
        value: true,
        writable: true
      });
    } catch (defineNormalizedError) {
      void defineNormalizedError;
      bundle[NORMALIZED_FLAG_KEY] = true;
    }
    return bundle;
  }
  function unifyDevices(devicesData, options) {
    var _devicesData$fiz, _devicesData$fiz2;
    if (!devicesData || _typeof(devicesData) !== 'object') return devicesData;
    var force = Boolean(options && options.force);
    if (!force && hasNormalizedDevicesMarker(devicesData)) {
      return devicesData;
    }
    Object.values(devicesData.cameras || {}).forEach(function (cam) {
      var _cam$power, _cam$power2;
      if ((_cam$power = cam.power) !== null && _cam$power !== void 0 && _cam$power.input && cam.power.input.powerDrawWatts !== undefined) {
        delete cam.power.input.powerDrawWatts;
      }
      fixPowerInput(cam);
      if (Array.isArray((_cam$power2 = cam.power) === null || _cam$power2 === void 0 ? void 0 : _cam$power2.batteryPlateSupport)) {
        cam.power.batteryPlateSupport = cam.power.batteryPlateSupport.map(function (it) {
          if (typeof it === 'string') {
            var m = it.match(/([^()]+)(?:\(([^)]+)\))?(?:\s*-\s*(.*))?/);
            var type = m ? m[1].trim() : it;
            var mount = m && m[2] ? m[2].trim().toLowerCase() : '';
            if (!mount) {
              mount = /adapted|via adapter/i.test(it) ? 'adapted' : 'native';
            } else if (/via adapter/i.test(mount)) {
              mount = 'adapted';
            }
            var notes = m && m[3] ? m[3].trim() : /via adapter/i.test(it) ? 'via adapter' : '';
            return {
              type: type,
              mount: mount,
              notes: notes
            };
          }
          return {
            type: it.type || '',
            mount: (it.mount ? it.mount : it.native ? 'native' : it.adapted ? 'adapted' : 'native').toLowerCase(),
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
      cam.videoOutputs = ensureList(cam.videoOutputs, {
        type: '',
        notes: ''
      }).flatMap(function (vo) {
        var _ref2 = vo || {},
          count = _ref2.count,
          rest = _objectWithoutProperties(_ref2, _excluded2);
        var norm = normalizeVideoType(rest.type);
        if (!VIDEO_OUTPUT_TYPES.has(norm)) return [];
        var parsedCount = parseInt(count, 10);
        var num = Number.isFinite(parsedCount) && parsedCount > 0 ? parsedCount : 1;
        var base = _objectSpread(_objectSpread({}, rest), {}, {
          type: norm,
          notes: rest.notes || ''
        });
        return Array.from({
          length: num
        }, function () {
          return _objectSpread({}, base);
        });
      });
      cam.fizConnectors = ensureList(cam.fizConnectors, {
        type: '',
        notes: ''
      }).map(function (fc) {
        var _ref3 = fc || {},
          type = _ref3.type,
          rest = _objectWithoutProperties(_ref3, _excluded3);
        return _objectSpread(_objectSpread({}, rest), {}, {
          type: normalizeFizConnectorType(type)
        });
      });
      cam.viewfinder = ensureList(cam.viewfinder, {
        type: '',
        resolution: '',
        connector: '',
        notes: ''
      }).map(function (vf) {
        var _ref4 = vf || {},
          type = _ref4.type,
          rest = _objectWithoutProperties(_ref4, _excluded4);
        return _objectSpread(_objectSpread({}, rest), {}, {
          type: normalizeViewfinderType(type)
        });
      });
      cam.recordingMedia = ensureList(cam.recordingMedia, {
        type: '',
        notes: ''
      }).map(function (m) {
        var _ref5 = m || {},
          _ref5$type = _ref5.type,
          type = _ref5$type === void 0 ? '' : _ref5$type,
          _ref5$notes = _ref5.notes,
          notes = _ref5$notes === void 0 ? '' : _ref5$notes;
        var match = type.match(/^(.*?)(?:\((.*)\))?$/);
        if (match) {
          type = match[1].trim();
          notes = notes || (match[2] ? match[2].trim() : '');
        }
        if (/^SD UHS-II$/i.test(type)) {
          type = 'SD Card';
          notes = notes ? "".concat(notes, "; UHS-II") : 'UHS-II';
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
          notes = notes ? "".concat(notes, "; UHS-II (Dual Slots)") : 'UHS-II (Dual Slots)';
        } else if (type === 'SD Card (Dual Slots)') {
          type = 'SD Card';
          notes = notes || 'Dual Slots';
        } else if (type === 'SD card slot (for proxy/backup)') {
          type = 'SD Card';
          notes = notes || 'for proxy/backup';
        }
        return {
          type: type,
          notes: notes
        };
      });
      cam.timecode = ensureList(cam.timecode, {
        type: '',
        notes: ''
      });
      cam.lensMount = ensureList(cam.lensMount, {
        type: '',
        mount: 'native',
        notes: ''
      }).map(function (lm) {
        return {
          type: lm.type,
          mount: lm.mount ? lm.mount.toLowerCase() : 'native',
          notes: lm.notes || ''
        };
      }).filter(function (lm, idx, arr) {
        return idx === arr.findIndex(function (o) {
          return o.type === lm.type && o.mount === lm.mount && o.notes === lm.notes;
        });
      });
    });
    Object.values(devicesData.lenses || {}).forEach(function (lens) {
      if (!lens || _typeof(lens) !== 'object') return;
      var normalizeMountEntry = function normalizeMountEntry(entry) {
        if (!entry) return null;
        if (typeof entry === 'string') {
          var trimmed = entry.trim();
          if (!trimmed) return null;
          return {
            type: trimmed,
            mount: 'native'
          };
        }
        var type = typeof entry.type === 'string' ? entry.type.trim() : '';
        if (!type) return null;
        var status = typeof entry.mount === 'string' ? entry.mount.trim().toLowerCase() : '';
        return {
          type: type,
          mount: status === 'adapted' ? 'adapted' : 'native'
        };
      };
      var existingMountOptions = lens.mountOptions;
      var normalizedOptions = [];
      var pushNormalizedEntry = function pushNormalizedEntry(entry) {
        var normalized = normalizeMountEntry(entry);
        if (normalized) {
          normalizedOptions.push(normalized);
        }
      };
      if (Array.isArray(existingMountOptions)) {
        existingMountOptions.forEach(pushNormalizedEntry);
      } else if (existingMountOptions && _typeof(existingMountOptions) === 'object') {
        pushNormalizedEntry(existingMountOptions);
      }
      if (!normalizedOptions.length && Array.isArray(lens.lensMount)) {
        lens.lensMount.forEach(pushNormalizedEntry);
        delete lens.lensMount;
      }
      if (!normalizedOptions.length) {
        var mountType = typeof lens.mount === 'string' ? lens.mount.trim() : '';
        if (mountType) {
          pushNormalizedEntry({
            type: mountType,
            mount: 'native'
          });
        }
      }
      var dedupedOptions = [];
      normalizedOptions.forEach(function (opt) {
        if (!opt || !opt.type) return;
        var mountState = opt.mount === 'adapted' ? 'adapted' : 'native';
        var alreadyPresent = dedupedOptions.some(function (existing) {
          return existing.type === opt.type && existing.mount === mountState;
        });
        if (!alreadyPresent) {
          dedupedOptions.push({
            type: opt.type,
            mount: mountState
          });
        }
      });
      var safeMountOptions = Array.isArray(dedupedOptions) ? dedupedOptions : [];
      lens.mountOptions = safeMountOptions;
      var mountOptions = Array.isArray(lens.mountOptions) ? lens.mountOptions : [];
      if (mountOptions.length) {
        var primary = mountOptions.find(function (opt) {
          return opt && opt.mount === 'native' && opt.type;
        }) || mountOptions[0];
        var primaryType = primary && primary.type ? primary.type : '';
        if (primaryType) {
          lens.mount = primaryType;
        } else if (typeof lens.mount === 'string') {
          lens.mount = lens.mount.trim();
        }
      } else if (typeof lens.mount === 'string') {
        lens.mount = lens.mount.trim();
        if (!lens.mount) {
          delete lens.mount;
        }
      }
    });
    ['monitors', 'video', 'viewfinders'].forEach(function (key) {
      applyFixPowerInput(devicesData[key]);
    });
    var fizGroups = devicesData.fiz || {};
    ['motors', 'controllers', 'distance'].forEach(function (key) {
      applyFixPowerInput(fizGroups[key]);
    });
    Object.values(((_devicesData$fiz = devicesData.fiz) === null || _devicesData$fiz === void 0 ? void 0 : _devicesData$fiz.motors) || {}).forEach(function (m) {
      if (!m) return;
      if (m.connector && !m.fizConnector) {
        m.fizConnector = m.connector;
        delete m.connector;
      }
      if (m.fizConnector) {
        m.fizConnector = normalizeFizConnectorType(m.fizConnector);
      }
    });
    Object.values(((_devicesData$fiz2 = devicesData.fiz) === null || _devicesData$fiz2 === void 0 ? void 0 : _devicesData$fiz2.controllers) || {}).forEach(function (c) {
      if (!c) return;
      if (c.FIZ_connector && !c.fizConnector && !c.fizConnectors) {
        c.fizConnector = c.FIZ_connector;
        delete c.FIZ_connector;
      }
      if (Array.isArray(c.fizConnectors)) {
        c.fizConnectors = c.fizConnectors.map(function (fc) {
          if (!fc) return {
            type: ''
          };
          var type = normalizeFizConnectorType(fc.type || fc);
          var notes = fc.notes || undefined;
          return notes ? {
            type: type,
            notes: notes
          } : {
            type: type
          };
        });
      } else if (c.fizConnector) {
        var parts = String(c.fizConnector).split(',').map(function (s) {
          return s.trim();
        }).filter(Boolean);
        c.fizConnectors = parts.map(function (p) {
          return {
            type: normalizeFizConnectorType(p)
          };
        });
        delete c.fizConnector;
      } else {
        c.fizConnectors = [];
      }
    });
    markDevicesNormalized(devicesData);
    return devicesData;
  }
  function normalizeDevicesForPersistence(devicesData) {
    return unifyDevices(devicesData, {
      force: true
    });
  }
  globalScope.cineDeviceNormalization = {
    unifyDevices: unifyDevices,
    normalizeDevicesForPersistence: normalizeDevicesForPersistence,
    markDevicesNormalized: markDevicesNormalized,
    hasNormalizedDevicesMarker: hasNormalizedDevicesMarker,
    fixPowerInput: fixPowerInput,
    normalizeVideoType: normalizeVideoType,
    normalizeFizConnectorType: normalizeFizConnectorType,
    normalizeViewfinderType: normalizeViewfinderType,
    normalizePowerPortType: normalizePowerPortType
  };
  globalScope.unifyDevices = unifyDevices;
  globalScope.normalizeDevicesForPersistence = normalizeDevicesForPersistence;
  globalScope.markDevicesNormalized = markDevicesNormalized;
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = globalScope.cineDeviceNormalization;
  }
})();