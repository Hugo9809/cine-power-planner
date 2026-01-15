const fs = require('fs');
const path = require('path');

describe('Help View search TOC sync', () => {
    const loadHelpView = () => {
        const scriptPath = path.resolve(__dirname, '../../src/scripts/v2/views/help-view.js');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');
        const patchedContent = scriptContent.replace(
            'export const cineHelpView',
            'const cineHelpView'
        );
        eval(patchedContent);
    };

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="v2HelpToc"></div>
            <div id="v2HelpContent"></div>
            <div class="v2-help-search">
                <input id="v2HelpSearch" />
            </div>
        `;

        if (typeof HTMLElement !== 'undefined' && !('innerText' in HTMLElement.prototype)) {
            Object.defineProperty(HTMLElement.prototype, 'innerText', {
                get() {
                    return this.textContent;
                },
                set(value) {
                    this.textContent = value;
                }
            });
        }

        window.texts = {
            en: {
                helpServiceUnavailable: 'Help service unavailable',
                helpSearchNoResultsTitle: 'No results',
                helpSearchNoResultsHint: 'Try another search',
                helpSearchClearLabel: 'Clear search'
            }
        };
        window.currentLanguage = 'en';

        window.ICON_GLYPHS = {
            resetView: 'x',
            distance: 'y'
        };

        window.cineHelpService = {
            getGroupedSections: () => ({
                essentials: {
                    title: 'Essentials',
                    items: [
                        {
                            id: 'saveBackup',
                            title: 'Save & Backup',
                            keywords: 'backup restore',
                            content: 'Save your project safely.'
                        }
                    ]
                },
                guide: {
                    title: 'Guide',
                    items: [
                        {
                            id: 'importProject',
                            title: 'Import',
                            keywords: 'restore',
                            content: 'Import your project.'
                        }
                    ]
                },
                reference: {
                    title: 'Reference',
                    items: []
                }
            })
        };

        loadHelpView();
        window.cineHelpView.init();
    });

    afterEach(() => {
        delete window.cineHelpView;
        delete window.cineHelpService;
        delete window.ICON_GLYPHS;
        delete window.texts;
        delete window.currentLanguage;
    });

    test('search filters TOC items and collapses headers', () => {
        const searchInput = document.getElementById('v2HelpSearch');
        const tocLinks = Array.from(document.querySelectorAll('.v2-help-toc-link'));
        const saveLink = tocLinks.find(link => link.dataset.target === 'saveBackup');
        const importLink = tocLinks.find(link => link.dataset.target === 'importProject');

        expect(saveLink).toBeTruthy();
        expect(importLink).toBeTruthy();
        expect(saveLink.dataset.title).toBe('Save & Backup');
        expect(saveLink.dataset.keywords).toBe('backup restore');

        searchInput.value = 'backup';
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));

        const saveSection = document.getElementById('saveBackup');
        const importSection = document.getElementById('importProject');

        expect(saveSection.style.display).toBe('block');
        expect(importSection.style.display).toBe('none');
        expect(saveLink.parentElement.style.display).toBe('block');
        expect(importLink.parentElement.style.display).toBe('none');

        const headers = Array.from(document.querySelectorAll('.v2-help-toc-header'));
        const essentialsHeader = headers.find(header => header.textContent === 'Essentials');
        const guideHeader = headers.find(header => header.textContent === 'Guide');

        expect(essentialsHeader.style.display).toBe('block');
        expect(guideHeader.style.display).toBe('none');
    });

    test('shows no results state and hides headers when nothing matches', () => {
        const searchInput = document.getElementById('v2HelpSearch');
        searchInput.value = 'not-found';
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));

        const noResults = document.getElementById('v2HelpNoResults');
        expect(noResults.style.display).toBe('flex');

        const tocItems = Array.from(document.querySelectorAll('.v2-help-toc-link'));
        expect(tocItems.every(link => link.parentElement.style.display === 'none')).toBe(true);

        const headers = Array.from(document.querySelectorAll('.v2-help-toc-header'));
        expect(headers.every(header => header.style.display === 'none')).toBe(true);
    });
});
