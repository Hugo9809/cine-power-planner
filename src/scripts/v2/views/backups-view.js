import { dataVault } from '../../modules/storage/DataVault.js';
import { storageRepo } from '../../modules/storage/StorageRepository.js';
import { unwrapMetadata } from '../../modules/storage/SyncMetadata.js';

const VIEW_ID = 'backups';

/**
 * Resolve a localized translation string by key.
 * @param {string} key - Dot-delimited translation key.
 * @returns {string}
 */
function _t(key) {
    if (typeof window !== 'undefined' && window.texts) {
        const langSelect = document.getElementById('languageSelect');
        const lang = (langSelect && langSelect.value)
            || (typeof window.currentLanguage === 'string' && window.currentLanguage)
            || 'en';
        const dict = window.texts[lang] || window.texts.en;
        if (dict) {
            return key.split('.').reduce((o, i) => (o ? o[i] : null), dict) || key;
        }
    }
    return key;
}

/**
 * Replace template tokens in a localized string.
 * @param {string} template - String containing {tokens}.
 * @param {Record<string, string>} tokens - Replacement tokens.
 * @returns {string}
 */
function formatTemplate(template, tokens = {}) {
    if (typeof template !== 'string') return '';
    return template.replace(/\{(\w+)\}/gu, (match, token) => {
        if (Object.prototype.hasOwnProperty.call(tokens, token)) {
            return String(tokens[token]);
        }
        return match;
    });
}

/**
 * Normalize a snapshot filename into a human-readable label.
 * @param {string} filename - Raw filename from the vault.
 * @returns {string}
 */
function formatSnapshotLabel(filename) {
    return String(filename || '')
        .replace(/\.json$/i, '')
        .replace(/^snapshot_/, '');
}

/**
 * Build a safe filename for the pre-restore safety snapshot.
 * @param {string} projectId - Project identifier.
 * @returns {string}
 */
function buildSafetySnapshotName(projectId) {
    const timestamp = new Date().toISOString().replace(/[^\d]/gu, '-');
    const base = projectId ? `${projectId}-restore-safety` : 'restore-safety';
    return `${base}-${timestamp}`;
}

/**
 * Render a loading spinner with accessible labels.
 * @returns {HTMLDivElement}
 */
function createLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'v2-spinner';
    spinner.setAttribute('role', 'status');
    spinner.setAttribute('aria-live', 'polite');
    spinner.setAttribute('aria-label', _t('backupVaultLoading'));
    return spinner;
}

/**
 * Create a styled empty-state block.
 * @param {string} title - Primary message.
 * @param {string} [subtitle] - Secondary message.
 * @returns {HTMLDivElement}
 */
function createEmptyState(title, subtitle) {
    const wrapper = document.createElement('div');
    wrapper.className = 'v2-empty-state';
    const titleEl = document.createElement('p');
    titleEl.textContent = title;
    wrapper.appendChild(titleEl);
    if (subtitle) {
        const subtitleEl = document.createElement('p');
        subtitleEl.className = 'subtext';
        subtitleEl.textContent = subtitle;
        wrapper.appendChild(subtitleEl);
    }
    return wrapper;
}

/**
 * Create a styled error-state block.
 * @param {string} message - Error message to display.
 * @returns {HTMLDivElement}
 */
function createErrorState(message) {
    const wrapper = document.createElement('div');
    wrapper.className = 'v2-error-state';
    wrapper.textContent = message;
    return wrapper;
}

/**
 * Build a standard action button.
 * @param {string} label - Button label text.
 * @param {string} className - CSS classes to apply.
 * @param {() => void} onClick - Click handler.
 * @param {string} [ariaLabel] - Optional aria-label.
 * @returns {HTMLButtonElement}
 */
function createActionButton(label, className, onClick, ariaLabel) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.textContent = label;
    if (ariaLabel) {
        button.setAttribute('aria-label', ariaLabel);
        button.setAttribute('title', ariaLabel);
    }
    button.addEventListener('click', onClick);
    return button;
}

/**
 * Create a safety snapshot before overwriting an existing project.
 * @param {string} projectId - Project identifier.
 * @returns {Promise<boolean>}
 */
async function createSafetySnapshot(projectId) {
    if (!projectId) {
        return true;
    }
    try {
        const existing = await storageRepo.loadProject(projectId);
        if (!existing || !existing.data) {
            return true;
        }
        const wrapped = existing.meta
            ? { _meta: existing.meta, data: existing.data }
            : existing.data;
        const snapshotName = buildSafetySnapshotName(projectId);
        await dataVault.saveSnapshot(snapshotName, wrapped);
        return true;
    } catch (error) {
        console.warn('Failed to capture safety snapshot before restore', error);
        return false;
    }
}

export const cineBackupsView = {
    /**
     * Register and expose the backups view.
     * @returns {void}
     */
    init() {
        // Register with View Manager
        // Assuming global.cineViewManager exists based on bootstrap.js
        if (window.cineViewManager) {
            window.cineViewManager.registerView(VIEW_ID, {
                onEnter: () => this.render(),
                onLeave: () => { }
            });
        }

        // Expose to sidebar
        const navItem = document.getElementById('navAutoBackups');
        if (navItem) {
            navItem.style.display = 'flex'; // Reveal the menu item
        }
    },

    /**
     * Render the backups view and load vault entries.
     * @returns {Promise<void>}
     */
    async render() {
        const container = document.querySelector('.v2-main')
            || document.querySelector('.v2-app')
            || document.body;
        let viewSection = document.getElementById(`view-${VIEW_ID}`);
        if (!viewSection) {
            viewSection = document.createElement('section');
            viewSection.id = `view-${VIEW_ID}`;
            viewSection.className = 'app-view';
            viewSection.innerHTML = `
                <header class="view-header">
                    <button class="v2-mobile-menu-toggle" aria-label="${_t('menuToggleLabel')}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <h1>${_t('backupVaultHeading')}</h1>
                </header>
                <div class="view-content">
                    <div class="v2-backup-list" id="backupList">
                        <div class="v2-empty-state">${_t('backupVaultLoading')}</div>
                    </div>
                </div>
            `;
            container.appendChild(viewSection);
        }

        const listContainer = viewSection.querySelector('#backupList');
        listContainer.replaceChildren(createLoadingSpinner());

        try {
            const snapshots = await dataVault.listSnapshots();

            if (snapshots.length === 0) {
                listContainer.replaceChildren(
                    createEmptyState(
                        _t('backupVaultEmptyTitle'),
                        _t('backupVaultEmptySubtitle'),
                    ),
                );
                return;
            }

            const list = document.createElement('ul');
            list.className = 'v2-list';
            for (const filename of snapshots) {
                const displayName = formatSnapshotLabel(filename);
                const listItem = document.createElement('li');
                listItem.className = 'v2-list-item';
                const content = document.createElement('div');
                content.className = 'v2-list-content';
                const title = document.createElement('div');
                title.className = 'v2-list-title';
                title.textContent = displayName;
                content.appendChild(title);

                const actions = document.createElement('div');
                actions.className = 'v2-list-actions';
                const restoreLabel = _t('buttonRestore');
                const restoreAria = formatTemplate(_t('backupVaultRestoreAriaLabel'), {
                    name: displayName,
                });
                const deleteLabel = _t('buttonDelete');
                const deleteAria = formatTemplate(_t('backupVaultDeleteAriaLabel'), {
                    name: displayName,
                });
                actions.appendChild(
                    createActionButton(
                        restoreLabel,
                        'v2-btn v2-btn-sm',
                        () => this.restore(filename, displayName),
                        restoreAria,
                    ),
                );
                actions.appendChild(
                    createActionButton(
                        deleteLabel,
                        'v2-btn v2-btn-sm v2-btn-danger',
                        () => this.delete(filename, displayName),
                        deleteAria,
                    ),
                );

                listItem.appendChild(content);
                listItem.appendChild(actions);
                list.appendChild(listItem);
            }
            listContainer.replaceChildren(list);

        } catch (e) {
            const message = formatTemplate(_t('backupVaultLoadError'), {
                message: e && e.message ? e.message : _t('backupVaultLoadErrorFallback'),
            });
            listContainer.replaceChildren(createErrorState(message));
        }
    },

    /**
     * Restore a selected snapshot into storage.
     * @param {string} filename - Snapshot filename to restore.
     * @param {string} [label] - Human-friendly label.
     * @returns {Promise<void>}
     */
    async restore(filename, label = '') {
        const confirmationMessage = formatTemplate(_t('backupVaultRestoreConfirm'), {
            name: label || filename,
        });
        if (!confirm(confirmationMessage)) return;

        try {
            const snapshot = await dataVault.restoreSnapshot(filename);
            const { data: projectData, meta } = unwrapMetadata(snapshot);
            const fallbackId = filename.replace(/\.json$/i, '');
            const projectId = (meta && meta.docId) || (projectData && projectData.id) || fallbackId;

            if (!projectData) {
                alert(_t('backupVaultUnknownFormat'));
                return;
            }

            const safetySnapshotOk = await createSafetySnapshot(projectId);
            if (!safetySnapshotOk) {
                alert(_t('restoreBackupFailed'));
                return;
            }

            const sanitizedMeta = meta ? { ...meta, lock: null } : null;
            const result = await storageRepo.saveProject(projectId, projectData, sanitizedMeta);
            if (!result || result.success === false) {
                const reason = result && result.error === 'PROJECT_LOCKED'
                    ? _t('backupVaultRestoreLocked')
                    : _t('backupVaultRestoreUnknownError');
                alert(formatTemplate(_t('backupVaultRestoreFailed'), { reason }));
                return;
            }

            alert(_t('backupVaultRestoreSuccess'));
            // Reload or navigate
        } catch (e) {
            const message = formatTemplate(_t('backupVaultRestoreError'), {
                message: e && e.message ? e.message : _t('backupVaultRestoreUnknownError'),
            });
            alert(message);
        }
    },

    /**
     * Delete a snapshot from the vault.
     * @param {string} filename - Snapshot filename to remove.
     * @param {string} [label] - Human-friendly label.
     * @returns {Promise<void>}
     */
    async delete(filename, label = '') {
        const confirmationMessage = formatTemplate(_t('backupVaultDeleteConfirm'), {
            name: label || filename,
        });
        if (!confirm(confirmationMessage)) return;
        try {
            await dataVault.deleteSnapshot(filename);
            await this.render(); // Refresh list
        } catch (error) {
            const message = formatTemplate(_t('backupVaultDeleteError'), {
                message: error && error.message ? error.message : _t('backupVaultDeleteErrorFallback'),
            });
            alert(message);
        }
    }
};

// Expose global for inline onclick handlers
window.cineBackupsView = cineBackupsView;
