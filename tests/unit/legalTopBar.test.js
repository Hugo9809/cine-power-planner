/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';

describe('Legal Top Bar Module', () => {
    let legalTopBarModule;
    let scope;
    let mockLocalStorage;
    let mockLocation;

    beforeEach(async () => {
        jest.resetModules();
        legalTopBarModule = await import('../../src/scripts/modules/legal-topbar.js');

        // Setup DOM
        document.documentElement.className = '';
        document.body.className = '';
        document.body.innerHTML = `
      <button id="darkModeToggle" aria-pressed="false">Dark Mode</button>
      <button id="pinkModeToggle" aria-pressed="false">Pink Mode</button>
      <select id="languageSelect" data-current-value="en">
        <option value="/en">English</option>
        <option value="/fr">Français</option>
        <option value="javascript:alert(1)">Dangerous</option>
        <option value="http://evil.com">Evil</option>
      </select>
      <meta name="theme-color" content="#f9f9f9">
    `;

        // Mock localStorage
        mockLocalStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
        };

        // Mock location
        mockLocation = {
            href: 'http://localhost/page',
            protocol: 'http:',
            origin: 'http://localhost',
            assign: jest.fn(),
        };

        // Mock scope
        scope = {
            localStorage: mockLocalStorage,
            location: mockLocation,
            safeSetLocalStorage: jest.fn((k, v) => mockLocalStorage.setItem(k, v)),
        };

        // Polyfill global window properties if needed by code that falls back to 'window' directly
        // but the module uses 'scope' for most things now.
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('initTopBarControls initializes toggles', () => {
        legalTopBarModule.initTopBarControls(scope);

        const darkModeBtn = document.getElementById('darkModeToggle');
        const pinkModeBtn = document.getElementById('pinkModeToggle');

        expect(darkModeBtn.getAttribute('aria-pressed')).toBe('false');
        expect(pinkModeBtn.getAttribute('aria-pressed')).toBe('false');
    });

    test('Dark Mode toggle updates classes and storage', () => {
        legalTopBarModule.initTopBarControls(scope);
        const btn = document.getElementById('darkModeToggle');

        // Click to enable
        btn.click();
        expect(document.documentElement.classList.contains('dark-mode')).toBe(true);
        expect(document.body.classList.contains('dark-mode')).toBe(true);
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('darkMode', 'true');
        expect(document.querySelector('meta[name="theme-color"]').content).toBe('#1c1c1e');

        // Click to disable
        btn.click();
        expect(document.documentElement.classList.contains('dark-mode')).toBe(false);
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('darkMode', 'false');
    });

    test('Pink Mode toggle updates classes and storage', () => {
        legalTopBarModule.initTopBarControls(scope);
        const btn = document.getElementById('pinkModeToggle');

        // Click to enable
        btn.click();
        expect(document.documentElement.classList.contains('pink-mode')).toBe(true);
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('pinkMode', 'true');

        // Click to disable
        btn.click();
        expect(document.documentElement.classList.contains('pink-mode')).toBe(false);
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('pinkMode', 'false');
    });

    test('Language Select navigates to safe URL', () => {
        legalTopBarModule.initTopBarControls(scope);
        const select = document.getElementById('languageSelect');

        // Select French
        select.value = '/fr';
        select.dispatchEvent(new Event('change'));

        expect(mockLocation.assign).toHaveBeenCalled();
        const callArgs = mockLocation.assign.mock.calls[0][0];
        expect(callArgs).toContain('/fr');
    });

    test('Language Select blocks dangerous URLs', () => {
        legalTopBarModule.initTopBarControls(scope);
        const select = document.getElementById('languageSelect');

        // Select Javascript URI
        select.value = 'javascript:alert(1)';
        select.dispatchEvent(new Event('change'));
        expect(mockLocation.assign).not.toHaveBeenCalled();

        // Select External Domain (Cross-Origin)
        select.value = 'http://evil.com';
        select.dispatchEvent(new Event('change'));
        // Should pass allow relative, but this is absolute. 
        // The logic checks: resolvedUrl.origin !== currentLocation.origin
        // http://evil.com vs http://localhost -> should fail
        expect(mockLocation.assign).not.toHaveBeenCalled();
    });
});
