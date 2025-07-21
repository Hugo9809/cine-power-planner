# 🎥 Camera Power Consumption Planner / Kamera-Stromverbrauchs-Planer

This is a browser-based tool for planning professional camera setups powered by V-Mount batteries. It calculates **total power consumption**, **current draw** (at 14.4 V and 12 V), and **estimated battery runtime**, while checking whether the battery can safely deliver the required power.

Dies ist ein browserbasiertes Tool zur Planung professioneller Kamera-Setups mit V-Mount-Akkus.  
Es berechnet **Stromverbrauch**, **Stromstärke** (bei 14,4 V und 12 V) sowie die **geschätzte Akkulaufzeit** und prüft, ob der Akku ausreichend Leistung liefern kann.

---

## 🌍 Languages / Sprachen

- 🇬🇧 English (default)
- 🇩🇪 Deutsch
➡️ Language can be changed in the top-right dropdown.
➡️ Sprache oben rechts umschaltbar.
➡️ The selected language is remembered for your next visit.
➡️ Die ausgewählte Sprache bleibt für den nächsten Besuch gespeichert.

---

## 🔧 Features / Funktionen

### ✅ Setup Management / Setup-Verwaltung
- Save, load, and delete multiple camera setups
- All data is stored locally in the browser via `localStorage`
- Import and export setups as JSON files
- Generate a printable overview for any saved setup

- Mehrere Kamera-Setups unter Namen speichern, laden oder löschen
- Alle Daten werden lokal im Browser gespeichert (`localStorage`)
- Setups als JSON-Dateien importieren und exportieren
- Druckbare Übersicht für gespeicherte Setups erzeugen

- Works fully offline – language, dark mode, setups and device data persist between sessions
- Funktioniert vollständig offline – Sprache, Dark Mode, Setups und Gerätedaten bleiben erhalten

### 📦 Device Categories / Gerätekategorien
- **Camera** (1)
- **Monitor** (optional)
- **Wireless Video** (optional)
- **FIZ Motors** (0–4)
- **FIZ Controllers** (0–4)
- **Distance Sensor** (0–1)
- **V-Mount Battery** (0–1)

- **Kamera** (1)
- **Monitor** (optional)
- **Videofunk** (optional)
- **FIZ-Motoren** (0–4)
- **FIZ-Controller** (0–4)
- **Distanzsensor** (0–1)
- **V-Mount Akku** (0–1)

### ⚙️ Power Calculations / Leistungsberechnung
- Total consumption in watts  
- Current draw at 14.4 V and 12 V  
- Estimated battery runtime in hours  

- Gesamtverbrauch in Watt  
- Stromstärke bei 14,4 V und 12 V  
- Geschätzte Akkulaufzeit in Stunden  

### 🔋 Battery Output Check / Akku-Leistungsprüfung
- Warns if current draw exceeds the max output of the battery (Pin or D-Tap)  
- Indicates when current draw is close to the limit (80% usage)  

- Warnung, wenn Stromstärke die maximale Ausgangsleistung des Akkus übersteigt (Pin oder D-Tap)  
- Hinweis, wenn Stromstärke nahe an der Grenze liegt (80% Auslastung)  

### 📊 Battery Comparison (optional) / Akkuvergleich (optional)
- Compare runtime estimates across all batteries  
- Visual bar graph for quick reference  

- Akkulaufzeiten verschiedener Akkus vergleichen  
- Visuelle Balkendarstellung

### 🌓 Dark Mode
- Toggleable via the moon button next to the language selector
- Preference is stored in your browser

- Per Klick auf die Mond-Schaltfläche neben der Sprachwahl aktivierbar
- Einstellung wird im Browser gespeichert

---

## ▶️ How to Use / Nutzung

1.  **Launch App:** Open `index.html` in any modern browser (Chrome, Firefox)
    ➤ Kein Server erforderlich – die App läuft komplett lokal  

2.  **Select Devices** Choose devices from each category using dropdowns  
    “None” means the category is unused in the setup  

3.  **View Calculations** - See total power draw (W)  
    - See current at 14.4 V and 12 V  
    - See estimated runtime when a battery is selected  

4.  **Check Output Limits** - Status indicators show if the battery's output current limit is exceeded  

5.  **Save & Load Setups** - Name and save your current setup
    - Load existing setups from the dropdown
    - Export all setups as JSON
    - Import setups from a JSON file
    - Generate a printable overview of a saved setup

6.  **Manage Device List** - Click “Edit Device Data…” to open the database editor
    - Add new devices or edit/delete existing ones
    - Export full list as JSON
    - **Import Database**: Use the "Import Database" button and select a previously exported JSON file to load device data into the application. This will overwrite existing device data.
    - **Export & Revert**: "Export and Revert to default Database" saves the current data and resets the database to its default state.

---

## 🗂️ File Structure / Dateistruktur

```bash
index.html       # Main HTML layout / Hauptseite
style.css        # Styles and layout / Design
fonts.css       # Embedded fonts
script.js        # Application logic / Logik & Interaktion
data.js          # Default device list / Start-Datenbank
storage.js       # LocalStorage functions / Funktionen für LocalStorage
README.md        # This file / Diese Datei
```

## 🛠️ Development / Entwicklung

### English
1. Install dependencies:
   ```bash
   npm install
   ```
2. Lint the code:
   ```bash
   npm run lint
   ```
3. Run tests (includes linting):
   ```bash
   npm test
   ```

### Deutsch
1. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
2. Lint-Prüfung ausführen:
   ```bash
   npm run lint
   ```
3. Tests ausführen (inklusive Linting):
   ```bash
   npm test
   ```
