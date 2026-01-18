# legacy/scripts/core/app-core-new-1.js

[← Back to Module](../modules/legacy-scripts-core/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 18123
- **Language:** JavaScript
- **Symbols:** 447
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 2 | fn | _createForOfIteratorHelper | (private) | `function _createForOfIteratorHelper(r, e) { var...` |
| 3 | fn | _toConsumableArray | (private) | `function _toConsumableArray(r) { return _arrayW...` |
| 4 | fn | _nonIterableSpread | (private) | `function _nonIterableSpread() { throw new TypeE...` |
| 5 | fn | _iterableToArray | (private) | `function _iterableToArray(r) { if ("undefined" ...` |
| 6 | fn | _arrayWithoutHoles | (private) | `function _arrayWithoutHoles(r) { if (Array.isAr...` |
| 7 | fn | _regenerator | (private) | `function _regenerator() { var e, t, r = "functi...` |
| 8 | fn | _regeneratorDefine2 | (private) | `function _regeneratorDefine2(e, r, n, t) { var ...` |
| 9 | fn | asyncGeneratorStep | (private) | `function asyncGeneratorStep(n, t, e, r, o, a, c...` |
| 10 | fn | _asyncToGenerator | (private) | `function _asyncToGenerator(n) { return function...` |
| 11 | fn | ownKeys | (private) | `function ownKeys(e, r) { var t = Object.keys(e)...` |
| 12 | fn | _objectSpread | (private) | `function _objectSpread(e) { for (var r = 1; r <...` |
| 13 | fn | _defineProperty | (private) | `function _defineProperty(e, r, t) { return (r =...` |
| 14 | fn | _toPropertyKey | (private) | `function _toPropertyKey(t) { var i = _toPrimiti...` |
| 15 | fn | _toPrimitive | (private) | `function _toPrimitive(t, r) { if ("object" != _...` |
| 16 | fn | _slicedToArray | (private) | `function _slicedToArray(r, e) { return _arrayWi...` |
| 17 | fn | _nonIterableRest | (private) | `function _nonIterableRest() { throw new TypeErr...` |
| 18 | fn | _unsupportedIterableToArray | (private) | `function _unsupportedIterableToArray(r, a) { if...` |
| 19 | fn | _arrayLikeToArray | (private) | `function _arrayLikeToArray(r, a) { (null == a |...` |
| 20 | fn | _iterableToArrayLimit | (private) | `function _iterableToArrayLimit(r, l) { var t = ...` |
| 21 | fn | _arrayWithHoles | (private) | `function _arrayWithHoles(r) { if (Array.isArray...` |
| 22 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 47 | fn | pushScope | (private) | `function pushScope(scope) {` |
| 216 | fn | resolveFeedbackTemperatureBound | (private) | `function resolveFeedbackTemperatureBound(boundK...` |
| 360 | fn | iconMarkup | (private) | `function iconMarkup(glyph) {` |
| 674 | fn | dispatchTemperatureNoteRender | (private) | `function dispatchTemperatureNoteRender(hours) {` |
| 730 | fn | exposeCoreRuntimeBindings | (private) | `function exposeCoreRuntimeBindings(bindings) {` |
| 769 | fn | runCoreRuntimeSegment | (private) | `function runCoreRuntimeSegment(executor) {` |
| 797 | fn | resolveCoreShared | (private) | `function resolveCoreShared() {` |
| 811 | fn | resolveCoreRuntimeHelpers | (private) | `function resolveCoreRuntimeHelpers() {` |
| 857 | fn | createCoreRuntimeStateFallback | (private) | `function createCoreRuntimeStateFallback(candida...` |
| 860 | fn | registerScope | (private) | `function registerScope(scope) {` |
| 886 | fn | withEachScope | (private) | `function withEachScope(callback) {` |
| 898 | fn | getScopes | (private) | `function getScopes() {` |
| 901 | fn | getPrimaryScope | (private) | `function getPrimaryScope() {` |
| 904 | fn | ensureValue | (private) | `function ensureValue(name, fallbackValue) {` |
| 937 | fn | normaliseValue | (private) | `function normaliseValue(name, validator, fallba...` |
| 954 | fn | readValue | (private) | `function readValue(name) {` |
| 971 | fn | assignTemperatureRenderer | (private) | `function assignTemperatureRenderer(renderer) {` |
| 1008 | fn | getAssignedTemperatureRenderer | (private) | `function getAssignedTemperatureRenderer() {` |
| 1019 | fn | setAutoGearGuards | (private) | `function setAutoGearGuards(nextGuards) {` |
| 1044 | fn | createCoreRuntimeState | (private) | `function createCoreRuntimeState(candidateScopes) {` |
| 1078 | fn | isAutoGearGlobalReferenceError | (private) | `function isAutoGearGlobalReferenceError(error) {` |
| 1093 | fn | repairAutoGearGlobals | (private) | `function repairAutoGearGlobals(scope) {` |
| 1107 | fn | callCoreFunctionIfAvailable | (private) | `function callCoreFunctionIfAvailable(functionNa...` |
| 1172 | fn | safeFormatAutoGearItemSummary | (private) | `function safeFormatAutoGearItemSummary(item) {` |
| 1199 | fn | formatWithPlaceholdersSafe | (private) | `function formatWithPlaceholdersSafe(template) {` |
| 1324 | fn | fallbackResolveConnectorSummaryGenerator | (private) | `function fallbackResolveConnectorSummaryGenerat...` |
| 1407 | fn | resolveAppVersionScope | (private) | `function resolveAppVersionScope() {` |
| 1422 | fn | extractAppVersion | (private) | `function extractAppVersion(candidate) {` |
| 1440 | fn | resolveAppVersionValue | (private) | `function resolveAppVersionValue() {` |
| 1472 | fn | resolveInstallBannerGlobalScope | (private) | `function resolveInstallBannerGlobalScope() {` |
| 1492 | fn | createHelpModuleFallback | (private) | `function createHelpModuleFallback() {` |
| 1521 | fn | resolveHelpModuleApi | (private) | `function resolveHelpModuleApi() {` |
| 1527 | fn | logModuleWarning | (private) | `function logModuleWarning(message, error) {` |
| 1644 | fn | cacheFeatureModule | (private) | `function cacheFeatureModule(globalScope, cacheK...` |
| 1662 | fn | resolveLegacyContactsOwnGearModule | (private) | `function resolveLegacyContactsOwnGearModule() {` |
| 1711 | fn | resolveContactsModule | (private) | `function resolveContactsModule() {` |
| 1760 | fn | resolveOwnGearModule | (private) | `function resolveOwnGearModule() {` |
| 1812 | fn | resolveCoreDeviceSchema | (private) | `function resolveCoreDeviceSchema() {` |
| 1956 | fn | createFallbackProfileController | (private) | `function createFallbackProfileController() {` |
| 2163 | fn | resolveAutoGearStorageKey | (private) | `function resolveAutoGearStorageKey(symbolName, ...` |
| 2180 | fn | readGlobalAutoGearValue | (private) | `function readGlobalAutoGearValue(propertyName) {` |
| 2198 | fn | resolveAutoGearBackupRetentionMin | (private) | `function resolveAutoGearBackupRetentionMin() {` |
| 2216 | fn | resolveAutoGearBackupRetentionDefault | (private) | `function resolveAutoGearBackupRetentionDefault() {` |
| 2414 | fn | updateAutoGearItemButtonState | (private) | `function updateAutoGearItemButtonState(type) {` |
| 2429 | fn | getAutoGearBackupEntrySignature | (private) | `function getAutoGearBackupEntrySignature(entry) {` |
| 2437 | fn | getAutoGearConfigurationSignature | (private) | `function getAutoGearConfigurationSignature() {` |
| 2445 | fn | getAutoGearMonitorDefaultsSnapshot | (private) | `function getAutoGearMonitorDefaultsSnapshot() {` |
| 2465 | fn | assignAutoGearRules | (private) | `function assignAutoGearRules(rules) {` |
| 2469 | fn | syncBaseAutoGearRulesState | (private) | `function syncBaseAutoGearRulesState() {` |
| 2474 | fn | persistAutoGearRules | (private) | `function persistAutoGearRules() {` |
| 2490 | fn | getAutoGearMonitorDefault | (private) | `function getAutoGearMonitorDefault(key) {` |
| 2496 | fn | getAutoGearMonitorDefaults | (private) | `function getAutoGearMonitorDefaults() {` |
| 2499 | fn | setAutoGearMonitorDefaults | (private) | `function setAutoGearMonitorDefaults(defaults) {` |
| 2540 | fn | setAutoGearMonitorDefault | (private) | `function setAutoGearMonitorDefault(key, value) {` |
| 2562 | fn | setAutoGearRules | (private) | `function setAutoGearRules(rules) {` |
| 2580 | fn | getAutoGearRules | (private) | `function getAutoGearRules() {` |
| 2583 | fn | getEnabledAutoGearRules | (private) | `function getEnabledAutoGearRules() {` |
| 2588 | fn | syncAutoGearRulesFromStorage | (private) | `function syncAutoGearRulesFromStorage(rules) {` |
| 2640 | fn | useProjectAutoGearRules | (private) | `function useProjectAutoGearRules(rules) {` |
| 2648 | fn | clearProjectAutoGearRules | (private) | `function clearProjectAutoGearRules() {` |
| 2657 | fn | getProjectScopedAutoGearRules | (private) | `function getProjectScopedAutoGearRules() {` |
| 2661 | fn | usingProjectAutoGearRules | (private) | `function usingProjectAutoGearRules() {` |
| 2664 | fn | getBaseAutoGearRules | (private) | `function getBaseAutoGearRules() {` |
| 2667 | fn | autoGearRuleSignature | (private) | `function autoGearRuleSignature(rule) {` |
| 2672 | fn | mergeAutoGearRules | (private) | `function mergeAutoGearRules(existing, incoming) {` |
| 2685 | fn | looksLikeGearName | (private) | `function looksLikeGearName(name) {` |
| 2688 | fn | hasSeededAutoGearDefaults | (private) | `function hasSeededAutoGearDefaults() {` |
| 2705 | fn | markAutoGearDefaultsSeeded | (private) | `function markAutoGearDefaultsSeeded() {` |
| 2721 | fn | clearAutoGearDefaultsSeeded | (private) | `function clearAutoGearDefaultsSeeded() {` |
| 2737 | fn | parseGearTableForAutoRules | (private) | `function parseGearTableForAutoRules(html) {` |
| 2768 | fn | diffGearTableMaps | (private) | `function diffGearTableMaps(baseMap, variantMap) {` |
| 2803 | fn | collectAutoGearCatalogNames | (private) | `function collectAutoGearCatalogNames() {` |
| 2841 | fn | normalizeAutoGearMonitorCatalogMode | (private) | `function normalizeAutoGearMonitorCatalogMode(va...` |
| 2851 | fn | collectAutoGearMonitorNames | (private) | `function collectAutoGearMonitorNames() {` |
| 2895 | fn | collectAutoGearSelectorValuesFromRules | (private) | `function collectAutoGearSelectorValuesFromRules...` |
| 2916 | fn | collectAutoGearTripodNames | (private) | `function collectAutoGearTripodNames(type) {` |
| 2945 | fn | collectAutoGearSelectorDefaultEntries | (private) | `function collectAutoGearSelectorDefaultEntries(...` |
| 2961 | fn | updateAutoGearMonitorCatalogOptions | (private) | `function updateAutoGearMonitorCatalogOptions() {` |
| 3068 | fn | getElementHeight | (private) | `function getElementHeight(element) {` |
| 3076 | fn | setInstallBannerOffset | (private) | `function setInstallBannerOffset(offset) {` |
| 3088 | fn | scheduleInstallBannerPositionUpdate | (private) | `function scheduleInstallBannerPositionUpdate() {` |
| 3101 | fn | updateInstallBannerPosition | (private) | `function updateInstallBannerPosition() {` |
| 3124 | fn | setupOfflineIndicator | (private) | `function setupOfflineIndicator() {` |
| 3548 | fn | closeSideMenu | (private) | `function closeSideMenu() {` |
| 3566 | fn | openSideMenu | (private) | `function openSideMenu() {` |
| 3585 | fn | setupSideMenu | (private) | `function setupSideMenu() {` |
| 3662 | fn | setupResponsiveControls | (private) | `function setupResponsiveControls() {` |
| 3698 | fn | detectOwnGearGlobalScope | (private) | `function detectOwnGearGlobalScope() {` |
| 3716 | fn | resolveOwnGearStoreModule | (private) | `function resolveOwnGearStoreModule() {` |
| 3742 | fn | getOwnGearStore | (private) | `function getOwnGearStore() {` |
| 3757 | fn | resolveOwnGearViewModule | (private) | `function resolveOwnGearViewModule() {` |
| 3783 | fn | resolveOwnGearViewOptions | (private) | `function resolveOwnGearViewOptions() {` |
| 3805 | fn | getOwnGearView | (private) | `function getOwnGearView() {` |
| 3822 | fn | invalidateAutoGearOwnGearCache | (private) | `function invalidateAutoGearOwnGearCache() {` |
| 3837 | fn | refreshAutoGearOwnGearCache | (private) | `function refreshAutoGearOwnGearCache() {` |
| 3874 | fn | getAutoGearOwnGearCache | (private) | `function getAutoGearOwnGearCache() {` |
| 3892 | fn | getAutoGearOwnGearItems | (private) | `function getAutoGearOwnGearItems() {` |
| 3895 | fn | findAutoGearOwnGearById | (private) | `function findAutoGearOwnGearById(id) {` |
| 3908 | fn | generateOwnGearId | (private) | `function generateOwnGearId() {` |
| 3936 | fn | normalizeOwnGearRecord | (private) | `function normalizeOwnGearRecord(entry) {` |
| 3977 | fn | loadStoredOwnGearItems | (private) | `function loadStoredOwnGearItems() {` |
| 4016 | fn | persistOwnGearItems | (private) | `function persistOwnGearItems() {` |
| 4065 | fn | formatOwnGearQuantityText | (private) | `function formatOwnGearQuantityText(quantity) {` |
| 4080 | fn | openOwnGearDialog | (private) | `function openOwnGearDialog() {` |
| 4090 | fn | applyOwnGearLocalization | (private) | `function applyOwnGearLocalization(lang) {` |
| 4100 | fn | initializeLayoutControls | (private) | `function initializeLayoutControls() {` |
| 4104 | fn | initializeOwnGearManager | (private) | `function initializeOwnGearManager() {` |
| 4226 | fn | cloneProjectEntryForSetup | (private) | `function cloneProjectEntryForSetup(projectEntry) {` |
| 4249 | fn | ensureAutoBackupsFromProjects | (private) | `function ensureAutoBackupsFromProjects() {` |
| 4272 | fn | getSetups | (private) | `function getSetups() {` |
| 4276 | fn | storeSetups | (private) | `function storeSetups(setups) {` |
| 4280 | fn | storeDevices | (private) | `function storeDevices(deviceData) {` |
| 4283 | fn | loadSession | (private) | `function loadSession() {` |
| 4287 | fn | storeSession | (private) | `function storeSession(state) {` |
| 4293 | fn | toggleDialog | (private) | `function toggleDialog(dialog, shouldOpen) {` |
| 4307 | fn | openDialog | (private) | `function openDialog(dialog) {` |
| 4310 | fn | closeDialog | (private) | `function closeDialog(dialog) {` |
| 4313 | fn | isDialogOpen | (private) | `function isDialogOpen(dialog) {` |
| 4327 | fn | resolveUpdateDevicesReferenceFunction | (private) | `function resolveUpdateDevicesReferenceFunction() {` |
| 4426 | fn | getBatteryPlateSupport | (private) | `function getBatteryPlateSupport(name) {` |
| 4439 | fn | getSupportedBatteryPlates | (private) | `function getSupportedBatteryPlates(name) {` |
| 4444 | fn | getAvailableBatteryPlates | (private) | `function getAvailableBatteryPlates(name) {` |
| 4457 | fn | supportsMountCamera | (private) | `function supportsMountCamera(name, mountType) {` |
| 4460 | fn | supportsBMountCamera | (private) | `function supportsBMountCamera(name) {` |
| 4463 | fn | supportsGoldMountCamera | (private) | `function supportsGoldMountCamera(name) {` |
| 4466 | fn | getBatteriesByMount | (private) | `function getBatteriesByMount(mountType) {` |
| 4477 | fn | getHotswapsByMount | (private) | `function getHotswapsByMount(mountType) {` |
| 4487 | fn | getBatteryMountType | (private) | `function getBatteryMountType(batteryName) {` |
| 4498 | fn | normalizeBatteryPlateValue | (private) | `function normalizeBatteryPlateValue(plateValue,...` |
| 4509 | fn | ensureBatteryPlateElements | (private) | `function ensureBatteryPlateElements() {` |
| 4518 | fn | applyBatteryPlateSelectionFromBattery | (private) | `function applyBatteryPlateSelectionFromBattery(...` |
| 4537 | fn | getSelectedPlate | (private) | `function getSelectedPlate() {` |
| 4552 | fn | isSelectedPlateNative | (private) | `function isSelectedPlateNative(camName) {` |
| 4560 | fn | shortConnLabel | (private) | `function shortConnLabel(type) {` |
| 4564 | fn | formatConnLabel | (private) | `function formatConnLabel(from, to) {` |
| 4577 | fn | getFizConnectorTypes | (private) | `function getFizConnectorTypes(device) {` |
| 4586 | fn | controllerCamPort | (private) | `function controllerCamPort(name) {` |
| 4606 | fn | controllerDistancePort | (private) | `function controllerDistancePort(name) {` |
| 4615 | fn | controllerPriority | (private) | `function controllerPriority(name) {` |
| 4620 | fn | motorPriority | (private) | `function motorPriority(name) {` |
| 4626 | fn | isArriOrCmotion | (private) | `function isArriOrCmotion(name) {` |
| 4629 | fn | isArri | (private) | `function isArri(name) {` |
| 4632 | fn | fizNeedsPower | (private) | `function fizNeedsPower(name) {` |
| 4640 | fn | firstConnector | (private) | `function firstConnector(str) {` |
| 4644 | fn | getFizPort | (private) | `function getFizPort(device) {` |
| 4674 | fn | cameraFizPort | (private) | `function cameraFizPort(camName, controllerPort) {` |
| 4691 | fn | controllerFizPort | (private) | `function controllerFizPort(name) {` |
| 4700 | fn | motorFizPort | (private) | `function motorFizPort(name) {` |
| 4706 | fn | distanceFizPort | (private) | `function distanceFizPort(name) {` |
| 4714 | fn | fizPort | (private) | `function fizPort(name) {` |
| 4721 | fn | fizPowerPort | (private) | `function fizPowerPort(name) {` |
| 4725 | fn | sdiRate | (private) | `function sdiRate(type) {` |
| 4730 | fn | connectionLabel | (private) | `function connectionLabel(outType, inType) {` |
| 4745 | fn | updateBatteryPlateVisibility | (private) | `function updateBatteryPlateVisibility() {` |
| 4785 | fn | updateViewfinderSettingsVisibility | (private) | `function updateViewfinderSettingsVisibility() {` |
| 4805 | fn | updateMonitoringConfigurationOptions | (private) | `function updateMonitoringConfigurationOptions() {` |
| 4833 | fn | updateViewfinderExtensionVisibility | (private) | `function updateViewfinderExtensionVisibility() {` |
| 4849 | fn | updateBatteryLabel | (private) | `function updateBatteryLabel() {` |
| 4881 | fn | updateBatteryOptions | (private) | `function updateBatteryOptions() {` |
| 4991 | fn | detectBrand | (private) | `function detectBrand(name) {` |
| 5010 | fn | setStatusLevel | (private) | `function setStatusLevel(element, level) {` |
| 5050 | fn | formatStatusMessage | (private) | `function formatStatusMessage(message) {` |
| 5065 | fn | setStatusMessage | (private) | `function setStatusMessage(element, message) {` |
| 5073 | fn | formatCurrentValue | (private) | `function formatCurrentValue(value) {` |
| 5079 | fn | checkFizCompatibility | (private) | `function checkFizCompatibility() {` |
| 5125 | fn | checkFizController | (private) | `function checkFizController() {` |
| 5188 | fn | checkArriCompatibility | (private) | `function checkArriCompatibility() {` |
| 5273 | fn | resolveTranslationsRuntime | (private) | `function resolveTranslationsRuntime() {` |
| 5275 | fn | resolveGlobalScopeForTranslations | (private) | `function resolveGlobalScopeForTranslations() {` |
| 5577 | fn | resolveFocusScalePreference | (private) | `function resolveFocusScalePreference() {` |
| 5602 | fn | normalizeFocusScaleForLabel | (private) | `function normalizeFocusScaleForLabel(value) {` |
| 5641 | fn | getFocusScaleLabelForLang | (private) | `function getFocusScaleLabelForLang() {` |
| 5762 | fn | resolveLanguagePreference | (private) | `function resolveLanguagePreference(candidate) {` |
| 5821 | fn | setLanguage | (private) | `function setLanguage(_x) {` |
| 5824 | fn | _setLanguage | (private) | `function _setLanguage() {` |
| 9415 | fn | resolveContactsDomRefs | (private) | `function resolveContactsDomRefs() {` |
| 9468 | fn | getCrewRoleLabels | (private) | `function getCrewRoleLabels() {` |
| 9473 | fn | populateUserProfileRoleSelect | (private) | `function populateUserProfileRoleSelect() {` |
| 9505 | fn | ensureUserProfileRoleOption | (private) | `function ensureUserProfileRoleOption(roleValue) {` |
| 9556 | fn | updateSelectIconBoxes | (private) | `function updateSelectIconBoxes(sel) {` |
| 9600 | fn | getLocalizedPathText | (private) | `function getLocalizedPathText(path) {` |
| 9625 | fn | configureIconOnlyButton | (private) | `function configureIconOnlyButton(button, glyph) {` |
| 9668 | fn | sanitizeForId | (private) | `function sanitizeForId(value) {` |
| 9674 | fn | ensureElementId | (private) | `function ensureElementId(element) {` |
| 9687 | fn | createHiddenLabel | (private) | `function createHiddenLabel(forId, text) {` |
| 9706 | fn | getProjectFormText | (private) | `function getProjectFormText(key) {` |
| 9717 | fn | resolveContactsStorageKey | (private) | `function resolveContactsStorageKey() {` |
| 9756 | fn | getContactsText | (private) | `function getContactsText(key) {` |
| 9766 | fn | generateContactId | (private) | `function generateContactId() {` |
| 9777 | fn | sanitizeContactValue | (private) | `function sanitizeContactValue(value) {` |
| 9780 | fn | normalizeContactEntry | (private) | `function normalizeContactEntry(entry) {` |
| 9783 | fn | sortContacts | (private) | `function sortContacts(list) {` |
| 9786 | fn | loadStoredContacts | (private) | `function loadStoredContacts() {` |
| 9808 | fn | saveContactsToStorage | (private) | `function saveContactsToStorage(contacts) {` |
| 9826 | fn | getContactById | (private) | `function getContactById(id) {` |
| 9832 | fn | getContactDisplayLabel | (private) | `function getContactDisplayLabel(contact) {` |
| 9843 | fn | ensureContactForImportedOwner | (private) | `function ensureContactForImportedOwner(ownerNam...` |
| 9910 | fn | setContactSelectOptions | (private) | `function setContactSelectOptions(select, select...` |
| 9950 | fn | updateContactPickers | (private) | `function updateContactPickers() {` |
| 9958 | fn | getAvatarInitial | (private) | `function getAvatarInitial(value) {` |
| 9965 | fn | updateAvatarVisual | (private) | `function updateAvatarVisual(container, avatarVa...` |
| 9984 | fn | setRowAvatar | (private) | `function setRowAvatar(row, avatarValue) {` |
| 9996 | fn | parseDataUrlMimeType | (private) | `function parseDataUrlMimeType(dataUrl) {` |
| 10002 | fn | updateAvatarOptionsPreview | (private) | `function updateAvatarOptionsPreview(avatarValue...` |
| 10007 | fn | refreshAvatarOptionsActions | (private) | `function refreshAvatarOptionsActions() {` |
| 10021 | fn | stopAvatarEditing | (private) | `function stopAvatarEditing() {` |
| 10050 | fn | closeAvatarOptionsDialog | (private) | `function closeAvatarOptionsDialog() {` |
| 10056 | fn | handleAvatarOptionsDialogClosed | (private) | `function handleAvatarOptionsDialogClosed() {` |
| 10060 | fn | openAvatarOptionsDialog | (private) | `function openAvatarOptionsDialog() {` |
| 10081 | fn | clampAvatarEditOffsets | (private) | `function clampAvatarEditOffsets(state) {` |
| 10088 | fn | updateAvatarEditMetrics | (private) | `function updateAvatarEditMetrics(state) {` |
| 10103 | fn | measureAvatarEditViewportSize | (private) | `function measureAvatarEditViewportSize() {` |
| 10136 | fn | initializeAvatarEditState | (private) | `function initializeAvatarEditState(dataUrl) {` |
| 10193 | fn | startAvatarEditing | (private) | `function startAvatarEditing() {` |
| 10208 | fn | handleAvatarEditZoomInputChange | (private) | `function handleAvatarEditZoomInputChange(event) {` |
| 10228 | fn | handleAvatarEditPointerDown | (private) | `function handleAvatarEditPointerDown(event) {` |
| 10243 | fn | handleAvatarEditPointerMove | (private) | `function handleAvatarEditPointerMove(event) {` |
| 10254 | fn | clearAvatarEditPointerState | (private) | `function clearAvatarEditPointerState() {` |
| 10258 | fn | handleAvatarEditPointerUp | (private) | `function handleAvatarEditPointerUp(event) {` |
| 10271 | fn | handleAvatarEditPointerCancel | (private) | `function handleAvatarEditPointerCancel(event) {` |
| 10283 | fn | handleAvatarEditKeyDown | (private) | `function handleAvatarEditKeyDown(event) {` |
| 10313 | fn | exportAvatarEditResult | (private) | `function exportAvatarEditResult() {` |
| 10340 | fn | applyAvatarEditChanges | (private) | `function applyAvatarEditChanges() {` |
| 10358 | fn | handleAvatarDeleteAction | (private) | `function handleAvatarDeleteAction() {` |
| 10371 | fn | handleAvatarChangeAction | (private) | `function handleAvatarChangeAction() {` |
| 10377 | fn | handleAvatarEditAction | (private) | `function handleAvatarEditAction() {` |
| 10380 | fn | handleAvatarEditCancel | (private) | `function handleAvatarEditCancel() {` |
| 10385 | fn | handleAvatarDrop | (private) | `function handleAvatarDrop(event) {` |
| 10395 | fn | handleAvatarDragOver | (private) | `function handleAvatarDragOver(event) {` |
| 10401 | fn | handleAvatarDragLeave | (private) | `function handleAvatarDragLeave(event) {` |
| 10407 | fn | handleAvatarUpload | (private) | `function handleAvatarUpload(event) {` |
| 10414 | fn | processAvatarFile | (private) | `function processAvatarFile(file) {` |
| 10424 | fn | handleAvatarSave | (private) | `function handleAvatarSave() {` |
| 10434 | fn | handleAvatarOptionsDialogPointerDown | (private) | `function handleAvatarOptionsDialogPointerDown(e...` |
| 10454 | fn | dispatchGearProviderDataChanged | (private) | `function dispatchGearProviderDataChanged(reason) {` |
| 10466 | fn | getContactsSnapshot | (private) | `function getContactsSnapshot() {` |
| 10492 | fn | assignUserProfileState | (private) | `function assignUserProfileState() {` |
| 10497 | fn | getUserProfileSnapshot | (private) | `function getUserProfileSnapshot() {` |
| 10509 | fn | applyUserProfileToDom | (private) | `function applyUserProfileToDom() {` |
| 10571 | fn | loadUserProfileState | (private) | `function loadUserProfileState() {` |
| 10579 | fn | setAvatar | (private) | `function setAvatar(dataUrl) {` |
| 10585 | fn | clearAvatar | (private) | `function clearAvatar() {` |
| 10605 | fn | persistUserProfileState | (private) | `function persistUserProfileState() {` |
| 10619 | fn | handleUserProfileNameInput | (private) | `function handleUserProfileNameInput() {` |
| 10635 | fn | handleUserProfileRoleInput | (private) | `function handleUserProfileRoleInput() {` |
| 10653 | fn | handleUserProfilePhoneInput | (private) | `function handleUserProfilePhoneInput() {` |
| 10669 | fn | handleUserProfileEmailInput | (private) | `function handleUserProfileEmailInput() {` |
| 10685 | fn | handleUserProfileFieldBlur | (private) | `function handleUserProfileFieldBlur() {` |
| 10690 | fn | handleUserProfileAvatarCleared | (private) | `function handleUserProfileAvatarCleared() {` |
| 10704 | fn | handleUserProfileAvatarButtonClick | (private) | `function handleUserProfileAvatarButtonClick() {` |
| 10752 | fn | handleUserProfileAvatarInputChange | (private) | `function handleUserProfileAvatarInputChange() {` |
| 10780 | fn | refreshRowAvatarInitial | (private) | `function refreshRowAvatarInitial(row) {` |
| 10788 | fn | detachCrewRowContact | (private) | `function detachCrewRowContact(row) {` |
| 10801 | fn | updateRowLinkedBadge | (private) | `function updateRowLinkedBadge(row) {` |
| 10826 | fn | handleCrewRowManualChange | (private) | `function handleCrewRowManualChange(row) {` |
| 10839 | fn | handleAvatarFileSelection | (private) | `function handleAvatarFileSelection(row, file) {` |
| 10861 | fn | announceContactsMessage | (private) | `function announceContactsMessage(message) {` |
| 10866 | fn | applyContactToCrewRow | (private) | `function applyContactToCrewRow(row, contact) {` |
| 10932 | fn | updateCrewRowsForContact | (private) | `function updateCrewRowsForContact(contact) {` |
| 10943 | fn | getCrewRowSnapshot | (private) | `function getCrewRowSnapshot(row) {` |
| 10961 | fn | deleteContact | (private) | `function deleteContact(contactId) {` |
| 10982 | fn | saveCrewRowAsContact | (private) | `function saveCrewRowAsContact(row) {` |
| 11038 | fn | parseVCard | (private) | `function parseVCard(text) {` |
| 11043 | fn | mergeImportedContacts | (private) | `function mergeImportedContacts(imported) {` |
| 11084 | fn | createContactCard | (private) | `function createContactCard(contact) {` |
| 11341 | fn | renderContactsList | (private) | `function renderContactsList() {` |
| 11372 | fn | enableAvatarDragAndDrop | (private) | `function enableAvatarDragAndDrop(container, onF...` |
| 11398 | fn | initializeContactsModule | (private) | `function initializeContactsModule() {` |
| 11558 | fn | createCrewRow | (private) | `function createCrewRow() {` |
| 11827 | fn | createPrepRow | (private) | `function createPrepRow() {` |
| 11869 | fn | createShootRow | (private) | `function createShootRow() {` |
| 11911 | fn | createReturnRow | (private) | `function createReturnRow() {` |
| 11953 | fn | formatCapacity | (private) | `function formatCapacity(value, unit) {` |
| 11962 | fn | gatherMediaEntriesForType | (private) | `function gatherMediaEntriesForType(type) {` |
| 11985 | fn | getAvailableStorageMediaTypes | (private) | `function getAvailableStorageMediaTypes() {` |
| 12043 | fn | getStorageVariantOptions | (private) | `function getStorageVariantOptions(type) {` |
| 12135 | fn | updateStorageVariantOptions | (private) | `function updateStorageVariantOptions(select, ty...` |
| 12167 | fn | updateStorageRequirementTypeOptions | (private) | `function updateStorageRequirementTypeOptions() {` |
| 12209 | fn | createStorageRequirementRow | (private) | `function createStorageRequirementRow() {` |
| 12335 | fn | updateRequiredScenariosTranslations | (private) | `function updateRequiredScenariosTranslations(la...` |
| 12349 | fn | updateStorageRequirementTranslations | (private) | `function updateStorageRequirementTranslations(p...` |
| 12414 | fn | updateTripodOptions | (private) | `function updateTripodOptions() {` |
| 12486 | fn | updatePowerSummary | (private) | `function updatePowerSummary() {}` |
| 12487 | fn | closePowerWarningDialog | (private) | `function closePowerWarningDialog() {` |
| 12500 | fn | dismissPowerWarningDialog | (private) | `function dismissPowerWarningDialog() {` |
| 12509 | fn | showPowerWarningDialog | (private) | `function showPowerWarningDialog(context) {` |
| 12568 | fn | drawPowerDiagram | (private) | `function drawPowerDiagram(availableWatt, segmen...` |
| 12663 | fn | sanitizeShareFilename | (private) | `function sanitizeShareFilename(name) {` |
| 12670 | fn | ensureJsonExtension | (private) | `function ensureJsonExtension(filename) {` |
| 12674 | fn | getDefaultShareFilename | (private) | `function getDefaultShareFilename(setupName) {` |
| 12678 | fn | promptForSharedFilename | (private) | `function promptForSharedFilename(setupName) {` |
| 12699 | fn | confirmAutoGearSelection | (private) | `function confirmAutoGearSelection(defaultInclud...` |
| 12794 | fn | resolveSharedImportLocalVersion | (private) | `function resolveSharedImportLocalVersion() {` |
| 12809 | fn | formatSharedImportTimestamp | (private) | `function formatSharedImportTimestamp(timestamp) {` |
| 12834 | fn | formatSharedImportMetadataSummary | (private) | `function formatSharedImportMetadataSummary(meta...` |
| 12867 | fn | updateSharedImportMetadataSummary | (private) | `function updateSharedImportMetadataSummary(meta...` |
| 12880 | fn | cloneSharedImportValue | (private) | `function cloneSharedImportValue(value) {` |
| 12889 | fn | storeSharedImportData | (private) | `function storeSharedImportData(data, rules) {` |
| 12893 | fn | clearStoredSharedImportData | (private) | `function clearStoredSharedImportData() {` |
| 12899 | fn | resetSharedImportStateForFactoryReset | (private) | `function resetSharedImportStateForFactoryReset() {` |
| 12918 | fn | deactivateSharedImportProjectPreset | (private) | `function deactivateSharedImportProjectPreset() {` |
| 12933 | fn | activateSharedImportProjectPreset | (private) | `function activateSharedImportProjectPreset(pres...` |
| 12949 | fn | getSharedImportProjectName | (private) | `function getSharedImportProjectName(sharedData) {` |
| 12959 | fn | getSharedImportPresetLabel | (private) | `function getSharedImportPresetLabel(sharedData) {` |
| 12973 | fn | ensureSharedAutoGearPreset | (private) | `function ensureSharedAutoGearPreset(rules, shar...` |
| 13021 | fn | configureSharedImportOptions | (private) | `function configureSharedImportOptions(sharedRul...` |
| 13038 | fn | sharedImportRulesDiffer | (private) | `function sharedImportRulesDiffer(sharedRules) {` |
| 13049 | fn | applyStoredSharedImport | (private) | `function applyStoredSharedImport() {` |
| 13053 | fn | finalizeSharedImportPrompt | (private) | `function finalizeSharedImportPrompt() {` |
| 13057 | fn | openSharedImportPrompt | (private) | `function openSharedImportPrompt() {` |
| 13066 | fn | processSharedProjectData | (private) | `function processSharedProjectData(data) {` |
| 13088 | fn | readSharedProjectFile | (private) | `function readSharedProjectFile(file) {` |
| 13101 | fn | prepareSharedImportContext | (private) | `function prepareSharedImportContext() {` |
| 13145 | fn | reapplySharedImportSelection | (private) | `function reapplySharedImportSelection() {` |
| 13157 | fn | resolveSharedImportMode | (private) | `function resolveSharedImportMode(sharedRules) {` |
| 13187 | fn | encodeSharedSetup | (private) | `function encodeSharedSetup(setup) {` |
| 13204 | fn | decodeSharedSetup | (private) | `function decodeSharedSetup(setup) {` |
| 13258 | fn | resolveDeviceListContainer | (private) | `function resolveDeviceListContainer() {` |
| 13290 | fn | fallbackFilterSelect | (private) | `function fallbackFilterSelect(selectElem, filte...` |
| 13302 | fn | fallbackFilterDeviceList | (private) | `function fallbackFilterDeviceList(listElem, fil...` |
| 13314 | fn | fallbackAddInputClearButton | (private) | `function fallbackAddInputClearButton(inputElem,...` |
| 13343 | fn | fallbackBindFilterInput | (private) | `function fallbackBindFilterInput(inputElem, cal...` |
| 13357 | fn | ensureFilterHelpers | (private) | `function ensureFilterHelpers() {` |
| 13384 | fn | applyFilters | (private) | `function applyFilters() {` |
| 13408 | fn | getDeviceManagerPreferredOrder | (private) | `function getDeviceManagerPreferredOrder() {` |
| 13418 | fn | normalizeCategoryKey | (private) | `function normalizeCategoryKey(key) {` |
| 13428 | fn | getCategoryLabel | (private) | `function getCategoryLabel(categoryKey) {` |
| 13452 | fn | collectDeviceManagerCategories | (private) | `function collectDeviceManagerCategories() {` |
| 13534 | fn | createDeviceCategorySection | (private) | `function createDeviceCategorySection(categoryKe...` |
| 13596 | fn | updateDeviceManagerLocalization | (private) | `function updateDeviceManagerLocalization() {` |
| 13648 | fn | syncDeviceManagerCategories | (private) | `function syncDeviceManagerCategories() {` |
| 13684 | fn | getCurrentProjectName | (private) | `function getCurrentProjectName() {` |
| 13692 | fn | normalizeSetupName | (private) | `function normalizeSetupName(value) {` |
| 13698 | fn | getSetupNameState | (private) | `function getSetupNameState() {` |
| 13714 | fn | createProjectInfoSnapshotForStorage | (private) | `function createProjectInfoSnapshotForStorage(ba...` |
| 13730 | fn | getCurrentProjectStorageKey | (private) | `function getCurrentProjectStorageKey() {` |
| 13770 | fn | _populateCategoryOptions | (private) | `function _populateCategoryOptions() {` |
| 13843 | fn | getCategoryContainer | (private) | `function getCategoryContainer(categoryKey, subc...` |
| 13889 | fn | removeOriginalDeviceEntry | (private) | `function removeOriginalDeviceEntry(originalCate...` |
| 13934 | fn | normalizeTemperatureUnit | (private) | `function normalizeTemperatureUnit(unit) {` |
| 13949 | fn | getRuntimeTemperatureUnit | (private) | `function getRuntimeTemperatureUnit() {` |
| 13977 | fn | convertCelsiusToUnit | (private) | `function convertCelsiusToUnit(value, unit) {` |
| 13988 | fn | getTemperatureUnitSymbolForLang | (private) | `function getTemperatureUnitSymbolForLang() {` |
| 13997 | fn | getTemperatureUnitLabelForLang | (private) | `function getTemperatureUnitLabelForLang() {` |
| 14006 | fn | getTemperatureColumnLabelForLang | (private) | `function getTemperatureColumnLabelForLang() {` |
| 14015 | fn | formatTemperatureForDisplay | (private) | `function formatTemperatureForDisplay(celsius) {` |
| 14546 | fn | showFormSection | (private) | `function showFormSection(section) {` |
| 14555 | fn | hideFormSection | (private) | `function hideFormSection(section) {` |
| 14565 | fn | placeWattField | (private) | `function placeWattField(category, data) {` |
| 14620 | fn | resolveGlobalFocusScalePreference | (private) | `function resolveGlobalFocusScalePreference() {` |
| 14654 | fn | updateLensFocusScaleSelectOptions | (private) | `function updateLensFocusScaleSelectOptions() {` |
| 14896 | fn | formatAttributeLabel | (private) | `function formatAttributeLabel(attr) {` |
| 14901 | fn | resolveSchemaFieldConfig | (private) | `function resolveSchemaFieldConfig(category, att...` |
| 14913 | fn | autoRows | (private) | `function autoRows(text) {` |
| 14920 | fn | normalizeSchemaListValues | (private) | `function normalizeSchemaListValues(value) {` |
| 14933 | fn | createSchemaListControl | (private) | `function createSchemaListControl(options) {` |
| 15050 | fn | createSchemaField | (private) | `function createSchemaField(category, attr, valu...` |
| 15158 | fn | getSchemaAttributesForCategory | (private) | `function getSchemaAttributesForCategory(categor...` |
| 15177 | fn | getCombinedCategoryAttributes | (private) | `function getCombinedCategoryAttributes(category) {` |
| 15209 | fn | clearDynamicFields | (private) | `function clearDynamicFields() {` |
| 15217 | fn | buildDynamicFields | (private) | `function buildDynamicFields(category) {` |
| 15257 | fn | markCollectedDynamicAttributes | (private) | `function markCollectedDynamicAttributes(target,...` |
| 15271 | fn | getCollectedDynamicAttributes | (private) | `function getCollectedDynamicAttributes(source) {` |
| 15278 | fn | removeClearedDynamicAttributes | (private) | `function removeClearedDynamicAttributes(target,...` |
| 15288 | fn | collectDynamicFieldValues | (private) | `function collectDynamicFieldValues(category) {` |
| 15380 | fn | cloneDynamicFieldTarget | (private) | `function cloneDynamicFieldTarget(target) {` |
| 15421 | fn | ensureWritableDynamicFieldTarget | (private) | `function ensureWritableDynamicFieldTarget(targe...` |
| 15453 | fn | applyDynamicFieldValues | (private) | `function applyDynamicFieldValues(target, catego...` |
| 15524 | fn | ensureInstallPromptElements | (private) | `function ensureInstallPromptElements() {` |
| 15645 | fn | parseRgbComponent | (private) | `function parseRgbComponent(value) {` |
| 15661 | fn | parseColorToRgb | (private) | `function parseColorToRgb(color) {` |
| 15703 | fn | computeRelativeLuminance | (private) | `function computeRelativeLuminance(rgb) {` |
| 15718 | fn | isIosDevice | (private) | `function isIosDevice() {` |
| 15730 | fn | isAndroidDevice | (private) | `function isAndroidDevice() {` |
| 15742 | fn | isStandaloneDisplayMode | (private) | `function isStandaloneDisplayMode() {` |
| 15754 | fn | hasDismissedIosPwaHelp | (private) | `function hasDismissedIosPwaHelp() {` |
| 15766 | fn | markIosPwaHelpDismissed | (private) | `function markIosPwaHelpDismissed() {` |
| 15777 | fn | getInstallBannerDismissedInSession | (private) | `function getInstallBannerDismissedInSession() {` |
| 15787 | fn | setInstallBannerDismissedInSession | (private) | `function setInstallBannerDismissedInSession(val...` |
| 15793 | fn | hasDismissedInstallBanner | (private) | `function hasDismissedInstallBanner() {` |
| 15808 | fn | markInstallBannerDismissed | (private) | `function markInstallBannerDismissed() {` |
| 15817 | fn | shouldShowInstallBanner | (private) | `function shouldShowInstallBanner() {` |
| 15824 | fn | updateInstallBannerVisibility | (private) | `function updateInstallBannerVisibility() {` |
| 15842 | fn | updateInstallBannerColors | (private) | `function updateInstallBannerColors() {` |
| 15866 | fn | renderInstallGuideContent | (private) | `function renderInstallGuideContent(platform) {` |
| 15928 | fn | openInstallGuide | (private) | `function openInstallGuide(platform) {` |
| 15944 | fn | closeInstallGuide | (private) | `function closeInstallGuide() {` |
| 15957 | fn | setupInstallBanner | (private) | `function setupInstallBanner() {` |
| 16023 | fn | applyInstallTexts | (private) | `function applyInstallTexts(lang) {` |
| 16089 | fn | shouldShowIosPwaHelp | (private) | `function shouldShowIosPwaHelp() {` |
| 16103 | fn | openIosPwaHelp | (private) | `function openIosPwaHelp() {` |
| 16117 | fn | closeIosPwaHelp | (private) | `function closeIosPwaHelp() {` |
| 16132 | fn | maybeShowIosPwaHelp | (private) | `function maybeShowIosPwaHelp() {` |
| 16183 | fn | applySettingsTabsOrientation | (private) | `function applySettingsTabsOrientation(matches) {` |
| 16205 | fn | updateSettingsTabsOverflowIndicators | (private) | `function updateSettingsTabsOverflowIndicators() {` |
| 16235 | fn | scheduleSettingsTabsOverflowUpdate | (private) | `function scheduleSettingsTabsOverflowUpdate() {` |
| 16252 | fn | scrollSettingsTabs | (private) | `function scrollSettingsTabs(direction) {` |
| 16429 | fn | activateSettingsTab | (private) | `function activateSettingsTab(tabId) {` |
| 16603 | fn | getAutoGearConditionConfig | (private) | `function getAutoGearConditionConfig(key) {` |
| 16634 | fn | getAutoGearConditionLabel | (private) | `function getAutoGearConditionLabel(key) {` |
| 16651 | fn | isAutoGearConditionActive | (private) | `function isAutoGearConditionActive(key) {` |
| 16654 | fn | refreshAutoGearConditionPicker | (private) | `function refreshAutoGearConditionPicker() {` |
| 16683 | fn | updateAutoGearConditionAddButtonState | (private) | `function updateAutoGearConditionAddButtonState() {` |
| 16702 | fn | focusAutoGearConditionSection | (private) | `function focusAutoGearConditionSection(key) {` |
| 16734 | fn | notifyAutoGearConditionRepeat | (private) | `function notifyAutoGearConditionRepeat(key) {` |
| 16754 | fn | handleAutoGearConditionShortcut | (private) | `function handleAutoGearConditionShortcut() {` |
| 16773 | fn | addAutoGearCondition | (private) | `function addAutoGearCondition(key) {` |
| 16852 | fn | addAutoGearConditionFromPicker | (private) | `function addAutoGearConditionFromPicker() {` |
| 16868 | fn | removeAutoGearCondition | (private) | `function removeAutoGearCondition(key) {` |
| 16937 | fn | clearAllAutoGearConditions | (private) | `function clearAllAutoGearConditions() {` |
| 17014 | fn | initializeAutoGearConditionsFromDraft | (private) | `function initializeAutoGearConditionsFromDraft() {` |
| 17221 | fn | enableAutoGearMultiSelectToggle | (private) | `function enableAutoGearMultiSelectToggle(select) {` |
| 17305 | fn | syncAutoGearMonitorFieldVisibility | (private) | `function syncAutoGearMonitorFieldVisibility() {` |
| 17397 | fn | computeAutoGearMultiSelectSize | (private) | `function computeAutoGearMultiSelectSize(optionC...` |
| 17411 | fn | setAutoGearSearchQuery | (private) | `function setAutoGearSearchQuery(value) {` |
| 17419 | fn | setAutoGearScenarioFilter | (private) | `function setAutoGearScenarioFilter(value) {` |
| 17427 | fn | clearAutoGearFilters | (private) | `function clearAutoGearFilters() {` |
| 17450 | fn | autoGearRuleMatchesScenario | (private) | `function autoGearRuleMatchesScenario(rule, scen...` |
| 17457 | fn | autoGearRuleMatchesSearch | (private) | `function autoGearRuleMatchesSearch(rule, query) {` |
| 17547 | fn | getAutoGearScenarioFallbackOptions | (private) | `function getAutoGearScenarioFallbackOptions() {` |
| 17609 | fn | collectAutoGearScenarioFilterOptions | (private) | `function collectAutoGearScenarioFilterOptions(r...` |
| 17656 | fn | refreshAutoGearScenarioFilterOptions | (private) | `function refreshAutoGearScenarioFilterOptions(r...` |
| 17689 | fn | cloneAutoGearDraftItem | (private) | `function cloneAutoGearDraftItem(item) {` |
| 17706 | fn | createAutoGearDraft | (private) | `function createAutoGearDraft(rule) {` |
| 17825 | fn | getCrewRoleEntries | (private) | `function getCrewRoleEntries() {` |
| 17969 | fn | initAppCoreNewDomReferences | (private) | `function initAppCoreNewDomReferences() {` |

