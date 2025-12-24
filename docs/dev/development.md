# Development & Maintenance Guide

This guide collects the development, repository, and documentation-maintenance details that no longer live in the root README.

## Device Data Workflow

Device catalogs live under `src/data/devices/`. Each file groups related equipment so
changes are easy to audit in version control and inside the app. When editing
the dataset, run helper scripts before committing:

```bash
npm run normalize
npm run unify-ports
npm run check-consistency
npm run generate-schema
```

`npm run normalize` cleans connector names and expands shorthand entries.
`npm run unify-ports` standardizes connector labels. `npm run
check-consistency` confirms required fields are present, and `npm run
generate-schema` rebuilds `schema.json` so the interface reflects the latest
data. Iterate quickly with the data-focused Jest project:

```bash
npm run test:data
```

Add `--help` to any helper command for usage notes and review generated JSON
diffs before opening a pull request. `npm run help` prints a summary of all
available scripts.

> **Catalog update.** The FIZ hand unit catalog now lists Tilta's Nucleus-M and Nucleus-M II controllers alongside Nano and Nano II hand wheels, Preston's HU4, cmotion's cPRO hand unit, Chrosziel's MagNum hand unit, Teradek's CTRL.3, DJI's Focus and Focus Pro hand units plus the RS Focus Wheel (2022), Hedén's YMER-3 hand control, Freefly's Pilot Pro hand controller, Redrock's microRemote hand controller, and SmallRig's MagicFIZ handgrip so offline planners can compare more ecosystems without leaving the app.
>
> **Lens catalog expansion.** The lens database now includes Sirui 1.33x & 1.6x Anamorphics, NiSi Athena Cine Primes, Kinefinity Mavo Primes, Spirit Lab Pure Primes, Ancient Optics & Petzval Rehousings, and Zero Optik Canon Dream Primes (Rehoused) so cinematographers can plan with an even wider range of modern glass.


## Repository Layout & Offline Assets

Every asset the planner needs to run offline lives in this repository. When you
copy it to a workstation, keep the directory structure intact so the service
worker can cache icons, fonts, legal pages and helper scripts without touching
external networks.

### Directory highlights

- **`index.html`** – Entrypoint that wires the offline service worker, local
  storage bootstrapper and global navigation. Open it directly from disk to run
  the app without a build step.
- **`service-worker.js`** and **`manifest.webmanifest`** – Power the Progressive
  Web App install flow, cache busting and offline availability. Update these in
  tandem with UI assets so refresh prompts remain accurate.
- **`src/icons/`, `'animated icons 3'/`, `'Icon Bluenew.svg'`, `'Icon Pinknew.svg'`** –
  Local icon sets, Uicons and animated assets used throughout the UI. Never
  replace them with remote CDNs; copy the folders as-is when moving machines.
- **`src/vendor/`** – Bundled third-party libraries pinned for offline use.
  Audit and update them intentionally so caches remain deterministic.
- **`src/data/` and `src/data/devices/`** – Canonical device catalogs and schema
  definitions consumed by the planner and validation scripts.
- **`legal/`** – Offline legal documents that match the in-app help center.
- **`docs/`** – Audience-first documentation grouped into `docs/user/`,
  `docs/ops/` and `docs/dev/` so offline runbooks, translation guidance and
  maintenance policies stay in sync with each release.
- **`tools/`** – Maintenance scripts for datasets, schema generation and
  integrity checks. Use them before committing any change that touches saved
  data paths.
- **`tests/`** – Jest suites covering storage helpers, offline logic and dataset
  expectations so regressions cannot threaten user data.

When distributing updates or archiving a release, include the entire repository
alongside recent `planner-backup.json` and `project-name.json` bundles. This
guarantees crews inherit the exact same offline assets, icons and storage
behavior on every workstation.


## Documentation, Help & Translation Maintenance

Keeping the help center, printable manuals and localized READMEs current is part of every
feature change. Follow the [Documentation, Help & Translation Maintenance Guide](docs/dev/documentation-maintenance.md)
and the quick [Documentation Update Checklist](docs/dev/documentation-update-checklist.md)
whenever you ship a new workflow so offline crews inherit accurate drills, translation
coverage and recovery instructions. Each update should:

- Refresh help dialog topics and hover-help text so shortcuts, save routines and offline
  indicators match the live build.
- Mirror the same adjustments in every localized README and static legal page, preserving
  guidance on saving, sharing, importing, backing up and restoring.
- Keep the [Save, Share, Import, Backup & Restore Reference](docs/user/save-share-restore-reference.md)
  aligned with UI labels, keyboard shortcuts and verification drills so crews rehearse the
  exact workflows enforced in code when they validate documentation changes.
- Log progress in the in-app **Documentation update tracker** (Settings → General) so release
  notes show which translations, help topics and printable guides were refreshed before shipping
  offline bundles.
- Use the checklist to log which UI surfaces changed, which modules they depend on and which
  translations need attention so verification logs always prove that the documentation and
  offline behavior match.
- Re-run the offline help center and localized README spot-checks described in the Quick Start
  after every documentation update so the bundled guidance is proven to load without
  connectivity and still teaches the current save, share, import, backup and restore routines.
- Keep the **Key Workflow Reference** table and **Repository Layout & Offline Assets** notes synchronized across each
  localized README so every crew references the same offline-first procedures and directory expectations.
- Update translation keys and selectors so language options stay synchronized with the UI
  and remain fully functional without connectivity.
- Rehearse the save → share → import loop after documentation edits to guarantee the printed
  instructions, help content and offline behavior still align.
- Cross-check the [Documentation Coverage Matrix](docs/dev/documentation-coverage-matrix.md) so every
  workflow change includes updated README copy, help topics, printable runbooks, translations and
  rehearsal evidence before sign-off.
- Capture the artifacts listed in the [Documentation Verification Packet](docs/ops/documentation-verification-packet.md)
  so every release stores synchronized manuals, rehearsal exports and verification logs in redundant
  offline locations. Attach the packet location to your verification notes so future crews know where
  to retrieve the canonical documentation bundle when rehearsing saves, shares, imports, backups and
  restores.
- Run the [Documentation Drift Runbook](docs/dev/documentation-drift-runbook.md) whenever you update
  copy or translations to confirm cached help topics, localized READMEs and printable guides match the
  live safeguards before the offline bundle ships.
- Schedule recurring [documentation audits](docs/dev/documentation-audit-checklist.md) so the README family,
  help center, translations and printable manuals are regularly spot-checked against the runtime
  safeguards, Quick safeguards exports and verification evidence captured in the planner.

## Documentation & training cadence

Keeping help content, checklists and translated readmes synchronized with the
runtime is part of the release process. When behavior changes or new safeguards
ship, run the following loop before handing builds to crews:

1. **Map the change.** Note which save, share, import, backup or restore flows
   gain new states, prompts or safeguards. Update the relevant walkthroughs in
   [`docs/`](docs/README.md) so rehearsals always mirror the interface users see offline.
2. **Refresh multilingual guidance.** Propagate wording adjustments to
   `README.*.md` files and any localized help panels so offline-first teams get
   the same instructions regardless of language.
3. **Re-run verification packets.** Execute the
   [Documentation Verification Packet](docs/ops/documentation-verification-packet.md)
   against the current build, capturing signed logs that prove every save,
   share, import, backup and restore path works without network access.
4. **Distribute updated bundles.** Regenerate shareable training bundles so
   crews rehearse with the current assets, icons and checklists that ship inside
   this repository.

Treat these steps as blocking tasks for every merge so documentation remains
as resilient as the planner itself.

## Release & Documentation Checklist

Before you merge or ship a field build, walk through this condensed checklist to
protect user data, documentation and translations:

1. **Run the manifest guard.** Execute `npm run check-consistency` to validate
   device metadata and confirm `service-worker-assets.js` matches the
   in-memory manifest. If it flags drift, run `npm run generate:sw-assets`,
   commit the regenerated file and rerun the check before proceeding.
2. **Rehearse critical workflows.** Run the [Quick Start](docs/user/user-guide.md#quick-start)
   drill or [`docs/ops/operations-checklist.md`](docs/ops/operations-checklist.md)
   to confirm saves, shares, imports, backups and restores still work end-to-end offline.
3. **Refresh written guidance.** Update help center topics, localized README
   files and printed manuals. Use the
   [Documentation Coverage Matrix](docs/dev/documentation-coverage-matrix.md) to
   confirm no language or workflow was missed.
4. **Capture verification artifacts.** Fill in the
   [Documentation Verification Packet](docs/ops/documentation-verification-packet.md)
   and [Verification Log Template](docs/ops/verification-log-template.md) with the
   latest rehearsal notes, export hashes and cache-priming screenshots.
5. **Validate translation toggles.** Switch through every language in the app to
   ensure updated strings render correctly without fetching external assets.
6. **Store redundant archives.** Export `planner-backup.json`, current project
   bundles, automatic gear rules JSON and a ZIP of the repository. Place the set
   on at least two offline media locations with a short retention note.
7. **Log service worker state.** Record the reported version, offline indicator
   behavior and the timestamp of the last manual **Force reload** so crews can
   audit which revision they are running.


## Development

Set up with Node.js 18 or later. After cloning the repository:

> [!IMPORTANT]
> **Always run the app via a local server** (e.g., `npm run serve` or `python3 -m http.server`) when developing and testing. Do not use the `file://` protocol.


```bash
npm install
npm run lint     # run ESLint alone
npm test
```

`npm test` runs ESLint, data consistency checks and the Jest suite sequentially
(`--runInBand`, `maxWorkers=1`) to reduce memory usage while still failing fast.
Run targeted suites while iterating:

```bash
npm run test:unit   # module-level logic and storage helpers (1 GB heap cap)
npm run test:data   # static dataset validations (1 GB heap cap)
npm run test:dom    # lightweight DOM utilities (1.5 GB heap cap)
npm run test:script # reduced smoke checks for script.js (3 GB heap cap)
```

### Module registry

The runtime registers every critical bundle (`cinePersistence`, `cineOffline`,
`cineUi`, `cineRuntime`, shared helpers and more) with the global
`cineModules` registry. Each module entry is frozen by default, documented with
metadata and verified during startup so save, share, import, backup and restore
flows cannot run without their safeguards. See
[`docs/dev/architecture/module-registry.md`](docs/dev/architecture/module-registry.md)
for the full contract and guidance on adding new modules while keeping offline
guarantees, documentation and translations aligned.

An infrastructure stack—`cineModuleArchitectureCore`,
`cineModuleArchitectureHelpers`, `cineModuleBase`, `cineModuleContext` and
`cineModuleEnvironment`—now wraps the registry so that
scope detection, module system lookups, deferred registration queues and global
exposure stay aligned between modern and legacy bundles without duplicating
boilerplate.

For new modules, prefer `cineModules.createBlueprint({...})` to capture metadata
and freeze defaults before registering. The helper freezes the generated API,
normalises category/description/connection strings and automatically queues
failed registrations so offline workflows never lose critical safeguards.

### Legacy browser bundle

Run `npm run build:legacy` after modifying files in `src/scripts/` or `src/data/`
to regenerate the transpiled ES5 bundle served to older browsers. The command
rebuilds everything inside `legacy/` and refreshes the local polyfill copies so
offline usage stays reliable. It also mirrors JSON artifacts (for example,
`src/data/schema.json`) into `legacy/data/` so the legacy `require()` paths keep
working offline and in tests.

### File structure

```
index.html                 # Main HTML layout
src/styles/style.css       # Core styles and layout
src/styles/overview.css    # Printable overview styling
src/styles/overview-print.css # Print overrides for the overview dialog
src/scripts/script.js        # Application logic
src/scripts/storage.js       # Local storage helpers
src/scripts/static-theme.js  # Shared theme logic for legal pages
src/scripts/modules/        # Frozen runtime modules registered in cineModules
src/data/index.js       # Default device list
src/data/devices/       # Device catalogs by category
src/data/schema.json    # Schema used for validation
src/vendor/             # Bundled third-party libraries
legal/                     # Offline legal documents
tools/                     # Data maintenance scripts
tests/                     # Jest test suites
```


## Contributing

Contributions are welcome! Open an issue or submit a pull request after reading
`CONTRIBUTING.md`. Run `npm test` before submitting to ensure linting, data
consistency checks and unit tests all pass.

## Acknowledgements

The planner ships with locally stored Uicons, OpenMoji assets and other bundled
artwork so icons stay available without a network connection, and relies on
lz-string to compactly store projects in URLs and backups.
