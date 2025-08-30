function checkConsistency(devices = require('./data.js')) {
  const rules = {
    cameras: [
      'powerDrawWatts',
      'power',
      'videoOutputs',
      'fizConnectors',
      'recordingMedia',
      'viewfinder',
      'lensMount',
      'timecode',
    ],
    monitors: ['power', 'videoInputs', 'videoOutputs'],
    video: ['power', 'videoInputs', 'videoOutputs'],
  };
  const inconsistent = [];

  for (const [name, cam] of Object.entries(devices.cameras || {})) {
    if (name === 'None') continue;
    const missing = rules.cameras.filter(f => cam[f] == null);
    if (missing.length) inconsistent.push({ category: 'cameras', name, missing });
  }

  for (const [name, mon] of Object.entries(devices.monitors || {})) {
    if (name === 'None') continue;
    const missing = rules.monitors.filter(f => mon[f] == null);
    if (missing.length) inconsistent.push({ category: 'monitors', name, missing });
  }

  for (const [name, vid] of Object.entries(devices.video || {})) {
    if (name === 'None') continue;
    const missing = rules.video.filter(f => vid[f] == null);
    if (missing.length) inconsistent.push({ category: 'video', name, missing });
  }

  return inconsistent;
}

if (require.main === module) {
  const result = checkConsistency();
  if (result.length) {
    console.log('Devices missing fields:', result);
    process.exitCode = 1;
  } else {
    console.log('All devices have required fields.');
  }
}

module.exports = checkConsistency;
