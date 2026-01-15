/**
 * Cine Power Planner V2 - Help View
 * =================================
 * Manages the Help Center view using the Help Service.
 */

'use strict';

const TOC_ID = 'v2HelpToc';
const CONTENT_ID = 'v2HelpContent';
const SEARCH_ID = 'v2HelpSearch';

let observer = null;
let isInitialized = false;

function getElement(id) {
    return document.getElementById(id);
}

function _t(key) {
    if (typeof window !== 'undefined' && window.texts) {
        const langSelect = document.getElementById('languageSelect');
        const lang = (langSelect && langSelect.value) ||
            (typeof window.currentLanguage === 'string' && window.currentLanguage) ||
            'en';
        const dict = window.texts[lang] || window.texts['en'];
        if (dict) {
            return dict[key] || key;
        }
    }
    return key;
}

// Prefer shared icon markup helpers to keep Uicon glyphs consistent across V2.
function getIconMarkup(iconGlyph, className) {
    if (!iconGlyph) return '';
    const iconMarkup = window.iconMarkup || (window.cineIcons && window.cineIcons.iconMarkup);
    if (typeof iconMarkup === 'function') {
        return iconMarkup(iconGlyph, className);
    }
    const char = iconGlyph.char || iconGlyph;
    if (!char) return '';
    return `<span class="icon-glyph ${className || ''}" aria-hidden="true" data-icon-font="uicons">${char}</span>`;
}

/**
 * Render the Help Content from Service
 */
function renderContent() {
    const target = getElement(CONTENT_ID);
    if (!target) return [];

    target.innerHTML = '';
    const tocInfo = [];

    const service = window.cineHelpService;
    if (!service) {
        target.innerHTML = `<div class="v2-empty-state"><p>${_t('helpServiceUnavailable')}</p></div>`;
        return [];
    }

    const grouped = service.getGroupedSections();

    const categories = [
        grouped.essentials,
        grouped.guide,
        grouped.reference
    ].filter(category => category && category.items.length > 0);

    categories.forEach((category, index) => {
        renderCategory(target, category.title, category.items, tocInfo);

        if (index < categories.length - 1) {
            const divider = document.createElement('hr');
            divider.className = 'v2-help-divider';
            target.appendChild(divider);
        }
    });

    // Add Empty State container for Search
    const emptyState = document.createElement('div');
    emptyState.id = 'v2HelpNoResults';
    emptyState.className = 'v2-help-no-results';
    emptyState.style.display = 'none';
    const noResultsIcon = getIconMarkup(
        window.ICON_GLYPHS && window.ICON_GLYPHS.distance,
        'v2-help-no-results-icon'
    );
    emptyState.innerHTML = `
        <div class="v2-help-no-results-content">
            ${noResultsIcon}
            <h3>${_t('helpSearchNoResultsTitle')}</h3>
            <p>${_t('helpSearchNoResultsHint')}</p>
        </div>
    `;
    target.appendChild(emptyState);

    return tocInfo;
}

/**
 * Helper to render a category of topics
 */
function renderCategory(container, title, items, tocList) {
    // Add Category info to TOC list for headers
    tocList.push({ type: 'header', title: title });

    items.forEach(item => {
        const section = document.createElement('section');
        section.className = 'v2-help-section';
        section.id = item.id;
        // Add keywords for search
        section.setAttribute('data-keywords', (item.keywords || '') + ' ' + (item.title || ''));

        const header = document.createElement('h2');
        if (item.icon) {
            header.innerHTML = getIconMarkup(item.icon, 'v2-help-icon');
            header.appendChild(document.createTextNode(item.title || ''));
        } else {
            header.textContent = item.title;
        }

        const content = document.createElement('div');
        content.className = 'v2-help-content-body';
        content.innerHTML = item.content;

        section.appendChild(header);
        section.appendChild(content);
        container.appendChild(section);

        tocList.push({
            type: 'item',
            id: item.id,
            title: item.title,
            keywords: item.keywords,
            icon: item.icon // Pass icon to TOC
        });
    });
}

/**
 * Build the Table of Contents (Supporting Categories)
 */
function buildToc(tocInfo) {
    const tocContainer = getElement(TOC_ID);
    if (!tocContainer) return;

    tocContainer.innerHTML = '';
    const ul = document.createElement('ul');

    tocInfo.forEach(item => {
        if (item.type === 'header') {
            const li = document.createElement('li');
            li.className = 'v2-help-toc-header';
            li.textContent = item.title;
            ul.appendChild(li);
        } else {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${item.id}`;
            link.className = 'v2-help-toc-link';
            link.dataset.target = item.id; // Helper for scroll spy

            // Add icon if available
            if (item.icon) {
                link.innerHTML = getIconMarkup(item.icon, 'v2-toc-icon');
                link.appendChild(document.createTextNode(item.title || ''));
            } else {
                link.textContent = item.title;
            }

            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = document.getElementById(item.id);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    // Removed history.pushState to avoid conflicting with SPA router
                }
                // Manual active state set (observer will correct it shortly if needed)
                updateActiveLink(item.id);
            });

            li.appendChild(link);
            ul.appendChild(li);
        }
    });

    tocContainer.appendChild(ul);
}

function updateActiveLink(id) {
    document.querySelectorAll('.v2-help-toc-link').forEach(l => {
        if (l.dataset.target === id) {
            l.classList.add('active');
        } else {
            l.classList.remove('active');
        }
    });
}

/**
 * Initialize Scroll Spy using IntersectionObserver
 */
function initScrollSpy() {
    if (observer) observer.disconnect();

    const options = {
        root: getElement(CONTENT_ID),
        rootMargin: '-10% 0px -80% 0px', // Trigger when section is near top
        threshold: 0
    };

    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveLink(entry.target.id);
            }
        });
    };

    observer = new IntersectionObserver(callback, options);
    document.querySelectorAll('.v2-help-section').forEach(section => {
        observer.observe(section);
    });
}

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchInput = getElement(SEARCH_ID);
    if (!searchInput) return;

    // Create Clear Button
    const clearBtn = document.createElement('button');
    clearBtn.className = 'v2-help-search-clear';
    clearBtn.style.display = 'none';
    clearBtn.type = 'button';
    clearBtn.setAttribute('aria-label', _t('helpSearchClearLabel'));
    clearBtn.title = _t('helpSearchClearLabel');
    clearBtn.innerHTML = getIconMarkup(
        window.ICON_GLYPHS && window.ICON_GLYPHS.resetView,
        'v2-help-search-clear-icon'
    );

    // Append to container (assuming container is relative/flex)
    searchInput.parentNode.appendChild(clearBtn);

    function performSearch() {
        const term = searchInput.value.toLowerCase().trim();
        const sections = document.querySelectorAll('.v2-help-section');
        const noResults = getElement('v2HelpNoResults');
        let hasVisible = false;

        sections.forEach(section => {
            const text = section.innerText.toLowerCase();
            const keywords = (section.dataset.keywords || '').toLowerCase();
            const match = text.includes(term) || keywords.includes(term);

            section.style.display = match ? 'block' : 'none';
            if (match) hasVisible = true;
        });

        // Toggle Dividers visibility based on search (hide if searching)
        document.querySelectorAll('.v2-help-divider').forEach(div => {
            div.style.display = term ? 'none' : 'block';
        });

        // Show/Hide No Results
        if (noResults) {
            noResults.style.display = !hasVisible && term ? 'flex' : 'none';
        }

        // Toggle Clear Button
        clearBtn.style.display = term.length > 0 ? 'block' : 'none';
    }

    searchInput.addEventListener('input', performSearch);

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        performSearch();
        searchInput.focus();
    });
}

function updateSearchLabels() {
    const clearBtn = document.querySelector('.v2-help-search-clear');
    if (!clearBtn) return;
    const label = _t('helpSearchClearLabel');
    clearBtn.setAttribute('aria-label', label);
    clearBtn.title = label;
}

/**
 * Initialize the view
 */
function init() {
    if (isInitialized) return;

    console.log('[HelpView] Initializing...');

    if (window.cineViewManager) {
        window.cineViewManager.registerView('help', {
            onEnter: () => enter(),
            onLeave: () => { }
        });
    }

    refresh();
    initSearch();
    document.addEventListener('v2:languagechange', () => {
        refresh();
        updateSearchLabels();
    });

    isInitialized = true;
}

/**
 * Refresh logic (useful for language changes)
 */
function refresh() {
    const tocInfo = renderContent();
    if (tocInfo) {
        buildToc(tocInfo);
        // Re-init spy after content render
        setTimeout(() => initScrollSpy(), 100);
    }
}

/**
 * Prepare view when entering
 */
function enter() {
    if (!isInitialized) {
        init();
    } else {
        // Optional check for language update could go here
    }
}

export const cineHelpView = {
    init,
    enter,
    refresh
};

window.cineHelpView = cineHelpView;
