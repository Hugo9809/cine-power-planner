const { createOwnGearView } = require('../../src/scripts/own-gear/view.js');

describe('own gear view', () => {
  let container;
  let store;
  let iconMarkupCalls;

  function renderTemplate() {
    document.body.innerHTML = `
      <dialog id="ownGearDialog">
        <form id="ownGearForm">
          <input id="ownGearName" />
          <input id="ownGearQuantity" />
          <textarea id="ownGearNotes"></textarea>
          <button id="ownGearSaveButton" type="submit"></button>
          <button id="ownGearResetButton" type="button"></button>
          <button id="ownGearCloseButton" type="button"></button>
        </form>
        <div id="ownGearAddHelp"></div>
        <datalist id="ownGearSuggestions"></datalist>
        <h3 id="ownGearDialogHeading"></h3>
        <p id="ownGearDialogDescription"></p>
        <h4 id="ownGearAddHeading"></h4>
        <label id="ownGearNameLabel" for="ownGearName"></label>
        <label id="ownGearQuantityLabel" for="ownGearQuantity"></label>
        <label id="ownGearNotesLabel" for="ownGearNotes"></label>
        <p id="ownGearListHeading"></p>
        <p id="ownGearEmptyState"></p>
        <p id="ownGearListSummary"></p>
        <ul id="ownGearList"></ul>
      </dialog>
    `;
    container = document.getElementById('ownGearDialog');
  }

  beforeEach(() => {
    renderTemplate();
    iconMarkupCalls = [];
    store = {
      loadStoredOwnGearItems: jest.fn().mockReturnValue([
        { id: 'gear-1', name: 'Pocket 6K', quantity: '2' },
      ]),
      persistOwnGearItems: jest.fn().mockReturnValue(true),
      generateOwnGearId: jest.fn().mockReturnValue('generated-id'),
    };
  });

  function createView(overrides = {}) {
    const getLanguageTexts = () => ({
      ownGearDialogTitle: 'Own gear',
      ownGearDialogDescription: 'Track it',
      ownGearAddHeading: 'Add gear',
      ownGearNameLabel: 'Item',
      ownGearQuantityLabel: 'Qty',
      ownGearNotesLabel: 'Notes',
      ownGearSaveButton: 'Save item',
      ownGearResetButton: 'Reset',
      ownGearCloseButton: 'Close',
      ownGearListHeading: 'Your kit',
      ownGearListEmpty: 'Empty',
      ownGearEditButton: 'Edit',
      ownGearDeleteButton: 'Remove',
      ownGearDeleteConfirm: 'Remove “%s”?',
    });

    const baseOptions = {
      document,
      getLanguageTexts,
      defaultLanguage: 'en',
      getCurrentLanguage: () => 'en',
      iconGlyphs: {
        sliders: { char: 'A', font: 'uicons' },
        trash: { char: 'B', font: 'uicons' },
        save: { char: 'S', font: 'uicons' },
        add: { char: '+', font: 'uicons' },
        reload: { char: 'R', font: 'uicons' },
        circleX: { char: 'X', font: 'uicons' },
      },
      iconMarkup: (glyph) => {
        iconMarkupCalls.push(glyph);
        return `<span class="btn-icon" data-icon-font="${glyph.font}">${glyph.char}</span>`;
      },
      setButtonLabelWithIconBinding: (button, label) => {
        // Simplified binding for tests
        // eslint-disable-next-line no-param-reassign
        button.textContent = label;
      },
      formatWithPlaceholders: (template, value) => template.replace('%s', value),
      openDialog: jest.fn(),
      closeDialog: jest.fn(),
      formatQuantityText: (value) => value,
      confirm: () => true,
    };

    return createOwnGearView(store, { ...baseOptions, ...overrides });
  }

  test('uses local glyph markup for own gear actions', () => {
    const view = createView();
    view.initialize();

    const buttons = container.querySelectorAll('.own-gear-item-action');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
    buttons.forEach((btn) => {
      expect(btn.innerHTML).toContain('data-icon-font="uicons"');
    });
    expect(iconMarkupCalls.length).toBeGreaterThanOrEqual(2);
    iconMarkupCalls.forEach((glyph) => {
      expect(glyph.font).toBe('uicons');
    });
  });

  test('edit and delete actions persist through the store', () => {
    const view = createView();
    view.initialize();

    const [editButton] = container.querySelectorAll('.own-gear-item-action');
    editButton.click();
    const form = document.getElementById('ownGearForm');
    document.getElementById('ownGearName').value = 'Updated camera';
    document.getElementById('ownGearQuantity').value = '3';
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(store.persistOwnGearItems).toHaveBeenCalledWith([
      { id: 'gear-1', name: 'Updated camera', quantity: '3', source: 'custom' },
    ]);

    store.persistOwnGearItems.mockClear();
    const deleteButton = container.querySelector('.own-gear-item-action-danger');
    deleteButton.click();
    expect(store.persistOwnGearItems).toHaveBeenCalledWith([]);
  });
});
