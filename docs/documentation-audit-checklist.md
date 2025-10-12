# Documentation Audit Checklist

Use this checklist to confirm the documentation suite matches the current
runtime. Run it before every release, after major feature work and during
workstation audits to keep offline crews aligned with the product.

## Preparation

- Pull the latest repository revision and install dependencies locally.
- Serve or open the app, load the dashboard, help dialog and legal pages to
  prime offline caches.
- Gather the most recent planner backup, project bundles, translation exports
  and verification logs for reference.

## Checklist

1. **Feature inventory**
   - Review merged pull requests and release notes.
   - Map each change to save/share/import/backup/restore workflows, automatic gear
     features and documentation surfaces.
   - Update the [Feature Gap Analysis](feature-gap-analysis.md) if gaps remain.
2. **Help & manuals**
   - Read all relevant in-app help topics, printable guides in `docs/` and
     localized READMEs. Confirm language matches the current UI sequence and
     button labels.
   - Capture updated screenshots or diagrams using only locally stored assets.
3. **Localization parity**
   - Ensure every `README.*.md` reflects the latest instructions. Record open
     translation tasks in the [Documentation Coverage Matrix](documentation-coverage-matrix.md)
     and [Translation Guide](translation-guide.md).
4. **Offline verification**
   - Enable airplane mode, rehearse save/share/import/backup/restore workflows and
     confirm prompts plus autosave cadence match the docs.
   - Verify service worker logs match `service-worker-assets.js` hashes.
5. **Storage & schema alignment**
   - Compare `src/scripts/storage.js` and `src/scripts/modules/persistence.js`
     with the [Schema Inventory](schema-inventory.md). Update field descriptions
     and migration notes if anything changed.
6. **Testing evidence**
   - Run the [Testing Plan](testing-plan.md) commands. Attach results to the
     [Documentation Verification Packet](documentation-verification-packet.md) and
     archive logs with backups.
7. **Sign-off**
   - Complete the [Documentation Status Report](documentation-status-report-template.md).
   - File updated guides, verification logs, backups, translation exports and
     share bundles together on offline media.

Consistently running this checklist keeps offline teams confident that written
instructions and the runtime never drift apart.
