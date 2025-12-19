function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return {};
  }
  var GLOBAL_SCOPE = detectGlobalScope();
  function resolveModuleBase(scope) {
    if ((typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase) {
      return cineModuleBase;
    }
    if (typeof require === 'function') {
      try {
        var required = require('../base.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    if (scope && _typeof(scope.cineModuleBase) === 'object') {
      return scope.cineModuleBase;
    }
    return null;
  }
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }
  var safeWarn = typeof MODULE_BASE.safeWarn === 'function' ? MODULE_BASE.safeWarn : function fallbackWarn(message, error) {
    if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
      return;
    }
    if (typeof error === 'undefined') {
      console.warn(message);
    } else {
      console.warn(message, error);
    }
  };
  function resolveLocalization(scope) {
    if (scope && _typeof(scope.cineCoreLocalization) === 'object') {
      return scope.cineCoreLocalization;
    }
    return null;
  }
  function populateHelpTopics() {
    var doc = GLOBAL_SCOPE.document;
    if (!doc) return;
    var list = doc.getElementById('helpQuickLinksList');
    var nav = doc.getElementById('helpQuickLinks');
    if (!list || !nav) return;
    var localization = resolveLocalization(GLOBAL_SCOPE);
    if (!localization || typeof localization.getString !== 'function') return;
    list.innerHTML = '';
    var topics = ['projectManagement', 'saveShareBackup', 'deviceConfiguration', 'powerCalculation', 'connectionDiagram', 'gearList', 'contacts', 'ownGear', 'settings', 'offlineUse'];
    var hasTopics = false;
    topics.forEach(function (topicKey) {
      var title = localization.getString("helpTopics.".concat(topicKey, ".title"));
      var content = localization.getString("helpTopics.".concat(topicKey, ".content"));
      if (!title || !content) return;
      hasTopics = true;
      var li = doc.createElement('li');
      var button = doc.createElement('button');
      button.type = 'button';
      button.className = 'help-topic-link';
      button.textContent = title;
      button.setAttribute('aria-expanded', 'false');
      var contentDiv = doc.createElement('div');
      contentDiv.className = 'help-topic-content';
      contentDiv.hidden = true;
      contentDiv.innerHTML = "<p>".concat(content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'), "</p>");
      button.addEventListener('click', function () {
        var isExpanded = button.getAttribute('aria-expanded') === 'true';
        var allButtons = list.querySelectorAll('.help-topic-link');
        var allContents = list.querySelectorAll('.help-topic-content');
        allButtons.forEach(function (btn) {
          return btn.setAttribute('aria-expanded', 'false');
        });
        allContents.forEach(function (div) {
          return div.hidden = true;
        });
        if (!isExpanded) {
          button.setAttribute('aria-expanded', 'true');
          contentDiv.hidden = false;
        }
      });
      li.appendChild(button);
      li.appendChild(contentDiv);
      list.appendChild(li);
    });
    if (hasTopics) {
      nav.hidden = false;
    }
  }
  var moduleApi = Object.freeze({
    populateHelpTopics: populateHelpTopics
  });
  MODULE_BASE.registerOrQueueModule('cine.features.helpContent', moduleApi, {
    category: 'features',
    description: 'Populates the help dialog with topics from translations.',
    replace: true,
    connections: ['cineModuleBase', 'cineCoreUiHelpers', 'cineCoreLocalization']
  }, function (error) {
    return safeWarn('Unable to register cine.features.helpContent module.', error);
  }, GLOBAL_SCOPE, MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE));
  if (typeof MODULE_BASE.exposeGlobal === 'function') {
    MODULE_BASE.exposeGlobal('cineFeaturesHelpContent', moduleApi, GLOBAL_SCOPE, {
      configurable: true,
      enumerable: false,
      writable: false
    });
  } else {
    try {
      GLOBAL_SCOPE.cineFeaturesHelpContent = moduleApi;
    } catch (error) {
      void error;
    }
  }
  if (GLOBAL_SCOPE.document && GLOBAL_SCOPE.document.readyState !== 'loading') {
    populateHelpTopics();
  } else if (GLOBAL_SCOPE.document) {
    GLOBAL_SCOPE.document.addEventListener('DOMContentLoaded', populateHelpTopics);
  }
})();