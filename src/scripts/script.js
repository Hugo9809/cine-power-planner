const SCREEN_READER_STORAGE_KEY = 'screenReaderAnnouncements';
const SCREEN_READER_ASSERTIVE_RESET_MS = 1200;
    const highContrastText =
      texts[lang].highContrastSetting ||
      texts.en?.highContrastSetting ||
      contrastLabel.textContent;
    contrastLabel.textContent = highContrastText;
      texts[lang].highContrastSettingHelp ||
      texts.en?.highContrastSettingHelp ||
      highContrastText;
      settingsHighContrast.setAttribute("aria-label", highContrastText);
    }
    const contrastHelpText = document.getElementById("settingsHighContrastHelp");
    if (contrastHelpText) {
      contrastHelpText.textContent = contrastHelp;
    }
  }
  const reduceMotionLabel = document.getElementById("settingsReduceMotionLabel");
  if (reduceMotionLabel) {
    const reduceMotionText =
      texts[lang].reduceMotionSetting ||
      texts.en?.reduceMotionSetting ||
      reduceMotionLabel.textContent;
    reduceMotionLabel.textContent = reduceMotionText;
    const reduceMotionHelp =
      texts[lang].reduceMotionSettingHelp ||
      texts.en?.reduceMotionSettingHelp ||
      reduceMotionText;
    reduceMotionLabel.setAttribute("data-help", reduceMotionHelp);
    if (settingsReduceMotion) {
      settingsReduceMotion.setAttribute("data-help", reduceMotionHelp);
      settingsReduceMotion.setAttribute("aria-label", reduceMotionText);
    }
    const reduceMotionHelpText = document.getElementById("settingsReduceMotionHelp");
    if (reduceMotionHelpText) {
      reduceMotionHelpText.textContent = reduceMotionHelp;
    }
  }
  const relaxedSpacingLabel = document.getElementById("settingsRelaxedSpacingLabel");
  if (relaxedSpacingLabel) {
    const relaxedSpacingText =
      texts[lang].relaxedSpacingSetting ||
      texts.en?.relaxedSpacingSetting ||
      relaxedSpacingLabel.textContent;
    relaxedSpacingLabel.textContent = relaxedSpacingText;
    const relaxedSpacingHelp =
      texts[lang].relaxedSpacingSettingHelp ||
      texts.en?.relaxedSpacingSettingHelp ||
      relaxedSpacingText;
    relaxedSpacingLabel.setAttribute("data-help", relaxedSpacingHelp);
    if (settingsRelaxedSpacing) {
      settingsRelaxedSpacing.setAttribute("data-help", relaxedSpacingHelp);
      settingsRelaxedSpacing.setAttribute("aria-label", relaxedSpacingText);
    }
    const relaxedSpacingHelpText = document.getElementById("settingsRelaxedSpacingHelp");
    if (relaxedSpacingHelpText) {
      relaxedSpacingHelpText.textContent = relaxedSpacingHelp;
    }
  }
  const screenReaderLabel = document.getElementById("settingsScreenReaderLabel");
  if (screenReaderLabel) {
    const screenReaderText =
      texts[lang].screenReaderSetting ||
      texts.en?.screenReaderSetting ||
      screenReaderLabel.textContent;
    screenReaderLabel.textContent = screenReaderText;
    const screenReaderHelp =
      texts[lang].screenReaderSettingHelp ||
      texts.en?.screenReaderSettingHelp ||
      screenReaderText;
    screenReaderLabel.setAttribute("data-help", screenReaderHelp);
    if (settingsScreenReader) {
      settingsScreenReader.setAttribute("data-help", screenReaderHelp);
      settingsScreenReader.setAttribute("aria-label", screenReaderText);
    }
    const screenReaderHelpText = document.getElementById("settingsScreenReaderHelp");
    if (screenReaderHelpText) {
      screenReaderHelpText.textContent = screenReaderHelp;
let screenReaderLiveRegion =
  typeof document !== 'undefined' ? document.getElementById('screenReaderLiveRegion') : null;
let screenReaderLiveRegionResetTimer = null;
let screenReaderSpeechWarningLogged = false;
let screenReaderAnnouncementId = 0;
let screenReaderAnnouncementsEnabled = false;
const settingsReduceMotion = document.getElementById("settingsReduceMotion");
const settingsRelaxedSpacing = document.getElementById("settingsRelaxedSpacing");
const settingsScreenReader = document.getElementById("settingsScreenReader");
const AUTO_GEAR_MULTISELECT_MIN_ROWS = 8;

function setAutoGearSelectVisibleRows(selectElement, optionCount) {
  if (!selectElement) return;
  const hasOptions = typeof optionCount === 'number' && optionCount > 0;
  const attributeValue = typeof selectElement.getAttribute === 'function'
    ? selectElement.getAttribute('size')
    : null;
  const attributeSize = attributeValue ? Number.parseInt(attributeValue, 10) : NaN;
  const maxRows = Number.isFinite(attributeSize) && attributeSize > 0
    ? Math.max(attributeSize, AUTO_GEAR_MULTISELECT_MIN_ROWS)
    : Math.max(10, AUTO_GEAR_MULTISELECT_MIN_ROWS);
  if (!hasOptions) {
    selectElement.size = maxRows;
    return;
  }
  const desiredRows = Math.max(optionCount, AUTO_GEAR_MULTISELECT_MIN_ROWS);
  selectElement.size = Math.min(desiredRows, maxRows);
}

  setAutoGearSelectVisibleRows(autoGearScenariosSelect, selectableOptions.length);
  setAutoGearSelectVisibleRows(autoGearMatteboxSelect, selectableOptions.length);
  setAutoGearSelectVisibleRows(autoGearCameraHandleSelect, selectableOptions.length);
  setAutoGearSelectVisibleRows(autoGearViewfinderExtensionSelect, selectableOptions.length);
  setAutoGearSelectVisibleRows(autoGearVideoDistributionSelect, selectableOptions.length);
  const cameraOptionCount = Array.from(autoGearCameraSelect.options || []).filter(option => !option.disabled).length;
  setAutoGearSelectVisibleRows(autoGearCameraSelect, cameraOptionCount);
  const monitorOptionCount = Array.from(autoGearMonitorSelect.options || []).filter(option => !option.disabled).length;
  setAutoGearSelectVisibleRows(autoGearMonitorSelect, monitorOptionCount);
  const wirelessOptionCount = Array.from(autoGearWirelessSelect.options || []).filter(option => !option.disabled).length;
  setAutoGearSelectVisibleRows(autoGearWirelessSelect, wirelessOptionCount);
  const motorOptionCount = Array.from(autoGearMotorsSelect.options || []).filter(option => !option.disabled).length;
  setAutoGearSelectVisibleRows(autoGearMotorsSelect, motorOptionCount);
  const controllerOptionCount = Array.from(autoGearControllersSelect.options || []).filter(option => !option.disabled).length;
  setAutoGearSelectVisibleRows(autoGearControllersSelect, controllerOptionCount);
  const distanceOptionCount = Array.from(autoGearDistanceSelect.options || []).filter(option => !option.disabled).length;
  setAutoGearSelectVisibleRows(autoGearDistanceSelect, distanceOptionCount);
    if (settingsScreenReader) settingsScreenReader.checked = screenReaderAnnouncementsEnabled;
      if (settingsScreenReader) {
        const enabled = settingsScreenReader.checked;
        applyScreenReaderAnnouncements(enabled, { announceChange: true });
        try {
          localStorage.setItem(SCREEN_READER_STORAGE_KEY, enabled);
        } catch (e) {
          console.warn('Could not save screen reader preference', e);
        }
      }
function ensureScreenReaderLiveRegion() {
  if (typeof document === 'undefined') return null;
  if (screenReaderLiveRegion && document.contains(screenReaderLiveRegion)) {
    return screenReaderLiveRegion;
  }
  const existing = document.getElementById('screenReaderLiveRegion');
  if (existing) {
    screenReaderLiveRegion = existing;
    return screenReaderLiveRegion;
  }
  if (!document.body) {
    return null;
  }
  const region = document.createElement('div');
  region.id = 'screenReaderLiveRegion';
  region.className = 'visually-hidden';
  region.setAttribute('role', 'status');
  region.setAttribute('aria-live', screenReaderAnnouncementsEnabled ? 'polite' : 'off');
  region.setAttribute('aria-hidden', screenReaderAnnouncementsEnabled ? 'false' : 'true');
  document.body.appendChild(region);
  screenReaderLiveRegion = region;
  return screenReaderLiveRegion;
}

function updateScreenReaderLiveRegionAttributes({ enabled, mode = 'polite' } = {}) {
  const region = enabled ? ensureScreenReaderLiveRegion() : screenReaderLiveRegion;
  if (!region) return;
  if (enabled) {
    const normalizedMode = mode === 'assertive' ? 'assertive' : 'polite';
    region.setAttribute('aria-live', normalizedMode);
    region.removeAttribute('aria-hidden');
  } else {
    region.setAttribute('aria-live', 'off');
    region.setAttribute('aria-hidden', 'true');
    region.textContent = '';
  }
}

function speakScreenReaderMessage(message) {
  if (!message || typeof window === 'undefined') return;
  try {
    const synth = window.speechSynthesis;
    const Utterance = window.SpeechSynthesisUtterance;
    if (!synth || typeof synth.speak !== 'function' || typeof Utterance !== 'function') {
      return;
    }
    if (typeof synth.cancel === 'function') {
      synth.cancel();
    }
    const utterance = new Utterance(message);
    synth.speak(utterance);
  } catch (error) {
    if (!screenReaderSpeechWarningLogged) {
      console.warn('Unable to play screen reader speech synthesis', error);
      screenReaderSpeechWarningLogged = true;
    }
  }
}

function announceForScreenReader(message, options = {}) {
  if (!message) return;
  const announcementText = typeof message === 'string' ? message : String(message);
  if (!announcementText) return;
  const { priority = 'polite', allowSpeech = false, force = false } = options || {};
  const active = screenReaderAnnouncementsEnabled || force;
  if (!active) return;
  const region = ensureScreenReaderLiveRegion();
  if (!region) return;

  const normalizedMode = priority === 'assertive' ? 'assertive' : 'polite';
  updateScreenReaderLiveRegionAttributes({ enabled: true, mode: normalizedMode });

  screenReaderAnnouncementId += 1;
  region.setAttribute('data-announcement-id', String(screenReaderAnnouncementId));
  region.textContent = '';
  const write = () => {
    region.textContent = announcementText;
  };
  if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
    window.requestAnimationFrame(write);
  } else {
    write();
  }

  const shouldReset = normalizedMode === 'assertive' || !screenReaderAnnouncementsEnabled;
  if (shouldReset) {
    if (screenReaderLiveRegionResetTimer) {
      clearTimeout(screenReaderLiveRegionResetTimer);
    }
    screenReaderLiveRegionResetTimer = setTimeout(() => {
      if (screenReaderAnnouncementsEnabled) {
        updateScreenReaderLiveRegionAttributes({ enabled: true, mode: 'polite' });
      } else {
        updateScreenReaderLiveRegionAttributes({ enabled: false });
      }
    }, SCREEN_READER_ASSERTIVE_RESET_MS);
  }

  if (allowSpeech) {
    speakScreenReaderMessage(announcementText);
  }
}

function applyScreenReaderAnnouncements(enabled, { announceChange = false } = {}) {
  const previousState = screenReaderAnnouncementsEnabled;
  const normalized = !!enabled;
  screenReaderAnnouncementsEnabled = normalized;

  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    if (root && root.classList) {
      root.classList.toggle('screen-reader-mode', normalized);
    }
    if (document.body && document.body.classList) {
      document.body.classList.toggle('screen-reader-mode', normalized);
    }
  }

  if (!normalized && screenReaderLiveRegionResetTimer) {
    clearTimeout(screenReaderLiveRegionResetTimer);
    screenReaderLiveRegionResetTimer = null;
  }

  updateScreenReaderLiveRegionAttributes({ enabled: normalized });

  if (announceChange) {
    const key = normalized
      ? 'screenReaderEnabledAnnouncement'
      : 'screenReaderDisabledAnnouncement';
    const fallback = normalized
      ? 'Screen reader support enabled.'
      : 'Screen reader support disabled.';
    const announcement =
      (texts[currentLang] && texts[currentLang][key]) ||
      (texts.en && texts.en[key]) ||
      fallback;
    if (announcement) {
      announceForScreenReader(announcement, {
        priority: 'assertive',
        allowSpeech: true,
        force: true
      });
    }
  }

  if (!previousState && normalized) {
    ensureScreenReaderLiveRegion();
  }
}

try {
  const storedScreenReader = typeof localStorage !== 'undefined'
    ? localStorage.getItem(SCREEN_READER_STORAGE_KEY)
    : null;
  if (storedScreenReader !== null) {
    screenReaderAnnouncementsEnabled = storedScreenReader === 'true';
  }
} catch (error) {
  console.warn('Could not load screen reader preference', error);
}
applyScreenReaderAnnouncements(screenReaderAnnouncementsEnabled);

  const text = typeof message === 'string' ? message : String(message ?? '');
  note.textContent = text;

  if (text) {
    const priority = type === 'error' || type === 'warning' ? 'assertive' : 'polite';
    announceForScreenReader(text, { priority, allowSpeech: true });
  }
