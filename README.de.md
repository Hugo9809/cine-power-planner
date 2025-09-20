# 🎥 Cine Power Planner

Dieses browserbasierte Tool hilft bei der Planung professioneller Kamera-Projekte, die mit V‑Mount-, B‑Mount- oder Gold-Mount-Akkus betrieben werden. Es berechnet **Gesamtleistung**, **Stromaufnahme** (bei 14,4 V und 12 V) sowie die **geschätzte Akkulaufzeit** und prüft gleichzeitig, ob der Akku die benötigte Leistung sicher liefern kann.

Alle Planungen, Eingaben und Exporte bleiben auf deinem Gerät. Spracheinstellungen, Projekte, eigene Geräte, Favoriten und Laufzeit-Feedback liegen im Browser, und Service-Worker-Updates stammen direkt aus diesem Repository. So kannst du die App offline von der Festplatte starten oder intern hosten, damit jede Abteilung dieselbe geprüfte Version nutzt.

---

## 🌍 Sprachen
- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

Die App übernimmt beim ersten Start automatisch die Sprache deines Browsers; über die rechte obere Ecke kannst du jederzeit umschalten. Die Auswahl wird für den nächsten Besuch gespeichert.

---

## 🆕 Neueste Funktionen
- Mit den Akzent- und Typografie-Reglern in den Einstellungen passt du Akzentfarbe, Grundschriftgröße und Schriftfamilie neben den dunklen, rosa und kontrastreichen Themes an.
- Tastenkürzel für die globale Suche lassen dich / oder Strg+K (⌘K auf macOS) drücken, um sie sofort zu fokussieren – auch wenn sie im eingeklappten mobilen Seitenmenü liegt.
- Die Schaltfläche „Neu laden erzwingen“ leert die zwischengespeicherten Service-Worker-Dateien, damit sich die Offline-App aktualisiert, ohne gespeicherte Projekte oder Geräte zu löschen.
- Sternsymbole in jeder Auswahl heften Lieblingskameras, -akkus und -zubehör oben an und nehmen sie in Backups auf.
- Der Workflow **Werkseinstellungen** lädt automatisch eine Sicherung herunter und entfernt danach gespeicherte Projekte, Geräte und Einstellungen.
- Die Geräteliste und die druckbare Übersicht zeigen den Projektnamen für einen schnellen Überblick an.
- Lade ein eigenes Logo hoch, das in druckbaren Übersichten und Backups erscheint.
- Backups enthalten Favoriten und erstellen vor einer Wiederherstellung automatisch eine Sicherung.
- Crew-Einträge besitzen jetzt ein Feld für E-Mail-Adressen.
- Neues High-Contrast-Theme für bessere Lesbarkeit.
- Geräteformulare füllen Kategorien dynamisch anhand der Schema-Attribute.
- Überarbeitetes Interface mit verbessertem Kontrast und Abständen für ein aufgeräumtes Erlebnis auf allen Geräten.
- Projekte lassen sich einfacher teilen: Lade eine JSON-Datei mit Auswahl, Anforderungen, Geräteliste, Laufzeit-Feedback und eigenen Geräten herunter und importiere sie, um alles wiederherzustellen.
- Einzigartige Symbole für verpflichtende Szenarien helfen, Projektanforderungen auf einen Blick zu erkennen.
- Interaktives Projekt-Diagramm zum Verschieben, Zoomen, am Raster ausrichten und als SVG oder JPG exportieren.
- Verspieltes pinkes Akzent-Theme, das zwischen Besuchen erhalten bleibt.
- Durchsuchbarer Hilfedialog mit Schritt-für-Schritt-Bereichen und FAQ; öffne ihn mit ?, H, F1 oder Strg+/.
- Kontextuelle Hover-Hilfen für Schaltflächen, Felder, Dropdowns und Überschriften.
- Globale Suchleiste zum Springen zu Funktionen, Geräteauswahlen oder Hilfethemen.
- Unterstützung für Kameras mit V-, B- oder Gold-Mount-Akkuplatten.
- Reiche Laufzeit-Feedback mitsamt Temperatur ein, um Schätzungen zu verbessern.
- Visuelles Dashboard zur Gewichtung der Laufzeiten zeigt, wie Einstellungen jeden Eintrag beeinflussen, sortiert nach Gewicht mit exakten Prozentwerten.
- Erstelle Gerätelisten, die ausgewählte Komponenten und Projektanforderungen zusammenfassen.
- Speichere Projektanforderungen mit jedem Projekt, damit Gerätelisten den vollen Kontext behalten.
- Dupliziere Benutzereinträge in den Gerätelistenvorlagen per Gabel-Symbol, um Felder sofort zu kopieren.

---

## 🔧 Funktionen

### ✨ Erweiterte Highlights

- **Komplexe Rigs ohne Ratespiel.** Kombiniere Kameras, Batterieplatten,
  Funkstrecken, Monitore, Motoren und Zubehör und sieh Gesamtleistung,
  Stromaufnahme bei 14,4 V/12 V (bzw. 33,6 V/21,6 V bei B‑Mount) sowie
  realistische Laufzeiten aus gewichteten Felddaten. Das Batterie-Vergleichspanel
  warnt vor Überlastungen, bevor falsches Equipment eingepackt wird.
- **Alle Abteilungen im Gleichklang.** Speichere mehrere Projekte mit
  Anforderungen, Crew-Kontakten, Szenarien und Notizen. Druckbare
  Gerätelisten gruppieren Equipment nach Kategorie, führen Duplikate zusammen,
  zeigen technische Metadaten und berücksichtigen Szenario-Zubehör, damit
  Kamera-, Licht- und Grip-Teams denselben Stand sehen.
- **Produktiv überall.** Die App läuft komplett im Browser – öffne
  `index.html` direkt oder liefere sie über HTTPS aus, um den Service Worker zu
  aktivieren. Offline-Caching bewahrt Sprache, Themes, Favoriten und Projekte,
  und die Aktion **Neu laden erzwingen** aktualisiert Assets ohne Datenverlust.
- **Auf das Team zugeschnitten.** Wechsel sofort zwischen Deutsch, Englisch,
  Spanisch, Italienisch und Französisch, passe Schriftgröße und Schriftart an,
  wähle eine eigene Akzentfarbe, lade ein Drucklogo hoch und schalte zwischen
  dunklem, rosa oder High-Contrast-Theme. Tippen-zum-Filtern, angepinnte
  Favoriten, Gabel-Buttons und Hover-Hilfe sparen Zeit am Set.

### ✅ Projektverwaltung
- Speichere, lade und lösche mehrere Kamera-Projekte (drücke Enter oder Strg+S/⌘S zum schnellen Speichern; die Schaltfläche bleibt deaktiviert, bis ein Name eingegeben wurde).
- Alle zehn Minuten entstehen automatisch Schnappschüsse, solange der Planner geöffnet ist; im Einstellungsdialog lassen sich stündliche Backup-Exporte als Erinnerung aktivieren.
- Lade eine JSON-Datei herunter, die Auswahl, Anforderungen, Geräteliste, Laufzeit-Feedback und eigene Geräte bündelt; über den „Geteiltes Projekt“-Picker importierst du alles in einem Schritt.
- Daten werden lokal über `localStorage` gespeichert, Favoriten landen ebenfalls in Backups; nutze die Option **Werkseinstellungen** in den Einstellungen, die vor dem Zurücksetzen automatisch eine Sicherung speichert.
- Erstelle druckbare Übersichten für jedes gespeicherte Projekt und füge ein individuelles Logo hinzu, damit Exporte und Backups zum Produktionsbranding passen.
- Projektanforderungen werden gemeinsam mit dem Projekt gespeichert, sodass Gerätelisten den gesamten Kontext behalten.
- Funktioniert komplett offline dank installiertem Service Worker – Sprache, Theme, Gerätedaten und Favoriten bleiben erhalten.
- Responsives Layout passt sich nahtlos an Desktop, Tablet und Smartphone an.
- Wähle bei kompatiblen Kameras zwischen **V‑Mount**, **B‑Mount** oder **Gold-Mount**; die Akkuliste aktualisiert sich automatisch.

### 🧭 Interface-Überblick
- **Kurzüberblick:**
  - **Globale Suche** (`/` oder `Strg+K`/`⌘K`) springt zu Funktionen, Dropdowns
    oder Hilfethemen – auch wenn das Seitenmenü eingeklappt ist.
  - **Hilfecenter** (`?`, `H`, `F1` oder `Strg+/`) zeigt durchsuchbare Guides,
    FAQ, Tastenkürzel und den optionalen Hover-Hilfemodus.
  - **Projekt-Diagramm** visualisiert Verbindungen; mit gedrückter Umschalttaste
    speicherst du statt SVG ein JPG und siehst Kompatibilitäts-Hinweise.
  - **Batterievergleich** zeigt, wie kompatible Akkus performen und markiert
    Überlastungen frühzeitig.
  - **Gerätelisten-Generator** erstellt kategorisierte Tabellen mit Metadaten,
    Crew-E-Mails und szenarioabhängigen Ergänzungen, die sich sauber drucken
    lassen.
  - **Offline-Badge & Neu laden erzwingen** zeigen den Verbindungsstatus an und
    aktualisieren zwischengespeicherte Dateien, ohne Projekte zu löschen.
- Ein Skip-Link und ein Offline-Indikator halten das Layout für Tastatur und Touch zugänglich; das Badge erscheint, sobald der Browser die Verbindung verliert.
- Die globale Suchleiste springt zu Funktionen, Geräteauswahlen oder Hilfethemen; drücke Enter für das markierte Ergebnis, / oder Strg+K (⌘K auf macOS) zum sofortigen Fokussieren (auf kleinen Displays öffnet sich das Seitenmenü automatisch) und Escape oder × zum Zurücksetzen.
- Oben findest du Sprachumschaltung, Toggles für dunkles und rosa Theme sowie den Einstellungsdialog mit Akzentfarbe, Schriftgröße, Schriftfamilie, High-Contrast-Schalter und Logo-Upload plus Backup-, Restore- und Werkseinstellungen-Werkzeuge, die vor dem Löschen eine Sicherung erstellen.
- Die Hilfe-Schaltfläche öffnet einen durchsuchbaren Dialog mit Schritt-für-Schritt-Anleitungen, Tastenkürzeln, FAQ und optionalem Hover-Hilfemodus; du erreichst ihn auch mit ?, H, F1 oder Strg+/ – selbst während der Eingabe.
- Die Schaltfläche zum Erzwingen einer Aktualisierung (🔄) löscht zwischengespeicherte Service-Worker-Dateien, damit sich die Offline-App erneuert, ohne Projekte oder Geräte zu verlieren.
- Auf kleineren Bildschirmen spiegelt ein einklappbares Seitenmenü alle wichtigen Bereiche für schnellen Zugriff.

### ♿ Anpassung und Barrierefreiheit
- Theme-Optionen umfassen Dunkelmodus, spielerische rosa Akzente und einen eigenen High-Contrast-Schalter für bessere Lesbarkeit.
- Änderungen an Akzentfarbe, Grundschriftgröße und Schriftfamilie greifen sofort und bleiben im Browser gespeichert – ideal für Markenfarben oder Barrierefreiheit.
- Eingebaute Tastenkürzel decken globale Suche (/ oder Strg+K/⌘K), Hilfe ( ?, H, F1, Strg+/ ), Speichern (Enter oder Strg+S/⌘S), Dunkelmodus (D) und Rosa-Modus (P) ab.
- Der Hover-Hilfemodus macht jede Schaltfläche, jedes Feld, Dropdown und jede Überschrift zur Sofort-Hilfe – perfekt für neue Teammitglieder.
- Tippen zum Filtern, sichtbare Fokusmarken und Sternsymbole neben Auswahllisten erleichtern das Durchsuchen langer Listen und das Fixieren von Favoriten.
- Lade ein eigenes Logo für Ausdrucke hoch, konfiguriere Standard-Monitoring-Rollen und passe Vorgaben für Projektanforderungen an, damit Exporte zum Produktionsbranding passen.
- Gabel-Symbole duplizieren Formularzeilen sofort und angepinnte Favoriten halten beliebte Geräte oben in der Liste – ideal für schnelle Eingaben am Set.

### 📋 Geräteliste
Der Generator verwandelt deine Auswahl in eine kategorisierte Packliste:

- Klicke auf **Geräteliste erstellen**, um ausgewähltes Equipment und Projektanforderungen in einer Tabelle zu bündeln.
- Die Tabelle aktualisiert sich automatisch, sobald Geräteauswahl oder Anforderungen wechseln.
- Elemente werden nach Kategorien gruppiert (Kamera, Optik, Strom, Monitoring, Rigging, Grip, Zubehör, Verbrauchsmaterial) und Duplikate zusammengeführt.
- Benötigte Kabel, Rigging und Zubehör für Monitore, Motoren, Gimbals und Wetterszenarien werden automatisch ergänzt.
- Szenario-Auswahlen fügen passendes Equipment hinzu:
  - *Handheld* + *Easyrig* ergänzt einen teleskopischen Griff für stabilen Halt.
  - *Gimbal* fügt das gewählte Gimbal, Magic-Arms, Spigots sowie Sonnenblenden oder Filtersets hinzu.
  - *Outdoor* liefert Spigots, Schirme und CapIt-Regenhauben.
  - Die Szenarien *Vehicle* und *Steadicam* bringen Halterungen, Iso-Arme und Saugnäpfe mit, wo nötig.
- Objektiv-Auswahlen enthalten Frontdurchmesser, Gewicht, Rod-Daten und Mindestfokus, ergänzen Linsensupports und Matte-Box-Adapter und warnen vor inkompatiblen Rod-Standards.
- Akkuzeilen spiegeln die Mengen aus dem Stromrechner und berücksichtigen Hotswap-Platten oder ausgewählte Hotswap-Geräte.
- Monitoring-Präferenzen weisen Standardmonitore für jede Rolle (Regie, DoP, Fokus usw.) mit Kabelsets und Funkempfängern zu.
- Das Formular **Projektanforderungen** speist die Liste:
  - **Projektname**, **Produktion**, **Verleih** und **DoP** erscheinen in der Kopfzeile der gedruckten Anforderungen.
  - **Crew**-Einträge erfassen Namen, Rollen und E-Mail-Adressen, damit Kontaktdaten mit dem Projekt reisen.
  - **Prep-Tage** und **Drehtage** liefern Planungsnotizen und empfehlen bei Außenszenarien Wetter-Equipment.
  - **Verpflichtende Szenarien** fügen passendes Rigging, Gimbals und Wetterschutz hinzu.
  - **Kameragriff** und **Sucher-Erweiterung** tragen die gewählten Komponenten oder Verlängerungen ein.
  - Optionen für **Matte Box** und **Filter** ergänzen das gewünschte System samt nötiger Trays, Clamp-Adapter oder Filter.
  - Einstellungen für **Monitoring**, **Videoverteilung** und **Sucher** fügen Monitore, Kabel und Overlays für jede Rolle hinzu.
  - **User Buttons** und **Stativ-Präferenzen** werden für schnellen Zugriff aufgeführt.
- Innerhalb der Kategorien sind Einträge alphabetisch sortiert und zeigen beim Hover Tooltips an.
- Die Geräteliste ist Teil der druckbaren Übersichten und der exportierten Projektdateien.
- Gerätelisten werden automatisch mit dem Projekt gespeichert und in exportierte Dateien sowie Backups aufgenommen.
- **Geräteliste löschen** entfernt die gespeicherte Liste und blendet die Ausgabe aus.
- In den Formularen stehen Gabel-Schaltflächen bereit, um Benutzereinträge sofort zu duplizieren.

### 📦 Gerätekategorien
- **Kamera** (1)
- **Monitor** (optional)
- **Funk-Transmitter** (optional)
- **FIZ-Motoren** (0–4)
- **FIZ-Controller** (0–4)
- **Distanzsensor** (0–1)
- **Akkuplatte** (nur bei Kameras mit V‑ oder B‑Mount)
- **V‑Mount-Akku** (0–1)

### ⚙️ Stromberechnung
- Gesamtverbrauch in Watt
- Stromstärke bei 14,4 V und 12 V
- Geschätzte Akkulaufzeit in Stunden basierend auf gewichteten Community-Werten
- Benötigte Akkumenge für einen 10-Stunden-Dreh (inkl. Reserve)
- Temperaturhinweis zur Anpassung der Laufzeit bei Hitze oder Kälte

### 🔋 Akkuausgang prüfen
- Warnt, wenn die Stromaufnahme den Akku-Ausgang (Pin oder D‑Tap) übersteigt
- Zeigt an, wenn der Verbrauch in die Nähe des Limits (80 %) rückt

### 📊 Akkuvergleich (optional)
- Vergleicht Laufzeitschätzungen aller Akkus
- Balkendiagramme für einen schnellen Überblick

### 🖼 Projekt-Diagramm
- Visualisiert Strom- und Videosignale der ausgewählten Geräte.
- Warnt, wenn FIZ-Marken nicht kompatibel sind.
- Ziehe Knoten, um das Layout neu zu ordnen, zoome mit den Schaltflächen und exportiere das Diagramm als SVG oder JPG.
- Halte Shift gedrückt, während du auf Download klickst, um ein JPG statt eines SVG zu exportieren.
- Fahre mit der Maus oder tippe auf Geräte, um Popover-Details zu sehen.
- Nutzt [OpenMoji](https://openmoji.org/)-Icons, wenn eine Verbindung besteht, und greift sonst auf Emoji zurück: 🔋 Akku, 🎥 Kamera, 🖥️ Monitor, 📡 Video, ⚙️ Motor, 🎮 Controller, 📐 Distanz, 🎮 Griff und 🔌 Akkuplatte.

### 🧮 Gewichtung der Laufzeitdaten
- Von Nutzenden gemeldete Laufzeiten verfeinern die Schätzung.
- Jeder Eintrag wird temperaturabhängig skaliert – von ×1 bei 25 °C auf:
  - ×1,25 bei 0 °C
  - ×1,6 bei −10 °C
  - ×2 bei −20 °C
- Kameraeinstellungen beeinflussen das Gewicht:
  - Auflösungsfaktoren: ≥12K ×3, ≥8K ×2, ≥4K ×1,5, ≥1080p ×1; niedrigere Werte werden auf 1080p skaliert.
  - Bildrate skaliert linear ab 24 fps (z. B. 48 fps = ×2).
  - Aktiviertes WLAN erhöht das Gewicht um 10 %.
  - Codec-Faktoren: RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1; ProRes ×1,1; DNx/AVID ×1,2; All‑Intra ×1,3; H.264/AVC ×1,5; H.265/HEVC ×1,7.
  - Monitor-Einträge unterhalb der angegebenen Helligkeit werden gemäß ihrem Helligkeitsverhältnis gewichtet.
- Das Endgewicht spiegelt den Anteil jedes Geräts am Gesamtverbrauch wider, sodass passende Projekte stärker zählen.
- Der gewichtete Durchschnitt kommt zum Einsatz, sobald mindestens drei Einträge verfügbar sind.
- Ein Dashboard sortiert die Einträge nach Gewicht und zeigt den prozentualen Anteil für den schnellen Vergleich.

### 🔍 Suche & Filter
- Tippe in Dropdowns, um Einträge schnell zu finden.
- Filtere Gerätelisten über ein Suchfeld.
- Nutze die globale Suche oben, um zu Funktionen, Geräten oder Hilfethemen zu springen; drücke Enter zum Navigieren, / oder Strg+K (⌘K auf macOS) zum sofortigen Fokussieren und Escape oder × zum Löschen.
- Drücke „/“ oder Strg+F (⌘F auf macOS), um das nächstgelegene Suchfeld sofort zu fokussieren.
- Klicke auf den Stern neben einer Auswahl, um Favoriten oben zu pinnen und in Backups mitzunehmen.

### 🛠 Geräte-Datenbank-Editor
- Geräte in allen Kategorien hinzufügen, bearbeiten oder löschen.
- Gesamte Datenbank als JSON importieren oder exportieren.
- Zur Standarddatenbank aus `public/data/index.js` zurückkehren.

### 🌓 Dunkelmodus
- Über die Mondschaltfläche neben dem Sprachmenü umschalten.
- Die Einstellung wird im Browser gespeichert.

### 🦄 Rosa Modus
- Auf den Einhorn-Button klicken (im aktiven Pinkmodus wechseln die Einhorn-Icons alle 30 Sekunden mit einer sanften Pop-Animation und beim Verlassen erscheint wieder das Pferd) oder **P** drücken, um den verspielten rosa Akzent zu aktivieren.
- Funktioniert im hellen und dunklen Theme und bleibt zwischen Besuchen erhalten.

### ⚫ High-Contrast-Modus
- Aktiviert ein kontrastreiches Theme für bessere Lesbarkeit.

### 📝 Laufzeit-Feedback
- Klicke unter der Laufzeit auf <strong>Nutzer-Laufzeit-Feedback senden</strong>, um eigene Messungen hinzuzufügen.
- Optional Temperatur eintragen, um die Gewichtung zu verfeinern.
- Einträge werden im Browser gespeichert und verbessern künftige Schätzungen.
- Ein Dashboard sortiert Beiträge nach Gewicht, zeigt prozentuale Anteile und
  hebt Ausreißer hervor, damit Crews Feedback schneller bewerten können.

### ❓ Durchsuchbare Hilfe
- Über die Schaltfläche <strong>?</strong> oder per <kbd>?</kbd>, <kbd>H</kbd>, <kbd>F1</kbd> oder <kbd>Strg+/</kbd> öffnen.
- Mit dem Suchfeld Themen sofort filtern; die Eingabe wird beim Schließen zurückgesetzt.
- Mit <kbd>Escape</kbd> oder Klick außerhalb des Dialogs schließen.

---

## ▶️ So nutzt du die App
1. **App starten:** Öffne `index.html` in einem modernen Browser – kein Server nötig.
2. **Top-Bar erkunden:** Sprache wechseln, Dunkel- oder Rosa-Theme umschalten, Einstellungen für Akzent und Typografie öffnen und den Hilfedialog mit ? oder Strg+/ starten.
3. **Geräte auswählen:** Wähle über Dropdowns das Equipment je Kategorie; tippe zum Filtern, pinne Favoriten mit dem Stern und lass Szenario-Voreinstellungen Zubehör automatisch ergänzen.
4. **Berechnungen ansehen:** Gesamtverbrauch, Strom und Laufzeit erscheinen, sobald ein Akku gewählt ist; Warnungen markieren überschrittene Grenzen.
5. **Projekte speichern & exportieren:** Benenne und speichere deine Konfiguration, Auto-Backups erstellen Schnappschüsse und die Schaltfläche „Projekt exportieren“ lädt ein JSON-Paket für das Team.
6. **Geräteliste generieren:** Drücke **Geräteliste erstellen**, um Anforderungen in eine kategorisierte Packliste mit Tooltips und Zubehör zu verwandeln.
7. **Gerätedaten verwalten:** Über „Gerätedaten bearbeiten…“ den Editor öffnen, Geräte anpassen, JSON exportieren/importieren oder auf Standardwerte zurücksetzen.
8. **Laufzeit-Feedback senden:** Mit „Nutzer-Laufzeit-Feedback senden“ Messwerte aus der Praxis erfassen und die Gewichtung verbessern.

## 📱 Als App installieren

Der Planner ist eine Progressive Web App und lässt sich direkt aus dem Browser installieren:

- **Chrome/Edge (Desktop):** Auf das Installationssymbol in der Adressleiste klicken.
- **Android:** Browsermenü öffnen und *Zum Startbildschirm hinzufügen* wählen.
- **iOS/iPadOS Safari:** Auf *Teilen* tippen und *Zum Home-Bildschirm* auswählen.

Nach der Installation startet die App vom Startbildschirm, funktioniert offline und aktualisiert sich automatisch.

## 📡 Offline-Nutzung & Datenspeicherung

Beim Ausliefern über HTTP(S) installiert sich ein Service Worker, der alle Dateien cached, sodass Cine Power Planner vollständig offline läuft und Updates im Hintergrund lädt. Projekte, Laufzeit-Einreichungen und Einstellungen (Sprache, Theme, Rosa-Modus, gespeicherte Gerätelisten) liegen im `localStorage` deines Browsers. Das Löschen der Seitendaten entfernt alle Informationen; im Einstellungsdialog gibt es dafür ebenfalls den Workflow **Werkseinstellungen**, der vor dem Leeren automatisch eine Sicherung speichert.
Die Kopfzeile zeigt ein Offline-Badge, sobald die Verbindung wegfällt, und die
Aktion 🔄 **Neu laden erzwingen** aktualisiert gecachte Assets, ohne Projekte
anzutasten.

---

## 🗂️ Verzeichnisstruktur
```bash
index.html                 # Zentrales HTML-Layout
public/styles/style.css       # Styles und Layout
public/styles/overview.css    # Gestaltung der Übersicht
public/styles/overview-print.css # Druck-Styles für die Übersicht
public/scripts/script.js        # Anwendungslogik
public/scripts/storage.js       # Hilfsfunktionen für LocalStorage
public/scripts/static-theme.js  # Gemeinsame Theme-Logik für die Rechtstexte
public/data/index.js       # Standard-Geräteliste
public/data/devices/       # Gerätekataloge nach Kategorie
public/data/schema.json    # Generiertes Schema für Auswahllisten
public/vendor/             # Gebündelte Drittanbieter-Bibliotheken
public/icons/              # App-Symbole für Manifest und Shortcuts
public/legal/              # Offline-Rechtstexte
tools/                     # Skripte zur Datenpflege
tests/                     # Jest-Test-Suite
```
Schriftarten werden lokal über `fonts.css` eingebunden; sind die Assets einmal im Cache, funktioniert die Anwendung komplett offline.

## 🛠️ Entwicklung
Benötigt Node.js 18 oder neuer.

```bash
npm install
npm run lint     # führt nur ESLint aus
npm test         # startet Linting, Datenprüfungen und Jest-Tests
```

Nach Änderungen an den Gerätedaten die normalisierte Datenbank neu erzeugen:

```bash
npm run normalize
npm run unify-ports
npm run check-consistency
npm run generate-schema
```

Mit `--help` zeigen die Skripte weitere Optionen an.

Mit `npm run help` erhältst du eine kurze Übersicht über die Wartungsskripte und ihre empfohlene Reihenfolge.

## 🤝 Mitmachen
Beiträge sind jederzeit willkommen! Eröffne gerne ein Issue oder sende einen Pull Request auf GitHub.
Für Datenkorrekturen helfen Projekt-Backups oder Beispiel-Laufzeiten, damit die Gerätekataloge verlässlich bleiben.
