function stubReadyState(value) {
  const descriptor = Object.getOwnPropertyDescriptor(document, 'readyState');
  Object.defineProperty(document, 'readyState', {
    configurable: true,
    get: () => value,
  });
  return descriptor || null;
}

function restoreReadyState(descriptor) {
  if (descriptor) {
    Object.defineProperty(document, 'readyState', descriptor);
  } else {
    delete document.readyState;
  }
}

function getMonitoringRows() {
  return [
    document.getElementById('row-video-distribution'),
    document.getElementById('row-monitor'),
    document.getElementById('row-wireless'),
  ];
}

function selectOptionByValue(select, value) {
  if (!select) {
    return;
  }

  const options = Array.from(select.options || []);
  options.forEach((option) => {
    option.selected = option.value === value;
  });
  select.value = value;
}

function requireScript() {
  const scriptPath = require.resolve('../../src/scripts/auto-gear/monitoring.js');
  delete require.cache[scriptPath];
  require(scriptPath);
  delete require.cache[scriptPath];
}

describe('auto-gear monitoring visibility script', () => {
  let readyStateDescriptor;

  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
    readyStateDescriptor = stubReadyState('complete');

    document.body.innerHTML = `
      <div class="form-row" id="row-scenario">
        <label for="autoGearScenarios">Scenario</label>
        <select id="autoGearScenarios">
          <option value="general" selected>General</option>
          <option value="monitoring">Monitoring Coverage</option>
          <option value="support">Video Monitor Support</option>
        </select>
      </div>
      <div class="form-row" id="row-video-distribution">
        <label for="autoGearVideoDistribution">Video distribution</label>
        <select id="autoGearVideoDistribution">
          <option value="">   </option>
          <option value="distribution">SDI Splitter</option>
        </select>
      </div>
      <div class="form-row" id="row-monitor">
        <label for="autoGearMonitor">Monitor</label>
        <select id="autoGearMonitor">
          <option value="">   </option>
          <option value="director">Director Monitor</option>
        </select>
      </div>
      <div class="form-row" id="row-wireless">
        <label for="autoGearWireless">Wireless</label>
        <select id="autoGearWireless">
          <option value="">   </option>
          <option value="   "> Wireless Monitor </option>
        </select>
      </div>
    `;

    if (window.autoGearMonitoringVisibility) {
      delete window.autoGearMonitoringVisibility;
    }
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    restoreReadyState(readyStateDescriptor);
    document.body.innerHTML = '';
    if (window.autoGearMonitoringVisibility) {
      delete window.autoGearMonitoringVisibility;
    }
  });

  test('hides monitoring rows until they are required', () => {
    requireScript();

    const rows = getMonitoringRows();
    rows.forEach((row) => expect(row.hidden).toBe(true));

    const scenario = document.getElementById('autoGearScenarios');
    selectOptionByValue(scenario, 'monitoring');
    scenario.dispatchEvent(new Event('change'));
    jest.runOnlyPendingTimers();

    rows.forEach((row) => expect(row.hidden).toBe(false));

    selectOptionByValue(scenario, 'general');
    scenario.dispatchEvent(new Event('change'));
    jest.runOnlyPendingTimers();

    rows.forEach((row) => expect(row.hidden).toBe(true));
  });

  test('shows rows when a monitoring selection is made even without scenario trigger', () => {
    requireScript();

    const monitorSelect = document.getElementById('autoGearMonitor');
    const rows = getMonitoringRows();

    rows.forEach((row) => expect(row.hidden).toBe(true));

    selectOptionByValue(monitorSelect, 'director');
    monitorSelect.dispatchEvent(new Event('input'));
    jest.runOnlyPendingTimers();

    rows.forEach((row) => expect(row.hidden).toBe(false));

    selectOptionByValue(monitorSelect, '');
    monitorSelect.dispatchEvent(new Event('change'));
    jest.runOnlyPendingTimers();

    rows.forEach((row) => expect(row.hidden).toBe(true));
  });

  test('manual refresh reacts to label-only matches and DOM updates', () => {
    requireScript();

    expect(typeof window.autoGearMonitoringVisibility).toBe('object');
    expect(typeof window.autoGearMonitoringVisibility.refresh).toBe('function');

    const scenario = document.getElementById('autoGearScenarios');
    selectOptionByValue(scenario, 'support');

    window.autoGearMonitoringVisibility.refresh();

    getMonitoringRows().forEach((row) => expect(row.hidden).toBe(false));

    selectOptionByValue(scenario, 'general');
    const wireless = document.getElementById('autoGearWireless');
    selectOptionByValue(wireless, '');

    window.autoGearMonitoringVisibility.refresh();

    getMonitoringRows().forEach((row) => expect(row.hidden).toBe(true));
  });
});
