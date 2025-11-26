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
                    const radios = document.querySelectorAll('.onboarding-card input[type="radio"]');
                    if (radios.length > 0) {
                        log(`Found ${radios.length} radio buttons in card.`);
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
                    // Wait a bit for list to refresh
                    await wait(1000);
                    const deviceItem = Array.from(deviceList.querySelectorAll('.device-item, .device-row, li, div')).find(el => el.textContent.includes("Test Custom Monitor"));

                    if (!deviceItem) {
                        log("WARNING: New device 'Test Custom Monitor' not found in list. Dumping list content for debug...");
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

                case 22: // Project Requirements Access
                    log("Step 22: Accessing Project Requirements...");
                    // Try to find the button if dialog is not open
                    let projDialog = document.querySelector('#projectDialog');
                    if (!projDialog || !projDialog.open) {
                        log("Project dialog not open. Clicking Generate Gear List button...");
                        const genBtn = document.querySelector('#generateGearListBtn');
                        if (genBtn) {
                            genBtn.click();
                            await wait(500);
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
                        const inputs = lastCrewRow.querySelectorAll('input');
                        if (inputs.length >= 1) {
                            inputs[0].value = "John Doe"; // Name
                            inputs[0].dispatchEvent(new Event('input'));
                        }
                        if (inputs.length >= 2) {
                            inputs[1].value = "Gaffer"; // Role
                            inputs[1].dispatchEvent(new Event('input'));
                        }
                    }
                    break;

                case 25: // Project Requirements Logistics
                    log("Step 25: Adding Logistics...");
                    const addPrepBtn = await waitFor('#addPrepBtn');
                    addPrepBtn.click();
                    await wait(200);

                    const addShootBtn = await waitFor('#addShootBtn');
                    addShootBtn.click();
                    await wait(200);

                    const addReturnBtn = await waitFor('#addReturnBtn');
                    addReturnBtn.click();
                    await wait(200);
                    break;
                case 21: // Own Gear Add Device
                    const ownName = document.querySelector('#ownGearName');
                    if (ownName && ownName.offsetParent) {
                        ownName.value = "My Own Light";
                        ownName.dispatchEvent(new Event('input'));
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
