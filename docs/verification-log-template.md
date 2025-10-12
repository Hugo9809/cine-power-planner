# Verification log template

Maintaining a consistent verification log proves that saves, shares, imports, backups and restore
rehearsals behaved exactly as documented. Complete a new entry after every drill, release rehearsal or
incident response.

## Instructions
1. Store the log alongside exported backups, bundles and documentation packets on redundant offline media.【F:docs/documentation-verification-packet.md†L1-L48】
2. Capture console output for `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` and note the
   result. This confirms persistence, offline and UI safeguards were intact when the rehearsal finished.【F:src/scripts/modules/runtime.js†L2216-L2335】
3. Record the filenames, sizes and checksums for planner backups, project bundles, automatic gear exports
   and diff logs generated during the session.【F:src/scripts/modules/persistence.js†L1036-L1109】【F:index.html†L2501-L2573】
4. Note the **Latest activity** timestamps and safety reminders shown in Settings → Data & Storage after
   running **Quick safeguards → Download full backup**.【F:index.html†L2722-L2778】
5. Include evidence from Restore rehearsal (screenshots or exported diff logs) proving backups were tested
   before release.【F:index.html†L2581-L2708】
6. Document any translation or documentation updates triggered by the rehearsal so localization teams can
   keep manuals in sync.【F:docs/translation-guide.md†L1-L80】【F:docs/documentation-update-checklist.md†L1-L68】

## Recommended fields
| Field | Details to capture |
| --- | --- |
| Timestamp & operator | ISO timestamp, operator initials, reason for rehearsal. |
| Environment | Machine name, browser version, OS, online/offline state. |
| Persistence evidence | Manual save/auto-backup timestamps, planner backup filename, checksums. |
| Runtime diagnostics | Output of `verifyCriticalFlows()` and any warnings from the console. |
| Restore rehearsal summary | Source file, comparison notes, screenshot IDs or diff log filenames. |
| Quick safeguards activity | Activity IDs or screenshots confirming the backup action and reminders. |
| Share/import checks | Bundle filenames tested, import outcome, any sanitization warnings observed.【F:src/scripts/modules/persistence.js†L1105-L1109】 |
| Documentation follow-up | Guides or translations updated plus ticket references. |
| Storage locations | Primary/secondary media where artefacts were stored and checksum manifest path. |

## Sample entry (abridged)
```text
Timestamp & operator: 2025-02-07T18:42Z – K. Ito (release rehearsal)
Environment: CPP-Review-01, Firefox ESR 115.9, macOS 13.6.1, offline
Persistence evidence: planner-backup-2025-02-07.json (SHA256 …), auto-backup-2025-02-07-18-30.json (SHA256 …)
Runtime diagnostics: verifyCriticalFlows().ok === true; no missing modules
Restore rehearsal summary: rehearsal of planner-backup-2025-02-07.json matched live data; screenshot IDs 482-485 stored in packet
Quick safeguards activity: Activity entry 773 logged Download full backup with reminder “All safeguards current”
Share/import checks: bundle-prelight.cpproject imported cleanly; no warnings
Documentation follow-up: Updated Spanish automatic gear wording; translation tickets #203/#204
Storage locations: Vault A SSD (checksum manifest 2025-02-07.txt), Vault B SSD duplicate
```

## Retention tips
- Keep digital copies in version control when possible, but omit sensitive payloads and store them on
  encrypted offline media instead.
- Treat incomplete entries as failed rehearsals; rerun until every field is populated.
- Reference the operations checklist when archiving logs so the same evidence is captured each time.【F:docs/operations-checklist.md†L1-L44】

Recording verification details in this template ensures future crews can prove the documented safeguards
were active and that user data stayed protected offline.【F:src/scripts/modules/persistence.js†L1036-L1109】【F:index.html†L2501-L2778】
