# 🎥 Camera Power Consumption Planner

This browser based tool helps plan professional camera setups powered by V‑Mount batteries. It calculates **total power consumption**, **current draw** (at 14.4 V and 12 V) and **estimated battery runtime** while checking that the battery can safely supply the required power.

---

## 🌍 Languages
- 🇬🇧 English (default)
- 🇩🇪 Deutsch
- 🇪🇸 Español
- 🇮🇹 Italiano
- 🇫🇷 Français

The app automatically uses your browser language on first load, and you can switch the language in the top right corner. The choice is remembered for your next visit.

---

## 🆕 Recent Features
- Interactive setup diagram that lets you drag devices, zoom, snap nodes to a grid and export the layout as SVG or JPG.
- Playful pink accent theme that persists between visits.
- Searchable help dialog with step-by-step sections and a FAQ; open with ?, H, F1 or Ctrl+/.
- Contextual hover help for buttons, fields, dropdowns and headers.
- Support for cameras with both V- and B-Mount battery plates.
- Submit user runtime feedback with temperature for better estimates.
- Visual runtime weighting dashboard to inspect how settings influence each report, now sorted by weight and showing exact share percentages.
- Generate gear lists to compile selected gear and project requirements.

---

## 🔧 Features

### ✅ Setup Management
- Save, load and delete multiple camera setups (press Enter or Ctrl+S to save quickly; the Save button stays disabled until a name is entered)
- Share a setup via link or clear the current configuration
- Data is stored locally via `localStorage`
- Import and export setups as JSON
- Generate a printable overview for any saved setup
- Generate gear lists for selected equipment and project requirements
- Works fully offline – language, dark mode, setups and device data persist
- Choose a **B‑Mount** or **V‑Mount** plate on supported cameras; the battery list adapts automatically

### 📦 Device Categories
- **Camera** (1)
- **Monitor** (optional)
- **Wireless Video** (optional)
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

### 🖼 Setup Diagram
- Visualize power and video connections for the selected devices
- Warns when FIZ brands are incompatible
- Drag nodes to rearrange the layout, zoom with the buttons and download the diagram as SVG or JPG
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
- The final weight reflects each device's share of the total power draw, so matching setups count more.
- The weighted average is used once at least three entries are available.
- A dashboard orders entries by weight and displays each one's share percentage for quick comparison.

### 🔍 Search & Filtering
- Filter every dropdown and device list with a search box
- Type inside dropdowns to quickly find entries

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

### 📝 User Runtime Feedback
- Click <strong>Submit User Runtime Feedback</strong> below the runtime to add your own measurement.
- Optionally include temperature for more accurate weighting.
- Entries are saved in your browser and improve future estimates.

### ❓ Searchable Help
- Open via the <strong>?</strong> button or press <kbd>?</kbd>, <kbd>H</kbd>, <kbd>F1</kbd> or <kbd>Ctrl+/</kbd>.
- Use the search field to filter topics instantly; the query resets when the dialog closes.
- Close with <kbd>Escape</kbd> or by clicking outside the dialog.

---

## 🎨 Design
- Clean layout with blue headings and grey input fields
- Uses Google Fonts "Open Sans"
- Responsive design adapts for small screens
- Separate light and dark themes

---

## ▶️ How to Use
1. **Launch App:** Open `index.html` in any modern browser – no server required
2. **Select Devices:** Choose devices from each category using the dropdowns
3. **View Calculations:** See total draw, current and runtime when a battery is selected
4. **Check Output Limits:** Status indicators show if the battery output is exceeded
5. **Save & Load Setups:** Name and save your setup, export/import them and generate a printable overview
6. **Manage Device List:** Click “Edit Device Data…” to open the editor, modify devices or revert to the defaults
7. **Submit Runtime Data (optional):** Use “Submit User Runtime Feedback” to share your results and improve estimates

## 📱 Install as an App

The planner is a Progressive Web App and can be installed directly from your browser:

- **Chrome/Edge (desktop):** Click the install icon in the address bar.
- **Android:** Open the browser menu and choose *Add to Home Screen*.
- **iOS/iPadOS Safari:** Tap the *Share* button and select *Add to Home Screen*.

Once installed, the app launches from your home screen, works offline and updates itself automatically.

---

## 🗂️ File Structure
```bash
index.html       # Main HTML layout
style.css        # Styles and layout
script.js        # Application logic
data.js          # Default device list
storage.js       # LocalStorage helpers
README.*.md      # Documentation in different languages
```
Fonts are loaded via Google Fonts links in `index.html`.
After the fonts are cached on first load, the application works entirely offline.

## 🛠️ Development
Requires Node.js 18 or later.
1. Install dependencies:
   ```bash
   npm install
   ```
2. Lint the code:
   ```bash
   npm run lint
   ```
3. Run tests:
   ```bash
   npm test
   ```

4. Update device data after edits:
   ```bash
   npm run normalize
   npm run check-consistency
   ```

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request on GitHub.
