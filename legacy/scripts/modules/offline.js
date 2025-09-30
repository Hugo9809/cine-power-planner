function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : {};
  function tryRequire(modulePath) {
    if (typeof require !== 'function') {
      return null;
    }
    try {
      return require(modulePath);
    } catch (error) {
      void error;
      return null;
    }
  }
  function resolveModuleRegistry() {
    var required = tryRequire('./registry.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var scopes = [GLOBAL_SCOPE];
    if (typeof globalThis !== 'undefined' && scopes.indexOf(globalThis) === -1) scopes.push(globalThis);
    if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
    if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
    if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (scope && _typeof(scope.cineModules) === 'object') {
        return scope.cineModules;
      }
    }
    return null;
  }
  var MODULE_REGISTRY = resolveModuleRegistry();
  var PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';
  function queueModuleRegistration(name, api, options) {
    if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object') {
      return false;
    }
    var payload = Object.freeze({
      name: name,
      api: api,
      options: Object.freeze(_objectSpread({}, options || {}))
    });
    var queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
    if (!Array.isArray(queue)) {
      try {
        Object.defineProperty(GLOBAL_SCOPE, PENDING_QUEUE_KEY, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: []
        });
        queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
      } catch (error) {
        void error;
        try {
          if (!Array.isArray(GLOBAL_SCOPE[PENDING_QUEUE_KEY])) {
            GLOBAL_SCOPE[PENDING_QUEUE_KEY] = [];
          }
          queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
        } catch (assignmentError) {
          void assignmentError;
          return false;
        }
      }
    }
    try {
      queue.push(payload);
    } catch (error) {
      void error;
      queue[queue.length] = payload;
    }
    return true;
  }
  function registerOrQueueModule(name, api, options, onError) {
    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.register === 'function') {
      try {
        MODULE_REGISTRY.register(name, api, options);
        return true;
      } catch (error) {
        if (typeof onError === 'function') {
          onError(error);
        } else {
          void error;
        }
      }
    }
    queueModuleRegistration(name, api, options);
    return false;
  }
  var UI_CACHE_STORAGE_KEYS_FOR_RELOAD = ['cameraPowerPlanner_schemaCache', 'cinePowerPlanner_schemaCache'];
  var UI_CACHE_STORAGE_SUFFIXES_FOR_RELOAD = ['', '__backup', '__legacyMigrationBackup'];
  var uiCacheFallbackWarningKeys = new Set();
  var pendingServiceWorkerRegistration = null;
  function resolveGlobal(name) {
    if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object' && typeof GLOBAL_SCOPE !== 'function') {
      return undefined;
    }
    try {
      return GLOBAL_SCOPE[name];
    } catch (error) {
      void error;
      return undefined;
    }
  }
  function resolveWindow(explicitWindow) {
    if (explicitWindow) {
      return explicitWindow;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    return resolveGlobal('window');
  }
  function resolveNavigator(explicitNavigator) {
    if (explicitNavigator) {
      return explicitNavigator;
    }
    if (typeof navigator !== 'undefined') {
      return navigator;
    }
    var win = resolveWindow();
    if (win && typeof win.navigator !== 'undefined') {
      return win.navigator;
    }
    return resolveGlobal('navigator');
  }
  function resolveCaches(explicitCaches) {
    if (explicitCaches) {
      return explicitCaches;
    }
    if (typeof caches !== 'undefined') {
      return caches;
    }
    var win = resolveWindow();
    if (win && typeof win.caches !== 'undefined') {
      return win.caches;
    }
    return resolveGlobal('caches');
  }
  function safeWarn(message, error) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      try {
        if (typeof error !== 'undefined') {
          console.warn(message, error);
        } else {
          console.warn(message);
        }
      } catch (warnError) {
        void warnError;
      }
    }
  }
  function registerFallbackStorage(storages, candidate, label) {
    void label;
    if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
      return;
    }
    var hasRemove = typeof candidate.removeItem === 'function';
    var hasDelete = typeof candidate.delete === 'function';
    if (!hasRemove && !hasDelete) {
      return;
    }
    storages.add(candidate);
  }
  function inspectScopeForStorages(storages, scope, label) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }
    try {
      registerFallbackStorage(storages, scope.SAFE_LOCAL_STORAGE, "".concat(label, ".SAFE_LOCAL_STORAGE"));
    } catch (error) {
      var key = "".concat(label, ".SAFE_LOCAL_STORAGE");
      if (!uiCacheFallbackWarningKeys.has(key)) {
        uiCacheFallbackWarningKeys.add(key);
        safeWarn("Unable to inspect ".concat(key, " while clearing UI caches"), error);
      }
    }
    try {
      registerFallbackStorage(storages, scope.localStorage, "".concat(label, ".localStorage"));
    } catch (error) {
      var _key = "".concat(label, ".localStorage");
      if (!uiCacheFallbackWarningKeys.has(_key)) {
        uiCacheFallbackWarningKeys.add(_key);
        safeWarn("Unable to inspect ".concat(_key, " while clearing UI caches"), error);
      }
    }
    try {
      registerFallbackStorage(storages, scope.sessionStorage, "".concat(label, ".sessionStorage"));
    } catch (error) {
      var _key2 = "".concat(label, ".sessionStorage");
      if (!uiCacheFallbackWarningKeys.has(_key2)) {
        uiCacheFallbackWarningKeys.add(_key2);
        safeWarn("Unable to inspect ".concat(_key2, " while clearing UI caches"), error);
      }
    }
    var nested = null;
    try {
      nested = scope.__cineGlobal;
    } catch (error) {
      var _key3 = "".concat(label, ".__cineGlobal");
      if (!uiCacheFallbackWarningKeys.has(_key3)) {
        uiCacheFallbackWarningKeys.add(_key3);
        safeWarn("Unable to inspect ".concat(_key3, " while clearing UI caches"), error);
      }
    }
    if (nested && nested !== scope) {
      inspectScopeForStorages(storages, nested, "".concat(label, ".__cineGlobal"));
    }
  }
  function collectFallbackUiCacheStorages() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var storages = new Set();
    var resolveSafeLocalStorageFn = typeof options.resolveSafeLocalStorage === 'function' ? options.resolveSafeLocalStorage : typeof resolveGlobal('resolveSafeLocalStorage') === 'function' ? resolveGlobal('resolveSafeLocalStorage') : null;
    var safeLocalStorageInstance = options.safeLocalStorage || resolveGlobal('SAFE_LOCAL_STORAGE');
    try {
      var resolved = resolveSafeLocalStorageFn ? resolveSafeLocalStorageFn() : null;
      registerFallbackStorage(storages, resolved, 'safeLocalStorage');
    } catch (error) {
      safeWarn('resolveSafeLocalStorage() failed while collecting UI cache storages', error);
    }
    if (safeLocalStorageInstance) {
      try {
        registerFallbackStorage(storages, safeLocalStorageInstance, 'SAFE_LOCAL_STORAGE');
      } catch (error) {
        var key = 'SAFE_LOCAL_STORAGE';
        if (!uiCacheFallbackWarningKeys.has(key)) {
          uiCacheFallbackWarningKeys.add(key);
          safeWarn('Unable to inspect SAFE_LOCAL_STORAGE while clearing UI caches', error);
        }
      }
    }
    var candidates = options.scopeCandidates || [{
      scope: resolveGlobal('globalThis'),
      label: 'globalThis'
    }, {
      scope: resolveWindow(options.window),
      label: 'window'
    }, {
      scope: typeof self !== 'undefined' ? self : resolveGlobal('self'),
      label: 'self'
    }, {
      scope: resolveGlobal('global'),
      label: 'global'
    }];
    var cineGlobal = typeof GLOBAL_SCOPE !== 'undefined' ? GLOBAL_SCOPE.__cineGlobal : undefined;
    if (typeof cineGlobal !== 'undefined') {
      candidates.push({
        scope: cineGlobal,
        label: '__cineGlobal'
      });
    }
    candidates.forEach(function (_ref) {
      var scope = _ref.scope,
        label = _ref.label;
      inspectScopeForStorages(storages, scope, label);
    });
    var win = resolveWindow(options.window);
    if (win) {
      try {
        registerFallbackStorage(storages, win.localStorage, 'window.localStorage');
      } catch (error) {
        var _key4 = 'window.localStorage';
        if (!uiCacheFallbackWarningKeys.has(_key4)) {
          uiCacheFallbackWarningKeys.add(_key4);
          safeWarn('Unable to inspect window.localStorage while clearing UI caches', error);
        }
      }
      try {
        registerFallbackStorage(storages, win.sessionStorage, 'window.sessionStorage');
      } catch (error) {
        var _key5 = 'window.sessionStorage';
        if (!uiCacheFallbackWarningKeys.has(_key5)) {
          uiCacheFallbackWarningKeys.add(_key5);
          safeWarn('Unable to inspect window.sessionStorage while clearing UI caches', error);
        }
      }
    }
    return storages;
  }
  function clearUiCacheEntriesFallback() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var storages = options.storages || collectFallbackUiCacheStorages(options);
    if (!storages || !storages.size) {
      return false;
    }
    var clearedAny = false;
    storages.forEach(function (storage) {
      UI_CACHE_STORAGE_KEYS_FOR_RELOAD.forEach(function (baseKey) {
        if (typeof baseKey !== 'string' || !baseKey) {
          return;
        }
        UI_CACHE_STORAGE_SUFFIXES_FOR_RELOAD.forEach(function (suffix) {
          var entryKey = suffix ? "".concat(baseKey).concat(suffix) : baseKey;
          try {
            if (typeof storage.removeItem === 'function') {
              storage.removeItem(entryKey);
              clearedAny = true;
            } else if (typeof storage.delete === 'function') {
              storage.delete(entryKey);
              clearedAny = true;
            }
          } catch (error) {
            safeWarn('Failed to remove UI cache entry', {
              entryKey: entryKey,
              error: error
            });
          }
        });
      });
    });
    return clearedAny;
  }
  function unregisterServiceWorkers(_x) {
    return _unregisterServiceWorkers.apply(this, arguments);
  }
  function _unregisterServiceWorkers() {
    _unregisterServiceWorkers = _asyncToGenerator(_regenerator().m(function _callee(navigatorOverride) {
      var nav, registrations, serviceWorker, regs, reg, readyReg, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            nav = resolveNavigator(navigatorOverride);
            if (!(!nav || !nav.serviceWorker)) {
              _context.n = 1;
              break;
            }
            return _context.a(2, false);
          case 1:
            registrations = [];
            serviceWorker = nav.serviceWorker;
            _context.p = 2;
            if (!(typeof serviceWorker.getRegistrations === 'function')) {
              _context.n = 4;
              break;
            }
            _context.n = 3;
            return serviceWorker.getRegistrations();
          case 3:
            regs = _context.v;
            if (Array.isArray(regs)) {
              regs.forEach(function (reg) {
                if (reg) {
                  registrations.push(reg);
                }
              });
            }
            _context.n = 10;
            break;
          case 4:
            if (!(typeof serviceWorker.getRegistration === 'function')) {
              _context.n = 6;
              break;
            }
            _context.n = 5;
            return serviceWorker.getRegistration();
          case 5:
            reg = _context.v;
            if (reg) {
              registrations.push(reg);
            }
            _context.n = 10;
            break;
          case 6:
            if (!(serviceWorker.ready && typeof serviceWorker.ready.then === 'function')) {
              _context.n = 10;
              break;
            }
            _context.p = 7;
            _context.n = 8;
            return serviceWorker.ready;
          case 8:
            readyReg = _context.v;
            if (readyReg) {
              registrations.push(readyReg);
            }
            _context.n = 10;
            break;
          case 9:
            _context.p = 9;
            _t = _context.v;
            safeWarn('Failed to await active service worker', _t);
          case 10:
            _context.n = 12;
            break;
          case 11:
            _context.p = 11;
            _t2 = _context.v;
            safeWarn('Failed to query service worker registrations', _t2);
          case 12:
            if (registrations.length) {
              _context.n = 13;
              break;
            }
            return _context.a(2, false);
          case 13:
            _context.n = 14;
            return Promise.all(registrations.map(function (registration) {
              if (!registration || typeof registration.unregister !== 'function') {
                return Promise.resolve(false);
              }
              return registration.unregister().catch(function (error) {
                safeWarn('Service worker unregister failed', error);
                return false;
              });
            }));
          case 14:
            return _context.a(2, true);
        }
      }, _callee, null, [[7, 9], [2, 11]]);
    }));
    return _unregisterServiceWorkers.apply(this, arguments);
  }
  function clearCacheStorage(_x2) {
    return _clearCacheStorage.apply(this, arguments);
  }
  function _clearCacheStorage() {
    _clearCacheStorage = _asyncToGenerator(_regenerator().m(function _callee2(cachesOverride) {
      var cachesInstance, keys, _t3;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            cachesInstance = resolveCaches(cachesOverride);
            if (!(!cachesInstance || typeof cachesInstance.keys !== 'function')) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, false);
          case 1:
            _context2.p = 1;
            _context2.n = 2;
            return cachesInstance.keys();
          case 2:
            keys = _context2.v;
            if (!(!Array.isArray(keys) || !keys.length)) {
              _context2.n = 3;
              break;
            }
            return _context2.a(2, false);
          case 3:
            _context2.n = 4;
            return Promise.all(keys.map(function (key) {
              if (!key || typeof cachesInstance.delete !== 'function') {
                return Promise.resolve(false);
              }
              return cachesInstance.delete(key).catch(function (error) {
                safeWarn('Failed to delete cache', {
                  key: key,
                  error: error
                });
                return false;
              });
            }));
          case 4:
            return _context2.a(2, true);
          case 5:
            _context2.p = 5;
            _t3 = _context2.v;
            safeWarn('Cache clear failed', _t3);
            return _context2.a(2, false);
        }
      }, _callee2, null, [[1, 5]]);
    }));
    return _clearCacheStorage.apply(this, arguments);
  }
  function triggerReload(windowOverride) {
    var win = resolveWindow(windowOverride);
    if (!win || !win.location) {
      return false;
    }
    var location = win.location;
    var hasReplace = location && typeof location.replace === 'function';
    var hasReload = location && typeof location.reload === 'function';
    var navigationTriggered = false;
    if (hasReplace) {
      try {
        var paramName = 'forceReload';
        var timestamp = Date.now().toString(36);
        var href = location.href || '';
        var hash = '';
        var hashIndex = href.indexOf('#');
        if (hashIndex !== -1) {
          hash = href.slice(hashIndex);
          href = href.slice(0, hashIndex);
        }
        var pattern = new RegExp("([?&])".concat(paramName, "=[^&]*"));
        var replacement = "$1".concat(paramName, "=").concat(timestamp);
        if (pattern.test(href)) {
          href = href.replace(pattern, replacement);
        } else if (href.indexOf('?') !== -1) {
          href += "&".concat(paramName, "=").concat(timestamp);
        } else if (href) {
          href += "?".concat(paramName, "=").concat(timestamp);
        }
        location.replace(href + hash);
        navigationTriggered = true;
      } catch (replaceError) {
        safeWarn('Forced reload via location.replace failed', replaceError);
      }
    }
    if (!navigationTriggered && hasReload) {
      try {
        location.reload();
        navigationTriggered = true;
      } catch (reloadError) {
        safeWarn('Forced reload via location.reload failed', reloadError);
      }
    }
    return navigationTriggered;
  }
  function reloadApp() {
    return _reloadApp.apply(this, arguments);
  }
  function _reloadApp() {
    _reloadApp = _asyncToGenerator(_regenerator().m(function _callee3() {
      var options,
        uiCacheCleared,
        clearUiCacheStorageEntriesFn,
        serviceWorkersUnregistered,
        cachesCleared,
        reloadTriggered,
        reloadFn,
        win,
        _args3 = arguments,
        _t4,
        _t5;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
            uiCacheCleared = false;
            clearUiCacheStorageEntriesFn = typeof options.clearUiCacheStorageEntries === 'function' ? options.clearUiCacheStorageEntries : typeof resolveGlobal('clearUiCacheStorageEntries') === 'function' ? resolveGlobal('clearUiCacheStorageEntries') : null;
            if (clearUiCacheStorageEntriesFn) {
              try {
                clearUiCacheStorageEntriesFn();
                uiCacheCleared = true;
              } catch (error) {
                safeWarn('Failed to clear UI caches via storage helper', error);
              }
            }
            if (!uiCacheCleared) {
              try {
                uiCacheCleared = clearUiCacheEntriesFallback(options);
              } catch (fallbackError) {
                safeWarn('Fallback UI cache clear failed', fallbackError);
              }
            }
            serviceWorkersUnregistered = false;
            _context3.p = 1;
            _context3.n = 2;
            return unregisterServiceWorkers(options.navigator);
          case 2:
            serviceWorkersUnregistered = _context3.v;
            _context3.n = 4;
            break;
          case 3:
            _context3.p = 3;
            _t4 = _context3.v;
            safeWarn('Service worker cleanup failed', _t4);
          case 4:
            cachesCleared = false;
            _context3.p = 5;
            _context3.n = 6;
            return clearCacheStorage(options.caches);
          case 6:
            cachesCleared = _context3.v;
            _context3.n = 8;
            break;
          case 7:
            _context3.p = 7;
            _t5 = _context3.v;
            safeWarn('Cache clear failed', _t5);
          case 8:
            reloadTriggered = false;
            reloadFn = typeof options.reloadWindow === 'function' ? options.reloadWindow : triggerReload;
            try {
              reloadTriggered = reloadFn(options.window);
            } catch (error) {
              safeWarn('Forced reload handler failed', error);
              reloadTriggered = triggerReload(options.window);
            }
            if (!reloadTriggered) {
              win = resolveWindow(options.window);
              if (win && win.location && typeof win.location.reload === 'function') {
                try {
                  win.location.reload();
                  reloadTriggered = true;
                } catch (finalError) {
                  safeWarn('Final reload attempt failed', finalError);
                }
              }
            }
            return _context3.a(2, {
              uiCacheCleared: uiCacheCleared,
              serviceWorkersUnregistered: serviceWorkersUnregistered,
              cachesCleared: cachesCleared,
              reloadTriggered: reloadTriggered
            });
        }
      }, _callee3, null, [[5, 7], [1, 3]]);
    }));
    return _reloadApp.apply(this, arguments);
  }
  function shouldRegisterImmediately(win) {
    if (!win || !win.document) {
      return false;
    }
    var document = win.document;
    if (typeof document.readyState === 'string') {
      return document.readyState === 'complete';
    }
    return false;
  }
  function registerServiceWorker() {
    var scriptUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'service-worker.js';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var win = resolveWindow(options.window);
    var nav = resolveNavigator(options.navigator);
    if (!nav || !nav.serviceWorker || typeof nav.serviceWorker.register !== 'function') {
      return Promise.resolve(null);
    }
    var register = function register() {
      try {
        var promise = nav.serviceWorker.register(scriptUrl, options.registrationOptions);
        promise.catch(function (error) {
          safeWarn('Service worker registration failed', error);
        });
        return promise;
      } catch (error) {
        safeWarn('Service worker registration threw an exception', error);
        return Promise.reject(error);
      }
    };
    if (!win || typeof win.addEventListener !== 'function') {
      return register();
    }
    if (pendingServiceWorkerRegistration) {
      return pendingServiceWorkerRegistration;
    }
    if (shouldRegisterImmediately(win) || options.immediate === true) {
      pendingServiceWorkerRegistration = register();
      return pendingServiceWorkerRegistration;
    }
    pendingServiceWorkerRegistration = new Promise(function (resolve) {
      var _handler = function handler() {
        try {
          win.removeEventListener('load', _handler);
        } catch (error) {
          void error;
        }
        resolve(register());
      };
      win.addEventListener('load', _handler, {
        once: true
      });
    });
    return pendingServiceWorkerRegistration;
  }
  function freezeDeep(value) {
    var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakSet();
    if (!value || _typeof(value) !== 'object') {
      return value;
    }
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    var keys = Object.getOwnPropertyNames(value);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      var descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || 'get' in descriptor || 'set' in descriptor) {
        continue;
      }
      freezeDeep(descriptor.value, seen);
    }
    return Object.freeze(value);
  }
  var offlineAPI = {
    registerServiceWorker: registerServiceWorker,
    reloadApp: reloadApp,
    __internal: {
      collectFallbackUiCacheStorages: collectFallbackUiCacheStorages,
      clearUiCacheEntriesFallback: clearUiCacheEntriesFallback,
      unregisterServiceWorkers: unregisterServiceWorkers,
      clearCacheStorage: clearCacheStorage,
      triggerReload: triggerReload
    }
  };
  freezeDeep(offlineAPI);
  registerOrQueueModule('cineOffline', offlineAPI, {
    category: 'offline',
    description: 'Offline helpers for service worker registration and cache recovery.',
    replace: true
  }, function (error) {
    safeWarn('Unable to register cineOffline in module registry.', error);
  });
  if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
    try {
      if (GLOBAL_SCOPE.cineOffline !== offlineAPI) {
        Object.defineProperty(GLOBAL_SCOPE, 'cineOffline', {
          configurable: true,
          enumerable: false,
          value: offlineAPI,
          writable: false
        });
      }
    } catch (error) {
      safeWarn('Unable to expose cineOffline globally.', error);
    }
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = offlineAPI;
  }
})();