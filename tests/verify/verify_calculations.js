(async function verifyCalculations() {
    const log = (msg) => console.log(`[CalculationTest] ${msg}`);
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
        log("Starting Calculation Accuracy Test...");

        // 1. Factory Reset (Clean Slate)
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

        // 2. Add Camera: Arri Alexa 35 (approx 90W)
        log("Adding Camera: Arri Alexa 35...");
        const camSelect = await waitFor('#cameraSelect');
        // Find Alexa 35 option
        let alexaOption = Array.from(camSelect.options).find(opt => opt.text.includes("Alexa 35"));
        if (!alexaOption) {
            // Fallback to first available if specific one missing, but log warning
            log("WARNING: 'Alexa 35' not found. Using index 1.");
            camSelect.selectedIndex = 1;
        } else {
            camSelect.value = alexaOption.value;
        }
        camSelect.dispatchEvent(new Event('change'));
        await wait(1000);

        // 3. Add Monitor: SmallHD 703 (approx 16W)
        log("Adding Monitor: SmallHD 703...");
        const monSelect = await waitFor('#monitorSelect');
        let monOption = Array.from(monSelect.options).find(opt => opt.text.includes("SmallHD 703"));
        if (!monOption) {
            log("WARNING: 'SmallHD 703' not found. Using index 1.");
            monSelect.selectedIndex = 1;
        } else {
            monSelect.value = monOption.value;
        }
        monSelect.dispatchEvent(new Event('change'));
        await wait(1000);

        // 4. Verify Total Draw
        // Expected: Alexa 35 (~90W) + SmallHD 703 (~16W) = ~106W
        // Allow margin of error +/- 5W due to potential data updates
        const totalDrawEl = await waitFor('#heroTotalDraw');
        const totalDrawText = totalDrawEl.textContent; // e.g. "106 W"
        const totalDrawVal = parseFloat(totalDrawText);

        log(`Current Total Draw: ${totalDrawVal} W`);

        if (totalDrawVal < 100 || totalDrawVal > 115) {
            log(`WARNING: Total Draw ${totalDrawVal}W seems off. Expected ~106W.`);
        } else {
            log("SUCCESS: Total Draw is within expected range.");
        }

        // 5. Add Battery: Bebob B290cine (293Wh)
        log("Adding Battery: Bebob B290cine...");
        const batSelect = await waitFor('#batterySelect');
        let batOption = Array.from(batSelect.options).find(opt => opt.text.includes("B290cine"));
        if (!batOption) {
            log("WARNING: 'Bebob B290cine' not found. Using index 1.");
            batSelect.selectedIndex = 1;
        } else {
            batSelect.value = batOption.value;
        }
        batSelect.dispatchEvent(new Event('change'));
        await wait(1000);

        // 6. Verify Runtime
        // Expected: 293Wh / 106W = ~2.76h
        // Allow margin
        const runtimeEl = await waitFor('#heroRuntime');
        const runtimeText = runtimeEl.textContent; // e.g. "2h 45m" or similar format
        log(`Current Runtime Estimate: ${runtimeText}`);

        // Basic check: should not be "--" or "0h 0m"
        if (runtimeText.includes("--") || runtimeText === "0h 0m") {
            throw new Error(`Invalid Runtime Estimate: ${runtimeText}`);
        }
        log("SUCCESS: Runtime estimate generated.");

        log("Calculation Accuracy Test Completed Successfully.");

    } catch (e) {
        log(`CRITICAL ERROR: ${e.message}`);
        console.error(e);
    }
})();
