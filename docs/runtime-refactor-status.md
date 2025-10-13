# Runtime Refactor Status

## Step 1 – Runtime environment helpers

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/modules/runtime.js` | 2194 | 2282 | +88 |
| `legacy/scripts/modules/runtime.js` | 1768 | 1856 | +88 |
| `src/scripts/modules/runtime-environment-helpers.js` | – | 206 | +206 |
| `legacy/scripts/modules/runtime-environment-helpers.js` | – | 206 | +206 |

*Notes:*

- Added `runtime-environment-helpers` module to expose shared detection utilities and register a stable `cineRuntimeEnvironmentHelpers` global for future refactors.
- Updated runtime loaders to prefer the new helper for scope detection when available while keeping existing persistence and autosave behaviour intact.
- Helper module registration preserves CommonJS exports and safe global attachment to avoid regression in offline caches and backup/restore flows.

## Step 2 – Runtime helper delegation

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/modules/runtime.js` | 2282 | 2323 | +41 |
| `legacy/scripts/modules/runtime.js` | 1856 | 1909 | +53 |

*Notes:*

- Centralised runtime fallbacks through `runtime-environment-helpers` so both modern and legacy bundles reuse the shared implementations before executing local fallbacks.
- `resolveModuleSystem`, environment bridge, module environment and globals loaders now rely on the helper first, keeping offline scope detection consistent across contexts while retaining redundant fallbacks.
- Helper delegation continues to respect offline autosave, backup and restore guarantees by avoiding behaviour changes when the helper is unavailable.

## Step 3 – Environment context extraction

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/modules/runtime.js` | 2323 | 2323 | +0 |
| `legacy/scripts/modules/runtime.js` | 1909 | 1912 | +3 |
| `src/scripts/modules/runtime-environment-helpers.js` | 206 | 225 | +19 |
| `legacy/scripts/modules/runtime-environment-helpers.js` | 206 | 225 | +19 |

*Notes:*

- Moved the shared `resolveEnvironmentContext` loader into `runtime-environment-helpers` so both runtime bundles source the same detection flow before falling back to local guards.
- Runtime fallback now leans on `fallbackTryRequire`, trimming duplicate `require` scaffolding while keeping the defensive checks that prevent unsanitised globals from overriding autosave, backup, or restore contexts.
- The helper continues to register through CommonJS and the `cineRuntimeEnvironmentHelpers` global, preserving offline cache hydration and ensuring environment context detection remains available even when modules are preloaded from backups.

## Step 4 – Data & storage dashboard localisation

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/app-core-new-1.js` | 25011 | 25067 | +56 |
| `src/scripts/translations.js` | 11258 | 11263 | +5 |
| `src/styles/style.css` | 11868 | 11876 | +8 |

*Notes:*

- The Data & Storage dashboard now sources its headings, button labels, and helper copy from the shared localisation tables so every language mirrors the storage protections overview and quick safeguard actions.【F:src/scripts/app-core-new-1.js†L12544-L12619】【F:src/scripts/translations.js†L878-L909】
- README entries across languages highlight the refreshed Storage & Media grid behaviour so offline crews know duplicate buttons and media presets are available during the refactor.【F:README.md†L512-L528】【F:README.es.md†L154-L158】【F:README.fr.md†L154-L158】【F:README.it.md†L154-L158】【F:README.de.md†L154-L158】
- The storage summary layout gained dedicated utility classes to keep the requirement key/value rows legible while the runtime split continues, preserving readability in offline builds without introducing new assets.【F:src/styles/style.css†L5433-L5484】

## Step 5 – Regression checks

- Ran the runtime module unit suite with the new helper wiring. The tests continue to surface the pre-existing registry duplication failures (modules registering twice), confirming the refactor did not introduce new breakages but the baseline still needs follow-up before the suite can pass.【b04db0†L1-L74】
- Manual offline smoke, storage persistence rehearsal, and import/export drills remain pending for a contributor with a browser profile; we captured the outstanding work in the release checklist so the next refactor iteration can record evidence alongside the automated runs.

## Test summary

- Re-ran `node tools/runUnitTests.js tests/unit/runtimeModule.test.js` (still fails in baseline with registry warnings; no new regressions detected).
- Pending: full suite (`npm run test:unit`, `npm run test:script`).

## Step 6 – Runtime state helper extraction

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/app-core-new-2.js` | 17726 | 17841 | +115 |
| `legacy/scripts/app-core-new-2.js` | 16385 | 16463 | +78 |
| `src/scripts/modules/core/runtime-state.js` | – | 413 | +413 |
| `legacy/scripts/modules/core/runtime-state.js` | – | 393 | +393 |

*Notes:*

- Extracted the shared runtime state factory into `cineCoreRuntimeState` so both modern and legacy bundles can reuse safe scope registration, freeze tracking, and temperature render guards without copying boilerplate.【F:src/scripts/modules/core/runtime-state.js†L1-L239】【F:legacy/scripts/modules/core/runtime-state.js†L1-L222】
- App core now resolves the helper module before falling back to the legacy inline implementation, ensuring autosave, backup, and restore safeguards benefit from the centralised freeze registry across browser, worker, and Node contexts.【F:src/scripts/app-core-new-2.js†L1-L205】【F:legacy/scripts/app-core-new-2.js†L1-L204】
- Service worker assets, loader manifests, and the runtime bundler parts list include the new module so offline pre-caching continues to cover the extracted helpers for both modern and legacy builds.【F:src/scripts/script.js†L41-L50】【F:legacy/scripts/script.js†L1-L8】【F:service-worker-assets.js†L41-L118】

## Step 7 – Environment helper candidate scope reuse

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/app-core-new-2.js` | 17841 | 17962 | +121 |
| `legacy/scripts/app-core-new-2.js` | 16463 | 16563 | +100 |

*Notes:*

- App core now resolves `cineRuntimeEnvironmentHelpers` before scanning globals, letting the runtime share the centralised scope detection logic across modern and legacy bundles while preserving offline compatibility for manual fallbacks.【F:src/scripts/app-core-new-2.js†L6-L139】【F:legacy/scripts/app-core-new-2.js†L26-L126】
- The candidate scope collector deduplicates helper results and keeps the manual global list as a safety net so autosave, backup, and restore routines still initialise correctly even when helpers are unavailable (e.g., offline restores or Node tests).【F:src/scripts/app-core-new-2.js†L61-L139】【F:legacy/scripts/app-core-new-2.js†L63-L126】

## Step 8 – Runtime tools helper reuse

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/modules/core/runtime-tools.js` | 216 | 313 | +97 |
| `legacy/scripts/modules/core/runtime-tools.js` | 179 | 269 | +90 |

*Notes:*

- Runtime tools now resolve `cineRuntimeEnvironmentHelpers` before falling back to local scope detection, aligning structured clone and persistence helpers with the shared environment safeguards used by app core and runtime modules.【F:src/scripts/modules/core/runtime-tools.js†L1-L104】【F:legacy/scripts/modules/core/runtime-tools.js†L5-L88】
- The helper-aware detector keeps the manual global scan as a final fallback so autosave, backup, import, and restore flows retain their offline resilience even when the shared helper is missing (e.g., during legacy cache hydration or cold restores).【F:src/scripts/modules/core/runtime-tools.js†L63-L89】【F:legacy/scripts/modules/core/runtime-tools.js†L49-L78】

## Step 9 – Temperature key helper reuse

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/app-core-new-2.js` | 17962 | 18002 | +40 |
| `legacy/scripts/app-core-new-2.js` | 16563 | 16603 | +40 |

*Notes:*

- Modern and legacy app core bundles now defer to `cineCoreRuntimeState.resolveTemperatureKeyDefaults` for the temperature queue and renderer identifiers, ensuring customised environments and offline restores share the same safeguards before autosave and backup hooks initialise.【F:src/scripts/app-core-new-2.js†L3-L57】【F:src/scripts/app-core-new-2.js†L143-L182】【F:legacy/scripts/app-core-new-2.js†L3-L45】【F:legacy/scripts/app-core-new-2.js†L123-L165】
- When the helper is unavailable (e.g., cold offline boots), both bundles retain the original fallbacks so pending temperature notes continue to flush safely without risking data loss or localisation mismatches.【F:src/scripts/app-core-new-2.js†L25-L56】【F:legacy/scripts/app-core-new-2.js†L17-L44】

## Step 10 – Runtime state bootstrap reuse

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/app-core-new-1.js` | 25067 | 25214 | +147 |

*Notes:*

- Part one of app core now resolves `cineCoreRuntimeState` before falling back to its local implementation, sharing the candidate scope collector so both halves reuse the same module while keeping offline guards intact.【F:src/scripts/app-core-new-1.js†L136-L225】
- Temperature queue and renderer keys derive from the shared helper, keeping customised runtime overrides aligned across autosave, backup, and restore flows even when profiles reload from offline caches.【F:src/scripts/app-core-new-1.js†L682-L723】
- The runtime state bootstrap delegates to `createLocalRuntimeState` when available, ensuring the freeze registry and renderer assignment protections match the module’s implementation while preserving the legacy fallback path for cold starts.【F:src/scripts/app-core-new-1.js†L1083-L1334】

## Step 11 – Pink mode support bridge

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/app-core-new-1.js` | 23449 | 23454 | +5 |
| `src/scripts/modules/core/pink-mode-support.js` | – | 243 | +243 |
| `legacy/scripts/modules/core/pink-mode-support.js` | – | 194 | +194 |

*Notes:*

- Added `cineCorePinkModeSupport` to centralise the pink mode fallbacks, exposing the animation helpers when present and preserving resilient defaults for offline and cold-start contexts.【F:src/scripts/modules/core/pink-mode-support.js†L1-L243】
- App core now resolves the shared support bridge before touching local fallbacks, trimming duplicate promise helpers while keeping the offline-safe behaviour that protects autosave and icon rotation state.【F:src/scripts/app-core-new-1.js†L203-L324】
- Updated the module manifests so both the modern and legacy loaders, along with the service worker cache rehearsal, ship the new bridge for consistent offline coverage.【F:src/scripts/script.js†L33-L47】【F:legacy/scripts/script.js†L13-L32】【F:service-worker-assets.js†L41-L84】

## Step 12 – Pink mode animation asset resilience

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/modules/core/pink-mode-animations.js` | 1899 | 2055 | +156 |

*Notes:*

- Pink mode animations now resolve asset URLs relative to the active document base, preserving correct lookups when the planner runs from custom subdirectories or offline mirrors.【F:src/scripts/modules/core/pink-mode-animations.js†L29-L116】
- Asset fetches reuse the service worker cache first and fall back to XHR when `fetch` is blocked, keeping the animated icon library available even for strict offline launches that previously rendered static placeholders.【F:src/scripts/modules/core/pink-mode-animations.js†L118-L243】【F:src/scripts/modules/core/pink-mode-animations.js†L756-L809】
