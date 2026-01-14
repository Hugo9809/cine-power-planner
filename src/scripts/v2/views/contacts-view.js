/**
 * Cine Power Planner V2 - Contacts View
 * =====================================
 * Manages the "Contacts" view in the V2 UI.
 */

(function (global) {
    'use strict';

    // =====================
    // CONFIGURATION
    // =====================
    const VIEW_ID = 'view-contacts';

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
                return dict[key] || key;
            }
        }
        return key;
    }


    // =====================
    // PUBLIC API
    // =====================
    const ContactsView = {
        container: null,

        init() {
            try {
                this.container = document.getElementById(VIEW_ID);
                if (!this.container) {
                    this.createViewContainer();
                }

                if (!isInitialized) {
                    console.log('[ContactsView] Initializing...');
                    document.addEventListener('v2:viewchange', (e) => {
                        if (e.detail && e.detail.view === 'contacts') {
                            this.render();
                        }
                    });

                    // Listen for language changes
                    document.addEventListener('v2:languagechange', () => {
                        if (this.isVisible()) this.render();
                    });

                    isInitialized = true;
                    console.log('[ContactsView] Initialized');
                }
            } catch (e) {
                console.error('[ContactsView] Init failed:', e);
            }
        },

        isVisible() {
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
                    if (!this.container) return;
                }

                // Load contacts using the existing module
                const contactsModule = global.cineFeaturesContacts;
                if (!contactsModule) {
                    this.container.innerHTML = `
                        <div class="view-empty-state">
                            <p>${_t('statusUnavailable') || 'Contacts module not loaded.'}</p>
                        </div>
                    `;
                    return;
                }

                const contacts = contactsModule.loadStoredContacts();

                // Swiss Utility Header: Clean, Typography-led, Solid
                const header = `
                    <header class="view-header swiss-header">
                        <div class="header-content">
                            <h1 class="swiss-title">${_t('contactsViewTitle')}</h1>
                            <div class="swiss-subtitle">
                                <span class="count-badge">${contacts ? contacts.length : 0}</span>
                                ${_t('contactsViewSubtitle') || 'Production Directory'}
                            </div>
                        </div>
                        <div class="view-header-actions">
                            <button class="swiss-btn swiss-btn-primary" id="btn-add-contact">
                                <span class="icon">add</span>
                                <span>${_t('buttonAddContact')}</span>
                            </button>
                        </div>
                    </header>
                `;

                let contentHtml = '<div class="view-content swiss-content">';

                if (!contacts || contacts.length === 0) {
                    contentHtml += `
                        <div class="view-empty-state swiss-empty-state">
                             <div class="swiss-empty-icon">
                                <span class="icon">group_off</span>
                            </div>
                            <h2>${_t('contactsEmptyTitle')}</h2>
                            <p>${_t('contactsEmptyText')}</p>
                            <button class="swiss-btn swiss-btn-primary" id="btn-add-contact-empty">
                                ${_t('buttonAddFirstContact')}
                            </button>
                        </div>
                    `;
                } else {
                    contentHtml += '<div class="swiss-grid">';
                    contacts.forEach(contact => {
                        contentHtml += this.renderContactCard(contact);
                    });
                    contentHtml += '</div>';
                }

                contentHtml += '</div>'; // End view-content

                this.container.innerHTML = header + contentHtml;
                this.attachListeners();

            } catch (err) {
                console.error('[ContactsView] Render failed', err);
                if (this.container) {
                    this.container.innerHTML = `<div class="swiss-error-state"><p>Error loading view: ${err.message}</p></div>`;
                }
            }
        },

        renderContactCard(contact) {
            const initials = contact.name
                ? contact.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                : '?';

            const avatarHtml = contact.avatar
                ? `<img src="${contact.avatar}" alt="${escapeHtml(contact.name)}" class="avatar-img">`
                : `<span class="avatar-initials">${initials}</span>`;

            // Contact Actions (Clean links)
            const phoneLink = contact.phone ? `<a href="tel:${escapeHtml(contact.phone)}" class="swiss-link" onclick="event.stopPropagation()">${escapeHtml(contact.phone)}</a>` : '<span class="swiss-placeholder">—</span>';
            const emailLink = contact.email ? `<a href="mailto:${escapeHtml(contact.email)}" class="swiss-link" onclick="event.stopPropagation()">${escapeHtml(contact.email)}</a>` : '<span class="swiss-placeholder">—</span>';

            // Website link logic - shorten for display
            let displayWebsite = contact.website || '';
            if (displayWebsite.includes('://')) displayWebsite = displayWebsite.split('://')[1];
            if (displayWebsite.endsWith('/')) displayWebsite = displayWebsite.slice(0, -1);

            const websiteLink = contact.website ? `<a href="${escapeHtml(contact.website)}" target="_blank" rel="noopener noreferrer" class="swiss-link" onclick="event.stopPropagation()">${escapeHtml(displayWebsite)}</a>` : '';

            // Layout: Swiss Utility Card
            // Left: Avatar / ID
            // Right: Data Grid
            return `
                <div class="swiss-card contact-card" data-contact-id="${escapeHtml(contact.id)}" tabindex="0" role="button">
                    <div class="swiss-card-main">
                        <div class="swiss-card-identity">
                            <div class="swiss-avatar">
                                ${avatarHtml}
                            </div>
                            <div class="swiss-identity-text">
                                <h3 class="swiss-name">${escapeHtml(contact.name || _t('contactUnnamed'))}</h3>
                                <div class="swiss-role">${escapeHtml(contact.role || _t('contactNoRole'))}</div>
                            </div>
                        </div>
                        <div class="swiss-card-actions-overlay">
                             <button class="swiss-icon-btn btn-edit-contact" title="${_t('buttonEdit')}">
                                <span class="icon">edit</span>
                            </button>
                             <button class="swiss-icon-btn btn-delete-contact" title="${_t('buttonDelete')}">
                                <span class="icon">delete</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="swiss-card-data-grid">
                        <div class="data-cell">
                            <span class="data-label">Phone</span>
                            <span class="data-value">${phoneLink}</span>
                        </div>
                        <div class="data-cell">
                            <span class="data-label">Email</span>
                            <span class="data-value">${emailLink}</span>
                        </div>
                        ${contact.website ? `
                        <div class="data-cell full-width">
                            <span class="data-label">Web</span>
                            <span class="data-value">${websiteLink}</span>
                        </div>
                        ` : ''}
                        ${contact.notes ? `
                        <div class="data-cell full-width notes-cell">
                            <span class="data-label">Notes</span>
                            <span class="data-value notes-text">${escapeHtml(contact.notes)}</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
        },

        attachListeners() {
            const addBtn = this.container.querySelector('#btn-add-contact');
            const addBtnEmpty = this.container.querySelector('#btn-add-contact-empty');

            if (addBtn) addBtn.onclick = () => this.showEditModal(null);
            if (addBtnEmpty) addBtnEmpty.onclick = () => this.showEditModal(null);

            this.container.querySelectorAll('.contact-card').forEach(card => {
                card.onclick = (e) => {
                    // Prevent if clicked on action buttons or links
                    if (e.target.closest('button') || e.target.closest('a')) return;
                    this.showEditModal(card.dataset.contactId);
                };
            });

            this.container.querySelectorAll('.btn-edit-contact').forEach(btn => {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    const card = e.target.closest('.contact-card');
                    this.showEditModal(card.dataset.contactId);
                };
            });

            this.container.querySelectorAll('.btn-delete-contact').forEach(btn => {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    const card = e.target.closest('.contact-card');
                    this.showDeleteConfirmation(card.dataset.contactId);
                };
            });
        },

        showDeleteConfirmation(contactId) {
            const backdrop = document.createElement('div');
            backdrop.className = 'v2-modal-backdrop';

            backdrop.innerHTML = `
                <div class="v2-modal" style="max-width: 400px;">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${_t('modalTitleDeleteContact')}</h3>
                        <button type="button" class="v2-modal-close v2-btn v2-btn-ghost"><span class="icon">close</span></button>
                    </div>
                    <div class="v2-modal-body" style="padding: 24px;">
                        <p>${_t('confirmDeleteContact')}</p>
                    </div>
                    <div class="v2-modal-footer">
                        <button type="button" class="v2-btn v2-btn-secondary" id="btn-cancel-delete">${_t('buttonCancel')}</button>
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-confirm-delete" style="background-color: var(--danger-color, #ef4444); border-color: var(--danger-color, #ef4444);">${_t('buttonDeleteRed')}</button>
                    </div>
                </div>
            `;

            document.body.appendChild(backdrop);
            requestAnimationFrame(() => backdrop.classList.add('open'));

            const close = () => {
                backdrop.classList.remove('open');
                setTimeout(() => backdrop.remove(), 200);
            };

            backdrop.querySelector('.v2-modal-close').onclick = close;
            backdrop.querySelector('#btn-cancel-delete').onclick = close;
            backdrop.querySelector('#btn-confirm-delete').onclick = () => {
                this.deleteContact(contactId);
                close();
            };
        },

        deleteContact(id) {
            const module = global.cineFeaturesContacts;
            if (!module) return;

            const existing = module.loadStoredContacts();
            const filtered = existing.filter(c => c.id !== id);

            if (module.saveContactsToStorage(filtered)) {
                this.render();
            } else {
                alert('Failed to delete contact.');
            }
        },

        showEditModal(contactId) {
            const module = global.cineFeaturesContacts;
            if (!module) return;

            let contact = {};
            let isNew = true;

            if (contactId) {
                const existing = module.loadStoredContacts();
                const found = existing.find(c => c.id === contactId);
                if (found) {
                    contact = { ...found };
                    isNew = false;
                }
            }

            // Defaults
            if (isNew) {
                contact = {
                    name: '',
                    role: '',
                    phone: '',
                    email: '',
                    website: '',
                    notes: '',
                    avatar: ''
                };
            }

            // Remove existing modal if any
            const existingModal = document.querySelector('.v2-modal-backdrop');
            if (existingModal) existingModal.remove();

            const backdrop = document.createElement('div');
            backdrop.className = 'v2-modal-backdrop';

            const roles = [
                'DoP', '1st AC', '2nd AC', 'Camera Operator', 'DIT', 'Data Wrangler',
                'VTR/Playback', 'Gaffer', 'Best Boy', 'Key Grip', 'Grip', 'Sound Mixer',
                'Boom Operator', 'PA', 'Director', 'Producer', 'Line Producer', 'Production Manager',
                'Rental House', 'Post House', 'Agency', 'Client'
            ];

            backdrop.innerHTML = `
                <div class="v2-modal contact-modal">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${isNew ? _t('modalTitleNewContact') : _t('modalTitleEditContact')}</h3>
                        <button type="button" class="v2-modal-close v2-btn v2-btn-ghost"><span class="icon">close</span></button>
                    </div>
                    <div class="v2-modal-body contacts-modal-body">
                        
                        <!-- Avatar Upload Section -->
                        <div class="avatar-upload-section" id="avatarDropZone">
                            <div class="avatar-preview" id="modalAvatarPreview">
                                ${contact.avatar ? `<img src="${contact.avatar}">` : '<span class="icon">person</span>'}
                            </div>
                            <div class="avatar-buttons">
                                <label class="v2-btn v2-btn-sm v2-btn-secondary">
                                    <span class="icon" style="font-size:14px; margin-right:4px;">upload</span>
                                    ${_t('buttonUploadPhoto')}
                                    <input type="file" id="avatarUploadInput" accept="image/*" hidden>
                                </label>
                                <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost text-danger" id="removeAvatarBtn" ${!contact.avatar ? 'disabled' : ''}>
                                    ${_t('buttonRemovePhoto')}
                                </button>
                            </div>
                            <div class="avatar-hint">${_t('avatarHint') || 'Drag & drop or click to upload'}</div>
                        </div>

                        <!-- Basic Info Section -->
                        <div class="contact-form-section">
                            <div class="contact-form-section-title">
                                <span class="icon">badge</span>
                                ${_t('sectionBasicInfo') || 'Basic Information'}
                            </div>
                            
                            <div class="v2-form-group">
                                <label class="v2-label">${_t('labelName')}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">person</span></span>
                                    <input type="text" id="contactName" class="v2-input" value="${escapeHtml(contact.name)}" placeholder="${_t('placeholderFullName')}" required>
                                </div>
                            </div>

                            <div class="v2-form-group">
                                <label class="v2-label">${_t('labelRole')}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">work</span></span>
                                    <input type="text" id="contactRole" class="v2-input" value="${escapeHtml(contact.role)}" list="roleList" placeholder="${_t('placeholderRole')}">
                                </div>
                                <datalist id="roleList">
                                    ${roles.map(r => `<option value="${r}">`).join('')}
                                </datalist>
                            </div>
                        </div>

                        <!-- Contact Details Section -->
                        <div class="contact-form-section">
                            <div class="contact-form-section-title">
                                <span class="icon">contacts</span>
                                ${_t('sectionContactDetails') || 'Contact Details'}
                            </div>

                            <div class="detail-row-group">
                                <div class="v2-form-group">
                                    <label class="v2-label">${_t('labelPhone')}</label>
                                    <div class="v2-input-group">
                                        <span class="input-icon"><span class="icon">call</span></span>
                                        <input type="tel" id="contactPhone" class="v2-input" value="${escapeHtml(contact.phone)}" placeholder="${_t('placeholderPhone')}">
                                    </div>
                                </div>
                                
                                <div class="v2-form-group">
                                    <label class="v2-label">${_t('labelEmail')}</label>
                                    <div class="v2-input-group">
                                        <span class="input-icon"><span class="icon">mail</span></span>
                                        <input type="email" id="contactEmail" class="v2-input" value="${escapeHtml(contact.email)}" placeholder="${_t('placeholderEmail')}">
                                    </div>
                                </div>
                            </div>

                            <div class="v2-form-group">
                                <label class="v2-label">${_t('labelWebsite')}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">language</span></span>
                                    <input type="url" id="contactWebsite" class="v2-input" value="${escapeHtml(contact.website)}" placeholder="${_t('placeholderWebsite')}">
                                </div>
                            </div>
                        </div>

                        <!-- Notes Section -->
                        <div class="v2-form-group">
                            <label class="v2-label">${_t('labelNotes')}</label>
                            <textarea id="contactNotes" class="v2-input" rows="3" placeholder="${_t('placeholderNotes')}">${escapeHtml(contact.notes)}</textarea>
                        </div>

                    </div>
                    <div class="v2-modal-footer">
                        <button type="button" class="v2-btn v2-btn-secondary" id="btn-cancel-contact">${_t('buttonCancel')}</button>
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-save-contact">
                            <span class="icon" style="font-size:16px; margin-right:4px;">save</span>
                            ${_t('buttonSaveContact')}
                        </button>
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

            backdrop.querySelector('.v2-modal-close').onclick = close;
            backdrop.querySelector('#btn-cancel-contact').onclick = close;

            // Avatar Handling
            const avatarInput = backdrop.querySelector('#avatarUploadInput');
            const avatarPreview = backdrop.querySelector('#modalAvatarPreview');
            const removeAvatarBtn = backdrop.querySelector('#removeAvatarBtn');
            let currentAvatar = contact.avatar || '';

            avatarInput.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;

                // Use the profile module's helpers if available, or basic reader
                if (global.CINE_CONTACTS_PROFILE_MODULE) {
                    global.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile(file, (dataUrl) => {
                        currentAvatar = dataUrl;
                        avatarPreview.innerHTML = `<img src="${dataUrl}">`;
                        removeAvatarBtn.disabled = false;
                    }, (err) => {
                        alert('Error reading image: ' + err);
                    });
                } else {
                    // Fallback
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        currentAvatar = ev.target.result;
                        avatarPreview.innerHTML = `<img src="${currentAvatar}">`;
                        removeAvatarBtn.disabled = false;
                    };
                    reader.readAsDataURL(file);
                }
            };

            removeAvatarBtn.onclick = () => {
                currentAvatar = '';
                avatarPreview.innerHTML = '<span class="icon">person</span>';
                removeAvatarBtn.disabled = true;
                avatarInput.value = '';
            };

            // Save
            backdrop.querySelector('#btn-save-contact').onclick = () => {
                const name = backdrop.querySelector('#contactName').value.trim();
                if (!name) {
                    alert(_t('alertEnterName'));
                    return;
                }

                // Construct new object
                const entry = {
                    id: contactId || undefined, // let module generate if undefined
                    name: name,
                    role: backdrop.querySelector('#contactRole').value.trim(),
                    phone: backdrop.querySelector('#contactPhone').value.trim(),
                    email: backdrop.querySelector('#contactEmail').value.trim(),
                    website: backdrop.querySelector('#contactWebsite').value.trim(),
                    notes: backdrop.querySelector('#contactNotes').value.trim(),
                    avatar: currentAvatar
                };

                // Use module to normalize and save
                const allContacts = module.loadStoredContacts();

                // If editing, remove old entry from list first (to replace it in same position or re-sort)
                // Actually, the module's save helper replaces the whole list.
                // We should add/update in the array.

                let updatedList;
                if (isNew) {
                    // Normalize to get ID
                    const normalized = module.normalizeContactEntry(entry);
                    updatedList = [...allContacts, normalized];
                } else {
                    updatedList = allContacts.map(c => {
                        if (c.id === contactId) {
                            return module.normalizeContactEntry({ ...c, ...entry });
                        }
                        return c;
                    });
                }

                // Sort
                updatedList = module.sortContacts(updatedList);

                if (module.saveContactsToStorage(updatedList)) {
                    this.render();
                    close();
                } else {
                    alert('Failed to save contact.');
                }
            };
        }
    };

    global.cineContactsView = ContactsView;

})(typeof window !== 'undefined' ? window : this);
