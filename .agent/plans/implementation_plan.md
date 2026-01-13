# Implementation Plan - v2 UI Improvements (Tabs & Forms)

This plan addresses the user's request to improve the v2 UI design, specifically focusing on **Tabs** and **Forms**, while strictly avoiding Glassmorphism and strictly adhering to a premium, "Amazing" Apple-style aesthetic.

## User Review Required

> [!IMPORTANT]
> **Design Philosophy**: The proposed design leans heavily on **iOS/macOS "Segmented Control"** styles for tabs and **Clean, Spacious** inputs for forms.
> **No Glassmorphism**: We will technically enforce opaque backgrounds and solid colors, avoiding `backdrop-filter` and semi-transparent layers.

## Proposed Changes

### 1. `src/styles/v2/components/tabs.css`

**Goal**: Transform the current sticky tab bar into a premium "Segmented Control" container.

-   **Container (`.v2-tabs-nav`)**:
    -   Change from a full-width sticky bar to a **floating, contained bar** (or keep sticky but style the inner container).
    -   Background: `var(--v2-surface-3)` (Light Gray) with `backdrop-filter: none`.
    -   Border-radius: `var(--v2-radius-lg)` (12px).
    -   Padding: `4px` all around (to create the "track" feel).
    -   Gap: `0` or `4px`.
-   **Tab Button (`.v2-tab-btn`)**:
    -   Remove bottom borders/underlines.
    -   Default state: Transparent background, `text-secondary`, medium weight.
    -   **Active State**:
        -   Background: `var(--v2-surface-base)` (White in light, Dark Gray in dark).
        -   Color: `var(--v2-text-primary)` (High contrast).
        -   Shadow: `var(--v2-shadow-sm)` (Subtle lift).
        -   Border-radius: `var(--v2-radius-md)` (8px).
        -   Transition: `all 0.2s cubic-bezier(0.2, 0, 0.2, 1)`.
-   **Animation**: Ensure smooth color/background transitions.

### 2. `src/styles/v2/components/forms.css`

**Goal**: Make forms feel "Pro" and "Touch-ready".

-   **Inputs (`.v2-input`, `.v2-select`)**:
    -   **Height**: Increase to `44px` (touch target standard).
    -   **Background**: `var(--v2-surface-input)` (Solid).
    -   **Border**: `1px solid var(--v2-border-default)`.
    -   **Radius**: Increase to `10px` or `12px` for a smoother look.
    -   **Focus State**:
        -   Remove generic "glow".
        -   Sharp `2px` border in `var(--v2-brand-blue)`.
        -   No outline offset.
-   **Labels (`.v2-label`)**:
    -   Move slightly closer to the input (reduce gap).
    -   Color: `var(--v2-text-secondary)` -> `var(--v2-text-primary)` on focus (if possible via `:focus-within` on row).
    -   Typography: San Francisco / System font, clean and readable.
-   **Selects**:
    -   Update the custom SVG arrow to a cleaner "Chevron Down" (already present but refine positioning).

### 3. `src/styles/v2/base/variables.css`

-   Adjust `radius` tokens if necessary (e.g., ensure `radius-lg` is suitable for the segmented control container).
-   Ensure `surface-3` provides enough contrast with `surface-base` for the segmented control effect in both Light and Dark modes.

### 4. `src/styles/v2/themes/dark.css`

-   Ensure the "Segmented Control" colors work (Track = Darker Gray, Thumb = Lighter Gray).
-   Ensure Input backgrounds provide good contrast against the page background.

## Verification Plan

### Automated Tests
-   There are no specific UI visual regression tests available.
-   We will rely on manual verification via the browser.

### Manual Verification
-   **Launch**: Run `npm run dev`.
-   **Navigate**: Go to the "Project Detail" view (which contains the Tabs and Forms being modified).
-   **Tabs Check**:
    -   Verify the tab bar looks like a segmented control (pill shape).
    -   Click through tabs (Camera, Power, Requirements, Kit).
    -   Verify the active state is clearly distinct and "pops".
    -   Check Dark Mode toggle.
-   **Forms Check**:
    -   Verify inputs in the "Camera Package" tab.
    -   Check focus states (click into an input).
    -   Check dropdowns.
    -   Verify responsive width (resize browser).
-   **Responsiveness**:
    -   Check on iPhone simulator size (Chrome DevTools).
    -   Ensure tabs scroll or stack nicely if they overflow.
