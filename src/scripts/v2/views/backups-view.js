import { dataVault } from '../../modules/storage/DataVault.js';
import { storageRepo } from '../../modules/storage/StorageRepository.js';
import { unwrapMetadata } from '../../modules/storage/SyncMetadata.js';

const VIEW_ID = 'backups';

export const cineBackupsView = {
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

    async render() {
        const container = document.getElementById('v2-main'); // We might need a specific container if not using the standard structure
        // Actually, looking at index.html, we need to create a section for it if it doesn't exist

        let viewSection = document.getElementById(`view-${VIEW_ID}`);
        if (!viewSection) {
            viewSection = document.createElement('section');
            viewSection.id = `view-${VIEW_ID}`;
            viewSection.className = 'app-view';
            viewSection.innerHTML = `
                <header class="view-header">
                    <button class="v2-mobile-menu-toggle" aria-label="Open menu">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <h1>Data Vault (Backups)</h1>
                </header>
                <div class="view-content">
                    <div class="v2-backup-list" id="backupList">
                        <div class="v2-empty-state">Loading backups...</div>
                    </div>
                </div>
            `;
            document.querySelector('.v2-main').appendChild(viewSection);
        }

        const listContainer = viewSection.querySelector('#backupList');
        listContainer.innerHTML = '<div class="v2-spinner"></div>';

        try {
            const snapshots = await dataVault.listSnapshots();

            if (snapshots.length === 0) {
                listContainer.innerHTML = `
                    <div class="v2-empty-state">
                        <p>No backups found in the Vault.</p>
                        <p class="subtext">Backups are created automatically when you save projects.</p>
                    </div>`;
                return;
            }

            let html = '<ul class="v2-list">';
            for (const filename of snapshots) {
                const displayName = filename.replace(/\.json$/i, '').replace(/^snapshot_/, '');

                html += `
                    <li class="v2-list-item">
                        <div class="v2-list-content">
                            <div class="v2-list-title">${displayName}</div>
                        </div>
                        <div class="v2-list-actions">
                            <button class="v2-btn v2-btn-sm" onclick="cineBackupsView.restore('${filename}')">Restore</button>
                            <button class="v2-btn v2-btn-sm v2-btn-danger" onclick="cineBackupsView.delete('${filename}')">Delete</button>
                        </div>
                    </li>
                `;
            }
            html += '</ul>';
            listContainer.innerHTML = html;

        } catch (e) {
            listContainer.innerHTML = `<div class="v2-error-state">Failed to load backups: ${e.message}</div>`;
        }
    },

    async restore(filename) {
        if (!confirm(`Are you sure you want to restore ${filename}? This will overwrite current data.`)) return;

        try {
            const snapshot = await dataVault.restoreSnapshot(filename);
            const { data: projectData, meta } = unwrapMetadata(snapshot);
            const fallbackId = filename.replace(/\.json$/i, '');
            const projectId = (meta && meta.docId) || (projectData && projectData.id) || fallbackId;

            if (!projectData) {
                alert('Unknown backup format.');
                return;
            }

            const sanitizedMeta = meta ? { ...meta, lock: null } : null;
            const result = await storageRepo.saveProject(projectId, projectData, sanitizedMeta);
            if (!result || result.success === false) {
                const reason = result && result.error === 'PROJECT_LOCKED'
                    ? 'This project is locked by another session.'
                    : 'Unknown error.';
                alert(`Restore failed. ${reason}`);
                return;
            }

            alert('Project restored successfully!');
            // Reload or navigate
        } catch (e) {
            alert('Failed to restore: ' + e.message);
        }
    },

    async delete(filename) {
        if (!confirm(`Delete ${filename}?`)) return;
        await dataVault.deleteSnapshot(filename);
        this.render(); // Refresh list
    }
};

// Expose global for inline onclick handlers
window.cineBackupsView = cineBackupsView;
