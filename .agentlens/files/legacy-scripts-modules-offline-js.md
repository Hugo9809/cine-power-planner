# legacy/scripts/modules/offline.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 3788
- **Language:** JavaScript
- **Symbols:** 110
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 1 | fn | _toConsumableArray | (private) | `function _toConsumableArray(r) { return _arrayW...` |
| 2 | fn | _nonIterableSpread | (private) | `function _nonIterableSpread() { throw new TypeE...` |
| 3 | fn | _unsupportedIterableToArray | (private) | `function _unsupportedIterableToArray(r, a) { if...` |
| 4 | fn | _iterableToArray | (private) | `function _iterableToArray(r) { if ("undefined" ...` |
| 5 | fn | _arrayWithoutHoles | (private) | `function _arrayWithoutHoles(r) { if (Array.isAr...` |
| 6 | fn | _arrayLikeToArray | (private) | `function _arrayLikeToArray(r, a) { (null == a |...` |
| 7 | fn | ownKeys | (private) | `function ownKeys(e, r) { var t = Object.keys(e)...` |
| 8 | fn | _objectSpread | (private) | `function _objectSpread(e) { for (var r = 1; r <...` |
| 9 | fn | _defineProperty | (private) | `function _defineProperty(e, r, t) { return (r =...` |
| 10 | fn | _toPropertyKey | (private) | `function _toPropertyKey(t) { var i = _toPrimiti...` |
| 11 | fn | _toPrimitive | (private) | `function _toPrimitive(t, r) { if ("object" != _...` |
| 12 | fn | _regenerator | (private) | `function _regenerator() { var e, t, r = "functi...` |
| 13 | fn | _regeneratorDefine2 | (private) | `function _regeneratorDefine2(e, r, n, t) { var ...` |
| 14 | fn | asyncGeneratorStep | (private) | `function asyncGeneratorStep(n, t, e, r, o, a, c...` |
| 15 | fn | _asyncToGenerator | (private) | `function _asyncToGenerator(n) { return function...` |
| 16 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 18 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 41 | fn | resolveModuleLinker | (private) | `function resolveModuleLinker(scope) {` |
| 67 | fn | fallbackLoadModuleEnvironment | (private) | `function fallbackLoadModuleEnvironment(scope) {` |
| 88 | fn | fallbackLoadEnvironmentBridge | (private) | `function fallbackLoadEnvironmentBridge(scope) {` |
| 113 | fn | fallbackResolveModuleGlobals | (private) | `function fallbackResolveModuleGlobals() {` |
| 142 | fn | sanitizeConnectivityError | (private) | `function sanitizeConnectivityError(error) {` |
| 195 | fn | normalizeConnectivityDetail | (private) | `function normalizeConnectivityDetail(detail) {` |
| 250 | fn | getConnectivityBroadcastChannel | (private) | `function getConnectivityBroadcastChannel() {` |
| 270 | fn | assignGlobalConnectivityState | (private) | `function assignGlobalConnectivityState(state) {` |
| 280 | fn | notifyConnectivityListeners | (private) | `function notifyConnectivityListeners(state) {` |
| 289 | fn | broadcastConnectivityState | (private) | `function broadcastConnectivityState(state) {` |
| 310 | fn | freezeConnectivityState | (private) | `function freezeConnectivityState(nextState) {` |
| 318 | fn | buildConnectivityState | (private) | `function buildConnectivityState(update) {` |
| 335 | fn | emitConnectivityState | (private) | `function emitConnectivityState(update) {` |
| 351 | fn | informModuleGlobals | (private) | `function informModuleGlobals(name, api) {` |
| 364 | fn | fallbackTryRequire | (private) | `function fallbackTryRequire(modulePath) {` |
| 393 | fn | resolveModuleRegistry | (private) | `function resolveModuleRegistry(scope) {` |
| 513 | fn | cloneOptions | (private) | `function cloneOptions(options) {` |
| 525 | fn | fallbackQueueModuleRegistration | (private) | `function fallbackQueueModuleRegistration(name, ...` |
| 565 | fn | queueModuleRegistration | (private) | `function queueModuleRegistration(name, api, opt...` |
| 590 | fn | fallbackRegisterOrQueue | (private) | `function fallbackRegisterOrQueue(name, api, opt...` |
| 644 | fn | isNodeProcessReference | (private) | `function isNodeProcessReference(value) {` |
| 684 | fn | shouldBypassDeepFreeze | (private) | `function shouldBypassDeepFreeze(value) {` |
| 718 | fn | fallbackResolveSeenTracker | (private) | `function fallbackResolveSeenTracker(seen) {` |
| 753 | fn | fallbackFreezeDeep | (private) | `function fallbackFreezeDeep(value, seen) {` |
| 798 | fn | freezeDeep | (private) | `function freezeDeep(value, seen) {` |
| 802 | fn | resolveCachedFreezeDeep | (private) | `function resolveCachedFreezeDeep() {` |
| 808 | fn | resolveFreezeDeep | (private) | `function resolveFreezeDeep() {` |
| 827 | fn | fallbackSafeWarn | (private) | `function fallbackSafeWarn(message, detail) {` |
| 868 | fn | settlePromise | (private) | `function settlePromise(promise) {` |
| 878 | fn | isAccessControlReloadWarmupError | (private) | `function isAccessControlReloadWarmupError(error) {` |
| 912 | fn | shouldSuppressReloadWarmupFailure | (private) | `function shouldSuppressReloadWarmupFailure(erro...` |
| 966 | fn | isLikelySafariFamilyBrowser | (private) | `function isLikelySafariFamilyBrowser(nav, windo...` |
| 1022 | fn | shouldPreferXmlHttpWarmup | (private) | `function shouldPreferXmlHttpWarmup(nav, windowL...` |
| 1029 | fn | scheduleReloadWarmup | (private) | `function scheduleReloadWarmup() {` |
| 1464 | fn | awaitPromiseWithSoftTimeout | (private) | `function awaitPromiseWithSoftTimeout(promise, t...` |
| 1546 | fn | fallbackExposeGlobal | (private) | `function fallbackExposeGlobal(name, value) {` |
| 1601 | fn | resolveGlobal | (private) | `function resolveGlobal(name) {` |
| 1612 | fn | resolveWindow | (private) | `function resolveWindow(explicitWindow) {` |
| 1621 | fn | resolveNavigator | (private) | `function resolveNavigator(explicitNavigator) {` |
| 1634 | fn | isNavigatorExplicitlyOffline | (private) | `function isNavigatorExplicitlyOffline(navigator...` |
| 1643 | fn | resolveCaches | (private) | `function resolveCaches(explicitCaches) {` |
| 1656 | fn | resolveLocation | (private) | `function resolveLocation(explicitLocation) {` |
| 1666 | fn | resolveFetch | (private) | `function resolveFetch(explicitFetch, windowLike) {` |
| 1685 | fn | createAbortController | (private) | `function createAbortController() {` |
| 1696 | fn | createTimeoutError | (private) | `function createTimeoutError(message) {` |
| 1702 | fn | fetchWithTimeout | (private) | `function fetchWithTimeout(fetchFn, url, init, t...` |
| 1776 | fn | isSuccessfulConnectivityResponse | (private) | `function isSuccessfulConnectivityResponse(respo...` |
| 1799 | fn | appendConnectivityProbeToken | (private) | `function appendConnectivityProbeToken(url, toke...` |
| 1832 | fn | readConnectivityProbeResult | (private) | `function readConnectivityProbeResult(response) {` |
| 1846 | fn | resolveConnectivityProbeUrl | (private) | `function resolveConnectivityProbeUrl(forceReloa...` |
| 1863 | fn | probeReloadConnectivity | (private) | `function probeReloadConnectivity(_x) {` |
| 1866 | fn | _probeReloadConnectivity | (private) | `function _probeReloadConnectivity() {` |
| 2035 | fn | subscribeConnectivityStatus | (private) | `function subscribeConnectivityStatus(listener) {` |
| 2048 | fn | unsubscribeConnectivityStatus | (private) | `function unsubscribeConnectivityStatus(listener) {` |
| 2058 | fn | reportConnectivityProbeResult | (private) | `function reportConnectivityProbeResult(result, ...` |
| 2086 | fn | resolveXmlHttpRequest | (private) | `function resolveXmlHttpRequest(windowLike) {` |
| 2097 | fn | registerFallbackStorage | (private) | `function registerFallbackStorage(storages, cand...` |
| 2109 | fn | inspectScopeForStorages | (private) | `function inspectScopeForStorages(storages, scop...` |
| 2154 | fn | collectFallbackUiCacheStorages | (private) | `function collectFallbackUiCacheStorages() {` |
| 2224 | fn | clearUiCacheEntriesFallback | (private) | `function clearUiCacheEntriesFallback() {` |
| 2257 | fn | collectServiceWorkerRegistrations | (private) | `function collectServiceWorkerRegistrations(_x2) {` |
| 2260 | fn | _collectServiceWorkerRegistrations | (private) | `function _collectServiceWorkerRegistrations() {` |
| 2337 | fn | resolvePrefetchedServiceWorkerRegistrations | (private) | `function resolvePrefetchedServiceWorkerRegistra...` |
| 2340 | fn | _resolvePrefetchedServiceWorkerRegistrations | (private) | `function _resolvePrefetchedServiceWorkerRegistr...` |
| 2376 | fn | unregisterServiceWorkers | (private) | `function unregisterServiceWorkers(_x4, _x5) {` |
| 2379 | fn | _unregisterServiceWorkers | (private) | `function _unregisterServiceWorkers() {` |
| 2428 | fn | observeServiceWorkerControllerChange | (private) | `function observeServiceWorkerControllerChange(n...` |
| 2524 | fn | resolveExposedCacheName | (private) | `function resolveExposedCacheName() {` |
| 2531 | fn | isRelevantCacheKey | (private) | `function isRelevantCacheKey(key, explicitName, ...` |
| 2546 | fn | clearCacheStorage | (private) | `function clearCacheStorage(_x6) {` |
| 2549 | fn | _clearCacheStorage | (private) | `function _clearCacheStorage() {` |
| 2613 | fn | readLocationHrefSafe | (private) | `function readLocationHrefSafe(locationLike) {` |
| 2625 | fn | readLocationPathnameSafe | (private) | `function readLocationPathnameSafe(locationLike) {` |
| 2637 | fn | readLocationOriginSafe | (private) | `function readLocationOriginSafe(locationLike) {` |
| 2663 | fn | resolveHrefOrigin | (private) | `function resolveHrefOrigin(targetHref, referenc...` |
| 2681 | fn | isSameOriginReloadTarget | (private) | `function isSameOriginReloadTarget(locationLike,...` |
| 2697 | fn | getForceReloadBaseCandidates | (private) | `function getForceReloadBaseCandidates(locationL...` |
| 2734 | fn | normaliseHrefForComparison | (private) | `function normaliseHrefForComparison(value, base...` |
| 2758 | fn | enforceSameOriginNextHref | (private) | `function enforceSameOriginNextHref(locationLike...` |
| 2802 | fn | coerceForceReloadUrlDescriptor | (private) | `function coerceForceReloadUrlDescriptor(locatio...` |
| 2817 | fn | buildForceReloadUrl | (private) | `function buildForceReloadUrl(locationLike, para...` |
| 2890 | fn | isForceReloadHash | (private) | `function isForceReloadHash(hashValue, paramName) {` |
| 2909 | fn | normaliseHrefForHistory | (private) | `function normaliseHrefForHistory(targetHref, ba...` |
| 2924 | fn | cleanupForceReloadArtifacts | (private) | `function cleanupForceReloadArtifacts(win) {` |
| 3030 | fn | scheduleForceReloadNavigationWarning | (private) | `function scheduleForceReloadNavigationWarning(l...` |
| 3099 | fn | attemptForceReloadNavigation | (private) | `function attemptForceReloadNavigation(locationL...` |
| 3123 | fn | attemptForceReloadHistoryFallback | (private) | `function attemptForceReloadHistoryFallback(win,...` |
| 3182 | fn | scheduleForceReloadFallbacks | (private) | `function scheduleForceReloadFallbacks(win, loca...` |
| 3280 | fn | triggerReload | (private) | `function triggerReload(windowOverride, precompu...` |
| 3335 | fn | reloadApp | (private) | `function reloadApp() {` |
| 3338 | fn | _reloadApp | (private) | `function _reloadApp() {` |
| 3669 | fn | shouldRegisterImmediately | (private) | `function shouldRegisterImmediately(win) {` |
| 3679 | fn | registerServiceWorker | (private) | `function registerServiceWorker() {` |

