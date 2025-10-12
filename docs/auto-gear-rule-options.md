# Automatic Gear Rule Options Overview

Automatic gear rules are generated and managed entirely in the browser so crews can rehearse,
edit and restore presets while fully offline. This overview summarises how the rules are
constructed, which UI affordances expose them and how to migrate away from legacy behaviour
without risking data loss.

## How rule generation works today
1. **Scenario diffs per requirement.** The factory clones the current project form, renders a
   baseline gear table, then re-renders it for every selected scenario. The delta becomes a rule
   scoped to that scenario (including removals) so each automatic addition is recreated as an
   explicit rule.【F:src/scripts/modules/features/auto-gear-rules.js†L1586-L1630】
2. **Scenario combinations and overlaps.** Known pairs such as `Handheld + Easyrig` and
   `Slider + Undersling mode` produce additional rules after subtracting individual scenario
   contributions. A dedicated overlap removes duplicate rain gear when both rain scenarios are
   active, keeping preset output predictable.【F:src/scripts/modules/features/auto-gear-rules.js†L1620-L1660】
3. **Equipment option triggers.** Camera handles, viewfinder extensions and video distribution
   selections each toggle variants against the baseline table and store the resulting additions and
   removals, ensuring option-specific hardware is explicit in backups and shares.【F:src/scripts/modules/features/auto-gear-rules.js†L488-L652】
4. **Helper coverage rules.** Additional builders seed onboard monitor rigging, tripod preferences
   and ARRI viewfinder bracket support even when no scenario triggers them, mirroring the legacy
   automatic additions while keeping every rule auditable.【F:src/scripts/modules/features/auto-gear-rules.js†L660-L840】
5. **Baseline diffing safeguards.** All comparisons rely on the rendered gear table being parsed
   into category maps and diffed, preserving quantity accuracy when projects migrate from legacy
   behaviour to explicit rules.【F:src/scripts/modules/features/auto-gear-rules.js†L488-L647】【F:src/scripts/modules/features/auto-gear-rules.js†L1586-L1634】

## Scenario logic and multipliers
- **Joiner normalisation.** Scenario logic strings are normalised to `all`, `any` or `multiplier`
  so imported or legacy rules continue to load safely even when users typed alternative labels.
  Unrecognised values fall back to `all` so no scenario silently deactivates a rule.【F:src/scripts/app-setups.js†L6166-L6177】
- **Multiplier safeguards.** Multiplier rules keep the requested primary scenario when possible,
  fall back to the first scenario when it goes missing and only scale quantities after all extra
  scenarios are active. If supporting scenarios are absent the rule still triggers at ×1, preventing
  accidental over-allocation when partial conditions are met.【F:src/scripts/app-setups.js†L6179-L6224】

## Editor, presets and highlight tools
- **Inline naming fallback.** When browsers block `window.prompt`, the editor automatically opens
  the inline naming dialog so presets can still be saved offline. Labels, buttons and focus traps are
  localised using bundled texts to keep the workflow accessible without network access.【F:src/scripts/app-core-new-2.js†L2816-L2879】
- **Highlight overlay.** The automatic gear workspace provides an explicit toggle to colour-code
  stacked rule effects while reviewing drafts. The control lives alongside add, reset, export and
  import actions so crews can audit rule impacts quickly during offline rehearsals.【F:index.html†L1485-L1519】
- **Backups and retention.** Automatic gear backups are captured locally with retention limits,
  success/error notifications and restore confirmations to keep presets redundant across sessions.
  Restores refresh the editor, monitor defaults and diff signatures so changes remain tracked in the
  autosave ledger.【F:src/scripts/app-core-new-2.js†L6641-L6724】

## Migration checklist
- Continue diffing rendered tables when generating rules so quantity maths remain correct in saved
  presets and exported bundles.【F:src/scripts/modules/features/auto-gear-rules.js†L488-L647】【F:src/scripts/modules/features/auto-gear-rules.js†L1586-L1634】
- Keep helper builders (monitor rigging, tripod combinations, ARRI bracket coverage) active to avoid
  losing safety stock that crews expect in historical backups.【F:src/scripts/modules/features/auto-gear-rules.js†L660-L840】
- Persist rules, presets, backups and monitor defaults through the existing automatic gear storage
  wrappers so manual saves, autosave snapshots and share bundles remain lossless.【F:src/scripts/modules/persistence.js†L1036-L1100】
- When extending UI filters or highlights, update translations and documentation so offline crews
  continue to see accurate labels during audits and rehearsals.【F:src/scripts/translations.js†L120-L220】

## Draft impact previews
Highlighting remains optional: with the toggle enabled, stacked automatic gear changes receive the
multicolour overlay while the default positive/negative borders remain available for quieter audits.
Because both behaviours run locally, switching between them does not risk data loss or require
network access.【F:index.html†L1485-L1519】
