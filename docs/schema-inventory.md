# Schema Inventory

Document the major storage keys, what they contain and how they are protected.
Update this inventory when schemas change or new datasets are introduced.

| Key / dataset | Description | Primary source | Mirrored backup | Notes |
| --- | --- | --- | --- | --- |
| `cine-current-project` | Active project payload including gear, notes, runtime
feedback and requirements. | `src/scripts/app-session.js` via
`cinePersistence.saveProject()` | `cine-current-project-backup` | Normalised JSON; autosave writes before UI updates. |
| `cine-projects` | Library of saved projects. | `app-session.js` | `cine-projects-backup` | Includes manual saves and imports. |
| `auto-backup-*` | Rolling automatic backups with timestamps. | `app-events.js`
& `storage.js` | Implicit (each backup stored individually) | Rotation managed by cadence counter and quota guard. |
| `planner-backup.json` | Full planner export (downloaded). | `storage.js` export
helpers | External file | Store with checksums on offline media. |
| `cine-automatic-gear-rules` | Automatic gear presets and editor state. |
`app-setups.js` | `cine-automatic-gear-rules-backup` | Restores confirm before overwrite. |
| `cine-custom-gear` | Crew-defined gear items per category. | `storage.js` | `cine-custom-gear-backup` | Stored uncompressed to keep JSON human readable. |
| `cine-devices` | Device library with electrical specs. | `storage.js` | `cine-devices-backup` | Syncs during import/export. |
| `cine-runtime-feedback` | Runtime notes and calculations. | `app-session.js` | `cine-runtime-feedback-backup` | Included in planner exports. |
| `cine-preferences` | UI and localisation settings. | `storage.js` | `cine-preferences-backup` | Guards ensure language/theme persist offline. |
| `cine-contacts` | Crew contact cards. | `storage.js` | `cine-contacts-backup` | Included in exports and share bundles. |

## Change log

Record schema changes here:

- **Date:**
- **Change:**
- **Files updated:**
- **Backwards compatibility notes:**
- **Documentation updated:**

Keep the inventory with documentation packets to simplify audits and restores.
