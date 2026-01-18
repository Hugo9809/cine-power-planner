# src/scripts/modules/features/backup.js

[← Back to Module](../modules/src-scripts-modules-features/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 2939
- **Language:** JavaScript
- **Symbols:** 88
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 5 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 23 | fn | resolveModuleBase | (private) | `function resolveModuleBase(scope) {` |
| 62 | fn | freeze | (private) | `function freeze(target) {` |
| 162 | fn | resolveAutoGearPersistence | (private) | `function resolveAutoGearPersistence() {` |
| 172 | fn | getAutoGearBackupSnapshot | (private) | `function getAutoGearBackupSnapshot() {` |
| 182 | fn | readValue | (private) | `const readValue = (key, fallback, readerName) => {` |
| 208 | fn | buildAutoGearSnapshotEntries | (private) | `function buildAutoGearSnapshotEntries(snapshot) {` |
| 252 | fn | setBackupVaultFallbackMode | (private) | `function setBackupVaultFallbackMode(active, det...` |
| 271 | fn | refreshBackupVaultFallbackMode | (private) | `function refreshBackupVaultFallbackMode(detail) {` |
| 286 | fn | getBackupVaultFallbackState | (private) | `function getBackupVaultFallbackState() {` |
| 294 | fn | isBackupVaultFallbackActive | (private) | `function isBackupVaultFallbackActive() {` |
| 298 | fn | createMemoryBackupVault | (private) | `function createMemoryBackupVault() {` |
| 332 | fn | resetFallbackVaultStorageReference | (private) | `function resetFallbackVaultStorageReference() {` |
| 338 | fn | isStorageLike | (private) | `function isStorageLike(candidate) {` |
| 345 | fn | getBackupVaultFallbackStorage | (private) | `function getBackupVaultFallbackStorage() {` |
| 427 | fn | readFallbackVaultRecords | (private) | `function readFallbackVaultRecords() {` |
| 481 | fn | writeFallbackVaultRecords | (private) | `function writeFallbackVaultRecords(records) {` |
| 522 | fn | persistFallbackVaultRecord | (private) | `function persistFallbackVaultRecord(record) {` |
| 551 | fn | removeFallbackVaultRecordEntry | (private) | `function removeFallbackVaultRecordEntry(id) {` |
| 569 | fn | combineBackupVaultRecordSets | (private) | `function combineBackupVaultRecordSets(indexedRe...` |
| 571 | fn | addRecords | (private) | `const addRecords = (records, storageType) => {` |
| 611 | fn | isIndexedDBAvailable | (private) | `function isIndexedDBAvailable() {` |
| 615 | fn | openBackupVaultDb | (private) | `function openBackupVaultDb() {` |
| 658 | fn | withBackupVaultStore | (private) | `function withBackupVaultStore(mode, executor) {` |
| 693 | fn | ensureVaultRecordMetadata | (private) | `function ensureVaultRecordMetadata(metadata) {` |
| 719 | fn | createBackupVaultRecord | (private) | `function createBackupVaultRecord(fileName, payl...` |
| 740 | fn | persistBackupVaultRecord | (private) | `function persistBackupVaultRecord(record) {` |
| 776 | fn | listBackupVaultRecords | (private) | `function listBackupVaultRecords() {` |
| 815 | fn | removeBackupVaultRecord | (private) | `function removeBackupVaultRecord(id) {` |
| 859 | fn | clearBackupVault | (private) | `function clearBackupVault() {` |
| 861 | fn | dbDeletionPromise | (private) | `const dbDeletionPromise = (async () => {` |
| 950 | fn | dispatchBackupVaultEvent | (private) | `function dispatchBackupVaultEvent(type, detail) {` |
| 983 | fn | getQueuedBackupPayloads | (private) | `function getQueuedBackupPayloads() {` |
| 1016 | fn | queueBackupPayloadForVault | (private) | `function queueBackupPayloadForVault(fileName, p...` |
| 1040 | fn | resolveBackupTexts | (private) | `function resolveBackupTexts() {` |
| 1051 | fn | resolveQueuedBackupMessage | (private) | `function resolveQueuedBackupMessage(fileName) {` |
| 1059 | fn | resolveBackupVaultEmptyMessage | (private) | `function resolveBackupVaultEmptyMessage() {` |
| 1066 | fn | resolveBackupVaultWindowTitle | (private) | `function resolveBackupVaultWindowTitle() {` |
| 1073 | fn | resolveBackupVaultWindowIntro | (private) | `function resolveBackupVaultWindowIntro() {` |
| 1080 | fn | openQueuedBackupVaultWindow | (private) | `function openQueuedBackupVaultWindow() {` |
| 1378 | fn | FALLBACK_STORAGE_KEYS | (private) | `const FALLBACK_STORAGE_KEYS = (() => {` |
| 1403 | fn | isPlainObject | (private) | `function isPlainObject(value) {` |
| 1424 | fn | isMapLike | (private) | `function isMapLike(value) {` |
| 1450 | fn | convertMapLikeKey | (private) | `function convertMapLikeKey(key) {` |
| 1478 | fn | convertMapLikeToObject | (private) | `function convertMapLikeToObject(mapLike) {` |
| 1484 | fn | assignEntry | (private) | `const assignEntry = (rawKey, value) => {` |
| 1532 | fn | formatFullBackupFilename | (private) | `function formatFullBackupFilename(date) {` |
| 1536 | fn | pad | (private) | - |
| 1560 | fn | resolveSafeLocalStorage | (private) | `function resolveSafeLocalStorage() {` |
| 1580 | fn | captureStorageSnapshot | (private) | `function captureStorageSnapshot(storage) {` |
| 1587 | fn | assignEntry | (private) | `const assignEntry = (key, valueOrGetter) => {` |
| 1608 | fn | tryEnumerateByIndex | (private) | `const tryEnumerateByIndex = () => {` |
| 1632 | fn | tryEnumerateByKeys | (private) | `const tryEnumerateByKeys = () => {` |
| 1646 | fn | iterate | (private) | `const iterate = (list) => {` |
| 1660 | fn | tryEnumerateByForEach | (private) | `const tryEnumerateByForEach = () => {` |
| 1716 | fn | createSafeStorageReader | (private) | `function createSafeStorageReader(storage, error...` |
| 1738 | fn | restoreSessionStorageSnapshot | (private) | `function restoreSessionStorageSnapshot(snapshot) {` |
| 1780 | fn | normalizeStoredValue | (private) | `function normalizeStoredValue(value) {` |
| 1799 | fn | convertEntriesToSnapshot | (private) | `function convertEntriesToSnapshot(section) {` |
| 1825 | fn | assignEntry | (private) | `const assignEntry = (key, value) => {` |
| 1862 | fn | extractFirstMatchingSnapshot | (private) | `function extractFirstMatchingSnapshot(source, k...` |
| 1887 | fn | looksLikeStoredSettingKey | (private) | `function looksLikeStoredSettingKey(key) {` |
| 1894 | fn | restoreLocalStorageSnapshot | (private) | `function restoreLocalStorageSnapshot(storage, s...` |
| 1940 | fn | buildLegacyStorageFromRoot | (private) | `function buildLegacyStorageFromRoot(source, met...` |
| 1958 | fn | convertLegacyDataEntriesToObject | (private) | `function convertLegacyDataEntriesToObject(entri...` |
| 1971 | fn | assignEntry | (private) | `const assignEntry = (key, value) => {` |
| 2050 | fn | normalizeBackupDataSection | (private) | `function normalizeBackupDataSection(section) {` |
| 2092 | fn | normalizeBackupDataValue | (private) | `function normalizeBackupDataValue(key, value) {` |
| 2102 | fn | mergeBackupDataSections | (private) | `function mergeBackupDataSections(base, addition...` |
| 2121 | fn | sanitizeBackupPayload | (private) | `function sanitizeBackupPayload(raw) {` |
| 2126 | fn | decodeBinaryPayload | (private) | `const decodeBinaryPayload = (value) => {` |
| 2142 | fn | isArrayBufferView | (private) | `const isArrayBufferView = (() => {` |
| 2162 | fn | toUint8Array | (private) | `const toUint8Array = () => {` |
| 2179 | fn | decodeWithTextDecoder | (private) | `const decodeWithTextDecoder = (array) => {` |
| 2192 | fn | decodeWithBuffer | (private) | `const decodeWithBuffer = () => {` |
| 2204 | fn | decodeManually | (private) | `const decodeManually = (array) => {` |
| 2258 | fn | parseBackupDataString | (private) | `function parseBackupDataString(raw) {` |
| 2288 | fn | extractBackupSections | (private) | `function extractBackupSections(raw) {` |
| 2359 | fn | isUnsupportedDownloadPermissionError | (private) | `function isUnsupportedDownloadPermissionError(e...` |
| 2386 | fn | monitorAutomaticDownloadPermission | (private) | `function monitorAutomaticDownloadPermission() {` |
| 2452 | fn | finalize | (private) | `const finalize = () => {` |
| 2485 | fn | triggerBackupDownload | (private) | `function triggerBackupDownload(url, fileName) {` |
| 2512 | fn | encodeBackupDataUrl | (private) | `function encodeBackupDataUrl(payload) {` |
| 2525 | fn | openBackupFallbackWindow | (private) | `function openBackupFallbackWindow(payload, file...` |
| 2645 | fn | downloadBackupPayload | (private) | `function downloadBackupPayload(payload, fileNam...` |
| 2770 | fn | isAutoBackupName | (private) | `function isAutoBackupName(name) {` |
| 2776 | fn | parseAutoBackupName | (private) | `function parseAutoBackupName(name) {` |
| 2781 | fn | config | (private) | `const config = (() => {` |

