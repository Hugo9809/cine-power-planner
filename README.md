# Cine Power Planner

<img src="src/icons/app-icon.png" alt="Cine Power Planner icon" width="160">

Cine Power Planner is a standalone web app for building, auditing, and sharing
professional camera power plans that never leave your machine. Plan V‑Mount,
B‑Mount or Gold‑Mount rigs, model runtime expectations, capture project
requirements, and export shareable bundles—entirely inside your browser, even
when you are offline. Every dependency lives in this repository so the same
experience runs on a stage workstation, a field laptop, or an air-gapped archive
without phoning home.

## Data Protection Promise

- **Local-only by default.** Projects, gear lists, runtime feedback, exports, and
  backups live on your machine; the planner does not depend on external
  services.
- **Optional Cloud Sync.** Connect to Firebase Studio to seamlessly sync projects
  across devices without sacrificing local ownership.
- **Layered safety nets.** Save, autosave, share, import, backup, and restore
  workflows always create safety snapshots so recovery is possible before any
  data is promoted.
- **Offline by design.** All core features including icons, fonts, and helper scripts
  are stored in this repo, so offline usage never degrades usability or data protection.

## Start here (short drill)

1. Open `index.html` in a supported browser. Keep the repository intact so every
   offline icon, font, and help asset loads locally.
2. Run **Help → Quick start checklist** to rehearse save, share, import, backup,
   and restore behaviors end-to-end on this workstation.
3. Export a planner backup and a project bundle immediately after the drill.
   Store them on separate offline media to establish a safe restore point.
4. Disconnect from the network and reload. Confirm projects, help, and the
   **Force reload** action still work without touching saved data.

## Documentation index

The canonical documentation hub lives in [`docs/README.md`](docs/README.md).
It groups offline guidance by audience (users, operations, developers) and by
workflow so each routine is documented once.

- **Users:** start with the
  [User Guide](docs/user/user-guide.md) and the
  [Data Protection Lifecycle Guide](docs/user/data-protection-lifecycle.md).
- **Operations:** rehearse with the
  [Operations Checklist](docs/ops/operations-checklist.md) and
  [Offline Readiness Runbook](docs/ops/offline-readiness.md).
- **Developers:** follow the
  [Development & Maintenance Guide](docs/dev/development.md) and the
  [Documentation Maintenance Guide](docs/dev/documentation-maintenance.md).

## Key features

- **Equipment power knowledge base.** Reference bundled draw figures or extend
  the local catalog with your own entries.
- **Battery runtime planning.** Combine capacities, voltages, and runtime
  feedback so estimates stay grounded in real-world usage.
- **Custom rig configurations.** Mix cameras, accessories, and crew
  requirements, then export bundles or backups without risking data loss.
- **Offline-first operation.** Every asset ships with the repo, so autosave,
  backup, restore, share, and help stay fully functional without a network.
- **Firebase Studio Integration.** Optionally sync your projects to the cloud for real-time collaboration and multi-device access.
- **Restore compatibility summaries.** Every restore lists missing sections and
  keeps a pre-restore safety backup so crews can verify changes before
  promotion.

## Installation

1. Clone or download this repository to a trusted local drive:
   ```bash
   git clone /path/to/cine-power-planner.git
   cd cine-power-planner
   ```
   (If you received an offline bundle, unpack it to a local folder instead.)
2. Open `index.html` directly in a supported browser. Every asset loads from the
   repository, so you can disconnect immediately after opening the file.
3. (Optional) Serve the folder over `http://localhost` to enable the bundled
   service worker and Progressive Web App install prompt. Any static server
   works while offline:
   ```bash
   python -m http.server
   # or
   npm run serve
   ```

## Translations

Keep localized README files synchronized with this README whenever workflows
change, especially anything touching saving, sharing, importing, backup, or
restore steps.

- [Deutsch](README.de.md)
- [English](README.en.md)
- [Español](README.es.md)
- [Français](README.fr.md)
- [Italiano](README.it.md)

## License

Distributed under the ISC license. See `package.json` for details.
