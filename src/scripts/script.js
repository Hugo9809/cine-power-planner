const NUMBER_WORD_VALUES = new Map([
  ['zero', 0],
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
  ['ten', 10],
  ['eleven', 11],
  ['twelve', 12],
  ['thirteen', 13],
  ['fourteen', 14],
  ['fifteen', 15],
  ['sixteen', 16],
  ['seventeen', 17],
  ['eighteen', 18],
  ['nineteen', 19],
  ['twenty', 20],
  ['thirty', 30],
  ['forty', 40],
  ['fifty', 50],
  ['sixty', 60],
  ['seventy', 70],
  ['eighty', 80],
  ['ninety', 90],
]);

const NUMBER_WORD_MULTIPLIERS = new Map([
  ['hundred', 100],
  ['thousand', 1000],
]);

const ORDINAL_WORD_VALUES = new Map([
  ['first', 1],
  ['second', 2],
  ['third', 3],
  ['fourth', 4],
  ['fifth', 5],
  ['sixth', 6],
  ['seventh', 7],
  ['eighth', 8],
  ['ninth', 9],
  ['tenth', 10],
  ['eleventh', 11],
  ['twelfth', 12],
  ['thirteenth', 13],
  ['fourteenth', 14],
  ['fifteenth', 15],
  ['sixteenth', 16],
  ['seventeenth', 17],
  ['eighteenth', 18],
  ['nineteenth', 19],
  ['twentieth', 20],
  ['thirtieth', 30],
  ['fortieth', 40],
  ['fiftieth', 50],
  ['sixtieth', 60],
  ['seventieth', 70],
  ['eightieth', 80],
  ['ninetieth', 90],
]);

const ORDINAL_WORD_MULTIPLIERS = new Map([
  ['hundredth', 100],
  ['thousandth', 1000],
]);

const NUMBER_WORD_COMPONENTS = Array.from(
  new Set([
    ...NUMBER_WORD_VALUES.keys(),
    ...NUMBER_WORD_MULTIPLIERS.keys(),
    ...ORDINAL_WORD_VALUES.keys(),
    ...ORDINAL_WORD_MULTIPLIERS.keys(),
  ])
);

const NUMBER_WORD_PATTERN_FRAGMENT = NUMBER_WORD_COMPONENTS.join('|');

const NUMBER_WORD_PATTERN =
  NUMBER_WORD_COMPONENTS.length > 0
    ? new RegExp(
        `\\b(?:${NUMBER_WORD_PATTERN_FRAGMENT})(?:[\\s-]+(?:and|${NUMBER_WORD_PATTERN_FRAGMENT}))*\\b`,
        'g'
      )
    : null;

const normaliseNumberWords = value => {
  if (!value || !NUMBER_WORD_PATTERN) return value;
  const input = String(value);
  return input.replace(NUMBER_WORD_PATTERN, match => {
    const parts = match.split(/[\s-]+/).filter(Boolean);
    if (!parts.length) return match;
    let total = 0;
    let current = 0;
    let hasValue = false;
    for (const part of parts) {
      if (part === 'and') continue;
      if (ORDINAL_WORD_MULTIPLIERS.has(part)) {
        const multiplier = ORDINAL_WORD_MULTIPLIERS.get(part);
        if (typeof multiplier !== 'number') return match;
        if (current === 0) current = 1;
        current *= multiplier;
        total += current;
        current = 0;
        hasValue = true;
        continue;
      }
      if (NUMBER_WORD_MULTIPLIERS.has(part)) {
        const multiplier = NUMBER_WORD_MULTIPLIERS.get(part);
        if (typeof multiplier !== 'number') return match;
        if (current === 0) current = 1;
        current *= multiplier;
        if (multiplier >= 1000) {
          total += current;
          current = 0;
        }
        hasValue = true;
        continue;
      }
      let numericValue = null;
      if (ORDINAL_WORD_VALUES.has(part)) {
        numericValue = ORDINAL_WORD_VALUES.get(part);
      } else if (NUMBER_WORD_VALUES.has(part)) {
        numericValue = NUMBER_WORD_VALUES.get(part);
      }
      if (typeof numericValue !== 'number') {
        return match;
      }
      current += numericValue;
      hasValue = true;
    }
    if (!hasValue) return match;
    const numeric = total + current;
    return String(numeric);
  });
};

    .replace(/[×✕✖✗✘]/g, 'x')
    .replace(/\b(\d+)(st|nd|rd|th)\b/g, '$1');
  normalized = normaliseNumberWords(normalized);
    if (cleaned) {
      tokens.add(cleaned);
      const ordinalMatch = cleaned.match(/^(\d+)(st|nd|rd|th)$/);
      if (ordinalMatch) {
        tokens.add(ordinalMatch[1]);
      }
    }
  const ordinalNormalized = normalized.replace(/\b(\d+)(st|nd|rd|th)\b/g, '$1');
  if (ordinalNormalized !== normalized) {
    processParts(ordinalNormalized);
  }
  const numberNormalized = normaliseNumberWords(ordinalNormalized);
  if (numberNormalized !== ordinalNormalized) {
    processParts(numberNormalized);
  }
  const spellingNormalized = normalizeSpellingVariants(numberNormalized);
  if (spellingNormalized !== numberNormalized) {
