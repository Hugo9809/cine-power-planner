# src/scripts/modules/features/auto-gear-rules.js

[← Back to Module](../modules/src-scripts-modules-features/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 2978
- **Language:** JavaScript
- **Symbols:** 87
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 19 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 39 | fn | logMissingAutoGearHelper | (private) | `function logMissingAutoGearHelper(name, error) {` |
| 53 | fn | resolveAutoGearUiExports | (private) | `function resolveAutoGearUiExports() {` |
| 83 | fn | resolveAutoGearHelperFunction | (private) | `function resolveAutoGearHelperFunction(name) {` |
| 101 | fn | ensureFallbackAutoGearHelper | (private) | `function ensureFallbackAutoGearHelper(name, imp...` |
| 109 | fn | existing | (private) | `const existing = (() => {` |
| 160 | fn | fallbackNormalizeVideoDistributionOptionValue | (private) | `function fallbackNormalizeVideoDistributionOpti...` |
| 180 | fn | getFallbackViewfinderLabel | (private) | `function getFallbackViewfinderLabel(value) {` |
| 196 | fn | getFallbackVideoDistributionLabel | (private) | `function getFallbackVideoDistributionLabel(valu...` |
| 208 | fn | invokeAutoGearLabelHelper | (private) | `function invokeAutoGearLabelHelper(name, fallba...` |
| 221 | fn | getFallbackMatteboxLabel | (private) | `function getFallbackMatteboxLabel(value) {` |
| 233 | fn | getSafeMatteboxFallbackLabel | (private) | `function getSafeMatteboxFallbackLabel(value) {` |
| 243 | fn | fallbackNormalizeMatteboxOptionValue | (private) | `function fallbackNormalizeMatteboxOptionValue(v...` |
| 263 | fn | normalizeMatteboxOption | (private) | `function normalizeMatteboxOption(value) {` |
| 276 | fn | normalizeVideoDistributionOption | (private) | `function normalizeVideoDistributionOption(value) {` |
| 303 | fn | getSafeViewfinderFallbackLabel | (private) | `function getSafeViewfinderFallbackLabel(value) {` |
| 307 | fn | getSafeVideoDistributionFallbackLabel | (private) | `function getSafeVideoDistributionFallbackLabel(...` |
| 315 | fn | createModuleBaseFallback | (private) | `function createModuleBaseFallback(scope) {` |
| 345 | fn | notifyListeners | (private) | `const notifyListeners = (name, api) => {` |
| 371 | fn | storeModule | (private) | `const storeModule = (name, api) => {` |
| 380 | fn | getStoredModule | (private) | - |
| 392 | fn | whenModuleAvailable | (private) | `const whenModuleAvailable = (name, handler) => {` |
| 415 | fn | ensureModuleGlobals | (private) | `const ensureModuleGlobals = () => {` |
| 462 | fn | ensureModuleRegistry | (private) | `const ensureModuleRegistry = () => {` |
| 599 | fn | moduleJsonDeepClone | (private) | `function moduleJsonDeepClone(value) {` |
| 613 | fn | moduleResolveStructuredClone | (private) | `function moduleResolveStructuredClone(scope) {` |
| 651 | fn | moduleCreateResilientDeepClone | (private) | `function moduleCreateResilientDeepClone(scope) {` |
| 684 | fn | resolveModuleBase | (private) | `function resolveModuleBase(scope) {` |
| 721 | fn | freeze | (private) | `function freeze(target) {` |
| 790 | fn | fallbackCollectCandidateScopes | (private) | `function fallbackCollectCandidateScopes(primary) {` |
| 793 | fn | push | (private) | `function push(scope) {` |
| 829 | fn | addCandidate | (private) | `function addCandidate(fn, scope) {` |
| 869 | fn | tryStructuredCloneValue | (private) | `function tryStructuredCloneValue(value) {` |
| 900 | fn | cloneWithStructuredCloneFallback | (private) | `function cloneWithStructuredCloneFallback(value) {` |
| 938 | fn | cloneAutoGearItems | (private) | `function cloneAutoGearItems(items) {` |
| 948 | fn | cloneAutoGearRuleItem | (private) | `function cloneAutoGearRuleItem(item) {` |
| 978 | fn | cloneAutoGearRule | (private) | `function cloneAutoGearRule(rule) {` |
| 1011 | fn | cloneAutoGearRules | (private) | `function cloneAutoGearRules(rules) {` |
| 1017 | fn | setFactoryAutoGearRulesSnapshot | (private) | `function setFactoryAutoGearRulesSnapshot(rules) {` |
| 1025 | fn | subtractScenarioContributions | (private) | `function subtractScenarioContributions(diff, sc...` |
| 1026 | fn | adjust | (private) | `const adjust = (items, type) => items` |
| 1047 | fn | extractAutoGearSelections | (private) | `function extractAutoGearSelections(value) {` |
| 1055 | fn | buildCameraHandleAutoRules | (private) | `function buildCameraHandleAutoRules(baseInfo, b...` |
| 1132 | fn | buildViewfinderExtensionAutoRules | (private) | `function buildViewfinderExtensionAutoRules(base...` |
| 1176 | fn | buildBatteryAutoRules | (private) | `function buildBatteryAutoRules(baseInfo, baseli...` |
| 1228 | fn | buildDistanceAutoRules | (private) | `function buildDistanceAutoRules(baseInfo, basel...` |
| 1280 | fn | buildHotswapAutoRules | (private) | `function buildHotswapAutoRules(baseInfo, baseli...` |
| 1332 | fn | buildBatteryPlateAutoRules | (private) | `function buildBatteryPlateAutoRules(baseInfo, b...` |
| 1384 | fn | buildCageAutoRules | (private) | `function buildCageAutoRules(baseInfo, baselineM...` |
| 1440 | fn | buildTripodAutoGearRules | (private) | `function buildTripodAutoGearRules(baseInfo, bas...` |
| 1526 | fn | buildTripodPreferenceAutoGearRules | (private) | `function buildTripodPreferenceAutoGearRules(bas...` |
| 1601 | fn | buildVideoDistributionAutoRules | (private) | `function buildVideoDistributionAutoRules(baseIn...` |
| 1647 | fn | buildOnboardMonitorRiggingAutoGearRules | (private) | `function buildOnboardMonitorRiggingAutoGearRule...` |
| 1715 | fn | createArriViewfinderBracketItem | (private) | `function createArriViewfinderBracketItem(contex...` |
| 1736 | fn | collectArriCameraNames | (private) | `function collectArriCameraNames() {` |
| 1753 | fn | createArriBracketRule | (private) | `function createArriBracketRule(options) {` |
| 1795 | fn | buildArriViewfinderBracketRules | (private) | `function buildArriViewfinderBracketRules(baseIn...` |
| 1842 | fn | buildDefaultVideoDistributionRules | (private) | `function buildDefaultVideoDistributionRules(bas...` |
| 1913 | fn | createItem | (private) | `const createItem = (name, category, quantity = ...` |
| 1945 | fn | pushSupport | (private) | `const pushSupport = (name, category, quantity =...` |
| 1973 | fn | buildDefaultMatteboxAutoGearRules | (private) | `function buildDefaultMatteboxAutoGearRules() {` |
| 1977 | fn | buildMatteboxAutoGearRules | (private) | `function buildMatteboxAutoGearRules(baseInfo = ...` |
| 2041 | fn | resolveHandUnitCompatibilityMaps | (private) | `function resolveHandUnitCompatibilityMaps() {` |
| 2074 | fn | getHandUnitGroupForMotor | (private) | `function getHandUnitGroupForMotor(motorName) {` |
| 2096 | fn | collectAllWirelessTransmitterNames | (private) | `function collectAllWirelessTransmitterNames() {` |
| 2114 | fn | buildMotorHandUnitAutoGearRules | (private) | `function buildMotorHandUnitAutoGearRules(baseIn...` |
| 2222 | fn | buildAutoGearAnyMotorRule | (private) | `function buildAutoGearAnyMotorRule() {` |
| 2230 | fn | createItem | (private) | `const createItem = (name, category, quantity = ...` |
| 2246 | fn | pushItem | (private) | `const pushItem = (name, category, quantity = 1)...` |
| 2283 | fn | buildAlwaysAutoGearRule | (private) | `function buildAlwaysAutoGearRule() {` |
| 2284 | fn | createItem | (private) | `const createItem = (name, category, quantity = ...` |
| 2299 | fn | pushItem | (private) | `const pushItem = (name, category, quantity, opt...` |
| 2353 | fn | buildFiveDayConsumablesAutoGearRule | (private) | `function buildFiveDayConsumablesAutoGearRule() {` |
| 2354 | fn | createItem | (private) | `const createItem = (name, category, quantity = ...` |
| 2370 | fn | pushItem | (private) | `const pushItem = (name, category, quantity, opt...` |
| 2407 | fn | ensureDefaultMatteboxAutoGearRules | (private) | `function ensureDefaultMatteboxAutoGearRules() {` |
| 2427 | fn | captureSetupSelectValues | (private) | `function captureSetupSelectValues() {` |
| 2428 | fn | captureList | (private) | - |
| 2448 | fn | finalizeCapturedSetupValues | (private) | `function finalizeCapturedSetupValues(values) {` |
| 2456 | fn | applySetupSelectValues | (private) | `function applySetupSelectValues(values) {` |
| 2491 | fn | captureAutoGearSeedContext | (private) | `function captureAutoGearSeedContext() {` |
| 2511 | fn | buildAutoGearRulesFromBaseInfo | (private) | `function buildAutoGearRulesFromBaseInfo(baseInf...` |
| 2614 | fn | appendUniqueRules | (private) | - |
| 2656 | fn | computeFactoryAutoGearRules | (private) | `function computeFactoryAutoGearRules() {` |
| 2708 | fn | seedAutoGearRulesFromCurrentProject | (private) | `function seedAutoGearRulesFromCurrentProject() {` |
| 2756 | fn | resetAutoGearRulesToFactoryAdditions | (private) | `function resetAutoGearRulesToFactoryAdditions() {` |
| 2763 | fn | performReset | (private) | `const performReset = () => {` |

