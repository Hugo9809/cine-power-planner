---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic, template-like aesthetics. Implement real working code with exceptional attention to craft, usability, and a clear visual point-of-view.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Contract (Required)

Before writing any code, produce a short “design contract” that you will follow:

1) **Purpose & User**: Who uses this? What job does it do?
2) **One-sentence concept**: The emotional/visual thesis (e.g. “industrial instrument panel” or “editorial print layout with modern motion”).
3) **Design anchors (3–5)**: Concrete decisions you will not drift from:
   - typography system
   - color strategy
   - spatial/grid logic
   - material/texture
   - motion behavior
4) **Signature move**: The one unforgettable detail (layout trick, interaction, motif, typographic flourish, etc.).
5) **Ban list (2–3)**: Things you explicitly will NOT do in this build (e.g. “no purple-on-white gradients”, “no generic card grid”, “no default component library look”).

**CRITICAL**: Commit. Do not hedge. The UI must feel intentionally designed.

## Implementation Standards (Production-Grade)

Your implementation must be:
- **Functional**: real state handling, real interactions, real responsiveness
- **Maintainable**: clear component structure, design tokens, minimal duplication
- **Accessible**: semantic HTML, keyboard navigation, visible focus, ARIA where needed
- **Performant**: avoid heavy dependencies; prevent layout jank; optimize assets
- **State-complete**: loading / empty / error / edge cases are designed, not ignored

## Aesthetic Direction (Be Bold, Be Specific)

Choose a strong conceptual direction and execute it with precision. Examples:
- brutally minimal / luxury editorial / retro-futuristic / art deco geometry
- industrial utilitarian / playful toy-like / museum placard / terminal chic
- organic/natural / brutalist raw / dense “control room” / quiet Swiss print

The goal is not intensity — it’s **intentionality**. Every choice should support the concept.

## Anti-Slop Rules (Hard Constraints)

Avoid:
- overused fonts and “default modern startup” pairings (e.g. Inter/Roboto and their lookalikes)
- predictable layouts (centered headline + 3 cards + gradient CTA)
- clichéd color tropes (especially purple/blue gradients on white with glassmorphism)
- generic shadows/rounded cards everywhere without material logic
- “component library aesthetic” unless the concept explicitly calls for it

If the UI resembles a common SaaS template, it failed.

## Typography System (Must Define)

Treat typography as the spine:
- Pick a **display** + **body** font with clear contrast in character.
- Define a **type scale** (prefer fluid `clamp()` scaling) and a readable line-length.
- Use a consistent rhythm: spacing and leading are part of the design.
- Prefer **variable fonts** when available; use optical sizing if supported.
- Include numerals strategy if relevant (tabular nums for dashboards, oldstyle for editorial, etc.).

Guidance for pairing:
- Contrast in genre (serif vs grotesk, condensed vs wide, humanist vs geometric)
- Harmony in metrics (x-height/weight compatibility) so it doesn’t feel pasted together

## Color & Theme (Tokenized, Intentional)

Use CSS variables / design tokens. Color must have a thesis:
- **Dominant base** + **sharp accent** beats evenly-distributed palettes
- Define surface hierarchy (background / surface / elevated / interactive)
- Ensure contrast for text and interactive states
- Consider light/dark not as inversion but as **re-composition** (shadows, borders, emphasis shift)

## Material, Texture, and Depth (Required)

Add atmosphere beyond flat fills:
- subtle grain/noise, paper texture, scanlines, halftone, metal/brushed effects, etc.
- borders/hairlines/inner strokes with consistent logic
- shadows that match the material (paper vs glass vs metal vs ink)

At least **one** material treatment must be present that is not a generic gradient.

## Spatial Composition (Break the Grid With Control)

Use layout as expression:
- asymmetry, overlap, deliberate tension, grid-breaking moments
- generous negative space OR controlled density — pick one and commit
- use real layout tools: CSS grid, container queries, fluid spacing (`clamp`)
- include responsive behavior that preserves the concept (not just stacking)

## Motion & Interaction (High-Signal, Not Constant)

Motion must serve comprehension and delight:
- Prefer one orchestrated page-load reveal with staggered timing
- Add one memorable microinteraction (hover, toggle, drag, press, focus)
- Use high-quality easing curves; avoid uniform linear motion
- Always implement `prefers-reduced-motion` fallbacks

A motion “budget” is encouraged: do fewer, better animations.

## Content & Microcopy (Design Includes Words)

Write UI text as part of the design:
- concise, specific labels
- meaningful empty states (what happened + what to do next)
- error states with recovery paths
- helper text that prevents mistakes

## State Design (Mandatory)

You MUST design and implement:
- **Loading** (skeleton/progress that matches the aesthetic)
- **Empty** (no results / first-run)
- **Error** (validation, network, unexpected failure)
- **Edge cases** (long strings, tiny screens, large numbers, overflow)

A UI that only works on the happy path is incomplete.

## Engineering Craft Checklist

- semantic structure (`header`, `main`, `nav`, `section`, `button`, `form`)
- keyboard navigation works end-to-end
- visible focus states that match the aesthetic
- no layout shift on load (avoid late-loading fonts without fallbacks)
- avoid large JS for cosmetic effects; prefer CSS where possible
- animations avoid layout thrash (transform/opacity over top/left)
- tokens for spacing, radii, shadows, typography, z-index layers

## Self-Review (Quick Rubric)

Before finalizing, verify:
- Distinctiveness: would someone remember this tomorrow?
- Cohesion: do type/color/motion/material feel like one world?
- Usability: can a first-time user succeed fast?
- Accessibility: keyboard + focus + readable contrast
- Performance: no unnecessary heavy assets or libraries
- Completeness: loading/empty/error/edge cases are handled

Remember: the goal is not “pretty UI.” It’s a *designed interface* with a clear point-of-view that ships.
