# Offline Help & Translation Verification

Use this checklist to confirm the in-app help center, offline documentation
links and translations stay in sync with the runtime—even when every workstation
operates without connectivity. Run it alongside the Operations Checklist during
releases, rehearsal days and localisation updates so crews always see accurate,
cache-resident guidance.

## Prerequisites

- The repository (including locally stored Uicons, animated icons and fonts) is
  present on the workstation.
- The planner has been opened once so the service worker can cache help topics
  and referenced documentation assets.
- Fresh planner backups and project bundles are stored on two offline media
  locations before testing, preserving user data if you encounter issues.

## Verification steps

1. **Prime the cache intentionally**
   - Open `index.html`, wait for the offline indicator to settle and confirm the
     header hint shows cached assets are ready. Record the active
     `window.APP_VERSION` for the verification log.
   - Navigate to **Help → Quick start checklist** and scroll through each topic
     while online to ensure the service worker caches every panel before you go
     offline.
2. **Switch to fully offline rehearsal mode**
   - Disconnect from the network (or enable Airplane Mode) and reload
     `index.html`. Confirm the offline indicator flashes, then stabilises. The
     help overlay must still open instantly.
3. **Validate help topics and search**
   - Open **Help** and search for save, share, import, backup and restore topics.
     Confirm each entry loads and matches the current UI labels. Verify that the
     contextual prompts still reference the autosave banner, queued-backup vault
     guidance and the **Force reload** control.
   - Trigger the help overlay from an editor panel and confirm the matching
     topic appears without a network call.
4. **Cross-check localized guidance**
   - Switch languages from the header selector and repeat the search queries.
     Confirm translated help text mirrors the English wording and renders with
     the locally stored fonts and icons. Note any strings that differ from the
     corresponding `README.<locale>.md` sections.
   - Capture screenshots of each locale’s help search and a representative topic
     to attach to the verification packet and translation approvals.
5. **Verify documentation links resolve offline**
   - From the help overlay, open linked documentation entries (e.g. Operations
     Checklist, Save/Share/Restore reference). Ensure the markdown renders from
     local files, the service worker serves cached assets and no external links
     are required.
   - Confirm the **Documentation update tracker** entry inside **Settings →
     General** reflects the help changes you just reviewed so runtime logs and
     doc updates share the same evidence trail.
6. **Record evidence and guardrails**
   - Export `planner-backup.json` and a project bundle after the help rehearsal
     to protect any new autosave snapshots generated during testing.
   - Capture console output for `window.__cineRuntimeIntegrity` and add the
     offline indicator/screenshot timestamps to the verification packet. Note
     storage media locations in `review-findings.md`.

## Expected outputs

- Help topics load instantly while offline across all tested locales.
- Search results surface save/share/import/backup/restore topics with the same
  phrasing used in the UI and README files.
- Linked documentation opens from cached local files without reaching external
  domains.
- Verification artifacts (screenshots, backups, console captures and translation
  approvals) are staged with the documentation verification packet on redundant
  media.

## When to rerun this drill

- After updating help content, translations, documentation links or offline
  caching logic.
- Before shipping any build intended for air-gapped workstations.
- Whenever QA reports drift between help topics and README instructions.
