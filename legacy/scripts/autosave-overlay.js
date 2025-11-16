(function () {
  if (typeof document === 'undefined') {
    return;
  }
  var SETTINGS_DIALOG_ID = 'settingsDialog';
  var SOURCE_NOTE_ID = 'gearListAutosaveNote';
  var OVERLAY_NOTE_ID = 'gearListAutosaveOverlayNote';
  var VISIBLE_CLASS = 'is-visible';
  var dialog = null;
  var overlay = null;
  var sourceNote = null;
  var lastText = '';
  var sourceObserver = null;
  var dialogObserver = null;
  var bodyObserver = null;
  function getDialog() {
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
    lastText = '';
    hideOverlay();
  }
  function updateOverlayVisibility(note) {
    if (!overlay || !dialog) {
      return;
    }
    hideOverlay();
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
      attributes: true
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
      updateOverlayVisibility(sourceNote);
    });
    dialogObserver.observe(targetDialog, {
      attributes: true,
      attributeFilter: ['open']
    });
  }
  function observeBody() {
    if (bodyObserver || typeof MutationObserver !== 'function') {
      return;
    }
    bodyObserver = new MutationObserver(function () {
      var latestSource = document.getElementById(SOURCE_NOTE_ID);
      if (latestSource !== sourceNote) {
        sourceNote = latestSource || null;
        observeSource(sourceNote);
        updateOverlayText(sourceNote);
        updateOverlayVisibility(sourceNote);
      }
    });
    bodyObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  function bindDialogEvents(targetDialog) {
    if (!targetDialog || typeof targetDialog.addEventListener !== 'function') {
      return;
    }
    targetDialog.addEventListener('close', function () {
      updateOverlayVisibility(sourceNote);
    });
    targetDialog.addEventListener('cancel', function () {
      updateOverlayVisibility(sourceNote);
    });
    targetDialog.addEventListener('submit', function () {
      updateOverlayVisibility(sourceNote);
    });
  }
  function init() {
    dialog = getDialog();
    if (!dialog) {
      return;
    }
    overlay = ensureOverlay(dialog);
    sourceNote = document.getElementById(SOURCE_NOTE_ID) || null;
    updateOverlayText(sourceNote);
    updateOverlayVisibility(sourceNote);
    bindDialogEvents(dialog);
    observeDialog(dialog);
    observeSource(sourceNote);
    observeBody();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
