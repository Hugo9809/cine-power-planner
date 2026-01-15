# Runtime Event Reference

The application uses a hybrid event system to coordinate between the legacy core, V2 UI, and background modules.

## Global Events (`document`)

These events are dispatched on `document` and can be listened to by any module.

| Event Name | Dispatcher | Payload (`e.detail`) | Trigger |
| :--- | :--- | :--- | :--- |
| `cine:projectLoaded` | `app-session.js` | `{ projectId: string, data: object }` | When a project is fully hydrated from storage. |
| `cine:setupselect:populated` | `app-setups.js` | `{ count: number }` | After the project dropdown options are rebuilt. |
| `cine:auto-save-notification` | `app-core-new-2.js` | `{ type: 'success'\|'error', timestamp: number }` | When autosave completes. |
| `cine:offline-status` | `offline.js` | `{ online: boolean }` | Network state changes. |
| `gearlist:deleted` | `app-setups.js` | `{ setupCookie: string }` | After a project is deleted. |
| `own-gear-data-changed` | `app-core-new-1.js` | `null` | When Own Gear inventory changes. |
| `device-library:show-details` | `app-events.js` | `{ deviceId: string }` | Request to open V2 Device Details panel. |
| `cine-loader-complete` | `main.js` | `null` | When the app boot sequence finishes. |
| `restoreRehearsalProceed` | `app-session.js` | `{ timestamp: number }` | User confirmed restore proceeding. |

## V2 UI Events (`cineUi`)

These events are typically strictly for UI coordination.

*   `v2:viewchange`: Dispatched when the router changes views.
*   `v2:themechange`: Dispatched when Dark/Pink/Light mode toggles.

## Legacy Events (`window.jQuery`)

> [!WARNING]
> Deprecated. Do not add new listeners for these.

*   `$('#setupSelect').trigger('change')`: Used to signal project selection changes.
*   `$('.batt-check').trigger('change')`: Used to signal battery configuration updates.

## Best Practices

1.  **Prefix New Events**: Use `cine:<feature>:<action>` (e.g., `cine:auth:login`).
2.  **Use `detail`**: Always wrap payload in `{ detail: { ... } }`.
3.  **Clean Up**: Removing listeners in `unmount()` is mandatory for SPA views.
