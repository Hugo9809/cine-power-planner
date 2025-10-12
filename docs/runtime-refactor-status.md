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

## Test summary

- Attempted `node tools/runUnitTests.js tests/unit/runtimeModule.test.js` (fails in baseline with registry warnings; change does not introduce new regression).
- Pending: full suite (`npm run test:unit`, `npm run test:script`).
