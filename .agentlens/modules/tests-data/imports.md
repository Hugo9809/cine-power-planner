# Imports

[← Back to MODULE](MODULE.md) | [← Back to INDEX](../../INDEX.md)

## Dependency Graph

```mermaid
graph TD
    tests_data[tests-data] --> src[src]
    tests_data[tests-data] --> scripts[scripts]
    tests_data[tests-data] --> tools[tools]
    tests_data[tests-data] --> scripts[scripts]
    tests_data[tests-data] --> _babel[@babel]
    tests_data[tests-data] --> child_process[child_process]
    tests_data[tests-data] --> fs[fs]
    tests_data[tests-data] --> jsdom[jsdom]
    tests_data[tests-data] --> lz_string[lz-string]
    tests_data[tests-data] --> path[path]
```

## External Dependencies

Dependencies from other modules:

- `../../src/data`
- `../../src/scripts/translations`
- `../../tools/findMissingAttributes`
- `./src/scripts/storage.js`
- `@babel/parser`
- `child_process`
- `fs`
- `jsdom`
- `lz-string`
- `path`

