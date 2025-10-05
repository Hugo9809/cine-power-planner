const { TextEncoder: NodeTextEncoder, TextDecoder: NodeTextDecoder } = require('util');
const { Console } = require('console');
let BufferedConsole;
try {
  ({ BufferedConsole } = require('@jest/console'));
} catch (error) {
  BufferedConsole = null;
}

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = NodeTextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = NodeTextDecoder;
}

const consoleExists = typeof console !== 'undefined' && console !== null;

const makePrototypeWritable = (prototype) => {
  if (!prototype || prototype.__cameraPowerPlannerWritablePrototype) {
    return;
  }

  const overrides = new WeakMap();
  const methodNames = [
    'assert',
    'clear',
    'count',
    'countReset',
    'debug',
    'dir',
    'dirxml',
    'error',
    'group',
    'groupCollapsed',
    'groupEnd',
    'info',
    'log',
    'table',
    'trace',
    'warn',
    'time',
    'timeLog',
    'timeEnd',
    'timeStamp',
    'profile',
    'profileEnd',
  ];

  methodNames.forEach((prop) => {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, prop);
    if (!descriptor) {
      return;
    }

    const enumerable = Boolean(descriptor.enumerable);
    const hasValue = Object.prototype.hasOwnProperty.call(descriptor, 'value');
    const originalValue = descriptor.value;
    const originalGet = descriptor.get;
    const originalSet = descriptor.set;

    Object.defineProperty(prototype, prop, {
      configurable: true,
      enumerable,
      get() {
        const bucket = overrides.get(this);
        if (bucket && bucket.has(prop)) {
          return bucket.get(prop);
        }

        if (hasValue && typeof originalValue === 'function') {
          return originalValue.bind(this);
        }

        if (hasValue) {
          return originalValue;
        }

        if (originalGet) {
          return originalGet.call(this);
        }

        return undefined;
      },
      set(value) {
        let bucket = overrides.get(this);
        if (!bucket) {
          bucket = new Map();
          overrides.set(this, bucket);
        }

        if (originalSet && !hasValue) {
          try {
            originalSet.call(this, value);
            bucket.delete(prop);
            return;
          } catch (error) {
            // fall back to storing the override value
          }
        }

        bucket.set(prop, value);
      },
    });
  });

  Object.defineProperty(prototype, '__cameraPowerPlannerWritablePrototype', {
    configurable: true,
    enumerable: false,
    writable: false,
    value: true,
  });
};

makePrototypeWritable(Console?.prototype);
makePrototypeWritable(BufferedConsole?.prototype);



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

if (consoleExists && !console.__cameraPowerPlannerPatched) {
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

  console.warn = suppressMessages(console.warn?.bind(console), suppressedWarns);
  console.error = suppressMessages(console.error?.bind(console), suppressedErrors);
  console.__cameraPowerPlannerPatched = true;
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
