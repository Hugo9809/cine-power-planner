const SCREEN_READER_STORAGE_KEY = 'screenReader';
const SCREEN_READER_SPEECH_LANG_MAP = Object.freeze({
  en: 'en-US',
  de: 'de-DE',
  es: 'es-ES',
  fr: 'fr-FR',
  it: 'it-IT'
});
const SCREEN_READER_MAX_MESSAGE_LENGTH = 320;
    const contrastHelpElem = document.getElementById("settingsHighContrastHelp");
    if (contrastHelpElem) {
      contrastHelpElem.textContent = contrastHelp;
    }
  }
  const reduceMotionLabel = document.getElementById("settingsReduceMotionLabel");
  if (reduceMotionLabel) {
    reduceMotionLabel.textContent = texts[lang].reduceMotionSetting;
    const reduceHelp =
      texts[lang].reduceMotionSettingHelp || texts[lang].reduceMotionSetting;
    reduceMotionLabel.setAttribute("data-help", reduceHelp);
    if (settingsReduceMotion) {
      settingsReduceMotion.setAttribute("data-help", reduceHelp);
      settingsReduceMotion.setAttribute(
        "aria-label",
        texts[lang].reduceMotionSetting
      );
    }
    const reduceHelpElem = document.getElementById("settingsReduceMotionHelp");
    if (reduceHelpElem) {
      reduceHelpElem.textContent = reduceHelp;
    }
  }
  const relaxedSpacingLabel = document.getElementById("settingsRelaxedSpacingLabel");
  if (relaxedSpacingLabel) {
    relaxedSpacingLabel.textContent = texts[lang].relaxedSpacingSetting;
    const relaxedHelp =
      texts[lang].relaxedSpacingSettingHelp || texts[lang].relaxedSpacingSetting;
    relaxedSpacingLabel.setAttribute("data-help", relaxedHelp);
    if (settingsRelaxedSpacing) {
      settingsRelaxedSpacing.setAttribute("data-help", relaxedHelp);
      settingsRelaxedSpacing.setAttribute(
        "aria-label",
        texts[lang].relaxedSpacingSetting
      );
    }
    const relaxedHelpElem = document.getElementById("settingsRelaxedSpacingHelp");
    if (relaxedHelpElem) {
      relaxedHelpElem.textContent = relaxedHelp;
    }
  }
  const screenReaderLabel = document.getElementById("settingsScreenReaderLabel");
  if (screenReaderLabel) {
    screenReaderLabel.textContent = texts[lang].screenReaderSetting;
    const screenReaderHelp =
      texts[lang].screenReaderSettingHelp || texts[lang].screenReaderSetting;
    screenReaderLabel.setAttribute("data-help", screenReaderHelp);
    if (settingsScreenReader) {
      settingsScreenReader.setAttribute("data-help", screenReaderHelp);
      settingsScreenReader.setAttribute(
        "aria-label",
        texts[lang].screenReaderSetting
      );
    }
    const screenReaderHelpElem = document.getElementById("settingsScreenReaderHelp");
    if (screenReaderHelpElem) {
      screenReaderHelpElem.textContent = screenReaderHelp;
    }
  if (isReduceMotionActive()) {
    return;
  }
const settingsReduceMotion = document.getElementById("settingsReduceMotion");
const settingsRelaxedSpacing = document.getElementById("settingsRelaxedSpacing");
const settingsScreenReader = document.getElementById("settingsScreenReader");
let screenReaderLiveRegion =
  typeof document !== 'undefined' ? document.getElementById('screenReaderLive') : null;
const supportsSpeechSynthesis =
  typeof window !== 'undefined' &&
  typeof window.speechSynthesis === 'object' &&
  typeof window.SpeechSynthesisUtterance === 'function';
let screenReaderEnabled = false;
let screenReaderFocusListener = null;
let screenReaderChangeListener = null;
let screenReaderClickListener = null;
let screenReaderLastMessage = '';
let screenReaderWarnedAboutSpeech = false;
let screenReaderVoicesWarmed = false;

function isReduceMotionActive() {
  if (typeof document === 'undefined') return false;
  const root = document.documentElement;
  const body = document.body;
  const hasRoot = !!(root && root.classList.contains('reduce-motion'));
  const hasBody = !!(body && body.classList.contains('reduce-motion'));
  return hasRoot || hasBody;
}

function applyReduceMotion(enabled) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const body = document.body;
  const shouldEnable = !!enabled;
  if (root) root.classList.toggle('reduce-motion', shouldEnable);
  if (body) body.classList.toggle('reduce-motion', shouldEnable);
  if (shouldEnable) {
    stopPinkModeAnimatedIcons();
    stopPinkModeIconRotation();
    if (isPinkModeActive()) {
      const sequence = Array.isArray(pinkModeIcons.onSequence)
        ? pinkModeIcons.onSequence
        : [];
      const fallbackIcon = sequence.length
        ? sequence[pinkModeIconIndex % sequence.length]
        : pinkModeIcons.off;
      applyPinkModeIcon(fallbackIcon, { animate: false });
    }
  } else if (isPinkModeActive()) {
    startPinkModeIconRotation();
    startPinkModeAnimatedIcons();
  }
}

function applyRelaxedSpacing(enabled) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const body = document.body;
  const shouldEnable = !!enabled;
  if (root) root.classList.toggle('relaxed-spacing', shouldEnable);
  if (body) body.classList.toggle('relaxed-spacing', shouldEnable);
}

function ensureScreenReaderLiveRegion() {
  if (typeof document === 'undefined') return null;
  if (screenReaderLiveRegion && screenReaderLiveRegion.parentNode) {
    return screenReaderLiveRegion;
  }
  const existing = document.getElementById('screenReaderLive');
  if (existing && existing.parentNode) {
    screenReaderLiveRegion = existing;
    return screenReaderLiveRegion;
  }
  if (!document.body) {
    return null;
  }
  const region = document.createElement('div');
  region.id = 'screenReaderLive';
  region.className = 'visually-hidden';
  region.setAttribute('aria-live', 'assertive');
  region.setAttribute('aria-atomic', 'true');
  document.body.appendChild(region);
  screenReaderLiveRegion = region;
  return screenReaderLiveRegion;
}

function warmScreenReaderVoices() {
  if (!supportsSpeechSynthesis || screenReaderVoicesWarmed) return;
  try {
    window.speechSynthesis.getVoices();
    screenReaderVoicesWarmed = true;
  } catch (error) {
    console.warn('Unable to warm speech synthesis voices', error);
  }
}

function getScreenReaderSpeechLanguage(lang) {
  if (typeof lang !== 'string') {
    return SCREEN_READER_SPEECH_LANG_MAP.en;
  }
  const normalized = lang.toLowerCase();
  return SCREEN_READER_SPEECH_LANG_MAP[normalized] || SCREEN_READER_SPEECH_LANG_MAP.en;
}

function normalizeScreenReaderText(message) {
  if (message === null || message === undefined) return '';
  let text;
  try {
    text = String(message);
  } catch (error) {
    console.warn('Unable to normalize screen reader message', error);
    return '';
  }
  const condensed = text.replace(/\s+/g, ' ').trim();
  if (!condensed) return '';
  if (condensed.length > SCREEN_READER_MAX_MESSAGE_LENGTH) {
    return `${condensed.slice(0, SCREEN_READER_MAX_MESSAGE_LENGTH - 1)}…`;
  }
  return condensed;
}

function collectTextFromIdList(idList) {
  if (typeof document === 'undefined') return '';
  if (!idList || typeof idList !== 'string') return '';
  const ids = Array.from(new Set(idList.split(/\s+/).filter(Boolean)));
  if (!ids.length) return '';
  const parts = [];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const text = normalizeScreenReaderText(el.textContent || el.innerText || '');
    if (text) parts.push(text);
  });
  return parts.join(' ');
}

function getScreenReaderTexts() {
  const fallback = (typeof texts === 'object' && texts.en) || {};
  const langTexts = (typeof texts === 'object' && texts[currentLang]) || fallback;
  return {
    activated:
      (langTexts && langTexts.screenReaderActivated) ||
      (fallback && fallback.screenReaderActivated) ||
      '',
    deactivated:
      (langTexts && langTexts.screenReaderDeactivated) ||
      (fallback && fallback.screenReaderDeactivated) ||
      '',
    unsupported:
      (langTexts && langTexts.screenReaderUnsupported) ||
      (fallback && fallback.screenReaderUnsupported) ||
      '',
    checked:
      (langTexts && langTexts.screenReaderStateChecked) ||
      (fallback && fallback.screenReaderStateChecked) ||
      'Checked',
    unchecked:
      (langTexts && langTexts.screenReaderStateUnchecked) ||
      (fallback && fallback.screenReaderStateUnchecked) ||
      'Not checked',
    selected:
      (langTexts && langTexts.screenReaderStateSelected) ||
      (fallback && fallback.screenReaderStateSelected) ||
      'Selected',
    value:
      (langTexts && langTexts.screenReaderStateValue) ||
      (fallback && fallback.screenReaderStateValue) ||
      'Value: %s',
    empty:
      (langTexts && langTexts.screenReaderStateEmpty) ||
      (fallback && fallback.screenReaderStateEmpty) ||
      'Empty',
  };
}

function formatScreenReaderValue(template, value) {
  const normalized = normalizeScreenReaderText(value);
  if (!normalized) return '';
  if (!template) return normalized;
  if (template.includes('%s')) {
    return template.replace('%s', normalized);
  }
  return `${template} ${normalized}`.trim();
}

function getScreenReaderLabel(element) {
  if (!element || typeof element.getAttribute !== 'function') return '';
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) {
    const text = normalizeScreenReaderText(ariaLabel);
    if (text) return text;
  }
  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy) {
    const labelText = collectTextFromIdList(labelledBy);
    if (labelText) return labelText;
  }
  if (element.labels && element.labels.length) {
    const fromLabels = Array.from(element.labels)
      .map(label => normalizeScreenReaderText(label.textContent || label.innerText))
      .filter(Boolean);
    if (fromLabels.length) {
      return fromLabels.join(' ');
    }
  }
  const title = element.getAttribute('title');
  if (title) {
    const text = normalizeScreenReaderText(title);
    if (text) return text;
  }
  if ('placeholder' in element && element.placeholder) {
    const text = normalizeScreenReaderText(element.placeholder);
    if (text) return text;
  }
  if (element.textContent) {
    const text = normalizeScreenReaderText(element.textContent);
    if (text) return text;
  }
  return '';
}

function describeElementForScreenReader(element, { includeHelp = true, includeValue = false } = {}) {
  if (!element) return '';
  const texts = getScreenReaderTexts();
  const parts = [];
  const label = getScreenReaderLabel(element);
  if (label) parts.push(label);

  const tag = element.tagName ? element.tagName.toLowerCase() : '';
  const type = element.getAttribute ? element.getAttribute('type') : null;

  if (tag === 'input') {
    if (type === 'checkbox') {
      parts.push(element.checked ? texts.checked : texts.unchecked);
    } else if (type === 'radio') {
      parts.push(element.checked ? texts.selected : texts.unchecked);
    } else if (includeValue && type !== 'password') {
      const value = formatScreenReaderValue(texts.value, element.value);
      if (value) {
        parts.push(value);
      } else {
        parts.push(texts.empty);
      }
    }
  } else if (tag === 'select') {
    const option = element.options && element.selectedIndex >= 0
      ? element.options[element.selectedIndex]
      : null;
    if (option) {
      const optionText = normalizeScreenReaderText(option.textContent || option.label || option.value || '');
      if (optionText) {
        const selectedLabel = texts.selected || '';
        parts.push(selectedLabel ? `${selectedLabel}: ${optionText}` : optionText);
      }
    } else if (includeValue) {
      parts.push(texts.empty);
    }
  } else if (tag === 'textarea') {
    if (includeValue) {
      const value = formatScreenReaderValue(texts.value, element.value || element.textContent);
      if (value) {
        parts.push(value);
      } else {
        parts.push(texts.empty);
      }
    }
  }

  if (includeHelp && typeof element.getAttribute === 'function') {
    const ariaDescription = element.getAttribute('aria-description');
    if (ariaDescription) {
      const helpText = normalizeScreenReaderText(ariaDescription);
      if (helpText) parts.push(helpText);
    } else {
      const describedBy = element.getAttribute('aria-describedby');
      const describedText = collectTextFromIdList(describedBy);
      if (describedText) parts.push(describedText);
    }
    const helpAttr = element.getAttribute('data-help');
    if (helpAttr) {
      const helpText = normalizeScreenReaderText(helpAttr);
      if (helpText) parts.push(helpText);
    }
  }

  const uniqueParts = parts.filter(Boolean);
  if (!uniqueParts.length) return '';
  const message = uniqueParts.join('. ');
  return normalizeScreenReaderText(message);
}

function announceScreenReader(message, options = {}) {
  const { priority = 'assertive', allowDuplicate = false, force = false } = options || {};
  const text = normalizeScreenReaderText(message);
  if (!text) return;
  if (!force && !screenReaderEnabled) return;
  if (!allowDuplicate && text === screenReaderLastMessage) return;
  screenReaderLastMessage = text;

  const region = ensureScreenReaderLiveRegion();
  if (region) {
    const politeness = priority === 'polite' ? 'polite' : 'assertive';
    region.setAttribute('aria-live', politeness);
    region.textContent = '';
    region.textContent = text;
  }

  if (supportsSpeechSynthesis) {
    try {
      warmScreenReaderVoices();
      window.speechSynthesis.cancel();
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = getScreenReaderSpeechLanguage(currentLang);
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.warn('Unable to announce screen reader message', error);
    }
  }
}

function handleScreenReaderFocus(event) {
  if (!screenReaderEnabled) return;
  const target = event && event.target;
  if (!target || typeof target !== 'object') return;
  const message = describeElementForScreenReader(target, { includeHelp: false, includeValue: false });
  if (message) {
    announceScreenReader(message, { priority: 'polite' });
  }
}

function handleScreenReaderChange(event) {
  if (!screenReaderEnabled) return;
  const target = event && event.target;
  if (!target || typeof target !== 'object') return;
  const message = describeElementForScreenReader(target, { includeHelp: false, includeValue: true });
  if (message) {
    announceScreenReader(message, { priority: 'assertive', allowDuplicate: true });
  }
}

function handleScreenReaderClick(event) {
  if (!screenReaderEnabled) return;
  const target = event && event.target;
  if (!target || typeof target !== 'object') return;
  const role = typeof target.getAttribute === 'function' ? target.getAttribute('role') : null;
  const tag = target.tagName ? target.tagName.toLowerCase() : '';
  if (tag === 'button' || role === 'button') {
    const message = describeElementForScreenReader(target, { includeHelp: false, includeValue: false });
    if (message) {
      announceScreenReader(message, { priority: 'polite', allowDuplicate: true });
    }
  }
}

function isScreenReaderActive() {
  return screenReaderEnabled;
}

function applyScreenReaderSupport(enabled, { announce = true } = {}) {
  const shouldEnable = !!enabled;
  if (shouldEnable === screenReaderEnabled) {
    if (shouldEnable && announce) {
      const { activated } = getScreenReaderTexts();
      if (activated) {
        announceScreenReader(activated, { allowDuplicate: true });
      }
    }
    if (!shouldEnable && settingsScreenReader) {
      settingsScreenReader.checked = false;
    }
    return screenReaderEnabled;
  }

  if (shouldEnable) {
    screenReaderEnabled = true;
    ensureScreenReaderLiveRegion();
    if (typeof document !== 'undefined') {
      if (document.documentElement) {
        document.documentElement.classList.add('screen-reader');
      }
      if (document.body) {
        document.body.classList.add('screen-reader');
      }
      if (!screenReaderFocusListener) {
        screenReaderFocusListener = handleScreenReaderFocus;
        document.addEventListener('focusin', screenReaderFocusListener, true);
      }
      if (!screenReaderChangeListener) {
        screenReaderChangeListener = handleScreenReaderChange;
        document.addEventListener('change', screenReaderChangeListener, true);
      }
      if (!screenReaderClickListener) {
        screenReaderClickListener = handleScreenReaderClick;
        document.addEventListener('click', screenReaderClickListener, true);
      }
    }
    if (!supportsSpeechSynthesis && !screenReaderWarnedAboutSpeech) {
      const { unsupported } = getScreenReaderTexts();
      if (unsupported) {
        showNotification('warning', unsupported);
      }
      screenReaderWarnedAboutSpeech = true;
    }
    if (settingsScreenReader) {
      settingsScreenReader.checked = true;
    }
    if (announce) {
      const { activated } = getScreenReaderTexts();
      if (activated) {
        announceScreenReader(activated, { allowDuplicate: true });
      }
    }
    return true;
  }

  const wasEnabled = screenReaderEnabled;
  screenReaderEnabled = false;
  if (typeof document !== 'undefined') {
    if (document.documentElement) {
      document.documentElement.classList.remove('screen-reader');
    }
    if (document.body) {
      document.body.classList.remove('screen-reader');
    }
    if (screenReaderFocusListener) {
      document.removeEventListener('focusin', screenReaderFocusListener, true);
      screenReaderFocusListener = null;
    }
    if (screenReaderChangeListener) {
      document.removeEventListener('change', screenReaderChangeListener, true);
      screenReaderChangeListener = null;
    }
    if (screenReaderClickListener) {
      document.removeEventListener('click', screenReaderClickListener, true);
      screenReaderClickListener = null;
    }
  }
  if (supportsSpeechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch (error) {
      console.warn('Unable to stop speech synthesis', error);
    }
  }
  screenReaderLastMessage = '';
  if (settingsScreenReader) {
    settingsScreenReader.checked = false;
  }
  if (announce && wasEnabled) {
    const { deactivated } = getScreenReaderTexts();
    if (deactivated) {
      announceScreenReader(deactivated, { allowDuplicate: true, force: true });
    }
  }
  return screenReaderEnabled;
}

let reduceMotionEnabled = isReduceMotionActive();
try {
  const storedReduceMotion = localStorage.getItem('reduceMotion');
  if (storedReduceMotion !== null) {
    reduceMotionEnabled = storedReduceMotion === 'true';
  }
} catch (error) {
  console.warn('Could not load reduce motion preference', error);
}
applyReduceMotion(reduceMotionEnabled);

let relaxedSpacingEnabled =
  (typeof document !== 'undefined' &&
    !!document.documentElement &&
    document.documentElement.classList.contains('relaxed-spacing')) ||
  (typeof document !== 'undefined' &&
    !!document.body &&
    document.body.classList.contains('relaxed-spacing'));
try {
  const storedRelaxed = localStorage.getItem('relaxedSpacing');
  if (storedRelaxed !== null) {
    relaxedSpacingEnabled = storedRelaxed === 'true';
  }
} catch (error) {
  console.warn('Could not load relaxed spacing preference', error);
}
applyRelaxedSpacing(relaxedSpacingEnabled);

let screenReaderPreference = false;
try {
  screenReaderPreference = localStorage.getItem(SCREEN_READER_STORAGE_KEY) === 'true';
} catch (error) {
  console.warn('Could not load screen reader preference', error);
}
if (!screenReaderPreference && typeof document !== 'undefined') {
  const rootHas = !!(document.documentElement && document.documentElement.classList.contains('screen-reader'));
  const bodyHas = !!(document.body && document.body.classList.contains('screen-reader'));
  screenReaderPreference = rootHas || bodyHas;
}
if (screenReaderPreference) {
  applyScreenReaderSupport(true, { announce: false });
}

  if (isReduceMotionActive()) {
    return;
  }
  if (isReduceMotionActive()) {
    const sequence = Array.isArray(pinkModeIcons.onSequence) ? pinkModeIcons.onSequence : [];
    const iconConfig = sequence.length ? sequence[pinkModeIconIndex % sequence.length] : pinkModeIcons.off;
    applyPinkModeIcon(iconConfig, { animate: false });
    return;
  }
    if (isReduceMotionActive()) {
      stopPinkModeAnimatedIcons();
      stopPinkModeIconRotation();
      const sequence = Array.isArray(pinkModeIcons.onSequence) ? pinkModeIcons.onSequence : [];
      const iconConfig = sequence.length ? sequence[pinkModeIconIndex % sequence.length] : pinkModeIcons.off;
      applyPinkModeIcon(iconConfig, { animate: false });
    } else {
      startPinkModeIconRotation();
      startPinkModeAnimatedIcons();
    }
    if (settingsReduceMotion) settingsReduceMotion.checked = isReduceMotionActive();
    if (settingsRelaxedSpacing) settingsRelaxedSpacing.checked = document.body.classList.contains('relaxed-spacing');
    if (settingsScreenReader) settingsScreenReader.checked = isScreenReaderActive();
      if (settingsReduceMotion) {
        const enabled = settingsReduceMotion.checked;
        applyReduceMotion(enabled);
        try {
          localStorage.setItem('reduceMotion', enabled);
        } catch (e) {
          console.warn('Could not save reduce motion preference', e);
        }
      }
      if (settingsRelaxedSpacing) {
        const enabled = settingsRelaxedSpacing.checked;
        applyRelaxedSpacing(enabled);
        try {
          localStorage.setItem('relaxedSpacing', enabled);
        } catch (e) {
          console.warn('Could not save relaxed spacing preference', e);
        }
      }
      if (settingsScreenReader) {
        const applied = applyScreenReaderSupport(settingsScreenReader.checked);
        try {
          localStorage.setItem(SCREEN_READER_STORAGE_KEY, applied);
        } catch (e) {
          console.warn('Could not save screen reader preference', e);
        }
      }
  announceScreenReader(message, {
    priority: type === 'error' || type === 'warning' ? 'assertive' : 'polite',
    allowDuplicate: true
  });
  'reduceMotion',
  'relaxedSpacing',
  'screenReader',
