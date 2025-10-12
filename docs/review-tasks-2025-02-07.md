# Review Tasks – 2025-02-07

## Fix typo in gear list provenance
- **Issue**: The provenance note for the Sony DVF-EL200 viewfinder references a PDF named `Equpment`, leaving a visible spelling mistake in the in-app dataset.
- **Impact**: Offline crews exporting or printing gear lists see the typo in audit trails, which looks unprofessional and can cause confusion when verifying source documents.
- **Resolution**: The data pack now points to `240315_Detective_von_Fock_Equipment_B-Cam_Rental.pdf`, matching the corrected filename in the offline bundle so the provenance trail reads cleanly everywhere. 【F:src/data/devices/gearList.js†L1-L27】

## Guard deep-freeze fallback when WeakSet is unavailable (bug)
- **Issue**: `fallbackFreezeDeep` instantiates `new WeakSet()` as a default parameter. Browsers without `WeakSet` throw before the guard logic runs, breaking storage safeguards in older offline profiles despite the accompanying comment promising legacy resilience. 【F:src/scripts/modules/runtime.js†L954-L1089】
- **Impact**: On legacy devices the module fails to load, jeopardising autosave and backup flows that depend on the context helpers to protect user data.
- **Resolution**: Every runtime helper now resolves its tracking collection at call time and falls back to array-based tracking when `WeakSet` is missing, keeping deep-freeze protection alive across base, runtime, persistence, system, UI, environment and offline modules. 【F:src/scripts/modules/base.js†L412-L520】【F:src/scripts/modules/persistence.js†L646-L736】【F:src/scripts/modules/system.js†L213-L316】【F:src/scripts/modules/environment.js†L565-L665】【F:src/scripts/modules/runtime.js†L954-L1089】【F:src/scripts/modules/architecture-kernel.js†L476-L536】【F:src/scripts/modules/ui.js†L615-L699】【F:src/scripts/modules/offline.js†L639-L708】
- **Status**: ✅ Legacy and modern bundles now share the resilient tracker logic so browsers without `WeakSet` keep deep-freezing context metadata and protecting autosave, backup and restore paths.

## Correct review doc that claims duplicate-key tests are missing (documentation discrepancy)
- **Issue**: `docs/review-findings.md` still reports that no automated test guards against duplicate optical properties, but the repository now includes `tests/data/gearListDuplicateKeys.test.js` which enforces exactly that invariant. 【F:docs/review-findings.md†L1-L42】【F:tests/data/gearListDuplicateKeys.test.js†L1-L86】
- **Impact**: Contributors waste time chasing a resolved gap and may mistrust other review notes when auditing offline safety tooling.
- **Resolution**: The findings doc now celebrates the active duplicate-key safeguard and points reviewers to the Canon Sumire metadata slice so they can focus on new risks instead of outdated issues. 【F:docs/review-findings.md†L6-L47】

## Add regression test for WeakSet-free environments (test improvement)
- **Issue**: No unit test simulates loading the context module without `WeakSet`, so the brittle default-parameter instantiation could regress without detection. 【F:src/scripts/modules/context.js†L101-L187】
- **Impact**: Future changes might reintroduce the legacy breakage, risking offline autosave guards on older browsers without early warning.
- **Resolution**: Added `tests/unit/baseWeakSetFallback.test.js` to load the base module with `WeakSet` removed, mirroring the existing context harness so the shared freeze guard stays covered. 【F:tests/unit/baseWeakSetFallback.test.js†L1-L120】【F:tests/unit/contextWeakSetFallback.test.js†L1-L107】

## 2025-02 task verification
- **Runtime safeguards.** Confirmed the runtime module continues to expose the guard and module verification APIs the review references, demonstrating that the WeakSet fix landed and remains active.【F:src/scripts/modules/runtime.js†L2203-L2368】
- **Backup workflow cross-check.** Verified Backup & Restore retains the documented controls so tasks referencing documentation updates remain grounded in the live UI.【F:index.html†L2501-L2574】
- **Storage resilience.** Rechecked the critical storage guard mirroring logic so the bug fixes noted here continue to protect redundant planner backups on legacy devices.【F:src/scripts/storage.js†L2850-L3003】

> _2025-02 alignment:_ Verified instructions against the current runtime guard and Backup & Restore UI so offline rehearsals match the shipped safeguards.【F:src/scripts/modules/runtime.js†L2203-L2368】【F:index.html†L2501-L2560】
