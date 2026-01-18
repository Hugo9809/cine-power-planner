# src/scripts/auto-gear/normalizers.ts

[← Back to Module](../modules/src-scripts-auto-gear/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 1804
- **Language:** TypeScript
- **Symbols:** 62
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 23 | fn | stableStringify | (private) | `const stableStringify = (() => {` |
| 95 | fn | resolveAutoGearDefaultLanguageSource | (private) | `function resolveAutoGearDefaultLanguageSource() {` |
| 132 | fn | getAutoGearFallbackLanguage | (private) | `function getAutoGearFallbackLanguage() {` |
| 149 | fn | assignAutoGearLanguageFallback | (private) | `function assignAutoGearLanguageFallback(scope, ...` |
| 152 | fn | assignIfMissing | (private) | `const assignIfMissing = (key: 'DEFAULT_LANGUAGE...` |
| 176 | fn | ensureAutoGearDefaultLanguageGlobals | (private) | `function ensureAutoGearDefaultLanguageGlobals() {` |
| 200 | fn | getAutoGearFallbackTexts | (private) | `function getAutoGearFallbackTexts() {` |
| 224 | fn | ensureAutoGearSelectorTypeGlobals | (private) | `function ensureAutoGearSelectorTypeGlobals(scop...` |
| 276 | fn | generateAutoGearId | (private) | `function generateAutoGearId(prefix) {` |
| 293 | fn | normalizeAutoGearQuantity | (private) | `function normalizeAutoGearQuantity(value) {` |
| 309 | fn | parseAutoGearDraftNames | (private) | `function parseAutoGearDraftNames(value) {` |
| 343 | fn | normalizeAutoGearText | (private) | `function normalizeAutoGearText(value, { collaps...` |
| 361 | fn | normalizeAutoGearSelectorType | (private) | `function normalizeAutoGearSelectorType(value) {` |
| 383 | fn | normalizeAutoGearSelectorDefault | (private) | `function normalizeAutoGearSelectorDefault(type,...` |
| 399 | fn | normalizeAutoGearMonitorDefaults | (private) | `function normalizeAutoGearMonitorDefaults(value) {` |
| 417 | fn | resolveDevicesSnapshot | (private) | `function resolveDevicesSnapshot() {` |
| 432 | fn | updateGlobalDevicesReference | (private) | `function updateGlobalDevicesReference(nextDevic...` |
| 441 | fn | enqueueScope | (private) | - |
| 551 | fn | resolveAutoGearCoreShared | (private) | `function resolveAutoGearCoreShared() {` |
| 577 | fn | resolveTripodPreferenceSelect | (private) | `function resolveTripodPreferenceSelect(type) {` |
| 584 | fn | collectTripodPreferenceOptions | (private) | `function collectTripodPreferenceOptions(type) {` |
| 605 | fn | getAutoGearSelectorOptions | (private) | `function getAutoGearSelectorOptions(type, itemO...` |
| 676 | fn | getAutoGearSelectorLabel | (private) | `function getAutoGearSelectorLabel(type) {` |
| 720 | fn | getAutoGearSelectorScrollHint | (private) | `function getAutoGearSelectorScrollHint() {` |
| 728 | fn | getAutoGearSelectorDefaultPlaceholder | (private) | `function getAutoGearSelectorDefaultPlaceholder() {` |
| 736 | fn | getAutoGearMonitorDefaultPlaceholder | (private) | `function getAutoGearMonitorDefaultPlaceholder() {` |
| 744 | fn | formatAutoGearSelectorValue | (private) | `function formatAutoGearSelectorValue(type, valu...` |
| 762 | fn | populateAutoGearCategorySelect | (private) | `function populateAutoGearCategorySelect(select,...` |
| 791 | fn | formatAutoGearOwnGearLabel | (private) | `function formatAutoGearOwnGearLabel(item) {` |
| 803 | fn | refreshAutoGearOwnGearConditionOptions | (private) | `function refreshAutoGearOwnGearConditionOptions...` |
| 819 | fn | appendOption | (private) | `const appendOption = (id, label, options = {}) ...` |
| 878 | fn | updateAutoGearOwnGearOptions | (private) | `function updateAutoGearOwnGearOptions() {` |
| 922 | fn | isAutoGearMonitoringCategory | (private) | `function isAutoGearMonitoringCategory(value) {` |
| 927 | fn | isMonitoringCategorySelected | (private) | `function isMonitoringCategorySelected(select) {` |
| 943 | fn | matchesTripodCategory | (private) | `function matchesTripodCategory(value) {` |
| 951 | fn | isTripodCategorySelected | (private) | `function isTripodCategorySelected(select) {` |
| 962 | fn | setAutoGearFieldVisibility | (private) | `function setAutoGearFieldVisibility(field, isVi...` |
| 990 | fn | updateAutoGearMonitorFieldGroup | (private) | `function updateAutoGearMonitorFieldGroup(group) {` |
| 1022 | fn | extractAutoGearContextNotes | (private) | `function extractAutoGearContextNotes(name) {` |
| 1043 | fn | normalizeAutoGearItem | (private) | `function normalizeAutoGearItem(entry) {` |
| 1118 | fn | normalizeAutoGearTriggerList | (private) | `function normalizeAutoGearTriggerList(values) {` |
| 1127 | fn | normalizeAutoGearScenarioLogic | (private) | `function normalizeAutoGearScenarioLogic(value) {` |
| 1162 | fn | normalizeAutoGearConditionLogic | (private) | `function normalizeAutoGearConditionLogic(value) {` |
| 1184 | fn | readAutoGearConditionLogic | (private) | `function readAutoGearConditionLogic(rule, key) {` |
| 1203 | fn | normalizeAutoGearScenarioMultiplier | (private) | `function normalizeAutoGearScenarioMultiplier(va...` |
| 1208 | fn | normalizeAutoGearScenarioPrimary | (private) | `function normalizeAutoGearScenarioPrimary(value) {` |
| 1212 | fn | normalizeVideoDistributionTriggerList | (private) | `function normalizeVideoDistributionTriggerList(...` |
| 1229 | fn | normalizeAutoGearTriggerValue | (private) | `function normalizeAutoGearTriggerValue(value) {` |
| 1233 | fn | autoGearRuleMatteboxKey | (private) | `function autoGearRuleMatteboxKey(rule) {` |
| 1246 | fn | normalizeAutoGearShootingDayMode | (private) | `function normalizeAutoGearShootingDayMode(value) {` |
| 1257 | fn | normalizeAutoGearShootingDayValue | (private) | `function normalizeAutoGearShootingDayValue(valu...` |
| 1272 | fn | normalizeAutoGearShootingDaysList | (private) | `function normalizeAutoGearShootingDaysList(valu...` |
| 1284 | fn | normalizeAutoGearShootingDaysCondition | (private) | `function normalizeAutoGearShootingDaysCondition...` |
| 1320 | fn | normalizeAutoGearRule | (private) | `function normalizeAutoGearRule(rule) {` |
| 1535 | fn | autoGearItemSnapshot | (private) | `function autoGearItemSnapshot(item) {` |
| 1577 | fn | autoGearItemSortKey | (private) | `function autoGearItemSortKey(item) {` |
| 1592 | fn | snapshotAutoGearRuleForFingerprint | (private) | `function snapshotAutoGearRuleForFingerprint(rul...` |
| 1595 | fn | mapItems | (private) | - |
| 1652 | fn | autoGearRuleSortKey | (private) | `function autoGearRuleSortKey(rule) {` |
| 1702 | fn | createAutoGearRulesFingerprint | (private) | `function createAutoGearRulesFingerprint(rules) {` |
| 1710 | fn | normalizeAutoGearPreset | (private) | `function normalizeAutoGearPreset(entry) {` |
| 1721 | fn | normalizeAutoGearBackupEntry | (private) | `function normalizeAutoGearBackupEntry(entry) {` |

