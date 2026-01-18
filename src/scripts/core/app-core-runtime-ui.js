/* global CORE_GLOBAL_SCOPE */

/*
 * Cine Power Planner core runtime UI bridge (Shim).
 *
 * MIGRATION NOTE: Logic moved to `src/scripts/modules/core/runtime-ui.js`.
 * This file remains as a backwards-compatibility shim to expose
 * globals expected by legacy code.
 */

import { createRuntimeUiBridge } from '../modules/core/runtime-ui.js';
import { detectGlobalScope } from '../modules/helpers/scope-utils.js';

const bridge = createRuntimeUiBridge();
const primaryScope = detectGlobalScope();

if (primaryScope) {
  try {
    primaryScope.cineCoreRuntimeUiBridge = bridge;
  } catch (assignError) {
    void assignError;
  }
}

if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
  try {
    CORE_GLOBAL_SCOPE.cineCoreRuntimeUiBridge = bridge;
  } catch (coreAssignError) {
    void coreAssignError;
  }
}

export default bridge;
