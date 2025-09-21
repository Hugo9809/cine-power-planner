var manualQueryParamWarningShown = false;
function getQueryParam(search, key) {
  if (!key) {
    return null;
  }
  if (typeof URLSearchParams === 'function') {
    try {
      return new URLSearchParams(search).get(key);
    } catch (error) {
      if (!manualQueryParamWarningShown && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Falling back to manual query parameter parsing.', error);
      }
      manualQueryParamWarningShown = true;
    }
  }
  if (typeof search !== 'string' || search.length === 0) {
    return null;
  }
  var query = search.charAt(0) === '?' ? search.slice(1) : search;
  if (!query) {
    return null;
  }
  var pairs = query.split('&');
  for (var i = 0; i < pairs.length; i += 1) {
    if (!pairs[i]) {
      continue;
    }
    var _pairs$i$split = pairs[i].split('='),
      _pairs$i$split2 = _slicedToArray(_pairs$i$split, 2),
      rawName = _pairs$i$split2[0],
      _pairs$i$split2$ = _pairs$i$split2[1],
      rawValue = _pairs$i$split2$ === void 0 ? '' : _pairs$i$split2$;
    if (!rawName) {
      continue;
    }
    var decodedName = void 0;
    try {
      decodedName = decodeURIComponent(rawName.replace(/\+/g, ' '));
    } catch (error) {
      if (!manualQueryParamWarningShown && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to decode query parameter name', rawName, error);
      }
      manualQueryParamWarningShown = true;
      continue;
    }
    if (decodedName !== key) {
      continue;
    }
    try {
      return decodeURIComponent(rawValue.replace(/\+/g, ' '));
    } catch (error) {
      if (!manualQueryParamWarningShown && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to decode query parameter value', rawValue, error);
      }
      manualQueryParamWarningShown = true;
      return rawValue;
    }
  }
  return null;
}
  var hasSearch = typeof window !== 'undefined' && window.location && typeof window.location.search === 'string';
  var search = hasSearch ? window.location.search : '';
  var shared = getQueryParam(search, 'shared');
