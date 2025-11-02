const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

async function openDeviceManager() {
  const toggleButton = document.getElementById('toggleDeviceManager');
  expect(toggleButton).not.toBeNull();
  toggleButton.click();
  await flushPromises();
}

describe('battery device editor zero-value handling', () => {
  let env;

  afterEach(() => {
    if (env && typeof env.cleanup === 'function') {
      env.cleanup();
    }
    env = null;
    jest.clearAllMocks();
  });

  test('editing an existing zero-output battery keeps zero values visible', async () => {
    env = setupScriptEnvironment({ disableFreeze: true, readyState: 'complete' });

    await flushPromises();
    await openDeviceManager();

    const editButton = document.querySelector(
      'button.edit-btn[data-category="batteries"][data-name="None"]'
    );
    expect(editButton).not.toBeNull();

    editButton.click();
    await flushPromises();

    const capacityInput = document.getElementById('newCapacity');
    const pinInput = document.getElementById('newPinA');
    const dtapInput = document.getElementById('newDtapA');

    expect(capacityInput).not.toBeNull();
    expect(pinInput).not.toBeNull();
    expect(dtapInput).not.toBeNull();

    expect(capacityInput.value).toBe('0');
    expect(pinInput.value).toBe('0');
    expect(dtapInput.value).toBe('0');
  });

  test('zero capacity, pin, and D-Tap values save and round-trip when editing a battery', async () => {
    env = setupScriptEnvironment({ disableFreeze: true, readyState: 'complete' });

    await flushPromises();
    await openDeviceManager();

    const batteryName = 'Bebob V45micro (V-Mount)';
    const editButton = document.querySelector(
      `button.edit-btn[data-category="batteries"][data-name="${batteryName}"]`
    );
    expect(editButton).not.toBeNull();

    editButton.click();
    await flushPromises();

    const capacityInput = document.getElementById('newCapacity');
    const pinInput = document.getElementById('newPinA');
    const dtapInput = document.getElementById('newDtapA');
    const addDeviceButton = document.getElementById('addDeviceBtn');

    expect(capacityInput).not.toBeNull();
    expect(pinInput).not.toBeNull();
    expect(dtapInput).not.toBeNull();
    expect(addDeviceButton).not.toBeNull();

    capacityInput.value = '0';
    pinInput.value = '0';
    dtapInput.value = '0';

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    addDeviceButton.click();
    await flushPromises();

    const fieldErrorMessage = window.texts?.[window.currentLang]?.alertDeviceFields;
    const triggeredFieldError = alertSpy.mock.calls.find(([message]) => message === fieldErrorMessage);
    expect(triggeredFieldError).toBeUndefined();

    const updatedBattery = window.devices?.batteries?.[batteryName];
    expect(updatedBattery).toBeDefined();
    expect(updatedBattery.capacity).toBe(0);
    expect(updatedBattery.pinA).toBe(0);
    expect(updatedBattery.dtapA).toBe(0);

    alertSpy.mockRestore();

    const refreshedEditButton = document.querySelector(
      `button.edit-btn[data-category="batteries"][data-name="${batteryName}"]`
    );
    expect(refreshedEditButton).not.toBeNull();

    refreshedEditButton.click();
    await flushPromises();

    expect(capacityInput.value).toBe('0');
    expect(pinInput.value).toBe('0');
    expect(dtapInput.value).toBe('0');
  });
});

