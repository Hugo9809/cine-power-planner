---
trigger: always_on
---

ACCESSIBILITY STANDARDS (A11Y)
1. Core Mandate
All UI elements must be navigable via keyboard and compatible with screen readers.

High Contrast: All text must meet WCAG AA contrast ratios (4.5:1 minimal).

Scalable Text: UI must not break when the browser zoom is set to 200%.

2. Semantic HTML & ARIA
You must prioritize native HTML elements over custom ARIA implementations.

Buttons vs. Divs: NEVER use a <div> or <span> for an interactive element. Use <button> or <a>.

Forms:

Every <input> must have an associated <label> (via nesting or id + for).

Use autocomplete attributes on all personal data fields.

ARIA Usage:

Only use aria- attributes when native HTML cannot express the semantic meaning.

Interactive icons (e.g., a trash can button) MUST have aria-label="Delete item".

3. Keyboard Navigation Protocol
Focus Indicators: NEVER set outline: none without providing a high-contrast alternative :focus state.

Tab Order: Ensure the logical flow of elements matches the visual flow.

Trap Focus: For Modals and Drawers, you MUST implement a "Focus Trap" so the user cannot tab outside the active modal.

4. Visual Accessibility
Color Independence: Do not rely on color alone to convey state (e.g., error messages must have text/icons, not just red borders).

Motion: Respect prefers-reduced-motion. Wrap complex animations in a media query to disable them if the user requests it.

5. Verification Strategy (Browser Agent)
When verifying UI tasks, the Agent must specifically test for accessibility:

Tab Test: Can you navigate to the new feature using ONLY the Tab key?

Zoom Test: Does the layout break at 150% zoom?

State Check: Do screen readers receive feedback (via aria-live or toast) when an async operation completes (e.g., "Data Saved")?