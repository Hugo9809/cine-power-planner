function clonePowerInputEntries(entries) {
  if (!Array.isArray(entries)) {
    return [];
  }
  return entries
    .filter(entry => entry && typeof entry === 'object')
    .map(entry => ({ ...entry }));
}

function mergePowerInputState(existingPower, collectedInputs) {
  const base =
    existingPower && typeof existingPower === 'object' && !Array.isArray(existingPower)
      ? { ...existingPower }
      : {};

  const normalizedInputs = clonePowerInputEntries(collectedInputs);

  if (normalizedInputs.length) {
    base.input = normalizedInputs;
  } else {
    delete base.input;
  }

  return Object.keys(base).length ? base : undefined;
}

module.exports = {
  mergePowerInputState,
};

