# Cine Power Planner

![Cine Power Planner icon](public/icons/app-icon.svg)

Cine Power Planner is a standalone web app for building, auditing and sharing
professional camera power plans that never leave your machine. Plan V‑Mount,
B‑Mount or Gold‑Mount rigs, model runtime expectations, capture project
requirements and export shareable bundles—entirely inside your browser, even
when you are offline.

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

### Feature pillars

- **Plan with confidence.** Calculate draw at 14.4 V/12 V (and 33.6 V/21.6 V for
  B‑Mount), compare compatible batteries and visualize runtime impact through a
  weighted feedback dashboard.
- **Stay production-ready.** Projects capture devices, requirements, scenarios,
  crew details and gear lists; auto-backups, shareable bundles and forced
  refreshes keep data current without sacrificing stability.
- **Work the way you prefer.** Language detection, dark, pink and high-contrast
  themes, typography controls, custom logos and hover help make the interface
  approachable on set and in prep.

## Table of Contents

- [Overview](#overview)
- [Translations](#translations)
- [What’s New](#whats-new)
- [Quick Start](#quick-start)
- [Everyday Workflow](#everyday-workflow)
- [Saving & Project Management](#saving--project-management)
- [Sharing & Imports](#sharing--imports)
- [Interface Tour](#interface-tour)
- [Customization & Accessibility](#customization--accessibility)
- [Data Safety & Offline Operation](#data-safety--offline-operation)
- [Data & Storage Overview](#data--storage-overview)
- [Backup & Recovery](#backup--recovery)
- [Gear Lists & Reporting](#gear-lists--reporting)
- [Automatic Gear Rules](#automatic-gear-rules)
- [Runtime Intelligence](#runtime-intelligence)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Localization](#localization)
- [Install as an App](#install-as-an-app)
- [Device Data Workflow](#device-data-workflow)
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

- **Automatic gear rules** – design scenario-triggered additions or removals
  that apply after the generator runs, complete with import/export controls
  and timed backups.
- **Data & storage dashboard** – audit stored projects, gear lists, custom
  devices, favorites and runtime feedback, and review approximate backup size
  without leaving the Settings dialog.
- **Accent and typography controls** – adjust accent color, font size and
  typeface while dark, pink and high-contrast themes persist between visits.
- **Global search shortcuts** – press `/` or `Ctrl+K` (`⌘K` on macOS) to focus
  the feature search instantly, even when the mobile navigation is collapsed.
- **Force reload button** – refresh cached service worker assets without
  deleting projects or devices.
- **Pinned favorites** – star dropdown entries to keep go-to cameras, batteries
  and accessories at the top of selectors and inside backups.
- **Factory reset safeguards** – capture an automatic backup before wiping
  saved projects, custom devices and settings.
- **Custom print branding** – upload a logo that appears in printable overviews
  and exported bundles.
- **Backups that include favorites** – downloads include favorites alongside
  projects, gear lists and custom devices.
- **Interactive project diagram** – drag nodes, zoom, snap to grid and export
  clean SVG or JPG layouts with compatibility indicators.
- **Simplified sharing** – export a single project bundle that restores device
  selections, gear lists, runtime feedback and custom gear in one upload.
- **Refined interface** – refreshed layout, improved contrast and persistent
  diagram popovers on touch make the planner easier to use anywhere.

See the language-specific README files for release details in other locales.

## Quick Start

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
4. Confirm offline operation by loading the planner once, closing the tab,
   disconnecting from the network (or toggling Airplane Mode) and reopening
   `index.html`. The offline indicator in the header should light up briefly
   while cached files load.
5. Create a project, add devices from the dropdowns and generate a printable
   overview or gear list to brief collaborators.
6. Use **Settings → Backup & Restore → Backup** before closing your first
   session so you have a baseline snapshot to compare against future changes.

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
   full production context. Fork buttons duplicate entries for faster data
   entry. When specific scenarios demand bespoke kits, open **Settings →
   Automatic Gear Rules** to layer custom additions or removals before
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
  versions appear in the project selector every 10 minutes so you can roll back
  without leaving the interface.
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
  `.cpproject` file containing the active project, favorites and any referenced
  custom devices. Send it via your preferred secure channel; recipients can
  import without needing internet access.
- **Automatic gear rules travel with bundles.** Decide whether to include your
  rules during export; teammates who import the bundle can ignore them, apply
  them only to the imported project or merge them into their global ruleset.
- **Restores are double-buffered.** Importing a bundle prompts you to save a
  backup of your current environment first. After choosing the bundle file, the
  planner validates its schema, merges new devices and places the restored
  project at the top of the selector.
- **Cross-device workflows stay offline.** To move a plan to a workstation with
  no connectivity, copy `index.html`, `script.js`, `devices/` and your backup or
  bundle files onto removable media. Launch from disk, import the bundle and
  continue planning without touching external networks.
- **Export responsibly.** Review the exported JSON before distributing it to
  make sure no extra projects or notes are included. The structure is human
  readable so you can redact or duplicate entries as needed.
- **Synchronize with checklists.** When a teammate sends you an updated bundle,
  import it, review the `Updated at` timestamps in the sidebar and archive the
  previous bundle in your storage system to maintain a clear history.
- **Share without losing context.** Bundles remember language, theme, custom
  logo and other personalization choices so the recipient opens the project in a
  familiar state even if they stay offline.

## Interface Tour

### Quick reference

- **Global search** (`/`, `Ctrl+K`, `⌘K`) jumps to any feature, selector or help
  topic—even when the side navigation is hidden on smaller screens.
- **Help center** (`?`, `H`, `F1`, `Ctrl+/`) provides searchable guides,
  shortcuts, FAQs and an optional hover-help mode so every control explains
  itself.
- **Project diagram** visualizes power and signal paths. Hold Shift while
  exporting to save a JPG snapshot instead of SVG.
- **Battery comparison panel** reveals how each compatible pack performs and
  flags overload risks before you leave prep.
- **Gear list generator** turns selections into categorized tables with tooltips
  for specs, crew emails and scenario-driven accessories.
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
- Storage lives inside IndexedDB with small preferences mirrored to
  `localStorage`. Use your browser’s developer tools to inspect or export raw
  records before making experimental changes or clearing caches.

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

## Backup & Recovery

- **Saved project snapshots** – the selector keeps every plan you save and
  creates timestamped `auto-backup-…` entries every 10 minutes while the app is
  open so you can roll back without losing changes.
- **Full planner backups** – **Settings → Backup & Restore → Backup** downloads
  `planner-backup.json` with projects, custom devices, runtime feedback,
  favorites, automatic gear rules and UI state. Restores create a safety copy
  before importing and warn if the file was produced on another version.
- **Automatic gear snapshots** – rule changes trigger timestamped safety copies
  every 10 minutes in **Settings → Automatic Gear Rules**, and you can restore or
  export them if a customization misfires.
- **Factory reset** – wipes stored data only after downloading a backup. Use it
  when you need a clean slate.
- **Hourly reminders** – a background routine prompts an additional backup each
  hour so crews always have a recent snapshot ready to archive.
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

## Gear Lists & Reporting

- Click **Generate Gear List** to expand selections and project requirements into
  categorized packing tables. Lists refresh automatically when data changes.
- Entries are grouped by category with duplicates merged. Scenario selections add
  matching rigging, weather protection and specialty accessories so the printed
  kit reflects reality.
- Automatic gear rules execute after the generator finishes, inserting
  scenario-specific additions or removals so exports reflect bespoke crew
  preferences without editing JSON by hand.
- Lens rows include front diameter, weight, minimum focus, rod requirements and
  matte box components. Battery rows account for calculator counts and required
  hot-swap hardware.
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
- Add equipment with explicit category and quantity values or pick **Custom
  Additions** for reminders, specialty kits or callouts. Matching remove rules
  hide specific rows the generator would normally include.
- Rules run after built-in accessory packs so they stack cleanly with default
  planner logic and flow through to printable gear lists, project backups and
  shareable bundles.
- Saving a gear list stores the active rule set with the project. Loading that
  project—or importing a bundle—restores its rule scope so scenario tweaks stay
  attached to the plan.
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

### File structure

```
index.html                 # Main HTML layout
public/styles/style.css       # Core styles and layout
public/styles/overview.css    # Printable overview styling
public/styles/overview-print.css # Print overrides for the overview dialog
public/scripts/script.js        # Application logic
public/scripts/storage.js       # Local storage helpers
public/scripts/static-theme.js  # Shared theme logic for legal pages
public/data/index.js       # Default device list
public/data/devices/       # Device catalogs by category
public/data/schema.json    # Schema used for validation
public/vendor/             # Bundled third-party libraries
public/icons/              # PWA icons for manifests and shortcuts
public/legal/              # Offline legal documents
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

