const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

describe('director monitor device editor', () => {
  let env;

  afterEach(() => {
    if (env && typeof env.cleanup === 'function') {
      env.cleanup();
      env = null;
    }
    jest.clearAllMocks();
  });

  test('shares the monitor exclusion list', () => {
    env = setupScriptEnvironment({ disableFreeze: true, readyState: 'complete' });

    expect(global.categoryExcludedAttrs).toBeDefined();
    expect(global.categoryExcludedAttrs.monitors).toBeDefined();
    expect(global.categoryExcludedAttrs.directorMonitors).toEqual(
      global.categoryExcludedAttrs.monitors
    );
  });

  test('editing a director monitor preserves power and video fields without duplicate dynamic attributes', async () => {
    env = setupScriptEnvironment({ disableFreeze: true, readyState: 'complete' });

    await flushPromises();

    const toggleButton = document.getElementById('toggleDeviceManager');
    expect(toggleButton).not.toBeNull();
    toggleButton.click();

    await flushPromises();

    const editButton = document.querySelector('button.edit-btn[data-category="directorMonitors"]');
    expect(editButton).not.toBeNull();

    editButton.click();
    await flushPromises();

    const monitorFields = document.getElementById('monitorFields');
    expect(monitorFields).not.toBeNull();
    expect(monitorFields.classList.contains('hidden')).toBe(false);

    const monitorName = editButton.dataset.name;
    const directorMonitorData = window.devices?.directorMonitors?.[monitorName];
    expect(directorMonitorData).toBeDefined();

    const monitorWattInput = document.getElementById('monitorWatt');
    expect(monitorWattInput.value).toBe(
      directorMonitorData?.powerDrawWatts != null
        ? String(directorMonitorData.powerDrawWatts)
        : ''
    );

    const monitorVoltageInput = document.getElementById('monitorVoltage');
    expect(monitorVoltageInput.value).toBe(directorMonitorData?.power?.input?.voltageRange || '');

    const monitorPortTypeSelect = document.getElementById('monitorPortType');
    const expectedPortType = directorMonitorData?.power?.input?.type || '';
    if (expectedPortType) {
      expect(monitorPortTypeSelect.value).toBe(expectedPortType);
    } else {
      expect(monitorPortTypeSelect.value).toBe('');
    }

    const normalizeTypeList = (list) => {
      if (!Array.isArray(list)) {
        return [];
      }
      return list
        .map(item => {
          if (typeof item === 'string') return item;
          if (item && typeof item === 'object') {
            return item.type || item.portType || '';
          }
          return '';
        })
        .filter(Boolean);
    };

    const actualVideoInputs = Array.from(
      document.querySelectorAll('#monitorVideoInputsContainer select')
    )
      .map(select => select.value)
      .filter(Boolean);
    expect(actualVideoInputs).toEqual(
      normalizeTypeList(directorMonitorData?.videoInputs || directorMonitorData?.video?.inputs)
    );

    const actualVideoOutputs = Array.from(
      document.querySelectorAll('#monitorVideoOutputsContainer select')
    )
      .map(select => select.value)
      .filter(Boolean);
    expect(actualVideoOutputs).toEqual(
      normalizeTypeList(directorMonitorData?.videoOutputs || directorMonitorData?.video?.outputs)
    );

    const dynamicFields = document.getElementById('dynamicFields');
    expect(dynamicFields).not.toBeNull();
    const excludedAttrs = [
      'screenSizeInches',
      'brightnessNits',
      'power',
      'powerDrawWatts',
      'video',
      'videoInputs',
      'videoOutputs',
      'wirelessTx',
      'latencyMs',
      'audioOutput',
    ];
    const dynamicAttrList = dynamicFields.dataset?.attrs
      ? JSON.parse(dynamicFields.dataset.attrs)
      : [];
    excludedAttrs.forEach(attr => {
      expect(dynamicAttrList).not.toContain(attr);
    });
  });
});

