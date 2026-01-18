if (typeof globalThis === 'undefined') {
  var globalThis = function () {
    return this;
  }();
}