/*
 * Extracted documentation tracker management for the Cine Power Planner
 * settings dialog. The orchestration logic used to live directly inside the
 * massive app-core bundle which made maintenance difficult. Centralising the
 * behaviour here keeps the runtime predictable while the ongoing refactor
 * continues to split the legacy monolith into purpose driven modules.
 *
 * The module intentionally mirrors the previous behaviour:
 *   - Offline-first storage continues to rely on the shared storage helpers.
 *   - Localisation callbacks are accepted so translations stay in sync.
 *   - DOM lookups default to the known element ids but can be customised for
 *     integration tests.
 *   - Autosave, backup and restore continue to operate untouched because the
 *     persistence helpers remain identical.
 */

(function () {
  const DEFAULT_ID_PREFIX = 'documentationRelease';
  const DEFAULT_SECTION_ORDER = ['locales', 'helpTopics', 'printGuides'];
  const DEFAULT_SECTION_CONFIG = Object.freeze({
    locales: {
      headingKey: 'documentationTrackerLocalesHeading',
      items: [
        { id: 'en', labelKey: 'documentationTrackerLocaleEnglish' },
        { id: 'de', labelKey: 'documentationTrackerLocaleGerman' },
        { id: 'es', labelKey: 'documentationTrackerLocaleSpanish' },
        { id: 'fr', labelKey: 'documentationTrackerLocaleFrench' },
        { id: 'it', labelKey: 'documentationTrackerLocaleItalian' },
      ],
    },
    helpTopics: {
      headingKey: 'documentationTrackerHelpHeading',
      items: [
        { id: 'help-start', labelKey: 'documentationTrackerHelpStart' },
        { id: 'help-save', labelKey: 'documentationTrackerHelpSave' },
        { id: 'help-backup', labelKey: 'documentationTrackerHelpBackup' },
        { id: 'help-own-gear', labelKey: 'documentationTrackerHelpOwnGear' },
        { id: 'help-offline', labelKey: 'documentationTrackerHelpOffline' },
      ],
    },
    printGuides: {
      headingKey: 'documentationTrackerPrintHeading',
      items: [
        { id: 'guide-checklist', labelKey: 'documentationTrackerPrintChecklist' },
        { id: 'guide-maintenance', labelKey: 'documentationTrackerPrintMaintenance' },
        { id: 'guide-save-share', labelKey: 'documentationTrackerPrintSaveShare' },
        { id: 'guide-offline', labelKey: 'documentationTrackerPrintOffline' },
      ],
    },
  });

  const DOCUMENTATION_TRACKER_MAX_NOTES_LENGTH = 8000;

  function isObject(value) {
    return !!value && typeof value === 'object';
  }

  function detectDocument(candidate) {
    if (candidate && typeof candidate.createElement === 'function') {
      return candidate;
    }
    if (typeof document !== 'undefined' && document && typeof document.createElement === 'function') {
      return document;
    }
    return null;
  }

  function resolveGlobalScope() {
    if (typeof globalThis !== 'undefined' && globalThis) {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window) {
      return window;
    }
    if (typeof self !== 'undefined' && self) {
      return self;
    }
    if (typeof global !== 'undefined' && global) {
      return global;
    }
    return null;
  }

  function ensureArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function createDocumentationTrackerManager(options = {}) {
    const doc = detectDocument(options.document);
    const scope = resolveGlobalScope();

    const elementSelectors = {
      card: 'documentationTrackerCard',
      heading: 'documentationTrackerHeading',
      description: 'documentationTrackerDescription',
      addButton: 'documentationTrackerAddRelease',
      list: 'documentationTrackerList',
      emptyState: 'documentationTrackerEmpty',
      summary: 'documentationTrackerSummary',
    };

    const elementOptionsProvided = {
      card: !!options.card,
      heading: !!options.heading,
      description: !!options.description,
      addButton: !!options.addButton,
      list: !!options.list,
      emptyState: !!options.emptyState,
      summary: !!options.summary,
    };

    const elements = {
      card:
        options.card ||
        (doc ? doc.getElementById(elementSelectors.card) : null),
      heading:
        options.heading ||
        (doc ? doc.getElementById(elementSelectors.heading) : null),
      description:
        options.description ||
        (doc ? doc.getElementById(elementSelectors.description) : null),
      addButton:
        options.addButton ||
        (doc ? doc.getElementById(elementSelectors.addButton) : null),
      list:
        options.list ||
        (doc ? doc.getElementById(elementSelectors.list) : null),
      emptyState:
        options.emptyState ||
        (doc ? doc.getElementById(elementSelectors.emptyState) : null),
      summary:
        options.summary ||
        (doc ? doc.getElementById(elementSelectors.summary) : null),
    };

    const sectionOrder = ensureArray(options.sectionOrder).length
      ? ensureArray(options.sectionOrder)
      : DEFAULT_SECTION_ORDER.slice();
    const sectionConfig = isObject(options.sectionConfig)
      ? options.sectionConfig
      : DEFAULT_SECTION_CONFIG;
    const idPrefix = typeof options.idPrefix === 'string' && options.idPrefix
      ? options.idPrefix
      : DEFAULT_ID_PREFIX;

    let localizationBundle = isObject(options.localizationBundle)
      ? options.localizationBundle
      : {};
    let localizationFallback = isObject(options.localizationFallback)
      ? options.localizationFallback
      : {};
    let currentLanguage = typeof options.language === 'string' && options.language
      ? options.language
      : 'en';

    let state = {
      version: 1,
      releases: [],
    };
    let focusTargetId = '';
    let pendingHighlightId = '';
    let initialized = false;

    function refreshDocumentationTrackerElements() {
      if (!doc) {
        return false;
      }

      let refreshed = false;
      Object.keys(elementSelectors).forEach(key => {
        if (elementOptionsProvided[key]) {
          return;
        }
        const current = elements[key];
        if (current && typeof current === 'object') {
          if (typeof current.isConnected === 'boolean') {
            if (current.isConnected) {
              return;
            }
          } else if (doc.contains && typeof doc.contains === 'function') {
            if (doc.contains(current)) {
              return;
            }
          }
        }
        if (current) {
          const replacement = doc.getElementById(elementSelectors[key]);
          if (replacement && replacement !== current) {
            elements[key] = replacement;
            refreshed = true;
          }
          return;
        }
        const found = doc.getElementById(elementSelectors[key]);
        if (found) {
          elements[key] = found;
          refreshed = true;
        }
      });

      return refreshed;
    }

    function resolveLocaleString(key) {
      if (!key) {
        return '';
      }

      const bundle = localizationBundle;
      const value = bundle && typeof bundle[key] === 'string' ? bundle[key] : null;
      if (value && value.trim()) {
        return value;
      }

      const fallback = localizationFallback && typeof localizationFallback[key] === 'string'
        ? localizationFallback[key]
        : '';
      if (fallback && typeof fallback === 'string') {
        return fallback;
      }

      if (scope && typeof scope.resolveLocaleString === 'function') {
        try {
          const resolved = scope.resolveLocaleString(key);
          if (typeof resolved === 'string') {
            return resolved;
          }
        } catch (error) {
          void error;
        }
      }

      return '';
    }

    function documentationTrackerIsoNow() {
      try {
        return new Date().toISOString();
      } catch (error) {
        void error;
      }
      return '';
    }

    function createDocumentationTrackerReleaseId() {
      const now = documentationTrackerIsoNow();
      const numeric = now ? now.replace(/\D+/g, '') : String(Date.now());
      let random = '';
      try {
        random = Math.random().toString(36).slice(2, 8);
      } catch (error) {
        random = String(Math.floor(Math.random() * 1e6));
        void error;
      }
      return `${idPrefix}-${numeric}-${random}`;
    }

    function normalizeDocumentationTrackerStatusEntryApp(entry) {
      if (entry && typeof entry === 'object') {
        const completed =
          entry.completed === true ||
          entry.checked === true ||
          entry.value === true ||
          entry.done === true;
        let updatedAt = null;
        if (typeof entry.updatedAt === 'string' && entry.updatedAt.trim()) {
          updatedAt = entry.updatedAt.trim();
        } else if (typeof entry.timestamp === 'string' && entry.timestamp.trim()) {
          updatedAt = entry.timestamp.trim();
        } else if (typeof entry.completedAt === 'string' && entry.completedAt.trim()) {
          updatedAt = entry.completedAt.trim();
        }
        return { completed, updatedAt };
      }
      if (typeof entry === 'boolean') {
        return { completed: entry === true, updatedAt: null };
      }
      if (typeof entry === 'string') {
        const normalized = entry.trim().toLowerCase();
        if (
          normalized === 'true' ||
          normalized === '1' ||
          normalized === 'yes' ||
          normalized === 'done'
        ) {
          return { completed: true, updatedAt: null };
        }
      }
      return { completed: false, updatedAt: null };
    }

    function cloneDocumentationTrackerRelease(release) {
      if (!release || typeof release !== 'object') {
        return null;
      }

      const cloned = {
        id:
          typeof release.id === 'string' && release.id.trim()
            ? release.id.trim()
            : createDocumentationTrackerReleaseId(),
        name: typeof release.name === 'string' ? release.name.trim() : '',
        targetDate: typeof release.targetDate === 'string' ? release.targetDate.trim() : '',
        createdAt:
          typeof release.createdAt === 'string' && release.createdAt.trim()
            ? release.createdAt.trim()
            : documentationTrackerIsoNow(),
        updatedAt:
          typeof release.updatedAt === 'string' && release.updatedAt.trim()
            ? release.updatedAt.trim()
            : null,
        notes: typeof release.notes === 'string' ? release.notes : '',
        archived: release.archived === true,
        statuses: {},
      };

      if (!cloned.updatedAt) {
        if (typeof release.timestamp === 'string' && release.timestamp.trim()) {
          cloned.updatedAt = release.timestamp.trim();
        } else if (typeof release.modifiedAt === 'string' && release.modifiedAt.trim()) {
          cloned.updatedAt = release.modifiedAt.trim();
        } else {
          cloned.updatedAt = cloned.createdAt;
        }
      }

      if (cloned.notes.length > DOCUMENTATION_TRACKER_MAX_NOTES_LENGTH) {
        cloned.notes = cloned.notes.slice(0, DOCUMENTATION_TRACKER_MAX_NOTES_LENGTH);
      }

      const rawStatuses = release.statuses && typeof release.statuses === 'object'
        ? release.statuses
        : {};

      Object.keys(rawStatuses).forEach(sectionKey => {
        const sectionValue = rawStatuses[sectionKey];
        if (!sectionValue || typeof sectionValue !== 'object') {
          return;
        }
        const map = {};
        if (Array.isArray(sectionValue)) {
          sectionValue.forEach(item => {
            if (typeof item === 'string' && item.trim()) {
              map[item.trim()] = { completed: true, updatedAt: null };
            } else if (item && typeof item === 'object') {
              const identifier =
                typeof item.id === 'string' && item.id.trim()
                  ? item.id.trim()
                  : typeof item.key === 'string' && item.key.trim()
                    ? item.key.trim()
                    : null;
              if (!identifier) {
                return;
              }
              map[identifier] = normalizeDocumentationTrackerStatusEntryApp(item);
            }
          });
        } else {
          Object.keys(sectionValue).forEach(itemId => {
            if (itemId === null || itemId === undefined) {
              return;
            }
            const id = typeof itemId === 'string' ? itemId.trim() : String(itemId).trim();
            if (!id) {
              return;
            }
            map[id] = normalizeDocumentationTrackerStatusEntryApp(sectionValue[itemId]);
          });
        }
        cloned.statuses[sectionKey] = map;
      });

      sectionOrder.forEach(sectionKey => {
        const config = sectionConfig[sectionKey];
        const map = cloned.statuses[sectionKey] || {};
        if (config && Array.isArray(config.items)) {
          config.items.forEach(item => {
            if (!Object.prototype.hasOwnProperty.call(map, item.id)) {
              map[item.id] = { completed: false, updatedAt: null };
            } else {
              const entry = map[item.id];
              map[item.id] = {
                completed: entry && entry.completed === true,
                updatedAt:
                  entry && typeof entry.updatedAt === 'string' && entry.updatedAt.trim()
                    ? entry.updatedAt.trim()
                    : null,
              };
            }
          });
        }
        cloned.statuses[sectionKey] = map;
      });

      return cloned;
    }

    function loadDocumentationTrackerStateFromStorage() {
      if (typeof scope.loadDocumentationTracker !== 'function') {
        state = { version: 1, releases: [] };
        return;
      }

      try {
        const loaded = scope.loadDocumentationTracker();
        if (!loaded || !Array.isArray(loaded.releases)) {
          state = { version: 1, releases: [] };
          return;
        }
        state = {
          version:
            typeof loaded.version === 'number' && Number.isFinite(loaded.version)
              ? loaded.version
              : 1,
          releases: loaded.releases.map(cloneDocumentationTrackerRelease).filter(Boolean),
        };
        sortDocumentationTrackerReleases();
      } catch (error) {
        console.warn('Failed to load documentation tracker state', error);
        state = { version: 1, releases: [] };
      }
    }

    function sortDocumentationTrackerReleases() {
      if (!state || !Array.isArray(state.releases)) {
        return;
      }
      state.releases.sort((a, b) => {
        const archivedA = a && a.archived === true;
        const archivedB = b && b.archived === true;
        if (archivedA !== archivedB) {
          return archivedA ? 1 : -1;
        }
        const timeA = (a && (a.updatedAt || a.createdAt)) || '';
        const timeB = (b && (b.updatedAt || b.createdAt)) || '';
        if (timeA && timeB) {
          return timeB.localeCompare(timeA);
        }
        if (timeB) return 1;
        if (timeA) return -1;
        return 0;
      });
    }

    function persistDocumentationTrackerState(options = {}) {
      const { skipSort = false } = options || {};
      if (!skipSort) {
        sortDocumentationTrackerReleases();
      }
      if (typeof scope.saveDocumentationTracker !== 'function') {
        return;
      }
      try {
        scope.saveDocumentationTracker(state);
      } catch (error) {
        console.warn('Failed to save documentation tracker state', error);
      }
    }

    function getDocumentationReleaseForElement(element) {
      if (!element || typeof element.closest !== 'function') {
        return null;
      }
      const releaseEl = element.closest('.documentation-release');
      if (!releaseEl) {
        return null;
      }
      const releaseId = releaseEl.getAttribute('data-release-id');
      if (!releaseId) {
        return null;
      }
      const release = state.releases.find(entry => entry && entry.id === releaseId);
      if (!release) {
        return null;
      }
      return { release, releaseId };
    }

    function getDocumentationTrackerItemLabel(sectionKey, itemId) {
      const config = sectionConfig[sectionKey];
      if (config && Array.isArray(config.items)) {
        const item = config.items.find(candidate => candidate.id === itemId);
        if (item) {
          const label = resolveLocaleString(item.labelKey);
          if (label) {
            return label;
          }
        }
      }
      return itemId;
    }

    function computeDocumentationSectionStats(release, sectionKey) {
      const config = sectionConfig[sectionKey];
      const items = config && Array.isArray(config.items) ? config.items : [];
      const map = release && release.statuses && release.statuses[sectionKey]
        ? release.statuses[sectionKey]
        : {};
      let total = 0;
      let completed = 0;
      items.forEach(item => {
        total += 1;
        if (map[item.id] && map[item.id].completed === true) {
          completed += 1;
        }
      });
      return { total, completed, remaining: Math.max(total - completed, 0) };
    }

    function computeDocumentationReleaseStats(release) {
      const sections = {};
      let total = 0;
      let completed = 0;
      sectionOrder.forEach(sectionKey => {
        const stats = computeDocumentationSectionStats(release, sectionKey);
        sections[sectionKey] = stats;
        total += stats.total;
        completed += stats.completed;
      });
      return {
        total,
        completed,
        remaining: Math.max(total - completed, 0),
        sections,
      };
    }

    function formatDocumentationTrackerTimestamp(value, options = {}) {
      if (!value) {
        return '';
      }
      const { includeTime = false, dateOnly = false } = options || {};
      try {
        let date;
        if (dateOnly && typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
          const parts = value.split('-').map(Number);
          date = new Date(parts[0], (parts[1] || 1) - 1, parts[2] || 1);
        } else {
          date = new Date(value);
        }
        if (!date || Number.isNaN(date.getTime())) {
          return '';
        }
        const locale =
          typeof currentLanguage === 'string' && currentLanguage
            ? currentLanguage
            : (typeof navigator !== 'undefined' && navigator && navigator.language)
              ? navigator.language
              : 'en';
        const formatOptions = includeTime && !dateOnly
          ? { dateStyle: 'medium', timeStyle: 'short' }
          : { dateStyle: 'medium' };
        const formatter = new Intl.DateTimeFormat(locale, formatOptions);
        return formatter.format(date);
      } catch (error) {
        void error;
      }
      return '';
    }

    function formatDocumentationTrackerProgress(completed, total) {
      if (!total) {
        return '';
      }
      const template = resolveLocaleString('documentationTrackerProgress') || '{completed}/{total} completed';
      return template
        .replace('{completed}', String(completed))
        .replace('{total}', String(total));
    }

    function formatDocumentationTrackerSectionProgress(sectionKey, completed, total) {
      const label = getDocumentationTrackerItemLabel(sectionKey, sectionKey);
      const template = resolveLocaleString('documentationTrackerSectionProgress') || '{label}: {completed}/{total}';
      return template
        .replace('{label}', label || sectionKey)
        .replace('{completed}', String(completed))
        .replace('{total}', String(total));
    }

    function documentationTrackerFormatDefaultReleaseName(template, isoTimestamp) {
      if (!template) {
        return resolveLocaleString('documentationTrackerFallbackReleaseName') || 'Release log';
      }
      const createdAt = isoTimestamp || documentationTrackerIsoNow();
      const formattedDate = formatDocumentationTrackerTimestamp(createdAt, { includeTime: false });
      return template.replace('{date}', formattedDate || createdAt || '');
    }

    function createDocumentationTrackerRelease() {
      const createdAt = documentationTrackerIsoNow();
      const release = {
        id: createDocumentationTrackerReleaseId(),
        name: documentationTrackerFormatDefaultReleaseName(
          resolveLocaleString('documentationTrackerDefaultReleaseName'),
          createdAt,
        ),
        targetDate: '',
        createdAt,
        updatedAt: createdAt,
        notes: '',
        archived: false,
        statuses: {},
      };
      sectionOrder.forEach(sectionKey => {
        const config = sectionConfig[sectionKey];
        const map = {};
        if (config && Array.isArray(config.items)) {
          config.items.forEach(item => {
            map[item.id] = { completed: false, updatedAt: null };
          });
        }
        release.statuses[sectionKey] = map;
      });
      return release;
    }

    function createDocumentationReleaseElement(release) {
      if (!doc) {
        return null;
      }
      const stats = computeDocumentationReleaseStats(release);
      const container = doc.createElement('article');
      container.className = 'documentation-release';
      container.setAttribute('data-release-id', release.id);
      container.setAttribute('role', 'listitem');
      if (release.archived) {
        container.setAttribute('data-archived', 'true');
      }

      const header = doc.createElement('div');
      header.className = 'documentation-release-header';
      container.appendChild(header);

      const headingGroup = doc.createElement('div');
      headingGroup.className = 'documentation-release-heading';
      header.appendChild(headingGroup);

      const nameInputId = `${idPrefix}Name-${release.id}`;
      const nameLabel = doc.createElement('label');
      nameLabel.setAttribute('for', nameInputId);
      nameLabel.textContent =
        resolveLocaleString('documentationTrackerReleaseNameLabel') || 'Release name';
      headingGroup.appendChild(nameLabel);

      const nameInput = doc.createElement('input');
      nameInput.type = 'text';
      nameInput.id = nameInputId;
      nameInput.value = release.name || '';
      nameInput.dataset.field = 'name';
      nameInput.autocomplete = 'off';
      nameInput.maxLength = 160;
      if (release.archived) {
        nameInput.disabled = true;
      }
      headingGroup.appendChild(nameInput);

      const meta = doc.createElement('div');
      meta.className = 'documentation-release-meta';
      header.appendChild(meta);

      const targetWrapper = doc.createElement('div');
      targetWrapper.className = 'settings-field';
      meta.appendChild(targetWrapper);

      const targetInputId = `${idPrefix}Date-${release.id}`;
      const targetLabel = doc.createElement('label');
      targetLabel.setAttribute('for', targetInputId);
      targetLabel.textContent =
        resolveLocaleString('documentationTrackerReleaseDateLabel') || 'Target release date';
      targetWrapper.appendChild(targetLabel);

      const targetInput = doc.createElement('input');
      targetInput.type = 'date';
      targetInput.id = targetInputId;
      targetInput.value = release.targetDate || '';
      targetInput.dataset.field = 'date';
      if (release.archived) {
        targetInput.disabled = true;
      }
      targetWrapper.appendChild(targetInput);

      const actions = doc.createElement('div');
      actions.className = 'documentation-release-actions';
      meta.appendChild(actions);

      const markAllButton = doc.createElement('button');
      markAllButton.type = 'button';
      markAllButton.dataset.role = 'mark-all-complete';
      markAllButton.textContent =
        resolveLocaleString('documentationTrackerMarkAllComplete') || 'Mark all complete';
      if (release.archived) {
        markAllButton.disabled = true;
      }
      actions.appendChild(markAllButton);

      const archiveButton = doc.createElement('button');
      archiveButton.type = 'button';
      archiveButton.dataset.role = 'toggle-archive';
      archiveButton.textContent = release.archived
        ? resolveLocaleString('documentationTrackerRestoreRelease') || 'Reopen release'
        : resolveLocaleString('documentationTrackerArchiveRelease') || 'Archive release';
      actions.appendChild(archiveButton);

      if (release.archived) {
        const archivedBadge = doc.createElement('span');
        archivedBadge.className = 'documentation-release-archived-badge';
        archivedBadge.textContent =
          resolveLocaleString('documentationTrackerArchivedBadge') || 'Archived';
        meta.appendChild(archivedBadge);
      }

      const body = doc.createElement('div');
      body.className = 'documentation-release-body';
      container.appendChild(body);

      sectionOrder.forEach(sectionKey => {
        const config = sectionConfig[sectionKey];
        if (!config || !Array.isArray(config.items)) {
          return;
        }
        const section = doc.createElement('section');
        section.className = 'documentation-release-section';
        section.dataset.section = sectionKey;
        body.appendChild(section);

        const sectionHeading = doc.createElement('h4');
        sectionHeading.textContent =
          resolveLocaleString(config.headingKey) || sectionKey;
        section.appendChild(sectionHeading);

        const sectionList = doc.createElement('ul');
        sectionList.className = 'documentation-release-items';
        sectionList.setAttribute('role', 'group');
        section.appendChild(sectionList);

        config.items.forEach(item => {
          const status =
            release.statuses &&
            release.statuses[sectionKey] &&
            release.statuses[sectionKey][item.id]
              ? release.statuses[sectionKey][item.id]
              : { completed: false, updatedAt: null };
          const itemId = `${idPrefix}-${sectionKey}-${item.id}-${release.id}`;

          const listItem = doc.createElement('li');
          listItem.className = 'documentation-release-item';
          sectionList.appendChild(listItem);

          const label = doc.createElement('label');
          label.setAttribute('for', itemId);
          label.textContent = resolveLocaleString(item.labelKey) || item.id;
          listItem.appendChild(label);

          const checkbox = doc.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = itemId;
          checkbox.dataset.section = sectionKey;
          checkbox.dataset.item = item.id;
          checkbox.checked = status.completed === true;
          checkbox.disabled = release.archived === true;
          listItem.insertBefore(checkbox, label);

          if (status.updatedAt) {
            const time = doc.createElement('span');
            time.className = 'documentation-release-item-time';
            time.textContent = formatDocumentationTrackerTimestamp(status.updatedAt, {
              includeTime: true,
            });
            listItem.appendChild(time);
          }
        });
      });

      const notesWrapper = doc.createElement('div');
      notesWrapper.className = 'documentation-release-notes';
      body.appendChild(notesWrapper);

      const notesInputId = `${idPrefix}Notes-${release.id}`;
      const notesLabel = doc.createElement('label');
      notesLabel.setAttribute('for', notesInputId);
      notesLabel.textContent =
        resolveLocaleString('documentationTrackerNotesLabel') || 'Verification notes';
      notesWrapper.appendChild(notesLabel);

      const notesInput = doc.createElement('textarea');
      notesInput.id = notesInputId;
      notesInput.dataset.field = 'notes';
      notesInput.value = release.notes || '';
      notesInput.maxLength = DOCUMENTATION_TRACKER_MAX_NOTES_LENGTH;
      if (release.archived) {
        notesInput.disabled = true;
      }
      const notesPlaceholder = resolveLocaleString('documentationTrackerNotesPlaceholder');
      if (notesPlaceholder) {
        notesInput.placeholder = notesPlaceholder;
      }
      notesWrapper.appendChild(notesInput);

      const footer = doc.createElement('footer');
      footer.className = 'documentation-release-footer';
      body.appendChild(footer);

      const progress = doc.createElement('p');
      progress.className = 'documentation-release-progress';
      progress.textContent = formatDocumentationTrackerProgress(stats.completed, stats.total);
      footer.appendChild(progress);

      const sectionSummaryList = doc.createElement('ul');
      sectionSummaryList.className = 'documentation-release-section-summary';
      footer.appendChild(sectionSummaryList);

      sectionOrder.forEach(sectionKey => {
        const sectionStats = stats.sections[sectionKey];
        if (!sectionStats || !sectionStats.total) {
          return;
        }
        const item = doc.createElement('li');
        item.textContent = formatDocumentationTrackerSectionProgress(
          sectionKey,
          sectionStats.completed,
          sectionStats.total,
        );
        sectionSummaryList.appendChild(item);
      });

      const timestamps = doc.createElement('div');
      timestamps.className = 'documentation-release-timestamps';
      footer.appendChild(timestamps);

      if (release.updatedAt) {
        const updated = doc.createElement('span');
        updated.className = 'documentation-release-updated';
        const updatedTemplate = resolveLocaleString('documentationTrackerUpdatedAt') || 'Updated {time}';
        updated.textContent = updatedTemplate.replace(
          '{time}',
          formatDocumentationTrackerTimestamp(release.updatedAt, { includeTime: true }) || '',
        );
        timestamps.appendChild(updated);
      }

      if (release.targetDate) {
        const target = doc.createElement('span');
        target.className = 'documentation-release-target';
        const targetTemplate = resolveLocaleString('documentationTrackerTargetSummary') || 'Target {date}';
        target.textContent = targetTemplate.replace(
          '{date}',
          formatDocumentationTrackerTimestamp(release.targetDate, { dateOnly: true }) || '',
        );
        timestamps.appendChild(target);
      }

      return container;
    }

    function renderDocumentationTracker() {
      refreshDocumentationTrackerElements();

      if (!elements.list) {
        return;
      }

      while (elements.list.firstChild) {
        elements.list.removeChild(elements.list.firstChild);
      }

      if (!state.releases.length) {
        elements.list.setAttribute('hidden', '');
        if (elements.emptyState) {
          elements.emptyState.removeAttribute('hidden');
        }
        if (elements.summary) {
          elements.summary.setAttribute('hidden', '');
          elements.summary.textContent = '';
        }
        return;
      }

      elements.list.removeAttribute('hidden');
      if (elements.emptyState) {
        elements.emptyState.setAttribute('hidden', '');
      }

      state.releases.forEach(release => {
        const element = createDocumentationReleaseElement(release);
        if (element) {
          elements.list.appendChild(element);
        }
      });

      if (focusTargetId && doc) {
        const focusEl = doc.getElementById(focusTargetId);
        if (focusEl && typeof focusEl.focus === 'function') {
          try {
            focusEl.focus({ preventScroll: true });
          } catch (error) {
            focusEl.focus();
            void error;
          }
        }
        focusTargetId = '';
      }

      if (pendingHighlightId && doc) {
        const highlightEl = doc.getElementById(pendingHighlightId);
        if (highlightEl && typeof highlightEl.scrollIntoView === 'function') {
          try {
            highlightEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } catch (error) {
            highlightEl.scrollIntoView();
            void error;
          }
        }
        if (highlightEl) {
          highlightEl.classList.add('documentation-release-highlight');
          setTimeout(() => {
            highlightEl.classList.remove('documentation-release-highlight');
          }, 1600);
        }
        pendingHighlightId = '';
      }

      if (!elements.summary) {
        return;
      }

      if (!state.releases.length) {
        elements.summary.setAttribute('hidden', '');
        elements.summary.textContent = '';
        return;
      }

      const activeRelease = state.releases.find(release => release && release.archived !== true)
        || state.releases[0];
      if (!activeRelease) {
        elements.summary.setAttribute('hidden', '');
        elements.summary.textContent = '';
        return;
      }

      const name = activeRelease.name
        || resolveLocaleString('documentationTrackerFallbackReleaseName')
        || 'Release log';
      const stats = computeDocumentationReleaseStats(activeRelease);
      const pendingTemplate = resolveLocaleString('documentationTrackerSummaryPending')
        || '{name}: {remaining} items remaining';
      const completeTemplate = resolveLocaleString('documentationTrackerSummaryComplete')
        || '{name}: all documentation prepared';
      const summary = stats.remaining > 0
        ? pendingTemplate
          .replace('{name}', name)
          .replace('{remaining}', String(stats.remaining))
        : completeTemplate.replace('{name}', name);
      elements.summary.textContent = summary;
      elements.summary.removeAttribute('hidden');
    }

    function ensureReleaseLimit() {
      if (initialized && state.releases.length >= 200) {
        state.releases.pop();
      }
    }

    function addDocumentationRelease() {
      const release = createDocumentationTrackerRelease();
      ensureReleaseLimit();
      state.releases.unshift(release);
      focusTargetId = `${idPrefix}Name-${release.id}`;
      pendingHighlightId = release.id;
      persistDocumentationTrackerState();
      renderDocumentationTracker();
      return release;
    }

    function markDocumentationReleaseComplete(release, completed) {
      if (!release || !release.statuses) {
        return;
      }
      const timestamp = documentationTrackerIsoNow();
      sectionOrder.forEach(sectionKey => {
        const map = release.statuses[sectionKey];
        if (!map || typeof map !== 'object') {
          return;
        }
        Object.keys(map).forEach(itemId => {
          if (itemId === '__proto__' || itemId === 'constructor' || itemId === 'prototype') {
            return;
          }
          map[itemId] = {
            completed,
            updatedAt: timestamp,
          };
        });
      });
      release.updatedAt = timestamp;
    }

    function toggleDocumentationReleaseArchiveState(release, options = {}) {
      if (!release) {
        return;
      }
      const { confirmArchive = true } = options || {};
      if (!release.archived && confirmArchive && typeof scope.confirm === 'function') {
        const template = resolveLocaleString('documentationTrackerArchiveConfirm')
          || 'Archive "{name}"? Completed items stay logged for future audits.';
        const name = release.name
          || resolveLocaleString('documentationTrackerFallbackReleaseName')
          || 'Release';
        const message = template.replace('{name}', name);
        if (!scope.confirm(message)) {
          return;
        }
      }
      release.archived = !release.archived;
      release.updatedAt = documentationTrackerIsoNow();
      persistDocumentationTrackerState();
      renderDocumentationTracker();
    }

    function handleDocumentationTrackerAddRelease(event) {
      if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
      addDocumentationRelease();
    }

    function handleDocumentationTrackerChange(event) {
      const target = event && event.target;
      if (!target || !target.dataset) {
        return;
      }
      const sectionKey = target.dataset.section;
      const itemId = target.dataset.item;
      if (!sectionKey || !itemId) {
        return;
      }
      const info = getDocumentationReleaseForElement(target);
      if (!info || !info.release || info.release.archived) {
        return;
      }
      const { release } = info;
      const map = release.statuses && release.statuses[sectionKey]
        ? release.statuses[sectionKey]
        : null;
      if (!map) {
        return;
      }
      const entry = map[itemId] || { completed: false, updatedAt: null };
      entry.completed = target.checked === true;
      entry.updatedAt = target.checked === true ? documentationTrackerIsoNow() : null;
      map[itemId] = entry;
      release.updatedAt = documentationTrackerIsoNow();
      focusTargetId = target.id || '';
      persistDocumentationTrackerState();
      renderDocumentationTracker();
    }

    function handleDocumentationTrackerInput(event) {
      const target = event && event.target;
      if (!target || !target.dataset) {
        return;
      }
      const field = target.dataset.field;
      if (!field) {
        return;
      }
      const info = getDocumentationReleaseForElement(target);
      if (!info || !info.release || info.release.archived) {
        return;
      }
      const { release } = info;
      if (field === 'name') {
        release.name = target.value || '';
        release.updatedAt = documentationTrackerIsoNow();
        focusTargetId = target.id || '';
        persistDocumentationTrackerState();
        return;
      }
      if (field === 'date') {
        release.targetDate = target.value || '';
        release.updatedAt = documentationTrackerIsoNow();
        focusTargetId = target.id || '';
        persistDocumentationTrackerState();
        renderDocumentationTracker();
        return;
      }
      if (field === 'notes') {
        release.notes = target.value || '';
        release.updatedAt = documentationTrackerIsoNow();
        focusTargetId = target.id || '';
        persistDocumentationTrackerState({ skipSort: true });
        return;
      }
    }

    function handleDocumentationTrackerBlur(event) {
      const target = event && event.target;
      if (!target || !target.dataset) {
        return;
      }
      const field = target.dataset.field;
      if (!field) {
        return;
      }
      const info = getDocumentationReleaseForElement(target);
      if (!info || !info.release || info.release.archived) {
        return;
      }
      const { release } = info;
      if (field === 'name' || field === 'notes') {
        release.updatedAt = documentationTrackerIsoNow();
        focusTargetId = target.id || '';
        persistDocumentationTrackerState();
        renderDocumentationTracker();
      }
    }

    function handleDocumentationTrackerClick(event) {
      const target = event && event.target;
      if (!target || !target.dataset) {
        return;
      }
      const role = target.dataset.role;
      if (!role) {
        return;
      }
      const info = getDocumentationReleaseForElement(target);
      if (!info || !info.release) {
        return;
      }
      const { release } = info;
      if (role === 'mark-all-complete') {
        if (release.archived) {
          return;
        }
        focusTargetId = target.id || '';
        markDocumentationReleaseComplete(release, true);
        persistDocumentationTrackerState();
        renderDocumentationTracker();
        return;
      }
      if (role === 'toggle-archive') {
        toggleDocumentationReleaseArchiveState(release);
      }
    }

    function attachEventListeners() {
      if (elements.addButton && typeof elements.addButton.addEventListener === 'function') {
        elements.addButton.addEventListener('click', handleDocumentationTrackerAddRelease);
      }
      if (!elements.list || typeof elements.list.addEventListener !== 'function') {
        return;
      }
      elements.list.addEventListener('change', handleDocumentationTrackerChange);
      elements.list.addEventListener('input', handleDocumentationTrackerInput);
      elements.list.addEventListener('blur', handleDocumentationTrackerBlur, true);
      elements.list.addEventListener('click', handleDocumentationTrackerClick);
    }

    function detachEventListeners() {
      if (elements.addButton && typeof elements.addButton.removeEventListener === 'function') {
        elements.addButton.removeEventListener('click', handleDocumentationTrackerAddRelease);
      }
      if (!elements.list || typeof elements.list.removeEventListener !== 'function') {
        return;
      }
      elements.list.removeEventListener('change', handleDocumentationTrackerChange);
      elements.list.removeEventListener('input', handleDocumentationTrackerInput);
      elements.list.removeEventListener('blur', handleDocumentationTrackerBlur, true);
      elements.list.removeEventListener('click', handleDocumentationTrackerClick);
    }

    let domReadyInitializationScheduled = false;

    function scheduleDomReadyInitialization() {
      if (domReadyInitializationScheduled || !doc) {
        return;
      }
      if (doc.readyState === 'loading' && typeof doc.addEventListener === 'function') {
        domReadyInitializationScheduled = true;
        doc.addEventListener('DOMContentLoaded', handleDomReadyInitialization, {
          once: true,
        });
      }
    }

    function handleDomReadyInitialization() {
      domReadyInitializationScheduled = false;
      initialize();
    }

    function initialize() {
      if (initialized) {
        return;
      }
      refreshDocumentationTrackerElements();
      if (!elements.card || !elements.list) {
        scheduleDomReadyInitialization();
        return;
      }
      initialized = true;
      loadDocumentationTrackerStateFromStorage();
      renderDocumentationTracker();
      attachEventListeners();
    }

    function isInitialized() {
      return initialized;
    }

    function updateLocalization(localization = {}) {
      refreshDocumentationTrackerElements();

      if (localization && typeof localization.language === 'string') {
        currentLanguage = localization.language;
      }
      if (localization && isObject(localization.texts)) {
        localizationBundle = localization.texts;
      }
      if (localization && isObject(localization.fallbackTexts)) {
        localizationFallback = localization.fallbackTexts;
      }

      if (elements.heading) {
        const heading =
          resolveLocaleString('documentationTrackerHeading') || elements.heading.textContent;
        elements.heading.textContent = heading;
      }
      if (elements.description) {
        const description =
          resolveLocaleString('documentationTrackerDescription') || elements.description.textContent;
        elements.description.textContent = description;
      }
      if (elements.addButton) {
        const addLabel =
          resolveLocaleString('documentationTrackerAddRelease') || elements.addButton.textContent;
        elements.addButton.textContent = addLabel;
      }
      if (elements.emptyState) {
        const empty =
          resolveLocaleString('documentationTrackerEmpty') || elements.emptyState.textContent;
        elements.emptyState.textContent = empty;
      }
      if (elements.summary && elements.summary.hasAttribute('hidden')) {
        const summaryIntro =
          resolveLocaleString('documentationTrackerSummaryIntro') || elements.summary.textContent;
        elements.summary.textContent = summaryIntro;
      }

      if (initialized) {
        renderDocumentationTracker();
      }
    }

    function destroy() {
      detachEventListeners();
      if (domReadyInitializationScheduled && doc && typeof doc.removeEventListener === 'function') {
        doc.removeEventListener('DOMContentLoaded', handleDomReadyInitialization);
        domReadyInitializationScheduled = false;
      }
      initialized = false;
    }

    return {
      initialize,
      isInitialized,
      render: renderDocumentationTracker,
      updateLocalization,
      destroy,
    };
  }

  const namespace = {
    createDocumentationTrackerManager,
  };

  const globalScope = resolveGlobalScope();
  if (globalScope) {
    globalScope.cineCoreAppSettingsDocumentationTracker = namespace;
  }
  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
