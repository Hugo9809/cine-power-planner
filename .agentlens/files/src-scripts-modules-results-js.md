# src/scripts/modules/results.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 4612
- **Language:** JavaScript
- **Symbols:** 95
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 4 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 22 | fn | resolveUiHelpers | (private) | `function resolveUiHelpers(scope) {` |
| 110 | fn | resolveModuleBase | (private) | `function resolveModuleBase(scope) {` |
| 270 | fn | refreshFeedbackFieldCache | (private) | `function refreshFeedbackFieldCache(doc) {` |
| 295 | fn | getFeedbackFieldEntries | (private) | `function getFeedbackFieldEntries(doc) {` |
| 364 | fn | getFeedbackOptionFallbacks | (private) | `function getFeedbackOptionFallbacks() {` |
| 373 | fn | extractDatalistValues | (private) | `function extractDatalistValues(element) {` |
| 431 | fn | storeFeedbackOptionFallback | (private) | `function storeFeedbackOptionFallback(name, elem...` |
| 442 | fn | escapeAttributeValue | (private) | `function escapeAttributeValue(value) {` |
| 451 | fn | replaceDatalistOptions | (private) | `function replaceDatalistOptions(element, values) {` |
| 529 | fn | getFeedbackSelectElement | (private) | `function getFeedbackSelectElement(name, id) {` |
| 554 | fn | escapeOptionText | (private) | `function escapeOptionText(value) {` |
| 563 | fn | replaceSelectOptions | (private) | `function replaceSelectOptions(select, values, p...` |
| 786 | fn | normalizeSensorModeKey | (private) | `function normalizeSensorModeKey(value) {` |
| 837 | fn | resolveCanonicalFrameRateValue | (private) | `function resolveCanonicalFrameRateValue(rawValu...` |
| 858 | fn | formatFrameRateLabel | (private) | `function formatFrameRateLabel(value) {` |
| 872 | fn | appendFrameRateOption | (private) | `function appendFrameRateOption(results, seen, n...` |
| 892 | fn | appendFrameRateRange | (private) | `function appendFrameRateRange(results, seen, mi...` |
| 922 | fn | sortFrameRateOptionsInPlace | (private) | `function sortFrameRateOptionsInPlace(values) {` |
| 950 | fn | parseFrameRateOptions | (private) | `function parseFrameRateOptions(frameRateValue) {` |
| 1031 | fn | collectAllFrameRateOptions | (private) | `function collectAllFrameRateOptions(frameRates) {` |
| 1052 | fn | tokenizeComparisonValue | (private) | `function tokenizeComparisonValue(value) {` |
| 1076 | fn | doesFrameRateMatchSensorMode | (private) | `function doesFrameRateMatchSensorMode(frameRate...` |
| 1105 | fn | buildSensorModeFrameRateMap | (private) | `function buildSensorModeFrameRateMap(sensorMode...` |
| 1179 | fn | updateSensorModeSelectOptions | (private) | `function updateSensorModeSelectOptions(values, ...` |
| 1190 | fn | updateFramerateSelectOptionsForSensorMode | (private) | `function updateFramerateSelectOptionsForSensorM...` |
| 1216 | fn | resolveFeedbackOptionElement | (private) | `function resolveFeedbackOptionElement(config) {` |
| 1248 | fn | updateFeedbackOptionList | (private) | `function updateFeedbackOptionList(optionKey, va...` |
| 1289 | fn | captureFeedbackOptionElements | (private) | `function captureFeedbackOptionElements(doc) {` |
| 1319 | fn | normalizeCameraListValue | (private) | `function normalizeCameraListValue(entry, prefer...` |
| 1345 | fn | collectLensMountValues | (private) | `function collectLensMountValues(cameraData) {` |
| 1389 | fn | collectCameraValues | (private) | `function collectCameraValues(cameraData, key, p...` |
| 1407 | fn | updateRuntimeFeedbackCameraOptionLists | (private) | `function updateRuntimeFeedbackCameraOptionLists...` |
| 1440 | fn | resolveDocument | (private) | `function resolveDocument(options) {` |
| 1460 | fn | assignFunctionDependency | (private) | `function assignFunctionDependency(deps, options...` |
| 1471 | fn | updateRuntimeDependencies | (private) | `function updateRuntimeDependencies(options) {` |
| 1599 | fn | resolveElementFromOptions | (private) | `function resolveElementFromOptions(options, nam...` |
| 1636 | fn | getLocaleAwareCollator | (private) | `function getLocaleAwareCollator(collatorCandida...` |
| 1691 | fn | toArray | (private) | `function toArray(value) {` |
| 1707 | fn | resolveSelectCollection | (private) | `function resolveSelectCollection(options, name,...` |
| 1753 | fn | setHelpAttribute | (private) | `function setHelpAttribute(element, text) {` |
| 1773 | fn | getNonEmptyString | (private) | `function getNonEmptyString(value) {` |
| 1781 | fn | replaceSummaryTokens | (private) | `function replaceSummaryTokens(template, tokens) {` |
| 1801 | fn | selectSummaryBatteryName | (private) | `function selectSummaryBatteryName(labelText, ba...` |
| 1813 | fn | formatRuntimeHoursForSummary | (private) | `function formatRuntimeHoursForSummary(runtimeHo...` |
| 1820 | fn | formatCurrentForSummary | (private) | `function formatCurrentForSummary(current) {` |
| 1827 | fn | coerceCurrentLimit | (private) | `function coerceCurrentLimit(rawValue) {` |
| 1843 | fn | resolvePinsStatusText | (private) | `function resolvePinsStatusText(resolveText, opt...` |
| 1874 | fn | resolveDtapStatusText | (private) | `function resolveDtapStatusText(resolveText, opt...` |
| 1921 | fn | buildPowerOutputSummaryText | (private) | `function buildPowerOutputSummaryText(resolveTex...` |
| 1950 | fn | buildPlainSummaryText | (private) | `function buildPlainSummaryText(summaryOptions) {` |
| 2001 | fn | createTextResolver | (private) | `function createTextResolver(langTexts, fallback...` |
| 2033 | fn | resolveEscapeHtml | (private) | `function resolveEscapeHtml() {` |
| 2064 | fn | normaliseTemperatureUnitPreference | (private) | `function normaliseTemperatureUnitPreference(uni...` |
| 2078 | fn | resolveTemperatureUnitPreference | (private) | `function resolveTemperatureUnitPreference() {` |
| 2120 | fn | createNumberFormatter | (private) | `function createNumberFormatter(lang, options, f...` |
| 2144 | fn | resolveLanguageFromContext | (private) | `function resolveLanguageFromContext(doc) {` |
| 2171 | fn | resolveLanguageTexts | (private) | `function resolveLanguageTexts(lang) {` |
| 2207 | fn | convertCelsiusToUnit | (private) | `function convertCelsiusToUnit(celsius, unit) {` |
| 2214 | fn | renderTemperatureNote | (private) | `function renderTemperatureNote(hours) {` |
| 2330 | fn | localizeResultsSection | (private) | `function localizeResultsSection(options) {` |
| 2408 | fn | applyLabel | (private) | `function applyLabel(element, labelKey, helpKey) {` |
| 2600 | fn | localizeBatteryComparisonSection | (private) | `function localizeBatteryComparisonSection(optio...` |
| 2675 | fn | attachHandlerOnce | (private) | `function attachHandlerOnce(target, eventName, h...` |
| 2698 | fn | updateCalculations | (private) | `function updateCalculations(options) {` |
| 2704 | fn | resolveFunctionDependency | (private) | `function resolveFunctionDependency(name) {` |
| 2717 | fn | safeCall | (private) | `function safeCall(fn) {` |
| 2817 | fn | resolveText | (private) | `function resolveText(key) {` |
| 2929 | fn | normalizePreviewItem | (private) | `function normalizePreviewItem(value) {` |
| 2941 | fn | getPreviewValue | (private) | `function getPreviewValue(key) {` |
| 2948 | fn | getPreviewList | (private) | `function getPreviewList(key) {` |
| 2966 | fn | safeSelectValue | (private) | `function safeSelectValue(select, previewKey) {` |
| 2978 | fn | getSelectedOptionLabel | (private) | `function getSelectedOptionLabel(select) {` |
| 3044 | fn | resolvePowerDraw | (private) | `function resolvePowerDraw(data) {` |
| 3125 | fn | resetBreakdownList | (private) | `function resetBreakdownList(target) {` |
| 3156 | fn | appendBreakdownEntry | (private) | `function appendBreakdownEntry(target, label, va...` |
| 3693 | fn | sortByHoursThenName | (private) | `function sortByHoursThenName(a, b) {` |
| 3736 | fn | getBarClass | (private) | `function getBarClass(method) {` |
| 3740 | fn | getMethodLabel | (private) | `function getMethodLabel(method) {` |
| 3754 | fn | addCandidateRow | (private) | `function addCandidateRow(candidate, cssClass) {` |
| 3980 | fn | setupRuntimeFeedback | (private) | `function setupRuntimeFeedback(options) {` |
| 4007 | fn | closeRuntimeFeedbackDialog | (private) | `function closeRuntimeFeedbackDialog(warnMessage) {` |
| 4033 | fn | sanitizePrefillValue | (private) | `function sanitizePrefillValue(value) {` |
| 4053 | fn | resolveSelectLabel | (private) | `function resolveSelectLabel(select, fallbackId,...` |
| 4096 | fn | resolveCameraSelectionLabel | (private) | `function resolveCameraSelectionLabel() {` |
| 4103 | fn | resolveBatteryPlateSelectionLabel | (private) | `function resolveBatteryPlateSelectionLabel() {` |
| 4125 | fn | resolveBatterySelectionLabel | (private) | `function resolveBatterySelectionLabel() {` |
| 4132 | fn | resolveMonitorSelectionLabel | (private) | `function resolveMonitorSelectionLabel() {` |
| 4139 | fn | resolveWirelessVideoSelectionLabel | (private) | `function resolveWirelessVideoSelectionLabel() {` |
| 4146 | fn | resolveDistanceSelectionLabel | (private) | `function resolveDistanceSelectionLabel() {` |
| 4153 | fn | resolveCollectionSelectionLabels | (private) | `function resolveCollectionSelectionLabels(colle...` |
| 4187 | fn | resolveMotorSelectionLabels | (private) | `function resolveMotorSelectionLabels() {` |
| 4198 | fn | resolveControllerSelectionLabels | (private) | `function resolveControllerSelectionLabels() {` |
| 4209 | fn | setPrefillValue | (private) | `function setPrefillValue(input, value) {` |
| 4269 | fn | prefillRuntimeFeedbackDefaults | (private) | `function prefillRuntimeFeedbackDefaults() {` |

## Memory Markers

### 🟢 `NOTE` (line 3400)

> This model assumes constant power draw. In reality, devices may fluctuate.

