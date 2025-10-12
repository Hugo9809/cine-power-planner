  function removeUnsafeSvgContent(element) {
    if (!element || element.nodeType !== 1) return;
    var tagName = element.nodeName ? element.nodeName.toLowerCase() : '';
    if (tagName === 'script' || tagName === 'foreignobject') {
      element.remove();
      return;
    }
    var attributes = element.attributes;
    if (attributes) {
      for (var i = attributes.length - 1; i >= 0; i -= 1) {
        var attr = attributes[i];
        var name = attr && attr.name ? attr.name : '';
        var value = attr && typeof attr.value === 'string' ? attr.value : '';
        if (/^on/i.test(name)) {
          element.removeAttribute(name);
        } else if ((name === 'href' || name === 'xlink:href') && /^\s*javascript:/i.test(value)) {
          element.removeAttribute(name);
        } else if (name === 'style' && /javascript:/i.test(value)) {
          element.removeAttribute(name);
        }
      }
    }
    var childNodes = element.childNodes;
    if (!childNodes) return;
    for (var j = childNodes.length - 1; j >= 0; j -= 1) {
      var child = childNodes[j];
      if (child && child.nodeType === 1) {
        removeUnsafeSvgContent(child);
      } else if (child && child.nodeType === 8) {
        element.removeChild(child);
      }
    }
  }
    if (typeof DOMParser === 'function' && typeof XMLSerializer === 'function') {
      try {
        var parser = new DOMParser();
        var doc = parser.parseFromString(trimmed, 'image/svg+xml');
        var root = doc && doc.documentElement ? doc.documentElement : null;
        if (!root || root.nodeName && root.nodeName.toLowerCase() === 'parsererror') {
          return escapeHtml(trimmed);
        }
        removeUnsafeSvgContent(root);
        if (root.nodeName && root.nodeName.toLowerCase() === 'svg' && !root.hasAttribute('aria-hidden')) {
          root.setAttribute('aria-hidden', 'true');
        }
        var serializer = new XMLSerializer();
        return serializer.serializeToString(root);
      } catch (error) {
        // Fall back to basic sanitization below.
      }
    }
    if (!/^<svg\b/i.test(trimmed)) {
      return escapeHtml(trimmed);
    }
    var sanitized = trimmed.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<foreignobject\b[^>]*>[\s\S]*?<\/foreignobject>/gi, '');
    sanitized = sanitized.replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*')/gi, '');
    sanitized = sanitized.replace(/\s(?:href|xlink:href)\s*=\s*("[^"]*"|'[^']*')/gi, function (match, value) {
      if (!value) return '';
      if (/^['"]?\s*javascript:/i.test(value)) {
        return '';
      }
      return match;
    sanitized = sanitized.replace(/\sstyle\s*=\s*("[^"]*"|'[^']*')/gi, function (match, value) {
      if (!value) return match;
      if (/javascript:/i.test(value)) {
        return '';
      }
      return match;
    });
    if (!/\baria-hidden\s*=\s*['"]/i.test(sanitized)) {
      sanitized = sanitized.replace(/<svg\b/i, function (match) {
        return "".concat(match, " aria-hidden=\"true\"");
      });
    }
    return sanitized;
