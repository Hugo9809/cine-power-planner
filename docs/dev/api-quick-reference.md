# API Quick Reference

This document provides a quick reference for the most commonly used internal APIs
in Cine Power Planner. Use it when developing features or debugging issues.

> [!NOTE]
> This is an internal API reference for developers. These APIs are not publicly
> versioned and may change between releases.

## Global Namespaces

### `window.cineModules`

The module registry containing all registered services.

```javascript
// Check if a module is available
if (window.cineModules && window.cineModules.cinePersistence) {
  // Use the persistence module
}

// Common modules
window.cineModules.cinePersistence    // Save/backup/restore
window.cineModules.cineRuntime        // Error boundaries
window.cineModules.cineUi             // Modal helpers
window.cineModules.cineOffline        // Service worker
```

### `window.cineCoreShared`

Shared state accessible across all bundles.

```javascript
// Access shared state
const shared = window.cineCoreShared || {};
shared.activeProjectId     // Current project
shared.bootComplete        // Initialization flag
```

## Runtime Bootstrap

From `src/scripts/runtime/bootstrap.js`:

### Scope Detection

```javascript
import { getPrimaryGlobalScope, getGlobalScopeCandidates } from './runtime/bootstrap.js';

// Get the primary global scope (window, globalThis, etc.)
const scope = getPrimaryGlobalScope();

// Get all candidate scopes for cross-environment code
const candidates = getGlobalScopeCandidates();
```

### Boot Queue

```javascript
import { enqueueCoreBootTask, processCoreBootQueue } from './runtime/bootstrap.js';

// Defer initialization until all modules load
enqueueCoreBootTask(() => {
  // This runs after processCoreBootQueue() is called
  console.log('Deferred initialization complete');
});

// Process all queued tasks (called after all scripts load)
processCoreBootQueue();
```

### Global Constant Exposure

```javascript
import { exposeCoreRuntimeConstant } from './runtime/bootstrap.js';

// Safely expose a value globally with fallback strategies
exposeCoreRuntimeConstant('MY_CONSTANT', { value: 42 });
```

## Persistence API

From `src/scripts/modules/persistence.js` and `src/scripts/storage.js`:

### Saving Data

```javascript
// Save current project state
window.cineModules?.cinePersistence?.saveProject(projectData);

// Trigger autosave
window.cineModules?.cinePersistence?.scheduleAutosave();

// Create a backup
window.cineModules?.cinePersistence?.createBackup();
```

### Loading Data

```javascript
// Load from storage
const devices = loadDevices();          // Equipment catalog
const setups = loadSetups();            // Rig configurations
const project = loadProject();          // Active project
const contacts = loadContacts();        // Crew roster
const ownGear = loadOwnGear();          // Personal equipment
```

### Export/Import

```javascript
// Export all data
const backup = exportAllData();
downloadJson(backup, 'planner-backup.json');

// Import data
importFromBackup(backupData, { merge: false });
```

## V2 View Manager

From `src/scripts/v2/view-manager.js`:

### Navigation

```javascript
// Navigate to a view via hash
window.location.hash = '#/projects';        // Dashboard
window.location.hash = '#/project/my-proj'; // Project detail
window.location.hash = '#/settings';        // Settings
window.location.hash = '#/help';            // Help center
```

### View Registration

```javascript
// Register a custom view
import { registerView } from './v2/view-manager.js';

registerView('my-view', {
  create: (container) => { /* render */ },
  destroy: () => { /* cleanup */ },
  title: 'My View'
});
```

## UI Helpers

From `src/scripts/modules/ui.js`:

### Modals

```javascript
// Show a modal
window.cineModules?.cineUi?.showModal({
  title: 'Confirm Action',
  message: 'Are you sure?',
  buttons: [
    { label: 'Cancel', action: 'cancel' },
    { label: 'Confirm', action: 'confirm', primary: true }
  ]
});

// Show a toast notification
window.cineModules?.cineUi?.showToast('Saved successfully', 'success');
```

### DOM Utilities

```javascript
// Safe element query with fallback
const element = safeQuerySelector('#my-element', document, null);

// Create element with attributes
const button = createElement('button', {
  className: 'primary-button',
  textContent: 'Click me',
  onclick: handleClick
});
```

## Logging

From `src/scripts/modules/logging.js`:

```javascript
// Get the structured logger
const logger = window.cineModules?.cineLogging || console;

// Log levels
logger.info('Operation completed', { details });
logger.warn('Potential issue', { context });
logger.error('Operation failed', { error });

// Log with category
logger.log('persistence', 'Saved project', { projectId });
```

## Offline Module

From `src/scripts/modules/offline.js`:

```javascript
// Check offline status
const isOffline = window.cineModules?.cineOffline?.isOffline();

// Force service worker update
window.cineModules?.cineOffline?.forceReload();

// Get cached asset list
const assets = window.cineModules?.cineOffline?.getCachedAssets();
```

## Calculation Engine

From `src/scripts/modules/results.js`:

```javascript
// Calculate power draw
const totalDraw = calculateTotalPowerDraw(devices);

// Calculate runtime
const runtime = calculateRuntime({
  batteries: [...],
  devices: [...],
  safetyMargin: 0.1
});

// Get voltage warnings
const warnings = checkVoltageThresholds(batteryVoltage, mountType);
```

## Auto Gear Rules

From `src/scripts/auto-gear/`:

```javascript
// Load automatic gear rules
import { loadAutoGearRules } from './auto-gear/storage.js';
const rules = loadAutoGearRules();

// Normalize equipment
import { normalizeDevice } from './auto-gear/normalizers.js';
const normalized = normalizeDevice(rawDevice);

// Calculate rig weight
import { calculateRigWeight } from './auto-gear/weight.js';
const weight = calculateRigWeight(devices);
```

## Contacts API

From `src/scripts/contacts/`:

```javascript
// Load contacts
import { loadContacts, saveContact, deleteContact } from './contacts/list.js';

const contacts = loadContacts();
saveContact({ name: 'John', role: 'DIT', email: 'john@example.com' });
deleteContact(contactId);

// Profile management
import { exportVCard, importVCard } from './contacts/profile.js';
const vcard = exportVCard(contact);
const imported = importVCard(vcardString);
```

## Own Gear API

From `src/scripts/own-gear/`:

```javascript
// Gear store
import { loadOwnGear, saveOwnGearItem, deleteOwnGearItem } from './own-gear/store.js';

const gear = loadOwnGear();
saveOwnGearItem({ name: 'My Camera', quantity: 2 });
deleteOwnGearItem(itemId);
```

## Event Patterns

### Custom Events

```javascript
// Dispatch a custom event
window.dispatchEvent(new CustomEvent('cine:projectSaved', {
  detail: { projectId: 'my-project' }
}));

// Listen for events
window.addEventListener('cine:projectSaved', (event) => {
  console.log('Project saved:', event.detail.projectId);
});
```

### Common Events

| Event | Payload | When |
| --- | --- | --- |
| `cine:projectSaved` | `{ projectId }` | After successful save |
| `cine:projectLoaded` | `{ projectId }` | After loading a project |
| `cine:themeChanged` | `{ theme }` | After theme toggle |
| `cine:languageChanged` | `{ language }` | After language change |
| `cine:offlineStatusChanged` | `{ isOffline }` | Network status change |

## Defensive Patterns

### Safe Module Access

```javascript
// Always check module availability
const persistence = window.cineModules?.cinePersistence;
if (persistence && typeof persistence.saveProject === 'function') {
  persistence.saveProject(data);
} else {
  console.warn('Persistence module not available');
}
```

### Deferred Initialization

```javascript
// Use boot queue for initialization that depends on other modules
import { enqueueCoreBootTask } from './runtime/bootstrap.js';

enqueueCoreBootTask(() => {
  // Safe to access other modules here
  initializeMyFeature();
});
```

### Grace Degradation

```javascript
// Provide fallbacks for optional features
function getLogger() {
  return window.cineModules?.cineLogging || {
    info: console.log,
    warn: console.warn,
    error: console.error
  };
}
```

## Related Documentation

- [Codebase Overview](docs/dev/codebase-overview.md) — Architecture reference
- [Module Registry](docs/dev/architecture/module-registry.md) — Module tokens
- [App Core Modules](docs/dev/architecture/app-core-modules.md) — Module layers
- [Schema Inventory](docs/dev/schema-inventory.md) — Data shapes
