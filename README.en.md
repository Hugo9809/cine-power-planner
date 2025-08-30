# 🎥 Camera Power Consumption Planner

This browser based tool helps plan professional camera setups powered by V‑Mount batteries. It calculates **total power consumption**, **current draw** (at 14.4 V and 12 V) and **estimated battery runtime** while checking that the battery can safely supply the required power.

---

## 🌍 Languages
- 🇬🇧 English (default)
- 🇩🇪 Deutsch
- 🇪🇸 Español
- 🇮🇹 Italiano
- 🇫🇷 Français

You can switch the language in the top right corner. The choice is remembered for your next visit.

---

## 🔧 Features

### ✅ Setup Management
- Save, load and delete multiple camera setups
- Data is stored locally via `localStorage`
- Import and export setups as JSON
- Generate a printable overview for any saved setup
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
- Estimated battery runtime in hours

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

### 🔍 Search & Filtering
- Filter every dropdown and device list with a search box
- Type inside dropdowns to quickly find entries

### 🛠 Device Database Editor
- Add, edit or delete devices in all categories
- Import or export the full database as JSON
- Revert to the default database from `data.js`

### 🌓 Dark Mode
- Toggleable via the moon button next to the language selector
- Preference is stored in your browser
- Optional pink accent via the horse/unicorn button
- The help dialog provides searchable instructions and FAQ. Open it with
  ? or the `?`/`H`/`F1` keys and close with Escape or by clicking outside.

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
