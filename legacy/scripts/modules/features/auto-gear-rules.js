function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return {};
  }
  var GLOBAL_SCOPE = detectGlobalScope();
  function resolveModuleBase(scope) {
    if ((typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase) {
      return cineModuleBase;
    }
    if (typeof require === 'function') {
      try {
        var required = require('../base.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    if (scope && _typeof(scope.cineModuleBase) === 'object') {
      return scope.cineModuleBase;
    }
    return null;
  }
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }
  var freezeDeep = typeof MODULE_BASE.freezeDeep === 'function' ? MODULE_BASE.freezeDeep : function fallbackFreezeDeep(value) {
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return value;
    }
    var seen = new WeakSet();
    function freeze(target) {
      if (!target || _typeof(target) !== 'object' && typeof target !== 'function') {
        return target;
      }
      if (seen.has(target)) {
        return target;
      }
      seen.add(target);
      try {
        var keys = Object.getOwnPropertyNames(target);
        for (var index = 0; index < keys.length; index += 1) {
          var key = keys[index];
          var descriptor = Object.getOwnPropertyDescriptor(target, key);
          if (!descriptor || descriptor.get || descriptor.set) {
            continue;
          }
          freeze(descriptor.value);
        }
        Object.freeze(target);
      } catch (error) {
        void error;
      }
      return target;
    }
    return freeze(value);
  };
  var exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function' ? function expose(name, value, options) {
    return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options || {});
  } : function fallbackExpose(name, value) {
    try {
      GLOBAL_SCOPE[name] = value;
      return true;
    } catch (error) {
      void error;
      return false;
    }
  };
  var moduleRegistry = typeof MODULE_BASE.getModuleRegistry === 'function' ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE) : null;
  var registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function' ? function register(name, api, options, onError) {
    return MODULE_BASE.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, moduleRegistry);
  } : function fallbackRegister() {
    return false;
  };
  var factoryAutoGearRulesSnapshot = null;
  var factoryAutoGearSeedContext = null;
  function cloneAutoGearItems(items) {
    return items.map(function (item) {
      var normalized = normalizeAutoGearItem(item);
      if (!normalized) return null;
      return _objectSpread({}, normalized);
    }).filter(Boolean);
  }
  function cloneAutoGearRuleItem(item) {
    if (!item || _typeof(item) !== 'object') {
      return {
        id: '',
        name: '',
        category: '',
        quantity: 0,
        screenSize: '',
        selectorType: 'none',
        selectorDefault: '',
        selectorEnabled: false,
        notes: '',
        contextNotes: []
      };
    }
    return {
      id: typeof item.id === 'string' ? item.id : '',
      name: typeof item.name === 'string' ? item.name : '',
      category: typeof item.category === 'string' ? item.category : '',
      quantity: normalizeAutoGearQuantity(item.quantity),
      screenSize: typeof item.screenSize === 'string' ? item.screenSize : '',
      selectorType: typeof item.selectorType === 'string' ? item.selectorType : 'none',
      selectorDefault: typeof item.selectorDefault === 'string' ? item.selectorDefault : '',
      selectorEnabled: !!item.selectorEnabled,
      notes: typeof item.notes === 'string' ? item.notes : '',
      contextNotes: Array.isArray(item.contextNotes) ? item.contextNotes.filter(Boolean) : []
    };
  }
  function cloneAutoGearRule(rule) {
    if (!rule || _typeof(rule) !== 'object') return null;
    return {
      id: typeof rule.id === 'string' ? rule.id : '',
      label: typeof rule.label === 'string' ? rule.label : '',
      always: Boolean(rule.always),
      scenarios: Array.isArray(rule.scenarios) ? rule.scenarios.slice() : [],
      mattebox: Array.isArray(rule.mattebox) ? rule.mattebox.slice() : [],
      cameraHandle: Array.isArray(rule.cameraHandle) ? rule.cameraHandle.slice() : [],
      viewfinderExtension: Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.slice() : [],
      videoDistribution: Array.isArray(rule.videoDistribution) ? rule.videoDistribution.slice() : [],
      camera: Array.isArray(rule.camera) ? rule.camera.slice() : [],
      monitor: Array.isArray(rule.monitor) ? rule.monitor.slice() : [],
      tripodHeadBrand: Array.isArray(rule.tripodHeadBrand) ? rule.tripodHeadBrand.slice() : [],
      tripodBowl: Array.isArray(rule.tripodBowl) ? rule.tripodBowl.slice() : [],
      tripodTypes: Array.isArray(rule.tripodTypes) ? rule.tripodTypes.slice() : [],
      tripodSpreader: Array.isArray(rule.tripodSpreader) ? rule.tripodSpreader.slice() : [],
      crewPresent: Array.isArray(rule.crewPresent) ? rule.crewPresent.slice() : [],
      crewAbsent: Array.isArray(rule.crewAbsent) ? rule.crewAbsent.slice() : [],
      wireless: Array.isArray(rule.wireless) ? rule.wireless.slice() : [],
      motors: Array.isArray(rule.motors) ? rule.motors.slice() : [],
      controllers: Array.isArray(rule.controllers) ? rule.controllers.slice() : [],
      distance: Array.isArray(rule.distance) ? rule.distance.slice() : [],
      shootingDays: normalizeAutoGearShootingDaysCondition(rule.shootingDays),
      add: Array.isArray(rule.add) ? rule.add.map(cloneAutoGearRuleItem) : [],
      remove: Array.isArray(rule.remove) ? rule.remove.map(cloneAutoGearRuleItem) : []
    };
  }
  function cloneAutoGearRules(rules) {
    return Array.isArray(rules) ? rules.map(cloneAutoGearRule).filter(Boolean) : [];
  }
  function setFactoryAutoGearRulesSnapshot(rules) {
    if (!Array.isArray(rules)) {
      factoryAutoGearRulesSnapshot = null;
      return;
    }
    factoryAutoGearRulesSnapshot = cloneAutoGearRules(rules);
  }
  function subtractScenarioContributions(diff, scenarioKeys, scenarioDiffMap) {
    var adjust = function adjust(items, type) {
      return items.map(function (item) {
        var remaining = normalizeAutoGearQuantity(item.quantity);
        scenarioKeys.forEach(function (key) {
          var scenarioDiff = scenarioDiffMap.get(key);
          if (!scenarioDiff) return;
          var match = scenarioDiff[type].find(function (entry) {
            return entry.name === item.name && entry.category === item.category;
          });
          if (match) {
            remaining -= normalizeAutoGearQuantity(match.quantity);
          }
        });
        remaining = Math.max(remaining, 0);
        if (remaining <= 0) return null;
        var normalized = normalizeAutoGearItem(item);
        if (!normalized) return null;
        return _objectSpread(_objectSpread({}, normalized), {}, {
          quantity: remaining
        });
      }).filter(Boolean);
    };
    return {
      add: adjust(diff.add, 'add'),
      remove: adjust(diff.remove, 'remove')
    };
  }
  function extractAutoGearSelections(value) {
    if (typeof value !== 'string') return [];
    return value.split(',').map(function (part) {
      return part.trim();
    }).filter(Boolean);
  }
  function buildCameraHandleAutoRules(baseInfo, baselineMap) {
    if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
      return [];
    }
    var selections = extractAutoGearSelections(baseInfo && baseInfo.cameraHandle);
    var selectionSet = new Set(selections);
    var optionValues = [];
    if (typeof document !== 'undefined') {
      var handleSelect = document.getElementById('cameraHandle');
      if (handleSelect) {
        Array.from(handleSelect.options || []).forEach(function (option) {
          var value = typeof option.value === 'string' ? option.value.trim() : '';
          if (value) optionValues.push(value);
        });
      }
    }
    var candidates = Array.from(new Set(selections.concat(optionValues).map(function (value) {
      return typeof value === 'string' ? value.trim() : '';
    }).filter(Boolean)));
    if (!candidates.length) return [];
    var rules = [];
    candidates.forEach(function (candidate) {
      var trimmed = candidate.trim();
      if (!trimmed) return;
      var variantHandles;
      var diff;
      if (selectionSet.has(trimmed)) {
        variantHandles = selections.filter(function (value) {
          return value !== trimmed;
        });
        var variantInfo = _objectSpread(_objectSpread({}, baseInfo), {}, {
          cameraHandle: variantHandles.join(', ')
        });
        var variantHtml = generateGearListHtml(_objectSpread(_objectSpread({}, variantInfo), {}, {
          requiredScenarios: ''
        }));
        var variantMap = parseGearTableForAutoRules(variantHtml);
        if (!variantMap) return;
        diff = diffGearTableMaps(variantMap, baselineMap);
      } else {
        variantHandles = selections.slice();
        variantHandles.push(trimmed);
        var _variantInfo = _objectSpread(_objectSpread({}, baseInfo), {}, {
          cameraHandle: variantHandles.join(', ')
        });
        var _variantHtml = generateGearListHtml(_objectSpread(_objectSpread({}, _variantInfo), {}, {
          requiredScenarios: ''
        }));
        var _variantMap = parseGearTableForAutoRules(_variantHtml);
        if (!_variantMap) return;
        diff = diffGearTableMaps(baselineMap, _variantMap);
      }
      if (!diff || !diff.add.length && !diff.remove.length) return;
      var additions = cloneAutoGearItems(diff.add);
      if (!additions.length) return;
      var removals = cloneAutoGearItems(diff.remove);
      rules.push({
        id: generateAutoGearId('rule'),
        label: trimmed,
        scenarios: [],
        mattebox: [],
        cameraHandle: [trimmed],
        viewfinderExtension: [],
        videoDistribution: [],
        add: additions,
        remove: removals
      });
    });
    return rules;
  }
  function buildViewfinderExtensionAutoRules(baseInfo, baselineMap) {
    if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
      return [];
    }
    var selections = extractAutoGearSelections(baseInfo && baseInfo.viewfinderExtension);
    if (!selections.length) return [];
    var uniqueSelections = Array.from(new Set(selections));
    var rules = [];
    uniqueSelections.forEach(function (selection) {
      var trimmed = selection.trim();
      if (!trimmed) return;
      var remainingSelections = selections.filter(function (value) {
        return value !== trimmed;
      });
      var variantInfo = _objectSpread(_objectSpread({}, baseInfo), {}, {
        viewfinderExtension: remainingSelections.join(', ')
      });
      var variantHtml = generateGearListHtml(_objectSpread(_objectSpread({}, variantInfo), {}, {
        requiredScenarios: ''
      }));
      var variantMap = parseGearTableForAutoRules(variantHtml);
      if (!variantMap) return;
      var diff = diffGearTableMaps(variantMap, baselineMap);
      if (!diff.add.length && !diff.remove.length) return;
      var additions = cloneAutoGearItems(diff.add);
      if (!additions.length) return;
      var removals = cloneAutoGearItems(diff.remove);
      rules.push({
        id: generateAutoGearId('rule'),
        label: getViewfinderFallbackLabel(trimmed),
        scenarios: [],
        mattebox: [],
        cameraHandle: [],
        viewfinderExtension: [trimmed],
        videoDistribution: [],
        add: additions,
        remove: removals
      });
    });
    return rules;
  }
  function buildVideoDistributionAutoRules(baseInfo, baselineMap) {
    if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
      return [];
    }
    var selections = extractAutoGearSelections(baseInfo && baseInfo.videoDistribution);
    if (!selections.length) return [];
    var uniqueSelections = Array.from(new Set(selections));
    var rules = [];
    uniqueSelections.forEach(function (selection) {
      var trimmed = selection.trim();
      if (!trimmed) return;
      var lower = trimmed.toLowerCase();
      if (lower === '__none__' || lower === 'none') return;
      var remainingSelections = selections.filter(function (value) {
        return value !== trimmed;
      });
      var variantInfo = _objectSpread(_objectSpread({}, baseInfo), {}, {
        videoDistribution: remainingSelections.join(', ')
      });
      var variantHtml = generateGearListHtml(_objectSpread(_objectSpread({}, variantInfo), {}, {
        requiredScenarios: ''
      }));
      var variantMap = parseGearTableForAutoRules(variantHtml);
      if (!variantMap) return;
      var diff = diffGearTableMaps(variantMap, baselineMap);
      if (!diff.add.length && !diff.remove.length) return;
      var additions = cloneAutoGearItems(diff.add);
      if (!additions.length) return;
      var removals = cloneAutoGearItems(diff.remove);
      rules.push({
        id: generateAutoGearId('rule'),
        label: getVideoDistributionFallbackLabel(trimmed),
        scenarios: [],
        mattebox: [],
        cameraHandle: [],
        viewfinderExtension: [],
        videoDistribution: [trimmed],
        add: additions,
        remove: removals
      });
    });
    return rules;
  }
  function buildOnboardMonitorRiggingAutoGearRules() {
    var select = typeof monitorSelect !== 'undefined' ? monitorSelect : null;
    if (!select || !select.options) {
      return [];
    }
    var monitorLabels = [];
    var seen = new Set();
    Array.from(select.options).forEach(function (option) {
      if (!option) return;
      var rawValue = typeof option.value === 'string' ? option.value.trim() : '';
      if (!rawValue || rawValue === 'None') return;
      var label = typeof option.textContent === 'string' ? option.textContent.trim() : '';
      if (!label) return;
      var normalized = normalizeAutoGearTriggerValue(label);
      if (!normalized || seen.has(normalized)) return;
      seen.add(normalized);
      monitorLabels.push(label);
    });
    if (!monitorLabels.length) {
      return [];
    }
    var monitorLabelText = (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts ? texts[currentLang] && texts[currentLang].autoGearMonitorLabel || texts.en && texts.en.autoGearMonitorLabel || 'Onboard monitors' : 'Onboard monitors';
    var contextNote = monitorLabelText;
    return [{
      id: generateAutoGearId('rule'),
      label: monitorLabelText,
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      videoDistribution: [],
      camera: [],
      monitor: monitorLabels.slice(),
      crewPresent: [],
      crewAbsent: [],
      wireless: [],
      motors: [],
      controllers: [],
      distance: [],
      add: [{
        id: generateAutoGearId('item'),
        name: 'ULCS Arm mit 3/8" und 1/4" double',
        category: 'Rigging',
        quantity: 1,
        contextNotes: [contextNote]
      }],
      remove: []
    }];
  }
  function buildTripodPreferenceAutoGearRules() {
    var baseInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var brand = typeof baseInfo.tripodHeadBrand === 'string' ? baseInfo.tripodHeadBrand.trim() : '';
    var bowl = typeof baseInfo.tripodBowl === 'string' ? baseInfo.tripodBowl.trim() : '';
    if (!brand || !bowl) return [];
    var normalizedBrand = normalizeAutoGearTriggerValue(brand);
    var normalizedBowl = normalizeAutoGearTriggerValue(bowl);
    if (!normalizedBrand || !normalizedBowl) return [];
    var combos = [{
      brand: "O'Connor",
      entries: [{
        bowl: '100mm bowl',
        item: "O'Connor Ultimate 1040 Fluid-Head 100mm bowl"
      }, {
        bowl: '150mm bowl',
        item: "O'Connor Ultimate 2560 Fluid-Head 150mm bowl"
      }, {
        bowl: 'Mitchell Mount',
        item: "O'Connor Ultimate 2560 Fluid-Head Mitchell Mount"
      }]
    }, {
      brand: 'Sachtler',
      entries: [{
        bowl: '75mm bowl',
        item: 'Sachtler aktiv8 head 75mm bowl'
      }, {
        bowl: '100mm bowl',
        item: 'Sachtler aktiv18T head 100mm bowl'
      }, {
        bowl: '150mm bowl',
        item: 'Sachtler Cine 30 head 150mm bowl'
      }, {
        bowl: 'Mitchell Mount',
        item: 'Sachtler Cine 30 head Mitchell mount'
      }]
    }];
    var matchedBrand = combos.find(function (entry) {
      return normalizeAutoGearTriggerValue(entry.brand) === normalizedBrand;
    });
    if (!matchedBrand) return [];
    var matchingEntries = matchedBrand.entries.filter(function (entry) {
      return normalizeAutoGearTriggerValue(entry.bowl) === normalizedBowl;
    });
    if (!matchingEntries.length) return [];
    return matchingEntries.map(function (entry) {
      var itemName = entry.item;
      var contextNotes = ['Tripod preferences'];
      return {
        id: generateAutoGearId('rule'),
        label: "Tripod head: ".concat(itemName),
        scenarios: [],
        mattebox: [],
        cameraHandle: [],
        viewfinderExtension: [],
        deliveryResolution: [],
        videoDistribution: [],
        camera: [],
        cameraWeight: null,
        monitor: [],
        tripodHeadBrand: [matchedBrand.brand],
        tripodBowl: [entry.bowl],
        tripodTypes: [],
        tripodSpreader: [],
        crewPresent: [],
        crewAbsent: [],
        wireless: [],
        motors: [],
        controllers: [],
        distance: [],
        shootingDays: null,
        add: [{
          id: generateAutoGearId('item'),
          name: itemName,
          category: 'Grip',
          quantity: 1,
          screenSize: '',
          selectorType: 'tripodHeadBrand',
          selectorDefault: itemName,
          selectorEnabled: true,
          notes: '',
          contextNotes: contextNotes
        }],
        remove: []
      };
    });
  }
  function buildDefaultVideoDistributionAutoGearRules() {
    var baseInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
      return [];
    }
    var select = document.getElementById('videoDistribution');
    if (!select) return [];
    var optionValues = [];
    var seen = new Set();
    Array.from(select.options || []).forEach(function (option) {
      if (!option) return;
      var rawValue = typeof option.value === 'string' ? option.value.trim() : '';
      var normalized = normalizeVideoDistributionOptionValue(rawValue);
      if (!normalized || normalized === '__none__') return;
      if (seen.has(normalized)) return;
      seen.add(normalized);
      optionValues.push(rawValue);
    });
    if (!optionValues.length) return [];
    var baseProjectInfo = _objectSpread({}, baseInfo || {});
    delete baseProjectInfo.videoDistribution;
    var emptyHtml = generateGearListHtml(_objectSpread(_objectSpread({}, baseProjectInfo), {}, {
      requiredScenarios: ''
    }));
    var emptyMap = parseGearTableForAutoRules(emptyHtml);
    if (!emptyMap) return [];
    var generatedRules = [];
    var handledTriggers = new Set();
    optionValues.forEach(function (rawValue) {
      var trimmed = typeof rawValue === 'string' ? rawValue.trim() : '';
      if (!trimmed) return;
      var normalized = normalizeVideoDistributionOptionValue(trimmed);
      if (!normalized || handledTriggers.has(normalized)) return;
      handledTriggers.add(normalized);
      var infoForSelection = _objectSpread(_objectSpread({}, baseInfo || {}), {}, {
        videoDistribution: trimmed
      });
      var selectionHtml = generateGearListHtml(_objectSpread(_objectSpread({}, infoForSelection), {}, {
        requiredScenarios: ''
      }));
      var selectionMap = parseGearTableForAutoRules(selectionHtml);
      if (!selectionMap) return;
      var diff = diffGearTableMaps(emptyMap, selectionMap);
      var additions = cloneAutoGearItems(diff.add);
      var removals = cloneAutoGearItems(diff.remove);
      if (!additions.length && !removals.length) return;
      generatedRules.push({
        id: generateAutoGearId('rule'),
        label: getVideoDistributionFallbackLabel(trimmed),
        scenarios: [],
        mattebox: [],
        cameraHandle: [],
        viewfinderExtension: [],
        videoDistribution: [trimmed],
        add: additions,
        remove: removals
      });
    });
    var hasIosOption = optionValues.some(function (value) {
      return value && value.toLowerCase() === 'ios video';
    });
    if (hasIosOption) {
      var iosLabel = optionValues.find(function (value) {
        return value && value.toLowerCase() === 'ios video';
      }) || 'IOS Video';
      var normalizedIos = normalizeAutoGearTriggerValue(iosLabel);
      var hasGeneratedIosRule = generatedRules.some(function (rule) {
        return Array.isArray(rule.videoDistribution) && rule.videoDistribution.some(function (value) {
          return normalizeAutoGearTriggerValue(value) === normalizedIos;
        });
      });
      if (!hasGeneratedIosRule) {
        var createdNames = new Set();
        var createItem = function createItem(name, category) {
          var quantity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
          if (!name || !category || quantity <= 0) return null;
          var key = "".concat(name, "|").concat(category);
          if (createdNames.has(key)) return null;
          createdNames.add(key);
          return {
            id: generateAutoGearId('item'),
            name: name,
            category: category,
            quantity: quantity,
            screenSize: '',
            selectorType: 'none',
            selectorDefault: '',
            selectorEnabled: false,
            notes: ''
          };
        };
        var additions = [];
        var iosDevices = devices && (typeof devices === "undefined" ? "undefined" : _typeof(devices)) === 'object' ? devices.iosVideo : null;
        if (iosDevices && _typeof(iosDevices) === 'object') {
          Object.keys(iosDevices).forEach(function (deviceName) {
            var item = createItem(deviceName, 'Monitoring');
            if (item) additions.push(item);
          });
        }
        if (!additions.length) {
          var fallback = createItem('Teradek - Link AX WifiRouter/Access Point', 'Monitoring');
          if (fallback) additions.push(fallback);
        }
        var pushSupport = function pushSupport(name, category) {
          var quantity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
          var item = createItem(name, category, quantity);
          if (item) additions.push(item);
        };
        pushSupport('Apple iPad Air 5 or better', 'Monitoring', 1);
        pushSupport('USB-C Charger (iOS Video)', 'Monitoring support', 2);
        pushSupport('Wi-Fi Router (iOS Video Village)', 'Monitoring support');
        if (additions.length) {
          generatedRules.push({
            id: generateAutoGearId('rule'),
            label: getVideoDistributionFallbackLabel(iosLabel),
            scenarios: [],
            mattebox: [],
            cameraHandle: [],
            viewfinderExtension: [],
            videoDistribution: [iosLabel],
            add: additions,
            remove: []
          });
        }
      }
    }
    return generatedRules;
  }
  function buildDefaultMatteboxAutoGearRules() {
    var category = 'Matte box + filter';
    var createItems = function createItems(names) {
      return names.map(function (name) {
        return {
          id: generateAutoGearId('item'),
          name: name,
          category: category,
          quantity: 1
        };
      });
    };
    return [{
      id: generateAutoGearId('rule'),
      label: 'Mattebox: Swing Away',
      scenarios: [],
      mattebox: ['Swing Away'],
      add: createItems(['ARRI LMB 4x5 Pro Set', 'ARRI LMB 19mm Studio Rod Adapter', 'ARRI LMB 4x5 / LMB-6 Tray Catcher']),
      remove: []
    }, {
      id: generateAutoGearId('rule'),
      label: 'Mattebox: Rod based',
      scenarios: [],
      mattebox: ['Rod based'],
      add: createItems(['ARRI LMB 4x5 15mm LWS Set 3-Stage', 'ARRI LMB 19mm Studio Rod Adapter', 'ARRI LMB 4x5 / LMB-6 Tray Catcher', 'ARRI LMB 4x5 Side Flags', 'ARRI LMB Flag Holders', 'ARRI LMB 4x5 Set of Mattes spherical', 'ARRI LMB Accessory Adapter', 'ARRI Anti-Reflection Frame 4x5.65']),
      remove: []
    }, {
      id: generateAutoGearId('rule'),
      label: 'Mattebox: Clamp On',
      scenarios: [],
      mattebox: ['Clamp On'],
      add: createItems(['ARRI LMB 4x5 Clamp-On (3-Stage)', 'ARRI LMB 4x5 / LMB-6 Tray Catcher', 'ARRI LMB 4x5 Side Flags', 'ARRI LMB Flag Holders', 'ARRI LMB 4x5 Set of Mattes spherical', 'ARRI LMB Accessory Adapter', 'ARRI Anti-Reflection Frame 4x5.65', 'ARRI LMB 4x5 Clamp Adapter Set Pro']),
      remove: []
    }];
  }
  function buildAutoGearAnyMotorRule() {
    if (typeof captureSetupSelectValues !== 'function') return null;
    var setupValues = captureSetupSelectValues();
    var selectedMotors = Array.isArray(setupValues === null || setupValues === void 0 ? void 0 : setupValues.motors) ? setupValues.motors.filter(function (value) {
      return typeof value === 'string' && value && value !== 'None';
    }) : [];
    if (!selectedMotors.length) return null;
    var createItem = function createItem(name, category) {
      var quantity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      if (!name || !category || quantity <= 0) return null;
      return {
        id: generateAutoGearId('item'),
        name: name,
        category: category,
        quantity: quantity,
        screenSize: '',
        selectorType: 'none',
        selectorDefault: '',
        selectorEnabled: false,
        notes: ''
      };
    };
    var additions = [];
    var pushItem = function pushItem(name, category) {
      var quantity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var item = createItem(name, category, quantity);
      if (item) additions.push(item);
    };
    pushItem('Avenger C-Stand Sliding Leg 20" (Focus)', 'Grip');
    pushItem('Steelfingers Wheel C-Stand 3er Set (Focus)', 'Grip');
    pushItem('Lite-Tite Swivel Aluminium Umbrella Adapter (Focus)', 'Grip');
    pushItem('Tennis ball', 'Grip', 3);
    pushItem('D-Tap to Mini XLR 3-pin Cable 0,3m (Focus)', 'Monitoring support', 2);
    pushItem('Ultraslim BNC Cable 0.3 m (Focus)', 'Monitoring support', 2);
    pushItem('Bebob V150micro (V-Mount) (Focus)', 'Monitoring Batteries', 3);
    if (!additions.length) return null;
    return {
      id: generateAutoGearId('rule'),
      label: 'FIZ motor support kit',
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      deliveryResolution: [],
      videoDistribution: [],
      camera: [],
      monitor: [],
      crewPresent: [],
      crewAbsent: [],
      wireless: [],
      motors: [AUTO_GEAR_ANY_MOTOR_TOKEN],
      controllers: [],
      distance: [],
      add: additions,
      remove: []
    };
  }
  function buildAlwaysAutoGearRule() {
    var createItem = function createItem(name, category) {
      var quantity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (!name || !category || quantity <= 0) return null;
      return {
        id: generateAutoGearId('item'),
        name: name,
        category: category,
        quantity: quantity,
        screenSize: typeof options.screenSize === 'string' ? options.screenSize : '',
        selectorType: typeof options.selectorType === 'string' ? options.selectorType : 'none',
        selectorDefault: typeof options.selectorDefault === 'string' ? options.selectorDefault : '',
        selectorEnabled: options.selectorEnabled === true,
        notes: typeof options.notes === 'string' ? options.notes : ''
      };
    };
    var additions = [];
    var pushItem = function pushItem(name, category, quantity, options) {
      var item = createItem(name, category, quantity, options);
      if (item) additions.push(item);
    };
    [['BNC Cable 0.5 m', 'Monitoring support', 1], ['BNC Cable 1 m', 'Monitoring support', 1], ['BNC Cable 5 m', 'Monitoring support', 1], ['BNC Cable 10 m', 'Monitoring support', 1], ['BNC Drum 25 m', 'Monitoring support', 1], ['ULCS Bracket with 1/4" to 1/4"', 'Rigging', 2], ['ULCS Bracket with 3/8" to 1/4"', 'Rigging', 2], ['Noga Arm', 'Rigging', 2], ['Mini Magic Arm', 'Rigging', 2], ['Cine Quick Release', 'Rigging', 4], ['SmallRig - Super lightweight 15mm RailBlock', 'Rigging', 1], ['Spigot with male 3/8" and 1/4"', 'Rigging', 3], ['Clapper Stick', 'Rigging', 2], ['D-Tap Splitter', 'Rigging', 2], ['Magliner Senior - with quick release mount + tripod holder + utility tray + O‘Connor-Aufhängung', 'Carts and Transportation', 1], ['Securing Straps (25mm wide)', 'Carts and Transportation', 10], ['Loading Ramp (pair, 420kg)', 'Carts and Transportation', 1], ['Ring Fitting for Airline Rails', 'Carts and Transportation', 20], ['Power Cable Drum 25-50 m', 'Power', 1], ['Power Cable 10 m', 'Power', 2], ['Power Cable 5 m', 'Power', 2], ['Power Strip', 'Power', 3], ['Power Three Way Splitter', 'Power', 3], ['PRCD-S (Portable Residual Current Device-Safety)', 'Power', 3]].forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 3),
        name = _ref2[0],
        category = _ref2[1],
        quantity = _ref2[2];
      return pushItem(name, category, quantity);
    });
    if (!additions.length) return null;
    return {
      id: generateAutoGearId('rule'),
      label: 'Always',
      always: true,
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      videoDistribution: [],
      camera: [],
      monitor: [],
      wireless: [],
      motors: [],
      controllers: [],
      distance: [],
      add: additions,
      remove: []
    };
  }
  function buildFiveDayConsumablesAutoGearRule() {
    var createItem = function createItem(name, category) {
      var quantity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (!name || !category || quantity <= 0) return null;
      return {
        id: generateAutoGearId('item'),
        name: name,
        category: category,
        quantity: quantity,
        screenSize: typeof options.screenSize === 'string' ? options.screenSize : '',
        selectorType: typeof options.selectorType === 'string' ? options.selectorType : 'none',
        selectorDefault: typeof options.selectorDefault === 'string' ? options.selectorDefault : '',
        selectorEnabled: options.selectorEnabled === true,
        notes: typeof options.notes === 'string' ? options.notes : ''
      };
    };
    var additions = [];
    var pushItem = function pushItem(name, category, quantity, options) {
      var item = createItem(name, category, quantity, options);
      if (item) additions.push(item);
    };
    pushItem('Bluestar eye leather made of microfiber oval, large', 'Consumables', 4);
    pushItem('Pro Gaff Tape', 'Consumables', 2, {
      notes: 'Primary color roll'
    });
    pushItem('Pro Gaff Tape', 'Consumables', 2, {
      notes: 'Secondary color roll'
    });
    pushItem('Clapper Stick', 'Rigging', 4);
    pushItem('Kimtech Wipes', 'Consumables', 2);
    pushItem('Sprigs Red 1/4"', 'Consumables', 1);
    if (!additions.length) return null;
    return {
      id: generateAutoGearId('rule'),
      label: 'Every 5 shooting days',
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      deliveryResolution: [],
      videoDistribution: [],
      camera: [],
      monitor: [],
      crewPresent: [],
      crewAbsent: [],
      wireless: [],
      motors: [],
      controllers: [],
      distance: [],
      shootingDays: {
        mode: 'every',
        value: 5
      },
      add: additions,
      remove: []
    };
  }
  function ensureDefaultMatteboxAutoGearRules() {
    var defaults = buildDefaultMatteboxAutoGearRules();
    if (!defaults.length) return false;
    var existingKeys = new Set(autoGearRules.map(autoGearRuleMatteboxKey).filter(Boolean));
    var additions = defaults.filter(function (rule) {
      var key = autoGearRuleMatteboxKey(rule);
      if (!key) return false;
      if (existingKeys.has(key)) return false;
      existingKeys.add(key);
      return true;
    });
    if (!additions.length) return false;
    setAutoGearRules(autoGearRules.concat(additions));
    return true;
  }
  function captureSetupSelectValues() {
    var captureList = function captureList(list) {
      return list.map(function (sel) {
        return sel && typeof sel.value === 'string' ? sel.value : '';
      });
    };
    var captured = {
      camera: cameraSelect && typeof cameraSelect.value === 'string' ? cameraSelect.value : '',
      monitor: monitorSelect && typeof monitorSelect.value === 'string' ? monitorSelect.value : '',
      video: videoSelect && typeof videoSelect.value === 'string' ? videoSelect.value : '',
      cage: cageSelect && typeof cageSelect.value === 'string' ? cageSelect.value : '',
      distance: distanceSelect && typeof distanceSelect.value === 'string' ? distanceSelect.value : '',
      battery: batterySelect && typeof batterySelect.value === 'string' ? batterySelect.value : '',
      batteryPlate: batteryPlateSelect && typeof batteryPlateSelect.value === 'string' ? batteryPlateSelect.value : '',
      hotswap: hotswapSelect && typeof hotswapSelect.value === 'string' ? hotswapSelect.value : '',
      motors: captureList(motorSelects),
      controllers: captureList(controllerSelects),
      sliderBowl: typeof getSliderBowlValue === 'function' ? getSliderBowlValue() : '',
      easyrig: typeof getEasyrigValue === 'function' ? getEasyrigValue() : ''
    };
    return finalizeCapturedSetupValues(captured);
  }
  function finalizeCapturedSetupValues(values) {
    if (!values || _typeof(values) !== 'object') {
      return values;
    }
    values.batteryPlate = normalizeBatteryPlateValue(values.batteryPlate, values.battery);
    return values;
  }
  function applySetupSelectValues(values) {
    if (!values || _typeof(values) !== 'object') return;
    if (cameraSelect) {
      setSelectValue(cameraSelect, values.camera);
      if (typeof updateBatteryPlateVisibility === 'function') {
        updateBatteryPlateVisibility();
      }
      if (typeof updateBatteryOptions === 'function') {
        updateBatteryOptions();
      }
    }
    if (batteryPlateSelect) setSelectValue(batteryPlateSelect, values.batteryPlate);
    if (values && typeof values.battery === 'string') {
      applyBatteryPlateSelectionFromBattery(values.battery, batteryPlateSelect ? batteryPlateSelect.value : '');
    }
    if (monitorSelect) setSelectValue(monitorSelect, values.monitor);
    if (videoSelect) setSelectValue(videoSelect, values.video);
    if (cageSelect) setSelectValue(cageSelect, values.cage);
    if (distanceSelect) setSelectValue(distanceSelect, values.distance);
    if (Array.isArray(values.motors)) {
      values.motors.forEach(function (val, index) {
        if (motorSelects[index]) setSelectValue(motorSelects[index], val);
      });
    }
    if (Array.isArray(values.controllers)) {
      values.controllers.forEach(function (val, index) {
        if (controllerSelects[index]) setSelectValue(controllerSelects[index], val);
      });
    }
    if (batterySelect) setSelectValue(batterySelect, values.battery);
    if (hotswapSelect) setSelectValue(hotswapSelect, values.hotswap);
    if (typeof setSliderBowlValue === 'function') setSliderBowlValue(values.sliderBowl);
    if (typeof setEasyrigValue === 'function') setEasyrigValue(values.easyrig);
  }
  function captureAutoGearSeedContext() {
    if (factoryAutoGearSeedContext) return;
    if (typeof collectProjectFormData !== 'function') return;
    var baseInfo = collectProjectFormData() || {};
    var projectDataClone;
    try {
      projectDataClone = JSON.parse(JSON.stringify(baseInfo));
    } catch (cloneError) {
      void cloneError;
      projectDataClone = _objectSpread({}, baseInfo);
    }
    var scenarioValues = requiredScenariosSelect ? Array.from(requiredScenariosSelect.options || []).map(function (opt) {
      return opt && typeof opt.value === 'string' ? opt.value : '';
    }).filter(function (value) {
      return value;
    }) : [];
    factoryAutoGearSeedContext = {
      projectFormData: projectDataClone,
      scenarioValues: scenarioValues,
      setupValues: captureSetupSelectValues()
    };
  }
  function buildAutoGearRulesFromBaseInfo(baseInfo, scenarioValues) {
    var rules = [];
    var canGenerateRules = typeof generateGearListHtml === 'function' && typeof parseGearTableForAutoRules === 'function';
    var scenarios = Array.isArray(scenarioValues) ? scenarioValues.filter(function (value) {
      return typeof value === 'string' && value;
    }) : [];
    var baselineMap = null;
    if (canGenerateRules) {
      var baselineHtml = generateGearListHtml(_objectSpread(_objectSpread({}, baseInfo), {}, {
        requiredScenarios: ''
      }));
      baselineMap = parseGearTableForAutoRules(baselineHtml);
      if (baselineMap && scenarios.length) {
        var scenarioDiffMap = new Map();
        scenarios.forEach(function (value) {
          var scenarioHtml = generateGearListHtml(_objectSpread(_objectSpread({}, baseInfo), {}, {
            requiredScenarios: value
          }));
          var scenarioMap = parseGearTableForAutoRules(scenarioHtml);
          if (!scenarioMap) return;
          var diff = diffGearTableMaps(baselineMap, scenarioMap);
          var add = cloneAutoGearItems(diff.add);
          var remove = cloneAutoGearItems(diff.remove);
          if (!add.length && !remove.length) return;
          scenarioDiffMap.set(value, {
            add: add,
            remove: remove
          });
          rules.push({
            id: generateAutoGearId('rule'),
            label: value,
            scenarios: [value],
            add: add,
            remove: remove
          });
        });
        var comboCandidates = [['Handheld', 'Easyrig'], ['Slider', 'Undersling mode']].filter(function (combo) {
          return combo.every(function (value) {
            return scenarios.includes(value);
          });
        });
        comboCandidates.forEach(function (combo) {
          var combinedLabel = combo.join(' + ');
          var scenarioHtml = generateGearListHtml(_objectSpread(_objectSpread({}, baseInfo), {}, {
            requiredScenarios: combo.join(', ')
          }));
          var scenarioMap = parseGearTableForAutoRules(scenarioHtml);
          if (!scenarioMap) return;
          var diff = diffGearTableMaps(baselineMap, scenarioMap);
          var adjusted = subtractScenarioContributions({
            add: cloneAutoGearItems(diff.add),
            remove: cloneAutoGearItems(diff.remove)
          }, combo, scenarioDiffMap);
          if (!adjusted.add.length && !adjusted.remove.length) return;
          rules.push({
            id: generateAutoGearId('rule'),
            label: combinedLabel,
            scenarios: combo.slice(),
            add: adjusted.add,
            remove: adjusted.remove
          });
        });
        var rainOverlapKeys = ['Extreme rain', 'Rain Machine'];
        var hasRainOverlap = rainOverlapKeys.every(function (key) {
          return scenarioDiffMap.has(key);
        });
        if (hasRainOverlap) {
          var overlapRemovals = [{
            name: 'Schulz Sprayoff Micro',
            quantity: 1,
            category: 'Matte box + filter'
          }, {
            name: 'Fischer RS to D-Tap cable 0,5m',
            quantity: 2,
            category: 'Rigging'
          }, {
            name: 'Spare Disc (Schulz Sprayoff Micro)',
            quantity: 1,
            category: 'Matte box + filter'
          }].map(function (entry) {
            return {
              id: generateAutoGearId('item'),
              name: entry.name,
              category: entry.category,
              quantity: entry.quantity
            };
          });
          rules.push({
            id: generateAutoGearId('rule'),
            label: 'Extreme rain + Rain Machine overlap',
            scenarios: rainOverlapKeys.slice(),
            add: [],
            remove: overlapRemovals
          });
        }
      }
    }
    if (baselineMap) {
      buildCameraHandleAutoRules(baseInfo, baselineMap).forEach(function (rule) {
        return rules.push(rule);
      });
      buildViewfinderExtensionAutoRules(baseInfo, baselineMap).forEach(function (rule) {
        return rules.push(rule);
      });
      buildVideoDistributionAutoRules(baseInfo, baselineMap).forEach(function (rule) {
        return rules.push(rule);
      });
      var existingSignatures = new Set(rules.map(autoGearRuleSignature).filter(function (signature) {
        return typeof signature === 'string' && signature;
      }));
      var appendUniqueRules = function appendUniqueRules(additionalRules) {
        if (!Array.isArray(additionalRules) || !additionalRules.length) {
          return;
        }
        additionalRules.forEach(function (rule) {
          var signature = autoGearRuleSignature(rule);
          if (!signature || existingSignatures.has(signature)) return;
          rules.push(rule);
          existingSignatures.add(signature);
        });
      };
      appendUniqueRules(buildDefaultVideoDistributionAutoGearRules(baseInfo));
      appendUniqueRules(buildOnboardMonitorRiggingAutoGearRules());
      appendUniqueRules(buildTripodPreferenceAutoGearRules(baseInfo));
    }
    var anyMotorRule = buildAutoGearAnyMotorRule();
    if (anyMotorRule) {
      var targetSignature = autoGearRuleSignature(anyMotorRule);
      var exists = rules.some(function (rule) {
        return autoGearRuleSignature(rule) === targetSignature;
      });
      if (!exists) {
        rules.push(anyMotorRule);
      }
    }
    var alwaysRule = buildAlwaysAutoGearRule();
    if (alwaysRule) {
      rules.push(alwaysRule);
    }
    var fiveDayRule = buildFiveDayConsumablesAutoGearRule();
    if (fiveDayRule) {
      rules.push(fiveDayRule);
    }
    buildDefaultMatteboxAutoGearRules().forEach(function (rule) {
      return rules.push(rule);
    });
    return rules;
  }
  function computeFactoryAutoGearRules() {
    captureAutoGearSeedContext();
    var context = factoryAutoGearSeedContext;
    if (!context) return null;
    var previousSelectValues = captureSetupSelectValues();
    var seededBeforeCompute = hasSeededAutoGearDefaults();
    var savedAutoGearRules = autoGearRules.slice();
    var savedBaseAutoGearRules = baseAutoGearRulesState.slice();
    var savedProjectScopedRules = projectScopedAutoGearRules ? projectScopedAutoGearRules.slice() : null;
    var savedBackupSignature = autoGearRulesLastBackupSignature;
    var savedPersistedSignature = autoGearRulesLastPersistedSignature;
    var savedDirtyFlag = autoGearRulesDirtySinceBackup;
    try {
      if (seededBeforeCompute) {
        clearAutoGearDefaultsSeeded();
      }
      assignAutoGearRules([]);
      baseAutoGearRulesState = [];
      projectScopedAutoGearRules = null;
      autoGearRulesLastBackupSignature = savedBackupSignature;
      autoGearRulesLastPersistedSignature = savedPersistedSignature;
      autoGearRulesDirtySinceBackup = savedDirtyFlag;
      applySetupSelectValues(context.setupValues);
      var baseInfoSource = context.projectFormData || {};
      var baseInfo;
      try {
        baseInfo = JSON.parse(JSON.stringify(baseInfoSource));
      } catch (cloneErr) {
        void cloneErr;
        baseInfo = _objectSpread({}, baseInfoSource);
      }
      var rules = buildAutoGearRulesFromBaseInfo(baseInfo, context.scenarioValues || []);
      if (rules.length) {
        setFactoryAutoGearRulesSnapshot(rules);
      }
      return rules;
    } finally {
      applySetupSelectValues(previousSelectValues);
      assignAutoGearRules(savedAutoGearRules);
      baseAutoGearRulesState = savedBaseAutoGearRules.slice();
      projectScopedAutoGearRules = savedProjectScopedRules ? savedProjectScopedRules.slice() : null;
      autoGearRulesLastBackupSignature = savedBackupSignature;
      autoGearRulesLastPersistedSignature = savedPersistedSignature;
      autoGearRulesDirtySinceBackup = savedDirtyFlag;
      if (seededBeforeCompute) {
        markAutoGearDefaultsSeeded();
      }
    }
  }
  function seedAutoGearRulesFromCurrentProject() {
    captureAutoGearSeedContext();
    var seededBefore = hasSeededAutoGearDefaults();
    if (autoGearRules.length) {
      var addedDefaults = ensureDefaultMatteboxAutoGearRules();
      if (addedDefaults && !seededBefore) {
        markAutoGearDefaultsSeeded();
        setFactoryAutoGearRulesSnapshot(getAutoGearRules());
      } else if (!factoryAutoGearRulesSnapshot) {
        setFactoryAutoGearRulesSnapshot(getAutoGearRules());
      }
      return;
    }
    if (seededBefore) {
      var _addedDefaults = ensureDefaultMatteboxAutoGearRules();
      if (_addedDefaults && !factoryAutoGearRulesSnapshot) {
        setFactoryAutoGearRulesSnapshot(getAutoGearRules());
      }
      return;
    }
    var baseInfo = factoryAutoGearSeedContext && factoryAutoGearSeedContext.projectFormData ? _objectSpread({}, factoryAutoGearSeedContext.projectFormData) : collectProjectFormData ? collectProjectFormData() : {};
    var scenarioValues = factoryAutoGearSeedContext && Array.isArray(factoryAutoGearSeedContext.scenarioValues) ? factoryAutoGearSeedContext.scenarioValues : requiredScenariosSelect ? Array.from(requiredScenariosSelect.options || []).map(function (opt) {
      return opt && opt.value;
    }).filter(Boolean) : [];
    var rules = buildAutoGearRulesFromBaseInfo(baseInfo, scenarioValues);
    if (!rules.length) {
      var _addedDefaults2 = ensureDefaultMatteboxAutoGearRules();
      if (_addedDefaults2) {
        markAutoGearDefaultsSeeded();
        setFactoryAutoGearRulesSnapshot(getAutoGearRules());
      }
      return;
    }
    setAutoGearRules(rules);
    markAutoGearDefaultsSeeded();
    setFactoryAutoGearRulesSnapshot(rules);
  }
  function resetAutoGearRulesToFactoryAdditions() {
    var _texts$en;
    var langTexts = texts[currentLang] || texts.en || {};
    var confirmation = langTexts.autoGearResetFactoryConfirm || ((_texts$en = texts.en) === null || _texts$en === void 0 ? void 0 : _texts$en.autoGearResetFactoryConfirm) || 'Replace your automatic gear rules with the default additions?';
    if (typeof confirm === 'function' && !confirm(confirmation)) {
      return;
    }
    var backupName = ensureAutoBackupBeforeDeletion('reset automatic gear rules');
    if (!backupName) {
      return;
    }
    var fallbackTexts = texts.en || {};
    var successMessage = langTexts.autoGearResetFactoryDone || fallbackTexts.autoGearResetFactoryDone || 'Automatic gear rules restored to factory additions.';
    var emptyMessage = langTexts.autoGearResetFactoryEmpty || fallbackTexts.autoGearResetFactoryEmpty || 'Factory additions unavailable. Automatic gear rules cleared.';
    var failureMessage = langTexts.autoGearResetFactoryError || fallbackTexts.autoGearResetFactoryError || 'Reset failed. Please try again.';
    try {
      var factoryRules = computeFactoryAutoGearRules();
      if (Array.isArray(factoryRules) && factoryRules.length) {
        setAutoGearRules(factoryRules);
        markAutoGearDefaultsSeeded();
        setFactoryAutoGearRulesSnapshot(getAutoGearRules());
        if (typeof showNotification === 'function') {
          showNotification('success', successMessage);
        }
        return;
      }
      setAutoGearRules([]);
      setFactoryAutoGearRulesSnapshot(null);
      clearAutoGearDefaultsSeeded();
      var addedDefaults = ensureDefaultMatteboxAutoGearRules();
      if (addedDefaults) {
        markAutoGearDefaultsSeeded();
        setFactoryAutoGearRulesSnapshot(getAutoGearRules());
        if (typeof showNotification === 'function') {
          showNotification('success', successMessage);
        }
        return;
      }
      if (typeof showNotification === 'function') {
        showNotification('info', emptyMessage);
      }
    } catch (error) {
      console.error('Failed to reset automatic gear rules to factory additions', error);
      if (typeof showNotification === 'function') {
        showNotification('error', failureMessage);
      }
      if (backupName && typeof notifyAutoSaveFromBackup === 'function') {
        try {
          notifyAutoSaveFromBackup(failureMessage, backupName);
        } catch (notifyError) {
          console.warn('Failed to announce automatic backup after reset failure', notifyError);
        }
      }
    }
  }
  var autoGearRulesAPI = freezeDeep({
    getFactoryAutoGearRulesSnapshot: function getFactoryAutoGearRulesSnapshot() {
      return factoryAutoGearRulesSnapshot ? cloneAutoGearRules(factoryAutoGearRulesSnapshot) : null;
    },
    getFactoryAutoGearSeedContext: function getFactoryAutoGearSeedContext() {
      if (!factoryAutoGearSeedContext) {
        return null;
      }
      try {
        return JSON.parse(JSON.stringify(factoryAutoGearSeedContext));
      } catch (error) {
        void error;
        return _objectSpread({}, factoryAutoGearSeedContext);
      }
    },
    setFactoryAutoGearRulesSnapshot: setFactoryAutoGearRulesSnapshot,
    cloneAutoGearItems: cloneAutoGearItems,
    cloneAutoGearRuleItem: cloneAutoGearRuleItem,
    cloneAutoGearRule: cloneAutoGearRule,
    cloneAutoGearRules: cloneAutoGearRules,
    subtractScenarioContributions: subtractScenarioContributions,
    extractAutoGearSelections: extractAutoGearSelections,
    buildCameraHandleAutoRules: buildCameraHandleAutoRules,
    buildViewfinderExtensionAutoRules: buildViewfinderExtensionAutoRules,
    buildVideoDistributionAutoRules: buildVideoDistributionAutoRules,
    buildOnboardMonitorRiggingAutoGearRules: buildOnboardMonitorRiggingAutoGearRules,
    buildTripodPreferenceAutoGearRules: buildTripodPreferenceAutoGearRules,
    buildDefaultVideoDistributionAutoGearRules: buildDefaultVideoDistributionAutoGearRules,
    buildDefaultMatteboxAutoGearRules: buildDefaultMatteboxAutoGearRules,
    buildAutoGearAnyMotorRule: buildAutoGearAnyMotorRule,
    buildAlwaysAutoGearRule: buildAlwaysAutoGearRule,
    buildFiveDayConsumablesAutoGearRule: buildFiveDayConsumablesAutoGearRule,
    ensureDefaultMatteboxAutoGearRules: ensureDefaultMatteboxAutoGearRules,
    captureAutoGearSeedContext: captureAutoGearSeedContext,
    buildAutoGearRulesFromBaseInfo: buildAutoGearRulesFromBaseInfo,
    computeFactoryAutoGearRules: computeFactoryAutoGearRules,
    seedAutoGearRulesFromCurrentProject: seedAutoGearRulesFromCurrentProject,
    resetAutoGearRulesToFactoryAdditions: resetAutoGearRulesToFactoryAdditions
  });
  registerOrQueueModule('cineFeatureAutoGearRules', autoGearRulesAPI, {
    category: 'feature',
    description: 'Automatic gear rule cloning, factory defaults and seeding helpers.',
    replace: true,
    connections: ['cineModuleBase', 'cineModuleContext', 'cinePersistence']
  }, function (error) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Unable to register cineFeatureAutoGearRules module.', error);
    }
  });
  var globalExports = [['cineFeatureAutoGearRules', autoGearRulesAPI], ['cloneAutoGearItems', cloneAutoGearItems], ['cloneAutoGearRuleItem', cloneAutoGearRuleItem], ['cloneAutoGearRule', cloneAutoGearRule], ['cloneAutoGearRules', cloneAutoGearRules], ['setFactoryAutoGearRulesSnapshot', setFactoryAutoGearRulesSnapshot], ['ensureDefaultMatteboxAutoGearRules', ensureDefaultMatteboxAutoGearRules], ['captureAutoGearSeedContext', captureAutoGearSeedContext], ['buildAutoGearRulesFromBaseInfo', buildAutoGearRulesFromBaseInfo], ['computeFactoryAutoGearRules', computeFactoryAutoGearRules], ['seedAutoGearRulesFromCurrentProject', seedAutoGearRulesFromCurrentProject], ['resetAutoGearRulesToFactoryAdditions', resetAutoGearRulesToFactoryAdditions], ['factoryAutoGearRulesSnapshot', null], ['factoryAutoGearSeedContext', null]];
  globalExports.forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      name = _ref4[0],
      value = _ref4[1];
    if (name === 'factoryAutoGearRulesSnapshot') {
      Object.defineProperty(GLOBAL_SCOPE, name, {
        configurable: true,
        get: function get() {
          return factoryAutoGearRulesSnapshot;
        },
        set: function set(next) {
          factoryAutoGearRulesSnapshot = Array.isArray(next) ? cloneAutoGearRules(next) : null;
        }
      });
      return;
    }
    if (name === 'factoryAutoGearSeedContext') {
      Object.defineProperty(GLOBAL_SCOPE, name, {
        configurable: true,
        get: function get() {
          return factoryAutoGearSeedContext;
        },
        set: function set(next) {
          factoryAutoGearSeedContext = next && _typeof(next) === 'object' ? next : null;
        }
      });
      return;
    }
    exposeGlobal(name, value, {
      configurable: true,
      writable: true
    });
  });
})();