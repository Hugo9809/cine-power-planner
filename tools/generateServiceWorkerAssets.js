const fs = require('fs');
const path = require('path');
const { collectServiceWorkerAssets } = require('./serviceWorkerAssetManifest');

function renderManifestModule(assets) {
  const serialized = JSON.stringify(assets, null, 2);
  return `/* eslint-env serviceworker */\n(function createServiceWorkerAssetManifest(globalScope) {\n  const assets = ${serialized};\n\n  if (globalScope && typeof globalScope === 'object') {\n    globalScope.SERVICE_WORKER_ASSETS = assets;\n  }\n\n  if (typeof module !== 'undefined' && module.exports) {\n    module.exports = assets;\n  }\n\n  return assets;\n})(typeof self !== 'undefined' ? self : typeof globalThis !== 'undefined' ? globalThis : undefined);\n`;
}

function writeManifestFile(projectRoot, assets) {
  const targetPath = path.join(projectRoot, 'service-worker-assets.js');
  const manifestSource = renderManifestModule(assets);
  fs.writeFileSync(targetPath, manifestSource, 'utf8');
  return targetPath;
}

function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const assets = collectServiceWorkerAssets(projectRoot);
  const manifestPath = writeManifestFile(projectRoot, assets);
  console.log(`Generated ${path.relative(projectRoot, manifestPath)} with ${assets.length} assets.`);
}

if (require.main === module) {
  main();
}

module.exports = { renderManifestModule, writeManifestFile };
