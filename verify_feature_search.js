(async function verifyFeatureSearch() {
    const log = (msg) => console.log(`[FeatureSearchTest] ${msg}`);
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    try {
        log("Starting Feature Search Test...");

        // 1. Verify Global API Availability
        if (typeof window.cineFeaturesFeatureSearch === 'undefined') {
            throw new Error("cineFeaturesFeatureSearch global is not defined.");
        }
        const api = window.cineFeaturesFeatureSearch;
        log("Global API found.");

        // 2. Test normalizeSearchValue
        log("Testing normalizeSearchValue...");
        const testCases = [
            { input: "  Hello   World  ", expected: "hello world" },
            { input: "Café", expected: "cafe" },
            { input: "100ft", expected: "100 ft" },
            { input: "100'", expected: "100 ft" },
            { input: '100"', expected: "100 inch" },
            { input: "A & B", expected: "a and b" },
        ];

        for (const { input, expected } of testCases) {
            const result = api.normalizeSearchValue(input);
            if (result !== expected) {
                throw new Error(`Normalization failed for '${input}'. Expected '${expected}', got '${result}'.`);
            }
        }
        log("SUCCESS: Normalization logic verified.");

        // 3. Test sanitizeHighlightTokens
        log("Testing sanitizeHighlightTokens...");
        const tokens = ["  Hello  ", "world", "a", "1", "hello"]; // 'a' and '1' might be filtered if too short, 'hello' is dupe
        const sanitized = api.sanitizeHighlightTokens(tokens);
        // Based on code: trims, lowercases, filters < 2 chars unless digit, dedups
        // "hello", "world", "1" (digit allowed)
        if (!sanitized.includes("hello") || !sanitized.includes("world") || !sanitized.includes("1")) {
            throw new Error(`Token sanitization failed. Got: ${JSON.stringify(sanitized)}`);
        }
        if (sanitized.includes("a")) {
            throw new Error("Token sanitization failed: 'a' should be filtered.");
        }
        log("SUCCESS: Token sanitization verified.");

        // 4. Test applyHighlight
        log("Testing applyHighlight...");
        const container = document.createElement('div');
        const text = "Hello beautiful world";
        const highlightTokens = ["beautiful"];

        api.applyHighlight(container, text, highlightTokens, document);

        const marks = container.querySelectorAll('mark');
        if (marks.length !== 1) {
            throw new Error(`Expected 1 mark, got ${marks.length}. HTML: ${container.innerHTML}`);
        }
        if (marks[0].textContent !== "beautiful") {
            throw new Error(`Expected mark text 'beautiful', got '${marks[0].textContent}'.`);
        }
        if (!marks[0].classList.contains('feature-search-highlight')) {
            throw new Error("Mark missing expected class 'feature-search-highlight'.");
        }
        log("SUCCESS: Highlight application verified.");

        log("Feature Search Test Completed Successfully.");

    } catch (e) {
        log(`CRITICAL ERROR: ${e.message}`);
        console.error(e);
    }
})();
