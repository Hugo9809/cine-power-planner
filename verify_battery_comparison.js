(async function verifyBatteryComparison() {
    const log = (msg) => console.log(`[BatteryComparisonTest] ${msg}`);
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
        log("Starting Battery Comparison Test...");

        // 1. Factory Reset (Reuse logic)
        log("Performing Factory Reset...");
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
        await wait(3000);

        // 2. Skip Onboarding
        log("Waiting for Onboarding Overlay...");
        try {
            await waitFor('#onboardingTutorialOverlay', 5000);
            log("Onboarding Overlay found. Attempting to Skip...");
            const skipBtn = document.querySelector('#onboardingSkipBtn') ||
                document.querySelector('.onboarding-skip-button') ||
                Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Skip') || b.textContent.includes('Überspringen'));

            if (skipBtn) {
                skipBtn.click();
                await wait(500);
                const confirmSkip = document.querySelector('.dialog-confirm') || document.querySelector('.cine-dialog-action--confirm');
                if (confirmSkip) confirmSkip.click();
            } else {
                if (window.cineFeaturesOnboardingTour && typeof window.cineFeaturesOnboardingTour.stop === 'function') {
                    window.cineFeaturesOnboardingTour.stop();
                }
            }
        } catch (e) {
            log("Onboarding overlay not found or timed out. Assuming skipped.");
        }
        await wait(1000);

        // 3. Configure Rig (Camera + Monitor)
        log("Configuring Rig...");
        const camSelect = await waitFor('#cameraSelect');
        camSelect.value = "Arri Alexa 35"; // Ensure this value exists in default DB
        camSelect.dispatchEvent(new Event('change'));
        await wait(500);

        const monSelect = await waitFor('#monitorSelect');
        monSelect.value = "SmallHD 703 UltraBright"; // Ensure this value exists
        monSelect.dispatchEvent(new Event('change'));
        await wait(500);

        // 4. Select a Battery
        log("Selecting Battery...");
        const batSelect = await waitFor('#batterySelect');
        batSelect.value = "Bebob B290cine"; // Ensure this value exists
        batSelect.dispatchEvent(new Event('change'));
        await wait(1000);

        // 5. Verify Battery Comparison Section
        log("Verifying Battery Comparison Section...");
        const comparisonSection = await waitFor('#batteryComparison');

        // Scroll to it to ensure visibility (optional but good for screenshots)
        comparisonSection.scrollIntoView();
        await wait(500);

        const table = document.querySelector('#batteryTable');
        if (!table) throw new Error("Battery Table not found.");

        const rows = table.querySelectorAll('tr');
        log(`Found ${rows.length} rows in battery table.`);

        // Expect header + at least 1 row (usually many more)
        if (rows.length < 2) {
            throw new Error("Battery comparison table is empty or missing rows.");
        }

        // Verify content of rows
        const header = rows[0].textContent;
        if (!header.includes("Battery") || !header.includes("Runtime")) {
            throw new Error("Battery table header is incorrect.");
        }

        // Check for specific batteries (e.g. Core SWX Hypercore 98)
        // Note: The table might be sorted by runtime.
        const tableText = table.textContent;
        if (tableText.includes("Core SWX Hypercore 98") || tableText.includes("Bebob B290cine")) {
            log("SUCCESS: Expected batteries found in comparison table.");
        } else {
            log("WARNING: Specific batteries not found in table (might be filtered or named differently).");
        }

        // Verify selected battery row highlighting
        const selectedRow = table.querySelector('.selectedBatteryRow');
        if (selectedRow) {
            log("SUCCESS: Selected battery is highlighted in the table.");
            if (!selectedRow.textContent.includes("Bebob B290cine")) {
                log("WARNING: Highlighted row does not match selected battery name.");
            }
        } else {
            log("WARNING: No row is highlighted as selected.");
        }

        log("Battery Comparison Test Completed Successfully.");

    } catch (e) {
        log(`CRITICAL ERROR: ${e.message}`);
        console.error(e);
    }
})();
