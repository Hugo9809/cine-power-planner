(function (globalScope) {
  'use strict';

  function initializeHelpSystem() {
    if (typeof helpButton === 'undefined' || typeof helpDialog === 'undefined') {
      return;
    }
    var scope = globalScope && typeof globalScope === 'object' ? globalScope : {};
    var helpButton = scope.helpButton;
    var helpDialog = scope.helpDialog;

    if (!helpButton || !helpDialog) {
      return;
    }

    var backupDiffSectionEl = scope.backupDiffSectionEl;
    var restoreRehearsalSectionEl = scope.restoreRehearsalSectionEl;
    var showBackupDiffSection = scope.showBackupDiffSection;
    var openRestoreRehearsal = scope.openRestoreRehearsal;
    var activateSettingsTab = scope.activateSettingsTab;
    var isDialogOpen = scope.isDialogOpen;
    var settingsDialog = scope.settingsDialog;
    var settingsButton = scope.settingsButton;
    var generateGearListBtn = scope.generateGearListBtn;
    var runtimeFeedbackBtn = scope.runtimeFeedbackBtn;
    var generateOverviewBtn = scope.generateOverviewBtn;
    var openDialog = scope.openDialog;
    var showDeviceManagerSection = scope.showDeviceManagerSection;
    var helpQuickLinksNav = scope.helpQuickLinksNav;
    var helpQuickLinksList = scope.helpQuickLinksList;
    var helpQuickLinksHeading = scope.helpQuickLinksHeading;
    var helpSectionsContainer = scope.helpSectionsContainer;
    var texts = scope.texts || {};
    var currentLang = scope.currentLang;
    var updateHelpQuickLinksForLanguage = scope.updateHelpQuickLinksForLanguage;
    var updateHelpResultsSummaryText = scope.updateHelpResultsSummaryText;
    var normalizeSpellingVariants = scope.normalizeSpellingVariants;
    var normaliseMarkVariants = scope.normaliseMarkVariants;
    var helpResultsAssist = scope.helpResultsAssist;
    var helpResultsSummary = scope.helpResultsSummary;
    var helpSearch = scope.helpSearch;
    var helpSearchClear = scope.helpSearchClear;
    var helpNoResults = scope.helpNoResults;
    var closeSideMenu = scope.closeSideMenu;
    var closeDialog = scope.closeDialog;
    var revertSettingsPinkModeIfNeeded = scope.revertSettingsPinkModeIfNeeded;
    var rememberSettingsPinkModeBaseline = scope.rememberSettingsPinkModeBaseline;
    var revertSettingsTemperatureUnitIfNeeded = scope.revertSettingsTemperatureUnitIfNeeded;
    var rememberSettingsTemperatureUnitBaseline = scope.rememberSettingsTemperatureUnitBaseline;
    var invokeSessionRevertAccentColor = scope.invokeSessionRevertAccentColor;
    var darkModeEnabled = scope.darkModeEnabled;
    var applyDarkMode = scope.applyDarkMode;
    var persistPinkModePreference = scope.persistPinkModePreference;
    var saveSetupBtn = scope.saveSetupBtn;
    var hoverHelpButton = scope.hoverHelpButton;
    var featureSearch = scope.featureSearch;
    var openSideMenu = scope.openSideMenu;
    var updateFeatureSearchSuggestions = scope.updateFeatureSearchSuggestions;
    var runFeatureSearch = scope.runFeatureSearch;
    var normalizeSearchValue = scope.normalizeSearchValue;
    var extractFeatureSearchFilter = scope.extractFeatureSearchFilter;
    var searchKey = scope.searchKey;
    var searchTokens = scope.searchTokens;
    var findBestSearchMatch = scope.findBestSearchMatch;
    var helpMap = scope.helpMap;
    var deviceMap = scope.deviceMap;
    var featureMap = scope.featureMap;
    var FALLBACK_STRONG_SEARCH_MATCH_TYPES = scope.FALLBACK_STRONG_SEARCH_MATCH_TYPES;
    var STRONG_SEARCH_MATCH_TYPES = scope.STRONG_SEARCH_MATCH_TYPES || FALLBACK_STRONG_SEARCH_MATCH_TYPES;
    var updateFeatureSearchValue = scope.updateFeatureSearchValue;
    var recordFeatureSearchUsage = scope.recordFeatureSearchUsage;
    var restoreFeatureSearchDefaults = scope.restoreFeatureSearchDefaults;
    var closeHelpBtn = scope.closeHelpBtn;
      var helpContent = helpDialog.querySelector('.help-content');
      var helpQuickLinkItems = new Map();
      var helpSectionHighlightTimers = new Map();
      var appTargetHighlightTimers = new Map();
      var featureSearchHighlightTimers = new Map();
      var ensureHelpLinksUseButtonStyle = function ensureHelpLinksUseButtonStyle() {
        if (!helpContent) return;
        var helpLinks = helpContent.querySelectorAll('a.help-link');
        helpLinks.forEach(function (link) {
          link.classList.add('button-link');
        });
      };
      ensureHelpLinksUseButtonStyle();
      var highlightAppTarget = function highlightAppTarget(element) {
        if (!element) return;
        var target = element;
        var existing = appTargetHighlightTimers.get(target);
        if (existing) {
          clearTimeout(existing);
        }
        target.classList.add('help-target-focus');
        var timeout = setTimeout(function () {
          target.classList.remove('help-target-focus');
          appTargetHighlightTimers.delete(target);
        }, 2000);
        appTargetHighlightTimers.set(target, timeout);
      };
      var highlightFeatureSearchTargets = function highlightFeatureSearchTargets(targets) {
        if (!Array.isArray(targets) || targets.length === 0) return;
        var seen = new Set();
        targets.forEach(function (target) {
          var _target$classList;
          if (!target || typeof ((_target$classList = target.classList) === null || _target$classList === void 0 ? void 0 : _target$classList.add) !== 'function') return;
          if (seen.has(target)) return;
          seen.add(target);
          var existing = featureSearchHighlightTimers.get(target);
          if (existing) {
            clearTimeout(existing);
          }
          target.classList.add('feature-search-focus');
          var timeout = setTimeout(function () {
            target.classList.remove('feature-search-focus');
            featureSearchHighlightTimers.delete(target);
          }, 2500);
          featureSearchHighlightTimers.set(target, timeout);
        });
      };
      var findAssociatedLabelElements = function findAssociatedLabelElements(element) {
        if (!element) return [];
        var labels = new Set();
        var doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
        if (element.labels && _typeof(element.labels) === 'object') {
          Array.from(element.labels).forEach(function (label) {
            if (label) labels.add(label);
          });
        }
        if (typeof element.closest === 'function') {
          var wrappingLabel = element.closest('label');
          if (wrappingLabel) labels.add(wrappingLabel);
        }
        if (doc && typeof element.getAttribute === 'function') {
          var collectIdRefs = function collectIdRefs(attrValue) {
            if (!attrValue) return;
            attrValue.split(/\s+/).filter(Boolean).forEach(function (id) {
              var ref = doc.getElementById(id);
              if (ref) labels.add(ref);
            });
          };
          collectIdRefs(element.getAttribute('aria-labelledby'));
          collectIdRefs(element.getAttribute('aria-describedby'));
        }
        return Array.from(labels);
      };
      var focusFeatureElement = function focusFeatureElement(element) {
        if (!element) return;
        var settingsSection = element.closest('#settingsDialog');
        var settingsPanel = element.closest('.settings-panel');
        if (settingsPanel) {
          var labelledBy = settingsPanel.getAttribute('aria-labelledby') || '';
          var tabIds = labelledBy.split(/\s+/).map(function (id) {
            return id.trim();
          }).filter(Boolean);
          var matchingTabId = tabIds.find(function (id) {
            return document.getElementById(id);
          });
          if (matchingTabId) {
            activateSettingsTab(matchingTabId);
          }
        }
        if (settingsSection && !isDialogOpen(settingsDialog)) {
          var _settingsButton, _settingsButton$click;
          (_settingsButton = settingsButton) === null || _settingsButton === void 0 || (_settingsButton$click = _settingsButton.click) === null || _settingsButton$click === void 0 || _settingsButton$click.call(_settingsButton);
        }
        var dialog = element.closest('dialog');
        if (dialog && !isDialogOpen(dialog)) {
          if (dialog.id === 'projectDialog') {
            var _generateGearListBtn, _generateGearListBtn$;
            (_generateGearListBtn = generateGearListBtn) === null || _generateGearListBtn === void 0 || (_generateGearListBtn$ = _generateGearListBtn.click) === null || _generateGearListBtn$ === void 0 || _generateGearListBtn$.call(_generateGearListBtn);
          } else if (dialog.id === 'feedbackDialog') {
            var _runtimeFeedbackBtn, _runtimeFeedbackBtn$c;
            (_runtimeFeedbackBtn = runtimeFeedbackBtn) === null || _runtimeFeedbackBtn === void 0 || (_runtimeFeedbackBtn$c = _runtimeFeedbackBtn.click) === null || _runtimeFeedbackBtn$c === void 0 || _runtimeFeedbackBtn$c.call(_runtimeFeedbackBtn);
          } else if (dialog.id === 'overviewDialog') {
            var _generateOverviewBtn, _generateOverviewBtn$;
            (_generateOverviewBtn = generateOverviewBtn) === null || _generateOverviewBtn === void 0 || (_generateOverviewBtn$ = _generateOverviewBtn.click) === null || _generateOverviewBtn$ === void 0 || _generateOverviewBtn$.call(_generateOverviewBtn);
          } else {
            openDialog(dialog);
          }
        }
        var deviceManager = element.closest('#device-manager');
        if (deviceManager) {
          showDeviceManagerSection();
        }
        if (typeof element.scrollIntoView === 'function') {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
        var hadTabIndex = element.hasAttribute('tabindex');
        var addedTabIndex = false;
        if (!hadTabIndex) {
          var tabIndex = element.tabIndex;
          if (typeof tabIndex === 'number' && tabIndex < 0) {
            element.setAttribute('tabindex', '-1');
            addedTabIndex = true;
          }
        }
        if (typeof element.focus === 'function') {
          try {
            element.focus({
              preventScroll: true
            });
          } catch (_unused7) {
            element.focus();
          }
        }
        if (addedTabIndex) {
          element.addEventListener('blur', function () {
            return element.removeAttribute('tabindex');
          }, {
            once: true
          });
        }
      };
      var focusHelpSectionHeading = function focusHelpSectionHeading(section) {
        if (!section) return;
        var heading = section.querySelector('h3, summary, h4, h5, h6') || section.querySelector('button, a');
        if (!heading) return;
        var hadTabIndex = heading.hasAttribute('tabindex');
        if (!hadTabIndex) heading.setAttribute('tabindex', '-1');
        try {
          heading.focus({
            preventScroll: true
          });
        } catch (_unused8) {
          heading.focus();
        }
        if (!hadTabIndex) {
          heading.addEventListener('blur', function () {
            return heading.removeAttribute('tabindex');
          }, {
            once: true
          });
        }
      };
      var highlightHelpSection = function highlightHelpSection(section) {
        if (!section) return;
        var existingTimer = helpSectionHighlightTimers.get(section);
        if (existingTimer) {
          clearTimeout(existingTimer);
        }
        section.classList.add('help-section-focus');
        var timer = setTimeout(function () {
          section.classList.remove('help-section-focus');
          helpSectionHighlightTimers.delete(section);
        }, 1500);
        helpSectionHighlightTimers.set(section, timer);
      };
      var syncHelpQuickLinksVisibility = function syncHelpQuickLinksVisibility() {
        if (!helpQuickLinksNav || !helpQuickLinksList || !helpQuickLinkItems.size) {
          if (helpQuickLinksNav) helpQuickLinksNav.setAttribute('hidden', '');
          return;
        }
        var hasVisible = false;
        helpQuickLinkItems.forEach(function (_ref15) {
          var section = _ref15.section,
            listItem = _ref15.listItem,
            button = _ref15.button;
          if (section && !section.hasAttribute('hidden')) {
            listItem.removeAttribute('hidden');
            hasVisible = true;
          } else {
            listItem.setAttribute('hidden', '');
            if (button) button.classList.remove('active');
          }
        });
        if (hasVisible) {
          helpQuickLinksNav.removeAttribute('hidden');
        } else {
          helpQuickLinksNav.setAttribute('hidden', '');
        }
      };
      var applyQuickLinkLanguage = function applyQuickLinkLanguage(lang) {
        if (!helpQuickLinksNav) return;
        var langTexts = texts && texts[lang] || {};
        var fallbackTexts = texts && texts.en || {};
        var headingText = langTexts.helpQuickLinksHeading || fallbackTexts.helpQuickLinksHeading;
        if (helpQuickLinksHeading && headingText) {
          helpQuickLinksHeading.textContent = headingText;
        }
        var ariaLabel = langTexts.helpQuickLinksAriaLabel || headingText || fallbackTexts.helpQuickLinksAriaLabel || 'Help topics quick navigation';
        helpQuickLinksNav.setAttribute('aria-label', ariaLabel);
        var helpDescription = langTexts.helpQuickLinksHelp || fallbackTexts.helpQuickLinksHelp;
        if (helpDescription) {
          helpQuickLinksNav.setAttribute('data-help', helpDescription);
        } else {
          helpQuickLinksNav.removeAttribute('data-help');
        }
        var template = langTexts.helpQuickLinkButtonHelp || fallbackTexts.helpQuickLinkButtonHelp;
        helpQuickLinkItems.forEach(function (_ref16) {
          var button = _ref16.button,
            label = _ref16.label;
          if (!button) return;
          if (template) {
            var helpText = template.replace('%s', label);
            button.setAttribute('data-help', helpText);
            button.setAttribute('aria-label', helpText);
          } else {
            button.removeAttribute('data-help');
            button.setAttribute('aria-label', label);
          }
        });
      };
      updateHelpQuickLinksForLanguage = applyQuickLinkLanguage;
      if (scope && typeof scope === 'object') {
        scope.updateHelpQuickLinksForLanguage = updateHelpQuickLinksForLanguage;
      }
      var buildHelpQuickLinks = function buildHelpQuickLinks() {
        if (!helpQuickLinksNav || !helpQuickLinksList || !helpSectionsContainer) {
          helpQuickLinkItems.clear();
          if (helpQuickLinksNav) helpQuickLinksNav.setAttribute('hidden', '');
          return;
        }
        helpQuickLinkItems.clear();
        helpQuickLinksList.textContent = '';
        var fragment = document.createDocumentFragment();
        var sections = Array.from(helpSectionsContainer.querySelectorAll('section[data-help-section]'));
        sections.forEach(function (section) {
          var id = section.id;
          if (!id) return;
          var heading = section.querySelector('h3');
          if (!heading) return;
          var headingIcon = heading.querySelector('.help-icon.icon-glyph');
          var label = heading.textContent || '';
          if (headingIcon) {
            var iconText = headingIcon.textContent || '';
            if (iconText) {
              var iconIndex = label.indexOf(iconText);
              if (iconIndex > -1) {
                label = label.slice(0, iconIndex) + label.slice(iconIndex + iconText.length);
              }
            }
          }
          label = label.trim();
          if (!label) return;
          var li = document.createElement('li');
          var button = document.createElement('button');
          button.type = 'button';
          button.className = 'help-quick-link button-link';
          button.dataset.targetId = id;
          button.setAttribute('aria-label', label);
          if (headingIcon) {
            var icon = headingIcon.cloneNode(true);
            icon.classList.remove('help-icon');
            icon.classList.add('help-quick-link-icon');
            button.appendChild(icon);
          }
          var labelSpan = document.createElement('span');
          labelSpan.className = 'help-quick-link-label';
          labelSpan.textContent = label;
          button.appendChild(labelSpan);
          button.addEventListener('click', function () {
            if (section.hasAttribute('hidden')) return;
            if (helpQuickLinksList) {
              helpQuickLinksList.querySelectorAll('.help-quick-link.active').forEach(function (btn) {
                return btn.classList.remove('active');
              });
            }
            button.classList.add('active');
            if (typeof section.scrollIntoView === 'function') {
              section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
            highlightHelpSection(section);
            focusHelpSectionHeading(section);
            var quickLinkHeading = section.querySelector('h3, summary, h4, h5, h6, [role="heading"]') || section.querySelector('button, a');
            if (quickLinkHeading) {
              highlightFeatureSearchTargets([quickLinkHeading]);
            } else {
              highlightFeatureSearchTargets([section]);
            }
          });
          li.appendChild(button);
          fragment.appendChild(li);
          helpQuickLinkItems.set(id, {
            section: section,
            button: button,
            listItem: li,
            label: label
          });
        });
        if (!fragment.childNodes.length) {
          helpQuickLinksNav.setAttribute('hidden', '');
          return;
        }
        helpQuickLinksList.appendChild(fragment);
        applyQuickLinkLanguage(currentLang);
        syncHelpQuickLinksVisibility();
      };
      buildHelpQuickLinks();
      if (helpDialog) {
        helpDialog.addEventListener('click', function (e) {
          var link = e.target.closest('a[data-help-target]');
          if (!link) return;
          var rawSelector = link.dataset.helpTarget || link.getAttribute('href') || '';
          var selector = rawSelector.trim();
          if (!selector) return;
          var focusEl;
          try {
            focusEl = document.querySelector(selector);
          } catch (_unused9) {
            focusEl = null;
          }
          if (!focusEl) return;
          e.preventDefault();
          var highlightSelector = link.dataset.helpHighlight || '';
          var highlightEl = focusEl;
          if (highlightSelector) {
            try {
              var candidate = document.querySelector(highlightSelector);
              if (candidate) {
                highlightEl = candidate;
              }
            } catch (_unused0) {}
          }
          var targetInsideHelp = helpDialog.contains(focusEl);
          var runFocus = function runFocus() {
            focusFeatureElement(focusEl);
            if (highlightEl) {
              highlightAppTarget(highlightEl);
            }
            var extraTargets = findAssociatedLabelElements(highlightEl || focusEl);
            if (extraTargets.length) {
              highlightFeatureSearchTargets(extraTargets);
            }
          };
          if (targetInsideHelp) {
            runFocus();
            return;
          }
          closeHelp(null);
          requestAnimationFrame(function () {
            requestAnimationFrame(runFocus);
          });
        });
      }
      var HELP_SEARCH_ACCENT_VARIANTS = new Map([['a', 'àáâãäåāăąǎȁȃȧậắằẵẳấầẫẩảạæ'], ['b', 'ḃɓ'], ['c', 'çćĉċčƈ'], ['d', 'ďđḍḑḓ'], ['e', 'èéêëēĕėęěȅȇẹẻẽếềểễệ'], ['f', 'ƒḟ'], ['g', 'ğģĝġǵḡ'], ['h', 'ĥħḣḥḧẖ'], ['i', 'ìíîïĩīĭįıỉị'], ['j', 'ĵǰ'], ['k', 'ķƙḱḳḵ'], ['l', 'ĺļľłḷḽ'], ['m', 'ḿṁṃ'], ['n', 'ñńņňǹṅṇṋ'], ['o', 'òóôõöōŏőøǒȍȏơộớờỡởợọỏœ'], ['p', 'ṕṗ'], ['q', 'ʠ'], ['r', 'ŕŗřȑȓṛṙ'], ['s', 'śŝşšșṡṣ'], ['t', 'ţťțṫṭṯ'], ['u', 'ùúûüũūŭůűųǔȕȗưựứừữửụủ'], ['v', 'ṽṿ'], ['w', 'ŵẁẃẅẇẉ'], ['x', 'ẋẍ'], ['y', 'ýÿŷỳỷỹỵ'], ['z', 'źżžẑẓẕ']]);
      var normaliseHelpSearchText = function normaliseHelpSearchText(str) {
        if (!str) return '';
        var normalized = String(str).toLowerCase();
        if (typeof normalized.normalize === 'function') {
          normalized = normalized.normalize('NFD');
        }
        normalized = normalized.replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/ø/g, 'o').replace(/&/g, 'and').replace(/\+/g, 'plus').replace(/[°º˚]/g, 'deg').replace(/\bdegrees?\b/g, 'deg').replace(/[×✕✖✗✘]/g, 'x');
        if (typeof normalizeSpellingVariants === 'function') {
          normalized = normalizeSpellingVariants(normalized);
        }
        normalized = normaliseMarkVariants(normalized);
        return normalized.replace(/[^a-z0-9]+/g, '');
      };
      var buildHelpHighlightPattern = function buildHelpHighlightPattern(normalized) {
        if (!normalized) return null;
        var escapeRegExp = function escapeRegExp(str) {
          return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        };
        var parts = [];
        var addLetterPattern = function addLetterPattern(char) {
          var variants = HELP_SEARCH_ACCENT_VARIANTS.get(char) || '';
          var chars = new Set();
          var all = "".concat(char).concat(variants);
          var _iterator2 = _createForOfIteratorHelper(all),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var ch = _step2.value;
              chars.add(ch);
              var upper = ch.toUpperCase();
              if (upper) chars.add(upper);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          var escaped = Array.from(chars).map(escapeRegExp).join('');
          return "[".concat(escaped, "]");
        };
        var letters = Array.from(normalized);
        letters.forEach(function (char, index) {
          if (index > 0) parts.push('\\s*');
          if (/[a-z]/.test(char)) {
            parts.push(addLetterPattern(char));
          } else if (/[0-9]/.test(char)) {
            parts.push(char);
          } else {
            parts.push(escapeRegExp(char));
          }
        });
        return "(".concat(parts.join(''), ")");
      };
      updateHelpResultsSummaryText = function updateHelpResultsSummaryText() {
        var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          totalCount = _ref17.totalCount,
          visibleCount = _ref17.visibleCount,
          hasQuery = _ref17.hasQuery,
          queryText = _ref17.queryText;
        var hideAssist = function hideAssist() {
          if (!helpResultsAssist) return;
          helpResultsAssist.textContent = '';
          helpResultsAssist.setAttribute('hidden', '');
        };
        if (!helpResultsSummary) {
          hideAssist();
          return;
        }
        if (typeof totalCount === 'number' && Number.isFinite(totalCount)) {
          helpResultsSummary.dataset.totalCount = String(totalCount);
        }
        if (typeof visibleCount === 'number' && Number.isFinite(visibleCount)) {
          helpResultsSummary.dataset.visibleCount = String(visibleCount);
        }
        if (typeof hasQuery === 'boolean') {
          helpResultsSummary.dataset.hasQuery = hasQuery ? 'true' : 'false';
        }
        if (typeof queryText === 'string') {
          helpResultsSummary.dataset.query = queryText;
        }
        var storedTotal = Number(helpResultsSummary.dataset.totalCount || 0);
        if (!storedTotal) {
          helpResultsSummary.textContent = '';
          helpResultsSummary.setAttribute('hidden', '');
          hideAssist();
          return;
        }
        var storedVisible = Number(helpResultsSummary.dataset.visibleCount || 0);
        var storedHasQuery = helpResultsSummary.dataset.hasQuery === 'true';
        var storedQuery = helpResultsSummary.dataset.query || '';
        var langTexts = texts && texts[currentLang] || {};
        var fallbackTexts = texts && texts.en || {};
        var summaryText = '';
        if (storedHasQuery) {
          var template = langTexts.helpResultsSummaryFiltered || fallbackTexts.helpResultsSummaryFiltered;
          if (template) {
            summaryText = template.replace('%1$s', storedVisible).replace('%2$s', storedTotal).replace('%3$s', storedQuery);
          } else if (storedQuery) {
            summaryText = "Showing ".concat(storedVisible, " of ").concat(storedTotal, " help topics for \u201C").concat(storedQuery, "\u201D.");
          } else {
            summaryText = "Showing ".concat(storedVisible, " of ").concat(storedTotal, " help topics.");
          }
        } else {
          var _template2 = langTexts.helpResultsSummaryAll || fallbackTexts.helpResultsSummaryAll;
          if (_template2) {
            summaryText = _template2.replace('%s', storedTotal);
          } else {
            summaryText = "All ".concat(storedTotal, " help topics are shown.");
          }
        }
        helpResultsSummary.textContent = summaryText;
        helpResultsSummary.removeAttribute('hidden');
        if (helpResultsAssist) {
          if (storedVisible > 0) {
            var assistTemplate = langTexts.helpResultsAssist || fallbackTexts.helpResultsAssist;
            var assistText = assistTemplate || 'Tip: Press Tab to move into the quick links, or press Enter to open the top visible topic.';
            helpResultsAssist.textContent = assistText;
            helpResultsAssist.removeAttribute('hidden');
          } else {
            hideAssist();
          }
        }
      };
      if (scope && typeof scope === 'object') {
        scope.updateHelpResultsSummaryText = updateHelpResultsSummaryText;
      }

      var filterHelp = function filterHelp() {
        if (!helpSearch) {
          if (helpResultsSummary) helpResultsSummary.setAttribute('hidden', '');
          return;
        }
        var rawQuery = helpSearch.value.trim();
        var normalizedQuery = normaliseHelpSearchText(rawQuery);
        var hasQuery = normalizedQuery.length > 0;
        var sections = Array.from(helpDialog.querySelectorAll('[data-help-section]'));
        var items = Array.from(helpDialog.querySelectorAll('.faq-item'));
        var elements = sections.concat(items);
        var totalCount = elements.length;
        var visibleCount = 0;
        var highlightPattern = hasQuery ? buildHelpHighlightPattern(normalizedQuery) : null;
        var highlightMatches = function highlightMatches(root, pattern) {
          if (!pattern || typeof document.createTreeWalker !== 'function' || typeof NodeFilter === 'undefined') {
            return;
          }
          var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
          var textNodes = [];
          while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
          }
          textNodes.forEach(function (node) {
            var text = node.textContent;
            if (!text) return;
            var regex = new RegExp(pattern, 'giu');
            var firstMatch = regex.exec(text);
            if (!firstMatch) return;
            var frag = document.createDocumentFragment();
            var lastIndex = 0;
            var match = firstMatch;
            do {
              var start = match.index;
              var end = start + match[0].length;
              if (start > lastIndex) {
                frag.appendChild(document.createTextNode(text.slice(lastIndex, start)));
              }
              var mark = document.createElement('mark');
              mark.textContent = text.slice(start, end);
              frag.appendChild(mark);
              lastIndex = end;
              if (regex.lastIndex === start) {
                regex.lastIndex++;
              }
            } while ((match = regex.exec(text)) !== null);
            if (lastIndex < text.length) {
              frag.appendChild(document.createTextNode(text.slice(lastIndex)));
            }
            if (node.parentNode) {
              node.parentNode.replaceChild(frag, node);
            }
          });
        };
        elements.forEach(function (el) {
          var isFaqItem = el.classList.contains('faq-item');
          if (!el.dataset.origHtml) {
            el.dataset.origHtml = el.innerHTML;
            if (isFaqItem) {
              el.dataset.defaultOpen = el.hasAttribute('open') ? 'true' : 'false';
            }
          } else {
            el.innerHTML = el.dataset.origHtml;
          }
          var text = normaliseHelpSearchText(el.textContent || '');
          var keywordText = normaliseHelpSearchText(el.dataset.helpKeywords || '');
          var matches = !hasQuery || text.includes(normalizedQuery) || keywordText.includes(normalizedQuery);
          if (matches) {
            if (hasQuery && highlightPattern) {
              highlightMatches(el, highlightPattern);
            }
            el.removeAttribute('hidden');
            if (isFaqItem) {
              if (hasQuery) {
                el.setAttribute('open', '');
              } else if (el.dataset.defaultOpen === 'true') {
                el.setAttribute('open', '');
              } else {
                el.removeAttribute('open');
              }
            }
            visibleCount += 1;
          } else {
            el.setAttribute('hidden', '');
            if (isFaqItem) {
              el.removeAttribute('open');
            }
          }
        });
        if (typeof updateHelpResultsSummaryText === 'function') {
          updateHelpResultsSummaryText({
            totalCount: totalCount,
            visibleCount: visibleCount,
            hasQuery: hasQuery,
            queryText: rawQuery || normalizedQuery
          });
        }
        if (helpNoResults) {
          if (visibleCount > 0) {
            helpNoResults.setAttribute('hidden', '');
          } else {
            helpNoResults.removeAttribute('hidden');
          }
        }
        if (helpSearchClear) {
          if (hasQuery) {
            helpSearchClear.removeAttribute('hidden');
          } else {
            helpSearchClear.setAttribute('hidden', '');
          }
        }
        syncHelpQuickLinksVisibility();
      };
      var openHelp = function openHelp() {
        closeSideMenu();
        helpDialog.removeAttribute('hidden');
        openDialog(helpDialog);
        if (helpSearch) {
          helpSearch.value = '';
          filterHelp();
          if (helpQuickLinksList) {
            helpQuickLinksList.querySelectorAll('.help-quick-link.active').forEach(function (btn) {
              return btn.classList.remove('active');
            });
          }
          if (helpContent) {
            helpContent.scrollTop = 0;
          }
          helpSearch.focus();
        } else {
          try {
            helpDialog.focus({
              preventScroll: true
            });
          } catch (_unused1) {
            helpDialog.focus();
          }
        }
      };
      var closeHelp = function closeHelp() {
        var returnFocusEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : helpButton;
        closeDialog(helpDialog);
        helpDialog.setAttribute('hidden', '');
        if (returnFocusEl && typeof returnFocusEl.focus === 'function') {
          try {
            returnFocusEl.focus({
              preventScroll: true
            });
          } catch (_unused10) {
            returnFocusEl.focus();
          }
        }
      };
      var toggleHelp = function toggleHelp() {
        if (!isDialogOpen(helpDialog)) {
          openHelp();
        } else {
          closeHelp();
        }
      };
      var hoverHelpActive = false;
      var hoverHelpTooltip;
      var hoverHelpCurrentTarget = null;
      var hoverHelpHighlightedTarget = null;
      var hoverHelpPointerClientX = null;
      var hoverHelpPointerClientY = null;
      var hoverHelpStatus = null;
      var hoverHelpStatusHeading = null;
      var hoverHelpStatusBody = null;
      var hoverHelpStatusShortcuts = null;
      var hoverHelpStatusShortcutsHeading = null;
      var hoverHelpStatusShortcutsList = null;
      var hoverHelpStatusHint = null;
      var parseHoverHelpSelectorList = function parseHoverHelpSelectorList(value) {
        if (typeof value !== 'string') return [];
        return value.split(',').map(function (selector) {
          return selector.trim();
        }).filter(Boolean);
      };
      var parseHoverHelpIdList = function parseHoverHelpIdList(value) {
        if (typeof value !== 'string') return [];
        return value.split(/\s+/).map(function (id) {
          return id.trim();
        }).filter(Boolean);
      };
      var getHoverHelpReferenceElements = function getHoverHelpReferenceElements(element) {
        var _document;
        if (!element || !((_document = document) !== null && _document !== void 0 && _document.querySelector)) return [];
        var references = [];
        var seen = new Set();
        var addCandidate = function addCandidate(candidate) {
          if (!candidate || !(candidate instanceof Element)) return;
          if (candidate === element) return;
          if (seen.has(candidate)) return;
          seen.add(candidate);
          references.push(candidate);
        };
        var addFromSelectors = function addFromSelectors(raw) {
          parseHoverHelpSelectorList(raw).forEach(function (selector) {
            try {
              var match = document.querySelector(selector);
              addCandidate(match);
            } catch (_unused11) {}
          });
        };
        var addFromIds = function addFromIds(raw) {
          parseHoverHelpIdList(raw).forEach(function (id) {
            var match = document.getElementById(id);
            addCandidate(match);
          });
        };
        addFromSelectors(element.getAttribute('data-hover-help-target'));
        addFromSelectors(element.getAttribute('data-hover-help-source'));
        if (!element.hasAttribute('data-hover-help-skip-help-target')) {
          addFromSelectors(element.getAttribute('data-help-target'));
        }
        addFromIds(element.getAttribute('data-hover-help-targets'));
        return references;
      };
      var HOVER_HELP_TARGET_SELECTOR = '[data-help], [aria-label], [title], [aria-labelledby], [alt], [aria-describedby]';
      var findHoverHelpTarget = function findHoverHelpTarget(start) {
        if (!start) return null;
        var el = start.closest(HOVER_HELP_TARGET_SELECTOR);
        if (!el || el.tagName === 'SECTION') {
          return null;
        }
        return el;
      };
      var HOVER_HELP_SHORTCUT_TOKEN_MAP = {
        control: 'Ctrl',
        ctrl: 'Ctrl',
        meta: 'Cmd',
        cmd: 'Cmd',
        command: 'Cmd',
        option: 'Alt',
        alt: 'Alt',
        shift: 'Shift',
        enter: 'Enter',
        return: 'Enter',
        escape: 'Esc',
        esc: 'Esc',
        space: 'Space',
        spacebar: 'Space',
        tab: 'Tab',
        slash: '/',
        question: '?',
        backslash: '\\',
        minus: '−',
        dash: '−',
        plus: '+',
        period: '.',
        comma: ',',
        semicolon: ';',
        colon: ':',
        arrowup: '↑',
        arrowdown: '↓',
        arrowleft: '←',
        arrowright: '→',
        pageup: 'Page Up',
        pagedown: 'Page Down',
        home: 'Home',
        end: 'End',
        delete: 'Delete',
        backspace: 'Backspace',
        insert: 'Insert'
      };
      var formatHoverHelpShortcutToken = function formatHoverHelpShortcutToken(token) {
        if (typeof token !== 'string') return '';
        var clean = token.trim();
        if (!clean) return '';
        var lower = clean.toLowerCase();
        if (HOVER_HELP_SHORTCUT_TOKEN_MAP[lower]) {
          return HOVER_HELP_SHORTCUT_TOKEN_MAP[lower];
        }
        if (/^f\d{1,2}$/i.test(clean)) {
          return clean.toUpperCase();
        }
        if (/^key[a-z]$/i.test(clean)) {
          return clean.slice(3).toUpperCase();
        }
        if (/^digit\d$/i.test(clean)) {
          return clean.slice(5);
        }
        if (/^numpad\d$/i.test(clean)) {
          return "Numpad ".concat(clean.slice(6));
        }
        if (/^numpad(add|subtract|multiply|divide)$/i.test(lower)) {
          var op = lower.slice(6);
          var symbolMap = {
            add: '+',
            subtract: '−',
            multiply: '×',
            divide: '÷'
          };
          return "Numpad ".concat(symbolMap[op] || op);
        }
        if (clean.length === 1) {
          return clean.toUpperCase();
        }
        return clean.replace(/^[a-z]/, function (c) {
          return c.toUpperCase();
        });
      };
      var formatHoverHelpShortcut = function formatHoverHelpShortcut(shortcut) {
        if (typeof shortcut !== 'string') return '';
        var parts = shortcut.split('+').map(formatHoverHelpShortcutToken).filter(Boolean);
        if (!parts.length) {
          return '';
        }
        return parts.join(' + ');
      };
      var splitHoverHelpShortcutList = function splitHoverHelpShortcutList(value) {
        if (typeof value !== 'string') return [];
        return value.split(/[;,\n\u2022\u2027\u00b7]+/).map(function (part) {
          return part.trim();
        }).filter(Boolean);
      };
      var gatherHoverHelpShortcuts = function gatherHoverHelpShortcuts(element) {
        if (!element) return [];
        var shortcuts = [];
        var attrValues = [element.getAttribute('data-shortcut'), element.getAttribute('data-shortcuts'), element.getAttribute('data-help-shortcut'), element.getAttribute('data-help-shortcuts')];
        attrValues.forEach(function (value) {
          splitHoverHelpShortcutList(value).forEach(function (item) {
            if (item) shortcuts.push(item);
          });
        });
        var ariaShortcuts = element.getAttribute('aria-keyshortcuts');
        if (ariaShortcuts) {
          ariaShortcuts.split(/\s+/).map(formatHoverHelpShortcut).filter(Boolean).forEach(function (item) {
            return shortcuts.push(item);
          });
        }
        return shortcuts;
      };
      var getHoverHelpLocaleValue = function getHoverHelpLocaleValue(key) {
        if (!texts || (typeof texts === "undefined" ? "undefined" : _typeof(texts)) !== 'object') return '';
        var fallback = _typeof(texts.en) === 'object' ? texts.en[key] : '';
        if (typeof currentLang === 'string' && texts[currentLang]) {
          var value = texts[currentLang][key];
          if (typeof value === 'string' && value.trim()) {
            return value;
          }
        }
        return typeof fallback === 'string' ? fallback : '';
      };
      var getHoverHelpFallbackKeys = function getHoverHelpFallbackKeys(element) {
        var _element$matches, _element$matches2, _element$matches3;
        if (!element) return [];
        var keys = [];
        var push = function push(key) {
          if (!key || keys.includes(key)) return;
          keys.push(key);
        };
        var role = (element.getAttribute('role') || '').toLowerCase();
        var tagName = element.tagName ? element.tagName.toLowerCase() : '';
        var typeAttr = (element.getAttribute('type') || '').toLowerCase();
        var elementType = typeof element.type === 'string' ? element.type.toLowerCase() : '';
        var inputType = typeAttr || elementType;
        var ariaHasPopup = (element.getAttribute('aria-haspopup') || '').toLowerCase();
        var ariaPressed = (element.getAttribute('aria-pressed') || '').toLowerCase();
        if (role === 'dialog' || role === 'alertdialog') {
          push('hoverHelpFallbackDialog');
        }
        if (role === 'alertdialog') {
          push('hoverHelpFallbackAlert');
        }
        if (role === 'tablist') {
          push('hoverHelpFallbackTablist');
        }
        if (role === 'tab') {
          push('hoverHelpFallbackTab');
        }
        if (role === 'menu') {
          push('hoverHelpFallbackMenu');
        }
        if (role === 'menuitem') {
          push('hoverHelpFallbackMenu');
        }
        if (role === 'listbox') {
          push('hoverHelpFallbackSelect');
        }
        if (role === 'link') {
          push('hoverHelpFallbackLink');
        }
        if (role === 'progressbar') {
          push('hoverHelpFallbackProgress');
        }
        if (role === 'status') {
          push('hoverHelpFallbackStatus');
        }
        if (role === 'alert') {
          push('hoverHelpFallbackAlert');
        }
        if (role === 'switch') {
          push('hoverHelpFallbackSwitch');
        }
        if (role === 'checkbox' || role === 'menuitemcheckbox') {
          push('hoverHelpFallbackCheckbox');
        }
        if (role === 'radio' || role === 'menuitemradio') {
          push('hoverHelpFallbackRadio');
        }
        if (role === 'slider') {
          push('hoverHelpFallbackSlider');
        }
        if (role === 'spinbutton') {
          push('hoverHelpFallbackNumberInput');
        }
        if (role === 'textbox' || role === 'searchbox') {
          push('hoverHelpFallbackTextInput');
        }
        if (role === 'combobox') {
          push('hoverHelpFallbackSelect');
        }
        if (tagName === 'button' || role === 'button' || (_element$matches = element.matches) !== null && _element$matches !== void 0 && _element$matches.call(element, "input[type='button']") || (_element$matches2 = element.matches) !== null && _element$matches2 !== void 0 && _element$matches2.call(element, "input[type='submit']") || (_element$matches3 = element.matches) !== null && _element$matches3 !== void 0 && _element$matches3.call(element, "input[type='reset']")) {
          if (ariaHasPopup && ariaHasPopup !== 'false') {
            push('hoverHelpFallbackMenuButton');
          }
          if (ariaPressed === 'true' || ariaPressed === 'mixed' || ariaPressed === 'false') {
            push('hoverHelpFallbackToggleButton');
          }
          push('hoverHelpFallbackButton');
        } else if (tagName === 'a' && element.hasAttribute('href')) {
          push('hoverHelpFallbackLink');
        } else if (tagName === 'select') {
          push('hoverHelpFallbackSelect');
        } else if (tagName === 'textarea') {
          push('hoverHelpFallbackTextarea');
        } else if (tagName === 'details') {
          push('hoverHelpFallbackDetails');
        } else if (tagName === 'input') {
          switch (inputType) {
            case 'checkbox':
              push('hoverHelpFallbackCheckbox');
              break;
            case 'radio':
              push('hoverHelpFallbackRadio');
              break;
            case 'range':
              push('hoverHelpFallbackSlider');
              break;
            case 'number':
              push('hoverHelpFallbackNumberInput');
              break;
            case 'file':
              push('hoverHelpFallbackFileInput');
              break;
            case 'color':
              push('hoverHelpFallbackColorInput');
              break;
            default:
              push('hoverHelpFallbackTextInput');
              break;
          }
        } else if (element.isContentEditable) {
          push('hoverHelpFallbackTextarea');
        }
        push('hoverHelpFallbackGeneric');
        return keys;
      };
      var collectHoverHelpContent = function collectHoverHelpContent(el) {
        if (!el) {
          return {
            label: '',
            details: []
          };
        }
        var seen = new Set();
        var labelParts = [];
        var detailParts = [];
        var shortcutParts = [];
        var addUnique = function addUnique(value, bucket) {
          if (typeof value !== 'string') return;
          var trimmed = value.replace(/\s+/g, ' ').trim();
          if (!trimmed || seen.has(trimmed)) return;
          seen.add(trimmed);
          bucket.push(trimmed);
        };
        var addLabelText = function addLabelText(value) {
          return addUnique(value, labelParts);
        };
        var addDetailText = function addDetailText(value) {
          return addUnique(value, detailParts);
        };
        var addShortcutText = function addShortcutText(value) {
          return addUnique(value, shortcutParts);
        };
        var addTextFromElement = function addTextFromElement(element) {
          var _ref18 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref18$includeTextCon = _ref18.includeTextContent,
            includeTextContent = _ref18$includeTextCon === void 0 ? false : _ref18$includeTextCon,
            _ref18$preferTextAsLa = _ref18.preferTextAsLabel,
            preferTextAsLabel = _ref18$preferTextAsLa === void 0 ? false : _ref18$preferTextAsLa;
          if (!element) return;
          addDetailText(element.getAttribute('data-help'));
          addDetailText(element.getAttribute('aria-description'));
          addDetailText(element.getAttribute('title'));
          addDetailText(element.getAttribute('aria-placeholder'));
          addLabelText(element.getAttribute('aria-label'));
          addLabelText(element.getAttribute('alt'));
          var placeholderAttr = element.getAttribute('placeholder');
          addDetailText(placeholderAttr);
          if (element.placeholder && element.placeholder !== placeholderAttr) {
            addDetailText(element.placeholder);
          }
          var roleDescription = element.getAttribute('aria-roledescription');
          if (roleDescription) {
            if (preferTextAsLabel) {
              addLabelText(roleDescription);
            } else {
              addDetailText(roleDescription);
            }
          }
          gatherHoverHelpShortcuts(element).forEach(addShortcutText);
          if (includeTextContent) {
            var text = element.textContent;
            if (preferTextAsLabel) {
              addLabelText(text);
            } else {
              addDetailText(text);
            }
          }
        };
        var applyFromIds = function applyFromIds(ids) {
          var _ref19 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref19$preferTextAsLa = _ref19.preferTextAsLabel,
            preferTextAsLabel = _ref19$preferTextAsLa === void 0 ? false : _ref19$preferTextAsLa;
          if (!ids) return;
          ids.split(/\s+/).map(function (id) {
            return id.trim();
          }).filter(Boolean).forEach(function (id) {
            var ref = document.getElementById(id);
            if (!ref) return;
            addTextFromElement(ref, {
              includeTextContent: true,
              preferTextAsLabel: preferTextAsLabel
            });
          });
        };
        var visitedElements = new Set();
        var queue = [{
          element: el,
          preferTextAsLabel: true,
          includeTextContent: false
        }];
        while (queue.length) {
          var _queue$shift = queue.shift(),
            current = _queue$shift.element,
            preferTextAsLabel = _queue$shift.preferTextAsLabel,
            includeTextContent = _queue$shift.includeTextContent;
          if (!current || visitedElements.has(current)) {
            continue;
          }
          visitedElements.add(current);
          addTextFromElement(current, {
            includeTextContent: includeTextContent,
            preferTextAsLabel: preferTextAsLabel
          });
          applyFromIds(current.getAttribute('aria-labelledby'), {
            preferTextAsLabel: true
          });
          applyFromIds(current.getAttribute('aria-describedby'));
          applyFromIds(current.getAttribute('aria-details'));
          applyFromIds(current.getAttribute('aria-errormessage'));
          applyFromIds(current.getAttribute('aria-controls'));
          findAssociatedLabelElements(current).forEach(function (labelEl) {
            addTextFromElement(labelEl, {
              includeTextContent: true,
              preferTextAsLabel: true
            });
          });
          getHoverHelpReferenceElements(current).forEach(function (proxyEl) {
            queue.push({
              element: proxyEl,
              preferTextAsLabel: false,
              includeTextContent: true
            });
          });
        }
        if (!labelParts.length) {
          addLabelText(el.textContent);
        }
        if (!detailParts.length && labelParts.length > 1) {
          labelParts.slice(1).forEach(function (text) {
            return addDetailText(text);
          });
        }
        if (!detailParts.length) {
          var fallbackKeys = getHoverHelpFallbackKeys(el);
          var addedFallback = false;
          fallbackKeys.forEach(function (key) {
            var text = getHoverHelpLocaleValue(key);
            if (!text) return;
            addedFallback = true;
            addDetailText(text);
          });
          if (!addedFallback) {
            addDetailText(getHoverHelpLocaleValue('hoverHelpFallbackGeneric'));
          }
        }
        return {
          label: labelParts[0] || '',
          details: detailParts,
          shortcuts: shortcutParts
        };
      };
      var clearHoverHelpHighlight = function clearHoverHelpHighlight() {
        if (hoverHelpHighlightedTarget && hoverHelpHighlightedTarget.classList) {
          hoverHelpHighlightedTarget.classList.remove('hover-help-highlight');
        }
        hoverHelpHighlightedTarget = null;
      };
      var setHoverHelpHighlight = function setHoverHelpHighlight(target) {
        if (hoverHelpHighlightedTarget === target) return;
        clearHoverHelpHighlight();
        if (target && target.classList && typeof target.classList.add === 'function') {
          target.classList.add('hover-help-highlight');
          hoverHelpHighlightedTarget = target;
        }
      };
      var usingPointerAnchor = function usingPointerAnchor() {
        return hoverHelpActive && hoverHelpTooltip && typeof hoverHelpPointerClientX === 'number' && typeof hoverHelpPointerClientY === 'number' && Number.isFinite(hoverHelpPointerClientX) && Number.isFinite(hoverHelpPointerClientY);
      };
      var positionHoverHelpTooltip = function positionHoverHelpTooltip(target) {
        if (!hoverHelpTooltip || !target) return;
        var rect = target.getBoundingClientRect();
        var docEl = document.documentElement;
        var viewportWidth = Math.max((docEl === null || docEl === void 0 ? void 0 : docEl.clientWidth) || 0, window.innerWidth || 0);
        var viewportHeight = Math.max((docEl === null || docEl === void 0 ? void 0 : docEl.clientHeight) || 0, window.innerHeight || 0);
        var scrollX = window.scrollX || window.pageXOffset || 0;
        var scrollY = window.scrollY || window.pageYOffset || 0;
        var horizontalOffset = 12;
        var verticalOffset = 10;
        var viewportPadding = 8;
        var safeLeft = Number.isFinite(rect.left) ? rect.left : 0;
        var safeRight = Number.isFinite(rect.right) ? rect.right : safeLeft + (rect.width || 0);
        var safeTop = Number.isFinite(rect.top) ? rect.top : 0;
        var safeBottom = Number.isFinite(rect.bottom) ? rect.bottom : safeTop;
        var tooltipRect = hoverHelpTooltip.getBoundingClientRect();
        var tooltipWidth = tooltipRect.width || hoverHelpTooltip.offsetWidth || 0;
        var tooltipHeight = tooltipRect.height || hoverHelpTooltip.offsetHeight || 0;
        var pointerAnchored = usingPointerAnchor();
        var pointerClientX = function () {
          if (pointerAnchored && typeof hoverHelpPointerClientX === 'number') {
            return hoverHelpPointerClientX;
          }
          if (Number.isFinite(rect.left)) {
            return safeLeft + (rect.width || 0) / 2;
          }
          return viewportWidth / 2;
        }();
        var preferLeftSide = function () {
          if (tooltipWidth) {
            var requiredSpace = tooltipWidth + horizontalOffset + viewportPadding;
            var availableRight = viewportWidth - pointerClientX;
            var availableLeft = pointerClientX;
            if (availableRight < requiredSpace && availableLeft >= requiredSpace) {
              return true;
            }
          }
          var rightSideThreshold = viewportWidth * 0.6;
          return pointerClientX >= rightSideThreshold;
        }();
        var top = pointerAnchored ? hoverHelpPointerClientY + scrollY + verticalOffset : safeBottom + scrollY + verticalOffset;
        var left;
        if (pointerAnchored) {
          left = hoverHelpPointerClientX + scrollX + horizontalOffset;
          if (preferLeftSide) {
            left = hoverHelpPointerClientX + scrollX - tooltipWidth - horizontalOffset;
          }
        } else {
          var baseAnchor = preferLeftSide ? safeRight : safeLeft;
          left = baseAnchor + scrollX + (preferLeftSide ? -horizontalOffset : horizontalOffset);
          if (preferLeftSide) {
            left -= tooltipWidth;
          }
        }
        if (tooltipWidth) {
          var viewportRightLimit = scrollX + viewportWidth - viewportPadding;
          var defaultRight = left + tooltipWidth;
          if (defaultRight > viewportRightLimit) {
            if (pointerAnchored) {
              left = hoverHelpPointerClientX + scrollX - tooltipWidth - horizontalOffset;
            } else {
              left = safeRight + scrollX - tooltipWidth - horizontalOffset;
            }
          } else if (left < scrollX + viewportPadding && preferLeftSide) {
            left = Math.max(left, scrollX + viewportPadding);
          }
          var minLeft = scrollX + viewportPadding;
          var maxLeft = scrollX + Math.max(viewportWidth - tooltipWidth - viewportPadding, viewportPadding);
          if (left < minLeft) {
            left = minLeft;
          } else if (left > maxLeft) {
            left = maxLeft;
          }
        }
        if (tooltipHeight) {
          var minTop = scrollY + viewportPadding;
          var maxTop = scrollY + Math.max(viewportHeight - tooltipHeight - viewportPadding, viewportPadding);
          if (top > maxTop) {
            var aboveTop = pointerAnchored ? hoverHelpPointerClientY + scrollY - tooltipHeight - verticalOffset : safeTop + scrollY - tooltipHeight - verticalOffset;
            if (aboveTop >= minTop) {
              top = aboveTop;
            } else {
              top = Math.min(Math.max(top, minTop), maxTop);
            }
          } else if (top < minTop) {
            top = minTop;
          }
        }
        hoverHelpTooltip.style.top = "".concat(top, "px");
        hoverHelpTooltip.style.left = "".concat(left, "px");
      };
      var hideHoverHelpTooltip = function hideHoverHelpTooltip() {
        if (!hoverHelpTooltip) return;
        hoverHelpTooltip.setAttribute('hidden', '');
        hoverHelpTooltip.style.removeProperty('visibility');
        hoverHelpPointerClientX = null;
        hoverHelpPointerClientY = null;
        clearHoverHelpHighlight();
      };
      var createHoverHelpDetailsFragment = function createHoverHelpDetailsFragment(detailText) {
        var fragment = document.createDocumentFragment();
        if (!Array.isArray(detailText) || detailText.length === 0) {
          return fragment;
        }
        var addParagraph = function addParagraph(text) {
          if (!text) return;
          var paragraph = document.createElement('p');
          paragraph.textContent = text;
          fragment.appendChild(paragraph);
        };
        var listBuffer = [];
        var flushList = function flushList() {
          if (!listBuffer.length) return;
          var list = document.createElement('ul');
          listBuffer.forEach(function (itemText) {
            var item = document.createElement('li');
            item.textContent = itemText;
            list.appendChild(item);
          });
          fragment.appendChild(list);
          listBuffer = [];
        };
        var addListItem = function addListItem(text) {
          if (!text) return;
          listBuffer.push(text);
        };
        detailText.forEach(function (part) {
          if (typeof part !== 'string') return;
          var normalisedPart = part.replace(/\r\n/g, '\n').replace(/\s*[•‣▪◦⋅·]\s*/g, '\n• ');
          var lines = normalisedPart.split(/\n+/).map(function (line) {
            return line.trim();
          }).filter(Boolean);
          lines.forEach(function (line) {
            var bulletMatch = line.match(/^[•\-–—]\s*(.+)$/);
            if (bulletMatch) {
              addListItem(bulletMatch[1].trim());
              return;
            }
            flushList();
            addParagraph(line);
          });
          flushList();
        });
        flushList();
        if (!fragment.childElementCount) {
          addParagraph(detailText.filter(Boolean).join(' '));
        }
        return fragment;
      };
      var removeHoverHelpStatus = function removeHoverHelpStatus() {
        if (hoverHelpStatus) {
          hoverHelpStatus.remove();
        }
        hoverHelpStatus = null;
        hoverHelpStatusHeading = null;
        hoverHelpStatusBody = null;
        hoverHelpStatusShortcuts = null;
        hoverHelpStatusShortcutsHeading = null;
        hoverHelpStatusShortcutsList = null;
        hoverHelpStatusHint = null;
      };
      var setElementHidden = function setElementHidden(element, hidden) {
        if (!element) return;
        if (hidden) {
          element.setAttribute('hidden', '');
        } else {
          element.removeAttribute('hidden');
        }
      };
      var ensureHoverHelpStatus = function ensureHoverHelpStatus() {
        var _document2;
        if (hoverHelpStatus && hoverHelpStatus.isConnected) {
          return hoverHelpStatus;
        }
        var body = (_document2 = document) === null || _document2 === void 0 ? void 0 : _document2.body;
        if (!body) {
          return null;
        }
        removeHoverHelpStatus();
        hoverHelpStatus = document.createElement('div');
        hoverHelpStatus.id = 'hoverHelpStatus';
        hoverHelpStatus.setAttribute('role', 'status');
        hoverHelpStatus.setAttribute('aria-live', 'polite');
        hoverHelpStatus.setAttribute('aria-atomic', 'true');
        hoverHelpStatusHeading = document.createElement('div');
        hoverHelpStatusHeading.className = 'hover-help-status-heading';
        hoverHelpStatus.appendChild(hoverHelpStatusHeading);
        hoverHelpStatusBody = document.createElement('div');
        hoverHelpStatusBody.className = 'hover-help-status-body';
        hoverHelpStatus.appendChild(hoverHelpStatusBody);
        hoverHelpStatusShortcuts = document.createElement('div');
        hoverHelpStatusShortcuts.className = 'hover-help-status-shortcuts';
        hoverHelpStatusShortcutsHeading = document.createElement('div');
        hoverHelpStatusShortcutsHeading.className = 'hover-help-status-shortcuts-heading';
        hoverHelpStatusShortcuts.appendChild(hoverHelpStatusShortcutsHeading);
        hoverHelpStatusShortcutsList = document.createElement('ul');
        hoverHelpStatusShortcutsList.className = 'hover-help-status-shortcuts-list';
        hoverHelpStatusShortcuts.appendChild(hoverHelpStatusShortcutsList);
        hoverHelpStatus.appendChild(hoverHelpStatusShortcuts);
        setElementHidden(hoverHelpStatusShortcuts, true);
        hoverHelpStatusHint = document.createElement('div');
        hoverHelpStatusHint.className = 'hover-help-status-hint';
        hoverHelpStatus.appendChild(hoverHelpStatusHint);
        body.appendChild(hoverHelpStatus);
        return hoverHelpStatus;
      };
      var updateHoverHelpStatus = function updateHoverHelpStatus() {
        var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref20$heading = _ref20.heading,
          heading = _ref20$heading === void 0 ? '' : _ref20$heading,
          _ref20$details = _ref20.details,
          details = _ref20$details === void 0 ? [] : _ref20$details,
          _ref20$shortcuts = _ref20.shortcuts,
          shortcuts = _ref20$shortcuts === void 0 ? [] : _ref20$shortcuts,
          hint = _ref20.hint;
        var statusEl = ensureHoverHelpStatus();
        if (!statusEl) {
          return;
        }
        if (hoverHelpStatusHeading) {
          hoverHelpStatusHeading.textContent = heading || '';
          setElementHidden(hoverHelpStatusHeading, !heading);
        }
        if (hoverHelpStatusBody) {
          hoverHelpStatusBody.textContent = '';
          var detailList = Array.isArray(details) ? details.filter(Boolean) : [];
          if (detailList.length) {
            hoverHelpStatusBody.appendChild(createHoverHelpDetailsFragment(detailList));
            setElementHidden(hoverHelpStatusBody, false);
          } else {
            setElementHidden(hoverHelpStatusBody, true);
          }
        }
        if (hoverHelpStatusShortcuts && hoverHelpStatusShortcutsList) {
          hoverHelpStatusShortcutsList.textContent = '';
          var shortcutItems = Array.isArray(shortcuts) ? shortcuts.filter(Boolean) : [];
          if (shortcutItems.length) {
            var headingText = getHoverHelpLocaleValue('hoverHelpShortcutsHeading');
            if (hoverHelpStatusShortcutsHeading) {
              hoverHelpStatusShortcutsHeading.textContent = headingText || '';
              setElementHidden(hoverHelpStatusShortcutsHeading, !headingText);
            }
            shortcutItems.forEach(function (text) {
              var item = document.createElement('li');
              item.textContent = text;
              hoverHelpStatusShortcutsList.appendChild(item);
            });
            setElementHidden(hoverHelpStatusShortcuts, false);
          } else {
            setElementHidden(hoverHelpStatusShortcuts, true);
          }
        }
        if (hoverHelpStatusHint) {
          var resolvedHint = typeof hint === 'string' && hint.trim() ? hint : getHoverHelpLocaleValue('hoverHelpExitHint');
          hoverHelpStatusHint.textContent = resolvedHint || '';
          setElementHidden(hoverHelpStatusHint, !resolvedHint);
        }
      };
      var renderHoverHelpStatusIntro = function renderHoverHelpStatusIntro() {
        var heading = getHoverHelpLocaleValue('hoverHelpButtonLabel');
        var description = getHoverHelpLocaleValue('hoverHelpButtonHelp');
        var details = description ? [description] : [];
        updateHoverHelpStatus({
          heading: heading,
          details: details
        });
      };
      var renderHoverHelpStatusForTarget = function renderHoverHelpStatusForTarget(label, detailText, shortcutList) {
        var heading = label && label.trim() ? label.trim() : getHoverHelpLocaleValue('hoverHelpButtonLabel');
        var details = Array.isArray(detailText) ? detailText.filter(Boolean) : [];
        var resolvedDetails = details.length ? details : [getHoverHelpLocaleValue('hoverHelpFallbackGeneric')];
        var shortcuts = Array.isArray(shortcutList) ? shortcutList.filter(Boolean) : [];
        updateHoverHelpStatus({
          heading: heading,
          details: resolvedDetails,
          shortcuts: shortcuts
        });
      };
      var updateHoverHelpTooltip = function updateHoverHelpTooltip(target) {
        hoverHelpCurrentTarget = target || null;
        setHoverHelpHighlight(target || null);
        if (!hoverHelpActive || !hoverHelpTooltip || !target) {
          hideHoverHelpTooltip();
          if (hoverHelpActive) {
            renderHoverHelpStatusIntro();
          }
          return;
        }
        var _collectHoverHelpCont = collectHoverHelpContent(target),
          label = _collectHoverHelpCont.label,
          details = _collectHoverHelpCont.details,
          shortcuts = _collectHoverHelpCont.shortcuts;
        var hasLabel = typeof label === 'string' && label.trim().length > 0;
        var detailText = Array.isArray(details) ? details.filter(Boolean) : [];
        var shortcutList = Array.isArray(shortcuts) ? shortcuts.filter(Boolean) : [];
        if (!hasLabel && detailText.length === 0 && shortcutList.length === 0) {
          hideHoverHelpTooltip();
          renderHoverHelpStatusIntro();
          return;
        }
        hoverHelpTooltip.textContent = '';
        if (hasLabel) {
          var titleEl = document.createElement('div');
          titleEl.className = 'hover-help-heading';
          titleEl.textContent = label.trim();
          hoverHelpTooltip.appendChild(titleEl);
        }
        if (detailText.length) {
          var bodyEl = document.createElement('div');
          bodyEl.className = 'hover-help-details';
          bodyEl.appendChild(createHoverHelpDetailsFragment(detailText));
          hoverHelpTooltip.appendChild(bodyEl);
        }
        if (shortcutList.length) {
          var shortcutsWrapper = document.createElement('div');
          shortcutsWrapper.className = 'hover-help-shortcuts';
          var headingText = getHoverHelpLocaleValue('hoverHelpShortcutsHeading');
          if (headingText) {
            var headingEl = document.createElement('div');
            headingEl.className = 'hover-help-shortcuts-heading';
            headingEl.textContent = headingText;
            shortcutsWrapper.appendChild(headingEl);
          }
          var listEl = document.createElement('ul');
          listEl.className = 'hover-help-shortcuts-list';
          shortcutList.forEach(function (shortcutText) {
            if (!shortcutText) return;
            var item = document.createElement('li');
            item.className = 'hover-help-shortcut';
            item.textContent = shortcutText;
            listEl.appendChild(item);
          });
          if (listEl.childElementCount) {
            shortcutsWrapper.appendChild(listEl);
            hoverHelpTooltip.appendChild(shortcutsWrapper);
          }
        }
        var wasHidden = hoverHelpTooltip.hasAttribute('hidden');
        if (wasHidden) {
          hoverHelpTooltip.style.visibility = 'hidden';
          hoverHelpTooltip.removeAttribute('hidden');
        }
        positionHoverHelpTooltip(target);
        if (wasHidden) {
          hoverHelpTooltip.style.removeProperty('visibility');
        }
        hoverHelpTooltip.removeAttribute('hidden');
        renderHoverHelpStatusForTarget(hasLabel ? label : '', detailText, shortcutList);
      };
      var canInteractDuringHoverHelp = function canInteractDuringHoverHelp(target) {
        if (!hoverHelpActive || !target) return false;
        return !!target.closest('[data-allow-hover-help], #settingsButton, #settingsDialog');
      };
      var stopHoverHelp = function stopHoverHelp() {
        hoverHelpActive = false;
        hoverHelpCurrentTarget = null;
        if (hoverHelpTooltip) {
          hoverHelpTooltip.remove();
          hoverHelpTooltip = null;
        }
        clearHoverHelpHighlight();
        document.body.style.cursor = '';
        document.body.classList.remove('hover-help-active');
        removeHoverHelpStatus();
      };
      var startHoverHelp = function startHoverHelp() {
        hoverHelpActive = true;
        closeHelp();
        document.body.style.cursor = 'help';
        document.body.classList.add('hover-help-active');
        clearHoverHelpHighlight();
        hoverHelpTooltip = document.createElement('div');
        hoverHelpTooltip.id = 'hoverHelpTooltip';
        hoverHelpTooltip.setAttribute('role', 'tooltip');
        hoverHelpTooltip.setAttribute('hidden', '');
        document.body.appendChild(hoverHelpTooltip);
        renderHoverHelpStatusIntro();
      };
      var refreshTooltipPosition = function refreshTooltipPosition() {
        if (hoverHelpActive && hoverHelpTooltip && hoverHelpCurrentTarget) {
          positionHoverHelpTooltip(hoverHelpCurrentTarget);
        }
      };
      document.addEventListener('mouseover', function (e) {
        if (!hoverHelpActive || !hoverHelpTooltip) return;
        if (typeof (e === null || e === void 0 ? void 0 : e.clientX) === 'number' && typeof (e === null || e === void 0 ? void 0 : e.clientY) === 'number') {
          hoverHelpPointerClientX = e.clientX;
          hoverHelpPointerClientY = e.clientY;
        }
        var target = findHoverHelpTarget(e.target);
        updateHoverHelpTooltip(target);
      });
      document.addEventListener('focusin', function (e) {
        if (!hoverHelpActive || !hoverHelpTooltip) return;
        hoverHelpPointerClientX = null;
        hoverHelpPointerClientY = null;
        var target = findHoverHelpTarget(e.target);
        updateHoverHelpTooltip(target);
      });
      document.addEventListener('focusout', function (e) {
        if (!hoverHelpActive || !hoverHelpTooltip) return;
        if (!e.relatedTarget || !findHoverHelpTarget(e.relatedTarget)) {
          hoverHelpCurrentTarget = null;
          hideHoverHelpTooltip();
        }
      });
      window.addEventListener('scroll', refreshTooltipPosition, true);
      window.addEventListener('resize', refreshTooltipPosition);
      var updatePointerPosition = function updatePointerPosition(e) {
        if (!hoverHelpActive || !hoverHelpTooltip) return;
        hoverHelpPointerClientX = e.clientX;
        hoverHelpPointerClientY = e.clientY;
        if (hoverHelpCurrentTarget) {
          positionHoverHelpTooltip(hoverHelpCurrentTarget);
        }
      };
      window.addEventListener('pointermove', updatePointerPosition, true);
      window.addEventListener('pointerdown', updatePointerPosition, true);
      document.addEventListener('mousedown', function (e) {
        if (hoverHelpActive && !canInteractDuringHoverHelp(e.target)) {
          e.preventDefault();
        }
      }, true);
      document.addEventListener('click', function (e) {
        if (!hoverHelpActive) return;
        if (canInteractDuringHoverHelp(e.target)) {
          return;
        }
        e.preventDefault();
        stopHoverHelp();
      });
      if (hoverHelpButton) {
        hoverHelpButton.addEventListener('click', function (e) {
          e.stopPropagation();
          startHoverHelp();
        });
      }
      var focusFeatureSearchInput = function focusFeatureSearchInput() {
        if (!featureSearch) return;
        var sideMenu = document.getElementById('sideMenu');
        if (sideMenu !== null && sideMenu !== void 0 && sideMenu.contains(featureSearch)) {
          openSideMenu();
        }
        if (typeof featureSearch.scrollIntoView === 'function') {
          featureSearch.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
        try {
          featureSearch.focus({
            preventScroll: true
          });
        } catch (_unused12) {
          featureSearch.focus();
        }
        if (typeof featureSearch.select === 'function') {
          featureSearch.select();
        }
        if (!featureSearch.hasAttribute('data-skip-native-picker')) {
          safeShowPicker(featureSearch);
        }
      };
      runFeatureSearch = function runFeatureSearch(query) {
        var _featureSearch;
        var rawQuery = typeof query === 'string' ? query : ((_featureSearch = featureSearch) === null || _featureSearch === void 0 ? void 0 : _featureSearch.value) || '';
        var originalNormalized = normalizeSearchValue(rawQuery);
        var value = rawQuery.trim();
        if (!value) return;
        var hasFilterHelper = typeof extractFeatureSearchFilter === 'function';
        var filterData = hasFilterHelper ? extractFeatureSearchFilter(value) : {
          filterType: null,
          queryText: value
        };
        var filterType = (filterData === null || filterData === void 0 ? void 0 : filterData.filterType) || null;
        var filteredQuery = filterType ? filterData.queryText : value;
        var normalizedFiltered = typeof filteredQuery === 'string' ? filteredQuery.trim() : '';
        var lower = value.toLowerCase();
        var isHelpSuggestion = lower.endsWith(' (help)');
        var cleanSource = isHelpSuggestion ? value.slice(0, -7).trim() : normalizedFiltered || (typeof filteredQuery === 'string' ? filteredQuery.trim() : '');
        if (filterType === 'help' && !isHelpSuggestion && !cleanSource) {
          openHelp();
          if (helpSearch) {
            helpSearch.value = '';
            filterHelp();
            helpSearch.focus();
          }
          return;
        }
        var clean = cleanSource || (filterType ? '' : value);
        var cleanKey = searchKey(clean);
        var cleanTokens = searchTokens(clean);
        var helpMatch = findBestSearchMatch(helpMap, cleanKey, cleanTokens);
        var deviceMatch = findBestSearchMatch(deviceMap, cleanKey, cleanTokens);
        var featureMatch = findBestSearchMatch(featureMap, cleanKey, cleanTokens);
        var helpScore = (helpMatch === null || helpMatch === void 0 ? void 0 : helpMatch.score) || 0;
        var deviceScore = (deviceMatch === null || deviceMatch === void 0 ? void 0 : deviceMatch.score) || 0;
        var strongSearchMatchTypes = typeof STRONG_SEARCH_MATCH_TYPES !== 'undefined' && STRONG_SEARCH_MATCH_TYPES instanceof Set ? STRONG_SEARCH_MATCH_TYPES : FALLBACK_STRONG_SEARCH_MATCH_TYPES;
        var deviceStrong = deviceMatch ? strongSearchMatchTypes.has(deviceMatch.matchType) : false;
        var filterTargetsDevices = filterType === 'device';
        var filterTargetsActions = filterType === 'action';
        var filterTargetsFeatures = filterType === 'feature';
        var filterBlocksDevices = filterTargetsFeatures || filterTargetsActions;
        var normalizedFeatureMatch = function () {
          if (!featureMatch) return null;
          var entry = featureMatch.value;
          if (!entry) return null;
          var entryType = entry.entryType || 'feature';
          if (entryType === 'device') return null;
          if (filterTargetsDevices) return null;
          if (filterTargetsFeatures && entryType !== 'feature') return null;
          if (filterTargetsActions && entryType !== 'action') return null;
          return {
            match: featureMatch,
            entryType: entryType,
            entry: entry
          };
        }();
        var fallbackFeatureMatch = featureMatch && featureMatch.value && featureMatch.value.entryType !== 'device' ? featureMatch : null;
        var featureMatchForComparison = (normalizedFeatureMatch === null || normalizedFeatureMatch === void 0 ? void 0 : normalizedFeatureMatch.match) || fallbackFeatureMatch;
        var featureScore = (featureMatchForComparison === null || featureMatchForComparison === void 0 ? void 0 : featureMatchForComparison.score) || 0;
        var featureStrong = featureMatchForComparison ? strongSearchMatchTypes.has(featureMatchForComparison.matchType) : false;
        var bestNonHelpScore = Math.max(deviceScore, featureScore);
        var hasStrongNonHelp = deviceStrong || featureStrong;
        var preferHelp = !!helpMatch && (isHelpSuggestion || filterType === 'help' || !hasStrongNonHelp && helpScore > bestNonHelpScore);
        if (!isHelpSuggestion && !preferHelp) {
          var featureMatchType = featureMatchForComparison === null || featureMatchForComparison === void 0 ? void 0 : featureMatchForComparison.matchType;
          var shouldUseDevice = !filterBlocksDevices && !!deviceMatch && (!featureMatchForComparison || deviceStrong && !featureStrong || deviceStrong === featureStrong && (deviceScore > featureScore || deviceScore === featureScore && featureMatchType !== 'exactKey')) || filterTargetsDevices && !!deviceMatch;
          if (shouldUseDevice) {
            var device = deviceMatch.value;
            if (device && device.select) {
              device.select.value = device.value;
              device.select.dispatchEvent(new Event('change', {
                bubbles: true
              }));
              if (device.label) {
                updateFeatureSearchValue(device.label, originalNormalized);
              }
              if (typeof recordFeatureSearchUsage === 'function') {
                var deviceLabel = device.label;
                if (!deviceLabel && device.select) {
                  var selectedOption = Array.from(device.select.options || []).find(function (opt) {
                    return opt.value === device.value;
                  });
                  if (selectedOption && selectedOption.textContent) {
                    deviceLabel = selectedOption.textContent.trim();
                  }
                }
                recordFeatureSearchUsage(deviceMatch.key, 'device', deviceLabel);
              }
              focusFeatureElement(device.select);
              var highlightTargets = [device.select].concat(_toConsumableArray(findAssociatedLabelElements(device.select)));
              highlightFeatureSearchTargets(highlightTargets);
              return;
            }
          }
          if (normalizedFeatureMatch) {
            var feature = normalizedFeatureMatch.entry;
            var featureEl = (feature === null || feature === void 0 ? void 0 : feature.element) || feature;
            if (featureEl) {
              var _featureEl$textConten;
              var label = (feature === null || feature === void 0 ? void 0 : feature.label) || ((_featureEl$textConten = featureEl.textContent) === null || _featureEl$textConten === void 0 ? void 0 : _featureEl$textConten.trim());
              if (label) {
                updateFeatureSearchValue(label, originalNormalized);
              }
              if (typeof recordFeatureSearchUsage === 'function') {
                var _normalizedFeatureMat;
                var type = normalizedFeatureMatch.entryType || 'feature';
                var usageKey = ((_normalizedFeatureMat = normalizedFeatureMatch.match) === null || _normalizedFeatureMat === void 0 ? void 0 : _normalizedFeatureMat.key) || (featureMatch === null || featureMatch === void 0 ? void 0 : featureMatch.key);
                recordFeatureSearchUsage(usageKey, type, label);
              }
              focusFeatureElement(featureEl);
              var _highlightTargets = [featureEl].concat(_toConsumableArray(findAssociatedLabelElements(featureEl)));
              highlightFeatureSearchTargets(_highlightTargets);
              return;
            }
          }
        }
        if (helpMatch) {
          var helpEntry = helpMatch.value || {};
          var section = helpEntry.section;
          if (typeof recordFeatureSearchUsage === 'function') {
            recordFeatureSearchUsage(helpMatch.key, 'help', helpEntry.label);
          }
          openHelp();
          if (helpSearch) {
            helpSearch.value = clean;
            filterHelp();
          }
          if (section) {
            if (section.hasAttribute('hidden')) {
              section.removeAttribute('hidden');
              if (helpNoResults) {
                helpNoResults.setAttribute('hidden', '');
              }
              syncHelpQuickLinksVisibility();
            }
            if (typeof section.scrollIntoView === 'function') {
              section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
            highlightHelpSection(section);
            var sectionHeading = section.querySelector('h3, summary, h4, h5, h6, [role="heading"]') || section.querySelector('button, a');
            if (sectionHeading) {
              highlightFeatureSearchTargets([sectionHeading]);
            } else {
              highlightFeatureSearchTargets([section]);
            }
            var quickLink = section.id ? helpQuickLinkItems.get(section.id) : null;
            if (helpQuickLinksList) {
              helpQuickLinksList.querySelectorAll('.help-quick-link.active').forEach(function (btn) {
                return btn.classList.remove('active');
              });
            }
            if (quickLink && quickLink.button) {
              quickLink.button.classList.add('active');
            }
          }
          return;
        }
        openHelp();
        if (helpSearch) {
          helpSearch.value = clean;
          filterHelp();
          highlightFeatureSearchTargets([helpSearch]);
        }
      };
      if (featureSearch) {
        var featureSearchDropdown = document.getElementById('featureSearchDropdown');
        var getDropdownOptions = function getDropdownOptions() {
          if (!featureSearchDropdown) return [];
          return Array.from(featureSearchDropdown.querySelectorAll('[role="option"]') || []);
        };
        var setActiveDropdownOption = function setActiveDropdownOption(index) {
          var options = getDropdownOptions();
          if (!options.length) return null;
          var bounded = Math.max(0, Math.min(index, options.length - 1));
          options.forEach(function (option, optIndex) {
            option.setAttribute('tabindex', optIndex === bounded ? '0' : '-1');
          });
          options[bounded].focus();
          if (featureSearchDropdown) {
            featureSearchDropdown.dataset.activeIndex = String(bounded);
          }
          return options[bounded];
        };
        var closeFeatureSearchDropdown = function closeFeatureSearchDropdown() {
          if (!featureSearchDropdown) return;
          featureSearchDropdown.dataset.open = 'false';
          featureSearchDropdown.hidden = true;
          featureSearchDropdown.setAttribute('aria-expanded', 'false');
          featureSearchDropdown.dataset.activeIndex = '';
          var container = featureSearchDropdown.closest('.feature-search');
          if (container) container.classList.remove('feature-search-open');
        };
        var openFeatureSearchDropdown = function openFeatureSearchDropdown() {
          if (!featureSearchDropdown) return;
          if (featureSearchDropdown.dataset.count === '0') {
            closeFeatureSearchDropdown();
            return;
          }
          featureSearchDropdown.dataset.open = 'true';
          featureSearchDropdown.hidden = false;
          featureSearchDropdown.setAttribute('aria-expanded', 'true');
          var container = featureSearchDropdown.closest('.feature-search');
          if (container) container.classList.add('feature-search-open');
        };
        var applyFeatureSearchSuggestion = function applyFeatureSearchSuggestion(value) {
          var _featureSearch$setSel, _featureSearch2;
          if (!featureSearch || !value) return;
          featureSearch.value = value;
          try {
            featureSearch.focus({
              preventScroll: true
            });
          } catch (_unused13) {
            featureSearch.focus();
          }
          (_featureSearch$setSel = (_featureSearch2 = featureSearch).setSelectionRange) === null || _featureSearch$setSel === void 0 || _featureSearch$setSel.call(_featureSearch2, value.length, value.length);
          updateFeatureSearchSuggestions(value);
          runFeatureSearch(value);
          closeFeatureSearchDropdown();
        };
        var handle = function handle() {
          closeFeatureSearchDropdown();
          runFeatureSearch(featureSearch.value);
        };
        featureSearch.addEventListener('change', handle);
        featureSearch.addEventListener('focus', function () {
          openFeatureSearchDropdown();
        });
        featureSearch.addEventListener('blur', function () {
          window.setTimeout(function () {
            if (!featureSearchDropdown || featureSearchDropdown.contains(document.activeElement)) {
              return;
            }
            closeFeatureSearchDropdown();
          }, 100);
        });
        featureSearch.addEventListener('input', function () {
          updateFeatureSearchSuggestions(featureSearch.value);
          openFeatureSearchDropdown();
        });
        featureSearch.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {
            handle();
          } else if (e.key === 'Escape') {
            if (featureSearch.value) {
              featureSearch.value = '';
              restoreFeatureSearchDefaults();
            }
            closeFeatureSearchDropdown();
            e.preventDefault();
          } else if (e.key === 'ArrowDown') {
            if (!featureSearchDropdown || featureSearchDropdown.dataset.count === '0') {
              return;
            }
            e.preventDefault();
            openFeatureSearchDropdown();
            var options = getDropdownOptions();
            var activeIndex = featureSearchDropdown.dataset.activeIndex;
            var nextIndex = activeIndex ? Number(activeIndex) + 1 : 0;
            setActiveDropdownOption(nextIndex >= options.length ? 0 : nextIndex);
          } else if (e.key === 'ArrowUp') {
            if (!featureSearchDropdown || featureSearchDropdown.dataset.count === '0') {
              return;
            }
            e.preventDefault();
            openFeatureSearchDropdown();
            var _options = getDropdownOptions();
            if (!_options.length) return;
            var _activeIndex = featureSearchDropdown.dataset.activeIndex;
            if (!_activeIndex) {
              setActiveDropdownOption(_options.length - 1);
            } else {
              var prevIndex = Number(_activeIndex) - 1;
              setActiveDropdownOption(prevIndex >= 0 ? prevIndex : _options.length - 1);
            }
          }
        });
        if (featureSearchDropdown) {
          featureSearchDropdown.addEventListener('mousedown', function (e) {
            var option = e.target.closest('[data-value]');
            if (option) {
              e.preventDefault();
            }
          });
          featureSearchDropdown.addEventListener('click', function (e) {
            var option = e.target.closest('[data-value]');
            if (!option) return;
            var value = option.getAttribute('data-value') || '';
            if (!value) return;
            applyFeatureSearchSuggestion(value);
          });
          featureSearchDropdown.addEventListener('keydown', function (e) {
            var options = getDropdownOptions();
            if (!options.length) return;
            var activeElement = document.activeElement;
            var currentIndex = options.indexOf(activeElement);
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              var nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0;
              setActiveDropdownOption(nextIndex >= options.length ? 0 : nextIndex);
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              var prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
              setActiveDropdownOption(prevIndex);
            } else if (e.key === 'Home') {
              e.preventDefault();
              setActiveDropdownOption(0);
            } else if (e.key === 'End') {
              e.preventDefault();
              setActiveDropdownOption(options.length - 1);
            } else if (e.key === 'Enter') {
              e.preventDefault();
              if (currentIndex >= 0 && options[currentIndex]) {
                var value = options[currentIndex].getAttribute('data-value') || '';
                if (value) {
                  applyFeatureSearchSuggestion(value);
                }
              }
            } else if (e.key === 'Escape') {
              e.preventDefault();
              closeFeatureSearchDropdown();
              focusFeatureSearchInput();
            } else if (e.key === 'Tab') {
              closeFeatureSearchDropdown();
            }
          });
          featureSearchDropdown.addEventListener('focusout', function () {
            window.setTimeout(function () {
              if (document.activeElement === featureSearch || featureSearchDropdown && featureSearchDropdown.contains(document.activeElement)) {
                return;
              }
              closeFeatureSearchDropdown();
            }, 100);
          });
        }
      }
      helpButton.addEventListener('click', toggleHelp);
      if (closeHelpBtn) closeHelpBtn.addEventListener('click', closeHelp);
      if (helpSearch) helpSearch.addEventListener('input', filterHelp);
      if (helpSearchClear) helpSearchClear.addEventListener('click', function () {
        if (helpSearch) {
          helpSearch.value = '';
          filterHelp();
          helpSearch.focus();
        }
      });
      if (scope && typeof scope === 'object') {
        scope.runFeatureSearch = runFeatureSearch;
      }

      function safeShowPicker(input) {
        if (!input || typeof input.showPicker !== 'function') return;
        try {
          input.showPicker();
        } catch (err) {
          if (err && err.name === 'NotAllowedError') return;
          console.warn('Unable to show picker', err);
        }
      }
      document.addEventListener('keydown', function (e) {
        var tag = document.activeElement.tagName;
        var isTextField = tag === 'INPUT' || tag === 'TEXTAREA';
        var key = typeof e.key === 'string' ? e.key : '';
        var lowerKey = key.toLowerCase();
        if (hoverHelpActive && e.key === 'Escape') {
          stopHoverHelp();
        } else if (e.key === 'Escape' && isDialogOpen(helpDialog)) {
          e.preventDefault();
          closeHelp();
        } else if (e.key === 'Escape' && settingsDialog && isDialogOpen(settingsDialog)) {
          e.preventDefault();
          revertSettingsPinkModeIfNeeded();
          rememberSettingsPinkModeBaseline();
          revertSettingsTemperatureUnitIfNeeded();
          rememberSettingsTemperatureUnitBaseline();
          invokeSessionRevertAccentColor();
          closeDialog(settingsDialog);
          settingsDialog.setAttribute('hidden', '');
        } else if (e.key === 'F1' || (e.key === '/' || e.key === '?') && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          toggleHelp();
        } else if (e.key === '/' && !isTextField && (!helpDialog || !isDialogOpen(helpDialog))) {
          e.preventDefault();
          focusFeatureSearchInput();
        } else if (e.key === '?' && !isTextField || lowerKey === 'h' && !isTextField) {
          e.preventDefault();
          toggleHelp();
        } else if (isDialogOpen(helpDialog) && (e.key === '/' && !isTextField || lowerKey === 'f' && (e.ctrlKey || e.metaKey))) {
          e.preventDefault();
          if (helpSearch) helpSearch.focus();
        } else if (key === ',' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          if (settingsButton) settingsButton.click();
        } else if (lowerKey === 'k' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          focusFeatureSearchInput();
        } else if (lowerKey === 'd' && !isTextField) {
          darkModeEnabled = !document.body.classList.contains('dark-mode');
          if (scope && typeof scope === 'object') {
            scope.darkModeEnabled = darkModeEnabled;
          }
          applyDarkMode(darkModeEnabled);
          try {
            localStorage.setItem('darkMode', darkModeEnabled);
          } catch (err) {
            console.warn('Could not save dark mode preference', err);
          }
        } else if (lowerKey === 's' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          if (saveSetupBtn && !saveSetupBtn.disabled) {
            saveSetupBtn.click();
          }
        } else if (lowerKey === 'p' && !isTextField) {
          persistPinkModePreference(!document.body.classList.contains('pink-mode'));
        }
      });
      helpDialog.addEventListener('click', function (e) {
        if (e.target === helpDialog) closeHelp();
      });
      helpDialog.addEventListener('cancel', function (e) {
        e.preventDefault();
        closeHelp();
      });
  }

  if (globalScope && typeof globalScope === 'object') {
    globalScope.initializeHelpSystem = initializeHelpSystem;
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = initializeHelpSystem;
  }
})(typeof globalThis !== 'undefined'
  ? globalThis
  : (typeof window !== 'undefined'
    ? window
    : (typeof self !== 'undefined' ? self : this)));
