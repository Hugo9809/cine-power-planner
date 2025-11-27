const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false, // Run visible for debugging
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // 1. Load the application
        console.log('Loading application...');
        const appPath = path.resolve(__dirname, '../../index.html');
        await page.goto(`file://${appPath}`);

        // Wait for app to be ready
        await page.waitForSelector('#app', { state: 'visible', timeout: 10000 });
        console.log('App loaded.');

        // 2. Trigger Print Preview via Console
        console.log('Triggering Print Preview...');
        await page.evaluate(() => {
            // Mock some data if needed, or rely on defaults
            if (window.cineFeaturePrint) {
                window.cineFeaturePrint.triggerOverviewPrintWorkflow();
            } else {
                throw new Error('cineFeaturePrint not found');
            }
        });

        // 3. Verify Modal Visibility
        console.log('Verifying modal visibility...');
        await page.waitForSelector('#printPreviewModal', { state: 'visible', timeout: 5000 });
        const isVisible = await page.isVisible('#printPreviewModal');
        if (!isVisible) throw new Error('Print Preview modal did not open.');
        console.log('Print Preview modal is visible.');

        // 4. Verify Content Population
        console.log('Verifying content...');
        const paperContent = await page.textContent('#printPreviewPaper');
        if (!paperContent.includes('Overview')) throw new Error('Preview paper missing header.');
        if (!paperContent.includes('Project Name:')) throw new Error('Preview paper missing project info.');
        console.log('Preview content populated.');

        // 5. Test Toggles
        console.log('Testing toggles...');
        // Uncheck "Project Requirements"
        await page.uncheck('#printSectionProject');
        // Check if section is hidden
        const isProjectVisible = await page.isVisible('#preview-section-project');
        if (isProjectVisible) throw new Error('Project section should be hidden after toggle.');
        console.log('Toggle logic works (Project section hidden).');

        // 6. Close Modal
        console.log('Closing modal...');
        await page.click('#closePrintPreviewBtn');
        await page.waitForSelector('#printPreviewModal', { state: 'hidden', timeout: 2000 });
        console.log('Modal closed.');

        console.log('SUCCESS: Print Preview verification passed.');

    } catch (error) {
        console.error('FAILURE:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
})();
