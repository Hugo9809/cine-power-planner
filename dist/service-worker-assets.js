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
    "./assets/contacts-Cu1vBGIE.css",
    "./assets/core-modules-CvxJ6PMl.js",
    "./assets/data-B26rSgVw.js",
    "./assets/de-pvgUBqlH.js",
    "./assets/es-eujsHFI_.js",
    "./assets/fr-Dpl-mot0.js",
    "./assets/it-EA9DKM11.js",
    "./assets/main-BSN_IgTq.css",
    "./assets/main-C8GHSTtM.js",
    "./assets/manifest-DW5nU4oi.webmanifest",
    "./assets/overview-print-CTihaGRx.css",
    "./assets/own-gear-CSm93DJ1.js",
    "./assets/owned-gear-D1_apNqb.css",
    "./assets/rules-view-Cc041Lt8.css",
    "./assets/settings-B5-wQjsT.css",
    "./assets/v2-ui-BwEyNXHr.js",
    "./assets/vendor-Dzz8Pluk.js",
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
