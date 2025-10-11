# Cine Power Planner

![Cine Power Planner icon](src/icons/app-icon.svg)

Cine Power Planner ist eine eigenständige Web-App zum Erstellen, Prüfen und Teilen professioneller Kamera-Strompläne, die dein Gerät niemals verlassen. Plane V‑Mount-, B‑Mount- oder Gold-Mount-Rigs, bewerte Laufzeiten, erfasse Projektanforderungen und exportiere teilbare Pakete – komplett im Browser, sogar offline. Alle Abhängigkeiten liegen in diesem Repository, damit dieselbe Erfahrung auf der Bühne, im Feld oder im Archivlaufwerk funktioniert, ohne nach Hause zu telefonieren.

## Auf einen Blick

- **Offline zuerst planen.** Baue V‑Mount-, B‑Mount- oder Gold-Mount-Setups direkt im Browser. Alle Uicons, Schriften und Hilfsskripte liegen lokal, sodass nichts von externen CDNs oder Netzwerken abhängt. Klone das Repository, zieh das Netzwerkkabel ab und die Oberfläche funktioniert unverändert weiter.
- **Daten bleiben auf dem Gerät.** Projekte, Laufzeit-Feedback, Favoriten, eigene Geräte, Gerätelisten und Einstellungen bleiben lokal. Backups und teilbare Pakete sind menschenlesbare JSON-Dateien, die du kontrollierst.
- **Sicherheitsnetze schnell prüfen.** Manuelle Speicherungen, Hintergrund-Auto-Saves und automatische Zeitstempel-Backups greifen ineinander, damit du den Ablauf Speichern → Backup → Bundle → Wiederherstellen als ersten Schritt üben kannst.
- **Updates bewusst freigeben.** Der Service Worker wartet auf deine Bestätigung, bevor er aktualisiert. Teams bleiben so auf einer geprüften Revision – selbst unterwegs oder bei schwacher Verbindung.

## Überblick

### Entwickelt für Crews

Der Planner entstand für 1st ACs, Data Wrangler und DoPs. Sobald du Bodies, Batterieteller, Funkstrecken und Zubehör ergänzt, aktualisieren sich Gesamtverbrauch und Laufzeiten sofort. Sicherheitswarnungen markieren überlastete Akkus, und Gerätelisten bleiben an die Projektkontexte gebunden, damit beim Handover nichts fehlt.

### Gemacht für Reisen

Öffne `index.html` direkt von der Festplatte oder hoste das Repository intern – ganz ohne Build-Prozess, Server oder Accounts. Ein Service Worker hält die App offline verfügbar, merkt sich jede Einstellung und aktualisiert nur nach deiner Freigabe. Speichern, Teilen, Importieren, Backup und Wiederherstellen laufen immer lokal, damit Benutzerdaten geschützt bleiben.

### Warum Offline-first zählt

Filmsets haben selten garantierte Konnektivität, Studios verlangen häufig luftgetrennte Planungstools. Cine Power Planner liefert identische Fähigkeiten unabhängig vom Netzwerkstatus: Alle Assets sind gebündelt, jeder Workflow läuft lokal und jede Sicherung erzeugt Artefakte für dein Archiv. Diese Abläufe vor dem Dreh zu prüfen gehört zur Checkliste, damit im Einsatz nichts an externe Dienste gebunden ist.

### Funktionssäulen

- **Mit Vertrauen planen.** Berechne Stromaufnahme bei 14,4 V/12 V (und 33,6 V/21,6 V für B‑Mount), vergleiche kompatible Akkus und visualisiere Laufzeiteffekte über ein gewichtetes Feedback-Dashboard.
- **Produktionsbereit bleiben.** Projekte erfassen Geräte, Anforderungen, Szenarien, Crewdetails und Gerätelisten; Auto-Backups, Bundles und gesteuerte Aktualisierungen halten Daten aktuell, ohne Stabilität zu opfern.
- **Arbeiten wie gewohnt.** Spracherkennung, Dark-, Pink- und High-Contrast-Themes, Typografie-Regler, Custom-Logo und Hover-Hilfe machen die Oberfläche on set und in der Vorbereitung zugänglich. Die Hover-Hilfe ergänzt nun automatisch kontextbezogene Beschreibungen für jede Schaltfläche, jedes Feld und jedes Menü, sodass sich jedes Bedienelement auch offline selbst erklärt.

## Grundprinzipien

- **Immer offlinefähig.** Die komplette Anwendung inklusive Icons, Legal-Seiten und Tools liegt im Repository. Öffne `index.html` lokal oder über ein privates Intranet; der Service Worker hält Assets synchron, ohne Online-Zwang.
- **Keine versteckten Datenpfade.** Speichern, Bundles, Importe, Backups und Wiederherstellungen passieren vollständig im Browser. Es verlässt nichts das Gerät, außer du exportierst es bewusst.
- **Redundante Sicherheitsnetze.** Manuelle Saves, Hintergrund-Auto-Saves, periodische Auto-Backups, erzwungene Pre-Restore-Backups und menschenlesbare Exporte sorgen dafür, dass Benutzerdaten nicht verschwinden.
- **Vorhersehbare Updates.** Aktualisierungen greifen nur nach deinem Trigger. Zwischengespeicherte Versionen bleiben verfügbar, bis du **Neu laden erzwingen** bestätigst.
- **Konstante Darstellung.** Gebündelte Uicons, OpenMoji und Typografie-Dateien garantieren identische Optik – egal ob im Studio oder im Feld ohne Netz.
- **Jede Änderung absichern.** Vor jeder Wiederherstellung legt der Planner ein erzwungenes Backup an und bewahrt frühere Revisionen, damit kein Import deine Arbeit überschreibt. Prüfprotokolle und Checksum-Notizen reisen mit jedem Archiv, um die Integrität auch offline nachzuweisen.

## Inhaltsverzeichnis

- [Auf einen Blick](#auf-einen-blick)
- [Überblick](#überblick)
- [Grundprinzipien](#grundprinzipien)
- [Übersetzungen](#übersetzungen)
- [Was ist neu](#was-ist-neu)
- [Schnellstart](#schnellstart)
- [Systemanforderungen & Browser-Support](#systemanforderungen--browser-support)
- [Speicher-, Teil- & Import-Drill](#speicher--teil--import-drill)
- [Täglicher Ablauf](#täglicher-ablauf)
- [Speichern & Projektverwaltung](#speichern--projektverwaltung)
- [Teilen & Importe](#teilen--importe)
- [Projekt- & Backup-Dateiformate](#projekt--backup-dateiformate)
- [Interface-Rundgang](#interface-rundgang)
- [Anpassung & Barrierefreiheit](#anpassung--barrierefreiheit)
- [Datensicherheit & Offline-Betrieb](#datensicherheit--offline-betrieb)
- [Daten- & Speicherübersicht](#daten--speicherübersicht)
- [Speicherbudget & Wartung](#speicherbudget--wartung)
- [Backup & Wiederherstellung](#backup--wiederherstellung)
- [Datenintegritäts-Drills](#datenintegritäts-drills)
- [Operative Checklisten](#operative-checklisten)
- [Notfall-Wiederherstellungsplan](#notfall-wiederherstellungsplan)
- [Gerätelisten & Reporting](#gerätelisten--reporting)
- [Automatische Gear-Regeln](#automatische-gear-regeln)
- [Runtime-Intelligenz](#runtime-intelligenz)
- [Tastenkürzel](#tastenkürzel)
- [Lokalisierung](#lokalisierung)
- [Als App installieren](#als-app-installieren)
- [Gerätedaten-Workflow](#gerätedaten-workflow)
- [Entwicklung](#entwicklung)
- [Fehlerbehebung](#fehlerbehebung)
- [Feedback & Support](#feedback--support)
- [Mitwirken](#mitwirken)
- [Danksagungen](#danksagungen)
- [Lizenz](#lizenz)

## Übersetzungen

Die Dokumentation steht in mehreren Sprachen bereit. Die App erkennt beim ersten Start automatisch die Browsersprache, und du kannst jederzeit über das Sprachmenü oben rechts oder über **Einstellungen** wechseln.

- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

Folge `docs/translation-guide.md` für Details zur Lokalisierung.

## Was ist neu

- **Backup-Vergleiche** – Wähle manuelle Saves oder Auto-Backups, prüfe Diffs, ergänze Vorfallnotizen und exportiere Protokolle, bevor du Änderungen zurückrollst oder Daten an die Post übergibst.
- **Restore-Proben** – Lade komplette Backups oder Projekt-Bundles in eine isolierte Sandbox, um Inhalte gegen Live-Daten zu checken, ohne Produktionsprofile anzurühren.
- **Diagnoseprotokoll-Steuerung** – Öffne **Einstellungen → Daten & Speicher**, sieh dir das laufende Log direkt im Planner an, filtere nach Stufe oder Namespace und passe Aufbewahrung, Konsolenspiegelung, die standardmäßig aktive Konsolenerfassung sowie Fehlererfassung ohne externe Tools an.
- **Backup-Verlaufsprotokoll** – Jeder Vollbackup-Download speichert Zeitstempel und Dateinamen lokal. In **Einstellungen → Daten & Speicher** kannst du die Zählung prüfen oder das Protokoll zusammen mit deinen Archiven exportieren, um Offline-Aufbewahrung nachzuweisen.
- **Automatische Gear-Regeln** – Definiere szenariobasierte Ergänzungen oder Entfernungen mit Import/Export-Kontrollen und zeitgesteuerten Backups.
- **Regelabdeckungs-Dashboard** – Fasse Abdeckungsgrad, doppelte Auslöser, Netto-Zu-/Abgänge, gestapelte Szenarien, Konflikte und ungedeckte Anforderungen direkt in den automatischen Gear-Regeln zusammen, setze Fokus-Filter offline und gib dieselben Einblicke in Exporten und Druckansichten weiter.
- **Daten- & Speicher-Dashboard** – Prüfe gespeicherte Projekte, Gerätelisten, eigene Geräte, Favoriten und Laufzeitfeedback direkt in den Einstellungen und schätze die Backup-Größe.
- **Runtime-Schutzprüfung** – Das Runtime-Bundle protokolliert Prüfergebnisse unter `window.__cineRuntimeIntegrity` und stellt `window.cineRuntime.verifyCriticalFlows()` bereit, damit Teams Speicher-, Teil- und Restore-Pfade sowie die Feedback-Speicherung vor der Abreise bestätigen können.
- **Autosave-Status-Overlay** – Spiegelt die letzte Autosave-Notiz im Einstellungsdialog, damit Teams Hintergrundaktivitäten während Recovery-Drills sehen.
- **Monitoring-sensitiver Gear-Editor** – Blendet zusätzliche Monitor- und Videoverteilungsoptionen nur ein, wenn Szenarien sie verlangen.
- **Akzent- & Typografie-Regler** – Passe Akzentfarbe, Schriftgröße und Schriftart an; Dark-, Pink- und High-Contrast-Themes bleiben zwischen Besuchen erhalten.
- **Global-Search-Kürzel** – `/` oder `Strg+K` (`⌘K` auf macOS) fokussiert sofort die Funktionssuche – auch bei eingeklapptem Menü.
- **Neu laden erzwingen** – Aktualisiere Service-Worker-Assets ohne gespeicherte Projekte oder Geräte zu löschen.
- **Favoriten anpinnen** – Markiere Einträge mit Sternen, damit Lieblingskameras, Akkus und Zubehör oben bleiben und im Backup landen.
- **Werkseinstellungen mit Sicherung** – Automatisches Backup vor jedem Zurücksetzen, damit keine Daten verloren gehen.

Weitere Details findest du in den sprachspezifischen READMEs.

## Schnellstart

Führe diese Checkliste beim ersten Setup oder nach Updates aus. Sie beweist, dass Speichern, Teilen, Import, Backup und Wiederherstellen online wie offline identisch funktionieren.

1. Repository klonen oder herunterladen.
2. `index.html` in einem modernen Browser öffnen.
3. (Optional) Ordner lokal per HTTP(S) bereitstellen, z. B.:
   ```bash
   npx http-server
   # oder
   python -m http.server
   ```
   So installiert sich der Service Worker und wartet auf deine Freigabe, bevor Updates aktiv werden.
4. Planner einmal laden, Tab schließen, Netzwerk trennen (oder Flugmodus aktivieren) und `index.html` erneut öffnen. Das Offline-Badge sollte kurz aufleuchten, während gecachte Assets – inklusive lokal gespeicherter Uicons – geladen werden.
5. **Hilfe → Schnellstart-Checkliste** öffnen und das geführte Tutorial starten. Es führt durch Projektanlage, Gerätekonfiguration, Power-Summary-Kontrolle inklusive Schnellübersichts-Checkpoint sowie die neue Offline-Sicherheitsnetz-Übung, die den oberen Indikator und den Autosave-Status hervorhebt, Gear-Listen, Kontaktverwaltung, eigenes Equipment, automatische Regeln sowie Export/Import und Backups. Schritt-Navigator und Fortschrittsleiste lassen dich abgeschlossene Abschnitte ohne Neustart erneut ansehen; pausierst du zwischendurch, erscheint automatisch **Geführtes Tutorial fortsetzen** mit den gespeicherten Zählungen, damit der Fortschritt offline erhalten bleibt. Zusätzlich blendet die Checklisten-Zeile einen Offline-Status mit erledigten Schritten, dem nächsten Abschnitt und einem Zeitstempel ein, der zeigt, wann der letzte Schritt abgeschlossen wurde, bevor du den Rundgang erneut startest.
6. Erstes Projekt anlegen, **Enter** (oder **Strg+S**/`⌘S`) drücken und im Projektmenü das zeitgestempelte Auto-Backup prüfen, das nach rund 50 protokollierten Änderungen oder spätestens nach zehn Minuten erscheint.
7. **Einstellungen → Backup & Wiederherstellung → Backup** exportieren und die `planner-backup.json` in einem privaten Profil importieren. So stellst du sicher, dass keine Sicherung auf einem Gerät festsitzt und der erzwungene Pre-Restore-Export funktioniert.
8. Projekt-Bundle exportieren (`project-name.json`) und auf einem zweiten Gerät/Profil importieren. Das trainiert die komplette Kette Speichern → Teilen → Importieren und stellt sicher, dass Uicons, Fonts und Scripts offline mitreisen.
9. Verifiziertes Backup und Projekt-Bundle zusammen mit der Repository-Kopie archivieren. Datum, Rechner und Operator protokollieren, damit nachvollziehbar bleibt, wann der Drill erfolgreich war und alle Workflows synchron blieben.
10. Entwicklerkonsole öffnen und einen Screenshot von `window.__cineRuntimeIntegrity` festhalten (oder `window.cineRuntime.verifyCriticalFlows()` erneut ausführen und das Protokoll speichern). So dokumentierst du, dass die Runtime-Wache die Speicher-/Teilen-/Restore-Wege und die Feedback-Speicherung während der Offline-Probe bestätigt hat.

## Systemanforderungen & Browser-Support

- **Moderne Evergreen-Browser.** Validiert mit aktuellen Chromium-, Firefox- und Safari-Versionen. Service Worker, Zugriff auf `localStorage` (Website-Speicher) und persistenter Speicher müssen aktiv sein.
- **Offline-freundliche Geräte.** Laptops/Tablets sollten dauerhaften Speicher erlauben. Starte die App einmal online, damit der Service Worker alle Assets cacht, und übe den Offline-Reload vor der Reise.
- **Ausreichender lokaler Speicher.** Große Produktionen erzeugen viele Projekte, Backups und Gerätelisten. Beobachte den Speicherplatz deines Browserprofils und exportiere regelmäßig auf redundante Medien.
- **Keine externen Abhängigkeiten.** Alle Icons, Fonts und Hilfsskripte liegen im Repository. Kopiere Ordner wie `animated icons 3/` und lokale Uicons mit, damit Optik und Scripts identisch bleiben.

## Speicher-, Teil- & Import-Drill

Dieser kurze Ablauf sollte bei neuen Teammitgliedern, frisch eingerichteten Workstations oder größeren Updates durchgeführt werden. Er zeigt, dass Speichern, Teilen, Import, Backup und Restore ohne Netzwerk funktionieren.

1. **Baseline-Save.** Aktuelles Projekt öffnen, manuell speichern und den Zeitstempel merken. Innerhalb von zehn Minuten sollte ein Auto-Backup erscheinen.
2. **Redundanz-Export.** Planner-Backup und Projekt-Bundle exportieren, ggf. `.cpproject`-Konvention nutzen, auf getrennten Medien sichern.
3. **Restore-Generalprobe.** In einem privaten Profil oder zweiten Gerät Backup importieren, danach das Bundle. Gerätelisten, Dashboards, Regeln und Favoriten prüfen.
4. **Offline-Verifikation.** Im Testprofil Netzwerk trennen, `index.html` neu laden und prüfen, ob Offline-Indikator, Uicons und Hilfsskripte sauber geladen werden.
5. **Diff-Log erfassen.** Zurück im Primärprofil **Einstellungen → Backup & Wiederherstellung → Versionen vergleichen** öffnen, den neuesten manuellen Save und das aktuellste Auto-Backup auswählen, die markierten Änderungen prüfen, Kontext in **Vorfallsnotizen** festhalten und das JSON exportieren. Die Datei gemeinsam mit den Drill-Artefakten ablegen, damit Audits die Historie offline nachvollziehen können.
6. **Archivieren.** Testprofil löschen, Exporte beschriften und in die Produktions-Checkliste aufnehmen.
7. **Runtime protokollieren.** Im Testprofil die Entwicklerkonsole öffnen, `window.__cineRuntimeIntegrity.ok` auf `true` prüfen und bei Bedarf `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` ausführen. Das Ergebnis zusammen mit den Drill-Notizen archivieren und so belegen, dass auch die Feedback-Speicherung geschützt bleibt.

## Täglicher Ablauf

1. **Projekt laden oder erstellen.** Namen eingeben, **Enter** oder **Speichern** drücken – der aktive Name taucht in Listen und Exporten auf.
2. **Geräte hinzufügen.** Kameras, Strom und Zubehör aus kategorisierten Dropdowns wählen. Tippen zum Filtern, Favoriten und der Shortcut `/` (`Strg+K`/`⌘K`) beschleunigen die Auswahl.
3. **Strom & Laufzeit prüfen.** Warnungen beobachten, Akkus vergleichen und das Laufzeit-Dashboard analysieren.
4. **Anforderungen erfassen.** Crew, Szenarien, Handles, Matteboxen und Monitoring eintragen. Fork-Buttons duplizieren Einträge. **Einstellungen → Automatische Gear-Regeln** ergänzen Szenario-spezifische Anpassungen.
5. **Plan exportieren.** Geräteliste generieren, Backup oder Projekt-Bundle herunterladen, bevor es ans Set geht. Backups enthalten eigene Geräte, Laufzeitdaten und Favoriten.
6. **Offline-Bereitschaft bestätigen.** Netzwerk trennen, App neu laden und sicherstellen, dass alles erreichbar bleibt. Bei Abweichungen aus dem letzten Backup wiederherstellen.

## Speichern & Projektverwaltung

- **Manuelle Saves halten Versionen bewusst.** Projektnamen eingeben und **Enter**/**Speichern** drücken. Jede Version bewahrt Geräte, Anforderungen, Listen, Favoriten, Diagramm-Layouts und Laufzeitbeobachtungen.
- **Auto-Saves schützen Fortschritt.** Während ein Projekt aktiv ist, schreibt die App Änderungen im Hintergrund. `auto-backup-…`-Einträge erscheinen alle zehn Minuten oder nach ungefähr 50 protokollierten Änderungen. Beim Projektwechsel, Import, Export oder vor dem Neuladen legt die App zusätzlich sofort eine neue Sicherung an, auch wenn der Takt noch nicht überschritten ist.
- **Quick safeguards sichern sofort.** Öffne **Einstellungen → Daten & Speicher → Quick safeguards**, um ohne Tab-Wechsel ein Vollbackup zu laden oder direkt zum Wiederherstellungsbereich zu springen; jeder Lauf erscheint im Dashboard, damit du die JSON sofort ablegen kannst.【F:index.html†L2548-L2570】
- **Auto-Backups bei Bedarf einblenden.** Über **Einstellungen → Backup & Wiederherstellung → Auto-Backups anzeigen** lassen sich die Zeitstempel im Selector sichtbar machen.
- **Umbenennen erzeugt Duplikate.** Namen ändern und **Enter** drücken erstellt eine Abzweigung – ideal für Vergleichsversionen.
- **Projektwechsel ist verlustfrei.** Auswahl im Menü lädt sofort, Scrollposition und unsaved Inputs werden übernommen.
- **Crew-Kontakte bleiben verfügbar.** Über den Seitenleistenpunkt **Kontakte** pflegst du eine Besetzungsliste mit Rollen,
    E-Mails, Telefonnummern, Websites und Profilfotos, die sich in jedes Projekt übernehmen lässt. Die Kontakte liegen im selben
    localStorage-Snapshot wie deine Projekte, werden in manuelle Backups eingeschlossen und lassen sich bei Bedarf offline aus
    `.vcf`- (vCard-) Dateien zusammenführen. Speichere Crew-Zeilen zurück in die Liste, damit zukünftige Projekte ohne Nachtippen
    auf dem aktuellen Stand bleiben.【F:index.html†L206-L209】【F:index.html†L7345-L7374】【F:src/scripts/app-core-new-1.js†L13632-L17848】
- **Eigenes Equipment bleibt synchron.** Öffne den **Eigenes Equipment**-Dialog, um Namen, Mengen, Notizen und Herkunft deiner
    persönlichen Kits festzuhalten. Die Einträge leben im gleichen Offline-Snapshot wie deine Projekte, greifen in Bedingungen der
    automatischen Gear-Regeln und reisen in manuellen Backups, Projekt-Bundles sowie Quota-Schutzläufen mit, damit kein privates
    Equipment aus dem Planer fällt.【F:index.html†L214-L219】【F:index.html†L6596-L6656】【F:src/scripts/modules/features/own-gear.js†L43-L172】【F:docs/save-share-restore-reference.md†L15-L17】
- **Löschen mit Bestätigung.** Papierkorb-Symbol fragt nach, bevor Einträge entfernt werden.

## Teilen & Importe

- **Projekt-Bundles bleiben leichtgewichtig.** **Projekt exportieren** speichert `project-name.json` mit Projekt, Favoriten und Custom-Geräten. Optional zu `.cpproject` umbenennen und über sichere Kanäle teilen.
- **Automatische Gear-Regeln reisen mit.** Toggle **Automatische Gear-Regeln einschließen** entscheidet, ob Regeln im Bundle landen; beim Import können Teams sie getrennt übernehmen.
- **Importe überschreiben nichts versehentlich.** Trifft ein Bundle auf ein bestehendes Projekt mit identischem Namen, speichert der Planner die neue Kopie als `projektname-imported`, sodass beide Varianten erhalten bleiben.
- **Standalone-Regelimporte validieren offline.** Beim Import von `auto-gear-rules-*.json` prüft der Planner Dateityp, Semver und Zeitstempel, bevor Regeln überschrieben werden. Alte/neue Builds lösen Warnungen aus; bei Fehlern wird der vorherige Snapshot automatisch wiederhergestellt.
- **Restores sind doppelt gepuffert.** Vor jedem Import wird ein Backup des aktuellen Zustands erzwungen. Danach wird das Bundle validiert und oben in der Liste platziert.
- **Cross-Device bleibt offline.** Kopiere `index.html`, `script.js`, `devices/` sowie Backups/Bundles auf Wechseldatenträger, öffne von dort und arbeite ohne Netzwerk.
- **Exporte prüfen.** JSON vor dem Teilen sichten, um unerwünschte Inhalte auszuschließen. Struktur ist lesbar und kann bei Bedarf redigiert werden.
- **Manueller Download sichert Exporte ab.** Wenn Browser oder Content-Blocker den Download verhindern, öffnet der Planner einen "Manual download"-Tab mit dem JSON-Inhalt. Drücke `Strg+A`/`Strg+C` (`⌘A`/`⌘C` auf macOS), füge den Text in eine `.json`-Datei ein und archiviere sie mit deinen Backups, bevor du den Tab schließt.
- **Mit Checklisten synchronisieren.** Bei neuen Bundles `Updated at`-Zeitstempel prüfen und alte JSONs archivieren.
- **Kontext bewahren.** Bundles merken Sprache, Theme, Logos und Personalisierungen, damit Empfänger vertraut starten – auch offline.

## Projekt- & Backup-Dateiformate

- **`project-name.json` (Projekt-Bundle).** Enthält ein Projekt, Favoriten und referenzierte Custom-Geräte. `.cpproject` wird gleich behandelt.
- **`planner-backup.json` (Vollbackup).** **Einstellungen → Backup & Wiederherstellung → Backup** speichert alle Projekte,
  Auto-Backups, Favoriten, Laufzeitfeedback, Regeln, Kontaktlisten, UI-Präferenzen, Fonts und Branding.
- **`auto-gear-rules-*.json` (Regel-Exports).** Zeitgestempelte Sicherungen der Automations-Setups inklusive Metadaten zur Offline-Validierung.

## Interface-Rundgang

### Schnellüberblick

- **Globale Suche** (`/`, `Strg+K`, `⌘K`) springt zu Features, Selektoren oder Hilfethemen – selbst bei versteckter Navigation.
  Vorschläge zeigen direkte Treffer für Funktionen und Geräte vor Hilfethemen, damit Tastaturabläufe zuerst bei Bedienelementen
  landen. Exakte Phrasen landen jetzt zuerst, daher bringt das Tippen einer vollständigen Bezeichnung wie „battery health“ die
  passende Funktion vor allgemeinere Treffer. Leer das Feld, erscheinen zuletzt genutzte Treffer oben und Crew-Routinen lassen
  sich ohne Umwege wiederholen. Beginne eine Suche mit `recent` oder `history`, um zuerst deine zuletzt genutzten Treffer zu
  sehen, bevor der gesamte Katalog geprüft wird.
- **Help-Center** (`?`, `H`, `F1`, `Strg+/`) liefert Guides, Shortcuts, FAQs und Hover-Hilfe. Die Start-hier-Checkliste beschreibt
  jetzt, wie du den Offline-Indikator vorbereitest, doppelte Exporte sicherst und eine Wiederherstellungsprobe durchläufst,
  damit Teams Backups vor dem Einsatz prüfen. Ein Konsolen-Schnellcheck listet
  `window.__cineRuntimeIntegrity`, `window.cineRuntime.verifyCriticalFlows()`
  und die `cinePersistence`-Hilfsfunktionen, damit du Offline-Proben direkt im
  Dialog protokollierst.
- **Projektdiagramm** visualisiert Strom- und Signalpfade; mit gedrückter Umschalttaste als JPG exportieren.
- **Akkuvergleich** zeigt Leistung kompatibler Packs und warnt vor Überlast.
- **Gerätelistengenerator** erstellt kategorisierte Tabellen mit Metadaten, Crew-E-Mails und Szenario-Zubehör.
- **Versionsvergleich** (**Einstellungen → Backup & Wiederherstellung → Versionen vergleichen**) hebt Unterschiede zwischen manuellen Saves oder Auto-Backups hervor, erlaubt Vorfallsnotizen und exportiert Prüfprotokolle vor der Archivierung.
- **Wiederherstellungsprobe** lädt Backups in eine Sandbox, damit du jeden Datensatz offline prüfen kannst, bevor Live-Daten überschrieben werden.
- **Offline-Badge & Neu laden erzwingen** zeigen Verbindungsstatus und aktualisieren Assets ohne Datenverlust.

### Top-Bar-Steuerung

- Skip-Link, Offline-Indikator und responsive Branding halten die Navigation zugänglich.
- Globale Suche fokussiert mit `/` oder `Strg+K` (`⌘K`), öffnet auf Mobilgeräten das Menü und lässt sich mit Escape leeren.
- Sprachwechsel, Dark/Pink-Theme und Einstellungen sitzen in der Kopfleiste; dort lassen sich Akzentfarbe, Schriftgröße, Schriftart, High-Contrast, Custom-Logo sowie Backup-, Restore- und Factory-Reset-Tools (immer mit Sicherung) steuern.
- Hilfe-Button öffnet den Suchdialog und reagiert jederzeit auf `?`, `H`, `F1` oder `Strg+/`.
- Der 🔄-Button entfernt gecachte Assets und lädt die App ohne Projektdaten zu löschen. Der Browser lädt das neue Paket jetzt parallel zur Bereinigung vor, damit die neue Version schneller erscheint und trotzdem alles gesichert bleibt.

### Navigation & Suche

- Auf kleinen Bildschirmen spiegelt ein einklappbares Seitenmenü alle Hauptsektionen.
- Dropdowns und Editorlisten unterstützen Inline-Suche und Tippen zum Filtern. `/` oder `Strg+F` (`⌘F`) fokussiert das nächste Suchfeld.
- Suchvorschläge heben passende Schlüsselwörter hervor, damit du Treffer bestätigst, bevor du weiter navigierst oder Aktionen ausführst.
- Sterne pinnen Favoriten in Selektoren und sichern sie in Backups.

## Anpassung & Barrierefreiheit

- Wechsel zwischen Light, Dark, Pink und High-Contrast; Akzentfarbe, Basis-Schriftgröße und Typografie bleiben offline gespeichert.
- Skip-Link, sichtbare Fokuszustände und responsives Layout unterstützen Tastatur, Tablet und Phone.
- Tastenkürzel decken Suche (`/`, `Strg+K`, `⌘K`), Hilfe (`?`, `H`, `F1`, `Strg+/`), Speichern (`Enter`, `Strg+S`, `⌘S`), Dark Mode (`D`) und Pink Theme (`P`) ab.
- Hover-Hilfe verwandelt Buttons, Felder, Dropdowns und Header in Tooltips.
- Lade ein eigenes Logo für Overviews, setze Monitoring-Defaults und Anforderungspresets.
- Fork-Buttons duplizieren Einträge, Favoriten halten häufige Geräte griffbereit.

## Datensicherheit & Offline-Betrieb

- Service Worker cached alle Assets, Updates warten auf deine Freigabe via **Neu laden erzwingen**.
- Projekte, Laufzeitdaten, Favoriten, Custom-Geräte, Themes und Listen liegen im Browser-Speicher. Unterstützte Browser erhalten Persistenz-Anfragen, um Löschrisiken zu mindern.
- Automatische Sicherungen stapeln Projektsnapshots alle zehn Minuten oder nach rund 50 festgehaltenen Änderungen. Bei Projektwechseln, Importen, Exporten oder vor dem Neuladen erstellt die App zusätzlich sofort eine neue Aufnahme, selbst wenn dieser Takt noch läuft; stündliche Voll-Backups und Hintergrundarchive der Auto-Gear-Regeln ergänzen die Timeline. Aktiviere **Einstellungen → Backup & Wiederherstellung → Auto-Backups in Projektliste anzeigen**, um die Aufbewahrung zu steuern und Snapshots ohne Verbindung wiederherzustellen.
- Blockiert der Browser Downloads, öffnet die App einen Tab **Manueller Download** mit dem JSON, damit du es in eine `.json`-Datei kopierst und auf vertrauenswürdigen Offline-Medien ablegst.
- Nutze **Einstellungen → Backup & Wiederherstellung → Versionen vergleichen**, um zwei Stände zu vergleichen, Kontext in **Vorfallsnotizen** festzuhalten und ein Prüfprotokoll für Übergaben zu exportieren.
- Starte **Wiederherstellungsprobe** in **Einstellungen → Backup & Wiederherstellung**, lade das Backup in eine Wegwerf-Sandbox, prüfe die Vergleichstabelle und bestätige die Integrität, bevor du **Wiederherstellen** auf die Live-Daten anwendest.
- Repository lokal öffnen oder intern hosten, damit sensible Daten nicht nach außen gelangen. Exporte sind menschenlesbar und auditierbar.
- Kopfzeile zeigt Offline-Indikator, Force-Reload aktualisiert Assets ohne Saves anzutasten.
- **Werkseinstellungen** oder das Löschen der Website-Daten erfolgt erst nach einem automatischen Backup.
- Service-Worker-Updates laden im Hintergrund und warten auf deine Bestätigung. Bei **Update bereit**: Änderungen abschließen, Backup erstellen, dann **Neu laden erzwingen**.
- Daten liegen in gehärtetem `localStorage`; gesperrte Profile weichen auf `sessionStorage` aus. Jeder Schreibvorgang legt zusätzlich einen `__legacyMigrationBackup`-Schnappschuss an, damit sich Quota- oder Schemafehler verlustfrei beheben lassen. Entwickler-Tools können Rohdaten exportieren, bevor Caches geleert oder Tests gefahren werden.
- Ein kritischer Speicherwächter läuft bei jedem Start und spiegelt jeden wichtigen Schlüssel in sein Backup, bevor du Änderungen vornimmst. So bleibt auch bei Legacy-Daten stets eine redundante Kopie für Wiederherstellungen erhalten.

## Daten- & Speicherübersicht

- **Einstellungen → Daten & Speicher** listet gespeicherte Projekte, Auto-Backups, Gerätelisten, Custom-Geräte, Favoriten, Laufzeitfeedback und Session-Cache mit Live-Zahlen.
- Einträge erklären ihre Inhalte; leere Bereiche bleiben verborgen, damit du den Zustand sofort siehst.
- Die Übersicht schätzt die Backup-Größe basierend auf dem jüngsten Export.
- Das **Diagnoseprotokoll** spiegelt alle cineLogging-Einträge, erlaubt Filter nach Schweregrad oder Namespace und bietet Regler für Aufbewahrung, Konsolenspiegelung, die standardmäßig aktivierte Konsolenerfassung sowie globale Fehlererfassung – direkt offline in den Einstellungen. Ein Hinweis erscheint, sobald Filter alle Einträge ausblenden, damit Prüfungen nicht versehentlich als Fehler gewertet werden. Jeder Eintrag vermerkt jetzt ISO-Zeitstempel, Millisekundenmarke, Ereignis-ID und Kanal, damit du Konsolen-Fallbacks selbst dann mit den gespeicherten Diagnosen abgleichen kannst, wenn der strukturierte Logger fehlt. Warnungen und Fehler aus Übersichts-Drucken sowie PDF-Exporten landen nun ebenfalls hier – inklusive Hinweis, ob das Fallback-Fenster anspringen musste –, damit Freigabeproben den kompletten Ablauf nachvollziehen.
- Vollbackups zeigen ihre aktuelle Anzahl und speisen das Backup-Protokoll, damit du vor dem Archivieren kontrollieren kannst, ob die stündlichen Sicherungen erfasst wurden.

## Speicherbudget & Wartung

- **Persistenten Speicher prüfen.** Auf jeder Workstation den Status unter **Einstellungen → Daten & Speicher** kontrollieren. Bei Ablehnung häufiger exportieren.
- **Quota im Blick behalten.** Speicher-Dashboard oder Browser-Inspector nutzen. Bei wenig Platz ältere Backups archivieren, `auto-backup-…`-Einträge bereinigen und neue Exporte testen.
- **Caches nach Updates vorbereiten.** Nach **Neu laden erzwingen** Hilfe-Dialog, Legal-Seiten und häufig genutzte Ansichten öffnen, damit Uicons, OpenMoji und Fonts erneut lokal vorliegen.
- **Speicherstatus dokumentieren.** Checks in Prep- und Wrap-Logs aufnehmen: Persistenz-Status, freier Speicher, Speicherort der aktuellen Backups.

## Backup & Wiederherstellung

- **Gespeicherte Projektsnapshots** – Projektliste speichert alle Saves und erzeugt alle zehn Minuten oder nach rund 50 Änderungen `auto-backup-…`.
- **Vollbackups** – **Einstellungen → Backup & Wiederherstellung → Backup** erstellt `planner-backup.json` inkl. aller Projekte, Geräte, Regeln und UI-States; vor jeder Wiederherstellung wird ein Sicherheitsbackup angelegt.
- **Quick safeguards-Bereich** – In **Einstellungen → Daten & Speicher** steht ein eigener **Quick safeguards**-Block für Ein-Klick-Backups oder den Sprung zu Restore-Tools bereit, damit zusätzliche Kopien ohne Kontextwechsel entstehen.【F:index.html†L2548-L2570】
- **Backup-Verlauf** – Jede Vollsicherung schreibt einen Eintrag, der sich in **Einstellungen → Daten & Speicher** prüfen oder zusammen mit dem Archiv exportieren lässt. Zeitstempel und Dateinamen bleiben so auch offline nachvollziehbar.
- **Verborgene Migrations-Backups** – Vor Überschreibungen wird der vorige JSON-Snapshot im geschützten `__legacyMigrationBackup` abgelegt und bei Fehlern automatisch wiederhergestellt. Die Komprimierung wählt jetzt automatisch die kleinste sichere Kodierung, damit Sicherungen weiterhin in das Browser-Kontingent passen. Quotawiederherstellungsdurchläufe komprimieren nun zuerst die größten gespeicherten Einträge, um schneller Platz zu schaffen, ohne aktive Backups anzutasten.【F:src/scripts/storage.js†L1541-L1652】
- **Automatische Regel-Snapshots** – Änderungen in **Automatische Gear-Regeln** erzeugen alle zehn Minuten Sicherheitskopien.
  Der Aufbewahrungsregler startet jetzt bei 36 Sicherungen, damit Teams mehr Puffer
  haben, bevor ältere Einträge entfernt werden.
- **Factory Reset** – löscht Daten erst nach automatischem Backup.
- **Stündliche Erinnerungen** – Hintergrundroutine fordert stündlich zu Backups auf.
- **Runtime-Integritätswache** – Vor Abfahrt in der Konsole `window.__cineRuntimeIntegrity.ok` auf `true` prüfen oder `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` ausführen. Der Bericht bestätigt, dass Speichern/Teilen/Wiederherstellen und die Feedback-Speicherung offline geschützt sind.
- **Verifikation** – Nach jedem kritischen Backup Import in einem Testprofil prüfen.
- **Sichere Aufbewahrung** – Backups mit Projektname/Zeitstempel beschriften und auf redundanten Medien lagern.
- **Vor Überschreiben vergleichen** – Vor Restores frisches Backup ziehen und Unterschiede prüfen.

## Datenintegritäts-Drills

- **Pre-Flight (täglich/vor größeren Änderungen).** Manuell speichern, Backup und Bundle exportieren, in Testprofil importieren, prüfen, löschen.
- **Offline-Probe (wöchentlich/vor Reisen).** Planner laden, Backup erstellen, offline gehen, `index.html` neu laden und auf klare Assets achten.
- **Change-Control (nach Daten-/Script-Updates).** `npm test` laufen lassen und danach Pre-Flight wiederholen; Backup mit Changelog archivieren.
- **Monatlicher Help-Center-Check (integrierte Checkliste).** **Hilfe → Monatlicher Daten-Gesundheitscheck** öffnen, über **Einstellungen → Daten & Speicherung → Schnelle Schutzmaßnahmen → Vollständiges Backup herunterladen** ein frisches Abbild sichern, alle aktiven Projekte exportieren, offline neu laden, mit **Wiederherstellungsprobe** abschließen, anschließend `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` ausführen und die Konsolenausgabe zusammen mit dem Ergebnis im Rotationsprotokoll festhalten.
- **Redundanz-Rotation (monatlich/vor Archivierung).** Neueste Backups, Bundle (ggf. `.cpproject`) und Repository-ZIP auf zwei Medien lagern und abwechselnd testen.

## Operative Checklisten

Print-freundliche Versionen findest du in `docs/operations-checklist.md`; der Travel-Guide `docs/offline-readiness.md` vertieft die Abläufe.

### Pre-Shoot-Readiness

1. Richtige Repository-Version prüfen, **Neu laden erzwingen**, Version in **Einstellungen → Info** vergleichen, Legal-Seiten öffnen um Uicons/OpenMoji/Fonds zu cachen.
2. Kritische Projekte und aktuelles `auto-backup-…` öffnen, Gearlisten, Feedback und Favoriten prüfen.
3. Änderung vornehmen, `Enter` oder `Strg+S`/`⌘S` speichern, `planner-backup.json` exportieren, in Testprofil importieren und Liste vergleichen.
4. `project-name.json` exportieren, importieren, Regeln/Custom-Geräte/Offline-Badge prüfen, Profil löschen.
5. Netzwerk trennen, Offline-Badge prüfen, Icons betrachten, Projekte öffnen.
6. Verifizierte Backups/Bundles plus Repository-ZIP redundant sichern.

### Wrap-Day-Handoff

1. Letztes Backup und Bundle exportieren, mit Datum/Ort/Unit beschriften.
2. Im Verifikationsgerät importieren und auf Fehler prüfen, Gerät offline halten.
3. Änderungen dokumentieren (welche Auto-Backups befördert wurden, neue Geräte, Regeländerungen) und den Notizen beilegen.
4. Nach Archivierung **Neu laden erzwingen**, Hilfe-Dialog und Legal-Seiten öffnen, damit Caches aktuell sind.
5. Redundante Medien an Storage-Team übergeben und zweiten Satz gemäß Datenrichtlinie aufbewahren.

## Notfall-Wiederherstellungsplan

1. **Stoppen und Zustand sichern.** Tab offen lassen, Netzwerk trennen, Zeit und Offline-Status notieren, nicht neu laden.
2. **Vorhandenes exportieren.** **Einstellungen → Backup & Wiederherstellung → Backup** auslösen und `planner-backup.json` sichern – enthält Auto-Backups, Favoriten, Laufzeitdaten und Regeln.
3. **Auto-Backups duplizieren.** `auto-backup-…`-Einträge einblenden, jüngste Snapshots zu manuellen Saves hochstufen und mit Incident-ID versehen.
4. **Verifikations-Bundle prüfen.** Letztes gutes Bundle (`project-name.json`/`.cpproject`) in privatem Profil oder zweitem Gerät offline importieren und Daten vergleichen.
5. **Sorgfältig wiederherstellen.** Wenn Verifikation passt, frisches Backup im Hauptprofil importieren. Vorheriges Backup bleibt für JSON-Diff-Vergleiche erhalten.
6. **Caches erneuern & dokumentieren.** Danach **Neu laden erzwingen**, Hilfe- und Legal-Seiten öffnen, Vorfall protokollieren (Zeit, Exporte, Speicherorte, Prüfgerät) und Log zum Backup legen.

## Gerätelisten & Reporting

- **Geräteliste erzeugen** wandelt Auswahl und Anforderungen in kategorisierte Tabellen um; Aktualisierung erfolgt automatisch bei Änderungen.
- Einträge gruppieren nach Kategorie, Duplikate werden zusammengeführt. Szenarien ergänzen passende Rigs, Wetter- oder Spezialzubehör.
- Automatische Regeln laufen nach dem Generator und fügen szenariospezifische Anpassungen hinzu.
- Abdeckungsnotizen aus dem Regel-Dashboard erscheinen in Druckansichten, Exporten und Bundles, damit Offline-Reviews identisch zum In-App-Status bleiben.
- Objektivreihen enthalten Frontdurchmesser, Gewicht, Naheinstellgrenze, Rod-Anforderungen und Mattebox-Komponenten. Die druckbare Overview spiegelt diese Auswahl mit Marke, Mount, Durchmesser, Fokus, Gewicht, Rod-Support und Notizen, sodass Ausleihpakete offline dieselben Specs tragen. Akkureihen berücksichtigen Rechnercounts und Hot-Swap-Hardware.
- Crewdetails, Monitoring, Verteilung und Notizen erscheinen in Exporten.
- Listen werden mit dem Projekt gespeichert, erscheinen in Overviews, Bundles und lassen sich mit **Geräteliste löschen** zurücksetzen.

## Automatische Gear-Regeln

**Einstellungen → Automatische Gear-Regeln** ermöglicht Feintuning ohne JSON-Bearbeitung:

- Regeln nur aktivieren, wenn bestimmte **Pflichtszenarien** gewählt sind; optionale Labels erleichtern das Scannen.
- Regeln auch nach dem **Kameragewicht** steuern: Vergleiche den ausgewählten Body mit einem schwerer-, leichter- oder exakt-definierten Schwellenwert, bevor die Automatisierung greift.
- Equipment mit Kategorie und Anzahl hinzufügen oder **Custom Additions** für Hinweise/Spezialkits verwenden. Entfernen-Regeln blenden bestimmte Zeilen aus.
- Regeln laufen nach den Standardpaketen, greifen nahtlos in Gearlisten, Backups und Bundles ein.
- Ein Dashboard zur Regelabdeckung hebt doppelte Auslöser, Netto-Zu-/Abgänge, Konflikte und ungedeckte Szenarien hervor. Fokus-Karten filtern die Liste, springen zu betroffenen Regeln und bleiben offline nutzbar.
- Gespeicherte Listen behalten die aktive Regelmenge; beim Laden oder Import bleibt der Regelkontext erhalten.
- Abdeckungsinformationen reisen als `coverage`-Objekt in Druckansichten, Backups, Projektexporten und Bundles mit, sodass nachgelagerte Audits exakt denselben Stand sehen.
- Regelsets als JSON exportieren/importieren, auf Werkseinstellungen zurücksetzen oder auf die automatische Historie (alle zehn Minuten) zurückgreifen.

## Runtime-Intelligenz

Von Nutzer:innen gemeldete Laufzeiten fließen in ein gewichtetes Modell:

- Temperaturfaktoren: ×1 bei 25 °C, ×1,25 bei 0 °C, ×1,6 bei −10 °C, ×2 bei −20 °C.
- Auflösung: ≥12K ×3, ≥8K ×2, ≥4K ×1,5, ≥1080p ×1, darunter proportional.
- Framerate skaliert linear ab 24 fps (48 fps = ×2).
- WLAN aktiv +10 %.
- Codec-Faktoren: RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1; ProRes ×1,1; DNx/AVID ×1,2; All-Intra ×1,3; H.264/AVC ×1,5; H.265/HEVC ×1,7.
- Monitor-Werte werden nach Helligkeitsverhältnis gewichtet.
- Finale Gewichtung reflektiert den Anteil am Gesamtdraw, damit ähnliche Rigs mehr Einfluss haben.
- Dashboard sortiert nach Gewicht, zeigt Prozentanteile und markiert Ausreißer.

## Tastenkürzel

| Shortcut | Aktion | Hinweise |
| --- | --- | --- |
| `/`, `Strg+K`, `⌘K` | Globale Suche fokussieren | Funktioniert auch bei eingeklappter Navigation, `Esc` löscht |
| `Enter`, `Strg+S`, `⌘S` | Aktives Projekt speichern | Button bleibt deaktiviert bis ein Name gesetzt ist |
| `?`, `H`, `F1`, `Strg+/` | Hilfe öffnen | Dialog bleibt durchsuchtbar |
| `D` | Dark Mode umschalten | Ebenfalls in **Einstellungen → Themes** |
| `P` | Pinkes Theme umschalten | Funktioniert mit Light, Dark, High-Contrast |
| 🔄 | Gecachte Assets neu laden | Auch über **Einstellungen → Neu laden erzwingen** |

## Lokalisierung

Neue Sprachen lassen sich sofort testen – kein Build nötig:

1. README duplizieren und übersetzen (`README.<lang>.md`).
2. UI-Strings in `translations.js` ergänzen; Platzhalter wie `%s` erhalten.
3. Statische Seiten (Privacy, Impressum) kopieren und übersetzen.
4. `npm test` ausführen, bevor ein Pull Request entsteht.

## Als App installieren

Cine Power Planner ist eine Progressive Web App:

1. `index.html` in einem unterstützten Browser öffnen.
2. Über **Installieren** oder **Zum Home-Bildschirm hinzufügen** installieren.
   - **Chrome/Edge (Desktop):** Installationssymbol in der Adressleiste.
   - **Android:** Menü → *Zum Startbildschirm hinzufügen*.
   - **iOS Safari:** Teilen → *Zum Home-Bildschirm*.
3. App aus dem Launcher starten. Die Installation funktioniert offline und aktualisiert sich automatisch nach deiner Freigabe.

## Gerätedaten-Workflow

Gerätekataloge liegen unter `devices/`. Jede Datei bündelt verwandte Ausrüstung, damit Änderungen in Versionierung und App nachvollziehbar bleiben. Vor Commits helfen folgende Skripte:

```bash
npm run normalize
npm run unify-ports
npm run check-consistency
npm run generate-schema
```

`npm run normalize` bereinigt Steckverbinder und Kurzschreibweisen. `npm run unify-ports` vereinheitlicht Ports. `npm run check-consistency` prüft Pflichtfelder, `npm run generate-schema` aktualisiert `schema.json`. Datenspezifische Tests laufen mit:

```bash
npm run test:data
```

`npm run help` listet alle Skripte, `--help` liefert Details.

> **Katalogaktualisierung.** Der FIZ-Handeinheitenkatalog enthält jetzt TILTAs Nucleus-M und Nucleus-M II gemeinsam mit den Nano- und Nano II-Handrädern, Prestons HU4, cmotions cPRO-Handeinheit, Chrosziels MagNum-Handeinheit, Teradeks CTRL.3, DJIs Focus- und Focus Pro-Handeinheiten plus dem RS Focus Wheel (2022), Hedéns YMER-3-Handeinheit, Freeflys Pilot Pro-Handcontroller, Redrocks microRemote-Handcontroller sowie SmallRigs MagicFIZ-Handgriff, sodass Teams offline mehr Systeme vergleichen können, ohne die App zu verlassen.

## Entwicklung

Node.js 18 oder neuer installieren, dann:

```bash
npm install
npm run lint
npm test
```

`npm test` führt ESLint, Datenprüfungen und Jest nacheinander aus (`--runInBand`, `maxWorkers=1`). Spezielle Suites beim Entwickeln:

```bash
npm run test:unit
npm run test:data
npm run test:dom
npm run test:script
```

### Modul-Registry

Alle kritischen Bundles (`cinePersistence`, `cineOffline`, `cineUi`,
`cineRuntime` sowie gemeinsame Helfer) werden in der globalen
`cineModules`-Registrierung abgelegt. Jedes Modul ist standardmäßig eingefroren,
mit Metadaten dokumentiert und wird beim Start geprüft, damit Speichern,
Teilen, Importieren, Backups und Wiederherstellungen nie ohne Schutzpfade
laufen. Die Anforderungen stehen in
[`docs/architecture/module-registry.md`](docs/architecture/module-registry.md);
bitte vor neuen Modulen lesen, damit Offline-Garantien, Dokumentation und
Übersetzungen synchron bleiben.

Ein Infrastruktur-Quartett – `cineModuleArchitectureCore`,
`cineModuleArchitectureHelpers`, `cineModuleBase`, `cineModuleContext` und
`cineModuleEnvironment` – hält Bereichserkennung,
Modulsystem-Abfragen, Registrierungswarteschlangen und globale Exporte zwischen
Modern- und Legacy-Bundles ohne zusätzlichen Boilerplate synchron.

Für neue Module sollte `cineModules.createBlueprint({...})` genutzt werden, um
Metadaten und Standard-Freeze-Optionen vor der Registrierung zu übernehmen. Der
Helfer friert die erzeugte API ein, normalisiert Kategorie-, Beschreibungs- und
Verbindungsangaben und stellt fehlgeschlagene Registrierungen automatisch in die
Warteschlange, damit Offline-Workflows keine Schutzmechanismen verlieren.

### Legacy-Browser-Bundle

Nach Änderungen in `src/scripts/` oder `src/data/` `npm run build:legacy` ausführen. Dadurch wird das ES5-Bundle unter `legacy/` neu erzeugt und lokale Polyfills bleiben aktuell.

### Struktur

```
index.html
src/styles/style.css
src/styles/overview.css
src/styles/overview-print.css
src/scripts/script.js
src/scripts/storage.js
src/scripts/static-theme.js
src/scripts/modules/        # Eingefrorene Laufzeitmodule im cineModules-Register
src/data/index.js
src/data/devices/
src/data/schema.json
src/vendor/
legal/
tools/
tests/
```

## Fehlerbehebung

- **Service Worker hängt?** **Neu laden erzwingen** oder Hard Reload aus Entwickler-Tools.
- **Daten fehlen nach Tab-Schluss?** Speichereinstellungen prüfen; Private Mode kann Persistenz blockieren.
- **Downloads blockiert?** Mehrfachdownloads erlauben.
- **CLI-Skripte fehlschlagen?** Node.js 18+, `npm install`, dann Skript erneut. Bei Memory-Errors gezielt `npm run test:unit` etc. nutzen.

## Feedback & Support

Bitte Issues anlegen, wenn Probleme auftreten, Fragen bestehen oder Feature-Ideen auftauchen. Exporte oder Laufzeit-Beispiele helfen dabei, den Katalog korrekt zu halten.

## Mitwirken

Beiträge sind willkommen! Nach dem Lesen von `CONTRIBUTING.md` Issues eröffnen oder Pull Requests stellen. Vorab `npm test` ausführen.

## Danksagungen

Die App liefert lokale Uicons, OpenMoji-Assets und weitere gebündelte Grafiken, damit Icons auch offline verfügbar sind, und nutzt lz-string zum kompakten Speichern in URLs und Backups.

## Lizenz

Veröffentlicht unter der ISC-Lizenz. Details siehe `package.json`.
