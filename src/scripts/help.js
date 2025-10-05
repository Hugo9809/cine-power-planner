(function (globalScope) {
  'use strict';

  function initializeHelpSystem() {
    const scope = globalScope && typeof globalScope === 'object' ? globalScope : {};
    const helpButton = scope.helpButton;
    const helpDialog = scope.helpDialog;

    if (!helpButton || !helpDialog) {
      return;
    }

    const backupDiffSectionEl = scope.backupDiffSectionEl;
    const restoreRehearsalSectionEl = scope.restoreRehearsalSectionEl;
    const showBackupDiffSection = scope.showBackupDiffSection;
    const openRestoreRehearsal = scope.openRestoreRehearsal;
    const activateSettingsTab = scope.activateSettingsTab;
    const isDialogOpen = scope.isDialogOpen;
    const settingsDialog = scope.settingsDialog;
    const settingsButton = scope.settingsButton;
    const generateGearListBtn = scope.generateGearListBtn;
    const runtimeFeedbackBtn = scope.runtimeFeedbackBtn;
    const generateOverviewBtn = scope.generateOverviewBtn;
    const openDialog = scope.openDialog;
    const showDeviceManagerSection = scope.showDeviceManagerSection;
    const helpQuickLinksNav = scope.helpQuickLinksNav;
    const helpQuickLinksList = scope.helpQuickLinksList;
    const helpQuickLinksHeading = scope.helpQuickLinksHeading;
    const helpSectionsContainer = scope.helpSectionsContainer;
    const texts = scope.texts || {};
    const currentLang = scope.currentLang;
    let updateHelpQuickLinksForLanguage = scope.updateHelpQuickLinksForLanguage;
    let updateHelpResultsSummaryText = scope.updateHelpResultsSummaryText;
    const normalizeSpellingVariants = scope.normalizeSpellingVariants;
    const normaliseMarkVariants = scope.normaliseMarkVariants;
    const helpResultsAssist = scope.helpResultsAssist;
    const helpResultsSummary = scope.helpResultsSummary;
    const helpSearch = scope.helpSearch;
    const helpSearchClear = scope.helpSearchClear;
    const helpNoResults = scope.helpNoResults;
    const closeSideMenu = scope.closeSideMenu;
    const closeDialog = scope.closeDialog;
    const revertSettingsPinkModeIfNeeded = scope.revertSettingsPinkModeIfNeeded;
    const rememberSettingsPinkModeBaseline = scope.rememberSettingsPinkModeBaseline;
    const revertSettingsTemperatureUnitIfNeeded = scope.revertSettingsTemperatureUnitIfNeeded;
    const rememberSettingsTemperatureUnitBaseline = scope.rememberSettingsTemperatureUnitBaseline;
    const invokeSessionRevertAccentColor = scope.invokeSessionRevertAccentColor;
    let darkModeEnabled = scope.darkModeEnabled;
    const applyDarkMode = scope.applyDarkMode;
    const persistPinkModePreference = scope.persistPinkModePreference;
    const saveSetupBtn = scope.saveSetupBtn;
    const hoverHelpButton = scope.hoverHelpButton;
    const featureSearch = scope.featureSearch;
    const openSideMenu = scope.openSideMenu;
    const updateFeatureSearchSuggestions = scope.updateFeatureSearchSuggestions;
    let runFeatureSearch = scope.runFeatureSearch;
    const normalizeSearchValue = scope.normalizeSearchValue;
    const extractFeatureSearchFilter = scope.extractFeatureSearchFilter;
    const searchKey = scope.searchKey;
    const searchTokens = scope.searchTokens;
    const findBestSearchMatch = scope.findBestSearchMatch;
    const helpMap = scope.helpMap;
    const deviceMap = scope.deviceMap;
    const featureMap = scope.featureMap;
    const FALLBACK_STRONG_SEARCH_MATCH_TYPES = scope.FALLBACK_STRONG_SEARCH_MATCH_TYPES;
    const STRONG_SEARCH_MATCH_TYPES = scope.STRONG_SEARCH_MATCH_TYPES || FALLBACK_STRONG_SEARCH_MATCH_TYPES;
    const updateFeatureSearchValue = scope.updateFeatureSearchValue;
    const recordFeatureSearchUsage = scope.recordFeatureSearchUsage;
    const restoreFeatureSearchDefaults = scope.restoreFeatureSearchDefaults;
    const closeHelpBtn = scope.closeHelpBtn;
      // --- Help dialog and hover help -----------------------------------------
      // Provides a modal help dialog with live filtering and a "hover for help"
      // mode that exposes descriptions for interface controls. The following
      // functions manage searching, opening/closing the dialog and tooltip-based
      // hover help.
      const helpContent = helpDialog.querySelector('.help-content');
      const helpQuickLinkItems = new Map();
      const helpSectionHighlightTimers = new Map();
      const appTargetHighlightTimers = new Map();
      const featureSearchHighlightTimers = new Map();

      const ensureHelpLinksUseButtonStyle = () => {
        if (!helpContent) return;
        const helpLinks = helpContent.querySelectorAll('a.help-link');
        helpLinks.forEach(link => {
          link.classList.add('button-link');
        });
      };

      ensureHelpLinksUseButtonStyle();

      const highlightAppTarget = element => {
        if (!element) return;
        const target = element;
        const existing = appTargetHighlightTimers.get(target);
        if (existing) {
          clearTimeout(existing);
        }
        target.classList.add('help-target-focus');
        const timeout = setTimeout(() => {
          target.classList.remove('help-target-focus');
          appTargetHighlightTimers.delete(target);
        }, 2000);
        appTargetHighlightTimers.set(target, timeout);
      };

      const highlightFeatureSearchTargets = targets => {
        if (!Array.isArray(targets) || targets.length === 0) return;
        const seen = new Set();
        targets.forEach(target => {
          if (!target || typeof target.classList?.add !== 'function') return;
          if (seen.has(target)) return;
          seen.add(target);
          const existing = featureSearchHighlightTimers.get(target);
          if (existing) {
            clearTimeout(existing);
          }
          target.classList.add('feature-search-focus');
          const timeout = setTimeout(() => {
            target.classList.remove('feature-search-focus');
            featureSearchHighlightTimers.delete(target);
          }, 2500);
          featureSearchHighlightTimers.set(target, timeout);
        });
      };

      const findAssociatedLabelElements = element => {
        if (!element) return [];
        const labels = new Set();
        const doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
        if (element.labels && typeof element.labels === 'object') {
          Array.from(element.labels).forEach(label => {
            if (label) labels.add(label);
          });
        }
        if (typeof element.closest === 'function') {
          const wrappingLabel = element.closest('label');
          if (wrappingLabel) labels.add(wrappingLabel);
        }
        if (doc && typeof element.getAttribute === 'function') {
          const collectIdRefs = attrValue => {
            if (!attrValue) return;
            attrValue
              .split(/\s+/)
              .filter(Boolean)
              .forEach(id => {
                const ref = doc.getElementById(id);
                if (ref) labels.add(ref);
              });
          };
          collectIdRefs(element.getAttribute('aria-labelledby'));
          collectIdRefs(element.getAttribute('aria-describedby'));
        }
        return Array.from(labels);
      };

      const ensureFeatureSearchVisibility = element => {
        if (!element) return;

        if (
          backupDiffSectionEl &&
          backupDiffSectionEl.contains(element) &&
          backupDiffSectionEl.hasAttribute('hidden')
        ) {
          if (typeof showBackupDiffSection === 'function') {
            try {
              showBackupDiffSection();
            } catch (error) {
              console.warn('Unable to open backup diff section for feature search target', error);
              backupDiffSectionEl.removeAttribute('hidden');
            }
          } else {
            backupDiffSectionEl.removeAttribute('hidden');
          }
        }

        if (
          restoreRehearsalSectionEl &&
          restoreRehearsalSectionEl.contains(element) &&
          restoreRehearsalSectionEl.hasAttribute('hidden')
        ) {
          if (typeof openRestoreRehearsal === 'function') {
            try {
              openRestoreRehearsal();
            } catch (error) {
              console.warn('Unable to open restore rehearsal section for feature search target', error);
              restoreRehearsalSectionEl.removeAttribute('hidden');
            }
          } else {
            restoreRehearsalSectionEl.removeAttribute('hidden');
          }
        }
      };

      const focusFeatureElement = element => {
        if (!element) return;

        ensureFeatureSearchVisibility(element);

        const settingsSection = element.closest('#settingsDialog');
        const settingsPanel = element.closest('.settings-panel');
        if (settingsPanel) {
          const labelledBy = settingsPanel.getAttribute('aria-labelledby') || '';
          const tabIds = labelledBy
            .split(/\s+/)
            .map(id => id.trim())
            .filter(Boolean);
          const matchingTabId = tabIds.find(id => document.getElementById(id));
          if (matchingTabId) {
            activateSettingsTab(matchingTabId);
          }
        }
        if (settingsSection && !isDialogOpen(settingsDialog)) {
          settingsButton?.click?.();
        }

        const dialog = element.closest('dialog');
        if (dialog && !isDialogOpen(dialog)) {
          if (dialog.id === 'projectDialog') {
            generateGearListBtn?.click?.();
          } else if (dialog.id === 'feedbackDialog') {
            runtimeFeedbackBtn?.click?.();
          } else if (dialog.id === 'overviewDialog') {
            generateOverviewBtn?.click?.();
          } else {
            openDialog(dialog);
          }
        }

        const deviceManager = element.closest('#device-manager');
        if (deviceManager) {
          showDeviceManagerSection();
        }

        if (typeof element.scrollIntoView === 'function') {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        const hadTabIndex = element.hasAttribute('tabindex');
        let addedTabIndex = false;
        if (!hadTabIndex) {
          const tabIndex = element.tabIndex;
          if (typeof tabIndex === 'number' && tabIndex < 0) {
            element.setAttribute('tabindex', '-1');
            addedTabIndex = true;
          }
        }

        if (typeof element.focus === 'function') {
          try {
            element.focus({ preventScroll: true });
          } catch {
            element.focus();
          }
        }

        if (addedTabIndex) {
          element.addEventListener(
            'blur',
            () => element.removeAttribute('tabindex'),
            { once: true }
          );
        }
      };

      const focusHelpSectionHeading = section => {
        if (!section) return;
        const heading =
          section.querySelector('h3, summary, h4, h5, h6') ||
          section.querySelector('button, a');
        if (!heading) return;
        const hadTabIndex = heading.hasAttribute('tabindex');
        if (!hadTabIndex) heading.setAttribute('tabindex', '-1');
        try {
          heading.focus({ preventScroll: true });
        } catch {
          heading.focus();
        }
        if (!hadTabIndex) {
          heading.addEventListener(
            'blur',
            () => heading.removeAttribute('tabindex'),
            { once: true }
          );
        }
      };

      const highlightHelpSection = section => {
        if (!section) return;
        const existingTimer = helpSectionHighlightTimers.get(section);
        if (existingTimer) {
          clearTimeout(existingTimer);
        }
        section.classList.add('help-section-focus');
        const timer = setTimeout(() => {
          section.classList.remove('help-section-focus');
          helpSectionHighlightTimers.delete(section);
        }, 1500);
        helpSectionHighlightTimers.set(section, timer);
      };

      const syncHelpQuickLinksVisibility = () => {
        if (!helpQuickLinksNav || !helpQuickLinksList || !helpQuickLinkItems.size) {
          if (helpQuickLinksNav) helpQuickLinksNav.setAttribute('hidden', '');
          return;
        }
        let hasVisible = false;
        helpQuickLinkItems.forEach(({ section, listItem, button }) => {
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

      const applyQuickLinkLanguage = lang => {
        if (!helpQuickLinksNav) return;
        const langTexts = (texts && texts[lang]) || {};
        const fallbackTexts = (texts && texts.en) || {};
        const headingText =
          langTexts.helpQuickLinksHeading || fallbackTexts.helpQuickLinksHeading;
        if (helpQuickLinksHeading && headingText) {
          helpQuickLinksHeading.textContent = headingText;
        }
        const ariaLabel =
          langTexts.helpQuickLinksAriaLabel ||
          headingText ||
          fallbackTexts.helpQuickLinksAriaLabel ||
          'Help topics quick navigation';
        helpQuickLinksNav.setAttribute('aria-label', ariaLabel);
        const helpDescription =
          langTexts.helpQuickLinksHelp || fallbackTexts.helpQuickLinksHelp;
        if (helpDescription) {
          helpQuickLinksNav.setAttribute('data-help', helpDescription);
        } else {
          helpQuickLinksNav.removeAttribute('data-help');
        }
        const template =
          langTexts.helpQuickLinkButtonHelp || fallbackTexts.helpQuickLinkButtonHelp;
        helpQuickLinkItems.forEach(({ button, label }) => {
          if (!button) return;
          if (template) {
            const helpText = template.replace('%s', label);
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

      const buildHelpQuickLinks = () => {
        if (!helpQuickLinksNav || !helpQuickLinksList || !helpSectionsContainer) {
          helpQuickLinkItems.clear();
          if (helpQuickLinksNav) helpQuickLinksNav.setAttribute('hidden', '');
          return;
        }
        helpQuickLinkItems.clear();
        helpQuickLinksList.textContent = '';
        const fragment = document.createDocumentFragment();
        const sections = Array.from(
          helpSectionsContainer.querySelectorAll('section[data-help-section]')
        );
        sections.forEach(section => {
          const id = section.id;
          if (!id) return;
          const heading = section.querySelector('h3');
          if (!heading) return;
          const headingIcon = heading.querySelector('.help-icon.icon-glyph');
          let label = heading.textContent || '';
          if (headingIcon) {
            const iconText = headingIcon.textContent || '';
            if (iconText) {
              const iconIndex = label.indexOf(iconText);
              if (iconIndex > -1) {
                label =
                  label.slice(0, iconIndex) +
                  label.slice(iconIndex + iconText.length);
              }
            }
          }
          label = label.trim();
          if (!label) return;
          const li = document.createElement('li');
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'help-quick-link button-link';
          button.dataset.targetId = id;
          button.setAttribute('aria-label', label);

          if (headingIcon) {
            const icon = headingIcon.cloneNode(true);
            icon.classList.remove('help-icon');
            icon.classList.add('help-quick-link-icon');
            button.appendChild(icon);
          }

          const labelSpan = document.createElement('span');
          labelSpan.className = 'help-quick-link-label';
          labelSpan.textContent = label;
          button.appendChild(labelSpan);
          button.addEventListener('click', () => {
            if (section.hasAttribute('hidden')) return;
            if (helpQuickLinksList) {
              helpQuickLinksList
                .querySelectorAll('.help-quick-link.active')
                .forEach(btn => btn.classList.remove('active'));
            }
            button.classList.add('active');
            if (typeof section.scrollIntoView === 'function') {
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            highlightHelpSection(section);
            focusHelpSectionHeading(section);
            const quickLinkHeading =
              section.querySelector('h3, summary, h4, h5, h6, [role="heading"]') ||
              section.querySelector('button, a');
            if (quickLinkHeading) {
              highlightFeatureSearchTargets([quickLinkHeading]);
            } else {
              highlightFeatureSearchTargets([section]);
            }
          });
          li.appendChild(button);
          fragment.appendChild(li);
          helpQuickLinkItems.set(id, { section, button, listItem: li, label });
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
        helpDialog.addEventListener('click', e => {
          const link = e.target.closest('a[data-help-target]');
          if (!link) return;
          const rawSelector = link.dataset.helpTarget || link.getAttribute('href') || '';
          const selector = rawSelector.trim();
          if (!selector) return;
          let focusEl;
          try {
            focusEl = document.querySelector(selector);
          } catch {
            focusEl = null;
          }
          if (!focusEl) return;
          e.preventDefault();
          const highlightSelector = link.dataset.helpHighlight || '';
          let highlightEl = focusEl;
          if (highlightSelector) {
            try {
              const candidate = document.querySelector(highlightSelector);
              if (candidate) {
                highlightEl = candidate;
              }
            } catch {
              // ignore selector errors and fall back to the focus element
            }
          }
          const targetInsideHelp = helpDialog.contains(focusEl);
          const runFocus = () => {
            focusFeatureElement(focusEl);
            if (highlightEl) {
              highlightAppTarget(highlightEl);
            }
            const extraTargets = findAssociatedLabelElements(highlightEl || focusEl);
            if (extraTargets.length) {
              highlightFeatureSearchTargets(extraTargets);
            }
          };
          if (targetInsideHelp) {
            runFocus();
            return;
          }
          closeHelp(null);
          requestAnimationFrame(() => {
            requestAnimationFrame(runFocus);
          });
        });
      }

      // Search and filtering for the help dialog. Every keystroke scans both
      // high-level sections and individual FAQ items, restoring their original
      // markup, highlighting matches and hiding entries that do not include the
      // query. A message is shown if nothing matches and the clear button is
      // toggled based on the presence of a query.
      const HELP_SEARCH_ACCENT_VARIANTS = new Map([
        ['a', 'àáâãäåāăąǎȁȃȧậắằẵẳấầẫẩảạæ'],
        ['b', 'ḃɓ'],
        ['c', 'çćĉċčƈ'],
        ['d', 'ďđḍḑḓ'],
        ['e', 'èéêëēĕėęěȅȇẹẻẽếềểễệ'],
        ['f', 'ƒḟ'],
        ['g', 'ğģĝġǵḡ'],
        ['h', 'ĥħḣḥḧẖ'],
        ['i', 'ìíîïĩīĭįıỉị'],
        ['j', 'ĵǰ'],
        ['k', 'ķƙḱḳḵ'],
        ['l', 'ĺļľłḷḽ'],
        ['m', 'ḿṁṃ'],
        ['n', 'ñńņňǹṅṇṋ'],
        ['o', 'òóôõöōŏőøǒȍȏơộớờỡởợọỏœ'],
        ['p', 'ṕṗ'],
        ['q', 'ʠ'],
        ['r', 'ŕŗřȑȓṛṙ'],
        ['s', 'śŝşšșṡṣ'],
        ['t', 'ţťțṫṭṯ'],
        ['u', 'ùúûüũūŭůűųǔȕȗưựứừữửụủ'],
        ['v', 'ṽṿ'],
        ['w', 'ŵẁẃẅẇẉ'],
        ['x', 'ẋẍ'],
        ['y', 'ýÿŷỳỷỹỵ'],
        ['z', 'źżžẑẓẕ']
      ]);

      const normaliseHelpSearchText = str => {
        if (!str) return '';
        let normalized = String(str).toLowerCase();
        if (typeof normalized.normalize === 'function') {
          normalized = normalized.normalize('NFD');
        }
        normalized = normalized
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/ß/g, 'ss')
          .replace(/æ/g, 'ae')
          .replace(/œ/g, 'oe')
          .replace(/ø/g, 'o')
          .replace(/&/g, 'and')
          .replace(/\+/g, 'plus')
          .replace(/[°º˚]/g, 'deg')
          .replace(/\bdegrees?\b/g, 'deg')
          .replace(/[×✕✖✗✘]/g, 'x');
        if (typeof normalizeSpellingVariants === 'function') {
          normalized = normalizeSpellingVariants(normalized);
        }
        normalized = normaliseMarkVariants(normalized);
        return normalized.replace(/[^a-z0-9]+/g, '');
      };

      const buildHelpHighlightPattern = normalized => {
        if (!normalized) return null;
        const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const parts = [];
        const addLetterPattern = char => {
          const variants = HELP_SEARCH_ACCENT_VARIANTS.get(char) || '';
          const chars = new Set();
          const all = `${char}${variants}`;
          for (const ch of all) {
            chars.add(ch);
            const upper = ch.toUpperCase();
            if (upper) chars.add(upper);
          }
          const escaped = Array.from(chars)
            .map(escapeRegExp)
            .join('');
          return `[${escaped}]`;
        };
        const letters = Array.from(normalized);
        letters.forEach((char, index) => {
          if (index > 0) parts.push('\\s*');
          if (/[a-z]/.test(char)) {
            parts.push(addLetterPattern(char));
          } else if (/[0-9]/.test(char)) {
            parts.push(char);
          } else {
            parts.push(escapeRegExp(char));
          }
        });
        return `(${parts.join('')})`;
      };

      updateHelpResultsSummaryText = ({
        totalCount,
        visibleCount,
        hasQuery,
        queryText
      } = {}) => {
        const hideAssist = () => {
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
        const storedTotal = Number(helpResultsSummary.dataset.totalCount || 0);
        if (!storedTotal) {
          helpResultsSummary.textContent = '';
          helpResultsSummary.setAttribute('hidden', '');
          hideAssist();
          return;
        }
        const storedVisible = Number(
          helpResultsSummary.dataset.visibleCount || 0
        );
        const storedHasQuery = helpResultsSummary.dataset.hasQuery === 'true';
        const storedQuery = helpResultsSummary.dataset.query || '';
        const langTexts = (texts && texts[currentLang]) || {};
        const fallbackTexts = (texts && texts.en) || {};
        let summaryText = '';
        if (storedHasQuery) {
          const template =
            langTexts.helpResultsSummaryFiltered ||
            fallbackTexts.helpResultsSummaryFiltered;
          if (template) {
            summaryText = template
              .replace('%1$s', storedVisible)
              .replace('%2$s', storedTotal)
              .replace('%3$s', storedQuery);
          } else if (storedQuery) {
            summaryText = `Showing ${storedVisible} of ${storedTotal} help topics for “${storedQuery}”.`;
          } else {
            summaryText = `Showing ${storedVisible} of ${storedTotal} help topics.`;
          }
        } else {
          const template =
            langTexts.helpResultsSummaryAll ||
            fallbackTexts.helpResultsSummaryAll;
          if (template) {
            summaryText = template.replace('%s', storedTotal);
          } else {
            summaryText = `All ${storedTotal} help topics are shown.`;
          }
        }
        helpResultsSummary.textContent = summaryText;
        helpResultsSummary.removeAttribute('hidden');
        if (helpResultsAssist) {
          if (storedVisible > 0) {
            const assistTemplate =
              langTexts.helpResultsAssist || fallbackTexts.helpResultsAssist;
            const assistText =
              assistTemplate ||
              'Tip: Press Tab to move into the quick links, or press Enter to open the top visible topic.';
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

      const filterHelp = () => {
        // Bail out early if the search input is missing
        if (!helpSearch) {
          if (helpResultsSummary) helpResultsSummary.setAttribute('hidden', '');
          return;
        }
        const rawQuery = helpSearch.value.trim();
        const normalizedQuery = normaliseHelpSearchText(rawQuery);
        const hasQuery = normalizedQuery.length > 0;
        // Treat sections and FAQ items uniformly so the same logic can filter both
        const sections = Array.from(
          helpDialog.querySelectorAll('[data-help-section]')
        );
        const items = Array.from(helpDialog.querySelectorAll('.faq-item'));
        const elements = sections.concat(items);
        const totalCount = elements.length;
        let visibleCount = 0;
        const highlightPattern = hasQuery
          ? buildHelpHighlightPattern(normalizedQuery)
          : null;
        const highlightMatches = (root, pattern) => {
          if (
            !pattern ||
            typeof document.createTreeWalker !== 'function' ||
            typeof NodeFilter === 'undefined'
          ) {
            return;
          }
          const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT,
            null
          );
          const textNodes = [];
          while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
          }
          textNodes.forEach(node => {
            const text = node.textContent;
            if (!text) return;
            const regex = new RegExp(pattern, 'giu');
            const firstMatch = regex.exec(text);
            if (!firstMatch) return;
            const frag = document.createDocumentFragment();
            let lastIndex = 0;
            let match = firstMatch;
            do {
              const start = match.index;
              const end = start + match[0].length;
              if (start > lastIndex) {
                frag.appendChild(
                  document.createTextNode(text.slice(lastIndex, start))
                );
              }
              const mark = document.createElement('mark');
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
        elements.forEach(el => {
          const isFaqItem = el.classList.contains('faq-item');
          // Save original HTML once so that repeated filtering doesn't permanently
          // insert <mark> tags; restore it before applying a new highlight. While
          // doing so, capture the default open state for FAQ <details> elements so
          // the search can temporarily expand matches and restore the original
          // collapsed/expanded configuration when cleared.
          if (!el.dataset.origHtml) {
            el.dataset.origHtml = el.innerHTML;
            if (isFaqItem) {
              el.dataset.defaultOpen = el.hasAttribute('open') ? 'true' : 'false';
            }
          } else {
            el.innerHTML = el.dataset.origHtml;
          }
          const text = normaliseHelpSearchText(el.textContent || '');
          const keywordText = normaliseHelpSearchText(
            el.dataset.helpKeywords || ''
          );
          const matches =
            !hasQuery ||
            text.includes(normalizedQuery) ||
            keywordText.includes(normalizedQuery);
          if (matches) {
            if (hasQuery && highlightPattern) {
              // Highlight the matching text while preserving the rest of the content
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
            // Hide entries that do not match and collapse FAQ answers while they
            // are filtered out so reopening the dialog starts from a clean state.
            el.setAttribute('hidden', '');
            if (isFaqItem) {
              el.removeAttribute('open');
            }
          }
        });
        if (typeof updateHelpResultsSummaryText === 'function') {
          updateHelpResultsSummaryText({
            totalCount,
            visibleCount,
            hasQuery,
            queryText: rawQuery || normalizedQuery
          });
        }
        if (helpNoResults) {
          // Show or hide the "no results" indicator
          if (visibleCount > 0) {
            helpNoResults.setAttribute('hidden', '');
          } else {
            helpNoResults.removeAttribute('hidden');
          }
        }
        if (helpSearchClear) {
          // Only show the clear button when there is text in the search box
          if (hasQuery) {
            helpSearchClear.removeAttribute('hidden');
          } else {
            helpSearchClear.setAttribute('hidden', '');
          }
        }
        syncHelpQuickLinksVisibility();
      };

      // Display the help dialog. The search box is reset so stale filter state
      // doesn't persist between openings, and focus is moved to the search field
      // for immediate typing.
      const openHelp = () => {
        closeSideMenu();
        helpDialog.removeAttribute('hidden');
        openDialog(helpDialog);
        if (helpSearch) {
          helpSearch.value = '';
          filterHelp(); // ensure all sections are visible again
          if (helpQuickLinksList) {
            helpQuickLinksList
              .querySelectorAll('.help-quick-link.active')
              .forEach(btn => btn.classList.remove('active'));
          }
          if (helpContent) {
            helpContent.scrollTop = 0;
          }
          helpSearch.focus();
        } else {
          try {
            helpDialog.focus({ preventScroll: true });
          } catch {
            helpDialog.focus();
          }
        }
      };

      // Hide the dialog and return focus to the button that opened it
      const closeHelp = (returnFocusEl = helpButton) => {
        closeDialog(helpDialog);
        helpDialog.setAttribute('hidden', '');
        if (returnFocusEl && typeof returnFocusEl.focus === 'function') {
          try {
            returnFocusEl.focus({ preventScroll: true });
          } catch {
            returnFocusEl.focus();
          }
        }
      };

      // Convenience helper for toggling the dialog open or closed
      const toggleHelp = () => {
        if (!isDialogOpen(helpDialog)) {
          openHelp();
        } else {
          closeHelp();
        }
      };

      // Hover help mode displays a tooltip describing whichever element the user
      // points at or focuses. It is triggered from a button inside the dialog and
      // uses the same data-help/aria-* attributes that power the dialog content.
      let hoverHelpActive = false;
      let hoverHelpTooltip;
      let hoverHelpCurrentTarget = null;
      let hoverHelpHighlightedTarget = null;
      let hoverHelpPointerClientX = null;
      let hoverHelpPointerClientY = null;
      let hoverHelpStatus = null;
      let hoverHelpStatusHeading = null;
      let hoverHelpStatusBody = null;
      let hoverHelpStatusShortcuts = null;
      let hoverHelpStatusShortcutsHeading = null;
      let hoverHelpStatusShortcutsList = null;
      let hoverHelpStatusHint = null;

      const parseHoverHelpSelectorList = value => {
        if (typeof value !== 'string') return [];
        return value
          .split(',')
          .map(selector => selector.trim())
          .filter(Boolean);
      };

      const parseHoverHelpIdList = value => {
        if (typeof value !== 'string') return [];
        return value
          .split(/\s+/)
          .map(id => id.trim())
          .filter(Boolean);
      };

      const getHoverHelpReferenceElements = element => {
        if (!element || !document?.querySelector) return [];

        const references = [];
        const seen = new Set();

        const addCandidate = candidate => {
          if (!candidate || !(candidate instanceof Element)) return;
          if (candidate === element) return;
          if (seen.has(candidate)) return;
          seen.add(candidate);
          references.push(candidate);
        };

        const addFromSelectors = raw => {
          parseHoverHelpSelectorList(raw).forEach(selector => {
            try {
              const match = document.querySelector(selector);
              addCandidate(match);
            } catch {
              // Ignore invalid selectors – hover help should continue gracefully.
            }
          });
        };

        const addFromIds = raw => {
          parseHoverHelpIdList(raw).forEach(id => {
            const match = document.getElementById(id);
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

      const HOVER_HELP_TARGET_SELECTOR =
        '[data-help], [aria-label], [title], [aria-labelledby], [alt], [aria-describedby]';

      const findHoverHelpTarget = start => {
        if (!start) return null;
        const el = start.closest(HOVER_HELP_TARGET_SELECTOR);
        if (!el || el.tagName === 'SECTION') {
          return null;
        }
        return el;
      };

      const HOVER_HELP_SHORTCUT_TOKEN_MAP = {
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

      const formatHoverHelpShortcutToken = token => {
        if (typeof token !== 'string') return '';
        const clean = token.trim();
        if (!clean) return '';
        const lower = clean.toLowerCase();
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
          return `Numpad ${clean.slice(6)}`;
        }
        if (/^numpad(add|subtract|multiply|divide)$/i.test(lower)) {
          const op = lower.slice(6);
          const symbolMap = { add: '+', subtract: '−', multiply: '×', divide: '÷' };
          return `Numpad ${symbolMap[op] || op}`;
        }
        if (clean.length === 1) {
          return clean.toUpperCase();
        }
        return clean.replace(/^[a-z]/, c => c.toUpperCase());
      };

      const formatHoverHelpShortcut = shortcut => {
        if (typeof shortcut !== 'string') return '';
        const parts = shortcut
          .split('+')
          .map(formatHoverHelpShortcutToken)
          .filter(Boolean);
        if (!parts.length) {
          return '';
        }
        return parts.join(' + ');
      };

      const splitHoverHelpShortcutList = value => {
        if (typeof value !== 'string') return [];
        return value
          .split(/[;,\n\u2022\u2027\u00b7]+/)
          .map(part => part.trim())
          .filter(Boolean);
      };

      const gatherHoverHelpShortcuts = element => {
        if (!element) return [];
        const shortcuts = [];
        const attrValues = [
          element.getAttribute('data-shortcut'),
          element.getAttribute('data-shortcuts'),
          element.getAttribute('data-help-shortcut'),
          element.getAttribute('data-help-shortcuts')
        ];
        attrValues.forEach(value => {
          splitHoverHelpShortcutList(value).forEach(item => {
            if (item) shortcuts.push(item);
          });
        });
        const ariaShortcuts = element.getAttribute('aria-keyshortcuts');
        if (ariaShortcuts) {
          ariaShortcuts
            .split(/\s+/)
            .map(formatHoverHelpShortcut)
            .filter(Boolean)
            .forEach(item => shortcuts.push(item));
        }
        return shortcuts;
      };

      const getHoverHelpLocaleValue = key => {
        if (!texts || typeof texts !== 'object') return '';
        const fallback = typeof texts.en === 'object' ? texts.en[key] : '';
        if (typeof currentLang === 'string' && texts[currentLang]) {
          const value = texts[currentLang][key];
          if (typeof value === 'string' && value.trim()) {
            return value;
          }
        }
        return typeof fallback === 'string' ? fallback : '';
      };

      const getHoverHelpFallbackKeys = element => {
        if (!element) return [];

        const keys = [];
        const push = key => {
          if (!key || keys.includes(key)) return;
          keys.push(key);
        };

        const role = (element.getAttribute('role') || '').toLowerCase();
        const tagName = element.tagName ? element.tagName.toLowerCase() : '';
        const typeAttr = (element.getAttribute('type') || '').toLowerCase();
        const elementType = typeof element.type === 'string' ? element.type.toLowerCase() : '';
        const inputType = typeAttr || elementType;
        const ariaHasPopup = (element.getAttribute('aria-haspopup') || '').toLowerCase();
        const ariaPressed = (element.getAttribute('aria-pressed') || '').toLowerCase();

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

        if (tagName === 'button' || role === 'button' || element.matches?.("input[type='button']") || element.matches?.("input[type='submit']") || element.matches?.("input[type='reset']")) {
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

      const collectHoverHelpContent = el => {
        if (!el) {
          return { label: '', details: [] };
        }

        const seen = new Set();
        const labelParts = [];
        const detailParts = [];
        const shortcutParts = [];

        const addUnique = (value, bucket) => {
          if (typeof value !== 'string') return;
          const trimmed = value.replace(/\s+/g, ' ').trim();
          if (!trimmed || seen.has(trimmed)) return;
          seen.add(trimmed);
          bucket.push(trimmed);
        };

        const addLabelText = value => addUnique(value, labelParts);
        const addDetailText = value => addUnique(value, detailParts);
        const addShortcutText = value => addUnique(value, shortcutParts);

        const addTextFromElement = (
          element,
          { includeTextContent = false, preferTextAsLabel = false } = {}
        ) => {
          if (!element) return;
          addDetailText(element.getAttribute('data-help'));
          addDetailText(element.getAttribute('aria-description'));
          addDetailText(element.getAttribute('title'));
          addDetailText(element.getAttribute('aria-placeholder'));
          addLabelText(element.getAttribute('aria-label'));
          addLabelText(element.getAttribute('alt'));
          const placeholderAttr = element.getAttribute('placeholder');
          addDetailText(placeholderAttr);
          if (element.placeholder && element.placeholder !== placeholderAttr) {
            addDetailText(element.placeholder);
          }
          const roleDescription = element.getAttribute('aria-roledescription');
          if (roleDescription) {
            if (preferTextAsLabel) {
              addLabelText(roleDescription);
            } else {
              addDetailText(roleDescription);
            }
          }
          gatherHoverHelpShortcuts(element).forEach(addShortcutText);
          if (includeTextContent) {
            const text = element.textContent;
            if (preferTextAsLabel) {
              addLabelText(text);
            } else {
              addDetailText(text);
            }
          }
        };

        const applyFromIds = (ids, { preferTextAsLabel = false } = {}) => {
          if (!ids) return;
          ids
            .split(/\s+/)
            .map(id => id.trim())
            .filter(Boolean)
            .forEach(id => {
              const ref = document.getElementById(id);
              if (!ref) return;
              addTextFromElement(ref, {
                includeTextContent: true,
                preferTextAsLabel
              });
            });
        };

        const visitedElements = new Set();
        const queue = [
          { element: el, preferTextAsLabel: true, includeTextContent: false }
        ];

        while (queue.length) {
          const {
            element: current,
            preferTextAsLabel,
            includeTextContent
          } = queue.shift();
          if (!current || visitedElements.has(current)) {
            continue;
          }
          visitedElements.add(current);

          addTextFromElement(current, { includeTextContent, preferTextAsLabel });

          applyFromIds(current.getAttribute('aria-labelledby'), {
            preferTextAsLabel: true
          });
          applyFromIds(current.getAttribute('aria-describedby'));
          applyFromIds(current.getAttribute('aria-details'));
          applyFromIds(current.getAttribute('aria-errormessage'));
          applyFromIds(current.getAttribute('aria-controls'));

          findAssociatedLabelElements(current).forEach(labelEl => {
            addTextFromElement(labelEl, {
              includeTextContent: true,
              preferTextAsLabel: true
            });
          });

          getHoverHelpReferenceElements(current).forEach(proxyEl => {
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
          labelParts.slice(1).forEach(text => addDetailText(text));
        }

        if (!detailParts.length) {
          const fallbackKeys = getHoverHelpFallbackKeys(el);
          let addedFallback = false;
          fallbackKeys.forEach(key => {
            const text = getHoverHelpLocaleValue(key);
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

      const clearHoverHelpHighlight = () => {
        if (hoverHelpHighlightedTarget && hoverHelpHighlightedTarget.classList) {
          hoverHelpHighlightedTarget.classList.remove('hover-help-highlight');
        }
        hoverHelpHighlightedTarget = null;
      };

      const setHoverHelpHighlight = target => {
        if (hoverHelpHighlightedTarget === target) return;
        clearHoverHelpHighlight();
        if (target && target.classList && typeof target.classList.add === 'function') {
          target.classList.add('hover-help-highlight');
          hoverHelpHighlightedTarget = target;
        }
      };

      const usingPointerAnchor = () =>
        hoverHelpActive &&
        hoverHelpTooltip &&
        typeof hoverHelpPointerClientX === 'number' &&
        typeof hoverHelpPointerClientY === 'number' &&
        Number.isFinite(hoverHelpPointerClientX) &&
        Number.isFinite(hoverHelpPointerClientY);

      const positionHoverHelpTooltip = target => {
        if (!hoverHelpTooltip || !target) return;
        const rect = target.getBoundingClientRect();
        const docEl = document.documentElement;
        const viewportWidth = Math.max(docEl?.clientWidth || 0, window.innerWidth || 0);
        const viewportHeight = Math.max(docEl?.clientHeight || 0, window.innerHeight || 0);
        const scrollX = window.scrollX || window.pageXOffset || 0;
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const horizontalOffset = 12;
        const verticalOffset = 10;
        const viewportPadding = 8;

        const safeLeft = Number.isFinite(rect.left) ? rect.left : 0;
        const safeRight = Number.isFinite(rect.right) ? rect.right : safeLeft + (rect.width || 0);
        const safeTop = Number.isFinite(rect.top) ? rect.top : 0;
        const safeBottom = Number.isFinite(rect.bottom) ? rect.bottom : safeTop;

        const tooltipRect = hoverHelpTooltip.getBoundingClientRect();
        const tooltipWidth = tooltipRect.width || hoverHelpTooltip.offsetWidth || 0;
        const tooltipHeight = tooltipRect.height || hoverHelpTooltip.offsetHeight || 0;

        const pointerAnchored = usingPointerAnchor();

        const pointerClientX = (() => {
          if (pointerAnchored && typeof hoverHelpPointerClientX === 'number') {
            return hoverHelpPointerClientX;
          }
          if (Number.isFinite(rect.left)) {
            return safeLeft + (rect.width || 0) / 2;
          }
          return viewportWidth / 2;
        })();

        const preferLeftSide = (() => {
          if (tooltipWidth) {
            const requiredSpace = tooltipWidth + horizontalOffset + viewportPadding;
            const availableRight = viewportWidth - pointerClientX;
            const availableLeft = pointerClientX;
            if (availableRight < requiredSpace && availableLeft >= requiredSpace) {
              return true;
            }
          }
          const rightSideThreshold = viewportWidth * 0.6;
          return pointerClientX >= rightSideThreshold;
        })();

        let top = pointerAnchored
          ? hoverHelpPointerClientY + scrollY + verticalOffset
          : safeBottom + scrollY + verticalOffset;
        let left;

        if (pointerAnchored) {
          left = hoverHelpPointerClientX + scrollX + horizontalOffset;
          if (preferLeftSide) {
            left = hoverHelpPointerClientX + scrollX - tooltipWidth - horizontalOffset;
          }
        } else {
          const baseAnchor = preferLeftSide ? safeRight : safeLeft;
          left = baseAnchor + scrollX + (preferLeftSide ? -horizontalOffset : horizontalOffset);
          if (preferLeftSide) {
            left -= tooltipWidth;
          }
        }

        if (tooltipWidth) {
          const viewportRightLimit = scrollX + viewportWidth - viewportPadding;
          const defaultRight = left + tooltipWidth;
          if (defaultRight > viewportRightLimit) {
            if (pointerAnchored) {
              left = hoverHelpPointerClientX + scrollX - tooltipWidth - horizontalOffset;
            } else {
              left = safeRight + scrollX - tooltipWidth - horizontalOffset;
            }
          } else if (left < scrollX + viewportPadding && preferLeftSide) {
            left = Math.max(left, scrollX + viewportPadding);
          }

          const minLeft = scrollX + viewportPadding;
          const maxLeft =
            scrollX + Math.max(viewportWidth - tooltipWidth - viewportPadding, viewportPadding);
          if (left < minLeft) {
            left = minLeft;
          } else if (left > maxLeft) {
            left = maxLeft;
          }
        }

        if (tooltipHeight) {
          const minTop = scrollY + viewportPadding;
          const maxTop = scrollY + Math.max(viewportHeight - tooltipHeight - viewportPadding, viewportPadding);
          if (top > maxTop) {
            const aboveTop = pointerAnchored
              ? hoverHelpPointerClientY + scrollY - tooltipHeight - verticalOffset
              : safeTop + scrollY - tooltipHeight - verticalOffset;
            if (aboveTop >= minTop) {
              top = aboveTop;
            } else {
              top = Math.min(Math.max(top, minTop), maxTop);
            }
          } else if (top < minTop) {
            top = minTop;
          }
        }

        hoverHelpTooltip.style.top = `${top}px`;
        hoverHelpTooltip.style.left = `${left}px`;
      };

      const hideHoverHelpTooltip = () => {
        if (!hoverHelpTooltip) return;
        hoverHelpTooltip.setAttribute('hidden', '');
        hoverHelpTooltip.style.removeProperty('visibility');
        hoverHelpPointerClientX = null;
        hoverHelpPointerClientY = null;
        clearHoverHelpHighlight();
      };

      const createHoverHelpDetailsFragment = detailText => {
        const fragment = document.createDocumentFragment();
        if (!Array.isArray(detailText) || detailText.length === 0) {
          return fragment;
        }

        const addParagraph = text => {
          if (!text) return;
          const paragraph = document.createElement('p');
          paragraph.textContent = text;
          fragment.appendChild(paragraph);
        };

        let listBuffer = [];

        const flushList = () => {
          if (!listBuffer.length) return;
          const list = document.createElement('ul');
          listBuffer.forEach(itemText => {
            const item = document.createElement('li');
            item.textContent = itemText;
            list.appendChild(item);
          });
          fragment.appendChild(list);
          listBuffer = [];
        };

        const addListItem = text => {
          if (!text) return;
          listBuffer.push(text);
        };

        detailText.forEach(part => {
          if (typeof part !== 'string') return;
          const normalisedPart = part
            .replace(/\r\n/g, '\n')
            .replace(/\s*[•‣▪◦⋅·]\s*/g, '\n• ');
          const lines = normalisedPart
            .split(/\n+/)
            .map(line => line.trim())
            .filter(Boolean);

          lines.forEach(line => {
            const bulletMatch = line.match(/^[•\-–—]\s*(.+)$/);
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

      const removeHoverHelpStatus = () => {
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

      const setElementHidden = (element, hidden) => {
        if (!element) return;
        if (hidden) {
          element.setAttribute('hidden', '');
        } else {
          element.removeAttribute('hidden');
        }
      };

      const ensureHoverHelpStatus = () => {
        if (hoverHelpStatus && hoverHelpStatus.isConnected) {
          return hoverHelpStatus;
        }
        const body = document?.body;
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

      const updateHoverHelpStatus = ({ heading = '', details = [], shortcuts = [], hint } = {}) => {
        const statusEl = ensureHoverHelpStatus();
        if (!statusEl) {
          return;
        }
        if (hoverHelpStatusHeading) {
          hoverHelpStatusHeading.textContent = heading || '';
          setElementHidden(hoverHelpStatusHeading, !heading);
        }
        if (hoverHelpStatusBody) {
          hoverHelpStatusBody.textContent = '';
          const detailList = Array.isArray(details) ? details.filter(Boolean) : [];
          if (detailList.length) {
            hoverHelpStatusBody.appendChild(createHoverHelpDetailsFragment(detailList));
            setElementHidden(hoverHelpStatusBody, false);
          } else {
            setElementHidden(hoverHelpStatusBody, true);
          }
        }
        if (hoverHelpStatusShortcuts && hoverHelpStatusShortcutsList) {
          hoverHelpStatusShortcutsList.textContent = '';
          const shortcutItems = Array.isArray(shortcuts) ? shortcuts.filter(Boolean) : [];
          if (shortcutItems.length) {
            const headingText = getHoverHelpLocaleValue('hoverHelpShortcutsHeading');
            if (hoverHelpStatusShortcutsHeading) {
              hoverHelpStatusShortcutsHeading.textContent = headingText || '';
              setElementHidden(hoverHelpStatusShortcutsHeading, !headingText);
            }
            shortcutItems.forEach(text => {
              const item = document.createElement('li');
              item.textContent = text;
              hoverHelpStatusShortcutsList.appendChild(item);
            });
            setElementHidden(hoverHelpStatusShortcuts, false);
          } else {
            setElementHidden(hoverHelpStatusShortcuts, true);
          }
        }
        if (hoverHelpStatusHint) {
          const resolvedHint =
            typeof hint === 'string' && hint.trim()
              ? hint
              : getHoverHelpLocaleValue('hoverHelpExitHint');
          hoverHelpStatusHint.textContent = resolvedHint || '';
          setElementHidden(hoverHelpStatusHint, !resolvedHint);
        }
      };

      const renderHoverHelpStatusIntro = () => {
        const heading = getHoverHelpLocaleValue('hoverHelpButtonLabel');
        const description = getHoverHelpLocaleValue('hoverHelpButtonHelp');
        const details = description ? [description] : [];
        updateHoverHelpStatus({ heading, details });
      };

      const renderHoverHelpStatusForTarget = (label, detailText, shortcutList) => {
        const heading = label && label.trim()
          ? label.trim()
          : getHoverHelpLocaleValue('hoverHelpButtonLabel');
        const details = Array.isArray(detailText) ? detailText.filter(Boolean) : [];
        const resolvedDetails = details.length ? details : [getHoverHelpLocaleValue('hoverHelpFallbackGeneric')];
        const shortcuts = Array.isArray(shortcutList) ? shortcutList.filter(Boolean) : [];
        updateHoverHelpStatus({ heading, details: resolvedDetails, shortcuts });
      };

      const updateHoverHelpTooltip = target => {
        hoverHelpCurrentTarget = target || null;
        setHoverHelpHighlight(target || null);
        if (!hoverHelpActive || !hoverHelpTooltip || !target) {
          hideHoverHelpTooltip();
          if (hoverHelpActive) {
            renderHoverHelpStatusIntro();
          }
          return;
        }
        const { label, details, shortcuts } = collectHoverHelpContent(target);
        const hasLabel = typeof label === 'string' && label.trim().length > 0;
        const detailText = Array.isArray(details) ? details.filter(Boolean) : [];
        const shortcutList = Array.isArray(shortcuts)
          ? shortcuts.filter(Boolean)
          : [];
        if (!hasLabel && detailText.length === 0 && shortcutList.length === 0) {
          hideHoverHelpTooltip();
          renderHoverHelpStatusIntro();
          return;
        }
        hoverHelpTooltip.textContent = '';
        if (hasLabel) {
          const titleEl = document.createElement('div');
          titleEl.className = 'hover-help-heading';
          titleEl.textContent = label.trim();
          hoverHelpTooltip.appendChild(titleEl);
        }
        if (detailText.length) {
          const bodyEl = document.createElement('div');
          bodyEl.className = 'hover-help-details';
          bodyEl.appendChild(createHoverHelpDetailsFragment(detailText));
          hoverHelpTooltip.appendChild(bodyEl);
        }
        if (shortcutList.length) {
          const shortcutsWrapper = document.createElement('div');
          shortcutsWrapper.className = 'hover-help-shortcuts';
          const headingText = getHoverHelpLocaleValue('hoverHelpShortcutsHeading');
          if (headingText) {
            const headingEl = document.createElement('div');
            headingEl.className = 'hover-help-shortcuts-heading';
            headingEl.textContent = headingText;
            shortcutsWrapper.appendChild(headingEl);
          }
          const listEl = document.createElement('ul');
          listEl.className = 'hover-help-shortcuts-list';
          shortcutList.forEach(shortcutText => {
            if (!shortcutText) return;
            const item = document.createElement('li');
            item.className = 'hover-help-shortcut';
            item.textContent = shortcutText;
            listEl.appendChild(item);
          });
          if (listEl.childElementCount) {
            shortcutsWrapper.appendChild(listEl);
            hoverHelpTooltip.appendChild(shortcutsWrapper);
          }
        }
        const wasHidden = hoverHelpTooltip.hasAttribute('hidden');
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

      const canInteractDuringHoverHelp = target => {
        if (!hoverHelpActive || !target) return false;
        return !!target.closest('[data-allow-hover-help], #settingsButton, #settingsDialog');
      };

      // Exit hover-help mode and clean up tooltip/cursor state
      const stopHoverHelp = () => {
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

      // Start hover-help mode: close the dialog, create the tooltip element and
      // switch the cursor to the standard help cursor.
      const startHoverHelp = () => {
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

      const refreshTooltipPosition = () => {
        if (hoverHelpActive && hoverHelpTooltip && hoverHelpCurrentTarget) {
          positionHoverHelpTooltip(hoverHelpCurrentTarget);
        }
      };

      document.addEventListener('mouseover', e => {
        if (!hoverHelpActive || !hoverHelpTooltip) return;
        if (typeof e?.clientX === 'number' && typeof e?.clientY === 'number') {
          hoverHelpPointerClientX = e.clientX;
          hoverHelpPointerClientY = e.clientY;
        }
        const target = findHoverHelpTarget(e.target);
        updateHoverHelpTooltip(target);
      });

      document.addEventListener('focusin', e => {
        if (!hoverHelpActive || !hoverHelpTooltip) return;
        hoverHelpPointerClientX = null;
        hoverHelpPointerClientY = null;
        const target = findHoverHelpTarget(e.target);
        updateHoverHelpTooltip(target);
      });

      document.addEventListener('focusout', e => {
        if (!hoverHelpActive || !hoverHelpTooltip) return;
        if (!e.relatedTarget || !findHoverHelpTarget(e.relatedTarget)) {
          hoverHelpCurrentTarget = null;
          hideHoverHelpTooltip();
        }
      });

      window.addEventListener('scroll', refreshTooltipPosition, true);
      window.addEventListener('resize', refreshTooltipPosition);

      const updatePointerPosition = e => {
        if (!hoverHelpActive || !hoverHelpTooltip) return;
        hoverHelpPointerClientX = e.clientX;
        hoverHelpPointerClientY = e.clientY;
        if (hoverHelpCurrentTarget) {
          positionHoverHelpTooltip(hoverHelpCurrentTarget);
        }
      };

      window.addEventListener('pointermove', updatePointerPosition, true);
      window.addEventListener('pointerdown', updatePointerPosition, true);

      // Prevent interacting with controls like dropdowns while hover help is active
      document.addEventListener(
        'mousedown',
        e => {
          if (hoverHelpActive && !canInteractDuringHoverHelp(e.target)) {
            e.preventDefault();
          }
        },
        true
      );

      document.addEventListener('click', e => {
        // Any click while in hover-help mode exits the mode and removes the tooltip
        if (!hoverHelpActive) return;
        if (canInteractDuringHoverHelp(e.target)) {
          return;
        }
        e.preventDefault();
        stopHoverHelp();
      });

      if (hoverHelpButton) {
        // Dedicated button inside the dialog to enable hover-help mode
        hoverHelpButton.addEventListener('click', e => {
          e.stopPropagation();
          startHoverHelp(); // activate tooltip mode
        });
      }

      const focusFeatureSearchInput = () => {
        if (!featureSearch) return;
        const sideMenu = document.getElementById('sideMenu');
        if (sideMenu?.contains(featureSearch)) {
          openSideMenu();
        }
        if (typeof featureSearch.scrollIntoView === 'function') {
          featureSearch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        try {
          featureSearch.focus({ preventScroll: true });
        } catch {
          featureSearch.focus();
        }
        if (typeof featureSearch.select === 'function') {
          featureSearch.select();
        }
        if (!featureSearch.hasAttribute('data-skip-native-picker')) {
          safeShowPicker(featureSearch);
        }
      };

      runFeatureSearch = query => {
        const rawQuery = typeof query === 'string' ? query : featureSearch?.value || '';
        const originalNormalized = normalizeSearchValue(rawQuery);
        const value = rawQuery.trim();
        if (!value) return;
        const hasFilterHelper = typeof extractFeatureSearchFilter === 'function';
        const filterData = hasFilterHelper
          ? extractFeatureSearchFilter(value)
          : { filterType: null, queryText: value };
        const filterType = filterData?.filterType || null;
        const filteredQuery = filterType ? filterData.queryText : value;
        const normalizedFiltered = typeof filteredQuery === 'string' ? filteredQuery.trim() : '';
        const lower = value.toLowerCase();
        const isHelpSuggestion = lower.endsWith(' (help)');
        const cleanSource = isHelpSuggestion
          ? value.slice(0, -7).trim()
          : normalizedFiltered || (typeof filteredQuery === 'string' ? filteredQuery.trim() : '');
        if (filterType === 'help' && !isHelpSuggestion && !cleanSource) {
          openHelp();
          if (helpSearch) {
            helpSearch.value = '';
            filterHelp();
            helpSearch.focus();
          }
          return;
        }
        const clean = cleanSource || (filterType ? '' : value);
        const cleanKey = searchKey(clean);
        const cleanTokens = searchTokens(clean);

        const helpMatch = findBestSearchMatch(helpMap, cleanKey, cleanTokens);
        const deviceMatch = findBestSearchMatch(deviceMap, cleanKey, cleanTokens);
        const featureMatch = findBestSearchMatch(featureMap, cleanKey, cleanTokens);
        const helpScore = helpMatch?.score || 0;
        const deviceScore = deviceMatch?.score || 0;
        const strongSearchMatchTypes =
          typeof STRONG_SEARCH_MATCH_TYPES !== 'undefined' &&
          STRONG_SEARCH_MATCH_TYPES instanceof Set
            ? STRONG_SEARCH_MATCH_TYPES
            : FALLBACK_STRONG_SEARCH_MATCH_TYPES;

        const deviceStrong = deviceMatch ? strongSearchMatchTypes.has(deviceMatch.matchType) : false;
        const filterTargetsDevices = filterType === 'device';
        const filterTargetsActions = filterType === 'action';
        const filterTargetsFeatures = filterType === 'feature';
        const filterBlocksDevices = filterTargetsFeatures || filterTargetsActions;
        const normalizedFeatureMatch = (() => {
          if (!featureMatch) return null;
          const entry = featureMatch.value;
          if (!entry) return null;
          const entryType = entry.entryType || 'feature';
          if (entryType === 'device') return null;
          if (filterTargetsDevices) return null;
          if (filterTargetsFeatures && entryType !== 'feature') return null;
          if (filterTargetsActions && entryType !== 'action') return null;
          return { match: featureMatch, entryType, entry };
        })();
        const fallbackFeatureMatch =
          featureMatch && featureMatch.value && featureMatch.value.entryType !== 'device'
            ? featureMatch
            : null;
        const featureMatchForComparison = normalizedFeatureMatch?.match || fallbackFeatureMatch;
        const featureScore = featureMatchForComparison?.score || 0;
        const featureStrong = featureMatchForComparison
          ? strongSearchMatchTypes.has(featureMatchForComparison.matchType)
          : false;
        const bestNonHelpScore = Math.max(deviceScore, featureScore);
        const hasStrongNonHelp = deviceStrong || featureStrong;
        const preferHelp =
          !!helpMatch &&
          (isHelpSuggestion || filterType === 'help' || (!hasStrongNonHelp && helpScore > bestNonHelpScore));

        if (!isHelpSuggestion && !preferHelp) {
          const featureMatchType = featureMatchForComparison?.matchType;
          const shouldUseDevice =
            (!filterBlocksDevices &&
              (!!deviceMatch &&
                (!featureMatchForComparison ||
                  (deviceStrong && !featureStrong) ||
                  (deviceStrong === featureStrong &&
                    (deviceScore > featureScore ||
                      (deviceScore === featureScore && featureMatchType !== 'exactKey')))))) ||
            (filterTargetsDevices && !!deviceMatch);
          if (shouldUseDevice) {
            const device = deviceMatch.value;
            if (device && device.select) {
              device.select.value = device.value;
              device.select.dispatchEvent(new Event('change', { bubbles: true }));
              if (device.label) {
                updateFeatureSearchValue(device.label, originalNormalized);
              }
              if (typeof recordFeatureSearchUsage === 'function') {
                let deviceLabel = device.label;
                if (!deviceLabel && device.select) {
                  const selectedOption = Array.from(device.select.options || []).find(opt => opt.value === device.value);
                  if (selectedOption && selectedOption.textContent) {
                    deviceLabel = selectedOption.textContent.trim();
                  }
                }
                recordFeatureSearchUsage(deviceMatch.key, 'device', deviceLabel);
              }
              focusFeatureElement(device.select);
              const highlightTargets = [
                device.select,
                ...findAssociatedLabelElements(device.select)
              ];
              highlightFeatureSearchTargets(highlightTargets);
              return;
            }
          }
          if (normalizedFeatureMatch) {
            const feature = normalizedFeatureMatch.entry;
            const featureEl = feature?.element || feature;
            if (featureEl) {
              const label = feature?.label || featureEl.textContent?.trim();
              if (label) {
                updateFeatureSearchValue(label, originalNormalized);
              }
              if (typeof recordFeatureSearchUsage === 'function') {
                const type = normalizedFeatureMatch.entryType || 'feature';
                const usageKey = normalizedFeatureMatch.match?.key || featureMatch?.key;
                recordFeatureSearchUsage(usageKey, type, label);
              }
              focusFeatureElement(featureEl);
              const highlightTargets = [
                featureEl,
                ...findAssociatedLabelElements(featureEl)
              ];
              highlightFeatureSearchTargets(highlightTargets);
              return;
            }
          }
        }
        if (helpMatch) {
          const helpEntry = helpMatch.value || {};
          const section = helpEntry.section;
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
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            highlightHelpSection(section);
            const sectionHeading =
              section.querySelector('h3, summary, h4, h5, h6, [role="heading"]') ||
              section.querySelector('button, a');
            if (sectionHeading) {
              highlightFeatureSearchTargets([sectionHeading]);
            } else {
              highlightFeatureSearchTargets([section]);
            }
            const quickLink = section.id ? helpQuickLinkItems.get(section.id) : null;
            if (helpQuickLinksList) {
              helpQuickLinksList
                .querySelectorAll('.help-quick-link.active')
                .forEach(btn => btn.classList.remove('active'));
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
        const featureSearchDropdown = document.getElementById('featureSearchDropdown');

        const getDropdownOptions = () => {
          if (!featureSearchDropdown) return [];
          return Array.from(
            featureSearchDropdown.querySelectorAll('[role="option"]') || []
          );
        };

        const setActiveDropdownOption = index => {
          const options = getDropdownOptions();
          if (!options.length) return null;
          const bounded = Math.max(0, Math.min(index, options.length - 1));
          options.forEach((option, optIndex) => {
            option.setAttribute('tabindex', optIndex === bounded ? '0' : '-1');
          });
          options[bounded].focus();
          if (featureSearchDropdown) {
            featureSearchDropdown.dataset.activeIndex = String(bounded);
          }
          return options[bounded];
        };

        const closeFeatureSearchDropdown = () => {
          if (!featureSearchDropdown) return;
          featureSearchDropdown.dataset.open = 'false';
          featureSearchDropdown.hidden = true;
          featureSearchDropdown.setAttribute('aria-expanded', 'false');
          featureSearchDropdown.dataset.activeIndex = '';
          const container = featureSearchDropdown.closest('.feature-search');
          if (container) container.classList.remove('feature-search-open');
        };

        const openFeatureSearchDropdown = () => {
          if (!featureSearchDropdown) return;
          if (featureSearchDropdown.dataset.count === '0') {
            closeFeatureSearchDropdown();
            return;
          }
          featureSearchDropdown.dataset.open = 'true';
          featureSearchDropdown.hidden = false;
          featureSearchDropdown.setAttribute('aria-expanded', 'true');
          const container = featureSearchDropdown.closest('.feature-search');
          if (container) container.classList.add('feature-search-open');
        };

        const applyFeatureSearchSuggestion = value => {
          if (!featureSearch || !value) return;
          featureSearch.value = value;
          try {
            featureSearch.focus({ preventScroll: true });
          } catch {
            featureSearch.focus();
          }
          featureSearch.setSelectionRange?.(value.length, value.length);
          updateFeatureSearchSuggestions(value);
          runFeatureSearch(value);
          closeFeatureSearchDropdown();
        };

        const handle = () => {
          closeFeatureSearchDropdown();
          runFeatureSearch(featureSearch.value);
        };

        featureSearch.addEventListener('change', handle);
        featureSearch.addEventListener('focus', () => {
          openFeatureSearchDropdown();
        });
        featureSearch.addEventListener('blur', () => {
          window.setTimeout(() => {
            if (
              !featureSearchDropdown ||
              featureSearchDropdown.contains(document.activeElement)
            ) {
              return;
            }
            closeFeatureSearchDropdown();
          }, 100);
        });
        featureSearch.addEventListener('input', () => {
          updateFeatureSearchSuggestions(featureSearch.value);
          openFeatureSearchDropdown();
        });
        featureSearch.addEventListener('keydown', e => {
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
            const options = getDropdownOptions();
            const activeIndex = featureSearchDropdown.dataset.activeIndex;
            const nextIndex = activeIndex ? Number(activeIndex) + 1 : 0;
            setActiveDropdownOption(nextIndex >= options.length ? 0 : nextIndex);
          } else if (e.key === 'ArrowUp') {
            if (!featureSearchDropdown || featureSearchDropdown.dataset.count === '0') {
              return;
            }
            e.preventDefault();
            openFeatureSearchDropdown();
            const options = getDropdownOptions();
            if (!options.length) return;
            const activeIndex = featureSearchDropdown.dataset.activeIndex;
            if (!activeIndex) {
              setActiveDropdownOption(options.length - 1);
            } else {
              const prevIndex = Number(activeIndex) - 1;
              setActiveDropdownOption(prevIndex >= 0 ? prevIndex : options.length - 1);
            }
          }
        });

        if (featureSearchDropdown) {
          featureSearchDropdown.addEventListener('mousedown', e => {
            const option = e.target.closest('[data-value]');
            if (option) {
              e.preventDefault();
            }
          });
          featureSearchDropdown.addEventListener('click', e => {
            const option = e.target.closest('[data-value]');
            if (!option) return;
            const value = option.getAttribute('data-value') || '';
            if (!value) return;
            applyFeatureSearchSuggestion(value);
          });
          featureSearchDropdown.addEventListener('keydown', e => {
            const options = getDropdownOptions();
            if (!options.length) return;
            const activeElement = document.activeElement;
            const currentIndex = options.indexOf(activeElement);
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              const nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0;
              setActiveDropdownOption(nextIndex >= options.length ? 0 : nextIndex);
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
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
                const value = options[currentIndex].getAttribute('data-value') || '';
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
          featureSearchDropdown.addEventListener('focusout', () => {
            window.setTimeout(() => {
              if (
                document.activeElement === featureSearch ||
                (featureSearchDropdown && featureSearchDropdown.contains(document.activeElement))
              ) {
                return;
              }
              closeFeatureSearchDropdown();
            }, 100);
          });
        }
      }

      // Wire up button clicks and search field interactions
      helpButton.addEventListener('click', toggleHelp);
      if (closeHelpBtn) closeHelpBtn.addEventListener('click', closeHelp);
      if (helpSearch) helpSearch.addEventListener('input', filterHelp);
      if (helpSearchClear) helpSearchClear.addEventListener('click', () => {
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

      document.addEventListener('keydown', e => {
        const tag = document.activeElement.tagName;
        const isTextField = tag === 'INPUT' || tag === 'TEXTAREA';
        const key = typeof e.key === 'string' ? e.key : '';
        const lowerKey = key.toLowerCase();
        // Keyboard shortcuts controlling the help dialog and hover-help mode
        if (hoverHelpActive && e.key === 'Escape') {
          // Escape exits hover-help mode
          stopHoverHelp();
        } else if (e.key === 'Escape' && isDialogOpen(helpDialog)) {
          // Escape closes the help dialog
          e.preventDefault();
          closeHelp();
        } else if (
          e.key === 'Escape' && settingsDialog && isDialogOpen(settingsDialog)
        ) {
          e.preventDefault();
          revertSettingsPinkModeIfNeeded();
          rememberSettingsPinkModeBaseline();
          revertSettingsTemperatureUnitIfNeeded();
          rememberSettingsTemperatureUnitBaseline();
          invokeSessionRevertAccentColor();
          closeDialog(settingsDialog);
          settingsDialog.setAttribute('hidden', '');
        } else if (
          e.key === 'F1' ||
          ((e.key === '/' || e.key === '?') && (e.ctrlKey || e.metaKey))
        ) {
          // F1 or Ctrl+/ toggles the dialog even while typing
          e.preventDefault();
          toggleHelp();
        } else if (
          e.key === '/' &&
          !isTextField &&
          (!helpDialog || !isDialogOpen(helpDialog))
        ) {
          e.preventDefault();
          focusFeatureSearchInput();
        } else if (
          (e.key === '?' && !isTextField) ||
          (lowerKey === 'h' && !isTextField)
        ) {
          // Plain ? or H opens the dialog when not typing in a field
          e.preventDefault();
          toggleHelp();
        } else if (
          isDialogOpen(helpDialog) &&
          ((e.key === '/' && !isTextField) || (lowerKey === 'f' && (e.ctrlKey || e.metaKey)))
        ) {
          // When the dialog is open, / or Ctrl+F moves focus to the search box
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

      helpDialog.addEventListener('click', e => {
        // Clicking the semi-transparent backdrop (not the dialog content) closes it
        if (e.target === helpDialog) closeHelp();
      });

      helpDialog.addEventListener('cancel', e => {
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
