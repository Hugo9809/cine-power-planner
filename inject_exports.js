
(function injectState() {
    const PRIMARY_STORAGE_KEY = 'cinePowerPlanner_onboardingTutorial';
    const PROJECT_STORAGE_KEY = 'cameraPowerPlanner_project';
    const AUTO_GEAR_SEEDED_KEY = 'cameraPowerPlanner_autoGearSeeded';

    // 1. Define Steps
    const DEFAULT_STEP_KEYS = [
        'intro', 'userProfile', 'unitsPreferences', 'nameProject', 'saveProject',
        'addCamera', 'addMonitoring', 'selectBattery', 'resultsTotalDraw',
        'resultsBatteryPacks', 'resultsChangeover', 'resultsWarnings',
        'batteryComparison', 'runtimeFeedback', 'connectionDiagram',
        'connectionDiagramDetails', 'editDeviceDataAdd', 'editDeviceDataReview',
        'editDeviceDataEdit', 'ownGearAccess', 'ownGearAddDevice',
        'projectRequirementsAccess', 'projectRequirementsBrief',
        'projectRequirementsCrew', 'projectRequirementsLogistics',
        'generateGearAndRequirements', 'autoGearRulesAccess',
        'autoGearRulesEdit', 'autoGearRulesCreate', 'gearList',
        'exportImport', 'overviewAndPrint', 'help', 'settingsGeneral',
        'settingsData', 'settingsBackup', 'completion'
    ];
    const STEP_SIGNATURE = DEFAULT_STEP_KEYS.join('|');

    // 2. Construct State
    const targetStep = 'exportImport';
    const completedSteps = DEFAULT_STEP_KEYS.slice(0, DEFAULT_STEP_KEYS.indexOf(targetStep));

    const state = {
        version: 2,
        completed: false,
        skipped: false,
        completedSteps: completedSteps,
        activeStep: targetStep,
        stepSignature: STEP_SIGNATURE,
        timestamp: Date.now(),
        lastCompletedStep: completedSteps[completedSteps.length - 1],
        lastCompletedAt: Date.now()
    };

    // 3. Construct Project
    const project = {
        projectInfo: {
            name: 'Injected Project',
            created: Date.now(),
            updated: Date.now()
        },
        gearList: '<ul><li>Camera</li><li>Battery</li></ul>',
        autoGearRules: []
    };

    const projectsMap = {
        'Injected Project': project
    };

    // 4. Inject
    localStorage.clear();
    localStorage.setItem(PRIMARY_STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projectsMap));
    localStorage.setItem(AUTO_GEAR_SEEDED_KEY, '1');

    console.log('State injected. Reloading...');
    location.reload();
})();
