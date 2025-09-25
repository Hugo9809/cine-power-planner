const fs = require('fs');
const path = require('path');

describe('loader script bundles', () => {
  const loaderPath = path.join(__dirname, '..', '..', 'src', 'scripts', 'loader.js');
  const loaderSource = fs.readFileSync(loaderPath, 'utf8');
  const legacyLoaderPath = path.join(__dirname, '..', '..', 'legacy', 'scripts', 'loader.js');
  const legacyLoaderSource = fs.readFileSync(legacyLoaderPath, 'utf8');

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

  test('legacy bundle migrates auto gear retention storage keys', () => {
    expect(legacyLoaderSource).toContain("autoGearBackupRetention");
    expect(legacyLoaderSource).toContain("cameraPowerPlanner_autoGearBackupRetention");
  });

  test('modern bundle migrates auto gear monitor defaults keys', () => {
    expect(loaderSource).toContain("autoGearMonitorDefaults");
    expect(loaderSource).toContain("cameraPowerPlanner_autoGearMonitorDefaults");
  });

  test('legacy bundle migrates auto gear monitor defaults keys', () => {
    expect(legacyLoaderSource).toContain("autoGearMonitorDefaults");
    expect(legacyLoaderSource).toContain("cameraPowerPlanner_autoGearMonitorDefaults");
  });
});
