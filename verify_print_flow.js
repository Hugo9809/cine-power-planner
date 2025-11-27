(async function verifyPrintFlow() {
    const log = (msg) => console.log(`[PrintFlowTest] ${msg}`);
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
        log("Starting Print Flow Verification...");

        // 1. Open Overview
        log("Clicking Generate Overview...");
        const overviewBtn = await waitFor('#generateOverviewBtn');
        overviewBtn.click();

        // 2. Wait for Overview Dialog
        log("Waiting for Overview Dialog...");
        const overviewDialog = await waitFor('#overviewDialog[open]');
        log("Overview Dialog is open.");
        await wait(1000); // Wait for animations/render

        // 3. Click Print/Export Button in Overview
        log("Clicking Open Print Options Button...");
        const openOptionsBtn = await waitFor('#openPrintOptionsBtn');
        openOptionsBtn.click();

        // 4. Wait for Print Options Dialog
        log("Waiting for Print Options Dialog...");
        const optionsDialog = await waitFor('#printOptionsDialog[open]');
        log("Print Options Dialog is open.");
        await wait(1000);

        // 5. Click Print Button in Options Dialog
        log("Clicking Print Button...");
        const printBtn = await waitFor('#printOptionsPrintBtn');

        // We override window.print to avoid blocking the browser and verify the call
        let printCalled = false;
        const originalPrint = window.print;
        window.print = () => {
            printCalled = true;
            log("SUCCESS: window.print() was called!");
        };

        printBtn.click();
        await wait(2000);

        if (printCalled) {
            log("Verification Successful: Print triggered correctly.");
        } else {
            log("ERROR: window.print() was NOT called after clicking Print button.");
        }

        // Restore print (optional, but good practice)
        window.print = originalPrint;

    } catch (e) {
        log(`CRITICAL ERROR: ${e.message}`);
        console.error(e);
    }
})();
