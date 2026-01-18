# src/scripts/core/app-setups.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 16256
- **Language:** JavaScript
- **Symbols:** 492
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 24 | fn | escapeHtmlFallback | (private) | `function escapeHtmlFallback(str) {` |
| 153 | fn | resolveSetupRuntimeFunction | (private) | `function resolveSetupRuntimeFunction(name) {` |
| 159 | fn | registerCandidate | (private) | `const registerCandidate = (scope) => {` |
| 191 | fn | safeGetCurrentProjectName | (private) | `function safeGetCurrentProjectName(defaultValue...` |
| 224 | fn | getCameraLinkedSupportItemKeys | (private) | `function getCameraLinkedSupportItemKeys() {` |
| 237 | fn | resolveCameraLinkedSupportName | (private) | `function resolveCameraLinkedSupportName(name) {` |
| 315 | fn | normalizeProjectFieldLabel | (private) | `function normalizeProjectFieldLabel(label) {` |
| 322 | fn | getProductionCompanyLabelSets | (private) | `function getProductionCompanyLabelSets(projectL...` |
| 329 | fn | addLabel | (private) | `const addLabel = (value) => {` |
| 351 | fn | getProjectInfoFieldLines | (private) | `function getProjectInfoFieldLines(source, field...` |
| 382 | fn | buildCombinedProductionCompanyDisplay | (private) | `function buildCombinedProductionCompanyDisplay(...` |
| 395 | fn | isLabelLine | (private) | `const isLabelLine = (value) => {` |
| 401 | fn | addLine | (private) | `const addLine = (value, className, associatedFi...` |
| 420 | fn | appendAddressEntry | (private) | `const appendAddressEntry = (line, fieldKey) => {` |
| 484 | fn | pickFirstValue | (private) | `const pickFirstValue = (arr) => {` |
| 548 | fn | applyCombinedProductionCompanyDisplay | (private) | `function applyCombinedProductionCompanyDisplay(...` |
| 566 | fn | expandCombinedProductionCompanyInfo | (private) | `function expandCombinedProductionCompanyInfo(ra...` |
| 628 | fn | joinCollected | (private) | `const joinCollected = (field) => {` |
| 710 | fn | lensEscapeRegExp | (private) | `function lensEscapeRegExp(value) {` |
| 714 | fn | lensStripPrefix | (private) | `function lensStripPrefix(text, prefix) {` |
| 720 | fn | lensIsSpecToken | (private) | `function lensIsSpecToken(token) {` |
| 734 | fn | resolveLensManufacturer | (private) | `function resolveLensManufacturer(lensData, lens...` |
| 744 | fn | resolveLensSeries | (private) | `function resolveLensSeries(lensName, manufactur...` |
| 766 | fn | resolveLensFocalLabel | (private) | `function resolveLensFocalLabel(lensName, manufa...` |
| 772 | fn | computeLensFocalSortKeyFromTexts | (private) | `function computeLensFocalSortKeyFromTexts(...so...` |
| 792 | fn | buildLensSortMeta | (private) | `function buildLensSortMeta(lensName, lensData) {` |
| 805 | fn | compareStringsCaseInsensitive | (private) | `function compareStringsCaseInsensitive(a, b) {` |
| 814 | fn | lensSelectionManager | (private) | `const lensSelectionManager = (() => {` |
| 908 | fn | getLensMountEntries | (private) | `const getLensMountEntries = (lensName) => {` |
| 917 | fn | pushEntry | (private) | `const pushEntry = (type, status = 'native') => {` |
| 937 | fn | addFromRawValue | (private) | `const addFromRawValue = (rawValue, status = 'na...` |
| 975 | fn | getLensMountLabels | (private) | `const getLensMountLabels = (lensName) => getLen...` |
| 977 | fn | placeholderToggle | (private) | `const placeholderToggle = (select, isEmpty) => {` |
| 986 | fn | extractMountLabels | (private) | `const extractMountLabels = (rawValue) => {` |
| 989 | fn | addLabel | (private) | `const addLabel = (label) => {` |
| 994 | fn | processString | (private) | `const processString = (value) => {` |
| 1021 | fn | resolveLensDataset | (private) | `const resolveLensDataset = () => {` |
| 1036 | fn | buildCatalog | (private) | `const buildCatalog = () => {` |
| 1104 | fn | getMountLabelFromCameraEntry | (private) | `const getMountLabelFromCameraEntry = (entry) => {` |
| 1110 | fn | getCameraLensMountEntries | (private) | `const getCameraLensMountEntries = () => {` |
| 1151 | fn | getCameraNativeMount | (private) | `const getCameraNativeMount = () => {` |
| 1163 | fn | buildMountOptionsForSelection | (private) | `const buildMountOptionsForSelection = (currentM...` |
| 1166 | fn | addOption | (private) | `const addOption = (label) => {` |
| 1183 | fn | determineLensMountSelection | (private) | `const determineLensMountSelection = (lensName, ...` |
| 1188 | fn | resolveStatusForType | (private) | `const resolveStatusForType = (type) => {` |
| 1233 | fn | normalizeSelectionName | (private) | `const normalizeSelectionName = (value) => {` |
| 1238 | fn | updateStepState | (private) | `const updateStepState = () => {` |
| 1258 | fn | syncLegacySelect | (private) | `const syncLegacySelect = () => {` |
| 1266 | fn | updateHiddenInputs | (private) | `const updateHiddenInputs = ({ skipEvent = false...` |
| 1301 | fn | renderSelectionChips | (private) | `const renderSelectionChips = ({ skipEvent = fal...` |
| 1446 | fn | renderLensOptions | (private) | `const renderLensOptions = () => {` |
| 1530 | fn | toggleLensSet | (private) | `const toggleLensSet = (lensList, shouldSelect) ...` |
| 1567 | fn | renderSeries | (private) | `const renderSeries = () => {` |
| 1612 | fn | renderManufacturers | (private) | `const renderManufacturers = () => {` |
| 1641 | fn | handleLensToggle | (private) | `const handleLensToggle = (lensName, checked) => {` |
| 1661 | fn | removeSelection | (private) | `const removeSelection = (lensName, { focus = fa...` |
| 1675 | fn | handleManufacturerChange | (private) | `const handleManufacturerChange = () => {` |
| 1687 | fn | handleSeriesChange | (private) | `const handleSeriesChange = () => {` |
| 1697 | fn | applyInfo | (private) | `const applyInfo = (info = {}) => {` |
| 1748 | fn | snapshot | (private) | `const snapshot = () => ({` |
| 1758 | fn | refreshCatalog | (private) | `const refreshCatalog = ({ preserveSelections = ...` |
| 1821 | fn | normalizeLensSelectionNames | (private) | `function normalizeLensSelectionNames(value) {` |
| 1837 | fn | markProjectFormDataDirty | (private) | `function markProjectFormDataDirty() {` |
| 1844 | fn | suspendProjectPersistence | (private) | `function suspendProjectPersistence() {` |
| 1848 | fn | resumeProjectPersistence | (private) | `function resumeProjectPersistence() {` |
| 1855 | fn | isProjectPersistenceSuspended | (private) | `function isProjectPersistenceSuspended() {` |
| 1859 | fn | localGetLocalizedText | (private) | `const localGetLocalizedText = (() => {` |
| 1860 | fn | fallbackGetLocalizedText | (private) | `function fallbackGetLocalizedText(key) {` |
| 1941 | fn | resolveRentalHouseCatalog | (private) | `function resolveRentalHouseCatalog() {` |
| 2001 | fn | isValidRentalHouseRuntime | (private) | `function isValidRentalHouseRuntime(runtime) {` |
| 2012 | fn | publishRentalHouseRuntime | (private) | `function publishRentalHouseRuntime(runtime) {` |
| 2055 | fn | buildRentalHouseRuntime | (private) | `function buildRentalHouseRuntime() {` |
| 2133 | fn | getRentalHouseRuntime | (private) | `function getRentalHouseRuntime() {` |
| 2142 | fn | normalizeRentalHouseSearchValue | (private) | `function normalizeRentalHouseSearchValue(value) {` |
| 2161 | fn | normalizeRentalHouseKey | (private) | `function normalizeRentalHouseKey(value) {` |
| 2189 | fn | formatRentalHouseShortName | (private) | `function formatRentalHouseShortName(entryOrName) {` |
| 2234 | fn | resolveCurrentRentalHouseValue | (private) | `function resolveCurrentRentalHouseValue(options...` |
| 2266 | fn | resolveRentalProviderNoteLabel | (private) | `function resolveRentalProviderNoteLabel(options...` |
| 2289 | fn | refreshRentalProviderNoteDisplays | (private) | `function refreshRentalProviderNoteDisplays(opti...` |
| 2353 | fn | formatRentalHouseLocation | (private) | `function formatRentalHouseLocation(entry) {` |
| 2362 | fn | formatRentalHouseTooltip | (private) | `function formatRentalHouseTooltip(entry) {` |
| 2376 | fn | resolveRentalHouseEntry | (private) | `function resolveRentalHouseEntry(value) {` |
| 2393 | fn | resolveRentalHouseInput | (private) | `function resolveRentalHouseInput() {` |
| 2398 | fn | ensureRentalHouseDatalist | (private) | `function ensureRentalHouseDatalist(input) {` |
| 2414 | fn | scoreRentalHouseMatch | (private) | `function scoreRentalHouseMatch(info, query) {` |
| 2443 | fn | getRentalHouseMatches | (private) | `function getRentalHouseMatches(query) {` |
| 2474 | fn | renderRentalHouseSuggestions | (private) | `function renderRentalHouseSuggestions(input = r...` |
| 2513 | fn | updateRentalHouseAssistiveDetails | (private) | `function updateRentalHouseAssistiveDetails(inpu...` |
| 2555 | fn | hasMeaningfulPowerSelection | (private) | `function hasMeaningfulPowerSelection(value) {` |
| 2562 | fn | normalizePowerSelectionString | (private) | `function normalizePowerSelectionString(value) {` |
| 2568 | fn | assignSelectValue | (private) | `function assignSelectValue(select, value) {` |
| 2579 | fn | getGlobalScope | (private) | `function getGlobalScope() {` |
| 2589 | fn | resolveSetupsStructuredClone | (private) | `function resolveSetupsStructuredClone(scope) {` |
| 2625 | fn | setupsJsonDeepClone | (private) | `function setupsJsonDeepClone(value) {` |
| 2639 | fn | createSetupsDeepClone | (private) | `function createSetupsDeepClone(scope) {` |
| 2661 | fn | SETUPS_DEEP_CLONE | (private) | `const SETUPS_DEEP_CLONE = (() => {` |
| 2670 | fn | gearListGetSafeHtmlSectionsImpl | (private) | `function gearListGetSafeHtmlSectionsImpl(html) {` |
| 2715 | fn | resolveElementById | (private) | `function resolveElementById(id, globalName) {` |
| 2739 | fn | resolveGearListModule | (private) | `function resolveGearListModule() {` |
| 2775 | fn | registerGearListModuleImplementation | (private) | `function registerGearListModuleImplementation() {` |
| 2806 | fn | buildShareUiContext | (private) | `function buildShareUiContext() {` |
| 2823 | fn | buildSharedImportUiContext | (private) | `function buildSharedImportUiContext() {` |
| 2836 | fn | getShareUiContext | (private) | `function getShareUiContext(scope) {` |
| 2848 | fn | getSharedImportUiContext | (private) | `function getSharedImportUiContext(scope) {` |
| 2860 | fn | cloneProjectDialogState | (private) | `function cloneProjectDialogState(value) {` |
| 2877 | fn | getProjectDialogSeedInfo | (private) | `function getProjectDialogSeedInfo() {` |
| 2893 | fn | captureProjectDialogSnapshot | (private) | `function captureProjectDialogSnapshot() {` |
| 2909 | fn | openProjectDialogWithInfo | (private) | `function openProjectDialogWithInfo(info) {` |
| 2920 | fn | restoreProjectDialogSnapshot | (private) | `function restoreProjectDialogSnapshot() {` |
| 2929 | fn | callSetupsCoreFunction | (private) | `function callSetupsCoreFunction(functionName, a...` |
| 2971 | fn | getSetupsCoreValue | (private) | `function getSetupsCoreValue(functionName, optio...` |
| 2990 | fn | getGlobalCineUi | (private) | `function getGlobalCineUi() {` |
| 3011 | fn | isCineUiEntryRegistered | (private) | `function isCineUiEntryRegistered(registry, name) {` |
| 3036 | fn | registerCineUiEntries | (private) | `function registerCineUiEntries(registry, entrie...` |
| 3061 | fn | areSetupsEntriesRegistered | (private) | `function areSetupsEntriesRegistered(cineUi) {` |
| 3087 | fn | enqueueCineUiRegistration | (private) | `function enqueueCineUiRegistration(callback) {` |
| 3123 | fn | getPowerSelectionSnapshot | (private) | `function getPowerSelectionSnapshot() {` |
| 3142 | fn | applyStoredPowerSelection | (private) | `function applyStoredPowerSelection(selection, {...` |
| 3156 | fn | matchesTarget | (private) | `const matchesTarget = (select, desired) => {` |
| 3232 | fn | parseBatteryCurrentLimit | (private) | `function parseBatteryCurrentLimit(value) {` |
| 3248 | fn | ensureDeferredScriptsReady | (private) | `function ensureDeferredScriptsReady(reason, cal...` |
| 3321 | fn | batteryPinsSufficient | (private) | `function batteryPinsSufficient() {` |
| 3332 | fn | alertPinExceeded | (private) | `function alertPinExceeded() {` |
| 3400 | fn | submitProjectFormViaBackdrop | (private) | `function submitProjectFormViaBackdrop() {` |
| 3501 | fn | resolveLocalAppVersionForShare | (private) | `function resolveLocalAppVersionForShare() {` |
| 3517 | fn | createSharedProjectMetadata | (private) | `function createSharedProjectMetadata({` |
| 3549 | fn | hasOwnedGearItemsForExport | (private) | `function hasOwnedGearItemsForExport(root) {` |
| 3557 | fn | formatOwnedGearExportLabel | (private) | `function formatOwnedGearExportLabel(ownerName) {` |
| 3569 | fn | getGearItemDisplayName | (private) | `function getGearItemDisplayName(element) {` |
| 3591 | fn | collectOwnedGearMarkersForExport | (private) | `function collectOwnedGearMarkersForExport(root) {` |
| 3605 | fn | ownerDisplayName | (private) | `const ownerDisplayName = (() => {` |
| 3633 | fn | applyOwnedGearMarkersToHtml | (private) | `function applyOwnedGearMarkersToHtml(html, mark...` |
| 3691 | fn | downloadSharedProject | (private) | `async function downloadSharedProject(shareFileN...` |
| 3698 | fn | readPowerSelectValue | (private) | `const readPowerSelectValue = (select) => (` |
| 3709 | fn | addIfChanged | (private) | `const addIfChanged = (key, value) => {` |
| 3779 | fn | fetchCandidate | (private) | `const fetchCandidate = async (key) => {` |
| 3877 | fn | sharedContacts | (private) | `const sharedContacts = (() => {` |
| 3886 | fn | sanitizeString | (private) | - |
| 3945 | fn | shareDiagnostics | (private) | `const shareDiagnostics = (() => {` |
| 3975 | fn | notifyShareFailure | (private) | - |
| 4069 | fn | getGearProviderTexts | (private) | `function getGearProviderTexts() {` |
| 4080 | fn | refreshOwnGearNameCache | (private) | `function refreshOwnGearNameCache() {` |
| 4103 | fn | getOwnGearNameSet | (private) | `function getOwnGearNameSet() {` |
| 4120 | fn | resolveOwnGearFeatureModuleForEditor | (private) | `function resolveOwnGearFeatureModuleForEditor() {` |
| 4146 | fn | generateOwnGearIdForEditor | (private) | `function generateOwnGearIdForEditor() {` |
| 4167 | fn | normalizeOwnGearRecordForEditor | (private) | `function normalizeOwnGearRecordForEditor(entry) {` |
| 4208 | fn | cloneOwnGearRecords | (private) | `function cloneOwnGearRecords(records) {` |
| 4217 | fn | loadOwnGearRecordsForEditor | (private) | `function loadOwnGearRecordsForEditor() {` |
| 4242 | fn | persistOwnGearRecordsForEditor | (private) | `function persistOwnGearRecordsForEditor(records) {` |
| 4273 | fn | lookupOwnGearRecord | (private) | `function lookupOwnGearRecord(records, id, name) {` |
| 4294 | fn | deriveOwnGearSourceForElement | (private) | `function deriveOwnGearSourceForElement(element) {` |
| 4303 | fn | syncGearItemOwnedState | (private) | `function syncGearItemOwnedState(element, data, ...` |
| 4381 | fn | findOwnedRecordForGearItem | (private) | `function findOwnedRecordForGearItem(element, op...` |
| 4388 | fn | guessDefaultProvider | (private) | `function guessDefaultProvider(name) {` |
| 4400 | fn | ensureGearItemProviderElement | (private) | `function ensureGearItemProviderElement(element) {` |
| 4436 | fn | formatUserProfileProviderName | (private) | `function formatUserProfileProviderName(rawName) {` |
| 4460 | fn | getProviderInfo | (private) | `function getProviderInfo(value, options = {}) {` |
| 4495 | fn | setGearItemProvider | (private) | `function setGearItemProvider(element, providerV...` |
| 4527 | fn | getProviderOptionLabel | (private) | `function getProviderOptionLabel(option) {` |
| 4532 | fn | updateGearItemEditProviderOptions | (private) | `function updateGearItemEditProviderOptions(cont...` |
| 4586 | fn | updateGearItemEditCameraLinkOptions | (private) | `function updateGearItemEditCameraLinkOptions(co...` |
| 4659 | fn | refreshGearItemProviderDisplays | (private) | `function refreshGearItemProviderDisplays(scope) {` |
| 4670 | fn | handleShareSetupClick | (private) | `async function handleShareSetupClick() {` |
| 4765 | fn | handleShareFormSubmit | (private) | `async function handleShareFormSubmit(event) {` |
| 4798 | fn | handleShareCancelClick | (private) | `function handleShareCancelClick() {` |
| 4808 | fn | handleShareDialogCancel | (private) | `function handleShareDialogCancel(event) {` |
| 4832 | fn | handleSharedLinkInputChange | (private) | `function handleSharedLinkInputChange() {` |
| 4842 | fn | handleApplySharedLinkClick | (private) | `function handleApplySharedLinkClick() {` |
| 4852 | fn | handleSelection | (private) | `const handleSelection = () => {` |
| 4877 | fn | handleSharedImportModeChange | (private) | `function handleSharedImportModeChange() {` |
| 4883 | fn | handleSharedImportSubmit | (private) | `function handleSharedImportSubmit(event) {` |
| 4889 | fn | handleSharedImportCancel | (private) | `function handleSharedImportCancel() {` |
| 4894 | fn | handleSharedImportDialogCancel | (private) | `function handleSharedImportDialogCancel(event) {` |
| 4919 | fn | getSafeLanguageTexts | (private) | `function getSafeLanguageTexts() {` |
| 4949 | fn | registerSetupsCineUiInternal | (private) | `function registerSetupsCineUiInternal(cineUi) {` |
| 5030 | fn | registerSetupsCineUi | (private) | `function registerSetupsCineUi() {` |
| 5077 | fn | summarizeByType | (private) | `function summarizeByType(list) {` |
| 5087 | fn | renderInfoLabel | (private) | `function renderInfoLabel(text) {` |
| 5093 | fn | connectorBlocks | (private) | `function connectorBlocks(items, icon, cls = 'ne...` |
| 5106 | fn | generateConnectorSummary | (private) | `function generateConnectorSummary(device) {` |
| 5109 | fn | normalizeFocusScaleValue | (private) | `const normalizeFocusScaleValue = (value) => {` |
| 5117 | fn | resolveFocusScaleMode | (private) | `const resolveFocusScaleMode = () => {` |
| 5147 | fn | formatNumber | (private) | `const formatNumber = (value, options = {}) => {` |
| 5181 | fn | formatWeight | (private) | `const formatWeight = (grams, mode = focusScaleM...` |
| 5259 | fn | uniqueList | (private) | - |
| 5272 | fn | appendListBox | (private) | `const appendListBox = (html, values, label, cls...` |
| 5334 | fn | section | (private) | `const section = (label, content) => {` |
| 5356 | fn | formatKeyLabel | (private) | `const formatKeyLabel = (key) => {` |
| 5407 | fn | suggestChargerCounts | (private) | `function suggestChargerCounts(total) {` |
| 5422 | fn | addArriKNumber | (private) | `function addArriKNumber(name) {` |
| 5443 | fn | findItem | (private) | - |
| 5467 | fn | sanitizeFizContext | (private) | - |
| 5472 | fn | formatFizCable | (private) | `const formatFizCable = (name, context) => {` |
| 5477 | fn | suggestArriFizCables | (private) | `function suggestArriFizCables() {` |
| 5503 | fn | pushLbus | (private) | `const pushLbus = (len, contextOverride) => {` |
| 5575 | fn | collectAccessories | (private) | `function collectAccessories({ hasMotor = false,...` |
| 5577 | fn | getEl | (private) | `const getEl = (id, ref) => ref || (typeof docum...` |
| 5585 | fn | safeVal | (private) | `const safeVal = (sel) => (sel && typeof sel.val...` |
| 5627 | fn | pushChargersForMount | (private) | `const pushChargersForMount = (targetMount, tota...` |
| 5630 | fn | findName | (private) | - |
| 5636 | fn | pushCharger | (private) | `const pushCharger = (slots, count) => {` |
| 5666 | fn | gatherPower | (private) | `const gatherPower = (data, target = misc, inclu...` |
| 5739 | fn | getFizConnectors | (private) | - |
| 5751 | fn | pushFizCable | (private) | `const pushFizCable = (name, context) => {` |
| 5755 | fn | buildPairContext | (private) | `const buildPairContext = (motorName, controller...` |
| 5764 | fn | matchesCable | (private) | `const matchesCable = (cable, from, to) => {` |
| 5766 | fn | fromToMatch | (private) | `const fromToMatch = (a, b) => (cable.from === a...` |
| 5819 | fn | cloneProjectFormDataSnapshot | (private) | `function cloneProjectFormDataSnapshot(snapshot) {` |
| 5850 | fn | freezeProjectFormDataSnapshot | (private) | `function freezeProjectFormDataSnapshot(info) {` |
| 5882 | fn | sanitizeCrewAvatarValue | (private) | `function sanitizeCrewAvatarValue(value) {` |
| 5904 | fn | collectProjectFormData | (private) | `function collectProjectFormData() {` |
| 5915 | fn | getValue | (private) | `const getValue = (name) => {` |
| 5919 | fn | getMultiValue | (private) | `const getMultiValue = (name) => {` |
| 5955 | fn | collectRanges | (private) | `const collectRanges = (container, startSel, end...` |
| 5992 | fn | getGearValue | (private) | `const getGearValue = (id) => (gearValues && gea...` |
| 6107 | fn | assignGearField | (private) | `const assignGearField = (prop, id) => {` |
| 6114 | fn | assignManualFlag | (private) | `const assignManualFlag = (prop, id) => {` |
| 6208 | fn | populateFilterDropdown | (private) | `function populateFilterDropdown(extraTypes = []) {` |
| 6237 | fn | populateCodecDropdown | (private) | `function populateCodecDropdown(selectedValue) {` |
| 6265 | fn | populateProjectForm | (private) | `function populateProjectForm(info = {}) {` |
| 6273 | fn | setVal | (private) | `const setVal = (name, value) => {` |
| 6303 | fn | setMulti | (private) | `const setMulti = (name, values) => {` |
| 6314 | fn | resolve | (private) | `const resolve = (val, id) => val || (typeof doc...` |
| 6335 | fn | normalizedAddressFields | (private) | `const normalizedAddressFields = (() => {` |
| 6511 | fn | ensureZoomRemoteSetup | (private) | `function ensureZoomRemoteSetup(info) {` |
| 6546 | fn | stripAutoGearContext | (private) | `function stripAutoGearContext(name) {` |
| 6550 | fn | normalizeAutoGearName | (private) | `function normalizeAutoGearName(name) {` |
| 6554 | fn | normalizeAutoGearNotesKey | (private) | `function normalizeAutoGearNotesKey(value) {` |
| 6564 | fn | getAutoGearSpanNotesKey | (private) | `function getAutoGearSpanNotesKey(span) {` |
| 6581 | fn | matchesAutoGearItem | (private) | `function matchesAutoGearItem(target, actual) {` |
| 6589 | fn | isOnboardMonitorRiggingItemName | (private) | `function isOnboardMonitorRiggingItemName(name) {` |
| 6596 | fn | isOnboardMonitorRiggingItemEntry | (private) | `function isOnboardMonitorRiggingItemEntry(entry) {` |
| 6601 | fn | getOnboardMonitorRiggingRuleLabel | (private) | `function getOnboardMonitorRiggingRuleLabel() {` |
| 6615 | fn | ensureOnboardMonitorRiggingAutoGearHighlight | (private) | `function ensureOnboardMonitorRiggingAutoGearHig...` |
| 6656 | fn | getSpanCount | (private) | `function getSpanCount(span) {` |
| 6663 | fn | updateSpanCountInPlace | (private) | `function updateSpanCountInPlace(span, newCount) {` |
| 6687 | fn | cleanupAutoGearCell | (private) | `function cleanupAutoGearCell(cell) {` |
| 6722 | fn | analyzeAutoGearSegment | (private) | `function analyzeAutoGearSegment(nodes) {` |
| 6749 | fn | updateRawSegmentCount | (private) | `function updateRawSegmentCount(nodes, info, new...` |
| 6783 | fn | removeAutoGearItem | (private) | `function removeAutoGearItem(cell, item, remaini...` |
| 6835 | fn | getCrewRoleLabelForDisplay | (private) | `function getCrewRoleLabelForDisplay(value) {` |
| 6844 | fn | getAutoGearRuleDisplayLabel | (private) | `function getAutoGearRuleDisplayLabel(rule) {` |
| 6885 | fn | formatAutoGearRuleTooltip | (private) | `function formatAutoGearRuleTooltip(rule) {` |
| 6901 | fn | extractAutoGearRuleSource | (private) | `function extractAutoGearRuleSource(rule) {` |
| 6909 | fn | normalizeAutoGearRuleSourceEntry | (private) | `function normalizeAutoGearRuleSourceEntry(entry) {` |
| 6923 | fn | dedupeAutoGearRuleSources | (private) | `function dedupeAutoGearRuleSources(entries) {` |
| 6940 | fn | formatAutoGearSelectorDisplayValue | (private) | `function formatAutoGearSelectorDisplayValue(typ...` |
| 6956 | fn | getAutoGearRuleSources | (private) | `function getAutoGearRuleSources(span) {` |
| 6980 | fn | setAutoGearRuleSources | (private) | `function setAutoGearRuleSources(span, entries) {` |
| 7008 | fn | appendAutoGearRuleSource | (private) | `function appendAutoGearRuleSource(span, rule) {` |
| 7018 | fn | buildAutoGearRuleTooltipFromSources | (private) | `function buildAutoGearRuleTooltipFromSources(so...` |
| 7033 | fn | getAutoGearSpanContextMap | (private) | `function getAutoGearSpanContextMap(span) {` |
| 7052 | fn | saveAutoGearSpanContextMap | (private) | `function saveAutoGearSpanContextMap(span, map) {` |
| 7078 | fn | setAutoGearSpanContextNotes | (private) | `function setAutoGearSpanContextNotes(span, cont...` |
| 7093 | fn | mergeAutoGearSpanContextNotes | (private) | `function mergeAutoGearSpanContextNotes(span, co...` |
| 7117 | fn | renderAutoGearSpanContextNotes | (private) | `function renderAutoGearSpanContextNotes(span) {` |
| 7154 | fn | adjustSelectWidth | (private) | `function adjustSelectWidth(selectElement) {` |
| 7184 | fn | configureAutoGearSpan | (private) | `function configureAutoGearSpan(span, normalized...` |
| 7339 | fn | addAutoGearItem | (private) | `function addAutoGearItem(cell, item, rule) {` |
| 7408 | fn | ensureAutoGearCategory | (private) | `function ensureAutoGearCategory(table, category) {` |
| 7473 | fn | findAutoGearCategoryCell | (private) | `function findAutoGearCategoryCell(table, catego...` |
| 7536 | fn | normalizeAutoGearScenarioLogicValue | (private) | `function normalizeAutoGearScenarioLogicValue(va...` |
| 7549 | fn | normalizeAutoGearScenarioMultiplierValue | (private) | `function normalizeAutoGearScenarioMultiplierVal...` |
| 7554 | fn | computeAutoGearScenarioOutcome | (private) | `function computeAutoGearScenarioOutcome(rule, s...` |
| 7597 | fn | normalizeClampOnDiameterKey | (private) | `function normalizeClampOnDiameterKey(value) {` |
| 7602 | fn | formatClampOnDiameterLabel | (private) | `function formatClampOnDiameterLabel(value) {` |
| 7609 | fn | shouldAugmentClampOnRule | (private) | `function shouldAugmentClampOnRule(rule) {` |
| 7620 | fn | buildClampOnBackingAdditionsFromInfo | (private) | `function buildClampOnBackingAdditionsFromInfo(i...` |
| 7675 | fn | mergeAutoGearAdditions | (private) | `function mergeAutoGearAdditions(baseAdditions, ...` |
| 7678 | fn | pushUnique | (private) | `const pushUnique = (item) => {` |
| 7693 | fn | applyAutoGearRulesToTableHtml | (private) | `function applyAutoGearRulesToTableHtml(tableHtm...` |
| 7747 | fn | normalizedCameraWeights | (private) | `const normalizedCameraWeights = (() => {` |
| 7760 | fn | selectedCameraWeight | (private) | `const selectedCameraWeight = (() => {` |
| 7778 | fn | ownGearIdSet | (private) | `const ownGearIdSet = (() => {` |
| 7857 | fn | parseShootingPeriodDays | (private) | - |
| 7867 | fn | toTimestamp | (private) | - |
| 7879 | fn | shootingDayEntries | (private) | `const shootingDayEntries = (() => {` |
| 7907 | fn | touchesMatteboxCategory | (private) | `const touchesMatteboxCategory = (rule) => {` |
| 8183 | fn | formatPhoneHref | (private) | `function formatPhoneHref(phone) {` |
| 8191 | fn | formatEmailHref | (private) | `function formatEmailHref(email) {` |
| 8201 | fn | formatRequirementValue | (private) | `function formatRequirementValue(rawValue) {` |
| 8224 | fn | resolveGearListCustomText | (private) | `function resolveGearListCustomText(key, fallbac...` |
| 8240 | fn | getGearListRentalToggleTexts | (private) | `function getGearListRentalToggleTexts(options =...` |
| 8256 | fn | buildRentalToggleMarkup | (private) | `function buildRentalToggleMarkup(dataName, labe...` |
| 8270 | fn | setRentalExclusionState | (private) | `function setRentalExclusionState(element, exclu...` |
| 8302 | fn | applyRentalExclusionsState | (private) | `function applyRentalExclusionsState(state) {` |
| 8318 | fn | createCustomCategoryKey | (private) | `function createCustomCategoryKey(label) {` |
| 8330 | fn | getCustomItemsContainer | (private) | `function getCustomItemsContainer(key) {` |
| 8356 | fn | applyGearItemNotesState | (private) | `function applyGearItemNotesState(state) {` |
| 8373 | fn | applyGearItemProvidersState | (private) | `function applyGearItemProvidersState(state) {` |
| 8392 | fn | applyGearItemOverridesState | (private) | `function applyGearItemOverridesState(state) {` |
| 8409 | fn | isSuggestionDeviceEntry | (private) | `function isSuggestionDeviceEntry(entry) {` |
| 8424 | fn | collectDeviceSuggestionNames | (private) | `function collectDeviceSuggestionNames(source) {` |
| 8440 | fn | getDeviceSuggestionNamesForPath | (private) | `function getDeviceSuggestionNamesForPath(path) {` |
| 8457 | fn | collectStandardItemSuggestions | (private) | `function collectStandardItemSuggestions(categor...` |
| 8462 | fn | addName | (private) | - |
| 8488 | fn | getCustomCategorySuggestions | (private) | `function getCustomCategorySuggestions(categoryK...` |
| 8518 | fn | ensureCustomCategorySuggestionList | (private) | `function ensureCustomCategorySuggestionList(cat...` |
| 8551 | fn | attachCustomItemSuggestions | (private) | `function attachCustomItemSuggestions(entry, cat...` |
| 8561 | fn | updateCustomItemPreview | (private) | `function updateCustomItemPreview(entry) {` |
| 8588 | fn | updateGearItemNoteElement | (private) | `function updateGearItemNoteElement(entry, value) {` |
| 8648 | fn | ensureGearItemNoteSpan | (private) | `function ensureGearItemNoteSpan(element) {` |
| 8679 | fn | ensureGearItemExtraIndicator | (private) | `function ensureGearItemExtraIndicator(element) {` |
| 8718 | fn | getCameraCategoryLabelSet | (private) | `function getCameraCategoryLabelSet() {` |
| 8750 | fn | isPrimaryCameraItem | (private) | `function isPrimaryCameraItem(element) {` |
| 8769 | fn | getActiveCameraDisplayName | (private) | `function getActiveCameraDisplayName() {` |
| 8783 | fn | normalizeCameraLinkColorValue | (private) | `function normalizeCameraLinkColorValue(value) {` |
| 8800 | fn | generateDefaultCameraColor | (private) | `function generateDefaultCameraColor(letter) {` |
| 8804 | fn | generateChannel | (private) | `const generateChannel = () => {` |
| 8822 | fn | getCameraLetterColorDefaults | (private) | `function getCameraLetterColorDefaults() {` |
| 8870 | fn | normalizeCameraLetter | (private) | `function normalizeCameraLetter(letter) {` |
| 8885 | fn | getCameraLetterColorsSafe | (private) | `function getCameraLetterColorsSafe() {` |
| 8908 | fn | getCameraLetterColor | (private) | `function getCameraLetterColor(letter) {` |
| 8917 | fn | computeCameraLetterTextColor | (private) | `function computeCameraLetterTextColor(color) {` |
| 8936 | fn | collectCameraSourceEntries | (private) | `function collectCameraSourceEntries(root) {` |
| 8969 | fn | refreshAllCameraLinkIndicators | (private) | `function refreshAllCameraLinkIndicators(scope) {` |
| 9001 | fn | ensureGearItemCameraLinkIndicator | (private) | `function ensureGearItemCameraLinkIndicator(elem...` |
| 9054 | fn | updateGearItemCameraLinkIndicator | (private) | `function updateGearItemCameraLinkIndicator(elem...` |
| 9096 | fn | ensureGearItemTextContainer | (private) | `function ensureGearItemTextContainer(element) {` |
| 9141 | fn | parseGearItemDisplayParts | (private) | `function parseGearItemDisplayParts(text) {` |
| 9163 | fn | upgradeLegacyGearItemMarkup | (private) | `function upgradeLegacyGearItemMarkup(scope) {` |
| 9261 | fn | getGearItemData | (private) | `function getGearItemData(element) {` |
| 9323 | fn | getGearItemResetDefaults | (private) | `function getGearItemResetDefaults(element) {` |
| 9348 | fn | getGearItemExtraTexts | (private) | `function getGearItemExtraTexts() {` |
| 9371 | fn | getExtraGearUiTexts | (private) | `function getExtraGearUiTexts() {` |
| 9403 | fn | formatExtraDate | (private) | `function formatExtraDate(value) {` |
| 9420 | fn | sanitizeExtraPeriod | (private) | `function sanitizeExtraPeriod(start, end) {` |
| 9438 | fn | formatExtraPeriodLabel | (private) | `function formatExtraPeriodLabel(start, end) {` |
| 9456 | fn | applyGearItemData | (private) | `function applyGearItemData(element, data = {}, ...` |
| 9679 | fn | migrateLegacyCustomItemEntry | (private) | `function migrateLegacyCustomItemEntry(entry) {` |
| 9716 | fn | ensureGearItemEditButton | (private) | `function ensureGearItemEditButton(element) {` |
| 9751 | fn | enhanceGearItemElement | (private) | `function enhanceGearItemElement(element) {` |
| 9777 | fn | enhanceGearListItems | (private) | `function enhanceGearListItems(container) {` |
| 9792 | fn | ensureGearListCustomControls | (private) | `function ensureGearListCustomControls(container) {` |
| 9882 | fn | ensureExtraGearCategory | (private) | `function ensureExtraGearCategory() {` |
| 9951 | fn | buildGearItemEditContext | (private) | `function buildGearItemEditContext() {` |
| 10010 | fn | getGearItemEditContext | (private) | `function getGearItemEditContext(scope) {` |
| 10020 | fn | getGearItemEditTexts | (private) | `function getGearItemEditTexts() {` |
| 10076 | fn | applyGearItemEditDialogTexts | (private) | `function applyGearItemEditDialogTexts(context) {` |
| 10256 | fn | computeGearItemEditPreviewText | (private) | `function computeGearItemEditPreviewText(context) {` |
| 10277 | fn | updateGearItemEditPreview | (private) | `function updateGearItemEditPreview(context) {` |
| 10287 | fn | isPlainObjectValue | (private) | `function isPlainObjectValue(value) {` |
| 10291 | fn | cssEscapeValue | (private) | `function cssEscapeValue(value) {` |
| 10300 | fn | formatDeviceCategoryLabel | (private) | `function formatDeviceCategoryLabel(category) {` |
| 10313 | fn | formatDeviceCategoryPathForEdit | (private) | `function formatDeviceCategoryPathForEdit(path) {` |
| 10323 | fn | findDeviceRecordByName | (private) | `function findDeviceRecordByName(rawName) {` |
| 10332 | fn | search | (private) | `const search = (node, path) => {` |
| 10383 | fn | generateGearItemDeviceSummary | (private) | `function generateGearItemDeviceSummary(deviceIn...` |
| 10402 | fn | hideGearItemEditDeviceInfo | (private) | `function hideGearItemEditDeviceInfo(context) {` |
| 10431 | fn | updateGearItemEditDeviceInfo | (private) | `function updateGearItemEditDeviceInfo(context, ...` |
| 10504 | fn | openDeviceManagerForDevice | (private) | `function openDeviceManagerForDevice(target) {` |
| 10526 | fn | locateButton | (private) | `const locateButton = () => {` |
| 10566 | fn | handleGearItemEditDeviceButtonClick | (private) | `function handleGearItemEditDeviceButtonClick(ev...` |
| 10588 | fn | updateGearItemEditExtraControls | (private) | `function updateGearItemEditExtraControls(contex...` |
| 10618 | fn | updateGearItemEditResetState | (private) | `function updateGearItemEditResetState(context) {` |
| 10642 | fn | updateGearItemEditRentalControls | (private) | `function updateGearItemEditRentalControls(conte...` |
| 10663 | fn | handleGearItemEditFieldInput | (private) | `function handleGearItemEditFieldInput() {` |
| 10694 | fn | handleGearItemEditRentalCheckboxChange | (private) | `function handleGearItemEditRentalCheckboxChange...` |
| 10702 | fn | handleGearItemEditOwnedChange | (private) | `function handleGearItemEditOwnedChange() {` |
| 10727 | fn | handleGearItemEditExtraChange | (private) | `function handleGearItemEditExtraChange() {` |
| 10736 | fn | handleGearItemEditResetClick | (private) | `function handleGearItemEditResetClick(event) {` |
| 10763 | fn | handleGearItemEditDialogBackdropPointerDown | (private) | `function handleGearItemEditDialogBackdropPointe...` |
| 10782 | fn | handleGearItemEditFormSubmit | (private) | `function handleGearItemEditFormSubmit(event) {` |
| 10905 | fn | handleGearItemEditDialogCancel | (private) | `function handleGearItemEditDialogCancel(event) {` |
| 10915 | fn | handleGearItemEditDialogClose | (private) | `function handleGearItemEditDialogClose() {` |
| 10971 | fn | refreshGearItemEditProviderOptionsIfOpen | (private) | `function refreshGearItemEditProviderOptionsIfOp...` |
| 10987 | fn | refreshGearItemEditCameraLinkOptionsIfOpen | (private) | `function refreshGearItemEditCameraLinkOptionsIf...` |
| 11040 | fn | refreshGearItemOwnedStateIfOpen | (private) | `function refreshGearItemOwnedStateIfOpen() {` |
| 11079 | fn | bindGearItemEditDialog | (private) | `function bindGearItemEditDialog(context) {` |
| 11133 | fn | openGearItemEditor | (private) | `function openGearItemEditor(element, options = ...` |
| 11150 | fn | gearDialogContext | (private) | `const gearDialogContext = (() => {` |
| 11291 | fn | fallbackPreview | (private) | `const fallbackPreview = (() => {` |
| 11340 | fn | buildCustomItemEntryElement | (private) | `function buildCustomItemEntryElement(categoryKe...` |
| 11439 | fn | persistCustomItemsChange | (private) | `function persistCustomItemsChange() {` |
| 11452 | fn | addCustomItemEntry | (private) | `function addCustomItemEntry(categoryKey, catego...` |
| 11505 | fn | addExtraGearItem | (private) | `function addExtraGearItem(options = {}) {` |
| 11531 | fn | handleAddCustomItemRequest | (private) | `function handleAddCustomItemRequest(button) {` |
| 11543 | fn | handleRemoveCustomItemRequest | (private) | `function handleRemoveCustomItemRequest(button) {` |
| 11560 | fn | readCustomItemsState | (private) | `function readCustomItemsState() {` |
| 11607 | fn | applyCustomItemsState | (private) | `function applyCustomItemsState(state) {` |
| 11636 | fn | gearListGenerateHtmlImpl | (private) | `function gearListGenerateHtmlImpl(info = {}) {` |
| 11637 | fn | getEl | (private) | `const getEl = (id, ref) => ref || (typeof docum...` |
| 11645 | fn | getText | (private) | - |
| 11674 | fn | registerCameraLinkTarget | (private) | - |
| 11682 | fn | registerCameraLinkedItem | (private) | - |
| 11692 | fn | markEntryCameraLink | (private) | - |
| 11699 | fn | applyCameraLinkFromTargets | (private) | `const applyCameraLinkFromTargets = ({ base, ent...` |
| 11710 | fn | buildCameraLinkAttributes | (private) | `const buildCameraLinkAttributes = (labelOverrid...` |
| 11765 | fn | isScenarioActive | (private) | - |
| 11766 | fn | isAnyScenarioActive | (private) | - |
| 11889 | fn | addMonitorCables | (private) | - |
| 11898 | fn | addLargeMonitorCables | (private) | - |
| 11908 | fn | addHandle | (private) | `const addHandle = () => {` |
| 12165 | fn | formatItems | (private) | `const formatItems = (arr, options = {}) => {` |
| 12167 | fn | parseBaseAndContext | (private) | - |
| 12336 | fn | wrapGearItemHtml | (private) | `const wrapGearItemHtml = (contentHtml, options ...` |
| 12364 | fn | ensureItems | (private) | `const ensureItems = (arr, categoryPath) => {` |
| 12377 | fn | addRow | (private) | `const addRow = (cat, items) => {` |
| 12520 | fn | cameraRequiredImageCircle | (private) | `const cameraRequiredImageCircle = (() => {` |
| 12530 | fn | normalizeFocusScaleValue | (private) | `const normalizeFocusScaleValue = (value) => {` |
| 12537 | fn | resolveFocusScaleMode | (private) | `const resolveFocusScaleMode = () => {` |
| 12555 | fn | resolveLensFocusScaleMode | (private) | `const resolveLensFocusScaleMode = (lens) => {` |
| 12563 | fn | formatLensNumber | (private) | `const formatLensNumber = (value, options = {}) ...` |
| 12592 | fn | formatLensWeight | (private) | `const formatLensWeight = (value, mode = focusSc...` |
| 12607 | fn | formatLensDiameter | (private) | `const formatLensDiameter = (value, mode = focus...` |
| 12622 | fn | formatLensMinFocus | (private) | `const formatLensMinFocus = (value, mode = focus...` |
| 12638 | fn | formatRodLength | (private) | `const formatRodLength = (value, mode = focusSca...` |
| 12695 | fn | lensSorter | (private) | `const lensSorter = ([baseA], [baseB]) => {` |
| 12721 | fn | parseRodTypes | (private) | - |
| 12848 | fn | stripCameraLinkPrefix | (private) | `const stripCameraLinkPrefix = (label) => {` |
| 12855 | fn | isWhitespaceChar | (private) | `const isWhitespaceChar = (char) => (` |
| 12864 | fn | skipWhitespace | (private) | `const skipWhitespace = (position) => {` |
| 12901 | fn | stripEnclosingQuotes | (private) | - |
| 12905 | fn | isQuoteChar | (private) | `const isQuoteChar = (char) => (` |
| 12924 | fn | cleanupMonitorLabel | (private) | - |
| 12935 | fn | addCandidate | (private) | - |
| 12972 | fn | formatSizeValue | (private) | - |
| 13286 | fn | monitorBatterySelections | (private) | `const monitorBatterySelections = (() => {` |
| 13303 | fn | buildBatteryOptions | (private) | `const buildBatteryOptions = (selectedValue) => {` |
| 13411 | fn | normalizeCartName | (private) | `function normalizeCartName(value) {` |
| 13422 | fn | resolveCartDatasetName | (private) | `function resolveCartDatasetName(rawName) {` |
| 13444 | fn | formatCartFeatureLabel | (private) | `function formatCartFeatureLabel(value) {` |
| 13452 | fn | formatWheelOptionLabel | (private) | `function formatWheelOptionLabel(option, prefix) {` |
| 13478 | fn | buildCartConfigurationOptions | (private) | `function buildCartConfigurationOptions(cartEntr...` |
| 13484 | fn | addOption | (private) | `const addOption = (value, label, selected, titl...` |
| 13524 | fn | buildCartAccessoriesOptions | (private) | `function buildCartAccessoriesOptions(cartEntry) {` |
| 13530 | fn | addOption | (private) | `const addOption = (value, label, selected, titl...` |
| 13555 | fn | buildCartOptionBlock | (private) | `function buildCartOptionBlock(id, label, option...` |
| 13583 | fn | buildCartItemHtml | (private) | `function buildCartItemHtml(rawName, index) {` |
| 13622 | fn | buildCartRowsHtml | (private) | `function buildCartRowsHtml(items) {` |
| 13949 | fn | gearListGetCurrentHtmlImpl | (private) | `function gearListGetCurrentHtmlImpl(options = {...` |
| 14136 | fn | getGearListSelectors | (private) | `function getGearListSelectors() {` |
| 14138 | fn | collectSelectValue | (private) | `const collectSelectValue = (sel) => {` |
| 14185 | fn | checkAndPut | (private) | `const checkAndPut = (attr, key, isBool = false)...` |
| 14218 | fn | cloneGearListSelectors | (private) | `function cloneGearListSelectors(selectors) {` |
| 14220 | fn | cloneValue | (private) | `const cloneValue = (value) => {` |
| 14244 | fn | applyGearListSelectors | (private) | `function applyGearListSelectors(selectors) {` |
| 14247 | fn | setSelectValue | (private) | `const setSelectValue = (id, value) => {` |
| 14298 | fn | convertCustomItemsForStaticOutput | (private) | `function convertCustomItemsForStaticOutput(root) {` |
| 14373 | fn | cloneProjectInfoForStorage | (private) | `function cloneProjectInfoForStorage(info) {` |
| 14397 | fn | hasMeaningfulProjectInfoValue | (private) | `function hasMeaningfulProjectInfoValue(value) {` |
| 14419 | fn | mergeProjectInfoSnapshots | (private) | `function mergeProjectInfoSnapshots(base, update...` |
| 14446 | fn | normalizeRequirementNodeValue | (private) | `function normalizeRequirementNodeValue(node) {` |
| 14463 | fn | collectProjectInfoFromRequirementsGrid | (private) | `function collectProjectInfoFromRequirementsGrid...` |
| 14534 | fn | normalizeProjectStorageNameForCollision | (private) | `function normalizeProjectStorageNameForCollisio...` |
| 14543 | fn | clearPendingProjectNameCollisionResolution | (private) | `function clearPendingProjectNameCollisionResolu...` |
| 14557 | fn | getPendingProjectNameCollisionResolution | (private) | `function getPendingProjectNameCollisionResoluti...` |
| 14571 | fn | rememberPendingProjectNameCollisionResolution | (private) | `function rememberPendingProjectNameCollisionRes...` |
| 14585 | fn | applyPendingProjectNameCollisionResolution | (private) | `function applyPendingProjectNameCollisionResolu...` |
| 14612 | fn | resolveProjectStorageNameCollision | (private) | `function resolveProjectStorageNameCollision(bas...` |
| 14664 | fn | createFallbackToken | (private) | `const createFallbackToken = () => {` |
| 14693 | fn | doesProjectNameExist | (private) | `function doesProjectNameExist(name) {` |
| 14720 | fn | saveCurrentGearList | (private) | `function saveCurrentGearList() {` |
| 14732 | fn | saveCurrentGearListImplementation | (private) | `function saveCurrentGearListImplementation() {` |
| 14769 | fn | normalize | (private) | `const normalize = (value) => (typeof value === ...` |
| 14799 | fn | fallbackNormalize | (private) | `const fallbackNormalize = (value) => {` |
| 15059 | fn | deleteCurrentGearList | (private) | `function deleteCurrentGearList() {` |
| 15060 | fn | resolveDeleteGearListText | (private) | `const resolveDeleteGearListText = (() => {` |
| 15096 | fn | performDeletion | (private) | `const performDeletion = () => {` |
| 15259 | fn | getAutoGearRuleColorKey | (private) | `function getAutoGearRuleColorKey(rule, dataset) {` |
| 15283 | fn | getAutoGearRuleColorEntry | (private) | `function getAutoGearRuleColorEntry(rule, datase...` |
| 15301 | fn | applyAutoGearRuleColors | (private) | `function applyAutoGearRuleColors(span, rule) {` |
| 15341 | fn | getAutoGearRuleBadgeTemplates | (private) | `function getAutoGearRuleBadgeTemplates() {` |
| 15352 | fn | formatAutoGearRuleBadgeText | (private) | `function formatAutoGearRuleBadgeText(ruleLabel,...` |
| 15365 | fn | refreshAutoGearRuleBadge | (private) | `function refreshAutoGearRuleBadge(span) {` |
| 15416 | fn | updateAutoGearRuleBadges | (private) | `function updateAutoGearRuleBadges(container) {` |
| 15425 | fn | getAutoGearHighlightLabel | (private) | `function getAutoGearHighlightLabel() {` |
| 15435 | fn | getAutoGearHighlightHelp | (private) | `function getAutoGearHighlightHelp() {` |
| 15445 | fn | isAutoGearHighlightEnabled | (private) | `function isAutoGearHighlightEnabled() {` |
| 15449 | fn | canHighlightAutoGear | (private) | `function canHighlightAutoGear() {` |
| 15454 | fn | ensureAutoGearHighlightToggleStructure | (private) | `function ensureAutoGearHighlightToggleStructure...` |
| 15526 | fn | getAutoGearHighlightStateText | (private) | `function getAutoGearHighlightStateText(isActive) {` |
| 15538 | fn | applyAutoGearHighlightContext | (private) | `function applyAutoGearHighlightContext(isActive) {` |
| 15551 | fn | setAutoGearHighlightEnabled | (private) | `function setAutoGearHighlightEnabled(enabled) {` |
| 15559 | fn | updateAutoGearHighlightToggleButton | (private) | `function updateAutoGearHighlightToggleButton() {` |
| 15603 | fn | collectCurrentGearModifications | (private) | `function collectCurrentGearModifications() {` |
| 15661 | fn | applyCurrentGearModifications | (private) | `function applyCurrentGearModifications(mods) {` |
| 15700 | fn | ensureGearListActions | (private) | `function ensureGearListActions() {` |
| 15917 | fn | handleGearDeleteRequest | (private) | `const handleGearDeleteRequest = () => {` |
| 15929 | fn | resolveGearListCageLabel | (private) | `function resolveGearListCageLabel() {` |
| 15937 | fn | syncGearListCageItem | (private) | `function syncGearListCageItem(select) {` |
| 15966 | fn | bindGearListCageListener | (private) | `function bindGearListCageListener() {` |
| 15984 | fn | bindGearListEasyrigListener | (private) | `function bindGearListEasyrigListener() {` |
| 15998 | fn | bindGearListSliderBowlListener | (private) | `function bindGearListSliderBowlListener() {` |
| 16012 | fn | bindGearListEyeLeatherListener | (private) | `function bindGearListEyeLeatherListener() {` |
| 16024 | fn | bindGearListProGaffTapeListener | (private) | `function bindGearListProGaffTapeListener() {` |
| 16041 | fn | formatMonitorSizeValue | (private) | `function formatMonitorSizeValue(value) {` |
| 16048 | fn | updateGearListMonitorItem | (private) | `function updateGearListMonitorItem(select, opti...` |
| 16078 | fn | bindGearListDirectorMonitorListener | (private) | `function bindGearListDirectorMonitorListener() {` |
| 16138 | fn | refreshGearListIfVisible | (private) | `function refreshGearListIfVisible() {` |
| 16224 | fn | getSetups | (private) | `function getSetups() {` |
| 16230 | fn | getSetupSelectElement | (private) | `function getSetupSelectElement() {` |

