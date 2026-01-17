/**
 * Emergency Modal Cleanup - Close any stuck dialogs on page load.
 */

export function closeStuckDialogs() {
    if (typeof document === 'undefined') return;

    try {
        const dialogs = document.querySelectorAll('dialog[open], .app-modal[open]');
        if (dialogs.length > 0) {
            console.log(`Found ${dialogs.length} open dialog(s) on page load`);
            dialogs.forEach((dialog, i) => {
                console.log(`Closing dialog ${i}:`, dialog.id || dialog.className);
                if (typeof dialog.close === 'function' && dialog.open) {
                    dialog.close();
                } else {
                    dialog.removeAttribute('open');
                }
            });
        }
    } catch (error) {
        console.warn('Failed to close stuck dialogs:', error);
    }
}
