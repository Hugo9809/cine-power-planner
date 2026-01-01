(async function verifyAutoGear() {
    const log = (msg) => console.log(`[AutoGearTest] ${msg}`);
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
        log("Starting Auto Gear Rules Verification...");

        // 1. Open Settings
        log("Opening Settings...");
        const settingsBtn = document.querySelector('#settingsButton');
        if (settingsBtn) {
            settingsBtn.click();
        } else {
            throw new Error("Settings button not found");
        }
        await waitFor('#settingsDialog');

        // 2. Navigate to Auto Gear Tab
        log("Navigating to Auto Gear Tab...");
        const autoGearTab = await waitFor('#settingsTab-autoGear');
        autoGearTab.click();
        await wait(500);

        // 3. Create a New Rule
        log("Creating a new Auto Gear Rule...");
        const addRuleBtn = await waitFor('#autoGearAddRule');
        addRuleBtn.click();
        await wait(500);

        const ruleNameInput = await waitFor('#autoGearRuleName');
        ruleNameInput.value = "Test Rule " + Date.now();
        ruleNameInput.dispatchEvent(new Event('input'));

        // Add an item to the rule
        const addItemName = await waitFor('#autoGearAddName');
        addItemName.value = "Test Monitor";
        addItemName.dispatchEvent(new Event('input'));

        const addItemCategory = await waitFor('#autoGearAddCategory');
        addItemCategory.value = "Monitoring"; // Ensure this matches a valid value
        addItemCategory.dispatchEvent(new Event('change'));

        const addItemQty = await waitFor('#autoGearAddQuantity');
        addItemQty.value = "1";
        addItemQty.dispatchEvent(new Event('input'));

        const addItemBtn = await waitFor('#autoGearAddItemButton');
        addItemBtn.click();
        await wait(500);

        // Save the rule
        const saveRuleBtn = await waitFor('#autoGearSaveRule');
        saveRuleBtn.click();
        await wait(1000);

        // 4. Verify Rule Creation
        log("Verifying Rule Creation...");
        const rulesList = await waitFor('#autoGearRulesList');
        if (rulesList.textContent.includes("Test Rule")) {
            log("SUCCESS: New rule found in list.");
        } else {
            throw new Error("New rule not found in list.");
        }

        // 5. Edit the Rule
        log("Editing the Rule...");
        const firstRule = rulesList.querySelector('.auto-gear-rule-item, li, div[role="listitem"]');
        if (firstRule) {
            const editBtn = firstRule.querySelector('.edit-btn, button[aria-label="Edit"], .icon-edit, .btn-edit') || firstRule.querySelector('button');
            if (editBtn) {
                editBtn.click();
                await wait(500);

                const ruleNameInputEdit = await waitFor('#autoGearRuleName');
                ruleNameInputEdit.value = "Edited Test Rule";
                ruleNameInputEdit.dispatchEvent(new Event('input'));

                const saveRuleBtnEdit = await waitFor('#autoGearSaveRule');
                saveRuleBtnEdit.click();
                await wait(1000);

                // Verify Edit
                if (rulesList.textContent.includes("Edited Test Rule")) {
                    log("SUCCESS: Rule edited successfully.");
                } else {
                    throw new Error("Edited rule name not found.");
                }
            } else {
                throw new Error("Edit button not found for rule.");
            }
        } else {
            throw new Error("No rules found to edit.");
        }

        log("Auto Gear Rules Verification Completed Successfully!");

    } catch (e) {
        log(`CRITICAL ERROR: ${e.message}`);
    }
})();
