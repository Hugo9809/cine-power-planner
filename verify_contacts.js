(async function verifyContacts() {
    const log = (msg) => console.log(`[ContactsTest] ${msg}`);
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
        log("Starting Contacts Test...");

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
        } catch {
            log("Onboarding overlay not found or timed out. Assuming skipped.");
        }
        await wait(1000);

        // 3. Open Contacts Dialog
        log("Opening Contacts Dialog...");
        // Need to find the button. It might be in the sidebar or menu.
        // Based on index.html, there is no direct button in the main view unless it's in a menu.
        // But `app-core-new-1.js` binds `openContactsBtn`.
        // Let's try to find it. If not, we can trigger it via console or finding the element.
        // Usually it's in the sidebar or "More" menu.
        // Let's assume there is an ID `openContactsBtn` somewhere visible or we can click it if hidden?
        // Or we can use the "Edit Device Data" -> "Contacts" (unlikely).
        // Actually, looking at `index.html`, there is no `openContactsBtn` in the main markup I saw.
        // It might be injected or I missed it.
        // However, I can try to open it via the global API if the button isn't found.

        let openBtn = document.querySelector('#openContactsBtn');
        if (!openBtn) {
            // Try to find it in the sidebar if it exists
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                openBtn = Array.from(sidebar.querySelectorAll('button')).find(b => b.textContent.includes('Contacts'));
            }
        }

        if (openBtn) {
            openBtn.click();
        } else {
            log("Contacts button not found. Attempting to open via API...");
            // Try to find the dialog and open it manually if possible, or use a known global
            const dialog = document.querySelector('#contactsDialog');
            if (dialog && typeof dialog.showModal === 'function') {
                dialog.showModal();
            } else {
                throw new Error("Cannot open Contacts dialog.");
            }
        }
        await wait(1000);

        // 4. Add Contact
        log("Adding Contact...");
        const addBtn = await waitFor('#contactsAddButton');
        addBtn.click();
        await wait(500);

        // 5. Fill Contact Details
        log("Filling Contact Details...");
        const list = document.querySelector('#contactsList');
        const cards = list.querySelectorAll('.contact-card');
        if (cards.length === 0) throw new Error("No contact card created.");

        const card = cards[cards.length - 1]; // The new one should be last or we find the one with empty name

        const nameInput = card.querySelector('input[type="text"]'); // Or input[id$="-name"]
        if (!nameInput) throw new Error("Name input not found in contact card.");

        nameInput.value = "Jane Doe";
        nameInput.dispatchEvent(new Event('input'));
        await wait(200);

        const roleSelect = card.querySelector('select'); // Or select[id$="-role"]
        if (roleSelect) {
            roleSelect.value = "Gaffer"; // Ensure this role exists
            roleSelect.dispatchEvent(new Event('change'));
        }

        const emailInput = card.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.value = "jane@example.com";
            emailInput.dispatchEvent(new Event('input'));
        }

        // Trigger blur to ensure save (though input event should trigger it too)
        nameInput.blur();
        await wait(1000);

        // 6. Verify Persistence (Close and Re-open)
        log("Verifying Persistence...");
        const closeBtn = document.querySelector('#contactsCloseButton');
        if (closeBtn) closeBtn.click();
        await wait(1000);

        // Re-open
        if (openBtn) openBtn.click();
        else document.querySelector('#contactsDialog').showModal();
        await wait(1000);

        // Check list again
        const list2 = document.querySelector('#contactsList');
        if (list2.textContent.includes("Jane Doe")) {
            log("SUCCESS: Contact 'Jane Doe' found after re-opening.");
        } else {
            throw new Error("Contact 'Jane Doe' NOT found after re-opening.");
        }

        log("Contacts Test Completed Successfully.");

    } catch (e) {
        log(`CRITICAL ERROR: ${e.message}`);
        console.error(e);
    }
})();
