const UNICODE_FRACTIONS = new Map([
  ['¼', '1/4'],
  ['½', '1/2'],
  ['¾', '3/4'],
  ['⅓', '1/3'],
  ['⅔', '2/3'],
  ['⅕', '1/5'],
  ['⅖', '2/5'],
  ['⅗', '3/5'],
  ['⅘', '4/5'],
  ['⅙', '1/6'],
  ['⅚', '5/6'],
  ['⅛', '1/8'],
  ['⅜', '3/8'],
  ['⅝', '5/8'],
  ['⅞', '7/8'],
  ['⅑', '1/9'],
  ['⅒', '1/10'],
  ['⅐', '1/7'],
]);

const UNICODE_FRACTION_PATTERN =
  UNICODE_FRACTIONS.size > 0
    ? new RegExp(`[${Array.from(UNICODE_FRACTIONS.keys()).join('')}]`, 'g')
    : null;

function normalizeUnicodeFractions(str) {
  if (!UNICODE_FRACTION_PATTERN || typeof str !== 'string' || !str) {
    return str;
  }
  return str.replace(
    UNICODE_FRACTION_PATTERN,
    (match) => UNICODE_FRACTIONS.get(match) || match,
  );
}

const NUMBER_WORD_ONES = new Map([
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
]);

const NUMBER_WORD_TEENS = new Map([
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
]);

const NUMBER_WORD_TENS = new Map([
  ['twenty', 20],
  ['thirty', 30],
  ['forty', 40],
  ['fifty', 50],
  ['sixty', 60],
  ['seventy', 70],
  ['eighty', 80],
  ['ninety', 90],
]);

const NUMBER_WORD_BASE = new Map([
  ...NUMBER_WORD_ONES,
  ...NUMBER_WORD_TEENS,
  ...NUMBER_WORD_TENS,
]);

const NUMBER_WORD_BASE_KEYS = Array.from(NUMBER_WORD_BASE.keys()).sort((a, b) => b.length - a.length);
const NUMBER_WORD_ONES_KEYS = Array.from(NUMBER_WORD_ONES.keys()).sort((a, b) => b.length - a.length);

const NUMBER_WORD_PATTERN =
  NUMBER_WORD_BASE.size > 0
    ? new RegExp(
        `\\b(?:${NUMBER_WORD_BASE_KEYS.join('|')})(?:[\\s-](?:${NUMBER_WORD_ONES_KEYS.join('|')}))?\\b`,
        'g',
      )
    : null;

function normalizeNumberWords(str) {
  if (!NUMBER_WORD_PATTERN || typeof str !== 'string' || !str) {
    return str;
  }
  return str.replace(NUMBER_WORD_PATTERN, (match) => {
    const lower = match.toLowerCase();
    if (NUMBER_WORD_BASE.has(lower)) {
      return String(NUMBER_WORD_BASE.get(lower));
    }
    const parts = lower.split(/[\s-]+/).filter(Boolean);
    if (parts.length === 2) {
      const tens = NUMBER_WORD_TENS.get(parts[0]);
      const ones = NUMBER_WORD_ONES.get(parts[1]);
      if (typeof tens === 'number' && typeof ones === 'number') {
        return String(tens + ones);
      }
    }
    return match;
  });
}

const SPELLING_VARIANTS = new Map([
  ['analyse', 'analyze'],
  ['analysed', 'analyzed'],
  ['analyses', 'analyzes'],
  ['analysing', 'analyzing'],
  ['behaviour', 'behavior'],
  ['behaviours', 'behaviors'],
  ['behavioural', 'behavioral'],
  ['behaviourally', 'behaviorally'],
  ['centre', 'center'],
  ['centres', 'centers'],
  ['colour', 'color'],
  ['colourful', 'colorful'],
  ['colouring', 'coloring'],
  ['colourings', 'colorings'],
  ['colourless', 'colorless'],
  ['colours', 'colors'],
  ['customisation', 'customization'],
  ['customisations', 'customizations'],
  ['customise', 'customize'],
  ['customised', 'customized'],
  ['customises', 'customizes'],
  ['customising', 'customizing'],
  ['defence', 'defense'],
  ['defences', 'defenses'],
  ['favour', 'favor'],
  ['favourable', 'favorable'],
  ['favourably', 'favorably'],
  ['favoured', 'favored'],
  ['favourite', 'favorite'],
  ['favourites', 'favorites'],
  ['favouring', 'favoring'],
  ['favours', 'favors'],
  ['licence', 'license'],
  ['licences', 'licenses'],
  ['localisation', 'localization'],
  ['localisations', 'localizations'],
  ['localise', 'localize'],
  ['localised', 'localized'],
  ['localises', 'localizes'],
  ['localising', 'localizing'],
  ['modelling', 'modeling'],
  ['modeller', 'modeler'],
  ['modellers', 'modelers'],
  ['optimisation', 'optimization'],
  ['optimisations', 'optimizations'],
  ['optimise', 'optimize'],
  ['optimised', 'optimized'],
  ['optimises', 'optimizes'],
  ['optimising', 'optimizing'],
  ['organisation', 'organization'],
  ['organisations', 'organizations'],
  ['organise', 'organize'],
  ['organised', 'organized'],
  ['organises', 'organizes'],
  ['organising', 'organizing'],
  ['personalisation', 'personalization'],
  ['personalisations', 'personalizations'],
  ['personalise', 'personalize'],
  ['personalised', 'personalized'],
  ['personalises', 'personalizes'],
  ['personalising', 'personalizing'],
  ['practise', 'practice'],
  ['practised', 'practiced'],
  ['practises', 'practices'],
  ['practising', 'practicing'],
  ['theatre', 'theater'],
  ['theatres', 'theaters'],
  ['traveller', 'traveler'],
  ['travellers', 'travelers'],
  ['travelling', 'traveling'],
]);

const SPELLING_VARIANT_PATTERN =
  SPELLING_VARIANTS.size > 0
    ? new RegExp(`\\b(${Array.from(SPELLING_VARIANTS.keys()).join('|')})\\b`, 'g')
    : null;

function normalizeSpellingVariants(str) {
  if (!SPELLING_VARIANT_PATTERN || typeof str !== 'string') {
    return str;
  }
  return str.replace(SPELLING_VARIANT_PATTERN, (match) => SPELLING_VARIANTS.get(match) || match);
}

const ROMAN_NUMERAL_VALUES = { i: 1, v: 5, x: 10, l: 50, c: 100, d: 500, m: 1000 };
const ROMAN_NUMERAL_PATTERN = /^[ivxlcdm]+$/;

function parseMarkSuffix(value) {
  if (!value) {
    return { cleaned: '', number: null };
  }
  const cleaned = value.replace(/[^a-z0-9]+/g, '');
  if (!cleaned) {
    return { cleaned: '', number: null };
  }
  let number = null;
  if (/^\d+$/.test(cleaned)) {
    number = parseInt(cleaned, 10);
  } else if (ROMAN_NUMERAL_PATTERN.test(cleaned)) {
    let total = 0;
    let prev = 0;
    for (let i = cleaned.length - 1; i >= 0; i -= 1) {
      const char = cleaned[i];
      const current = ROMAN_NUMERAL_VALUES[char];
      if (!current) {
        total = 0;
        break;
      }
      if (current < prev) {
        total -= current;
      } else {
        total += current;
        prev = current;
      }
    }
    if (total > 0) {
      number = total;
    }
  }
  return { cleaned, number };
}

function normaliseMarkVariants(str) {
  if (typeof str !== 'string') {
    return str;
  }
  return str.replace(/\b(mark|mk)[\s-]*(\d+|[ivxlcdm]+)\b/gi, (_match, _prefix, rawValue) => {
    const { cleaned, number } = parseMarkSuffix(rawValue);
    if (!cleaned) return 'mk';
    const suffix = number != null ? String(number) : cleaned;
    return `mk${suffix}`;
  });
}

function applySearchTokenSynonyms(tokens, addToken) {
  if (!tokens || typeof addToken !== 'function') {
    return;
  }

  const baseTokens = Array.isArray(tokens) ? tokens : Array.from(tokens);
  if (!Array.isArray(baseTokens) || baseTokens.length === 0) {
    return;
  }

  const tokenSet = new Set(baseTokens);
  const hasAny = (values) => values.some((value) => tokenSet.has(value));
  const hasAllGroups = (groups) =>
    groups.every((group) => {
      const list = Array.isArray(group) ? group : [group];
      return list.some((value) => tokenSet.has(value));
    });
  const addAll = (values) => {
    values.forEach((value) => {
      addToken(value);
    });
  };

  if (
    hasAny(['fps', 'framerate', 'framepersecond', 'framespersecond']) ||
    hasAllGroups([
      ['frame', 'frames'],
      ['per', 'persecond', 'persec'],
      ['second', 'seconds', 'sec'],
    ]) ||
    hasAllGroups([
      ['frame', 'frames'],
      ['rate'],
    ])
  ) {
    addAll([
      'fps',
      'framerate',
      'framepersecond',
      'framespersecond',
      'frame',
      'frames',
      'second',
      'seconds',
    ]);
  }

  if (hasAny(['wh', 'watthour', 'watthours'])) {
    addAll(['wh', 'watthour', 'watthours', 'watt', 'watts', 'hour', 'hours']);
  } else if (hasAllGroups([
    ['watt', 'watts'],
    ['hour', 'hours', 'hr', 'hrs'],
  ])) {
    addAll(['wh', 'watthour', 'watthours']);
  }

  if (hasAny(['kwh', 'kilowatthour', 'kilowatthours'])) {
    addAll([
      'kwh',
      'kilowatthour',
      'kilowatthours',
      'kilowatt',
      'kilowatts',
      'watt',
      'watts',
      'hour',
      'hours',
    ]);
  } else if (hasAllGroups([
    ['kilowatt', 'kilowatts', 'kw'],
    ['hour', 'hours', 'hr', 'hrs'],
  ])) {
    addAll(['kwh', 'kilowatthour', 'kilowatthours']);
  }

  if (hasAny(['ah', 'amphour', 'amphours'])) {
    addAll(['ah', 'amphour', 'amphours', 'amp', 'amps', 'ampere', 'amperes', 'hour', 'hours']);
  } else if (hasAllGroups([
    ['amp', 'amps', 'ampere', 'amperes'],
    ['hour', 'hours', 'hr', 'hrs'],
  ])) {
    addAll(['ah', 'amphour', 'amphours']);
  }

  if (hasAny(['mah', 'milliamphour', 'milliamphours'])) {
    addAll([
      'mah',
      'milliamphour',
      'milliamphours',
      'milliamp',
      'milliamps',
      'milliampere',
      'milliamperes',
      'ma',
      'hour',
      'hours',
    ]);
  } else if (hasAllGroups([
    ['milliamp', 'milliamps', 'milliampere', 'milliamperes', 'ma'],
    ['hour', 'hours', 'hr', 'hrs'],
  ])) {
    addAll(['mah', 'milliamphour', 'milliamphours']);
  }

  if (hasAny(['mp', 'megapixel', 'megapixels'])) {
    addAll(['mp', 'megapixel', 'megapixels']);
  }

  if (hasAny(['mm', 'millimeter', 'millimeters'])) {
    addAll(['mm', 'millimeter', 'millimeters']);
  }

  if (hasAny(['cm', 'centimeter', 'centimeters'])) {
    addAll(['cm', 'centimeter', 'centimeters']);
  }

  if (hasAny(['ev', 'exposurevalue'])) {
    addAll(['ev', 'exposurevalue', 'exposure', 'value']);
  } else if (hasAllGroups([
    ['exposure'],
    ['value'],
  ])) {
    addAll(['ev', 'exposurevalue']);
  }
}

function searchTokens(str) {
  if (!str) return [];
  let normalized = String(str).toLowerCase();
  if (typeof normalized.normalize === 'function') {
    normalized = normalized.normalize('NFD');
  }
  normalized = normalized
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/æ/g, 'ae')
    .replace(/œ/g, 'oe')
    .replace(/ø/g, 'o')
    .replace(/&/g, ' and ')
    .replace(/\+/g, ' plus ')
    .replace(/[°º˚]/g, ' deg ')
    .replace(/\bdegrees?\b/g, ' deg ')
    .replace(/[×✕✖✗✘]/g, ' x by ');
  normalized = normalizeUnicodeFractions(normalized);
  const numberNormalized = normalizeNumberWords(normalized);
  const tokens = new Set();
  const initialWords = [];
  const addToken = (token) => {
    if (!token) return;
    const cleaned = token.replace(/[^a-z0-9]+/g, '');
    if (cleaned) tokens.add(cleaned);
  };
  const isAlpha = (value) => /^[a-z]+$/.test(value);
  const isNumeric = (value) => /^\d+$/.test(value);
  const addAlphaNumericVariants = (segment) => {
    if (!segment) return;
    const groups = segment.match(/[a-z]+|\d+/g);
    if (!groups || groups.length <= 1) return;
    groups.forEach((part) => {
      if (isNumeric(part) || part.length > 1) {
        addToken(part);
      }
    });
    for (let index = 0; index < groups.length - 1; index += 1) {
      const current = groups[index];
      const next = groups[index + 1];
      if (!current || !next) continue;
      const combined = `${current}${next}`;
      if (!combined || combined === segment) continue;
      if (
        (isAlpha(current) && isNumeric(next)) ||
        (isNumeric(current) && isAlpha(next)) ||
        (current.length > 1 && next.length > 1)
      ) {
        addToken(combined);
      }
    }
  };
  const processParts = (strToProcess, collectInitials = false) => {
    strToProcess.split(/\s+/).forEach((part) => {
      if (!part) return;
      addToken(part);
      part
        .split(/[^a-z0-9]+/)
        .filter(Boolean)
        .forEach((segment) => {
          addToken(segment);
          addAlphaNumericVariants(segment);
          if (collectInitials && /^[a-z]/.test(segment)) {
            initialWords.push(segment);
          }
        });
    });
  };
  processParts(normalized, true);
  if (numberNormalized !== normalized) {
    processParts(numberNormalized);
  }
  const spellingNormalized = normalizeSpellingVariants(numberNormalized);
  if (spellingNormalized !== numberNormalized) {
    processParts(spellingNormalized);
  }
  const markNormalized = normaliseMarkVariants(spellingNormalized);
  if (markNormalized !== spellingNormalized) {
    processParts(markNormalized);
  }
  if (initialWords.length >= 2) {
    const MAX_INITIALISM_LENGTH = 6;
    const initials = initialWords.map((word) => word[0]).filter(Boolean);
    const limit = Math.min(initials.length, MAX_INITIALISM_LENGTH);
    for (let start = 0; start < limit; start += 1) {
      let current = '';
      for (let index = start; index < limit; index += 1) {
        current += initials[index];
        if (current.length >= 2) {
          addToken(current);
        }
      }
    }
  }
  const markPattern = /\b(mark|mk)[\s-]*(\d+|[ivxlcdm]+)\b/g;
  let match;
  const variantSource = spellingNormalized || normalized;
  while ((match = markPattern.exec(variantSource)) !== null) {
    const prefix = match[1];
    const rawValue = match[2];
    const { cleaned, number } = parseMarkSuffix(rawValue);
    if (!cleaned) continue;
    const altPrefix = prefix === 'mk' ? 'mark' : 'mk';
    addToken(prefix);
    addToken(altPrefix);
    addToken(cleaned);
    addToken(`${prefix}${cleaned}`);
    addToken(`${altPrefix}${cleaned}`);
    if (number != null) {
      const numberToken = String(number);
      addToken(numberToken);
      addToken(`${prefix}${numberToken}`);
      addToken(`${altPrefix}${numberToken}`);
    }
  }
  applySearchTokenSynonyms(tokens, addToken);
  return Array.from(tokens);
}

module.exports = {
  searchTokens,
};
