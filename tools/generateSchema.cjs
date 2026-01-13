const fs = require('fs');
const path = require('path');
const devices = require('../src/data');

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

function getSchemaNode(schema, path) {
  let node = schema;
  for (const key of path) {
    if (!node || typeof node !== 'object' || Array.isArray(node)) {
      return undefined;
    }
    node = node[key];
  }
  return node;
}

function getAttributes(schema, path) {
  const node = getSchemaNode(schema, path);
  if (node && Array.isArray(node.attributes)) {
    return node.attributes;
  }
  return [];
}

function setAttributes(schema, path, attrs) {
  let node = schema;
  for (let i = 0; i < path.length; i += 1) {
    const key = path[i];
    if (i === path.length - 1) {
      node[key] = { attributes: attrs.slice().sort() };
    } else {
      if (!node[key] || typeof node[key] !== 'object' || Array.isArray(node[key]) || Array.isArray(node[key]?.attributes)) {
        node[key] = {};
      }
      node = node[key];
    }
  }
}

function copyAttributes(schema, fromPath, toPath) {
  const attrs = getAttributes(schema, fromPath);
  if (attrs.length > 0) {
    setAttributes(schema, toPath, attrs);
  }
}

function unionAttributes(schema, sourcePaths, targetPath) {
  const attrs = new Set();
  for (const path of sourcePaths) {
    for (const attr of getAttributes(schema, path)) {
      attrs.add(attr);
    }
  }
  if (attrs.size > 0) {
    setAttributes(schema, targetPath, Array.from(attrs));
  }
}

function sortSchema(node) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) {
    return node;
  }
  const keys = Object.keys(node);
  if (keys.length === 1 && Array.isArray(node.attributes)) {
    return { attributes: node.attributes.slice().sort() };
  }
  const sorted = {};
  for (const key of keys.sort()) {
    sorted[key] = sortSchema(node[key]);
  }
  return sorted;
}

function augmentSchema(data, schema) {
  const result = schema;

  copyAttributes(result, ['lenses'], ['accessories', 'lenses']);

  if (data && data.accessories && typeof data.accessories === 'object') {
    for (const [category, value] of Object.entries(data)) {
      if (
        value === undefined &&
        Object.prototype.hasOwnProperty.call(data.accessories, category)
      ) {
        copyAttributes(result, ['accessories', category], [category]);
      }
    }
  }

  const cablesNode = getSchemaNode(result, ['accessories', 'cables']);
  if (cablesNode && typeof cablesNode === 'object' && !Array.isArray(cablesNode)) {
    const sourcePaths = Object.keys(cablesNode)
      .filter((key) => key !== 'cables')
      .map((key) => ['accessories', 'cables', key]);
    if (sourcePaths.length > 0) {
      unionAttributes(result, sourcePaths, ['accessories', 'cables', 'cables']);
    }
  }

  return sortSchema(result);
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log(
      [
        'Usage: node generateSchema.js [options]',
        '',
        'Generates src/data/schema.json from src/data/index.js.',
        '',
        'The output lists attributes found in each device category so editors and tests can validate new entries.',
        'It writes the schema to src/data/schema.json without modifying src/data/index.js.',
        '',
        'Recommended workflow:',
        '  1. Run `npm run normalize` followed by `npm run unify-ports` to update src/data/index.js.',
        '  2. Execute this script (`npm run generate-schema`) to keep the schema synchronized.',
        '  3. Commit src/data/schema.json alongside src/data/index.js so CI and editors share the same expectations.',
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
  const schema = augmentSchema(devices, buildSchema(devices));
  fs.writeFileSync(path.join(__dirname, '../src/data/schema.json'), JSON.stringify(schema, null, 2));
  console.log('src/data/schema.json generated');
} else {
  module.exports = { buildSchema, isDeviceObject, isDeviceMap, augmentSchema };
}
