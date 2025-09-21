function createViewfinderExtensionAutoRuleItem(selection) {
  if (typeof selection !== 'string') return null;
  const trimmed = selection.trim();
  if (!trimmed || trimmed === '__none__') return null;
  return {
    id: generateAutoGearId('item'),
    name: trimmed,
    category: 'Camera Support',
    quantity: 1,
    screenSize: '',
    selectorType: 'none',
    selectorDefault: '',
    selectorEnabled: false,
    notes: '',
  };
}

  if (typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
    let additions = [];
    let removals = [];
    if (baselineMap) {
      const remainingSelections = selections.filter(value => value !== trimmed);
      const variantInfo = { ...baseInfo, viewfinderExtension: remainingSelections.join(', ') };
      const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
      const variantMap = parseGearTableForAutoRules(variantHtml);
      if (variantMap) {
        const diff = diffGearTableMaps(variantMap, baselineMap);
        additions = cloneAutoGearItems(diff.add);
        removals = cloneAutoGearItems(diff.remove);
      }
    }

    if (!additions.length) {
      const fallbackItem = createViewfinderExtensionAutoRuleItem(trimmed);
      if (fallbackItem) {
        additions = [fallbackItem];
        removals = [];
      }
    }
function buildDefaultViewfinderExtensionAutoGearRules() {
  if (typeof document === 'undefined') return [];
  const select = document.getElementById('viewfinderExtension');
  if (!select) return [];

  const rules = [];
  const seenValues = new Set();

  Array.from(select.options || []).forEach(option => {
    if (!option) return;
    const value = resolveViewfinderOptionValue(option);
    if (!value || value === '__none__' || seenValues.has(value)) return;
    const item = createViewfinderExtensionAutoRuleItem(value);
    if (!item) return;
    seenValues.add(value);
    rules.push({
      id: generateAutoGearId('rule'),
      label: getViewfinderFallbackLabel(value),
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [value],
      videoDistribution: [],
      add: [item],
      remove: [],
    });
  });

  return rules;
}

  buildViewfinderExtensionAutoRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));

      const videoSignatures = new Set(
        if (!signature || videoSignatures.has(signature)) return;
        videoSignatures.add(signature);
  const defaultViewfinderRules = buildDefaultViewfinderExtensionAutoGearRules();
  if (defaultViewfinderRules.length) {
    const viewfinderSignatures = new Set(
      rules
        .map(autoGearRuleSignature)
        .filter(signature => typeof signature === 'string' && signature)
    );
    defaultViewfinderRules.forEach(rule => {
      const signature = autoGearRuleSignature(rule);
      if (!signature || viewfinderSignatures.has(signature)) return;
      rules.push(rule);
      viewfinderSignatures.add(signature);
    });
  }

