(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return {};
  }

  const GLOBAL_SCOPE = detectGlobalScope();
  const REGISTRY_KEY = '__cineBuiltinImmutabilityGuards__';

  function createUniqueList() {
    const values = [];
    return {
      push(value) {
        if (
          !value ||
          (typeof value !== 'object' && typeof value !== 'function') ||
          values.indexOf(value) !== -1
        ) {
          return;
        }
        values.push(value);
      },
      toArray() {
        return values.slice();
      },
    };
  }

  function collectBuiltinCandidates() {
    const list = createUniqueList();

    const constructors = [
      typeof Array === 'function' ? Array : null,
      typeof ArrayBuffer === 'function' ? ArrayBuffer : null,
      typeof Atomics === 'object' ? Atomics : null,
      typeof BigInt === 'function' ? BigInt : null,
      typeof BigInt64Array === 'function' ? BigInt64Array : null,
      typeof BigUint64Array === 'function' ? BigUint64Array : null,
      typeof Boolean === 'function' ? Boolean : null,
      typeof DataView === 'function' ? DataView : null,
      typeof Date === 'function' ? Date : null,
      typeof decodeURI === 'function' ? decodeURI : null,
      typeof decodeURIComponent === 'function' ? decodeURIComponent : null,
      typeof encodeURI === 'function' ? encodeURI : null,
      typeof encodeURIComponent === 'function' ? encodeURIComponent : null,
      typeof Error === 'function' ? Error : null,
      typeof EvalError === 'function' ? EvalError : null,
      typeof FinalizationRegistry === 'function' ? FinalizationRegistry : null,
      typeof Float32Array === 'function' ? Float32Array : null,
      typeof Float64Array === 'function' ? Float64Array : null,
      typeof Function === 'function' ? Function : null,
      typeof Intl === 'object' ? Intl : null,
      typeof Int16Array === 'function' ? Int16Array : null,
      typeof Int32Array === 'function' ? Int32Array : null,
      typeof Int8Array === 'function' ? Int8Array : null,
      typeof JSON === 'object' ? JSON : null,
      typeof Map === 'function' ? Map : null,
      typeof Math === 'object' ? Math : null,
      typeof Number === 'function' ? Number : null,
      typeof Object === 'function' ? Object : null,
      typeof Promise === 'function' ? Promise : null,
      typeof RangeError === 'function' ? RangeError : null,
      typeof ReferenceError === 'function' ? ReferenceError : null,
      typeof Reflect === 'object' ? Reflect : null,
      typeof RegExp === 'function' ? RegExp : null,
      typeof Set === 'function' ? Set : null,
      typeof SharedArrayBuffer === 'function' ? SharedArrayBuffer : null,
      typeof String === 'function' ? String : null,
      typeof Symbol === 'function' ? Symbol : null,
      typeof SyntaxError === 'function' ? SyntaxError : null,
      typeof TypeError === 'function' ? TypeError : null,
      typeof URIError === 'function' ? URIError : null,
      typeof Uint16Array === 'function' ? Uint16Array : null,
      typeof Uint32Array === 'function' ? Uint32Array : null,
      typeof Uint8Array === 'function' ? Uint8Array : null,
      typeof Uint8ClampedArray === 'function' ? Uint8ClampedArray : null,
      typeof WeakMap === 'function' ? WeakMap : null,
      typeof WeakRef === 'function' ? WeakRef : null,
      typeof WeakSet === 'function' ? WeakSet : null,
    ];

    for (let index = 0; index < constructors.length; index += 1) {
      const candidate = constructors[index];
      if (candidate) {
        list.push(candidate);

        if (candidate && typeof candidate === 'object') {
          const keys = Object.getOwnPropertyNames(candidate);
          for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
            const key = keys[keyIndex];
            try {
              list.push(candidate[key]);
            } catch (error) {
              void error;
            }
          }
        }
      }
    }

    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
      const scopeKeys = Object.getOwnPropertyNames(GLOBAL_SCOPE);
      for (let index = 0; index < scopeKeys.length; index += 1) {
        const name = scopeKeys[index];
        if (name && name.startsWith('HTML') && name.endsWith('Element') && typeof GLOBAL_SCOPE[name] === 'function') {
          list.push(GLOBAL_SCOPE[name]);
        }
      }
    }

    return list.toArray();
  }

  const BUILTIN_VALUES = collectBuiltinCandidates();

  function isImmutableBuiltin(value) {
    if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
      return false;
    }

    return BUILTIN_VALUES.indexOf(value) !== -1;
  }

  const originalFreeze = typeof Object.freeze === 'function' ? Object.freeze : null;

  const api = (originalFreeze || Object).freeze ? (originalFreeze || Object).freeze({
    isImmutableBuiltin,
  }) : { isImmutableBuiltin };

  function patchGlobalFreeze() {
    if (typeof originalFreeze !== 'function') {
      return;
    }

    if (originalFreeze.__cineBuiltinImmutabilityPatched) {
      return;
    }

    function freezeWithGuard(value, ...rest) {
      if (isImmutableBuiltin(value)) {
        return value;
      }

      if (
        typeof process !== 'undefined' &&
        process &&
        process.release &&
        process.release.name === 'node'
      ) {
        return value;
      }

      return originalFreeze.call(Object, value, ...rest);
    }

    try {
      Object.defineProperty(originalFreeze, '__cineBuiltinImmutabilityPatched', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: true,
      });
    } catch (error) {
      void error;
      try {
        originalFreeze.__cineBuiltinImmutabilityPatched = true;
      } catch (assignmentError) {
        void assignmentError;
      }
    }

    try {
      Object.defineProperty(freezeWithGuard, '__cineBuiltinImmutabilityPatched', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: true,
      });
    } catch (error) {
      void error;
      try {
        freezeWithGuard.__cineBuiltinImmutabilityPatched = true;
      } catch (assignmentError) {
        void assignmentError;
      }
    }

    try {
      Object.freeze = freezeWithGuard;
    } catch (error) {
      void error;
    }
  }

  patchGlobalFreeze();

  function exposeToScope(scope) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    try {
      Object.defineProperty(scope, REGISTRY_KEY, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: api,
      });
    } catch (error) {
      void error;
      try {
        scope[REGISTRY_KEY] = api;
      } catch (assignmentError) {
        void assignmentError;
      }
    }
  }

  exposeToScope(GLOBAL_SCOPE);
  if (typeof globalThis !== 'undefined' && globalThis !== GLOBAL_SCOPE) exposeToScope(globalThis);
  if (typeof window !== 'undefined') exposeToScope(window);
  if (typeof self !== 'undefined') exposeToScope(self);
  if (typeof global !== 'undefined') exposeToScope(global);

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = api;
  }
})();
