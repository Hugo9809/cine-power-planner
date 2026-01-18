---
name: playwright-browser-testing
description: Browser automation with Playwright for E2E testing. Test pages, take screenshots, check responsive design, validate UX. Use when user wants to test the app in a browser, automate interactions, or perform visual regression testing.
---

# Playwright Browser Automation

General-purpose browser automation for E2E testing. Write custom Playwright scripts for any automation task.

## When to Use

- Testing UI components in the browser
- Visual regression testing (screenshots)
- Responsive design testing (multiple viewports)
- Form/interaction testing
- Validating UX flows

## Prerequisites

Playwright must be installed in the project:

```bash
npm install -D playwright
npx playwright install chromium
```

## Workflow

### Step 1: Write Test Script

Write scripts to `/tmp/playwright-test-*.js` (auto-cleaned by OS).

```javascript
// /tmp/playwright-test-page.js
const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(TARGET_URL);
  console.log('Page loaded:', await page.title());

  await page.screenshot({ path: '/tmp/screenshot.png', fullPage: true });
  console.log('📸 Screenshot saved to /tmp/screenshot.png');

  await browser.close();
})();
```

### Step 2: Execute

```bash
node /tmp/playwright-test-page.js
```

---

## Common Patterns

### Responsive Design Testing

```javascript
const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const viewports = [
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 667 },
  ];

  for (const viewport of viewports) {
    console.log(`Testing ${viewport.name}`);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(TARGET_URL);
    await page.screenshot({ path: `/tmp/${viewport.name.toLowerCase()}.png`, fullPage: true });
  }

  console.log('✅ All viewports tested');
  await browser.close();
})();
```

### Form Submission Test

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();

  await page.goto('http://localhost:3000');

  // Fill form
  await page.fill('input[name="projectName"]', 'Test Project');
  await page.click('button[type="submit"]');

  // Wait for result
  await page.waitForSelector('.success-message');
  console.log('✅ Form submitted successfully');

  await browser.close();
})();
```

### Check for Broken Links

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('http://localhost:3000');

  const links = await page.locator('a[href^="http"]').all();
  const results = { working: 0, broken: [] };

  for (const link of links) {
    const href = await link.getAttribute('href');
    try {
      const response = await page.request.head(href);
      if (response.ok()) {
        results.working++;
      } else {
        results.broken.push({ url: href, status: response.status() });
      }
    } catch (e) {
      results.broken.push({ url: href, error: e.message });
    }
  }

  console.log(`✅ Working links: ${results.working}`);
  console.log(`❌ Broken links:`, results.broken);

  await browser.close();
})();
```

---

## Tips

- **Visible browser**: Always use `headless: false` for debugging.
- **Slow down**: Use `slowMo: 100` to make actions visible.
- **Wait strategies**: Use `waitForSelector`, `waitForURL`, `waitForLoadState` instead of fixed timeouts.
- **Error handling**: Always use try-catch for robust automation.
- **Screenshots**: Save to `/tmp/` for automatic cleanup.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Playwright not installed | `npm install -D playwright && npx playwright install chromium` |
| Browser doesn't open | Check `headless: false` |
| Element not found | Add wait: `await page.waitForSelector('.element', { timeout: 10000 })` |
