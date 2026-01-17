/**
 * Cine Power Planner Freeze Registry
 *
 * Pure ESM module for managing a registry of frozen objects.
 * Extracted from app-core-environment.js during Vite migration.
 */

/**
 * Creates a new freeze registry. Prefers WeakSet, falls back to array.
 * @returns {WeakSet|Array} The freeze registry.
 */
export function createFreezeRegistry() {
    return typeof WeakSet === 'function' ? new WeakSet() : [];
}

/**
 * Checks if a value is present in the freeze registry.
 * @param {WeakSet|Array} registry - The freeze registry.
 * @param {object} value - The value to check.
 * @returns {boolean} True if the value is in the registry.
 */
export function freezeRegistryHas(registry, value) {
    if (!value || !registry) {
        return false;
    }

    if (typeof registry.has === 'function') {
        try {
            return registry.has(value);
        } catch (e) {
            void e;
            return false;
        }
    }

    // Array fallback
    if (Array.isArray(registry)) {
        for (let i = 0; i < registry.length; i++) {
            if (registry[i] === value) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Adds a value to the freeze registry.
 * @param {WeakSet|Array} registry - The freeze registry.
 * @param {object} value - The value to add.
 */
export function freezeRegistryAdd(registry, value) {
    if (!value || !registry) {
        return;
    }

    if (typeof registry.add === 'function') {
        try {
            registry.add(value);
        } catch (e) {
            void e;
        }
        return;
    }

    // Array fallback
    if (Array.isArray(registry)) {
        for (let i = 0; i < registry.length; i++) {
            if (registry[i] === value) {
                return;
            }
        }
        registry.push(value);
    }
}

// Singleton registry for convenience
let _sharedRegistry = null;

/**
 * Gets a shared, global freeze registry. Lazily created on first call.
 * @returns {WeakSet|Array} The shared freeze registry.
 */
export function getSharedFreezeRegistry() {
    if (!_sharedRegistry) {
        _sharedRegistry = createFreezeRegistry();
    }
    return _sharedRegistry;
}

/**
 * Checks if a value is in the shared freeze registry.
 * @param {object} value - The value to check.
 * @returns {boolean} True if in the shared registry.
 */
export function sharedFreezeRegistryHas(value) {
    return freezeRegistryHas(getSharedFreezeRegistry(), value);
}

/**
 * Adds a value to the shared freeze registry.
 * @param {object} value - The value to add.
 */
export function sharedFreezeRegistryAdd(value) {
    freezeRegistryAdd(getSharedFreezeRegistry(), value);
}
