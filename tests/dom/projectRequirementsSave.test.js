const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const PROJECT_STORAGE_KEY = 'cameraPowerPlanner_project';

describe('project requirements persistence to project storage', () => {
  let env;

  let originalUpdateSelectIconBoxes;

  beforeEach(() => {
    jest.useFakeTimers();
    localStorage.clear();
    env = setupScriptEnvironment({
      globals: {
        saveSessionState: jest.fn(),
        loadSessionState: jest.fn(() => ({})),
        loadSetups: jest.fn(() => ({})),
        saveSetups: jest.fn(),
      },
    });

    originalUpdateSelectIconBoxes = global.updateSelectIconBoxes;
    if (typeof global.updateSelectIconBoxes !== 'function') {
      global.updateSelectIconBoxes = () => {};
    }

    require('../../src/scripts/storage.js');

    const setupNameInput = document.getElementById('setupName');
    setupNameInput.value = 'Requirements Capture';
    setupNameInput.dispatchEvent(new Event('input', { bubbles: true }));
  });

  afterEach(() => {
    jest.useRealTimers();
    localStorage.clear();
    env?.cleanup();
    env = null;
    if (typeof originalUpdateSelectIconBoxes === 'function') {
      global.updateSelectIconBoxes = originalUpdateSelectIconBoxes;
    } else {
      delete global.updateSelectIconBoxes;
    }
  });

  function setSelectValue(select, value) {
    const option = Array.from(select.options || []).find((opt) => opt.value === value);
    if (!option) {
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = value;
      select.appendChild(opt);
    } else {
      option.selected = true;
    }
    select.value = value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function setMultiSelectValues(select, values) {
    const normalized = Array.isArray(values) ? values : [values];
    Array.from(select.options || []).forEach((opt) => {
      opt.selected = normalized.includes(opt.value);
    });
    normalized.forEach((value) => {
      if (!Array.from(select.options || []).some((opt) => opt.value === value)) {
        const opt = document.createElement('option');
        opt.value = value;
        opt.textContent = value;
        opt.selected = true;
        select.appendChild(opt);
      }
    });
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  test('saveCurrentGearList stores project form fields on the project record', () => {
    const projectForm = document.getElementById('projectForm');
    expect(projectForm).not.toBeNull();

    const setInputValue = (selector, value, eventType = 'input') => {
      const el = projectForm.querySelector(selector);
      expect(el).not.toBeNull();
      el.value = value;
      el.dispatchEvent(new Event(eventType, { bubbles: true }));
    };

    setInputValue('#productionCompany', 'Test Co');
    setInputValue('#productionCompanyStreet', '123 Production Way');
    setInputValue('#productionCompanyStreet2', 'Building B');
    setInputValue('#productionCompanyCity', 'Stage City');
    setInputValue('#productionCompanyRegion', 'CA');
    setInputValue('#productionCompanyPostalCode', '90001');
    setInputValue('#productionCompanyCountry', 'United States');
    setInputValue('#rentalHouse', 'Rental Works');

    document.getElementById('addPersonBtn').click();
    const crewRow = projectForm.querySelector('#crewContainer .person-row:last-child');
    expect(crewRow).not.toBeNull();
    crewRow.querySelector('.person-name').value = 'Sam';
    crewRow.querySelector('.person-name').dispatchEvent(new Event('input', { bubbles: true }));
    crewRow.querySelector('.person-phone').value = '555-0100';
    crewRow.querySelector('.person-phone').dispatchEvent(new Event('input', { bubbles: true }));
    crewRow.querySelector('.person-email').value = 'sam@example.com';
    crewRow.querySelector('.person-email').dispatchEvent(new Event('input', { bubbles: true }));
    crewRow.querySelector('.person-website').value = 'https://samcrew.example';
    crewRow.querySelector('.person-website').dispatchEvent(new Event('input', { bubbles: true }));

    document.getElementById('addPrepBtn').click();
    const prepRow = projectForm.querySelector('#prepContainer .period-row:last-child');
    expect(prepRow).not.toBeNull();
    prepRow.querySelector('.prep-start').value = '2024-05-01';
    prepRow.querySelector('.prep-start').dispatchEvent(new Event('change', { bubbles: true }));
    prepRow.querySelector('.prep-end').value = '2024-05-03';
    prepRow.querySelector('.prep-end').dispatchEvent(new Event('change', { bubbles: true }));

    document.getElementById('addShootBtn').click();
    const shootRow = projectForm.querySelector('#shootContainer .period-row:last-child');
    expect(shootRow).not.toBeNull();
    shootRow.querySelector('.shoot-start').value = '2024-06-10';
    shootRow.querySelector('.shoot-start').dispatchEvent(new Event('change', { bubbles: true }));
    shootRow.querySelector('.shoot-end').value = '2024-06-12';
    shootRow.querySelector('.shoot-end').dispatchEvent(new Event('change', { bubbles: true }));

    const deliverySelect = projectForm.querySelector('#deliveryResolution');
    setSelectValue(deliverySelect, '4K');

    const aspectSelect = projectForm.querySelector('#aspectRatio');
    setMultiSelectValues(aspectSelect, ['16:9', '2.39:1']);

    const baseFrameRateSelect = projectForm.querySelector('#baseFrameRate');
    setSelectValue(baseFrameRateSelect, '24');

    const recordingFrameRateInput = projectForm.querySelector('#recordingFrameRate');
    recordingFrameRateInput.value = '120';
    recordingFrameRateInput.dispatchEvent(new Event('input', { bubbles: true }));

    const requiredScenariosSelect = projectForm.querySelector('#requiredScenarios');
    setMultiSelectValues(requiredScenariosSelect, ['Outdoor', 'Slider']);

    const cameraHandleSelect = projectForm.querySelector('#cameraHandle');
    setMultiSelectValues(cameraHandleSelect, ['Hand Grips']);

    const viewfinderExtensionSelect = projectForm.querySelector('#viewfinderExtension');
    setSelectValue(viewfinderExtensionSelect, 'ARRI VEB-3 Viewfinder Extension Bracket');

    const matteboxSelect = projectForm.querySelector('#mattebox');
    setSelectValue(matteboxSelect, 'Swing Away');

    const monitoringConfigurationSelect = projectForm.querySelector('#monitoringConfiguration');
    setSelectValue(monitoringConfigurationSelect, 'Quad-split');

    const viewfinderSettingsSelect = projectForm.querySelector('#viewfinderSettings');
    setMultiSelectValues(viewfinderSettingsSelect, ['Viewfinder Clean Feed']);

    const frameGuidesSelect = projectForm.querySelector('#frameGuides');
    setMultiSelectValues(frameGuidesSelect, ['Frame Guide: Rule of Thirds']);

    const aspectMaskSelect = projectForm.querySelector('#aspectMaskOpacity');
    setMultiSelectValues(aspectMaskSelect, ['AM Opacity 50%']);

    const videoDistributionSelect = projectForm.querySelector('#videoDistribution');
    setMultiSelectValues(videoDistributionSelect, [
      'Director Monitor 7" handheld',
      'IOS Video',
    ]);

    const monitorButtonsSelect = projectForm.querySelector('#monitorUserButtons');
    setMultiSelectValues(monitorButtonsSelect, ['User 1', 'Waveform']);

    const cameraButtonsSelect = projectForm.querySelector('#cameraUserButtons');
    setMultiSelectValues(cameraButtonsSelect, ['WB', 'ISO']);

    const viewfinderButtonsSelect = projectForm.querySelector('#viewfinderUserButtons');
    setMultiSelectValues(viewfinderButtonsSelect, ['Zebra']);

    const tripodHeadSelect = projectForm.querySelector('#tripodHeadBrand');
    setSelectValue(tripodHeadSelect, 'Sachtler');

    const tripodBowlSelect = projectForm.querySelector('#tripodBowl');
    setSelectValue(tripodBowlSelect, '150mm bowl');

    const tripodTypesSelect = projectForm.querySelector('#tripodTypes');
    setMultiSelectValues(tripodTypesSelect, ['Long', 'Short']);

    const tripodSpreaderSelect = projectForm.querySelector('#tripodSpreader');
    setSelectValue(tripodSpreaderSelect, 'Mid-Level Spreader');

    env.utils.saveCurrentGearList();

    const storedRaw = localStorage.getItem(PROJECT_STORAGE_KEY);
    expect(storedRaw).toBeTruthy();
    const stored = JSON.parse(storedRaw);
    const projectEntry = stored['Requirements Capture'];
    expect(projectEntry).toBeDefined();
    expect(projectEntry.projectInfo).toBeDefined();

    expect(projectEntry.projectInfo).toMatchObject({
      productionCompany: 'Test Co',
      productionCompanyAddress: '123 Production Way\nBuilding B\nStage City, CA, 90001\nUnited States',
      productionCompanyStreet: '123 Production Way',
      productionCompanyStreet2: 'Building B',
      productionCompanyCity: 'Stage City',
      productionCompanyRegion: 'CA',
      productionCompanyPostalCode: '90001',
      productionCompanyCountry: 'United States',
      rentalHouse: 'Rental Works',
      projectName: 'Requirements Capture',
      deliveryResolution: '4K',
      aspectRatio: '16:9, 2.39:1',
      baseFrameRate: '24',
      recordingFrameRate: '120',
      requiredScenarios: 'Outdoor, Slider',
      cameraHandle: 'Hand Grips',
      viewfinderExtension: 'ARRI VEB-3 Viewfinder Extension Bracket',
      mattebox: 'Swing Away',
      monitoringConfiguration: 'Quad-split',
      viewfinderSettings: 'Viewfinder Clean Feed',
      frameGuides: 'Frame Guide: Rule of Thirds',
      aspectMaskOpacity: 'AM Opacity 50%',
      videoDistribution: 'Director Monitor 7" handheld, IOS Video',
      monitorUserButtons: 'User 1, Waveform',
      cameraUserButtons: 'WB, ISO',
      viewfinderUserButtons: 'Zebra',
      tripodHeadBrand: 'Sachtler',
      tripodBowl: '150mm bowl',
      tripodTypes: 'Long, Short',
      tripodSpreader: 'Mid-Level Spreader',
    });

    expect(projectEntry.projectInfo.people).toEqual([
      {
        role: 'Producer',
        name: 'Sam',
        phone: '555-0100',
        email: 'sam@example.com',
        website: 'https://samcrew.example',
      },
    ]);

    expect(projectEntry.projectInfo.prepDays).toEqual(['2024-05-01 to 2024-05-03']);
    expect(projectEntry.projectInfo.shootingDays).toEqual(['2024-06-10 to 2024-06-12']);
  });

  test('clicking the project dialog backdrop submits and closes the form', () => {
    const projectForm = document.getElementById('projectForm');
    const projectDialog = document.getElementById('projectDialog');
    expect(projectForm).not.toBeNull();
    expect(projectDialog).not.toBeNull();

    const submitSpy = jest.fn();
    projectForm.addEventListener('submit', submitSpy);

    const productionCompanyInput = projectForm.querySelector('#productionCompany');
    expect(productionCompanyInput).not.toBeNull();
    productionCompanyInput.value = 'Backdrop Save Co';
    productionCompanyInput.dispatchEvent(new Event('input', { bubbles: true }));

    projectDialog.setAttribute('open', '');

    projectDialog.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(submitSpy).toHaveBeenCalledTimes(1);
    const dialogStillOpen = (
      (typeof projectDialog.open === 'boolean' && projectDialog.open)
      || (typeof projectDialog.hasAttribute === 'function' && projectDialog.hasAttribute('open'))
    );
    expect(dialogStillOpen).toBe(false);
  });
});
