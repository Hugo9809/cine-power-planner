# Preferred Tech Stack & Implementation Rules

When generating code or UI components for this brand, you **MUST** strictly adhere to the following technology choices.

## Core Stack

* **Framework:** Vanilla JavaScript (ES Modules).
* **Build Tool:** Vite.
* **Styling:** Vanilla CSS with CSS Variables (CSS Custom Properties). 
    * **Note:** Do NOT use Tailwind CSS or SASS unless strictly requested for a specific localized module.
    * **Structure:** Styles are located in `src/styles/v2/`.
* **Logic Location:** New modules go in `src/scripts/modules/`.
* **State Management:** Custom Event-Driven Architecture + IndexedDB (No Redux/Zustand).
* **Icons:** SVG or Lottie Animations.

## Implementation Guidelines

### 1. CSS Variables Strategy
* You must utilize the CSS variables defined in color, typography, and spacing tokens.
* Example: Use `var(--v2-brand-blue)` instead of `#001589`.
* Example: Use `var(--v2-space-md)` instead of `16px`.

### 2. Component Patterns
* **Web Components / Functions:** Components are typically functions that return HTML strings or manipulate DOM elements directly, or Custom Elements.
* **Themes:** Support Light, Dark, and Pink modes by using the theme-specific CSS files found in `src/styles/v2/themes/`.

### 3. Forbidden Patterns
* Do NOT use React (unless specifically working on a React-isolated module, which is rare).
* Do NOT use jQuery.
* Do NOT use Bootstrap.
* Do NOT introduce new heavy dependencies without approval.
