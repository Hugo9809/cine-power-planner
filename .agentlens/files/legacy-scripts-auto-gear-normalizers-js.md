# legacy/scripts/auto-gear/normalizers.js

[← Back to Module](../modules/legacy-scripts-auto-gear/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 1520
- **Language:** JavaScript
- **Symbols:** 58
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 1 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 3 | fn | resolveAutoGearDefaultLanguageSource | (private) | `function resolveAutoGearDefaultLanguageSource() {` |
| 20 | fn | getAutoGearFallbackLanguage | (private) | `function getAutoGearFallbackLanguage() {` |
| 30 | fn | assignAutoGearLanguageFallback | (private) | `function assignAutoGearLanguageFallback(scope, ...` |
| 54 | fn | ensureAutoGearDefaultLanguageGlobals | (private) | `function ensureAutoGearDefaultLanguageGlobals() {` |
| 66 | fn | getAutoGearFallbackTexts | (private) | `function getAutoGearFallbackTexts() {` |
| 79 | fn | ensureAutoGearSelectorTypeGlobals | (private) | `function ensureAutoGearSelectorTypeGlobals(scop...` |
| 103 | fn | generateAutoGearId | (private) | `function generateAutoGearId(prefix) {` |
| 110 | fn | normalizeAutoGearQuantity | (private) | `function normalizeAutoGearQuantity(value) {` |
| 114 | fn | parseAutoGearDraftNames | (private) | `function parseAutoGearDraftNames(value) {` |
| 143 | fn | normalizeAutoGearText | (private) | `function normalizeAutoGearText(value, _a) {` |
| 155 | fn | normalizeAutoGearSelectorType | (private) | `function normalizeAutoGearSelectorType(value) {` |
| 163 | fn | normalizeAutoGearSelectorDefault | (private) | `function normalizeAutoGearSelectorDefault(type,...` |
| 181 | fn | normalizeAutoGearMonitorDefaults | (private) | `function normalizeAutoGearMonitorDefaults(value) {` |
| 198 | fn | resolveDevicesSnapshot | (private) | `function resolveDevicesSnapshot() {` |
| 211 | fn | updateGlobalDevicesReference | (private) | `function updateGlobalDevicesReference(nextDevic...` |
| 303 | fn | resolveAutoGearCoreShared | (private) | `function resolveAutoGearCoreShared() {` |
| 317 | fn | resolveTripodPreferenceSelect | (private) | `function resolveTripodPreferenceSelect(type) {` |
| 323 | fn | collectTripodPreferenceOptions | (private) | `function collectTripodPreferenceOptions(type) {` |
| 346 | fn | getAutoGearSelectorOptions | (private) | `function getAutoGearSelectorOptions(type, itemO...` |
| 412 | fn | getAutoGearSelectorLabel | (private) | `function getAutoGearSelectorLabel(type) {` |
| 439 | fn | getAutoGearSelectorScrollHint | (private) | `function getAutoGearSelectorScrollHint() {` |
| 444 | fn | getAutoGearSelectorDefaultPlaceholder | (private) | `function getAutoGearSelectorDefaultPlaceholder() {` |
| 449 | fn | getAutoGearMonitorDefaultPlaceholder | (private) | `function getAutoGearMonitorDefaultPlaceholder() {` |
| 454 | fn | formatAutoGearSelectorValue | (private) | `function formatAutoGearSelectorValue(type, valu...` |
| 472 | fn | populateAutoGearCategorySelect | (private) | `function populateAutoGearCategorySelect(select,...` |
| 495 | fn | formatAutoGearOwnGearLabel | (private) | `function formatAutoGearOwnGearLabel(item) {` |
| 504 | fn | refreshAutoGearOwnGearConditionOptions | (private) | `function refreshAutoGearOwnGearConditionOptions...` |
| 580 | fn | updateAutoGearOwnGearOptions | (private) | `function updateAutoGearOwnGearOptions() {` |
| 618 | fn | isAutoGearMonitoringCategory | (private) | `function isAutoGearMonitoringCategory(value) {` |
| 622 | fn | isMonitoringCategorySelected | (private) | `function isMonitoringCategorySelected(select) {` |
| 638 | fn | matchesTripodCategory | (private) | `function matchesTripodCategory(value) {` |
| 645 | fn | isTripodCategorySelected | (private) | `function isTripodCategorySelected(select) {` |
| 656 | fn | setAutoGearFieldVisibility | (private) | `function setAutoGearFieldVisibility(field, isVi...` |
| 683 | fn | updateAutoGearMonitorFieldGroup | (private) | `function updateAutoGearMonitorFieldGroup(group) {` |
| 712 | fn | extractAutoGearContextNotes | (private) | `function extractAutoGearContextNotes(name) {` |
| 738 | fn | normalizeAutoGearItem | (private) | `function normalizeAutoGearItem(entry) {` |
| 806 | fn | normalizeAutoGearTriggerList | (private) | `function normalizeAutoGearTriggerList(values) {` |
| 813 | fn | normalizeAutoGearScenarioLogic | (private) | `function normalizeAutoGearScenarioLogic(value) {` |
| 846 | fn | normalizeAutoGearConditionLogic | (private) | `function normalizeAutoGearConditionLogic(value) {` |
| 867 | fn | readAutoGearConditionLogic | (private) | `function readAutoGearConditionLogic(rule, key) {` |
| 885 | fn | normalizeAutoGearScenarioMultiplier | (private) | `function normalizeAutoGearScenarioMultiplier(va...` |
| 889 | fn | normalizeAutoGearScenarioPrimary | (private) | `function normalizeAutoGearScenarioPrimary(value) {` |
| 892 | fn | normalizeVideoDistributionTriggerList | (private) | `function normalizeVideoDistributionTriggerList(...` |
| 906 | fn | normalizeAutoGearTriggerValue | (private) | `function normalizeAutoGearTriggerValue(value) {` |
| 909 | fn | autoGearRuleMatteboxKey | (private) | `function autoGearRuleMatteboxKey(rule) {` |
| 918 | fn | normalizeAutoGearShootingDayMode | (private) | `function normalizeAutoGearShootingDayMode(value) {` |
| 928 | fn | normalizeAutoGearShootingDayValue | (private) | `function normalizeAutoGearShootingDayValue(valu...` |
| 942 | fn | normalizeAutoGearShootingDaysList | (private) | `function normalizeAutoGearShootingDaysList(valu...` |
| 955 | fn | normalizeAutoGearShootingDaysCondition | (private) | `function normalizeAutoGearShootingDaysCondition...` |
| 989 | fn | normalizeAutoGearRule | (private) | `function normalizeAutoGearRule(rule) {` |
| 1223 | fn | autoGearItemSnapshot | (private) | `function autoGearItemSnapshot(item) {` |
| 1262 | fn | autoGearItemSortKey | (private) | `function autoGearItemSortKey(item) {` |
| 1276 | fn | snapshotAutoGearRuleForFingerprint | (private) | `function snapshotAutoGearRuleForFingerprint(rul...` |
| 1372 | fn | autoGearRuleSortKey | (private) | `function autoGearRuleSortKey(rule) {` |
| 1417 | fn | createAutoGearRulesFingerprint | (private) | `function createAutoGearRulesFingerprint(rules) {` |
| 1423 | fn | normalizeAutoGearPreset | (private) | `function normalizeAutoGearPreset(entry) {` |
| 1438 | fn | normalizeAutoGearBackupEntry | (private) | `function normalizeAutoGearBackupEntry(entry) {` |

