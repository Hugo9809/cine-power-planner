(function () {
  var OPTIONAL_CHAINING_FLAG = '__cinePowerOptionalChainingCheck__';

  function getGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    return null;
  }

  function collectStorages(names) {
    var storages = [];
    if (typeof window === 'undefined') {
      return storages;
    }

    for (var i = 0; i < names.length; i += 1) {
      var storage = null;
      try {
        storage = window[names[i]];
      } catch (error) {
        void error;
        storage = null;
      }

      if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
        continue;
      }

      var alreadyAdded = false;
      for (var j = 0; j < storages.length; j += 1) {
        if (storages[j] === storage) {
          alreadyAdded = true;
          break;
        }
      }

      if (!alreadyAdded) {
        storages.push(storage);
      }
    }

    return storages;
  }

  function migrateKey(storage, legacyKey, modernKey) {
    if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
      return false;
    }

    var legacyValue;
    try {
      legacyValue = storage.getItem(legacyKey);
    } catch (readError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to read legacy storage key during migration:', legacyKey, readError);
      }
      return false;
    }

    if (legacyValue === null || typeof legacyValue === 'undefined') {
      return false;
    }

    try {
      var existing = storage.getItem(modernKey);
      if (existing !== null && typeof existing !== 'undefined') {
        return false;
      }
    } catch (inspectionError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to inspect modern storage key during migration:', modernKey, inspectionError);
      }
    }

    try {
      storage.setItem(modernKey, legacyValue);
    } catch (writeError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to migrate legacy storage key:', legacyKey, writeError);
      }
      return false;
    }

    try {
      storage.removeItem(legacyKey);
    } catch (removeError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to remove legacy storage key after migration:', legacyKey, removeError);
      }
    }

    return true;
  }

  function migrateKeyWithBackups(storages, legacyKey, modernKey) {
    var migrated = false;
    var backupSuffix = '__backup';

    for (var i = 0; i < storages.length; i += 1) {
      if (migrateKey(storages[i], legacyKey, modernKey)) {
        migrated = true;
      }

      migrateKey(storages[i], legacyKey + backupSuffix, modernKey + backupSuffix);
    }

    return migrated;
  }

  function migrateLegacyStorageKeys() {
    if (typeof window === 'undefined') {
      return;
    }

    var localStorages = collectStorages(['localStorage']);
    var sessionStorages = collectStorages(['sessionStorage']);

    if (!localStorages.length && !sessionStorages.length) {
      return;
    }

    var legacyPrefix = 'cinePowerPlanner_';
    var mappings = [
      { legacy: legacyPrefix + 'devices', modern: 'cameraPowerPlanner_devices' },
      { legacy: legacyPrefix + 'setups', modern: 'cameraPowerPlanner_setups' },
      { legacy: legacyPrefix + 'session', modern: 'cameraPowerPlanner_session', includeSession: true },
      { legacy: legacyPrefix + 'feedback', modern: 'cameraPowerPlanner_feedback' },
      { legacy: legacyPrefix + 'project', modern: 'cameraPowerPlanner_project' },
      { legacy: legacyPrefix + 'projects', modern: 'cameraPowerPlanner_project' },
      { legacy: legacyPrefix + 'favorites', modern: 'cameraPowerPlanner_favorites' },
      { legacy: legacyPrefix + 'schemaCache', modern: 'cameraPowerPlanner_schemaCache' },
      { legacy: legacyPrefix + 'autoGearRules', modern: 'cameraPowerPlanner_autoGearRules' },
      { legacy: legacyPrefix + 'autoGearBackups', modern: 'cameraPowerPlanner_autoGearBackups' },
      { legacy: legacyPrefix + 'autoGearSeeded', modern: 'cameraPowerPlanner_autoGearSeeded' },
      { legacy: legacyPrefix + 'autoGearPresets', modern: 'cameraPowerPlanner_autoGearPresets' },
      { legacy: legacyPrefix + 'autoGearActivePreset', modern: 'cameraPowerPlanner_autoGearActivePreset' },
      { legacy: legacyPrefix + 'autoGearAutoPreset', modern: 'cameraPowerPlanner_autoGearAutoPreset' },
      { legacy: legacyPrefix + 'autoGearShowBackups', modern: 'cameraPowerPlanner_autoGearShowBackups' },
      { legacy: legacyPrefix + 'autoGearBackupRetention', modern: 'cameraPowerPlanner_autoGearBackupRetention' },
      { legacy: legacyPrefix + 'autoGearMonitorDefaults', modern: 'cameraPowerPlanner_autoGearMonitorDefaults' },
      { legacy: legacyPrefix + 'customFonts', modern: 'cameraPowerPlanner_customFonts', updateFontKey: true }
    ];

    var globalScope = getGlobalScope();

    for (var i = 0; i < mappings.length; i += 1) {
      var mapping = mappings[i];
      var migratedLocal = migrateKeyWithBackups(localStorages, mapping.legacy, mapping.modern);

      if (mapping.includeSession) {
        migrateKeyWithBackups(sessionStorages, mapping.legacy, mapping.modern);
      }

      if (mapping.updateFontKey && migratedLocal && globalScope) {
        if (typeof globalScope.CUSTOM_FONT_STORAGE_KEY === 'string' && globalScope.CUSTOM_FONT_STORAGE_KEY === mapping.legacy) {
          globalScope.CUSTOM_FONT_STORAGE_KEY = mapping.modern;
        }
        if (typeof globalScope.CUSTOM_FONT_STORAGE_KEY_NAME === 'string' && globalScope.CUSTOM_FONT_STORAGE_KEY_NAME === mapping.legacy) {
          globalScope.CUSTOM_FONT_STORAGE_KEY_NAME = mapping.modern;
        }
      }
    }
  }

  function cleanupOptionalFlag(scope) {
    if (!scope) {
      return;
    }
    try {
      delete scope[OPTIONAL_CHAINING_FLAG];
    } catch (deleteError) {
      void deleteError;
      scope[OPTIONAL_CHAINING_FLAG] = undefined;
    }
  }

  function isSyntaxErrorEvent(event) {
    if (!event) {
      return false;
    }

    var error = event;
    if (typeof event === 'object' && event !== null) {
      if (event.error && typeof event.error === 'object') {
        error = event.error;
      }
    }

    if (error && typeof error.name === 'string' && error.name === 'SyntaxError') {
      return true;
    }

    if (typeof SyntaxError !== 'undefined' && error instanceof SyntaxError) {
      return true;
    }

    var message = '';
    if (event && typeof event.message === 'string' && event.message) {
      message = event.message;
    } else if (error && typeof error.message === 'string' && error.message) {
      message = error.message;
    }

    if (!message) {
      return false;
    }

    var lower = message.toLowerCase();
    if (lower.indexOf('unexpected token') !== -1) {
      return true;
    }
    if (lower.indexOf('unexpected character') !== -1) {
      return true;
    }
    if (lower.indexOf('cannot use optional chaining') !== -1) {
      return true;
    }
    if (lower.indexOf('invalid or unexpected token') !== -1) {
      return true;
    }
    if (lower.indexOf('failed to parse module') !== -1) {
      return true;
    }

    return false;
  }

  function isUnsafeEvalAllowed() {
    if (typeof document === 'undefined') {
      return true;
    }

    var metas = document.getElementsByTagName('meta');
    for (var index = 0; index < metas.length; index += 1) {
      var meta = metas[index];
      if (!meta || typeof meta.getAttribute !== 'function') {
        continue;
      }

      var httpEquiv = meta.getAttribute('http-equiv');
      if (!httpEquiv || typeof httpEquiv !== 'string') {
        continue;
      }

      if (httpEquiv.toLowerCase() !== 'content-security-policy') {
        continue;
      }

      var content = meta.getAttribute('content');
      if (!content || typeof content !== 'string') {
        continue;
      }

      var lowerContent = content.toLowerCase();
      var directives = lowerContent.split(';');
      var scriptDirective = null;
      var defaultDirective = null;

      for (var dirIndex = 0; dirIndex < directives.length; dirIndex += 1) {
        var rawDirective = directives[dirIndex];
        if (!rawDirective) {
          continue;
        }

        var directive = rawDirective.trim();
        if (!directive) {
          continue;
        }

        if (directive.indexOf('script-src') === 0) {
          var scriptChar = directive.charAt('script-src'.length);
          if (scriptChar && scriptChar !== ' ' && scriptChar !== "\t" && scriptChar !== "'" && scriptChar !== '"') {
            continue;
          }
          scriptDirective = directive;
        } else if (directive.indexOf('default-src') === 0) {
          defaultDirective = directive;
        }
      }

      var directiveToInspect = scriptDirective || defaultDirective;
      if (directiveToInspect && directiveToInspect.indexOf('unsafe-eval') === -1) {
        return false;
      }

      if (directiveToInspect) {
        return true;
      }
    }

    return true;
  }

  function detectOptionalChainingSupport() {
    if (typeof Function !== 'function') {
      return null;
    }

    if (!isUnsafeEvalAllowed()) {
      return null;
    }

    try {
      var evaluator = Function('"use strict"; return ({ a: { b: 1 } })?.a?.b ?? 2 === 1;');
      return evaluator() === true;
    } catch (error) {
      if (isSyntaxErrorEvent(error)) {
        return false;
      }

      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Optional chaining detection via Function constructor failed unexpectedly. Falling back to module-based check.', error);
      }

      return null;
    }
  }

  function supportsModernFeatures(callback) {
    var cb = typeof callback === 'function' ? callback : function () {};

    if (typeof window === 'undefined') {
      cb(true);
      return;
    }

    if (typeof Promise === 'undefined' || typeof Object.assign !== 'function') {
      cb(false);
      return;
    }

    var arrayProto = Array.prototype;
    var stringProto = String.prototype;

    if (typeof Array.from !== 'function' || typeof arrayProto.includes !== 'function') {
      cb(false);
      return;
    }

    if (typeof arrayProto.find !== 'function' || typeof arrayProto.findIndex !== 'function') {
      cb(false);
      return;
    }

    if (typeof arrayProto.flatMap !== 'function') {
      cb(false);
      return;
    }

    if (typeof Object.entries !== 'function' || typeof Object.fromEntries !== 'function') {
      cb(false);
      return;
    }

    if (typeof stringProto.includes !== 'function' || typeof stringProto.startsWith !== 'function') {
      cb(false);
      return;
    }

    var optionalSupport = detectOptionalChainingSupport();
    if (optionalSupport === true) {
      cb(true);
      return;
    }

    if (optionalSupport === false) {
      cb(false);
      return;
    }

    var globalScope = getGlobalScope();
    var scriptElement = document.createElement('script');

    if (!('noModule' in scriptElement)) {
      cb(false);
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    var optionalCheckScript = document.createElement('script');
    var resolved = false;

    function finalize(result) {
      if (resolved) {
        return;
      }
      resolved = true;

      if (optionalCheckScript.parentNode) {
        optionalCheckScript.parentNode.removeChild(optionalCheckScript);
      }

      cleanupOptionalFlag(globalScope);
      cb(result);
    }

    optionalCheckScript.type = 'module';
    optionalCheckScript.src = 'src/scripts/modern-support-check.mjs';
    optionalCheckScript.onload = function () {
      var supported = !!(globalScope && globalScope[OPTIONAL_CHAINING_FLAG]);
      if (!supported) {
        supported = true;
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Modern support check module loaded without reporting support flag. Assuming modern feature support.');
        }
      }
      finalize(supported);
    };
    optionalCheckScript.onerror = function (event) {
      var supported = !isSyntaxErrorEvent(event);
      if (!supported) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Modern support check failed due to syntax error. Falling back to legacy bundle.', event);
        }
      } else if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Modern support check could not be loaded. Assuming modern feature support.', event);
      }
      finalize(supported);
    };

    try {
      head.appendChild(optionalCheckScript);
    } catch (appendError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to append modern support check script.', appendError);
      }
      finalize(true);
    }
  }

  function loadScriptsSequentially(urls) {
    var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    var index = 0;

    function next() {
      if (index >= urls.length) {
        return;
      }

      var script = document.createElement('script');
      script.src = urls[index];
      script.async = false;
      script.defer = false;
      script.onload = function () {
        index += 1;
        next();
      };
      script.onerror = function (event) {
        console.error('Failed to load script:', urls[index], event && event.error);
        index += 1;
        next();
      };
      head.appendChild(script);
    }

    next();
  }

  var modernScripts = [
    'src/scripts/globalthis-polyfill.js',
    'src/data/devices/index.js',
    'src/data/devices/cameras.js',
    'src/data/devices/monitors.js',
    'src/data/devices/video.js',
    'src/data/devices/fiz.js',
    'src/data/devices/batteries.js',
    'src/data/devices/batteryHotswaps.js',
    'src/data/devices/chargers.js',
    'src/data/devices/cages.js',
    'src/data/devices/gearList.js',
    'src/data/devices/wirelessReceivers.js',
    'src/scripts/storage.js',
    'src/scripts/translations.js',
    'src/vendor/lz-string.min.js',
    'src/vendor/lottie-light.min.js',
    'src/scripts/auto-gear-weight.js',
    'src/scripts/modules/registry.js',
    'src/scripts/modules/offline.js',
    'src/scripts/modules/core-shared.js',
    'src/scripts/modules/ui.js',
    'src/scripts/app-core-new-1.js',
    'src/scripts/app-core-new-2.js',
    'src/scripts/app-events.js',
    'src/scripts/app-setups.js',
    'src/scripts/app-session.js',
    'src/scripts/modules/persistence.js',
    'src/scripts/script.js',
    'src/scripts/auto-gear-monitoring.js',
    'src/scripts/overview.js',
    'src/scripts/autosave-overlay.js'
  ];

  var legacyScripts = [
    'legacy/polyfills/core-js-bundle.min.js',
    'legacy/polyfills/regenerator-runtime.js',
    'legacy/scripts/globalthis-polyfill.js',
    'legacy/data/devices/index.js',
    'legacy/data/devices/cameras.js',
    'legacy/data/devices/monitors.js',
    'legacy/data/devices/video.js',
    'legacy/data/devices/fiz.js',
    'legacy/data/devices/batteries.js',
    'legacy/data/devices/batteryHotswaps.js',
    'legacy/data/devices/chargers.js',
    'legacy/data/devices/cages.js',
    'legacy/data/devices/gearList.js',
    'legacy/data/devices/wirelessReceivers.js',
    'legacy/scripts/storage.js',
    'legacy/scripts/translations.js',
    'src/vendor/lz-string.min.js',
    'src/vendor/lottie-light.min.js',
    'legacy/scripts/auto-gear-weight.js',
    'src/scripts/modules/registry.js',
    'src/scripts/modules/offline.js',
    'src/scripts/modules/core-shared.js',
    'src/scripts/modules/ui.js',
    'legacy/scripts/app-core-new-1.js',
    'legacy/scripts/app-core-new-2.js',
    'legacy/scripts/app-events.js',
    'legacy/scripts/app-setups.js',
    'legacy/scripts/app-session.js',
    'src/scripts/modules/persistence.js',
    'legacy/scripts/script.js',
    'legacy/scripts/auto-gear-monitoring.js',
    'legacy/scripts/overview.js',
    'legacy/scripts/autosave-overlay.js'
  ];

  function startLoading() {
    supportsModernFeatures(function (supportsModern) {
      var scriptsToLoad = supportsModern ? modernScripts : legacyScripts;

      if (!supportsModern) {
        window.__CINE_POWER_LEGACY_BUNDLE__ = true;
      }

      loadScriptsSequentially(scriptsToLoad);
    });
  }

  try {
    migrateLegacyStorageKeys();
  } catch (migrationError) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Legacy storage migration failed during loader startup.', migrationError);
    }
  }

  startLoading();
})();
