(async function verifyDeviceManager() {
    const log = (msg) => console.log(`[DeviceManagerTest] ${msg}`);
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
        log("Starting Device Manager Test...");

        // 1. Factory Reset (Reuse from verify_data_retention.js)
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

        // 3. Open Device Manager
        log("Opening Device Manager...");
        const toggleDevMgr = await waitFor('#toggleDeviceManager');
        toggleDevMgr.click();
        await wait(1000);

        // 4. Add Custom Device
        log("Adding Custom Device...");
        const categorySelect = await waitFor('#newCategory');
        categorySelect.value = 'monitor';
        categorySelect.dispatchEvent(new Event('change'));
        await wait(200);

        const nameInput = await waitFor('#newName');
        nameInput.value = 'Test Custom Monitor 2000';
        nameInput.dispatchEvent(new Event('input'));

        const wattInput = await waitFor('#newWatt');
        wattInput.value = '25.5';
        wattInput.dispatchEvent(new Event('input'));

        // Monitor specific fields (might be in dynamic section or specific IDs)
        // Based on index.html:
        const voltInput = document.querySelector('#monitorVoltage');
        if (voltInput) {
            voltInput.value = '10-34V';
            voltInput.dispatchEvent(new Event('input'));
        }
        const portSelect = document.querySelector('#monitorPortType');
        if (portSelect) {
            portSelect.value = '2pinLemo'; // Assuming value, might need adjustment
            portSelect.dispatchEvent(new Event('change'));
        }

        const addBtn = await waitFor('#addDeviceBtn');
        addBtn.click();
        await wait(1000);

        // 5. Verify Creation
        log("Verifying Device Creation...");
        // Search in the list
        const searchInput = await waitFor('#deviceLibrarySearch');
        searchInput.value = 'Test Custom Monitor 2000';
        searchInput.dispatchEvent(new Event('input'));
        await wait(500);

        const deviceList = document.querySelector('#deviceListContainer');
        if (deviceList && deviceList.textContent.includes('Test Custom Monitor 2000')) {
            log("SUCCESS: Custom device found in library.");
        } else {
            throw new Error("Custom device NOT found in library after addition.");
        }

        // 6. Use Device in Project
        log("Using Custom Device in Project...");
        // Close Device Manager
        toggleDevMgr.click();
        await wait(1000);

        // Select in Monitor dropdown
        const monitorSelect = await waitFor('#monitorSelect');
        // We might need to refresh the options or wait for them to populate?
        // The app usually updates dropdowns reactively.

        // Find the option
        const options = Array.from(monitorSelect.options);
        const customOption = options.find(o => o.text.includes('Test Custom Monitor 2000'));

        if (customOption) {
            monitorSelect.value = customOption.value;
            monitorSelect.dispatchEvent(new Event('change'));
            log("Selected custom monitor.");
        } else {
            throw new Error("Custom device option NOT found in Monitor dropdown.");
        }
        await wait(1000);

        // 7. Verify Calculation
        log("Verifying Power Calculation...");
        const totalDrawEl = await waitFor('#heroTotalDraw');
        const totalDrawText = totalDrawEl.textContent;
        const totalDrawVal = parseFloat(totalDrawText);

        log(`Total Draw: ${totalDrawVal} W`);

        // Should be at least 25.5W. Might be more if camera is selected by default?
        // After factory reset, camera might be empty or default.
        if (totalDrawVal >= 25.5) {
            log("SUCCESS: Power calculation reflects custom device.");
        } else {
            log(`WARNING: Power calculation (${totalDrawVal} W) seems low for a 25.5W device.`);
        }

        // 8. Delete Device
        log("Deleting Custom Device...");
        toggleDevMgr.click(); // Open Device Manager again
        await wait(1000);

        // Search again
        searchInput.value = 'Test Custom Monitor 2000';
        searchInput.dispatchEvent(new Event('input'));
        await wait(500);

        // Find delete button for this item
        // Structure: .device-item -> .device-actions -> .delete-btn
        // We need to find the specific item
        const items = Array.from(document.querySelectorAll('.device-item'));
        const targetItem = items.find(i => i.textContent.includes('Test Custom Monitor 2000'));

        if (targetItem) {
            const deleteBtn = targetItem.querySelector('.delete-btn') || targetItem.querySelector('button[title="Delete"]');
            if (deleteBtn) {
                deleteBtn.click();
                await wait(500);
                // Confirm deletion
                const confirmDel = document.querySelector('.dialog-confirm') || document.querySelector('.cine-dialog-action--confirm');
                if (confirmDel) confirmDel.click();
                else if (window.confirm) window.confirm = () => true;

                log("Clicked Delete and Confirmed.");
            } else {
                throw new Error("Delete button not found for custom device.");
            }
        } else {
            throw new Error("Custom device item not found for deletion.");
        }
        await wait(1000);

        // 9. Verify Deletion
        log("Verifying Deletion...");
        if (!deviceList.textContent.includes('Test Custom Monitor 2000')) {
            log("SUCCESS: Custom device removed from library.");
        } else {
            throw new Error("Custom device still present in library after deletion.");
        }

        log("Device Manager Test Completed Successfully.");

    } catch (e) {
        log(`CRITICAL ERROR: ${e.message}`);
        console.error(e);
    }
})();
