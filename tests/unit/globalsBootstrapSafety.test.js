const fs = require('fs');
const path = require('path');

describe('core runtime global bootstrapping', () => {
  const modernBootstrap = fs.readFileSync(
    path.join(__dirname, '..', '..', 'src', 'scripts', 'globals-bootstrap.js'),
    'utf8',
  );
  const legacyBootstrap = fs.readFileSync(
    path.join(__dirname, '..', '..', 'legacy', 'scripts', 'globals-bootstrap.js'),
    'utf8',
  );
  const modernShim = fs.readFileSync(
    path.join(__dirname, '..', '..', 'src', 'scripts', 'globals-legacy-shim.js'),
    'utf8',
  );
  const legacyShim = fs.readFileSync(
    path.join(__dirname, '..', '..', 'legacy', 'scripts', 'globals-legacy-shim.js'),
    'utf8',
  );

  const criticalNames = [
    'autoGearAutoPresetId',
    'baseAutoGearRules',
    'autoGearScenarioModeSelect',
    'autoGearRuleNameInput',
    'autoGearSummaryFocus',
    'autoGearMonitorDefaultControls',
    'safeGenerateConnectorSummary',
    'totalPowerElem',
  ];

  test('modern bootstrap defines critical global fallbacks', () => {
    criticalNames.forEach(name => {
      expect(modernBootstrap).toContain(name);
    });
  });

  test('legacy bootstrap mirrors critical global fallbacks', () => {
    criticalNames.forEach(name => {
      expect(legacyBootstrap).toContain(name);
    });
  });

  test('modern shim ensures critical globals bind safely', () => {
    criticalNames.forEach(name => {
      expect(modernShim).toContain(name);
    });
  });

  test('legacy shim ensures critical globals bind safely', () => {
    criticalNames.forEach(name => {
      expect(legacyShim).toContain(name);
    });
  });
});
