const fs = require('fs');
const path = require('path');
const devices = require('../web/data');

function isDeviceObject(obj) {
  return Object.values(obj).some((v) => v === null || typeof v !== 'object' || Array.isArray(v));
}

function isDeviceMap(obj) {
  return Object.values(obj).every(
    (v) => v && typeof v === 'object' && !Array.isArray(v) && isDeviceObject(v)
  );
}

function buildSchema(node) {
  if (Array.isArray(node)) {
    const attrs = new Set();
    for (const item of node) {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        for (const key of Object.keys(item)) {
          attrs.add(key);
        }
      }
    }
    return { attributes: Array.from(attrs).sort() };
  }
  if (node && typeof node === 'object') {
    if (isDeviceMap(node)) {
      const attrs = new Set();
      for (const value of Object.values(node)) {
        for (const key of Object.keys(value)) {
          attrs.add(key);
        }
      }
      return { attributes: Array.from(attrs).sort() };
    }
    const result = {};
    const keys = Object.keys(node).sort();
    for (const key of keys) {
      const value = node[key];
      if (value !== undefined) {
        result[key] = buildSchema(value);
      }
    }
    return result;
  }
  return typeof node;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log(
      [
        'Usage: node generateSchema.js [options]',
        '',
        'Generates web/data/schema.json from web/data/index.js.',
        '',
        'The output lists attributes found in each device category so editors and tests can validate new entries.',
        'It writes the schema to web/data/schema.json without modifying web/data/index.js.',
        '',
        'Recommended workflow:',
        '  1. Run `npm run normalize` followed by `npm run unify-ports` to update web/data/index.js.',
        '  2. Execute this script (`npm run generate-schema`) to keep the schema synchronized.',
        '  3. Commit web/data/schema.json alongside web/data/index.js so CI and editors share the same expectations.',
        '',
        'Examples:',
        '  npm run generate-schema',
        '  npm run generate-schema -- --help',
        '  node generateSchema.js --help',
        '',
        'Options:',
        '  -h, --help     Show this help message and exit.'
      ].join('\n')
    );
    process.exit(0);
  }
  const schema = buildSchema(devices);
  fs.writeFileSync(path.join(__dirname, '../web/data/schema.json'), JSON.stringify(schema, null, 2));
  console.log('web/data/schema.json generated');
} else {
  module.exports = { buildSchema, isDeviceObject, isDeviceMap };
}
