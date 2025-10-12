# Offline Cache & Safeguard Verification Drill

Run this drill after updating service worker assets, adding icons or changing
persistence behaviour. It confirms offline builds stay complete and that save,
backup and restore safeguards work without connectivity.

## Preparation

- Install dependencies and build the app if necessary.
- Clear existing service worker caches for the app domain.
- Ensure planner backups, project bundles and translation exports from the
  previous release are available for comparison.
- Note the current commit hash and browser version.

## Drill steps

1. **Prime the build**
   - Load `index.html` in the browser.
   - Open the help dialog, legal pages and settings to cache bundled assets
     (icons, fonts, docs, translations).
   - Confirm offline indicators report readiness.
2. **Enter offline mode**
   - Disconnect from the network or enable airplane mode.
   - Reload the page and verify the UI, icons and fonts render correctly.
3. **Exercise safeguards**
   - Create a rehearsal project, adjust gear and trigger manual saves plus
     autosaves.
   - Wait for an automatic backup or force one via a project switch.
   - Export a planner backup, project bundle and translation bundle.
   - Restore the planner backup using **Restore rehearsal** and confirm autosave
     ledgers replay.
4. **Inspect storage**
   - Run `window.cineRuntime.verifyCriticalFlows()` and save console output.
   - Confirm recent `auto-backup-*` entries, mirrored keys for automatic gear,
     custom gear and runtime feedback.
   - Record storage quota usage for future comparison.
5. **Return online**
   - Reconnect, allow the service worker to check for updates and capture the
     version displayed in settings.

## Archive results

- Store console output, screenshots, exported backups, bundles and translation
  files alongside the updated [Documentation Verification Packet](documentation-verification-packet.md).
- Update the [Verification Log](verification-log-template.md) with drill results
  and reference checksum manifests.

Completing this drill proves the cached build is trustworthy and that user data
remains protected without a network connection.
