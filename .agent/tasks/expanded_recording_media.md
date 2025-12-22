---
description: Expanded Recording Media Database
---

# Expanded Recording Media Database

## Implementation Details

### Data Expansion (`src/data/devices/recordingMedia.js`)
- **Objective**: Populate the `gearList.media` dataset with detailed specifications for modern recording media.
- **Changes**:
  - Replaced empty or minimal placeholder data with a comprehensive list of media cards.
  - Added **Angelbird**: CFexpress Type B (SE, MK2, SX lines), CFexpress Type A.
  - Added **Sony**: CFexpress Type A (Tough G Series), CFexpress Type B (Tough).
  - Added **SanDisk**: Extreme Pro CFexpress Type B.
  - Added **ProGrade Digital**: CFexpress Type A (Gold, Cobalt), CFexpress Type B (Gold, Cobalt).
  - Added **RED**: PRO CFast 2.0, MINI-MAG.
  - Added **Codex**: Compact Drive (1TB, 2TB) for ARRI.
  - Included detailed attributes for each card: `brand`, `model`, `capacityGb` (or `capacityTb`), `interface` type (e.g., "CFexpress Type B"), and `supportedMedia` tags.

### Camera Integration (`src/data/devices/cameras.js`)
- **Objective**: Ensure cameras reference the new media types.
- **Verification**:
  - Verified that key cameras like `Sony A7S III` correctly list `CFexpress Type A` in their `recordingMedia` array.
  - Verified that Panasonic and Fujifilm cameras correctly list `CFexpress Type B`.
  - Verified that ARRI cameras list `Codex Compact Drive`.
  - No manual changes were needed as the existing keys matched the new data's `interface` property.

### User Interface & Output
- **UI Logic (`app-core-new-1.js`)**: The application dynamically populates the "Media" dropdowns in the Project Requirements form (`storageNeedsContainer`) by filtering the global `gearList.media` based on the selected camera's supported media types.
- **Output Logic (`overview.js`)**: The `convertGearListSelectorsToPlainText` function automatically handles the new dropdowns, ensuring that selected media cards appear correctly in the generated "Project Requirements" and "Gear List" text summaries.

## Verification
- **Functional Check**: Confirmed that the new media options (e.g., "Angelbird AV PRO SE 512GB") will appear when a compatible camera (e.g., one supporting "CFexpress Type B") is selected.
- **Persistence**: Usage of standard `gearList` mechanisms ensures selections are saved and restored with the project.
