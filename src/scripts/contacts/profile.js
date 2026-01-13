'use strict';

const CONTACT_AVATAR_MAX_BYTES = 300 * 1024;
const CONTACT_AVATAR_MAX_SOURCE_BYTES = 6 * 1024 * 1024;
const CONTACT_AVATAR_MAX_DIMENSION = 256;
const CONTACT_AVATAR_JPEG_QUALITY = 0.85;
const CONTACT_AVATAR_JPEG_MIN_QUALITY = 0.55;

const DEFAULT_PROFILE_STATE = Object.freeze({
  name: '',
  role: '',
  avatar: '',
  phone: '',
  email: ''
});

function normalizeState(state) {
  const next = {
    name: typeof state?.name === 'string' ? state.name : '',
    role: typeof state?.role === 'string' ? state.role : '',
    avatar: typeof state?.avatar === 'string' ? state.avatar : '',
    phone: typeof state?.phone === 'string' ? state.phone : '',
    email: typeof state?.email === 'string' ? state.email : ''
  };
  return next;
}

function createProfileController(options = {}) {
  const {
    loadProfile = () => null,
    saveProfile = () => undefined,
    announce = () => undefined,
    getText = () => '',
    dispatchChange = () => undefined,
    now = () => Date.now(),
    schedule = (fn, delay) => (typeof setTimeout === 'function' ? setTimeout(fn, delay) : fn()),
    throttleMs = 400
  } = options;

  let state = normalizeState(loadProfile() || DEFAULT_PROFILE_STATE);
  let dirty = false;
  let pendingAnnouncement = false;
  let lastPersistAt = null;
  let persistTimer = null;
  const changeListeners = new Set();

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
    const snapshot = getSnapshot();
    changeListeners.forEach(listener => {
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

  function assignUserProfileState(updates = {}) {
    const next = normalizeState({ ...state, ...updates });
    state = next;
    return emitChange();
  }

  function schedulePersist(options = {}) {
    const { announce: shouldAnnounce = false } = options;
    const executeSave = () => {
      persistTimer = null;
      const snapshot = getSnapshot();
      try {
        saveProfile(snapshot);
      } catch (error) {
        console.warn('Failed to save user profile via contacts/profile module', error);
      }
      dirty = false;
      emitChange();
      if (shouldAnnounce) {
        const message = getText('userProfileSaved', 'Profile saved.');
        if (message) announce(message);
        pendingAnnouncement = false;
      }
    };

    const last = typeof lastPersistAt === 'number' ? lastPersistAt : null;
    const elapsed = last === null ? throttleMs : now() - last;
    if (last === null || elapsed >= throttleMs) {
      lastPersistAt = now();
      executeSave();
      return;
    }
    const remaining = Math.max(0, throttleMs - elapsed);
    if (persistTimer) {
      clearTimeout(persistTimer);
    }
    persistTimer = schedule(() => {
      lastPersistAt = now();
      executeSave();
    }, remaining);
  }

  function handleFieldInput(field, rawValue) {
    if (!field) return false;
    const incoming = typeof rawValue === 'string' ? rawValue : '';
    const current = typeof state[field] === 'string' ? state[field] : '';
    if (current.trim() === incoming.trim()) {
      return false;
    }
    assignUserProfileState({ [field]: incoming });
    dirty = true;
    pendingAnnouncement = true;
    schedulePersist();
    return true;
  }

  function handleFieldBlur() {
    if (!dirty && pendingAnnouncement) {
      const message = getText('userProfileSaved', 'Profile saved.');
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

  function setAvatar(dataUrl, options = {}) {
    const { announce: shouldAnnounce = false } = options;
    assignUserProfileState({ avatar: typeof dataUrl === 'string' ? dataUrl : '' });
    dirty = false;
    pendingAnnouncement = pendingAnnouncement || shouldAnnounce;
    schedulePersist({ announce: shouldAnnounce });
  }

  function clearAvatar(options = {}) {
    if (!state.avatar) return false;
    setAvatar('', options);
    return true;
  }

  function onChange(listener) {
    if (typeof listener !== 'function') return () => undefined;
    changeListeners.add(listener);
    return () => changeListeners.delete(listener);
  }

  return {
    assignUserProfileState,
    getUserProfileSnapshot: getSnapshot,
    handleFieldInput,
    handleFieldBlur,
    load,
    setAvatar,
    clearAvatar,
    onChange,
    schedulePersist,
    markDirty: value => {
      dirty = Boolean(value);
    },
    setPendingAnnouncement: value => {
      pendingAnnouncement = Boolean(value);
    }
  };
}

function estimateDataUrlSize(dataUrl) {
  if (typeof dataUrl !== 'string' || !dataUrl) return 0;
  const marker = 'base64,';
  const base64Index = dataUrl.indexOf(marker);
  if (base64Index === -1) return dataUrl.length;
  const base64 = dataUrl.slice(base64Index + marker.length).trim();
  if (!base64) return 0;
  const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
  return Math.max(0, Math.floor(base64.length / 4) * 3 - padding);
}

function createCanvas(width, height) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
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
    const image = new Image();
    const handleFailure = () => {
      image.onload = null;
      image.onerror = null;
      if (typeof onError === 'function') onError();
    };
    image.onload = () => {
      image.onload = null;
      image.onerror = null;
      try {
        const width = image.naturalWidth || image.width || 0;
        const height = image.naturalHeight || image.height || 0;
        if (!width || !height) {
          handleFailure();
          return;
        }
        const scale = Math.min(1, CONTACT_AVATAR_MAX_DIMENSION / Math.max(width, height));
        const targetWidth = Math.max(1, Math.round(width * scale));
        const targetHeight = Math.max(1, Math.round(height * scale));
        const canvas = createCanvas(targetWidth, targetHeight);
        if (!canvas) {
          handleFailure();
          return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          handleFailure();
          return;
        }
        ctx.clearRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
        const preferPng = typeof mimeType === 'string' && /image\/(png|gif|webp)/i.test(mimeType);
        const exportOrder = preferPng ? ['image/png', 'image/jpeg'] : ['image/jpeg', 'image/png'];
        const tryCandidate = candidate => {
          const size = estimateDataUrlSize(candidate);
          if (size && size <= CONTACT_AVATAR_MAX_BYTES) {
            if (typeof onSuccess === 'function') onSuccess(candidate);
            return true;
          }
          return false;
        };
        for (let index = 0; index < exportOrder.length; index += 1) {
          const type = exportOrder[index];
          if (type === 'image/jpeg') {
            let quality = CONTACT_AVATAR_JPEG_QUALITY;
            while (quality + 0.0001 >= CONTACT_AVATAR_JPEG_MIN_QUALITY) {
              const bounded = Math.max(
                CONTACT_AVATAR_JPEG_MIN_QUALITY,
                Math.min(0.95, Number(quality.toFixed(2)))
              );
              const candidate = canvas.toDataURL('image/jpeg', bounded);
              if (tryCandidate(candidate)) return;
              if (bounded === CONTACT_AVATAR_JPEG_MIN_QUALITY) break;
              quality -= 0.1;
            }
          } else {
            const candidate = canvas.toDataURL(type);
            if (tryCandidate(candidate)) return;
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
  const maxBytes = typeof CONTACT_AVATAR_MAX_SOURCE_BYTES === 'number'
    ? CONTACT_AVATAR_MAX_SOURCE_BYTES
    : 6 * 1024 * 1024;
  if (file.size > maxBytes) {
    if (typeof onError === 'function') onError('tooLarge');
    return;
  }
  const reader = new FileReader();
  const handleError = reason => {
    if (typeof onError === 'function') onError(reason);
  };
  reader.addEventListener('error', () => handleError('readError'));
  reader.addEventListener('load', () => {
    const result = typeof reader.result === 'string' ? reader.result : '';
    if (!result) {
      handleError('readError');
      return;
    }
    const initialSize = estimateDataUrlSize(result);
    if (initialSize && initialSize <= CONTACT_AVATAR_MAX_BYTES) {
      if (typeof onSuccess === 'function') onSuccess(result);
      return;
    }
    optimiseAvatarDataUrl(
      result,
      typeof file.type === 'string' ? file.type : '',
      optimised => {
        if (optimised && estimateDataUrlSize(optimised) <= CONTACT_AVATAR_MAX_BYTES) {
          if (typeof onSuccess === 'function') onSuccess(optimised);
          return;
        }
        if (initialSize && initialSize <= CONTACT_AVATAR_MAX_BYTES) {
          if (typeof onSuccess === 'function') onSuccess(result);
          return;
        }
        handleError('tooLarge');
      },
      () => {
        if (initialSize && initialSize <= CONTACT_AVATAR_MAX_BYTES) {
          if (typeof onSuccess === 'function') onSuccess(result);
          return;
        }
        handleError('readError');
      }
    );
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
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
    try {
      const mimeTypeEnd = url.indexOf(';', 5);
      const type = mimeTypeEnd >= 0 ? url.substring(5, mimeTypeEnd) : '';
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

const PROFILE_MODULE_EXPORT = {
  CONTACT_AVATAR_MAX_BYTES,
  CONTACT_AVATAR_MAX_SOURCE_BYTES,
  CONTACT_AVATAR_MAX_DIMENSION,
  CONTACT_AVATAR_JPEG_QUALITY,
  CONTACT_AVATAR_JPEG_MIN_QUALITY,
  DEFAULT_PROFILE_STATE,
  createProfileController,
  estimateDataUrlSize,
  optimiseAvatarDataUrl,
  readAvatarFile,
  isSafeImageUrl
};

assignProfileModuleExports(PROFILE_MODULE_EXPORT);

function assignProfileModuleExports(exportsObject) {
  if (!exportsObject || typeof exportsObject !== 'object') {
    return;
  }

  const scope = resolveProfileGlobalScope();
  if (scope) {
    scope.CINE_CONTACTS_PROFILE_MODULE = exportsObject;

    // Explicitly expose key constants and functions to the global scope
    // to satisfy expectations of other modules (like onboarding-tour.js)
    if (typeof scope.CONTACT_AVATAR_MAX_SOURCE_BYTES === 'undefined' || scope.CONTACT_AVATAR_MAX_SOURCE_BYTES === null) {
      scope.CONTACT_AVATAR_MAX_SOURCE_BYTES = exportsObject.CONTACT_AVATAR_MAX_SOURCE_BYTES;
    }
    if (typeof scope.readAvatarFile !== 'function') {
      scope.readAvatarFile = exportsObject.readAvatarFile;
    }
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

export {
  CONTACT_AVATAR_MAX_BYTES,
  CONTACT_AVATAR_MAX_SOURCE_BYTES,
  CONTACT_AVATAR_MAX_DIMENSION,
  CONTACT_AVATAR_JPEG_QUALITY,
  CONTACT_AVATAR_JPEG_MIN_QUALITY,
  DEFAULT_PROFILE_STATE,
  createProfileController,
  estimateDataUrlSize,
  optimiseAvatarDataUrl,
  readAvatarFile,
  isSafeImageUrl
};

export default PROFILE_MODULE_EXPORT;
