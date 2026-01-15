import { jest } from '@jest/globals';

jest.mock('idb-keyval', () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  clear: jest.fn(),
  keys: jest.fn(),
}));

jest.mock('lz-string', () => ({
  __esModule: true,
  default: {
    compressToUTF16: jest.fn(value => value),
    decompressFromUTF16: jest.fn(value => value),
  },
}));

let IndexedDBAdapter;
let idbKeyvalMock;
let lzStringMock;

describe('IndexedDBAdapter', () => {
  beforeAll(async () => {
    idbKeyvalMock = await import('idb-keyval');
    lzStringMock = (await import('lz-string')).default;

    // Import adapter AFTER mocking
    const module = await import('../../src/scripts/modules/storage/drivers/IndexedDBAdapter.js');
    IndexedDBAdapter = module.default;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns empty string when stored value is empty string', async () => {
    idbKeyvalMock.get.mockResolvedValue('');
    // lzStringMock.decompressFromUTF16 is already identity by default in mock factory, 
    // but better to be explicit if needed. It defaults to returning input in factory above.

    const adapter = new IndexedDBAdapter();
    const result = await adapter.getItem('empty-value');

    expect(result).toBe('');
    expect(idbKeyvalMock.get).toHaveBeenCalledWith('empty-value');
    expect(lzStringMock.decompressFromUTF16).toHaveBeenCalledWith('');
  });
});
