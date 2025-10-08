const Module = require('module');

const makePropertyWritable = (target, property) => {
  if (!target) {
    return;
  }

  const visited = new Set();
  let current = target;
  while (current && !visited.has(current)) {
    visited.add(current);
    const descriptor = Object.getOwnPropertyDescriptor(current, property);
    if (!descriptor) {
      current = Object.getPrototypeOf(current);
      continue;
    }

    if ('value' in descriptor) {
      if (descriptor.writable === true && descriptor.configurable === true) {
        return;
      }

      try {
        Object.defineProperty(current, property, {
          configurable: true,
          enumerable: descriptor.enumerable ?? true,
          writable: true,
          value: descriptor.value,
        });
      } catch (error) {
        void error;
      }
      return;
    }

    if (descriptor.configurable !== true) {
      return;
    }

    try {
      Object.defineProperty(current, property, {
        configurable: true,
        enumerable: descriptor.enumerable ?? true,
        get: descriptor.get,
        set: descriptor.set,
      });
    } catch (error) {
      void error;
    }
    return;
  }
};

const relaxConsoleMethodDescriptors = (target) => {
  if (!target) {
    return;
  }

  ['assert', 'debug', 'dir', 'error', 'info', 'log', 'trace', 'warn'].forEach((method) => {
    makePropertyWritable(target, method);
  });
};

const originalLoad = Module._load;

Module._load = function patchedLoad(request, ...args) {
  const exports = originalLoad.apply(this, [request, ...args]);

  if (request === '@jest/console' && exports && !exports.__cameraPowerPlannerPatched) {
    relaxConsoleMethodDescriptors(exports?.Console?.prototype);
    relaxConsoleMethodDescriptors(exports?.BufferedConsole?.prototype);
    relaxConsoleMethodDescriptors(exports?.CustomConsole?.prototype);
    Object.defineProperty(exports, '__cameraPowerPlannerPatched', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: true,
    });
  }

  return exports;
};

try {
  const { ModuleMocker } = require('jest-mock');
  const originalSpyOn = ModuleMocker?.prototype?.spyOn;

  if (typeof originalSpyOn === 'function' && !ModuleMocker.prototype.__cameraPowerPlannerPatched) {
    ModuleMocker.prototype.spyOn = function patchedSpyOn(target, property, accessType) {
      try {
        return originalSpyOn.call(this, target, property, accessType);
      } catch (error) {
        if (error instanceof TypeError && /Cannot assign to read only property/.test(String(error?.message ?? error))) {
          makePropertyWritable(target, property);
          return originalSpyOn.call(this, target, property, accessType);
        }
        throw error;
      }
    };

    Object.defineProperty(ModuleMocker.prototype, '__cameraPowerPlannerPatched', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: true,
    });
  }
} catch (error) {
  void error;
}
