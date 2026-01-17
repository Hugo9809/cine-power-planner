# Auto-Gear Engine Architecture

The Auto-Gear Engine is a specialized subsystem responsible for calculating dynamic equipment requirements (e.g., "If using 24V camera, add a voltage converter").

## The Hybrid Architecture

Unlike the rest of the application (which is pure JavaScript), the Auto-Gear engine is written in **TypeScript**.

*   **Source**: `src/scripts/auto-gear/*.ts`
*   **Output**: `src/scripts/auto-gear/dist/*.js` (ES Modules)
*   **Reasoning**: The rule evaluation logic involves complex data structures (`InventoryMatcher`, `RuleSet`) that benefit significantly from strict typing to prevent runtime errors during critical exports.

## Build Pipeline

The engine does **not** rely on Vite for compilation. It uses a separate build step.

```bash
npm run build:auto-gear
```

This command:
1.  Invokes `tsc` using `tsconfig.auto-gear.json`.
2.  Outputs compiled JS to `src/scripts/auto-gear/dist/`.
3.  These JS files are then imported by the main application (`src/scripts/modules/features/auto-gear-rules.js`).

## Key Components

| Component | Responsibility |
| :--- | :--- |
| `RuleEvaluator` | Takes a `SessionState` and returns a list of required `DeviceId`s. |
| `InventoryMatcher` | Fuzzy-matches required items against the local `ownGear` database. |
| `normalizers.ts` | Ensures data consistency between the loose JS runtime and strict TS logic. |

## Development Workflow

1.  **Edit**: Modify `.ts` files in `src/scripts/auto-gear/`.
2.  **Build**: Run `npm run build:auto-gear`.
3.  **Verify**: Restart the dev server (if needed) or trigger a calculation in the app.

> **Warning**: If you change the TS code but forget to run the build script, the application will continue running into the *old* logic.

---

## Helper Module Integration

The Auto-Gear system uses helpers from the [Runtime Environment](runtime-environment.md) module:

| Helper | Source | Usage |
|--------|--------|-------|
| `ensureAutoGearGlobal` | `AutoGear` namespace | Ensures Auto-Gear globals exist with fallbacks |
| `repairAutoGearGlobals` | `AutoGear` namespace | Repairs all Auto-Gear globals on startup |
| `AUTO_GEAR_GLOBAL_FALLBACKS` | `AutoGear` namespace | Default values for Auto-Gear globals |

### Global Fallbacks

The Auto-Gear engine relies on several global variables that may not be defined at boot:

```javascript
import { AutoGear } from './helpers/auto-gear.js';

// Ensure a global exists before use
AutoGear.ensure('autoGearRules', () => []);

// Repair all Auto-Gear globals on startup
AutoGear.repair();
```

---

## Related Architecture

- [Runtime Environment](runtime-environment.md) — Auto-Gear helper utilities
- [Storage Layer](storage-layer.md) — Auto-Gear persistence (`cine_autogear:` keys)
- [Module Registry](module-registry.md) — Auto-Gear module registration

