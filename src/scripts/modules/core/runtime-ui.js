/**
 * Cine Power Planner Core Runtime UI
 *
 * Pure ESM module for UI bridging and fallbacks.
 * Extracted from app-core-runtime-ui.js.
 */

import {
    escapeHtml,
    escapeButtonLabelSafely,
    resolveButtonIconMarkup,
    setButtonLabelWithIcon,
    whenElementAvailable
} from '../ui-helpers.js';

import { detectGlobalScope } from '../helpers/scope-utils.js';

export {
    escapeHtml,
    escapeButtonLabelSafely,
    resolveButtonIconMarkup,
    setButtonLabelWithIcon,
    whenElementAvailable
};

export function collectCandidateScopes(primary) {
    const scopes = [];

    try {
        if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
            scopes.push(CORE_GLOBAL_SCOPE);
        }
    } catch (coreScopeError) {
        void coreScopeError;
    }

    try {
        if (typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' && CORE_PART1_RUNTIME_SCOPE) {
            scopes.push(CORE_PART1_RUNTIME_SCOPE);
        }
    } catch (part1ScopeError) {
        void part1ScopeError;
    }

    try {
        if (typeof CORE_PART2_RUNTIME_SCOPE !== 'undefined' && CORE_PART2_RUNTIME_SCOPE) {
            scopes.push(CORE_PART2_RUNTIME_SCOPE);
        }
    } catch (part2ScopeError) {
        void part2ScopeError;
    }

    if (primary) {
        scopes.push(primary);
    }

    if (typeof window !== 'undefined' && window && window !== primary) {
        scopes.push(window);
    }

    if (typeof self !== 'undefined' && self && self !== primary) {
        scopes.push(self);
    }

    if (typeof global !== 'undefined' && global && global !== primary) {
        scopes.push(global);
    }

    return scopes;
}

export function resolveCoreUiHelpers(existingBridge, scopes) {
    const candidates = [];

    if (existingBridge && existingBridge.helpers && typeof existingBridge.helpers === 'object') {
        candidates.push(existingBridge.helpers);
    }

    for (let scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
        const scope = scopes[scopeIndex];
        if (!scope) {
            continue;
        }

        try {
            const bridge = scope.cineCoreRuntimeUiBridge;
            if (bridge && bridge !== existingBridge && typeof bridge === 'object') {
                if (bridge.helpers && typeof bridge.helpers === 'object') {
                    candidates.push(bridge.helpers);
                }
            }
        } catch (bridgeLookupError) {
            void bridgeLookupError;
        }
    }

    for (let scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
        const scope = scopes[scopeIndex];
        if (!scope) {
            continue;
        }

        try {
            const helpers = scope.cineCoreUiHelpers;
            if (helpers && typeof helpers === 'object') {
                candidates.push(helpers);
            }
        } catch (helpersLookupError) {
            void helpersLookupError;
        }
    }

    for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        if (candidate && typeof candidate === 'object') {
            return candidate;
        }
    }

    return {};
}

export function createRuntimeUiBridge() {
    const primaryScope = detectGlobalScope();
    let bridge = null;

    if (primaryScope && typeof primaryScope.cineCoreRuntimeUiBridge === 'object' && primaryScope.cineCoreRuntimeUiBridge) {
        bridge = primaryScope.cineCoreRuntimeUiBridge;
    }

    if (!bridge && typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE.cineCoreRuntimeUiBridge === 'object') {
        bridge = CORE_GLOBAL_SCOPE.cineCoreRuntimeUiBridge;
    }

    if (!bridge) {
        bridge = {};
    }

    const scopes = collectCandidateScopes(primaryScope);
    const helpers = resolveCoreUiHelpers(bridge, scopes);

    // Bind implementations with fallbacks
    // Note: We prioritize the bridge's existing methods (if monkey-patched)
    // then helpers, then our pure ESM imports.

    const boundEscapeHtml = typeof bridge.escapeHtml === 'function' ? bridge.escapeHtml :
        typeof helpers.escapeHtml === 'function' ? helpers.escapeHtml : escapeHtml;

    const boundEscapeButtonLabelSafely = typeof bridge.escapeButtonLabelSafely === 'function' ? bridge.escapeButtonLabelSafely :
        typeof helpers.escapeButtonLabelSafely === 'function' ? helpers.escapeButtonLabelSafely : escapeButtonLabelSafely;

    const boundResolveButtonIconMarkup = typeof bridge.resolveButtonIconMarkup === 'function' ? bridge.resolveButtonIconMarkup :
        typeof helpers.resolveButtonIconMarkup === 'function' ? helpers.resolveButtonIconMarkup : resolveButtonIconMarkup;

    const boundSetButtonLabelWithIcon = typeof bridge.setButtonLabelWithIcon === 'function' ? bridge.setButtonLabelWithIcon :
        typeof helpers.setButtonLabelWithIcon === 'function' ? helpers.setButtonLabelWithIcon : setButtonLabelWithIcon;

    const boundWhenElementAvailable = typeof bridge.whenElementAvailable === 'function' ? bridge.whenElementAvailable :
        typeof helpers.whenElementAvailable === 'function' ? helpers.whenElementAvailable : whenElementAvailable;


    bridge.helpers = helpers;
    bridge.escapeHtml = boundEscapeHtml;
    bridge.escapeButtonLabelSafely = boundEscapeButtonLabelSafely;
    bridge.resolveButtonIconMarkup = boundResolveButtonIconMarkup;
    bridge.setButtonLabelWithIcon = boundSetButtonLabelWithIcon;
    bridge.whenElementAvailable = boundWhenElementAvailable;

    bridge.resolveCoreUiHelpers = function resolveCoreUiHelpersPublic() {
        return resolveCoreUiHelpers(bridge, scopes);
    };

    return bridge;
}
