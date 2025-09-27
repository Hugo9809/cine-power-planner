# Automatic Gear Rule Options Overview

This document summarises how the existing automatic gear additions are currently generated and
presents equivalent automatic gear rule options that can replace the implicit logic. Use these
rule ideas when migrating projects away from the legacy "automatic additions" behaviour so the
planner remains predictable, offline-ready and data-safe. The Automatic Gear Rules settings panel
now ships with a **Factory rule templates** section that surfaces the same guidance in-app for
offline reference.

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

## Replacement automatic rule options

The following rules replicate the behaviour of the automatic additions and can be stored as
explicit automatic gear rules.

### Scenario-specific catalogue

* Create one rule per scenario using the diffed additions/removals for that scenario.
* Provide extra combo rules for `Handheld + Easyrig` and `Slider + Undersling mode` that subtract
  overlap from their individual scenario rules.
* Add a removal-only rule titled "Extreme rain + Rain Machine overlap" to prevent duplicate
  matte box rain accessories when both scenarios apply.【F:src/scripts/app-core-new-1.js†L3404-L3451】

### Camera handle variations

* Generate a rule for each camera-handle option, triggered by the handle name and containing the
  diffed additions/removals compared with the baseline configuration.【F:src/scripts/app-core-new-1.js†L2701-L2770】

### Viewfinder extension coverage

* For every selected viewfinder extension, add a rule whose trigger is the extension name and
  whose payload equals the diff versus removing that extension.【F:src/scripts/app-core-new-1.js†L2772-L2814】

### Video distribution presets

* Build rules per distribution option so toggling an option recreates its additions/removals. This
  includes a fallback rule that seeds iOS monitoring gear (iPad, chargers, Wi-Fi router and any
  configured iOS devices) when the `iOS Video` option exists but produced no diff during parsing.
  【F:src/scripts/app-core-new-1.js†L2816-L3019】

### Onboard monitor rigging

* Add a rule for each onboard monitor option that injects one "ULCS Arm mit 3/8\" und 1/4\"
  double" rigging arm with contextual notes referencing the monitor.【F:src/scripts/app-core-new-1.js†L2840-L2888】

### FIZ motor support kit

* Provide a rule named "FIZ motor support kit" that triggers whenever any motor is present and
  adds the support stands, adapters, cabling and batteries listed in the current implementation.
  【F:src/scripts/app-core-new-1.js†L3080-L3138】

### Always-on essentials

* Introduce an "Always" rule flagged with `always: true` that contributes the standard cable
  lengths, rigging hardware, transport aids and power distribution set used today.【F:src/scripts/app-core-new-1.js†L3141-L3207】

### Five-day consumables rotation

* Add a recurring rule named "Every 5 shooting days" with a cadence of five days to top up wipes,
  tapes, clapper sticks and other expendables as per the existing logic.【F:src/scripts/app-core-new-1.js†L3210-L3261】

### Matte box templates

* Ship three matte box rules (`Swing Away`, `Rod based`, `Clamp On`) that preload the relevant
  ARRI LMB kits and accessories so planners can pick the correct template instead of relying on
  silent additions.【F:src/scripts/app-core-new-1.js†L3022-L3077】

## Migration checklist

* Ensure rule generation continues to parse the gear table HTML before diffing so quantity math
  stays correct.【F:src/scripts/app-core-new-1.js†L2508-L2559】
* Preserve the logic that deduplicates appended helper rules to avoid duplicated presets when
  saving or sharing projects.【F:src/scripts/app-core-new-1.js†L3456-L3502】
* When exporting or backing up, store these rules using the existing automatic gear backup and
  preset infrastructure so user data remains safe and offline-capable.
