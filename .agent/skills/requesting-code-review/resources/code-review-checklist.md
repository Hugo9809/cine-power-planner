# Code Review Checklist

Use this checklist when reviewing code changes.

## Code Quality

- [ ] Clean separation of concerns?
- [ ] Proper error handling (try/catch, fallbacks)?
- [ ] DRY principle followed (no copy-paste)?
- [ ] Edge cases handled (null, empty, undefined)?
- [ ] No magic numbers (use constants)?

## Architecture (Cine Power Planner Specific)

- [ ] Uses **Vanilla JavaScript** (ES Modules)?
- [ ] Uses **CSS Variables** (No Tailwind, no inline styles)?
- [ ] New logic modules in `src/scripts/modules/`?
- [ ] New styles in `src/styles/v2/`?
- [ ] No React, jQuery, or Bootstrap?
- [ ] IndexedDB/OPFS interactions follow existing patterns?

## Testing

- [ ] Tests actually test logic (not mocks)?
- [ ] Edge cases covered?
- [ ] All tests passing (`npm test`)?
- [ ] No `// TODO: add tests` left behind?

## Security

- [ ] No hardcoded secrets or API keys?
- [ ] User input validated/sanitized?
- [ ] No `eval()` or `innerHTML` with user data?

## Performance

- [ ] No blocking operations on main thread?
- [ ] Large data sets paginated/virtualized?
- [ ] No unnecessary re-renders or DOM thrashing?

## Accessibility

- [ ] Interactive elements are focusable?
- [ ] ARIA labels where needed?
- [ ] Color contrast sufficient?

## Requirements

- [ ] All plan requirements met?
- [ ] No scope creep (unrelated changes)?
- [ ] Breaking changes documented?

## Issue Severity Guide

| Severity | Description | Action |
|----------|-------------|--------|
| **Critical** | Bugs, security issues, data loss | Must fix before merge |
| **Important** | Architecture problems, missing features | Should fix before merge |
| **Minor** | Code style, optimization | Nice to have |
