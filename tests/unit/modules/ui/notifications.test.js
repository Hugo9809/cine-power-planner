/**
 * @jest-environment jsdom
 */

import {
    showNotification,
    ensureNotificationContainer,
    getNotificationAccentColor,
    getNotificationTextColor
} from '../../../../src/scripts/modules/ui/notifications.js';

describe('UI Notifications Module', () => {
    let container;

    beforeEach(() => {
        // Clean up DOM
        document.body.innerHTML = '';
        container = null;
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe('ensureNotificationContainer', () => {
        it('creates container if missing', () => {
            expect(document.getElementById('backupNotificationContainer')).toBeNull();
            container = ensureNotificationContainer();
            expect(container).not.toBeNull();
            expect(container.id).toBe('backupNotificationContainer');
            expect(document.body.contains(container)).toBe(true);
        });

        it('reuses existing container', () => {
            const existing = document.createElement('div');
            existing.id = 'backupNotificationContainer';
            document.body.appendChild(existing);

            const result = ensureNotificationContainer();
            expect(result).toBe(existing);
            expect(document.querySelectorAll('#backupNotificationContainer').length).toBe(1);
        });

        it('adds cine-notification-stack class', () => {
            container = ensureNotificationContainer();
            expect(container.classList.contains('cine-notification-stack')).toBe(true);
        });
    });

    describe('showNotification', () => {
        it('displays a notification message', () => {
            showNotification('info', 'Test Message');

            container = document.getElementById('backupNotificationContainer');
            expect(container).not.toBeNull();
            expect(container.children.length).toBe(1);

            const note = container.children[0];
            expect(note.textContent).toBe('Test Message');
        });

        it('removes notification after duration', () => {
            showNotification('info', 'Test Message', 1000);

            container = document.getElementById('backupNotificationContainer');
            expect(container.children.length).toBe(1);

            jest.advanceTimersByTime(1000);
            expect(container.children.length).toBe(0);
        });

        it('removes container when empty', () => {
            showNotification('info', 'Test Message', 1000);

            container = document.getElementById('backupNotificationContainer');
            expect(document.body.contains(container)).toBe(true);

            jest.advanceTimersByTime(1000);
            expect(document.body.contains(container)).toBe(false);
        });
    });

    describe('Color Utils', () => {
        it('calculates text color based on background luminance', () => {
            // White -> Black text
            expect(getNotificationTextColor('#ffffff')).toBe('#000000');
            // Black -> White text
            expect(getNotificationTextColor('#000000')).toBe('#ffffff');
        });
    });
});
