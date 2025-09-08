const fs = require('fs');
const path = require('path');
const devices = require('../data/data');

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
      'Usage: node generateSchema.js [--help]\n' +
        '\nGenerates schema.json from data.js.\n' +
        '\nExamples:\n' +
        '  node generateSchema.js\n' +
        '  node generateSchema.js --help\n' +
        '\nOptions:\n' +
        '  -h, --help  Show this help message and exit.'
    );
    process.exit(0);
  }
  const schema = buildSchema(devices);
  fs.writeFileSync(path.join(__dirname, '../public/schema.json'), JSON.stringify(schema, null, 2));
  console.log('schema.json generated');
} else {
  module.exports = { buildSchema, isDeviceObject, isDeviceMap };
}
