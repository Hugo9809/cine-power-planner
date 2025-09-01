var devices = {};

if (typeof module !== 'undefined' && module.exports) {
  devices.cameras = require('./cameras.js');
  devices.monitors = require('./monitors.js');
  devices.video = require('./video.js');
  devices.fiz = require('./fiz.js');
  devices.batteries = require('./batteries.js');
  devices.accessories = { cages: require('./cages.js') };
  const gear = require('./gearList.js');
  devices.viewfinders = gear.viewfinders;
  devices.directorMonitors = gear.directorMonitors;
  devices.iosVideo = gear.iosVideo;
  devices.wirelessReceivers = gear.wirelessReceivers;
  devices.videoAssist = gear.videoAssist;
  devices.media = gear.media;
  devices.lenses = gear.lenses;
  devices.accessories = Object.assign(devices.accessories, gear.accessories);
  devices.filterOptions = gear.filterOptions;
  module.exports = devices;
} else {
  globalThis.devices = devices;
}
