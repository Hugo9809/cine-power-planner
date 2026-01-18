# Imports

[← Back to MODULE](MODULE.md) | [← Back to INDEX](../../INDEX.md)

## Dependency Graph

```mermaid
graph TD
    tests_dom[tests-dom] --> devices[devices]
    tests_dom[tests-dom] --> data[data]
    tests_dom[tests-dom] --> scripts[scripts]
    tests_dom[tests-dom] --> contacts[contacts]
    tests_dom[tests-dom] --> core[core]
    tests_dom[tests-dom] --> features[features]
    tests_dom[tests-dom] --> own_gear[own-gear]
    tests_dom[tests-dom] --> scripts[scripts]
    tests_dom[tests-dom] --> v2[v2]
    tests_dom[tests-dom] --> helpers[helpers]
    tests_dom[tests-dom] --> helpers[helpers]
    tests_dom[tests-dom] --> helpers[helpers]
    tests_dom[tests-dom] --> _jest[@jest]
    tests_dom[tests-dom] --> fs[fs]
    tests_dom[tests-dom] --> jsdom[jsdom]
    tests_dom[tests-dom] --> lz_string[lz-string]
    tests_dom[tests-dom] --> path[path]
    tests_dom[tests-dom] --> perf_hooks[perf_hooks]
    tests_dom[tests-dom] --> util[util]
    tests_dom[tests-dom] --> vm[vm]
```

## External Dependencies

Dependencies from other modules:

- `../../src/data/devices/index.js`
- `../../src/data/rental-houses.js`
- `../../src/scripts/app-setups.js`
- `../../src/scripts/contacts/profile.js`
- `../../src/scripts/core/app-events.js`
- `../../src/scripts/modules/features/help-content.js`
- `../../src/scripts/own-gear/view.js`
- `../../src/scripts/storage.js`
- `../../src/scripts/v2/legacy-shim.js`
- `../helpers/domUtils`
- `../helpers/runtimeLoader`
- `../helpers/scriptEnvironment`
- `@jest/globals`
- `fs`
- `jsdom`
- `lz-string`
- `path`
- `perf_hooks`
- `util`
- `vm`

