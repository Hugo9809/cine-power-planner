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

function setConditionActive(key, isActive) {
  const item = document.querySelector(`[data-condition="${key}"]`);
  if (!item) {
    return;
  }

  item.hidden = !isActive;
  if (isActive) {
    item.removeAttribute('hidden');
    item.removeAttribute('aria-hidden');
  } else {
    item.setAttribute('aria-hidden', 'true');
  }
}

function requireScript() {
  const scriptPath = require.resolve('../../src/scripts/auto-gear-monitoring.js');
  delete require.cache[scriptPath];
  require(scriptPath);
  delete require.cache[scriptPath];
}

describe('auto-gear monitoring visibility with condition list', () => {
  let readyStateDescriptor;

  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
    readyStateDescriptor = stubReadyState('complete');

    document.body.innerHTML = `
      <div id="autoGearEditor">
        <select id="autoGearScenarios">
          <option value="general" selected>General</option>
          <option value="monitoring">Monitoring coverage</option>
        </select>
        <ul id="autoGearConditionList">
          <li data-condition="monitor" hidden aria-hidden="true">Monitor condition</li>
        </ul>
        <div class="form-row" id="row-video-distribution">
          <label for="autoGearVideoDistribution">Video distribution</label>
          <select id="autoGearVideoDistribution">
            <option value=""></option>
            <option value="distribution">SDI Splitter</option>
          </select>
        </div>
        <div class="form-row" id="row-monitor">
          <label for="autoGearMonitor">Monitor</label>
          <select id="autoGearMonitor">
            <option value=""></option>
            <option value="director">Director Monitor</option>
          </select>
        </div>
        <div class="form-row" id="row-wireless">
          <label for="autoGearWireless">Wireless</label>
          <select id="autoGearWireless">
            <option value=""></option>
            <option value="wireless">Wireless Monitor</option>
          </select>
        </div>
      </div>
    `;

    window.isAutoGearConditionActive = (key) => {
      const item = document.querySelector(`[data-condition="${key}"]`);
      return !!item && !item.hidden && item.getAttribute('aria-hidden') !== 'true';
    };
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    restoreReadyState(readyStateDescriptor);
    document.body.innerHTML = '';
    if (window.autoGearMonitoringVisibility) {
      delete window.autoGearMonitoringVisibility;
    }
    if (window.isAutoGearConditionActive) {
      delete window.isAutoGearConditionActive;
    }
  });

  test('keeps monitoring rows hidden without active conditions or selections', () => {
    requireScript();

    getMonitoringRows().forEach((row) => expect(row.hidden).toBe(true));
  });

  test('shows monitoring rows when a condition is active and selections are made', () => {
    requireScript();

    getMonitoringRows().forEach((row) => expect(row.hidden).toBe(true));

    setConditionActive('monitor', true);

    const monitorSelect = document.getElementById('autoGearMonitor');
    selectOptionByValue(monitorSelect, 'director');
    monitorSelect.dispatchEvent(new Event('change'));
    jest.runOnlyPendingTimers();

    getMonitoringRows().forEach((row) => expect(row.hidden).toBe(false));
  });
});
