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

  const GLOBAL_SCOPE = detectGlobalScope();

  function resolveModuleBase(scope) {
    if (typeof cineModuleBase === 'object' && cineModuleBase) {
      return cineModuleBase;
    }

    if (typeof require === 'function') {
      try {
        const required = require('../base.js');
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

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }

  const freezeDeep = typeof MODULE_BASE.freezeDeep === 'function'
    ? MODULE_BASE.freezeDeep
    : function fallbackFreezeDeep(value) {
        if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
          return value;
        }
        const seen = new WeakSet();
        function freeze(target) {
          if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
            return target;
          }
          if (seen.has(target)) {
            return target;
          }
          seen.add(target);
          try {
            const keys = Object.getOwnPropertyNames(target);
            for (let index = 0; index < keys.length; index += 1) {
              const key = keys[index];
              const descriptor = Object.getOwnPropertyDescriptor(target, key);
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

  const safeWarn = typeof MODULE_BASE.safeWarn === 'function'
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

  const exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function'
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

  const moduleRegistry = typeof MODULE_BASE.getModuleRegistry === 'function'
    ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE)
    : null;

  const registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function'
    ? function register(name, api, options, onError) {
        return MODULE_BASE.registerOrQueueModule(
          name,
          api,
          options,
          onError,
          GLOBAL_SCOPE,
          moduleRegistry,
        );
      }
    : function fallbackRegister() {
        return false;
      };

  const DEFAULT_WARNING_IDS = ['pinWarning', 'dtapWarning'];
  const DEFAULT_SECTION_ID = 'resultsSection';
  const DEFAULT_SECTION_CLASS = 'results-section print-section';
  const DEFAULT_BODY_CLASS = 'results-body';
  const DEFAULT_WARNINGS_CLASS = 'results-warnings';

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
    const stringValue = value == null ? '' : String(value);
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
    const textsSource = (textsCandidate && typeof textsCandidate === 'object')
      ? textsCandidate
      : (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.texts === 'object'
        ? GLOBAL_SCOPE.texts
        : null);
    const lang = typeof langCandidate === 'string' && langCandidate
      ? langCandidate
      : (typeof GLOBAL_SCOPE.currentLang === 'string' && GLOBAL_SCOPE.currentLang
        ? GLOBAL_SCOPE.currentLang
        : 'en');

    const dictionary = textsSource && typeof textsSource === 'object'
      ? (textsSource[lang] || textsSource.en || {})
      : {};

    return { textsSource, lang, dictionary };
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
    const html = typeof element.innerHTML === 'string' ? element.innerHTML.trim() : '';
    return html.length > 0;
  }

  function clonePowerDiagramElement(element, options = {}) {
    if (!element || !hasVisibleContent(element)) {
      return '';
    }

    const clone = element.cloneNode(true);
    const removeClasses = Array.isArray(options.removeClasses) ? options.removeClasses : ['hidden'];
    for (let index = 0; index < removeClasses.length; index += 1) {
      const className = removeClasses[index];
      if (className && clone.classList && clone.classList.contains(className)) {
        clone.classList.remove(className);
      }
    }

    const addClasses = Array.isArray(options.addClasses) ? options.addClasses : ['power-diagram'];
    for (let index = 0; index < addClasses.length; index += 1) {
      const className = addClasses[index];
      if (className && clone.classList) {
        clone.classList.add(className);
      }
    }

    if (options.containerId) {
      clone.id = options.containerId;
    }

    const replacements = Array.isArray(options.replacements) ? options.replacements : [
      { selector: '#powerDiagramBar', newId: 'powerDiagramBarOverview' },
      { selector: '#powerDiagramLegend', newId: 'powerDiagramLegendOverview', addClasses: ['power-diagram-legend'] },
      { selector: '#maxPowerText', newId: 'maxPowerTextOverview', addClasses: ['power-diagram-note'] },
    ];

    for (let index = 0; index < replacements.length; index += 1) {
      const config = replacements[index];
      if (!config || typeof config !== 'object') {
        continue;
      }
      const selector = typeof config.selector === 'string' ? config.selector : null;
      if (!selector) {
        continue;
      }
      const target = clone.querySelector(selector);
      if (!target) {
        continue;
      }
      if (config.newId) {
        target.id = config.newId;
      }
      const addList = Array.isArray(config.addClasses) ? config.addClasses : [];
      for (let classIndex = 0; classIndex < addList.length; classIndex += 1) {
        const className = addList[classIndex];
        if (className && target.classList) {
          target.classList.add(className);
        }
      }
      const removeList = Array.isArray(config.removeClasses) ? config.removeClasses : [];
      for (let classIndex = 0; classIndex < removeList.length; classIndex += 1) {
        const className = removeList[classIndex];
        if (className && target.classList && target.classList.contains(className)) {
          target.classList.remove(className);
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
    const map = severityClassMap && typeof severityClassMap === 'object'
      ? severityClassMap
      : {
          danger: 'status-message--danger',
          warning: 'status-message--warning',
          note: 'status-message--note',
          success: 'status-message--success',
          info: 'status-message--info',
        };

    const dataset = element.dataset || (typeof element.getAttribute === 'function' ? {
      statusLevel: element.getAttribute('data-status-level'),
    } : null);

    const level = dataset && typeof dataset.statusLevel === 'string'
      ? dataset.statusLevel
      : (typeof element.getAttribute === 'function'
        ? element.getAttribute('data-status-level')
        : null);

    if (level && map[level]) {
      return map[level];
    }

    if (element.classList) {
      const values = Object.values(map);
      for (let index = 0; index < values.length; index += 1) {
        const className = values[index];
        if (className && element.classList.contains(className)) {
          return className;
        }
      }
    }

    if (typeof element.getAttribute === 'function') {
      const classAttr = element.getAttribute('class');
      if (classAttr && typeof classAttr === 'string') {
        const classes = classAttr.split(/\s+/);
        const values = Object.values(map);
        for (let index = 0; index < values.length; index += 1) {
          const className = values[index];
          if (className && classes.indexOf(className) !== -1) {
            return className;
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
    const text = getTextContent(element).trim();
    if (!text) {
      return '';
    }
    const classes = ['status-message'];
    const severityClass = extractSeverityClass(element, severityClassMap);
    if (severityClass) {
      classes.push(severityClass);
    }
    return `<p class="${classes.join(' ')}">${escapeHtmlSafe(text)}</p>`;
  }

  function buildWarningsHtml(elements, severityClassMap) {
    if (!Array.isArray(elements) || elements.length === 0) {
      return '';
    }
    let html = '';
    for (let index = 0; index < elements.length; index += 1) {
      const markup = buildStatusMarkup(elements[index], severityClassMap);
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
    const indent = typeof indentSpaces === 'number' && indentSpaces > 0
      ? ' '.repeat(indentSpaces)
      : '';
    return html
      .split('\n')
      .map(line => (line ? `${indent}${line}` : line))
      .join('\n');
  }

  function collectResultsSectionData(options = {}) {
    const doc = resolveDocument(options.document);
    const translation = resolveTranslations(options.texts, options.lang);
    const dictionary = translation.dictionary || {};

    const headingId = typeof options.headingId === 'string' ? options.headingId : 'resultsHeading';
    const headingElem = resolveElement(doc, headingId, options.headingElem);
    const headingText = options.headingText != null
      ? String(options.headingText)
      : (dictionary.resultsHeading || getTextContent(headingElem));
    const headingHelp = options.headingHelp != null
      ? String(options.headingHelp)
      : (dictionary.resultsHeadingHelp || (headingElem && typeof headingElem.getAttribute === 'function'
        ? headingElem.getAttribute('data-help') || ''
        : ''));

    const breakdownHtml = options.breakdownHtml != null
      ? String(options.breakdownHtml)
      : (typeof options.breakdownListElem !== 'undefined' && options.breakdownListElem
        ? options.breakdownListElem.innerHTML
        : (resolveElement(doc, options.breakdownListId || 'breakdownList', null)?.innerHTML || ''));

    const powerDiagramElem = options.powerDiagramElem
      || resolveElement(doc, options.powerDiagramId || 'powerDiagram', null);
    const powerDiagramHtml = options.powerDiagramHtml != null
      ? String(options.powerDiagramHtml)
      : clonePowerDiagramElement(powerDiagramElem, options.powerDiagramClone || {});

    const totalsOptions = typeof options.totals === 'object' && options.totals
      ? options.totals
      : {};

    const totalPowerText = totalsOptions.totalPowerText != null
      ? String(totalsOptions.totalPowerText)
      : getTextContent(options.totalPowerElem || resolveElement(doc, options.totalPowerId || 'totalPower', null));

    const totalCurrent144Text = totalsOptions.totalCurrent144Text != null
      ? String(totalsOptions.totalCurrent144Text)
      : getTextContent(options.totalCurrent144Elem || resolveElement(doc, options.totalCurrent144Id || 'totalCurrent144', null));

    const totalCurrent12Text = totalsOptions.totalCurrent12Text != null
      ? String(totalsOptions.totalCurrent12Text)
      : getTextContent(options.totalCurrent12Elem || resolveElement(doc, options.totalCurrent12Id || 'totalCurrent12', null));

    const batteryLifeText = totalsOptions.batteryLifeText != null
      ? String(totalsOptions.batteryLifeText)
      : getTextContent(options.batteryLifeElem || resolveElement(doc, options.batteryLifeId || 'batteryLife', null));

    const batteryLifeUnitText = totalsOptions.batteryLifeUnitText != null
      ? String(totalsOptions.batteryLifeUnitText)
      : getTextContent(options.batteryLifeUnitElem || resolveElement(doc, options.batteryLifeUnitId || 'batteryLifeUnit', null));

    const runtimeAverageNoteText = totalsOptions.runtimeAverageNoteText != null
      ? String(totalsOptions.runtimeAverageNoteText)
      : getTextContent(options.runtimeAverageNoteElem || resolveElement(doc, options.runtimeAverageNoteId || 'runtimeAverageNote', null));

    const batteryCountText = totalsOptions.batteryCountText != null
      ? String(totalsOptions.batteryCountText)
      : getTextContent(options.batteryCountElem || resolveElement(doc, options.batteryCountId || 'batteryCount', null));

    const warningElements = Array.isArray(options.warningElements) && options.warningElements.length
      ? options.warningElements.filter(Boolean)
      : DEFAULT_WARNING_IDS.map(id => resolveElement(doc, id, null)).filter(Boolean);

    const warningsHtml = options.warningsHtml != null
      ? String(options.warningsHtml)
      : buildWarningsHtml(warningElements, options.warningsSeverityClassMap);

    return {
      lang: translation.lang,
      dictionary,
      headingText,
      headingHelp,
      breakdownHtml,
      powerDiagramHtml,
      totals: {
        totalPowerText,
        totalCurrent144Text,
        totalCurrent12Text,
        batteryLifeText,
        batteryLifeUnitText,
        runtimeAverageNoteText,
        batteryCountText,
      },
      warningsHtml,
    };
  }

  function buildResultsBodyHtml(snapshot, options = {}) {
    if (!snapshot) {
      return '';
    }

    const dictionary = snapshot.dictionary || {};
    const totals = snapshot.totals || {};
    const formatting = typeof options.totalsFormatting === 'object' && options.totalsFormatting
      ? options.totalsFormatting
      : {};

    const totalPowerUnit = typeof formatting.totalPowerUnit === 'string' ? formatting.totalPowerUnit : ' W';
    const totalCurrent144Unit = typeof formatting.totalCurrent144Unit === 'string' ? formatting.totalCurrent144Unit : ' A';
    const totalCurrent12Unit = typeof formatting.totalCurrent12Unit === 'string' ? formatting.totalCurrent12Unit : ' A';
    const batteryLifeSeparator = typeof formatting.batteryLifeUnitSeparator === 'string'
      ? formatting.batteryLifeUnitSeparator
      : ' ';
    const includeRuntimeAverageNote = typeof formatting.includeRuntimeAverageNote === 'boolean'
      ? formatting.includeRuntimeAverageNote
      : false;

    const breakdownListId = typeof options.breakdownListId === 'string'
      ? options.breakdownListId
      : 'breakdownList';

    const parts = [];
    parts.push(`<ul id="${escapeAttribute(breakdownListId)}">${snapshot.breakdownHtml || ''}</ul>`);

    if (snapshot.powerDiagramHtml) {
      parts.push(snapshot.powerDiagramHtml);
    }

    parts.push(`<p><strong>${escapeHtmlSafe(dictionary.totalPowerLabel || '')}</strong> ${escapeHtmlSafe(totals.totalPowerText || '')}${escapeHtmlSafe(totalPowerUnit)}</p>`);
    parts.push(`<p><strong>${escapeHtmlSafe(dictionary.totalCurrent144Label || '')}</strong> ${escapeHtmlSafe(totals.totalCurrent144Text || '')}${escapeHtmlSafe(totalCurrent144Unit)}</p>`);
    parts.push(`<p><strong>${escapeHtmlSafe(dictionary.totalCurrent12Label || '')}</strong> ${escapeHtmlSafe(totals.totalCurrent12Text || '')}${escapeHtmlSafe(totalCurrent12Unit)}</p>`);

    const unitSegment = totals.batteryLifeUnitText
      ? `${batteryLifeSeparator}${escapeHtmlSafe(totals.batteryLifeUnitText)}`
      : '';
    let runtimeNoteSegment = '';
    if (includeRuntimeAverageNote && totals.runtimeAverageNoteText) {
      runtimeNoteSegment = `${batteryLifeSeparator}${escapeHtmlSafe(totals.runtimeAverageNoteText)}`;
    }
    parts.push(`<p><strong>${escapeHtmlSafe(dictionary.batteryLifeLabel || '')}</strong> ${escapeHtmlSafe(totals.batteryLifeText || '')}${unitSegment}${runtimeNoteSegment}</p>`);
    parts.push(`<p><strong>${escapeHtmlSafe(dictionary.batteryCountLabel || '')}</strong> ${escapeHtmlSafe(totals.batteryCountText || '')}</p>`);

    return parts.join('\n                ');
  }

  function buildResultsSectionHtml(snapshot, options = {}) {
    if (!snapshot) {
      return '';
    }

    const sectionId = typeof options.sectionId === 'string' ? options.sectionId : DEFAULT_SECTION_ID;
    const sectionClass = typeof options.sectionClass === 'string' ? options.sectionClass : DEFAULT_SECTION_CLASS;
    const bodyClass = typeof options.bodyClass === 'string' ? options.bodyClass : DEFAULT_BODY_CLASS;
    const warningsClass = typeof options.warningsClass === 'string' ? options.warningsClass : DEFAULT_WARNINGS_CLASS;

    const bodyHtml = buildResultsBodyHtml(snapshot, options);
    const warningsBlock = snapshot.warningsHtml
      ? `<div class="${escapeAttribute(warningsClass)}">${snapshot.warningsHtml}</div>`
      : '';

    const helpAttr = snapshot.headingHelp
      ? ` data-help="${escapeAttribute(snapshot.headingHelp)}"`
      : '';

    const lines = [
      `<section id="${escapeAttribute(sectionId)}" class="${escapeAttribute(sectionClass)}">`,
      `    <h2${helpAttr}>${escapeHtmlSafe(snapshot.headingText || '')}</h2>`,
      `    <div class="${escapeAttribute(bodyClass)}">`,
    ];

    if (bodyHtml) {
      lines.push(indentHtml(bodyHtml, 8));
    }
    if (warningsBlock) {
      lines.push(`        ${warningsBlock}`);
    }

    lines.push('    </div>');
    lines.push('</section>');

    return lines.join('\n');
  }

  function generateResultsSectionHtml(options = {}) {
    const snapshot = collectResultsSectionData(options);
    if (!snapshot) {
      return '';
    }
    return buildResultsSectionHtml(snapshot, options);
  }

  const resultsSectionAPI = freezeDeep({
    collectResultsSectionData,
    buildResultsBodyHtml,
    buildResultsSectionHtml,
    generateResultsSectionHtml,
    constants: freezeDeep({
      DEFAULT_WARNING_IDS: DEFAULT_WARNING_IDS.slice(),
      DEFAULT_SECTION_ID,
      DEFAULT_SECTION_CLASS,
      DEFAULT_BODY_CLASS,
      DEFAULT_WARNINGS_CLASS,
    }),
  });

  registerOrQueueModule(
    'cine.ui.resultsSection',
    resultsSectionAPI,
    {
      category: 'ui',
      description: 'Generates the calculated results section markup for reuse in dialogs and exports.',
      replace: true,
    },
    (error) => safeWarn('Unable to register cine.ui.resultsSection module.', error),
  );

  exposeGlobal('cineUiResultsSection', resultsSectionAPI, {
    configurable: true,
    enumerable: false,
    writable: false,
  });
})();
