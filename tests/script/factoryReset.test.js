const { loadApp } = require('./helpers/loadApp');

describe('factory reset cleanup', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  test('resetPlannerStateAfterFactoryReset clears in-memory state and UI', () => {
    const app = loadApp();
    const {
      resetPlannerStateAfterFactoryReset,
      setCurrentProjectInfo,
      getCurrentProjectInfo,
      getAutoGearRules,
      syncAutoGearRulesFromStorage,
    } = app;

    const setupSelect = document.getElementById('setupSelect');
    const setupNameInput = document.getElementById('setupName');
    const cameraSelect = document.getElementById('cameraSelect');
    const gearListOutput = document.getElementById('gearListOutput');
    const projectRequirementsOutput = document.getElementById('projectRequirementsOutput');

    const customRules = [
      {
        id: 'rule-reset',
        label: 'Custom Reset Rule',
        scenarios: ['Handheld'],
        add: [
          { id: 'item-test', name: 'Focus Monitor Shade', category: 'Accessories', quantity: 1 },
        ],
        remove: [],
      },
    ];
    syncAutoGearRulesFromStorage(customRules);
    expect(getAutoGearRules().some((rule) => rule.label === 'Custom Reset Rule')).toBe(true);

    setCurrentProjectInfo({ productionCompany: 'Active project' });

    setupNameInput.value = 'Main setup';
    const customOption = new Option('Main setup', 'Main setup');
    setupSelect.appendChild(customOption);
    setupSelect.value = 'Main setup';

    const firstCamera = Array.from(cameraSelect.options).find(
      (opt) => opt.value && opt.value !== 'None',
    );
    if (firstCamera) {
      cameraSelect.value = firstCamera.value;
    }

    gearListOutput.innerHTML = '<div>Gear persists</div>';
    gearListOutput.classList.remove('hidden');
    projectRequirementsOutput.innerHTML = '<div>Requirements persist</div>';
    projectRequirementsOutput.classList.remove('hidden');

    localStorage.clear();
    sessionStorage.clear();

    resetPlannerStateAfterFactoryReset();

    expect(getCurrentProjectInfo()).toBeNull();
    expect(setupNameInput.value).toBe('');
    expect(setupSelect.value).toBe('');
    expect(Array.from(setupSelect.options).some((opt) => opt.value === 'Main setup')).toBe(false);

    const hasNoneCamera = Array.from(cameraSelect.options).some((opt) => opt.value === 'None');
    if (hasNoneCamera) {
      expect(cameraSelect.value).toBe('None');
    } else {
      expect(cameraSelect.selectedIndex).toBe(0);
    }

    expect(gearListOutput.classList.contains('hidden')).toBe(true);
    expect(gearListOutput.querySelector('.gear-table')).toBeNull();
    expect(projectRequirementsOutput.classList.contains('hidden')).toBe(true);
    expect(projectRequirementsOutput.querySelector('.requirement-box')).toBeNull();

    const motorSelects = [
      document.getElementById('motor1Select'),
      document.getElementById('motor2Select'),
      document.getElementById('motor3Select'),
      document.getElementById('motor4Select'),
    ];
    motorSelects.forEach((select) => {
      if (!select) return;
      const noneOption = Array.from(select.options).find((opt) => opt.value === 'None');
      if (noneOption) {
        expect(select.value).toBe('None');
      } else if (select.options.length) {
        expect(select.selectedIndex).toBe(0);
      } else {
        expect(select.value).toBe('');
      }
    });

    const rulesAfterReset = getAutoGearRules();
    expect(rulesAfterReset.some((rule) => rule.label === 'Custom Reset Rule')).toBe(false);
  });

  test('resetPlannerStateAfterFactoryReset removes uploaded custom fonts', async () => {
    const app = loadApp();
    const { resetPlannerStateAfterFactoryReset, __customFontInternals } = app;
    const fontSelect = document.getElementById('settingsFontFamily');

    await __customFontInternals.addFromData(
      'Factory Reset Font',
      'data:font/woff;base64,AAAA',
      { persist: false },
    );

    expect(__customFontInternals.getEntries().length).toBe(1);

    const uploadedOptionsBefore = Array.from(fontSelect.options).filter(
      (option) => option?.dataset?.source === 'uploaded',
    );
    expect(uploadedOptionsBefore.length).toBeGreaterThan(0);
    const fontId = uploadedOptionsBefore[0].dataset.fontId;
    const styleId = `customFontStyle-${fontId}`;
    expect(document.getElementById(styleId)).not.toBeNull();

    resetPlannerStateAfterFactoryReset();

    expect(__customFontInternals.getEntries().length).toBe(0);
    const uploadedOptionsAfter = Array.from(fontSelect.options).filter(
      (option) => option?.dataset?.source === 'uploaded',
    );
    expect(uploadedOptionsAfter.length).toBe(0);
    expect(document.getElementById(styleId)).toBeNull();
  });
});
