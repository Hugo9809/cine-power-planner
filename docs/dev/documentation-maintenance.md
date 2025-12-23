# Documentation Maintenance Guide

Use this guide to keep all Cine Power Planner documentation current with the
runtime. Offline crews rely on these instructions to protect user data.

## Update triggers

- Persistence logic changes (`storage.js`, `modules/persistence.js`).
- UI tweaks that affect save/share/import/backup/restore workflows.
- New locales or updates to `src/scripts/translations/<locale>.js` modules or the
  loader in `src/scripts/translations.js`.
- Service worker or offline cache adjustments.
- Any change to verification evidence exported with releases.

## Maintenance workflow

1. **Scope the update**
   - List affected docs, help topics, README translations and checklists.
   - Confirm required screenshots or diagrams can be captured offline.
   - Identify any save/share/import/backup/restore touchpoints so every
     data-protection workflow stays in sync.
2. **Coordinate stakeholders**
   - Notify localisation, QA and product owners.
   - Reserve review time to validate instructions before shipping.
3. **Draft updates**
   - Edit markdown files using offline-safe editors.
   - Ensure anchors, lists and references align with actual UI labels.
   - Reference locally stored icons/Uicons only.
   - Avoid external links; instead point to local markdown or in-app help topics
     so offline crews retain access.
4. **Verify accuracy**
   - Run the [Operations Checklist](operations-checklist.md) to confirm steps.
   - Execute the [Offline Cache Verification Drill](offline-cache-verification-drill.md)
     if assets or caching behaviour changed.
   - Walk through the full data safety cycle (save, autosave, share, import,
     backup and restore) and confirm the documentation matches the UI labels,
     telemetry strings, and alert text exactly as rendered in the current build.
   - Capture console output (`window.__cineRuntimeIntegrity`) or re-run
     `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` and
     attach the report to the verification log so documentation references the
     exact guard validation you exercised.
   - While still disconnected, open the in-app help center plus every updated
     localized README to confirm the topics match the new behaviour and render
     without remote dependencies.
5. **Review & approval**
   - Peer review docs against the running app.
   - Secure localisation approval for updated strings.
   - Update the [Documentation Coverage Matrix](documentation-coverage-matrix.md)
     and [Documentation Status Report](documentation-status-report-template.md).
6. **Archive evidence**
   - Store updated PDFs (if exported), screenshots, **Compare versions** diff
     log exports and backups with the release verification packet.
   - Note storage locations in `docs/dev/review-findings.md`.

## Post-release checks

- Confirm offline bundles include the updated docs.
- Spot-check translations in the running app.
- Schedule a follow-up audit using the [Documentation Audit Checklist](documentation-audit-checklist.md).
 - Validate that the Save/Share/Import/Backup/Restore help topics remain aligned
   with the current build and that no new UI labels were introduced without a
   doc update.
