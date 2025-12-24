# Documentation Verification Packet

Bundle this packet with every release to prove documentation, translations and
runtime behaviour align. Store at least two copies on physical media with the
release backups.

## Contents checklist

- [ ] Completed [Documentation Status Report](documentation-status-report-template.md).
- [ ] Filled [Verification Log Template](verification-log-template.md) with
      timestamps, operators and evidence locations.
- [ ] Screenshots of key workflows (save, autosave ledger, backup, restore
      sandbox, project export/import) captured from the current build.
- [ ] Console export showing `window.__cineRuntimeIntegrity` and service worker
      diagnostics.
- [ ] Planner backup (`planner-backup.json`) and project bundles with checksums.
- [ ] Updated documentation files (markdown/PDF) stored alongside the packet.
- [ ] Translation approval records for all locales.

## Assembly steps

1. Create a folder named `verification-<YYYYMMDD>-<revision>`.
2. Copy documentation diffs, screenshots, backups and console logs into the
   folder. Preserve original filenames.
3. Generate a manifest `manifest.json` listing each artifact, checksum and
   storage media location.
4. Print the manifest and include it with the physical media.
5. Update `../dev/reviews/review-findings.md` with storage locations and responsible contacts.

## Review workflow

- QA verifies evidence completeness before release.
- Documentation lead confirms every doc mentioned in the manifest was updated.
- Localisation lead signs off translations and stores approvals in the packet.
- Engineering verifies hashes for backups and bundles.
- Store one copy with production, one off-site.

## Post-release maintenance

- Update the [Documentation Coverage Matrix](documentation-coverage-matrix.md)
  with the packet storage locations.
- Schedule the next audit via `review-tasks-2025-02-07.md`.
- During incident response, reference the most recent packet to assess user data
  exposure and documentation accuracy.
