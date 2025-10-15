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
| `legacy/scripts/modules/core/pink-mode-support.js` | – | 194 | +194 |

*Notes:*

- Added `cineCorePinkModeSupport` to the aggregated core module, exposing the animation helpers when present and preserving resilient defaults for offline and cold-start contexts while keeping the export available through the shared module map.【F:src/scripts/modules/core/pink-mode.js†L2426-L2604】
- App core now resolves the shared support bridge before touching local fallbacks, trimming duplicate promise helpers while keeping the offline-safe behaviour that protects autosave and icon rotation state.【F:src/scripts/app-core-new-1.js†L203-L324】
- Updated the module manifests so both the modern and legacy loaders, along with the service worker cache rehearsal, ship the new bridge for consistent offline coverage.【F:src/scripts/script.js†L33-L47】【F:legacy/scripts/script.js†L13-L32】【F:service-worker-assets.js†L41-L84】

## Step 12 – Pink mode animation asset resilience

*Notes:*

- Pink mode animations resolve asset URLs relative to the active document base from within the aggregated pink mode module, preserving correct lookups when the planner runs from custom subdirectories or offline mirrors.【F:src/scripts/modules/core/pink-mode.js†L29-L524】
- Asset fetches reuse the service worker cache first and fall back to XHR when `fetch` is blocked, keeping the animated icon library available even for strict offline launches that previously rendered static placeholders.【F:src/scripts/modules/core/pink-mode.js†L524-L1024】【F:src/scripts/modules/core/pink-mode.js†L1744-L2055】

## Step 13 – Runtime scope helper extraction

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/app-core-new-1.js` | 24552 | 24408 | -144 |
| `src/scripts/app-core-runtime-scopes.js` | – | 158 | +158 |
| `legacy/scripts/app-core-new-1.js` | 21682 | 21681 | -1 |
| `legacy/scripts/app-core-runtime-scopes.js` | – | 129 | +129 |

*Notes:*

- Moved the shared runtime scope candidate collectors into a dedicated helper so part one of the app core can shrink while still leaning on the defensive fallbacks that protect autosave, backup, and restore flows.【F:src/scripts/app-core-runtime-scopes.js†L1-L132】【F:src/scripts/app-core-new-1.js†L124-L205】
- Legacy bundles load the same helper to keep older browsers aligned during the refactor without dropping any offline-safe guards.【F:legacy/scripts/app-core-runtime-scopes.js†L1-L109】【F:legacy/scripts/app-core-new-1.js†L119-L205】
- Loader manifests, bundler scripts, integrity tests, and the service worker manifest now reference the new helper so offline caching and scripted builds continue to include the extracted runtime scopes.【F:src/scripts/script.js†L32-L58】【F:legacy/scripts/script.js†L12-L37】【F:src/scripts/loader.js†L2880-L2960】【F:tests/script/scriptIntegrity.test.js†L106-L133】【F:service-worker-assets.js†L1-L46】【F:service-worker-assets.js†L140-L187】

## Step 14 – Runtime support bridge extraction

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/app-core-new-1.js` | 24408 | 23797 | -611 |
| `src/scripts/app-core-runtime-support.js` | – | 728 | +728 |
| `legacy/scripts/app-core-new-1.js` | 21681 | 21232 | -449 |
| `legacy/scripts/app-core-runtime-support.js` | – | 458 | +458 |

*Notes:*

- Extracted the runtime support resolvers into a dedicated bridge so the remaining app core split can focus on UI logic while preserving the autosave, backup, and restore fallbacks that guard offline data.【F:src/scripts/app-core-runtime-support.js†L1-L724】【F:src/scripts/app-core-new-1.js†L92-L162】
- Legacy bundles load the mirrored bridge to keep older browsers aligned with the same defensive module resolution helpers during cold starts and cache restores.【F:legacy/scripts/app-core-runtime-support.js†L1-L458】【F:legacy/scripts/app-core-new-1.js†L392-L460】
- Updated loaders, script aggregators, integrity tests, and the service worker manifest so the new bridge is always bundled and cached for offline use alongside the existing runtime scope helper.【F:src/scripts/script.js†L41-L50】【F:legacy/scripts/script.js†L1-L13】【F:src/scripts/loader.js†L2880-L2958】【F:tests/script/scriptIntegrity.test.js†L100-L123】【F:service-worker-assets.js†L23-L207】

## Step 15 – Environment bootstrap separation

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/app-core-new-2.js` | 18002 | 16884 | -1118 |
| `src/scripts/app-core-enviroment.js` | – | 1562 | +1562 |

*Notes:*

- Moved the shared environment guards, runtime state fallbacks, and connector summary helpers into `app-core-enviroment.js` so part 2 focuses on the interactive runtime while the bootstrap logic evolves independently.【F:src/scripts/app-core-enviroment.js†L1-L1562】【F:src/scripts/app-core-new-2.js†L1-L20】
- Updated the loader manifests, service worker asset manifest, and script integrity tests to reference the new module, ensuring offline caching and Node bundling include the extracted helpers.【F:src/scripts/loader.js†L2870-L2895】【F:legacy/scripts/loader.js†L2394-L2406】【F:service-worker-assets.js†L176-L188】【F:tests/script/scriptIntegrity.test.js†L107-L121】

## Step 16 – Pink mode support bridge

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/app-core-new-1.js` | 24772 | 24729 | -43 |
| `legacy/scripts/app-core-new-1.js` | 21789 | 21817 | +28 |
| `src/scripts/modules/app-core/pink-mode-support-bridge.js` | – | 450 | +450 |
| `legacy/scripts/modules/app-core/pink-mode-support-bridge.js` | – | 449 | +449 |

*Notes:*

- Extracted the pink mode runtime and fallback resolver into `pink-mode-support-bridge.js` so the main runtime file shrinks while keeping the resilient lookup chain intact across online, offline, and restore scenarios.【F:src/scripts/modules/app-core/pink-mode-support-bridge.js†L1-L450】【F:src/scripts/app-core-new-1.js†L429-L589】
- Added the mirrored legacy bridge so older bundles reuse the same orchestration without regressing ES5 compatibility during offline cache hydration.【F:legacy/scripts/modules/app-core/pink-mode-support-bridge.js†L1-L449】【F:legacy/scripts/app-core-new-1.js†L73-L155】
- Updated the bundler manifests, loader, script aggregator, and service worker asset list to ship the bridge in all environments, preserving offline availability and script integrity checks.【F:src/scripts/script.js†L39-L47】【F:legacy/scripts/script.js†L1-L4】【F:src/scripts/loader.js†L3176-L3193】【F:legacy/scripts/loader.js†L2662-L2666】【F:service-worker-assets.js†L80-L118】【F:service-worker-assets.js†L236-L270】

## Step 17 – Bootstrap and localisation bridges

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/app-core-new-1.js` | 24729 | 23874 | -855 |
| `src/scripts/app-core-bootstrap-bridge.js` | – | 360 | +360 |
| `src/scripts/app-core-localization-bridge.js` | – | 318 | +318 |
| `legacy/scripts/app-core-new-1.js` | 21817 | 21006 | -811 |
| `legacy/scripts/app-core-bootstrap-bridge.js` | – | 494 | +494 |
| `legacy/scripts/app-core-localization-bridge.js` | – | 501 | +501 |

*Notes:*

- Moved the shared bootstrap, resolver, and fallback plumbing into `app-core-bootstrap-bridge.js`, keeping autosave, backup, and restore fallbacks intact while trimming the orchestration file to mostly wiring code.【F:src/scripts/app-core-bootstrap-bridge.js†L1-L312】【F:src/scripts/app-core-new-1.js†L120-L387】
- Localisation bootstrap logic now lives in `app-core-localization-bridge.js`, which returns the support namespaces and fallback factories so translation refreshes stay consistent with backup and sharing routines.【F:src/scripts/app-core-localization-bridge.js†L1-L243】【F:src/scripts/app-core-new-1.js†L389-L748】
- Legacy bundles load mirrored ES5 bridges to preserve offline-safe behaviour and namespace exports for older browsers, letting both generations share the same bootstrap orchestration during cold starts and cache restores.【F:legacy/scripts/app-core-bootstrap-bridge.js†L1-L358】【F:legacy/scripts/app-core-localization-bridge.js†L1-L329】【F:legacy/scripts/app-core-new-1.js†L64-L379】



## Step 17 – Helper consolidation

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/modules/app-core/localization.js` | – | 2605 | +2605 |
| `src/scripts/modules/app-core/runtime.js` | – | 4240 | +4240 |
| `src/scripts/modules/app-core/pink-mode.js` | – | 2110 | +2110 |

*Notes:*

- Merged the localisation bridge, runtime wiring, and pink mode orchestration into dedicated consolidated helpers so the refactor can continue without juggling dozens of tiny files. The new files preserve every existing safeguard around offline storage, translations, and UI theming while reducing loader complexity.【F:src/scripts/modules/app-core/localization.js†L1-L2605】【F:src/scripts/modules/app-core/runtime.js†L1-L4240】【F:src/scripts/modules/app-core/pink-mode.js†L1-L2110】
- Updated the modern loader, script aggregator, and service worker manifest so the consolidated helpers stay cached and available alongside the existing legacy mirrors. Documentation now tracks the new entry point names for future steps.【F:src/scripts/loader.js†L3188-L3196】【F:src/scripts/script.js†L41-L55】【F:service-worker-assets.js†L220-L236】

## Step 18 – Core runtime loader consolidation

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/modules/core/runtime-module-loader.js` | – | 162 | +162 |
| `legacy/scripts/modules/core/runtime-module-loader.js` | – | 162 | +162 |

*Notes:*

- Added a shared runtime module loader so modern and legacy bundles can resolve the core runtime namespaces directly from the consolidated `runtime.js` export, removing the need for the intermediate wrapper files while keeping autosave and backup guards intact across scopes.【F:src/scripts/modules/core/runtime-module-loader.js†L1-L162】【F:legacy/scripts/modules/core/runtime-module-loader.js†L1-L162】
- Updated the app core runtime support, environment, runtime scopes, and monolithic runtime helpers to rely on the loader instead of `require`ing the removed wrapper files, ensuring fallbacks resolve the core helpers without needing file-level stubs.【F:src/scripts/app-core-runtime-support.js†L1-L148】【F:src/scripts/app-core-enviroment.js†L1-L522】【F:src/scripts/app-core-runtime-scopes.js†L1-L120】【F:src/scripts/modules/app-core/runtime.js†L1-L320】【F:legacy/scripts/app-core-runtime-support.js†L1-L440】【F:legacy/scripts/app-core-enviroment.js†L1-L330】【F:legacy/scripts/app-core-runtime-scopes.js†L1-L120】【F:legacy/scripts/modules/app-core/runtime.js†L1-L240】
- Removed the obsolete runtime wrapper files from the modern and legacy bundles and pruned their references from the loader manifests and service worker asset list so the cache manifests only track the consolidated runtime entry points.【F:src/scripts/loader.js†L3190-L3248】【F:legacy/scripts/loader.js†L2635-L2669】【F:service-worker-assets.js†L80-L120】

## Step 19 – Core support resolver merge

| File | Previous lines | Current lines | Delta |
| --- | --- | --- | --- |
| `src/scripts/modules/core/localization.js` | – | – | +67 |
| `legacy/scripts/modules/core/localization.js` | – | – | +2 |
| `service-worker-assets.js` | – | – | -2 |

*Notes:*

- Taught the modern core localisation fallback environment to fetch the support resolver through the shared runtime module loader before falling back to legacy requires, ensuring the runtime merge keeps resolving helpers from the consolidated namespace even when the wrapper files disappear.【F:src/scripts/modules/core/localization.js†L1244-L1362】
- Mirrored the loader-driven resolver lookup in the legacy bundle so ES5 builds use the same module namespace, avoiding divergence between environments while the runtime consolidation continues.【F:legacy/scripts/modules/core/localization.js†L30-L34】
- Removed the dedicated support resolver files and pruned them from the service worker asset manifest now that all callers resolve the module via the shared runtime export, keeping the offline cache lean without breaking backup or restore flows.【F:service-worker-assets.js†L60-L110】【F:service-worker-assets.js†L220-L240】
