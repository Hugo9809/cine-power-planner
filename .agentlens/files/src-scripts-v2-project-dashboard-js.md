# src/scripts/v2/project-dashboard.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 1708
- **Language:** JavaScript
- **Symbols:** 46
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 56 | fn | createDefaultDataProvider | (private) | `function createDefaultDataProvider() {` |
| 183 | fn | getDataProvider | (private) | `function getDataProvider() {` |
| 190 | fn | setDataProvider | (private) | `function setDataProvider(provider) {` |
| 197 | fn | createUiOnlyDataProvider | (private) | `function createUiOnlyDataProvider() {` |
| 218 | fn | escapeHtml | (private) | `function escapeHtml(str) {` |
| 231 | fn | formatDate | (private) | `function formatDate(dateStr) {` |
| 249 | fn | formatDateRange | (private) | `function formatDateRange(rangeStr) {` |
| 262 | fn | _t | (private) | `function _t(path, params = {}) {` |
| 268 | fn | resolve | (private) | `const resolve = (obj, p) => p.split('.').reduce...` |
| 299 | fn | refreshProjectDataCache | (private) | `async function refreshProjectDataCache() {` |
| 334 | fn | getProjectNames | (private) | `function getProjectNames() {` |
| 349 | fn | getFilteredProjects | (private) | `function getFilteredProjects() {` |
| 373 | fn | getProjectMetadata | (private) | `function getProjectMetadata(projectName) {` |
| 399 | fn | updateProjectMetadata | (private) | `function updateProjectMetadata(projectName, met...` |
| 425 | fn | createTileHtml | (private) | `function createTileHtml(projectName, index) {` |
| 513 | fn | createNewProjectTileHtml | (private) | `function createNewProjectTileHtml() {` |
| 536 | fn | createNoResultsHtml | (private) | `function createNoResultsHtml(query) {` |
| 575 | fn | renderProjectGrid | (private) | `async function renderProjectGrid(isInitial = fa...` |
| 599 | fn | _renderGridContent | (private) | `function _renderGridContent(container) {` |
| 692 | fn | bindSearchEvents | (private) | `function bindSearchEvents() {` |
| 705 | fn | bindTileEvents | (private) | `function bindTileEvents(container) {` |
| 767 | fn | showContextMenu | (private) | `function showContextMenu(e, projectName) {` |
| 872 | fn | closeContextMenu | (private) | `function closeContextMenu() {` |
| 881 | fn | bindEmptyStateEvents | (private) | `function bindEmptyStateEvents(container) {` |
| 895 | fn | openProject | (private) | `async function openProject(projectName, options...` |
| 923 | fn | createEmptyStateHtml | (private) | `function createEmptyStateHtml() {` |
| 962 | fn | deleteProject | (private) | `async function deleteProject(projectName) {` |
| 996 | fn | archiveProject | (private) | `function archiveProject(projectName) {` |
| 1004 | fn | duplicateProject | (private) | `function duplicateProject(projectName) {` |
| 1021 | fn | showProjectDialog | (private) | `function showProjectDialog(projectName = null) {` |
| 1028 | fn | showCreateProjectDialog | (private) | `function showCreateProjectDialog(existingProjec...` |
| 1054 | fn | parseRange | (private) | `const parseRange = (str, type, name) => {` |
| 1096 | fn | getColorVar | (private) | `const getColorVar = (c) => `var(--v2-color-${c})`;` |
| 1114 | fn | buildPeriodsHtml | (private) | `const buildPeriodsHtml = () => {` |
| 1301 | fn | updatePeriodData | (private) | `function updatePeriodData(periodId, field, valu...` |
| 1316 | fn | removePeriod | (private) | `function removePeriod(periodId) {` |
| 1321 | fn | addPeriod | (private) | `function addPeriod() {` |
| 1334 | fn | renderPeriods | (private) | `function renderPeriods() {` |
| 1339 | fn | bindPeriodEvents | (private) | `function bindPeriodEvents() {` |
| 1374 | fn | closeModal | (private) | `function closeModal() {` |
| 1379 | fn | handleCreate | (private) | `async function handleCreate() {` |
| 1415 | fn | formatPeriod | (private) | `const formatPeriod = (period) => {` |
| 1503 | fn | createProject | (private) | `async function createProject(projectName, metad...` |
| 1533 | fn | updateProjectRevision | (private) | `function updateProjectRevision() {` |
| 1550 | fn | createDashboardView | (private) | `function createDashboardView() {` |
| 1602 | fn | init | (private) | `function init(options = {}) {` |

