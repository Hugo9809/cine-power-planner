# legacy/scripts/modules/features/onboarding-tour.js

[← Back to Module](../modules/legacy-scripts-modules-features/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 7540
- **Language:** JavaScript
- **Symbols:** 198
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 1 | fn | _createForOfIteratorHelper | (private) | `function _createForOfIteratorHelper(r, e) { var...` |
| 2 | fn | _toConsumableArray | (private) | `function _toConsumableArray(r) { return _arrayW...` |
| 3 | fn | _nonIterableSpread | (private) | `function _nonIterableSpread() { throw new TypeE...` |
| 4 | fn | _unsupportedIterableToArray | (private) | `function _unsupportedIterableToArray(r, a) { if...` |
| 5 | fn | _iterableToArray | (private) | `function _iterableToArray(r) { if ("undefined" ...` |
| 6 | fn | _arrayWithoutHoles | (private) | `function _arrayWithoutHoles(r) { if (Array.isAr...` |
| 7 | fn | _arrayLikeToArray | (private) | `function _arrayLikeToArray(r, a) { (null == a |...` |
| 8 | fn | ownKeys | (private) | `function ownKeys(e, r) { var t = Object.keys(e)...` |
| 9 | fn | _objectSpread | (private) | `function _objectSpread(e) { for (var r = 1; r <...` |
| 10 | fn | _defineProperty | (private) | `function _defineProperty(e, r, t) { return (r =...` |
| 11 | fn | _toPropertyKey | (private) | `function _toPropertyKey(t) { var i = _toPrimiti...` |
| 12 | fn | _toPrimitive | (private) | `function _toPrimitive(t, r) { if ("object" != _...` |
| 13 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 15 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 31 | fn | resolveModuleBase | (private) | `function resolveModuleBase(scope) {` |
| 64 | fn | prefersReducedMotion | (private) | `function prefersReducedMotion() {` |
| 75 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(primary) {` |
| 99 | fn | resolveDocument | (private) | `function resolveDocument(scope) {` |
| 142 | fn | resolveHeroMarginPx | (private) | `function resolveHeroMarginPx(viewportWidth, roo...` |
| 174 | fn | isElementFocusable | (private) | `function isElementFocusable(element) {` |
| 197 | fn | collectFocusableElements | (private) | `function collectFocusableElements(root) {` |
| 218 | fn | sortFocusableByDocumentOrder | (private) | `function sortFocusableByDocumentOrder(elements) {` |
| 236 | fn | getRootFontSizePx | (private) | `function getRootFontSizePx() {` |
| 261 | fn | isDialogElement | (private) | `function isDialogElement(element) {` |
| 264 | fn | bringOverlayToTopLayer | (private) | `function bringOverlayToTopLayer() {` |
| 294 | fn | handleDialogToggle | (private) | `function handleDialogToggle(event) {` |
| 306 | fn | resolveStorage | (private) | `function resolveStorage() {` |
| 330 | fn | pushUniqueStorage | (private) | `function pushUniqueStorage(target, storage) {` |
| 352 | fn | collectStorageCandidates | (private) | `function collectStorageCandidates() {` |
| 389 | fn | readWindowNameSkipFlag | (private) | `function readWindowNameSkipFlag() {` |
| 399 | fn | writeWindowNameSkipFlag | (private) | `function writeWindowNameSkipFlag(skipped) {` |
| 421 | fn | readSkipStatusPreference | (private) | `function readSkipStatusPreference() {` |
| 456 | fn | persistSkipStatus | (private) | `function persistSkipStatus(skipped) {` |
| 494 | fn | sanitizeDeviceDescriptor | (private) | `function sanitizeDeviceDescriptor(detail) {` |
| 516 | fn | descriptorsMatch | (private) | `function descriptorsMatch(a, b) {` |
| 525 | fn | notifyDeviceLibrarySubscribers | (private) | `function notifyDeviceLibrarySubscribers() {` |
| 542 | fn | subscribeDeviceLibrary | (private) | `function subscribeDeviceLibrary(callback) {` |
| 581 | fn | clone | (private) | `function clone(value) {` |
| 592 | fn | resolveOwnGearAccessHighlightSelectors | (private) | `function resolveOwnGearAccessHighlightSelectors...` |
| 831 | fn | isPrefaceStep | (private) | `function isPrefaceStep(step) {` |
| 834 | fn | isCompletionStep | (private) | `function isCompletionStep(step) {` |
| 837 | fn | isCountableStep | (private) | `function isCountableStep(step) {` |
| 840 | fn | getCountableStepTotal | (private) | `function getCountableStepTotal(stepList) {` |
| 852 | fn | getCountableStepIndex | (private) | `function getCountableStepIndex(stepList, index) {` |
| 870 | fn | getCountableCompletedCount | (private) | `function getCountableCompletedCount(stepList, c...` |
| 883 | fn | getNextCountableStep | (private) | `function getNextCountableStep(stepList, complet...` |
| 898 | fn | getElement | (private) | `function getElement(selector) {` |
| 909 | fn | getFieldValue | (private) | `function getFieldValue(element) {` |
| 921 | fn | createFieldCompletionRequirement | (private) | `function createFieldCompletionRequirement(selec...` |
| 974 | fn | createClickCompletionRequirement | (private) | `function createClickCompletionRequirement(selec...` |
| 1041 | fn | createProjectDialogSubmitRequirement | (private) | `function createProjectDialogSubmitRequirement() {` |
| 1074 | fn | createDeviceLibraryRequirement | (private) | `function createDeviceLibraryRequirement(checker) {` |
| 1114 | fn | createDeviceLibraryAddRequirement | (private) | `function createDeviceLibraryAddRequirement() {` |
| 1119 | fn | createDeviceLibraryReviewRequirement | (private) | `function createDeviceLibraryReviewRequirement() {` |
| 1129 | fn | createDeviceLibraryEditRequirement | (private) | `function createDeviceLibraryEditRequirement() {` |
| 1141 | fn | evaluateOwnGearOpenState | (private) | `function evaluateOwnGearOpenState() {` |
| 1149 | fn | createOwnGearOpenRequirement | (private) | `function createOwnGearOpenRequirement() {` |
| 1213 | fn | createProjectRequirementsAccessRequirement | (private) | `function createProjectRequirementsAccessRequire...` |
| 1308 | fn | hasOwnGearListEntries | (private) | `function hasOwnGearListEntries() {` |
| 1322 | fn | createOwnGearItemRequirement | (private) | `function createOwnGearItemRequirement() {` |
| 1417 | fn | hasProjectCrewRows | (private) | `function hasProjectCrewRows() {` |
| 1434 | fn | createProjectCrewRequirement | (private) | `function createProjectCrewRequirement() {` |
| 1525 | fn | hasProjectLogisticsEntry | (private) | `function hasProjectLogisticsEntry() {` |
| 1568 | fn | createProjectLogisticsRequirement | (private) | `function createProjectLogisticsRequirement() {` |
| 1624 | fn | getProjectNameValue | (private) | `function getProjectNameValue() {` |
| 1628 | fn | hasSavedSetupForName | (private) | `function hasSavedSetupForName(name) {` |
| 1644 | fn | createSaveProjectRequirement | (private) | `function createSaveProjectRequirement() {` |
| 1731 | fn | getTimestamp | (private) | `function getTimestamp() {` |
| 1742 | fn | normalizeCompletedSteps | (private) | `function normalizeCompletedSteps(value, allowed...` |
| 1761 | fn | normalizeStateSnapshot | (private) | `function normalizeStateSnapshot(state) {` |
| 1808 | fn | updateStoredStateCache | (private) | `function updateStoredStateCache(nextState, rawV...` |
| 1813 | fn | createStorageEntry | (private) | `function createStorageEntry(serialized, key) {` |
| 1854 | fn | isBetterStorageEntry | (private) | `function isBetterStorageEntry(candidate, curren...` |
| 1873 | fn | loadStoredState | (private) | `function loadStoredState() {` |
| 1998 | fn | saveState | (private) | `function saveState(nextState) {` |
| 2041 | fn | refreshStoredState | (private) | `function refreshStoredState() {` |
| 2053 | fn | normalizeLanguageCandidate | (private) | `function normalizeLanguageCandidate(rawValue, a...` |
| 2075 | fn | resolveLanguage | (private) | `function resolveLanguage() {` |
| 2138 | fn | resolveTourTexts | (private) | `function resolveTourTexts() {` |
| 2176 | fn | resolveText | (private) | `function resolveText(key, defaultValue) {` |
| 2182 | fn | createStepConfig | (private) | `function createStepConfig() {` |
| 2366 | fn | getStepConfig | (private) | `function getStepConfig() {` |
| 2425 | fn | getProxyControlId | (private) | `function getProxyControlId(prefix) {` |
| 2429 | fn | setNextButtonDisabled | (private) | `function setNextButtonDisabled(disabled) {` |
| 2442 | fn | updateBaselineViewportHeight | (private) | `function updateBaselineViewportHeight(candidate...` |
| 2459 | fn | isTextInputElement | (private) | `function isTextInputElement(element) {` |
| 2500 | fn | teardownStepRequirement | (private) | `function teardownStepRequirement() {` |
| 2512 | fn | teardownStepInteraction | (private) | `function teardownStepInteraction() {` |
| 2528 | fn | teardownStepAutomation | (private) | `function teardownStepAutomation() {` |
| 2538 | fn | applyStepRequirement | (private) | `function applyStepRequirement(step) {` |
| 2584 | fn | applyStepAutomation | (private) | `function applyStepAutomation(step) {` |
| 2609 | fn | clearFrame | (private) | `function clearFrame() {` |
| 2620 | fn | clearScrollStateTimer | (private) | `function clearScrollStateTimer() {` |
| 2631 | fn | clearScrollState | (private) | `function clearScrollState() {` |
| 2637 | fn | markScrollActive | (private) | `function markScrollActive() {` |
| 2655 | fn | isOverlayScrollEvent | (private) | `function isOverlayScrollEvent(event) {` |
| 2698 | fn | handleGlobalScroll | (private) | `function handleGlobalScroll(event) {` |
| 2708 | fn | getOverlayMetrics | (private) | `function getOverlayMetrics() {` |
| 2766 | fn | updateHeroInlineSize | (private) | `function updateHeroInlineSize(size, metrics, fo...` |
| 2806 | fn | schedulePositionUpdate | (private) | `function schedulePositionUpdate() {` |
| 2823 | fn | handleVisualViewportChange | (private) | `function handleVisualViewportChange() {` |
| 2826 | fn | attachVisualViewportListeners | (private) | `function attachVisualViewportListeners() {` |
| 2838 | fn | detachVisualViewportListeners | (private) | `function detachVisualViewportListeners() {` |
| 2849 | fn | ensureOverlayElements | (private) | `function ensureOverlayElements() {` |
| 2955 | fn | teardownOverlayElements | (private) | `function teardownOverlayElements() {` |
| 2995 | fn | attachKeyboardListener | (private) | `function attachKeyboardListener() {` |
| 3002 | fn | detachKeyboardListener | (private) | `function detachKeyboardListener() {` |
| 3009 | fn | formatStepIndicator | (private) | `function formatStepIndicator(position, total) {` |
| 3016 | fn | formatPrefaceIndicator | (private) | `function formatPrefaceIndicator() {` |
| 3022 | fn | focusCard | (private) | `function focusCard() {` |
| 3056 | fn | toSelectorArray | (private) | `function toSelectorArray(value) {` |
| 3072 | fn | callSelectorResolver | (private) | `function callSelectorResolver(resolver, label) {` |
| 3083 | fn | resolveSelectorElements | (private) | `function resolveSelectorElements(selectors) {` |
| 3100 | fn | isHighlightElementUsable | (private) | `function isHighlightElementUsable(element) {` |
| 3144 | fn | filterUsableHighlightElements | (private) | `function filterUsableHighlightElements(elements) {` |
| 3160 | fn | ensureHighlightVisible | (private) | `function ensureHighlightVisible(step) {` |
| 3189 | fn | getHighlightElements | (private) | `function getHighlightElements(step) {` |
| 3228 | fn | resolveOverlayAnchorForElements | (private) | `function resolveOverlayAnchorForElements(elemen...` |
| 3259 | fn | setOverlayAnchorElement | (private) | `function setOverlayAnchorElement(anchorElement) {` |
| 3325 | fn | getTargetElement | (private) | `function getTargetElement(step) {` |
| 3335 | fn | clearActiveTargetElements | (private) | `function clearActiveTargetElements() {` |
| 3345 | fn | normalizeHighlightPaddingValue | (private) | `function normalizeHighlightPaddingValue(value, ...` |
| 3351 | fn | resolveStepHighlightPadding | (private) | `function resolveStepHighlightPadding(step) {` |
| 3381 | fn | updateHighlightPosition | (private) | `function updateHighlightPosition() {` |
| 3448 | fn | positionCard | (private) | `function positionCard(target, targetRect) {` |
| 3622 | fn | ensureSettingsForStep | (private) | `function ensureSettingsForStep(step) {` |
| 3671 | fn | ensureContactsForStep | (private) | `function ensureContactsForStep(step) {` |
| 3717 | fn | isContactsDialogVisible | (private) | `function isContactsDialogVisible() {` |
| 3730 | fn | closeContactsIfNeeded | (private) | `function closeContactsIfNeeded() {` |
| 3751 | fn | ensureHeroCardForStep | (private) | `function ensureHeroCardForStep(step) {` |
| 3760 | fn | ensureOwnGearForStep | (private) | `function ensureOwnGearForStep(step) {` |
| 3805 | fn | isOwnGearDialogVisible | (private) | `function isOwnGearDialogVisible() {` |
| 3818 | fn | closeOwnGearIfNeeded | (private) | `function closeOwnGearIfNeeded() {` |
| 3839 | fn | isProjectDialogVisible | (private) | `function isProjectDialogVisible() {` |
| 3857 | fn | ensureProjectDialogForStep | (private) | `function ensureProjectDialogForStep(step) {` |
| 3910 | fn | attachProjectDialogVisibilityMonitor | (private) | `function attachProjectDialogVisibilityMonitor() {` |
| 3959 | fn | detachProjectDialogVisibilityMonitor | (private) | `function detachProjectDialogVisibilityMonitor() {` |
| 3969 | fn | closeProjectDialogIfNeeded | (private) | `function closeProjectDialogIfNeeded() {` |
| 3991 | fn | isDeviceManagerVisible | (private) | `function isDeviceManagerVisible() {` |
| 4000 | fn | ensureDeviceManagerForStep | (private) | `function ensureDeviceManagerForStep(step) {` |
| 4050 | fn | closeDeviceManagerIfNeeded | (private) | `function closeDeviceManagerIfNeeded() {` |
| 4092 | fn | focusDeviceManagerNameField | (private) | `function focusDeviceManagerNameField() {` |
| 4145 | fn | attachDeviceManagerNameAutofill | (private) | `function attachDeviceManagerNameAutofill() {` |
| 4198 | fn | isSettingsDialogVisible | (private) | `function isSettingsDialogVisible() {` |
| 4211 | fn | closeSettingsIfNeeded | (private) | `function closeSettingsIfNeeded() {` |
| 4234 | fn | getStepTexts | (private) | `function getStepTexts(step) {` |
| 4250 | fn | updateResumeHint | (private) | `function updateResumeHint(index) {` |
| 4280 | fn | updateStepList | (private) | `function updateStepList(activeIndex) {` |
| 4341 | fn | focusHighlightedElement | (private) | `function focusHighlightedElement(step) {` |
| 4415 | fn | dispatchSyntheticEvent | (private) | `function dispatchSyntheticEvent(target, type) {` |
| 4435 | fn | applyLanguagePreference | (private) | `function applyLanguagePreference(value) {` |
| 4469 | fn | renderIntroInteraction | (private) | `function renderIntroInteraction(registerCleanup) {` |
| 4908 | fn | renderUserProfileInteraction | (private) | `function renderUserProfileInteraction(registerC...` |
| 5370 | fn | renderUnitsPreferencesInteraction | (private) | `function renderUnitsPreferencesInteraction(regi...` |
| 5844 | fn | resolveCrewRowForProxy | (private) | `function resolveCrewRowForProxy() {` |
| 5864 | fn | resolvePeriodRowField | (private) | `function resolvePeriodRowField(containerSelecto...` |
| 5891 | fn | resolveStorageFieldForProxy | (private) | `function resolveStorageFieldForProxy(selector) {` |
| 6014 | fn | updateProjectDialogLayoutState | (private) | `function updateProjectDialogLayoutState(step) {` |
| 6026 | fn | renderProjectRequirementsInteraction | (private) | `function renderProjectRequirementsInteraction(r...` |
| 6338 | fn | renderStepInteraction | (private) | `function renderStepInteraction(step) {` |
| 6388 | fn | handleStepListClick | (private) | `function handleStepListClick(event) {` |
| 6406 | fn | moveSkipButtonToActions | (private) | `function moveSkipButtonToActions() {` |
| 6417 | fn | moveSkipButtonToHeader | (private) | `function moveSkipButtonToHeader() {` |
| 6427 | fn | updateCardForStep | (private) | `function updateCardForStep(step, index) {` |
| 6511 | fn | updateProgressMeter | (private) | `function updateProgressMeter(step, index) {` |
| 6541 | fn | showStep | (private) | `function showStep(index) {` |
| 6636 | fn | goToNextStep | (private) | `function goToNextStep() {` |
| 6650 | fn | goToPreviousStep | (private) | `function goToPreviousStep() {` |
| 6657 | fn | recordStepCompletion | (private) | `function recordStepCompletion(stepKey) {` |
| 6678 | fn | handleSkipTutorial | (private) | `function handleSkipTutorial(event) {` |
| 6716 | fn | skipTutorial | (private) | `function skipTutorial() {` |
| 6732 | fn | completeTutorial | (private) | `function completeTutorial() {` |
| 6756 | fn | handleOverlayKeydown | (private) | `function handleOverlayKeydown(event) {` |
| 6831 | fn | attachGlobalListeners | (private) | `function attachGlobalListeners() {` |
| 6866 | fn | detachGlobalListeners | (private) | `function detachGlobalListeners() {` |
| 6887 | fn | startTutorial | (private) | `function startTutorial() {` |
| 6939 | fn | endTutorial | (private) | `function endTutorial() {` |
| 6956 | fn | handleLanguageChange | (private) | `function handleLanguageChange() {` |
| 6964 | fn | invalidateHelpButtonsCache | (private) | `function invalidateHelpButtonsCache() {` |
| 6967 | fn | nodeContainsHelpTrigger | (private) | `function nodeContainsHelpTrigger(node) {` |
| 6986 | fn | handleHelpButtonMutations | (private) | `function handleHelpButtonMutations(mutations) {` |
| 7020 | fn | ensureHelpButtonObserver | (private) | `function ensureHelpButtonObserver() {` |
| 7041 | fn | matchesHelpTrigger | (private) | `function matchesHelpTrigger(node) {` |
| 7053 | fn | resolveHelpTrigger | (private) | `function resolveHelpTrigger(node) {` |
| 7066 | fn | collectHelpButtons | (private) | `function collectHelpButtons() {` |
| 7115 | fn | resolveHelpStatusElement | (private) | `function resolveHelpStatusElement() {` |
| 7126 | fn | resolveStepTitle | (private) | `function resolveStepTitle(stepKey) {` |
| 7136 | fn | formatTimeAgo | (private) | `function formatTimeAgo(timestamp) {` |
| 7174 | fn | formatProgressUpdate | (private) | `function formatProgressUpdate(stepTitle, timest...` |
| 7186 | fn | applyHelpStatus | (private) | `function applyHelpStatus(state, steps) {` |
| 7273 | fn | applyHelpButtonLabel | (private) | `function applyHelpButtonLabel() {` |
| 7324 | fn | handleHelpButtonClick | (private) | `function handleHelpButtonClick(event) {` |
| 7365 | fn | attachHelpButton | (private) | `function attachHelpButton() {` |
| 7385 | fn | shouldAutoStart | (private) | `function shouldAutoStart() {` |
| 7418 | fn | scheduleAutoStart | (private) | `function scheduleAutoStart() {` |
| 7435 | fn | init | (private) | `function init() {` |
| 7450 | fn | handleFactoryReset | (private) | `function handleFactoryReset() {` |
| 7464 | fn | attachFactoryResetListeners | (private) | `function attachFactoryResetListeners() {` |

