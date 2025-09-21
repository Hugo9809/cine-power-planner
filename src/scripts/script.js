const GENERAL_ROMAN_NUMERAL_MAX = 50;
  const maybeAddRomanNumeralVariant = token => {
    if (!token) return;
    const { cleaned, number } = parseMarkSuffix(token);
    if (!cleaned) return;
    if (!ROMAN_NUMERAL_PATTERN.test(cleaned)) return;
    if (number == null || number < 1 || number > GENERAL_ROMAN_NUMERAL_MAX) return;
    addToken(String(number));
  };
      maybeAddRomanNumeralVariant(part);
          maybeAddRomanNumeralVariant(segment);
      remainder = remainder.replace(/^[–—:-]+/, '').trim();
