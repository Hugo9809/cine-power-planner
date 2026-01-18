# src/scripts/auto-gear/normalizers.js

[← Back to Module](../modules/src-scripts-auto-gear/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 1781
- **Language:** JavaScript
- **Symbols:** 57
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 98 | fn | resolveAutoGearDefaultLanguageSource | (private) | `function resolveAutoGearDefaultLanguageSource() {` |
| 126 | fn | getAutoGearFallbackLanguage | (private) | `function getAutoGearFallbackLanguage() {` |
| 138 | fn | assignAutoGearLanguageFallback | (private) | `function assignAutoGearLanguageFallback(scope, ...` |
| 165 | fn | ensureAutoGearDefaultLanguageGlobals | (private) | `function ensureAutoGearDefaultLanguageGlobals() {` |
| 185 | fn | getAutoGearFallbackTexts | (private) | `function getAutoGearFallbackTexts() {` |
| 208 | fn | ensureAutoGearSelectorTypeGlobals | (private) | `function ensureAutoGearSelectorTypeGlobals(scop...` |
| 251 | fn | generateAutoGearId | (private) | `function generateAutoGearId(prefix) {` |
| 267 | fn | normalizeAutoGearQuantity | (private) | `function normalizeAutoGearQuantity(value) {` |
| 282 | fn | parseAutoGearDraftNames | (private) | `function parseAutoGearDraftNames(value) {` |
| 320 | fn | normalizeAutoGearText | (private) | `function normalizeAutoGearText(value, _a) {` |
| 340 | fn | normalizeAutoGearSelectorType | (private) | `function normalizeAutoGearSelectorType(value) {` |
| 361 | fn | normalizeAutoGearSelectorDefault | (private) | `function normalizeAutoGearSelectorDefault(type,...` |
| 377 | fn | normalizeAutoGearMonitorDefaults | (private) | `function normalizeAutoGearMonitorDefaults(value) {` |
| 394 | fn | resolveDevicesSnapshot | (private) | `function resolveDevicesSnapshot() {` |
| 408 | fn | updateGlobalDevicesReference | (private) | `function updateGlobalDevicesReference(nextDevic...` |
| 516 | fn | resolveAutoGearCoreShared | (private) | `function resolveAutoGearCoreShared() {` |
| 538 | fn | resolveTripodPreferenceSelect | (private) | `function resolveTripodPreferenceSelect(type) {` |
| 546 | fn | collectTripodPreferenceOptions | (private) | `function collectTripodPreferenceOptions(type) {` |
| 571 | fn | getAutoGearSelectorOptions | (private) | `function getAutoGearSelectorOptions(type, itemO...` |
| 645 | fn | getAutoGearSelectorLabel | (private) | `function getAutoGearSelectorLabel(type) {` |
| 688 | fn | getAutoGearSelectorScrollHint | (private) | `function getAutoGearSelectorScrollHint() {` |
| 695 | fn | getAutoGearSelectorDefaultPlaceholder | (private) | `function getAutoGearSelectorDefaultPlaceholder() {` |
| 702 | fn | getAutoGearMonitorDefaultPlaceholder | (private) | `function getAutoGearMonitorDefaultPlaceholder() {` |
| 709 | fn | formatAutoGearSelectorValue | (private) | `function formatAutoGearSelectorValue(type, valu...` |
| 727 | fn | populateAutoGearCategorySelect | (private) | `function populateAutoGearCategorySelect(select,...` |
| 753 | fn | formatAutoGearOwnGearLabel | (private) | `function formatAutoGearOwnGearLabel(item) {` |
| 765 | fn | refreshAutoGearOwnGearConditionOptions | (private) | `function refreshAutoGearOwnGearConditionOptions...` |
| 838 | fn | updateAutoGearOwnGearOptions | (private) | `function updateAutoGearOwnGearOptions() {` |
| 889 | fn | isAutoGearMonitoringCategory | (private) | `function isAutoGearMonitoringCategory(value) {` |
| 894 | fn | isMonitoringCategorySelected | (private) | `function isMonitoringCategorySelected(select) {` |
| 912 | fn | matchesTripodCategory | (private) | `function matchesTripodCategory(value) {` |
| 922 | fn | isTripodCategorySelected | (private) | `function isTripodCategorySelected(select) {` |
| 937 | fn | setAutoGearFieldVisibility | (private) | `function setAutoGearFieldVisibility(field, isVi...` |
| 968 | fn | updateAutoGearMonitorFieldGroup | (private) | `function updateAutoGearMonitorFieldGroup(group) {` |
| 993 | fn | extractAutoGearContextNotes | (private) | `function extractAutoGearContextNotes(name) {` |
| 1014 | fn | normalizeAutoGearItem | (private) | `function normalizeAutoGearItem(entry) {` |
| 1091 | fn | normalizeAutoGearTriggerList | (private) | `function normalizeAutoGearTriggerList(values) {` |
| 1099 | fn | normalizeAutoGearScenarioLogic | (private) | `function normalizeAutoGearScenarioLogic(value) {` |
| 1137 | fn | normalizeAutoGearConditionLogic | (private) | `function normalizeAutoGearConditionLogic(value) {` |
| 1163 | fn | readAutoGearConditionLogic | (private) | `function readAutoGearConditionLogic(rule, key) {` |
| 1182 | fn | normalizeAutoGearScenarioMultiplier | (private) | `function normalizeAutoGearScenarioMultiplier(va...` |
| 1186 | fn | normalizeAutoGearScenarioPrimary | (private) | `function normalizeAutoGearScenarioPrimary(value) {` |
| 1189 | fn | normalizeVideoDistributionTriggerList | (private) | `function normalizeVideoDistributionTriggerList(...` |
| 1207 | fn | normalizeAutoGearTriggerValue | (private) | `function normalizeAutoGearTriggerValue(value) {` |
| 1210 | fn | autoGearRuleMatteboxKey | (private) | `function autoGearRuleMatteboxKey(rule) {` |
| 1223 | fn | normalizeAutoGearShootingDayMode | (private) | `function normalizeAutoGearShootingDayMode(value) {` |
| 1239 | fn | normalizeAutoGearShootingDayValue | (private) | `function normalizeAutoGearShootingDayValue(valu...` |
| 1255 | fn | normalizeAutoGearShootingDaysList | (private) | `function normalizeAutoGearShootingDaysList(valu...` |
| 1267 | fn | normalizeAutoGearShootingDaysCondition | (private) | `function normalizeAutoGearShootingDaysCondition...` |
| 1296 | fn | normalizeAutoGearRule | (private) | `function normalizeAutoGearRule(rule) {` |
| 1528 | fn | autoGearItemSnapshot | (private) | `function autoGearItemSnapshot(item) {` |
| 1558 | fn | autoGearItemSortKey | (private) | `function autoGearItemSortKey(item) {` |
| 1572 | fn | snapshotAutoGearRuleForFingerprint | (private) | `function snapshotAutoGearRuleForFingerprint(rul...` |
| 1632 | fn | autoGearRuleSortKey | (private) | `function autoGearRuleSortKey(rule) {` |
| 1681 | fn | createAutoGearRulesFingerprint | (private) | `function createAutoGearRulesFingerprint(rules) {` |
| 1688 | fn | normalizeAutoGearPreset | (private) | `function normalizeAutoGearPreset(entry) {` |
| 1700 | fn | normalizeAutoGearBackupEntry | (private) | `function normalizeAutoGearBackupEntry(entry) {` |

