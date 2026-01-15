# Design System & CSS Architecture

Cine Power Planner uses a hybrid CSS architecture to support the V2 UI while maintaining legacy compatibility.

## Architecture Overview

1.  **Global Tokens (`src/styles/style.css`)**: Defines the "Physics" of the world (Colors, Spacing, Typography).
2.  **Scoped Components (`src/styles/v2/*.css`)**: Defines the "Objects" (Cards, Buttons, Layouts) using BEM-like naming.

## 1. Global Tokens (The Source of Truth)

**Do NOT** hardcode hex values or pixel sizes in component CSS. Always use variables.

### Colors (`:root`)
| Variable | Value | Usage |
| :--- | :--- | :--- |
| `--color-accent` | `#e91e63` (Pink) | Primary actions, active states. |
| `--bg-body` | `#121212` | Main background (Dark Mode default). |
| `--bg-card` | `#1e1e1e` | Component background. |
| `--text-primary` | `#ffffff` | Headings, main text. |
| `--text-secondary` | `#b0b0b0` | Subtitles, labels. |

### Spacing
| Variable | Size | Usage |
| :--- | :--- | :--- |
| `--spacing-xs` | `4px` | Tight grouping. |
| `--spacing-sm` | `8px` | Standard padding. |
| `--spacing-md` | `16px` | Component separation. |
| `--spacing-lg` | `24px` | Section separation. |

## 2. Component Guidelines (V2)

We use a loose BEM (Block Element Modifier) syntax to keep styles isolated.

### File Structure
*   `src/styles/v2/base.css`: Reset and typography.
*   `src/styles/v2/layouts.css`: Grid/Flex utility wrappers.
*   `src/styles/v2/components.css`: Buttons, Inputs, Cards.
*   `src/styles/v2/sidebar.css`: Specific view styles.

### Authoring Rules
1.  **Prefix everything**: V2 classes should usually start with `.v2-`.
    *   Good: `.v2-btn`, `.v2-card__title`.
    *   Bad: `.btn`, `.title` (Conflicts with Legacy).
2.  **Mobile First**: Write base styles for mobile, then use `@media (min-width: 768px)` for desktop overrides.
3.  **Theming**: All colors must use CSS custom properties to support "Pink Mode" and high-contrast themes automatically.

## 3. Typography Scale
| Variable | Scale | Usage |
| :--- | :--- | :--- |
| `--font-scale-xs` | 0.85 | Hints, secondary labels |
| `--font-size-base` | 1rem | Body text |
| `--font-scale-lg` | 1.1 | Subheaders |
| `--font-scale-xl` | 1.2 | Modal Titles |
| `--font-scale-display` | 1.8 | Hero numbers |

## 4. Z-Index Registry (`style.css`)
To prevent stacking context wars, use these loosely defined layers:

| Layer | Z-Index | Usage |
| :--- | :--- | :--- |
| **Base** | `1` | Default content |
| **Sticky** | `100` | Skip Links, Sticky Headers |
| **Dropdowns** | `200` | Select menus |
| **Overlays** | `900` | Modal backdrops |
| **Modals** | `1000` | Dialogs |
| **Toast** | `10000` | Notifications, Offline Indicator |

## 5. Iconography
We use a hybrid system:
1.  **Uicons**: Font-based icons (Legacy). Used in `data-icon-font="uicons"`.
2.  **Essential Icons**: Font-based (Legacy). Used in `data-icon-font="essential"`.
3.  **SVG Symbols**: Modern standard. Used via `<use href="#icon-id">`.

> **Rule**: New V2 components should prefer **Inline SVG** or **SVG Sprites** over font icons for better accessibility and performance.

## 6. Pink Mode & Theming

The app supports dynamic runtime theming via the `[data-theme]` attribute on `<html>`.

*   **Dark Mode**: Default.
*   **Light Mode**: Sets `--bg-body: #ffffff`, `--text-primary: #121212`.
*   **Pink Mode**: Overrides `--color-accent` and injects special Lottie animations.

## Anti-Patterns
*   ❌ `width: 100vw` (Causes scrollbar layout shift).
*   ❌ `z-index: 9999` (Use the defined z-index layer variables).
*   ❌ `!important` (Only strictly allowed in utility classes).

