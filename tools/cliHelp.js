#!/usr/bin/env node

const sections = [
  {
    title: 'Essential workflows',
    commands: [
      { label: 'npm run help', description: 'Show this reference.' },
      { label: 'npm run lint', description: 'Lint JavaScript and JSON files with ESLint.' },
      {
        label: 'npm test',
        description: 'Run linting, data validation and every Jest project.'
      },
      {
        label: 'npm run test:jest',
        description: 'Run all Jest projects (unit, data, dom, script) without linting.'
      },
      {
        label: 'npm run build:legacy',
        description: 'Generate the ES5-compatible offline bundle for legacy browsers.'
      }
    ]
  },
  {
    title: 'Focused test suites',
    commands: [
      { label: 'npm run test:unit', description: 'Execute only the unit tests.' },
      { label: 'npm run test:data', description: 'Execute only the data integrity tests.' },
      { label: 'npm run test:dom', description: 'Execute only the DOM integration tests.' },
      { label: 'npm run test:script', description: 'Execute only the script harness tests for script.js.' }
    ]
  },
  {
    title: 'Data maintenance pipeline (run after editing src/data/devices/)',
    commands: [
      {
        label: 'npm run check-consistency',
        description: 'Report missing required fields in src/data/devices/.'
      },
      {
        label: 'npm run normalize',
        description: 'Normalize metadata and rebuild derived data into src/data/index.js.'
      },
      {
        label: 'npm run unify-ports',
        description: 'Standardize connector and port definitions across src/data/index.js.'
      },
      {
        label: 'npm run generate-schema',
        description: 'Refresh src/data/schema.json based on the latest data.'
      }
    ],
    footer: 'Run normalize → unify-ports → generate-schema together so UI selectors and schema exports stay in sync.'
  }
];

const tips = [
  'Pass --help to supported scripts above to see detailed usage instructions.',
  'Use npm run <script> -- --watch to forward extra flags to the underlying tool.',
  'Commit regenerated files with their source changes to preserve offline builds and shared data exports.'
];

const titleLines = [
  'Cine Power Planner – development command reference',
  '',
  'Usage: npm run <command> [-- --options]',
  ''
];

const longestLabel = sections.reduce((max, section) => {
  const sectionMax = section.commands.reduce((innerMax, command) => {
    const length = command.label.length;
    return length > innerMax ? length : innerMax;
  }, 0);
  return sectionMax > max ? sectionMax : max;
}, 0);

const formatCommand = command => {
  const padding = ' '.repeat(longestLabel - command.label.length + 2);
  return `  ${command.label}${padding}${command.description}`;
};

const lines = [...titleLines];

for (const section of sections) {
  lines.push(`${section.title}:`);
  for (const command of section.commands) {
    lines.push(formatCommand(command));
  }
  if (section.footer) {
    lines.push(`  • ${section.footer}`);
  }
  lines.push('');
}

lines.push('Housekeeping tips:');
for (const tip of tips) {
  lines.push(`  • ${tip}`);
}
lines.push('');
lines.push('For contributing guidelines and additional background, open README.md.');

console.log(lines.join('\n'));
