(function () {
  function supportsModernFeatures() {
    if (typeof window === 'undefined') {
      return true;
    }

    if (typeof Promise === 'undefined' || typeof Object.assign !== 'function') {
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

    if (typeof Object.entries !== 'function' || typeof Object.fromEntries !== 'function') {
      return false;
    }

    if (typeof stringProto.includes !== 'function' || typeof stringProto.startsWith !== 'function') {
      return false;
    }

    var syntaxTest = function () {
      var test = new Function('var obj = { a: { b: 1 } }; var value = obj?.a?.b ?? 2; return value;');
      return test() === 1;
    };

    var overrideSource = null;
    if (typeof window !== 'undefined') {
      overrideSource = window;
    } else if (typeof globalThis !== 'undefined') {
      overrideSource = globalThis;
    }

    if (overrideSource && typeof overrideSource.__CINE_POWER_SYNTAX_TEST__ === 'function') {
      syntaxTest = overrideSource.__CINE_POWER_SYNTAX_TEST__;
    }

    try {
      return Boolean(syntaxTest());
    } catch (err) {
      var message = (err && err.message) || '';
      var isCspEvalError =
        (typeof EvalError !== 'undefined' && err instanceof EvalError) ||
        (typeof message === 'string' && message.indexOf('unsafe-eval') !== -1);
      if (isCspEvalError) {
        // Treat CSP "unsafe-eval" restrictions as a sign that modern syntax
        // is supported but blocked. We can safely continue to load the modern
        // bundle in this case.
        return true;
      }

      var isSyntaxError = false;
      if (typeof SyntaxError !== 'undefined' && err instanceof SyntaxError) {
        isSyntaxError = true;
      } else if (typeof message === 'string' && message) {
        isSyntaxError = /syntax|unexpected token|parse error|unterminated|invalid|expected/i.test(message);
      }

      if (!isSyntaxError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn(
            'Modern bundle enabled despite unexpected error during syntax support detection.',
            err,
          );
        }
        return true;
      }

      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Legacy bundle enabled: falling back due to syntax support test failure.', err);
      }
      return false;
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

  var scriptsToLoad = supportsModernFeatures() ? modernScripts : legacyScripts;

  if (typeof window !== 'undefined' && scriptsToLoad === legacyScripts) {
    window.__CINE_POWER_LEGACY_BUNDLE__ = true;
  }

  if (typeof document !== 'undefined' && document) {
    loadScriptsSequentially(scriptsToLoad);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      supportsModernFeatures: supportsModernFeatures,
      loadScriptsSequentially: loadScriptsSequentially,
      modernScripts: modernScripts,
      legacyScripts: legacyScripts,
    };
  }
})();
