// Emergency Modal Cleanup - Close any stuck dialogs on page load
(function () {
    function closeStuckDialogs() {
        try {
            const dialogs = document.querySelectorAll('dialog[open], .app-modal[open]');
            console.log(`Found ${dialogs.length} open dialog(s) on page load`);
            dialogs.forEach((dialog, i) => {
                console.log(`Closing dialog ${i}:`, dialog.id || dialog.className);
                if (typeof dialog.close === 'function' && dialog.open) {
                    dialog.close();
                } else {
                    dialog.removeAttribute('open');
                }
            });
        } catch (error) {
            console.warn('Failed to close stuck dialogs:', error);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', closeStuckDialogs);
    } else {
        closeStuckDialogs();
    }

    // Also run after a short delay to catch late-opening dialogs
    setTimeout(closeStuckDialogs, 500);
})();
