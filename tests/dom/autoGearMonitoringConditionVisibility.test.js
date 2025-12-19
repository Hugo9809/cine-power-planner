const path = require('path');

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

function requireScript() {
  const scriptPath = require.resolve('../../src/scripts/auto-gear-monitoring.js');
  delete require.cache[scriptPath];
  require(scriptPath);
  delete require.cache[scriptPath];
}

describe('auto-gear monitoring condition sections', () => {
  let readyStateDescriptor;

  beforeEach(() => {
    jest.resetModules();
    readyStateDescriptor = stubReadyState('complete');

    document.body.innerHTML = `
      <div id="autoGearEditor">
        <select id="autoGearScenarios">
          <option value="general" selected>General coverage</option>
          <option value="support">Video support</option>
        </select>
        <section id="autoGearCondition-videoDistribution" class="auto-gear-condition" hidden aria-hidden="true">
          <label for="autoGearVideoDistribution">Video distribution</label>
          <select id="autoGearVideoDistribution">
            <option value=""></option>
          </select>
        </section>
        <section id="autoGearCondition-monitor" class="auto-gear-condition" hidden aria-hidden="true">
          <label for="autoGearMonitor">Monitor</label>
          <select id="autoGearMonitor">
            <option value=""></option>
          </select>
        </section>
        <section id="autoGearCondition-wireless" class="auto-gear-condition" hidden aria-hidden="true">
          <label for="autoGearWireless">Wireless</label>
          <select id="autoGearWireless">
            <option value=""></option>
          </select>
        </section>
      </div>
    `;
  });

  afterEach(() => {
    restoreReadyState(readyStateDescriptor);
    document.body.innerHTML = '';
    if (window.autoGearMonitoringVisibility) {
      delete window.autoGearMonitoringVisibility;
    }
  });

  test('keeps active monitoring condition sections visible without scenario match', () => {
    const sections = [
      document.getElementById('autoGearCondition-videoDistribution'),
      document.getElementById('autoGearCondition-monitor'),
      document.getElementById('autoGearCondition-wireless'),
    ];

    sections.forEach((section) => {
      section.hidden = false;
      section.removeAttribute('hidden');
      section.removeAttribute('aria-hidden');
    });

    requireScript();

    sections.forEach((section) => {
      expect(section.hidden).toBe(false);
      expect(section.getAttribute('aria-hidden')).not.toBe('true');
    });
  });
});
