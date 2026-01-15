# Data Catalog Maintenance Guide

This guide explains how to add, update, and maintain the device catalogs in `src/data/devices/`.

## 1. Directory Structure

Device data is split by category to keep files manageable:

*   `src/data/devices/cameras.js`: Cinema cameras (Arri, Red, Sony, etc.).
*   `src/data/devices/batteries.js`: V-Mount, Gold-Mount, B-Mount bricks.
*   `src/data/devices/monitors.js`: On-board monitors.
*   `src/data/devices/lenses.js`: Lens sets and data.
*   `src/data/devices/index.js`: The aggregator that exports the `devices` object.

## 2. Adding a New Device (Camera Example)

To add a new camera, open `src/data/devices/cameras.js` and add a new key to the exported object.

**Required Fields:**
*   `powerDrawWatts` (Number): Average power consumption.
*   `power.input.voltageRange` (String): e.g., "11-34".
*   `power.input.type` (Array<String>): Main power input (e.g., ["XLR 4-pin", "V-Mount"]).
*   `weight_g` (Number): Weight in grams (body only).

**Example Entry:**

```javascript
"Red V-Raptor XL": {
  "powerDrawWatts": 70, // Number, not string
  "weight_g": 3620,
  "power": {
    "input": {
      "voltageRange": "19.5-34",
      "type": ["Bat LEMO 8-pin"]
    },
    // ...
  }
}
```

### Critical Rules
1.  **Numbers, not Strings**: Usage `70`, not `"70W"`.
2.  **Unique Keys**: The object key (e.g., `"Red V-Raptor XL"`) serves as the ID.
3.  **Standard Connectors**: Use "LEMO 2-pin", "D-Tap", "XLR 4-pin". Do not invent new names like "2-pin Lemo" (use the standard order).

## 3. Maintenance Scripts

After editing any file in `src/data/devices/`, you **MUST** run the maintenance pipeline to ensure consistency.

### A. Normalize Data
`npm run normalize`

*   Trims whitespace.
*   Converts shorthand "X-Mount" strings to standard names.
*   Fixes common typos (e.g., "Leomo" -> "LEMO").

### B. Unify Ports
`npm run unify-ports`

*   Scans all devices for connector names.
*   Updates them to match the canonical list in `tools/port-unifier.js`.
*   Ensures "D-Tap" is not written as "DTap" or "P-Tap".

### C. Check Consistency
`npm run check-consistency`

*   Validates the JSON against `src/data/schema.json`.
*   Errors if required fields (like `powerDrawWatts`) are missing.
*   Warns if a device has no power options.

## 4. Schema Evolution

If you need to add a new field (e.g., `"nativeISO"`):
1.  Update the relevant file (e.g., `cameras.js`).
2.  Run `npm run generate-schema` to rebuild `src/data/schema.json`.
3.  Commit the new schema.

## 5. Testing

Always run the data test suite before committing:

```bash
npm run test:data
```

This runs a deeper check than `check-consistency`, verifying logical constraints (e.g., max voltage > min voltage).
