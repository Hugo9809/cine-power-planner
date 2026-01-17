/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';

describe('Force Populate Module', () => {
    let forcePopulateModule;
    let scope;
    let mockBootstrap;
    let mockDocument;

    beforeEach(async () => {
        jest.useFakeTimers();
        jest.resetModules();
        forcePopulateModule = await import('../../src/scripts/modules/force-populate.js');

        // Mock document elements
        mockDocument = {
            getElementById: jest.fn(),
            body: {
                classList: {
                    add: jest.fn(),
                },
            },
        };

        // Mock scope
        scope = {
            document: mockDocument,
            devices: null, // Start empty
            populateSelect: jest.fn(),
            processCoreBootQueue: jest.fn(),
            CORE_BOOT_QUEUE: [],
            dispatchEvent: jest.fn(),
        };

        // Mock Bootstrap
        mockBootstrap = {
            init: jest.fn(),
        };

        // Mock global CustomEvent if needed (jsdom usually has it, but just in case)
        if (typeof CustomEvent === 'undefined') {
            global.CustomEvent = class CustomEvent {
                constructor(name) { this.name = name; }
            };
        }
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    test('startForcePopulate waits for dependencies', () => {
        // Start without devices
        forcePopulateModule.startForcePopulate(scope, mockBootstrap);

        expect(scope.populateSelect).not.toHaveBeenCalled();
        expect(mockBootstrap.init).not.toHaveBeenCalled();

        // Advance time - still nothing
        jest.advanceTimersByTime(200);
        expect(scope.populateSelect).not.toHaveBeenCalled();

        // Provide dependencies
        scope.devices = {
            cameras: { cam1: 'Camera 1' },
            monitors: {}, fiz: {}, video: {}, batteries: {}, batteryHotswaps: {}
        };
        scope.populateSelect = jest.fn();

        // Advance time
        jest.advanceTimersByTime(200);

        // NOTE: In the module, we try to populate via document.getElementById.
        // We need to mock that return value for calls to happen.
        const mockSelect = { options: { length: 0 } };
        mockDocument.getElementById.mockReturnValue(mockSelect);

        // But simply providing devices should trigger the *attempt*. 
        // We might fail inside access if element missing, but deps check should pass.

        // Actually, the module loop will succeed returning true once deps are there, 
        // clearing interval.
    });

    test('attemptPopulate populates selects when ready', () => {
        scope.devices = {
            cameras: { cam1: 'C1' },
            monitors: { mon1: 'M1' }
        };

        const mockCameraSelect = { id: 'cameraSelect', options: { length: 0 } };
        const mockMonitorSelect = { id: 'monitorSelect', options: { length: 0 } };

        mockDocument.getElementById.mockImplementation((id) => {
            if (id === 'cameraSelect') return mockCameraSelect;
            if (id === 'monitorSelect') return mockMonitorSelect;
            return null;
        });

        const result = forcePopulateModule.attemptPopulate(scope, mockBootstrap);

        expect(result).toBe(true);
        expect(scope.populateSelect).toHaveBeenCalledWith(mockCameraSelect, scope.devices.cameras);
        expect(scope.populateSelect).toHaveBeenCalledWith(mockMonitorSelect, scope.devices.monitors);
        expect(mockBootstrap.init).toHaveBeenCalled();
        expect(scope.dispatchEvent).toHaveBeenCalledWith(expect.any(CustomEvent));
        expect(mockDocument.body.classList.add).toHaveBeenCalledWith('app-ready');
    });

    test('attemptPopulate handles boot queue function', () => {
        scope.devices = {};
        scope.processCoreBootQueue = jest.fn();

        forcePopulateModule.attemptPopulate(scope, mockBootstrap);

        expect(scope.processCoreBootQueue).toHaveBeenCalled();
    });

    test('attemptPopulate handles boot queue array fallback', () => {
        scope.devices = {};
        delete scope.processCoreBootQueue; // Remove function

        const task1 = jest.fn();
        const task2 = jest.fn();
        scope.CORE_BOOT_QUEUE = [task1, task2];

        forcePopulateModule.attemptPopulate(scope, mockBootstrap);

        expect(task1).toHaveBeenCalled();
        expect(task2).toHaveBeenCalled();
        expect(scope.CORE_BOOT_QUEUE.length).toBe(0); // Should be drained
    });

    test('attemptPopulate hides overlay', () => {
        scope.devices = {};
        const mockOverlay = { style: {}, setAttribute: jest.fn() };
        mockDocument.getElementById.mockImplementation((id) => {
            if (id === 'cineGlobalLoadingIndicator') return mockOverlay;
            return { options: { length: 0 } };
        });

        forcePopulateModule.attemptPopulate(scope, mockBootstrap);

        expect(mockOverlay.style.display).toBe('none');
        expect(mockOverlay.setAttribute).toHaveBeenCalledWith('aria-hidden', 'true');
    });

    test('polling stops after success', () => {
        scope.devices = null;
        const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

        forcePopulateModule.startForcePopulate(scope, mockBootstrap);

        // Fail first
        jest.advanceTimersByTime(200);
        expect(clearIntervalSpy).not.toHaveBeenCalled();

        // Succeed
        scope.devices = {};
        jest.advanceTimersByTime(200);

        expect(clearIntervalSpy).toHaveBeenCalled();
    });
});
