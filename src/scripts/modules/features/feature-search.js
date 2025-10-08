/* global cineModuleBase */
/* eslint-disable no-control-regex, no-misleading-character-class */

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

    if (typeof require === 'function') {
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

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }

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

  const FEATURE_SEARCH_MATCH_PRIORITIES = Object.freeze({
    none: 0,
    fuzzy: 1,
    partial: 2,
    keySubset: 3,
    keyPrefix: 4,
    token: 5,
    exactKey: 6,
  });

  const FEATURE_SEARCH_TYPE_PRIORITIES = Object.freeze({
    feature: 3,
    action: 4,
    device: 3,
    help: 1,
  });

  const FEATURE_SEARCH_FILTER_ALIASES = new Map([
    ['feature', 'feature'],
    ['features', 'feature'],
    ['setting', 'feature'],
    ['settings', 'feature'],
    ['action', 'action'],
    ['actions', 'action'],
    ['command', 'action'],
    ['commands', 'action'],
    ['device', 'device'],
    ['devices', 'device'],
    ['gear', 'device'],
    ['equipment', 'device'],
    ['help', 'help'],
    ['doc', 'help'],
    ['docs', 'help'],
    ['guide', 'help'],
    ['guides', 'help'],
    ['support', 'help'],
    ['recent', 'recent'],
    ['recents', 'recent'],
    ['recently', 'recent'],
    ['history', 'recent'],
    ['histories', 'recent'],
    ['frequent', 'recent'],
    ['frequently', 'recent'],
  ]);

  const FEATURE_SEARCH_FILTER_STRIP_PATTERN = /^[\s:> /=\-?,.]+/;

  const FEATURE_SEARCH_SMART_QUOTE_PATTERN = /[“”„«»]/g;

  function normalizeFeatureSearchQuotes(value) {
    return typeof value === 'string'
      ? value.replace(FEATURE_SEARCH_SMART_QUOTE_PATTERN, '"')
      : '';
  }

  function extractFeatureSearchQuotedPhrases(query) {
    if (typeof query !== 'string') {
      return [];
    }
    const normalized = normalizeFeatureSearchQuotes(query);
    if (!normalized) {
      return [];
    }
    const phrases = [];
    const regex = /"([^"]+)"/g;
    let match;
    while ((match = regex.exec(normalized))) {
      const phrase = (match[1] || '').trim();
      if (phrase.length < 2) {
        continue;
      }
      phrases.push(phrase);
    }
    return phrases;
  }

  function extractFeatureSearchFilter(query) {
    if (typeof query !== 'string') {
      return { filterType: null, queryText: '' };
    }
    const trimmed = query.trim();
    if (!trimmed) {
      return { filterType: null, queryText: '' };
    }
    const match = trimmed.match(/^([a-z]+)/i);
    if (!match) {
      return { filterType: null, queryText: trimmed };
    }
    const alias = match[1].toLowerCase();
    const filterType = FEATURE_SEARCH_FILTER_ALIASES.get(alias) || null;
    if (!filterType) {
      return { filterType: null, queryText: trimmed };
    }
    const remainderRaw = trimmed.slice(match[0].length);
    if (!remainderRaw) {
      return { filterType, queryText: '' };
    }
    const remainder = remainderRaw.replace(FEATURE_SEARCH_FILTER_STRIP_PATTERN, '').trim();
    return { filterType, queryText: remainder };
  }

  const ZERO_WIDTH_SPACES_PATTERN = /[\u200B\u200C\u200D\u2060]/g;
  const SPACE_VARIANTS_PATTERN = /[\u0009-\u000D\u00A0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/g;
  const COMBINING_MARKS_PATTERN = /[\u0300-\u036F]/g;
  const DASH_VARIANTS_PATTERN = /[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g;
  const APOSTROPHE_VARIANTS_PATTERN = /[\u2018\u2019\u201A\u201B\u2032\u2035]/g;
  const QUOTE_VARIANTS_PATTERN = /[\u201C\u201D\u201E\u201F\u2033\u2036]/g;
  const SLASH_VARIANTS_PATTERN = /[\u2044\u2215]/g;
  const MULTIPLY_VARIANTS_PATTERN = /[×✕✖✗✘]/g;
  const DEGREE_VARIANTS_PATTERN = /[°º˚]/g;
  const ELLIPSIS_PATTERN = /[\u2026]/g;
  const TRADEMARK_PATTERN = /[\u00AE\u2122]/g;
  const GENERAL_PUNCTUATION_PATTERN = /[!#$%()*,:;<=>?@[\]^{|}~._]/g;

  const LIGATURE_REPLACEMENTS = {
    ß: 'ss',
    æ: 'ae',
    œ: 'oe',
    ø: 'o',
    þ: 'th',
    ð: 'd',
    đ: 'd',
    ħ: 'h',
    ı: 'i',
    ĳ: 'ij',
    ŋ: 'ng',
    ł: 'l',
    ſ: 's',
  };

  function createDefaultSearchNormalizer() {
    return value => {
      if (typeof value !== 'string') {
        return '';
      }

      let normalized = value.replace(ZERO_WIDTH_SPACES_PATTERN, '');

      if (typeof normalized.normalize === 'function') {
        try {
          normalized = normalized.normalize('NFKD');
        } catch (error) {
          void error;
        }
      }

      normalized = normalized
        .replace(SPACE_VARIANTS_PATTERN, ' ')
        .replace(APOSTROPHE_VARIANTS_PATTERN, ' ')
        .replace(QUOTE_VARIANTS_PATTERN, ' ')
        .replace(DASH_VARIANTS_PATTERN, ' ')
        .replace(SLASH_VARIANTS_PATTERN, ' ')
        .replace(MULTIPLY_VARIANTS_PATTERN, ' x ')
        .replace(DEGREE_VARIANTS_PATTERN, ' deg ')
        .replace(/\bdegrees?\b/gi, ' deg ')
        .replace(/&/g, ' and ')
        .replace(/\+/g, ' plus ')
        .replace(/@/g, ' at ')
        .replace(TRADEMARK_PATTERN, ' ')
        .replace(ELLIPSIS_PATTERN, ' ')
        .replace(GENERAL_PUNCTUATION_PATTERN, ' ');

      normalized = normalized.toLowerCase().replace(COMBINING_MARKS_PATTERN, '');

      Object.keys(LIGATURE_REPLACEMENTS).forEach(key => {
        normalized = normalized.replace(new RegExp(key, 'g'), LIGATURE_REPLACEMENTS[key]);
      });

      normalized = normalized
        .replace(/['"`]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      return normalized;
    };
  }

  function computeTokenMatchDetails(entryTokens = [], queryTokens = []) {
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
  }

  function escapeFeatureSearchRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function collectFeatureSearchTexts(entry) {
    const texts = [];
    const push = text => {
      if (typeof text !== 'string') return;
      const normalized = text.trim().toLowerCase();
      if (!normalized) return;
      texts.push(normalized);
    };
    if (!entry || typeof entry !== 'object') {
      return texts;
    }
    push(entry.optionLabel);
    if (entry.display && entry.display !== entry.optionLabel) {
      push(entry.display);
    }
    if (entry.detail) {
      push(entry.detail);
    }
    const rawValue = entry.value;
    if (rawValue && typeof rawValue === 'object') {
      push(rawValue.baseLabel);
      push(rawValue.displayLabel);
      if (Array.isArray(rawValue.context) && rawValue.context.length) {
        push(rawValue.context.join(' '));
      }
      if (Array.isArray(rawValue.helpTexts) && rawValue.helpTexts.length) {
        push(rawValue.helpTexts.join(' '));
      }
    }
    return texts;
  }

  function computeLabelMatchDetails(entry, rawQuery = '') {
    const normalizedQuery = typeof rawQuery === 'string'
      ? rawQuery.replace(/\s+/g, ' ').trim().toLowerCase()
      : '';
    if (!normalizedQuery) {
      return { level: 0, score: 0 };
    }

    const labels = new Set();
    const addLabel = value => {
      if (typeof value !== 'string') return;
      const cleaned = value.replace(/\s+/g, ' ').trim().toLowerCase();
      if (!cleaned) return;
      labels.add(cleaned);
    };

    if (entry && typeof entry === 'object') {
      addLabel(entry.optionLabel);
      addLabel(entry.display);
      const rawValue = entry.value && typeof entry.value === 'object' ? entry.value : null;
      if (rawValue) {
        addLabel(rawValue.baseLabel);
        addLabel(rawValue.displayLabel);
        if (Array.isArray(rawValue.context)) {
          rawValue.context.forEach(addLabel);
        }
      }
    }

    if (labels.size === 0) {
      return { level: 0, score: 0 };
    }

    const queryLength = normalizedQuery.length;
    let bestLevel = 0;
    let bestScore = 0;
    const boundaryPattern = /[a-z0-9]/;

    labels.forEach(label => {
      if (label === normalizedQuery) {
        bestLevel = Math.max(bestLevel, 4);
        bestScore = Math.max(bestScore, Math.max(label.length * 8, 80));
        return;
      }

      if (label.startsWith(normalizedQuery)) {
        bestLevel = Math.max(bestLevel, 3);
        bestScore = Math.max(bestScore, Math.max(queryLength * 4, 36));
      }

      const index = label.indexOf(normalizedQuery);
      if (index !== -1) {
        const beforeChar = index > 0 ? label.charAt(index - 1) : '';
        const afterIndex = index + queryLength;
        const afterChar = afterIndex < label.length ? label.charAt(afterIndex) : '';
        const beforeBoundary = index === 0 || !boundaryPattern.test(beforeChar);
        const afterBoundary = afterIndex >= label.length || !boundaryPattern.test(afterChar);
        if (beforeBoundary && afterBoundary) {
          bestLevel = Math.max(bestLevel, 2);
          bestScore = Math.max(bestScore, Math.max(queryLength * 3, 28));
        } else {
          bestLevel = Math.max(bestLevel, 1);
          bestScore = Math.max(bestScore, Math.max(queryLength * 2, 14));
        }
      }
    });

    return { level: bestLevel, score: bestScore };
  }

  function computePhraseMatchDetails(entry, queryTokens = [], rawQuery = '') {
    const validTokens = Array.isArray(queryTokens)
      ? queryTokens.map(token => token && token.replace(/[^a-z0-9]+/g, '')).filter(Boolean)
      : [];
    const normalizedQuery = typeof rawQuery === 'string' ? rawQuery.trim().toLowerCase() : '';
    if (!validTokens.length && !normalizedQuery) {
      return { score: 0, matched: false };
    }
    const texts = collectFeatureSearchTexts(entry);
    if (!texts.length) {
      return { score: 0, matched: false };
    }

    let score = 0;
    let matched = false;

    if (normalizedQuery) {
      for (const text of texts) {
        if (text.includes(normalizedQuery)) {
          matched = true;
          score = Math.max(score, Math.max(1, normalizedQuery.length));
          break;
        }
      }
    }

    if (validTokens.length > 1) {
      const pattern = validTokens.map(escapeFeatureSearchRegExp).join('[\\s\\-_/·›>]*');
      if (pattern) {
        const regex = new RegExp(`\\b${pattern}`, 'i');
        for (const text of texts) {
          if (regex.test(text)) {
            matched = true;
            score = Math.max(score, validTokens.length * 6);
            break;
          }
        }
      }
    }

    return { score, matched };
  }

  function computeQuotedPhraseMatchDetails(entry, phrases = []) {
    if (!Array.isArray(phrases) || phrases.length === 0) {
      return { score: 0, matched: 0 };
    }
    const normalizedPhrases = phrases
      .map(phrase =>
        typeof phrase === 'string'
          ? phrase.replace(/\s+/g, ' ').trim().toLowerCase()
          : ''
      )
      .filter(phrase => phrase.length > 1);
    if (!normalizedPhrases.length) {
      return { score: 0, matched: 0 };
    }
    const texts = collectFeatureSearchTexts(entry);
    if (!texts.length) {
      return { score: 0, matched: 0 };
    }
    let matched = 0;
    let score = 0;
    normalizedPhrases.forEach(phrase => {
      let found = false;
      for (const text of texts) {
        if (text.includes(phrase)) {
          found = true;
          break;
        }
      }
      if (found) {
        matched += 1;
        score += Math.max(phrase.length * 4, 24);
      }
    });
    if (matched === 0) {
      return { score: 0, matched: 0 };
    }
    return { score, matched };
  }

  function computeHistoryBoostScore(count = 0, lastUsed = 0, now = NaN) {
    const usageCount = Number.isFinite(count) && count > 0 ? count : 0;
    const normalizedCount = Math.min(Math.max(usageCount, 0), 50);
    let score = normalizedCount * 2;

    const timestamp = Number.isFinite(lastUsed) && lastUsed > 0 ? lastUsed : 0;
    if (timestamp > 0) {
      const current = Number.isFinite(now)
        ? now
        : (typeof Date === 'function' && typeof Date.now === 'function'
            ? Date.now()
            : new Date().getTime());
      const age = Math.max(0, current - timestamp);
      const day = 24 * 60 * 60 * 1000;
      if (age <= day) {
        score += 20;
      } else if (age <= 7 * day) {
        score += 12;
      } else if (age <= 30 * day) {
        score += 6;
      } else if (age <= 90 * day) {
        score += 3;
      }
    }

    return score;
  }

  function computeLevenshteinDistance(a, b) {
    if (a === b) return 0;
    if (typeof a !== 'string' || typeof b !== 'string') {
      return Number.POSITIVE_INFINITY;
    }
    const aLen = a.length;
    const bLen = b.length;
    if (aLen === 0) return bLen;
    if (bLen === 0) return aLen;
    const prev = new Array(bLen + 1);
    const curr = new Array(bLen + 1);
    for (let j = 0; j <= bLen; j += 1) {
      prev[j] = j;
    }
    for (let i = 1; i <= aLen; i += 1) {
      curr[0] = i;
      const aCode = a.charCodeAt(i - 1);
      for (let j = 1; j <= bLen; j += 1) {
        const cost = aCode === b.charCodeAt(j - 1) ? 0 : 1;
        const deletion = prev[j] + 1;
        const insertion = curr[j - 1] + 1;
        const substitution = prev[j - 1] + cost;
        curr[j] = Math.min(deletion, insertion, substitution);
      }
      for (let j = 0; j <= bLen; j += 1) {
        prev[j] = curr[j];
      }
    }
    return prev[bLen];
  }

  function isAcceptableFuzzyMatch(entryKey, queryKey, distance) {
    if (!Number.isFinite(distance) || distance <= 0) {
      return false;
    }
    if (typeof entryKey !== 'string' || typeof queryKey !== 'string') {
      return false;
    }
    const maxLength = Math.max(entryKey.length, queryKey.length);
    if (maxLength === 0) return false;
    if (maxLength <= 3) {
      return distance <= 1;
    }
    if (maxLength <= 6) {
      return distance <= 2;
    }
    return distance <= 3 && distance / maxLength <= 0.4;
  }

  function normalizeNowOption(nowOption) {
    if (typeof nowOption === 'number') {
      return Number.isFinite(nowOption) ? nowOption : Number.NaN;
    }
    if (typeof nowOption === 'function') {
      try {
        const result = nowOption();
        return Number.isFinite(result) ? result : Number.NaN;
      } catch (error) {
        safeWarn('Feature search now() option failed.', error);
      }
    }
    return Number.NaN;
  }

  function scoreFeatureSearchEntry(entry, queryKey, queryTokens, rawQueryText, options) {
    if (!entry || !entry.key) return null;
    const display = entry.display;
    if (!display) return null;
    const entryKey = entry.key;
    const entryTokens = Array.isArray(entry.tokens) ? entry.tokens : [];
    const primaryTokens = Array.isArray(entry.primaryTokens) ? entry.primaryTokens : [];
    const validQueryTokens = Array.isArray(queryTokens)
      ? queryTokens.filter(Boolean)
      : [];
    const tokenDetails = validQueryTokens.length
      ? computeTokenMatchDetails(entryTokens, validQueryTokens)
      : { score: 0, matched: 0 };
    const primaryTokenDetails = validQueryTokens.length
      ? computeTokenMatchDetails(primaryTokens, validQueryTokens)
      : { score: 0, matched: 0 };
    const entryType = entry.type || 'feature';

    const opts = options && typeof options === 'object' ? options : {};
    const historyLookup = typeof opts.getHistoryData === 'function' ? opts.getHistoryData : null;
    const history = historyLookup ? historyLookup(entryKey, entryType) : null;
    const historyCount = history && typeof history === 'object' ? history.count || 0 : 0;
    const historyLastUsed = history && typeof history === 'object' ? history.lastUsed || 0 : 0;
    const queryTokenCount = validQueryTokens.length;
    const allTokensMatched =
      queryTokenCount > 0 && tokenDetails.matched >= queryTokenCount;
    const phraseDetails = computePhraseMatchDetails(entry, validQueryTokens, rawQueryText);
    const quotedPhraseDetails = computeQuotedPhraseMatchDetails(entry, opts.quotedPhrases);
    const labelMatchDetails = computeLabelMatchDetails(entry, rawQueryText);
    const nowTimestampRaw = normalizeNowOption(opts.now);
    const nowTimestamp = Number.isFinite(nowTimestampRaw)
      ? nowTimestampRaw
      : (typeof Date === 'function' && typeof Date.now === 'function'
          ? Date.now()
          : new Date().getTime());
    const historyBoostScore = computeHistoryBoostScore(
      historyCount,
      historyLastUsed,
      nowTimestamp,
    );

    let bestType = 'none';
    let bestPriority = FEATURE_SEARCH_MATCH_PRIORITIES.none;
    let fuzzyDistance = Number.POSITIVE_INFINITY;
    const updateType = type => {
      const priority = FEATURE_SEARCH_MATCH_PRIORITIES[type] || FEATURE_SEARCH_MATCH_PRIORITIES.none;
      if (priority > bestPriority) {
        bestType = type;
        bestPriority = priority;
      }
    };

    if (queryKey) {
      if (entryKey === queryKey) {
        updateType('exactKey');
      }
      if (entryKey.startsWith(queryKey)) {
        updateType('keyPrefix');
      }
      if (queryKey.startsWith(entryKey)) {
        updateType('keySubset');
      }
      if (entryKey.includes(queryKey) || queryKey.includes(entryKey)) {
        updateType('partial');
      }
    }

    if (tokenDetails.score > 0) {
      updateType('token');
    }

    if (bestPriority === FEATURE_SEARCH_MATCH_PRIORITIES.none && queryKey && entryKey) {
      const distance = computeLevenshteinDistance(entryKey, queryKey);
      if (isAcceptableFuzzyMatch(entryKey, queryKey, distance)) {
        fuzzyDistance = distance;
        updateType('fuzzy');
      }
    }

    return {
      entry,
      entryType,
      typePriority: FEATURE_SEARCH_TYPE_PRIORITIES[entryType] || 0,
      allTokensMatched,
      matchType: bestType,
      priority: bestPriority,
      tokenScore: tokenDetails.score,
      tokenMatches: tokenDetails.matched,
      primaryTokenScore: primaryTokenDetails.score,
      primaryTokenMatches: primaryTokenDetails.matched,
      phraseScore: phraseDetails.score,
      phraseMatched: phraseDetails.matched,
      fuzzyDistance,
      keyDistance: queryKey
        ? Math.abs(entryKey.length - queryKey.length)
        : Number.POSITIVE_INFINITY,
      keyLength: entryKey.length,
      historyCount,
      historyLastUsed,
      labelMatchLevel: labelMatchDetails.level,
      labelMatchScore: labelMatchDetails.score,
      historyBoostScore,
      quotedPhraseScore: quotedPhraseDetails.score,
      quotedPhraseMatches: quotedPhraseDetails.matched,
    };
  }

  function compareFeatureSearchCandidates(a, b) {
    if (!a && !b) return 0;
    if (!a) return 1;
    if (!b) return -1;
    if (b.priority !== a.priority) return b.priority - a.priority;
    if (Number(b.allTokensMatched) !== Number(a.allTokensMatched)) {
      return Number(b.allTokensMatched) - Number(a.allTokensMatched);
    }
    const aLabelLevel = typeof a.labelMatchLevel === 'number' ? a.labelMatchLevel : 0;
    const bLabelLevel = typeof b.labelMatchLevel === 'number' ? b.labelMatchLevel : 0;
    if (bLabelLevel !== aLabelLevel) {
      return bLabelLevel - aLabelLevel;
    }
    const aLabelScore = typeof a.labelMatchScore === 'number' ? a.labelMatchScore : 0;
    const bLabelScore = typeof b.labelMatchScore === 'number' ? b.labelMatchScore : 0;
    if (bLabelScore !== aLabelScore) {
      return bLabelScore - aLabelScore;
    }
    const aPhraseScore = typeof a.phraseScore === 'number' ? a.phraseScore : 0;
    const bPhraseScore = typeof b.phraseScore === 'number' ? b.phraseScore : 0;
    if (bPhraseScore !== aPhraseScore) {
      return bPhraseScore - aPhraseScore;
    }
    if (Number(b.phraseMatched) !== Number(a.phraseMatched)) {
      return Number(b.phraseMatched) - Number(a.phraseMatched);
    }
    const aQuotedMatches = typeof a.quotedPhraseMatches === 'number' ? a.quotedPhraseMatches : 0;
    const bQuotedMatches = typeof b.quotedPhraseMatches === 'number' ? b.quotedPhraseMatches : 0;
    if (bQuotedMatches !== aQuotedMatches) {
      return bQuotedMatches - aQuotedMatches;
    }
    const aQuotedScore = typeof a.quotedPhraseScore === 'number' ? a.quotedPhraseScore : 0;
    const bQuotedScore = typeof b.quotedPhraseScore === 'number' ? b.quotedPhraseScore : 0;
    if (bQuotedScore !== aQuotedScore) {
      return bQuotedScore - aQuotedScore;
    }
    const aPrimaryScore = typeof a.primaryTokenScore === 'number' ? a.primaryTokenScore : 0;
    const bPrimaryScore = typeof b.primaryTokenScore === 'number' ? b.primaryTokenScore : 0;
    if (bPrimaryScore !== aPrimaryScore) {
      return bPrimaryScore - aPrimaryScore;
    }
    if (Number(b.primaryTokenMatches) !== Number(a.primaryTokenMatches)) {
      return Number(b.primaryTokenMatches) - Number(a.primaryTokenMatches);
    }
    const aTokenScore = typeof a.tokenScore === 'number' ? a.tokenScore : 0;
    const bTokenScore = typeof b.tokenScore === 'number' ? b.tokenScore : 0;
    if (bTokenScore !== aTokenScore) {
      return bTokenScore - aTokenScore;
    }
    if (Number(b.tokenMatches) !== Number(a.tokenMatches)) {
      return Number(b.tokenMatches) - Number(a.tokenMatches);
    }
    const aTypePriority = typeof a.typePriority === 'number' ? a.typePriority : 0;
    const bTypePriority = typeof b.typePriority === 'number' ? b.typePriority : 0;
    if (bTypePriority !== aTypePriority) {
      return bTypePriority - aTypePriority;
    }
    const aHistoryScore = typeof a.historyBoostScore === 'number' ? a.historyBoostScore : 0;
    const bHistoryScore = typeof b.historyBoostScore === 'number' ? b.historyBoostScore : 0;
    if (bHistoryScore !== aHistoryScore) {
      return bHistoryScore - aHistoryScore;
    }
    if (Number(b.historyCount) !== Number(a.historyCount)) {
      return Number(b.historyCount) - Number(a.historyCount);
    }
    if (Number(b.historyLastUsed) !== Number(a.historyLastUsed)) {
      return Number(b.historyLastUsed) - Number(a.historyLastUsed);
    }
    const aKeyDistance = Number.isFinite(a.keyDistance) ? a.keyDistance : Number.POSITIVE_INFINITY;
    const bKeyDistance = Number.isFinite(b.keyDistance) ? b.keyDistance : Number.POSITIVE_INFINITY;
    if (aKeyDistance !== bKeyDistance) {
      return aKeyDistance - bKeyDistance;
    }
    const aKeyLength = typeof a.keyLength === 'number' ? a.keyLength : Number.POSITIVE_INFINITY;
    const bKeyLength = typeof b.keyLength === 'number' ? b.keyLength : Number.POSITIVE_INFINITY;
    if (aKeyLength !== bKeyLength) {
      return aKeyLength - bKeyLength;
    }
    const aFuzzyDistance = Number.isFinite(a.fuzzyDistance) ? a.fuzzyDistance : Number.POSITIVE_INFINITY;
    const bFuzzyDistance = Number.isFinite(b.fuzzyDistance) ? b.fuzzyDistance : Number.POSITIVE_INFINITY;
    if (aFuzzyDistance !== bFuzzyDistance) {
      return aFuzzyDistance - bFuzzyDistance;
    }
    const aDisplay = a.entry && a.entry.display ? a.entry.display : '';
    const bDisplay = b.entry && b.entry.display ? b.entry.display : '';
    return aDisplay.localeCompare(bDisplay, undefined, { sensitivity: 'base' });
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
      return '';
    }
    return str.replace(/\b(mark|mk)[\s-]*(\d+|[ivxlcdm]+)\b/g, (_match, _prefix, rawValue) => {
      const { cleaned, number } = parseMarkSuffix(rawValue);
      if (!cleaned) return 'mk';
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
    return str.replace(SPELLING_VARIANT_PATTERN, match => SPELLING_VARIANTS.get(match) || match);
  }

  function searchKey(str) {
    if (!str) return '';
    const value = String(str);
    let normalized = value.toLowerCase();
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
    normalized = normalizeSpellingVariants(normalized);
    normalized = normaliseMarkVariants(normalized);
    const simplified = normalized.replace(/[^a-z0-9]+/g, '');
    if (simplified) return simplified;
    return value.toLowerCase().replace(/\s+/g, '');
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
    const addToken = token => {
      if (!token) return;
      const cleaned = token.replace(/[^a-z0-9]+/g, '');
      if (cleaned) tokens.add(cleaned);
    };
    const isAlpha = value => /^[a-z]+$/.test(value);
    const isNumeric = value => /^\d+$/.test(value);
    const addAlphaNumericVariants = segment => {
      if (!segment) return;
      const groups = segment.match(/[a-z]+|\d+/g);
      if (!groups || groups.length <= 1) return;
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
      const initials = initialWords.map(word => word[0]).filter(Boolean);
      const limit = Math.min(initials.length, MAX_INITIALISM_LENGTH);
      for (let start = 0; start < limit; start++) {
        let current = '';
        for (let index = start; index < limit; index++) {
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

  function findBestSearchMatch(map, key, tokens = []) {
    const queryTokens = Array.isArray(tokens) ? tokens.filter(Boolean) : [];
    const hasKey = Boolean(key);
    if (!hasKey && queryTokens.length === 0) return null;

    const toResult = (
      entryKey,
      entryValue,
      matchType,
      score = 0,
      matchedCount = 0,
      extras = {},
    ) => ({
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
          if (value) flattened.push([entryKey, value]);
        }
      } else {
        flattened.push([entryKey, entryValue]);
      }
    }

    if (hasKey) {
      const exactCandidates = flattened.filter(([entryKey]) => entryKey === key);
      if (exactCandidates.length) {
        let bestEntry = exactCandidates[0][1];
        let bestDetails = queryTokens.length > 0
          ? computeTokenMatchDetails(bestEntry?.tokens || [], queryTokens)
          : { score: Number.POSITIVE_INFINITY, matched: queryTokens.length };
        for (const [, entryValue] of exactCandidates.slice(1)) {
          if (!queryTokens.length) break;
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
    let bestPrefixScore = Number.NEGATIVE_INFINITY;
    let bestPrefixMatched = 0;
    let bestPrefixLength = Number.POSITIVE_INFINITY;
    let bestSubsetMatch = null;
    let bestSubsetScore = Number.NEGATIVE_INFINITY;
    let bestSubsetMatched = 0;
    let bestSubsetLength = -1;
    let bestPartialMatch = null;
    let bestPartialScore = Number.NEGATIVE_INFINITY;
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
      } else if (
        hasKey &&
        (entryKey.includes(key) || key.includes(entryKey))
      ) {
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
        const fuzzyDistance = computeLevenshteinDistance(entryKey, key);
        if (isAcceptableFuzzyMatch(entryKey, key, fuzzyDistance)) {
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
  }

  function createFallbackSearchNormalizer() {
    const fallback = value => {
      if (typeof value !== 'string') {
        return '';
      }
      let normalized = value.replace(ZERO_WIDTH_SPACES_PATTERN, '');
      try {
        if (typeof normalized.normalize === 'function') {
          normalized = normalized.normalize('NFKD');
        }
      } catch (error) {
        safeWarn('Fallback search normaliser unicode handling failed.', error);
      }

      try {
        normalized = normalized
          .replace(SPACE_VARIANTS_PATTERN, ' ')
          .replace(APOSTROPHE_VARIANTS_PATTERN, ' ')
          .replace(QUOTE_VARIANTS_PATTERN, ' ')
          .replace(DASH_VARIANTS_PATTERN, ' ')
          .replace(SLASH_VARIANTS_PATTERN, ' ')
          .replace(MULTIPLY_VARIANTS_PATTERN, ' x ')
          .replace(DEGREE_VARIANTS_PATTERN, ' deg ')
          .replace(/\bdegrees?\b/gi, ' deg ')
          .replace(/&/g, ' and ')
          .replace(/\+/g, ' plus ')
          .replace(/@/g, ' at ')
          .replace(TRADEMARK_PATTERN, ' ')
          .replace(ELLIPSIS_PATTERN, ' ')
          .replace(GENERAL_PUNCTUATION_PATTERN, ' ');

        normalized = normalized.toLowerCase().replace(COMBINING_MARKS_PATTERN, '');

        Object.keys(LIGATURE_REPLACEMENTS).forEach(key => {
          normalized = normalized.replace(new RegExp(key, 'g'), LIGATURE_REPLACEMENTS[key]);
        });

        normalized = normalized
          .replace(/['"`]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
      } catch (error) {
        safeWarn('Fallback search normaliser pipeline failed.', error);
        normalized = normalized.replace(/\s+/g, ' ').trim().toLowerCase();
      }

      return normalized;
    };

    return fallback;
  }

  let cachedSearchNormalizer = null;

  function getSearchNormalizer() {
    if (!cachedSearchNormalizer) {
      try {
        const created = createDefaultSearchNormalizer();
        if (typeof created === 'function') {
          cachedSearchNormalizer = created;
        } else {
          cachedSearchNormalizer = createFallbackSearchNormalizer();
        }
      } catch (error) {
        safeWarn('Unable to create default search normaliser.', error);
        cachedSearchNormalizer = createFallbackSearchNormalizer();
      }
    }

    return cachedSearchNormalizer;
  }

  function normalizeSearchValue(value) {
    const normalizer = getSearchNormalizer();
    try {
      return normalizer(value);
    } catch (error) {
      safeWarn('normalizeSearchValue() failed.', error);
      cachedSearchNormalizer = createFallbackSearchNormalizer();
      try {
        return cachedSearchNormalizer(value);
      } catch (fallbackError) {
        safeWarn('Fallback search normaliser failed.', fallbackError);
        return typeof value === 'string' ? value.trim().toLowerCase() : '';
      }
    }
  }

  function sanitizeHighlightTokens(tokens) {
    if (!Array.isArray(tokens) || tokens.length === 0) {
      return [];
    }

    const seen = typeof Set === 'function' ? new Set() : null;
    const sanitized = [];

    for (let index = 0; index < tokens.length; index += 1) {
      const token = tokens[index];
      if (typeof token !== 'string') {
        continue;
      }
      const trimmed = token.trim().toLowerCase();
      if (!trimmed) {
        continue;
      }
      if (trimmed.length < 2 && !/^\d+$/.test(trimmed)) {
        continue;
      }
      if (seen) {
        if (seen.has(trimmed)) {
          continue;
        }
        seen.add(trimmed);
      } else if (sanitized.indexOf(trimmed) !== -1) {
        continue;
      }
      sanitized.push(trimmed);
    }

    return sanitized;
  }

  function collectHighlightRanges(text, tokens) {
    if (!text || !tokens || !tokens.length) {
      return [];
    }

    const lower = text.toLowerCase();
    const ranges = [];

    for (let index = 0; index < tokens.length; index += 1) {
      const token = tokens[index];
      const length = token.length;
      if (!length) {
        continue;
      }

      let position = 0;
      while (position < lower.length) {
        const found = lower.indexOf(token, position);
        if (found === -1) {
          break;
        }
        ranges.push({ start: found, end: found + length });
        position = found + length;
      }
    }

    if (!ranges.length) {
      return [];
    }

    ranges.sort((a, b) => (a.start - b.start) || (b.end - a.end));

    const merged = [];
    for (let index = 0; index < ranges.length; index += 1) {
      const range = ranges[index];
      const last = merged[merged.length - 1];
      if (last && range.start <= last.end) {
        last.end = Math.max(last.end, range.end);
      } else {
        merged.push({ start: range.start, end: range.end });
      }
    }

    return merged;
  }

  function applyHighlight(element, text, tokens, doc) {
    if (!element) {
      return;
    }

    const content = typeof text === 'string' ? text : '';
    if (!content) {
      element.textContent = '';
      return;
    }

    const highlightTokens = sanitizeHighlightTokens(tokens || []);
    if (!highlightTokens.length) {
      element.textContent = content;
      return;
    }

    const ranges = collectHighlightRanges(content, highlightTokens);
    if (!ranges.length) {
      element.textContent = content;
      return;
    }

    const documentRef = doc || element.ownerDocument || (typeof document !== 'undefined' ? document : null);
    if (!documentRef || typeof documentRef.createTextNode !== 'function') {
      element.textContent = content;
      return;
    }

    element.textContent = '';
    let cursor = 0;

    for (let index = 0; index < ranges.length; index += 1) {
      const range = ranges[index];
      if (range.start > cursor) {
        element.appendChild(documentRef.createTextNode(content.slice(cursor, range.start)));
      }
      const mark = documentRef.createElement('mark');
      mark.className = 'feature-search-highlight';
      mark.textContent = content.slice(range.start, range.end);
      element.appendChild(mark);
      cursor = range.end;
    }

    if (cursor < content.length) {
      element.appendChild(documentRef.createTextNode(content.slice(cursor)));
    }
  }

  const FEATURE_SEARCH_DETAIL_MAX_LENGTH = 140;

  function normalizeDetail(text) {
    if (typeof text !== 'string') {
      return '';
    }

    const normalized = text.replace(/\s+/g, ' ').trim();
    if (!normalized) {
      return '';
    }

    if (normalized.length <= FEATURE_SEARCH_DETAIL_MAX_LENGTH) {
      return normalized;
    }

    return `${normalized.slice(0, FEATURE_SEARCH_DETAIL_MAX_LENGTH - 1).trimEnd()}…`;
  }

  const featureSearchApi = Object.freeze({
    normalizeSearchValue,
    sanitizeHighlightTokens,
    collectHighlightRanges,
    applyHighlight,
    normalizeDetail,
  });

  const featureSearchEngineApi = Object.freeze({
    FEATURE_SEARCH_MATCH_PRIORITIES,
    FEATURE_SEARCH_TYPE_PRIORITIES,
    createDefaultSearchNormalizer,
    normalizeFeatureSearchQuotes,
    extractFeatureSearchQuotedPhrases,
    extractFeatureSearchFilter,
    computeTokenMatchDetails,
    computePhraseMatchDetails,
    computeQuotedPhraseMatchDetails,
    computeLabelMatchDetails,
    computeHistoryBoostScore,
    computeLevenshteinDistance,
    isAcceptableFuzzyMatch,
    scoreFeatureSearchEntry,
    compareFeatureSearchCandidates,
    applySearchTokenSynonyms,
    normaliseMarkVariants,
    normalizeSpellingVariants,
    searchKey,
    searchTokens,
    findBestSearchMatch,
  });

  MODULE_BASE.registerOrQueueModule(
    'cine.features.featureSearchEngine',
    featureSearchEngineApi,
    {
      category: 'features',
      description: 'Feature search scoring, tokenisation and lookup helpers.',
      replace: true,
      connections: ['cineModuleBase', 'cineModuleContext'],
    },
    error => safeWarn('Unable to register cine.features.featureSearchEngine module.', error),
    GLOBAL_SCOPE,
    MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE),
  );

  if (typeof MODULE_BASE.exposeGlobal === 'function') {
    MODULE_BASE.exposeGlobal('cineFeaturesFeatureSearchEngine', featureSearchEngineApi, GLOBAL_SCOPE, {
      configurable: true,
      enumerable: false,
      writable: false,
    });
  } else {
    try {
      GLOBAL_SCOPE.cineFeaturesFeatureSearchEngine = featureSearchEngineApi;
    } catch (error) {
      void error;
    }
  }

  MODULE_BASE.registerOrQueueModule(
    'cine.features.featureSearch',
    featureSearchApi,
    {
      category: 'features',
      description: 'Reusable helpers for feature search normalisation, highlighting and detail formatting.',
      replace: true,
      connections: ['cineModuleBase', 'cineModuleContext', 'cineUi'],
    },
    error => safeWarn('Unable to register cine.features.featureSearch module.', error),
    GLOBAL_SCOPE,
    MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE),
  );

  if (typeof MODULE_BASE.exposeGlobal === 'function') {
    MODULE_BASE.exposeGlobal('cineFeaturesFeatureSearch', featureSearchApi, GLOBAL_SCOPE, {
      configurable: true,
      enumerable: false,
      writable: false,
    });
  } else {
    try {
      GLOBAL_SCOPE.cineFeaturesFeatureSearch = featureSearchApi;
    } catch (error) {
      void error;
    }
  }
})();
