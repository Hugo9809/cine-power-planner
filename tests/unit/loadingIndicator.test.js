/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';

describe('Loading Indicator Module', () => {
    let scope;
    let loadingIndicatorModule;

    beforeEach(async () => {
        jest.resetModules();
        loadingIndicatorModule = await import('../../src/scripts/modules/loading-indicator.js');

        // Clean up DOM
        document.body.innerHTML = '';
        // Mock scope
        scope = {};
        // Use fake timers
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    test('ensureContainer creates container', () => {
        expect(document.getElementById('backupNotificationContainer')).toBeNull();

        const container = loadingIndicatorModule.ensureContainer(scope);

        expect(container).not.toBeNull();
        expect(container.id).toBe('backupNotificationContainer');
        expect(document.body.contains(container)).toBe(true);

        // ensureContainer does NOT create the scope object, it only updates it if it exists.
        // So initially it should be undefined.
        expect(scope.__cineLoadingNotice).toBeUndefined();

        // Now test update logic
        scope.__cineLoadingNotice = {};
        loadingIndicatorModule.ensureContainer(scope);
        expect(scope.__cineLoadingNotice.container).toBe(container);
    });

    test('ensureIndicator creates indicator and attaches to container', () => {
        const indicator = loadingIndicatorModule.ensureIndicator(scope);

        expect(indicator).not.toBeNull();
        expect(indicator.id).toBe('cineGlobalLoadingIndicator');
        expect(document.getElementById('cineGlobalLoadingIndicator')).toBe(indicator);

        const container = document.getElementById('backupNotificationContainer');
        expect(container).not.toBeNull();
        expect(container.contains(indicator)).toBe(true);

        // Check internal structure (spinner + text)
        expect(indicator.querySelector('.cine-notification__spinner')).not.toBeNull();
        expect(indicator.querySelector('.global-loading-indicator-text')).not.toBeNull();
    });

    test('setMessageKey updates text and attributes', () => {
        loadingIndicatorModule.ensureIndicator(scope);

        // Simulate translations
        const messages = {
            preparing: 'Préparation...',
            modules: 'Chargement...'
        };
        loadingIndicatorModule.applyLocalization(messages);

        loadingIndicatorModule.setMessageKey('modules', scope);

        const indicator = document.getElementById('cineGlobalLoadingIndicator');
        const textNode = indicator.querySelector('.global-loading-indicator-text');

        expect(textNode.textContent).toBe('Chargement...');
        expect(indicator.dataset.messageKey).toBe('modules');
        expect(loadingIndicatorModule.getCurrentKey()).toBe('modules');
    });

    test('setBusy updates aria-busy', () => {
        const indicator = loadingIndicatorModule.ensureIndicator(scope);

        loadingIndicatorModule.setBusy(false);
        expect(indicator.getAttribute('aria-busy')).toBe('false');

        loadingIndicatorModule.setBusy(true);
        expect(indicator.getAttribute('aria-busy')).toBe('true');
    });

    test('handleProgress updates message based on progress', () => {
        // 0/10 -> modules
        loadingIndicatorModule.handleProgress({ detail: { index: 0, total: 10 } }, scope);
        expect(loadingIndicatorModule.getCurrentKey()).toBe('modules');

        // 1/10 -> data
        loadingIndicatorModule.handleProgress({ detail: { index: 1, total: 10 } }, scope);
        expect(loadingIndicatorModule.getCurrentKey()).toBe('data');

        // 9/10 -> almost (index 9 is the 10th item, so complete)
        loadingIndicatorModule.handleProgress({ detail: { index: 9, total: 10 } }, scope);
        expect(loadingIndicatorModule.getCurrentKey()).toBe('almost');
    });

    test('initLoadingIndicator bootstraps everything', () => {
        document.body.innerHTML = '';
        const spy = jest.spyOn(document, 'addEventListener');

        loadingIndicatorModule.initLoadingIndicator(scope);

        expect(scope.__cineLoadingNotice).toBeDefined();
        expect(document.getElementById('cineGlobalLoadingIndicator')).not.toBeNull();
        expect(spy).toHaveBeenCalledWith('cine-loader-progress', expect.any(Function));
        expect(spy).toHaveBeenCalledWith('cine-loader-complete', expect.any(Function), false);
    });
});

describe('Loading Indicator Shim', () => {
    beforeEach(() => {
        jest.resetModules();
        document.body.innerHTML = '';
        delete window.__cineLoadingNotice;
    });

    test('shim initializes global loading indicator on window', async () => {
        await import('../../src/scripts/loading-indicator-bootstrap.js');

        expect(window.__cineLoadingNotice).toBeDefined();
        expect(document.getElementById('cineGlobalLoadingIndicator')).not.toBeNull();
        expect(typeof window.__cineLoadingNotice.setMessageKey).toBe('function');
    });

    test('shim exposes expected API methods', async () => {
        await import('../../src/scripts/loading-indicator-bootstrap.js');
        const api = window.__cineLoadingNotice;
        expect(typeof api.ensureContainer).toBe('function');
        expect(typeof api.ensureIndicator).toBe('function');
        expect(typeof api.setMessageKey).toBe('function');
        expect(typeof api.applyLocalization).toBe('function');
        expect(typeof api.setBusy).toBe('function');
        expect(typeof api.refresh).toBe('function');
        expect(typeof api.getCurrentKey).toBe('function');
        expect(typeof api.getFallbackMessages).toBe('function');
    });
});
