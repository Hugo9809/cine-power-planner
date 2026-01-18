/**
 * Project Manager Module
 * 
 * Handles project information derivation, normalization, and display formatting.
 * Extracted from app-setups.js.
 */

import { escapeHtml as escapeHtmlModule } from '../ui-helpers.js';

// Internal fallback if UI helpers aren't available
function escapeHtmlFallback(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

const escapeHtml = escapeHtmlModule || escapeHtmlFallback;

export const PRODUCTION_COMPANY_FIELD_ORDER = [
    'productionCompanyAddress',
    'productionCompanyStreet',
    'productionCompanyStreet2',
    'productionCompanyCity',
    'productionCompanyRegion',
    'productionCompanyPostalCode',
    'productionCompanyCountry'
];

export const LEGACY_PROJECT_FIELD_LABELS = {
    productionCompany: [
        'Production Company',
        'Produktionsfirma',
        'Société de production',
        'Productora',
        'Casa di produzione',
    ],
    productionCompanyAddress: [
        'Production Company Address',
        'Adresse der Produktionsfirma',
        'Adresse de la société de production',
        'Dirección de la productora',
        'Indirizzo della casa di produzione',
    ],
    productionCompanyStreet: [
        'Street address',
        'Straße und Hausnummer',
        'Adresse',
        'Dirección',
        'Indirizzo',
    ],
    productionCompanyStreet2: [
        'Address line 2',
        'Adresszusatz',
        "Complément d'adresse",
        'Línea 2 de dirección',
        'Seconda linea indirizzo',
    ],
    productionCompanyCity: [
        'City',
        'Stadt',
        'Ville',
        'Ciudad',
        'Città',
    ],
    productionCompanyRegion: [
        'State / Province / Region',
        'Bundesland / Region',
        'État / Région / Département',
        'Estado / Provincia / Región',
        'Regione / Provincia / Stato',
    ],
    productionCompanyPostalCode: [
        'Postal code',
        'Postleitzahl',
        'Code postal',
        'Código postal',
        'CAP',
    ],
    productionCompanyCountry: [
        'Country',
        'Land',
        'Pays',
        'País',
        'Paese',
    ],
};

export function normalizeProjectFieldLabel(label) {
    if (typeof label !== 'string') {
        return '';
    }
    return label.trim().replace(/[:：]\s*$/, '').trim();
}

export function getProductionCompanyLabelSets(projectLabels) {
    // Attempt to access global 'texts' if projectLabels not fully provided
    const textsObj = typeof window !== 'undefined' && window.texts ? window.texts : null;
    const labelSets = {};
    const fallbackProjectLabels = (textsObj && textsObj.en && textsObj.en.projectFields) || {};
    const allKeys = ['productionCompany'].concat(PRODUCTION_COMPANY_FIELD_ORDER);

    allKeys.forEach((key) => {
        const set = new Set();
        const addLabel = (value) => {
            if (typeof value !== 'string') return;
            const normalized = normalizeProjectFieldLabel(value);
            if (normalized) {
                set.add(normalized);
            }
        };
        if (projectLabels && projectLabels[key]) {
            addLabel(projectLabels[key]);
        }
        if (fallbackProjectLabels && fallbackProjectLabels[key]) {
            addLabel(fallbackProjectLabels[key]);
        }
        const legacyLabels = LEGACY_PROJECT_FIELD_LABELS[key];
        if (Array.isArray(legacyLabels)) {
            legacyLabels.forEach(addLabel);
        }
        labelSets[key] = set;
    });
    return labelSets;
}

export function getProjectInfoFieldLines(source, fieldKey) {
    if (!source || typeof source !== 'object') {
        return [];
    }
    const rawValue = source[fieldKey];
    if (rawValue === null || rawValue === undefined) {
        return [];
    }
    if (Array.isArray(rawValue)) {
        const parts = [];
        rawValue.forEach((item) => {
            if (item === null || item === undefined) return;
            const str = typeof item === 'string' ? item : String(item);
            str.split(/\r?\n/).forEach((segment) => {
                const trimmed = segment.trim();
                if (trimmed) {
                    parts.push(trimmed);
                }
            });
        });
        return parts;
    }
    if (typeof rawValue === 'string') {
        return rawValue
            .split(/\r?\n/)
            .map((segment) => segment.trim())
            .filter((segment) => segment);
    }
    return [String(rawValue)].map((segment) => segment.trim()).filter((segment) => segment);
}

export function buildCombinedProductionCompanyDisplay(sourceInfo, projectLabels) {
    const htmlLines = [];
    const textLines = [];
    const labelSets = getProductionCompanyLabelSets(projectLabels);
    const knownLabelLines = new Set();
    Object.values(labelSets).forEach((set) => {
        if (!set) return;
        set.forEach((value) => {
            if (typeof value === 'string' && value) {
                knownLabelLines.add(value);
            }
        });
    });

    const isLabelLine = (value) => {
        if (typeof value !== 'string' || !value.trim()) {
            return false;
        }
        return knownLabelLines.has(normalizeProjectFieldLabel(value));
    };

    const addLine = (value, className, associatedFields) => {
        if (typeof value !== 'string') return;
        const trimmed = value.trim();
        if (!trimmed) return;
        const safe = escapeHtml(trimmed);
        const fieldList = Array.isArray(associatedFields)
            ? associatedFields.filter((field) => typeof field === 'string' && field.trim())
            : [];
        const fieldAttr = fieldList.length
            ? ` data-fields="${escapeHtml(fieldList.join(' '))}"`
            : '';
        htmlLines.push(className ? `<span class="${className}"${fieldAttr}>${safe}</span>` : safe);
        textLines.push(trimmed);
    };

    const addressAccumulator = {
        entries: [],
        indexMap: new Map()
    };
    const appendAddressEntry = (line, fieldKey) => {
        if (typeof line !== 'string') return;
        const trimmed = line.trim();
        if (!trimmed) return;
        if (isLabelLine(trimmed)) return;
        const normalized = trimmed.toLowerCase();
        let entry = addressAccumulator.indexMap.get(normalized);
        if (!entry) {
            entry = { value: trimmed, fields: [] };
            addressAccumulator.entries.push(entry);
            addressAccumulator.indexMap.set(normalized, entry);
        }
        if (
            typeof fieldKey === 'string'
            && PRODUCTION_COMPANY_FIELD_ORDER.includes(fieldKey)
            && !entry.fields.includes(fieldKey)
        ) {
            entry.fields.push(fieldKey);
        }
    };

    const companyLines = getProjectInfoFieldLines(sourceInfo, 'productionCompany');
    companyLines.forEach((line) => addLine(line, 'req-primary-line'));

    PRODUCTION_COMPANY_FIELD_ORDER.forEach((fieldKey) => {
        const lines = getProjectInfoFieldLines(sourceInfo, fieldKey);
        if (!lines.length) return;
        lines.forEach((line) => appendAddressEntry(line, fieldKey));
    });

    const { entries: addressEntries } = addressAccumulator;
    if (addressEntries.length) {
        const locationFieldSet = new Set([
            'productionCompanyCity',
            'productionCompanyRegion',
            'productionCompanyPostalCode',
        ]);
        const locationValues = {
            productionCompanyCity: [],
            productionCompanyRegion: [],
            productionCompanyPostalCode: [],
        };
        const filteredEntries = [];
        let locationInsertIndex = null;

        addressEntries.forEach((entry) => {
            const { value, fields } = entry;
            const isLocationEntry = Array.isArray(fields)
                ? fields.some((field) => locationFieldSet.has(field))
                : false;
            if (isLocationEntry) {
                if (locationInsertIndex === null) {
                    locationInsertIndex = filteredEntries.length;
                }
                fields.forEach((field) => {
                    if (locationFieldSet.has(field)) {
                        locationValues[field].push(value);
                    }
                });
            } else {
                filteredEntries.push(entry);
            }
        });

        const pickFirstValue = (arr) => {
            if (!Array.isArray(arr)) return '';
            const found = arr.find((item) => typeof item === 'string' && item.trim());
            return found ? found.trim() : '';
        };

        const cityValue = pickFirstValue(locationValues.productionCompanyCity);
        const regionValue = pickFirstValue(locationValues.productionCompanyRegion);
        const postalValue = pickFirstValue(locationValues.productionCompanyPostalCode);

        const locationParts = [];
        const locationFields = [];
        if (cityValue) {
            locationParts.push(cityValue);
            locationFields.push('productionCompanyCity');
        }
        const regionPostalParts = [];
        if (regionValue) {
            regionPostalParts.push(regionValue);
            locationFields.push('productionCompanyRegion');
        }
        if (postalValue) {
            regionPostalParts.push(postalValue);
            locationFields.push('productionCompanyPostalCode');
        }
        if (regionPostalParts.length) {
            const combinedRegionPostal = regionPostalParts.join(', ');
            locationParts.push(combinedRegionPostal);
        }

        const combinedLocationLine = locationParts.join(', ').trim();
        if (combinedLocationLine) {
            const normalizedCombined = combinedLocationLine.toLowerCase();
            const hasExisting = filteredEntries.some((entry) => {
                const entryValue = typeof entry.value === 'string' ? entry.value.trim() : '';
                return entryValue && entryValue.toLowerCase() === normalizedCombined;
            });
            if (!hasExisting) {
                const insertAt = locationInsertIndex === null
                    ? filteredEntries.length
                    : locationInsertIndex;
                filteredEntries.splice(insertAt, 0, {
                    value: combinedLocationLine,
                    fields: locationFields,
                });
            }
        }

        filteredEntries.forEach((entry) => {
            const { value, fields } = entry;
            addLine(value, 'req-sub-line', fields);
        });
    }

    if (!htmlLines.length) {
        return null;
    }

    return {
        __html: htmlLines.join('<br>'),
        text: textLines.join('\n')
    };
}

export function applyCombinedProductionCompanyDisplay(targetInfo, sourceInfo, projectLabels) {
    if (!targetInfo || typeof targetInfo !== 'object') {
        return false;
    }
    const source = (sourceInfo && typeof sourceInfo === 'object') ? sourceInfo : targetInfo;
    const combined = buildCombinedProductionCompanyDisplay(source, projectLabels);
    if (!combined) {
        return false;
    }
    targetInfo.productionCompany = combined;
    PRODUCTION_COMPANY_FIELD_ORDER.forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(targetInfo, key)) {
            delete targetInfo[key];
        }
    });
    return true;
}

export function expandCombinedProductionCompanyInfo(rawText, projectLabels, metadata) {
    if (typeof rawText !== 'string') {
        return null;
    }
    const normalizedText = rawText
        .replace(/\r\n?/g, '\n')
        .split('\n')
        .map((segment) => segment.trim())
        .filter((segment) => segment);
    if (!normalizedText.length) {
        return null;
    }
    const labelSets = getProductionCompanyLabelSets(projectLabels);
    const result = {};
    const [firstLine, ...rest] = normalizedText;
    if (firstLine) {
        result.productionCompany = firstLine;
    }
    const metadataLines = Array.isArray(metadata?.lines) ? metadata.lines : null;
    if (metadataLines && metadataLines.length) {
        const collectedFromMetadata = {};
        metadataLines.forEach((entry) => {
            if (!entry || typeof entry.text !== 'string') return;
            const text = entry.text.trim();
            if (!text) return;
            let fields = entry.fields;
            if (typeof fields === 'string') {
                fields = fields.split(/\s+/);
            }
            if (!Array.isArray(fields) || !fields.length) return;
            fields
                .map((field) => (typeof field === 'string' ? field.trim() : ''))
                .filter((field) => field && PRODUCTION_COMPANY_FIELD_ORDER.includes(field))
                .forEach((field) => {
                    if (!collectedFromMetadata[field]) {
                        collectedFromMetadata[field] = [];
                    }
                    collectedFromMetadata[field].push(text);
                });
        });
        if (Object.keys(collectedFromMetadata).length) {
            if (collectedFromMetadata.productionCompanyAddress && collectedFromMetadata.productionCompanyAddress.length) {
                result.productionCompanyAddress = collectedFromMetadata.productionCompanyAddress.join('\n');
            }
            if (collectedFromMetadata.productionCompanyStreet && collectedFromMetadata.productionCompanyStreet.length) {
                const streetParts = collectedFromMetadata.productionCompanyStreet;
                [result.productionCompanyStreet] = streetParts;
                if (streetParts.length > 1) {
                    const secondary = streetParts.slice(1).join('\n');
                    if (secondary) {
                        result.productionCompanyStreet2 = secondary;
                    }
                }
            }
            if (collectedFromMetadata.productionCompanyStreet2 && collectedFromMetadata.productionCompanyStreet2.length) {
                const streetTwo = collectedFromMetadata.productionCompanyStreet2.join('\n');
                if (streetTwo) {
                    result.productionCompanyStreet2 = result.productionCompanyStreet2
                        ? `${result.productionCompanyStreet2}\n${streetTwo}`
                        : streetTwo;
                }
            }
            const joinCollected = (field) => {
                if (!collectedFromMetadata[field] || !collectedFromMetadata[field].length) return;
                const combined = collectedFromMetadata[field].join(' ');
                if (combined) {
                    result[field] = combined;
                }
            };
            ['productionCompanyCity', 'productionCompanyRegion', 'productionCompanyPostalCode', 'productionCompanyCountry']
                .forEach(joinCollected);
            return result;
        }
    }
    const collected = {};
    let activeField = null;
    rest.forEach((line) => {
        const normalizedLine = normalizeProjectFieldLabel(line);
        let matchedField = null;
        PRODUCTION_COMPANY_FIELD_ORDER.forEach((field) => {
            if (matchedField || !labelSets[field]) return;
            if (labelSets[field].has(normalizedLine)) {
                matchedField = field;
            }
        });
        if (matchedField) {
            activeField = matchedField;
            if (!collected[activeField]) {
                collected[activeField] = [];
            }
            return;
        }
        if (!activeField) {
            if (result.productionCompany) {
                result.productionCompany += `\n${line}`;
            } else {
                result.productionCompany = line;
            }
            return;
        }
        if (!collected[activeField]) {
            collected[activeField] = [];
        }
        collected[activeField].push(line);
    });

    if (collected.productionCompanyAddress && collected.productionCompanyAddress.length) {
        result.productionCompanyAddress = collected.productionCompanyAddress.join('\n');
    }
    if (collected.productionCompanyStreet && collected.productionCompanyStreet.length) {
        const streetParts = collected.productionCompanyStreet;
        result.productionCompanyStreet = streetParts[0];
        if (streetParts.length > 1) {
            result.productionCompanyStreet2 = streetParts.slice(1).join('\n');
        }
    }
    if (collected.productionCompanyStreet2 && collected.productionCompanyStreet2.length) {
        const streetTwo = collected.productionCompanyStreet2.join('\n');
        if (result.productionCompanyStreet2) {
            result.productionCompanyStreet2 += `\n${streetTwo}`;
        } else {
            result.productionCompanyStreet2 = streetTwo;
        }
    }
    if (collected.productionCompanyCity && collected.productionCompanyCity.length) {
        result.productionCompanyCity = collected.productionCompanyCity.join(' ');
    }
    if (collected.productionCompanyRegion && collected.productionCompanyRegion.length) {
        result.productionCompanyRegion = collected.productionCompanyRegion.join(' ');
    }
    if (collected.productionCompanyPostalCode && collected.productionCompanyPostalCode.length) {
        result.productionCompanyPostalCode = collected.productionCompanyPostalCode.join(' ');
    }
    if (collected.productionCompanyCountry && collected.productionCompanyCountry.length) {
        result.productionCompanyCountry = collected.productionCompanyCountry.join(' ');
    }

    return result;
}

export const deriveProjectInfo = (function resolveDeriveProjectInfo() {
    // Keep legacy fallback behaviors just in case
    if (typeof globalThis !== 'undefined' && typeof globalThis.deriveProjectInfo === 'function') {
        const existing = globalThis.deriveProjectInfo;
        if (existing && existing.name !== 'fallbackDeriveProjectInfo') return existing;
    }

    return function standardDeriveProjectInfo(info) {
        return info || {};
    };
})();

export function safeGetCurrentProjectName(defaultValue = '') {
    // In the new architecture, we should have a reliable way to get this.
    // However, app-setups.js used a dynamic lookup `resolveSetupRuntimeFunction`.
    // For now, we replicate it or assume it's available via a global hook if not passed clearly.
    // Ideally, this should depend on a Project State module, but that's not extracted yet.
    // We'll reimplement the resolution logic here for now but simplified.

    // Check if we have a global shim
    if (typeof window !== 'undefined' && typeof window.getCurrentProjectName === 'function') {
        try {
            const resolved = window.getCurrentProjectName();
            if (typeof resolved === 'string' && resolved.trim()) {
                return resolved;
            }
        } catch { /* noop */ }
    }

    return defaultValue;
}
