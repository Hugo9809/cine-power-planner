/**
 * @fileoverview Central Module Index
 *
 * This is the main entry point for ES module imports in the Cine Power Planner.
 * It re-exports all shim modules, providing a single import location for
 * commonly used functions.
 *
 * Usage:
 *   import { loadProject, saveProject, t } from '@/modules';
 *   // or
 *   import { loadProject } from '@/modules/storage-shim.js';
 *
 * This module exists to simplify imports during the migration from global
 * scope to ES modules. After migration is complete, individual modules
 * can be imported directly.
 */

// Re-export all storage functions
export * from './storage-shim.js';

// Re-export all translation functions
export * from './translations-shim.js';

// Named re-exports for common patterns
export { default as storage } from './storage-shim.js';
export { default as translations } from './translations-shim.js';

// Convenience aliases
export { getText as t } from './translations-shim.js';
