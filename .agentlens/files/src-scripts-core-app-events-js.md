# src/scripts/core/app-events.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 5822
- **Language:** JavaScript
- **Symbols:** 113
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 229 | fn | collectLoggingResolverScopes | (private) | `function collectLoggingResolverScopes() {` |
| 252 | fn | resolveLoggingResolver | (private) | `function resolveLoggingResolver() {` |
| 284 | fn | resolveLegacyEventsLogger | (private) | `function resolveLegacyEventsLogger() {` |
| 357 | fn | getGlobalScope | (private) | `function getGlobalScope() {` |
| 369 | fn | resolveNewCategorySelect | (private) | `function resolveNewCategorySelect() {` |
| 435 | fn | sanitizeErrorForLogging | (private) | `function sanitizeErrorForLogging(error) {` |
| 482 | fn | sanitizeImportErrors | (private) | `function sanitizeImportErrors(errors) {` |
| 521 | fn | safeCountDevices | (private) | `function safeCountDevices(collection) {` |
| 539 | fn | buildDeviceCountsSnapshot | (private) | `function buildDeviceCountsSnapshot(currentDevic...` |
| 552 | fn | logDeviceImportEvent | (private) | `function logDeviceImportEvent(level, message, d...` |
| 568 | fn | resolveConsoleMethodForLevel | (private) | `function resolveConsoleMethodForLevel(level) {` |
| 581 | fn | resolveCoreAutoBackupNamespace | (private) | `function resolveCoreAutoBackupNamespace() {` |
| 622 | fn | logAutoBackupEvent | (private) | `function logAutoBackupEvent(level, message, det...` |
| 683 | fn | summarizeAutoBackupPayloadForLog | (private) | `function summarizeAutoBackupPayloadForLog(paylo...` |
| 764 | fn | resolveAutoBackupLogLevel | (private) | `function resolveAutoBackupLogLevel(status, reas...` |
| 782 | fn | resolveAutoBackupLogMessage | (private) | `function resolveAutoBackupLogMessage(status, re...` |
| 801 | fn | createDefaultAutoBackupLogDetail | (private) | `function createDefaultAutoBackupLogDetail(resul...` |
| 857 | fn | resetAutoBackupChangeCounter | (private) | `function resetAutoBackupChangeCounter() {` |
| 861 | fn | recordAutoBackupRun | (private) | `function recordAutoBackupRun(result, logDetailO...` |
| 890 | fn | isAutoBackupReasonAllowed | (private) | `function isAutoBackupReasonAllowed(reason) {` |
| 897 | fn | showAutoBackupIndicatorSafe | (private) | `function showAutoBackupIndicatorSafe() {` |
| 915 | fn | triggerAutoBackupForChangeThreshold | (private) | `function triggerAutoBackupForChangeThreshold(de...` |
| 920 | fn | run | (private) | `const run = () => {` |
| 958 | fn | noteAutoBackupRelevantChange | (private) | `function noteAutoBackupRelevantChange(details =...` |
| 1050 | fn | markAutoBackupDataAsRenamed | (private) | `function markAutoBackupDataAsRenamed(value) {` |
| 1069 | fn | callEventsCoreFunction | (private) | `function callEventsCoreFunction(functionName, a...` |
| 1140 | fn | invokeCoreFunctionStrict | (private) | `function invokeCoreFunctionStrict(functionName,...` |
| 1156 | fn | resolveFirstPowerInputType | (private) | `function resolveFirstPowerInputType(device) {` |
| 1195 | fn | resolveCoreOptionsArray | (private) | `function resolveCoreOptionsArray(functionName, ...` |
| 1220 | fn | readGlobalArraySnapshot | (private) | `function readGlobalArraySnapshot(key) {` |
| 1230 | fn | publishGlobalArraySnapshot | (private) | `function publishGlobalArraySnapshot(key, values) {` |
| 1250 | fn | syncCoreOptionsArray | (private) | `function syncCoreOptionsArray(globalKey, functi...` |
| 1254 | fn | addValues | (private) | `const addValues = (values) => {` |
| 1301 | fn | readCoreDeviceSelectionHelper | (private) | `function readCoreDeviceSelectionHelper() {` |
| 1317 | fn | refreshDeviceListsSafe | (private) | `function refreshDeviceListsSafe() {` |
| 1339 | fn | hasAnyDeviceSelectionSafe | (private) | `function hasAnyDeviceSelectionSafe(state) {` |
| 1371 | fn | isMeaningfulSelection | (private) | - |
| 1436 | fn | getEventsCoreValue | (private) | `function getEventsCoreValue(functionName, optio...` |
| 1455 | fn | storeLoadedSetupStateSafe | (private) | `function storeLoadedSetupStateSafe(state) {` |
| 1459 | fn | resolveCineUi | (private) | `function resolveCineUi() {` |
| 1485 | fn | getSetupSelectElement | (private) | `function getSetupSelectElement() {` |
| 1504 | fn | updateDropdowns | (private) | `const updateDropdowns = () => {` |
| 1540 | fn | handleSaveSetupClickInternal | (private) | `function handleSaveSetupClickInternal(optionsOr...` |
| 1736 | fn | handleSaveSetupClick | (private) | `function handleSaveSetupClick(optionsOrEvent) {` |
| 1790 | fn | handleDeleteSetupClickInternal | (private) | `function handleDeleteSetupClickInternal() {` |
| 1807 | fn | performDeletion | (private) | `const performDeletion = () => {` |
| 1915 | fn | handleDeleteSetupClick | (private) | `function handleDeleteSetupClick() {` |
| 1923 | fn | resetSetupStateToDefaults | (private) | `function resetSetupStateToDefaults(options = {}) {` |
| 1943 | fn | resetSelectToDefault | (private) | `const resetSelectToDefault = (select) => {` |
| 2073 | fn | finalizeSetupSelection | (private) | `function finalizeSetupSelection(nextSetupName) {` |
| 2136 | fn | normalizeProjectName | (private) | `const normalizeProjectName = (value) =>` |
| 2317 | fn | regenerateGearList | (private) | `const regenerateGearList = (info) => callEvents...` |
| 2404 | fn | regenerateGearList | (private) | `const regenerateGearList = (info) => callEvents...` |
| 2439 | fn | populateSetupSelect | (private) | `function populateSetupSelect() {` |
| 2517 | fn | notifyAutoSaveFromBackup | (private) | `function notifyAutoSaveFromBackup(message, back...` |
| 2561 | fn | createStableValueSignature | (private) | `function createStableValueSignature(value) {` |
| 2627 | fn | computeAutoBackupStateSignature | (private) | `function computeAutoBackupStateSignature(setupS...` |
| 2635 | fn | hasMeaningfulAutoBackupContent | (private) | `function hasMeaningfulAutoBackupContent(setupSt...` |
| 2682 | fn | getSortedAutoBackupNames | (private) | `function getSortedAutoBackupNames(setups) {` |
| 2691 | fn | resolveLatestAutoBackupEntry | (private) | `function resolveLatestAutoBackupEntry(setups) {` |
| 2701 | fn | computeStoredAutoBackupSignature | (private) | `function computeStoredAutoBackupSignature(name,...` |
| 2731 | fn | ensureLastAutoBackupSignatureInitialized | (private) | `function ensureLastAutoBackupSignatureInitializ...` |
| 2756 | fn | readAutoBackupMetadata | (private) | `function readAutoBackupMetadata(entry) {` |
| 2769 | fn | attachAutoBackupMetadata | (private) | `function attachAutoBackupMetadata(target, metad...` |
| 2802 | fn | determineNextAutoBackupPlan | (private) | `function determineNextAutoBackupPlan(setups) {` |
| 2841 | fn | autoBackup | (private) | `function autoBackup(options = {}) {` |
| 2862 | fn | normalizeProjectName | (private) | `const normalizeProjectName = (value) =>` |
| 2879 | fn | isAutoBackupName | (private) | `const isAutoBackupName = (name) => typeof name ...` |
| 2975 | fn | pad | (private) | `const pad = (n) => String(n).padStart(2, '0');` |
| 3273 | fn | ensureAutoBackupBeforeDeletion | (private) | `function ensureAutoBackupBeforeDeletion(context...` |
| 3287 | fn | normalizeProjectName | (private) | `const normalizeProjectName = (value) =>` |
| 3298 | fn | isAutoBackupName | (private) | `const isAutoBackupName = (name) => typeof name ...` |
| 3362 | fn | getQueuedBackupBannerTexts | (private) | `function getQueuedBackupBannerTexts() {` |
| 3384 | fn | ensureQueuedBackupBannerElements | (private) | `function ensureQueuedBackupBannerElements() {` |
| 3457 | fn | showQueuedBackupBanner | (private) | `function showQueuedBackupBanner(count, fallback...` |
| 3478 | fn | hideQueuedBackupBanner | (private) | `function hideQueuedBackupBanner() {` |
| 3486 | fn | attachQueuedBackupGestureListeners | (private) | `function attachQueuedBackupGestureListeners() {` |
| 3502 | fn | detachQueuedBackupGestureListeners | (private) | `function detachQueuedBackupGestureListeners() {` |
| 3518 | fn | handleQueuedBackupGesture | (private) | `function handleQueuedBackupGesture() {` |
| 3522 | fn | requestQueuedBackupFlush | (private) | `function requestQueuedBackupFlush(trigger) {` |
| 3537 | fn | updateQueuedBackupBannerFromVault | (private) | `function updateQueuedBackupBannerFromVault() {` |
| 3565 | fn | flushQueuedBackupVault | (private) | `async function flushQueuedBackupVault(trigger) {` |
| 3630 | fn | handleQueuedBackupVaultQueuedEvent | (private) | `function handleQueuedBackupVaultQueuedEvent() {` |
| 3635 | fn | handleQueuedBackupFallbackChangedEvent | (private) | `function handleQueuedBackupFallbackChangedEvent...` |
| 3639 | fn | scheduleAutoBackupTimer | (private) | `function scheduleAutoBackupTimer() {` |
| 3660 | fn | scheduleAutoGearBackupTimer | (private) | `function scheduleAutoGearBackupTimer() {` |
| 3683 | fn | queueScheduledFullBackup | (private) | `async function queueScheduledFullBackup() {` |
| 3714 | fn | scheduleHourlyBackupTimer | (private) | `function scheduleHourlyBackupTimer() {` |
| 3747 | fn | showDeviceManagerSection | (private) | `function showDeviceManagerSection() {` |
| 3765 | fn | hideDeviceManagerSection | (private) | `function hideDeviceManagerSection() {` |
| 3781 | fn | toggleDeviceManagerSection | (private) | `function toggleDeviceManagerSection() {` |
| 3793 | fn | bindDeviceManagerToggleHandler | (private) | `function bindDeviceManagerToggleHandler() {` |
| 3820 | fn | getEventsLanguageTexts | (private) | `function getEventsLanguageTexts() {` |
| 3850 | fn | resolveAutoBackupIndicatorMessage | (private) | `function resolveAutoBackupIndicatorMessage() {` |
| 3859 | fn | registerEventsCineUiInternal | (private) | `function registerEventsCineUiInternal(cineUi) {` |
| 3912 | fn | registerEventsCineUi | (private) | `function registerEventsCineUi() {` |
| 3925 | fn | toggleDeviceDetails | (private) | `function toggleDeviceDetails(button) {` |
| 3963 | fn | inferDeviceCategory | (private) | `function inferDeviceCategory(key, data) {` |
| 3977 | fn | resolveDefaultLensMountType | (private) | `function resolveDefaultLensMountType() {` |
| 3982 | fn | findPreferredMount | (private) | `const findPreferredMount = (cam) => {` |
| 4018 | fn | normalizeLensFocusScale | (private) | `function normalizeLensFocusScale(value) {` |
| 4036 | fn | applyCameraFizConnectors | (private) | `function applyCameraFizConnectors(connectors) {` |
| 4096 | fn | applyCameraTimecodes | (private) | `function applyCameraTimecodes(timecodes) {` |
| 4183 | fn | populateDeviceForm | (private) | `function populateDeviceForm(categoryKey, device...` |
| 4184 | fn | resolve | (private) | `const resolve = (val, id) => val || (typeof doc...` |
| 4496 | fn | performDeviceDeletion | (private) | `const performDeviceDeletion = () => {` |
| 4573 | fn | resolveDeviceManagerSectionForEvents | (private) | `function resolveDeviceManagerSectionForEvents() {` |
| 4819 | fn | resetDeviceForm | (private) | `function resetDeviceForm() {` |
| 4845 | fn | clearDeviceManagerFilterForCategory | (private) | `function clearDeviceManagerFilterForCategory(ca...` |
| 4882 | fn | applyDynamicFieldsToDevice | (private) | `function applyDynamicFieldsToDevice(container, ...` |
| 5432 | fn | generateExportFilename | (private) | `function generateExportFilename(prefix = 'cine_...` |
| 5502 | fn | performExportAndRevert | (private) | `const performExportAndRevert = () => {` |
| 5757 | fn | updateRecordingFrameRateHint | (private) | `function updateRecordingFrameRateHint() {` |

