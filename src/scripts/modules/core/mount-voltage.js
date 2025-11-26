(function () {
  /* global getMountVoltageStorageKeyName, MOUNT_VOLTAGE_STORAGE_KEY_NAME,
            getMountVoltageStorageBackupKeyName, getSelectedPlate, currentLang,
            formatNumberForLang, getLanguageTexts, DEFAULT_LANGUAGE, texts,
            updateCalculations */
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window && typeof window === 'object') {
      return window;
    }
    if (typeof self !== 'undefined' && self && typeof self === 'object') {
      return self;
    }
    if (typeof global !== 'undefined' && global && typeof global === 'object') {
      return global;
    }
    return null;
  }

  const primaryCoreScope =
    typeof globalThis !== 'undefined' &&
      globalThis &&
      typeof globalThis.CORE_GLOBAL_SCOPE === 'object'
      ? globalThis.CORE_GLOBAL_SCOPE
      : null;

  const CORE_SCOPE = primaryCoreScope && typeof primaryCoreScope === 'object'
    ? primaryCoreScope
    : detectGlobalScope();

  const MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK = 'cameraPowerPlanner_mountVoltages';
  let cachedMountVoltagePrimaryKey = '';
  let cachedMountVoltageBackupKey = '';
  let mountVoltageKeysResolved = false;

  const readGlobalMountVoltageKey = property => {
    if (!CORE_SCOPE || typeof CORE_SCOPE !== 'object') {
      return '';
    }
    const value = CORE_SCOPE[property];
    return typeof value === 'string' && value ? value : '';
  };

  const assignGlobalMountVoltageKey = (property, value) => {
    if (!CORE_SCOPE || typeof CORE_SCOPE !== 'object') {
      return;
    }
    if (typeof value !== 'string' || !value) {
      return;
    }

    let descriptor = null;
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

  const resolveMountVoltageStorageKeys = () => {
    if (mountVoltageKeysResolved) {
      return;
    }

    let resolvedPrimary =
      readGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_KEY') ||
      readGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_KEY_RESOLVED');

    if (!resolvedPrimary && typeof getMountVoltageStorageKeyName === 'function') {
      try {
        const resolvedKey = getMountVoltageStorageKeyName();
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

    let resolvedBackup =
      readGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_BACKUP_KEY') ||
      readGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_BACKUP_KEY_RESOLVED');

    if (!resolvedBackup && typeof getMountVoltageStorageBackupKeyName === 'function') {
      try {
        const backupKeyName = getMountVoltageStorageBackupKeyName();
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
      resolvedBackup = `${resolvedPrimary}__backup`;
    }

    cachedMountVoltagePrimaryKey = resolvedPrimary || MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK;
    cachedMountVoltageBackupKey = resolvedBackup || `${cachedMountVoltagePrimaryKey}__backup`;
    mountVoltageKeysResolved = true;

    assignGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_KEY', cachedMountVoltagePrimaryKey);
    assignGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_KEY_RESOLVED', cachedMountVoltagePrimaryKey);
    assignGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_BACKUP_KEY', cachedMountVoltageBackupKey);
    assignGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_BACKUP_KEY_RESOLVED', cachedMountVoltageBackupKey);
  };

  const getMountVoltagePrimaryStorageKey = () => {
    resolveMountVoltageStorageKeys();
    return cachedMountVoltagePrimaryKey || MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK;
  };

  const getMountVoltageBackupStorageKey = () => {
    resolveMountVoltageStorageKeys();
    return cachedMountVoltageBackupKey || `${getMountVoltagePrimaryStorageKey()}__backup`;
  };

  const SUPPORTED_MOUNT_VOLTAGE_TYPES = (function resolveSupportedMounts() {
    if (
      CORE_SCOPE &&
      Array.isArray(CORE_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES) &&
      CORE_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES.length > 0
    ) {
      return CORE_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES;
    }

    const created = Object.freeze(['V-Mount', 'Gold-Mount', 'B-Mount']);
    if (CORE_SCOPE && typeof CORE_SCOPE === 'object') {
      try {
        CORE_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES = created;
      } catch (assignError) {
        void assignError;
      }
    }
    return created;
  })();

  const DEFAULT_MOUNT_VOLTAGES = (function resolveDefaultMountVoltages() {
    if (
      CORE_SCOPE &&
      CORE_SCOPE.DEFAULT_MOUNT_VOLTAGES &&
      typeof CORE_SCOPE.DEFAULT_MOUNT_VOLTAGES === 'object'
    ) {
      return CORE_SCOPE.DEFAULT_MOUNT_VOLTAGES;
    }

    const defaults = Object.freeze({
      'V-Mount': Object.freeze({ high: 14.4, low: 12 }),
      'Gold-Mount': Object.freeze({ high: 14.4, low: 12 }),
      'B-Mount': Object.freeze({ high: 33.6, low: 21.6 }),
    });

    if (CORE_SCOPE && typeof CORE_SCOPE === 'object') {
      try {
        CORE_SCOPE.DEFAULT_MOUNT_VOLTAGES = defaults;
      } catch (assignError) {
        void assignError;
      }
    }

    return defaults;
  })();

  const TOTAL_CURRENT_LABEL_FALLBACK = 'Total Current (at {voltage}V):';
  const TOTAL_CURRENT_HELP_HIGH_FALLBACK =
    "Current draw at the battery's main output ({voltage}V).";
  const TOTAL_CURRENT_HELP_LOW_FALLBACK =
    'Current draw at auxiliary outputs ({voltage}V).';

  function parseVoltageValue(value, fallback) {
    let numeric = Number.NaN;
    if (typeof value === 'number') {
      numeric = value;
    } else if (typeof value === 'string') {
      const normalized = value.replace(',', '.');
      numeric = Number.parseFloat(normalized);
    }
    if (!Number.isFinite(numeric)) {
      return fallback;
    }
    if (numeric <= 0) {
      return fallback;
    }
    const clamped = Math.min(1000, Math.max(0.1, numeric));
    return Math.round(clamped * 100) / 100;
  }

  function cloneMountVoltageMap(source = DEFAULT_MOUNT_VOLTAGES) {
    const result = {};
    SUPPORTED_MOUNT_VOLTAGE_TYPES.forEach(type => {
      const entry = source && source[type] ? source[type] : DEFAULT_MOUNT_VOLTAGES[type];
      const high = parseVoltageValue(entry && entry.high, DEFAULT_MOUNT_VOLTAGES[type].high);
      const low = parseVoltageValue(entry && entry.low, DEFAULT_MOUNT_VOLTAGES[type].low);
      result[type] = { high, low };
    });
    return result;
  }

  function normalizeMountVoltageSource(source) {
    if (!source || typeof source !== 'object') {
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
        const parsed = JSON.parse(raw);
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

  let mountVoltagePreferences = cloneMountVoltageMap(DEFAULT_MOUNT_VOLTAGES);
  let mountVoltageInputs = null;
  let mountVoltageSectionElem = null;
  let mountVoltageHeadingElem = null;
  let mountVoltageDescriptionElem = null;
  let mountVoltageNoteElem = null;
  let mountVoltageResetButton =
    CORE_SCOPE && CORE_SCOPE.mountVoltageResetButton
      ? CORE_SCOPE.mountVoltageResetButton
      : typeof globalThis !== 'undefined' && globalThis && globalThis.mountVoltageResetButton
        ? globalThis.mountVoltageResetButton
        : null;
  let mountVoltageTitleElems = null;

  function syncMountVoltageResetButtonGlobal(value) {
    const targetScope = CORE_SCOPE || detectGlobalScope();
    if (!targetScope || typeof targetScope !== 'object') {
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
    const targetScope = CORE_SCOPE || detectGlobalScope();
    if (!targetScope || typeof targetScope !== 'object') {
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
    const key = getDefaultMountKey(mount);
    const entry = mountVoltagePreferences[key] || DEFAULT_MOUNT_VOLTAGES[key];
    return {
      high: parseVoltageValue(entry && entry.high, DEFAULT_MOUNT_VOLTAGES[key].high),
      low: parseVoltageValue(entry && entry.low, DEFAULT_MOUNT_VOLTAGES[key].low),
    };
  }

  function getActiveMountVoltageConfig() {
    const plate = typeof getSelectedPlate === 'function' ? getSelectedPlate() : 'V-Mount';
    return getMountVoltageConfig(plate);
  }

  function getMountVoltagePreferencesClone() {
    return cloneMountVoltageMap(mountVoltagePreferences);
  }

  function persistMountVoltagePreferences(preferences) {
    if (typeof localStorage === 'undefined') {
      return;
    }

    let serialized;
    try {
      serialized = JSON.stringify(preferences);
    } catch (serializationError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Could not serialize mount voltage preferences', serializationError);
      }
      return;
    }

    const primaryMountVoltageKey = getMountVoltagePrimaryStorageKey();
    try {
      localStorage.setItem(primaryMountVoltageKey, serialized);
    } catch (storageError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Could not save mount voltage preferences', storageError);
      }
    }

    const backupMountVoltageKey = getMountVoltageBackupStorageKey();
    try {
      localStorage.setItem(backupMountVoltageKey, serialized);
    } catch (backupError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Could not save mount voltage backup copy', backupError);
      }
    }
  }

  function formatVoltageForDisplay(voltage, lang) {
    const fallbackLang = typeof currentLang === 'string' ? currentLang : 'en';
    const effectiveLang = typeof lang === 'string' ? lang : fallbackLang;
    const numeric = Number(voltage);
    if (!Number.isFinite(numeric)) {
      return '';
    }
    const options = {
      maximumFractionDigits: 2,
      minimumFractionDigits: numeric % 1 === 0 ? 0 : 1,
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
      const formatter = new Intl.NumberFormat(effectiveLang, options);
      return formatter.format(numeric);
    } catch (formatError) {
      void formatError;
    }
    return `${numeric}`;
  }

  function formatVoltageInputValue(value) {
    return Number.isFinite(value) ? String(Math.round(Number(value) * 100) / 100) : '';
  }

  function updateMountVoltageInputsFromState() {
    if (!mountVoltageInputs) {
      return;
    }
    const preferences = mountVoltagePreferences || DEFAULT_MOUNT_VOLTAGES;
    SUPPORTED_MOUNT_VOLTAGE_TYPES.forEach(type => {
      const fields = mountVoltageInputs[type];
      if (!fields) return;
      const entry = preferences[type] || DEFAULT_MOUNT_VOLTAGES[type];
      if (fields.high) {
        fields.high.value = formatVoltageInputValue(entry && entry.high);
      }
      if (fields.low) {
        fields.low.value = formatVoltageInputValue(entry && entry.low);
      }
    });
  }

  function getTemplateString(lang, key, fallback) {
    const localeTexts = typeof getLanguageTexts === 'function' ? getLanguageTexts(lang) : null;
    const defaultTexts = typeof getLanguageTexts === 'function' && typeof DEFAULT_LANGUAGE !== 'undefined'
      ? getLanguageTexts(DEFAULT_LANGUAGE)
      : null;
    if (localeTexts && typeof localeTexts[key] === 'string') {
      return localeTexts[key];
    }
    if (defaultTexts && typeof defaultTexts[key] === 'string') {
      return defaultTexts[key];
    }
    return fallback;
  }

  function renderVoltageTemplate(template, voltage, lang, fallback) {
    const formatted = formatVoltageForDisplay(voltage, lang);
    const source = typeof template === 'string' && template.includes('{voltage}')
      ? template
      : fallback;
    if (typeof source !== 'string') {
      return formatted ? `${formatted} V` : '';
    }
    return source.replace('{voltage}', formatted);
  }

  function refreshTotalCurrentLabels(lang, mount, voltages) {
    if (typeof document === 'undefined') {
      return;
    }
    const fallbackLang = typeof currentLang === 'string' ? currentLang : 'en';
    const effectiveLang = typeof lang === 'string' ? lang : fallbackLang;
    const highLabelElem = document.getElementById('totalCurrent144Label');
    const lowLabelElem = document.getElementById('totalCurrent12Label');
    if (!highLabelElem || !lowLabelElem) {
      return;
    }
    const effectiveMount = mount || (typeof getSelectedPlate === 'function' ? getSelectedPlate() : 'V-Mount');
    const config = voltages || getMountVoltageConfig(effectiveMount);
    const highTemplate = getTemplateString(effectiveLang, 'totalCurrentHighLabelTemplate', TOTAL_CURRENT_LABEL_FALLBACK);
    const lowTemplate = getTemplateString(effectiveLang, 'totalCurrentLowLabelTemplate', TOTAL_CURRENT_LABEL_FALLBACK);
    const highHelpTemplate = getTemplateString(
      effectiveLang,
      'totalCurrentHighHelpTemplate',
      TOTAL_CURRENT_HELP_HIGH_FALLBACK
    );
    const lowHelpTemplate = getTemplateString(
      effectiveLang,
      'totalCurrentLowHelpTemplate',
      TOTAL_CURRENT_HELP_LOW_FALLBACK
    );
    highLabelElem.textContent = renderVoltageTemplate(highTemplate, config.high, effectiveLang, TOTAL_CURRENT_LABEL_FALLBACK);
    lowLabelElem.textContent = renderVoltageTemplate(lowTemplate, config.low, effectiveLang, TOTAL_CURRENT_LABEL_FALLBACK);
    highLabelElem.setAttribute(
      'data-help',
      renderVoltageTemplate(highHelpTemplate, config.high, effectiveLang, TOTAL_CURRENT_HELP_HIGH_FALLBACK)
    );
    lowLabelElem.setAttribute(
      'data-help',
      renderVoltageTemplate(lowHelpTemplate, config.low, effectiveLang, TOTAL_CURRENT_HELP_LOW_FALLBACK)
    );
  }

  if (CORE_SCOPE && typeof CORE_SCOPE === 'object') {
    CORE_SCOPE.refreshTotalCurrentLabels = refreshTotalCurrentLabels;
  }
  if (typeof globalThis !== 'undefined' && globalThis) {
    globalThis.refreshTotalCurrentLabels = refreshTotalCurrentLabels;
  } else if (typeof window !== 'undefined' && window) {
    window.refreshTotalCurrentLabels = refreshTotalCurrentLabels;
  }

  function updateMountVoltageSettingLabels(lang) {
    const fallbackLang = typeof DEFAULT_LANGUAGE === 'string' ? DEFAULT_LANGUAGE : 'en';
    const effectiveLang = typeof lang === 'string' ? lang : typeof currentLang === 'string' ? currentLang : 'en';
    const localeTexts = typeof getLanguageTexts === 'function' ? getLanguageTexts(effectiveLang) : null;
    const fallbackTexts = typeof getLanguageTexts === 'function' ? getLanguageTexts(fallbackLang) : null;
    if (!localeTexts && !fallbackTexts) return;
    if (mountVoltageHeadingElem) {
      mountVoltageHeadingElem.textContent =
        (localeTexts && localeTexts.mountVoltageSettingsHeading) ||
        (fallbackTexts && fallbackTexts.mountVoltageSettingsHeading) ||
        'Battery mount voltages';
      const helpText =
        (localeTexts && localeTexts.mountVoltageSettingsHelp) ||
        (fallbackTexts && fallbackTexts.mountVoltageSettingsHelp) ||
        '';
      if (helpText) {
        mountVoltageHeadingElem.setAttribute('data-help', helpText);
      }
    }
    if (mountVoltageDescriptionElem) {
      mountVoltageDescriptionElem.textContent =
        (localeTexts && localeTexts.mountVoltageDescription) ||
        (fallbackTexts && fallbackTexts.mountVoltageDescription) ||
        '';
    }
    if (mountVoltageNoteElem) {
      mountVoltageNoteElem.textContent =
        (localeTexts && localeTexts.mountVoltageNote) ||
        (texts && texts.en && texts.en.mountVoltageNote) ||
        '';
    }
    if (mountVoltageResetButton) {
      mountVoltageResetButton.textContent =
        (localeTexts && localeTexts.mountVoltageReset) ||
        (texts && texts.en && texts.en.mountVoltageReset) ||
        'Restore defaults';
      const resetHelp =
        (localeTexts && localeTexts.mountVoltageResetHelp) ||
        (texts && texts.en && texts.en.mountVoltageResetHelp) ||
        '';
      if (resetHelp) {
        mountVoltageResetButton.setAttribute('data-help', resetHelp);
      }
    }
    if (mountVoltageTitleElems) {
      if (mountVoltageTitleElems.V) {
        mountVoltageTitleElems.V.textContent =
          (localeTexts && localeTexts.mountVoltageCardLabelV) ||
          (texts && texts.en && texts.en.mountVoltageCardLabelV) ||
          'V-Mount';
      }
      if (mountVoltageTitleElems.Gold) {
        mountVoltageTitleElems.Gold.textContent =
          (localeTexts && localeTexts.mountVoltageCardLabelGold) ||
          (texts && texts.en && texts.en.mountVoltageCardLabelGold) ||
          'Gold Mount';
      }
      if (mountVoltageTitleElems.B) {
        mountVoltageTitleElems.B.textContent =
          (localeTexts && localeTexts.mountVoltageCardLabelB) ||
          (texts && texts.en && texts.en.mountVoltageCardLabelB) ||
          'B-Mount';
      }
    }
    if (mountVoltageInputs) {
      SUPPORTED_MOUNT_VOLTAGE_TYPES.forEach(type => {
        const fields = mountVoltageInputs[type];
        if (!fields) return;
        if (fields.highLabel) {
          fields.highLabel.textContent =
            (localeTexts && localeTexts.mountVoltageHighLabel) ||
            (texts && texts.en && texts.en.mountVoltageHighLabel) ||
            'High-voltage output';
          const highHelp =
            (localeTexts && localeTexts.mountVoltageHighHelp) ||
            (texts && texts.en && texts.en.mountVoltageHighHelp) ||
            '';
          if (highHelp) {
            fields.highLabel.setAttribute('data-help', highHelp);
            if (fields.high) {
              fields.high.setAttribute('data-help', highHelp);
            }
          }
        }
        if (fields.lowLabel) {
          fields.lowLabel.textContent =
            (localeTexts && localeTexts.mountVoltageLowLabel) ||
            (texts && texts.en && texts.en.mountVoltageLowLabel) ||
            'Low-voltage output';
          const lowHelp =
            (localeTexts && localeTexts.mountVoltageLowHelp) ||
            (texts && texts.en && texts.en.mountVoltageLowHelp) ||
            '';
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
    const { persist = true, triggerUpdate = true } = options || {};
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
    const references = refs || {};
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
      inputs: mountVoltageInputs,
    };
  }

  function reloadMountVoltagePreferencesFromStorage() {
    if (typeof localStorage === 'undefined') {
      return;
    }
    try {
      const storedVoltages = localStorage.getItem(getMountVoltagePrimaryStorageKey());
      const parsedVoltages = parseStoredMountVoltages(storedVoltages);
      if (parsedVoltages) {
        mountVoltagePreferences = parsedVoltages;
        return;
      }
      const backupVoltages = localStorage.getItem(getMountVoltageBackupStorageKey());
      const parsedBackupVoltages = parseStoredMountVoltages(backupVoltages);
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

  const runtimeExports = {
    SUPPORTED_MOUNT_VOLTAGE_TYPES,
    DEFAULT_MOUNT_VOLTAGES,
    parseVoltageValue,
    cloneMountVoltageMap,
    getMountVoltagePreferencesClone,
    applyMountVoltagePreferences,
    parseStoredMountVoltages,
    resetMountVoltagePreferences,
    updateMountVoltageInputsFromState,
    persistMountVoltagePreferences,
  };

  Object.defineProperty(runtimeExports, 'mountVoltageInputs', {
    enumerable: true,
    get: () => mountVoltageInputs,
  });

  Object.freeze(runtimeExports);

  const namespace = {
    SUPPORTED_MOUNT_VOLTAGE_TYPES,
    DEFAULT_MOUNT_VOLTAGES,
    parseVoltageValue,
    cloneMountVoltageMap,
    getMountVoltagePreferencesClone,
    applyMountVoltagePreferences,
    parseStoredMountVoltages,
    resetMountVoltagePreferences,
    updateMountVoltageInputsFromState,
    persistMountVoltagePreferences,
    refreshTotalCurrentLabels,
    updateMountVoltageSettingLabels,
    getMountVoltageConfig,
    getActiveMountVoltageConfig,
    syncMountVoltageResetButtonGlobal,
    setMountVoltageDomReferences,
    reloadMountVoltagePreferencesFromStorage,
    getMountVoltagePrimaryStorageKey,
    getMountVoltageBackupStorageKey,
    runtimeExports,
  };

  Object.defineProperty(namespace, 'mountVoltageInputs', {
    enumerable: true,
    get: () => mountVoltageInputs,
  });

  if (CORE_SCOPE && typeof CORE_SCOPE === 'object') {
    const targetName = 'cineCoreMountVoltage';
    const existingNamespace =
      CORE_SCOPE[targetName] && typeof CORE_SCOPE[targetName] === 'object'
        ? CORE_SCOPE[targetName]
        : {};

    for (const key of Object.keys(namespace)) {
      existingNamespace[key] = namespace[key];
    }

    const commitMountVoltageInputs = () => {
      if (
        !existingNamespace ||
        (typeof existingNamespace !== 'object' && typeof existingNamespace !== 'function')
      ) {
        return false;
      }

      if (typeof Object.isExtensible === 'function' && !Object.isExtensible(existingNamespace)) {
        return false;
      }

      try {
        Object.defineProperty(existingNamespace, 'mountVoltageInputs', {
          configurable: true,
          enumerable: true,
          get: () => mountVoltageInputs,
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

    const runtimeTargetName = 'MOUNT_VOLTAGE_RUNTIME_EXPORTS';
    let runtimeNamespace = null;
    try {
      runtimeNamespace = CORE_SCOPE[runtimeTargetName];
    } catch (resolveRuntimeError) {
      runtimeNamespace = null;
      void resolveRuntimeError;
    }

    if (!runtimeNamespace || typeof runtimeNamespace !== 'object') {
      runtimeNamespace = {};
    }

    for (const key of Object.keys(runtimeExports)) {
      runtimeNamespace[key] = runtimeExports[key];
    }

    const commitRuntimeMountVoltageInputs = () => {
      if (
        !runtimeNamespace ||
        (typeof runtimeNamespace !== 'object' && typeof runtimeNamespace !== 'function')
      ) {
        return false;
      }

      if (typeof Object.isExtensible === 'function' && !Object.isExtensible(runtimeNamespace)) {
        return false;
      }

      try {
        Object.defineProperty(runtimeNamespace, 'mountVoltageInputs', {
          configurable: true,
          enumerable: true,
          get: () => mountVoltageInputs,
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

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
