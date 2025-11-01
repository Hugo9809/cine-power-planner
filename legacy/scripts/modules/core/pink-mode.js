function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function getModuleDirectory(moduleId) {
    var segments = moduleId.split('/');
    segments.pop();
    return segments.join('/');
  }
  function normalizeFromDir(moduleDir, request) {
    var segments = moduleDir ? moduleDir.split('/') : [];
    var parts = request.split('/');
    for (var index = 0; index < parts.length; index += 1) {
      var segment = parts[index];
      if (!segment || segment === '.') {
        continue;
      }
      if (segment === '..') {
        if (segments.length) {
          segments.pop();
        }
        continue;
      }
      segments.push(segment);
    }
    return segments.join('/');
  }
  var MODULE_FACTORIES = {
    'modules/core/pink-mode-animations.js': function modules_core_pinkModeAnimationsJs(module, exports, require) {
      (function () {
        function detectGlobalScope() {
          if (typeof globalThis !== "undefined" && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object") {
            return globalThis;
          }
          if (typeof window !== "undefined" && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") {
            return window;
          }
          if (typeof self !== "undefined" && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object") {
            return self;
          }
          if (typeof global !== "undefined" && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === "object") {
            return global;
          }
          return null;
        }
        var GLOBAL_SCOPE = detectGlobalScope();
        function normalizePinkModeAssetKey(path) {
          if (typeof path !== 'string') {
            return '';
          }
          var trimmed = path.trim();
          return trimmed;
        }
        function normalizePinkModeBaseHref(href) {
          if (typeof href !== 'string' || !href) {
            return '';
          }
          var fallbackBase = GLOBAL_SCOPE && GLOBAL_SCOPE.location && typeof GLOBAL_SCOPE.location.href === 'string' && GLOBAL_SCOPE.location.href || (typeof location !== 'undefined' && location && typeof location.href === 'string' ? location.href : undefined);
          try {
            var url = fallbackBase ? new URL(href, fallbackBase) : new URL(href);
            var path = typeof url.pathname === 'string' ? url.pathname : '';
            var baseAdjusted = false;
            if (path) {
              var stripSegments = Object.freeze(['/src/scripts/', '/scripts/', '/legacy/scripts/']);
              for (var index = 0; index < stripSegments.length; index += 1) {
                var marker = stripSegments[index];
                var markerIndex = path.indexOf(marker);
                if (markerIndex === -1) {
                  continue;
                }
                var basePath = path.slice(0, markerIndex);
                if (basePath) {
                  url.pathname = basePath.endsWith('/') ? basePath : "".concat(basePath, "/");
                } else {
                  url.pathname = '/';
                }
                baseAdjusted = true;
                break;
              }
            }
            if (!baseAdjusted && path && !path.endsWith('/')) {
              var lastSlash = path.lastIndexOf('/');
              var lastSegment = lastSlash !== -1 ? path.slice(lastSlash + 1) : path;
              if (lastSegment && lastSegment.indexOf('.') === -1) {
                url.pathname = "".concat(path, "/");
              } else {
                url.pathname = lastSlash >= 0 ? path.slice(0, lastSlash + 1) : '/';
              }
            }
            if (!url.pathname.endsWith('/')) {
              url.pathname = "".concat(url.pathname, "/");
            }
            url.search = '';
            url.hash = '';
            return url.href;
          } catch (error) {
            void error;
            return '';
          }
        }
        function resolvePinkModeAssetBaseUrl() {
          var candidates = [];
          if (typeof document !== 'undefined' && document) {
            if (typeof document.baseURI === 'string' && document.baseURI) {
              candidates.push(document.baseURI);
            }
            if (document.currentScript && document.currentScript.src) {
              candidates.push(document.currentScript.src);
            }
          }
          if (GLOBAL_SCOPE && GLOBAL_SCOPE.location && typeof GLOBAL_SCOPE.location.href === 'string' && GLOBAL_SCOPE.location.href) {
            candidates.push(GLOBAL_SCOPE.location.href);
          }
          if (typeof location !== 'undefined' && location && typeof location.href === 'string' && location.href) {
            candidates.push(location.href);
          }
          for (var index = 0; index < candidates.length; index += 1) {
            var normalized = normalizePinkModeBaseHref(candidates[index]);
            if (normalized) {
              return normalized;
            }
          }
          return '';
        }
        function resolvePinkModeAssetUrl(path) {
          var normalized = normalizePinkModeAssetKey(path);
          if (!normalized) {
            return null;
          }
          var encodedNormalized = encodeURI(normalized);
          if (normalized.slice(0, 2) === '//' || normalized.indexOf('://') !== -1) {
            try {
              return new URL(normalized).href;
            } catch (error) {
              void error;
              return encodedNormalized;
            }
          }
          var baseUrl = resolvePinkModeAssetBaseUrl();
          if (!baseUrl) {
            return encodedNormalized;
          }
          try {
            return new URL(normalized, baseUrl).href;
          } catch (error) {
            void error;
          }
          try {
            return new URL(encodedNormalized, baseUrl).href;
          } catch (encodedError) {
            void encodedError;
          }
          if (encodedNormalized.charAt(0) === '/') {
            return encodedNormalized;
          }
          if (baseUrl.charAt(baseUrl.length - 1) === '/') {
            return baseUrl + encodedNormalized;
          }
          return "".concat(baseUrl, "/").concat(encodedNormalized);
        }
        function createPinkModeAssetRequest(url) {
          if (typeof Request !== 'function' || !url) {
            return null;
          }
          try {
            return new Request(url, {
              credentials: 'same-origin'
            });
          } catch (error) {
            void error;
            return null;
          }
        }
        function readResponseTextSafe(_x) {
          return _readResponseTextSafe.apply(this, arguments);
        }
        function _readResponseTextSafe() {
          _readResponseTextSafe = _asyncToGenerator(_regenerator().m(function _callee2(response) {
            var _t3;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.p = _context2.n) {
                case 0:
                  if (response) {
                    _context2.n = 1;
                    break;
                  }
                  return _context2.a(2, null);
                case 1:
                  _context2.p = 1;
                  _context2.n = 2;
                  return response.text();
                case 2:
                  return _context2.a(2, _context2.v);
                case 3:
                  _context2.p = 3;
                  _t3 = _context2.v;
                  console.warn('Could not read pink mode asset response text', _t3);
                  return _context2.a(2, null);
              }
            }, _callee2, null, [[1, 3]]);
          }));
          return _readResponseTextSafe.apply(this, arguments);
        }
        function fetchPinkModeAssetFromNetwork(_x2) {
          return _fetchPinkModeAssetFromNetwork.apply(this, arguments);
        }
        function _fetchPinkModeAssetFromNetwork() {
          _fetchPinkModeAssetFromNetwork = _asyncToGenerator(_regenerator().m(function _callee3(requestOrUrl) {
            var response, _t4;
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.p = _context3.n) {
                case 0:
                  if (!(typeof fetch !== 'function' || !requestOrUrl)) {
                    _context3.n = 1;
                    break;
                  }
                  return _context3.a(2, null);
                case 1:
                  _context3.p = 1;
                  _context3.n = 2;
                  return fetch(requestOrUrl);
                case 2:
                  response = _context3.v;
                  if (response) {
                    _context3.n = 3;
                    break;
                  }
                  return _context3.a(2, null);
                case 3:
                  if (!(response.ok || response.type === 'opaque')) {
                    _context3.n = 4;
                    break;
                  }
                  return _context3.a(2, readResponseTextSafe(response.clone()));
                case 4:
                  _context3.n = 6;
                  break;
                case 5:
                  _context3.p = 5;
                  _t4 = _context3.v;
                  void _t4;
                case 6:
                  return _context3.a(2, null);
              }
            }, _callee3, null, [[1, 5]]);
          }));
          return _fetchPinkModeAssetFromNetwork.apply(this, arguments);
        }
        function fetchPinkModeAssetFromCaches(_x3) {
          return _fetchPinkModeAssetFromCaches.apply(this, arguments);
        }
        function _fetchPinkModeAssetFromCaches() {
          _fetchPinkModeAssetFromCaches = _asyncToGenerator(_regenerator().m(function _callee4(requestOrUrl) {
            var cached, _t5;
            return _regenerator().w(function (_context4) {
              while (1) switch (_context4.p = _context4.n) {
                case 0:
                  if (!(typeof caches === 'undefined' || !caches || typeof caches.match !== 'function' || !requestOrUrl)) {
                    _context4.n = 1;
                    break;
                  }
                  return _context4.a(2, null);
                case 1:
                  _context4.p = 1;
                  _context4.n = 2;
                  return caches.match(requestOrUrl, {
                    ignoreSearch: true
                  });
                case 2:
                  cached = _context4.v;
                  if (cached) {
                    _context4.n = 3;
                    break;
                  }
                  return _context4.a(2, null);
                case 3:
                  return _context4.a(2, readResponseTextSafe(cached.clone()));
                case 4:
                  _context4.p = 4;
                  _t5 = _context4.v;
                  console.warn('Could not load pink mode asset from cache storage', _t5);
                  return _context4.a(2, null);
              }
            }, _callee4, null, [[1, 4]]);
          }));
          return _fetchPinkModeAssetFromCaches.apply(this, arguments);
        }
        function createPinkModeXhrUrlVariants(url) {
          var variants = [];
          var registerVariant = function registerVariant(candidate) {
            if (typeof candidate !== 'string' || !candidate) {
              return;
            }
            if (variants.indexOf(candidate) === -1) {
              variants.push(candidate);
            }
          };
          registerVariant(url);
          if (typeof url === 'string') {
            try {
              var decoded = decodeURI(url);
              registerVariant(decoded);
            } catch (decodeError) {
              void decodeError;
            }
          }
          return variants;
        }
        function fetchPinkModeAssetViaXHR(_x4) {
          return _fetchPinkModeAssetViaXHR.apply(this, arguments);
        }
        function _fetchPinkModeAssetViaXHR() {
          _fetchPinkModeAssetViaXHR = _asyncToGenerator(_regenerator().m(function _callee5(url) {
            var candidates, _loop, _ret, index;
            return _regenerator().w(function (_context6) {
              while (1) switch (_context6.n) {
                case 0:
                  if (!(typeof XMLHttpRequest === 'undefined' || !url)) {
                    _context6.n = 1;
                    break;
                  }
                  return _context6.a(2, null);
                case 1:
                  candidates = createPinkModeXhrUrlVariants(url);
                  _loop = _regenerator().m(function _loop() {
                    var candidateUrl, result;
                    return _regenerator().w(function (_context5) {
                      while (1) switch (_context5.n) {
                        case 0:
                          candidateUrl = candidates[index];
                          _context5.n = 1;
                          return new Promise(function (resolve) {
                            try {
                              var request = new XMLHttpRequest();
                              request.open('GET', candidateUrl, true);
                              request.onreadystatechange = function handleReadyStateChange() {
                                if (request.readyState !== 4) {
                                  return;
                                }
                                if (request.status >= 200 && request.status < 300 || request.status === 0) {
                                  resolve(request.responseText || '');
                                  return;
                                }
                                resolve(null);
                              };
                              request.onerror = function handleXHRError() {
                                resolve(null);
                              };
                              request.send();
                            } catch (error) {
                              void error;
                              resolve(null);
                            }
                          });
                        case 1:
                          result = _context5.v;
                          if (!(result !== null)) {
                            _context5.n = 2;
                            break;
                          }
                          return _context5.a(2, {
                            v: result
                          });
                        case 2:
                          return _context5.a(2);
                      }
                    }, _loop);
                  });
                  index = 0;
                case 2:
                  if (!(index < candidates.length)) {
                    _context6.n = 5;
                    break;
                  }
                  return _context6.d(_regeneratorValues(_loop()), 3);
                case 3:
                  _ret = _context6.v;
                  if (!_ret) {
                    _context6.n = 4;
                    break;
                  }
                  return _context6.a(2, _ret.v);
                case 4:
                  index += 1;
                  _context6.n = 2;
                  break;
                case 5:
                  return _context6.a(2, null);
              }
            }, _callee5);
          }));
          return _fetchPinkModeAssetViaXHR.apply(this, arguments);
        }
        var pinkModeAssetTextCache = new Map();
        var pinkModeAssetTextPromiseCache = new Map();
        function getPinkModeEmbeddedAssetStore() {
          var scope = GLOBAL_SCOPE || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || null;
          if (!scope) {
            return null;
          }
          try {
            var store = scope.cinePinkModeAnimatedIconData;
            if (store && _typeof(store) === 'object') {
              return store;
            }
          } catch (error) {
            void error;
          }
          return null;
        }
        function resolvePinkModeEmbeddedAsset(key) {
          if (typeof key !== 'string' || !key) {
            return null;
          }
          var store = getPinkModeEmbeddedAssetStore();
          if (!store) {
            return null;
          }
          var candidates = [];
          var registerCandidate = function registerCandidate(candidate) {
            if (typeof candidate !== 'string' || !candidate) {
              return;
            }
            if (candidates.indexOf(candidate) === -1) {
              candidates.push(candidate);
            }
          };
          registerCandidate(key);
          var trimmed = key.replace(/^\.\/+/, '');
          if (trimmed && trimmed !== key) {
            registerCandidate(trimmed);
          }
          var decoded = decodePinkModeUriCandidate(key);
          if (decoded) {
            registerCandidate(decoded);
          }
          var encoded = encodeURI(key);
          if (encoded && encoded !== key) {
            registerCandidate(encoded);
          }
          if (trimmed) {
            var encodedTrimmed = encodeURI(trimmed);
            if (encodedTrimmed && encodedTrimmed !== trimmed) {
              registerCandidate(encodedTrimmed);
            }
          }
          for (var index = 0; index < candidates.length; index += 1) {
            var candidate = candidates[index];
            if (!Object.prototype.hasOwnProperty.call(store, candidate)) {
              continue;
            }
            var value = store[candidate];
            if (typeof value === 'string' && value) {
              return value;
            }
          }
          return null;
        }
        function decodePinkModeUriCandidate(value) {
          if (typeof value !== 'string' || !value) {
            return null;
          }
          try {
            var decoded = decodeURI(value);
            if (decoded && decoded !== value) {
              return decoded;
            }
          } catch (error) {
            void error;
          }
          return null;
        }
        function registerPinkModeNetworkVariant(variants, seen, candidate) {
          if (!candidate) {
            return;
          }
          var key = typeof candidate === 'string' ? candidate : candidate && typeof candidate.url === 'string' ? candidate.url : null;
          if (!key || seen.has(key)) {
            return;
          }
          seen.add(key);
          variants.push(candidate);
        }
        function createPinkModeNetworkRequestVariants(request, fallbackUrl, normalized) {
          var variants = [];
          var seen = new Set();
          if (request) {
            registerPinkModeNetworkVariant(variants, seen, request);
            if (typeof request.url === 'string') {
              var decodedRequestUrl = decodePinkModeUriCandidate(request.url);
              if (decodedRequestUrl) {
                registerPinkModeNetworkVariant(variants, seen, createPinkModeAssetRequest(decodedRequestUrl) || decodedRequestUrl);
              }
            }
          }
          var urlCandidates = [];
          if (typeof fallbackUrl === 'string' && fallbackUrl) {
            urlCandidates.push(fallbackUrl);
            var decodedFallbackUrl = decodePinkModeUriCandidate(fallbackUrl);
            if (decodedFallbackUrl) {
              urlCandidates.push(decodedFallbackUrl);
            }
          }
          for (var _i = 0, _urlCandidates = urlCandidates; _i < _urlCandidates.length; _i++) {
            var url = _urlCandidates[_i];
            registerPinkModeNetworkVariant(variants, seen, createPinkModeAssetRequest(url) || url);
          }
          if (typeof normalized === 'string' && normalized) {
            var normalizedVariants = [];
            normalizedVariants.push(normalized);
            var normalizedWithoutLeadingDot = normalized.charAt(0) === '.' ? normalized.slice(1) : normalized;
            if (normalizedWithoutLeadingDot) {
              normalizedVariants.push(normalizedWithoutLeadingDot);
            }
            if (normalized.charAt(0) !== '/') {
              normalizedVariants.push("./".concat(normalized));
              normalizedVariants.push("/".concat(normalized));
            } else {
              var trimmed = normalized.replace(/^\/+/, '');
              if (trimmed) {
                normalizedVariants.push(trimmed);
                normalizedVariants.push("./".concat(trimmed));
              }
            }
            var encoded = encodeURI(normalized);
            if (encoded && encoded !== normalized) {
              normalizedVariants.push(encoded);
              if (encoded.charAt(0) !== '/') {
                normalizedVariants.push("./".concat(encoded));
                normalizedVariants.push("/".concat(encoded));
              }
              var decodedEncoded = decodePinkModeUriCandidate(encoded);
              if (decodedEncoded) {
                normalizedVariants.push(decodedEncoded);
                if (decodedEncoded.charAt(0) !== '/') {
                  normalizedVariants.push("./".concat(decodedEncoded));
                  normalizedVariants.push("/".concat(decodedEncoded));
                }
              }
            }
            for (var _i2 = 0, _normalizedVariants = normalizedVariants; _i2 < _normalizedVariants.length; _i2++) {
              var variant = _normalizedVariants[_i2];
              registerPinkModeNetworkVariant(variants, seen, createPinkModeAssetRequest(variant) || variant);
            }
          }
          return variants;
        }
        function createPinkModeCacheKeyVariants(normalized, resolvedUrl, request) {
          var variants = [];
          if (request) {
            variants.push(request);
            if (typeof request.url === 'string' && request.url) {
              variants.push(request.url);
            }
          }
          if (resolvedUrl) {
            variants.push(resolvedUrl);
            var decodedResolvedUrl = decodePinkModeUriCandidate(resolvedUrl);
            if (decodedResolvedUrl) {
              variants.push(decodedResolvedUrl);
            }
          }
          if (!normalized) {
            return variants;
          }
          variants.push(normalized);
          var normalizedWithoutLeadingDot = normalized.charAt(0) === '.' ? normalized.slice(1) : normalized;
          if (normalizedWithoutLeadingDot) {
            variants.push(normalizedWithoutLeadingDot);
          }
          if (normalized.charAt(0) !== '/') {
            variants.push("./".concat(normalized));
            variants.push("/".concat(normalized));
          } else {
            var trimmed = normalized.replace(/^\/+/, '');
            if (trimmed) {
              variants.push(trimmed);
              variants.push("./".concat(trimmed));
            }
          }
          var encoded = encodeURI(normalized);
          if (encoded && encoded !== normalized) {
            variants.push(encoded);
            if (encoded.charAt(0) !== '/') {
              variants.push("./".concat(encoded));
              variants.push("/".concat(encoded));
            }
            var decodedEncoded = decodePinkModeUriCandidate(encoded);
            if (decodedEncoded) {
              variants.push(decodedEncoded);
              if (decodedEncoded.charAt(0) !== '/') {
                variants.push("./".concat(decodedEncoded));
                variants.push("/".concat(decodedEncoded));
              }
            }
          }
          var deduped = [];
          var seen = new Set();
          for (var _i3 = 0, _variants = variants; _i3 < _variants.length; _i3++) {
            var variant = _variants[_i3];
            if (!variant) {
              continue;
            }
            var key = typeof variant === 'string' ? variant : variant.url || variant;
            if (!key || seen.has(key)) {
              continue;
            }
            seen.add(key);
            deduped.push(variant);
          }
          return deduped;
        }
        function loadPinkModeAssetText(path) {
          var normalized = normalizePinkModeAssetKey(path);
          if (!normalized) {
            return Promise.resolve(null);
          }
          if (pinkModeAssetTextCache.has(normalized)) {
            return Promise.resolve(pinkModeAssetTextCache.get(normalized));
          }
          var embedded = resolvePinkModeEmbeddedAsset(normalized);
          if (typeof embedded === 'string') {
            pinkModeAssetTextCache.set(normalized, embedded);
            return Promise.resolve(embedded);
          }
          if (pinkModeAssetTextPromiseCache.has(normalized)) {
            return pinkModeAssetTextPromiseCache.get(normalized);
          }
          var promise = _asyncToGenerator(_regenerator().m(function _callee() {
            var resolvedUrl, encodedNormalized, fallbackUrl, request, networkCandidates, _iterator, _step, candidate, networkResult, cacheVariants, _iterator2, _step2, variant, cacheResult, xhrResult, _t, _t2;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.p = _context.n) {
                case 0:
                  resolvedUrl = resolvePinkModeAssetUrl(normalized);
                  encodedNormalized = encodeURI(normalized);
                  fallbackUrl = resolvedUrl || encodedNormalized || normalized;
                  request = createPinkModeAssetRequest(fallbackUrl);
                  networkCandidates = createPinkModeNetworkRequestVariants(request, fallbackUrl, normalized);
                  _iterator = _createForOfIteratorHelper(networkCandidates);
                  _context.p = 1;
                  _iterator.s();
                case 2:
                  if ((_step = _iterator.n()).done) {
                    _context.n = 5;
                    break;
                  }
                  candidate = _step.value;
                  _context.n = 3;
                  return fetchPinkModeAssetFromNetwork(candidate);
                case 3:
                  networkResult = _context.v;
                  if (!(networkResult !== null)) {
                    _context.n = 4;
                    break;
                  }
                  pinkModeAssetTextCache.set(normalized, networkResult);
                  return _context.a(2, networkResult);
                case 4:
                  _context.n = 2;
                  break;
                case 5:
                  _context.n = 7;
                  break;
                case 6:
                  _context.p = 6;
                  _t = _context.v;
                  _iterator.e(_t);
                case 7:
                  _context.p = 7;
                  _iterator.f();
                  return _context.f(7);
                case 8:
                  cacheVariants = createPinkModeCacheKeyVariants(normalized, resolvedUrl || fallbackUrl, request);
                  _iterator2 = _createForOfIteratorHelper(cacheVariants);
                  _context.p = 9;
                  _iterator2.s();
                case 10:
                  if ((_step2 = _iterator2.n()).done) {
                    _context.n = 13;
                    break;
                  }
                  variant = _step2.value;
                  _context.n = 11;
                  return fetchPinkModeAssetFromCaches(variant);
                case 11:
                  cacheResult = _context.v;
                  if (!(cacheResult !== null)) {
                    _context.n = 12;
                    break;
                  }
                  pinkModeAssetTextCache.set(normalized, cacheResult);
                  return _context.a(2, cacheResult);
                case 12:
                  _context.n = 10;
                  break;
                case 13:
                  _context.n = 15;
                  break;
                case 14:
                  _context.p = 14;
                  _t2 = _context.v;
                  _iterator2.e(_t2);
                case 15:
                  _context.p = 15;
                  _iterator2.f();
                  return _context.f(15);
                case 16:
                  _context.n = 17;
                  return fetchPinkModeAssetViaXHR(fallbackUrl || normalized);
                case 17:
                  xhrResult = _context.v;
                  if (!(xhrResult !== null)) {
                    _context.n = 18;
                    break;
                  }
                  pinkModeAssetTextCache.set(normalized, xhrResult);
                  return _context.a(2, xhrResult);
                case 18:
                  return _context.a(2, null);
              }
            }, _callee, null, [[9, 14, 15, 16], [1, 6, 7, 8]]);
          }))().catch(function (error) {
            console.warn('Could not load pink mode asset', error);
            return null;
          }).finally(function () {
            pinkModeAssetTextPromiseCache.delete(normalized);
          });
          pinkModeAssetTextPromiseCache.set(normalized, promise);
          return promise;
        }
        function fallbackEscapeHtml(value) {
          if (value === null || typeof value === "undefined") {
            return "";
          }
          return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
        }
        function resolveEscapeHtml() {
          if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.escapeHtml === "function") {
            try {
              return GLOBAL_SCOPE.escapeHtml;
            } catch (escapeHtmlResolveError) {
              void escapeHtmlResolveError;
            }
          }
          return fallbackEscapeHtml;
        }
        var escapeHtml = resolveEscapeHtml();
        var pinkModeLottieRuntime = null;
        var pinkModeLottiePromise = null;
        function sharePinkModeLottieRuntime(runtime) {
          if (!runtime || typeof runtime.loadAnimation !== 'function') {
            return;
          }
          var assignAlias = function assignAlias(scope, name) {
            if (!scope || _typeof(scope) !== 'object') {
              return;
            }
            if (scope[name] && scope[name] === runtime) {
              return;
            }
            try {
              if (!scope[name]) {
                scope[name] = runtime;
              }
            } catch (error) {
              void error;
            }
          };
          if (typeof window !== 'undefined' && window) {
            assignAlias(window, 'lottie');
            assignAlias(window, 'bodymovin');
          }
          if (GLOBAL_SCOPE) {
            assignAlias(GLOBAL_SCOPE, 'lottie');
            assignAlias(GLOBAL_SCOPE, 'bodymovin');
          }
        }
        function disablePinkModeLottieWebWorkers(instance) {
          if (!instance || typeof instance.useWebWorker !== 'function') {
            return;
          }
          try {
            instance.useWebWorker(false);
          } catch (error) {
            console.warn('Unable to disable Lottie web workers', error);
          }
        }
        function resolvePinkModeLottieRuntime() {
          if (pinkModeLottieRuntime && typeof pinkModeLottieRuntime.loadAnimation === 'function') {
            return pinkModeLottieRuntime;
          }
          if (typeof window !== 'undefined' && window) {
            var browserRuntime = (window.lottie && typeof window.lottie.loadAnimation === 'function' ? window.lottie : null) || (window.bodymovin && typeof window.bodymovin.loadAnimation === 'function' ? window.bodymovin : null);
            if (browserRuntime) {
              pinkModeLottieRuntime = browserRuntime;
              sharePinkModeLottieRuntime(browserRuntime);
              disablePinkModeLottieWebWorkers(pinkModeLottieRuntime);
              return pinkModeLottieRuntime;
            }
          }
          if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
            var globalRuntime = (GLOBAL_SCOPE.lottie && typeof GLOBAL_SCOPE.lottie.loadAnimation === 'function' ? GLOBAL_SCOPE.lottie : null) || (GLOBAL_SCOPE.bodymovin && typeof GLOBAL_SCOPE.bodymovin.loadAnimation === 'function' ? GLOBAL_SCOPE.bodymovin : null);
            if (globalRuntime) {
              pinkModeLottieRuntime = globalRuntime;
              sharePinkModeLottieRuntime(globalRuntime);
              disablePinkModeLottieWebWorkers(pinkModeLottieRuntime);
              return pinkModeLottieRuntime;
            }
          }
          return null;
        }
        function ensurePinkModeLottieRuntime() {
          var existing = resolvePinkModeLottieRuntime();
          if (existing) {
            return Promise.resolve(existing);
          }
          if (typeof document === 'undefined') {
            return Promise.resolve(null);
          }
          if (pinkModeLottiePromise) {
            return pinkModeLottiePromise;
          }
          var loaderPromise = new Promise(function (resolve, reject) {
            var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
            if (!head) {
              reject(new Error('Unable to resolve document head for pink mode animations.'));
              return;
            }
            var existingScript = document.querySelector('script[data-loader="pink-mode-lottie"]');
            if (existingScript) {
              var _markLoaded = function markLoaded() {
                existingScript.removeEventListener('load', _markLoaded);
                existingScript.removeEventListener('error', _markFailed);
                existingScript.setAttribute('data-loaded', 'true');
                resolve(resolvePinkModeLottieRuntime());
              };
              var _markFailed = function markFailed(event) {
                existingScript.removeEventListener('load', _markLoaded);
                existingScript.removeEventListener('error', _markFailed);
                var error = new Error('Failed to load pink mode animation runtime.');
                error.event = event;
                reject(error);
              };
              if (existingScript.getAttribute('data-loaded') === 'true' || existingScript.readyState === 'complete') {
                resolve(resolvePinkModeLottieRuntime());
                return;
              }
              existingScript.addEventListener('load', _markLoaded, {
                once: true
              });
              existingScript.addEventListener('error', _markFailed, {
                once: true
              });
              return;
            }
            var script = document.createElement('script');
            script.src = 'src/vendor/lottie.min.js';
            script.async = true;
            script.setAttribute('data-loader', 'pink-mode-lottie');
            var _handleLoad = function handleLoad() {
              script.removeEventListener('load', _handleLoad);
              script.removeEventListener('error', _handleError);
              script.setAttribute('data-loaded', 'true');
              resolve(resolvePinkModeLottieRuntime());
            };
            var _handleError = function handleError(event) {
              script.removeEventListener('load', _handleLoad);
              script.removeEventListener('error', _handleError);
              var error = new Error('Failed to load pink mode animation runtime.');
              error.event = event;
              reject(error);
            };
            script.addEventListener('load', _handleLoad, {
              once: true
            });
            script.addEventListener('error', _handleError, {
              once: true
            });
            head.appendChild(script);
          });
          pinkModeLottiePromise = loaderPromise.then(function (instance) {
            if (instance && typeof instance.loadAnimation === 'function') {
              sharePinkModeLottieRuntime(instance);
              return instance;
            }
            var resolved = resolvePinkModeLottieRuntime();
            if (resolved) {
              sharePinkModeLottieRuntime(resolved);
            }
            return resolved;
          }).catch(function (error) {
            console.warn('Unable to load pink mode animations', error);
            return null;
          }).then(function (runtime) {
            if (!runtime || typeof runtime.loadAnimation !== 'function') {
              pinkModeLottiePromise = null;
              pinkModeLottieRuntime = null;
              return null;
            }
            pinkModeLottieRuntime = runtime;
            sharePinkModeLottieRuntime(runtime);
            disablePinkModeLottieWebWorkers(runtime);
            pinkModeLottiePromise = Promise.resolve(runtime);
            return runtime;
          });
          return pinkModeLottiePromise;
        }
        var HORSE_ICON_SVG = "\n        <svg viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n          <path\n            d=\"m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z\"\n            fill=\"#805333\"\n          />\n          <path\n            d=\"m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z\"\n            fill=\"#a56a43\"\n          />\n          <path\n            d=\"m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z\"\n            fill=\"#cb8252\"\n          />\n          <circle cx=\"42\" cy=\"26\" r=\"3\" fill=\"#2c2f38\" />\n          <circle cx=\"54\" cy=\"43\" r=\"1\" fill=\"#805333\" />\n          <path\n            d=\"m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z\"\n            fill=\"#cf976a\"\n          />\n          <circle cx=\"41\" cy=\"25\" r=\"1.25\" fill=\"#ecf0f1\" />\n        </svg>\n      ".trim();
        var PINK_MODE_ICON_FILES = Object.freeze(['src/illustrations/unicorns/unicorn.svg', 'src/illustrations/unicorns/unicorn-2.svg', 'src/illustrations/unicorns/celebrate.svg', 'src/illustrations/unicorns/sunglasses.svg', 'src/illustrations/unicorns/toy.svg']);
        function createPinkModeIconImageMarkup(path) {
          if (typeof path !== 'string' || !path) {
            return '';
          }
          var safePath = escapeHtml(path);
          return "<img src=\"".concat(safePath, "\" alt=\"\" decoding=\"async\" aria-hidden=\"true\" class=\"pink-mode-icon-image\">");
        }
        var PINK_MODE_ICON_FALLBACK_MARKUP = Object.freeze(PINK_MODE_ICON_FILES.map(createPinkModeIconImageMarkup).filter(Boolean));
        var PINK_MODE_ANIMATED_ICON_FILES = Object.freeze(['src/animations/cat.json', 'src/animations/cup.json', 'src/animations/cupcake.json', 'src/animations/flamingo.json', 'src/animations/float.json', 'src/animations/float-2.json', 'src/animations/fox.json', 'src/animations/heart.json', 'src/animations/horn.json', 'src/animations/invitation.json', 'src/animations/mask.json', 'src/animations/rainbow.json', 'src/animations/rocking-horse.json', 'src/animations/slippers.json', 'src/animations/sunglasses.json', 'src/animations/unicorn.json', 'animated icons 3/camera.json', 'animated icons 3/director-chair.json', 'animated icons 3/dog.json', 'animated icons 3/fox.json', 'animated icons 3/fox-2.json', 'animated icons 3/fox-3.json', 'animated icons 3/horse.json', 'animated icons 3/mountains.json', 'animated icons 3/movie-camera.json', 'animated icons 3/pinata.json', 'animated icons 3/script.json', 'animated icons 3/video-camera.json']);
        var PINK_MODE_ICON_RAIN_MIN_COUNT = 18;
        var PINK_MODE_ICON_RAIN_MAX_COUNT = 30;
        var PINK_MODE_ICON_RAIN_MIN_DURATION_MS = 4200;
        var PINK_MODE_ICON_RAIN_MAX_DURATION_MS = 6400;
        var PINK_MODE_ICON_RAIN_MIN_SIZE_PX = 56;
        var PINK_MODE_ICON_RAIN_MAX_SIZE_PX = 96;
        var PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MIN = 12;
        var PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MAX = 26;
        var PINK_MODE_ICON_RAIN_HORIZONTAL_MARGIN_PERCENT = 0;
        var PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MIN = -12;
        var PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MAX = 12;
        var PINK_MODE_ICON_RAIN_MIN_SCALE = 0.78;
        var PINK_MODE_ICON_RAIN_MAX_SCALE = 1.12;
        var PINK_MODE_ICON_RAIN_MAX_ACTIVE = 64;
        var PINK_MODE_ICON_RAIN_COOLDOWN_MS = 8000;
        var PINK_MODE_ICON_RAIN_DELAY_SPREAD_MS = 720;
        var pinkModeIcons = {
          off: Object.freeze({
            className: 'icon-svg pink-mode-icon',
            markup: HORSE_ICON_SVG
          }),
          onSequence: Object.freeze([])
        };
        var pinkModeIconRotationTimer = null;
        var pinkModeIconIndex = 0;
        var PINK_MODE_ANIMATED_ICON_MIN_INTERVAL_MS = 5200;
        var PINK_MODE_ANIMATED_ICON_MAX_INTERVAL_MS = 8800;
        var PINK_MODE_ANIMATED_ICON_MIN_DURATION_MS = 6400;
        var PINK_MODE_ANIMATED_ICON_MAX_DURATION_MS = 10800;
        var PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX = 72;
        var PINK_MODE_ANIMATED_ICON_MAX_SIZE_PX = 72;
        var PINK_MODE_ANIMATED_ICON_MAX_ACTIVE = 4;
        var PINK_MODE_ANIMATED_ICON_MIN_ACTIVE = 3;
        var PINK_MODE_ANIMATED_ICON_SPAWN_STAGGER_MS = 1200;
        var PINK_MODE_ANIMATED_ICON_MAX_PLACEMENT_ATTEMPTS = 12;
        var PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX = 28;
        var PINK_MODE_ANIMATED_ICON_MIN_SCALE = 0.65;
        var PINK_MODE_ANIMATED_ICON_FULL_SIZE_VIEWPORT_MIN = 920;
        var PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR = ['a', 'button', 'input', 'select', 'textarea', 'label', 'summary', '[role="button"]', '[role="link"]', '[role="menu"]', '[role="dialog"]', '[role="listbox"]', '[role="combobox"]', '[role="textbox"]', '[contenteditable="true"]', '.form-row', '.form-row-actions', '.form-actions', '.toolbar', '.controls', '.dialog', '.modal'].join(', ');
        var PINK_MODE_ANIMATED_ICON_RECENT_SPOT_LIMIT = 6;
        var PINK_MODE_ANIMATED_ICON_RECENT_SPOT_MARGIN_PX = 120;
        var PINK_MODE_ANIMATED_ICON_PROBE_POINTS = Object.freeze([Object.freeze({
          x: 0,
          y: 0
        }), Object.freeze({
          x: 0.35,
          y: 0
        }), Object.freeze({
          x: -0.35,
          y: 0
        }), Object.freeze({
          x: 0,
          y: 0.35
        }), Object.freeze({
          x: 0,
          y: -0.35
        }), Object.freeze({
          x: 0.25,
          y: 0.25
        }), Object.freeze({
          x: -0.25,
          y: 0.25
        }), Object.freeze({
          x: 0.25,
          y: -0.25
        }), Object.freeze({
          x: -0.25,
          y: -0.25
        })]);
        var pinkModeAnimatedIconLayer = null;
        var pinkModeIconRainLayer = null;
        var pinkModeAnimatedIconTimeoutId = null;
        var pinkModeAnimatedIconsActive = false;
        var pinkModeAnimatedIconTemplates = null;
        var pinkModeAnimatedIconTemplatesPromise = null;
        var pinkModeAnimatedIconInstances = new Set();
        var pinkModeAnimatedIconLastTemplateName = null;
        var pinkModeAnimatedIconPlacementHistory = [];
        var pinkModeAnimatedIconTemplateOrder = [];
        var pinkModeAnimatedIconTemplateCursor = 0;
        var pinkModeIconRainInstances = new Set();
        var pinkModeIconRainLastTriggeredAt = 0;
        var pinkModeBodyReadyQueue = [];
        var pinkModeBodyReadyScheduled = false;
        var pinkModeBodyReadyTimerId = null;
        function flushPinkModeBodyReadyQueue() {
          if (!pinkModeBodyReadyQueue.length) {
            return;
          }
          var callbacks = pinkModeBodyReadyQueue.splice(0, pinkModeBodyReadyQueue.length);
          var _iterator3 = _createForOfIteratorHelper(callbacks),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var callback = _step3.value;
              if (typeof callback !== 'function') {
                continue;
              }
              try {
                callback();
              } catch (error) {
                console.warn('Could not run deferred pink mode callback', error);
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
        function schedulePinkModeBodyReadyCheck() {
          if (pinkModeBodyReadyTimerId) {
            return;
          }
          pinkModeBodyReadyTimerId = setTimeout(function () {
            pinkModeBodyReadyTimerId = null;
            if (typeof document === 'undefined' || !document) {
              pinkModeBodyReadyScheduled = false;
              pinkModeBodyReadyQueue.length = 0;
              return;
            }
            if (document.body) {
              pinkModeBodyReadyScheduled = false;
              flushPinkModeBodyReadyQueue();
              return;
            }
            if (document.readyState === 'loading') {
              var _resume = function resume() {
                document.removeEventListener('DOMContentLoaded', _resume);
                schedulePinkModeBodyReadyCheck();
              };
              try {
                document.addEventListener('DOMContentLoaded', _resume, {
                  once: true
                });
              } catch (listenerError) {
                void listenerError;
                document.addEventListener('DOMContentLoaded', _resume);
              }
              return;
            }
            schedulePinkModeBodyReadyCheck();
          }, 16);
        }
        function whenPinkModeBodyReady(callback) {
          if (typeof callback !== 'function' || typeof document === 'undefined') {
            return false;
          }
          if (document.body) {
            callback();
            return true;
          }
          if (!pinkModeBodyReadyQueue.includes(callback)) {
            pinkModeBodyReadyQueue.push(callback);
          }
          if (!pinkModeBodyReadyScheduled) {
            pinkModeBodyReadyScheduled = true;
            schedulePinkModeBodyReadyCheck();
          } else if (!pinkModeBodyReadyTimerId) {
            schedulePinkModeBodyReadyCheck();
          }
          return true;
        }
        var pinkModeAnimatedIconPressListenerCleanup = null;
        var pinkModeAnimatedIconLastTouchTime = 0;
        var pinkModeReduceMotionQuery = typeof window !== 'undefined' && typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
        var PINK_MODE_REDUCE_MOTION_TRUTHY_VALUES = Object.freeze(['true', '1', 'yes', 'on', 'enabled']);
        var PINK_MODE_REDUCE_MOTION_FALSY_VALUES = Object.freeze(['false', '0', 'no', 'off', 'disabled']);
        function readPinkModeStoredReduceMotionPreference() {
          if (typeof window === 'undefined') {
            return null;
          }
          var storage = null;
          try {
            storage = window.localStorage || null;
          } catch (storageError) {
            void storageError;
            storage = null;
          }
          if (!storage) {
            return null;
          }
          try {
            var value = storage.getItem('reduceMotion');
            if (typeof value !== 'string') {
              return null;
            }
            var trimmed = value.trim();
            if (!trimmed) {
              return null;
            }
            var normalized = trimmed.toLowerCase();
            if (PINK_MODE_REDUCE_MOTION_TRUTHY_VALUES.includes(normalized)) {
              return 'true';
            }
            if (PINK_MODE_REDUCE_MOTION_FALSY_VALUES.includes(normalized)) {
              return 'false';
            }
            return trimmed;
          } catch (readError) {
            void readError;
          }
          return null;
        }
        function isPinkModeReduceMotionClassActive() {
          if (typeof document === 'undefined' || !document) {
            return false;
          }
          var root = document.documentElement;
          var body = document.body;
          return root && root.classList && root.classList.contains('reduce-motion') || body && body.classList && body.classList.contains('reduce-motion');
        }
        function shouldRespectPinkModeReduceMotion() {
          var stored = readPinkModeStoredReduceMotionPreference();
          if (stored === 'true') {
            return true;
          }
          if (stored === 'false') {
            return false;
          }
          if (isPinkModeReduceMotionClassActive()) {
            return true;
          }
          return Boolean(pinkModeReduceMotionQuery && pinkModeReduceMotionQuery.matches);
        }
        function ensureSvgHasAriaHidden(markup) {
          if (typeof markup !== 'string') return '';
          var trimmed = markup.trim();
          if (!trimmed) return '';
          if (!/^<svg\b/i.test(trimmed)) return trimmed;
          if (/\baria-hidden\s*=\s*['"]/i.test(trimmed)) return trimmed;
          return trimmed.replace(/<svg\b/i, function (match) {
            return "".concat(match, " aria-hidden=\"true\"");
          });
        }
        function normalizePinkModeIconMarkup(markup) {
          if (typeof markup !== 'string') return '';
          var trimmed = markup.trim();
          if (!trimmed) return '';
          return trimmed;
        }
        function createPinkModeIconConfigs(markupList) {
          if (!Array.isArray(markupList) || !markupList.length) {
            return [];
          }
          return markupList.map(function (markup) {
            return normalizePinkModeIconMarkup(ensureSvgHasAriaHidden(markup));
          }).filter(Boolean).map(function (markup) {
            return Object.freeze({
              className: 'icon-svg pink-mode-icon',
              markup: markup
            });
          });
        }
        function applyPinkModeIconSequence(configs) {
          if (!Array.isArray(configs) || !configs.length) {
            return false;
          }
          var sequence = Object.freeze(configs.slice());
          pinkModeIcons.onSequence = sequence;
          if (typeof document !== 'undefined' && document.body && document.body.classList.contains('pink-mode')) {
            if (typeof stopPinkModeIconRotation === 'function') {
              stopPinkModeIconRotation();
            }
            pinkModeIconIndex = 0;
            if (typeof applyPinkModeIcon === 'function') {
              applyPinkModeIcon(sequence[pinkModeIconIndex], {
                animate: false
              });
            }
            if (typeof startPinkModeIconRotation === 'function') {
              startPinkModeIconRotation();
            }
          }
          return true;
        }
        function setPinkModeIconSequence(markupList) {
          var configs = createPinkModeIconConfigs(markupList);
          if (!configs.length) {
            return false;
          }
          return applyPinkModeIconSequence(configs);
        }
        function ensurePinkModeFallbackIconSequence() {
          if (pinkModeIcons.onSequence && pinkModeIcons.onSequence.length) {
            return false;
          }
          if (!Array.isArray(PINK_MODE_ICON_FALLBACK_MARKUP) || !PINK_MODE_ICON_FALLBACK_MARKUP.length) {
            return false;
          }
          return setPinkModeIconSequence(PINK_MODE_ICON_FALLBACK_MARKUP);
        }
        function loadPinkModeIconsFromFiles() {
          return _loadPinkModeIconsFromFiles.apply(this, arguments);
        }
        function _loadPinkModeIconsFromFiles() {
          _loadPinkModeIconsFromFiles = _asyncToGenerator(_regenerator().m(function _callee6() {
            var responses, markupList, applied;
            return _regenerator().w(function (_context7) {
              while (1) switch (_context7.n) {
                case 0:
                  _context7.n = 1;
                  return Promise.all(PINK_MODE_ICON_FILES.map(function (path) {
                    return loadPinkModeAssetText(path).catch(function () {
                      return null;
                    });
                  }));
                case 1:
                  responses = _context7.v;
                  markupList = responses.filter(function (response) {
                    return typeof response === 'string' && response;
                  });
                  if (markupList.length) {
                    applied = setPinkModeIconSequence(markupList);
                    if (!applied) {
                      ensurePinkModeFallbackIconSequence();
                    }
                  } else {
                    ensurePinkModeFallbackIconSequence();
                  }
                case 2:
                  return _context7.a(2);
              }
            }, _callee6);
          }));
          return _loadPinkModeIconsFromFiles.apply(this, arguments);
        }
        function updatePinkModeAnimatedIconTemplateRotation(templates) {
          if (!Array.isArray(templates) || !templates.length) {
            pinkModeAnimatedIconTemplateOrder = [];
            pinkModeAnimatedIconTemplateCursor = 0;
            return;
          }
          pinkModeAnimatedIconTemplateOrder = templates.map(function (_, index) {
            return index;
          });
          pinkModeAnimatedIconTemplateCursor = 0;
        }
        function loadPinkModeAnimatedIconTemplates() {
          return _loadPinkModeAnimatedIconTemplates.apply(this, arguments);
        }
        function _loadPinkModeAnimatedIconTemplates() {
          _loadPinkModeAnimatedIconTemplates = _asyncToGenerator(_regenerator().m(function _callee7() {
            return _regenerator().w(function (_context8) {
              while (1) switch (_context8.n) {
                case 0:
                  if (!pinkModeAnimatedIconTemplates) {
                    _context8.n = 1;
                    break;
                  }
                  return _context8.a(2, pinkModeAnimatedIconTemplates);
                case 1:
                  if (!pinkModeAnimatedIconTemplatesPromise) {
                    _context8.n = 2;
                    break;
                  }
                  return _context8.a(2, pinkModeAnimatedIconTemplatesPromise);
                case 2:
                  pinkModeAnimatedIconTemplatesPromise = Promise.all(PINK_MODE_ANIMATED_ICON_FILES.map(function (path) {
                    return loadPinkModeAssetText(path).catch(function () {
                      return null;
                    });
                  })).then(function (contents) {
                    return Object.freeze(contents.map(function (content, index) {
                      return content ? Object.freeze({
                        name: PINK_MODE_ANIMATED_ICON_FILES[index],
                        data: content
                      }) : null;
                    }).filter(Boolean));
                  }).catch(function (error) {
                    console.warn('Could not load pink mode animated icons', error);
                    return Object.freeze([]);
                  }).then(function (templates) {
                    pinkModeAnimatedIconTemplates = templates;
                    updatePinkModeAnimatedIconTemplateRotation(templates);
                    return templates;
                  });
                  return _context8.a(2, pinkModeAnimatedIconTemplatesPromise);
              }
            }, _callee7);
          }));
          return _loadPinkModeAnimatedIconTemplates.apply(this, arguments);
        }
        function selectPinkModeAnimatedIconTemplate(availableTemplates) {
          if (!Array.isArray(availableTemplates) || !availableTemplates.length) {
            return null;
          }
          var sanitized = availableTemplates.filter(Boolean);
          if (!sanitized.length) {
            return null;
          }
          var templates = pinkModeAnimatedIconTemplates;
          var order = pinkModeAnimatedIconTemplateOrder;
          if (Array.isArray(templates) && templates.length && Array.isArray(order) && order.length) {
            var availableSet = new Set(sanitized);
            var uniqueAvailableNames = new Set();
            sanitized.forEach(function (template) {
              if (template && typeof template.name === 'string') {
                uniqueAvailableNames.add(template.name);
              }
            });
            var allowImmediateRepeat = uniqueAvailableNames.size <= 1;
            var cursor = pinkModeAnimatedIconTemplateCursor;
            for (var attempt = 0; attempt < order.length; attempt += 1) {
              var orderIndex = order[cursor % order.length];
              cursor += 1;
              if (typeof orderIndex !== 'number' || orderIndex < 0 || orderIndex >= templates.length) {
                continue;
              }
              var candidate = templates[orderIndex];
              if (!availableSet.has(candidate)) {
                continue;
              }
              if (!allowImmediateRepeat && candidate && candidate.name === pinkModeAnimatedIconLastTemplateName) {
                continue;
              }
              pinkModeAnimatedIconTemplateCursor = cursor % order.length;
              return candidate;
            }
            cursor = pinkModeAnimatedIconTemplateCursor;
            for (var _attempt = 0; _attempt < order.length; _attempt += 1) {
              var _orderIndex = order[cursor % order.length];
              cursor += 1;
              if (typeof _orderIndex !== 'number' || _orderIndex < 0 || _orderIndex >= templates.length) {
                continue;
              }
              var _candidate = templates[_orderIndex];
              if (!availableSet.has(_candidate)) {
                continue;
              }
              pinkModeAnimatedIconTemplateCursor = cursor % order.length;
              return _candidate;
            }
          }
          return sanitized[Math.floor(Math.random() * sanitized.length)];
        }
        function ensurePinkModeAnimationLayer(options) {
          if (typeof document === 'undefined') {
            return null;
          }
          var useGlobalLayer = Boolean(options && options.global);
          var host = useGlobalLayer ? document.body || document.getElementById('mainContent') : document.getElementById('mainContent') || document.body;
          if (!host) {
            return null;
          }
          var layer = useGlobalLayer ? pinkModeIconRainLayer : pinkModeAnimatedIconLayer;
          if (layer && layer.isConnected && host.contains(layer)) {
            return layer;
          }
          if (layer && layer.parentNode) {
            layer.parentNode.removeChild(layer);
          }
          layer = document.createElement('div');
          layer.className = useGlobalLayer ? 'pink-mode-animation-layer pink-mode-animation-layer--global' : 'pink-mode-animation-layer';
          layer.setAttribute('aria-hidden', 'true');
          host.appendChild(layer);
          if (useGlobalLayer) {
            pinkModeIconRainLayer = layer;
          } else {
            pinkModeAnimatedIconLayer = layer;
          }
          return layer;
        }
        function readScrollExtent(target) {
          if (!target || _typeof(target) !== 'object' && typeof target !== 'function') {
            return null;
          }
          var value = null;
          try {
            value = target.scrollHeight;
          } catch (error) {
            void error;
            return null;
          }
          if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
            return value;
          }
          return null;
        }
        function resolvePinkModeScrollHeight(host) {
          var globalDocument = typeof document !== 'undefined' ? document : null;
          var candidateHost = host && _typeof(host) === 'object' ? host : globalDocument && globalDocument.body ? globalDocument.body : globalDocument && globalDocument.documentElement ? globalDocument.documentElement : null;
          if (!candidateHost || _typeof(candidateHost) !== 'object') {
            return null;
          }
          var directValue = readScrollExtent(candidateHost);
          if (typeof directValue === 'number' && directValue > 0) {
            return directValue;
          }
          var ownerDocument = candidateHost && typeof candidateHost.ownerDocument !== 'undefined' && candidateHost.ownerDocument || globalDocument || null;
          if (!ownerDocument || _typeof(ownerDocument) !== 'object') {
            return null;
          }
          var fallbacks = [ownerDocument.scrollingElement, ownerDocument.body, ownerDocument.documentElement];
          for (var _i4 = 0, _fallbacks = fallbacks; _i4 < _fallbacks.length; _i4++) {
            var fallback = _fallbacks[_i4];
            if (!fallback || _typeof(fallback) !== 'object' || fallback === candidateHost) {
              continue;
            }
            var fallbackHeight = readScrollExtent(fallback);
            if (typeof fallbackHeight === 'number' && fallbackHeight > 0) {
              return fallbackHeight;
            }
          }
          return null;
        }
        function resolvePinkModeHostExtent(host, hostRect, fallbackHeight) {
          var scrollHeight = resolvePinkModeScrollHeight(host);
          if (typeof scrollHeight === 'number' && scrollHeight > 0) {
            return scrollHeight;
          }
          if (hostRect && typeof hostRect.height === 'number' && hostRect.height > 0) {
            return hostRect.height;
          }
          if (hostRect && typeof hostRect.top === 'number' && typeof hostRect.bottom === 'number') {
            var derivedHeight = hostRect.bottom - hostRect.top;
            if (Number.isFinite(derivedHeight) && derivedHeight > 0) {
              return derivedHeight;
            }
          }
          return fallbackHeight;
        }
        function computePinkModeAnimationAvoidRegions(layer) {
          if (typeof document === 'undefined' || typeof document.querySelectorAll !== 'function') {
            return Object.freeze([]);
          }
          var elements = document.querySelectorAll(PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR);
          if (!elements || !elements.length) {
            return Object.freeze([]);
          }
          var regions = [];
          var _iterator4 = _createForOfIteratorHelper(elements),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var element = _step4.value;
              if (!element) {
                continue;
              }
              if (layer && layer.contains(element)) {
                continue;
              }
              if (typeof element.getBoundingClientRect !== 'function') {
                continue;
              }
              var rect = element.getBoundingClientRect();
              if (!rect) {
                continue;
              }
              var width = rect.width,
                height = rect.height,
                left = rect.left,
                right = rect.right,
                top = rect.top,
                bottom = rect.bottom;
              if (!Number.isFinite(width) || !Number.isFinite(height)) {
                continue;
              }
              if (width <= 0 || height <= 0) {
                continue;
              }
              var margin = Math.max(PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX, Math.min(width, height) * 0.3);
              regions.push({
                left: left,
                right: right,
                top: top,
                bottom: bottom,
                margin: margin
              });
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
          return Object.freeze(regions);
        }
        function collectPinkModeAnimationInstanceRegions(layer) {
          if (!pinkModeAnimatedIconInstances.size) {
            return Object.freeze([]);
          }
          var regions = [];
          var _iterator5 = _createForOfIteratorHelper(pinkModeAnimatedIconInstances),
            _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var instance = _step5.value;
              if (!instance || !instance.container) {
                continue;
              }
              var node = instance.container;
              if (!node.isConnected) {
                continue;
              }
              if (layer && node.parentNode && layer !== node.parentNode && !layer.contains(node)) {
                continue;
              }
              if (typeof node.getBoundingClientRect !== 'function') {
                continue;
              }
              var rect = node.getBoundingClientRect();
              if (!rect) {
                continue;
              }
              var left = rect.left,
                right = rect.right,
                top = rect.top,
                bottom = rect.bottom,
                width = rect.width,
                height = rect.height;
              if (!Number.isFinite(width) || !Number.isFinite(height)) {
                continue;
              }
              if (width <= 0 || height <= 0) {
                continue;
              }
              var largestSide = Math.max(width, height);
              regions.push({
                left: left,
                right: right,
                top: top,
                bottom: bottom,
                margin: Math.max(PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX * 1.25, largestSide * 0.6)
              });
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
          return Object.freeze(regions);
        }
        function callPinkModeAnimatedIconPressHandler() {
          var handler = null;
          if (typeof window !== 'undefined' && typeof window.handlePinkModeIconPress === 'function') {
            handler = window.handlePinkModeIconPress;
          } else if (typeof handlePinkModeIconPress === 'function') {
            handler = handlePinkModeIconPress;
          }
          if (typeof handler === 'function') {
            try {
              handler();
              return true;
            } catch (error) {
              console.warn('Could not process pink mode icon press', error);
            }
          }
          return false;
        }
        function extractPinkModeAnimatedIconPoint(event) {
          if (!event) {
            return null;
          }
          if (typeof event.clientX === 'number' && typeof event.clientY === 'number') {
            return {
              x: event.clientX,
              y: event.clientY
            };
          }
          var touches = (event.touches && event.touches.length ? event.touches : null) || (event.changedTouches && event.changedTouches.length ? event.changedTouches : null);
          if (touches) {
            var touch = touches[0];
            if (touch && typeof touch.clientX === 'number' && typeof touch.clientY === 'number') {
              return {
                x: touch.clientX,
                y: touch.clientY
              };
            }
          }
          return null;
        }
        function isPointWithinRect(point, rect) {
          if (!point || !rect) {
            return false;
          }
          var x = point.x,
            y = point.y;
          var left = rect.left,
            right = rect.right,
            top = rect.top,
            bottom = rect.bottom;
          if (!Number.isFinite(x) || !Number.isFinite(y)) {
            return false;
          }
          if (!Number.isFinite(left) || !Number.isFinite(right) || !Number.isFinite(top) || !Number.isFinite(bottom)) {
            return false;
          }
          return x >= left && x <= right && y >= top && y <= bottom;
        }
        function detectPinkModeAnimatedIconPress(point) {
          if (!point || !pinkModeAnimatedIconInstances.size) {
            return false;
          }
          var instances = Array.from(pinkModeAnimatedIconInstances);
          for (var index = instances.length - 1; index >= 0; index -= 1) {
            var instance = instances[index];
            if (!instance || instance.destroyed) {
              continue;
            }
            var container = instance.container;
            if (!container || !container.isConnected || typeof container.getBoundingClientRect !== 'function') {
              continue;
            }
            var rect = container.getBoundingClientRect();
            if (!rect || rect.width <= 0 || rect.height <= 0) {
              continue;
            }
            if (isPointWithinRect(point, rect) && callPinkModeAnimatedIconPressHandler()) {
              return true;
            }
          }
          return false;
        }
        function handlePinkModeAnimatedIconPointerEvent(event) {
          if (!event || event.defaultPrevented || !event.isTrusted) {
            return;
          }
          if (typeof event.button === 'number' && event.button !== 0) {
            return;
          }
          var pointerType = typeof event.pointerType === 'string' ? event.pointerType.toLowerCase() : '';
          if (pointerType === 'touch' || pointerType === 'pen') {
            pinkModeAnimatedIconLastTouchTime = Date.now();
          } else {
            pinkModeAnimatedIconLastTouchTime = 0;
          }
          var point = extractPinkModeAnimatedIconPoint(event);
          if (!point) {
            return;
          }
          detectPinkModeAnimatedIconPress(point);
        }
        function handlePinkModeAnimatedIconMouseEvent(event) {
          if (!event || event.defaultPrevented || !event.isTrusted) {
            return;
          }
          if (typeof event.button === 'number' && event.button !== 0) {
            return;
          }
          if (pinkModeAnimatedIconLastTouchTime) {
            var now = Date.now();
            if (now - pinkModeAnimatedIconLastTouchTime < 450) {
              return;
            }
          }
          var point = extractPinkModeAnimatedIconPoint(event);
          if (!point) {
            return;
          }
          detectPinkModeAnimatedIconPress(point);
        }
        function handlePinkModeAnimatedIconTouchEvent(event) {
          if (!event || !event.isTrusted) {
            return;
          }
          pinkModeAnimatedIconLastTouchTime = Date.now();
          var point = extractPinkModeAnimatedIconPoint(event);
          if (!point) {
            return;
          }
          detectPinkModeAnimatedIconPress(point);
        }
        function teardownPinkModeAnimatedIconPressListener() {
          if (!pinkModeAnimatedIconPressListenerCleanup) {
            return;
          }
          try {
            pinkModeAnimatedIconPressListenerCleanup();
          } catch (cleanupError) {
            console.warn('Could not detach pink mode animation press listener', cleanupError);
          }
          pinkModeAnimatedIconPressListenerCleanup = null;
          pinkModeAnimatedIconLastTouchTime = 0;
        }
        function ensurePinkModeAnimatedIconPressListener() {
          if (pinkModeAnimatedIconPressListenerCleanup || typeof document === 'undefined') {
            return;
          }
          var target = document;
          if (!target) {
            return;
          }
          if (typeof window !== 'undefined' && typeof window.PointerEvent === 'function') {
            target.addEventListener('pointerdown', handlePinkModeAnimatedIconPointerEvent, true);
            pinkModeAnimatedIconPressListenerCleanup = function pinkModeAnimatedIconPressListenerCleanup() {
              target.removeEventListener('pointerdown', handlePinkModeAnimatedIconPointerEvent, true);
              pinkModeAnimatedIconLastTouchTime = 0;
            };
            return;
          }
          target.addEventListener('mousedown', handlePinkModeAnimatedIconMouseEvent, true);
          target.addEventListener('touchstart', handlePinkModeAnimatedIconTouchEvent, true);
          pinkModeAnimatedIconPressListenerCleanup = function pinkModeAnimatedIconPressListenerCleanup() {
            target.removeEventListener('mousedown', handlePinkModeAnimatedIconMouseEvent, true);
            target.removeEventListener('touchstart', handlePinkModeAnimatedIconTouchEvent, true);
            pinkModeAnimatedIconLastTouchTime = 0;
          };
        }
        function isPinkModeAnimationSpotClear(layer, hostRect, x, y, size, avoidRegions, options) {
          if (typeof document === 'undefined' || typeof document.elementFromPoint !== 'function') {
            return true;
          }
          var allowLayerOverlap = Boolean(options && options.allowLayerOverlap);
          var allowInteractiveOverlap = Boolean(options && options.allowInteractiveOverlap);
          var viewportWidth = typeof window !== 'undefined' && typeof window.innerWidth === 'number' ? window.innerWidth : document.documentElement && typeof document.documentElement.clientWidth === 'number' ? document.documentElement.clientWidth : null;
          var viewportHeight = typeof window !== 'undefined' && typeof window.innerHeight === 'number' ? window.innerHeight : document.documentElement && typeof document.documentElement.clientHeight === 'number' ? document.documentElement.clientHeight : null;
          var baseX = (hostRect ? hostRect.left : 0) + x;
          var baseY = (hostRect ? hostRect.top : 0) + y;
          var candidate = {
            left: baseX - size / 2,
            right: baseX + size / 2,
            top: baseY - size / 2,
            bottom: baseY + size / 2
          };
          if (Array.isArray(avoidRegions) && avoidRegions.length) {
            var _iterator6 = _createForOfIteratorHelper(avoidRegions),
              _step6;
            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var region = _step6.value;
                if (!region) {
                  continue;
                }
                var regionMargin = typeof region.margin === 'number' ? Math.max(PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX, size * 0.25, region.margin) : Math.max(PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX, size * 0.25);
                if (candidate.left < region.right + regionMargin && candidate.right > region.left - regionMargin && candidate.top < region.bottom + regionMargin && candidate.bottom > region.top - regionMargin) {
                  return false;
                }
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
          }
          var _iterator7 = _createForOfIteratorHelper(PINK_MODE_ANIMATED_ICON_PROBE_POINTS),
            _step7;
          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var point = _step7.value;
              var sampleX = baseX + point.x * size;
              var sampleY = baseY + point.y * size;
              if (viewportWidth !== null && (sampleX < 0 || sampleX > viewportWidth)) {
                continue;
              }
              if (viewportHeight !== null && (sampleY < 0 || sampleY > viewportHeight)) {
                continue;
              }
              var elementsAtPoint = typeof document.elementsFromPoint === 'function' ? document.elementsFromPoint(sampleX, sampleY) : [document.elementFromPoint(sampleX, sampleY)].filter(Boolean);
              var _iterator8 = _createForOfIteratorHelper(elementsAtPoint),
                _step8;
              try {
                for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                  var element = _step8.value;
                  if (!element) {
                    continue;
                  }
                  if (layer && element === layer) {
                    continue;
                  }
                  if (layer && layer.contains(element)) {
                    if (allowLayerOverlap) {
                      continue;
                    }
                    return false;
                  }
                  if (!allowInteractiveOverlap && (typeof element.matches === 'function' && element.matches(PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR) || typeof element.closest === 'function' && element.closest(PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR))) {
                    return false;
                  }
                }
              } catch (err) {
                _iterator8.e(err);
              } finally {
                _iterator8.f();
              }
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
          return true;
        }
        function findPinkModeAnimationPlacement(_ref2) {
          var layer = _ref2.layer,
            hostRect = _ref2.hostRect,
            hostTop = _ref2.hostTop,
            visibleTop = _ref2.visibleTop,
            visibleBottom = _ref2.visibleBottom,
            horizontalPadding = _ref2.horizontalPadding,
            verticalPadding = _ref2.verticalPadding,
            hostWidth = _ref2.hostWidth,
            size = _ref2.size,
            avoidRegions = _ref2.avoidRegions,
            _ref2$leftMarginExten = _ref2.leftMarginExtension,
            leftMarginExtension = _ref2$leftMarginExten === void 0 ? 0 : _ref2$leftMarginExten,
            _ref2$rightMarginExte = _ref2.rightMarginExtension,
            rightMarginExtension = _ref2$rightMarginExte === void 0 ? 0 : _ref2$rightMarginExte,
            _ref2$spotOptions = _ref2.spotOptions,
            spotOptions = _ref2$spotOptions === void 0 ? null : _ref2$spotOptions;
          var minY = Math.max(visibleTop - hostTop + verticalPadding, verticalPadding);
          var maxY = Math.max(visibleBottom - hostTop - verticalPadding, minY);
          var marginLeft = Math.max(0, leftMarginExtension);
          var marginRight = Math.max(0, rightMarginExtension);
          var baseMinX = horizontalPadding;
          var baseMaxX = Math.max(hostWidth - horizontalPadding, baseMinX);
          var minX = baseMinX - marginLeft;
          var maxX = baseMaxX + marginRight;
          for (var attempt = 0; attempt < PINK_MODE_ANIMATED_ICON_MAX_PLACEMENT_ATTEMPTS; attempt += 1) {
            var y = maxY > minY ? minY + Math.random() * (maxY - minY) : minY;
            var x = maxX > minX ? minX + Math.random() * (maxX - minX) : minX;
            if (isPinkModeAnimationSpotClear(layer, hostRect, x, y, size, avoidRegions, spotOptions)) {
              return {
                x: x,
                y: y
              };
            }
          }
          return null;
        }
        function destroyPinkModeAnimatedIconInstance(instance) {
          if (!instance || instance.destroyed) {
            return;
          }
          if (typeof instance.cleanup === 'function') {
            try {
              instance.cleanup();
            } catch (cleanupError) {
              console.warn('Could not detach pink mode animation interactions', cleanupError);
            }
            instance.cleanup = null;
          }
          instance.destroyed = true;
          if (instance.animation && typeof instance.animation.destroy === 'function') {
            try {
              instance.animation.destroy();
            } catch (error) {
              console.warn('Could not dispose pink mode animation', error);
            }
          }
          if (instance.container && instance.container.parentNode) {
            instance.container.parentNode.removeChild(instance.container);
          }
          pinkModeAnimatedIconInstances.delete(instance);
          if (pinkModeAnimatedIconsActive) {
            ensurePinkModeAnimatedIconPopulation(pinkModeAnimatedIconTemplates, {
              immediate: true,
              staggerMs: Math.round(PINK_MODE_ANIMATED_ICON_SPAWN_STAGGER_MS * 0.75)
            });
          }
          if (!pinkModeAnimatedIconInstances.size) {
            teardownPinkModeAnimatedIconPressListener();
          }
        }
        function destroyPinkModeIconRainInstance(instance) {
          if (!instance || instance.destroyed) {
            return;
          }
          if (typeof instance.cleanup === 'function') {
            try {
              instance.cleanup();
            } catch (cleanupError) {
              console.warn('Could not detach pink mode rain interactions', cleanupError);
            }
            instance.cleanup = null;
          }
          instance.destroyed = true;
          if (instance.animation && typeof instance.animation.destroy === 'function') {
            try {
              instance.animation.destroy();
            } catch (error) {
              console.warn('Could not dispose pink mode rain animation', error);
            }
          }
          if (instance.container && instance.container.parentNode) {
            instance.container.parentNode.removeChild(instance.container);
          }
          pinkModeIconRainInstances.delete(instance);
          if (!pinkModeIconRainInstances.size && pinkModeIconRainLayer && pinkModeIconRainLayer.parentNode) {
            pinkModeIconRainLayer.parentNode.removeChild(pinkModeIconRainLayer);
            pinkModeIconRainLayer = null;
          }
        }
        function spawnPinkModeIconRainInstance(templates) {
          var lottieRuntime = resolvePinkModeLottieRuntime();
          if (!Array.isArray(templates) || !templates.length || !lottieRuntime || typeof lottieRuntime.loadAnimation !== 'function') {
            return false;
          }
          var layer = ensurePinkModeAnimationLayer({
            global: true
          });
          if (!layer) {
            return false;
          }
          var sanitizedTemplates = templates.filter(Boolean);
          if (!sanitizedTemplates.length) {
            return false;
          }
          var activeTemplateNames = new Set();
          var _iterator9 = _createForOfIteratorHelper(pinkModeIconRainInstances),
            _step9;
          try {
            for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
              var _instance = _step9.value;
              if (!_instance) continue;
              var templateName = _instance.templateName;
              if (typeof templateName === 'string' && templateName) {
                activeTemplateNames.add(templateName);
              }
            }
          } catch (err) {
            _iterator9.e(err);
          } finally {
            _iterator9.f();
          }
          var _iterator0 = _createForOfIteratorHelper(pinkModeAnimatedIconInstances),
            _step0;
          try {
            for (_iterator0.s(); !(_step0 = _iterator0.n()).done;) {
              var _instance2 = _step0.value;
              if (!_instance2) continue;
              var _templateName = _instance2.templateName;
              if (typeof _templateName === 'string' && _templateName) {
                activeTemplateNames.add(_templateName);
              }
            }
          } catch (err) {
            _iterator0.e(err);
          } finally {
            _iterator0.f();
          }
          var availableTemplates = sanitizedTemplates.filter(function (template) {
            if (!template || typeof template.name !== 'string') {
              return true;
            }
            return !activeTemplateNames.has(template.name);
          });
          if (!availableTemplates.length) {
            availableTemplates = sanitizedTemplates;
          }
          var template = selectPinkModeAnimatedIconTemplate(availableTemplates);
          if (!template || !template.data) {
            return false;
          }
          var container = document.createElement('div');
          container.className = 'pink-mode-animation-instance pink-mode-icon-rain';
          container.setAttribute('aria-hidden', 'true');
          var size = Math.round(Math.random() * (PINK_MODE_ICON_RAIN_MAX_SIZE_PX - PINK_MODE_ICON_RAIN_MIN_SIZE_PX) + PINK_MODE_ICON_RAIN_MIN_SIZE_PX);
          container.style.setProperty('--pink-mode-animation-size', "".concat(size, "px"));
          var minHorizontalPercent = 0;
          var maxHorizontalPercent = 100;
          if (typeof window !== 'undefined' && window.visualViewport) {
            var viewport = window.visualViewport;
            var layoutWidth = typeof window.innerWidth === 'number' && window.innerWidth > 0 ? window.innerWidth : typeof viewport.width === 'number' && viewport.width > 0 ? viewport.width : 0;
            var visualWidth = typeof viewport.width === 'number' && viewport.width > 0 ? viewport.width : layoutWidth;
            if (layoutWidth > 0 && visualWidth > 0) {
              var rawOffsetLeft = typeof viewport.offsetLeft === 'number' ? viewport.offsetLeft : typeof viewport.pageLeft === 'number' ? viewport.pageLeft : 0;
              var offsetLeft = Math.min(Math.max(rawOffsetLeft, 0), Math.max(layoutWidth - visualWidth, 0));
              var offsetRight = Math.max(0, layoutWidth - visualWidth - offsetLeft);
              var computedMin = offsetLeft / layoutWidth * 100;
              var computedMax = 100 - offsetRight / layoutWidth * 100;
              if (Number.isFinite(computedMin) && Number.isFinite(computedMax) && computedMax > computedMin) {
                minHorizontalPercent = Math.max(0, Math.min(100, computedMin));
                maxHorizontalPercent = Math.max(minHorizontalPercent, Math.min(100, computedMax));
              }
            }
          }
          var horizontalMargin = Math.max(0, Math.min(40, PINK_MODE_ICON_RAIN_HORIZONTAL_MARGIN_PERCENT));
          minHorizontalPercent = Math.max(minHorizontalPercent, horizontalMargin);
          maxHorizontalPercent = Math.min(100 - horizontalMargin, maxHorizontalPercent);
          if (maxHorizontalPercent <= minHorizontalPercent) {
            minHorizontalPercent = 0;
            maxHorizontalPercent = 100;
          }
          var horizontalPercent = Math.random() * (maxHorizontalPercent - minHorizontalPercent) + minHorizontalPercent;
          container.style.setProperty('--pink-mode-animation-x', "".concat(horizontalPercent.toFixed(2), "%"));
          var verticalOffset = Math.random() * (PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MAX - PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MIN) + PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MIN;
          container.style.setProperty('--pink-mode-animation-y', "-".concat(verticalOffset.toFixed(2), "vh"));
          var duration = Math.round(Math.random() * (PINK_MODE_ICON_RAIN_MAX_DURATION_MS - PINK_MODE_ICON_RAIN_MIN_DURATION_MS) + PINK_MODE_ICON_RAIN_MIN_DURATION_MS);
          container.style.setProperty('--pink-mode-rain-duration', "".concat(duration, "ms"));
          var scale = Math.random() * (PINK_MODE_ICON_RAIN_MAX_SCALE - PINK_MODE_ICON_RAIN_MIN_SCALE) + PINK_MODE_ICON_RAIN_MIN_SCALE;
          container.style.setProperty('--pink-mode-rain-scale', scale.toFixed(3));
          var drift = Math.random() * (PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MAX - PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MIN) + PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MIN;
          container.style.setProperty('--pink-mode-rain-drift', "".concat(drift.toFixed(2), "vw"));
          var rotation = Math.random() * 40 - 20;
          container.style.setProperty('--pink-mode-rain-rotation', "".concat(rotation.toFixed(2), "deg"));
          layer.appendChild(container);
          var animationData;
          try {
            animationData = JSON.parse(template.data);
          } catch (error) {
            console.warn('Could not parse pink mode rain animation', error);
            if (container.parentNode) {
              container.parentNode.removeChild(container);
            }
            return false;
          }
          var animationInstance;
          try {
            animationInstance = lottieRuntime.loadAnimation({
              container: container,
              renderer: 'svg',
              loop: true,
              autoplay: true,
              animationData: animationData
            });
          } catch (error) {
            console.warn('Could not start pink mode rain animation', error);
            if (container.parentNode) {
              container.parentNode.removeChild(container);
            }
            return false;
          }
          var instance = {
            container: container,
            animation: animationInstance,
            destroyed: false,
            templateName: typeof template.name === 'string' ? template.name : null
          };
          container.addEventListener('animationend', function () {
            destroyPinkModeIconRainInstance(instance);
          }, {
            once: true
          });
          pinkModeIconRainInstances.add(instance);
          if (pinkModeIconRainInstances.size > PINK_MODE_ICON_RAIN_MAX_ACTIVE) {
            var oldest = pinkModeIconRainInstances.values().next().value;
            if (oldest && oldest !== instance) {
              destroyPinkModeIconRainInstance(oldest);
            }
          }
          return true;
        }
        function triggerPinkModeIconRain() {
          if (typeof window === 'undefined' || typeof document === 'undefined') {
            return;
          }
          if (!document.body) {
            whenPinkModeBodyReady(triggerPinkModeIconRain);
            return;
          }
          if (shouldRespectPinkModeReduceMotion()) {
            return;
          }
          var now = Date.now();
          if (pinkModeIconRainLastTriggeredAt && now - pinkModeIconRainLastTriggeredAt < PINK_MODE_ICON_RAIN_COOLDOWN_MS) {
            return;
          }
          pinkModeIconRainLastTriggeredAt = now;
          var proceedWithTemplates = function proceedWithTemplates() {
            if (!document || !document.body || !document.body.classList.contains('pink-mode')) {
              return;
            }
            loadPinkModeAnimatedIconTemplates().then(function (templates) {
              if (!Array.isArray(templates) || !templates.length) {
                return templates;
              }
              var maxAdditional = Math.max(0, PINK_MODE_ICON_RAIN_MAX_COUNT - PINK_MODE_ICON_RAIN_MIN_COUNT);
              var dropCount = PINK_MODE_ICON_RAIN_MIN_COUNT + Math.round(Math.random() * maxAdditional);
              for (var i = 0; i < dropCount; i += 1) {
                var delay = Math.round(Math.random() * PINK_MODE_ICON_RAIN_DELAY_SPREAD_MS + i * 60);
                window.setTimeout(function () {
                  spawnPinkModeIconRainInstance(templates);
                }, delay);
              }
              return templates;
            }).catch(function (error) {
              console.warn('Could not trigger pink mode icon rain', error);
            });
          };
          var runtime = resolvePinkModeLottieRuntime();
          if (runtime && typeof runtime.loadAnimation === 'function') {
            proceedWithTemplates();
            return;
          }
          ensurePinkModeLottieRuntime().then(function (lottie) {
            if (!lottie || typeof lottie.loadAnimation !== 'function') {
              return null;
            }
            proceedWithTemplates();
            return lottie;
          }).catch(function (error) {
            console.warn('Could not trigger pink mode icon rain', error);
          });
        }
        function ensurePinkModeAnimatedIconPopulation(templates, options) {
          if (!pinkModeAnimatedIconsActive) {
            return;
          }
          var resolvedTemplates = (Array.isArray(templates) && templates.length ? templates : pinkModeAnimatedIconTemplates) || null;
          if (!Array.isArray(resolvedTemplates) || !resolvedTemplates.length) {
            return;
          }
          var targetCount = Math.min(PINK_MODE_ANIMATED_ICON_MAX_ACTIVE, Math.max(PINK_MODE_ANIMATED_ICON_MIN_ACTIVE, 1));
          var missing = targetCount - pinkModeAnimatedIconInstances.size;
          if (missing <= 0) {
            return;
          }
          var immediate = Boolean(options && options.immediate);
          var staggerMs = options && typeof options.staggerMs === 'number' ? Math.max(0, options.staggerMs) : PINK_MODE_ANIMATED_ICON_SPAWN_STAGGER_MS;
          for (var index = 0; index < missing; index += 1) {
            var scheduleSpawn = function scheduleSpawn() {
              if (!pinkModeAnimatedIconsActive || pinkModeAnimatedIconInstances.size >= PINK_MODE_ANIMATED_ICON_MAX_ACTIVE) {
                return;
              }
              spawnPinkModeAnimatedIconInstance(resolvedTemplates);
            };
            var delay = 0;
            if (index === 0) {
              delay = immediate ? 0 : Math.round(staggerMs * Math.random() * 0.35);
            } else {
              delay = Math.round(staggerMs * index * (0.55 + Math.random() * 0.65));
            }
            if (delay <= 0) {
              scheduleSpawn();
            } else if (typeof window !== 'undefined' && typeof window.setTimeout === 'function') {
              window.setTimeout(scheduleSpawn, delay);
            } else {
              scheduleSpawn();
            }
          }
        }
        function spawnPinkModeAnimatedIconInstance(templates) {
          var lottieRuntime = resolvePinkModeLottieRuntime();
          if (!pinkModeAnimatedIconsActive || !Array.isArray(templates) || !templates.length || !lottieRuntime || typeof lottieRuntime.loadAnimation !== 'function') {
            return false;
          }
          var layer = ensurePinkModeAnimationLayer();
          if (!layer) {
            return false;
          }
          var sanitizedTemplates = templates.filter(Boolean);
          if (!sanitizedTemplates.length) {
            return false;
          }
          var activeTemplateNames = new Set();
          var _iterator1 = _createForOfIteratorHelper(pinkModeAnimatedIconInstances),
            _step1;
          try {
            for (_iterator1.s(); !(_step1 = _iterator1.n()).done;) {
              var _instance3 = _step1.value;
              if (!_instance3) {
                continue;
              }
              var templateName = typeof _instance3.templateName === 'string' && _instance3.templateName ? _instance3.templateName : null;
              if (templateName) {
                activeTemplateNames.add(templateName);
              }
            }
          } catch (err) {
            _iterator1.e(err);
          } finally {
            _iterator1.f();
          }
          var availableTemplates = sanitizedTemplates.filter(function (template) {
            if (!template || typeof template.name !== 'string') {
              return true;
            }
            return !activeTemplateNames.has(template.name);
          });
          if (!availableTemplates.length) {
            return false;
          }
          if (availableTemplates.length > 1 && pinkModeAnimatedIconLastTemplateName) {
            var filteredTemplates = availableTemplates.filter(function (template) {
              return template && template.name !== pinkModeAnimatedIconLastTemplateName;
            });
            if (filteredTemplates.length) {
              availableTemplates = filteredTemplates;
            }
          }
          var template = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
          if (!template || !template.data) {
            return false;
          }
          var container = document.createElement('div');
          container.className = 'pink-mode-animation-instance';
          container.setAttribute('aria-hidden', 'true');
          var duration = Math.round(Math.random() * (PINK_MODE_ANIMATED_ICON_MAX_DURATION_MS - PINK_MODE_ANIMATED_ICON_MIN_DURATION_MS) + PINK_MODE_ANIMATED_ICON_MIN_DURATION_MS);
          var baseSize = Math.random() * (PINK_MODE_ANIMATED_ICON_MAX_SIZE_PX - PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX) + PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX;
          var viewportWidth = typeof window !== 'undefined' && typeof window.innerWidth === 'number' ? window.innerWidth : document.documentElement && typeof document.documentElement.clientWidth === 'number' ? document.documentElement.clientWidth : null;
          var viewportScale = viewportWidth && viewportWidth < PINK_MODE_ANIMATED_ICON_FULL_SIZE_VIEWPORT_MIN ? Math.max(PINK_MODE_ANIMATED_ICON_MIN_SCALE, viewportWidth / PINK_MODE_ANIMATED_ICON_FULL_SIZE_VIEWPORT_MIN) : 1;
          var size = Math.max(Math.round(baseSize * viewportScale), Math.round(PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX * PINK_MODE_ANIMATED_ICON_MIN_SCALE));
          var host = layer.parentElement || document.body;
          var viewportHeight = typeof window !== 'undefined' && window.innerHeight ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : size * 4;
          var viewportTop = typeof window !== 'undefined' && typeof window.scrollY === 'number' ? window.scrollY : document.documentElement && typeof document.documentElement.scrollTop === 'number' ? document.documentElement.scrollTop : 0;
          var viewportBottom = viewportTop + viewportHeight;
          var hostRect = host ? host.getBoundingClientRect() : null;
          var hostTop = hostRect ? hostRect.top + viewportTop : 0;
          var hostHeight = resolvePinkModeHostExtent(host, hostRect, viewportHeight);
          var hostBottom = hostTop + hostHeight;
          var visibleTop = Math.max(hostTop, viewportTop);
          var visibleBottom = Math.min(hostBottom, viewportBottom);
          if (visibleBottom <= visibleTop) {
            visibleTop = hostTop;
            visibleBottom = hostBottom;
          }
          var hostWidth = host && typeof host.clientWidth === 'number' && host.clientWidth > 0 ? host.clientWidth : viewportWidth || size * 4;
          var hostOffsetLeft = hostRect && Number.isFinite(hostRect.left) ? hostRect.left : 0;
          var hostOffsetTop = hostRect && Number.isFinite(hostRect.top) ? hostRect.top : 0;
          var safeHorizontalRange = Math.max(hostWidth, size * 3);
          var safeVerticalRange = Math.max(hostHeight, size * 3);
          var horizontalPadding = Math.min(Math.max(size * 0.6 + 48, 48), safeHorizontalRange / 2);
          var verticalPadding = Math.min(Math.max(size * 0.6 + 64, 64), safeVerticalRange / 2);
          var hostRight = hostRect && Number.isFinite(hostRect.right) ? hostRect.right : hostOffsetLeft + hostWidth;
          var leftMarginSpace = viewportWidth && Number.isFinite(hostOffsetLeft) ? Math.max(0, hostOffsetLeft) : 0;
          var rightMarginSpace = viewportWidth && Number.isFinite(hostRight) ? Math.max(0, viewportWidth - hostRight) : leftMarginSpace;
          var leftMarginExtension = 0;
          var rightMarginExtension = 0;
          if (viewportWidth && hostWidth && viewportWidth > hostWidth && (leftMarginSpace > 0 || rightMarginSpace > 0)) {
            var marginSafetyBuffer = Math.min(horizontalPadding, Math.max(size * 0.4, 32));
            leftMarginExtension = Math.max(0, leftMarginSpace - marginSafetyBuffer);
            rightMarginExtension = Math.max(0, rightMarginSpace - marginSafetyBuffer);
          }
          var historicalAvoidRegions = pinkModeAnimatedIconPlacementHistory.map(function (spot) {
            if (!spot) {
              return null;
            }
            var spotX = spot.x,
              spotY = spot.y,
              spotSize = spot.size;
            if (!Number.isFinite(spotX) || !Number.isFinite(spotY)) {
              return null;
            }
            var halfSize = Number.isFinite(spotSize) && spotSize > 0 ? spotSize / 2 : PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX / 2;
            var margin = Math.max(PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX, PINK_MODE_ANIMATED_ICON_RECENT_SPOT_MARGIN_PX, halfSize);
            var centerX = hostOffsetLeft + spotX;
            var centerY = hostOffsetTop + spotY;
            return {
              left: centerX - halfSize,
              right: centerX + halfSize,
              top: centerY - halfSize,
              bottom: centerY + halfSize,
              margin: margin
            };
          }).filter(Boolean);
          var staticAvoidRegions = computePinkModeAnimationAvoidRegions(layer);
          var activeInstanceRegions = collectPinkModeAnimationInstanceRegions(layer);
          var basePlacementConfig = {
            layer: layer,
            hostRect: hostRect,
            hostTop: hostTop,
            visibleTop: visibleTop,
            visibleBottom: visibleBottom,
            hostWidth: hostWidth,
            size: size
          };
          var attemptPlacement = function attemptPlacement(placementOptions) {
            return findPinkModeAnimationPlacement(_objectSpread(_objectSpread({}, basePlacementConfig), {}, {
              horizontalPadding: horizontalPadding,
              verticalPadding: verticalPadding,
              leftMarginExtension: leftMarginExtension,
              rightMarginExtension: rightMarginExtension
            }, placementOptions));
          };
          var placement = attemptPlacement({
            avoidRegions: [].concat(_toConsumableArray(staticAvoidRegions), _toConsumableArray(activeInstanceRegions), _toConsumableArray(historicalAvoidRegions))
          });
          if (!placement) {
            placement = attemptPlacement({
              avoidRegions: [].concat(_toConsumableArray(activeInstanceRegions), _toConsumableArray(historicalAvoidRegions)),
              horizontalPadding: Math.max(horizontalPadding * 0.65, 48),
              verticalPadding: Math.max(verticalPadding * 0.65, 64),
              leftMarginExtension: Math.max(leftMarginExtension, size * 0.5),
              rightMarginExtension: Math.max(rightMarginExtension, size * 0.5)
            });
          }
          if (!placement) {
            placement = attemptPlacement({
              avoidRegions: _toConsumableArray(historicalAvoidRegions),
              horizontalPadding: Math.max(horizontalPadding * 0.45, 32),
              verticalPadding: Math.max(verticalPadding * 0.45, 48),
              leftMarginExtension: Math.max(leftMarginExtension, size * 1.5),
              rightMarginExtension: Math.max(rightMarginExtension, size * 1.5),
              spotOptions: {
                allowInteractiveOverlap: true
              }
            });
          }
          if (!placement) {
            placement = attemptPlacement({
              avoidRegions: [],
              horizontalPadding: Math.max(horizontalPadding * 0.25, 24),
              verticalPadding: Math.max(verticalPadding * 0.25, 32),
              leftMarginExtension: Math.max(leftMarginExtension, size * 2),
              rightMarginExtension: Math.max(rightMarginExtension, size * 2),
              spotOptions: {
                allowInteractiveOverlap: true
              }
            });
          }
          if (!placement) {
            var fallbackHorizontalPadding = Math.max(horizontalPadding * 0.2, 16);
            var fallbackVerticalPadding = Math.max(verticalPadding * 0.2, 28);
            var marginLeft = Math.max(0, Math.max(leftMarginExtension, size));
            var marginRight = Math.max(0, Math.max(rightMarginExtension, size));
            var minX = fallbackHorizontalPadding - marginLeft;
            var maxX = Math.max(hostWidth - fallbackHorizontalPadding, minX) + marginRight;
            var minY = Math.max(visibleTop - hostTop + fallbackVerticalPadding, fallbackVerticalPadding);
            var maxY = Math.max(visibleBottom - hostTop - fallbackVerticalPadding, minY);
            placement = {
              x: maxX > minX ? (minX + maxX) / 2 : minX,
              y: maxY > minY ? (minY + maxY) / 2 : minY
            };
          }
          if (!placement) {
            if (container.parentNode) {
              container.parentNode.removeChild(container);
            }
            return false;
          }
          var _placement = placement,
            x = _placement.x,
            y = _placement.y;
          pinkModeAnimatedIconPlacementHistory.push({
            x: x,
            y: y,
            size: size
          });
          if (pinkModeAnimatedIconPlacementHistory.length > PINK_MODE_ANIMATED_ICON_RECENT_SPOT_LIMIT) {
            pinkModeAnimatedIconPlacementHistory.splice(0, pinkModeAnimatedIconPlacementHistory.length - PINK_MODE_ANIMATED_ICON_RECENT_SPOT_LIMIT);
          }
          var randomInRange = function randomInRange(min, max) {
            if (!Number.isFinite(min) || !Number.isFinite(max)) {
              return 0;
            }
            if (max === min) {
              return max;
            }
            var lower = Math.min(min, max);
            var upper = Math.max(min, max);
            return Math.random() * (upper - lower) + lower;
          };
          var setAnimationMetric = function setAnimationMetric(name, value, options) {
            if (!name || !container || !container.style) {
              return;
            }
            var finiteValue = Number.isFinite(value) ? value : null;
            if (finiteValue === null) {
              return;
            }
            var unit = options && typeof options.unit === 'string' ? options.unit : 'px';
            var precision = options && Number.isFinite(options.precision) && options.precision >= 0 ? options.precision : 2;
            var formatted = "".concat(finiteValue.toFixed(precision)).concat(unit);
            container.style.setProperty(name, formatted);
          };
          var horizontalDirection = Math.random() < 0.5 ? -1 : 1;
          var translateXStart = randomInRange(-36, 36);
          var translateXSettle = translateXStart + randomInRange(-28, 28);
          var translateXDrift = translateXSettle + horizontalDirection * randomInRange(36, 84);
          var translateXEnd = translateXDrift + horizontalDirection * randomInRange(48, 132);
          var translateYStart = randomInRange(Math.max(24, size * 0.3), Math.max(60, size * 0.85));
          var translateYSettle = randomInRange(-16, 16);
          var translateYDrift = -Math.abs(randomInRange(Math.max(32, size * 0.25), Math.max(96, size * 0.65)));
          var translateYEnd = -Math.abs(randomInRange(Math.max(80, size * 0.6), Math.max(180, size * 1.35)));
          var scaleJitter = randomInRange(-0.08, 0.08);
          var scaleStart = Math.min(0.92, Math.max(0.62, 0.75 + scaleJitter * 0.5));
          var scaleSettle = Math.min(1.2, Math.max(0.9, 1 + scaleJitter));
          var scaleDrift = Math.min(1.25, Math.max(0.95, 1.05 + scaleJitter * 0.5));
          var scaleEnd = Math.min(1.05, Math.max(0.7, 0.85 + scaleJitter * 0.5));
          var rotationDirection = Math.random() < 0.5 ? -1 : 1;
          var rotationStart = -rotationDirection * randomInRange(4, 12);
          var rotationSettle = rotationDirection * randomInRange(-3, 3);
          var rotationDrift = rotationDirection * randomInRange(6, 14);
          var rotationEnd = rotationDirection * randomInRange(10, 18);
          container.style.setProperty('--pink-mode-animation-duration', "".concat(duration, "ms"));
          container.style.setProperty('--pink-mode-animation-size', "".concat(size, "px"));
          container.style.setProperty('--pink-mode-animation-x', "".concat(x, "px"));
          container.style.setProperty('--pink-mode-animation-y', "".concat(y, "px"));
          setAnimationMetric('--pink-mode-animation-translate-x-start', translateXStart);
          setAnimationMetric('--pink-mode-animation-translate-x-settle', translateXSettle);
          setAnimationMetric('--pink-mode-animation-translate-x-drift', translateXDrift);
          setAnimationMetric('--pink-mode-animation-translate-x-end', translateXEnd);
          setAnimationMetric('--pink-mode-animation-translate-y-start', translateYStart);
          setAnimationMetric('--pink-mode-animation-translate-y-settle', translateYSettle);
          setAnimationMetric('--pink-mode-animation-translate-y-drift', translateYDrift);
          setAnimationMetric('--pink-mode-animation-translate-y-end', translateYEnd);
          setAnimationMetric('--pink-mode-animation-scale-start', scaleStart, {
            unit: '',
            precision: 3
          });
          setAnimationMetric('--pink-mode-animation-scale-settle', scaleSettle, {
            unit: '',
            precision: 3
          });
          setAnimationMetric('--pink-mode-animation-scale-drift', scaleDrift, {
            unit: '',
            precision: 3
          });
          setAnimationMetric('--pink-mode-animation-scale-end', scaleEnd, {
            unit: '',
            precision: 3
          });
          setAnimationMetric('--pink-mode-animation-rotation-start', rotationStart, {
            unit: 'deg'
          });
          setAnimationMetric('--pink-mode-animation-rotation-settle', rotationSettle, {
            unit: 'deg'
          });
          setAnimationMetric('--pink-mode-animation-rotation-drift', rotationDrift, {
            unit: 'deg'
          });
          setAnimationMetric('--pink-mode-animation-rotation-end', rotationEnd, {
            unit: 'deg'
          });
          layer.appendChild(container);
          var animationData;
          try {
            animationData = JSON.parse(template.data);
          } catch (error) {
            console.warn('Could not parse pink mode animation', error);
            if (container.parentNode) {
              container.parentNode.removeChild(container);
            }
            return false;
          }
          var animationInstance;
          try {
            animationInstance = lottieRuntime.loadAnimation({
              container: container,
              renderer: 'svg',
              loop: true,
              autoplay: true,
              animationData: animationData
            });
          } catch (error) {
            console.warn('Could not start pink mode animation', error);
            if (container.parentNode) {
              container.parentNode.removeChild(container);
            }
            return false;
          }
          var instance = {
            container: container,
            animation: animationInstance,
            destroyed: false,
            templateName: typeof template.name === 'string' ? template.name : null
          };
          container.addEventListener('animationend', function () {
            destroyPinkModeAnimatedIconInstance(instance);
          }, {
            once: true
          });
          pinkModeAnimatedIconInstances.add(instance);
          if (pinkModeAnimatedIconInstances.size > PINK_MODE_ANIMATED_ICON_MAX_ACTIVE) {
            var oldest = pinkModeAnimatedIconInstances.values().next().value;
            if (oldest && oldest !== instance) {
              destroyPinkModeAnimatedIconInstance(oldest);
            }
          }
          pinkModeAnimatedIconLastTemplateName = typeof template.name === 'string' ? template.name : null;
          ensurePinkModeAnimatedIconPressListener();
          return true;
        }
        function scheduleNextPinkModeAnimatedIcon(templates) {
          if (!pinkModeAnimatedIconsActive) {
            return;
          }
          var delay = Math.round(Math.random() * (PINK_MODE_ANIMATED_ICON_MAX_INTERVAL_MS - PINK_MODE_ANIMATED_ICON_MIN_INTERVAL_MS) + PINK_MODE_ANIMATED_ICON_MIN_INTERVAL_MS);
          pinkModeAnimatedIconTimeoutId = window.setTimeout(function () {
            pinkModeAnimatedIconTimeoutId = null;
            if (!pinkModeAnimatedIconsActive) {
              return;
            }
            ensurePinkModeAnimatedIconPopulation(templates);
            if (pinkModeAnimatedIconsActive) {
              scheduleNextPinkModeAnimatedIcon(templates);
            }
          }, delay);
          if (pinkModeAnimatedIconTimeoutId && typeof pinkModeAnimatedIconTimeoutId.unref === 'function') {
            pinkModeAnimatedIconTimeoutId.unref();
          }
        }
        function activatePinkModeAnimatedIcons() {
          if (pinkModeAnimatedIconsActive || !document || !document.body || !document.body.classList.contains('pink-mode')) {
            return;
          }
          pinkModeAnimatedIconsActive = true;
          loadPinkModeAnimatedIconTemplates().then(function (templates) {
            if (!pinkModeAnimatedIconsActive) {
              return templates;
            }
            if (!templates.length) {
              stopPinkModeAnimatedIcons();
              return templates;
            }
            ensurePinkModeAnimatedIconPopulation(templates, {
              immediate: true
            });
            scheduleNextPinkModeAnimatedIcon(templates);
            return templates;
          }).catch(function (error) {
            console.warn('Could not prepare pink mode animated icons', error);
            stopPinkModeAnimatedIcons();
          });
        }
        function startPinkModeAnimatedIcons() {
          if (pinkModeAnimatedIconsActive) {
            return;
          }
          if (typeof document === 'undefined' || !document) {
            return;
          }
          if (!document.body) {
            whenPinkModeBodyReady(startPinkModeAnimatedIcons);
            return;
          }
          if (shouldRespectPinkModeReduceMotion()) {
            return;
          }
          if (!document.body.classList.contains('pink-mode')) {
            return;
          }
          var runtime = resolvePinkModeLottieRuntime();
          if (runtime && typeof runtime.loadAnimation === 'function') {
            activatePinkModeAnimatedIcons();
            return;
          }
          ensurePinkModeLottieRuntime().then(function (lottie) {
            if (!lottie || typeof lottie.loadAnimation !== 'function') {
              return null;
            }
            if (!document || !document.body || !document.body.classList.contains('pink-mode') || shouldRespectPinkModeReduceMotion()) {
              return null;
            }
            activatePinkModeAnimatedIcons();
            return lottie;
          }).catch(function (error) {
            console.warn('Could not prepare pink mode animated icons', error);
            stopPinkModeAnimatedIcons();
          });
        }
        function stopPinkModeAnimatedIcons() {
          pinkModeAnimatedIconsActive = false;
          if (pinkModeAnimatedIconTimeoutId) {
            clearTimeout(pinkModeAnimatedIconTimeoutId);
            pinkModeAnimatedIconTimeoutId = null;
          }
          if (pinkModeAnimatedIconInstances.size) {
            Array.from(pinkModeAnimatedIconInstances).forEach(function (instance) {
              destroyPinkModeAnimatedIconInstance(instance);
            });
            pinkModeAnimatedIconInstances.clear();
          }
          if (!pinkModeAnimatedIconInstances.size) {
            teardownPinkModeAnimatedIconPressListener();
          }
          pinkModeAnimatedIconPlacementHistory.length = 0;
          if (pinkModeAnimatedIconLayer && pinkModeAnimatedIconLayer.parentNode) {
            pinkModeAnimatedIconLayer.parentNode.removeChild(pinkModeAnimatedIconLayer);
          }
          pinkModeAnimatedIconLayer = null;
          pinkModeAnimatedIconLastTemplateName = null;
          pinkModeAnimatedIconTemplateCursor = 0;
        }
        if (pinkModeReduceMotionQuery) {
          var handlePinkModeReduceMotionChange = function handlePinkModeReduceMotionChange() {
            if (shouldRespectPinkModeReduceMotion()) {
              stopPinkModeAnimatedIcons();
            } else if (document.body && document.body.classList.contains('pink-mode')) {
              startPinkModeAnimatedIcons();
            }
          };
          if (typeof pinkModeReduceMotionQuery.addEventListener === 'function') {
            pinkModeReduceMotionQuery.addEventListener('change', handlePinkModeReduceMotionChange);
          } else if (typeof pinkModeReduceMotionQuery.addListener === 'function') {
            pinkModeReduceMotionQuery.addListener(handlePinkModeReduceMotionChange);
          }
        }
        var PINK_MODE_ICON_INTERVAL_MS = 30000;
        var PINK_MODE_ICON_ANIMATION_CLASS = 'pink-mode-icon-pop';
        var PINK_MODE_ICON_ANIMATION_RESET_DELAY = 450;
        function readPinkModeIconRotationTimer() {
          return typeof pinkModeIconRotationTimer === "undefined" ? null : pinkModeIconRotationTimer;
        }
        function writePinkModeIconRotationTimer(value) {
          if (typeof value === "number" || value === null || value && _typeof(value) === "object") {
            pinkModeIconRotationTimer = value;
          }
        }
        function readPinkModeIconIndex() {
          return typeof pinkModeIconIndex === "number" ? pinkModeIconIndex : 0;
        }
        function writePinkModeIconIndex(value) {
          if (typeof value === "number") {
            pinkModeIconIndex = value;
          }
        }
        ensurePinkModeFallbackIconSequence();
        var exports = {
          pinkModeIcons: pinkModeIcons,
          ensureSvgHasAriaHidden: ensureSvgHasAriaHidden,
          setPinkModeIconSequence: setPinkModeIconSequence,
          loadPinkModeIconsFromFiles: loadPinkModeIconsFromFiles,
          loadPinkModeAnimatedIconTemplates: loadPinkModeAnimatedIconTemplates,
          ensurePinkModeLottieRuntime: ensurePinkModeLottieRuntime,
          resolvePinkModeLottieRuntime: resolvePinkModeLottieRuntime,
          startPinkModeAnimatedIcons: startPinkModeAnimatedIcons,
          stopPinkModeAnimatedIcons: stopPinkModeAnimatedIcons,
          triggerPinkModeIconRain: triggerPinkModeIconRain,
          getPinkModeIconRotationTimer: readPinkModeIconRotationTimer,
          setPinkModeIconRotationTimer: writePinkModeIconRotationTimer,
          getPinkModeIconIndex: readPinkModeIconIndex,
          setPinkModeIconIndex: writePinkModeIconIndex,
          PINK_MODE_ICON_INTERVAL_MS: PINK_MODE_ICON_INTERVAL_MS,
          PINK_MODE_ICON_ANIMATION_CLASS: PINK_MODE_ICON_ANIMATION_CLASS,
          PINK_MODE_ICON_ANIMATION_RESET_DELAY: PINK_MODE_ICON_ANIMATION_RESET_DELAY,
          PINK_MODE_ICON_FALLBACK_MARKUP: PINK_MODE_ICON_FALLBACK_MARKUP
        };
        if (typeof module !== "undefined" && module.exports) {
          module.exports = exports;
        }
        if (GLOBAL_SCOPE) {
          try {
            var target = GLOBAL_SCOPE.cineCorePinkModeAnimations || {};
            Object.assign(target, exports);
            GLOBAL_SCOPE.cineCorePinkModeAnimations = target;
          } catch (pinkModeGlobalAssignError) {
            void pinkModeGlobalAssignError;
          }
        }
      })();
    },
    'modules/core/pink-mode-support.js': function modules_core_pinkModeSupportJs(module, exports, require) {
      (function () {
        function detectScope() {
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
        function isObject(value) {
          return !!value && (_typeof(value) === 'object' || typeof value === 'function');
        }
        function createSafeResolvedPromise(value) {
          if (typeof Promise !== 'undefined' && typeof Promise.resolve === 'function') {
            return Promise.resolve(value);
          }
          var promiseLike = {
            then: function then(callback) {
              if (typeof callback === 'function') {
                try {
                  return createSafeResolvedPromise(callback(value));
                } catch (callbackError) {
                  void callbackError;
                  return createSafeResolvedPromise(undefined);
                }
              }
              return promiseLike;
            },
            catch: function _catch() {
              return promiseLike;
            }
          };
          return promiseLike;
        }
        function createFallbackSupport() {
          var fallbackIcons = Object.freeze({
            off: Object.freeze({
              className: 'icon-svg pink-mode-icon',
              markup: ''
            }),
            onSequence: Object.freeze([])
          });
          var fallbackMarkup = Object.freeze([]);
          function ensureSvgHasAriaHidden(markup) {
            return typeof markup === 'string' ? markup.trim() : '';
          }
          function noop() {}
          function returnFalse() {
            return false;
          }
          function getNull() {
            return null;
          }
          function getZero() {
            return 0;
          }
          return {
            pinkModeIcons: fallbackIcons,
            ensureSvgHasAriaHidden: ensureSvgHasAriaHidden,
            setPinkModeIconSequence: returnFalse,
            loadPinkModeIconsFromFiles: function loadPinkModeIconsFromFiles() {
              return createSafeResolvedPromise();
            },
            ensurePinkModeLottieRuntime: function ensurePinkModeLottieRuntime() {
              return createSafeResolvedPromise(null);
            },
            resolvePinkModeLottieRuntime: getNull,
            startPinkModeAnimatedIcons: noop,
            stopPinkModeAnimatedIcons: noop,
            triggerPinkModeIconRain: noop,
            getPinkModeIconRotationTimer: getNull,
            setPinkModeIconRotationTimer: noop,
            getPinkModeIconIndex: getZero,
            setPinkModeIconIndex: noop,
            PINK_MODE_ICON_INTERVAL_MS: 30000,
            PINK_MODE_ICON_ANIMATION_CLASS: 'pink-mode-icon-pop',
            PINK_MODE_ICON_ANIMATION_RESET_DELAY: 450,
            PINK_MODE_ICON_FALLBACK_MARKUP: fallbackMarkup
          };
        }
        function resolvePinkModeAnimations(scope) {
          if (typeof cineCorePinkModeAnimations !== 'undefined' && isObject(cineCorePinkModeAnimations)) {
            return cineCorePinkModeAnimations;
          }
          if (scope && isObject(scope.cineCorePinkModeAnimations)) {
            return scope.cineCorePinkModeAnimations;
          }
          if (typeof require === 'function') {
            try {
              var required = require('./pink-mode-animations.js');
              if (isObject(required)) {
                return required;
              }
            } catch (pinkModeRequireError) {
              void pinkModeRequireError;
            }
          }
          return null;
        }
        function resolvePinkModeSupport(scope) {
          var fallback = createFallbackSupport();
          var animations = resolvePinkModeAnimations(scope);
          if (!isObject(animations)) {
            return fallback;
          }
          return {
            pinkModeIcons: isObject(animations.pinkModeIcons) ? animations.pinkModeIcons : fallback.pinkModeIcons,
            ensureSvgHasAriaHidden: typeof animations.ensureSvgHasAriaHidden === 'function' ? animations.ensureSvgHasAriaHidden : fallback.ensureSvgHasAriaHidden,
            setPinkModeIconSequence: typeof animations.setPinkModeIconSequence === 'function' ? animations.setPinkModeIconSequence : fallback.setPinkModeIconSequence,
            loadPinkModeIconsFromFiles: typeof animations.loadPinkModeIconsFromFiles === 'function' ? animations.loadPinkModeIconsFromFiles : fallback.loadPinkModeIconsFromFiles,
            ensurePinkModeLottieRuntime: typeof animations.ensurePinkModeLottieRuntime === 'function' ? animations.ensurePinkModeLottieRuntime : fallback.ensurePinkModeLottieRuntime,
            resolvePinkModeLottieRuntime: typeof animations.resolvePinkModeLottieRuntime === 'function' ? animations.resolvePinkModeLottieRuntime : fallback.resolvePinkModeLottieRuntime,
            startPinkModeAnimatedIcons: typeof animations.startPinkModeAnimatedIcons === 'function' ? animations.startPinkModeAnimatedIcons : fallback.startPinkModeAnimatedIcons,
            stopPinkModeAnimatedIcons: typeof animations.stopPinkModeAnimatedIcons === 'function' ? animations.stopPinkModeAnimatedIcons : fallback.stopPinkModeAnimatedIcons,
            triggerPinkModeIconRain: typeof animations.triggerPinkModeIconRain === 'function' ? animations.triggerPinkModeIconRain : fallback.triggerPinkModeIconRain,
            getPinkModeIconRotationTimer: typeof animations.getPinkModeIconRotationTimer === 'function' ? animations.getPinkModeIconRotationTimer : fallback.getPinkModeIconRotationTimer,
            setPinkModeIconRotationTimer: typeof animations.setPinkModeIconRotationTimer === 'function' ? animations.setPinkModeIconRotationTimer : fallback.setPinkModeIconRotationTimer,
            getPinkModeIconIndex: typeof animations.getPinkModeIconIndex === 'function' ? animations.getPinkModeIconIndex : fallback.getPinkModeIconIndex,
            setPinkModeIconIndex: typeof animations.setPinkModeIconIndex === 'function' ? animations.setPinkModeIconIndex : fallback.setPinkModeIconIndex,
            PINK_MODE_ICON_INTERVAL_MS: typeof animations.PINK_MODE_ICON_INTERVAL_MS === 'number' ? animations.PINK_MODE_ICON_INTERVAL_MS : fallback.PINK_MODE_ICON_INTERVAL_MS,
            PINK_MODE_ICON_ANIMATION_CLASS: typeof animations.PINK_MODE_ICON_ANIMATION_CLASS === 'string' ? animations.PINK_MODE_ICON_ANIMATION_CLASS : fallback.PINK_MODE_ICON_ANIMATION_CLASS,
            PINK_MODE_ICON_ANIMATION_RESET_DELAY: typeof animations.PINK_MODE_ICON_ANIMATION_RESET_DELAY === 'number' ? animations.PINK_MODE_ICON_ANIMATION_RESET_DELAY : fallback.PINK_MODE_ICON_ANIMATION_RESET_DELAY,
            PINK_MODE_ICON_FALLBACK_MARKUP: Array.isArray(animations.PINK_MODE_ICON_FALLBACK_MARKUP) ? animations.PINK_MODE_ICON_FALLBACK_MARKUP : fallback.PINK_MODE_ICON_FALLBACK_MARKUP
          };
        }
        var scope = detectScope();
        var support = resolvePinkModeSupport(scope);
        var api = {
          resolvePinkModeSupport: function resolvePinkModeSupport() {
            return support;
          },
          createFallbackSupport: createFallbackSupport,
          pinkModeIcons: support.pinkModeIcons,
          ensureSvgHasAriaHidden: support.ensureSvgHasAriaHidden,
          setPinkModeIconSequence: support.setPinkModeIconSequence,
          loadPinkModeIconsFromFiles: support.loadPinkModeIconsFromFiles,
          ensurePinkModeLottieRuntime: support.ensurePinkModeLottieRuntime,
          resolvePinkModeLottieRuntime: support.resolvePinkModeLottieRuntime,
          startPinkModeAnimatedIcons: support.startPinkModeAnimatedIcons,
          stopPinkModeAnimatedIcons: support.stopPinkModeAnimatedIcons,
          triggerPinkModeIconRain: support.triggerPinkModeIconRain,
          getPinkModeIconRotationTimer: support.getPinkModeIconRotationTimer,
          setPinkModeIconRotationTimer: support.setPinkModeIconRotationTimer,
          getPinkModeIconIndex: support.getPinkModeIconIndex,
          setPinkModeIconIndex: support.setPinkModeIconIndex,
          PINK_MODE_ICON_INTERVAL_MS: support.PINK_MODE_ICON_INTERVAL_MS,
          PINK_MODE_ICON_ANIMATION_CLASS: support.PINK_MODE_ICON_ANIMATION_CLASS,
          PINK_MODE_ICON_ANIMATION_RESET_DELAY: support.PINK_MODE_ICON_ANIMATION_RESET_DELAY,
          PINK_MODE_ICON_FALLBACK_MARKUP: support.PINK_MODE_ICON_FALLBACK_MARKUP
        };
        if (typeof module !== 'undefined' && module.exports) {
          module.exports = api;
        }
        if (scope && isObject(scope)) {
          try {
            var target = scope.cineCorePinkModeSupport || {};
            Object.assign(target, api);
            scope.cineCorePinkModeSupport = target;
          } catch (pinkModeSupportAssignError) {
            void pinkModeSupportAssignError;
          }
        }
      })();
    }
  };
  var MODULE_CACHE = Object.create(null);
  function loadModule(moduleId) {
    if (MODULE_CACHE[moduleId]) {
      return MODULE_CACHE[moduleId].exports;
    }
    var factory = MODULE_FACTORIES[moduleId];
    if (typeof factory !== 'function') {
      throw new Error('Unknown pink mode module: ' + moduleId);
    }
    var module = {
      exports: {}
    };
    MODULE_CACHE[moduleId] = module;
    var moduleDir = getModuleDirectory(moduleId);
    function localRequire(request) {
      if (typeof request === 'string') {
        var normalized = null;
        if (request.startsWith('./modules/core/')) {
          normalized = request.slice(2);
        } else if (request.startsWith('../core/')) {
          normalized = 'modules/core/' + request.slice(8);
        } else if (request.startsWith('./') || request.startsWith('../')) {
          normalized = normalizeFromDir(moduleDir, request);
        }
        if (normalized && MODULE_FACTORIES[normalized]) {
          return loadModule(normalized);
        }
      }
      return require(request);
    }
    factory(module, module.exports, localRequire);
    return module.exports;
  }
  var exportsMap = {};
  Object.keys(MODULE_FACTORIES).forEach(function (moduleId) {
    exportsMap[moduleId] = loadModule(moduleId);
  });
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = exportsMap;
  }
  var globalScope = (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis ? globalThis : (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self ? self : (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global ? global : null;
  if (globalScope) {
    var targetName = 'cineCorePinkModeModules';
    var existing = globalScope[targetName] && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
    Object.keys(exportsMap).forEach(function (key) {
      existing[key] = exportsMap[key];
    });
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
})();