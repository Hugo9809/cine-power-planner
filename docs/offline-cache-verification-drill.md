# Offline cache verification drill

Run this drill after updating service worker assets, help copy or translations. It proves that the app
rebuilds caches correctly and that offline crews retain access to every guide.

## Preparation
- Build or fetch the latest release bundle and open the planner from disk.
- Ensure a manual backup and project bundle exist so you can restore if anything fails.【F:index.html†L2501-L2573】

## Drill steps
1. **Prime the current cache.** Navigate through help topics, legal pages and settings panels to load
   icons, fonts and documentation assets into the existing cache.【F:index.html†L1-L120】
2. **Clear caches via API.** In the developer console run `window.cineOffline.__internal.clearCacheStorage()`
   and confirm the promise resolves without errors.【F:src/scripts/modules/offline.js†L2555-L2606】
3. **Force reload.** Trigger `window.location.reload()` or the in-app Force reload control. The service
   worker re-registers and repopulates the cache using the bundled asset list.【F:service-worker.js†L192-L240】
4. **Verify assets.** With the network disabled, refresh the page. Confirm help entries, localized
   READMEs, icons and fonts render correctly. Open Settings → Backup & Restore and Settings → Data & Storage
   to ensure UI text loads from cache.【F:index.html†L2501-L2778】
5. **Record evidence.** Capture screenshots of the offline UI and note the time, browser and machine in the
   verification log.【F:docs/verification-log-template.md†L12-L67】

## Post-drill
- If any asset fails to load, regenerate `service-worker-assets.js`, rerun the drill and update the
  documentation update checklist with the issue and fix.【F:package.json†L6-L21】【F:docs/documentation-update-checklist.md†L1-L68】
- Store the console output, screenshots and notes in the documentation verification packet for the current
  release.【F:docs/documentation-verification-packet.md†L1-L48】

Completing this drill ensures offline operators always have access to up-to-date help, translations and
legal copy without risking cached data integrity.【F:src/scripts/modules/offline.js†L2555-L2606】【F:service-worker.js†L192-L240】
