'use strict';

const CONTACT_AVATAR_MAX_BYTES = 300 * 1024;
const CONTACT_AVATAR_MAX_SOURCE_BYTES = 6 * 1024 * 1024;
const CONTACT_AVATAR_MAX_DIMENSION = 256;
const CONTACT_AVATAR_JPEG_QUALITY = 0.85;
const CONTACT_AVATAR_JPEG_MIN_QUALITY = 0.55;

const PROFILE_FIELDS = ['name', 'role', 'avatar', 'phone', 'email'];

function normalizeProfileEntry(entry) {
  if (!entry || typeof entry !== 'object') {
    return { name: '', role: '', avatar: '', phone: '', email: '' };
  }
  const normalized = {};
  PROFILE_FIELDS.forEach((field) => {
    const value = entry[field];
    if (typeof value === 'string') {
      normalized[field] = field === 'avatar' ? value.trim() : value.trim();
    } else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
      normalized[field] = String(value).trim();
    } else {
      normalized[field] = '';
    }
  });
  if (!normalized.avatar.startsWith('data:')) {
    normalized.avatar = '';
  }
  return normalized;
}

function assignUserProfileState(currentState = {}, updates = {}) {
  const current = normalizeProfileEntry(currentState);
  const patch = normalizeProfileEntry(updates);
  let changed = false;
  const next = { ...current };
  PROFILE_FIELDS.forEach((field) => {
    if (!Object.prototype.hasOwnProperty.call(updates, field)) {
      return;
    }
    if (next[field] !== patch[field]) {
      next[field] = patch[field];
      changed = true;
    }
  });

  if (changed) {
    return next;
  }

  const sameReference = currentState && typeof currentState === 'object'
    && PROFILE_FIELDS.every((field) => {
      const original = typeof currentState[field] === 'string' ? currentState[field].trim() : (currentState[field] || '');
      return original === current[field];
    });

  if (sameReference) {
    return currentState;
  }

  return current;
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

function optimiseAvatarDataUrl(dataUrl, mimeType, onSuccess, onError, doc = typeof document !== 'undefined' ? document : null) {
  if (!dataUrl || !doc) {
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
        const canvas = doc.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          handleFailure();
          return;
        }
        ctx.clearRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
        const preferPng = typeof mimeType === 'string' && /image\/(png|gif|webp)/i.test(mimeType);
        const exportOrder = preferPng ? ['image/png', 'image/jpeg'] : ['image/jpeg', 'image/png'];
        const tryCandidate = (candidate) => {
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
                Math.min(0.95, Number(quality.toFixed(2))),
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
      } catch (error) {
        void error;
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

function readAvatarFile(file, onSuccess, onError, doc = typeof document !== 'undefined' ? document : null) {
  if (!file) return;
  const size = typeof file.size === 'number' ? file.size : 0;
  if (size > CONTACT_AVATAR_MAX_SOURCE_BYTES) {
    if (typeof onError === 'function') onError('tooLarge');
    return;
  }
  const handleResult = (result) => {
    const initialSize = estimateDataUrlSize(result);
    if (initialSize && initialSize <= CONTACT_AVATAR_MAX_BYTES) {
      if (typeof onSuccess === 'function') onSuccess(result);
      return;
    }
    optimiseAvatarDataUrl(result, typeof file.type === 'string' ? file.type : '', (optimised) => {
      if (optimised && estimateDataUrlSize(optimised) <= CONTACT_AVATAR_MAX_BYTES) {
        if (typeof onSuccess === 'function') onSuccess(optimised);
        return;
      }
      if (initialSize && initialSize <= CONTACT_AVATAR_MAX_BYTES) {
        if (typeof onSuccess === 'function') onSuccess(result);
        return;
      }
      if (typeof onError === 'function') onError('tooLarge');
    }, () => {
      if (initialSize && initialSize <= CONTACT_AVATAR_MAX_BYTES) {
        if (typeof onSuccess === 'function') onSuccess(result);
        return;
      }
      if (typeof onError === 'function') onError('readError');
    }, doc);
  };

  if (typeof FileReader !== 'undefined') {
    const reader = new FileReader();
    reader.addEventListener('error', () => {
      if (typeof onError === 'function') onError('readError');
    });
    reader.addEventListener('load', () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      if (!result) {
        if (typeof onError === 'function') onError('readError');
        return;
      }
      handleResult(result);
    });
    try {
      reader.readAsDataURL(file);
    } catch (error) {
      void error;
      if (typeof onError === 'function') onError('readError');
    }
    return;
  }

  if (file && typeof file.arrayBuffer === 'function') {
    file.arrayBuffer()
      .then((buffer) => {
        const base64 = Buffer.from(buffer).toString('base64');
        handleResult(`data:${file.type || 'application/octet-stream'};base64,${base64}`);
      })
      .catch(() => {
        if (typeof onError === 'function') onError('readError');
      });
    return;
  }

  if (typeof onError === 'function') onError('readError');
}

function createProfileState(options = {}) {
  const {
    load = () => null,
    save = () => {},
    announce = () => {},
    now = () => Date.now(),
    throttleMs = 150,
    documentRef = typeof document !== 'undefined' ? document : null,
  } = options;

  let state = normalizeProfileEntry(load()) || normalizeProfileEntry();
  let dirty = false;
  let lastPersist = 0;
  let timer = null;

  function persist(reason) {
    const immediate = reason === 'immediate';
    const elapsed = now() - lastPersist;
    if (!dirty && !immediate) {
      return state;
    }
    if (!immediate && elapsed < throttleMs) {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          persist('immediate');
        }, throttleMs - elapsed);
      }
      return state;
    }
    clearTimeout(timer);
    timer = null;
    save(state);
    lastPersist = now();
    dirty = false;
    if (reason === 'announce') {
      announce(state);
    }
    return state;
  }

  function assign(updates = {}) {
    const next = assignUserProfileState(state, updates);
    if (next !== state) {
      state = next;
      dirty = true;
    }
    return state;
  }

  function handleInput(field, value) {
    if (!PROFILE_FIELDS.includes(field)) {
      return state;
    }
    const currentValue = state[field];
    const normalized = typeof value === 'string' ? value : String(value || '');
    if (currentValue === normalized) {
      return state;
    }
    assign({ [field]: normalized });
    persist();
    return state;
  }

  function handleAvatarData(dataUrl) {
    if (typeof dataUrl !== 'string' || !dataUrl) {
      assign({ avatar: '' });
      persist('announce');
      return state;
    }
    if (estimateDataUrlSize(dataUrl) > CONTACT_AVATAR_MAX_BYTES) {
      if (typeof options.onAvatarError === 'function') {
        options.onAvatarError('tooLarge');
      }
      return state;
    }
    assign({ avatar: dataUrl });
    persist('announce');
    return state;
  }

  function handleAvatarFile(file) {
    readAvatarFile(
      file,
      (dataUrl) => {
        assign({ avatar: dataUrl });
        persist('announce');
      },
      (reason) => {
        if (typeof options.onAvatarError === 'function') {
          options.onAvatarError(reason);
        }
      },
      documentRef,
    );
  }

  function linkUserProfileToRow(row) {
    if (!row) return state;
    const snapshot = { ...state };
    PROFILE_FIELDS.forEach((field) => {
      if (!snapshot[field]) return;
      if (typeof row[field] === 'string') {
        row[field] = snapshot[field];
      } else if (row && row.dataset && field === 'avatar') {
        row.dataset.avatar = snapshot.avatar;
      }
    });
    return state;
  }

  return {
    getState: () => state,
    assign,
    handleInput,
    handleAvatarData,
    handleAvatarFile,
    persist,
    linkUserProfileToRow,
  };
}

function createAvatarOptionsController(store, hooks = {}) {
  const { onDelete = () => {}, onChange = () => {}, onEdit = () => {} } = hooks;
  return {
    hasAvatar: () => Boolean(store.getState().avatar),
    requestDelete() {
      if (!store.getState().avatar) return false;
      store.assign({ avatar: '' });
      store.persist('announce');
      onDelete(store.getState());
      return true;
    },
    requestChange(file) {
      if (!file) return false;
      store.handleAvatarFile(file);
      onChange(store.getState());
      return true;
    },
    requestEdit(dataUrl) {
      if (!dataUrl) return false;
      store.handleAvatarData(dataUrl);
      onEdit(store.getState());
      return true;
    },
  };
}

module.exports = {
  CONTACT_AVATAR_MAX_BYTES,
  CONTACT_AVATAR_MAX_SOURCE_BYTES,
  CONTACT_AVATAR_MAX_DIMENSION,
  CONTACT_AVATAR_JPEG_QUALITY,
  CONTACT_AVATAR_JPEG_MIN_QUALITY,
  PROFILE_FIELDS,
  assignUserProfileState,
  estimateDataUrlSize,
  optimiseAvatarDataUrl,
  readAvatarFile,
  normalizeProfileEntry,
  createProfileState,
  createAvatarOptionsController,
};
