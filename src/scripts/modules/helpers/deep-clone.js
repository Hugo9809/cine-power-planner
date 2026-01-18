/**
 * Deep Clone Utilities
 * 
 * Provides resilient deep cloning mechanisms, prioritizing `structuredClone`
 * but falling back to JSON serialization when necessary.
 * 
 * Extracted from app-core-runtime-global-tools.js during Batch 11 migration.
 */

import { detectGlobalScope, safeAssign } from './scope-utils.js';

export function jsonDeepClone(value) {
    if (value === null || typeof value !== 'object') {
        return value;
    }

    try {
        return JSON.parse(JSON.stringify(value));
    } catch (e) {
        // Fallback or ignore
    }

    return value;
}

export function resolveStructuredClone(scope) {
    if (typeof structuredClone === 'function') {
        return structuredClone;
    }

    const target = scope || detectGlobalScope();
    if (target && typeof target.structuredClone === 'function') {
        return target.structuredClone.bind(target);
    }

    return null;
}

export function createResilientDeepClone(scope) {
    const cloneFn = resolveStructuredClone(scope);

    if (!cloneFn) {
        return jsonDeepClone;
    }

    return function resilientDeepClone(value) {
        if (value === null || typeof value !== 'object') {
            return value;
        }

        try {
            return cloneFn(value);
        } catch (e) {
            // Fallback
        }

        return jsonDeepClone(value);
    };
}

export function ensureDeepClone(scope) {
    const target = scope || detectGlobalScope();

    if (target && typeof target.__cineDeepClone === 'function') {
        return target.__cineDeepClone;
    }

    const clone = createResilientDeepClone(target);

    if (target && typeof target === 'object') {
        safeAssign(target, '__cineDeepClone', clone);
    }

    return clone;
}

export const CORE_DEEP_CLONE = ensureDeepClone();
