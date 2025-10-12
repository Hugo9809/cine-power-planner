# Schema Inventory

Document the major storage keys, what they contain and how they are protected.
Update this inventory when schemas change or new datasets are introduced.

| Key / dataset | Description | Primary source | Mirrored backup | Notes |
| --- | --- | --- | --- | --- |
| `cine-current-project` | Active project payload including gear, notes, runtime feedback and requirements. | `src/scripts/app-session.js` via `cinePersistence.saveProject()` | `cine-current-project-backup` | Normalised JSON; autosave writes before UI updates. |
| `cine-projects` | Library of saved projects. | `app-session.js` | `cine-projects-backup` | Includes manual saves and imports. |
| `auto-backup-*` | Rolling automatic backups with timestamps. | `app-events.js` & `storage.js` | Each backup stored as its own entry | Rotation managed by cadence counter and quota guard. |
| `planner-backup.json` | Full planner export (downloaded). | `storage.js` export helpers | External file | Store with checksums on offline media. |
| `cine-automatic-gear-rules` | Automatic gear presets and editor state. | `app-setups.js` | `cine-automatic-gear-rules-backup` | Restores prompt for confirmation before overwrite. |
| `cine-custom-gear` | Crew-defined gear items per category. | `storage.js` | `cine-custom-gear-backup` | Stored uncompressed for readability. |
| `cine-devices` | Device library with electrical specs. | `storage.js` | `cine-devices-backup` | Syncs during import/export and backups. |
| `cine-runtime-feedback` | Runtime notes and calculations. | `app-session.js` | `cine-runtime-feedback-backup` | Included in planner exports. |
| `cine-preferences` | UI, localisation and accessibility settings. | `storage.js` | `cine-preferences-backup` | Ensures language/theme persist offline. |
| `cine-contacts` | Crew contact cards and share metadata. | `storage.js` | `cine-contacts-backup` | Included in exports and share bundles. |
| `cine-translation-bundles` | Exported locale overrides created by crews. | `storage.js` | `cine-translation-bundles-backup` | Exported with planner backups and translation packets. |

## Change log

Record schema changes here:

- **Date:**
- **Change:**
- **Files updated:**
- **Backwards compatibility notes:**
- **Documentation updated:**

Keep the inventory with documentation packets to simplify audits and restores.
