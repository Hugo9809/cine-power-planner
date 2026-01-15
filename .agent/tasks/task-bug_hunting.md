# Tasks - Bug Hunting & Migration Verification

- [x] **Fix Persistence Sync (`Save` Bug)**
    - [x] Hook `saveSetupBtn` in `legacy-shim.js` for Reverse Sync (Legacy -> Native IDB).
    - [x] Hook `deleteSetupBtn` in `legacy-shim.js` for Delete Sync.
- [x] **Fix Export Consistency (`Share` Bug)**
    - [x] Implement Pre-Share Save Hook in `legacy-shim.js` to ensure memory is populated before export.
- [ ] **Verify Import / Data Integrity**
    - [ ] Test importing a project JSON file into the V2 Dashboard.
    - [ ] Verify Imported project appears and loads correctly.
- [ ] **Verify Device Library Integration**
    - [ ] Add a Custom Device in "Device Library".
    - [ ] Ensure it appears in the Project Detail dropdowns.
- [ ] **Verify Offline Mode**
    - [ ] Simulate Offline Mode.
    - [ ] Reload App and ensure Dashboard and Projects load.
