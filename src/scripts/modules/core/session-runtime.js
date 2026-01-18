/**
 * Session Runtime Utilities
 * 
 * Provides runtime scope resolution for the session layer.
 * Extracted from app-session.js.
 */

import { detectGlobalScope, resolveFromScopes } from '../helpers/scope-utils.js';

export const CORE_GLOBAL_SCOPE = detectGlobalScope();

/**
 * DEEP DIVE: Session Scope Resolution
 *
 * This function determines the "global" context for the current executing environment.
 * It is critical for the "Islands of Automation" architecture because it allows the session
 * state to anchor itself to whatever global object is available.
 */
export function getSessionCloneScope() {
    return CORE_GLOBAL_SCOPE;
}

export function resolveSessionRuntimeFunction(name) {
    if (typeof name !== 'string' || !name) {
        return null;
    }

    const scope = resolveFromScopes(name, {
        primaryScope: CORE_GLOBAL_SCOPE
    });

    if (scope) {
        return scope[name];
    }

    return null;
}
