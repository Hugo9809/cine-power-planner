# src/scripts/modules/offline.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 4268
- **Language:** JavaScript
- **Symbols:** 116
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 7 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 51 | fn | resolveModuleLinker | (private) | `function resolveModuleLinker(scope) {` |
| 86 | fn | fallbackLoadModuleEnvironment | (private) | `function fallbackLoadModuleEnvironment(scope) {` |
| 116 | fn | fallbackLoadEnvironmentBridge | (private) | `function fallbackLoadEnvironmentBridge(scope) {` |
| 167 | fn | fallbackResolveModuleGlobals | (private) | `function fallbackResolveModuleGlobals() {` |
| 205 | fn | sanitizeConnectivityError | (private) | `function sanitizeConnectivityError(error) {` |
| 264 | fn | normalizeConnectivityDetail | (private) | `function normalizeConnectivityDetail(detail) {` |
| 335 | fn | getConnectivityBroadcastChannel | (private) | `function getConnectivityBroadcastChannel() {` |
| 359 | fn | assignGlobalConnectivityState | (private) | `function assignGlobalConnectivityState(state) {` |
| 371 | fn | notifyConnectivityListeners | (private) | `function notifyConnectivityListeners(state) {` |
| 381 | fn | broadcastConnectivityState | (private) | `function broadcastConnectivityState(state) {` |
| 404 | fn | freezeConnectivityState | (private) | `function freezeConnectivityState(nextState) {` |
| 413 | fn | buildConnectivityState | (private) | `function buildConnectivityState(update) {` |
| 437 | fn | updateOfflineUi | (private) | `function updateOfflineUi(state) {` |
| 459 | fn | emitConnectivityState | (private) | `function emitConnectivityState(update) {` |
| 492 | fn | informModuleGlobals | (private) | `function informModuleGlobals(name, api) {` |
| 508 | fn | fallbackTryRequire | (private) | `function fallbackTryRequire(modulePath) {` |
| 544 | fn | resolveModuleRegistry | (private) | `function resolveModuleRegistry(scope) {` |
| 681 | fn | cloneOptions | (private) | `function cloneOptions(options) {` |
| 696 | fn | fallbackQueueModuleRegistration | (private) | `function fallbackQueueModuleRegistration(name, ...` |
| 741 | fn | queueModuleRegistration | (private) | `function queueModuleRegistration(name, api, opt...` |
| 770 | fn | fallbackRegisterOrQueue | (private) | `function fallbackRegisterOrQueue(name, api, opt...` |
| 841 | fn | isNodeProcessReference | (private) | `function isNodeProcessReference(value) {` |
| 898 | fn | shouldBypassDeepFreeze | (private) | `function shouldBypassDeepFreeze(value) {` |
| 945 | fn | fallbackResolveSeenTracker | (private) | `function fallbackResolveSeenTracker(seen) {` |
| 984 | fn | fallbackFreezeDeep | (private) | `function fallbackFreezeDeep(value, seen) {` |
| 1038 | fn | freezeDeep | (private) | `function freezeDeep(value, seen) {` |
| 1043 | fn | resolveCachedFreezeDeep | (private) | `function resolveCachedFreezeDeep() {` |
| 1050 | fn | resolveFreezeDeep | (private) | `function resolveFreezeDeep() {` |
| 1073 | fn | fallbackSafeWarn | (private) | `function fallbackSafeWarn(message, detail) {` |
| 1121 | fn | settlePromise | (private) | `function settlePromise(promise) {` |
| 1131 | fn | isAccessControlReloadWarmupError | (private) | `function isAccessControlReloadWarmupError(error) {` |
| 1174 | fn | shouldSuppressReloadWarmupFailure | (private) | `function shouldSuppressReloadWarmupFailure(erro...` |
| 1239 | fn | isLikelySafariFamilyBrowser | (private) | `function isLikelySafariFamilyBrowser(nav, windo...` |
| 1319 | fn | shouldPreferXmlHttpWarmup | (private) | `function shouldPreferXmlHttpWarmup(nav, windowL...` |
| 1328 | fn | scheduleReloadWarmup | (private) | `function scheduleReloadWarmup(options = {}) {` |
| 1373 | fn | registerCancelHandler | (private) | - |
| 1393 | fn | includeCredentials | (private) | `const includeCredentials = (() => {` |
| 1406 | fn | warmupCredentials | (private) | `const warmupCredentials = (() => {` |
| 1417 | fn | warmupRequestHref | (private) | `const warmupRequestHref = (() => {` |
| 1474 | fn | executeWarmup | (private) | `const executeWarmup = async () => {` |
| 1488 | fn | buildRequestInit | (private) | `const buildRequestInit = (overrides = {}) => {` |
| 1503 | fn | performFetch | (private) | `const performFetch = async (overrides = {}) => {` |
| 1519 | fn | attemptXmlHttpWarmup | (private) | `const attemptXmlHttpWarmup = () => {` |
| 1562 | fn | conclude | (private) | - |
| 1631 | fn | isAborted | (private) | `const isAborted = () => controller && controlle...` |
| 1759 | fn | awaitPromiseWithSoftTimeout | (private) | `function awaitPromiseWithSoftTimeout(promise, t...` |
| 1844 | fn | fallbackExposeGlobal | (private) | `function fallbackExposeGlobal(name, value) {` |
| 1914 | fn | resolveGlobal | (private) | `function resolveGlobal(name) {` |
| 1927 | fn | resolveWindow | (private) | `function resolveWindow(explicitWindow) {` |
| 1937 | fn | resolveNavigator | (private) | `function resolveNavigator(explicitNavigator) {` |
| 1951 | fn | isNavigatorExplicitlyOffline | (private) | `function isNavigatorExplicitlyOffline(navigator...` |
| 1963 | fn | resolveCaches | (private) | `function resolveCaches(explicitCaches) {` |
| 1977 | fn | resolveLocation | (private) | `function resolveLocation(explicitLocation) {` |
| 1990 | fn | resolveFetch | (private) | `function resolveFetch(explicitFetch, windowLike) {` |
| 2013 | fn | createAbortController | (private) | `function createAbortController() {` |
| 2026 | fn | createTimeoutError | (private) | `function createTimeoutError(message) {` |
| 2033 | fn | fetchWithTimeout | (private) | `function fetchWithTimeout(fetchFn, url, init, t...` |
| 2074 | fn | cleanup | (private) | `const cleanup = () => {` |
| 2084 | fn | fetchPromise | (private) | `const fetchPromise = (() => {` |
| 2106 | fn | isSuccessfulConnectivityResponse | (private) | `function isSuccessfulConnectivityResponse(respo...` |
| 2134 | fn | appendConnectivityProbeToken | (private) | `function appendConnectivityProbeToken(url, toke...` |
| 2175 | fn | readConnectivityProbeResult | (private) | `function readConnectivityProbeResult(response) {` |
| 2192 | fn | resolveConnectivityProbeUrl | (private) | `function resolveConnectivityProbeUrl(forceReloa...` |
| 2214 | fn | probeReloadConnectivity | (private) | `async function probeReloadConnectivity({` |
| 2339 | fn | subscribeConnectivityStatus | (private) | `function subscribeConnectivityStatus(listener) {` |
| 2355 | fn | unsubscribeConnectivityStatus | (private) | `function unsubscribeConnectivityStatus(listener) {` |
| 2367 | fn | reportConnectivityProbeResult | (private) | `function reportConnectivityProbeResult(result, ...` |
| 2402 | fn | resolveXmlHttpRequest | (private) | `function resolveXmlHttpRequest(windowLike) {` |
| 2417 | fn | registerFallbackStorage | (private) | `function registerFallbackStorage(storages, cand...` |
| 2433 | fn | inspectScopeForStorages | (private) | `function inspectScopeForStorages(storages, scop...` |
| 2484 | fn | collectFallbackUiCacheStorages | (private) | `function collectFallbackUiCacheStorages(options...` |
| 2557 | fn | clearUiCacheEntriesFallback | (private) | `function clearUiCacheEntriesFallback(options = ...` |
| 2591 | fn | collectServiceWorkerRegistrations | (private) | `async function collectServiceWorkerRegistration...` |
| 2600 | fn | pushRegistration | (private) | `const pushRegistration = (registration) => {` |
| 2630 | fn | resolvePrefetchedServiceWorkerRegistrations | (private) | `async function resolvePrefetchedServiceWorkerRe...` |
| 2649 | fn | unregisterServiceWorkers | (private) | `async function unregisterServiceWorkers(navigat...` |
| 2680 | fn | observeServiceWorkerControllerChange | (private) | `function observeServiceWorkerControllerChange(n...` |
| 2696 | fn | finalize | (private) | `const finalize = (value) => {` |
| 2731 | fn | handler | (private) | `const handler = () => {` |
| 2790 | fn | resolveExposedCacheName | (private) | `function resolveExposedCacheName() {` |
| 2798 | fn | isRelevantCacheKey | (private) | `function isRelevantCacheKey(key, explicitName, ...` |
| 2817 | fn | clearCacheStorage | (private) | `async function clearCacheStorage(cachesOverride) {` |
| 2868 | fn | readLocationHrefSafe | (private) | `function readLocationHrefSafe(locationLike) {` |
| 2882 | fn | readLocationPathnameSafe | (private) | `function readLocationPathnameSafe(locationLike) {` |
| 2896 | fn | readLocationOriginSafe | (private) | `function readLocationOriginSafe(locationLike) {` |
| 2927 | fn | resolveHrefOrigin | (private) | `function resolveHrefOrigin(targetHref, referenc...` |
| 2949 | fn | isSameOriginReloadTarget | (private) | `function isSameOriginReloadTarget(locationLike,...` |
| 2977 | fn | getForceReloadBaseCandidates | (private) | `function getForceReloadBaseCandidates(locationL...` |
| 2981 | fn | addCandidate | (private) | `const addCandidate = (value) => {` |
| 3024 | fn | normaliseHrefForComparison | (private) | `function normaliseHrefForComparison(value, base...` |
| 3053 | fn | enforceSameOriginNextHref | (private) | `function enforceSameOriginNextHref(locationLike...` |
| 3107 | fn | coerceForceReloadUrlDescriptor | (private) | `function coerceForceReloadUrlDescriptor(locatio...` |
| 3140 | fn | buildForceReloadUrl | (private) | `function buildForceReloadUrl(locationLike, para...` |
| 3224 | fn | isForceReloadHash | (private) | `function isForceReloadHash(hashValue, paramName) {` |
| 3249 | fn | normaliseHrefForHistory | (private) | `function normaliseHrefForHistory(targetHref, ba...` |
| 3268 | fn | cleanupForceReloadArtifacts | (private) | `function cleanupForceReloadArtifacts(win, param...` |
| 3401 | fn | scheduleForceReloadNavigationWarning | (private) | `function scheduleForceReloadNavigationWarning(` |
| 3435 | fn | evaluate | (private) | `const evaluate = () => {` |
| 3455 | fn | runCheck | (private) | `const runCheck = () => {` |
| 3488 | fn | attemptForceReloadNavigation | (private) | `function attemptForceReloadNavigation(locationL...` |
| 3519 | fn | attemptForceReloadHistoryFallback | (private) | `function attemptForceReloadHistoryFallback(win,...` |
| 3600 | fn | scheduleForceReloadFallbacks | (private) | `function scheduleForceReloadFallbacks(win, loca...` |
| 3640 | fn | queueStep | (private) | `const queueStep = (run) => {` |
| 3715 | fn | triggerReload | (private) | `function triggerReload(windowOverride, precompu...` |
| 3806 | fn | reloadApp | (private) | `async function reloadApp(options = {}) {` |
| 3902 | fn | serviceWorkerCleanupPromise | (private) | `const serviceWorkerCleanupPromise = (async () => {` |
| 3911 | fn | cacheCleanupPromise | (private) | `const cacheCleanupPromise = (async () => {` |
| 3931 | fn | resolveWarmupPromise | (private) | `const resolveWarmupPromise = (handle) => {` |
| 3947 | fn | wrapResultWithSource | (private) | `const wrapResultWithSource = (source, promise) ...` |
| 4107 | fn | shouldRegisterImmediately | (private) | `function shouldRegisterImmediately(win) {` |
| 4118 | fn | registerServiceWorker | (private) | `function registerServiceWorker(scriptUrl = 'ser...` |
| 4126 | fn | register | (private) | `const register = () => {` |
| 4139 | fn | finalizePendingRegistration | (private) | `const finalizePendingRegistration = (promise) => {` |
| 4160 | fn | handler | (private) | `const handler = () => {` |
| 4179 | fn | initConnectivityListeners | (private) | `function initConnectivityListeners(win) {` |

