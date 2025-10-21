# Translation Audit – 2025-03-10

This audit captures UI copy that still appears in English or uses inconsistent terminology across locales. Update the translations in the locale modules under `src/scripts/translations/<locale>.js` and rerun localisation tests after each fix.

## Italian (`it`)

- [x] Localise the monitor button labels that remain in English:
  - `projectForm.userButtonFunctions.surroundView` currently reads "Surround View". Provide an Italian label consistent with the monitor UI. 【F:src/scripts/translations/it.js†L569-L596】
  - `projectForm.userButtonFunctions.vectorscope` still shows "Vectorscope". Translate the scope name (Spanish already uses "Vectorscopio" as a reference). 【F:src/scripts/translations/it.js†L569-L596】
  - `projectForm.userButtonFunctions.frameGrab` remains "Frame Grab" while other locales translate it. Supply an Italian alternative (for example "Cattura fotogramma"). 【F:src/scripts/translations/it.js†L569-L596】

## French (`fr`)

- [x] Translate the monitor user button terms that remain English:
  - `projectForm.userButtonFunctions.surroundView` is still "Surround View"; replace with a French phrase users recognise on set. 【F:src/scripts/translations/fr.js†L569-L596】
  - `projectForm.userButtonFunctions.vectorscope` retains the English "Vectorscope" despite Spanish adopting "Vectorscopio". Align with French broadcast terminology. 【F:src/scripts/translations/fr.js†L569-L596】
  - `projectForm.userButtonFunctions.peaking` also mirrors English. Confirm whether French operator guides prefer "Peaking" or "Renforcement des contours" and update accordingly. 【F:src/scripts/translations/fr.js†L569-L596】

## German (`de`)

- [ ] Replace the remaining English labels in the monitor button list:
  - `projectForm.userButtonFunctions.surroundView` still reads "Surround View". 【F:src/scripts/translations/de.js†L569-L596】
  - `projectForm.userButtonFunctions.vectorscope` is still "Vectorscope". 【F:src/scripts/translations/de.js†L569-L596】
  - `projectForm.userButtonFunctions.frameGrab` remains "Frame Grab" and should match the other locales. 【F:src/scripts/translations/de.js†L569-L596】

- [ ] Localise the "Gear" terminology across the German gear list flows. Key entries still use the English noun:
  - [x] Section navigation (`gearListNav`, `gearListNavHelp`, `overviewExportTitleSuffix`). 【F:src/scripts/translations/de.js†L61-L65】
  - Primary actions (`generateGearListBtn`, `deleteGearListBtn`, `deleteGearListBtnHelp`, confirmation prompts). 【F:src/scripts/translations/de.js†L497-L498】【F:src/scripts/translations/de.js†L754-L756】
  - Gear list maintenance copy such as the autosave note still references an "Offline-Gear-Manifest"; swap to a German phrasing that keeps offline safety messaging intact. 【F:src/scripts/translations/de.js†L692-L695】

Document each localisation approval and rerun `npm run test:unit -- tests/unit/translationsCameraWeight.test.js` before shipping to keep offline bundles in sync. This single-suite run exercises the camera-weight translation guard that fails whenever a locale misses new weight descriptors, ensuring locale fixes continue to protect offline bundles.
