---
trigger: always_on
---

DESIGN & UI PROTOCOLS
1. Visual Language & Aesthetics
Core Aesthetic: "Clean, Technical, & Fluid." Avoid clutter. Use whitespace to denote hierarchy.

Typography: Use system fonts or Inter/Geist. Maintain a strict type scale (e.g., text-sm for labels, text-xl for headers).

Dark Mode: Default to Bright mode, but also keep dark mode and the two pink mode variants in mind. Ensure contrast ratios meet WCAG AA standards (4.5:1 for normal text).

Glassmorphism: Never Use this in the app. 

2. Interaction & Feedback (The "Alive" Interface)
Micro-interactions: Every interactive element (button, input, card) MUST have a :hover and :active state.

Transitions: Use transition-all duration-200 ease-in-out as the default for UI state changes. Avoid instant snapping.

Loading States:

Skeletons: Use skeleton loaders (gray pulsing blocks) for initial data fetches.

Spinners: Use strictly for non-blocking background actions.

Optimistic UI: For IndexedDB writes, update the UI immediately before the promise resolves. Roll back only on error.

3. Offline-First UX (Critical for IndexedDB)
Since this app relies on local storage (IndexedDB), the UI must communicate sync status clearly:

Sync Indicators: Display a visual indicator (e.g., cloud icon) showing the state of data:

🟢 Saved: Data is persisted to IndexedDB.

🟡 Pending: Data is in memory/queue, writing to OPFS.

🔴 Error: Storage quota exceeded or write failed.

Empty States: Never leave a blank screen. If IndexedDB is empty, show a "Welcome/Onboarding" state.

4. Vite Asset Handling
Static Assets: Place images/fonts referenced in CSS or generic HTML in /public. Reference them with absolute paths (e.g., /logo.png).

Imported Assets: Place assets used inside components (icons, localized graphics) in src/assets/. Import them explicitly (import logo from './assets/logo.png') to allow Vite to hash and cache-bust them.

5. Responsive Mandate
Mobile First: Write CSS targeting mobile screens first, then use md: and lg: breakpoints for larger screens.

Touch Targets: All interactive elements must be at least 44x44px on mobile viewports.