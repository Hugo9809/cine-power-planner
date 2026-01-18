# src/scripts/core/app-core-new-2.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 20068
- **Language:** JavaScript
- **Symbols:** 652
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 37 | fn | corePart2Runtime | (private) | `function corePart2Runtime() {` |
| 41 | fn | resolveCoreSharedPart2 | (private) | `function resolveCoreSharedPart2() {` |
| 91 | fn | resolveCoreRuntimeHelpersPart2 | (private) | `function resolveCoreRuntimeHelpersPart2() {` |
| 406 | fn | resolveCoreBinding | (private) | `const resolveCoreBinding = (name, fallback) => {` |
| 501 | fn | resolveRuntimeScopeFunction | (private) | `function resolveRuntimeScopeFunction(name, excl...` |
| 518 | fn | inspectCandidate | (private) | - |
| 626 | fn | createDynamicScopeFunctionResolver | (private) | `function createDynamicScopeFunctionResolver(nam...` |
| 633 | fn | dynamicResolverProxy | (private) | `function dynamicResolverProxy() {` |
| 649 | fn | fallbackGetViewfinderFallbackLabelLocal | (private) | `function fallbackGetViewfinderFallbackLabelLoca...` |
| 665 | fn | fallbackGetVideoDistributionFallbackLabelLocal | (private) | `function fallbackGetVideoDistributionFallbackLa...` |
| 690 | fn | ensureGlobalFunctionBinding | (private) | `function ensureGlobalFunctionBinding(name, fn) {` |
| 695 | fn | assignToScope | (private) | - |
| 856 | fn | flushCoreBootQueue | (private) | `function flushCoreBootQueue() {` |
| 908 | fn | sharedDeviceManagerLists | (private) | `const sharedDeviceManagerLists = (() => {` |
| 950 | fn | activeDeviceManagerLists | (private) | `const activeDeviceManagerLists = (() => {` |
| 997 | fn | callCoreFunctionFromPart2 | (private) | `function callCoreFunctionFromPart2(functionName...` |
| 1090 | fn | appendOption | (private) | `const appendOption = (value, label) => {` |
| 1128 | fn | refreshAutoGearCameraOptions | (private) | `function refreshAutoGearCameraOptions(selected) {` |
| 1137 | fn | addOption | (private) | - |
| 1166 | fn | refreshAutoGearCameraWeightCondition | (private) | `function refreshAutoGearCameraWeightCondition(s...` |
| 1167 | fn | source | (private) | `const source = (() => {` |
| 1200 | fn | updateAutoGearCameraWeightDraft | (private) | `function updateAutoGearCameraWeightDraft() {` |
| 1221 | fn | updateAutoGearShootingDaysDraft | (private) | `function updateAutoGearShootingDaysDraft() {` |
| 1244 | fn | refreshAutoGearMonitorOptions | (private) | `function refreshAutoGearMonitorOptions(selected) {` |
| 1253 | fn | addOption | (private) | - |
| 1282 | fn | refreshAutoGearTripodOptions | (private) | `function refreshAutoGearTripodOptions(select, s...` |
| 1297 | fn | addOption | (private) | `const addOption = (value, label) => {` |
| 1339 | fn | refreshAutoGearTripodHeadOptions | (private) | `function refreshAutoGearTripodHeadOptions(selec...` |
| 1349 | fn | refreshAutoGearTripodBowlOptions | (private) | `function refreshAutoGearTripodBowlOptions(selec...` |
| 1359 | fn | refreshAutoGearTripodTypesOptions | (private) | `function refreshAutoGearTripodTypesOptions(sele...` |
| 1369 | fn | refreshAutoGearTripodSpreaderOptions | (private) | `function refreshAutoGearTripodSpreaderOptions(s...` |
| 1379 | fn | refreshAutoGearWirelessOptions | (private) | `function refreshAutoGearWirelessOptions(selecte...` |
| 1388 | fn | addOption | (private) | - |
| 1417 | fn | refreshAutoGearMotorsOptions | (private) | `function refreshAutoGearMotorsOptions(selected) {` |
| 1427 | fn | addOption | (private) | - |
| 1457 | fn | refreshAutoGearControllersOptions | (private) | `function refreshAutoGearControllersOptions(sele...` |
| 1466 | fn | addOption | (private) | - |
| 1496 | fn | refreshAutoGearDistanceOptions | (private) | `function refreshAutoGearDistanceOptions(selecte...` |
| 1505 | fn | addOption | (private) | - |
| 1537 | fn | populateAutoGearCategorySelect | (private) | `function populateAutoGearCategorySelect(select,...` |
| 1562 | fn | updateAutoGearCatalogOptions | (private) | `function updateAutoGearCatalogOptions() {` |
| 1575 | fn | updateAutoGearMonitorDefaultOptions | (private) | `function updateAutoGearMonitorDefaultOptions(ta...` |
| 1624 | fn | renderAutoGearMonitorDefaultsControls | (private) | `function renderAutoGearMonitorDefaultsControls() {` |
| 1645 | fn | formatAutoGearCount | (private) | `function formatAutoGearCount(count, singularKey...` |
| 1655 | fn | formatAutoGearItemSummary | (private) | `function formatAutoGearItemSummary(item, option...` |
| 1738 | fn | formatWithPlaceholders | (private) | `function formatWithPlaceholders(template, ...va...` |
| 1745 | fn | formatAutoGearRuleCount | (private) | `function formatAutoGearRuleCount(count) {` |
| 1758 | fn | ensureAutoGearBackupDateFormatter | (private) | `function ensureAutoGearBackupDateFormatter() {` |
| 1797 | fn | formatAutoGearBackupCount | (private) | `function formatAutoGearBackupCount(count) {` |
| 1814 | fn | formatAutoGearBackupTime | (private) | `function formatAutoGearBackupTime(isoString) {` |
| 1832 | fn | formatAutoGearBackupMeta | (private) | `function formatAutoGearBackupMeta(backup) {` |
| 1853 | fn | getAutoGearBackupSelectPlaceholder | (private) | `function getAutoGearBackupSelectPlaceholder() {` |
| 1859 | fn | updateAutoGearBackupRestoreButtonState | (private) | `function updateAutoGearBackupRestoreButtonState...` |
| 1865 | fn | updateAutoGearBackupRetentionWarning | (private) | `function updateAutoGearBackupRetentionWarning(m...` |
| 1879 | fn | renderAutoGearBackupRetentionControls | (private) | `function renderAutoGearBackupRetentionControls() {` |
| 1902 | fn | resolveAutoGearPersistenceModule | (private) | `function resolveAutoGearPersistenceModule() {` |
| 1921 | fn | persistAutoGearPresetsWithCache | (private) | `function persistAutoGearPresetsWithCache(preset...` |
| 1937 | fn | enforceAutoGearBackupRetentionLimitWithCache | (private) | `function enforceAutoGearBackupRetentionLimitWit...` |
| 1944 | fn | getAutoGearPresetById | (private) | `function getAutoGearPresetById(presetId) {` |
| 1949 | fn | getAutoGearAutoPresetLabel | (private) | `function getAutoGearAutoPresetLabel() {` |
| 1956 | fn | setAutoGearAutoPresetId | (private) | `function setAutoGearAutoPresetId(presetId, opti...` |
| 1974 | fn | reconcileAutoGearAutoPresetState | (private) | `function reconcileAutoGearAutoPresetState(optio...` |
| 1993 | fn | syncAutoGearAutoPreset | (private) | `function syncAutoGearAutoPreset(rules) {` |
| 2048 | fn | setActiveAutoGearPresetId | (private) | `function setActiveAutoGearPresetId(presetId, op...` |
| 2065 | fn | resolveBaseAutoGearRulesSnapshot | (private) | `function resolveBaseAutoGearRulesSnapshot() {` |
| 2093 | fn | alignActiveAutoGearPreset | (private) | `function alignActiveAutoGearPreset(options = {}) {` |
| 2108 | fn | renderAutoGearPresetsControls | (private) | `function renderAutoGearPresetsControls() {` |
| 2157 | fn | ensureAutoGearPresetNameDialog | (private) | `function ensureAutoGearPresetNameDialog() {` |
| 2232 | fn | getAutoGearPresetNameFocusTargets | (private) | `function getAutoGearPresetNameFocusTargets() {` |
| 2237 | fn | handleAutoGearPresetNameKeydown | (private) | `function handleAutoGearPresetNameKeydown(event) {` |
| 2269 | fn | handleAutoGearPresetNameSubmit | (private) | `function handleAutoGearPresetNameSubmit(event) {` |
| 2288 | fn | closeAutoGearPresetNameDialog | (private) | `function closeAutoGearPresetNameDialog(result) {` |
| 2316 | fn | cancelAutoGearPresetNameDialog | (private) | `function cancelAutoGearPresetNameDialog() {` |
| 2320 | fn | requestAutoGearPresetName | (private) | `function requestAutoGearPresetName(promptMessag...` |
| 2399 | fn | applyAutoGearBackupVisibility | (private) | `function applyAutoGearBackupVisibility() {` |
| 2424 | fn | setAutoGearBackupsVisible | (private) | `function setAutoGearBackupsVisible(show) {` |
| 2439 | fn | handleAutoGearPresetSelection | (private) | `function handleAutoGearPresetSelection(event) {` |
| 2463 | fn | performApply | (private) | `const performApply = () => {` |
| 2490 | fn | handleAutoGearSavePreset | (private) | `async function handleAutoGearSavePreset() {` |
| 2581 | fn | handleAutoGearDeletePreset | (private) | `function handleAutoGearDeletePreset() {` |
| 2592 | fn | performDelete | (private) | `const performDelete = () => {` |
| 2622 | fn | handleAutoGearShowBackupsToggle | (private) | `function handleAutoGearShowBackupsToggle() {` |
| 2627 | fn | handleAutoGearBackupRetentionInput | (private) | `function handleAutoGearBackupRetentionInput() {` |
| 2634 | fn | handleAutoGearBackupRetentionBlur | (private) | `function handleAutoGearBackupRetentionBlur() {` |
| 2642 | fn | handleAutoGearBackupRetentionChange | (private) | `function handleAutoGearBackupRetentionChange() {` |
| 2679 | fn | proceedWithRetentionChange | (private) | `const proceedWithRetentionChange = () => {` |
| 2740 | fn | cancelCallback | (private) | `const cancelCallback = () => {` |
| 2783 | fn | renderAutoGearBackupControls | (private) | `function renderAutoGearBackupControls() {` |
| 2835 | fn | extractAutoGearTriggers | (private) | `function extractAutoGearTriggers(rule) {` |
| 2884 | fn | snapshotAutoGearRuleForSummary | (private) | `function snapshotAutoGearRuleForSummary(rule, i...` |
| 2905 | fn | createAutoGearRuleReference | (private) | `function createAutoGearRuleReference(rule) {` |
| 2915 | fn | dedupeAutoGearRuleReferences | (private) | `function dedupeAutoGearRuleReferences(refs) {` |
| 2928 | fn | createAutoGearItemKey | (private) | `function createAutoGearItemKey(item) {` |
| 2943 | fn | createAutoGearTriggerKeyForSummary | (private) | `function createAutoGearTriggerKeyForSummary(rul...` |
| 2969 | fn | collectAutoGearScenarioCatalog | (private) | `function collectAutoGearScenarioCatalog() {` |
| 2988 | fn | getAutoGearRuleCoverageSummary | (private) | `function getAutoGearRuleCoverageSummary(options...` |
| 3194 | fn | formatAutoGearRuleReference | (private) | `function formatAutoGearRuleReference(ref, langT...` |
| 3218 | fn | getAutoGearAnyMotorLabelForLang | (private) | `function getAutoGearAnyMotorLabelForLang(langTe...` |
| 3224 | fn | formatAutoGearMotorValue | (private) | `function formatAutoGearMotorValue(value, langTe...` |
| 3232 | fn | formatAutoGearTriggerDescription | (private) | `function formatAutoGearTriggerDescription(trigg...` |
| 3246 | fn | formatScenarioLabel | (private) | - |
| 3382 | fn | renderAutoGearRuleSummary | (private) | `function renderAutoGearRuleSummary(analysis, co...` |
| 3460 | fn | formatRulesCount | (private) | - |
| 3479 | fn | buildCard | (private) | `const buildCard = (config) => {` |
| 3574 | fn | appendRuleButtons | (private) | `const appendRuleButtons = (container, rules) => {` |
| 3825 | fn | setAutoGearSummaryFocus | (private) | `function setAutoGearSummaryFocus(value) {` |
| 3835 | fn | focusAutoGearRuleById | (private) | `function focusAutoGearRuleById(ruleId) {` |
| 3861 | fn | renderAutoGearRulesList | (private) | `function renderAutoGearRulesList() {` |
| 3882 | fn | focusRuleIds | (private) | `const focusRuleIds = (() => {` |
| 4394 | fn | resetAutoGearDraftInputs | (private) | `function resetAutoGearDraftInputs(type) {` |
| 4426 | fn | updateAutoGearItemButtonState | (private) | `function updateAutoGearItemButtonState(type) {` |
| 4448 | fn | readAutoGearOwnGearSelection | (private) | `function readAutoGearOwnGearSelection(select) {` |
| 4461 | fn | applyAutoGearOwnGearSelection | (private) | `function applyAutoGearOwnGearSelection(type) {` |
| 4489 | fn | updateAutoGearDraftActionState | (private) | `function updateAutoGearDraftActionState() {` |
| 4494 | fn | getAutoGearDraftList | (private) | `function getAutoGearDraftList(type) {` |
| 4500 | fn | populateAutoGearDraftForm | (private) | `function populateAutoGearDraftForm(type, item) {` |
| 4580 | fn | clearAutoGearDraftItemEdit | (private) | `function clearAutoGearDraftItemEdit(type, optio...` |
| 4594 | fn | beginAutoGearDraftItemEdit | (private) | `function beginAutoGearDraftItemEdit(listType, i...` |
| 4615 | fn | getAutoGearItemIdentityData | (private) | `function getAutoGearItemIdentityData(item) {` |
| 4644 | fn | normalizeAutoGearRuleForPreview | (private) | `function normalizeAutoGearRuleForPreview(rule) {` |
| 4653 | fn | aggregateAutoGearRuleItems | (private) | `function aggregateAutoGearRuleItems(rules, opti...` |
| 4702 | fn | computeAutoGearDraftImpactState | (private) | `function computeAutoGearDraftImpactState() {` |
| 4778 | fn | formatAutoGearImpactNumber | (private) | `function formatAutoGearImpactNumber(value) {` |
| 4791 | fn | formatAutoGearImpactSigned | (private) | `function formatAutoGearImpactSigned(value) {` |
| 4799 | fn | formatAutoGearDraftItemLabel | (private) | `function formatAutoGearDraftItemLabel(item, qua...` |
| 4812 | fn | hasAutoGearDraftWarnings | (private) | `function hasAutoGearDraftWarnings(warnings) {` |
| 4821 | fn | buildAutoGearDraftWarningMessages | (private) | `function buildAutoGearDraftWarningMessages(warn...` |
| 4825 | fn | addMessage | (private) | `const addMessage = (key, label) => {` |
| 4848 | fn | renderAutoGearDraftImpact | (private) | `function renderAutoGearDraftImpact() {` |
| 4986 | fn | renderAutoGearDraftLists | (private) | `function renderAutoGearDraftLists() {` |
| 4994 | fn | renderList | (private) | `const renderList = (element, items, type) => {` |
| 5058 | fn | openAutoGearEditor | (private) | `function openAutoGearEditor(ruleId, options = {...` |
| 5111 | fn | closeAutoGearEditor | (private) | `function closeAutoGearEditor() {` |
| 5139 | fn | addAutoGearDraftItem | (private) | `function addAutoGearDraftItem(type) {` |
| 5261 | fn | saveAutoGearRuleFromEditor | (private) | `function saveAutoGearRuleFromEditor() {` |
| 5322 | fn | cameraWeightCondition | (private) | `const cameraWeightCondition = (() => {` |
| 5426 | fn | shootingDaysRequirement | (private) | `const shootingDaysRequirement = (() => {` |
| 5530 | fn | performSave | (private) | `const performSave = () => {` |
| 5573 | fn | duplicateAutoGearRule | (private) | `function duplicateAutoGearRule(ruleId, ruleInde...` |
| 5604 | fn | formatCandidate | (private) | - |
| 5654 | fn | setAutoGearRuleEnabled | (private) | `function setAutoGearRuleEnabled(ruleId, enabled...` |
| 5686 | fn | deleteAutoGearRule | (private) | `function deleteAutoGearRule(ruleId, ruleIndex) {` |
| 5704 | fn | performRuleDelete | (private) | `const performRuleDelete = () => {` |
| 5731 | fn | normalizeAutoGearPayloadMetadata | (private) | `function normalizeAutoGearPayloadMetadata(candi...` |
| 5735 | fn | assignIfString | (private) | `const assignIfString = (key, value) => {` |
| 5786 | fn | collectAutoGearPayloadMetadata | (private) | `function collectAutoGearPayloadMetadata(...sour...` |
| 5791 | fn | enqueue | (private) | - |
| 5823 | fn | parseAutoGearImportPayload | (private) | `function parseAutoGearImportPayload(data) {` |
| 5824 | fn | extractMonitorDefaults | (private) | - |
| 5835 | fn | resolveValue | (private) | - |
| 5851 | fn | enqueue | (private) | `const enqueue = (rawValue, parent, root, key) => {` |
| 6004 | fn | parseSemanticVersion | (private) | `function parseSemanticVersion(version) {` |
| 6018 | fn | compareSemanticVersions | (private) | `function compareSemanticVersions(a, b) {` |
| 6032 | fn | isValidIsoTimestamp | (private) | `function isValidIsoTimestamp(value) {` |
| 6041 | fn | validateAutoGearImportPayload | (private) | `function validateAutoGearImportPayload(parsed) {` |
| 6118 | fn | getAutoGearImportMetadataFieldLabel | (private) | `function getAutoGearImportMetadataFieldLabel(fi...` |
| 6131 | fn | formatAutoGearImportWarningMessage | (private) | `function formatAutoGearImportWarningMessage(war...` |
| 6169 | fn | displayAutoGearImportWarnings | (private) | `function displayAutoGearImportWarnings(warnings...` |
| 6214 | fn | importAutoGearRulesFromData | (private) | `function importAutoGearRulesFromData(data, opti...` |
| 6278 | fn | formatAutoGearExportFilename | (private) | `function formatAutoGearExportFilename(date) {` |
| 6284 | fn | exportAutoGearRules | (private) | `function exportAutoGearRules() {` |
| 6335 | fn | formatAutoGearPresetExportFilename | (private) | `function formatAutoGearPresetExportFilename(dat...` |
| 6341 | fn | normalizeAutoGearPresetForExport | (private) | `function normalizeAutoGearPresetForExport(prese...` |
| 6378 | fn | exportAutoGearPresets | (private) | `function exportAutoGearPresets(options = {}) {` |
| 6453 | fn | captureAutoGearBackupSnapshot | (private) | `function captureAutoGearBackupSnapshot(options ...` |
| 6523 | fn | createAutoGearBackup | (private) | `function createAutoGearBackup(options = {}) {` |
| 6528 | fn | restoreAutoGearBackup | (private) | `function restoreAutoGearBackup(backupId) {` |
| 6535 | fn | performRestore | (private) | `const performRestore = () => {` |
| 6580 | fn | handleAutoGearImportSelection | (private) | `function handleAutoGearImportSelection(event) {` |
| 6587 | fn | performImport | (private) | `const performImport = () => {` |
| 6650 | fn | createLocalHelpModuleFallback | (private) | `function createLocalHelpModuleFallback() {` |
| 6651 | fn | fallbackResolveStorageKey | (private) | `function fallbackResolveStorageKey(explicitKey) {` |
| 6677 | fn | fallbackIsIosDevice | (private) | `function fallbackIsIosDevice(navigatorOverride) {` |
| 6688 | fn | fallbackIsAndroidDevice | (private) | `function fallbackIsAndroidDevice(navigatorOverr...` |
| 6698 | fn | fallbackIsStandaloneDisplayMode | (private) | `function fallbackIsStandaloneDisplayMode(window...` |
| 6721 | fn | fallbackHasDismissedIosPwaHelp | (private) | `function fallbackHasDismissedIosPwaHelp(explici...` |
| 6736 | fn | fallbackMarkIosPwaHelpDismissed | (private) | `function fallbackMarkIosPwaHelpDismissed(explic...` |
| 6750 | fn | fallbackShouldShow | (private) | `function fallbackShouldShow(resolveDialog) {` |
| 6778 | fn | helpModuleApi | (private) | `const helpModuleApi = (() => {` |
| 6812 | fn | resolveFeatureSearchNormalizationApi | (private) | `function resolveFeatureSearchNormalizationApi() {` |
| 6901 | fn | resolveFeatureSearchNormalizationFunction | (private) | `function resolveFeatureSearchNormalizationFunct...` |
| 6909 | fn | createFeatureSearchFallback | (private) | `function createFeatureSearchFallback() {` |
| 6954 | fn | resolveFeatureSearchModuleApi | (private) | `function resolveFeatureSearchModuleApi() {` |
| 6975 | fn | logModuleWarning | (private) | `function logModuleWarning(message, error) {` |
| 7080 | fn | isIosDevice | (private) | `function isIosDevice() {` |
| 7093 | fn | isAndroidDevice | (private) | `function isAndroidDevice() {` |
| 7106 | fn | isStandaloneDisplayMode | (private) | `function isStandaloneDisplayMode() {` |
| 7119 | fn | hasDismissedIosPwaHelp | (private) | `function hasDismissedIosPwaHelp() {` |
| 7132 | fn | markIosPwaHelpDismissed | (private) | `function markIosPwaHelpDismissed() {` |
| 7144 | fn | getInstallBannerGlobalScope | (private) | `function getInstallBannerGlobalScope() {` |
| 7184 | fn | resolveCoreRuntimeFunction | (private) | `function resolveCoreRuntimeFunction(name) {` |
| 7205 | fn | configureIconOnlyButtonSafe | (private) | `function configureIconOnlyButtonSafe(button, gl...` |
| 7248 | fn | ensureArray | (private) | `const ensureArray = (value) => {` |
| 7304 | fn | getInstallBannerDismissedInSession | (private) | `function getInstallBannerDismissedInSession() {` |
| 7316 | fn | setInstallBannerDismissedInSession | (private) | `function setInstallBannerDismissedInSession(val...` |
| 7324 | fn | hasDismissedInstallBanner | (private) | `function hasDismissedInstallBanner() {` |
| 7340 | fn | markInstallBannerDismissed | (private) | `function markInstallBannerDismissed() {` |
| 7350 | fn | shouldShowInstallBanner | (private) | `function shouldShowInstallBanner() {` |
| 7357 | fn | updateInstallBannerVisibility | (private) | `function updateInstallBannerVisibility() {` |
| 7375 | fn | updateInstallBannerColors | (private) | `function updateInstallBannerColors() {` |
| 7399 | fn | updateInstallBannerPosition | (private) | `function updateInstallBannerPosition() {` |
| 7405 | fn | renderInstallGuideContent | (private) | `function renderInstallGuideContent(platform, la...` |
| 7424 | fn | toArray | (private) | - |
| 7481 | fn | openInstallGuide | (private) | `function openInstallGuide(platform) {` |
| 7493 | fn | closeInstallGuide | (private) | `function closeInstallGuide() {` |
| 7502 | fn | setupInstallBanner | (private) | `function setupInstallBanner() {` |
| 7549 | fn | handleChange | (private) | `const handleChange = () => updateInstallBannerV...` |
| 7562 | fn | applyInstallTexts | (private) | `function applyInstallTexts(lang) {` |
| 7620 | fn | resolveGlobalElement | (private) | `function resolveGlobalElement(name, elementId) {` |
| 7625 | fn | assignResolved | (private) | - |
| 7663 | fn | resolveIosPwaHelpDialog | (private) | `function resolveIosPwaHelpDialog() {` |
| 7667 | fn | resolveIosPwaHelpClose | (private) | `function resolveIosPwaHelpClose() {` |
| 7676 | fn | shouldShowIosPwaHelp | (private) | `function shouldShowIosPwaHelp() {` |
| 7689 | fn | openIosPwaHelp | (private) | `function openIosPwaHelp() {` |
| 7702 | fn | closeIosPwaHelp | (private) | `function closeIosPwaHelp(storeDismissal = false) {` |
| 7714 | fn | maybeShowIosPwaHelp | (private) | `function maybeShowIosPwaHelp() {` |
| 7749 | fn | renderSettingsLogoPreview | (private) | `function renderSettingsLogoPreview(dataUrl) {` |
| 7764 | fn | loadStoredLogoPreview | (private) | `function loadStoredLogoPreview() {` |
| 7775 | fn | isPlainObjectValue | (private) | `const isPlainObjectValue = (val) => val !== nul...` |
| 7816 | fn | normalizeDeviceEntryCollection | (private) | `function normalizeDeviceEntryCollection(collect...` |
| 7879 | fn | ensureNestedDeviceCollections | (private) | `function ensureNestedDeviceCollections(source, ...` |
| 7933 | fn | normalizeLegacyDeviceCategoryKey | (private) | `function normalizeLegacyDeviceCategoryKey(rawKe...` |
| 7977 | fn | convertLegacyDeviceCategoryValue | (private) | `function convertLegacyDeviceCategoryValue(value) {` |
| 8100 | fn | convertLegacyDeviceDatabaseArray | (private) | `function convertLegacyDeviceDatabaseArray(entri...` |
| 8181 | fn | mergeLegacyDeviceCategoryAssignments | (private) | `function mergeLegacyDeviceCategoryAssignments(t...` |
| 8205 | fn | convertLegacyDeviceDatabaseContainer | (private) | `function convertLegacyDeviceDatabaseContainer(c...` |
| 8261 | fn | upgradeDeviceDatabaseSchema | (private) | `function upgradeDeviceDatabaseSchema(candidate) {` |
| 8297 | fn | isDeviceEntryObject | (private) | `function isDeviceEntryObject(value) {` |
| 8304 | fn | countDeviceDatabaseEntries | (private) | `function countDeviceDatabaseEntries(collection) {` |
| 8325 | fn | looksLikeDeviceDatabase | (private) | `function looksLikeDeviceDatabase(candidate) {` |
| 8338 | fn | collectReferenceFizKeys | (private) | `function collectReferenceFizKeys() {` |
| 8351 | fn | collectReferenceAccessoryKeys | (private) | `function collectReferenceAccessoryKeys() {` |
| 8364 | fn | validateDeviceDatabaseStructure | (private) | `function validateDeviceDatabaseStructure(candid...` |
| 8431 | fn | inspectCollections | (private) | `const inspectCollections = (collection, path = ...` |
| 8477 | fn | parseDeviceDatabaseImport | (private) | `function parseDeviceDatabaseImport(rawData) {` |
| 8512 | fn | formatDeviceImportErrors | (private) | `function formatDeviceImportErrors(errors) {` |
| 8520 | fn | resolveLanguageCode | (private) | `function resolveLanguageCode(lang) {` |
| 8527 | fn | getLanguageTexts | (private) | `function getLanguageTexts(lang) {` |
| 8539 | fn | serializeIntlOptions | (private) | `function serializeIntlOptions(options) {` |
| 8560 | fn | getCachedIntlObject | (private) | `function getCachedIntlObject(cache, locale, opt...` |
| 8580 | fn | getNumberFormatter | (private) | `function getNumberFormatter(locale, options) {` |
| 8584 | fn | getPluralRules | (private) | `function getPluralRules(locale) {` |
| 8588 | fn | getListFormatter | (private) | `function getListFormatter(locale) {` |
| 8592 | fn | formatNumberForLang | (private) | `function formatNumberForLang(lang, value, optio...` |
| 8610 | fn | formatCountText | (private) | `function formatCountText(lang, langTexts, baseK...` |
| 8643 | fn | formatListForLang | (private) | `function formatListForLang(lang, items) {` |
| 8662 | fn | normalizeTemperatureUnit | (private) | `function normalizeTemperatureUnit(unit) {` |
| 8678 | fn | getRuntimeTemperatureUnit | (private) | `function getRuntimeTemperatureUnit() {` |
| 8709 | fn | convertCelsiusToUnit | (private) | `function convertCelsiusToUnit(value, unit) {` |
| 8723 | fn | getTemperatureUnitSymbolForLang | (private) | `function getTemperatureUnitSymbolForLang(lang =...` |
| 8740 | fn | getTemperatureUnitLabelForLang | (private) | `function getTemperatureUnitLabelForLang(lang = ...` |
| 8757 | fn | getTemperatureColumnLabelForLang | (private) | `function getTemperatureColumnLabelForLang(lang ...` |
| 8769 | fn | formatTemperatureForDisplay | (private) | `function formatTemperatureForDisplay(celsius, o...` |
| 8813 | fn | summarizeCustomDevices | (private) | `function summarizeCustomDevices() {` |
| 8843 | fn | hasGearListContent | (private) | `function hasGearListContent(entry) {` |
| 8871 | fn | computeGearListCount | (private) | `function computeGearListCount(projectData, setu...` |
| 8875 | fn | addCount | (private) | `const addCount = (name, candidate) => {` |
| 8913 | fn | computeFavoritesCount | (private) | `function computeFavoritesCount(favorites) {` |
| 8923 | fn | computeFeedbackCount | (private) | `function computeFeedbackCount(feedback) {` |
| 8936 | fn | pruneValueForImportantBackup | (private) | `function pruneValueForImportantBackup(value) {` |
| 8962 | fn | extractImportantProjectEntry | (private) | `function extractImportantProjectEntry(entry) {` |
| 9027 | fn | buildImportantProjectMap | (private) | `function buildImportantProjectMap(collection) {` |
| 9041 | fn | createImportantProjectData | (private) | `function createImportantProjectData(data) {` |
| 9073 | fn | estimateBackupSize | (private) | `function estimateBackupSize(data) {` |
| 9100 | fn | formatSizeText | (private) | `function formatSizeText(lang, langTexts, bytes) {` |
| 9121 | fn | formatDeviceCategories | (private) | `function formatDeviceCategories(lang, categorie...` |
| 9138 | fn | AUTO_BACKUP_HELPERS_NAMESPACE | (private) | `const AUTO_BACKUP_HELPERS_NAMESPACE = (() => {` |
| 9203 | fn | isAutomaticBackupName | (private) | `function isAutomaticBackupName(name) {` |
| 9211 | fn | parseAutoBackupTimestamp | (private) | `function parseAutoBackupTimestamp(name) {` |
| 9237 | fn | extractTimestampFromValue | (private) | `function extractTimestampFromValue(value) {` |
| 9243 | fn | considerDate | (private) | `const considerDate = (candidate) => {` |
| 9304 | fn | extractLatestManualSetupInfo | (private) | `function extractLatestManualSetupInfo(setups) {` |
| 9326 | fn | extractLatestAutoBackupInfo | (private) | `function extractLatestAutoBackupInfo(names) {` |
| 9341 | fn | extractLatestFullBackupInfo | (private) | `function extractLatestFullBackupInfo(entries) {` |
| 9391 | fn | formatAbsoluteTimestamp | (private) | `function formatAbsoluteTimestamp(date, lang) {` |
| 9406 | fn | formatRelativeTimestamp | (private) | `function formatRelativeTimestamp(date, lang) {` |
| 9438 | fn | formatStatusTimestamp | (private) | `function formatStatusTimestamp(date, lang, lang...` |
| 9456 | fn | applyStorageStatus | (private) | `function applyStorageStatus(element, info, lang...` |
| 9516 | fn | resolveStatusText | (private) | `function resolveStatusText(langTexts, key, fall...` |
| 9536 | fn | resolveConnectivityReasonText | (private) | `function resolveConnectivityReasonText(langText...` |
| 9541 | fn | isValidTimestamp | (private) | `function isValidTimestamp(date) {` |
| 9545 | fn | updateStorageStatusReminder | (private) | `function updateStorageStatusReminder(manualInfo...` |
| 9666 | fn | createSummaryItemElement | (private) | `function createSummaryItemElement(item) {` |
| 9706 | fn | readCriticalStorageGuardResult | (private) | `function readCriticalStorageGuardResult() {` |
| 9707 | fn | tryInvoke | (private) | `const tryInvoke = (fn) => {` |
| 9751 | fn | updateStorageSummary | (private) | `function updateStorageSummary() {` |
| 10068 | fn | initAppCorePart2DomReferences | (private) | `function initAppCorePart2DomReferences() {` |
| 10209 | fn | getFeatureSearchHistoryStorage | (private) | `const getFeatureSearchHistoryStorage = () => {` |
| 10226 | fn | buildFeatureSearchHistoryKey | (private) | `const buildFeatureSearchHistoryKey = (id, type ...` |
| 10231 | fn | scheduleFeatureSearchHistorySave | (private) | `const scheduleFeatureSearchHistorySave = () => {` |
| 10259 | fn | trimFeatureSearchHistory | (private) | `const trimFeatureSearchHistory = () => {` |
| 10268 | fn | resetFeatureSearchHistoryRetryTimer | (private) | `const resetFeatureSearchHistoryRetryTimer = () ...` |
| 10276 | fn | scheduleFeatureSearchHistoryRetry | (private) | `const scheduleFeatureSearchHistoryRetry = () => {` |
| 10289 | fn | loadFeatureSearchHistory | (private) | `const loadFeatureSearchHistory = () => {` |
| 10351 | fn | cleanupFeatureSearchHistory | (private) | `const cleanupFeatureSearchHistory = () => {` |
| 10364 | fn | getFeatureSearchHistoryData | (private) | `const getFeatureSearchHistoryData = (key, type)...` |
| 10371 | fn | registerFeatureSearchUsage | (private) | `const registerFeatureSearchUsage = (id, type = ...` |
| 10391 | fn | resolveRecentFeatureSearchOptions | (private) | `const resolveRecentFeatureSearchOptions = () => {` |
| 10406 | fn | resolveRecentFeatureSearchEntries | (private) | `const resolveRecentFeatureSearchEntries = () => {` |
| 10426 | fn | createDefaultSearchNormalizer | (private) | `const createDefaultSearchNormalizer = () => {` |
| 10432 | fn | normalizeSearchValue | (private) | - |
| 10454 | fn | getFeatureSearchEntryType | (private) | - |
| 10476 | fn | getFeatureSearchLabel | (private) | - |
| 10489 | fn | getFeatureSearchKeywords | (private) | - |
| 10496 | fn | updateFeatureSearchValue | (private) | `var updateFeatureSearchValue = (newValue, origi...` |
| 10512 | fn | runFeatureSearch | (private) | `var runFeatureSearch = () => { };` |
| 10516 | fn | recordFeatureSearchUsage | (private) | `var recordFeatureSearchUsage = (id, type, label...` |
| 10522 | fn | sanitizeFeatureSearchHighlightTokens | (private) | - |
| 10535 | fn | updateFeatureSearchHighlightTokens | (private) | - |
| 10539 | fn | collectFeatureSearchHighlightRanges | (private) | `const collectFeatureSearchHighlightRanges = (te...` |
| 10552 | fn | applyFeatureSearchHighlight | (private) | `const applyFeatureSearchHighlight = (element, t...` |
| 10567 | fn | normalizeFeatureSearchDetail | (private) | - |
| 10584 | fn | sanitizeFeatureSearchOptionIdValue | (private) | - |
| 10600 | fn | getFeatureSearchOptionId | (private) | - |
| 10623 | fn | buildFeatureSearchOptionData | (private) | - |
| 10660 | fn | normalizeFeatureSearchOption | (private) | - |
| 10684 | fn | getFeatureSearchContainer | (private) | `const getFeatureSearchContainer = () => {` |
| 10691 | fn | setFeatureSearchDropdownOpenClass | (private) | - |
| 10701 | fn | renderFeatureSearchDropdown | (private) | - |
| 10798 | fn | renderFeatureListOptions | (private) | - |
| 10817 | fn | restoreFeatureSearchDefaults | (private) | `function restoreFeatureSearchDefaults() {` |
| 10856 | fn | resolveFeatureSearchLocaleConfig | (private) | `const resolveFeatureSearchLocaleConfig = () => {` |
| 10946 | fn | filterFeatureSearchQueryTokens | (private) | - |
| 10977 | fn | normalizeFeatureSearchQuotes | (private) | - |
| 10982 | fn | extractFeatureSearchQuotedPhrases | (private) | - |
| 11003 | fn | extractFeatureSearchFilter | (private) | - |
| 11029 | fn | scoreFeatureSearchEntry | (private) | `function scoreFeatureSearchEntry(entry, queryKe...` |
| 11067 | fn | updateType | (private) | - |
| 11130 | fn | compareFeatureSearchCandidates | (private) | `const compareFeatureSearchCandidates = (a, b) => {` |
| 11204 | fn | renderFeatureSearchFilteredDefaults | (private) | `function renderFeatureSearchFilteredDefaults(fi...` |
| 11265 | fn | updateFeatureSearchSuggestions | (private) | `function updateFeatureSearchSuggestions(query) {` |
| 11383 | fn | createFeatureSearchEngineFallback | (private) | `function createFeatureSearchEngineFallback() {` |
| 11386 | fn | fallbackParseMarkSuffix | (private) | `function fallbackParseMarkSuffix(value) {` |
| 11461 | fn | fallbackNormalizeNumberWords | (private) | `function fallbackNormalizeNumberWords(str) {` |
| 11483 | fn | fallbackCollectTokens | (private) | `function fallbackCollectTokens(str) {` |
| 11552 | fn | resolveFeatureSearchEngineModuleApi | (private) | `function resolveFeatureSearchEngineModuleApi() {` |
| 11573 | fn | logModuleWarning | (private) | `function logModuleWarning(message, error) {` |
| 11730 | fn | toTitleCase | (private) | - |
| 11733 | fn | idToContextLabel | (private) | - |
| 11744 | fn | addUniqueContext | (private) | `const addUniqueContext = (contexts, seen, value...` |
| 11754 | fn | collectFeatureContexts | (private) | `const collectFeatureContexts = (element, baseLa...` |
| 11801 | fn | collectFeatureSearchHelpTexts | (private) | - |
| 11805 | fn | clean | (private) | - |
| 11814 | fn | add | (private) | - |
| 11821 | fn | addFromElement | (private) | - |
| 11834 | fn | processIdRefs | (private) | `const processIdRefs = (attrName, collector) => {` |
| 11860 | fn | buildFeatureEntryDetailText | (private) | - |
| 11883 | fn | buildHelpSectionDetailText | (private) | - |
| 11911 | fn | buildDeviceEntryDetailText | (private) | - |
| 11939 | fn | buildFeatureSearchEntry | (private) | `const buildFeatureSearchEntry = (element, { lab...` |
| 12002 | fn | escapeFeatureSearchRegExp | (private) | - |
| 12005 | fn | collectFeatureSearchTexts | (private) | - |
| 12007 | fn | push | (private) | - |
| 12037 | fn | computeLabelMatchDetails | (private) | `const computeLabelMatchDetails = (entry, rawQue...` |
| 12046 | fn | addLabel | (private) | - |
| 12107 | fn | computePhraseMatchDetails | (private) | `const computePhraseMatchDetails = (entry, query...` |
| 12150 | fn | computeQuotedPhraseMatchDetails | (private) | `const computeQuotedPhraseMatchDetails = (entry,...` |
| 12189 | fn | computeHistoryBoostScore | (private) | `const computeHistoryBoostScore = (count = 0, la...` |
| 12217 | fn | computeLevenshteinDistance | (private) | `const computeLevenshteinDistance = (a, b) => {` |
| 12248 | fn | getAdaptiveFuzzyMaxDistance | (private) | - |
| 12264 | fn | isAcceptableFuzzyMatch | (private) | `const isAcceptableFuzzyMatch = (entryKey, query...` |
| 12302 | fn | normalizeAccentValue | (private) | - |
| 12308 | fn | updateAccentColorResetButtonState | (private) | `const updateAccentColorResetButtonState = () => {` |
| 12332 | fn | parseRgbComponent | (private) | `function parseRgbComponent(value) {` |
| 12345 | fn | parseColorToRgb | (private) | `function parseColorToRgb(color) {` |
| 12379 | fn | computeRelativeLuminance | (private) | `function computeRelativeLuminance(rgb) {` |
| 12381 | fn | clamp | (private) | - |
| 12386 | fn | transform | (private) | - |
| 12396 | fn | computeSaturation | (private) | `function computeSaturation(rgb) {` |
| 12398 | fn | normalize | (private) | - |
| 12413 | fn | PINK_REFERENCE_LUMINANCE | (private) | `const PINK_REFERENCE_LUMINANCE = (() => {` |
| 12419 | fn | shouldEnableDarkModeAccentBoost | (private) | `function shouldEnableDarkModeAccentBoost({ colo...` |
| 12438 | fn | refreshDarkModeAccentBoost | (private) | `function refreshDarkModeAccentBoost(options = {...` |
| 12445 | fn | isHighContrastActive | (private) | `var isHighContrastActive = () =>` |
| 12450 | fn | hasCustomAccentSelection | (private) | `var hasCustomAccentSelection = () => {` |
| 12455 | fn | shouldPreserveAccentInPinkMode | (private) | `var shouldPreserveAccentInPinkMode = () => false;` |
| 12457 | fn | applyAccentColor | (private) | `var applyAccentColor = (color) => {` |
| 12479 | fn | clearAccentColorOverrides | (private) | `var clearAccentColorOverrides = () => {` |
| 12633 | fn | loadCustomFontMetadataFromStorage | (private) | `function loadCustomFontMetadataFromStorage() {` |
| 12653 | fn | persistCustomFontsToStorage | (private) | `function persistCustomFontsToStorage() {` |
| 12669 | fn | sanitizeCustomFontName | (private) | `function sanitizeCustomFontName(name) {` |
| 12676 | fn | deriveFontNameFromFile | (private) | `function deriveFontNameFromFile(file) {` |
| 12685 | fn | ensureUniqueCustomFontName | (private) | `function ensureUniqueCustomFontName(baseName) {` |
| 12701 | fn | cssEscapeFontName | (private) | `function cssEscapeFontName(name) {` |
| 12708 | fn | registerCustomFontSource | (private) | `async function registerCustomFontSource(name, d...` |
| 12750 | fn | applyStoredCustomFont | (private) | `async function applyStoredCustomFont(entry) {` |
| 12761 | fn | loadStoredCustomFonts | (private) | `async function loadStoredCustomFonts() {` |
| 12779 | fn | resetCustomFontsForFactoryReset | (private) | `function resetCustomFontsForFactoryReset() {` |
| 12838 | fn | isSupportedFontFile | (private) | `function isSupportedFontFile(file) {` |
| 12848 | fn | readFileAsDataURL | (private) | `function readFileAsDataURL(file) {` |
| 12865 | fn | addCustomFontFromData | (private) | `async function addCustomFontFromData(name, data...` |
| 12887 | fn | handleLocalFontFiles | (private) | `async function handleLocalFontFiles(fileList) {` |
| 12963 | fn | normalizeFontResults | (private) | `async function normalizeFontResults(result) {` |
| 12985 | fn | queryAvailableLocalFonts | (private) | `const queryAvailableLocalFonts = (() => {` |
| 13022 | fn | getLocalizedText | (private) | `function getLocalizedText(key) {` |
| 13028 | fn | guessFontFallback | (private) | `function guessFontFallback(name) {` |
| 13043 | fn | buildFontFamilyValue | (private) | `function buildFontFamilyValue(name) {` |
| 13049 | fn | extractFontLabel | (private) | `function extractFontLabel(value) {` |
| 13076 | fn | ensureFontFamilyOption | (private) | `function ensureFontFamilyOption(value, label, t...` |
| 13097 | fn | setLocalFontsStatus | (private) | `function setLocalFontsStatus(key, replacement) {` |
| 13122 | fn | requestLocalFonts | (private) | `async function requestLocalFonts() {` |
| 13223 | fn | applyFontSize | (private) | `function applyFontSize(size) {` |
| 13244 | fn | applyFontFamily | (private) | `function applyFontFamily(family) {` |
| 13274 | fn | revertAccentColor | (private) | `var revertAccentColor = () => {` |
| 13287 | fn | populateFeatureSearch | (private) | `function populateFeatureSearch() {` |
| 13291 | fn | populateFeatureSearchImmediate | (private) | `function populateFeatureSearchImmediate() {` |
| 13306 | fn | registerOption | (private) | - |
| 13314 | fn | registerDeviceMapEntry | (private) | `const registerDeviceMapEntry = (key, entry, opt...` |
| 13332 | fn | registerDeviceLibraryEntriesForSearch | (private) | `const registerDeviceLibraryEntriesForSearch = (...` |
| 13620 | fn | setProjectRequirementButtonsText | (private) | `function setProjectRequirementButtonsText() {` |
| 13643 | fn | ensureProjectRequirementButtons | (private) | `function ensureProjectRequirementButtons() {` |
| 13726 | fn | updateGearListButtonVisibility | (private) | `function updateGearListButtonVisibility() {` |
| 13749 | fn | normalizeGearTableCategoryLabel | (private) | `function normalizeGearTableCategoryLabel(rawLab...` |
| 13758 | fn | resolveGearTableCategoryLabel | (private) | `function resolveGearTableCategoryLabel(group) {` |
| 13784 | fn | syncGearTableGroupCustomMeta | (private) | `function syncGearTableGroupCustomMeta(group, la...` |
| 13810 | fn | syncGearTableCategoryLabel | (private) | `function syncGearTableCategoryLabel(group, labe...` |
| 13831 | fn | mergeDuplicateGearTableCategories | (private) | `function mergeDuplicateGearTableCategories(tabl...` |
| 13833 | fn | mergeCellNodes | (private) | `const mergeCellNodes = (targetCell, sourceCell)...` |
| 13836 | fn | appendWithSeparator | (private) | - |
| 13901 | fn | normalizeCategoryGroupRows | (private) | - |
| 13959 | fn | annotateGearTableCategoryGroups | (private) | `function annotateGearTableCategoryGroups(table) {` |
| 13971 | fn | ensureGearTableCategoryGrouping | (private) | `function ensureGearTableCategoryGrouping(table) {` |
| 14023 | fn | getOverviewTitleCandidates | (private) | `function getOverviewTitleCandidates() {` |
| 14044 | fn | extractProjectNameFromHeading | (private) | `function extractProjectNameFromHeading(titleEle...` |
| 14097 | fn | splitGearListHtml | (private) | `function splitGearListHtml(html) {` |
| 14117 | fn | isHeadingTag | (private) | - |
| 14118 | fn | headingIsProjectTitle | (private) | - |
| 14119 | fn | headingBeforeGrid | (private) | - |
| 14219 | fn | registerGearListSplitImplementation | (private) | `function registerGearListSplitImplementation(fn) {` |
| 14265 | fn | describeRequirement | (private) | `function describeRequirement(field, value) {` |
| 14318 | fn | handleRequirementBoxKeydown | (private) | `function handleRequirementBoxKeydown(event) {` |
| 14431 | fn | getGearTableCategoryMeta | (private) | - |
| 14436 | fn | buildGearTableCategoryHelp | (private) | - |
| 14445 | fn | formatDeviceCategoryLabel | (private) | - |
| 14456 | fn | formatDeviceCategoryPath | (private) | - |
| 14482 | fn | isSafeSharedUrl | (private) | `function isSafeSharedUrl(value) {` |
| 14522 | fn | sanitizeSharedHtml | (private) | `function sanitizeSharedHtml(html) {` |
| 14583 | fn | displayGearAndRequirements | (private) | `function displayGearAndRequirements(html) {` |
| 14641 | fn | findDevice | (private) | - |
| 14646 | fn | search | (private) | `const search = (node, path) => {` |
| 14673 | fn | buildGearItemHelp | (private) | `const buildGearItemHelp = ({` |
| 14803 | fn | getSliderBowlSelect | (private) | `function getSliderBowlSelect() {` |
| 14806 | fn | getSliderBowlValue | (private) | `function getSliderBowlValue() {` |
| 14811 | fn | setSliderBowlValue | (private) | `function setSliderBowlValue(val) {` |
| 14818 | fn | getEasyrigSelect | (private) | `function getEasyrigSelect() {` |
| 14821 | fn | getEasyrigValue | (private) | `function getEasyrigValue() {` |
| 14826 | fn | setEasyrigValue | (private) | `function setEasyrigValue(val) {` |
| 14834 | fn | sanitizeProjectInfoValue | (private) | `function sanitizeProjectInfoValue(value) {` |
| 14859 | fn | sanitizeProjectInfo | (private) | `function sanitizeProjectInfo(info) {` |
| 14871 | fn | hasProjectInfoData | (private) | `function hasProjectInfoData(value) {` |
| 14891 | fn | projectInfoEquals | (private) | `function projectInfoEquals(a, b) {` |
| 14910 | fn | ensureDefaultProjectInfoSnapshot | (private) | `function ensureDefaultProjectInfoSnapshot() {` |
| 14918 | fn | deriveProjectInfo | (private) | `function deriveProjectInfo(info) {` |
| 14936 | fn | setCurrentProjectInfo | (private) | `function setCurrentProjectInfo(info) {` |
| 14940 | fn | getCurrentProjectInfo | (private) | `function getCurrentProjectInfo() {` |
| 14944 | fn | computeSetupSignature | (private) | `function computeSetupSignature(state) {` |
| 14965 | fn | storeLoadedSetupState | (private) | `function storeLoadedSetupState(state) {` |
| 14970 | fn | getCurrentSetupState | (private) | `function getCurrentSetupState() {` |
| 14979 | fn | addIfChanged | (private) | `const addIfChanged = (key, value) => {` |
| 15022 | fn | hasAnyDeviceSelection | (private) | `function hasAnyDeviceSelection(state) {` |
| 15024 | fn | isMeaningfulSelection | (private) | `const isMeaningfulSelection = (value) => {` |
| 15062 | fn | checkSetupChanged | (private) | `function checkSetupChanged() {` |
| 15136 | fn | getCurrentGridSnap | (private) | `const getCurrentGridSnap = () => {` |
| 15162 | fn | getDiagramManualPositions | (private) | `let getDiagramManualPositions = () => ({` |
| 15164 | fn | setManualDiagramPositions | (private) | `let setManualDiagramPositions = () => { };` |
| 15165 | fn | renderSetupDiagram | (private) | `let renderSetupDiagram = () => { };` |
| 15166 | fn | enableDiagramInteractions | (private) | `let enableDiagramInteractions = () => { };` |
| 15167 | fn | updateDiagramLegend | (private) | `let updateDiagramLegend = () => { };` |
| 15168 | fn | getDiagramCss | (private) | `let getDiagramCss = () => '';` |
| 15181 | fn | powerInputTypes | (private) | `function powerInputTypes(dev) {` |
| 15184 | fn | add | (private) | - |
| 15207 | fn | firstPowerInputType | (private) | `function firstPowerInputType(dev) {` |
| 15212 | fn | getAllPowerPortTypes | (private) | `function getAllPowerPortTypes() {` |
| 15368 | fn | getAllFizConnectorTypes | (private) | `function getAllFizConnectorTypes() {` |
| 15382 | fn | updateFizConnectorOptions | (private) | `function updateFizConnectorOptions() {` |
| 15400 | fn | getAllMotorConnectorTypes | (private) | `function getAllMotorConnectorTypes() {` |
| 15410 | fn | updateMotorConnectorOptions | (private) | `function updateMotorConnectorOptions() {` |
| 15426 | fn | getAllControllerConnectors | (private) | `function getAllControllerConnectors() {` |
| 15436 | fn | getAllControllerPowerSources | (private) | `function getAllControllerPowerSources() {` |
| 15444 | fn | getAllControllerBatteryTypes | (private) | `function getAllControllerBatteryTypes() {` |
| 15452 | fn | getAllControllerConnectivity | (private) | `function getAllControllerConnectivity() {` |
| 15465 | fn | updateControllerConnectorOptions | (private) | `function updateControllerConnectorOptions() {` |
| 15481 | fn | updateControllerPowerOptions | (private) | `function updateControllerPowerOptions() {` |
| 15497 | fn | updateControllerBatteryOptions | (private) | `function updateControllerBatteryOptions() {` |
| 15513 | fn | updateControllerConnectivityOptions | (private) | `function updateControllerConnectivityOptions() {` |
| 15529 | fn | getAllDistanceConnections | (private) | `function getAllDistanceConnections() {` |
| 15537 | fn | getAllDistanceMethods | (private) | `function getAllDistanceMethods() {` |
| 15545 | fn | getAllDistanceDisplays | (private) | `function getAllDistanceDisplays() {` |
| 15557 | fn | updateDistanceConnectionOptions | (private) | `function updateDistanceConnectionOptions() {` |
| 15573 | fn | updateDistanceMethodOptions | (private) | `function updateDistanceMethodOptions() {` |
| 15589 | fn | updateDistanceDisplayOptions | (private) | `function updateDistanceDisplayOptions() {` |
| 15608 | fn | fallbackEnsureElementId | (private) | `function fallbackEnsureElementId(element, baseT...` |
| 15632 | fn | getEnsureElementId | (private) | `function getEnsureElementId() {` |
| 15662 | fn | getHiddenLabelFactory | (private) | `function getHiddenLabelFactory() {` |
| 15681 | fn | createFieldWithLabel | (private) | `function createFieldWithLabel(el, label) {` |
| 15698 | fn | addEmptyOption | (private) | `function addEmptyOption(/* select */) {` |
| 15703 | fn | filterNoneEntries | (private) | `function filterNoneEntries(list, prop = 'type') {` |
| 15720 | fn | createVideoOutputRow | (private) | `function createVideoOutputRow(value = '') {` |
| 15760 | fn | setVideoOutputs | (private) | `function setVideoOutputs(list) {` |
| 15774 | fn | getVideoOutputs | (private) | `function getVideoOutputs() {` |
| 15780 | fn | clearVideoOutputs | (private) | `function clearVideoOutputs() {` |
| 15784 | fn | createMonitorVideoInputRow | (private) | `function createMonitorVideoInputRow(value = '') {` |
| 15824 | fn | setMonitorVideoInputs | (private) | `function setMonitorVideoInputs(list) {` |
| 15838 | fn | getMonitorVideoInputs | (private) | `function getMonitorVideoInputs() {` |
| 15844 | fn | clearMonitorVideoInputs | (private) | `function clearMonitorVideoInputs() {` |
| 15848 | fn | createMonitorVideoOutputRow | (private) | `function createMonitorVideoOutputRow(value = '') {` |
| 15888 | fn | setMonitorVideoOutputs | (private) | `function setMonitorVideoOutputs(list) {` |
| 15902 | fn | getMonitorVideoOutputs | (private) | `function getMonitorVideoOutputs() {` |
| 15908 | fn | clearMonitorVideoOutputs | (private) | `function clearMonitorVideoOutputs() {` |
| 15912 | fn | createViewfinderVideoInputRow | (private) | `function createViewfinderVideoInputRow(value = ...` |
| 15952 | fn | setViewfinderVideoInputs | (private) | `function setViewfinderVideoInputs(list) {` |
| 15966 | fn | getViewfinderVideoInputs | (private) | `function getViewfinderVideoInputs() {` |
| 15973 | fn | clearViewfinderVideoInputs | (private) | `function clearViewfinderVideoInputs() {` |
| 15977 | fn | createViewfinderVideoOutputRow | (private) | `function createViewfinderVideoOutputRow(value =...` |
| 16017 | fn | setViewfinderVideoOutputs | (private) | `function setViewfinderVideoOutputs(list) {` |
| 16031 | fn | getViewfinderVideoOutputs | (private) | `function getViewfinderVideoOutputs() {` |
| 16038 | fn | clearViewfinderVideoOutputs | (private) | `function clearViewfinderVideoOutputs() {` |
| 16061 | fn | resolveVideoPowerInputsContainer | (private) | `function resolveVideoPowerInputsContainer() {` |
| 16093 | fn | ensurePowerPortOptionsInitialized | (private) | `function ensurePowerPortOptionsInitialized() {` |
| 16105 | fn | resolveVideoPowerText | (private) | `function resolveVideoPowerText(key, fallback) {` |
| 16117 | fn | fallbackNormalizePowerInputList | (private) | `function fallbackNormalizePowerInputList(raw) {` |
| 16122 | fn | appendEntry | (private) | - |
| 16159 | fn | createVideoPowerInputRow | (private) | `function createVideoPowerInputRow(initialEntry ...` |
| 16254 | fn | setVideoPowerInputs | (private) | `function setVideoPowerInputs(raw) {` |
| 16270 | fn | getVideoPowerInputs | (private) | `function getVideoPowerInputs() {` |
| 16331 | fn | clearVideoPowerInputs | (private) | `function clearVideoPowerInputs() {` |
| 16335 | fn | createVideoInputRow | (private) | `function createVideoInputRow(value = '') {` |
| 16375 | fn | setVideoInputs | (private) | `function setVideoInputs(list) {` |
| 16388 | fn | getVideoInputs | (private) | `function getVideoInputs() {` |
| 16394 | fn | clearVideoInputs | (private) | `function clearVideoInputs() { setVideoInputs([]...` |
| 16396 | fn | createVideoIOOutputRow | (private) | `function createVideoIOOutputRow(value = '') {` |
| 16436 | fn | setVideoOutputsIO | (private) | `function setVideoOutputsIO(list) {` |
| 16449 | fn | getVideoOutputsIO | (private) | `function getVideoOutputsIO() {` |
| 16455 | fn | clearVideoOutputsIO | (private) | `function clearVideoOutputsIO() { setVideoOutput...` |
| 16458 | fn | createFizConnectorRow | (private) | `function createFizConnectorRow(value = '') {` |
| 16498 | fn | setFizConnectors | (private) | `function setFizConnectors(list) {` |
| 16512 | fn | getFizConnectors | (private) | `function getFizConnectors() {` |
| 16518 | fn | clearFizConnectors | (private) | `function clearFizConnectors() {` |
| 16522 | fn | getAllRecordingMedia | (private) | `function getAllRecordingMedia() {` |
| 16561 | fn | resolveRecordingMediaPlaceholder | (private) | `function resolveRecordingMediaPlaceholder() {` |
| 16571 | fn | appendRecordingMediaPlaceholder | (private) | `function appendRecordingMediaPlaceholder(select) {` |
| 16580 | fn | updateRecordingMediaOptions | (private) | `function updateRecordingMediaOptions() {` |
| 16608 | fn | createRecordingMediaRow | (private) | `function createRecordingMediaRow(type = '', not...` |
| 16720 | fn | setRecordingMediaLocal | (private) | - |
| 16736 | fn | getRecordingMedia | (private) | `function getRecordingMedia() {` |
| 16765 | fn | clearRecordingMedia | (private) | `function clearRecordingMedia() {` |
| 16773 | fn | updatePowerPortOptions | (private) | `function updatePowerPortOptions() {` |
| 16822 | fn | getAllPlateTypes | (private) | `function getAllPlateTypes() {` |
| 16837 | fn | updatePlateTypeOptions | (private) | `function updatePlateTypeOptions() {` |
| 16854 | fn | createBatteryPlateRow | (private) | `function createBatteryPlateRow(type = '', mount...` |
| 16923 | fn | setBatteryPlatesLocal | (private) | - |
| 16940 | fn | getBatteryPlates | (private) | `function getBatteryPlates() {` |
| 16952 | fn | clearBatteryPlates | (private) | `function clearBatteryPlates() {` |
| 16960 | fn | updateBatteryPlateVisibility | (private) | `function updateBatteryPlateVisibility() {` |
| 16976 | fn | updateBatteryOptions | (private) | `function updateBatteryOptions() {` |
| 16984 | fn | getAllViewfinderTypes | (private) | `function getAllViewfinderTypes() {` |
| 16996 | fn | getAllViewfinderConnectors | (private) | `function getAllViewfinderConnectors() {` |
| 17012 | fn | createViewfinderRow | (private) | `function createViewfinderRow(type = '', resolut...` |
| 17095 | fn | setViewfinders | (private) | `function setViewfinders(list) {` |
| 17109 | fn | getViewfinders | (private) | `function getViewfinders() {` |
| 17123 | fn | clearViewfinders | (private) | `function clearViewfinders() {` |
| 17127 | fn | getAllMountTypes | (private) | `function getAllMountTypes() {` |
| 17151 | fn | updateMountTypeOptions | (private) | `function updateMountTypeOptions() {` |
| 17168 | fn | createLensMountRow | (private) | `function createLensMountRow(type = '', mount = ...` |
| 17249 | fn | setLensMounts | (private) | `function setLensMounts(list) {` |
| 17265 | fn | getLensMounts | (private) | `function getLensMounts() {` |
| 17276 | fn | clearLensMounts | (private) | `function clearLensMounts() {` |
| 17280 | fn | getLensDeviceMountContext | (private) | `function getLensDeviceMountContext() {` |
| 17290 | fn | setLensDeviceMountOptions | (private) | `function setLensDeviceMountOptions(list, fallba...` |
| 17311 | fn | getLensDeviceMountOptions | (private) | `function getLensDeviceMountOptions() {` |
| 17325 | fn | clearLensDeviceMountOptions | (private) | `function clearLensDeviceMountOptions() {` |
| 17329 | fn | getAllPowerDistTypes | (private) | `function getAllPowerDistTypes() {` |
| 17341 | fn | getAllPowerDistVoltages | (private) | `function getAllPowerDistVoltages() {` |
| 17352 | fn | getAllPowerDistCurrents | (private) | `function getAllPowerDistCurrents() {` |
| 17366 | fn | updatePowerDistVoltageOptions | (private) | `function updatePowerDistVoltageOptions() {` |
| 17382 | fn | updatePowerDistCurrentOptions | (private) | `function updatePowerDistCurrentOptions() {` |
| 17398 | fn | updatePowerDistTypeOptions | (private) | `function updatePowerDistTypeOptions() {` |
| 17415 | fn | createPowerDistRow | (private) | `function createPowerDistRow(type = '', voltage ...` |
| 17518 | fn | setPowerDistribution | (private) | `function setPowerDistribution(list) {` |
| 17533 | fn | getPowerDistribution | (private) | `function getPowerDistribution() {` |
| 17548 | fn | clearPowerDistribution | (private) | `function clearPowerDistribution() {` |
| 17552 | fn | getAllTimecodeTypes | (private) | `function getAllTimecodeTypes() {` |
| 17565 | fn | updateTimecodeTypeOptions | (private) | `function updateTimecodeTypeOptions() {` |
| 17582 | fn | createTimecodeRow | (private) | `function createTimecodeRow(type = '', notes = '...` |
| 17639 | fn | setTimecodes | (private) | `function setTimecodes(list) {` |
| 17653 | fn | getTimecodes | (private) | `function getTimecodes() {` |
| 17662 | fn | clearTimecodes | (private) | `function clearTimecodes() {` |
| 17666 | fn | getFavoriteValues | (private) | `function getFavoriteValues(id) {` |
| 17675 | fn | applyFavoritesToSelect | (private) | `function applyFavoritesToSelect(selectElem) {` |
| 17693 | fn | getFavoriteButton | (private) | `function getFavoriteButton(selectElem) {` |
| 17701 | fn | updateFavoriteButton | (private) | `function updateFavoriteButton(selectElem) {` |
| 17714 | fn | toggleFavorite | (private) | `function toggleFavorite(selectElem) {` |
| 17731 | fn | getSelectWidthMeasureElement | (private) | `function getSelectWidthMeasureElement() {` |
| 17754 | fn | measureSelectTextWidth | (private) | `function measureSelectTextWidth(selectElem, tex...` |
| 17781 | fn | adjustGearListSelectWidth | (private) | `function adjustGearListSelectWidth(selectElem) {` |
| 17810 | fn | adjustGearListSelectWidths | (private) | `function adjustGearListSelectWidths(container) {` |
| 17817 | fn | ensureSelectWrapper | (private) | `function ensureSelectWrapper(selectElem) {` |
| 17837 | fn | initFavoritableSelect | (private) | `function initFavoritableSelect(selectElem) {` |
| 17842 | fn | cleanupFavoriteButton | (private) | `function cleanupFavoriteButton(btn, ownerSelect...` |
| 17899 | fn | clickHandler | (private) | `const clickHandler = () => toggleFavorite(selec...` |
| 17904 | fn | changeListener | (private) | `const changeListener = () => updateFavoriteButt...` |
| 17912 | fn | translations | (private) | `const translations = (() => {` |
| 17951 | fn | applySelectValueAfterPopulate | (private) | `function applySelectValueAfterPopulate(selectEl...` |
| 17974 | fn | restoreSelectSelection | (private) | `function restoreSelectSelection(selectElem, pre...` |
| 17999 | fn | populateSelect | (private) | `function populateSelect(selectElem, optionsObj ...` |
| 18033 | fn | populateMonitorSelect | (private) | `function populateMonitorSelect() {` |
| 18055 | fn | getCompatibleCagesForCamera | (private) | `function getCompatibleCagesForCamera(cameraName) {` |
| 18077 | fn | applyCageSelectValue | (private) | `function applyCageSelectValue(value) {` |
| 18097 | fn | updateCageSelectOptions | (private) | `function updateCageSelectOptions(preferredValue) {` |
| 18142 | fn | filterSelect | (private) | `function filterSelect(selectElem, filterValue) {` |
| 18155 | fn | filterDeviceList | (private) | `function filterDeviceList(listElem, filterValue) {` |
| 18169 | fn | attachSelectSearch | (private) | `function attachSelectSearch(selectElem) {` |
| 18207 | fn | bindFilterInput | (private) | `function bindFilterInput(inputElem, callback) {` |
| 18221 | fn | addInputClearButton | (private) | `function addInputClearButton(inputElem, callbac...` |
| 18236 | fn | toggle | (private) | `const toggle = () => {` |
| 18249 | fn | ensureDeviceLibraryEntryContext | (private) | `function ensureDeviceLibraryEntryContext(entry) {` |
| 18263 | fn | highlightDeviceLibraryElement | (private) | `function highlightDeviceLibraryElement(element) {` |
| 18280 | fn | rebuildDeviceLibrarySearchIndex | (private) | `function rebuildDeviceLibrarySearchIndex() {` |
| 18324 | fn | applyDeviceLibrarySearchStatus | (private) | `function applyDeviceLibrarySearchStatus(queryTe...` |
| 18352 | fn | focusDeviceLibraryEntry | (private) | `function focusDeviceLibraryEntry(entry, options...` |
| 18371 | fn | focusDeviceLibraryMatch | (private) | `function focusDeviceLibraryMatch(query) {` |
| 18385 | fn | applyDeviceLibrarySearchFilter | (private) | `function applyDeviceLibrarySearchFilter(options...` |
| 18421 | fn | updateDeviceLibrarySearchLocalization | (private) | `function updateDeviceLibrarySearchLocalization() {` |
| 18478 | fn | applyFilters | (private) | `function applyFilters() {` |
| 18664 | fn | updateCalculations | (private) | `function updateCalculations() {` |
| 18765 | fn | getCurrentSetupKey | (private) | `function getCurrentSetupKey() {` |
| 18766 | fn | safeSelectValue | (private) | `const safeSelectValue = (select) => (` |
| 18772 | fn | safeListValues | (private) | `const safeListValues = (list) => (` |
| 18796 | fn | deleteFeedbackEntry | (private) | `function deleteFeedbackEntry(key, index) {` |
| 18808 | fn | renderFeedbackTable | (private) | `function renderFeedbackTable(currentKey) {` |
| 18847 | fn | parseResolution | (private) | - |
| 18859 | fn | parseFramerate | (private) | - |
| 18864 | fn | tempFactor | (private) | - |
| 18873 | fn | resolutionWeight | (private) | - |
| 18881 | fn | codecWeight | (private) | - |
| 19029 | fn | normalizeDeviceValueForComparison | (private) | `function normalizeDeviceValueForComparison(valu...` |
| 19049 | fn | deviceEntriesEqual | (private) | `function deviceEntriesEqual(a, b) {` |
| 19065 | fn | getDeviceChanges | (private) | `function getDeviceChanges() {` |
| 19068 | fn | record | (private) | `const record = (cat, name, val, sub) => {` |
| 19078 | fn | compare | (private) | `const compare = (cat, defCat, curCat, sub) => {` |
| 19114 | fn | applyDeviceChanges | (private) | `function applyDeviceChanges(changes) {` |
| 19117 | fn | applyToCategory | (private) | `const applyToCategory = (target, delta) => {` |
| 19170 | fn | formatValue | (private) | `function formatValue(value) {` |
| 19186 | fn | createDeviceDetailsList | (private) | `function createDeviceDetailsList(deviceData) {` |
| 19190 | fn | appendItem | (private) | `const appendItem = (key, value, parent) => {` |
| 19227 | fn | formatDateString | (private) | `function formatDateString(val) {` |
| 19235 | fn | renderDeviceList | (private) | `function renderDeviceList(categoryKey, ulElemen...` |
| 19248 | fn | resolveText | (private) | `const resolveText = (key, fallback) => {` |
| 19266 | fn | buildItem | (private) | `const buildItem = (name, deviceData, subcategor...` |
| 19362 | fn | refreshDeviceLists | (private) | `function refreshDeviceLists() {` |
| 19475 | fn | getGearListSelectors | (private) | `function getGearListSelectors() {` |
| 19489 | fn | applyGearListSelectors | (private) | `function applyGearListSelectors(selectors) {` |

## Memory Markers

### 🟢 `NOTE` (line 1784)

> autoGearAutoPresetIdState is already declared at line 720 with var.

### 🟢 `NOTE` (line 1787)

> autoGearAutoPresetIdState is declared at line ~720 with declareCoreFallbackBinding

### 🟢 `NOTE` (line 2145)

> autoGearPresetNameDialog, autoGearPresetNameForm, autoGearPresetNameLabel,

### 🟢 `NOTE` (line 5558)

> dialog might not render newlines well unless it uses white-space: pre-wrap

