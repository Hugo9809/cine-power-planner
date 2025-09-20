(function () {
  function supportsModernFeatures() {
    if (typeof window === 'undefined') {
      return true;
    }

    if (typeof Promise === 'undefined' || typeof Promise.resolve !== 'function') {
      return false;
    }

    if (typeof Object.assign !== 'function' || typeof Object.entries !== 'function' || typeof Object.fromEntries !== 'function') {
      return false;
    }

    var arrayProto = Array.prototype;
    var stringProto = String.prototype;

    if (typeof Array.from !== 'function' || typeof arrayProto.includes !== 'function') {
      return false;
    }

    if (typeof arrayProto.find !== 'function' || typeof arrayProto.findIndex !== 'function') {
      return false;
    }

    if (typeof arrayProto.flatMap !== 'function') {
      return false;
    }

    if (typeof stringProto.includes !== 'function' || typeof stringProto.startsWith !== 'function') {
      return false;
    }

    if (typeof globalThis === 'undefined') {
      return false;
    }

    if (typeof window.Symbol === 'undefined' || typeof window.Set === 'undefined') {
      return false;
    }

    return true;
  }

  function loadScriptsSequentially(urls, options) {
    var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    var index = 0;
    var aborted = false;
    var onFailure = options && typeof options.onFailure === 'function' ? options.onFailure : null;

    function handleFailure(url, event) {
      if (aborted) {
        return;
      }
      aborted = true;
      if (onFailure) {
        onFailure(url, event);
      }
    }

    function next() {
      if (aborted || index >= urls.length) {
        return;
      }

      var url = urls[index];
      var script = document.createElement('script');
      script.src = url;
      script.async = false;
      script.defer = false;
      script.onload = function () {
        if (aborted) {
          return;
        }
        index += 1;
        next();
      };
      script.onerror = function (event) {
        if (typeof console !== 'undefined' && typeof console.error === 'function') {
          console.error('Failed to load script:', url, event && event.error);
        }
        handleFailure(url, event);
      };
      head.appendChild(script);
    }

    next();
  }

  var modernScripts = [
    'src/scripts/feature-check.js',
    'src/scripts/globalthis-polyfill.js',
    'src/data/devices/index.js',
    'src/data/devices/cameras.js',
    'src/data/devices/monitors.js',
    'src/data/devices/video.js',
    'src/data/devices/fiz.js',
    'src/data/devices/batteries.js',
    'src/data/devices/batteryHotswaps.js',
    'src/data/devices/cages.js',
    'src/data/devices/gearList.js',
    'src/data/devices/wirelessReceivers.js',
    'src/scripts/storage.js',
    'src/scripts/translations.js',
    'src/vendor/lz-string.min.js',
    'src/vendor/lottie-light.min.js',
    'src/scripts/script.js',
    'src/scripts/overview.js'
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
    'legacy/data/devices/cages.js',
    'legacy/data/devices/gearList.js',
    'legacy/data/devices/wirelessReceivers.js',
    'legacy/scripts/storage.js',
    'legacy/scripts/translations.js',
    'src/vendor/lz-string.min.js',
    'src/vendor/lottie-light.min.js',
    'legacy/scripts/script.js',
    'legacy/scripts/overview.js'
  ];

  var legacyBundleLoaded = false;

  function loadLegacyBundle(reason) {
    if (legacyBundleLoaded) {
      return;
    }
    legacyBundleLoaded = true;

    if (typeof window !== 'undefined') {
      try {
        window.__CINE_POWER_LEGACY_BUNDLE__ = true;
        if (reason) {
          window.__CINE_POWER_LEGACY_REASON__ = reason;
        }
      } catch {
        window.__CINE_POWER_LEGACY_BUNDLE__ = true;
        if (reason) {
          window.__CINE_POWER_LEGACY_REASON__ = reason;
        }
      }
    }

    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      var parts = ['Legacy bundle enabled.'];
      if (reason) {
        if (reason.message) {
          parts.push(reason.message);
        } else if (reason.type) {
          parts.push('Reason: ' + reason.type);
        }
        if (reason.script) {
          parts.push('Script: ' + reason.script);
        }
      }
      console.warn(parts.join(' '));
    }

    loadScriptsSequentially(legacyScripts);
  }

  if (!supportsModernFeatures()) {
    loadLegacyBundle({
      type: 'feature-detection',
      message: 'Required modern browser features are unavailable.',
    });
    return;
  }

  loadScriptsSequentially(modernScripts, {
    onFailure: function (failedUrl, event) {
      var details = { type: 'load-error' };
      if (failedUrl) {
        details.script = failedUrl;
      }

      var message = 'Falling back to legacy bundle because a modern script failed to load.';
      if (event) {
        var errorMessage = null;
        if (event.message && typeof event.message === 'string') {
          errorMessage = event.message;
        } else if (event.error && typeof event.error.message === 'string') {
          errorMessage = event.error.message;
        }
        if (errorMessage) {
          message += ' ' + errorMessage;
        }
      }
      details.message = message;

      loadLegacyBundle(details);
    },
  });
})();
