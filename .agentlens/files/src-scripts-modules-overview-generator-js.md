# src/scripts/modules/overview/generator.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 1528
- **Language:** JavaScript
- **Symbols:** 64
- **Public symbols:** 1

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 19 | fn | generatePrintableOverview | pub | `export function generatePrintableOverview(confi...` |
| 24 | fn | escapeHtmlSafe | (private) | `const escapeHtmlSafe = (value) => (typeof escap...` |
| 25 | fn | summarizeConnectors | (private) | `const summarizeConnectors = (device) => (typeof...` |
| 38 | fn | sanitizeTitleSegment | (private) | `const sanitizeTitleSegment = (value) => {` |
| 48 | fn | padTwo | (private) | `const padTwo = (value) => String(value).padStar...` |
| 85 | fn | ensureLabelSuffix | (private) | `const ensureLabelSuffix = (label) => {` |
| 96 | fn | addToSection | (private) | `const addToSection = (key, itemHtml) => {` |
| 103 | fn | processSelectForOverview | (private) | `const processSelectForOverview = (selectElement...` |
| 131 | fn | resolveLensDataset | (private) | `const resolveLensDataset = () => {` |
| 146 | fn | getNumberFormatter | (private) | `const getNumberFormatter = (options) => {` |
| 163 | fn | formatNumber | (private) | `const formatNumber = (value, options = {}) => {` |
| 175 | fn | normalizeFocusScaleValue | (private) | `const normalizeFocusScaleValue = (value) => {` |
| 182 | fn | resolveFocusScalePreference | (private) | `const resolveFocusScalePreference = () => {` |
| 192 | fn | resolveLensFocusScaleMode | (private) | `const resolveLensFocusScaleMode = (lensInfo) => {` |
| 201 | fn | formatFocusScalePreference | (private) | `const formatFocusScalePreference = (lensInfo) => {` |
| 214 | fn | useImperialFocusScale | (private) | `const useImperialFocusScale = (lensInfo = null)...` |
| 215 | fn | formatLengthMm | (private) | `const formatLengthMm = (value, lensInfo = null)...` |
| 232 | fn | formatRodLength | (private) | `const formatRodLength = (value, lensInfo = null...` |
| 249 | fn | formatWeight | (private) | `const formatWeight = (value, lensInfo = null) => {` |
| 266 | fn | resolveMinFocusMeters | (private) | `const resolveMinFocusMeters = (lensInfo) => {` |
| 284 | fn | formatDistanceMeters | (private) | `const formatDistanceMeters = (value, lensInfo =...` |
| 299 | fn | formatTStop | (private) | `const formatTStop = (value) => {` |
| 307 | fn | normalizeStringValue | (private) | `const normalizeStringValue = (rawValue) => {` |
| 317 | fn | formatLensType | (private) | `const formatLensType = (value) => {` |
| 324 | fn | formatClampOn | (private) | `const formatClampOn = (value) => {` |
| 338 | fn | formatSupport | (private) | `const formatSupport = (value) => {` |
| 350 | fn | formatRodStandard | (private) | `const formatRodStandard = (value) => normalizeS...` |
| 351 | fn | formatMount | (private) | `const formatMount = (value) => normalizeStringV...` |
| 352 | fn | formatNotes | (private) | `const formatNotes = (value) => normalizeStringV...` |
| 353 | fn | createLensInfoHtml | (private) | `const createLensInfoHtml = (lensInfo) => {` |
| 375 | fn | addLensBox | (private) | `const addLensBox = (labelKey, rawValue, formatt...` |
| 427 | fn | processLensesForOverview | (private) | `const processLensesForOverview = (selectElement...` |
| 515 | fn | getElemText | (private) | `const getElemText = (id) => {` |
| 538 | fn | extractSeverityClass | (private) | `const extractSeverityClass = (element) => {` |
| 554 | fn | buildStatusMarkup | (private) | `const buildStatusMarkup = (element) => {` |
| 581 | fn | isSectionRenderable | (private) | - |
| 624 | fn | resolveDiagramElement | (private) | `const resolveDiagramElement = (fallbackId, glob...` |
| 707 | fn | hasGeneratedGearList | (private) | `const hasGeneratedGearList = (() => {` |
| 732 | fn | resolveGearSections | (private) | `const resolveGearSections = (() => {` |
| 792 | fn | exportIconHtml | (private) | `const exportIconHtml = (() => {` |
| 863 | fn | runConfiguredPrintWorkflow | (private) | `const runConfiguredPrintWorkflow = (options = {...` |
| 951 | fn | ensureCleanup | (private) | `const ensureCleanup = () => runPendingPrintClea...` |
| 957 | fn | openLegacyPrintDialog | (private) | `const openLegacyPrintDialog = () => {` |
| 971 | fn | onConfirm | (private) | `const onConfirm = (result) => {` |
| 999 | fn | applyThemeClasses | (private) | `const applyThemeClasses = (target) => {` |
| 1032 | fn | cleanup | (private) | `function cleanup() {` |
| 1036 | fn | handleGearListDeleted | (private) | `function handleGearListDeleted() {` |
| 1087 | fn | closeAfterPrint | (private) | `const closeAfterPrint = () => {` |
| 1114 | fn | openFallbackPrintView | (private) | `const openFallbackPrintView = () => {` |
| 1217 | fn | clearCleanupTimer | (private) | `const clearCleanupTimer = () => {` |
| 1224 | fn | cleanupIframe | (private) | `const cleanupIframe = () => {` |
| 1246 | fn | handleAfterPrint | (private) | `const handleAfterPrint = () => {` |
| 1250 | fn | triggerPrint | (private) | `const triggerPrint = () => {` |
| 1285 | fn | scheduleTriggerPrint | (private) | `const scheduleTriggerPrint = () => {` |
| 1297 | fn | handleIframeLoad | (private) | `const handleIframeLoad = () => {` |
| 1316 | fn | onReadyStateChange | (private) | `const onReadyStateChange = () => {` |
| 1325 | fn | onWindowLoad | (private) | `const onWindowLoad = () => {` |
| 1344 | fn | handleIframeError | (private) | `const handleIframeError = (errorEvent) => {` |
| 1358 | fn | assignContentToIframe | (private) | `const assignContentToIframe = () => {` |
| 1395 | fn | fallbackTriggerPrintWorkflow | (private) | `const fallbackTriggerPrintWorkflow = (context, ...` |
| 1416 | fn | attemptNative | (private) | `const attemptNative = () => {` |
| 1432 | fn | openFallbackAndCleanup | (private) | `const openFallbackAndCleanup = () => {` |
| 1476 | fn | triggerPrintWorkflow | (private) | `const triggerPrintWorkflow = (options = {}) => {` |
| 1502 | fn | mqlListener | (private) | - |

## Public API

### `generatePrintableOverview`

```
export function generatePrintableOverview(config = {}) {
```

**Line:** 19 | **Kind:** fn

