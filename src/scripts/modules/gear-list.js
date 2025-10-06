/*
 * Gear list and project requirements utilities.
 *
 * This module centralises the logic that turns the currently rendered gear list
 * and project requirements into shareable HTML snippets. The functions expose
 * safe helpers so other parts of the application can snapshot the user state
 * without risking data loss.
 */

(function createGearListModule(globalScope) {
  'use strict';

  const scope = globalScope || (typeof globalThis !== 'undefined' ? globalThis : undefined);

  function getDocumentFromScope(source) {
    if (source && typeof source.document === 'object') {
      return source.document;
    }
    if (typeof document === 'object') {
      return document;
    }
    return null;
  }

  function isElement(candidate) {
    return Boolean(candidate && typeof candidate.querySelector === 'function');
  }

  function resolveElementById(id, source, fallbackName) {
    if (!id) return null;

    const doc = getDocumentFromScope(source);
    if (doc && typeof doc.getElementById === 'function') {
      const element = doc.getElementById(id);
      if (element) {
        return element;
      }
    }

    if (source && fallbackName && typeof source === 'object') {
      try {
        const candidate = source[fallbackName];
        if (candidate) {
          return candidate;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  }

  function resolveGearListRoot(options) {
    if (options && isElement(options.gearListRoot)) {
      return options.gearListRoot;
    }

    const optionScope = options && options.scope ? options.scope : scope;
    if (optionScope && isElement(optionScope.gearListOutput)) {
      return optionScope.gearListOutput;
    }

    return resolveElementById('gearListOutput', optionScope, 'gearListOutput');
  }

  function resolveProjectRequirementsRoot(options) {
    if (options && isElement(options.projectRequirementsRoot)) {
      return options.projectRequirementsRoot;
    }

    const optionScope = options && options.scope ? options.scope : scope;
    if (optionScope && isElement(optionScope.projectRequirementsOutput)) {
      return optionScope.projectRequirementsOutput;
    }

    return resolveElementById('projectRequirementsOutput', optionScope, 'projectRequirementsOutput');
  }

  function normalizeProjectName(options) {
    if (options && typeof options.projectName === 'string') {
      return options.projectName;
    }

    const optionScope = options && options.scope ? options.scope : scope;
    if (optionScope && typeof optionScope.getCurrentProjectName === 'function') {
      try {
        const name = optionScope.getCurrentProjectName();
        if (typeof name === 'string') {
          return name;
        }
      } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to read project name from scope.getCurrentProjectName()', error);
        }
      }
    }

    if (optionScope && typeof optionScope.currentProjectName === 'string') {
      return optionScope.currentProjectName;
    }

    return '';
  }

  function synchroniseSelectState(cloneRoot, originalRoot, id) {
    if (!cloneRoot || !id) return;
    const cloneSelect = cloneRoot.querySelector(`#${id}`);
    if (!cloneSelect || typeof cloneSelect.options === 'undefined') return;

    const originalSelect = originalRoot ? originalRoot.querySelector(`#${id}`) : null;
    const selectedValue = originalSelect ? originalSelect.value : cloneSelect.value;

    Array.from(cloneSelect.options).forEach((option) => {
      if (option.value === selectedValue) {
        option.setAttribute('selected', '');
      } else {
        option.removeAttribute('selected');
      }
    });
  }

  function preserveCheckboxState(cloneRoot, originalRoot) {
    if (!cloneRoot) return;
    Array.from(cloneRoot.querySelectorAll('input[type="checkbox"]')).forEach((checkbox) => {
      const original = originalRoot
        ? originalRoot.querySelector(`input[type="checkbox"][name="${checkbox.name}"][value="${checkbox.value}"]`)
        : null;
      const isChecked = original ? original.checked : checkbox.checked;
      if (isChecked) {
        checkbox.setAttribute('checked', '');
      } else {
        checkbox.removeAttribute('checked');
      }
    });
  }

  function sanitiseRequirementsHtml(requirementsRoot) {
    if (!requirementsRoot || typeof requirementsRoot.cloneNode !== 'function') {
      return '';
    }

    const clone = requirementsRoot.cloneNode(true);
    const editBtn = clone.querySelector('#editProjectBtn');
    if (editBtn) editBtn.remove();
    const title = clone.querySelector('h2');
    if (title) title.remove();
    return clone.innerHTML.trim();
  }

  function sanitiseGearHtml(gearRoot) {
    if (!gearRoot || typeof gearRoot.cloneNode !== 'function') {
      return '';
    }

    const clone = gearRoot.cloneNode(true);

    const actions = clone.querySelector('#gearListActions');
    if (actions) actions.remove();
    const editBtn = clone.querySelector('#editProjectBtn');
    if (editBtn) editBtn.remove();

    ['Director', 'Dop', 'Gaffer', 'Focus'].forEach((role) => {
      synchroniseSelectState(clone, gearRoot, `gearList${role}Monitor`);
    });

    ['Director', 'Combo', 'Dop'].forEach((role) => {
      synchroniseSelectState(clone, gearRoot, `gearList${role}Monitor15`);
    });

    synchroniseSelectState(clone, gearRoot, 'gearListCage');
    synchroniseSelectState(clone, gearRoot, 'gearListEasyrig');
    synchroniseSelectState(clone, gearRoot, 'gearListSliderBowl');
    synchroniseSelectState(clone, gearRoot, 'gearListEyeLeatherColor');

    [1, 2].forEach((index) => {
      synchroniseSelectState(clone, gearRoot, `gearListProGaffColor${index}`);
      synchroniseSelectState(clone, gearRoot, `gearListProGaffWidth${index}`);
    });

    preserveCheckboxState(clone, gearRoot);

    const table = clone.querySelector('.gear-table');
    return table ? `<h3>Gear List</h3>${table.outerHTML}` : '';
  }

  function getCurrentGearListHtml(options) {
    const projectRequirementsRoot = resolveProjectRequirementsRoot(options);
    const gearListRoot = resolveGearListRoot(options);

    const projectHtml = sanitiseRequirementsHtml(projectRequirementsRoot);
    const gearHtml = sanitiseGearHtml(gearListRoot);

    if (!projectHtml && !gearHtml) {
      return '';
    }

    const projectName = normalizeProjectName(options);
    const titleHtml = projectName ? `<h2>${projectName}</h2>` : '';
    const combined = `${titleHtml}${projectHtml}${gearHtml}`.trim();

    const persist = !options || options.persistLastSnapshot !== false;
    if (combined && persist && typeof globalThis !== 'undefined') {
      globalThis.__cineLastGearListHtml = combined;
    }

    return combined;
  }

  function getGearListSelectors(options) {
    const gearListRoot = resolveGearListRoot(options);
    if (!gearListRoot) return {};

    const selectors = {};
    gearListRoot.querySelectorAll('select[id]').forEach((select) => {
      const id = select.id;
      if (!id) return;
      if (select.multiple) {
        selectors[id] = Array.from(select.selectedOptions || []).map((option) => option.value);
      } else {
        selectors[id] = select.value;
      }
    });

    return selectors;
  }

  function applyGearListSelectors(selectors, options) {
    const gearListRoot = resolveGearListRoot(options);
    if (!gearListRoot || !selectors || typeof selectors !== 'object') {
      return;
    }

    Object.entries(selectors).forEach(([id, value]) => {
      if (!id) return;
      const select = gearListRoot.querySelector(`#${id}`);
      if (!select) return;

      if (select.multiple) {
        const values = Array.isArray(value) ? value : [value];
        Array.from(select.options).forEach((option) => {
          option.selected = values.includes(option.value);
        });
      } else {
        select.value = value;
      }

      if (typeof select.dispatchEvent === 'function') {
        select.dispatchEvent(new Event('change'));
      }
    });
  }

  function cloneGearListSelectors(selectors) {
    if (!selectors || typeof selectors !== 'object') return {};
    const clone = {};
    Object.entries(selectors).forEach(([id, value]) => {
      if (!id || typeof id !== 'string') return;
      if (Array.isArray(value)) {
        clone[id] = value.map((item) => (typeof item === 'string' ? item : String(item ?? '')));
      } else if (value === undefined || value === null) {
        clone[id] = '';
      } else {
        clone[id] = typeof value === 'string' ? value : String(value);
      }
    });
    return clone;
  }

  const api = Object.freeze({
    getCurrentGearListHtml,
    getGearListSelectors,
    applyGearListSelectors,
    cloneGearListSelectors,
    resolveGearListRoot,
    resolveProjectRequirementsRoot,
  });

  if (scope) {
    const cineNamespace = scope.cine || (scope.cine = {});
    cineNamespace.gearList = api;

    if (typeof scope.getCurrentGearListHtml !== 'function') {
      scope.getCurrentGearListHtml = getCurrentGearListHtml;
    }
    if (typeof scope.getGearListSelectors !== 'function') {
      scope.getGearListSelectors = getGearListSelectors;
    }
    if (typeof scope.applyGearListSelectors !== 'function') {
      scope.applyGearListSelectors = function applySelectorsFromNamespace(data) {
        return applyGearListSelectors(data);
      };
    }
    if (typeof scope.cloneGearListSelectors !== 'function') {
      scope.cloneGearListSelectors = cloneGearListSelectors;
    }
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this));

