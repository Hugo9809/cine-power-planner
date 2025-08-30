# Camera Power Planner

This repository provides the documentation in multiple languages:

- [English](README.en.md)
- [Deutsch](README.de.md)
- [Español](README.es.md)
- [Italiano](README.it.md)
- [Français](README.fr.md)

Choose your preferred language above.

Recent updates include:

- **Interactive setup diagram** – drag devices, zoom with dedicated controls and export the layout as SVG or JPG.
- **Pink accent theme** – toggle a playful pink highlight that persists between visits.
- **Searchable help dialog** – open with the ? button or keyboard shortcuts, filter topics instantly and browse the built-in FAQ.
- **Dual V‑/B‑Mount support** – choose between plate types on supported cameras and the battery list updates automatically.
- **User runtime feedback** – submit real-world runtimes with environment details to refine estimates.

See the language-specific README files for full details.

## Features at a Glance

- Calculate total power consumption, current draw at 14.4 V and 12 V, and estimated battery runtime.
- Runtime estimates draw on a weighted average of user-submitted runtimes for greater accuracy.
- Check that selected batteries can supply the required output.
- See required battery counts for a 10 h shoot and adjust runtimes for temperature.
- Compare runtimes across all batteries with an optional battery comparison panel.
- Save, load, share and clear setups; import/export them as JSON, and generate a printable overview.
- Visualize power and video connections with an interactive diagram.
- Customize the device database with your own gear.
- Switch languages, toggle dark or playful pink themes, and swap between V‑ and B‑Mount plates on supported cameras.
- Works completely offline and offers a searchable help dialog.

## Runtime Data Weighting

User-submitted battery runtimes are combined using a weighted average to better match your setup:

- Entries are adjusted for temperature, scaling from ×1 at 25 °C to ×1.25 at 0 °C, ×1.6 at −10 °C and ×2 at −20 °C.
- Resolution multipliers: ≥12K ×3, ≥8K ×2, ≥4K ×1.5, ≥1080p ×1, lower scaled relative to 1080p.
- Frame rate scales linearly from a base of 24 fps (e.g. 48 fps = ×2).
- Wi‑Fi enabled adds 10 %.
- Codec factors: RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1; ProRes ×1.1; DNx/AVID ×1.2; All‑Intra ×1.3; H.264/AVC ×1.5; H.265/HEVC ×1.7.
- Monitor entries below the specified brightness are weighted by their brightness ratio.
- The final weight reflects how much of the total power draw comes from the camera, monitor and other devices so that similar rigs count more.

## Quick Start

1. Make sure you have Node.js 18 or later installed if you want to lint or test the project.
2. Open `index.html` in a modern browser to run the planner offline.
3. Install dependencies and run the full test suite:
   ```bash
   npm install
   npm test
   ```
   The `npm test` command runs ESLint, data consistency checks and Jest tests.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.
