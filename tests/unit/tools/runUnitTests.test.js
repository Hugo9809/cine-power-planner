const path = require('node:path');

describe('runUnitTests resolver', () => {
  const ROOT_DIR = path.resolve(__dirname, '../../..');
  const UNIT_TEST_DIR = path.join(ROOT_DIR, 'tests', 'unit');
  const storageTestPath = path.join(UNIT_TEST_DIR, 'storage.test.js');
  const featureSearchEnginePath = path.join(UNIT_TEST_DIR, 'featureSearchEngine.test.js');
  const featureSearchNormalizationPath = path.join(UNIT_TEST_DIR, 'featureSearchNormalization.test.js');
  const featureSearchSynonymsPath = path.join(UNIT_TEST_DIR, 'featureSearchSynonyms.test.js');

  afterEach(() => {
    jest.resetModules();
    jest.dontMock('node:fs');
  });

  function createMockFs() {
    const entries = new Map([
      [
        UNIT_TEST_DIR,
        {
          type: 'dir',
          children: [
            'storage.test.js',
            'featureSearchEngine.test.js',
            'featureSearchNormalization.test.js',
            'featureSearchSynonyms.test.js'
          ]
        }
      ],
      [storageTestPath, { type: 'file' }],
      [featureSearchEnginePath, { type: 'file' }],
      [featureSearchNormalizationPath, { type: 'file' }],
      [featureSearchSynonymsPath, { type: 'file' }]
    ]);

    return {
      existsSync: jest.fn(target => entries.has(target)),
      statSync: jest.fn(target => {
        const entry = entries.get(target);
        if (!entry) {
          const error = new Error(`ENOENT: ${target}`);
          error.code = 'ENOENT';
          throw error;
        }

        return {
          isFile: () => entry.type === 'file',
          isDirectory: () => entry.type === 'dir'
        };
      }),
      readdirSync: jest.fn(target => {
        const entry = entries.get(target);
        if (!entry || entry.type !== 'dir') {
          const error = new Error(`ENOENT: ${target}`);
          error.code = 'ENOENT';
          throw error;
        }

        return entry.children.slice();
      })
    };
  }

  function loadModule(mockFs) {
    jest.resetModules();
    jest.doMock('node:fs', () => mockFs);
    return require('../../../tools/runUnitTests.js');
  }

  test('resolves storage alias to explicit file path', () => {
    const mockFs = createMockFs();
    const { resolveUnitTestInput } = loadModule(mockFs);

    const result = resolveUnitTestInput('storage', { cwd: ROOT_DIR });

    expect(result).toEqual([storageTestPath]);
    expect(mockFs.statSync).toHaveBeenCalledWith(storageTestPath);
  });

  test('returns provided absolute path without modification', () => {
    const mockFs = createMockFs();
    const { resolveUnitTestInput } = loadModule(mockFs);

    const result = resolveUnitTestInput(storageTestPath, { cwd: ROOT_DIR });

    expect(result).toEqual([storageTestPath]);
    expect(mockFs.statSync).toHaveBeenCalledWith(storageTestPath);
  });

  test('throws for ambiguous featureSearch selections', () => {
    const mockFs = createMockFs();
    const { resolveUnitTestInput, AmbiguousUnitTestSelectionError } = loadModule(mockFs);

    expect(() => resolveUnitTestInput('featureSearch', { cwd: ROOT_DIR })).toThrow(
      AmbiguousUnitTestSelectionError
    );

    try {
      resolveUnitTestInput('featureSearch', { cwd: ROOT_DIR });
    } catch (error) {
      expect(error).toBeInstanceOf(AmbiguousUnitTestSelectionError);
      expect(error.matches).toEqual(
        expect.arrayContaining([
          featureSearchEnginePath,
          featureSearchNormalizationPath,
          featureSearchSynonymsPath
        ])
      );
    }
  });
});
