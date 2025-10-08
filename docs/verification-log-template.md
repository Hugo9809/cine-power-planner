# Verification Log Template

Maintaining a consistent verification log proves that every save, share, import,
backup and restore rehearsal behaved exactly as documented—even when crews work
entirely offline. Pair this template with the [Save, Share & Import
Drill](../README.md#save-share--import-drill), [Offline Readiness
Runbook](offline-readiness.md) and [Operational
Checklist](operations-checklist.md) so every rehearsal captures the same
evidence, commands and media artifacts.

## How to use this template

1. Create a new entry each time you finish a rehearsal, incident response or
   pre-travel sweep. Store the log beside exported backups and bundles on your
   redundant media.
2. Attach console output for `window.__cineRuntimeIntegrity` plus the result of
   `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` so auditors
   can confirm runtime, persistence and offline safeguards were intact when the
   rehearsal completed.【F:src/scripts/script.js†L315-L357】【F:src/scripts/modules/runtime.js†L1663-L1782】
3. Capture `Quick safeguards → Download full backup` and `Quick safeguards → Open
   Backup & Restore` actions from **Settings → Data & Storage** so the log proves
   the in-app backups succeeded and the activity feed recorded the action.
   Note the `Latest activity` timestamps, record which safety reminders appeared
   (or that the all-clear message displayed) and grab a snapshot of the
   Diagnostics log filter state while you are there.【F:index.html†L2530-L2649】
4. Record a copy of `window.cinePersistence.__internal.inspectAllBindings()`
   and `window.cinePersistence.storage.exportAllData()` whenever you introduce
   new storage bindings or migrate persistence logic. These snapshots prove
   every binding resolved correctly and document the scope of the archived
   payload before media rotation.【F:src/scripts/modules/persistence.js†L775-L880】
5. Include hashes or checksum manifests for every exported file. If a browser
   blocks direct downloads, reference the fallback window transcript so the log
   still shows how the payload left the app.
6. File the completed entry in both digital (JSON, Markdown or text) and printed
   form. The physical copy belongs in the travel kit so crews can review it even
   when no workstation is available.

## Recommended fields

| Field | Details to capture |
| --- | --- |
| Timestamp & operator | Local time, operator initials and reason for the rehearsal. |
| Workstation context | Machine name, browser version, OS build and whether the session was online or offline. |
| Projects & backups checked | Project names, manual saves, `auto-backup-…` snapshots and planner backups reviewed. |
| Commands & console output | Paste outputs for `window.__cineRuntimeIntegrity`, `window.cineRuntime.verifyCriticalFlows()`, `window.cinePersistence.__internal.inspectAllBindings()` and any other diagnostic calls you ran. |
| Exports generated | Filenames, sizes and checksum values for planner backups, project bundles, automatic gear rule exports and diff logs. |
| Quick safeguards evidence | Screenshot or log entry ID showing the **Quick safeguards** backup action, the `Latest activity` timestamps you verified and the safety reminder state. |
| Diagnostics log filters | Which filters were active, whether the “no entries” banner appeared and any noteworthy warnings captured. |
| Diff review notes | Summary of the **Compare versions** results, including any unexpected additions or removals and a link to the exported JSON diff. |
| Follow-up actions | Tickets filed, translation updates required, documentation touch points and the storage locations for redundant media. |

## Sample entry

```text
Timestamp & operator: 2025-03-12 18:42 PST – M. Rivera (pre-travel sweep)
Workstation context: CPP-Field-02, Firefox ESR 115.9, macOS 13.6.1, offline
Projects & backups checked: "Prelight Master" manual save 2025-03-12 18:20, auto-backup-2025-03-12-18-30, planner-backup.json (15.2 MB)
Commands & console output: __cineRuntimeIntegrity.ok === true; verifyCriticalFlows() returned ok with no missing safeguards; inspectAllBindings() showed 0 unresolved bindings
Exports generated: planner-backup-2025-03-12.json (SHA256: …), prelight-master.cpproject (SHA256: …), auto-gear-rules-2025-03-12.json (SHA256: …), compare-prelight-2025-03-12.json (SHA256: …)
Quick safeguards evidence: Download full backup recorded as Activity ID 482; Latest project save 18:20, Latest auto backup 18:30, Latest full app backup 18:42
Diagnostics log filters: All levels, namespace filter cleared, persist session enabled; no hidden entries banner present
Diff review notes: Manual vs auto-backup difference limited to slate notes paragraph spacing; JSON diff attached
Follow-up actions: Update Spanish README gear-rule appendix, copy exports to Vault A & Vault B, sync printed log with travel binder
```

## Storage and retention tips

- Keep the log under version control if your organization mirrors documentation
  repositories, but always redact project-sensitive payloads before committing
  them. Store the full exports on encrypted offline media instead.
- When an incident occurs, append the log entry with cross-references to
  diagnostics or browser console transcripts so future crews can replay the
  timeline without relying on memory.
- Treat missing console output or absent checksum entries as a failed rehearsal.
  Repeat the drill until every field is complete so downstream teams inherit a
  provably safe environment.
