# Codebase Review Findings

This review surfaces follow-up tasks to protect user data workflows and documentation accuracy while keeping the offline-first contract intact.

## Fix typo in localized documentation
- **Status**: ✅ `README.de.md` already uses the correct "gewichtetes" phrasing in the weighted feedback section, matching the English source material.
- **Action**: When new planner workflows touch the feedback dashboard, update each localized README alongside `docs/documentation-update-checklist.md` so offline crews always receive polished guidance. 【F:README.de.md†L95-L132】【F:docs/documentation-update-checklist.md†L9-L78】

## Canon Sumire lens metadata audit
- **Status**: ✅ The Canon Sumire entries under `lens` metadata define each optical property once, and the duplicate-key regression test guards against future mistakes. 【F:src/data/devices/gearList.js†L5203-L5335】【F:tests/data/gearListDuplicateKeys.test.js†L1-L86】
- **Action**: Keep Canon spec sheets handy when adding new optics so the `gearListDuplicateKeys` test stays green and offline lens calculators continue to protect saved setups.

## Align documentation with current help module layout
- **Status**: ✅ `docs/documentation-update-checklist.md` already directs writers to `src/scripts/modules/help.js` and flags the runtime bridge entry points used by the offline help dialog. 【F:docs/documentation-update-checklist.md†L20-L39】
- **Action**: Continue mirroring module relocations in the checklist whenever the help system evolves so translation teams can refresh offline manuals without hunting for files.

## Maintain duplicate optical metadata regression guard
- **Status**: ✅ The regression test at `tests/data/gearListDuplicateKeys.test.js` enforces unique optical properties across the gear catalog to protect saved loadouts. 【F:tests/data/gearListDuplicateKeys.test.js†L1-L86】
- **Action**: Update the test expectations whenever new lens metadata ships and document additional safeguards here to preserve offline bundle integrity.


> _2025-02 alignment:_ Verified instructions against the current runtime guard and Backup & Restore UI so offline rehearsals match the shipped safeguards.【F:src/scripts/modules/runtime.js†L2203-L2368】【F:index.html†L2501-L2560】
