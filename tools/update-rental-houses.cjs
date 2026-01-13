const fs = require('fs');
const path = require('path');

const existing = require('../src/data/rental-houses');
const updatesPath = path.join(__dirname, 'data', 'rental-houses-updates.json');
const updates = JSON.parse(fs.readFileSync(updatesPath, 'utf8'));

const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'rental-houses.js');
const ACCESS_DATE = '2025-02-14';

const shortNameMap = new Map(existing.map((entry) => [entry.name, entry.shortName]));

function inferShortName(name) {
  if (/\bARRI\b/i.test(name)) {
    return 'Arri';
  }
  if (/Ludwig Kameraverleih/i.test(name)) {
    return 'Kamera Ludwig';
  }
  if (/Shoot Blue/i.test(name)) {
    return 'Shoot Blue';
  }
  if (/MovieTech/i.test(name)) {
    return 'MovieTech';
  }
  if (/TSF/i.test(name)) {
    return 'TSF';
  }
  if (/Servicevision/i.test(name)) {
    return 'Servicevision';
  }
  if (/Vocas/i.test(name)) {
    return 'Vocas';
  }
  if (/Camera Nordic/i.test(name)) {
    return 'Camera Nordic';
  }
  if (/Ljud & Bildmedia/i.test(name)) {
    return 'Ljud & Bildmedia';
  }
  if (/Visuals Switzerland/i.test(name)) {
    return 'Visuals';
  }
  if (/Panalight/i.test(name)) {
    return 'Panalight';
  }
  if (/711rent/i.test(name)) {
    return '711rent';
  }
  if (/Panavision Grip & Remote Systems/i.test(name)) {
    return 'Panavision';
  }
  if (/Panavision/i.test(name)) {
    return 'Panavision';
  }
  if (/Camtec/i.test(name)) {
    return 'Camtec';
  }
  if (/Vantage Vision/i.test(name)) {
    return 'Vantage Vision';
  }
  if (/Vantage/i.test(name)) {
    return 'Vantage';
  }
  if (/Hawk Anamorphic/i.test(name)) {
    return 'Hawk';
  }
  if (/Hawk London/i.test(name)) {
    return 'Hawk';
  }
  if (/VMI/i.test(name)) {
    return 'VMI';
  }
  if (/Cameraworks/i.test(name)) {
    return 'Cameraworks';
  }
  if (/Direct Digital/i.test(name)) {
    return 'Direct Digital';
  }
  if (/Junction Rentals/i.test(name)) {
    return 'Junction Rentals';
  }
  if (/VA Hire/i.test(name)) {
    return 'VA Hire';
  }
  if (/Keslow Camera/i.test(name)) {
    return 'Keslow';
  }
  if (/Otto Nemenz/i.test(name)) {
    return 'Otto Nemenz';
  }
  if (/AbelCine/i.test(name)) {
    return 'AbelCine';
  }
  if (/Capsule Rentals/i.test(name)) {
    return 'Capsule';
  }
  if (/Light Up Co/i.test(name)) {
    return 'Light Up';
  }
  if (/Cinerent/i.test(name)) {
    return 'Cinerent';
  }
  if (/Quixote/i.test(name)) {
    return 'Quixote';
  }
  return null;
}

function normalizeValue(value) {
  if (value == null) {
    return '';
  }
  return `${value}`;
}

const updateMap = new Map();

for (const item of updates) {
  const name = item.name;
  const shortName = shortNameMap.get(name) || inferShortName(name);
  if (!shortName) {
    throw new Error(`Unable to determine shortName for ${name}`);
  }

  const existingEntry = existing.find((entry) => entry.name === name);
  const website = item.website ? `${item.website}` : '';
  const sourceUrl = website || (existingEntry ? existingEntry.sourceUrl || '' : '');

  updateMap.set(name, {
    name,
    shortName,
    city: normalizeValue(item.city),
    country: normalizeValue(item.country),
    address: normalizeValue(item.address),
    phone: normalizeValue(item.phone),
    email: normalizeValue(item.email),
    website,
    sourceQuote: normalizeValue(item.source),
    sourceUrl,
    accessDate: ACCESS_DATE
  });
}

for (const entry of existing) {
  if (!updateMap.has(entry.name)) {
    updateMap.set(entry.name, { ...entry });
  }
}

const finalEntries = Array.from(updateMap.values()).sort((a, b) =>
  a.name.localeCompare(b.name, 'en')
);

function escapeValue(value) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function formatEntry(entry, isLast) {
  const lines = [];
  lines.push('  Object.freeze({');
  lines.push(`    name: '${escapeValue(entry.name)}',`);
  lines.push(`    shortName: '${escapeValue(entry.shortName)}',`);
  lines.push(`    city: '${escapeValue(entry.city)}',`);
  lines.push(`    country: '${escapeValue(entry.country)}',`);
  lines.push(`    address: '${escapeValue(entry.address)}',`);
  lines.push(`    phone: '${escapeValue(entry.phone)}',`);
  lines.push(`    email: '${escapeValue(entry.email)}',`);
  lines.push(`    website: '${escapeValue(entry.website)}',`);
  lines.push(`    sourceQuote: '${escapeValue(entry.sourceQuote)}',`);
  lines.push(`    sourceUrl: '${escapeValue(entry.sourceUrl)}',`);
  lines.push(`    accessDate: '${escapeValue(entry.accessDate)}'`);
  lines.push(isLast ? '  })' : '  }),');
  return lines.join('\n');
}

const outputLines = [];
outputLines.push('const rentalHouses = Object.freeze([');
finalEntries.forEach((entry, index) => {
  outputLines.push(formatEntry(entry, index === finalEntries.length - 1));
});
outputLines.push(']);');
outputLines.push('');
outputLines.push('module.exports = rentalHouses;');
outputLines.push('');

fs.writeFileSync(OUTPUT_PATH, `${outputLines.join('\n')}\n`, 'utf8');

console.log(`Updated ${finalEntries.length} rental house entries.`);
