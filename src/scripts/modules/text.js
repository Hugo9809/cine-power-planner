/**
 * Cine Power Planner Text Utilities
 * 
 * Pure ESM module for text normalization and resolution.
 * Extracted from app-core-text.js during Vite migration.
 */

export const TEXT_ENTRY_SEPARATOR = '\n';

export function normaliseTextEntryValue(entry, separator = TEXT_ENTRY_SEPARATOR) {
    const safeSeparator = typeof separator === 'string' && separator ? separator : TEXT_ENTRY_SEPARATOR;

    if (typeof entry === 'string') {
        return entry;
    }

    if (typeof entry === 'number' || typeof entry === 'boolean') {
        try {
            return String(entry);
        } catch (stringifyPrimitiveError) {
            void stringifyPrimitiveError;
        }
        return '';
    }

    if (Array.isArray(entry)) {
        const parts = [];
        for (let index = 0; index < entry.length; index += 1) {
            const value = normaliseTextEntryValue(entry[index], safeSeparator);
            if (value) {
                parts.push(value);
            }
        }
        return parts.join(safeSeparator);
    }

    if (entry && typeof entry === 'object') {
        if (typeof entry.text === 'string') {
            return entry.text;
        }

        if (Array.isArray(entry.text)) {
            return normaliseTextEntryValue(entry.text, safeSeparator);
        }

        if (typeof entry.label === 'string') {
            return entry.label;
        }

        try {
            const objectString = String(entry);
            if (objectString && objectString !== '[object Object]') {
                return objectString;
            }
        } catch (stringifyObjectError) {
            void stringifyObjectError;
        }
    }

    return '';
}

export function resolveTextEntry(
    primaryTexts,
    fallbackTexts,
    key,
    defaultValue = '',
    separator = TEXT_ENTRY_SEPARATOR
) {
    const normalizedDefault = typeof defaultValue === 'string' ? defaultValue : '';
    const dictionaries = [];

    if (primaryTexts && (typeof primaryTexts === 'object' || typeof primaryTexts === 'function')) {
        dictionaries.push(primaryTexts);
    }

    if (
        fallbackTexts &&
        fallbackTexts !== primaryTexts &&
        (typeof fallbackTexts === 'object' || typeof fallbackTexts === 'function')
    ) {
        dictionaries.push(fallbackTexts);
    }

    for (let index = 0; index < dictionaries.length; index += 1) {
        const dictionary = dictionaries[index];

        let entry;
        try {
            entry = dictionary[key];
        } catch (dictionaryLookupError) {
            void dictionaryLookupError;
            entry = undefined;
        }

        if (typeof entry === 'undefined' || entry === null) {
            continue;
        }

        const resolved = normaliseTextEntryValue(entry, separator);
        if (typeof resolved === 'string') {
            return resolved;
        }
    }

    return normalizedDefault;
}
