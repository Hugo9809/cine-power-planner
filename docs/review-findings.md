# Codebase Review Findings

This review surfaces follow-up tasks to protect user data workflows and documentation accuracy while keeping the offline-first contract intact.

## Fix typo in localized documentation
- **Issue**: The German README describes the weighted feedback dashboard using an incorrectly spelled adjective, which keeps the localized guidance from sounding professional.
- **Impact**: Localized guidance looks unpolished and can confuse crews who translate instructions for offline binders.
- **Recommended task**: Update the sentence to use the correct spelling "gewichtetes" and propagate the fix to any derivative docs that reuse the copy.

## Correct duplicated lens metadata (bug)
- **Issue**: Several Canon Sumire lens entries in `gearList.js` declare the `imageCircleMm` property twice; the second definition overwrites the first.
- **Impact**: The catalog silently reports the wrong image circle for these lenses, which can cause incorrect coverage planning and threaten saved setups when crews rely on the offline data pack.
- **Recommended task**: Remove the duplicate keys and verify the surviving value matches Canon's published spec before re-running lint and data validations.

## Align documentation with current help module layout
- **Issue**: The documentation checklist still points writers to `src/scripts/help/`, but help content now lives under the modular runtime at `src/scripts/modules/help.js`.
- **Impact**: Contributors updating offline manuals waste time looking for a non-existent directory, slowing translation updates required to keep onboard help in sync with save/share/restore changes.
- **Recommended task**: Replace the outdated path in `docs/documentation-update-checklist.md` with the current module location and mention the runtime bridge if additional context is needed.

## Maintain duplicate optical metadata regression guard
- **Status**: `tests/data/gearListDuplicateKeys.test.js` now protects the lens catalog from duplicate optical properties like `imageCircleMm`, catching overwrites before they can corrupt saved loadouts.
- **Impact**: Documenting the active safeguard reassures reviewers that offline exports remain trustworthy while keeping attention on any future changes that might disable the check.
- **Action**: Keep the regression test updated whenever new optics metadata is added and note any new integrity gaps here so data bundles continue to round-trip safely.

