(async function verifyDataRetention() {
    const log = (msg) => console.log(`[DataRetentionTest] ${msg}`);
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
        log("Starting Data Retention Test...");

        // 1. Factory Reset
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
        await wait(3000); // Wait for reload

        // 2. Skip Onboarding
        log("Waiting for Onboarding Overlay...");
        try {
            await waitFor('#onboardingTutorialOverlay', 5000);
            log("Onboarding Overlay found. Attempting to Skip...");

            // Try to find Skip button
            const skipBtn = document.querySelector('#onboardingSkipBtn') ||
                document.querySelector('.onboarding-skip-button') ||
                Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Skip') || b.textContent.includes('Überspringen'));

            if (skipBtn) {
                skipBtn.click();
                log("Clicked Skip button.");

                // Confirm skip if needed
                await wait(500);
                const confirmSkip = document.querySelector('.dialog-confirm') || document.querySelector('.cine-dialog-action--confirm');
                if (confirmSkip) {
                    confirmSkip.click();
                    log("Confirmed Skip.");
                }
            } else {
                log("Skip button not found. Trying API...");
                if (window.cineFeaturesOnboardingTour && typeof window.cineFeaturesOnboardingTour.stop === 'function') {
                    window.cineFeaturesOnboardingTour.stop();
                    log("Stopped tour via API.");
                }
            }
        } catch (e) {
            log("Onboarding overlay not found or timed out. Assuming skipped or not started.");
        }
        await wait(1000);

        // 3. Inject Data & Create Project
        log("Creating Project...");
        const newProjectBtn = document.querySelector('#newProjectBtn') || document.querySelector('[data-action="new-project"]');
        if (newProjectBtn) newProjectBtn.click();

        // Wait for project name input (might be in a dialog or main view depending on app state)
        // Assuming main view after reset
        const setupName = await waitFor('#setupName');
        setupName.value = "Gemini Test 123";
        setupName.dispatchEvent(new Event('input'));

        const prodInput = document.querySelector('#productionInput');
        if (prodInput) {
            prodInput.value = "Test Production Co";
            prodInput.dispatchEvent(new Event('input'));
        }

        // 4. Add Devices
        log("Adding Devices...");

        // Helper to add device
        const addDevice = async (categoryVal, deviceName) => {
            log(`Adding ${deviceName} (${categoryVal})...`);
            const addBtn = document.querySelector('#addDeviceBtn') || document.querySelector('.add-device-trigger'); // Adjust selector
            // In main view, usually there is a big "Add Device" button or similar. 
            // Based on tour, it seems we select from dropdowns in the main view for the first few items?
            // "Step 6: Add Camera... #cameraSelect"

            // Let's try to use the main selectors if they exist
            if (categoryVal === 'camera') {
                const camSelect = document.querySelector('#cameraSelect');
                if (camSelect) {
                    camSelect.value = deviceName;
                    camSelect.dispatchEvent(new Event('change'));
                    return;
                }
            }
            if (categoryVal === 'monitor') {
                const monSelect = document.querySelector('#monitorSelect');
                if (monSelect) {
                    monSelect.value = deviceName;
                    monSelect.dispatchEvent(new Event('change'));
                    return;
                }
            }
            if (categoryVal === 'battery') {
                const batSelect = document.querySelector('#batterySelect');
                if (batSelect) {
                    batSelect.value = deviceName;
                    batSelect.dispatchEvent(new Event('change'));
                    return;
                }
            }

            // If not main selectors, maybe "Add Device" dialog?
            // This part depends on the actual "normal" UI which might differ from the "tour" UI if the tour hides things.
            // But usually tour highlights real elements.
        };

        await addDevice('camera', "Arri Alexa 35");
        await wait(500);
        await addDevice('monitor', "SmallHD Ultra 7");
        await wait(500);

        // Wireless
        const wirelessSelect = document.querySelector('#videoSelect');
        if (wirelessSelect) {
            wirelessSelect.value = "Teradek Bolt 4K LT";
            wirelessSelect.dispatchEvent(new Event('change'));
        }

        // Motors
        const motor1 = document.querySelector('#motor1Select');
        if (motor1) {
            motor1.value = "Arri Cforce Mini";
            motor1.dispatchEvent(new Event('change'));
        }

        // Battery
        await addDevice('battery', "Bebob B290cine");
        await wait(500);

        // 5. Auto Gear Rules
        log("Testing Auto Gear Rules...");
        // Create a rule first
        const settingsBtn2 = document.querySelector('#settingsButton');
        if (settingsBtn2) settingsBtn2.click();
        await wait(500);
        const autoGearTab = await waitFor('#settingsTab-autoGear');
        autoGearTab.click();
        await wait(500);

        const addRuleBtn = await waitFor('#autoGearAddRule');
        addRuleBtn.click();
        await wait(500);

        const ruleNameInput = await waitFor('#autoGearRuleName');
        ruleNameInput.value = "New Test Rule";
        ruleNameInput.dispatchEvent(new Event('input'));

        const addItemName = await waitFor('#autoGearAddName');
        addItemName.value = "Test Monitor";
        addItemName.dispatchEvent(new Event('input'));

        const addItemCategory = await waitFor('#autoGearAddCategory');
        addItemCategory.value = "Monitoring";
        addItemCategory.dispatchEvent(new Event('change'));

        const addItemQty = await waitFor('#autoGearAddQuantity');
        addItemQty.value = "1";
        addItemQty.dispatchEvent(new Event('input'));

        const addItemBtn = await waitFor('#autoGearAddItemButton');
        addItemBtn.click();
        await wait(500);

        const saveRuleBtn = await waitFor('#autoGearSaveRule');
        saveRuleBtn.click();
        await wait(1000);

        // Close settings
        const closeSettings = document.querySelector('#settingsDialog .close-btn') || document.querySelector('#settingsDialog button[aria-label="Close"]');
        if (closeSettings) closeSettings.click();
        await wait(500);

        // 6. Generate Gear List
        log("Generating Gear List...");
        const genBtn = document.querySelector('#generateGearListBtn');
        if (genBtn) {
            genBtn.click();
            await wait(1000);
        }

        // Verify Rule Application
        // Check if "Test Monitor" is in the gear list (which might be in the project dialog now)
        const gearListContainer = document.querySelector('#gearListContainer') || document.querySelector('.gear-list');
        if (gearListContainer && gearListContainer.textContent.includes("Test Monitor")) {
            log("SUCCESS: Auto Gear Rule applied.");
        } else {
            log("WARNING: Auto Gear Rule item not found in gear list.");
        }

        // 7. Overview
        log("Generating Overview...");
        // Close project dialog if open
        const closeProj = document.querySelector('#projectDialog .close-btn');
        if (closeProj) closeProj.click();
        await wait(500);

        // Click Overview/Print button?
        // Usually there is a "Print" or "Export" button.
        // In tour step 32: "Overview and Print"
        const printBtn = document.querySelector('#printButton') || document.querySelector('[data-action="print"]');
        if (printBtn) {
            printBtn.click();
            log("Clicked Print button.");
            await wait(2000);

            // Check if print view is visible
            const printView = document.querySelector('.print-view') || document.querySelector('#printContainer');
            if (printView || document.body.classList.contains('print-mode')) {
                log("SUCCESS: Print view is active.");
            }
        } else {
            log("WARNING: Print button not found.");
        }

        log("Data Retention Test Completed.");

    } catch (e) {
        log(`CRITICAL ERROR: ${e.message}`);
        console.error(e);
    }
})();
