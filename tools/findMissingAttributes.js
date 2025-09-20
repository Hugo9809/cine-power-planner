const data = require('../src/data');
const schema = require('../src/data/schema.json');

function buildAttributeMap(node, parentPath = []) {
  const map = {};

  if (node && typeof node === 'object' && !Array.isArray(node)) {
    if (Array.isArray(node.attributes)) {
      const key = parentPath.join('.');
      if (key) {
        map[key] = node.attributes.slice();
      }
    }

    for (const [childKey, value] of Object.entries(node)) {
      if (childKey === 'attributes') continue;
      const nextPath = parentPath.concat(childKey);
      Object.assign(map, buildAttributeMap(value, nextPath));
    }
  }

  return map;
}

const ATTRIBUTE_MAP = buildAttributeMap(schema);

function getValueAtPath(obj, path) {
  const parts = path.split('.').filter(Boolean);
  let current = obj;
  for (const part of parts) {
    if (!current || typeof current !== 'object') {
      return undefined;
    }
    current = current[part];
  }
  return current;
}

function findMissingAttributes(categoryPath, dataset = data, attributeMap = ATTRIBUTE_MAP) {
  const attributes = attributeMap[categoryPath];
  if (!attributes) {
    throw new Error(`Category "${categoryPath}" is not defined in src/data/schema.json`);
  }

  const collection = getValueAtPath(dataset, categoryPath);
  if (!collection || typeof collection !== 'object' || Array.isArray(collection)) {
    return [];
  }

  const missingItems = [];

  for (const [itemName, itemData] of Object.entries(collection)) {
    if (itemName === 'None') continue;
    if (!itemData || typeof itemData !== 'object' || Array.isArray(itemData)) continue;

    const missing = attributes.filter(attribute => itemData[attribute] === undefined || itemData[attribute] === null);
    if (missing.length) {
      missingItems.push({ item: itemName, missing });
    }
  }

  return missingItems;
}

function listCategories(attributeMap = ATTRIBUTE_MAP) {
  return Object.keys(attributeMap).sort();
}

function formatReport(categoryPath, items) {
  if (!items.length) {
    return `All items in "${categoryPath}" have the required attributes.`;
  }

  const lines = [`Missing attributes for category "${categoryPath}":`];
  for (const { item, missing } of items) {
    lines.push(`- ${item}: ${missing.join(', ')}`);
  }
  return lines.join('\n');
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const wantJson = args.includes('--json');
  const listRequested = args.includes('--list');
  const checkAll = args.includes('--all');

  if (listRequested) {
    const categories = listCategories();
    if (wantJson) {
      console.log(JSON.stringify(categories, null, 2));
    } else {
      console.log(['Available categories:', ...categories.map(c => `- ${c}`)].join('\n'));
    }
    process.exit(0);
  }

  const categoryArgs = args.filter(arg => !arg.startsWith('--'));

  if (!categoryArgs.length && !checkAll) {
    console.log(
      [
        'Usage: node findMissingAttributes.js <category-path> [--json]',
        '',
        'Options:',
        '  --all        Check every category defined in src/data/schema.json',
        '  --json       Output results as JSON',
        '  --list       List all category paths available in src/data/schema.json',
        '',
        'Examples:',
        '  node findMissingAttributes.js cameras',
        '  node findMissingAttributes.js accessories.cages --json',
        '  node findMissingAttributes.js --all',
      ].join('\n'),
    );
    process.exit(1);
  }

  const categoriesToCheck = checkAll ? listCategories() : categoryArgs;
  const reports = [];

  for (const categoryPath of categoriesToCheck) {
    try {
      const missing = findMissingAttributes(categoryPath);
      reports.push({ category: categoryPath, missing });
    } catch (error) {
      reports.push({ category: categoryPath, error: error.message });
    }
  }

  if (wantJson) {
    console.log(JSON.stringify(reports, null, 2));
  } else {
    for (const report of reports) {
      if (report.error) {
        console.log(`Category "${report.category}": ${report.error}`);
      } else {
        console.log(formatReport(report.category, report.missing));
      }
      if (!checkAll && report !== reports[reports.length - 1]) {
        console.log('');
      }
    }
  }
}

module.exports = { findMissingAttributes, listCategories, buildAttributeMap, formatReport };
