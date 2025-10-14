# Cine Power Planner

<img src="src/icons/logo-default.svg" alt="Cine Power Planner icon" width="200">

Cine Power Planner is a standalone web app for building, auditing and sharing
professional camera power plans that never leave your machine. Plan V‑Mount,
B‑Mount or Gold‑Mount rigs, model runtime expectations, capture project
requirements and export shareable bundles—entirely inside your browser, even
when you are offline. Every dependency lives in this repository so the same
experience runs on a stage workstation, a field laptop or an air-gapped archive
drive without phoning home.

## Key Features

- **Equipment power knowledge base.** Reference bundled draw figures for cameras,
  monitors, transmitters, lights and accessories, or extend the local catalog
  with your own entries so every project starts with verified data.
- **Battery runtime planning.** Combine battery capacities, voltage families and
  discharge behavior to estimate how long each rig will run before crews swap
  packs. Runtime feedback keeps expectations visible during prep and rehearsal.
- **Custom rig configurations.** Mix cameras, accessories, crew requirements and
  saved scenarios to mirror the exact builds used on set. Export bundles or
  backups at any time to move that configuration to another workstation without
  risking data loss.
- **Safety rehearsals & audit trails.** Guided drills, automatic diff logs and
  verification packets make it easy to prove that save, share, import, backup
  and restore workflows protect every bit of user data—even when you never
  reconnect to the internet.
- **Offline-first operation.** All icons, fonts, Uicons and helper scripts ship
  with the repo. Autosave, backup, restore, share and help systems run entirely
  on-device so crews can rehearse and operate in fully disconnected
  environments.
- **Synonym-aware global search.** Safety terms such as “trash”, “archive”,
  “safeguard”, “recover” or “rollback” now jump straight to delete, save,
  backup and restore tools so data protection remains effortless.

## Installation

1. Clone or download this repository to a trusted local drive:
   ```bash
   git clone https://github.com/Hugo9809/cine-power-planner.git
   cd cine-power-planner
   ```
   (If you received an offline bundle, unpack it to a local folder instead.)
2. Open `index.html` directly in a supported browser. Every asset loads from the
   repository, so you can disconnect immediately after opening the file.
3. (Optional) Serve the folder over `http://localhost` to enable the bundled
   service worker and Progressive Web App install prompt. Any static server
   works while offline, for example:
   ```bash
   npx http-server
   # or
   python -m http.server
   ```
4. Follow the [Quick Start](#quick-start) drill to rehearse saving, sharing,
   importing, backing up and restoring on every machine before crews rely on the
   planner in the field.

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

## Safety Layers at a Glance

| Safeguard | What it protects | How to exercise it | Evidence to archive |
| --- | --- | --- | --- |
| Manual saves | Active project state, including devices, runtime notes and gear lists. | Press **Enter**, click **Save** or use `Ctrl+S`/`⌘S`. | Timestamped selector entries and exported diff logs from **Compare versions**. |
| Auto-save & auto-backup cadence | Rolling snapshots that capture in-flight edits. | Leave the project open—snapshots run every ~50 changes or 10 minutes. | `auto-backup-…` entries in the selector, plus the **Latest activity** timeline. |
| Full planner backup | Every project, favorite, runtime feedback entry, automatic gear rule and preference. | **Settings → Backup & Restore → Backup** (or **Quick safeguards**). | `planner-backup.json`, backup history ledger exports and verification log attachments. |
| Project bundle exports | Individual projects ready for handoff to another workstation. | **Export Project** from the selector. | `project-name.json` (or renamed `.cpproject`) files stored with checksum notes. |
| Restore rehearsal sandbox | Confidence that imports and restores behave safely before touching live data. | **Settings → Backup & Restore → Restore rehearsal**. | Console capture of `window.__cineRuntimeIntegrity`, rehearsal notes and sandbox screenshots. |
| Documentation & translation updates | Help center topics, localized READMEs and printable guides. | Follow the documentation maintenance checklist whenever behavior changes. | Updated docs in `docs/`, localized `README.*.md` files and signed verification packets. |

## Quick Links

- **Run the full rehearsal.** Follow the [Quick Start](#quick-start) drill to verify save, share, import, backup and restore paths on every workstation before crews depend on them offline.
- **Reference the workflows.** Keep the [Save, Share & Import Drill](#save-share--import-drill) and the detailed [Save, Share, Import, Backup & Restore Reference](docs/save-share-restore-reference.md) nearby when training teams or auditing data safety.
- **Prove offline readiness.** Pair the [Offline Readiness Runbook](docs/offline-readiness.md) with the [Operational Checklist](docs/operations-checklist.md) so documented rehearsals stay synchronized with the app and bundled assets.
- **Re-certify cached bundles.** Follow the [Offline Cache & Safeguard Verification Drill](docs/offline-cache-verification-drill.md) whenever you regenerate service-worker assets, ship new icons or touch persistence code so cached builds keep matching the repository and user data remains fully protected offline.
- **Audit power connector safety.** Pair the [Power Summary Warning Reference](docs/power-summary-warning-reference.md) with each Power Summary rehearsal to log connector limits, redundant backups and autosave/share alignment before distributing plans offline.
- **Protect user data deliberately.** Follow the [Data Protection Playbook](docs/data-protection-playbook.md) when you scope changes, rehearse daily guardrails, prepare releases and respond to incidents. It consolidates the save/share/import/backup/restore routines, guard outputs and archival expectations so offline crews always preserve every project.
- **Update documentation deliberately.** Use the [Documentation Update Checklist](docs/documentation-update-checklist.md) and [Documentation Coverage Matrix](docs/documentation-coverage-matrix.md) every time you ship new behavior so help topics, translations and manuals stay in lockstep with the runtime.
- **Log verification rehearsals.** Pair each release or workstation audit with the [Documentation Verification Packet](docs/documentation-verification-packet.md) and file copies of the [Verification Log Template](docs/verification-log-template.md) so every save/share/import/backup/restore drill is documented alongside the assets that shipped. Maintaining these records keeps help topics, translation notes and workflow screenshots provably in sync with the builds crews run offline.
- **File a status snapshot.** Complete the [Documentation Status Report](docs/documentation-status-report-template.md) whenever you update help topics, translations or manuals. It captures which surfaces changed, the offline rehearsal evidence you gathered and where the backups plus verification logs now live so future audits can retrace the release without reconnecting to the network.
- **Localize with confidence.** Reference the [Translation Guide](docs/translation-guide.md) and language-specific README files whenever you add or update locales so offline readers stay aligned with the latest workflows.

## Offline Audit Toolkit

Use these bundled guides any time you need to prove the planner is safe to run without connectivity or document how data traveled between machines:

- **Operations Checklist** – The step-by-step rehearsal in [`docs/operations-checklist.md`](docs/operations-checklist.md) mirrors the in-app safeguards so every save, share, import, backup and restore path is witnessed before crews depend on the tool offline.
- **Offline Readiness Runbook** – [`docs/offline-readiness.md`](docs/offline-readiness.md) expands the rehearsal for travel days, including cache priming, redundant media prep and recovery drills that keep user data safe even when the set stays air-gapped.
- **Data Protection Playbook** – [`docs/data-protection-playbook.md`](docs/data-protection-playbook.md) consolidates decision trees for updates, emergency response and incident communication so user data remains the top priority regardless of context.
- **Verification Log Template** – [`docs/verification-log-template.md`](docs/verification-log-template.md) captures who rehearsed the workflows, when backups were exported and where redundant copies live. Store the filled template with your bundles to prove nothing was lost between machines.
- **Documentation Coverage Matrix** – [`docs/documentation-coverage-matrix.md`](docs/documentation-coverage-matrix.md) tracks whether help topics, translations, screenshots and printed manuals all reflect the current runtime. Reference it before sign-off to confirm every offline reader sees the same instructions you rehearsed.

## Documentation & training cadence

Keeping help content, checklists and translated readmes synchronized with the runtime is part of the release process. When behavior changes or new safeguards ship, run the following loop before handing builds to crews:

1. **Map the change.** Note which save, share, import, backup or restore flows gain new states, prompts or safeguards. Update the relevant walkthroughs in [`docs/`](docs) so rehearsals always mirror the interface users see offline.
2. **Refresh multilingual guidance.** Propagate wording adjustments to `README.*.md` files and any localized help panels so offline-first teams get the same instructions regardless of language.
3. **Re-run verification packets.** Execute the [Documentation Verification Packet](docs/documentation-verification-packet.md) against the current build, capturing signed logs that prove every save, share, import, backup and restore path works without network access.
4. **Distribute updated bundles.** Regenerate shareable training bundles so crews rehearse with the current assets, icons and checklists that ship inside this repository.

Treat these steps as blocking tasks for every merge so documentation remains as resilient as the planner itself.

## Release & Documentation Checklist

Before you merge or ship a field build, walk through this condensed checklist to protect user data, documentation and translations:

1. **Rehearse critical workflows.** Run the [Quick Start](#quick-start) drill or [`docs/operations-checklist.md`](docs/operations-checklist.md) to confirm saves, shares, imports, backups and restores still work end-to-end offline.
2. **Refresh written guidance.** Update help center topics, localized README files and printed manuals. Use the [Documentation Coverage Matrix](docs/documentation-coverage-matrix.md) to confirm no language or workflow was missed.
3. **Capture verification artifacts.** Fill in the [Documentation Verification Packet](docs/documentation-verification-packet.md) and [Verification Log Template](docs/verification-log-template.md) with the latest rehearsal notes, export hashes and cache-priming screenshots.
4. **Validate translation toggles.** Switch through every language in the app to ensure updated strings render correctly without fetching external assets.
5. **Store redundant archives.** Export `planner-backup.json`, current project bundles, automatic gear rule JSON and a ZIP of the repository. Place the set on at least two offline media locations with a short retention note.
6. **Log service worker state.** Record the reported version, offline indicator behavior and the timestamp of the last approved **Force reload** so crews can audit which revision they are running.

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

- [Key Features](#key-features)
- [Installation](#installation)
- [At a Glance](#at-a-glance)
- [Safety Layers at a Glance](#safety-layers-at-a-glance)
- [Quick Links](#quick-links)
- [Offline Audit Toolkit](#offline-audit-toolkit)
- [Documentation & training cadence](#documentation--training-cadence)
- [Release & Documentation Checklist](#release--documentation-checklist)
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
  retention, console mirroring, default console capture and global error capture
  without leaving the planner.
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
  Clearing the field bubbles your most recent matches to the top so repeating
  frequent crew workflows stays lightning fast. Start a query with `recent` or
  `history` to narrow suggestions to the shortcuts you've used lately before
  browsing the full catalog.
- **Force reload button** – refresh cached service worker assets without
  deleting projects or devices. The reload now preloads the fresh bundle while
  cleanup runs so updates land faster without risking stored data. It now
  triggers an immediate auto-save and backup flush before the caches clear so no
  in-flight edits are lost.
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
5. Open **Help → Quick start checklist** and launch the guided tutorial. It
   walks through creating projects, configuring devices, reviewing the Power
   Summary (with its quick summary checkpoint) and rehearsing the offline safety
   next step that highlights the top-bar indicator plus autosave status, building
   gear lists, managing contacts, tracking your own gear, tuning automatic
   rules, and the export/import/backup drills. The step navigator and progress
   meter let you revisit finished workflows without restarting, the **Resume
   guided tutorial** button appears automatically with your saved counts if you
   paused mid-tour so offline progress is never lost, and the checklist row
   surfaces an offline status message showing how many steps are complete, when
   the most recent step finished and the next workflow to cover before you
   relaunch the tour. When the tutorial spotlights the Power Summary, cross-check
   the colour-coded warnings against the
   [Power Summary Warning Reference](docs/power-summary-warning-reference.md),
   record any pin or D-Tap overloads, confirm redundant backups and verify the
   autosave banner timestamp matches the share/export preview before you complete
   the step.
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
   you opened. Log the verification date, machine name and operator so crews can
   prove when the drill succeeded, keeping save, share, import, backup and
   restore workflows provably in sync from the first session.
10. Capture a console screenshot of `window.__cineRuntimeIntegrity` (or rerun
   `window.cineRuntime.verifyCriticalFlows()` and store the report) to document
   that the runtime guard validated every save/share/restore gateway and the
   runtime feedback storage bindings while you rehearsed offline.

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
   everything restored cleanly, then label and file the verified exports with
   your production’s archival checklist.
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
   full production context. Your saved user profile now appears automatically in
   the crew list—adjust the role or contact info per project before exporting.
   The Storage & Media grid now surfaces CFexpress,
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
- **Crew contacts stay reusable.** Open the **Contacts** entry in the sidebar to
    maintain a dedicated roster with roles, emails, phone numbers, websites and profile
    photos that you can drop into any project. Contacts live in the same
    localStorage snapshot as your projects, are included in manual backups and
    can be imported from offline `.vcf` (vCard) files whenever you need to merge
    address books. Saving a crew row back to the roster keeps future projects
    aligned without retyping details.【F:index.html†L206-L209】【F:index.html†L7345-L7374】【F:src/scripts/app-core-new-1.js†L13632-L17848】
- **Personal gear inventory stays in sync.** Open **Own Gear** in the sidebar to catalog kit names,
    quantities, notes and sourcing. Entries share the same offline snapshot as projects, feed automatic
    gear rule conditions and travel with manual backups, share bundles and quota recovery safeguards so
    personal hardware never drifts from the planner.【F:index.html†L214-L219】【F:index.html†L6596-L6656】【F:src/scripts/modules/features/own-gear.js†L43-L172】【F:docs/save-share-restore-reference.md†L15-L17】
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
- **Manual download fallback safeguards exports.** If a browser or content
  blocker stops an export, the planner opens a Manual download tab with the JSON
  contents. Press `Ctrl+A`/`Ctrl+C` (`⌘A`/`⌘C` on macOS) to copy everything into
  a `.json` file and store it with your backups before closing the tab.
- **Synchronize with checklists.** When a teammate sends you an updated bundle,
  import it, review the `Updated at` timestamps in the sidebar and archive the
  previous JSON (or `.cpproject`) bundle in your storage system to maintain a
  clear history.
- **Share without losing context.** Bundles remember language, theme, custom
  logo and other personalization choices so the recipient opens the project in a
  familiar state even if they stay offline.
- **Metadata travels with the bundle.** Exported projects now record the
  download timestamp, planner version, generator and whether automatic gear
  rules are included; the import dialog surfaces that summary and flags version
  mismatches so crews can verify provenance without reconnecting.

## Project & Backup File Formats

- **`project-name.json` (project bundle).** Exported from **Export Project**,
  this JSON bundle stores one project, favorites and any referenced custom
  devices. Rename it to `.cpproject` if your workflow expects that extension;
  the planner treats both identically during import.
- **`planner-backup.json` (full backup).** Created via **Settings → Backup &
  Restore → Backup**, this archive captures every project, auto-backup,
  favorite, runtime submission, automatic gear rule, contact roster, UI
  preference, custom font and branding asset so a restore never loses context.
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
  crews verify backups before field use. A new offline readiness quick check
  distills the Data & Storage dashboard health review, quick safeguards and
  redundant backup rehearsal into a three-step pre-flight routine. A console
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
  and every theme control stays synchronized automatically.
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
- Wrap phrases in double quotes inside global search to demand exact matches
  when you know the precise label you need.
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
  you filter by severity or namespace, and exposes retention, console mirroring,
  default console capture and global error capture toggles so you can adjust
  diagnostics without leaving Settings. It also flags when filters hide all
  entries so verification crews
  know the quiet periods are expected. Entries stay local and persist across
  reloads when you enable session storage. Each entry now records an ISO
  timestamp, millisecond marker, event ID and channel indicator so teams can
  align console fallbacks with stored diagnostics even when the structured
  logger is unavailable. A live enablement summary now shows whether each
  severity will reach the console mirror or the retained history before you
  dispatch heavyweight diagnostics, making it safer to toggle verbose traces
  during offline shoots.
- The **Latest activity** timeline now posts **safety reminders** beneath the
  three timestamps. They highlight when manual saves, automatic snapshots or
  full-app archives grow stale and include the captured time so you know exactly
  which safeguard to refresh before trusting an offline session.
- The **Backup guardian** status row surfaces the critical storage guard’s
  report. It mirrors every essential storage key into a redundant backup slot
  before edits and summarises whether new copies were created, the first save is
  still pending or an issue needs a console review. Checking the row before
  travel confirms that mirrored safeguards exist for every project, gear list
  and preference stored on the device.【F:src/scripts/app-core-new-2.js†L8640-L8740】【F:src/scripts/storage.js†L2800-L2995】
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
  grow.
- **Automatic gear snapshots** – rule changes trigger timestamped safety copies
  every 10 minutes in **Settings → Automatic Gear Rules**, and you can restore or
  export them if a customization misfires. The retention slider now defaults to
  keeping 36 snapshots so crews have a longer runway before older entries are
  trimmed.
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
- **Monthly help center audit (use the built-in checklist).** Open **Help →
  Monthly data health check**, follow the guided steps to capture a fresh full
  backup from **Settings → Data & Storage → Quick safeguards → Download full
  backup**, export each active project, reload offline to confirm the cached
  interface, finish with **Restore rehearsal**, then run
  `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` and log the
  console output with the outcome in your rotation log.
- **Redundancy rotation (monthly or before archiving).** Store the most recent
  planner backup, a verified `project-name.json` bundle (rename to `.cpproject`
  if your asset tracker expects it) and a ZIP of the repository on at least two
  physical media. Rotate which copy you open for spot-checks so you
  catch media degradation before it causes data loss.

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
| `D` | Toggle dark mode. | Also available from **Settings → Themes**; all theme controls (header, onboarding and Settings) stay synchronized automatically. |
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

> **Catalog update.** The FIZ hand unit catalog now lists Tilta's Nucleus-M and Nucleus-M II controllers alongside Nano and Nano II hand wheels, Preston's HU4, cmotion's cPRO hand unit, Chrosziel's MagNum hand unit, Teradek's CTRL.3, DJI's Focus and Focus Pro hand units plus the RS Focus Wheel (2022), Hedén's YMER-3 hand control, Freefly's Pilot Pro hand controller, Redrock's microRemote hand controller, and SmallRig's MagicFIZ handgrip so offline planners can compare more ecosystems without leaving the app.

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
`cineUi`, `cineRuntime` and shared helpers) with the global `cineModules`
registry. Each module is frozen, documented with metadata and verified during
startup so save, share, import, backup and restore paths never run without
their safeguards. Review
[`docs/architecture/module-registry.md`](docs/architecture/module-registry.md)
before adding new modules to keep offline guarantees, documentation and
translations aligned.

An infrastructure stack—`cineModuleArchitectureCore`,
`cineModuleArchitectureHelpers`, `cineModuleBase`, `cineModuleContext` and
`cineModuleEnvironment`—keeps scope detection,
module-system lookups, registration queues and global exposure aligned between
modern and legacy bundles without duplicating boilerplate.

When introducing new modules prefer `cineModules.createBlueprint({...})` to
collect metadata and freeze defaults before registering. The helper freezes the
generated API, normalises category/description/connection strings and
automatically re-queues failed registrations so offline workflows retain their
safeguards.

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

