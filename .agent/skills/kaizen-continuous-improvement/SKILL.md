---
name: kaizen-continuous-improvement
description: Guide for continuous improvement, error proofing, and standardization. Use when refactoring, improving code quality, or making incremental enhancements.
---

# Kaizen: Continuous Improvement

## Overview

Small improvements, continuously. Error-proof by design. Follow what works. Build only what's needed.

**Core principle:** Many small improvements beat one big change.

## The Four Pillars

### 1. Continuous Improvement (Kaizen)

**Incremental over revolutionary:**
- Make the smallest viable change that improves quality.
- One improvement at a time.
- Verify each change before the next.

**Always leave code better:**
- Fix small issues as you encounter them (within scope).
- Update outdated comments.
- Remove dead code when you see it.

### 2. Poka-Yoke (Error Proofing)

**Make errors impossible at design time:**
- Use types/JSDoc to constrain inputs.
- Validate at system boundaries, not deep in logic.
- Fail fast with clear error messages.

```javascript
// ❌ BAD: Validation after use
function processPayment(amount) {
  const fee = amount * 0.03; // Used before validation!
  if (amount <= 0) throw new Error('Invalid');
}

// ✅ GOOD: Validate immediately
function processPayment(amount) {
  if (amount <= 0) throw new Error('Payment must be positive');
  const fee = amount * 0.03;
}
```

### 3. Standardized Work

**Consistency over cleverness:**
- Follow existing codebase patterns.
- Check `CODEBASE_MAP.md` and architecture docs.
- New pattern only if significantly better.

### 4. Just-In-Time (YAGNI)

**Build what's needed now. No more, no less.**
- No "just in case" features.
- Simplest thing that works.
- Optimize only when measured (profiler first).

```javascript
// ❌ BAD: Over-engineered
class GenericLoggerWithTransportsAndQueues { /* 300 lines */ }

// ✅ GOOD: Meets current need
function logError(error) {
  console.error(error.message);
}
```

## Red Flags

- "I'll refactor it later" (never happens).
- Building frameworks before using them.
- Optimizing without measuring.
- "We might need this someday."

## Mindset

Good enough today, better tomorrow. Repeat.
