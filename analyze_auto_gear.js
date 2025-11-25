
(async function analyzeAutoGear() {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const log = msg => console.log(`[ANALYZE] ${msg}`);

    function getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    function clickNext() {
        const btn = getElementByXpath("//button[contains(text(), 'Weiter') or contains(text(), 'Next') or contains(text(), 'Einführung starten')]");
        if (btn) {
            btn.click();
            return true;
        }
        return false;
    }

    // 1. Clear & Start
    localStorage.clear();
    location.reload();
    await sleep(2000);

    log('Starting Tour...');
    const startBtn = getElementByXpath("//button[contains(text(), 'Geführtes Tutorial fortsetzen') or contains(text(), 'Start guided tutorial')]");
    if (startBtn) startBtn.click();
    else {
        const helpBtn = document.querySelector('[data-onboarding-tour-trigger]');
        if (helpBtn) helpBtn.click();
        await sleep(500);
        const startBtn2 = getElementByXpath("//button[contains(text(), 'Geführtes Tutorial fortsetzen') or contains(text(), 'Start guided tutorial')]");
        if (startBtn2) startBtn2.click();
    }
    await sleep(1000);
    clickNext(); await sleep(500); // Intro
    clickNext(); await sleep(500); // Profile
    clickNext(); await sleep(500); // Preferences

    // 2. Project Setup
    log('Project Setup...');
    const nameInput = document.querySelector('#projectNameInput');
    if (nameInput) {
        nameInput.value = 'Test Project';
        nameInput.dispatchEvent(new Event('input'));
        document.querySelector('#saveProjectNameBtn').click();
    }
    await sleep(1000);

    const camSelect = document.getElementById('cameraSelect');
    if (camSelect) {
        camSelect.value = 'ARRI Alexa 35';
        camSelect.dispatchEvent(new Event('change'));
    }
    await sleep(500);
    clickNext(); await sleep(800);

    const monSelect = document.getElementById('monitorSelect');
    if (monSelect) {
        monSelect.value = 'SmallHD Cine 5';
        monSelect.dispatchEvent(new Event('change'));
    }
    await sleep(500);
    clickNext(); await sleep(800);

    const batSelect = document.getElementById('batterySelect');
    if (batSelect) {
        batSelect.value = 'Bebob B90RM-CINE';
        batSelect.dispatchEvent(new Event('change'));
    }
    await sleep(500);
    clickNext(); await sleep(800);

    // 3. Fast Forward Summary & Library
    log('Skipping Summary & Library...');
    for (let i = 0; i < 11; i++) {
        clickNext();
        await sleep(400);
    }

    // 4. Own Gear
    log('Own Gear...');
    document.querySelector('[data-sidebar-action="open-own-gear"]').click();
    await sleep(1000);
    const ogName = document.getElementById('ownGearName');
    if (ogName) {
        ogName.value = 'TV-Logic';
        ogName.dispatchEvent(new Event('input'));
        document.getElementById('ownGearSaveBtn').click();
    }
    await sleep(1000);

    // 5. Project Requirements
    log('Project Requirements...');
    document.getElementById('generateGearListBtn').click();
    await sleep(1000);

    const prodInput = document.getElementById('reqProduction');
    if (prodInput) {
        prodInput.value = 'Test Production';
        prodInput.dispatchEvent(new Event('input'));
    }
    await sleep(500);
    clickNext(); await sleep(500); // Crew
    clickNext(); await sleep(500); // Logistics
    clickNext(); await sleep(500); // Generate

    document.getElementById('projectRequirementsOkBtn').click();
    await sleep(2000);

    log('Arrived at Auto Gear Rules');
    window.ANALYSIS_READY = true;
})();
