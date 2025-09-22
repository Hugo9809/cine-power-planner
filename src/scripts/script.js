const INSTALL_BANNER_DISMISS_STORAGE_KEY = 'installBannerDismissed';
const installPromptBannerAction = document.getElementById("installPromptBannerAction");
const installPromptBannerDismiss = document.getElementById("installPromptBannerDismiss");
function hasDismissedInstallBanner() {
  try {
    return localStorage.getItem(INSTALL_BANNER_DISMISS_STORAGE_KEY) === '1';
  } catch (error) {
    console.warn('Could not read install banner dismissal flag', error);
    return false;
  }
}

function markInstallBannerDismissed() {
  try {
    localStorage.setItem(INSTALL_BANNER_DISMISS_STORAGE_KEY, '1');
  } catch (error) {
    console.warn('Could not store install banner dismissal', error);
  }
}

function dismissInstallBanner({ persist = true } = {}) {
  if (installPromptBanner) {
    installPromptBanner.setAttribute('hidden', '');
    installPromptBanner.style.top = '0';
  }
  if (persist) {
    markInstallBannerDismissed();
  }
}

  if (!installPromptBanner || !installPromptBannerAction) return false;
  if (hasDismissedInstallBanner()) return false;
  if (!installPromptBanner || !installPromptBannerAction) return;
  installPromptBannerAction.addEventListener('click', event => {
    event.preventDefault();
  if (installPromptBannerDismiss) {
    installPromptBannerDismiss.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      dismissInstallBanner();
    });
  }

  if (installPromptBannerAction && bannerText) {
    installPromptBannerAction.setAttribute('aria-label', bannerText);
    installPromptBannerAction.setAttribute('title', bannerText);
  }
  const dismissLabel =
    langTexts.installBannerDismiss || fallbackTexts.installBannerDismiss || closeLabel;
  if (installPromptBannerDismiss && dismissLabel) {
    setButtonLabelWithIcon(installPromptBannerDismiss, dismissLabel, ICON_GLYPHS.circleX);
    installPromptBannerDismiss.setAttribute('aria-label', dismissLabel);
    installPromptBannerDismiss.setAttribute('title', dismissLabel);
  }
const INSTALL_BANNER_TEXT_THRESHOLD = 0.55;
const INSTALL_BANNER_LIGHT_TEXT = '#ffffff';
const INSTALL_BANNER_DARK_TEXT = '#000000';
const INSTALL_BANNER_TEXT_VAR = '--install-banner-text-color';
const updateInstallBannerContrast = (accentValue) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (!root) return;
  const rootStyle = root.style;
  if (!rootStyle) return;
  const rgb = parseColorToRgb(accentValue);
  let textColor = INSTALL_BANNER_LIGHT_TEXT;
  if (rgb) {
    const luminance = computeRelativeLuminance(rgb);
    textColor = luminance > INSTALL_BANNER_TEXT_THRESHOLD
      ? INSTALL_BANNER_DARK_TEXT
      : INSTALL_BANNER_LIGHT_TEXT;
  }
  rootStyle.setProperty(INSTALL_BANNER_TEXT_VAR, textColor);
};

  updateInstallBannerContrast(accentValue);
    rootStyle.removeProperty(INSTALL_BANNER_TEXT_VAR);
    hasDismissedInstallBanner,
    markInstallBannerDismissed,
    dismissInstallBanner,
