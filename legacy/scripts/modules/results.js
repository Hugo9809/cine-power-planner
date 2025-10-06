function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function () {
  function detectScope() {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof window !== 'undefined') return window;
    if (typeof self !== 'undefined') return self;
    if (typeof global !== 'undefined') return global;
    return {};
  }
  var scope = detectScope();
  var elementCache = new Map();
  var runtimeFeedbackDefaults = {
    loadFeedback: null,
    saveFeedback: null,
    onAfterDelete: null,
    texts: null,
    currentLang: null,
    devices: null,
    cameraSelect: null,
    monitorSelect: null,
    videoSelect: null,
    distanceSelect: null,
    motorSelects: null,
    controllerSelects: null
  };
  function resolveElement(cacheKey, provided, fallbackId) {
    if (provided) {
      elementCache.set(cacheKey, provided);
      return provided;
    }
    if (elementCache.has(cacheKey)) {
      return elementCache.get(cacheKey);
    }
    if (!fallbackId || typeof document === 'undefined') {
      return null;
    }
    var element = document.getElementById(fallbackId);
    if (element) {
      elementCache.set(cacheKey, element);
    }
    return element || null;
  }
  function formatPower(value) {
    if (!Number.isFinite(value)) return '0.0';
    return value.toFixed(1);
  }
  function formatCurrent(value) {
    if (!Number.isFinite(value)) return '0.00';
    return value.toFixed(2);
  }
  function formatRuntimeDisplay(hours) {
    if (hours === null || typeof hours === 'undefined') return '–';
    if (hours === Infinity) return '∞';
    if (!Number.isFinite(hours)) return '–';
    return hours.toFixed(2);
  }
  function updateResultsSection() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _options$breakdown = options.breakdown,
      breakdown = _options$breakdown === void 0 ? [] : _options$breakdown,
      _options$totals = options.totals,
      totals = _options$totals === void 0 ? {} : _options$totals,
      _options$currents = options.currents,
      currents = _options$currents === void 0 ? {} : _options$currents,
      _options$runtime = options.runtime,
      runtime = _options$runtime === void 0 ? {} : _options$runtime,
      _options$elements = options.elements,
      elements = _options$elements === void 0 ? {} : _options$elements,
      texts = options.texts,
      currentLang = options.currentLang;
    var breakdownElem = resolveElement('breakdown', elements.breakdown, 'breakdownList');
    var totalPowerElem = resolveElement('totalPower', elements.totalPower, 'totalPower');
    var totalCurrentHighElem = resolveElement('totalCurrentHigh', elements.totalCurrentHigh, 'totalCurrent144');
    var totalCurrentLowElem = resolveElement('totalCurrentLow', elements.totalCurrentLow, 'totalCurrent12');
    var batteryLifeElem = resolveElement('batteryLife', elements.batteryLife, 'batteryLife');
    var batteryLifeLabelElem = resolveElement('batteryLifeLabel', elements.batteryLifeLabel, 'batteryLifeLabel');
    var runtimeAverageNoteElem = resolveElement('runtimeAverageNote', elements.runtimeAverageNote, 'runtimeAverageNote');
    var batteryCountElem = resolveElement('batteryCount', elements.batteryCount, 'batteryCount');
    if (breakdownElem && typeof breakdownElem.innerHTML !== 'undefined') {
      breakdownElem.innerHTML = '';
      if (Array.isArray(breakdown) && breakdown.length) {
        breakdown.forEach(function (entry) {
          if (!entry || !Number.isFinite(entry.power) || entry.power <= 0) return;
          var li = document.createElement('li');
          var strong = document.createElement('strong');
          strong.textContent = entry.label || '';
          li.appendChild(strong);
          li.appendChild(document.createTextNode(" ".concat(formatPower(entry.power), " W")));
          breakdownElem.appendChild(li);
        });
      }
    }
    if (totalPowerElem) {
      totalPowerElem.textContent = formatPower(totals.totalWatt);
    }
    if (totalCurrentHighElem) {
      totalCurrentHighElem.textContent = formatCurrent(currents.high);
    }
    if (totalCurrentLowElem) {
      totalCurrentLowElem.textContent = formatCurrent(currents.low);
    }
    if (batteryLifeElem) {
      var displayText = typeof runtime.displayText === 'string' ? runtime.displayText : formatRuntimeDisplay(runtime.hours);
      batteryLifeElem.textContent = displayText;
    }
    if (batteryCountElem && typeof runtime.batteryCountDisplay !== 'undefined') {
      batteryCountElem.textContent = runtime.batteryCountDisplay;
    }
    if (batteryLifeLabelElem) {
      var labelText = runtime.batteryLifeLabelText || runtime.defaultBatteryLifeLabel || '';
      if (labelText) {
        batteryLifeLabelElem.textContent = labelText;
      }
      if (runtime.batteryLifeHelp && typeof batteryLifeLabelElem.setAttribute === 'function') {
        batteryLifeLabelElem.setAttribute('data-help', runtime.batteryLifeHelp);
      } else if (texts && currentLang && texts[currentLang] && texts[currentLang].batteryLifeHelp && typeof batteryLifeLabelElem.setAttribute === 'function') {
        batteryLifeLabelElem.setAttribute('data-help', texts[currentLang].batteryLifeHelp);
      }
    }
    if (runtimeAverageNoteElem) {
      runtimeAverageNoteElem.textContent = runtime.runtimeAverageNoteText || '';
    }
  }
  function configureRuntimeFeedback() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (options.loadFeedback) runtimeFeedbackDefaults.loadFeedback = options.loadFeedback;
    if (options.saveFeedback) runtimeFeedbackDefaults.saveFeedback = options.saveFeedback;
    if (options.onAfterDelete) runtimeFeedbackDefaults.onAfterDelete = options.onAfterDelete;
    if (options.texts) runtimeFeedbackDefaults.texts = options.texts;
    if (options.currentLang) runtimeFeedbackDefaults.currentLang = options.currentLang;
    if (options.devices) runtimeFeedbackDefaults.devices = options.devices;
    if (options.cameraSelect) runtimeFeedbackDefaults.cameraSelect = options.cameraSelect;
    if (options.monitorSelect) runtimeFeedbackDefaults.monitorSelect = options.monitorSelect;
    if (options.videoSelect) runtimeFeedbackDefaults.videoSelect = options.videoSelect;
    if (options.distanceSelect) runtimeFeedbackDefaults.distanceSelect = options.distanceSelect;
    if (options.motorSelects) runtimeFeedbackDefaults.motorSelects = options.motorSelects;
    if (options.controllerSelects) runtimeFeedbackDefaults.controllerSelects = options.controllerSelects;
  }
  function getConfigValue(options, key, fallback) {
    if (options && typeof options[key] !== 'undefined') {
      return options[key];
    }
    if (typeof runtimeFeedbackDefaults[key] !== 'undefined' && runtimeFeedbackDefaults[key] !== null) {
      return runtimeFeedbackDefaults[key];
    }
    return fallback;
  }
  function renderRuntimeFeedbackTable(currentKey) {
    var _devices$cameras, _devices$monitors, _devices$video, _devices$fiz3, _devices$monitors2, _texts$currentLang, _texts$en;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!currentKey) return null;
    var loadFeedback = getConfigValue(options, 'loadFeedback', function () {
      return {};
    });
    var saveFeedback = getConfigValue(options, 'saveFeedback', function () {});
    var onAfterDelete = getConfigValue(options, 'onAfterDelete', null);
    var texts = options.texts || runtimeFeedbackDefaults.texts || scope.texts || {};
    var currentLang = options.currentLang || runtimeFeedbackDefaults.currentLang || scope.currentLang || 'en';
    var devices = options.devices || runtimeFeedbackDefaults.devices || scope.devices || {};
    var cameraSelect = options.cameraSelect || runtimeFeedbackDefaults.cameraSelect || scope.cameraSelect;
    var monitorSelect = options.monitorSelect || runtimeFeedbackDefaults.monitorSelect || scope.monitorSelect;
    var videoSelect = options.videoSelect || runtimeFeedbackDefaults.videoSelect || scope.videoSelect;
    var distanceSelect = options.distanceSelect || runtimeFeedbackDefaults.distanceSelect || scope.distanceSelect;
    var motorSelects = options.motorSelects || runtimeFeedbackDefaults.motorSelects || scope.motorSelects || [];
    var controllerSelects = options.controllerSelects || runtimeFeedbackDefaults.controllerSelects || scope.controllerSelects || [];
    var container = typeof document !== 'undefined' ? options.container || document.getElementById('feedbackTableContainer') : null;
    var table = typeof document !== 'undefined' ? options.table || document.getElementById('userFeedbackTable') : null;
    var feedbackData = typeof loadFeedback === 'function' ? loadFeedback() : {};
    var entries = (feedbackData[currentKey] || []).map(function (entry) {
      var rest = _objectSpread({}, entry);
      delete rest.location;
      return rest;
    });
    if (!entries.length) {
      if (table) {
        table.innerHTML = '';
        if (table.classList && typeof table.classList.add === 'function') {
          table.classList.add('hidden');
        }
      }
      if (container && container.classList && typeof container.classList.add === 'function') {
        container.classList.add('hidden');
      }
      return null;
    }
    var columns = [{
      key: 'username',
      label: 'User'
    }, {
      key: 'date',
      label: 'Date'
    }, {
      key: 'cameraWifi',
      label: 'WIFI'
    }, {
      key: 'resolution',
      label: 'Res'
    }, {
      key: 'codec',
      label: 'Codec'
    }, {
      key: 'framerate',
      label: 'FPS'
    }, {
      key: 'firmware',
      label: 'Firmware'
    }, {
      key: 'batteryAge',
      label: 'Battery Age'
    }, {
      key: 'monitorBrightness',
      label: 'Monitor Brightness'
    }, {
      key: 'temperature',
      label: 'temp'
    }, {
      key: 'charging',
      label: 'Charging'
    }, {
      key: 'runtime',
      label: 'runtime'
    }, {
      key: 'batteriesPerDay',
      label: 'batteries a day'
    }, {
      key: 'weighting',
      label: 'weight'
    }];
    var parseResolution = function parseResolution(str) {
      if (!str) return null;
      var s = String(str).toLowerCase();
      var kMatch = s.match(/(\d+(?:\.\d+)?)\s*k/);
      if (kMatch) return parseFloat(kMatch[1]) * 1000;
      var pMatch = s.match(/(\d{3,4})p/);
      if (pMatch) return parseInt(pMatch[1], 10);
      var xMatch = s.match(/x\s*(\d{3,4})/);
      if (xMatch) return parseInt(xMatch[1], 10);
      var numMatch = s.match(/(\d{3,4})/);
      return numMatch ? parseInt(numMatch[1], 10) : null;
    };
    var parseFramerate = function parseFramerate(str) {
      if (!str) return null;
      var m = String(str).match(/\d+(?:\.\d+)?/);
      return m ? parseFloat(m[0]) : null;
    };
    var tempFactor = function tempFactor(temp) {
      if (Number.isNaN(temp)) return 1;
      if (temp >= 25) return 1;
      if (temp >= 0) return 1 + (25 - temp) * 0.01;
      if (temp >= -10) return 1.25 + -temp * 0.035;
      if (temp >= -20) return 1.6 + (-10 - temp) * 0.04;
      return 2;
    };
    var selectedCamera = cameraSelect && typeof cameraSelect.value === 'string' ? cameraSelect.value : '';
    var selectedMonitor = monitorSelect && typeof monitorSelect.value === 'string' ? monitorSelect.value : '';
    var selectedVideo = videoSelect && typeof videoSelect.value === 'string' ? videoSelect.value : '';
    var selectedDistance = distanceSelect && typeof distanceSelect.value === 'string' ? distanceSelect.value : '';
    var camPower = (devices === null || devices === void 0 || (_devices$cameras = devices.cameras) === null || _devices$cameras === void 0 || (_devices$cameras = _devices$cameras[selectedCamera]) === null || _devices$cameras === void 0 ? void 0 : _devices$cameras.powerDrawWatts) || 0;
    var monitorPower = (devices === null || devices === void 0 || (_devices$monitors = devices.monitors) === null || _devices$monitors === void 0 || (_devices$monitors = _devices$monitors[selectedMonitor]) === null || _devices$monitors === void 0 ? void 0 : _devices$monitors.powerDrawWatts) || 0;
    var videoPower = (devices === null || devices === void 0 || (_devices$video = devices.video) === null || _devices$video === void 0 || (_devices$video = _devices$video[selectedVideo]) === null || _devices$video === void 0 ? void 0 : _devices$video.powerDrawWatts) || 0;
    var motorPower = Array.from(motorSelects || []).reduce(function (sum, sel) {
      var _devices$fiz;
      return sum + ((devices === null || devices === void 0 || (_devices$fiz = devices.fiz) === null || _devices$fiz === void 0 || (_devices$fiz = _devices$fiz.motors) === null || _devices$fiz === void 0 || (_devices$fiz = _devices$fiz[sel === null || sel === void 0 ? void 0 : sel.value]) === null || _devices$fiz === void 0 ? void 0 : _devices$fiz.powerDrawWatts) || 0);
    }, 0);
    var controllerPower = Array.from(controllerSelects || []).reduce(function (sum, sel) {
      var _devices$fiz2;
      return sum + ((devices === null || devices === void 0 || (_devices$fiz2 = devices.fiz) === null || _devices$fiz2 === void 0 || (_devices$fiz2 = _devices$fiz2.controllers) === null || _devices$fiz2 === void 0 || (_devices$fiz2 = _devices$fiz2[sel === null || sel === void 0 ? void 0 : sel.value]) === null || _devices$fiz2 === void 0 ? void 0 : _devices$fiz2.powerDrawWatts) || 0);
    }, 0);
    var distancePower = (devices === null || devices === void 0 || (_devices$fiz3 = devices.fiz) === null || _devices$fiz3 === void 0 || (_devices$fiz3 = _devices$fiz3.distance) === null || _devices$fiz3 === void 0 || (_devices$fiz3 = _devices$fiz3[selectedDistance]) === null || _devices$fiz3 === void 0 ? void 0 : _devices$fiz3.powerDrawWatts) || 0;
    var otherPower = videoPower + motorPower + controllerPower + distancePower;
    var totalPower = camPower + monitorPower + otherPower;
    var specBrightness = devices === null || devices === void 0 || (_devices$monitors2 = devices.monitors) === null || _devices$monitors2 === void 0 || (_devices$monitors2 = _devices$monitors2[selectedMonitor]) === null || _devices$monitors2 === void 0 ? void 0 : _devices$monitors2.brightnessNits;
    var weightedSum = 0;
    var weightTotal = 0;
    var count = 0;
    var breakdown = entries.map(function (e) {
      var rt = parseFloat(e.runtime);
      if (Number.isNaN(rt)) return null;
      var camFactor = 1;
      var monitorFactor = 1;
      var res = parseResolution(e.resolution);
      if (res) camFactor *= function () {
        if (res >= 12000) return 3;
        if (res >= 8000) return 2;
        if (res >= 4000) return 1.5;
        if (res >= 1080) return 1;
        return res / 1080;
      }();
      var fps = parseFramerate(e.framerate);
      if (fps) camFactor *= fps / 24;
      var wifi = (e.cameraWifi || '').toLowerCase();
      if (wifi.includes('on')) camFactor *= 1.1;
      var codec = e.codec;
      if (codec) {
        var c = String(codec).toLowerCase();
        if (/(prores\s*raw|braw|arriraw|r3d|redcode|cinema\s*dng|cdng|canon\s*raw|x-ocn|raw)/.test(c)) {
          camFactor *= 1;
        } else if (/prores/.test(c)) {
          camFactor *= 1.1;
        } else if (/dnx|avid/.test(c)) {
          camFactor *= 1.2;
        } else if (/\ball[\s-]?i\b|all\s*intra|intra/.test(c)) {
          camFactor *= 1.3;
        } else if (/h265|h\.265|hevc|xavc\s*hs|xhevc/.test(c)) {
          camFactor *= 1.7;
        } else if (/h264|h\.264|avc|xavc|avchd|mpeg-4/.test(c)) {
          camFactor *= 1.5;
        }
      }
      var entryBrightness = parseFloat(e.monitorBrightness);
      if (!Number.isNaN(entryBrightness) && specBrightness) {
        var ratio = entryBrightness / specBrightness;
        if (ratio < 1) monitorFactor *= ratio;
      }
      var weight = 1;
      if (totalPower > 0) {
        weight = (camFactor * camPower + monitorFactor * monitorPower + otherPower) / totalPower;
      }
      var temp = parseFloat(e.temperature);
      var tempMul = tempFactor(temp);
      var adjustedRuntime = rt * tempMul;
      weightedSum += adjustedRuntime * weight;
      weightTotal += weight;
      count++;
      return {
        temperature: tempMul,
        resolution: res ? function () {
          if (res >= 12000) return 3;
          if (res >= 8000) return 2;
          if (res >= 4000) return 1.5;
          if (res >= 1080) return 1;
          return res / 1080;
        }() : 1,
        framerate: fps ? fps / 24 : 1,
        wifi: wifi.includes('on') ? 1.1 : 1,
        codec: codec ? function () {
          var c = String(codec).toLowerCase();
          if (/(prores\s*raw|braw|arriraw|r3d|redcode|cinema\s*dng|cdng|canon\s*raw|x-ocn|raw)/.test(c)) return 1;
          if (/prores/.test(c)) return 1.1;
          if (/dnx|avid/.test(c)) return 1.2;
          if (/\ball[\s-]?i\b|all\s*intra|intra/.test(c)) return 1.3;
          if (/h265|h\.265|hevc|xavc\s*hs|xhevc/.test(c)) return 1.7;
          if (/h264|h\.264|avc|xavc|avchd|mpeg-4/.test(c)) return 1.5;
          return 1;
        }() : 1,
        monitor: monitorFactor,
        weight: weight
      };
    });
    if (!table) {
      return count >= 3 && weightTotal > 0 ? {
        runtime: weightedSum / weightTotal,
        count: count,
        weight: weightTotal
      } : null;
    }
    var html = '<tr>' + columns.map(function (c) {
      return "<th>".concat(typeof escapeHtml === 'function' ? escapeHtml(c.label) : c.label, "</th>");
    }).join('') + '<th></th></tr>';
    var deleteFeedbackLabel = ((_texts$currentLang = texts[currentLang]) === null || _texts$currentLang === void 0 ? void 0 : _texts$currentLang.deleteSetupBtn) || ((_texts$en = texts.en) === null || _texts$en === void 0 ? void 0 : _texts$en.deleteSetupBtn) || 'Delete';
    var maxWeight = Math.max.apply(Math, _toConsumableArray(breakdown.filter(Boolean).map(function (b) {
      return b.weight;
    })).concat([0]));
    entries.forEach(function (entry, index) {
      html += '<tr>';
      columns.forEach(function (c) {
        if (c.key === 'weighting') {
          var b = breakdown[index];
          if (b) {
            var percent = maxWeight ? b.weight / maxWeight * 100 : 0;
            var share = b.weight * 100;
            var tooltip = "Temp \xD7".concat(b.temperature.toFixed(2), "\n") + "Res \xD7".concat(b.resolution.toFixed(2), "\n") + "FPS \xD7".concat(b.framerate.toFixed(2), "\n") + "Codec \xD7".concat(b.codec.toFixed(2), "\n") + "Wi-Fi \xD7".concat(b.wifi.toFixed(2), "\n") + "Monitor \xD7".concat(b.monitor.toFixed(2), "\n") + "Share ".concat(share.toFixed(1), "%");
            var esc = typeof escapeHtml === 'function' ? escapeHtml : String;
            html += "<td><div class=\"weightingRow\"><div class=\"barContainer\"><div class=\"weightBar\" style=\"width:".concat(percent, "%\" title=\"").concat(esc(tooltip), "\"></div></div><span class=\"weightingPercent\">").concat(share.toFixed(1), "%</span></div></td>");
          } else {
            html += '<td></td>';
          }
        } else if (c.key === 'date') {
          var value = typeof formatDateString === 'function' ? formatDateString(entry[c.key]) : entry[c.key];
          var _esc = typeof escapeHtml === 'function' ? escapeHtml : String;
          html += "<td>".concat(_esc(value || ''), "</td>");
        } else {
          var _esc2 = typeof escapeHtml === 'function' ? escapeHtml : String;
          html += "<td>".concat(_esc2(entry[c.key] || ''), "</td>");
        }
      });
      var icon = typeof iconMarkup === 'function' ? iconMarkup(scope.ICON_GLYPHS ? scope.ICON_GLYPHS.trash : null, 'btn-icon') : '';
      html += "<td><button data-key=\"".concat(encodeURIComponent(currentKey), "\" data-index=\"").concat(index, "\" class=\"deleteFeedbackBtn\">").concat(icon).concat(typeof escapeHtml === 'function' ? escapeHtml(deleteFeedbackLabel) : deleteFeedbackLabel, "</button></td>");
      html += '</tr>';
    });
    table.innerHTML = html;
    if (table.classList && typeof table.classList.remove === 'function') {
      table.classList.remove('hidden');
    }
    if (container && container.classList && typeof container.classList.remove === 'function') {
      container.classList.remove('hidden');
    }
    var buttons = table.querySelectorAll('.deleteFeedbackBtn');
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-label', deleteFeedbackLabel);
      btn.setAttribute('title', deleteFeedbackLabel);
      btn.addEventListener('click', function () {
        var key = decodeURIComponent(btn.dataset.key || '');
        var idx = parseInt(btn.dataset.index || '0', 10);
        if (typeof loadFeedback !== 'function' || typeof saveFeedback !== 'function') {
          return;
        }
        var data = loadFeedback();
        if (data[key]) {
          data[key].splice(idx, 1);
          if (!data[key].length) {
            delete data[key];
          }
          saveFeedback(data);
          if (typeof onAfterDelete === 'function') {
            try {
              onAfterDelete();
            } catch (error) {
              if (scope.console && typeof scope.console.error === 'function') {
                console.error('Failed to refresh results after deleting runtime feedback', error);
              }
            }
          }
        }
      });
    });
    if (count >= 3 && weightTotal > 0) {
      return {
        runtime: weightedSum / weightTotal,
        count: count,
        weight: weightTotal
      };
    }
    return null;
  }
  scope.cineResults = scope.cineResults || {};
  scope.cineResults.updateResultsSection = updateResultsSection;
  scope.cineResults.renderRuntimeFeedbackTable = renderRuntimeFeedbackTable;
  scope.cineResults.configureRuntimeFeedback = configureRuntimeFeedback;
})();
