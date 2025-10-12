# Schema inventory

This inventory documents the structured data used by Cine Power Planner. Understanding these attributes
helps keep exports, backups and translation keys aligned when new equipment is added.

## Source files
- `src/data/schema.json` – attribute catalogue for accessories, cameras, power gear and rental metadata.【F:src/data/schema.json†L1-L120】
- `src/data/devices/` – device definitions consumed by planners and exports.
- `src/data/index.js` – exposes devices while attaching rental house data immutably.【F:src/data/index.js†L1-L13】

## Key entity groups
| Group | Attributes | Notes |
| --- | --- | --- |
| Accessories → Batteries | `capacity`, `mount_type`, `pinA`, `pinV`, `weight_g` | Used for runtime consumption and power calculations. Ensure translations cover mount types.【F:src/data/schema.json†L2-L10】 |
| Accessories → Cables | Brand, compatibility lists, connectors, orientation, length, notes | Separate sections for FIZ, power and video define specialised attributes that influence automatic gear rules.【F:src/data/schema.json†L12-L62】 |
| Accessories → Chargers | Charge modes, input voltage, outputs, power, weight | Appears in backup exports; verify units before translating.【F:src/data/schema.json†L104-L118】 |
| Accessories → Cages/Camera support | Compatibility fields, rod standards, weight | Keep consistent with gear tables so automatic rule diffs remain accurate.【F:src/data/schema.json†L65-L97】 |

## Maintenance workflow
1. Update device data in `src/data/devices` and regenerate the schema with `npm run generate-schema` if
   new attributes are introduced.【F:package.json†L6-L21】
2. Verify backups and exports after schema changes to confirm new attributes appear in payloads and
   translations. Use the documentation update checklist to propagate terminology updates.【F:docs/save-share-restore-reference.md†L1-L140】【F:docs/documentation-update-checklist.md†L1-L68】
3. Record schema additions in the verification log and feature gap analysis so localisation teams know
   to update manuals and help content.【F:docs/verification-log-template.md†L12-L67】【F:docs/feature-gap-analysis.md†L1-L55】

Maintaining this inventory alongside runtime safeguards keeps equipment metadata consistent across
saves, shares, backups and offline guides.【F:src/scripts/modules/persistence.js†L1036-L1109】
