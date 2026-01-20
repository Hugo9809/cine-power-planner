/**
 * @jest-environment jsdom
 */

import { EventBinder } from '../../../../src/scripts/modules/core/event-binder.js';

describe('EventBinder', () => {
    let mockCallbacks;
    let mockElements;
    let setupNameInput;

    beforeEach(() => {
        // Setup mock input
        setupNameInput = document.createElement('input');
        setupNameInput.id = 'setupName';
        setupNameInput.value = 'Initial';

        // Fix: Need setupSelect to calculate renameInProgress
        const setupSelect = document.createElement('select');
        setupSelect.id = 'setupSelect';
        const opt = document.createElement('option');
        opt.value = 'Old Name';
        opt.selected = true;
        setupSelect.appendChild(opt);
        document.body.appendChild(setupSelect);

        mockElements = {
            setupNameInput
        };

        mockCallbacks = {
            onSaveSession: jest.fn(),
            onExit: jest.fn(),
            onCheckSetupChanged: jest.fn(),
            onAutoSave: jest.fn()
        };

        // Mock setTimeout/clearTimeout for debounce
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
        const sel = document.getElementById('setupSelect');
        if (sel) sel.remove();
    });

    describe('bindGlobalEvents', () => {
        it('binds input listener to setupNameInput', () => {
            EventBinder.bindGlobalEvents({ callbacks: mockCallbacks, elements: mockElements });

            // Simulate input
            setupNameInput.value = 'New Name';
            setupNameInput.dispatchEvent(new Event('input'));

            // Fast forward debounce timer (500ms)
            jest.advanceTimersByTime(500);

            expect(mockCallbacks.onSaveSession).toHaveBeenCalled();
            expect(mockCallbacks.onSaveSession).toHaveBeenCalledWith({ skipGearList: true }); // rename detected
        });

        it('binds lifecycle events', () => {
            const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
            EventBinder.bindGlobalEvents({ callbacks: mockCallbacks, elements: mockElements });

            expect(addEventListenerSpy).toHaveBeenCalledWith('pagehide', mockCallbacks.onExit);
            expect(addEventListenerSpy).toHaveBeenCalledWith('beforeunload', mockCallbacks.onExit);
        });
    });

    describe('bindChangeListeners', () => {
        it('binds change event to array of elements', () => {
            const el1 = document.createElement('select');
            const el2 = document.createElement('select');
            const handler = jest.fn();

            EventBinder.bindChangeListeners([el1, el2], handler);

            el1.dispatchEvent(new Event('change'));
            expect(handler).toHaveBeenCalledTimes(1);

            el2.dispatchEvent(new Event('change'));
            expect(handler).toHaveBeenCalledTimes(2);
        });
    });
});
