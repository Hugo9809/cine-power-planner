  'schemaCache',
function parseBackupSectionJSON(section) {
  if (typeof section !== 'string') {
    return null;
  }

  const trimmed = section.trim();
  if (!trimmed) {
    return null;
  }

  const firstChar = trimmed[0];
  if (firstChar !== '{' && firstChar !== '[') {
    return null;
  }

  try {
    return JSON.parse(trimmed);
  } catch (error) {
    console.warn('Failed to parse JSON encoded backup section', error);
    return null;
  }
}


  let source = section;
  if (typeof source === 'string') {
    const parsed = parseBackupSectionJSON(source);
    if (parsed) {
      source = parsed;
    } else {
      return null;
    }
  }

  if (Array.isArray(source)) {
    source.forEach(entry => {
  } else if (isPlainObject(source)) {
    Object.entries(source).forEach(([key, value]) => {
    const candidate = parsed[key];
    if (isPlainObject(candidate)) {
      dataSection = candidate;
      break;
    }
    const parsedCandidate = parseBackupSectionJSON(candidate);
    if (isPlainObject(parsedCandidate)) {
      dataSection = parsedCandidate;
        const value = parsed[key];
        if (isPlainObject(value) || Array.isArray(value)) {
          fallback[key] = value;
          return;
        }
        const parsedValue = parseBackupSectionJSON(value);
        if (parsedValue && (isPlainObject(parsedValue) || Array.isArray(parsedValue))) {
          fallback[key] = parsedValue;
          return;
        }
        fallback[key] = value;
