const path = require('path');

const { setupModuleHarness } = require('../helpers/moduleHarness');

describe('core module registrations', () => {
  let harness;

  function requireModule(relativePath) {
    const modulePath = path.join(__dirname, '..', '..', 'src', 'scripts', 'modules', relativePath);
    return require(modulePath);
  }

  afterEach(() => {
    if (harness && typeof harness.teardown === 'function') {
      harness.teardown();
    }
    harness = null;

    [
      'deriveProjectInfo',
      'setCurrentProjectInfo',
      'getCurrentProjectInfo',
      'collectProjectFormData',
      'renderFilterDetails',
      'collectFilterSelections',
      'collectFilterTokens',
      'parseFilterTokens',
      'applyFilterSelectionsToGearList',
      'normalizeSpellingVariants',
      'normalizeSearchValue',
      'getPowerSelectionSnapshot',
      'applyStoredPowerSelection',
      'getGearListSelectors',
      'applyGearListSelectors',
      'ensureDefaultProjectInfoSnapshot',
      'skipNextGearListRefresh',
      'alignActiveAutoGearPreset',
      'reconcileAutoGearAutoPresetState',
      'openAutoGearEditor',
      'closeAutoGearEditor',
      'saveAutoGearRuleFromEditor',
      'handleAutoGearImportSelection',
      'handleAutoGearPresetSelection',
      'handleAutoGearSavePreset',
      'handleAutoGearDeletePreset',
      'applyAutoGearBackupVisibility',
      'setAutoGearBackupsVisible',
      'renderAutoGearBackupControls',
      'renderAutoGearBackupRetentionControls',
      'renderAutoGearDraftImpact',
      'renderAutoGearDraftLists',
      'renderAutoGearMonitorDefaultsControls',
      'renderAutoGearPresetsControls',
      'renderAutoGearRulesList',
      'updateAutoGearCameraWeightDraft',
      'updateAutoGearShootingDaysDraft',
      'setAutoGearAutoPresetId',
      'syncAutoGearAutoPreset',
      'updateAutoGearCatalogOptions',
      'updateAutoGearItemButtonState',
      'updateAutoGearMonitorDefaultOptions',
      'applyFavoritesToSelect',
      'updateFavoriteButton',
      'toggleFavorite',
      'loadStoredLogoPreview',
      'renderSettingsLogoPreview',
      'loadFeedbackSafe',
      'saveFeedbackSafe',
      'saveCurrentGearList',
      'populateSelect',
      'refreshDeviceLists',
      'hasAnyDeviceSelection',
      'refreshAutoGearCameraOptions',
      'refreshAutoGearCameraWeightCondition',
      'refreshAutoGearMonitorOptions',
      'refreshAutoGearTripodHeadOptions',
      'refreshAutoGearTripodBowlOptions',
      'refreshAutoGearTripodTypesOptions',
      'refreshAutoGearTripodSpreaderOptions',
      'refreshAutoGearWirelessOptions',
      'refreshAutoGearMotorsOptions',
      'refreshAutoGearControllersOptions',
      'refreshAutoGearCrewOptions',
      'refreshAutoGearDistanceOptions',
      'exportAutoGearRules',
      'generatePrintableOverview',
      'generateGearListHtml',
      'displayGearAndRequirements',
      'updateGearListButtonVisibility',
      'populateFeatureSearch',
      'restoreFeatureSearchDefaults',
      'updateFeatureSearchValue',
      'updateFeatureSearchSuggestions',
      'applyAccentColor',
      'clearAccentColorOverrides',
      'updateAccentColorResetButtonState',
      'refreshDarkModeAccentBoost',
      'isHighContrastActive',
      'revertAccentColor',
      'applyDarkMode',
      'applyPinkMode',
      'applyHighContrast',
      'setupInstallBanner',
      'ensureZoomRemoteSetup',
      'generateConnectorSummary',
    ].forEach((key) => {
      delete global[key];
    });

    [
      'currentProjectInfo',
      'projectForm',
      'filterSelectElem',
      'filterDetailsStorage',
      'accentColor',
      'prevAccentColor',
      'DEFAULT_ACCENT_COLOR',
      'HIGH_CONTRAST_ACCENT_COLOR',
      'fontSize',
      'fontFamily',
      'overviewSectionIcons',
      'scenarioIcons',
      'featureSearchEntries',
      'featureSearchDefaultOptions',
      'diagramConnectorIcons',
      'DIAGRAM_MONITOR_ICON',
    ].forEach((key) => {
      delete global[key];
    });

    delete global.cineCoreProject;
    delete global.cineCoreGuard;
    delete global.cineCoreExperience;
  });

  test('cineCoreProject exposes project helpers lazily', () => {
    harness = setupModuleHarness();

    global.deriveProjectInfo = jest.fn((info) => ({ ...info, derived: true }));
    global.currentProjectInfo = { name: 'current' };
    global.setCurrentProjectInfo = jest.fn();
    global.getCurrentProjectInfo = jest.fn(() => global.currentProjectInfo);
    global.collectProjectFormData = jest.fn(() => ({ form: true }));
    global.renderFilterDetails = jest.fn();
    global.collectFilterSelections = jest.fn(() => ['a']);
    global.collectFilterTokens = jest.fn(() => ['token']);
    global.parseFilterTokens = jest.fn(() => ['token']);
    global.applyFilterSelectionsToGearList = jest.fn();
    global.normalizeSpellingVariants = jest.fn(() => ['variant']);
    global.normalizeSearchValue = jest.fn(value => value.trim());
    global.getPowerSelectionSnapshot = jest.fn(() => ({ power: 1 }));
    global.applyStoredPowerSelection = jest.fn();
    global.getGearListSelectors = jest.fn(() => ({ selectors: true }));
    global.applyGearListSelectors = jest.fn();
    global.projectForm = { id: 'form' };
    global.filterSelectElem = { id: 'filter' };
    global.filterDetailsStorage = { id: 'details' };

    const projectModule = requireModule(path.join('core', 'project-intelligence.js'));

    projectModule.install({
      deriveProjectInfo: global.deriveProjectInfo,
      updateCalculations: jest.fn(),
      checkSetupChanged: jest.fn(),
      currentProjectInfo: global.currentProjectInfo,
      setCurrentProjectInfo: global.setCurrentProjectInfo,
      getCurrentProjectInfo: global.getCurrentProjectInfo,
      collectProjectFormData: global.collectProjectFormData,
      populateProjectForm: jest.fn(),
      renderFilterDetails: global.renderFilterDetails,
      collectFilterSelections: global.collectFilterSelections,
      collectFilterTokens: global.collectFilterTokens,
      parseFilterTokens: global.parseFilterTokens,
      applyFilterSelectionsToGearList: global.applyFilterSelectionsToGearList,
      normalizeSpellingVariants: global.normalizeSpellingVariants,
      normalizeSearchValue: global.normalizeSearchValue,
      getPowerSelectionSnapshot: global.getPowerSelectionSnapshot,
      applyStoredPowerSelection: global.applyStoredPowerSelection,
      getGearListSelectors: global.getGearListSelectors,
      applyGearListSelectors: global.applyGearListSelectors,
    });

    expect(projectModule.deriveProjectInfo).toBe(global.deriveProjectInfo);
    expect(projectModule.currentProjectInfo).toBe(global.currentProjectInfo);
    expect(projectModule.getCurrentProjectInfo()).toBe(global.currentProjectInfo);
    projectModule.collectProjectFormData();
    expect(global.collectProjectFormData).toHaveBeenCalled();
    expect(harness.moduleGlobals.getModule('cineCoreProject')).toBe(projectModule);
  });

  test('cineCoreGuard surfaces persistence guard helpers', () => {
    harness = setupModuleHarness();

    global.ensureDefaultProjectInfoSnapshot = jest.fn();
    global.skipNextGearListRefresh = jest.fn();
    global.alignActiveAutoGearPreset = jest.fn();
    global.reconcileAutoGearAutoPresetState = jest.fn();
    global.openAutoGearEditor = jest.fn();
    global.closeAutoGearEditor = jest.fn();
    global.saveAutoGearRuleFromEditor = jest.fn();
    global.handleAutoGearImportSelection = jest.fn();
    global.handleAutoGearPresetSelection = jest.fn();
    global.handleAutoGearSavePreset = jest.fn();
    global.handleAutoGearDeletePreset = jest.fn();
    global.applyAutoGearBackupVisibility = jest.fn();
    global.renderAutoGearBackupControls = jest.fn();
    global.renderAutoGearBackupRetentionControls = jest.fn();
    global.renderAutoGearDraftImpact = jest.fn();
    global.renderAutoGearDraftLists = jest.fn();
    global.renderAutoGearMonitorDefaultsControls = jest.fn();
    global.renderAutoGearPresetsControls = jest.fn();
    global.renderAutoGearRulesList = jest.fn();
    global.updateAutoGearCameraWeightDraft = jest.fn();
    global.updateAutoGearShootingDaysDraft = jest.fn();
    global.setAutoGearAutoPresetId = jest.fn();
    global.syncAutoGearAutoPreset = jest.fn();
    global.updateAutoGearCatalogOptions = jest.fn();
    global.updateAutoGearItemButtonState = jest.fn();
    global.updateAutoGearMonitorDefaultOptions = jest.fn();
    global.applyFavoritesToSelect = jest.fn();
    global.updateFavoriteButton = jest.fn();
    global.toggleFavorite = jest.fn();
    global.loadStoredLogoPreview = jest.fn();
    global.renderSettingsLogoPreview = jest.fn();
    global.loadFeedbackSafe = jest.fn();
    global.saveFeedbackSafe = jest.fn();
    global.saveCurrentGearList = jest.fn();

    const guardModule = requireModule(path.join('core', 'persistence-guard.js'));

    guardModule.install({
      ensureDefaultProjectInfoSnapshot: global.ensureDefaultProjectInfoSnapshot,
      skipNextGearListRefresh: global.skipNextGearListRefresh,
      alignActiveAutoGearPreset: global.alignActiveAutoGearPreset,
      reconcileAutoGearAutoPresetState: global.reconcileAutoGearAutoPresetState,
      openAutoGearEditor: global.openAutoGearEditor,
      closeAutoGearEditor: global.closeAutoGearEditor,
      saveAutoGearRuleFromEditor: global.saveAutoGearRuleFromEditor,
      handleAutoGearImportSelection: global.handleAutoGearImportSelection,
      handleAutoGearPresetSelection: global.handleAutoGearPresetSelection,
      handleAutoGearSavePreset: global.handleAutoGearSavePreset,
      handleAutoGearDeletePreset: global.handleAutoGearDeletePreset,
      applyAutoGearBackupVisibility: global.applyAutoGearBackupVisibility,
      renderAutoGearBackupControls: global.renderAutoGearBackupControls,
      renderAutoGearBackupRetentionControls: global.renderAutoGearBackupRetentionControls,
      renderAutoGearDraftImpact: global.renderAutoGearDraftImpact,
      renderAutoGearDraftLists: global.renderAutoGearDraftLists,
      renderAutoGearMonitorDefaultsControls: global.renderAutoGearMonitorDefaultsControls,
      renderAutoGearPresetsControls: global.renderAutoGearPresetsControls,
      renderAutoGearRulesList: global.renderAutoGearRulesList,
      updateAutoGearCameraWeightDraft: global.updateAutoGearCameraWeightDraft,
      updateAutoGearShootingDaysDraft: global.updateAutoGearShootingDaysDraft,
      setAutoGearAutoPresetId: global.setAutoGearAutoPresetId,
      syncAutoGearAutoPreset: global.syncAutoGearAutoPreset,
      updateAutoGearCatalogOptions: global.updateAutoGearCatalogOptions,
      updateAutoGearItemButtonState: global.updateAutoGearItemButtonState,
      updateAutoGearMonitorDefaultOptions: global.updateAutoGearMonitorDefaultOptions,
      applyFavoritesToSelect: global.applyFavoritesToSelect,
      updateFavoriteButton: global.updateFavoriteButton,
      toggleFavorite: global.toggleFavorite,
      loadStoredLogoPreview: global.loadStoredLogoPreview,
      renderSettingsLogoPreview: global.renderSettingsLogoPreview,
      loadFeedbackSafe: global.loadFeedbackSafe,
      saveFeedbackSafe: global.saveFeedbackSafe,
      saveCurrentGearList: global.saveCurrentGearList,
    });

    guardModule.ensureDefaultProjectInfoSnapshot();
    expect(global.ensureDefaultProjectInfoSnapshot).toHaveBeenCalled();
    guardModule.renderAutoGearRulesList();
    expect(global.renderAutoGearRulesList).toHaveBeenCalled();
    guardModule.saveCurrentGearList();
    expect(global.saveCurrentGearList).toHaveBeenCalled();
    expect(harness.moduleGlobals.getModule('cineCoreGuard')).toBe(guardModule);
  });

  test('cineCoreExperience provides experience helpers', () => {
    harness = setupModuleHarness();

    global.populateSelect = jest.fn();
    global.refreshDeviceLists = jest.fn();
    global.hasAnyDeviceSelection = jest.fn(() => true);
    global.refreshAutoGearCameraOptions = jest.fn();
    global.refreshAutoGearCameraWeightCondition = jest.fn();
    global.refreshAutoGearMonitorOptions = jest.fn();
    global.refreshAutoGearTripodHeadOptions = jest.fn();
    global.refreshAutoGearTripodBowlOptions = jest.fn();
    global.refreshAutoGearTripodTypesOptions = jest.fn();
    global.refreshAutoGearTripodSpreaderOptions = jest.fn();
    global.refreshAutoGearWirelessOptions = jest.fn();
    global.refreshAutoGearMotorsOptions = jest.fn();
    global.refreshAutoGearControllersOptions = jest.fn();
    global.refreshAutoGearCrewOptions = jest.fn();
    global.refreshAutoGearDistanceOptions = jest.fn();
    global.exportAutoGearRules = jest.fn();
    global.generatePrintableOverview = jest.fn();
    global.generateGearListHtml = jest.fn();
    global.displayGearAndRequirements = jest.fn();
    global.updateGearListButtonVisibility = jest.fn();
    global.populateFeatureSearch = jest.fn();
    global.restoreFeatureSearchDefaults = jest.fn();
    global.updateFeatureSearchValue = jest.fn();
    global.updateFeatureSearchSuggestions = jest.fn();
    global.applyAccentColor = jest.fn();
    global.clearAccentColorOverrides = jest.fn();
    global.updateAccentColorResetButtonState = jest.fn();
    global.refreshDarkModeAccentBoost = jest.fn();
    global.isHighContrastActive = jest.fn(() => false);
    global.revertAccentColor = jest.fn();
    global.applyDarkMode = jest.fn();
    global.applyPinkMode = jest.fn();
    global.applyHighContrast = jest.fn();
    global.setupInstallBanner = jest.fn();
    global.ensureZoomRemoteSetup = jest.fn();
    global.generateConnectorSummary = jest.fn();

    global.accentColor = '#000';
    global.prevAccentColor = '#111';
    global.DEFAULT_ACCENT_COLOR = '#fff';
    global.HIGH_CONTRAST_ACCENT_COLOR = '#f0f';
    global.fontSize = '16px';
    global.fontFamily = 'Inter';
    global.overviewSectionIcons = Object.freeze({});
    global.scenarioIcons = Object.freeze({});
    global.featureSearchEntries = Object.freeze([]);
    global.featureSearchDefaultOptions = Object.freeze([]);
    global.diagramConnectorIcons = Object.freeze({});
    global.DIAGRAM_MONITOR_ICON = 'monitor';

    const experienceModule = requireModule(path.join('core', 'experience.js'));

    experienceModule.install({
      populateSelect: global.populateSelect,
      refreshDeviceLists: global.refreshDeviceLists,
      hasAnyDeviceSelection: global.hasAnyDeviceSelection,
      refreshAutoGearCameraOptions: global.refreshAutoGearCameraOptions,
      refreshAutoGearCameraWeightCondition: global.refreshAutoGearCameraWeightCondition,
      refreshAutoGearMonitorOptions: global.refreshAutoGearMonitorOptions,
      refreshAutoGearTripodHeadOptions: global.refreshAutoGearTripodHeadOptions,
      refreshAutoGearTripodBowlOptions: global.refreshAutoGearTripodBowlOptions,
      refreshAutoGearTripodTypesOptions: global.refreshAutoGearTripodTypesOptions,
      refreshAutoGearTripodSpreaderOptions: global.refreshAutoGearTripodSpreaderOptions,
      refreshAutoGearWirelessOptions: global.refreshAutoGearWirelessOptions,
      refreshAutoGearMotorsOptions: global.refreshAutoGearMotorsOptions,
      refreshAutoGearControllersOptions: global.refreshAutoGearControllersOptions,
      refreshAutoGearCrewOptions: global.refreshAutoGearCrewOptions,
      refreshAutoGearDistanceOptions: global.refreshAutoGearDistanceOptions,
      exportAutoGearRules: global.exportAutoGearRules,
      generatePrintableOverview: global.generatePrintableOverview,
      generateGearListHtml: global.generateGearListHtml,
      displayGearAndRequirements: global.displayGearAndRequirements,
      updateGearListButtonVisibility: global.updateGearListButtonVisibility,
      overviewSectionIcons: global.overviewSectionIcons,
      scenarioIcons: global.scenarioIcons,
      populateFeatureSearch: global.populateFeatureSearch,
      restoreFeatureSearchDefaults: global.restoreFeatureSearchDefaults,
      updateFeatureSearchValue: global.updateFeatureSearchValue,
      updateFeatureSearchSuggestions: global.updateFeatureSearchSuggestions,
      featureSearchEntries: global.featureSearchEntries,
      featureSearchDefaultOptions: global.featureSearchDefaultOptions,
      applyAccentColor: global.applyAccentColor,
      clearAccentColorOverrides: global.clearAccentColorOverrides,
      updateAccentColorResetButtonState: global.updateAccentColorResetButtonState,
      refreshDarkModeAccentBoost: global.refreshDarkModeAccentBoost,
      isHighContrastActive: global.isHighContrastActive,
      accentColor: global.accentColor,
      prevAccentColor: global.prevAccentColor,
      revertAccentColor: global.revertAccentColor,
      DEFAULT_ACCENT_COLOR: global.DEFAULT_ACCENT_COLOR,
      HIGH_CONTRAST_ACCENT_COLOR: global.HIGH_CONTRAST_ACCENT_COLOR,
      fontSize: global.fontSize,
      fontFamily: global.fontFamily,
      applyDarkMode: global.applyDarkMode,
      applyPinkMode: global.applyPinkMode,
      applyHighContrast: global.applyHighContrast,
      setupInstallBanner: global.setupInstallBanner,
      ensureZoomRemoteSetup: global.ensureZoomRemoteSetup,
      generateConnectorSummary: global.generateConnectorSummary,
      diagramConnectorIcons: global.diagramConnectorIcons,
      DIAGRAM_MONITOR_ICON: global.DIAGRAM_MONITOR_ICON,
    });

    experienceModule.populateSelect();
    expect(global.populateSelect).toHaveBeenCalled();
    experienceModule.applyAccentColor('#123');
    expect(global.applyAccentColor).toHaveBeenCalledWith('#123');
    expect(experienceModule.accentColor).toBe('#000');
    expect(harness.moduleGlobals.getModule('cineCoreExperience')).toBe(experienceModule);
  });
});
