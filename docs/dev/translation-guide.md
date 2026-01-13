# Translation Guide

This guide describes how to update Cine Power Planner translations while keeping
offline bundles safe and documentation consistent.

## Quick Start

```bash
# Validate all translations
npm run translation:validate

# Check specific locale coverage
node scripts/validate-translations.mjs
```

> [!IMPORTANT]
> Never rely on remote translation services. All edits happen locally and are
> reviewed offline to keep sensitive projects and rehearsal data on-device.

## Locale Files

### File Locations

| File | Purpose | Size |
| --- | --- | --- |
| `src/scripts/translations/en.js` | English (base locale) | ~159 KB |
| `src/scripts/translations/de.js` | German | ~176 KB |
| `src/scripts/translations/es.js` | Spanish | ~178 KB |
| `src/scripts/translations/fr.js` | French | ~184 KB |
| `src/scripts/translations/it.js` | Italian | ~174 KB |

### File Structure

Each locale file exports a `data` object with nested translation keys:

```javascript
// src/scripts/translations/en.js
export const data = {
  texts: {
    ui: {
      save: "Save",
      cancel: "Cancel",
      // ...
    },
    project: {
      title: "Project Title",
      // ...
    },
  },
  v2: {
    sidebar: {
      dashboard: "Dashboard",
      // ...
    },
  },
};
```

### Loading Mechanism

The loader `src/scripts/translations.js`:
1. Resolves modules via the `LOCALE_SCRIPTS` map
2. Exposes shared loading states for offline launches
3. Caches loaded locales to prevent re-fetching

## Translation Workflow

### 1. Scope Changes

- [ ] List UI strings affected by the feature/documentation update
- [ ] Identify docs (READMEs, guides) requiring translated updates
- [ ] Note any new translation keys needed

### 2. Edit Safely

1. **Start with English** — Update `en.js` first as the source of truth
2. **Copy to other locales** — Add new keys to all locale files
3. **Translate** — Replace English text while preserving:
   - Placeholders: `{name}`, `%s`, `%d`
   - Keyboard shortcuts: `Ctrl+S`, `⌘S`
   - Technical terms: D-Tap, B-Mount, HDMI
4. **Preserve structure** — Keep exact key paths identical

```javascript
// ✅ Correct — preserves placeholder
"greeting": "Hallo {name}, willkommen!"

// ❌ Wrong — missing placeholder
"greeting": "Hallo, willkommen!"
```

### 3. Register New Locales

If adding a new locale:

1. Create `src/scripts/translations/<locale>.js`
2. Export a `data` object matching the English structure
3. Update `LOCALE_SCRIPTS` map in `translations.js`
4. Add offline loading message for the new locale

### 4. Test Translations

```bash
# Start dev server
npm run dev

# In browser:
# 1. Open Settings → Language
# 2. Switch to each locale
# 3. Verify all text displays correctly
# 4. Check for layout issues with long strings
```

### 5. Validate

```bash
# Run validation script
npm run translation:validate

# Review output for:
# - Missing keys
# - Placeholder mismatches
# - Untranslated strings
```

### 6. Synchronise Docs

Update corresponding documentation files:
- `README.<locale>.md` files
- Help overlay content
- Data Protection Lifecycle Guide
- Any docs referencing affected workflows

### 7. Archive Evidence

- [ ] Store screenshots of each locale in verification packet
- [ ] Update [Documentation Coverage Matrix](documentation-coverage-matrix.md)
- [ ] Get bilingual reviewer approval

## Translation Glossary

### Core Terms

| Term | Translation Notes |
| --- | --- |
| Backup | Use terminology implying redundant copies, not cloud sync |
| Restore rehearsal | Emphasise sandbox/safe preview before promotion |
| Autosave ledger | Translate to highlight timestamped log of background saves |
| Bundle | Explain as offline file transfer, never internet sharing |
| Planner | Use production planning context, not calendar/scheduling |

### Film Production Terms

Keep brand connector names (D‑Tap, B‑Mount) unchanged and hyphenated.

| English | German | Spanish | French | Italian |
| --- | --- | --- | --- | --- |
| Rig | Kamera-Rig | rig | rig | rig |
| Camera package | Kamera-Paket | paquete de cámara | pack caméra | pacchetto camera |
| Kit list | Kit-Liste | lista de kit | liste de kit | lista kit |
| Power Diagram | Stromdiagramm | diagrama de potencia | schéma d'alimentation | diagramma di alimentazione |
| D‑Tap | D‑Tap | D‑Tap | D‑Tap | D‑Tap |
| B‑Mount | B‑Mount | B‑Mount | B‑Mount | B‑Mount |
| V‑Mount | V‑Mount | V‑Mount | V‑Mount | V‑Mount |

### V2 UI Terms

| English | German | Spanish | French | Italian |
| --- | --- | --- | --- | --- |
| Dashboard | Dashboard | Dashboard | Tableau de bord | Dashboard |
| Sidebar | Sidebar | Barra lateral | Barre latérale | Sidebar |
| Device Library | Geräte-Bibliothek | Biblioteca de Dispositivos | Bibliothèque d'équipements | Libreria Dispositivi |
| Owned Gear | Eigenes Equipment | Equipo Propio | Équipement personnel | Attrezzatura Propria |
| Project Status | Projektstatus | Estado del Proyecto | Statut de projet | Stato Progetto |

### Project Status Terms

| English | German | Spanish | French | Italian |
| --- | --- | --- | --- | --- |
| Draft | Entwurf | Borrador | Brouillon | Bozza |
| Planning | Planung | Planificación | Planification | Pianificazione |
| Waiting for Approval | Wartet auf Genehmigung | Esperando Aprobación | En attente d'approbation | In Attesa di Approvazione |
| Approved | Genehmigt | Aprobado | Approuvé | Approvato |
| Shooting | Dreh | Rodaje | Tournage | Riprese |
| Completed | Abgeschlossen | Completado | Terminé | Completato |
| Archived | Archiviert | Archivado | Archivé | Archiviato |

## Quality Checks

### Automated Validation

The `scripts/validate-translations.mjs` script checks:

| Check | Description |
| --- | --- |
| Missing keys | Keys in English but not in target locale |
| Extra keys | Keys in target locale but not in English |
| Placeholders | Ensure `{name}`, `%s` patterns match |
| Untranslated | Strings identical to English (potential oversight) |
| Coverage | Percentage of keys translated |

### Manual Checks

- [ ] No string introduces external links or network dependencies
- [ ] Keyboard shortcut references are accurate (`Ctrl+S` → `⌘S` on Mac)
- [ ] Service worker and offline instructions are clear
- [ ] Long strings don't break layouts
- [ ] Date/number formats are locale-appropriate

## Placeholder Reference

### Supported Patterns

| Pattern | Example | Usage |
| --- | --- | --- |
| `{name}` | `"Hello {name}"` | Named placeholder |
| `%s` | `"%s items"` | String placeholder |
| `%d` | `"%d watts"` | Number placeholder |
| `%1$s` | `"%1$s of %2$s"` | Positional placeholder |

### Placeholder Rules

1. **Never remove placeholders** — They're substituted at runtime
2. **Keep same count** — Source and target must have matching placeholders
3. **Positional order** — May differ for grammar, but all must be present
4. **Don't translate** — Placeholders render as literal `{name}` if translated

## Adding New Languages

### Prerequisites

1. Fluent speaker for the target language
2. Understanding of film production terminology
3. Ability to test offline workflows

### Steps

1. **Create locale file**:
   ```bash
   cp src/scripts/translations/en.js src/scripts/translations/<locale>.js
   ```

2. **Translate all strings**:
   - Maintain key structure
   - Preserve placeholders
   - Use appropriate tone (professional but accessible)

3. **Register locale** in `translations.js`:
   ```javascript
   LOCALE_SCRIPTS.set('<locale>', {
     path: './translations/<locale>.js',
     loadingMessage: '<Loading message in target language>',
   });
   ```

4. **Create README translation**:
   ```bash
   cp README.md README.<locale>.md
   # Translate content
   ```

5. **Validate**:
   ```bash
   npm run translation:validate
   ```

6. **Update documentation**:
   - Add locale to README.md translation list
   - Update supported languages in user guide

## V2-Specific Keys

V2 UI translation keys are under the `v2` namespace:

```javascript
v2: {
  sidebar: { /* sidebar nav labels */ },
  dashboard: { /* project dashboard text */ },
  projectDetail: { /* project detail view text */ },
  settings: { /* settings view text */ },
  help: { /* help center text */ },
  contacts: { /* contacts view text */ },
  ownedGear: { /* owned gear view text */ },
  rules: { /* auto gear rules view text */ },
}
```

## Related Documentation

- [Documentation Coverage Matrix](documentation-coverage-matrix.md)
- [Translation Review 2025-03-10](reviews/translation-review-2025-03-10.md)
- [Documentation Maintenance](documentation-maintenance.md)
