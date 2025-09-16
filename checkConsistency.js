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
    monitors: ['powerDrawWatts', 'power', 'videoInputs', 'videoOutputs'],
    video: ['powerDrawWatts', 'power', 'videoInputs', 'videoOutputs'],
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
      [
        'Usage: node checkConsistency.js [options]',
        '',
        'Validates device entries in data.js before normalization scripts touch the dataset.',
        '',
        'What it checks:',
        '  - Scans cameras, monitors, FIZ equipment, wireless links and accessories.',
        '  - Ensures required metadata such as power, connector and port details are present.',
        '',
        'No files are modified. The process exits with code 1 and prints a report when any device is incomplete.',
        '',
        'Recommended workflow:',
        '  1. Run after editing files in devices/ to catch omissions early.',
        '  2. Fix the reported "missing" keys and rerun until the summary reads "All devices have required fields."',
        '  3. Continue with `npm run normalize` and `npm run unify-ports` once this check passes.',
        '',
        'Examples:',
        '  npm run check-consistency',
        '  npm run check-consistency -- --help',
        '  node checkConsistency.js --help',
        '',
        'Options:',
        '  -h, --help     Show this help message and exit.'
      ].join('\n')
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
