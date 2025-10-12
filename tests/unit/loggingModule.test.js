jest.mock('../../src/scripts/storage.js', () => ({}));
jest.mock('../../src/scripts/app-session.js', () => ({}));
jest.mock('../../src/scripts/app-setups.js', () => ({}));

const { setupModuleHarness } = require('../helpers/moduleHarness');

describe('cineLogging module stats', () => {
  let harness;
  let logging;
  let sessionStore;

  beforeEach(() => {
    harness = setupModuleHarness();

    sessionStore = new Map();
    global.sessionStorage = {
      getItem: jest.fn((key) => (sessionStore.has(key) ? sessionStore.get(key) : null)),
      setItem: jest.fn((key, value) => {
        sessionStore.set(key, String(value));
      }),
      removeItem: jest.fn((key) => {
        sessionStore.delete(key);
      }),
    };

    logging = require('../../src/scripts/modules/logging.js');
    logging.clearHistory({ persist: false });
    harness.moduleGlobals.safeWarn.mockClear();
  });

  afterEach(() => {
    delete global.sessionStorage;
    if (harness) {
      harness.teardown();
      harness = null;
    }
  });

  it('records history trims and exposes retention stats', () => {
    const baselineStats = logging.getStats();
    const baselineRuntime = baselineStats.runtimeEntries;
    const baselineDropped = baselineStats.droppedEntries;

    expect(baselineStats.retainedEntries).toBe(0);

    logging.setConfig({ historyLimit: 2, persistSession: false }, { persist: false });

    logging.info('alpha');
    logging.info('beta');
    logging.info('gamma');

    const stats = logging.getStats();

    expect(stats.runtimeEntries).toBe(baselineRuntime + 3);
    expect(stats.retainedEntries).toBe(2);
    expect(stats.droppedEntries).toBe(baselineDropped + 1);
    expect(stats.historyLimit).toBe(2);
    expect(stats.lastDrop).toEqual(
      expect.objectContaining({
        count: 1,
        limit: 2,
        source: 'append',
      }),
    );

    if (stats.lastDrop.timestamp !== null) {
      expect(typeof stats.lastDrop.timestamp).toBe('number');
    }
    if (stats.lastDrop.isoTimestamp !== null) {
      expect(typeof stats.lastDrop.isoTimestamp).toBe('string');
    }

    const trimWarnings = harness.moduleGlobals.safeWarn.mock.calls.filter(
      ([message]) => message === 'cineLogging: history trimmed to enforce retention limit',
    );

    expect(trimWarnings.length).toBeGreaterThanOrEqual(1);
    const lastWarning = trimWarnings[trimWarnings.length - 1];
    expect(lastWarning[1]).toEqual(
      expect.objectContaining({
        limit: 2,
        removed: 1,
        source: 'append',
      }),
    );
  });

  it('captures stack traces for error entries by default', () => {
    logging.clearHistory({ persist: false });
    logging.setConfig({ historyLevel: 'debug', stackTraces: true, historyLimit: 10 }, { persist: false });

    const capturedError = new Error('stack capture test');
    logging.error('Testing stack capture', capturedError);

    const history = logging.getHistory({ limit: 1 });
    expect(history.length).toBe(1);
    const entry = history[0];
    expect(entry.origin).not.toBeNull();
    expect(entry.origin.source).toBe('detail');
    expect(typeof entry.origin.stack).toBe('string');
    expect(entry.origin.stack.length).toBeGreaterThan(0);
    expect(Array.isArray(entry.origin.frames)).toBe(true);
    expect(entry.origin.frames.length).toBeGreaterThan(0);
  });

  it('allows stack trace capture to be disabled via config', () => {
    logging.clearHistory({ persist: false });
    logging.setConfig({ stackTraces: false }, { persist: false });

    logging.error('Stack capture disabled', new Error('no capture'));

    const history = logging.getHistory({ limit: 1 });
    expect(history.length).toBe(1);
    const entry = history[0];
    expect(entry.origin).toBeNull();
  });

  it('sanitizes nested errors exposed through error.errors for diagnostics', () => {
    logging.clearHistory({ persist: false });
    logging.setConfig(
      { historyLevel: 'debug', historyLimit: 10, stackTraces: false },
      { persist: false },
    );

    class WrappedAggregateError extends Error {
      constructor(errors) {
        super('aggregate failure');
        this.name = 'WrappedAggregateError';
        this.errors = errors;
      }
    }

    const aggregate = new WrappedAggregateError([
      new Error('first issue'),
      'second issue',
      { code: 42, reason: 'third issue' },
    ]);

    logging.error('Aggregate capture', aggregate);

    const history = logging.getHistory({ limit: 1 });
    expect(history.length).toBe(1);
    const entry = history[0];

    expect(entry.detail).toEqual(
      expect.objectContaining({
        name: 'WrappedAggregateError',
        message: 'aggregate failure',
      }),
    );

    expect(Array.isArray(entry.detail.errors)).toBe(true);
    expect(entry.detail.errors.length).toBeGreaterThanOrEqual(3);
    expect(entry.detail.errors[0]).toEqual(
      expect.objectContaining({ message: 'first issue' }),
    );
    expect(entry.detail.errors).toEqual(
      expect.arrayContaining([
        'second issue',
        expect.objectContaining({ code: 42, reason: 'third issue' }),
      ]),
    );
    expect(entry.detail.errorsTruncated || 0).toBeGreaterThanOrEqual(0);
  });

  it('reports level enablement for console mirroring and history capture', () => {
    logging.clearHistory({ persist: false });
    logging.setConfig(
      { level: 'error', historyLevel: 'debug', consoleOutput: true },
      { persist: false },
    );

    const debugState = logging.getLevelState('debug');

    expect(debugState).toEqual(
      expect.objectContaining({
        level: 'debug',
        console: false,
        history: true,
        enabled: true,
      }),
    );
    expect(debugState.thresholds).toEqual(
      expect.objectContaining({ console: 'error', history: 'debug' }),
    );

    expect(logging.isLevelEnabled('debug')).toBe(true);
    expect(logging.isLevelEnabled('debug', { console: true, history: false })).toBe(false);
    expect(logging.isLevelEnabled('debug', { console: false, history: true })).toBe(true);
    expect(logging.isLevelEnabled('debug', { requireAll: true })).toBe(false);

    const namespaced = logging.createLogger('unit-tests', { meta: { source: 'harness' } });
    expect(namespaced.isLevelEnabled('error')).toBe(true);
    expect(namespaced.isLevelEnabled('debug', { console: true, history: false })).toBe(false);
    expect(namespaced.getLevelState('error')).toEqual(
      expect.objectContaining({ level: 'error', console: true, history: true }),
    );
  });
});

