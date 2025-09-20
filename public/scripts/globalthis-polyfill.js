// Polyfill globalThis for older Safari versions
if (typeof globalThis === 'undefined') {
  // `var` ensures we create a global property without throwing
  // even when the identifier does not yet exist.
  var globalThis = (function () { return this; })(); // eslint-disable-line no-redeclare
}
