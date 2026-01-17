/**
 * @jest-environment jsdom
 */

import { showLoading, hideLoading, ensureOverlay } from '../../src/scripts/modules/ui-feedback.js';

describe('UI Feedback Module', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('ensureOverlay creates overlay element', () => {
        ensureOverlay();
        const overlay = document.getElementById('cineGlobalOperationOverlay');
        expect(overlay).not.toBeNull();
        expect(overlay.classList.contains('cine-notification--overlay')).toBe(true);
    });

    test('showLoading displays overlay with message', () => {
        showLoading('Test Message');
        const overlay = document.getElementById('cineGlobalOperationOverlay');
        const text = document.getElementById('cineGlobalOperationText');

        expect(overlay).not.toBeNull();
        expect(overlay.hidden).toBe(false);
        expect(overlay.style.opacity).toBe('1');
        expect(text.textContent).toBe('Test Message');
    });

    test('hideLoading hides overlay', () => {
        showLoading('Test');
        hideLoading();

        const overlay = document.getElementById('cineGlobalOperationOverlay');
        expect(overlay.style.opacity).toBe('0');

        jest.runAllTimers();
        expect(overlay.hidden).toBe(true);
    });
});

describe('UI Feedback Legacy Shim', () => {
    beforeEach(() => {
        // Reset window.cineUiFeedback
        delete window.cineUiFeedback;
        jest.resetModules();
        document.body.innerHTML = '';
    });

    test('exposes global cineUiFeedback object', async () => {
        await import('../../src/scripts/ui-feedback.js');
        expect(window.cineUiFeedback).toBeDefined();
        expect(typeof window.cineUiFeedback.showLoading).toBe('function');
        expect(typeof window.cineUiFeedback.hideLoading).toBe('function');
    });

    test('global showLoading works', async () => {
        await import('../../src/scripts/ui-feedback.js');
        window.cineUiFeedback.showLoading('Global Test');
        const text = document.getElementById('cineGlobalOperationText');
        expect(text.textContent).toBe('Global Test');
    });
});
