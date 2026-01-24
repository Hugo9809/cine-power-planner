/**
 * Initialization Manager
 * Handles the application startup sequence, including backup guards, UI initialization, and state restoration.
 */

export const InitializationManager = {
    // Dependencies resolved from window/global scope to avoid circular imports during refactor
    resolveDependencies() {
        return {
            ensureCriticalStorageBackupsFn: (typeof window !== 'undefined' ? window.ensureCriticalStorageBackupsFn : null),
            resolveFilterSelectElement: (typeof window !== 'undefined' ? window.resolveFilterSelectElement : null),
            applySetLanguage: (typeof window !== 'undefined' ? window.applySetLanguage : null),
            populateEnvironmentDropdowns: (typeof window !== 'undefined' ? window.populateEnvironmentDropdowns : null),
            populateLensDropdown: (typeof window !== 'undefined' ? window.populateLensDropdown : null),
            populateFilterDropdown: (typeof window !== 'undefined' ? window.populateFilterDropdown : null),
            renderFilterDetails: (typeof window !== 'undefined' ? window.renderFilterDetails : null),
            saveCurrentSession: (typeof window !== 'undefined' ? window.saveCurrentSession : null),
            saveCurrentGearList: (typeof window !== 'undefined' ? window.saveCurrentGearList : null),
            checkSetupChanged: (typeof window !== 'undefined' ? window.checkSetupChanged : null),
            populateUserButtonDropdowns: (typeof window !== 'undefined' ? window.populateUserButtonDropdowns : null),
            attachSelectSearch: (typeof window !== 'undefined' ? window.attachSelectSearch : null),
            callSessionCoreFunction: (typeof window !== 'undefined' ? window.callSessionCoreFunction : null),
            resetDeviceForm: (typeof window !== 'undefined' ? window.resetDeviceForm : null),
            ensureDefaultProjectInfoSnapshot: (typeof window !== 'undefined' ? window.ensureDefaultProjectInfoSnapshot : null),
            restoreSessionState: (typeof window !== 'undefined' ? window.restoreSessionState : null),
            applySharedSetupFromUrl: (typeof window !== 'undefined' ? window.applySharedSetupFromUrl : null),
            updateRequiredScenariosSummary: (typeof window !== 'undefined' ? window.updateRequiredScenariosSummary : null),
            updateTripodOptions: (typeof window !== 'undefined' ? window.updateTripodOptions : null),
        };
    },

    initialize() {
        console.log('DEBUG: InitializationManager.initialize ENTERED');
        const deps = this.resolveDependencies();

        // 1. Critical Backup Guard
        try {
            if (typeof deps.ensureCriticalStorageBackupsFn === 'function') {
                deps.ensureCriticalStorageBackupsFn();
            }
        } catch (criticalGuardError) {
            if (typeof console !== 'undefined' && typeof console.error === 'function') {
                console.error('Critical storage backup guard failed during initialization', criticalGuardError);
            }
        }

        // 2. Resolve Shared Link Row
        const sharedLinkRow = document.getElementById('sharedLinkRow');
        if (sharedLinkRow) {
            sharedLinkRow.classList.remove('hidden');
        }

        // 3. Set Language
        if (typeof deps.applySetLanguage === 'function' && typeof window.currentLang !== 'undefined') {
            deps.applySetLanguage(window.currentLang, { skipUpdateCalculations: true });
        }

        // 4. Populate UI Dropdowns
        if (typeof deps.populateEnvironmentDropdowns === 'function') deps.populateEnvironmentDropdowns();
        if (typeof deps.populateLensDropdown === 'function') deps.populateLensDropdown();
        if (typeof deps.populateFilterDropdown === 'function') deps.populateFilterDropdown();

        // 5. Filter Select Bindings
        const resolvedFilterSelect = typeof deps.resolveFilterSelectElement === 'function'
            ? deps.resolveFilterSelectElement()
            : null;

        if (resolvedFilterSelect) {
            if (typeof deps.renderFilterDetails === 'function') {
                resolvedFilterSelect.addEventListener('change', deps.renderFilterDetails);
                deps.renderFilterDetails(); // Initial render
            }
            resolvedFilterSelect.addEventListener('change', () => {
                if (typeof deps.saveCurrentSession === 'function') deps.saveCurrentSession();
                if (typeof deps.saveCurrentGearList === 'function') deps.saveCurrentGearList();
                if (typeof deps.checkSetupChanged === 'function') deps.checkSetupChanged();
            });
        }

        // 6. User Buttons
        if (typeof deps.populateUserButtonDropdowns === 'function') deps.populateUserButtonDropdowns();

        // 7. Post-Render Tasks (Select Search & Favoritable)
        this.schedulePostRenderTask(() => {
            document.querySelectorAll('#projectForm select')
                .forEach(sel => {
                    if (typeof deps.attachSelectSearch === 'function') deps.attachSelectSearch(sel);
                    if (typeof deps.callSessionCoreFunction === 'function') {
                        deps.callSessionCoreFunction('initFavoritableSelect', [sel], { defer: true });
                    }
                });
        });

        // 8. Platform Specifics (Install Banner & iOS PWA)
        this.schedulePostRenderTask(() => {
            if (
                typeof globalThis !== 'undefined'
                && typeof globalThis.setupInstallBanner === 'function'
            ) {
                try {
                    globalThis.setupInstallBanner();
                } catch (installError) {
                    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                        console.warn('Failed to set up install banner', installError);
                    }
                }
            }
            if (typeof window.maybeShowIosPwaHelp === 'function') {
                try {
                    window.maybeShowIosPwaHelp();
                } catch (iosHelpError) {
                    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                        console.warn('Failed to display iOS PWA help prompt', iosHelpError);
                    }
                }
            }
        });

        // 9. Reset Forms & Snapshots
        if (typeof deps.resetDeviceForm === 'function') deps.resetDeviceForm();
        if (typeof deps.ensureDefaultProjectInfoSnapshot === 'function') {
            deps.ensureDefaultProjectInfoSnapshot();
        }

        // 10. Restore Session
        if (typeof deps.restoreSessionState === 'function') deps.restoreSessionState();

        // 11. URL Handling
        if (typeof deps.applySharedSetupFromUrl === 'function') deps.applySharedSetupFromUrl();

        // 12. Helper Bindings (Core UI Helpers)
        if (typeof window.cineCoreUiHelpers !== 'undefined' && typeof window.cineCoreUiHelpers.whenElementAvailable === 'function') {
            window.cineCoreUiHelpers.whenElementAvailable('requiredScenarios', (el) => {
                if (typeof window.requiredScenariosSelect === 'undefined' || !window.requiredScenariosSelect) {
                    try { window.requiredScenariosSelect = el; } catch (e) { void e; }
                }
                if (typeof deps.updateRequiredScenariosSummary === 'function') {
                    el.addEventListener('change', deps.updateRequiredScenariosSummary);
                    deps.updateRequiredScenariosSummary();
                }
            });

            ['tripodHeadBrand', 'tripodBowl', 'tripodTypes', 'tripodSpreader'].forEach(id => {
                window.cineCoreUiHelpers.whenElementAvailable(id, (el) => {
                    const varName = `${id}Select`;
                    if (typeof window[varName] === 'undefined' || !window[varName]) {
                        try { window[varName] = el; } catch (e) { void e; }
                    }
                    if (typeof deps.updateTripodOptions === 'function') {
                        el.addEventListener('change', deps.updateTripodOptions);
                    }
                });
            });
        }
    },

    schedulePostRenderTask(task, timeout = 100) {
        const runTaskSafely = () => {
            try {
                task();
            } catch (err) {
                if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                    console.warn('InitializationManager: Post-render task failed', err);
                }
            }
        };

        const scheduleIdle = () => {
            if (typeof requestIdleCallback === 'function') {
                requestIdleCallback(runTaskSafely, { timeout });
                return;
            }
            setTimeout(runTaskSafely, timeout);
        };

        if (typeof requestAnimationFrame === 'function') {
            requestAnimationFrame(scheduleIdle);
        } else {
            scheduleIdle();
        }
    }
};
