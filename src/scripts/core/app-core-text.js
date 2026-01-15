/* global CORE_GLOBAL_SCOPE */
/*
 * Cine Power Planner text entry helpers.
 *
 * MIGRATION NOTE: Logic moved to `src/scripts/modules/text.js`.
 * This file remains as a backwards-compatibility shim to expose
 * globals expected by legacy code.
 */

import {
  TEXT_ENTRY_SEPARATOR,
  normaliseTextEntryValue,
  resolveTextEntry
} from '../modules/text.js';

function detectGlobalScope() {
  if (
    typeof CORE_GLOBAL_SCOPE !== 'undefined' &&
    CORE_GLOBAL_SCOPE &&
    typeof CORE_GLOBAL_SCOPE === 'object'
  ) {
    return CORE_GLOBAL_SCOPE;
  }

  if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
    return globalThis;
  }

  if (typeof window !== 'undefined' && window && typeof window === 'object') {
    return window;
  }

  if (typeof self !== 'undefined' && self && typeof self === 'object') {
    return self;
  }

  if (typeof global !== 'undefined' && global && typeof global === 'object') {
    return global;
  }

  return null;
}

const namespace = {
  TEXT_ENTRY_SEPARATOR,
  normaliseTextEntryValue,
  resolveTextEntry,
};

const globalScope = detectGlobalScope();
if (globalScope) {
  const existing =
    globalScope.cineCoreTextEntries && typeof globalScope.cineCoreTextEntries === 'object'
      ? globalScope.cineCoreTextEntries
      : {};

  existing.TEXT_ENTRY_SEPARATOR = TEXT_ENTRY_SEPARATOR;
  existing.normaliseTextEntryValue = normaliseTextEntryValue;
  existing.resolveTextEntry = resolveTextEntry;

  try {
    globalScope.cineCoreTextEntries = existing;
  } catch (assignError) {
    void assignError;
  }
}

export default namespace;
