# legacy/scripts/core/app-events.js

[← Back to Module](../modules/legacy-scripts-core/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 5402
- **Language:** JavaScript
- **Symbols:** 116
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 1 | fn | _regenerator | (private) | `function _regenerator() { var e, t, r = "functi...` |
| 2 | fn | _regeneratorDefine2 | (private) | `function _regeneratorDefine2(e, r, n, t) { var ...` |
| 3 | fn | _slicedToArray | (private) | `function _slicedToArray(r, e) { return _arrayWi...` |
| 4 | fn | _nonIterableRest | (private) | `function _nonIterableRest() { throw new TypeErr...` |
| 5 | fn | _iterableToArrayLimit | (private) | `function _iterableToArrayLimit(r, l) { var t = ...` |
| 6 | fn | _arrayWithHoles | (private) | `function _arrayWithHoles(r) { if (Array.isArray...` |
| 7 | fn | asyncGeneratorStep | (private) | `function asyncGeneratorStep(n, t, e, r, o, a, c...` |
| 8 | fn | _asyncToGenerator | (private) | `function _asyncToGenerator(n) { return function...` |
| 9 | fn | _createForOfIteratorHelper | (private) | `function _createForOfIteratorHelper(r, e) { var...` |
| 10 | fn | _unsupportedIterableToArray | (private) | `function _unsupportedIterableToArray(r, a) { if...` |
| 11 | fn | _arrayLikeToArray | (private) | `function _arrayLikeToArray(r, a) { (null == a |...` |
| 12 | fn | ownKeys | (private) | `function ownKeys(e, r) { var t = Object.keys(e)...` |
| 13 | fn | _objectSpread | (private) | `function _objectSpread(e) { for (var r = 1; r <...` |
| 14 | fn | _defineProperty | (private) | `function _defineProperty(e, r, t) { return (r =...` |
| 15 | fn | _toPropertyKey | (private) | `function _toPropertyKey(t) { var i = _toPrimiti...` |
| 16 | fn | _toPrimitive | (private) | `function _toPrimitive(t, r) { if ("object" != _...` |
| 17 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 80 | fn | defineUiGetter | (private) | `function defineUiGetter(name, id) {` |
| 165 | fn | initDomReferences | (private) | `function initDomReferences() {}` |
| 259 | fn | clearDeviceStorageVariantForEvents | (private) | `function clearDeviceStorageVariantForEvents(key...` |
| 358 | fn | clearAllDeviceStorageVariantsForEvents | (private) | `function clearAllDeviceStorageVariantsForEvents...` |
| 392 | fn | getCableSubcategoryKeysForUi | (private) | `function getCableSubcategoryKeysForUi(preferred...` |
| 454 | fn | getDeviceStorageKeyVariantsForEvents | (private) | `function getDeviceStorageKeyVariantsForEvents() {` |
| 614 | fn | collectLoggingResolverScopes | (private) | `function collectLoggingResolverScopes() {` |
| 634 | fn | resolveLoggingResolver | (private) | `function resolveLoggingResolver() {` |
| 662 | fn | resolveLegacyEventsLogger | (private) | `function resolveLegacyEventsLogger() {` |
| 722 | fn | getGlobalScope | (private) | `function getGlobalScope() {` |
| 732 | fn | resolveNewCategorySelect | (private) | `function resolveNewCategorySelect() {` |
| 776 | fn | sanitizeErrorForLogging | (private) | `function sanitizeErrorForLogging(error) {` |
| 827 | fn | sanitizeImportErrors | (private) | `function sanitizeImportErrors(errors) {` |
| 863 | fn | safeCountDevices | (private) | `function safeCountDevices(collection) {` |
| 877 | fn | buildDeviceCountsSnapshot | (private) | `function buildDeviceCountsSnapshot(currentDevic...` |
| 889 | fn | logDeviceImportEvent | (private) | `function logDeviceImportEvent(level, message, d...` |
| 900 | fn | resolveConsoleMethodForLevel | (private) | `function resolveConsoleMethodForLevel(level) {` |
| 910 | fn | resolveCoreAutoBackupNamespace | (private) | `function resolveCoreAutoBackupNamespace() {` |
| 936 | fn | logAutoBackupEvent | (private) | `function logAutoBackupEvent(level, message, det...` |
| 990 | fn | summarizeAutoBackupPayloadForLog | (private) | `function summarizeAutoBackupPayloadForLog(paylo...` |
| 1047 | fn | resolveAutoBackupLogLevel | (private) | `function resolveAutoBackupLogLevel(status, reas...` |
| 1064 | fn | resolveAutoBackupLogMessage | (private) | `function resolveAutoBackupLogMessage(status, re...` |
| 1078 | fn | createDefaultAutoBackupLogDetail | (private) | `function createDefaultAutoBackupLogDetail(resul...` |
| 1130 | fn | resetAutoBackupChangeCounter | (private) | `function resetAutoBackupChangeCounter() {` |
| 1133 | fn | recordAutoBackupRun | (private) | `function recordAutoBackupRun(result, logDetailO...` |
| 1160 | fn | isAutoBackupReasonAllowed | (private) | `function isAutoBackupReasonAllowed(reason) {` |
| 1166 | fn | showAutoBackupIndicatorSafe | (private) | `function showAutoBackupIndicatorSafe() {` |
| 1181 | fn | triggerAutoBackupForChangeThreshold | (private) | `function triggerAutoBackupForChangeThreshold(de...` |
| 1223 | fn | noteAutoBackupRelevantChange | (private) | `function noteAutoBackupRelevantChange() {` |
| 1281 | fn | markAutoBackupDataAsRenamed | (private) | `function markAutoBackupDataAsRenamed(value) {` |
| 1299 | fn | callEventsCoreFunction | (private) | `function callEventsCoreFunction(functionName) {` |
| 1357 | fn | invokeCoreFunctionStrict | (private) | `function invokeCoreFunctionStrict(functionName) {` |
| 1375 | fn | resolveFirstPowerInputType | (private) | `function resolveFirstPowerInputType(device) {` |
| 1407 | fn | resolveCoreOptionsArray | (private) | `function resolveCoreOptionsArray(functionName) {` |
| 1429 | fn | readGlobalArraySnapshot | (private) | `function readGlobalArraySnapshot(key) {` |
| 1437 | fn | publishGlobalArraySnapshot | (private) | `function publishGlobalArraySnapshot(key, values) {` |
| 1454 | fn | syncCoreOptionsArray | (private) | `function syncCoreOptionsArray(globalKey, functi...` |
| 1484 | fn | readCoreDeviceSelectionHelper | (private) | `function readCoreDeviceSelectionHelper() {` |
| 1499 | fn | refreshDeviceListsSafe | (private) | `function refreshDeviceListsSafe() {` |
| 1520 | fn | hasAnyDeviceSelectionSafe | (private) | `function hasAnyDeviceSelectionSafe(state) {` |
| 1585 | fn | getEventsCoreValue | (private) | `function getEventsCoreValue(functionName) {` |
| 1604 | fn | storeLoadedSetupStateSafe | (private) | `function storeLoadedSetupStateSafe(state) {` |
| 1609 | fn | resolveCineUi | (private) | `function resolveCineUi() {` |
| 1630 | fn | getSetupSelectElement | (private) | `function getSetupSelectElement() {` |
| 1642 | fn | addSafeEventListener | (private) | `function addSafeEventListener(target, type, han...` |
| 1684 | fn | enqueueCineUiRegistration | (private) | `function enqueueCineUiRegistration(callback) {` |
| 1735 | fn | handleSaveSetupClick | (private) | `function handleSaveSetupClick(optionsOrEvent) {` |
| 1932 | fn | handleDeleteSetupClick | (private) | `function handleDeleteSetupClick() {` |
| 2043 | fn | resetSetupStateToDefaults | (private) | `function resetSetupStateToDefaults() {` |
| 2165 | fn | finalizeSetupSelection | (private) | `function finalizeSetupSelection(nextSetupName) {` |
| 2481 | fn | populateSetupSelect | (private) | `function populateSetupSelect() {` |
| 2545 | fn | notifyAutoSaveFromBackup | (private) | `function notifyAutoSaveFromBackup(message, back...` |
| 2581 | fn | createStableValueSignature | (private) | `function createStableValueSignature(value) {` |
| 2646 | fn | computeAutoBackupStateSignature | (private) | `function computeAutoBackupStateSignature(setupS...` |
| 2653 | fn | hasMeaningfulAutoBackupContent | (private) | `function hasMeaningfulAutoBackupContent(setupSt...` |
| 2663 | fn | getSortedAutoBackupNames | (private) | `function getSortedAutoBackupNames(setups) {` |
| 2671 | fn | resolveLatestAutoBackupEntry | (private) | `function resolveLatestAutoBackupEntry(setups) {` |
| 2686 | fn | computeStoredAutoBackupSignature | (private) | `function computeStoredAutoBackupSignature(name,...` |
| 2712 | fn | ensureLastAutoBackupSignatureInitialized | (private) | `function ensureLastAutoBackupSignatureInitializ...` |
| 2738 | fn | readAutoBackupMetadata | (private) | `function readAutoBackupMetadata(entry) {` |
| 2748 | fn | attachAutoBackupMetadata | (private) | `function attachAutoBackupMetadata(target, metad...` |
| 2776 | fn | determineNextAutoBackupPlan | (private) | `function determineNextAutoBackupPlan(setups) {` |
| 2816 | fn | autoBackup | (private) | `function autoBackup() {` |
| 3205 | fn | ensureAutoBackupBeforeDeletion | (private) | `function ensureAutoBackupBeforeDeletion(context) {` |
| 3281 | fn | getQueuedBackupBannerTexts | (private) | `function getQueuedBackupBannerTexts() {` |
| 3292 | fn | ensureQueuedBackupBannerElements | (private) | `function ensureQueuedBackupBannerElements() {` |
| 3359 | fn | showQueuedBackupBanner | (private) | `function showQueuedBackupBanner(count, fallback...` |
| 3379 | fn | hideQueuedBackupBanner | (private) | `function hideQueuedBackupBanner() {` |
| 3386 | fn | attachQueuedBackupGestureListeners | (private) | `function attachQueuedBackupGestureListeners() {` |
| 3403 | fn | detachQueuedBackupGestureListeners | (private) | `function detachQueuedBackupGestureListeners() {` |
| 3420 | fn | handleQueuedBackupGesture | (private) | `function handleQueuedBackupGesture() {` |
| 3423 | fn | requestQueuedBackupFlush | (private) | `function requestQueuedBackupFlush(trigger) {` |
| 3436 | fn | updateQueuedBackupBannerFromVault | (private) | `function updateQueuedBackupBannerFromVault() {` |
| 3459 | fn | flushQueuedBackupVault | (private) | `function flushQueuedBackupVault(_x) {` |
| 3462 | fn | _flushQueuedBackupVault | (private) | `function _flushQueuedBackupVault() {` |
| 3565 | fn | handleQueuedBackupVaultQueuedEvent | (private) | `function handleQueuedBackupVaultQueuedEvent() {` |
| 3569 | fn | handleQueuedBackupFallbackChangedEvent | (private) | `function handleQueuedBackupFallbackChangedEvent...` |
| 3572 | fn | scheduleAutoBackupTimer | (private) | `function scheduleAutoBackupTimer() {` |
| 3594 | fn | scheduleAutoGearBackupTimer | (private) | `function scheduleAutoGearBackupTimer() {` |
| 3616 | fn | queueScheduledFullBackup | (private) | `function queueScheduledFullBackup() {` |
| 3645 | fn | scheduleHourlyBackupTimer | (private) | `function scheduleHourlyBackupTimer() {` |
| 3675 | fn | showDeviceManagerSection | (private) | `function showDeviceManagerSection() {` |
| 3694 | fn | hideDeviceManagerSection | (private) | `function hideDeviceManagerSection() {` |
| 3711 | fn | toggleDeviceManagerSection | (private) | `function toggleDeviceManagerSection() {` |
| 3721 | fn | bindDeviceManagerToggleHandler | (private) | `function bindDeviceManagerToggleHandler() {` |
| 3764 | fn | getEventsLanguageTexts | (private) | `function getEventsLanguageTexts() {` |
| 3775 | fn | resolveAutoBackupIndicatorMessage | (private) | `function resolveAutoBackupIndicatorMessage() {` |
| 3781 | fn | registerEventsCineUiInternal | (private) | `function registerEventsCineUiInternal(cineUi) {` |
| 3824 | fn | registerEventsCineUi | (private) | `function registerEventsCineUi() {` |
| 3833 | fn | toggleDeviceDetails | (private) | `function toggleDeviceDetails(button) {` |
| 3876 | fn | inferDeviceCategory | (private) | `function inferDeviceCategory(key, data) {` |
| 3890 | fn | resolveDefaultLensMountType | (private) | `function resolveDefaultLensMountType() {` |
| 3929 | fn | normalizeLensFocusScale | (private) | `function normalizeLensFocusScale(value) {` |
| 3946 | fn | applyCameraFizConnectors | (private) | `function applyCameraFizConnectors(connectors) {` |
| 3999 | fn | applyCameraTimecodes | (private) | `function applyCameraTimecodes(timecodes) {` |
| 4073 | fn | populateDeviceForm | (private) | `function populateDeviceForm(categoryKey, device...` |
| 4637 | fn | resetDeviceForm | (private) | `function resetDeviceForm() {` |
| 4660 | fn | clearDeviceManagerFilterForCategory | (private) | `function clearDeviceManagerFilterForCategory(ca...` |
| 4695 | fn | applyDynamicFieldsToDevice | (private) | `function applyDynamicFieldsToDevice(container, ...` |

