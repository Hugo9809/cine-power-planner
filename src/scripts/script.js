const SCREEN_READER_STORAGE_KEY = 'screenReader';
const SCREEN_READER_SPEECH_LANG_MAP = Object.freeze({
  en: 'en-US',
  de: 'de-DE',
  es: 'es-ES',
  fr: 'fr-FR',
  it: 'it-IT'
});
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
  }
const settingsScreenReader = document.getElementById("settingsScreenReader");
let screenReaderLiveRegion =
  typeof document !== 'undefined' ? document.getElementById('screenReaderLive') : null;
let screenReaderEnabled = false;
let screenReaderFocusHandler = null;
let screenReaderChangeHandler = null;
let screenReaderLastAnnouncement = '';
try {
  screenReaderEnabled = localStorage.getItem(SCREEN_READER_STORAGE_KEY) === 'true';
} catch (error) {
  screenReaderEnabled = false;
  console.warn('Could not load screen reader preference', error);
}
if (screenReaderEnabled) {
  setScreenReaderEnabled(true, { persist: false, announce: false, force: true });
} else {
  setScreenReaderEnabled(false, { persist: false, announce: false, force: true });
}

const supportsScreenReaderSpeech =
  typeof window !== 'undefined' &&
  typeof window.speechSynthesis === 'object' &&
  typeof window.SpeechSynthesisUtterance === 'function';
let screenReaderWarnedAboutSpeech = false;

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
  if (!document.body) return null;
  const region = document.createElement('div');
  region.id = 'screenReaderLive';
  region.className = 'visually-hidden';
  region.setAttribute('aria-live', 'assertive');
  region.setAttribute('aria-atomic', 'true');
  document.body.insertBefore(region, document.body.firstChild || null);
  screenReaderLiveRegion = region;
  return screenReaderLiveRegion;
}

function getScreenReaderTexts() {
  const fallback = (typeof texts === 'object' && texts.en) || {};
  const languageBundle =
    (typeof texts === 'object' && texts[currentLang]) || fallback;
  return {
    activated:
      languageBundle.screenReaderActivated || fallback.screenReaderActivated || '',
    deactivated:
      languageBundle.screenReaderDeactivated || fallback.screenReaderDeactivated || '',
    unsupported:
      languageBundle.screenReaderUnsupported || fallback.screenReaderUnsupported || '',
    checked:
      languageBundle.screenReaderStateChecked || fallback.screenReaderStateChecked || '',
    unchecked:
      languageBundle.screenReaderStateUnchecked || fallback.screenReaderStateUnchecked || '',
    selected:
      languageBundle.screenReaderStateSelected || fallback.screenReaderStateSelected || '',
    value:
      languageBundle.screenReaderStateValue || fallback.screenReaderStateValue || '',
    empty:
      languageBundle.screenReaderStateEmpty || fallback.screenReaderStateEmpty || '',
  };
}

function normalizeScreenReaderText(value) {
  if (value === null || value === undefined) return '';
  let text;
  try {
    text = String(value);
  } catch (error) {
    console.warn('Unable to normalize screen reader text', error);
    return '';
  }
  return text.replace(/\s+/g, ' ').trim();
}

function collectTextFromIds(idList) {
  if (typeof document === 'undefined') return '';
  if (!idList || typeof idList !== 'string') return '';
  const ids = Array.from(new Set(idList.split(/\s+/).filter(Boolean)));
  if (!ids.length) return '';
  const parts = [];
  ids.forEach(id => {
    const node = document.getElementById(id);
    if (!node) return;
    const text = normalizeScreenReaderText(node.textContent || node.innerText || '');
    if (text) parts.push(text);
  });
  return parts.join(' ');
}

function getScreenReaderLabel(element) {
  if (!element || typeof element.getAttribute !== 'function') return '';
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) {
    const normalized = normalizeScreenReaderText(ariaLabel);
    if (normalized) return normalized;
  }
  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy) {
    const labelled = collectTextFromIds(labelledBy);
    if (labelled) return labelled;
  }
  if (element.labels && element.labels.length) {
    const fromLabels = Array.from(element.labels)
      .map(label => normalizeScreenReaderText(label.textContent || label.innerText || ''))
      .filter(Boolean);
    if (fromLabels.length) {
      return fromLabels.join(' ');
    }
  }
  const title = element.getAttribute('title');
  if (title) {
    const normalized = normalizeScreenReaderText(title);
    if (normalized) return normalized;
  }
  if ('placeholder' in element && element.placeholder) {
    const normalized = normalizeScreenReaderText(element.placeholder);
    if (normalized) return normalized;
  }
  if (element.textContent) {
    const normalized = normalizeScreenReaderText(element.textContent);
    if (normalized) return normalized;
  }
  return '';
}

function formatScreenReaderValue(template, value) {
  const normalized = normalizeScreenReaderText(value);
  if (!normalized) return '';
  if (!template) return normalized;
  if (template.indexOf('%s') !== -1) {
    return template.replace('%s', normalized);
  }
  return `${template} ${normalized}`.trim();
}

function getScreenReaderState(element) {
  const textsBundle = getScreenReaderTexts();
  if (!element) return '';
  const tagName = (element.tagName || '').toUpperCase();
  if (tagName === 'INPUT') {
    const type = (element.type || '').toLowerCase();
    if (type === 'checkbox') {
      return element.checked ? textsBundle.checked : textsBundle.unchecked;
    }
    if (type === 'radio') {
      return element.checked ? textsBundle.selected : textsBundle.unchecked;
    }
    if (type === 'range' || type === 'number' || type === 'text' || type === 'search' || type === 'email' || type === 'tel') {
      if (element.value) {
        return formatScreenReaderValue(textsBundle.value, element.value);
      }
      return textsBundle.empty;
    }
  }
  if (tagName === 'TEXTAREA') {
    if (element.value) {
      return formatScreenReaderValue(textsBundle.value, element.value);
    }
    return textsBundle.empty;
  }
  if (tagName === 'SELECT') {
    const option = element.options && element.options[element.selectedIndex];
    if (option) {
      const content = option.textContent || option.value || '';
      if (content) {
        return formatScreenReaderValue(textsBundle.value, content);
      }
    }
    return textsBundle.empty;
  }
  const role = element.getAttribute && element.getAttribute('role');
  if (role === 'switch' || role === 'menuitemcheckbox' || role === 'menuitemradio') {
    return element.getAttribute('aria-checked') === 'true'
      ? textsBundle.checked
      : textsBundle.unchecked;
  }
  if (role === 'tab' && element.getAttribute('aria-selected')) {
    return element.getAttribute('aria-selected') === 'true'
      ? textsBundle.selected
      : textsBundle.unchecked;
  }
  if (element.getAttribute && element.getAttribute('aria-pressed')) {
    return element.getAttribute('aria-pressed') === 'true'
      ? textsBundle.checked
      : textsBundle.unchecked;
  }
  return '';
}

function speakScreenReader(text, { warnIfUnsupported = false } = {}) {
  if (!supportsScreenReaderSpeech) {
    if (warnIfUnsupported && !screenReaderWarnedAboutSpeech) {
      const warningTexts = getScreenReaderTexts();
      const warningMessage = warningTexts.unsupported || 'Screen reader narration is not supported in this browser.';
      console.warn(warningMessage);
      screenReaderWarnedAboutSpeech = true;
    }
    return;
  }
  const normalized = normalizeScreenReaderText(text);
  if (!normalized) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(normalized);
    const lang = SCREEN_READER_SPEECH_LANG_MAP[currentLang] || SCREEN_READER_SPEECH_LANG_MAP.en;
    if (lang) utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.warn('Unable to speak screen reader message', error);
  }
}

function announceScreenReader(message, options = {}) {
  const { allowDuplicate = false, polite = false, force = false } = options;
  if (!force && !screenReaderEnabled) {
    return;
  }
  const normalized = normalizeScreenReaderText(message);
  if (!normalized) return;
  if (!allowDuplicate && normalized === screenReaderLastAnnouncement) {
    return;
  }
  screenReaderLastAnnouncement = normalized;
  const region = ensureScreenReaderLiveRegion();
  if (region) {
    const desiredMode = polite ? 'polite' : 'assertive';
    if (region.getAttribute('aria-live') !== desiredMode) {
      region.setAttribute('aria-live', desiredMode);
    }
    region.textContent = '';
    region.textContent = normalized;
  }
  speakScreenReader(normalized);
}

function describeElementForScreenReader(element) {
  if (!element) return '';
  const parts = [];
  const label = getScreenReaderLabel(element);
  if (label) parts.push(label);
  const state = getScreenReaderState(element);
  if (state) parts.push(state);
  return parts.join('. ');
}

function handleScreenReaderFocus(event) {
  if (!screenReaderEnabled) return;
  const target = event.target;
  const message = describeElementForScreenReader(target);
  if (message) {
    announceScreenReader(message, { polite: true, allowDuplicate: false });
  }
}

function handleScreenReaderChange(event) {
  if (!screenReaderEnabled) return;
  const target = event.target;
  const message = describeElementForScreenReader(target);
  if (message) {
    announceScreenReader(message, { allowDuplicate: false });
  }
}

function setScreenReaderEnabled(enabled, options = {}) {
  const { persist = true, announce = true, force = false } = options;
  const shouldEnable = !!enabled;
  if (shouldEnable === screenReaderEnabled && !force) {
    if (settingsScreenReader) {
      settingsScreenReader.checked = screenReaderEnabled;
    }
    return screenReaderEnabled;
  }
  screenReaderEnabled = shouldEnable;
  if (settingsScreenReader) {
    settingsScreenReader.checked = screenReaderEnabled;
  }
  const root = typeof document !== 'undefined' ? document.documentElement : null;
  const body = typeof document !== 'undefined' ? document.body : null;
  if (root) {
    root.classList.toggle('screen-reader', screenReaderEnabled);
  }
  if (body) {
    body.classList.toggle('screen-reader', screenReaderEnabled);
  }
  if (screenReaderEnabled) {
    ensureScreenReaderLiveRegion();
    if (!screenReaderFocusHandler && typeof document !== 'undefined') {
      screenReaderFocusHandler = event => handleScreenReaderFocus(event);
      document.addEventListener('focusin', screenReaderFocusHandler, true);
    }
    if (!screenReaderChangeHandler && typeof document !== 'undefined') {
      screenReaderChangeHandler = event => handleScreenReaderChange(event);
      document.addEventListener('change', screenReaderChangeHandler, true);
    }
  } else if (typeof document !== 'undefined') {
    if (screenReaderFocusHandler) {
      document.removeEventListener('focusin', screenReaderFocusHandler, true);
      screenReaderFocusHandler = null;
    }
    if (screenReaderChangeHandler) {
      document.removeEventListener('change', screenReaderChangeHandler, true);
      screenReaderChangeHandler = null;
    }
    screenReaderLastAnnouncement = '';
  }
  if (persist) {
    try {
      localStorage.setItem(SCREEN_READER_STORAGE_KEY, screenReaderEnabled);
    } catch (error) {
      console.warn('Could not persist screen reader preference', error);
    }
  }
  if (announce) {
    const textsBundle = getScreenReaderTexts();
    if (screenReaderEnabled && textsBundle.activated) {
      announceScreenReader(textsBundle.activated, { allowDuplicate: true, force: true });
      speakScreenReader(textsBundle.activated, { warnIfUnsupported: true });
    } else if (!screenReaderEnabled && textsBundle.deactivated) {
      announceScreenReader(textsBundle.deactivated, { allowDuplicate: true, force: true, polite: true });
    }
  }
  return screenReaderEnabled;
}

    if (settingsScreenReader) settingsScreenReader.checked = screenReaderEnabled;
      if (settingsScreenReader) {
        setScreenReaderEnabled(settingsScreenReader.checked);
      }
  'screenReader',
        setScreenReaderEnabled(safeGetItem('screenReader') === 'true', {
          persist: false,
          announce: false,
          force: true,
        });
      try {
        setScreenReaderEnabled(false, { persist: true, announce: false, force: true });
      } catch (screenReaderError) {
        console.warn('Failed to reset screen reader during factory reset', screenReaderError);
      }
    setScreenReaderEnabled,
