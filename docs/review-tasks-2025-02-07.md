# Review tasks – 2025-02-07

The following actions remain open after the February 2025 documentation and runtime review. Each task
includes the evidence required to mark it complete.

## 1. Autosave walkthrough screenshot refresh
- **Owner:** Docs team
- **Steps:** Re-run the Backup & Restore autosave walkthrough, capture new screenshots of Compare versions
  and Latest activity panels, and embed them in the README/printouts.【F:index.html†L2501-L2778】
- **Evidence:** Updated images stored in the verification packet with filenames `2025-02-07_autosave_stepN.png`.

## 2. Translation follow-up (es, fr)
- **Owner:** Localization
- **Steps:** Update automatic gear backup terminology in `translations.js` for Spanish and French, matching
  the English help labels introduced this cycle.【F:src/scripts/translations.js†L120-L220】【F:index.html†L1460-L1520】
- **Evidence:** PR referencing translation keys and screenshot of automatic gear panel in each locale.

## 3. Service worker asset regeneration
- **Owner:** Engineering
- **Steps:** Run `npm run generate:sw-assets` after merging documentation updates, commit the regenerated
  manifest and rerun the offline cache drill.【F:package.json†L6-L21】【F:docs/offline-cache-verification-drill.md†L1-L63】
- **Evidence:** Console log of successful command, updated `service-worker-assets.js`, and verification log
  entry noting the drill completion.【F:docs/verification-log-template.md†L12-L67】

## 4. Verification log backlog cleanup
- **Owner:** Operations
- **Steps:** Backfill missing checksum entries for January exports and ensure storage locations are recorded
  for both portable drives.【F:docs/verification-log-template.md†L12-L67】
- **Evidence:** Updated log committed to the repository plus signed acknowledgement from the storage team.

## 5. Feature gap analysis update
- **Owner:** Product
- **Steps:** Review pending feature requests against the updated checklist, classify risks and append the
  findings to the gap analysis document.【F:docs/feature-gap-analysis.md†L1-L55】
- **Evidence:** Documented risk ratings with references to runtime modules or docs demonstrating coverage.

Track progress in the documentation status report template and close these tasks once evidence lands in
the verification packet.【F:docs/documentation-status-report-template.md†L1-L60】【F:docs/documentation-verification-packet.md†L1-L48】
