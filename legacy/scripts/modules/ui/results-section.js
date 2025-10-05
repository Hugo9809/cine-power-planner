/* global cineModuleBase, escapeHtml */

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
    if (typeof cineModuleBase === 'object' && cineModuleBase) {
      return cineModuleBase;
    }

    if (typeof require === 'function') {
      try {
        var required = require('../base.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (scope && typeof scope.cineModuleBase === 'object') {
      return scope.cineModuleBase;
    }

    return null;
  }

  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }

  var freezeDeep = typeof MODULE_BASE.freezeDeep === 'function'
    ? MODULE_BASE.freezeDeep
    : function fallbackFreezeDeep(value) {
        if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
          return value;
        }
        var seen = new WeakSet();
        function freeze(target) {
          if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
            return target;
          }
          if (seen.has(target)) {
            return target;
          }
          seen.add(target);
          try {
            var keys = Object.getOwnPropertyNames(target);
            for (var index = 0; index < keys.length; index += 1) {
              var key = keys[index];
              var descriptor = Object.getOwnPropertyDescriptor(target, key);
              if (!descriptor || descriptor.get || descriptor.set) {
                continue;
              }
              freeze(descriptor.value);
            }
            Object.freeze(target);
          } catch (error) {
            void error;
          }
          return target;
        }
        return freeze(value);
      };

  var safeWarn = typeof MODULE_BASE.safeWarn === 'function'
    ? MODULE_BASE.safeWarn
    : function fallbackWarn(message, error) {
        if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
          return;
        }
        if (typeof error === 'undefined') {
          console.warn(message);
        } else {
          console.warn(message, error);
        }
      };

  var exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function'
    ? function expose(name, value, options) {
        return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options || {});
      }
    : function fallbackExpose(name, value) {
        try {
          GLOBAL_SCOPE[name] = value;
          return true;
        } catch (error) {
          void error;
          return false;
        }
      };

  var moduleRegistry = typeof MODULE_BASE.getModuleRegistry === 'function'
    ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE)
    : null;

  var registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function'
    ? function register(name, api, options, onError) {
        return MODULE_BASE.registerOrQueueModule(
          name,
          api,
          options,
          onError,
          GLOBAL_SCOPE,
          moduleRegistry
        );
      }
    : function fallbackRegister() {
        return false;
      };

  var DEFAULT_WARNING_IDS = ['pinWarning', 'dtapWarning'];
  var DEFAULT_SECTION_ID = 'resultsSection';
  var DEFAULT_SECTION_CLASS = 'results-section print-section';
  var DEFAULT_BODY_CLASS = 'results-body';
  var DEFAULT_WARNINGS_CLASS = 'results-warnings';

  function resolveDocument(explicitDocument) {
    if (explicitDocument && typeof explicitDocument === 'object') {
      return explicitDocument;
    }
    if (typeof document !== 'undefined' && document) {
      return document;
    }
    return null;
  }

  function escapeHtmlSafe(value) {
    var stringValue = value == null ? '' : String(value);
    if (!stringValue) {
      return '';
    }
    if (typeof escapeHtml === 'function') {
      try {
        return escapeHtml(stringValue);
      } catch (error) {
        void error;
      }
    }
    return stringValue
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttribute(value) {
    return escapeHtmlSafe(value).replace(/"/g, '&quot;');
  }

  function resolveTranslations(textsCandidate, langCandidate) {
    var textsSource = textsCandidate && typeof textsCandidate === 'object'
      ? textsCandidate
      : (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.texts === 'object'
        ? GLOBAL_SCOPE.texts
        : null);
    var lang = typeof langCandidate === 'string' && langCandidate
      ? langCandidate
      : (typeof GLOBAL_SCOPE.currentLang === 'string' && GLOBAL_SCOPE.currentLang
        ? GLOBAL_SCOPE.currentLang
        : 'en');

    var dictionary = textsSource && typeof textsSource === 'object'
      ? (textsSource[lang] || textsSource.en || {})
      : {};

    return { textsSource: textsSource, lang: lang, dictionary: dictionary };
  }

  function resolveElement(doc, id, provided) {
    if (provided) {
      return provided;
    }
    if (!doc || !id) {
      return null;
    }
    try {
      return doc.getElementById(id);
    } catch (error) {
      void error;
      return null;
    }
  }

  function hasVisibleContent(element) {
    if (!element) {
      return false;
    }
    if (element.classList && element.classList.contains('hidden')) {
      return false;
    }
    if (element.hasAttribute && element.hasAttribute('hidden')) {
      return false;
    }
    if (element.style && (element.style.display === 'none' || element.style.visibility === 'hidden')) {
      return false;
    }
    var html = typeof element.innerHTML === 'string' ? element.innerHTML.trim() : '';
    return html.length > 0;
  }

  function clonePowerDiagramElement(element, options) {
    if (!options) {
      options = {};
    }
    if (!element || !hasVisibleContent(element)) {
      return '';
    }

    var clone = element.cloneNode(true);
    var removeClasses = Array.isArray(options.removeClasses) ? options.removeClasses : ['hidden'];
    for (var index = 0; index < removeClasses.length; index += 1) {
      var className = removeClasses[index];
      if (className && clone.classList && clone.classList.contains(className)) {
        clone.classList.remove(className);
      }
    }

    var addClasses = Array.isArray(options.addClasses) ? options.addClasses : ['power-diagram'];
    for (var addIndex = 0; addIndex < addClasses.length; addIndex += 1) {
      var addClassName = addClasses[addIndex];
      if (addClassName && clone.classList) {
        clone.classList.add(addClassName);
      }
    }

    if (options.containerId) {
      clone.id = options.containerId;
    }

    var replacements = Array.isArray(options.replacements) ? options.replacements : [
      { selector: '#powerDiagramBar', newId: 'powerDiagramBarOverview' },
      { selector: '#powerDiagramLegend', newId: 'powerDiagramLegendOverview', addClasses: ['power-diagram-legend'] },
      { selector: '#maxPowerText', newId: 'maxPowerTextOverview', addClasses: ['power-diagram-note'] }
    ];

    for (var replIndex = 0; replIndex < replacements.length; replIndex += 1) {
      var config = replacements[replIndex];
      if (!config || typeof config !== 'object') {
        continue;
      }
      var selector = typeof config.selector === 'string' ? config.selector : null;
      if (!selector) {
        continue;
      }
      var target = clone.querySelector(selector);
      if (!target) {
        continue;
      }
      if (config.newId) {
        target.id = config.newId;
      }
      var addList = Array.isArray(config.addClasses) ? config.addClasses : [];
      for (var classIndex = 0; classIndex < addList.length; classIndex += 1) {
        var addClass = addList[classIndex];
        if (addClass && target.classList) {
          target.classList.add(addClass);
        }
      }
      var removeList = Array.isArray(config.removeClasses) ? config.removeClasses : [];
      for (var removeIndex = 0; removeIndex < removeList.length; removeIndex += 1) {
        var removeClass = removeList[removeIndex];
        if (removeClass && target.classList && target.classList.contains(removeClass)) {
          target.classList.remove(removeClass);
        }
      }
    }

    return clone.outerHTML;
  }

  function getTextContent(element) {
    if (!element || typeof element.textContent !== 'string') {
      return '';
    }
    return element.textContent;
  }

  function extractSeverityClass(element, severityClassMap) {
    if (!element) {
      return '';
    }
    var map = severityClassMap && typeof severityClassMap === 'object'
      ? severityClassMap
      : {
          danger: 'status-message--danger',
          warning: 'status-message--warning',
          note: 'status-message--note',
          success: 'status-message--success',
          info: 'status-message--info'
        };

    var dataset = element.dataset || (typeof element.getAttribute === 'function'
      ? { statusLevel: element.getAttribute('data-status-level') }
      : null);

    var level = dataset && typeof dataset.statusLevel === 'string'
      ? dataset.statusLevel
      : (typeof element.getAttribute === 'function'
        ? element.getAttribute('data-status-level')
        : null);

    if (level && map[level]) {
      return map[level];
    }

    if (element.classList) {
      var values = [];
      for (var mapKey in map) {
        if (Object.prototype.hasOwnProperty.call(map, mapKey)) {
          values.push(map[mapKey]);
        }
      }
      for (var index = 0; index < values.length; index += 1) {
        var className = values[index];
        if (className && element.classList.contains(className)) {
          return className;
        }
      }
    }

    if (typeof element.getAttribute === 'function') {
      var classAttr = element.getAttribute('class');
      if (classAttr && typeof classAttr === 'string') {
        var classes = classAttr.split(/\s+/);
        for (var key in map) {
          if (Object.prototype.hasOwnProperty.call(map, key)) {
            var mappedClass = map[key];
            if (mappedClass && classes.indexOf(mappedClass) !== -1) {
              return mappedClass;
            }
          }
        }
      }
    }

    return '';
  }

  function buildStatusMarkup(element, severityClassMap) {
    if (!element) {
      return '';
    }
    var text = getTextContent(element).trim();
    if (!text) {
      return '';
    }
    var classes = ['status-message'];
    var severityClass = extractSeverityClass(element, severityClassMap);
    if (severityClass) {
      classes.push(severityClass);
    }
    return '<p class="' + classes.join(' ') + '">' + escapeHtmlSafe(text) + '</p>';
  }

  function buildWarningsHtml(elements, severityClassMap) {
    if (!Array.isArray(elements) || elements.length === 0) {
      return '';
    }
    var html = '';
    for (var index = 0; index < elements.length; index += 1) {
      var markup = buildStatusMarkup(elements[index], severityClassMap);
      if (markup) {
        html += markup;
      }
    }
    return html;
  }

  function indentHtml(html, indentSpaces) {
    if (!html) {
      return '';
    }
    var indent = typeof indentSpaces === 'number' && indentSpaces > 0
      ? new Array(indentSpaces + 1).join(' ')
      : '';
    var lines = html.split('\n');
    for (var index = 0; index < lines.length; index += 1) {
      if (lines[index]) {
        lines[index] = indent + lines[index];
      }
    }
    return lines.join('\n');
  }

  function collectResultsSectionData(options) {
    if (!options) {
      options = {};
    }
    var doc = resolveDocument(options.document);
    var translation = resolveTranslations(options.texts, options.lang);
    var dictionary = translation.dictionary || {};

    var headingId = typeof options.headingId === 'string' ? options.headingId : 'resultsHeading';
    var headingElem = resolveElement(doc, headingId, options.headingElem);
    var headingText = options.headingText != null
      ? String(options.headingText)
      : (dictionary.resultsHeading || getTextContent(headingElem));
    var headingHelp = options.headingHelp != null
      ? String(options.headingHelp)
      : (dictionary.resultsHeadingHelp || (headingElem && typeof headingElem.getAttribute === 'function'
        ? headingElem.getAttribute('data-help') || ''
        : ''));

    var breakdownHtml;
    if (options.breakdownHtml != null) {
      breakdownHtml = String(options.breakdownHtml);
    } else if (typeof options.breakdownListElem !== 'undefined' && options.breakdownListElem) {
      breakdownHtml = options.breakdownListElem.innerHTML;
    } else {
      var fallbackBreakdownElem = resolveElement(doc, options.breakdownListId || 'breakdownList', null);
      breakdownHtml = fallbackBreakdownElem && typeof fallbackBreakdownElem.innerHTML === 'string'
        ? fallbackBreakdownElem.innerHTML
        : '';
    }

    var powerDiagramElem = options.powerDiagramElem || resolveElement(doc, options.powerDiagramId || 'powerDiagram', null);
    var powerDiagramHtml = options.powerDiagramHtml != null
      ? String(options.powerDiagramHtml)
      : clonePowerDiagramElement(powerDiagramElem, options.powerDiagramClone || {});

    var totalsOptions = typeof options.totals === 'object' && options.totals
      ? options.totals
      : {};

    var totalPowerText = totalsOptions.totalPowerText != null
      ? String(totalsOptions.totalPowerText)
      : getTextContent(options.totalPowerElem || resolveElement(doc, options.totalPowerId || 'totalPower', null));

    var totalCurrent144Text = totalsOptions.totalCurrent144Text != null
      ? String(totalsOptions.totalCurrent144Text)
      : getTextContent(options.totalCurrent144Elem || resolveElement(doc, options.totalCurrent144Id || 'totalCurrent144', null));

    var totalCurrent12Text = totalsOptions.totalCurrent12Text != null
      ? String(totalsOptions.totalCurrent12Text)
      : getTextContent(options.totalCurrent12Elem || resolveElement(doc, options.totalCurrent12Id || 'totalCurrent12', null));

    var batteryLifeText = totalsOptions.batteryLifeText != null
      ? String(totalsOptions.batteryLifeText)
      : getTextContent(options.batteryLifeElem || resolveElement(doc, options.batteryLifeId || 'batteryLife', null));

    var batteryLifeUnitText = totalsOptions.batteryLifeUnitText != null
      ? String(totalsOptions.batteryLifeUnitText)
      : getTextContent(options.batteryLifeUnitElem || resolveElement(doc, options.batteryLifeUnitId || 'batteryLifeUnit', null));

    var runtimeAverageNoteText = totalsOptions.runtimeAverageNoteText != null
      ? String(totalsOptions.runtimeAverageNoteText)
      : getTextContent(options.runtimeAverageNoteElem || resolveElement(doc, options.runtimeAverageNoteId || 'runtimeAverageNote', null));

    var batteryCountText = totalsOptions.batteryCountText != null
      ? String(totalsOptions.batteryCountText)
      : getTextContent(options.batteryCountElem || resolveElement(doc, options.batteryCountId || 'batteryCount', null));

    var warningElements;
    if (Array.isArray(options.warningElements) && options.warningElements.length) {
      warningElements = [];
      for (var wIndex = 0; wIndex < options.warningElements.length; wIndex += 1) {
        if (options.warningElements[wIndex]) {
          warningElements.push(options.warningElements[wIndex]);
        }
      }
    } else {
      warningElements = [];
      for (var idIndex = 0; idIndex < DEFAULT_WARNING_IDS.length; idIndex += 1) {
        var warningElem = resolveElement(doc, DEFAULT_WARNING_IDS[idIndex], null);
        if (warningElem) {
          warningElements.push(warningElem);
        }
      }
    }

    var warningsHtml = options.warningsHtml != null
      ? String(options.warningsHtml)
      : buildWarningsHtml(warningElements, options.warningsSeverityClassMap);

    return {
      lang: translation.lang,
      dictionary: dictionary,
      headingText: headingText,
      headingHelp: headingHelp,
      breakdownHtml: breakdownHtml,
      powerDiagramHtml: powerDiagramHtml,
      totals: {
        totalPowerText: totalPowerText,
        totalCurrent144Text: totalCurrent144Text,
        totalCurrent12Text: totalCurrent12Text,
        batteryLifeText: batteryLifeText,
        batteryLifeUnitText: batteryLifeUnitText,
        runtimeAverageNoteText: runtimeAverageNoteText,
        batteryCountText: batteryCountText
      },
      warningsHtml: warningsHtml
    };
  }

  function buildResultsBodyHtml(snapshot, options) {
    if (!snapshot) {
      return '';
    }
    if (!options) {
      options = {};
    }

    var dictionary = snapshot.dictionary || {};
    var totals = snapshot.totals || {};
    var formatting = typeof options.totalsFormatting === 'object' && options.totalsFormatting
      ? options.totalsFormatting
      : {};

    var totalPowerUnit = typeof formatting.totalPowerUnit === 'string' ? formatting.totalPowerUnit : ' W';
    var totalCurrent144Unit = typeof formatting.totalCurrent144Unit === 'string' ? formatting.totalCurrent144Unit : ' A';
    var totalCurrent12Unit = typeof formatting.totalCurrent12Unit === 'string' ? formatting.totalCurrent12Unit : ' A';
    var batteryLifeSeparator = typeof formatting.batteryLifeUnitSeparator === 'string'
      ? formatting.batteryLifeUnitSeparator
      : ' ';
    var includeRuntimeAverageNote = typeof formatting.includeRuntimeAverageNote === 'boolean'
      ? formatting.includeRuntimeAverageNote
      : false;

    var breakdownListId = typeof options.breakdownListId === 'string'
      ? options.breakdownListId
      : 'breakdownList';

    var parts = [];
    parts.push('<ul id="' + escapeAttribute(breakdownListId) + '">' + (snapshot.breakdownHtml || '') + '</ul>');

    if (snapshot.powerDiagramHtml) {
      parts.push(snapshot.powerDiagramHtml);
    }

    parts.push('<p><strong>' + escapeHtmlSafe(dictionary.totalPowerLabel || '') + '</strong> ' + escapeHtmlSafe(totals.totalPowerText || '') + escapeHtmlSafe(totalPowerUnit) + '</p>');
    parts.push('<p><strong>' + escapeHtmlSafe(dictionary.totalCurrent144Label || '') + '</strong> ' + escapeHtmlSafe(totals.totalCurrent144Text || '') + escapeHtmlSafe(totalCurrent144Unit) + '</p>');
    parts.push('<p><strong>' + escapeHtmlSafe(dictionary.totalCurrent12Label || '') + '</strong> ' + escapeHtmlSafe(totals.totalCurrent12Text || '') + escapeHtmlSafe(totalCurrent12Unit) + '</p>');

    var unitSegment = totals.batteryLifeUnitText
      ? batteryLifeSeparator + escapeHtmlSafe(totals.batteryLifeUnitText)
      : '';
    var runtimeNoteSegment = '';
    if (includeRuntimeAverageNote && totals.runtimeAverageNoteText) {
      runtimeNoteSegment = batteryLifeSeparator + escapeHtmlSafe(totals.runtimeAverageNoteText);
    }
    parts.push('<p><strong>' + escapeHtmlSafe(dictionary.batteryLifeLabel || '') + '</strong> ' + escapeHtmlSafe(totals.batteryLifeText || '') + unitSegment + runtimeNoteSegment + '</p>');
    parts.push('<p><strong>' + escapeHtmlSafe(dictionary.batteryCountLabel || '') + '</strong> ' + escapeHtmlSafe(totals.batteryCountText || '') + '</p>');

    return parts.join('\n                ');
  }

  function buildResultsSectionHtml(snapshot, options) {
    if (!snapshot) {
      return '';
    }
    if (!options) {
      options = {};
    }

    var sectionId = typeof options.sectionId === 'string' ? options.sectionId : DEFAULT_SECTION_ID;
    var sectionClass = typeof options.sectionClass === 'string' ? options.sectionClass : DEFAULT_SECTION_CLASS;
    var bodyClass = typeof options.bodyClass === 'string' ? options.bodyClass : DEFAULT_BODY_CLASS;
    var warningsClass = typeof options.warningsClass === 'string' ? options.warningsClass : DEFAULT_WARNINGS_CLASS;

    var bodyHtml = buildResultsBodyHtml(snapshot, options);
    var warningsBlock = snapshot.warningsHtml
      ? '<div class="' + escapeAttribute(warningsClass) + '">' + snapshot.warningsHtml + '</div>'
      : '';

    var helpAttr = snapshot.headingHelp
      ? ' data-help="' + escapeAttribute(snapshot.headingHelp) + '"'
      : '';

    var lines = [
      '<section id="' + escapeAttribute(sectionId) + '" class="' + escapeAttribute(sectionClass) + '">',
      '    <h2' + helpAttr + '>' + escapeHtmlSafe(snapshot.headingText || '') + '</h2>',
      '    <div class="' + escapeAttribute(bodyClass) + '">'
    ];

    if (bodyHtml) {
      lines.push(indentHtml(bodyHtml, 8));
    }
    if (warningsBlock) {
      lines.push('        ' + warningsBlock);
    }

    lines.push('    </div>');
    lines.push('</section>');

    return lines.join('\n');
  }

  function generateResultsSectionHtml(options) {
    var snapshot = collectResultsSectionData(options);
    if (!snapshot) {
      return '';
    }
    return buildResultsSectionHtml(snapshot, options || {});
  }

  var resultsSectionAPI = freezeDeep({
    collectResultsSectionData: collectResultsSectionData,
    buildResultsBodyHtml: buildResultsBodyHtml,
    buildResultsSectionHtml: buildResultsSectionHtml,
    generateResultsSectionHtml: generateResultsSectionHtml,
    constants: freezeDeep({
      DEFAULT_WARNING_IDS: DEFAULT_WARNING_IDS.slice(),
      DEFAULT_SECTION_ID: DEFAULT_SECTION_ID,
      DEFAULT_SECTION_CLASS: DEFAULT_SECTION_CLASS,
      DEFAULT_BODY_CLASS: DEFAULT_BODY_CLASS,
      DEFAULT_WARNINGS_CLASS: DEFAULT_WARNINGS_CLASS
    })
  });

  registerOrQueueModule(
    'cine.ui.resultsSection',
    resultsSectionAPI,
    {
      category: 'ui',
      description: 'Generates the calculated results section markup for reuse in dialogs and exports.',
      replace: true
    },
    function (error) {
      safeWarn('Unable to register cine.ui.resultsSection module.', error);
    }
  );

  exposeGlobal('cineUiResultsSection', resultsSectionAPI, {
    configurable: true,
    enumerable: false,
    writable: false
  });
})();
