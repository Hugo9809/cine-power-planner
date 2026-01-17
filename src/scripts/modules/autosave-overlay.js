/**
 * Autosave Overlay Module
 * Mirrors the autosave status note into the settings dialog.
 * 
 * Ensures that background autosave activity is visible to the user even when
 * working inside the settings modal.
 *
 * @module modules/autosave-overlay
 * @see {@link ../../docs/dev/architecture/v2-views.md} for UI architecture
 */

const SETTINGS_DIALOG_ID = 'settingsDialog';
const SOURCE_NOTE_ID = 'gearListAutosaveNote';
const OVERLAY_NOTE_ID = 'gearListAutosaveOverlayNote';
const VISIBLE_CLASS = 'is-visible';

let dialog = null;
let overlay = null;
let sourceNote = null;
let lastText = '';
let sourceObserver = null;
let dialogObserver = null;
let bodyObserver = null;

function getDialog() {
    if (typeof document === 'undefined') {
        return null;
    }
    if (!dialog || !document.contains(dialog)) {
        dialog = document.getElementById(SETTINGS_DIALOG_ID) || null;
    }
    return dialog;
}

function ensureOverlay(targetDialog) {
    if (!targetDialog) {
        return null;
    }

    if (!overlay || !targetDialog.contains(overlay)) {
        overlay = targetDialog.querySelector('#' + OVERLAY_NOTE_ID);
    }

    if (!overlay) {
        overlay = document.createElement('p');
        overlay.id = OVERLAY_NOTE_ID;
        overlay.className = 'gear-list-autosave-note gear-list-autosave-note--overlay';
        overlay.setAttribute('role', 'status');
        overlay.setAttribute('aria-live', 'polite');
        overlay.setAttribute('aria-atomic', 'true');
        overlay.hidden = true;
        overlay.setAttribute('aria-hidden', 'true');
        targetDialog.appendChild(overlay);
    }

    return overlay;
}

function hideOverlay() {
    if (overlay) {
        overlay.textContent = '';
        overlay.hidden = true;
        overlay.setAttribute('aria-hidden', 'true');
        if (overlay.classList) {
            overlay.classList.remove(VISIBLE_CLASS);
        }
    }

    if (dialog && dialog.classList) {
        dialog.classList.remove('has-gear-list-note');
    }
}

function updateOverlayText(note) {
    if (!overlay) {
        return;
    }

    const text = (note && note.textContent) ? note.textContent : '';
    if (text === lastText) {
        return;
    }

    lastText = text;
    overlay.textContent = text;

    if (!text) {
        hideOverlay();
    }
}

function updateOverlayVisibility(note) {
    if (!overlay || !dialog) {
        return;
    }

    // If the source note is missing or hidden, hide the overlay.
    if (!note || note.hidden || note.offsetParent === null) {
        hideOverlay();
        return;
    }

    // If the dialog is not open, hide the overlay.
    if (!dialog.open) {
        hideOverlay();
        return;
    }

    // Otherwise, show it.
    overlay.hidden = false;
    overlay.removeAttribute('aria-hidden');
    if (overlay.classList) {
        overlay.classList.add(VISIBLE_CLASS);
    }

    if (dialog.classList) {
        dialog.classList.add('has-gear-list-note');
    }
}

function observeSource(note) {
    if (sourceObserver) {
        sourceObserver.disconnect();
        sourceObserver = null;
    }

    if (!note || typeof MutationObserver !== 'function') {
        return;
    }

    sourceObserver = new MutationObserver(function () {
        updateOverlayText(note);
        updateOverlayVisibility(note);
    });
    sourceObserver.observe(note, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
    });
}

function observeDialog(targetDialog) {
    if (dialogObserver) {
        dialogObserver.disconnect();
        dialogObserver = null;
    }

    if (!targetDialog || typeof MutationObserver !== 'function') {
        return;
    }

    dialogObserver = new MutationObserver(function () {
        // We pass sourceNote here, which is updated globally in this module scope
        updateOverlayVisibility(sourceNote);
    });
    dialogObserver.observe(targetDialog, {
        attributes: true,
        attributeFilter: ['open'],
    });
}

function observeBody() {
    if (bodyObserver || typeof MutationObserver !== 'function') {
        return;
    }

    bodyObserver = new MutationObserver(function () {
        const latestSource = document.getElementById(SOURCE_NOTE_ID);
        if (latestSource !== sourceNote) {
            sourceNote = latestSource || null;
            observeSource(sourceNote);
            updateOverlayText(sourceNote);
            updateOverlayVisibility(sourceNote);
        }
    });
    bodyObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

function bindDialogEvents(targetDialog) {
    if (!targetDialog || typeof targetDialog.addEventListener !== 'function') {
        return;
    }

    const handler = function () {
        updateOverlayVisibility(sourceNote);
    };

    targetDialog.addEventListener('close', handler);
    targetDialog.addEventListener('cancel', handler);
    targetDialog.addEventListener('submit', handler);
}

function bindLanguageChange() {
    if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
        return;
    }

    window.addEventListener('languagechange', function () {
        sourceNote = document.getElementById(SOURCE_NOTE_ID) || null;
        updateOverlayText(sourceNote);
        updateOverlayVisibility(sourceNote);
    });
}

export function disconnectObservers() {
    if (sourceObserver) {
        sourceObserver.disconnect();
        sourceObserver = null;
    }
    if (dialogObserver) {
        dialogObserver.disconnect();
        dialogObserver = null;
    }
    if (bodyObserver) {
        bodyObserver.disconnect();
        bodyObserver = null;
    }
}

export function initAutosaveOverlay() {
    if (typeof document === 'undefined') {
        return;
    }
    const targetDialog = getDialog();
    if (!targetDialog) {
        return;
    }

    ensureOverlay(targetDialog);
    sourceNote = document.getElementById(SOURCE_NOTE_ID) || null;

    updateOverlayText(sourceNote);
    updateOverlayVisibility(sourceNote);

    observeDialog(targetDialog);
    observeSource(sourceNote);
    observeBody();
    bindDialogEvents(targetDialog);
    bindLanguageChange();
}
