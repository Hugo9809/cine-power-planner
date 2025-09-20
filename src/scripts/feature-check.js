(function () {
  const sample = { nested: { value: 1 } };
  const result = sample?.nested?.value ?? 2;
  if (result === 1) {
    try {
      Object.defineProperty(window, '__CINE_POWER_FEATURE_CHECK__', {
        configurable: true,
        writable: true,
        value: 'modern-supported',
      });
    } catch {
      window.__CINE_POWER_FEATURE_CHECK__ = 'modern-supported';
    }
  }
})();
