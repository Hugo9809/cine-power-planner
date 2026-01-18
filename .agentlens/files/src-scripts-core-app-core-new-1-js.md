# src/scripts/core/app-core-new-1.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 21818
- **Language:** JavaScript
- **Symbols:** 590
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 16 | fn | renderFeedbackTable | (private) | `function renderFeedbackTable(setupKey) {` |
| 66 | fn | resolveAutoGearUIHelper | (private) | `function resolveAutoGearUIHelper(name) {` |
| 82 | fn | resolveAutoGearNormalizer | (private) | `function resolveAutoGearNormalizer(name) {` |
| 98 | fn | resolveAutoGearStorageHelper | (private) | `function resolveAutoGearStorageHelper(name) {` |
| 139 | fn | resolveAutoGearPersistenceModule | (private) | `function resolveAutoGearPersistenceModule() {` |
| 159 | fn | createDeferredAutoGearRefresherFallback | (private) | `function createDeferredAutoGearRefresherFallbac...` |
| 196 | fn | createSafeShim | (private) | `function createSafeShim(name, resolver, fallbac...` |
| 197 | fn | shim | (private) | `const shim = (...args) => {` |
| 376 | fn | pushScope | (private) | `function pushScope(scope) {` |
| 592 | fn | resolveFeedbackTemperatureBound | (private) | `function resolveFeedbackTemperatureBound(boundK...` |
| 850 | fn | iconMarkup | (private) | `function iconMarkup(glyph, classNameOrOptions =...` |
| 1232 | fn | resolveSetButtonLabelWithIconValue | (private) | `function resolveSetButtonLabelWithIconValue() {` |
| 1276 | fn | dispatchTemperatureNoteRender | (private) | `function dispatchTemperatureNoteRender(hours) {` |
| 1349 | fn | exposeCoreRuntimeBindings | (private) | `function exposeCoreRuntimeBindings(bindings) {` |
| 1405 | fn | runCoreRuntimeSegment | (private) | `function runCoreRuntimeSegment(executor) {` |
| 1449 | fn | resolveCoreShared | (private) | `function resolveCoreShared() {` |
| 1465 | fn | resolveCoreRuntimeHelpers | (private) | `function resolveCoreRuntimeHelpers() {` |
| 1534 | fn | createCoreRuntimeStateFallback | (private) | `function createCoreRuntimeStateFallback(candida...` |
| 1541 | fn | registerScope | (private) | `function registerScope(scope) {` |
| 1572 | fn | withEachScope | (private) | `function withEachScope(callback) {` |
| 1586 | fn | getScopes | (private) | `function getScopes() {` |
| 1590 | fn | getPrimaryScope | (private) | `function getPrimaryScope() {` |
| 1594 | fn | ensureValue | (private) | `function ensureValue(name, fallbackValue) {` |
| 1635 | fn | normaliseValue | (private) | `function normaliseValue(name, validator, fallba...` |
| 1661 | fn | readValue | (private) | `function readValue(name) {` |
| 1682 | fn | assignTemperatureRenderer | (private) | `function assignTemperatureRenderer(renderer) {` |
| 1731 | fn | getAssignedTemperatureRenderer | (private) | `function getAssignedTemperatureRenderer() {` |
| 1744 | fn | setAutoGearGuards | (private) | `function setAutoGearGuards(nextGuards) {` |
| 1773 | fn | createCoreRuntimeState | (private) | `function createCoreRuntimeState(candidateScopes) {` |
| 1819 | fn | isAutoGearGlobalReferenceError | (private) | `function isAutoGearGlobalReferenceError(error) {` |
| 1838 | fn | repairAutoGearGlobals | (private) | `function repairAutoGearGlobals(scope) {` |
| 1855 | fn | callCoreFunctionIfAvailable | (private) | `function callCoreFunctionIfAvailable(functionNa...` |
| 1932 | fn | safeFormatAutoGearItemSummary | (private) | `function safeFormatAutoGearItemSummary(item, op...` |
| 1963 | fn | formatWithPlaceholdersSafe | (private) | `function formatWithPlaceholdersSafe(template, ....` |
| 2062 | fn | ensureFunctionPlaceholder | (private) | `const ensureFunctionPlaceholder = (name) => {` |
| 2120 | fn | fallbackResolveConnectorSummaryGenerator | (private) | `function fallbackResolveConnectorSummaryGenerat...` |
| 2251 | fn | resolveAppVersionScope | (private) | `function resolveAppVersionScope() {` |
| 2267 | fn | extractAppVersion | (private) | `function extractAppVersion(candidate) {` |
| 2291 | fn | resolveAppVersionValue | (private) | `function resolveAppVersionValue() {` |
| 2331 | fn | resolveInstallBannerGlobalScope | (private) | `function resolveInstallBannerGlobalScope() {` |
| 2357 | fn | createHelpModuleFallback | (private) | `function createHelpModuleFallback() {` |
| 2387 | fn | resolveHelpModuleApi | (private) | `function resolveHelpModuleApi() {` |
| 2398 | fn | logModuleWarning | (private) | `function logModuleWarning(message, error) {` |
| 2543 | fn | cacheFeatureModule | (private) | `function cacheFeatureModule(globalScope, cacheK...` |
| 2563 | fn | resolveLegacyContactsOwnGearModule | (private) | `function resolveLegacyContactsOwnGearModule() {` |
| 2623 | fn | resolveContactsModule | (private) | `function resolveContactsModule() {` |
| 2685 | fn | resolveOwnGearModule | (private) | `function resolveOwnGearModule() {` |
| 2752 | fn | resolveCoreDeviceSchema | (private) | `function resolveCoreDeviceSchema() {` |
| 2895 | fn | readContactsModuleFromGlobal | (private) | - |
| 2920 | fn | fallbackSanitizeContactValue | (private) | - |
| 2921 | fn | fallbackNormalizeContactEntry | (private) | - |
| 2933 | fn | createFallbackProfileController | (private) | `function createFallbackProfileController() {` |
| 2936 | fn | snapshot | (private) | `const snapshot = () => ({ ...state });` |
| 2937 | fn | emit | (private) | `const emit = () => {` |
| 3174 | fn | resolveAutoGearStorageKey | (private) | `function resolveAutoGearStorageKey(symbolName, ...` |
| 3200 | fn | readGlobalAutoGearValue | (private) | `function readGlobalAutoGearValue(propertyName) {` |
| 3235 | fn | resolveAutoGearBackupRetentionMin | (private) | `function resolveAutoGearBackupRetentionMin() {` |
| 3258 | fn | resolveAutoGearBackupRetentionDefault | (private) | `function resolveAutoGearBackupRetentionDefault() {` |
| 3285 | fn | normalize | (private) | - |
| 3523 | fn | AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS | (private) | `const AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS ...` |
| 3543 | fn | AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP | (private) | `const AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP = (() ...` |
| 3608 | fn | updateAutoGearItemButtonState | (private) | `function updateAutoGearItemButtonState(type) {` |
| 3630 | fn | getAutoGearBackupEntrySignature | (private) | `function getAutoGearBackupEntrySignature(entry) {` |
| 3639 | fn | getAutoGearConfigurationSignature | (private) | `function getAutoGearConfigurationSignature(` |
| 3649 | fn | getAutoGearMonitorDefaultsSnapshot | (private) | `function getAutoGearMonitorDefaultsSnapshot() {` |
| 3670 | fn | assignAutoGearRules | (private) | `function assignAutoGearRules(rules) {` |
| 3677 | fn | syncBaseAutoGearRulesState | (private) | `function syncBaseAutoGearRulesState() {` |
| 3683 | fn | persistAutoGearRules | (private) | `function persistAutoGearRules() {` |
| 3709 | fn | getAutoGearMonitorDefault | (private) | `function getAutoGearMonitorDefault(key) {` |
| 3719 | fn | getAutoGearMonitorDefaults | (private) | `function getAutoGearMonitorDefaults() {` |
| 3723 | fn | setAutoGearMonitorDefaults | (private) | `function setAutoGearMonitorDefaults(defaults, {...` |
| 3752 | fn | setAutoGearMonitorDefault | (private) | `function setAutoGearMonitorDefault(key, value, ...` |
| 3773 | fn | setAutoGearRules | (private) | `function setAutoGearRules(rules) {` |
| 3784 | fn | getAutoGearRules | (private) | `function getAutoGearRules() {` |
| 3788 | fn | getEnabledAutoGearRules | (private) | `function getEnabledAutoGearRules() {` |
| 3792 | fn | syncAutoGearRulesFromStorage | (private) | `function syncAutoGearRulesFromStorage(rules) {` |
| 3844 | fn | useProjectAutoGearRules | (private) | `function useProjectAutoGearRules(rules) {` |
| 3853 | fn | clearProjectAutoGearRules | (private) | `function clearProjectAutoGearRules() {` |
| 3863 | fn | getProjectScopedAutoGearRules | (private) | `function getProjectScopedAutoGearRules() {` |
| 4059 | fn | usingProjectAutoGearRules | (private) | `function usingProjectAutoGearRules() {` |
| 4063 | fn | getBaseAutoGearRules | (private) | `function getBaseAutoGearRules() {` |
| 4067 | fn | autoGearRuleSignature | (private) | `function autoGearRuleSignature(rule) {` |
| 4073 | fn | mergeAutoGearRules | (private) | `function mergeAutoGearRules(existing, incoming) {` |
| 4089 | fn | looksLikeGearName | (private) | `function looksLikeGearName(name) {` |
| 4093 | fn | hasSeededAutoGearDefaults | (private) | `function hasSeededAutoGearDefaults() {` |
| 4111 | fn | markAutoGearDefaultsSeeded | (private) | `function markAutoGearDefaultsSeeded() {` |
| 4128 | fn | clearAutoGearDefaultsSeeded | (private) | `function clearAutoGearDefaultsSeeded() {` |
| 4145 | fn | parseGearTableForAutoRules | (private) | `function parseGearTableForAutoRules(html) {` |
| 4177 | fn | diffGearTableMaps | (private) | `function diffGearTableMaps(baseMap, variantMap) {` |
| 4199 | fn | collectAutoGearCatalogNames | (private) | `function collectAutoGearCatalogNames() {` |
| 4201 | fn | addName | (private) | - |
| 4205 | fn | visit | (private) | - |
| 4229 | fn | normalizeAutoGearMonitorCatalogMode | (private) | `function normalizeAutoGearMonitorCatalogMode(va...` |
| 4241 | fn | collectAutoGearMonitorNames | (private) | `function collectAutoGearMonitorNames(type = aut...` |
| 4251 | fn | addName | (private) | - |
| 4272 | fn | processItem | (private) | - |
| 4286 | fn | collectAutoGearSelectorValuesFromRules | (private) | `function collectAutoGearSelectorValuesFromRules...` |
| 4290 | fn | addValue | (private) | - |
| 4297 | fn | processItem | (private) | - |
| 4308 | fn | collectAutoGearTripodNames | (private) | `function collectAutoGearTripodNames(type) {` |
| 4333 | fn | collectAutoGearSelectorDefaultEntries | (private) | `function collectAutoGearSelectorDefaultEntries(...` |
| 4348 | fn | updateAutoGearMonitorCatalogOptions | (private) | `function updateAutoGearMonitorCatalogOptions(ty...` |
| 4350 | fn | targets | (private) | `const targets = (() => {` |
| 4378 | fn | addOption | (private) | `const addOption = (value, label) => {` |
| 4424 | fn | getCssVariableValue | (private) | `var getCssVariableValue = (name, fallback = '')...` |
| 4462 | fn | getElementHeight | (private) | `function getElementHeight(element) {` |
| 4473 | fn | setInstallBannerOffset | (private) | `function setInstallBannerOffset(offset) {` |
| 4488 | fn | scheduleInstallBannerPositionUpdate | (private) | `function scheduleInstallBannerPositionUpdate() {` |
| 4502 | fn | updateInstallBannerPosition | (private) | `function updateInstallBannerPosition() {` |
| 4538 | fn | setupOfflineIndicator | (private) | `function setupOfflineIndicator() {` |
| 4608 | fn | resolveOfflineNotice | (private) | `const resolveOfflineNotice = () => {` |
| 4622 | fn | getNavigatorOnline | (private) | `const getNavigatorOnline = () => (typeof naviga...` |
| 4623 | fn | getBaseLabel | (private) | `const getBaseLabel = () => (offlineIndicator.da...` |
| 4626 | fn | getBaseHelp | (private) | `const getBaseHelp = () => (offlineIndicator.dat...` |
| 4629 | fn | getDegradedLabel | (private) | `const getDegradedLabel = () => (offlineIndicato...` |
| 4632 | fn | getDegradedHelp | (private) | `const getDegradedHelp = () => (offlineIndicator...` |
| 4645 | fn | resolveReasonText | (private) | `const resolveReasonText = (reason) => {` |
| 4671 | fn | describeConnectivityDetail | (private) | `const describeConnectivityDetail = (detail) => {` |
| 4709 | fn | updateReloadButtonState | (private) | `const updateReloadButtonState = (status, offlin...` |
| 4773 | fn | sanitizeConnectivityState | (private) | `const sanitizeConnectivityState = (state) => {` |
| 4793 | fn | refreshOfflineIndicator | (private) | `const refreshOfflineIndicator = () => {` |
| 4900 | fn | applyConnectivityState | (private) | `const applyConnectivityState = (state) => {` |
| 4922 | fn | handleConnectivityBroadcast | (private) | `const handleConnectivityBroadcast = (event) => {` |
| 4947 | fn | ensureConnectivityBroadcast | (private) | `const ensureConnectivityBroadcast = () => {` |
| 4968 | fn | resolveOfflineModule | (private) | `const resolveOfflineModule = () => {` |
| 5037 | fn | closeSideMenu | (private) | `function closeSideMenu() {` |
| 5055 | fn | openSideMenu | (private) | `function openSideMenu() {` |
| 5083 | fn | setupSideMenu | (private) | `function setupSideMenu() {` |
| 5140 | fn | triggerSidebarAction | (private) | - |
| 5165 | fn | setupResponsiveControls | (private) | `function setupResponsiveControls() {` |
| 5188 | fn | relocate | (private) | `const relocate = () => {` |
| 5215 | fn | detectOwnGearGlobalScope | (private) | `function detectOwnGearGlobalScope() {` |
| 5234 | fn | resolveOwnGearStoreModule | (private) | `function resolveOwnGearStoreModule() {` |
| 5261 | fn | getOwnGearStore | (private) | `function getOwnGearStore() {` |
| 5277 | fn | resolveOwnGearViewModule | (private) | `function resolveOwnGearViewModule() {` |
| 5304 | fn | resolveOwnGearViewOptions | (private) | `function resolveOwnGearViewOptions() {` |
| 5325 | fn | getOwnGearView | (private) | `function getOwnGearView() {` |
| 5343 | fn | invalidateAutoGearOwnGearCache | (private) | `function invalidateAutoGearOwnGearCache() {` |
| 5359 | fn | refreshAutoGearOwnGearCache | (private) | `function refreshAutoGearOwnGearCache() {` |
| 5401 | fn | getAutoGearOwnGearCache | (private) | `function getAutoGearOwnGearCache() {` |
| 5420 | fn | getAutoGearOwnGearItems | (private) | `function getAutoGearOwnGearItems() {` |
| 5424 | fn | findAutoGearOwnGearById | (private) | `function findAutoGearOwnGearById(id) {` |
| 5438 | fn | generateOwnGearId | (private) | `function generateOwnGearId() {` |
| 5471 | fn | normalizeOwnGearRecord | (private) | `function normalizeOwnGearRecord(entry) {` |
| 5513 | fn | loadStoredOwnGearItems | (private) | `function loadStoredOwnGearItems() {` |
| 5555 | fn | persistOwnGearItems | (private) | `function persistOwnGearItems(items = []) {` |
| 5604 | fn | formatOwnGearQuantityText | (private) | `function formatOwnGearQuantityText(quantity) {` |
| 5620 | fn | openOwnGearDialog | (private) | `function openOwnGearDialog() {` |
| 5631 | fn | applyOwnGearLocalization | (private) | `function applyOwnGearLocalization(lang) {` |
| 5641 | fn | initializeLayoutControls | (private) | `function initializeLayoutControls() {` |
| 5646 | fn | initializeOwnGearManager | (private) | `function initializeOwnGearManager() {` |
| 5668 | fn | runLayoutInitialization | (private) | `var runLayoutInitialization = () => {` |
| 5674 | fn | scheduleLayoutInitialization | (private) | `var scheduleLayoutInitialization = () => {` |
| 5675 | fn | invoke | (private) | `const invoke = () => {` |
| 5708 | fn | CORE_AUTO_BACKUP_NAMESPACE | (private) | `const CORE_AUTO_BACKUP_NAMESPACE = (() => {` |
| 5830 | fn | cloneProjectEntryForSetup | (private) | `function cloneProjectEntryForSetup(projectEntry) {` |
| 5856 | fn | ensureAutoBackupsFromProjects | (private) | `function ensureAutoBackupsFromProjects() {` |
| 5883 | fn | getSetups | (private) | `function getSetups() {` |
| 5889 | fn | storeSetups | (private) | `function storeSetups(setups) {` |
| 5895 | fn | storeDevices | (private) | `function storeDevices(deviceData) {` |
| 5901 | fn | loadSession | (private) | `function loadSession() {` |
| 5907 | fn | storeSession | (private) | `function storeSession(state) {` |
| 5925 | fn | toggleDialog | (private) | `function toggleDialog(dialog, shouldOpen) {` |
| 5946 | fn | openDialog | (private) | `function openDialog(dialog) {` |
| 5956 | fn | closeDialog | (private) | `function closeDialog(dialog) {` |
| 5966 | fn | isDialogOpen | (private) | `function isDialogOpen(dialog) {` |
| 5986 | fn | resolveUpdateDevicesReferenceFunction | (private) | `function resolveUpdateDevicesReferenceFunction() {` |
| 6002 | fn | registerCandidate | (private) | `const registerCandidate = (scope) => {` |
| 6102 | fn | getBatteryPlateSupport | (private) | `function getBatteryPlateSupport(name) {` |
| 6116 | fn | getSupportedBatteryPlates | (private) | `function getSupportedBatteryPlates(name) {` |
| 6122 | fn | getAvailableBatteryPlates | (private) | `function getAvailableBatteryPlates(name) {` |
| 6136 | fn | supportsMountCamera | (private) | `function supportsMountCamera(name, mountType) {` |
| 6140 | fn | supportsBMountCamera | (private) | `function supportsBMountCamera(name) {` |
| 6144 | fn | supportsGoldMountCamera | (private) | `function supportsGoldMountCamera(name) {` |
| 6148 | fn | getBatteriesByMount | (private) | `function getBatteriesByMount(mountType) {` |
| 6156 | fn | getHotswapsByMount | (private) | `function getHotswapsByMount(mountType) {` |
| 6164 | fn | getBatteryMountType | (private) | `function getBatteryMountType(batteryName) {` |
| 6176 | fn | normalizeBatteryPlateValue | (private) | `function normalizeBatteryPlateValue(plateValue,...` |
| 6188 | fn | ensureBatteryPlateElements | (private) | `function ensureBatteryPlateElements() {` |
| 6198 | fn | applyBatteryPlateSelectionFromBattery | (private) | `function applyBatteryPlateSelectionFromBattery(...` |
| 6216 | fn | getSelectedPlate | (private) | `function getSelectedPlate() {` |
| 6233 | fn | isSelectedPlateNative | (private) | `function isSelectedPlateNative(camName) {` |
| 6240 | fn | shortConnLabel | (private) | `function shortConnLabel(type) {` |
| 6245 | fn | formatConnLabel | (private) | `function formatConnLabel(from, to) {` |
| 6254 | fn | hasCamConnector | (private) | - |
| 6255 | fn | hasLemo7PinConnector | (private) | - |
| 6258 | fn | getFizConnectorTypes | (private) | `function getFizConnectorTypes(device) {` |
| 6266 | fn | controllerCamPort | (private) | `function controllerCamPort(name) {` |
| 6286 | fn | controllerDistancePort | (private) | `function controllerDistancePort(name) {` |
| 6293 | fn | controllerPriority | (private) | `function controllerPriority(name) {` |
| 6299 | fn | motorPriority | (private) | `function motorPriority(name) {` |
| 6304 | fn | isArriOrCmotion | (private) | `function isArriOrCmotion(name) {` |
| 6308 | fn | isArri | (private) | `function isArri(name) {` |
| 6311 | fn | fizNeedsPower | (private) | `function fizNeedsPower(name) {` |
| 6320 | fn | firstConnector | (private) | `function firstConnector(str) {` |
| 6337 | fn | getFizPort | (private) | `function getFizPort(device, preferredMatchers =...` |
| 6350 | fn | cameraFizPort | (private) | `function cameraFizPort(camName, controllerPort,...` |
| 6366 | fn | controllerFizPort | (private) | `function controllerFizPort(name) {` |
| 6375 | fn | motorFizPort | (private) | `function motorFizPort(name) {` |
| 6381 | fn | distanceFizPort | (private) | `function distanceFizPort(name) {` |
| 6389 | fn | fizPort | (private) | `function fizPort(name) {` |
| 6396 | fn | fizPowerPort | (private) | `function fizPowerPort(name) {` |
| 6401 | fn | sdiRate | (private) | `function sdiRate(type) {` |
| 6406 | fn | connectionLabel | (private) | `function connectionLabel(outType, inType) {` |
| 6423 | fn | updateBatteryPlateVisibility | (private) | `function updateBatteryPlateVisibility() {` |
| 6429 | fn | applyDependentUpdates | (private) | `const applyDependentUpdates = () => {` |
| 6466 | fn | updateViewfinderSettingsVisibility | (private) | `function updateViewfinderSettingsVisibility() {` |
| 6484 | fn | updateMonitoringConfigurationOptions | (private) | `function updateMonitoringConfigurationOptions() {` |
| 6512 | fn | updateViewfinderExtensionVisibility | (private) | `function updateViewfinderExtensionVisibility() {` |
| 6528 | fn | updateBatteryLabel | (private) | `function updateBatteryLabel() {` |
| 6546 | fn | localParseBatteryCurrentLimit | (private) | - |
| 6562 | fn | updateBatteryOptions | (private) | `function updateBatteryOptions() {` |
| 6655 | fn | detectBrand | (private) | `function detectBrand(name) {` |
| 6673 | fn | setStatusLevel | (private) | `function setStatusLevel(element, level) {` |
| 6715 | fn | formatStatusMessage | (private) | `function formatStatusMessage(message) {` |
| 6730 | fn | setStatusMessage | (private) | `function setStatusMessage(element, message) {` |
| 6740 | fn | formatCurrentValue | (private) | `function formatCurrentValue(value) {` |
| 6747 | fn | checkFizCompatibility | (private) | `function checkFizCompatibility() {` |
| 6787 | fn | checkFizController | (private) | `function checkFizController() {` |
| 6844 | fn | checkArriCompatibility | (private) | `function checkArriCompatibility() {` |
| 6911 | fn | resolveTranslationsRuntime | (private) | `function resolveTranslationsRuntime() {` |
| 6914 | fn | resolveGlobalScopeForTranslations | (private) | `function resolveGlobalScopeForTranslations() {` |
| 7335 | fn | normalizeFocusScaleForLabel | (private) | `function normalizeFocusScaleForLabel(value) {` |
| 7336 | fn | attemptNormalize | (private) | `const attemptNormalize = (candidate) => {` |
| 7383 | fn | getFocusScaleLabelForLang | (private) | `function getFocusScaleLabelForLang(lang = curre...` |
| 7422 | fn | resolveFromLexicalBinding | (private) | `function resolveFromLexicalBinding() {` |
| 7432 | fn | resolveFromLocaleModule | (private) | `function resolveFromLocaleModule() {` |
| 7447 | fn | resolveFromLocalizationAccessors | (private) | `function resolveFromLocalizationAccessors() {` |
| 7462 | fn | resolveFromGlobalScope | (private) | `function resolveFromGlobalScope() {` |
| 7514 | fn | SUPPORTED_LANGUAGES | (private) | `const SUPPORTED_LANGUAGES = (() => {` |
| 7516 | fn | addLanguage | (private) | - |
| 7563 | fn | resolveLanguagePreference | (private) | `function resolveLanguagePreference(candidate) {` |
| 7643 | fn | syncLanguageSelectorsWithCurrentLang | (private) | `const syncLanguageSelectorsWithCurrentLang = ()...` |
| 7674 | fn | setLanguage | (private) | `async function setLanguage(lang, options = {}) {` |
| 7738 | fn | dispatchLanguageChange | (private) | `const dispatchLanguageChange = () => {` |
| 7781 | fn | attemptRefreshDeviceLists | (private) | `const attemptRefreshDeviceLists = () => {` |
| 7802 | fn | retryRefresh | (private) | `const retryRefresh = () => {` |
| 7812 | fn | normalizeTemperatureUnitSafe | (private) | - |
| 7842 | fn | FALLBACK_NORMALIZE_FOCUS_SCALE | (private) | - |
| 7855 | fn | ensureNormalizeFocusScaleHelper | (private) | `const ensureNormalizeFocusScaleHelper = () => {` |
| 7888 | fn | normalizeFocusScaleSafe | (private) | - |
| 7904 | fn | resolveFocusScalePreference | (private) | `const resolveFocusScalePreference = () => {` |
| 7905 | fn | tryNormalize | (private) | - |
| 7948 | fn | resolveLocaleString | (private) | - |
| 7959 | fn | applyTextContent | (private) | `const applyTextContent = (element, key, fallbac...` |
| 7964 | fn | createHelpLink | (private) | `const createHelpLink = (` |
| 7984 | fn | applySuggestionTemplate | (private) | `const applySuggestionTemplate = (element, key, ...` |
| 8021 | fn | applySuggestionText | (private) | `const applySuggestionText = (element, key) => {` |
| 8031 | fn | resolveRuntimeValue | (private) | `const resolveRuntimeValue = (name) => {` |
| 8053 | fn | registerResolvedElement | (private) | `const registerResolvedElement = (globalName, el...` |
| 8064 | fn | resolveElement | (private) | `const resolveElement = (globalName, elementId) ...` |
| 8928 | fn | safeSetText | (private) | `const safeSetText = (id, text) => {` |
| 8933 | fn | safeSetAttr | (private) | `const safeSetAttr = (id, attr, value) => {` |
| 9201 | fn | getSettingsTabLabelText | (private) | - |
| 9210 | fn | summarizeSettingsTabHelp | (private) | - |
| 9230 | fn | applySettingsTabLabel | (private) | `const applySettingsTabLabel = (button, labelVal...` |
| 11685 | fn | setLabelText | (private) | `const setLabelText = (element, key) => {` |
| 11690 | fn | setPlaceholder | (private) | `const setPlaceholder = (element, key) => {` |
| 11695 | fn | setOptionText | (private) | `const setOptionText = (element, key) => {` |
| 12035 | fn | stripTrailingPunctuation | (private) | - |
| 12298 | fn | resolveContactsDomRefs | (private) | `function resolveContactsDomRefs() {` |
| 12391 | fn | getCrewRoleLabels | (private) | `function getCrewRoleLabels() {` |
| 12396 | fn | populateUserProfileRoleSelect | (private) | `function populateUserProfileRoleSelect(options ...` |
| 12438 | fn | ensureUserProfileRoleOption | (private) | `function ensureUserProfileRoleOption(roleValue) {` |
| 12490 | fn | updateSelectIconBoxes | (private) | `function updateSelectIconBoxes(sel) {` |
| 12542 | fn | getLocalizedPathText | (private) | `function getLocalizedPathText(path, fallback = ...` |
| 12548 | fn | resolve | (private) | `const resolve = (source) => keys.reduce((acc, k...` |
| 12565 | fn | configureIconOnlyButton | (private) | `function configureIconOnlyButton(button, glyph,...` |
| 12599 | fn | sanitizeForId | (private) | `function sanitizeForId(value, fallback = 'field...` |
| 12608 | fn | ensureElementId | (private) | `function ensureElementId(element, baseText = 'f...` |
| 12621 | fn | createHiddenLabel | (private) | `function createHiddenLabel(forId, text) {` |
| 12642 | fn | getProjectFormText | (private) | `function getProjectFormText(key, defaultValue =...` |
| 12657 | fn | resolveContactsStorageKey | (private) | `function resolveContactsStorageKey() {` |
| 12694 | fn | getContactsText | (private) | `function getContactsText(key, defaultValue = '') {` |
| 12707 | fn | generateContactId | (private) | `function generateContactId() {` |
| 12719 | fn | sanitizeContactValue | (private) | `function sanitizeContactValue(value) {` |
| 12723 | fn | normalizeContactEntry | (private) | `function normalizeContactEntry(entry) {` |
| 12727 | fn | sortContacts | (private) | `function sortContacts(list) {` |
| 12731 | fn | loadStoredContacts | (private) | `function loadStoredContacts() {` |
| 12754 | fn | saveContactsToStorage | (private) | `function saveContactsToStorage(contacts) {` |
| 12773 | fn | getContactById | (private) | `function getContactById(id) {` |
| 12778 | fn | getContactDisplayLabel | (private) | `function getContactDisplayLabel(contact) {` |
| 12789 | fn | ensureContactForImportedOwner | (private) | `function ensureContactForImportedOwner(ownerNam...` |
| 12863 | fn | setContactSelectOptions | (private) | `function setContactSelectOptions(select, select...` |
| 12903 | fn | updateContactPickers | (private) | `function updateContactPickers() {` |
| 12910 | fn | getAvatarInitial | (private) | `function getAvatarInitial(value) {` |
| 12918 | fn | updateAvatarVisual | (private) | `function updateAvatarVisual(container, avatarVa...` |
| 12938 | fn | setRowAvatar | (private) | `function setRowAvatar(row, avatarValue, options...` |
| 12952 | fn | parseDataUrlMimeType | (private) | `function parseDataUrlMimeType(dataUrl) {` |
| 12959 | fn | updateAvatarOptionsPreview | (private) | `function updateAvatarOptionsPreview(avatarValue...` |
| 12965 | fn | refreshAvatarOptionsActions | (private) | `function refreshAvatarOptionsActions() {` |
| 12971 | fn | setState | (private) | `const setState = (button, disabled) => {` |
| 12981 | fn | stopAvatarEditing | (private) | `function stopAvatarEditing(options = {}) {` |
| 13011 | fn | closeAvatarOptionsDialog | (private) | `function closeAvatarOptionsDialog() {` |
| 13018 | fn | handleAvatarOptionsDialogClosed | (private) | `function handleAvatarOptionsDialogClosed() {` |
| 13023 | fn | openAvatarOptionsDialog | (private) | `function openAvatarOptionsDialog(context = null) {` |
| 13045 | fn | clampAvatarEditOffsets | (private) | `function clampAvatarEditOffsets(state) {` |
| 13053 | fn | updateAvatarEditMetrics | (private) | `function updateAvatarEditMetrics(state) {` |
| 13069 | fn | measureAvatarEditViewportSize | (private) | `function measureAvatarEditViewportSize() {` |
| 13109 | fn | initializeAvatarEditState | (private) | `function initializeAvatarEditState(dataUrl) {` |
| 13174 | fn | startAvatarEditing | (private) | `function startAvatarEditing() {` |
| 13193 | fn | handleAvatarEditZoomInputChange | (private) | `function handleAvatarEditZoomInputChange(event) {` |
| 13213 | fn | handleAvatarEditPointerDown | (private) | `function handleAvatarEditPointerDown(event) {` |
| 13229 | fn | handleAvatarEditPointerMove | (private) | `function handleAvatarEditPointerMove(event) {` |
| 13241 | fn | clearAvatarEditPointerState | (private) | `function clearAvatarEditPointerState() {` |
| 13246 | fn | handleAvatarEditPointerUp | (private) | `function handleAvatarEditPointerUp(event) {` |
| 13260 | fn | handleAvatarEditPointerCancel | (private) | `function handleAvatarEditPointerCancel(event) {` |
| 13273 | fn | handleAvatarEditKeyDown | (private) | `function handleAvatarEditKeyDown(event) {` |
| 13304 | fn | exportAvatarEditResult | (private) | `function exportAvatarEditResult() {` |
| 13350 | fn | applyAvatarEditChanges | (private) | `function applyAvatarEditChanges() {` |
| 13366 | fn | handleAvatarDeleteAction | (private) | `function handleAvatarDeleteAction() {` |
| 13380 | fn | handleAvatarChangeAction | (private) | `function handleAvatarChangeAction() {` |
| 13386 | fn | handleAvatarEditAction | (private) | `function handleAvatarEditAction() {` |
| 13390 | fn | handleAvatarEditCancel | (private) | `function handleAvatarEditCancel() {` |
| 13394 | fn | handleAvatarDrop | (private) | `function handleAvatarDrop(event) {` |
| 13405 | fn | handleAvatarDragOver | (private) | `function handleAvatarDragOver(event) {` |
| 13412 | fn | handleAvatarDragLeave | (private) | `function handleAvatarDragLeave(event) {` |
| 13419 | fn | handleAvatarUpload | (private) | `function handleAvatarUpload(event) {` |
| 13427 | fn | processAvatarFile | (private) | `function processAvatarFile(file) {` |
| 13441 | fn | handleAvatarSave | (private) | `function handleAvatarSave() {` |
| 13458 | fn | handleAvatarOptionsDialogPointerDown | (private) | `function handleAvatarOptionsDialogPointerDown(e...` |
| 13479 | fn | dispatchGearProviderDataChanged | (private) | `function dispatchGearProviderDataChanged(reason) {` |
| 13490 | fn | getContactsSnapshot | (private) | `function getContactsSnapshot() {` |
| 13519 | fn | assignUserProfileState | (private) | `function assignUserProfileState(updates = {}) {` |
| 13524 | fn | getUserProfileSnapshot | (private) | `function getUserProfileSnapshot() {` |
| 13531 | fn | applyUserProfileToDom | (private) | `function applyUserProfileToDom(options = {}) {` |
| 13595 | fn | loadUserProfileState | (private) | `function loadUserProfileState() {` |
| 13604 | fn | setAvatar | (private) | `function setAvatar(dataUrl) {` |
| 13609 | fn | clearAvatar | (private) | `function clearAvatar() {` |
| 13630 | fn | persistUserProfileState | (private) | `function persistUserProfileState(options = {}) {` |
| 13646 | fn | handleUserProfileNameInput | (private) | `function handleUserProfileNameInput() {` |
| 13661 | fn | handleUserProfileRoleInput | (private) | `function handleUserProfileRoleInput() {` |
| 13678 | fn | handleUserProfilePhoneInput | (private) | `function handleUserProfilePhoneInput() {` |
| 13693 | fn | handleUserProfileEmailInput | (private) | `function handleUserProfileEmailInput() {` |
| 13708 | fn | handleUserProfileFieldBlur | (private) | `function handleUserProfileFieldBlur() {` |
| 13714 | fn | handleUserProfileAvatarCleared | (private) | `function handleUserProfileAvatarCleared() {` |
| 13727 | fn | handleUserProfileAvatarButtonClick | (private) | `function handleUserProfileAvatarButtonClick() {` |
| 13767 | fn | handleUserProfileAvatarInputChange | (private) | `function handleUserProfileAvatarInputChange() {` |
| 13794 | fn | refreshRowAvatarInitial | (private) | `function refreshRowAvatarInitial(row) {` |
| 13803 | fn | detachCrewRowContact | (private) | `function detachCrewRowContact(row, options = {}) {` |
| 13814 | fn | updateRowLinkedBadge | (private) | `function updateRowLinkedBadge(row) {` |
| 13840 | fn | handleCrewRowManualChange | (private) | `function handleCrewRowManualChange(row, immedia...` |
| 13860 | fn | handleAvatarFileSelection | (private) | `function handleAvatarFileSelection(row, file) {` |
| 13887 | fn | announceContactsMessage | (private) | `function announceContactsMessage(message) {` |
| 13893 | fn | applyContactToCrewRow | (private) | `function applyContactToCrewRow(row, contact, op...` |
| 13952 | fn | updateCrewRowsForContact | (private) | `function updateCrewRowsForContact(contact) {` |
| 13962 | fn | getCrewRowSnapshot | (private) | `function getCrewRowSnapshot(row) {` |
| 13981 | fn | deleteContact | (private) | `function deleteContact(contactId) {` |
| 14001 | fn | saveCrewRowAsContact | (private) | `function saveCrewRowAsContact(row) {` |
| 14053 | fn | parseVCard | (private) | `function parseVCard(text) {` |
| 14057 | fn | mergeImportedContacts | (private) | `function mergeImportedContacts(imported) {` |
| 14085 | fn | createContactCard | (private) | `function createContactCard(contact) {` |
| 14225 | fn | performDelete | (private) | `const performDelete = () => deleteContact(conta...` |
| 14245 | fn | persist | (private) | `const persist = (resort = false) => {` |
| 14351 | fn | renderContactsList | (private) | `function renderContactsList(options = {}) {` |
| 14376 | fn | enableAvatarDragAndDrop | (private) | `function enableAvatarDragAndDrop(container, onF...` |
| 14379 | fn | handleDragOver | (private) | `const handleDragOver = (event) => {` |
| 14385 | fn | handleDragLeave | (private) | `const handleDragLeave = (event) => {` |
| 14391 | fn | handleDrop | (private) | `const handleDrop = (event) => {` |
| 14408 | fn | initializeContactsModule | (private) | `function initializeContactsModule() {` |
| 14575 | fn | createCrewRow | (private) | `function createCrewRow(data = {}) {` |
| 14856 | fn | createPrepRow | (private) | `function createPrepRow(data = {}) {` |
| 14899 | fn | createShootRow | (private) | `function createShootRow(data = {}) {` |
| 14942 | fn | createReturnRow | (private) | `function createReturnRow(data = {}) {` |
| 14987 | fn | formatCapacity | (private) | `function formatCapacity(value, unit) {` |
| 14996 | fn | gatherMediaEntriesForType | (private) | `function gatherMediaEntriesForType(type) {` |
| 15001 | fn | addEntries | (private) | - |
| 15019 | fn | getAvailableStorageMediaTypes | (private) | `function getAvailableStorageMediaTypes() {` |
| 15025 | fn | addType | (private) | - |
| 15049 | fn | addCameraTypes | (private) | - |
| 15061 | fn | traverseMedia | (private) | `const traverseMedia = (obj) => {` |
| 15084 | fn | getStorageVariantOptions | (private) | `function getStorageVariantOptions(type) {` |
| 15092 | fn | traverse | (private) | `const traverse = (obj) => {` |
| 15105 | fn | addVariant | (private) | `const addVariant = (value, label) => {` |
| 15189 | fn | updateStorageVariantOptions | (private) | `function updateStorageVariantOptions(select, ty...` |
| 15220 | fn | updateStorageRequirementTypeOptions | (private) | `function updateStorageRequirementTypeOptions() {` |
| 15264 | fn | createStorageRequirementRow | (private) | `function createStorageRequirementRow(data = {}) {` |
| 15399 | fn | updateRequiredScenariosTranslations | (private) | `function updateRequiredScenariosTranslations(la...` |
| 15415 | fn | updateStorageRequirementTranslations | (private) | `function updateStorageRequirementTranslations(p...` |
| 15426 | fn | updateLabel | (private) | - |
| 15493 | fn | updateTripodOptions | (private) | `function updateTripodOptions() {` |
| 15558 | fn | updatePowerSummary | (private) | `function updatePowerSummary() {` |
| 15564 | fn | closePowerWarningDialog | (private) | `function closePowerWarningDialog(options = {}) {` |
| 15577 | fn | dismissPowerWarningDialog | (private) | `function dismissPowerWarningDialog() {` |
| 15585 | fn | showPowerWarningDialog | (private) | `function showPowerWarningDialog(context) {` |
| 15665 | fn | drawPowerDiagram | (private) | `function drawPowerDiagram(availableWatt, segmen...` |
| 15811 | fn | sanitizeShareFilename | (private) | `function sanitizeShareFilename(name) {` |
| 15824 | fn | ensureJsonExtension | (private) | `function ensureJsonExtension(filename) {` |
| 15829 | fn | getDefaultShareFilename | (private) | `function getDefaultShareFilename(setupName) {` |
| 15834 | fn | promptForSharedFilename | (private) | `function promptForSharedFilename(setupName) {` |
| 15860 | fn | confirmAutoGearSelection | (private) | `function confirmAutoGearSelection(defaultInclud...` |
| 15957 | fn | resolveSharedImportLocalVersion | (private) | `function resolveSharedImportLocalVersion() {` |
| 15973 | fn | formatSharedImportTimestamp | (private) | `function formatSharedImportTimestamp(timestamp) {` |
| 15999 | fn | formatSharedImportMetadataSummary | (private) | `function formatSharedImportMetadataSummary(meta...` |
| 16053 | fn | updateSharedImportMetadataSummary | (private) | `function updateSharedImportMetadataSummary(meta...` |
| 16067 | fn | cloneSharedImportValue | (private) | `function cloneSharedImportValue(value) {` |
| 16077 | fn | storeSharedImportData | (private) | `function storeSharedImportData(data, rules) {` |
| 16082 | fn | clearStoredSharedImportData | (private) | `function clearStoredSharedImportData() {` |
| 16089 | fn | resetSharedImportStateForFactoryReset | (private) | `function resetSharedImportStateForFactoryReset() {` |
| 16112 | fn | deactivateSharedImportProjectPreset | (private) | `function deactivateSharedImportProjectPreset() {` |
| 16125 | fn | activateSharedImportProjectPreset | (private) | `function activateSharedImportProjectPreset(pres...` |
| 16139 | fn | getSharedImportProjectName | (private) | `function getSharedImportProjectName(sharedData) {` |
| 16152 | fn | getSharedImportPresetLabel | (private) | `function getSharedImportPresetLabel(sharedData) {` |
| 16170 | fn | ensureSharedAutoGearPreset | (private) | `function ensureSharedAutoGearPreset(rules, shar...` |
| 16211 | fn | configureSharedImportOptions | (private) | `function configureSharedImportOptions(sharedRul...` |
| 16229 | fn | sharedImportRulesDiffer | (private) | `function sharedImportRulesDiffer(sharedRules) {` |
| 16241 | fn | applyStoredSharedImport | (private) | `function applyStoredSharedImport() {` |
| 16246 | fn | finalizeSharedImportPrompt | (private) | `function finalizeSharedImportPrompt() {` |
| 16251 | fn | openSharedImportPrompt | (private) | `function openSharedImportPrompt() {` |
| 16261 | fn | processSharedProjectData | (private) | `function processSharedProjectData(data) {` |
| 16284 | fn | readSharedProjectFile | (private) | `function readSharedProjectFile(file) {` |
| 16298 | fn | prepareSharedImportContext | (private) | `function prepareSharedImportContext() {` |
| 16348 | fn | reapplySharedImportSelection | (private) | `function reapplySharedImportSelection() {` |
| 16361 | fn | resolveSharedImportMode | (private) | `function resolveSharedImportMode(sharedRules) {` |
| 16388 | fn | encodeSharedSetup | (private) | `function encodeSharedSetup(setup) {` |
| 16407 | fn | decodeSharedSetup | (private) | `function decodeSharedSetup(setup) {` |
| 16480 | fn | resolveDeviceListContainer | (private) | `function resolveDeviceListContainer() {` |
| 16488 | fn | deviceManagerLists | (private) | `const deviceManagerLists = (() => {` |
| 16522 | fn | filterHelperScope | (private) | `var filterHelperScope = (() => {` |
| 16531 | fn | fallbackFilterSelect | (private) | `function fallbackFilterSelect(selectElem, filte...` |
| 16547 | fn | fallbackFilterDeviceList | (private) | `function fallbackFilterDeviceList(listElem, fil...` |
| 16560 | fn | fallbackAddInputClearButton | (private) | `function fallbackAddInputClearButton(inputElem,...` |
| 16588 | fn | toggle | (private) | `const toggle = () => {` |
| 16595 | fn | fallbackBindFilterInput | (private) | `function fallbackBindFilterInput(inputElem, cal...` |
| 16610 | fn | ensureFilterHelpers | (private) | `function ensureFilterHelpers() {` |
| 16614 | fn | attachHelper | (private) | `const attachHelper = (key, fn) => {` |
| 16641 | fn | applyFilters | (private) | `function applyFilters() {` |
| 16702 | fn | getDeviceManagerPreferredOrder | (private) | `function getDeviceManagerPreferredOrder() {` |
| 16716 | fn | normalizeCategoryKey | (private) | `function normalizeCategoryKey(key) {` |
| 16726 | fn | getCategoryLabel | (private) | `function getCategoryLabel(categoryKey, lang = c...` |
| 16739 | fn | collectDeviceManagerCategories | (private) | `function collectDeviceManagerCategories() {` |
| 16741 | fn | addCategory | (private) | `const addCategory = (key) => {` |
| 16747 | fn | traverseSchema | (private) | `const traverseSchema = (node, path = []) => {` |
| 16776 | fn | addFromData | (private) | `const addFromData = (data) => {` |
| 16815 | fn | createDeviceCategorySection | (private) | `function createDeviceCategorySection(categoryKe...` |
| 16843 | fn | resolveFilterScope | (private) | `const resolveFilterScope = () => {` |
| 16851 | fn | attachFilterBinding | (private) | `const attachFilterBinding = () => {` |
| 16872 | fn | updateDeviceManagerLocalization | (private) | `function updateDeviceManagerLocalization(lang =...` |
| 16931 | fn | syncDeviceManagerCategories | (private) | `function syncDeviceManagerCategories() {` |
| 16964 | fn | getCurrentProjectName | (private) | `function getCurrentProjectName() {` |
| 16977 | fn | normalizeSetupName | (private) | `function normalizeSetupName(value) {` |
| 16984 | fn | getSetupNameState | (private) | `function getSetupNameState() {` |
| 17015 | fn | createProjectInfoSnapshotForStorage | (private) | `function createProjectInfoSnapshotForStorage(ba...` |
| 17032 | fn | getCurrentProjectStorageKey | (private) | `function getCurrentProjectStorageKey(options = ...` |
| 17086 | fn | populateCategoryOptions | (private) | `function populateCategoryOptions() {` |
| 17096 | fn | addOpt | (private) | `const addOpt = (val) => {` |
| 17150 | fn | addIfMissing | (private) | `const addIfMissing = (val) => {` |
| 17174 | fn | getCategoryContainer | (private) | `function getCategoryContainer(categoryKey, subc...` |
| 17218 | fn | removeOriginalDeviceEntry | (private) | `function removeOriginalDeviceEntry(originalCate...` |
| 17274 | fn | resolveFeedbackTemperatureBounds | (private) | `function resolveFeedbackTemperatureBounds() {` |
| 17288 | fn | ensureFeedbackTemperatureOptions | (private) | `function ensureFeedbackTemperatureOptions(selec...` |
| 17323 | fn | refreshFeedbackTemperatureLabel | (private) | `function refreshFeedbackTemperatureLabel(lang =...` |
| 17340 | fn | updateFeedbackTemperatureOptions | (private) | `function updateFeedbackTemperatureOptions(lang ...` |
| 17375 | fn | normalizeTemperatureUnit | (private) | `function normalizeTemperatureUnit(unit) {` |
| 17391 | fn | getRuntimeTemperatureUnit | (private) | `function getRuntimeTemperatureUnit() {` |
| 17422 | fn | convertCelsiusToUnit | (private) | `function convertCelsiusToUnit(value, unit) {` |
| 17436 | fn | getTemperatureUnitSymbolForLang | (private) | `function getTemperatureUnitSymbolForLang(lang =...` |
| 17453 | fn | getTemperatureUnitLabelForLang | (private) | `function getTemperatureUnitLabelForLang(lang = ...` |
| 17470 | fn | getTemperatureColumnLabelForLang | (private) | `function getTemperatureColumnLabelForLang(lang ...` |
| 17482 | fn | formatTemperatureForDisplay | (private) | `function formatTemperatureForDisplay(celsius, o...` |
| 17520 | fn | ensureFunction | (private) | `const ensureFunction = (name, factory) => {` |
| 17535 | fn | ensureArrayBinding | (private) | `const ensureArrayBinding = (name, values) => {` |
| 17557 | fn | readDevices | (private) | `const readDevices = () => (typeof devices !== '...` |
| 17559 | fn | collectValues | (private) | `const collectValues = (defaults, collector) => {` |
| 17569 | fn | collectViewfinderTypes | (private) | `const collectViewfinderTypes = () => {` |
| 17585 | fn | collectViewfinderConnectors | (private) | `const collectViewfinderConnectors = () => {` |
| 17601 | fn | collectVideoPortOptions | (private) | `const collectVideoPortOptions = () => {` |
| 17604 | fn | appendPorts | (private) | - |
| 17648 | fn | resolveContainer | (private) | - |
| 17683 | fn | ensureElementId | (private) | `const ensureElementId = (element, baseText) => {` |
| 17701 | fn | createHiddenLabel | (private) | `const createHiddenLabel = (id, text) => {` |
| 17711 | fn | createFieldWithLabel | (private) | `const createFieldWithLabel = (field, labelText)...` |
| 17721 | fn | populateSelectOptions | (private) | `const populateSelectOptions = (select, options,...` |
| 17727 | fn | addOption | (private) | `const addOption = (val, label) => {` |
| 17754 | fn | createViewfinderRow | (private) | `const createViewfinderRow = (type = '', resolut...` |
| 17819 | fn | createViewfinderVideoRow | (private) | `const createViewfinderVideoRow = (container, na...` |
| 17862 | fn | setViewfindersFallback | (private) | - |
| 17881 | fn | getViewfindersFallback | (private) | `const getViewfindersFallback = () => {` |
| 17896 | fn | clearViewfindersFallback | (private) | `const clearViewfindersFallback = () => {` |
| 17900 | fn | setViewfinderVideoInputsFallback | (private) | - |
| 17935 | fn | getViewfinderVideoInputsFallback | (private) | `const getViewfinderVideoInputsFallback = () => {` |
| 17944 | fn | clearViewfinderVideoInputsFallback | (private) | `const clearViewfinderVideoInputsFallback = () => {` |
| 17948 | fn | setViewfinderVideoOutputsFallback | (private) | - |
| 17983 | fn | getViewfinderVideoOutputsFallback | (private) | `const getViewfinderVideoOutputsFallback = () => {` |
| 17992 | fn | clearViewfinderVideoOutputsFallback | (private) | `const clearViewfinderVideoOutputsFallback = () ...` |
| 18017 | fn | showFormSection | (private) | `function showFormSection(section) {` |
| 18027 | fn | hideFormSection | (private) | `function hideFormSection(section) {` |
| 18037 | fn | placeWattField | (private) | `function placeWattField(category, data) {` |
| 18112 | fn | resolveGlobalFocusScalePreference | (private) | `function resolveGlobalFocusScalePreference() {` |
| 18169 | fn | updateLensFocusScaleSelectOptions | (private) | `function updateLensFocusScaleSelectOptions(lang...` |
| 18194 | fn | addOption | (private) | `const addOption = (value, label) => {` |
| 18283 | fn | formatAttributeLabel | (private) | `function formatAttributeLabel(attr) {` |
| 18291 | fn | resolveSchemaFieldConfig | (private) | `function resolveSchemaFieldConfig(category, att...` |
| 18304 | fn | autoRows | (private) | `function autoRows(text, min = 3, max = 10) {` |
| 18310 | fn | normalizeSchemaListValues | (private) | `function normalizeSchemaListValues(value) {` |
| 18325 | fn | createSchemaListControl | (private) | `function createSchemaListControl(options) {` |
| 18375 | fn | createRow | (private) | `const createRow = (initialValue = '') => {` |
| 18464 | fn | createSchemaField | (private) | `function createSchemaField(category, attr, valu...` |
| 18591 | fn | getSchemaAttributesForCategory | (private) | `function getSchemaAttributesForCategory(categor...` |
| 18602 | fn | getCombinedCategoryAttributes | (private) | `function getCombinedCategoryAttributes(category...` |
| 18605 | fn | skip | (private) | `const skip = (attr) => !attr || exclude.include...` |
| 18626 | fn | clearDynamicFields | (private) | `function clearDynamicFields() {` |
| 18635 | fn | buildDynamicFields | (private) | `function buildDynamicFields(category, data = {}...` |
| 18670 | fn | markCollectedDynamicAttributes | (private) | `function markCollectedDynamicAttributes(target,...` |
| 18685 | fn | getCollectedDynamicAttributes | (private) | `function getCollectedDynamicAttributes(source) {` |
| 18693 | fn | removeClearedDynamicAttributes | (private) | `function removeClearedDynamicAttributes(target,...` |
| 18707 | fn | collectDynamicFieldValues | (private) | `function collectDynamicFieldValues(category, ex...` |
| 18789 | fn | cloneDynamicFieldTarget | (private) | `function cloneDynamicFieldTarget(target) {` |
| 18845 | fn | ensureWritableDynamicFieldTarget | (private) | `function ensureWritableDynamicFieldTarget(targe...` |
| 18888 | fn | applyDynamicFieldValues | (private) | `function applyDynamicFieldValues(target, catego...` |
| 18961 | fn | ensureInstallPromptElements | (private) | `function ensureInstallPromptElements() {` |
| 19104 | fn | parseRgbComponent | (private) | `function parseRgbComponent(value) {` |
| 19121 | fn | parseColorToRgb | (private) | `function parseColorToRgb(color) {` |
| 19155 | fn | computeRelativeLuminance | (private) | `function computeRelativeLuminance(rgb) {` |
| 19157 | fn | clamp | (private) | - |
| 19162 | fn | transform | (private) | - |
| 19172 | fn | isIosDevice | (private) | `function isIosDevice() {` |
| 19185 | fn | isAndroidDevice | (private) | `function isAndroidDevice() {` |
| 19198 | fn | isStandaloneDisplayMode | (private) | `function isStandaloneDisplayMode() {` |
| 19211 | fn | hasDismissedIosPwaHelp | (private) | `function hasDismissedIosPwaHelp() {` |
| 19224 | fn | markIosPwaHelpDismissed | (private) | `function markIosPwaHelpDismissed() {` |
| 19236 | fn | getInstallBannerDismissedInSession | (private) | `function getInstallBannerDismissedInSession() {` |
| 19247 | fn | setInstallBannerDismissedInSession | (private) | `function setInstallBannerDismissedInSession(val...` |
| 19254 | fn | hasDismissedInstallBanner | (private) | `function hasDismissedInstallBanner() {` |
| 19270 | fn | markInstallBannerDismissed | (private) | `function markInstallBannerDismissed() {` |
| 19280 | fn | shouldShowInstallBanner | (private) | `function shouldShowInstallBanner() {` |
| 19288 | fn | updateInstallBannerVisibility | (private) | `function updateInstallBannerVisibility() {` |
| 19307 | fn | updateInstallBannerColors | (private) | `function updateInstallBannerColors() {` |
| 19332 | fn | renderInstallGuideContent | (private) | `function renderInstallGuideContent(platform, la...` |
| 19352 | fn | toArray | (private) | - |
| 19407 | fn | openInstallGuide | (private) | `function openInstallGuide(platform) {` |
| 19424 | fn | closeInstallGuide | (private) | `function closeInstallGuide() {` |
| 19438 | fn | setupInstallBanner | (private) | `function setupInstallBanner() {` |
| 19498 | fn | handleChange | (private) | `const handleChange = () => updateInstallBannerV...` |
| 19513 | fn | applyInstallTexts | (private) | `function applyInstallTexts(lang) {` |
| 19589 | fn | shouldShowIosPwaHelp | (private) | `function shouldShowIosPwaHelp() {` |
| 19602 | fn | openIosPwaHelp | (private) | `function openIosPwaHelp() {` |
| 19617 | fn | closeIosPwaHelp | (private) | `function closeIosPwaHelp(storeDismissal = false) {` |
| 19632 | fn | maybeShowIosPwaHelp | (private) | `function maybeShowIosPwaHelp() {` |
| 19694 | fn | applySettingsTabsOrientation | (private) | `function applySettingsTabsOrientation(matches) {` |
| 19703 | fn | handleSettingsTabsOrientationChange | (private) | - |
| 19718 | fn | updateSettingsTabsOverflowIndicators | (private) | `function updateSettingsTabsOverflowIndicators() {` |
| 19759 | fn | scheduleSettingsTabsOverflowUpdate | (private) | `function scheduleSettingsTabsOverflowUpdate() {` |
| 19782 | fn | scrollSettingsTabs | (private) | `function scrollSettingsTabs(direction) {` |
| 19819 | fn | passiveTestHandler | (private) | `const passiveTestHandler = () => { };` |
| 19904 | fn | documentationTrackerController | (private) | `const documentationTrackerController = (() => {` |
| 19968 | fn | noop | (private) | `const noop = () => { };` |
| 19993 | fn | activateSettingsTab | (private) | `function activateSettingsTab(tabId, options = {...` |
| 20211 | fn | getAutoGearConditionConfig | (private) | `function getAutoGearConditionConfig(key) {` |
| 20221 | fn | getAutoGearConditionLabel | (private) | `function getAutoGearConditionLabel(key) {` |
| 20237 | fn | isAutoGearConditionActive | (private) | `function isAutoGearConditionActive(key) {` |
| 20241 | fn | refreshAutoGearConditionPicker | (private) | `function refreshAutoGearConditionPicker() {` |
| 20272 | fn | updateAutoGearConditionAddButtonState | (private) | `function updateAutoGearConditionAddButtonState() {` |
| 20292 | fn | focusAutoGearConditionSection | (private) | `function focusAutoGearConditionSection(key, opt...` |
| 20321 | fn | notifyAutoGearConditionRepeat | (private) | `function notifyAutoGearConditionRepeat(key) {` |
| 20343 | fn | handleAutoGearConditionShortcut | (private) | `function handleAutoGearConditionShortcut() {` |
| 20362 | fn | addAutoGearCondition | (private) | `function addAutoGearCondition(key, options = {}) {` |
| 20439 | fn | addAutoGearConditionFromPicker | (private) | `function addAutoGearConditionFromPicker() {` |
| 20454 | fn | removeAutoGearCondition | (private) | `function removeAutoGearCondition(key, options =...` |
| 20523 | fn | clearAllAutoGearConditions | (private) | `function clearAllAutoGearConditions(options = {...` |
| 20595 | fn | initializeAutoGearConditionsFromDraft | (private) | `function initializeAutoGearConditionsFromDraft() {` |
| 20678 | fn | handleShootingDaysModeChange | (private) | `const handleShootingDaysModeChange = () => {` |
| 20686 | fn | handleShootingDaysValueInput | (private) | `const handleShootingDaysValueInput = () => {` |
| 20697 | fn | handleLogicChange | (private) | `const handleLogicChange = () => {` |
| 20717 | fn | handleCameraWeightOperatorChange | (private) | `const handleCameraWeightOperatorChange = () => {` |
| 20725 | fn | handleCameraWeightValueInput | (private) | `const handleCameraWeightValueInput = () => {` |
| 20792 | fn | enableAutoGearMultiSelectToggle | (private) | `function enableAutoGearMultiSelectToggle(select) {` |
| 20795 | fn | handlePointerToggle | (private) | - |
| 20820 | fn | dispatchEvent | (private) | - |
| 20917 | fn | syncAutoGearMonitorFieldVisibility | (private) | `function syncAutoGearMonitorFieldVisibility() {` |
| 20998 | fn | queueAutoGearRetentionHandler | (private) | - |
| 21013 | fn | computeAutoGearMultiSelectSize | (private) | `function computeAutoGearMultiSelectSize(optionC...` |
| 21028 | fn | setAutoGearSearchQuery | (private) | `function setAutoGearSearchQuery(value) {` |
| 21035 | fn | setAutoGearScenarioFilter | (private) | `function setAutoGearScenarioFilter(value) {` |
| 21042 | fn | clearAutoGearFilters | (private) | `function clearAutoGearFilters() {` |
| 21062 | fn | autoGearRuleMatchesScenario | (private) | `function autoGearRuleMatchesScenario(rule, scen...` |
| 21068 | fn | autoGearRuleMatchesSearch | (private) | `function autoGearRuleMatchesSearch(rule, query) {` |
| 21072 | fn | pushValues | (private) | - |
| 21132 | fn | collectItems | (private) | - |
| 21194 | fn | getAutoGearScenarioFallbackOptions | (private) | `function getAutoGearScenarioFallbackOptions() {` |
| 21195 | fn | normalizeEntry | (private) | - |
| 21218 | fn | resolveFromSession | (private) | `const resolveFromSession = () => {` |
| 21236 | fn | resolveFromScenarioIcons | (private) | `const resolveFromScenarioIcons = () => {` |
| 21252 | fn | resolveFromFallbackValues | (private) | `const resolveFromFallbackValues = () =>` |
| 21262 | fn | collectAutoGearScenarioFilterOptions | (private) | `function collectAutoGearScenarioFilterOptions(r...` |
| 21300 | fn | refreshAutoGearScenarioFilterOptions | (private) | `function refreshAutoGearScenarioFilterOptions(r...` |
| 21334 | fn | cloneAutoGearDraftItem | (private) | `function cloneAutoGearDraftItem(item) {` |
| 21352 | fn | createAutoGearDraft | (private) | `function createAutoGearDraft(rule) {` |
| 21474 | fn | getCrewRoleEntries | (private) | `function getCrewRoleEntries() {` |
| 21615 | fn | initAppCoreNewDomReferences | (private) | `function initAppCoreNewDomReferences() {` |

