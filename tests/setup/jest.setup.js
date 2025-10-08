const { TextEncoder: NodeTextEncoder, TextDecoder: NodeTextDecoder } = require('util');

const { ensureConsoleFacade } = require('./consoleFacade');

const activeConsole = ensureConsoleFacade() || console;

const originalDateNow = Date.now;

try {
  const descriptor = Object.getOwnPropertyDescriptor(Date, 'now');
  if (!descriptor || descriptor.configurable !== true || descriptor.writable !== true) {
    Object.defineProperty(Date, 'now', {
      configurable: true,
      enumerable: false,
      writable: true,
      value:
        typeof originalDateNow === 'function'
          ? originalDateNow
          : function safeDateNow() {
              return Number(new Date());
            },
    });
  }
} catch (error) {
  void error;
}

try {
  void Object.getOwnPropertyDescriptor(global.console, 'trace');
} catch (descriptorError) {
  void descriptorError;
}

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = NodeTextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = NodeTextDecoder;
}

const suppressMessages = (originalFn, patterns) => {
  if (typeof originalFn !== 'function') {
    return originalFn;
  }

  const matcher = Array.isArray(patterns) ? patterns : [];
  const getMessage = (args) => {
    if (!args || args.length === 0) {
      return '';
    }

    const [first] = args;
    if (first instanceof Error) {
      return String(first.message || first);
    }
    return String(first);
  };

  return (...args) => {
    const message = getMessage(args);
    if (matcher.some((pattern) => pattern.test(message))) {
      return undefined;
    }
    return originalFn(...args);
  };
};

const getConsoleTargets = (initial) => {
  const targets = [];
  const visited = new Set();
  let current = initial;
  while (current && !visited.has(current)) {
    targets.push(current);
    visited.add(current);
    current = current.__cameraPowerPlannerOriginal;
  }
  return targets;
};

const safelyReplaceConsoleMethod = (target, method, createReplacement) => {
  if (!target || typeof createReplacement !== 'function') {
    return;
  }

  getConsoleTargets(target).forEach((consoleTarget) => {
    const original = consoleTarget[method];
    const replacement = createReplacement(original);
    if (!replacement || replacement === original) {
      return;
    }

    const descriptor = Object.getOwnPropertyDescriptor(consoleTarget, method);

    if (descriptor) {
      if (typeof descriptor.set === 'function') {
        try {
          descriptor.set.call(consoleTarget, replacement);
          return;
        } catch (error) {
          void error;
        }
      }

      if (descriptor.writable || descriptor.configurable) {
        try {
          Object.defineProperty(consoleTarget, method, {
            configurable: true,
            enumerable: descriptor.enumerable ?? true,
            writable: true,
            value: replacement,
          });
          return;
        } catch (error) {
          void error;
        }
      }
    }

    try {
      consoleTarget[method] = replacement;
    } catch (error) {
      void error;
    }
  });
};

if (activeConsole && !activeConsole.__cameraPowerPlannerPatched) {
  const suppressedWarns = [
    /^Failed to .*backup/i,
    /^Backup failed/i,
    /^Restore failed/i,
    /^Restore rehearsal failed/i,
    /^Restore rehearsal .*received/i,
    /^Restore rehearsal .*mismatch/i,
    /FileReader unavailable/i,
    /Recovered .* from backup copy/i,
    /Removed \d+ older automatic backup/i,
    /^Error loading .*Invalid data/i,
    /^Ignoring invalid favorites payload/i,
    /^localStorage is unavailable/i,
    /^Falling back to sessionStorage/i,
    /^Unable to access localStorage/i,
    /^Project export failed/i,
    /^No supported download method available/i,
  ];

  const suppressedErrors = [
    /Not implemented: window\.open/i,
    /Not implemented: navigation \(except hash changes\)/i,
    /^Error loading .* from localStorage/i,
  ];

  safelyReplaceConsoleMethod(activeConsole, 'warn', (original) =>
    suppressMessages(typeof original === 'function' ? original.bind(activeConsole) : original, suppressedWarns),
  );
  safelyReplaceConsoleMethod(activeConsole, 'error', (original) =>
    suppressMessages(typeof original === 'function' ? original.bind(activeConsole) : original, suppressedErrors),
  );
  activeConsole.__cameraPowerPlannerPatched = true;
}

if (typeof window !== 'undefined') {
  if (typeof window.open !== 'function') {
    window.open = jest.fn(() => {
      const doc = window.document?.implementation?.createHTMLDocument('Manual download')
        || {
          open: () => {},
          write: () => {},
          close: () => {},
          body: null,
        };

      return {
        closed: false,
        document: doc,
        close: () => {},
        focus: () => {},
      };
    });
  }

  if (typeof window.URL === 'undefined') {
    window.URL = {};
  }

  if (typeof window.URL.createObjectURL !== 'function') {
    window.URL.createObjectURL = jest.fn(() => 'blob:camera-power-planner');
  }

  if (typeof window.URL.revokeObjectURL !== 'function') {
    window.URL.revokeObjectURL = jest.fn();
  }

  if (typeof window.HTMLAnchorElement !== 'undefined') {
    const { prototype } = window.HTMLAnchorElement;
    if (prototype && !prototype.__cameraPowerPlannerClickPatch) {
      const nativeClick = prototype.click;
      prototype.click = function patchedClick(...args) {
        if (typeof nativeClick === 'function') {
          try {
            nativeClick.apply(this, args);
            return;
          } catch (error) {
            if (error && /navigation \(except hash changes\)/i.test(String(error))) {
              const event = new window.MouseEvent('click', {
                bubbles: true,
                cancelable: true,
              });
              this.dispatchEvent(event);
              return;
            }
            throw error;
          }
        }

        const event = new window.MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        });
        this.dispatchEvent(event);
      };
      prototype.__cameraPowerPlannerClickPatch = true;
    }
  }

  if (typeof window.FileReader !== 'function') {
    class SimpleFileReader {
      constructor() {
        this.onload = null;
        this.onerror = null;
        this.result = null;
      }

      readAsText(file) {
        const source = file && typeof file.text === 'function'
          ? Promise.resolve().then(() => file.text())
          : Promise.reject(new Error('Unsupported file-like object.'));

        source
          .then((text) => {
            this.result = text;
            if (typeof this.onload === 'function') {
              this.onload({ target: { result: text } });
            }
          })
          .catch((error) => {
            if (typeof this.onerror === 'function') {
              this.onerror({ target: { error } });
            }
          });
      }
    }

    window.FileReader = SimpleFileReader;
  }

  if (typeof global.Blob !== 'function') {
    class SimpleBlob {
      constructor(parts = []) {
        this.parts = parts;
      }

      text() {
        return Promise.resolve(
          this.parts
            .map((part) => (typeof part === 'string' ? part : String(part)))
            .join(''),
        );
      }
    }

    global.Blob = SimpleBlob;
  }
}

const { decodeStoredValue } = require('../../src/scripts/storage.js');

const patchedStorages = typeof WeakSet === 'function' ? new WeakSet() : null;

const wrapTestStorage = (storage) => {
  if (!storage || typeof storage.getItem !== 'function') {
    return;
  }

  if (patchedStorages && patchedStorages.has(storage)) {
    return;
  }

  const originalGetItem = storage.getItem.bind(storage);
  storage.getItem = (...args) => {
    const raw = originalGetItem(...args);
    if (raw === null || raw === undefined) {
      return raw;
    }
    return decodeStoredValue(raw);
  };

  if (patchedStorages) {
    patchedStorages.add(storage);
  }
};

wrapTestStorage(global.localStorage);
wrapTestStorage(global.sessionStorage);
if (typeof window !== 'undefined') {
  wrapTestStorage(window.localStorage);
  wrapTestStorage(window.sessionStorage);
}
