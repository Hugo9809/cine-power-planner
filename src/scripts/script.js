    const removals = cloneAutoGearItems(diff.remove);
function buildDefaultViewfinderExtensionAutoGearRules() {
  const select = document.getElementById('viewfinderExtension');
  if (!select) return [];

  const rules = [];
  const seen = new Set();

  Array.from(select.options || []).forEach(option => {
    if (!option) return;
    const normalizedValue = resolveViewfinderOptionValue(option);
    if (!normalizedValue || normalizedValue === '__none__' || seen.has(normalizedValue)) return;
    seen.add(normalizedValue);

    const additionName = typeof option.value === 'string' ? option.value.trim() : '';
    if (!additionName) return;

    rules.push({
      id: generateAutoGearId('rule'),
      label: getViewfinderFallbackLabel(normalizedValue) || additionName,
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [normalizedValue],
      videoDistribution: [],
      add: [
        {
          name: additionName,
          category: 'Camera Support',
          quantity: 1,
        },
      ],
      remove: [],
    });
  });

  return rules;
}

  const viewfinderRules = baselineMap
    ? buildViewfinderExtensionAutoRules(baseInfo, baselineMap)
    : [];
  const viewfinderSignatures = new Set(
    viewfinderRules
      .map(autoGearRuleSignature)
      .filter(signature => typeof signature === 'string' && signature)
  );
  buildDefaultViewfinderExtensionAutoGearRules().forEach(rule => {
    const signature = autoGearRuleSignature(rule);
    if (!signature || viewfinderSignatures.has(signature)) return;
    viewfinderRules.push(rule);
    viewfinderSignatures.add(signature);
  });
  viewfinderRules.forEach(rule => rules.push(rule));

      remainder = remainder.replace(/^[–—:-]+/, '').trim();
    buildDefaultViewfinderExtensionAutoGearRules,
      buildDefaultViewfinderExtensionAutoGearRules,
