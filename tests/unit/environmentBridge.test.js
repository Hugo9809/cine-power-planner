const path = require('path');

describe('environment-bridge', () => {
  afterEach(() => {
    delete global.cineEnvironmentBridge;
    delete require.cache[path.resolve(__dirname, '../../src/scripts/modules/environment-bridge.js')];
  });

  test('freezeDeep bypasses ethereum provider candidates', () => {
    const bridge = require('../../src/scripts/modules/environment-bridge.js');
    const provider = {
      isMetaMask: true,
      request: jest.fn(),
      on: jest.fn(),
      removeListener: jest.fn(),
      _metamask: {
        isUnlocked: jest.fn(),
      },
    };

    const previousEthereum = global.ethereum;
    global.ethereum = provider;

    try {
      const container = { provider };
      const frozen = bridge.freezeDeep(container);

      expect(frozen).toBe(container);
      expect(Object.isFrozen(container)).toBe(true);
      expect(Object.isFrozen(provider)).toBe(false);
    } finally {
      if (typeof previousEthereum === 'undefined') {
        delete global.ethereum;
      } else {
        global.ethereum = previousEthereum;
      }
    }
  });
});
