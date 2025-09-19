# Cine Power Planner

![Cine Power Planner icon](icon.svg)

Cine Power Planner is an offline-capable web application for planning professional camera rigs that run on V‑Mount, B‑Mount or Gold‑Mount batteries. It calculates total power draw, checks that every pack can safely deliver the current you need, estimates realistic runtimes from weighted field data and keeps your crew, scenarios and gear lists together so nothing gets lost between departments.

---

## Highlights

### Plan complex builds without guesswork
- Combine cameras, battery plates, wireless links, monitors, motors and accessories while seeing total wattage, current draw at 14.4 V/12 V (and 33.6 V/21.6 V for B‑Mount) plus expected runtime.
- Compare compatible batteries side-by-side and get warnings when draw exceeds D‑Tap or pin limits.
- Visualize rigs with an interactive diagram that supports drag, zoom, SVG/JPG export and compatibility notices.

### Keep every department aligned
- Save multiple projects with requirements, crew contacts, shooting scenarios and custom notes.
- Generate printable gear lists that group kit by category, merge duplicates, include technical metadata and reflect scenario-driven accessories.
- Share JSON bundles that contain device selections, runtime feedback, gear lists and custom devices for an end-to-end restore.

### Travel-ready and private
- Works entirely in the browser—open `index.html` directly or host the repository over HTTPS to enable the service worker.
- Offline caching keeps language, theme, favorites and projects available everywhere without sending data to external servers.
- Clear the local cache or trigger a force reload to refresh cached assets without touching saved projects.

### Tailor it to your team
- Switch instantly between English, Deutsch, Español, Italiano and Français; the planner remembers the last language used.
- Choose dark, pink or high-contrast themes, set a custom accent color, adjust font size and pick the typeface that suits your stage or accessibility needs.
- Type-to-search dropdowns, pinned favorites and hover help keep busy crews productive on set.

---

## Quick Start

1. Clone or download the repository.
2. Open `index.html` in any modern Chromium, Firefox or Safari browser. No build step is required.
3. Optionally serve the folder over HTTPS to install the service worker for offline updates. Any static file server works (`npx http-server -S` or similar).
4. The app stores data in your browser. Use **Settings → Backup** to export JSON snapshots before switching machines.

---

## Typical Workflow

1. **Create or load a project.** Press Enter or `Ctrl+S` (`⌘S` on macOS) to save quickly. Automatic snapshots run every 10 minutes.
2. **Select your camera, power and accessories.** Dropdowns filter as you type and favorites stay pinned.
3. **Review power results.** Check wattage, draw, battery safety indicators and runtimes in the comparison panel.
4. **Capture requirements.** Record crew roles, shooting days, scenarios and notes so every export carries the right context.
5. **Generate deliverables.** Produce gear lists, printable overviews and shared project bundles, then restore them later with a single upload.

---

## Interface Essentials

- **Global search** (`/` or `Ctrl+K`/`⌘K`) jumps to any feature, selector or help topic—even when the side menu is collapsed.
- **Help center** (`?`, `H`, `F1` or `Ctrl+/`) surfaces searchable guides, FAQs, shortcuts and optional hover help.
- **Project diagram** visualizes connections; hold Shift while downloading to export a JPG snapshot instead of SVG.
- **Battery comparison panel** reveals how each compatible pack performs and highlights overload risks.
- **Gear list generator** turns selections into categorized tables with metadata, crew emails and scenario-driven additions.
- **Offline indicator & force reload** badges show connectivity status and let you refresh cached assets without losing projects.

---

## Data & Export Management

- Projects, settings, gear lists, favorites and custom devices live in `localStorage`; backups and restores keep everything intact.
- The Settings dialog offers hourly backup reminders, manual backups, one-click restore and a **Clear Local Cache** button.
- Shared project files bundle selections, requirements, runtime feedback, gear lists and custom devices for handoff between teams.
- Printable overviews include the project name, production details, optional custom logo and the generated gear list.
- Automatic snapshots run in the background so it is easy to roll back to an earlier state.

---

## Battery & Runtime Intelligence

- Calculates total consumption, required battery counts for 10-hour days and the current draw each connection must supply.
- Warns at 80 % usage and blocks unsafe loads when draw exceeds a battery's continuous or D‑Tap rating.
- Weighted runtime estimates factor in temperature, resolution, frame rate, codec, Wi‑Fi usage, monitor brightness and each device's share of the total draw.
- A runtime dashboard orders feedback by weight, shows contribution percentages and highlights outliers.
- Supports user-submitted feedback to refine estimates for real-world shoots.

---

## Customization & Accessibility

- Toggle dark, pink or high-contrast themes and adjust typography without reloading the page.
- Upload a custom logo for printed overviews, set default monitoring roles and configure project requirement defaults.
- Keyboard-friendly navigation, focus-visible controls and skip links support screen readers and on-set accessibility needs.
- Type-to-search selectors, pinned favorites and fork buttons for gear list rows accelerate repetitive data entry.

---

## Keyboard Shortcuts

| Action | Shortcut |
| --- | --- |
| Focus global search | `/`, `Ctrl+K`, `⌘K` |
| Open help dialog | `?`, `H`, `F1`, `Ctrl+/` |
| Save project | `Enter`, `Ctrl+S`, `⌘S` |
| Toggle dark theme | `D` |
| Toggle pink theme | `P` |
| Force reload | Click the 🔄 icon in the header |

---

## Development

- Install dependencies with `npm install` (used for linting, tests and data scripts—no build step is required).
- Run `npm run lint` and `npm run test` before committing changes. Targeted test suites are available via `npm run test:unit`, `npm run test:data`, `npm run test:dom` and `npm run test:script`.
- Utility scripts include:
  - `npm run check-consistency` to validate device data alignment.
  - `npm run normalize` and `npm run unify-ports` to keep the catalog tidy.
  - `npm run generate-schema` to refresh the device schema.

---

## Translations

Documentation is available in multiple languages, and the app automatically picks your browser language on first load. Switch anytime via the top-right language menu:

- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

Want to help? Follow the [translation guide](docs/translation-guide.md) to add new locales for both the interface and documentation.

---

## Contributing & Support

Bug reports, feature ideas and data corrections are welcome. Open an issue or submit a pull request with as much detail as possible. If you discover incorrect runtimes or missing gear, include the project file or sample data so the catalog stays reliable.

---

## License

Cine Power Planner is released under the ISC License.
