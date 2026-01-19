/**
 * @jest-environment jsdom
 */

import { parseSharedSetupFromUrl, cleanUrlParams } from '../../../../src/scripts/modules/core/url-handler.js';
import LZString from 'lz-string';

describe('URL Handler', () => {
    const mockParams = {
        key: 'value',
        nested: { foo: 'bar' }
    };
    const mockEncoded = LZString.compressToEncodedURIComponent(JSON.stringify(mockParams));

    describe('parseSharedSetupFromUrl', () => {
        it('returns null for empty or invalid inputs', () => {
            expect(parseSharedSetupFromUrl('')).toBeNull();
            expect(parseSharedSetupFromUrl(null)).toBeNull();
            expect(parseSharedSetupFromUrl('?other=param')).toBeNull();
        });

        it('returns decoded object for valid shared param', () => {
            const search = `?shared=${mockEncoded}`;
            const result = parseSharedSetupFromUrl(search);
            expect(result).toEqual(mockParams);
        });

        it('returns null for malformed encoded string', () => {
            const search = '?shared=broken-string';
            const result = parseSharedSetupFromUrl(search);
            expect(result).toBeNull();
        });
    });

    describe('cleanUrlParams', () => {
        let replaceStateSpy;

        beforeEach(() => {
            // Use relative URL to avoid SecurityError (JSDOM origin is http://localhost/)
            window.history.replaceState(null, '', '/');

            // Spy on replaceState
            replaceStateSpy = jest.spyOn(window.history, 'replaceState');
        });

        afterEach(() => {
            if (replaceStateSpy) {
                replaceStateSpy.mockRestore();
            }
        });

        it('removes shared param from URL', () => {
            // Setup: set URL with shared param
            replaceStateSpy.mockRestore(); // restore to allow actual update
            window.history.replaceState(null, '', '/?shared=foo&other=bar');

            // Re-spy
            replaceStateSpy = jest.spyOn(window.history, 'replaceState');

            cleanUrlParams();

            // Expect replaceState to have been called with clean URL
            // We expect the browser (JSDOM) to resolve relative URL against origin http://localhost/
            expect(replaceStateSpy).toHaveBeenCalledWith(
                null,
                '',
                expect.stringMatching(/\/\?other=bar$/)
            );
        });

        it('does nothing if shared param is missing', () => {
            replaceStateSpy.mockRestore();
            window.history.replaceState(null, '', '/?other=bar');
            replaceStateSpy = jest.spyOn(window.history, 'replaceState');

            cleanUrlParams();
            expect(replaceStateSpy).not.toHaveBeenCalled();
        });
    });
});
