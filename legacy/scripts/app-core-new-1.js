    if (!escapeDiv) {
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
    while (button.firstChild) button.removeChild(button.firstChild);
    if (iconHtml && typeof globalThis !== 'undefined' && globalThis.document) {
      var tmp = document.createElement('span');
      tmp.innerHTML = iconHtml;
      while (tmp.firstChild) {
        button.appendChild(tmp.firstChild);
      }
    }
    var safeLabel = typeof label === 'string' ? label : '';
    if (typeof globalThis !== 'undefined' && globalThis.document) {
      button.appendChild(document.createTextNode(safeLabel));
    } else {
      button.textContent = safeLabel;
    }
  function isSafeImageUrl(url) {
    if (typeof url !== 'string') return false;
    if (url.startsWith('data:')) {
      var allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
      try {
        var mimeTypeEnd = url.indexOf(';', 5);
        var type = mimeTypeEnd >= 0 ? url.substring(5, mimeTypeEnd) : '';
        if (allowedTypes.includes(type)) return true;
      } catch (e) {}
      return false;
    } else if (/^\s*javascript:/i.test(url)) {
      return false;
    } else if (/^\s*https?:\/\//i.test(url)) {
      return true;
    } else if (/^[./\w-]/.test(url)) {
      return true;
    }
    return false;
  }
    if (avatarValue && isSafeImageUrl(avatarValue)) {
