if (typeof globalThis !== 'undefined') {
  try {
    globalThis.APP_VERSION = APP_VERSION;
  } catch {
    try {
      Object.defineProperty(globalThis, 'APP_VERSION', {
        value: APP_VERSION,
        configurable: true,
        writable: true,
      });
    } catch (defineError) {
      void defineError;
    }
  }
}
