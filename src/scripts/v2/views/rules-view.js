/**
 * Cine Power Planner V2 - Auto Gear Rules View
 * ============================================
 * Manages the "Auto Gear Rules" view in the V2 UI.
 */

(function (global) {
    'use strict';

    // =====================
    // CONFIGURATION
    // =====================
    const VIEW_ID = 'view-rules';

    // =====================
    // CONSTANTS
    // =====================
    const SCENARIOS = [
        'Indoor', 'Outdoor', 'Studio', 'Tripod', 'Handheld', 'Easyrig',
        'Cine Saddle', 'Steadybag', 'Dolly', 'Slider', 'Steadicam',
        'Gimbal', 'Trinity', 'Rollcage', 'Car Mount', 'Technocrane',
        'Crane', 'Jib', 'Ultimate Arm', 'Russian Arm', 'Special'
    ];

    const CREW_ROLES = [
        'DoP', '1st AC', '2nd AC', 'Camera Operator', 'DIT', 'Data Wrangler',
        'VTR/Playback', 'Gaffer', 'Best Boy', 'Key Grip', 'Grip',
        'Sound Mixer', 'Boom Operator', 'PA', 'Director', 'Producer',
        'Script Supervisor', 'Make-up Artist', 'Production Designer'
    ];

    // =====================
    // STATE
    // =====================
    let isInitialized = false;

    // =====================
    // HELPER: SAFE COLLECT
    // =====================
    function safeCollectKeys(obj) {
        return (obj && typeof obj === 'object') ? Object.keys(obj).sort() : [];
    }

    function safeCollectCall(fnName, arg) {
        if (typeof window[fnName] === 'function') {
            try {
                const res = window[fnName](arg);
                // If the result is array of objects {value, label}, map to value
                if (Array.isArray(res) && res.length > 0 && typeof res[0] === 'object') {
                    return res.map(o => o.value);
                }
                return Array.isArray(res) ? res : [];
            } catch (e) {
                console.warn(`[RulesView] Error calling ${fnName}`, e);
                return [];
            }
        }
        return [];
    }

    function _t(key) {
        if (typeof window !== 'undefined' && window.texts) {
            const langSelect = document.getElementById('languageSelect');
            const lang = (langSelect && langSelect.value) ||
                (typeof window.currentLanguage === 'string' && window.currentLanguage) ||
                'en';

            const dict = window.texts[lang] || window.texts['en'];

            if (dict) {
                return key.split('.').reduce((o, i) => (o ? o[i] : null), dict) || key;
            }
        }
        return key;
    }


    // =====================
    // PUBLIC API
    // =====================
    const RulesView = {
        container: null,

        init() {
            this.container = document.getElementById(VIEW_ID);
            if (!this.container) {
                console.error(`[RulesView] Container element with ID '${VIEW_ID}' not found.`);
                return;
            }

            if (!isInitialized) {
                console.log('[RulesView] Initializing...');
                document.addEventListener('v2:viewchange', (e) => {
                    if (e.detail && e.detail.view === 'rules') {
                        this.render();
                    }
                });
                isInitialized = true;
                console.log('[RulesView] Initialized');
            }
        },

        render() {
            if (!this.container) {
                this.init();
                if (!this.container) return;
            }

            const header = `
                <div class="rules-header">
                    <div class="rules-title">
                        <h1>${_t('rulesViewTitle')}</h1>
                        <p>${_t('rulesViewSubtitle')}</p>
                    </div>
                    <div class="rules-header-actions">
                         ${this.renderToolbar()}
                         <button class="v2-btn v2-btn-primary" id="btn-add-rule">
                            <span class="icon">add</span>
                            <span>${_t('buttonAddRule')}</span>
                        </button>
                    </div>
                </div>
                ${this.renderDefaultsSection()}
            `;

            let rulesHtml = '<div class="rules-list">';
            const rules = (window.getAutoGearRules && typeof window.getAutoGearRules === 'function')
                ? window.getAutoGearRules()
                : [];

            if (rules.length === 0) {
                rulesHtml += `
                    <div class="rule-empty-state">
                        <h3>${_t('rulesEmptyTitle')}</h3>
                        <p>${_t('rulesEmptyText')}</p>
                    </div>
                `;
            } else {
                rules.forEach(rule => {
                    const conditionCount = this.countConditions(rule);
                    const addCount = Array.isArray(rule.add) ? rule.add.length : 0;

                    rulesHtml += `
                        <div class="rule-card" data-rule-id="${rule.id}">
                             <div class="rule-status">
                                <label class="rule-toggle">
                                    <input type="checkbox" ${rule.enabled !== false ? 'checked' : ''} disabled>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="rule-content">
                                <div class="rule-header">
                                    <h3 class="rule-name">${this.escapeHtml(rule.label) || 'Untitled Rule'}</h3>
                                    ${rule.always ? `<span class="v2-badge v2-badge-primary">${_t('ruleBadgeAlways')}</span>` : ''}
                                </div>
                                <div class="rule-conditions">
                                    <span class="condition-tag"><strong>${conditionCount}</strong> ${_t('ruleTagConditions')}</span>
                                    <span class="condition-tag"><strong>${addCount}</strong> ${_t('ruleTagItemsAdded')}</span>
                                </div>
                            </div>
                            <div class="rule-actions">
                                <button class="v2-btn v2-btn-icon v2-btn-ghost btn-edit-rule" title="${_t('buttonEdit')}">
                                    <span class="icon">edit</span>
                                </button>
                                <button class="v2-btn v2-btn-icon v2-btn-ghost btn-delete-rule" title="${_t('buttonDelete')}">
                                    <span class="icon">delete</span>
                                </button>
                            </div>
                        </div>
                    `;
                });
            }
            rulesHtml += '</div>';

            this.container.innerHTML = header + rulesHtml;
            this.attachListeners();
        },

        countConditions(rule) {
            if (!rule) return 0;
            let count = 0;
            if (rule.always) count++;
            ['scenarios', 'camera', 'mattebox', 'monitor', 'tripodHeadBrand', 'tripodBowl', 'tripodTypes', 'crewPresent'].forEach(key => {
                if (rule[key] && rule[key].length > 0) count += rule[key].length;
            });
            return count;
        },

        attachListeners() {
            const addBtn = this.container.querySelector('#btn-add-rule');
            if (addBtn) addBtn.onclick = () => this.showAddRuleModal();

            this.container.querySelectorAll('.btn-edit-rule').forEach(btn => {
                btn.onclick = (e) => {
                    const card = e.target.closest('.rule-card');
                    this.showEditRuleModal(card.dataset.ruleId);
                };
            });

            this.container.querySelectorAll('.btn-delete-rule').forEach(btn => {
                btn.onclick = (e) => {
                    const card = e.target.closest('.rule-card');
                    if (confirm(_t('confirmDeleteRule'))) {
                        this.deleteRule(card.dataset.ruleId);
                    }
                };
            });
        };
    });

    // Defaults (using event delegation or direct bind since they are static in render)
    this.container.querySelectorAll('.default-monitor-select').forEach(select => {
        select.onchange = (e) => {
            const key = e.target.dataset.key;
            const val = e.target.value;
            if (window.setAutoGearDefault) {
                window.setAutoGearDefault(key, val);
            } else {
                localStorage.setItem('auto_gear_default_' + key, val);
            }
        };
    });

    const exportBtn = this.container.querySelector('#btn-export-rules');
    if (exportBtn) exportBtn.onclick = () => this.exportRules();

    const importBtn = this.container.querySelector('#btn-import-rules');
    if (importBtn) importBtn.onclick = () => this.triggerImport();

    const resetBtn = this.container.querySelector('#btn-reset-rules');
    if (resetBtn) resetBtn.onclick = () => this.resetRules();
},

    exportRules() {
    if (window.exportAutoGearPresets) {
        window.exportAutoGearPresets();
    } else {
        console.warn('[RulesView] Export helper not found');
    }
},

triggerImport() {
    const input = document.getElementById('autoGearImportInput');
    if (input) input.click();
    else {
        // Fallback: create temporary input
        const tempInput = document.createElement('input');
        tempInput.type = 'file';
        tempInput.accept = '.json,application/json';
        tempInput.onchange = (e) => this.handleImport(e.target.files[0]);
        tempInput.click();
    }
},

handleImport(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (window.importAutoGearRules) {
                window.importAutoGearRules(data);
                this.render();
            }
        } catch (err) {
            console.error('Import failed', err);
            alert('Invalid rules file');
        }
    };
    reader.readAsText(file);
},

resetRules() {
    if (confirm(_t('confirmResetRules'))) {
        if (window.clearAutoGearDefaultsSeeded) window.clearAutoGearDefaultsSeeded(); // Logic specific to app
        // We might need to call a reset helper
        if (typeof window.resetAutoGearRules === 'function') {
            window.resetAutoGearRules();
            this.render();
        }
    }
},

deleteRule(id) {
    if (window.getAutoGearRules && window.setAutoGearRules) {
        const currentRules = window.getAutoGearRules();
        const newRules = currentRules.filter(r => r.id !== id);
        window.setAutoGearRules(newRules);
        this.render();
    }
},

showAddRuleModal() {
    this.showEditRuleModal(null);
},

renderToolbar() {
    return `
                <div class="v2-toolbar-group">
                    <button class="v2-btn v2-btn-ghost" id="btn-export-rules" title="${_t('buttonExportRules')}">
                        <span class="icon">download</span>
                    </button>
                    <button class="v2-btn v2-btn-ghost" id="btn-import-rules" title="${_t('buttonImportRules')}">
                        <span class="icon">upload</span>
                    </button>
                     <button class="v2-btn v2-btn-ghost" id="btn-reset-rules" title="${_t('buttonResetRules')}">
                        <span class="icon">restart_alt</span>
                    </button>
                </div>
            `;
},

renderDefaultsSection() {
    // Collect monitor options
    const monitors = [...safeCollectCall('collectAutoGearMonitorNames', 'monitor'), ...safeCollectCall('collectAutoGearMonitorNames', 'directorMonitor')];

    // Helper to render select options
    const renderOptions = (selected) => {
        return [
            `<option value="">${_t('optionNone')}</option>`,
            ...monitors.map(m => `<option value="${this.escapeHtml(m)}" ${m === selected ? 'selected' : ''}>${this.escapeHtml(m)}</option>`)
        ].join('');
    };

    // Get current values (fallback to localStorage if global helper missing)
    const getVal = (key) => {
        if (window.getAutoGearDefault) return window.getAutoGearDefault(key);
        return localStorage.getItem('auto_gear_default_' + key) || '';
    };

    return `
                <div class="v2-card rules-defaults-card">
                    <div class="v2-card-header">
                        <h3>${_t('headingMonitorDefaults')}</h3>
                    </div>
                    <div class="v2-card-body">
                         <div class="defaults-grid">
                            <div class="v2-form-group">
                                <label class="v2-label">${_t('labelFocusMonitor')}</label>
                                <select class="v2-select default-monitor-select" data-key="focusMonitor">
                                    ${renderOptions(getVal('focusMonitor'))}
                                </select>
                            </div>
                            <div class="v2-form-group">
                                <label class="v2-label">${_t('labelHandheldMonitor')}</label>
                                <select class="v2-select default-monitor-select" data-key="handheldMonitor">
                                    ${renderOptions(getVal('handheldMonitor'))}
                                </select>
                            </div>
                             <div class="v2-form-group">
                                <label class="v2-label">${_t('labelComboMonitor')}</label>
                                <select class="v2-select default-monitor-select" data-key="comboMonitor">
                                    ${renderOptions(getVal('comboMonitor'))}
                                </select>
                            </div>
                             <div class="v2-form-group">
                                <label class="v2-label">${_t('labelDirectorMonitor')}</label>
                                <select class="v2-select default-monitor-select" data-key="directorMonitor">
                                    ${renderOptions(getVal('directorMonitor'))}
                                </select>
                            </div>
                         </div>
                    </div>
                </div>
            `;
},

// ============================================================
//  EDIT MODAL (DEEP DIVE IMPLEMENTATION)
// ============================================================
showEditRuleModal(ruleId) {
    let rule = null;
    let isNew = true;

    if (ruleId && window.getAutoGearRules) {
        const rules = window.getAutoGearRules();
        const found = rules.find(r => r.id === ruleId);
        if (found) {
            rule = JSON.parse(JSON.stringify(found));
            isNew = false;
        }
    }

    if (!rule) {
        rule = {
            id: 'rule_' + Date.now(),
            label: '',
            enabled: true,
            always: false,
            // Context
            scenarios: [],
            scenarioMode: 'all', // 'all', 'any', 'multiplier'
            scenarioBase: '',
            scenarioFactor: 1,
            shootingDays: null,
            shootingDaysMode: 'minimum', // 'minimum', 'maximum', 'every'
            // Camera
            camera: [],
            mattebox: [],
            viewfinderExtension: [],
            // Monitor
            monitor: [], // Includes director monitors in legacy model often mixed or separates? Legacy has separate `directorMonitor` in some places but rule object usually just `monitor`. We'll rely on collection logic.
            videoDistribution: [],
            wireless: [],
            // Support
            tripodHeadBrand: [],
            tripodBowl: [],
            tripodTypes: [],
            tripodSpreader: [],
            // Crew
            crewPresent: [],
            crewAbsent: [],
            // Actions
            add: [],
            remove: []
        };
    }

    const existing = document.querySelector('.v2-modal-backdrop');
    if (existing) existing.remove();

    const backdrop = document.createElement('div');
    backdrop.className = 'v2-modal-backdrop';

    // --- DATA COLLECTION ---
    const d = window.devices || {};

    const data = {
        // Context
        scenarios: SCENARIOS,

        // Camera
        cameras: safeCollectKeys(d.cameras),
        matteboxes: safeCollectKeys(d.matteboxes), // Fallback if direct mapping exists
        // If devices.matteboxes doesn't exist, try collect functions?
        // Actually devices.accessories?.matteboxes is likely used if distinct?
        // Let's assume devices.matteboxes might not exist. If so, leave empty for now or use `safeCollectKeys(d.accessories?.matteboxes)`.
        viewfinders: safeCollectCall('getAllViewfinderTypes'),

        // Monitoring
        monitors: [...safeCollectCall('collectAutoGearMonitorNames', 'monitor'), ...safeCollectCall('collectAutoGearMonitorNames', 'directorMonitor')],
        wireless: safeCollectKeys(d.wireless), // or d.wirelessTransmitters?

        // Support
        tripodHeads: safeCollectCall('collectAutoGearTripodNames', 'tripodHead'),
        tripodBowls: safeCollectCall('collectAutoGearTripodNames', 'tripodBowl'),
        tripodTypes: safeCollectCall('collectAutoGearTripodNames', 'tripodType'),
        tripodSpreaders: safeCollectCall('collectAutoGearTripodNames', 'tripodSpreader'),

        // Crew
        crew: CREW_ROLES
    };

    // Fix for Matteboxes if not found directly
    if (data.matteboxes.length === 0 && d.matteboxes) data.matteboxes = Object.keys(d.matteboxes);

    // Gear Catalog for Add Item
    const gearNames = safeCollectCall('collectAutoGearCatalogNames');
    const categories = safeCollectCall('collectDeviceManagerCategories');
    if (!categories.length) categories.push('Power', 'Video', 'Support', 'Cabling', 'Accessories');


    // --- HTML GENERATION ---
    backdrop.innerHTML = `
                <div class="v2-modal v2-modal-lg">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${isNew ? _t('modalTitleCreateRule') : _t('modalTitleEditRule')}</h3>
                        <button type="button" class="v2-modal-close v2-btn v2-btn-ghost"><span class="icon">close</span></button>
                    </div>
                    <div class="v2-modal-body rules-modal-body">
                        <datalist id="gearCatalogList">
                            ${gearNames.map(name => `<option value="${this.escapeHtml(name)}">`).join('')}
                        </datalist>

                        <div class="rules-modal-tabs">
                            <button class="rules-tab-btn active" data-tab="general">${_t('tabGeneral')}</button>
                            <button class="rules-tab-btn" data-tab="context">${_t('tabContext')}</button>
                            <button class="rules-tab-btn" data-tab="camera">${_t('tabCamera')}</button>
                            <button class="rules-tab-btn" data-tab="monitor">${_t('tabMonitoring')}</button>
                            <button class="rules-tab-btn" data-tab="support">${_t('tabSupport')}</button>
                            <button class="rules-tab-btn" data-tab="crew">${_t('tabCrew')}</button>
                            <button class="rules-tab-btn" data-tab="actions">${_t('tabActions')}</button>
                        </div>

                        <!-- 1. GENERAL -->
                        <div class="rules-tab-content active" id="tab-general">
                            <div class="v2-form-group">
                                <label for="ruleLabel" class="v2-label">${_t('labelRuleName')}</label>
                                <input type="text" id="ruleLabel" class="v2-input" value="${this.escapeHtml(rule.label)}" placeholder="${_t('placeholderRuleName')}">
                            </div>
                            <div class="v2-form-group">
                                <label class="v2-checkbox-label">
                                    <input type="checkbox" id="ruleEnabled" ${rule.enabled !== false ? 'checked' : ''}>
                                    <span>${_t('labelRuleEnabled')}</span>
                                </label>
                            </div>
                            <div class="v2-form-group">
                                <label class="v2-checkbox-label">
                                    <input type="checkbox" id="ruleAlways" ${rule.always ? 'checked' : ''}>
                                    <span>${_t('labelRuleAlways')}</span>
                                </label>
                                <p class="v2-help-text">${_t('helpRuleAlways')}</p>
                            </div>
                        </div>

                        <!-- 2. CONTEXT -->
                        <div class="rules-tab-content" id="tab-context">
                            <div class="form-section">
                                <span class="form-section-title">${_t('sectionScenarios')}</span>
                                <div class="v2-form-group">
                                    <label class="v2-label">${_t('labelScenarioMode')}</label>
                                    <select id="ruleScenarioMode" class="v2-select">
                                        <option value="all" ${rule.scenarioMode === 'all' ? 'selected' : ''}>${_t('optionScenarioAll')}</option>
                                        <option value="any" ${rule.scenarioMode === 'any' ? 'selected' : ''}>${_t('optionScenarioAny')}</option>
                                        <option value="multiplier" ${rule.scenarioMode === 'multiplier' ? 'selected' : ''}>${_t('optionScenarioMultiplier')}</option>
                                    </select>
                                </div>
                                <div id="scenarioMultiplierConfig" style="display: ${rule.scenarioMode === 'multiplier' ? 'block' : 'none'}; padding-left: 10px; border-left: 2px solid var(--border-color);">
                                     <div class="v2-form-group">
                                        <label class="v2-label">${_t('labelScenarioFactor')}</label>
                                        <input type="number" id="ruleScenarioFactor" class="v2-input" value="${rule.scenarioFactor || 1}" min="1">
                                    </div>
                                </div>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(data.scenarios, rule.scenarios, 'scenarios')}
                                </div>
                            </div>

                            <div class="form-section">
                                <span class="form-section-title">${_t('sectionShootingDays')}</span>
                                <div class="v2-form-group">
                                    <label class="v2-label">${_t('labelShootingDaysMode')}</label>
                                    <select id="ruleShootingDaysMode" class="v2-select">
                                        <option value="minimum" ${rule.shootingDaysMode === 'minimum' ? 'selected' : ''}>${_t('optionDaysMinimum')}</option>
                                        <option value="maximum" ${rule.shootingDaysMode === 'maximum' ? 'selected' : ''}>${_t('optionDaysMaximum')}</option>
                                        <option value="every" ${rule.shootingDaysMode === 'every' ? 'selected' : ''}>${_t('optionDaysEvery')}</option>
                                    </select>
                                </div>
                                <div class="v2-form-group">
                                    <label class="v2-label">${_t('labelShootingDaysValue')}</label>
                                    <input type="number" id="ruleShootingDays" class="v2-input" value="${rule.shootingDays !== null ? rule.shootingDays : ''}" placeholder="${_t('placeholderOptional')}">
                                    <p class="v2-help-text">${_t('helpShootingDays')}</p>
                                </div>
                            </div>
                        </div>

                        <!-- 3. CAMERA -->
                        <div class="rules-tab-content" id="tab-camera">
                            <div class="form-section">
                                <span class="form-section-title">${_t('sectionCameraModels')}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(data.cameras, rule.camera, 'camera')}
                                </div>
                            </div>
                            <div class="form-section">
                                <span class="form-section-title">${_t('sectionMatteboxes')}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(data.matteboxes, rule.mattebox, 'mattebox')}
                                </div>
                            </div>
                             <div class="form-section">
                                <span class="form-section-title">${_t('sectionViewfinders')}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(data.viewfinders, rule.viewfinderExtension, 'viewfinderExtension')}
                                </div>
                            </div>
                        </div>

                        <!-- 4. MONITORING -->
                        <div class="rules-tab-content" id="tab-monitor">
                             <div class="form-section">
                                <span class="form-section-title">${_t('sectionMonitors')}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(data.monitors, rule.monitor, 'monitor')}
                                </div>
                            </div>
                             <div class="form-section">
                                <span class="form-section-title">${_t('sectionWireless')}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(data.wireless, rule.wireless, 'wireless')}
                                </div>
                            </div>
                        </div>

                        <!-- 5. SUPPORT -->
                        <div class="rules-tab-content" id="tab-support">
                            <div class="form-section">
                                <span class="form-section-title">${_t('sectionTripodHeads')}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(data.tripodHeads, rule.tripodHeadBrand, 'tripodHeadBrand')}
                                </div>
                            </div>
                            <div class="form-section">
                                <span class="form-section-title">${_t('sectionBowlSize')}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(data.tripodBowls, rule.tripodBowl, 'tripodBowl')}
                                </div>
                            </div>
                             <div class="form-section">
                                <span class="form-section-title">${_t('sectionLegTypes')}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(data.tripodTypes, rule.tripodTypes, 'tripodTypes')}
                                </div>
                            </div>
                             <div class="form-section">
                                <span class="form-section-title">${_t('sectionSpreaders')}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(data.tripodSpreaders, rule.tripodSpreader, 'tripodSpreader')}
                                </div>
                            </div>
                        </div>

                        <!-- 6. CREW -->
                        <div class="rules-tab-content" id="tab-crew">
                            <div class="form-section">
                                <span class="form-section-title">${_t('sectionCrewPresent')}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(data.crew, rule.crewPresent, 'crewPresent')}
                                </div>
                            </div>
                            <div class="form-section">
                                <span class="form-section-title">${_t('sectionCrewAbsent')}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(data.crew, rule.crewAbsent, 'crewAbsent')}
                                </div>
                            </div>
                        </div>

                        <!-- 7. ACTIONS -->
                        <div class="rules-tab-content" id="tab-actions">
                            <div class="form-section">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                    <span class="form-section-title" style="margin: 0;">${_t('sectionItemsToAdd')}</span>
                                    <button class="v2-btn v2-btn-sm v2-btn-secondary btn-show-add-item" data-type="add">${_t('buttonAddItem')}</button>
                                </div>
                                <div class="add-item-form-container" id="add-item-form-add" style="display: none; margin-bottom: 10px; padding: 10px; background: var(--bg-surface-active); border-radius: 4px;">
                                    ${this.renderAddItemForm('add', categories)}
                                </div>
                                <div class="action-list" id="action-list-add">
                                    ${this.renderActionList(rule.add, 'add')}
                                </div>
                            </div>
                             <div class="form-section">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                    <span class="form-section-title" style="margin: 0;">${_t('sectionItemsToRemove')}</span>
                                    <button class="v2-btn v2-btn-sm v2-btn-secondary btn-show-add-item" data-type="remove">${_t('buttonAddItem')}</button>
                                </div>
                                <div class="add-item-form-container" id="add-item-form-remove" style="display: none; margin-bottom: 10px; padding: 10px; background: var(--bg-surface-active); border-radius: 4px;">
                                    ${this.renderAddItemForm('remove', categories)}
                                </div>
                                <div class="action-list" id="action-list-remove">
                                    ${this.renderActionList(rule.remove, 'remove')}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="v2-modal-footer">
                        <button type="button" class="v2-btn v2-btn-secondary" id="btn-cancel-rule">${_t('buttonCancel')}</button>
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-save-rule">${_t('buttonSaveRule')}</button>
                    </div>
                </div>
            `;

    document.body.appendChild(backdrop);
    requestAnimationFrame(() => backdrop.classList.add('open'));
    this.bindModalEvents(backdrop, rule, isNew);
},

// --- RENDER HELPERS ---
renderCheckboxGroup(items, selectedItems, groupName) {
    const selectedSet = new Set(selectedItems || []);
    if (!items || items.length === 0) return `<div class="v2-empty-text">${_t('textNoOptions')}</div>`;

    return items.map(item => `
                <label class="condition-item">
                    <input type="checkbox" data-group="${groupName}" value="${this.escapeHtml(item)}" ${selectedSet.has(item) ? 'checked' : ''}>
                    <span>${this.escapeHtml(item)}</span>
                </label>
            `).join('');
},

renderAddItemForm(type, categories) {
    return `
                 <div style="display: grid; grid-template-columns: 2fr 1fr 0.5fr auto; gap: 8px; align-items: end;">
                    <div>
                        <label class="v2-label" style="font-size: 11px;">${_t('labelItemName')}</label>
                        <input type="text" class="v2-input input-item-name" list="gearCatalogList" placeholder="${_t('placeholderItemSearch')}" data-type="${type}">
                    </div>
                    <div>
                        <label class="v2-label" style="font-size: 11px;">${_t('labelCategory')}</label>
                        <select class="v2-select select-item-category" data-type="${type}">
                            ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="v2-label" style="font-size: 11px;">${_t('labelQty')}</label>
                        <input type="number" class="v2-input input-item-qty" value="1" min="1" data-type="${type}">
                    </div>
                    <div style="display: flex; gap: 4px;">
                        <button class="v2-btn v2-btn-primary btn-confirm-add-item" data-type="${type}">${_t('buttonAdd')}</button>
                    </div>
                </div>
            `;
},

renderActionList(items, type) {
    // Same as before
    if (!items || !items.length) {
        return `<div class="v2-empty-text">${_t('textNoItems')}</div>`;
    }
    return items.map((item, index) => `
                <div class="action-item-row">
                    <span style="font-weight: 500; flex: 1;">${this.escapeHtml(item.name)}</span>
                    <span class="v2-badge">${item.category}</span>
                    <span class="v2-badge v2-badge-outline">x${item.quantity}</span>
                    <button type="button" class="v2-btn v2-btn-icon v2-btn-ghost btn-delete-action-item" 
                            data-type="${type}" data-index="${index}" title="Remove Item">
                        <span class="icon" style="font-size: 16px;">close</span>
                    </button>
                </div>
            `).join('');
},

// --- EVENT BINDING ---
bindModalEvents(backdrop, rule, isNew) {
    // 1. Tabs
    backdrop.querySelectorAll('.rules-tab-btn').forEach(btn => {
        btn.onclick = () => {
            backdrop.querySelectorAll('.rules-tab-btn').forEach(b => b.classList.remove('active'));
            backdrop.querySelectorAll('.rules-tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            backdrop.querySelector(`#tab-${btn.dataset.tab}`).classList.add('active');
        };
    });

    // 2. Action Items (Show/Add)
    backdrop.querySelectorAll('.btn-show-add-item').forEach(btn => {
        btn.onclick = () => {
            const type = btn.dataset.type;
            const form = backdrop.querySelector(`#add-item-form-${type}`);
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        };
    });

    backdrop.querySelectorAll('.btn-confirm-add-item').forEach(btn => {
        btn.onclick = () => {
            const type = btn.dataset.type;
            const container = backdrop.querySelector(`#add-item-form-${type}`);
            const name = container.querySelector('.input-item-name').value.trim();
            const category = container.querySelector('.select-item-category').value;
            const quantity = parseInt(container.querySelector('.input-item-qty').value, 10) || 1;

            if (!name) return;

            if (!rule[type]) rule[type] = [];
            rule[type].push({ name, category, quantity });

            container.querySelector('.input-item-name').value = '';
            container.style.display = 'none';

            // Re-render
            const listContainer = backdrop.querySelector(`#action-list-${type}`);
            listContainer.innerHTML = this.renderActionList(rule[type], type);
            bindDeleteActions();
        };
    });

    // 3. Action Items (Delete)
    const bindDeleteActions = () => {
        backdrop.querySelectorAll('.btn-delete-action-item').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const type = btn.dataset.type;
                const index = parseInt(btn.dataset.index, 10);
                if (rule[type]) {
                    rule[type].splice(index, 1);
                    backdrop.querySelector(`#action-list-${type}`).innerHTML = this.renderActionList(rule[type], type);
                    bindDeleteActions();
                }
            };
        });
    };
    bindDeleteActions();

    // 4. Save / Close
    const close = () => {
        backdrop.classList.remove('open');
        setTimeout(() => backdrop.remove(), 200);
    };

    backdrop.querySelector('.v2-modal-close').onclick = close;
    backdrop.querySelector('#btn-cancel-rule').onclick = close;

    backdrop.querySelector('#btn-save-rule').onclick = () => {
        // General
        rule.label = backdrop.querySelector('#ruleLabel').value.trim();
        rule.enabled = backdrop.querySelector('#ruleEnabled').checked;
        rule.always = backdrop.querySelector('#ruleAlways').checked;

        if (!rule.label) {
            alert(_t('alertEnterRuleName'));
            return;
        }

        // Collect Checkboxes
        const collect = (group) => {
            return Array.from(backdrop.querySelectorAll(`input[data-group="${group}"]:checked`)).map(cb => cb.value);
        };

        rule.scenarios = collect('scenarios');
        rule.scenarioMode = backdrop.querySelector('#ruleScenarioMode').value;
        rule.scenarioFactor = parseFloat(backdrop.querySelector('#ruleScenarioFactor').value) || 1;

        rule.shootingDaysMode = backdrop.querySelector('#ruleShootingDaysMode').value;
        const sDays = backdrop.querySelector('#ruleShootingDays').value;
        rule.shootingDays = sDays !== '' ? parseInt(sDays, 10) : null;

        rule.camera = collect('camera');
        rule.mattebox = collect('mattebox');
        rule.viewfinderExtension = collect('viewfinderExtension');
        rule.monitor = collect('monitor');
        rule.wireless = collect('wireless');
        rule.tripodHeadBrand = collect('tripodHeadBrand');
        rule.tripodBowl = collect('tripodBowl');
        rule.tripodTypes = collect('tripodTypes');
        rule.tripodSpreader = collect('tripodSpreader');
        rule.crewPresent = collect('crewPresent');
        rule.crewAbsent = collect('crewAbsent');

        this.saveRule(rule, isNew);
        close();
    };
},

saveRule(rule, isNew) {
    if (window.getAutoGearRules && window.setAutoGearRules) {
        const currentRules = window.getAutoGearRules();
        let newRules;
        if (isNew) {
            newRules = [...currentRules, rule];
        } else {
            newRules = currentRules.map(r => r.id === rule.id ? rule : r);
        }
        window.setAutoGearRules(newRules);
        this.render();
    }
},

escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
    };

global.cineRulesView = RulesView;

}) (typeof window !== 'undefined' ? window : this);
