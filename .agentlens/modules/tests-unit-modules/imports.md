# Imports

[← Back to MODULE](MODULE.md) | [← Back to INDEX](../../INDEX.md)

## Dependency Graph

```mermaid
graph TD
    tests_unit_modules[tests-unit-modules] --> core[core]
    tests_unit_modules[tests-unit-modules] --> core[core]
    tests_unit_modules[tests-unit-modules] --> overview[overview]
    tests_unit_modules[tests-unit-modules] --> overview[overview]
    tests_unit_modules[tests-unit-modules] --> overview[overview]
    tests_unit_modules[tests-unit-modules] --> modules[modules]
    tests_unit_modules[tests-unit-modules] --> ui[ui]
    tests_unit_modules[tests-unit-modules] --> _jest[@jest]
```

## External Dependencies

Dependencies from other modules:

- `../../../src/scripts/modules/core/auto-backup.js`
- `../../../src/scripts/modules/core/localization-accessors.js`
- `../../../src/scripts/modules/overview/gear-list.js`
- `../../../src/scripts/modules/overview/logging.js`
- `../../../src/scripts/modules/overview/print-manager.js`
- `../../../src/scripts/modules/text.js`
- `../../../src/scripts/modules/ui/dynamic-forms.js`
- `@jest/globals`

