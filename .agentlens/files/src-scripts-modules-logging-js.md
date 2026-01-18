# src/scripts/modules/logging.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 3958
- **Language:** JavaScript
- **Symbols:** 115
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 4 | fn | fallbackDetectGlobalScope | (private) | `function fallbackDetectGlobalScope() {` |
| 20 | fn | fallbackCollectCandidateScopes | (private) | `function fallbackCollectCandidateScopes(primary) {` |
| 23 | fn | pushScope | (private) | `function pushScope(scope) {` |
| 41 | fn | loggingResolveStructuredClone | (private) | `function loggingResolveStructuredClone(scope) {` |
| 59 | fn | loggingJsonDeepClone | (private) | `function loggingJsonDeepClone(value) {` |
| 112 | fn | fallbackLoadModuleEnvironment | (private) | `function fallbackLoadModuleEnvironment(scope) {` |
| 127 | fn | fallbackLoadEnvironmentBridge | (private) | `function fallbackLoadEnvironmentBridge(scope) {` |
| 142 | fn | fallbackResolveModuleGlobals | (private) | `function fallbackResolveModuleGlobals(scope) {` |
| 157 | fn | fallbackTryRequire | (private) | `function fallbackTryRequire(modulePath) {` |
| 196 | fn | addCandidate | (private) | `function addCandidate(fn, scope) {` |
| 265 | fn | tryStructuredCloneValue | (private) | `function tryStructuredCloneValue(value) {` |
| 296 | fn | resolveModuleRegistry | (private) | `function resolveModuleRegistry(scope) {` |
| 502 | fn | isNodeProcessReference | (private) | `function isNodeProcessReference(value) {` |
| 559 | fn | shouldBypassDeepFreeze | (private) | `function shouldBypassDeepFreeze(value) {` |
| 632 | fn | fallbackFreezeDeep | (private) | `function fallbackFreezeDeep(value, seen) {` |
| 719 | fn | fallbackSafeWarn | (private) | `function fallbackSafeWarn(message, detail) {` |
| 826 | fn | informModuleGlobals | (private) | `function informModuleGlobals(name, api) {` |
| 849 | fn | createLevelCounters | (private) | `function createLevelCounters() {` |
| 858 | fn | resetLevelCounters | (private) | `function resetLevelCounters(counters) {` |
| 869 | fn | resolveLevelKey | (private) | `function resolveLevelKey(level) {` |
| 882 | fn | getCounterValue | (private) | `function getCounterValue(counters, key) {` |
| 891 | fn | applyLevelCounterDelta | (private) | `function applyLevelCounterDelta(counters, level...` |
| 906 | fn | applyLevelCounterDeltaForEntries | (private) | `function applyLevelCounterDeltaForEntries(count...` |
| 922 | fn | summariseEntriesByLevel | (private) | `function summariseEntriesByLevel(entries) {` |
| 928 | fn | accumulateLevelSummary | (private) | `function accumulateLevelSummary(target, summary) {` |
| 943 | fn | cloneLevelSummary | (private) | `function cloneLevelSummary(summary) {` |
| 949 | fn | freezeLevelSummary | (private) | `function freezeLevelSummary(summary) {` |
| 981 | fn | cloneDefaultConfig | (private) | `function cloneDefaultConfig() {` |
| 1019 | fn | normalizeLevel | (private) | `function normalizeLevel(value, fallbackLevel) {` |
| 1048 | fn | getLevelPriority | (private) | `function getLevelPriority(level) {` |
| 1054 | fn | booleanFromValue | (private) | `function booleanFromValue(value, fallback) {` |
| 1082 | fn | clampHistoryLimit | (private) | `function clampHistoryLimit(value, options) {` |
| 1105 | fn | coerceMessage | (private) | `function coerceMessage(value) {` |
| 1135 | fn | sanitizeForLog | (private) | `function sanitizeForLog(value, depth, seen) {` |
| 1506 | fn | normaliseStackTrace | (private) | `function normaliseStackTrace(stackValue) {` |
| 1544 | fn | normaliseOriginSnapshot | (private) | `function normaliseOriginSnapshot(origin) {` |
| 1602 | fn | getSessionStorage | (private) | `function getSessionStorage() {` |
| 1621 | fn | clearStoredHistory | (private) | `function clearStoredHistory() {` |
| 1633 | fn | persistConfigSafe | (private) | `function persistConfigSafe() {` |
| 1667 | fn | persistHistorySafe | (private) | `function persistHistorySafe() {` |
| 1694 | fn | getEffectiveHistoryLimit | (private) | `function getEffectiveHistoryLimit() {` |
| 1705 | fn | recordHistoryDrop | (private) | `function recordHistoryDrop(removedEntries, limi...` |
| 1784 | fn | enforceHistoryLimit | (private) | `function enforceHistoryLimit(options) {` |
| 1800 | fn | shouldRecord | (private) | `function shouldRecord(level) {` |
| 1804 | fn | shouldOutputToConsole | (private) | `function shouldOutputToConsole(level) {` |
| 1811 | fn | getLevelState | (private) | `function getLevelState(level) {` |
| 1828 | fn | isLevelEnabled | (private) | `function isLevelEnabled(level, options) {` |
| 1863 | fn | createEntryId | (private) | `function createEntryId(timestamp) {` |
| 1867 | fn | pushEntryToHistory | (private) | `function pushEntryToHistory(entry) {` |
| 1883 | fn | appendEntry | (private) | `function appendEntry(entry) {` |
| 1891 | fn | notifyLogSubscribers | (private) | `function notifyLogSubscribers(entry) {` |
| 1909 | fn | getHistorySnapshot | (private) | `function getHistorySnapshot(limit) {` |
| 1921 | fn | notifyConfigSubscribers | (private) | `function notifyConfigSubscribers(snapshot) {` |
| 1939 | fn | arrayFromArrayLike | (private) | `function arrayFromArrayLike(value) {` |
| 1953 | fn | safeArrayPush | (private) | `function safeArrayPush(target, value) {` |
| 1969 | fn | getConsoleLevelForMethod | (private) | `function getConsoleLevelForMethod(method) {` |
| 1982 | fn | getStoredConsoleFunction | (private) | `function getStoredConsoleFunction(method) {` |
| 2036 | fn | invokeConsoleMethod | (private) | `function invokeConsoleMethod(method, args) {` |
| 2063 | fn | recordConsoleMessage | (private) | `function recordConsoleMessage(method, args, met...` |
| 2282 | fn | installConsoleProxies | (private) | `function installConsoleProxies() {` |
| 2399 | fn | removeConsoleProxies | (private) | `function removeConsoleProxies() {` |
| 2447 | fn | syncConsoleCaptureState | (private) | `function syncConsoleCaptureState() {` |
| 2503 | fn | isConsoleCaptureActive | (private) | `function isConsoleCaptureActive() {` |
| 2507 | fn | buildConsoleCaptureDetail | (private) | `function buildConsoleCaptureDetail(overrides) {` |
| 2530 | fn | enableConsoleCapture | (private) | `function enableConsoleCapture(options) {` |
| 2536 | fn | disableConsoleCapture | (private) | `function disableConsoleCapture(options) {` |
| 2542 | fn | shouldCaptureOrigin | (private) | `function shouldCaptureOrigin(level, detail, con...` |
| 2566 | fn | captureLogOrigin | (private) | `function captureLogOrigin(level, message, detai...` |
| 2617 | fn | logInternal | (private) | `function logInternal(level, message, detail, co...` |
| 2690 | fn | debug | (private) | `function debug(message, detail, context) {` |
| 2694 | fn | info | (private) | `function info(message, detail, context) {` |
| 2698 | fn | warn | (private) | `function warn(message, detail, context) {` |
| 2702 | fn | error | (private) | `function error(message, detail, context) {` |
| 2706 | fn | getConfigSnapshot | (private) | `function getConfigSnapshot() {` |
| 2719 | fn | getHistory | (private) | `function getHistory(options) {` |
| 2724 | fn | cloneLastDropSnapshot | (private) | `function cloneLastDropSnapshot() {` |
| 2766 | fn | getStats | (private) | `function getStats() {` |
| 2787 | fn | clearHistory | (private) | `function clearHistory(options) {` |
| 2796 | fn | subscribe | (private) | `function subscribe(listener) {` |
| 2809 | fn | subscribeConfig | (private) | `function subscribeConfig(listener) {` |
| 2822 | fn | mergeMeta | (private) | `function mergeMeta(baseMeta, meta) {` |
| 2853 | fn | createLogger | (private) | `function createLogger(namespace, options) {` |
| 2862 | fn | logWithNamespace | (private) | `function logWithNamespace(level, message, detai...` |
| 2897 | fn | markEventHandled | (private) | `function markEventHandled(event) {` |
| 2931 | fn | handleGlobalError | (private) | `function handleGlobalError(event) {` |
| 2955 | fn | handleUnhandledRejection | (private) | `function handleUnhandledRejection(event) {` |
| 2979 | fn | markTargetAttached | (private) | `function markTargetAttached(target) {` |
| 3001 | fn | attachGlobalErrorListeners | (private) | `function attachGlobalErrorListeners() {` |
| 3031 | fn | applyConfig | (private) | `function applyConfig(overrides) {` |
| 3122 | fn | setConfig | (private) | `function setConfig(overrides, options) {` |
| 3155 | fn | resolveConfigPresetFromScopes | (private) | `function resolveConfigPresetFromScopes() {` |
| 3183 | fn | applyConfigFromStorage | (private) | `function applyConfigFromStorage() {` |
| 3209 | fn | applyConfigFromQuery | (private) | `function applyConfigFromQuery() {` |
| 3238 | fn | assignUpdate | (private) | `function assignUpdate(key, value) {` |
| 3304 | fn | normaliseStoredEntry | (private) | `function normaliseStoredEntry(entry) {` |
| 3351 | fn | getGlobalNavigator | (private) | `function getGlobalNavigator() {` |
| 3364 | fn | getNavigatorServiceWorker | (private) | `function getNavigatorServiceWorker() {` |
| 3375 | fn | markServiceWorkerEntrySeen | (private) | `function markServiceWorkerEntrySeen(id) {` |
| 3399 | fn | mergeServiceWorkerEntryMeta | (private) | `function mergeServiceWorkerEntryMeta(entry, sna...` |
| 3445 | fn | importServiceWorkerLogEntries | (private) | `function importServiceWorkerLogEntries(entries,...` |
| 3485 | fn | finalizeServiceWorkerLogRequest | (private) | `function finalizeServiceWorkerLogRequest(reques...` |
| 3508 | fn | scheduleServiceWorkerLogPoll | (private) | `function scheduleServiceWorkerLogPoll() {` |
| 3527 | fn | ensureServiceWorkerBroadcastChannel | (private) | `function ensureServiceWorkerBroadcastChannel() {` |
| 3561 | fn | handleServiceWorkerLogMessage | (private) | `function handleServiceWorkerLogMessage(event) {` |
| 3609 | fn | requestServiceWorkerLogSnapshot | (private) | `function requestServiceWorkerLogSnapshot(reason) {` |
| 3632 | fn | closeMessageChannel | (private) | - |
| 3682 | fn | finalize | (private) | `const finalize = () => {` |
| 3691 | fn | finalizeWithPoll | (private) | `const finalizeWithPoll = () => {` |
| 3696 | fn | handleResponse | (private) | - |
| 3701 | fn | handleChannelError | (private) | `const handleChannelError = () => {` |
| 3706 | fn | postWithoutChannel | (private) | `const postWithoutChannel = () => {` |
| 3729 | fn | shouldUseMessageChannel | (private) | `const shouldUseMessageChannel = () => {` |
| 3791 | fn | setupServiceWorkerLogBridge | (private) | `function setupServiceWorkerLogBridge() {` |
| 3827 | fn | loadPersistedHistory | (private) | `function loadPersistedHistory() {` |
| 3866 | fn | initialiseConfig | (private) | `function initialiseConfig() {` |

## Memory Markers

### 🔴 `SAFETY` (line 771)

> First: We capture the *original* console functions first so we never create infinite loops.

