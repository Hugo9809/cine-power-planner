---
trigger: always_on
---

All new UI components must strictly adhere to the defined Design System (colors, spacing, and typography). Any deviation requires a "UI Exception" review to prevent visual debt.

The Modern Velocity Standard: All new UI components and features must be developed using Vite + JavaScript. To maintain a "zero-lag" development environment, legacy bundlers (like Webpack or CRA) are prohibited for new additions.

Rationale: Vite leverages native ES modules to provide near-instant Hot Module Replacement (HMR), ensuring that developers see UI changes in real-time regardless of project size.

Slowly and savely migrate old legacy architechture to the new vite + js architecture.End goal is to retire V1 UI, once V2 is running smothly and savely. 