# Schema Inventory

This document summarizes the attribute schema defined in `src/data/schema.json`. It is intended as a quick reference so that accessory, camera, and subsystem records can be audited for completeness.

## Accessories
- **Batteries**: `capacity`, `mount_type`, `pinA`, `pinV`, `weight_g`
- **Cables**
  - General / FIZ cables: `brand`, `compatibleCameras`, `compatibleControllers`, `compatibleDevices`, `connectors`, `from`, `kNumber`, `lengthM`, `notes`, `provenance`, `orientation`, `to`, `type`, `useCase`
  - Power cables: `from`, `lengthM`, `to`, `connectors`
  - Video cables: `lengthM`, `notes`, `type`
- **Cages**: `batteryMount`, `brand`, `compatible`, `handle_extension_compatible`, `kNumber`, `material`, `mounting_points`, `notes`, `rodStandard`, `side_plates`, `top_handle_included`, `verified_source`, `weight_g`
- **Camera stabiliser**: `brand`, `options`
- **Camera support**: `brand`, `compatible`, `diameterMm`, `dimensionsMm`, `kNumber`, `lengthMm`, `rodStandard`
- **Carts**: `brand`
- **Chargers**: `chargeModes`, `chargingSpeedAmps`, `dimensions_mm`, `inputConnector`, `inputVoltageV`, `mount`, `notes`, `outputs`, `perBayCurrentA`, `provenance`, `slots`, `totalPowerW`, `weight_g`
- **Filters**: `brand`, `kNumber`
- **Grip**: `brand`
- **Lenses**: `brand`, `clampOn`, `frontDiameterMm`, `imageCircleMm`, `lengthMm`, `lensType`, `minFocusMeters`, `mount`, `needsLensSupport`, `notes`, `rodLengthCm`, `rodStandard`, `tStop`, `weight_g`
- **Matte boxes**: `brand`, `compatible`, `diameterMm`, `kNumber`, `model`, `note`, `provenance`, `sideFlags`, `stages`, `topFlag`, `traySize`, `type`
- **Media**: `brand`, `capacityGb`, `capacityTb`, `interface`, `kNumber`, `model`
- **Power plates**: `brand`, `kNumber`, `mount`
- **Rigging**: `brand`
- **Sliders**: `brand`, `bowlMount`, `dimensionsCm`, `driveType`, `features`, `material`, `model`, `motorized`, `notes`, `payloadHorizontalKg`, `payloadVerticalKg`, `travelCm`, `weightKg`
- **Tripod heads**: `bowlSizeMm`, `brand`, `material`
- **Tripods**: `brand`, `model`, `material`, `stages`, `bowlSizeMm`, `bowlMount`, `payloadKg`, `heightRangeCm`, `weightKg`, `spreader`, `features`, `dimensionsCm`, `sizeClass`, `notes`, `sourceUrl`
- **Video assist (accessories)**: `brand`, `screenSizeInches`

## Standalone battery gear
- **Batteries**: `capacity`, `dtapA`, `mount_type`, `pinA`, `weight_g`
- **Battery hotswaps**: `capacity`, `mount_type`, `pinA`

## Cameras
- **Base attributes**: `fizConnectors`, `lensMount`, `power`, `powerDrawWatts`, `recordingCodecs`, `recordingMedia`, `resolutions`, `sensorModes`, `timecode`, `videoOutputs`, `viewfinder`, `weight_g`
- **Power > Battery plate support**: `mount`, `notes`, `type`
- **Power > Input**: `notes`, `powerDrawWatts`, `type`, `voltageRange`
- **Power > Power distribution outputs**: `current`, `notes`, `type`, `voltage`, `wattage`
- **FIZ connectors**: `count`, `notes`, `type`
- **Lens mount**: `mount`, `notes`, `type`
- **Recording media**: `notes`, `type`
- **Timecode**: `notes`, `type`
- **Video outputs**: `notes`, `type`, `version`
- **Viewfinder**: `notes`, `resolution`, `size`, `type`

## Director monitors
- **Attributes**: `brand`, `brightnessNits`, `model`, `power`, `powerDrawWatts`, `screenSizeInches`, `videoInputs`, `videoOutputs`, `wirelessTx`, `notes`
- **Power > Input**: `notes`, `type`, `voltageRange`
- **Video inputs / outputs**: `notes`, `type`

## Filter options
- **Attributes**: *(reserved; currently empty array)*

## FIZ systems
- **Controllers**: `batteryType`, `connectivity`, `fizConnectors`, `internalController`, `notes`, `powerDrawWatts`, `powerSource`
- **Distance units**: `accuracy`, `connectionCompatibility`, `fizConnectors`, `measurementMethod`, `measurementRange`, `notes`, `outputDisplay`, `powerDrawWatts`
- **Hand units**: `batteryType`, `connectivity`, `fizConnectors`, `internalController`, `notes`, `powerDrawWatts`, `powerSource`
- **Motors**: `fizConnectors`, `gearTypes`, `internalController`, `notes`, `powerDrawWatts`, `torqueNm`

## iOS video systems
- **Attributes**: `frequency`, `latencyMs`, `notes`, `power`, `powerDrawWatts`, `videoInputs`, `videoOutputs`
- **Power > Input**: `notes`, `type`
- **Video inputs**: `type`

## Media (general)
- **Attributes**: `brand`, `capacityGb`, `capacityTb`, `interface`, `kNumber`, `model`

## Monitors (general field)
- **Attributes**: `audioInput`, `audioIo`, `audioOutput`, `bluetooth`, `brightnessNits`, `latencyMs`, `power`, `powerDrawWatts`, `screenSizeInches`, `videoInputs`, `videoOutputs`, `wireless`, `wirelessRX`, `wirelessTx`
- **Audio input / IO / Output**: `portType`
- **Power > Input**: `notes`, `portType`, `voltageRange`
- **Video inputs / outputs**: `portType`
- **Wireless**: `portType`

## Video systems
- **Attributes**: `frequency`, `latencyMs`, `power`, `powerDrawWatts`, `videoInputs`, `videoOutputs`
- **Power > Input**: `notes`, `type`, `voltageRange`
- **Video inputs**: `type`
- **Video outputs**: `notes`, `type`

## Video assist (standalone)
- **Attributes**: `brand`, `screenSizeInches`

## Viewfinders
- **Attributes**: `brand`, `compatible`, `isPersonalGear`, `kNumber`, `listOfOrigin`, `model`

## Wireless receivers
- **Attributes**: `frequency`, `latencyMs`, `power`, `powerDrawWatts`, `videoInputs`, `videoOutputs`
- **Power > Battery plate support**: `mount`, `type`
- **Power > Input**: `notes`, `type`, `voltageRange`
- **Video outputs**: `type`

> **Maintenance note:** When the schema in `src/data/schema.json` is updated, please refresh this inventory so that help, documentation, and translation resources stay synchronized.
