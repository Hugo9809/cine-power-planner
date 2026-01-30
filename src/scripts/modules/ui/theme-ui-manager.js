
const pendingThemeControls = [];
const pendingPinkModeControls = [];

let themePreferenceController = null;
let pinkModePreferenceController = null;

export const ThemeManager = {
    // Controller setters for integration with `app-session.js`
    setThemeController(controller) {
        themePreferenceController = controller;
    },

    setPinkModeController(controller) {
        pinkModePreferenceController = controller;
    },

    registerThemeControl(element, config) {
        if (themePreferenceController && typeof themePreferenceController.registerControl === 'function') {
            return themePreferenceController.registerControl(element, config);
        }
        let unregister = () => { };
        pendingThemeControls.push({
            element,
            config,
            callback: (fn) => { unregister = fn; }
        });
        return () => unregister();
    },

    registerPinkModeControl(element, config) {
        if (pinkModePreferenceController && typeof pinkModePreferenceController.registerControl === 'function') {
            return pinkModePreferenceController.registerControl(element, config);
        }
        let unregister = () => { };
        pendingPinkModeControls.push({
            element,
            options: config,
            callback: (fn) => { unregister = fn; }
        });
        return () => unregister();
    },

    resolveThemeVariant(darkEnabled, pinkEnabled) {
        if (pinkEnabled) {
            return darkEnabled ? 'pink-dark' : 'pink-light';
        }
        return darkEnabled ? 'dark' : 'light';
    },

    applyThemeVariantSelection(variant, handlers) {
        const { setThemePreference, setPinkModePreference } = handlers;
        const normalized = typeof variant === 'string' ? variant : 'light';

        switch (normalized) {
            case 'dark':
                setThemePreference(true, { source: 'theme-variant' });
                setPinkModePreference(false, { source: 'theme-variant' });
                return;
            case 'pink-light':
                setThemePreference(false, { source: 'theme-variant' });
                setPinkModePreference(true, { source: 'theme-variant' });
                return;
            case 'pink-dark':
                setThemePreference(true, { source: 'theme-variant' });
                setPinkModePreference(true, { source: 'theme-variant' });
                return;
            case 'light':
            default:
                setThemePreference(false, { source: 'theme-variant' });
                setPinkModePreference(false, { source: 'theme-variant' });
        }
    },

    getPendingThemeControls() {
        return pendingThemeControls;
    },

    getPendingPinkModeControls() {
        return pendingPinkModeControls;
    }
};
