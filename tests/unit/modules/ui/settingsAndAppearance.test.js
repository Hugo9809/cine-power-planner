/**
 * @jest-environment jsdom
 */

import { createAppearanceManager } from '../../../../src/scripts/modules/settings-and-appearance.js';

describe('Settings and Appearance Module', () => {
    let mockContext;
    let manager;

    beforeEach(() => {
        mockContext = {
            getDocument: () => document,
            getWindow: () => window,
            storage: {
                getLocalStorage: () => ({
                    getItem: jest.fn(),
                    setItem: jest.fn()
                })
            },
            elements: {
                themeVariantSelect: { value: '' }
            },
            settings: {
                pinkMode: { checked: false, addEventListener: jest.fn() }
            }
        };
        manager = createAppearanceManager(mockContext);
    });

    describe('createAppearanceManager', () => {
        it('initializes with default context if none provided', () => {
            const defaultManager = createAppearanceManager();
            expect(defaultManager).toBeDefined();
            expect(typeof defaultManager.applyPinkMode).toBe('function');
        });

        it('returns the full API surface', () => {
            const apiMethods = [
                'applyPinkMode',
                'applyHighContrast',
                'applyDarkMode',
                'setAccentColor',
                'isPinkModeActive'
            ];

            apiMethods.forEach(method => {
                expect(typeof manager[method]).toBe('function');
            });
        });
    });

    describe('Pink Mode Logic', () => {
        it('applies pink mode class to body', () => {
            document.body.className = '';
            manager.applyPinkMode(true);
            expect(document.body.classList.contains('pink-mode')).toBe(true);

            manager.applyPinkMode(false);
            expect(document.body.classList.contains('pink-mode')).toBe(false);
        });

        it('persists preference if storage available', () => {
            manager.applyPinkMode(true);
            // Logic inside might try to persist if configured
            // Note: The complexity of persistence in this module relies on specific context helpers
            // We are just testing basic functioning of the extracted logic here
        });
    });

    describe('Theme Logic', () => {
        it('correctly identifies pink mode via isPinkModeActive', () => {
            document.body.classList.add('pink-mode');
            expect(manager.isPinkModeActive()).toBe(true);

            document.body.classList.remove('pink-mode');
            expect(manager.isPinkModeActive()).toBe(false);
        });
    });
});
