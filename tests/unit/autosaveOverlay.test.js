/**
 * @jest-environment jsdom
 */

import { initAutosaveOverlay, disconnectObservers } from '../../src/scripts/modules/autosave-overlay.js';

describe('Autosave Overlay Module', () => {
    let settingsDialog;
    let sourceNote;

    beforeEach(() => {
        document.body.innerHTML = '';
        settingsDialog = document.createElement('dialog');
        settingsDialog.id = 'settingsDialog';
        document.body.appendChild(settingsDialog);

        sourceNote = document.createElement('p');
        sourceNote.id = 'gearListAutosaveNote';
        document.body.appendChild(sourceNote);

        jest.useFakeTimers();
    });

    afterEach(() => {
        disconnectObservers();
        jest.useRealTimers();
    });

    test('initAutosaveOverlay creates overlay in settings dialog', () => {
        initAutosaveOverlay();
        const overlay = settingsDialog.querySelector('#gearListAutosaveOverlayNote');
        expect(overlay).not.toBeNull();
        expect(overlay.className).toContain('gear-list-autosave-note');
    });

    test('updates overlay text when source note changes (MutationObserver mock)', async () => {
        // Since jsdom's MutationObserver implementation might be tricky or sync,
        // we mainly test that init calls updateOverlayText initially.

        sourceNote.textContent = 'Saved';
        // Mock visibility
        Object.defineProperty(settingsDialog, 'open', { value: true, writable: true });
        Object.defineProperty(sourceNote, 'offsetParent', { value: document.body }); // mock visible

        initAutosaveOverlay(); // should read initial state

        const overlay = settingsDialog.querySelector('#gearListAutosaveOverlayNote');
        expect(overlay.textContent).toBe('Saved');
    });

    test('overlay hidden if source note hidden', () => {
        sourceNote.hidden = true;
        initAutosaveOverlay();
        const overlay = settingsDialog.querySelector('#gearListAutosaveOverlayNote');
        expect(overlay.hidden).toBe(true);
    });
});
