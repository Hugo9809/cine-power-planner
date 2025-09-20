const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');
const fullDevices = require('../../web/data');

describe('device manager details', () => {
  let env;

  afterEach(() => {
    env?.cleanup();
  });

  function openDetails(name) {
    const item = Array.from(document.querySelectorAll('.device-ul li')).find(li => {
      const summary = li.querySelector('.device-summary');
      return summary?.textContent.includes(name);
    });
    expect(item).toBeTruthy();
    item.querySelector('.detail-toggle').click();
    const details = item.querySelector('.device-details');
    return details.textContent;
  }

  test('renders HDMI metadata for Sony Venice 2 outputs', () => {
    env = setupScriptEnvironment({ devices: { cameras: fullDevices.cameras } });
    const text = openDetails('Sony Venice 2');
    expect(text).toContain('Version:Type A');
  });

  test('shows integrated monitor size for Sony Burano viewfinder', () => {
    env = setupScriptEnvironment({ devices: { cameras: fullDevices.cameras } });
    const text = openDetails('Sony Burano');
    expect(text).toContain('Size:3.5-inch');
  });
});
