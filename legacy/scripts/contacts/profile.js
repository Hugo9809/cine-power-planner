'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CONTACT_AVATAR_MAX_BYTES = 300 * 1024;
var CONTACT_AVATAR_MAX_SOURCE_BYTES = 6 * 1024 * 1024;
var CONTACT_AVATAR_MAX_DIMENSION = 256;
var CONTACT_AVATAR_JPEG_QUALITY = 0.85;
var CONTACT_AVATAR_JPEG_MIN_QUALITY = 0.55;
var DEFAULT_PROFILE_STATE = Object.freeze({
  name: '',
  role: '',
  avatar: '',
  phone: '',
  email: ''
});
function normalizeState(state) {
  var next = {
    name: typeof (state === null || state === void 0 ? void 0 : state.name) === 'string' ? state.name : '',
    role: typeof (state === null || state === void 0 ? void 0 : state.role) === 'string' ? state.role : '',
    avatar: typeof (state === null || state === void 0 ? void 0 : state.avatar) === 'string' ? state.avatar : '',
    phone: typeof (state === null || state === void 0 ? void 0 : state.phone) === 'string' ? state.phone : '',
    email: typeof (state === null || state === void 0 ? void 0 : state.email) === 'string' ? state.email : ''
  };
  return next;
}
function createProfileController() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$loadProfile = options.loadProfile,
    loadProfile = _options$loadProfile === void 0 ? function () {
      return null;
    } : _options$loadProfile,
    _options$saveProfile = options.saveProfile,
    saveProfile = _options$saveProfile === void 0 ? function () {
      return undefined;
    } : _options$saveProfile,
    _options$announce = options.announce,
    announce = _options$announce === void 0 ? function () {
      return undefined;
    } : _options$announce,
    _options$getText = options.getText,
    getText = _options$getText === void 0 ? function () {
      return '';
    } : _options$getText,
    _options$dispatchChan = options.dispatchChange,
    dispatchChange = _options$dispatchChan === void 0 ? function () {
      return undefined;
    } : _options$dispatchChan,
    _options$now = options.now,
    now = _options$now === void 0 ? function () {
      return Date.now();
    } : _options$now,
    _options$schedule = options.schedule,
    schedule = _options$schedule === void 0 ? function (fn, delay) {
      return typeof setTimeout === 'function' ? setTimeout(fn, delay) : fn();
    } : _options$schedule,
    _options$throttleMs = options.throttleMs,
    throttleMs = _options$throttleMs === void 0 ? 400 : _options$throttleMs;
  var state = normalizeState(loadProfile() || DEFAULT_PROFILE_STATE);
  var dirty = false;
  var pendingAnnouncement = false;
  var lastPersistAt = null;
  var persistTimer = null;
  var changeListeners = new Set();
  function getSnapshot() {
    return {
      name: state.name.trim(),
      role: state.role.trim(),
      avatar: state.avatar || '',
      phone: state.phone.trim(),
      email: state.email.trim()
    };
  }
  function emitChange() {
    var snapshot = getSnapshot();
    changeListeners.forEach(function (listener) {
      try {
        listener(snapshot);
      } catch (listenerError) {
        void listenerError;
      }
    });
    try {
      dispatchChange(snapshot);
    } catch (dispatchError) {
      void dispatchError;
    }
    return snapshot;
  }
  function assignUserProfileState() {
    var updates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var next = normalizeState(_objectSpread(_objectSpread({}, state), updates));
    state = next;
    return emitChange();
  }
  function schedulePersist() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _options$announce2 = options.announce,
      shouldAnnounce = _options$announce2 === void 0 ? false : _options$announce2;
    var executeSave = function executeSave() {
      persistTimer = null;
      var snapshot = getSnapshot();
      try {
        saveProfile(snapshot);
      } catch (error) {
        console.warn('Failed to save user profile via contacts/profile module', error);
      }
      dirty = false;
      emitChange();
      if (shouldAnnounce) {
        var message = getText('userProfileSaved', 'Profile saved.');
        if (message) announce(message);
        pendingAnnouncement = false;
      }
    };
    var last = typeof lastPersistAt === 'number' ? lastPersistAt : null;
    var elapsed = last === null ? throttleMs : now() - last;
    if (last === null || elapsed >= throttleMs) {
      lastPersistAt = now();
      executeSave();
      return;
    }
    var remaining = Math.max(0, throttleMs - elapsed);
    if (persistTimer) {
      clearTimeout(persistTimer);
    }
    persistTimer = schedule(function () {
      lastPersistAt = now();
      executeSave();
    }, remaining);
  }
  function handleFieldInput(field, rawValue) {
    if (!field) return false;
    var incoming = typeof rawValue === 'string' ? rawValue : '';
    var current = typeof state[field] === 'string' ? state[field] : '';
    if (current.trim() === incoming.trim()) {
      return false;
    }
    assignUserProfileState(_defineProperty({}, field, incoming));
    dirty = true;
    pendingAnnouncement = true;
    schedulePersist();
    return true;
  }
  function handleFieldBlur() {
    if (!dirty && pendingAnnouncement) {
      var message = getText('userProfileSaved', 'Profile saved.');
      if (message) announce(message);
      pendingAnnouncement = false;
    }
  }
  function load(newState) {
    state = normalizeState(newState || loadProfile() || DEFAULT_PROFILE_STATE);
    dirty = false;
    pendingAnnouncement = false;
    emitChange();
    return getSnapshot();
  }
  function setAvatar(dataUrl) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$announce3 = options.announce,
      shouldAnnounce = _options$announce3 === void 0 ? false : _options$announce3;
    assignUserProfileState({
      avatar: typeof dataUrl === 'string' ? dataUrl : ''
    });
    dirty = false;
    pendingAnnouncement = pendingAnnouncement || shouldAnnounce;
    schedulePersist({
      announce: shouldAnnounce
    });
  }
  function clearAvatar() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (!state.avatar) return false;
    setAvatar('', options);
    return true;
  }
  function onChange(listener) {
    if (typeof listener !== 'function') return function () {
      return undefined;
    };
    changeListeners.add(listener);
    return function () {
      return changeListeners.delete(listener);
    };
  }
  return {
    assignUserProfileState: assignUserProfileState,
    getUserProfileSnapshot: getSnapshot,
    handleFieldInput: handleFieldInput,
    handleFieldBlur: handleFieldBlur,
    load: load,
    setAvatar: setAvatar,
    clearAvatar: clearAvatar,
    onChange: onChange,
    schedulePersist: schedulePersist,
    markDirty: function markDirty(value) {
      dirty = Boolean(value);
    },
    setPendingAnnouncement: function setPendingAnnouncement(value) {
      pendingAnnouncement = Boolean(value);
    }
  };
}
function estimateDataUrlSize(dataUrl) {
  if (typeof dataUrl !== 'string' || !dataUrl) return 0;
  var marker = 'base64,';
  var base64Index = dataUrl.indexOf(marker);
  if (base64Index === -1) return dataUrl.length;
  var base64 = dataUrl.slice(base64Index + marker.length).trim();
  if (!base64) return 0;
  var padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
  return Math.max(0, Math.floor(base64.length / 4) * 3 - padding);
}
function createCanvas(width, height) {
  if (typeof document === 'undefined') return null;
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}
function optimiseAvatarDataUrl(dataUrl, mimeType, onSuccess, onError) {
  if (!dataUrl || typeof document === 'undefined') {
    if (typeof onError === 'function') onError();
    return;
  }
  try {
    var image = new Image();
    var handleFailure = function handleFailure() {
      image.onload = null;
      image.onerror = null;
      if (typeof onError === 'function') onError();
    };
    image.onload = function () {
      image.onload = null;
      image.onerror = null;
      try {
        var width = image.naturalWidth || image.width || 0;
        var height = image.naturalHeight || image.height || 0;
        if (!width || !height) {
          handleFailure();
          return;
        }
        var scale = Math.min(1, CONTACT_AVATAR_MAX_DIMENSION / Math.max(width, height));
        var targetWidth = Math.max(1, Math.round(width * scale));
        var targetHeight = Math.max(1, Math.round(height * scale));
        var canvas = createCanvas(targetWidth, targetHeight);
        if (!canvas) {
          handleFailure();
          return;
        }
        var ctx = canvas.getContext('2d');
        if (!ctx) {
          handleFailure();
          return;
        }
        ctx.clearRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
        var preferPng = typeof mimeType === 'string' && /image\/(png|gif|webp)/i.test(mimeType);
        var exportOrder = preferPng ? ['image/png', 'image/jpeg'] : ['image/jpeg', 'image/png'];
        var tryCandidate = function tryCandidate(candidate) {
          var size = estimateDataUrlSize(candidate);
          if (size && size <= CONTACT_AVATAR_MAX_BYTES) {
            if (typeof onSuccess === 'function') onSuccess(candidate);
            return true;
          }
          return false;
        };
        for (var index = 0; index < exportOrder.length; index += 1) {
          var type = exportOrder[index];
          if (type === 'image/jpeg') {
            var quality = CONTACT_AVATAR_JPEG_QUALITY;
            while (quality + 0.0001 >= CONTACT_AVATAR_JPEG_MIN_QUALITY) {
              var bounded = Math.max(CONTACT_AVATAR_JPEG_MIN_QUALITY, Math.min(0.95, Number(quality.toFixed(2))));
              var candidate = canvas.toDataURL('image/jpeg', bounded);
              if (tryCandidate(candidate)) return;
              if (bounded === CONTACT_AVATAR_JPEG_MIN_QUALITY) break;
              quality -= 0.1;
            }
          } else {
            var _candidate = canvas.toDataURL(type);
            if (tryCandidate(_candidate)) return;
          }
        }
        handleFailure();
      } catch (canvasError) {
        void canvasError;
        handleFailure();
      }
    };
    image.onerror = handleFailure;
    image.decoding = 'async';
    image.src = dataUrl;
  } catch (error) {
    void error;
    if (typeof onError === 'function') onError();
  }
}
function readAvatarFile(file, onSuccess, onError) {
  if (!file) return;
  if (file.size > CONTACT_AVATAR_MAX_SOURCE_BYTES) {
    if (typeof onError === 'function') onError('tooLarge');
    return;
  }
  var reader = new FileReader();
  var handleError = function handleError(reason) {
    if (typeof onError === 'function') onError(reason);
  };
  reader.addEventListener('error', function () {
    return handleError('readError');
  });
  reader.addEventListener('load', function () {
    var result = typeof reader.result === 'string' ? reader.result : '';
    if (!result) {
      handleError('readError');
      return;
    }
    var initialSize = estimateDataUrlSize(result);
    if (initialSize && initialSize <= CONTACT_AVATAR_MAX_BYTES) {
      if (typeof onSuccess === 'function') onSuccess(result);
      return;
    }
    optimiseAvatarDataUrl(result, typeof file.type === 'string' ? file.type : '', function (optimised) {
      if (optimised && estimateDataUrlSize(optimised) <= CONTACT_AVATAR_MAX_BYTES) {
        if (typeof onSuccess === 'function') onSuccess(optimised);
        return;
      }
      if (initialSize && initialSize <= CONTACT_AVATAR_MAX_BYTES) {
        if (typeof onSuccess === 'function') onSuccess(result);
        return;
      }
      handleError('tooLarge');
    }, function () {
      if (initialSize && initialSize <= CONTACT_AVATAR_MAX_BYTES) {
        if (typeof onSuccess === 'function') onSuccess(result);
        return;
      }
      handleError('readError');
    });
  });
  try {
    reader.readAsDataURL(file);
  } catch (error) {
    void error;
    handleError('readError');
  }
}
function isSafeImageUrl(url) {
  if (typeof url !== 'string') return false;
  if (url.startsWith('data:')) {
    var allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
    try {
      var mimeTypeEnd = url.indexOf(';', 5);
      var type = mimeTypeEnd >= 0 ? url.substring(5, mimeTypeEnd) : '';
      if (allowedTypes.includes(type)) return true;
    } catch (error) {
      void error;
    }
    return false;
  }
  if (/^\s*(javascript:|https?:|\/\/)/i.test(url)) {
    return false;
  }
  if (/^[a-zA-Z0-9._-]+$/.test(url)) {
    return true;
  }
  return false;
}
var PROFILE_MODULE_EXPORT = {
  CONTACT_AVATAR_MAX_BYTES: CONTACT_AVATAR_MAX_BYTES,
  CONTACT_AVATAR_MAX_SOURCE_BYTES: CONTACT_AVATAR_MAX_SOURCE_BYTES,
  CONTACT_AVATAR_MAX_DIMENSION: CONTACT_AVATAR_MAX_DIMENSION,
  CONTACT_AVATAR_JPEG_QUALITY: CONTACT_AVATAR_JPEG_QUALITY,
  CONTACT_AVATAR_JPEG_MIN_QUALITY: CONTACT_AVATAR_JPEG_MIN_QUALITY,
  DEFAULT_PROFILE_STATE: DEFAULT_PROFILE_STATE,
  createProfileController: createProfileController,
  estimateDataUrlSize: estimateDataUrlSize,
  optimiseAvatarDataUrl: optimiseAvatarDataUrl,
  readAvatarFile: readAvatarFile,
  isSafeImageUrl: isSafeImageUrl
};
assignProfileModuleExports(PROFILE_MODULE_EXPORT);
function assignProfileModuleExports(exportsObject) {
  if (!exportsObject || _typeof(exportsObject) !== 'object') {
    return;
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && typeof module.exports !== 'undefined') {
    module.exports = exportsObject;
    return;
  }
  var scope = resolveProfileGlobalScope();
  if (scope) {
    scope.CINE_CONTACTS_PROFILE_MODULE = exportsObject;
  }
}
function resolveProfileGlobalScope() {
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  return null;
}