# 🎥 Cine Power Planner

Dieses browserbasierte Werkzeug hilft dir bei der Planung professioneller Kamera-Setups mit V‑Mount-, B‑Mount- oder Gold-Mount-Akkus. Es berechnet den **Gesamtverbrauch**, die **Stromaufnahme** (bei 14,4 V und 12 V) sowie die **geschätzte Laufzeit** und prüft gleichzeitig, ob der Akku die benötigte Leistung zuverlässig liefern kann.

Sämtliche Planungen, Eingaben und Exporte bleiben auf deinem Gerät. Spracheinstellungen, Projekte, eigene Geräte, Favoriten und Laufzeit-Feedback werden im Browser gespeichert, und Service-Worker-Updates stammen direkt aus diesem Repository. Du kannst den Planner offline von der lokalen Festplatte öffnen oder intern hosten, damit jede Abteilung dieselbe geprüfte Version nutzt.

## Auf einen Blick

- **Netzwerkfrei planen.** Alle Symbole, Schriften und Hilfsskripte liegen in diesem Repository, sodass du `index.html` direkt
  öffnen und offline arbeiten kannst.
- **Projekte bleiben lokal.** Speicherstände, Laufzeit-Feedback, eigene Geräte, Favoriten und Gerätelisten bleiben auf dem
  Gerät; Backups und teilbare Bundles sind menschenlesbare JSON-Dateien.
- **Updates bewusst steuern.** Der Service Worker aktualisiert sich erst, nachdem du **Neu laden erzwingen** gedrückt hast –
  ideal für Reisen und Drehs mit wenig Verbindung.
- **Mehrstufige Sicherheitsnetze.** Manuelle Speicherungen, Auto-Saves und automatisch erzeugte Zeitstempel-Backups erleichtern
  Wiederherstellungsproben vor dem Dreh.

## Schnellstart

1. Lade das Repository herunter oder klone es und öffne `index.html` in einem modernen Browser.
2. (Optional) Stelle den Ordner lokal bereit (zum Beispiel mit `npx http-server` oder `python -m http.server`), damit sich der
   Service Worker registriert und Assets für den Offline-Betrieb zwischenspeichert.
3. Lade den Planner einmal, schließe den Tab, trenne die Verbindung und öffne `index.html` erneut. Das Offline-Badge sollte
   kurz aufleuchten, während das zwischengespeicherte Interface lädt.
4. Lege ein Projekt an, drücke **Enter** (oder **Strg+S**/`⌘S`) zum Speichern und beobachte das automatische Backup, das nach
   wenigen Minuten im Projektmenü erscheint.
5. Exportiere **Einstellungen → Backup & Wiederherstellung → Backup**, importiere die Datei in einem privaten Browserprofil und
   prüfe, ob Projekte, Favoriten und eigene Geräte vollständig zurückkehren.
6. Übe den Export einer `.cpproject`-Datei und den Import auf einem zweiten Gerät oder Profil, damit die Kette Speichern →
   Teilen → Importieren vor dem Set-Einsatz geprüft ist.

## Zentrale Arbeitsabläufe

- **Rig planen.** Kombiniere Kameras, Platten, Funkstrecken, Monitore, Motoren und Zubehör, während Verbrauchs- und Laufzeitwerte
  sofort mitlaufen.
- **Versionen sichern.** Halte Projekte bewusst fest und lass automatisch Zeitstempel-Backups alle zehn Minuten entstehen.
- **Sicher teilen.** Exportiere `.cpproject`-Bundles, die offline bleiben, beim Import validiert werden und auf Wunsch automatische
  Gear-Regeln enthalten.
- **Alles sichern.** Vollständige Planner-Backups beinhalten Projekte, Favoriten, eigene Geräte, Laufzeitdaten und UI-Präferenzen,
  damit kein Kontext verloren geht.

## Datensicherheit im Offline-Betrieb

- Prüfe regelmäßig die Offline-Bereitschaft: Anwendung laden, Verbindung trennen, aktualisieren und sicherstellen, dass Projekte
  erreichbar bleiben.
- Bewahre redundante Backups auf beschrifteten Datenträgern auf und importiere sie nach jedem Export in einem zweiten Profil.
- Erstelle vor Updates oder größeren Datenänderungen ein manuelles Backup und teste die Wiederherstellung.

---

## 🌍 Sprachen
- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

Beim ersten Start übernimmt die Anwendung automatisch die Sprache deines Browsers. Über das Menü oben rechts kannst du jederzeit umschalten – die Auswahl bleibt für den nächsten Besuch erhalten.

---

## 🆕 Neueste Funktionen
- Akzent- und Typografie-Regler in den Einstellungen erlauben dir Akzentfarbe, Grundschriftgröße und Schriftfamilie sowie die Themes Dunkel, Pink und Hoher Kontrast einstellen.
- Tastenkürzel für die globale Suche setzen den Fokus sofort mit / oder Strg+K (⌘K auf macOS) – selbst wenn es im eingeklappten mobilen Seitenmenü steckt.
- Die Aktion „Neu laden erzwingen" leert zwischengespeicherte Service-Worker-Dateien, damit sich die Offline-Anwendung aktualisiert, ohne Projekte oder Geräte zu löschen.
- Sternsymbole neben jeder Auswahl pinnen Lieblingskameras, ‑akkus und ‑zubehör oben an und nehmen sie in Backups auf.
- Der **Werkseinstellungen**-Workflow lädt automatisch eine Sicherung herunter, bevor gespeicherte Projekte, Geräte und Einstellungen gelöscht werden.
- Geräteliste und druckbare Übersicht zeigen den Projektnamen als schnelle Referenz.
- Lade ein eigenes Logo hoch, das in druckbaren Übersichten und Backups erscheint.
- Backups enthalten Favoriten und erstellen vor jeder Wiederherstellung eine automatische Sicherung.
- Crew-Einträge besitzen jetzt ein Feld für E-Mail-Adressen.
- Neues High-Contrast-Theme für bessere Lesbarkeit.
- Geräteformulare füllen die Kategorien dynamisch anhand der Schema-Attribute aus.
- Überarbeitete Oberfläche mit verbessertem Kontrast und großzügigerem Spacing für ein klares Erlebnis auf jedem Gerät.
- Projekt-Sharing wurde vereinfacht: Lade eine JSON-Datei mit Auswahl, Anforderungen, Geräteliste, Laufzeit-Feedback und eigenen Geräten herunter und importiere sie anschließend, um alles wiederherzustellen.
- Eigene Symbole für verpflichtende Szenarien machen Projektanforderungen auf einen Blick sichtbar.
- Interaktives Projekt-Diagramm zum Verschieben, Zoomen, Einrasten und Exportieren als SVG oder JPG.
- Verspieltes pinkes Akzent-Theme, das zwischen Besuchen erhalten bleibt.
- Durchsuchbarer Hilfedialog mit Schritt-für-Schritt-Bereichen und FAQ; öffne ihn mit ?, H, F1 oder Strg+/.
- Kontextuelle Hover-Hilfe für Schaltflächen, Felder, Dropdowns und Überschriften.
- Globale Suchleiste zum schnellen Sprung zu Funktionen, Geräteselektoren oder Hilfethemen.
- Unterstützung für Kameras mit V-, B- oder Gold-Mount-Akkuplatten.
- Reiche Laufzeit-Feedback inklusive Temperatur ein, um Schätzungen zu verbessern.
- Visuelles Dashboard zur Gewichtung der Laufzeiten zeigt, wie Einstellungen jeden Eintrag beeinflussen – sortiert nach Gewicht mit exakten Prozentangaben.
- Erstelle Gerätelisten, die ausgewählte Geräte und Projektanforderungen bündeln.
- Speichere Projektanforderungen mit jedem Projekt, damit Gerätelisten den vollständigen Kontext behalten.
- Dupliziere Benutzereinträge in den Gerätelistenformularen per Gabelsymbol, um Felder sofort zu kopieren.

---

## 🔧 Funktionen

### ✨ Highlights im Detail

- **Komplexe Rigs ohne Ratespiel bauen.** Kombiniere Kameras, Akkuplatten, Funkstrecken, Monitore, Motoren und Zubehör und verfolge Gesamtverbrauch sowie Stromaufnahme bei 14,4 V/12 V (bzw. 33,6 V/21,6 V bei B‑Mount) mit realistischen Laufzeiten aus gewichteten Felddaten. Das Batterie-Vergleichspanel warnt vor Überlastungen, bevor falsches Equipment eingepackt wird.
- **Alle Gewerke auf Stand halten.** Speichere mehrere Projekte mit Anforderungen, Crew-Kontakten, Szenarien und Notizen. Druckbare Gerätelisten gruppieren Equipment nach Kategorie, führen Duplikate zusammen, zeigen technische Metadaten und berücksichtigen Szenario-Zubehör, damit Kamera-, Licht- und Grip-Teams synchron bleiben.
- **Überall produktiv arbeiten.** Öffne `index.html` direkt oder liefere den Ordner über HTTPS aus, um den Service Worker zu aktivieren. Offline-Caching bewahrt Sprache, Themes, Favoriten und Projekte, und **Neu laden erzwingen** aktualisiert Assets, ohne gespeicherte Daten anzutasten.
- **Planner auf das Team zuschneiden.** Wechsle sofort zwischen Deutsch, Englisch, Spanisch, Italienisch und Französisch, passe Schriftgröße und -familie an, wähle eine eigene Akzentfarbe, lade ein Drucklogo hoch und schalte zwischen hellem, dunklem, pinkem oder kontrastreichem Theme. Tippen-zum-Suchen, angepinnte Favoriten, Duplizieren-Buttons und Hover-Hilfe sparen Zeit am Set.

### ✅ Projektverwaltung
- Speichere, lade und lösche mehrere Kameraprojekte (drücke Enter oder Strg+S/⌘S zum schnellen Speichern; der Button bleibt deaktiviert, bis ein Name eingetragen ist).
- Alle zehn Minuten entstehen automatisch Sicherungsschnappschüsse, solange der Planner geöffnet ist; im Einstellungsdialog lassen sich stündliche Backup-Exporte als Erinnerung aktivieren.
- Lade eine JSON-Datei herunter, die Auswahl, Anforderungen, Geräteliste, Laufzeit-Feedback und eigene Geräte bündelt; über den Import-Picker holst du alles in einem Schritt zurück.
- Die Daten liegen lokal im `localStorage`, Favoriten landen ebenfalls in Backups; die Option **Werkseinstellungen** legt vor dem Zurücksetzen automatisch eine Sicherung ab.
- Erstelle druckbare Übersichten für jedes gespeicherte Projekt und füge ein individuelles Logo hinzu, damit Exporte und Backups zum Produktionsbranding passen.
- Projektanforderungen werden gemeinsam mit dem Projekt gespeichert, sodass Gerätelisten den kompletten Kontext behalten.
- Funktioniert vollständig offline dank installiertem Service Worker – Sprache, Theme, Gerätedaten und Favoriten bleiben erhalten.
- Responsives Layout passt sich nahtlos an Desktop, Tablet und Smartphone an.
- Wähle bei kompatiblen Kameras zwischen **V‑Mount**, **B‑Mount** oder **Gold-Mount**; die Akkuliste aktualisiert sich automatisch.

### 🧭 Interface-Überblick
- **Schnellzugriff:**
  - **Globale Suche** (`/` oder `Strg+K`/`⌘K`) springt zu Funktionen, Selektoren oder Hilfethemen – auch wenn das Seitenmenü eingeklappt ist.
  - **Hilfecenter** (`?`, `H`, `F1` oder `Strg+/`) zeigt durchsuchbare Guides, FAQs, Tastenkürzel und den optionalen Hover-Hilfemodus.
  - **Projekt-Diagramm** visualisiert Verbindungen; halte Umschalt gedrückt, um beim Download ein JPG statt eines SVG zu speichern und Kompatibilitäts-Hinweise zu sehen.
  - **Batterievergleich** zeigt, wie kompatible Packs performen und markiert Überlastungsrisiken frühzeitig.
  - **Gerätelisten-Generator** erstellt kategorisierte Tabellen mit Metadaten, Crew-E-Mails und szenarioabhängigen Ergänzungen – bereit für Druck oder PDF.
  - **Offline-Badge & Neu laden erzwingen** zeigen den Verbindungsstatus und aktualisieren zwischengespeicherte Dateien, ohne Projekte zu löschen.
- Ein Skip-Link und ein Offline-Indikator halten das Layout für Tastatur und Touch zugänglich; das Badge erscheint, sobald der Browser die Verbindung verliert.
- Die globale Suche springt zu Funktionen, Geräteselektoren oder Hilfethemen; drücke Enter für das markierte Ergebnis, / oder Strg+K (⌘K auf macOS) zum sofortigen Fokussieren (auf kleinen Displays öffnet sich das Seitenmenü automatisch) und Escape oder × zum Zurücksetzen.
- Oben findest du Sprachumschaltung, Toggles für dunkles und pinkes Theme sowie den Einstellungsdialog mit Akzentfarbe, Schriftgröße, Schriftfamilie, High-Contrast-Schalter und Logo-Upload plus Backup-, Restore- und Werkseinstellungen-Tools, die vor dem Löschen eine Sicherung anlegen.
- Die Hilfe-Schaltfläche öffnet einen durchsuchbaren Dialog mit Schritt-für-Schritt-Anleitungen, Tastenkürzeln, FAQ und optionalem Hover-Hilfemodus; erreichbar auch mit ?, H, F1 oder Strg+/ – selbst während der Eingabe.
- Die Aktualisieren-Schaltfläche (🔄) löscht zwischengespeicherte Service-Worker-Dateien, damit sich die Offline-Anwendung erneuert, ohne Projekte oder Geräte zu verlieren.
- Auf kleineren Bildschirmen spiegelt ein einklappbares Seitenmenü alle wichtigen Bereiche für schnellen Zugriff.

### ♿ Anpassung & Barrierefreiheit
- Theme-Optionen umfassen Dunkelmodus, spielerische pinke Akzente und einen High-Contrast-Schalter für bessere Lesbarkeit.
- Änderungen an Akzentfarbe, Grundschriftgröße und Schriftfamilie greifen sofort und bleiben im Browser gespeichert – ideal für Markenfarben oder Barrierefreiheit.
- Eingebaute Tastenkürzel decken globale Suche (/ oder Strg+K/⌘K), Hilfe ( ?, H, F1, Strg+/ ), Speichern (Enter oder Strg+S/⌘S), Dunkelmodus (D) und Rosa-Modus (P) ab.
- Der Hover-Hilfemodus macht jede Schaltfläche, jedes Feld, Dropdown und jede Überschrift zur Sofort-Hilfe – perfekt für neue Teammitglieder.
- Tippen zum Filtern, sichtbare Fokusmarken und Sternsymbole neben Auswahllisten erleichtern das Durchsuchen langer Listen und das Fixieren von Favoriten.
- Lade ein individuelles Logo für Ausdrucke hoch, konfiguriere Standard-Monitorrollen und passe Vorgaben für Projektanforderungen an, damit Exporte zum Produktionsbranding passen.
- Gabel-Symbole duplizieren Formularzeilen sofort, und angepinnte Favoriten halten beliebte Geräte oben in der Liste – ideal für schnelle Eingaben am Set.

### 📋 Geräteliste
Der Generator verwandelt deine Auswahl in eine nach Kategorien sortierte Packliste:

- Klicke auf **Geräteliste erstellen**, um ausgewähltes Equipment und Projektanforderungen in einer Tabelle zu bündeln.
- Die Tabelle aktualisiert sich automatisch, sobald Geräteauswahl oder Anforderungen wechseln.
- Einträge werden nach Kategorien gruppiert (Kamera, Optik, Strom, Monitoring, Rigging, Grip, Zubehör, Verbrauchsmaterial) und Duplikate zusammengeführt.
- Benötigte Kabel, Rigging und Zubehör für Monitore, Motoren, Gimbals und Wetterszenarien werden automatisch ergänzt.
- Szenario-Auswahlen ergänzen passendes Equipment:
  - *Handheld* + *Easyrig* ergänzt einen teleskopischen Griff für stabilen Halt.
  - *Gimbal* fügt den gewählten Gimbal, Magic-Arms, Spigots sowie Sonnenblenden oder Filtersets hinzu.
  - *Outdoor* liefert Spigots, Schirme und CapIt-Regenhauben.
  - Die Szenarien *Vehicle* und *Steadicam* bringen Halterungen, Iso-Arme und Saugnäpfe mit, wo nötig.
- Objektiv-Auswahlen listen Frontdurchmesser, Gewicht, Rod-Daten und Mindestfokus, ergänzen Linsensupports und Matte-Box-Adapter und warnen vor inkompatiblen Rod-Standards.
- Akkuzeilen spiegeln die Mengen aus dem Stromrechner und berücksichtigen Hotswap-Platten oder ausgewählte Hotswap-Geräte.
- Monitoring-Präferenzen weisen Standardmonitore für jede Rolle (Regie, DoP, Fokus usw.) mit Kabelsets und Funkempfängern zu.
- Das Formular **Projektanforderungen** liefert die Daten für die Liste:
  - **Projektname**, **Produktion**, **Verleih** und **DoP** erscheinen in der Kopfzeile der gedruckten Anforderungen.
  - **Crew**-Einträge erfassen Namen, Rollen und E-Mail-Adressen, damit Kontaktdaten mit dem Projekt reisen.
  - **Prep-Tage** und **Drehtage** liefern Planungsnotizen und empfehlen bei Außenszenarien Wetter-Equipment.
  - **Verpflichtende Szenarien** fügen passendes Rigging, Gimbals und Wetterschutz hinzu.
  - **Kameragriff** und **Sucher-Erweiterung** tragen die gewählten Komponenten oder Verlängerungen ein.
  - Optionen für **Matte Box** und **Filter** ergänzen das gewünschte System samt nötiger Trays, Clamp-Adapter oder Filter.
  - Einstellungen für **Monitoring**, **Videoverteilung** und **Sucher** fügen Monitore, Kabel und Overlays für jede Rolle hinzu.
  - **User Buttons** und **Stativ-Präferenzen** werden für schnellen Zugriff aufgeführt.
- Innerhalb der Kategorien sind die Einträge alphabetisch sortiert und zeigen beim Hover Tooltips an.
- Die Geräteliste ist Teil der druckbaren Übersichten und der exportierten Projektdateien.
- Gerätelisten werden automatisch mit dem Projekt gespeichert und sowohl in Exporten als auch in Backups abgelegt.
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
- Visualisiert Strom- und Videosignale der ausgewählten Geräte
- Warnt, wenn FIZ-Marken nicht kompatibel sind
- Ziehe Knoten, um das Layout neu zu ordnen, zoome mit den Schaltflächen und exportiere das Diagramm als SVG oder JPG
- Halte Umschalt gedrückt, während du auf Download klickst, um ein JPG statt eines SVG zu exportieren
- Fahre mit der Maus oder tippe auf Geräte, um Popover-Details zu sehen
- Nutzt OpenMoji-Icons, wenn eine Verbindung besteht, und greift sonst auf Emoji zurück: 🔋 Akku, 🎥 Kamera, 🖥️ Monitor, 📡 Video, ⚙️ Motor, 🎮 Controller, 📐 Distanz, 🎮 Griff und 🔌 Akkuplatte

### 🧮 Gewichtung der Laufzeitdaten
- Von Nutzenden gemeldete Laufzeiten verfeinern die Schätzung
- Jeder Eintrag wird temperaturabhängig skaliert – von ×1 bei 25 °C auf:
  - ×1,25 bei 0 °C
  - ×1,6 bei −10 °C
  - ×2 bei −20 °C
- Kameraeinstellungen beeinflussen das Gewicht:
  - Auflösungsfaktoren: ≥12K ×3, ≥8K ×2, ≥4K ×1,5, ≥1080p ×1; niedrigere Werte werden auf 1080p skaliert
  - Bildrate skaliert linear ab 24 fps (z. B. 48 fps = ×2)
  - Aktiviertes WLAN erhöht das Gewicht um 10 %
  - Codec-Faktoren: RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1; ProRes ×1,1; DNx/AVID ×1,2; All‑Intra ×1,3; H.264/AVC ×1,5; H.265/HEVC ×1,7
  - Monitor-Einträge unterhalb der angegebenen Helligkeit werden gemäß ihrem Helligkeitsverhältnis gewichtet
- Das Endgewicht spiegelt den Anteil jedes Geräts am Gesamtverbrauch wider, sodass passende Projekte stärker zählen
- Der gewichtete Durchschnitt kommt zum Einsatz, sobald mindestens drei Einträge verfügbar sind
- Ein Dashboard sortiert die Einträge nach Gewicht und zeigt den prozentualen Anteil für den schnellen Vergleich

### 🔍 Suche & Filter
- Tippe in Dropdowns, um Einträge schnell zu finden
- Filtere Gerätelisten über ein Suchfeld
- Nutze die globale Suche oben, um zu Funktionen, Geräten oder Hilfethemen zu springen; drücke Enter zum Navigieren, / oder Strg+K (⌘K auf macOS) zum sofortigen Fokussieren und Escape oder × zum Löschen
- Drücke „/" oder Strg+F (⌘F auf macOS), um das nächstgelegene Suchfeld sofort zu fokussieren
- Klicke auf den Stern neben einer Auswahl, um Favoriten oben zu pinnen und in Backups mitzunehmen

### 🛠 Geräte-Datenbank-Editor
- Geräte in allen Kategorien hinzufügen, bearbeiten oder löschen
- Gesamte Datenbank als JSON importieren oder exportieren
- Zur Standarddatenbank aus `src/data/index.js` zurückkehren

### 🌓 Dunkelmodus
- Über die Mondschaltfläche neben dem Sprachmenü umschalten
- Die Einstellung wird im Browser gespeichert

### 🦄 Rosa Modus
- Auf den Einhorn-Button klicken (im aktiven Pinkmodus wechseln die Einhorn-Icons alle 30 Sekunden mit einer sanften Pop-Animation und beim Verlassen erscheint wieder das Pferd) oder **P** drücken, um den spielerischen rosa Akzent zu aktivieren
- Funktioniert im hellen und dunklen Theme und bleibt zwischen Besuchen erhalten

### ⚫ High-Contrast-Modus
- Aktiviert ein kontrastreiches Theme für bessere Lesbarkeit

### 📝 Laufzeit-Feedback
- Klicke unter der Laufzeit auf <strong>Nutzer-Laufzeit-Feedback senden</strong>, um eigene Messungen hinzuzufügen
- Optional Temperatur eintragen, um die Gewichtung zu verfeinern
- Einträge werden im Browser gespeichert und verbessern künftige Schätzungen
- Ein Dashboard sortiert Beiträge nach Gewicht, zeigt prozentuale Anteile und hebt Ausreißer hervor, damit Crews Feedback schneller bewerten können

### ❓ Durchsuchbare Hilfe
- Über die Schaltfläche <strong>?</strong> oder per <kbd>?</kbd>, <kbd>H</kbd>, <kbd>F1</kbd> oder <kbd>Strg+/</kbd> öffnen
- Mit dem Suchfeld Themen sofort filtern; die Eingabe wird beim Schließen zurückgesetzt
- Mit <kbd>Escape</kbd> oder Klick außerhalb des Dialogs schließen

---

## ▶️ So nutzt du die Anwendung
1. **Anwendung starten:** Öffne `index.html` in einem modernen Browser – kein Server nötig.
2. **Top-Bar erkunden:** Sprache wechseln, Dunkel- oder Rosa-Theme umschalten, Einstellungen für Akzent und Typografie öffnen und den Hilfedialog mit ? oder Strg+/ starten.
3. **Geräte auswählen:** Wähle über Dropdowns das Equipment je Kategorie; tippe zum Filtern, pinne Favoriten mit dem Stern und lass Szenario-Voreinstellungen Zubehör automatisch ergänzen.
4. **Berechnungen ansehen:** Gesamtverbrauch, Strom und Laufzeit erscheinen, sobald ein Akku gewählt ist; Warnungen markieren überschrittene Grenzen.
5. **Projekte speichern & exportieren:** Benenne und speichere deine Konfiguration, Auto-Backups erstellen Schnappschüsse und die Export-Schaltfläche lädt ein JSON-Paket für das Team, während Import alles wiederherstellt.
6. **Geräteliste generieren:** Drücke **Geräteliste erstellen**, um Anforderungen in eine kategorisierte Packliste mit Tooltips und Zubehör zu verwandeln.
7. **Gerätedaten verwalten:** Über „Gerätedaten bearbeiten…" den Editor öffnen, Geräte anpassen, JSON exportieren/importieren oder auf Standardwerte zurücksetzen.
8. **Laufzeit-Feedback senden:** Mit „Nutzer-Laufzeit-Feedback senden" Messwerte aus der Praxis erfassen und die Gewichtung verbessern.

## 📱 Als Anwendung installieren

Der Planner ist eine Progressive-Web-App und lässt sich direkt aus dem Browser installieren:

- **Chrome/Edge (Desktop):** Auf das Installationssymbol in der Adressleiste klicken.
- **Android:** Browsermenü öffnen und *Zum Startbildschirm hinzufügen* wählen.
- **iOS/iPadOS Safari:** Auf *Teilen* tippen und *Zum Home-Bildschirm* auswählen.

Nach der Installation startet die Anwendung vom Startbildschirm, funktioniert offline und aktualisiert sich automatisch.

## 📡 Offline-Nutzung & Datenspeicherung

Beim Ausliefern über HTTP(S) installiert sich ein Service Worker, der alle Dateien zwischenspeichert, sodass Cine Power Planner vollständig offline läuft und Updates im Hintergrund lädt. Projekte, Laufzeit-Einreichungen und Einstellungen (Sprache, Theme, Rosa-Modus, gespeicherte Gerätelisten) liegen im `localStorage` deines Browsers. Das Löschen der Seitendaten entfernt alle Informationen; im Einstellungsdialog gibt es dafür den Workflow **Werkseinstellungen**, der vor dem Leeren automatisch eine Sicherung speichert. Die Kopfzeile blendet ein Offline-Badge ein, sobald die Verbindung wegfällt, und die Aktion 🔄 **Neu laden erzwingen** aktualisiert gecachte Assets, ohne Projekte anzutasten.

---

## 🗂️ Verzeichnisstruktur
```bash
index.html                 # Zentrales HTML-Layout
src/styles/style.css       # Styles und Layout
src/styles/overview.css    # Gestaltung der Übersicht
src/styles/overview-print.css # Druck-Styles für die Übersicht
src/scripts/script.js        # Anwendungslogik
src/scripts/storage.js       # Hilfsfunktionen für LocalStorage
src/scripts/static-theme.js  # Gemeinsame Theme-Logik für die Rechtstexte
src/data/index.js       # Standard-Geräteliste
src/data/devices/       # Gerätekataloge nach Kategorie
src/data/schema.json    # Generiertes Schema für Auswahllisten
src/vendor/             # Gebündelte Drittanbieter-Bibliotheken
legal/                     # Offline-Rechtstexte
tools/                     # Skripte zur Datenpflege
tests/                     # Jest-Test-Suite
```
Schriftarten werden lokal über `fonts.css` eingebunden; sobald die Assets im Cache liegen, funktioniert die Anwendung komplett offline.

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

`npm run help` liefert eine kompakte Übersicht der Wartungsskripte und ihrer empfohlenen Reihenfolge.

## 🤝 Mitmachen
Beiträge sind jederzeit willkommen! Eröffne gerne ein Issue oder sende einen Pull Request. Für Datenkorrekturen helfen angehängte Projekt-Backups oder Laufzeitbeispiele, damit der Gerätekatalog für alle verlässlich bleibt.
