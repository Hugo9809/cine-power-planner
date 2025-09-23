const path = require('path');

describe('auto gear monitoring visibility management', () => {
  const scriptPath = path.join(__dirname, '..', '..', 'src/scripts/auto-gear-monitoring.js');
  let originalReadyStateDescriptor;

  const createSelect = (id, options) => {
    const select = document.createElement('select');
    select.id = id;
    select.multiple = true;
    options.forEach(({ value, label, selected }) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      if (selected) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    return select;
  };

  const installDom = () => {
    const scenarioRow = document.createElement('div');
    scenarioRow.className = 'form-row';
    const scenarioLabel = document.createElement('label');
    scenarioLabel.setAttribute('for', 'autoGearScenarios');
    scenarioLabel.textContent = 'Scenarios';
    const scenarioSelect = createSelect('autoGearScenarios', [
      { value: '', label: 'Select scenario' },
      { value: 'set-monitoring', label: 'On-set monitoring' },
      { value: 'lighting', label: 'Lighting' }
    ]);
    scenarioRow.append(scenarioLabel, scenarioSelect);

    const buildMonitoringRow = (id, label) => {
      const row = document.createElement('div');
      row.className = 'form-row';
      row.hidden = true;
      row.setAttribute('hidden', '');
      const rowLabel = document.createElement('label');
      rowLabel.setAttribute('for', id);
      rowLabel.textContent = label;
      const select = createSelect(id, [
        { value: '', label: '' },
        { value: `${id}-primary`, label: `${label} Primary` }
      ]);
      row.append(rowLabel, select);
      return row;
    };

    const videoRow = buildMonitoringRow('autoGearVideoDistribution', 'Video distribution');
    const monitorRow = buildMonitoringRow('autoGearMonitor', 'Onboard monitor');
    const wirelessRow = buildMonitoringRow('autoGearWireless', 'Wireless transmitter');

    document.body.innerHTML = '';
    document.body.append(scenarioRow, videoRow, monitorRow, wirelessRow);

    return {
      scenarioSelect,
      rows: { videoRow, monitorRow, wirelessRow },
      selects: {
        video: videoRow.querySelector('select'),
        monitor: monitorRow.querySelector('select'),
        wireless: wirelessRow.querySelector('select')
      }
    };
  };

  const loadScript = () => {
    if (require.cache[scriptPath]) {
      delete require.cache[scriptPath];
    }
    require(scriptPath);
  };

  const clearSelections = select => {
    Array.from(select.options).forEach(option => {
      option.selected = false;
    });
  };

  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
    originalReadyStateDescriptor = Object.getOwnPropertyDescriptor(document, 'readyState');
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => 'complete'
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    delete window.autoGearMonitoringVisibility;
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
    jest.useRealTimers();
    if (originalReadyStateDescriptor) {
      Object.defineProperty(document, 'readyState', originalReadyStateDescriptor);
    } else {
      delete document.readyState;
    }
    jest.clearAllMocks();
  });

  test('shows monitoring selectors when monitoring scenarios are selected', () => {
    const { scenarioSelect, rows } = installDom();
    loadScript();

    expect(rows.monitorRow.hidden).toBe(true);
    expect(rows.videoRow.hidden).toBe(true);
    expect(rows.wirelessRow.hidden).toBe(true);

    clearSelections(scenarioSelect);
    scenarioSelect.options[1].selected = true;
    scenarioSelect.dispatchEvent(new Event('change', { bubbles: true }));
    jest.runOnlyPendingTimers();

    expect(rows.monitorRow.hidden).toBe(false);
    expect(rows.videoRow.hidden).toBe(false);
    expect(rows.wirelessRow.hidden).toBe(false);
  });

  test('keeps selectors visible while monitoring devices are chosen', () => {
    const { scenarioSelect, rows, selects } = installDom();
    loadScript();

    clearSelections(scenarioSelect);
    scenarioSelect.options[1].selected = true;
    scenarioSelect.dispatchEvent(new Event('change', { bubbles: true }));
    jest.runOnlyPendingTimers();

    clearSelections(selects.monitor);
    selects.monitor.options[1].selected = true;
    selects.monitor.dispatchEvent(new Event('change', { bubbles: true }));
    jest.runOnlyPendingTimers();

    clearSelections(scenarioSelect);
    scenarioSelect.options[2].selected = true;
    scenarioSelect.dispatchEvent(new Event('change', { bubbles: true }));
    jest.runOnlyPendingTimers();

    expect(rows.monitorRow.hidden).toBe(false);
    expect(rows.videoRow.hidden).toBe(false);
    expect(rows.wirelessRow.hidden).toBe(false);

    clearSelections(selects.monitor);
    selects.monitor.dispatchEvent(new Event('change', { bubbles: true }));
    jest.runOnlyPendingTimers();

    expect(rows.monitorRow.hidden).toBe(true);
    expect(rows.videoRow.hidden).toBe(true);
    expect(rows.wirelessRow.hidden).toBe(true);
  });

  test('refresh picks up newly inserted scenario selector', () => {
    const { scenarioSelect, rows } = installDom();
    loadScript();

    const replacement = scenarioSelect.cloneNode(true);
    clearSelections(replacement);
    scenarioSelect.parentNode.replaceChild(replacement, scenarioSelect);

    replacement.options[1].selected = true;
    replacement.dispatchEvent(new Event('change', { bubbles: true }));
    jest.runOnlyPendingTimers();

    expect(rows.monitorRow.hidden).toBe(true);

    window.autoGearMonitoringVisibility.refresh();

    expect(rows.monitorRow.hidden).toBe(false);
    expect(rows.videoRow.hidden).toBe(false);
    expect(rows.wirelessRow.hidden).toBe(false);

    clearSelections(replacement);
    replacement.options[2].selected = true;
    replacement.dispatchEvent(new Event('change', { bubbles: true }));
    jest.runOnlyPendingTimers();

    expect(rows.monitorRow.hidden).toBe(true);
    expect(rows.videoRow.hidden).toBe(true);
    expect(rows.wirelessRow.hidden).toBe(true);
  });
});
