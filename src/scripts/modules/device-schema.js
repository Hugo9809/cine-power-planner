/**
 * Cine Power Planner Device Schema Manager
 * 
 * Pure ESM module for handling device schema loading, caching, and persistence.
 * Extracted from core/modules/core/device-schema.js during Vite migration.
 */

export const DEFAULT_DEVICE_SCHEMA_PATH = 'src/data/schema.json';
export const DEFAULT_DEVICE_SCHEMA_STORAGE_KEY = 'cameraPowerPlanner_schemaCache';

// We allow passing configuration or fallback to defaults.
// Core scope lookup is removed here to keep it pure; callers should inject config.

const schemaStorage = (() => {
    if (typeof window === 'undefined') return null;
    try {
        if (!('localStorage' in window)) return null;
        const { localStorage } = window;
        const testKey = '__schema_cache__';
        localStorage.setItem(testKey, '1');
        localStorage.removeItem(testKey);
        return localStorage;
    } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Device schema cache disabled', error);
        }
        return null;
    }
})();

export function loadCachedDeviceSchema(storageKey = DEFAULT_DEVICE_SCHEMA_STORAGE_KEY) {
    if (!schemaStorage) return null;
    try {
        const raw = schemaStorage.getItem(storageKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
    } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Failed to read cached device schema', error);
        }
        try {
            schemaStorage.removeItem(storageKey);
        } catch (removeError) {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn('Failed to clear invalid cached device schema', removeError);
            }
        }
        return null;
    }
}

export function persistDeviceSchema(schema, storageKey = DEFAULT_DEVICE_SCHEMA_STORAGE_KEY) {
    if (!schemaStorage) return;
    try {
        schemaStorage.setItem(storageKey, JSON.stringify(schema));
    } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Failed to cache device schema', error);
        }
    }
}

export function isValidDeviceSchema(candidate) {
    return !!candidate && typeof candidate === 'object' && !Array.isArray(candidate);
}

export async function loadDeviceSchemaFromCacheStorage(path = DEFAULT_DEVICE_SCHEMA_PATH) {
    if (typeof caches === 'undefined' || !caches || typeof caches.match !== 'function') {
        return null;
    }

    const candidates = new Set([path]);
    if (typeof path === 'string' && !path.startsWith('./')) {
        candidates.add(`./${path}`);
    }

    if (typeof window !== 'undefined' && window && window.location) {
        try {
            candidates.add(new URL(path, window.location.href).toString());
        } catch (error) {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn('Failed to resolve schema.json cache URL', error);
            }
        }
    }

    for (const url of candidates) {
        try {
            const response = await caches.match(url, { ignoreSearch: true });
            if (response) {
                return await response.clone().json();
            }
        } catch (error) {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn('Failed to read schema.json from cache entry', url, error);
            }
        }
    }

    return null;
}

function createPopulateScheduler(populateCategoryOptions) {
    return function schedulePopulateCategoryOptions() {
        const triggerPopulate = () => {
            try {
                populateCategoryOptions();
            } catch (error) {
                if (typeof console !== 'undefined' && typeof console.error === 'function') {
                    console.error('populateCategoryOptions failed during scheduled execution', error);
                }
            }
        };

        if (typeof window !== 'undefined' && window && typeof window.setTimeout === 'function') {
            window.setTimeout(triggerPopulate, 0);
        } else if (typeof setTimeout === 'function') {
            setTimeout(triggerPopulate, 0);
        } else {
            triggerPopulate();
        }
    };
}

function detectGlobalScope() {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof window !== 'undefined') return window;
    if (typeof self !== 'undefined') return self;
    if (typeof global !== 'undefined') return global;
    return null;
}

export function createDeviceSchemaManager(options = {}) {
    const shouldUseDefaults = !options || Object.keys(options).length === 0;

    const onSchemaChange =
        options && typeof options.onSchemaChange === 'function'
            ? options.onSchemaChange
            : () => { };

    const populateCategoryOptions =
        options && typeof options.populateCategoryOptions === 'function'
            ? options.populateCategoryOptions
            : () => {
                const scope = detectGlobalScope();
                if (!scope) {
                    return;
                }
                let populate = null;
                const preferredKey =
                    options && typeof options.populateCategoryOptionsName === 'string'
                        ? options.populateCategoryOptionsName
                        : 'populateCategoryOptions';
                if (preferredKey && typeof scope[preferredKey] === 'function') {
                    populate = scope[preferredKey];
                } else if (typeof scope.populateCategoryOptions === 'function') {
                    populate = scope.populateCategoryOptions;
                }
                if (populate) {
                    try {
                        populate();
                    } catch (error) {
                        if (typeof console !== 'undefined' && typeof console.error === 'function') {
                            console.error('populateCategoryOptions execution failed', error);
                        }
                    }
                }
            };

    const schemaPath = options?.DEVICE_SCHEMA_PATH || DEFAULT_DEVICE_SCHEMA_PATH;
    const storageKey = options?.DEVICE_SCHEMA_STORAGE_KEY || DEFAULT_DEVICE_SCHEMA_STORAGE_KEY;

    let cachedSchema = loadCachedDeviceSchema(storageKey);
    let deviceSchema = cachedSchema && isValidDeviceSchema(cachedSchema) ? cachedSchema : null;

    onSchemaChange(deviceSchema);

    const schedulePopulateCategoryOptions = createPopulateScheduler(populateCategoryOptions);

    function setDeviceSchema(schema) {
        if (isValidDeviceSchema(schema)) {
            deviceSchema = schema;
            cachedSchema = schema;
        } else if (!deviceSchema) {
            deviceSchema = {};
        }
        onSchemaChange(deviceSchema);
        return deviceSchema;
    }

    function finalizeDeviceSchemaLoad(candidate) {
        if (isValidDeviceSchema(candidate)) {
            setDeviceSchema(candidate);
            persistDeviceSchema(candidate, storageKey);
        } else if (!deviceSchema) {
            setDeviceSchema(cachedSchema || {});
        }

        schedulePopulateCategoryOptions();
    }

    return {
        DEVICE_SCHEMA_PATH: schemaPath,
        DEVICE_SCHEMA_STORAGE_KEY: storageKey,
        loadCachedDeviceSchema: () => loadCachedDeviceSchema(storageKey),
        persistDeviceSchema: (schema) => persistDeviceSchema(schema, storageKey),
        isValidDeviceSchema,
        loadDeviceSchemaFromCacheStorage: () => loadDeviceSchemaFromCacheStorage(schemaPath),
        schedulePopulateCategoryOptions,
        finalizeDeviceSchemaLoad,
        getCachedDeviceSchema: () => (cachedSchema && isValidDeviceSchema(cachedSchema) ? cachedSchema : null),
        getDeviceSchema: () => deviceSchema,
        setDeviceSchema,
    };
}
