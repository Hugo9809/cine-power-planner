/**
 * App Core Part 2
 * Aggregates all converted ES modules that replace the functionality
 * of the legacy app-core-new-2.js bundle.
 */

import './modules/core/runtime-module-loader.js';
import './modules/core/runtime-candidate-scopes.js';
import './modules/core/runtime-localization.js';
import './modules/core/device-schema.js';
import './modules/core/pink-mode.js';
import './modules/core/mount-voltage.js';
import './modules/core/experience.js';
import './modules/core/persistence-guard.js';
import './modules/core/project-intelligence.js';

// Re-export specific APIs if necessary, though most modules attach to globals
export * from './modules/core/device-schema.js';
export * from './modules/core/pink-mode.js';
export * from './modules/core/mount-voltage.js';
export * from './modules/core/experience.js';
export * from './modules/core/persistence-guard.js';
export * from './modules/core/project-intelligence.js';
