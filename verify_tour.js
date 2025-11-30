(async function verifyTour() {
    const log = msg => console.log(`[VERIFY] ${msg}`);
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    function clickNext() {
        const btn = getElementByXpath("//button[contains(text(), 'Weiter') or contains(text(), 'Next')]");
        if (btn) {
            btn.click();
            log('Clicked Next');
            return true;
        }
        log('Next button not found');
        return false;
    }



    // 1. Start Tour
    log('Starting Tour...');
    const startBtn = getElementByXpath("//button[contains(text(), 'Geführtes Tutorial fortsetzen') or contains(text(), 'Start guided tutorial')]");
    if (startBtn) startBtn.click();
    else {
        // Try opening help menu first
        const helpBtn = document.querySelector('[data-onboarding-tour-trigger]'); // Heuristic
        if (helpBtn) helpBtn.click();
        await sleep(500);
        const startBtn2 = getElementByXpath("//button[contains(text(), 'Geführtes Tutorial fortsetzen') or contains(text(), 'Start guided tutorial')]");
        if (startBtn2) startBtn2.click();
    }
    await sleep(1000);

    // 2. Intro -> Next
    clickNext(); await sleep(1000);

    // 3. Profile -> Next
    clickNext(); await sleep(1000);

    // 4. Preferences -> Next
    clickNext(); await sleep(1000);

    // 5. Name Project
    log('Naming Project...');
    const nameInput = document.querySelector('#projectNameInput');
    if (nameInput) {
        nameInput.value = 'Test Project';
        nameInput.dispatchEvent(new Event('input'));
        const saveBtn = document.querySelector('#saveProjectNameBtn');
        if (saveBtn) saveBtn.click();
    }
    await sleep(1000);

    // 6. Camera
    log('Selecting Camera...');
    const camSelect = document.getElementById('cameraSelect');
    if (camSelect) {
        camSelect.value = 'ARRI Alexa 35';
        camSelect.dispatchEvent(new Event('change'));
    }
    await sleep(500);
    clickNext(); await sleep(1000);

    // 7. Monitor
    log('Selecting Monitor...');
    const monSelect = document.getElementById('monitorSelect');
    if (monSelect) {
        monSelect.value = 'SmallHD Cine 5';
        monSelect.dispatchEvent(new Event('change'));
    }
    await sleep(500);
    clickNext(); await sleep(1000);

    // 8. Battery
    log('Selecting Battery...');
    const batSelect = document.getElementById('batterySelect');
    if (batSelect) {
        batSelect.value = 'Bebob B90RM-CINE';
        batSelect.dispatchEvent(new Event('change'));
    }
    await sleep(500);
    clickNext(); await sleep(1000);

    // 9-15. Power Summary & Diagrams (Just click Next repeatedly)
    log('Skipping through summary...');
    for (let i = 0; i < 8; i++) {
        clickNext();
        await sleep(800);
    }

    // 16-18. Device Library (Just click Next)
    log('Skipping through device library...');
    for (let i = 0; i < 3; i++) {
        clickNext();
        await sleep(800);
    }

    // 19. Own Gear Access
    log('Opening Own Gear...');
    const ownGearBtn = document.querySelector('[data-sidebar-action="open-own-gear"]');
    if (ownGearBtn) ownGearBtn.click();
    await sleep(1000);

    // 20. Own Gear Add
    log('Adding Own Gear...');
    const ogName = document.getElementById('ownGearName');
    if (ogName) {
        ogName.value = 'TV-Logic';
        ogName.dispatchEvent(new Event('input'));
        const ogSave = document.getElementById('ownGearSaveBtn');
        if (ogSave) ogSave.click();
    }
    await sleep(1000);

    // Close Own Gear dialog if it's still open (it might auto-close or need manual close)
    // The tour usually highlights the close button or next step.
    // Let's assume the tour guides us.

    // 21. Project Requirements Access
    log('Accessing Project Requirements...');
    // The tour should now point to "Generate Gear List"
    const genBtn = document.getElementById('generateGearListBtn');
    if (genBtn) genBtn.click();
    await sleep(1000);

    // 22. Project Requirements Brief
    log('Checking Brief...');
    // We are now in the critical section.
    // We can't take screenshots from JS, but we can log presence of elements.
    const briefSection = document.getElementById('projectRequirementsBrief');
    if (briefSection) {
        log('Brief Section Found');
        const prodInput = document.getElementById('reqProduction');
        if (prodInput) {
            prodInput.value = 'Test Production';
            prodInput.dispatchEvent(new Event('input'));
        }
    }
    await sleep(1000);
    clickNext(); // Should move to Crew

    // 23. Crew
    await sleep(1000);
    log('Checking Crew...');
    clickNext(); // Should move to Logistics

    // 24. Logistics
    await sleep(1000);
    log('Checking Logistics...');
    clickNext(); // Should move to Generate

    // 25. Generate
    await sleep(1000);
    log('Generating...');
    const reqOk = document.getElementById('projectRequirementsOkBtn');
    if (reqOk) reqOk.click();


    log('Done with critical section.');
    window.TOUR_VERIFICATION_COMPLETE = true;
})();
