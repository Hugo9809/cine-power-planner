const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('power selection helpers', () => {
  let env;

  function createOption(label, value = label) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    return option;
  }

  afterEach(() => {
    env?.cleanup();
    env = null;
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test('applyStoredPowerSelection treats matching persisted values as applied when preserving user choices', () => {
    env = setupScriptEnvironment({ readyState: 'complete' });
    const { applyStoredPowerSelection } = env.utils;

    const batterySelect = document.getElementById('batterySelect');
    const batteryPlateSelect = document.getElementById('batteryPlateSelect');
    const hotswapSelect = document.getElementById('batteryHotswapSelect');

    batterySelect.innerHTML = '';
    batterySelect.add(createOption('None', 'None'));
    batterySelect.add(createOption('VoltBlock 150'));
    batterySelect.value = 'VoltBlock 150';

    batteryPlateSelect.innerHTML = '';
    batteryPlateSelect.add(createOption('None', 'None'));
    batteryPlateSelect.add(createOption('V-Mount'));
    batteryPlateSelect.value = 'V-Mount';

    hotswapSelect.innerHTML = '';
    hotswapSelect.add(createOption('None', 'None'));
    hotswapSelect.add(createOption('HotSwap-1'));
    hotswapSelect.value = 'HotSwap-1';

    const applied = applyStoredPowerSelection({
      battery: 'VoltBlock 150',
      batteryPlate: 'V-Mount',
      batteryHotswap: 'HotSwap-1'
    });

    expect(applied).toBe(true);
    expect(batterySelect.value).toBe('VoltBlock 150');
    expect(batteryPlateSelect.value).toBe('V-Mount');
    expect(hotswapSelect.value).toBe('HotSwap-1');
  });
});
