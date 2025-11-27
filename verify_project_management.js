(async function verifyProjectManagement() {
    const log = (msg) => console.log(`[ProjectManagementTest] ${msg}`);
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const waitFor = async (selector, timeout = 5000) => {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            const el = document.querySelector(selector);
            if (el) return el;
            await wait(100);
        }
        throw new Error(`Timeout waiting for ${selector}`);
    };

    try {
        log("Starting Project Management Test...");

        // 1. Factory Reset to start clean
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

        // 2. Create New Project
        log("Creating 'Test Project A'...");
        const setupName = await waitFor('#setupName');
        setupName.value = "Test Project A";
        setupName.dispatchEvent(new Event('input'));

        // Add a camera to make it distinct
        log("Adding Camera...");
        const camSelect = await waitFor('#cameraSelect');
        // Select second option (usually first real camera)
        if (camSelect.options.length > 1) {
            camSelect.selectedIndex = 1;
            camSelect.dispatchEvent(new Event('change'));
        }

        // 3. Save Project
        log("Saving Project...");
        const saveBtn = await waitFor('#saveSetupBtn');
        saveBtn.click();
        await wait(1000);

        // 4. Reload Page
        log("Reloading Page...");
        location.reload();
        await wait(3000); // Wait for reload

        // 5. Verify Persistence & Load
        log("Verifying Persistence...");
        const setupSelect = await waitFor('#setupSelect');
        let found = false;
        for (let i = 0; i < setupSelect.options.length; i++) {
            if (setupSelect.options[i].text.includes("Test Project A")) {
                setupSelect.selectedIndex = i;
                setupSelect.dispatchEvent(new Event('change'));
                found = true;
                break;
            }
        }

        if (!found) {
            throw new Error("Project 'Test Project A' not found in dropdown after reload.");
        }
        log("Project found and loaded.");
        await wait(1000);

        // Verify Camera is still selected
        const camSelectAfter = await waitFor('#cameraSelect');
        if (camSelectAfter.selectedIndex === 0) {
            throw new Error("Camera selection was not persisted.");
        }
        log("Camera selection persisted.");

        // 6. Delete Project
        log("Deleting Project...");
        const deleteBtn = await waitFor('#deleteSetupBtn');
        deleteBtn.click();
        await wait(500);

        // Confirm delete
        const confirmDelete = document.querySelector('.dialog-confirm') || document.querySelector('.cine-dialog-action--confirm');
        if (confirmDelete) {
            confirmDelete.click();
        } else if (window.confirm) {
            window.confirm = () => true; // Mock confirm if needed, though usually custom dialog
        }
        await wait(1000);

        // 7. Verify Deletion
        log("Verifying Deletion...");
        const setupSelectFinal = await waitFor('#setupSelect');
        for (let i = 0; i < setupSelectFinal.options.length; i++) {
            if (setupSelectFinal.options[i].text.includes("Test Project A")) {
                throw new Error("Project 'Test Project A' still exists after deletion.");
            }
        }
        log("Project successfully deleted.");

        log("Project Management Test Completed Successfully.");

    } catch (e) {
        log(`CRITICAL ERROR: ${e.message}`);
        console.error(e);
    }
})();
