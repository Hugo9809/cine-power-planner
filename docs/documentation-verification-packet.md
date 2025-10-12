# Documentation verification packet

This packet bundles the evidence reviewers need to confirm the shipped documentation matches the
runtime. Maintain one per release branch and store redundant copies on offline media.

## Required artefacts
1. **Runtime guard evidence.** Console capture of `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` and the
   resulting JSON export if saved. Shows persistence, offline and UI safeguards remained intact.【F:src/scripts/modules/runtime.js†L2216-L2335】
2. **Planner backup & project bundle.** Latest manual backup JSON plus a project bundle captured after running the offline drill.
   Annotate filenames and timestamps in the verification log.【F:index.html†L2501-L2573】【F:docs/verification-log-template.md†L12-L67】
3. **Restore rehearsal transcript.** Screenshots or exported diff logs from the Restore rehearsal table proving the backup was
   tested in a sandbox before release.【F:index.html†L2581-L2708】
4. **Quick safeguards capture.** Screenshot of **Settings → Data & Storage** after triggering **Download full backup**, showing the
   updated Latest activity list and safety reminders.【F:index.html†L2722-L2778】
5. **Translation summary.** Table of locales updated plus outstanding items, referencing the translation guide entry for follow-up.【F:docs/translation-guide.md†L1-L134】
6. **Offline cache rehearsal.** Notes from running `cineOffline.__internal.clearCacheStorage()` in a disposable profile confirming
   cached assets repopulated successfully.【F:src/scripts/modules/offline.js†L2555-L2606】

## Assembly steps
1. Capture fresh artefacts following the Documentation Update Checklist and Data Protection Playbook routines.【F:docs/documentation-update-checklist.md†L1-L60】【F:docs/data-protection-playbook.md†L1-L147】
2. Store all files in a versioned folder named `YYYY-MM-DD_release-verification/` including checksums for each JSON or image file.
3. Update the verification log entry with storage locations (primary drive, duplicate drive, offsite copy) and checksum manifest
   hash so auditors can trace custody.【F:docs/verification-log-template.md†L12-L67】
4. Zip the folder alongside the localized READMEs and print-ready PDFs. Regenerate `service-worker-assets.js` so the offline app
   ships the refreshed documentation bundle.【F:package.json†L6-L21】
5. Distribute the packet via offline media (two drives minimum). Record recipients and delivery dates in the verification log.

Maintaining the packet guarantees that every guide, translation and screenshot reflects the same runtime
that safeguards user data offline.【F:src/scripts/modules/persistence.js†L1036-L1109】【F:index.html†L2501-L2778】
