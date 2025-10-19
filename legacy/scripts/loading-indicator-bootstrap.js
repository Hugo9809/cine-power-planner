function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function bootstrapLoadingIndicator(scope) {
  if (!scope || typeof document === 'undefined') {
    return;
  }
  var containerId = 'backupNotificationContainer';
  var indicatorId = 'cineGlobalLoadingIndicator';
  var stackClass = 'cine-notification-stack';
  var indicatorBaseClass = 'cine-notification';
  var indicatorLoadingClass = 'cine-notification--loading';
  var spinnerClass = 'cine-notification__spinner';
  var textClass = 'global-loading-indicator-text';
  if (scope.__cineLoadingNotice && scope.__cineLoadingNotice.indicator) {
    return;
  }
  var fallbackMessages = {
    preparing: 'Preparing planner…',
    modules: 'Loading planner interface…',
    data: 'Loading planner data…',
    almost: 'Almost ready…'
  };
  var localizedMessages = {};
  var currentKey = 'preparing';
  var container = null;
  var indicator = null;
  var hideTimeoutId = null;
  function cancelScheduledHide() {
    if (hideTimeoutId !== null) {
      if (typeof clearTimeout === 'function') {
        clearTimeout(hideTimeoutId);
      }
      hideTimeoutId = null;
    }
  }
  function updateNoticeReferences() {
    if (scope.__cineLoadingNotice && _typeof(scope.__cineLoadingNotice) === 'object') {
      scope.__cineLoadingNotice.container = container;
      scope.__cineLoadingNotice.indicator = indicator;
    }
  }
  function cleanupIndicatorIfIdle() {
    cancelScheduledHide();
    if (indicator && indicator.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
    indicator = null;
    if (container) {
      if (container.children && container.children.length === 0 && container.parentNode) {
        container.parentNode.removeChild(container);
      }
      if (container.children && container.children.length === 0) {
        container = null;
      }
    }
    updateNoticeReferences();
  }
  function scheduleHideAfterComplete() {
    if (hideTimeoutId !== null) {
      return;
    }
    if (typeof setTimeout !== 'function') {
      cleanupIndicatorIfIdle();
      return;
    }
    hideTimeoutId = setTimeout(function () {
      hideTimeoutId = null;
      if (indicator && indicator.dataset && indicator.dataset.preventBootstrapHide === 'true') {
        return;
      }
      cleanupIndicatorIfIdle();
    }, 600);
  }
  function getLocalizedMessage(key) {
    var trimmedKey = typeof key === 'string' ? key.trim() : '';
    if (!trimmedKey) {
      return '';
    }
    if (localizedMessages && _typeof(localizedMessages) === 'object') {
      var localized = localizedMessages[trimmedKey];
      if (typeof localized === 'string' && localized.trim()) {
        return localized.trim();
      }
    }
    var fallback = fallbackMessages[trimmedKey];
    if (typeof fallback === 'string' && fallback.trim()) {
      return fallback.trim();
    }
    return '';
  }
  function ensureContainer() {
    if (container && container.parentNode) {
      return container;
    }
    cancelScheduledHide();
    var existing = document.getElementById(containerId);
    container = existing || document.createElement('div');
    container.id = containerId;
    if (container.classList) {
      container.classList.add(stackClass);
    } else {
      container.className = [container.className || '', stackClass].join(' ').trim();
    }
    container.setAttribute('role', 'presentation');
    container.dataset.bootstrap = 'true';
    var parent = document.body || document.documentElement;
    if (parent && container.parentNode !== parent) {
      parent.appendChild(container);
    }
    updateNoticeReferences();
    return container;
  }
  function ensureIndicator() {
    if (indicator && indicator.parentNode) {
      return indicator;
    }
    cancelScheduledHide();
    container = ensureContainer();
    var existing = document.getElementById(indicatorId);
    indicator = existing || document.createElement('div');
    indicator.id = indicatorId;
    if (indicator.classList) {
      indicator.classList.add(indicatorBaseClass, indicatorLoadingClass);
    } else {
      indicator.className = [indicator.className || '', indicatorBaseClass, indicatorLoadingClass].join(' ').trim();
    }
    indicator.setAttribute('role', 'status');
    indicator.setAttribute('aria-live', 'polite');
    indicator.setAttribute('aria-busy', 'true');
    indicator.dataset.bootstrap = 'true';
    var spinner = indicator.querySelector('.' + spinnerClass);
    if (!spinner) {
      spinner = document.createElement('span');
      spinner.className = spinnerClass;
      spinner.setAttribute('aria-hidden', 'true');
      indicator.insertBefore(spinner, indicator.firstChild);
    }
    var textNode = indicator.querySelector('.' + textClass);
    if (!textNode) {
      textNode = document.createElement('span');
      textNode.className = textClass;
      indicator.appendChild(textNode);
    }
    if (container && indicator.parentNode !== container) {
      container.appendChild(indicator);
    }
    updateNoticeReferences();
    return indicator;
  }
  function updateMessage() {
    var target = indicator ? indicator.querySelector('.' + textClass) : null;
    if (!target) {
      return;
    }
    var message = getLocalizedMessage(currentKey);
    if (!message && currentKey !== 'preparing') {
      message = getLocalizedMessage('preparing');
    }
    if (!message) {
      message = 'Loading…';
    }
    target.textContent = message;
    indicator.dataset.messageMode = 'key';
    indicator.dataset.messageKey = currentKey;
    indicator.dataset.fallbackMessage = message;
    indicator.dataset.currentMessage = message;
  }
  function setBusy(isBusy) {
    if (!indicator) {
      return;
    }
    if (isBusy) {
      indicator.setAttribute('aria-busy', 'true');
    } else {
      indicator.setAttribute('aria-busy', 'false');
    }
  }
  function setMessageKey(key) {
    var normalizedKey = typeof key === 'string' && key.trim() ? key.trim() : 'preparing';
    currentKey = normalizedKey;
    ensureIndicator();
    updateMessage();
  }
  function applyLocalization(map) {
    localizedMessages = map && _typeof(map) === 'object' ? map : {};
    updateMessage();
  }
  function relocateContainerIfNeeded() {
    if (!container) {
      return;
    }
    var parent = container.parentNode;
    if (!parent || parent === document.body) {
      return;
    }
    if (document.body) {
      document.body.appendChild(container);
    }
  }
  container = ensureContainer();
  indicator = ensureIndicator();
  setMessageKey(currentKey);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', relocateContainerIfNeeded, {
      once: true
    });
  } else {
    relocateContainerIfNeeded();
  }
  function handleProgress(event) {
    if (!event) {
      return;
    }
    var detail = event.detail || {};
    var total = Number(detail.total);
    var index = Number(detail.index);
    var key = 'modules';
    if (Number.isFinite(total) && total > 0 && Number.isFinite(index)) {
      if (index + 1 >= total) {
        key = 'almost';
      } else if (index > 0) {
        key = 'data';
      }
    }
    setMessageKey(key);
  }
  function handleComplete() {
    setMessageKey('almost');
    setBusy(false);
    scheduleHideAfterComplete();
  }
  document.addEventListener('cine-loader-progress', handleProgress);
  document.addEventListener('cine-loader-complete', handleComplete, {
    once: true
  });
  scope.__cineLoadingNotice = {
    container: container,
    indicator: indicator,
    ensureContainer: ensureContainer,
    ensureIndicator: ensureIndicator,
    setMessageKey: setMessageKey,
    applyLocalization: applyLocalization,
    setBusy: setBusy,
    refresh: updateMessage,
    getCurrentKey: function getCurrentKey() {
      return currentKey;
    },
    getFallbackMessages: function getFallbackMessages() {
      var copy = {};
      for (var key in fallbackMessages) {
        if (Object.prototype.hasOwnProperty.call(fallbackMessages, key)) {
          copy[key] = fallbackMessages[key];
        }
      }
      return copy;
    }
  };
})(typeof window !== 'undefined' ? window : this);