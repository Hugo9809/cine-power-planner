  const controlsId = target.getAttribute('aria-controls');
    const matchesControls = controlsId && panel.id === controlsId;
    const matchesLabel = labelledBy
      ? labelledBy
          .split(/\s+/)
          .filter(Boolean)
          .includes(target.id)
      : false;
    if (matchesControls || matchesLabel) {
const addGlobalFlag = regex => {
  if (!regex) return regex;
  if (regex.global) return regex;
  const flags = regex.flags.includes('g') ? regex.flags : `${regex.flags}g`;
  return new RegExp(regex.source, flags);
};

const SEARCH_SYNONYM_RULES = [
  {
    pattern: /\b(?:d|p|power)[\s-]*tap\b/,
    canonical: 'dtap',
    extraTokens: ['dtap', 'ptap', 'powertap']
  },
  {
    pattern: /\b(?:usb[\s-]*c|usb[\s-]*type[\s-]*c|type[\s-]*c)\b/,
    canonical: 'usbc',
    extraTokens: ['usbc', 'typec']
  },
  {
    pattern: /\b(?:usb[\s-]*a|usb[\s-]*type[\s-]*a|type[\s-]*a)\b/,
    canonical: 'usba',
    extraTokens: ['usba', 'typea']
  }
].map(rule => ({
  ...rule,
  globalPattern: addGlobalFlag(rule.pattern)
}));

const applySearchSynonymReplacements = str => {
  if (!str) return str;
  let result = str;
  for (const rule of SEARCH_SYNONYM_RULES) {
    result = result.replace(rule.globalPattern, ` ${rule.canonical} `);
  }
  return result;
};

const collectSynonymTokens = (sources, addToken) => {
  if (!Array.isArray(sources) || typeof addToken !== 'function') return;
  for (const text of sources) {
    if (!text) continue;
    for (const rule of SEARCH_SYNONYM_RULES) {
      if (rule.pattern.test(text)) {
        for (const token of rule.extraTokens || []) {
          addToken(token);
        }
      }
    }
  }
};

  normalized = applySearchSynonymReplacements(normalized);
  const synonymNormalized = applySearchSynonymReplacements(markNormalized);
  if (synonymNormalized !== markNormalized) {
    processParts(synonymNormalized);
  }
  collectSynonymTokens([normalized, spellingNormalized, markNormalized, synonymNormalized], addToken);
      let tabId = null;
      if (settingsTabButtons.length) {
        const matchedButton = settingsTabButtons.find(
          button => button.getAttribute('aria-controls') === settingsPanel.id
        );
        if (matchedButton) {
          tabId = matchedButton.id;
        }
      }
      if (!tabId) {
        const labelledBy = settingsPanel.getAttribute('aria-labelledby') || '';
        tabId = labelledBy
          .split(/\s+/)
          .map(id => id && document.getElementById(id))
          .filter(button => button && button.getAttribute('role') === 'tab')
          .map(button => button.id)
          .find(Boolean) || null;
      }
