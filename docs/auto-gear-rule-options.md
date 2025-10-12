# Automatic Gear Rule Options Overview

Automatic gear rules reproduce complex rig presets without requiring crews to
re-enter lists by hand. After inspecting the full application we refreshed this
reference to document how rules are generated, stored and audited so presets
remain trustworthy in every offline rehearsal.

## Rule generation pipeline

1. **Baseline diffing.** `src/scripts/modules/features/auto-gear-rules.js`
   renders the active project, applies each scenario and records the delta by
   diffing rendered tables instead of raw form state. This keeps quantities and
   categories accurate even for legacy plans.
2. **Scenario combinations.** Overlaps such as rain gear, slider modes or
   handheld assists trigger composite builders so toggling multiple scenarios
   yields deterministic results.
3. **Option triggers.** Camera handles, distribution choices and monitor
   settings activate dedicated builders that add or remove accessories whenever
   their toggles change.
4. **Helper rules.** Tripod, onboard monitor and viewfinder helpers run on every
   update to guarantee supporting hardware is included even when no scenario
   explicitly references it.
5. **Validation sweep.** Before persistence the editor validates rule payloads
   against the schema inventory and strips unknown fields so imports from older
   builds cannot poison new presets.

## Editor & storage safeguards

- **Immediate persistence.** `src/scripts/app-setups.js` emits structured save
  events whenever a rule changes. `app-session.js` routes those events through
  `cinePersistence`, ensuring manual saves, autosave cycles and planner backups
  all capture the latest presets.
- **Redundant mirrors.** `src/scripts/storage.js` mirrors every automatic gear
  key into timestamped backup slots before the UI loads. Imports and restores
  write a fresh mirror before touching the active copy so a rollback is always
  possible.
- **Restore rehearsals.** Loading presets prompts for confirmation, snapshots the
  current rules and logs the action to the verification timeline. Crews can
  rehearse the restore sandbox before applying presets to production projects.
- **Bundled assets only.** Highlight overlays, rule icons and status badges rely
  solely on the locally stored Uicons and fonts shipped with the repository, so
  the editor behaves identically online and offline.

## Safe editing practices

1. Exercise presets in the rehearsal project before touching live scenarios.
2. Export a planner backup after major preset changes and archive it with the
   automatically generated rule backups.
3. Update documentation, help topics and translation bundles for any new rule
  controls so instructions stay accurate in every language.
4. When importing presets from another workstation, review the diff summary,
   confirm autosave ledgers contain the new entries and capture the results in a
   verification log.
5. Attach preset changes to the Documentation Coverage Matrix so future audits
   verify that save/share/import/backup/restore flows still protect custom rules.

Treat every rule edit as a workflow update: rehearse, document and store redundant
copies so presets never endanger user data.
