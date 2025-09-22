const installPromptBannerAction = document.getElementById("installPromptBannerAction");
const installPromptBannerDismiss = document.getElementById("installPromptBannerDismiss");
const installPromptBannerDismissText = document.getElementById("installPromptBannerDismissText");
const INSTALL_BANNER_DISMISSED_KEY = 'installBannerDismissed';

function hasDismissedInstallBanner() {
  try {
    return localStorage.getItem(INSTALL_BANNER_DISMISSED_KEY) === '1';
  } catch (error) {
    console.warn('Could not read install banner dismissal flag', error);
    return false;
  }
}

function markInstallBannerDismissed() {
  try {
    localStorage.setItem(INSTALL_BANNER_DISMISSED_KEY, '1');
  } catch (error) {
    console.warn('Could not store install banner dismissal', error);
  }
}

  if (hasDismissedInstallBanner()) return false;
    hideInstallPromptBanner();
function hideInstallPromptBanner() {
  if (installPromptBanner) {
    installPromptBanner.setAttribute('hidden', '');
    installPromptBanner.style.top = '0';
  }
}

  updateInstallBannerTheme({
    accentValue: getCssVariableValue('--accent-color', DEFAULT_ACCENT_COLOR),
    highContrast: isHighContrastActive(),
  if (installPromptBannerAction) {
    installPromptBannerAction.addEventListener('click', () => {
      const platform = isIosDevice() ? 'ios' : 'android';
      openInstallGuide(platform);
    });
  }

  if (installPromptBannerDismiss) {
    installPromptBannerDismiss.addEventListener('click', event => {
      event.stopPropagation();
      markInstallBannerDismissed();
      hideInstallPromptBanner();
    });
  }

  if (installPromptBannerAction && bannerText) {
    installPromptBannerAction.setAttribute('aria-label', bannerText);
    installPromptBannerAction.setAttribute('title', bannerText);
  const dismissLabel = langTexts.installBannerDismiss || fallbackTexts.installBannerDismiss;
  if (dismissLabel) {
    if (installPromptBannerDismiss) {
      installPromptBannerDismiss.setAttribute('aria-label', dismissLabel);
      installPromptBannerDismiss.setAttribute('title', dismissLabel);
    }
    if (installPromptBannerDismissText) {
      installPromptBannerDismissText.textContent = dismissLabel;
    }
  }
function updateInstallBannerTheme({ accentValue, highContrast } = {}) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (!root) return;
  let resolvedAccent = typeof accentValue === 'string' && accentValue.trim()
    ? accentValue
    : getCssVariableValue('--accent-color', DEFAULT_ACCENT_COLOR);
  const rgb = parseColorToRgb(resolvedAccent);
  let textColor = '';
  if (rgb) {
    const luminance = computeRelativeLuminance(rgb);
    textColor = luminance > 0.55 ? '#000000' : '#ffffff';
  }
  if (!textColor) {
    textColor = highContrast
      ? '#000000'
      : getCssVariableValue('--inverse-text-color', '#ffffff');
  }
  root.style.setProperty('--install-banner-text-color', textColor);
  if (document.body) {
    document.body.style.setProperty('--install-banner-text-color', textColor);
  }
}

  updateInstallBannerTheme({ accentValue, highContrast });
