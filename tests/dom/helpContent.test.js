const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('Help Content Feature', () => {
    let env;

    beforeEach(() => {
        env = setupScriptEnvironment({
            globals: {
                cineModuleBase: {
                    registerOrQueueModule: (name, api) => {
                        // Mock registration
                    },
                    exposeGlobal: (name, api, scope) => {
                        scope[name] = api;
                    },
                    getModuleRegistry: () => ({})
                },
                cineCoreLocalization: {
                    getString: (key) => {
                        if (key.includes('.title')) return 'Test Title';
                        if (key === 'helpTopics.shortcuts.content') return 'Here are shortcuts:\n\n- **Key**: Action\n- **Slash**: Search';
                        return 'Some text without lists.';
                    }
                }
            }
        });

        // Setup initial DOM
        document.body.innerHTML = `
            <div id="helpQuickLinks">
                <ul id="helpQuickLinksList"></ul>
            </div>
            <div id="helpSearch"></div>
        `;
    });

    afterEach(() => {
        env?.cleanup();
    });

    test('populates help topics with markdown parsing', () => {
        // Load the module
        jest.isolateModules(() => {
            require('../../src/scripts/modules/features/help-content.js');
        });

        // Check if module exposed itself
        expect(window.cineFeaturesHelpContent).toBeDefined();

        // Trigger population explicitly (it runs on load/DOMContentLoaded too but we want to be sure)
        window.cineFeaturesHelpContent.populateHelpTopics();

        const list = document.getElementById('helpQuickLinksList');
        // We expect multiple topics from the list in help-content.js
        expect(list.children.length).toBeGreaterThan(0);

        // We know 'shortcuts' is in the list now. Let's find it.
        // But since we mocked getString, all titles are "Test Title".
        // Wait, I should make getString return specific titles to identify them.
    });

    test('markdown parser handles lists correctly', () => {
        // We need to inject a specific mock for this test or update the beforeEach
        // Let's redefine cineCoreLocalization for this test scope if possible, 
        // or just rely on the fact that one of the topics (shortcuts) calls getString with 'helpTopics.shortcuts.content'.

        // Re-setup with specific mock
        env.cleanup();
        env = setupScriptEnvironment({
            globals: {
                cineModuleBase: {
                    registerOrQueueModule: () => { },
                    exposeGlobal: (name, api, scope) => { scope[name] = api; },
                    getModuleRegistry: () => ({})
                },
                cineCoreLocalization: {
                    getString: (key) => {
                        if (key === 'helpTopics.shortcuts.title') return 'Shortcuts';
                        if (key === 'helpTopics.shortcuts.content') return 'Preamble\n\n- **Bold**: Item 1\n- Item 2';
                        return 'Generic Content';
                    }
                }
            }
        });
        document.body.innerHTML = '<div id="helpQuickLinks"><ul id="helpQuickLinksList"></ul></div>';

        jest.isolateModules(() => {
            require('../../src/scripts/modules/features/help-content.js');
        });

        window.cineFeaturesHelpContent.populateHelpTopics();

        const list = document.getElementById('helpQuickLinksList');
        const items = Array.from(list.querySelectorAll('li'));
        const linkButtons = Array.from(list.querySelectorAll('.help-topic-link'));

        const shortcutsButton = linkButtons.find(btn => btn.textContent === 'Shortcuts');
        expect(shortcutsButton).toBeDefined();

        const contentDiv = shortcutsButton.nextElementSibling;

        // Check HTML structure
        expect(contentDiv.innerHTML).toContain('<ul>');
        expect(contentDiv.innerHTML).toContain('<li><strong>Bold</strong>: Item 1</li>');
        expect(contentDiv.innerHTML).toContain('<li>Item 2</li>');
        expect(contentDiv.innerHTML).toContain('<p>Preamble</p>');
    });
});
