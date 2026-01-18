# src/scripts/core/app-session.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 21782
- **Language:** JavaScript
- **Symbols:** 615
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 522 | fn | getSessionCloneScope | (private) | `function getSessionCloneScope() {` |
| 547 | fn | resolveSessionRuntimeFunction | (private) | `function resolveSessionRuntimeFunction(name) {` |
| 554 | fn | enqueue | (private) | `const enqueue = (scope) => {` |
| 616 | fn | isNavigatorExplicitlyOffline | (private) | `function isNavigatorExplicitlyOffline(navigator...` |
| 632 | fn | resolveForceReloadOfflineNotice | (private) | `function resolveForceReloadOfflineNotice() {` |
| 691 | fn | announceForceReloadOfflineNotice | (private) | `function announceForceReloadOfflineNotice() {` |
| 808 | fn | safeGetCurrentProjectName | (private) | `function safeGetCurrentProjectName(defaultValue...` |
| 832 | fn | normalizeProjectStorageRevisionValue | (private) | `function normalizeProjectStorageRevisionValue(v...` |
| 865 | fn | resolveProjectStorageRevisionKeyName | (private) | `function resolveProjectStorageRevisionKeyName() {` |
| 882 | fn | readProjectStorageRevisionValue | (private) | `function readProjectStorageRevisionValue() {` |
| 901 | fn | resolveActiveProjectStorageKey | (private) | `function resolveActiveProjectStorageKey() {` |
| 941 | fn | reloadActiveProjectFromStorage | (private) | `function reloadActiveProjectFromStorage(options...` |
| 1083 | fn | regenerateGearList | (private) | `const regenerateGearList = (info) => callSessio...` |
| 1152 | fn | scheduleProjectStorageSync | (private) | `function scheduleProjectStorageSync(options = {...` |
| 1202 | fn | resolveSetLanguageFn | (private) | `function resolveSetLanguageFn() {` |
| 1206 | fn | applySetLanguage | (private) | `function applySetLanguage(languageCode, options...` |
| 1227 | fn | sessionJsonDeepClone | (private) | `function sessionJsonDeepClone(value) {` |
| 1244 | fn | sessionResolveStructuredClone | (private) | `function sessionResolveStructuredClone(scope) {` |
| 1283 | fn | sessionCreateResilientDeepClone | (private) | `function sessionCreateResilientDeepClone(scope) {` |
| 1355 | fn | resolveMissingMountVoltageWarnings | (private) | `function resolveMissingMountVoltageWarnings() {` |
| 1398 | fn | warnMissingMountVoltageHelper | (private) | `function warnMissingMountVoltageHelper(helperNa...` |
| 1418 | fn | ensureSessionRuntimePlaceholder | (private) | `function ensureSessionRuntimePlaceholder(name, ...` |
| 1451 | fn | detectPrimaryGlobalScope | (private) | `function detectPrimaryGlobalScope() {` |
| 1467 | fn | whenGlobalValueAvailable | (private) | `function whenGlobalValueAvailable(name, validat...` |
| 1484 | fn | invokeResolve | (private) | - |
| 1494 | fn | attempt | (private) | - |
| 1502 | fn | initialCandidate | (private) | `const initialCandidate = (() => {` |
| 1521 | fn | clearTimers | (private) | `const clearTimers = () => {` |
| 1533 | fn | handleTimeout | (private) | `const handleTimeout = () => {` |
| 1545 | fn | poll | (private) | `const poll = () => {` |
| 1583 | fn | getSessionRuntimeScopes | (private) | `function getSessionRuntimeScopes() {` |
| 1586 | fn | addScope | (private) | - |
| 1611 | fn | resolveModuleApi | (private) | `function resolveModuleApi(name, validator) {` |
| 1621 | fn | enqueueScope | (private) | - |
| 1658 | fn | checkCandidate | (private) | - |
| 1672 | fn | tryResolveFromScope | (private) | - |
| 1761 | fn | normalizeVersionValue | (private) | `function normalizeVersionValue(value) {` |
| 1769 | fn | resolveKnownAppVersion | (private) | `function resolveKnownAppVersion(explicitVersion) {` |
| 1789 | fn | enqueueCandidate | (private) | - |
| 1941 | fn | resolveMountVoltageNamespace | (private) | `function resolveMountVoltageNamespace() {` |
| 1962 | fn | resolveMountVoltageRuntimeExports | (private) | `function resolveMountVoltageRuntimeExports() {` |
| 1983 | fn | getSessionRuntimeFunction | (private) | `function getSessionRuntimeFunction(name) {` |
| 2017 | fn | resolveSettingsLoggingResolver | (private) | `function resolveSettingsLoggingResolver() {` |
| 2049 | fn | resolveLegacySettingsLogger | (private) | `function resolveLegacySettingsLogger() {` |
| 2082 | fn | settingsLogger | (private) | `const settingsLogger = (() => {` |
| 2098 | fn | logSettingsEvent | (private) | `function logSettingsEvent(level, message, detai...` |
| 2136 | fn | prepareSettingsOpenContext | (private) | `function prepareSettingsOpenContext(context) {` |
| 2144 | fn | consumeSettingsOpenContext | (private) | `function consumeSettingsOpenContext(defaultCont...` |
| 2156 | fn | resolveSettingsDialog | (private) | `function resolveSettingsDialog() {` |
| 2170 | fn | resolveSettingsButton | (private) | `function resolveSettingsButton() {` |
| 2184 | fn | ensureDeferredScriptsLoaded | (private) | `function ensureDeferredScriptsLoaded(reason) {` |
| 2216 | fn | ensureOnboardingTourReady | (private) | `function ensureOnboardingTourReady(reason) {` |
| 2249 | fn | requestSettingsOpen | (private) | `function requestSettingsOpen(context) {` |
| 2281 | fn | resolveCompatibilityTexts | (private) | `function resolveCompatibilityTexts(langTexts, f...` |
| 2291 | fn | ensureMeaningfulValue | (private) | `function ensureMeaningfulValue(value) {` |
| 2315 | fn | getFormatter | (private) | `const getFormatter = (lang, hasFraction) => {` |
| 2450 | fn | humanizeRestoreSectionKey | (private) | `function humanizeRestoreSectionKey(key) {` |
| 2467 | fn | evaluateRestoreCompatibilitySections | (private) | `function evaluateRestoreCompatibilitySections({...` |
| 2480 | fn | checkDataKey | (private) | `const checkDataKey = (key, bucket) => {` |
| 2516 | fn | describeMissingSections | (private) | `function describeMissingSections(label, items) {` |
| 2526 | fn | buildRestoreCompatibilityReport | (private) | `function buildRestoreCompatibilityReport(option...` |
| 2549 | fn | getText | (private) | `const getText = (key, fallback) => {` |
| 2688 | fn | invokeSessionRevertAccentColor | (private) | `function invokeSessionRevertAccentColor() {` |
| 2701 | fn | invokeSessionOpenAutoGearEditor | (private) | `function invokeSessionOpenAutoGearEditor(...arg...` |
| 2722 | fn | isPlainObjectFallback | (private) | - |
| 2756 | fn | resolveBaseMetrics | (private) | `const resolveBaseMetrics = () => {` |
| 2900 | fn | readGridSnapState | (private) | `const readGridSnapState = () => {` |
| 2946 | fn | writeGridSnapState | (private) | - |
| 3004 | fn | resolveDiagramContainer | (private) | `const resolveDiagramContainer = () => {` |
| 3022 | fn | applyGridSnapUiState | (private) | - |
| 3035 | fn | getGlobalCineUi | (private) | `function getGlobalCineUi() {` |
| 3056 | fn | isCineUiEntryRegistered | (private) | `function isCineUiEntryRegistered(registry, name) {` |
| 3081 | fn | registerCineUiEntries | (private) | `function registerCineUiEntries(registry, entrie...` |
| 3106 | fn | safeLoadStoredLogoPreview | (private) | `function safeLoadStoredLogoPreview() {` |
| 3118 | fn | areSessionEntriesRegistered | (private) | `function areSessionEntriesRegistered(cineUi) {` |
| 3140 | fn | enqueueCineUiRegistration | (private) | `function enqueueCineUiRegistration(callback) {` |
| 3189 | fn | resolvedDefaultAccentColor | (private) | `const resolvedDefaultAccentColor = (() => {` |
| 3210 | fn | resolvedHighContrastAccentColor | (private) | `const resolvedHighContrastAccentColor = (() => {` |
| 3223 | fn | resolvedAccentColor | (private) | `const resolvedAccentColor = (() => {` |
| 3325 | fn | resolveFilterSelectElement | (private) | `function resolveFilterSelectElement() {` |
| 3348 | fn | callSessionCoreFunction | (private) | `function callSessionCoreFunction(functionName, ...` |
| 3386 | fn | ensureSessionRuntimeFunction | (private) | `function ensureSessionRuntimeFunction(functionN...` |
| 3388 | fn | proxy | (private) | `const proxy = (...invocationArgs) => callSessio...` |
| 3435 | fn | getSessionCoreValue | (private) | `function getSessionCoreValue(functionName, opti...` |
| 3454 | fn | deriveSessionProjectInfo | (private) | `function deriveSessionProjectInfo(info) {` |
| 3474 | fn | normalizeTemperatureUnitValue | (private) | `function normalizeTemperatureUnitValue(value) {` |
| 3481 | fn | resolveInitialTemperatureUnit | (private) | `function resolveInitialTemperatureUnit() {` |
| 3502 | fn | resolveTemperatureUnitPreferenceController | (private) | `function resolveTemperatureUnitPreferenceContro...` |
| 3528 | fn | applyTemperatureUnitPreferenceWithFallback | (private) | `function applyTemperatureUnitPreferenceWithFall...` |
| 3607 | fn | recordFullBackupHistoryEntryFn | (private) | `let recordFullBackupHistoryEntryFn = () => { };` |
| 3608 | fn | ensureCriticalStorageBackupsFn | (private) | `let ensureCriticalStorageBackupsFn = () => ({ e...` |
| 3633 | fn | createBackupDiffRefs | (private) | `const createBackupDiffRefs = () => {` |
| 3691 | fn | createRestoreRehearsalRefs | (private) | `function createRestoreRehearsalRefs() {` |
| 3767 | fn | createEmptyRestoreRehearsalCounts | (private) | `function createEmptyRestoreRehearsalCounts() {` |
| 3774 | fn | countProjectsFromSetups | (private) | `function countProjectsFromSetups(setups) {` |
| 3787 | fn | countFavoritesEntries | (private) | `function countFavoritesEntries(favorites) {` |
| 3800 | fn | projectInfoValueHasData | (private) | `function projectInfoValueHasData(value) {` |
| 3814 | fn | countCrewEntries | (private) | `function countCrewEntries(value) {` |
| 3860 | fn | countScheduleEntries | (private) | `function countScheduleEntries(value) {` |
| 3892 | fn | summarizeProjectInfoStats | (private) | `function summarizeProjectInfoStats(projectInfo) {` |
| 3944 | fn | summarizeProjectCollection | (private) | `function summarizeProjectCollection(collection) {` |
| 3990 | fn | summarizeCountsFromData | (private) | `function summarizeCountsFromData(data) {` |
| 4052 | fn | bundleHasProject | (private) | `function bundleHasProject(bundle) {` |
| 4217 | fn | hasAnyRestoreRehearsalKeys | (private) | `function hasAnyRestoreRehearsalKeys(source, key...` |
| 4230 | fn | looksLikeRestoreRehearsalProjectBundle | (private) | `function looksLikeRestoreRehearsalProjectBundle...` |
| 4247 | fn | looksLikeRestoreRehearsalBackupPayload | (private) | `function looksLikeRestoreRehearsalBackupPayload...` |
| 4264 | fn | summarizeProjectBundle | (private) | `function summarizeProjectBundle(bundle) {` |
| 4286 | fn | getRestoreRehearsalLiveCounts | (private) | `function getRestoreRehearsalLiveCounts() {` |
| 4291 | fn | getSelectedRestoreRehearsalMode | (private) | `function getSelectedRestoreRehearsalMode() {` |
| 4299 | fn | buildRestoreRehearsalRows | (private) | `function buildRestoreRehearsalRows(liveCounts, ...` |
| 4322 | fn | normalizeRestoreRehearsalScenarioLogic | (private) | `function normalizeRestoreRehearsalScenarioLogic...` |
| 4339 | fn | normalizeRestoreRehearsalScenarioMultiplier | (private) | `function normalizeRestoreRehearsalScenarioMulti...` |
| 4355 | fn | normalizeRestoreRehearsalRuleItems | (private) | `function normalizeRestoreRehearsalRuleItems(ite...` |
| 4426 | fn | formatRestoreRehearsalRuleItem | (private) | `function formatRestoreRehearsalRuleItem(item) {` |
| 4450 | fn | normalizeRestoreRehearsalRule | (private) | `function normalizeRestoreRehearsalRule(rule, in...` |
| 4510 | fn | normalizeRestoreRehearsalRules | (private) | `function normalizeRestoreRehearsalRules(value, ...` |
| 4519 | fn | indexRestoreRehearsalRules | (private) | `function indexRestoreRehearsalRules(rules) {` |
| 4536 | fn | buildRestoreRehearsalRuleDiff | (private) | `function buildRestoreRehearsalRuleDiff(liveRule...` |
| 4606 | fn | formatRestoreRehearsalRuleScenarioLines | (private) | `function formatRestoreRehearsalRuleScenarioLine...` |
| 4669 | fn | createRestoreRehearsalRuleList | (private) | `function createRestoreRehearsalRuleList(entries...` |
| 4687 | fn | createRestoreRehearsalRuleSection | (private) | `function createRestoreRehearsalRuleSection(labe...` |
| 4698 | fn | createRestoreRehearsalRuleColumn | (private) | `function createRestoreRehearsalRuleColumn(title...` |
| 4739 | fn | renderRestoreRehearsalRuleDiff | (private) | `function renderRestoreRehearsalRuleDiff(differe...` |
| 4819 | fn | getRestoreRehearsalLiveSnapshot | (private) | `function getRestoreRehearsalLiveSnapshot() {` |
| 4828 | fn | resetRestoreRehearsalState | (private) | `function resetRestoreRehearsalState(options = {...` |
| 4867 | fn | openRestoreRehearsal | (private) | `function openRestoreRehearsal() {` |
| 4876 | fn | closeRestoreRehearsal | (private) | `function closeRestoreRehearsal() {` |
| 4883 | fn | readFileAsText | (private) | `function readFileAsText(file) {` |
| 4906 | fn | formatRestoreRehearsalSummary | (private) | `function formatRestoreRehearsalSummary(rows) {` |
| 4924 | fn | applyRestoreRehearsalDifferenceCell | (private) | `function applyRestoreRehearsalDifferenceCell(ce...` |
| 4947 | fn | renderRestoreRehearsalResults | (private) | `function renderRestoreRehearsalResults(rows, ru...` |
| 4980 | fn | countRestoreRehearsalDeviceEntries | (private) | `function countRestoreRehearsalDeviceEntries(dev...` |
| 4993 | fn | isEntryObject | (private) | `const isEntryObject = (value) => {` |
| 5000 | fn | fallbackCount | (private) | `const fallbackCount = (collection) => {` |
| 5021 | fn | countRestoreRehearsalFeedbackDrafts | (private) | `function countRestoreRehearsalFeedbackDrafts(fe...` |
| 5042 | fn | runRestoreRehearsal | (private) | `function runRestoreRehearsal(file) {` |
| 5146 | fn | handleRestoreRehearsalProceed | (private) | `function handleRestoreRehearsalProceed() {` |
| 5181 | fn | handleRestoreRehearsalAbort | (private) | `function handleRestoreRehearsalAbort() {` |
| 5194 | fn | saveCurrentSession | (private) | `function saveCurrentSession(options = {}) {` |
| 5247 | fn | autoSaveCurrentSetup | (private) | `function autoSaveCurrentSetup() {` |
| 5346 | fn | notifyAutoBackupChange | (private) | `function notifyAutoBackupChange(details) {` |
| 5367 | fn | setProjectAutoSaveOverrides | (private) | `function setProjectAutoSaveOverrides(overrides) {` |
| 5401 | fn | getProjectAutoSaveOverrides | (private) | `function getProjectAutoSaveOverrides() {` |
| 5405 | fn | clearProjectAutoSaveOverrides | (private) | `function clearProjectAutoSaveOverrides() {` |
| 5409 | fn | getProjectAutoSaveDelay | (private) | `function getProjectAutoSaveDelay() {` |
| 5418 | fn | runProjectAutoSave | (private) | `function runProjectAutoSave() {` |
| 5448 | fn | guard | (private) | `const guard = (fn, context, onSuccess) => {` |
| 5543 | fn | scheduleProjectAutoSave | (private) | `function scheduleProjectAutoSave(immediateOrOpt...` |
| 5631 | fn | resolveOptionFromEvent | (private) | `const resolveOptionFromEvent = (event, select) ...` |
| 5632 | fn | findClosestSelect | (private) | `const findClosestSelect = (node) => {` |
| 5646 | fn | isOption | (private) | - |
| 5667 | fn | point | (private) | `const point = (() => {` |
| 5693 | fn | attachMultiSelectToggle | (private) | `const attachMultiSelectToggle = (sel) => {` |
| 5698 | fn | toggleSelection | (private) | `const toggleSelection = (event) => {` |
| 5754 | fn | safeUpdateSelectIconBoxes | (private) | `const safeUpdateSelectIconBoxes = (selectElemen...` |
| 5777 | fn | handleUpdate | (private) | `const handleUpdate = () => safeUpdateSelectIcon...` |
| 5782 | fn | noteProjectFormDirty | (private) | `const noteProjectFormDirty = () => {` |
| 5788 | fn | queueProjectAutoSave | (private) | `const queueProjectAutoSave = (event) => {` |
| 5795 | fn | flushProjectAutoSave | (private) | `const flushProjectAutoSave = () => {` |
| 5803 | fn | setSelectValue | (private) | `function setSelectValue(select, value) {` |
| 5865 | fn | resetSelectsToNone | (private) | `function resetSelectsToNone(selects) {` |
| 5894 | fn | restoreSessionState | (private) | `function restoreSessionState() {` |
| 5967 | fn | fetchStoredProject | (private) | - |
| 5971 | fn | hasProjectPayload | (private) | `const hasProjectPayload = (project) => {` |
| 6161 | fn | ensureImportedProjectBaseNameSession | (private) | `function ensureImportedProjectBaseNameSession(r...` |
| 6182 | fn | resolveImportedProjectNamingContextSession | (private) | `function resolveImportedProjectNamingContextSes...` |
| 6215 | fn | generateUniqueImportedProjectNameSession | (private) | `function generateUniqueImportedProjectNameSessi...` |
| 6248 | fn | persistImportedProjectWithFallback | (private) | `function persistImportedProjectWithFallback(pay...` |
| 6294 | fn | clearOwnedGearExportArtifacts | (private) | `function clearOwnedGearExportArtifacts(element) {` |
| 6307 | fn | applyImportedOwnedGearMarkers | (private) | `function applyImportedOwnedGearMarkers(markers,...` |
| 6412 | fn | mergeSharedContactsIntoCache | (private) | `function mergeSharedContactsIntoCache(sharedCon...` |
| 6421 | fn | sanitize | (private) | - |
| 6564 | fn | resolveProjectNameCollisionForImport | (private) | `function resolveProjectNameCollisionForImport(b...` |
| 6602 | fn | applySharedSetup | (private) | `function applySharedSetup(shared, options = {}) {` |
| 6865 | fn | getQueryParam | (private) | `function getQueryParam(search, key) {` |
| 6930 | fn | buildSearchWithoutShared | (private) | `function buildSearchWithoutShared(search) {` |
| 6979 | fn | removeSharedQueryParamFromLocation | (private) | `function removeSharedQueryParamFromLocation() {` |
| 7026 | fn | applySharedSetupFromUrl | (private) | `function applySharedSetupFromUrl() {` |
| 7052 | fn | getTrackedPowerSelects | (private) | `function getTrackedPowerSelects() {` |
| 7067 | fn | getTrackedPowerSelectsWithSetup | (private) | `function getTrackedPowerSelectsWithSetup() {` |
| 7077 | fn | forEachTrackedSelect | (private) | `function forEachTrackedSelect(collection, handl...` |
| 7090 | fn | bindPowerSessionEvents | (private) | `const bindPowerSessionEvents = () => {` |
| 7092 | fn | getEl | (private) | `const getEl = (output, id) => output || documen...` |
| 7213 | fn | handleSetupNameInput | (private) | `const handleSetupNameInput = () => {` |
| 7247 | fn | flushProjectAutoSaveOnExit | (private) | `function flushProjectAutoSaveOnExit(eventOrOpti...` |
| 7323 | fn | toggleSaveSetupBtn | (private) | `const toggleSaveSetupBtn = () => {` |
| 7339 | fn | getSessionMountVoltagePreferencesClone | (private) | `function getSessionMountVoltagePreferencesClone...` |
| 7362 | fn | cloneMountVoltageDefaultsForSession | (private) | `function cloneMountVoltageDefaultsForSession() {` |
| 7373 | fn | updateThemeColor | (private) | `let updateThemeColor = () => { };` |
| 7374 | fn | setToggleIcon | (private) | `let setToggleIcon = () => { };` |
| 7375 | fn | applyDarkMode | (private) | `let applyDarkMode = () => { };` |
| 7376 | fn | applyHighContrast | (private) | `let applyHighContrast = () => { };` |
| 7377 | fn | applyReduceMotion | (private) | `let applyReduceMotion = () => { };` |
| 7378 | fn | applyRelaxedSpacing | (private) | `let applyRelaxedSpacing = () => { };` |
| 7379 | fn | applyPinkMode | (private) | `let applyPinkMode = () => { };` |
| 7380 | fn | persistPinkModePreference | (private) | `let persistPinkModePreference = () => { };` |
| 7381 | fn | rememberSettingsPinkModeBaseline | (private) | `let rememberSettingsPinkModeBaseline = () => { };` |
| 7382 | fn | revertSettingsPinkModeIfNeeded | (private) | `let revertSettingsPinkModeIfNeeded = () => { };` |
| 7383 | fn | rememberSettingsTemperatureUnitBaseline | (private) | `let rememberSettingsTemperatureUnitBaseline = (...` |
| 7384 | fn | revertSettingsTemperatureUnitIfNeeded | (private) | `let revertSettingsTemperatureUnitIfNeeded = () ...` |
| 7385 | fn | rememberSettingsFocusScaleBaseline | (private) | `let rememberSettingsFocusScaleBaseline = () => ...` |
| 7386 | fn | revertSettingsFocusScaleIfNeeded | (private) | `let revertSettingsFocusScaleIfNeeded = () => { };` |
| 7387 | fn | applyShowAutoBackupsPreference | (private) | `let applyShowAutoBackupsPreference = () => { };` |
| 7388 | fn | rememberSettingsShowAutoBackupsBaseline | (private) | `let rememberSettingsShowAutoBackupsBaseline = (...` |
| 7389 | fn | revertSettingsShowAutoBackupsIfNeeded | (private) | `let revertSettingsShowAutoBackupsIfNeeded = () ...` |
| 7390 | fn | rememberSettingsMountVoltagesBaseline | (private) | `let rememberSettingsMountVoltagesBaseline = () ...` |
| 7391 | fn | revertSettingsMountVoltagesIfNeeded | (private) | `let revertSettingsMountVoltagesIfNeeded = () =>...` |
| 7392 | fn | handlePinkModeIconPress | (private) | `let handlePinkModeIconPress = () => { };` |
| 7393 | fn | triggerPinkModeIconAnimation | (private) | `let triggerPinkModeIconAnimation = () => { };` |
| 7399 | fn | clonePinkModeSupportArgs | (private) | `function clonePinkModeSupportArgs(args) {` |
| 7413 | fn | invokePinkModeSupport | (private) | `function invokePinkModeSupport(methodName, args...` |
| 7439 | fn | flushPendingPinkModeSupportCalls | (private) | `function flushPendingPinkModeSupportCalls() {` |
| 7463 | fn | schedulePinkModeSupportFlush | (private) | `function schedulePinkModeSupportFlush() {` |
| 7472 | fn | enqueuePinkModeSupportCall | (private) | `function enqueuePinkModeSupportCall(methodName,...` |
| 7486 | fn | callPinkModeSupport | (private) | `function callPinkModeSupport(methodName, args, ...` |
| 7503 | fn | FALLBACK_TRIGGER_PINK_MODE_ICON_RAIN | (private) | `const FALLBACK_TRIGGER_PINK_MODE_ICON_RAIN = () =>` |
| 7509 | fn | startPinkModeIconRotation | (private) | `let startPinkModeIconRotation = () => { };` |
| 7510 | fn | stopPinkModeIconRotation | (private) | `let stopPinkModeIconRotation = () => { };` |
| 7511 | fn | FALLBACK_START_PINK_MODE_ANIMATED_ICONS | (private) | `const FALLBACK_START_PINK_MODE_ANIMATED_ICONS =...` |
| 7517 | fn | FALLBACK_STOP_PINK_MODE_ANIMATED_ICONS | (private) | `const FALLBACK_STOP_PINK_MODE_ANIMATED_ICONS = ...` |
| 7523 | fn | startPinkModeAnimatedIconRotation | (private) | `let startPinkModeAnimatedIconRotation = () => { };` |
| 7524 | fn | stopPinkModeAnimatedIconRotation | (private) | `let stopPinkModeAnimatedIconRotation = () => { };` |
| 7525 | fn | applyPinkModeIcon | (private) | `let applyPinkModeIcon = () => { };` |
| 7526 | fn | isPinkModeActive | (private) | `let isPinkModeActive = () => !!(typeof document...` |
| 7533 | fn | appearanceModuleValidator | (private) | - |
| 7541 | fn | processPendingControls | (private) | `const processPendingControls = (controller, que...` |
| 7562 | fn | clearAppearanceModuleUnavailableWarning | (private) | `function clearAppearanceModuleUnavailableWarnin...` |
| 7576 | fn | warnAppearanceModuleUnavailable | (private) | `function warnAppearanceModuleUnavailable() {` |
| 7586 | fn | scheduleAppearanceModuleUnavailableWarning | (private) | `function scheduleAppearanceModuleUnavailableWar...` |
| 7793 | fn | detectSystemThemePreference | (private) | `function detectSystemThemePreference() {` |
| 7807 | fn | buildThemePreferenceController | (private) | `function buildThemePreferenceController(module) {` |
| 7825 | fn | buildPinkModePreferenceController | (private) | `function buildPinkModePreferenceController(modu...` |
| 7841 | fn | applyAppearanceModuleBindings | (private) | `function applyAppearanceModuleBindings(module) {` |
| 7883 | fn | trackFallbackStart | (private) | `const trackFallbackStart = (...innerArgs) => {` |
| 7932 | fn | trackFallbackStop | (private) | `const trackFallbackStop = (...innerArgs) => {` |
| 8002 | fn | initializeAppearanceModule | (private) | `function initializeAppearanceModule(factory) {` |
| 8024 | fn | attemptAppearanceModuleInitialization | (private) | `function attemptAppearanceModuleInitialization(...` |
| 8074 | fn | announceIfInitialized | (private) | - |
| 8156 | fn | normalizeCameraColorValue | (private) | `function normalizeCameraColorValue(value) {` |
| 8173 | fn | generateDefaultCameraColor | (private) | `function generateDefaultCameraColor(letter) {` |
| 8177 | fn | generateChannel | (private) | `const generateChannel = () => {` |
| 8193 | fn | getDefaultCameraLetterColors | (private) | `function getDefaultCameraLetterColors() {` |
| 8210 | fn | loadCameraLetterColors | (private) | `function loadCameraLetterColors() {` |
| 8245 | fn | getCameraLetterColorsSafeSession | (private) | `function getCameraLetterColorsSafeSession() {` |
| 8250 | fn | applyCameraLetterColors | (private) | `function applyCameraLetterColors(newColors = {}) {` |
| 8282 | fn | getCameraColorInputElements | (private) | `function getCameraColorInputElements() {` |
| 8301 | fn | updateCameraColorInputsFromState | (private) | `function updateCameraColorInputsFromState() {` |
| 8314 | fn | collectCameraColorInputValues | (private) | `function collectCameraColorInputValues() {` |
| 8347 | fn | setThemePreference | (private) | `const setThemePreference = (value, options = {}...` |
| 8385 | fn | getThemePreference | (private) | `const getThemePreference = () => {` |
| 8395 | fn | unregisterHeaderThemeControl | (private) | `let unregisterHeaderThemeControl = () => { };` |
| 8396 | fn | unregisterSettingsThemeControl | (private) | `let unregisterSettingsThemeControl = () => { };` |
| 8398 | fn | registerThemeControl | (private) | `const registerThemeControl = (element, config) ...` |
| 8402 | fn | unregister | (private) | `let unregister = () => { };` |
| 8411 | fn | registerPinkModeControl | (private) | `const registerPinkModeControl = (element, confi...` |
| 8415 | fn | unregister | (private) | `let unregister = () => { };` |
| 8456 | fn | unregister | (private) | `let unregister = () => { };` |
| 8478 | fn | unregister | (private) | `let unregister = () => { };` |
| 8623 | fn | mountVoltageResetButtonRef | (private) | `const mountVoltageResetButtonRef = (() => {` |
| 8815 | fn | applySettingsAndCloseDialog | (private) | `const applySettingsAndCloseDialog = async () => {` |
| 9066 | fn | autoGearScenarioModeSelectHandle | (private) | `const autoGearScenarioModeSelectHandle = (() => {` |
| 9128 | fn | handleFactorUpdate | (private) | `const handleFactorUpdate = () => {` |
| 9154 | fn | resolveResetAutoGearRulesHandler | (private) | `const resolveResetAutoGearRulesHandler = () => {` |
| 9175 | fn | clearAutoGearResetUnavailableWarning | (private) | `const clearAutoGearResetUnavailableWarning = ()...` |
| 9189 | fn | warnAutoGearResetUnavailable | (private) | `const warnAutoGearResetUnavailable = () => {` |
| 9195 | fn | scheduleAutoGearResetUnavailableWarning | (private) | `const scheduleAutoGearResetUnavailableWarning =...` |
| 9211 | fn | enableResetButton | (private) | `const enableResetButton = () => {` |
| 9216 | fn | disableResetButton | (private) | `const disableResetButton = () => {` |
| 9223 | fn | attachResetHandler | (private) | `const attachResetHandler = (handler) => {` |
| 9237 | fn | attachHandlerIfAvailable | (private) | `const attachHandlerIfAvailable = (handler, opti...` |
| 9279 | fn | attachFromModule | (private) | - |
| 9342 | fn | updateQuery | (private) | - |
| 9472 | fn | bindAutoGearSelectorCatalogSync | (private) | `const bindAutoGearSelectorCatalogSync = (typeSe...` |
| 9474 | fn | refreshCatalog | (private) | `const refreshCatalog = () => {` |
| 9524 | fn | removeNode | (private) | `const removeNode = (node) => {` |
| 9544 | fn | createAccentTint | (private) | `const createAccentTint = (alpha = 0.16) => {` |
| 9554 | fn | getNotificationAccentColor | (private) | `const getNotificationAccentColor = () => {` |
| 9562 | fn | getNotificationTextColor | (private) | `const getNotificationTextColor = (backgroundCol...` |
| 9577 | fn | getNotificationTopOffset | (private) | `const getNotificationTopOffset = () => {` |
| 9596 | fn | scheduleNotificationContainerEnsure | (private) | `const scheduleNotificationContainerEnsure = () ...` |
| 9601 | fn | trigger | (private) | `const trigger = () => {` |
| 9616 | fn | ensureNotificationContainer | (private) | `const ensureNotificationContainer = () => {` |
| 9686 | fn | showNotification | (private) | `function showNotification(type, message) {` |
| 9716 | fn | ensureAutoBackupSpinnerStyles | (private) | `const ensureAutoBackupSpinnerStyles = () => {` |
| 9727 | fn | showAutoBackupActivityIndicator | (private) | `const showAutoBackupActivityIndicator = (messag...` |
| 9802 | fn | resolveGlobalLoadingIndicatorMessage | (private) | `const resolveGlobalLoadingIndicatorMessage = (f...` |
| 9825 | fn | resolveGlobalLoadingIndicatorMessageByKey | (private) | `const resolveGlobalLoadingIndicatorMessageByKey...` |
| 9858 | fn | syncBootstrapLoadingNoticeLocalization | (private) | `const syncBootstrapLoadingNoticeLocalization = ...` |
| 9878 | fn | refreshGlobalLoadingIndicatorText | (private) | `const refreshGlobalLoadingIndicatorText = () => {` |
| 9916 | fn | setGlobalLoadingIndicatorMessageByKey | (private) | `const setGlobalLoadingIndicatorMessageByKey = (...` |
| 9941 | fn | getHighResolutionTimestamp | (private) | `const getHighResolutionTimestamp = () => {` |
| 9948 | fn | showGlobalLoadingIndicator | (private) | `const showGlobalLoadingIndicator = (message) => {` |
| 10057 | fn | finalizeHide | (private) | `const finalizeHide = () => {` |
| 10112 | fn | installGlobalFetchLoadingIndicator | (private) | `const installGlobalFetchLoadingIndicator = () => {` |
| 10123 | fn | getMessage | (private) | `const getMessage = () => resolveGlobalLoadingIn...` |
| 10129 | fn | finalizeHide | (private) | `const finalizeHide = (hide) => {` |
| 10198 | fn | ensureInitialLoadingIndicatorVisible | (private) | `const ensureInitialLoadingIndicatorVisible = ()...` |
| 10222 | fn | hideInitialLoadingIndicatorSafely | (private) | `const hideInitialLoadingIndicatorSafely = () => {` |
| 10237 | fn | finalizeInitialLoadingIndicator | (private) | `const finalizeInitialLoadingIndicator = () => {` |
| 10247 | fn | scheduleHide | (private) | `const scheduleHide = () => {` |
| 10268 | fn | getDiffText | (private) | `function getDiffText(key, fallbackValue = '') {` |
| 10281 | fn | resolveCandidate | (private) | - |
| 10309 | fn | formatTimestampForComparison | (private) | `function formatTimestampForComparison(date, inc...` |
| 10340 | fn | formatComparisonOptionLabel | (private) | `function formatComparisonOptionLabel(name, pars...` |
| 10359 | fn | collectBackupDiffOptions | (private) | `function collectBackupDiffOptions() {` |
| 10408 | fn | fillBackupDiffSelect | (private) | `function fillBackupDiffSelect(select, options, ...` |
| 10437 | fn | clearBackupDiffResults | (private) | `function clearBackupDiffResults() {` |
| 10446 | fn | fallbackHumanizeDiffKey | (private) | `function fallbackHumanizeDiffKey(key) {` |
| 10473 | fn | humanizeDiffKey | (private) | `function humanizeDiffKey(key) {` |
| 10507 | fn | isDiffComparablePrimitive | (private) | `function isDiffComparablePrimitive(value) {` |
| 10515 | fn | arrayHasOnlyComparablePrimitives | (private) | `function arrayHasOnlyComparablePrimitives(array) {` |
| 10527 | fn | createPrimitiveDiffKey | (private) | `function createPrimitiveDiffKey(value) {` |
| 10549 | fn | buildPrimitiveDiffIndex | (private) | `function buildPrimitiveDiffIndex(array) {` |
| 10569 | fn | formatPrimitiveDiffPathValue | (private) | `function formatPrimitiveDiffPathValue(value) {` |
| 10584 | fn | createKeyedDiffPathSegment | (private) | `function createKeyedDiffPathSegment(keyName, ke...` |
| 10600 | fn | parseKeyedDiffPathSegment | (private) | `function parseKeyedDiffPathSegment(segment) {` |
| 10618 | fn | findArrayComparisonKey | (private) | `function findArrayComparisonKey(baseArray, comp...` |
| 10669 | fn | buildArrayKeyIndex | (private) | `function buildArrayKeyIndex(array, keyName) {` |
| 10699 | fn | formatDiffListIndex | (private) | `function formatDiffListIndex(part) {` |
| 10750 | fn | formatDiffPathSegment | (private) | `function formatDiffPathSegment(part) {` |
| 10761 | fn | formatDiffPath | (private) | `function formatDiffPath(parts) {` |
| 10768 | fn | valuesEqual | (private) | `function valuesEqual(a, b) {` |
| 10773 | fn | computeSetupDiff | (private) | `function computeSetupDiff(baseline, comparison) {` |
| 10776 | fn | walk | (private) | `function walk(baseValue, compareValue, path) {` |
| 10812 | fn | appendKey | (private) | - |
| 10842 | fn | appendKey | (private) | - |
| 10927 | fn | createDiffValueElement | (private) | `function createDiffValueElement(value, variant) {` |
| 10958 | fn | createDiffChangeBlock | (private) | `function createDiffChangeBlock(labelText, value...` |
| 10972 | fn | createDiffStatusBadge | (private) | `function createDiffStatusBadge(type) {` |
| 10996 | fn | sortDiffEntries | (private) | `function sortDiffEntries(entries) {` |
| 11020 | fn | renderBackupDiffEntries | (private) | `function renderBackupDiffEntries(entries) {` |
| 11092 | fn | formatDiffCount | (private) | `function formatDiffCount(count) {` |
| 11100 | fn | formatDiffDetail | (private) | `function formatDiffDetail(key, count) {` |
| 11105 | fn | updateBackupDiffSummary | (private) | `function updateBackupDiffSummary(entries) {` |
| 11135 | fn | renderBackupDiff | (private) | `function renderBackupDiff() {` |
| 11183 | fn | populateBackupDiffSelectors | (private) | `function populateBackupDiffSelectors() {` |
| 11184 | fn | resolve | (private) | `const resolve = (val, id) => val || (typeof doc...` |
| 11198 | fn | collapseBackupDiffSection | (private) | `function collapseBackupDiffSection(options = {}) {` |
| 11217 | fn | showBackupDiffSection | (private) | `function showBackupDiffSection() {` |
| 11235 | fn | handleBackupDiffToggle | (private) | `function handleBackupDiffToggle() {` |
| 11246 | fn | handleBackupDiffSelectionChange | (private) | `function handleBackupDiffSelectionChange(event) {` |
| 11260 | fn | getComparisonEntryType | (private) | `function getComparisonEntryType(name) {` |
| 11273 | fn | cloneValueForExport | (private) | `function cloneValueForExport(value) {` |
| 11285 | fn | handleBackupDiffExport | (private) | `function handleBackupDiffExport() {` |
| 11375 | fn | applyPreferencesFromStorage | (private) | `function applyPreferencesFromStorage(safeGetIte...` |
| 11560 | fn | captureSetupSelection | (private) | `function captureSetupSelection() {` |
| 11567 | fn | restoreSetupSelection | (private) | `function restoreSetupSelection(previousSelectio...` |
| 11712 | fn | describeError | (private) | `function describeError(error) {` |
| 11735 | fn | recordDiagnostic | (private) | `function recordDiagnostic(diagnostics, section,...` |
| 11752 | fn | applyBackupFallbacks | (private) | `function applyBackupFallbacks(target, diagnosti...` |
| 11781 | fn | mergeAutoGearRuleLists | (private) | `function mergeAutoGearRuleLists(primary, second...` |
| 11812 | fn | collectFullBackupData | (private) | `async function collectFullBackupData() {` |
| 11924 | fn | buildSettingsBackupPackage | (private) | `async function buildSettingsBackupPackage(times...` |
| 11962 | fn | performSettingsBackup | (private) | `async function performSettingsBackup(notify = t...` |
| 12016 | fn | createSettingsBackup | (private) | `function createSettingsBackup(notifyOrEvent = t...` |
| 12125 | fn | logStoragePersistenceEstimateUpdate | (private) | `function logStoragePersistenceEstimateUpdate(op...` |
| 12228 | fn | getLoggingLangInfo | (private) | `function getLoggingLangInfo() {` |
| 12237 | fn | setLoggingStatusKey | (private) | `function setLoggingStatusKey(key) {` |
| 12255 | fn | scheduleLoggingStatusReset | (private) | `function scheduleLoggingStatusReset(delay = 500...` |
| 12275 | fn | resolveLoggingApi | (private) | `function resolveLoggingApi() {` |
| 12310 | fn | detachLoggingSubscriptions | (private) | `function detachLoggingSubscriptions() {` |
| 12329 | fn | setLoggingControlsDisabled | (private) | `function setLoggingControlsDisabled(disabled) {` |
| 12351 | fn | formatLogDetailValue | (private) | `function formatLogDetailValue(value) {` |
| 12365 | fn | formatLogTimestamp | (private) | `function formatLogTimestamp(entry, langTexts, f...` |
| 12404 | fn | createLogDetailsElement | (private) | `function createLogDetailsElement(label, value) {` |
| 12417 | fn | sanitizeLoggingFileSegment | (private) | `function sanitizeLoggingFileSegment(segment) {` |
| 12428 | fn | buildLoggingExportMetadata | (private) | `function buildLoggingExportMetadata(date = new ...` |
| 12482 | fn | cloneLoggingExportValue | (private) | `function cloneLoggingExportValue(value) {` |
| 12502 | fn | exportLoggingHistory | (private) | `function exportLoggingHistory() {` |
| 12664 | fn | renderLoggingHistory | (private) | `function renderLoggingHistory() {` |
| 12860 | fn | scheduleLoggingRender | (private) | `function scheduleLoggingRender(options = {}) {` |
| 12877 | fn | applyLoggingConfig | (private) | `function applyLoggingConfig(config) {` |
| 12892 | fn | setToggleState | (private) | `const setToggleState = (input, value) => {` |
| 12904 | fn | sanitizeLoggingConfigPartial | (private) | `function sanitizeLoggingConfigPartial(partial) {` |
| 12965 | fn | updateLoggingConfig | (private) | `function updateLoggingConfig(partial) {` |
| 12987 | fn | attachLoggingSubscriptions | (private) | `function attachLoggingSubscriptions() {` |
| 13050 | fn | initializeLoggingPanel | (private) | `function initializeLoggingPanel() {` |
| 13090 | fn | applyLimitUpdate | (private) | `const applyLimitUpdate = () => {` |
| 13116 | fn | registerToggleHandler | (private) | `const registerToggleHandler = (input, key) => {` |
| 13150 | fn | getStoragePersistenceLangInfo | (private) | `function getStoragePersistenceLangInfo() {` |
| 13159 | fn | getStorageManagerInstance | (private) | `function getStorageManagerInstance() {` |
| 13166 | fn | formatStoragePersistenceBytes | (private) | `function formatStoragePersistenceBytes(bytes, l...` |
| 13194 | fn | renderStoragePersistenceStatus | (private) | `function renderStoragePersistenceStatus() {` |
| 13325 | fn | isSafariPersistenceIncompatibility | (private) | `function isSafariPersistenceIncompatibility() {` |
| 13384 | fn | refreshStoragePersistenceStatus | (private) | `async function refreshStoragePersistenceStatus(...` |
| 13461 | fn | handleStoragePersistenceRequest | (private) | `async function handleStoragePersistenceRequest(...` |
| 13547 | fn | bindBackupDiffEvents | (private) | `const bindBackupDiffEvents = () => {` |
| 13548 | fn | resolve | (private) | `const resolve = (id) => typeof document !== 'un...` |
| 13549 | fn | safeBind | (private) | `const safeBind = (id, type, handler) => {` |
| 13587 | fn | handleRestoreSettingsClick | (private) | `function handleRestoreSettingsClick() {` |
| 13593 | fn | handleRestoreSettingsInputChange | (private) | `function handleRestoreSettingsInputChange() {` |
| 13662 | fn | finalizeRestore | (private) | `const finalizeRestore = async () => {` |
| 13670 | fn | revertAfterFailure | (private) | `const revertAfterFailure = async () => {` |
| 13726 | fn | handleRestoreError | (private) | `const handleRestoreError = (error) => {` |
| 13740 | fn | processBackupPayload | (private) | `const processBackupPayload = async (rawPayload)...` |
| 13882 | fn | attemptTextFallback | (private) | `const attemptTextFallback = (reason) => {` |
| 13942 | fn | getSessionLanguageTexts | (private) | `function getSessionLanguageTexts() {` |
| 13972 | fn | registerSessionCineUiInternal | (private) | `function registerSessionCineUiInternal(cineUi) {` |
| 14039 | fn | registerSessionCineUi | (private) | `function registerSessionCineUi() {` |
| 14103 | fn | resetPlannerStateAfterFactoryReset | (private) | `function resetPlannerStateAfterFactoryReset() {` |
| 14377 | fn | close | (private) | `const close = () => {` |
| 14441 | fn | close | (private) | `const close = () => {` |
| 14733 | fn | collectFallbackUiCacheStorages | (private) | `function collectFallbackUiCacheStorages() {` |
| 14736 | fn | registerStorage | (private) | `const registerStorage = (candidate, label) => {` |
| 14748 | fn | inspectScope | (private) | `const inspectScope = (scope, label) => {` |
| 14834 | fn | clearUiCacheEntriesFallback | (private) | `function clearUiCacheEntriesFallback() {` |
| 14864 | fn | resolveCineCacheNameForReload | (private) | `function resolveCineCacheNameForReload() {` |
| 14891 | fn | isRelevantCacheKeyForReload | (private) | `function isRelevantCacheKeyForReload(key, expli...` |
| 14910 | fn | readLocationHrefSafe | (private) | `function readLocationHrefSafe(locationLike) {` |
| 14924 | fn | readLocationPathnameSafe | (private) | `function readLocationPathnameSafe(locationLike) {` |
| 14938 | fn | readLocationOriginSafe | (private) | `function readLocationOriginSafe(locationLike) {` |
| 14969 | fn | getForceReloadBaseCandidates | (private) | `function getForceReloadBaseCandidates(locationL...` |
| 14973 | fn | addCandidate | (private) | - |
| 15016 | fn | normaliseForceReloadHref | (private) | `function normaliseForceReloadHref(value, baseHr...` |
| 15045 | fn | buildForceReloadHref | (private) | `function buildForceReloadHref(locationLike, par...` |
| 15126 | fn | waitForReloadNavigation | (private) | `function waitForReloadNavigation(beforeHref, op...` |
| 15151 | fn | cleanup | (private) | `const cleanup = () => {` |
| 15188 | fn | finish | (private) | - |
| 15197 | fn | handleUnload | (private) | `const handleUnload = () => {` |
| 15201 | fn | evaluate | (private) | `const evaluate = () => {` |
| 15244 | fn | scheduleForceReloadNavigationWarning | (private) | `function scheduleForceReloadNavigationWarning(` |
| 15278 | fn | evaluate | (private) | `const evaluate = () => {` |
| 15298 | fn | runCheck | (private) | `const runCheck = () => {` |
| 15331 | fn | attemptForceReloadNavigation | (private) | `function attemptForceReloadNavigation(locationL...` |
| 15362 | fn | attemptForceReloadHistoryFallback | (private) | `function attemptForceReloadHistoryFallback(win,...` |
| 15443 | fn | scheduleForceReloadFallbacks | (private) | `function scheduleForceReloadFallbacks(win, loca...` |
| 15483 | fn | queueStep | (private) | - |
| 15558 | fn | prepareForceReloadContext | (private) | `function prepareForceReloadContext(win) {` |
| 15584 | fn | executeForceReloadContext | (private) | `function executeForceReloadContext(context) {` |
| 15663 | fn | tryForceReload | (private) | `function tryForceReload(win) {` |
| 15671 | fn | createReloadFallback | (private) | `function createReloadFallback(win, delayMs = 45...` |
| 15714 | fn | run | (private) | `const run = () => {` |
| 15772 | fn | awaitPromiseWithSoftTimeout | (private) | `function awaitPromiseWithSoftTimeout(promise, t...` |
| 15853 | fn | observeServiceWorkerControllerChangeForSession | (private) | `function observeServiceWorkerControllerChangeFo...` |
| 15869 | fn | finalize | (private) | `const finalize = (value) => {` |
| 15905 | fn | handler | (private) | `const handler = () => {` |
| 15962 | fn | collectServiceWorkerRegistrationsForReload | (private) | `async function collectServiceWorkerRegistration...` |
| 15968 | fn | pushRegistration | (private) | `const pushRegistration = (registration) => {` |
| 15998 | fn | clearCachesAndReload | (private) | `async function clearCachesAndReload() {` |
| 16233 | fn | exportDiagramSvg | (private) | `function exportDiagramSvg() {` |
| 16261 | fn | copyTextToClipboardBestEffort | (private) | `function copyTextToClipboardBestEffort(text) {` |
| 16339 | fn | bindDownloadDiagramListener | (private) | `const bindDownloadDiagramListener = () => {` |
| 16349 | fn | handleDownloadDiagramClick | (private) | `function handleDownloadDiagramClick(e) {` |
| 16354 | fn | pad | (private) | - |
| 16361 | fn | saveSvg | (private) | `const saveSvg = () => {` |
| 16398 | fn | bindGridSnapListener | (private) | `const bindGridSnapListener = () => {` |
| 16407 | fn | handleGridSnapClick | (private) | `function handleGridSnapClick() {` |
| 16421 | fn | setupHelpSystem | (private) | `const setupHelpSystem = () => {` |
| 16452 | fn | ensureHelpLinksUseButtonStyle | (private) | `const ensureHelpLinksUseButtonStyle = () => {` |
| 16462 | fn | highlightAppTarget | (private) | - |
| 16477 | fn | highlightFeatureSearchTargets | (private) | - |
| 16497 | fn | findAssociatedLabelElements | (private) | - |
| 16511 | fn | collectIdRefs | (private) | - |
| 16527 | fn | ensureFeatureSearchVisibility | (private) | - |
| 16567 | fn | focusFeatureElement | (private) | - |
| 16656 | fn | focusHelpSectionHeading | (private) | - |
| 16678 | fn | highlightHelpSection | (private) | - |
| 16695 | fn | arrangeHelpQuickLinksByLineCount | (private) | `const arrangeHelpQuickLinksByLineCount = () => {` |
| 16700 | fn | applyGrouping | (private) | `const applyGrouping = () => {` |
| 16802 | fn | scheduleHelpQuickLinksArrangement | (private) | `const scheduleHelpQuickLinksArrangement = () => {` |
| 16812 | fn | syncHelpQuickLinksVisibility | (private) | `const syncHelpQuickLinksVisibility = () => {` |
| 16835 | fn | applyQuickLinkLanguage | (private) | - |
| 16879 | fn | buildHelpQuickLinks | (private) | `const buildHelpQuickLinks = () => {` |
| 17007 | fn | runFocus | (private) | `const runFocus = () => {` |
| 17062 | fn | normaliseHelpSearchText | (private) | - |
| 17086 | fn | buildHelpHighlightPattern | (private) | - |
| 17088 | fn | escapeRegExp | (private) | - |
| 17090 | fn | addLetterPattern | (private) | - |
| 17118 | fn | updateHelpResultsSummaryText | (private) | `const updateHelpResultsSummaryText = ({` |
| 17124 | fn | hideAssist | (private) | `const hideAssist = () => {` |
| 17207 | fn | filterHelp | (private) | `const filterHelp = () => {` |
| 17227 | fn | highlightMatches | (private) | `const highlightMatches = (root, pattern) => {` |
| 17363 | fn | openHelp | (private) | `const openHelp = () => {` |
| 17391 | fn | closeHelp | (private) | `const closeHelp = (returnFocusEl = helpButton) ...` |
| 17410 | fn | toggleHelp | (private) | `const toggleHelp = () => {` |
| 17430 | fn | parseHoverHelpSelectorList | (private) | - |
| 17438 | fn | parseHoverHelpIdList | (private) | - |
| 17446 | fn | getHoverHelpReferenceElements | (private) | - |
| 17452 | fn | addCandidate | (private) | - |
| 17460 | fn | addFromSelectors | (private) | - |
| 17471 | fn | addFromIds | (private) | - |
| 17493 | fn | findHoverHelpTarget | (private) | - |
| 17541 | fn | formatHoverHelpShortcutToken | (private) | - |
| 17572 | fn | formatHoverHelpShortcut | (private) | - |
| 17584 | fn | splitHoverHelpShortcutList | (private) | - |
| 17592 | fn | gatherHoverHelpShortcuts | (private) | - |
| 17617 | fn | getHoverHelpLocaleValue | (private) | - |
| 17629 | fn | getHoverHelpFallbackKeys | (private) | - |
| 17633 | fn | push | (private) | - |
| 17749 | fn | collectHoverHelpContent | (private) | - |
| 17759 | fn | addUnique | (private) | `const addUnique = (value, bucket) => {` |
| 17767 | fn | addLabelText | (private) | - |
| 17768 | fn | addDetailText | (private) | - |
| 17769 | fn | addShortcutText | (private) | - |
| 17771 | fn | addTextFromElement | (private) | `const addTextFromElement = (` |
| 17806 | fn | applyFromIds | (private) | `const applyFromIds = (ids, { preferTextAsLabel ...` |
| 17893 | fn | clearHoverHelpHighlight | (private) | `const clearHoverHelpHighlight = () => {` |
| 17900 | fn | setHoverHelpHighlight | (private) | - |
| 17909 | fn | usingPointerAnchor | (private) | `const usingPointerAnchor = () =>` |
| 17917 | fn | extractPointerClientCoords | (private) | - |
| 17940 | fn | recordPointerFromEvent | (private) | - |
| 17950 | fn | positionHoverHelpTooltip | (private) | - |
| 17973 | fn | pointerClientX | (private) | `const pointerClientX = (() => {` |
| 17983 | fn | preferLeftSide | (private) | `const preferLeftSide = (() => {` |
| 18058 | fn | hideHoverHelpTooltip | (private) | `const hideHoverHelpTooltip = () => {` |
| 18067 | fn | createHoverHelpDetailsFragment | (private) | - |
| 18073 | fn | addParagraph | (private) | - |
| 18082 | fn | flushList | (private) | `const flushList = () => {` |
| 18094 | fn | addListItem | (private) | - |
| 18132 | fn | updateHoverHelpTooltip | (private) | - |
| 18222 | fn | canInteractDuringHoverHelp | (private) | - |
| 18228 | fn | stopHoverHelp | (private) | `const stopHoverHelp = () => {` |
| 18242 | fn | startHoverHelp | (private) | `const startHoverHelp = () => {` |
| 18255 | fn | refreshTooltipPosition | (private) | `const refreshTooltipPosition = () => {` |
| 18287 | fn | updatePointerPosition | (private) | - |
| 18333 | fn | focusFeatureSearchInput | (private) | `const focusFeatureSearchInput = () => {` |
| 18355 | fn | searchKey | (private) | - |
| 18360 | fn | searchTokens | (private) | - |
| 18365 | fn | findBestSearchMatch | (private) | `const findBestSearchMatch = (map, key, tokens) ...` |
| 18371 | fn | updateFeatureSearchValue | (private) | `const updateFeatureSearchValue = (label, query)...` |
| 18379 | fn | normalizeSearchValue | (private) | - |
| 18384 | fn | normalizeGearNameForComparison | (private) | `function normalizeGearNameForComparison(name) {` |
| 18391 | fn | recordFeatureSearchUsage | (private) | `const recordFeatureSearchUsage = (key, type, la...` |
| 18432 | fn | featureMatch | (private) | `const featureMatch = (() => {` |
| 18454 | fn | normalizedFeatureMatch | (private) | `const normalizedFeatureMatch = (() => {` |
| 18623 | fn | resolveFeatureSearchOptionEntry | (private) | - |
| 18644 | fn | openFeatureSearchEntry | (private) | `const openFeatureSearchEntry = (entry, queryVal...` |
| 18650 | fn | recordUsage | (private) | `const recordUsage = () => {` |
| 18809 | fn | getDropdownOptions | (private) | `const getDropdownOptions = () => {` |
| 18814 | fn | clearFeatureSearchActiveState | (private) | `const clearFeatureSearchActiveState = () => {` |
| 18825 | fn | setActiveDropdownOption | (private) | `const setActiveDropdownOption = (index, { focus...` |
| 18857 | fn | closeFeatureSearchDropdown | (private) | `const closeFeatureSearchDropdown = () => {` |
| 18871 | fn | openFeatureSearchDropdown | (private) | `const openFeatureSearchDropdown = () => {` |
| 18904 | fn | applyFeatureSearchSuggestion | (private) | `const applyFeatureSearchSuggestion = (value, op...` |
| 18924 | fn | handle | (private) | `const handle = () => {` |
| 19049 | fn | safeShowPicker | (private) | `function safeShowPicker(input) {` |
| 19191 | fn | registerRequiredScenarioOptionEntriesGetter | (private) | `function registerRequiredScenarioOptionEntriesG...` |
| 19219 | fn | getRequiredScenarioOptionEntries | (private) | `function getRequiredScenarioOptionEntries() {` |
| 19253 | fn | updateRequiredScenariosSummary | (private) | `function updateRequiredScenariosSummary() {` |
| 19287 | fn | ensureOption | (private) | - |
| 19327 | fn | initApp | (private) | `function initApp() {` |
| 19446 | fn | ensureFeedbackTemperatureOptionsSafe | (private) | `function ensureFeedbackTemperatureOptionsSafe(s...` |
| 19482 | fn | updateFeedbackTemperatureOptionsSafe | (private) | `function updateFeedbackTemperatureOptionsSafe() {` |
| 19504 | fn | schedulePostRenderTask | (private) | `function schedulePostRenderTask(task, options =...` |
| 19513 | fn | runTaskSafely | (private) | `const runTaskSafely = (deadline) => {` |
| 19523 | fn | scheduleIdle | (private) | `const scheduleIdle = () => {` |
| 19539 | fn | populateEnvironmentDropdowns | (private) | `function populateEnvironmentDropdowns() {` |
| 19540 | fn | populate | (private) | `const populate = (tempSelect) => {` |
| 19559 | fn | populateLensDropdown | (private) | `function populateLensDropdown() {` |
| 19560 | fn | resolveLensSelect | (private) | `const resolveLensSelect = () => {` |
| 19584 | fn | normalizeFocusScaleValue | (private) | `const normalizeFocusScaleValue = (value) => {` |
| 19591 | fn | resolveFocusScaleMode | (private) | `const resolveFocusScaleMode = () => {` |
| 19623 | fn | resolveLensFocusScaleMode | (private) | `const resolveLensFocusScaleMode = (lens) => {` |
| 19641 | fn | formatLensNumber | (private) | `const formatLensNumber = (value, options = {}) ...` |
| 19670 | fn | formatLensWeight | (private) | `const formatLensWeight = (value, mode = focusSc...` |
| 19685 | fn | formatLensDiameter | (private) | `const formatLensDiameter = (value, mode = focus...` |
| 19700 | fn | formatLensMinFocus | (private) | `const formatLensMinFocus = (value, mode = focus...` |
| 19786 | fn | populateCameraPropertyDropdown | (private) | `function populateCameraPropertyDropdown(selectI...` |
| 19787 | fn | populate | (private) | `const populate = (dropdown) => {` |
| 19820 | fn | populateRecordingResolutionDropdown | (private) | `function populateRecordingResolutionDropdown(se...` |
| 19955 | fn | formatFrameRateValue | (private) | `function formatFrameRateValue(value) {` |
| 19965 | fn | tokenizeFrameRateContext | (private) | `function tokenizeFrameRateContext(value) {` |
| 19978 | fn | addAliasToken | (private) | - |
| 19988 | fn | includes | (private) | - |
| 19989 | fn | compactIncludes | (private) | - |
| 20054 | fn | normalizeMatchTarget | (private) | `function normalizeMatchTarget(value) {` |
| 20061 | fn | includePreferredValuesForRange | (private) | `function includePreferredValuesForRange(minValu...` |
| 20077 | fn | parseFrameRateNumericValues | (private) | `function parseFrameRateNumericValues(entry) {` |
| 20133 | fn | normalizeRecordingFrameRateValue | (private) | `function normalizeRecordingFrameRateValue(value) {` |
| 20147 | fn | buildFrameRateSuggestions | (private) | `function buildFrameRateSuggestions(entries, con...` |
| 20213 | fn | findMaxFrameRateForSensor | (private) | `function findMaxFrameRateForSensor(entries, sen...` |
| 20305 | fn | getFrameRateInputValue | (private) | `function getFrameRateInputValue(input) {` |
| 20311 | fn | getCurrentFrameRateInputValue | (private) | `function getCurrentFrameRateInputValue() {` |
| 20315 | fn | collectFrameRateContextTokens | (private) | `function collectFrameRateContextTokens(select) {` |
| 20328 | fn | populateFrameRateDropdownFor | (private) | `function populateFrameRateDropdownFor(config = ...` |
| 20521 | fn | populateFrameRateDropdown | (private) | `function populateFrameRateDropdown(selected = '...` |
| 20522 | fn | resolve | (private) | `const resolve = (val, id) => val || (typeof doc...` |
| 20540 | fn | populateSlowMotionFrameRateDropdown | (private) | `function populateSlowMotionFrameRateDropdown(se...` |
| 20541 | fn | resolve | (private) | `const resolve = (val, id) => val || (typeof doc...` |
| 20560 | fn | populateSlowMotionRecordingResolutionDropdown | (private) | `function populateSlowMotionRecordingResolutionD...` |
| 20565 | fn | populateSlowMotionSensorModeDropdown | (private) | `function populateSlowMotionSensorModeDropdown(s...` |
| 20570 | fn | populateSensorModeDropdown | (private) | `function populateSensorModeDropdown(selected = ...` |
| 20575 | fn | populateCodecDropdown | (private) | `function populateCodecDropdown(selected = '') {` |
| 20579 | fn | populateFilterDropdown | (private) | `function populateFilterDropdown() {` |
| 20580 | fn | populate | (private) | `const populate = (select) => {` |
| 20615 | fn | filterId | (private) | - |
| 20617 | fn | getFilterValueConfig | (private) | `function getFilterValueConfig(type) {` |
| 20643 | fn | createFilterSizeSelect | (private) | `function createFilterSizeSelect(type, selected ...` |
| 20662 | fn | createFilterValueSelect | (private) | `function createFilterValueSelect(type, selected) {` |
| 20673 | fn | syncOption | (private) | `const syncOption = (option, isSelected) => {` |
| 20681 | fn | syncCheckbox | (private) | `const syncCheckbox = (checkbox, isChecked) => {` |
| 20746 | fn | resolveFilterDisplayInfo | (private) | `function resolveFilterDisplayInfo(type, size = ...` |
| 20783 | fn | buildFilterGearEntries | (private) | `function buildFilterGearEntries(filters = []) {` |
| 20887 | fn | updateGearListFilterEntries | (private) | `function updateGearListFilterEntries(entries = ...` |
| 20907 | fn | getGearListFilterDetailsContainer | (private) | `function getGearListFilterDetailsContainer() {` |
| 20911 | fn | filterTypeNeedsValueSelect | (private) | `function filterTypeNeedsValueSelect(type) {` |
| 20919 | fn | createFilterStorageValueSelect | (private) | `function createFilterStorageValueSelect(type, s...` |
| 20941 | fn | resolveFilterDetailsStorageElement | (private) | `function resolveFilterDetailsStorageElement() {` |
| 20960 | fn | renderFilterDetailsStorage | (private) | `function renderFilterDetailsStorage(details) {` |
| 20986 | fn | resolveGlobalScope | (private) | `function resolveGlobalScope() {` |
| 20994 | fn | ensureFilterDetailEditButton | (private) | `function ensureFilterDetailEditButton(element) {` |
| 21061 | fn | renderGearListFilterDetails | (private) | `function renderGearListFilterDetails(details) {` |
| 21171 | fn | syncGearListFilterSize | (private) | `function syncGearListFilterSize(storageId, valu...` |
| 21183 | fn | syncGearListFilterValue | (private) | `function syncGearListFilterValue(storageId, val...` |
| 21206 | fn | renderFilterDetails | (private) | `function renderFilterDetails(providedTokens) {` |
| 21281 | fn | handleFilterDetailChange | (private) | `function handleFilterDetailChange() {` |
| 21293 | fn | collectFilterSelections | (private) | `function collectFilterSelections() {` |
| 21372 | fn | parseFilterTokens | (private) | `function parseFilterTokens(str) {` |
| 21391 | fn | applyFilterSelectionsToGearList | (private) | `function applyFilterSelectionsToGearList(info) {` |
| 21401 | fn | normalizeGearNameForComparison | (private) | `function normalizeGearNameForComparison(name) {` |
| 21417 | fn | buildFilterSelectHtml | (private) | `function buildFilterSelectHtml() {` |
| 21422 | fn | collectFilterAccessories | (private) | `function collectFilterAccessories(filters = []) {` |
| 21460 | fn | populateUserButtonDropdowns | (private) | `function populateUserButtonDropdowns() {` |
| 21477 | fn | populate | (private) | `const populate = (sel) => {` |
| 21526 | fn | runInitAppWithInitialLoadingIndicator | (private) | `const runInitAppWithInitialLoadingIndicator = (...` |

## Memory Markers

### 🟢 `NOTE` (line 10)

> Some of these might be available on window, but we import them to be explicit and avoid lint/runtime errors if window is not ready.

