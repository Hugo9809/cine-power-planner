# Camera Power Planner

![Camera Power Planner icon](icon.svg)

Camera Power Planner is a standalone web app for planning professional camera
rigs powered by V‑Mount or B‑Mount batteries. It calculates total power draw,
checks that batteries can safely deliver the required output and estimates how
long your setup will run. The tool runs entirely in the browser and even works
offline.

No build step is required—open `index.html` in your browser and start planning
immediately. Serving the repository over HTTP(S) installs a service worker so
that future visits work offline and pick up updates automatically.

## Table of Contents

- [Documentation](#documentation)
- [Features at a Glance](#features-at-a-glance)
- [Runtime Data Weighting](#runtime-data-weighting)
- [Quick Start](#quick-start)
- [Gear List](#gear-list)
- [Getting Started](#getting-started)
- [Install as an App](#install-as-an-app)
- [Browser Support](#browser-support)
- [Development](#development)
- [Feedback and Support](#feedback-and-support)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Documentation

This repository provides the documentation in multiple languages:

- [English](README.en.md)
- [Deutsch](README.de.md)
- [Español](README.es.md)
- [Italiano](README.it.md)
- [Français](README.fr.md)

Choose your preferred language above.

Recent updates include:

- **Interactive setup diagram** – drag devices, zoom, snap nodes to a grid, and export layouts as SVG or JPG.
- **Pink accent theme** – toggle a playful pink highlight that persists between visits or press **P** to switch quickly.
- **Searchable help dialog and hover hints** – open with ?, H, F1 or Ctrl+/ (even while typing), filter topics instantly, press / or Ctrl+F to jump to the search box, browse the built-in FAQ, and hover over any button, field, dropdown or header for a quick explanation.
- **Type-to-search dropdowns** – quickly narrow device lists by typing directly into any selector.
- **Dual V‑/B‑Mount support** – choose between plate types on supported cameras and the battery list updates automatically.
- **User runtime feedback** – submit real-world runtimes with environment details to refine estimates.
- **Visual runtime weighting dashboard** – see how temperature, resolution, frame rate and codec affect each runtime report, now sorted by weight with exact share percentages.
- **Gear list generator** – compile selected gear and project requirements with one click.
- **Quick setup saving** – press Enter or Ctrl+S (⌘S on macOS) to save a setup and the Save button stays disabled until a name is entered.
- **Project requirement saving** – store project requirements with each setup so gear lists restore full context.
- **User entry duplication** – gear list forms include fork buttons to copy user fields instantly.

See the language-specific README files for full details.

## Features at a Glance

- Calculate total power consumption, current draw at 14.4 V and 12 V, and estimated battery runtime.
- Runtime estimates draw on a weighted average of user-submitted runtimes for greater accuracy.
- Check that selected batteries can supply the required output.
- See required battery counts for a 10 h shoot and adjust runtimes for temperature.
- Compare runtimes across all batteries with an optional battery comparison panel.
- Save, load, share and clear setups (project requirements included); import/export them as JSON, and generate gear lists and printable overviews.
- Visualize power and video connections with an interactive diagram.
- Customize the device database with your own gear.
- Automatically selects your browser language on first load, lets you switch languages, toggle dark or playful pink themes, and swap between V‑ and B‑Mount plates on supported cameras.
- Works completely offline and offers a searchable help dialog with hover help for every button, field, dropdown and header.

## Runtime Data Weighting

User-submitted battery runtimes are combined using a weighted average to better match your setup:

- Entries are adjusted for temperature, scaling from ×1 at 25 °C to ×1.25 at 0 °C, ×1.6 at −10 °C and ×2 at −20 °C.
- Resolution multipliers: ≥12K ×3, ≥8K ×2, ≥4K ×1.5, ≥1080p ×1, lower scaled relative to 1080p.
- Frame rate scales linearly from a base of 24 fps (e.g. 48 fps = ×2).
- Wi‑Fi enabled adds 10 %.
- Codec factors: RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1; ProRes ×1.1; DNx/AVID ×1.2; All‑Intra ×1.3; H.264/AVC ×1.5; H.265/HEVC ×1.7.
- Monitor entries below the specified brightness are weighted by their brightness ratio.
- The final weight reflects how much of the total power draw comes from the camera, monitor and other devices so that similar rigs count more.
- A dedicated dashboard orders entries by weight and shows the share percentage for each runtime entry.

## Quick Start

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. (Optional) Serve the folder over HTTP to enable the service worker and other Progressive Web App features. You can use any static file server, for example:
   ```bash
   npx http-server
   # or
   python -m http.server
   ```
   The planner then works fully offline and updates automatically.

## Gear List

- Click **Generate Gear List** to compile selected gear and project requirements.
- **Save Gear List** stores the current list with the setup.
- **Export Gear List** downloads a JSON file; **Import Gear List** restores it.
- **Delete Gear List** removes the saved list and hides the output.

## Getting Started

Set up a development environment:

1. Install Node.js 18 or later.
2. Install dependencies and run the full test suite:
   ```bash
   npm install
   npm test
   ```
   The `npm test` command runs ESLint, data consistency checks and Jest tests.

## Install as an App

Camera Power Planner is a Progressive Web App and can be installed for quick
access:

1. Open `index.html` in a supported browser.
2. Use the browser's **Install** or **Add to Home Screen** option.
   - **Chrome/Edge (desktop):** Click the install icon in the address bar.
   - **Android:** Open the browser menu and choose *Add to Home screen*.
   - **iOS Safari:** Tap the share icon and select *Add to Home Screen*.
3. Launch the app from your applications list. The installed version works
   offline and updates automatically.

## Browser Support

Camera Power Planner relies on modern web APIs and is tested in current versions of Chrome, Firefox, Edge and Safari. Older browsers may lack support for features like installation or offline caching. For the best experience, use a browser with up-to-date Progressive Web App (PWA) capabilities.

## Development

After cloning the repository, you can inspect or modify the code base.

### File Structure

```
index.html       # Main HTML layout
style.css        # Styles and layout
script.js        # Application logic
devices/         # Default device lists by category
storage.js       # LocalStorage helpers
README.*.md      # Documentation in different languages
```

### Install dependencies and run tests

Requires Node.js 18 or later.

```bash
npm install
npm test
```

The `npm test` command runs ESLint, data consistency checks and Jest tests.

### Update device data

Device definitions live in the files under `devices/`. After modifying these files, run the helper scripts to clean and verify the database:

```bash
npm run normalize
npm run check-consistency
```

`npm run normalize` applies various cleanup routines to unify connector names and expand shorthand entries. `npm run check-consistency` confirms that required fields are present and raises an error if anything is missing. Append `--help` to either command for usage details.

## Feedback and Support

If you run into problems, have questions, or want to suggest new features, please open an issue on GitHub. Community feedback helps improve the planner for everyone.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub. Before submitting, run `npm test` to ensure that linting, data consistency checks, and unit tests all pass.

## Acknowledgements

The planner uses the [OpenMoji](https://openmoji.org/) icon set when a network connection is available and relies on [lz-string](https://pieroxy.net/blog/pages/lz-string/index.html) to compactly store setups in URLs.

## License

Distributed under the ISC license. See `package.json` for details.
