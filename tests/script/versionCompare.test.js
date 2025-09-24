const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('version comparison helpers', () => {
  let env;
  let computeSetupDiff;
  let versionInternals;

  beforeAll(() => {
    env = setupScriptEnvironment();
    ({
      computeSetupDiff,
      __versionCompareInternals: versionInternals,
    } = env.utils);
  });

  afterAll(() => {
    if (env) {
      env.cleanup();
    }
  });

  test('aligns entries by shared identifiers instead of position', () => {
    const baseline = {
      items: [
        { id: 'alpha', count: 1 },
        { id: 'beta', count: 2 },
      ],
    };
    const comparison = {
      items: [
        { id: 'beta', count: 3 },
        { id: 'alpha', count: 1 },
      ],
    };

    const diff = computeSetupDiff(baseline, comparison);

    expect(diff).toHaveLength(1);
    expect(diff[0]).toMatchObject({
      type: 'changed',
      path: ['items', '[id="beta"]', 'count'],
      before: 2,
      after: 3,
    });
  });

  test('identifies added keyed entries', () => {
    const baseline = {
      items: [
        { id: 'alpha', count: 1 },
      ],
    };
    const comparison = {
      items: [
        { id: 'alpha', count: 1 },
        { id: 'gamma', count: 4 },
      ],
    };

    const diff = computeSetupDiff(baseline, comparison);

    expect(diff).toEqual([
      expect.objectContaining({
        type: 'added',
        path: ['items', '[id="gamma"]'],
        before: undefined,
        after: { id: 'gamma', count: 4 },
      }),
    ]);
  });

  test('falls back to positional comparisons when identifiers conflict', () => {
    const baseline = {
      items: [
        { id: 'dup', count: 1 },
        { id: 'dup', count: 2 },
      ],
    };
    const comparison = {
      items: [
        { id: 'dup', count: 1 },
        { id: 'dup', count: 3 },
      ],
    };

    const diff = computeSetupDiff(baseline, comparison);

    expect(diff).toEqual([
      expect.objectContaining({
        path: ['items', '[1]', 'count'],
        before: 2,
        after: 3,
      }),
    ]);
  });

  test('renders keyed list segments with readable labels', () => {
    const { formatDiffPath, createKeyedDiffPathSegment } = versionInternals;
    const label = formatDiffPath([
      'items',
      createKeyedDiffPathSegment('name', 'Alpha Rig'),
    ]);

    expect(label).toContain('Alpha Rig');
    expect(label.split(' › ').pop()).toBe('Item Alpha Rig');
  });

  test('prefers descriptive keys when both name and id are present', () => {
    const { findArrayComparisonKey } = versionInternals;
    const key = findArrayComparisonKey(
      [
        { name: 'Camera A', id: 'cam-a' },
        { name: 'Camera B', id: 'cam-b' },
      ],
      [
        { name: 'Camera B', id: 'cam-b' },
        { name: 'Camera A', id: 'cam-a' },
      ],
    );

    expect(key).toBe('name');
  });
});
