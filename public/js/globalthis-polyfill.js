// Polyfill globalThis for older Safari versions
if (typeof globalThis === 'undefined') {
  (function () { this.globalThis = this; })();
}
