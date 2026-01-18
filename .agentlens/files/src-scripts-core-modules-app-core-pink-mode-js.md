# src/scripts/core/modules/app-core/pink-mode.js

[← Back to Module](../modules/src-scripts-core-modules-app-core/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 2332
- **Language:** JavaScript
- **Symbols:** 90
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 17 | fn | isObject | (private) | `function isObject(value) {` |
| 21 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 33 | fn | ensureFunction | (private) | `function ensureFunction(candidate, fallback) {` |
| 41 | fn | detectScope | (private) | `function detectScope(primary) {` |
| 65 | fn | appendUniqueScope | (private) | `function appendUniqueScope(scopes, scope, seen) {` |
| 91 | fn | collectFallbackScopes | (private) | `function collectFallbackScopes(options) {` |
| 112 | fn | findLoaderFactory | (private) | `function findLoaderFactory(methodName, context) {` |
| 119 | fn | addCandidate | (private) | `function addCandidate(candidate) {` |
| 187 | fn | createDefaultLastResortApi | (private) | `function createDefaultLastResortApi() {` |
| 193 | fn | ensureSafePromise | (private) | `function ensureSafePromise(value) {` |
| 218 | fn | noop | (private) | `function noop() { }` |
| 220 | fn | trimMarkup | (private) | `function trimMarkup(markup) {` |
| 257 | fn | resolvePinkModeSupportApi | (private) | `function resolvePinkModeSupportApi(options) {` |
| 357 | fn | isObject | (private) | `function isObject(value) {` |
| 361 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 385 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 397 | fn | ensureScope | (private) | `function ensureScope(candidate, fallback) {` |
| 405 | fn | registerScope | (private) | `function registerScope(scopes, scope) {` |
| 415 | fn | ensureFallbackScopes | (private) | `function ensureFallbackScopes(candidateScopes, ...` |
| 426 | fn | ensureResolveCoreSupportModule | (private) | `function ensureResolveCoreSupportModule(candida...` |
| 481 | fn | createPinkModeSupportLastResortApi | (private) | `function createPinkModeSupportLastResortApi() {` |
| 515 | fn | ensureSafePromise | (private) | `function ensureSafePromise(value) {` |
| 540 | fn | noop | (private) | `function noop() { }` |
| 542 | fn | ensurePinkModeLottieRuntime | (private) | `function ensurePinkModeLottieRuntime() {` |
| 598 | fn | attemptResolvePinkModeSupport | (private) | `function attemptResolvePinkModeSupport(candidat...` |
| 622 | fn | resolvePinkModeSupportApi | (private) | `function resolvePinkModeSupportApi(options) {` |
| 728 | fn | isObject | (private) | `function isObject(value) {` |
| 732 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 756 | fn | ensureScope | (private) | `function ensureScope(candidate, fallbackScope) {` |
| 764 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 776 | fn | ensureResolveCoreSupportModule | (private) | `function ensureResolveCoreSupportModule(candida...` |
| 832 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(primaryScope, s...` |
| 835 | fn | register | (private) | `function register(scope) {` |
| 851 | fn | createInlinePinkModeFallbackApi | (private) | `function createInlinePinkModeFallbackApi() {` |
| 885 | fn | ensureSafePromise | (private) | `function ensureSafePromise(value) {` |
| 911 | fn | trimMarkup | (private) | `function trimMarkup(markup) {` |
| 915 | fn | noop | (private) | `function noop() { }` |
| 917 | fn | returnFalse | (private) | `function returnFalse() {` |
| 921 | fn | returnNull | (private) | `function returnNull() {` |
| 925 | fn | returnZero | (private) | `function returnZero() {` |
| 929 | fn | ensurePinkModeLottieRuntime | (private) | `function ensurePinkModeLottieRuntime() {` |
| 985 | fn | resolvePinkModeSupportBridgeFactory | (private) | `function resolvePinkModeSupportBridgeFactory(op...` |
| 1054 | fn | resolvePinkModeFallbackFactory | (private) | `function resolvePinkModeFallbackFactory(options) {` |
| 1123 | fn | callCreateBridge | (private) | `function callCreateBridge(factory, options) {` |
| 1146 | fn | callCreateFallback | (private) | `function callCreateFallback(factory, options) {` |
| 1169 | fn | createPinkModeSupportApi | (private) | `function createPinkModeSupportApi(options) {` |
| 1254 | fn | isObject | (private) | `function isObject(value) {` |
| 1258 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 1282 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 1294 | fn | ensureScope | (private) | `function ensureScope(candidate, fallback) {` |
| 1302 | fn | ensureResolveCoreSupportModule | (private) | `function ensureResolveCoreSupportModule(candida...` |
| 1359 | fn | hasOwn | (private) | `function hasOwn(source, key) {` |
| 1367 | fn | createSafeResolvedPromise | (private) | `function createSafeResolvedPromise(value) {` |
| 1392 | fn | createPinkModeFallback | (private) | `function createPinkModeFallback() {` |
| 1428 | fn | trimMarkup | (private) | `function trimMarkup(markup) {` |
| 1432 | fn | noop | (private) | `function noop() { }` |
| 1434 | fn | returnFalse | (private) | `function returnFalse() {` |
| 1438 | fn | returnNull | (private) | `function returnNull() {` |
| 1442 | fn | returnZero | (private) | `function returnZero() {` |
| 1446 | fn | ensurePinkModeLottieRuntime | (private) | `function ensurePinkModeLottieRuntime() {` |
| 1502 | fn | collectSupportCandidates | (private) | `function collectSupportCandidates(primaryScope,...` |
| 1505 | fn | register | (private) | `function register(scope) {` |
| 1521 | fn | extractPinkModeSupportModule | (private) | `function extractPinkModeSupportModule(candidate) {` |
| 1549 | fn | resolveSupportModule | (private) | `function resolveSupportModule(options, fallback...` |
| 1621 | fn | createPinkModeRuntime | (private) | `function createPinkModeRuntime(options) {` |
| 1647 | fn | withFallback | (private) | `function withFallback(candidate, fallback) {` |
| 1755 | fn | isObject | (private) | `function isObject(value) {` |
| 1759 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 1783 | fn | createSafeResolvedPromise | (private) | `function createSafeResolvedPromise(value) {` |
| 1809 | fn | trimMarkup | (private) | `function trimMarkup(markup) {` |
| 1813 | fn | noop | (private) | `function noop() { }` |
| 1815 | fn | returnFalse | (private) | `function returnFalse() {` |
| 1819 | fn | returnNull | (private) | `function returnNull() {` |
| 1823 | fn | returnZero | (private) | `function returnZero() {` |
| 1827 | fn | createPinkModeFallbackApi | (private) | `function createPinkModeFallbackApi() {` |
| 1890 | fn | isObject | (private) | `function isObject(value) {` |
| 1894 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 1918 | fn | ensureScope | (private) | `function ensureScope(candidate, fallbackScope) {` |
| 1926 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 1938 | fn | ensureResolveCoreSupportModule | (private) | `function ensureResolveCoreSupportModule(candida...` |
| 1993 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(primaryScope, s...` |
| 2021 | fn | resolvePinkModeRuntimeFactory | (private) | `function resolvePinkModeRuntimeFactory(options) {` |
| 2089 | fn | resolvePinkModeFallbackFactory | (private) | `function resolvePinkModeFallbackFactory(options) {` |
| 2157 | fn | createLastResortPinkModeFallbackApi | (private) | `function createLastResortPinkModeFallbackApi() {` |
| 2163 | fn | ensureSafePromise | (private) | `function ensureSafePromise(value) {` |
| 2188 | fn | trimMarkup | (private) | `function trimMarkup(markup) {` |
| 2192 | fn | noop | (private) | `function noop() { }` |
| 2227 | fn | callCreatePinkModeRuntime | (private) | `function callCreatePinkModeRuntime(factory, opt...` |
| 2248 | fn | callCreatePinkModeFallback | (private) | `function callCreatePinkModeFallback(factory) {` |
| 2263 | fn | createPinkModeSupportBridge | (private) | `function createPinkModeSupportBridge(options) {` |

