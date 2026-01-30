/**
 * Dialog Manager
 * Handles generic confirmation and alert dialogs
 */

/**
 * Show a confirmation dialog with confirm and cancel buttons
 * @param {Object} options - Dialog options
 * @param {string} options.title - Dialog title
 * @param {string} options.message - Dialog message
 * @param {string} options.confirmLabel - Confirm button label
 * @param {string} options.cancelLabel - Cancel button label
 * @param {Function} options.onConfirm - Callback when confirmed
 * @param {Function} options.onCancel - Callback when cancelled
 * @param {boolean} options.danger - Whether to style as dangerous action
 */
function showConfirmDialog(options) {
    const {
        title,
        message,
        confirmLabel,
        cancelLabel,
        onConfirm,
        onCancel,
        danger = false,
    } = options || {};

    const dialog = document.getElementById('appConfirmDialog');
    const titleEl = document.getElementById('appConfirmTitle');
    const messageEl = document.getElementById('appConfirmMessage');
    const confirmBtn = document.getElementById('appConfirmBtn');
    const cancelBtn = document.getElementById('appConfirmCancelBtn');

    if (!dialog || !confirmBtn || !cancelBtn) {
        console.warn('Confirmation dialog elements missing');
        return;
    }

    if (titleEl) titleEl.textContent = title || 'Confirm';
    if (messageEl) {
        if (typeof message === 'string' && message.includes('\n')) {
            messageEl.innerHTML = message.replace(/\n/g, '<br>');
        } else {
            messageEl.textContent = message || 'Are you sure?';
        }
    }

    confirmBtn.textContent = confirmLabel || 'Confirm';
    cancelBtn.textContent = cancelLabel || 'Cancel';
    cancelBtn.style.display = 'inline-block';

    if (danger) {
        confirmBtn.classList.add('danger');
    } else {
        confirmBtn.classList.remove('danger');
    }

    // Clone buttons to remove old listeners
    const newConfirmBtn = confirmBtn.cloneNode(true);
    const newCancelBtn = cancelBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

    const close = () => {
        if (typeof dialog.close === 'function') {
            dialog.close();
        }
        dialog.setAttribute('hidden', '');
    };

    newConfirmBtn.addEventListener('click', () => {
        close();
        if (typeof onConfirm === 'function') {
            onConfirm();
        }
    });

    newCancelBtn.addEventListener('click', () => {
        close();
        if (typeof onCancel === 'function') {
            onCancel();
        }
    });

    dialog.removeAttribute('hidden');
    if (typeof dialog.showModal === 'function') {
        dialog.showModal();
    }
}

/**
 * Show an alert dialog with only an OK button
 * @param {Object|string} options - Dialog options or message string
 * @param {string} options.title - Dialog title
 * @param {string} options.message - Dialog message
 * @param {string} options.confirmLabel - OK button label
 * @param {Function} options.onConfirm - Callback when confirmed
 */
function showAlertDialog(options) {
    const config = typeof options === 'string' ? { message: options } : (options || {});
    const {
        title,
        message,
        confirmLabel,
        onConfirm,
    } = config;

    const dialog = document.getElementById('appConfirmDialog');
    const titleEl = document.getElementById('appConfirmTitle');
    const messageEl = document.getElementById('appConfirmMessage');
    const confirmBtn = document.getElementById('appConfirmBtn');
    const cancelBtn = document.getElementById('appConfirmCancelBtn');

    if (!dialog || !confirmBtn || !cancelBtn) {
        console.warn('Alert dialog elements missing');
        if (typeof alert === 'function') alert(message);
        return;
    }

    if (titleEl) titleEl.textContent = title || 'Notification';
    if (messageEl) {
        if (typeof message === 'string' && message.includes('\n')) {
            messageEl.innerHTML = message.replace(/\n/g, '<br>');
        } else {
            messageEl.textContent = message || '';
        }
    }

    confirmBtn.textContent = confirmLabel || 'OK';
    confirmBtn.classList.remove('danger');
    cancelBtn.style.display = 'none';

    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

    const close = () => {
        if (typeof dialog.close === 'function') {
            dialog.close();
        }
        dialog.setAttribute('hidden', '');
    };

    newConfirmBtn.addEventListener('click', () => {
        close();
        if (typeof onConfirm === 'function') {
            onConfirm();
        }
    });

    dialog.removeAttribute('hidden');
    if (typeof dialog.showModal === 'function') {
        dialog.showModal();
    }
}

export const DialogManager = {
    showConfirmDialog,
    showAlertDialog,
};
