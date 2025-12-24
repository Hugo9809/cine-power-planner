# Cine Power Planner

<img src="src/icons/app-icon.png" alt="Cine Power Planner Symbol" width="160">

Cine Power Planner ist eine eigenständige Web-App, mit der professionelle
Kamera-Strompläne erstellt, geprüft und geteilt werden, ohne dass Daten das
lokale Gerät verlassen. Plane V‑Mount-, B‑Mount- oder Gold‑Mount-Rigs, modelliere
Laufzeit-Erwartungen, erfasse Projektanforderungen und exportiere teilbare
Bundles – vollständig im Browser und auch offline. Alle Abhängigkeiten liegen
in diesem Repository, sodass dieselbe Erfahrung auf Set-Workstations,
Feld-Laptops oder luftgetrennten Archiven funktioniert.

## Datenschutzversprechen

- **Nur lokale Speicherung.** Projekte, Gear-Listen, Laufzeit-Feedback,
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
- **Restore-Kompatibilitätsübersichten.** Jeder Restore listet fehlende
  Abschnitte und erstellt ein Sicherheits-Backup, bevor Daten übernommen werden.

## Installation

1. Klone oder lade dieses Repository auf ein vertrauenswürdiges Laufwerk:
   ```bash
   git clone /path/to/cine-power-planner.git
   cd cine-power-planner
   ```
   (Wenn du ein Offline-Bundle erhalten hast, entpacke es stattdessen lokal.)
2. Öffne `index.html` direkt in einem unterstützten Browser. Alle Assets werden
   lokal geladen, sodass du die Verbindung sofort trennen kannst.
3. (Optional) Stelle den Ordner über `http://localhost` bereit, um den
   Service Worker und die PWA-Installation zu aktivieren. Jeder statische
   Server funktioniert offline:
   ```bash
   python -m http.server
   # oder
   npm run serve
   ```

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
