/**
 * Cine Power Planner V2 - Help View
 * =================================
 * Manages the Help Center view using the Help Service.
 */

(function (global) {
    'use strict';

    const VIEW_ID = 'view-help';
    const TOC_ID = 'v2HelpToc';
    const CONTENT_ID = 'v2HelpContent';
    const SEARCH_ID = 'v2HelpSearch';

    let observer = null;
    let isInitialized = false;

    function getElement(id) {
        return document.getElementById(id);
    }

    /**
     * Render the Help Content from Service
     */
    function renderContent() {
        const target = getElement(CONTENT_ID);
        if (!target) return [];

        target.innerHTML = '';
        const tocInfo = [];

        const service = global.cineHelpService;
        if (!service) {
            target.innerHTML = '<div class="v2-empty-state"><p>Help service unavailable.</p></div>';
            return [];
        }

        const grouped = service.getGroupedSections();

        // 1. Render Getting Started (Guide)
        if (grouped.guide && grouped.guide.items.length > 0) {
            renderCategory(target, grouped.guide.title, grouped.guide.items, tocInfo, 'guide');
        }

        // Divider if both exist
        if (grouped.guide && grouped.guide.items.length > 0 &&
            grouped.reference && grouped.reference.items.length > 0) {
            const divider = document.createElement('hr');
            divider.className = 'v2-help-divider';
            target.appendChild(divider);
        }

        // 2. Render Reference
        if (grouped.reference && grouped.reference.items.length > 0) {
            renderCategory(target, grouped.reference.title, grouped.reference.items, tocInfo, 'reference');
        }

        // Add Empty State container for Search
        const emptyState = document.createElement('div');
        emptyState.id = 'v2HelpNoResults';
        emptyState.className = 'v2-help-no-results';
        emptyState.style.display = 'none';
        emptyState.innerHTML = `
            <div class="v2-help-no-results-content">
                <span class="v2-help-no-results-icon">🔍</span>
                <h3>No results found</h3>
                <p>Try adjusting your search terms.</p>
            </div>
        `;
        target.appendChild(emptyState);

        return tocInfo;
    }

    /**
     * Helper to render a category of topics
     */
    function renderCategory(container, title, items, tocList, categoryKey) {
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
                header.innerHTML = `<span class="v2-help-icon">${item.icon}</span> ${item.title}`;
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
                    link.innerHTML = `<span class="v2-toc-icon">${item.icon}</span> ${item.title}`;
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
    /**
     * Initialize search functionality
     */
    function initSearch() {
        const searchInput = getElement(SEARCH_ID);
        if (!searchInput) return;

        // Create Clear Button
        const clearBtn = document.createElement('button');
        clearBtn.className = 'v2-help-search-clear';
        clearBtn.innerHTML = '✕';
        clearBtn.style.display = 'none';
        clearBtn.ariaLabel = 'Clear search';

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

    /**
     * Initialize the view
     */
    function init() {
        if (isInitialized) return;

        console.log('[HelpView] Initializing...');

        refresh();
        initSearch();

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

    // Public API
    global.cineHelpView = {
        init,
        enter,
        refresh
    };

})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
