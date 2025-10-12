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

## Test summary

- Attempted `node tools/runUnitTests.js tests/unit/runtimeModule.test.js` (fails in baseline with registry warnings; change does not introduce new regression).
- Pending: full suite (`npm run test:unit`, `npm run test:script`).
