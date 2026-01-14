# Tasks

- [x] Fix Project Creation Issues <!-- id: 0 -->
    - [x] Unify "Add Project" button behavior <!-- id: 1 -->
        - [x] Verify bindings for Header Button, Tile Button, and Empty State Button <!-- id: 2 -->
        - [x] Ensure all call `showCreateProjectDialog` <!-- id: 3 -->
    - [x] Fix Project Saving Race Condition <!-- id: 4 -->
        - [x] Refactor `createProject` in `project-dashboard.js` to be async <!-- id: 5 -->
        - [x] Implement Promise-based polling for legacy save completion <!-- id: 6 -->
        - [x] Update `handleCreate` in modal to await creation before closing/navigating <!-- id: 7 -->
    - [x] Verify Fixes <!-- id: 8 -->
        - [x] Test creating project via Header Button <!-- id: 9 -->
        - [x] Test creating project via Tile/Empty State <!-- id: 10 -->
        - [x] Verify project persists after navigation <!-- id: 11 -->
