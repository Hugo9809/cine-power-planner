(async function runFullTour() {
    const log = (msg) => console.log(`[TourTest] ${msg}`);
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const waitFor = async (selector, timeout = 5000) => {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            const el = document.querySelector(selector);
            if (el && el.offsetParent !== null) return el;
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
        await wait(2000);

        // Start Tour
        let overlay = document.querySelector('#onboardingTutorialOverlay');
        if (!overlay) {
            log("Tour not started automatically. Attempting to start manually...");
            const helpBtn = document.querySelector('#helpButton');
            if (helpBtn) helpBtn.click();
        }
        await wait(1000);

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
                case 1: // Profile
                    await waitFor('#userProfileName');
                    document.querySelector('#userProfileName').value = "Luca Zanner";
                    document.querySelector('#userProfileName').dispatchEvent(new Event('input'));
                    document.querySelector('#userProfileRole').value = "DoP";
                    document.querySelector('#userProfileRole').dispatchEvent(new Event('change'));
                    document.querySelector('#userProfilePhone').value = "1234567890";
                    document.querySelector('#userProfilePhone').dispatchEvent(new Event('input'));
                    document.querySelector('#userProfileEmail').value = "luca@example.com";
                    document.querySelector('#userProfileEmail').dispatchEvent(new Event('input'));
                    break;
                case 2: // Preferences
                    await waitFor('#pinkModeToggle');
                    const pinkMode = document.querySelector('#pinkModeToggle').getAttribute('aria-pressed');
                    log(`Pink Mode state: ${pinkMode}`);
                    const tempSelect = document.querySelector('#settingsTemperatureUnit');
                    if (tempSelect) {
                        tempSelect.value = 'celsius';
                        tempSelect.dispatchEvent(new Event('change'));
                    }
                    break;
                case 3: // Project Name
                    await waitFor('#setupName');
                    document.querySelector('#setupName').value = "Gemini Test 123";
                    document.querySelector('#setupName').dispatchEvent(new Event('input'));
                    document.querySelector('#productionInput').value = "My Production";
                    document.querySelector('#productionInput').dispatchEvent(new Event('input'));
                    break;
                case 5: // Add Camera
                    await waitFor('#cameraSelect');
                    document.querySelector('#cameraSelect').value = "Arri Alexa 35";
                    document.querySelector('#cameraSelect').dispatchEvent(new Event('change'));
                    break;
                case 6: // Add Monitoring
                    await waitFor('#monitorSelect');
                    document.querySelector('#monitorSelect').value = "SmallHD Ultra 7";
                    document.querySelector('#monitorSelect').dispatchEvent(new Event('change'));

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
                case 7: // Select Battery
                    await waitFor('#batterySelect');
                    document.querySelector('#batterySelect').value = "Bebob B290cine";
                    document.querySelector('#batterySelect').dispatchEvent(new Event('change'));
                    break;
                case 17: // Edit Device Data Add
                    const newName = document.querySelector('#newName');
                    if (newName && newName.offsetParent) {
                        newName.value = "Test Device";
                        newName.dispatchEvent(new Event('input'));
                    }
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
