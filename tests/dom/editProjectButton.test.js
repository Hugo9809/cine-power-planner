const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const legacyProjectHtml = `
  <h2>Project Legacy</h2>
  <h3>Project Requirements</h3>
  <div class="requirements-grid">
    <button id="editProjectBtn" type="button">Legacy Edit</button>
    <div class="requirement-box" data-field="productionCompany">
      <span class="req-label">Production Company</span>
      <span class="req-value">Acme</span>
    </div>
  </div>
  <h3>Gear List</h3>
  <table class="gear-table"><tr><td>Saved Item</td></tr></table>
`;

describe('edit project requirements button', () => {
  let env;

  beforeEach(() => {
    env = setupScriptEnvironment();
  });

  afterEach(() => {
    env?.cleanup();
  });

  test('re-binds legacy edit button and loads saved project requirements', () => {
    env.utils.displayGearAndRequirements(legacyProjectHtml);

    const container = document.getElementById('projectRequirementsOutput');
    const button = document.getElementById('editProjectBtn');
    expect(button).not.toBeNull();
    expect(button.parentElement).toBe(container);
    expect(button.type).toBe('button');
    expect(button.dataset.editProjectBound).toBe('true');

    env.utils.setCurrentProjectInfo({ productionCompany: 'Acme Studios' });

    const productionInput = document.querySelector('[name="productionCompany"]');
    expect(productionInput).not.toBeNull();
    productionInput.value = 'Different Company';

    button.click();

    const formData = env.utils.collectProjectFormData();
    expect(formData.productionCompany).toBe('Acme Studios');

    const dialog = document.getElementById('projectDialog');
    expect(dialog).not.toBeNull();
    expect(dialog.hasAttribute('open') || dialog.open === true).toBe(true);
  });
});

