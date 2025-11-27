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
    var text = note && note.textContent ? note.textContent : '';
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
    if (!note || note.hidden || note.offsetParent === null) {
      hideOverlay();
      return;
    }
    if (!dialog.open) {
      hideOverlay();
      return;
    }
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
    var handler = function handler() {
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
  function setup() {
    var targetDialog = getDialog();
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
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, {
      once: true
    });
  } else {
    setup();
  }
})();