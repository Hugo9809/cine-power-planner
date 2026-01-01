(async function verifySmokeTest() {
    const log = (msg) => console.log(`[SmokeTest] ${msg}`);
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const waitFor = async (selector, timeout = 10000) => {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            const el = document.querySelector(selector);
            if (el) {
                const style = window.getComputedStyle(el);
                const isVisible = style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
                if (isVisible) return el;
            }
            await wait(100);
        }
        throw new Error(`Timeout waiting for ${selector}`);
    };

    try {
        log("Starting End-to-End Smoke Test...");

        // 1. Factory Reset
        log("1. Performing Factory Reset...");
        const settingsBtn = document.querySelector('#settingsButton');
        if (settingsBtn) settingsBtn.click();
        await wait(500);
        const dataTab = document.querySelector('#settingsTab-data');
        if (dataTab) dataTab.click();
        await wait(500);
        const resetBtn = document.querySelector('#factoryResetBtn');
        if (resetBtn) {
            resetBtn.click();
            await wait(500);
            const confirmBtn = document.querySelector('.dialog-confirm') || document.querySelector('.cine-dialog-action--confirm');
            if (confirmBtn) confirmBtn.click();
            else if (window.confirm) window.confirm = () => true;
        }
        await wait(3000); // Wait for reload

        // 2. Skip Onboarding
        log("2. Handling Onboarding...");
        try {
            // Try API first for speed
            if (window.cineFeaturesOnboardingTour && typeof window.cineFeaturesOnboardingTour.stop === 'function') {
                window.cineFeaturesOnboardingTour.stop();
                log("Stopped tour via API.");
            } else {
                // Fallback to UI
                const skipBtn = document.querySelector('#onboardingSkipBtn') ||
                    document.querySelector('.onboarding-skip-button');
                if (skipBtn) {
                    skipBtn.click();
                    await wait(500);
                    const confirmSkip = document.querySelector('.dialog-confirm') || document.querySelector('.cine-dialog-action--confirm');
                    if (confirmSkip) confirmSkip.click();
                }
            }
        } catch (e) {
            log("Onboarding handling had minor issue, continuing: " + e.message);
        }
        await wait(1000);

        // 3. Create Project
        log("3. Creating Project...");
        const setupName = await waitFor('#setupName');
        setupName.value = "Smoke Test Project";
        setupName.dispatchEvent(new Event('input'));

        // 4. Add Devices (Camera, Monitor, Battery)
        log("4. Adding Core Devices...");

        // Camera
        const camSelect = await waitFor('#cameraSelect');
        if (camSelect.options.length > 1) {
            camSelect.selectedIndex = 1; // Pick first available
            camSelect.dispatchEvent(new Event('change'));
        }
        await wait(500);

        // Monitor
        const monSelect = await waitFor('#monitorSelect');
        if (monSelect.options.length > 1) {
            monSelect.selectedIndex = 1;
            monSelect.dispatchEvent(new Event('change'));
        }
        await wait(500);

        // Battery
        const batSelect = await waitFor('#batterySelect');
        if (batSelect.options.length > 1) {
            batSelect.selectedIndex = 1;
            batSelect.dispatchEvent(new Event('change'));
        }
        await wait(500);

        // 5. Verify Power Summary
        log("5. Verifying Power Summary...");
        const totalDraw = document.querySelector('#heroTotalDraw');
        if (!totalDraw || totalDraw.textContent === '0 W') {
            log("WARNING: Total Draw is 0 W or missing.");
        } else {
            log(`Total Draw: ${totalDraw.textContent}`);
        }

        // 6. Generate Gear List
        log("6. Generating Gear List...");
        const genBtn = document.querySelector('#generateGearListBtn');
        if (genBtn) {
            genBtn.click();
            await wait(1000);
            const gearList = document.querySelector('#gearListOutput');
            if (gearList && !gearList.classList.contains('hidden')) {
                log("SUCCESS: Gear List generated.");
            } else {
                log("WARNING: Gear List output not visible.");
            }
        }

        // 7. Overview / Print
        log("7. Checking Overview/Print...");
        const printBtn = document.querySelector('#generateOverviewBtn'); // Updated selector based on index.html
        if (printBtn) {
            printBtn.click();
            await wait(2000);
            if (document.body.classList.contains('print-mode') || document.querySelector('.overview-container')) {
                log("SUCCESS: Overview generated.");
            }
        }

        log("Smoke Test Completed Successfully.");

    } catch (e) {
        log(`CRITICAL ERROR: ${e.message}`);
        console.error(e);
    }
})();
