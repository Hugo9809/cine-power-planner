# Cine Power Planner Core Module Overview

This guide captures how the runtime modules inside `src/scripts/modules/`
collaborate to deliver an offline-first experience that never jeopardises user
data. Use it when onboarding, auditing architectural drift or updating
persistence and rehearsal tooling.

## Layered module map

| Layer | Modules | Purpose |
| --- | --- | --- |
| Kernel | `architecture-kernel.js`, `architecture-core.js`, `architecture-helpers.js` | Bootstraps the dependency container, normalises environment detection and exposes the guarded module registry. |
| Runtime services | `runtime.js`, `runtime-guard.js`, `runtime-environment-helpers.js` | Coordinates save/autosave/backup/restore flows, validates schema expectations and prevents destructive mutations before they reach storage. |
| Environment bridge | `environment.js`, `environment-context.js`, `environment-bridge.js` | Resolves browser, service-worker and legacy contexts so the same logic works offline from a file:// load, a localhost server or an installed PWA. |
| Data safety | `persistence.js`, `storage.js`, `results.js` | Handles structured cloning, redundancy mirroring and deterministic result calculations for runtime estimates. |
| User interface | `ui.js`, `system.js`, `settings-and-appearance.js`, `gear-list.js` | Presents the planner shell, binds localised copy and ensures icons/fonts only reference bundled assets. |
| Feature bundles | `features/*`, `help.js`, `localization.js`, `offline.js`, `logging.js` | Encapsulate specialised behaviour such as automatic gear rules, offline cache rehearsals, help centre topics and structured logging. |

### Module loading order

1. **Kernel initialisation** builds the registry and records a diagnostic snapshot
   of the environment.
2. **Environment bridge** resolves access to `window`, `globalThis`, workers and
   test harnesses so data safety checks never throw when offline.
3. **Runtime guard** injects persistence helpers, structured cloning utilities
   and diffing services before any user data is read.
4. **Feature bundles** register with the module registry and receive a scoped
   API that includes `cinePersistence`, the autosave scheduler, localisation
   helpers and the share/import bus.
5. **UI shell** hydrates once the runtime exposes a ready state, preventing
   partially initialised forms from touching storage.

## Data safety integration points

- **Redundant persistence:** Every save, autosave and backup call flows through
  `modules/persistence.js`, which clones payloads, writes timestamped mirrors
  and records entries in the verification ledger. Feature modules never call
  `localStorage` directly.
- **Schema inventory:** `modules/results.js` and `modules/helpers/schema/*.js`
  resolve the `docs/schema-inventory.md` definitions at runtime so imports from
  older builds are coerced into safe shapes or rejected with actionable logs.
- **Share/import bridge:** The `modules/offline.js` surface coordinates planner
  bundle exports, checksum capture and restore rehearsals. It logs outcomes to
  the timeline so documentation packets can attach evidence without re-running
  the app.

## Offline-first considerations

- **Self-contained assets:** UI modules read icons from `src/icons/`, Uicons
  from `src/vendor/` and fonts from `src/fonts/`. No module is permitted to
  fetch remote assets.
- **Service worker handshake:** `modules/offline.js` registers `service-worker.js`
  only when the app is served over `http://localhost`. Offline rehearsals remain
  identical whether the service worker is active or the app is opened from
  `index.html` directly.
- **Diagnostics:** `modules/logging.js` streams events to both the console and
  an in-memory log consumed by the Verification Log Template so releases can be
  audited offline.

## Maintenance workflow

1. Update this document whenever module responsibilities change or new bundles
   are introduced.
2. Cross-reference the [Documentation Coverage Matrix](../documentation-coverage-matrix.md)
   and [Documentation Maintenance Guide](../documentation-maintenance.md) to
   keep translations, help and printable manuals in sync.
3. Capture rehearsal evidence (screenshots, exported logs, backup archives)
   before committing architectural changes so user data protection remains
   provable even without network access.
