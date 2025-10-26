const fs = require('fs');
const path = require('path');

const EXPLICIT_ASSET_ENTRIES = ['./'];

const EXPLICIT_FILES = [
  'index.html',
  'app-version.js',
  'manifest.webmanifest',
  'service-worker-assets.js',
  path.join('src', 'icons', 'Icon Bluenew.svg'),
  path.join('src', 'icons', 'Icon Pinknew.svg'),
];

const TOOL_WHITELIST = new Set([
  'checkConsistency.js',
  'cliHelp.js',
  'findMissingAttributes.js',
  'generateSchema.js',
  'normalizeData.js',
  'runDomTests.js',
  'runUnitTests.js',
  'unifyPorts.js',
]);

const TOP_LEVEL_DOC_PATTERN = /^(README.*|CONTRIBUTING|SECURITY)\.md$/i;

const DIRECTORY_RULES = [
  { dir: 'legal', recursive: true },
  { dir: path.join('src', 'styles'), recursive: true },
  { dir: path.join('src', 'scripts'), recursive: true },
  { dir: path.join('src', 'vendor'), recursive: true },
  { dir: path.join('src', 'data'), recursive: true },
  { dir: path.join('legacy', 'data'), recursive: true },
  { dir: path.join('legacy', 'scripts'), recursive: true },
  { dir: path.join('legacy', 'polyfills'), recursive: true },
  { dir: path.join('src', 'fonts'), recursive: true },
  { dir: path.join('src', 'illustrations'), recursive: true },
  { dir: path.join('src', 'animations'), recursive: true },
  { dir: 'animated icons 3', recursive: true },
  { dir: 'docs', recursive: true },
  {
    dir: 'tools',
    recursive: false,
    filter: relativePath => TOOL_WHITELIST.has(path.basename(relativePath)),
  },
  { dir: path.join('src', 'icons'), recursive: true },
];

function normalizeAssetPath(relativePath) {
  const unixPath = relativePath.split(path.sep).join('/');
  const encodedPath = unixPath
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/');
  return `./${encodedPath}`;
}

function isHiddenEntry(name) {
  return name.startsWith('.');
}

function collectFromDirectory(projectRoot, relativeDir, options, collector) {
  const fullDir = path.join(projectRoot, relativeDir);
  if (!fs.existsSync(fullDir)) {
    return;
  }

  const entries = fs
    .readdirSync(fullDir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));

  entries.forEach(entry => {
    if (isHiddenEntry(entry.name)) {
      return;
    }

    const entryRelativePath = path.join(relativeDir, entry.name);

    if (entry.isDirectory()) {
      if (options.recursive) {
        collectFromDirectory(projectRoot, entryRelativePath, options, collector);
      }
      return;
    }

    if (options.filter && !options.filter(entryRelativePath, entry.name)) {
      return;
    }

    collector.add(normalizeAssetPath(entryRelativePath));
  });
}

function collectServiceWorkerAssets(projectRoot) {
  const normalizedRoot = projectRoot || process.cwd();
  const assets = new Set();

  EXPLICIT_ASSET_ENTRIES.forEach(entry => assets.add(entry));

  EXPLICIT_FILES.forEach(fileName => {
    const filePath = path.join(normalizedRoot, fileName);
    if (fs.existsSync(filePath)) {
      assets.add(normalizeAssetPath(fileName));
    }
  });

  // Guarantee the manifest always lists itself so the service worker can recover
  // after regeneration, even when the file is being created for the first time.
  assets.add(normalizeAssetPath('service-worker-assets.js'));

  fs.readdirSync(normalizedRoot, { withFileTypes: true })
    .filter(entry => entry.isFile() && TOP_LEVEL_DOC_PATTERN.test(entry.name))
    .forEach(entry => {
      assets.add(normalizeAssetPath(entry.name));
    });

  DIRECTORY_RULES.forEach(rule => {
    collectFromDirectory(normalizedRoot, rule.dir, rule, assets);
  });

  const sortedAssets = Array.from(assets).sort((a, b) => {
    if (a === './') {
      return b === './' ? 0 : -1;
    }
    if (b === './') {
      return 1;
    }
    return a.localeCompare(b, 'en');
  });

  return sortedAssets;
}

module.exports = { collectServiceWorkerAssets };
