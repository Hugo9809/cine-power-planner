/**
 * Cine Power Planner Auto Gear Helpers
 *
 * Pure ESM module for managing Auto Gear global fallbacks and repairs.
 * Extracted from app-core-environment.js during Vite migration.
 */

// Fallback providers for Auto Gear globals
export const AUTO_GEAR_GLOBAL_FALLBACKS = {
    autoGearAutoPresetId: () => '',
    baseAutoGearRules: () => [],
    autoGearScenarioModeSelect: () => null,
    autoGearRuleNameInput: () => null,
    autoGearSummaryFocus: () => 'all',
    autoGearMonitorDefaultControls: () => [],
    safeGenerateConnectorSummary: () => {
        // This will be overridden or handled by the connectors module,
        // but we keep the key here for completeness of the registry.
        return () => '';
    },
    totalPowerElem: () => null,
};

export const AUTO_GEAR_REFERENCE_NAMES = Object.keys(AUTO_GEAR_GLOBAL_FALLBACKS);

/**
 * Checks if an error is a ReferenceError related to Auto Gear globals.
 * @param {Error} error - The error to check.
 * @returns {boolean} True if it is an Auto Gear reference error.
 */
export function isAutoGearGlobalReferenceError(error) {
    if (!error || typeof error !== 'object') {
        return false;
    }

    const message = typeof error.message === 'string' ? error.message : '';
    return (
        error.name === 'ReferenceError' &&
        AUTO_GEAR_REFERENCE_NAMES.some((name) => message.indexOf(name) !== -1)
    );
}

/**
 * Ensures a global variable for Auto Gear exists in the given scope.
 * Tries validation, property definition, and direct assignment.
 * @param {object} scope - The scope to check (e.g., window).
 * @param {string} name - The name of the global variable.
 */
export function ensureAutoGearGlobal(scope, name) {
    const createFallback = AUTO_GEAR_GLOBAL_FALLBACKS[name];
    if (typeof createFallback !== 'function') {
        return;
    }

    const fallbackValue = createFallback();

    if (typeof scope[name] === 'undefined') {
        try {
            scope[name] = fallbackValue;
        } catch (assignmentError) {
            try {
                Object.defineProperty(scope, name, {
                    configurable: true,
                    writable: true,
                    enumerable: false,
                    value: fallbackValue,
                });
            } catch (defineError) {
                void defineError;
            }
        }
    }

    // Attempt to fix binding issues in some environments (e.g. older webviews)
    try {
        const globalFn = (scope && scope.Function) || Function;
        if (typeof globalFn === 'function') {
            const binder = globalFn(
                'value',
                'if (typeof ' +
                name +
                " === 'undefined') { var " +
                name +
                " = value; } else { " +
                name +
                ' = value; }\n           return ' +
                name +
                ';'
            );
            const appliedValue = typeof scope[name] === 'undefined' ? fallbackValue : scope[name];
            binder(appliedValue);
        }
    } catch (bindingError) {
        void bindingError;
    }
}

/**
 * repairs all Auto Gear globals in the given scope.
 * @param {object} scope - The scope to repair.
 */
export function repairAutoGearGlobals(scope) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
    }

    for (let index = 0; index < AUTO_GEAR_REFERENCE_NAMES.length; index += 1) {
        const name = AUTO_GEAR_REFERENCE_NAMES[index];
        try {
            ensureAutoGearGlobal(scope, name);
        } catch (ensureError) {
            void ensureError;
        }
    }
}
