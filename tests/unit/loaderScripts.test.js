const fs = require('fs');
const path = require('path');
const vm = require('vm');

describe('loader script bundles', () => {
  const loaderPath = path.join(__dirname, '..', '..', 'src', 'scripts', 'loader.js');
  const loaderSource = fs.readFileSync(loaderPath, 'utf8');
  const legacyLoaderPath = path.join(__dirname, '..', '..', 'legacy', 'scripts', 'loader.js');
  const legacyLoaderSource = fs.readFileSync(legacyLoaderPath, 'utf8');
  const appCoreEnvironmentPath = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'scripts',
    'app-core-environment.js'
  );
  const appCoreEnvironmentSource = fs.readFileSync(appCoreEnvironmentPath, 'utf8');
  const legacyAppCoreEnvironmentPath = path.join(
    __dirname,
    '..',
    '..',
    'legacy',
    'scripts',
    'app-core-environment.js'
  );
  const legacyAppCoreEnvironmentSource = fs.readFileSync(legacyAppCoreEnvironmentPath, 'utf8');

  test('modern bundle loads charger data', () => {
    expect(loaderSource).toMatch(/['"]src\/data\/devices\/chargers\.js['"]/);
  });

  test('legacy bundle loads charger data', () => {
    expect(loaderSource).toMatch(/['"]legacy\/data\/devices\/chargers\.js['"]/);
  });

  test('modern bundle migrates auto gear retention storage keys', () => {
    expect(loaderSource).toContain("autoGearBackupRetention");
    expect(loaderSource).toContain("cameraPowerPlanner_autoGearBackupRetention");
  });

  test('modern bundle loads onboarding tutorial module', () => {
    expect(loaderSource).toContain('src/scripts/modules/features/onboarding-tour.js');
    expect(loaderSource).toContain('legacy/scripts/modules/features/onboarding-tour.js');
  });

  test('modern bundle loads runtime environment helpers', () => {
    expect(appCoreEnvironmentSource).toContain("require('./modules/runtime-environment-helpers.js')");
  });

  test('legacy bundle migrates auto gear retention storage keys', () => {
    expect(legacyLoaderSource).toContain("autoGearBackupRetention");
    expect(legacyLoaderSource).toContain("cameraPowerPlanner_autoGearBackupRetention");
  });

  test('legacy loader includes onboarding tutorial module', () => {
    expect(legacyLoaderSource).toContain('src/scripts/modules/features/onboarding-tour.js');
    expect(legacyLoaderSource).toContain('legacy/scripts/modules/features/onboarding-tour.js');
  });

  test('legacy loader includes runtime environment helpers', () => {
    expect(legacyAppCoreEnvironmentSource).toContain("require('./modules/runtime-environment-helpers.js')");
  });

  test('modern bundle migrates auto gear monitor defaults keys', () => {
    expect(loaderSource).toContain("autoGearMonitorDefaults");
    expect(loaderSource).toContain("cameraPowerPlanner_autoGearMonitorDefaults");
  });

  test('legacy bundle migrates auto gear monitor defaults keys', () => {
    expect(legacyLoaderSource).toContain("autoGearMonitorDefaults");
    expect(legacyLoaderSource).toContain("cameraPowerPlanner_autoGearMonitorDefaults");
  });

  test('modern support check evaluates to a boolean sentinel', () => {
    const modernSupportPath = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'scripts',
      'modern-support-check.mjs',
    );
    const modernSupportSource = fs.readFileSync(modernSupportPath, 'utf8');
    const context = vm.createContext({ globalThis: {} });
    const sanitizedSource = modernSupportSource.replace(/\n?export\s*\{\s*\};?\s*$/, '');
    vm.runInContext(sanitizedSource, context);

    const flag = context.globalThis.__cinePowerOptionalChainingCheck__;
    expect(typeof flag).toBe('boolean');
    expect(flag).toBe(true);
  });

  test('loader cleanup removes optional chaining sentinel safely', () => {
    expect(loaderSource).toContain('delete scope[OPTIONAL_CHAINING_FLAG];');
    expect(loaderSource).toContain('scope[OPTIONAL_CHAINING_FLAG] = undefined;');
    expect(legacyLoaderSource).toContain('delete scope[OPTIONAL_CHAINING_FLAG];');
    expect(legacyLoaderSource).toContain('scope[OPTIONAL_CHAINING_FLAG] = undefined;');
  });
});
