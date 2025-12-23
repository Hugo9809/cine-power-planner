(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return null;
  }

  const GLOBAL_SCOPE = detectGlobalScope();

  function resolveScopeOption(scope, value, fallback) {
    if (typeof value !== 'undefined') {
      return value;
    }
    return typeof fallback === 'function' ? fallback(scope) : fallback;
  }

  function ensureSetTimeout(scope) {
    if (typeof scope?.setTimeout === 'function') {
      return scope.setTimeout.bind(scope);
    }
    if (typeof setTimeout === 'function') {
      return setTimeout;
    }
    return null;
  }

  function createOwnGearView(store, options = {}) {
    if (!store || typeof store !== 'object') {
      throw new Error('createOwnGearView requires a store instance.');
    }

    const scope = options.scope || GLOBAL_SCOPE || {};
    const documentRef = options.document || scope.document || null;
    const getLanguageTexts = options.getLanguageTexts
      || scope.getLanguageTexts
      || (() => ({}));
    const defaultLanguage = options.defaultLanguage
      || scope.DEFAULT_LANGUAGE_SAFE
      || 'en';
    const getCurrentLanguage = options.getCurrentLanguage
      || (() => (typeof scope.currentLang === 'string' ? scope.currentLang : defaultLanguage));
    const formatWithPlaceholders = options.formatWithPlaceholders
      || scope.formatWithPlaceholdersSafe
      || ((template) => template);
    const setButtonLabelWithIconBinding = options.setButtonLabelWithIconBinding
      || scope.setButtonLabelWithIconBinding
      || (() => { });
    const iconMarkup = options.iconMarkup || scope.iconMarkup || (() => '');
    const iconGlyphs = options.iconGlyphs || scope.ICON_GLYPHS || {};
    const openDialog = options.openDialog || scope.openDialog || (() => { });
    const closeDialog = options.closeDialog || scope.closeDialog || (() => { });
    const formatQuantityText = typeof options.formatQuantityText === 'function'
      ? options.formatQuantityText
      : (value) => value;
    const requestAnimationFrameRef = options.requestAnimationFrame
      || scope.requestAnimationFrame
      || null;
    const scheduleTimeout = ensureSetTimeout(scope);

    const dataSources = {
      devices: resolveScopeOption(scope, options.devices, (innerScope) => innerScope.devices),
      gearItemTranslations: resolveScopeOption(scope, options.gearItemTranslations, (innerScope) => innerScope.gearItemTranslations),
      looksLikeGearName: resolveScopeOption(scope, options.looksLikeGearName, (innerScope) => innerScope && innerScope.looksLikeGearName),
    };

    const state = {
      initialized: false,
      items: Array.isArray(options.initialItems) ? options.initialItems.slice() : [],
      editingId: null,
      suggestionCache: { lang: null, list: [], lookup: new Set() },
      elements: {
        dialog: null,
        form: null,
        list: null,
        emptyState: null,
        summary: null,
        nameInput: null,
        quantityInput: null,
        notesInput: null,
        saveButton: null,
        resetButton: null,
        closeButton: null,
        suggestions: null,
        addHelp: null,
      },
    };

    function getCurrentTexts(lang) {
      const activeLang = lang || getCurrentLanguage();
      const fallbackTexts = getLanguageTexts(defaultLanguage) || {};
      const langTexts = getLanguageTexts(activeLang) || {};
      return { langTexts, fallbackTexts, activeLang };
    }

    function collectOwnGearSuggestionInfo() {
      const { activeLang } = getCurrentTexts();
      if (state.suggestionCache.lang === activeLang && state.suggestionCache.list.length) {
        return state.suggestionCache;
      }

      const uniqueNames = new Map();
      const addName = (name) => {
        if (typeof name !== 'string') {
          return;
        }
        const trimmed = name.trim();
        if (!trimmed) {
          return;
        }
        const key = trimmed.toLowerCase();
        if (uniqueNames.has(key)) {
          return;
        }
        uniqueNames.set(key, trimmed);
      };

      const traverseDevices = (value, seen) => {
        if (!value || typeof value !== 'object') {
          return;
        }
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
        if (typeof value.name === 'string') {
          addName(value.name);
        }
        if (typeof value.label === 'string') {
          addName(value.label);
        }
        if (typeof value.brand === 'string' && typeof value.model === 'string') {
          addName(`${value.brand} ${value.model}`);
        }
        if (Array.isArray(value)) {
          value.forEach((entry) => traverseDevices(entry, seen));
          return;
        }
        Object.keys(value).forEach((key) => {
          if (key === 'name' || key === 'label' || key === 'brand' || key === 'model') {
            return;
          }
          if (key.includes(' ') && typeof dataSources.looksLikeGearName === 'function' && dataSources.looksLikeGearName(key)) {
            addName(key);
          }
          traverseDevices(value[key], seen);
        });
      };

      try {
        if (dataSources.devices && typeof dataSources.devices === 'object') {
          traverseDevices(dataSources.devices, new WeakSet());
        }
      } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('cine.ownGear.view could not traverse device catalog for suggestions.', error);
        }
      }

      try {
        const langItems = dataSources.gearItemTranslations && typeof dataSources.gearItemTranslations === 'object'
          ? dataSources.gearItemTranslations[activeLang]
          || dataSources.gearItemTranslations[defaultLanguage]
          || null
          : null;
        if (langItems && typeof langItems === 'object') {
          Object.keys(langItems).forEach((key) => {
            addName(key);
            const translated = langItems[key];
            if (typeof translated === 'string') {
              addName(translated);
            }
          });
        }
      } catch (translationError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('cine.ownGear.view could not collect translated suggestions.', translationError);
        }
      }

      state.items.forEach((item) => {
        if (item && typeof item.name === 'string') {
          addName(item.name);
        }
      });

      const list = Array.from(uniqueNames.values()).sort((a, b) => a.localeCompare(b, activeLang));
      const lookup = new Set(list.map((name) => name.toLowerCase()));
      state.suggestionCache = { lang: activeLang, list, lookup };
      return state.suggestionCache;
    }

    function refreshOwnGearSuggestions() {
      if (!state.elements.suggestions || !documentRef) {
        return;
      }
      const { list } = collectOwnGearSuggestionInfo();
      const fragment = documentRef.createDocumentFragment();
      list.forEach((name) => {
        const option = documentRef.createElement('option');
        option.value = name;
        fragment.appendChild(option);
      });
      state.elements.suggestions.innerHTML = '';
      state.elements.suggestions.appendChild(fragment);
      if (state.elements.addHelp) {
        if (list.length) {
          state.elements.addHelp.removeAttribute('hidden');
          state.elements.addHelp.setAttribute('data-help', state.elements.addHelp.textContent || '');
        } else {
          state.elements.addHelp.setAttribute('hidden', '');
          state.elements.addHelp.removeAttribute('data-help');
        }
      }
    }

    function formatOwnGearCountText(count, langTexts, fallbackTexts) {
      const template = count === 1
        ? langTexts.ownGearListSummaryOne || fallbackTexts.ownGearListSummaryOne
        : langTexts.ownGearListSummaryOther || fallbackTexts.ownGearListSummaryOther;
      if (!template) {
        return '';
      }
      if (template.includes('%s')) {
        return formatWithPlaceholders(template, String(count));
      }
      return `${template} ${count}`.trim();
    }

    function updateOwnGearSummary() {
      if (!state.elements.summary) {
        return;
      }
      const { langTexts, fallbackTexts } = getCurrentTexts();
      const summary = formatOwnGearCountText(state.items.length, langTexts, fallbackTexts);
      if (summary) {
        state.elements.summary.textContent = summary;
        state.elements.summary.removeAttribute('hidden');
      } else {
        state.elements.summary.textContent = '';
        state.elements.summary.setAttribute('hidden', '');
      }
    }

    function createOwnGearActionButton(label, icon, onClick, options = {}) {
      if (!documentRef) {
        return null;
      }
      const button = documentRef.createElement('button');
      button.type = 'button';
      button.className = options.className || 'own-gear-item-action';
      const iconHtml = typeof iconMarkup === 'function' && icon ? iconMarkup(icon, 'btn-icon') : '';
      button.innerHTML = `${iconHtml}${label}`;
      button.setAttribute('aria-label', options.ariaLabel || label);
      button.addEventListener('click', onClick);
      return button;
    }

    function renderOwnGearList() {
      if (!state.elements.list || !documentRef) {
        return;
      }
      state.elements.list.innerHTML = '';
      const { langTexts } = getCurrentTexts();
      if (!state.items.length) {
        if (state.elements.emptyState) {
          state.elements.emptyState.removeAttribute('hidden');
        }
        updateOwnGearSummary();
        return;
      }
      if (state.elements.emptyState) {
        state.elements.emptyState.setAttribute('hidden', '');
      }
      const fragment = documentRef.createDocumentFragment();
      state.items.forEach((item) => {
        if (!item || typeof item.id !== 'string') {
          return;
        }
        const listItem = documentRef.createElement('li');
        listItem.className = 'own-gear-item';
        listItem.dataset.ownGearId = item.id;

        const body = documentRef.createElement('div');
        body.className = 'own-gear-item-body';

        const title = documentRef.createElement('p');
        title.className = 'own-gear-item-title';
        const quantityText = formatQuantityText(item.quantity || '');
        title.textContent = quantityText ? `${quantityText} × ${item.name}` : item.name;
        body.appendChild(title);

        if (item.notes) {
          const note = documentRef.createElement('p');
          note.className = 'own-gear-item-note';
          note.textContent = item.notes;
          body.appendChild(note);
        }

        listItem.appendChild(body);

        const actions = documentRef.createElement('div');
        actions.className = 'own-gear-item-actions';

        const editLabel = langTexts.ownGearEditButton || 'Edit';
        const editAria = langTexts.ownGearEditButtonAria
          ? formatWithPlaceholders(langTexts.ownGearEditButtonAria, item.name)
          : editLabel;
        const editButton = createOwnGearActionButton(
          editLabel,
          iconGlyphs.sliders,
          () => startEditingOwnGearItem(item.id),
          { ariaLabel: editAria }
        );
        if (editButton) {
          actions.appendChild(editButton);
        }

        const deleteLabel = langTexts.ownGearDeleteButton || 'Remove';
        const deleteAria = langTexts.ownGearDeleteButtonAria
          ? formatWithPlaceholders(langTexts.ownGearDeleteButtonAria, item.name)
          : deleteLabel;
        const deleteButton = createOwnGearActionButton(
          deleteLabel,
          iconGlyphs.trash,
          () => removeOwnGearItem(item.id),
          { ariaLabel: deleteAria, className: 'own-gear-item-action own-gear-item-action-danger' }
        );
        if (deleteButton) {
          actions.appendChild(deleteButton);
        }

        listItem.appendChild(actions);
        fragment.appendChild(listItem);
      });
      state.elements.list.appendChild(fragment);
      updateOwnGearSummary();
    }

    function resetOwnGearForm(options = {}) {
      if (state.elements.nameInput) {
        state.elements.nameInput.value = '';
        state.elements.nameInput.setCustomValidity('');
      }
      if (state.elements.quantityInput) {
        state.elements.quantityInput.value = '';
        state.elements.quantityInput.setCustomValidity('');
      }
      if (state.elements.notesInput) {
        state.elements.notesInput.value = '';
      }
      state.editingId = null;
      updateOwnGearSaveButtonState();
      if (options.focusName && state.elements.nameInput && typeof state.elements.nameInput.focus === 'function') {
        state.elements.nameInput.focus();
      }
    }

    function updateOwnGearSaveButtonState() {
      if (!state.elements.saveButton) {
        return;
      }
      const { langTexts, fallbackTexts } = getCurrentTexts();
      if (state.editingId) {
        const label = langTexts.ownGearUpdateButton || fallbackTexts.ownGearUpdateButton || 'Update item';
        setButtonLabelWithIconBinding(state.elements.saveButton, label, iconGlyphs.save || null);
      } else {
        const label = langTexts.ownGearSaveButton || fallbackTexts.ownGearSaveButton || 'Save item';
        setButtonLabelWithIconBinding(state.elements.saveButton, label, iconGlyphs.add || null);
      }
    }

    function normalizeOwnGearQuantityInput(raw) {
      if (typeof raw !== 'string') {
        return { value: '', valid: true };
      }
      const trimmed = raw.trim();
      if (!trimmed) {
        return { value: '', valid: true };
      }
      const normalized = trimmed.replace(',', '.');
      const parsed = Number(normalized);
      if (!Number.isFinite(parsed) || parsed < 0) {
        return { value: '', valid: false };
      }
      const formatted = formatQuantityText(String(parsed));
      return { value: formatted, valid: true };
    }

    function persistItems() {
      if (typeof store.persistOwnGearItems === 'function') {
        store.persistOwnGearItems(state.items);
      }
    }

    function handleOwnGearSubmit(event) {
      if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
      if (!state.elements.nameInput) {
        return;
      }
      const { langTexts, fallbackTexts } = getCurrentTexts();
      const rawName = state.elements.nameInput.value || '';
      const trimmedName = rawName.trim();
      if (!trimmedName) {
        const message = langTexts.ownGearNameRequired || fallbackTexts.ownGearNameRequired || 'Enter an item name to continue.';
        state.elements.nameInput.setCustomValidity(message);
        if (typeof state.elements.nameInput.reportValidity === 'function') {
          state.elements.nameInput.reportValidity();
        }
        return;
      }
      state.elements.nameInput.setCustomValidity('');

      const quantityResult = normalizeOwnGearQuantityInput(state.elements.quantityInput ? state.elements.quantityInput.value : '');
      if (!quantityResult.valid) {
        if (state.elements.quantityInput) {
          const message = langTexts.ownGearQuantityInvalid || fallbackTexts.ownGearQuantityInvalid || 'Enter a non-negative quantity.';
          state.elements.quantityInput.setCustomValidity(message);
          if (typeof state.elements.quantityInput.reportValidity === 'function') {
            state.elements.quantityInput.reportValidity();
          }
        }
        return;
      }
      if (state.elements.quantityInput) {
        state.elements.quantityInput.setCustomValidity('');
        state.elements.quantityInput.value = quantityResult.value;
      }
      const notes = state.elements.notesInput ? state.elements.notesInput.value.trim() : '';

      const { lookup } = collectOwnGearSuggestionInfo();
      const source = lookup.has(trimmedName.toLowerCase()) ? 'catalog' : 'custom';

      if (state.editingId) {
        const index = state.items.findIndex((item) => item && item.id === state.editingId);
        if (index !== -1) {
          const updated = { ...state.items[index], name: trimmedName, source };
          if (quantityResult.value) {
            updated.quantity = quantityResult.value;
          } else {
            delete updated.quantity;
          }
          if (notes) {
            updated.notes = notes;
          } else {
            delete updated.notes;
          }
          state.items[index] = updated;
        }
      } else if (typeof store.generateOwnGearId === 'function') {
        const entry = { id: store.generateOwnGearId(), name: trimmedName, source };
        if (quantityResult.value) {
          entry.quantity = quantityResult.value;
        }
        if (notes) {
          entry.notes = notes;
        }
        state.items.push(entry);
      }

      persistItems();
      state.suggestionCache = { lang: null, list: [], lookup: new Set() };
      renderOwnGearList();
      refreshOwnGearSuggestions();
      resetOwnGearForm({ focusName: true });
    }

    function startEditingOwnGearItem(id) {
      const item = state.items.find((entry) => entry && entry.id === id);
      if (!item) {
        return;
      }
      state.editingId = id;
      if (state.elements.nameInput) {
        state.elements.nameInput.value = item.name;
        state.elements.nameInput.setCustomValidity('');
      }
      if (state.elements.quantityInput) {
        state.elements.quantityInput.value = item.quantity || '';
        state.elements.quantityInput.setCustomValidity('');
      }
      if (state.elements.notesInput) {
        state.elements.notesInput.value = item.notes || '';
      }
      updateOwnGearSaveButtonState();
      if (state.elements.nameInput && typeof state.elements.nameInput.focus === 'function') {
        state.elements.nameInput.focus();
      }
    }

    function removeOwnGearItem(id) {
      const index = state.items.findIndex((entry) => entry && entry.id === id);
      if (index === -1) {
        return;
      }
      const item = state.items[index];
      const { langTexts } = getCurrentTexts();
      const confirmTemplate = langTexts.ownGearDeleteConfirm || 'Remove “%s” from your gear list?';
      let confirmMessage = confirmTemplate;
      if (confirmTemplate.includes('%s')) {
        confirmMessage = formatWithPlaceholders(confirmTemplate, item.name);
      }
      const performDelete = () => {
        const currentIdx = state.items.findIndex((entry) => entry && entry.id === id);
        if (currentIdx === -1) return;

        state.items.splice(currentIdx, 1);
        if (state.editingId === id) {
          resetOwnGearForm();
        }
        persistItems();
        state.suggestionCache = { lang: null, list: [], lookup: new Set() };
        renderOwnGearList();
        refreshOwnGearSuggestions();
      };

      const showDialog = scope.cineShowConfirmDialog
        || (typeof window !== 'undefined' ? window.cineShowConfirmDialog : null);

      if (typeof showDialog === 'function') {
        showDialog({
          title: langTexts.ownGearDeleteTitle || 'Remove Item',
          message: confirmMessage,
          confirmLabel: langTexts.ownGearDeleteConfirmLabel || 'Remove',
          cancelLabel: langTexts.cancel || 'Cancel',
          danger: true,
          onConfirm: performDelete,
        });
        return;
      }

      if (typeof scope.confirm === 'function' && scope.confirm(confirmMessage)) {
        performDelete();
        return;
      }

      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('cine.ownGear.view missing confirm dialog implementation.');
      }
    }

    function applyOwnGearLocalization(lang) {
      if (!documentRef) {
        return;
      }
      const { langTexts, fallbackTexts } = getCurrentTexts(lang);
      const title = documentRef.getElementById('ownGearDialogHeading');
      if (title) {
        title.textContent = langTexts.ownGearDialogTitle || fallbackTexts.ownGearDialogTitle || 'Own gear';
      }
      const description = documentRef.getElementById('ownGearDialogDescription');
      if (description) {
        const text = langTexts.ownGearDialogDescription || fallbackTexts.ownGearDialogDescription || '';
        description.textContent = text;
        if (text) {
          description.removeAttribute('hidden');
        } else {
          description.setAttribute('hidden', '');
        }
      }
      const addHeading = documentRef.getElementById('ownGearAddHeading');
      if (addHeading) {
        addHeading.textContent = langTexts.ownGearAddHeading || fallbackTexts.ownGearAddHeading || 'Add gear';
      }
      if (state.elements.addHelp) {
        const helpText = langTexts.ownGearAddHelp || fallbackTexts.ownGearAddHelp || '';
        state.elements.addHelp.textContent = helpText;
        if (helpText) {
          state.elements.addHelp.removeAttribute('hidden');
          state.elements.addHelp.setAttribute('data-help', helpText);
        } else {
          state.elements.addHelp.setAttribute('hidden', '');
          state.elements.addHelp.removeAttribute('data-help');
        }
      }
      const nameLabel = documentRef.getElementById('ownGearNameLabel');
      if (nameLabel) {
        nameLabel.textContent = langTexts.ownGearNameLabel || fallbackTexts.ownGearNameLabel || 'Item';
      }
      if (state.elements.nameInput) {
        const placeholder = langTexts.ownGearNamePlaceholder || fallbackTexts.ownGearNamePlaceholder || '';
        if (placeholder) {
          state.elements.nameInput.setAttribute('placeholder', placeholder);
        } else {
          state.elements.nameInput.removeAttribute('placeholder');
        }
        const helpText = langTexts.ownGearNameHelp || fallbackTexts.ownGearNameHelp || '';
        if (helpText) {
          state.elements.nameInput.setAttribute('data-help', helpText);
        } else {
          state.elements.nameInput.removeAttribute('data-help');
        }
      }
      const quantityLabel = documentRef.getElementById('ownGearQuantityLabel');
      if (quantityLabel) {
        quantityLabel.textContent = langTexts.ownGearQuantityLabel || fallbackTexts.ownGearQuantityLabel || 'Quantity';
      }
      if (state.elements.quantityInput) {
        const placeholder = langTexts.ownGearQuantityPlaceholder || fallbackTexts.ownGearQuantityPlaceholder || '';
        if (placeholder) {
          state.elements.quantityInput.setAttribute('placeholder', placeholder);
        } else {
          state.elements.quantityInput.removeAttribute('placeholder');
        }
        const helpText = langTexts.ownGearQuantityHelp || fallbackTexts.ownGearQuantityHelp || '';
        if (helpText) {
          state.elements.quantityInput.setAttribute('data-help', helpText);
        } else {
          state.elements.quantityInput.removeAttribute('data-help');
        }
      }
      const notesLabel = documentRef.getElementById('ownGearNotesLabel');
      if (notesLabel) {
        notesLabel.textContent = langTexts.ownGearNotesLabel || fallbackTexts.ownGearNotesLabel || 'Notes';
      }
      if (state.elements.notesInput) {
        const placeholder = langTexts.ownGearNotesPlaceholder || fallbackTexts.ownGearNotesPlaceholder || '';
        if (placeholder) {
          state.elements.notesInput.setAttribute('placeholder', placeholder);
        } else {
          state.elements.notesInput.removeAttribute('placeholder');
        }
        const helpText = langTexts.ownGearNotesHelp || fallbackTexts.ownGearNotesHelp || '';
        if (helpText) {
          state.elements.notesInput.setAttribute('data-help', helpText);
        } else {
          state.elements.notesInput.removeAttribute('data-help');
        }
      }
      if (state.elements.resetButton) {
        const label = langTexts.ownGearResetButton || fallbackTexts.ownGearResetButton || 'Reset';
        setButtonLabelWithIconBinding(state.elements.resetButton, label, iconGlyphs.reload || null);
      }
      if (state.elements.closeButton) {
        const label = langTexts.ownGearCloseButton || fallbackTexts.ownGearCloseButton || 'Close';
        setButtonLabelWithIconBinding(state.elements.closeButton, label, iconGlyphs.circleX || null);
      }
      const listHeading = documentRef.getElementById('ownGearListHeading');
      if (listHeading) {
        listHeading.textContent = langTexts.ownGearListHeading || fallbackTexts.ownGearListHeading || 'Your gear';
      }
      if (state.elements.emptyState) {
        state.elements.emptyState.textContent = langTexts.ownGearListEmpty || fallbackTexts.ownGearListEmpty || 'No gear saved yet.';
      }
      updateOwnGearSaveButtonState();
      renderOwnGearList();
    }

    function wireDialogHandlers() {
      if (!state.elements.dialog) {
        return;
      }
      state.elements.dialog.addEventListener('cancel', (event) => {
        if (event && typeof event.preventDefault === 'function') {
          event.preventDefault();
        }
        closeDialog(state.elements.dialog);
        resetOwnGearForm();
      });
      state.elements.dialog.addEventListener('close', () => {
        resetOwnGearForm();
      });
      state.elements.dialog.addEventListener('click', (event) => {
        if (event && event.target === state.elements.dialog) {
          closeDialog(state.elements.dialog);
          resetOwnGearForm();
        }
      });
    }

    function initializeDomReferences() {
      if (!documentRef) {
        return false;
      }
      state.elements.dialog = documentRef.getElementById('ownGearDialog');
      if (!state.elements.dialog) {
        return false;
      }
      state.elements.form = documentRef.getElementById('ownGearForm');
      state.elements.list = documentRef.getElementById('ownGearList');
      state.elements.emptyState = documentRef.getElementById('ownGearEmptyState');
      state.elements.summary = documentRef.getElementById('ownGearListSummary');
      state.elements.nameInput = documentRef.getElementById('ownGearName');
      state.elements.quantityInput = documentRef.getElementById('ownGearQuantity');
      state.elements.notesInput = documentRef.getElementById('ownGearNotes');
      state.elements.saveButton = documentRef.getElementById('ownGearSaveButton');
      state.elements.resetButton = documentRef.getElementById('ownGearResetButton');
      state.elements.closeButton = documentRef.getElementById('ownGearCloseButton');
      state.elements.suggestions = documentRef.getElementById('ownGearSuggestions');
      state.elements.addHelp = documentRef.getElementById('ownGearAddHelp');
      return true;
    }

    function bindEvents() {
      if (state.elements.form) {
        state.elements.form.addEventListener('submit', handleOwnGearSubmit);
      }
      if (state.elements.resetButton) {
        state.elements.resetButton.addEventListener('click', () => {
          resetOwnGearForm({ focusName: true });
        });
      }
      if (state.elements.closeButton) {
        state.elements.closeButton.addEventListener('click', () => {
          closeDialog(state.elements.dialog);
          resetOwnGearForm();
        });
      }
      wireDialogHandlers();
    }

    function openOwnGearDialogInternal() {
      if (!state.initialized) {
        initialize();
      }
      if (!state.elements.dialog) {
        return;
      }
      openDialog(state.elements.dialog);
      if (state.elements.nameInput) {
        if (typeof requestAnimationFrameRef === 'function') {
          requestAnimationFrameRef(() => {
            if (typeof state.elements.nameInput.focus === 'function') {
              state.elements.nameInput.focus();
            }
          });
        } else if (scheduleTimeout) {
          scheduleTimeout(() => {
            if (typeof state.elements.nameInput.focus === 'function') {
              state.elements.nameInput.focus();
            }
          }, 0);
        } else if (typeof state.elements.nameInput.focus === 'function') {
          state.elements.nameInput.focus();
        }
      }
    }

    function initialize() {
      if (!initializeDomReferences()) {
        return false;
      }
      state.items = typeof store.loadStoredOwnGearItems === 'function'
        ? store.loadStoredOwnGearItems()
        : state.items;
      applyOwnGearLocalization(getCurrentLanguage());
      bindEvents();
      updateOwnGearSaveButtonState();
      renderOwnGearList();
      refreshOwnGearSuggestions();
      state.initialized = true;
      return true;
    }

    return {
      initialize,
      openDialog: openOwnGearDialogInternal,
      applyLocalization: applyOwnGearLocalization,
      refreshSuggestions: refreshOwnGearSuggestions,
    };
  }

  const ownGearViewApi = { createOwnGearView };

  if (typeof module === 'object' && module && module.exports) {
    module.exports = ownGearViewApi;
  }

  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
    try {
      GLOBAL_SCOPE.cineOwnGearView = ownGearViewApi;
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('cine.ownGear.view could not expose global api.', error);
      }
    }
  }
})();
