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
    logging.setConfig(
      {
        level: 'debug',
        historyLevel: 'debug',
        historyLimit: logging.constants.DEFAULT_CONFIG.historyLimit,
        consoleOutput: false,
        persistSession: false,
        captureGlobalErrors: false,
      },
      { persist: false },
    );
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

  it('creates timers with lifecycle entries and sanitized meta', () => {
    const timer = logging.createTimer('Load dataset', {
      namespace: 'unit-test',
      meta: { feature: 'timer' },
    });

    expect(timer).toBeTruthy();
    expect(timer.namespace).toBe('unit-test');
    expect(timer.label).toBe('Load dataset');
    expect(timer.finished).toBe(false);
    expect(timer.status).toBe('running');

    const afterStart = logging.getHistory();
    expect(afterStart).toHaveLength(1);
    expect(afterStart[0]).toEqual(
      expect.objectContaining({
        message: 'Load dataset ▶',
        namespace: 'unit-test',
        meta: expect.objectContaining({
          feature: 'timer',
          timer: expect.objectContaining({
            label: 'Load dataset',
            phase: 'start',
            status: 'running',
            finished: false,
            checkpoints: 0,
          }),
        }),
      }),
    );

    timer.checkpoint('Halfway there', { progress: 0.5 });
    expect(timer.checkpoints).toBe(1);

    timer.finish({ result: 'ok' }, { stage: 'done' });

    expect(timer.finished).toBe(true);
    expect(timer.status).toBe('success');
    expect(timer.durationMs).toBeGreaterThanOrEqual(0);

    const history = logging.getHistory();
    expect(history).toHaveLength(3);
    const finalEntry = history[history.length - 1];
    expect(finalEntry).toEqual(
      expect.objectContaining({
        message: 'Load dataset ✔',
        detail: expect.objectContaining({ result: 'ok' }),
        meta: expect.objectContaining({
          feature: 'timer',
          stage: 'done',
          timer: expect.objectContaining({
            label: 'Load dataset',
            status: 'success',
            phase: 'finish',
            finished: true,
            finalStatus: 'success',
            checkpoints: 1,
          }),
        }),
      }),
    );

    const snapshot = timer.composeMeta('success', { meta: { note: 'snapshot' } });
    expect(snapshot).toEqual(
      expect.objectContaining({
        feature: 'timer',
        note: 'snapshot',
        timer: expect.objectContaining({
          status: 'success',
          phase: 'finish',
          finalStatus: 'success',
          finished: true,
        }),
      }),
    );
  });

  it('wraps async executors with runWithTimer and logs failures', async () => {
    const { timer, result } = logging.runWithTimer(
      'Async failure',
      async () => {
        await Promise.resolve();
        throw new Error('boom');
      },
      { namespace: 'unit-test' },
    );

    await expect(result).rejects.toThrow('boom');

    expect(timer.finished).toBe(true);
    expect(timer.status).toBe('failure');

    const history = logging.getHistory();
    expect(history.length).toBeGreaterThanOrEqual(2);
    const failureEntry = history[history.length - 1];
    expect(failureEntry.level).toBe('error');
    expect(failureEntry.meta).toEqual(
      expect.objectContaining({
        timer: expect.objectContaining({
          status: 'failure',
          phase: 'finish',
          finished: true,
          finalStatus: 'failure',
        }),
      }),
    );
  });
});

