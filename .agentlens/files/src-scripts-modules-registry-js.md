# src/scripts/modules/registry.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 1006
- **Language:** JavaScript
- **Symbols:** 33
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 43 | fn | resolveImmutability | (private) | `function resolveImmutability(scope) {` |
| 92 | fn | createFallbackImmutability | (private) | `function createFallbackImmutability() {` |
| 97 | fn | shouldBypass | (private) | `function shouldBypass(value) {` |
| 139 | fn | freeze | (private) | `function freeze(value, seen = new WeakSet()) {` |
| 187 | fn | getImmutability | (private) | `function getImmutability() {` |
| 200 | fn | freezeDeep | (private) | `function freezeDeep(value, seen) {` |
| 212 | fn | normalizeName | (private) | `function normalizeName(name) {` |
| 222 | fn | normalizeConnections | (private) | `function normalizeConnections(value) {` |
| 281 | fn | register | (private) | `function register(name, moduleApi, options = {}) {` |
| 329 | fn | get | (private) | `function get(name) {` |
| 336 | fn | has | (private) | `function has(name) {` |
| 341 | fn | list | (private) | `function list() {` |
| 345 | fn | describe | (private) | `function describe(name) {` |
| 361 | fn | normalizeNameCollection | (private) | `function normalizeNameCollection(value) {` |
| 394 | fn | normalizeCategoryCollection | (private) | `function normalizeCategoryCollection(value) {` |
| 428 | fn | describeAll | (private) | `function describeAll(options = {}) {` |
| 472 | fn | assertRegistered | (private) | `function assertRegistered(names) {` |
| 493 | fn | resetForTests | (private) | `function resetForTests(options = {}) {` |
| 530 | fn | getTimerDescriptor | (private) | `function getTimerDescriptor(scope) {` |
| 539 | fn | assignHidden | (private) | `function assignHidden(scope, key, value) {` |
| 566 | fn | cancelPendingFlush | (private) | `function cancelPendingFlush(scope) {` |
| 584 | fn | schedulePendingFlush | (private) | `function schedulePendingFlush(scope) {` |
| 624 | fn | flushPendingRegistrations | (private) | `function flushPendingRegistrations(scope) {` |
| 669 | fn | collectQueueScopes | (private) | `function collectQueueScopes(preferredScope) {` |
| 672 | fn | pushScope | (private) | `function pushScope(candidate) {` |
| 691 | fn | readQueueFromScope | (private) | `function readQueueFromScope(scope) {` |
| 705 | fn | ensureQueueOnScope | (private) | `function ensureQueueOnScope(scope) {` |
| 735 | fn | resolveQueueDescriptor | (private) | `function resolveQueueDescriptor(preferredScope) {` |
| 749 | fn | queueRegistrationPayload | (private) | `function queueRegistrationPayload(scope, payloa...` |
| 779 | fn | createBlueprint | (private) | `function createBlueprint(options = {}) {` |
| 815 | fn | buildRegistrationOptions | (private) | `function buildRegistrationOptions(overrides) {` |
| 854 | fn | instantiate | (private) | `function instantiate(context) {` |
| 895 | fn | registerBlueprint | (private) | `function registerBlueprint(options = {}) {` |

