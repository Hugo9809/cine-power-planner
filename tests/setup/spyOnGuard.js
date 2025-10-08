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

try {
  const { Console } = require('console');
  relaxConsoleMethodDescriptors(Console?.prototype);
} catch (error) {
  void error;
}

try {
  const jestConsole = require('@jest/console');
  relaxConsoleMethodDescriptors(jestConsole?.BufferedConsole?.prototype);
  relaxConsoleMethodDescriptors(jestConsole?.CustomConsole?.prototype);
} catch (error) {
  void error;
}

relaxConsoleMethodDescriptors(global?.console);

const originalSpyOn = jest.spyOn.bind(jest);

jest.spyOn = (target, property, accessType) => {
  try {
    return originalSpyOn(target, property, accessType);
  } catch (error) {
    if (error instanceof TypeError && /Cannot assign to read only property/.test(String(error?.message ?? error))) {
      makePropertyWritable(target, property);
      return originalSpyOn(target, property, accessType);
    }
    throw error;
  }
};
