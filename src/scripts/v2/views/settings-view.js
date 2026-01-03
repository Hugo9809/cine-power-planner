(function () {
    'use strict';

    const VIEW_ID = 'view-settings';

    let isInitialized = false;

    // =====================
    // HELPERS
    // =====================
    function _t(key) {
        if (typeof window !== 'undefined' && window.texts) {
            // 1. Get current language
            const langSelect = document.getElementById('languageSelect');
            const lang = (langSelect && langSelect.value) ||
                (typeof window.currentLanguage === 'string' && window.currentLanguage) ||
                'en';

            // 2. Get correct dictionary
            const dict = window.texts[lang] || window.texts['en'];

            if (dict) {
                return key.split('.').reduce((o, i) => (o ? o[i] : null), dict) || key;
            }
        }
        return key;
    }

    // Map V2 element IDs to Legacy element IDs and types
    const SETTINGS_MAP = [
        // --- General ---
        { v2: 'v2-settings-language', legacy: 'settingsLanguage', type: 'value' },
        { v2: 'v2-settings-temp-unit', legacy: 'settingsTemperatureUnit', type: 'value' },
        { v2: 'v2-settings-focus-scale', legacy: 'settingsFocusScale', type: 'value' },
        { v2: 'v2-settings-dark-mode', legacy: 'settingsDarkMode', type: 'checkbox' },
        { v2: 'v2-settings-pink-mode', legacy: 'settingsPinkMode', type: 'checkbox' },
        { v2: 'v2-settings-accent-color', legacy: 'accentColorInput', type: 'color' },
        { v2: 'v2-settings-font-size', legacy: 'settingsFontSize', type: 'value' },
        { v2: 'v2-settings-font-family', legacy: 'settingsFontFamily', type: 'value' },

        // Camera Constants
        { v2: 'v2-cam-color-a', legacy: 'cameraColorA', type: 'color' },
        { v2: 'v2-cam-color-b', legacy: 'cameraColorB', type: 'color' },
        { v2: 'v2-cam-color-c', legacy: 'cameraColorC', type: 'color' },
        { v2: 'v2-cam-color-d', legacy: 'cameraColorD', type: 'color' },
        { v2: 'v2-cam-color-e', legacy: 'cameraColorE', type: 'color' },

        // --- Accessibility ---
        { v2: 'v2-settings-high-contrast', legacy: 'settingsHighContrast', type: 'checkbox' },
        { v2: 'v2-settings-reduce-motion', legacy: 'settingsReduceMotion', type: 'checkbox' },
        { v2: 'v2-settings-relaxed-spacing', legacy: 'settingsRelaxedSpacing', type: 'checkbox' },

        // Mount Voltages
        { v2: 'v2-volt-v-high', legacy: 'mountVoltageVHigh', type: 'value' },
        { v2: 'v2-volt-v-low', legacy: 'mountVoltageVLow', type: 'value' },
        { v2: 'v2-volt-gold-high', legacy: 'mountVoltageGoldHigh', type: 'value' },
        { v2: 'v2-volt-gold-low', legacy: 'mountVoltageGoldLow', type: 'value' },
        { v2: 'v2-volt-b-high', legacy: 'mountVoltageBHigh', type: 'value' },
        { v2: 'v2-volt-b-low', legacy: 'mountVoltageBLow', type: 'value' },

        // --- Backup & Restore ---
        { v2: 'v2-settings-auto-backup', legacy: 'settingsShowAutoBackups', type: 'checkbox' },
        { v2: 'v2-settings-backup-retention', legacy: 'autoGearBackupRetention', type: 'value' },

        // --- Logging ---
        { v2: 'v2-settings-log-level', legacy: 'loggingLevelFilter', type: 'value' },
        { v2: 'v2-settings-log-history', legacy: 'loggingHistoryLimit', type: 'value' },
        { v2: 'v2-settings-log-filter', legacy: 'loggingNamespaceFilter', type: 'value' },
        { v2: 'v2-settings-log-console', legacy: 'loggingConsoleOutput', type: 'checkbox' },
        { v2: 'v2-settings-log-capture', legacy: 'loggingCaptureConsole', type: 'checkbox' },
        { v2: 'v2-settings-log-errors', legacy: 'loggingCaptureErrors', type: 'checkbox' },
        { v2: 'v2-settings-log-persist', legacy: 'loggingPersistSession', type: 'checkbox' },
    ];

    const SettingsView = {
        init() {
            this.container = document.getElementById(VIEW_ID);
            if (!this.container) {
                console.error(`[SettingsView] Container element with ID '${VIEW_ID}' not found.`);
                return;
            }

            if (!isInitialized) {
                console.log('[SettingsView] Initializing...');

                // View Change Listener
                document.addEventListener('v2:viewchange', (e) => {
                    if (e.detail && e.detail.view === 'settings') {
                        this.render();
                    }
                });

                // Language Change Listener (Standard DOM event from Legacy Shim)
                const legacySelect = document.getElementById('languageSelect');
                if (legacySelect) {
                    legacySelect.addEventListener('change', () => {
                        // Re-render if currently visible to apply translations
                        if (this.isVisible()) {
                            this.render();
                        }
                    });
                }

                // Also listen for custom v2 event if invoked programmatically (e.g. from Sidebar)
                document.addEventListener('v2:languagechange', () => {
                    if (this.isVisible()) {
                        this.render();
                    }
                });

                isInitialized = true;
            }
        },

        isVisible() {
            return this.container && this.container.classList.contains('active');
        },

        render() {
            if (!this.container) {
                this.init();
                if (!this.container) return;
            }

            // Generate HTML (Always regenerate to apply new translations)
            this.container.innerHTML = this.getTemplate();

            // Initialize Logic (Re-attach listeners to new DOM)
            this.attachListeners();
            this.syncFromLegacy();
            this.initTabs();
            this.initRehearsalSync();
            this.initStatusObservers();
            this.initBackupDiffSync();
            this.initLogViewerSync();
        },

        getTemplate() {
            return `
            <div class="v2-modal-header">
                <h2>${_t('settingsHeading')}</h2>
                <button class="v2-modal-close" id="v2-settings-close" aria-label="${_t('buttonClose')}">
                    <span class="icon">close</span>
                </button>
            </div>
            
            <div class="v2-settings-tabs">
                <button class="v2-tab-btn active" data-tab="general">
                    <span class="material-symbols-rounded icon">tune</span>
                    ${_t('settingsTabGeneral')}
                </button>
                <button class="v2-tab-btn" data-tab="backup">
                    <span class="material-symbols-rounded icon">backup</span>
                    ${_t('settingsTabBackup')}
                </button>
                <button class="v2-tab-btn" data-tab="data">
                    <span class="material-symbols-rounded icon">database</span>
                    ${_t('settingsTabData')}
                </button>
                <button class="v2-tab-btn" data-tab="about">
                    <span class="material-symbols-rounded icon">info</span>
                    ${_t('settingsTabAbout')}
                </button>
            </div>

            <div class="v2-settings-body">
                ${this.getGeneralTabHtml()}
                ${this.getBackupTabHtml()}
                ${this.getDataTabHtml()}
                ${this.getAboutTabHtml()}
            </div>
            <div class="v2-settings-footer">
                <button class="v2-btn v2-btn-primary" id="v2-settings-done">${_t('buttonClose')}</button>
            </div>
            
            <!-- Modals -->
            ${this.getBackupDiffModalHtml()}
            ${this.getRehearsalModalHtml()}
        `;
        },

        getGeneralTabHtml() {
            return `
            <div class="v2-settings-panel active" id="v2-panel-general">
                <h2>${_t('settingsTabGeneral')}</h2>
                
                <div class="v2-settings-card">
                    <h3>${_t('generalSectionLanguageHeading')}</h3>
                    <div class="v2-form-grid">
                        <div class="v2-form-group">
                            <label class="v2-label">${_t('languageSetting')}</label>
                            <select class="v2-select" id="v2-settings-language">
                                <option value="en">English</option>
                                <option value="de">Deutsch</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                <option value="it">Italiano</option>
                            </select>
                        </div>
                        <div class="v2-form-group">
                            <label class="v2-label">${_t('temperatureUnitSetting')}</label>
                            <select class="v2-select" id="v2-settings-temp-unit">
                                <option value="celsius">${_t('temperatureUnitCelsius')}</option>
                                <option value="fahrenheit">${_t('temperatureUnitFahrenheit')}</option>
                            </select>
                        </div>
                        <div class="v2-form-group">
                            <label class="v2-label">${_t('focusScaleSetting')}</label>
                            <select class="v2-select" id="v2-settings-focus-scale">
                                <option value="metric">${_t('focusScaleMetric')}</option>
                                <option value="imperial">${_t('focusScaleImperial')}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3>${_t('generalSectionAppearanceHeading')}</h3>
                    <div class="v2-checkbox-group">
                        <label class="v2-checkbox-row">
                            <input type="checkbox" class="v2-checkbox" id="v2-settings-dark-mode">
                            <span class="v2-label">${_t('darkModeSetting')}</span>
                        </label>
                        <label class="v2-checkbox-row">
                            <input type="checkbox" class="v2-checkbox" id="v2-settings-pink-mode">
                            <span class="v2-label">${_t('pinkModeSetting')}</span>
                        </label>
                    </div>
                    <div class="v2-form-group" style="margin-top: 1rem;">
                        <label class="v2-label">${_t('accentColorSetting')}</label>
                        <div class="v2-color-input-wrapper">
                            <input type="color" class="v2-color-input" id="v2-settings-accent-color">
                            <button class="v2-btn v2-btn-sm v2-btn-secondary" id="v2-accent-reset">${_t('buttonReset')}</button>
                        </div>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3>${_t('mountVoltageSettingsHeading')}</h3>
                    <p>${_t('mountVoltageDescription')}</p>
                    
                    <div class="v2-form-grid v2-voltage-grid">
                        
                        <!-- V-Mount -->
                        <div class="v2-voltage-card">
                            <h4>${_t('mountVoltageCardLabelV')}</h4>
                            <div class="v2-form-group">
                                <label class="v2-label v2-voltage-label-small">${_t('mountVoltageHighLabel')}</label>
                                <input type="number" class="v2-input" id="v2-volt-v-high" step="0.1" min="0">
                            </div>
                            <div class="v2-form-group" style="margin-top: 0.5rem;">
                                <label class="v2-label v2-voltage-label-small">${_t('mountVoltageLowLabel')}</label>
                                <input type="number" class="v2-input" id="v2-volt-v-low" step="0.1" min="0">
                            </div>
                        </div>

                        <!-- Gold Mount -->
                        <div class="v2-voltage-card">
                            <h4>${_t('mountVoltageCardLabelGold')}</h4>
                            <div class="v2-form-group">
                                <label class="v2-label v2-voltage-label-small">${_t('mountVoltageHighLabel')}</label>
                                <input type="number" class="v2-input" id="v2-volt-gold-high" step="0.1" min="0">
                            </div>
                             <div class="v2-form-group" style="margin-top: 0.5rem;">
                                <label class="v2-label v2-voltage-label-small">${_t('mountVoltageLowLabel')}</label>
                                <input type="number" class="v2-input" id="v2-volt-gold-low" step="0.1" min="0">
                            </div>
                        </div>

                        <!-- B-Mount -->
                        <div class="v2-voltage-card">
                            <h4>${_t('mountVoltageCardLabelB')}</h4>
                            <div class="v2-form-group">
                                <label class="v2-label v2-voltage-label-small">${_t('mountVoltageHighLabel')}</label>
                                <input type="number" class="v2-input" id="v2-volt-b-high" step="0.1" min="0">
                            </div>
                             <div class="v2-form-group" style="margin-top: 0.5rem;">
                                <label class="v2-label v2-voltage-label-small">${_t('mountVoltageLowLabel')}</label>
                                <input type="number" class="v2-input" id="v2-volt-b-low" step="0.1" min="0">
                            </div>
                        </div>
                    </div>
                     <div style="margin-top: 1rem;">
                        <button class="v2-btn v2-btn-sm v2-btn-secondary" id="v2-volt-reset">${_t('mountVoltageReset')}</button>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3>${_t('generalSectionCameraColorsHeading')}</h3>
                    <p>${_t('cameraColorSettingDescription')}</p>
                    <div class="v2-camera-colors-grid">
                        <div class="v2-color-field">
                            <label>${_t('cameraColorALabel')}</label>
                            <input type="color" class="v2-color-input" id="v2-cam-color-a">
                        </div>
                        <div class="v2-color-field">
                            <label>${_t('cameraColorBLabel')}</label>
                            <input type="color" class="v2-color-input" id="v2-cam-color-b">
                        </div>
                        <div class="v2-color-field">
                            <label>${_t('cameraColorCLabel')}</label>
                            <input type="color" class="v2-color-input" id="v2-cam-color-c">
                        </div>
                        <div class="v2-color-field">
                            <label>${_t('cameraColorDLabel')}</label>
                            <input type="color" class="v2-color-input" id="v2-cam-color-d">
                        </div>
                        <div class="v2-color-field">
                            <label>${_t('cameraColorELabel')}</label>
                            <input type="color" class="v2-color-input" id="v2-cam-color-e">
                        </div>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3>${_t('generalSectionInterfaceHeading')}</h3>
                    <p>${_t('generalSectionInterfaceHelp')}</p>
                    <div class="v2-checkbox-group">
                        <label class="v2-checkbox-row">
                             <input type="checkbox" class="v2-checkbox" id="v2-settings-high-contrast">
                             <span class="v2-label">${_t('checkboxHighContrast')}</span>
                        </label>
                        <label class="v2-checkbox-row">
                             <input type="checkbox" class="v2-checkbox" id="v2-settings-reduce-motion">
                             <span class="v2-label">${_t('checkboxReduceMotion')}</span>
                        </label>
                         <label class="v2-checkbox-row">
                             <input type="checkbox" class="v2-checkbox" id="v2-settings-relaxed-spacing">
                             <span class="v2-label">${_t('checkboxRelaxedSpacing')}</span>
                        </label>
                    </div>
                    
                    <div class="v2-form-group" style="margin-top: 1rem;">
                        <label class="v2-label">${_t('fontSizeSetting')}</label>
                        <select class="v2-select" id="v2-settings-font-size">
                            <option value="13px">Small (13px)</option>
                            <option value="14px">Medium (14px)</option>
                            <option value="15px">Large (15px)</option>
                            <option value="16px">X-Large (16px)</option>
                        </select>
                         <p class="v2-help-text">${_t('fontSizeSettingHelp')}</p>
                    </div>
                     <div class="v2-form-group">
                        <label class="v2-label">${_t('fontFamilySetting')}</label>
                        <select class="v2-select" id="v2-settings-font-family">
                            <option value="Inter, system-ui, sans-serif">Inter (Default)</option>
                            <option value="Roboto, sans-serif">Roboto</option>
                            <option value="Open Sans, sans-serif">Open Sans</option>
                            <option value="system-ui, sans-serif">System UI</option>
                        </select>
                         <p class="v2-help-text">${_t('fontFamilySettingHelp')}</p>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3>${_t('generalSectionBrandingHeading')}</h3>
                    <p>${_t('logoSettingHelp')}</p>
                    <div class="v2-branding-preview" id="v2-branding-preview" style="margin-bottom: 1rem; padding: 1rem; border: 1px dashed var(--v2-border-default); border-radius: var(--v2-radius-sm); text-align: center;">
                        <span style="color: var(--v2-text-muted);">${_t('brandingNoLogo')}</span>
                    </div>
                    <button class="v2-btn v2-btn-secondary" id="v2-btn-branding-upload">
                        <span class="icon">upload</span> ${_t('buttonUploadSvg')}
                    </button>
                    <!-- Legacy File Input is hidden and clicked via proxy -->
                </div>

                <div class="v2-settings-card">
                    <h3>${_t('documentationTrackerHeading')}</h3>
                    <p>${_t('documentationTrackerDescription')}</p>
                    <div class="v2-doc-tracker-list" id="v2-doc-tracker-list" style="margin: 1rem 0; border: 1px solid var(--v2-border-default); border-radius: var(--v2-radius-sm); min-height: 50px;">
                        <!-- Mirrored Items -->
                        <p style="padding: 1rem; color: var(--v2-text-muted); text-align: center;">${_t('documentationTrackerEmptyShort')}</p>
                    </div>
                    <button class="v2-btn v2-btn-sm v2-btn-primary" id="v2-btn-doc-tracker-add">
                        ${_t('documentationTrackerAddRelease')}
                    </button>
                </div>
            </div>
        `;
        },

        getBackupTabHtml() {
            return `
            <div class="v2-settings-panel" id="v2-panel-backup" hidden>
                <h2>${_t('settingsTabBackup')}</h2>
                
                <div class="v2-settings-card">
                    <h3>${_t('settingsBackupAutomatedHeading')}</h3>
                    <div class="v2-form-group">
                        <label class="v2-checkbox-row">
                            <input type="checkbox" class="v2-checkbox" id="v2-settings-auto-backup">
                            <span class="v2-label">${_t('checkboxAutoBackupList')}</span>
                        </label>
                    </div>
                    <div class="v2-form-group" style="margin-top: 1rem;">
                        <label class="v2-label">${_t('labelBackupRetention')}</label>
                        <input type="number" class="v2-input" id="v2-settings-backup-retention" min="1" max="50" style="max-width: 120px;">
                    </div>
                    <!-- Compare Versions (Diff) -->
                    <div style="margin-top: 1rem;">
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-backup-diff">
                            <span class="icon">compare_arrows</span>
                            ${_t('buttonCompareVersions')}
                        </button>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3>${_t('settingsBackupManualHeading')}</h3>
                    <div class="v2-form-row-inline">
                        <button class="v2-btn v2-btn-primary" id="v2-btn-backup">
                            <span class="icon">download</span>
                            ${_t('buttonDownloadBackup')}
                        </button>
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-restore">
                            <span class="icon">upload</span>
                            ${_t('buttonRestore')}
                        </button>
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-restore-rehearsal">
                            <span class="icon">science</span>
                            ${_t('buttonRestoreRehearsal')}
                        </button>
                    </div>
                </div>

                <div class="v2-settings-card" style="border-color: var(--v2-status-error);">
                    <h3 style="color: var(--v2-status-error);">${_t('settingsBackupDangerHeading')}</h3>
                    <p>${_t('settingsFactoryResetHelp')}</p>
                    <button class="v2-btn v2-btn-danger" id="v2-btn-factory-reset">
                        <span class="icon">delete_forever</span>
                        ${_t('buttonFactoryReset')}
                    </button>
                </div>
            </div>
        `;
        },

        getBackupDiffModalHtml() {
            return `
            <div class="v2-modal-backdrop" id="v2-backup-diff-modal" style="display: none;">
                <div class="v2-modal" role="dialog" aria-modal="true" style="max-width: 700px; width: 90%; max-height: 90vh; display: flex; flex-direction: column;">
                    <div class="v2-modal-header">
                        <h3>${_t('backupDiffModalTitle')}</h3>
                        <button class="v2-btn-icon" data-action="close-diff">close</button>
                    </div>
                    <div class="v2-modal-content" style="overflow-y: auto;">
                        <p style="color: var(--v2-text-secondary); margin-bottom: 1.5rem;">
                            ${_t('backupDiffModalSubtitle')}
                        </p>
                        
                        <div class="v2-form-grid">
                            <div class="v2-form-group">
                                <label class="v2-label">${_t('labelBaselineVersion')}</label>
                                <select class="v2-select" id="v2-diff-primary"></select>
                            </div>
                            <div class="v2-form-group">
                                <label class="v2-label">${_t('labelComparisonVersion')}</label>
                                <select class="v2-select" id="v2-diff-secondary"></select>
                            </div>
                        </div>

                        <div id="v2-diff-summary" style="margin: 1rem 0; font-weight: 500;"></div>

                        <!-- Diff List Mirror -->
                        <div class="v2-diff-list-container" style="border: 1px solid var(--v2-border-default); border-radius: var(--v2-radius-sm); padding: 0.5rem; min-height: 100px; max-height: 300px; overflow-y: auto;">
                            <ul id="v2-diff-list" style="list-style: none; padding: 0; margin: 0;"></ul>
                            <p id="v2-diff-empty" style="text-align: center; color: var(--v2-text-muted); padding: 2rem;">
                                ${_t('backupDiffEmptyState')}
                            </p>
                        </div>

                        <div class="v2-form-group" style="margin-top: 1rem;">
                            <label class="v2-label">${_t('labelIncidentNotes')}</label>
                            <textarea class="v2-textarea" id="v2-diff-notes" rows="3" placeholder="${_t('placeholderIncidentNotes')}"></textarea>
                        </div>
                    </div>
                    <div class="v2-modal-footer">
                        <button class="v2-btn v2-btn-secondary" data-action="close-diff">${_t('buttonClose')}</button>
                        <button class="v2-btn v2-btn-primary" id="v2-btn-diff-export">${_t('buttonExportLog')}</button>
                    </div>
                </div>
            </div>
        `;
        },

        getDataTabHtml() {
            return `
            <div class="v2-settings-panel" id="v2-panel-data" hidden>
                <h2>${_t('settingsTabData')}</h2>
                
                <div class="v2-settings-card">
                    <h3>${_t('settingsDataStorageStatusHeading')}</h3>
                    <div class="v2-key-value-list">
                         <div class="v2-kv-item">
                            <span class="v2-kv-label">${_t('labelLatestProjectSave')}</span>
                            <span class="v2-kv-value" id="v2-status-last-project">---</span>
                        </div>
                        <div class="v2-kv-item">
                            <span class="v2-kv-label">${_t('labelLatestAutoBackup')}</span>
                            <span class="v2-kv-value" id="v2-status-last-auto">---</span>
                        </div>
                         <div class="v2-kv-item">
                            <span class="v2-kv-label">${_t('labelLatestFullBackup')}</span>
                            <span class="v2-kv-value" id="v2-status-last-full">---</span>
                        </div>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3>${_t('settingsDataPersistenceHeading')}</h3>
                    <p>${_t('textManageLocalData')}</p>
                    <div class="v2-form-row-inline" style="margin-bottom: 1rem;">
                        <button class="v2-btn v2-btn-primary" id="v2-btn-data-backup">
                            <span class="icon">download</span>
                            ${_t('buttonDownloadFullBackup')}
                        </button>
                    </div>
                    <p>${_t('textRequestPersistence')}</p>
                    <button class="v2-btn v2-btn-secondary" id="v2-btn-storage-persist">
                        ${_t('buttonRequestPersistence')}
                    </button>
                    <p id="v2-status-persistence" style="margin-top: 0.5rem; color: var(--v2-text-secondary); font-size: 0.9rem;">
                        ${_t('statusCheckingPersistence')}
                    </p>
                </div>

                <div class="v2-settings-card">
                    <h3>${_t('settingsDataLoggingHeading')}</h3>
                    <div class="v2-form-grid">
                        <div class="v2-form-group">
                            <label class="v2-label">${_t('labelLogLevel')}</label>
                            <select class="v2-select" id="v2-settings-log-level">
                                <option value="all">${_t('optionLogLevelAll')}</option>
                                <option value="info">${_t('optionLogLevelInfo')}</option>
                                <option value="warn">${_t('optionLogLevelWarn')}</option>
                                <option value="error">${_t('optionLogLevelError')}</option>
                            </select>
                        </div>
                        <div class="v2-form-group">
                            <label class="v2-label">${_t('labelHistoryLimit')}</label>
                            <input type="number" class="v2-input" id="v2-settings-log-history" min="50" max="2000" step="50">
                        </div>
                         <div class="v2-form-group" style="grid-column: span 2;">
                            <label class="v2-label">${_t('labelNamespaceFilter')}</label>
                            <input type="search" class="v2-input" id="v2-settings-log-filter" placeholder="e.g. storage, backup">
                        </div>
                    </div>
                    <div class="v2-checkbox-group" style="margin-top: 1rem;">
                        <label class="v2-checkbox-row">
                            <input type="checkbox" class="v2-checkbox" id="v2-settings-log-console">
                            <span class="v2-label">${_t('checkboxMirrorConsole')}</span>
                        </label>
                        <label class="v2-checkbox-row">
                            <input type="checkbox" class="v2-checkbox" id="v2-settings-log-capture">
                            <span class="v2-label">${_t('checkboxCaptureConsole')}</span>
                        </label>
                        <label class="v2-checkbox-row">
                            <input type="checkbox" class="v2-checkbox" id="v2-settings-log-errors">
                            <span class="v2-label">${_t('checkboxCaptureGlobalErrors')}</span>
                        </label>
                        <label class="v2-checkbox-row">
                            <input type="checkbox" class="v2-checkbox" id="v2-settings-log-persist">
                            <span class="v2-label">${_t('checkboxPersistSession')}</span>
                        </label>
                    </div>
                    
                    <!-- Log Viewer Mirror -->
                    <div class="v2-log-viewer" style="margin-top: 1rem; border: 1px solid var(--v2-border-default); background: var(--v2-surface-muted); height: 200px; overflow-y: auto; padding: 0.5rem; font-family: monospace; font-size: 0.85rem; border-radius: var(--v2-radius-sm);">
                        <ol id="v2-log-history-list" style="margin: 0; padding-left: 1.5rem;">
                            <!-- Mirrored Items -->
                        </ol>
                         <p id="v2-log-empty" style="text-align: center; color: var(--v2-text-muted); display: none;">${_t('textNoLogEntries')}</p>
                    </div>

                    <div class="v2-form-row" style="margin-top: 1rem;">
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-export-log">${_t('buttonExportLog')}</button>
                    </div>
                </div>
            </div>
        `;
        },

        getAboutTabHtml() {
            // We'll read the version from legacy
            const legacyVersion = document.getElementById('aboutVersion')?.textContent || 'v2.0';

            return `
            <div class="v2-settings-panel" id="v2-panel-about" hidden>
                <h2>${_t('settingsTabAbout')}</h2>
                <div class="v2-settings-card">
                    <h3>${_t('appTitle')}</h3>
                    <p class="v2-text-lead" style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">${legacyVersion}</p>
                    <p>${_t('appCreator')}</p>
                    
                    <div class="v2-form-row-inline" style="margin-top: 1.5rem;">
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-support">${_t('buttonSupport')}</button>
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-bug">${_t('buttonReportBug')}</button>
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-feature">${_t('buttonSuggestFeature')}</button>
                    </div>
                </div>
            </div>
        `;
        },

        getRehearsalModalHtml() {
            return `
            <div class="v2-modal-backdrop" id="v2-rehearsal-modal" style="display: none;">
                <div class="v2-modal" role="dialog" aria-modal="true" style="max-width: 600px; width: 90%;">
                    <div class="v2-modal-header">
                        <h3>${_t('buttonRestoreRehearsal')}</h3>
                        <button class="v2-btn-icon" data-action="close-rehearsal">close</button>
                    </div>
                    <div class="v2-modal-content">
                        <p style="color: var(--v2-text-secondary); margin-bottom: 1.5rem;">
                            ${_t('rehearsalModalSubtitle')}
                        </p>

                        <!-- Source Selection -->
                        <div class="v2-form-group">
                            <label class="v2-label">${_t('rehearsalModalSourceLabel')}</label>
                            <div class="v2-radio-group" id="v2-rehearsal-mode-group">
                                <label class="v2-radio-label">
                                    <input type="radio" class="v2-radio" name="v2RehearsalMode" value="backup" checked>
                                    ${_t('rehearsalModalSourceBackup')}
                                </label>
                                <label class="v2-radio-label">
                                    <input type="radio" class="v2-radio" name="v2RehearsalMode" value="project">
                                    ${_t('rehearsalModalSourceProject')}
                                </label>
                            </div>
                        </div>

                        <!-- File Input -->
                        <div class="v2-form-group" style="margin-top: 1.5rem;">
                            <label class="v2-label">${_t('labelSelectFile')}</label>
                            <div style="display: flex; gap: 1rem; align-items: center;">
                                <button class="v2-btn v2-btn-secondary" id="v2-rehearsal-browse-btn">
                                    <span class="icon">folder_open</span>
                                    ${_t('buttonChooseFile')}
                                </button>
                                <span id="v2-rehearsal-filename" style="color: var(--v2-text-secondary); font-style: italic;">${_t('labelNoFileSelected')}</span>
                            </div>
                        </div>

                        <!-- Legacy Status Mirror -->
                        <div id="v2-rehearsal-status" style="margin-top: 1rem; font-weight: 500;"></div>

                        <!-- Table Mirror -->
                        <div style="margin-top: 1.5rem; border: 1px solid var(--v2-border-default); border-radius: var(--v2-radius-md); overflow: hidden;">
                            <table class="v2-table" style="width: 100%;">
                                <thead style="background: var(--v2-surface-muted);">
                                    <tr>
                                        <th style="padding: 0.75rem; text-align: left;">${_t('tableHeaderData')}</th>
                                        <th style="padding: 0.75rem; text-align: left;">${_t('tableHeaderDifference')}</th>
                                    </tr>
                                </thead>
                                <tbody id="v2-rehearsal-table-body">
                                    <!-- Mirrored rows will go here -->
                                    <tr><td colspan="2" style="padding: 1rem; text-align: center; color: var(--v2-text-muted);">Load a file to compare...</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="v2-modal-footer" style="margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 0.5rem;">
                            <!-- Abort is effectively Close, triggers restoreRehearsalAbort -->
                            <button class="v2-btn v2-btn-secondary" id="v2-rehearsal-abort-btn">Abort Rehearsal</button>
                            <button class="v2-btn v2-btn-primary" id="v2-rehearsal-proceed-btn">Resume Restore</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        },

        attachListeners() {
            // Tab Switching
            const tabs = this.container.querySelectorAll('.v2-tab-btn');
            const panels = this.container.querySelectorAll('.v2-settings-panel');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Deactivate all
                    tabs.forEach(t => t.classList.remove('active'));
                    panels.forEach(p => p.hidden = true);

                    // Activate clicked
                    tab.classList.add('active');
                    const targetId = `v2-panel-${tab.dataset.tab}`;
                    const target = document.getElementById(targetId);
                    if (target) target.hidden = false;
                });
            });

            // Sync Logic for Map Items
            SETTINGS_MAP.forEach(item => {
                const v2El = document.getElementById(item.v2);
                if (!v2El) return; // Element not found (e.g. might be in a hidden modal not yet rendered, or just missing)

                const legacyEl = document.getElementById(item.legacy);
                if (!legacyEl) {
                    console.warn(`[SettingsView] Legacy element '${item.legacy}' not found.`);
                    return;
                }

                v2El.addEventListener('change', (e) => {
                    if (item.type === 'checkbox') {
                        legacyEl.checked = e.target.checked;
                    } else {
                        legacyEl.value = e.target.value;
                    }

                    // Trigger events on legacy element
                    legacyEl.dispatchEvent(new Event('change', { bubbles: true }));
                    legacyEl.dispatchEvent(new Event('input', { bubbles: true }));

                    // Trigger Save for specific elements that require application via applySettingsAndCloseDialog
                    const SAVE_REQUIRED_IDS = [
                        'settingsLanguage',
                        'settingsTemperatureUnit',
                        'settingsFocusScale',
                        'settingsFontSize',
                        'settingsFontFamily',
                        'mountVoltageVHigh', 'mountVoltageVLow',
                        'mountVoltageGoldHigh', 'mountVoltageGoldLow',
                        'mountVoltageBHigh', 'mountVoltageBLow'
                    ];

                    if (SAVE_REQUIRED_IDS.includes(item.legacy)) {
                        const saveBtn = document.getElementById('settingsSave');
                        if (saveBtn) saveBtn.click();
                    }
                });
            });

            // Special handling for Logo Upload (File Input)
            const legacyLogo = document.getElementById('settingsLogo');
            if (legacyLogo) {
                legacyLogo.addEventListener('change', () => {
                    const saveBtn = document.getElementById('settingsSave');
                    if (saveBtn) saveBtn.click();
                });
            }

            // Button Actions (Proxy to Legacy)
            const bindClick = (v2Id, legacyId) => {
                const v2Btn = document.getElementById(v2Id);
                const legacyBtn = document.getElementById(legacyId);
                if (v2Btn && legacyBtn) {
                    v2Btn.addEventListener('click', () => legacyBtn.click());
                }
            };

            bindClick('v2-btn-reset-accent', 'accentColorReset');
            bindClick('v2-btn-reset-voltages', 'mountVoltageReset');
            bindClick('v2-btn-backup', 'backupSettings');
            bindClick('v2-btn-restore', 'restoreSettings');
            bindClick('v2-btn-factory-reset', 'factoryResetButton');
            bindClick('v2-btn-data-backup', 'storageBackupNow');
            bindClick('v2-btn-storage-persist', 'storagePersistenceRequest');
            bindClick('v2-btn-export-log', 'loggingExportBtn');
            bindClick('v2-btn-support', 'supportLink');
            bindClick('v2-btn-bug', 'reportBugLink');
            bindClick('v2-btn-feature', 'suggestFeatureLink');
            bindClick('v2-btn-local-font', 'localFontsButton');
            bindClick('v2-btn-branding-upload', 'settingsLogo');
            bindClick('v2-btn-doc-tracker-add', 'documentationTrackerAddRelease');

            // Backup Diff Button
            const diffBtn = document.getElementById('v2-btn-backup-diff');
            if (diffBtn) {
                diffBtn.addEventListener('click', () => {
                    // 1. Open Modal
                    const modal = document.getElementById('v2-backup-diff-modal');
                    if (modal) modal.style.display = 'flex';
                    // 2. Trigger Legacy Toggle to ensure hidden sections are initialized if needed
                    const legBtn = document.getElementById('backupDiffToggleButton');
                    if (legBtn) legBtn.click();
                });
            }

            // Close Diff Modal
            const closeDiffBtns = this.container.querySelectorAll('[data-action="close-diff"]');
            closeDiffBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const modal = document.getElementById('v2-backup-diff-modal');
                    if (modal) modal.style.display = 'none';
                    // Trigger legacy toggle close (optional, to keep state synced)
                    const legBtn = document.getElementById('backupDiffToggleButton');
                    if (legBtn) legBtn.click();
                });
            });

            // Restore Rehearsal Modal
            const rehearsalTrigger = document.getElementById('v2-btn-restore-rehearsal');
            const rehearsalModal = document.getElementById('v2-rehearsal-modal');
            const closeRehearsalBtns = this.container.querySelectorAll('[data-action="close-rehearsal"]');

            if (rehearsalTrigger && rehearsalModal) {
                rehearsalTrigger.addEventListener('click', () => {
                    // Click legacy button to init logic
                    const legacyBtn = document.getElementById('restoreRehearsalButton');
                    if (legacyBtn) legacyBtn.click();

                    rehearsalModal.style.display = 'flex';
                });
            }

            closeRehearsalBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (rehearsalModal) rehearsalModal.style.display = 'none';
                    const legacyClose = document.getElementById('restoreRehearsalClose');
                    if (legacyClose) legacyClose.click();
                });
            });
        },

        syncFromLegacy() {
            SETTINGS_MAP.forEach(item => {
                const v2El = document.getElementById(item.v2);
                const legacyEl = document.getElementById(item.legacy);

                if (v2El && legacyEl) {
                    if (item.type === 'checkbox') {
                        v2El.checked = legacyEl.checked;
                    } else if (item.type === 'value' || item.type === 'color') {
                        v2El.value = legacyEl.value;
                    }
                }
            });
        },

        initStatusObservers() {
            const obsConfigs = [
                { legacyId: 'storageStatusLastProjectValue', v2Id: 'v2-status-last-project' },
                { legacyId: 'storageStatusLastAutoBackupValue', v2Id: 'v2-status-last-auto' },
                { legacyId: 'storageStatusLastFullBackupValue', v2Id: 'v2-status-last-full' },
                { legacyId: 'storagePersistenceStatus', v2Id: 'v2-status-persistence' }
            ];

            const observer = new MutationObserver(() => {
                obsConfigs.forEach(cfg => {
                    const leg = document.getElementById(cfg.legacyId);
                    const v2 = document.getElementById(cfg.v2Id);
                    if (leg && v2) {
                        v2.textContent = leg.textContent;
                    }
                });
            });

            obsConfigs.forEach(cfg => {
                const leg = document.getElementById(cfg.legacyId);
                if (leg) {
                    observer.observe(leg, { childList: true, characterData: true, subtree: true });
                    const v2 = document.getElementById(cfg.v2Id);
                    if (v2) v2.textContent = leg.textContent;
                }
            });

            // Branding & Doc Tracker
            const extraObsConfigs = [
                { legacyId: 'localFontsStatus', v2Id: 'v2-status-local-font' }
            ];
            const extraObserver = new MutationObserver(() => {
                extraObsConfigs.forEach(cfg => {
                    const leg = document.getElementById(cfg.legacyId);
                    const v2 = document.getElementById(cfg.v2Id);
                    if (leg && v2) v2.textContent = leg.textContent;
                });
            });
            extraObsConfigs.forEach(cfg => {
                const leg = document.getElementById(cfg.legacyId);
                if (leg) extraObserver.observe(leg, { childList: true, characterData: true, subtree: true });
            });

            // Branding Preview
            const legacyLogoPreview = document.getElementById('settingsLogoPreview');
            const v2LogoPreview = document.getElementById('v2-branding-preview');
            if (legacyLogoPreview && v2LogoPreview) {
                const logoObs = new MutationObserver(() => {
                    if (legacyLogoPreview.hidden || legacyLogoPreview.innerHTML.trim() === '') {
                        v2LogoPreview.innerHTML = '<span style="color: var(--v2-text-muted);">No custom logo set</span>';
                    } else {
                        v2LogoPreview.innerHTML = legacyLogoPreview.innerHTML;
                        const img = v2LogoPreview.querySelector('img, svg');
                        if (img) {
                            img.style.maxWidth = '100%';
                            img.style.height = 'auto';
                        }
                    }
                });
                logoObs.observe(legacyLogoPreview, { childList: true, attributes: true, subtree: true });
                if (!legacyLogoPreview.hidden && legacyLogoPreview.innerHTML.trim() !== '') {
                    v2LogoPreview.innerHTML = legacyLogoPreview.innerHTML;
                }
            }

            // Doc Tracker
            const legacyDocList = document.getElementById('documentationTrackerList');
            const v2DocList = document.getElementById('v2-doc-tracker-list');
            if (legacyDocList && v2DocList) {
                const docObs = new MutationObserver(() => {
                    if (legacyDocList.children.length === 0) {
                        v2DocList.innerHTML = '<p style="padding: 1rem; color: var(--v2-text-muted); text-align: center;">No releases tracked.</p>';
                    } else {
                        v2DocList.innerHTML = '';
                        Array.from(legacyDocList.children).forEach(item => {
                            const clone = item.cloneNode(true);
                            clone.style.padding = '0.5rem';
                            clone.style.borderBottom = '1px solid var(--v2-border-subtle)';
                            v2DocList.appendChild(clone);
                        });
                    }
                });
                docObs.observe(legacyDocList, { childList: true, subtree: true });
            }
        },

        initTabs() {
            const activeTab = this.container.querySelector('.v2-tab-btn.active');
            if (activeTab) {
                const targetId = `v2-panel-${activeTab.dataset.tab}`;
                const targetPanel = document.getElementById(targetId);
                if (targetPanel) targetPanel.hidden = false;
            }
        },

        initRehearsalSync() {
            const v2Radios = document.querySelectorAll('input[name="v2RehearsalMode"]');
            const legacyRadios = document.getElementsByName('restoreRehearsalMode');

            v2Radios.forEach(v2Radio => {
                v2Radio.addEventListener('change', () => {
                    legacyRadios.forEach(legRadio => {
                        if (legRadio.value === v2Radio.value) {
                            legRadio.checked = true;
                            legRadio.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    });
                });
            });

            const browseBtn = document.getElementById('v2-rehearsal-browse-btn');
            const legacyBrowse = document.getElementById('restoreRehearsalBrowse');
            if (browseBtn && legacyBrowse) {
                browseBtn.addEventListener('click', () => legacyBrowse.click());
            }

            const proceedBtn = document.getElementById('v2-rehearsal-proceed-btn');
            const abortBtn = document.getElementById('v2-rehearsal-abort-btn');

            if (proceedBtn) {
                proceedBtn.addEventListener('click', () => {
                    // FIXED ID: restoreRehearsalProceed (not Button)
                    const legProceed = document.getElementById('restoreRehearsalProceed');
                    if (legProceed) legProceed.click();
                    document.getElementById('v2-rehearsal-modal').style.display = 'none';
                });
            }
            if (abortBtn) {
                abortBtn.addEventListener('click', () => {
                    // FIXED ID: restoreRehearsalAbort (not Button)
                    const legAbort = document.getElementById('restoreRehearsalAbort');
                    if (legAbort) legAbort.click();
                });
            }

            // Sync Table
            const legacyTableBody = document.getElementById('restoreRehearsalTableBody');
            const v2TableBody = document.getElementById('v2-rehearsal-table-body');
            const legacyFilename = document.getElementById('restoreRehearsalFileName');
            const v2Filename = document.getElementById('v2-rehearsal-filename');
            const legacyProceedBtn = document.getElementById('restoreRehearsalProceed');

            if (legacyTableBody && v2TableBody) {
                const observer = new MutationObserver(() => {
                    v2TableBody.innerHTML = '';
                    Array.from(legacyTableBody.children).forEach(row => {
                        const cells = row.querySelectorAll('td');
                        if (cells.length >= 4) {
                            const metric = cells[0].textContent;
                            const diff = cells[3].innerHTML;
                            const newRow = document.createElement('tr');
                            newRow.innerHTML = `
                            <td style="padding: 0.75rem;"><strong>${metric}</strong></td>
                            <td style="padding: 0.75rem;">${diff}</td>
                        `;
                            v2TableBody.appendChild(newRow);
                        }
                    });

                    if (proceedBtn && legacyProceedBtn) {
                        proceedBtn.disabled = legacyProceedBtn.disabled;
                        if (legacyProceedBtn.style.display === 'none') {
                            proceedBtn.style.display = 'none';
                        } else {
                            proceedBtn.style.display = 'inline-block';
                        }
                    }
                });

                observer.observe(legacyTableBody, { childList: true, subtree: true });

                if (legacyProceedBtn) {
                    const btnObserver = new MutationObserver(() => {
                        if (proceedBtn) {
                            proceedBtn.disabled = legacyProceedBtn.disabled;
                            if (legacyProceedBtn.style.display === 'none') {
                                proceedBtn.style.display = 'none';
                            } else {
                                proceedBtn.style.display = 'inline-block';
                            }
                        }
                    });
                    btnObserver.observe(legacyProceedBtn, { attributes: true });

                    // Initial Sync
                    if (proceedBtn) {
                        proceedBtn.disabled = legacyProceedBtn.disabled;
                        if (legacyProceedBtn.style.display === 'none') {
                            proceedBtn.style.display = 'none';
                        } else {
                            proceedBtn.style.display = 'inline-block';
                        }
                    }
                }
            }

            if (legacyFilename && v2Filename) {
                const observer = new MutationObserver(() => {
                    v2Filename.textContent = legacyFilename.textContent;
                });
                observer.observe(legacyFilename, { childList: true, characterData: true, subtree: true });
            }
        },

        initBackupDiffSync() {
            // Dropdowns
            const v2Primary = document.getElementById('v2-diff-primary');
            const v2Secondary = document.getElementById('v2-diff-secondary');
            const legPrimary = document.getElementById('backupDiffPrimary');
            const legSecondary = document.getElementById('backupDiffSecondary');

            const syncSelects = () => {
                if (v2Primary && legPrimary) {
                    v2Primary.innerHTML = legPrimary.innerHTML;
                    v2Primary.value = legPrimary.value;
                }
                if (v2Secondary && legSecondary) {
                    v2Secondary.innerHTML = legSecondary.innerHTML;
                    v2Secondary.value = legSecondary.value;
                }
            };

            // Initial sync
            syncSelects();

            // Observe dropdowns
            if (legPrimary && legSecondary) {
                const obs = new MutationObserver(syncSelects);
                obs.observe(legPrimary, { childList: true });
                obs.observe(legSecondary, { childList: true });
            }

            // Bind V2 change to Legacy
            if (v2Primary) {
                v2Primary.addEventListener('change', () => {
                    if (legPrimary) {
                        legPrimary.value = v2Primary.value;
                        legPrimary.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                });
            }
            if (v2Secondary) {
                v2Secondary.addEventListener('change', () => {
                    if (legSecondary) {
                        legSecondary.value = v2Secondary.value;
                        legSecondary.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                });
            }

            // Sync Summary & List
            const legSummary = document.getElementById('backupDiffSummary');
            const v2Summary = document.getElementById('v2-diff-summary');
            if (legSummary && v2Summary) {
                const obs = new MutationObserver(() => { v2Summary.innerHTML = legSummary.innerHTML; });
                obs.observe(legSummary, { childList: true, subtree: true });
            }

            const legList = document.getElementById('backupDiffList');
            const v2List = document.getElementById('v2-diff-list');
            if (legList && v2List) {
                const obs = new MutationObserver(() => {
                    v2List.innerHTML = legList.innerHTML;
                    // Adjust styles if needed
                    Array.from(v2List.querySelectorAll('li')).forEach(li => {
                        li.style.padding = '0.5rem';
                        li.style.borderBottom = '1px solid var(--v2-border-subtle)';
                    });
                });
                obs.observe(legList, { childList: true, subtree: true });
            }

            // Bind Export
            const v2Export = document.getElementById('v2-btn-diff-export');
            const legExport = document.getElementById('backupDiffExport');
            if (v2Export && legExport) {
                v2Export.addEventListener('click', () => legExport.click());
            }

            // Sync Notes
            const v2Notes = document.getElementById('v2-diff-notes');
            const legNotes = document.getElementById('backupDiffNotes');
            if (v2Notes && legNotes) {
                // Initial
                v2Notes.value = legNotes.value;

                // Bind V2 -> Legacy
                v2Notes.addEventListener('input', () => {
                    legNotes.value = v2Notes.value;
                    legNotes.dispatchEvent(new Event('input', { bubbles: true }));
                });

                // Bind Legacy -> V2 (if changed by reset)
                const obs = new MutationObserver(() => {
                    if (document.activeElement !== v2Notes) {
                        v2Notes.value = legNotes.value;
                    }
                });
                obs.observe(legNotes, { attributes: true, attributeFilter: ['value'] }); // Note: value attribute only updates if set via setAttribute, rarely used for textareas. Logic reliance on input events is safer.

                // Fallback polling or event listener on legacy if needed, but usually Notes are one-way user input.
                legNotes.addEventListener('input', () => {
                    if (document.activeElement !== v2Notes) {
                        v2Notes.value = legNotes.value;
                    }
                });
            }
        },

        initLogViewerSync() {
            // Sync Log List
            const legList = document.getElementById('loggingHistory');
            const v2List = document.getElementById('v2-log-history-list');

            if (legList && v2List) {
                const obs = new MutationObserver(() => {
                    v2List.innerHTML = legList.innerHTML;
                    // Style adjustments for V2 monospace look
                    Array.from(v2List.querySelectorAll('li')).forEach(li => {
                        li.style.padding = '0.25rem 0';
                        li.style.borderBottom = '1px dashed var(--v2-border-subtle)';
                    });
                });
                obs.observe(legList, { childList: true, subtree: true });
                // Initial
                v2List.innerHTML = legList.innerHTML;
            }
        }
    };

    // Export to global for bootstrap
    if (typeof window !== 'undefined') {
        window.cineSettingsView = SettingsView;
    }

})(typeof window !== 'undefined' ? window : this);
