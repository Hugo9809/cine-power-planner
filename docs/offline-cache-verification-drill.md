# Offline Cache & Safeguard Verification Drill

Run this drill after updating service-worker assets, adding icons or changing
persistence behaviour. It confirms offline builds stay complete and that save,
backup and restore safeguards work without connectivity.

## Preparation

- Install dependencies and build the app if necessary.
- Clear existing service-worker caches for the app domain.
- Ensure planner backups and project bundles from the previous release are
  available for comparison.

## Drill steps

1. **Prime the build**
   - Load `index.html` in the browser.
   - Open the help dialog, legal pages and settings to cache all bundled assets
     (icons, fonts, docs, translations).
   - Confirm the offline indicator reports that the app is ready.
2. **Enter offline mode**
   - Disconnect from the network or enable airplane mode.
   - Reload the page. Verify the UI, icons and fonts render correctly.
3. **Exercise safeguards**
   - Create a test project, adjust gear, and trigger manual saves and autosaves.
   - Wait for an automatic backup or force one via a project switch.
   - Export a planner backup and a project bundle.
   - Restore the planner backup using **Restore rehearsal**.
4. **Inspect storage**
   - Run `window.cineRuntime.verifyCriticalFlows()` and save the console output.
   - Verify `auto-backup-*` entries exist with recent timestamps.
   - Confirm automatic gear presets, custom gear and runtime feedback entries are
     present.
5. **Return online**
   - Reconnect and allow the service worker to check for updates.
   - Capture the service worker version displayed in settings.

## Archive results

- Store the console output, screenshots, exported backups and bundles alongside
  the updated [Documentation Verification Packet](documentation-verification-packet.md).
- Update the [Verification Log](verification-log-template.md) with drill results.

Completing this drill proves the cached build is trustworthy and that user data
remains protected without a network connection.
