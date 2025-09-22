const path = require('path');

const SCRIPT_PATH = path.join(__dirname, '..', '..', 'src', 'scripts', 'autosave-overlay.js');

function flushMutations() {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
}

describe('autosave overlay accessibility note', () => {
  let readyStateDescriptor;
  let readyStateValue;

  beforeAll(() => {
    readyStateDescriptor = Object.getOwnPropertyDescriptor(document, 'readyState');
  });

  beforeEach(() => {
    jest.resetModules();
    readyStateValue = 'complete';
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => readyStateValue,
    });

    document.body.innerHTML = '';

    const dialog = document.createElement('dialog');
    dialog.id = 'settingsDialog';
    dialog.open = true;

    const note = document.createElement('p');
    note.id = 'gearListAutosaveNote';
    note.textContent = ' Autosave ready ';

    dialog.appendChild(note);
    document.body.appendChild(dialog);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
    if (readyStateDescriptor) {
      Object.defineProperty(document, 'readyState', readyStateDescriptor);
    } else {
      delete document.readyState;
    }
  });

  const loadScript = () => {
    require(SCRIPT_PATH);
  };

  const getElements = () => {
    const dialog = document.getElementById('settingsDialog');
    const note = document.getElementById('gearListAutosaveNote');
    const overlay = document.getElementById('gearListAutosaveOverlayNote');
    return { dialog, note, overlay };
  };

  test('creates overlay and mirrors visible note when dialog is open', () => {
    loadScript();

    const { dialog, note, overlay } = getElements();

    expect(dialog).not.toBeNull();
    expect(note).not.toBeNull();
    expect(overlay).not.toBeNull();
    expect(overlay.textContent).toBe('Autosave ready');
    expect(overlay.hidden).toBe(false);
    expect(overlay.getAttribute('aria-hidden')).toBe('false');
    expect(overlay.classList.contains('is-visible')).toBe(true);
  });

  test('defers setup until DOMContentLoaded when document is loading', () => {
    readyStateValue = 'loading';

    loadScript();

    let { overlay } = getElements();
    expect(overlay).toBeNull();

    document.dispatchEvent(new Event('DOMContentLoaded'));

    ({ overlay } = getElements());
    expect(overlay).not.toBeNull();
    expect(overlay.textContent).toBe('Autosave ready');
    expect(overlay.hidden).toBe(false);
    expect(overlay.getAttribute('aria-hidden')).toBe('false');
  });

  test('reacts to note visibility and text changes', async () => {
    loadScript();

    let { note, overlay } = getElements();
    expect(overlay.hidden).toBe(false);

    note.textContent = '';
    await flushMutations();

    ({ overlay } = getElements());
    expect(overlay.hidden).toBe(true);
    expect(overlay.classList.contains('is-visible')).toBe(false);
    expect(overlay.getAttribute('aria-hidden')).toBe('true');

    note.textContent = 'Autosave complete';
    await flushMutations();

    ({ overlay } = getElements());
    expect(overlay.hidden).toBe(false);
    expect(overlay.classList.contains('is-visible')).toBe(true);
    expect(overlay.textContent).toBe('Autosave complete');

    note.setAttribute('hidden', '');
    await flushMutations();

    ({ overlay } = getElements());
    expect(overlay.hidden).toBe(true);
    expect(overlay.classList.contains('is-visible')).toBe(false);

    note.removeAttribute('hidden');
    await flushMutations();

    ({ overlay } = getElements());
    expect(overlay.hidden).toBe(false);
    expect(overlay.classList.contains('is-visible')).toBe(true);
  });
});
