# Translation Audit – 2025-03-10

This audit captures UI copy that still appears in English or uses inconsistent terminology across locales. Update the translations in `src/scripts/translations.js` and rerun localisation tests after each fix.

## Italian (`it`)

- [ ] Localise the monitor button labels that remain in English:
  - `projectForm.userButtonFunctions.surroundView` currently reads "Surround View". Provide an Italian label consistent with the monitor UI. 【F:src/scripts/translations.js†L2833-L2834】
  - `projectForm.userButtonFunctions.vectorscope` still shows "Vectorscope". Translate the scope name (Spanish already uses "Vectorscopio" as a reference). 【F:src/scripts/translations.js†L2835-L2838】
  - `projectForm.userButtonFunctions.frameGrab` remains "Frame Grab" while other locales translate it. Supply an Italian alternative (for example "Cattura fotogramma"). 【F:src/scripts/translations.js†L2839-L2843】

## French (`fr`)

- [ ] Translate the monitor user button terms that remain English:
  - `projectForm.userButtonFunctions.surroundView` is still "Surround View"; replace with a French phrase users recognise on set. 【F:src/scripts/translations.js†L7247-L7252】
  - `projectForm.userButtonFunctions.vectorscope` retains the English "Vectorscope" despite Spanish adopting "Vectorscopio". Align with French broadcast terminology. 【F:src/scripts/translations.js†L7253-L7256】
  - `projectForm.userButtonFunctions.peaking` also mirrors English. Confirm whether French operator guides prefer "Peaking" or "Renforcement des contours" and update accordingly. 【F:src/scripts/translations.js†L7248-L7256】

## German (`de`)

- [ ] Replace the remaining English labels in the monitor button list:
  - `projectForm.userButtonFunctions.surroundView` still reads "Surround View". 【F:src/scripts/translations.js†L9471-L9476】
  - `projectForm.userButtonFunctions.vectorscope` is still "Vectorscope". 【F:src/scripts/translations.js†L9477-L9479】
  - `projectForm.userButtonFunctions.frameGrab` remains "Frame Grab" and should match the other locales. 【F:src/scripts/translations.js†L9483-L9486】

- [ ] Localise the "Gear" terminology across the German gear list flows. Key entries still use the English noun:
  - Section navigation (`gearListNav`, `gearListNavHelp`, `overviewExportTitleSuffix`). 【F:src/scripts/translations.js†L8888-L8894】
  - Primary actions (`generateGearListBtn`, `deleteGearListBtn`, `deleteGearListBtnHelp`, confirmation prompts). 【F:src/scripts/translations.js†L9391-L9391】【F:src/scripts/translations.js†L9655-L9659】
  - Gear list maintenance copy such as the autosave note still references an "Offline-Gear-Manifest"; swap to a German phrasing that keeps offline safety messaging intact. 【F:src/scripts/translations.js†L9587-L9589】

Document each localisation approval and rerun `npm test -- translations` before shipping to keep offline bundles in sync.
