# Automatic Gear Rule Options Overview

This document summarises how the existing automatic gear additions are currently generated so
teams can migrate projects away from the legacy "automatic additions" behaviour while keeping the
planner predictable, offline-ready and data-safe.

## How the current automatic additions work

1. **Scenario diffs per requirement** – The planner renders a baseline gear table without extra
   scenarios and compares it with tables generated for each selected scenario. The delta becomes
   a rule scoped to that scenario (including removal entries), so every scenario-specific auto
   addition can be recreated as an explicit rule.【F:src/scripts/app-core-new-1.js†L3371-L3402】
2. **Scenario combinations and overlaps** – Known pairs such as `Handheld + Easyrig` and
   `Slider + Undersling mode` receive additional rules after subtracting the individual scenario
   contributions. An extra overlap rule removes duplicate rain gear when both "Extreme rain" and
   "Rain Machine" are active.【F:src/scripts/app-core-new-1.js†L3404-L3451】
3. **Equipment option triggers** – Camera handles, viewfinder extensions and video distribution
   choices each produce rules by toggling a single option on/off against the baseline table. The
   generated rule stores the calculated additions and removals for that option.【F:src/scripts/app-core-new-1.js†L2701-L2837】
4. **Default coverage rules** – Additional helper rules are appended for default video
   distribution options, onboard monitor rigging, any-motor support kits, always-needed gear,
   five-day consumables top-ups and matte box templates.【F:src/scripts/app-core-new-1.js†L2840-L3502】
5. **Gear table parsing** – All comparisons rely on parsing the rendered gear table into category
   maps and diffing them. This ensures quantities remain accurate when converting legacy
   behaviour into explicit rules.【F:src/scripts/app-core-new-1.js†L2508-L2559】

## Migration checklist

* Ensure rule generation continues to parse the gear table HTML before diffing so quantity math
  stays correct.【F:src/scripts/app-core-new-1.js†L2508-L2559】
* Preserve the logic that deduplicates appended helper rules to avoid duplicated presets when
  saving or sharing projects.【F:src/scripts/app-core-new-1.js†L3456-L3502】
* When exporting or backing up, store these rules using the existing automatic gear backup and
  preset infrastructure so user data remains safe and offline-capable.

## Preset naming reliability

* Browsers that disable native `prompt()` dialogs (for example installed PWAs running without a
  URL bar) now trigger an inline naming modal within the Automatic gear preset panel. A quick timing
  check detects blocked prompts or thrown errors so the inline fallback opens automatically instead
  of treating the save as cancelled. The dialog keeps the experience accessible offline and
  guarantees presets can still be saved without losing user data.【F:src/scripts/app-core-new-2.js†L2497-L2524】【F:src/styles/style.css†L2583-L2624】

## Draft impact preview cues

* The draft impact preview surfaces stacked changes whenever multiple rules touch the same gear
  entry. Turn the **Highlight automatic gear** toggle **On** to activate the multicolour stacked
  indicator while auditing rule changes. The preview falls back to the standard positive/negative
  borders whenever the highlight overlay is disabled so the behaviour remains predictable during
  offline reviews.
