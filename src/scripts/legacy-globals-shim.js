


(function () {
    if (typeof window === 'undefined') return;

    // Restore critical globals previously in app-core-new-1.js
    // Executed immediately so subsequent scripts (app-events.js, app-session.js) find these variables defined.
    // Even if getElementById returns null (DOM not ready), defining them as null on window prevents ReferenceErrors.

    if (!window.cameraSelect) window.cameraSelect = document.getElementById("cameraSelect");
    if (!window.monitorSelect) window.monitorSelect = document.getElementById("monitorSelect");
    if (!window.videoSelect) window.videoSelect = document.getElementById("videoSelect");
    if (!window.videoDistributionSelect) window.videoDistributionSelect = document.getElementById("videoDistribution");
    if (!window.cageSelect) window.cageSelect = document.getElementById("cageSelect");

    if (!window.motorSelects) {
        window.motorSelects = [
            document.getElementById("motor1Select"),
            document.getElementById("motor2Select"),
            document.getElementById("motor3Select"),
            document.getElementById("motor4Select")
        ];
    }

    if (!window.controllerSelects) {
        window.controllerSelects = [
            document.getElementById("controller1Select"),
            document.getElementById("controller2Select"),
            document.getElementById("controller3Select"),
            document.getElementById("controller4Select")
        ];
    }

    if (!window.distanceSelect) window.distanceSelect = document.getElementById("distanceSelect");
    if (!window.batterySelect) window.batterySelect = document.getElementById("batterySelect");
    if (!window.hotswapSelect) window.hotswapSelect = document.getElementById("batteryHotswapSelect");
    if (!window.lensSelect) window.lensSelect = document.getElementById("lenses");

    // Export Button (used in app-events.js)
    if (!window.exportBtn) window.exportBtn = document.getElementById("exportDataBtn");

    // Other globals found in app-core-new-1.js that might be needed
    if (!window.crewContainer) window.crewContainer = document.getElementById("crewContainer");
    if (!window.prepContainer) window.prepContainer = document.getElementById("prepContainer");
    if (!window.shootContainer) window.shootContainer = document.getElementById("shootContainer");
    if (!window.returnContainer) window.returnContainer = document.getElementById("returnContainer");
    if (!window.storageNeedsContainer) window.storageNeedsContainer = document.getElementById("storageNeedsContainer");

    // Dialogs
    if (!window.projectDialogCloseBtn) window.projectDialogCloseBtn = document.getElementById("projectDialogClose");
    if (!window.setupNameInput) window.setupNameInput = document.getElementById("setupName");

    // Missing Global State Variables
    if (typeof window.showAutoBackups === "undefined") window.showAutoBackups = false;

    // Missing UI Elements
    if (typeof window.autoGearAddRuleBtn === "undefined") window.autoGearAddRuleBtn = null;
    if (typeof window.autoGearConditionAddButton === "undefined") window.autoGearConditionAddButton = null;
    // Missing UI Elements
    if (typeof window.autoGearAddRuleBtn === "undefined") window.autoGearAddRuleBtn = null;
    if (typeof window.autoGearConditionAddButton === "undefined") window.autoGearConditionAddButton = null;
    if (typeof window.autoGearScenarioBaseSelect === "undefined") window.autoGearScenarioBaseSelect = null;

    // Missing State Objects
    if (!window.autoGearActiveConditions) window.autoGearActiveConditions = new Set();

    console.log("Legacy globals shim executed. Global UI references restored.");
})();
