# 🎥 Kamera-Stromverbrauchs-Planer

Dieses browserbasierte Tool hilft beim Planen professioneller Kamera-Setups mit V‑Mount-Akkus. Es berechnet **Stromverbrauch**, **Stromstärke** (bei 14,4 V und 12 V) sowie die **geschätzte Akkulaufzeit** und prüft, ob der Akku genügend Leistung liefert.

---

## 🌍 Sprachen
- 🇬🇧 English
- 🇩🇪 Deutsch (Standard)
- 🇪🇸 Español
- 🇮🇹 Italiano
- 🇫🇷 Français

Die Sprache kann oben rechts umgeschaltet werden und wird für den nächsten Besuch gespeichert.

---

## 🔧 Funktionen

### ✅ Setup-Verwaltung
- Mehrere Setups speichern, laden oder löschen
- Daten werden lokal im Browser gespeichert (`localStorage`)
- Setups als JSON importieren und exportieren
- Druckbare Übersicht für jedes gespeicherte Setup erstellen
- Funktioniert komplett offline – Sprache, Dark Mode, Setups und Gerätedaten bleiben erhalten
- Bei kompatiblen Kameras eine **B‑ oder V‑Mount-Platte** wählen; die Batterieliste passt sich automatisch an

### 📦 Gerätekategorien
- **Kamera** (1)
- **Monitor** (optional)
- **Videofunk** (optional)
- **FIZ-Motoren** (0–4)
- **FIZ-Controller** (0–4)
- **Distanzsensor** (0–1)
- **Akkuschacht** (nur bei Kameras mit V‑ oder B‑Mount)
- **V‑Mount Akku** (0–1)

### ⚙️ Leistungsberechnung
- Gesamtverbrauch in Watt
- Stromstärke bei 14,4 V und 12 V
- Geschätzte Akkulaufzeit in Stunden

### 🔋 Akku-Leistungsprüfung
- Warnt, wenn die Stromstärke Pin- oder D‑Tap-Grenzen übersteigt
- Hinweis bei 80 % Auslastung

### 📊 Akkuvergleich (optional)
- Laufzeiten aller Akkus vergleichen
- Balkendiagramm zur schnellen Übersicht

### 🖼 Setup-Diagramm
- Visualisiert Strom- und Videosignale der gewählten Geräte
- Warnt bei inkompatiblen FIZ-Marken

### 🔍 Suche & Filter
- Alle Dropdowns und Listen lassen sich über ein Suchfeld filtern
- Durch Tippen im Dropdown schnell Einträge finden

### 🛠 Geräte-Datenbank
- Geräte aller Kategorien hinzufügen, bearbeiten oder löschen
- Gesamte Datenbank als JSON importieren oder exportieren
- Auf Standard-Datenbank aus `data.js` zurücksetzen

### 🌓 Dark Mode
- Über den Mond-Button neben der Sprachwahl umschaltbar
- Einstellung wird im Browser gespeichert

---

## 🎨 Design
- Klare Gestaltung mit blauen Überschriften und grauen Eingabefeldern
- Verwendet Google-Font „Open Sans“
- Responsives Layout für kleine Bildschirme
- Heller und dunkler Modus

---

## ▶️ Nutzung
1. **App starten:** `index.html` in einem modernen Browser öffnen – kein Server nötig
2. **Geräte wählen:** In jeder Kategorie passende Geräte auswählen
3. **Berechnung ansehen:** Gesamtverbrauch, Stromstärke und Laufzeit werden angezeigt
4. **Grenzen prüfen:** Hinweise zeigen, ob der Akku überlastet wird
5. **Setups speichern & laden:** Setups benennen, exportieren/importieren und eine druckbare Übersicht erzeugen
6. **Geräteliste verwalten:** „Gerätedaten bearbeiten…“ öffnet den Editor zum Anpassen oder Zurücksetzen

---

## 🗂️ Dateistruktur
```bash
index.html       # Hauptseite
style.css        # Styles und Layout
script.js        # Logik & Interaktion
data.js          # Standard-Datenbank
storage.js       # Hilfsfunktionen für LocalStorage
README.*.md      # Dokumentation in verschiedenen Sprachen
```
Schriftarten werden über Google Fonts in `index.html` geladen.
Nach dem ersten Laden mit Internetverbindung kann die Anwendung komplett offline genutzt werden.

## 🛠️ Entwicklung
1. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
2. Lint-Prüfung ausführen:
   ```bash
   npm run lint
   ```
3. Tests ausführen:
   ```bash
   npm test
   ```
