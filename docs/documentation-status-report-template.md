# Documentation Status Report Template

Use this template to document the state of help content, translations and
offline manuals every time you finish a documentation sprint. Pair it with the
[Documentation Update Checklist](documentation-update-checklist.md) and the
[Documentation Verification Packet](documentation-verification-packet.md) so
every save, share, import, backup and restore workflow remains fully
documented and provably safe for crews working without connectivity. File a
completed copy alongside the verification packet, planner backups and share
bundles captured during the rehearsal so future audits inherit a complete
record of what shipped.

## 1. Release details

- **Date:**
- **App version / build hash:** (Capture from **Settings → About**.)
- **Verification log reference:** (Link or filename using
  [`docs/verification-log-template.md`](verification-log-template.md).)
- **Audited workstation(s):** (Include browser versions and whether the session
  ran entirely offline.)

## 2. Change summary

- **Feature or safeguard changes:** (Summarize the save, share, import, backup
  or restore updates that triggered this documentation pass.)
- **Primary modules touched:** (Reference modules such as
  `cinePersistence`, `cineUi`, `cineOffline` or `cineRuntime` so maintainers can
  trace documentation back to the runtime contracts.【F:src/scripts/modules/persistence.js†L1-L880】【F:src/scripts/modules/ui.js†L1-L192】【F:src/scripts/modules/runtime.js†L1663-L1782】)
- **Related tickets / incidents:** (Optional cross-reference for historical
  context.)

## 3. Surfaces updated

List each surface adjusted during the sprint and briefly describe the changes
so the next audit can confirm nothing drifted:

- **README family:** (Primary README plus localized variants.)
- **In-app help & hover guidance:** (Mention specific dialogs, tooltips or
  guided tutorial steps updated in `index.html` or help modules.)
- **Printable manuals:** (Runbooks such as the offline readiness guide, save
  and restore reference, operations checklist and data protection playbook.)
- **CLI / tooling references:** (Updates to `tools/cliHelp.js` or related
  scripts that help crews rehearse offline.)
- **Legal disclosures or static pages:**
- **Other supporting assets:** (Screenshots, diagrams or PDFs regenerated for
  the release.)

## 4. Offline rehearsal evidence

Document the exact rehearsal you ran while updating the documentation. This
section should map directly to the backups, bundles and console captures stored
with the packet.

- **Manual save & auto-backup verification:** (Include timestamps and selector
  evidence pulled from the rehearsal.)
- **Planner backup export:** (Filename, hash, storage location.)
- **Project bundle export:** (Filename, hash, storage location.)
- **Quick safeguards / Data & Storage checks:** (Summarize the **Backup
  guardian**, **Latest activity** and safety reminder states observed during the
  run.)
- **Runtime guard results:** (Record the output of
  `window.__cineRuntimeIntegrity` or
  `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })`.)
- **Service worker or cache actions:** (Note if you regenerated
  `service-worker-assets` or forced a cache refresh as part of the update.)

## 5. Translation coverage

Capture the status of each locale so every reader can tell whether copy is
fully localized or temporarily mirroring English text.

| Language | README updated? | In-app strings updated? | Spot-check notes |
| --- | --- | --- | --- |
| English |  |  |  |
| German |  |  |  |
| Spanish |  |  |  |
| Italian |  |  |  |
| French |  |  |  |
| (Add others) |  |  |  |

## 6. Attachments archived

List every artifact stored with the packet so auditors know what to retrieve
without reconnecting to the network.

- [ ] Updated README exports (PDF or Markdown snapshots)
- [ ] Printable manuals (offline readiness, operations checklist, save/share
      reference, data protection playbook)
- [ ] Verification log entry
- [ ] Planner backup (`planner-backup.json`)
- [ ] Project bundle (`project-name.json` or renamed `.cpproject`)
- [ ] Additional exports (automatic gear rules, diff logs, etc.)
- [ ] Console captures and screenshots proving safeguards
- [ ] Service worker asset manifest (`service-worker-assets.js`) if regenerated
- [ ] Checksums manifest for all files above

## 7. Outstanding follow-up actions

Record any documentation, translation or tooling tasks that still require
attention so the next sprint can finish them before the guidance drifts.

- [ ]
- [ ]
- [ ]

## 8. Sign-off

- **Documentation lead:**
- **Reviewer:**
- **Date filed:**

Maintaining a completed status report with every release ensures help topics,
translations and printable manuals stay synchronized with the runtime guard and
offline persistence safeguards. Auditors can trace exactly which instructions
shipped, prove that locally stored Uicons and assets remained available offline
and confirm that no user data was ever put at risk.

## 2025-02 template verification
- **Dashboard references.** Checked that the fields referenced in the template (Backup & Restore,
  Data & Storage, Quick safeguards) remain in the UI so status summaries map cleanly onto actual
  controls during offline rehearsals.【F:index.html†L2501-L2574】【F:index.html†L2722-L2799】
- **Runtime evidence capture.** Confirmed `window.__cineRuntimeIntegrity` and the backup diff export
  continue to provide the audit artefacts the template expects crews to attach, keeping status entries
  actionable.【F:src/scripts/modules/runtime.js†L2203-L2368】【F:index.html†L3684-L3754】
- **Persistence metadata.** Re-checked that planner backups and exports still include the metadata
  recorded in the report (timestamps, counts) so sign-off rows remain truthful.【F:src/scripts/app-session.js†L7580-L7615】

> _2025-02 alignment:_ Verified instructions against the current runtime guard and Backup & Restore UI so offline rehearsals match the shipped safeguards.【F:src/scripts/modules/runtime.js†L2203-L2368】【F:index.html†L2501-L2560】
