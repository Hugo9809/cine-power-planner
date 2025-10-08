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
        label: 'npm run generate:sw-assets',
        description: 'Refresh the service worker asset manifest so offline help and documentation stay cached.'
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
  'Commit regenerated files with their source changes to preserve offline builds and shared data exports.',
  'After editing help topics, documentation or translations, run npm run generate:sw-assets before building so the offline bundle ships the updated copy.',
  'Filter this guide: npm run help -- lint or npm run help -- --section data lint to focus matching commands.'
];

const titleLines = [
  'Cine Power Planner – development command reference',
  '',
  'Usage: npm run <command> [-- --options]',
  ''
];

function normalize(value) {
  return value.trim().toLowerCase();
}

function parseArguments(argv) {
  const parsed = { queries: [], sections: [], showUsage: false };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (!arg || arg === '--') {
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      parsed.showUsage = true;
      continue;
    }

    if (arg === '--section' || arg === '-s') {
      const next = argv[index + 1];
      if (next) {
        parsed.sections.push(next);
        index += 1;
      }
      continue;
    }

    if (arg.startsWith('--section=')) {
      const value = arg.split('=')[1];
      if (value) {
        parsed.sections.push(value);
      }
      continue;
    }

    parsed.queries.push(arg);
  }

  parsed.sections = parsed.sections.filter(Boolean).map(normalize);
  parsed.queries = parsed.queries.filter(Boolean).map(normalize);

  return parsed;
}

function commandMatches(section, command, queries) {
  if (!queries.length) {
    return true;
  }

  const haystack = `${section.title} ${command.label} ${command.description}`.toLowerCase();
  return queries.every(query => haystack.includes(query));
}

function filterSections(allSections, parsed) {
  const { sections: sectionFilters, queries } = parsed;
  const hasSectionFilter = sectionFilters.length > 0;
  const hasQueryFilter = queries.length > 0;

  return allSections
    .filter(section => {
      if (!hasSectionFilter) {
        return true;
      }
      const title = normalize(section.title);
      return sectionFilters.some(filter => title.includes(filter));
    })
    .map(section => {
      const commands = hasQueryFilter
        ? section.commands.filter(command => commandMatches(section, command, queries))
        : section.commands.slice();

      return {
        title: section.title,
        commands,
        footer: section.footer
      };
    })
    .filter(section => {
      if (hasQueryFilter) {
        return section.commands.length > 0;
      }
      return true;
    });
}

function getLongestLabel(sectionList) {
  return sectionList.reduce((max, section) => {
    const sectionMax = section.commands.reduce((innerMax, command) => {
      const length = command.label.length;
      return length > innerMax ? length : innerMax;
    }, 0);
    return sectionMax > max ? sectionMax : max;
  }, 0);
}

function formatCommand(command, longestLabel) {
  const padding = ' '.repeat(longestLabel - command.label.length + 2);
  return `  ${command.label}${padding}${command.description}`;
}

function renderSections(sectionList, longestLabel, lines) {
  for (const section of sectionList) {
    lines.push(`${section.title}:`);
    for (const command of section.commands) {
      lines.push(formatCommand(command, longestLabel));
    }
    if (section.footer) {
      lines.push(`  • ${section.footer}`);
    }
    lines.push('');
  }
}

function formatSummary(sectionList, parsed) {
  if (!parsed.queries.length && !parsed.sections.length) {
    return null;
  }

  const commandCount = sectionList.reduce(
    (count, section) => count + section.commands.length,
    0
  );
  const sectionCount = sectionList.length;

  const commandLabel = commandCount === 1 ? 'command' : 'commands';
  const sectionLabel = sectionCount === 1 ? 'section' : 'sections';

  const filters = [];
  if (parsed.queries.length) {
    const quoted = parsed.queries.map(query => `"${query}"`).join(', ');
    filters.push(`keywords ${quoted}`);
  }
  if (parsed.sections.length) {
    const quoted = parsed.sections.map(section => `"${section}"`).join(', ');
    filters.push(`sections ${quoted}`);
  }

  return `Filtered results (${commandCount} ${commandLabel} across ${sectionCount} ${sectionLabel} matching ${filters.join(' and ')}).`;
}

function printUsage() {
  const usageLines = [
    'Usage:',
    '  npm run help -- [keywords...] [--section <name>]',
    '  npm run help -- [keywords...] [--section=<name>]',
    '',
    'Examples:',
    '  npm run help -- lint',
    '  npm run help -- --section data lint',
    '  npm run help -- --section=focused test',
    ''
  ];
  console.log(usageLines.join('\n'));
}

const parsed = parseArguments(process.argv.slice(2));

if (parsed.showUsage && parsed.queries.length === 0 && parsed.sections.length === 0) {
  printUsage();
  process.exit(0);
}

const filteredSections = filterSections(sections, parsed);

if ((parsed.queries.length || parsed.sections.length) && filteredSections.length === 0) {
  printUsage();
  console.log('No commands matched your filters.');
  process.exit(1);
}

const displaySections = parsed.queries.length || parsed.sections.length
  ? filteredSections
  : sections.map(section => ({
      title: section.title,
      commands: section.commands.slice(),
      footer: section.footer
    }));

const longestLabel = getLongestLabel(displaySections);
const lines = [...titleLines];

const summary = formatSummary(displaySections, parsed);
if (summary) {
  lines.push(summary);
  lines.push('');
}

renderSections(displaySections, longestLabel, lines);

lines.push('Housekeeping tips:');
for (const tip of tips) {
  lines.push(`  • ${tip}`);
}
lines.push('');
lines.push('For contributing guidelines and additional background, open README.md.');

console.log(lines.join('\n'));
