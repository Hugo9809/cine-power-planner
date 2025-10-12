# Translation guide

Use this guide to keep localized materials aligned with Cine Power Planner’s offline workflows. Every
locale must describe the same save, backup, restore and share behaviour.

## Source files
- `src/scripts/translations.js` – runtime strings for UI, help entries and settings.【F:src/scripts/translations.js†L120-L220】
- `README.<locale>.md` – localized manuals bundled with releases.
- `docs/` – printable guides (offline readiness, operations, save/share/restore) that need locale parity.【F:docs/offline-readiness.md†L1-L80】【F:docs/operations-checklist.md†L1-L99】【F:docs/save-share-restore-reference.md†L1-L140】

## Workflow
1. **Identify changes.** From the documentation update checklist, note which strings or screenshots changed this cycle.【F:docs/documentation-update-checklist.md†L1-L68】
2. **Update translations.** Edit `translations.js` entries and localized READMEs. Keep placeholders, HTML markup and accessibility
   cues identical across languages.【F:src/scripts/translations.js†L120-L220】
3. **Verify offline.** Switch the planner to each locale, open Settings → Backup & Restore, Settings → Data & Storage and the help
   dialog to confirm translations fit the UI and reference the correct controls.【F:index.html†L2501-L2778】【F:index.html†L4401-L4413】
4. **Record status.** Update this guide with outstanding locales, include expected delivery dates and link to verification log
   entries capturing translated screenshots.【F:docs/verification-log-template.md†L12-L67】

## Locale tracking table
| Locale | README status | UI strings | Screenshots | Notes |
| --- | --- | --- | --- | --- |
| en | ✅ | ✅ | ✅ | Source of truth |
| de | ✅ | ✅ | ✅ | 2025-02 audit complete |
| es | ⏳ | ⏳ | ⏳ | Update automatic gear backups terminology (Task #2) |
| fr | ⏳ | ⏳ | ⏳ | Same as Spanish |
| it | ✅ | ✅ | ✅ | Confirmed during 2025-02 review |

## Release sign-off
- Translators provide updated files plus screenshots for each locale.
- Documentation lead verifies offline rehearsal results using the verification packet and marks locales complete here.【F:docs/documentation-verification-packet.md†L1-L48】
- Operations updates the status report with the translation summary before the release ships.【F:docs/documentation-status-report-template.md†L1-L60】

Maintaining this guide prevents drift between locales and keeps offline crews informed with accurate,
localized instructions for saving, sharing, importing, backing up and restoring data.【F:src/scripts/modules/persistence.js†L1036-L1109】
