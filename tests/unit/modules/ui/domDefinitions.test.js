/**
 * @jest-environment jsdom
 */

import { defineUiGetter, initializeGlobalUiAccessors } from '../../../../src/scripts/modules/ui/dom-definitions.js';

describe('DOM Definitions Module', () => {
    let mockCache;
    let mockGlobal;

    beforeEach(() => {
        mockCache = {
            _data: {},
            getElement: function (id) {
                return this._data[id] || null;
            },
            set: function (id, val) {
                this._data[id] = val;
            }
        };
        mockGlobal = {};
        // Mock globalThis/window logic manually for isolation if needed,
        // but the module uses globalThis/window directly.
        // In JSDOM, window is available.
    });

    afterEach(() => {
        // Cleanup window properties
        if (typeof window !== 'undefined') {
            delete window.testProp;
            delete window.toggleDeviceBtn;
        }
    });

    test('defineUiGetter defines a property on window', () => {
        const el = document.createElement('div');
        mockCache.set('test-id', el);

        // We can't strictly inject mockGlobal into the module because it detects globalThis/window inside.
        // So we test the side effect on 'window'.
        defineUiGetter('testProp', 'test-id', mockCache);

        expect(window.testProp).toBe(el);
    });

    test('initializeGlobalUiAccessors defines standard properties', () => {
        const btn = document.createElement('button');
        mockCache.set('toggleDeviceManager', btn);

        initializeGlobalUiAccessors(mockCache);

        expect(window.toggleDeviceBtn).toBe(btn);
    });

    test('property updates when cache updates (dynamic retrieval)', () => {
        const oldBtn = document.createElement('button');
        mockCache.set('test-id', oldBtn);
        defineUiGetter('testPropDynamic', 'test-id', mockCache);

        expect(window.testPropDynamic).toBe(oldBtn);

        const newBtn = document.createElement('button');
        mockCache.set('test-id', newBtn);

        expect(window.testPropDynamic).toBe(newBtn);
    });
});
