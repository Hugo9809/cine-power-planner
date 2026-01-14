# Task: Debugging Project Loading & CSP Issues

- [x] Investigate and fix CSP violation for worker creation <!-- id: 0 -->
    - [x] Check `index.html` for meta tags <!-- id: 1 -->
    - [x] Check `vite.config.js` (if strictly serving via Vite headers) <!-- id: 2 -->
    - [x] Add `worker-src 'self' blob:;` to CSP <!-- id: 3 -->
- [x] Investigate `LegacyShim` "Project not found" error <!-- id: 4 -->
    - [x] Analyze `legacy-shim.js` logic for `loadProject` <!-- id: 5 -->
    - [x] Verify storage keys in `storage.js` or `migration-service.js` <!-- id: 6 -->
- [x] Fix potential infinite loop/race condition in Project Dashboard <!-- id: 7 -->
- [x] Verify project "test" loads correctly <!-- id: 8 -->
