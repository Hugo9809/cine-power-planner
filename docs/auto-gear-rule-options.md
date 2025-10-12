# Automatic Gear Rule Options

Automatic gear rules keep complex rigs reproducible without typing, even when
crews are rehearsing offline. This refresh documents the current pipelines,
validation layers and rehearsal steps so presets remain trustworthy across
machines.

## Where the logic lives

- `src/scripts/modules/features/auto-gear-rules.js` orchestrates scenario
  toggles, resolves helper builders and exposes rehearsal hooks to the runtime.
- `src/scripts/app-setups.js` publishes change events to `cinePersistence`,
  guaranteeing manual saves, autosave sweeps and backups pick up the latest
  preset state.
- `src/scripts/storage.js` mirrors rule payloads into timestamped backup slots
  before the UI loads so every edit has a rollback point.
- `docs/save-share-restore-reference.md` explains how preset backups integrate
  with planner bundles—update both when behaviour changes.

## Rule generation pipeline

1. **Active project snapshot.** The module renders the current rig, applies the
   scenario toggles and records the diff. Rendering tables instead of raw form
   state keeps quantities accurate for legacy plans.
2. **Scenario composition.** Multiple toggles (for example rain gear + handheld)
   activate composite builders so overlapping presets stay deterministic.
3. **Option triggers.** Handles, distribution choices and monitor options inject
   or remove accessories whenever their toggles change.
4. **Helper rules.** Tripod, onboard monitor and viewfinder helpers run on every
   update so supporting hardware is never omitted.
5. **Validation sweep.** Payloads are checked against the schema inventory. Any
   unknown field is dropped and logged before persistence to prevent imports
   from older builds from corrupting new presets.

## Storage & audit safeguards

- **Redundant mirrors.** Before applying changes, the runtime copies the current
  rule set into a `auto-gear-rules-backup-<timestamp>` slot. Restores load the
  backup first, only promoting to active rules when the operator confirms.
- **Verification timeline.** Each change records the triggering scenarios,
  diff summary and timestamp in the diagnostics timeline consumed by the
  [Documentation Verification Packet](documentation-verification-packet.md).
- **Bundle-ready exports.** Project exports include embedded automatic gear
  payloads, checksum notes and rehearsal metadata so receiving machines can
  prove the presets matched the source workstation.

## Safe editing workflow

1. Exercise new rules in the rehearsal project before touching live builds.
2. Export a planner backup, store it with the generated `auto-gear-rules-backup`
   files and log the archive path.
3. Update translations, help topics and the [Documentation Coverage Matrix](documentation-coverage-matrix.md)
   so every locale reflects the new controls.
4. When importing from another machine, review the diff summary, confirm the
   autosave ledger shows the update and capture console output for the
   verification log.
5. Attach screenshots of the rule editor, the rehearsal diff and the backup
   export to the release packet so future audits can retrace the change offline.

Treat every preset edit like a workflow update—rehearse, document and archive
redundant copies so crews never risk losing data.
