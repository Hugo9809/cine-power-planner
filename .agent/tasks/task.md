# Tasks

- [x] Fix `downloadSharedProject` ReferenceError in `app-session.js` <!-- id: 0 -->
- [x] Investigate and fix infinite recursion in `updateCalculations` <!-- id: 1 -->
    - [x] Check definition of `updateCalculations` in `app-core-new-2.js` <!-- id: 2 -->
    - [x] Ensure `app-session.js` wrapper doesn't call itself <!-- id: 3 -->
- [x] Migrate `app-session.js` specific logic to ESM modules <!-- id: 4 -->
    - [x] Extract `notifications.js` and add unit tests <!-- id: 5 -->
    - [x] Extract `session-runtime.js` and add unit tests <!-- id: 6 -->
    - [x] Migrate `web-lock-manager` to `ProjectLockService` with legacy adapter <!-- id: 7 -->
- [x] Migrate Settings & Appearance Logic <!-- id: 8 -->
    - [x] Refactor `settings-and-appearance.js` to ESM <!-- id: 9 -->
    - [x] Update `app-session.js` to import settings module directly <!-- id: 10 -->
    - [x] Remove dynamic appearance binding from `app-session.js` <!-- id: 11 -->
