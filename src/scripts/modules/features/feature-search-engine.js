/* global cineModuleBase */

(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return {};
  }

  const GLOBAL_SCOPE = detectGlobalScope();

  function resolveModuleBase(scope) {
    if (typeof cineModuleBase === 'object' && cineModuleBase) {
      return cineModuleBase;
    }

    const runningInCommonJs =
      typeof module === 'object' && module && typeof module.exports !== 'undefined';

    if (!runningInCommonJs && typeof require === 'function') {
      try {
        const required = require('../base.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (scope && typeof scope.cineModuleBase === 'object') {
      return scope.cineModuleBase;
    }

    return null;
  }

  const ROMAN_NUMERAL_VALUES = {
    i: 1,
    v: 5,
    x: 10,
    l: 50,
    c: 100,
    d: 500,
    m: 1000,
  };

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
      for (let index = cleaned.length - 1; index >= 0; index -= 1) {
        const char = cleaned[index];
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
    if (typeof str !== 'string' || !str) {
      return str;
    }

    return str.replace(/\b(mark|mk)[\s-]*(\d+|[ivxlcdm]+)\b/gi, (_match, _prefix, rawValue) => {
      const { cleaned, number } = parseMarkSuffix(rawValue);
      if (!cleaned) {
        return 'mk';
      }
      const suffix = number != null ? String(number) : cleaned;
      return `mk${suffix}`;
    });
  }

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
      match => UNICODE_FRACTIONS.get(match) || match,
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

  const NUMBER_WORD_BASE_KEYS = Array.from(NUMBER_WORD_BASE.keys()).sort(
    (a, b) => b.length - a.length,
  );

  const NUMBER_WORD_ONES_KEYS = Array.from(NUMBER_WORD_ONES.keys()).sort(
    (a, b) => b.length - a.length,
  );

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

    return str.replace(NUMBER_WORD_PATTERN, match => {
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

    return str.replace(
      SPELLING_VARIANT_PATTERN,
      match => SPELLING_VARIANTS.get(match) || match,
    );
  }

  const DOUBLE_PRIME_VARIANTS_PATTERN = /[″‶‴⁗]/g;
  const SINGLE_PRIME_VARIANTS_PATTERN = /[′‵]/g;
  const MEASUREMENT_VALUE_PATTERN = String.raw`\d+(?:\s*[.,/-]\s*\d+)*(?:\s+\d+(?:\s*[.,/-]\s*\d+)*)*`;
  const MEASUREMENT_FOOT_WORD_PATTERN = new RegExp(
    String.raw`(${MEASUREMENT_VALUE_PATTERN})[\s-]*(?:feet|foot|ft\.?)(?![a-z])`,
    'gi',
  );
  const MEASUREMENT_FOOT_PRIME_PATTERN = new RegExp(
    String.raw`(${MEASUREMENT_VALUE_PATTERN})\s*['’](?=\s|[\d"”″'-]|$)`,
    'g',
  );
  const MEASUREMENT_INCH_WORD_PATTERN = new RegExp(
    String.raw`(${MEASUREMENT_VALUE_PATTERN})[\s-]*(?:inches|inch|in\.?)(?![a-z])`,
    'gi',
  );
  const MEASUREMENT_INCH_PRIME_PATTERN = new RegExp(
    String.raw`(${MEASUREMENT_VALUE_PATTERN})\s*["”″](?=\s|[\d'’"-]|$)`,
    'g',
  );
  function cleanMeasurementValue(value) {
    return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : value;
  }

  function normalizeMeasurementUnits(str) {
    if (typeof str !== 'string' || !str) {
      return str;
    }

    let normalized = str
      .replace(DOUBLE_PRIME_VARIANTS_PATTERN, '"')
      .replace(SINGLE_PRIME_VARIANTS_PATTERN, "'");

    normalized = normalized.replace(MEASUREMENT_FOOT_WORD_PATTERN, (match, value) => {
      void match;
      const cleaned = cleanMeasurementValue(value);
      return cleaned ? `${cleaned} ft ` : value;
    });

    normalized = normalized.replace(MEASUREMENT_FOOT_PRIME_PATTERN, (match, value) => {
      void match;
      const cleaned = cleanMeasurementValue(value);
      return cleaned ? `${cleaned} ft ` : value;
    });

    normalized = normalized.replace(MEASUREMENT_INCH_WORD_PATTERN, (match, value) => {
      void match;
      const cleaned = cleanMeasurementValue(value);
      return cleaned ? `${cleaned} inch ` : value;
    });

    normalized = normalized.replace(MEASUREMENT_INCH_PRIME_PATTERN, (match, value) => {
      void match;
      const cleaned = cleanMeasurementValue(value);
      return cleaned ? `${cleaned} inch ` : value;
    });

    return normalized;
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

    const hasAny = values => values.some(value => tokenSet.has(value));
    const hasAllGroups = groups =>
      groups.every(group => {
        const list = Array.isArray(group) ? group : [group];
        return list.some(value => tokenSet.has(value));
      });

    const addAll = values => {
      values.forEach(value => {
        addToken(value);
      });
    };

    const ensureSynonymGroup = (triggers, expansions, groupRequirements) => {
      const triggerList = Array.isArray(triggers) ? triggers : [triggers];
      const requirementGroups = Array.isArray(groupRequirements) ? groupRequirements : [];
      if (
        (triggerList.length && hasAny(triggerList)) ||
        (requirementGroups.length > 0 && hasAllGroups(requirementGroups))
      ) {
        const expansionList = Array.isArray(expansions) ? expansions : [expansions];
        const combined = new Set([...triggerList, ...expansionList]);
        addAll(Array.from(combined));
      }
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

    ensureSynonymGroup(
      ['delete', 'remove', 'clear', 'trash', 'bin', 'discard', 'erase', 'wipe'],
      ['delete', 'remove', 'clear', 'trash', 'bin', 'discard', 'erase', 'wipe'],
    );

    ensureSynonymGroup(
      ['save', 'backup', 'store', 'archive', 'preserve', 'safeguard', 'protect'],
      ['save', 'backup', 'store', 'archive', 'preserve', 'safeguard', 'protect'],
    );

    ensureSynonymGroup(
      ['restore', 'recover', 'load', 'import', 'rollback', 'return', 'reopen'],
      ['restore', 'recover', 'load', 'import', 'rollback', 'return', 'reopen'],
    );

    ensureSynonymGroup(
      ['share', 'export', 'send', 'distribute', 'forward', 'deliver', 'publish'],
      ['share', 'export', 'send', 'distribute', 'forward', 'deliver', 'publish'],
    );

    ensureSynonymGroup(
      ['duplicate', 'copy', 'clone', 'replicate', 'mirror'],
      ['duplicate', 'copy', 'clone', 'replicate', 'mirror'],
    );

    ensureSynonymGroup(
      ['autosave', 'autobackup', 'autosync', 'autosynchronize'],
      ['autosave', 'autobackup', 'autosync', 'autosynchronize'],
      [
        ['auto', 'automatic'],
        ['save', 'backup', 'sync', 'synchronise', 'synchronize'],
      ],
    );

    if (hasAny(['wh', 'watthour', 'watthours'])) {
      addAll(['wh', 'watthour', 'watthours', 'watt', 'watts', 'hour', 'hours']);
    } else if (
      hasAllGroups([
        ['watt', 'watts'],
        ['hour', 'hours', 'hr', 'hrs'],
      ])
    ) {
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
    } else if (
      hasAllGroups([
        ['kilowatt', 'kilowatts', 'kw'],
        ['hour', 'hours', 'hr', 'hrs'],
      ])
    ) {
      addAll(['kwh', 'kilowatthour', 'kilowatthours']);
    }

    if (hasAny(['ah', 'amphour', 'amphours'])) {
      addAll([
        'ah',
        'amphour',
        'amphours',
        'amp',
        'amps',
        'ampere',
        'amperes',
        'hour',
        'hours',
      ]);
    } else if (
      hasAllGroups([
        ['amp', 'amps', 'ampere', 'amperes'],
        ['hour', 'hours', 'hr', 'hrs'],
      ])
    ) {
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
    } else if (
      hasAllGroups([
        ['milliamp', 'milliamps', 'milliampere', 'milliamperes', 'ma'],
        ['hour', 'hours', 'hr', 'hrs'],
      ])
    ) {
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

    if (hasAny(['inch', 'inches'])) {
      addAll(['inch', 'inches', 'in']);
    }

    if (hasAny(['ft', 'foot', 'feet'])) {
      addAll(['ft', 'foot', 'feet']);
    }

    if (hasAny(['ev', 'exposurevalue'])) {
      addAll(['ev', 'exposurevalue', 'exposure', 'value']);
    } else if (
      hasAllGroups([
        ['exposure'],
        ['value'],
      ])
    ) {
      addAll(['ev', 'exposurevalue']);
    }

    ensureSynonymGroup(
      ['usbc', 'usbtypec', 'usbctype', 'typec'],
      ['usbc', 'usbtypec', 'usbctype', 'typec', 'usbpowerdelivery', 'powerdelivery', 'pd'],
      [
        ['usb'],
        ['c', 'typec'],
      ],
    );

    ensureSynonymGroup(
      ['usba', 'usbtypea', 'typea'],
      ['usba', 'usbtypea', 'typea'],
      [
        ['usb'],
        ['a', 'typea'],
      ],
    );

    ensureSynonymGroup(
      ['microusb', 'usbmicro', 'usbmicrob'],
      ['microusb', 'usbmicro', 'usbmicrob'],
      [
        ['usb'],
        ['micro'],
      ],
    );

    ensureSynonymGroup(
      ['miniusb', 'usbmini', 'usbminib'],
      ['miniusb', 'usbmini', 'usbminib'],
      [
        ['usb'],
        ['mini'],
      ],
    );

    ensureSynonymGroup(
      ['microhdmi', 'hdmimicro'],
      ['microhdmi', 'hdmimicro'],
      [
        ['micro'],
        ['hdmi'],
      ],
    );

    ensureSynonymGroup(
      ['minihdmi', 'hdmimini'],
      ['minihdmi', 'hdmimini', 'hdmitypec'],
      [
        ['mini'],
        ['hdmi'],
      ],
    );

    ensureSynonymGroup(
      ['fullhdmi', 'hdmitypea'],
      ['fullhdmi', 'hdmitypea'],
      [
        ['full'],
        ['hdmi'],
      ],
    );

    ensureSynonymGroup(
      ['sdxc'],
      ['sdxc', 'secureddxc', 'secureddigitalxc'],
      [
        ['sd'],
        ['xc'],
      ],
    );

    ensureSynonymGroup(
      ['sdhc'],
      ['sdhc', 'secureddigitalhc'],
      [
        ['sd'],
        ['hc'],
      ],
    );

    ensureSynonymGroup(
      ['cfexpress', 'cfexpresstypea', 'cfexpresstypeb'],
      ['cfexpress', 'cfexpresstypea', 'cfexpresstypeb'],
      [
        ['cf'],
        ['express'],
      ],
    );

    ensureSynonymGroup(
      ['cfast'],
      ['cfast'],
      [
        ['cf'],
        ['ast', 'fast'],
      ],
    );

    ensureSynonymGroup(
      ['xqd'],
      ['xqd'],
      [
        ['qd'],
      ],
    );

    ensureSynonymGroup(
      ['dtap', 'ptap', 'powertap'],
      ['dtap', 'ptap', 'powertap'],
      [
        ['d', 'p'],
        ['tap'],
      ],
    );

    ensureSynonymGroup(
      ['vmount', 'vlock'],
      ['vmount', 'vlock', 'vmountbattery', 'vmountplate'],
      [
        ['v'],
        ['mount', 'lock'],
      ],
    );

    ensureSynonymGroup(
      ['bmount'],
      ['bmount', 'bmountrib'],
      [
        ['b'],
        ['mount'],
      ],
    );

    ensureSynonymGroup(
      ['goldmount', 'antonbauer'],
      ['goldmount', 'antonbauer'],
      [
        ['gold'],
        ['mount'],
      ],
    );
  }

  const FEATURE_SEARCH_FUZZY_MAX_DISTANCE = 2;

  function createEngine(options) {
    const engineOptions = typeof options === 'object' && options ? options : {};
    const fuzzyMaxDistance = Number.isFinite(engineOptions.fuzzyMaxDistance)
      ? Math.max(1, Math.floor(engineOptions.fuzzyMaxDistance))
      : FEATURE_SEARCH_FUZZY_MAX_DISTANCE;

    const fuzzyCache = typeof Map === 'function' ? new Map() : null;

    const getFuzzyDistance = (source, target) => {
      if (!source || !target) {
        return Number.POSITIVE_INFINITY;
      }

      const shorter = source.length <= target.length ? source : target;
      const longer = source.length > target.length ? source : target;
      const cacheKey = `${shorter}\u0000${longer}`;

      if (fuzzyCache && fuzzyCache.has(cacheKey)) {
        return fuzzyCache.get(cacheKey);
      }

      const sourceLength = source.length;
      const targetLength = target.length;

      if (Math.abs(sourceLength - targetLength) > fuzzyMaxDistance) {
        if (fuzzyCache) {
          fuzzyCache.set(cacheKey, Number.POSITIVE_INFINITY);
        }
        return Number.POSITIVE_INFINITY;
      }

      const previous = new Array(targetLength + 1);
      const current = new Array(targetLength + 1);

      for (let i = 0; i <= targetLength; i += 1) {
        previous[i] = i;
      }

      for (let i = 1; i <= sourceLength; i += 1) {
        current[0] = i;
        let bestInRow = current[0];
        const sourceChar = source.charAt(i - 1);

        for (let j = 1; j <= targetLength; j += 1) {
          const cost = sourceChar === target.charAt(j - 1) ? 0 : 1;
          current[j] = Math.min(
            previous[j] + 1,
            current[j - 1] + 1,
            previous[j - 1] + cost,
          );
          if (current[j] < bestInRow) {
            bestInRow = current[j];
          }
        }

        if (bestInRow > fuzzyMaxDistance) {
          if (fuzzyCache) {
            fuzzyCache.set(cacheKey, Number.POSITIVE_INFINITY);
          }
          return Number.POSITIVE_INFINITY;
        }

        for (let j = 0; j <= targetLength; j += 1) {
          previous[j] = current[j];
        }
      }

      const result = previous[targetLength];
      if (fuzzyCache) {
        fuzzyCache.set(cacheKey, result);
      }
      return result;
    };

    const computeFuzzyTokenScore = (token, entryToken) => {
      if (!token || !entryToken) {
        return 0;
      }
      if (token.length <= 2 || entryToken.length <= 2) {
        return 0;
      }

      const distance = getFuzzyDistance(token, entryToken);
      if (!Number.isFinite(distance) || distance > fuzzyMaxDistance) {
        return 0;
      }
      if (distance === 0) {
        return 3;
      }
      if (distance === 1) {
        return 2;
      }
      return 1;
    };

    const CACHE_SUPPORTS_MAP = typeof Map === 'function';
    const CACHE_LIMIT_KEY = 400;
    const CACHE_LIMIT_TOKENS = 250;
    const CACHE_KEY_MAX_LENGTH = 200;
    const CACHE_TOKENS_MAX_LENGTH = 200;
    const FREEZE_SUPPORT = typeof Object.freeze === 'function';

    const createCache = limit => {
      if (CACHE_SUPPORTS_MAP) {
        const map = new Map();
        return {
          get(key) {
            return map.has(key) ? map.get(key) : undefined;
          },
          set(key, value) {
            if (map.has(key)) {
              map.set(key, value);
              return;
            }

            if (map.size >= limit) {
              const iterator = map.keys();
              const first = iterator && typeof iterator.next === 'function' ? iterator.next() : null;
              if (first && !first.done) {
                map.delete(first.value);
              }
            }

            map.set(key, value);
          },
        };
      }

      const entries = [];
      return {
        get(key) {
          for (let index = 0; index < entries.length; index += 1) {
            const entry = entries[index];
            if (entry && entry[0] === key) {
              return entry[1];
            }
          }
          return undefined;
        },
        set(key, value) {
          for (let index = 0; index < entries.length; index += 1) {
            if (entries[index] && entries[index][0] === key) {
              entries.splice(index, 1);
              break;
            }
          }

          entries.push([key, value]);

          if (entries.length > limit) {
            entries.shift();
          }
        },
      };
    };

    const freezeArray = array => {
      if (!Array.isArray(array) || !FREEZE_SUPPORT) {
        return array;
      }

      try {
        return Object.freeze(array);
      } catch (error) {
        void error;
        return array;
      }
    };

    const keyCache = createCache(CACHE_LIMIT_KEY);
    const tokensCache = createCache(CACHE_LIMIT_TOKENS);

    const computeTokenMatchDetails = (entryTokens = [], queryTokens = []) => {
      if (!Array.isArray(entryTokens) || entryTokens.length === 0) {
        return { score: 0, matched: 0 };
      }

      const validQueryTokens = Array.isArray(queryTokens)
        ? queryTokens.filter(Boolean)
        : [];
      if (validQueryTokens.length === 0) {
        return { score: 0, matched: 0 };
      }

      let total = 0;
      let matched = 0;

      for (const token of validQueryTokens) {
        let best = 0;
        for (const entryToken of entryTokens) {
          if (!entryToken) continue;
          if (entryToken === token) {
            best = 3;
            break;
          }
          if (entryToken.startsWith(token) || token.startsWith(entryToken)) {
            best = Math.max(best, 2);
          } else if (entryToken.includes(token) || token.includes(entryToken)) {
            best = Math.max(best, 1);
          } else {
            const fuzzyScore = computeFuzzyTokenScore(token, entryToken);
            if (fuzzyScore > 0) {
              best = Math.max(best, fuzzyScore);
            }
          }
        }
        if (best > 0) {
          matched += 1;
          total += best;
        }
      }

      if (matched === 0) {
        return { score: 0, matched: 0 };
      }

      return { score: total, matched };
    };

    const searchKey = value => {
      if (!value) {
        return '';
      }

      const str = String(value);
      const cacheable = str.length <= CACHE_KEY_MAX_LENGTH;
      if (cacheable) {
        const cached = keyCache.get(str);
        if (typeof cached !== 'undefined') {
          return cached;
        }
      }

      let normalized = str.toLowerCase();

      if (typeof normalized.normalize === 'function') {
        normalized = normalized.normalize('NFD');
      }

      normalized = normalized
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ß/g, 'ss')
        .replace(/æ/g, 'ae')
        .replace(/œ/g, 'oe')
        .replace(/ø/g, 'o')
        .replace(/&/g, 'and')
        .replace(/\+/g, 'plus')
        .replace(/[°º˚]/g, 'deg')
        .replace(/\bdegrees?\b/g, 'deg')
        .replace(/[×✕✖✗✘]/g, 'x');

      normalized = normalizeUnicodeFractions(normalized);
      normalized = normalizeNumberWords(normalized);
      normalized = normalizeMeasurementUnits(normalized);
      normalized = normalizeSpellingVariants(normalized);
      normalized = normaliseMarkVariants(normalized);

      const simplified = normalized.replace(/[^a-z0-9]+/g, '');
      if (simplified) {
        if (cacheable) {
          keyCache.set(str, simplified);
        }
        return simplified;
      }

      const fallback = str.toLowerCase().replace(/\s+/g, '');
      if (cacheable) {
        keyCache.set(str, fallback);
      }
      return fallback;
    };

    const searchTokens = value => {
      if (!value) {
        return [];
      }

      const str = String(value);
      const cacheable = str.length <= CACHE_TOKENS_MAX_LENGTH;
      if (cacheable) {
        const cached = tokensCache.get(str);
        if (typeof cached !== 'undefined') {
          return cached;
        }
      }

      let normalized = str.toLowerCase();
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
      normalized = normalizeMeasurementUnits(normalized);
      const numberNormalized = normalizeNumberWords(normalized);
      const measurementNormalized = normalizeMeasurementUnits(numberNormalized);

      const tokens = new Set();
      const initialWords = [];

      const addToken = token => {
        if (!token) {
          return;
        }
        const cleaned = token.replace(/[^a-z0-9]+/g, '');
        if (cleaned) {
          tokens.add(cleaned);
        }
      };

      const isAlpha = value => /^[a-z]+$/.test(value);
      const isNumeric = value => /^\d+$/.test(value);

      const addAlphaNumericVariants = segment => {
        if (!segment) {
          return;
        }
        const groups = segment.match(/[a-z]+|\d+/g);
        if (!groups || groups.length <= 1) {
          return;
        }
        groups.forEach(part => {
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
        strToProcess.split(/\s+/).forEach(part => {
          if (!part) return;
          addToken(part);
          part
            .split(/[^a-z0-9]+/)
            .filter(Boolean)
            .forEach(segment => {
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

      if (measurementNormalized !== numberNormalized) {
        processParts(measurementNormalized);
      }

      const spellingNormalized = normalizeSpellingVariants(measurementNormalized);
      if (spellingNormalized !== measurementNormalized) {
        processParts(spellingNormalized);
      }

      const markNormalized = normaliseMarkVariants(spellingNormalized);
      if (markNormalized !== spellingNormalized) {
        processParts(markNormalized);
      }

      if (initialWords.length >= 2) {
        const MAX_INITIALISM_LENGTH = 6;
        const initials = initialWords.map(word => word[0]).filter(Boolean);
        const limit = Math.min(initials.length, MAX_INITIALISM_LENGTH);
        for (let start = 0; start < limit; start += 1) {
          let currentInitial = '';
          for (let index = start; index < limit; index += 1) {
            currentInitial += initials[index];
            if (currentInitial.length >= 2) {
              addToken(currentInitial);
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
        if (!cleaned) {
          continue;
        }
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
      const result = freezeArray(Array.from(tokens));
      if (cacheable) {
        tokensCache.set(str, result);
      }
      return result;
    };

    const findBestSearchMatch = (map, key, tokens = []) => {
      if (!map || typeof map.entries !== 'function') {
        return null;
      }

      const queryTokens = Array.isArray(tokens) ? tokens.filter(Boolean) : [];
      const hasKey = typeof key === 'string' && key.length > 0;
      if (!hasKey && queryTokens.length === 0) {
        return null;
      }

      const toResult = (entryKey, entryValue, matchType, score = 0, matchedCount = 0, extras = {}) => ({
        key: entryKey,
        value: entryValue,
        matchType,
        score,
        matchedCount,
        ...extras,
      });

      const flattened = [];
      for (const [entryKey, entryValue] of map.entries()) {
        if (!entryValue) continue;
        if (Array.isArray(entryValue)) {
          for (const value of entryValue) {
            if (value) {
              flattened.push([entryKey, value]);
            }
          }
        } else {
          flattened.push([entryKey, entryValue]);
        }
      }

      if (hasKey) {
        const exactCandidates = flattened.filter(([entryKey]) => entryKey === key);
        if (exactCandidates.length) {
          let bestEntry = exactCandidates[0][1];
          let bestDetails = queryTokens.length
            ? computeTokenMatchDetails(bestEntry?.tokens || [], queryTokens)
            : { score: Number.POSITIVE_INFINITY, matched: queryTokens.length };

          for (let index = 1; index < exactCandidates.length; index += 1) {
            const entryValue = exactCandidates[index][1];
            if (!queryTokens.length) {
              break;
            }
            const details = computeTokenMatchDetails(entryValue?.tokens || [], queryTokens);
            if (
              details.score > bestDetails.score ||
              (details.score === bestDetails.score && details.matched > bestDetails.matched)
            ) {
              bestDetails = details;
              bestEntry = entryValue;
            }
          }

          return toResult(key, bestEntry, 'exactKey', bestDetails.score, bestDetails.matched);
        }
      }

      let bestTokenMatch = null;
      let bestTokenScore = 0;
      let bestTokenMatched = 0;
      let bestTokenKeyDistance = Number.POSITIVE_INFINITY;
      let bestPrefixMatch = null;
      let bestPrefixScore = 0;
      let bestPrefixMatched = 0;
      let bestPrefixLength = Number.POSITIVE_INFINITY;
      let bestSubsetMatch = null;
      let bestSubsetScore = 0;
      let bestSubsetMatched = 0;
      let bestSubsetLength = 0;
      let bestPartialMatch = null;
      let bestPartialScore = 0;
      let bestPartialMatched = 0;
      let bestFuzzyMatch = null;
      let bestFuzzyDistance = Number.POSITIVE_INFINITY;
      let bestFuzzyLength = Number.POSITIVE_INFINITY;

      const keyLength = hasKey ? key.length : 0;

      for (const [entryKey, entryValue] of flattened) {
        if (!entryValue) continue;
        const entryTokens = entryValue?.tokens || [];
        const tokenDetails = queryTokens.length
          ? computeTokenMatchDetails(entryTokens, queryTokens)
          : { score: 0, matched: 0 };

        if (hasKey && entryKey.startsWith(key)) {
          const score = queryTokens.length > 0 ? tokenDetails.score : Number.POSITIVE_INFINITY;
          const candidate = toResult(entryKey, entryValue, 'keyPrefix', score, tokenDetails.matched);
          if (
            !bestPrefixMatch ||
            score > bestPrefixScore ||
            (score === bestPrefixScore &&
              (tokenDetails.matched > bestPrefixMatched ||
                (tokenDetails.matched === bestPrefixMatched && entryKey.length < bestPrefixLength)))
          ) {
            bestPrefixMatch = candidate;
            bestPrefixScore = score;
            bestPrefixMatched = tokenDetails.matched;
            bestPrefixLength = entryKey.length;
          }
        }

        if (queryTokens.length) {
          const distance = hasKey ? Math.abs(entryKey.length - keyLength) : Number.POSITIVE_INFINITY;
          if (
            tokenDetails.score > bestTokenScore ||
            (tokenDetails.score === bestTokenScore &&
              (tokenDetails.matched > bestTokenMatched ||
                (tokenDetails.matched === bestTokenMatched && distance < bestTokenKeyDistance)))
          ) {
            bestTokenMatch = toResult(entryKey, entryValue, 'token', tokenDetails.score, tokenDetails.matched);
            bestTokenScore = tokenDetails.score;
            bestTokenMatched = tokenDetails.matched;
            bestTokenKeyDistance = distance;
          }
        }

        if (hasKey && key.startsWith(entryKey)) {
          const score = queryTokens.length > 0 ? tokenDetails.score : Number.POSITIVE_INFINITY;
          const candidate = toResult(entryKey, entryValue, 'keySubset', score, tokenDetails.matched);
          if (
            !bestSubsetMatch ||
            score > bestSubsetScore ||
            (score === bestSubsetScore &&
              (entryKey.length > bestSubsetLength || tokenDetails.matched > bestSubsetMatched))
          ) {
            bestSubsetMatch = candidate;
            bestSubsetScore = score;
            bestSubsetMatched = tokenDetails.matched;
            bestSubsetLength = entryKey.length;
          }
        } else if (hasKey && (entryKey.includes(key) || key.includes(entryKey))) {
          const candidate = toResult(entryKey, entryValue, 'partial', tokenDetails.score, tokenDetails.matched);
          if (
            !bestPartialMatch ||
            tokenDetails.score > bestPartialScore ||
            (tokenDetails.score === bestPartialScore && tokenDetails.matched > bestPartialMatched)
          ) {
            bestPartialMatch = candidate;
            bestPartialScore = tokenDetails.score;
            bestPartialMatched = tokenDetails.matched;
          }
        }

        if (hasKey && entryKey) {
          const fuzzyDistance = getFuzzyDistance(entryKey, key);
          if (
            Number.isFinite(fuzzyDistance) &&
            fuzzyDistance > 0 &&
            fuzzyDistance <= fuzzyMaxDistance
          ) {
            if (
              !bestFuzzyMatch ||
              fuzzyDistance < bestFuzzyDistance ||
              (fuzzyDistance === bestFuzzyDistance && entryKey.length < bestFuzzyLength)
            ) {
              bestFuzzyMatch = toResult(entryKey, entryValue, 'fuzzy', tokenDetails.score, tokenDetails.matched, {
                fuzzyDistance,
              });
              bestFuzzyDistance = fuzzyDistance;
              bestFuzzyLength = entryKey.length;
            }
          }
        }
      }

      if (bestTokenMatch && bestTokenScore > 0) {
        return bestTokenMatch;
      }
      if (bestPrefixMatch) {
        return bestPrefixMatch;
      }
      if (bestSubsetMatch) {
        return bestSubsetMatch;
      }
      if (bestPartialMatch) {
        return bestPartialMatch;
      }
      if (bestFuzzyMatch) {
        return bestFuzzyMatch;
      }
      return null;
    };

    return Object.freeze({
      searchKey,
      searchTokens,
      computeTokenMatchDetails,
      findBestSearchMatch,
      getFuzzyDistance,
      computeFuzzyTokenScore,
      parseMarkSuffix,
      normaliseMarkVariants,
      normalizeUnicodeFractions,
      normalizeNumberWords,
      normalizeMeasurementUnits,
      normalizeSpellingVariants,
      applySearchTokenSynonyms,
    });
  }

  const engineApi = Object.freeze({
    FEATURE_SEARCH_FUZZY_MAX_DISTANCE,
    createEngine,
    parseMarkSuffix,
    normaliseMarkVariants,
    normalizeUnicodeFractions,
    normalizeNumberWords,
    normalizeMeasurementUnits,
    normalizeSpellingVariants,
    applySearchTokenSynonyms,
  });

  if (typeof module === 'object' && module && typeof module.exports !== 'undefined') {
    module.exports = engineApi;
  }

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);

  if (MODULE_BASE) {
    const safeWarn = typeof MODULE_BASE.safeWarn === 'function'
      ? MODULE_BASE.safeWarn
      : function fallbackWarn(message, error) {
          if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
            return;
          }
          if (typeof error === 'undefined') {
            console.warn(message);
          } else {
            console.warn(message, error);
          }
        };

    const MODULE_API = Object.freeze({
      FEATURE_SEARCH_FUZZY_MAX_DISTANCE,
      createEngine,
      parseMarkSuffix,
      normaliseMarkVariants,
      normalizeUnicodeFractions,
      normalizeNumberWords,
      normalizeMeasurementUnits,
      normalizeSpellingVariants,
      applySearchTokenSynonyms,
    });

    MODULE_BASE.registerOrQueueModule(
      'cine.features.featureSearchEngine',
      MODULE_API,
      {
        category: 'features',
        description: 'Search engine utilities for normalising values, tokenising queries and ranking feature results.',
        replace: true,
        connections: ['cineModuleBase', 'cineModuleContext'],
      },
      error => safeWarn('Unable to register cine.features.featureSearchEngine module.', error),
      GLOBAL_SCOPE,
      MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE),
    );

    if (typeof MODULE_BASE.exposeGlobal === 'function') {
      MODULE_BASE.exposeGlobal('cineFeaturesFeatureSearchEngine', MODULE_API, GLOBAL_SCOPE, {
        configurable: true,
        enumerable: false,
        writable: false,
      });
    } else {
      try {
        GLOBAL_SCOPE.cineFeaturesFeatureSearchEngine = MODULE_API;
      } catch (error) {
        void error;
      }
    }
  } else if (GLOBAL_SCOPE && !GLOBAL_SCOPE.cineFeaturesFeatureSearchEngine) {
    try {
      GLOBAL_SCOPE.cineFeaturesFeatureSearchEngine = engineApi;
    } catch (error) {
      void error;
    }
  }
})();
