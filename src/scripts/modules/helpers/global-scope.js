/**
 * Cine Power Planner Global Scope Helpers
 *
 * Pure ESM module for reading, writing, and ensuring global values.
 * Extracted from app-core-environment.js during Vite migration.
 */

import { collectCandidateScopes, detectGlobalScope } from './scope-utils.js';

/**
 * Reads a value from the first scope that has the property.
 * @param {string} name - The property name.
 * @param {object[]} [scopes] - Scopes to search. Defaults to collected candidate scopes.
 * @returns {*} The value, or undefined if not found.
 */
export function readGlobalScopeValue(name, scopes) {
    const searchScopes = Array.isArray(scopes) && scopes.length > 0 ? scopes : collectCandidateScopes();

    for (let i = 0; i < searchScopes.length; i++) {
        const scope = searchScopes[i];
        if (!scope || typeof scope !== 'object') {
            continue;
        }

        try {
            if (name in scope) {
                return scope[name];
            }
        } catch (e) {
            void e;
        }
    }

    return undefined;
}

/**
 * Writes a value to the first available scope.
 * @param {string} name - The property name.
 * @param {*} value - The value to write.
 * @param {object[]} [scopes] - Scopes to try. Defaults to collected candidate scopes.
 * @returns {boolean} True if write was successful.
 */
export function writeGlobalScopeValue(name, value, scopes) {
    const searchScopes = Array.isArray(scopes) && scopes.length > 0 ? scopes : collectCandidateScopes();

    for (let i = 0; i < searchScopes.length; i++) {
        const scope = searchScopes[i];
        if (!scope || typeof scope !== 'object') {
            continue;
        }

        try {
            scope[name] = value;
            return true;
        } catch (e) {
            void e;
        }
    }

    return false;
}

/**
 * Ensures a global value exists. If not, sets it using the fallback.
 * @param {string} name - The property name.
 * @param {function|*} fallbackValue - A value or factory function for the fallback.
 * @param {object[]} [scopes] - Scopes to search. Defaults to collected candidate scopes.
 * @returns {*} The existing or newly set value.
 */
export function ensureGlobalFallback(name, fallbackValue, scopes) {
    const fallbackProvider =
        typeof fallbackValue === 'function'
            ? fallbackValue
            : () => fallbackValue;

    const searchScopes = Array.isArray(scopes) && scopes.length > 0 ? scopes : collectCandidateScopes();

    for (let i = 0; i < searchScopes.length; i++) {
        const scope = searchScopes[i];
        if (!scope || typeof scope !== 'object') {
            continue;
        }

        try {
            if (typeof scope[name] === 'undefined') {
                scope[name] = fallbackProvider();
            }
            return scope[name];
        } catch (e) {
            void e;
        }
    }

    try {
        return fallbackProvider();
    } catch (e) {
        void e;
        return undefined;
    }
}

/**
 * Ensures a global value passes a validator. If not, resets it using the fallback.
 * @param {string} name - The property name.
 * @param {function(value): boolean} validator - A function that returns true if the value is valid.
 * @param {function|*} fallbackValue - A value or factory function for the fallback.
 * @param {object[]} [scopes] - Scopes to modify. Defaults to collected candidate scopes.
 */
export function normaliseGlobalValue(name, validator, fallbackValue, scopes) {
    const fallbackProvider =
        typeof fallbackValue === 'function'
            ? fallbackValue
            : () => fallbackValue;

    const searchScopes = Array.isArray(scopes) && scopes.length > 0 ? scopes : collectCandidateScopes();

    for (let i = 0; i < searchScopes.length; i++) {
        const scope = searchScopes[i];
        if (!scope || typeof scope !== 'object') {
            continue;
        }

        try {
            if (!validator(scope[name])) {
                scope[name] = fallbackProvider();
            }
        } catch (e) {
            void e;
        }
    }
}
