/**
 * Cine Power Planner Connector Helpers
 *
 * Pure ESM module for generating connector summaries.
 * Provides a fallback generator when primary bindings are unavailable.
 *
 * @module helpers/connectors
 * @see {@link ../runtime-environment.js} for the aggregate API
 * @see {@link ../../docs/dev/architecture/runtime-environment.md} for architecture docs
 *
 * Extracted from app-core-environment.js during Vite migration (Step 24).
 */

/**
 * Creates a fallback function for generating connector summaries.
 * Used when the primary generator is unavailable.
 * @returns {function(object): string} The connector summary generator.
 */
export function createFallbackSafeGenerateConnectorSummary() {
    return function safeGenerateConnectorSummary(device) {
        if (!device || typeof device !== 'object') {
            return '';
        }

        // Try global function if available (legacy binding)
        if (typeof globalThis.generateConnectorSummary === 'function') {
            try {
                return globalThis.generateConnectorSummary(device);
            } catch (generatorError) {
                if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                    console.warn('generateConnectorSummary failed, using fallback', generatorError);
                }
            }
        }

        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn(
                'Using fallback connector summary generator. Core bindings may have failed to initialise.',
            );
        }

        try {
            const keys = Object.keys(device);
            if (!keys.length) {
                return '';
            }

            const primaryKey = keys[0];
            const value = device[primaryKey];
            const label = typeof primaryKey === 'string' ? primaryKey.replace(/_/g, ' ') : 'connector';
            return value ? `${label}: ${value}` : label;
        } catch (fallbackError) {
            void fallbackError;
            return '';
        }
    };
}
