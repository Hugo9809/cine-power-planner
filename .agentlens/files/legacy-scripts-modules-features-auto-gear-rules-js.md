# legacy/scripts/modules/features/auto-gear-rules.js

[← Back to Module](../modules/legacy-scripts-modules-features/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 2663
- **Language:** JavaScript
- **Symbols:** 84
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 1 | fn | _slicedToArray | (private) | `function _slicedToArray(r, e) { return _arrayWi...` |
| 2 | fn | _nonIterableRest | (private) | `function _nonIterableRest() { throw new TypeErr...` |
| 3 | fn | _iterableToArrayLimit | (private) | `function _iterableToArrayLimit(r, l) { var t = ...` |
| 4 | fn | _arrayWithHoles | (private) | `function _arrayWithHoles(r) { if (Array.isArray...` |
| 5 | fn | _toConsumableArray | (private) | `function _toConsumableArray(r) { return _arrayW...` |
| 6 | fn | _nonIterableSpread | (private) | `function _nonIterableSpread() { throw new TypeE...` |
| 7 | fn | _unsupportedIterableToArray | (private) | `function _unsupportedIterableToArray(r, a) { if...` |
| 8 | fn | _iterableToArray | (private) | `function _iterableToArray(r) { if ("undefined" ...` |
| 9 | fn | _arrayWithoutHoles | (private) | `function _arrayWithoutHoles(r) { if (Array.isAr...` |
| 10 | fn | _arrayLikeToArray | (private) | `function _arrayLikeToArray(r, a) { (null == a |...` |
| 11 | fn | ownKeys | (private) | `function ownKeys(e, r) { var t = Object.keys(e)...` |
| 12 | fn | _objectSpread | (private) | `function _objectSpread(e) { for (var r = 1; r <...` |
| 13 | fn | _defineProperty | (private) | `function _defineProperty(e, r, t) { return (r =...` |
| 14 | fn | _toPropertyKey | (private) | `function _toPropertyKey(t) { var i = _toPrimiti...` |
| 15 | fn | _toPrimitive | (private) | `function _toPrimitive(t, r) { if ("object" != _...` |
| 16 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 18 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 35 | fn | logMissingAutoGearHelper | (private) | `function logMissingAutoGearHelper(name, error) {` |
| 48 | fn | resolveAutoGearUiExports | (private) | `function resolveAutoGearUiExports() {` |
| 61 | fn | resolveAutoGearHelperFunction | (private) | `function resolveAutoGearHelperFunction(name) {` |
| 75 | fn | ensureFallbackAutoGearHelper | (private) | `function ensureFallbackAutoGearHelper(name, imp...` |
| 120 | fn | fallbackNormalizeVideoDistributionOptionValue | (private) | `function fallbackNormalizeVideoDistributionOpti...` |
| 135 | fn | getFallbackViewfinderLabel | (private) | `function getFallbackViewfinderLabel(value) {` |
| 143 | fn | getFallbackVideoDistributionLabel | (private) | `function getFallbackVideoDistributionLabel(valu...` |
| 151 | fn | invokeAutoGearLabelHelper | (private) | `function invokeAutoGearLabelHelper(name, fallba...` |
| 163 | fn | getFallbackMatteboxLabel | (private) | `function getFallbackMatteboxLabel(value) {` |
| 171 | fn | getSafeMatteboxFallbackLabel | (private) | `function getSafeMatteboxFallbackLabel(value) {` |
| 175 | fn | fallbackNormalizeMatteboxOptionValue | (private) | `function fallbackNormalizeMatteboxOptionValue(v...` |
| 190 | fn | normalizeMatteboxOption | (private) | `function normalizeMatteboxOption(value) {` |
| 201 | fn | normalizeVideoDistributionOption | (private) | `function normalizeVideoDistributionOption(value) {` |
| 223 | fn | getSafeViewfinderFallbackLabel | (private) | `function getSafeViewfinderFallbackLabel(value) {` |
| 226 | fn | getSafeVideoDistributionFallbackLabel | (private) | `function getSafeVideoDistributionFallbackLabel(...` |
| 229 | fn | createModuleBaseFallback | (private) | `function createModuleBaseFallback(scope) {` |
| 471 | fn | moduleJsonDeepClone | (private) | `function moduleJsonDeepClone(value) {` |
| 482 | fn | moduleResolveStructuredClone | (private) | `function moduleResolveStructuredClone(scope) {` |
| 513 | fn | moduleCreateResilientDeepClone | (private) | `function moduleCreateResilientDeepClone(scope) {` |
| 531 | fn | resolveModuleBase | (private) | `function resolveModuleBase(scope) {` |
| 559 | fn | freeze | (private) | `function freeze(target) {` |
| 610 | fn | fallbackCollectCandidateScopes | (private) | `function fallbackCollectCandidateScopes(primary) {` |
| 612 | fn | push | (private) | `function push(scope) {` |
| 642 | fn | addCandidate | (private) | `function addCandidate(fn, scope) {` |
| 682 | fn | tryStructuredCloneValue | (private) | `function tryStructuredCloneValue(value) {` |
| 716 | fn | cloneWithStructuredCloneFallback | (private) | `function cloneWithStructuredCloneFallback(value) {` |
| 747 | fn | cloneAutoGearItems | (private) | `function cloneAutoGearItems(items) {` |
| 754 | fn | cloneAutoGearRuleItem | (private) | `function cloneAutoGearRuleItem(item) {` |
| 783 | fn | cloneAutoGearRule | (private) | `function cloneAutoGearRule(rule) {` |
| 811 | fn | cloneAutoGearRules | (private) | `function cloneAutoGearRules(rules) {` |
| 814 | fn | setFactoryAutoGearRulesSnapshot | (private) | `function setFactoryAutoGearRulesSnapshot(rules) {` |
| 821 | fn | subtractScenarioContributions | (private) | `function subtractScenarioContributions(diff, sc...` |
| 849 | fn | extractAutoGearSelections | (private) | `function extractAutoGearSelections(value) {` |
| 855 | fn | buildCameraHandleAutoRules | (private) | `function buildCameraHandleAutoRules(baseInfo, b...` |
| 925 | fn | buildViewfinderExtensionAutoRules | (private) | `function buildViewfinderExtensionAutoRules(base...` |
| 966 | fn | buildBatteryAutoRules | (private) | `function buildBatteryAutoRules(baseInfo, baseli...` |
| 1016 | fn | buildDistanceAutoRules | (private) | `function buildDistanceAutoRules(baseInfo, basel...` |
| 1066 | fn | buildHotswapAutoRules | (private) | `function buildHotswapAutoRules(baseInfo, baseli...` |
| 1116 | fn | buildBatteryPlateAutoRules | (private) | `function buildBatteryPlateAutoRules(baseInfo, b...` |
| 1166 | fn | buildCageAutoRules | (private) | `function buildCageAutoRules(baseInfo, baselineM...` |
| 1220 | fn | buildTripodAutoGearRules | (private) | `function buildTripodAutoGearRules(baseInfo, bas...` |
| 1314 | fn | buildTripodPreferenceAutoGearRules | (private) | `function buildTripodPreferenceAutoGearRules() {` |
| 1397 | fn | buildVideoDistributionAutoRules | (private) | `function buildVideoDistributionAutoRules(baseIn...` |
| 1440 | fn | buildOnboardMonitorRiggingAutoGearRules | (private) | `function buildOnboardMonitorRiggingAutoGearRule...` |
| 1491 | fn | createArriViewfinderBracketItem | (private) | `function createArriViewfinderBracketItem(contex...` |
| 1513 | fn | collectArriCameraNames | (private) | `function collectArriCameraNames() {` |
| 1529 | fn | createArriBracketRule | (private) | `function createArriBracketRule(options) {` |
| 1564 | fn | buildArriViewfinderBracketRules | (private) | `function buildArriViewfinderBracketRules() {` |
| 1604 | fn | buildDefaultVideoDistributionRules | (private) | `function buildDefaultVideoDistributionRules() {` |
| 1732 | fn | buildDefaultMatteboxAutoGearRules | (private) | `function buildDefaultMatteboxAutoGearRules() {` |
| 1735 | fn | buildMatteboxAutoGearRules | (private) | `function buildMatteboxAutoGearRules() {` |
| 1795 | fn | resolveHandUnitCompatibilityMaps | (private) | `function resolveHandUnitCompatibilityMaps() {` |
| 1823 | fn | getHandUnitGroupForMotor | (private) | `function getHandUnitGroupForMotor(motorName) {` |
| 1847 | fn | collectAllWirelessTransmitterNames | (private) | `function collectAllWirelessTransmitterNames() {` |
| 1864 | fn | buildMotorHandUnitAutoGearRules | (private) | `function buildMotorHandUnitAutoGearRules(baseIn...` |
| 1965 | fn | buildAutoGearAnyMotorRule | (private) | `function buildAutoGearAnyMotorRule() {` |
| 2022 | fn | buildAlwaysAutoGearRule | (private) | `function buildAlwaysAutoGearRule() {` |
| 2071 | fn | buildFiveDayConsumablesAutoGearRule | (private) | `function buildFiveDayConsumablesAutoGearRule() {` |
| 2129 | fn | ensureDefaultMatteboxAutoGearRules | (private) | `function ensureDefaultMatteboxAutoGearRules() {` |
| 2144 | fn | captureSetupSelectValues | (private) | `function captureSetupSelectValues() {` |
| 2166 | fn | finalizeCapturedSetupValues | (private) | `function finalizeCapturedSetupValues(values) {` |
| 2173 | fn | applySetupSelectValues | (private) | `function applySetupSelectValues(values) {` |
| 2207 | fn | captureAutoGearSeedContext | (private) | `function captureAutoGearSeedContext() {` |
| 2226 | fn | buildAutoGearRulesFromBaseInfo | (private) | `function buildAutoGearRulesFromBaseInfo(baseInf...` |
| 2397 | fn | computeFactoryAutoGearRules | (private) | `function computeFactoryAutoGearRules() {` |
| 2443 | fn | seedAutoGearRulesFromCurrentProject | (private) | `function seedAutoGearRulesFromCurrentProject() {` |
| 2480 | fn | resetAutoGearRulesToFactoryAdditions | (private) | `function resetAutoGearRulesToFactoryAdditions() {` |

