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
    "./assets/auto-gear-rules-DS0lYD-U.js",
    "./assets/contacts-Do1OeS7p.css",
    "./assets/core-modules-DlPoJ4C3.js",
    "./assets/data-So-wGb1N.js",
    "./assets/de-COP2X5NY.js",
    "./assets/es-C6TBM6wR.js",
    "./assets/fr-B9hw2SLU.js",
    "./assets/it-CAWsErIB.js",
    "./assets/main-BamV2Yfq.css",
    "./assets/main-P40cA4Iv.js",
    "./assets/manifest-DW5nU4oi.webmanifest",
    "./assets/overview-print-CTihaGRx.css",
    "./assets/own-gear-CSm93DJ1.js",
    "./assets/owned-gear-D1_apNqb.css",
    "./assets/rules-view-H7Qqifg_.css",
    "./assets/settings-B7NLmzNQ.css",
    "./assets/v2-ui-CGKqhVaB.js",
    "./assets/vendor-BnBlqqbr.js",
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
