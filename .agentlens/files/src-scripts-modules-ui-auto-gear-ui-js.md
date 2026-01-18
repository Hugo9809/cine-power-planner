# src/scripts/modules/ui/auto-gear-ui.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 1152
- **Language:** JavaScript
- **Symbols:** 21
- **Public symbols:** 1

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 9 | fn | initAutoGearUi | pub | `export function initAutoGearUi(doc, options = {...` |
| 405 | fn | refreshAutoGearShootingDaysValue | (private) | `function refreshAutoGearShootingDaysValue(selec...` |
| 407 | fn | condition | (private) | `const condition = (() => {` |
| 427 | fn | refreshAutoGearScenarioOptions | (private) | `function refreshAutoGearScenarioOptions(selecte...` |
| 499 | fn | getAutoGearScenarioSelectedValues | (private) | `function getAutoGearScenarioSelectedValues() {` |
| 506 | fn | applyAutoGearScenarioSettings | (private) | `function applyAutoGearScenarioSettings(selected...` |
| 552 | fn | updateAutoGearScenarioMultiplierVisibility | (private) | `function updateAutoGearScenarioMultiplierVisibi...` |
| 567 | fn | refreshAutoGearScenarioBaseSelect | (private) | `function refreshAutoGearScenarioBaseSelect(sele...` |
| 619 | fn | refreshAutoGearMatteboxOptions | (private) | `function refreshAutoGearMatteboxOptions(selecte...` |
| 688 | fn | refreshAutoGearCameraHandleOptions | (private) | `function refreshAutoGearCameraHandleOptions(sel...` |
| 757 | fn | resolveViewfinderOptionValue | (private) | `function resolveViewfinderOptionValue(option) {` |
| 763 | fn | getViewfinderFallbackLabel | (private) | `function getViewfinderFallbackLabel(value) {` |
| 772 | fn | getVideoDistributionFallbackLabel | (private) | `function getVideoDistributionFallbackLabel(valu...` |
| 785 | fn | normalizeVideoDistributionOptionValue | (private) | `function normalizeVideoDistributionOptionValue(...` |
| 794 | fn | refreshAutoGearViewfinderExtensionOptions | (private) | `function refreshAutoGearViewfinderExtensionOpti...` |
| 863 | fn | refreshAutoGearDeliveryResolutionOptions | (private) | `function refreshAutoGearDeliveryResolutionOptio...` |
| 872 | fn | addOption | (private) | `const addOption = (value, label) => {` |
| 917 | fn | refreshAutoGearVideoDistributionOptions | (private) | `function refreshAutoGearVideoDistributionOption...` |
| 1002 | fn | collectAutoGearSelectedValues | (private) | `function collectAutoGearSelectedValues(selected...` |
| 1020 | fn | getAutoGearScenarioModeSelectElement | (private) | `function getAutoGearScenarioModeSelectElement() {` |
| 1024 | fn | setAutoGearScenarioModeSelectElement | (private) | `function setAutoGearScenarioModeSelectElement(v...` |

## Public API

### `initAutoGearUi`

```
export function initAutoGearUi(doc, options = {}) {
```

**Line:** 9 | **Kind:** fn

## Memory Markers

### 🟢 `NOTE` (line 14)

> Mutable globals like currentLang need to be accessed via scope directly

