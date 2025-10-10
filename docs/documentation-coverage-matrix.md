# Documentation Coverage Matrix

This matrix keeps every documentation surface synchronized with the offline-first
contracts enforced in code. Use it during planning, code review and final
verification to confirm that the guidance for saving, sharing, importing,
backing up and restoring always matches what the application does while
protecting user data.

- **When to run it.** Review the matrix before opening a pull request, during
  documentation review and as part of the release sign-off so localized guides
  and in-app help never drift from the behavior guaranteed by the runtime
  modules and service worker.
- **How to record results.** Copy the checklist rows that changed into your
  verification log entry, attach updated manuals or screenshots and store the
  evidence with the rehearsal exports outlined in the
  [Documentation Verification Packet](documentation-verification-packet.md).
- **How it relates to other guides.** Pair the matrix with the
  [Documentation, Help & Translation Maintenance Guide](documentation-maintenance.md)
  for full procedures and the [Documentation Update Checklist](documentation-update-checklist.md)
  when you need a fast pre-merge sweep.

## 1. Coverage matrix

| Area | Source of truth in code | README family | In-app help & hover copy | Printable runbooks | Translation surfaces | Verification notes |
| --- | --- | --- | --- | --- | --- | --- |
| **Manual saves & auto-backups** | `cinePersistence` wrappers expose save, load and autosave helpers while the runtime verifier ensures every binding stays online-free.【F:src/scripts/modules/persistence.js†L820-L883】【F:src/scripts/modules/runtime.js†L1663-L1782】 | `README.md` → *Saving & Project Management*, localized equivalents. | Help topics under **Saving projects**, hover help on **Save** and autosave status overlays. | `docs/offline-readiness.md`, `docs/operations-checklist.md`. | `src/scripts/translations.js` entries `save*`, `autosave*`, `backupGuardian*`. | Capture manual save + autosave rehearsal, log selector timestamps, archive diff export.
| **Planner backups & restores** | Backup wrappers collect full archives and restore helpers stage rehearsals, validate payloads and roll back on errors before touching live data.【F:src/scripts/modules/persistence.js†L864-L883】【F:src/scripts/app-session.js†L8183-L8329】 | `README.md` → *Backup & Recovery*, *Emergency Recovery Playbook*. | Help topics under **Backups**, the **Data & Storage dashboard** article, restore dialogs and forced pre-restore backup notices.【F:index.html†L4275-L4355】 | `docs/save-share-restore-reference.md`, `docs/backup-rotation-guide.md`. | `src/scripts/translations.js` entries `backup*`, `restore*`, `compareVersions*`. | Store fresh `planner-backup.json`, rehearse restore in isolated profile, attach runtime guard output.
| **Project bundles & sharing** | Exporters assemble full project bundles and guard modules validate imports before merging into the active profile.【F:src/scripts/modules/persistence.js†L878-L883】【F:src/scripts/app-setups.js†L843-L1144】【F:src/scripts/modules/core/persistence-guard.js†L189-L220】 | `README.md` → *Sharing & Imports*, *Save, Share & Import Drill*. | Help topics for **Project bundles**, hover help on **Export project**/**Import project**. | `docs/save-share-restore-reference.md`, `docs/offline-readiness.md`. | `src/scripts/translations.js` entries `exportProject*`, `importProject*`, `shareBundle*`. | Export project bundle, import on verification profile, record incident notes diff.
| **Project storage requirements** | The requirements form merges camera recording types with the media catalog so Storage & Media rows stay accurate offline, even when planning additional card families.【F:src/scripts/app-core-new-1.js†L13274-L13318】【F:src/data/devices/gearList.js†L2464-L3460】 | `README.md` → *Everyday Workflow* step 4; localized equivalents. | Storage section in the project dialog help text and offline walkthroughs. | `docs/offline-readiness.md` (Storage hygiene), `docs/operations-checklist.md`. | `src/scripts/translations.js` entries `storageNeeds*`. | Add and restore storage rows covering CFexpress, CFast, SD and microSD media during rehearsal, confirm autosave captures the entries, and verify the Recording Frame Rate field announces the allowed 1–max fps range for the selected sensor mode while preserving the entered value across saves and exports.
| **Automatic gear rules & retention timelines** | Persistence wrappers keep rule presets, backups and retention settings synchronized while controllers enforce offline retention safeguards and safety snapshots.【F:src/scripts/modules/persistence.js†L831-L839】【F:src/scripts/app-core-new-2.js†L2138-L2958】 | `README.md` → *Automatic Gear Rules*, *Data & Storage Overview*. | Help topics under **Automatic gear rules**, retention warnings in dialogs. | `docs/auto-gear-rule-options.md`, `docs/testing-plan.md`. | `src/scripts/translations.js` entries `autoGear*`, `retention*`. | Export `auto-gear-rules-*.json`, confirm retention summary, capture verification screenshot.
| **Guided onboarding tutorial** | `cine.features.onboardingTour` orchestrates the first-run walkthrough, records progress offline, drives the Power Summary review sequence (including the Quick summary checkpoint) and the offline safety net rehearsal, and exposes a progress meter, resume affordance and quick start status summary inside Help.【F:src/scripts/modules/features/onboarding-tour.js†L1-L1480】【F:src/scripts/app-core-new-1.js†L12347-L12366】 | `README.md` → *Quick Start* (guided tutorial step). | Help dialog quick start checklist button, copy and progress status. | `docs/documentation-update-checklist.md` (first-run rehearsal). | `src/scripts/translations.js` entries `onboardingTour*`, `helpOnboardingTutorialCopy`. | Launch the tutorial offline, confirm the Power Summary step highlights Results, the offline safety net step calls out the indicator and autosave safeguards, the Quick summary checkpoint card is called out, the meter reflects saved progress, the resume hint reports counts after reopening, the quick start status reports completed/total counts and next step, skip/complete persistence holds and replay works from Help.
| **Runtime guard & diagnostics** | Runtime verifier tracks every persistence, offline and UI safeguard before crews rely on a session.【F:src/scripts/script.js†L92-L183】【F:src/scripts/modules/runtime.js†L1663-L1782】 | `README.md` → *Data Safety & Offline Operation*, *Data Integrity Drills*. | Help diagnostics topic, console guidance inside **Settings → Diagnostics log**. | `docs/offline-readiness.md`, `docs/operations-checklist.md`, `docs/testing-plan.md`. | `src/scripts/translations.js` entries `diagnostics*`, `runtimeIntegrity*`. | Run `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })`, archive console capture.

## 2. Using the matrix during reviews

1. **Identify impacted rows.** For each feature or copy change, mark the rows that
   mention the affected modules or workflows. Trace the same row across every
   documentation surface so nothing drifts.
2. **Update surfaces in lockstep.** Apply the copy changes to the README family,
   help center, printable manuals and translations together. Reference this
   matrix from the pull request description so reviewers know which surfaces to
   inspect.
3. **Rehearse offline.** Follow the rehearsal steps listed in the verification
   column while disconnected from the network. Store backups, bundles and diff
   exports alongside the documentation update artifacts.
4. **Log outcomes.** Paste the updated row summaries or direct links to the
   changed files into the verification log template. Include timestamps, machine
   names and hash values for the rehearsal exports.

## 3. Maintenance checkpoints

- Revisit the matrix after every dependency update or service worker change to
  confirm the documented caches, icons and offline storage guarantees still hold.
- When adding a new workflow area, append a row that lists the controlling
  module, the documentation surfaces and the rehearsal artifact expected during
  verification. Link to any new printable guides or help center topics so the
  next release automatically inherits the coverage.
- During quarterly audits, read through each row with the latest release build,
  confirm the rehearsals still pass offline and attach the signed matrix to the
  documentation verification packet.

Keeping this matrix current ensures crews always receive accurate, localized and
redundant guidance for every workflow that touches user data, even when they are
working entirely offline.
