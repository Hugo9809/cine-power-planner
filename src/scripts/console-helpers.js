// console-helpers.js - Ensures console methods stay writable for diagnostics tooling.
const GLOBAL_SCOPE =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
      ? window
      : typeof self !== 'undefined'
        ? self
        : typeof global !== 'undefined'
          ? global
          : null;

function ensureConsoleMethodsWritable(methods) {
  const scope =
    (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object' ? GLOBAL_SCOPE : null)
    || (typeof globalThis !== 'undefined' ? globalThis : null);
  if (!scope) {
    return null;
  }

  let baseConsole;
  let consoleDescriptor = null;
  try {
    baseConsole = scope.console;
    consoleDescriptor = Object.getOwnPropertyDescriptor(scope, 'console');
  } catch (consoleReadError) {
    baseConsole = typeof console !== 'undefined' ? console : null;
    void consoleReadError;
  }

  if (!baseConsole || typeof baseConsole !== 'object') {
    return null;
  }

  let requestedMethods = [];
  if (Array.isArray(methods)) {
    requestedMethods = methods;
  } else if (typeof methods === 'string' && methods) {
    requestedMethods = [methods];
  } else {
    requestedMethods = ['warn', 'info'];
  }

  const unique = Object.create(null);
  for (let i = 0; i < requestedMethods.length; i += 1) {
    const methodName = requestedMethods[i];
    if (typeof methodName === 'string' && methodName) {
      unique[methodName] = true;
    }
  }

  const methodNames = Object.keys(unique);
  if (!methodNames.length) {
    return baseConsole;
  }

  const storage = Object.create(null);
  for (let i = 0; i < methodNames.length; i += 1) {
    const methodName = methodNames[i];
    let value = baseConsole[methodName];
    try {
      const descriptor = Object.getOwnPropertyDescriptor(baseConsole, methodName);
      if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
        value = descriptor.value;
      }
    } catch (descriptorError) {
      void descriptorError;
    }
    if (typeof value === 'function') {
      try {
        storage[methodName] = value.bind(baseConsole);
      } catch (bindError) {
        storage[methodName] = value;
        void bindError;
      }
    } else {
      storage[methodName] = value;
    }
  }

  const proxy = new Proxy(baseConsole, {
    get(target, property, receiver) {
      if (Object.prototype.hasOwnProperty.call(storage, property)) {
        return storage[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (Object.prototype.hasOwnProperty.call(storage, property)) {
        storage[property] = value;
        return true;
      }
      try {
        Reflect.set(target, property, value, receiver);
        return true;
      } catch (setError) {
        void setError;
      }
      return false;
    },
    defineProperty(target, property, descriptor) {
      if (Object.prototype.hasOwnProperty.call(storage, property)) {
        if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
          storage[property] = descriptor.value;
        }
        return true;
      }
      return Reflect.defineProperty(target, property, descriptor);
    },
    getOwnPropertyDescriptor(target, property) {
      if (Object.prototype.hasOwnProperty.call(storage, property)) {
        return {
          configurable: true,
          enumerable: true,
          writable: true,
          value: storage[property],
        };
      }
      return Reflect.getOwnPropertyDescriptor(target, property);
    },
    ownKeys(target) {
      const keys = Reflect.ownKeys(target);
      for (let i = 0; i < methodNames.length; i += 1) {
        if (keys.indexOf(methodNames[i]) === -1) {
          keys.push(methodNames[i]);
        }
      }
      return keys;
    },
  });

  try {
    Object.defineProperty(scope, 'console', {
      configurable: true,
      enumerable: consoleDescriptor ? consoleDescriptor.enumerable !== false : true,
      writable: true,
      value: proxy,
    });
  } catch (defineError) {
    scope.console = proxy;
    void defineError;
  }

  return proxy;
}

export { ensureConsoleMethodsWritable };

if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
  try {
    if (typeof GLOBAL_SCOPE.__cineEnsureConsoleMethodsWritable !== 'function') {
      GLOBAL_SCOPE.__cineEnsureConsoleMethodsWritable = ensureConsoleMethodsWritable;
    }
  } catch (exposeError) {
    void exposeError;
  }
}
