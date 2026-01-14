import { View } from '../view.js';

export class RulesView extends View {
    constructor() {
        super('rules');
        this.devicesLocal = {};
    }

    async render() {
        if (!window.getAutoGearRules) {
            // Core not ready? Retry.
            this.container.innerHTML = `
                <div class="v2-loading-state">
                    <div class="v2-spinner"></div>
                    <p class="v2-text-muted">Loading Auto Gear Core...</p>
                </div>
            `;
            setTimeout(() => this.render(), 500);
            return;
        }

        const rules = window.getAutoGearRules() || [];
        const rulesCount = rules.length;

        const header = `
            <div class="v2-view-header">
                <div>
                    <h1 class="v2-view-title">Auto Gear Rules</h1>
                    <p class="v2-view-subtitle">Define automatic equipment packages based on shoot conditions.</p>
                </div>
                <div class="v2-actions-group">
                    <button class="v2-btn v2-btn-secondary" id="v2-ag-import">Import</button>
                    <button class="v2-btn v2-btn-secondary" id="v2-ag-export">Export</button>
                    <button class="v2-btn v2-btn-primary" id="v2-ag-add">
                        <span class="v2-icon">add</span> New Rule
                    </button>
                </div>
            </div>
        `;

        if (rulesCount === 0) {
            this.container.innerHTML = header + `
                <div class="v2-empty-state">
                    <div class="v2-empty-icon">rule</div>
                    <h3>No Rules Defined</h3>
                    <p>Create rules to automatically add gear (like specific monitors for a director) based on the scenario.</p>
                    <button class="v2-btn v2-btn-primary" id="v2-ag-add-empty">Create First Rule</button>
                </div>
            `;
        } else {
            this.container.innerHTML = header + `
                <div class="v2-rules-grid">
                    ${rules.map((rule, idx) => this.renderRuleCard(rule, idx)).join('')}
                </div>
            `;
        }

        this.attachListeners();
    }

    renderRuleCard(rule, index) {
        const actionCount = (rule.addItems || []).length;
        const conditionCount = this.countConditions(rule);

        return `
            <div class="v2-card v2-rule-card" data-index="${index}">
                <div class="v2-card-header">
                    <div class="v2-rule-title-group">
                        <div class="v2-rule-status ${rule.enabled ? 'active' : 'inactive'}"></div>
                        <h3 class="v2-card-title">${this.escapeHtml(rule.name || 'Unnamed Rule')}</h3>
                    </div>
                     <div class="v2-card-actions">
                        <button class="v2-btn-icon" data-action="edit" data-index="${index}" title="Edit">edit</button>
                        <button class="v2-btn-icon v2-danger-hover" data-action="delete" data-index="${index}" title="Delete">delete</button>
                    </div>
                </div>
                <div class="v2-card-body">
                    <div class="v2-rule-meta">
                        <span class="v2-tag">${rule.scenarioMode || 'All Scenarios'}</span>
                        <span class="v2-tag v2-tag-outline">${conditionCount} Conditions</span>
                        <span class="v2-tag v2-tag-outline">${actionCount} Actions</span>
                    </div>
                    ${rule.always ? '<div class="v2-badge v2-badge-accent">Always Active</div>' : ''}
                </div>
            </div>
        `;
    }

    countConditions(rule) {
        let count = 0;
        if (rule.scenarios && rule.scenarios.length) count += rule.scenarios.length;
        if (rule.cameras && rule.cameras.length) count++;
        if (rule.cameraHandles && rule.cameraHandles.length) count++;
        if (rule.monitors && rule.monitors.length) count++;
        return count; // Simplified count
    }

    attachListeners() {
        const importBtn = this.container.querySelector('#v2-ag-import');
        if (importBtn) importBtn.addEventListener('click', () => this.handleImport());

        const exportBtn = this.container.querySelector('#v2-ag-export');
        if (exportBtn) exportBtn.addEventListener('click', () => this.handleExport());

        const addBtns = this.container.querySelectorAll('#v2-ag-add, #v2-ag-add-empty');
        addBtns.forEach(btn => btn.addEventListener('click', () => this.showEditRuleModal({}, true)));

        this.container.querySelectorAll('[data-action="edit"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.dataset.index, 10);
                const rules = window.getAutoGearRules();
                if (rules && rules[idx]) {
                    this.showEditRuleModal(rules[idx], false, idx);
                }
            });
        });

        this.container.querySelectorAll('[data-action="delete"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.dataset.index, 10);
                this.deleteRule(idx);
            });
        });
    }

    // --- Data Collection Helper ---
    collectData() {
        // Collect data from window.devices or fallback
        const d = window.devices || {};
        return {
            cameras: Object.keys(d.cameras || {}).sort(),
            monitors: Object.keys(d.monitors || {}).sort(),
            video: Object.keys(d.video || {}).sort(), // Video Distribution
            cameraHandles: this.getHardcodedOptions('cameraHandle'), // Predefined list
            scenarios: window.SCENARIOS || ['Studio', 'Location', 'Handheld', 'Gimbal', 'Steadicam', 'Crane', 'Drone', 'Underwater', 'Car Mount'],
            viewfinders: Object.keys(d.viewfinders || {}).sort(),
            matteboxes: Object.keys(d.matteboxes || {}).sort(),
            tripodHeads: Object.keys(d.tripodHeads || {}).sort(),
            tripodBowls: ['75mm', '100mm', '150mm', 'Flat', 'Mitchell'], // Common bowls
            wireless: Object.keys(d.wireless || {}).sort()
        };
    }

    getHardcodedOptions(type) {
        if (type === 'cameraHandle') {
            return ['Blue Shape Top Handle', 'ARRI CCH-4', 'ARRI HEB-3', 'Wooden Camera Master Top Handle'];
        }
        if (type === 'deliveryResolution') {
            return ['1080p', '2K', '4K UHD', '4K DCI', '6K', '8K'];
        }
        return [];
    }

    // --- Edit Modal ---
    showEditRuleModal(rule, isNew, ruleIndex = -1) {
        const data = this.collectData();

        // Deep clone rule to avoid live edits
        const currentRule = JSON.parse(JSON.stringify(rule));
        if (!currentRule.scenarios) currentRule.scenarios = [];
        if (!currentRule.addItems) currentRule.addItems = [];

        // Determine Scenarios value
        const scenarioVal = currentRule.scenarios || [];

        const backdrop = document.createElement('div');
        backdrop.className = 'v2-modal-backdrop';

        backdrop.innerHTML = `
            <div class="v2-modal v2-modal-lg">
                <div class="v2-modal-header">
                    <h2>${isNew ? 'New Rule' : 'Edit Rule'}</h2>
                    <button class="v2-modal-close">&times;</button>
                </div>
                <div class="v2-modal-body v2-layout-sidebar">
                    <div class="v2-sidebar-nav">
                        <button class="v2-nav-item active" data-tab="general">General</button>
                        <button class="v2-nav-item" data-tab="camera">Camera</button>
                        <button class="v2-nav-item" data-tab="monitoring">Monitoring</button>
                        <button class="v2-nav-item" data-tab="support">Support</button>
                        <button class="v2-nav-item" data-tab="crew">Crew</button>
                        <button class="v2-nav-item" data-tab="actions">Actions</button>
                    </div>
                    <div class="v2-tab-content active" id="tab-general">
                        <div class="v2-form-group">
                            <label>Rule Name</label>
                            <input type="text" class="v2-input" id="rule-name" value="${this.escapeHtml(currentRule.name || '')}" placeholder="e.g. Director's Monitor">
                        </div>
                        <div class="v2-form-check">
                            <input type="checkbox" id="rule-enabled" ${currentRule.enabled !== false ? 'checked' : ''}>
                            <label for="rule-enabled">Rule Enabled</label>
                        </div>
                        <div class="v2-form-check">
                            <input type="checkbox" id="rule-always" ${currentRule.always ? 'checked' : ''}>
                            <label for="rule-always">Always Apply (Ignore Scenarios)</label>
                        </div>
                        <hr class="v2-divider">
                        <div class="v2-form-group">
                            <label>Scenario Logic</label>
                            <select class="v2-select" id="rule-scenario-mode">
                                <option value="any" ${currentRule.scenarioMode === 'any' ? 'selected' : ''}>Match ANY selected scenario</option>
                                <option value="all" ${currentRule.scenarioMode === 'all' ? 'selected' : ''}>Match ALL selected scenarios</option>
                            </select>
                        </div>
                        <div class="v2-form-group">
                            <label>Scenarios</label>
                            <div class="v2-checkbox-grid">
                                ${data.scenarios.map(s => `
                                    <label class="v2-checkbox-label">
                                        <input type="checkbox" class="scenario-check" value="${s}" ${scenarioVal.includes(s) ? 'checked' : ''}>
                                        ${s}
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                        <div class="v2-form-group">
                             <label>Shooting Days (Optional)</label>
                             <div class="v2-row-gap">
                                <select class="v2-select" id="rule-days-cond">
                                    <option value="">(Ignore)</option>
                                    <option value="min" ${currentRule.shootingDaysCondition === 'min' ? 'selected' : ''}>Minimum Days</option>
                                    <option value="max" ${currentRule.shootingDaysCondition === 'max' ? 'selected' : ''}>Maximum Days</option>
                                </select>
                                <input type="number" class="v2-input v2-input-sm" id="rule-days-val" value="${currentRule.shootingDaysValue || ''}" min="1">
                             </div>
                        </div>
                    </div>

                    <div class="v2-tab-content" id="tab-camera" style="display:none;">
                        ${this.renderMultiSelect('Cameras', 'cameras', data.cameras, currentRule.cameras)}
                        ${this.renderMultiSelect('Matteboxes', 'matteboxes', data.matteboxes, currentRule.matteboxes)}
                        ${this.renderMultiSelect('Camera Handles', 'cameraHandles', data.cameraHandles, currentRule.cameraHandles)}
                        ${this.renderMultiSelect('Viewfinders', 'viewfinders', data.viewfinders, currentRule.viewfinders)}
                         <div class="v2-form-group">
                            <label>Delivery Resolution</label>
                            <select class="v2-select" id="rule-delivery-res">
                                <option value="">(Any)</option>
                                ${this.getHardcodedOptions('deliveryResolution').map(r => `<option value="${r}" ${currentRule.deliveryResolution === r ? 'selected' : ''}>${r}</option>`).join('')}
                            </select>
                        </div>
                    </div>

                    <div class="v2-tab-content" id="tab-monitoring" style="display:none;">
                         ${this.renderMultiSelect('Monitors', 'monitors', data.monitors, currentRule.monitors)}
                         ${this.renderMultiSelect('Video Distribution', 'videoDist', data.video, currentRule.videoDistribution)}
                         ${this.renderMultiSelect('Wireless Video', 'wireless', data.wireless, currentRule.wireless)}
                    </div>

                    <div class="v2-tab-content" id="tab-support" style="display:none;">
                        ${this.renderMultiSelect('Tripod Heads', 'tripodHeads', data.tripodHeads, currentRule.tripodHeads)}
                        ${this.renderMultiSelect('Tripod Bowls', 'tripodBowls', data.tripodBowls, currentRule.tripodBowls)}
                    </div>

                    <div class="v2-tab-content" id="tab-crew" style="display:none;">
                        <p class="v2-text-muted">Requires specific crew members to be present/absent.</p>
                         <div class="v2-form-group">
                            <label>Crew Present (Comma separated)</label>
                            <input type="text" class="v2-input" id="rule-crew-present" value="${(currentRule.crewPresent || []).join(', ')}">
                        </div>
                        <div class="v2-form-group">
                            <label>Crew Absent (Comma separated)</label>
                            <input type="text" class="v2-input" id="rule-crew-absent" value="${(currentRule.crewAbsent || []).join(', ')}">
                        </div>
                    </div>

                    <div class="v2-tab-content" id="tab-actions" style="display:none;">
                        <h3>Items to Add</h3>
                        <p class="v2-text-muted">When rule matches, these items are added to the list.</p>
                        
                        <div class="v2-action-list" id="rule-action-list">
                            ${this.renderActionListItems(currentRule.addItems)}
                        </div>
                        
                        <div class="v2-add-item-row">
                            <input type="text" class="v2-input" id="new-item-name" placeholder="Search item...">
                            <input type="number" class="v2-input v2-input-sm" id="new-item-qty" value="1" min="1">
                            <button class="v2-btn v2-btn-secondary" id="btn-add-action-item">Add</button>
                        </div>
                    </div>
                </div>
                <div class="v2-modal-footer">
                    <button class="v2-btn v2-btn-ghost" id="v2-modal-cancel">Cancel</button>
                    <button class="v2-btn v2-btn-primary" id="v2-modal-save">Save Rule</button>
                </div>
            </div>
        `;

        document.body.appendChild(backdrop);

        // Bind Events
        const close = () => {
            backdrop.remove();
        };

        backdrop.querySelector('.v2-modal-close').onclick = close;
        backdrop.querySelector('#v2-modal-cancel').onclick = close;

        // Tabs
        const tabs = backdrop.querySelectorAll('.v2-nav-item');
        const contents = backdrop.querySelectorAll('.v2-tab-content');
        tabs.forEach(t => {
            t.onclick = () => {
                tabs.forEach(x => x.classList.remove('active'));
                contents.forEach(x => { x.style.display = 'none'; x.classList.remove('active'); });
                t.classList.add('active');
                const target = backdrop.querySelector(`#tab-${t.dataset.tab}`);
                if (target) {
                    target.style.display = 'block';
                    // force layout check
                    setTimeout(() => target.classList.add('active'), 10);
                }
            };
        });

        // Add Item Action
        const actionListEl = backdrop.querySelector('#rule-action-list');
        const addItemBtn = backdrop.querySelector('#btn-add-action-item');
        const newItemName = backdrop.querySelector('#new-item-name');
        const newItemQty = backdrop.querySelector('#new-item-qty');

        addItemBtn.onclick = () => {
            const name = newItemName.value.trim();
            const qty = parseInt(newItemQty.value, 10);
            if (name) {
                currentRule.addItems.push({ name, qty });
                actionListEl.innerHTML = this.renderActionListItems(currentRule.addItems);
                newItemName.value = '';
                this.bindRemoveActionEvents(actionListEl, currentRule);
            }
        };

        this.bindRemoveActionEvents(actionListEl, currentRule);

        // Save
        backdrop.querySelector('#v2-modal-save').onclick = () => {
            // Collect Form Data
            const updatedRule = {
                ...currentRule,
                name: backdrop.querySelector('#rule-name').value.trim(),
                enabled: backdrop.querySelector('#rule-enabled').checked,
                always: backdrop.querySelector('#rule-always').checked,
                scenarioMode: backdrop.querySelector('#rule-scenario-mode').value,
                scenarios: Array.from(backdrop.querySelectorAll('.scenario-check:checked')).map(el => el.value),
                shootingDaysCondition: backdrop.querySelector('#rule-days-cond').value,
                shootingDaysValue: parseInt(backdrop.querySelector('#rule-days-val').value, 10) || 0,
                // Multi-selects
                cameras: this.collectMultiSelect(backdrop, 'cameras'),
                matteboxes: this.collectMultiSelect(backdrop, 'matteboxes'),
                cameraHandles: this.collectMultiSelect(backdrop, 'cameraHandles'),
                viewfinders: this.collectMultiSelect(backdrop, 'viewfinders'),
                monitors: this.collectMultiSelect(backdrop, 'monitors'),
                videoDistribution: this.collectMultiSelect(backdrop, 'videoDist'),
                wireless: this.collectMultiSelect(backdrop, 'wireless'),
                tripodHeads: this.collectMultiSelect(backdrop, 'tripodHeads'),
                tripodBowls: this.collectMultiSelect(backdrop, 'tripodBowls'),

                deliveryResolution: backdrop.querySelector('#rule-delivery-res').value,
                crewPresent: backdrop.querySelector('#rule-crew-present').value.split(',').map(s => s.trim()).filter(s => s),
                crewAbsent: backdrop.querySelector('#rule-crew-absent').value.split(',').map(s => s.trim()).filter(s => s),
            };

            if (!updatedRule.name) {
                alert('Rule name is required');
                return;
            }

            this.saveRule(updatedRule, isNew, ruleIndex);
            close();
        };
    }

    renderMultiSelect(label, id, options, selected = []) {
        if (!options || options.length === 0) return '';
        const safeSelected = selected || [];
        return `
            <div class="v2-form-group">
                <label>${label}</label>
                <div class="v2-multi-select-container">
                    ${options.map(opt => `
                         <label class="v2-checkbox-label">
                            <input type="checkbox" class="multi-${id}" value="${this.escapeHtml(opt)}" ${safeSelected.includes(opt) ? 'checked' : ''}>
                            <span>${this.escapeHtml(opt)}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    }

    collectMultiSelect(parent, id) {
        return Array.from(parent.querySelectorAll(`.multi-${id}:checked`)).map(el => el.value);
    }

    renderActionListItems(items) {
        if (!items || !items.length) return '<p class="v2-text-muted">No items added yet.</p>';
        return items.map((item, idx) => `
            <div class="v2-action-item">
                <span class="v2-badge v2-badge-outline item-qty">${item.qty}x</span>
                <span class="item-name">${this.escapeHtml(item.name)}</span>
                <button class="v2-btn-icon-sm v2-danger-hover remove-action-item" data-idx="${idx}">&times;</button>
            </div>
        `).join('');
    }

    bindRemoveActionEvents(container, currentRule) {
        container.querySelectorAll('.remove-action-item').forEach(btn => {
            btn.onclick = (e) => {
                const idx = parseInt(e.target.dataset.idx, 10);
                currentRule.addItems.splice(idx, 1);
                container.innerHTML = this.renderActionListItems(currentRule.addItems);
                this.bindRemoveActionEvents(container, currentRule);
            };
        });
    }

    saveRule(rule, isNew, index) {
        const rules = window.getAutoGearRules() || [];
        if (isNew) {
            rules.push(rule);
        } else {
            rules[index] = rule;
        }

        if (window.setAutoGearRules) {
            window.setAutoGearRules(rules);
            // Trigger autosave if possible
            if (window.requestAutoSave) window.requestAutoSave();
            this.render();
        } else {
            console.error('Core function setAutoGearRules not available');
        }
    }

    deleteRule(index) {
        if (!confirm('Are you sure you want to delete this rule?')) return;
        const rules = window.getAutoGearRules() || [];
        rules.splice(index, 1);
        window.setAutoGearRules(rules);
        if (window.requestAutoSave) window.requestAutoSave();
        this.render();
    }

}

// Instantiate and expose globally so bootstrap can init it
if (typeof window !== 'undefined') {
    window.cineRulesView = new RulesView();
}
