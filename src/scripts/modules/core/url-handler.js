import LZString from '../../../vendor/lz-string.js';

/**
 * Extracts and decodes the 'shared' query parameter from a URL search string.
 * @param {string} searchString - The window.location.search string.
 * @returns {Object|null} The decoded shared setup object, or null if not found/invalid.
 */
export function parseSharedSetupFromUrl(searchString) {
    if (typeof searchString !== 'string' || !searchString) {
        return null;
    }

    const params = new URLSearchParams(searchString);
    const shared = params.get('shared');

    if (!shared) {
        return null;
    }

    try {
        const decompressed = LZString.decompressFromEncodedURIComponent(shared);
        if (typeof decompressed !== 'string') {
            return null;
        }
        return JSON.parse(decompressed);
    } catch (error) {
        if (typeof console !== 'undefined' && console.warn) {
            console.warn('UrlHandler: Failed to parse shared setup.', error);
        }
        return null;
    }
}

/**
 * Removes the 'shared' query parameter from the current URL history state without reloading the page.
 */
export function cleanUrlParams() {
    if (typeof window === 'undefined' || !window.location || !window.history) {
        return;
    }

    try {
        const url = new URL(window.location.href);
        if (url.searchParams.has('shared')) {
            url.searchParams.delete('shared');
            window.history.replaceState(null, '', url.toString());
        }
    } catch (e) {
        if (typeof console !== 'undefined' && console.warn) {
            console.warn('UrlHandler: Failed to clean URL params.', e);
        }
    }
}

export const UrlHandler = {
    parseSharedSetupFromUrl,
    cleanUrlParams
};

export default UrlHandler;
