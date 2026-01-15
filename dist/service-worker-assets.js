(function createServiceWorkerAssetManifest(globalScope) {
  const assets = [
    "./",
    "./app-version.js",
    "./assets/EssentialIconsV2-400-normal-B5SIO-xz.woff",
    "./assets/FilmIndustryIconsV2-400-normal-DTo4Zdf3.woff2",
    "./assets/GadgetIconsV2-400-normal-CL5qmqWl.woff",
    "./assets/Icon Bluenew-cgvOfjQ4.svg",
    "./assets/Ubuntu-Italic-7i5B2jgp.ttf",
    "./assets/Ubuntu-Light-DlXMI-yU.ttf",
    "./assets/Ubuntu-LightItalic-CEKA6hqe.ttf",
    "./assets/Ubuntu-Regular-bmdV8fUx.ttf",
    "./assets/UiconsThinStraightV2-400-normal-KgBOFEf8.woff2",
    "./assets/app-icon-C1js1k8i.png",
    "./assets/contacts-BFtZKPDa.css",
    "./assets/core-modules-Be_U3JJE.js",
    "./assets/data-So-wGb1N.js",
    "./assets/de-C03m4Y6h.js",
    "./assets/es-BFl1f0yX.js",
    "./assets/fr-gLkNwM_L.js",
    "./assets/it-CnY_oOy7.js",
    "./assets/main-CBa7JvvH.css",
    "./assets/main-JqIge9Ya.js",
    "./assets/manifest-DW5nU4oi.webmanifest",
    "./assets/overview-print-CTihaGRx.css",
    "./assets/own-gear-CSm93DJ1.js",
    "./assets/owned-gear-D1_apNqb.css",
    "./assets/rules-view-H7Qqifg_.css",
    "./assets/settings-B7NLmzNQ.css",
    "./assets/v2-ui-czcGWvey.js",
    "./assets/vendor-DzOFLsIx.js",
    "./index.html",
    "./service-worker.js"
  ];

  if (globalScope && typeof globalScope === 'object') {
    globalScope.SERVICE_WORKER_ASSETS = assets;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = assets;
  }

  return assets;
})(typeof self !== 'undefined' ? self : typeof globalThis !== 'undefined' ? globalThis : undefined);
