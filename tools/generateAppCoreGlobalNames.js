const fs = require('fs');
const path = require('path');

const globalsConfigPath = path.join(__dirname, 'appScriptGlobals.json');
const globalsConfig = JSON.parse(fs.readFileSync(globalsConfigPath, 'utf8'));

const allNames = Array.from(
  new Set(
    Object.values(globalsConfig)
      .filter(Array.isArray)
      .flat()
  )
).sort((a, b) => a.localeCompare(b));

const targetPath = path.join(__dirname, '..', 'src', 'scripts', 'app-core-global-names.js');

const header = '/* Auto-generated via tools/generateAppCoreGlobalNames.js. Do not edit manually. */\n';
const scopeResolver = `typeof globalThis !== 'undefined' ? globalThis :
  (typeof window !== 'undefined' ? window :
    (typeof self !== 'undefined' ? self :
      (typeof global !== 'undefined' ? global : null)))`;

const content = `${header}(function initialiseAppCoreGlobalNames(scope) {\n` +
  `  if (!scope || typeof scope !== 'object') {\n` +
  `    return;\n` +
  `  }\n` +
  `  var existing = scope.__cineAppCoreGlobalExportNames;\n` +
  `  if (Array.isArray(existing) && existing.length) {\n` +
  `    return;\n` +
  `  }\n` +
  `  scope.__cineAppCoreGlobalExportNames = ${JSON.stringify(allNames, null, 2)};\n` +
  `})(` + scopeResolver + `);\n`;

fs.writeFileSync(targetPath, content);
