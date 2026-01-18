# dist/service-worker.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 1245
- **Language:** JavaScript
- **Symbols:** 29
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 48 | fn | createLogEntryId | (private) | `function createLogEntryId(level, timestamp) {` |
| 58 | fn | cloneLogEntry | (private) | `function cloneLogEntry(entry) {` |
| 88 | fn | getLogBroadcastChannel | (private) | `function getLogBroadcastChannel() {` |
| 123 | fn | broadcastLogEntry | (private) | `function broadcastLogEntry(entry) {` |
| 156 | fn | getCacheMetadataSnapshot | (private) | `function getCacheMetadataSnapshot() {` |
| 173 | fn | cloneHistoryForTransfer | (private) | `function cloneHistoryForTransfer(history, limit) {` |
| 194 | fn | createLogStateSnapshot | (private) | `function createLogStateSnapshot(limit) {` |
| 212 | fn | respondWithLogState | (private) | `function respondWithLogState(event, request) {` |
| 260 | fn | handleServiceWorkerMessage | (private) | `function handleServiceWorkerMessage(event) {` |
| 282 | fn | sanitizeLogDetail | (private) | `function sanitizeLogDetail(detail, seen = new W...` |
| 352 | fn | ensureDiagnosticState | (private) | `function ensureDiagnosticState() {` |
| 371 | fn | outputToConsole | (private) | `function outputToConsole(level, message, detail) {` |
| 394 | fn | recordLogEntry | (private) | `function recordLogEntry(level, message, detail) {` |
| 444 | fn | isInvalidStateError | (private) | `function isInvalidStateError(error) {` |
| 460 | fn | scheduleDeferredActivationTask | (private) | `function scheduleDeferredActivationTask(task) {` |
| 483 | fn | markNavigationPreloadUnavailable | (private) | `function markNavigationPreloadUnavailable(detai...` |
| 495 | fn | resolveCacheVersion | (private) | `function resolveCacheVersion() {` |
| 583 | fn | loadServiceWorkerAssets | (private) | `function loadServiceWorkerAssets() {` |
| 620 | fn | scheduleCachePut | (private) | `function scheduleCachePut(event, request, respo...` |
| 640 | fn | performCachePut | (private) | `const performCachePut = async () => {` |
| 671 | fn | isConnectivityProbeRequest | (private) | `function isConnectivityProbeRequest(request, re...` |
| 707 | fn | annotateConnectivityProbeResponse | (private) | `function annotateConnectivityProbeResponse(resp...` |
| 741 | fn | shouldBypassCache | (private) | `function shouldBypassCache(request, requestUrl) {` |
| 793 | fn | extractRootAliasAsset | (private) | `function extractRootAliasAsset(assets) {` |
| 809 | fn | ensureRootAlias | (private) | `async function ensureRootAlias(cache) {` |
| 835 | fn | precacheAssets | (private) | `async function precacheAssets(cacheName, assets) {` |
| 1050 | fn | resolvePreloadResponse | (private) | `const resolvePreloadResponse = async () => {` |
| 1104 | fn | networkPromise | (private) | `const networkPromise = (async () => {` |
| 1223 | fn | isStorageAccessFailure | (private) | `function isStorageAccessFailure(error) {` |

## Memory Markers

### 🟢 `NOTE` (line 1178)

> We already tried to get a response above. If we are here, it means

