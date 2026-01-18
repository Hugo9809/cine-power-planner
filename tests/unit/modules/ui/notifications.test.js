/**
 * @jest-environment jsdom
 */
// import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// Jest globals are injected automatically

import { showNotification, resolveForceReloadOfflineNotice, ensureNotificationContainer } from '../../../../src/scripts/modules/ui/notifications.js';

describe('UI Notifications Module', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        document.body.innerHTML = '';
    });

    it('ensureNotificationContainer creates container if missing', () => {
        const container = ensureNotificationContainer();
        expect(container).toBeTruthy();
        expect(container.id).toBe('backupNotificationContainer');
        expect(document.body.contains(container)).toBe(true);
    });

    it('showNotification adds a toast to the container', () => {
        showNotification('info', 'Test Message');
        const container = document.getElementById('backupNotificationContainer');
        expect(container).toBeTruthy();
        expect(container.children.length).toBe(1);
        expect(container.children[0].textContent).toBe('Test Message');
    });

    it('resolveForceReloadOfflineNotice returns fallback if no overrides', () => {
        const notice = resolveForceReloadOfflineNotice();
        expect(notice).toContain('Force reload requires an internet connection');
    });

    it('resolveForceReloadOfflineNotice reads from DOM attributes', () => {
        const indicator = document.createElement('div');
        indicator.id = 'offlineIndicator';
        indicator.dataset.forceReloadNotice = 'Custom Offline Notice';
        document.body.appendChild(indicator);

        const notice = resolveForceReloadOfflineNotice();
        expect(notice).toBe('Custom Offline Notice');
    });
});
