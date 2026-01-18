# legacy/scripts/storage.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 14991
- **Language:** JavaScript
- **Symbols:** 384
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 1 | fn | _createForOfIteratorHelper | (private) | `function _createForOfIteratorHelper(r, e) { var...` |
| 2 | fn | _slicedToArray | (private) | `function _slicedToArray(r, e) { return _arrayWi...` |
| 3 | fn | _nonIterableRest | (private) | `function _nonIterableRest() { throw new TypeErr...` |
| 4 | fn | _iterableToArrayLimit | (private) | `function _iterableToArrayLimit(r, l) { var t = ...` |
| 5 | fn | _arrayWithHoles | (private) | `function _arrayWithHoles(r) { if (Array.isArray...` |
| 6 | fn | _regenerator | (private) | `function _regenerator() { var e, t, r = "functi...` |
| 7 | fn | _regeneratorDefine2 | (private) | `function _regeneratorDefine2(e, r, n, t) { var ...` |
| 8 | fn | asyncGeneratorStep | (private) | `function asyncGeneratorStep(n, t, e, r, o, a, c...` |
| 9 | fn | _asyncToGenerator | (private) | `function _asyncToGenerator(n) { return function...` |
| 10 | fn | _toConsumableArray | (private) | `function _toConsumableArray(r) { return _arrayW...` |
| 11 | fn | _nonIterableSpread | (private) | `function _nonIterableSpread() { throw new TypeE...` |
| 12 | fn | _unsupportedIterableToArray | (private) | `function _unsupportedIterableToArray(r, a) { if...` |
| 13 | fn | _iterableToArray | (private) | `function _iterableToArray(r) { if ("undefined" ...` |
| 14 | fn | _arrayWithoutHoles | (private) | `function _arrayWithoutHoles(r) { if (Array.isAr...` |
| 15 | fn | _arrayLikeToArray | (private) | `function _arrayLikeToArray(r, a) { (null == a |...` |
| 16 | fn | ownKeys | (private) | `function ownKeys(e, r) { var t = Object.keys(e)...` |
| 17 | fn | _objectSpread | (private) | `function _objectSpread(e) { for (var r = 1; r <...` |
| 18 | fn | _defineProperty | (private) | `function _defineProperty(e, r, t) { return (r =...` |
| 19 | fn | _toPropertyKey | (private) | `function _toPropertyKey(t) { var i = _toPrimiti...` |
| 20 | fn | _toPrimitive | (private) | `function _toPrimitive(t, r) { if ("object" != _...` |
| 21 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 89 | fn | closeStorageLifecycle | (private) | `function closeStorageLifecycle() {` |
| 102 | fn | storageManualDeepClone | (private) | `function storageManualDeepClone(value, referenc...` |
| 158 | fn | storageJsonDeepClone | (private) | `function storageJsonDeepClone(value) {` |
| 169 | fn | storageResolveStructuredClone | (private) | `function storageResolveStructuredClone(scope) {` |
| 200 | fn | storageCreateResilientDeepClone | (private) | `function storageCreateResilientDeepClone(scope) {` |
| 219 | fn | registerKnownSessionStorage | (private) | `function registerKnownSessionStorage(storage) {` |
| 229 | fn | resolveSessionStorageFromScope | (private) | `function resolveSessionStorageFromScope(scope) {` |
| 259 | fn | resolveLocalStorageFromScope | (private) | `function resolveLocalStorageFromScope(scope) {` |
| 273 | fn | collectLocalStorageCandidates | (private) | `function collectLocalStorageCandidates() {` |
| 305 | fn | isFactoryResetActive | (private) | `function isFactoryResetActive() {` |
| 367 | fn | cloneAutoBackupCompressionValue | (private) | `function cloneAutoBackupCompressionValue(value) {` |
| 383 | fn | readAutoBackupCompressionCache | (private) | `function readAutoBackupCompressionCache(signatu...` |
| 402 | fn | writeAutoBackupCompressionCache | (private) | `function writeAutoBackupCompressionCache(signat...` |
| 433 | fn | resetAutoBackupCompressionCache | (private) | `function resetAutoBackupCompressionCache() {` |
| 473 | fn | collectStorageLoggingScopes | (private) | `function collectStorageLoggingScopes() {` |
| 490 | fn | resolveStorageLoggingResolver | (private) | `function resolveStorageLoggingResolver() {` |
| 524 | fn | resolveStorageLogger | (private) | `function resolveStorageLogger() {` |
| 548 | fn | sanitizeStorageError | (private) | `function sanitizeStorageError(error) {` |
| 577 | fn | getActiveStorageType | (private) | `function getActiveStorageType(storage) {` |
| 602 | fn | logStorageEvent | (private) | `function logStorageEvent(level, message, detail...` |
| 671 | fn | getCompressionLogTimestamp | (private) | `function getCompressionLogTimestamp() {` |
| 685 | fn | logCompressionSavingsEvent | (private) | `function logCompressionSavingsEvent(kind, ident...` |
| 802 | fn | getCompressionLogSnapshot | (private) | `function getCompressionLogSnapshot() {` |
| 833 | fn | getCompressionStrategyCacheKey | (private) | `function getCompressionStrategyCacheKey(variant...` |
| 847 | fn | readCompressionStrategyCache | (private) | `function readCompressionStrategyCache(cacheKey,...` |
| 866 | fn | pruneCompressionStrategyCache | (private) | `function pruneCompressionStrategyCache(cacheKey) {` |
| 886 | fn | writeCompressionStrategyCache | (private) | `function writeCompressionStrategyCache(cacheKey...` |
| 901 | fn | computeStorageCompressionWrapperBaseLength | (private) | `function computeStorageCompressionWrapperBaseLe...` |
| 921 | fn | createCompressionCandidateCache | (private) | `function createCompressionCandidateCache(limit) {` |
| 935 | fn | cloneCompressionCandidate | (private) | `function cloneCompressionCandidate(candidate) {` |
| 946 | fn | touchCompressionCandidateCacheKey | (private) | `function touchCompressionCandidateCacheKey(cach...` |
| 956 | fn | readCompressionCandidateCacheEntry | (private) | `function readCompressionCandidateCacheEntry(cac...` |
| 1000 | fn | writeCompressionCandidateCacheEntry | (private) | `function writeCompressionCandidateCacheEntry(ca...` |
| 1030 | fn | getStorageStateCacheMap | (private) | `function getStorageStateCacheMap(storage, creat...` |
| 1086 | fn | getCachedStorageEntry | (private) | `function getCachedStorageEntry(storage, key) {` |
| 1093 | fn | clearCachedStorageEntry | (private) | `function clearCachedStorageEntry(storage, key) {` |
| 1122 | fn | cloneValueForCache | (private) | `function cloneValueForCache(value) {` |
| 1133 | fn | cloneCachedEntryValue | (private) | `function cloneCachedEntryValue(entry) {` |
| 1143 | fn | cloneLookupMap | (private) | `function cloneLookupMap(source, options) {` |
| 1168 | fn | cloneProjectLookupSnapshotForReturn | (private) | `function cloneProjectLookupSnapshotForReturn(lo...` |
| 1180 | fn | captureProjectLookupSnapshotForCache | (private) | `function captureProjectLookupSnapshotForCache(l...` |
| 1194 | fn | freezeProjectSnapshotProjects | (private) | `function freezeProjectSnapshotProjects(projects) {` |
| 1219 | fn | setProjectReadCacheSnapshot | (private) | `function setProjectReadCacheSnapshot(snapshot) {` |
| 1232 | fn | getProjectReadCacheClone | (private) | `function getProjectReadCacheClone(options) {` |
| 1261 | fn | invalidateProjectReadCache | (private) | `function invalidateProjectReadCache() {` |
| 1264 | fn | normalizeProjectStorageRevisionValue | (private) | `function normalizeProjectStorageRevisionValue(v...` |
| 1280 | fn | getProjectStorageRevisionKeyName | (private) | `function getProjectStorageRevisionKeyName() {` |
| 1283 | fn | loadProjectStorageRevision | (private) | `function loadProjectStorageRevision(storageOver...` |
| 1295 | fn | bumpProjectStorageRevision | (private) | `function bumpProjectStorageRevision(storageOver...` |
| 1308 | fn | cacheStorageValue | (private) | `function cacheStorageValue(storage, key, rawVal...` |
| 1328 | fn | tryGetCachedStorageValue | (private) | `function tryGetCachedStorageValue(storage, key,...` |
| 1361 | fn | readGlobalStringValue | (private) | `function readGlobalStringValue(scope, key) {` |
| 1397 | fn | exposeGlobalStringValue | (private) | `function exposeGlobalStringValue(scope, key, va...` |
| 1441 | fn | resolveMountVoltageStorageKeyName | (private) | `function resolveMountVoltageStorageKeyName() {` |
| 1456 | fn | refreshMountVoltageStorageKeyName | (private) | `function refreshMountVoltageStorageKeyName() {` |
| 1476 | fn | getMountVoltageStorageKeyName | (private) | `function getMountVoltageStorageKeyName() {` |
| 1479 | fn | getMountVoltageStorageBackupKeyName | (private) | `function getMountVoltageStorageBackupKeyName() {` |
| 1483 | fn | ensureCustomFontStorageKeyName | (private) | `function ensureCustomFontStorageKeyName() {` |
| 1500 | fn | getCustomFontStorageKeyName | (private) | `function getCustomFontStorageKeyName() {` |
| 1510 | fn | resolveTemperatureUnitStorageKey | (private) | `function resolveTemperatureUnitStorageKey() {` |
| 1585 | fn | isAutoBackupStorageKey | (private) | `function isAutoBackupStorageKey(name) {` |
| 1612 | fn | ensureGlobalAutoGearBackupDefaults | (private) | `function ensureGlobalAutoGearBackupDefaults() {` |
| 1636 | fn | cloneAutoBackupMetadata | (private) | `function cloneAutoBackupMetadata(metadata) {` |
| 1655 | fn | defineAutoBackupMetadata | (private) | `function defineAutoBackupMetadata(target, metad...` |
| 1676 | fn | getAutoBackupMetadata | (private) | `function getAutoBackupMetadata(value) {` |
| 1686 | fn | copyAutoBackupMetadata | (private) | `function copyAutoBackupMetadata(source, target) {` |
| 1695 | fn | cloneAutoBackupValue | (private) | `function cloneAutoBackupValue(value, options, s...` |
| 1755 | fn | cloneAutoBackupValueWithLegacyNormalization | (private) | `function cloneAutoBackupValueWithLegacyNormaliz...` |
| 1764 | fn | isCompressedAutoBackupSnapshotPayload | (private) | `function isCompressedAutoBackupSnapshotPayload(...` |
| 1773 | fn | prepareAutoBackupSnapshotPayloadForStorage | (private) | `function prepareAutoBackupSnapshotPayloadForSto...` |
| 1912 | fn | restoreAutoBackupSnapshotPayload | (private) | `function restoreAutoBackupSnapshotPayload(snaps...` |
| 1943 | fn | deriveAutoBackupCreatedAt | (private) | `function deriveAutoBackupCreatedAt(name, fallba...` |
| 1960 | fn | detectCyclicAutoBackupReference | (private) | `function detectCyclicAutoBackupReference(entrie...` |
| 2024 | fn | promoteAutoBackupMetadataToFull | (private) | `function promoteAutoBackupMetadataToFull(metada...` |
| 2038 | fn | expandAutoBackupEntries | (private) | `function expandAutoBackupEntries(container, opt...` |
| 2201 | fn | computeAutoBackupDiff | (private) | `function computeAutoBackupDiff(currentValue, ba...` |
| 2238 | fn | serializeAutoBackupEntries | (private) | `function serializeAutoBackupEntries(entries, op...` |
| 2447 | fn | getStorageKeyVariants | (private) | `function getStorageKeyVariants(key) {` |
| 2460 | fn | getDeviceStorageKeyVariants | (private) | `function getDeviceStorageKeyVariants() {` |
| 2466 | fn | isDeviceStorageKeyVariant | (private) | `function isDeviceStorageKeyVariant(key) {` |
| 2476 | fn | shouldAllowCriticalSweepPrimaryInspection | (private) | `function shouldAllowCriticalSweepPrimaryInspect...` |
| 2491 | fn | inspectSetupStorageForQuotaRecovery | (private) | `function inspectSetupStorageForQuotaRecovery(st...` |
| 2691 | fn | createCriticalStorageEntry | (private) | `function createCriticalStorageEntry(candidate) {` |
| 2712 | fn | gatherCriticalStorageEntries | (private) | `function gatherCriticalStorageEntries() {` |
| 2786 | fn | registerCriticalStorageGuardResult | (private) | `function registerCriticalStorageGuardResult(res...` |
| 2806 | fn | ensureCriticalStorageBackups | (private) | `function ensureCriticalStorageBackups() {` |
| 3090 | fn | getLastCriticalStorageGuardResult | (private) | `function getLastCriticalStorageGuardResult() {` |
| 3125 | fn | getAvailableLZStringCompressionStrategies | (private) | `function getAvailableLZStringCompressionStrateg...` |
| 3179 | fn | tryDecompressWithStrategies | (private) | `function tryDecompressWithStrategies(data, vari...` |
| 3235 | fn | canUseMigrationBackupCompression | (private) | `function canUseMigrationBackupCompression() {` |
| 3238 | fn | tryCreateCompressedMigrationBackupCandidate | (private) | `function tryCreateCompressedMigrationBackupCand...` |
| 3301 | fn | parseMigrationBackupMetadata | (private) | `function parseMigrationBackupMetadata(raw) {` |
| 3350 | fn | canUseJsonValueCompression | (private) | `function canUseJsonValueCompression() {` |
| 3353 | fn | createCompressedJsonStorageCandidate | (private) | `function createCompressedJsonStorageCandidate(s...` |
| 3475 | fn | decodeCompressedJsonStorageValue | (private) | `function decodeCompressedJsonStorageValue(raw) {` |
| 3555 | fn | restoreCompressedProjectEntry | (private) | `function restoreCompressedProjectEntry(value, c...` |
| 3597 | fn | markProjectActivity | (private) | `function markProjectActivity(name, timestamp) {` |
| 3612 | fn | markProjectCollectionActivity | (private) | `function markProjectCollectionActivity(projects...` |
| 3624 | fn | removeProjectActivity | (private) | `function removeProjectActivity(name) {` |
| 3634 | fn | getProjectActivityTimestamp | (private) | `function getProjectActivityTimestamp(name) {` |
| 3653 | fn | pruneProjectActivityCache | (private) | `function pruneProjectActivityCache(validKeys) {` |
| 3669 | fn | normalizeForcedProjectCompressionKey | (private) | `function normalizeForcedProjectCompressionKey(n...` |
| 3676 | fn | isForcedProjectCompressionLocked | (private) | `function isForcedProjectCompressionLocked(name) {` |
| 3691 | fn | registerForcedProjectCompressionKey | (private) | `function registerForcedProjectCompressionKey(na...` |
| 3716 | fn | purgeForcedProjectCompressionKeys | (private) | `function purgeForcedProjectCompressionKeys(vali...` |
| 3739 | fn | ensureProjectEntryUncompressed | (private) | `function ensureProjectEntryUncompressed(value, ...` |
| 3746 | fn | ensureProjectEntriesUncompressed | (private) | `function ensureProjectEntriesUncompressed(conta...` |
| 3755 | fn | ensureProjectEntryCompressed | (private) | `function ensureProjectEntryCompressed(value, co...` |
| 3795 | fn | applyProjectEntryCompression | (private) | `function applyProjectEntryCompression(container) {` |
| 3822 | fn | forceCompressAllProjectEntries | (private) | `function forceCompressAllProjectEntries(contain...` |
| 3877 | fn | clearDerivedProjectCachesForQuota | (private) | `function clearDerivedProjectCachesForQuota(stor...` |
| 3922 | fn | registerActiveSetupStorageSkipKeys | (private) | `function registerActiveSetupStorageSkipKeys(ski...` |
| 3934 | fn | registerProtectedCompressionSkipKeys | (private) | `function registerProtectedCompressionSkipKeys(s...` |
| 3957 | fn | maybeDecompressStoredString | (private) | `function maybeDecompressStoredString(raw, optio...` |
| 3974 | fn | attemptStorageCompressionSweep | (private) | `function attemptStorageCompressionSweep(storage...` |
| 4103 | fn | decodeStoredValue | (private) | `function decodeStoredValue(raw) {` |
| 4109 | fn | patchIndividualStorageGetItem | (private) | `function patchIndividualStorageGetItem(storage) {` |
| 4175 | fn | patchStorageGetItemForCompression | (private) | `function patchStorageGetItemForCompression() {` |
| 4265 | fn | getRawStorageGetter | (private) | `function getRawStorageGetter(storage) {` |
| 4279 | fn | readRawStorageValue | (private) | `function readRawStorageValue(storage, key, rawG...` |
| 4294 | fn | collectMigrationBackupEntriesForCleanup | (private) | `function collectMigrationBackupEntriesForCleanu...` |
| 4346 | fn | pruneMigrationBackupEntriesForCleanup | (private) | `function pruneMigrationBackupEntriesForCleanup(...` |
| 4361 | fn | attemptMigrationBackupQuotaRecovery | (private) | `function attemptMigrationBackupQuotaRecovery(st...` |
| 4454 | fn | ensurePreWriteMigrationBackup | (private) | `function ensurePreWriteMigrationBackup(storage,...` |
| 4490 | fn | trySerializeMigrationBackupValue | (private) | `function trySerializeMigrationBackupValue(value) {` |
| 4498 | fn | normalizeLegacyMigrationBackupCreatedAt | (private) | `function normalizeLegacyMigrationBackupCreatedA...` |
| 4587 | fn | normalizeLegacyMigrationBackupValue | (private) | `function normalizeLegacyMigrationBackupValue(ra...` |
| 4697 | fn | upgradeLegacyMigrationBackupEntry | (private) | `function upgradeLegacyMigrationBackupEntry(stor...` |
| 4716 | fn | createStorageMigrationBackup | (private) | `function createStorageMigrationBackup(storage, ...` |
| 4920 | fn | isQuotaExceededError | (private) | `function isQuotaExceededError(error) {` |
| 4935 | fn | hasStoredEntries | (private) | `function hasStoredEntries(storage) {` |
| 4995 | fn | verifyStorage | (private) | `function verifyStorage(storage) {` |
| 5013 | fn | createMemoryStorage | (private) | `function createMemoryStorage() {` |
| 5043 | fn | initializeSafeLocalStorage | (private) | `function initializeSafeLocalStorage() {` |
| 5090 | fn | migrateSnapshotToStorage | (private) | `function migrateSnapshotToStorage(snapshot, tar...` |
| 5132 | fn | clearMigratedKeys | (private) | `function clearMigratedKeys(snapshot, source, ke...` |
| 5145 | fn | rollbackMigratedKeys | (private) | `function rollbackMigratedKeys(target, keys) {` |
| 5157 | fn | snapshotStorageEntries | (private) | `function snapshotStorageEntries(storage) {` |
| 5231 | fn | updateGlobalSafeLocalStorageReference | (private) | `function updateGlobalSafeLocalStorageReference() {` |
| 5251 | fn | downgradeSafeLocalStorageToMemory | (private) | `function downgradeSafeLocalStorageToMemory(reas...` |
| 5320 | fn | attemptLocalStorageUpgrade | (private) | `function attemptLocalStorageUpgrade() {` |
| 5376 | fn | getSafeLocalStorage | (private) | `function getSafeLocalStorage() {` |
| 5391 | fn | requestPersistentStorage | (private) | `function requestPersistentStorage() {` |
| 5501 | fn | isPlainObject | (private) | `function isPlainObject(val) {` |
| 5521 | fn | isMapLike | (private) | `function isMapLike(value) {` |
| 5540 | fn | convertMapLikeKey | (private) | `function convertMapLikeKey(key) {` |
| 5567 | fn | convertMapLikeToObject | (private) | `function convertMapLikeToObject(mapLike) {` |
| 5615 | fn | inferLegacyLongGopCompressionVariant | (private) | `function inferLegacyLongGopCompressionVariant(v...` |
| 5638 | fn | normalizeLegacyLongGopString | (private) | `function normalizeLegacyLongGopString(value) {` |
| 5648 | fn | normalizeLegacyLongGopKey | (private) | `function normalizeLegacyLongGopKey(key) {` |
| 5654 | fn | normalizeLegacyLongGopStructure | (private) | `function normalizeLegacyLongGopStructure(value,...` |
| 5690 | fn | normalizeLegacyLongGopBackups | (private) | `function normalizeLegacyLongGopBackups(backups) {` |
| 5713 | fn | parseAutoBackupKey | (private) | `function parseAutoBackupKey(name) {` |
| 5796 | fn | collectAutoBackupEntries | (private) | `function collectAutoBackupEntries(container, pr...` |
| 5818 | fn | markAutoBackupValueAsRenamed | (private) | `function markAutoBackupValueAsRenamed(value) {` |
| 5845 | fn | isAutoBackupValueRenamed | (private) | `function isAutoBackupValueRenamed(value) {` |
| 5857 | fn | isRenamedAutoBackupEntry | (private) | `function isRenamedAutoBackupEntry(container, ke...` |
| 5863 | fn | getAutoBackupLabelKey | (private) | `function getAutoBackupLabelKey(entry) {` |
| 5882 | fn | getAutoBackupEntrySignature | (private) | `function getAutoBackupEntrySignature(container,...` |
| 5916 | fn | createStableValueSignature | (private) | `function createStableValueSignature(value, stat...` |
| 6023 | fn | removeSingleDuplicateAutoBackupEntry | (private) | `function removeSingleDuplicateAutoBackupEntry(c...` |
| 6064 | fn | removeDuplicateAutoBackupEntries | (private) | `function removeDuplicateAutoBackupEntries(conta...` |
| 6075 | fn | pruneAutoBackupEntries | (private) | `function pruneAutoBackupEntries(container, entr...` |
| 6131 | fn | enforceAutoBackupLimits | (private) | `function enforceAutoBackupLimits(container) {` |
| 6151 | fn | removeOldestAutoBackupEntry | (private) | `function removeOldestAutoBackupEntry(container) {` |
| 6211 | fn | removeOldestRenamedAutoBackupEntry | (private) | `function removeOldestRenamedAutoBackupEntry(con...` |
| 6243 | fn | describeAutoGearBackupEntry | (private) | `function describeAutoGearBackupEntry(entry) {` |
| 6264 | fn | removeOldestAutoGearBackupEntry | (private) | `function removeOldestAutoGearBackupEntry(backup...` |
| 6288 | fn | cleanupAutoGearBackupMigrationCopies | (private) | `function cleanupAutoGearBackupMigrationCopies(s...` |
| 6317 | fn | clearCachedPlannerDataForAutoGearBackups | (private) | `function clearCachedPlannerDataForAutoGearBacku...` |
| 6330 | fn | shouldDisplayStorageAlert | (private) | `function shouldDisplayStorageAlert(reason) {` |
| 6343 | fn | alertStorageError | (private) | `function alertStorageError(reason) {` |
| 6370 | fn | alertSessionFallback | (private) | `function alertSessionFallback() {` |
| 6391 | fn | getWindowStorage | (private) | `function getWindowStorage(name) {` |
| 6402 | fn | collectUniqueStorages | (private) | `function collectUniqueStorages(storages) {` |
| 6418 | fn | migrateKeyBetweenStorages | (private) | `function migrateKeyBetweenStorages(source, targ...` |
| 6467 | fn | migrateKeyInStorages | (private) | `function migrateKeyInStorages(storages, preferr...` |
| 6476 | fn | migrateLegacyStorageKeys | (private) | `function migrateLegacyStorageKeys() {` |
| 6564 | fn | applyLegacyStorageMigrations | (private) | `function applyLegacyStorageMigrations() {` |
| 6567 | fn | isSessionStorageInstance | (private) | `function isSessionStorageInstance(storage) {` |
| 6592 | fn | loadJSONFromStorage | (private) | `function loadJSONFromStorage(storage, key, erro...` |
| 6872 | fn | saveJSONToStorage | (private) | `function saveJSONToStorage(storage, key, value,...` |
| 7464 | fn | deleteFromStorage | (private) | `function deleteFromStorage(storage, key, errorM...` |
| 7509 | fn | collectUiCacheStorages | (private) | `function collectUiCacheStorages() {` |
| 7576 | fn | clearUiCacheStorageEntries | (private) | `function clearUiCacheStorageEntries() {` |
| 7590 | fn | loadFlagFromStorage | (private) | `function loadFlagFromStorage(storage, key, erro...` |
| 7601 | fn | saveFlagToStorage | (private) | `function saveFlagToStorage(storage, key, value,...` |
| 7615 | fn | loadWithMigration | (private) | `function loadWithMigration(primary, fallback, k...` |
| 7630 | fn | generateUniqueName | (private) | `function generateUniqueName(base, usedNames, no...` |
| 7646 | fn | ensureImportedProjectBaseName | (private) | `function ensureImportedProjectBaseName(rawName) {` |
| 7661 | fn | resolveImportedProjectNamingContext | (private) | `function resolveImportedProjectNamingContext(ra...` |
| 7687 | fn | generateImportedProjectName | (private) | `function generateImportedProjectName(baseName, ...` |
| 7711 | fn | ensureUpdatedProjectBaseName | (private) | `function ensureUpdatedProjectBaseName(rawName) {` |
| 7721 | fn | generateUpdatedProjectName | (private) | `function generateUpdatedProjectName(baseName, u...` |
| 7737 | fn | collectStringValues | (private) | `function collectStringValues(value) {` |
| 7765 | fn | arraysEqual | (private) | `function arraysEqual(a, b) {` |
| 7779 | fn | normalizeDiagramPositions | (private) | `function normalizeDiagramPositions(positions) {` |
| 7801 | fn | diagramPositionsEqual | (private) | `function diagramPositionsEqual(a, b) {` |
| 7823 | fn | normalizeSessionStatePayload | (private) | `function normalizeSessionStatePayload(raw) {` |
| 7941 | fn | loadSessionState | (private) | `function loadSessionState() {` |
| 7964 | fn | saveSessionState | (private) | `function saveSessionState(state) {` |
| 8001 | fn | normalizeDeviceDataPayload | (private) | `function normalizeDeviceDataPayload(rawData) {` |
| 8043 | fn | loadDeviceData | (private) | `function loadDeviceData() {` |
| 8066 | fn | saveDeviceData | (private) | `function saveDeviceData(deviceData) {` |
| 8085 | fn | normalizeSetups | (private) | `function normalizeSetups(rawData) {` |
| 8141 | fn | loadSetups | (private) | `function loadSetups() {` |
| 8167 | fn | saveSetups | (private) | `function saveSetups(setups) {` |
| 8192 | fn | updateSetups | (private) | `function updateSetups(callback) {` |
| 8203 | fn | saveSetup | (private) | `function saveSetup(name, setup) {` |
| 8211 | fn | loadSetup | (private) | `function loadSetup(name) {` |
| 8215 | fn | deleteSetup | (private) | `function deleteSetup(name) {` |
| 8228 | fn | renameSetup | (private) | `function renameSetup(oldName, newName) {` |
| 8315 | fn | normalizeProjectFieldLabel | (private) | `function normalizeProjectFieldLabel(label) {` |
| 8321 | fn | getProductionCompanyLabelSets | (private) | `function getProductionCompanyLabelSets(projectL...` |
| 8349 | fn | expandCombinedProductionCompanyInfo | (private) | `function expandCombinedProductionCompanyInfo(ra...` |
| 8503 | fn | decodeHtmlEntities | (private) | `function decodeHtmlEntities(value) {` |
| 8517 | fn | stripHtmlTags | (private) | `function stripHtmlTags(value) {` |
| 8526 | fn | normalizeRequirementValueFromHtml | (private) | `function normalizeRequirementValueFromHtml(rawH...` |
| 8545 | fn | extractRequirementValueMetadata | (private) | `function extractRequirementValueMetadata(rawHtm...` |
| 8579 | fn | mapLegacyRequirementLabel | (private) | `function mapLegacyRequirementLabel(labelText) {` |
| 8589 | fn | extractProjectInfoFromHtml | (private) | `function extractProjectInfoFromHtml(html) {` |
| 8670 | fn | cloneProjectData | (private) | `function cloneProjectData(value) {` |
| 8688 | fn | cloneProjectInfo | (private) | `function cloneProjectInfo(projectInfo) {` |
| 8704 | fn | sanitizeImportedCrewEntries | (private) | `function sanitizeImportedCrewEntries(entries) {` |
| 8749 | fn | sanitizeImportedValue | (private) | `function sanitizeImportedValue(value) {` |
| 8776 | fn | sanitizeImportedProjectInfo | (private) | `function sanitizeImportedProjectInfo(info) {` |
| 8890 | fn | cloneAutoGearRules | (private) | `function cloneAutoGearRules(rules) {` |
| 8906 | fn | cloneDiagramPositionsForStorage | (private) | `function cloneDiagramPositionsForStorage(positi...` |
| 8923 | fn | normalizeImportedFilterValues | (private) | `function normalizeImportedFilterValues(raw) {` |
| 8988 | fn | normalizeImportedFilterEntry | (private) | `function normalizeImportedFilterEntry(entry) {` |
| 9123 | fn | serializeNormalizedFilterEntry | (private) | `function serializeNormalizedFilterEntry(entry) {` |
| 9140 | fn | normalizeImportedFilterValue | (private) | `function normalizeImportedFilterValue(value) {` |
| 9200 | fn | normalizeImportedProjectFilters | (private) | `function normalizeImportedProjectFilters(info) {` |
| 9225 | fn | cloneProjectGearSelectors | (private) | `function cloneProjectGearSelectors(selectors) {` |
| 9285 | fn | normalizeProjectPowerSelection | (private) | `function normalizeProjectPowerSelection(raw) {` |
| 9314 | fn | cloneProjectPowerSelection | (private) | `function cloneProjectPowerSelection(selection) {` |
| 9326 | fn | isLikelyLensNameKey | (private) | `function isLikelyLensNameKey(key) {` |
| 9349 | fn | deriveLensNameKeysFromObject | (private) | `function deriveLensNameKeysFromObject(value) {` |
| 9366 | fn | normalizeProjectLensNameCandidate | (private) | `function normalizeProjectLensNameCandidate(valu...` |
| 9427 | fn | extractLensNamesFromSource | (private) | `function extractLensNamesFromSource(value) {` |
| 9518 | fn | normalizeProjectLensNamesField | (private) | `function normalizeProjectLensNamesField(value) {` |
| 9528 | fn | normalizeProjectLensSelectionEntry | (private) | `function normalizeProjectLensSelectionEntry(ent...` |
| 9661 | fn | deriveLensSelectionsFromNameMap | (private) | `function deriveLensSelectionsFromNameMap(source) {` |
| 9751 | fn | normalizeProjectLensSelectionsFromSources | (private) | `function normalizeProjectLensSelectionsFromSour...` |
| 9929 | fn | normalizeProject | (private) | `function normalizeProject(data) {` |
| 10358 | fn | isNormalizedProjectEntry | (private) | `function isNormalizedProjectEntry(entry) {` |
| 10400 | fn | normalizeProjectStorageKey | (private) | `function normalizeProjectStorageKey(name) {` |
| 10406 | fn | setActiveProjectCompressionHold | (private) | `function setActiveProjectCompressionHold(name) {` |
| 10422 | fn | clearActiveProjectCompressionHold | (private) | `function clearActiveProjectCompressionHold(name) {` |
| 10436 | fn | shouldDisableProjectCompressionDuringPersist | (private) | `function shouldDisableProjectCompressionDuringP...` |
| 10439 | fn | resolveProjectKey | (private) | `function resolveProjectKey(projects, lookup, na...` |
| 10486 | fn | readAllProjectsFromStorage | (private) | `function readAllProjectsFromStorage() {` |
| 10730 | fn | pruneOrphanProjectShards | (private) | `function pruneOrphanProjectShards(storage, proj...` |
| 10751 | fn | cleanupMonolithicProjectStorage | (private) | `function cleanupMonolithicProjectStorage(storag...` |
| 10770 | fn | persistProjectShard | (private) | `function persistProjectShard(name, project) {` |
| 10808 | fn | persistAllProjects | (private) | `function persistAllProjects(projects) {` |
| 10833 | fn | loadProject | (private) | `function loadProject(name) {` |
| 10879 | fn | sanitizeProjectNameForBackup | (private) | `function sanitizeProjectNameForBackup(name) {` |
| 10892 | fn | formatAutoBackupTimestamp | (private) | `function formatAutoBackupTimestamp(date) {` |
| 10898 | fn | generateDeletionBackupMetadata | (private) | `function generateDeletionBackupMetadata(project...` |
| 10919 | fn | cloneProjectEntryForBackup | (private) | `function cloneProjectEntryForBackup(entry) {` |
| 10937 | fn | maybeCreateProjectDeletionBackup | (private) | `function maybeCreateProjectDeletionBackup(proje...` |
| 10976 | fn | createProjectDeletionBackup | (private) | `function createProjectDeletionBackup(name) {` |
| 11013 | fn | generateOverwriteBackupMetadata | (private) | `function generateOverwriteBackupMetadata(projec...` |
| 11033 | fn | maybeCreateProjectOverwriteBackup | (private) | `function maybeCreateProjectOverwriteBackup(proj...` |
| 11068 | fn | saveProject | (private) | `function saveProject(name, project) {` |
| 11192 | fn | deleteProject | (private) | `function deleteProject(name) {` |
| 11295 | fn | renameProject | (private) | `function renameProject(oldName, newName) {` |
| 11318 | fn | createProjectImporter | (private) | `function createProjectImporter() {` |
| 11366 | fn | tryParseJSONLike | (private) | `function tryParseJSONLike(value) {` |
| 11409 | fn | importProjectCollection | (private) | `function importProjectCollection(collection, en...` |
| 11486 | fn | collectLegacyProjectCollections | (private) | `function collectLegacyProjectCollections(contai...` |
| 11536 | fn | loadFavorites | (private) | `function loadFavorites() {` |
| 11546 | fn | saveFavorites | (private) | `function saveFavorites(favs) {` |
| 11559 | fn | resolveContactsModuleApi | (private) | `function resolveContactsModuleApi() {` |
| 11591 | fn | fallbackSanitizeContactValue | (private) | `function fallbackSanitizeContactValue(value) {` |
| 11630 | fn | fallbackGenerateContactId | (private) | `function fallbackGenerateContactId(moduleApi) {` |
| 11643 | fn | fallbackNormalizeContactEntry | (private) | `function fallbackNormalizeContactEntry(entry, m...` |
| 11675 | fn | fallbackSortContacts | (private) | `function fallbackSortContacts(list) {` |
| 11706 | fn | normalizeContactsList | (private) | `function normalizeContactsList(entries) {` |
| 11752 | fn | loadContacts | (private) | `function loadContacts() {` |
| 11765 | fn | saveContacts | (private) | `function saveContacts(contacts) {` |
| 11782 | fn | normalizeOwnGearItem | (private) | `function normalizeOwnGearItem(entry) {` |
| 11808 | fn | loadOwnGear | (private) | `function loadOwnGear() {` |
| 11821 | fn | saveOwnGear | (private) | `function saveOwnGear(items) {` |
| 11838 | fn | normalizeUserProfileField | (private) | `function normalizeUserProfileField(value) {` |
| 11866 | fn | normalizeUserProfile | (private) | `function normalizeUserProfile(entry) {` |
| 11893 | fn | loadUserProfile | (private) | `function loadUserProfile() {` |
| 11918 | fn | saveUserProfile | (private) | `function saveUserProfile(profile) {` |
| 11942 | fn | loadFeedback | (private) | `function loadFeedback() {` |
| 11955 | fn | saveFeedback | (private) | `function saveFeedback(feedback) {` |
| 11968 | fn | normalizeFullBackupHistoryEntry | (private) | `function normalizeFullBackupHistoryEntry(entry) {` |
| 11995 | fn | loadFullBackupHistory | (private) | `function loadFullBackupHistory() {` |
| 12008 | fn | saveFullBackupHistory | (private) | `function saveFullBackupHistory(entries) {` |
| 12044 | fn | normalizeImportedFullBackupHistory | (private) | `function normalizeImportedFullBackupHistory(val...` |
| 12128 | fn | generateDocumentationTrackerId | (private) | `function generateDocumentationTrackerId() {` |
| 12149 | fn | normalizeDocumentationTrackerStatusEntry | (private) | `function normalizeDocumentationTrackerStatusEnt...` |
| 12186 | fn | normalizeDocumentationTrackerStatusMap | (private) | `function normalizeDocumentationTrackerStatusMap...` |
| 12238 | fn | normalizeDocumentationTrackerStatuses | (private) | `function normalizeDocumentationTrackerStatuses(...` |
| 12259 | fn | normalizeDocumentationTrackerRelease | (private) | `function normalizeDocumentationTrackerRelease(e...` |
| 12342 | fn | normalizeDocumentationTrackerState | (private) | `function normalizeDocumentationTrackerState(sta...` |
| 12384 | fn | loadDocumentationTracker | (private) | `function loadDocumentationTracker() {` |
| 12407 | fn | saveDocumentationTracker | (private) | `function saveDocumentationTracker(state) {` |
| 12426 | fn | loadAutoGearRules | (private) | `function loadAutoGearRules() {` |
| 12459 | fn | saveAutoGearRules | (private) | `function saveAutoGearRules(rules) {` |
| 12473 | fn | loadAutoGearBackups | (private) | `function loadAutoGearBackups() {` |
| 12492 | fn | saveAutoGearBackups | (private) | `function saveAutoGearBackups(backups) {` |
| 12538 | fn | loadAutoGearSeedFlag | (private) | `function loadAutoGearSeedFlag() {` |
| 12543 | fn | saveAutoGearSeedFlag | (private) | `function saveAutoGearSeedFlag(flag) {` |
| 12547 | fn | loadAutoGearPresets | (private) | `function loadAutoGearPresets() {` |
| 12564 | fn | readActiveAutoGearPresetIds | (private) | `function readActiveAutoGearPresetIds() {` |
| 12590 | fn | saveAutoGearPresets | (private) | `function saveAutoGearPresets(presets) {` |
| 12614 | fn | loadAutoGearMonitorDefaults | (private) | `function loadAutoGearMonitorDefaults() {` |
| 12631 | fn | saveAutoGearMonitorDefaults | (private) | `function saveAutoGearMonitorDefaults(defaults) {` |
| 12643 | fn | removeAutoGearPresetFromStorage | (private) | `function removeAutoGearPresetFromStorage(preset...` |
| 12690 | fn | loadAutoGearActivePresetId | (private) | `function loadAutoGearActivePresetId() {` |
| 12706 | fn | saveAutoGearActivePresetId | (private) | `function saveAutoGearActivePresetId(presetId) {` |
| 12723 | fn | loadAutoGearAutoPresetId | (private) | `function loadAutoGearAutoPresetId() {` |
| 12739 | fn | saveAutoGearAutoPresetId | (private) | `function saveAutoGearAutoPresetId(presetId) {` |
| 12772 | fn | loadAutoGearBackupVisibility | (private) | `function loadAutoGearBackupVisibility() {` |
| 12777 | fn | saveAutoGearBackupVisibility | (private) | `function saveAutoGearBackupVisibility(flag) {` |
| 12781 | fn | getAutoGearBackupRetentionUpperBound | (private) | `function getAutoGearBackupRetentionUpperBound() {` |
| 12799 | fn | clampAutoGearBackupRetention | (private) | `function clampAutoGearBackupRetention(value) {` |
| 12817 | fn | getAutoGearBackupRetentionDefault | (private) | `function getAutoGearBackupRetentionDefault() {` |
| 12847 | fn | normalizeAutoGearBackupRetentionValue | (private) | `function normalizeAutoGearBackupRetentionValue(...` |
| 12895 | fn | loadAutoGearBackupRetention | (private) | `function loadAutoGearBackupRetention() {` |
| 12905 | fn | saveAutoGearBackupRetention | (private) | `function saveAutoGearBackupRetention(retention) {` |
| 12914 | fn | clearAllData | (private) | `function clearAllData() {` |
| 12917 | fn | _clearAllData | (private) | `function _clearAllData() {` |
| 13263 | fn | readLocalStorageValue | (private) | `function readLocalStorageValue(key) {` |
| 13295 | fn | parseStoredBoolean | (private) | `function parseStoredBoolean(value) {` |
| 13320 | fn | interpretPrintPreferencesValue | (private) | `function interpretPrintPreferencesValue(rawValu...` |
| 13393 | fn | collectPreferenceSnapshot | (private) | `function collectPreferenceSnapshot() {` |
| 13490 | fn | normalizeCustomFontEntries | (private) | `function normalizeCustomFontEntries(entries) {` |
| 13504 | fn | readStoredCustomFonts | (private) | `function readStoredCustomFonts() {` |
| 13518 | fn | normalizeBackupVaultMetadata | (private) | `function normalizeBackupVaultMetadata(metadata) {` |
| 13534 | fn | normalizeBackupVaultRecord | (private) | `function normalizeBackupVaultRecord(record) {` |
| 13565 | fn | normalizeBackupVaultRecordList | (private) | `function normalizeBackupVaultRecordList(records) {` |
| 13586 | fn | scoreBackupVaultRecord | (private) | `function scoreBackupVaultRecord(record) {` |
| 13608 | fn | mergeBackupVaultRecords | (private) | `function mergeBackupVaultRecords(existingList, ...` |
| 13629 | fn | readBackupVaultFallbackRecords | (private) | `function readBackupVaultFallbackRecords() {` |
| 13633 | fn | resolveBackupVaultApi | (private) | `function resolveBackupVaultApi() {` |
| 13642 | fn | refreshBackupVaultRecordCache | (private) | `function refreshBackupVaultRecordCache() {` |
| 13670 | fn | exportAllData | (private) | `function exportAllData() {` |
| 13728 | fn | safeSetLocalStorage | (private) | `function safeSetLocalStorage(key, value) {` |
| 13765 | fn | normalizeImportedBoolean | (private) | `function normalizeImportedBoolean(value) {` |
| 13807 | fn | normalizeImportedArray | (private) | `function normalizeImportedArray(value) {` |
| 13853 | fn | normalizeImportedContacts | (private) | `function normalizeImportedContacts(value) {` |
| 13862 | fn | normalizeImportedAutoGearRules | (private) | `function normalizeImportedAutoGearRules(value) {` |
| 13871 | fn | normalizeImportedAutoGearBackups | (private) | `function normalizeImportedAutoGearBackups(value) {` |
| 13882 | fn | normalizeImportedAutoGearBackupRetention | (private) | `function normalizeImportedAutoGearBackupRetenti...` |
| 13932 | fn | normalizeImportedAutoGearPresets | (private) | `function normalizeImportedAutoGearPresets(value) {` |
| 13941 | fn | normalizeImportedAutoGearMonitorDefaults | (private) | `function normalizeImportedAutoGearMonitorDefaul...` |
| 13958 | fn | normalizeImportedPresetId | (private) | `function normalizeImportedPresetId(value) {` |
| 13987 | fn | normalizeImportedBackupVaultRecords | (private) | `function normalizeImportedBackupVaultRecords(va...` |
| 13993 | fn | importBackupVaultRecords | (private) | `function importBackupVaultRecords(records) {` |
| 14059 | fn | getSnapshotKeyVariants | (private) | `function getSnapshotKeyVariants(key) {` |
| 14062 | fn | readSnapshotEntry | (private) | `function readSnapshotEntry(snapshot, key) {` |
| 14099 | fn | extractSnapshotStoredValue | (private) | `function extractSnapshotStoredValue(entry) {` |
| 14158 | fn | parseSnapshotJSONValue | (private) | `function parseSnapshotJSONValue(entry) {` |
| 14189 | fn | parseSnapshotStringValue | (private) | `function parseSnapshotStringValue(entry) {` |
| 14234 | fn | convertStorageSnapshotToData | (private) | `function convertStorageSnapshotToData(snapshot) {` |
| 14437 | fn | importAllData | (private) | `function importAllData(allData) {` |

