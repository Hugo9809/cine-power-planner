import { jest } from '@jest/globals';

const getMock = jest.fn();
const decompressMock = jest.fn(value => value);

jest.unstable_mockModule('idb-keyval', () => ({
  get: getMock,
  set: jest.fn(),
  del: jest.fn(),
  clear: jest.fn(),
  keys: jest.fn(),
}));

jest.unstable_mockModule('lz-string', () => ({
  __esModule: true,
  default: {
    compressToUTF16: jest.fn(value => value),
    decompressFromUTF16: decompressMock,
  },
}));

const { default: IndexedDBAdapter } = await import(
  '../../src/scripts/modules/storage/drivers/IndexedDBAdapter.js'
);

describe('IndexedDBAdapter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns empty string when stored value is empty string', async () => {
    getMock.mockResolvedValue('');

    const adapter = new IndexedDBAdapter();
    const result = await adapter.getItem('empty-value');

    expect(result).toBe('');
    expect(getMock).toHaveBeenCalledWith('empty-value');
    expect(decompressMock).toHaveBeenCalledWith('');
  });
});
