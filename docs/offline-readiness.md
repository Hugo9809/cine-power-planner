# Offline readiness guide

Follow this guide before field deployments or training sessions where network access may be limited.
It confirms that every safeguard—saves, backups, restores, share bundles and help copy—works
independently of connectivity.

## Hardware checklist
- Primary workstation with Cine Power Planner loaded from disk.
- Secondary device or profile for restore rehearsal tests.
- Two portable drives for redundant backups and verification packets.

## Software readiness
1. **Verify runtime guard.** Run `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` and
   confirm the result is OK. Record the console output for the verification packet.【F:src/scripts/modules/runtime.js†L2216-L2335】
2. **Exercise persistence.** Perform a manual save, wait for an auto-backup, export a project bundle and a
   planner backup. Note filenames and timestamps.【F:src/scripts/app-events.js†L86-L205】【F:index.html†L2501-L2573】
3. **Restore rehearsal.** Import the backup into a sandbox profile using Restore rehearsal and confirm gear
   lists, rules and favourites match expectations.【F:index.html†L2581-L2708】
4. **Share bundle import.** Import the project bundle on the secondary device to verify share flows work
   offline.【F:src/scripts/modules/persistence.js†L1036-L1109】
5. **Offline cache drill.** Run the offline cache verification drill to ensure help topics and assets load
   without network access.【F:docs/offline-cache-verification-drill.md†L1-L63】

## Documentation readiness
- Confirm README, localized manuals and help entries describe the exact steps rehearsed above.
- Update the documentation status report with current evidence and outstanding items.【F:docs/documentation-status-report-template.md†L1-L60】
- Refresh the translation guide with any pending locale updates.【F:docs/translation-guide.md†L1-L134】

## Storage and transport
- Copy backups, bundles, verification packet and documentation PDFs to both portable drives. Label drives
  with contact info and encryption details where applicable.【F:docs/documentation-verification-packet.md†L1-L48】
- Update the verification log with storage locations, checksums and responsible crew members.【F:docs/verification-log-template.md†L12-L67】

## Final sign-off
- Run through the Save, Share & Restore reference to ensure every documented workflow was rehearsed
  successfully.【F:docs/save-share-restore-reference.md†L1-L140】
- Record completion and any issues in the feature gap analysis document to inform backlog prioritisation.【F:docs/feature-gap-analysis.md†L1-L55】

Adhering to this guide guarantees that crews rely on proven offline behaviours and current
documentation, keeping user data safe throughout the deployment.【F:src/scripts/modules/persistence.js†L1036-L1109】【F:index.html†L2501-L2778】
