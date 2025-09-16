# 🎥 Cine Power Planner

This browser based tool helps plan professional camera projects powered by V‑Mount, B‑Mount or Gold-Mount batteries. It calculates **total power consumption**, **current draw** (at 14.4 V and 12 V) and **estimated battery runtime** while checking that the battery can safely supply the required power.

---

## 🌍 Languages
- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

The app automatically uses your browser language on first load, and you can switch the language in the top right corner. The choice is remembered for your next visit.

---

## 🆕 Recent Features
- Accent and typography controls in Settings let you adjust the accent color, base font size and typeface alongside dark, pink and high contrast themes.
- Keyboard shortcut for the global search lets you press Ctrl+K (⌘K on macOS) to focus the feature search instantly, even when it sits inside the collapsed mobile side menu.
- Force reload button clears cached service worker files so the offline app refreshes without deleting saved projects or devices.
- Star icons in every selector pin favorite cameras, batteries and accessories to the top of the list and keep them in backups.
- Clear local cache button wipes stored projects and settings.
- Gear list and printable overview display the project name for quick reference.
- Upload a custom logo for printed overviews and backups.
- Backups include favorites and create an automatic backup before restore.
- Crew list entries now feature an email field.
- High contrast theme option for improved readability.
- Device forms populate category fields dynamically based on schema attributes.
- Revamped interface design with improved contrast and spacing for a cleaner experience on any device.
- Simplified project sharing – download a JSON project file that bundles selections, requirements, gear lists, runtime feedback and custom devices, then load it to restore the full setup.
- Unique icons for required scenarios to distinguish project requirements.
- Interactive project diagram that lets you drag devices, zoom, snap nodes to a grid and export the layout as SVG or JPG.
- Playful pink accent theme that persists between visits.
- Searchable help dialog with step-by-step sections and a FAQ; open with ?, H, F1 or Ctrl+/.
- Contextual hover help for buttons, fields, dropdowns and headers.
- Global search bar to jump to features, device selectors or help topics.
- Support for cameras with V-, B- or Gold-Mount battery plates.
- Submit user runtime feedback with temperature for better estimates.
- Visual runtime weighting dashboard to inspect how settings influence each report, now sorted by weight and showing exact share percentages.
- Generate gear lists to compile selected gear and project requirements.
- Save project requirements with each project so gear lists retain full context.
- Duplicate user entries in gear list forms using fork buttons to copy fields instantly.

---

## 🔧 Features

### ✅ Project Management
- Save, load and delete multiple camera projects (press Enter or Ctrl+S/⌘S to save quickly; the Save button stays disabled until a name is entered).
- Automatic snapshots are created every 10 minutes while the planner is open, and the Settings dialog can trigger hourly backup exports as a reminder to archive data.
- Download a JSON project file that bundles selections, requirements, gear lists, runtime feedback and custom devices; load it through the Shared Project picker to restore everything in one step.
- Data is stored locally via `localStorage` and favorites are preserved in backups; use the dedicated **Clear Local Cache** button in Settings if you need to wipe cached projects and device edits.
- Generate printable overviews for any saved project and add a custom logo so exports and backups match your production branding.
- Save project requirements along with each project so gear lists retain full context.
- Works fully offline with the installed service worker—language, theme, device data and favorites persist between sessions.
- Responsive layout adapts seamlessly across desktops, tablets and phones.
- Choose **V‑Mount**, **B‑Mount** or **Gold‑Mount** plates on supported cameras; the battery list adapts automatically.

### 🧭 Interface Overview
- A skip link and offline indicator keep the layout accessible on keyboard and touch devices—the badge appears whenever the browser loses its connection.
- The global search bar jumps to features, device selectors or help topics; press Enter to activate the highlighted result, use Ctrl+K (⌘K on macOS) to focus it from anywhere (the side menu opens automatically on small screens) and tap × to clear the query.
- Top bar controls provide language switching, dark and pink theme toggles plus a Settings dialog that exposes accent color, font size, font family, high contrast and custom logo uploads alongside backup, restore and Clear Local Cache tools.
- The Help button opens a searchable dialog with step-by-step sections, keyboard shortcuts, FAQs and an optional hover-help mode; it can also be triggered with ?, H, F1 or Ctrl+/ even while typing.
- The Force reload button (🔄) clears cached service worker files so the offline app updates without deleting saved projects or custom devices.
- On smaller screens a collapsible side menu mirrors every major section for quick navigation.

### ♿ Customization & Accessibility
- Theme preferences include dark mode, playful pink accents and a dedicated high contrast switch for improved readability.
- Accent color, base font size and typeface changes apply instantly and persist in the browser, letting you match studio branding or accessibility needs.
- Built-in keyboard shortcuts cover global search (Ctrl+K/⌘K), help ( ?, H, F1, Ctrl+/ ), saving (Enter or Ctrl+S/⌘S), dark mode (D) and pink mode (P).
- Hover-help mode turns every button, field, dropdown and header into an on-demand tooltip so new users can learn the interface quickly.
- Type-to-search inputs, focus-visible controls and star icons beside selectors let you filter long lists quickly and pin favourite devices to the top.

### 📋 Gear List
The generator turns your selections into a categorized packing list:

- Click **Generate Gear List** to compile chosen gear and project requirements into a table.
- The table updates automatically when device selections or requirements change.
- Items are grouped by category (camera, lens, power, monitoring, rigging, grip, accessories, consumables) and duplicates are merged with counts.
- Required cables, rigging and accessories are added for monitors, motors, gimbals and weather scenarios.
- Scenario selections inject related gear:
  - *Handheld* + *Easyrig* inserts a telescopic handle for stable support.
  - *Gimbal* adds the selected gimbal, friction arms, spigots and sunshades or filter kits.
  - *Outdoor* supplies spigots, umbrellas and CapIt rain covers.
  - *Vehicle* and *Steadicam* scenarios pack in mounts, isolation arms and suction gear where applicable.
- Lens selections append front diameter, weight, rod data and minimum focus, add lens supports and matte box adapters, and warn about incompatible rod standards.
- Battery rows mirror counts from the power calculator and include hotswap plates or chosen hotswap devices when required.
- Monitoring preferences assign default monitors for each role (Director, DoP, Focus, etc.) with cable sets and wireless receivers.
- The **Project Requirements** form feeds the list:
  - **Project Name**, **Production Company**, **Rental House** and **DoP** appear in the heading of the printed requirements.
  - **Crew** entries capture names, roles and email addresses so contact info travels with the project.
  - **Prep Days** and **Shooting Days** supply schedule notes and, when paired with outdoor scenarios, suggest weather gear.
  - **Required Scenarios** append matching rigging, gimbals and weather protection.
  - **Camera Handle** and **Viewfinder Extension** insert the chosen handle parts or extension brackets.
  - **Matte Box** and **Filter** choices inject the selected system with any needed trays, clamp adapters or filters.
  - **Monitoring Configuration**, **Video Distribution** and **Viewfinder** settings add monitors, cables and overlays for each role.
  - **User Button** selections and **Tripod Preferences** are listed for quick reference.
- Items inside each category are sorted alphabetically and display tooltips on hover.
- The gear list is included in printable overviews and shared project files.
- **Save Gear List** stores the current list with the project.
- **Delete Gear List** removes the saved list and hides the output.
- Gear list forms provide fork buttons to duplicate user entries instantly.

### 📦 Device Categories
- **Camera** (1)
- **Monitor** (optional)
- **Wireless Transmitter** (optional)
- **FIZ Motors** (0–4)
- **FIZ Controllers** (0–4)
- **Distance Sensor** (0–1)
- **Battery Plate** (only on cameras that accept V‑ or B‑Mount)
- **V‑Mount Battery** (0–1)

### ⚙️ Power Calculations
- Total consumption in watts
- Current draw at 14.4 V and 12 V
- Estimated battery runtime in hours using weighted user feedback
- Required battery count for a 10 h shoot (incl. spare)
- Temperature note to adjust runtime for hot or cold conditions

### 🔋 Battery Output Check
- Warns if current draw exceeds the battery output (Pin or D‑Tap)
- Indicates when draw is close to the limit (80 % usage)

### 📊 Battery Comparison (optional)
- Compare runtime estimates across all batteries
- Visual bar graph for quick reference

### 🖼 Project Diagram
- Visualize power and video connections for the selected devices
- Warns when FIZ brands are incompatible
- Drag nodes to rearrange the layout, zoom with the buttons and download the diagram as SVG or JPG
- Hold Shift while clicking Download to export a JPG snapshot instead of SVG
- Hover or tap devices to see popup details
- Uses [OpenMoji](https://openmoji.org/) icons when online, falling back to emoji:
  🔋 battery, 🎥 camera, 🖥️ monitor, 📡 video, ⚙️ motor,
  🎮 controller, 📐 distance, 🎮 handle and 🔌 battery plate

### 🧮 Runtime data weighting
- User-submitted battery runtimes refine the runtime estimate.
- Each entry is adjusted for temperature, scaling from ×1 at 25 °C to:
  - ×1.25 at 0 °C
  - ×1.6 at −10 °C
  - ×2 at −20 °C
- Camera settings influence the weight:
  - Resolution multipliers: ≥12K ×3, ≥8K ×2, ≥4K ×1.5, ≥1080p ×1, lower scaled to 1080p
  - Frame rate scales linearly from 24 fps (e.g. 48 fps = ×2)
  - Wi‑Fi enabled adds 10 %
  - Codec factors: RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1; ProRes ×1.1; DNx/AVID ×1.2; All‑Intra ×1.3; H.264/AVC ×1.5; H.265/HEVC ×1.7
  - Monitor entries below the specified brightness are weighted by their brightness ratio
- The final weight reflects each device's share of the total power draw, so matching projects count more.
- The weighted average is used once at least three entries are available.
- A dashboard orders entries by weight and displays each one's share percentage for quick comparison.

### 🔍 Search & Filtering
- Type inside dropdowns to quickly find entries
- Filter device lists with a search box
- Use the global search bar at the top to jump to features, devices or help topics; press Enter to navigate, Ctrl+K (⌘K on macOS) to focus it instantly and × to clear.
- Press '/' or Ctrl+F (⌘F on macOS) to focus the nearest search box instantly.
- Click the star beside any selector to pin favourites so they stay at the top of the list and sync with backups.

### 🛠 Device Database Editor
- Add, edit or delete devices in all categories
- Import or export the full database as JSON
- Revert to the default database from `data.js`

### 🌓 Dark Mode
- Toggle via the moon button next to the language selector.
- Preference is stored in your browser.

### 🦄 Pink Mode
- Click the unicorn button or press **P** for a playful pink accent.
- Works in both light and dark themes and persists between visits.

### ⚫ High Contrast Mode
- Toggle a high contrast theme for improved readability.

### 📝 User Runtime Feedback
- Click <strong>Submit User Runtime Feedback</strong> below the runtime to add your own measurement.
- Optionally include temperature for more accurate weighting.
- Entries are saved in your browser and improve future estimates.

### ❓ Searchable Help
- Open via the <strong>?</strong> button or press <kbd>?</kbd>, <kbd>H</kbd>, <kbd>F1</kbd> or <kbd>Ctrl+/</kbd>.
- Use the search field to filter topics instantly; the query resets when the dialog closes.
- Close with <kbd>Escape</kbd> or by clicking outside the dialog.

---

## ▶️ How to Use
1. **Launch App:** Open `index.html` in any modern browser – no server required.
2. **Explore the Top Bar:** Switch language, toggle dark or pink themes, open Settings for accent and typography options, and start the searchable help dialog with ? or Ctrl+/.
3. **Select Devices:** Choose gear from each category using the dropdowns—type to filter, click the star to pin favourites and let scenario presets fill in accessories automatically.
4. **View Calculations:** See total draw, current and runtime once a battery is selected; warnings highlight when output limits are exceeded.
5. **Save & Share Projects:** Name and save your configuration, auto-backups capture snapshots, and the Share button exports a JSON bundle for collaborators.
6. **Generate Gear Lists:** Press **Generate Gear List** to turn project requirements into a categorized packing list with tooltips and accessory packs.
7. **Manage Device Data:** Click “Edit Device Data…” to open the database editor, modify devices, export/import JSON or revert to the defaults.
8. **Submit Runtime Feedback:** Use “Submit User Runtime Feedback” to record field measurements and refine weighted estimates.

## 📱 Install as an App

The planner is a Progressive Web App and can be installed directly from your browser:

- **Chrome/Edge (desktop):** Click the install icon in the address bar.
- **Android:** Open the browser menu and choose *Add to Home Screen*.
- **iOS/iPadOS Safari:** Tap the *Share* button and select *Add to Home Screen*.

Once installed, the app launches from your home screen, works offline and updates itself automatically.

## 📡 Offline Use & Data Storage

Serving the app over HTTP(S) installs a service worker that caches every file
so Cine Power Planner works fully offline and updates in the background. Projects,
runtime submissions and preferences (language, theme, pink mode and saved gear
lists) live in your browser's `localStorage`. Clearing the site's data in the
browser removes all stored information, and the Settings dialog includes a
**Clear Local Cache** button for the same one-click cleanup.

---

## 🗂️ File Structure
```bash
index.html       # Main HTML layout
style.css        # Styles and layout
script.js        # Application logic
data.js          # Default device list
storage.js       # LocalStorage helpers
README.*.md      # Documentation in different languages
checkConsistency.js  # Verifies required fields in device data
normalizeData.js     # Cleans entries and unifies connector names
generateSchema.js    # Rebuilds schema.json from data.js
unifyPorts.js        # Harmonizes legacy port names
tests/               # Jest test suite
```
Fonts are bundled locally via `fonts.css`, so once the assets are cached the application works entirely offline.

## 🛠️ Development
Requires Node.js 18 or later.

```bash
npm install
npm run lint     # run ESLint alone
npm test         # runs linting, data checks and Jest tests
```

After editing device data, regenerate the normalized database:

```bash
npm run normalize
npm run unify-ports
npm run check-consistency
npm run generate-schema
```

Add `--help` to any of the above scripts for usage details.

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request on GitHub.
