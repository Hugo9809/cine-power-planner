const fs = require('fs');
const path = require('path');
const { collectServiceWorkerAssets } = require('./serviceWorkerAssetManifest');

const ANIMATION_DIRECTORIES = [path.join('src', 'animations'), 'animated icons 3'];
const PINK_MODE_SOURCE_PATH = path.join('src', 'scripts', 'modules', 'core', 'pink-mode.js');

function normalizeAssetPath(relativePath) {
  return (
    './' +
    relativePath
      .split(path.sep)
      .join('/')
      .split('/')
      .map(segment => encodeURIComponent(segment))
      .join('/')
  );
}

function isHiddenEntry(name) {
  return name.startsWith('.');
}

function walkAnimationDirectory(projectRoot, relativeDir, collector) {
  const absoluteDir = path.join(projectRoot, relativeDir);
  if (!fs.existsSync(absoluteDir)) {
    return;
  }

  const entries = fs
    .readdirSync(absoluteDir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));

  entries.forEach(entry => {
    if (isHiddenEntry(entry.name)) {
      return;
    }

    const entryRelativePath = path.join(relativeDir, entry.name);

    if (entry.isDirectory()) {
      walkAnimationDirectory(projectRoot, entryRelativePath, collector);
      return;
    }

    if (path.extname(entry.name).toLowerCase() !== '.json') {
      return;
    }

    collector.add(normalizeAssetPath(entryRelativePath));
  });
}

function collectAnimationAssets(projectRoot) {
  const assets = new Set();
  ANIMATION_DIRECTORIES.forEach(relativeDir => {
    walkAnimationDirectory(projectRoot, relativeDir, assets);
  });
  return assets;
}

function ensureAnimationAssets(assets, projectRoot) {
  const mergedAssets = new Set(Array.isArray(assets) ? assets : []);
  const animationAssets = collectAnimationAssets(projectRoot);
  let addedCount = 0;

  animationAssets.forEach(asset => {
    if (!mergedAssets.has(asset)) {
      mergedAssets.add(asset);
      addedCount += 1;
    }
  });

  const sortedAssets = Array.from(mergedAssets).sort((a, b) => {
    if (a === './') {
      return b === './' ? 0 : -1;
    }
    if (b === './') {
      return 1;
    }
    return a.localeCompare(b, 'en');
  });

  return { assets: sortedAssets, addedCount };
}

function extractPinkModeAnimatedIconFiles(projectRoot) {
  const sourcePath = path.join(projectRoot, PINK_MODE_SOURCE_PATH);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Unable to locate pink mode source file at ${sourcePath}`);
  }

  const source = fs.readFileSync(sourcePath, 'utf8');
  const arrayMatch = source.match(
    /PINK_MODE_ANIMATED_ICON_FILES\s*=\s*Object\.freeze\(\s*\[(.*?)\]\s*\)/s,
  );

  if (!arrayMatch) {
    throw new Error('Unable to locate PINK_MODE_ANIMATED_ICON_FILES definition.');
  }

  const filePattern = /'([^']+)'/g;
  const files = new Set();
  let match = filePattern.exec(arrayMatch[1]);
  while (match) {
    files.add(normalizeAssetPath(match[1]));
    match = filePattern.exec(arrayMatch[1]);
  }

  if (!files.size) {
    throw new Error('No animation files were extracted from PINK_MODE_ANIMATED_ICON_FILES.');
  }

  return files;
}

function verifyPinkModeAssets(manifestAssets, projectRoot) {
  const manifestSet = new Set(manifestAssets);
  const pinkModeFiles = extractPinkModeAnimatedIconFiles(projectRoot);
  const missing = [];

  pinkModeFiles.forEach(file => {
    if (!manifestSet.has(file)) {
      missing.push(file);
    }
  });

  if (missing.length) {
    throw new Error(
      `The service worker asset manifest is missing the following pink mode assets:\n${missing.join('\n')}`,
    );
  }

  return pinkModeFiles.size;
}

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
  const initialAssets = collectServiceWorkerAssets(projectRoot);
  const { assets, addedCount } = ensureAnimationAssets(initialAssets, projectRoot);
  const verifiedCount = verifyPinkModeAssets(assets, projectRoot);
  const manifestPath = writeManifestFile(projectRoot, assets);
  console.log(
    `Generated ${path.relative(projectRoot, manifestPath)} with ${assets.length} assets (added ${addedCount} animation entries, verified ${verifiedCount} pink mode files).`,
  );
}

if (require.main === module) {
  main();
}

module.exports = { renderManifestModule, writeManifestFile };
