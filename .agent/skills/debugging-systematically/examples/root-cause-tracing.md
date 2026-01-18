# Root Cause Tracing

## Overview

Bugs often manifest deep in the call stack. Your instinct is to fix where the error appears, but that's often just treating a symptom.

**Core principle:** Trace backward through the call chain until you found the original trigger, then fix at the source.

## The Tracing Process

### 1. Observe the Symptom
```
Error: Cannot read properties of undefined (reading 'split')
    at parseSettings (settings.js:42)
```

### 2. Find Immediate Cause
**What code directly causes this?**
```javascript
// settings.js:42
const parts = config.rawString.split(','); // config.rawString is undefined!
```

### 3. Ask: What Called This?
```javascript
// app.js
initSettings({ rawString: storedData }); 
// storedData came from localStorage.getItem('settings')
```

### 4. Keep Tracing Up
**What value was passed?**
- `storedData` was `null` (item missing in storage).
- `initSettings` didn't handle null.

### 5. Find Original Trigger
**Why was it missing?**
- The `initializeStorage()` function failed to write default values on first boot.

**Fix:** Ensure `initializeStorage()` runs effectively before `app.js` tries to read.

## Adding Stack Traces (Instrumentation)

When you can't trace manually, add logging:

```javascript
// Before the problematic operation
function criticalOperation(value) {
  if (!value) {
    console.error('DEBUG criticalOperation received bad value:', {
      value,
      stack: new Error().stack // Captures the caller chain
    });
  }
  // ...
}
```

## Key Principle

1. **Found immediate cause.**
2. **Can trace one level up?**
   - YES: Trace backwards.
   - NO (Dead end): Stop.
3. **Is this the source?**
   - YES: Fix at source.
   - NO: Keep tracing.
4. **NEVER fix just the symptom.** (e.g., don't just add `if (config.rawString)` unless that *is* the valid fix).
