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
  function updateOverlayText(note) {
    if (!overlay) {
      return;
    }
    var text = lastText;
    if (note && typeof note.textContent === 'string') {
      text = note.textContent.trim();
    }
    if (typeof text !== 'string') {
      text = '';
    }
    if (text !== lastText) {
      lastText = text;
    }
    if (overlay.textContent !== text) {
      overlay.textContent = text;
    }
  }
  function updateOverlayVisibility(note) {
    if (!overlay || !dialog) {
      return;
    }
    var notePresent = !!(note && document.contains(note));
    var noteHidden = false;
    if (notePresent) {
      if (note.hasAttribute && note.hasAttribute('hidden')) {
        noteHidden = true;
      } else if (note.classList && note.classList.contains('hidden')) {
        noteHidden = true;
      } else if (note.style && (note.style.display === 'none' || note.style.visibility === 'hidden')) {
        noteHidden = true;
      }
    }
    var hasText = typeof lastText === 'string' && lastText.trim().length > 0;
    var shouldShow = !!(dialog.open && notePresent && !noteHidden && hasText);
    overlay.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
    if (dialog && dialog.classList) {
      if (shouldShow) {
        dialog.classList.add('has-gear-list-note');
      } else {
        dialog.classList.remove('has-gear-list-note');
      }
    }
    if (shouldShow) {
      overlay.hidden = false;
      if (overlay.classList) {
        overlay.classList.add(VISIBLE_CLASS);
      }
    } else {
      if (overlay.classList) {
        overlay.classList.remove(VISIBLE_CLASS);
      }
      overlay.hidden = true;
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