# legacy/scripts/modules/settings-and-appearance.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 2072
- **Language:** JavaScript
- **Symbols:** 96
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 1 | fn | _classCallCheck | (private) | `function _classCallCheck(a, n) { if (!(a instan...` |
| 2 | fn | _defineProperties | (private) | `function _defineProperties(e, r) { for (var t =...` |
| 3 | fn | _createClass | (private) | `function _createClass(e, r, t) { return r && _d...` |
| 4 | fn | _toPropertyKey | (private) | `function _toPropertyKey(t) { var i = _toPrimiti...` |
| 5 | fn | _toPrimitive | (private) | `function _toPrimitive(t, r) { if ("object" != _...` |
| 6 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 8 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 24 | fn | createModuleBaseFallback | (private) | `function createModuleBaseFallback(scope) {` |
| 266 | fn | resolveModuleBase | (private) | `function resolveModuleBase(scope) {` |
| 360 | fn | cloneContext | (private) | `function cloneContext(context) {` |
| 372 | fn | createFallbackContext | (private) | `function createFallbackContext() {` |
| 399 | fn | resolveDocument | (private) | `function resolveDocument(context) {` |
| 421 | fn | resolveWindow | (private) | `function resolveWindow(context) {` |
| 443 | fn | getLocalStorage | (private) | `function getLocalStorage(context) {` |
| 463 | fn | callOptional | (private) | `function callOptional(fn, args, defaultValue) {` |
| 474 | fn | createAppearanceManager | (private) | `function createAppearanceManager(rawContext) {` |
| 519 | fn | collectThemeStorageEntries | (private) | `function collectThemeStorageEntries() {` |
| 521 | fn | pushEntry | (private) | `function pushEntry(name, storageRef) {` |
| 559 | fn | persistThemePreference | (private) | `function persistThemePreference(value) {` |
| 577 | fn | readStoredThemePreference | (private) | `function readStoredThemePreference() {` |
| 615 | fn | getRoot | (private) | `function getRoot() {` |
| 618 | fn | getBody | (private) | `function getBody() {` |
| 621 | fn | getAccentColor | (private) | `function getAccentColor() {` |
| 627 | fn | setAccentColor | (private) | `function setAccentColor(value) {` |
| 634 | fn | getPrevAccentColor | (private) | `function getPrevAccentColor() {` |
| 640 | fn | setPrevAccentColor | (private) | `function setPrevAccentColor(value) {` |
| 647 | fn | getHighContrastAccentColor | (private) | `function getHighContrastAccentColor() {` |
| 653 | fn | isHighContrastActive | (private) | `function isHighContrastActive() {` |
| 664 | fn | updateAccentColorResetButtonState | (private) | `function updateAccentColorResetButtonState() {` |
| 673 | fn | clearAccentColorOverrides | (private) | `function clearAccentColorOverrides() {` |
| 682 | fn | applyAccentColor | (private) | `function applyAccentColor(value) {` |
| 691 | fn | refreshDarkModeAccentBoost | (private) | `function refreshDarkModeAccentBoost(payload) {` |
| 700 | fn | ensureSvgHasAriaHidden | (private) | `function ensureSvgHasAriaHidden(markup) {` |
| 706 | fn | applyIconGlyph | (private) | `function applyIconGlyph(target, glyph) {` |
| 715 | fn | getIconGlyph | (private) | `function getIconGlyph(name) {` |
| 736 | fn | updateThemeColor | (private) | `function updateThemeColor(isDark) {` |
| 751 | fn | setToggleIcon | (private) | `function setToggleIcon(button, glyph) {` |
| 912 | fn | applyDarkMode | (private) | `function applyDarkMode(enabled) {` |
| 954 | fn | detectSystemDarkPreference | (private) | `function detectSystemDarkPreference() {` |
| 965 | fn | detectThemeControlType | (private) | `function detectThemeControlType(element, provid...` |
| 984 | fn | createThemeControlReader | (private) | `function createThemeControlReader(element, type...` |
| 1002 | fn | createThemeControlWriter | (private) | `function createThemeControlWriter(element, type...` |
| 1031 | fn | detectBooleanControlType | (private) | `function detectBooleanControlType(element, prov...` |
| 1050 | fn | createPinkModeControlReader | (private) | `function createPinkModeControlReader(element, t...` |
| 1068 | fn | createPinkModeControlWriter | (private) | `function createPinkModeControlWriter(element, t...` |
| 1101 | fn | createPinkModePreferenceController | (private) | `function createPinkModePreferenceController() {` |
| 1108 | fn | applyPreference | (private) | `function applyPreference(value, config) {` |
| 1150 | fn | registerControl | (private) | `function registerControl(element, controlOption...` |
| 1205 | fn | setValue | (private) | `function setValue(value, optionsConfig) {` |
| 1211 | fn | getValue | (private) | `function getValue() {` |
| 1214 | fn | reloadFromStorage | (private) | `function reloadFromStorage(optionsConfig) {` |
| 1244 | fn | createThemePreferenceController | (private) | `function createThemePreferenceController(option...` |
| 1252 | fn | applyPreference | (private) | `function applyPreference(value, config) {` |
| 1294 | fn | registerControl | (private) | `function registerControl(element, controlOption...` |
| 1352 | fn | setValue | (private) | `function setValue(value, optionsConfig) {` |
| 1359 | fn | getValue | (private) | `function getValue() {` |
| 1362 | fn | reloadFromStorage | (private) | `function reloadFromStorage(optionsConfig) {` |
| 1410 | fn | applyHighContrast | (private) | `function applyHighContrast(enabled) {` |
| 1440 | fn | applyReduceMotion | (private) | `function applyReduceMotion(enabled) {` |
| 1458 | fn | applyRelaxedSpacing | (private) | `function applyRelaxedSpacing(enabled) {` |
| 1471 | fn | stopPinkModeIconRotation | (private) | `function stopPinkModeIconRotation() {` |
| 1481 | fn | applyPinkModeIcon | (private) | `function applyPinkModeIcon(iconConfig, options) {` |
| 1499 | fn | triggerPinkModeIconAnimation | (private) | `function triggerPinkModeIconAnimation() {` |
| 1539 | fn | startPinkModeIconRotation | (private) | `function startPinkModeIconRotation() {` |
| 1599 | fn | clearPinkModeIconPressResetTimer | (private) | `function clearPinkModeIconPressResetTimer() {` |
| 1609 | fn | schedulePinkModeIconPressReset | (private) | `function schedulePinkModeIconPressReset() {` |
| 1628 | fn | resetPinkModeIconPressCount | (private) | `function resetPinkModeIconPressCount() {` |
| 1633 | fn | recordPinkModeIconPressTimestamp | (private) | `function recordPinkModeIconPressTimestamp() {` |
| 1646 | fn | LocalPinkModeManager | (private) | `function LocalPinkModeManager() {` |
| 1668 | fn | triggerPinkModeIconRain | (private) | `function triggerPinkModeIconRain() {}` |
| 1669 | fn | handlePinkModeIconPress | (private) | `function handlePinkModeIconPress() {` |
| 1682 | fn | startPinkModeAnimatedIcons | (private) | `function startPinkModeAnimatedIcons() {` |
| 1688 | fn | stopPinkModeAnimatedIcons | (private) | `function stopPinkModeAnimatedIcons() {` |
| 1694 | fn | startPinkModeAnimatedIconRotation | (private) | `function startPinkModeAnimatedIconRotation() {` |
| 1698 | fn | stopPinkModeAnimatedIconRotation | (private) | `function stopPinkModeAnimatedIconRotation() {` |
| 1703 | fn | applyPinkMode | (private) | `function applyPinkMode(enabled) {` |
| 1742 | fn | isPinkModeActive | (private) | `function isPinkModeActive() {` |
| 1746 | fn | persistPinkModePreference | (private) | `function persistPinkModePreference(enabled) {` |
| 1764 | fn | rememberSettingsPinkModeBaseline | (private) | `function rememberSettingsPinkModeBaseline() {` |
| 1767 | fn | revertSettingsPinkModeIfNeeded | (private) | `function revertSettingsPinkModeIfNeeded() {` |
| 1772 | fn | getTemperatureUnit | (private) | `function getTemperatureUnit() {` |
| 1778 | fn | setTemperatureUnit | (private) | `function setTemperatureUnit(value) {` |
| 1785 | fn | getFocusScale | (private) | `function getFocusScale() {` |
| 1791 | fn | setFocusScale | (private) | `function setFocusScale(value) {` |
| 1798 | fn | rememberSettingsTemperatureUnitBaseline | (private) | `function rememberSettingsTemperatureUnitBaselin...` |
| 1802 | fn | revertSettingsTemperatureUnitIfNeeded | (private) | `function revertSettingsTemperatureUnitIfNeeded() {` |
| 1823 | fn | rememberSettingsFocusScaleBaseline | (private) | `function rememberSettingsFocusScaleBaseline() {` |
| 1827 | fn | revertSettingsFocusScaleIfNeeded | (private) | `function revertSettingsFocusScaleIfNeeded() {` |
| 1848 | fn | getShowAutoBackups | (private) | `function getShowAutoBackups() {` |
| 1857 | fn | setShowAutoBackups | (private) | `function setShowAutoBackups(value) {` |
| 1864 | fn | applyShowAutoBackupsPreference | (private) | `function applyShowAutoBackupsPreference(enabled...` |
| 1924 | fn | rememberSettingsShowAutoBackupsBaseline | (private) | `function rememberSettingsShowAutoBackupsBaselin...` |
| 1927 | fn | revertSettingsShowAutoBackupsIfNeeded | (private) | `function revertSettingsShowAutoBackupsIfNeeded() {` |
| 1937 | fn | rememberSettingsMountVoltagesBaseline | (private) | `function rememberSettingsMountVoltagesBaseline() {` |
| 1954 | fn | revertSettingsMountVoltagesIfNeeded | (private) | `function revertSettingsMountVoltagesIfNeeded() {` |
| 2049 | fn | initialize | (private) | `function initialize(context) {` |

