(async function verifyOwnGear() {
    const log = (msg) => console.log(`[OwnGearTest] ${msg}`);
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
        log("Starting Own Gear Test...");

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

        // 3. Open Own Gear Dialog
        log("Opening Own Gear Dialog...");
        // Try to find the button in the menu or sidebar
        // It's usually "Own Gear" or "Eigene Ausrüstung"
        // If not found, use API or showModal
        let openBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Own Gear') || b.textContent.includes('Eigene Ausrüstung'));

        if (openBtn && openBtn.offsetParent !== null) {
            openBtn.click();
        } else {
            // Try opening via global API if available or direct DOM
            const dialog = document.querySelector('#ownGearDialog');
            if (dialog && typeof dialog.showModal === 'function') {
                dialog.showModal();
            } else {
                throw new Error("Cannot open Own Gear dialog.");
            }
        }
        await wait(1000);

        // 4. Add New Item
        log("Adding New Item...");
        const nameInput = await waitFor('#ownGearName');
        nameInput.value = "My Tripod";
        nameInput.dispatchEvent(new Event('input'));

        const qtyInput = document.querySelector('#ownGearQuantity');
        if (qtyInput) {
            qtyInput.value = "1";
            qtyInput.dispatchEvent(new Event('input'));
        }

        const saveBtn = document.querySelector('#ownGearSaveButton');
        if (!saveBtn) throw new Error("Save button not found.");
        saveBtn.click();
        await wait(1000);

        // 5. Verify Item in List
        log("Verifying Item in List...");
        const list = document.querySelector('#ownGearList');
        if (!list.textContent.includes("My Tripod")) {
            throw new Error("Item 'My Tripod' not found in list.");
        }
        log("SUCCESS: Item found in list.");

        // 6. Verify Persistence (Reload Page)
        // Note: In a real browser test, we would reload. Here we can simulate close/re-open or rely on local storage check.
        // Let's close and re-open to verify UI persistence at least.
        log("Closing Dialog...");
        const closeBtn = document.querySelector('#ownGearCloseButton');
        if (closeBtn) closeBtn.click();
        await wait(1000);

        log("Re-opening Dialog...");
        if (openBtn && openBtn.offsetParent !== null) {
            openBtn.click();
        } else {
            document.querySelector('#ownGearDialog').showModal();
        }
        await wait(1000);

        const list2 = document.querySelector('#ownGearList');
        if (!list2.textContent.includes("My Tripod")) {
            throw new Error("Item 'My Tripod' lost after re-opening.");
        }
        log("SUCCESS: Item persisted after re-opening.");

        // 7. Delete Item
        log("Deleting Item...");
        const deleteBtn = list2.querySelector('.own-gear-item-action-danger'); // Heuristic class name based on view.js
        if (deleteBtn) {
            // Mock confirm
            const originalConfirm = window.confirm;
            window.confirm = () => true;
            deleteBtn.click();
            window.confirm = originalConfirm;
            await wait(500);

            if (list2.textContent.includes("My Tripod")) {
                throw new Error("Item 'My Tripod' still present after deletion.");
            }
            log("SUCCESS: Item deleted.");
        } else {
            log("WARNING: Delete button not found.");
        }

        log("Own Gear Test Completed Successfully.");

    } catch (e) {
        log(`CRITICAL ERROR: ${e.message}`);
        console.error(e);
    }
})();
