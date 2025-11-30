(async function verifyFeatureSearch() {
    const log = (msg) => console.log(`[FeatureSearchTest] ${msg}`);


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

        log("Feature Search Test Completed Successfully.");

    } catch (e) {
        log(`CRITICAL ERROR: ${e.message}`);
        console.error(e);
    }
})();
