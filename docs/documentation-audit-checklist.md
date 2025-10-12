# Documentation Audit Checklist

Use this checklist to confirm the documentation suite matches the current
runtime. Run it before every release, after major feature work and during
workstation audits.

## Preparation

- Pull the latest repository revision and install dependencies.
- Build or serve the app and prime offline caches by loading the dashboard,
  help dialog and legal pages.
- Gather the most recent planner backup, project bundles and verification logs.

## Checklist

1. **Feature inventory**
   - Review release notes or merged pull requests.
   - Map each change to save/share/import/backup/restore workflows or automatic
     gear features.
   - Update the [Feature Gap Analysis](feature-gap-analysis.md) if anything is
     missing.
2. **Help and manuals**
   - Read every relevant topic in the in-app help panels and confirm wording
     matches the UI.
   - Update printable guides (`docs/*.md`) when button labels, prompts or order
     of operations change.
3. **Localized READMEs**
   - Ensure `README.*.md` files include the latest instructions and screenshots.
   - Record translation gaps in the [Documentation Coverage Matrix](documentation-coverage-matrix.md).
4. **Offline verification**
   - Enable airplane mode and repeat the core workflows. Confirm prompts,
     autosaves and dialogs still behave as documented.
   - Verify the service worker reports the same asset hashes as
     `service-worker-assets.js`.
5. **Storage and schema**
   - Compare `src/scripts/storage.js` and `src/scripts/modules/persistence.js`
     against the [Schema Inventory](schema-inventory.md). Update tables or field
     descriptions as needed.
6. **Testing evidence**
   - Run the [Testing Plan](testing-plan.md) commands and attach results to the
     [Documentation Verification Packet](documentation-verification-packet.md).
7. **Sign-off**
   - Complete the [Documentation Status Report](documentation-status-report-template.md).
   - File updated guides, verification logs, backups and bundles together.

Consistently running this checklist keeps offline teams confident that written
instructions and the runtime never drift apart.
