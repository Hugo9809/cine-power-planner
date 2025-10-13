function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
      return window;
    }
    if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
      return self;
    }
    if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
      return global;
    }
    return null;
  }
  var primaryCoreScope = typeof globalThis !== 'undefined' && globalThis && _typeof(globalThis.CORE_GLOBAL_SCOPE) === 'object' ? globalThis.CORE_GLOBAL_SCOPE : null;
  var CORE_SCOPE = primaryCoreScope && _typeof(primaryCoreScope) === 'object' ? primaryCoreScope : detectGlobalScope();
  var MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK = 'cameraPowerPlanner_mountVoltages';
  var cachedMountVoltagePrimaryKey = '';
  var cachedMountVoltageBackupKey = '';
  var mountVoltageKeysResolved = false;
  var readGlobalMountVoltageKey = function readGlobalMountVoltageKey(property) {
    if (!CORE_SCOPE || _typeof(CORE_SCOPE) !== 'object') {
      return '';
    }
    var value = CORE_SCOPE[property];
    return typeof value === 'string' && value ? value : '';
  };
  var assignGlobalMountVoltageKey = function assignGlobalMountVoltageKey(property, value) {
    if (!CORE_SCOPE || _typeof(CORE_SCOPE) !== 'object') {
      return;
    }
    if (typeof value !== 'string' || !value) {
      return;
    }
    var descriptor = null;
    try {
      descriptor = Object.getOwnPropertyDescriptor(CORE_SCOPE, property);
    } catch (descriptorError) {
      void descriptorError;
      descriptor = null;
    }
    if (descriptor && descriptor.configurable === false && descriptor.writable === false) {
      return;
    }
    try {
      CORE_SCOPE[property] = value;
    } catch (assignError) {
      void assignError;
    }
  };
  var resolveMountVoltageStorageKeys = function resolveMountVoltageStorageKeys() {
    if (mountVoltageKeysResolved) {
      return;
    }
    var resolvedPrimary = readGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_KEY') || readGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_KEY_RESOLVED');
    if (!resolvedPrimary && typeof getMountVoltageStorageKeyName === 'function') {
      try {
        var resolvedKey = getMountVoltageStorageKeyName();
        if (typeof resolvedKey === 'string' && resolvedKey) {
          resolvedPrimary = resolvedKey;
        }
      } catch (mountVoltageKeyError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Unable to resolve mount voltage storage key name', mountVoltageKeyError);
        }
      }
    }
    if (!resolvedPrimary && typeof MOUNT_VOLTAGE_STORAGE_KEY_NAME === 'string' && MOUNT_VOLTAGE_STORAGE_KEY_NAME) {
      resolvedPrimary = MOUNT_VOLTAGE_STORAGE_KEY_NAME;
    }
    if (!resolvedPrimary) {
      resolvedPrimary = MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK;
    }
    var resolvedBackup = readGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_BACKUP_KEY') || readGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_BACKUP_KEY_RESOLVED');
    if (!resolvedBackup && typeof getMountVoltageStorageBackupKeyName === 'function') {
      try {
        var backupKeyName = getMountVoltageStorageBackupKeyName();
        if (typeof backupKeyName === 'string' && backupKeyName) {
          resolvedBackup = backupKeyName;
        }
      } catch (backupKeyError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Unable to resolve mount voltage storage backup key name', backupKeyError);
        }
      }
    }
    if (!resolvedBackup) {
      resolvedBackup = "".concat(resolvedPrimary, "__backup");
    }
    cachedMountVoltagePrimaryKey = resolvedPrimary || MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK;
    cachedMountVoltageBackupKey = resolvedBackup || "".concat(cachedMountVoltagePrimaryKey, "__backup");
    mountVoltageKeysResolved = true;
    assignGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_KEY', cachedMountVoltagePrimaryKey);
    assignGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_KEY_RESOLVED', cachedMountVoltagePrimaryKey);
    assignGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_BACKUP_KEY', cachedMountVoltageBackupKey);
    assignGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_BACKUP_KEY_RESOLVED', cachedMountVoltageBackupKey);
  };
  var getMountVoltagePrimaryStorageKey = function getMountVoltagePrimaryStorageKey() {
    resolveMountVoltageStorageKeys();
    return cachedMountVoltagePrimaryKey || MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK;
  };
  var getMountVoltageBackupStorageKey = function getMountVoltageBackupStorageKey() {
    resolveMountVoltageStorageKeys();
    return cachedMountVoltageBackupKey || "".concat(getMountVoltagePrimaryStorageKey(), "__backup");
  };
  var SUPPORTED_MOUNT_VOLTAGE_TYPES = function resolveSupportedMounts() {
    if (CORE_SCOPE && Array.isArray(CORE_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES) && CORE_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES.length > 0) {
      return CORE_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES;
    }
    var created = Object.freeze(['V-Mount', 'Gold-Mount', 'B-Mount']);
    if (CORE_SCOPE && _typeof(CORE_SCOPE) === 'object') {
      try {
        CORE_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES = created;
      } catch (assignError) {
        void assignError;
      }
    }
    return created;
  }();
  var DEFAULT_MOUNT_VOLTAGES = function resolveDefaultMountVoltages() {
    if (CORE_SCOPE && CORE_SCOPE.DEFAULT_MOUNT_VOLTAGES && _typeof(CORE_SCOPE.DEFAULT_MOUNT_VOLTAGES) === 'object') {
      return CORE_SCOPE.DEFAULT_MOUNT_VOLTAGES;
    }
    var defaults = Object.freeze({
      'V-Mount': Object.freeze({
        high: 14.4,
        low: 12
      }),
      'Gold-Mount': Object.freeze({
        high: 14.4,
        low: 12
      }),
      'B-Mount': Object.freeze({
        high: 33.6,
        low: 21.6
      })
    });
    if (CORE_SCOPE && _typeof(CORE_SCOPE) === 'object') {
      try {
        CORE_SCOPE.DEFAULT_MOUNT_VOLTAGES = defaults;
      } catch (assignError) {
        void assignError;
      }
    }
    return defaults;
  }();
  var TOTAL_CURRENT_LABEL_FALLBACK = 'Total Current (at {voltage}V):';
  var TOTAL_CURRENT_HELP_HIGH_FALLBACK = "Current draw at the battery's main output ({voltage}V).";
  var TOTAL_CURRENT_HELP_LOW_FALLBACK = 'Current draw at auxiliary outputs ({voltage}V).';
  function parseVoltageValue(value, fallback) {
    var numeric = Number.NaN;
    if (typeof value === 'number') {
      numeric = value;
    } else if (typeof value === 'string') {
      var normalized = value.replace(',', '.');
      numeric = Number.parseFloat(normalized);
    }
    if (!Number.isFinite(numeric)) {
      return fallback;
    }
    if (numeric <= 0) {
      return fallback;
    }
    var clamped = Math.min(1000, Math.max(0.1, numeric));
    return Math.round(clamped * 100) / 100;
  }
  function cloneMountVoltageMap() {
    var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_MOUNT_VOLTAGES;
    var result = {};
    SUPPORTED_MOUNT_VOLTAGE_TYPES.forEach(function (type) {
      var entry = source && source[type] ? source[type] : DEFAULT_MOUNT_VOLTAGES[type];
      var high = parseVoltageValue(entry && entry.high, DEFAULT_MOUNT_VOLTAGES[type].high);
      var low = parseVoltageValue(entry && entry.low, DEFAULT_MOUNT_VOLTAGES[type].low);
      result[type] = {
        high: high,
        low: low
      };
    });
    return result;
  }
  function normalizeMountVoltageSource(source) {
    if (!source || _typeof(source) !== 'object') {
      return cloneMountVoltageMap(DEFAULT_MOUNT_VOLTAGES);
    }
    return cloneMountVoltageMap(source);
  }
  function parseStoredMountVoltages(raw) {
    if (!raw) {
      return null;
    }
    try {
      if (typeof raw === 'string') {
        var parsed = JSON.parse(raw);
        return normalizeMountVoltageSource(parsed);
      }
      return normalizeMountVoltageSource(raw);
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Could not parse stored mount voltages', error);
      }
      return null;
    }
  }
  function getDefaultMountKey(mount) {
    if (SUPPORTED_MOUNT_VOLTAGE_TYPES.includes(mount)) {
      return mount;
    }
    return 'V-Mount';
  }
  var mountVoltagePreferences = cloneMountVoltageMap(DEFAULT_MOUNT_VOLTAGES);
  var mountVoltageInputs = null;
  var mountVoltageSectionElem = null;
  var mountVoltageHeadingElem = null;
  var mountVoltageDescriptionElem = null;
  var mountVoltageNoteElem = null;
  var mountVoltageResetButton = CORE_SCOPE && CORE_SCOPE.mountVoltageResetButton ? CORE_SCOPE.mountVoltageResetButton : typeof globalThis !== 'undefined' && globalThis && globalThis.mountVoltageResetButton ? globalThis.mountVoltageResetButton : null;
  var mountVoltageTitleElems = null;
  function syncMountVoltageResetButtonGlobal(value) {
    var targetScope = CORE_SCOPE || detectGlobalScope();
    if (!targetScope || _typeof(targetScope) !== 'object') {
      return;
    }
    try {
      targetScope.mountVoltageResetButton = value;
    } catch (assignError) {
      void assignError;
      targetScope.mountVoltageResetButton = value;
    }
  }
  function syncMountVoltageInputsGlobal(value) {
    var targetScope = CORE_SCOPE || detectGlobalScope();
    if (!targetScope || _typeof(targetScope) !== 'object') {
      return;
    }
    try {
      targetScope.mountVoltageInputs = value;
    } catch (assignError) {
      void assignError;
      targetScope.mountVoltageInputs = value;
    }
  }
  syncMountVoltageResetButtonGlobal(mountVoltageResetButton);
  syncMountVoltageInputsGlobal(mountVoltageInputs);
  function getMountVoltageConfig(mount) {
    var key = getDefaultMountKey(mount);
    var entry = mountVoltagePreferences[key] || DEFAULT_MOUNT_VOLTAGES[key];
    return {
      high: parseVoltageValue(entry && entry.high, DEFAULT_MOUNT_VOLTAGES[key].high),
      low: parseVoltageValue(entry && entry.low, DEFAULT_MOUNT_VOLTAGES[key].low)
    };
  }
  function getActiveMountVoltageConfig() {
    var plate = typeof getSelectedPlate === 'function' ? getSelectedPlate() : 'V-Mount';
    return getMountVoltageConfig(plate);
  }
  function getMountVoltagePreferencesClone() {
    return cloneMountVoltageMap(mountVoltagePreferences);
  }
  function persistMountVoltagePreferences(preferences) {
    if (typeof localStorage === 'undefined') {
      return;
    }
    var serialized;
    try {
      serialized = JSON.stringify(preferences);
    } catch (serializationError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Could not serialize mount voltage preferences', serializationError);
      }
      return;
    }
    var primaryMountVoltageKey = getMountVoltagePrimaryStorageKey();
    try {
      localStorage.setItem(primaryMountVoltageKey, serialized);
    } catch (storageError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Could not save mount voltage preferences', storageError);
      }
    }
    var backupMountVoltageKey = getMountVoltageBackupStorageKey();
    try {
      localStorage.setItem(backupMountVoltageKey, serialized);
    } catch (backupError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Could not save mount voltage backup copy', backupError);
      }
    }
  }
  function formatVoltageForDisplay(voltage, lang) {
    var fallbackLang = typeof currentLang === 'string' ? currentLang : 'en';
    var effectiveLang = typeof lang === 'string' ? lang : fallbackLang;
    var numeric = Number(voltage);
    if (!Number.isFinite(numeric)) {
      return '';
    }
    var options = {
      maximumFractionDigits: 2,
      minimumFractionDigits: numeric % 1 === 0 ? 0 : 1
    };
    if (typeof formatNumberForLang === 'function') {
      try {
        return formatNumberForLang(effectiveLang, numeric, options);
      } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('formatNumberForLang failed for voltage display', error);
        }
      }
    }
    try {
      var formatter = new Intl.NumberFormat(effectiveLang, options);
      return formatter.format(numeric);
    } catch (formatError) {
      void formatError;
    }
    return "".concat(numeric);
  }
  function formatVoltageInputValue(value) {
    return Number.isFinite(value) ? String(Math.round(Number(value) * 100) / 100) : '';
  }
  function updateMountVoltageInputsFromState() {
    if (!mountVoltageInputs) {
      return;
    }
    var preferences = mountVoltagePreferences || DEFAULT_MOUNT_VOLTAGES;
    SUPPORTED_MOUNT_VOLTAGE_TYPES.forEach(function (type) {
      var fields = mountVoltageInputs[type];
      if (!fields) return;
      var entry = preferences[type] || DEFAULT_MOUNT_VOLTAGES[type];
      if (fields.high) {
        fields.high.value = formatVoltageInputValue(entry && entry.high);
      }
      if (fields.low) {
        fields.low.value = formatVoltageInputValue(entry && entry.low);
      }
    });
  }
  function getTemplateString(lang, key, fallback) {
    var localeTexts = typeof getLanguageTexts === 'function' ? getLanguageTexts(lang) : null;
    var defaultTexts = typeof getLanguageTexts === 'function' && typeof DEFAULT_LANGUAGE !== 'undefined' ? getLanguageTexts(DEFAULT_LANGUAGE) : null;
    if (localeTexts && typeof localeTexts[key] === 'string') {
      return localeTexts[key];
    }
    if (defaultTexts && typeof defaultTexts[key] === 'string') {
      return defaultTexts[key];
    }
    return fallback;
  }
  function renderVoltageTemplate(template, voltage, lang, fallback) {
    var formatted = formatVoltageForDisplay(voltage, lang);
    var source = typeof template === 'string' && template.includes('{voltage}') ? template : fallback;
    if (typeof source !== 'string') {
      return formatted ? "".concat(formatted, " V") : '';
    }
    return source.replace('{voltage}', formatted);
  }
  function refreshTotalCurrentLabels(lang, mount, voltages) {
    if (typeof document === 'undefined') {
      return;
    }
    var fallbackLang = typeof currentLang === 'string' ? currentLang : 'en';
    var effectiveLang = typeof lang === 'string' ? lang : fallbackLang;
    var highLabelElem = document.getElementById('totalCurrent144Label');
    var lowLabelElem = document.getElementById('totalCurrent12Label');
    if (!highLabelElem || !lowLabelElem) {
      return;
    }
    var effectiveMount = mount || (typeof getSelectedPlate === 'function' ? getSelectedPlate() : 'V-Mount');
    var config = voltages || getMountVoltageConfig(effectiveMount);
    var highTemplate = getTemplateString(effectiveLang, 'totalCurrentHighLabelTemplate', TOTAL_CURRENT_LABEL_FALLBACK);
    var lowTemplate = getTemplateString(effectiveLang, 'totalCurrentLowLabelTemplate', TOTAL_CURRENT_LABEL_FALLBACK);
    var highHelpTemplate = getTemplateString(effectiveLang, 'totalCurrentHighHelpTemplate', TOTAL_CURRENT_HELP_HIGH_FALLBACK);
    var lowHelpTemplate = getTemplateString(effectiveLang, 'totalCurrentLowHelpTemplate', TOTAL_CURRENT_HELP_LOW_FALLBACK);
    highLabelElem.textContent = renderVoltageTemplate(highTemplate, config.high, effectiveLang, TOTAL_CURRENT_LABEL_FALLBACK);
    lowLabelElem.textContent = renderVoltageTemplate(lowTemplate, config.low, effectiveLang, TOTAL_CURRENT_LABEL_FALLBACK);
    highLabelElem.setAttribute('data-help', renderVoltageTemplate(highHelpTemplate, config.high, effectiveLang, TOTAL_CURRENT_HELP_HIGH_FALLBACK));
    lowLabelElem.setAttribute('data-help', renderVoltageTemplate(lowHelpTemplate, config.low, effectiveLang, TOTAL_CURRENT_HELP_LOW_FALLBACK));
  }
  function updateMountVoltageSettingLabels(lang) {
    var fallbackLang = typeof DEFAULT_LANGUAGE === 'string' ? DEFAULT_LANGUAGE : 'en';
    var effectiveLang = typeof lang === 'string' ? lang : typeof currentLang === 'string' ? currentLang : 'en';
    var localeTexts = typeof getLanguageTexts === 'function' ? getLanguageTexts(effectiveLang) : null;
    var fallbackTexts = typeof getLanguageTexts === 'function' ? getLanguageTexts(fallbackLang) : null;
    if (!localeTexts && !fallbackTexts) return;
    if (mountVoltageHeadingElem) {
      mountVoltageHeadingElem.textContent = localeTexts && localeTexts.mountVoltageSettingsHeading || fallbackTexts && fallbackTexts.mountVoltageSettingsHeading || 'Battery mount voltages';
      var helpText = localeTexts && localeTexts.mountVoltageSettingsHelp || fallbackTexts && fallbackTexts.mountVoltageSettingsHelp || '';
      if (helpText) {
        mountVoltageHeadingElem.setAttribute('data-help', helpText);
      }
    }
    if (mountVoltageDescriptionElem) {
      mountVoltageDescriptionElem.textContent = localeTexts && localeTexts.mountVoltageDescription || fallbackTexts && fallbackTexts.mountVoltageDescription || '';
    }
    if (mountVoltageNoteElem) {
      mountVoltageNoteElem.textContent = localeTexts && localeTexts.mountVoltageNote || texts && texts.en && texts.en.mountVoltageNote || '';
    }
    if (mountVoltageResetButton) {
      mountVoltageResetButton.textContent = localeTexts && localeTexts.mountVoltageReset || texts && texts.en && texts.en.mountVoltageReset || 'Restore defaults';
      var resetHelp = localeTexts && localeTexts.mountVoltageResetHelp || texts && texts.en && texts.en.mountVoltageResetHelp || '';
      if (resetHelp) {
        mountVoltageResetButton.setAttribute('data-help', resetHelp);
      }
    }
    if (mountVoltageTitleElems) {
      if (mountVoltageTitleElems.V) {
        mountVoltageTitleElems.V.textContent = localeTexts && localeTexts.mountVoltageCardLabelV || texts && texts.en && texts.en.mountVoltageCardLabelV || 'V-Mount';
      }
      if (mountVoltageTitleElems.Gold) {
        mountVoltageTitleElems.Gold.textContent = localeTexts && localeTexts.mountVoltageCardLabelGold || texts && texts.en && texts.en.mountVoltageCardLabelGold || 'Gold Mount';
      }
      if (mountVoltageTitleElems.B) {
        mountVoltageTitleElems.B.textContent = localeTexts && localeTexts.mountVoltageCardLabelB || texts && texts.en && texts.en.mountVoltageCardLabelB || 'B-Mount';
      }
    }
    if (mountVoltageInputs) {
      SUPPORTED_MOUNT_VOLTAGE_TYPES.forEach(function (type) {
        var fields = mountVoltageInputs[type];
        if (!fields) return;
        if (fields.highLabel) {
          fields.highLabel.textContent = localeTexts && localeTexts.mountVoltageHighLabel || texts && texts.en && texts.en.mountVoltageHighLabel || 'High-voltage output';
          var highHelp = localeTexts && localeTexts.mountVoltageHighHelp || texts && texts.en && texts.en.mountVoltageHighHelp || '';
          if (highHelp) {
            fields.highLabel.setAttribute('data-help', highHelp);
            if (fields.high) {
              fields.high.setAttribute('data-help', highHelp);
            }
          }
        }
        if (fields.lowLabel) {
          fields.lowLabel.textContent = localeTexts && localeTexts.mountVoltageLowLabel || texts && texts.en && texts.en.mountVoltageLowLabel || 'Low-voltage output';
          var lowHelp = localeTexts && localeTexts.mountVoltageLowHelp || texts && texts.en && texts.en.mountVoltageLowHelp || '';
          if (lowHelp) {
            fields.lowLabel.setAttribute('data-help', lowHelp);
            if (fields.low) {
              fields.low.setAttribute('data-help', lowHelp);
            }
          }
        }
      });
    }
  }
  function applyMountVoltagePreferences(preferences, options) {
    var _ref = options || {},
      _ref$persist = _ref.persist,
      persist = _ref$persist === void 0 ? true : _ref$persist,
      _ref$triggerUpdate = _ref.triggerUpdate,
      triggerUpdate = _ref$triggerUpdate === void 0 ? true : _ref$triggerUpdate;
    mountVoltagePreferences = normalizeMountVoltageSource(preferences);
    if (persist) {
      persistMountVoltagePreferences(mountVoltagePreferences);
    }
    if (triggerUpdate) {
      updateMountVoltageInputsFromState();
      refreshTotalCurrentLabels(typeof currentLang === 'string' ? currentLang : 'en');
      if (typeof updateCalculations === 'function') {
        try {
          updateCalculations();
        } catch (calcError) {
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Failed to refresh calculations after voltage change', calcError);
          }
        }
      }
    }
  }
  function resetMountVoltagePreferences(options) {
    applyMountVoltagePreferences(DEFAULT_MOUNT_VOLTAGES, options);
  }
  function setMountVoltageDomReferences(refs) {
    var references = refs || {};
    mountVoltageSectionElem = references.section || null;
    mountVoltageHeadingElem = references.heading || null;
    mountVoltageDescriptionElem = references.description || null;
    mountVoltageNoteElem = references.note || null;
    mountVoltageResetButton = references.resetButton || null;
    mountVoltageTitleElems = references.titles || null;
    mountVoltageInputs = references.inputs || null;
    syncMountVoltageResetButtonGlobal(mountVoltageResetButton);
    syncMountVoltageInputsGlobal(mountVoltageInputs);
    return {
      section: mountVoltageSectionElem,
      heading: mountVoltageHeadingElem,
      description: mountVoltageDescriptionElem,
      note: mountVoltageNoteElem,
      resetButton: mountVoltageResetButton,
      titles: mountVoltageTitleElems,
      inputs: mountVoltageInputs
    };
  }
  function reloadMountVoltagePreferencesFromStorage() {
    if (typeof localStorage === 'undefined') {
      return;
    }
    try {
      var storedVoltages = localStorage.getItem(getMountVoltagePrimaryStorageKey());
      var parsedVoltages = parseStoredMountVoltages(storedVoltages);
      if (parsedVoltages) {
        mountVoltagePreferences = parsedVoltages;
        return;
      }
      var backupVoltages = localStorage.getItem(getMountVoltageBackupStorageKey());
      var parsedBackupVoltages = parseStoredMountVoltages(backupVoltages);
      if (parsedBackupVoltages) {
        mountVoltagePreferences = parsedBackupVoltages;
        persistMountVoltagePreferences(parsedBackupVoltages);
      }
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Could not load mount voltage preferences', error);
      }
    }
  }
  reloadMountVoltagePreferencesFromStorage();
  var runtimeExports = {
    SUPPORTED_MOUNT_VOLTAGE_TYPES: SUPPORTED_MOUNT_VOLTAGE_TYPES,
    DEFAULT_MOUNT_VOLTAGES: DEFAULT_MOUNT_VOLTAGES,
    parseVoltageValue: parseVoltageValue,
    cloneMountVoltageMap: cloneMountVoltageMap,
    getMountVoltagePreferencesClone: getMountVoltagePreferencesClone,
    applyMountVoltagePreferences: applyMountVoltagePreferences,
    parseStoredMountVoltages: parseStoredMountVoltages,
    resetMountVoltagePreferences: resetMountVoltagePreferences,
    updateMountVoltageInputsFromState: updateMountVoltageInputsFromState,
    persistMountVoltagePreferences: persistMountVoltagePreferences
  };
  Object.defineProperty(runtimeExports, 'mountVoltageInputs', {
    enumerable: true,
    get: function get() {
      return mountVoltageInputs;
    }
  });
  Object.freeze(runtimeExports);
  var namespace = {
    SUPPORTED_MOUNT_VOLTAGE_TYPES: SUPPORTED_MOUNT_VOLTAGE_TYPES,
    DEFAULT_MOUNT_VOLTAGES: DEFAULT_MOUNT_VOLTAGES,
    parseVoltageValue: parseVoltageValue,
    cloneMountVoltageMap: cloneMountVoltageMap,
    getMountVoltagePreferencesClone: getMountVoltagePreferencesClone,
    applyMountVoltagePreferences: applyMountVoltagePreferences,
    parseStoredMountVoltages: parseStoredMountVoltages,
    resetMountVoltagePreferences: resetMountVoltagePreferences,
    updateMountVoltageInputsFromState: updateMountVoltageInputsFromState,
    persistMountVoltagePreferences: persistMountVoltagePreferences,
    refreshTotalCurrentLabels: refreshTotalCurrentLabels,
    updateMountVoltageSettingLabels: updateMountVoltageSettingLabels,
    getMountVoltageConfig: getMountVoltageConfig,
    getActiveMountVoltageConfig: getActiveMountVoltageConfig,
    syncMountVoltageResetButtonGlobal: syncMountVoltageResetButtonGlobal,
    setMountVoltageDomReferences: setMountVoltageDomReferences,
    reloadMountVoltagePreferencesFromStorage: reloadMountVoltagePreferencesFromStorage,
    getMountVoltagePrimaryStorageKey: getMountVoltagePrimaryStorageKey,
    getMountVoltageBackupStorageKey: getMountVoltageBackupStorageKey,
    runtimeExports: runtimeExports
  };
  Object.defineProperty(namespace, 'mountVoltageInputs', {
    enumerable: true,
    get: function get() {
      return mountVoltageInputs;
    }
  });
  if (CORE_SCOPE && _typeof(CORE_SCOPE) === 'object') {
    var targetName = 'cineCoreMountVoltage';
    var existingNamespace = CORE_SCOPE[targetName] && _typeof(CORE_SCOPE[targetName]) === 'object' ? CORE_SCOPE[targetName] : {};
    for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      existingNamespace[key] = namespace[key];
    }
    var commitMountVoltageInputs = function commitMountVoltageInputs() {
      if (!existingNamespace || _typeof(existingNamespace) !== 'object' && typeof existingNamespace !== 'function') {
        return false;
      }
      if (typeof Object.isExtensible === 'function' && !Object.isExtensible(existingNamespace)) {
        return false;
      }
      try {
        Object.defineProperty(existingNamespace, 'mountVoltageInputs', {
          configurable: true,
          enumerable: true,
          get: function get() {
            return mountVoltageInputs;
          }
        });
        return true;
      } catch (defineError) {
        void defineError;
      }
      return false;
    };
    if (!commitMountVoltageInputs()) {
      try {
        existingNamespace.mountVoltageInputs = mountVoltageInputs;
      } catch (assignInputsError) {
        void assignInputsError;
      }
    }
    try {
      CORE_SCOPE[targetName] = existingNamespace;
    } catch (assignError) {
      void assignError;
    }
    if (!CORE_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES) {
      try {
        CORE_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES = SUPPORTED_MOUNT_VOLTAGE_TYPES;
      } catch (supportedAssignError) {
        void supportedAssignError;
      }
    }
    if (!CORE_SCOPE.DEFAULT_MOUNT_VOLTAGES) {
      try {
        CORE_SCOPE.DEFAULT_MOUNT_VOLTAGES = DEFAULT_MOUNT_VOLTAGES;
      } catch (defaultsAssignError) {
        void defaultsAssignError;
      }
    }
    var runtimeTargetName = 'MOUNT_VOLTAGE_RUNTIME_EXPORTS';
    var runtimeNamespace = null;
    try {
      runtimeNamespace = CORE_SCOPE[runtimeTargetName];
    } catch (resolveRuntimeError) {
      runtimeNamespace = null;
      void resolveRuntimeError;
    }
    if (!runtimeNamespace || _typeof(runtimeNamespace) !== 'object') {
      runtimeNamespace = {};
    }
    for (var _i2 = 0, _Object$keys2 = Object.keys(runtimeExports); _i2 < _Object$keys2.length; _i2++) {
      var _key = _Object$keys2[_i2];
      runtimeNamespace[_key] = runtimeExports[_key];
    }
    var commitRuntimeMountVoltageInputs = function commitRuntimeMountVoltageInputs() {
      if (!runtimeNamespace || _typeof(runtimeNamespace) !== 'object' && typeof runtimeNamespace !== 'function') {
        return false;
      }
      if (typeof Object.isExtensible === 'function' && !Object.isExtensible(runtimeNamespace)) {
        return false;
      }
      try {
        Object.defineProperty(runtimeNamespace, 'mountVoltageInputs', {
          configurable: true,
          enumerable: true,
          get: function get() {
            return mountVoltageInputs;
          }
        });
        return true;
      } catch (defineRuntimeError) {
        void defineRuntimeError;
      }
      return false;
    };
    if (!commitRuntimeMountVoltageInputs()) {
      try {
        runtimeNamespace.mountVoltageInputs = mountVoltageInputs;
      } catch (assignRuntimeInputsError) {
        void assignRuntimeInputsError;
      }
    }
    try {
      CORE_SCOPE[runtimeTargetName] = runtimeNamespace;
    } catch (assignRuntimeError) {
      void assignRuntimeError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();