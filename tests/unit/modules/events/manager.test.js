/**
 * @jest-environment jsdom
 */

import { enqueueCineUiRegistration, initAppEvents, addSafeEventListener } from '../../../../src/scripts/modules/events/manager.js';

describe('App Events Manager', () => {
    beforeEach(() => {
        window.__cineUiReadyQueue = [];
        window.cineUi = undefined;
        jest.restoreAllMocks();
    });

    test('enqueueCineUiRegistration adds to queue if cineUi not ready', () => {
        const cb = jest.fn();
        enqueueCineUiRegistration(cb);
        expect(window.__cineUiReadyQueue).toContain(cb);
        expect(cb).not.toHaveBeenCalled();
    });

    test('enqueueCineUiRegistration executes immediately if cineUi is ready', () => {
        window.cineUi = { ready: true };
        const cb = jest.fn();
        enqueueCineUiRegistration(cb);
        expect(window.__cineUiReadyQueue.length).toBe(0);
        expect(cb).toHaveBeenCalledWith(window.cineUi);
    });

    test('initAppEvents logs message', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        initAppEvents();
        expect(consoleSpy).toHaveBeenCalledWith('App Events Manager initialized');
    });

    test('addSafeEventListener attaches listener immediately if element exists', () => {
        const el = document.createElement('div');
        const handler = jest.fn();
        addSafeEventListener(el, 'click', handler);

        el.dispatchEvent(new Event('click'));
        expect(handler).toHaveBeenCalled();
    });
});
