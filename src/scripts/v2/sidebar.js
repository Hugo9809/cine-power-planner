/**
 * Cine Power Planner V2 - Sidebar Logic
 * =====================================
 * Handles sidebar interactions, specifically search functionality
 * and theme toggles (bridging to legacy app).
 */

(function (global) {
    'use strict';

    const SEARCH_CONTAINER_CLASS = 'v2-sidebar-search';
    const SEARCH_INPUT_ID = 'v2SidebarSearchInput';

    // Theme Constants
    const DARK_MODE_KEY = 'darkMode';
    const PINK_MODE_KEY = 'cameraPowerPlanner_pinkMode';
    const FALLBACK_PINK_KEY = 'pinkMode';

    function initSidebar() {
        console.log('[V2 Sidebar] Initializing...');

        // 1. Get Main Sidebar Container [FIXED SELECTOR]
        // In index.html, the container is <nav class="v2-sidebar">
        const sidebar = document.querySelector('.v2-sidebar');
        if (!sidebar) {
            console.error('[V2 Sidebar] .v2-sidebar not found. Cannot inject controls.');
            return;
        }

        // 2. Inject Components in Order
        // A. Header (Already in HTML usually, but check)
        injectSidebarHeader(sidebar);

        // B. Top Controls (Rows 1 & 2)
        injectTopControls(sidebar);

        // C. Search
        injectSearchInput(sidebar);
        setupLegacySearchProxy(); // STRICT V1 Proxy

        // 3. Initialize Logic
        initThemes();
        initNavigationLogic();
        forceHelpCloseBinding();

        // 4. Initial Translation
        const legacySelect = document.getElementById('languageSelect');
        if (legacySelect) {
            updateSidebarTranslations(legacySelect.value);
        }
    }

    function injectSidebarHeader(container) {
        if (container.querySelector('.v2-sidebar-header')) return;

        const header = document.createElement('div');
        header.className = 'v2-sidebar-header';

        const logo = document.createElement('img');
        logo.src = 'src/icons/Icon Bluenew.svg';
        logo.className = 'v2-sidebar-logo';
        logo.alt = 'Logo';

        const title = document.createElement('h1'); // V2 uses h1 in HTML now
        title.className = 'v2-sidebar-title';
        title.innerHTML = 'Cine Power<br>Planner';

        header.appendChild(logo);
        header.appendChild(title);

        // Insert at very top
        container.insertBefore(header, container.firstChild);
    }

    /**
     * [Fix] Inject Top Controls in Single Row
     * All controls in one row: Language Selector + Theme Toggles + Hard Refresh
     */
    /**
     * [Refactor] Inject Controls at Bottom (Above Footer)
     * Language Selector + Theme Toggles + Hard Refresh
     */
    function injectTopControls(container) {
        if (container.querySelector('.v2-sidebar-controls-container')) return;

        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'v2-sidebar-controls-container';
        // Add some padding/border if needed via CSS, or rely on existing styles
        // controlsContainer.style.borderTop = '1px solid var(--v2-border-default)'; // Optional separation

        // Single Row with all controls
        const row1 = document.createElement('div');
        row1.className = 'v2-controls-row-1';
        injectLanguageSelector(row1); // Language Dropdown first
        injectThemeControls(row1);    // Theme Buttons
        injectHardRefresh(row1);      // Refresh Button

        // Assemble (single row)
        controlsContainer.appendChild(row1);

        // Insert at bottom: Before Footer
        const footer = container.querySelector('.v2-sidebar-footer');
        if (footer) {
            footer.insertAdjacentElement('beforebegin', controlsContainer);
        } else {
            // Fallback: append to end
            container.appendChild(controlsContainer);
        }
    }

    /**
     * [Fix 1.8] STRICT V1 Search Proxy
     *
     * DEEP DIVE: The "Legacy Proxy" Pattern
     *
     * The V2 Search Bar is a "dumb" UI component. It does NOT contain search logic itself.
     * Instead, it acts as a remote control for the invisible Legacy Search Input (#featureSearch).
     *
     * Why?
     * The legacy app uses a complex `fuse.js` implementation tightly coupled to the DOM of the
     * hidden V1 table. Rewriting that logic immediately would risk breaking the core tool.
     *
     * Mechanism:
     * 1. EVENT MIRRORING: Typing in V2 -> triggers 'input' event on V1 input.
     * 2. KEY FORWARDING: Arrow keys in V2 -> dispatched to V1 to navigate the dropdown results.
     * 3. FOCUS SYNC: Focusing V2 -> Focuses V1 (to trigger the library dropdown).
     *
     * This allows us to ship a modern UI *today* without rewriting the search engine *yesterday*.
     */
    function setupLegacySearchProxy() {
        const input = document.getElementById(SEARCH_INPUT_ID);
        const legacyInput = document.getElementById('featureSearch');
        if (!input || !legacyInput) return;

        // Sync Input: V2 -> Legacy
        input.addEventListener('input', (e) => {
            e.stopPropagation(); // Stop 'h'/'?' interference
            legacyInput.value = e.target.value;
            legacyInput.dispatchEvent(new Event('input', { bubbles: true }));
            legacyInput.dispatchEvent(new Event('change', { bubbles: true })); // Ensure listeners fire
        });

        // Sync Focus: V2 -> Legacy (Opens Dropdown)
        input.addEventListener('focus', () => {
            legacyInput.dispatchEvent(new Event('focus', { bubbles: true }));
        });

        // Sync Blur
        input.addEventListener('blur', () => {
            // Small delay to allow clicks on dropdown
            setTimeout(() => {
                legacyInput.dispatchEvent(new Event('blur', { bubbles: true }));
            }, 200);
        });

        // Sync Keys (Arrows, Enter, Escape)
        input.addEventListener('keydown', (e) => {
            // Stop 'h' or '?' from triggering global Help IF typing
            e.stopPropagation();

            // LIMIT FORWARDING to Navigation Keys only
            const allowedKeys = ['ArrowUp', 'ArrowDown', 'Enter', 'Escape'];
            if (!allowedKeys.includes(e.key)) return;

            // Forward keys to legacy input for navigation
            const keyEvent = new KeyboardEvent('keydown', {
                key: e.key,
                code: e.code,
                keyCode: e.keyCode,
                bubbles: true,
                cancelable: true
            });
            legacyInput.dispatchEvent(keyEvent);
        });

        // [New] Dispatch V2 Search Event for Dashboard
        input.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            window.dispatchEvent(new CustomEvent('v2:search', {
                detail: { query }
            }));
        });
    }

    function injectSearchInput(container) {
        // Find insert point: After Controls
        // const controls = container.querySelector('.v2-sidebar-controls-container');

        // Check if already exists
        if (container.querySelector(`.${SEARCH_CONTAINER_CLASS}`)) return;

        const searchContainer = document.createElement('div');
        searchContainer.className = SEARCH_CONTAINER_CLASS;
        searchContainer.innerHTML = `
            <div class="v2-search-input-wrapper">
                <svg class="v2-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input type="text" id="${SEARCH_INPUT_ID}" class="v2-search-input" placeholder="Search features..." aria-label="Search features">
            </div>
        `;

        // Insert after Header (Top), independent of controls
        const header = container.querySelector('.v2-sidebar-header');
        if (header) {
            header.insertAdjacentElement('afterend', searchContainer);
        } else {
            // Fallback
            const nav = container.querySelector('.v2-sidebar-nav');
            if (nav) {
                container.insertBefore(searchContainer, nav);
            } else {
                container.insertBefore(searchContainer, container.firstChild);
            }
        }

        // [Fix 1.1] Move Legacy Dropdown Here
        setTimeout(() => {
            const legacyDropdown = document.getElementById('featureSearchDropdown');
            const wrapper = searchContainer.querySelector('.v2-search-input-wrapper');
            if (legacyDropdown && wrapper) {
                wrapper.appendChild(legacyDropdown);
                // Reset styles
                legacyDropdown.style.top = '110%';
                legacyDropdown.style.left = '0';
                legacyDropdown.style.visibility = 'visible';
                legacyDropdown.style.display = 'none'; // Initially hidden
            }
        }, 1000);
    }

    /**
     * [Fix 1.9] Force Help Close Button Binding
     * Binds a global click listener to intercept the close button
     */
    function forceHelpCloseBinding() {
        document.addEventListener('click', (e) => {
            // Check for the close button specifically or its connection to the help dialog
            const btn = e.target.closest('#closeHelp');

            if (btn) {
                e.preventDefault();
                e.stopImmediatePropagation();
                closeHelpModal();
            }
        });
    }

    function closeHelpModal() {
        const helpDialog = document.getElementById('helpDialog');
        if (helpDialog) {
            helpDialog.setAttribute('hidden', '');
            helpDialog.style.display = 'none';
            // Also try legacy global function
            if (typeof global.closeDialog === 'function') {
                global.closeDialog(helpDialog);
            }
        }
    }

    /**
     * [Fix 1.8] Navigation Logic
     *
     * DEEP DIVE: Navigation State Management
     *
     * This section handles the visual state of the sidebar to match the application routing.
     *
     * KEY CONCEPTS:
     * 1. URL SYNC: On load, it checks `window.location.hash` and highlights the matching link.
     * 2. EXCLUSIVITY: Only one link can be '.active' at a time.
     * 3. FEATURE FLAGS:
     *    - 'Auto Backups' is hidden unless `cineAutoRecover` is true in options.
     *    - This prevents feature pollution for users who haven't opted into unstable recoveries.
     */
    function initNavigationLogic() {
        // Toggle Auto Backups link based on settings
        const backupLink = document.getElementById('navAutoBackups');
        if (backupLink) {
            const autoRecover = localStorage.getItem('cineAutoRecover') === 'true';
            backupLink.style.display = autoRecover ? 'flex' : 'none';
        }

        const navLinks = document.querySelectorAll('.v2-sidebar-nav .v2-sidebar-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Set initial active state
        const hash = window.location.hash;
        if (hash) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === hash) {
                    link.classList.add('active');
                }
            });
        }
    }

    // =====================
    // CONTROLS INJECTION
    // =====================

    function injectLanguageSelector(container) {
        if (!container || container.querySelector('.v2-lang-select-wrapper')) return;

        const legacySelect = document.getElementById('languageSelect');
        const currentLang = legacySelect ? legacySelect.value : 'en';

        const wrapper = document.createElement('div');
        wrapper.className = 'v2-lang-select-wrapper';

        // Full language names as requested
        wrapper.innerHTML = `
            <select class="v2-lang-select" aria-label="Select Language">
                <option value="en" ${currentLang === 'en' ? 'selected' : ''}>English</option>
                <option value="de" ${currentLang === 'de' ? 'selected' : ''}>Deutsch</option>
                <option value="es" ${currentLang === 'es' ? 'selected' : ''}>Español</option>
                <option value="fr" ${currentLang === 'fr' ? 'selected' : ''}>Français</option>
                <option value="it" ${currentLang === 'it' ? 'selected' : ''}>Italiano</option>
            </select>
        `;

        const select = wrapper.querySelector('select');
        select.addEventListener('change', (e) => {
            const newVal = e.target.value;
            if (legacySelect) {
                legacySelect.value = newVal;
                legacySelect.dispatchEvent(new Event('change', { bubbles: true }));

                if (typeof global.updateLanguage === 'function') {
                    global.updateLanguage(newVal);
                }
                updateSidebarTranslations(newVal);
            }
        });

        // Sync back from legacy
        if (legacySelect) {
            legacySelect.addEventListener('change', () => {
                if (select.value !== legacySelect.value) {
                    select.value = legacySelect.value;
                    updateSidebarTranslations(legacySelect.value);
                }
            });
        }

        container.appendChild(wrapper);
    }

    function injectHardRefresh(container) {
        if (container.querySelector('#v2RefreshBtn')) return;

        const btn = document.createElement('button');
        btn.className = 'v2-tool-btn';
        btn.id = 'v2RefreshBtn';
        btn.title = 'Force reload';
        btn.setAttribute('aria-label', 'Force reload');
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polyline points="23 4 23 10 17 10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `;

        btn.addEventListener('click', () => {
            const legacyBtn = document.getElementById('reloadButton');
            if (legacyBtn) {
                legacyBtn.click();
            } else {
                window.location.reload(true);
            }
        });

        container.appendChild(btn);
    }

    // Note: injectDatabaseToggle was removed - device database is now
    // accessed via the Device Library view in the V2 sidebar navigation.

    /**
     * [New] Sidebar Translations
     * Updates sidebar text based on current language
     */
    /**
     * [New] Sidebar Translations
     * Updates sidebar text based on current language
     */
    function updateSidebarTranslations(lang) {
        // 1. Try Global Translations first
        const t = (key) => {
            if (window.texts && window.texts[key]) return window.texts[key];
            return null;
        };

        const translations = {
            'de': {
                'All Projects': 'Alle Projekte',
                'Active Projects': 'Aktive Projekte',
                'Archive': 'Archiv',
                'Auto Backups': 'Auto-Backups',
                'Device Library': 'Geräte-Bibliothek',
                'Contacts': 'Kontakte',
                'Auto Gear Rules': 'Auto-Gear Regeln',
                'Owned Gear': 'Eigenes Equipment',
                'Create New Project': 'Neues Projekt erstellen',
                'Projects': 'Projekte',
                'Tools': 'Werkzeuge',
                'Support': 'Support',
                'Help': 'Hilfe',
                'Settings': 'Einstellungen'
            },
            'es': {
                'All Projects': 'Todos los proyectos',
                'Active Projects': 'Proyectos activos',
                'Archive': 'Archivo',
                'Auto Backups': 'Copias de seguridad',
                'Device Library': 'Biblioteca de dispositivos',
                'Contacts': 'Contacts',
                'Auto Gear Rules': 'Reglas automáticas',
                'Owned Gear': 'Equipo propio',
                'Create New Project': 'Crear nuevo proyecto',
                'Projects': 'Proyectos',
                'Tools': 'Herramientas',
                'Support': 'Soporte',
                'Help': 'Ayuda',
                'Settings': 'Configuración'
            },
            'fr': {
                'All Projects': 'Tous les projets',
                'Active Projects': 'Projets actifs',
                'Archive': 'Archives',
                'Auto Backups': 'Sauvegardes auto',
                'Device Library': 'Bibliothèque',
                'Contacts': 'Contacts',
                'Auto Gear Rules': 'Règles auto',
                'Owned Gear': 'Mon matériel',
                'Create New Project': 'Créer un projet',
                'Projects': 'Projets',
                'Tools': 'Outils',
                'Support': 'Support',
                'Help': 'Aide',
                'Settings': 'Paramètres'
            },
            'it': {
                'All Projects': 'Tutti i progetti',
                'Active Projects': 'Progetti attivi',
                'Archive': 'Archivio',
                'Auto Backups': 'Backup auto',
                'Device Library': 'Libreria',
                'Contacts': 'Contatti',
                'Auto Gear Rules': 'Regole auto',
                'Owned Gear': 'Attrezzatura',
                'Create New Project': 'Nuovo progetto',
                'Projects': 'Progetti',
                'Tools': 'Strumenti',
                'Support': 'Supporto',
                'Help': 'Aiuto',
                'Settings': 'Impostazioni'
            }
        };

        const map = translations[lang];
        const textElements = document.querySelectorAll('.v2-sidebar-link-text, .v2-sidebar-section-title');

        textElements.forEach(el => {
            if (!el.dataset.key) el.dataset.key = el.textContent.trim();
            const key = el.dataset.key; // e.g. "Settings"

            // Try explicit V2 key if mapped, or constructing one
            // Ideally we'd map "Settings" -> "sidebarSettings" but let's see if we can just use the map for now 
            // OR use window.texts directly if keys match.
            // Since we don't have perfect key mapping, we'll stick to the map as primary for sidebar 
            // BUT check if a global override exists.

            // Actually, for consistency with the rest of V2, let's prioritize the map 
            // UNLESS we want to move sidebar trans to en.js completely.
            // For now, let's just make sure it triggers correctly.

            if (map && map[key]) {
                el.textContent = map[key];
            } else if (key) {
                // Formatting fallback or English
                el.textContent = key;
            }
        });
    }

    // Expose for external calls
    global.updateSidebarTranslations = updateSidebarTranslations;

    // =====================
    // THEME HANDLING
    // =====================

    function initThemes() {
        // Theme controls are injected via injectTopControls -> injectThemeControls
        applyStoredThemes();
    }

    function injectThemeControls(container) {
        // Prevent duplicate injection
        if (container.querySelector('#v2ThemeToggleDark')) return;

        // Dark Mode Toggle - V1 Style
        const darkBtn = document.createElement('button');
        darkBtn.className = 'v2-theme-toggle';
        darkBtn.id = 'v2ThemeToggleDark';
        darkBtn.setAttribute('aria-label', 'Toggle dark mode');
        darkBtn.setAttribute('aria-pressed', 'false');
        darkBtn.setAttribute('title', 'Toggle dark mode');
        // Use V1 uicons glyphs for Moon and Sun
        darkBtn.innerHTML = `
            <span class="v2-icon-moon icon-glyph" aria-hidden="true" data-icon-font="uicons">&#xEC7E;</span>
            <span class="v2-icon-sun icon-glyph" aria-hidden="true" data-icon-font="uicons" style="display:none">&#xF1FE;</span>
        `;
        darkBtn.addEventListener('click', toggleDarkMode);

        // Pink Mode Toggle - V1 Style with Capybara SVG
        const pinkBtn = document.createElement('button');
        pinkBtn.className = 'v2-theme-toggle';
        pinkBtn.id = 'v2ThemeTogglePink';
        pinkBtn.setAttribute('aria-label', 'Toggle pink mode');
        pinkBtn.setAttribute('aria-pressed', 'false');
        pinkBtn.setAttribute('title', 'Toggle pink mode');
        pinkBtn.setAttribute('data-theme', 'pink');
        // V1 Capybara SVG
        pinkBtn.innerHTML = `
            <span class="icon-glyph icon-svg pink-mode-icon" aria-hidden="true">
                <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z" fill="#805333" />
                    <path d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z" fill="#a56a43" />
                    <path d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z" fill="#cb8252" />
                    <circle cx="42" cy="26" r="3" fill="#2c2f38" />
                    <circle cx="54" cy="43" r="1" fill="#805333" />
                    <path d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z" fill="#cf976a" />
                    <circle cx="41" cy="25" r="1.25" fill="#ecf0f1" />
                </svg>
            </span>
        `;
        pinkBtn.addEventListener('click', togglePinkMode);

        container.appendChild(darkBtn);
        container.appendChild(pinkBtn);
    }

    function applyStoredThemes() {
        const isDark = localStorage.getItem(DARK_MODE_KEY) === 'true';
        updateDarkModeDisplay(isDark);
        const isPink = localStorage.getItem(PINK_MODE_KEY) === 'true';
        updatePinkModeDisplay(isPink);
    }

    function toggleDarkMode() {
        const isDark = document.body.classList.contains('dark-mode');
        const newState = !isDark;
        updateDarkModeDisplay(newState);
        localStorage.setItem(DARK_MODE_KEY, newState);
    }

    function updateDarkModeDisplay(enabled) {
        document.body.classList.toggle('dark-mode', enabled);
        document.body.classList.toggle('light-mode', !enabled);
        const btn = document.getElementById('v2ThemeToggleDark');
        if (btn) {
            btn.classList.toggle('active', enabled);
            const moon = btn.querySelector('.v2-icon-moon');
            const sun = btn.querySelector('.v2-icon-sun');
            if (moon && sun) {
                moon.style.display = enabled ? 'none' : 'block';
                sun.style.display = enabled ? 'block' : 'none';
            }
        }
    }

    function togglePinkMode() {
        const isPink = document.body.classList.contains('pink-mode');
        const newState = !isPink;
        updatePinkModeDisplay(newState);
        localStorage.setItem(PINK_MODE_KEY, newState);
        localStorage.setItem(FALLBACK_PINK_KEY, newState);
    }

    function updatePinkModeDisplay(enabled) {
        document.body.classList.toggle('pink-mode', enabled);
        updateAppLogo(enabled);
        const btn = document.getElementById('v2ThemeTogglePink');
        if (btn) btn.classList.toggle('active', enabled);
    }

    function updateAppLogo(isPink) {
        const logo = document.querySelector('.v2-sidebar-logo');
        if (!logo) return;
        logo.src = isPink ? 'src/icons/Icon Pinknew.svg' : 'src/icons/Icon Bluenew.svg';
    }

    // Expose
    global.cineV2Sidebar = {
        init: initSidebar
    };

})(typeof window !== 'undefined' ? window : this);
