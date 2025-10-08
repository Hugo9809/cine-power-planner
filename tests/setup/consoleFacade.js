function cloneConsole(baseConsole) {
  const facade = {};

  Reflect.ownKeys(baseConsole).forEach((key) => {
    if (key === '__cameraPowerPlannerOriginal' || key === '__cameraPowerPlannerProxy') {
      return;
    }

    let value;
    try {
      value = baseConsole[key];
    } catch (error) {
      void error;
      return;
    }

    if (typeof value === 'function') {
      const bound = value.bind(baseConsole);
      Object.defineProperty(facade, key, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: (...args) => bound(...args),
      });
    } else {
      Object.defineProperty(facade, key, {
        configurable: true,
        enumerable: true,
        writable: true,
        value,
      });
    }
  });

  Object.defineProperty(facade, '__cameraPowerPlannerOriginal', {
    value: baseConsole,
    configurable: false,
    enumerable: false,
    writable: false,
  });

  Object.defineProperty(facade, '__cameraPowerPlannerProxy', {
    value: true,
    configurable: false,
    enumerable: false,
    writable: false,
  });

  return facade;
}

function ensureConsoleFacade() {
  const descriptor = Object.getOwnPropertyDescriptor(global, 'console');
  let baseConsole = descriptor && 'value' in descriptor ? descriptor.value : global.console;
  let facade = cloneConsole(baseConsole);

  Object.defineProperty(global, 'console', {
    configurable: true,
    enumerable: descriptor ? descriptor.enumerable : true,
    get() {
      return facade;
    },
    set(nextConsole) {
      baseConsole = nextConsole;
      facade = cloneConsole(baseConsole);
    },
  });

  global.console = facade;
  return facade;
}

module.exports = {
  ensureConsoleFacade,
};

ensureConsoleFacade();
