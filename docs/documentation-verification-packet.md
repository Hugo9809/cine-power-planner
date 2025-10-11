# Documentation Verification Packet

This guide explains how to assemble a release-ready documentation packet that mirrors the
application state crews rely on in the field. The packet travels with the Cine Power Planner
build, ensuring offline operators can validate instructions and restore data even years after the
release. Every component reinforces the core principle that saving, sharing, importing, backing
up and restoring must never risk user data.

## 1. Capture the written record

1. **Snapshot the READMEs.** Export the primary README and each localized variant to PDF or
   plain-text archives so translations stay aligned with the code at release.
2. **Include runbooks and manuals.** Add updated copies of the offline readiness runbook,
   operations checklist, backup rotation guide, documentation maintenance guide and testing
   plan. These walkthroughs teach crews how to rehearse saves, shares, imports, backups and
   restores without network access.
3. **Mirror in-app help.** If contextual help or legal pages changed, export the relevant HTML
   so offline reviewers can confirm the UI still matches the documentation. Include the
   refreshed search guidance and the Data & Storage auditing notes so every release packet
   documents the new safety reminders about capturing autosave timestamps and navigating the
   quick links while offline.

## 2. Bundle verification artefacts

1. **Planner backup.** Include the `planner-backup.json` generated during the final rehearsal.
   This file proves every project, autosave, automatic gear rule, favorite and runtime note
   survived export.
2. **Project bundle.** Attach the `project-name.json` bundle used to validate targeted restores.
   Pair it with any supplemental automatic gear rule exports that affect the workflow.
3. **Runtime guard capture.** Save the console output from `window.__cineRuntimeIntegrity` or
   `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` to show the persistence
   guard confirmed all gateways before sign-off.【F:src/scripts/script.js†L92-L183】
4. **Checklist evidence.** Add the completed Documentation Update Checklist and the verification
   log entry that records the workstation, browser build, timestamps and storage locations.

## 3. Package for offline storage

1. **Organize by release.** Place the documentation exports and artefacts in a folder named with
   the semantic version and build hash recorded in the app header and verification logs.
2. **Compress and checksum.** Zip the folder, compute SHA-256 and SHA-512 hashes and store the
   manifest alongside the archive so crews can detect tampering even when offline.
3. **Distribute redundantly.** Copy the archive and checksum manifest to at least two encrypted
   drives that travel separately. Record the storage locations in the verification log.

## 4. Verify restoration paths periodically

1. **Quarterly audits.** Once per quarter, restore the archived planner backup and project bundle
   into a fresh offline browser profile. Confirm the documentation packet still matches the UI and
   that the runtime guard reports `{ ok: true }` with no missing safeguards.
2. **Update when workflows change.** If a new save, share, import, backup or restore feature ships,
   rebuild the packet immediately so offline crews never operate with stale instructions.

Maintaining a rigorous documentation verification packet keeps the written guidance, translations
and recovery artefacts synchronized with the product, protecting user data under every offline
scenario the planner supports.
