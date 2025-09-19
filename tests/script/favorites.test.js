const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('favorite toggle state', () => {
  let cleanup;

  afterEach(() => {
    if (typeof cleanup === 'function') {
      cleanup();
      cleanup = undefined;
    }
  });

  test('setSelectValue restores favorite toggle for persisted selections', () => {
    const { utils, cleanup: clean } = setupScriptEnvironment({
      devices: {
        cameras: {
          'Test Camera': {}
        }
      },
      globals: {
        loadFavorites: jest.fn(() => ({
          cameraSelect: ['Test Camera']
        }))
      }
    });
    cleanup = clean;

    const cameraSelect = document.getElementById('cameraSelect');
    expect(cameraSelect).toBeTruthy();
    cameraSelect.innerHTML = '';
    utils.populateSelect(cameraSelect, { 'Test Camera': {} }, true);
    utils.setSelectValue(cameraSelect, 'Test Camera');

    const favButton = cameraSelect._favButton;
    expect(favButton).toBeTruthy();
    expect(favButton.disabled).toBe(false);
    expect(favButton.classList.contains('favorited')).toBe(true);
  });

  test('setSelectValue enables favorite toggle for existing selections', () => {
    const loadFavorites = jest.fn(() => ({}));
    const { utils, cleanup: clean } = setupScriptEnvironment({
      devices: {
        cameras: {
          'Another Camera': {}
        }
      },
      globals: {
        loadFavorites
      }
    });
    cleanup = clean;

    const cameraSelect = document.getElementById('cameraSelect');
    expect(cameraSelect).toBeTruthy();
    cameraSelect.innerHTML = '';
    utils.populateSelect(cameraSelect, { 'Another Camera': {} }, true);
    utils.setSelectValue(cameraSelect, 'Another Camera');

    const favButton = cameraSelect._favButton;
    expect(favButton).toBeTruthy();
    expect(favButton.disabled).toBe(false);
    expect(favButton.classList.contains('favorited')).toBe(false);
  });
});
