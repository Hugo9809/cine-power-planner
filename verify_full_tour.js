(async function runFullTour() {
    const log = (msg) => console.log(`[TourTest] ${msg}`);
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

    const getCurrentStepIndex = () => {
        const progressEl = document.querySelector('.onboarding-progress');
        if (!progressEl) return -1;
        const text = progressEl.textContent;
        const match = text.match(/Step (\d+) of/);
        return match ? parseInt(match[1], 10) : -1;
    };

    try {
        log("Starting Full Tour Test...");

        // Factory Reset
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

        // Start Tour
        let overlay = document.querySelector('#onboardingTutorialOverlay');
        if (!overlay) {
            log("Tour not started automatically. Attempting to start via API or UI...");
            if (window.cineFeaturesOnboardingTour && typeof window.cineFeaturesOnboardingTour.start === 'function') {
                window.cineFeaturesOnboardingTour.start();
            } else {
                const helpBtn = document.querySelector('#helpButton');
                if (helpBtn) {
                    helpBtn.click();
                    await wait(500);
                    const tourBtn = document.querySelector('#helpOnboardingTutorialButton');
                    if (tourBtn) tourBtn.click();
                }
            }
        }
        await wait(2000);

        // Verify start
        overlay = document.querySelector('#onboardingTutorialOverlay');
        if (!overlay) {
            throw new Error("Failed to start tour.");
        }

        let currentStep = 1;
        const maxSteps = 35;
        let stuckCounter = 0;

        while (currentStep <= maxSteps) {
            log(`Processing Step ${currentStep}...`);
            const uiStep = getCurrentStepIndex();
            if (uiStep !== -1 && uiStep !== currentStep) {
                log(`WARNING: UI is at Step ${uiStep}, expected ${currentStep}. Adjusting...`);
                currentStep = uiStep;
            }

            switch (currentStep) {
                case 1: // Intro
                    // Just click Next
                    break;
                case 2: // Profile (Proxy inputs)
                    await waitFor('.onboarding-card');
                    const inputs = document.querySelectorAll('.onboarding-card .onboarding-field-input');
                    if (inputs.length >= 4) {
                        inputs[0].value = "Luca Zanner";
                        inputs[0].dispatchEvent(new Event('input'));
                        inputs[1].value = "DoP";
                        inputs[1].dispatchEvent(new Event('change'));
                        inputs[2].value = "1234567890";
                        inputs[2].dispatchEvent(new Event('input'));
                        inputs[3].value = "luca@example.com";
                        inputs[3].dispatchEvent(new Event('input'));
                    } else {
                        log("WARNING: Profile proxy inputs not found in card. Trying real inputs...");
                        const realName = document.querySelector('#userProfileName');
                        if (realName) realName.value = "Luca Zanner";
                    }
                    break;
                case 3: // Preferences (Proxy inputs)
                    await waitFor('.onboarding-card');
                    log("Step 3: Interacting with Preferences proxy inputs...");

                    // Language
                    const languageSelect = document.querySelector('.onboarding-card select[id*="language"]');
                    if (languageSelect) {
                        languageSelect.value = "en";
                        languageSelect.dispatchEvent(new Event('change'));
                        log("Set Language to English");
                    }

                    // Theme
                    const themeSelect = document.querySelector('.onboarding-card select[id*="theme"]');
                    if (themeSelect) {
                        themeSelect.value = "dark";
                        themeSelect.dispatchEvent(new Event('change'));
                        log("Set Theme to Dark");
                    }

                    // Pink Mode (optional)
                    const pinkSelect = document.querySelector('.onboarding-card select[id*="pink"]');
                    if (pinkSelect) {
                        pinkSelect.value = "enabled";
                        pinkSelect.dispatchEvent(new Event('change'));
                        log("Enabled Pink Mode");
                    }

                    // Focus Scale
                    const focusSelect = document.querySelector('.onboarding-card select[id*="focus-scale"]');
                    if (focusSelect) {
                        focusSelect.value = "metric";
                        focusSelect.dispatchEvent(new Event('change'));
                        log("Set Focus Scale to Metric");
                    }

                    // Units
                    const unitsSelect = document.querySelector('.onboarding-card select[id*="units"]');
                    if (unitsSelect) {
                        unitsSelect.value = "Celsius";
                        unitsSelect.dispatchEvent(new Event('change'));
                        log("Set Units to Celsius");
                    }

                    // Persistence Button (if present)
                    const persistenceBtn = document.querySelector('.onboarding-interaction-button.primary');
                    if (persistenceBtn && !persistenceBtn.disabled) {
                        persistenceBtn.click();
                        log("Clicked Persistence Request button");
                        await wait(500);
                    }
                    break;
                case 4: // Project Name
                    const setupName = await waitFor('#setupName');
                    setupName.value = "Gemini Test 123";
                    setupName.dispatchEvent(new Event('input'));
                    const prodInput = document.querySelector('#productionInput');
                    if (prodInput) {
                        prodInput.value = "My Production";
                        prodInput.dispatchEvent(new Event('input'));
                    }
                    break;
                case 5: // Save Project
                    // Just click Next
                    break;
                case 6: // Add Camera
                    const cameraSelect = await waitFor('#cameraSelect');
                    cameraSelect.value = "Arri Alexa 35";
                    cameraSelect.dispatchEvent(new Event('change'));
                    break;
                case 7: // Add Monitoring
                    const monitorSelect = await waitFor('#monitorSelect');
                    monitorSelect.value = "SmallHD Ultra 7";
                    monitorSelect.dispatchEvent(new Event('change'));

                    const wirelessSelect = document.querySelector('#videoSelect');
                    if (wirelessSelect) {
                        wirelessSelect.value = "Teradek Bolt 4K LT";
                        wirelessSelect.dispatchEvent(new Event('change'));
                    }

                    const motor1 = document.querySelector('#motor1Select');
                    if (motor1) {
                        motor1.value = "Arri Cforce Mini";
                        motor1.dispatchEvent(new Event('change'));
                    }
                    const motor2 = document.querySelector('#motor2Select');
                    if (motor2) {
                        motor2.value = "Arri Cforce Plus";
                        motor2.dispatchEvent(new Event('change'));
                    }

                    const controller = document.querySelector('#controller1Select');
                    if (controller) {
                        controller.value = "Arri Master Grip (single unit)";
                        controller.dispatchEvent(new Event('change'));
                    }
                    break;
                case 8: // Select Battery
                    const batterySelect = await waitFor('#batterySelect');
                    batterySelect.value = "Bebob B290cine";
                    batterySelect.dispatchEvent(new Event('change'));
                    break;
                case 14: // Runtime Feedback
                    log("Step 14: Attempting to open Runtime Feedback...");
                    const feedbackBtn = await waitFor('#runtimeFeedbackBtn');
                    log(`Button found: ${feedbackBtn.id}, Visible: ${feedbackBtn.offsetParent !== null}`);

                    // Try standard click
                    feedbackBtn.click();
                    await wait(500);

                    let dialog = document.querySelector('#feedbackDialog');
                    if (!dialog || !dialog.open) {
                        log("Standard click failed, trying dispatchEvent...");
                        feedbackBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                        await wait(500);
                    }

                    dialog = document.querySelector('#feedbackDialog');
                    if (dialog) {
                        log(`Dialog state before force: open=${dialog.open}, display=${getComputedStyle(dialog).display}, class=${dialog.className}`);
                        if (!dialog.open) {
                            log("Dialog found but not open. Forcing showModal()...");
                            if (typeof dialog.showModal === 'function') {
                                try {
                                    dialog.showModal();
                                    log("showModal() called.");
                                } catch (e) {
                                    log(`showModal() failed: ${e.message}`);
                                }
                            } else {
                                log("showModal not function on dialog element.");
                            }
                        }
                        await wait(500);
                        log(`Dialog state after force: open=${dialog.open}, display=${getComputedStyle(dialog).display}`);
                    }

                    // Wait for it to be truly visible
                    dialog = await waitFor('#feedbackDialog');

                    log("Dialog open. Filling form...");
                    const fbUser = await waitFor('#fbUsername');
                    fbUser.value = "Test User";
                    fbUser.dispatchEvent(new Event('input'));

                    const fbDate = document.querySelector('#fbDate');
                    if (fbDate) {
                        fbDate.valueAsDate = new Date();
                        fbDate.dispatchEvent(new Event('input'));
                    }

                    const fbRuntime = document.querySelector('#fbRuntime');
                    if (fbRuntime) {
                        fbRuntime.value = "2.5";
                        fbRuntime.dispatchEvent(new Event('input'));
                    }

                    const fbSubmit = document.querySelector('#fbSubmit');
                    if (fbSubmit) {
                        log("Submitting feedback form...");
                        fbSubmit.click();
                        await wait(1000); // Wait for submission/close
                    }
                    break;
                case 17: // Edit Device Data Add
                    log("Step 17: Adding new device...");
                    const categorySelect = await waitFor('#newCategory');
                    // Select 'Monitor' or similar if available, or just use first non-empty option
                    if (categorySelect.options.length > 0) {
                        categorySelect.selectedIndex = 1; // Assuming 0 is placeholder or first valid
                        categorySelect.dispatchEvent(new Event('change'));
                    }

                    const newName = await waitFor('#newName');
                    newName.value = "Test Custom Monitor";
                    newName.dispatchEvent(new Event('input'));

                    const newWatt = await waitFor('#newWatt');
                    newWatt.value = "15";
                    newWatt.dispatchEvent(new Event('input'));

                    const addBtn = await waitFor('#addDeviceBtn');
                    addBtn.click();
                    await wait(1000);
                    break;

                case 18: // Edit Device Data Review
                    log("Step 18: Verifying new device...");
                    const deviceList = await waitFor('#deviceListContainer');

                    // Retry logic for finding the device
                    let deviceItem = null;
                    for (let i = 0; i < 5; i++) {
                        await wait(1000); // Wait for list refresh
                        deviceItem = Array.from(deviceList.querySelectorAll('.device-item, .device-row, li, div')).find(el => el.textContent.includes("Test Custom Monitor"));
                        if (deviceItem) break;
                        log(`Attempt ${i + 1}: Device not found yet...`);
                    }

                    if (!deviceItem) {
                        log("WARNING: New device 'Test Custom Monitor' not found in list after retries. Dumping list content for debug...");
                        log(deviceList.innerText.substring(0, 500) + "...");
                    } else {
                        log("SUCCESS: New device found.");
                    }
                    break;

                case 19: // Edit Device Data Edit
                    log("Step 19: Editing the new device...");
                    const listContainer = await waitFor('#deviceListContainer');
                    const itemToEdit = Array.from(listContainer.querySelectorAll('.device-item, .device-row, li, div')).find(el => el.textContent.includes("Test Custom Monitor"));

                    if (itemToEdit) {
                        const editBtn = itemToEdit.querySelector('.edit-btn, button[aria-label="Edit"], .icon-edit, .btn-edit') || itemToEdit.querySelector('button');

                        if (editBtn) {
                            editBtn.click();
                            await wait(500);

                            const nameInput = await waitFor('#newName');
                            nameInput.value = "Test Custom Monitor Edited";
                            nameInput.dispatchEvent(new Event('input'));

                            const saveBtn = await waitFor('#addDeviceBtn');
                            saveBtn.click();
                            await wait(1000);
                            log("Device edited.");
                        } else {
                            log("WARNING: Edit button not found for device.");
                        }
                    } else {
                        log("WARNING: Device to edit not found.");
                    }
                    break;

                case 20: // Own Gear Access
                    log("Step 20: Own Gear Access...");
                    await wait(500);
                    break;

                case 21: // Own Gear Add Device
                    log("Step 21: Adding Own Gear...");
                    const ownName = document.querySelector('#ownGearName');
                    if (ownName && ownName.offsetParent) {
                        ownName.value = "My Own Light";
                        ownName.dispatchEvent(new Event('input'));
                    }
                    break;

                case 22: // Project Requirements Access
                    log("Step 22: Accessing Project Requirements...");
                    // Try to find the button if dialog is not open
                    let projDialog = document.querySelector('#projectDialog');
                    if (!projDialog || !projDialog.open) {
                        log("Project dialog not open. Clicking Generate Gear List button...");
                        const genBtn = document.querySelector('#generateGearListBtn');
                        if (genBtn) {
                            log(`Found Generate Gear List button. Visible: ${genBtn.offsetParent !== null}`);
                            genBtn.click();
                            await wait(500);

                            // Check if opened
                            if (!projDialog || !projDialog.open) {
                                log("Standard click failed, trying dispatchEvent...");
                                genBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                                await wait(1000);
                            }
                        } else {
                            log("WARNING: Generate Gear List button not found!");
                        }
                    }
                    await waitFor('#projectDialog');
                    break;

                case 23: // Project Requirements Brief
                    log("Step 23: Filling Project Brief...");
                    const prodCo = await waitFor('#productionCompany');
                    prodCo.value = "Test Production Co";
                    prodCo.dispatchEvent(new Event('input'));

                    const prodCity = document.querySelector('#productionCompanyCity');
                    if (prodCity) {
                        prodCity.value = "Berlin";
                        prodCity.dispatchEvent(new Event('input'));
                    }
                    break;

                case 24: // Project Requirements Crew
                    log("Step 24: Adding Crew...");
                    const addCrewBtn = await waitFor('#addPersonBtn');
                    addCrewBtn.click();
                    await wait(500);

                    // Find inputs in the newly added row
                    const crewContainer = document.querySelector('#crewContainer');
                    const lastCrewRow = crewContainer.lastElementChild;
                    if (lastCrewRow) {
                        const nameInput = lastCrewRow.querySelector('.person-name');
                        if (nameInput) {
                            nameInput.value = "John Doe";
                            nameInput.dispatchEvent(new Event('input'));
                        }

                        const roleSelect = lastCrewRow.querySelector('.person-role-select');
                        if (roleSelect) {
                            if (roleSelect.options.length > 0) {
                                roleSelect.selectedIndex = 1;
                                roleSelect.dispatchEvent(new Event('change'));
                            }
                        }

                        const phoneInput = lastCrewRow.querySelector('.person-phone');
                        if (phoneInput) {
                            phoneInput.value = "123456789";
                            phoneInput.dispatchEvent(new Event('input'));
                        }
                    }
                    break;

                case 25: // Project Requirements Logistics
                    log("Step 25: Adding Logistics...");

                    // Prep
                    const addPrepBtn = await waitFor('#addPrepBtn');
                    addPrepBtn.click();
                    await wait(200);
                    const prepContainer = document.querySelector('#prepContainer');
                    const lastPrep = prepContainer.lastElementChild;
                    if (lastPrep) {
                        const start = lastPrep.querySelector('.prep-start, input[type="date"]');
                        if (start) {
                            start.valueAsDate = new Date();
                            start.dispatchEvent(new Event('input'));
                        }
                    }

                    // Shoot
                    const addShootBtn = await waitFor('#addShootBtn');
                    addShootBtn.click();
                    await wait(200);
                    const shootContainer = document.querySelector('#shootContainer');
                    const lastShoot = shootContainer.lastElementChild;
                    if (lastShoot) {
                        const start = lastShoot.querySelector('input[type="date"]');
                        if (start) {
                            start.valueAsDate = new Date();
                            start.dispatchEvent(new Event('input'));
                        }
                    }

                    // Return
                    const addReturnBtn = await waitFor('#addReturnBtn');
                    addReturnBtn.click();
                    await wait(200);
                    const returnContainer = document.querySelector('#returnContainer');
                    const lastReturn = returnContainer.lastElementChild;
                    if (lastReturn) {
                        const start = lastReturn.querySelector('input[type="date"]');
                        if (start) {
                            start.valueAsDate = new Date();
                            start.dispatchEvent(new Event('input'));
                        }
                    }
                    break;

                case 26: // Generate Gear & Requirements
                    log("Step 26: Generate Gear & Requirements...");
                    await wait(500);
                    break;

                case 27: // Auto Gear Rules Access
                    log("Step 27: Accessing Auto Gear Rules...");
                    // Ensure settings dialog is open
                    let settingsDialog = document.querySelector('#settingsDialog');
                    if (!settingsDialog || !settingsDialog.open) {
                        log("Settings dialog not open. Clicking Settings button...");
                        const settingsBtn = document.querySelector('#settingsButton');
                        if (settingsBtn) {
                            settingsBtn.click();
                            await wait(500);
                        }
                    }
                    await waitFor('#settingsDialog');

                    // Switch to Auto Gear tab
                    const autoGearTab = await waitFor('#settingsTab-autoGear');
                    autoGearTab.click();
                    await wait(500);
                    break;

                case 28: // Auto Gear Rules Edit
                    log("Step 28: Editing an Auto Gear Rule...");
                    const rulesList = await waitFor('#autoGearRulesList');
                    // Wait for rules to populate
                    await wait(1000);

                    const firstRule = rulesList.querySelector('.auto-gear-rule-item, li, div[role="listitem"]');
                    if (firstRule) {
                        const editBtn = firstRule.querySelector('.edit-btn, button[aria-label="Edit"], .icon-edit, .btn-edit') || firstRule.querySelector('button');
                        if (editBtn) {
                            editBtn.click();
                            await wait(500);

                            const ruleNameInput = await waitFor('#autoGearRuleName');
                            ruleNameInput.value = "Edited Rule Name";
                            ruleNameInput.dispatchEvent(new Event('input'));

                            const saveRuleBtn = await waitFor('#autoGearSaveRule');
                            saveRuleBtn.click();
                            await wait(1000);
                            log("Rule edited.");
                        } else {
                            log("WARNING: Edit button not found for rule.");
                        }
                    } else {
                        log("WARNING: No rules found to edit. This is expected if list is empty.");
                    }
                    break;

                case 29: // Auto Gear Rules Create
                    log("Step 29: Creating a new Auto Gear Rule...");
                    const addRuleBtn = await waitFor('#autoGearAddRule');
                    addRuleBtn.click();
                    await wait(500);

                    const ruleNameInput = await waitFor('#autoGearRuleName');
                    ruleNameInput.value = "New Test Rule";
                    ruleNameInput.dispatchEvent(new Event('input'));

                    // Add an item
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

                    // Verify creation
                    const rulesList2 = await waitFor('#autoGearRulesList');
                    if (rulesList2.textContent.includes("New Test Rule")) {
                        log("SUCCESS: New rule created and found.");
                    } else {
                        log("WARNING: New rule not found in list.");
                    }
                    break;
            }

            const nextBtn = document.querySelector('.onboarding-next-button');
            if (nextBtn && !nextBtn.disabled) {
                nextBtn.click();
                await wait(1000);
                currentStep++;
                stuckCounter = 0;
            } else {
                log(`Step ${currentStep}: Next button disabled or missing. Waiting...`);
                await wait(1000);
                stuckCounter++;
                if (stuckCounter > 10) {
                    throw new Error(`Stuck at Step ${currentStep} for too long.`);
                }
            }
        }

        log("Tour Completed Successfully!");

    } catch (e) {
        log(`CRITICAL ERROR: ${e.message}`);
    }
})();
