const FEATURE_SEARCH_FOCUSABLE_SELECTOR = [
  'input:not([type="hidden"])',
  'select',
  'textarea',
  'button',
  '[role="combobox"]',
  '[role="switch"]',
  '[role="spinbutton"]',
  '[role="slider"]',
  '[role="textbox"]',
  '[contenteditable="true"]'
].join(', ');

const findFeatureSearchTargetBySelector = (element, selector) => {
  if (!element || !selector) return null;
  const doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc || typeof doc.querySelector !== 'function') return null;
  const trimmed = selector.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('#')) {
    return doc.querySelector(trimmed);
  }
  const byId = doc.getElementById(trimmed);
  if (byId) return byId;
  try {
    return doc.querySelector(trimmed);
  } catch (err) {
    console.warn('Invalid feature search target selector', selector, err);
    return null;
  }
};

const computeFeatureSearchTargets = element => {
  const highlightTargets = [];
  const addHighlightTarget = target => {
    if (!target || typeof target.classList?.add !== 'function') return;
    if (highlightTargets.includes(target)) return;
    highlightTargets.push(target);
  };

  if (element) {
    addHighlightTarget(element);
  }

  let focusTarget = element || null;

  const explicitTarget =
    typeof element?.getAttribute === 'function'
      ? element.getAttribute('data-feature-search-target')
      : null;
  if (explicitTarget) {
    const resolved = findFeatureSearchTargetBySelector(element, explicitTarget);
    if (resolved) {
      focusTarget = resolved;
      addHighlightTarget(resolved);
    }
  }

  const tagName = typeof element?.tagName === 'string' ? element.tagName.toLowerCase() : '';
  if (tagName === 'label') {
    let control = null;
    if (typeof element.control !== 'undefined' && element.control) {
      control = element.control;
    }
    if (!control) {
      const forValue =
        typeof element.getAttribute === 'function'
          ? element.getAttribute('for') || element.htmlFor
          : element?.htmlFor;
      if (forValue) {
        control = findFeatureSearchTargetBySelector(element, `#${forValue}`) || null;
      }
    }
    if (!control && typeof element.querySelector === 'function') {
      control = element.querySelector(FEATURE_SEARCH_FOCUSABLE_SELECTOR);
    }
    if (control) {
      focusTarget = control;
      addHighlightTarget(control);
    }
  }

  if (!focusTarget) {
    focusTarget = element || null;
  }

  return { focusTarget, highlightTargets };
};

  const { focusTarget, highlightTargets } = computeFeatureSearchTargets(element);
  if (focusTarget) {
    entry.focusTarget = focusTarget;
  }
  if (highlightTargets.length) {
    entry.highlightTargets = highlightTargets;
  }
    .querySelectorAll('h2[id], legend[id], h3[id], h4[id], label[id]')
  const collectFeatureSearchHighlightTargets = (entry, primaryTarget) => {
    const ordered = [];
    const pushUnique = target => {
      if (!target || typeof target.classList?.add !== 'function') return;
      if (ordered.includes(target)) return;
      ordered.push(target);
    };

    if (entry && Array.isArray(entry.highlightTargets)) {
      entry.highlightTargets.forEach(pushUnique);
    }
    if (entry?.element) {
      pushUnique(entry.element);
    }
    pushUnique(primaryTarget);

    ordered.slice().forEach(target => {
      const labels = findAssociatedLabelElements(target);
      if (Array.isArray(labels)) {
        labels.forEach(pushUnique);
      }
    });

    return ordered;
  };

        const focusTarget = feature?.focusTarget || feature?.element || feature;
        if (focusTarget) {
          const label =
            feature?.label || feature?.displayLabel || focusTarget.textContent?.trim();
          focusFeatureElement(focusTarget);
          const highlightTargets = collectFeatureSearchHighlightTargets(
            feature,
            focusTarget
          );
