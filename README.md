# Cine Power Planner

![Cine Power Planner icon](src/icons/app-icon.svg)

Cine Power Planner is a standalone web app for building, auditing and sharing
professional camera power plans that never leave your machine. Plan V‑Mount,
B‑Mount or Gold‑Mount rigs, model runtime expectations, capture project
requirements and export shareable bundles—entirely inside your browser, even
when you are offline. Every dependency lives in this repository so the same
experience runs on a stage workstation, a field laptop or an air-gapped archive
drive without phoning home.

## At a Glance

- **Plan offline-first.** Build V‑Mount, B‑Mount or Gold‑Mount setups directly
  in your browser. Every icon, font and helper script ships with the
  repository so nothing relies on external CDNs or network access. Clone the
  repo, unplug the network cable and the interface keeps working exactly as it
  did online.
- **Keep data on-device.** Projects, runtime feedback, favorites, custom
  devices, gear lists and settings stay local. Backups and shareable bundles are
  human-readable JSON files you control.
- **Verify safety nets quickly.** Manual saves, background auto-saves and
  timestamped auto-backups layer together so you can rehearse recovery before
  leaving for set. Practicing the save → backup → bundle → restore loop is part
  of the recommended first-run routine so crews confirm every safeguard.
- **Approve updates intentionally.** The service worker waits for you to
  confirm a refresh, keeping teams on a known-good revision during travel or
  low-connectivity shoots.

## Overview

### Built for crews

The planner was designed with ACs, data wranglers and DoPs in mind. As you add
or swap bodies, battery plates, wireless links and accessories, the total draw
and runtime estimates update instantly. Safety warnings flag overloaded packs,
and gear lists stay tied to project context so nothing slips through when you
hand off prep notes.

### Designed to travel

Open `index.html` directly from disk or host the repository on your internal
network—no build process, server dependencies or accounts required. A service
worker keeps the whole app available offline, remembers every preference and
only updates when you approve a refresh. Saving, sharing, import, backup and
restore tools are always available and always run locally so user data stays
safe.

### Why offline-first matters

Film sets rarely have guaranteed connectivity, and studios frequently require
air-gapped planning tools. Cine Power Planner delivers the exact same
capabilities regardless of connection status: every asset is bundled, every
workflow runs locally and every save creates artifacts you can archive on
redundant media. Validating those workflows before a shoot becomes a standard
checklist item so nothing relies on an external service in the middle of a
production day.

### Feature pillars

- **Plan with confidence.** Calculate draw at 14.4 V/12 V (and 33.6 V/21.6 V for
  B‑Mount), compare compatible batteries and visualize runtime impact through a
  weighted feedback dashboard.
- **Stay production-ready.** Projects capture devices, requirements, scenarios,
  crew details and gear lists; auto-backups, shareable bundles and forced
  refreshes keep data current without sacrificing stability.
- **Work the way you prefer.** Language detection, dark, pink and high-contrast
  themes, typography controls, custom logos and hover help make the interface
  approachable on set and in prep. Hover help now auto-fills contextual
  descriptions for every button, field and menu so each control explains itself
  even when you stay offline.

## Core Principles

- **Offline always.** The full application, including icons, legal pages and
  helper tools, ships in this repository. Open `index.html` from disk or a
  private intranet and the service worker keeps every locally stored asset in
  sync so you are never forced online.
- **No hidden data paths.** Saves, shareable bundles, imports, backups and
  restores all happen inside the browser. Nothing leaves your machine unless
  you export it.
- **Redundant safety nets.** Manual saves, background auto-saves, periodic
  auto-backups, forced pre-restore backups and human-readable JSON exports work
  together so user data cannot disappear silently.
- **Predictable updates.** Refreshes only apply when you trigger them. Cached
  versions remain available until you approve a **Force reload**, keeping
  planning sessions stable even when crews stay offline for extended periods.
- **Consistent presentation.** Locally bundled Uicons, OpenMoji assets and
  typography files guarantee identical visuals whether you run the planner on a
  stage workstation or a field laptop with no connectivity.
- **Guard every change.** Before any restore, the planner captures a forced
  backup and preserves earlier revisions so no import overwrites your work.
  Verification logs and checksum notes travel with every archive to prove
  integrity even when you stay offline.

## Table of Contents

- [At a Glance](#at-a-glance)
- [Overview](#overview)
- [Core Principles](#core-principles)
- [Translations](#translations)
- [What’s New](#whats-new)
- [Quick Start](#quick-start)
- [Key Workflow Reference](#key-workflow-reference)
- [System Requirements & Browser Support](#system-requirements--browser-support)
- [Save, Share & Import Drill](#save-share--import-drill)
- [Everyday Workflow](#everyday-workflow)
- [Saving & Project Management](#saving--project-management)
- [Sharing & Imports](#sharing--imports)
- [Project & Backup File Formats](#project--backup-file-formats)
- [Interface Tour](#interface-tour)
- [Customization & Accessibility](#customization--accessibility)
- [Data Safety & Offline Operation](#data-safety--offline-operation)
- [Data & Storage Overview](#data--storage-overview)
- [Storage Quota & Maintenance](#storage-quota--maintenance)
- [Backup & Recovery](#backup--recovery)
- [Data Integrity Drills](#data-integrity-drills)
- [Backup Rotation & Archive Guide](#backup-rotation--archive-guide)
- [Operational Checklists](#operational-checklists)
- [Emergency Recovery Playbook](#emergency-recovery-playbook)
- [Gear Lists & Reporting](#gear-lists--reporting)
- [Automatic Gear Rules](#automatic-gear-rules)
- [Runtime Intelligence](#runtime-intelligence)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Localization](#localization)
- [Install as an App](#install-as-an-app)
- [Device Data Workflow](#device-data-workflow)
- [Repository Layout & Offline Assets](#repository-layout--offline-assets)
- [Documentation, Help & Translation Maintenance](#documentation-help--translation-maintenance)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Feedback & Support](#feedback--support)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Translations

Documentation is available in multiple languages. The app automatically detects
your browser language on the first launch and you can switch at any time from
the top-right language menu or through **Settings**.

- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

Follow the translation guide in `docs/translation-guide.md` for detailed
localization steps.

## What’s New

- **Backup version comparisons** – pick any manual save or timestamped
  auto-backup to review diffs, add incident notes and export a log before you
  roll a change back or hand footage to post.
- **Restore rehearsals** – load a full-app backup or project bundle into an
  isolated sandbox to confirm its contents match live data without touching
  production profiles.
- **Diagnostics log controls** – inspect live runtime entries inside
  **Settings → Data & Storage**, filter by level or namespace, and tune log
  retention, console mirroring and global error capture without leaving the
  planner.
- **Backup history ledger** – every full-app backup download records its
  timestamp and filename locally. Review counts in **Settings → Data & Storage**
  or export the log alongside your archives so you can prove retention while
  staying offline.
- **Automatic gear rules** – design scenario-triggered additions or removals
  that apply after the generator runs, complete with import/export controls
  and timed backups.
- **Rule coverage dashboard** – summarize scenario coverage, duplicates, net adds/removes,
  stacked scenarios, conflicts and uncovered requirements inside Automatic Gear Rules, apply focus
  filters offline and share the same insights through exports and printouts.
- **Data & storage dashboard** – audit stored projects, gear lists, custom
  devices, favorites and runtime feedback, and review approximate backup size
  without leaving the Settings dialog.
- **Runtime safeguard inspector** – the runtime bundle now records verification
  results on `window.__cineRuntimeIntegrity` and exposes
  `window.cineRuntime.verifyCriticalFlows()` so crews can confirm save/share/
  restore gateways and runtime feedback persistence before leaving for set.
  Use `window.cineRuntime.inspectModuleConnections()` to audit how modules are
  linked through the registry without mutating cached data.
- **Autosave status overlay** – mirror the latest autosave note inside the
  settings dialog so crews see background activity while rehearsing recovery
  drills.
- **Monitoring-aware gear editor** – surface additional monitor and video
  distribution selectors only when scenarios demand them, keeping rule
  authoring focused.
- **Accent and typography controls** – adjust accent color, font size and
  typeface while dark, pink and high-contrast themes persist between visits.
- **Global search shortcuts** – press `/` or `Ctrl+K` (`⌘K` on macOS) to focus
  the feature search instantly, even when the mobile navigation is collapsed.
  Suggestions now show whether they lead to a feature, action, device or help
  topic so you always know what will open before pressing **Enter**. Exact
  phrases float to the top, so typing a full control name brings that match up
  before broader keywords. Clearing the field bubbles your most recent matches
  to the top so repeating frequent crew workflows stays lightning fast. Start
  a query with `recent` or `history` to narrow suggestions to the items you've
  used lately before scanning the full catalog.
- **Force reload button** – refresh cached service worker assets without
  deleting projects or devices.
- **Pinned favorites** – star dropdown entries to keep go-to cameras, batteries
  and accessories at the top of selectors and inside backups.
- **Factory reset safeguards** – capture an automatic backup before wiping
  saved projects, custom devices and settings.

See the language-specific README files for release details in other locales.

## Quick Start

Run this checklist the first time you install or update the planner. It proves
that every save, share, import, backup and restore workflow works exactly the
same online or offline.

1. Download or clone this repository.
2. Open `index.html` in any modern browser.
3. (Optional) Serve the folder over HTTP(S) to install the service worker and
   Progressive Web App features:
   ```bash
   npx http-server
   # or
   python -m http.server
   ```
   The app then caches itself for offline use and applies updates when you
   approve them.
4. Load the planner once, close the tab, disconnect from the network (or toggle
   Airplane Mode) and reopen `index.html`. The offline indicator in the header
   should flash briefly while cached files load. Confirm the interface mirrors
   the last session exactly, including any locally stored Uicons or helper
   assets.
5. Open **Help → Quick start checklist** and press **Start guided tutorial** to
   follow the step-by-step walkthrough of creating a project, selecting
   devices, generating gear lists, customising automatic gear rules, exporting,
   importing and backing up data. The new step navigator lets you jump back to
   finished workflows without restarting, and the **Resume guided tutorial**
   option appears automatically if you paused mid-tour so progress never goes
   missing offline.
6. Create your first project, press **Enter** (or **Ctrl+S**/`⌘S`) to capture a
   manual save and review the project selector to see the timestamped
   auto-backup that appears after roughly 50 tracked changes or 10 minutes.
7. Export **Settings → Backup & Restore → Backup** and import the resulting
   `planner-backup.json` file into a private browser profile. Verifying the
   restore path early proves that no saves are stranded on a single machine and
   demonstrates the forced pre-restore backup safeguard.
8. Practice exporting a project bundle (the download defaults to
   `project-name.json`) and re-importing it on a secondary machine or profile.
   Rehearsing the full save → share → import loop keeps crews confident that
   offline workflows are airtight and that locally stored Uicons, fonts and
   helper scripts follow the project.
9. Archive the verified backup and project bundle alongside the repository copy
   you opened. Log the verification date, machine name and operator in the same
   folder (mirroring the recommendations in `docs/backup-rotation-guide.md`) so
   every crew can prove when the drill succeeded. This keeps save, share,
   import, backup and restore workflows provably in sync from the first session
   and gives you redundant recovery media for travel days.
10. Capture a console screenshot of `window.__cineRuntimeIntegrity` (or rerun
    `window.cineRuntime.verifyCriticalFlows()` and store the report) to document
   that the runtime guard validated every save/share/restore gateway and the
   runtime feedback storage bindings while you rehearsed offline.
10. Still offline, open the in-app help center and at least one localized
    README from the repository. Confirm the topics mirror the live interface,
    translations render without fetching remote assets and the documentation
    reiterates the save → share → import → backup → restore drills you just ran.
    This step keeps Help, Documentation and Translation resources verified
    alongside the core workflows.

## Key Workflow Reference

Keep this table nearby when rehearsing or teaching the planner. It consolidates
the core save, share, import, backup and restore paths, what each captures and
the safety nets that protect user data even when you stay offline.

| Workflow | How to trigger | Data captured | Offline behavior | Built-in safeguards |
| --- | --- | --- | --- | --- |
| Manual save | Press **Enter**, click **Save** or use `Ctrl+S`/`⌘S` while a project is open. | Active project state including devices, requirements, diagrams, favorites and runtime feedback. | Writes directly to local storage—no connectivity required. | Creates a named entry in the selector so you can branch, rename or export it at any time. |
| Background auto-save & auto-backup | Runs after roughly 50 tracked changes or every 10 minutes while you edit. | Incremental project snapshots promoted to timestamped `auto-backup-…` entries. | Continues in airplane mode and resumes instantly after reload. | Auto backups stay hidden until needed and can be restored or exported without overwriting manual saves. |
| Planner backup | **Settings → Backup & Restore → Backup**. | Every project, auto-backup, automatic gear rule, custom device, favorite, runtime note and UI preference. | Downloads a human-readable `planner-backup.json` file locally. | Forced pre-restore backups plus hidden migration snapshots prevent data loss during restores. |
| Project bundle export | **Export Project** while the desired project is active. | One project plus referenced custom devices, favorites and (optionally) automatic gear rules. | Generates a portable JSON bundle that never leaves your machine unless you share it. | Import validation checks file metadata, schema version and timestamps before merging. |
| Restore or import | Choose **Import Backup**, **Import Project** or restore from the selector. | Applies planner backups, project bundles or auto-backups into the live environment. | Runs entirely in the browser with the same offline guarantees as saving. | Captures a safety backup before applying changes and isolates sandbox rehearsals so production data stays intact. |

Revisit this reference during training, audits and documentation updates so the
entire crew repeats the same offline-first routines on every workstation.

## System Requirements & Browser Support

- **Modern evergreen browsers.** The planner is validated on the latest
  releases of Chromium, Firefox and Safari on desktop and mobile. Enable
  service workers, `localStorage` (site storage) access and persistent storage
  to unlock the full offline workflow.
- **Offline-friendly devices.** Laptops and tablets must allow persistent
  storage so backups and auto-saves stay available. When running from removable
  media or a field workstation, launch the planner once while online so the
  service worker can cache every asset, then rehearse the offline reload
  routine before travel.
- **Sufficient local storage.** Large productions can accumulate many projects,
  backups and gear lists. Monitor available disk space in your browser profile
  and export archives regularly to redundant media to avoid storage eviction.
- **No external dependencies.** All icons, fonts and helper scripts ship with
  the repository. Keep the folder intact (including `animated icons 3/` and
  locally stored Uicons) when copying it between machines so visuals and
  scripts match exactly.

## Save, Share & Import Drill

Run this short rehearsal whenever a new crew member joins, a workstation is
provisioned or a significant update ships. The routine proves that saving,
sharing, importing, backup and restore all behave as expected without network
access.

1. **Baseline save.** Open the current project, trigger a manual save and note
   the timestamp that appears in the selector. Confirm an auto-backup joins the
   list within ten minutes while you continue editing.
2. **Export redundancy.** Create a planner backup and a project bundle. Rename
   the bundle if you follow a `.cpproject` convention, then store both files on
   separate physical media.
3. **Restore dress rehearsal.** Switch to a private browser profile (or a
   second machine), import the planner backup, then import the project bundle.
   Inspect gear lists, runtime dashboards, automatic gear rules and favorites
   to confirm they survived the round-trip.
4. **Offline verification.** While still in the rehearsal profile, disconnect
   from the network and reload `index.html`. Ensure the offline indicator shows,
   the interface matches the source machine and locally stored Uicons plus
   helper scripts load without flicker.
5. **Capture a diff log.** Back in the primary profile, open **Settings → Backup
   & Restore → Compare versions**, choose the latest manual save plus the newest
   auto backup, review the highlighted changes, add context in **Incident
   notes** and export the JSON. Store the file with your rehearsal artifacts so
   future audits can replay the change history offline.
6. **Archive with confidence.** Delete the rehearsal profile after confirming
   everything restored cleanly. Label and file the verified exports with your
   production’s archival checklist and add a short verification log (timestamp,
   machine, operator and notes). Use the [verification log
   template](docs/verification-log-template.md) to capture consistent evidence
   across teams. The paper trail makes it easy to prove that save, share,
   import, backup and restore workflows were validated end-to-end before anyone
   relies on them in the field.
7. **Log the runtime guard.** In the same profile, open the developer console
   and confirm `window.__cineRuntimeIntegrity.ok` is `true`. If you need a fresh
   report, run `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })`
   and archive the output alongside your rehearsal notes.

## Everyday Workflow

Use Cine Power Planner end-to-end with the following routine:

1. **Create or load a project.** Select an existing setup or type a new project
   name and press Enter (or click **Save**). The active project name appears in
   gear lists, printable overviews and exports.
2. **Add cameras, power and accessories.** Choose devices from categorized
   dropdowns. Type-to-filter search, pinned favorites and the global shortcut
   `/` (or `Ctrl+K`/`⌘K`) jump straight to the gear or feature you need.
3. **Verify power and runtime.** Monitor draw warnings, compare compatible
   batteries and review the runtime dashboard to see how temperature, codec,
   frame rate and other factors influence field data.
4. **Capture project requirements.** Fill out crew details, scenarios, handles,
   matte box preferences and monitoring layouts so generated lists reflect the
   full production context. The Storage & Media grid now surfaces CFexpress,
   CFast, SD and microSD families directly from the offline gear catalog—even
   when the selected camera uses different slots—so you can log card counts and
   notes without leaving gaps in the saved bundle. Fork buttons duplicate
   entries for faster data entry. When specific scenarios demand bespoke kits,
   open **Settings → Automatic Gear Rules** to layer custom additions or
   removals before
   generating exports.
5. **Export or archive the plan.** Generate the gear list, export a planner
   backup or download an exportable project bundle before heading to set.
   Backups include custom devices, runtime feedback and favorites.
6. **Verify offline readiness.** Toggle the offline switch on your router or
   device, refresh the planner and confirm that the project, settings and gear
   lists all remain accessible. Restore from the most recent backup if anything
   looks out of sync.

## Saving & Project Management

- **Manual saves keep versions explicit.** Enter a project name in the header
  field and press **Enter** or click **Save** to capture the current state. Each
  manual save preserves devices, requirements, gear lists, favorites, diagram
  layouts and runtime observations.
- **Auto-saves protect in-progress work.** While a project is open the planner
  writes incremental changes in the background. Timestamped `auto-backup-…`
  versions appear in the project selector every 10 minutes or after roughly 50
  tracked changes. Switching projects, importing or exporting data, or preparing
  to reload also captures an immediate snapshot even if that cadence hasn't
  elapsed so you can roll back without leaving the interface.
- **Quick safeguards capture full backups instantly.** Open **Settings → Data &
  Storage → Quick safeguards** to download a fresh planner backup or jump
  straight to the restore tools without leaving your current tab; each run is
  logged in the storage dashboard so you can archive the JSON immediately.
  【F:index.html†L2548-L2570】
- **Reveal auto backup snapshots on demand.** Toggle **Settings → Backup &
  Restore → Show auto backups** to temporarily display the timestamped safety
  copies in the project selector when you need to restore one manually.
- **Renaming duplicates on purpose.** Editing the active project name and
  pressing **Enter** creates a branched copy. Use this when you want to compare
  alternate builds or keep both day and night configurations side by side.
- **Switching projects is non-destructive.** Select another entry from the
  project menu to load it instantly. The planner preserves scroll position and
  unsaved form inputs for the new project so you can review or edit without
  re-entering data.
- **Deletion requires confirmation.** Use the trash icon in the selector to
  remove unused versions. You’ll be asked to confirm before anything leaves the
  browser, ensuring you do not lose a project by accident.

## Sharing & Imports

- **Project bundles travel light.** Click **Export Project** to download a
  `project-name.json` file containing the active project, favorites and any
  referenced custom devices. Rename the file if your archiving standards call
  for a `.cpproject` extension, then send it via your preferred secure channel;
  recipients can import without needing internet access.
- **Automatic gear rules travel with bundles.** Flip the **Include automatic
  gear rules** toggle during export to decide whether your automations ship with
  the bundle; teammates who import the file can ignore them, apply them only to
  the imported project or merge them into their global ruleset.
- **Imports never overwrite by accident.** If an incoming bundle matches the
  name of an existing project, the planner saves the new copy as
  `project-name-imported` so both versions stay available until you review them.
- **Standalone rule imports validate metadata offline.** When you import an
  `auto-gear-rules-*.json` file, the planner now checks the file type, semantic
  version and timestamp metadata before touching your saved rules—even without
  connectivity. You’ll see a warning if the payload came from an older or newer
  build or if required fields were removed, and the previous snapshot is restored
  automatically if validation fails.
- **Restores are double-buffered.** Importing a bundle prompts you to save a
  backup of your current environment first. After choosing the bundle file, the
  planner validates its JSON schema, merges new devices and places the restored
  project at the top of the selector.
- **Cross-device workflows stay offline.** To move a plan to a workstation with
  no connectivity, copy `index.html`, `script.js`, `devices/` and your backup or
  bundle files onto removable media. Launch from disk, import the bundle and
  continue planning without touching external networks.
- **Export responsibly.** Review the exported JSON before distributing it to
  make sure no extra projects or notes are included. The structure is human
  readable so you can redact or duplicate entries as needed, and the file stays
  portable even when renamed to `.cpproject` for filing.
- **Synchronize with checklists.** When a teammate sends you an updated bundle,
  import it, review the `Updated at` timestamps in the sidebar and archive the
  previous JSON (or `.cpproject`) bundle in your storage system to maintain a
  clear history.
- **Share without losing context.** Bundles remember language, theme, custom
  logo and other personalization choices so the recipient opens the project in a
  familiar state even if they stay offline.

## Project & Backup File Formats

- **`project-name.json` (project bundle).** Exported from **Export Project**,
  this JSON bundle stores one project, favorites and any referenced custom
  devices. Rename it to `.cpproject` if your workflow expects that extension;
  the planner treats both identically during import.
- **`planner-backup.json` (full backup).** Created via **Settings → Backup &
  Restore → Backup**, this archive captures every project, auto-backup,
  favorite, runtime submission, automatic gear rule, UI preference, custom
  font and branding asset so a restore never loses context.
- **`auto-gear-rules-*.json` (rule exports).** Optional downloads from
  **Automatic Gear Rules** provide timestamped copies of your automation setup.
  They now embed file type, semantic version and timestamp metadata so the
  importer can validate payloads offline. Store them alongside full backups so
  custom presets never disappear during cross-team handoffs, and keep an eye on
  import warnings if you restore them on a different build.

## Interface Tour

### Quick reference

- **Global search** (`/`, `Ctrl+K`, `⌘K`) jumps to any feature, selector or help
  topic—even when the side navigation is hidden on smaller screens. Suggestions
  surface direct feature and device matches before help topics so keyboard-first
  workflows land on primary controls.
- **Help center** (`?`, `H`, `F1`, `Ctrl+/`) provides searchable guides,
  shortcuts, FAQs and an optional hover-help mode so every control explains
  itself. The Start Here checklist now covers priming the offline indicator,
  capturing redundant exports and walking through a restore rehearsal drill so
  crews verify backups before field use, while the monthly data health check
  guides teams to surface **Show auto backups in project list** and run
  **Compare versions** before archiving redundant copies. A console
  verification callout lists `window.__cineRuntimeIntegrity`,
  `window.cineRuntime.verifyCriticalFlows()` and the `cinePersistence` helpers
  so you can log offline rehearsals without leaving the dialog.
- **Project diagram** visualizes power and signal paths. Hold Shift while
  exporting to save a JPG snapshot instead of SVG.
- **Battery comparison panel** reveals how each compatible pack performs and
  flags overload risks before you leave prep.
- **Gear list generator** turns selections into categorized tables with tooltips
  for specs, crew emails and scenario-driven accessories.
- **Version comparison** (**Settings → Backup & Restore → Compare versions**)
  highlights changes between manual saves or automatic backups, captures
  incident notes and exports audit logs before you archive revisions.
- **Restore rehearsal** loads backups into a sandbox so you can verify every
  record offline before running a full restore on production data.
- **Offline indicator and Force reload** badges show connectivity status and
  refresh cached assets without touching saved data.

### Top bar controls

- A keyboard-friendly skip link, offline indicator and responsive branding keep
  navigation accessible across devices.
- The global search bar focuses with `/` or `Ctrl+K` (`⌘K` on macOS), opens the
  side menu on mobile and clears with Escape.
- Language, dark mode and pink mode toggles sit beside the Settings dialog,
  which exposes accent color, font size, font family, high-contrast mode, custom
  logo uploads plus backup, restore and factory reset tools that always save a
  backup first.
- The Help button opens a searchable dialog and can be triggered at any time
  with `?`, `H`, `F1` or `Ctrl+/`.
- The 🔄 **Force reload** button removes cached assets and reloads the app
  without erasing projects or runtime data.

### Navigation and search

- On small screens, a collapsible side menu mirrors the main sections for quick
  navigation.
- Every dropdown and editor list includes inline search and supports type-to-
  filter interactions. `/` or `Ctrl+F` (`⌘F` on macOS) focuses the nearest
  search field.
- Search suggestions highlight matching keywords so you can confirm results
  before committing to a navigation or action.
- Star icons pin favorite devices so they stay at the top of selectors and
  persist across sessions and backups.

## Customization & Accessibility

- Switch among light, dark, pink and high-contrast themes; accent color, base
  font size and typeface can be tuned in Settings and persist offline.
- A skip link, focus-visible controls and responsive layout keep navigation
  smooth on keyboards, tablets and phones.
- Keyboard shortcuts cover global search (`/`, `Ctrl+K`, `⌘K`), help (`?`, `H`,
  `F1`, `Ctrl+/`), saving (`Enter`, `Ctrl+S`, `⌘S`), dark mode (`D`) and the pink
  accent (`P`).
- Hover-help mode turns every button, field, dropdown and header into an
  on-demand tooltip so new users can self-teach the interface.
- Upload a custom logo for printed overviews, configure monitoring defaults and
  set preferred requirement presets so deliverables match production branding.
- Fork buttons in gear list forms duplicate entries, while favorites keep
  frequently used devices in reach.

## Data Safety & Offline Operation

- A service worker caches every asset so the planner runs offline and applies
  updates only when you approve them via **Force reload**.
- Projects, runtime submissions, favorites, custom devices, theme selections and
  gear lists live in browser storage. Browsers that support persistent storage
  receive an automatic retention request to reduce eviction risk.
- Automatic safety copies layer 10-minute project snapshots, hourly full-app
  downloads and background auto-gear archives. Enable **Settings → Backup &
  Restore → Show auto backups in project list** to surface the timeline, tune
  retention and restore snapshots without connectivity.
- If a browser blocks downloads, the planner opens a **Manual download** tab
  with the JSON payload so you can copy it into a `.json` file and store it on
  trusted offline media before closing the tab.
- Use **Settings → Backup & Restore → Compare versions** to diff two saves,
  record context in **Incident notes** and export an audit log for your
  handover records.
- Run **Restore rehearsal** from **Settings → Backup & Restore** to load a
  backup inside a disposable sandbox, review the comparison table for changes
  and confirm the archive is healthy before applying **Restore** to live data.
- Opening the repository directly from disk or serving it internally keeps
  sensitive data off external networks. All exports are human-readable JSON so
  you can audit what leaves the machine.
- The header shows an offline indicator whenever connectivity drops, and the
  Force reload control refreshes cached files without touching saved work.
- Clearing the site’s data or using **Factory reset** removes local entries only
  after exporting a backup automatically, ensuring nothing disappears without a
  copy.
- Service worker updates download in the background and wait for your approval.
  When the **Update ready** toast appears, finish your current edits, trigger a
  manual backup, then click **Force reload** so fresh assets load alongside your
  preserved data.
- Storage lives inside hardened `localStorage` with a `sessionStorage` fallback
  when browsers restrict long-term writes. Every save also creates a
  `__legacyMigrationBackup` snapshot so you can recover even if the browser
  reports a quota or schema error. Use your browser’s storage inspector to
  export or audit records before clearing caches or experimenting with data.
- A critical storage guardian now runs on every launch to mirror each essential
  key into its backup slot before you edit anything, ensuring both legacy and
  modern entries always keep a redundant copy ready for restores.

## Data & Storage Overview

- Open **Settings → Data & Storage** to review everything the planner keeps on
  the current device—saved projects, timestamped auto backups, gear list
  snapshots, custom devices, favorites, runtime feedback and the unsaved session
  cache all appear with live counts.
- Each entry clarifies what it represents and, when relevant, lists affected
  categories or whether the session data is currently stored. Empty sections stay
  hidden so you know at a glance when the planner is pristine.
- The summary also estimates backup size using the most recent export, giving you
  a quick check that archives will fit on the storage you bring to set.
- The **Diagnostics log** in this panel mirrors every cineLogging entry, lets
  you filter by severity or namespace, and exposes retention, console mirroring
  and global error capture toggles so you can adjust diagnostics without leaving
  Settings. It now also calls out when filters hide all entries, avoiding false
  alarms during audits. Entries stay local and persist across reloads when you
  enable session storage. Each entry now records an ISO timestamp, millisecond
  marker, event ID and channel indicator so you can line up console fallbacks
  with stored diagnostics even if the structured logger is unavailable. Overview
  print and export attempts now stream their warnings and fallback usage into
  this log so share rehearsals capture exactly when the dialog had to open the
  backup window.
- Full-app backups report their running total and feed the backup history ledger
  so you can confirm hourly safety copies are captured before archiving them
  offline.

## Storage Quota & Maintenance

- **Confirm persistent storage access.** Visit **Settings → Data & Storage** on
  every workstation you provision. The panel reports whether the browser granted
  persistent storage; if it did not, request access from the settings dialog or
  manually via developer tools before loading large projects. Browsers that
  reject the request should trigger a contingency plan—schedule more frequent
  manual exports so nothing depends on eviction-prone storage.
- **Watch quota headroom.** Use the same dashboard (or your browser’s storage
  inspector) to review how much space projects, backups and cached assets
  consume. If available space drops below your comfort margin, archive older
  backups to encrypted external media, delete redundant `auto-backup-…` entries
  from the project selector and confirm fresh exports still complete without
  warnings.
- **Prime caches after updates.** Any time you click **Force reload**, reopen the
  help dialog, legal pages and high-traffic screens such as the device catalog so
  locally bundled Uicons, OpenMoji artwork and typography files repopulate the
  cache. Confirm the offline indicator flickers only briefly on the next load.
- **Document storage health.** Add storage checks to your prep and wrap logs. A
  quick note about granted persistent storage status, remaining quota and where
  the latest backups live makes audits easier and guards against accidental data
  loss when the project transitions to another crew.

## Backup & Recovery

- **Saved project snapshots** – the selector keeps every plan you save and
  creates timestamped `auto-backup-…` entries every 10 minutes or after roughly
  50 tracked edits so you can roll back without losing changes. Switching
  projects, importing or exporting data, or preparing to reload also triggers an
  immediate snapshot even if that cadence hasn't elapsed.
- **Full planner backups** – **Settings → Backup & Restore → Backup** downloads
  `planner-backup.json` with projects, custom devices, runtime feedback,
  favorites, automatic gear rules and UI state. Restores create a safety copy
  before importing and warn if the file was produced on another version.
- **Quick safeguards panel** – the **Settings → Data & Storage** view keeps a
  dedicated **Quick safeguards** block for one-click full backups or fast access
  to restore tools, making it effortless to capture redundant copies before you
  leave the page.【F:index.html†L2548-L2570】
- **Backup history ledger** – each full-app backup writes an entry that you can
  audit from **Settings → Data & Storage** or export with the archive. It keeps
  timestamps and filenames aligned with your paper trail even when you rotate
  media offline.
- **Hidden migration backups** – before overwriting stored planners, setups or
  preferences, the app now preserves the previous JSON snapshot in a protected
  `__legacyMigrationBackup` slot. If a write ever fails or produces corrupt
  data, the recovery tools automatically fall back to that safety copy so no
  user data disappears. Legacy snapshots are automatically upgraded into the
  modern envelope so older backups inherit the same created-at metadata and
  payload wrapper before new saves run. Compression now auto-selects the
  tightest safe encoding
  so migration backups keep fitting within the browser quota even as datasets
  grow. Quota recovery sweeps compress the heaviest stored entries first so
  space is reclaimed faster without touching active backups.【F:src/scripts/storage.js†L1541-L1652】
- **Automatic gear snapshots** – rule changes trigger timestamped safety copies
  every 10 minutes in **Settings → Automatic Gear Rules**, and you can restore or
  export them if a customization misfires.
- **Factory reset** – wipes stored data only after downloading a backup. Use it
  when you need a clean slate.
- **Hourly reminders** – a background routine prompts an additional backup each
  hour so crews always have a recent snapshot ready to archive.
- **Runtime integrity guard** – open the developer console and confirm
  `window.__cineRuntimeIntegrity.ok` is `true` (or rerun
  `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })`) before
  travel. The report proves the offline save/share/restore gateways are intact.
- **Verification loop** – after every critical backup, re-import it into a
  separate browser profile or private window, confirm projects and gear lists
  match expectations, then delete the temporary profile. This routine catches
  corrupted files before they matter.
- **Secure storage habits** – label exported backups with the project name and
  timestamp, then store them on redundant media (RAID volume, encrypted thumb
  drive, optical disc) according to your production’s data policy.
- **Compare before overwriting** – when restoring from an older file, download a
  fresh backup of the current state first. Use a JSON-aware diff tool to review
  differences so you can merge notes manually if needed.

## Data Integrity Drills

Treat data protection as an ongoing habit so no crew member ever wonders whether
the latest save or export is trustworthy. Pair the backup options above with a
repeatable verification loop:

- **Pre-flight validation (daily or before major edits).** Create a manual save,
  export both a planner backup and a `project-name.json` bundle, then import each
  file into a private browser profile. Confirm projects, automatic gear rules,
  favorites and runtime dashboards match the source machine before deleting the
  verification profile. This proves the full save → share → import chain is
  intact.
- **Offline rehearsal (weekly or before travel).** Launch the planner, trigger a
  manual backup, disconnect from all networks and reload `index.html`. Verify
  the offline indicator appears, locally stored Uicons and other assets stay
  crisp and the imported verification project opens without errors. Reconnect
  only after the restored project is confirmed.
- **Change control check (after updating data or scripts).** When devices,
  automatic rules or helper tools change, run `npm test` to rebuild confidence,
  then repeat the pre-flight validation above. Archive the passing backup with a
  changelog entry so future crews know which revisions were certified for
  offline work.
- **Redundancy rotation (monthly or before archiving).** Store the most recent
  planner backup, a verified `project-name.json` bundle (rename to `.cpproject`
  if your asset tracker expects it) and a ZIP of the repository on at least two
  physical media. Rotate which copy you open for spot-checks so you
  catch media degradation before it causes data loss.

## Backup Rotation & Archive Guide

- Follow the dedicated [Backup Rotation & Archive Guide](docs/backup-rotation-guide.md)
  for naming conventions, validation drills and multi-tier retention practices
  that keep redundant copies healthy without risking accidental overwrite.
- The guide covers daily, weekly and project-archive rotations, along with
  incident-specific capture routines so every export is rehearsed in isolation
  before promotion.
- Pair the rotation steps with the [Operational Checklist](docs/operations-checklist.md)
  and [Offline Readiness Runbook](docs/offline-readiness.md) to confirm saving,
  sharing, import, backup and restore flows stay flawless on every workstation.

## Operational Checklists

Use the following repeatable routines to keep projects, backups and offline
assets in sync on every machine that runs Cine Power Planner. Each checklist is
designed so crews can confirm that saving, sharing, importing, backup and
restore paths all function before heading to set and again before wrapping. A
print-friendly version lives in `docs/operations-checklist.md`, and the travel-
focused `docs/offline-readiness.md` runbook expands on these steps for crews
preparing hardware that will operate without connectivity for extended periods.

### Pre-shoot readiness

1. **Confirm the right repository revision.** Open `index.html`, press the
   **Force reload** button and verify the app reports the expected version in
   **Settings → About**. Launch the legal pages once to warm up locally stored
   Uicons, OpenMoji artwork and typography files.
2. **Load critical projects.** Open the active production plan plus a recent
   `auto-backup-…` snapshot. Confirm gear lists, runtime feedback and favorites
   appear correctly in both.
3. **Exercise the save pipeline.** Make a small edit, press `Enter` or
   `Ctrl+S`/`⌘S` to save, then export a `planner-backup.json` file. Restore that
   backup into a private browsing window or secondary profile and confirm the
   project selector matches the source machine.
4. **Test sharing flows.** Export a `project-name.json` bundle, import it into
   the verification profile and ensure automatic gear rules, custom devices and
   the offline indicator load as expected. Delete the profile afterwards.
5. **Simulate no-connectivity operation.** Disconnect from the network or toggle
   Airplane Mode, refresh the planner and confirm the offline badge appears,
   icons stay crisp and previously verified projects remain accessible.
6. **Archive sign-off artifacts.** Store the verified backup, bundle and a copy
   of the repository ZIP on redundant media so the crew can rebuild the exact
   environment even without internet access.

### Wrap-day handoff

1. **Capture a final manual backup.** With the project still open, export a
   `planner-backup.json` file plus the latest `project-name.json` bundle (rename
   to `.cpproject` if needed) and label them with the date, location and shoot
   day.
2. **Validate imports.** Restore both files on a verification machine to ensure
   no corruption occurred during export. Keep the verification instance offline
   to mimic field conditions.
3. **Log changes for the archive.** Record which auto backups were promoted to
   manual saves, which custom devices were added and which automatic gear rules
   changed. Store the notes alongside the backups so future crews understand the
   delta.
4. **Refresh cached assets intentionally.** Once everything is archived, trigger
   **Force reload** so the next session starts with current assets, then open the
   help dialog and legal pages to recache any large documents before going
   offline again.
5. **Hand off redundant media.** Deliver encrypted copies of the backups,
   bundles and repository snapshot to the production’s storage team and retain a
   second copy per your organization’s data retention policy.

## Emergency Recovery Playbook

Follow these steps immediately if something feels wrong—missing gear lists,
unexpected validation warnings or a suspected storage issue. The goal is to
stabilize the environment, capture evidence and restore service without losing
data.

1. **Pause and preserve the current state.** Keep the tab open, disconnect from
   the network (if possible) and note the time plus the offline indicator state.
   Avoid reloading until you record what happened.
2. **Export what still exists.** Trigger **Settings → Backup & Restore → Backup**
   and download the resulting `planner-backup.json`. Even if the project list
   looks wrong, the export captures auto backups, favorites, runtime feedback and
   automatic gear rules for forensic review.
3. **Duplicate auto backups.** In the project selector, reveal `auto-backup-…`
   entries (if hidden) and promote the most recent snapshots to manual saves so
   they cannot be pruned automatically. Rename each copy with an incident ID or
   timestamp.
4. **Inspect the verification bundle.** Import the latest known-good
   `project-name.json` (or `.cpproject`) bundle into a private browser profile or
   secondary machine that stays offline. Confirm projects, gear lists and
   settings appear as expected there before touching the production environment.
5. **Restore carefully.** Once the verification import passes, restore the fresh
   backup on the primary machine. The workflow saves a safety copy first, letting
   you compare the incident snapshot against the restored state with a JSON diff
   tool if needed.
6. **Recache and document.** After recovery, click **Force reload**, reopen the
   help dialog and legal pages to rehydrate caches, then log the incident: what
   happened, which files were exported, where redundant copies were stored and
   which workstation verified the fix. Store the incident log alongside the
   backup so future crews can audit the resolution.

## Gear Lists & Reporting

- Click **Generate Gear List and Project Requirements** to expand selections and project requirements into
  categorized packing tables. Lists refresh automatically when data changes.
- Entries are grouped by category with duplicates merged. Scenario selections add
  matching rigging, weather protection and specialty accessories so the printed
  kit reflects reality.
- Automatic gear rules execute after the generator finishes, inserting
  scenario-specific additions or removals so exports reflect bespoke crew
  preferences without editing JSON by hand.
- Coverage annotations from the automatic gear dashboard appear in print views,
  exports and shareable bundles so offline reviews match the in-app summary.
- Lens rows include front diameter, weight, minimum focus, rod requirements and
  matte box components. The printable overview mirrors these selections with
  brand, mount, diameter, focus, weight, rod support and notes so checkout
  packets carry the same lens specs offline. Battery rows account for
  calculator counts and required hot-swap hardware.
- Crew details, monitoring configurations, video distribution preferences and
  custom notes appear in exports so departments stay aligned.
- Gear lists save with the project, appear in printable overviews, live inside
  shareable project files and can be removed with **Delete Gear List** if you
  want a fresh start.

## Automatic Gear Rules

Settings → **Automatic Gear Rules** lets you fine-tune every generated packing
list without editing JSON exports manually:

- Build rules that only trigger when selected **Required Scenarios** are active.
  Each rule can have an optional label for quick scanning in the settings list.
- Gate rules by **Camera weight**, comparing the selected body to a heavier-than,
  lighter-than or exact gram threshold before the automation fires. Weight
  thresholds accept grams, kilograms, pounds or ounces for fast data entry.
- Add equipment with explicit category and quantity values or pick **Custom
  Additions** for reminders, specialty kits or callouts. Matching remove rules
  hide specific rows the generator would normally include.
- Rules run after built-in accessory packs so they stack cleanly with default
  planner logic and flow through to printable gear lists, project backups and
  shareable bundles.
- A rule coverage dashboard highlights duplicate triggers, net add/remove
  totals, conflicts and uncovered scenarios. Focus cards filter the list,
  jump to affected rules and keep coverage reviews available offline.
- Saving a gear list stores the active rule set with the project. Loading that
  project—or importing a bundle—restores its rule scope so scenario tweaks stay
  attached to the plan.
- Coverage insights travel with printable views, backups, project exports and
  share bundles as a `coverage` object so downstream audits see the exact same
  snapshot that crews reviewed in the app.
- Export or import the rule set as JSON, reset to the factory additions when you
  need a clean baseline and fall back to the automatic history captured every 10
  minutes if edits go sideways.

## Runtime Intelligence

User-submitted runtimes feed a weighted model so estimates match field
experience:

- Temperature adjustments scale from ×1 at 25 °C to ×1.25 at 0 °C, ×1.6 at −10 °C
  and ×2 at −20 °C.
- Resolution multipliers: ≥12K ×3, ≥8K ×2, ≥4K ×1.5, ≥1080p ×1, lower scaled
  relative to 1080p.
- Frame rate scales linearly from 24 fps (for example, 48 fps = ×2).
- Wi‑Fi enabled adds 10 %.
- Codec factors: RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1; ProRes ×1.1;
  DNx/AVID ×1.2; All-Intra ×1.3; H.264/AVC ×1.5; H.265/HEVC ×1.7.
- Monitor entries below specified brightness are weighted by their brightness
  ratio.
- Final weighting reflects how much of the total draw comes from each component
  so similar rigs carry more influence.
- A dashboard sorts entries by weight, shows contribution percentages and flags
  outliers for quick evaluation.

## Keyboard Shortcuts

| Shortcut | Action | Notes |
| --- | --- | --- |
| `/`, `Ctrl+K`, `⌘K` | Focus the global search field. | Works even when navigation is collapsed; press `Esc` to clear. |
| `Enter`, `Ctrl+S`, `⌘S` | Save the active project. | The Save button stays disabled until a project name is entered. |
| `?`, `H`, `F1`, `Ctrl+/` | Open the help dialog. | The dialog stays searchable while you type elsewhere. |
| `D` | Toggle dark mode. | Also available from **Settings → Themes**. |
| `P` | Toggle the pink accent theme. | Works alongside light, dark or high-contrast modes. |
| 🔄 button | Force reload cached assets. | Also accessible via **Settings → Force reload** without erasing projects. |

## Localization

New locales can be previewed immediately—no build step required. To translate
the planner:

1. Duplicate the closest language README as `README.<lang>.md` and translate the
   documentation.
2. Add UI strings to `translations.js` by copying an existing language block and
   translating each value. Preserve formatting placeholders such as `%s`.
3. Provide translated static pages (privacy policy, imprint) by copying the
   relevant HTML files.
4. Run `npm test` to ensure linting, data validation and Jest suites pass before
   submitting a pull request.

## Install as an App

Cine Power Planner is a Progressive Web App:

1. Open `index.html` in a supported browser.
2. Use the browser’s **Install** or **Add to Home Screen** option.
   - **Chrome/Edge (desktop):** Click the install icon in the address bar.
   - **Android:** Open the browser menu and choose *Add to Home screen*.
   - **iOS Safari:** Tap the share icon and select *Add to Home Screen*.
3. Launch the app from your applications list. The installed version works
   offline and updates automatically once you approve a refresh.

## Device Data Workflow

Device catalogs live under `devices/`. Each file groups related equipment so
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
- **`docs/`** – Operational runbooks, translation instructions and backup
  policies that must stay in sync with each release.
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
feature change. Follow the [Documentation, Help & Translation Maintenance Guide](docs/documentation-maintenance.md)
and the quick [Documentation Update Checklist](docs/documentation-update-checklist.md)
whenever you ship a new workflow so offline crews inherit accurate drills, translation
coverage and recovery instructions. Each update should:

- Refresh help dialog topics and hover-help text so shortcuts, save routines and offline
  indicators match the live build.
- Mirror the same adjustments in every localized README and static legal page, preserving
  guidance on saving, sharing, importing, backing up and restoring.
- Keep the [Save, Share, Import, Backup & Restore Reference](docs/save-share-restore-reference.md)
  aligned with UI labels, keyboard shortcuts and verification drills so crews rehearse the
  exact workflows enforced in code when they validate documentation changes.
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
- Cross-check the [Documentation Coverage Matrix](docs/documentation-coverage-matrix.md) so every
  workflow change includes updated README copy, help topics, printable runbooks, translations and
  rehearsal evidence before sign-off.
- Capture the artefacts listed in the [Documentation Verification Packet](docs/documentation-verification-packet.md)
  so every release stores synchronized manuals, rehearsal exports and verification logs in redundant
  offline locations. Attach the packet location to your verification notes so future crews know where
  to retrieve the canonical documentation bundle when rehearsing saves, shares, imports, backups and
  restores.
- Schedule recurring [documentation audits](docs/documentation-audit-checklist.md) so the README family,
  help center, translations and printable manuals are regularly spot-checked against the runtime
  safeguards, Quick safeguards exports and verification evidence captured in the planner.

## Development

Set up with Node.js 18 or later. After cloning the repository:

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
[`docs/architecture/module-registry.md`](docs/architecture/module-registry.md)
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
offline usage stays reliable.

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

## Troubleshooting

- **Service worker stuck on an old version?** Click **Force reload** or perform a
  hard reload in your browser’s developer tools to update cached assets without
  deleting saved projects.
- **Missing data after closing the tab?** Ensure the site has storage access.
  Private browsing modes or restrictive tracking protections can block
  persistence.
- **Downloads blocked?** Allow multiple downloads so backups and shareable
  bundles can save to disk.
- **Command-line scripts failing?** Confirm Node.js 18+ is installed, run
  `npm install` and rerun the requested npm script. Memory errors usually mean a
  suite exceeded its cap—retry with a narrower target like `npm run test:unit`.

## Feedback & Support

Open an issue if you encounter problems, have questions or want to suggest new
features. Including project exports or runtime samples helps keep the catalog
accurate for future shoots.

## Contributing

Contributions are welcome! Open an issue or submit a pull request after reading
`CONTRIBUTING.md`. Run `npm test` before submitting to ensure linting, data
consistency checks and unit tests all pass.

## Acknowledgements

The planner ships with locally stored Uicons, OpenMoji assets and other bundled
artwork so icons stay available without a network connection, and relies on
lz-string to compactly store projects in URLs and backups.

## License

Distributed under the ISC license. See `package.json` for details.

