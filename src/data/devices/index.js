/**
 * Devices Manifest (ESM)
 * Aggregates all device data from ESM modules and constructs the global devices object.
 */
import './setup.js'; // Defines globalThis.devices initially
console.log('DEBUG: devices/index.js executed START. globalThis.devices:', globalThis.devices);

import cameraData from './cameras.js';
import monitorData from './monitors.js';
import videoData from './video.js';
import fizData from './fiz.js';
import batteryData from './batteries.js';
import hotswapData from './batteryHotswaps.js';
import chargerData from './chargers.js';
import cageData from './cages.js';
import cartData from './carts.js';
import gearListData from './gearList.js';
import recordingMediaData from './recordingMedia.js';
import wirelessReceiversData from './wirelessReceivers.js';
import audioData from './audio.js';
import lightsData from './lights.js';
import gimbalsData from './gimbals.js';
import dronesData from './drones.js';
import actionCamerasData from './actionCameras.js';

// Ensure devices object exists
const devices = globalThis.devices || {};

// 1. Register Standard Devices
devices.cameras = cameraData;
devices.monitors = monitorData;
devices.video = videoData;
devices.fiz = fizData;
devices.batteries = batteryData;
devices.batteryHotswaps = hotswapData;
devices.carts = cartData;
devices.wirelessReceivers = wirelessReceiversData;
devices.audio = audioData;
devices.lights = lightsData;
devices.gimbals = gimbalsData;
devices.drones = dronesData;
devices.actionCameras = actionCamerasData;

// 2. Register Nested Accessories
devices.accessories = devices.accessories || {};
devices.accessories.chargers = chargerData;
devices.accessories.cages = cageData;

// 3. Register components from gearList.js
// Corresponds to: Object.entries(categories).forEach(([name, data]) => registerDevice(name, data));
// categories: viewfinders, directorMonitors, iosVideo, videoAssist, media, lenses, accessories, filterOptions
devices.viewfinders = gearListData.viewfinders;
devices.directorMonitors = gearListData.directorMonitors;
devices.iosVideo = gearListData.iosVideo;
devices.videoAssist = gearListData.videoAssist;
devices.media = gearListData.media; // devices.media
devices.lenses = gearListData.lenses;
devices.filterOptions = gearListData.filterOptions;

// Merge gearList accessories
if (gearListData.accessories) {
    Object.assign(devices.accessories, gearListData.accessories);
}

// 4. Register Recording Media components
// registerDevice('recordingMediaBrands', brands);
// registerDevice('recordingMediaSizes', sizes);
// registerDevice('gearList.media', media);

devices.recordingMediaBrands = recordingMediaData.brands;
devices.recordingMediaSizes = recordingMediaData.sizes;

devices.gearList = devices.gearList || {};
devices.gearList.media = recordingMediaData.media; // devices.gearList.media

// Finalize
if (typeof globalThis.markDevicesNormalized === 'function') {
    globalThis.markDevicesNormalized();
}

// Cleanup global registration function as it's no longer needed for these files
delete globalThis.registerDevice;

globalThis.devices = devices;

export default devices;
export const cineDevices = devices;
