function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  var GLOBAL_SCOPE = detectGlobalScope();
  function resolveScopeOption(scope, value, fallback) {
    if (typeof value !== 'undefined') {
      return value;
    }
    return typeof fallback === 'function' ? fallback(scope) : fallback;
  }
  function ensureSetTimeout(scope) {
    if (typeof (scope === null || scope === void 0 ? void 0 : scope.setTimeout) === 'function') {
      return scope.setTimeout.bind(scope);
    }
    if (typeof setTimeout === 'function') {
      return setTimeout;
    }
    return null;
  }
  function createOwnGearView(store) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!store || _typeof(store) !== 'object') {
      throw new Error('createOwnGearView requires a store instance.');
    }
    var scope = options.scope || GLOBAL_SCOPE || {};
    var documentRef = options.document || scope.document || null;
    var getLanguageTexts = options.getLanguageTexts || scope.getLanguageTexts || function () {
      return {};
    };
    var defaultLanguage = options.defaultLanguage || scope.DEFAULT_LANGUAGE_SAFE || 'en';
    var getCurrentLanguage = options.getCurrentLanguage || function () {
      return typeof scope.currentLang === 'string' ? scope.currentLang : defaultLanguage;
    };
    var formatWithPlaceholders = options.formatWithPlaceholders || scope.formatWithPlaceholdersSafe || function (template) {
      return template;
    };
    var setButtonLabelWithIconBinding = options.setButtonLabelWithIconBinding || scope.setButtonLabelWithIconBinding || function () {};
    var iconMarkup = options.iconMarkup || scope.iconMarkup || function () {
      return '';
    };
    var iconGlyphs = options.iconGlyphs || scope.ICON_GLYPHS || {};
    var openDialog = options.openDialog || scope.openDialog || function () {};
    var closeDialog = options.closeDialog || scope.closeDialog || function () {};
    var formatQuantityText = typeof options.formatQuantityText === 'function' ? options.formatQuantityText : function (value) {
      return value;
    };
    var requestAnimationFrameRef = options.requestAnimationFrame || scope.requestAnimationFrame || null;
    var confirmRef = options.confirm || scope.window && scope.window.confirm && scope.window.confirm.bind(scope.window) || (typeof scope.confirm === 'function' ? scope.confirm.bind(scope) : null);
    var scheduleTimeout = ensureSetTimeout(scope);
    var dataSources = {
      devices: resolveScopeOption(scope, options.devices, function (innerScope) {
        return innerScope.devices;
      }),
      gearItemTranslations: resolveScopeOption(scope, options.gearItemTranslations, function (innerScope) {
        return innerScope.gearItemTranslations;
      }),
      looksLikeGearName: resolveScopeOption(scope, options.looksLikeGearName, function (innerScope) {
        return innerScope && innerScope.looksLikeGearName;
      })
    };
    var state = {
      initialized: false,
      items: Array.isArray(options.initialItems) ? options.initialItems.slice() : [],
      editingId: null,
      suggestionCache: {
        lang: null,
        list: [],
        lookup: new Set()
      },
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
        addHelp: null
      }
    };
    function getCurrentTexts(lang) {
      var activeLang = lang || getCurrentLanguage();
      var fallbackTexts = getLanguageTexts(defaultLanguage) || {};
      var langTexts = getLanguageTexts(activeLang) || {};
      return {
        langTexts: langTexts,
        fallbackTexts: fallbackTexts,
        activeLang: activeLang
      };
    }
    function collectOwnGearSuggestionInfo() {
      var _getCurrentTexts = getCurrentTexts(),
        activeLang = _getCurrentTexts.activeLang;
      if (state.suggestionCache.lang === activeLang && state.suggestionCache.list.length) {
        return state.suggestionCache;
      }
      var uniqueNames = new Map();
      var addName = function addName(name) {
        if (typeof name !== 'string') {
          return;
        }
        var trimmed = name.trim();
        if (!trimmed) {
          return;
        }
        var key = trimmed.toLowerCase();
        if (uniqueNames.has(key)) {
          return;
        }
        uniqueNames.set(key, trimmed);
      };
      var _traverseDevices = function traverseDevices(value, seen) {
        if (!value || _typeof(value) !== 'object') {
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
          addName("".concat(value.brand, " ").concat(value.model));
        }
        if (Array.isArray(value)) {
          value.forEach(function (entry) {
            return _traverseDevices(entry, seen);
          });
          return;
        }
        Object.keys(value).forEach(function (key) {
          if (key === 'name' || key === 'label' || key === 'brand' || key === 'model') {
            return;
          }
          if (key.includes(' ') && typeof dataSources.looksLikeGearName === 'function' && dataSources.looksLikeGearName(key)) {
            addName(key);
          }
          _traverseDevices(value[key], seen);
        });
      };
      try {
        if (dataSources.devices && _typeof(dataSources.devices) === 'object') {
          _traverseDevices(dataSources.devices, new WeakSet());
        }
      } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('cine.ownGear.view could not traverse device catalog for suggestions.', error);
        }
      }
      try {
        var langItems = dataSources.gearItemTranslations && _typeof(dataSources.gearItemTranslations) === 'object' ? dataSources.gearItemTranslations[activeLang] || dataSources.gearItemTranslations[defaultLanguage] || null : null;
        if (langItems && _typeof(langItems) === 'object') {
          Object.keys(langItems).forEach(function (key) {
            addName(key);
            var translated = langItems[key];
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
      state.items.forEach(function (item) {
        if (item && typeof item.name === 'string') {
          addName(item.name);
        }
      });
      var list = Array.from(uniqueNames.values()).sort(function (a, b) {
        return a.localeCompare(b, activeLang);
      });
      var lookup = new Set(list.map(function (name) {
        return name.toLowerCase();
      }));
      state.suggestionCache = {
        lang: activeLang,
        list: list,
        lookup: lookup
      };
      return state.suggestionCache;
    }
    function refreshOwnGearSuggestions() {
      if (!state.elements.suggestions || !documentRef) {
        return;
      }
      var _collectOwnGearSugges = collectOwnGearSuggestionInfo(),
        list = _collectOwnGearSugges.list;
      var fragment = documentRef.createDocumentFragment();
      list.forEach(function (name) {
        var option = documentRef.createElement('option');
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
      var template = count === 1 ? langTexts.ownGearListSummaryOne || fallbackTexts.ownGearListSummaryOne : langTexts.ownGearListSummaryOther || fallbackTexts.ownGearListSummaryOther;
      if (!template) {
        return '';
      }
      if (template.includes('%s')) {
        return formatWithPlaceholders(template, String(count));
      }
      return "".concat(template, " ").concat(count).trim();
    }
    function updateOwnGearSummary() {
      if (!state.elements.summary) {
        return;
      }
      var _getCurrentTexts2 = getCurrentTexts(),
        langTexts = _getCurrentTexts2.langTexts,
        fallbackTexts = _getCurrentTexts2.fallbackTexts;
      var summary = formatOwnGearCountText(state.items.length, langTexts, fallbackTexts);
      if (summary) {
        state.elements.summary.textContent = summary;
        state.elements.summary.removeAttribute('hidden');
      } else {
        state.elements.summary.textContent = '';
        state.elements.summary.setAttribute('hidden', '');
      }
    }
    function createOwnGearActionButton(label, icon, onClick) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (!documentRef) {
        return null;
      }
      var button = documentRef.createElement('button');
      button.type = 'button';
      button.className = options.className || 'own-gear-item-action';
      var iconHtml = typeof iconMarkup === 'function' && icon ? iconMarkup(icon, 'btn-icon') : '';
      button.innerHTML = "".concat(iconHtml).concat(label);
      button.setAttribute('aria-label', options.ariaLabel || label);
      button.addEventListener('click', onClick);
      return button;
    }
    function renderOwnGearList() {
      if (!state.elements.list || !documentRef) {
        return;
      }
      state.elements.list.innerHTML = '';
      var _getCurrentTexts3 = getCurrentTexts(),
        langTexts = _getCurrentTexts3.langTexts;
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
      var fragment = documentRef.createDocumentFragment();
      state.items.forEach(function (item) {
        if (!item || typeof item.id !== 'string') {
          return;
        }
        var listItem = documentRef.createElement('li');
        listItem.className = 'own-gear-item';
        listItem.dataset.ownGearId = item.id;
        var body = documentRef.createElement('div');
        body.className = 'own-gear-item-body';
        var title = documentRef.createElement('p');
        title.className = 'own-gear-item-title';
        var quantityText = formatQuantityText(item.quantity || '');
        title.textContent = quantityText ? "".concat(quantityText, " \xD7 ").concat(item.name) : item.name;
        body.appendChild(title);
        if (item.notes) {
          var note = documentRef.createElement('p');
          note.className = 'own-gear-item-note';
          note.textContent = item.notes;
          body.appendChild(note);
        }
        listItem.appendChild(body);
        var actions = documentRef.createElement('div');
        actions.className = 'own-gear-item-actions';
        var editLabel = langTexts.ownGearEditButton || 'Edit';
        var editAria = langTexts.ownGearEditButtonAria ? formatWithPlaceholders(langTexts.ownGearEditButtonAria, item.name) : editLabel;
        var editButton = createOwnGearActionButton(editLabel, iconGlyphs.sliders, function () {
          return startEditingOwnGearItem(item.id);
        }, {
          ariaLabel: editAria
        });
        if (editButton) {
          actions.appendChild(editButton);
        }
        var deleteLabel = langTexts.ownGearDeleteButton || 'Remove';
        var deleteAria = langTexts.ownGearDeleteButtonAria ? formatWithPlaceholders(langTexts.ownGearDeleteButtonAria, item.name) : deleteLabel;
        var deleteButton = createOwnGearActionButton(deleteLabel, iconGlyphs.trash, function () {
          return removeOwnGearItem(item.id);
        }, {
          ariaLabel: deleteAria,
          className: 'own-gear-item-action own-gear-item-action-danger'
        });
        if (deleteButton) {
          actions.appendChild(deleteButton);
        }
        listItem.appendChild(actions);
        fragment.appendChild(listItem);
      });
      state.elements.list.appendChild(fragment);
      updateOwnGearSummary();
    }
    function resetOwnGearForm() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
      var _getCurrentTexts4 = getCurrentTexts(),
        langTexts = _getCurrentTexts4.langTexts,
        fallbackTexts = _getCurrentTexts4.fallbackTexts;
      if (state.editingId) {
        var label = langTexts.ownGearUpdateButton || fallbackTexts.ownGearUpdateButton || 'Update item';
        setButtonLabelWithIconBinding(state.elements.saveButton, label, iconGlyphs.save || null);
      } else {
        var _label = langTexts.ownGearSaveButton || fallbackTexts.ownGearSaveButton || 'Save item';
        setButtonLabelWithIconBinding(state.elements.saveButton, _label, iconGlyphs.add || null);
      }
    }
    function normalizeOwnGearQuantityInput(raw) {
      if (typeof raw !== 'string') {
        return {
          value: '',
          valid: true
        };
      }
      var trimmed = raw.trim();
      if (!trimmed) {
        return {
          value: '',
          valid: true
        };
      }
      var normalized = trimmed.replace(',', '.');
      var parsed = Number(normalized);
      if (!Number.isFinite(parsed) || parsed < 0) {
        return {
          value: '',
          valid: false
        };
      }
      var formatted = formatQuantityText(String(parsed));
      return {
        value: formatted,
        valid: true
      };
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
      var _getCurrentTexts5 = getCurrentTexts(),
        langTexts = _getCurrentTexts5.langTexts,
        fallbackTexts = _getCurrentTexts5.fallbackTexts;
      var rawName = state.elements.nameInput.value || '';
      var trimmedName = rawName.trim();
      if (!trimmedName) {
        var message = langTexts.ownGearNameRequired || fallbackTexts.ownGearNameRequired || 'Enter an item name to continue.';
        state.elements.nameInput.setCustomValidity(message);
        if (typeof state.elements.nameInput.reportValidity === 'function') {
          state.elements.nameInput.reportValidity();
        }
        return;
      }
      state.elements.nameInput.setCustomValidity('');
      var quantityResult = normalizeOwnGearQuantityInput(state.elements.quantityInput ? state.elements.quantityInput.value : '');
      if (!quantityResult.valid) {
        if (state.elements.quantityInput) {
          var _message = langTexts.ownGearQuantityInvalid || fallbackTexts.ownGearQuantityInvalid || 'Enter a non-negative quantity.';
          state.elements.quantityInput.setCustomValidity(_message);
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
      var notes = state.elements.notesInput ? state.elements.notesInput.value.trim() : '';
      var _collectOwnGearSugges2 = collectOwnGearSuggestionInfo(),
        lookup = _collectOwnGearSugges2.lookup;
      var source = lookup.has(trimmedName.toLowerCase()) ? 'catalog' : 'custom';
      if (state.editingId) {
        var index = state.items.findIndex(function (item) {
          return item && item.id === state.editingId;
        });
        if (index !== -1) {
          var updated = _objectSpread(_objectSpread({}, state.items[index]), {}, {
            name: trimmedName,
            source: source
          });
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
        var entry = {
          id: store.generateOwnGearId(),
          name: trimmedName,
          source: source
        };
        if (quantityResult.value) {
          entry.quantity = quantityResult.value;
        }
        if (notes) {
          entry.notes = notes;
        }
        state.items.push(entry);
      }
      persistItems();
      state.suggestionCache = {
        lang: null,
        list: [],
        lookup: new Set()
      };
      renderOwnGearList();
      refreshOwnGearSuggestions();
      resetOwnGearForm({
        focusName: true
      });
    }
    function startEditingOwnGearItem(id) {
      var item = state.items.find(function (entry) {
        return entry && entry.id === id;
      });
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
      var index = state.items.findIndex(function (entry) {
        return entry && entry.id === id;
      });
      if (index === -1) {
        return;
      }
      var item = state.items[index];
      var _getCurrentTexts6 = getCurrentTexts(),
        langTexts = _getCurrentTexts6.langTexts;
      var confirmTemplate = langTexts.ownGearDeleteConfirm || 'Remove “%s” from your gear list?';
      var confirmMessage = confirmTemplate;
      if (confirmTemplate.includes('%s')) {
        confirmMessage = formatWithPlaceholders(confirmTemplate, item.name);
      }
      var confirmed = true;
      if (confirmRef) {
        try {
          confirmed = confirmRef(confirmMessage);
        } catch (error) {
          void error;
          confirmed = true;
        }
      }
      if (!confirmed) {
        return;
      }
      state.items.splice(index, 1);
      if (state.editingId === id) {
        resetOwnGearForm();
      }
      persistItems();
      state.suggestionCache = {
        lang: null,
        list: [],
        lookup: new Set()
      };
      renderOwnGearList();
      refreshOwnGearSuggestions();
    }
    function applyOwnGearLocalization(lang) {
      if (!documentRef) {
        return;
      }
      var _getCurrentTexts7 = getCurrentTexts(lang),
        langTexts = _getCurrentTexts7.langTexts,
        fallbackTexts = _getCurrentTexts7.fallbackTexts;
      var title = documentRef.getElementById('ownGearDialogHeading');
      if (title) {
        title.textContent = langTexts.ownGearDialogTitle || fallbackTexts.ownGearDialogTitle || 'Own gear';
      }
      var description = documentRef.getElementById('ownGearDialogDescription');
      if (description) {
        var text = langTexts.ownGearDialogDescription || fallbackTexts.ownGearDialogDescription || '';
        description.textContent = text;
        if (text) {
          description.removeAttribute('hidden');
        } else {
          description.setAttribute('hidden', '');
        }
      }
      var addHeading = documentRef.getElementById('ownGearAddHeading');
      if (addHeading) {
        addHeading.textContent = langTexts.ownGearAddHeading || fallbackTexts.ownGearAddHeading || 'Add gear';
      }
      if (state.elements.addHelp) {
        var helpText = langTexts.ownGearAddHelp || fallbackTexts.ownGearAddHelp || '';
        state.elements.addHelp.textContent = helpText;
        if (helpText) {
          state.elements.addHelp.removeAttribute('hidden');
          state.elements.addHelp.setAttribute('data-help', helpText);
        } else {
          state.elements.addHelp.setAttribute('hidden', '');
          state.elements.addHelp.removeAttribute('data-help');
        }
      }
      var nameLabel = documentRef.getElementById('ownGearNameLabel');
      if (nameLabel) {
        nameLabel.textContent = langTexts.ownGearNameLabel || fallbackTexts.ownGearNameLabel || 'Item';
      }
      if (state.elements.nameInput) {
        var placeholder = langTexts.ownGearNamePlaceholder || fallbackTexts.ownGearNamePlaceholder || '';
        if (placeholder) {
          state.elements.nameInput.setAttribute('placeholder', placeholder);
        } else {
          state.elements.nameInput.removeAttribute('placeholder');
        }
        var _helpText = langTexts.ownGearNameHelp || fallbackTexts.ownGearNameHelp || '';
        if (_helpText) {
          state.elements.nameInput.setAttribute('data-help', _helpText);
        } else {
          state.elements.nameInput.removeAttribute('data-help');
        }
      }
      var quantityLabel = documentRef.getElementById('ownGearQuantityLabel');
      if (quantityLabel) {
        quantityLabel.textContent = langTexts.ownGearQuantityLabel || fallbackTexts.ownGearQuantityLabel || 'Quantity';
      }
      if (state.elements.quantityInput) {
        var _placeholder = langTexts.ownGearQuantityPlaceholder || fallbackTexts.ownGearQuantityPlaceholder || '';
        if (_placeholder) {
          state.elements.quantityInput.setAttribute('placeholder', _placeholder);
        } else {
          state.elements.quantityInput.removeAttribute('placeholder');
        }
        var _helpText2 = langTexts.ownGearQuantityHelp || fallbackTexts.ownGearQuantityHelp || '';
        if (_helpText2) {
          state.elements.quantityInput.setAttribute('data-help', _helpText2);
        } else {
          state.elements.quantityInput.removeAttribute('data-help');
        }
      }
      var notesLabel = documentRef.getElementById('ownGearNotesLabel');
      if (notesLabel) {
        notesLabel.textContent = langTexts.ownGearNotesLabel || fallbackTexts.ownGearNotesLabel || 'Notes';
      }
      if (state.elements.notesInput) {
        var _placeholder2 = langTexts.ownGearNotesPlaceholder || fallbackTexts.ownGearNotesPlaceholder || '';
        if (_placeholder2) {
          state.elements.notesInput.setAttribute('placeholder', _placeholder2);
        } else {
          state.elements.notesInput.removeAttribute('placeholder');
        }
        var _helpText3 = langTexts.ownGearNotesHelp || fallbackTexts.ownGearNotesHelp || '';
        if (_helpText3) {
          state.elements.notesInput.setAttribute('data-help', _helpText3);
        } else {
          state.elements.notesInput.removeAttribute('data-help');
        }
      }
      if (state.elements.resetButton) {
        var label = langTexts.ownGearResetButton || fallbackTexts.ownGearResetButton || 'Reset';
        setButtonLabelWithIconBinding(state.elements.resetButton, label, iconGlyphs.reload || null);
      }
      if (state.elements.closeButton) {
        var _label2 = langTexts.ownGearCloseButton || fallbackTexts.ownGearCloseButton || 'Close';
        setButtonLabelWithIconBinding(state.elements.closeButton, _label2, iconGlyphs.circleX || null);
      }
      var listHeading = documentRef.getElementById('ownGearListHeading');
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
      state.elements.dialog.addEventListener('cancel', function (event) {
        if (event && typeof event.preventDefault === 'function') {
          event.preventDefault();
        }
        closeDialog(state.elements.dialog);
        resetOwnGearForm();
      });
      state.elements.dialog.addEventListener('close', function () {
        resetOwnGearForm();
      });
      state.elements.dialog.addEventListener('click', function (event) {
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
        state.elements.resetButton.addEventListener('click', function () {
          resetOwnGearForm({
            focusName: true
          });
        });
      }
      if (state.elements.closeButton) {
        state.elements.closeButton.addEventListener('click', function () {
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
          requestAnimationFrameRef(function () {
            if (typeof state.elements.nameInput.focus === 'function') {
              state.elements.nameInput.focus();
            }
          });
        } else if (scheduleTimeout) {
          scheduleTimeout(function () {
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
      state.items = typeof store.loadStoredOwnGearItems === 'function' ? store.loadStoredOwnGearItems() : state.items;
      applyOwnGearLocalization(getCurrentLanguage());
      bindEvents();
      updateOwnGearSaveButtonState();
      renderOwnGearList();
      refreshOwnGearSuggestions();
      state.initialized = true;
      return true;
    }
    return {
      initialize: initialize,
      openDialog: openOwnGearDialogInternal,
      applyLocalization: applyOwnGearLocalization,
      refreshSuggestions: refreshOwnGearSuggestions
    };
  }
  var ownGearViewApi = {
    createOwnGearView: createOwnGearView
  };
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = ownGearViewApi;
  }
  if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
    try {
      GLOBAL_SCOPE.cineOwnGearView = ownGearViewApi;
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('cine.ownGear.view could not expose global api.', error);
      }
    }
  }
})();