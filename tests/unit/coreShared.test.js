const path = require('path');

const { setupModuleHarness } = require('../helpers/moduleHarness');

describe('core shared utilities', () => {
  let harness;

  function cleanupGlobals() {
    delete global.generateConnectorSummary;
    delete global.cineCoreShared;
    delete global.APP_VERSION;
    delete global.stableStringify;
    delete global.humanizeKey;
  }

  beforeEach(() => {
    harness = setupModuleHarness();
    cleanupGlobals();
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    if (console.warn && typeof console.warn.mockRestore === 'function') {
      console.warn.mockRestore();
    }
    cleanupGlobals();
    if (harness) {
      harness.teardown();
      harness = null;
    }
  });

  function loadCoreShared() {
    const modulePath = path.resolve(__dirname, '../../src/scripts/modules/core-shared.js');
    return require(modulePath);
  }

  test('stableStringify sorts object keys recursively', () => {
    const { stableStringify } = loadCoreShared();

    const input = {
      z: 1,
      a: {
        d: 4,
        c: 3,
      },
      list: [
        {
          b: 2,
          a: 1,
        },
      ],
    };

    expect(stableStringify(input)).toBe('{"a":{"c":3,"d":4},"list":[{"a":1,"b":2}],"z":1}');
  });

  test('humanizeKey uses overrides and humanizes camelCase values', () => {
    const { humanizeKey } = loadCoreShared();

    expect(humanizeKey('powerDrawWatts')).toBe('Power (W)');
    expect(humanizeKey('maxLoadCapacity')).toBe('Max Load Capacity');
  });

  test('safeGenerateConnectorSummary returns empty string when generator is unavailable', () => {
    const { safeGenerateConnectorSummary } = loadCoreShared();

    expect(safeGenerateConnectorSummary({ name: 'Device' })).toBe('');
    expect(console.warn).not.toHaveBeenCalled();
  });

  test('safeGenerateConnectorSummary uses cached generator and surfaces warnings when it fails', () => {
    const generator = jest.fn(() => 'Summary text');
    global.generateConnectorSummary = generator;

    const { safeGenerateConnectorSummary } = loadCoreShared();

    expect(safeGenerateConnectorSummary({ name: 'Camera' })).toBe('Summary text');
    expect(generator).toHaveBeenCalledTimes(1);

    delete global.generateConnectorSummary;

    expect(safeGenerateConnectorSummary({ name: 'Follow-up' })).toBe('Summary text');
    expect(generator).toHaveBeenCalledTimes(2);

    generator.mockImplementation(() => {
      throw new Error('Failure');
    });

    expect(safeGenerateConnectorSummary({ name: 'Broken' })).toBe('');
    expect(console.warn).toHaveBeenCalledWith(
      'Unable to generate connector summary',
      expect.any(Error)
    );
  });
});
