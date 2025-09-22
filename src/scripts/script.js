const AUTO_GEAR_MULTISELECT_MIN_ROWS = 8;
const AUTO_GEAR_MULTISELECT_MAX_ROWS = 12;

const computeAutoGearVisibleRows = count => {
  const safeCount = Number.isFinite(count) && count > 0 ? count : 0;
  const normalized = Math.max(safeCount, AUTO_GEAR_MULTISELECT_MIN_ROWS);
  return Math.min(AUTO_GEAR_MULTISELECT_MAX_ROWS, normalized);
};

  autoGearScenariosSelect.size = computeAutoGearVisibleRows(selectableOptions.length);
  autoGearMatteboxSelect.size = computeAutoGearVisibleRows(selectableOptions.length);
  autoGearCameraHandleSelect.size = computeAutoGearVisibleRows(selectableOptions.length);
  autoGearViewfinderExtensionSelect.size = computeAutoGearVisibleRows(selectableOptions.length);
  autoGearVideoDistributionSelect.size = computeAutoGearVisibleRows(selectableOptions.length);
  autoGearCameraSelect.size = computeAutoGearVisibleRows(visibleCount);
  autoGearMonitorSelect.size = computeAutoGearVisibleRows(visibleCount);
  autoGearWirelessSelect.size = computeAutoGearVisibleRows(visibleCount);
  autoGearMotorsSelect.size = computeAutoGearVisibleRows(visibleCount);
  autoGearControllersSelect.size = computeAutoGearVisibleRows(visibleCount);
  autoGearDistanceSelect.size = computeAutoGearVisibleRows(visibleCount);
    if (!value) return;
    if (!featureSearchDefaultOptions.includes(value)) {
      featureSearchDefaultOptions.push(value);
    }
  const collectReferencedText = (element, attribute) => {
    if (!element || typeof element.getAttribute !== 'function') return '';
    const raw = element.getAttribute(attribute);
    if (!raw) return '';
    const doc = element.ownerDocument || document;
    return raw
      .split(/\s+/)
      .map(id => (id ? doc.getElementById(id) : null))
      .filter(Boolean)
      .map(node => node.textContent || '')
      .join(' ');
  };
  const joinKeywordParts = parts =>
    parts
      .map(part => (typeof part === 'string' ? part.trim() : ''))
      .filter(Boolean)
      .join(' ');

  const findControlForLabel = label => {
    if (!label) return null;
    if (typeof label.control === 'object' && label.control) {
      return label.control;
    }
    const doc = label.ownerDocument || document;
    const forId = label.getAttribute('for');
    if (forId) {
      const target = doc ? doc.getElementById(forId) : null;
      if (target) return target;
    }
    return label.querySelector(
      'input, select, textarea, button, [role="combobox"], [role="spinbutton"], [role="textbox"], [contenteditable="true"]'
    );
  };

  document
    .querySelectorAll('label[id]')
    .forEach(label => {
      if (!label || (helpDialog && helpDialog.contains(label))) return;
      const textContent = label.textContent || '';
      const cleanedLabel = textContent.replace(/[\s\u00a0]*[:：]\s*$/, '').trim();
      if (!cleanedLabel) return;
      const control = findControlForLabel(label);
      if (!control) return;
      const keywords = joinKeywordParts([
        label.dataset?.searchKeywords || label.getAttribute('data-search-keywords') || '',
        control.dataset?.searchKeywords || control.getAttribute('data-search-keywords') || '',
        label.getAttribute('aria-label') || '',
        control.getAttribute('aria-label') || '',
        label.getAttribute('title') || '',
        control.getAttribute('title') || '',
        label.getAttribute('data-help') || '',
        control.getAttribute('data-help') || '',
        label.getAttribute('data-help-keywords') || '',
        control.getAttribute('data-help-keywords') || '',
        control.getAttribute('placeholder') || '',
        control.getAttribute('aria-placeholder') || '',
        collectReferencedText(control, 'aria-describedby')
      ]);
      const entry = buildFeatureSearchEntry(control, { label: cleanedLabel, keywords });
      if (!entry || !entry.key) return;
      const display = entry.optionValue || entry.displayLabel || entry.baseLabel;
      if (!display) return;
      registerOption(display);
      featureSearchEntries.push({
        type: 'field',
        key: entry.key,
        display,
        tokens: Array.isArray(entry.tokens) ? entry.tokens : [],
        value: entry
      });
    });

  document
    .querySelectorAll('[data-search-entry]')
    .forEach(el => {
      if (!el) return;
      const labelSource =
        el.getAttribute('data-search-label') ||
        el.getAttribute('aria-label') ||
        el.getAttribute('title') ||
        el.textContent;
      const label = typeof labelSource === 'string' ? labelSource.trim() : '';
      if (!label) return;
      const keywords = joinKeywordParts([
        el.dataset?.searchKeywords || el.getAttribute('data-search-keywords') || '',
        el.getAttribute('aria-label') || '',
        el.getAttribute('title') || '',
        el.getAttribute('data-help') || '',
        el.getAttribute('data-help-keywords') || '',
        collectReferencedText(el, 'aria-describedby')
      ]);
      const entry = buildFeatureSearchEntry(el, { label, keywords });
      if (!entry || !entry.key) return;
      const display = entry.optionValue || entry.displayLabel || entry.baseLabel;
      if (!display) return;
      registerOption(display);
      featureSearchEntries.push({
        type: 'action',
        key: entry.key,
        display,
        tokens: Array.isArray(entry.tokens) ? entry.tokens : [],
        value: entry
      });
    });
