# Translation Guide

This guide describes how to update Cine Power Planner translations while keeping
offline bundles safe and documentation consistent.

## Locale files

- Each language lives in `src/scripts/translations/<locale>.js` and exports the
  full translation tree used by the planner (English, German, French, Italian,
  Spanish by default).
- The loader `src/scripts/translations.js` resolves these modules via the
  `LOCALE_SCRIPTS` map and exposes shared loading states so offline launches can
  pull the correct bundle without network access.
- Never rely on remote translation services; edits happen locally and are
  reviewed offline to keep sensitive projects and rehearsal data on-device.

## Workflow

1. **Scope changes**
   - List UI strings affected by the feature/documentation update.
   - Identify docs (READMEs, guides) requiring translated updates.
2. **Edit safely**
   - Update every affected `src/scripts/translations/<locale>.js` module. Copy
     from English first, then translate while preserving placeholders, keyboard
     shortcuts and punctuation.
   - Register new locales—or adjust URLs and loading copy—in
     `src/scripts/translations.js` so the loader preloads the module and displays
     the correct offline loading message.
   - Confirm long strings still fit UI components by testing offline. Capture
     screenshots for the verification packet when layouts differ.
3. **Synchronise docs**
   - Mirror updates across `README.<locale>.md`, the help overlay and any docs
     referencing the affected workflow (including the Data Protection Lifecycle
     Guide) so every offline reader sees the same copy.
   - Update screenshots using the same locale and store them with the offline
     evidence set.
4. **Review**
   - Use bilingual reviewers to validate accuracy.
   - Run the planner in each locale, rehearse save/share/import/backup/restore
     workflows and confirm text matches documentation.
   - Confirm the onboarding welcome language selector works even when the
     header/settings language controls are absent so the overview step fallback
     remains documented.
5. **Archive evidence**
   - Store signed approval notes in the verification packet.
   - Update the [Documentation Coverage Matrix](documentation-coverage-matrix.md)
     with review dates.

## Glossary & tone

| Term | Translation notes |
| --- | --- |
| "Backup" | Use terminology that implies redundant copies, not cloud sync. |
| "Restore rehearsal" | Emphasise sandbox/safe preview before promotion. |
| "Autosave ledger" | Translate to highlight timestamped log of background saves. |
| "Bundle" | Explain as offline file transfer, never internet sharing. |

## Film terminology glossary

Use these preferred translations for core production terms in headings, help content, and print/export labels.
Keep brand connector names (D‑Tap, B‑Mount) unchanged and hyphenated.

| English term | German (de) | Spanish (es) | French (fr) | Italian (it) |
| --- | --- | --- | --- | --- |
| Rig | Kamera-Rig | rig | rig | rig |
| Camera package | Kamera-Paket | paquete de cámara | pack caméra | pacchetto camera |
| Kit list | Kit-Liste | lista de kit | liste de kit | lista kit |
| Power Diagram | Stromdiagramm | diagrama de potencia | schéma d’alimentation | diagramma di alimentazione |
| D‑Tap | D‑Tap | D‑Tap | D‑Tap | D‑Tap |
| B‑Mount | B‑Mount | B‑Mount | B‑Mount | B‑Mount |

## Quality checks

- Confirm no string introduces external links or network dependencies.
- Ensure translation keeps keyboard shortcut references accurate (`Ctrl+S`, `⌘S`).
- Validate service worker and offline instructions remain clear in each language.
- Record any locale-specific layout adjustments in `review-findings.md`.

## V2 UI terminology

When translating V2 interface elements, use these consistent terms:

| English term | German (de) | Spanish (es) | French (fr) | Italian (it) |
| --- | --- | --- | --- | --- |
| Dashboard | Dashboard | Dashboard | Tableau de bord | Dashboard |
| Sidebar | Sidebar | Barra lateral | Barre latérale | Sidebar |
| Device Library | Geräte-Bibliothek | Biblioteca de Dispositivos | Bibliothèque d'équipements | Libreria Dispositivi |
| Owned Gear | Eigenes Equipment | Equipo Propio | Équipement personnel | Attrezzatura Propria |
| Project Status | Projektstatus | Estado del Proyecto | Statut de projet | Stato Progetto |
| Draft | Entwurf | Borrador | Brouillon | Bozza |
| Planning | Planung | Planificación | Planification | Pianificazione |
| Waiting for Approval | Wartet auf Genehmigung | Esperando Aprobación | En attente d'approbation | In Attesa di Approvazione |
| Approved | Genehmigt | Aprobado | Approuvé | Approvato |
| Shooting | Dreh | Rodaje | Tournage | Riprese |
| Completed | Abgeschlossen | Completado | Terminé | Completato |
| Archived | Archiviert | Archivado | Archivé | Archiviato |

V2-specific translation keys are located in `src/scripts/translations/*.js` under the `v2` section.
