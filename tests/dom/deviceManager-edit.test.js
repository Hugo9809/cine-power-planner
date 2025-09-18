const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('device manager editing', () => {
  let env;

  beforeAll(() => {
    if (!Element.prototype.scrollIntoView) {
      Element.prototype.scrollIntoView = () => {};
    }
  });

  afterEach(() => {
    env?.cleanup();
    jest.restoreAllMocks();
  });

  test('allows moving accessory cables between subcategories when editing', () => {
    env = setupScriptEnvironment({
      devices: {
        accessories: {
          cables: {
            power: {
              'D-Tap to 4-Pin': { lengthM: 2 }
            },
            fiz: {
              'Pre-existing FIZ Cable': { lengthM: 1 }
            }
          }
        }
      }
    });

    const editBtn = document.querySelector(
      '.edit-btn[data-category="accessories.cables"][data-name="D-Tap to 4-Pin"]'
    );
    expect(editBtn).toBeTruthy();

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    editBtn.click();

    const addDeviceBtn = document.getElementById('addDeviceBtn');
    const subcategorySelect = document.getElementById('newSubcategory');
    expect(addDeviceBtn.dataset.mode).toBe('edit');
    expect(subcategorySelect.disabled).toBe(false);
    expect(subcategorySelect.value).toBe('power');

    subcategorySelect.value = 'fiz';
    subcategorySelect.dispatchEvent(new Event('change'));

    addDeviceBtn.click();

    const powerCables = env.globals.devices.accessories.cables.power;
    expect(powerCables && powerCables['D-Tap to 4-Pin']).toBeUndefined();
    expect(env.globals.devices.accessories.cables.fiz['D-Tap to 4-Pin']).toEqual(
      expect.objectContaining({ lengthM: 2 })
    );
    expect(alertSpy).toHaveBeenCalled();
  });
});
