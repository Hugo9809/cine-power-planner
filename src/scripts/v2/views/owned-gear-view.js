/**
 * Cine Power Planner V2 - Owned Gear View
 * =======================================
 * Manages the "Owned Gear" view in the V2 UI.
 */

(function (global) {
    'use strict';

    // =====================
    // CONFIGURATION
    // =====================
    const VIEW_ID = 'view-own-gear';

    // =====================
    // STATE
    // =====================
    let isInitialized = false;

    // =====================
    // HELPER: ESCAPE HTML
    // =====================
    function escapeHtml(str) {
        if (typeof str !== 'string') return '';
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
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
    const OwnGearView = {
        container: null,

        init() {
            try {
                this.container = document.getElementById(VIEW_ID);
                if (!this.container) {
                    // Try to create it if it doesn't exist
                    this.createViewContainer();
                }

                if (!isInitialized) {
                    console.log('[OwnGearView] Initializing...');
                    document.addEventListener('v2:viewchange', (e) => {
                        if (e.detail && e.detail.view === 'ownGear') {
                            this.render();
                        }
                    });

                    // Listen for language changes
                    document.addEventListener('v2:languagechange', () => {
                        if (this.isVisible()) this.render();
                    });

                    isInitialized = true;
                    console.log('[OwnGearView] Initialized');
                }
            } catch (e) {
                console.error('[OwnGearView] Init failed:', e);
            }
        },

        isVisible() {
            // Check if container is part of DOM and active
            return this.container && !this.container.classList.contains('hidden') && this.container.style.display !== 'none';
        },

        createViewContainer() {
            const app = document.querySelector('.v2-app') || document.body;
            const view = document.createElement('div');
            view.id = VIEW_ID;
            view.className = 'app-view';
            app.appendChild(view);
            this.container = view;
        },

        render() {
            try {
                if (!this.container) {
                    this.init();
                    if (!this.container) return; // Still not there? Bail.
                }

                // Load items using the legacy store
                // We'll use the cineFeaturesOwnGear global which exposes the API directly
                const features = global.cineFeaturesOwnGear;

                if (!features) {
                    this.container.innerHTML = `
                        <div class="v2-empty-state">
                            <p>${_t('statusUnavailable') || 'Module not available'}</p>
                        </div>
                    `;
                    return;
                }

                const items = features.loadStoredOwnGearItems();

                const header = `
                    <header class="view-header">
                        <div class="header-content">
                            <h1>${_t('ownGearViewTitle')}</h1>
                            <p class="header-subtitle">${_t('ownGearViewSubtitle')}</p>
                        </div>
                        <div class="view-header-actions">
                            <button class="v2-btn v2-btn-primary" id="btn-add-own-gear">
                                <span class="icon">add</span>
                                <span>${_t('buttonAddGearItem')}</span>
                            </button>
                        </div>
                    </header>
                `;

                let contentHtml = '<div class="view-content">';

                if (!items || items.length === 0) {
                    contentHtml += `
                        <div class="own-gear-empty-state">
                            <span class="icon">inventory_2</span>
                            <h3>${_t('ownGearEmptyTitle')}</h3>
                            <p>${_t('ownGearEmptyText')}</p>
                            <button class="v2-btn v2-btn-primary" id="btn-add-own-gear-empty">
                                ${_t('buttonAddFirstGearItem')}
                            </button>
                        </div>
                    `;
                } else {
                    contentHtml += '<div class="own-gear-list">';
                    items.forEach(item => {
                        contentHtml += this.renderItemRow(item);
                    });
                    contentHtml += '</div>';
                }

                contentHtml += '</div>'; // End view-content

                this.container.innerHTML = header + contentHtml;
                this.attachListeners();

            } catch (err) {
                console.error('[OwnGearView] Render failed', err);
                if (this.container) {
                    this.container.innerHTML = `<div class="v2-error-state"><p>Error loading view: ${err.message}</p></div>`;
                }
            }
        },

        renderItemRow(item) {
            return `
                <div class="own-gear-item-card" data-item-id="${escapeHtml(item.id)}">
                    <div class="own-gear-item-info">
                        <div class="own-gear-item-name">${escapeHtml(item.name)}</div>
                        ${item.notes ? `<div class="own-gear-item-notes">${escapeHtml(item.notes)}</div>` : ''}
                    </div>
                     <div class="own-gear-item-meta">
                        ${item.quantity ? `<span class="own-gear-badge qty-badge">${_t('labelQtyPrefix')}${escapeHtml(item.quantity)}</span>` : ''}
                        ${item.source ? `<span class="own-gear-badge source-badge">${_t('labelSourcePrefix')}${escapeHtml(item.source)}</span>` : ''}
                    </div>
                    <div class="own-gear-item-actions">
                        <button class="v2-btn v2-btn-icon v2-btn-ghost btn-edit-own-gear" title="${_t('buttonEdit')}" data-id="${escapeHtml(item.id)}">
                            <span class="icon">edit</span>
                        </button>
                        <button class="v2-btn v2-btn-icon v2-btn-ghost btn-delete-own-gear" title="${_t('buttonDelete')}" data-id="${escapeHtml(item.id)}">
                            <span class="icon">delete</span>
                        </button>
                    </div>
                </div>
            `;
        },

        attachListeners() {
            const addBtn = this.container.querySelector('#btn-add-own-gear');
            const addBtnEmpty = this.container.querySelector('#btn-add-own-gear-empty');

            if (addBtn) addBtn.onclick = () => this.showEditModal(null);
            if (addBtnEmpty) addBtnEmpty.onclick = () => this.showEditModal(null);

            this.container.querySelectorAll('.btn-edit-own-gear').forEach(btn => {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    const id = e.currentTarget.dataset.id;
                    if (id) this.showEditModal(id);
                };
            });

            this.container.querySelectorAll('.btn-delete-own-gear').forEach(btn => {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    const id = e.currentTarget.dataset.id;
                    if (id && confirm(_t('confirmDeleteGearItem'))) {
                        this.deleteItem(id);
                    }
                };
            });
        },

        deleteItem(id) {
            const features = global.cineFeaturesOwnGear;
            if (!features) return;

            const existing = features.loadStoredOwnGearItems();
            const filtered = existing.filter(i => i.id !== id);

            if (features.persistOwnGearItems(filtered)) {
                this.render();
            } else {
                alert(_t('alertSaveItemFailed'));
            }
        },

        showEditModal(itemId) {
            const features = global.cineFeaturesOwnGear;
            if (!features) return;

            let item = {};
            let isNew = true;

            if (itemId) {
                const existing = features.loadStoredOwnGearItems();
                const found = existing.find(i => i.id === itemId);
                if (found) {
                    item = { ...found };
                    isNew = false;
                }
            }

            // Defaults
            if (isNew) {
                item = {
                    name: '',
                    quantity: '',
                    notes: '',
                    source: ''
                };
            }

            // Remove existing modal if any
            const existingModal = document.querySelector('.v2-modal-backdrop');
            if (existingModal) existingModal.remove();

            const backdrop = document.createElement('div');
            backdrop.className = 'v2-modal-backdrop';

            backdrop.innerHTML = `
                <div class="v2-modal">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${isNew ? _t('modalTitleNewGearItem') : _t('modalTitleEditGearItem')}</h3>
                        <button type="button" class="v2-modal-close v2-btn v2-btn-ghost"><span class="icon">close</span></button>
                    </div>
                    <div class="v2-modal-body own-gear-modal-body">
                        
                        <div class="v2-form-group">
                            <label class="v2-label">${_t('labelItemName')}</label>
                            <input type="text" id="ownGearName" class="v2-input" value="${escapeHtml(item.name)}" placeholder="${_t('placeholderGearName')}" required>
                        </div>

                         <div class="v2-form-group">
                            <label class="v2-label">${_t('labelQuantity')}</label>
                            <input type="number" id="ownGearQuantity" class="v2-input" value="${escapeHtml(item.quantity)}" placeholder="${_t('placeholderGearQty')}">
                        </div>

                        <div class="v2-form-group">
                            <label class="v2-label">${_t('labelNotes')}</label>
                            <textarea id="ownGearNotes" class="v2-input" rows="3" placeholder="${_t('placeholderGearNotes')}">${escapeHtml(item.notes)}</textarea>
                        </div>

                    </div>
                    <div class="v2-modal-footer">
                        <button type="button" class="v2-btn v2-btn-secondary" id="btn-cancel-own-gear">${_t('buttonCancel')}</button>
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-save-own-gear">${_t('buttonSaveGearItem')}</button>
                    </div>
                </div>
            `;

            document.body.appendChild(backdrop);
            requestAnimationFrame(() => backdrop.classList.add('open'));

            // --- Modal Events ---
            const close = () => {
                backdrop.classList.remove('open');
                setTimeout(() => backdrop.remove(), 200);
            };

            const nameInput = backdrop.querySelector('#ownGearName');
            nameInput.focus();

            backdrop.querySelector('.v2-modal-close').onclick = close;
            backdrop.querySelector('#btn-cancel-own-gear').onclick = close;

            // Save
            backdrop.querySelector('#btn-save-own-gear').onclick = () => {
                const name = nameInput.value.trim();
                if (!name) {
                    alert(_t('alertEnterName'));
                    return;
                }

                // Construct new object
                const entry = {
                    id: itemId || undefined,
                    name: name,
                    quantity: backdrop.querySelector('#ownGearQuantity').value.trim(),
                    notes: backdrop.querySelector('#ownGearNotes').value.trim()
                };

                // Use features to normalize and save
                const allItems = features.loadStoredOwnGearItems();

                let finalItem;
                if (isNew) {
                    finalItem = features.normalizeOwnGearRecord(entry);
                } else {
                    finalItem = features.normalizeOwnGearRecord({ ...item, ...entry });
                }

                if (!finalItem) {
                    alert(_t('alertInvalidItemData'));
                    return;
                }

                let updatedList;
                if (isNew) {
                    updatedList = [...allItems, finalItem];
                } else {
                    updatedList = allItems.map(i => i.id === itemId ? finalItem : i);
                }

                if (features.persistOwnGearItems(updatedList)) {
                    this.render();
                    close();
                } else {
                    alert(_t('alertSaveItemFailed'));
                }
            };
        }
    };

    global.cineOwnGearView = OwnGearView;

})(typeof window !== 'undefined' ? window : this);
