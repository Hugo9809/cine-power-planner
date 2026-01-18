# src/scripts/modules/features/connection-diagram.js

[← Back to Module](../modules/src-scripts-modules-features/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 2152
- **Language:** JavaScript
- **Symbols:** 88
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 4 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 22 | fn | resolveModuleBase | (private) | `function resolveModuleBase(scope) {` |
| 68 | fn | fallbackGetter | (private) | `function fallbackGetter(value, fallback) {` |
| 78 | fn | fallbackValue | (private) | `function fallbackValue(value, fallback) {` |
| 82 | fn | optionalFunction | (private) | `function optionalFunction(value) {` |
| 86 | fn | createConnectionDiagram | (private) | `function createConnectionDiagram(context = {}) {` |
| 202 | fn | ensureArray | (private) | - |
| 220 | fn | resolveSetupContainer | (private) | `const resolveSetupContainer = () => getSetupDia...` |
| 221 | fn | resolveDiagramLegend | (private) | `const resolveDiagramLegend = () => getDiagramLe...` |
| 222 | fn | resolveDiagramHint | (private) | `const resolveDiagramHint = () => getDiagramHint();` |
| 223 | fn | resolveDownloadButton | (private) | `const resolveDownloadButton = () => getDownload...` |
| 225 | fn | resolveZoomInButton | (private) | `const resolveZoomInButton = () => getZoomInBtn();` |
| 226 | fn | resolveZoomOutButton | (private) | `const resolveZoomOutButton = () => getZoomOutBt...` |
| 227 | fn | resolveResetButton | (private) | `const resolveResetButton = () => getResetViewBt...` |
| 228 | fn | resolveGridSnapToggle | (private) | `const resolveGridSnapToggle = () => getGridSnap...` |
| 231 | fn | resolveTexts | (private) | `const resolveTexts = () => {` |
| 234 | fn | resolveCurrentLang | (private) | `const resolveCurrentLang = () => {` |
| 237 | fn | resolveDevices | (private) | `const resolveDevices = () => {` |
| 240 | fn | resolveCameraSelect | (private) | `const resolveCameraSelect = () => getCameraSele...` |
| 241 | fn | resolveMonitorSelect | (private) | `const resolveMonitorSelect = () => getMonitorSe...` |
| 242 | fn | resolveVideoSelect | (private) | `const resolveVideoSelect = () => getVideoSelect();` |
| 243 | fn | resolveDistanceSelect | (private) | `const resolveDistanceSelect = () => getDistance...` |
| 244 | fn | resolveBatterySelect | (private) | `const resolveBatterySelect = () => getBatterySe...` |
| 245 | fn | resolveMotorSelects | (private) | `const resolveMotorSelects = () => ensureArray(g...` |
| 246 | fn | resolveControllerSelects | (private) | `const resolveControllerSelects = () => ensureAr...` |
| 247 | fn | escapeHtml | (private) | - |
| 257 | fn | sanitizeDomId | (private) | - |
| 265 | fn | buildPopupHeadingId | (private) | - |
| 270 | fn | resolveDeviceInfo | (private) | `const resolveDeviceInfo = (devicesObj, category...` |
| 291 | fn | popupClassForCategory | (private) | - |
| 303 | fn | isDetailDialogOpen | (private) | `const isDetailDialogOpen = () => Boolean(detail...` |
| 305 | fn | isSetupDiagramInView | (private) | `const isSetupDiagramInView = () => {` |
| 315 | fn | ensureDetailDialogElements | (private) | `function ensureDetailDialogElements() {` |
| 323 | fn | handleBackdropClick | (private) | - |
| 366 | fn | closeDetailDialog | (private) | `function closeDetailDialog() {` |
| 392 | fn | openDetailDialogWithEntry | (private) | `function openDetailDialogWithEntry(entry, posit...` |
| 544 | fn | getDiagramCss | (private) | `function getDiagramCss() {` |
| 549 | fn | safeIconGlyph | (private) | `const safeIconGlyph = (char, font) => {` |
| 717 | fn | addNode | (private) | `const addNode = (id, category, label) => {` |
| 790 | fn | wrapLabel | (private) | `function wrapLabel(text, maxLen = 16) {` |
| 823 | fn | getNodeHeight | (private) | - |
| 830 | fn | markUsed | (private) | `const markUsed = (id, side) => { usedConns[`${i...` |
| 831 | fn | isUsed | (private) | `const isUsed = (id, side) => usedConns[`${id}|$...` |
| 832 | fn | connectorPos | (private) | `const connectorPos = (id, side) => {` |
| 844 | fn | connectorsFor | (private) | - |
| 858 | fn | closestConnectorPair | (private) | `const closestConnectorPair = (idA, idB, used) => {` |
| 879 | fn | pushEdge | (private) | `const pushEdge = (edge, type) => {` |
| 1020 | fn | isMainCtrl | (private) | - |
| 1079 | fn | computePath | (private) | `function computePath(fromId, toId, labelSpacing...` |
| 1316 | fn | normalizeDiagramPositionsInput | (private) | `function normalizeDiagramPositionsInput(positio...` |
| 1331 | fn | getDiagramManualPositions | (private) | `function getDiagramManualPositions() {` |
| 1335 | fn | setManualDiagramPositions | (private) | `function setManualDiagramPositions(positions, o...` |
| 1351 | fn | enableDiagramInteractions | (private) | `function enableDiagramInteractions() {` |
| 1373 | fn | normaliseTargetElement | (private) | - |
| 1382 | fn | hidePopup | (private) | `const hidePopup = () => {` |
| 1409 | fn | clampScale | (private) | - |
| 1432 | fn | getPos | (private) | - |
| 1437 | fn | getMetrics | (private) | `const getMetrics = () => {` |
| 1452 | fn | convertPointerDeltaToView | (private) | `const convertPointerDeltaToView = (dxPx, dyPx) ...` |
| 1459 | fn | apply | (private) | `const apply = () => {` |
| 1463 | fn | zoomWithCenter | (private) | - |
| 1484 | fn | attachDiagramButtonListener | (private) | `const attachDiagramButtonListener = (resolver, ...` |
| 1503 | fn | onSvgMouseDown | (private) | - |
| 1512 | fn | onPanMove | (private) | - |
| 1521 | fn | stopPanning | (private) | `const stopPanning = () => {` |
| 1539 | fn | clearPendingDrag | (private) | `const clearPendingDrag = () => {` |
| 1546 | fn | startDragSession | (private) | `const startDragSession = () => {` |
| 1572 | fn | onDragStart | (private) | - |
| 1591 | fn | ensureDragSession | (private) | `const ensureDragSession = () => {` |
| 1595 | fn | onDragMove | (private) | - |
| 1624 | fn | onDragEnd | (private) | - |
| 1658 | fn | onNodeTouchEnd | (private) | - |
| 1690 | fn | adjustPopupLayout | (private) | `const adjustPopupLayout = (entry, viewportWidth...` |
| 1738 | fn | positionPopup | (private) | `const positionPopup = (nodeEl, entry, repositio...` |
| 1804 | fn | focusPopup | (private) | `const focusPopup = () => {` |
| 1814 | fn | wirePopupControls | (private) | `const wirePopupControls = (nodeEl, entry) => {` |
| 1853 | fn | updatePointerPosition | (private) | - |
| 1870 | fn | showHoverNoticeForNode | (private) | `const showHoverNoticeForNode = (nodeEl) => {` |
| 1888 | fn | onNodeOver | (private) | - |
| 1897 | fn | onNodeOut | (private) | - |
| 1906 | fn | onNodeMove | (private) | - |
| 1916 | fn | onSvgLeave | (private) | - |
| 1922 | fn | onPointerDownOutsidePopup | (private) | - |
| 1945 | fn | showEntryPopupForNode | (private) | `const showEntryPopupForNode = (node, entry) => {` |
| 1969 | fn | onNodeDoubleClick | (private) | - |
| 2002 | fn | repositionActivePopup | (private) | `const repositionActivePopup = () => {` |
| 2022 | fn | handleWindowScroll | (private) | `const handleWindowScroll = () => {` |
| 2081 | fn | updateDiagramLegend | (private) | `function updateDiagramLegend() {` |

