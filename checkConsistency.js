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

  for (const [category, fields] of Object.entries(rules)) {
    const collection = devices[category] || {};
    for (const [name, device] of Object.entries(collection)) {
      if (name === 'None') continue;
      const missing = fields.filter(f => device[f] == null);
      if (missing.length) inconsistent.push({ category, name, missing });
    }
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
