# src/scripts/v2/project-detail.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 1334
- **Language:** JavaScript
- **Symbols:** 29
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 38 | fn | switchTab | (private) | `function switchTab(tabId) {` |
| 76 | fn | getCurrentTab | (private) | `function getCurrentTab() {` |
| 87 | fn | formatDate | (private) | `function formatDate(dateStr) {` |
| 105 | fn | formatDateRange | (private) | `function formatDateRange(rangeStr) {` |
| 118 | fn | _t | (private) | `function _t(path, params = {}) {` |
| 123 | fn | resolve | (private) | `const resolve = (obj, p) => p.split('.').reduce...` |
| 147 | fn | refreshProjectDataCache | (private) | `function refreshProjectDataCache() {` |
| 193 | fn | getProjectData | (private) | `function getProjectData(projectName) {` |
| 217 | fn | updateProjectStatus | (private) | `function updateProjectStatus(projectName, statu...` |
| 277 | fn | loadProject | (private) | `async function loadProject(projectName) {` |
| 367 | fn | getCurrentProject | (private) | `function getCurrentProject() {` |
| 378 | fn | goBack | (private) | `function goBack() {` |
| 391 | fn | createViewContainer | (private) | `function createViewContainer() {` |
| 409 | fn | createDetailViewContent | (private) | `function createDetailViewContent() {` |
| 554 | fn | renderCameraPackageTab | (private) | `function renderCameraPackageTab() {` |
| 633 | fn | reparentLegacyElements | (private) | `function reparentLegacyElements(view) {` |
| 699 | fn | renderPowerSummaryTab | (private) | `function renderPowerSummaryTab() {` |
| 770 | fn | bindDetailViewEvents | (private) | `function bindDetailViewEvents(view) {` |
| 824 | fn | openProjectRequirementsForm | (private) | `function openProjectRequirementsForm() {` |
| 995 | fn | renderV2Diagram | (private) | `function renderV2Diagram() {` |
| 1016 | fn | ensureDialogAccessible | (private) | `const ensureDialogAccessible = () => {` |
| 1067 | fn | updateStatusSelectStyle | (private) | `function updateStatusSelectStyle(selectElement) {` |
| 1085 | fn | syncLegacyResultsToV2 | (private) | `function syncLegacyResultsToV2() {` |
| 1116 | fn | setupPowerObserver | (private) | `function setupPowerObserver() {` |
| 1146 | fn | init | (private) | `function init() {` |
| 1178 | fn | handleViewChange | (private) | `async function handleViewChange(event) {` |
| 1228 | fn | slugify | (private) | `function slugify(text) {` |
| 1239 | fn | triggerLegacyAddCustom | (private) | `function triggerLegacyAddCustom(translationKey) {` |
| 1269 | fn | injectAddCustomButtons | (private) | `function injectAddCustomButtons(view) {` |

## Memory Markers

### 🟢 `NOTE` (line 552)

> We render *containers* for the legacy selects, not the selects themselves.

### 🟢 `NOTE` (line 903)

> generateGearListHtml uses the passed argument, but we should also ensure app state is consistent if possible.

### 🟢 `NOTE` (line 1117)

> We observe the results container, not a specific node.

### 🟢 `NOTE` (line 1192)

> createDetailViewContent() sets innerHTML directly, doesn't return a value

