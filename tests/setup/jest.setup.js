const { TextEncoder: NodeTextEncoder, TextDecoder: NodeTextDecoder } = require('util');

const createConsoleFacade = (baseConsole) => {
  if (!baseConsole || baseConsole.__cameraPowerPlannerProxy) {
    return baseConsole;
  }

  const overrides = new Map();

  const normalizeDescriptor = (descriptor = {}) => {
    const normalized = { ...descriptor };
    if (!Object.prototype.hasOwnProperty.call(normalized, 'configurable')) {
      normalized.configurable = true;
    }
    if (!Object.prototype.hasOwnProperty.call(normalized, 'enumerable')) {
      normalized.enumerable = true;
    }
    if (
      !Object.prototype.hasOwnProperty.call(normalized, 'writable')
      && !('get' in normalized || 'set' in normalized)
    ) {
      normalized.writable = true;
    }
    return normalized;
  };

  const setOverride = (property, descriptor) => {
    overrides.set(property, normalizeDescriptor(descriptor));
  };

  const consoleProxy = new Proxy(baseConsole, {
    get(target, property, receiver) {
      if (overrides.has(property)) {
        const descriptor = overrides.get(property);
        if (typeof descriptor.get === 'function') {
          return descriptor.get.call(receiver);
        }
        if (Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
          return descriptor.value;
        }
        return undefined;
      }

      const value = Reflect.get(target, property, receiver);
      if (typeof value === 'function') {
        return value.bind(target);
      }
      return value;
    },
    set(target, property, value) {
      setOverride(property, { value });
      return true;
    },
    defineProperty(target, property, descriptor) {
      setOverride(property, descriptor);
      return true;
    },
    deleteProperty(target, property) {
      if (overrides.has(property)) {
        overrides.delete(property);
        return true;
      }
      return Reflect.deleteProperty(target, property);
    },
    has(target, property) {
      if (overrides.has(property)) {
        return true;
      }
      return Reflect.has(target, property);
    },
    ownKeys(target) {
      const keys = new Set(Reflect.ownKeys(target));
      overrides.forEach((_, property) => {
        keys.add(property);
      });
      return Array.from(keys);
    },
    getOwnPropertyDescriptor(target, property) {
      if (overrides.has(property)) {
        return overrides.get(property);
      }
      return Reflect.getOwnPropertyDescriptor(target, property);
    },
    getPrototypeOf(target) {
      return Reflect.getPrototypeOf(target);
    },
    setPrototypeOf(target, prototype) {
      return Reflect.setPrototypeOf(target, prototype);
    },
  });

  setOverride('__cameraPowerPlannerProxy', {
    value: true,
    configurable: false,
    enumerable: false,
    writable: false,
  });
  setOverride('__cameraPowerPlannerOriginal', {
    value: baseConsole,
    configurable: false,
    enumerable: false,
    writable: false,
  });

  return consoleProxy;
};

const ensureConsoleFacade = () => {
  const descriptor = Object.getOwnPropertyDescriptor(global, 'console');
  const initialConsole = descriptor && 'value' in descriptor ? descriptor.value : global.console;
  if (!initialConsole) {
    return initialConsole;
  }

  if (descriptor && (typeof descriptor.get === 'function' || typeof descriptor.set === 'function')) {
    try {
      const current = descriptor.get ? descriptor.get.call(global) : initialConsole;
      if (current && current.__cameraPowerPlannerProxy) {
        return current;
      }
    } catch (error) {
      void error;
    }
  }

  let baseConsole = initialConsole;
  let facade = createConsoleFacade(baseConsole);

  Object.defineProperty(global, 'console', {
    configurable: true,
    enumerable: descriptor ? descriptor.enumerable : true,
    get() {
      if (facade && facade.__cameraPowerPlannerOriginal !== baseConsole) {
        facade = createConsoleFacade(baseConsole);
      }
      return facade;
    },
    set(nextConsole) {
      baseConsole = nextConsole;
      facade = createConsoleFacade(baseConsole);
    },
  });

  global.console = baseConsole;
  return facade;
};

const activeConsole = ensureConsoleFacade() || console;

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

  activeConsole.warn = suppressMessages(activeConsole.warn?.bind(activeConsole), suppressedWarns);
  activeConsole.error = suppressMessages(activeConsole.error?.bind(activeConsole), suppressedErrors);
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
