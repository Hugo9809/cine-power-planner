# legacy/scripts/modules/results.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 4032
- **Language:** JavaScript
- **Symbols:** 96
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 1 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 3 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 19 | fn | resolveUiHelpers | (private) | `function resolveUiHelpers(scope) {` |
| 81 | fn | resolveModuleBase | (private) | `function resolveModuleBase(scope) {` |
| 209 | fn | refreshFeedbackFieldCache | (private) | `function refreshFeedbackFieldCache(doc) {` |
| 234 | fn | getFeedbackFieldEntries | (private) | `function getFeedbackFieldEntries(doc) {` |
| 380 | fn | getFeedbackOptionFallbacks | (private) | `function getFeedbackOptionFallbacks() {` |
| 388 | fn | extractDatalistValues | (private) | `function extractDatalistValues(element) {` |
| 441 | fn | storeFeedbackOptionFallback | (private) | `function storeFeedbackOptionFallback(name, elem...` |
| 451 | fn | escapeAttributeValue | (private) | `function escapeAttributeValue(value) {` |
| 454 | fn | replaceDatalistOptions | (private) | `function replaceDatalistOptions(element, values) {` |
| 525 | fn | getFeedbackSelectElement | (private) | `function getFeedbackSelectElement(name, id) {` |
| 545 | fn | escapeOptionText | (private) | `function escapeOptionText(value) {` |
| 548 | fn | replaceSelectOptions | (private) | `function replaceSelectOptions(select, values, p...` |
| 757 | fn | normalizeSensorModeKey | (private) | `function normalizeSensorModeKey(value) {` |
| 768 | fn | resolveCanonicalFrameRateValue | (private) | `function resolveCanonicalFrameRateValue(rawValu...` |
| 785 | fn | formatFrameRateLabel | (private) | `function formatFrameRateLabel(value) {` |
| 796 | fn | appendFrameRateOption | (private) | `function appendFrameRateOption(results, seen, n...` |
| 815 | fn | appendFrameRateRange | (private) | `function appendFrameRateRange(results, seen, mi...` |
| 840 | fn | sortFrameRateOptionsInPlace | (private) | `function sortFrameRateOptionsInPlace(values) {` |
| 864 | fn | parseFrameRateOptions | (private) | `function parseFrameRateOptions(frameRateValue) {` |
| 934 | fn | collectAllFrameRateOptions | (private) | `function collectAllFrameRateOptions(frameRates) {` |
| 952 | fn | tokenizeComparisonValue | (private) | `function tokenizeComparisonValue(value) {` |
| 975 | fn | doesFrameRateMatchSensorMode | (private) | `function doesFrameRateMatchSensorMode(frameRate...` |
| 1003 | fn | buildSensorModeFrameRateMap | (private) | `function buildSensorModeFrameRateMap(sensorMode...` |
| 1072 | fn | updateSensorModeSelectOptions | (private) | `function updateSensorModeSelectOptions(values, ...` |
| 1082 | fn | updateFramerateSelectOptionsForSensorMode | (private) | `function updateFramerateSelectOptionsForSensorM...` |
| 1097 | fn | resolveFeedbackOptionElement | (private) | `function resolveFeedbackOptionElement(config) {` |
| 1123 | fn | updateFeedbackOptionList | (private) | `function updateFeedbackOptionList(optionKey, va...` |
| 1158 | fn | captureFeedbackOptionElements | (private) | `function captureFeedbackOptionElements(doc) {` |
| 1187 | fn | normalizeCameraListValue | (private) | `function normalizeCameraListValue(entry, prefer...` |
| 1212 | fn | collectLensMountValues | (private) | `function collectLensMountValues(cameraData) {` |
| 1252 | fn | collectCameraValues | (private) | `function collectCameraValues(cameraData, key, p...` |
| 1269 | fn | updateRuntimeFeedbackCameraOptionLists | (private) | `function updateRuntimeFeedbackCameraOptionLists...` |
| 1293 | fn | resolveDocument | (private) | `function resolveDocument(options) {` |
| 1308 | fn | assignFunctionDependency | (private) | `function assignFunctionDependency(deps, options...` |
| 1317 | fn | updateRuntimeDependencies | (private) | `function updateRuntimeDependencies(options) {` |
| 1432 | fn | resolveElementFromOptions | (private) | `function resolveElementFromOptions(options, nam...` |
| 1463 | fn | getLocaleAwareCollator | (private) | `function getLocaleAwareCollator(collatorCandida...` |
| 1513 | fn | toArray | (private) | `function toArray(value) {` |
| 1525 | fn | resolveSelectCollection | (private) | `function resolveSelectCollection(options, name,...` |
| 1566 | fn | setHelpAttribute | (private) | `function setHelpAttribute(element, text) {` |
| 1584 | fn | getNonEmptyString | (private) | `function getNonEmptyString(value) {` |
| 1591 | fn | replaceSummaryTokens | (private) | `function replaceSummaryTokens(template, tokens) {` |
| 1610 | fn | selectSummaryBatteryName | (private) | `function selectSummaryBatteryName(labelText, ba...` |
| 1621 | fn | formatRuntimeHoursForSummary | (private) | `function formatRuntimeHoursForSummary(runtimeHo...` |
| 1627 | fn | formatCurrentForSummary | (private) | `function formatCurrentForSummary(current) {` |
| 1633 | fn | coerceCurrentLimit | (private) | `function coerceCurrentLimit(rawValue) {` |
| 1648 | fn | resolvePinsStatusText | (private) | `function resolvePinsStatusText(resolveText, opt...` |
| 1672 | fn | resolveDtapStatusText | (private) | `function resolveDtapStatusText(resolveText, opt...` |
| 1711 | fn | buildPowerOutputSummaryText | (private) | `function buildPowerOutputSummaryText(resolveTex...` |
| 1736 | fn | buildPlainSummaryText | (private) | `function buildPlainSummaryText(summaryOptions) {` |
| 1773 | fn | createTextResolver | (private) | `function createTextResolver(langTexts, fallback...` |
| 1810 | fn | resolveEscapeHtml | (private) | `function resolveEscapeHtml() {` |
| 1838 | fn | normaliseTemperatureUnitPreference | (private) | `function normaliseTemperatureUnitPreference(uni...` |
| 1851 | fn | resolveTemperatureUnitPreference | (private) | `function resolveTemperatureUnitPreference() {` |
| 1884 | fn | createNumberFormatter | (private) | `function createNumberFormatter(lang, options, f...` |
| 1906 | fn | resolveLanguageFromContext | (private) | `function resolveLanguageFromContext(doc) {` |
| 1929 | fn | resolveLanguageTexts | (private) | `function resolveLanguageTexts(lang) {` |
| 1972 | fn | convertCelsiusToUnit | (private) | `function convertCelsiusToUnit(celsius, unit) {` |
| 1978 | fn | renderTemperatureNote | (private) | `function renderTemperatureNote(hours) {` |
| 2067 | fn | localizeResultsSection | (private) | `function localizeResultsSection(options) {` |
| 2115 | fn | applyLabel | (private) | `function applyLabel(element, labelKey, helpKey) {` |
| 2284 | fn | localizeBatteryComparisonSection | (private) | `function localizeBatteryComparisonSection(optio...` |
| 2336 | fn | attachHandlerOnce | (private) | `function attachHandlerOnce(target, eventName, h...` |
| 2354 | fn | updateCalculations | (private) | `function updateCalculations(options) {` |
| 2358 | fn | resolveFunctionDependency | (private) | `function resolveFunctionDependency(name) {` |
| 2370 | fn | safeCall | (private) | `function safeCall(fn) {` |
| 2467 | fn | resolveText | (private) | `function resolveText(key) {` |
| 2534 | fn | normalizePreviewItem | (private) | `function normalizePreviewItem(value) {` |
| 2545 | fn | getPreviewValue | (private) | `function getPreviewValue(key) {` |
| 2551 | fn | getPreviewList | (private) | `function getPreviewList(key) {` |
| 2568 | fn | safeSelectValue | (private) | `function safeSelectValue(select, previewKey) {` |
| 2579 | fn | getSelectedOptionLabel | (private) | `function getSelectedOptionLabel(select) {` |
| 2637 | fn | resolvePowerDraw | (private) | `function resolvePowerDraw(data) {` |
| 2719 | fn | resetBreakdownList | (private) | `function resetBreakdownList(target) {` |
| 2749 | fn | appendBreakdownEntry | (private) | `function appendBreakdownEntry(target, label, va...` |
| 3238 | fn | sortByHoursThenName | (private) | `function sortByHoursThenName(a, b) {` |
| 3271 | fn | getBarClass | (private) | `function getBarClass(method) {` |
| 3274 | fn | getMethodLabel | (private) | `function getMethodLabel(method) {` |
| 3299 | fn | addCandidateRow | (private) | `function addCandidateRow(candidate, cssClass) {` |
| 3495 | fn | setupRuntimeFeedback | (private) | `function setupRuntimeFeedback(options) {` |
| 3518 | fn | closeRuntimeFeedbackDialog | (private) | `function closeRuntimeFeedbackDialog(warnMessage) {` |
| 3543 | fn | sanitizePrefillValue | (private) | `function sanitizePrefillValue(value) {` |
| 3562 | fn | resolveSelectLabel | (private) | `function resolveSelectLabel(select, fallbackId,...` |
| 3604 | fn | resolveCameraSelectionLabel | (private) | `function resolveCameraSelectionLabel() {` |
| 3608 | fn | resolveBatteryPlateSelectionLabel | (private) | `function resolveBatteryPlateSelectionLabel() {` |
| 3625 | fn | resolveBatterySelectionLabel | (private) | `function resolveBatterySelectionLabel() {` |
| 3629 | fn | resolveMonitorSelectionLabel | (private) | `function resolveMonitorSelectionLabel() {` |
| 3633 | fn | resolveWirelessVideoSelectionLabel | (private) | `function resolveWirelessVideoSelectionLabel() {` |
| 3637 | fn | resolveDistanceSelectionLabel | (private) | `function resolveDistanceSelectionLabel() {` |
| 3641 | fn | resolveCollectionSelectionLabels | (private) | `function resolveCollectionSelectionLabels(colle...` |
| 3674 | fn | resolveMotorSelectionLabels | (private) | `function resolveMotorSelectionLabels() {` |
| 3678 | fn | resolveControllerSelectionLabels | (private) | `function resolveControllerSelectionLabels() {` |
| 3682 | fn | setPrefillValue | (private) | `function setPrefillValue(input, value) {` |
| 3739 | fn | prefillRuntimeFeedbackDefaults | (private) | `function prefillRuntimeFeedbackDefaults() {` |

