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
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log(
      'Usage: node checkConsistency.js [--help]\n' +
        '\nChecks that device entries contain required fields.\n' +
        'Exits with code 1 when missing fields are found.\n' +
        '\nOptions:\n' +
        '  -h, --help  Show this help message.'
    );
    process.exit(0);
  }

  const result = checkConsistency();
  if (result.length) {
    console.log('Devices missing fields:', result);
    process.exitCode = 1;
  } else {
    console.log('All devices have required fields.');
  }
}

module.exports = checkConsistency;
