# src/scripts/modules/settings-and-appearance.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 2317
- **Language:** JavaScript
- **Symbols:** 105
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 4 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 22 | fn | createModuleBaseFallback | (private) | `function createModuleBaseFallback(scope) {` |
| 52 | fn | notifyListeners | (private) | `const notifyListeners = (name, api) => {` |
| 78 | fn | storeModule | (private) | `const storeModule = (name, api) => {` |
| 87 | fn | getStoredModule | (private) | - |
| 99 | fn | whenModuleAvailable | (private) | `const whenModuleAvailable = (name, handler) => {` |
| 122 | fn | ensureModuleGlobals | (private) | `const ensureModuleGlobals = () => {` |
| 169 | fn | ensureModuleRegistry | (private) | `const ensureModuleRegistry = () => {` |
| 306 | fn | resolveModuleBase | (private) | `function resolveModuleBase(scope) {` |
| 420 | fn | cloneContext | (private) | `function cloneContext(context) {` |
| 434 | fn | createFallbackContext | (private) | `function createFallbackContext() {` |
| 435 | fn | getDocument | (private) | `const getDocument = () => {` |
| 442 | fn | getWindow | (private) | `const getWindow = () => {` |
| 464 | fn | resolveDocument | (private) | `function resolveDocument(context) {` |
| 487 | fn | resolveWindow | (private) | `function resolveWindow(context) {` |
| 510 | fn | getLocalStorage | (private) | `function getLocalStorage(context) {` |
| 531 | fn | callOptional | (private) | `function callOptional(fn, args, defaultValue) {` |
| 543 | fn | createAppearanceManager | (private) | `function createAppearanceManager(rawContext) {` |
| 592 | fn | collectThemeStorageEntries | (private) | `function collectThemeStorageEntries() {` |
| 595 | fn | pushEntry | (private) | `function pushEntry(name, storageRef) {` |
| 636 | fn | persistThemePreference | (private) | `function persistThemePreference(value) {` |
| 655 | fn | readStoredThemePreference | (private) | `function readStoredThemePreference() {` |
| 702 | fn | getRoot | (private) | `function getRoot() {` |
| 706 | fn | getBody | (private) | `function getBody() {` |
| 710 | fn | getAccentColor | (private) | `function getAccentColor() {` |
| 717 | fn | setAccentColor | (private) | `function setAccentColor(value) {` |
| 725 | fn | getPrevAccentColor | (private) | `function getPrevAccentColor() {` |
| 732 | fn | setPrevAccentColor | (private) | `function setPrevAccentColor(value) {` |
| 740 | fn | getHighContrastAccentColor | (private) | `function getHighContrastAccentColor() {` |
| 747 | fn | isHighContrastActive | (private) | `function isHighContrastActive() {` |
| 759 | fn | updateAccentColorResetButtonState | (private) | `function updateAccentColorResetButtonState() {` |
| 769 | fn | clearAccentColorOverrides | (private) | `function clearAccentColorOverrides() {` |
| 779 | fn | applyAccentColor | (private) | `function applyAccentColor(value) {` |
| 789 | fn | refreshDarkModeAccentBoost | (private) | `function refreshDarkModeAccentBoost(payload) {` |
| 799 | fn | ensureSvgHasAriaHidden | (private) | `function ensureSvgHasAriaHidden(markup) {` |
| 806 | fn | applyIconGlyph | (private) | `function applyIconGlyph(target, glyph) {` |
| 816 | fn | getIconGlyph | (private) | `function getIconGlyph(name) {` |
| 838 | fn | updateThemeColor | (private) | `function updateThemeColor(isDark) {` |
| 854 | fn | setToggleIcon | (private) | `function setToggleIcon(button, glyph) {` |
| 894 | fn | handleLottie | (private) | `const handleLottie = () => {` |
| 951 | fn | hideFallback | (private) | `const hideFallback = () => {` |
| 976 | fn | handleFailure | (private) | `const handleFailure = () => {` |
| 1046 | fn | applyDarkMode | (private) | `function applyDarkMode(enabled) {` |
| 1088 | fn | detectSystemDarkPreference | (private) | `function detectSystemDarkPreference() {` |
| 1100 | fn | detectThemeControlType | (private) | `function detectThemeControlType(element, provid...` |
| 1122 | fn | createThemeControlReader | (private) | `function createThemeControlReader(element, type...` |
| 1135 | fn | createThemeControlWriter | (private) | `function createThemeControlWriter(element, type...` |
| 1165 | fn | detectBooleanControlType | (private) | `function detectBooleanControlType(element, prov...` |
| 1187 | fn | createPinkModeControlReader | (private) | `function createPinkModeControlReader(element, t...` |
| 1200 | fn | createPinkModeControlWriter | (private) | `function createPinkModeControlWriter(element, t...` |
| 1234 | fn | createPinkModePreferenceController | (private) | `function createPinkModePreferenceController() {` |
| 1239 | fn | getCurrentPreference | (private) | `const getCurrentPreference = () => currentPrefe...` |
| 1241 | fn | applyPreference | (private) | `function applyPreference(value, config) {` |
| 1285 | fn | registerControl | (private) | `function registerControl(element, controlOption...` |
| 1298 | fn | handler | (private) | - |
| 1341 | fn | setValue | (private) | `function setValue(value, optionsConfig) {` |
| 1346 | fn | getValue | (private) | `function getValue() {` |
| 1350 | fn | reloadFromStorage | (private) | `function reloadFromStorage(optionsConfig) {` |
| 1381 | fn | createThemePreferenceController | (private) | `function createThemePreferenceController(option...` |
| 1387 | fn | getCurrentPreference | (private) | `const getCurrentPreference = () => currentPrefe...` |
| 1389 | fn | applyPreference | (private) | `function applyPreference(value, config) {` |
| 1433 | fn | registerControl | (private) | `function registerControl(element, controlOption...` |
| 1446 | fn | handler | (private) | - |
| 1493 | fn | setValue | (private) | `function setValue(value, optionsConfig) {` |
| 1498 | fn | getValue | (private) | `function getValue() {` |
| 1502 | fn | reloadFromStorage | (private) | `function reloadFromStorage(optionsConfig) {` |
| 1552 | fn | applyHighContrast | (private) | `function applyHighContrast(enabled) {` |
| 1585 | fn | applyReduceMotion | (private) | `function applyReduceMotion(enabled) {` |
| 1605 | fn | applyRelaxedSpacing | (private) | `function applyRelaxedSpacing(enabled) {` |
| 1619 | fn | stopPinkModeIconRotation | (private) | `function stopPinkModeIconRotation() {` |
| 1632 | fn | applyPinkModeIcon | (private) | `function applyPinkModeIcon(iconConfig, options) {` |
| 1654 | fn | triggerPinkModeIconAnimation | (private) | `function triggerPinkModeIconAnimation() {` |
| 1694 | fn | startPinkModeIconRotation | (private) | `function startPinkModeIconRotation() {` |
| 1766 | fn | clearPinkModeIconPressResetTimer | (private) | `function clearPinkModeIconPressResetTimer() {` |
| 1777 | fn | schedulePinkModeIconPressReset | (private) | `function schedulePinkModeIconPressReset() {` |
| 1802 | fn | resetPinkModeIconPressCount | (private) | `function resetPinkModeIconPressCount() {` |
| 1808 | fn | recordPinkModeIconPressTimestamp | (private) | `function recordPinkModeIconPressTimestamp() {` |
| 1830 | class | LocalPinkModeManager | (private) | - |
| 1853 | fn | triggerPinkModeIconRain | (private) | `function triggerPinkModeIconRain() {` |
| 1857 | fn | handlePinkModeIconPress | (private) | `function handlePinkModeIconPress() {` |
| 1875 | fn | startPinkModeAnimatedIcons | (private) | `function startPinkModeAnimatedIcons() {` |
| 1882 | fn | stopPinkModeAnimatedIcons | (private) | `function stopPinkModeAnimatedIcons() {` |
| 1889 | fn | startPinkModeAnimatedIconRotation | (private) | `function startPinkModeAnimatedIconRotation() {` |
| 1894 | fn | stopPinkModeAnimatedIconRotation | (private) | `function stopPinkModeAnimatedIconRotation() {` |
| 1900 | fn | applyPinkMode | (private) | `function applyPinkMode(enabled) {` |
| 1940 | fn | isPinkModeActive | (private) | `function isPinkModeActive() {` |
| 1945 | fn | persistPinkModePreference | (private) | `function persistPinkModePreference(enabled) {` |
| 1964 | fn | rememberSettingsPinkModeBaseline | (private) | `function rememberSettingsPinkModeBaseline() {` |
| 1968 | fn | revertSettingsPinkModeIfNeeded | (private) | `function revertSettingsPinkModeIfNeeded() {` |
| 1974 | fn | getTemperatureUnit | (private) | `function getTemperatureUnit() {` |
| 1981 | fn | setTemperatureUnit | (private) | `function setTemperatureUnit(value) {` |
| 1989 | fn | getFocusScale | (private) | `function getFocusScale() {` |
| 1996 | fn | setFocusScale | (private) | `function setFocusScale(value) {` |
| 2004 | fn | rememberSettingsTemperatureUnitBaseline | (private) | `function rememberSettingsTemperatureUnitBaselin...` |
| 2009 | fn | revertSettingsTemperatureUnitIfNeeded | (private) | `function revertSettingsTemperatureUnitIfNeeded() {` |
| 2031 | fn | rememberSettingsFocusScaleBaseline | (private) | `function rememberSettingsFocusScaleBaseline() {` |
| 2036 | fn | revertSettingsFocusScaleIfNeeded | (private) | `function revertSettingsFocusScaleIfNeeded() {` |
| 2058 | fn | getShowAutoBackups | (private) | `function getShowAutoBackups() {` |
| 2068 | fn | setShowAutoBackups | (private) | `function setShowAutoBackups(value) {` |
| 2076 | fn | applyShowAutoBackupsPreference | (private) | `function applyShowAutoBackupsPreference(enabled...` |
| 2147 | fn | rememberSettingsShowAutoBackupsBaseline | (private) | `function rememberSettingsShowAutoBackupsBaselin...` |
| 2151 | fn | revertSettingsShowAutoBackupsIfNeeded | (private) | `function revertSettingsShowAutoBackupsIfNeeded() {` |
| 2160 | fn | rememberSettingsMountVoltagesBaseline | (private) | `function rememberSettingsMountVoltagesBaseline() {` |
| 2178 | fn | revertSettingsMountVoltagesIfNeeded | (private) | `function revertSettingsMountVoltagesIfNeeded() {` |
| 2284 | fn | initialize | (private) | `function initialize(context) {` |

