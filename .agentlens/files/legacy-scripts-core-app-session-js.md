# legacy/scripts/core/app-session.js

[← Back to Module](../modules/legacy-scripts-core/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 18793
- **Language:** JavaScript
- **Symbols:** 370
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 2 | fn | _createForOfIteratorHelper | (private) | `function _createForOfIteratorHelper(r, e) { var...` |
| 3 | fn | _objectWithoutProperties | (private) | `function _objectWithoutProperties(e, t) { if (n...` |
| 4 | fn | _objectWithoutPropertiesLoose | (private) | `function _objectWithoutPropertiesLoose(r, e) { ...` |
| 5 | fn | _regenerator | (private) | `function _regenerator() { var e, t, r = "functi...` |
| 6 | fn | _regeneratorDefine2 | (private) | `function _regeneratorDefine2(e, r, n, t) { var ...` |
| 7 | fn | asyncGeneratorStep | (private) | `function asyncGeneratorStep(n, t, e, r, o, a, c...` |
| 8 | fn | _asyncToGenerator | (private) | `function _asyncToGenerator(n) { return function...` |
| 9 | fn | _toConsumableArray | (private) | `function _toConsumableArray(r) { return _arrayW...` |
| 10 | fn | _nonIterableSpread | (private) | `function _nonIterableSpread() { throw new TypeE...` |
| 11 | fn | _iterableToArray | (private) | `function _iterableToArray(r) { if ("undefined" ...` |
| 12 | fn | _arrayWithoutHoles | (private) | `function _arrayWithoutHoles(r) { if (Array.isAr...` |
| 13 | fn | _slicedToArray | (private) | `function _slicedToArray(r, e) { return _arrayWi...` |
| 14 | fn | _nonIterableRest | (private) | `function _nonIterableRest() { throw new TypeErr...` |
| 15 | fn | _unsupportedIterableToArray | (private) | `function _unsupportedIterableToArray(r, a) { if...` |
| 16 | fn | _arrayLikeToArray | (private) | `function _arrayLikeToArray(r, a) { (null == a |...` |
| 17 | fn | _iterableToArrayLimit | (private) | `function _iterableToArrayLimit(r, l) { var t = ...` |
| 18 | fn | _arrayWithHoles | (private) | `function _arrayWithHoles(r) { if (Array.isArray...` |
| 19 | fn | ownKeys | (private) | `function ownKeys(e, r) { var t = Object.keys(e)...` |
| 20 | fn | _objectSpread | (private) | `function _objectSpread(e) { for (var r = 1; r <...` |
| 21 | fn | _defineProperty | (private) | `function _defineProperty(e, r, t) { return (r =...` |
| 22 | fn | _toPropertyKey | (private) | `function _toPropertyKey(t) { var i = _toPrimiti...` |
| 23 | fn | _toPrimitive | (private) | `function _toPrimitive(t, r) { if ("object" != _...` |
| 24 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 48 | fn | getSessionCloneScope | (private) | `function getSessionCloneScope() {` |
| 66 | fn | resolveSessionRuntimeFunction | (private) | `function resolveSessionRuntimeFunction(name) {` |
| 129 | fn | isNavigatorExplicitlyOffline | (private) | `function isNavigatorExplicitlyOffline(navigator...` |
| 138 | fn | resolveForceReloadOfflineNotice | (private) | `function resolveForceReloadOfflineNotice() {` |
| 176 | fn | announceForceReloadOfflineNotice | (private) | `function announceForceReloadOfflineNotice() {` |
| 217 | fn | safeGetCurrentProjectName | (private) | `function safeGetCurrentProjectName() {` |
| 239 | fn | normalizeProjectStorageRevisionValue | (private) | `function normalizeProjectStorageRevisionValue(v...` |
| 255 | fn | resolveProjectStorageRevisionKeyName | (private) | `function resolveProjectStorageRevisionKeyName() {` |
| 271 | fn | readProjectStorageRevisionValue | (private) | `function readProjectStorageRevisionValue() {` |
| 286 | fn | resolveActiveProjectStorageKey | (private) | `function resolveActiveProjectStorageKey() {` |
| 310 | fn | reloadActiveProjectFromStorage | (private) | `function reloadActiveProjectFromStorage() {` |
| 407 | fn | scheduleProjectStorageSync | (private) | `function scheduleProjectStorageSync() {` |
| 452 | fn | resolveSetLanguageFn | (private) | `function resolveSetLanguageFn() {` |
| 455 | fn | applySetLanguage | (private) | `function applySetLanguage(languageCode) {` |
| 473 | fn | sessionJsonDeepClone | (private) | `function sessionJsonDeepClone(value) {` |
| 484 | fn | sessionResolveStructuredClone | (private) | `function sessionResolveStructuredClone(scope) {` |
| 515 | fn | sessionCreateResilientDeepClone | (private) | `function sessionCreateResilientDeepClone(scope) {` |
| 549 | fn | resolveMissingMountVoltageWarnings | (private) | `function resolveMissingMountVoltageWarnings() {` |
| 579 | fn | warnMissingMountVoltageHelper | (private) | `function warnMissingMountVoltageHelper(helperNa...` |
| 595 | fn | ensureSessionRuntimePlaceholder | (private) | `function ensureSessionRuntimePlaceholder(name, ...` |
| 618 | fn | detectPrimaryGlobalScope | (private) | `function detectPrimaryGlobalScope() {` |
| 633 | fn | whenGlobalValueAvailable | (private) | `function whenGlobalValueAvailable(name, validat...` |
| 732 | fn | getSessionRuntimeScopes | (private) | `function getSessionRuntimeScopes() {` |
| 755 | fn | resolveModuleApi | (private) | `function resolveModuleApi(name, validator) {` |
| 868 | fn | normalizeVersionValue | (private) | `function normalizeVersionValue(value) {` |
| 875 | fn | resolveKnownAppVersion | (private) | `function resolveKnownAppVersion(explicitVersion) {` |
| 982 | fn | resolveMountVoltageNamespace | (private) | `function resolveMountVoltageNamespace() {` |
| 1000 | fn | resolveMountVoltageRuntimeExports | (private) | `function resolveMountVoltageRuntimeExports() {` |
| 1018 | fn | getSessionRuntimeFunction | (private) | `function getSessionRuntimeFunction(name) {` |
| 1046 | fn | resolveSettingsLoggingResolver | (private) | `function resolveSettingsLoggingResolver() {` |
| 1074 | fn | resolveLegacySettingsLogger | (private) | `function resolveLegacySettingsLogger() {` |
| 1126 | fn | logSettingsEvent | (private) | `function logSettingsEvent(level, message, detai...` |
| 1162 | fn | prepareSettingsOpenContext | (private) | `function prepareSettingsOpenContext(context) {` |
| 1169 | fn | consumeSettingsOpenContext | (private) | `function consumeSettingsOpenContext(defaultCont...` |
| 1182 | fn | resolveSettingsDialog | (private) | `function resolveSettingsDialog() {` |
| 1195 | fn | resolveSettingsButton | (private) | `function resolveSettingsButton() {` |
| 1208 | fn | ensureDeferredScriptsLoaded | (private) | `function ensureDeferredScriptsLoaded(reason) {` |
| 1232 | fn | ensureOnboardingTourReady | (private) | `function ensureOnboardingTourReady(reason) {` |
| 1255 | fn | requestSettingsOpen | (private) | `function requestSettingsOpen(context) {` |
| 1286 | fn | resolveCompatibilityTexts | (private) | `function resolveCompatibilityTexts(langTexts, f...` |
| 1297 | fn | ensureMeaningfulValue | (private) | `function ensureMeaningfulValue(value) {` |
| 1404 | fn | humanizeRestoreSectionKey | (private) | `function humanizeRestoreSectionKey(key) {` |
| 1417 | fn | evaluateRestoreCompatibilitySections | (private) | `function evaluateRestoreCompatibilitySections(_...` |
| 1462 | fn | describeMissingSections | (private) | `function describeMissingSections(label, items) {` |
| 1471 | fn | buildRestoreCompatibilityReport | (private) | `function buildRestoreCompatibilityReport() {` |
| 1585 | fn | invokeSessionRevertAccentColor | (private) | `function invokeSessionRevertAccentColor() {` |
| 1596 | fn | invokeSessionOpenAutoGearEditor | (private) | `function invokeSessionOpenAutoGearEditor() {` |
| 1849 | fn | getGlobalCineUi | (private) | `function getGlobalCineUi() {` |
| 1862 | fn | isCineUiEntryRegistered | (private) | `function isCineUiEntryRegistered(registry, name) {` |
| 1883 | fn | registerCineUiEntries | (private) | `function registerCineUiEntries(registry, entrie...` |
| 1904 | fn | safeLoadStoredLogoPreview | (private) | `function safeLoadStoredLogoPreview() {` |
| 1914 | fn | areSessionEntriesRegistered | (private) | `function areSessionEntriesRegistered(cineUi) {` |
| 1924 | fn | enqueueCineUiRegistration | (private) | `function enqueueCineUiRegistration(callback) {` |
| 2060 | fn | resolveFilterSelectElement | (private) | `function resolveFilterSelectElement() {` |
| 2078 | fn | callSessionCoreFunction | (private) | `function callSessionCoreFunction(functionName) {` |
| 2108 | fn | ensureSessionRuntimeFunction | (private) | `function ensureSessionRuntimeFunction(functionN...` |
| 2148 | fn | getSessionCoreValue | (private) | `function getSessionCoreValue(functionName) {` |
| 2167 | fn | deriveSessionProjectInfo | (private) | `function deriveSessionProjectInfo(info) {` |
| 2179 | fn | normalizeTemperatureUnitValue | (private) | `function normalizeTemperatureUnitValue(value) {` |
| 2185 | fn | resolveInitialTemperatureUnit | (private) | `function resolveInitialTemperatureUnit() {` |
| 2202 | fn | resolveTemperatureUnitPreferenceController | (private) | `function resolveTemperatureUnitPreferenceContro...` |
| 2221 | fn | applyTemperatureUnitPreferenceWithFallback | (private) | `function applyTemperatureUnitPreferenceWithFall...` |
| 2359 | fn | createRestoreRehearsalRefs | (private) | `function createRestoreRehearsalRefs() {` |
| 2428 | fn | createEmptyRestoreRehearsalCounts | (private) | `function createEmptyRestoreRehearsalCounts() {` |
| 2434 | fn | countProjectsFromSetups | (private) | `function countProjectsFromSetups(setups) {` |
| 2446 | fn | countFavoritesEntries | (private) | `function countFavoritesEntries(favorites) {` |
| 2458 | fn | projectInfoValueHasData | (private) | `function projectInfoValueHasData(value) {` |
| 2475 | fn | countCrewEntries | (private) | `function countCrewEntries(value) {` |
| 2517 | fn | countScheduleEntries | (private) | `function countScheduleEntries(value) {` |
| 2552 | fn | summarizeProjectInfoStats | (private) | `function summarizeProjectInfoStats(projectInfo) {` |
| 2607 | fn | summarizeProjectCollection | (private) | `function summarizeProjectCollection(collection) {` |
| 2640 | fn | summarizeCountsFromData | (private) | `function summarizeCountsFromData(data) {` |
| 2689 | fn | bundleHasProject | (private) | `function bundleHasProject(bundle) {` |
| 2789 | fn | hasAnyRestoreRehearsalKeys | (private) | `function hasAnyRestoreRehearsalKeys(source, key...` |
| 2801 | fn | looksLikeRestoreRehearsalProjectBundle | (private) | `function looksLikeRestoreRehearsalProjectBundle...` |
| 2817 | fn | looksLikeRestoreRehearsalBackupPayload | (private) | `function looksLikeRestoreRehearsalBackupPayload...` |
| 2833 | fn | summarizeProjectBundle | (private) | `function summarizeProjectBundle(bundle) {` |
| 2854 | fn | getRestoreRehearsalLiveCounts | (private) | `function getRestoreRehearsalLiveCounts() {` |
| 2858 | fn | getSelectedRestoreRehearsalMode | (private) | `function getSelectedRestoreRehearsalMode() {` |
| 2867 | fn | buildRestoreRehearsalRows | (private) | `function buildRestoreRehearsalRows(liveCounts, ...` |
| 2892 | fn | normalizeRestoreRehearsalScenarioLogic | (private) | `function normalizeRestoreRehearsalScenarioLogic...` |
| 2908 | fn | normalizeRestoreRehearsalScenarioMultiplier | (private) | `function normalizeRestoreRehearsalScenarioMulti...` |
| 2923 | fn | normalizeRestoreRehearsalRuleItems | (private) | `function normalizeRestoreRehearsalRuleItems(ite...` |
| 2991 | fn | formatRestoreRehearsalRuleItem | (private) | `function formatRestoreRehearsalRuleItem(item) {` |
| 3012 | fn | normalizeRestoreRehearsalRule | (private) | `function normalizeRestoreRehearsalRule(rule, in...` |
| 3070 | fn | normalizeRestoreRehearsalRules | (private) | `function normalizeRestoreRehearsalRules(value) {` |
| 3079 | fn | indexRestoreRehearsalRules | (private) | `function indexRestoreRehearsalRules(rules) {` |
| 3095 | fn | buildRestoreRehearsalRuleDiff | (private) | `function buildRestoreRehearsalRuleDiff(liveRule...` |
| 3162 | fn | formatRestoreRehearsalRuleScenarioLines | (private) | `function formatRestoreRehearsalRuleScenarioLine...` |
| 3202 | fn | createRestoreRehearsalRuleList | (private) | `function createRestoreRehearsalRuleList(entries...` |
| 3221 | fn | createRestoreRehearsalRuleSection | (private) | `function createRestoreRehearsalRuleSection(labe...` |
| 3231 | fn | createRestoreRehearsalRuleColumn | (private) | `function createRestoreRehearsalRuleColumn(title...` |
| 3254 | fn | renderRestoreRehearsalRuleDiff | (private) | `function renderRestoreRehearsalRuleDiff(differe...` |
| 3315 | fn | getRestoreRehearsalLiveSnapshot | (private) | `function getRestoreRehearsalLiveSnapshot() {` |
| 3323 | fn | resetRestoreRehearsalState | (private) | `function resetRestoreRehearsalState() {` |
| 3366 | fn | openRestoreRehearsal | (private) | `function openRestoreRehearsal() {` |
| 3376 | fn | closeRestoreRehearsal | (private) | `function closeRestoreRehearsal() {` |
| 3382 | fn | readFileAsText | (private) | `function readFileAsText(file) {` |
| 3410 | fn | formatRestoreRehearsalSummary | (private) | `function formatRestoreRehearsalSummary(rows) {` |
| 3427 | fn | applyRestoreRehearsalDifferenceCell | (private) | `function applyRestoreRehearsalDifferenceCell(ce...` |
| 3449 | fn | renderRestoreRehearsalResults | (private) | `function renderRestoreRehearsalResults(rows, ru...` |
| 3477 | fn | countRestoreRehearsalDeviceEntries | (private) | `function countRestoreRehearsalDeviceEntries(dev...` |
| 3519 | fn | countRestoreRehearsalFeedbackDrafts | (private) | `function countRestoreRehearsalFeedbackDrafts(fe...` |
| 3539 | fn | runRestoreRehearsal | (private) | `function runRestoreRehearsal(file) {` |
| 3646 | fn | handleRestoreRehearsalProceed | (private) | `function handleRestoreRehearsalProceed() {` |
| 3679 | fn | handleRestoreRehearsalAbort | (private) | `function handleRestoreRehearsalAbort() {` |
| 3692 | fn | saveCurrentSession | (private) | `function saveCurrentSession() {` |
| 3737 | fn | autoSaveCurrentSetup | (private) | `function autoSaveCurrentSetup() {` |
| 3794 | fn | notifyAutoBackupChange | (private) | `function notifyAutoBackupChange(details) {` |
| 3805 | fn | setProjectAutoSaveOverrides | (private) | `function setProjectAutoSaveOverrides(overrides) {` |
| 3828 | fn | getProjectAutoSaveOverrides | (private) | `function getProjectAutoSaveOverrides() {` |
| 3831 | fn | clearProjectAutoSaveOverrides | (private) | `function clearProjectAutoSaveOverrides() {` |
| 3834 | fn | getProjectAutoSaveDelay | (private) | `function getProjectAutoSaveDelay() {` |
| 3841 | fn | runProjectAutoSave | (private) | `function runProjectAutoSave() {` |
| 3942 | fn | scheduleProjectAutoSave | (private) | `function scheduleProjectAutoSave() {` |
| 4170 | fn | setSelectValue | (private) | `function setSelectValue(select, value) {` |
| 4227 | fn | resetSelectsToNone | (private) | `function resetSelectsToNone(selects) {` |
| 4251 | fn | restoreSessionState | (private) | `function restoreSessionState() {` |
| 4489 | fn | ensureImportedProjectBaseNameSession | (private) | `function ensureImportedProjectBaseNameSession(r...` |
| 4504 | fn | resolveImportedProjectNamingContextSession | (private) | `function resolveImportedProjectNamingContextSes...` |
| 4530 | fn | generateUniqueImportedProjectNameSession | (private) | `function generateUniqueImportedProjectNameSessi...` |
| 4554 | fn | persistImportedProjectWithFallback | (private) | `function persistImportedProjectWithFallback(pay...` |
| 4594 | fn | clearOwnedGearExportArtifacts | (private) | `function clearOwnedGearExportArtifacts(element) {` |
| 4606 | fn | applyImportedOwnedGearMarkers | (private) | `function applyImportedOwnedGearMarkers(markers) {` |
| 4681 | fn | mergeSharedContactsIntoCache | (private) | `function mergeSharedContactsIntoCache(sharedCon...` |
| 4816 | fn | resolveProjectNameCollisionForImport | (private) | `function resolveProjectNameCollisionForImport(b...` |
| 4868 | fn | applySharedSetup | (private) | `function applySharedSetup(shared) {` |
| 5103 | fn | getQueryParam | (private) | `function getQueryParam(search, key) {` |
| 5162 | fn | buildSearchWithoutShared | (private) | `function buildSearchWithoutShared(search) {` |
| 5204 | fn | removeSharedQueryParamFromLocation | (private) | `function removeSharedQueryParamFromLocation() {` |
| 5244 | fn | applySharedSetupFromUrl | (private) | `function applySharedSetupFromUrl() {` |
| 5264 | fn | getTrackedPowerSelects | (private) | `function getTrackedPowerSelects() {` |
| 5269 | fn | getTrackedPowerSelectsWithSetup | (private) | `function getTrackedPowerSelectsWithSetup() {` |
| 5278 | fn | forEachTrackedSelect | (private) | `function forEachTrackedSelect(collection, handl...` |
| 5454 | fn | flushProjectAutoSaveOnExit | (private) | `function flushProjectAutoSaveOnExit(eventOrOpti...` |
| 5561 | fn | clonePinkModeSupportArgs | (private) | `function clonePinkModeSupportArgs(args) {` |
| 5572 | fn | invokePinkModeSupport | (private) | `function invokePinkModeSupport(methodName, args...` |
| 5589 | fn | flushPendingPinkModeSupportCalls | (private) | `function flushPendingPinkModeSupportCalls() {` |
| 5610 | fn | schedulePinkModeSupportFlush | (private) | `function schedulePinkModeSupportFlush() {` |
| 5617 | fn | enqueuePinkModeSupportCall | (private) | `function enqueuePinkModeSupportCall(methodName,...` |
| 5628 | fn | callPinkModeSupport | (private) | `function callPinkModeSupport(methodName, args, ...` |
| 5691 | fn | clearAppearanceModuleUnavailableWarning | (private) | `function clearAppearanceModuleUnavailableWarnin...` |
| 5702 | fn | warnAppearanceModuleUnavailable | (private) | `function warnAppearanceModuleUnavailable() {` |
| 5710 | fn | scheduleAppearanceModuleUnavailableWarning | (private) | `function scheduleAppearanceModuleUnavailableWar...` |
| 5759 | fn | clearAccentColorOverrides | (private) | `function clearAccentColorOverrides() {` |
| 5772 | fn | applyAccentColor | (private) | `function applyAccentColor(_x) {` |
| 5785 | fn | updateAccentColorResetButtonState | (private) | `function updateAccentColorResetButtonState() {` |
| 5798 | fn | refreshDarkModeAccentBoost | (private) | `function refreshDarkModeAccentBoost(_x2) {` |
| 5811 | fn | isHighContrastActive | (private) | `function isHighContrastActive() {` |
| 5874 | fn | getSafeLocalStorage | (private) | `function getSafeLocalStorage() {` |
| 5892 | fn | resolveSafeLocalStorage | (private) | `function resolveSafeLocalStorage() {` |
| 5969 | fn | detectSystemThemePreference | (private) | `function detectSystemThemePreference() {` |
| 5982 | fn | buildThemePreferenceController | (private) | `function buildThemePreferenceController(module) {` |
| 5997 | fn | buildPinkModePreferenceController | (private) | `function buildPinkModePreferenceController(modu...` |
| 6010 | fn | applyAppearanceModuleBindings | (private) | `function applyAppearanceModuleBindings(module) {` |
| 6158 | fn | initializeAppearanceModule | (private) | `function initializeAppearanceModule(factory) {` |
| 6176 | fn | attemptAppearanceModuleInitialization | (private) | `function attemptAppearanceModuleInitialization(...` |
| 6271 | fn | normalizeCameraColorValue | (private) | `function normalizeCameraColorValue(value) {` |
| 6287 | fn | generateDefaultCameraColor | (private) | `function generateDefaultCameraColor(letter) {` |
| 6308 | fn | getDefaultCameraLetterColors | (private) | `function getDefaultCameraLetterColors() {` |
| 6323 | fn | loadCameraLetterColors | (private) | `function loadCameraLetterColors() {` |
| 6357 | fn | getCameraLetterColorsSafeSession | (private) | `function getCameraLetterColorsSafeSession() {` |
| 6361 | fn | applyCameraLetterColors | (private) | `function applyCameraLetterColors() {` |
| 6391 | fn | getCameraColorInputElements | (private) | `function getCameraColorInputElements() {` |
| 6410 | fn | updateCameraColorInputsFromState | (private) | `function updateCameraColorInputsFromState() {` |
| 6422 | fn | collectCameraColorInputValues | (private) | `function collectCameraColorInputValues() {` |
| 7658 | fn | showNotification | (private) | `function showNotification(type, message) {` |
| 8155 | fn | getDiffText | (private) | `function getDiffText(key) {` |
| 8187 | fn | formatTimestampForComparison | (private) | `function formatTimestampForComparison(date, inc...` |
| 8217 | fn | formatComparisonOptionLabel | (private) | `function formatComparisonOptionLabel(name, pars...` |
| 8231 | fn | collectBackupDiffOptions | (private) | `function collectBackupDiffOptions() {` |
| 8278 | fn | fillBackupDiffSelect | (private) | `function fillBackupDiffSelect(select, options, ...` |
| 8305 | fn | clearBackupDiffResults | (private) | `function clearBackupDiffResults() {` |
| 8313 | fn | fallbackHumanizeDiffKey | (private) | `function fallbackHumanizeDiffKey(key) {` |
| 8332 | fn | humanizeDiffKey | (private) | `function humanizeDiffKey(key) {` |
| 8354 | fn | isDiffComparablePrimitive | (private) | `function isDiffComparablePrimitive(value) {` |
| 8361 | fn | arrayHasOnlyComparablePrimitives | (private) | `function arrayHasOnlyComparablePrimitives(array) {` |
| 8372 | fn | createPrimitiveDiffKey | (private) | `function createPrimitiveDiffKey(value) {` |
| 8393 | fn | buildPrimitiveDiffIndex | (private) | `function buildPrimitiveDiffIndex(array) {` |
| 8415 | fn | formatPrimitiveDiffPathValue | (private) | `function formatPrimitiveDiffPathValue(value) {` |
| 8429 | fn | createKeyedDiffPathSegment | (private) | `function createKeyedDiffPathSegment(keyName, ke...` |
| 8444 | fn | parseKeyedDiffPathSegment | (private) | `function parseKeyedDiffPathSegment(segment) {` |
| 8467 | fn | findArrayComparisonKey | (private) | `function findArrayComparisonKey(baseArray, comp...` |
| 8524 | fn | buildArrayKeyIndex | (private) | `function buildArrayKeyIndex(array, keyName) {` |
| 8559 | fn | formatDiffListIndex | (private) | `function formatDiffListIndex(part) {` |
| 8605 | fn | formatDiffPathSegment | (private) | `function formatDiffPathSegment(part) {` |
| 8615 | fn | formatDiffPath | (private) | `function formatDiffPath(parts) {` |
| 8621 | fn | valuesEqual | (private) | `function valuesEqual(a, b) {` |
| 8625 | fn | computeSetupDiff | (private) | `function computeSetupDiff(baseline, comparison) {` |
| 8627 | fn | walk | (private) | `function walk(baseValue, compareValue, path) {` |
| 8807 | fn | createDiffValueElement | (private) | `function createDiffValueElement(value, variant) {` |
| 8837 | fn | createDiffChangeBlock | (private) | `function createDiffChangeBlock(labelText, value...` |
| 8850 | fn | createDiffStatusBadge | (private) | `function createDiffStatusBadge(type) {` |
| 8873 | fn | sortDiffEntries | (private) | `function sortDiffEntries(entries) {` |
| 8900 | fn | renderBackupDiffEntries | (private) | `function renderBackupDiffEntries(entries) {` |
| 8947 | fn | formatDiffCount | (private) | `function formatDiffCount(count) {` |
| 8952 | fn | formatDiffDetail | (private) | `function formatDiffDetail(key, count) {` |
| 8956 | fn | updateBackupDiffSummary | (private) | `function updateBackupDiffSummary(entries) {` |
| 8987 | fn | renderBackupDiff | (private) | `function renderBackupDiff() {` |
| 9029 | fn | populateBackupDiffSelectors | (private) | `function populateBackupDiffSelectors() {` |
| 9044 | fn | collapseBackupDiffSection | (private) | `function collapseBackupDiffSection() {` |
| 9063 | fn | showBackupDiffSection | (private) | `function showBackupDiffSection() {` |
| 9082 | fn | handleBackupDiffToggle | (private) | `function handleBackupDiffToggle() {` |
| 9092 | fn | handleBackupDiffSelectionChange | (private) | `function handleBackupDiffSelectionChange(event) {` |
| 9105 | fn | getComparisonEntryType | (private) | `function getComparisonEntryType(name) {` |
| 9117 | fn | cloneValueForExport | (private) | `function cloneValueForExport(value) {` |
| 9128 | fn | handleBackupDiffExport | (private) | `function handleBackupDiffExport() {` |
| 9215 | fn | applyPreferencesFromStorage | (private) | `function applyPreferencesFromStorage(safeGetIte...` |
| 9384 | fn | captureSetupSelection | (private) | `function captureSetupSelection() {` |
| 9390 | fn | restoreSetupSelection | (private) | `function restoreSetupSelection(previousSelectio...` |
| 9562 | fn | describeError | (private) | `function describeError(error) {` |
| 9584 | fn | recordDiagnostic | (private) | `function recordDiagnostic(diagnostics, section,...` |
| 9604 | fn | applyBackupFallbacks | (private) | `function applyBackupFallbacks(target, diagnosti...` |
| 9642 | fn | mergeAutoGearRuleLists | (private) | `function mergeAutoGearRuleLists(primary, second...` |
| 9673 | fn | collectFullBackupData | (private) | `function collectFullBackupData() {` |
| 9779 | fn | buildSettingsBackupPackage | (private) | `function buildSettingsBackupPackage() {` |
| 9810 | fn | performSettingsBackup | (private) | `function performSettingsBackup() {` |
| 9871 | fn | createSettingsBackup | (private) | `function createSettingsBackup() {` |
| 9918 | fn | logStoragePersistenceEstimateUpdate | (private) | `function logStoragePersistenceEstimateUpdate() {` |
| 9990 | fn | getLoggingLangInfo | (private) | `function getLoggingLangInfo() {` |
| 10000 | fn | setLoggingStatusKey | (private) | `function setLoggingStatusKey(key) {` |
| 10019 | fn | scheduleLoggingStatusReset | (private) | `function scheduleLoggingStatusReset() {` |
| 10040 | fn | resolveLoggingApi | (private) | `function resolveLoggingApi() {` |
| 10066 | fn | detachLoggingSubscriptions | (private) | `function detachLoggingSubscriptions() {` |
| 10084 | fn | setLoggingControlsDisabled | (private) | `function setLoggingControlsDisabled(disabled) {` |
| 10096 | fn | formatLogDetailValue | (private) | `function formatLogDetailValue(value) {` |
| 10109 | fn | formatLogTimestamp | (private) | `function formatLogTimestamp(entry, langTexts, f...` |
| 10139 | fn | createLogDetailsElement | (private) | `function createLogDetailsElement(label, value) {` |
| 10151 | fn | sanitizeLoggingFileSegment | (private) | `function sanitizeLoggingFileSegment(segment) {` |
| 10161 | fn | buildLoggingExportMetadata | (private) | `function buildLoggingExportMetadata() {` |
| 10202 | fn | cloneLoggingExportValue | (private) | `function cloneLoggingExportValue(value) {` |
| 10221 | fn | exportLoggingHistory | (private) | `function exportLoggingHistory() {` |
| 10354 | fn | renderLoggingHistory | (private) | `function renderLoggingHistory() {` |
| 10506 | fn | scheduleLoggingRender | (private) | `function scheduleLoggingRender() {` |
| 10523 | fn | applyLoggingConfig | (private) | `function applyLoggingConfig(config) {` |
| 10549 | fn | sanitizeLoggingConfigPartial | (private) | `function sanitizeLoggingConfigPartial(partial) {` |
| 10598 | fn | updateLoggingConfig | (private) | `function updateLoggingConfig(partial) {` |
| 10616 | fn | attachLoggingSubscriptions | (private) | `function attachLoggingSubscriptions() {` |
| 10674 | fn | initializeLoggingPanel | (private) | `function initializeLoggingPanel() {` |
| 10769 | fn | getStoragePersistenceLangInfo | (private) | `function getStoragePersistenceLangInfo() {` |
| 10779 | fn | getStorageManagerInstance | (private) | `function getStorageManagerInstance() {` |
| 10785 | fn | formatStoragePersistenceBytes | (private) | `function formatStoragePersistenceBytes(bytes, l...` |
| 10812 | fn | renderStoragePersistenceStatus | (private) | `function renderStoragePersistenceStatus() {` |
| 10918 | fn | isSafariPersistenceIncompatibility | (private) | `function isSafariPersistenceIncompatibility() {` |
| 10958 | fn | refreshStoragePersistenceStatus | (private) | `function refreshStoragePersistenceStatus() {` |
| 10961 | fn | _refreshStoragePersistenceStatus | (private) | `function _refreshStoragePersistenceStatus() {` |
| 11085 | fn | handleStoragePersistenceRequest | (private) | `function handleStoragePersistenceRequest(_x3) {` |
| 11088 | fn | _handleStoragePersistenceRequest | (private) | `function _handleStoragePersistenceRequest() {` |
| 11242 | fn | handleRestoreSettingsClick | (private) | `function handleRestoreSettingsClick() {` |
| 11247 | fn | handleRestoreSettingsInputChange | (private) | `function handleRestoreSettingsInputChange() {` |
| 11608 | fn | getSessionLanguageTexts | (private) | `function getSessionLanguageTexts() {` |
| 11619 | fn | registerSessionCineUiInternal | (private) | `function registerSessionCineUiInternal(cineUi) {` |
| 11664 | fn | registerSessionCineUi | (private) | `function registerSessionCineUi() {` |
| 11717 | fn | resetPlannerStateAfterFactoryReset | (private) | `function resetPlannerStateAfterFactoryReset() {` |
| 12309 | fn | onConfirm | (private) | `function onConfirm() {` |
| 12320 | fn | collectFallbackUiCacheStorages | (private) | `function collectFallbackUiCacheStorages() {` |
| 12417 | fn | clearUiCacheEntriesFallback | (private) | `function clearUiCacheEntriesFallback() {` |
| 12443 | fn | resolveCineCacheNameForReload | (private) | `function resolveCineCacheNameForReload() {` |
| 12461 | fn | isRelevantCacheKeyForReload | (private) | `function isRelevantCacheKeyForReload(key, expli...` |
| 12476 | fn | readLocationHrefSafe | (private) | `function readLocationHrefSafe(locationLike) {` |
| 12488 | fn | readLocationPathnameSafe | (private) | `function readLocationPathnameSafe(locationLike) {` |
| 12500 | fn | readLocationOriginSafe | (private) | `function readLocationOriginSafe(locationLike) {` |
| 12526 | fn | getForceReloadBaseCandidates | (private) | `function getForceReloadBaseCandidates(locationL...` |
| 12563 | fn | normaliseForceReloadHref | (private) | `function normaliseForceReloadHref(value, baseHr...` |
| 12587 | fn | buildForceReloadHref | (private) | `function buildForceReloadHref(locationLike, par...` |
| 12657 | fn | waitForReloadNavigation | (private) | `function waitForReloadNavigation(beforeHref) {` |
| 12756 | fn | scheduleForceReloadNavigationWarning | (private) | `function scheduleForceReloadNavigationWarning(l...` |
| 12825 | fn | attemptForceReloadNavigation | (private) | `function attemptForceReloadNavigation(locationL...` |
| 12849 | fn | attemptForceReloadHistoryFallback | (private) | `function attemptForceReloadHistoryFallback(win,...` |
| 12908 | fn | scheduleForceReloadFallbacks | (private) | `function scheduleForceReloadFallbacks(win, loca...` |
| 13006 | fn | prepareForceReloadContext | (private) | `function prepareForceReloadContext(win) {` |
| 13031 | fn | executeForceReloadContext | (private) | `function executeForceReloadContext(context) {` |
| 13083 | fn | tryForceReload | (private) | `function tryForceReload(win) {` |
| 13090 | fn | createReloadFallback | (private) | `function createReloadFallback(win) {` |
| 13172 | fn | awaitPromiseWithSoftTimeout | (private) | `function awaitPromiseWithSoftTimeout(promise, t...` |
| 13251 | fn | observeServiceWorkerControllerChangeForSession | (private) | `function observeServiceWorkerControllerChangeFo...` |
| 13346 | fn | collectServiceWorkerRegistrationsForReload | (private) | `function collectServiceWorkerRegistrationsForRe...` |
| 13349 | fn | _collectServiceWorkerRegistrationsForReload | (private) | `function _collectServiceWorkerRegistrationsForR...` |
| 13424 | fn | clearCachesAndReload | (private) | `function clearCachesAndReload() {` |
| 13427 | fn | _clearCachesAndReload | (private) | `function _clearCachesAndReload() {` |
| 13689 | fn | exportDiagramSvg | (private) | `function exportDiagramSvg() {` |
| 13711 | fn | copyTextToClipboardBestEffort | (private) | `function copyTextToClipboardBestEffort(text) {` |
| 13764 | fn | handleDownloadDiagramClick | (private) | `function handleDownloadDiagramClick(e) {` |
| 13815 | fn | handleGridSnapClick | (private) | `function handleGridSnapClick() {` |
| 16130 | fn | safeShowPicker | (private) | `function safeShowPicker(input) {` |
| 16238 | fn | registerRequiredScenarioOptionEntriesGetter | (private) | `function registerRequiredScenarioOptionEntriesG...` |
| 16263 | fn | getRequiredScenarioOptionEntries | (private) | `function getRequiredScenarioOptionEntries() {` |
| 16300 | fn | updateRequiredScenariosSummary | (private) | `function updateRequiredScenariosSummary() {` |
| 16378 | fn | initApp | (private) | `function initApp() {` |
| 16509 | fn | ensureFeedbackTemperatureOptionsSafe | (private) | `function ensureFeedbackTemperatureOptionsSafe(s...` |
| 16542 | fn | updateFeedbackTemperatureOptionsSafe | (private) | `function updateFeedbackTemperatureOptionsSafe() {` |
| 16560 | fn | schedulePostRenderTask | (private) | `function schedulePostRenderTask(task) {` |
| 16590 | fn | populateEnvironmentDropdowns | (private) | `function populateEnvironmentDropdowns() {` |
| 16608 | fn | populateLensDropdown | (private) | `function populateLensDropdown() {` |
| 16827 | fn | populateCameraPropertyDropdown | (private) | `function populateCameraPropertyDropdown(selectI...` |
| 16853 | fn | populateRecordingResolutionDropdown | (private) | `function populateRecordingResolutionDropdown() {` |
| 16872 | fn | formatFrameRateValue | (private) | `function formatFrameRateValue(value) {` |
| 16881 | fn | tokenizeFrameRateContext | (private) | `function tokenizeFrameRateContext(value) {` |
| 16937 | fn | normalizeMatchTarget | (private) | `function normalizeMatchTarget(value) {` |
| 16943 | fn | includePreferredValuesForRange | (private) | `function includePreferredValuesForRange(minValu...` |
| 16958 | fn | parseFrameRateNumericValues | (private) | `function parseFrameRateNumericValues(entry) {` |
| 17007 | fn | normalizeRecordingFrameRateValue | (private) | `function normalizeRecordingFrameRateValue(value) {` |
| 17020 | fn | buildFrameRateSuggestions | (private) | `function buildFrameRateSuggestions(entries, con...` |
| 17092 | fn | findMaxFrameRateForSensor | (private) | `function findMaxFrameRateForSensor(entries, sen...` |
| 17168 | fn | getFrameRateInputValue | (private) | `function getFrameRateInputValue(input) {` |
| 17173 | fn | getCurrentFrameRateInputValue | (private) | `function getCurrentFrameRateInputValue() {` |
| 17176 | fn | collectFrameRateContextTokens | (private) | `function collectFrameRateContextTokens(select) {` |
| 17190 | fn | populateFrameRateDropdownFor | (private) | `function populateFrameRateDropdownFor() {` |
| 17328 | fn | populateFrameRateDropdown | (private) | `function populateFrameRateDropdown() {` |
| 17349 | fn | populateSlowMotionFrameRateDropdown | (private) | `function populateSlowMotionFrameRateDropdown() {` |
| 17371 | fn | populateSlowMotionRecordingResolutionDropdown | (private) | `function populateSlowMotionRecordingResolutionD...` |
| 17375 | fn | populateSlowMotionSensorModeDropdown | (private) | `function populateSlowMotionSensorModeDropdown() {` |
| 17379 | fn | populateSensorModeDropdown | (private) | `function populateSensorModeDropdown() {` |
| 17383 | fn | populateCodecDropdown | (private) | `function populateCodecDropdown() {` |
| 17387 | fn | populateFilterDropdown | (private) | `function populateFilterDropdown() {` |
| 17422 | fn | getFilterValueConfig | (private) | `function getFilterValueConfig(type) {` |
| 17454 | fn | createFilterSizeSelect | (private) | `function createFilterSizeSelect(type) {` |
| 17476 | fn | createFilterValueSelect | (private) | `function createFilterValueSelect(type, selected) {` |
| 17563 | fn | resolveFilterDisplayInfo | (private) | `function resolveFilterDisplayInfo(type) {` |
| 17626 | fn | buildFilterGearEntries | (private) | `function buildFilterGearEntries() {` |
| 17745 | fn | updateGearListFilterEntries | (private) | `function updateGearListFilterEntries() {` |
| 17767 | fn | getGearListFilterDetailsContainer | (private) | `function getGearListFilterDetailsContainer() {` |
| 17770 | fn | filterTypeNeedsValueSelect | (private) | `function filterTypeNeedsValueSelect(type) {` |
| 17773 | fn | createFilterStorageValueSelect | (private) | `function createFilterStorageValueSelect(type, s...` |
| 17797 | fn | resolveFilterDetailsStorageElement | (private) | `function resolveFilterDetailsStorageElement() {` |
| 17815 | fn | renderFilterDetailsStorage | (private) | `function renderFilterDetailsStorage(details) {` |
| 17844 | fn | resolveGlobalScope | (private) | `function resolveGlobalScope() {` |
| 17851 | fn | ensureFilterDetailEditButton | (private) | `function ensureFilterDetailEditButton(element) {` |
| 17895 | fn | renderGearListFilterDetails | (private) | `function renderGearListFilterDetails(details) {` |
| 18007 | fn | syncGearListFilterSize | (private) | `function syncGearListFilterSize(storageId, valu...` |
| 18018 | fn | syncGearListFilterValue | (private) | `function syncGearListFilterValue(storageId, val...` |
| 18041 | fn | renderFilterDetails | (private) | `function renderFilterDetails(providedTokens) {` |
| 18119 | fn | handleFilterDetailChange | (private) | `function handleFilterDetailChange() {` |
| 18130 | fn | collectFilterSelections | (private) | `function collectFilterSelections() {` |
| 18196 | fn | parseFilterTokens | (private) | `function parseFilterTokens(str) {` |
| 18224 | fn | applyFilterSelectionsToGearList | (private) | `function applyFilterSelectionsToGearList() {` |
| 18233 | fn | normalizeGearNameForComparison | (private) | `function normalizeGearNameForComparison(name) {` |
| 18247 | fn | buildFilterSelectHtml | (private) | `function buildFilterSelectHtml() {` |
| 18250 | fn | collectFilterAccessories | (private) | `function collectFilterAccessories() {` |
| 18326 | fn | populateUserButtonDropdowns | (private) | `function populateUserButtonDropdowns() {` |
| 18635 | fn | fallbackParseVoltageValue | (private) | `function fallbackParseVoltageValue(value, fallb...` |
| 18660 | fn | resolveSupportedMountVoltageTypes | (private) | `function resolveSupportedMountVoltageTypes() {` |
| 18677 | fn | cloneMountVoltageDefaultsForSession | (private) | `function cloneMountVoltageDefaultsForSession() {` |
| 18711 | fn | getSessionMountVoltagePreferencesClone | (private) | `function getSessionMountVoltagePreferencesClone...` |
| 18727 | fn | applySessionMountVoltagePreferences | (private) | `function applySessionMountVoltagePreferences(pr...` |
| 18751 | fn | collectMountVoltageFormValues | (private) | `function collectMountVoltageFormValues() {` |
| 18787 | fn | handleMountVoltageInputChange | (private) | `function handleMountVoltageInputChange() {` |

