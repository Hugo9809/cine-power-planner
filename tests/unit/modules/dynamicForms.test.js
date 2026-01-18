/**
 * @jest-environment jsdom
 */

import { jest, describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import {
    clearDynamicFields,
    placeWattField,
    buildDynamicFields
} from '../../../src/scripts/modules/ui/dynamic-forms.js';

describe('Dynamic Forms Module', () => {

    let container;
    let wattField;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="dynamicFields" hidden></div>
            <div id="wattField" style="display:none"></div>
        `;
        container = document.getElementById('dynamicFields');
        wattField = document.getElementById('wattField');
    });

    test('clearDynamicFields clears and hides container', () => {
        container.innerHTML = '<span>Old Content</span>';
        container.hidden = false;
        clearDynamicFields();
        expect(container.innerHTML).toBe('');
        expect(container.hidden).toBe(true);
    });

    test('placeWattField shows watt field', () => {
        placeWattField('camera', {});
        expect(wattField.style.display).toBe('');
    });

    test('buildDynamicFields generates inputs from schema', () => {
        const mockScope = {
            getSchemaAttributesForCategory: jest.fn().mockReturnValue([
                'customProp',
                'isSpecial',
                'pinCount'
            ])
        };

        const data = { customProp: 'val', isSpecial: true, pinCount: 5 };

        buildDynamicFields('testCat', data, [], mockScope);

        expect(container.hidden).toBe(false);
        const textInput = container.querySelector('#dynamic_customProp');
        const checkbox = container.querySelector('#dynamic_isSpecial');
        const numInput = container.querySelector('#dynamic_pinCount');

        expect(textInput).not.toBeNull();
        expect(textInput.value).toBe('val');

        expect(checkbox).not.toBeNull();
        expect(checkbox.type).toBe('checkbox');
        expect(checkbox.checked).toBe(true);

        expect(numInput).not.toBeNull();
        expect(numInput.type).toBe('number');
        expect(numInput.value).toBe('5');
    });

    test('buildDynamicFields handles missing schema scope elegantly', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });
        buildDynamicFields('testCat', {}, [], {});
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('getSchemaAttributesForCategory not found'));
        consoleSpy.mockRestore();
    });
});
