const fs = require('fs');
const path = require('path');
const vm = require('vm');

const { createDeviceSkeleton } = require('../helpers/scriptEnvironment');

function extractFunctionSource(filePath, functionName) {
  const source = fs.readFileSync(filePath, 'utf8');
  const signature = `function ${functionName}`;
  const start = source.indexOf(signature);
  if (start === -1) {
    throw new Error(`Function ${functionName} not found in ${filePath}`);
  }
  const braceStart = source.indexOf('{', start);
  if (braceStart === -1) {
    throw new Error(`Missing body for ${functionName}`);
  }
  let depth = 0;
  let end = braceStart;
  for (let index = braceStart; index < source.length; index += 1) {
    const char = source[index];
    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        end = index;
        break;
      }
    }
  }
  if (depth !== 0) {
    throw new Error(`Unbalanced braces while parsing ${functionName}`);
  }
  return source.slice(start, end + 1);
}

describe('removeOriginalDeviceEntry', () => {
  test('preserves empty cable subcategory containers after last device moves', () => {
    const devices = createDeviceSkeleton();
    devices.accessories.cables.power = {
      'Cable Alpha': { lengthM: 2 },
    };
    const context = {
      devices,
      getCategoryContainer(categoryKey, subcategory, options = {}) {
        const create = options.create === true;
        if (categoryKey === 'accessories.cables') {
          if (subcategory) {
            if (!devices.accessories.cables[subcategory] && create) {
              devices.accessories.cables[subcategory] = {};
            }
            return devices.accessories.cables[subcategory];
          }
          return devices.accessories.cables;
        }
        if (categoryKey.includes('.')) {
          const [main, sub] = categoryKey.split('.');
          if (!devices[main]) {
            if (create) {
              devices[main] = {};
            } else {
              return undefined;
            }
          }
          if (!devices[main][sub] && create) {
            devices[main][sub] = {};
          }
          return devices[main][sub];
        }
        if (!devices[categoryKey] && create) {
          devices[categoryKey] = {};
        }
        return devices[categoryKey];
      },
    };

    const functionSource = extractFunctionSource(
      path.join(__dirname, '../../src/scripts/app-core-new-1.js'),
      'removeOriginalDeviceEntry'
    );

    vm.createContext(context);
    vm.runInContext(`${functionSource}; this.__fn = removeOriginalDeviceEntry;`, context);
    const removeOriginalDeviceEntryRef = context.__fn;

    removeOriginalDeviceEntryRef(
      'accessories.cables',
      'power',
      'Cable Alpha',
      'accessories.cables',
      'fiz',
      'Cable Alpha'
    );

    expect(devices.accessories.cables.power).toBeDefined();
    expect(Object.keys(devices.accessories.cables.power)).toHaveLength(0);
  });
});
