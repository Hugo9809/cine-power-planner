# Defense-in-Depth Validation

## Overview

Single validation checks can be bypassed.
**Core principle:** Validate at EVERY layer data passes through. Make the bug structurally impossible.

## The Four Layers

### Layer 1: Entry Point Validation
Reject obviously invalid input at the API boundary.

```javascript
/**
 * @param {string} name 
 * @param {string} workingDirectory 
 */
function createProject(name, workingDirectory) {
  if (!workingDirectory || workingDirectory.trim() === '') {
    throw new Error('workingDirectory cannot be empty');
  }
  // ... proceed
}
```

### Layer 2: Business Logic Validation
Ensure data makes sense for this operation.

```javascript
function initializeWorkspace(projectDir, sessionId) {
  if (!projectDir) {
    throw new Error('projectDir required for workspace initialization');
  }
  // ... proceed
}
```

### Layer 3: Environment/Context Guards
Prevent dangerous operations in specific contexts (e.g., blocking writes during readonly mode).

```javascript
function saveData(data) {
  if (APP_MODE === 'READ_ONLY') {
    console.warn('Attempted save in READ_ONLY mode');
    return; // or throw
  }
  // ... proceed
}
```

### Layer 4: Debug Instrumentation
Capture context for forensics when things go wrong.

```javascript
function criticalAction(data) {
  try {
    process(data);
  } catch (err) {
    console.error('Critical Action Failed', {
       input: data,
       timestamp: Date.now(),
       stack: err.stack
    });
    throw err;
  }
}
```

## Applying the Pattern

When you find a bug:
1. **Trace the data flow**.
2. **Add validation at each layer**.
3. **Test each layer** (Try bypass layer 1, verify layer 2 catches it).
