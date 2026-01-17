/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';

describe('Static Theme Module', () => {
    let staticThemeModule;
    let scope;
    let mockLocalStorage;
    let mockMatchMedia;

    beforeEach(async () => {
        jest.resetModules();
        staticThemeModule = await import('../../src/scripts/modules/static-theme.js');

        // Setup DOM
        document.documentElement.className = '';
        document.body.className = '';
        document.documentElement.style = {};
        document.body.style = {};

        // Mock localStorage
        mockLocalStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
        };

        // Mock matchMedia
        mockMatchMedia = jest.fn((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
        }));

        // Mock scope
        scope = {
            localStorage: mockLocalStorage,
            matchMedia: mockMatchMedia,
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('applyStaticTheme applies attributes from storage', () => {
        mockLocalStorage.getItem.mockImplementation((key) => {
            if (key === 'highContrast') return 'true';
            if (key === 'darkMode') return 'true';
            if (key === 'reduceMotion') return 'true';
            return null;
        });

        staticThemeModule.applyStaticTheme(scope);

        expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
        expect(document.documentElement.classList.contains('dark-mode')).toBe(true);
        expect(document.documentElement.classList.contains('reduce-motion')).toBe(true);
    });

    test('applyStaticTheme respects system preferences fallback', () => {
        mockLocalStorage.getItem.mockReturnValue(null);
        mockMatchMedia.mockImplementation((query) => {
            if (query.includes('dark')) return { matches: true };
            if (query.includes('reduced-motion')) return { matches: true };
            return { matches: false };
        });

        staticThemeModule.applyStaticTheme(scope);

        expect(document.documentElement.classList.contains('dark-mode')).toBe(true);
        expect(document.documentElement.classList.contains('reduce-motion')).toBe(true);
    });

    test('applyStaticTheme applies custom pink mode key (migration support)', () => {
        mockLocalStorage.getItem.mockImplementation((key) => {
            if (key === 'cameraPowerPlanner_pinkMode') return 'true';
            return null;
        });

        staticThemeModule.applyStaticTheme(scope);

        expect(document.documentElement.classList.contains('pink-mode')).toBe(true);
    });

    test('applyStaticTheme clears accent styles when pink mode active', () => {
        mockLocalStorage.getItem.mockImplementation((key) => {
            if (key === 'pinkMode') return 'true';
            return null;
        });

        const spy = jest.spyOn(document.documentElement.style, 'removeProperty');

        staticThemeModule.applyStaticTheme(scope);

        expect(document.documentElement.classList.contains('pink-mode')).toBe(true);
        expect(spy).toHaveBeenCalledWith('--accent-color');
    });

    test('applyStaticTheme applies custom accent color', () => {
        mockLocalStorage.getItem.mockImplementation((key) => {
            if (key === 'accentColor') return '#ff0000';
            return null;
        });

        staticThemeModule.applyStaticTheme(scope);

        expect(document.documentElement.style.getPropertyValue('--accent-color')).toBe('#ff0000');
    });
});
