function checkConsistency(devices = require('./data.js')) {
  const cameras = devices.cameras;
  const requiredTopFields = [
    'powerDrawWatts',
    'power',
    'videoOutputs',
    'fizConnectors',
    'recordingMedia',
    'viewfinder',
    'lensMount',
    'timecode',
  ];
  const inconsistent = [];
  for (const [name, cam] of Object.entries(cameras)) {
    const missing = requiredTopFields.filter(f => !(f in cam));
    if (missing.length) {
      inconsistent.push({ name, missing });
    }
  }
  return inconsistent;
}

if (require.main === module) {
  const result = checkConsistency();
  if (result.length) {
    console.log('Cameras missing fields:', result);
    process.exitCode = 1;
  } else {
    console.log('All cameras have required fields.');
  }
}

module.exports = checkConsistency;
