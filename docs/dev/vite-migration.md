# Vite & ES Module Migration Guide

This document captures the strategy, status, and patterns for the migration from a legacy IIFE/script-tag architecture to modern ES Modules bundled with Vite.

## Architecture Overview

The codebase is in a **hybrid state** with both ESM and legacy IIFE patterns coexisting:

```
┌─────────────────────────────────────────────────────────────────┐
│                        Vite Entry                                │
│                       src/main.js                                │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐   ┌───────────────────┐   ┌───────────────────┐
│   V2 UI       │   │   Core Modules    │   │  Runtime Bootstrap│
│   (Pure ESM)  │   │   (ESM + Global)  │   │   (ESM + Global)  │
│   src/v2/     │   │ src/scripts/      │   │  src/runtime/     │
│               │   │    modules/       │   │                   │
└───────────────┘   └───────────────────┘   └───────────────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │   Legacy Core     │
                    │   (IIFE Globals)  │
                    │   src/scripts/    │
                    │      core/        │
                    └───────────────────┘
```

| Layer | Entry Point | Module Type | Status |
| --- | --- | --- | --- |
| Vite Main | `src/main.js` | ESM | ✅ Active |
| V2 UI | `src/scripts/v2/` | ESM | ✅ Complete |
| Core Modules | `src/scripts/modules/` | ESM + Global fallback | 🔄 Migrating |
| Runtime | `src/scripts/runtime/` | ESM + Global fallback | ✅ Complete |
| Legacy Core | `src/scripts/core/` | IIFE (globals) | ⏳ Pending |
| Legacy Entry | `src/scripts/loader.js` | IIFE | ⏳ Legacy support |

### Why Vite?

Vite replaces the previous `http-server` + manual script tag approach to provide:

| Benefit | Description |
| --- | --- |
| ES Module Support | Write standard `import/export` syntax |
| Hot Module Replacement | Changes reflect instantly without full reloads |
| Optimized Builds | Rollup-based tree shaking and code splitting |
| Offline Validation | Strict checks for broken imports at build time |
| Path Aliases | Clean imports using `@/`, `@scripts/`, `@data/` |

## Module Patterns

### 1. Pure ESM (V2 UI, New Code)

For new files that don't need legacy compatibility:

```javascript
// src/scripts/v2/my-feature.js

import { helperFunction } from './utils.js';
import { data } from '@data/devices/cameras.js';

export function myFeature() {
  // Implementation
}

export function anotherFeature() {
  // Implementation
}
```

### 2. ESM with Global Fallback (Core Modules)

For modules that need to support both Vite and legacy contexts:

```javascript
// src/scripts/modules/my-module.js

// Import dependencies explicitly
import { getDependency } from './dependency.js';

const internal = "secret";

export function publicMethod() {
  // Implementation using imports
}

export function anotherMethod() {
  // Implementation
}

// Maintain backward compatibility for legacy code
if (typeof window !== 'undefined' && window.cineModules) {
  window.cineModules.register('myModule', {
    publicMethod: publicMethod,
    anotherMethod: anotherMethod,
  });
}

// Also expose on globalThis for cross-environment access
if (typeof globalThis !== 'undefined') {
  globalThis.myModule = {
    publicMethod,
    anotherMethod,
  };
}
```

### 3. Legacy IIFE (Existing Code Pending Migration)

Existing pattern being migrated away from:

```javascript
// src/scripts/core/legacy-module.js
(function() {
    const internal = "secret";
    
    function publicMethod() { /* ... */ }
    
    // Expose globally
    window.cineModules.register('myModule', {
        publicMethod: publicMethod
    });
})();
```

## Importing Modules

### In V2 UI and New ESM Code

```javascript
// Direct ESM import
import { myMethod } from '@scripts/modules/my-module.js';
import { data } from '@data/devices/cameras.js';

// Use path aliases for clean imports
import { helper } from '@/scripts/helpers/utils.js';
```

### In Legacy Code (Global Fallback)

```javascript
// Access via global registry
const myModule = cineModules.get('myModule');
myModule.publicMethod();

// Or direct global access
globalThis.myModule.publicMethod();
window.myModule.publicMethod();
```

### In Hybrid Contexts

```javascript
// Safe access that works in both contexts
function getMyModule() {
  // Try ESM import first (Vite context)
  if (typeof window !== 'undefined' && window.cineModules) {
    return window.cineModules.get('myModule');
  }
  // Fallback to globalThis
  return globalThis?.myModule || null;
}
```

## Path Aliases

Vite configuration (`vite.config.js`) provides these aliases:

| Alias | Maps To | Example |
| --- | --- | --- |
| `@/` | `src/` | `import '@/main.js'` |
| `@scripts/` | `src/scripts/` | `import '@scripts/modules/ui.js'` |
| `@styles/` | `src/styles/` | `import '@styles/main.css'` |
| `@data/` | `src/data/` | `import '@data/devices/cameras.js'` |

## Adding New Features

All new feature development should happen in **Vite-first** mode:

1. **Create new files as ES Modules**
   ```javascript
   // src/scripts/features/my-feature.js
   export function myFeature() { ... }
   ```

2. **Import via main.js or other ESM files**
   ```javascript
   // src/main.js
   import { myFeature } from '@scripts/features/my-feature.js';
   ```

3. **Do NOT add script tags to index.html**
   - Vite handles bundling automatically
   - Script tags bypass the module system

4. **Run dev server to verify**
   ```bash
   npm run dev
   ```

## Converting Legacy Modules

### Step-by-Step Conversion

1. **Add ESM exports** at the top of the file:
   ```javascript
   export function existingFunction() { ... }
   ```

2. **Convert internal requires to imports**:
   ```javascript
   // Before
   const helper = require('./helper.js');
   
   // After
   import { helper } from './helper.js';
   ```

3. **Keep global registration for backward compatibility**:
   ```javascript
   // At the end of the file
   if (typeof window !== 'undefined' && window.cineModules) {
     window.cineModules.register('moduleName', { ... });
   }
   ```

4. **Update importers** to use ESM where possible:
   ```javascript
   // Modern context
   import { func } from './module.js';
   
   // Legacy context (unchanged)
   cineModules.get('moduleName').func();
   ```

5. **Test both contexts**:
   ```bash
   npm run dev      # Vite context
   npm run serve    # Legacy http-server context
   ```

## Build Configuration

### Development

```bash
npm run dev    # Start Vite dev server at localhost:3000
```

Features:
- Hot Module Replacement (HMR)
- Source maps for debugging
- Fast startup, no bundling needed

### Production

```bash
npm run build    # Build to dist/
npm run preview  # Preview production build
```

Features:
- Code splitting (V2 UI, data, modules, vendors)
- Tree shaking (removes unused code)
- Minification
- Service worker asset generation

### Code Splitting Strategy

The build outputs multiple chunks:

| Chunk | Contents |
| --- | --- |
| `index.js` | Main entry, bootstrap |
| `v2.js` | V2 UI components |
| `data.js` | Device catalogs |
| `modules.js` | Core business logic |
| `vendor.js` | Third-party dependencies |

## Troubleshooting

### "SyntaxError: Cannot use import statement outside a module"

**Cause:** A file using `import` was loaded via a standard `<script>` tag without `type="module"`.

**Fix:** 
- Ensure the file is imported via `src/main.js` or another ESM file
- Do NOT add ESM files directly to `index.html` with regular script tags
- If needed for legacy, add the global fallback pattern

### "ReferenceError: myModule is not defined"

**Cause:** Legacy code tried to access a module before it was registered globally.

**Fix:**
1. Check module loading order in `main.js`
2. ESM modules run deferred; legacy IIFEs run immediately
3. Use the boot queue for deferred initialization:
   ```javascript
   import { enqueueCoreBootTask } from '@scripts/runtime/bootstrap.js';
   
   enqueueCoreBootTask(() => {
     // Safe to access modules here
     myModule.init();
   });
   ```
4. Or add explicit global exposure:
   ```javascript
   if (typeof window !== 'undefined') {
     window.myModule = { ... };
   }
   ```

### Build Errors in `dist/`

**Cause:** Broken path imports or missing files.

**Fix:**
1. Run `npm run build` locally to see detailed Rollup errors
2. Vite strictly validates all static imports
3. Check for typos in import paths
4. Ensure all imported files exist

### HMR Not Working

**Cause:** File not connected to the module graph.

**Fix:**
1. Ensure the file is imported (directly or transitively) from `main.js`
2. Check browser DevTools console for HMR errors
3. Try a full page refresh if HMR gets stuck

### Path Alias Not Resolving

**Cause:** Missing alias configuration or wrong syntax.

**Fix:**
1. Check `vite.config.js` has the alias defined
2. Use the correct prefix (`@/`, `@scripts/`, etc.)
3. Restart the dev server after config changes

## Migration Progress

### Completed ✅

- [x] Vite configuration and dev server
- [x] V2 UI components (`src/scripts/v2/`)
- [x] Runtime bootstrap (`src/scripts/runtime/`)
- [x] Path aliases configuration
- [x] Service worker integration

### In Progress 🔄

- [ ] Core modules (`src/scripts/modules/`) — hybrid ESM + global
- [ ] Auto-gear modules (`src/scripts/auto-gear/`)
- [ ] Contacts modules (`src/scripts/contacts/`)
- [ ] Own-gear modules (`src/scripts/own-gear/`)

### Pending ⏳

- [ ] Legacy core files (`src/scripts/core/`)
- [ ] Remove global fallbacks after legacy removal
- [ ] Full tree shaking optimization

## Related Documentation

- [Codebase Overview](codebase-overview.md) — Architecture reference
- [Module Registry](architecture/module-registry.md) — Module tokens
- [Development Guide](development.md) — npm scripts and workflow
