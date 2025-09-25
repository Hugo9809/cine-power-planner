# Step 3 – Offline Sync & Service Worker Module

## Overview
The new `cineOffline` module centralises service worker registration, cache eviction and forced reload
handling so that offline safety routines sit behind a single, audited contract. The API is frozen and
exposed globally, mirroring the persistence facade added in the previous step.【F:src/scripts/modules/offline.js†L1-L268】

## Module Responsibilities
| Capability | Responsibilities | Entry points |
| --- | --- | --- |
| `registerServiceWorker` | Queue a single registration until the window `load` event or register immediately when already loaded, logging guarded warnings on failure. | `registerServiceWorker(scriptUrl, options)` |
| `reloadApp` | Clear UI caches, unregister all service worker registrations, delete Cache Storage buckets and trigger a timestamped reload while reporting diagnostic flags. | `reloadApp(options)` |

The module includes internal helpers for collecting fallback UI caches, clearing caches and removing
registrations; they are exposed under `cineOffline.__internal` for diagnostic tooling and future tests.【F:src/scripts/modules/offline.js†L38-L259】

## Integration Updates
* The loader now fetches `src/scripts/modules/offline.js` before the runtime so every bundle can use the
  shared facade when the UI boots, including the legacy path.【F:src/scripts/loader.js†L472-L498】【F:legacy/scripts/loader.js†L419-L445】
* `app-core-new-1.js` and its legacy counterpart delegate service worker registration to
  `cineOffline.registerServiceWorker`, falling back to the historical code path if the module is
  unavailable.【F:src/scripts/app-core-new-1.js†L3521-L3539】【F:legacy/scripts/app-core-new-1.js†L3286-L3306】
* The service worker precaches the offline module so the reload controls work completely offline.【F:service-worker.js†L20-L64】
* Settings’ **Force reload** button now invokes `cineOffline.reloadApp` (with a guarded fallback) in both
  modern and legacy bundles, removing the duplicated cache-cleaning logic from the session script.【F:src/scripts/app-session.js†L6918-L6951】【F:legacy/scripts/app-session.js†L6486-L6512】

## User-Facing Copy
Help text for the **Force reload** action now mentions that obsolete service workers are unregistered
during the process in every supported language so documentation matches the new behaviour.【F:src/scripts/translations.js†L726-L733】【F:src/scripts/translations.js†L1374-L1381】【F:src/scripts/translations.js†L2605-L2611】【F:src/scripts/translations.js†L3870-L3876】【F:src/scripts/translations.js†L5130-L5136】

## Verification
* Jest tests cover the offline module contract, ensuring registration waits for the load event and that
  reload orchestration clears caches and triggers the reload hook.【F:tests/unit/offlineModule.test.js†L1-L66】
* The service worker test now asserts that the offline module is cached for offline usage.【F:tests/unit/service-worker.test.js†L10-L21】
