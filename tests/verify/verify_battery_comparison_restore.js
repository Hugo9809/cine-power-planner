
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    try {
        // Load the app
        await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });

        // Wait for app to initialize
        await page.waitForSelector('#setupSelect');

        // Select a camera to ensure power draw
        await page.select('#cameraSelect', 'ARRI ALEXA 35'); // Assuming this exists and draws power

        // Select a battery
        await page.select('#batterySelect', 'Bebob B-Mount B290 Cine'); // Assuming this exists

        // Wait a bit for calculations
        await new Promise(r => setTimeout(r, 1000));

        // Check if Battery Comparison section is visible
        const isVisible = await page.evaluate(() => {
            const section = document.getElementById('batteryComparison');
            if (!section) return false;
            const style = window.getComputedStyle(section);
            return style.display !== 'none' && style.visibility !== 'hidden' && section.offsetParent !== null;
        });

        if (isVisible) {
            console.log('SUCCESS: Battery Comparison section is visible.');
        } else {
            console.error('FAILURE: Battery Comparison section is NOT visible.');
            // Debug info
            const debugInfo = await page.evaluate(() => {
                const section = document.getElementById('batteryComparison');
                return {
                    exists: !!section,
                    styleDisplay: section ? section.style.display : 'N/A',
                    computedDisplay: section ? window.getComputedStyle(section).display : 'N/A',
                    totalWatt: document.getElementById('heroTotalDraw') ? document.getElementById('heroTotalDraw').textContent : 'N/A'
                };
            });
            console.log('Debug Info:', debugInfo);
            process.exit(1);
        }

        // Check if table has rows
        const rowCount = await page.evaluate(() => {
            const table = document.getElementById('batteryTable');
            return table ? table.rows.length : 0;
        });

        if (rowCount > 0) {
            console.log(`SUCCESS: Battery Table has ${rowCount} rows.`);
        } else {
            console.error('FAILURE: Battery Table is empty.');
            process.exit(1);
        }

    } catch (error) {
        console.error('Error during verification:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
})();
