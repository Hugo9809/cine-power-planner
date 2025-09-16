# Cine Power Planner

![Cine Power Planner icon](icon.svg)

Cine Power Planner is a standalone web app for planning professional camera
rigs powered by V‑Mount, B‑Mount or Gold‑Mount batteries. It calculates total
power draw, checks that batteries can safely deliver the required output, and
estimates how long your project will run. The tool runs entirely in the browser
and even works offline.

The planner was built for ACs, data wranglers and DoPs who need to keep complex
digital cinema rigs running all day without guesswork. As you swap camera
bodies, add accessories or adjust requirements, the power draw, required
batteries and runtime feedback update instantly so you can react before you get
to set.

**Why crews choose Cine Power Planner**

- Model multi-mount rigs with precise draw calculations, weighted runtime
  feedback and safety warnings when a battery cannot deliver the current you
  need.
- Keep production context together—projects store requirements, crew, scenarios
  and even pinned favorites so printed gear lists and shared bundles carry the
  whole picture.
- Work the way you prefer with offline support, dark, pink and high-contrast
  themes, typography controls and type-to-search shortcuts across the
  interface.

No build step is required—open `index.html` in your browser and start planning
immediately. Serving the repository over HTTP(S) installs a service worker so
that future visits work offline and pick up updates automatically.

## Highlights

- **Runs anywhere.** No accounts, servers or build steps—open `index.html` from
  disk or host it behind the firewall your production already trusts.
- **Designed for crews.** Projects keep requirements, runtime data, favorites
  and backups together so camera, lighting and production teams share the same
  context.
- **Confidence by default.** Safety warnings, weighted runtime averages and a
  comparison view make it easy to validate that planned batteries can deliver
  the required current.
- **Approachable customization.** Add custom devices, shareable project
  bundles, localized UI strings and printable gear lists without leaving the
  browser.

## Table of Contents

- [Highlights](#highlights)
- [Translations](#translations)
- [Recent Updates](#recent-updates)
- [Features at a Glance](#features-at-a-glance)
- [Quick Start](#quick-start)
- [Example Workflow](#example-workflow)
- [Key Concepts](#key-concepts)
- [Interface Overview](#interface-overview)
- [Customization and Accessibility](#customization-and-accessibility)
- [Gear List](#gear-list)
- [Runtime Data Weighting](#runtime-data-weighting)
- [Install as an App](#install-as-an-app)
- [Offline Use and Data Storage](#offline-use-and-data-storage)
- [Backup and Recovery](#backup-and-recovery)
- [Privacy and Data Ownership](#privacy-and-data-ownership)
- [Browser Support](#browser-support)
- [Development](#development)
- [Device Data Workflow](#device-data-workflow)
- [Troubleshooting](#troubleshooting)
- [Feedback and Support](#feedback-and-support)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Translations

Documentation is available in multiple languages. The app detects your browser
language on first load, and you can switch languages in the top right corner:

- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

Contributions for additional languages are welcome. To add a translation, include a `README.<lang>.md` file and the necessary translation strings in your pull request.

## Recent Updates

- **Accent and typography controls** – adjust the accent color, font size and typeface from the Settings dialog while dark, pink and high contrast themes remain available on every visit.
- **Global search shortcuts** – press / or Ctrl+K (⌘K on macOS) to focus the feature search instantly, even when it lives inside the collapsed mobile side menu.
- **Force reload button** – clear cached service worker files and refresh the offline app without deleting saved projects or devices.
- **Pinned favorites** – star dropdown entries to keep go-to cameras, batteries and accessories at the top of each selector and include them in backups.
- **Clear local cache** – wipe stored projects and settings with one click.
- **Project name above gear list** – printed overviews and the gear list now show the project name.
- **Custom print logo** – upload a logo that appears in printable overviews and backups.
- **Favorites in backups** – favorites are saved and an automatic backup runs before restoring data.
- **Crew email field** – record email addresses for each crew member.
- **High contrast mode** – switch to a high contrast theme for improved readability.
- **Dynamic device forms** – category fields populate automatically from the schema in new device forms.
- **Refreshed interface design** – cleaner layout and improved contrast make the planner easier to use on desktop and mobile.
- **Simplified project sharing** – download a single project file that bundles selections, requirements, gear lists, runtime feedback and custom devices, then load it to restore the full setup.
- **Unique icons for required scenarios** – each required scenario now shows its own icon for quick recognition.
- **Persistent diagram popups on touch** – tapping a node on touch devices keeps its popup visible until another node is selected.
- **Interactive project diagram** – drag devices, zoom, snap nodes to a grid, and export layouts as SVG or JPG.
- **Pink accent theme** – toggle a playful pink highlight that persists between visits or press **P** to switch quickly.
- **Searchable help dialog and hover hints** – open with ?, H, F1 or Ctrl+/ (even while typing), filter topics instantly, press / or Ctrl+F to jump to the search box, browse the built-in FAQ, and hover over any button, field, dropdown or header for a quick explanation.
- **Type-to-search dropdowns** – quickly narrow device lists by typing directly into any selector.
- **Multi-mount support** – choose between V‑, B‑ or Gold‑Mount plates on supported cameras and the battery list updates automatically.
- **User runtime feedback** – submit real-world runtimes with environment details to refine estimates.
- **Visual runtime weighting dashboard** – see how temperature, resolution, frame rate and codec affect each runtime report, now sorted by weight with exact share percentages.
- **Gear list generator** – compile selected gear and project requirements with one click.
- **Quick project saving** – press Enter or Ctrl+S (⌘S on macOS) to save a project and the Save button stays disabled until a name is entered.
- **Project requirement saving** – store project requirements with each project so gear lists retain full context.
- **User entry duplication** – gear list forms use fork buttons to copy user fields instantly.

See the language-specific README files for full details.

## Features at a Glance

### Plan with confidence

- Calculate total power consumption, current draw at 14.4 V (33.6 V for
  B‑Mount) and 12 V (21.6 V for B‑Mount), and estimated battery runtime across
  any combination of devices.
- Combine user-submitted runtimes using weighted averages that account for
  temperature, resolution, frame rate, codecs and each device’s share of total
  draw.
- Compare runtimes across all compatible batteries with the optional battery
  comparison panel and warnings when a pack cannot safely supply the required
  current.

### Manage evolving projects

- Save, auto-back up, share, restore and clear projects—requirements included—with
  printable overviews and shareable JSON bundles that also include custom
  devices and runtime feedback.
- Customize the device database with your own gear, import or export the
  catalog as JSON and revert to the bundled defaults at any time.

### Communicate clearly

- Visualize power and video connections with an interactive diagram: drag,
  zoom, snap to grid and export as SVG or hold Shift to download a JPG
  snapshot.
- Generate rich gear lists that expand project requirements into categorized
  packing tables with accessories, duplicates merged by quantity and tooltips
  for weight and dimensions.

### Stay productive anywhere

- Jump to features, device selectors or help topics with the global search
  field, star favorites to pin go-to devices and type directly inside dropdowns
  to filter instantly.
- Tailor the interface with language detection, dark or playful pink themes,
  high contrast mode, accent color and typography controls.
- Work completely offline thanks to the service worker, persistent storage and a
  force reload button that refreshes cached assets without losing data.

## Quick Start

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. (Optional) Serve the folder over HTTP to enable the service worker and
   Progressive Web App features:
   ```bash
   npx http-server
   # or
   python -m http.server
   ```
   The planner then works fully offline and updates automatically.
4. Create your first project, add devices from the dropdowns and generate a gear
   list or printable overview to share with collaborators.

## Example Workflow

Use the planner end-to-end with the following workflow:

1. **Create or load a project.** Use the project selector to load an existing setup or type a new project name and press Enter (or click **Save**) to start a fresh plan. The active project name appears above the gear list, printable overview and exports.
2. **Add cameras, power and accessories.** Pick devices from the categorized dropdowns. Type-to-filter search boxes, pinned favorites and the global search shortcuts (/ or Ctrl+K / ⌘K) help you jump directly to gear, settings pages or help topics.
3. **Check power draw and runtime.** Watch the power summary panel for current draw warnings, explore the battery comparison view to spot longer-lasting options and use the runtime dashboard to understand how temperature, codec, frame rate and other factors influence user feedback.
4. **Capture project requirements.** Fill out project details, crew lists and required scenarios so the gear list and printable overview reflect the full production context. Fork buttons duplicate entries to speed up data entry.
5. **Share or back up the plan.** Generate the gear list, export a planner backup or download a shareable project bundle before heading to set. Backups include custom devices, runtime feedback and pinned favorites.

## Key Concepts

Understanding the planner's vocabulary makes it easier to explore new features:

### Projects

- Saved plans collect device selections, project requirements, crew lists and
  generated gear lists. The selector stores multiple projects and autosaves
  every change so you can switch between productions without losing your place.

### Devices and accessories

- Device dropdowns contain both bundled hardware and your own custom entries.
  Category tabs match the files in `devices/`, making it simple to update or
  audit the catalog in version control.
- Favorites keep go-to cameras, batteries and accessories at the top of the
  list. They appear in backups and follow the project when you export a bundle.

### Runtime feedback

- User-submitted runtimes are stored with environmental context. Weighted
  averages factor in temperature, codec, resolution, frame rate and each
  component's share of the total draw so estimates mirror real-world shoots.

### Scenarios and gear lists

- Required scenarios (e.g. Vehicle, Outdoor, Steadicam) expand into the
  necessary rigging, weather protection and accessories. Generated gear lists
  combine those presets with your device selections so printouts and shared
  bundles capture the entire kit.

### Backups and recoverability

- Automatic snapshots, manual exports and the **Force reload** button let you
  experiment without fear. Restores create a safety backup before overwriting
  data, and the **Clear Local Cache** option removes everything when you need a
  clean slate.

## Interface Overview

### Top bar controls

- A skip link, offline indicator and responsive branding keep the interface accessible across devices; the offline badge appears whenever the browser loses its connection.
- The global search bar jumps to features, device selectors or help topics—press Enter to navigate to the highlighted result, use / or Ctrl+K (⌘K on macOS) to focus it from anywhere (the side menu opens automatically on small screens), and press Escape or × to clear the query.
- Language, dark mode and pink mode buttons sit alongside the Settings dialog, which exposes accent color, font size, font family, high contrast and custom logo uploads plus backup, restore and Clear Local Cache tools.
- The Help button opens a searchable dialog with step-by-step sections, keyboard shortcuts, FAQs and an optional hover-help mode; it can also be triggered with ?, H, F1 or Ctrl+/ even while typing.
- The Force reload button (🔄) removes cached service worker files and refreshes the app without touching saved projects or device data.

### Navigation and search

- On smaller screens a collapsible side menu mirrors the main sections for quick navigation.
- Every dropdown and editor list includes an inline search box and supports type-to-filter interactions; pressing / or Ctrl+F (⌘F on macOS) focuses the nearest search field.
- Star icons beside selectors let you pin favorite devices so they stay at the top of the list and persist between sessions.

## Customization and Accessibility

- Theme preferences include dark mode, playful pink accents and a dedicated high contrast switch for improved readability.
- Accent color, base font size and typeface can be customised in Settings; choices are applied immediately and remembered with other preferences.
- A keyboard-friendly skip link, focus-visible controls, offline indicator and responsive layout improve navigation on desktops, tablets and phones.
- Built-in keyboard shortcuts cover global search (/ or Ctrl+K/⌘K), help ( ?, H, F1, Ctrl+/ ), saving (Enter or Ctrl+S/⌘S), dark mode (D) and pink mode (P).
- The hover-help toggle turns every button, field, dropdown and header into an on-demand tooltip so new users can learn the interface quickly.

## Gear List

The planner expands your selections into a detailed packing table:

- Click **Generate Gear List** to compile chosen gear and project requirements into a categorized table.
- The list refreshes automatically whenever device selections or project details change.
- Entries are grouped by category (camera, lens, power, monitoring, rigging, grip, consumables, etc.) and duplicates are merged with a count.
- Required cables, rigging and accessories are added automatically for monitors, motors, gimbals, weather scenarios and speciality setups.
- Scenario selections inject matching gear (for example, *Handheld* + *Easyrig* adds a telescopic handle; *Gimbal* supplies the selected gimbal, friction arms and sunshades; *Outdoor* adds spigots, umbrellas and CapIt rain covers; *Vehicle* and *Steadicam* pack in mounts, isolation arms and suction gear where applicable).
- Lens choices note front diameter, weight, minimum focus and rod requirements, and add lens supports and matte box components with warnings for incompatible rod standards.
- Battery rows reflect counts from the power calculator and include a hotswap plate or the selected hotswap device when needed.
- Monitoring preferences provide default monitors for each role and bundle cable sets for every screen.
- The **Project Requirements** form feeds the list:
  - **Project Name**, **Production Company**, **Rental House** and **DoP** appear in the heading of the printed requirements.
  - **Crew** entries capture names, roles and email addresses so contact lists stay attached to each project.
  - **Prep Days** and **Shooting Days** supply schedule notes and, when paired with outdoor scenarios, suggest weather gear.
  - **Required Scenarios** append matching rigging, gimbals and weather protection.
  - **Camera Handle** and **Viewfinder Extension** insert the chosen handle parts or extension brackets.
  - **Matte Box** and **Filter** choices inject the selected system with any needed trays, clamp adapters or filters.
  - **Monitoring Configuration**, **Video Distribution** and **Viewfinder** settings add monitors, cables and overlays for each role.
  - **User Button** selections and **Tripod Preferences** are listed for quick reference.
- Items are sorted alphabetically within their category and each exposes a tooltip on hover.
- The gear list appears in printable overviews and shared project files so collaborators see the full context.
- Gear lists save automatically with the project and are included in shared project files and backups.
- **Delete Gear List** removes the saved list and hides the output.
- Gear list forms use fork buttons to duplicate your entries instantly.

## Runtime Data Weighting

User-submitted battery runtimes are combined using a weighted average to better match your project:

- Entries are adjusted for temperature, scaling from ×1 at 25 °C to ×1.25 at 0 °C, ×1.6 at −10 °C and ×2 at −20 °C.
- Resolution multipliers: ≥12K ×3, ≥8K ×2, ≥4K ×1.5, ≥1080p ×1, lower scaled relative to 1080p.
- Frame rate scales linearly from a base of 24 fps (e.g. 48 fps = ×2).
- Wi‑Fi enabled adds 10 %.
- Codec factors: RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1; ProRes ×1.1; DNx/AVID ×1.2; All‑Intra ×1.3; H.264/AVC ×1.5; H.265/HEVC ×1.7.
- Monitor entries below the specified brightness are weighted by their brightness ratio.
- The final weight reflects how much of the total power draw comes from the camera, monitor and other devices so that similar rigs count more.
- A dedicated dashboard orders entries by weight and shows the share percentage for each runtime entry.

## Install as an App

Cine Power Planner is a Progressive Web App and can be installed for quick
access:

1. Open `index.html` in a supported browser.
2. Use the browser's **Install** or **Add to Home Screen** option.
   - **Chrome/Edge (desktop):** Click the install icon in the address bar.
   - **Android:** Open the browser menu and choose *Add to Home screen*.
   - **iOS Safari:** Tap the share icon and select *Add to Home Screen*.
3. Launch the app from your applications list. The installed version works
   offline and updates automatically.

## Offline Use and Data Storage

When served over HTTP(S), Cine Power Planner installs a service worker that caches all
files so the planner runs entirely offline and pulls updates in the
background. Projects, runtime submissions and preferences (language, theme,
pink mode and saved gear lists) are stored locally via `localStorage` in your
browser. Clearing the site's data in your browser removes all saved
information, and the Settings dialog includes a **Clear Local Cache** button for a one-click reset when you need a fresh start.
See [Backup and Recovery](#backup-and-recovery) for tips on keeping your data safe.

## Backup and Recovery

Cine Power Planner automatically guards against data loss and gives you manual
controls to export your work:

- **Saved project snapshots:** The project selector keeps every setup you save,
  and the app creates timestamped `auto-backup-…` entries every 10 minutes while
  it is open. These snapshots appear at the bottom of the list so you can revert
  to a previous state without overwriting the active project.
- **Full planner backups:** Open **Settings → Backup & Restore** and press
  **Backup** to download `planner-backup.json`. The file includes saved
  projects, custom devices, session state, runtime feedback and favorites via
  the internal `exportAllData()` routine. Restoring the file automatically saves
  a safety copy of your current data before importing the new settings and warns
  when the file was produced with a different app version.
- **Clear Local Cache:** In **Settings → Backup & Restore**, wipe saved projects,
  custom gear, favorites and runtime feedback with one click when you need to
  start over.
- **Regular reminders:** While the planner is running, an hourly background job
  triggers the same backup export so you always have a recent download prompt as
  a reminder to archive your data.

## Privacy and Data Ownership

Cine Power Planner intentionally keeps your data on the devices you control. The
app runs entirely in the browser with no accounts, telemetry or background
sync—projects, runtime submissions, favorites, custom devices, theme settings
and backups stay in your local `localStorage` unless you choose to export them.
Hosting the planner yourself (or loading it directly from disk) lets production
teams work without personal information or gear lists leaving their own
infrastructure.

Because a service worker caches assets for offline use, the only runtime network
requests come from optional resources such as the OpenMoji icon set when a
connection is available. You can clear saved information at any time via
**Settings → Clear Local Cache** or by deleting the site's data in your browser.
Exports produce human-readable JSON so you can review exactly what will be
shared before handing files to collaborators or clients.

## Browser Support

Cine Power Planner relies on modern web APIs and is tested in current versions of Chrome, Firefox, Edge and Safari. Older browsers may lack support for features like installation or offline caching. For the best experience, use a browser with up-to-date Progressive Web App (PWA) capabilities.

## Development

Set up a development environment with Node.js 18 or later. After cloning the repository, run `npm install` once, then use `npm test` to execute ESLint, data consistency checks and Jest tests together while you iterate on changes. See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on proposing updates and working with the dataset.

### File Structure

```
index.html       # Main HTML layout
style.css        # Styles and layout
script.js        # Application logic
devices/         # Default device lists by category
storage.js       # LocalStorage helpers
README.*.md      # Documentation in different languages
checkConsistency.js  # Validates device data
normalizeData.js     # Cleans and unifies device entries
generateSchema.js    # Regenerates schema.json from data
unifyPorts.js        # Harmonizes connector names
tests/               # Jest test suite
```

### Install dependencies and run tests

Requires Node.js 18 or later.

```bash
npm install
npm run lint     # run ESLint alone
npm test
```

`npm run lint` executes ESLint without running tests. The `npm test` command then runs ESLint, data consistency checks and a single Jest invocation that executes every project sequentially. Tests run with `--runInBand` and `maxWorkers=1` to minimise parallel memory usage while still failing fast when an assertion breaks.

To run individual suites while iterating you can target specific Jest projects:

```bash
npm run test:unit   # module-level logic and storage helpers (1 GB heap cap)
npm run test:data   # static dataset validations (1 GB heap cap)
npm run test:dom    # lightweight DOM utilities (1.5 GB heap cap)
npm run test:script # reduced smoke checks for script.js (3 GB heap cap)
```

## Device Data Workflow

The device catalog that powers the planner lives under `devices/`. Each file
groups related equipment (cameras, monitors, power, accessories, etc.) so
changes are easy to review in Git history and within the app. When you edit
these lists, run the helper scripts to clean, verify and rebuild the dataset
before committing:

```bash
npm run normalize
npm run unify-ports
npm run check-consistency
npm run generate-schema
```

`npm run normalize` applies various cleanup routines to unify connector names
and expand shorthand entries. `npm run unify-ports` standardizes connector and
port labels. `npm run check-consistency` confirms that required fields are
present and raises an error if anything is missing. Finally,
`npm run generate-schema` rebuilds `schema.json` from the current data so the
interface reflects your updates.

You can iterate faster with the data-focused Jest project when refining devices:

```bash
npm run test:data
```

Add `--help` to any of the helper commands for detailed usage (for example,
`npm run normalize -- --help`). Review the generated JSON diffs to verify
naming, connector standards and metadata before opening a pull request.

## Troubleshooting

- **Stuck on an old version?** Service workers aggressively cache assets. Click the in-app **Force reload** button, or open your browser's dev tools and perform a hard reload to clear stale files without deleting saved projects.
- **Missing data after closing the tab?** Ensure the site has storage access. Private browsing modes or restrictive tracking protections can prevent `localStorage` from persisting backups, favorites and custom devices.
- **Downloads are blocked?** The browser must be allowed to download multiple files for backups and shareable project bundles. Temporarily disable pop-up blockers or allow multiple downloads when prompted.
- **Command-line scripts failing?** Confirm Node.js 18+ is installed, run `npm install` to fetch dependencies, and rerun the requested npm script. Memory errors usually mean a test suite exceeded its cap—rerun a narrower target such as `npm run test:unit`.

## Feedback and Support

If you run into problems, have questions, or want to suggest new features, please open an issue on GitHub. Community feedback helps improve the planner for everyone.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub. Review [CONTRIBUTING.md](CONTRIBUTING.md) for expectations around dataset updates, translations and testing. Before submitting, run `npm test` to ensure that linting, data consistency checks, and unit tests all pass.

## Acknowledgements

 The planner uses the [OpenMoji](https://openmoji.org/) icon set when a network connection is available and relies on [lz-string](https://pieroxy.net/blog/pages/lz-string/index.html) to compactly store projects in URLs.

## License

Distributed under the ISC license. See `package.json` for details.
