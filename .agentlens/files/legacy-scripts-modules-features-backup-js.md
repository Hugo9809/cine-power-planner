# legacy/scripts/modules/features/backup.js

[← Back to Module](../modules/legacy-scripts-modules-features/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 2393
- **Language:** JavaScript
- **Symbols:** 81
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 1 | fn | _createForOfIteratorHelper | (private) | `function _createForOfIteratorHelper(r, e) { var...` |
| 2 | fn | _regenerator | (private) | `function _regenerator() { var e, t, r = "functi...` |
| 3 | fn | _regeneratorDefine2 | (private) | `function _regeneratorDefine2(e, r, n, t) { var ...` |
| 4 | fn | asyncGeneratorStep | (private) | `function asyncGeneratorStep(n, t, e, r, o, a, c...` |
| 5 | fn | _asyncToGenerator | (private) | `function _asyncToGenerator(n) { return function...` |
| 6 | fn | _slicedToArray | (private) | `function _slicedToArray(r, e) { return _arrayWi...` |
| 7 | fn | _nonIterableRest | (private) | `function _nonIterableRest() { throw new TypeErr...` |
| 8 | fn | _unsupportedIterableToArray | (private) | `function _unsupportedIterableToArray(r, a) { if...` |
| 9 | fn | _arrayLikeToArray | (private) | `function _arrayLikeToArray(r, a) { (null == a |...` |
| 10 | fn | _iterableToArrayLimit | (private) | `function _iterableToArrayLimit(r, l) { var t = ...` |
| 11 | fn | _arrayWithHoles | (private) | `function _arrayWithHoles(r) { if (Array.isArray...` |
| 12 | fn | ownKeys | (private) | `function ownKeys(e, r) { var t = Object.keys(e)...` |
| 13 | fn | _objectSpread | (private) | `function _objectSpread(e) { for (var r = 1; r <...` |
| 14 | fn | _defineProperty | (private) | `function _defineProperty(e, r, t) { return (r =...` |
| 15 | fn | _toPropertyKey | (private) | `function _toPropertyKey(t) { var i = _toPrimiti...` |
| 16 | fn | _toPrimitive | (private) | `function _toPrimitive(t, r) { if ("object" != _...` |
| 17 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 19 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 35 | fn | resolveModuleBase | (private) | `function resolveModuleBase(scope) {` |
| 63 | fn | freeze | (private) | `function freeze(target) {` |
| 139 | fn | setBackupVaultFallbackMode | (private) | `function setBackupVaultFallbackMode(active, det...` |
| 157 | fn | refreshBackupVaultFallbackMode | (private) | `function refreshBackupVaultFallbackMode(detail) {` |
| 171 | fn | getBackupVaultFallbackState | (private) | `function getBackupVaultFallbackState() {` |
| 178 | fn | isBackupVaultFallbackActive | (private) | `function isBackupVaultFallbackActive() {` |
| 181 | fn | createMemoryBackupVault | (private) | `function createMemoryBackupVault() {` |
| 223 | fn | resetFallbackVaultStorageReference | (private) | `function resetFallbackVaultStorageReference() {` |
| 228 | fn | isStorageLike | (private) | `function isStorageLike(candidate) {` |
| 234 | fn | getBackupVaultFallbackStorage | (private) | `function getBackupVaultFallbackStorage() {` |
| 307 | fn | readFallbackVaultRecords | (private) | `function readFallbackVaultRecords() {` |
| 362 | fn | writeFallbackVaultRecords | (private) | `function writeFallbackVaultRecords(records) {` |
| 407 | fn | persistFallbackVaultRecord | (private) | `function persistFallbackVaultRecord(record) {` |
| 433 | fn | removeFallbackVaultRecordEntry | (private) | `function removeFallbackVaultRecordEntry(id) {` |
| 454 | fn | combineBackupVaultRecordSets | (private) | `function combineBackupVaultRecordSets(indexedRe...` |
| 495 | fn | isIndexedDBAvailable | (private) | `function isIndexedDBAvailable() {` |
| 498 | fn | openBackupVaultDb | (private) | `function openBackupVaultDb() {` |
| 544 | fn | withBackupVaultStore | (private) | `function withBackupVaultStore(mode, executor) {` |
| 578 | fn | ensureVaultRecordMetadata | (private) | `function ensureVaultRecordMetadata(metadata) {` |
| 592 | fn | createBackupVaultRecord | (private) | `function createBackupVaultRecord(fileName, payl...` |
| 610 | fn | persistBackupVaultRecord | (private) | `function persistBackupVaultRecord(record) {` |
| 647 | fn | listBackupVaultRecords | (private) | `function listBackupVaultRecords() {` |
| 689 | fn | removeBackupVaultRecord | (private) | `function removeBackupVaultRecord(id) {` |
| 729 | fn | clearBackupVault | (private) | `function clearBackupVault() {` |
| 809 | fn | dispatchBackupVaultEvent | (private) | `function dispatchBackupVaultEvent(type, detail) {` |
| 843 | fn | getQueuedBackupPayloads | (private) | `function getQueuedBackupPayloads() {` |
| 875 | fn | queueBackupPayloadForVault | (private) | `function queueBackupPayloadForVault(fileName, p...` |
| 898 | fn | resolveBackupTexts | (private) | `function resolveBackupTexts() {` |
| 909 | fn | resolveQueuedBackupMessage | (private) | `function resolveQueuedBackupMessage(fileName) {` |
| 916 | fn | resolveBackupVaultEmptyMessage | (private) | `function resolveBackupVaultEmptyMessage() {` |
| 922 | fn | resolveBackupVaultWindowTitle | (private) | `function resolveBackupVaultWindowTitle() {` |
| 928 | fn | resolveBackupVaultWindowIntro | (private) | `function resolveBackupVaultWindowIntro() {` |
| 934 | fn | openQueuedBackupVaultWindow | (private) | `function openQueuedBackupVaultWindow() {` |
| 1070 | fn | isPlainObject | (private) | `function isPlainObject(value) {` |
| 1090 | fn | isMapLike | (private) | `function isMapLike(value) {` |
| 1109 | fn | convertMapLikeKey | (private) | `function convertMapLikeKey(key) {` |
| 1136 | fn | convertMapLikeToObject | (private) | `function convertMapLikeToObject(mapLike) {` |
| 1183 | fn | formatFullBackupFilename | (private) | `function formatFullBackupFilename(date) {` |
| 1210 | fn | resolveSafeLocalStorage | (private) | `function resolveSafeLocalStorage() {` |
| 1229 | fn | captureStorageSnapshot | (private) | `function captureStorageSnapshot(storage) {` |
| 1363 | fn | createSafeStorageReader | (private) | `function createSafeStorageReader(storage, error...` |
| 1382 | fn | restoreSessionStorageSnapshot | (private) | `function restoreSessionStorageSnapshot(snapshot) {` |
| 1425 | fn | normalizeStoredValue | (private) | `function normalizeStoredValue(value) {` |
| 1443 | fn | convertEntriesToSnapshot | (private) | `function convertEntriesToSnapshot(section) {` |
| 1506 | fn | extractFirstMatchingSnapshot | (private) | `function extractFirstMatchingSnapshot(source, k...` |
| 1542 | fn | looksLikeStoredSettingKey | (private) | `function looksLikeStoredSettingKey(key) {` |
| 1550 | fn | restoreLocalStorageSnapshot | (private) | `function restoreLocalStorageSnapshot(storage, s...` |
| 1596 | fn | buildLegacyStorageFromRoot | (private) | `function buildLegacyStorageFromRoot(source, met...` |
| 1616 | fn | convertLegacyDataEntriesToObject | (private) | `function convertLegacyDataEntriesToObject(entri...` |
| 1673 | fn | normalizeBackupDataSection | (private) | `function normalizeBackupDataSection(section) {` |
| 1709 | fn | normalizeBackupDataValue | (private) | `function normalizeBackupDataValue(key, value) {` |
| 1718 | fn | mergeBackupDataSections | (private) | `function mergeBackupDataSections(base, addition...` |
| 1734 | fn | sanitizeBackupPayload | (private) | `function sanitizeBackupPayload(raw) {` |
| 1841 | fn | parseBackupDataString | (private) | `function parseBackupDataString(raw) {` |
| 1866 | fn | extractBackupSections | (private) | `function extractBackupSections(raw) {` |
| 1910 | fn | isUnsupportedDownloadPermissionError | (private) | `function isUnsupportedDownloadPermissionError(e...` |
| 1932 | fn | monitorAutomaticDownloadPermission | (private) | `function monitorAutomaticDownloadPermission() {` |
| 2020 | fn | triggerBackupDownload | (private) | `function triggerBackupDownload(url, fileName) {` |
| 2048 | fn | encodeBackupDataUrl | (private) | `function encodeBackupDataUrl(payload) {` |
| 2059 | fn | openBackupFallbackWindow | (private) | `function openBackupFallbackWindow(payload, file...` |
| 2160 | fn | downloadBackupPayload | (private) | `function downloadBackupPayload(payload, fileNam...` |
| 2265 | fn | isAutoBackupName | (private) | `function isAutoBackupName(name) {` |
| 2268 | fn | parseAutoBackupName | (private) | `function parseAutoBackupName(name) {` |

