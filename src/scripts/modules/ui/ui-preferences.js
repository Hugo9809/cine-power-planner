/**
 * UI Preferences Manager
 *
 * Manages user interface preferences such as font size, font family, and grid snap state.
 * Extracted from app-session.js.
 */

import { ensureSessionRuntimePlaceholder, getSessionRuntimeScopes } from '../core/session-runtime.js';

const isPlainObjectFallback = value => {
    if (value === null || typeof value !== 'object') {
        return false;
    }

    if (Array.isArray(value)) {
        return false;
    }

    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
};

export const isPlainObject = ensureSessionRuntimePlaceholder(
    'isPlainObject',
    () => isPlainObjectFallback,
);

export const applyFontSizeSafe = ensureSessionRuntimePlaceholder(
    'applyFontSize',
    () => {
        const defaultUIScaleValues = {
            '--page-padding': 20,
            '--gap-size': 10,
            '--button-size': 32,
            '--border-radius': 5,
            '--form-label-width': 150,
            '--form-label-min-width': 120,
            '--form-action-width': 110,
        };
        const uiScaleProperties = Object.keys(defaultUIScaleValues);
        const baseUIScaleValues = { ...defaultUIScaleValues };
        let baseFontSize = null;

        const resolveBaseMetrics = () => {
            if (baseFontSize !== null) {
                return;
            }

            baseFontSize = 16;

            const root =
                typeof document !== 'undefined' && document
                    ? document.documentElement
                    : null;
            if (!root) {
                return;
            }

            try {
                const computed =
                    typeof window !== 'undefined'
                        && window
                        && typeof window.getComputedStyle === 'function'
                        ? window.getComputedStyle(root)
                        : null;
                if (!computed) {
                    return;
                }

                const computedFontSize = parseFloat(computed.fontSize);
                if (Number.isFinite(computedFontSize) && computedFontSize > 0) {
                    baseFontSize = computedFontSize;
                }

                for (let index = 0; index < uiScaleProperties.length; index += 1) {
                    const prop = uiScaleProperties[index];
                    const rawValue = computed.getPropertyValue(prop);
                    const numericValue = parseFloat(rawValue);
                    if (Number.isFinite(numericValue) && numericValue > 0) {
                        baseUIScaleValues[prop] = numericValue;
                    }
                }
            } catch (metricsError) {
                if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                    console.warn('Unable to capture base UI scale metrics', metricsError);
                }
            }
        };

        return size => {
            const root =
                typeof document !== 'undefined' && document
                    ? document.documentElement
                    : null;
            if (!root) {
                return;
            }

            const numericSize = Number.parseFloat(size);
            if (!Number.isFinite(numericSize) || numericSize <= 0) {
                return;
            }

            resolveBaseMetrics();

            root.style.fontSize = `${numericSize}px`;

            const referenceFontSize = Number.isFinite(baseFontSize) && baseFontSize > 0
                ? baseFontSize
                : numericSize;
            const rawScale = referenceFontSize > 0 ? numericSize / referenceFontSize : 1;
            const scale = Number.isFinite(rawScale) && rawScale > 0 ? rawScale : 1;

            for (let index = 0; index < uiScaleProperties.length; index += 1) {
                const prop = uiScaleProperties[index];
                const baseValue = baseUIScaleValues[prop];
                if (Number.isFinite(baseValue) && baseValue > 0) {
                    root.style.setProperty(prop, `${baseValue * scale}px`);
                }
            }

            root.style.setProperty('--ui-scale', String(scale));
        };
    },
);

export const applyFontFamilySafe = ensureSessionRuntimePlaceholder(
    'applyFontFamily',
    () => family => {
        const root =
            typeof document !== 'undefined' && document ? document.documentElement : null;
        if (!root) {
            return;
        }

        try {
            root.style.setProperty('--font-family', family || '');
        } catch (fontFamilyError) {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn('Unable to apply font family', fontFamilyError);
            }
        }
    },
);

const GRID_SNAP_STORAGE_KEY = '__cineGridSnapState';

// Helper for resolving the grid snap toggle button dynamically
const resolveGridSnapToggleButton = () => {
    if (
        typeof document === 'undefined'
        || !document
        || typeof document.getElementById !== 'function'
    ) {
        return null;
    }

    try {
        return document.getElementById('gridSnapToggle');
    } catch (resolveError) {
        void resolveError;
        return null;
    }
};

export const readGridSnapState = () => {
    try {
        if (typeof window !== 'undefined' && typeof window.getGridSnapState === 'function') {
            return Boolean(window.getGridSnapState());
        }
    } catch (gridSnapReadError) {
        void gridSnapReadError;
    }

    if (typeof window !== 'undefined' && typeof window.gridSnap !== 'undefined') {
        try {
            return Boolean(window.gridSnap);
        } catch (legacyGridSnapError) {
            void legacyGridSnapError;
        }
    }

    const scopes = getSessionRuntimeScopes();
    for (let index = 0; index < scopes.length; index += 1) {
        const scope = scopes[index];
        if (!scope || typeof scope !== 'object') {
            continue;
        }

        try {
            const stored = scope[GRID_SNAP_STORAGE_KEY];
            if (typeof stored === 'boolean') {
                return stored;
            }
        } catch (storedReadError) {
            void storedReadError;
        }

        try {
            const legacy = scope.gridSnap;
            if (typeof legacy === 'boolean') {
                return legacy;
            }
        } catch (legacyScopeError) {
            void legacyScopeError;
        }
    }

    return false;
};

export const writeGridSnapState = value => {
    const desired = value === true;

    try {
        if (typeof window !== 'undefined' && typeof window.setGridSnapState === 'function') {
            return Boolean(window.setGridSnapState(desired));
        }
    } catch (gridSnapWriteError) {
        void gridSnapWriteError;
    }

    const scopes = getSessionRuntimeScopes();
    for (let index = 0; index < scopes.length; index += 1) {
        const scope = scopes[index];
        if (!scope || typeof scope !== 'object') {
            continue;
        }

        try {
            scope[GRID_SNAP_STORAGE_KEY] = desired;
        } catch (assignStorageError) {
            try {
                Object.defineProperty(scope, GRID_SNAP_STORAGE_KEY, {
                    configurable: true,
                    writable: true,
                    value: desired,
                });
            } catch (defineStorageError) {
                void defineStorageError;
            }
        }

        try {
            scope.gridSnap = desired;
        } catch (assignLegacyError) {
            try {
                Object.defineProperty(scope, 'gridSnap', {
                    configurable: true,
                    writable: true,
                    value: desired,
                });
            } catch (defineLegacyError) {
                void defineLegacyError;
            }
        }
    }

    try {
        if (typeof window !== 'undefined' && typeof window.applyLegacyGridSnapValue === 'function') {
            return Boolean(window.applyLegacyGridSnapValue(desired));
        }
    } catch (legacyGridSnapError) {
        void legacyGridSnapError;
    }

    return desired;
};

export const applyGridSnapUiState = enabled => {
    const resolveDiagramContainer = () => {
        if (typeof window !== 'undefined' && window.setupDiagramContainer) {
            return window.setupDiagramContainer;
        }
        if (
            typeof document !== 'undefined'
            && document
            && typeof document.getElementById === 'function'
        ) {
            try {
                return document.getElementById('diagramArea');
            } catch (diagramResolveError) {
                void diagramResolveError;
            }
        }
        return null;
    };

    const diagramContainer = resolveDiagramContainer();
    const gridSnapToggleButton = resolveGridSnapToggleButton();

    if (gridSnapToggleButton) {
        gridSnapToggleButton.classList.toggle('active', enabled);
        gridSnapToggleButton.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    }
    if (diagramContainer) {
        diagramContainer.classList.toggle('grid-snap', enabled);
    }
};
