# Offline Cache & Safeguard Verification Drill

This drill proves that the offline bundle cached by Cine Power Planner matches the
source repository and that every safeguard needed to protect user data survives a
network outage. Run it whenever you upgrade dependencies, adjust the service
worker manifest or touch assets that ship with the offline bundle. The steps
assume you have already rehearsed the [Save, Share & Import Drill](../README.md#save-share--import-drill)
and the [Backup & Recovery](../README.md#backup--recovery) workflow. Complete this
documented drill before handing the app to crews working without connectivity.

> **When to run this drill**
>
> - Before distributing a refreshed offline bundle to stage or field
>   workstations.
> - After merging changes to `service-worker.js`, `service-worker-assets.js`,
>   icons, fonts or other locally stored media.
> - After modifying persistence, backup or restore flows that rely on cached
>   modules.

## 1. Prepare the environment

1. **Generate service-worker assets.** From the project root run `npm run
   generate:sw-assets` (or `npm run build:sw` if you maintain a custom alias)
   so `service-worker-assets.js` lists every bundled file. Record the timestamp
   in your verification log.
2. **Prime caches in a clean profile.** Launch a browser profile with an empty
   cache, open `index.html` over HTTP(S) and wait for the service worker to
   install. Visit each primary view—Planner, Help, Settings, Legal pages and the
   Quick safeguards panel—so the worker caches their assets.
3. **Capture a baseline backup.** Use **Settings → Backup & Restore → Backup**
   to download `planner-backup.json` before disconnecting the network. This file
   becomes your reference if anything behaves unexpectedly while offline.

## 2. Disconnect and verify runtime behaviour

1. **Drop all connectivity.** Disable Wi‑Fi, unplug Ethernet or enable Airplane
   Mode. Confirm the offline indicator flashes in the header when you reload
   `index.html`.
2. **Reload the app from cache.** Close all Cine Power Planner tabs, relaunch
   `index.html` and confirm the interface matches your primed state. Verify that
   locally stored Uicons render, typography overrides persist and the accent
   theme stays applied.
3. **Confirm service worker freshness.** Open the browser’s application panel
   and inspect the `Last-Modified` timestamp for `service-worker.js` and
   `service-worker-assets.js`. Ensure they match the build you prepared. If
   updates are pending, use the in-app **Force reload** button to stage them,
   then repeat the cache priming steps before continuing.
4. **Audit cached requests.** In the application panel, inspect the Cache
   Storage entries. Confirm each cached request resolves to a local file path.
   Pay special attention to Uicons, fonts, legal pages and help topic bundles so
   translations and offline manuals remain available without the network.

## 3. Exercise persistence without connectivity

1. **Manual save rehearsal.** Create a test project, press **Ctrl+S** (`⌘S` on
   macOS) and confirm it appears in the project selector with the current
   timestamp.
2. **Autosave verification.** Make at least 50 minor edits (device toggles,
   scenario adjustments or note changes) and wait ten minutes, whichever occurs
   first. Verify an autosave entry appears in the selector with the expected
   timestamp and suffix.
3. **Backup guardian check.** Open **Settings → Data & Storage** and confirm the
   **Backup guardian** row mirrors your latest manual save and autosave activity.
   Expand the diagnostics log to ensure no warnings reference storage or cache
   failures.
4. **Forced pre-restore safeguard.** Import your earlier `planner-backup.json`
   into a separate browser profile (still offline). Confirm the forced
   pre-restore backup triggers before the import completes and that the
   resulting timestamped file appears in the downloads folder.
5. **Share bundle integrity.** Export a project bundle, import it into the
   secondary profile and confirm gear lists, runtime intelligence panels and
   locally stored icons match the source profile exactly.

## 4. Document the outcome

1. **Record verification signals.** In the console capture the output of
   `window.__cineRuntimeIntegrity` and `window.cineRuntime.verifyCriticalFlows({
   warnOnFailure: true })`. Attach the results to your verification log so
   offline operators can prove the runtime initialised correctly.【F:src/scripts/script.js†L92-L183】
2. **Archive artefacts.** Store the baseline backup, the forced pre-restore
   backup and the imported project bundle alongside a ZIP of the repository
   commit you validated. Copy the set to at least two offline drives kept in
   separate cases.
3. **Update documentation packets.** Note the drill date, browser build and
   operator initials inside the [Documentation Verification Packet](documentation-verification-packet.md)
   so auditors can trace which offline cache you signed off.

## 2025-02 cache verification snapshot
- **Service worker version audit.** Confirmed the worker still imports the shared module to determine
  `APP_VERSION` and publish the cache name, so this drill continues to verify the correct cache build.【F:service-worker.js†L192-L229】
- **Offline UI coverage.** Re-checked that the help dialog, Backup & Restore panel and Data & Storage
  dashboard continue to render while offline, ensuring the drill exercises the same surfaces the code
  protects.【F:index.html†L2501-L2574】【F:index.html†L2722-L2799】【F:index.html†L3019-L3095】
- **Persistence mirror check.** Verified the critical storage guard still mirrors planner keys at launch,
  so caches tested here also cover redundant backups before operators go offline.【F:src/scripts/storage.js†L2850-L3003】

Completing this drill ensures the cached application, bundled assets and
persistence safeguards remain in lockstep, keeping user data safe even when crews
work entirely offline.

> _2025-02 alignment:_ Verified instructions against the current runtime guard and Backup & Restore UI so offline rehearsals match the shipped safeguards.【F:src/scripts/modules/runtime.js†L2203-L2368】【F:index.html†L2501-L2560】
