/**
 * @jest-environment jsdom
 */

import { closeStuckDialogs } from '../../src/scripts/modules/emergency-modal-cleanup.js';

describe('Emergency Modal Cleanup Module', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    test('closeStuckDialogs closes open dialog elements', () => {
        const dialog = document.createElement('dialog');
        dialog.open = true;
        dialog.close = jest.fn();
        document.body.appendChild(dialog);

        closeStuckDialogs();

        expect(dialog.close).toHaveBeenCalled();
    });

    test('closeStuckDialogs removes open attribute from app-modal elements', () => {
        const modal = document.createElement('div');
        modal.className = 'app-modal';
        modal.setAttribute('open', '');
        document.body.appendChild(modal);

        closeStuckDialogs();

        expect(modal.hasAttribute('open')).toBe(false);
    });

    test('closeStuckDialogs handles mix of dialogs and modals', () => {
        const dialog = document.createElement('dialog');
        dialog.open = true;
        dialog.close = jest.fn();
        document.body.appendChild(dialog);

        const modal = document.createElement('div');
        modal.className = 'app-modal';
        modal.setAttribute('open', '');
        document.body.appendChild(modal);

        closeStuckDialogs();

        expect(dialog.close).toHaveBeenCalled();
        expect(modal.hasAttribute('open')).toBe(false);
    });

    test('shutdown handles errors gracefully', () => {
        const dialog = document.createElement('dialog');
        dialog.open = true;

        // Mock querySelectorAll to throw
        const originalQuerySelectorAll = document.querySelectorAll;
        document.querySelectorAll = jest.fn(() => {
            throw new Error('Test Error');
        });

        // Should not throw
        expect(() => closeStuckDialogs()).not.toThrow();

        // Cleanup
        document.querySelectorAll = originalQuerySelectorAll;
    });
});
