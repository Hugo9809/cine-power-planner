# Automatic gear rule reference

Automatic gear rules are generated, edited and restored entirely in the browser so crews can rehearse
projects without network access. This reference documents how rules are derived, which UI affordances
control them, and how backups keep presets recoverable alongside planner saves.

## Rule generation pipeline
1. **Baseline versus scenario diffing.** `buildAutoGearRulesFromBaseInfo()` renders the baseline gear
   table, then re-renders it for each scenario and stores additive/removal deltas so every automatic
   addition is explicit in backups and share bundles.【F:src/scripts/modules/features/auto-gear-rules.js†L1586-L1644】
2. **Scenario combinations.** Known overlaps such as Handheld+Easyrig or Slider+Undersling are diffed
   separately, subtracting per-scenario contributions so combo rules only add what the pairing truly
   needs.【F:src/scripts/modules/features/auto-gear-rules.js†L1619-L1644】
3. **Option triggers.** Camera handles, viewfinder extensions and video distribution selections reuse
   the same diffing strategy, ensuring option-specific hardware remains explicit and survives
   round-trips through exports and imports.【F:src/scripts/modules/features/auto-gear-rules.js†L488-L647】
4. **Helper builders.** Dedicated generators seed monitor rigging, tripod coverage and ARRI
   accessories even when scenarios do not request them, mirroring the legacy automatic additions while
   keeping everything auditable.【F:src/scripts/modules/features/auto-gear-rules.js†L654-L706】

## Editor and preset UX
- **Highlight controls.** The automatic gear workspace groups add/reset/export/import actions with the
  highlight toggle so crews can colour-code stacked effects while auditing drafts offline.【F:index.html†L1485-L1520】
- **Inline naming fallback.** When `window.prompt()` is blocked, the runtime falls back to the bundled
  dialog, localised text and focus traps so presets can still be named and saved entirely offline.【F:src/scripts/app-core-new-2.js†L3048-L3124】
- **Backup visibility.** Toggling the backups section persists the visibility flag, re-renders controls
  and disables restore buttons when hidden, preventing accidental restores during rehearsals.【F:src/scripts/app-core-new-2.js†L3127-L3165】

## Import, export and retention
- **Validation.** Import payloads capture metadata, compare semantic versions against `APP_VERSION` and
  surface warnings through translated notifications before touching live rules.【F:src/scripts/app-core-new-2.js†L6600-L6724】
- **Restore guards.** The persistence facade exposes dedicated wrappers for rules, presets, backups,
  monitor defaults and the active preset ID so autosave, manual saves, share bundles and rehearsal
  restores reuse the same guarded pathways.【F:src/scripts/modules/persistence.js†L1036-L1074】
- **Retention UI.** Settings include retention inputs, backup selectors and restore buttons wired to the
  same persistence wrappers, keeping visibility of automatic snapshots while offline.【F:index.html†L1460-L1520】

## Maintenance checklist
1. Extend rule builders using rendered-table diffs so quantities stay accurate across imports and
   exports.【F:src/scripts/modules/features/auto-gear-rules.js†L488-L647】【F:src/scripts/modules/features/auto-gear-rules.js†L1586-L1644】
2. Whenever presets gain new metadata, update the inline dialog texts and translation keys to keep
   offline locales accurate.【F:src/scripts/app-core-new-2.js†L3048-L3124】【F:src/scripts/translations.js†L120-L220】
3. Rehearse automatic gear backups by exporting, deleting and restoring them in an offline profile to
   confirm the persistence wrappers still guard retention limits and visibility flags.【F:src/scripts/app-core-new-2.js†L3127-L3165】【F:src/scripts/modules/persistence.js†L1036-L1074】

Keeping these behaviours aligned with documentation ensures crews always recover their presets and
understand how rule changes propagate through backups, shares and restores.
