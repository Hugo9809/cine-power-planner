/*
 * Crew selector helpers extracted from the monolithic app core runtime.
 *
 * This module encapsulates the DOM-heavy logic that populates and formats the
 * Auto Gear crew multiselect so that the main runtime bundle can continue to
 * shrink without sacrificing behaviour. The helpers accept their dependencies
 * through an options object which keeps the code flexible during the ongoing
 * refactor while still supporting the legacy global execution environment.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function detectScope(primaryScope) {
    if (isObject(primaryScope)) {
      return primaryScope;
    }

    if (typeof globalThis !== 'undefined' && isObject(globalThis)) {
      return globalThis;
    }

    if (typeof window !== 'undefined' && isObject(window)) {
      return window;
    }

    if (typeof self !== 'undefined' && isObject(self)) {
      return self;
    }

    if (typeof global !== 'undefined' && isObject(global)) {
      return global;
    }

    return null;
  }

  function ensureDocument(candidate) {
    if (candidate && typeof candidate.createElement === 'function') {
      return candidate;
    }

    if (typeof document !== 'undefined' && document && typeof document.createElement === 'function') {
      return document;
    }

    return null;
  }

  function defaultCollectSelectedValues() {
    return [];
  }

  function defaultComputeMultiSelectSize(optionCount) {
    if (!Number.isFinite(optionCount) || optionCount <= 0) {
      return 1;
    }
    return Math.max(1, Math.min(optionCount, 10));
  }

  function defaultGetCrewRoleEntries() {
    return [];
  }

  function defaultGetLocalizedTexts() {
    return {};
  }

  function defaultGetDefaultLanguageTexts() {
    return {};
  }

  function createAutoGearCrewOptionHelpers(options) {
    const documentRef = ensureDocument(options && options.documentRef);
    const collectSelectedValues =
      (options && typeof options.collectSelectedValues === 'function'
        ? options.collectSelectedValues
        : defaultCollectSelectedValues);
    const computeMultiSelectSize =
      (options && typeof options.computeMultiSelectSize === 'function'
        ? options.computeMultiSelectSize
        : defaultComputeMultiSelectSize);
    const getCrewRoleEntries =
      (options && typeof options.getCrewRoleEntries === 'function'
        ? options.getCrewRoleEntries
        : defaultGetCrewRoleEntries);
    const minRows =
      options && Number.isFinite(options.autoGearFlexMinRows) && options.autoGearFlexMinRows > 0
        ? options.autoGearFlexMinRows
        : 1;
    const getLocalizedTexts =
      (options && typeof options.getLocalizedTexts === 'function'
        ? options.getLocalizedTexts
        : defaultGetLocalizedTexts);
    const getDefaultLanguageTexts =
      (options && typeof options.getDefaultLanguageTexts === 'function'
        ? options.getDefaultLanguageTexts
        : defaultGetDefaultLanguageTexts);

    function refreshCrewOptions(selectElement, selected, key) {
      if (!selectElement || !documentRef) {
        return;
      }

      const selectedValues = collectSelectedValues(selected, key);

      selectElement.innerHTML = '';
      selectElement.multiple = true;

      const entries = getCrewRoleEntries();
      const seen = new Set();

      const appendOption = (value, label) => {
        if (!value || seen.has(value)) {
          return;
        }
        const option = documentRef.createElement('option');
        option.value = value;
        option.textContent = label;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        selectElement.appendChild(option);
        seen.add(value);
      };

      (Array.isArray(entries) ? entries : []).forEach(entry => {
        if (!entry) return;
        appendOption(entry.value, entry.label);
      });

      selectedValues.forEach(value => {
        if (!seen.has(value)) {
          appendOption(value, value);
        }
      });

      const selectableOptions = Array.from(selectElement.options || []).filter(option => !option.disabled);
      selectElement.size = computeMultiSelectSize(selectableOptions.length, { minRows });
    }

    function getCrewRoleLabel(value) {
      if (typeof value !== 'string') {
        return '';
      }
      const trimmed = value.trim();
      if (!trimmed) {
        return '';
      }

      const langTexts = getLocalizedTexts() || {};
      const fallbackTexts = getDefaultLanguageTexts() || {};
      const crewRoleMap = langTexts.crewRoles || fallbackTexts.crewRoles || {};
      return crewRoleMap[trimmed] || trimmed;
    }

    return {
      refreshCrewOptions,
      getCrewRoleLabel,
    };
  }

  const namespace = {
    createAutoGearCrewOptionHelpers,
  };

  const globalScope = detectScope();

  if (isObject(globalScope)) {
    const existing =
      isObject(globalScope.cineCoreAppRuntimeAutoGearCrew)
        ? globalScope.cineCoreAppRuntimeAutoGearCrew
        : {};

    Object.assign(existing, namespace);

    try {
      globalScope.cineCoreAppRuntimeAutoGearCrew = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();

