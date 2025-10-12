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
});

