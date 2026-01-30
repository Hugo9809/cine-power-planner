import { LoggingManager } from '../core/logging-manager.js';
import { ensureDeferredScriptsLoaded } from '../core/session-runtime.js';

let pendingSettingsOpenContext = null;

export const SettingsUiManager = {
    logEvent(level, message, detail, meta) {
        const mergedMeta = { namespace: 'settings', ...meta };
        LoggingManager.log(level, message, detail, mergedMeta);
    },

    prepareOpenContext(context) {
        if (context && typeof context === 'object') {
            pendingSettingsOpenContext = { ...context };
        } else {
            pendingSettingsOpenContext = null;
        }
    },

    consumeOpenContext(defaultContext) {
        const context = pendingSettingsOpenContext;
        pendingSettingsOpenContext = null;
        if (context && typeof context === 'object') {
            return { ...context };
        }
        if (defaultContext && typeof defaultContext === 'object') {
            return { ...defaultContext };
        }
        return { reason: 'settings-button' };
    },

    resolveDialog() {
        if (typeof window !== 'undefined' && window.settingsDialog) return window.settingsDialog;
        if (typeof document !== 'undefined') {
            try {
                return document.getElementById('settingsDialog');
            } catch (resolveError) {
                void resolveError;
            }
        }
        return null;
    },

    resolveButton() {
        if (typeof window !== 'undefined' && window.settingsButton) return window.settingsButton;
        if (typeof document !== 'undefined') {
            try {
                return document.getElementById('settingsButton');
            } catch (resolveError) {
                void resolveError;
            }
        }
        return null;
    },

    requestOpen(context) {
        const dialog = this.resolveDialog();
        const trigger = this.resolveButton();

        let openBefore = false;
        if (dialog) {
            if (typeof window !== 'undefined' && typeof window.isDialogOpen === 'function') {
                openBefore = window.isDialogOpen(dialog);
            } else {
                openBefore = !!(dialog && dialog.open);
            }
        }

        const detail = context && typeof context === 'object' ? { ...context } : {};
        if (typeof detail.openBefore !== 'boolean') {
            detail.openBefore = openBefore;
        }

        ensureDeferredScriptsLoaded('settings-open');

        if (trigger && typeof trigger.click === 'function') {
            this.prepareOpenContext(detail);
            try {
                trigger.click();
            } catch (clickError) {
                this.prepareOpenContext(null);
                this.logEvent('error', 'Settings dialog open request failed during click',
                    { ...detail, buttonAvailable: true },
                    { action: 'open-request' },
                );
                throw clickError;
            }
            return true;
        }

        this.logEvent('warn', 'Settings dialog open request unavailable',
            { ...detail, buttonAvailable: false },
            { action: 'open-request' },
        );
        return false;
    }
};
