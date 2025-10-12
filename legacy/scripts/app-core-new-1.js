  function safelyAppendIconMarkup(target, iconHtml) {
    if (!target || !iconHtml) {
      return;
    }
    try {
      var template = document.createElement('template');
      template.innerHTML = iconHtml;
      var fragment = template.content.cloneNode(true);
      if (fragment.childNodes.length) {
        target.appendChild(fragment);
      }
    } catch (appendIconError) {
      void appendIconError;
    }
  }
    var labelText = typeof label === 'string' ? label : '';
    while (button.firstChild) {
      button.removeChild(button.firstChild);
    }
    safelyAppendIconMarkup(button, iconHtml);
    if (labelText) {
      button.appendChild(document.createTextNode(labelText));
    }
    var labelText = typeof label === 'string' ? label : '';
    while (button.firstChild) {
      button.removeChild(button.firstChild);
    }
    safelyAppendIconMarkup(button, iconHtml);
    if (labelText) {
      button.appendChild(document.createTextNode(labelText));
    }
