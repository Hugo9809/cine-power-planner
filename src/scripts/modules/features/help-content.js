/* global cineModuleBase */

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



    function resolveLocalization(scope) {
        if (scope && typeof scope.cineCoreLocalization === 'object') {
            return scope.cineCoreLocalization;
        }
        return null;
    }

    function populateHelpTopics() {
        const doc = GLOBAL_SCOPE.document;
        if (!doc) return;

        const list = doc.getElementById('helpQuickLinksList');
        const nav = doc.getElementById('helpQuickLinks');

        if (!list || !nav) return;

        const localization = resolveLocalization(GLOBAL_SCOPE);
        if (!localization || typeof localization.getString !== 'function') return;

        // Clear existing items
        list.innerHTML = '';

        const topics = [
            'projectManagement',
            'deviceConfiguration',
            'powerCalculation',
            'connectionDiagram',
            'gearList',
            'contacts',
            'ownGear',
            'settings',
            'offlineUse'
        ];

        let hasTopics = false;

        topics.forEach(topicKey => {
            const title = localization.getString(`helpTopics.${topicKey}.title`);
            const content = localization.getString(`helpTopics.${topicKey}.content`);

            if (!title || !content) return;

            hasTopics = true;

            const li = doc.createElement('li');
            const button = doc.createElement('button');
            button.type = 'button';
            button.className = 'help-topic-link';
            button.textContent = title;
            button.setAttribute('aria-expanded', 'false');

            const contentDiv = doc.createElement('div');
            contentDiv.className = 'help-topic-content';
            contentDiv.hidden = true;
            contentDiv.innerHTML = `<p>${content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;

            button.addEventListener('click', () => {
                const isExpanded = button.getAttribute('aria-expanded') === 'true';

                // Close all other topics
                const allButtons = list.querySelectorAll('.help-topic-link');
                const allContents = list.querySelectorAll('.help-topic-content');

                allButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
                allContents.forEach(div => div.hidden = true);

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

    // Initialize when the module loads, but also listen for localization changes if possible
    // For now, we'll just run it on init and expose a refresh method

    const moduleApi = Object.freeze({
        populateHelpTopics,
    });

    MODULE_BASE.registerOrQueueModule(
        'cine.features.helpContent',
        moduleApi,
        {
            category: 'features',
            description: 'Populates the help dialog with topics from translations.',
            replace: true,
            connections: ['cineModuleBase', 'cineCoreUiHelpers', 'cineCoreLocalization'],
        },
        error => safeWarn('Unable to register cine.features.helpContent module.', error),
        GLOBAL_SCOPE,
        MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE),
    );

    // Hook into the app initialization or help dialog opening if possible
    // For simplicity, we'll try to run it after a short delay to ensure DOM is ready
    // and also expose it globally so the main UI logic can call it when opening the help dialog

    if (typeof MODULE_BASE.exposeGlobal === 'function') {
        MODULE_BASE.exposeGlobal('cineFeaturesHelpContent', moduleApi, GLOBAL_SCOPE, {
            configurable: true,
            enumerable: false,
            writable: false,
        });
    } else {
        try {
            GLOBAL_SCOPE.cineFeaturesHelpContent = moduleApi;
        } catch (error) {
            void error;
        }
    }

    // Try to populate immediately if DOM is ready
    if (GLOBAL_SCOPE.document && GLOBAL_SCOPE.document.readyState !== 'loading') {
        populateHelpTopics();
    } else if (GLOBAL_SCOPE.document) {
        GLOBAL_SCOPE.document.addEventListener('DOMContentLoaded', populateHelpTopics);
    }

})();
