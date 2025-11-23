const fs = require('fs');
const path = require('path');

function loadAppVersion(projectRoot) {
  const appVersionModule = require(path.join(projectRoot, 'app-version.js'));
  if (typeof appVersionModule === 'string') {
    return appVersionModule;
  }
  if (appVersionModule && typeof appVersionModule.APP_VERSION === 'string') {
    return appVersionModule.APP_VERSION;
  }
  if (appVersionModule && typeof appVersionModule.default === 'string') {
    return appVersionModule.default;
  }
  throw new Error('Unable to resolve application version from app-version.js');
}

function writeJsonFile(filePath, data) {
  const serialized = `${JSON.stringify(data, null, 2)}\n`;
  fs.writeFileSync(filePath, serialized, 'utf8');
}

function syncPackageJsonVersion(projectRoot, appVersion) {
  const packageJsonPath = path.join(projectRoot, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  if (packageJson.version === appVersion) {
    return false;
  }

  packageJson.version = appVersion;
  writeJsonFile(packageJsonPath, packageJson);
  return true;
}

function syncPackageLockVersion(projectRoot, appVersion) {
  const lockPath = path.join(projectRoot, 'package-lock.json');
  const lockJson = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
  let changed = false;

  if (lockJson.version !== appVersion) {
    lockJson.version = appVersion;
    changed = true;
  }

  if (lockJson.packages && lockJson.packages['']) {
    if (lockJson.packages[''].version !== appVersion) {
      lockJson.packages[''].version = appVersion;
      changed = true;
    }
  }

  if (changed) {
    writeJsonFile(lockPath, lockJson);
  }

  return changed;
}

function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const appVersion = loadAppVersion(projectRoot);

  let modifications = 0;
  if (syncPackageJsonVersion(projectRoot, appVersion)) {
    modifications += 1;
  }
  if (syncPackageLockVersion(projectRoot, appVersion)) {
    modifications += 1;
  }

  if (modifications === 0) {
    console.log(`package metadata already matches app version ${appVersion}`);
    return;
  }

  console.log(`Synchronized package metadata to app version ${appVersion}`);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message || error);
    process.exitCode = 1;
  }
}

module.exports = {
  syncPackageJsonVersion,
  syncPackageLockVersion,
  loadAppVersion,
};
