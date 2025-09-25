# Step 2 – Persistence & Backup Module Extraction

## Overview
The `cinePersistence` module now centralises every storage, autosave, backup, restore and sharing
entry point behind a frozen facade so the UI can depend on a single, lossless contract. The wrapper
defers to the existing implementations in `storage.js`, `app-session.js` and `app-setups.js`, keeping
all safety guards intact while giving future refactors a clean integration seam.【F:src/scripts/modules/persistence.js†L1-L125】

## Module Layout
| Category | Responsibilities | Wrapped entry points |
| --- | --- | --- |
| `storage` | Local/session storage access, schema migrations, auto-gear retention, backup history | `loadDeviceData`, `saveDeviceData`, `loadSetups`, `saveSetups`, `saveSetup`, `loadSetup`, `deleteSetup`, `renameSetup`, `loadSessionState`, `saveSessionState`, `loadFeedback`, `saveFeedback`, `saveProject`, `loadProject`, `deleteProject`, `loadFavorites`, `saveFavorites`, `exportAllData`, `importAllData`, `clearAllData`, `loadAutoGearRules`, `saveAutoGearRules`, `loadAutoGearBackups`, `saveAutoGearBackups`, `loadAutoGearBackupRetention`, `saveAutoGearBackupRetention`, `loadAutoGearPresets`, `saveAutoGearPresets`, `loadAutoGearActivePresetId`, `saveAutoGearActivePresetId`, `loadAutoGearAutoPresetId`, `saveAutoGearAutoPresetId`, `loadAutoGearMonitorDefaults`, `saveAutoGearMonitorDefaults`, `loadAutoGearBackupVisibility`, `saveAutoGearBackupVisibility`, `loadFullBackupHistory`, `saveFullBackupHistory`, `recordFullBackupHistoryEntry` |
| `autosave` | Session snapshots, setup autosaves, gear list persistence | `saveSession`, `autoSaveSetup`, `saveGearList`, `restoreSessionState` |
| `backups` | Manual backups, automatic backups, payload sanitisation, download helpers | `collectFullBackupData`, `createSettingsBackup`, `captureStorageSnapshot`, `sanitizeBackupPayload`, `autoBackup`, `formatFullBackupFilename`, `downloadPayload`, `recordFullBackupHistoryEntry` |
| `restore` | Restore rehearsal commands | `proceed`, `abort` |
| `share` | Share/export/import helpers | `downloadProject`, `encodeSharedSetup`, `decodeSharedSetup`, `applySharedSetup`, `applySharedSetupFromUrl` |

Each wrapper resolves the latest implementation lazily, so future module moves or dependency
injections can supply replacements without rewriting the facade. The API is deeply frozen to prevent
accidental mutation of the safety-critical entry points.【F:src/scripts/modules/persistence.js†L26-L118】

## Loader & Offline Updates
The script loader now fetches the persistence module after the session logic so it is available for
both modern and legacy bundles, and the service worker precaches the new asset to preserve
offline-first guarantees.【F:src/scripts/loader.js†L465-L492】【F:legacy/scripts/loader.js†L420-L446】【F:service-worker.js†L1-L63】

## Verification
A dedicated Jest suite asserts that every wrapper delegates to the underlying implementation without
mutating arguments and that the exported API is deeply frozen, guarding lossless behaviour across all
entry points.【F:tests/unit/persistenceModule.test.js†L1-L195】
