# legacy/scripts/core/modules/app-core/bootstrap.js

[← Back to Module](../modules/legacy-scripts-core-modules-app-core/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 1519
- **Language:** JavaScript
- **Symbols:** 55
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 1 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 5 | fn | isObject | (private) | `function isObject(value) {` |
| 8 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 17 | fn | ensureArray | (private) | `function ensureArray(value) {` |
| 20 | fn | registerScope | (private) | `function registerScope(scopes, scope) {` |
| 28 | fn | attemptFactory | (private) | `function attemptFactory(factory, factoryOptions) {` |
| 40 | fn | normalizeBootstrapInvocationOptions | (private) | `function normalizeBootstrapInvocationOptions(ba...` |
| 57 | fn | applyOverrides | (private) | `function applyOverrides(source) {` |
| 103 | fn | collectBootstrapFallbackScopes | (private) | `function collectBootstrapFallbackScopes(options) {` |
| 176 | fn | getBootstrapEnvironmentTools | (private) | `function getBootstrapEnvironmentTools(options) {` |
| 185 | fn | getBootstrapResultsTools | (private) | `function getBootstrapResultsTools(options) {` |
| 194 | fn | getBootstrapFallbackTools | (private) | `function getBootstrapFallbackTools(options) {` |
| 203 | fn | getBootstrapResolverTools | (private) | `function getBootstrapResolverTools(options) {` |
| 209 | fn | appendFallbackScopes | (private) | `function appendFallbackScopes(scopes, runtimeSc...` |
| 232 | fn | resolveNamespace | (private) | `function resolveNamespace(namespaceName, requir...` |
| 276 | fn | resolveBootstrapTools | (private) | `function resolveBootstrapTools(options) {` |
| 279 | fn | resolveBootstrapFallbackTools | (private) | `function resolveBootstrapFallbackTools(options) {` |
| 282 | fn | cloneResolverOptions | (private) | `function cloneResolverOptions(options, directNa...` |
| 289 | fn | resolveBootstrapEnvironmentTools | (private) | `function resolveBootstrapEnvironmentTools(optio...` |
| 293 | fn | resolveBootstrapResultsTools | (private) | `function resolveBootstrapResultsTools(options) {` |
| 297 | fn | collectEnvironmentFallbackScopes | (private) | `function collectEnvironmentFallbackScopes(optio...` |
| 302 | fn | hasBootstrapResolverCapabilities | (private) | `function hasBootstrapResolverCapabilities(candi...` |
| 305 | fn | resolveBootstrapResolverTools | (private) | `function resolveBootstrapResolverTools(options) {` |
| 350 | fn | resolveBootstrapToolsWithResolver | (private) | `function resolveBootstrapToolsWithResolver(opti...` |
| 405 | fn | resolveBootstrapFallbackToolsWithResolver | (private) | `function resolveBootstrapFallbackToolsWithResol...` |
| 463 | fn | createInlineLocalizationFallbackWithResolver | (private) | `function createInlineLocalizationFallbackWithRe...` |
| 488 | fn | createInlineRuntimeSharedFallbackWithResolver | (private) | `function createInlineRuntimeSharedFallbackWithR...` |
| 512 | fn | fallbackResolveRuntimeSharedFromGlobal | (private) | `function fallbackResolveRuntimeSharedFromGlobal...` |
| 549 | fn | createBootstrapEnvironment | (private) | `function createBootstrapEnvironment(options) {` |
| 584 | fn | createInlineLocalizationFallbackWithEnvironment | (private) | `function createInlineLocalizationFallbackWithEn...` |
| 595 | fn | createInlineRuntimeSharedFallbackWithEnvironment | (private) | `function createInlineRuntimeSharedFallbackWithE...` |
| 608 | fn | collectAdditionalFallbackScopes | (private) | `function collectAdditionalFallbackScopes(extraS...` |
| 625 | fn | collectResultsFallbackScopes | (private) | `function collectResultsFallbackScopes(options) {` |
| 655 | fn | createLocalizationFallbackSkeleton | (private) | `function createLocalizationFallbackSkeleton() {` |
| 681 | fn | createRuntimeSharedFallbackSkeleton | (private) | `function createRuntimeSharedFallbackSkeleton(op...` |
| 684 | fn | fallbackResolveRuntimeSharedFromGlobal | (private) | `function fallbackResolveRuntimeSharedFromGlobal...` |
| 721 | fn | resolveLocalizationBootstrapResult | (private) | `function resolveLocalizationBootstrapResult(opt...` |
| 765 | fn | resolveRuntimeSharedBootstrapResult | (private) | `function resolveRuntimeSharedBootstrapResult(op...` |
| 820 | fn | createLocalizationBootstrapFallback | (private) | `function createLocalizationBootstrapFallback() {` |
| 846 | fn | createLocalizationBootstrapResult | (private) | `function createLocalizationBootstrapResult(opti...` |
| 889 | fn | createInlineLocalizationFallback | (private) | `function createInlineLocalizationFallback(optio...` |
| 970 | fn | createRuntimeSharedBootstrapFallback | (private) | `function createRuntimeSharedBootstrapFallback(o...` |
| 975 | fn | fallbackResolveRuntimeSharedFromGlobal | (private) | `function fallbackResolveRuntimeSharedFromGlobal...` |
| 1012 | fn | createInlineRuntimeSharedFallback | (private) | `function createInlineRuntimeSharedFallback(opti...` |
| 1105 | fn | createRuntimeSharedBootstrapResult | (private) | `function createRuntimeSharedBootstrapResult(opt...` |
| 1179 | fn | createBootstrapSuite | (private) | `function createBootstrapSuite(options) {` |
| 1186 | fn | mergeOptions | (private) | `function mergeOptions(overrides) {` |
| 1220 | fn | collectSuiteFallbackScopes | (private) | `function collectSuiteFallbackScopes(overrides) {` |
| 1253 | fn | createBootstrapEnvironmentWithSuite | (private) | `function createBootstrapEnvironmentWithSuite(en...` |
| 1273 | fn | createLocalizationBootstrapResultWithSuite | (private) | `function createLocalizationBootstrapResultWithS...` |
| 1297 | fn | createLocalizationBootstrapFallbackWithSuite | (private) | `function createLocalizationBootstrapFallbackWit...` |
| 1325 | fn | createRuntimeSharedBootstrapResultWithSuite | (private) | `function createRuntimeSharedBootstrapResultWith...` |
| 1349 | fn | createRuntimeSharedBootstrapFallbackWithSuite | (private) | `function createRuntimeSharedBootstrapFallbackWi...` |
| 1374 | fn | createInlineLocalizationFallbackWithSuite | (private) | `function createInlineLocalizationFallbackWithSu...` |
| 1382 | fn | createInlineRuntimeSharedFallbackWithSuite | (private) | `function createInlineRuntimeSharedFallbackWithS...` |

