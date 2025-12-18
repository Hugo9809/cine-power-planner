const engineModule = require('../../src/scripts/modules/features/feature-search-engine.js');

describe('feature search engine prioritization', () => {
    let engine;

    beforeEach(() => {
        engine = engineModule.createEngine();
    });

    test('prioritizes forward prefix over reverse prefix matches', () => {
        // Forward prefix: user types start of token.
        // Entry: "saves"
        // Query: "save"
        // "saves".startsWith("save") -> true. Score 2.
        const entryTokens = ['saves'];
        const queryForward = ['save'];

        // Reverse prefix: user types more than token.
        // Entry: "save"
        // Query: "saver"
        // "saver".startsWith("save") -> true. Score 1.5.
        const entryTokens2 = ['save'];
        const queryReverse = ['saver'];

        const scoreForward = engine.computeTokenMatchDetails(entryTokens, queryForward);
        const scoreReverse = engine.computeTokenMatchDetails(entryTokens2, queryReverse);

        expect(scoreForward.score).toBeGreaterThan(scoreReverse.score);
        // Explicit verification of scores
        // best = 2 for forward
        // best = 1.5 for reverse
        expect(scoreForward.score).toBe(2);
        expect(scoreReverse.score).toBe(1.5);
    });

    test('prioritizes exact match over prefix match', () => {
        const entryTokens = ['save'];
        const queryExact = ['save']; // Score 3
        const queryPrefix = ['sa']; // Score 2

        const scoreExact = engine.computeTokenMatchDetails(entryTokens, queryExact);
        const scorePrefix = engine.computeTokenMatchDetails(entryTokens, queryPrefix);

        expect(scoreExact.score).toBeGreaterThan(scorePrefix.score);
        expect(scoreExact.score).toBe(3);
        expect(scorePrefix.score).toBe(2);
    });
});
