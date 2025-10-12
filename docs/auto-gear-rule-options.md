# Automatic Gear Rule Options Overview

Automatic gear rules let crews reproduce complex rig presets without re-entering
gear lists by hand. The editor runs entirely in the browser, works offline and
stores every rule in the same redundancy pipeline as projects and backups. This
reference explains how rules are generated, how the UI surfaces them and which
checks keep presets trustworthy.

## Rule generation pipeline

1. **Baseline diffing.** `src/scripts/modules/features/auto-gear-rules.js`
   renders the selected project, applies each scenario and records the delta. By
   diffing rendered tables instead of raw form state the editor captures exact
   quantities and categories, even for legacy projects.
2. **Scenario combinations.** Known overlaps (e.g. rain gear, slider modes or
   handheld assists) generate additional rules so the output stays predictable
   when multiple scenarios are active simultaneously.
3. **Option triggers.** Camera handles, distribution choices and monitor
   settings trigger dedicated builders that add or remove accessories when their
   associated toggles change.
4. **Helper rules.** Tripod, onboard monitor and viewfinder helpers ensure the
   rig always includes the supporting hardware crews expect. These helpers run
   even if no scenario explicitly references them.

## Editor and storage safeguards

- **Immediate persistence.** `src/scripts/app-setups.js` emits save events any
  time a rule changes. `app-session.js` receives those events and stores the
  rules through `cinePersistence`, guaranteeing that manual saves, autosave
  cycles and planner backups all capture the latest presets.
- **Redundant mirrors.** `src/scripts/storage.js` keeps every automatic gear key
  in sync with a timestamped backup slot before the UI loads. Importing or
  restoring presets always writes a fresh mirror before touching the primary
  copy.
- **Restores with confirmation.** Loading a preset prompts for confirmation and
  snapshots the current rules first so users can roll back instantly if
  required.
- **Locally bundled assets.** The highlight overlay, rule icons and status
  badges use the icons and fonts shipped with the repository so the editor looks
  identical online and offline.

## Safe editing practices

1. Test presets in a rehearsal project before applying them to a live setup.
2. Export a planner backup after major preset changes and store it alongside the
   automatically generated rule backups.
3. Keep documentation and translation strings aligned with any new UI controls
   so every reader sees accurate instructions regardless of language.
4. When importing presets from another workstation, review the diff summary and
   confirm the autosave ledger contains the new entries before continuing.

Automatic gear rules remain powerful only when crews can trust them. Treat every
change as a workflow update: rehearse, document and store redundant copies so no
rule edit ever risks user data.
