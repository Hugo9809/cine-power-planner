(function () {
  // This module mirrors the autosave status note into the settings dialog so
  // the user always receives feedback about persistence progress, even when
  // the original text is scrolled out of view.
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

  // Resolve the dialog lazily because the settings UI might not exist during
  // early boot or while tests mount partial DOM fragments.
  function getDialog() {
    if (!dialog || !document.contains(dialog)) {
      dialog = document.getElementById(SETTINGS_DIALOG_ID) || null;
    }
    return dialog;
  }

  // Ensure that a dedicated status paragraph exists inside the dialog. The
  // overlay is reused to avoid creating duplicate DOM nodes on repeated
  // openings of the settings window.
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

  // Mirror the source note's text into the overlay, while debouncing redundant
  // updates. This keeps screen reader announcements calm and predictable.
  function updateOverlayText(note) {
    if (!overlay) {
      return;
    }

    lastText = '';
    hideOverlay();
  }

  // Toggle the overlay when the dialog or source note changes visibility. We
  // prefer explicit attribute updates so assistive tech reads the status
  // reliably.
  function updateOverlayVisibility(note) {
    if (!overlay || !dialog) {
      return;
    }

    hideOverlay();
  }

  // Watch the original autosave note for content changes so we can surface
  // real-time progress updates inside the modal.
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

  // Observe dialog attribute changes (like `open`) because native dialogs do
  // not fire MutationEvents when their open state flips.
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
      attributeFilter: ['open'],
    });
  }

  // React to DOM mutations that might replace the autosave note. This protects
  // us from hydration or localisation routines that rebuild parts of the UI.
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
      subtree: true,
    });
  }

  // Keep the overlay state in sync with manual dialog events such as cancel or
  // submit. These events may not trigger MutationObservers on all browsers.
  function bindDialogEvents(targetDialog) {
    if (!targetDialog || typeof targetDialog.addEventListener !== 'function') {
      return;
    }

    var handler = function () {
      updateOverlayVisibility(sourceNote);
    };

    targetDialog.addEventListener('close', handler);
    targetDialog.addEventListener('cancel', handler);
    targetDialog.addEventListener('submit', handler);
  }

  // Refresh the mirrored text whenever the document language changes so the
  // overlay stays translated alongside the source element.
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

  // Initialise observers when the DOM is ready. Running this only once keeps
  // runtime overhead low while guaranteeing the overlay reflects the latest
  // autosave status immediately after opening the dialog.
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
    document.addEventListener('DOMContentLoaded', setup, { once: true });
  } else {
    setup();
  }
})();
