# src/scripts/storage.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 18298
- **Language:** JavaScript
- **Symbols:** 449
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 41 | fn | hydrateProjectCache | (private) | `async function hydrateProjectCache() {` |
| 344 | fn | closeStorageLifecycle | (private) | `function closeStorageLifecycle() {` |
| 368 | fn | storageManualDeepClone | (private) | `function storageManualDeepClone(value, referenc...` |
| 440 | fn | storageJsonDeepClone | (private) | `function storageJsonDeepClone(value) {` |
| 458 | fn | storageResolveStructuredClone | (private) | `function storageResolveStructuredClone(scope) {` |
| 499 | fn | storageCreateResilientDeepClone | (private) | `function storageCreateResilientDeepClone(scope) {` |
| 543 | fn | registerKnownSessionStorage | (private) | `function registerKnownSessionStorage(storage) {` |
| 562 | fn | resolveSessionStorageFromScope | (private) | `function resolveSessionStorageFromScope(scope) {` |
| 610 | fn | resolveLocalStorageFromScope | (private) | `function resolveLocalStorageFromScope(scope) {` |
| 627 | fn | collectLocalStorageCandidates | (private) | `function collectLocalStorageCandidates() {` |
| 674 | fn | isFactoryResetActive | (private) | `function isFactoryResetActive() {` |
| 675 | fn | readFlag | (private) | `const readFlag = (scope) => {` |
| 782 | fn | cloneAutoBackupCompressionValue | (private) | `function cloneAutoBackupCompressionValue(value) {` |
| 804 | fn | readAutoBackupCompressionCache | (private) | `function readAutoBackupCompressionCache(signatu...` |
| 831 | fn | writeAutoBackupCompressionCache | (private) | `function writeAutoBackupCompressionCache(signat...` |
| 874 | fn | resetAutoBackupCompressionCache | (private) | `function resetAutoBackupCompressionCache() {` |
| 918 | fn | collectStorageLoggingScopes | (private) | `function collectStorageLoggingScopes() {` |
| 939 | fn | resolveStorageLoggingResolver | (private) | `function resolveStorageLoggingResolver() {` |
| 971 | fn | resolveStorageLogger | (private) | `function resolveStorageLogger() {` |
| 995 | fn | sanitizeStorageError | (private) | `function sanitizeStorageError(error) {` |
| 1027 | fn | getActiveStorageType | (private) | `function getActiveStorageType(storage) {` |
| 1058 | fn | logStorageEvent | (private) | `function logStorageEvent(level, message, detail...` |
| 1131 | fn | getCompressionLogTimestamp | (private) | `function getCompressionLogTimestamp() {` |
| 1149 | fn | logCompressionSavingsEvent | (private) | `function logCompressionSavingsEvent(kind, ident...` |
| 1284 | fn | getCompressionLogSnapshot | (private) | `function getCompressionLogSnapshot() {` |
| 1319 | fn | getCompressionStrategyCacheKey | (private) | `function getCompressionStrategyCacheKey(variant...` |
| 1336 | fn | readCompressionStrategyCache | (private) | `function readCompressionStrategyCache(cacheKey,...` |
| 1360 | fn | pruneCompressionStrategyCache | (private) | `function pruneCompressionStrategyCache(cacheKey) {` |
| 1384 | fn | writeCompressionStrategyCache | (private) | `function writeCompressionStrategyCache(cacheKey...` |
| 1402 | fn | computeStorageCompressionWrapperBaseLength | (private) | `function computeStorageCompressionWrapperBaseLe...` |
| 1437 | fn | createCompressionCandidateCache | (private) | `function createCompressionCandidateCache(limit) {` |
| 1454 | fn | cloneCompressionCandidate | (private) | `function cloneCompressionCandidate(candidate) {` |
| 1468 | fn | touchCompressionCandidateCacheKey | (private) | `function touchCompressionCandidateCacheKey(cach...` |
| 1481 | fn | readCompressionCandidateCacheEntry | (private) | `function readCompressionCandidateCacheEntry(cac...` |
| 1516 | fn | writeCompressionCandidateCacheEntry | (private) | `function writeCompressionCandidateCacheEntry(ca...` |
| 1556 | fn | getStorageStateCacheMap | (private) | `function getStorageStateCacheMap(storage, creat...` |
| 1620 | fn | getCachedStorageEntry | (private) | `function getCachedStorageEntry(storage, key) {` |
| 1628 | fn | clearCachedStorageEntry | (private) | `function clearCachedStorageEntry(storage, key) {` |
| 1660 | fn | cloneValueForCache | (private) | `function cloneValueForCache(value) {` |
| 1674 | fn | cloneCachedEntryValue | (private) | `function cloneCachedEntryValue(entry) {` |
| 1687 | fn | cloneLookupMap | (private) | `function cloneLookupMap(source, options) {` |
| 1714 | fn | cloneProjectLookupSnapshotForReturn | (private) | `function cloneProjectLookupSnapshotForReturn(lo...` |
| 1725 | fn | captureProjectLookupSnapshotForCache | (private) | `function captureProjectLookupSnapshotForCache(l...` |
| 1736 | fn | freezeProjectSnapshotProjects | (private) | `function freezeProjectSnapshotProjects(projects) {` |
| 1765 | fn | setProjectReadCacheSnapshot | (private) | `function setProjectReadCacheSnapshot(snapshot) {` |
| 1780 | fn | getProjectReadCacheClone | (private) | `function getProjectReadCacheClone(options) {` |
| 1817 | fn | invalidateProjectReadCache | (private) | `function invalidateProjectReadCache() {` |
| 1821 | fn | normalizeProjectStorageRevisionValue | (private) | `function normalizeProjectStorageRevisionValue(v...` |
| 1838 | fn | getProjectStorageRevisionKeyName | (private) | `function getProjectStorageRevisionKeyName() {` |
| 1842 | fn | loadProjectStorageRevision | (private) | `function loadProjectStorageRevision(storageOver...` |
| 1857 | fn | bumpProjectStorageRevision | (private) | `function bumpProjectStorageRevision(storageOver...` |
| 1874 | fn | cacheStorageValue | (private) | `function cacheStorageValue(storage, key, rawVal...` |
| 1904 | fn | tryGetCachedStorageValue | (private) | `function tryGetCachedStorageValue(storage, key,...` |
| 1928 | fn | readGlobalStringValue | (private) | `function readGlobalStringValue(scope, key) {` |
| 1976 | fn | exposeGlobalStringValue | (private) | `function exposeGlobalStringValue(scope, key, va...` |
| 2041 | fn | resolveMountVoltageStorageKeyName | (private) | `function resolveMountVoltageStorageKeyName() {` |
| 2065 | fn | refreshMountVoltageStorageKeyName | (private) | `function refreshMountVoltageStorageKeyName() {` |
| 2090 | fn | getMountVoltageStorageKeyName | (private) | `function getMountVoltageStorageKeyName() {` |
| 2094 | fn | getMountVoltageStorageBackupKeyName | (private) | `function getMountVoltageStorageBackupKeyName() {` |
| 2099 | fn | ensureCustomFontStorageKeyName | (private) | `function ensureCustomFontStorageKeyName() {` |
| 2127 | fn | getCustomFontStorageKeyName | (private) | `function getCustomFontStorageKeyName() {` |
| 2142 | fn | resolveTemperatureUnitStorageKey | (private) | `function resolveTemperatureUnitStorageKey() {` |
| 2232 | fn | isAutoBackupStorageKey | (private) | `function isAutoBackupStorageKey(name) {` |
| 2263 | fn | ensureGlobalAutoGearBackupDefaults | (private) | `function ensureGlobalAutoGearBackupDefaults() {` |
| 2291 | fn | cloneAutoBackupMetadata | (private) | `function cloneAutoBackupMetadata(metadata) {` |
| 2318 | fn | defineAutoBackupMetadata | (private) | `function defineAutoBackupMetadata(target, metad...` |
| 2342 | fn | getAutoBackupMetadata | (private) | `function getAutoBackupMetadata(value) {` |
| 2355 | fn | copyAutoBackupMetadata | (private) | `function copyAutoBackupMetadata(source, target) {` |
| 2366 | fn | cloneAutoBackupValue | (private) | `function cloneAutoBackupValue(value, options, s...` |
| 2372 | fn | handleCircularClone | (private) | `const handleCircularClone = (input, compute) => {` |
| 2435 | fn | cloneAutoBackupValueWithLegacyNormalization | (private) | `function cloneAutoBackupValueWithLegacyNormaliz...` |
| 2444 | fn | isCompressedAutoBackupSnapshotPayload | (private) | `function isCompressedAutoBackupSnapshotPayload(...` |
| 2454 | fn | prepareAutoBackupSnapshotPayloadForStorage | (private) | `function prepareAutoBackupSnapshotPayloadForSto...` |
| 2676 | fn | restoreAutoBackupSnapshotPayload | (private) | `function restoreAutoBackupSnapshotPayload(snaps...` |
| 2702 | fn | deriveAutoBackupCreatedAt | (private) | `function deriveAutoBackupCreatedAt(name, fallba...` |
| 2721 | fn | detectCyclicAutoBackupReference | (private) | `function detectCyclicAutoBackupReference(entrie...` |
| 2774 | fn | promoteAutoBackupMetadataToFull | (private) | `function promoteAutoBackupMetadataToFull(metada...` |
| 2792 | fn | expandAutoBackupEntries | (private) | `function expandAutoBackupEntries(container, opt...` |
| 2818 | fn | resolve | (private) | `const resolve = (name, stack) => {` |
| 3002 | fn | computeAutoBackupDiff | (private) | `function computeAutoBackupDiff(currentValue, ba...` |
| 3043 | fn | serializeAutoBackupEntries | (private) | `function serializeAutoBackupEntries(entries, op...` |
| 3056 | fn | latestAutoBackupNames | (private) | `const latestAutoBackupNames = (() => {` |
| 3287 | fn | getStorageKeyVariants | (private) | `function getStorageKeyVariants(key) {` |
| 3305 | fn | getDeviceStorageKeyVariants | (private) | `function getDeviceStorageKeyVariants() {` |
| 3315 | fn | isDeviceStorageKeyVariant | (private) | `function isDeviceStorageKeyVariant(key) {` |
| 3328 | fn | shouldAllowCriticalSweepPrimaryInspection | (private) | `function shouldAllowCriticalSweepPrimaryInspect...` |
| 3348 | fn | inspectSetupStorageForQuotaRecovery | (private) | `function inspectSetupStorageForQuotaRecovery(st...` |
| 3463 | fn | createCriticalStorageEntry | (private) | `function createCriticalStorageEntry(candidate, ...` |
| 3486 | fn | gatherCriticalStorageEntries | (private) | `function gatherCriticalStorageEntries(options =...` |
| 3490 | fn | pushEntry | (private) | `const pushEntry = (entry) => {` |
| 3551 | fn | logProviderErrorToConsole | (private) | `function logProviderErrorToConsole() {` |
| 3570 | fn | registerCriticalStorageGuardResult | (private) | `function registerCriticalStorageGuardResult(res...` |
| 3592 | fn | ensureCriticalStorageBackups | (private) | `function ensureCriticalStorageBackups(options =...` |
| 3610 | fn | logGuardErrorToConsole | (private) | `function logGuardErrorToConsole() {` |
| 3666 | fn | logPrimaryReadFailureToConsole | (private) | `function logPrimaryReadFailureToConsole() {` |
| 3699 | fn | logBackupReadFailureToConsole | (private) | `function logBackupReadFailureToConsole() {` |
| 3719 | fn | tryStoreBackup | (private) | `const tryStoreBackup = (candidate) => {` |
| 3728 | fn | recordError | (private) | `const recordError = (error, reason = 'backup-wr...` |
| 3747 | fn | logMirrorErrorToConsole | (private) | `function logMirrorErrorToConsole() {` |
| 3852 | fn | logEnsuredSummaryToConsole | (private) | `function logEnsuredSummaryToConsole() {` |
| 3888 | fn | logErrorSummaryToConsole | (private) | `function logErrorSummaryToConsole() {` |
| 3899 | fn | getLastCriticalStorageGuardResult | (private) | `function getLastCriticalStorageGuardResult() {` |
| 3935 | fn | getAvailableLZStringCompressionStrategies | (private) | `function getAvailableLZStringCompressionStrateg...` |
| 4002 | fn | tryDecompressWithStrategies | (private) | `function tryDecompressWithStrategies(data, vari...` |
| 4057 | fn | canUseMigrationBackupCompression | (private) | `function canUseMigrationBackupCompression() {` |
| 4061 | fn | tryCreateCompressedMigrationBackupCandidate | (private) | `function tryCreateCompressedMigrationBackupCand...` |
| 4145 | fn | parseMigrationBackupMetadata | (private) | `function parseMigrationBackupMetadata(raw) {` |
| 4199 | fn | canUseJsonValueCompression | (private) | `function canUseJsonValueCompression() {` |
| 4203 | fn | createCompressedJsonStorageCandidate | (private) | `function createCompressedJsonStorageCandidate(s...` |
| 4388 | fn | decodeCompressedJsonStorageValue | (private) | `function decodeCompressedJsonStorageValue(raw) {` |
| 4460 | fn | restoreCompressedProjectEntry | (private) | `function restoreCompressedProjectEntry(value, c...` |
| 4500 | fn | markProjectActivity | (private) | `function markProjectActivity(name, timestamp) {` |
| 4521 | fn | markProjectCollectionActivity | (private) | `function markProjectCollectionActivity(projects...` |
| 4539 | fn | removeProjectActivity | (private) | `function removeProjectActivity(name) {` |
| 4555 | fn | normalizeForcedProjectCompressionKey | (private) | `function normalizeForcedProjectCompressionKey(n...` |
| 4564 | fn | isForcedProjectCompressionLocked | (private) | `function isForcedProjectCompressionLocked(name) {` |
| 4587 | fn | ensureProjectEntryUncompressed | (private) | `function ensureProjectEntryUncompressed(value, ...` |
| 4595 | fn | ensureProjectEntriesUncompressed | (private) | `function ensureProjectEntriesUncompressed(conta...` |
| 4611 | fn | registerActiveSetupStorageSkipKeys | (private) | `function registerActiveSetupStorageSkipKeys(ski...` |
| 4631 | fn | registerProtectedCompressionSkipKeys | (private) | `function registerProtectedCompressionSkipKeys(s...` |
| 4665 | fn | maybeDecompressStoredString | (private) | `function maybeDecompressStoredString(raw, optio...` |
| 4686 | fn | attemptStorageCompressionSweep | (private) | `function attemptStorageCompressionSweep(storage...` |
| 4822 | fn | decodeStoredValue | (private) | `function decodeStoredValue(raw) {` |
| 4829 | fn | patchIndividualStorageGetItem | (private) | `function patchIndividualStorageGetItem(storage) {` |
| 4916 | fn | patchStorageGetItemForCompression | (private) | `function patchStorageGetItemForCompression() {` |
| 5014 | fn | getRawStorageGetter | (private) | `function getRawStorageGetter(storage) {` |
| 5032 | fn | readRawStorageValue | (private) | `function readRawStorageValue(storage, key, rawG...` |
| 5052 | fn | collectMigrationBackupEntriesForCleanup | (private) | `function collectMigrationBackupEntriesForCleanu...` |
| 5109 | fn | pruneMigrationBackupEntriesForCleanup | (private) | `function pruneMigrationBackupEntriesForCleanup(...` |
| 5127 | fn | attemptMigrationBackupQuotaRecovery | (private) | `function attemptMigrationBackupQuotaRecovery(st...` |
| 5139 | fn | attemptWrite | (private) | `const attemptWrite = () => {` |
| 5203 | fn | ensurePreWriteMigrationBackup | (private) | `function ensurePreWriteMigrationBackup(storage,...` |
| 5260 | fn | trySerializeMigrationBackupValue | (private) | `function trySerializeMigrationBackupValue(value) {` |
| 5269 | fn | normalizeLegacyMigrationBackupCreatedAt | (private) | `function normalizeLegacyMigrationBackupCreatedA...` |
| 5330 | fn | normalizeLegacyMigrationBackupValue | (private) | `function normalizeLegacyMigrationBackupValue(ra...` |
| 5450 | fn | upgradeLegacyMigrationBackupEntry | (private) | `function upgradeLegacyMigrationBackupEntry(stor...` |
| 5470 | fn | createStorageMigrationBackup | (private) | `function createStorageMigrationBackup(storage, ...` |
| 5517 | fn | tryStoreList | (private) | `const tryStoreList = (candidateList) => {` |
| 5567 | fn | tryStoreSerialized | (private) | `const tryStoreSerialized = (candidate, options ...` |
| 5597 | fn | handleFailure | (private) | `const handleFailure = (error) => {` |
| 5611 | fn | runRecoveryWith | (private) | `const runRecoveryWith = (candidate, options, fa...` |
| 5744 | fn | getStorageManager | (private) | `var getStorageManager = () =>` |
| 5766 | fn | isQuotaExceededError | (private) | `function isQuotaExceededError(error) {` |
| 5782 | fn | hasStoredEntries | (private) | `function hasStoredEntries(storage) {` |
| 5848 | fn | verifyStorage | (private) | `function verifyStorage(storage) {` |
| 5872 | fn | createMemoryStorage | (private) | `function createMemoryStorage() {` |
| 5903 | fn | initializeSafeLocalStorage | (private) | `function initializeSafeLocalStorage() {` |
| 5947 | fn | migrateSnapshotToStorage | (private) | `function migrateSnapshotToStorage(snapshot, tar...` |
| 5991 | fn | clearMigratedKeys | (private) | `function clearMigratedKeys(snapshot, source, ke...` |
| 6009 | fn | rollbackMigratedKeys | (private) | `function rollbackMigratedKeys(target, keys) {` |
| 6023 | fn | snapshotStorageEntries | (private) | `function snapshotStorageEntries(storage, option...` |
| 6031 | fn | captureKey | (private) | `const captureKey = (key) => {` |
| 6101 | fn | updateGlobalSafeLocalStorageReference | (private) | `function updateGlobalSafeLocalStorageReference() {` |
| 6123 | fn | downgradeSafeLocalStorageToMemory | (private) | `function downgradeSafeLocalStorageToMemory(reas...` |
| 6212 | fn | attemptLocalStorageUpgrade | (private) | `function attemptLocalStorageUpgrade() {` |
| 6277 | fn | getSafeLocalStorage | (private) | `function getSafeLocalStorage() {` |
| 6303 | fn | requestPersistentStorage | (private) | `function requestPersistentStorage() {` |
| 6320 | fn | requestPromise | (private) | `const requestPromise = (async () => {` |
| 6395 | fn | isPlainObject | (private) | `function isPlainObject(val) {` |
| 6416 | fn | isMapLike | (private) | `function isMapLike(value) {` |
| 6445 | fn | convertMapLikeKey | (private) | `function convertMapLikeKey(key) {` |
| 6473 | fn | convertMapLikeToObject | (private) | `function convertMapLikeToObject(mapLike) {` |
| 6479 | fn | assignEntry | (private) | `const assignEntry = (rawKey, value) => {` |
| 6529 | fn | inferLegacyLongGopCompressionVariant | (private) | `function inferLegacyLongGopCompressionVariant(v...` |
| 6557 | fn | normalizeLegacyLongGopString | (private) | `function normalizeLegacyLongGopString(value) {` |
| 6570 | fn | normalizeLegacyLongGopKey | (private) | `function normalizeLegacyLongGopKey(key) {` |
| 6578 | fn | normalizeLegacyLongGopStructure | (private) | `function normalizeLegacyLongGopStructure(value,...` |
| 6619 | fn | normalizeLegacyLongGopBackups | (private) | `function normalizeLegacyLongGopBackups(backups) {` |
| 6639 | fn | parseAutoBackupKey | (private) | `function parseAutoBackupKey(name) {` |
| 6644 | fn | parseWithPrefix | (private) | `const parseWithPrefix = (prefix, options = {}) ...` |
| 6709 | fn | collectAutoBackupEntries | (private) | `function collectAutoBackupEntries(container, pr...` |
| 6728 | fn | markAutoBackupValueAsRenamed | (private) | `function markAutoBackupValueAsRenamed(value) {` |
| 6758 | fn | isAutoBackupValueRenamed | (private) | `function isAutoBackupValueRenamed(value) {` |
| 6774 | fn | isRenamedAutoBackupEntry | (private) | `function isRenamedAutoBackupEntry(container, ke...` |
| 6781 | fn | getAutoBackupLabelKey | (private) | `function getAutoBackupLabelKey(entry) {` |
| 6804 | fn | getAutoBackupEntrySignature | (private) | `function getAutoBackupEntrySignature(container,...` |
| 6840 | fn | createStableValueSignature | (private) | `function createStableValueSignature(value, stat...` |
| 6846 | fn | handleCircularSignature | (private) | `const handleCircularSignature = (input, compute...` |
| 6955 | fn | removeSingleDuplicateAutoBackupEntry | (private) | `function removeSingleDuplicateAutoBackupEntry(c...` |
| 7011 | fn | removeDuplicateAutoBackupEntries | (private) | `function removeDuplicateAutoBackupEntries(conta...` |
| 7023 | fn | pruneAutoBackupEntries | (private) | `function pruneAutoBackupEntries(container, entr...` |
| 7082 | fn | enforceAutoBackupLimits | (private) | `function enforceAutoBackupLimits(container) {` |
| 7111 | fn | removeOldestAutoBackupEntry | (private) | `function removeOldestAutoBackupEntry(container,...` |
| 7118 | fn | removeFromEntries | (private) | `const removeFromEntries = (entries, { respectRe...` |
| 7185 | fn | describeAutoGearBackupEntry | (private) | `function describeAutoGearBackupEntry(entry) {` |
| 7211 | fn | removeOldestAutoGearBackupEntry | (private) | `function removeOldestAutoGearBackupEntry(backup...` |
| 7216 | fn | removeAt | (private) | `const removeAt = (index) => {` |
| 7237 | fn | cleanupAutoGearBackupMigrationCopies | (private) | `function cleanupAutoGearBackupMigrationCopies(s...` |
| 7278 | fn | clearCachedPlannerDataForAutoGearBackups | (private) | `function clearCachedPlannerDataForAutoGearBacku...` |
| 7299 | fn | shouldDisplayStorageAlert | (private) | `function shouldDisplayStorageAlert(reason) {` |
| 7315 | fn | alertStorageError | (private) | `function alertStorageError(reason) {` |
| 7349 | fn | alertSessionFallback | (private) | `function alertSessionFallback() {` |
| 7377 | fn | getWindowStorage | (private) | `function getWindowStorage(name) {` |
| 7390 | fn | collectUniqueStorages | (private) | `function collectUniqueStorages(storages) {` |
| 7411 | fn | migrateKeyBetweenStorages | (private) | `function migrateKeyBetweenStorages(source, targ...` |
| 7467 | fn | migrateKeyInStorages | (private) | `function migrateKeyInStorages(storages, preferr...` |
| 7477 | fn | migrateLegacyStorageKeys | (private) | `function migrateLegacyStorageKeys() {` |
| 7542 | fn | applyLegacyStorageMigrations | (private) | `function applyLegacyStorageMigrations() {` |
| 7547 | fn | isSessionStorageInstance | (private) | `function isSessionStorageInstance(storage) {` |
| 7600 | fn | loadJSONFromStorage | (private) | `function loadJSONFromStorage(` |
| 7626 | fn | migrationBackupCandidates | (private) | `const migrationBackupCandidates = (() => {` |
| 7630 | fn | pushCandidate | (private) | `const pushCandidate = (candidate) => {` |
| 7658 | fn | parseRawValue | (private) | `const parseRawValue = (raw, label) => {` |
| 7742 | fn | attemptMigrationBackupRecovery | (private) | `const attemptMigrationBackupRecovery = () => {` |
| 7993 | fn | saveJSONToStorage | (private) | `function saveJSONToStorage(` |
| 8027 | fn | loadRawValue | (private) | `const loadRawValue = (targetKey) => readRawStor...` |
| 8036 | fn | resetSerializationState | (private) | `const resetSerializationState = () => {` |
| 8045 | fn | computeStandardSerialized | (private) | `const computeStandardSerialized = () => {` |
| 8060 | fn | computeCompressedSerialized | (private) | `const computeCompressedSerialized = () => {` |
| 8083 | fn | getSerializedForAttempt | (private) | `const getSerializedForAttempt = () => {` |
| 8099 | fn | tryEnableCompression | (private) | `const tryEnableCompression = ({ force = false }...` |
| 8127 | fn | logCompressionIfNeeded | (private) | `const logCompressionIfNeeded = () => {` |
| 8147 | fn | maybeEnableProactiveCompression | (private) | `const maybeEnableProactiveCompression = () => {` |
| 8198 | fn | registerQuotaRecoveryStep | (private) | `const registerQuotaRecoveryStep = () => {` |
| 8208 | fn | attemptStorageCleanup | (private) | `const attemptStorageCleanup = (storage, options...` |
| 8290 | fn | attemptHandleQuota | (private) | `const attemptHandleQuota = (error, context = {}...` |
| 8404 | fn | backupCandidates | (private) | `const backupCandidates = (() => {` |
| 8518 | fn | attemptBackupWrite | (private) | `const attemptBackupWrite = () => {` |
| 8527 | fn | tryStoreCandidate | (private) | `const tryStoreCandidate = (candidate) => {` |
| 8655 | fn | deleteFromStorage | (private) | `function deleteFromStorage(storage, key, errorM...` |
| 8713 | fn | collectUiCacheStorages | (private) | `function collectUiCacheStorages() {` |
| 8717 | fn | pushCandidate | (private) | `const pushCandidate = (candidate) => {` |
| 8724 | fn | readProperty | (private) | `const readProperty = (scope, property, label) => {` |
| 8739 | fn | inspectScope | (private) | `const inspectScope = (scope, label) => {` |
| 8794 | fn | clearUiCacheStorageEntries | (private) | `function clearUiCacheStorageEntries() {` |
| 8816 | fn | loadFlagFromStorage | (private) | `function loadFlagFromStorage(storage, key, erro...` |
| 8828 | fn | saveFlagToStorage | (private) | `function saveFlagToStorage(storage, key, value,...` |
| 8846 | fn | loadWithMigration | (private) | `function loadWithMigration(` |
| 8882 | fn | generateUniqueName | (private) | `function generateUniqueName(base, usedNames, no...` |
| 8900 | fn | ensureImportedProjectBaseName | (private) | `function ensureImportedProjectBaseName(rawName) {` |
| 8921 | fn | resolveImportedProjectNamingContext | (private) | `function resolveImportedProjectNamingContext(ra...` |
| 8954 | fn | generateImportedProjectName | (private) | `function generateImportedProjectName(baseName, ...` |
| 8987 | fn | ensureUpdatedProjectBaseName | (private) | `function ensureUpdatedProjectBaseName(rawName) {` |
| 8998 | fn | generateUpdatedProjectName | (private) | `function generateUpdatedProjectName(baseName, u...` |
| 9018 | fn | collectStringValues | (private) | `function collectStringValues(value) {` |
| 9041 | fn | arraysEqual | (private) | `function arraysEqual(a, b) {` |
| 9056 | fn | normalizeDiagramPositions | (private) | `function normalizeDiagramPositions(positions) {` |
| 9076 | fn | diagramPositionsEqual | (private) | `function diagramPositionsEqual(a, b) {` |
| 9099 | fn | normalizeSessionStatePayload | (private) | `function normalizeSessionStatePayload(raw) {` |
| 9107 | fn | normalizeStringField | (private) | `const normalizeStringField = (key) => {` |
| 9149 | fn | mergeArrayField | (private) | `const mergeArrayField = (targetKey, legacyKeys ...` |
| 9233 | fn | loadSessionState | (private) | `function loadSessionState() {` |
| 9263 | fn | saveSessionState | (private) | `function saveSessionState(state, options = {}) {` |
| 9329 | fn | normalizeDeviceDataPayload | (private) | `function normalizeDeviceDataPayload(rawData) {` |
| 9337 | fn | ensureObject | (private) | `const ensureObject = (target, key) => {` |
| 9345 | fn | mergeTrailingSpaceKeys | (private) | `const mergeTrailingSpaceKeys = (collection) => {` |
| 9422 | fn | loadDeviceData | (private) | `function loadDeviceData() {` |
| 9454 | fn | saveDeviceData | (private) | `function saveDeviceData(deviceData) {` |
| 9487 | fn | normalizeSetups | (private) | `function normalizeSetups(rawData) {` |
| 9534 | fn | loadSetups | (private) | `function loadSetups() {` |
| 9569 | fn | saveSetups | (private) | `function saveSetups(setups) {` |
| 9609 | fn | updateSetups | (private) | `function updateSetups(callback) {` |
| 9618 | fn | saveSetup | (private) | `function saveSetup(name, setup) {` |
| 9625 | fn | loadSetup | (private) | `function loadSetup(name) {` |
| 9630 | fn | deleteSetup | (private) | `function deleteSetup(name) {` |
| 9640 | fn | renameSetup | (private) | `function renameSetup(oldName, newName) {` |
| 9973 | fn | normalizeProjectFieldLabel | (private) | `function normalizeProjectFieldLabel(label) {` |
| 9980 | fn | getProductionCompanyLabelSets | (private) | `function getProductionCompanyLabelSets(projectL...` |
| 10009 | fn | expandCombinedProductionCompanyInfo | (private) | `function expandCombinedProductionCompanyInfo(ra...` |
| 10143 | fn | LEGACY_PROJECT_LABEL_FIELD_MAP | (private) | `var LEGACY_PROJECT_LABEL_FIELD_MAP = (() => {` |
| 10145 | fn | normalize | (private) | `const normalize = (label) => {` |
| 10175 | fn | decodeHtmlEntities | (private) | `function decodeHtmlEntities(value) {` |
| 10192 | fn | stripHtmlTags | (private) | `function stripHtmlTags(value) {` |
| 10203 | fn | normalizeRequirementValueFromHtml | (private) | `function normalizeRequirementValueFromHtml(rawH...` |
| 10227 | fn | extractRequirementValueMetadata | (private) | `function extractRequirementValueMetadata(rawHtm...` |
| 10257 | fn | mapLegacyRequirementLabel | (private) | `function mapLegacyRequirementLabel(labelText) {` |
| 10274 | fn | extractProjectInfoFromHtml | (private) | `function extractProjectInfoFromHtml(html) {` |
| 10358 | fn | cloneProjectData | (private) | `function cloneProjectData(value) {` |
| 10372 | fn | cloneProjectInfo | (private) | `function cloneProjectInfo(projectInfo) {` |
| 10389 | fn | sanitizeImportedCrewEntries | (private) | `function sanitizeImportedCrewEntries(entries) {` |
| 10438 | fn | sanitizeImportedValue | (private) | `function sanitizeImportedValue(value) {` |
| 10464 | fn | sanitizeImportedProjectInfo | (private) | `function sanitizeImportedProjectInfo(info) {` |
| 10471 | fn | addFallbackLensName | (private) | `const addFallbackLensName = (name) => {` |
| 10482 | fn | registerFallbackLensNames | (private) | `const registerFallbackLensNames = (source, opti...` |
| 10578 | fn | cloneAutoGearRules | (private) | `function cloneAutoGearRules(rules) {` |
| 10595 | fn | cloneDiagramPositionsForStorage | (private) | `function cloneDiagramPositionsForStorage(positi...` |
| 10614 | fn | normalizeImportedFilterValues | (private) | `function normalizeImportedFilterValues(raw) {` |
| 10684 | fn | normalizeImportedFilterEntry | (private) | `function normalizeImportedFilterEntry(entry, fa...` |
| 10815 | fn | serializeNormalizedFilterEntry | (private) | `function serializeNormalizedFilterEntry(entry) {` |
| 10837 | fn | normalizeImportedFilterValue | (private) | `function normalizeImportedFilterValue(value) {` |
| 10897 | fn | normalizeImportedProjectFilters | (private) | `function normalizeImportedProjectFilters(info) {` |
| 10925 | fn | cloneProjectGearSelectors | (private) | `function cloneProjectGearSelectors(selectors) {` |
| 10930 | fn | cloneSelectorValue | (private) | `const cloneSelectorValue = (value) => {` |
| 10980 | fn | normalizeProjectPowerSelection | (private) | `function normalizeProjectPowerSelection(raw) {` |
| 10984 | fn | normalizeString | (private) | `const normalizeString = (value) => {` |
| 11008 | fn | cloneProjectPowerSelection | (private) | `function cloneProjectPowerSelection(selection) {` |
| 11058 | fn | isLikelyLensNameKey | (private) | `function isLikelyLensNameKey(key) {` |
| 11082 | fn | deriveLensNameKeysFromObject | (private) | `function deriveLensNameKeysFromObject(value) {` |
| 11100 | fn | normalizeProjectLensNameCandidate | (private) | `function normalizeProjectLensNameCandidate(valu...` |
| 11183 | fn | extractLensNamesFromSource | (private) | `function extractLensNamesFromSource(value) {` |
| 11288 | fn | normalizeProjectLensNamesField | (private) | `function normalizeProjectLensNamesField(value) {` |
| 11298 | fn | normalizeProjectLensSelectionEntry | (private) | `function normalizeProjectLensSelectionEntry(ent...` |
| 11418 | fn | deriveLensSelectionsFromNameMap | (private) | `function deriveLensSelectionsFromNameMap(source) {` |
| 11514 | fn | normalizeProjectLensSelectionsFromSources | (private) | `function normalizeProjectLensSelectionsFromSour...` |
| 11520 | fn | addSelection | (private) | `const addSelection = (selection, entryChanged) ...` |
| 11575 | fn | processSourceValue | (private) | `const processSourceValue = (source) => {` |
| 11699 | fn | normalizeProject | (private) | `function normalizeProject(data) {` |
| 11759 | fn | assignAutoGearRules | (private) | `const assignAutoGearRules = (source) => {` |
| 11981 | fn | addFallbackLensName | (private) | `const addFallbackLensName = (name) => {` |
| 11992 | fn | registerFallbackLensNames | (private) | `const registerFallbackLensNames = (source, opti...` |
| 12225 | fn | isNormalizedProjectEntry | (private) | `function isNormalizedProjectEntry(entry) {` |
| 12278 | fn | normalizeProjectStorageKey | (private) | `function normalizeProjectStorageKey(name) {` |
| 12285 | fn | setActiveProjectCompressionHold | (private) | `function setActiveProjectCompressionHold(name) {` |
| 12303 | fn | clearActiveProjectCompressionHold | (private) | `function clearActiveProjectCompressionHold(name) {` |
| 12322 | fn | resolveProjectKey | (private) | `function resolveProjectKey(projects, lookup, na...` |
| 12386 | fn | buildProjectLookupFromProjects | (private) | `function buildProjectLookupFromProjects(project...` |
| 12406 | fn | readAllProjectsFromStorage | (private) | `function readAllProjectsFromStorage(options = {...` |
| 12508 | fn | markProjectNameUsed | (private) | `const markProjectNameUsed = (name) => {` |
| 12521 | fn | registerLookupKey | (private) | `const registerLookupKey = (rawKey, storedKey) => {` |
| 12534 | fn | createLookupSnapshot | (private) | `const createLookupSnapshot = () => ({` |
| 12539 | fn | finalize | (private) | `const finalize = () => {` |
| 12697 | fn | pruneOrphanProjectShards | (private) | `function pruneOrphanProjectShards(storage, proj...` |
| 12719 | fn | cleanupMonolithicProjectStorage | (private) | `function cleanupMonolithicProjectStorage(storag...` |
| 12764 | fn | persistProjectShard | (private) | `function persistProjectShard(name, project, opt...` |
| 12817 | fn | persistAllProjects | (private) | `function persistAllProjects(projects, options =...` |
| 12865 | fn | normalizeProjectIndexForCache | (private) | `function normalizeProjectIndexForCache(index) {` |
| 12912 | fn | buildProjectIndexForRepo | (private) | `function buildProjectIndexForRepo(index) {` |
| 12931 | fn | migrateProjectKeyPrefixOnStartup | (private) | `async function migrateProjectKeyPrefixOnStartup...` |
| 12965 | fn | readProjectIndex | (private) | `function readProjectIndex() {` |
| 13001 | fn | updateProjectIndex | (private) | `function updateProjectIndex(projects, safeStora...` |
| 13045 | fn | loadProject | (private) | `function loadProject(name) {` |
| 13095 | fn | loadProjectMetadata | (private) | `function loadProjectMetadata() {` |
| 13144 | fn | sanitizeProjectNameForBackup | (private) | `function sanitizeProjectNameForBackup(name) {` |
| 13158 | fn | formatAutoBackupTimestamp | (private) | `function formatAutoBackupTimestamp(date) {` |
| 13159 | fn | pad | (private) | `const pad = (value) => String(value).padStart(2...` |
| 13170 | fn | generateDeletionBackupMetadata | (private) | `function generateDeletionBackupMetadata(project...` |
| 13190 | fn | cloneProjectEntryForBackup | (private) | `function cloneProjectEntryForBackup(entry) {` |
| 13209 | fn | maybeCreateProjectDeletionBackup | (private) | `function maybeCreateProjectDeletionBackup(proje...` |
| 13237 | fn | createProjectDeletionBackup | (private) | `function createProjectDeletionBackup(name) {` |
| 13271 | fn | generateOverwriteBackupMetadata | (private) | `function generateOverwriteBackupMetadata(projec...` |
| 13290 | fn | maybeCreateProjectOverwriteBackup | (private) | `function maybeCreateProjectOverwriteBackup(proj...` |
| 13334 | fn | saveProject | (private) | `function saveProject(name, project, options = {...` |
| 13544 | fn | deleteProject | (private) | `function deleteProject(name) {` |
| 13684 | fn | renameProject | (private) | `function renameProject(oldName, newName) {` |
| 13733 | fn | createProjectImporter | (private) | `function createProjectImporter() {` |
| 13794 | fn | tryParseJSONLike | (private) | `function tryParseJSONLike(value) {` |
| 13827 | fn | importProjectCollection | (private) | `function importProjectCollection(collection, en...` |
| 13909 | fn | collectLegacyProjectCollections | (private) | `function collectLegacyProjectCollections(contai...` |
| 13915 | fn | addCollection | (private) | `const addCollection = (value) => {` |
| 13994 | fn | loadFavorites | (private) | `function loadFavorites() {` |
| 14007 | fn | saveFavorites | (private) | `function saveFavorites(favs) {` |
| 14032 | fn | resolveContactsModuleApi | (private) | `function resolveContactsModuleApi() {` |
| 14070 | fn | fallbackSanitizeContactValue | (private) | `function fallbackSanitizeContactValue(value) {` |
| 14116 | fn | fallbackGenerateContactId | (private) | `function fallbackGenerateContactId(moduleApi) {` |
| 14130 | fn | fallbackNormalizeContactEntry | (private) | `function fallbackNormalizeContactEntry(entry, m...` |
| 14156 | fn | fallbackSortContacts | (private) | `function fallbackSortContacts(list) {` |
| 14189 | fn | normalizeContactsList | (private) | `function normalizeContactsList(entries) {` |
| 14244 | fn | loadContacts | (private) | `function loadContacts() {` |
| 14260 | fn | saveContacts | (private) | `function saveContacts(contacts) {` |
| 14292 | fn | loadOwnGear | (private) | `function loadOwnGear() {` |
| 14296 | fn | saveOwnGear | (private) | `function saveOwnGear(data) {` |
| 14300 | fn | normalizeUserProfileField | (private) | `function normalizeUserProfileField(value) {` |
| 14334 | fn | normalizeUserProfile | (private) | `function normalizeUserProfile(entry) {` |
| 14355 | fn | loadUserProfile | (private) | `function loadUserProfile() {` |
| 14371 | fn | saveUserProfile | (private) | `function saveUserProfile(profile) {` |
| 14407 | fn | loadFeedback | (private) | `function loadFeedback() {` |
| 14423 | fn | saveFeedback | (private) | `function saveFeedback(feedback) {` |
| 14448 | fn | normalizeFullBackupHistoryEntry | (private) | `function normalizeFullBackupHistoryEntry(entry) {` |
| 14481 | fn | loadFullBackupHistory | (private) | `function loadFullBackupHistory(forceRefresh = f...` |
| 14516 | fn | saveFullBackupHistory | (private) | `function saveFullBackupHistory(entries) {` |
| 14590 | fn | recordFullBackupHistoryEntry | (private) | - |
| 14602 | fn | normalizeImportedFullBackupHistory | (private) | `function normalizeImportedFullBackupHistory(val...` |
| 14698 | fn | generateDocumentationTrackerId | (private) | `function generateDocumentationTrackerId() {` |
| 14720 | fn | normalizeDocumentationTrackerStatusEntry | (private) | `function normalizeDocumentationTrackerStatusEnt...` |
| 14761 | fn | normalizeDocumentationTrackerStatusMap | (private) | `function normalizeDocumentationTrackerStatusMap...` |
| 14814 | fn | normalizeDocumentationTrackerStatuses | (private) | `function normalizeDocumentationTrackerStatuses(...` |
| 14836 | fn | normalizeDocumentationTrackerRelease | (private) | `function normalizeDocumentationTrackerRelease(e...` |
| 14929 | fn | normalizeDocumentationTrackerState | (private) | `function normalizeDocumentationTrackerState(sta...` |
| 14982 | fn | loadDocumentationTracker | (private) | `function loadDocumentationTracker() {` |
| 15008 | fn | saveDocumentationTracker | (private) | `function saveDocumentationTracker(state) {` |
| 15043 | fn | loadAutoGearRules | (private) | `function loadAutoGearRules() {` |
| 15080 | fn | saveAutoGearRules | (private) | `function saveAutoGearRules(rules, options = {}) {` |
| 15101 | fn | loadAutoGearBackups | (private) | `function loadAutoGearBackups() {` |
| 15156 | fn | saveAutoGearBackups | (private) | `function saveAutoGearBackups(backups, options =...` |
| 15256 | fn | loadAutoGearSeedFlag | (private) | `function loadAutoGearSeedFlag() {` |
| 15266 | fn | saveAutoGearSeedFlag | (private) | `function saveAutoGearSeedFlag(flag) {` |
| 15276 | fn | loadAutoGearPresets | (private) | `function loadAutoGearPresets() {` |
| 15317 | fn | readActiveAutoGearPresetIds | (private) | `function readActiveAutoGearPresetIds() {` |
| 15319 | fn | pushId | (private) | `const pushId = (candidate) => {` |
| 15347 | fn | saveAutoGearPresets | (private) | `function saveAutoGearPresets(presets, options =...` |
| 15389 | fn | loadAutoGearMonitorDefaults | (private) | `function loadAutoGearMonitorDefaults() {` |
| 15414 | fn | saveAutoGearMonitorDefaults | (private) | `function saveAutoGearMonitorDefaults(defaults, ...` |
| 15442 | fn | removeAutoGearPresetFromStorage | (private) | `function removeAutoGearPresetFromStorage(preset...` |
| 15497 | fn | loadAutoGearActivePresetId | (private) | `function loadAutoGearActivePresetId() {` |
| 15519 | fn | saveAutoGearActivePresetId | (private) | `function saveAutoGearActivePresetId(presetId) {` |
| 15550 | fn | loadAutoGearAutoPresetId | (private) | `function loadAutoGearAutoPresetId() {` |
| 15598 | fn | saveAutoGearAutoPresetId | (private) | `function saveAutoGearAutoPresetId(presetId) {` |
| 15654 | fn | loadAutoGearBackupVisibility | (private) | `function loadAutoGearBackupVisibility() {` |
| 15669 | fn | saveAutoGearBackupVisibility | (private) | `function saveAutoGearBackupVisibility(flag) {` |
| 15687 | fn | getAutoGearBackupRetentionUpperBound | (private) | `function getAutoGearBackupRetentionUpperBound() {` |
| 15708 | fn | clampAutoGearBackupRetention | (private) | `function clampAutoGearBackupRetention(value) {` |
| 15727 | fn | getAutoGearBackupRetentionDefault | (private) | `function getAutoGearBackupRetentionDefault() {` |
| 15758 | fn | normalizeAutoGearBackupRetentionValue | (private) | `function normalizeAutoGearBackupRetentionValue(...` |
| 15806 | fn | loadAutoGearBackupRetention | (private) | `function loadAutoGearBackupRetention() {` |
| 15831 | fn | saveAutoGearBackupRetention | (private) | `function saveAutoGearBackupRetention(retention) {` |
| 15865 | fn | clearAllData | (private) | `async function clearAllData() {` |
| 15872 | fn | clearStorageFully | (private) | `const clearStorageFully = (storage, storageName...` |
| 15997 | fn | readLocalStorageValue | (private) | `function readLocalStorageValue(key) {` |
| 16062 | fn | parseStoredBoolean | (private) | `function parseStoredBoolean(value) {` |
| 16100 | fn | interpretPrintPreferencesValue | (private) | `function interpretPrintPreferencesValue(rawValu...` |
| 16179 | fn | collectPreferenceSnapshot | (private) | `function collectPreferenceSnapshot() {` |
| 16318 | fn | normalizeCustomFontEntries | (private) | `function normalizeCustomFontEntries(entries) {` |
| 16331 | fn | readStoredCustomFonts | (private) | `function readStoredCustomFonts() {` |
| 16348 | fn | normalizeBackupVaultMetadata | (private) | `function normalizeBackupVaultMetadata(metadata) {` |
| 16365 | fn | normalizeBackupVaultRecord | (private) | `function normalizeBackupVaultRecord(record) {` |
| 16403 | fn | normalizeBackupVaultRecordList | (private) | `function normalizeBackupVaultRecordList(records) {` |
| 16425 | fn | scoreBackupVaultRecord | (private) | `function scoreBackupVaultRecord(record) {` |
| 16448 | fn | mergeBackupVaultRecords | (private) | `function mergeBackupVaultRecords(existingList, ...` |
| 16450 | fn | mergeList | (private) | `const mergeList = (records) => {` |
| 16470 | fn | readBackupVaultFallbackRecords | (private) | `function readBackupVaultFallbackRecords() {` |
| 16475 | fn | resolveBackupVaultApi | (private) | `function resolveBackupVaultApi() {` |
| 16485 | fn | refreshBackupVaultRecordCache | (private) | `function refreshBackupVaultRecordCache() {` |
| 16522 | fn | resolveAutoGearPersistence | (private) | `function resolveAutoGearPersistence() {` |
| 16532 | fn | getAutoGearSnapshotFromCache | (private) | `function getAutoGearSnapshotFromCache() {` |
| 16541 | fn | readValue | (private) | `const readValue = (key, fallback, readerName) => {` |
| 16567 | fn | prepareBackupForExport | (private) | `async function prepareBackupForExport() {` |
| 16572 | fn | exportAllData | (private) | `function exportAllData() {` |
| 16684 | fn | safeSetLocalStorage | (private) | `function safeSetLocalStorage(key, value) {` |
| 16736 | fn | clearCacheForKey | (private) | `const clearCacheForKey = () => {` |
| 16752 | fn | writeLegacyStorage | (private) | `const writeLegacyStorage = (storedValue) => {` |
| 16870 | fn | normalizeImportedBoolean | (private) | `function normalizeImportedBoolean(value) {` |
| 16918 | fn | normalizeImportedArray | (private) | `function normalizeImportedArray(value, fallback...` |
| 16964 | fn | normalizeImportedContacts | (private) | `function normalizeImportedContacts(value) {` |
| 16976 | fn | normalizeImportedAutoGearRules | (private) | `function normalizeImportedAutoGearRules(value) {` |
| 16988 | fn | normalizeImportedAutoGearBackups | (private) | `function normalizeImportedAutoGearBackups(value) {` |
| 17001 | fn | normalizeImportedAutoGearBackupRetention | (private) | `function normalizeImportedAutoGearBackupRetenti...` |
| 17052 | fn | normalizeImportedAutoGearPresets | (private) | `function normalizeImportedAutoGearPresets(value) {` |
| 17064 | fn | normalizeImportedAutoGearMonitorDefaults | (private) | `function normalizeImportedAutoGearMonitorDefaul...` |
| 17079 | fn | normalizeImportedPresetId | (private) | `function normalizeImportedPresetId(value) {` |
| 17109 | fn | normalizeImportedBackupVaultRecords | (private) | `function normalizeImportedBackupVaultRecords(va...` |
| 17118 | fn | importBackupVaultRecords | (private) | `function importBackupVaultRecords(records) {` |
| 17137 | fn | queueRecord | (private) | `const queueRecord = (record) => {` |
| 17201 | fn | getSnapshotKeyVariants | (private) | `function getSnapshotKeyVariants(key) {` |
| 17205 | fn | readSnapshotEntry | (private) | `function readSnapshotEntry(snapshot, key) {` |
| 17237 | fn | extractSnapshotStoredValue | (private) | `function extractSnapshotStoredValue(entry) {` |
| 17316 | fn | parseSnapshotJSONValue | (private) | `function parseSnapshotJSONValue(entry) {` |
| 17348 | fn | parseSnapshotStringValue | (private) | `function parseSnapshotStringValue(entry) {` |
| 17394 | fn | convertStorageSnapshotToData | (private) | `function convertStorageSnapshotToData(snapshot) {` |
| 17468 | fn | markSnapshotEntry | (private) | `const markSnapshotEntry = (entry) => {` |
| 17488 | fn | assignJSONValue | (private) | `const assignJSONValue = (storageKey, targetKey)...` |
| 17676 | fn | importAllData | (private) | `function importAllData(allData, options = {}) {` |
| 17697 | fn | hasOwn | (private) | `const hasOwn = (key) => Object.prototype.hasOwn...` |
| 17702 | fn | persistAutoGearValue | (private) | `const persistAutoGearValue = (methodName, fallb...` |
| 17904 | fn | applyImportedCameraColors | (private) | `const applyImportedCameraColors = (palette) => {` |
| 18071 | fn | ensureProjectImporter | (private) | `const ensureProjectImporter = () => {` |
| 18079 | fn | getTrackedImporter | (private) | `const getTrackedImporter = () => {` |
| 18087 | fn | importTrackedCollection | (private) | `const importTrackedCollection = (collection, fa...` |
| 18088 | fn | wrapped | (private) | `const wrapped = () => getTrackedImporter();` |
| 18138 | fn | getProjectMemoryCache | (private) | `function getProjectMemoryCache() {` |

## Memory Markers

### 🟢 `NOTE` (line 12796)

> we don't want forMutation: true here because we are in the middle of a save.

### 🟢 `NOTE` (line 15113)

> Since this is a synchronous load for UI, and backups might be large,

### 🟢 `NOTE` (line 15172)

> Auto Gear Backups are large, so we might skip full in-memory caching if needed,

