import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// import { createRequire } from 'module';
import { collectServiceWorkerAssets } from './serviceWorkerAssetManifest.js';
import devices from '../src/data/index.js';

// const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function checkConsistency(deviceData = devices) {
  const rules = {
    cameras: [
      'powerDrawWatts',
      'power',
      'videoOutputs',
      'fizConnectors',
      'recordingMedia',
      'viewfinder',
      'lensMount',
      'timecode',
    ],
    monitors: ['powerDrawWatts', 'power', 'videoInputs', 'videoOutputs'],
    video: ['powerDrawWatts', 'power', 'videoInputs', 'videoOutputs'],
  };
  const inconsistent = [];

  for (const [category, fields] of Object.entries(rules)) {
    const collection = deviceData[category] || {};
    for (const [name, device] of Object.entries(collection)) {
      if (name === 'None') continue;
      const missing = fields.filter(f => device[f] == null);
      if (missing.length) inconsistent.push({ category, name, missing });
    }
  }

  return inconsistent;
}

function loadManifestAssets(manifestPath) {
  const resolvedPath = path.resolve(manifestPath);
  if (!fs.existsSync(resolvedPath)) {
    return { error: new Error(`Missing manifest file at ${resolvedPath}`) };
  }

  try {
    // Clear any existing cached value from previous runs
    if (Object.prototype.hasOwnProperty.call(globalThis, 'SERVICE_WORKER_ASSETS')) {
      delete globalThis.SERVICE_WORKER_ASSETS;
    }

    // Read and execute the manifest IIFE - it sets globalThis.SERVICE_WORKER_ASSETS
    const manifestSource = fs.readFileSync(resolvedPath, 'utf8');
    // Use indirect eval to run in global scope
    const indirectEval = eval;
    indirectEval(manifestSource);

    const assets = globalThis.SERVICE_WORKER_ASSETS;
    if (!Array.isArray(assets)) {
      return { error: new Error('Manifest did not export an array of asset URLs.') };
    }
    return { assets };
  } catch (error) {
    return { error };
  } finally {
    if (Object.prototype.hasOwnProperty.call(globalThis, 'SERVICE_WORKER_ASSETS')) {
      delete globalThis.SERVICE_WORKER_ASSETS;
    }
  }
}

function diffManifestAssets(expectedAssets, manifestAssets) {
  const expectedSet = new Set(expectedAssets);
  const manifestSet = new Set(manifestAssets);

  const missing = expectedAssets.filter(asset => !manifestSet.has(asset));
  const unexpected = manifestAssets.filter(asset => !expectedSet.has(asset));

  const outOfOrder = [];
  if (missing.length === 0 && unexpected.length === 0 && expectedAssets.length === manifestAssets.length) {
    for (let index = 0; index < expectedAssets.length; index += 1) {
      if (expectedAssets[index] !== manifestAssets[index]) {
        outOfOrder.push({ index, expected: expectedAssets[index], actual: manifestAssets[index] });
      }
    }
  }

  return { missing, unexpected, outOfOrder };
}

function checkServiceWorkerManifest({
  projectRoot = path.resolve(__dirname, '..'),
  manifestPath = path.join(projectRoot, 'service-worker-assets.js'),
  expectedAssets,
} = {}) {
  const manifestResult = loadManifestAssets(manifestPath);
  if (manifestResult.error) {
    return {
      ok: false,
      error: manifestResult.error,
      expected: expectedAssets,
      manifestPath,
    };
  }

  const collectedAssets = expectedAssets || collectServiceWorkerAssets(projectRoot);
  const differences = diffManifestAssets(collectedAssets, manifestResult.assets);
  const ok = differences.missing.length === 0 && differences.unexpected.length === 0 && differences.outOfOrder.length === 0;

  return {
    ok,
    expected: collectedAssets,
    actual: manifestResult.assets,
    differences,
    manifestPath,
  };
}

function runAllConsistencyChecks() {
  const deviceIssues = checkConsistency();
  const manifestCheck = checkServiceWorkerManifest();

  return { deviceIssues, manifestCheck };
}

// ESM main check
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log(
      [
        'Usage: node checkConsistency.js [options]',
        '',
        'Validates device entries in src/data/index.js before normalization scripts touch the dataset.',
        '',
        'Checks the following collections and required keys:',
        '  - cameras: powerDrawWatts, power, videoOutputs, fizConnectors, recordingMedia, viewfinder, lensMount, timecode.',
        '  - monitors: powerDrawWatts, power, videoInputs, videoOutputs.',
        '  - video (wireless links): powerDrawWatts, power, videoInputs, videoOutputs.',
        '',
        'Additionally verifies that service-worker-assets.js matches the manifest generated in memory.',
        '  - Diff is performed entirely in-process so the guard runs offline.',
        '  - When drift is detected, rerun `npm run generate:sw-assets` and commit the updated manifest.',
        '',
        'Output:',
        '  - Prints a JSON array describing each device with missing metadata.',
        '  - Exits with status 1 when inconsistencies are found; otherwise exits with status 0.',
        '',
        'Recommended workflow:',
        '  1. Run after editing files in src/data/devices/ to catch omissions early.',
        '  2. Fix the reported "missing" keys and rerun until the summary reads "All devices have required fields."',
        '  3. Continue with `npm run normalize` and `npm run unify-ports` once this check passes.',
        '',
        'Examples:',
        '  npm run check-consistency',
        '  npm run check-consistency -- --help',
        '  node checkConsistency.js --help',
        '',
        'Options:',
        '  -h, --help     Show this help message and exit.'
      ].join('\n')
    );
    process.exit(0);
  }

  const { deviceIssues, manifestCheck } = runAllConsistencyChecks();
  let exitCode = 0;

  if (deviceIssues.length) {
    console.log('Devices missing fields:', deviceIssues);
    exitCode = 1;
  } else {
    console.log('All devices have required fields.');
  }

  if (!manifestCheck.ok) {
    exitCode = 1;
    if (manifestCheck.error) {
      console.error('Service worker asset manifest check failed:', manifestCheck.error.message);
    } else {
      const { missing, unexpected, outOfOrder } = manifestCheck.differences;
      console.error('Service worker asset manifest drift detected.');
      if (missing.length) {
        console.error('Missing assets:', missing);
      }
      if (unexpected.length) {
        console.error('Unexpected assets:', unexpected);
      }
      if (outOfOrder.length) {
        console.error('Out-of-order assets:', outOfOrder);
      }
    }
    console.error('Run `npm run generate:sw-assets` to regenerate the manifest, then commit the result.');
  } else {
    console.log('Service worker asset manifest is up to date.');
  }

  process.exitCode = exitCode;
}

export default Object.assign(checkConsistency, {
  checkServiceWorkerManifest,
  diffManifestAssets,
  runAllConsistencyChecks,
});
