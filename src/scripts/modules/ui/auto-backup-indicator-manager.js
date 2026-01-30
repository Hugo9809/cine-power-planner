/**
 * Auto Backup Indicator Manager
 * Handles the auto-backup activity indicator UI
 */

const AUTO_BACKUP_INDICATOR_ID = 'cineAutoBackupIndicator';
const AUTO_BACKUP_INDICATOR_SPINNER_STYLE_ID = 'cineAutoBackupSpinnerStyles';
let autoBackupIndicatorRefCount = 0;

function ensureNotificationContainer() {
    // Get container from notification module or create
    if (typeof document === 'undefined') return null;
    let container = document.getElementById('cineNotificationContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'cineNotificationContainer';
        container.className = 'cine-notification-container';
        document.body.appendChild(container);
    }
    return container;
}

function removeNode(node) {
    if (node && node.parentNode) {
        node.parentNode.removeChild(node);
    }
}

function ensureAutoBackupSpinnerStyles() {
    if (typeof document === 'undefined') return;
    if (document.getElementById(AUTO_BACKUP_INDICATOR_SPINNER_STYLE_ID)) {
        return;
    }
    const style = document.createElement('style');
    style.id = AUTO_BACKUP_INDICATOR_SPINNER_STYLE_ID;
    style.textContent = `@keyframes cineAutoBackupSpinnerRotate {\n    0% { transform: rotate(0deg); }\n    100% { transform: rotate(360deg); }\n  }`;
    document.head.appendChild(style);
}

function showAutoBackupActivityIndicator(message) {
    if (typeof document === 'undefined') {
        return () => { };
    }
    const container = ensureNotificationContainer();
    if (!container) {
        return () => { };
    }
    ensureAutoBackupSpinnerStyles();

    let indicator = document.getElementById(AUTO_BACKUP_INDICATOR_ID);
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = AUTO_BACKUP_INDICATOR_ID;
        indicator.style.display = 'flex';
        indicator.style.alignItems = 'center';
        indicator.style.gap = '0.75rem';
        indicator.style.padding = '0.75rem 1.25rem';
        indicator.style.marginTop = '0.5rem';
        indicator.style.borderRadius = '0.75rem';
        indicator.style.border = 'none';
        indicator.style.boxShadow = '0 0.75rem 2.5rem rgba(0, 0, 0, 0.14)';
        indicator.style.background = 'rgba(32, 40, 62, 0.92)';
        indicator.style.color = '#ffffff';
        indicator.setAttribute('role', 'status');
        indicator.setAttribute('aria-live', 'polite');

        const spinner = document.createElement('span');
        spinner.style.display = 'inline-block';
        spinner.style.width = '1.5rem';
        spinner.style.height = '1.5rem';
        spinner.style.borderRadius = '50%';
        spinner.style.border = '0.2rem solid rgba(255, 255, 255, 0.3)';
        spinner.style.borderTopColor = '#ffffff';
        spinner.style.animation = 'cineAutoBackupSpinnerRotate 1s linear infinite';
        spinner.setAttribute('aria-hidden', 'true');
        indicator.appendChild(spinner);

        const textNode = document.createElement('span');
        textNode.className = 'auto-backup-indicator-text';
        indicator.appendChild(textNode);

        container.appendChild(indicator);
    }

    const textTarget = indicator.querySelector('.auto-backup-indicator-text');
    if (textTarget) {
        textTarget.textContent = message;
    }

    autoBackupIndicatorRefCount += 1;
    indicator.dataset.count = String(autoBackupIndicatorRefCount);
    indicator.style.display = 'flex';

    return () => {
        autoBackupIndicatorRefCount = Math.max(0, autoBackupIndicatorRefCount - 1);
        if (autoBackupIndicatorRefCount === 0) {
            removeNode(indicator);
            if (!container.children.length) {
                removeNode(container);
            }
        }
    };
}

export const AutoBackupIndicatorManager = {
    AUTO_BACKUP_INDICATOR_ID,
    AUTO_BACKUP_INDICATOR_SPINNER_STYLE_ID,
    ensureAutoBackupSpinnerStyles,
    showAutoBackupActivityIndicator,
};
