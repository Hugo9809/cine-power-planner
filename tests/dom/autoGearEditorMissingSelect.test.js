const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { getHtmlBody } = require('../helpers/domUtils');

function extractFunctionSource(source, name) {
  const startToken = `function ${name}`;
  const startIndex = source.indexOf(startToken);
  if (startIndex === -1) {
    throw new Error(`Unable to locate ${name} in app-core source.`);
  }
  let braceIndex = source.indexOf('{', startIndex);
  if (braceIndex === -1) {
    throw new Error(`Unable to locate body for ${name}.`);
  }
  let depth = 1;
  let index = braceIndex + 1;
  while (depth > 0 && index < source.length) {
    const char = source[index];
    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
    }
    index += 1;
  }
  return source.slice(startIndex, index);
}

function loadFilterHelpers() {
  const sourcePath = path.join(__dirname, '../../src/scripts/app-core-new-2.js');
  const source = fs.readFileSync(sourcePath, 'utf8');
  const pieces = ['filterSelect', 'attachSelectSearch'].map(name => extractFunctionSource(source, name));
  const script = `${pieces.join('\n\n')}\nmodule.exports = { filterSelect, attachSelectSearch };`;
  const context = {
    module: { exports: {} },
    exports: {},
    setTimeout,
    clearTimeout,
  };
  vm.runInNewContext(script, context);
  return context.module.exports;
}

function removeAutoGearMonitorSelect(markup) {
  return markup.replace(
    /<select[^>]*id="autoGearMonitor"[\s\S]*?<\/select>/i,
    ''
  );
}

describe('auto-gear editor initialization resilience', () => {
  let attachSelectSearch;

  beforeEach(() => {
    document.body.innerHTML = removeAutoGearMonitorSelect(getHtmlBody());
    ({ attachSelectSearch } = loadFilterHelpers());
  });

  afterEach(() => {
    document.body.innerHTML = '';
    attachSelectSearch = null;
  });

  test('initializes when the monitor select is temporarily missing', () => {
    const autoGearEditor = document.getElementById('autoGearEditor');
    expect(autoGearEditor).toBeTruthy();

    const autoGearSelects = Array.from(
      autoGearEditor.querySelectorAll('select')
    );

    expect(() => {
      autoGearSelects.forEach(sel => attachSelectSearch(sel));
      const missingMonitorSelect = document.getElementById('autoGearMonitor');
      attachSelectSearch(missingMonitorSelect);
    }).not.toThrow();

    const restoredSelect = document.createElement('select');
    restoredSelect.id = 'autoGearMonitor';
    autoGearEditor.appendChild(restoredSelect);

    expect(() => attachSelectSearch(restoredSelect)).not.toThrow();
  });
});
