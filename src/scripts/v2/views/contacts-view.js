/**
 * Cine Power Planner V2 - Contacts View
 * =====================================
 * Manages the "Contacts" view in the V2 UI.
 * Features: User profile, contact list, import/export, avatar editing.
 */

import { downloadFile } from '../../modules/helpers/download-manager.js';

(function (global) {
    'use strict';

    // =====================
    // CONFIGURATION
    // =====================
    const VIEW_ID = 'view-contacts';
    const USER_PROFILE_STORAGE_KEY = 'cameraPowerPlanner_userProfile';

    // =====================
    // STATE
    // =====================
    let isInitialized = false;
    let userProfile = null;
    let profileSaveTimer = null;

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
        // Fallback defaults for v2-specific keys and missing translations
        const defaults = {
            'contactsViewTitle': 'Contacts',
            'contactsViewSubtitle': 'Production Directory',
            'buttonAddContact': 'Add Contact',
            'buttonImportVCard': 'Import vCard',
            'buttonExportContacts': 'Export',
            'contactsEmptyTitle': 'No contacts yet',
            'contactsEmptyText': 'Add crew members to reuse them across projects.',
            'buttonAddFirstContact': 'Add Your First Contact',
            'contactUnnamed': 'Unnamed',
            'contactNoRole': 'No role specified',
            'modalTitleNewContact': 'New Contact',
            'modalTitleEditContact': 'Edit Contact',
            'modalTitleDeleteContact': 'Delete Contact',
            'confirmDeleteContact': 'Are you sure you want to delete this contact?',
            'buttonCancel': 'Cancel',
            'buttonDeleteRed': 'Delete',
            'buttonSaveContact': 'Save',
            'buttonEdit': 'Edit',
            'buttonDelete': 'Delete',
            'buttonUploadPhoto': 'Upload Photo',
            'buttonRemovePhoto': 'Remove',
            'avatarHint': 'Drag & drop or click to upload',
            'sectionBasicInfo': 'Basic Information',
            'sectionContactDetails': 'Contact Details',
            'labelName': 'Name',
            'labelRole': 'Role',
            'labelPhone': 'Phone',
            'labelEmail': 'Email',
            'labelWebsite': 'Website',
            'labelNotes': 'Notes',
            'placeholderFullName': 'Full name',
            'placeholderRole': 'e.g. DoP, 1st AC',
            'placeholderPhone': '+1 234 567 890',
            'placeholderEmail': 'name@example.com',
            'placeholderWebsite': 'https://',
            'placeholderNotes': 'Additional notes...',
            'alertEnterName': 'Please enter a name',
            'statusUnavailable': 'Contacts module not loaded.',
            'profileSectionTitle': 'Your Profile',
            'profileSectionDescription': 'Add your details to appear as "User" in gear assignments.',
            'importSuccess': 'Imported {added} contacts, updated {updated}',
            'exportFilename': 'contacts.vcf'
        };

        if (typeof window !== 'undefined' && window.texts) {
            const langSelect = document.getElementById('languageSelect');
            const lang = (langSelect && langSelect.value) ||
                (typeof window.currentLanguage === 'string' && window.currentLanguage) ||
                'en';
            const dict = window.texts[lang] || window.texts['en'];
            if (dict) {
                // Support nested keys with dot notation (e.g. 'contacts.userProfileHeading')
                const value = key.split('.').reduce((o, i) => (o ? o[i] : null), dict);
                if (value && typeof value === 'string') {
                    return value;
                }
            }
        }
        return defaults[key] || key;
    }

    // =====================
    // PROFILE MANAGEMENT
    // =====================
    function loadUserProfile() {
        try {
            const stored = localStorage.getItem(USER_PROFILE_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                userProfile = {
                    name: typeof parsed.name === 'string' ? parsed.name : '',
                    role: typeof parsed.role === 'string' ? parsed.role : '',
                    phone: typeof parsed.phone === 'string' ? parsed.phone : '',
                    email: typeof parsed.email === 'string' ? parsed.email : '',
                    avatar: typeof parsed.avatar === 'string' ? parsed.avatar : ''
                };
                return;
            }
        } catch (e) {
            console.warn('[ContactsView] Failed to load profile:', e);
        }
        userProfile = { name: '', role: '', phone: '', email: '', avatar: '' };
    }

    function saveUserProfile() {
        try {
            localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(userProfile));
        } catch (e) {
            console.warn('[ContactsView] Failed to save profile:', e);
        }
    }

    function scheduleProfileSave() {
        if (profileSaveTimer) clearTimeout(profileSaveTimer);
        profileSaveTimer = setTimeout(() => {
            saveUserProfile();
            profileSaveTimer = null;
        }, 400);
    }

    // =====================
    // EXPORT
    // =====================
    function exportAllContacts() {
        const contactsModule = global.cineFeaturesContacts;
        if (!contactsModule) return;

        const contacts = contactsModule.loadStoredContacts();
        if (!contacts || contacts.length === 0) {
            alert('No contacts to export.');
            return;
        }

        const vcards = contactsModule.generateAllContactsVCard
            ? contactsModule.generateAllContactsVCard(contacts)
            : '';

        if (!vcards) {
            alert('Failed to generate vCard data.');
            return;
        }

        downloadFile(vcards, _t('exportFilename'), { mimeType: 'text/vcard' })
            .then(success => {
                if (!success) {
                    alert('Download failed. Please check your browser settings.');
                }
            });
    }

    // =====================
    // VCARD IMPORT
    // =====================
    function handleImportFile(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result;
            if (typeof text !== 'string') return;

            const contactsModule = global.cineFeaturesContacts;
            if (!contactsModule) {
                alert('Contacts module not loaded.');
                return;
            }

            // Use methods from the feature module
            if (!contactsModule.parseVCard || !contactsModule.mergeImportedContacts) {
                console.error('[ContactsView] Import functions missing from contacts module.');
                alert('Import functionality unavailable.');
                return;
            }

            const parsed = contactsModule.parseVCard(text);
            if (!parsed || parsed.length === 0) {
                alert('No valid contacts found in file.');
                return;
            }

            const existing = contactsModule.loadStoredContacts();
            const result = contactsModule.mergeImportedContacts({
                existing,
                imported: parsed
            });

            if (contactsModule.saveContactsToStorage(result.contacts)) {
                const msg = _t('importSuccess')
                    .replace('{added}', result.added)
                    .replace('{updated}', result.updated);
                alert(msg);
                ContactsView.render();
            }
        };
        reader.readAsText(file);
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

                // Load user profile
                loadUserProfile();

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

                // Reload profile in case it was updated elsewhere
                loadUserProfile();

                // Load contacts using the existing module
                const contactsModule = global.cineFeaturesContacts;
                if (!contactsModule) {
                    this.container.innerHTML = `
                        <div class="view-empty-state">
                            <p>${_t('statusUnavailable')}</p>
                        </div>
                    `;
                    return;
                }

                const contacts = contactsModule.loadStoredContacts();

                // Header with actions
                const header = `
                    <header class="view-header swiss-header">
                        <div class="header-content">
                            <h1 class="swiss-title">${_t('contactsViewTitle')}</h1>
                            <div class="swiss-subtitle">
                                <span class="count-badge">${contacts ? contacts.length : 0}</span>
                                ${_t('contactsViewSubtitle')}
                            </div>
                        </div>
                        <div class="view-header-actions contacts-toolbar">
                            <button class="v2-btn v2-btn-secondary" id="btn-import-vcard">
                                <span class="icon">upload_file</span>
                                <span>${_t('buttonImportVCard')}</span>
                            </button>
                            <button class="v2-btn v2-btn-secondary" id="btn-export-contacts" ${!contacts || contacts.length === 0 ? 'disabled' : ''}>
                                <span class="icon">download</span>
                                <span>${_t('buttonExportContacts')}</span>
                            </button>
                            <button class="v2-btn v2-btn-primary" id="btn-add-contact">
                                <span class="icon">add</span>
                                <span>${_t('buttonAddContact')}</span>
                            </button>
                            <input type="file" id="import-vcard-input" accept=".vcf,.vcard,text/vcard" class="visually-hidden" />
                        </div>
                    </header>
                `;

                let contentHtml = '<div class="view-content swiss-content">';

                // Profile Section
                contentHtml += this.renderProfileSection();

                // Contacts Grid
                if (!contacts || contacts.length === 0) {
                    contentHtml += `
                        <div class="view-empty-state swiss-empty-state">
                             <div class="swiss-empty-icon">
                                <span class="icon">group_off</span>
                            </div>
                            <h2>${_t('contactsEmptyTitle')}</h2>
                            <p>${_t('contactsEmptyText')}</p>
                            <button class="v2-btn v2-btn-primary" id="btn-add-contact-empty">
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

        renderProfileSection() {
            const initials = userProfile.name
                ? userProfile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                : '';

            const avatarHtml = userProfile.avatar
                ? `<img src="${userProfile.avatar}" alt="${escapeHtml(userProfile.name)}" class="avatar-img">`
                : `<span class="avatar-initials">${initials || '<span class="icon">person</span>'}</span>`;

            const roles = [
                'DoP', '1st AC', '2nd AC', 'Camera Operator', 'DIT', 'Data Wrangler',
                'VTR/Playback', 'Gaffer', 'Best Boy', 'Key Grip', 'Grip', 'Sound Mixer',
                'Boom Operator', 'PA', 'Director', 'Producer', 'Line Producer', 'Production Manager'
            ];

            const roleOptions = roles.map(r =>
                `<option value="${r}" ${userProfile.role === r ? 'selected' : ''}>${r}</option>`
            ).join('');

            return `
                <section class="swiss-profile-section">
                    <header class="swiss-profile-header">
                        <h3>${_t('profileSectionTitle')}</h3>
                        <p>${_t('profileSectionDescription')}</p>
                    </header>
                    <div class="swiss-profile-card">
                        <div class="swiss-card-main">
                            <div class="swiss-card-identity">
                                <div class="swiss-avatar" id="profile-avatar-container" tabindex="0" role="button" aria-label="Change profile photo">
                                    ${avatarHtml}
                                </div>
                            </div>
                            <div class="swiss-profile-form">
                                <div class="swiss-profile-field">
                                    <label for="profile-name">${_t('labelName')}</label>
                                    <input type="text" id="profile-name" value="${escapeHtml(userProfile.name)}" placeholder="${_t('placeholderFullName')}" autocomplete="name">
                                </div>
                                <div class="swiss-profile-field">
                                    <label for="profile-role">${_t('labelRole')}</label>
                                    <select id="profile-role">
                                        <option value="">Select role...</option>
                                        ${roleOptions}
                                    </select>
                                </div>
                                <div class="swiss-profile-field">
                                    <label for="profile-phone">${_t('labelPhone')}</label>
                                    <input type="tel" id="profile-phone" value="${escapeHtml(userProfile.phone)}" placeholder="${_t('placeholderPhone')}" autocomplete="tel">
                                </div>
                                <div class="swiss-profile-field">
                                    <label for="profile-email">${_t('labelEmail')}</label>
                                    <input type="email" id="profile-email" value="${escapeHtml(userProfile.email)}" placeholder="${_t('placeholderEmail')}" autocomplete="email">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `;
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

            const websiteLink = contact.website ? `<a href="${escapeHtml(contact.website)}" target="_blank" rel="noopener noreferrer" class="swiss-link" onclick="event.stopPropagation()">${escapeHtml(displayWebsite)}</a>` : '<span class="swiss-placeholder">—</span>';

            return `
                <div class="swiss-card contact-card" data-contact-id="${escapeHtml(contact.id)}" tabindex="0" role="button">
                    <div class="swiss-card-actions-overlay">
                         <button class="swiss-icon-btn btn-edit-contact" title="${_t('buttonEdit')}">
                            <span class="icon">edit</span>
                        </button>
                         <button class="swiss-icon-btn btn-delete-contact" title="${_t('buttonDelete')}">
                            <span class="icon">delete</span>
                        </button>
                    </div>
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
                    </div>
                    
                    <div class="swiss-card-data-grid">
                        <div class="data-cell">
                            <span class="data-label">${_t('labelPhone')}</span>
                            <span class="data-value">${phoneLink}</span>
                        </div>
                        <div class="data-cell">
                            <span class="data-label">${_t('labelEmail')}</span>
                            <span class="data-value">${emailLink}</span>
                        </div>
                        <div class="data-cell">
                            <span class="data-label">${_t('labelWebsite')}</span>
                            <span class="data-value">${websiteLink}</span>
                        </div>
                        ${contact.notes ? `
                        <div class="data-cell notes-cell">
                            <span class="data-label">${_t('labelNotes')}</span>
                            <span class="data-value notes-text">${escapeHtml(contact.notes)}</span>
                        </div>
                        ` : `
                        <div class="data-cell">
                            <span class="data-label">${_t('labelNotes')}</span>
                            <span class="data-value"><span class="swiss-placeholder">—</span></span>
                        </div>
                        `}
                    </div>
                </div>
            `;
        },

        attachListeners() {
            // Header actions
            const addBtn = this.container.querySelector('#btn-add-contact');
            const addBtnEmpty = this.container.querySelector('#btn-add-contact-empty');
            const importBtn = this.container.querySelector('#btn-import-vcard');
            const importInput = this.container.querySelector('#import-vcard-input');
            const exportBtn = this.container.querySelector('#btn-export-contacts');

            if (addBtn) addBtn.onclick = () => this.showEditModal(null);
            if (addBtnEmpty) addBtnEmpty.onclick = () => this.showEditModal(null);

            if (importBtn && importInput) {
                importBtn.onclick = () => importInput.click();
                importInput.onchange = (e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImportFile(file);
                    e.target.value = '';
                };
            }

            if (exportBtn) exportBtn.onclick = exportAllContacts;

            // Profile section
            this.attachProfileListeners();

            // Contact cards
            this.container.querySelectorAll('.contact-card').forEach(card => {
                card.onclick = (e) => {
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

        attachProfileListeners() {
            const nameInput = this.container.querySelector('#profile-name');
            const roleSelect = this.container.querySelector('#profile-role');
            const phoneInput = this.container.querySelector('#profile-phone');
            const emailInput = this.container.querySelector('#profile-email');
            const avatarContainer = this.container.querySelector('#profile-avatar-container');

            const handleProfileInput = (field, value) => {
                userProfile[field] = value;
                scheduleProfileSave();
            };

            if (nameInput) {
                nameInput.oninput = () => handleProfileInput('name', nameInput.value);
            }
            if (roleSelect) {
                roleSelect.onchange = () => handleProfileInput('role', roleSelect.value);
            }
            if (phoneInput) {
                phoneInput.oninput = () => handleProfileInput('phone', phoneInput.value);
            }
            if (emailInput) {
                emailInput.oninput = () => handleProfileInput('email', emailInput.value);
            }

            if (avatarContainer) {
                avatarContainer.onclick = () => this.openProfileAvatarEditor();
                avatarContainer.onkeydown = (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.openProfileAvatarEditor();
                    }
                };
            }
        },

        openProfileAvatarEditor() {
            if (global.cineAvatarEditorModal) {
                global.cineAvatarEditorModal.open({
                    avatar: userProfile.avatar || '',
                    onSave: (dataUrl) => {
                        userProfile.avatar = dataUrl;
                        saveUserProfile();
                        this.render();
                    },
                    onDelete: () => {
                        userProfile.avatar = '';
                        saveUserProfile();
                        this.render();
                    }
                });
            } else {
                // Fallback: simple file input
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    if (global.CINE_CONTACTS_PROFILE_MODULE?.readAvatarFile) {
                        global.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile(
                            file,
                            (dataUrl) => {
                                userProfile.avatar = dataUrl;
                                saveUserProfile();
                                this.render();
                            },
                            (err) => console.warn('Avatar read error:', err)
                        );
                    } else {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                            userProfile.avatar = ev.target?.result || '';
                            saveUserProfile();
                            this.render();
                        };
                        reader.readAsDataURL(file);
                    }
                };
                input.click();
            }
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
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-confirm-delete" style="background-color: var(--v2-status-error); border-color: var(--v2-status-error);">${_t('buttonDeleteRed')}</button>
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
                            <div class="avatar-hint">${_t('avatarHint')}</div>
                        </div>

                        <!-- Basic Info Section -->
                        <div class="contact-form-section">
                            <div class="contact-form-section-title">
                                <span class="icon">badge</span>
                                ${_t('sectionBasicInfo')}
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
                                ${_t('sectionContactDetails')}
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

            // Drag and Drop support for avatar
            const avatarDropZone = backdrop.querySelector('#avatarDropZone');

            const handleAvatarFile = (file) => {
                if (!file || !file.type.startsWith('image/')) return;

                if (global.CINE_CONTACTS_PROFILE_MODULE) {
                    global.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile(file, (dataUrl) => {
                        currentAvatar = dataUrl;
                        avatarPreview.innerHTML = `<img src="${dataUrl}">`;
                        removeAvatarBtn.disabled = false;
                    }, (err) => {
                        alert('Error reading image: ' + err);
                    });
                } else {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        currentAvatar = ev.target.result;
                        avatarPreview.innerHTML = `<img src="${currentAvatar}">`;
                        removeAvatarBtn.disabled = false;
                    };
                    reader.readAsDataURL(file);
                }
            };

            avatarDropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                avatarDropZone.classList.add('drag-over');
            });

            avatarDropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                avatarDropZone.classList.remove('drag-over');
            });

            avatarDropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                avatarDropZone.classList.remove('drag-over');

                const file = e.dataTransfer?.files?.[0];
                if (file) {
                    handleAvatarFile(file);
                }
            });

            // Save
            backdrop.querySelector('#btn-save-contact').onclick = () => {
                const name = backdrop.querySelector('#contactName').value.trim();
                if (!name) {
                    alert(_t('alertEnterName'));
                    return;
                }

                // Construct new object
                const entry = {
                    id: contactId || undefined,
                    name: name,
                    role: backdrop.querySelector('#contactRole').value.trim(),
                    phone: backdrop.querySelector('#contactPhone').value.trim(),
                    email: backdrop.querySelector('#contactEmail').value.trim(),
                    website: backdrop.querySelector('#contactWebsite').value.trim(),
                    notes: backdrop.querySelector('#contactNotes').value.trim(),
                    avatar: currentAvatar
                };

                const allContacts = module.loadStoredContacts();

                let updatedList;
                if (isNew) {
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
