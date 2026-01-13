# Cine Power Planner

<img src="src/icons/app-icon.png" alt="Cine Power Planner Symbol" width="160">

Cine Power Planner ist eine eigenständige Web-App, mit der professionelle
Kamera-Strompläne erstellt, geprüft und geteilt werden, ohne dass Daten das
lokale Gerät verlassen. Plane V‑Mount-, B‑Mount- oder Gold‑Mount-Rigs, modelliere
Laufzeit-Erwartungen, erfasse Produktionsanforderungen und exportiere teilbare
Bundles – vollständig im Browser und auch offline. Alle Abhängigkeiten liegen
in diesem Repository, sodass dieselbe Erfahrung auf Set-Workstations,
Feld-Laptops oder luftgetrennten Archiven funktioniert.

## Datenschutzversprechen

- **Nur lokale Speicherung.** Projekte, Kit-Listen, Laufzeit-Feedback,
  Exporte und Backups bleiben auf deinem Rechner; die App benötigt keine
  externen Dienste.
- **Mehrstufige Sicherheitsnetze.** Speichern, Autosave, Teilen, Importieren,
  Backup und Restore erzeugen immer Sicherheits-Snapshots, damit eine
  Wiederherstellung möglich ist, bevor Daten übernommen werden.
- **Offline by Design.** Alle Icons, Fonts, Uicons und Helferskripte liegen in
  diesem Repo, sodass Offline-Nutzung nie die Bedienbarkeit oder Datensicherheit
  beeinträchtigt.

## Start hier (Kurzdrill)

1. Öffne `index.html` in einem unterstützten Browser. Belasse die
   Repository-Struktur, damit alle Offline-Icons, Fonts und Hilfetexte lokal
   geladen werden.
2. Starte **Hilfe → Quick start checklist**, um Speichern, Teilen, Importieren,
   Backup und Restore auf diesem Gerät vollständig zu proben.
3. Exportiere direkt danach ein Planner-Backup und ein Projekt-Bundle.
   Bewahre beide auf getrennten Offline-Medien auf, um einen sicheren
   Wiederherstellungspunkt zu haben.
4. Trenne die Netzwerkverbindung und lade neu. Stelle sicher, dass Projekte,
   Hilfe und **Force reload** weiterhin funktionieren, ohne gespeicherte Daten
   anzutasten.

## Dokumentationsindex

Der kanonische Dokumentationshub befindet sich in
[`docs/README.md`](docs/README.md). Dort sind alle Offline-Anleitungen nach
Rollen (Nutzer, Betrieb, Entwicklung) und Workflows gruppiert, damit jede
Routine nur einmal dokumentiert ist.

- **Nutzer:innen:** starte mit dem
  [User Guide](docs/user/user-guide.md) und dem
  [Data Protection Lifecycle Guide](docs/user/data-protection-lifecycle.md).
- **Operations:** proben mit der
  [Operations Checklist](docs/ops/operations-checklist.md) und dem
  [Offline Readiness Runbook](docs/ops/offline-readiness.md).
- **Entwicklung:** folge dem
  [Development & Maintenance Guide](docs/dev/development.md) und dem
  [Documentation Maintenance Guide](docs/dev/documentation-maintenance.md).

## Kernfunktionen

- **Wissensbasis für Leistungsdaten.** Greife auf gebündelte Verbrauchswerte zu
  oder erweitere den lokalen Katalog mit eigenen Einträgen.
- **Batterielaufzeiten planen.** Kombiniere Kapazitäten, Spannungen und
  Laufzeit-Feedback, damit Schätzungen praxisnah bleiben.
- **Individuelle Rig-Konfigurationen.** Mische Kameras, Zubehör und Crew-
  Anforderungen und exportiere Bundles oder Backups ohne Datenverlust.
- **Offline-first Betrieb.** Jedes Asset ist im Repo enthalten, sodass Autosave,
  Backup, Restore, Sharing und Hilfe vollständig offline funktionieren.
- **Firebase Studio Integration.** Synchronisiere deine Projekte optional in die Cloud für Echtzeit-Zusammenarbeit und Zugriff von mehreren Geräten.
- **Restore-Kompatibilitätsübersichten.** Jeder Restore listet fehlende
  Abschnitte und erstellt ein Sicherheits-Backup, bevor Daten übernommen werden.

## Neu: V2-Benutzeroberfläche

Die Anwendung verfügt jetzt über eine vollständig neugestaltete, responsive V2-Benutzeroberfläche.

### Dashboard & Navigation
- **Modernes Dashboard**: Verwalte alle Projekte in einer einheitlichen, durchsuchbaren Kachelansicht mit farbcodierten Kacheln, die Projektstatus, Daten und Schnellaktionen anzeigen.
- **Sidebar-Navigation**: Greife schnell auf Projekte, Geräte-Bibliothek, Kontakte, Eigenes Equipment, Automatische Gear-Regeln, Einstellungen und Hilfe zu.
- **Mobile-First-Design**: Vollständig responsives Layout mit mobilem Sidebar-Toggle und Touch-optimierten Steuerelementen.

### Projektverwaltung
- **Projektstatus-Tracking**: Verfolge Projekte durch Workflow-Phasen—Entwurf, Planung, Wartet auf Genehmigung, Genehmigt, Dreh, Abgeschlossen und Archiviert—mit farbcodierten Statusindikatoren.
- **Tab-basierte Projektansichten**: Navigiere zwischen Kamera-Paket, Power-Zusammenfassung, Anforderungen und Gear-Liste innerhalb jedes Projekts.
- **Kontextmenüs**: Rechtsklick auf Projektkacheln für Schnellaktionen wie Duplizieren, Archivieren, Exportieren oder Löschen.

### Tools & Daten
- **Geräte-Bibliothek**: Durchsuche und verwalte deine Ausrüstungsdatenbank mit Filter- und Suchfunktionen.
- **Kontaktverwaltung**: Führe eine Crew-Liste mit Rollen, Kontaktinformationen und Profilfotos. Importiere Kontakte aus vCard-Dateien.
- **Eigenes Equipment verfolgen**: Katalogisiere dein persönliches Equipment-Inventar mit Mengen und Beschaffungsnotizen.
- **Automatische Gear-Regeln**: Konfiguriere szenengetriggerte Equipment-Ergänzungen oder -Entfernungen.

### Visuelle Verbesserungen
- **Verbesserter Dark Mode**: Verfeinertes dunkles Theme mit verbessertem Kontrast und Lesbarkeit.
- **Pink Mode**: Lustiges Akzentthema mit animiertem „Icon-Regen"-Effekt.
- **Theme-Steuerung**: Schnellzugriffs-Schalter in der Sidebar für Dark Mode, Pink Mode und Force Reload.

## Installation

1. Klone oder lade dieses Repository auf ein vertrauenswürdiges Laufwerk:
   ```bash
   git clone /path/to/cine-power-planner.git
   cd cine-power-planner
   npm install
   ```
   (Wenn du ein Offline-Bundle erhalten hast, entpacke es stattdessen lokal.)
2. Starte den Entwicklungsserver:
   ```bash
   npm run dev
   ```
   Die App öffnet sich unter `http://localhost:3000` mit Hot Module Replacement.
3. Für Produktions-Builds:
   ```bash
   npm run build      # Build nach dist/
   npm run preview    # Produktions-Build testen
   ```
4. (Offline-Nutzung) Öffne `index.html` direkt in einem unterstützten Browser
   für vollständig offline Nutzung. Alle Assets laden ohne Netzwerkverbindung.

## Übersetzungen

Halte die lokalisierten README-Dateien im Einklang mit dieser README, sobald
Workflows angepasst werden – besonders bei Speichern, Teilen, Importieren,
Backup oder Restore.

- [Deutsch](README.de.md)
- [English](README.en.md)
- [Español](README.es.md)
- [Français](README.fr.md)
- [Italiano](README.it.md)

## Lizenz

Veröffentlicht unter der ISC-Lizenz. Siehe `package.json` für Details.
