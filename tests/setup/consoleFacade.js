function bindConsoleValue(baseConsole, descriptor, property) {
  if (!descriptor) {
    return undefined;
  }

  if ('get' in descriptor || 'set' in descriptor) {
    const bound = {};
    if (typeof descriptor.get === 'function') {
      bound.get = descriptor.get.bind(baseConsole);
    }
    if (typeof descriptor.set === 'function') {
      bound.set = descriptor.set.bind(baseConsole);
    }
    bound.enumerable = descriptor.enumerable ?? true;
    bound.configurable = true;
    return bound;
  }

  const value = descriptor.value;
  return {
    configurable: true,
    enumerable: descriptor.enumerable ?? true,
    writable: true,
    value: typeof value === 'function' ? value.bind(baseConsole) : value,
  };
}

function createConsoleFacade(baseConsole) {
  if (!baseConsole || baseConsole.__cameraPowerPlannerProxy) {
    return baseConsole;
  }

  const facade = {};
  const define = (property) => {
    const descriptor = bindConsoleValue(baseConsole, Object.getOwnPropertyDescriptor(baseConsole, property), property);
    if (descriptor) {
      Object.defineProperty(facade, property, descriptor);
    }
  };

  Reflect.ownKeys(baseConsole).forEach(define);

  Object.defineProperty(facade, '__cameraPowerPlannerProxy', {
    value: true,
    configurable: false,
    enumerable: false,
    writable: false,
  });

  Object.defineProperty(facade, '__cameraPowerPlannerOriginal', {
    value: baseConsole,
    configurable: false,
    enumerable: false,
    writable: false,
  });

  return facade;
}

function ensureConsoleFacade() {
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
}

module.exports = {
  ensureConsoleFacade,
};
