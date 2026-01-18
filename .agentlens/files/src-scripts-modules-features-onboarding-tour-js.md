# src/scripts/modules/features/onboarding-tour.js

[← Back to Module](../modules/src-scripts-modules-features/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 8695
- **Language:** JavaScript
- **Symbols:** 279
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 8 | fn | prefersReducedMotion | (private) | `function prefersReducedMotion() {` |
| 20 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(primary) {` |
| 31 | fn | resolveDocument | (private) | `function resolveDocument(scope) {` |
| 78 | fn | resolveHeroMarginPx | (private) | `function resolveHeroMarginPx(viewportWidth, roo...` |
| 153 | fn | isElementFocusable | (private) | `function isElementFocusable(element) {` |
| 177 | fn | collectFocusableElements | (private) | `function collectFocusableElements(root, include...` |
| 198 | fn | sortFocusableByDocumentOrder | (private) | `function sortFocusableByDocumentOrder(elements) {` |
| 217 | fn | getRootFontSizePx | (private) | `function getRootFontSizePx() {` |
| 250 | fn | isDialogElement | (private) | `function isDialogElement(element) {` |
| 258 | fn | bringOverlayToTopLayer | (private) | `function bringOverlayToTopLayer() {` |
| 301 | fn | handleDialogToggle | (private) | `function handleDialogToggle(event) {` |
| 314 | fn | getSafeLocalStorage | (private) | `function getSafeLocalStorage() {` |
| 326 | fn | resolveStorage | (private) | `function resolveStorage() {` |
| 355 | fn | pushUniqueStorage | (private) | `function pushUniqueStorage(target, storage) {` |
| 378 | fn | collectStorageCandidates | (private) | `function collectStorageCandidates() {` |
| 416 | fn | readWindowNameSkipFlag | (private) | `function readWindowNameSkipFlag() {` |
| 427 | fn | writeWindowNameSkipFlag | (private) | `function writeWindowNameSkipFlag(skipped) {` |
| 450 | fn | readSkipStatusPreference | (private) | `function readSkipStatusPreference() {` |
| 486 | fn | persistSkipStatus | (private) | `function persistSkipStatus(skipped) {` |
| 528 | fn | sanitizeDeviceDescriptor | (private) | `function sanitizeDeviceDescriptor(detail) {` |
| 547 | fn | descriptorsMatch | (private) | `function descriptorsMatch(a, b) {` |
| 551 | fn | normalize | (private) | - |
| 559 | fn | notifyDeviceLibrarySubscribers | (private) | `function notifyDeviceLibrarySubscribers() {` |
| 577 | fn | subscribeDeviceLibrary | (private) | `function subscribeDeviceLibrary(callback) {` |
| 615 | fn | clone | (private) | `function clone(value) {` |
| 672 | fn | resolveOwnGearAccessHighlightSelectors | (private) | `function resolveOwnGearAccessHighlightSelectors...` |
| 719 | fn | addSelector | (private) | - |
| 995 | fn | isPrefaceStep | (private) | `function isPrefaceStep(step) {` |
| 999 | fn | isCompletionStep | (private) | `function isCompletionStep(step) {` |
| 1003 | fn | isCountableStep | (private) | `function isCountableStep(step) {` |
| 1007 | fn | getCountableStepTotal | (private) | `function getCountableStepTotal(stepList) {` |
| 1020 | fn | getCountableStepIndex | (private) | `function getCountableStepIndex(stepList, index) {` |
| 1039 | fn | getCountableCompletedCount | (private) | `function getCountableCompletedCount(stepList, c...` |
| 1053 | fn | getNextCountableStep | (private) | `function getNextCountableStep(stepList, complet...` |
| 1069 | fn | getElement | (private) | `function getElement(selector) {` |
| 1081 | fn | getFieldValue | (private) | `function getFieldValue(element) {` |
| 1094 | fn | createFieldCompletionRequirement | (private) | `function createFieldCompletionRequirement(selec...` |
| 1117 | fn | handler | (private) | `const handler = () => {` |
| 1150 | fn | createClickCompletionRequirement | (private) | `function createClickCompletionRequirement(selec...` |
| 1178 | fn | listener | (private) | `const listener = () => {` |
| 1219 | fn | createProjectDialogSubmitRequirement | (private) | `function createProjectDialogSubmitRequirement() {` |
| 1236 | fn | handler | (private) | `const handler = () => {` |
| 1253 | fn | createDeviceLibraryRequirement | (private) | `function createDeviceLibraryRequirement(checker) {` |
| 1265 | fn | handler | (private) | `const handler = () => {` |
| 1292 | fn | createDeviceLibraryAddRequirement | (private) | `function createDeviceLibraryAddRequirement() {` |
| 1296 | fn | createDeviceLibraryReviewRequirement | (private) | `function createDeviceLibraryReviewRequirement() {` |
| 1307 | fn | createDeviceLibraryEditRequirement | (private) | `function createDeviceLibraryEditRequirement() {` |
| 1320 | fn | evaluateOwnGearOpenState | (private) | `function evaluateOwnGearOpenState() {` |
| 1329 | fn | createOwnGearOpenRequirement | (private) | `function createOwnGearOpenRequirement() {` |
| 1341 | fn | evaluate | (private) | `const evaluate = () => {` |
| 1366 | fn | handleDialogEvent | (private) | `const handleDialogEvent = () => {` |
| 1374 | fn | handleTriggerClick | (private) | `const handleTriggerClick = () => {` |
| 1399 | fn | createProjectRequirementsAccessRequirement | (private) | `function createProjectRequirementsAccessRequire...` |
| 1407 | fn | evaluate | (private) | `const evaluate = () => {` |
| 1417 | fn | handleOwnGearEvent | (private) | `const handleOwnGearEvent = () => {` |
| 1447 | fn | handleProjectDialogEvent | (private) | `const handleProjectDialogEvent = () => {` |
| 1477 | fn | handleGenerateClick | (private) | `const handleGenerateClick = () => {` |
| 1501 | fn | hasOwnGearListEntries | (private) | `function hasOwnGearListEntries() {` |
| 1516 | fn | createOwnGearItemRequirement | (private) | `function createOwnGearItemRequirement() {` |
| 1525 | fn | evaluate | (private) | `const evaluate = () => {` |
| 1548 | fn | handleListEvent | (private) | `const handleListEvent = () => {` |
| 1557 | fn | handleFormSubmit | (private) | `const handleFormSubmit = () => {` |
| 1565 | fn | handleSaveClick | (private) | `const handleSaveClick = () => {` |
| 1614 | fn | hasProjectCrewRows | (private) | `function hasProjectCrewRows() {` |
| 1637 | fn | createProjectCrewRequirement | (private) | `function createProjectCrewRequirement() {` |
| 1638 | fn | evaluate | (private) | `const evaluate = () => hasProjectCrewRows();` |
| 1657 | fn | evaluateAndDispatch | (private) | `const evaluateAndDispatch = () => {` |
| 1684 | fn | handleInput | (private) | `const handleInput = () => {` |
| 1715 | fn | handleClick | (private) | `const handleClick = () => {` |
| 1739 | fn | hasProjectLogisticsEntry | (private) | `function hasProjectLogisticsEntry() {` |
| 1801 | fn | createProjectLogisticsRequirement | (private) | `function createProjectLogisticsRequirement() {` |
| 1820 | fn | evaluateAndDispatch | (private) | `const evaluateAndDispatch = () => {` |
| 1828 | fn | handleFieldEvent | (private) | `const handleFieldEvent = () => {` |
| 1866 | fn | getProjectNameValue | (private) | `function getProjectNameValue() {` |
| 1871 | fn | hasSavedSetupForName | (private) | `function hasSavedSetupForName(name) {` |
| 1888 | fn | createSaveProjectRequirement | (private) | `function createSaveProjectRequirement() {` |
| 1895 | fn | evaluate | (private) | `const evaluate = () => {` |
| 1908 | fn | handleClick | (private) | `const handleClick = () => {` |
| 1919 | fn | handleChange | (private) | `const handleChange = () => {` |
| 1930 | fn | handleInput | (private) | `const handleInput = () => {` |
| 1990 | fn | getTimestamp | (private) | `function getTimestamp() {` |
| 2002 | fn | normalizeCompletedSteps | (private) | `function normalizeCompletedSteps(value, allowed...` |
| 2022 | fn | normalizeStateSnapshot | (private) | `function normalizeStateSnapshot(state) {` |
| 2076 | fn | updateStoredStateCache | (private) | `function updateStoredStateCache(nextState, rawV...` |
| 2082 | fn | createStorageEntry | (private) | `function createStorageEntry(serialized, key) {` |
| 2124 | fn | isBetterStorageEntry | (private) | `function isBetterStorageEntry(candidate, curren...` |
| 2144 | fn | loadStoredState | (private) | `function loadStoredState() {` |
| 2274 | fn | saveState | (private) | `function saveState(nextState) {` |
| 2325 | fn | refreshStoredState | (private) | `function refreshStoredState() {` |
| 2342 | fn | normalizeLanguageCandidate | (private) | `function normalizeLanguageCandidate(rawValue, a...` |
| 2365 | fn | resolveLanguage | (private) | `function resolveLanguage() {` |
| 2375 | fn | pushCandidate | (private) | - |
| 2445 | fn | resolveTourTexts | (private) | `function resolveTourTexts() {` |
| 2480 | fn | prefaceIndicatorText | (private) | `const prefaceIndicatorText = (() => {` |
| 2506 | fn | resolveText | (private) | `function resolveText(key, defaultValue) {` |
| 2513 | fn | createStepConfig | (private) | `function createStepConfig() {` |
| 2755 | fn | getStepConfig | (private) | `function getStepConfig() {` |
| 2819 | fn | getProxyControlId | (private) | `function getProxyControlId(prefix) {` |
| 2824 | fn | setNextButtonDisabled | (private) | `function setNextButtonDisabled(disabled) {` |
| 2838 | fn | updateBaselineViewportHeight | (private) | `function updateBaselineViewportHeight(candidate...` |
| 2856 | fn | isTextInputElement | (private) | `function isTextInputElement(element) {` |
| 2902 | fn | teardownStepRequirement | (private) | `function teardownStepRequirement() {` |
| 2915 | fn | teardownStepInteraction | (private) | `function teardownStepInteraction() {` |
| 2932 | fn | teardownStepAutomation | (private) | `function teardownStepAutomation() {` |
| 2943 | fn | applyStepRequirement | (private) | `function applyStepRequirement(step) {` |
| 2996 | fn | applyStepAutomation | (private) | `function applyStepAutomation(step) {` |
| 3023 | fn | clearFrame | (private) | `function clearFrame() {` |
| 3035 | fn | clearScrollStateTimer | (private) | `function clearScrollStateTimer() {` |
| 3047 | fn | clearScrollState | (private) | `function clearScrollState() {` |
| 3054 | fn | markScrollActive | (private) | `function markScrollActive() {` |
| 3073 | fn | isOverlayScrollEvent | (private) | `function isOverlayScrollEvent(event) {` |
| 3132 | fn | handleGlobalScroll | (private) | `function handleGlobalScroll(event) {` |
| 3143 | fn | getOverlayMetrics | (private) | `function getOverlayMetrics() {` |
| 3229 | fn | updateHeroInlineSize | (private) | `function updateHeroInlineSize(size, metrics, fo...` |
| 3279 | fn | schedulePositionUpdate | (private) | `function schedulePositionUpdate() {` |
| 3297 | fn | handleVisualViewportChange | (private) | `function handleVisualViewportChange() {` |
| 3301 | fn | attachVisualViewportListeners | (private) | `function attachVisualViewportListeners() {` |
| 3314 | fn | detachVisualViewportListeners | (private) | `function detachVisualViewportListeners() {` |
| 3326 | fn | ensureOverlayElements | (private) | `function ensureOverlayElements() {` |
| 3460 | fn | teardownOverlayElements | (private) | `function teardownOverlayElements() {` |
| 3501 | fn | attachKeyboardListener | (private) | `function attachKeyboardListener() {` |
| 3509 | fn | detachKeyboardListener | (private) | `function detachKeyboardListener() {` |
| 3517 | fn | formatStepIndicator | (private) | `function formatStepIndicator(position, total) {` |
| 3529 | fn | formatPrefaceIndicator | (private) | `function formatPrefaceIndicator() {` |
| 3536 | fn | focusCard | (private) | `function focusCard() {` |
| 3568 | fn | toSelectorArray | (private) | `function toSelectorArray(value) {` |
| 3585 | fn | callSelectorResolver | (private) | `function callSelectorResolver(resolver, label) {` |
| 3597 | fn | resolveSelectorElements | (private) | `function resolveSelectorElements(selectors) {` |
| 3615 | fn | isHighlightElementUsable | (private) | `function isHighlightElementUsable(element) {` |
| 3664 | fn | filterUsableHighlightElements | (private) | `function filterUsableHighlightElements(elements) {` |
| 3681 | fn | ensureHighlightVisible | (private) | `function ensureHighlightVisible(step) {` |
| 3710 | fn | getHighlightElements | (private) | `function getHighlightElements(step) {` |
| 3748 | fn | resolveOverlayAnchorForElements | (private) | `function resolveOverlayAnchorForElements(elemen...` |
| 3783 | fn | setOverlayAnchorElement | (private) | `function setOverlayAnchorElement(anchorElement) {` |
| 3859 | fn | getTargetElement | (private) | `function getTargetElement(step) {` |
| 3874 | fn | clearActiveTargetElements | (private) | `function clearActiveTargetElements() {` |
| 3886 | fn | normalizeHighlightPaddingValue | (private) | `function normalizeHighlightPaddingValue(value, ...` |
| 3893 | fn | resolveStepHighlightPadding | (private) | `function resolveStepHighlightPadding(step) {` |
| 3924 | fn | updateHighlightPosition | (private) | `function updateHighlightPosition() {` |
| 3997 | fn | positionCard | (private) | `function positionCard(target, targetRect) {` |
| 4090 | fn | clampOverlap | (private) | `const clampOverlap = (value) => {` |
| 4190 | fn | computeOverlap | (private) | - |
| 4221 | fn | ensureSettingsForStep | (private) | `function ensureSettingsForStep(step) {` |
| 4274 | fn | ensureContactsForStep | (private) | `function ensureContactsForStep(step) {` |
| 4329 | fn | isContactsDialogVisible | (private) | `function isContactsDialogVisible() {` |
| 4343 | fn | closeContactsIfNeeded | (private) | `function closeContactsIfNeeded() {` |
| 4365 | fn | ensureHeroCardForStep | (private) | `function ensureHeroCardForStep(step) {` |
| 4375 | fn | ensureOwnGearForStep | (private) | `function ensureOwnGearForStep(step) {` |
| 4428 | fn | isOwnGearDialogVisible | (private) | `function isOwnGearDialogVisible() {` |
| 4442 | fn | closeOwnGearIfNeeded | (private) | `function closeOwnGearIfNeeded() {` |
| 4464 | fn | isProjectDialogVisible | (private) | `function isProjectDialogVisible() {` |
| 4485 | fn | ensureProjectDialogForStep | (private) | `function ensureProjectDialogForStep(step) {` |
| 4547 | fn | attachProjectDialogVisibilityMonitor | (private) | `function attachProjectDialogVisibilityMonitor() {` |
| 4560 | fn | handleVisibilityChange | (private) | `const handleVisibilityChange = () => {` |
| 4603 | fn | detachProjectDialogVisibilityMonitor | (private) | `function detachProjectDialogVisibilityMonitor() {` |
| 4614 | fn | closeProjectDialogIfNeeded | (private) | `function closeProjectDialogIfNeeded() {` |
| 4639 | fn | isDeviceManagerVisible | (private) | `function isDeviceManagerVisible() {` |
| 4649 | fn | ensureDeviceManagerForStep | (private) | `function ensureDeviceManagerForStep(step) {` |
| 4712 | fn | closeDeviceManagerIfNeeded | (private) | `function closeDeviceManagerIfNeeded() {` |
| 4762 | fn | focusDeviceManagerNameField | (private) | `function focusDeviceManagerNameField() {` |
| 4817 | fn | attachDeviceManagerNameAutofill | (private) | `function attachDeviceManagerNameAutofill() {` |
| 4829 | fn | scheduleFocusIfVisible | (private) | `const scheduleFocusIfVisible = () => {` |
| 4836 | fn | handleToggleClick | (private) | `const handleToggleClick = () => {` |
| 4878 | fn | isSettingsDialogVisible | (private) | `function isSettingsDialogVisible() {` |
| 4892 | fn | closeSettingsIfNeeded | (private) | `function closeSettingsIfNeeded() {` |
| 4916 | fn | getStepTexts | (private) | `function getStepTexts(step) {` |
| 4929 | fn | updateResumeHint | (private) | `function updateResumeHint(index) {` |
| 4965 | fn | updateStepList | (private) | `function updateStepList(activeIndex) {` |
| 5043 | fn | focusHighlightedElement | (private) | `function focusHighlightedElement(step) {` |
| 5088 | fn | applyFocus | (private) | `const applyFocus = () => {` |
| 5124 | fn | dispatchSyntheticEvent | (private) | `function dispatchSyntheticEvent(target, type) {` |
| 5142 | fn | applyLanguagePreference | (private) | `function applyLanguagePreference(value) {` |
| 5183 | fn | renderIntroInteraction | (private) | `function renderIntroInteraction(registerCleanup) {` |
| 5352 | fn | copyOptionsFromSource | (private) | `const copyOptionsFromSource = (source) => {` |
| 5374 | fn | getActiveLanguageValue | (private) | `const getActiveLanguageValue = () => {` |
| 5384 | fn | syncLanguageProxyFromTargets | (private) | `const syncLanguageProxyFromTargets = () => {` |
| 5398 | fn | resolveFallbackLanguageOptions | (private) | `const resolveFallbackLanguageOptions = () => {` |
| 5408 | fn | addOption | (private) | - |
| 5437 | fn | applyFallbackLanguageOptions | (private) | `const applyFallbackLanguageOptions = () => {` |
| 5453 | fn | handleLanguageProxyChange | (private) | `const handleLanguageProxyChange = () => {` |
| 5470 | fn | runLanguageSync | (private) | `const runLanguageSync = () => {` |
| 5525 | fn | handleTargetChange | (private) | `const handleTargetChange = () => {` |
| 5534 | fn | registerLanguageTarget | (private) | - |
| 5541 | fn | targetChangeListener | (private) | `const targetChangeListener = () => {` |
| 5583 | fn | discoverLanguageTargets | (private) | `const discoverLanguageTargets = () => {` |
| 5652 | fn | handleLanguageEvent | (private) | `const handleLanguageEvent = () => {` |
| 5695 | fn | renderUserProfileInteraction | (private) | `function renderUserProfileInteraction(registerC...` |
| 5728 | fn | renderAvatarInitial | (private) | `const renderAvatarInitial = (value) => {` |
| 5735 | fn | getNameInitial | (private) | `const getNameInitial = () => {` |
| 5742 | fn | applyAvatarActionLabel | (private) | `let applyAvatarActionLabel = () => { };` |
| 5744 | fn | updateAvatarPreview | (private) | `const updateAvatarPreview = () => {` |
| 5783 | fn | avatarChangeLabel | (private) | `const avatarChangeLabel = (() => {` |
| 5801 | fn | matchesAvatarChangeLabel | (private) | `const matchesAvatarChangeLabel = (value) => {` |
| 5807 | fn | resolveAvatarActionLabel | (private) | `const resolveAvatarActionLabel = (hasPhoto) => {` |
| 5814 | fn | updateAvatarButton | (private) | `const updateAvatarButton = () => {` |
| 5874 | fn | handleDragOver | (private) | `const handleDragOver = (event) => {` |
| 5880 | fn | handleDragLeave | (private) | `const handleDragLeave = (event) => {` |
| 5886 | fn | handleDrop | (private) | `const handleDrop = (event) => {` |
| 5939 | fn | handleAvatarActionClick | (private) | `const handleAvatarActionClick = () => {` |
| 5977 | fn | createProxyField | (private) | `const createProxyField = (options) => {` |
| 6014 | fn | copySelectOptions | (private) | `const copySelectOptions = () => {` |
| 6039 | fn | syncFromTarget | (private) | `const syncFromTarget = () => {` |
| 6053 | fn | syncToTarget | (private) | `const syncToTarget = () => {` |
| 6200 | fn | focusRunner | (private) | `const focusRunner = () => {` |
| 6221 | fn | renderUnitsPreferencesInteraction | (private) | `function renderUnitsPreferencesInteraction(regi...` |
| 6229 | fn | getTourString | (private) | `const getTourString = (key, fallbackValue) => {` |
| 6261 | fn | syncFromTarget | (private) | `const syncFromTarget = () => {` |
| 6267 | fn | syncToTarget | (private) | `const syncToTarget = () => {` |
| 6354 | fn | syncThemeFromTarget | (private) | `const syncThemeFromTarget = () => {` |
| 6361 | fn | syncThemeToTarget | (private) | `const syncThemeToTarget = () => {` |
| 6445 | fn | syncPinkToTarget | (private) | `const syncPinkToTarget = () => {` |
| 6453 | fn | syncPinkFromTarget | (private) | `const syncPinkFromTarget = () => {` |
| 6508 | fn | syncFocusFromTarget | (private) | `const syncFocusFromTarget = () => {` |
| 6514 | fn | syncFocusToTarget | (private) | `const syncFocusToTarget = () => {` |
| 6564 | fn | syncUnitsFromTarget | (private) | `const syncUnitsFromTarget = () => {` |
| 6570 | fn | syncUnitsToTarget | (private) | `const syncUnitsToTarget = () => {` |
| 6615 | fn | getPersistenceStatusText | (private) | - |
| 6635 | fn | applyStatus | (private) | `const applyStatus = (state, message) => {` |
| 6652 | fn | updateStatus | (private) | - |
| 6675 | fn | handleStatusChange | (private) | - |
| 6695 | fn | disconnectObserver | (private) | `const disconnectObserver = () => {` |
| 6718 | fn | handleRequest | (private) | `const handleRequest = () => {` |
| 6764 | fn | resolveCrewRowForProxy | (private) | `function resolveCrewRowForProxy() {` |
| 6785 | fn | resolvePeriodRowField | (private) | `function resolvePeriodRowField(containerSelecto...` |
| 6813 | fn | resolveStorageFieldForProxy | (private) | `function resolveStorageFieldForProxy(selector) {` |
| 6952 | fn | updateProjectDialogLayoutState | (private) | `function updateProjectDialogLayoutState(step) {` |
| 6965 | fn | renderProjectRequirementsInteraction | (private) | `function renderProjectRequirementsInteraction(r...` |
| 7009 | fn | resolveLabelText | (private) | `const resolveLabelText = (options, target) => {` |
| 7053 | fn | resolvePlaceholderText | (private) | `const resolvePlaceholderText = (options, target...` |
| 7063 | fn | copySelectOptions | (private) | `const copySelectOptions = (source, destination)...` |
| 7092 | fn | createProxyField | (private) | `const createProxyField = (options) => {` |
| 7152 | fn | syncFromTarget | (private) | `const syncFromTarget = () => {` |
| 7180 | fn | syncToTarget | (private) | `const syncToTarget = () => {` |
| 7256 | fn | handleInlineBack | (private) | - |
| 7274 | fn | handleInlineNext | (private) | - |
| 7294 | fn | focusRunner | (private) | `const focusRunner = () => {` |
| 7322 | fn | renderStepInteraction | (private) | `function renderStepInteraction(step) {` |
| 7337 | fn | registerCleanup | (private) | - |
| 7343 | fn | customRendered | (private) | `const customRendered = (() => {` |
| 7383 | fn | handleStepListClick | (private) | `function handleStepListClick(event) {` |
| 7404 | fn | moveSkipButtonToActions | (private) | `function moveSkipButtonToActions() {` |
| 7416 | fn | moveSkipButtonToHeader | (private) | `function moveSkipButtonToHeader() {` |
| 7427 | fn | updateCardForStep | (private) | `function updateCardForStep(step, index) {` |
| 7529 | fn | updateProgressMeter | (private) | `function updateProgressMeter(step, index) {` |
| 7565 | fn | showStep | (private) | `function showStep(index) {` |
| 7674 | fn | goToNextStep | (private) | `function goToNextStep() {` |
| 7689 | fn | goToPreviousStep | (private) | `function goToPreviousStep() {` |
| 7697 | fn | recordStepCompletion | (private) | `function recordStepCompletion(stepKey) {` |
| 7723 | fn | handleSkipTutorial | (private) | `function handleSkipTutorial(event) {` |
| 7768 | fn | skipTutorial | (private) | `function skipTutorial() {` |
| 7786 | fn | completeTutorial | (private) | `function completeTutorial() {` |
| 7810 | fn | handleOverlayKeydown | (private) | `function handleOverlayKeydown(event) {` |
| 7838 | fn | pushUnique | (private) | - |
| 7887 | fn | attachGlobalListeners | (private) | `function attachGlobalListeners() {` |
| 7924 | fn | detachGlobalListeners | (private) | `function detachGlobalListeners() {` |
| 7946 | fn | startTutorial | (private) | `function startTutorial(options = {}) {` |
| 8010 | fn | endTutorial | (private) | `function endTutorial() {` |
| 8028 | fn | handleLanguageChange | (private) | `function handleLanguageChange() {` |
| 8037 | fn | invalidateHelpButtonsCache | (private) | `function invalidateHelpButtonsCache() {` |
| 8041 | fn | nodeContainsHelpTrigger | (private) | `function nodeContainsHelpTrigger(node) {` |
| 8061 | fn | handleHelpButtonMutations | (private) | `function handleHelpButtonMutations(mutations) {` |
| 8096 | fn | ensureHelpButtonObserver | (private) | `function ensureHelpButtonObserver() {` |
| 8118 | fn | matchesHelpTrigger | (private) | `function matchesHelpTrigger(node) {` |
| 8134 | fn | resolveHelpTrigger | (private) | `function resolveHelpTrigger(node) {` |
| 8148 | fn | collectHelpButtons | (private) | `function collectHelpButtons(forceRefresh = fals...` |
| 8206 | fn | resolveHelpStatusElement | (private) | `function resolveHelpStatusElement() {` |
| 8218 | fn | resolveStepTitle | (private) | `function resolveStepTitle(stepKey) {` |
| 8229 | fn | formatTimeAgo | (private) | `function formatTimeAgo(timestamp) {` |
| 8268 | fn | formatProgressUpdate | (private) | `function formatProgressUpdate(stepTitle, timest...` |
| 8283 | fn | applyHelpStatus | (private) | `function applyHelpStatus(state, steps) {` |
| 8389 | fn | applyHelpButtonLabel | (private) | `function applyHelpButtonLabel() {` |
| 8453 | fn | handleHelpButtonClick | (private) | `function handleHelpButtonClick(event) {` |
| 8457 | fn | startFromHelp | (private) | `const startFromHelp = () => {` |
| 8506 | fn | attachHelpButton | (private) | `function attachHelpButton() {` |
| 8527 | fn | shouldAutoStart | (private) | `function shouldAutoStart() {` |
| 8564 | fn | scheduleAutoStart | (private) | `function scheduleAutoStart() {` |
| 8578 | fn | init | (private) | `function init() {` |
| 8593 | fn | handleFactoryReset | (private) | `function handleFactoryReset() {` |
| 8607 | fn | attachFactoryResetListeners | (private) | `function attachFactoryResetListeners() {` |

