const LENGTH_UNIT_STORAGE_KEY = 'cameraPowerPlanner_lengthUnit';
const LENGTH_UNITS = {
  metric: 'metric',
  imperial: 'imperial'
};
let lengthUnit = LENGTH_UNITS.metric;
try {
  if (typeof localStorage !== 'undefined') {
    const storedLengthUnit = localStorage.getItem(LENGTH_UNIT_STORAGE_KEY);
    if (storedLengthUnit) {
      lengthUnit = normalizeLengthUnit(storedLengthUnit);
    }
  }
} catch (error) {
  console.warn('Could not load length unit preference', error);
}

  const settingsLengthUnitLabel = document.getElementById('settingsLengthUnitLabel');
  if (settingsLengthUnitLabel) {
    settingsLengthUnitLabel.textContent = texts[lang].lengthUnitSetting;
    const lengthUnitHelp =
      texts[lang].lengthUnitSettingHelp || texts[lang].lengthUnitSetting;
    settingsLengthUnitLabel.setAttribute('data-help', lengthUnitHelp);
    if (typeof settingsLengthUnit !== 'undefined' && settingsLengthUnit) {
      settingsLengthUnit.setAttribute('data-help', lengthUnitHelp);
      settingsLengthUnit.setAttribute('aria-label', texts[lang].lengthUnitSetting);
      Array.from(settingsLengthUnit.options || []).forEach(option => {
        if (!option) return;
        const normalized = normalizeLengthUnit(option.value);
        option.textContent = getLengthUnitLabelForLang(lang, normalized);
      });
      settingsLengthUnit.value = lengthUnit;
    }
  }
const settingsLengthUnit = document.getElementById('settingsLengthUnit');
function resolveAutoGearVisibleCount(optionCount, options = {}) {
  const { minVisible = 8, maxVisible = 12, fallback } = options || {};
  const safeMin = Number.isFinite(minVisible) && minVisible > 0
    ? Math.floor(minVisible)
    : 8;
  const safeMaxBase = Number.isFinite(maxVisible) && maxVisible > 0
    ? Math.floor(maxVisible)
    : 12;
  const safeMax = Math.max(safeMin, safeMaxBase);
  const fallbackValue = Number.isFinite(fallback) && fallback > 0
    ? Math.floor(fallback)
    : safeMin;
  const normalizedCount = Number.isFinite(optionCount) ? Math.floor(optionCount) : 0;

  if (normalizedCount <= 0) {
    return fallbackValue;
  }

  return Math.min(Math.max(normalizedCount, safeMin), safeMax);
}

  const availableCount = selectableOptions.length;
  autoGearScenariosSelect.size = resolveAutoGearVisibleCount(availableCount);
  const availableCount = selectableOptions.length;
  autoGearMatteboxSelect.size = resolveAutoGearVisibleCount(availableCount);
  const availableCount = selectableOptions.length;
  autoGearCameraHandleSelect.size = resolveAutoGearVisibleCount(availableCount);
  const availableCount = selectableOptions.length;
  autoGearViewfinderExtensionSelect.size = resolveAutoGearVisibleCount(availableCount);
  const availableCount = selectableOptions.length;
  autoGearVideoDistributionSelect.size = resolveAutoGearVisibleCount(availableCount);
  const availableCount = Array.from(autoGearCameraSelect.options || []).filter(option => !option.disabled).length;
  autoGearCameraSelect.size = resolveAutoGearVisibleCount(availableCount);
  const availableCount = Array.from(autoGearMonitorSelect.options || []).filter(option => !option.disabled).length;
  autoGearMonitorSelect.size = resolveAutoGearVisibleCount(availableCount);
  const availableCount = Array.from(autoGearWirelessSelect.options || []).filter(option => !option.disabled).length;
  autoGearWirelessSelect.size = resolveAutoGearVisibleCount(availableCount);
  const availableCount = Array.from(autoGearMotorsSelect.options || []).filter(option => !option.disabled).length;
  autoGearMotorsSelect.size = resolveAutoGearVisibleCount(availableCount);
  const availableCount = Array.from(autoGearControllersSelect.options || []).filter(option => !option.disabled).length;
  autoGearControllersSelect.size = resolveAutoGearVisibleCount(availableCount);
  const availableCount = Array.from(autoGearDistanceSelect.options || []).filter(option => !option.disabled).length;
  autoGearDistanceSelect.size = resolveAutoGearVisibleCount(availableCount);
function normalizeLengthUnit(unit) {
  if (typeof unit === 'string') {
    const normalized = unit.trim().toLowerCase();
    if (normalized === LENGTH_UNITS.imperial) {
      return LENGTH_UNITS.imperial;
    }
    if (normalized === LENGTH_UNITS.metric) {
      return LENGTH_UNITS.metric;
    }
  }
  if (unit === LENGTH_UNITS.imperial) {
    return LENGTH_UNITS.imperial;
  }
  return LENGTH_UNITS.metric;
}

function getLengthUnitLabelForLang(lang = currentLang, unit = lengthUnit) {
  const resolvedUnit = normalizeLengthUnit(unit);
  const textsForLang = getLanguageTexts(lang);
  const fallbackTexts = getLanguageTexts('en');
  const key =
    resolvedUnit === LENGTH_UNITS.imperial ? 'lengthUnitImperial' : 'lengthUnitMetric';
  return (
    textsForLang[key] ||
    fallbackTexts[key] ||
    (resolvedUnit === LENGTH_UNITS.imperial ? 'Feet & inches' : 'Meters (m)')
  );
}

function getLengthUnitSymbolForLang(lang = currentLang, unit = lengthUnit) {
  const resolvedUnit = normalizeLengthUnit(unit);
  const textsForLang = getLanguageTexts(lang);
  const fallbackTexts = getLanguageTexts('en');
  if (resolvedUnit === LENGTH_UNITS.metric) {
    return (
      textsForLang.lengthUnitSymbolMetric ||
      fallbackTexts.lengthUnitSymbolMetric ||
      'm'
    );
  }
  return (
    textsForLang.lengthUnitImperial ||
    fallbackTexts.lengthUnitImperial ||
    'Feet & inches'
  );
}

function getLengthFeetLabelForLang(lang = currentLang) {
  const textsForLang = getLanguageTexts(lang);
  const fallbackTexts = getLanguageTexts('en');
  return textsForLang.lengthUnitFeet || fallbackTexts.lengthUnitFeet || 'ft';
}

function getLengthInchesLabelForLang(lang = currentLang) {
  const textsForLang = getLanguageTexts(lang);
  const fallbackTexts = getLanguageTexts('en');
  return textsForLang.lengthUnitInches || fallbackTexts.lengthUnitInches || 'in';
}

function formatMetersForDisplay(meters, options = {}) {
  const { lang = currentLang } = options || {};
  const absolute = Math.abs(meters);
  let maximumFractionDigits = 2;
  if (absolute >= 10) {
    maximumFractionDigits = 0;
  } else if (absolute >= 1) {
    maximumFractionDigits = 1;
  }
  const formatted = formatNumberForLang(lang, meters, {
    minimumFractionDigits: 0,
    maximumFractionDigits
  });
  const symbol = getLengthUnitSymbolForLang(lang, LENGTH_UNITS.metric);
  return `${formatted} ${symbol}`.trim();
}

function formatFeetInches(meters, options = {}) {
  const { lang = currentLang } = options || {};
  const totalInchesRaw = meters * 39.37007874015748;
  const sign = totalInchesRaw < 0 ? -1 : 1;
  const absoluteInches = Math.abs(totalInchesRaw);
  let roundedInches = Math.round(absoluteInches);
  if (roundedInches === 0 && absoluteInches > 0) {
    roundedInches = 1;
  }
  let feet = Math.floor(roundedInches / 12);
  let inches = roundedInches - feet * 12;
  if (inches === 12) {
    feet += 1;
    inches = 0;
  }
  const feetLabel = getLengthFeetLabelForLang(lang);
  const inchesLabel = getLengthInchesLabelForLang(lang);
  const parts = [];
  if (feet > 0) {
    parts.push(`${feet} ${feetLabel}`);
  }
  if (inches > 0 || parts.length === 0) {
    parts.push(`${inches} ${inchesLabel}`);
  }
  const formatted = parts.join(' ');
  return sign < 0 ? `-${formatted}` : formatted;
}

function formatLengthInUnit(meters, options = {}) {
  const { unit = lengthUnit, lang = currentLang } = options || {};
  const resolvedUnit = normalizeLengthUnit(unit);
  const numeric = Number(meters);
  if (!Number.isFinite(numeric)) {
    return '';
  }
  if (resolvedUnit === LENGTH_UNITS.imperial) {
    return formatFeetInches(numeric, { lang });
  }
  return formatMetersForDisplay(numeric, { lang });
}

function formatLengthText(text, options = {}) {
  if (typeof text !== 'string' || !text) {
    return text;
  }
  const { unit = lengthUnit, lang = currentLang } = options || {};
  const resolvedUnit = normalizeLengthUnit(unit);
  return text.replace(/(\d+(?:[.,]\d+)?)\s*m(?![a-zA-Z])/gi, (match, rawValue) => {
    const numeric = parseFloat(String(rawValue).replace(',', '.'));
    if (!Number.isFinite(numeric)) {
      return match;
    }
    const formatted = formatLengthInUnit(numeric, { unit: resolvedUnit, lang });
    return formatted || match;
  });
}

function updateLengthAttributesForElement(element, options = {}) {
  if (!element || typeof element.getAttribute !== 'function' || typeof element.setAttribute !== 'function') {
    return;
  }
  ['title', 'data-help', 'aria-label'].forEach(attr => {
    const value = element.getAttribute(attr);
    if (typeof value !== 'string' || !value) return;
    const formatted = formatLengthText(value, options);
    if (formatted !== value) {
      element.setAttribute(attr, formatted);
    }
  });
}

function updateLengthUnitsInElement(root, options = {}) {
  if (!root || typeof document === 'undefined' || typeof document.createTreeWalker !== 'function') {
    return;
  }
  const showText = typeof NodeFilter !== 'undefined' && NodeFilter.SHOW_TEXT
    ? NodeFilter.SHOW_TEXT
    : 4;
  const walker = document.createTreeWalker(root, showText, null);
  const updates = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node || typeof node.nodeValue !== 'string') continue;
    const formatted = formatLengthText(node.nodeValue, options);
    if (formatted !== node.nodeValue) {
      updates.push({ node, text: formatted });
    }
  }
  updates.forEach(({ node, text }) => {
    node.nodeValue = text;
  });

  if (root && typeof root.querySelectorAll === 'function') {
    const attributeTargets = root.querySelectorAll('[title], [data-help], [aria-label]');
    attributeTargets.forEach(target => updateLengthAttributesForElement(target, options));
  }

  if (root && typeof root.getAttribute === 'function') {
    updateLengthAttributesForElement(root, options);
  }
}

  if (typeof gearListSnapshotOverride === 'boolean') {
    gearListSnapshotActive = gearListSnapshotOverride;
    gearListSnapshotOverride = null;
  } else {
    gearListSnapshotActive = typeof html === 'string' && html.trim().length > 0;
  }
let gearListSnapshotActive = false;
let gearListSnapshotOverride = null;
function applyLengthUnitPreference(unit, options = {}) {
  const normalized = normalizeLengthUnit(unit);
  const { persist = true, reRender = true, forceUpdate = false } = options || {};
  if (!forceUpdate && lengthUnit === normalized) {
    return;
  }
  lengthUnit = normalized;
  if (persist && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(LENGTH_UNIT_STORAGE_KEY, lengthUnit);
    } catch (error) {
      console.warn('Could not save length unit preference', error);
    }
  }
  if (typeof settingsLengthUnit !== 'undefined' && settingsLengthUnit) {
    settingsLengthUnit.value = lengthUnit;
  }
  if (reRender) {
    populateLensDropdown({ preserveSelection: true });
    if (gearListOutput && !gearListOutput.classList.contains('hidden')) {
      updateLengthUnitsInElement(gearListOutput, { unit: lengthUnit, lang: currentLang });
      if (projectRequirementsOutput && !projectRequirementsOutput.classList.contains('hidden')) {
        updateLengthUnitsInElement(projectRequirementsOutput, { unit: lengthUnit, lang: currentLang });
      }
      saveCurrentGearList();
    } else {
      saveCurrentGearList();
    }
  }
}

        gearListSnapshotOverride = Boolean(html);
        gearListSnapshotOverride = false;
                const dataCtxStr = ctxParts.length ? ` (${ctxParts.join(', ')})` : '';
                const displayBase = formatLengthText(translatedBase);
                const displayCtxParts = ctxParts.map(part => formatLengthText(part));
                const displayCtxStr = displayCtxParts.length ? ` (${displayCtxParts.join(', ')})` : '';
                const displayName = `${displayBase}${displayCtxStr}`;
                const dataName = `${base}${dataCtxStr}`;
function refreshGearListIfVisible(options = {}) {
    const { force = false } = options || {};
    if (gearListSnapshotActive && !force) return;
    gearListSnapshotOverride = false;
      gearListSnapshotOverride = Boolean(storedProject.gearList);
      gearListSnapshotOverride = true;
      gearListSnapshotOverride = false;
    if (settingsLengthUnit) settingsLengthUnit.value = lengthUnit;
      if (settingsLengthUnit) {
        applyLengthUnitPreference(settingsLengthUnit.value);
      }
  applyLengthUnitPreference(lengthUnit, { persist: false, reRender: false, forceUpdate: true });
  if (gearListOutput && !gearListOutput.classList.contains('hidden')) {
    refreshGearListIfVisible();
  }
function populateLensDropdown(options = {}) {
  const { preserveSelection = false } = options || {};
  const preservedValues = preserveSelection
    ? Array.from(lensSelect.selectedOptions || []).map(opt => opt.value)
    : [];

    let label = attrs.length ? `${name} (${attrs.join(', ')})` : name;
    label = formatLengthText(label);
    opt.textContent = label;
    if (preserveSelection && preservedValues.includes(name)) {
      opt.selected = true;
    }

  if (preserveSelection && !lensSelect.multiple && preservedValues.length) {
    lensSelect.value = preservedValues[0] || '';
  }
    applyLengthUnitPreference,
    normalizeLengthUnit,
    formatLengthText,
    getLengthUnitLabelForLang,
