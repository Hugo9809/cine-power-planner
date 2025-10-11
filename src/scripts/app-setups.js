/* global getManualDownloadFallbackMessage, getDiagramManualPositions, normalizeAutoGearShootingDayValue,
          normalizeAutoGearShootingDaysCondition, normalizeAutoGearCameraWeightCondition, evaluateAutoGearCameraWeightCondition,
          normalizeAutoGearText, getAutoGearMonitorDefault, getSetupNameState, filterDetailsStorage,
          createProjectInfoSnapshotForStorage, getProjectAutoSaveOverrides, getAutoGearRuleCoverageSummary,
          normalizeBatteryPlateValue, setSelectValue, applyBatteryPlateSelectionFromBattery, enqueueCoreBootTask,
          callCoreFunctionIfAvailable, cineGearList, updateStorageRequirementTypeOptions,
          storageNeedsContainer, createStorageRequirementRow, returnContainer, createReturnRow, populateFrameRateDropdown,
          focusScalePreference, loadOwnGear, getUserProfileSnapshot, getContactsSnapshot, getContactById,
          getContactDisplayLabel, getContactsText, getAutoGearOwnGearItems, normalizeAutoGearConditionLogic,
          resolveOwnGearModule, cineFeaturesOwnGear, generateOwnGearId, normalizeOwnGearRecord, saveOwnGear,
          OWN_GEAR_SOURCE_CATALOG, OWN_GEAR_SOURCE_CUSTOM */

// Setups orchestrates saving and restoring complex project forms. A gentle
// reminder: every helper here feeds into autosave, backup and sharing flows, so
// prefer descriptive names and leave breadcrumbs when adjusting logic.

const AUTO_GEAR_ANY_MOTOR_TOKEN_FALLBACK =
    (typeof globalThis !== 'undefined' && globalThis.AUTO_GEAR_ANY_MOTOR_TOKEN)
        ? globalThis.AUTO_GEAR_ANY_MOTOR_TOKEN
        : '__any__';

const PRODUCTION_COMPANY_FIELD_ORDER = [
    'productionCompanyAddress',
    'productionCompanyStreet',
    'productionCompanyStreet2',
    'productionCompanyCity',
    'productionCompanyRegion',
    'productionCompanyPostalCode',
    'productionCompanyCountry'
];

const LEGACY_PROJECT_FIELD_LABELS = {
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

function normalizeProjectFieldLabel(label) {
    if (typeof label !== 'string') {
        return '';
    }
    return label.trim().replace(/[:：]\s*$/, '').trim();
}

function getProductionCompanyLabelSets(projectLabels) {
    const textsObj = typeof texts !== 'undefined' ? texts : null;
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

function getProjectInfoFieldLines(source, fieldKey) {
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

function buildCombinedProductionCompanyDisplay(sourceInfo, projectLabels) {
    const htmlLines = [];
    const textLines = [];
    const addLine = (value, className) => {
        if (typeof value !== 'string') return;
        const trimmed = value.trim();
        if (!trimmed) return;
        const safe = escapeHtml(trimmed);
        htmlLines.push(className ? `<span class="${className}">${safe}</span>` : safe);
        textLines.push(trimmed);
    };
    const textsObj = typeof texts !== 'undefined' ? texts : null;
    const addSection = (fieldKey, lines, labelClass = 'req-sub-label') => {
        if (!Array.isArray(lines) || !lines.length) return;
        const label = (projectLabels && projectLabels[fieldKey])
            || (textsObj && textsObj.en && textsObj.en.projectFields && textsObj.en.projectFields[fieldKey])
            || fieldKey;
        addLine(label, labelClass);
        lines.forEach((line) => addLine(line, 'req-sub-line'));
    };

    const companyLines = getProjectInfoFieldLines(sourceInfo, 'productionCompany');
    companyLines.forEach((line) => addLine(line, 'req-primary-line'));

    const addressLines = getProjectInfoFieldLines(sourceInfo, 'productionCompanyAddress');
    if (addressLines.length) {
        addSection('productionCompanyAddress', addressLines);
    }

    const streetLines = getProjectInfoFieldLines(sourceInfo, 'productionCompanyStreet')
        .concat(getProjectInfoFieldLines(sourceInfo, 'productionCompanyStreet2'));
    if (streetLines.length) {
        addSection('productionCompanyStreet', streetLines);
    }

    addSection('productionCompanyCity', getProjectInfoFieldLines(sourceInfo, 'productionCompanyCity'));
    addSection('productionCompanyRegion', getProjectInfoFieldLines(sourceInfo, 'productionCompanyRegion'));
    addSection('productionCompanyPostalCode', getProjectInfoFieldLines(sourceInfo, 'productionCompanyPostalCode'));
    addSection('productionCompanyCountry', getProjectInfoFieldLines(sourceInfo, 'productionCompanyCountry'));

    if (!htmlLines.length) {
        return null;
    }

    return {
        __html: htmlLines.join('<br>'),
        text: textLines.join('\n')
    };
}

function expandCombinedProductionCompanyInfo(rawText, projectLabels) {
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

const EXTRA_GEAR_CATEGORY_KEY = 'temporary-extras';

let projectPersistenceSuspendedCount = 0;

const PROJECT_FORM_FREEZE =
    typeof Object.freeze === 'function'
        ? Object.freeze
        : (value) => value;

let projectFormDataCache = null;
let projectFormDataCacheDirty = true;

const lensSelectionManager = (() => {
    const doc = typeof document !== 'undefined' ? document : null;

    const stub = {
        snapshot() {
            return { names: [], lensSelections: [], legacyValue: '' };
        },
        applyInfo() {},
        refreshCatalog() {},
        getSelections() {
            return [];
        }
    };

    if (!doc) {
        return stub;
    }

    const manufacturerSelect = doc.getElementById('lensManufacturer');
    const seriesSelect = doc.getElementById('lensSeries');
    const manufacturerStep = doc.getElementById('lensManufacturerStep');
    const seriesStep = doc.getElementById('lensSeriesStep');
    const optionsStep = doc.getElementById('lensOptionsStep');
    const optionsContainer = doc.getElementById('lensOptions');
    const optionsEmptyMessage = doc.getElementById('lensOptionsEmpty');
    const seriesEmptyMessage = doc.getElementById('lensSeriesEmpty');
    const selectionChips = doc.getElementById('lensSelectionChips');
    const hiddenLegacyValue = doc.getElementById('lensSelectionsValue');
    const hiddenDetailedValue = doc.getElementById('lensSelectionsData');
    const legacySelect = doc.getElementById('lenses');
    const manufacturerPlaceholder = doc.getElementById('lensManufacturerPlaceholder');
    const seriesPlaceholder = doc.getElementById('lensSeriesPlaceholder');

    if (
        !manufacturerSelect
        || !seriesSelect
        || !optionsContainer
        || !selectionChips
        || !hiddenLegacyValue
        || !hiddenDetailedValue
        || !legacySelect
    ) {
        return stub;
    }

    const REMOVE_TEMPLATE_ATTR = 'data-remove-template';
    const MOUNT_LABEL_ATTR = 'data-mount-label';
    const STEP_DISABLED_CLASS = 'lens-step-disabled';

    const IGNORED_MOUNT_TOKENS = new Set(['LDS']);
    const MOUNT_TOKEN_MAP = new Map([
        ['B4', 'B4'],
        ['DJI DL', 'DJI DL'],
        ['DJI DL-S', 'DJI DL-S'],
        ['DL', 'DJI DL'],
        ['E', 'E-mount'],
        ['E-mount', 'E-mount'],
        ['Sony E', 'E-mount'],
        ['EF', 'EF'],
        ['F', 'F'],
        ['Hasselblad', 'Hasselblad'],
        ['L', 'L-Mount'],
        ['L-Mount', 'L-Mount'],
        ['Leica L', 'L-Mount'],
        ['Leica M', 'Leica M'],
        ['Leitz M Mount for ARRI', 'Leica M'],
        ['M', 'Leica M'],
        ['MFT', 'MFT'],
        ['PL', 'PL'],
        ['PV', 'PV'],
        ['PV70', 'PV70'],
        ['RF', 'RF'],
        ['X', 'X-mount'],
        ['X-mount', 'X-mount'],
        ['XPL52', 'XPL52'],
        ['Z', 'Z-mount'],
        ['Z-mount', 'Z-mount']
    ]);

    const sortComparator = typeof localeSort === 'function' ? localeSort : undefined;

    const state = {
        manufacturer: '',
        series: '',
        selections: []
    };

    let catalog = {
        manufacturers: new Map(),
        lensIndex: new Map()
    };

    let mountOptions = [];
    const optionInputs = new Map();

    const placeholderToggle = (select, isEmpty) => {
        if (!select) return;
        if (isEmpty) {
            select.classList.add('select-placeholder');
        } else {
            select.classList.remove('select-placeholder');
        }
    };

    const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const stripPrefix = (text, prefix) => {
        if (!text || !prefix) return text;
        const pattern = new RegExp(`^${escapeRegExp(prefix)}\\s+`, 'i');
        return text.replace(pattern, '').trim();
    };

    const isSpecToken = (token) => {
        if (!token) return false;
        const value = token.trim();
        if (!value) return false;
        if (/^T\d+/i.test(value)) return true;
        if (/^f\//i.test(value)) return true;
        if (/\d/.test(value)) {
            if (/(?:mm|cm|m|°|ft)$/i.test(value)) return true;
            if (/^\d+(?:\.\d+)?x$/i.test(value)) return true;
            if (/^\d+-\d+/.test(value)) return true;
        }
        return false;
    };

    const deriveManufacturer = (lensData, lensName) => {
        if (lensData && typeof lensData.brand === 'string' && lensData.brand.trim()) {
            return lensData.brand.trim();
        }
        const firstToken = typeof lensName === 'string'
            ? lensName.trim().split(/\s+/)[0]
            : '';
        return firstToken || 'Other';
    };

    const deriveSeriesName = (lensName, manufacturer) => {
        if (typeof lensName !== 'string' || !lensName.trim()) {
            return 'General';
        }
        let remainder = lensName.trim();
        if (manufacturer && remainder.toLowerCase().startsWith(manufacturer.toLowerCase())) {
            remainder = remainder.slice(manufacturer.length).trim();
        }
        if (!remainder) return 'General';
        const tokens = remainder.split(/\s+/);
        const seriesTokens = [];
        for (let index = 0; index < tokens.length; index += 1) {
            const token = tokens[index];
            if (isSpecToken(token)) {
                break;
            }
            seriesTokens.push(token);
        }
        const series = seriesTokens.join(' ').trim();
        return series || 'General';
    };

    const extractMountLabels = (rawValue) => {
        const labels = [];
        const seen = new Set();
        const addLabel = (label) => {
            if (!label || seen.has(label)) return;
            seen.add(label);
            labels.push(label);
        };
        const processString = (value) => {
            if (!value || typeof value !== 'string') return;
            const sanitized = value
                .replace(/\([^)]*\)/g, ' ')
                .replace(/ or /gi, '/')
                .replace(/\\/g, '/');
            sanitized.split('/').forEach(segment => {
                segment.split(',').forEach(part => {
                    const token = part.trim();
                    if (!token || IGNORED_MOUNT_TOKENS.has(token)) {
                        return;
                    }
                    const mapped = MOUNT_TOKEN_MAP.has(token) ? MOUNT_TOKEN_MAP.get(token) : token;
                    if (mapped) addLabel(mapped);
                });
            });
        };

        if (Array.isArray(rawValue)) {
            rawValue.forEach(value => processString(value));
        } else {
            processString(rawValue);
        }

        return labels;
    };

    const resolveLensDataset = () => {
        const primary =
            (typeof devices === 'object'
                && devices
                && devices.lenses
                && Object.keys(devices.lenses).length
                ? devices.lenses
                : null);
        if (primary) return primary;
        if (typeof devices === 'object' && devices && devices.accessories && devices.accessories.lenses) {
            return devices.accessories.lenses;
        }
        return {};
    };

    const buildCatalog = () => {
        const lensDb = resolveLensDataset();
        const manufacturerMap = new Map();
        const lensIndex = new Map();
        const mountSet = new Set();
        const lensNames = Object.keys(lensDb || {});
        if (lensNames.length && sortComparator) {
            lensNames.sort(sortComparator);
        } else {
            lensNames.sort();
        }

        lensNames.forEach(name => {
            const lensData = lensDb[name] || {};
            const manufacturer = deriveManufacturer(lensData, name);
            const series = deriveSeriesName(name, manufacturer);
            const focalLabel = stripPrefix(stripPrefix(name, manufacturer), series);
            const mountLabels = extractMountLabels(lensData.mount);
            mountLabels.forEach(label => mountSet.add(label));

            const record = {
                name,
                data: lensData,
                manufacturer,
                series,
                displayName: name,
                focalLabel,
                mountLabels,
                optionMeta: mountLabels[0] ? `Mount: ${mountLabels[0]}` : ''
            };

            if (!manufacturerMap.has(manufacturer)) {
                manufacturerMap.set(manufacturer, new Map());
            }
            const seriesMap = manufacturerMap.get(manufacturer);
            if (!seriesMap.has(series)) {
                seriesMap.set(series, []);
            }
            seriesMap.get(series).push(record);
            lensIndex.set(name, record);
        });

        manufacturerMap.forEach(seriesMap => {
            seriesMap.forEach(list => {
                if (list.length && sortComparator) {
                    list.sort((a, b) => sortComparator(a.displayName, b.displayName));
                } else {
                    list.sort((a, b) => a.displayName.localeCompare(b.displayName));
                }
            });
        });

        const ensuredMounts = new Set(mountSet);
        ['PL', 'EF', 'LPL', 'E-mount'].forEach(label => ensuredMounts.add(label));
        const sortedMounts = Array.from(ensuredMounts);
        const mountPriority = new Map([
            ['PL', 0],
            ['EF', 1],
            ['LPL', 2],
            ['E-mount', 3]
        ]);
        sortedMounts.sort((a, b) => {
            const rankA = mountPriority.has(a) ? mountPriority.get(a) : 100;
            const rankB = mountPriority.has(b) ? mountPriority.get(b) : 100;
            if (rankA !== rankB) return rankA - rankB;
            if (sortComparator) {
                return sortComparator(a, b);
            }
            return a.localeCompare(b);
        });

        mountOptions = sortedMounts;

        return {
            manufacturers: manufacturerMap,
            lensIndex
        };
    };

    const getMountLabelFromCameraEntry = (entry) => {
        if (!entry || typeof entry.type !== 'string') return '';
        const labels = extractMountLabels(entry.type);
        return labels[0] || '';
    };

    const getCameraNativeMount = () => {
        const cameraElement = doc.getElementById('cameraSelect');
        const cameraName = cameraElement && typeof cameraElement.value === 'string'
            ? cameraElement.value
            : '';
        if (!cameraName || typeof devices !== 'object' || !devices || !devices.cameras) {
            return '';
        }
        const camera = devices.cameras[cameraName];
        if (!camera || !Array.isArray(camera.lensMount)) return '';
        for (let index = 0; index < camera.lensMount.length; index += 1) {
            const entry = camera.lensMount[index];
            if (!entry) continue;
            const normalizedType = getMountLabelFromCameraEntry(entry);
            if (normalizedType && String(entry.mount || '').toLowerCase() === 'native') {
                return normalizedType;
            }
        }
        for (let index = 0; index < camera.lensMount.length; index += 1) {
            const entry = camera.lensMount[index];
            const normalizedType = getMountLabelFromCameraEntry(entry);
            if (normalizedType) return normalizedType;
        }
        return '';
    };

    const buildMountOptionsForSelection = (currentMount, lensName) => {
        const options = [];
        const seen = new Set();
        const addOption = (label) => {
            if (!label || seen.has(label)) return;
            seen.add(label);
            options.push(label);
        };
        if (currentMount) addOption(currentMount);
        const lensRecord = catalog.lensIndex.get(lensName);
        if (lensRecord && Array.isArray(lensRecord.mountLabels)) {
            lensRecord.mountLabels.forEach(addOption);
        }
        const cameraMount = getCameraNativeMount();
        if (cameraMount) addOption(cameraMount);
        ['PL', 'EF', 'LPL'].forEach(addOption);
        mountOptions.forEach(addOption);
        return options;
    };

    const resolveDefaultMount = (lensName) => {
        const cameraMount = getCameraNativeMount();
        if (cameraMount) {
            return cameraMount;
        }
        const lensRecord = catalog.lensIndex.get(lensName);
        if (lensRecord && lensRecord.mountLabels && lensRecord.mountLabels.length) {
            return lensRecord.mountLabels[0];
        }
        if (mountOptions.includes('PL')) return 'PL';
        if (mountOptions.includes('EF')) return 'EF';
        if (mountOptions.includes('LPL')) return 'LPL';
        return mountOptions[0] || '';
    };

    const normalizeSelectionName = (value) => {
        if (typeof value !== 'string') return '';
        return value.trim();
    };

    const updateStepState = () => {
        const hasManufacturer = Boolean(state.manufacturer);
        const hasSeries = Boolean(state.series);

        if (manufacturerStep) {
            manufacturerStep.classList.toggle(STEP_DISABLED_CLASS, false);
        }
        if (seriesStep) {
            seriesStep.classList.toggle(STEP_DISABLED_CLASS, !hasManufacturer);
            seriesStep.setAttribute('aria-disabled', hasManufacturer ? 'false' : 'true');
        }
        if (optionsStep) {
            optionsStep.classList.toggle(STEP_DISABLED_CLASS, !hasSeries);
            optionsStep.setAttribute('aria-disabled', hasSeries ? 'false' : 'true');
        }
        seriesSelect.disabled = !hasManufacturer;
        placeholderToggle(seriesSelect, !state.series);
        placeholderToggle(manufacturerSelect, !state.manufacturer);
    };

    const syncLegacySelect = () => {
        const names = new Set(state.selections.map(selection => selection.name));
        Array.from(legacySelect.options || []).forEach(option => {
            if (!option || typeof option.value !== 'string') return;
            option.selected = names.has(option.value);
        });
    };

    const updateHiddenInputs = ({ skipEvent = false, skipDirty = false } = {}) => {
        const names = state.selections.map(selection => selection.name);
        const legacyValue = names.join(', ');
        const detailedValue = JSON.stringify(state.selections.map(selection => ({
            name: selection.name,
            mount: selection.mount || ''
        })));
        const legacyChanged = hiddenLegacyValue.value !== legacyValue;
        const detailedChanged = hiddenDetailedValue.value !== detailedValue;
        if (legacyChanged) hiddenLegacyValue.value = legacyValue;
        if (detailedChanged) hiddenDetailedValue.value = detailedValue;
        if (!skipEvent && (legacyChanged || detailedChanged)) {
            try {
                hiddenLegacyValue.dispatchEvent(new Event('change', { bubbles: true }));
                hiddenDetailedValue.dispatchEvent(new Event('change', { bubbles: true }));
            } catch (eventError) {
                void eventError;
            }
        }
        if (!skipDirty && (legacyChanged || detailedChanged)) {
            try {
                markProjectFormDataDirty();
            } catch (markError) {
                void markError;
            }
        }
        syncLegacySelect();
    };

    const renderSelectionChips = ({ skipEvent = false, skipDirty = false } = {}) => {
        selectionChips.innerHTML = '';
        if (!state.selections.length) {
            updateHiddenInputs({ skipEvent, skipDirty });
            return;
        }
        const removeTemplate = selectionChips.getAttribute(REMOVE_TEMPLATE_ATTR) || '';
        const mountLabel = selectionChips.getAttribute(MOUNT_LABEL_ATTR) || 'Mount';
        state.selections.forEach((selection, index) => {
            const lensRecord = catalog.lensIndex.get(selection.name);
            const displayName = lensRecord ? lensRecord.displayName : selection.name;
            const focalLabel = lensRecord && lensRecord.focalLabel ? lensRecord.focalLabel : '';
            const chip = doc.createElement('div');
            chip.className = 'lens-chip';
            chip.setAttribute('role', 'listitem');

            const labelContainer = doc.createElement('div');
            labelContainer.className = 'lens-chip-label';

            const nameSpan = doc.createElement('span');
            nameSpan.className = 'lens-chip-name';
            nameSpan.textContent = displayName;
            labelContainer.appendChild(nameSpan);

            if (focalLabel) {
                const focalSpan = doc.createElement('span');
                focalSpan.className = 'lens-chip-focal';
                focalSpan.textContent = focalLabel;
                labelContainer.appendChild(focalSpan);
            }

            chip.appendChild(labelContainer);

            const mountId = `lensMount-${index}`;
            const mountWrapper = doc.createElement('div');
            const mountLabelElem = doc.createElement('label');
            mountLabelElem.className = 'visually-hidden';
            mountLabelElem.setAttribute('for', mountId);
            mountLabelElem.textContent = `${mountLabel}: ${displayName}`;
            mountWrapper.appendChild(mountLabelElem);

            const mountSelect = doc.createElement('select');
            mountSelect.id = mountId;
            mountSelect.dataset.lensName = selection.name;
            const mountOptionsForSelect = buildMountOptionsForSelection(selection.mount, selection.name);
            mountOptionsForSelect.forEach(label => {
                const option = doc.createElement('option');
                option.value = label;
                option.textContent = label;
                if (selection.mount === label) {
                    option.selected = true;
                }
                mountSelect.appendChild(option);
            });
            if (!mountSelect.value && mountOptionsForSelect.length) {
                mountSelect.value = mountOptionsForSelect[0];
                selection.mount = mountSelect.value;
            }
            mountSelect.setAttribute('aria-label', `${mountLabel}: ${displayName}`);
            mountSelect.addEventListener('change', (event) => {
                const lensName = event.target.dataset.lensName;
                const newMount = typeof event.target.value === 'string' ? event.target.value : '';
                const record = state.selections.find(sel => sel.name === lensName);
                if (!record || record.mount === newMount) {
                    return;
                }
                record.mount = newMount;
                updateHiddenInputs();
            });
            mountWrapper.appendChild(mountSelect);
            chip.appendChild(mountWrapper);

            const removeBtn = doc.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'lens-chip-remove';
            removeBtn.dataset.lensName = selection.name;
            const removeLabel = removeTemplate.includes('{lens}')
                ? removeTemplate.replace('{lens}', displayName)
                : removeTemplate || displayName;
            removeBtn.setAttribute('aria-label', removeLabel);
            removeBtn.setAttribute('title', removeLabel);
            if (typeof iconMarkup === 'function' && typeof ICON_GLYPHS === 'object' && ICON_GLYPHS && ICON_GLYPHS.circleX) {
                removeBtn.innerHTML = iconMarkup(ICON_GLYPHS.circleX, 'btn-icon');
            } else {
                removeBtn.textContent = '×';
            }
            removeBtn.addEventListener('click', () => {
                removeSelection(selection.name, { focus: true });
            });
            chip.appendChild(removeBtn);

            selectionChips.appendChild(chip);
        });

        updateHiddenInputs({ skipEvent, skipDirty });
    };

    const renderLensOptions = () => {
        optionsContainer.innerHTML = '';
        optionInputs.clear();
        if (!state.series) {
            if (optionsEmptyMessage) optionsEmptyMessage.hidden = true;
            return;
        }
        const manufacturerMap = catalog.manufacturers.get(state.manufacturer);
        const lensList = manufacturerMap ? manufacturerMap.get(state.series) : null;
        if (!lensList || !lensList.length) {
            if (optionsEmptyMessage) optionsEmptyMessage.hidden = false;
            return;
        }
        if (optionsEmptyMessage) optionsEmptyMessage.hidden = true;
        lensList.forEach((lens, index) => {
            const wrapper = doc.createElement('div');
            wrapper.className = 'lens-option';
            const optionId = `lensOption-${index}`;
            const checkbox = doc.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = optionId;
            checkbox.dataset.lensName = lens.name;
            checkbox.checked = state.selections.some(sel => sel.name === lens.name);
            checkbox.addEventListener('change', (event) => {
                const checked = Boolean(event.target.checked);
                handleLensToggle(lens.name, checked);
            });
            wrapper.appendChild(checkbox);

            const label = doc.createElement('label');
            label.className = 'lens-option-label';
            label.setAttribute('for', optionId);

            const nameSpan = doc.createElement('span');
            nameSpan.className = 'lens-option-name';
            nameSpan.textContent = lens.displayName;
            label.appendChild(nameSpan);

            if (lens.optionMeta) {
                const metaSpan = doc.createElement('span');
                metaSpan.className = 'lens-option-meta';
                metaSpan.textContent = lens.optionMeta;
                label.appendChild(metaSpan);
            }

            wrapper.appendChild(label);
            optionsContainer.appendChild(wrapper);
            optionInputs.set(lens.name, checkbox);
        });
    };

    const renderSeries = () => {
        seriesSelect.innerHTML = '';
        seriesSelect.appendChild(seriesPlaceholder);
        const manufacturerMap = state.manufacturer ? catalog.manufacturers.get(state.manufacturer) : null;
        if (!manufacturerMap || manufacturerMap.size === 0) {
            state.series = '';
            if (seriesEmptyMessage) seriesEmptyMessage.hidden = Boolean(!state.manufacturer);
            if (optionsEmptyMessage) optionsEmptyMessage.hidden = true;
            seriesPlaceholder.selected = true;
            updateStepState();
            return;
        }
        const seriesNames = Array.from(manufacturerMap.keys());
        if (!seriesNames.length) {
            state.series = '';
            if (seriesEmptyMessage) seriesEmptyMessage.hidden = false;
            if (optionsEmptyMessage) optionsEmptyMessage.hidden = true;
            seriesPlaceholder.selected = true;
            updateStepState();
            return;
        }
        if (seriesEmptyMessage) seriesEmptyMessage.hidden = true;
        if (sortComparator) {
            seriesNames.sort(sortComparator);
        } else {
            seriesNames.sort();
        }
        seriesNames.forEach(name => {
            const option = doc.createElement('option');
            option.value = name;
            option.textContent = name;
            if (state.series === name) {
                option.selected = true;
            }
            seriesSelect.appendChild(option);
        });
        if (!manufacturerMap.has(state.series)) {
            state.series = '';
            seriesPlaceholder.selected = true;
        } else {
            seriesSelect.value = state.series;
        }
        updateStepState();
    };

    const renderManufacturers = () => {
        manufacturerSelect.innerHTML = '';
        manufacturerSelect.appendChild(manufacturerPlaceholder);
        const manufacturerNames = Array.from(catalog.manufacturers.keys());
        if (manufacturerNames.length) {
            if (sortComparator) {
                manufacturerNames.sort(sortComparator);
            } else {
                manufacturerNames.sort();
            }
            manufacturerNames.forEach(name => {
                const option = doc.createElement('option');
                option.value = name;
                option.textContent = name;
                if (state.manufacturer === name) {
                    option.selected = true;
                }
                manufacturerSelect.appendChild(option);
            });
        }
        if (!catalog.manufacturers.has(state.manufacturer)) {
            state.manufacturer = '';
            manufacturerPlaceholder.selected = true;
        } else {
            manufacturerSelect.value = state.manufacturer;
        }
        updateStepState();
    };

    const handleLensToggle = (lensName, checked) => {
        if (checked) {
            if (state.selections.some(sel => sel.name === lensName)) {
                return;
            }
            const selection = {
                name: lensName,
                mount: resolveDefaultMount(lensName)
            };
            state.selections.push(selection);
            renderSelectionChips();
        } else {
            removeSelection(lensName);
        }
    };

    const removeSelection = (lensName, { focus = false, skipEvent = false, skipDirty = false } = {}) => {
        const index = state.selections.findIndex(sel => sel.name === lensName);
        if (index === -1) return;
        state.selections.splice(index, 1);
        const input = optionInputs.get(lensName);
        if (input) {
            input.checked = false;
            if (focus) {
                input.focus();
            }
        }
        renderSelectionChips({ skipEvent, skipDirty });
    };

    const handleManufacturerChange = () => {
        const newValue = normalizeSelectionName(manufacturerSelect.value);
        if (newValue === state.manufacturer) {
            return;
        }
        state.manufacturer = newValue;
        state.series = '';
        renderManufacturers();
        renderSeries();
        renderLensOptions();
    };

    const handleSeriesChange = () => {
        const newValue = normalizeSelectionName(seriesSelect.value);
        if (newValue === state.series) {
            return;
        }
        state.series = newValue;
        renderSeries();
        renderLensOptions();
    };

    const applyInfo = (info = {}) => {
        catalog = buildCatalog();
        const validNames = new Set(catalog.lensIndex.keys());
        const prepared = [];
        const seen = new Set();
        if (Array.isArray(info.lensSelections)) {
            info.lensSelections.forEach(entry => {
                if (!entry || typeof entry !== 'object') return;
                const name = normalizeSelectionName(entry.name);
                if (!name || seen.has(name) || !validNames.has(name)) return;
                const mount = typeof entry.mount === 'string' ? entry.mount.trim() : '';
                prepared.push({ name, mount });
                seen.add(name);
            });
        }
        if (!prepared.length) {
            normalizeLensSelectionNames(info.lenses).forEach(name => {
                const normalized = normalizeSelectionName(name);
                if (!normalized || seen.has(normalized) || !validNames.has(normalized)) return;
                prepared.push({ name: normalized, mount: '' });
                seen.add(normalized);
            });
        }
        state.selections = prepared.map(entry => ({
            name: entry.name,
            mount: entry.mount || resolveDefaultMount(entry.name)
        }));
        if (state.selections.length) {
            const firstRecord = catalog.lensIndex.get(state.selections[0].name);
            state.manufacturer = firstRecord ? firstRecord.manufacturer : '';
            state.series = firstRecord ? firstRecord.series : '';
        } else {
            state.manufacturer = '';
            state.series = '';
        }
        renderManufacturers();
        renderSeries();
        renderLensOptions();
        renderSelectionChips({ skipEvent: true, skipDirty: true });
    };

    const snapshot = () => ({
        names: state.selections.map(selection => selection.name),
        lensSelections: state.selections.map(selection => ({
            name: selection.name,
            mount: selection.mount || ''
        })),
        legacyValue: state.selections.map(selection => selection.name).join(', ')
    });

    const refreshCatalog = ({ preserveSelections = true, skipEvent = false, skipDirty = false } = {}) => {
        const previousSelections = preserveSelections
            ? state.selections.map(selection => ({ ...selection }))
            : [];
        const previousManufacturer = preserveSelections ? state.manufacturer : '';
        const previousSeries = preserveSelections ? state.series : '';
        catalog = buildCatalog();
        const validNames = new Set(catalog.lensIndex.keys());
        state.selections = preserveSelections
            ? previousSelections.filter(selection => validNames.has(selection.name))
            : [];
        state.manufacturer = preserveSelections && catalog.manufacturers.has(previousManufacturer)
            ? previousManufacturer
            : '';
        if (state.manufacturer) {
            const seriesMap = catalog.manufacturers.get(state.manufacturer);
            state.series = seriesMap && seriesMap.has(previousSeries) ? previousSeries : '';
        } else {
            state.series = '';
        }
        renderManufacturers();
        renderSeries();
        renderLensOptions();
        renderSelectionChips({
            skipEvent: skipEvent || preserveSelections,
            skipDirty: skipDirty || preserveSelections
        });
    };

    manufacturerSelect.addEventListener('change', handleManufacturerChange);
    seriesSelect.addEventListener('change', handleSeriesChange);

    catalog = buildCatalog();
    renderManufacturers();
    renderSeries();
    renderLensOptions();
    renderSelectionChips({ skipEvent: true, skipDirty: true });

    return {
        snapshot,
        applyInfo,
        refreshCatalog,
        getSelections() {
            return state.selections.map(selection => ({ ...selection }));
        }
    };
})();

if (typeof globalThis !== 'undefined' && globalThis) {
    if (typeof globalThis.updateLensWorkflowCatalog !== 'function') {
        globalThis.updateLensWorkflowCatalog = function updateLensWorkflowCatalog(options) {
            try {
                lensSelectionManager.refreshCatalog(options || { preserveSelections: true, skipEvent: true, skipDirty: true });
            } catch (refreshError) {
                void refreshError;
            }
        };
    }
    if (!globalThis.lensSelectionManager) {
        globalThis.lensSelectionManager = lensSelectionManager;
    }
}

function normalizeLensSelectionNames(value) {
    if (Array.isArray(value)) {
        return value
            .map(name => (typeof name === 'string' ? name.trim() : ''))
            .filter(Boolean);
    }
    if (typeof value === 'string') {
        return value
            .split(',')
            .map(name => name.trim())
            .filter(Boolean);
    }
    return [];
}


function markProjectFormDataDirty() {
    projectFormDataCacheDirty = true;
    projectFormDataCache = null;
}

function suspendProjectPersistence() {
    projectPersistenceSuspendedCount += 1;
}

function resumeProjectPersistence() {
    if (projectPersistenceSuspendedCount > 0) {
        projectPersistenceSuspendedCount -= 1;
    }
    return projectPersistenceSuspendedCount;
}

function isProjectPersistenceSuspended() {
    return projectPersistenceSuspendedCount > 0;
}

const localGetLocalizedText = (() => {
    function fallbackGetLocalizedText(key) {
        if (!key) return '';

        const scope = getGlobalScope();
        const allTexts =
            (scope && typeof scope.texts === 'object' && scope.texts)
            || (typeof texts === 'object' && texts)
            || null;

        if (!allTexts) {
            return '';
        }

        const scopeLang =
            scope
            && typeof scope.currentLang === 'string'
            && typeof allTexts[scope.currentLang] === 'object'
                ? scope.currentLang
                : null;

        const localLang =
            typeof currentLang === 'string'
            && typeof allTexts[currentLang] === 'object'
                ? currentLang
                : null;

        const langKey = scopeLang || localLang || 'en';
        const langTexts = (typeof allTexts[langKey] === 'object' && allTexts[langKey]) || {};

        const directValue = Object.prototype.hasOwnProperty.call(langTexts, key)
            ? langTexts[key]
            : undefined;

        if (typeof directValue === 'string') {
            return directValue;
        }

        const fallbackTexts = (typeof allTexts.en === 'object' && allTexts.en) || {};
        const fallbackValue = Object.prototype.hasOwnProperty.call(fallbackTexts, key)
            ? fallbackTexts[key]
            : undefined;

        return typeof fallbackValue === 'string' ? fallbackValue : '';
    }

    let loggedGlobalFailure = false;

    return function resolveLocalizedText(key) {
        const scope = getGlobalScope();
        const globalFn =
            scope
            && typeof scope.getLocalizedText === 'function'
            && scope.getLocalizedText !== resolveLocalizedText
                ? scope.getLocalizedText
                : null;

        if (globalFn) {
            try {
                const value = globalFn(key);
                if (typeof value === 'string') {
                    return value;
                }
            } catch (error) {
                if (!loggedGlobalFailure && typeof console !== 'undefined' && typeof console.warn === 'function') {
                    console.warn('getLocalizedText fallback used after global failure', error);
                    loggedGlobalFailure = true;
                }
            }
        }

        return fallbackGetLocalizedText(key);
    };
})();

const localizationScope = getGlobalScope();
if (localizationScope && typeof localizationScope.getLocalizedText !== 'function') {
    localizationScope.getLocalizedText = localGetLocalizedText;
}

const RENTAL_HOUSE_DATALIST_ID = 'rentalHouseOptions';

function resolveRentalHouseCatalog() {
    const candidates = [];

    if (typeof require === 'function') {
        try {
            const moduleExport = require('../data/rental-houses.js');
            if (Array.isArray(moduleExport) && moduleExport.length) {
                candidates.push(moduleExport);
            } else if (moduleExport && Array.isArray(moduleExport.rentalHouses) && moduleExport.rentalHouses.length) {
                candidates.push(moduleExport.rentalHouses);
            } else if (moduleExport && Array.isArray(moduleExport.default) && moduleExport.default.length) {
                candidates.push(moduleExport.default);
            }
        } catch (catalogLoadError) {
            const message = catalogLoadError && catalogLoadError.message ? catalogLoadError.message : '';
            if (
                catalogLoadError &&
                catalogLoadError.code !== 'MODULE_NOT_FOUND' &&
                !/Cannot find module/i.test(message)
            ) {
                try {
                    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                        console.warn('Unable to load rental house catalog module', catalogLoadError);
                    }
                } catch (warnError) {
                    void warnError;
                }
            }
        }
    }

    const scope = getGlobalScope();
    if (scope) {
        const scopedDevices = scope.devices;
        if (scopedDevices && Array.isArray(scopedDevices.rentalHouses) && scopedDevices.rentalHouses.length) {
            candidates.push(scopedDevices.rentalHouses);
        }
        if (Array.isArray(scope.rentalHouses) && scope.rentalHouses.length) {
            candidates.push(scope.rentalHouses);
        }
    }

    if (typeof devices !== 'undefined' && devices && Array.isArray(devices.rentalHouses) && devices.rentalHouses.length) {
        candidates.push(devices.rentalHouses);
    }

    for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        if (Array.isArray(candidate) && candidate.length) {
            return candidate.slice();
        }
    }

    return [];
}

const rentalHouseCatalog = resolveRentalHouseCatalog();
const RENTAL_HOUSE_SUGGESTION_LIMIT = 50;

function normalizeRentalHouseSearchValue(value) {
    if (!value) return '';
    let normalized = String(value);
    try {
        if (typeof normalized.normalize === 'function') {
            normalized = normalized.normalize('NFD');
        }
    } catch (error) {
        void error;
    }
    return normalized
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[\u2012\u2013\u2014\u2015]/g, '-')
        .replace(/[^a-z0-9]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

const rentalHouseSearchIndex = rentalHouseCatalog
    .map(entry => {
        if (!entry || typeof entry !== 'object') return null;
        const name = entry.name ? String(entry.name).trim() : '';
        if (!name) return null;
        const key = normalizeRentalHouseKey(name);
        if (!key) return null;
        const location = formatRentalHouseLocation(entry);
        const normalizedName = normalizeRentalHouseSearchValue(name);
        const normalizedLocation = normalizeRentalHouseSearchValue(location);
        const additionalParts = normalizeRentalHouseSearchValue(
            [entry.city, entry.country, entry.address, entry.phone, entry.email]
                .map(part => (part ? String(part).trim() : ''))
                .filter(Boolean)
                .join(' ')
        );
        const searchKey = [normalizedName, normalizedLocation, additionalParts]
            .filter(Boolean)
            .join(' ');

        return {
            entry,
            name,
            key,
            location,
            normalizedName,
            normalizedLocation,
            searchKey
        };
    })
    .filter(Boolean);

const rentalHouseCatalogSignature = rentalHouseSearchIndex
    .map(info => `${info.key}|${info.location}`)
    .join('||');

function normalizeRentalHouseKey(value) {
    if (!value) return '';
    return String(value)
        .trim()
        .replace(/[\u2012\u2013\u2014\u2015]/g, '-')
        .toLowerCase();
}

const rentalHouseLookup = (() => {
    const map = Object.create(null);
    rentalHouseCatalog.forEach(entry => {
        if (!entry || typeof entry !== 'object') return;
        const key = normalizeRentalHouseKey(entry.name);
        if (key && !map[key]) {
            map[key] = entry;
        }
    });
    return map;
})();

const RENTAL_HOUSE_SUFFIX_TOKENS = new Set([
    'AG',
    'BV',
    'BVBA',
    'CO',
    'GMBH',
    'INC',
    'KG',
    'LLC',
    'LTD',
    'PLC',
    'PTY',
    'SAS',
    'SARL',
    'SL',
    'SPA',
    'S.P.A',
    'SRL'
]);

function formatRentalHouseShortName(entryOrName) {
    if (!entryOrName) return '';
    const explicit = typeof entryOrName === 'object'
        && entryOrName
        && typeof entryOrName.shortName === 'string'
            ? entryOrName.shortName.trim()
            : '';
    if (explicit) {
        return explicit;
    }
    const rawName = typeof entryOrName === 'string'
        ? entryOrName
        : (entryOrName && entryOrName.name);
    const name = rawName ? String(rawName).trim() : '';
    if (!name) return '';
    let base = name.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
    const separatorMatch = base.match(/\s*[\u2012\u2013\u2014\u2015-]\s*/);
    if (separatorMatch) {
        const index = base.indexOf(separatorMatch[0]);
        if (index > 0) {
            base = base.slice(0, index).trim();
        }
    }
    if (!base) {
        base = name.trim();
    }
    const uppercaseTokens = base.match(/\b[A-Z]{2,5}\b/g);
    if (uppercaseTokens && uppercaseTokens.length) {
        for (let i = 0; i < uppercaseTokens.length; i += 1) {
            const token = uppercaseTokens[i];
            if (!RENTAL_HOUSE_SUFFIX_TOKENS.has(token)) {
                if (token === 'ARRI') return 'Arri';
                return token;
            }
        }
    }
    if (/^arri\b/i.test(base)) {
        return 'Arri';
    }
    if (/^ludwig\s+kamera/i.test(base)) {
        return 'Kamera Ludwig';
    }
    return base.trim();
}

function resolveCurrentRentalHouseValue(options = {}) {
    const input = options.input || resolveRentalHouseInput();
    if (options.preferInput !== false && input && typeof input.value === 'string') {
        const inputValue = input.value.trim();
        if (inputValue) {
            return inputValue;
        }
    }
    if (typeof options.rentalHouse === 'string' && options.rentalHouse.trim()) {
        return options.rentalHouse.trim();
    }
    let info = null;
    const scope = getGlobalScope();
    if (scope && typeof scope.getCurrentProjectInfo === 'function') {
        try {
            info = scope.getCurrentProjectInfo();
        } catch (scopeError) {
            void scopeError;
        }
    }
    const profileValue = info && typeof info === 'object' && typeof info.rentalHouse === 'string'
        ? info.rentalHouse.trim()
        : '';
    if (profileValue) {
        return profileValue;
    }
    if (options.preferInput === false && input && typeof input.value === 'string') {
        return input.value.trim();
    }
    return '';
}

function resolveRentalProviderNoteLabel(options = {}) {
    const fallback = typeof options.fallback === 'string' ? options.fallback : '';
    const rentalValue = typeof options.rentalHouse === 'string' && options.rentalHouse.trim()
        ? options.rentalHouse.trim()
        : resolveCurrentRentalHouseValue({ input: options.input });
    if (!rentalValue) {
        return fallback;
    }
    const match = rentalHouseLookup[normalizeRentalHouseKey(rentalValue)];
    const shortName = formatRentalHouseShortName(match || rentalValue);
    if (shortName) {
        return shortName;
    }
    return fallback || rentalValue;
}

let appliedRentalNoteLabel = null;

function refreshRentalProviderNoteDisplays(options = {}) {
    const rentalTexts = getGearListRentalToggleTexts(options);
    const nextLabel = rentalTexts.noteLabel && rentalTexts.noteLabel.trim()
        ? rentalTexts.noteLabel.trim()
        : '';
    if (appliedRentalNoteLabel === nextLabel) {
        return nextLabel;
    }
    appliedRentalNoteLabel = nextLabel;
    const doc = typeof document !== 'undefined' ? document : null;
    const roots = [];
    if (typeof gearListOutput !== 'undefined' && gearListOutput) {
        roots.push(gearListOutput);
    }
    if (typeof projectRequirementsOutput !== 'undefined' && projectRequirementsOutput) {
        roots.push(projectRequirementsOutput);
    }
    if (doc) {
        roots.push(doc);
    }
    if (roots.length) {
        const selector = '.gear-item[data-rental-note], .gear-custom-item[data-rental-note]';
        roots.forEach(root => {
            if (!root || typeof root.querySelectorAll !== 'function') {
                return;
            }
            root.querySelectorAll(selector).forEach(element => {
                if (!element || typeof element.setAttribute !== 'function') {
                    return;
                }
                if (nextLabel) {
                    if (element.getAttribute('data-rental-note') !== nextLabel) {
                        element.setAttribute('data-rental-note', nextLabel);
                    }
                } else if (typeof element.removeAttribute === 'function') {
                    element.removeAttribute('data-rental-note');
                }
            });
        });
    }
    let context = null;
    if (typeof getGearItemEditContext === 'function') {
        try {
            context = getGearItemEditContext();
        } catch (contextError) {
            if (!contextError || contextError.name !== 'ReferenceError') {
                throw contextError;
            }
        }
    }
    if (context && context.rentalDescription) {
        context.rentalDescription.textContent = nextLabel;
        context.rentalDescription.hidden = !nextLabel;
        if (context.rentalCheckbox) {
            if (nextLabel) {
                context.rentalCheckbox.setAttribute('aria-describedby', context.rentalDescription.id);
            } else {
                context.rentalCheckbox.removeAttribute('aria-describedby');
            }
        }
    }
    return nextLabel;
}

function formatRentalHouseLocation(entry) {
    const parts = [];
    const city = entry && entry.city ? String(entry.city).trim() : '';
    const country = entry && entry.country ? String(entry.country).trim() : '';
    if (city) parts.push(city);
    if (country) parts.push(country);
    return parts.join(', ');
}

function formatRentalHouseTooltip(entry) {
    if (!entry || typeof entry !== 'object') return '';
    const segments = [];
    const location = formatRentalHouseLocation(entry);
    const address = entry.address ? String(entry.address).trim() : '';
    const phone = entry.phone ? String(entry.phone).trim() : '';
    const email = entry.email ? String(entry.email).trim() : '';
    if (location) segments.push(location);
    if (address) segments.push(address);
    if (phone) segments.push(phone);
    if (email) segments.push(email);
    return segments.join(' • ');
}

function resolveRentalHouseInput() {
    if (typeof document === 'undefined') return null;
    return document.getElementById('rentalHouse');
}

function ensureRentalHouseDatalist(input) {
    if (!input || typeof document === 'undefined') return null;
    let listId = input.getAttribute('list');
    if (!listId) {
        listId = RENTAL_HOUSE_DATALIST_ID;
        input.setAttribute('list', listId);
    }
    let datalist = listId ? document.getElementById(listId) : null;
    if (!datalist) {
        datalist = document.createElement('datalist');
        datalist.id = listId;
        input.insertAdjacentElement('afterend', datalist);
    }
    return datalist;
}

function scoreRentalHouseMatch(info, query) {
    if (!query) return 0;
    if (!info) return Number.POSITIVE_INFINITY;

    const { normalizedName, normalizedLocation, searchKey } = info;
    if (!searchKey || searchKey.indexOf(query) === -1) {
        return Number.POSITIVE_INFINITY;
    }

    const nameIndex = normalizedName ? normalizedName.indexOf(query) : -1;
    const locationIndex = normalizedLocation ? normalizedLocation.indexOf(query) : -1;

    if (nameIndex === 0) {
        return 0;
    }
    if (locationIndex === 0) {
        return 100;
    }
    if (nameIndex > 0) {
        return 200 + nameIndex;
    }
    if (locationIndex > 0) {
        return 400 + locationIndex;
    }

    const searchIndex = searchKey.indexOf(query);
    return 800 + (searchIndex >= 0 ? searchIndex : 0);
}

function getRentalHouseMatches(query) {
    const normalizedQuery = normalizeRentalHouseSearchValue(query);

    if (!normalizedQuery) {
        return rentalHouseSearchIndex
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, RENTAL_HOUSE_SUGGESTION_LIMIT);
    }

    const results = [];
    rentalHouseSearchIndex.forEach(info => {
        const score = scoreRentalHouseMatch(info, normalizedQuery);
        if (!Number.isFinite(score)) return;
        results.push({ info, score });
    });

    results.sort((a, b) => {
        if (a.score !== b.score) return a.score - b.score;
        return a.info.name.localeCompare(b.info.name);
    });

    return results.slice(0, RENTAL_HOUSE_SUGGESTION_LIMIT).map(result => result.info);
}

function renderRentalHouseSuggestions(input = resolveRentalHouseInput()) {
    if (!input || !rentalHouseSearchIndex.length) return;
    const datalist = ensureRentalHouseDatalist(input);
    if (!datalist) return;

    const query = typeof input.value === 'string' ? input.value : '';
    const normalizedQuery = normalizeRentalHouseSearchValue(query);
    const signature = `${rentalHouseCatalogSignature}::${normalizedQuery}`;

    if (datalist.__rentalHouseSignature === signature) {
        return;
    }

    const fragment = document.createDocumentFragment();
    const seen = new Set();

    const matches = getRentalHouseMatches(query);
    const suggestions = matches.length ? matches : getRentalHouseMatches('');

    suggestions.forEach(info => {
        if (!info || seen.has(info.key)) return;
        const option = document.createElement('option');
        option.value = info.name;
        if (info.location) {
            option.label = info.location;
        }
        option.textContent = info.name;
        fragment.appendChild(option);
        seen.add(info.key);
    });

    datalist.innerHTML = '';
    datalist.appendChild(fragment);
    datalist.__rentalHouseSignature = signature;
}

function updateRentalHouseAssistiveDetails(input = resolveRentalHouseInput()) {
    if (!input) return;
    const value = typeof input.value === 'string' ? input.value.trim() : '';
    const match = value ? rentalHouseLookup[normalizeRentalHouseKey(value)] : null;
    if (match) {
        const tooltip = formatRentalHouseTooltip(match);
        if (tooltip) {
            input.title = tooltip;
            input.setAttribute('data-help', tooltip);
        } else {
            input.removeAttribute('title');
            input.removeAttribute('data-help');
        }
    } else {
        input.removeAttribute('title');
        input.removeAttribute('data-help');
    }
    refreshRentalProviderNoteDisplays({ input, rentalHouse: value });
}

const initialRentalHouseInput = resolveRentalHouseInput();
if (initialRentalHouseInput) {
    if (rentalHouseSearchIndex.length) {
        renderRentalHouseSuggestions(initialRentalHouseInput);
    }
    updateRentalHouseAssistiveDetails(initialRentalHouseInput);
    initialRentalHouseInput.addEventListener('input', () => {
        renderRentalHouseSuggestions(initialRentalHouseInput);
        updateRentalHouseAssistiveDetails(initialRentalHouseInput);
    });
    initialRentalHouseInput.addEventListener('change', () => {
        renderRentalHouseSuggestions(initialRentalHouseInput);
        updateRentalHouseAssistiveDetails(initialRentalHouseInput);
    });
    initialRentalHouseInput.addEventListener('blur', () => updateRentalHouseAssistiveDetails(initialRentalHouseInput));
    initialRentalHouseInput.addEventListener('focus', () => renderRentalHouseSuggestions(initialRentalHouseInput));
}

// --- NEW SETUP MANAGEMENT FUNCTIONS ---

function hasMeaningfulPowerSelection(value) {
    if (typeof value !== 'string') return false;
    const trimmed = value.trim();
    if (!trimmed) return false;
    return trimmed.toLowerCase() !== 'none';
}

function normalizePowerSelectionString(value) {
    if (typeof value === 'string') return value.trim();
    if (value === null || value === undefined) return '';
    return String(value);
}

function assignSelectValue(select, value) {
    if (!select) return;
    if (typeof setSelectValue === 'function') {
        setSelectValue(select, value);
    } else if (value === undefined) {
        select.selectedIndex = -1;
    } else {
        select.value = value;
    }
}

function getGlobalScope() {
    return (
        (typeof globalThis !== 'undefined' && globalThis)
        || (typeof window !== 'undefined' && window)
        || (typeof self !== 'undefined' && self)
        || (typeof global !== 'undefined' && global)
        || null
    );
}

function resolveSetupsStructuredClone(scope) {
    if (typeof structuredClone === 'function') {
        return structuredClone;
    }

    if (scope && typeof scope.structuredClone === 'function') {
        try {
            return scope.structuredClone.bind(scope);
        } catch (bindError) {
            void bindError;
        }
    }

    if (typeof require === 'function') {
        try {
            const nodeUtil = require('node:util');
            if (nodeUtil && typeof nodeUtil.structuredClone === 'function') {
                return nodeUtil.structuredClone.bind(nodeUtil);
            }
        } catch (nodeUtilError) {
            void nodeUtilError;
        }

        try {
            const legacyUtil = require('util');
            if (legacyUtil && typeof legacyUtil.structuredClone === 'function') {
                return legacyUtil.structuredClone.bind(legacyUtil);
            }
        } catch (legacyUtilError) {
            void legacyUtilError;
        }
    }

    return null;
}

function setupsJsonDeepClone(value) {
    if (value === null || typeof value !== 'object') {
        return value;
    }

    try {
        return JSON.parse(JSON.stringify(value));
    } catch (jsonCloneError) {
        void jsonCloneError;
    }

    return value;
}

function createSetupsDeepClone(scope) {
    const structuredCloneImpl = resolveSetupsStructuredClone(scope);

    if (!structuredCloneImpl) {
        return setupsJsonDeepClone;
    }

    return function setupsResilientDeepClone(value) {
        if (value === null || typeof value !== 'object') {
            return value;
        }

        try {
            return structuredCloneImpl(value);
        } catch (structuredCloneError) {
            void structuredCloneError;
        }

        return setupsJsonDeepClone(value);
    };
}

const SETUPS_DEEP_CLONE = (() => {
    const scope = getGlobalScope();
    if (scope && typeof scope.__cineDeepClone === 'function') {
        return scope.__cineDeepClone;
    }

    return createSetupsDeepClone(scope);
})();

function gearListGetSafeHtmlSectionsImpl(html) {
    const normalizedHtml = typeof html === 'string' ? html : '';
    const fallbackResult = {
        projectHtml: '',
        gearHtml: normalizedHtml
    };

    const scope = getGlobalScope();

    const splitter =
        typeof splitGearListHtml === 'function'
            ? splitGearListHtml
            : scope && typeof scope.splitGearListHtml === 'function'
                ? scope.splitGearListHtml
                : null;

    if (!splitter) {
        return fallbackResult;
    }

    try {
        const result = splitter(normalizedHtml);
        if (!result || typeof result !== 'object') {
            return fallbackResult;
        }

        const projectHtml =
            typeof result.projectHtml === 'string' ? result.projectHtml : '';
        const gearHtml =
            typeof result.gearHtml === 'string'
                ? result.gearHtml
                : projectHtml
                    ? ''
                    : normalizedHtml;

        return {
            projectHtml,
            gearHtml
        };
    } catch (error) {
        console.warn('Failed to split gear list HTML', error);
        return fallbackResult;
    }
}

function resolveElementById(id, globalName) {
    const doc = typeof document !== 'undefined' ? document : null;
    if (doc && typeof doc.getElementById === 'function') {
        const element = doc.getElementById(id);
        if (element) {
            return element;
        }
    }

    const scope = getGlobalScope();
    if (scope && globalName && typeof scope === 'object') {
        try {
            const candidate = scope[globalName];
            if (candidate) {
                return candidate;
            }
        } catch (error) {
            void error;
        }
    }

    return null;
}

function resolveGearListModule() {
    const scope = getGlobalScope();
    const candidates = [];

    if (typeof cineGearList === 'object' && cineGearList) {
        candidates.push(cineGearList);
    }

    if (scope && typeof scope.cineGearList === 'object' && scope.cineGearList) {
        if (!candidates.includes(scope.cineGearList)) {
            candidates.push(scope.cineGearList);
        }
    }

    if (typeof require === 'function') {
        try {
            const required = require('./modules/gear-list.js');
            if (required && typeof required === 'object' && !candidates.includes(required)) {
                candidates.push(required);
            }
        } catch (error) {
            void error;
        }
    }

    for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        if (!candidate || typeof candidate.setImplementation !== 'function') {
            continue;
        }
        return candidate;
    }

    return null;
}

function registerGearListModuleImplementation() {
    const module = resolveGearListModule();
    const implementation = {
        getSafeGearListHtmlSections: gearListGetSafeHtmlSectionsImpl,
        generateGearListHtml: gearListGenerateHtmlImpl,
        getCurrentGearListHtml: gearListGetCurrentHtmlImpl
    };

    if (module && typeof module.setImplementation === 'function') {
        try {
            module.setImplementation(implementation, { source: 'app-setups' });
            return true;
        } catch (error) {
            if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
                console.warn('Unable to register gear list implementation with cineGearList.', error);
            }
        }
    }

    const scope = getGlobalScope();
    if (scope && typeof scope === 'object') {
        try { scope.getSafeGearListHtmlSections = gearListGetSafeHtmlSectionsImpl; } catch (error) { void error; }
        try { scope.generateGearListHtml = gearListGenerateHtmlImpl; } catch (error) { void error; }
        try { scope.getCurrentGearListHtml = gearListGetCurrentHtmlImpl; } catch (error) { void error; }
    }

    return false;
}

registerGearListModuleImplementation();

function buildShareUiContext() {
    return {
        dialog: resolveElementById('shareDialog', 'shareDialog'),
        form: resolveElementById('shareForm', 'shareForm'),
        filenameInput: resolveElementById('shareFilename', 'shareFilenameInput'),
        filenameMessage: resolveElementById('shareFilenameMessage', 'shareFilenameMessage'),
        linkMessage: resolveElementById('shareLinkMessage', 'shareLinkMessage'),
        includeAutoGearCheckbox: resolveElementById('shareIncludeAutoGear', 'shareIncludeAutoGearCheckbox'),
        includeAutoGearLabel: resolveElementById('shareIncludeAutoGearLabel', 'shareIncludeAutoGearLabelElem'),
        cancelButton: resolveElementById('shareCancelBtn', 'shareCancelBtn'),
        sharedLinkInput: resolveElementById('sharedLinkInput', 'sharedLinkInput'),
        applySharedLinkButton: resolveElementById('applySharedLinkBtn', 'applySharedLinkBtn'),
    };
}

function buildSharedImportUiContext() {
    return {
        dialog: resolveElementById('sharedImportDialog', 'sharedImportDialog'),
        form: resolveElementById('sharedImportForm', 'sharedImportForm'),
        modeSelect: resolveElementById('sharedImportModeSelect', 'sharedImportModeSelect'),
        cancelButton: resolveElementById('sharedImportCancelBtn', 'sharedImportCancelBtn'),
    };
}

let cachedShareUiContext = null;
let cachedSharedImportUiContext = null;
let projectDialogInitialSnapshot = null;

function getShareUiContext(scope) {
    if (scope && typeof scope === 'object' && scope.context && typeof scope.context === 'object') {
        return scope.context;
    }

    if (!cachedShareUiContext) {
        cachedShareUiContext = buildShareUiContext();
    }

    return cachedShareUiContext;
}

function getSharedImportUiContext(scope) {
    if (scope && typeof scope === 'object' && scope.context && typeof scope.context === 'object') {
        return scope.context;
    }

    if (!cachedSharedImportUiContext) {
        cachedSharedImportUiContext = buildSharedImportUiContext();
    }

    return cachedSharedImportUiContext;
}

function cloneProjectDialogState(value) {
    if (value === null || value === undefined) {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map(item => cloneProjectDialogState(item));
    }
    if (Object.prototype.toString.call(value) === '[object Object]') {
        const clone = {};
        Object.keys(value).forEach(key => {
            clone[key] = cloneProjectDialogState(value[key]);
        });
        return clone;
    }
    return value;
}

function getProjectDialogSeedInfo() {
    if (currentProjectInfo) {
        return cloneProjectDialogState(currentProjectInfo);
    }
    if (projectForm) {
        try {
            return cloneProjectDialogState(collectProjectFormData());
        } catch (error) {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn('Failed to read current project form data before opening dialog', error);
            }
        }
    }
    return {};
}

function captureProjectDialogSnapshot() {
    if (!projectForm) {
        projectDialogInitialSnapshot = null;
        return;
    }
    try {
        const snapshot = collectProjectFormData();
        projectDialogInitialSnapshot = cloneProjectDialogState(snapshot);
    } catch (error) {
        projectDialogInitialSnapshot = null;
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Failed to capture project dialog snapshot', error);
        }
    }
}

function openProjectDialogWithInfo(info) {
    if (projectForm) {
        const seed = info && typeof info === 'object' ? info : {};
        populateProjectForm(seed);
        captureProjectDialogSnapshot();
    } else {
        projectDialogInitialSnapshot = null;
    }
    openDialog(projectDialog);
}

function restoreProjectDialogSnapshot() {
    if (!projectForm) return;
    if (projectDialogInitialSnapshot && typeof projectDialogInitialSnapshot === 'object') {
        populateProjectForm(cloneProjectDialogState(projectDialogInitialSnapshot));
    } else {
        projectForm.reset();
    }
}

function callSetupsCoreFunction(functionName, args = [], options = {}) {
    if (typeof callCoreFunctionIfAvailable === 'function') {
        return callCoreFunctionIfAvailable(functionName, args, options);
    }

    const scope =
        (typeof globalThis !== 'undefined' ? globalThis : null)
        || (typeof window !== 'undefined' ? window : null)
        || (typeof self !== 'undefined' ? self : null)
        || (typeof global !== 'undefined' ? global : null)
        || null;

    const target =
        typeof functionName === 'string'
            ? scope && scope[functionName]
            : functionName;

    if (typeof target === 'function') {
        try {
            return target.apply(scope, args);
        } catch (invokeError) {
            if (typeof console !== 'undefined' && typeof console.error === 'function') {
                console.error(`Failed to invoke ${functionName}`, invokeError);
            }
        }
        return undefined;
    }

    if (options && options.defer === true) {
        const queue = scope && Array.isArray(scope.CORE_BOOT_QUEUE) ? scope.CORE_BOOT_QUEUE : null;
        if (queue) {
            queue.push(() => {
                callSetupsCoreFunction(functionName, args, { ...options, defer: false });
            });
        }
    }

    return (options && Object.prototype.hasOwnProperty.call(options, 'defaultValue'))
        ? options.defaultValue
        : undefined;
}

function getSetupsCoreValue(functionName, options = {}) {
    const defaultValue = Object.prototype.hasOwnProperty.call(options, 'defaultValue')
        ? options.defaultValue
        : '';
    const value = callSetupsCoreFunction(functionName, [], { defaultValue });
    if (typeof value === 'string') {
        return value;
    }
    if (value === null || value === undefined) {
        return defaultValue;
    }
    try {
        return String(value);
    } catch (coerceError) {
        void coerceError;
        return defaultValue;
    }
}

function getGlobalCineUi() {
    const scope =
        (typeof globalThis !== 'undefined' && globalThis)
        || (typeof window !== 'undefined' && window)
        || (typeof self !== 'undefined' && self)
        || (typeof global !== 'undefined' && global)
        || null;

    if (!scope || typeof scope !== 'object') {
        return null;
    }

    try {
        const candidate = scope.cineUi;
        return candidate && typeof candidate === 'object' ? candidate : null;
    } catch (error) {
        void error;
        return null;
    }
}

function isCineUiEntryRegistered(registry, name) {
    if (!registry || typeof registry !== 'object') {
        return false;
    }

    if (typeof registry.get === 'function') {
        try {
            return Boolean(registry.get(name));
        } catch (error) {
            void error;
        }
    }

    if (typeof registry.list === 'function') {
        try {
            const entries = registry.list();
            return Array.isArray(entries) && entries.indexOf(name) !== -1;
        } catch (error) {
            void error;
        }
    }

    return false;
}

function registerCineUiEntries(registry, entries, warningMessage) {
    if (!registry || typeof registry.register !== 'function') {
        return;
    }

    for (let index = 0; index < entries.length; index += 1) {
        const entry = entries[index];
        if (!entry || typeof entry.name !== 'string') {
            continue;
        }

        if (isCineUiEntryRegistered(registry, entry.name)) {
            continue;
        }

        try {
            registry.register(entry.name, entry.value);
        } catch (error) {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn(warningMessage, error);
            }
        }
    }
}

function areSetupsEntriesRegistered(cineUi) {
    if (!cineUi || typeof cineUi !== 'object') {
        return false;
    }

    const controllers = cineUi.controllers;
    const interactions = cineUi.interactions;
    const help = cineUi.help;

    return (
        isCineUiEntryRegistered(controllers, 'shareDialog')
        && isCineUiEntryRegistered(controllers, 'sharedImportDialog')
        && isCineUiEntryRegistered(interactions, 'shareOpen')
        && isCineUiEntryRegistered(interactions, 'shareSubmit')
        && isCineUiEntryRegistered(interactions, 'shareCancel')
        && isCineUiEntryRegistered(interactions, 'shareApplyFile')
        && isCineUiEntryRegistered(interactions, 'shareInputChange')
        && isCineUiEntryRegistered(interactions, 'sharedImportSubmit')
        && isCineUiEntryRegistered(interactions, 'sharedImportCancel')
        && isCineUiEntryRegistered(help, 'shareProject')
        && isCineUiEntryRegistered(help, 'sharedImport')
    );
}

let setupsCineUiRegistered = areSetupsEntriesRegistered(getGlobalCineUi());

function enqueueCineUiRegistration(callback) {
    const scope =
        (typeof globalThis !== 'undefined' && globalThis)
        || (typeof window !== 'undefined' && window)
        || (typeof self !== 'undefined' && self)
        || (typeof global !== 'undefined' && global)
        || null;

    if (!scope || typeof callback !== 'function') {
        return;
    }

    try {
        const existing = scope.cineUi && typeof scope.cineUi === 'object'
            ? scope.cineUi
            : null;

        if (existing) {
            callback(existing);
            return;
        }
    } catch (callbackError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('cineUi registration callback (setups) failed', callbackError);
        }
        return;
    }

    const key = '__cineUiReadyQueue';
    if (!Array.isArray(scope[key])) {
        scope[key] = [];
    }

    scope[key].push(callback);
}

function getPowerSelectionSnapshot() {
    if (!batterySelect && !batteryPlateSelect && !hotswapSelect) return null;
    const rawBattery = batterySelect ? normalizePowerSelectionString(batterySelect.value) : '';
    const rawPlate = batteryPlateSelect ? normalizePowerSelectionString(batteryPlateSelect.value) : '';
    const rawHotswap = hotswapSelect ? normalizePowerSelectionString(hotswapSelect.value) : '';
    const normalizedPlate = typeof normalizeBatteryPlateValue === 'function'
        ? normalizeBatteryPlateValue(rawPlate, rawBattery)
        : rawPlate;
    const snapshot = {
        batteryPlate: normalizedPlate || '',
        battery: rawBattery || '',
        batteryHotswap: rawHotswap || ''
    };
    if (!snapshot.batteryPlate && !snapshot.battery && !snapshot.batteryHotswap) {
        return null;
    }
    return snapshot;
}

function applyStoredPowerSelection(selection, { preferExisting = true } = {}) {
    if (!selection || typeof selection !== 'object') return false;
    const target = {
        batteryPlate: normalizePowerSelectionString(selection.batteryPlate),
        battery: normalizePowerSelectionString(selection.battery),
        batteryHotswap: normalizePowerSelectionString(selection.batteryHotswap)
    };
    const shouldOverwriteBattery = !preferExisting
        || !hasMeaningfulPowerSelection(batterySelect && batterySelect.value);
    const shouldOverwritePlate = !preferExisting
        || !hasMeaningfulPowerSelection(batteryPlateSelect && batteryPlateSelect.value);
    const shouldOverwriteHotswap = !preferExisting
        || !hasMeaningfulPowerSelection(hotswapSelect && hotswapSelect.value);

    const matchesTarget = (select, desired) => {
        if (!select) return false;
        if (desired === '') {
            return !select.value || select.value === 'None' || select.selectedIndex === -1;
        }
        return select.value === desired;
    };

    let anyMatch = false;
    let anyPending = false;
    if (batterySelect) {
        if (target.battery && shouldOverwriteBattery) {
            assignSelectValue(batterySelect, target.battery);
            if (matchesTarget(batterySelect, target.battery)) {
                anyMatch = true;
            } else {
                anyPending = true;
            }
        } else if (!target.battery && !preferExisting) {
            assignSelectValue(batterySelect, '');
            if (matchesTarget(batterySelect, '')) {
                anyMatch = true;
            } else {
                anyPending = true;
            }
        } else if (matchesTarget(batterySelect, target.battery)) {
            anyMatch = true;
        }
    }
    if (batteryPlateSelect) {
        if (target.batteryPlate && shouldOverwritePlate) {
            assignSelectValue(batteryPlateSelect, target.batteryPlate);
            if (matchesTarget(batteryPlateSelect, target.batteryPlate)) {
                anyMatch = true;
            } else {
                anyPending = true;
            }
        } else if (!target.batteryPlate && !preferExisting) {
            assignSelectValue(batteryPlateSelect, '');
            if (matchesTarget(batteryPlateSelect, '')) {
                anyMatch = true;
            } else {
                anyPending = true;
            }
        } else if (matchesTarget(batteryPlateSelect, target.batteryPlate)) {
            anyMatch = true;
        }
    }
    if (typeof applyBatteryPlateSelectionFromBattery === 'function') {
        applyBatteryPlateSelectionFromBattery(
            batterySelect ? batterySelect.value : target.battery,
            batteryPlateSelect ? batteryPlateSelect.value : target.batteryPlate
        );
    }
    if (hotswapSelect) {
        if (target.batteryHotswap && shouldOverwriteHotswap) {
            assignSelectValue(hotswapSelect, target.batteryHotswap);
            if (matchesTarget(hotswapSelect, target.batteryHotswap)) {
                anyMatch = true;
            } else {
                anyPending = true;
            }
        } else if (!target.batteryHotswap && !preferExisting) {
            assignSelectValue(hotswapSelect, '');
            if (matchesTarget(hotswapSelect, '')) {
                anyMatch = true;
            } else {
                anyPending = true;
            }
        } else if (matchesTarget(hotswapSelect, target.batteryHotswap)) {
            anyMatch = true;
        }
    }
    return anyPending ? false : anyMatch;
}

// Generate a printable overview of the current selected setup in a new tab
if (typeof generateOverviewBtn !== 'undefined' && generateOverviewBtn) {
    generateOverviewBtn.addEventListener('click', () => {
        if (!setupSelect.value) { // Ensure a setup is selected
            alert(texts[currentLang].alertSelectSetupForOverview);
            return;
        }
        generatePrintableOverview();
    });
}

function batteryPinsSufficient() {
    const batt = batterySelect && batterySelect.value;
    if (!batt || batt === 'None' || !devices.batteries[batt]) return true;
    const battData = devices.batteries[batt];
    const totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
    if (!isFinite(totalCurrentLow)) return true;
    return totalCurrentLow <= battData.pinA;
}

function alertPinExceeded() {
    const batt = batterySelect && batterySelect.value;
    if (!batt || batt === 'None' || !devices.batteries[batt]) return;
    const battData = devices.batteries[batt];
    const totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
    alert(
        texts[currentLang].warnPinExceeded
            .replace('{current}', totalCurrentLow.toFixed(2))
            .replace('{max}', battData.pinA)
    );
}

// Generate a printable gear list for the current setup
generateGearListBtn.addEventListener('click', () => {
    if (!setupSelect.value) {
        alert(texts[currentLang].alertSelectSetupForOverview);
        return;
    }
    if (!batteryPinsSufficient()) {
        alertPinExceeded();
        return;
    }
    const seedInfo = getProjectDialogSeedInfo();
    if (seedInfo && typeof seedInfo === 'object') {
        populateRecordingResolutionDropdown(seedInfo.recordingResolution);
        populateSensorModeDropdown(seedInfo.sensorMode);
        populateCodecDropdown(seedInfo.codec);
    }
    openProjectDialogWithInfo(seedInfo);
});

if (deleteGearListProjectBtn) {
    deleteGearListProjectBtn.addEventListener('click', () => {
        deleteCurrentGearList();
    });
}

const projectCancelBtnRef = typeof projectCancelBtn !== 'undefined' ? projectCancelBtn : null;
if (projectCancelBtnRef) {
    projectCancelBtnRef.addEventListener('click', () => {
        restoreProjectDialogSnapshot();
        closeDialog(projectDialog);
    });
}

function submitProjectFormViaBackdrop() {
    if (!projectForm || !projectDialog) {
        return;
    }

    const propOpen = typeof projectDialog.open === 'boolean' ? projectDialog.open : null;
    const attrOpen = typeof projectDialog.hasAttribute === 'function'
        ? projectDialog.hasAttribute('open')
        : false;
    const isOpen = propOpen === null ? attrOpen : (propOpen || attrOpen);
    if (!isOpen) {
        return;
    }

    const submitButton = projectDialog.querySelector('[type="submit"]');

    if (typeof projectForm.requestSubmit === 'function') {
        try {
            if (submitButton) {
                projectForm.requestSubmit(submitButton);
            } else {
                projectForm.requestSubmit();
            }
            return;
        } catch (requestError) {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn('Project dialog backdrop submit failed to use requestSubmit', requestError);
            }
        }
    }

    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    projectForm.dispatchEvent(submitEvent);
}

if (projectDialogCloseBtn) {
    projectDialogCloseBtn.addEventListener('click', () => {
        if (projectCancelBtnRef) {
            projectCancelBtnRef.click();
        } else {
            closeDialog(projectDialog);
        }
    });
}

if (projectDialog) {
    projectDialog.addEventListener('cancel', event => {
        if (event) event.preventDefault();
        if (projectCancelBtnRef) {
            projectCancelBtnRef.click();
        } else {
            restoreProjectDialogSnapshot();
            closeDialog(projectDialog);
        }
    });

    projectDialog.addEventListener('click', event => {
        if (event.target === projectDialog) {
            event.preventDefault();
            event.stopPropagation();
            submitProjectFormViaBackdrop();
        }
    });
}

if (projectForm) {
    projectForm.addEventListener('submit', e => {
        e.preventDefault();
        if (!batteryPinsSufficient()) {
            alertPinExceeded();
            return;
        }
        const info = collectProjectFormData();
        currentProjectInfo = info;
        ensureZoomRemoteSetup(info);
        const html = gearListGenerateHtmlImpl(info);
        displayGearAndRequirements(html);
        ensureGearListActions();
        bindGearListCageListener();
        bindGearListEasyrigListener();
        bindGearListSliderBowlListener();
        bindGearListEyeLeatherListener();
        bindGearListProGaffTapeListener();
        bindGearListDirectorMonitorListener();
        // Persist the generated gear list and current project name so that
        // a page reload can restore the visible gear list without requiring
        // any additional user action.
        saveCurrentSession();
        scheduleProjectAutoSave(true);
        closeDialog(projectDialog);
    });
}

function resolveLocalAppVersionForShare() {
  if (typeof ACTIVE_APP_VERSION === 'string') {
    const trimmedActive = ACTIVE_APP_VERSION.trim();
    if (trimmedActive) {
      return trimmedActive;
    }
  }
  if (typeof APP_VERSION === 'string') {
    const trimmed = APP_VERSION.trim();
    if (trimmed) {
      return trimmed;
    }
  }
  return '';
}

function createSharedProjectMetadata({ includeAutoGear, hasAutoGearRules }) {
  const metadata = {
    type: 'camera-power-planner/project-bundle',
    includesAutoGearRules: Boolean(includeAutoGear && hasAutoGearRules),
  };

  const version = resolveLocalAppVersionForShare();
  if (version) {
    metadata.version = version;
  }

  try {
    const timestamp = new Date();
    if (!Number.isNaN(timestamp.valueOf())) {
      metadata.exportedAt = timestamp.toISOString();
    }
  } catch (error) {
    console.warn('Unable to capture export timestamp for shared project metadata.', error);
  }

  metadata.generator = 'Camera Power Planner';

  return metadata;
}

function downloadSharedProject(shareFileName, includeAutoGear) {
  if (!shareFileName) return;
  const shareContext = getShareUiContext(this);
  const shareLinkMessage = shareContext.linkMessage;
  const shareIncludeAutoGearCheckbox = shareContext.includeAutoGearCheckbox;
  const shareIncludeAutoGearLabelElem = shareContext.includeAutoGearLabel;
  const setupName = getCurrentProjectName();
  const readPowerSelectValue = (select) => (
    select && typeof select.value === 'string'
      ? normalizePowerSelectionString(select.value)
      : ''
  );

  const normalizedBattery = readPowerSelectValue(batterySelect);
  const normalizedPlate = readPowerSelectValue(batteryPlateSelect);
  const normalizedHotswap = readPowerSelectValue(hotswapSelect);

  const currentSetup = {
    setupName,
    camera: cameraSelect.value,
    monitor: monitorSelect.value,
    video: videoSelect.value,
    cage: cageSelect.value,
    motors: motorSelects.map(sel => sel.value),
    controllers: controllerSelects.map(sel => sel.value),
    distance: distanceSelect.value,
    batteryPlate: normalizeBatteryPlateValue(normalizedPlate, normalizedBattery),
    battery: normalizedBattery,
    batteryHotswap: normalizedHotswap
  };

  const sharedPowerSelection = getPowerSelectionSnapshot();
  if (sharedPowerSelection) {
    currentSetup.powerSelection = sharedPowerSelection;
    currentSetup.battery = sharedPowerSelection.battery || '';
    currentSetup.batteryPlate = sharedPowerSelection.batteryPlate || '';
    currentSetup.batteryHotswap = sharedPowerSelection.batteryHotswap || '';
  }
  if (typeof getDiagramManualPositions === 'function') {
    const diagramPositions = getDiagramManualPositions();
    if (diagramPositions && Object.keys(diagramPositions).length) {
      currentSetup.diagramPositions = diagramPositions;
    }
  }
  const projectInfoCandidates = [];
  if (currentProjectInfo) {
    projectInfoCandidates.push(currentProjectInfo);
  }
  if (typeof loadProject === 'function') {
    const storageKeys = new Set();
    if (typeof setupName === 'string' && setupName) {
      storageKeys.add(setupName);
    }
    if (typeof getCurrentProjectStorageKey === 'function') {
      const storageKey = getCurrentProjectStorageKey({ allowTyped: true });
      if (typeof storageKey === 'string' && storageKey) {
        storageKeys.add(storageKey);
      }
    }
    if (typeof getSetupNameState === 'function') {
      const nameState = getSetupNameState();
      if (nameState && typeof nameState === 'object') {
        ['storageKey', 'selectedName', 'typedName'].forEach((prop) => {
          const value = typeof nameState[prop] === 'string' ? nameState[prop].trim() : '';
          if (value) {
            storageKeys.add(value);
          }
        });
      }
    }
    storageKeys.forEach((key) => {
      try {
        const storedProject = loadProject(key);
        if (storedProject && storedProject.projectInfo) {
          projectInfoCandidates.push(storedProject.projectInfo);
        }
      } catch (error) {
        console.warn('Unable to read project info for export from storage key', key, error);
      }
    });
  }

  let mergedProjectInfo = null;
  let projectInfoSnapshotForExport = null;
  projectInfoCandidates.forEach((candidate) => {
    if (!candidate) return;
    if (!mergedProjectInfo) {
      mergedProjectInfo = cloneProjectInfoForStorage(candidate);
    } else {
      mergedProjectInfo = mergeProjectInfoSnapshots(mergedProjectInfo, candidate);
    }
  });

  if (mergedProjectInfo) {
    const snapshotForExport = typeof createProjectInfoSnapshotForStorage === 'function'
      ? createProjectInfoSnapshotForStorage(mergedProjectInfo, { projectNameOverride: setupName })
      : mergedProjectInfo;
    const clonedSnapshot = cloneProjectInfoForStorage(snapshotForExport);
    if (clonedSnapshot && typeof clonedSnapshot === 'object') {
      projectInfoSnapshotForExport = clonedSnapshot;
    }
  }
  const gearSelectors = cloneGearListSelectors(getGearListSelectors());
  if (Object.keys(gearSelectors).length) {
    currentSetup.gearSelectors = gearSelectors;
  }
  const combinedHtml = gearListGetCurrentHtmlImpl();
  currentSetup.gearListAndProjectRequirementsGenerated = Boolean(combinedHtml);
  if (currentSetup.gearListAndProjectRequirementsGenerated) {
    const { projectHtml, gearHtml } = gearListGetSafeHtmlSectionsImpl(combinedHtml);
    if (projectHtml) {
      currentSetup.projectHtml = projectHtml;
    }
    if (gearHtml) {
      currentSetup.gearList = gearHtml;
    }
  }
  if (currentSetup.gearListAndProjectRequirementsGenerated && projectInfoSnapshotForExport) {
    currentSetup.projectInfo = projectInfoSnapshotForExport;
  }
  const key = getCurrentSetupKey();
  const feedback = loadFeedbackSafe()[key] || [];
  if (feedback.length) {
    currentSetup.feedback = feedback;
  }
  const rulesForShare = getAutoGearRules();
  const hasAutoGearRules = Array.isArray(rulesForShare) && rulesForShare.length > 0;
  if (includeAutoGear && hasAutoGearRules) {
    currentSetup.autoGearRules = rulesForShare;
    const coverage = getAutoGearRuleCoverageSummary({ rules: rulesForShare });
    if (coverage) {
      currentSetup.autoGearCoverage = coverage;
    }
  }

  const metadata = createSharedProjectMetadata({ includeAutoGear, hasAutoGearRules });
  if (metadata && typeof metadata === 'object') {
    currentSetup.metadata = metadata;
  }
  const notifyShareFailure = error => {
    if (error) {
      console.warn('Project export failed', error);
    } else {
      console.warn('Project export failed');
    }
    const failureMessage = getLocalizedText('shareExportFailed') || 'Project export failed.';
    if (shareLinkMessage) {
      shareLinkMessage.textContent = failureMessage;
      setStatusLevel(shareLinkMessage, 'danger');
      shareLinkMessage.classList.remove('hidden');
      if (typeof setTimeout === 'function') {
        setTimeout(() => shareLinkMessage.classList.add('hidden'), 6000);
      }
    } else if (typeof alert === 'function') {
      alert(failureMessage);
    }
  };

  let json;
  try {
    json = JSON.stringify(currentSetup, null, 2);
  } catch (serializationError) {
    console.error('Failed to serialize shared project', serializationError);
    notifyShareFailure(serializationError);
    return;
  }

  const downloadResult = downloadBackupPayload(json, shareFileName);

  if (shareIncludeAutoGearCheckbox) {
    shareIncludeAutoGearCheckbox.checked = includeAutoGear && hasAutoGearRules;
  }

  if (!downloadResult || !downloadResult.success) {
    notifyShareFailure();
    return;
  }

  if (downloadResult.method === 'window-fallback') {
    const manualMessage = typeof getManualDownloadFallbackMessage === 'function'
      ? getManualDownloadFallbackMessage()
      : getLocalizedText('manualDownloadFallback')
        || 'The download did not start automatically. A new tab opened so you can copy or save the file manually.';
    if (shareLinkMessage) {
      shareLinkMessage.textContent = manualMessage;
      setStatusLevel(shareLinkMessage, 'warning');
      shareLinkMessage.classList.remove('hidden');
      if (typeof setTimeout === 'function') {
        setTimeout(() => shareLinkMessage.classList.add('hidden'), 8000);
      }
    } else if (typeof alert === 'function') {
      alert(manualMessage);
    }
    return;
  }

  const successMessage =
    (typeof getLocalizedText === 'function' && getLocalizedText('shareLinkCopied'))
    || (texts?.en?.shareLinkCopied)
    || 'Project file downloaded.';

  if (shareLinkMessage) {
    shareLinkMessage.textContent = successMessage;
    setStatusLevel(shareLinkMessage, 'success');
    shareLinkMessage.classList.remove('hidden');
    if (typeof setTimeout === 'function') {
      setTimeout(() => shareLinkMessage.classList.add('hidden'), 4000);
    }
  } else if (typeof alert === 'function') {
    alert(successMessage);
  }
}

let ownGearNameCache = null;

function getGearProviderTexts() {
  const textsForDialog = getGearItemEditTexts();
  return {
    rental: textsForDialog.providerRental || 'Rental house',
    user: textsForDialog.providerUser || 'User',
    crewHeading: textsForDialog.providerCrewHeading || 'Crew',
    unknown: textsForDialog.providerUnknown || 'Custom provider',
    help: textsForDialog.providerHelp || '',
  };
}

function refreshOwnGearNameCache() {
  ownGearNameCache = { names: new Set(), timestamp: Date.now() };
  if (typeof loadOwnGear !== 'function') {
    return ownGearNameCache.names;
  }
  try {
    const items = loadOwnGear();
    if (Array.isArray(items)) {
      items.forEach(item => {
        if (item && typeof item.name === 'string') {
          const trimmed = item.name.trim().toLowerCase();
          if (trimmed) {
            ownGearNameCache.names.add(trimmed);
          }
        }
      });
    }
  } catch (error) {
    console.warn('Unable to refresh own gear cache for provider defaults', error);
  }
  return ownGearNameCache.names;
}

function getOwnGearNameSet() {
  if (!ownGearNameCache || !(ownGearNameCache.names instanceof Set)) {
    return refreshOwnGearNameCache();
  }
  return ownGearNameCache.names;
}

const OWN_GEAR_SOURCE_CATALOG_VALUE =
  typeof OWN_GEAR_SOURCE_CATALOG === 'string' && OWN_GEAR_SOURCE_CATALOG
    ? OWN_GEAR_SOURCE_CATALOG
    : 'catalog';

const OWN_GEAR_SOURCE_CUSTOM_VALUE =
  typeof OWN_GEAR_SOURCE_CUSTOM === 'string' && OWN_GEAR_SOURCE_CUSTOM
    ? OWN_GEAR_SOURCE_CUSTOM
    : 'custom';

function resolveOwnGearFeatureModuleForEditor() {
  if (typeof resolveOwnGearModule === 'function') {
    try {
      const moduleApi = resolveOwnGearModule();
      if (moduleApi && typeof moduleApi === 'object') {
        return moduleApi;
      }
    } catch (error) {
      void error;
    }
  }
  const scope =
    (typeof globalThis !== 'undefined' && globalThis)
    || (typeof window !== 'undefined' && window)
    || (typeof self !== 'undefined' && self)
    || (typeof global !== 'undefined' && global)
    || null;
  if (scope && typeof scope.cineFeaturesOwnGear === 'object' && scope.cineFeaturesOwnGear) {
    return scope.cineFeaturesOwnGear;
  }
  if (typeof cineFeaturesOwnGear === 'object' && cineFeaturesOwnGear) {
    return cineFeaturesOwnGear;
  }
  return null;
}

function generateOwnGearIdForEditor() {
  const moduleApi = resolveOwnGearFeatureModuleForEditor();
  if (moduleApi && typeof moduleApi.generateOwnGearId === 'function') {
    try {
      return moduleApi.generateOwnGearId();
    } catch (error) {
      void error;
    }
  }
  if (typeof generateOwnGearId === 'function') {
    try {
      return generateOwnGearId();
    } catch (error) {
      void error;
    }
  }
  const timePart = Date.now().toString(36);
  const randomPart = Math.floor(Math.random() * 1e8).toString(36);
  return `own-${timePart}-${randomPart}`;
}

function normalizeOwnGearRecordForEditor(entry) {
  if (!entry || typeof entry !== 'object') {
    return null;
  }
  const moduleApi = resolveOwnGearFeatureModuleForEditor();
  if (moduleApi && typeof moduleApi.normalizeOwnGearRecord === 'function') {
    try {
      return moduleApi.normalizeOwnGearRecord(entry);
    } catch (error) {
      void error;
    }
  }
  if (typeof normalizeOwnGearRecord === 'function') {
    try {
      return normalizeOwnGearRecord(entry);
    } catch (error) {
      void error;
    }
  }
  const rawName = typeof entry.name === 'string' ? entry.name.trim() : '';
  if (!rawName) {
    return null;
  }
  const normalized = {
    id: typeof entry.id === 'string' && entry.id.trim() ? entry.id.trim() : generateOwnGearIdForEditor(),
    name: rawName,
  };
  if (typeof entry.quantity === 'string' && entry.quantity.trim()) {
    normalized.quantity = entry.quantity.trim();
  } else if (typeof entry.quantity === 'number' && Number.isFinite(entry.quantity)) {
    normalized.quantity = String(entry.quantity);
  }
  if (typeof entry.notes === 'string' && entry.notes.trim()) {
    normalized.notes = entry.notes.trim();
  }
  if (typeof entry.source === 'string' && entry.source.trim()) {
    normalized.source = entry.source.trim();
  }
  return normalized;
}

function cloneOwnGearRecords(records) {
  return Array.isArray(records)
    ? records
        .map((item) => normalizeOwnGearRecordForEditor(item))
        .filter(Boolean)
        .map((item) => ({ ...item }))
    : [];
}

function loadOwnGearRecordsForEditor() {
  const moduleApi = resolveOwnGearFeatureModuleForEditor();
  if (moduleApi && typeof moduleApi.loadStoredOwnGearItems === 'function') {
    try {
      const loaded = moduleApi.loadStoredOwnGearItems();
      if (Array.isArray(loaded)) {
        return cloneOwnGearRecords(loaded);
      }
    } catch (error) {
      console.warn('Unable to load own gear items for gear editor via module.', error);
    }
  }
  if (typeof loadOwnGear === 'function') {
    try {
      const stored = loadOwnGear();
      if (Array.isArray(stored)) {
        return cloneOwnGearRecords(stored);
      }
    } catch (error) {
      console.warn('Unable to load own gear items for gear editor from storage.', error);
    }
  }
  return [];
}

function persistOwnGearRecordsForEditor(records) {
  const normalized = Array.isArray(records)
    ? records.map((item) => normalizeOwnGearRecordForEditor(item)).filter(Boolean)
    : [];
  const moduleApi = resolveOwnGearFeatureModuleForEditor();
  if (moduleApi && typeof moduleApi.persistOwnGearItems === 'function') {
    try {
      moduleApi.persistOwnGearItems(normalized);
      return true;
    } catch (error) {
      console.warn('Unable to persist own gear items via module for gear editor.', error);
    }
  }
  if (typeof saveOwnGear === 'function') {
    try {
      saveOwnGear(normalized);
      if (
        typeof document !== 'undefined'
        && typeof document.dispatchEvent === 'function'
        && typeof CustomEvent === 'function'
      ) {
        document.dispatchEvent(new CustomEvent('own-gear-data-changed'));
      }
      return true;
    } catch (error) {
      console.warn('Unable to persist own gear items via storage for gear editor.', error);
    }
  }
  return false;
}

function lookupOwnGearRecord(records, id, name) {
  if (!Array.isArray(records)) {
    return { index: -1, record: null };
  }
  const sanitizedId = typeof id === 'string' ? id.trim() : '';
  const sanitizedName = typeof name === 'string' ? name.trim().toLowerCase() : '';
  let index = -1;
  if (sanitizedId) {
    index = records.findIndex((entry) => entry && entry.id === sanitizedId);
  }
  if (index === -1 && sanitizedName) {
    index = records.findIndex((entry) => {
      if (!entry || typeof entry.name !== 'string') {
        return false;
      }
      return entry.name.trim().toLowerCase() === sanitizedName;
    });
  }
  return { index, record: index >= 0 ? records[index] : null };
}

function deriveOwnGearSourceForElement(element) {
  if (!element || typeof element !== 'object' || !element.classList) {
    return OWN_GEAR_SOURCE_CATALOG_VALUE;
  }
  return element.classList.contains('gear-custom-item')
    ? OWN_GEAR_SOURCE_CUSTOM_VALUE
    : OWN_GEAR_SOURCE_CATALOG_VALUE;
}

function syncGearItemOwnedState(element, data, options = {}) {
  const wantsOwned = Boolean(options && options.wantsOwned);
  const existingId = options && typeof options.existingId === 'string' ? options.existingId.trim() : '';
  const records = loadOwnGearRecordsForEditor();
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const quantityValue = typeof data.quantity === 'string' ? data.quantity.trim() : '';
  const { index, record } = lookupOwnGearRecord(records, existingId, name);

  if (wantsOwned && name) {
    if (record && index >= 0) {
      let changed = false;
      const updated = { ...record };
      if (record.name !== name) {
        updated.name = name;
        changed = true;
      }
      if (quantityValue) {
        if (record.quantity !== quantityValue) {
          updated.quantity = quantityValue;
          changed = true;
        }
      } else if (record.quantity) {
        delete updated.quantity;
        changed = true;
      }
      const desiredSource = deriveOwnGearSourceForElement(element);
      if (desiredSource && record.source !== desiredSource) {
        updated.source = desiredSource;
        changed = true;
      }
      if (!changed) {
        return { id: record.id, changed: false };
      }
      const normalized = normalizeOwnGearRecordForEditor(updated);
      if (!normalized) {
        return { id: record.id, changed: false };
      }
      const nextRecords = records.slice();
      nextRecords[index] = normalized;
      if (!persistOwnGearRecordsForEditor(nextRecords)) {
        return { id: record.id, changed: false };
      }
      return { id: normalized.id, changed: true };
    }

    const newEntry = {
      id: generateOwnGearIdForEditor(),
      name,
    };
    if (quantityValue) {
      newEntry.quantity = quantityValue;
    }
    const desiredSource = deriveOwnGearSourceForElement(element);
    if (desiredSource) {
      newEntry.source = desiredSource;
    }
    const normalizedEntry = normalizeOwnGearRecordForEditor(newEntry);
    if (!normalizedEntry) {
      return { id: '', changed: false };
    }
    const nextRecords = records.slice();
    nextRecords.push(normalizedEntry);
    if (!persistOwnGearRecordsForEditor(nextRecords)) {
      return { id: '', changed: false };
    }
    return { id: normalizedEntry.id, changed: true };
  }

  if (!record || index < 0) {
    return { id: '', changed: false };
  }
  const nextRecords = records.filter((entry, entryIndex) => entryIndex !== index);
  if (!persistOwnGearRecordsForEditor(nextRecords)) {
    return { id: record.id, changed: false };
  }
  return { id: '', changed: true };
}

function findOwnedRecordForGearItem(element, options = {}) {
  const dataName = typeof options.name === 'string' ? options.name.trim() : '';
  const existingId = typeof options.existingId === 'string' ? options.existingId.trim() : '';
  const records = loadOwnGearRecordsForEditor();
  return lookupOwnGearRecord(records, existingId, dataName).record;
}

function guessDefaultProvider(name) {
  const trimmed = typeof name === 'string' ? name.trim() : '';
  if (!trimmed) {
    return 'rental-house';
  }
  const lookup = getOwnGearNameSet();
  if (lookup.has(trimmed.toLowerCase())) {
    return 'user';
  }
  return 'rental-house';
}

function ensureGearItemProviderElement(element) {
  if (!element) return null;
  let providerSpan = element.querySelector('.gear-item-provider');
  if (providerSpan) {
    return providerSpan;
  }
  const doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return null;
  providerSpan = doc.createElement('span');
  providerSpan.className = 'gear-item-provider';
  providerSpan.hidden = true;
  const isCustom = element.classList?.contains('gear-custom-item');
  if (isCustom) {
    const summary = element.querySelector('.gear-custom-item-summary');
    const note = element.querySelector('.gear-item-note');
    if (summary) {
      if (note) {
        summary.insertBefore(providerSpan, note);
      } else {
        summary.appendChild(providerSpan);
      }
      return providerSpan;
    }
  }
  const reference = element.querySelector('.gear-item-note')
    || element.querySelector('.gear-item-edit-btn')
    || element.querySelector('.gear-custom-item-actions')
    || element.querySelector('.gear-custom-remove-btn');
  if (reference && reference.parentElement) {
    reference.parentElement.insertBefore(providerSpan, reference);
  } else {
    element.appendChild(providerSpan);
  }
  return providerSpan;
}

function formatUserProfileProviderName(rawName) {
  const trimmed = typeof rawName === 'string' ? rawName.trim() : '';
  if (!trimmed) {
    return '';
  }
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (!parts.length) {
    return '';
  }
  const firstName = parts[0];
  if (parts.length === 1) {
    return firstName;
  }
  const lastPart = parts[parts.length - 1];
  const lastInitial = Array.from(lastPart)[0] || '';
  if (!lastInitial) {
    return firstName;
  }
  const normalizedInitial = typeof lastInitial.toLocaleUpperCase === 'function'
    ? lastInitial.toLocaleUpperCase()
    : lastInitial.toUpperCase();
  return `${firstName} ${normalizedInitial}`;
}

function getProviderInfo(value, options = {}) {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  const texts = getGearProviderTexts();
  if (!trimmed) {
    return { value: '', label: '', type: '' };
  }
  if (trimmed === 'rental-house') {
    return { value: 'rental-house', label: texts.rental, type: 'rental' };
  }
  if (trimmed === 'user') {
    const profile = typeof getUserProfileSnapshot === 'function' ? getUserProfileSnapshot() : null;
    const profileName = profile && profile.name ? profile.name : '';
    const profileDisplayName = formatUserProfileProviderName(profileName);
    const label = profileDisplayName
      ? `${profileDisplayName} — ${texts.user}`
      : (options.label || texts.user);
    return { value: 'user', label, type: 'user', profileName, profileDisplayName };
  }
  if (trimmed.startsWith('contact:')) {
    const contactId = trimmed.slice('contact:'.length);
    const contact = typeof getContactById === 'function' ? getContactById(contactId) : null;
    if (contact) {
      const label = typeof getContactDisplayLabel === 'function'
        ? getContactDisplayLabel(contact)
        : (contact.name || contact.email || contact.phone || contact.id || texts.crewHeading);
      return { value: trimmed, label, type: 'contact', contactId };
    }
    const fallback = (options && options.label) || (typeof getContactsText === 'function'
      ? getContactsText('missingContactFallback', 'Saved contact')
      : 'Saved contact');
    return { value: trimmed, label: fallback, type: 'contact', contactId, missing: true };
  }
  return { value: trimmed, label: options && options.label ? options.label : texts.unknown, type: 'custom' };
}

function setGearItemProvider(element, providerValue, options = {}) {
  if (!element) return;
  const info = getProviderInfo(providerValue || element.getAttribute('data-gear-provider') || '', {
    label: options.label,
  });
  if (info.value) {
    element.setAttribute('data-gear-provider', info.value);
  } else {
    element.removeAttribute('data-gear-provider');
  }
  if (info.label) {
    element.setAttribute('data-gear-provider-label', info.label);
  } else {
    element.removeAttribute('data-gear-provider-label');
  }
  const badge = ensureGearItemProviderElement(element);
  if (!badge) return;
  if (info.label) {
    badge.textContent = info.label;
    badge.hidden = false;
    badge.setAttribute('data-provider-type', info.type || '');
    badge.setAttribute('title', info.label);
    badge.setAttribute('data-help', info.label);
  } else {
    badge.textContent = '';
    badge.hidden = true;
    badge.removeAttribute('data-provider-type');
    badge.removeAttribute('title');
    badge.removeAttribute('data-help');
  }
}

function getProviderOptionLabel(option) {
  if (!option) return '';
  return option.textContent ? option.textContent.trim() : option.value;
}

function updateGearItemEditProviderOptions(context, data = {}) {
  if (!context || !context.providerSelect) return;
  const select = context.providerSelect;
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }
  const texts = getGearProviderTexts();
  const profile = typeof getUserProfileSnapshot === 'function' ? getUserProfileSnapshot() : null;
  const contacts = typeof getContactsSnapshot === 'function' ? getContactsSnapshot() : [];
  const doc = select.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return;

  const rentalOption = doc.createElement('option');
  rentalOption.value = 'rental-house';
  rentalOption.textContent = texts.rental;
  select.appendChild(rentalOption);

  const userOption = doc.createElement('option');
  userOption.value = 'user';
  const profileName = profile && profile.name ? profile.name : '';
  const profileDisplayName = formatUserProfileProviderName(profileName);
  userOption.textContent = profileDisplayName ? `${profileDisplayName} — ${texts.user}` : texts.user;
  select.appendChild(userOption);

  if (contacts.length) {
    const group = doc.createElement('optgroup');
    group.label = texts.crewHeading;
    contacts.forEach(contact => {
      const option = doc.createElement('option');
      option.value = `contact:${contact.id}`;
      option.textContent = contact.label || contact.name || contact.email || contact.phone || contact.id;
      group.appendChild(option);
    });
    select.appendChild(group);
  }

  const selectedValue = typeof data.providedBy === 'string' && data.providedBy.trim()
    ? data.providedBy.trim()
    : guessDefaultProvider(data.name || '');

  if (selectedValue && !Array.from(select.options).some(option => option.value === selectedValue)) {
    const fallbackOption = doc.createElement('option');
    fallbackOption.value = selectedValue;
    fallbackOption.textContent = data.providerLabel
      || (typeof getContactsText === 'function'
        ? getContactsText('missingContactFallback', 'Saved contact')
        : texts.unknown);
    fallbackOption.setAttribute('data-provider-fallback', 'true');
    select.appendChild(fallbackOption);
  }

  select.value = selectedValue || 'rental-house';
}

function updateGearItemEditCameraLinkOptions(context, data = {}) {
  if (!context || !context.cameraLinkSelect) return;
  const select = context.cameraLinkSelect;
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }
  const doc = select.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return;
  const texts = getGearItemEditTexts();
  const noneOption = doc.createElement('option');
  noneOption.value = '';
  noneOption.textContent = texts.cameraLinkNoneOption || 'No camera link';
  select.appendChild(noneOption);

  const cameraName = getActiveCameraDisplayName();
  const cameraOption = doc.createElement('option');
  cameraOption.value = 'camera';
  let optionLabel = texts.cameraLinkCameraOption || 'Link to camera';
  if (optionLabel.includes('%s')) {
    if (cameraName) {
      optionLabel = optionLabel.replace('%s', cameraName);
    } else {
      optionLabel = optionLabel.replace(/\s*\(\s*%s\s*\)/g, '').replace('%s', '').trim();
      if (!optionLabel) {
        optionLabel = texts.cameraLinkUnavailableOption || 'Link to camera';
      }
    }
  }
  if (!cameraName && !optionLabel) {
    optionLabel = texts.cameraLinkUnavailableOption || 'Link to camera';
  }
  cameraOption.textContent = optionLabel;
  const storedCameraLabel = typeof data.cameraLinkLabel === 'string' ? data.cameraLinkLabel.trim() : '';
  if (cameraName) {
    cameraOption.dataset.cameraLabel = cameraName;
  } else if (storedCameraLabel) {
    cameraOption.dataset.cameraLabel = storedCameraLabel;
  }
  select.appendChild(cameraOption);

  const desiredValue = typeof data.cameraLink === 'string' && data.cameraLink.trim() === 'camera' ? 'camera' : '';
  if (desiredValue) {
    select.value = desiredValue;
  } else {
    select.value = '';
  }
}

function refreshGearItemProviderDisplays(scope) {
  const root = scope || gearListOutput;
  if (!root) return;
  const items = root.querySelectorAll('.gear-item, .gear-custom-item');
  items.forEach(element => {
    const data = getGearItemData(element);
    setGearItemProvider(element, data.providedBy, { label: data.providerLabel });
  });
  refreshRentalProviderNoteDisplays();
}

function handleShareSetupClick() {
  const shareContext = getShareUiContext(this);
  const shareDialog = shareContext.dialog;
  const shareForm = shareContext.form;
  const shareFilenameInput = shareContext.filenameInput;
  const shareFilenameMessage = shareContext.filenameMessage;
  const shareIncludeAutoGearCheckbox = shareContext.includeAutoGearCheckbox;
  const shareIncludeAutoGearLabelElem = shareContext.includeAutoGearLabel;
  saveCurrentGearList();
  const setupName = getCurrentProjectName();
  const defaultName = getDefaultShareFilename(setupName);
  const defaultFilename = ensureJsonExtension(defaultName);

  if (!shareDialog || !shareForm || !shareFilenameInput) {
    const shareFileName = promptForSharedFilename(setupName);
    if (!shareFileName) {
      return;
    }
    const rulesForShare = getAutoGearRules();
    const hasAutoGearRules = Array.isArray(rulesForShare) && rulesForShare.length > 0;
    const includeAutoGear = hasAutoGearRules
      ? confirmAutoGearSelection(
          shareIncludeAutoGearCheckbox ? shareIncludeAutoGearCheckbox.checked : false
        )
      : false;
    if (shareIncludeAutoGearCheckbox) {
      shareIncludeAutoGearCheckbox.checked = includeAutoGear && hasAutoGearRules;
    }
    downloadSharedProject(shareFileName, includeAutoGear);
    return;
  }

  shareFilenameInput.value = defaultFilename;
  shareFilenameInput.setCustomValidity('');

  if (shareFilenameMessage) {
    const template = getLocalizedText('shareFilenamePrompt') || '';
    shareFilenameMessage.textContent = template.includes('{defaultName}')
      ? template.replace('{defaultName}', defaultName)
      : template;
  }

  const rulesForShare = getAutoGearRules();
  const hasAutoGearRules = Array.isArray(rulesForShare) && rulesForShare.length > 0;
  if (shareIncludeAutoGearCheckbox) {
    shareIncludeAutoGearCheckbox.disabled = !hasAutoGearRules;
    shareIncludeAutoGearCheckbox.setAttribute('aria-disabled', hasAutoGearRules ? 'false' : 'true');
    if (!hasAutoGearRules) {
      shareIncludeAutoGearCheckbox.checked = false;
    }
  }
  if (shareIncludeAutoGearLabelElem) {
    shareIncludeAutoGearLabelElem.classList.toggle('disabled', !hasAutoGearRules);
    shareIncludeAutoGearLabelElem.setAttribute('aria-disabled', !hasAutoGearRules ? 'true' : 'false');
  }

  openDialog(shareDialog);
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(() => {
      if (shareFilenameInput) {
        shareFilenameInput.focus();
        shareFilenameInput.select();
      }
    });
  } else if (shareFilenameInput) {
    setTimeout(() => {
      shareFilenameInput.focus();
      shareFilenameInput.select();
    }, 0);
  }
}

const shareSetupButton = resolveElementById('shareSetupBtn', 'shareSetupBtn');
if (shareSetupButton) {
  shareSetupButton.addEventListener('click', handleShareSetupClick);
}

function handleShareFormSubmit(event) {
  event.preventDefault();
  const shareContext = getShareUiContext(this);
  const shareFilenameInput = shareContext.filenameInput;
  const shareDialog = shareContext.dialog;
  const shareIncludeAutoGearCheckbox = shareContext.includeAutoGearCheckbox;
  if (!shareFilenameInput) return;
  const sanitized = sanitizeShareFilename(shareFilenameInput.value);
  if (!sanitized) {
    const invalidMessage =
      getLocalizedText('shareFilenameInvalid')
      || 'Please enter a valid file name to continue.';
    shareFilenameInput.setCustomValidity(invalidMessage);
    shareFilenameInput.reportValidity();
    return;
  }
  shareFilenameInput.setCustomValidity('');
  const shareFileName = ensureJsonExtension(sanitized);
  const includeAutoGear = !!(
    shareIncludeAutoGearCheckbox
    && !shareIncludeAutoGearCheckbox.disabled
    && shareIncludeAutoGearCheckbox.checked
  );
  closeDialog(shareDialog);
  downloadSharedProject(shareFileName, includeAutoGear);
}

function handleShareCancelClick() {
  const shareContext = getShareUiContext(this);
  const shareFilenameInput = shareContext.filenameInput;
  const shareDialog = shareContext.dialog;
  if (shareFilenameInput) {
    shareFilenameInput.setCustomValidity('');
  }
  closeDialog(shareDialog);
}

function handleShareDialogCancel(event) {
  event.preventDefault();
  const shareContext = getShareUiContext(this);
  const shareFilenameInput = shareContext.filenameInput;
  const shareDialog = shareContext.dialog;
  if (shareFilenameInput) {
    shareFilenameInput.setCustomValidity('');
  }
  closeDialog(shareDialog);
}

const initialShareUiContext = getShareUiContext();
if (initialShareUiContext.form) {
  initialShareUiContext.form.addEventListener('submit', handleShareFormSubmit);
}

if (initialShareUiContext.cancelButton) {
  initialShareUiContext.cancelButton.addEventListener('click', handleShareCancelClick);
}

if (initialShareUiContext.dialog) {
  initialShareUiContext.dialog.addEventListener('cancel', handleShareDialogCancel);
}

function handleSharedLinkInputChange() {
  const shareContext = getShareUiContext(this);
  const sharedLinkInput = shareContext.sharedLinkInput;
  if (!sharedLinkInput || pendingSharedLinkListener) return;
  const file = sharedLinkInput.files && sharedLinkInput.files[0];
  if (file) {
    readSharedProjectFile(file);
  }
}

function handleApplySharedLinkClick() {
  const shareContext = getShareUiContext(this);
  const sharedLinkInput = shareContext.sharedLinkInput;
  if (!sharedLinkInput) {
    return;
  }
  if (pendingSharedLinkListener) {
    sharedLinkInput.removeEventListener('change', pendingSharedLinkListener);
    pendingSharedLinkListener = null;
  }
  const handleSelection = () => {
    sharedLinkInput.removeEventListener('change', handleSelection);
    pendingSharedLinkListener = null;
    const file = sharedLinkInput.files && sharedLinkInput.files[0];
    if (file) {
      readSharedProjectFile(file);
    }
  };
  pendingSharedLinkListener = handleSelection;
  sharedLinkInput.addEventListener('change', handleSelection);
  sharedLinkInput.value = '';
  sharedLinkInput.click();
  if (sharedLinkInput.files && sharedLinkInput.files.length) {
    handleSelection();
  }
}

if (initialShareUiContext.sharedLinkInput) {
  initialShareUiContext.sharedLinkInput.addEventListener('change', handleSharedLinkInputChange);
}

if (initialShareUiContext.applySharedLinkButton && initialShareUiContext.sharedLinkInput) {
  initialShareUiContext.applySharedLinkButton.addEventListener('click', handleApplySharedLinkClick);
}

function handleSharedImportModeChange() {
  if (sharedImportPromptActive) return;
  if (lastSharedSetupData === null) return;
  reapplySharedImportSelection();
}

function handleSharedImportSubmit(event) {
  event.preventDefault();
  finalizeSharedImportPrompt();
  applyStoredSharedImport();
}

function handleSharedImportCancel() {
  finalizeSharedImportPrompt();
  clearStoredSharedImportData();
}

function handleSharedImportDialogCancel(event) {
  event.preventDefault();
  finalizeSharedImportPrompt();
  clearStoredSharedImportData();
}

const initialSharedImportUiContext = getSharedImportUiContext();
if (initialSharedImportUiContext.modeSelect) {
  initialSharedImportUiContext.modeSelect.addEventListener('change', handleSharedImportModeChange);
}

if (initialSharedImportUiContext.form) {
  initialSharedImportUiContext.form.addEventListener('submit', handleSharedImportSubmit);
}

if (initialSharedImportUiContext.cancelButton) {
  initialSharedImportUiContext.cancelButton.addEventListener('click', handleSharedImportCancel);
}

if (initialSharedImportUiContext.dialog) {
  initialSharedImportUiContext.dialog.addEventListener('cancel', handleSharedImportDialogCancel);
}

enqueueCineUiRegistration(registerSetupsCineUiInternal);

function getSafeLanguageTexts() {
  const scope =
    (typeof globalThis !== 'undefined' && globalThis)
    || (typeof window !== 'undefined' && window)
    || (typeof self !== 'undefined' && self)
    || (typeof global !== 'undefined' && global)
    || null;

  const allTexts =
    (typeof texts !== 'undefined' && texts)
    || (scope && typeof scope.texts === 'object' ? scope.texts : null);

  const resolvedLang =
    typeof currentLang === 'string'
    && allTexts
    && typeof allTexts[currentLang] === 'object'
      ? currentLang
      : 'en';

  const langTexts =
    (allTexts && typeof allTexts[resolvedLang] === 'object' && allTexts[resolvedLang])
    || {};

  const fallbackTexts =
    (allTexts && typeof allTexts.en === 'object' && allTexts.en)
    || {};

  return { langTexts, fallbackTexts };
}

function registerSetupsCineUiInternal(cineUi) {
  if (!cineUi || setupsCineUiRegistered) {
    return;
  }

  const shareContext = getShareUiContext();
  const sharedImportContext = getSharedImportUiContext();

  registerCineUiEntries(
    cineUi.controllers,
    [
      {
        name: 'shareDialog',
        value: {
          context: shareContext,
          open: handleShareSetupClick,
          submit: handleShareFormSubmit,
          cancel: handleShareCancelClick,
          dismiss: handleShareDialogCancel,
        },
      },
      {
        name: 'sharedImportDialog',
        value: {
          context: sharedImportContext,
          submit: handleSharedImportSubmit,
          cancel: handleSharedImportCancel,
          dismiss: handleSharedImportDialogCancel,
          changeMode: handleSharedImportModeChange,
        },
      },
    ],
    'cineUi controller registration (setups) failed'
  );

  registerCineUiEntries(
    cineUi.interactions,
    [
      { name: 'shareOpen', value: handleShareSetupClick },
      { name: 'shareSubmit', value: handleShareFormSubmit },
      { name: 'shareCancel', value: handleShareCancelClick },
      { name: 'shareApplyFile', value: handleApplySharedLinkClick },
      { name: 'shareInputChange', value: handleSharedLinkInputChange },
      { name: 'sharedImportSubmit', value: handleSharedImportSubmit },
      { name: 'sharedImportCancel', value: handleSharedImportCancel },
    ],
    'cineUi interaction registration (setups) failed'
  );

  registerCineUiEntries(
    cineUi.help,
    [
      {
        name: 'shareProject',
        value: () => {
          const { langTexts, fallbackTexts } = getSafeLanguageTexts();
          return (
            langTexts.shareSetupHelp
            || fallbackTexts.shareSetupHelp
            || 'Download a JSON safety bundle of the current project so you can archive or share it offline. Store the file with your crew backups before closing the planner.'
          );
        },
      },
      {
        name: 'sharedImport',
        value: () => {
          const { langTexts, fallbackTexts } = getSafeLanguageTexts();
          return (
            langTexts.applySharedLinkHelp
            || fallbackTexts.applySharedLinkHelp
            || 'Load the configuration from a JSON backup exported via Save & Share or Backup & Restore. Review the preview before applying—nothing overwrites your current project until you confirm Save.'
          );
        },
      },
    ],
    'cineUi help registration (setups) failed'
  );

  setupsCineUiRegistered = areSetupsEntriesRegistered(cineUi);
}

function registerSetupsCineUi() {
  const cineUi =
    (typeof globalThis !== 'undefined' && globalThis.cineUi)
    || (typeof window !== 'undefined' && window.cineUi)
    || (typeof self !== 'undefined' && self.cineUi)
    || null;

  if (!cineUi) {
    return false;
  }

  registerSetupsCineUiInternal(cineUi);
  return true;
}

registerSetupsCineUi();

// Open feedback dialog and handle submission
const cineResultsModule = typeof cineResults === 'object' ? cineResults : null;
if (cineResultsModule && typeof cineResultsModule.setupRuntimeFeedback === 'function') {
  cineResultsModule.setupRuntimeFeedback({
    openDialog: typeof openDialog === 'function' ? openDialog : null,
    closeDialog: typeof closeDialog === 'function' ? closeDialog : null,
    getCurrentSetupKey: typeof getCurrentSetupKey === 'function' ? getCurrentSetupKey : null,
    loadFeedback:
      typeof loadFeedbackSafe === 'function'
        ? loadFeedbackSafe
        : typeof loadFeedback === 'function'
          ? loadFeedback
          : null,
    saveFeedback:
      typeof saveFeedbackSafe === 'function'
        ? saveFeedbackSafe
        : typeof saveFeedback === 'function'
          ? saveFeedback
          : null,
    updateCalculations: typeof updateCalculations === 'function' ? updateCalculations : null,
    setButtonLabelWithIcon:
      typeof setButtonLabelWithIcon === 'function' ? setButtonLabelWithIcon : null,
    iconGlyphs: typeof ICON_GLYPHS !== 'undefined' ? ICON_GLYPHS : null,
  });
}



function summarizeByType(list) {
    if (!Array.isArray(list)) return {};
    return list.reduce((counts, it) => {
        if (it?.type) {
            counts[it.type] = (counts[it.type] || 0) + 1;
        }
        return counts;
    }, {});
}

function renderInfoLabel(text) {
  const str = text != null ? String(text).trim() : '';
  if (!str) return '';
  return `<span class="info-box-label">${escapeHtml(str)}:</span> `;
}

function connectorBlocks(items, icon, cls = 'neutral-conn', label = '', dir = '') {
  if (!Array.isArray(items) || items.length === 0) return '';
  const counts = summarizeByType(items);
  const entries = Object.entries(counts).map(([type, count]) => {
    return `${escapeHtml(type)}${count > 1 ? ` ×${count}` : ''}`;
  });
  if (!entries.length) return '';
  const labelText = label ? `${label}${dir ? ` ${dir}` : ''}` : '';
  const labelHtml = renderInfoLabel(labelText);
  const iconHtml = iconMarkup(icon, 'connector-icon');
  return `<span class="connector-block ${cls}">${iconHtml}${labelHtml}${entries.join(', ')}</span>`;
}

function generateConnectorSummary(device) {
  if (!device || typeof device !== 'object') return '';

  let portHtml = '';
  const connectors = [
    { items: device.power?.powerDistributionOutputs, icon: diagramConnectorIcons.powerOut, cls: 'power-conn', label: 'Power', dir: 'Out' },
    { items: powerInputTypes(device).map(t => ({ type: t })), icon: diagramConnectorIcons.powerIn, cls: 'power-conn', label: 'Power', dir: 'In' },
    { items: device.fizConnectors, icon: diagramConnectorIcons.fiz, cls: 'fiz-conn', label: 'FIZ Port' },
    { items: device.video?.inputs || device.videoInputs, icon: diagramConnectorIcons.video, cls: 'video-conn', label: 'Video', dir: 'In' },
    { items: device.video?.outputs || device.videoOutputs, icon: diagramConnectorIcons.video, cls: 'video-conn', label: 'Video', dir: 'Out' },
    { items: device.timecode, icon: diagramConnectorIcons.timecode, cls: 'neutral-conn', label: 'Timecode' },
    { items: device.audioInput?.portType ? [{ type: device.audioInput.portType }] : undefined, icon: diagramConnectorIcons.audioIn, cls: 'neutral-conn', label: 'Audio', dir: 'In' },
    { items: device.audioOutput?.portType ? [{ type: device.audioOutput.portType }] : undefined, icon: diagramConnectorIcons.audioOut, cls: 'neutral-conn', label: 'Audio', dir: 'Out' },
    { items: device.audioIo?.portType ? [{ type: device.audioIo.portType }] : undefined, icon: diagramConnectorIcons.audioIo, cls: 'neutral-conn', label: 'Audio', dir: 'I/O' },
  ];

  for (const { items, icon, cls, label, dir } of connectors) {
    portHtml += connectorBlocks(items, icon, cls, label, dir);
  }

  let specHtml = '';
  if (typeof device.powerDrawWatts === 'number') {
    specHtml += `<span class="info-box power-conn">${iconMarkup(diagramConnectorIcons.powerSpec)}${renderInfoLabel('Power')}${device.powerDrawWatts} W</span>`;
  }
  if (device.power?.input?.voltageRange) {
    specHtml += `<span class="info-box power-conn">${iconMarkup(ICON_GLYPHS.batteryBolt)}${renderInfoLabel('Voltage')}${escapeHtml(String(device.power.input.voltageRange))}V</span>`;
  }
  if (typeof device.weight_g === 'number') {
    const weightLabel = `${device.weight_g} g`;
    specHtml += `<span class="info-box neutral-conn">${iconMarkup(ICON_GLYPHS.gears)}${renderInfoLabel('Weight')}${escapeHtml(weightLabel)}</span>`;
  }
  if (typeof device.capacity === 'number') {
        specHtml += `<span class="info-box power-conn">${iconMarkup(ICON_GLYPHS.batteryFull)}${renderInfoLabel('Capacity')}${device.capacity} Wh</span>`;
    }
    if (typeof device.pinA === 'number') {
        specHtml += `<span class="info-box power-conn">${renderInfoLabel('Pins')}${device.pinA}A</span>`;
    }
    if (typeof device.dtapA === 'number') {
        specHtml += `<span class="info-box power-conn">${renderInfoLabel('D-Tap')}${device.dtapA}A</span>`;
    }
    if (device.mount_type) {
        specHtml += `<span class="info-box power-conn">${renderInfoLabel('Mount')}${escapeHtml(String(device.mount_type))}</span>`;
    }
  if (typeof device.screenSizeInches === 'number') {
    specHtml += `<span class="info-box video-conn">${iconMarkup(DIAGRAM_MONITOR_ICON)}${renderInfoLabel('Screen')}${device.screenSizeInches}"</span>`;
  }
    if (typeof device.brightnessNits === 'number') {
        specHtml += `<span class="info-box video-conn">${iconMarkup(ICON_GLYPHS.brightness)}${renderInfoLabel('Brightness')}${device.brightnessNits} nits</span>`;
    }
  if (typeof device.wirelessTx === 'boolean') {
    specHtml += `<span class="info-box video-conn">${iconMarkup(ICON_GLYPHS.wifi)}${renderInfoLabel('Wireless')}${device.wirelessTx}</span>`;
  }
  if (device.internalController) {
    specHtml += `<span class="info-box fiz-conn">${iconMarkup(diagramConnectorIcons.controller)}${renderInfoLabel('Controller')}Internal</span>`;
  }
  if (typeof device.torqueNm === 'number') {
    specHtml += `<span class="info-box fiz-conn">${iconMarkup(diagramConnectorIcons.torque)}${renderInfoLabel('Torque')}${device.torqueNm} Nm</span>`;
  }
  if (device.powerSource) {
    specHtml += `<span class="info-box power-conn">${iconMarkup(diagramConnectorIcons.powerSource)}${renderInfoLabel('Power Source')}${escapeHtml(String(device.powerSource))}</span>`;
  }

  const uniqueList = list => {
    if (!Array.isArray(list)) return [];
    const seen = new Set();
    const values = [];
    list.forEach(entry => {
      const str = entry != null ? String(entry).trim() : '';
      if (!str || seen.has(str)) return;
      seen.add(str);
      values.push(escapeHtml(str));
    });
    return values;
  };

  const appendListBox = (html, values, label, cls, icon) => {
    const formatted = uniqueList(values);
    if (!formatted.length) return html;
    const iconHtml = iconMarkup(icon);
    const labelHtml = renderInfoLabel(label);
    const valuesHtml = `<span class="info-box-values">${formatted.join(', ')}</span>`;
    return `${html}<span class="info-box ${cls} info-box-list">${iconHtml}${labelHtml}${valuesHtml}</span>`;
  };

  let recordingHtml = '';
  if (Array.isArray(device.sensorModes)) {
    recordingHtml = appendListBox(recordingHtml, device.sensorModes, 'Sensor Modes', 'video-conn', ICON_GLYPHS.sensor);
  }
  if (Array.isArray(device.resolutions)) {
    recordingHtml = appendListBox(recordingHtml, device.resolutions, 'Resolutions', 'video-conn', ICON_GLYPHS.screen);
  }
  if (Array.isArray(device.frameRates)) {
    const frameRateIcon = diagramConnectorIcons?.timecode || ICON_GLYPHS.camera;
    recordingHtml = appendListBox(recordingHtml, device.frameRates, 'Frame Rates', 'video-conn', frameRateIcon);
  }
  if (Array.isArray(device.recordingCodecs)) {
    recordingHtml = appendListBox(recordingHtml, device.recordingCodecs, 'Codecs', 'video-conn', ICON_GLYPHS.camera);
  }
  if (Array.isArray(device.recordingMedia)) {
    const mediaTypes = device.recordingMedia
      .map(item => (item && item.type ? item.type : ''));
    recordingHtml = appendListBox(recordingHtml, mediaTypes, 'Media', 'video-conn', ICON_GLYPHS.save);
  }

    let extraHtml = '';
    if (Array.isArray(device.power?.batteryPlateSupport) && device.power.batteryPlateSupport.length) {
        const types = device.power.batteryPlateSupport.map(p => {
            const mount = p.mount ? ` (${escapeHtml(p.mount)})` : '';
            return `${escapeHtml(p.type)}${mount}`;
        });
        extraHtml += `<span class="info-box power-conn">${renderInfoLabel('Battery Plate')}${types.join(', ')}</span>`;
    }
    if (Array.isArray(device.viewfinder) && device.viewfinder.length) {
        const types = device.viewfinder.map(v => escapeHtml(v.type));
        extraHtml += `<span class="info-box video-conn">${renderInfoLabel('Viewfinder')}${types.join(', ')}</span>`;
    }
    if (Array.isArray(device.gearTypes) && device.gearTypes.length) {
        const types = device.gearTypes.map(g => escapeHtml(g));
        extraHtml += `<span class="info-box fiz-conn">${renderInfoLabel('Gear')}${types.join(', ')}</span>`;
    }
    if (device.connectivity) {
        extraHtml += `<span class="info-box video-conn">${renderInfoLabel('Connectivity')}${escapeHtml(String(device.connectivity))}</span>`;
    }
    if (device.notes) {
        extraHtml += `<span class="info-box neutral-conn">${renderInfoLabel('Notes')}${escapeHtml(String(device.notes))}</span>`;
    }

    let lensHtml = '';
    if (Array.isArray(device.lensMount)) {
        const boxes = device.lensMount.map(lm => {
            const mount = lm.mount ? ` (${escapeHtml(lm.mount)})` : '';
            return `<span class="info-box neutral-conn">${escapeHtml(lm.type)}${mount}</span>`;
        }).join('');
        if (boxes) lensHtml = `<div class="lens-mount-box">${boxes}</div>`;
    }

    let html = '';
    const section = (label, content) => {
        if (!content) return '';
        return `<div class="info-label">${label}</div>${content}`;
    };

    html += section('Ports', portHtml);
    html += section('Specs', specHtml);
    html += section('Recording', recordingHtml);
    html += section('Extras', extraHtml);
    if (lensHtml) html += `<div class="info-label">Lens Mount</div>${lensHtml}`;

    return html ? `<div class="connector-summary">${html}</div>` : '';
}


function suggestChargerCounts(total) {
    let quad = Math.floor(total / 4);
    const remainder = total % 4;
    let dual = 0;
    let single = 0;
    if (remainder === 0) {
        // nothing
    } else if (remainder === 3) {
        quad += 1;
    } else if (remainder > 0) {
        dual += 1;
    }
    return { quad, dual, single };
}

function addArriKNumber(name) {
    if (!name) return name;
    const d = typeof devices !== 'undefined' ? devices : {};
    const collections = [
        d.viewfinders,
        d.directorMonitors,
        d.iosVideo,
        d.videoAssist,
        d.media,
        d.lenses
    ];
    for (const col of collections) {
        if (col && col[name]) {
            const item = col[name];
            if (item.brand && item.brand.toUpperCase().includes('ARRI') && item.kNumber && !name.includes(item.kNumber)) {
                return name.replace(/^ARRI\s*/i, `ARRI ${item.kNumber} `);
            }
            return name;
        }
    }
    if (d.accessories) {
        const findItem = obj => {
            if (!obj) return null;
            if (obj[name]) return obj[name];
            for (const val of Object.values(obj)) {
                if (val && typeof val === 'object') {
                    const found = findItem(val);
                    if (found) return found;
                }
            }
            return null;
        };
        for (const col of Object.values(d.accessories)) {
            const item = findItem(col);
            if (item) {
                if (item.brand && item.brand.toUpperCase().includes('ARRI') && item.kNumber && !name.includes(item.kNumber)) {
                    return /^ARRI\s*/i.test(name) ? name.replace(/^ARRI\s*/i, `ARRI ${item.kNumber} `) : `ARRI ${item.kNumber} ${name}`;
                }
                return name;
            }
        }
    }
    return name;
}

const sanitizeFizContext = context => (context || '')
    .replace(/[()]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

const formatFizCable = (name, context) => {
    const cleaned = sanitizeFizContext(context);
    return cleaned ? `${name} (${cleaned})` : name;
};

function suggestArriFizCables() {
    const CABLE_LBUS_05 = 'LBUS to LBUS 0,5m';
    const CABLE_UDM_SERIAL_4P = 'Cable UDM – SERIAL (4p) 0,5m';
    const CABLE_UDM_SERIAL_7P = 'Cable UDM – SERIAL (7p) 1,5m';
    const cables = [];
    const lbusLengths = [];
    const camSpare = [];
    const camera = cameraSelect?.value || '';
    const motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    const controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    const distance = distanceSelect?.value || '';
    const motor = motors[0] || '';
    const hasMasterGrip = controllers.includes('Arri Master Grip (single unit)');
    const hasRIA = controllers.includes('Arri RIA-1');
    let hasUDM = distance.includes('UDM');
    let hasLCube = distance.includes('LCube');
    if (hasLCube && (hasRIA || camera === 'Arri Alexa 35')) hasLCube = false;
    const isCforceMiniRF = /cforce mini rf/i.test(motor);
    const isCforceMini = /cforce mini/i.test(motor) && !isCforceMiniRF;
    const motorContext = motor ? `for ${motor}` : 'for FIZ motor';
    const masterGripContext = 'for Arri Master Grip (single unit)';
    const distanceContext = distance ? `for ${distance}` : 'for distance sensor';
    const controllersToCheck = [];
    if (hasRIA) controllersToCheck.push('Arri RIA-1');
    if (isCforceMiniRF) controllersToCheck.push('Arri cforce mini RF');
    const primaryController = controllersToCheck[0] || controllers[0] || '';
    const pushLbus = (len, contextOverride) => {
        const formatted = String(len).replace('.', ',');
        const ctx = contextOverride || motorContext;
        cables.push(formatFizCable(`LBUS to LBUS ${formatted}m`, ctx));
        lbusLengths.push(Number(len));
    };
    if ((camera === 'Arri Alexa Mini' || camera === 'Arri Alexa Mini LF') && isCforceMini) {
        pushLbus(0.3);
        if (hasLCube) pushLbus(0.4, distanceContext);
        if (hasMasterGrip) pushLbus(0.5, masterGripContext);
    } else if (camera === 'Arri Alexa 35' && isCforceMini) {
        pushLbus(0.3);
        if (hasMasterGrip) pushLbus(0.5, masterGripContext);
    } else if (isCforceMiniRF) {
        if (hasLCube) {
            pushLbus(0.4, distanceContext);
            if (hasMasterGrip) pushLbus(0.5, masterGripContext);
        } else if (hasMasterGrip) {
            pushLbus(0.5, masterGripContext);
        }
    } else if (hasRIA && isCforceMini) {
        pushLbus(0.4);
        if (hasMasterGrip) pushLbus(0.5, masterGripContext);
    }
    if (controllersToCheck.length) {
        const cablesData = devices.accessories?.cables || {};
        let chosen = null;
        for (const [name, data] of Object.entries(cablesData)) {
            const connectors = [];
            if (Array.isArray(data.connectors)) connectors.push(...data.connectors);
            if (data.from) connectors.push(data.from);
            if (data.to) connectors.push(data.to);
            if (!connectors.some(c => /CAM \(7-pin/i.test(c))) continue;
            const ctrlOk = (data.compatibleControllers || []).some(cc =>
                controllersToCheck.some(ct => cc.toLowerCase().includes(ct.toLowerCase())));
            if (!ctrlOk) continue;
            const camOk = !data.compatibleCameras ||
                data.compatibleCameras.some(c => c.toLowerCase() === camera.toLowerCase());
            if (!camOk) continue;
            if (!chosen || (data.lengthM ?? Infinity) < (cablesData[chosen].lengthM ?? Infinity)) {
                chosen = name;
            }
        }
        if (chosen) {
            const camContext = camera ? `for ${camera}` : 'for camera control';
            cables.push(formatFizCable(chosen, camContext));
            camSpare.push(chosen);
        } else if (hasRIA && cablesData['Cable CAM (7-pin) – D-Tap 0,5m']) {
            const fallback = 'Cable CAM (7-pin) – D-Tap 0,5m';
            const fallbackContext = primaryController ? `for ${primaryController} power` : 'for controller power';
            cables.push(formatFizCable(fallback, fallbackContext));
            camSpare.push(fallback);
        }
    }
    if (hasUDM) {
        if (hasLCube) {
            cables.push(formatFizCable(CABLE_UDM_SERIAL_7P, distanceContext));
        } else {
            cables.push(formatFizCable(CABLE_UDM_SERIAL_4P, distanceContext));
            cables.push(formatFizCable(CABLE_UDM_SERIAL_4P, 'spare'));
        }
    }
    if (lbusLengths.length) {
        const shortest = Math.min(...lbusLengths);
        const formattedShortest = String(shortest).replace('.', ',');
        cables.push(formatFizCable(`LBUS to LBUS ${formattedShortest}m`, 'spare'));
        cables.push(formatFizCable(CABLE_LBUS_05, 'spare'));
    }
    camSpare.forEach(n => cables.push(formatFizCable(n, 'spare')));
    return cables;
}

function collectAccessories({ hasMotor = false, videoDistPrefs = [] } = {}) {
    const cameraSupport = [];
    const misc = [];
    const monitoringSupport = [];
    const rigging = [];
    const chargers = [];
    const fizCables = [];
    const acc = devices.accessories || {};
    const excludedCables = new Set(['D-Tap to LEMO 2-pin', 'HDMI Cable']);

    if (batterySelect.value) {
        const mount = devices.batteries[batterySelect.value]?.mount_type;
        if (acc.powerPlates) {
            for (const [name, plate] of Object.entries(acc.powerPlates)) {
                if ((!plate.mount || plate.mount === mount) && (!plate.compatible || plate.compatible.includes(cameraSelect.value))) {
                    cameraSupport.push(name);
                }
            }
        }
        if (acc.chargers) {
            let camCount = parseInt(batteryCountElem?.textContent || '', 10);
            if (!Number.isFinite(camCount)) camCount = batterySelect.value ? 1 : 0;
            let monCount = 0;
            if (Array.isArray(videoDistPrefs)) {
                const handheldCount = videoDistPrefs.filter(v => /Monitor(?: \d+")? handheld$/.test(v)).length;
                monCount += handheldCount * 3;
                const largeCount = videoDistPrefs.filter(v => {
                    const m = v.match(/Monitor (\d+(?:\.\d+)?)/);
                    return m && parseFloat(m[1]) > 10 && !/handheld$/.test(v);
                }).length;
                monCount += largeCount * 2;
            }
            if (hasMotor) monCount += 3;

            const pushChargersForMount = (targetMount, total) => {
                if (!targetMount || total <= 0) return;
                const counts = suggestChargerCounts(total);
                const findName = slots => {
                    for (const [name, charger] of Object.entries(acc.chargers)) {
                        if (charger.mount === targetMount && charger.slots === slots) return name;
                    }
                    return null;
                };
                const pushCharger = (slots, count) => {
                    const n = findName(slots);
                    if (!n) return;
                    for (let i = 0; i < count; i++) chargers.push(n);
                };
                pushCharger(4, counts.quad);
                pushCharger(2, counts.dual);
                pushCharger(1, counts.single);
            };

            if (mount === 'B-Mount') {
                pushChargersForMount('B-Mount', camCount);
                pushChargersForMount('V-Mount', monCount);
            } else {
                pushChargersForMount(mount, camCount + monCount);
            }
        }
    }

    if (cameraSelect.value && acc.cages) {
        if (!cageSelect.value || cageSelect.value === 'None') {
            for (const [name, cage] of Object.entries(acc.cages)) {
                if (!cage.compatible || cage.compatible.includes(cameraSelect.value)) cameraSupport.push(name);
            }
        }
    }

    const powerCableDb = acc.cables?.power || {};
    const gatherPower = (data, target = misc, includeExcluded = false) => {
        const input = data?.power?.input?.type;
        const types = Array.isArray(input) ? input : input ? [input] : [];
        types.forEach(t => {
            for (const [name, cable] of Object.entries(powerCableDb)) {
                const isExcluded = excludedCables.has(name);
                if (cable.to === t && (!isExcluded || includeExcluded)) target.push(name);
            }
        });
    };
    gatherPower(devices.cameras[cameraSelect.value]);
    gatherPower(devices.video[videoSelect.value]);
    const onboardMonitor = devices.monitors[monitorSelect.value];
    if (onboardMonitor) {
        const monitorLabel = 'Onboard monitor';
        const powerType = onboardMonitor?.power?.input?.type;
        const hasLemo2 = Array.isArray(powerType)
            ? powerType.includes('LEMO 2-pin')
            : powerType === 'LEMO 2-pin';
        if (hasLemo2) {
            monitoringSupport.push(
                `D-Tap to Lemo-2-pin Cable 0,5m (${monitorLabel})`,
                `D-Tap to Lemo-2-pin Cable 0,5m (${monitorLabel})`
            );
        }
        const cameraData = devices.cameras[cameraSelect.value];
        const camVideo = (cameraData?.videoOutputs || []).map(v => v.type?.toUpperCase());
        const monVideo = (onboardMonitor.videoInputs || []).map(v => v.type?.toUpperCase());
        const hasSDI = camVideo.some(t => t && t.includes('SDI')) && monVideo.some(t => t && t.includes('SDI'));
        const hasHDMI = camVideo.includes('HDMI') && monVideo.includes('HDMI');
        if (hasSDI) {
            monitoringSupport.push(
                `Ultraslim BNC Cable 0.5 m (${monitorLabel})`,
                `Ultraslim BNC Cable 0.5 m (${monitorLabel})`
            );
        } else if (hasHDMI) {
            monitoringSupport.push(
                `Ultraslim HDMI 0.5 m (${monitorLabel})`,
                `Ultraslim HDMI 0.5 m (${monitorLabel})`
            );
        }
        rigging.push(`ULCS Arm mit 3/8" und 1/4" double (${monitorLabel})`);
    }
    if (videoSelect.value) {
        const rxName = videoSelect.value.replace(/ TX\b/, ' RX');
        if (devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
            gatherPower(devices.wirelessReceivers[rxName]);
        }
    }
    motorSelects.forEach(sel => gatherPower(devices.fiz.motors[sel.value]));
    controllerSelects.forEach(sel => gatherPower(devices.fiz.controllers[sel.value]));
    gatherPower(devices.fiz.distance[distanceSelect.value]);

    const fizCableDb = acc.cables?.fiz || {};
    const getFizConnectors = data => {
        const list = [];
        if (!data) return list;
        if (Array.isArray(data.fizConnectors)) {
            data.fizConnectors.forEach(fc => {
                const type = fc && typeof fc === 'object' ? fc.type : fc;
                if (type) list.push(type);
            });
        }
        if (data.fizConnector) list.push(data.fizConnector);
        return [...new Set(list.filter(Boolean))];
    };
    const pushFizCable = (name, context) => {
        fizCables.push(formatFizCable(name, context));
    };
    const pairContextCounts = {};
    const buildPairContext = (motorName, controllerName) => {
        const parts = [sanitizeFizContext(motorName), sanitizeFizContext(controllerName)].filter(Boolean);
        if (!parts.length) return '';
        const base = parts.join(' ↔ ');
        const key = base.toLowerCase();
        const next = (pairContextCounts[key] || 0) + 1;
        pairContextCounts[key] = next;
        return next > 1 ? `${base} #${next}` : base;
    };
    const matchesCable = (cable, from, to) => {
        if (!cable) return false;
        const fromToMatch = (a, b) => (cable.from === a && cable.to === b) || (cable.from === b && cable.to === a);
        if (cable.from && cable.to) {
            if (fromToMatch(from, to)) return true;
        }
        if (Array.isArray(cable.connectors)) {
            const connectors = cable.connectors;
            if (connectors.includes(from) && connectors.includes(to)) return true;
        }
        return false;
    };
    const motorEntries = motorSelects
        .map(sel => sel.value)
        .filter(v => v && v !== 'None')
        .map(name => ({ name, data: devices.fiz.motors[name] }))
        .filter(entry => entry.data);
    const controllerEntries = controllerSelects
        .map(sel => sel.value)
        .filter(v => v && v !== 'None')
        .map(name => ({ name, data: devices.fiz.controllers[name] }))
        .filter(entry => entry.data);
    motorEntries.forEach(motorEntry => {
        const motorConns = getFizConnectors(motorEntry.data);
        controllerEntries.forEach(controllerEntry => {
            const controllerConns = getFizConnectors(controllerEntry.data);
            motorConns.forEach(mConn => {
                controllerConns.forEach(cConn => {
                    if (mConn !== cConn) return;
                    for (const [name, cable] of Object.entries(fizCableDb)) {
                        if (matchesCable(cable, mConn, cConn)) {
                            const context = buildPairContext(motorEntry.name, controllerEntry.name);
                            pushFizCable(name, context);
                        }
                    }
                });
            });
        });
    });

    suggestArriFizCables().forEach(name => fizCables.push(name));

    const miscUnique = [...new Set(misc)];
    const monitoringSupportList = monitoringSupport.slice();
    const riggingUnique = [...new Set(rigging)];
    for (let i = 0; i < 4; i++) monitoringSupportList.push('BNC Connector');
    return {
        cameraSupport: [...new Set(cameraSupport)],
        chargers,
        fizCables,
        misc: miscUnique,
        monitoringSupport: monitoringSupportList,
        rigging: riggingUnique
    };
}

function cloneProjectFormDataSnapshot(snapshot) {
    if (!snapshot || typeof snapshot !== 'object') {
        return {};
    }

    const clone = { ...snapshot };
    if (Array.isArray(snapshot.people)) {
        clone.people = snapshot.people.map(person => ({ ...person }));
    }
    if (Array.isArray(snapshot.prepDays)) {
        clone.prepDays = [...snapshot.prepDays];
    }
    if (Array.isArray(snapshot.shootingDays)) {
        clone.shootingDays = [...snapshot.shootingDays];
    }
    if (Array.isArray(snapshot.returnDays)) {
        clone.returnDays = [...snapshot.returnDays];
    }
    if (Array.isArray(snapshot.storageRequirements)) {
        clone.storageRequirements = snapshot.storageRequirements.map(entry => ({ ...entry }));
    }
    if (snapshot.monitorBatteries && typeof snapshot.monitorBatteries === 'object') {
        clone.monitorBatteries = { ...snapshot.monitorBatteries };
    }
    if (Array.isArray(snapshot.lensSelections)) {
        clone.lensSelections = snapshot.lensSelections.map(entry => ({ ...entry }));
    }

    return clone;
}

function freezeProjectFormDataSnapshot(info) {
    const snapshot = { ...info };

    if (Array.isArray(info.people)) {
        snapshot.people = PROJECT_FORM_FREEZE(info.people.map(person => PROJECT_FORM_FREEZE({ ...person })));
    }
    if (Array.isArray(info.prepDays)) {
        snapshot.prepDays = PROJECT_FORM_FREEZE([...info.prepDays]);
    }
    if (Array.isArray(info.shootingDays)) {
        snapshot.shootingDays = PROJECT_FORM_FREEZE([...info.shootingDays]);
    }
    if (Array.isArray(info.returnDays)) {
        snapshot.returnDays = PROJECT_FORM_FREEZE([...info.returnDays]);
    }
    if (Array.isArray(info.storageRequirements)) {
        snapshot.storageRequirements = PROJECT_FORM_FREEZE(
            info.storageRequirements.map(entry => PROJECT_FORM_FREEZE({ ...entry }))
        );
    }
    if (info.monitorBatteries && typeof info.monitorBatteries === 'object') {
        snapshot.monitorBatteries = PROJECT_FORM_FREEZE({ ...info.monitorBatteries });
    }
    if (Array.isArray(info.lensSelections)) {
        snapshot.lensSelections = PROJECT_FORM_FREEZE(
            info.lensSelections.map(entry => PROJECT_FORM_FREEZE({ ...entry }))
        );
    }

    return PROJECT_FORM_FREEZE(snapshot);
}

function collectProjectFormData() {
    if (!projectForm) return {};

    if (!projectFormDataCacheDirty && projectFormDataCache) {
        return cloneProjectFormDataSnapshot(projectFormDataCache);
    }

    const formData = new FormData(projectForm);
    const getValue = (name) => {
        const raw = formData.get(name);
        return typeof raw === 'string' ? raw.trim() : '';
    };
    const getMultiValue = (name) => {
        const values = formData.getAll(name);
        if (!values || values.length === 0) return '';
        return values.map(value => (typeof value === 'string' ? value : String(value))).join(', ');
    };

    const viewfinderSettings = getMultiValue('viewfinderSettings');
    const frameGuides = getMultiValue('frameGuides');
    const aspectMaskOpacity = getMultiValue('aspectMaskOpacity');
    const filterStr = collectFilterSelections();
    const filterTypes = filterStr ? filterStr.split(',').map(s => s.split(':')[0]) : [];
    const matteboxVal = filterTypes.some(t => t === 'ND Grad HE' || t === 'ND Grad SE')
        ? 'Swing Away'
        : getValue('mattebox');

    const people = Array.from(crewContainer?.querySelectorAll('.person-row') || [])
        .map(row => {
            const roleValue = row.querySelector('select')?.value;
            const nameInput = row.querySelector('.person-name');
            const phoneInput = row.querySelector('.person-phone');
            const emailInput = row.querySelector('.person-email');
            const websiteInput = row.querySelector('.person-website');
            const role = typeof roleValue === 'string'
                ? roleValue.trim()
                : (roleValue == null ? '' : String(roleValue));
            const name = typeof nameInput?.value === 'string' ? nameInput.value.trim() : '';
            const phone = typeof phoneInput?.value === 'string' ? phoneInput.value.trim() : '';
            const email = typeof emailInput?.value === 'string' ? emailInput.value.trim() : '';
            const website = typeof websiteInput?.value === 'string' ? websiteInput.value.trim() : '';
            return { role, name, phone, email, website };
        })
        .filter(person => person.role || person.name || person.phone || person.email || person.website);

    const collectRanges = (container, startSel, endSel) => Array.from(container?.querySelectorAll('.period-row') || [])
        .map(row => {
            const start = row.querySelector(startSel)?.value;
            const end = row.querySelector(endSel)?.value;
            return [start, end].filter(Boolean).join(' to ');
        })
        .filter(Boolean);

    const prepDays = collectRanges(prepContainer, '.prep-start', '.prep-end');
    const shootingDays = collectRanges(shootContainer, '.shoot-start', '.shoot-end');
    const returnDays = collectRanges(returnContainer, '.return-start', '.return-end');

    const gearValues = gearListOutput ? (() => {
        const ids = [
            'gearListDirectorMonitor',
            'gearListDopMonitor',
            'gearListGafferMonitor',
            'gearListDirectorMonitor15',
            'gearListComboMonitor15',
            'gearListDopMonitor15',
            'gearListFocusMonitor',
            'gearListProGaffColor1',
            'gearListProGaffWidth1',
            'gearListProGaffColor2',
            'gearListProGaffWidth2',
            'gearListEyeLeatherColor'
        ];
        const map = new Map();
        ids.forEach(id => {
            const el = gearListOutput.querySelector(`#${id}`);
            if (!el) return;
            const value = el.value;
            map.set(id, typeof value === 'string' ? value : (value == null ? '' : String(value)));
        });
        return map;
    })() : null;

    const getGearValue = (id) => (gearValues && gearValues.has(id) ? gearValues.get(id) : '');

    const monitorBatteryMap = gearListOutput ? (() => {
        const entries = {};
        gearListOutput.querySelectorAll('select[data-monitor-battery-key]').forEach(sel => {
            const key = sel.getAttribute('data-monitor-battery-key');
            if (!key) return;
            const rawValue = sel.value;
            const value = typeof rawValue === 'string' ? rawValue.trim() : (rawValue == null ? '' : String(rawValue));
            if (value) {
                entries[key] = value;
            }
        });
        return entries;
    })() : {};

    const proGaffColor1 = getGearValue('gearListProGaffColor1');
    const proGaffWidth1 = getGearValue('gearListProGaffWidth1');
    const proGaffColor2 = getGearValue('gearListProGaffColor2');
    const proGaffWidth2 = getGearValue('gearListProGaffWidth2');

    const addressFields = {
        street: getValue('productionCompanyStreet'),
        street2: getValue('productionCompanyStreet2'),
        city: getValue('productionCompanyCity'),
        region: getValue('productionCompanyRegion'),
        postalCode: getValue('productionCompanyPostalCode'),
        country: getValue('productionCompanyCountry')
    };

    const addressLines = [];
    if (addressFields.street) addressLines.push(addressFields.street);
    if (addressFields.street2) addressLines.push(addressFields.street2);
    const localityParts = [addressFields.city, addressFields.region, addressFields.postalCode]
        .map(part => part || '')
        .filter(part => part);
    if (localityParts.length) {
        addressLines.push(localityParts.join(', '));
    }
    if (addressFields.country) {
        addressLines.push(addressFields.country);
    }

    const lensSnapshot = lensSelectionManager && typeof lensSelectionManager.snapshot === 'function'
        ? lensSelectionManager.snapshot()
        : { names: normalizeLensSelectionNames(getMultiValue('lenses')), lensSelections: [] };
    const lensNames = Array.isArray(lensSnapshot.names)
        ? lensSnapshot.names.map(name => (typeof name === 'string' ? name.trim() : '')).filter(Boolean)
        : normalizeLensSelectionNames(lensSnapshot.names);
    const lensSelectionsDetailed = Array.isArray(lensSnapshot.lensSelections)
        ? lensSnapshot.lensSelections
            .map(entry => ({
                name: typeof entry?.name === 'string' ? entry.name.trim() : '',
                mount: typeof entry?.mount === 'string' ? entry.mount.trim() : ''
            }))
            .filter(entry => entry.name)
        : [];

    const info = {
        productionCompany: getValue('productionCompany'),
        productionCompanyAddress: addressLines.join('\n'),
        productionCompanyStreet: addressFields.street,
        productionCompanyStreet2: addressFields.street2,
        productionCompanyCity: addressFields.city,
        productionCompanyRegion: addressFields.region,
        productionCompanyPostalCode: addressFields.postalCode,
        productionCompanyCountry: addressFields.country,
        rentalHouse: getValue('rentalHouse'),
        ...(people.length ? { people } : {}),
        prepDays,
        shootingDays,
        returnDays,
        deliveryResolution: getValue('deliveryResolution'),
        recordingResolution: getValue('recordingResolution'),
        aspectRatio: getMultiValue('aspectRatio'),
        codec: getValue('codec'),
        baseFrameRate: getValue('baseFrameRate'),
        recordingFrameRate: getValue('recordingFrameRate'),
        sensorMode: getValue('sensorMode'),
        lenses: lensNames,
        requiredScenarios: getMultiValue('requiredScenarios'),
        cameraHandle: getMultiValue('cameraHandle'),
        viewfinderExtension: getValue('viewfinderExtension'),
        viewfinderEyeLeatherColor: getGearValue('gearListEyeLeatherColor') || getValue('viewfinderEyeLeatherColor'),
        mattebox: matteboxVal,
        gimbal: getMultiValue('gimbal'),
        viewfinderSettings,
        frameGuides,
        aspectMaskOpacity,
        videoDistribution: getMultiValue('videoDistribution'),
        monitoringConfiguration: getValue('monitoringConfiguration'),
        monitorUserButtons: getMultiValue('monitorUserButtons'),
        cameraUserButtons: getMultiValue('cameraUserButtons'),
        viewfinderUserButtons: getMultiValue('viewfinderUserButtons'),
        tripodHeadBrand: getValue('tripodHeadBrand'),
        tripodBowl: getValue('tripodBowl'),
        tripodTypes: getMultiValue('tripodTypes'),
        tripodSpreader: getValue('tripodSpreader'),
        sliderBowl: getSetupsCoreValue('getSliderBowlValue'),
        easyrig: getSetupsCoreValue('getEasyrigValue'),
        filter: filterStr
    };

    info.lensSelections = lensSelectionsDetailed;

    if (monitorBatteryMap && Object.keys(monitorBatteryMap).length) {
        info.monitorBatteries = monitorBatteryMap;
    }

    const assignGearField = (prop, id) => {
        const value = getGearValue(id);
        if (value) {
            info[prop] = value;
        }
    };

    const assignManualFlag = (prop, id) => {
        if (!gearListOutput) return;
        const el = gearListOutput.querySelector(`#${id}`);
        if (el && el.dataset && el.dataset.autoGearManual === 'true') {
            info[`${prop}Manual`] = true;
        }
    };

    assignGearField('directorMonitor', 'gearListDirectorMonitor');
    assignGearField('dopMonitor', 'gearListDopMonitor');
    assignGearField('gafferMonitor', 'gearListGafferMonitor');
    assignGearField('directorMonitor15', 'gearListDirectorMonitor15');
    assignGearField('comboMonitor15', 'gearListComboMonitor15');
    assignGearField('dopMonitor15', 'gearListDopMonitor15');

    info.focusMonitor = getGearValue('gearListFocusMonitor') || '';

    assignManualFlag('directorMonitor', 'gearListDirectorMonitor');
    assignManualFlag('dopMonitor', 'gearListDopMonitor');
    assignManualFlag('gafferMonitor', 'gearListGafferMonitor');
    assignManualFlag('directorMonitor15', 'gearListDirectorMonitor15');
    assignManualFlag('comboMonitor15', 'gearListComboMonitor15');
    assignManualFlag('dopMonitor15', 'gearListDopMonitor15');
    assignManualFlag('focusMonitor', 'gearListFocusMonitor');

    if (proGaffColor1 || proGaffWidth1) {
        info.proGaffColor1 = proGaffColor1 || '';
        info.proGaffWidth1 = proGaffWidth1 || '';
    }

    if (proGaffColor2 || proGaffWidth2) {
        info.proGaffColor2 = proGaffColor2 || '';
        info.proGaffWidth2 = proGaffWidth2 || '';
    }

    const storageEntries = Array.from(storageNeedsContainer?.querySelectorAll('.storage-row') || [])
        .map(row => {
            const quantityInput = row.querySelector('.storage-quantity');
            const typeSelect = row.querySelector('.storage-type');
            const variantSelect = row.querySelector('.storage-variant');
            const notesInput = row.querySelector('.storage-notes');
            const rawQuantity = quantityInput ? parseInt(quantityInput.value, 10) : NaN;
            const quantity = Number.isFinite(rawQuantity) && rawQuantity > 0 ? rawQuantity : null;
            const type = typeof typeSelect?.value === 'string' ? typeSelect.value.trim() : '';
            const variant = typeof variantSelect?.value === 'string' ? variantSelect.value.trim() : '';
            const notes = typeof notesInput?.value === 'string' ? notesInput.value.trim() : '';
            if (!quantity && !type && !variant && !notes) {
                return null;
            }
            const entry = {};
            if (quantity) entry.quantity = quantity;
            if (type) entry.type = type;
            if (variant) entry.variant = variant;
            if (notes) entry.notes = notes;
            return entry;
        })
        .filter(Boolean);
    if (storageEntries.length) {
        info.storageRequirements = storageEntries;
    }

    const currentProjectName = getCurrentProjectName();
    if (currentProjectName) {
        info.projectName = currentProjectName;
    }

    const snapshot = freezeProjectFormDataSnapshot(info);
    projectFormDataCache = snapshot;
    projectFormDataCacheDirty = false;

    return cloneProjectFormDataSnapshot(snapshot);
}

function populateProjectForm(info = {}) {
    if (!projectForm) return;
    projectForm.reset();
    const setVal = (name, value) => {
        if (value === undefined) return;
        const field = projectForm.querySelector(`[name="${name}"]`);
        if (!field) return;
        let resolvedValue = value;
        if (name === 'recordingFrameRate') {
            if (typeof value === 'number' && Number.isFinite(value)) {
                resolvedValue = value % 1 ? value.toFixed(3).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1') : String(value);
            }
            else if (typeof value === 'string') {
                const trimmed = value.trim();
                const numericMatch = trimmed.match(/-?\d+(?:\.\d+)?/);
                if (numericMatch) {
                    const num = Number.parseFloat(numericMatch[0]);
                    if (Number.isFinite(num)) {
                        resolvedValue = num % 1
                            ? num.toFixed(3).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1')
                            : String(num);
                    }
                    else {
                        resolvedValue = trimmed;
                    }
                }
                else {
                    resolvedValue = trimmed;
                }
            }
        }
        field.value = resolvedValue;
    };
    const setMulti = (name, values) => {
        const field = projectForm.querySelector(`[name="${name}"]`);
        if (!field || values === undefined) return;
        const arr = Array.isArray(values) ? values : (values ? values.split(',').map(v => v.trim()) : []);
        Array.from(field.options).forEach(opt => {
            opt.selected = arr.includes(opt.value);
        });
    };

    populateRecordingResolutionDropdown(info.recordingResolution);
    populateSensorModeDropdown(info.sensorMode);
    populateCodecDropdown(info.codec);
    if (typeof populateFrameRateDropdown === 'function') {
        populateFrameRateDropdown(info.recordingFrameRate);
    }

    setVal('productionCompany', info.productionCompany);

    const normalizedAddressFields = (() => {
        const resolved = {
            street: info.productionCompanyStreet || '',
            street2: info.productionCompanyStreet2 || '',
            city: info.productionCompanyCity || '',
            region: info.productionCompanyRegion || '',
            postalCode: info.productionCompanyPostalCode || '',
            country: info.productionCompanyCountry || ''
        };
        const hasStructuredValues = Object.values(resolved).some(value => value);
        if (hasStructuredValues) {
            return resolved;
        }
        const legacyAddress = typeof info.productionCompanyAddress === 'string'
            ? info.productionCompanyAddress.trim()
            : '';
        if (!legacyAddress) {
            return resolved;
        }
        const lines = legacyAddress
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(Boolean);
        if (!lines.length) {
            return resolved;
        }
        resolved.street = lines[0] || '';
        resolved.street2 = lines[1] || '';
        if (lines.length >= 3) {
            resolved.city = lines.slice(2).join(', ');
        }
        return resolved;
    })();

    setVal('productionCompanyStreet', normalizedAddressFields.street);
    setVal('productionCompanyStreet2', normalizedAddressFields.street2);
    setVal('productionCompanyCity', normalizedAddressFields.city);
    setVal('productionCompanyRegion', normalizedAddressFields.region);
    setVal('productionCompanyPostalCode', normalizedAddressFields.postalCode);
    setVal('productionCompanyCountry', normalizedAddressFields.country);
    setVal('rentalHouse', info.rentalHouse);
    if (crewContainer) {
        crewContainer.innerHTML = '';

        const crewEntries = Array.isArray(info.people)
            ? info.people.map(person => (person && typeof person === 'object' ? { ...person } : {}))
            : [];

        const profile = typeof getUserProfileSnapshot === 'function' ? getUserProfileSnapshot() : null;
        if (profile && typeof profile === 'object') {
            const profileName = typeof profile.name === 'string' ? profile.name.trim() : '';
            const profileEmail = typeof profile.email === 'string' ? profile.email.trim() : '';
            const profilePhone = typeof profile.phone === 'string' ? profile.phone.trim() : '';
            const profileRole = typeof profile.role === 'string' ? profile.role.trim() : '';
            const profileAvatar = typeof profile.avatar === 'string' ? profile.avatar : '';
            const hasProfileDetails = Boolean(
                profileName
                || profileEmail
                || profilePhone
                || profileRole
                || profileAvatar,
            );

            if (hasProfileDetails) {
                const normalizeToken = (value) => {
                    if (!value) return '';
                    const trimmed = value.trim();
                    if (!trimmed) return '';
                    try {
                        return typeof trimmed.toLocaleLowerCase === 'function'
                            ? trimmed.toLocaleLowerCase()
                            : trimmed.toLowerCase();
                    } catch (error) {
                        void error;
                        return trimmed.toLowerCase();
                    }
                };

                const profileNameToken = normalizeToken(profileName);
                const profileEmailToken = normalizeToken(profileEmail);
                const profilePhoneToken = profilePhone || '';

                const alreadyPresent = crewEntries.some(person => {
                    if (!person || typeof person !== 'object') {
                        return false;
                    }
                    const personNameToken = normalizeToken(typeof person.name === 'string' ? person.name : '');
                    const personEmailToken = normalizeToken(typeof person.email === 'string' ? person.email : '');
                    const personPhoneToken = typeof person.phone === 'string' ? person.phone.trim() : '';

                    if (profileEmailToken && personEmailToken && personEmailToken === profileEmailToken) {
                        return true;
                    }
                    if (profilePhoneToken && personPhoneToken && personPhoneToken === profilePhoneToken) {
                        return true;
                    }
                    if (profileNameToken && personNameToken && personNameToken === profileNameToken) {
                        return true;
                    }
                    return false;
                });

                if (!alreadyPresent) {
                    crewEntries.unshift({
                        role: profileRole || '',
                        name: profileName || '',
                        phone: profilePhone || '',
                        email: profileEmail || '',
                        avatar: profileAvatar || '',
                    });
                }
            }
        }

        crewEntries.forEach(p => createCrewRow(p));
    }
    if (prepContainer) {
        prepContainer.innerHTML = '';
        const prepArr = Array.isArray(info.prepDays)
            ? info.prepDays
            : (info.prepDays ? String(info.prepDays).split('\n') : ['']);
        if (!prepArr.length) prepArr.push('');
        prepArr.forEach(r => {
            const [start, end] = r.split(' to ');
            createPrepRow({ start, end });
        });
    }
    if (shootContainer) {
        shootContainer.innerHTML = '';
        const shootArr = Array.isArray(info.shootingDays)
            ? info.shootingDays
            : (info.shootingDays ? String(info.shootingDays).split('\n') : ['']);
        if (!shootArr.length) shootArr.push('');
        shootArr.forEach(r => {
            const [start, end] = r.split(' to ');
            createShootRow({ start, end });
        });
    }
    if (returnContainer) {
        returnContainer.innerHTML = '';
        const returnArr = Array.isArray(info.returnDays)
            ? info.returnDays
            : (info.returnDays ? String(info.returnDays).split('\n') : ['']);
        if (!returnArr.length) returnArr.push('');
        returnArr.forEach(r => {
            const [start, end] = r.split(' to ');
            createReturnRow({ start, end });
        });
    }
    if (storageNeedsContainer) {
        storageNeedsContainer.innerHTML = '';
        const storageArr = Array.isArray(info.storageRequirements) ? info.storageRequirements : [];
        if (storageArr.length) {
            storageArr.forEach(entry => createStorageRequirementRow(entry));
        } else {
            createStorageRequirementRow();
        }
    }
    setVal('deliveryResolution', info.deliveryResolution);
    setMulti('aspectRatio', info.aspectRatio);
    setVal('baseFrameRate', info.baseFrameRate);
    setVal('recordingFrameRate', info.recordingFrameRate);
    setVal('sensorMode', info.sensorMode);
    if (lensSelectionManager && typeof lensSelectionManager.applyInfo === 'function') {
        lensSelectionManager.applyInfo(info || {});
    }
    setMulti('requiredScenarios', info.requiredScenarios);
    setMulti('cameraHandle', info.cameraHandle);
    setVal('viewfinderExtension', info.viewfinderExtension);
    setVal('viewfinderEyeLeatherColor', info.viewfinderEyeLeatherColor);
    setVal('mattebox', info.mattebox);
    setMulti('gimbal', info.gimbal);
    setMulti('viewfinderSettings', info.viewfinderSettings);
    setMulti('frameGuides', info.frameGuides);
    setMulti('aspectMaskOpacity', info.aspectMaskOpacity);
    setMulti('videoDistribution', info.videoDistribution);
    setVal('monitoringConfiguration', info.monitoringConfiguration);
    setMulti('monitorUserButtons', info.monitorUserButtons);
    setMulti('cameraUserButtons', info.cameraUserButtons);
    setMulti('viewfinderUserButtons', info.viewfinderUserButtons);
    setVal('tripodHeadBrand', info.tripodHeadBrand);
    setVal('tripodBowl', info.tripodBowl);
    setMulti('tripodTypes', info.tripodTypes);
    setVal('tripodSpreader', info.tripodSpreader);
    setSliderBowlValue(info.sliderBowl || '');
    setEasyrigValue(info.easyrig || '');
    const filterTokens = parseFilterTokens(info.filter);
    setMulti('filter', filterTokens.map(t => t.type));
    renderFilterDetails(filterTokens);
    filterTokens.forEach(({ type, size, values }) => {
        const sizeSel = document.getElementById(`filter-size-${filterId(type)}`);
        if (sizeSel) sizeSel.value = size;
        const valSel = document.getElementById(`filter-values-${filterId(type)}`);
        if (valSel) {
            const arr = Array.isArray(values) ? values : [];
            Array.from(valSel.options).forEach(opt => {
                opt.selected = arr.includes(opt.value);
            });
        }
    });

    if (projectForm) {
        const rentalInput = projectForm.querySelector('#rentalHouse');
        renderRentalHouseSuggestions(rentalInput);
        updateRentalHouseAssistiveDetails(rentalInput);
    }

    markProjectFormDataDirty();
}

function ensureZoomRemoteSetup(info) {
    if (!info || !info.tripodPreferences || !info.tripodPreferences.includes('Zoom Remote handle')) return;
    let motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    if (!motors.length) return;
    if (motors.length < 2 && motorSelects[1]) {
        let second = motors[0];
        if (/cforce.*rf/i.test(second) && devices.fiz.motors['Arri Cforce Mini']) {
            second = 'Arri Cforce Mini';
        }
        motorSelects[1].value = second;
        motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    }
    const allowed = new Set([
        'Arri Master Grip (single unit)',
        'Arri ZMU-4 (body only, wired)',
        'Tilta Nucleus-M Hand Grip (single)',
        'Tilta Nucleus-M II Handle (single)'
    ]);
    const controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
    if (!controllers.some(c => allowed.has(c))) {
        const brand = detectBrand(motors[0]);
        let ctrl = null;
        if (brand === 'arri') {
            ctrl = 'Arri Master Grip (single unit)';
        } else if (brand === 'tilta') {
            ctrl = 'Tilta Nucleus-M Hand Grip (single)';
        }
        if (ctrl && controllerSelects[0]) {
            controllerSelects[0].value = ctrl;
        }
    }
    if (typeof updateCalculations === 'function') updateCalculations();
    if (typeof saveCurrentSession === 'function') saveCurrentSession();
}

function stripAutoGearContext(name) {
    return (name || '').replace(/\s*\([^)]*\)\s*$/, '').trim();
}

function normalizeAutoGearName(name) {
    return stripAutoGearContext(name).toLowerCase();
}

function normalizeAutoGearNotesKey(value) {
    const base = typeof normalizeAutoGearText === 'function'
        ? normalizeAutoGearText(value, { collapseWhitespace: true })
        : (value == null ? '' : String(value)).trim().replace(/\s+/g, ' ');
    if (!base) {
        return '';
    }
    return base.replace(/^[\s\-–—]+/u, '').trim().toLowerCase();
}

function getAutoGearSpanNotesKey(span) {
    if (!span || !span.dataset) {
        return '';
    }
    const datasetNotes = typeof span.dataset.autoGearNotes === 'string'
        ? span.dataset.autoGearNotes
        : '';
    if (datasetNotes) {
        return normalizeAutoGearNotesKey(datasetNotes);
    }
    const notesNode = span.querySelector('.auto-gear-notes');
    if (!notesNode || typeof notesNode.textContent !== 'string') {
        return '';
    }
    return normalizeAutoGearNotesKey(notesNode.textContent);
}

function matchesAutoGearItem(target, actual) {
    if (!target || !actual) return false;
    const normTarget = normalizeAutoGearName(target);
    const normActual = normalizeAutoGearName(actual);
    if (normTarget === normActual) return true;
    return normTarget === normalizeAutoGearName(actual.replace(/^\d+x\s+/, ''));
}

function isOnboardMonitorRiggingItemName(name) {
    if (typeof name !== 'string') return false;
    const normalizedTarget = normalizeAutoGearName(ONBOARD_MONITOR_RIGGING_ITEM_NAME);
    if (!normalizedTarget) return false;
    return normalizeAutoGearName(name) === normalizedTarget;
}

function isOnboardMonitorRiggingItemEntry(entry) {
    if (!entry || typeof entry !== 'object') return false;
    return isOnboardMonitorRiggingItemName(entry.name);
}

function getOnboardMonitorRiggingRuleLabel() {
    if (typeof texts === 'object' && texts) {
        const localized = texts[currentLang]?.autoGearMonitorLabel;
        if (typeof localized === 'string' && localized.trim()) {
            return localized.trim();
        }
        const fallback = texts.en?.autoGearMonitorLabel;
        if (typeof fallback === 'string' && fallback.trim()) {
            return fallback.trim();
        }
    }
    return 'Onboard monitors';
}

function ensureOnboardMonitorRiggingAutoGearHighlight(table) {
    if (!table || typeof table.querySelectorAll !== 'function') {
        return;
    }
    const target = normalizeAutoGearName(ONBOARD_MONITOR_RIGGING_ITEM_NAME);
    if (!target) return;
    const label = getOnboardMonitorRiggingRuleLabel();
    const fallbackRule = { id: ONBOARD_MONITOR_RIGGING_RULE_ID, label };
    const spans = Array.from(table.querySelectorAll('.gear-item')).filter(span => {
        if (!span) return false;
        const dataName = typeof span.getAttribute === 'function' ? span.getAttribute('data-gear-name') : '';
        const textSource = dataName || span.textContent || '';
        return normalizeAutoGearName(textSource) === target;
    });
    if (!spans.length) {
        return;
    }
    spans.forEach(span => {
        const quantity = Math.max(1, getSpanCount(span));
        if (!span.classList.contains('auto-gear-item')) {
            const normalizedItem = normalizeAutoGearItem({
                id: ONBOARD_MONITOR_RIGGING_ITEM_ID,
                name: ONBOARD_MONITOR_RIGGING_ITEM_NAME,
                category: 'Rigging',
                quantity: quantity,
                contextNotes: [label]
            });
            configureAutoGearSpan(span, normalizedItem, quantity, fallbackRule);
            return;
        }
        appendAutoGearRuleSource(span, fallbackRule);
        applyAutoGearRuleColors(span, fallbackRule);
        const contextMap = getAutoGearSpanContextMap(span);
        if (!contextMap.has(label)) {
            mergeAutoGearSpanContextNotes(span, [label], quantity);
        } else {
            renderAutoGearSpanContextNotes(span);
        }
        refreshAutoGearRuleBadge(span);
    });
}

function getSpanCount(span) {
    if (!span) return 1;
    const text = span.textContent || '';
    const match = text.trim().match(/^(\d+)x\s+/);
    return match ? parseInt(match[1], 10) : 1;
}

function updateSpanCountInPlace(span, newCount) {
    if (!span) return;
    const walker = document.createTreeWalker(span, NodeFilter.SHOW_TEXT, null, false);
    let textNode = null;
    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (/\d+x\s+/i.test(node.textContent)) {
            textNode = node;
            break;
        }
    }
    if (!textNode) {
        span.insertBefore(document.createTextNode(`${newCount}x `), span.firstChild);
        return;
    }
    const value = textNode.textContent || '';
    const match = value.match(/^(\s*)(\d+)x\s+(.*)$/);
    if (match) {
        textNode.textContent = `${match[1]}${newCount}x ${match[3]}`;
    } else {
        textNode.textContent = value.replace(/^(\d+)x\s+/, `${newCount}x `);
    }
}

function cleanupAutoGearCell(cell) {
    if (!cell) return;
    const nodes = Array.from(cell.childNodes);
    let previousWasBreak = true;
    nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
            cell.removeChild(node);
            return;
        }
        if (node.nodeName === 'BR') {
            if (previousWasBreak || !node.nextSibling) {
                cell.removeChild(node);
                return;
            }
            previousWasBreak = true;
        } else {
            previousWasBreak = false;
        }
    });
    while (cell.firstChild && cell.firstChild.nodeName === 'BR') {
        cell.removeChild(cell.firstChild);
    }
    while (cell.lastChild && cell.lastChild.nodeName === 'BR') {
        cell.removeChild(cell.lastChild);
    }
    const textContent = cell.textContent ? cell.textContent.trim() : '';
    if (!textContent && !cell.querySelector('.gear-item')) {
        const row = cell.closest('tr');
        const section = row ? row.closest('tbody') : null;
        if (section && section.classList.contains('auto-gear-category')) {
            section.remove();
        }
    }
}

function analyzeAutoGearSegment(nodes) {
    if (!nodes || !nodes.length) return null;
    const span = nodes.find(node => node.nodeType === 1 && node.classList && node.classList.contains('gear-item'));
    if (span) {
        const name = span.getAttribute('data-gear-name') || (span.textContent || '').replace(/^(\d+)x\s+/, '').trim();
        const count = getSpanCount(span);
        return { span, name, count };
    }
    const wrapper = document.createElement('div');
    nodes.forEach(node => wrapper.appendChild(node.cloneNode(true)));
    let text = wrapper.innerHTML
        .replace(/<select[\s\S]*?<\/select>/gi, '')
        .replace(/<[^>]+>/g, '')
        .trim();
    if (!text) return null;
    const match = text.match(/^(\d+)x\s+/);
    let count = 1;
    if (match) {
        count = parseInt(match[1], 10);
        text = text.slice(match[0].length).trim();
    }
    return { span: null, name: text, count, wrapper };
}

function updateRawSegmentCount(nodes, info, newCount) {
    if (!nodes.length) return;
    let updated = false;
    for (const node of nodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            const value = node.textContent || '';
            if (/\d+x\s+/i.test(value)) {
                node.textContent = value.replace(/^(\s*)(\d+)x\s+/, (match, spaces) => `${spaces}${newCount}x `);
                updated = true;
                break;
            }
            if (value.trim()) {
                node.textContent = `${newCount}x ${value.trim().replace(/^(\d+)x\s+/, '')}`;
                updated = true;
                break;
            }
        } else if (node.nodeType === 1) {
            const child = node.firstChild;
            if (child && child.nodeType === Node.TEXT_NODE && /\d+x\s+/i.test(child.textContent || '')) {
                child.textContent = (child.textContent || '').replace(/^(\s*)(\d+)x\s+/, (match, spaces) => `${spaces}${newCount}x `);
                updated = true;
                break;
            }
        }
    }
    if (!updated) {
        const first = nodes[0];
        const parent = first.parentNode;
        if (parent) {
            parent.insertBefore(document.createTextNode(`${newCount}x ${info.name}`), first);
        }
    }
}

function removeAutoGearItem(cell, item, remainingOverride) {
    if (!cell) return normalizeAutoGearQuantity(item.quantity);
    let remaining = typeof remainingOverride === 'number'
        ? remainingOverride
        : normalizeAutoGearQuantity(item.quantity);
    if (remaining <= 0) return remaining;
    const nodes = Array.from(cell.childNodes);
    if (!nodes.length) return remaining;
    const segments = [];
    let current = [];
    nodes.forEach(node => {
        if (node.nodeName === 'BR') {
            segments.push({ nodes: current, separator: node });
            current = [];
        } else {
            current.push(node);
        }
    });
    segments.push({ nodes: current, separator: null });
    let modified = false;
    segments.forEach(segment => {
        if (!segment.nodes.length || remaining <= 0) return;
        const info = analyzeAutoGearSegment(segment.nodes);
        if (!info || !info.name || !matchesAutoGearItem(item.name, info.name)) return;
        if (info.span) {
            const currentCount = info.count;
            if (currentCount > remaining) {
                updateSpanCountInPlace(info.span, currentCount - remaining);
                remaining = 0;
            } else {
                remaining -= currentCount;
                segment.nodes.forEach(node => node.remove());
            }
            modified = true;
        } else {
            if (info.count > remaining && info.count > 1) {
                updateRawSegmentCount(segment.nodes, info, info.count - remaining);
                remaining = 0;
                modified = true;
            } else {
                remaining -= info.count;
                segment.nodes.forEach(node => node.remove());
                modified = true;
            }
        }
    });
    if (modified) {
        cleanupAutoGearCell(cell);
    }
    return remaining;
}

function getCrewRoleLabelForDisplay(value) {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  const langTexts = texts[currentLang] || texts.en || {};
  const crewRoleLabels = langTexts.crewRoles || texts.en?.crewRoles || {};
  return crewRoleLabels?.[trimmed] || trimmed;
}

function getAutoGearRuleDisplayLabel(rule) {
  if (!rule || typeof rule !== 'object') return '';
  const label = typeof rule.label === 'string' ? rule.label.trim() : '';
  if (label) return label;
  const scenarioList = Array.isArray(rule.scenarios) ? rule.scenarios.filter(Boolean) : [];
  if (scenarioList.length) return scenarioList.join(' + ');
  const cameraList = Array.isArray(rule.camera) ? rule.camera.filter(Boolean) : [];
  if (cameraList.length) return cameraList.join(' + ');
  const monitorList = Array.isArray(rule.monitor) ? rule.monitor.filter(Boolean) : [];
  if (monitorList.length) return monitorList.join(' + ');
  const crewPresentList = Array.isArray(rule.crewPresent) ? rule.crewPresent.filter(Boolean) : [];
  if (crewPresentList.length) {
    return crewPresentList.map(getCrewRoleLabelForDisplay).join(' + ');
  }
  const crewAbsentList = Array.isArray(rule.crewAbsent) ? rule.crewAbsent.filter(Boolean) : [];
  if (crewAbsentList.length) {
    return crewAbsentList.map(getCrewRoleLabelForDisplay).join(' + ');
  }
  const wirelessList = Array.isArray(rule.wireless) ? rule.wireless.filter(Boolean) : [];
  if (wirelessList.length) return wirelessList.join(' + ');
  const motorsList = Array.isArray(rule.motors) ? rule.motors.filter(Boolean) : [];
  if (motorsList.length) return motorsList.join(' + ');
  const controllersList = Array.isArray(rule.controllers) ? rule.controllers.filter(Boolean) : [];
  if (controllersList.length) return controllersList.join(' + ');
  const distanceList = Array.isArray(rule.distance) ? rule.distance.filter(Boolean) : [];
  if (distanceList.length) return distanceList.join(' + ');
  const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
  if (matteboxList.length) return matteboxList.join(' + ');
  const cameraHandleList = Array.isArray(rule.cameraHandle) ? rule.cameraHandle.filter(Boolean) : [];
  if (cameraHandleList.length) return cameraHandleList.join(' + ');
  const viewfinderList = Array.isArray(rule.viewfinderExtension)
    ? rule.viewfinderExtension.filter(Boolean).map(getViewfinderFallbackLabel)
    : [];
  if (viewfinderList.length) return viewfinderList.join(' + ');
  const videoDistributionList = Array.isArray(rule.videoDistribution)
    ? rule.videoDistribution.filter(Boolean).map(getVideoDistributionFallbackLabel)
    : [];
  if (videoDistributionList.length) return videoDistributionList.join(' + ');
  return '';
}

function formatAutoGearRuleTooltip(rule) {
    const langTexts = texts[currentLang] || texts.en || {};
    const unnamedTemplate = langTexts.autoGearRuleTooltipUnnamed
        || texts.en?.autoGearRuleTooltipUnnamed
        || 'Added by automatic gear rule';
    if (!rule || typeof rule !== 'object') return unnamedTemplate;
    const label = getAutoGearRuleDisplayLabel(rule);
    if (label) {
        const namedTemplate = langTexts.autoGearRuleTooltipNamed
            || texts.en?.autoGearRuleTooltipNamed
            || `${unnamedTemplate}: %s`;
        return namedTemplate.replace('%s', label);
    }
    return unnamedTemplate;
}

function extractAutoGearRuleSource(rule) {
    if (!rule || typeof rule !== 'object') return null;
    const id = typeof rule.id === 'string' ? rule.id.trim() : '';
    const label = getAutoGearRuleDisplayLabel(rule);
    if (!id && !label) return null;
    return { id, label };
}

function normalizeAutoGearRuleSourceEntry(entry) {
    if (!entry) return null;
    if (typeof entry === 'string') {
        const trimmed = entry.trim();
        if (!trimmed) return null;
        return { id: '', label: trimmed };
    }
    if (typeof entry !== 'object') return null;
    const id = typeof entry.id === 'string' ? entry.id.trim() : '';
    const label = typeof entry.label === 'string' ? entry.label.trim() : '';
    if (!id && !label) return null;
    return { id, label };
}

function dedupeAutoGearRuleSources(entries) {
    if (!Array.isArray(entries) || !entries.length) return [];
    const seen = new Set();
    const normalized = [];
    entries.forEach(entry => {
        const source = normalizeAutoGearRuleSourceEntry(entry);
        if (!source) return;
        const idKey = source.id ? source.id.toLowerCase() : '';
        const labelKey = source.label ? source.label.toLowerCase() : '';
        const key = idKey ? `id:${idKey}` : (labelKey ? `label:${labelKey}` : '');
        if (!key || seen.has(key)) return;
        seen.add(key);
        normalized.push({ id: source.id, label: source.label });
    });
    return normalized;
}

function formatAutoGearSelectorDisplayValue(type, value) {
    const normalizedValue = typeof value === 'string' ? value : (value == null ? '' : String(value));
    const scope = typeof globalThis !== 'undefined'
        ? globalThis
        : (typeof window !== 'undefined'
            ? window
            : (typeof self !== 'undefined' ? self : {}));
    if (typeof scope.formatAutoGearSelectorValue === 'function') {
        return scope.formatAutoGearSelectorValue(type, normalizedValue);
    }
    if (typeof addArriKNumber === 'function' && (type === 'monitor' || type === 'directorMonitor')) {
        return addArriKNumber(normalizedValue);
    }
    return normalizedValue;
}

function getAutoGearRuleSources(span) {
    if (!span || !span.dataset) return [];
    const dataset = span.dataset;
    const raw = typeof dataset.autoGearRuleSources === 'string' ? dataset.autoGearRuleSources : '';
    let sources = [];
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                sources = dedupeAutoGearRuleSources(parsed);
            }
        } catch (error) {
            console.warn('Failed to parse automatic gear rule metadata', error);
            sources = [];
        }
    }
    if (!sources.length) {
        sources = dedupeAutoGearRuleSources([
            { id: dataset.autoGearRuleId, label: dataset.autoGearRuleLabel },
        ]);
    }
    return sources;
}

function setAutoGearRuleSources(span, entries) {
    if (!span || !span.dataset) return;
    const normalized = dedupeAutoGearRuleSources(entries);
    const dataset = span.dataset;
    if (!normalized.length) {
        delete dataset.autoGearRuleSources;
        delete dataset.autoGearRuleId;
        delete dataset.autoGearRuleLabel;
        return;
    }
    try {
        dataset.autoGearRuleSources = JSON.stringify(normalized);
    } catch (error) {
        console.warn('Failed to serialize automatic gear rule metadata', error);
    }
    const primary = normalized[0];
    if (primary.id) {
        dataset.autoGearRuleId = primary.id;
    } else {
        delete dataset.autoGearRuleId;
    }
    if (primary.label) {
        dataset.autoGearRuleLabel = primary.label;
    } else {
        delete dataset.autoGearRuleLabel;
    }
}

function appendAutoGearRuleSource(span, rule) {
    if (!span || !span.dataset) return;
    const addition = extractAutoGearRuleSource(rule);
    const existing = getAutoGearRuleSources(span);
    if (addition) {
        existing.push(addition);
    }
    setAutoGearRuleSources(span, existing);
}

function buildAutoGearRuleTooltipFromSources(sources) {
    if (!Array.isArray(sources) || !sources.length) return '';
    const labels = sources
        .map(source => {
            if (!source) return '';
            const label = typeof source.label === 'string' ? source.label.trim() : '';
            if (label) return label;
            const id = typeof source.id === 'string' ? source.id.trim() : '';
            return id;
        })
        .filter(Boolean);
    if (!labels.length) return '';
    return formatAutoGearRuleTooltip({ label: labels.join(', ') });
}

function getAutoGearSpanContextMap(span) {
    if (!span || !span.dataset || !span.dataset.autoGearContextCounts) return new Map();
    try {
        const parsed = JSON.parse(span.dataset.autoGearContextCounts);
        if (!parsed || typeof parsed !== 'object') return new Map();
        const map = new Map();
        Object.keys(parsed).forEach(key => {
            const normalizedKey = key && key.trim();
            if (!normalizedKey) return;
            const count = Number(parsed[key]);
            if (!Number.isFinite(count) || count <= 0) return;
            map.set(normalizedKey, count);
        });
        return map;
    } catch (error) {
        return new Map();
    }
}

function saveAutoGearSpanContextMap(span, map) {
    if (!span || !span.dataset) return;
    if (!map || !(map instanceof Map) || map.size === 0) {
        delete span.dataset.autoGearContextCounts;
        return;
    }
    const obj = {};
    map.forEach((value, key) => {
        if (!key) return;
        if (!Number.isFinite(value) || value <= 0) return;
        obj[key] = value;
    });
    const keys = Object.keys(obj);
    if (!keys.length) {
        delete span.dataset.autoGearContextCounts;
    } else {
        span.dataset.autoGearContextCounts = JSON.stringify(obj);
    }
}

const AUTO_GEAR_CONTEXT_SORT_PRIORITY = new Map([
    ['director handheld', 1],
    ['gaffer handheld', 2],
    ['dop handheld', 3],
]);

function setAutoGearSpanContextNotes(span, contexts, quantity) {
    if (!span || !span.dataset) return;
    const map = new Map();
    const baseQty = Math.max(0, Number(quantity) || 0);
    if (Array.isArray(contexts)) {
        contexts.forEach(note => {
            const key = note && note.trim();
            if (!key) return;
            map.set(key, (map.get(key) || 0) + baseQty);
        });
    }
    saveAutoGearSpanContextMap(span, map);
    renderAutoGearSpanContextNotes(span);
}

function mergeAutoGearSpanContextNotes(span, contexts, quantity) {
    if (!span || !span.dataset) {
        renderAutoGearSpanContextNotes(span);
        return;
    }
    if (!Array.isArray(contexts) || !contexts.length) {
        renderAutoGearSpanContextNotes(span);
        return;
    }
    const map = getAutoGearSpanContextMap(span);
    const delta = Math.max(0, Number(quantity) || 0);
    if (delta <= 0) {
        renderAutoGearSpanContextNotes(span);
        return;
    }
    contexts.forEach(note => {
        const key = note && note.trim();
        if (!key) return;
        map.set(key, (map.get(key) || 0) + delta);
    });
    saveAutoGearSpanContextMap(span, map);
    renderAutoGearSpanContextNotes(span);
}

function renderAutoGearSpanContextNotes(span) {
    if (!span) return;
    const map = getAutoGearSpanContextMap(span);
    const entries = Array.from(map.entries())
        .filter(([, count]) => Number.isFinite(count) && count > 0);
    let contextNode = span.querySelector('.auto-gear-context-notes');
    if (entries.length <= 1) {
        if (contextNode) {
            contextNode.remove();
        }
        return;
    }
    const parts = entries
        .sort(([a], [b]) => {
            const pa = AUTO_GEAR_CONTEXT_SORT_PRIORITY.get(a.trim().toLowerCase()) ?? Number.POSITIVE_INFINITY;
            const pb = AUTO_GEAR_CONTEXT_SORT_PRIORITY.get(b.trim().toLowerCase()) ?? Number.POSITIVE_INFINITY;
            if (pa !== pb) return pa - pb;
            return a.localeCompare(b, undefined, { sensitivity: 'base' });
        })
        .map(([note, count]) => `${count}x ${note}`);
    const text = ` (${parts.join(', ')})`;
    if (!contextNode) {
        contextNode = document.createElement('span');
        contextNode.className = 'auto-gear-context-notes';
        const selectorContainer = span.querySelector('.auto-gear-selector-container');
        const notesNode = span.querySelector('.auto-gear-notes');
        const referenceNode = selectorContainer || notesNode;
        if (referenceNode && referenceNode.parentNode === span) {
            span.insertBefore(contextNode, referenceNode);
        } else {
            span.appendChild(contextNode);
        }
    }
    contextNode.textContent = text;
}

function configureAutoGearSpan(span, normalizedItem, quantity, rule) {
    if (!span || !normalizedItem) return;
    const name = normalizedItem.name ? normalizedItem.name.trim() : '';
    if (!name) return;
    const rentalTexts = getGearListRentalToggleTexts();
    const rentalNote = rentalTexts && typeof rentalTexts.noteLabel === 'string'
        ? rentalTexts.noteLabel.trim()
        : '';
    const wasRentalExcluded = (
        (span.classList && span.classList.contains('gear-item-rental-excluded'))
        || span.getAttribute?.('data-rental-excluded') === 'true'
    );
    while (span.firstChild) {
        span.removeChild(span.firstChild);
    }
    span.classList.add('gear-item');
    span.classList.add('auto-gear-item');
    span.setAttribute('data-gear-name', name);
    if (rentalNote) {
        span.setAttribute('data-rental-note', rentalNote);
    } else if (span.removeAttribute) {
        span.removeAttribute('data-rental-note');
    }
    if (span.dataset) {
        delete span.dataset.autoGearContextCounts;
    }
    if (span.dataset) {
        const source = extractAutoGearRuleSource(rule);
        setAutoGearRuleSources(span, source ? [source] : []);
    }
    const tooltipSources = getAutoGearRuleSources(span);
    const tooltip = tooltipSources.length
        ? buildAutoGearRuleTooltipFromSources(tooltipSources)
        : formatAutoGearRuleTooltip(rule);
    if (tooltip) {
        span.title = tooltip;
    } else {
        span.removeAttribute('title');
    }
    const displayName = typeof addArriKNumber === 'function' ? addArriKNumber(name) : name;
    span.appendChild(document.createTextNode(`${quantity}x ${displayName}`));
    if (normalizedItem.screenSize) {
        span.appendChild(document.createTextNode(` - ${normalizedItem.screenSize}`));
    }
    if (span.dataset) {
        if (normalizedItem.ownGearId) {
            span.dataset.autoGearOwnGearId = normalizedItem.ownGearId;
        } else if (Object.prototype.hasOwnProperty.call(span.dataset, 'autoGearOwnGearId')) {
            delete span.dataset.autoGearOwnGearId;
        }
    }
    if (normalizedItem.ownGearId) {
        setGearItemProvider(span, 'user');
    }
    if (Array.isArray(normalizedItem.contextNotes) && normalizedItem.contextNotes.length) {
        setAutoGearSpanContextNotes(span, normalizedItem.contextNotes, quantity);
    } else {
        renderAutoGearSpanContextNotes(span);
    }
    const selectorType = normalizedItem.selectorType || 'none';
    const selectorDefault = normalizedItem.selectorDefault || '';
    const selectorLabel = getAutoGearSelectorLabel(selectorType);
    if (selectorType && selectorType !== 'none') {
        if (normalizedItem.selectorEnabled) {
            const options = getAutoGearSelectorOptions(selectorType, normalizedItem);
            const sanitizedRuleId = rule && rule.id ? rule.id.replace(/[^a-zA-Z0-9_-]/g, '') : 'rule';
            const selectId = `autoGearSelector_${sanitizedRuleId}_${normalizedItem.id}`;
            const select = document.createElement('select');
            select.id = selectId;
            select.className = 'auto-gear-selector';
            select.dataset.autoGearSelectorType = selectorType;
            if (normalizedItem.selectorContext) {
                select.dataset.autoGearSelectorContext = normalizedItem.selectorContext;
            }
            if (selectorLabel) {
                select.setAttribute('aria-label', selectorLabel);
            }
            let normalizedDefaultValue = '';
            options.forEach(optionName => {
                const option = document.createElement('option');
                option.value = optionName;
                option.textContent = formatAutoGearSelectorDisplayValue(selectorType, optionName);
                if (!normalizedDefaultValue && selectorDefault && optionName.toLowerCase() === selectorDefault.toLowerCase()) {
                    normalizedDefaultValue = option.value;
                }
                select.appendChild(option);
            });
            if (selectorDefault && !normalizedDefaultValue) {
                const fallbackOption = document.createElement('option');
                fallbackOption.value = selectorDefault;
                fallbackOption.textContent = formatAutoGearSelectorDisplayValue(selectorType, selectorDefault);
                select.insertBefore(fallbackOption, select.firstChild);
                normalizedDefaultValue = selectorDefault;
            }
            if (normalizedDefaultValue) {
                select.value = normalizedDefaultValue;
            } else if (select.options.length) {
                select.selectedIndex = 0;
            }
            if (!select.options.length) {
                const placeholder = document.createElement('option');
                placeholder.value = '';
                placeholder.textContent = selectorLabel || '';
                placeholder.disabled = true;
                placeholder.selected = true;
                select.appendChild(placeholder);
                select.disabled = true;
            }
            const wrapper = document.createElement('span');
            wrapper.className = 'auto-gear-selector-container';
            wrapper.appendChild(select);
            span.appendChild(document.createTextNode(' - '));
            span.appendChild(wrapper);
        } else if (selectorDefault) {
            const formattedDefault = formatAutoGearSelectorDisplayValue(selectorType, selectorDefault);
            span.appendChild(document.createTextNode(` - ${selectorLabel}: ${formattedDefault}`));
        } else if (selectorLabel) {
            span.appendChild(document.createTextNode(` - ${selectorLabel}`));
        }
    }
    if (span.dataset) {
        if (normalizedItem.notes) {
            span.dataset.autoGearNotes = normalizedItem.notes;
        } else if (Object.prototype.hasOwnProperty.call(span.dataset, 'autoGearNotes')) {
            delete span.dataset.autoGearNotes;
        }
    }
    if (normalizedItem.notes) {
        const delimiter = normalizedItem.notes.trim().toLowerCase().startsWith('incl') ? ' ' : ' – ';
        const notesSpan = document.createElement('span');
        notesSpan.className = 'auto-gear-notes';
        notesSpan.textContent = `${delimiter}${normalizedItem.notes}`;
        span.appendChild(notesSpan);
    }
    setRentalExclusionState(span, wasRentalExcluded);
    applyAutoGearRuleColors(span, rule);
    refreshAutoGearRuleBadge(span);
}

function addAutoGearItem(cell, item, rule) {
    if (!cell) return;
    const normalizedItem = normalizeAutoGearItem(item);
    if (!normalizedItem) return;
    const quantity = normalizeAutoGearQuantity(normalizedItem.quantity);
    if (quantity <= 0) return;
    const name = normalizedItem.name ? normalizedItem.name.trim() : '';
    if (!name) return;
    const spans = Array.from(cell.querySelectorAll('.gear-item'));
    const targetNotesKey = normalizeAutoGearNotesKey(normalizedItem.notes);
    for (const span of spans) {
        const spanName = span.getAttribute('data-gear-name') || (span.textContent || '').replace(/^(\d+)x\s+/, '').trim();
        if (matchesAutoGearItem(name, spanName)) {
            const spanNotesKey = getAutoGearSpanNotesKey(span);
            if (targetNotesKey) {
                if (span.classList.contains('auto-gear-item')) {
                    if (!spanNotesKey || spanNotesKey !== targetNotesKey) {
                        continue;
                    }
                } else if (spanNotesKey && spanNotesKey !== targetNotesKey) {
                    continue;
                }
            } else if (span.classList.contains('auto-gear-item') && spanNotesKey) {
                continue;
            }
            if (span.classList.contains('auto-gear-item')) {
                const newCount = getSpanCount(span) + quantity;
                updateSpanCountInPlace(span, newCount);
                if (Array.isArray(normalizedItem.contextNotes) && normalizedItem.contextNotes.length) {
                    mergeAutoGearSpanContextNotes(span, normalizedItem.contextNotes, quantity);
                } else {
                    renderAutoGearSpanContextNotes(span);
                }
                if (span.dataset) {
                    if (normalizedItem.notes) {
                        span.dataset.autoGearNotes = normalizedItem.notes;
                    } else if (Object.prototype.hasOwnProperty.call(span.dataset, 'autoGearNotes')) {
                        delete span.dataset.autoGearNotes;
                    }
                }
                if (rule && typeof rule === 'object') {
                    appendAutoGearRuleSource(span, rule);
                } else if (span.dataset) {
                    setAutoGearRuleSources(span, getAutoGearRuleSources(span));
                }
                const tooltip = buildAutoGearRuleTooltipFromSources(getAutoGearRuleSources(span));
                if (tooltip) {
                    span.title = tooltip;
                } else {
                    span.removeAttribute('title');
                }
                applyAutoGearRuleColors(span, rule);
                refreshAutoGearRuleBadge(span);
            } else {
                configureAutoGearSpan(span, normalizedItem, quantity, rule);
            }
            return;
        }
    }
    if (cell.childNodes.length) {
        cell.appendChild(document.createElement('br'));
    }
    const span = document.createElement('span');
    configureAutoGearSpan(span, normalizedItem, quantity, rule);
    cell.appendChild(span);
}

function ensureAutoGearCategory(table, category) {
    const rawCategory = category && category.trim() ? category.trim() : '';
    const label = rawCategory || AUTO_GEAR_CUSTOM_CATEGORY;
    const existing = Array.from(table.querySelectorAll('tbody.category-group')).find(body => {
        if (body.dataset) {
            if (Object.prototype.hasOwnProperty.call(body.dataset, 'autoCategory')) {
                return body.dataset.autoCategory === rawCategory;
            }
            if (rawCategory && Object.prototype.hasOwnProperty.call(body.dataset, 'gearTableCategory')) {
                return body.dataset.gearTableCategory === rawCategory;
            }
        }
        const headerCell = body.querySelector('.category-row td');
        if (!headerCell) return false;
        const storedLabel = headerCell.getAttribute('data-gear-category-label') || headerCell.textContent.trim();
        if (rawCategory) {
            return storedLabel === rawCategory;
        }
        return body.classList.contains('auto-gear-category') || storedLabel === label;
    });
    if (existing) {
        const cell = existing.querySelector('tr:not(.category-row) td');
        return cell || null;
    }
    const body = document.createElement('tbody');
    body.className = 'category-group auto-gear-category';
    body.dataset.autoCategory = rawCategory;
    body.dataset.gearTableCategory = rawCategory || label;
    const headerRow = document.createElement('tr');
    headerRow.className = 'category-row';
    const headerCell = document.createElement('td');
    const labelText = rawCategory
        ? rawCategory
        : (texts[currentLang]?.autoGearCustomCategory || texts.en?.autoGearCustomCategory || 'Custom Additions');
    headerCell.setAttribute('data-gear-category-label', labelText);
    headerCell.textContent = labelText;
    headerRow.appendChild(headerCell);
    body.appendChild(headerRow);
    const itemsRow = document.createElement('tr');
    const itemsCell = document.createElement('td');
    itemsRow.appendChild(itemsCell);
    body.appendChild(itemsRow);
    table.appendChild(body);
    return itemsCell;
}

function findAutoGearCategoryCell(table, category) {
    if (!table) return null;
    const rawCategory = category && category.trim() ? category.trim() : '';
    const label = rawCategory || AUTO_GEAR_CUSTOM_CATEGORY;
    const bodies = Array.from(table.querySelectorAll('tbody.category-group'));
    for (const body of bodies) {
        if (body.dataset) {
            if (Object.prototype.hasOwnProperty.call(body.dataset, 'autoCategory')) {
                if (body.dataset.autoCategory === rawCategory) {
                    const cell = body.querySelector('tr:not(.category-row) td');
                    if (cell) return cell;
                }
                continue;
            }
            if (rawCategory && Object.prototype.hasOwnProperty.call(body.dataset, 'gearTableCategory')) {
                if (body.dataset.gearTableCategory === rawCategory) {
                    const cell = body.querySelector('tr:not(.category-row) td');
                    if (cell) return cell;
                }
                continue;
            }
        }
        const headerCell = body.querySelector('.category-row td');
        if (!headerCell) continue;
        const headerLabel = headerCell.getAttribute('data-gear-category-label') || headerCell.textContent.trim();
        if (rawCategory) {
            if (headerLabel === rawCategory) {
                const cell = body.querySelector('tr:not(.category-row) td');
                if (cell) return cell;
            }
        } else if (body.classList.contains('auto-gear-category') || headerLabel === label) {
            const cell = body.querySelector('tr:not(.category-row) td');
            if (cell) return cell;
        }
    }
    return null;
}

function normalizeAutoGearScenarioLogicValue(value) {
    if (typeof value !== 'string') return 'all';
    const normalized = value.trim().toLowerCase();
    if (!normalized) return 'all';
    if (normalized === 'or') return 'any';
    if (normalized === 'and') return 'all';
    if (normalized === 'any') return 'any';
    if (normalized === 'multiplier' || normalized === 'multiply' || normalized === 'multiplied') {
        return 'multiplier';
    }
    return normalized === 'all' ? 'all' : 'all';
}

function normalizeAutoGearScenarioMultiplierValue(value) {
    const num = parseInt(value, 10);
    return Number.isFinite(num) && num > 1 ? num : 1;
}

function computeAutoGearScenarioOutcome(rule, scenarioSet) {
    if (!rule || typeof rule !== 'object') {
        return { active: true, multiplier: 1 };
    }
    const rawList = Array.isArray(rule.scenarios) ? rule.scenarios.filter(Boolean) : [];
    if (!rawList.length) {
        return { active: true, multiplier: 1 };
    }
    const normalizedTargets = rawList
        .map(normalizeAutoGearTriggerValue)
        .filter(Boolean);
    if (!normalizedTargets.length) {
        return { active: false, multiplier: 0 };
    }
    const logic = normalizeAutoGearScenarioLogicValue(rule.scenarioLogic);
    if (logic === 'any') {
        const hasAny = normalizedTargets.some(target => scenarioSet.has(target));
        return { active: hasAny, multiplier: hasAny ? 1 : 0 };
    }
    if (logic === 'multiplier') {
        const requestedPrimary = typeof rule.scenarioPrimary === 'string' ? rule.scenarioPrimary : '';
        const normalizedPrimary = normalizeAutoGearTriggerValue(requestedPrimary);
        let baseTarget = '';
        if (normalizedPrimary && normalizedTargets.includes(normalizedPrimary)) {
            baseTarget = normalizedPrimary;
        } else {
            baseTarget = normalizedTargets[0] || '';
        }
        if (!baseTarget || !scenarioSet.has(baseTarget)) {
            return { active: false, multiplier: 0 };
        }
        const extras = normalizedTargets.filter(target => target !== baseTarget);
        if (!extras.length) {
            return { active: true, multiplier: 1 };
        }
        const extrasSatisfied = extras.every(target => scenarioSet.has(target));
        const multiplier = normalizeAutoGearScenarioMultiplierValue(rule.scenarioMultiplier);
        return { active: true, multiplier: extrasSatisfied ? multiplier : 1 };
    }
    const allPresent = normalizedTargets.every(target => scenarioSet.has(target));
    return { active: allPresent, multiplier: allPresent ? 1 : 0 };
}

function normalizeClampOnDiameterKey(value) {
    if (!Number.isFinite(value)) return '';
    return Number(value).toFixed(3);
}

function formatClampOnDiameterLabel(value) {
    if (!Number.isFinite(value)) return '';
    const rounded = Number(Number(value).toFixed(2));
    if (!Number.isFinite(rounded)) return '';
    return String(rounded);
}

function shouldAugmentClampOnRule(rule) {
    if (!rule || typeof rule !== 'object') return false;
    const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
    if (!matteboxList.length) return false;
    const normalized = matteboxList
        .map(value => normalizeAutoGearTriggerValue(value).replace(/-/g, ' '))
        .filter(Boolean);
    if (!normalized.length) return false;
    return normalized.includes('clamp on');
}

function buildClampOnBackingAdditionsFromInfo(info) {
    const lensNames = normalizeLensSelectionNames(info ? info.lenses : null);
    if (!lensNames.length) return [];
    const lensDb = devices && devices.lenses ? devices.lenses : null;
    if (!lensDb || typeof lensDb !== 'object') return [];
    const normalizedLookup = new Map();
    Object.keys(lensDb).forEach(name => {
        if (typeof name !== 'string' || !name) return;
        const normalized = name.trim().toLowerCase();
        if (normalized && !normalizedLookup.has(normalized)) {
            normalizedLookup.set(normalized, lensDb[name]);
        }
    });
    const diameterMap = new Map();
    lensNames.forEach(selectionName => {
        if (typeof selectionName !== 'string') return;
        const trimmed = selectionName.trim();
        if (!trimmed) return;
        const normalized = trimmed.toLowerCase();
        let lens = Object.prototype.hasOwnProperty.call(lensDb, trimmed) ? lensDb[trimmed] : null;
        if (!lens && normalizedLookup.has(normalized)) {
            lens = normalizedLookup.get(normalized);
        }
        if (!lens || typeof lens !== 'object') return;
        const diameter = Number(lens.frontDiameterMm);
        if (!Number.isFinite(diameter) || diameter <= 0) return;
        const key = normalizeClampOnDiameterKey(diameter);
        if (!key) return;
        if (!diameterMap.has(key)) {
            diameterMap.set(key, { diameter, lenses: [] });
        }
        const entry = diameterMap.get(key);
        if (entry.lenses.indexOf(trimmed) === -1) {
            entry.lenses.push(trimmed);
        }
    });
    if (!diameterMap.size) return [];
    const sorted = Array.from(diameterMap.values()).sort((a, b) => {
        if (a.diameter === b.diameter) return 0;
        return a.diameter < b.diameter ? -1 : 1;
    });
    return sorted.map(({ diameter, lenses }) => {
        const sizeLabel = formatClampOnDiameterLabel(diameter) || String(Number(diameter));
        const item = {
            name: `Mattebox Clamp-On Backing ${sizeLabel}mm`,
            category: 'Matte box + filter',
            quantity: 1,
        };
        if (Array.isArray(lenses) && lenses.length) {
            item.contextNotes = [`Lenses: ${lenses.join(', ')}`];
        }
        return item;
    });
}

function mergeAutoGearAdditions(baseAdditions, extraAdditions) {
    const result = [];
    const seen = new Set();
    const pushUnique = (item) => {
        if (!item || typeof item !== 'object') return;
        const name = typeof item.name === 'string' ? item.name.trim() : '';
        if (!name) return;
        const category = typeof item.category === 'string' ? item.category.trim() : '';
        const key = `${name.toLowerCase()}|${category.toLowerCase()}`;
        if (seen.has(key)) return;
        seen.add(key);
        result.push(item);
    };
    baseAdditions.forEach(pushUnique);
    extraAdditions.forEach(pushUnique);
    return result;
}

function applyAutoGearRulesToTableHtml(tableHtml, info) {
    if (!tableHtml || !autoGearRules.length || typeof document === 'undefined') return tableHtml;
  const scenarios = info && info.requiredScenarios
      ? info.requiredScenarios.split(',').map(s => s.trim()).filter(Boolean)
      : [];
  const normalizedScenarioSet = new Set(
    scenarios
      .map(normalizeAutoGearTriggerValue)
      .filter(Boolean)
  );
  const selectedMattebox = info && typeof info.mattebox === 'string'
      ? info.mattebox.trim()
      : '';
  const normalizedMattebox = normalizeAutoGearTriggerValue(selectedMattebox);
  const cameraHandles = info && typeof info.cameraHandle === 'string'
      ? info.cameraHandle.split(',').map(s => s.trim()).filter(Boolean)
      : [];
  const normalizedCameraHandles = cameraHandles
      .map(normalizeAutoGearTriggerValue)
      .filter(Boolean);
  const cameraHandleSet = new Set(normalizedCameraHandles);
  const rawViewfinderExtension = info && typeof info.viewfinderExtension === 'string'
      ? info.viewfinderExtension.trim()
      : '';
  const hasViewfinderSelection = Boolean(rawViewfinderExtension);
  const normalizedViewfinderExtension = hasViewfinderSelection
      ? normalizeAutoGearTriggerValue(rawViewfinderExtension)
      : '';
  const rawDeliveryResolution = info && typeof info.deliveryResolution === 'string'
      ? info.deliveryResolution.trim()
      : '';
  const normalizedDeliveryResolution = normalizeAutoGearTriggerValue(rawDeliveryResolution);
  let videoDistribution = [];
  if (info && Array.isArray(info.videoDistribution)) {
    videoDistribution = info.videoDistribution;
  } else if (info && typeof info.videoDistribution === 'string') {
    videoDistribution = info.videoDistribution
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }
  const normalizedVideoDistribution = videoDistribution
    .map(normalizeVideoDistributionOptionValue)
    .map(value => (value === '__none__' ? '' : normalizeAutoGearTriggerValue(value)))
    .filter(Boolean);
  const videoDistributionSet = new Set(normalizedVideoDistribution);
  const rawCameraSelection = info && typeof info.cameraSelection === 'string'
      ? info.cameraSelection.trim()
      : '';
  const normalizedCameraSelection = normalizeAutoGearTriggerValue(rawCameraSelection);
  const cameraWeightDataset = devices && devices.cameras ? devices.cameras : null;
  const normalizedCameraWeights = (() => {
    if (!cameraWeightDataset) return null;
    const lookup = {};
    Object.keys(cameraWeightDataset).forEach(name => {
      const entry = cameraWeightDataset[name];
      if (!entry || !Number.isFinite(entry.weight_g)) return;
      const normalizedName = normalizeAutoGearTriggerValue(name);
      if (normalizedName && !Object.prototype.hasOwnProperty.call(lookup, normalizedName)) {
        lookup[normalizedName] = Number(entry.weight_g);
      }
    });
    return lookup;
  })();
  const selectedCameraWeight = (() => {
    if (!cameraWeightDataset) return null;
    const direct = rawCameraSelection && Object.prototype.hasOwnProperty.call(cameraWeightDataset, rawCameraSelection)
      ? cameraWeightDataset[rawCameraSelection]
      : null;
    if (direct && Number.isFinite(direct.weight_g)) {
      return Number(direct.weight_g);
    }
    if (!normalizedCameraSelection || !normalizedCameraWeights) return null;
    if (Object.prototype.hasOwnProperty.call(normalizedCameraWeights, normalizedCameraSelection)) {
      return normalizedCameraWeights[normalizedCameraSelection];
    }
    return null;
  })();
  const rawMonitorSelection = info && typeof info.monitorSelection === 'string'
      ? info.monitorSelection.trim()
      : '';
  const normalizedMonitorSelection = normalizeAutoGearTriggerValue(rawMonitorSelection);
  const ownGearIdSet = (() => {
      if (typeof getAutoGearOwnGearItems !== 'function') return new Set();
      try {
          const items = getAutoGearOwnGearItems();
          return new Set(
              (Array.isArray(items) ? items : [])
                  .map(item => (item && typeof item.id === 'string' ? item.id.trim() : ''))
                  .filter(Boolean),
          );
      } catch (error) {
          void error;
          return new Set();
      }
  })();
  const rawWirelessSelection = info && typeof info.wirelessSelection === 'string'
      ? info.wirelessSelection.trim()
      : '';
  const normalizedWirelessSelection = normalizeAutoGearTriggerValue(rawWirelessSelection);
  const rawTripodHeadBrand = info && typeof info.tripodHeadBrand === 'string'
      ? info.tripodHeadBrand.trim()
      : '';
  const normalizedTripodHeadBrand = normalizeAutoGearTriggerValue(rawTripodHeadBrand);
  const rawTripodBowl = info && typeof info.tripodBowl === 'string'
      ? info.tripodBowl.trim()
      : '';
  const normalizedTripodBowl = normalizeAutoGearTriggerValue(rawTripodBowl);
  const tripodTypeValues = Array.isArray(info?.tripodTypes)
      ? info.tripodTypes
      : typeof info?.tripodTypes === 'string'
        ? info.tripodTypes.split(',').map(s => s.trim()).filter(Boolean)
        : [];
  const normalizedTripodTypesSet = new Set(
    tripodTypeValues
      .map(value => normalizeAutoGearTriggerValue(value))
      .filter(Boolean)
  );
  const rawTripodSpreader = info && typeof info.tripodSpreader === 'string'
      ? info.tripodSpreader.trim()
      : '';
  const normalizedTripodSpreader = normalizeAutoGearTriggerValue(rawTripodSpreader);
  const crewRoleSet = new Set(
    Array.isArray(info?.people)
      ? info.people
          .map(entry => (entry && typeof entry.role === 'string') ? entry.role.trim() : '')
          .filter(Boolean)
          .map(value => normalizeAutoGearTriggerValue(value))
          .filter(Boolean)
      : []
  );
  const rawMotorSelections = [];
  if (info) {
    if (Array.isArray(info.motorSelections)) {
      rawMotorSelections.push(...info.motorSelections);
    }
    if (Array.isArray(info.motors)) {
      rawMotorSelections.push(...info.motors);
    }
  }
  const normalizedMotorSet = new Set(
    rawMotorSelections
      .filter(value => typeof value === 'string')
      .map(value => normalizeAutoGearTriggerValue(value))
      .filter(Boolean)
  );
  const rawControllerSelections = [];
  if (info) {
    if (Array.isArray(info.controllerSelections)) {
      rawControllerSelections.push(...info.controllerSelections);
    }
    if (Array.isArray(info.controllers)) {
      rawControllerSelections.push(...info.controllers);
    }
  }
  const normalizedControllerSet = new Set(
    rawControllerSelections
      .filter(value => typeof value === 'string')
      .map(value => normalizeAutoGearTriggerValue(value))
      .filter(Boolean)
  );
  const parseShootingPeriodDays = entry => {
    if (typeof entry !== 'string') return 0;
    const trimmed = entry.trim();
    if (!trimmed) return 0;
    const parts = trimmed.split(' to ');
    let start = parts[0] ? parts[0].trim() : '';
    let end = parts[1] ? parts[1].trim() : '';
    if (!start && end) start = end;
    if (!end && start) end = start;
    if (!start) return 0;
    const toTimestamp = value => {
      if (!value) return NaN;
      return Date.parse(`${value}T00:00:00Z`);
    };
    const startTime = toTimestamp(start);
    let endTime = toTimestamp(end);
    if (!Number.isFinite(startTime)) return 0;
    if (!Number.isFinite(endTime)) endTime = startTime;
    if (endTime < startTime) return 1;
    const diff = Math.floor((endTime - startTime) / (24 * 60 * 60 * 1000));
    return diff + 1;
  };
  const shootingDayEntries = (() => {
    if (!info) return [];
    if (Array.isArray(info.shootingDays)) return info.shootingDays;
    if (typeof info.shootingDays === 'string') {
      return info.shootingDays
        .split('\n')
        .map(value => value.trim())
        .filter(Boolean);
    }
    return [];
  })();
  const totalShootingDays = shootingDayEntries.reduce(
    (total, entry) => total + parseShootingPeriodDays(entry),
    0,
  );
  const rawDistanceSelection = info && typeof info.distanceSelection === 'string'
      ? info.distanceSelection.trim()
      : '';
  const normalizedDistanceSelection = normalizeAutoGearTriggerValue(rawDistanceSelection);
  if (!scenarios.length) {
    const hasRuleWithoutScenario = autoGearRules.some(rule => {
      const scenarioList = Array.isArray(rule.scenarios)
          ? rule.scenarios.filter(Boolean)
          : [];
            return scenarioList.length === 0;
        });
        if (!hasRuleWithoutScenario) return tableHtml;
    }
    const touchesMatteboxCategory = (rule) => {
        if (!rule || typeof rule !== 'object') return false;
        const lists = [];
        if (Array.isArray(rule.add)) lists.push(rule.add);
        if (Array.isArray(rule.remove)) lists.push(rule.remove);
        return lists.some(entries => entries.some(entry => {
            if (!entry || typeof entry !== 'object') return false;
            const category = typeof entry.category === 'string' ? entry.category.trim().toLowerCase() : '';
            return category === 'matte box + filter';
        }));
    };

    const triggeredEntries = [];
    autoGearRules.forEach(rule => {
        if (!rule) return;
        let multiplier = 1;
        if (rule.always) {
            multiplier = 1;
        } else {
            const scenarioOutcome = computeAutoGearScenarioOutcome(rule, normalizedScenarioSet);
            if (!scenarioOutcome.active) return;
            multiplier = scenarioOutcome.multiplier || 1;
        }
        const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
        if (matteboxList.length) {
          const normalizedTargets = matteboxList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedMattebox) return false;
          if (!normalizedTargets.includes(normalizedMattebox)) return false;
        }
        const cameraList = Array.isArray(rule.camera) ? rule.camera.filter(Boolean) : [];
        const cameraWeightCondition = normalizeAutoGearCameraWeightCondition(rule.cameraWeight);
        if (cameraList.length) {
          const normalizedTargets = cameraList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedCameraSelection) return false;
          if (!normalizedTargets.includes(normalizedCameraSelection)) return false;
        }
        const ownGearConditionList = Array.isArray(rule.ownGear) ? rule.ownGear.filter(Boolean) : [];
        if (ownGearConditionList.length) {
          const normalizedTargets = ownGearConditionList
            .map(value => (typeof value === 'string' ? value.trim() : ''))
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          const logic = normalizeAutoGearConditionLogic(rule.ownGearLogic);
          if (logic === 'none') {
            if (normalizedTargets.some(target => ownGearIdSet.has(target))) return false;
          } else if (logic === 'any' || logic === 'or') {
            if (!normalizedTargets.some(target => ownGearIdSet.has(target))) return false;
          } else {
            if (!normalizedTargets.every(target => ownGearIdSet.has(target))) return false;
          }
        }
        if (cameraWeightCondition) {
          if (!Number.isFinite(selectedCameraWeight)) return false;
          if (!evaluateAutoGearCameraWeightCondition(cameraWeightCondition, selectedCameraWeight)) {
            return false;
          }
        }
        const monitorList = Array.isArray(rule.monitor) ? rule.monitor.filter(Boolean) : [];
        if (monitorList.length) {
          const normalizedTargets = monitorList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedMonitorSelection) return false;
          if (!normalizedTargets.includes(normalizedMonitorSelection)) return false;
        }
        const tripodHeadList = Array.isArray(rule.tripodHeadBrand) ? rule.tripodHeadBrand.filter(Boolean) : [];
        if (tripodHeadList.length) {
          const normalizedTargets = tripodHeadList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedTripodHeadBrand) return false;
          if (!normalizedTargets.includes(normalizedTripodHeadBrand)) return false;
        }
        const tripodBowlList = Array.isArray(rule.tripodBowl) ? rule.tripodBowl.filter(Boolean) : [];
        if (tripodBowlList.length) {
          const normalizedTargets = tripodBowlList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedTripodBowl) return false;
          if (!normalizedTargets.includes(normalizedTripodBowl)) return false;
        }
        const tripodTypesList = Array.isArray(rule.tripodTypes) ? rule.tripodTypes.filter(Boolean) : [];
        if (tripodTypesList.length) {
          const normalizedTargets = tripodTypesList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedTargets.every(target => normalizedTripodTypesSet.has(target))) return false;
        }
        const tripodSpreaderList = Array.isArray(rule.tripodSpreader) ? rule.tripodSpreader.filter(Boolean) : [];
        if (tripodSpreaderList.length) {
          const normalizedTargets = tripodSpreaderList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedTripodSpreader) return false;
          if (!normalizedTargets.includes(normalizedTripodSpreader)) return false;
        }
        const crewPresentList = Array.isArray(rule.crewPresent) ? rule.crewPresent.filter(Boolean) : [];
        if (crewPresentList.length) {
          const normalizedTargets = crewPresentList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedTargets.every(target => crewRoleSet.has(target))) return false;
        }
        const crewAbsentList = Array.isArray(rule.crewAbsent) ? rule.crewAbsent.filter(Boolean) : [];
        if (crewAbsentList.length) {
          const normalizedTargets = crewAbsentList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (normalizedTargets.some(target => crewRoleSet.has(target))) return false;
        }
        const wirelessList = Array.isArray(rule.wireless) ? rule.wireless.filter(Boolean) : [];
        if (wirelessList.length) {
          const normalizedTargets = wirelessList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedWirelessSelection) return false;
          if (!normalizedTargets.includes(normalizedWirelessSelection)) return false;
        }
        const motorsList = Array.isArray(rule.motors) ? rule.motors.filter(Boolean) : [];
        if (motorsList.length) {
          const normalizedTargets = motorsList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          const requiresAnyMotor = normalizedTargets.includes(AUTO_GEAR_ANY_MOTOR_TOKEN_FALLBACK);
          const specificTargets = normalizedTargets.filter(target => target !== AUTO_GEAR_ANY_MOTOR_TOKEN_FALLBACK);
          if (requiresAnyMotor && normalizedMotorSet.size === 0) return false;
          if (specificTargets.length && !specificTargets.every(target => normalizedMotorSet.has(target))) return false;
        }
        const controllersList = Array.isArray(rule.controllers) ? rule.controllers.filter(Boolean) : [];
        if (controllersList.length) {
          const normalizedTargets = controllersList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedTargets.every(target => normalizedControllerSet.has(target))) return false;
        }
        const distanceList = Array.isArray(rule.distance) ? rule.distance.filter(Boolean) : [];
        if (distanceList.length) {
          const normalizedTargets = distanceList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedDistanceSelection) return false;
          if (!normalizedTargets.includes(normalizedDistanceSelection)) return false;
        }
        const shootingCondition = normalizeAutoGearShootingDaysCondition(rule.shootingDays);
        if (shootingCondition && Number.isFinite(shootingCondition.value) && shootingCondition.value > 0) {
          if (shootingCondition.mode === 'minimum') {
            if (totalShootingDays < shootingCondition.value) return false;
          } else if (shootingCondition.mode === 'maximum') {
            if (totalShootingDays > shootingCondition.value) return false;
          } else if (shootingCondition.mode === 'every') {
            const interval = shootingCondition.value;
            const occurrences = interval > 0 ? Math.floor(totalShootingDays / interval) : 0;
            if (occurrences < 1) return false;
            multiplier *= occurrences;
          }
        }
        const cameraHandleList = Array.isArray(rule.cameraHandle) ? rule.cameraHandle.filter(Boolean) : [];
        if (cameraHandleList.length) {
          const normalizedTargets = cameraHandleList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
            if (!normalizedTargets.length) return false;
            if (!normalizedTargets.every(target => cameraHandleSet.has(target))) return false;
        }
        const viewfinderList = Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.filter(Boolean) : [];
        if (viewfinderList.length) {
            const normalizedTargets = viewfinderList
                .map(value => normalizeAutoGearTriggerValue(value))
                .filter(Boolean);
            if (!normalizedTargets.length) return false;
            if (!normalizedViewfinderExtension) return false;
            if (!normalizedTargets.includes(normalizedViewfinderExtension)) return false;
        }
        const deliveryList = Array.isArray(rule.deliveryResolution) ? rule.deliveryResolution.filter(Boolean) : [];
        if (deliveryList.length) {
          const normalizedTargets = deliveryList
            .map(normalizeAutoGearTriggerValue)
            .filter(Boolean);
          if (!normalizedTargets.length) return false;
          if (!normalizedDeliveryResolution) return false;
          if (!normalizedTargets.includes(normalizedDeliveryResolution)) return false;
        }
        const videoDistList = Array.isArray(rule.videoDistribution) ? rule.videoDistribution.filter(Boolean) : [];
        if (videoDistList.length) {
            const normalizedTargets = videoDistList
                .map(value => normalizeVideoDistributionOptionValue(value))
                .map(value => (value === '__none__' ? '' : normalizeAutoGearTriggerValue(value)))
                .filter(Boolean);
            if (!normalizedTargets.length) return false;
            if (!normalizedTargets.every(target => videoDistributionSet.has(target))) return false;
        }
        triggeredEntries.push({ rule, multiplier });
    });
    if (!triggeredEntries.length) return tableHtml;

    if (normalizedMattebox) {
        const filtered = triggeredEntries.filter(({ rule }) => {
            if (!touchesMatteboxCategory(rule)) return true;
            const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
            if (!matteboxList.length) return true;
            const normalizedTargets = matteboxList
                .map(normalizeAutoGearTriggerValue)
                .filter(Boolean);
            if (!normalizedTargets.length) return false;
            return normalizedTargets.includes(normalizedMattebox);
        });
        if (!filtered.length) return tableHtml;
        triggeredEntries.length = 0;
        filtered.forEach(entry => triggeredEntries.push(entry));
    }
    const container = document.createElement('div');
    container.innerHTML = tableHtml;
    const table = container.querySelector('.gear-table');
    if (!table) return tableHtml;
    let monitorRiggingTriggered = false;
    triggeredEntries.forEach(({ rule, multiplier }) => {
        const effectiveMultiplier = Math.max(1, Math.round(Number.isFinite(multiplier) ? multiplier : 1));
        rule.remove.forEach(item => {
            let remaining = normalizeAutoGearQuantity(item.quantity) * effectiveMultiplier;
            if (remaining <= 0) return;
            const primaryCell = findAutoGearCategoryCell(table, item.category);
            if (primaryCell) {
                remaining = removeAutoGearItem(primaryCell, item, remaining);
            }
            if (remaining > 0) {
                const gearCells = Array.from(table.querySelectorAll('tbody.category-group tr:not(.category-row) td'));
                for (const cell of gearCells) {
                    if (cell === primaryCell) continue;
                    remaining = removeAutoGearItem(cell, item, remaining);
                    if (remaining <= 0) break;
                }
            }
        });
        const baseAdditions = Array.isArray(rule.add) ? rule.add.slice() : [];
        let additions = baseAdditions;
        if (shouldAugmentClampOnRule(rule)) {
            const clampBackings = buildClampOnBackingAdditionsFromInfo(info);
            if (clampBackings.length) {
                additions = mergeAutoGearAdditions(baseAdditions, clampBackings);
            }
        }
        additions.forEach(item => {
            const quantity = normalizeAutoGearQuantity(item.quantity) * effectiveMultiplier;
            const scaledItem = quantity === normalizeAutoGearQuantity(item.quantity)
                ? item
                : { ...item, quantity };
            const cell = ensureAutoGearCategory(table, item.category);
            if (cell) addAutoGearItem(cell, scaledItem, rule);
            if (!monitorRiggingTriggered && isOnboardMonitorRiggingItemEntry(item)) {
                monitorRiggingTriggered = true;
            }
        });
    });
    if (monitorRiggingTriggered) {
        ensureOnboardMonitorRiggingAutoGearHighlight(table);
    }
    return container.innerHTML;
}

function formatPhoneHref(phone) {
  if (typeof phone !== 'string') return '';
  const trimmed = phone.trim();
  if (!trimmed) return '';
  const sanitized = trimmed.replace(/[^0-9+*#;,]/g, '');
  return sanitized ? sanitized : '';
}

function formatEmailHref(email) {
  if (typeof email !== 'string') return '';
  const trimmed = email.trim();
  if (!trimmed || !trimmed.includes('@')) return '';
  const normalized = trimmed.replace(/\s+/g, '');
  if (!normalized || !normalized.includes('@')) return '';
  const encoded = encodeURIComponent(normalized);
  return encoded ? encoded.replace(/%40/g, '@') : '';
}

function formatRequirementValue(rawValue) {
  if (rawValue && typeof rawValue === 'object') {
    if (typeof rawValue.__html === 'string' && rawValue.__html) {
      return rawValue.__html;
    }
    if (Array.isArray(rawValue) && rawValue.length) {
      const html = rawValue
        .map(item => (typeof item === 'string' ? escapeHtml(item) : escapeHtml(String(item || ''))))
        .join('<br>');
      if (html) return html;
    }
    if (typeof rawValue.text === 'string' && rawValue.text) {
      return escapeHtml(rawValue.text).replace(/\n/g, '<br>');
    }
  }
  const value = typeof rawValue === 'string'
    ? rawValue
    : rawValue == null
      ? ''
      : String(rawValue);
  return escapeHtml(value).replace(/\n/g, '<br>');
}

function resolveGearListCustomText(key, fallback, replacements) {
  const langEntry = texts?.[currentLang]?.[key];
  const enEntry = texts?.en?.[key];
  const template = typeof langEntry === 'string' && langEntry.trim()
    ? langEntry
    : (typeof enEntry === 'string' && enEntry.trim() ? enEntry : fallback);
  if (!replacements || typeof replacements !== 'object') {
    return template;
  }
  return Object.keys(replacements).reduce((acc, token) => {
    const value = replacements[token];
    const replacement = typeof value === 'string' ? value : String(value ?? '');
    return acc.replace(new RegExp(`\\{${token}\\}`, 'g'), replacement);
  }, template);
}

function getGearListRentalToggleTexts(options = {}) {
  const excludeLabel = resolveGearListCustomText('gearListExcludeRentalToggle', 'Exclude for rental house');
  const includeLabel = resolveGearListCustomText('gearListIncludeRentalToggle', 'Include for rental house');
  const fallbackNote = resolveGearListCustomText('gearListRentalNote', 'Rental house handles this item');
  const noteLabel = resolveRentalProviderNoteLabel({
    fallback: fallbackNote,
    rentalHouse: options && options.rentalHouse ? options.rentalHouse : undefined,
    input: options && options.input ? options.input : undefined,
  });
  return {
    excludeLabel,
    includeLabel,
    noteLabel,
  };
}

function buildRentalToggleMarkup(dataName, labels) {
  const texts = labels || getGearListRentalToggleTexts();
  const offLabel = typeof texts.excludeLabel === 'string' && texts.excludeLabel.trim()
    ? texts.excludeLabel
    : 'Exclude for rental house';
  const onLabel = typeof texts.includeLabel === 'string' && texts.includeLabel.trim()
    ? texts.includeLabel
    : 'Include for rental house';
  const safeOff = escapeHtml(offLabel);
  const safeOn = escapeHtml(onLabel);
  const safeDataName = escapeHtml(dataName || '');
  return `<button type="button" class="gear-rental-toggle" data-gear-rental-toggle="${safeDataName}" data-label-off="${safeOff}" data-label-on="${safeOn}" aria-pressed="false">${safeOff}</button>`;
}

function setRentalExclusionState(element, excluded) {
  if (!element || typeof element !== 'object') {
    return false;
  }
  const shouldExclude = Boolean(excluded);
  const wasExcluded = element.classList?.contains('gear-item-rental-excluded')
    || element.getAttribute?.('data-rental-excluded') === 'true';
  const toggle = element.querySelector?.('.gear-rental-toggle');
  if (shouldExclude) {
    element.classList?.add('gear-item-rental-excluded');
    element.setAttribute?.('data-rental-excluded', 'true');
  } else {
    element.classList?.remove('gear-item-rental-excluded');
    element.removeAttribute?.('data-rental-excluded');
  }
  if (toggle) {
    const offLabel = toggle.getAttribute('data-label-off') || '';
    const onLabel = toggle.getAttribute('data-label-on') || offLabel;
    toggle.setAttribute('aria-pressed', shouldExclude ? 'true' : 'false');
    toggle.textContent = shouldExclude ? (onLabel || offLabel) : offLabel;
  }
  const { noteLabel } = getGearListRentalToggleTexts();
  if (noteLabel && element.getAttribute) {
    if (element.getAttribute('data-rental-note') !== noteLabel) {
      element.setAttribute('data-rental-note', noteLabel);
    }
  } else if (element.removeAttribute) {
    element.removeAttribute('data-rental-note');
  }
  return wasExcluded !== shouldExclude;
}

function applyRentalExclusionsState(state) {
  if (!gearListOutput) return;
  const normalizedState = state && typeof state === 'object' ? state : {};
  const exclusions = new Set();
  Object.entries(normalizedState).forEach(([name, value]) => {
    if (value) {
      exclusions.add(name);
    }
  });
  const spans = gearListOutput.querySelectorAll('.gear-item[data-gear-name]');
  spans.forEach(span => {
    const name = span.getAttribute('data-gear-name');
    setRentalExclusionState(span, exclusions.has(name));
  });
}

function createCustomCategoryKey(label) {
  if (typeof label !== 'string' || !label.trim()) {
    return 'category';
  }
  const normalized = label.trim().toLowerCase();
  const slug = normalized
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
  return slug || 'category';
}

function getCustomItemsContainer(key) {
  if (!gearListOutput || typeof key !== 'string') return null;
  return gearListOutput.querySelector(`.gear-custom-items[data-gear-custom-list="${key}"]`);
}

const CUSTOM_CATEGORY_SUGGESTION_SOURCES = {
  camera: ['cameras'],
  'camera-support': ['accessories.cameraSupport'],
  media: ['media', 'accessories.media', 'accessories.cardReaders'],
  lens: ['lenses'],
  'lens-support': ['accessories.cameraSupport', 'accessories.rigging'],
  'matte-box-filter': ['accessories.matteboxes', 'accessories.filters'],
  'lds-fiz': ['fiz', 'accessories.cables.fiz'],
  'camera-batteries': ['batteries', 'accessories.batteries'],
  'monitoring-batteries': ['batteries', 'accessories.batteries'],
  chargers: ['accessories.chargers'],
  monitoring: ['monitors', 'directorMonitors', 'video', 'videoAssist', 'iosVideo'],
  'monitoring-support': ['accessories.rigging', 'accessories.grip', 'accessories.carts'],
  rigging: ['accessories.rigging', 'accessories.grip'],
  power: ['accessories.power', 'accessories.powerPlates'],
  grip: ['accessories.grip'],
  'carts-and-transportation': ['accessories.carts'],
  miscellaneous: ['accessories.matteboxes', 'accessories.filters', 'accessories.cables'],
  consumables: []
};

function isSuggestionDeviceEntry(entry) {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return false;
  return Object.values(entry).some(val => {
    if (val === null) return true;
    const valueType = typeof val;
    if (valueType === 'string' || valueType === 'number' || valueType === 'boolean') {
      return true;
    }
    if (Array.isArray(val)) {
      return true;
    }
    return false;
  });
}

function collectDeviceSuggestionNames(source) {
  if (!source || typeof source !== 'object') return [];
  const names = [];
  Object.entries(source).forEach(([name, value]) => {
    if (!value || typeof value !== 'object') {
      return;
    }
    if (isSuggestionDeviceEntry(value)) {
      names.push(name);
      return;
    }
    names.push(...collectDeviceSuggestionNames(value));
  });
  return names;
}

function getDeviceSuggestionNamesForPath(path) {
  if (!path || typeof path !== 'string') return [];
  const parts = path.split('.');
  let scope = devices;
  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (!scope || typeof scope !== 'object') {
      return [];
    }
    scope = scope[part];
  }
  if (!scope || typeof scope !== 'object') {
    return [];
  }
  return collectDeviceSuggestionNames(scope);
}

function collectStandardItemSuggestions(categoryKey) {
  if (!gearListOutput || typeof categoryKey !== 'string') return [];
  const group = gearListOutput.querySelector(`.category-group[data-gear-custom-key="${categoryKey}"]`);
  if (!group) return [];
  const names = new Set();
  const addName = raw => {
    if (typeof raw !== 'string') return;
    const trimmed = raw.trim();
    if (!trimmed) return;
    const match = trimmed.match(/^(?:\d+\s*x\s+)?(.+)$/i);
    const normalized = match ? match[1].trim() : trimmed;
    if (!normalized || /^none$/i.test(normalized)) return;
    names.add(normalized);
  };
  group.querySelectorAll('.gear-standard-items .gear-item').forEach(item => {
    const dataName = item.getAttribute('data-gear-name');
    if (dataName) {
      addName(dataName);
    } else {
      addName(item.textContent || '');
    }
  });
  group.querySelectorAll('select option').forEach(option => {
    if (!option || typeof option.value !== 'string') return;
    const value = option.value.trim();
    if (!value) return;
    addName(value);
  });
  return Array.from(names);
}

function getCustomCategorySuggestions(categoryKey, categoryLabel) {
  const key = categoryKey || createCustomCategoryKey(categoryLabel || '');
  const seen = new Set();
  const results = [];
  const paths = CUSTOM_CATEGORY_SUGGESTION_SOURCES[key] || [];
  paths.forEach(path => {
    getDeviceSuggestionNamesForPath(path).forEach(name => {
      if (typeof name !== 'string') return;
      const trimmed = name.trim();
      if (!trimmed || /^none$/i.test(trimmed)) return;
      const normalized = trimmed.toLowerCase();
      if (seen.has(normalized)) return;
      seen.add(normalized);
      results.push(trimmed);
    });
  });
  collectStandardItemSuggestions(key).forEach(name => {
    const trimmed = name.trim();
    if (!trimmed || /^none$/i.test(trimmed)) return;
    const normalized = trimmed.toLowerCase();
    if (seen.has(normalized)) return;
    seen.add(normalized);
    results.push(trimmed);
  });
  const sorter = typeof localeSort === 'function'
    ? localeSort
    : (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' });
  return results.sort(sorter);
}

function ensureCustomCategorySuggestionList(categoryKey, categoryLabel) {
  const container = getCustomItemsContainer(categoryKey);
  if (!container) return null;
  const doc = container.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return null;
  const suggestions = getCustomCategorySuggestions(categoryKey, categoryLabel);
  const existing = container.querySelector(`datalist[data-gear-custom-suggestions="${categoryKey}"]`);
  if (!suggestions.length) {
    if (existing) {
      existing.remove();
    }
    return null;
  }
  const datalistId = `gear-custom-suggestions-${categoryKey}`;
  const optionsHtml = suggestions
    .map(value => `<option value="${escapeHtml(value)}"></option>`)
    .join('');
  let datalist = existing;
  if (!datalist) {
    datalist = doc.createElement('datalist');
    datalist.id = datalistId;
    datalist.setAttribute('data-gear-custom-suggestions', categoryKey);
    container.appendChild(datalist);
  } else if (datalist.id !== datalistId) {
    datalist.id = datalistId;
  }
  if (datalist._lastRenderedOptions !== optionsHtml) {
    datalist.innerHTML = optionsHtml;
    datalist._lastRenderedOptions = optionsHtml;
  }
  return datalistId;
}

function attachCustomItemSuggestions(entry, categoryKey, categoryLabel) {
  if (!entry) return;
  const datalistId = ensureCustomCategorySuggestionList(categoryKey, categoryLabel);
  if (datalistId) {
    entry.setAttribute('data-gear-suggestions', datalistId);
  } else {
    entry.removeAttribute('data-gear-suggestions');
  }
}

function updateCustomItemPreview(entry) {
  if (!entry) return;
  const preview = entry.querySelector('.gear-custom-item-preview');
  if (!preview) return;
  const quantity = (entry.getAttribute('data-gear-quantity') || '').trim();
  const nameAttr = entry.getAttribute('data-gear-label')
    || entry.getAttribute('data-gear-name')
    || '';
  const name = String(nameAttr || '').trim();
  const attributes = (entry.getAttribute('data-gear-attributes') || '').trim();
  const fallback = resolveGearListCustomText('gearListCustomItemPreviewFallback', 'Custom item');
  let display = '';
  if (quantity && name) {
    display = `${quantity}x ${name}`;
  } else if (name) {
    display = name;
  } else if (quantity) {
    display = `${quantity}x ${fallback}`;
  } else {
    display = fallback;
  }
  if (attributes) {
    display += ` (${attributes})`;
  }
  preview.textContent = display;
}

function updateGearItemNoteElement(entry, value) {
  if (!entry) return;
  const noteEl = entry.querySelector('.gear-item-note');
  if (!noteEl) return;
  const doc = noteEl.ownerDocument || (typeof document !== 'undefined' ? document : null);
  const localizedLabel = typeof localGetLocalizedText === 'function'
    ? localGetLocalizedText('gearListNoteLabel')
    : '';
  const noteLabel = typeof localizedLabel === 'string' && localizedLabel.trim()
    ? localizedLabel.trim()
    : 'Note:';
  const raw = typeof value === 'string' ? value : String(value ?? '');
  const trimmed = raw.trim();

  if (trimmed) {
    let labelSpan = noteEl.querySelector('.gear-item-note__label');
    let valueSpan = noteEl.querySelector('.gear-item-note__text');

    if (!labelSpan && doc) {
      labelSpan = doc.createElement('span');
      labelSpan.className = 'gear-item-note__label';
      if (noteEl.firstChild) {
        noteEl.insertBefore(labelSpan, noteEl.firstChild);
      } else {
        noteEl.appendChild(labelSpan);
      }
    }

    if (!valueSpan && doc) {
      valueSpan = doc.createElement('span');
      valueSpan.className = 'gear-item-note__text';
      noteEl.appendChild(valueSpan);
    }

    if (labelSpan && valueSpan) {
      labelSpan.textContent = noteLabel;
      valueSpan.textContent = trimmed;
    } else {
      noteEl.textContent = `${noteLabel} ${trimmed}`;
    }

    noteEl.hidden = false;
    noteEl.removeAttribute('hidden');
    noteEl.setAttribute('aria-label', `${noteLabel} ${trimmed}`.trim());
  } else {
    const labelSpan = noteEl.querySelector('.gear-item-note__label');
    const valueSpan = noteEl.querySelector('.gear-item-note__text');
    if (labelSpan) {
      labelSpan.textContent = '';
    }
    if (valueSpan) {
      valueSpan.textContent = '';
    }
    noteEl.textContent = '';
    noteEl.hidden = true;
    noteEl.setAttribute('hidden', '');
    noteEl.removeAttribute('aria-label');
  }
}

function ensureGearItemNoteSpan(element) {
  if (!element) return null;
  let noteSpan = element.querySelector('.gear-item-note');
  if (noteSpan) {
    return noteSpan;
  }
  const doc = (element.ownerDocument || (typeof document !== 'undefined' ? document : null));
  if (!doc) {
    return null;
  }
  noteSpan = doc.createElement('span');
  noteSpan.className = 'gear-item-note';
  noteSpan.hidden = true;
  const summary = element.classList && element.classList.contains('gear-custom-item')
    ? element.querySelector('.gear-custom-item-summary')
    : null;
  if (summary) {
    summary.appendChild(noteSpan);
  } else {
    const reference = element.querySelector('.gear-custom-item-actions')
      || element.querySelector('.gear-custom-remove-btn')
      || element.querySelector('.gear-item-edit-btn');
    if (reference) {
      element.insertBefore(noteSpan, reference);
    } else {
      element.appendChild(noteSpan);
    }
  }
  return noteSpan;
}

function ensureGearItemExtraIndicator(element) {
  if (!element) return null;
  let indicator = element.querySelector('.gear-item-extra-indicator');
  if (indicator) {
    return indicator;
  }
  const doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) {
    return null;
  }
  indicator = doc.createElement('span');
  indicator.className = 'gear-item-extra-indicator';
  indicator.hidden = true;
  const summary = element.classList && element.classList.contains('gear-custom-item')
    ? element.querySelector('.gear-custom-item-summary')
    : null;
  if (summary) {
    const summaryNote = summary.querySelector('.gear-item-note');
    if (summaryNote) {
      summary.insertBefore(indicator, summaryNote);
    } else {
      summary.appendChild(indicator);
    }
  } else {
    const reference = element.querySelector('.gear-item-note')
      || element.querySelector('.gear-custom-item-actions')
      || element.querySelector('.gear-custom-remove-btn')
      || element.querySelector('.gear-item-edit-btn');
    if (reference) {
      element.insertBefore(indicator, reference);
    } else {
      element.appendChild(indicator);
    }
  }
  return indicator;
}

let cachedCameraCategoryLabelSet = null;

function getCameraCategoryLabelSet() {
  if (cachedCameraCategoryLabelSet && cachedCameraCategoryLabelSet.size) {
    return cachedCameraCategoryLabelSet;
  }
  const labels = new Set();
  ['camera', 'cameras'].forEach(value => labels.add(value));
  if (typeof localGetLocalizedText === 'function') {
    const localized = localGetLocalizedText('category_cameras');
    if (typeof localized === 'string' && localized.trim()) {
      labels.add(localized.trim().toLowerCase());
      labels.add(createCustomCategoryKey(localized));
    }
  }
  const translations = (typeof texts === 'object' && texts) ? texts : null;
  if (translations && typeof Object.keys === 'function') {
    Object.keys(translations).forEach(lang => {
      const entry = translations[lang];
      if (!entry || typeof entry !== 'object') {
        return;
      }
      const label = entry.category_cameras;
      if (typeof label === 'string' && label.trim()) {
        const trimmed = label.trim().toLowerCase();
        labels.add(trimmed);
        labels.add(createCustomCategoryKey(label));
      }
    });
  }
  cachedCameraCategoryLabelSet = labels;
  return labels;
}

function isPrimaryCameraItem(element) {
  if (!element || typeof element.closest !== 'function') {
    return false;
  }
  const group = element.closest('tbody.category-group');
  if (!group) {
    return false;
  }
  const label = (group.getAttribute('data-gear-category-label') || '').trim().toLowerCase();
  const key = (group.getAttribute('data-gear-custom-key') || '').trim().toLowerCase();
  const tableLabel = (group.getAttribute('data-gear-table-category') || '').trim().toLowerCase();
  const candidates = getCameraCategoryLabelSet();
  return (
    (label && candidates.has(label))
    || (key && candidates.has(key))
    || (tableLabel && candidates.has(tableLabel))
  );
}

function getActiveCameraDisplayName() {
  if (typeof cameraSelect === 'undefined' || !cameraSelect) {
    return '';
  }
  const selectedOption = cameraSelect.options && cameraSelect.options[cameraSelect.selectedIndex];
  if (!selectedOption || (selectedOption.value && selectedOption.value === 'None')) {
    return '';
  }
  const label = typeof selectedOption.text === 'string'
    ? selectedOption.text
    : (selectedOption.textContent || '');
  return typeof label === 'string' ? label.trim() : '';
}

function ensureGearItemCameraLinkIndicator(element) {
  if (!element) return null;
  let indicator = element.querySelector('.gear-item-camera-link');
  if (indicator) {
    return indicator;
  }
  const doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) {
    return null;
  }
  const textsForDialog = getGearItemEditTexts();
  indicator = doc.createElement('span');
  indicator.className = 'gear-item-camera-link';
  indicator.hidden = true;
  const icon = doc.createElement('span');
  icon.className = 'gear-item-camera-link__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = 'A';
  indicator.appendChild(icon);
  const assist = doc.createElement('span');
  assist.className = 'visually-hidden';
  assist.setAttribute('data-camera-link-assist', 'true');
  assist.textContent = textsForDialog.cameraLinkBadgeLabel || 'Linked to camera';
  indicator.appendChild(assist);
  const reference = element.querySelector('.gear-item-note')
    || element.querySelector('.gear-item-provider')
    || element.querySelector('.gear-item-extra-indicator')
    || element.querySelector('.gear-item-edit-btn')
    || element.querySelector('.gear-custom-item-actions')
    || element.querySelector('.gear-custom-remove-btn');
  if (reference) {
    element.insertBefore(indicator, reference);
  } else {
    element.appendChild(indicator);
  }
  return indicator;
}

function updateGearItemCameraLinkIndicator(element, active, options = {}) {
  const indicator = ensureGearItemCameraLinkIndicator(element);
  if (!indicator) return;
  if (!active) {
    indicator.hidden = true;
    indicator.setAttribute('hidden', '');
    indicator.classList.remove('gear-item-camera-link--primary');
    return;
  }
  const textsForDialog = getGearItemEditTexts();
  indicator.hidden = false;
  indicator.removeAttribute('hidden');
  indicator.classList.toggle('gear-item-camera-link--primary', Boolean(options.isPrimary));
  const icon = indicator.querySelector('.gear-item-camera-link__icon');
  if (icon) {
    icon.textContent = (options.iconText && options.iconText.trim()) || 'A';
  }
  const assist = indicator.querySelector('[data-camera-link-assist]');
  if (assist) {
    const labelText = options.badgeLabel || textsForDialog.cameraLinkBadgeLabel || 'Linked to camera';
    assist.textContent = labelText;
  }
}

function ensureGearItemTextContainer(element) {
  if (!element) return null;
  let textContainer = element.querySelector('.gear-item-text');
  if (textContainer) {
    return textContainer;
  }
  const doc = (element.ownerDocument || (typeof document !== 'undefined' ? document : null));
  if (!doc) {
    return null;
  }
  textContainer = doc.createElement('span');
  textContainer.className = 'gear-item-text';
  const movableNodes = [];
  element.childNodes.forEach(node => {
    if (!node) return;
      if (node.nodeType === 1) {
      const classList = node.classList;
      if (classList && (
        classList.contains('gear-item-note')
        || classList.contains('gear-item-extra-indicator')
        || classList.contains('gear-item-edit-btn')
        || classList.contains('gear-custom-item-actions')
        || classList.contains('gear-custom-remove-btn')
      )) {
        return;
      }
    }
    movableNodes.push(node);
  });
  const reference = element.querySelector('.gear-item-extra-indicator')
    || element.querySelector('.gear-item-note')
    || element.querySelector('.gear-custom-item-actions')
    || element.querySelector('.gear-custom-remove-btn')
    || element.querySelector('.gear-item-edit-btn');
  movableNodes.forEach(node => {
    textContainer.appendChild(node);
  });
  if (reference) {
    element.insertBefore(textContainer, reference);
  } else {
    element.appendChild(textContainer);
  }
  return textContainer;
}

function parseGearItemDisplayParts(text) {
  const normalized = typeof text === 'string' ? text.trim() : '';
  if (!normalized) {
    return { quantity: '', name: '', attributes: '' };
  }
  let remainder = normalized;
  let quantity = '';
  const quantityMatch = remainder.match(/^(\d+)\s*x\s*(.*)$/i);
  if (quantityMatch) {
    quantity = quantityMatch[1] || '';
    remainder = quantityMatch[2] || '';
  }
  const attributeMatch = remainder.match(/^(.*?)(?:\s*\(([^()]+)\))?$/);
  const name = attributeMatch ? (attributeMatch[1] || '').trim() : remainder.trim();
  const attributes = attributeMatch && attributeMatch[2] ? attributeMatch[2].trim() : '';
  return {
    quantity,
    name,
    attributes,
  };
}

function upgradeLegacyGearItemMarkup(scope) {
  const context = scope || gearListOutput;
  if (!context || typeof context.querySelectorAll !== 'function') {
    return;
  }

  const doc = context.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return;

  const ELEMENT_NODE = typeof Node !== 'undefined' ? Node.ELEMENT_NODE : 1;
  const TEXT_NODE = typeof Node !== 'undefined' ? Node.TEXT_NODE : 3;

  const containers = context.querySelectorAll('.gear-standard-items');
  containers.forEach(container => {
    const nodes = Array.from(container.childNodes);
    nodes.forEach(node => {
      if (!node) return;

      if (node.nodeType === ELEMENT_NODE) {
        const element = node;
        if (element.classList && (element.classList.contains('gear-item') || element.classList.contains('gear-custom-item'))) {
          return;
        }
        if (element.tagName === 'BR') {
          return;
        }
        const textContent = element.textContent ? element.textContent.trim() : '';
        if (!textContent) {
          element.remove();
          return;
        }
        const replacement = doc.createElement('span');
        replacement.className = 'gear-item';
        if (element.attributes && element.attributes.length) {
          Array.from(element.attributes).forEach(attr => {
            if (!attr || attr.name === 'class') return;
            try {
              replacement.setAttribute(attr.name, attr.value);
            } catch (error) {
              void error;
            }
          });
        }
        const parts = parseGearItemDisplayParts(textContent);
        if (parts.name) {
          replacement.setAttribute('data-gear-name', parts.name);
          replacement.setAttribute('data-gear-label', parts.name);
        }
        if (parts.quantity) {
          replacement.setAttribute('data-gear-quantity', parts.quantity);
        }
        if (parts.attributes) {
          replacement.setAttribute('data-gear-attributes', parts.attributes);
        }
        const textSpan = doc.createElement('span');
        textSpan.className = 'gear-item-text';
        textSpan.textContent = textContent;
        const noteSpan = doc.createElement('span');
        noteSpan.className = 'gear-item-note';
        noteSpan.hidden = true;
        replacement.append(textSpan, noteSpan);
        element.replaceWith(replacement);
        return;
      }

      if (node.nodeType === TEXT_NODE) {
        const raw = node.textContent || '';
        const trimmed = raw.trim();
        if (!trimmed) {
          return;
        }
        const replacement = doc.createElement('span');
        replacement.className = 'gear-item';
        const parts = parseGearItemDisplayParts(trimmed);
        if (parts.name) {
          replacement.setAttribute('data-gear-name', parts.name);
          replacement.setAttribute('data-gear-label', parts.name);
        }
        if (parts.quantity) {
          replacement.setAttribute('data-gear-quantity', parts.quantity);
        }
        if (parts.attributes) {
          replacement.setAttribute('data-gear-attributes', parts.attributes);
        }
        const textSpan = doc.createElement('span');
        textSpan.className = 'gear-item-text';
        textSpan.textContent = trimmed;
        const noteSpan = doc.createElement('span');
        noteSpan.className = 'gear-item-note';
        noteSpan.hidden = true;
        replacement.append(textSpan, noteSpan);
        container.insertBefore(replacement, node);
        node.remove();
      }
    });
  });
}

function getGearItemData(element) {
  if (!element) {
    return {
      quantity: '',
      name: '',
      attributes: '',
      note: '',
      rentalExcluded: false,
    };
  }
  const quantityAttr = element.getAttribute('data-gear-quantity') || '';
  const nameAttr = element.getAttribute('data-gear-label')
    || element.getAttribute('data-gear-name')
    || '';
  const attributesAttr = element.getAttribute('data-gear-attributes') || '';
  const noteAttr = element.getAttribute('data-gear-note') || '';
  const providerAttr = element.getAttribute('data-gear-provider') || '';
  const providerLabelAttr = element.getAttribute('data-gear-provider-label') || '';
  const extraAttr = element.getAttribute('data-gear-extra') === 'true';
  const extraStartAttr = element.getAttribute('data-gear-extra-start') || '';
  const extraEndAttr = element.getAttribute('data-gear-extra-end') || '';
  const extraLabelAttr = element.getAttribute('data-gear-extra-label') || '';
  const textContainer = element.querySelector('.gear-item-text');
  const rawText = textContainer ? textContainer.textContent : element.textContent || '';
  const parsed = parseGearItemDisplayParts(rawText);
  const quantity = quantityAttr.trim() || parsed.quantity || '';
  const name = nameAttr.trim() || parsed.name || '';
  const attributes = attributesAttr.trim() || parsed.attributes || '';
  const note = noteAttr.trim();
  const rentalExcluded = element.getAttribute('data-rental-excluded') === 'true'
    || element.classList.contains('gear-item-rental-excluded');
  let providedBy = providerAttr.trim();
  if (!providedBy) {
    providedBy = guessDefaultProvider(name);
  }
  const providerLabel = providerLabelAttr.trim();
  const cameraLinkAttr = element.getAttribute('data-gear-camera-link') || '';
  const cameraLinkLabelAttr = element.getAttribute('data-gear-camera-link-label') || '';
  const cameraItem = isPrimaryCameraItem(element);
  const cameraLinkValue = (cameraLinkAttr && cameraLinkAttr !== 'none') || cameraItem ? 'camera' : '';
  const cameraLinkLabel = cameraLinkLabelAttr.trim() || (cameraItem ? getActiveCameraDisplayName() : '');
  return {
    quantity,
    name,
    attributes,
    note,
    rentalExcluded,
    providedBy,
    providerLabel,
    extra: extraAttr,
    extraStart: extraStartAttr.trim(),
    extraEnd: extraEndAttr.trim(),
    extraLabel: extraLabelAttr.trim(),
    cameraLink: cameraLinkValue,
    cameraLinkLabel: cameraLinkLabel,
  };
}

function getGearItemResetDefaults(element) {
  if (!element) {
    return {
      name: '',
      attributes: '',
    };
  }
  const originalCombined = element.getAttribute('data-gear-original-name')
    || element.getAttribute('data-gear-name')
    || '';
  const parsedOriginal = parseGearItemDisplayParts(originalCombined);
  let originalName = element.getAttribute('data-gear-original-label') || '';
  let originalAttributes = element.getAttribute('data-gear-original-attributes') || '';
  if (!originalName && parsedOriginal.name) {
    originalName = parsedOriginal.name;
  }
  if (!originalAttributes && parsedOriginal.attributes) {
    originalAttributes = parsedOriginal.attributes;
  }
  return {
    name: typeof originalName === 'string' ? originalName.trim() : '',
    attributes: typeof originalAttributes === 'string' ? originalAttributes.trim() : '',
  };
}

function getGearItemExtraTexts() {
  const allTexts = (typeof texts === 'object' && texts) ? texts : {};
  const activeLang = (typeof currentLang === 'string' && allTexts[currentLang])
    ? currentLang
    : 'en';
  const langTexts = allTexts[activeLang] || {};
  const fallbackTexts = allTexts.en || {};
  return {
    indicatorBase: langTexts.gearListExtraIndicatorNoPeriod
      || fallbackTexts.gearListExtraIndicatorNoPeriod
      || 'Temporary extra',
    indicatorRange: langTexts.gearListExtraIndicatorRange
      || fallbackTexts.gearListExtraIndicatorRange
      || 'Temporary extra: %s – %s',
    indicatorStart: langTexts.gearListExtraIndicatorOpen
      || fallbackTexts.gearListExtraIndicatorOpen
      || 'Temporary extra from %s',
    indicatorEnd: langTexts.gearListExtraIndicatorEnd
      || fallbackTexts.gearListExtraIndicatorEnd
      || 'Temporary extra until %s',
  };
}

function getExtraGearUiTexts() {
  const allTexts = (typeof texts === 'object' && texts) ? texts : {};
  const activeLang = (typeof currentLang === 'string' && allTexts[currentLang])
    ? currentLang
    : 'en';
  const langTexts = allTexts[activeLang] || {};
  const fallbackTexts = allTexts.en || {};
  return {
    categoryLabel: langTexts.gearListExtraCategoryLabel
      || fallbackTexts.gearListExtraCategoryLabel
      || 'Temporary Extras',
    addButton: langTexts.addExtraGearBtn
      || fallbackTexts.addExtraGearBtn
      || 'Add temporary extra gear',
    checkboxLabel: langTexts.gearListEditExtraLabel
      || fallbackTexts.gearListEditExtraLabel
      || 'Temporary extra gear',
    checkboxHelp: langTexts.gearListEditExtraHelp
      || fallbackTexts.gearListEditExtraHelp
      || '',
    periodHelp: langTexts.gearListEditExtraPeriodHelp
      || fallbackTexts.gearListEditExtraPeriodHelp
      || '',
    startLabel: langTexts.gearListEditExtraStartLabel
      || fallbackTexts.gearListEditExtraStartLabel
      || 'Needed from',
    endLabel: langTexts.gearListEditExtraEndLabel
      || fallbackTexts.gearListEditExtraEndLabel
      || 'Needed until',
  };
}

function formatExtraDate(value) {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  if (!trimmed) {
    return '';
  }
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    return trimmed;
  }
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(parsed);
  } catch (error) {
    void error;
  }
  return trimmed;
}

function sanitizeExtraPeriod(start, end) {
  const normalizedStart = typeof start === 'string' ? start.trim() : '';
  const normalizedEnd = typeof end === 'string' ? end.trim() : '';
  let resultStart = normalizedStart;
  let resultEnd = normalizedEnd;
  if (normalizedStart && normalizedEnd) {
    const startDate = new Date(normalizedStart);
    const endDate = new Date(normalizedEnd);
    if (!Number.isNaN(startDate.getTime()) && !Number.isNaN(endDate.getTime())) {
      if (startDate.getTime() > endDate.getTime()) {
        resultStart = normalizedEnd;
        resultEnd = normalizedStart;
      }
    }
  }
  return { start: resultStart, end: resultEnd };
}

function formatExtraPeriodLabel(start, end) {
  const textsForExtra = getGearItemExtraTexts();
  const startLabel = formatExtraDate(start);
  const endLabel = formatExtraDate(end);
  if (startLabel && endLabel) {
    return textsForExtra.indicatorRange
      .replace('%s', startLabel)
      .replace('%s', endLabel);
  }
  if (startLabel) {
    return textsForExtra.indicatorStart.replace('%s', startLabel);
  }
  if (endLabel) {
    return textsForExtra.indicatorEnd.replace('%s', endLabel);
  }
  return textsForExtra.indicatorBase;
}

function applyGearItemData(element, data = {}, options = {}) {
  if (!element) return;
  const doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return;
  const isCustomItem = element.classList && element.classList.contains('gear-custom-item');
  const textContainer = isCustomItem
    ? element.querySelector('.gear-item-text')
    : ensureGearItemTextContainer(element);
  ensureGearItemNoteSpan(element);
  if (!textContainer && !isCustomItem) return;
  let trimmedQuantity = typeof data.quantity === 'string'
    ? data.quantity.trim()
    : String(data.quantity ?? '').trim();
  const trimmedName = typeof data.name === 'string'
    ? data.name.trim()
    : String(data.name ?? '').trim();
  const trimmedAttributes = typeof data.attributes === 'string'
    ? data.attributes.trim()
    : String(data.attributes ?? '').trim();
  const trimmedNote = typeof data.note === 'string'
    ? data.note.trim()
    : String(data.note ?? '').trim();
  if (!isCustomItem && !trimmedQuantity) {
    const monitorBatteryControl = element.querySelector('select[data-monitor-battery-key]');
    if (monitorBatteryControl) {
      const batteryTypeAttr = monitorBatteryControl.getAttribute('data-monitor-battery-type')
        || (monitorBatteryControl.dataset ? monitorBatteryControl.dataset.monitorBatteryType : '');
      if (batteryTypeAttr === 'large') {
        trimmedQuantity = '2';
      } else if (batteryTypeAttr) {
        trimmedQuantity = '3';
      }
    }
  }
  if (!isCustomItem && textContainer) {
    const controls = Array.from(textContainer.querySelectorAll('select, input, textarea'));
    controls.forEach(control => {
      if (control && control.parentElement === textContainer) {
        textContainer.removeChild(control);
      }
    });
    while (textContainer.firstChild) {
      textContainer.removeChild(textContainer.firstChild);
    }
    const needsSpaceAfterQuantity = Boolean(trimmedQuantity) && (trimmedName || controls.length || trimmedAttributes);
    if (trimmedQuantity) {
      textContainer.appendChild(doc.createTextNode(`${trimmedQuantity}x${needsSpaceAfterQuantity ? ' ' : ''}`));
    }
    if (trimmedName) {
      textContainer.appendChild(doc.createTextNode(trimmedName));
      if (controls.length || trimmedAttributes) {
        textContainer.appendChild(doc.createTextNode(' '));
      }
    }
    if (!trimmedName && controls.length && trimmedQuantity) {
      textContainer.appendChild(doc.createTextNode(''));
    }
    controls.forEach((control, index) => {
      textContainer.appendChild(control);
      if (index < controls.length - 1) {
        textContainer.appendChild(doc.createTextNode(' '));
      } else if (trimmedAttributes) {
        textContainer.appendChild(doc.createTextNode(' '));
      }
    });
    if (trimmedAttributes) {
      textContainer.appendChild(doc.createTextNode(`(${trimmedAttributes})`));
    }
  }
  if (trimmedQuantity) {
    element.setAttribute('data-gear-quantity', trimmedQuantity);
  } else {
    element.removeAttribute('data-gear-quantity');
  }
  if (trimmedName) {
    element.setAttribute('data-gear-label', trimmedName);
  } else {
    element.removeAttribute('data-gear-label');
  }
  if (trimmedAttributes) {
    element.setAttribute('data-gear-attributes', trimmedAttributes);
  } else {
    element.removeAttribute('data-gear-attributes');
  }
  if (trimmedNote) {
    element.setAttribute('data-gear-note', trimmedNote);
  } else {
    element.removeAttribute('data-gear-note');
  }
  const providerValue = typeof data.providedBy === 'string'
    ? data.providedBy.trim()
    : (element.getAttribute('data-gear-provider') || '');
  const providerLabel = typeof data.providerLabel === 'string'
    ? data.providerLabel.trim()
    : (element.getAttribute('data-gear-provider-label') || '');
  setGearItemProvider(element, providerValue, { label: providerLabel });
  const cameraLinkRaw = typeof data.cameraLink === 'string' ? data.cameraLink.trim() : '';
  const cameraLabelRaw = typeof data.cameraLinkLabel === 'string' ? data.cameraLinkLabel.trim() : '';
  const cameraItem = isPrimaryCameraItem(element);
  const wantsCameraLink = cameraItem || cameraLinkRaw === 'camera';
  const effectiveCameraLabel = cameraLabelRaw || (cameraItem ? getActiveCameraDisplayName() : '');
  if (wantsCameraLink) {
    element.setAttribute('data-gear-camera-link', 'camera');
    if (effectiveCameraLabel) {
      element.setAttribute('data-gear-camera-link-label', effectiveCameraLabel);
    } else {
      element.removeAttribute('data-gear-camera-link-label');
    }
  } else {
    element.removeAttribute('data-gear-camera-link');
    element.removeAttribute('data-gear-camera-link-label');
  }
  if (element.classList) {
    element.classList.toggle('gear-item-camera-linked', wantsCameraLink);
  }
  const badgeTexts = getGearItemEditTexts();
  const badgeBase = badgeTexts.cameraLinkBadgeLabel || 'Linked to camera';
  const badgeLabel = effectiveCameraLabel
    ? `${badgeBase} — ${effectiveCameraLabel}`
    : badgeBase;
  updateGearItemCameraLinkIndicator(element, wantsCameraLink, {
    isPrimary: cameraItem,
    badgeLabel,
  });
  if (!element.getAttribute('data-gear-original-name')) {
    const originalName = element.getAttribute('data-gear-name');
    if (originalName) {
      element.setAttribute('data-gear-original-name', originalName);
      const parsedOriginal = parseGearItemDisplayParts(originalName);
      if (!element.getAttribute('data-gear-original-label') && parsedOriginal.name) {
        element.setAttribute('data-gear-original-label', parsedOriginal.name);
      }
      if (!element.getAttribute('data-gear-original-attributes') && parsedOriginal.attributes) {
        element.setAttribute('data-gear-original-attributes', parsedOriginal.attributes);
      }
    }
  }
  const combinedName = trimmedAttributes
    ? `${trimmedName || ''} (${trimmedAttributes})`.trim()
    : trimmedName;
  if (combinedName) {
    element.setAttribute('data-gear-name', combinedName);
  } else if (trimmedQuantity) {
    element.setAttribute('data-gear-name', `${trimmedQuantity}x`);
  }
  const wantsExtra = Boolean(
    data
    && (
      data.extra === true
      || data.extra === 'true'
      || data.extra === 1
      || data.extra === '1'
    )
  );
  const extraPeriod = wantsExtra
    ? sanitizeExtraPeriod(
        Object.prototype.hasOwnProperty.call(data, 'extraStart') ? data.extraStart : '',
        Object.prototype.hasOwnProperty.call(data, 'extraEnd') ? data.extraEnd : ''
      )
    : { start: '', end: '' };
  const extraTexts = getGearItemExtraTexts();
  const extraLabel = wantsExtra ? formatExtraPeriodLabel(extraPeriod.start, extraPeriod.end) : '';
  const extraIndicator = ensureGearItemExtraIndicator(element);
  if (wantsExtra) {
    element.setAttribute('data-gear-extra', 'true');
    if (extraPeriod.start) {
      element.setAttribute('data-gear-extra-start', extraPeriod.start);
    } else {
      element.removeAttribute('data-gear-extra-start');
    }
    if (extraPeriod.end) {
      element.setAttribute('data-gear-extra-end', extraPeriod.end);
    } else {
      element.removeAttribute('data-gear-extra-end');
    }
    const labelToStore = extraLabel || extraTexts.indicatorBase;
    if (labelToStore) {
      element.setAttribute('data-gear-extra-label', labelToStore);
    } else {
      element.removeAttribute('data-gear-extra-label');
    }
    if (extraIndicator) {
      const indicatorLabel = extraLabel || extraTexts.indicatorBase;
      extraIndicator.textContent = indicatorLabel;
      extraIndicator.hidden = false;
      extraIndicator.removeAttribute('hidden');
      extraIndicator.setAttribute('aria-label', indicatorLabel);
    }
  } else {
    element.removeAttribute('data-gear-extra');
    element.removeAttribute('data-gear-extra-start');
    element.removeAttribute('data-gear-extra-end');
    element.removeAttribute('data-gear-extra-label');
    if (extraIndicator) {
      extraIndicator.textContent = '';
      extraIndicator.hidden = true;
      extraIndicator.setAttribute('hidden', '');
      extraIndicator.removeAttribute('aria-label');
    }
  }
  updateGearItemNoteElement(element, trimmedNote);
  if (isCustomItem && !options.skipPreview) {
    updateCustomItemPreview(element);
  }
  if (typeof data.rentalExcluded === 'boolean') {
    setRentalExclusionState(element, data.rentalExcluded);
  }
}

function migrateLegacyCustomItemEntry(entry) {
  if (!entry || !entry.classList || !entry.classList.contains('gear-custom-item')) {
    return entry;
  }
  const hasLegacyInputs = entry.querySelector('[data-gear-custom-input]');
  if (!hasLegacyInputs) {
    return entry;
  }
  const container = entry.parentElement;
  if (!container) {
    return entry;
  }
  const categoryKey = entry.getAttribute('data-gear-custom-entry') || '';
  const categoryLabel = container.getAttribute('data-gear-custom-category') || '';
  const quantityInput = entry.querySelector('[data-gear-custom-input="quantity"]');
  const nameInput = entry.querySelector('[data-gear-custom-input="name"]');
  const quantity = quantityInput ? String(quantityInput.value ?? '') : '';
  const name = nameInput ? String(nameInput.value ?? '') : '';
  const attributes = entry.getAttribute('data-gear-attributes') || '';
  const note = entry.getAttribute('data-gear-note') || '';
  const rentalExcluded = entry.getAttribute('data-rental-excluded') === 'true';
  const newEntry = buildCustomItemEntryElement(categoryKey, categoryLabel, {
    quantity,
    name,
    attributes,
    note,
  });
  if (!newEntry) {
    return entry;
  }
  container.insertBefore(newEntry, entry.nextSibling);
  entry.remove();
  setRentalExclusionState(newEntry, rentalExcluded);
  attachCustomItemSuggestions(newEntry, categoryKey, categoryLabel);
  return newEntry;
}

function ensureGearItemEditButton(element) {
  if (!element) return null;
  if (element.querySelector('.gear-item-edit-btn')) {
    return element.querySelector('.gear-item-edit-btn');
  }
  const doc = (element.ownerDocument || (typeof document !== 'undefined' ? document : null));
  if (!doc) return null;
  const button = doc.createElement('button');
  button.type = 'button';
  button.className = 'gear-item-edit-btn';
  button.setAttribute('data-gear-edit', '');
  const editTexts = getGearItemEditTexts();
  const editLabel = editTexts.editButtonLabel || '';
  if (editLabel) {
    button.setAttribute('aria-label', editLabel);
    button.setAttribute('title', editLabel);
  }
  const hasIconRegistry = typeof ICON_GLYPHS === 'object' && ICON_GLYPHS;
  const sliderGlyph = hasIconRegistry ? ICON_GLYPHS.sliders : null;
  if (typeof setButtonLabelWithIcon === 'function' && sliderGlyph) {
    setButtonLabelWithIcon(button, '', sliderGlyph);
  } else if (typeof iconMarkup === 'function' && sliderGlyph) {
    button.innerHTML = iconMarkup(sliderGlyph, { className: 'btn-icon' });
  } else if (editLabel) {
    button.textContent = editLabel;
  }
  const noteSpan = element.querySelector('.gear-item-note');
  if (noteSpan) {
    element.insertBefore(button, noteSpan.nextSibling);
  } else {
    element.appendChild(button);
  }
  return button;
}

function enhanceGearItemElement(element) {
  if (!element) return;
  if (element.classList && element.classList.contains('gear-custom-item')) {
    element = migrateLegacyCustomItemEntry(element);
  }
  const isCustom = element.classList && element.classList.contains('gear-custom-item');
  ensureGearItemNoteSpan(element);
  ensureGearItemExtraIndicator(element);
  if (!isCustom) {
    ensureGearItemTextContainer(element);
    ensureGearItemEditButton(element);
  }
  const data = getGearItemData(element);

  if (!data.quantity) {
    const monitorBatteryControl = element.querySelector('select[data-monitor-battery-type]');
    if (monitorBatteryControl) {
      const fallbackQuantity = monitorBatteryControl.getAttribute('data-monitor-battery-type') === 'handheld'
        ? '3'
        : '2';
      data.quantity = fallbackQuantity;
    }
  }
  applyGearItemData(element, data, { skipPreview: !isCustom });
}

function enhanceGearListItems(container) {
  const scope = container || gearListOutput;
  if (!scope || typeof scope.querySelectorAll !== 'function') {
    return;
  }

  upgradeLegacyGearItemMarkup(scope);

  const items = scope.querySelectorAll('.gear-item, .gear-custom-item');
  items.forEach(element => {
    enhanceGearItemElement(element);
  });
  refreshRentalProviderNoteDisplays();
}

function ensureGearListCustomControls(container) {
  const scope = container || gearListOutput;
  if (!scope || typeof scope.querySelectorAll !== 'function') {
    return;
  }
  const doc = scope.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return;

  scope.querySelectorAll('tbody.category-group').forEach(group => {
    const header = group.querySelector('.gear-category-header');
    if (!header) return;
    const labelElement = header.querySelector('.gear-category-label');
    const categoryLabel = labelElement && labelElement.textContent
      ? labelElement.textContent.trim()
      : header.textContent.trim();
    if (!categoryLabel) return;

    let categoryKey = group.getAttribute('data-gear-custom-key');
    if (!categoryKey) {
      categoryKey = createCustomCategoryKey(categoryLabel);
      group.setAttribute('data-gear-custom-key', categoryKey);
    }

    const rows = Array.from(group.querySelectorAll('tr'));
    const bodyRow = rows.find(row => !row.classList.contains('category-row'));
    const bodyCell = bodyRow ? bodyRow.querySelector('td') : null;
    if (!bodyCell) return;

    let customSection = bodyCell.querySelector('.gear-custom-section');
    if (!customSection) {
      customSection = doc.createElement('div');
      customSection.className = 'gear-custom-section';
      bodyCell.appendChild(customSection);
    }
    customSection.setAttribute('data-gear-custom-key', categoryKey);
    customSection.setAttribute('data-gear-custom-category', categoryLabel);

    let itemsContainer = customSection.querySelector('.gear-custom-items');
    if (!itemsContainer) {
      itemsContainer = doc.createElement('div');
      itemsContainer.className = 'gear-custom-items';
      customSection.appendChild(itemsContainer);
    }
    itemsContainer.setAttribute('data-gear-custom-list', categoryKey);
    itemsContainer.setAttribute('data-gear-custom-category', categoryLabel);
    itemsContainer.setAttribute('aria-live', 'polite');

    Array.from(bodyCell.children).forEach(child => {
      if (child === customSection) return;
      if (child.classList && child.classList.contains('gear-custom-item')) {
        itemsContainer.appendChild(child);
      }
    });

    const standardItems = bodyCell.querySelector('.gear-standard-items');
    if (standardItems && standardItems.nextElementSibling !== customSection) {
      standardItems.insertAdjacentElement('afterend', customSection);
    } else if (!standardItems && customSection.parentElement !== bodyCell) {
      bodyCell.appendChild(customSection);
    }

    let addButton = header.querySelector('[data-gear-custom-add]');
    const addLabel = resolveGearListCustomText('gearListAddCustomItem', 'Add custom item');
    const addAria = resolveGearListCustomText('gearListAddCustomItemToCategory', 'Add custom item to {category}', {
      category: categoryLabel,
    });
    if (!addButton) {
      addButton = doc.createElement('button');
      addButton.type = 'button';
      addButton.className = 'gear-custom-add-btn';
      header.appendChild(addButton);
    }
    addButton.setAttribute('data-gear-custom-add', categoryKey);
    addButton.setAttribute('data-gear-custom-category', categoryLabel);
    addButton.setAttribute('aria-label', addAria);
    addButton.setAttribute('title', addLabel);

    const hasIconRegistry = typeof ICON_GLYPHS === 'object' && ICON_GLYPHS;
    const addGlyph = hasIconRegistry && (ICON_GLYPHS.add || ICON_GLYPHS.plus);
    if (typeof setButtonLabelWithIcon === 'function' && hasIconRegistry && addGlyph) {
      setButtonLabelWithIcon(addButton, '', addGlyph);
    } else if (typeof iconMarkup === 'function' && addGlyph) {
      addButton.innerHTML = iconMarkup(addGlyph, { className: 'btn-icon' });
    } else {
      addButton.textContent = '+';
    }
  });
  ensureExtraGearCategory();
}

function ensureExtraGearCategory() {
  if (!gearListOutput) return null;
  const existingContainer = getCustomItemsContainer(EXTRA_GEAR_CATEGORY_KEY);
  if (existingContainer) {
    return existingContainer;
  }
  const table = gearListOutput.querySelector('.gear-table');
  if (!table) return null;
  const doc = table.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return null;
  const textsForExtra = getExtraGearUiTexts();
  const categoryLabel = textsForExtra.categoryLabel || 'Temporary Extras';
  const group = doc.createElement('tbody');
  group.className = 'category-group';
  group.setAttribute('data-gear-custom-key', EXTRA_GEAR_CATEGORY_KEY);
  group.setAttribute('data-gear-table-category', categoryLabel);

  const headerRow = doc.createElement('tr');
  headerRow.className = 'category-row';
  const headerCell = doc.createElement('td');
  headerCell.setAttribute('data-gear-category-label', categoryLabel);
  const header = doc.createElement('div');
  header.className = 'gear-category-header';
  const labelSpan = doc.createElement('span');
  labelSpan.className = 'gear-category-label';
  labelSpan.textContent = categoryLabel;
  header.appendChild(labelSpan);

  const addButton = doc.createElement('button');
  addButton.type = 'button';
  addButton.className = 'gear-custom-add-btn';
  addButton.setAttribute('data-gear-custom-add', EXTRA_GEAR_CATEGORY_KEY);
  addButton.setAttribute('data-gear-custom-category', categoryLabel);
  addButton.setAttribute('data-extra-gear', 'true');
  addButton.setAttribute('aria-label', textsForExtra.addButton);
  addButton.setAttribute('title', textsForExtra.addButton);
  const hasIconRegistry = typeof ICON_GLYPHS === 'object' && ICON_GLYPHS;
  const addGlyph = hasIconRegistry && (ICON_GLYPHS.add || ICON_GLYPHS.plus);
  if (typeof setButtonLabelWithIcon === 'function' && hasIconRegistry && addGlyph) {
    setButtonLabelWithIcon(addButton, '', addGlyph);
  } else if (typeof iconMarkup === 'function' && addGlyph) {
    addButton.innerHTML = iconMarkup(addGlyph, { className: 'btn-icon' });
  } else {
    addButton.textContent = '+';
  }
  header.appendChild(addButton);
  headerCell.appendChild(header);
  headerRow.appendChild(headerCell);
  group.appendChild(headerRow);

  const bodyRow = doc.createElement('tr');
  const bodyCell = doc.createElement('td');
  const customSection = doc.createElement('div');
  customSection.className = 'gear-custom-section';
  customSection.setAttribute('data-gear-custom-key', EXTRA_GEAR_CATEGORY_KEY);
  customSection.setAttribute('data-gear-custom-category', categoryLabel);
  const itemsContainer = doc.createElement('div');
  itemsContainer.className = 'gear-custom-items';
  itemsContainer.setAttribute('data-gear-custom-list', EXTRA_GEAR_CATEGORY_KEY);
  itemsContainer.setAttribute('data-gear-custom-category', categoryLabel);
  itemsContainer.setAttribute('aria-live', 'polite');
  customSection.appendChild(itemsContainer);
  bodyCell.appendChild(customSection);
  bodyRow.appendChild(bodyCell);
  group.appendChild(bodyRow);
  table.appendChild(group);
  return itemsContainer;
}

function buildGearItemEditContext() {
  return {
    dialog: resolveElementById('gearItemEditDialog', 'gearItemEditDialog'),
    form: resolveElementById('gearItemEditForm', 'gearItemEditForm'),
    title: resolveElementById('gearItemEditTitle', 'gearItemEditTitle'),
    preview: resolveElementById('gearItemEditPreview', 'gearItemEditPreview'),
    quantityInput: resolveElementById('gearItemEditQuantity', 'gearItemEditQuantity'),
    quantityLabel: resolveElementById('gearItemEditQuantityLabel', 'gearItemEditQuantityLabel'),
    nameInput: resolveElementById('gearItemEditName', 'gearItemEditName'),
    nameLabel: resolveElementById('gearItemEditNameLabel', 'gearItemEditNameLabel'),
    noteInput: resolveElementById('gearItemEditNote', 'gearItemEditNote'),
    noteLabel: resolveElementById('gearItemEditNoteLabel', 'gearItemEditNoteLabel'),
    extraContainer: resolveElementById('gearItemEditExtraContainer', 'gearItemEditExtraContainer'),
    extraCheckbox: resolveElementById('gearItemEditExtra', 'gearItemEditExtra'),
    extraLabel: resolveElementById('gearItemEditExtraLabel', 'gearItemEditExtraLabel'),
    extraHelp: resolveElementById('gearItemEditExtraHelp', 'gearItemEditExtraHelp'),
    extraPeriodContainer: resolveElementById('gearItemEditExtraPeriod', 'gearItemEditExtraPeriod'),
    extraStartInput: resolveElementById('gearItemEditExtraStart', 'gearItemEditExtraStart'),
    extraStartLabel: resolveElementById('gearItemEditExtraStartLabel', 'gearItemEditExtraStartLabel'),
    extraEndInput: resolveElementById('gearItemEditExtraEnd', 'gearItemEditExtraEnd'),
    extraEndLabel: resolveElementById('gearItemEditExtraEndLabel', 'gearItemEditExtraEndLabel'),
    extraPeriodHelp: resolveElementById('gearItemEditExtraPeriodHelp', 'gearItemEditExtraPeriodHelp'),
    providerSelect: resolveElementById('gearItemEditProvider', 'gearItemEditProvider'),
    providerLabel: resolveElementById('gearItemEditProviderLabel', 'gearItemEditProviderLabel'),
    providerHelp: resolveElementById('gearItemEditProviderHelp', 'gearItemEditProviderHelp'),
    ownedContainer: resolveElementById('gearItemEditOwnedContainer', 'gearItemEditOwnedContainer'),
    ownedCheckbox: resolveElementById('gearItemEditOwned', 'gearItemEditOwned'),
    ownedLabel: resolveElementById('gearItemEditOwnedLabel', 'gearItemEditOwnedLabel'),
    ownedHelp: resolveElementById('gearItemEditOwnedHelp', 'gearItemEditOwnedHelp'),
    cameraLinkContainer: resolveElementById('gearItemEditCameraLinkContainer', 'gearItemEditCameraLinkContainer'),
    cameraLinkSelect: resolveElementById('gearItemEditCameraLink', 'gearItemEditCameraLink'),
    cameraLinkLabel: resolveElementById('gearItemEditCameraLinkLabel', 'gearItemEditCameraLinkLabel'),
    cameraLinkHelp: resolveElementById('gearItemEditCameraLinkHelp', 'gearItemEditCameraLinkHelp'),
    rentalCheckbox: resolveElementById('gearItemEditRental', 'gearItemEditRental'),
    rentalSection: resolveElementById('gearItemEditRentalSection', 'gearItemEditRentalSection'),
    rentalLabel: resolveElementById('gearItemEditRentalLabel', 'gearItemEditRentalLabel'),
    rentalDescription: resolveElementById('gearItemEditRentalDescription', 'gearItemEditRentalDescription'),
    cancelButton: resolveElementById('gearItemEditCancel', 'gearItemEditCancel'),
    saveButton: resolveElementById('gearItemEditSave', 'gearItemEditSave'),
    resetButton: resolveElementById('gearItemEditReset', 'gearItemEditReset'),
    resetDefaults: null,
    currentAttributes: '',
    currentOwnedEntryId: '',
    currentCameraLinkValue: '',
    isCameraItem: false,
  };
}

let cachedGearItemEditContext = null;

function getGearItemEditContext(scope) {
  if (scope && typeof scope === 'object' && scope.context && typeof scope.context === 'object') {
    return scope.context;
  }
  if (!cachedGearItemEditContext) {
    cachedGearItemEditContext = buildGearItemEditContext();
  }
  return cachedGearItemEditContext;
}

function getGearItemEditTexts() {
  const langTexts = (typeof texts === 'object' && texts) ? (texts[currentLang] || texts.en || {}) : {};
  const fallbackTexts = texts && texts.en ? texts.en : {};
  return {
    dialogTitle: langTexts.gearListEditDialogTitle || fallbackTexts.gearListEditDialogTitle || 'Edit gear item',
    quantityLabel: langTexts.gearListEditQuantityLabel || fallbackTexts.gearListEditQuantityLabel || 'Quantity',
    nameLabel: langTexts.gearListEditNameLabel || fallbackTexts.gearListEditNameLabel || 'Item name',
    noteLabel: langTexts.gearListEditNoteLabel || fallbackTexts.gearListEditNoteLabel || 'Note',
    extraLabel: langTexts.gearListEditExtraLabel || fallbackTexts.gearListEditExtraLabel || 'Temporary extra gear',
    extraHelp: langTexts.gearListEditExtraHelp || fallbackTexts.gearListEditExtraHelp || '',
    extraStartLabel: langTexts.gearListEditExtraStartLabel || fallbackTexts.gearListEditExtraStartLabel || 'Needed from',
    extraEndLabel: langTexts.gearListEditExtraEndLabel || fallbackTexts.gearListEditExtraEndLabel || 'Needed until',
    extraPeriodHelp: langTexts.gearListEditExtraPeriodHelp || fallbackTexts.gearListEditExtraPeriodHelp || '',
    providerLabel: langTexts.gearListEditProviderLabel || fallbackTexts.gearListEditProviderLabel || 'Provided by',
    providerHelp: langTexts.gearListEditProviderHelp || fallbackTexts.gearListEditProviderHelp || '',
    providerRental: langTexts.gearListProviderRental || fallbackTexts.gearListProviderRental || 'Rental house',
    providerUser: langTexts.gearListProviderUser || fallbackTexts.gearListProviderUser || 'User',
    providerCrewHeading: langTexts.gearListProviderCrewHeading || fallbackTexts.gearListProviderCrewHeading || 'Crew',
    providerUnknown: langTexts.gearListProviderUnknown || fallbackTexts.gearListProviderUnknown || 'Custom provider',
    ownedLabel: langTexts.gearListEditOwnedLabel || fallbackTexts.gearListEditOwnedLabel || 'Owned',
    ownedHelp: langTexts.gearListEditOwnedHelp || fallbackTexts.gearListEditOwnedHelp || '',
    cameraLinkLabel: langTexts.gearListEditCameraLinkLabel || fallbackTexts.gearListEditCameraLinkLabel || 'Camera link',
    cameraLinkHelp: langTexts.gearListEditCameraLinkHelp || fallbackTexts.gearListEditCameraLinkHelp || '',
    cameraLinkNoneOption: langTexts.gearListEditCameraLinkNoneOption || fallbackTexts.gearListEditCameraLinkNoneOption || 'No camera link',
    cameraLinkCameraOption: langTexts.gearListEditCameraLinkCameraOption || fallbackTexts.gearListEditCameraLinkCameraOption || 'Link to camera (%s)',
    cameraLinkUnavailableOption: langTexts.gearListEditCameraLinkUnavailableOption || fallbackTexts.gearListEditCameraLinkUnavailableOption || 'Link to camera',
    cameraLinkBadgeLabel: langTexts.gearListCameraLinkBadgeLabel || fallbackTexts.gearListCameraLinkBadgeLabel || 'Linked to camera',
    rentalLabel: langTexts.gearListEditRentalLabel || fallbackTexts.gearListEditRentalLabel || 'Exclude from rental house',
    rentalNote: resolveRentalProviderNoteLabel({
      fallback: langTexts.gearListRentalNote || fallbackTexts.gearListRentalNote || 'Rental house handles this item',
    }),
    saveLabel: langTexts.gearListEditSave || fallbackTexts.gearListEditSave || 'Save',
    cancelLabel: langTexts.gearListEditCancel || fallbackTexts.gearListEditCancel || 'Cancel',
    editButtonLabel: langTexts.gearListEditButton || fallbackTexts.gearListEditButton || 'Edit gear item',
    resetLabel: langTexts.gearListEditReset || fallbackTexts.gearListEditReset || 'Reset name',
  };
}

function applyGearItemEditDialogTexts(context) {
  if (!context) return;
  const textsForDialog = getGearItemEditTexts();
  if (context.title) {
    context.title.textContent = textsForDialog.dialogTitle;
  }
  if (context.preview) {
    context.preview.textContent = '';
    context.preview.hidden = true;
  }
  if (context.quantityLabel) {
    context.quantityLabel.textContent = textsForDialog.quantityLabel;
  }
  if (context.nameLabel) {
    context.nameLabel.textContent = textsForDialog.nameLabel;
  }
  if (context.noteLabel) {
    context.noteLabel.textContent = textsForDialog.noteLabel;
  }
  if (context.extraLabel) {
    const labelSpan = context.extraLabel.querySelector('span');
    if (labelSpan) {
      labelSpan.textContent = textsForDialog.extraLabel;
    } else {
      context.extraLabel.textContent = textsForDialog.extraLabel;
    }
  }
  if (context.extraCheckbox) {
    context.extraCheckbox.setAttribute('aria-label', textsForDialog.extraLabel);
  }
  if (context.extraHelp) {
    if (textsForDialog.extraHelp) {
      context.extraHelp.textContent = textsForDialog.extraHelp;
      context.extraHelp.hidden = false;
      context.extraHelp.removeAttribute('hidden');
    } else {
      context.extraHelp.textContent = '';
      context.extraHelp.hidden = true;
      context.extraHelp.setAttribute('hidden', '');
    }
  }
  if (context.extraStartLabel) {
    context.extraStartLabel.textContent = textsForDialog.extraStartLabel;
  }
  if (context.extraEndLabel) {
    context.extraEndLabel.textContent = textsForDialog.extraEndLabel;
  }
  if (context.extraPeriodHelp) {
    if (textsForDialog.extraPeriodHelp) {
      context.extraPeriodHelp.textContent = textsForDialog.extraPeriodHelp;
      context.extraPeriodHelp.hidden = false;
      context.extraPeriodHelp.removeAttribute('hidden');
    } else {
      context.extraPeriodHelp.textContent = '';
      context.extraPeriodHelp.hidden = true;
      context.extraPeriodHelp.setAttribute('hidden', '');
    }
  }
  if (context.providerLabel) {
    context.providerLabel.textContent = textsForDialog.providerLabel;
  }
  if (context.providerHelp) {
    context.providerHelp.textContent = textsForDialog.providerHelp || '';
    context.providerHelp.hidden = !context.providerHelp.textContent;
  }
  if (context.providerSelect) {
    if (context.providerHelp && context.providerHelp.textContent) {
      context.providerSelect.setAttribute('aria-describedby', context.providerHelp.id);
    } else {
      context.providerSelect.removeAttribute('aria-describedby');
    }
    context.providerSelect.setAttribute('aria-label', textsForDialog.providerLabel);
  }
  if (context.cameraLinkLabel) {
    context.cameraLinkLabel.textContent = textsForDialog.cameraLinkLabel;
  }
  if (context.cameraLinkHelp) {
    const cameraHelp = textsForDialog.cameraLinkHelp || '';
    context.cameraLinkHelp.textContent = cameraHelp;
    if (cameraHelp) {
      context.cameraLinkHelp.hidden = false;
      context.cameraLinkHelp.removeAttribute('hidden');
    } else {
      context.cameraLinkHelp.hidden = true;
      context.cameraLinkHelp.setAttribute('hidden', '');
    }
  }
  if (context.cameraLinkSelect) {
    if (context.cameraLinkHelp && context.cameraLinkHelp.textContent) {
      context.cameraLinkSelect.setAttribute('aria-describedby', context.cameraLinkHelp.id);
    } else {
      context.cameraLinkSelect.removeAttribute('aria-describedby');
    }
    context.cameraLinkSelect.setAttribute('aria-label', textsForDialog.cameraLinkLabel);
  }
  if (context.ownedLabel) {
    const ownedLabelSpan = context.ownedLabel.querySelector('span');
    if (ownedLabelSpan) {
      ownedLabelSpan.textContent = textsForDialog.ownedLabel;
    }
  }
  if (context.ownedHelp) {
    const helpText = textsForDialog.ownedHelp || '';
    context.ownedHelp.textContent = helpText;
    context.ownedHelp.hidden = !helpText;
  }
  if (context.ownedCheckbox) {
    context.ownedCheckbox.setAttribute('aria-label', textsForDialog.ownedLabel);
    if (context.ownedHelp && context.ownedHelp.textContent && !context.ownedHelp.hidden) {
      context.ownedCheckbox.setAttribute('aria-describedby', context.ownedHelp.id);
    } else {
      context.ownedCheckbox.removeAttribute('aria-describedby');
    }
  }
  const rentalTexts = getGearListRentalToggleTexts();
  const baseToggleLabel = rentalTexts.excludeLabel || textsForDialog.rentalLabel;
  const rentalNote = textsForDialog.rentalNote || rentalTexts.noteLabel || '';
  if (context.rentalLabel) {
    context.rentalLabel.textContent = baseToggleLabel;
  }
  if (context.rentalCheckbox) {
    context.rentalCheckbox.setAttribute('aria-label', textsForDialog.rentalLabel);
  }
  if (context.resetButton) {
    const resetLabel = textsForDialog.resetLabel;
    context.resetButton.setAttribute('aria-label', resetLabel);
    context.resetButton.title = resetLabel;
    if (typeof setButtonLabelWithIcon === 'function' && typeof ICON_GLYPHS === 'object' && ICON_GLYPHS) {
      const resetGlyph = ICON_GLYPHS.reload || ICON_GLYPHS.save;
      setButtonLabelWithIcon(context.resetButton, resetLabel, resetGlyph);
    } else {
      context.resetButton.textContent = resetLabel;
    }
  }
  if (context.rentalDescription) {
    context.rentalDescription.textContent = rentalNote;
    context.rentalDescription.hidden = !rentalNote;
  }
  if (context.rentalCheckbox) {
    if (context.rentalDescription && context.rentalDescription.textContent) {
      context.rentalCheckbox.setAttribute('aria-describedby', context.rentalDescription.id);
    } else {
      context.rentalCheckbox.removeAttribute('aria-describedby');
    }
  }
  if (context.cancelButton) {
    const cancelLabel = textsForDialog.cancelLabel;
    context.cancelButton.setAttribute('aria-label', cancelLabel);
    if (typeof setButtonLabelWithIcon === 'function' && typeof ICON_GLYPHS === 'object' && ICON_GLYPHS) {
      setButtonLabelWithIcon(context.cancelButton, cancelLabel, ICON_GLYPHS.circleX || ICON_GLYPHS.minus);
    } else {
      context.cancelButton.textContent = cancelLabel;
    }
  }
  if (context.saveButton) {
    const saveLabel = textsForDialog.saveLabel;
    if (typeof setButtonLabelWithIcon === 'function' && typeof ICON_GLYPHS === 'object' && ICON_GLYPHS) {
      setButtonLabelWithIcon(context.saveButton, saveLabel, ICON_GLYPHS.save);
    } else {
      context.saveButton.textContent = saveLabel;
    }
  }
}

function computeGearItemEditPreviewText(context) {
  if (!context) return '';
  const quantity = context.quantityInput ? context.quantityInput.value.trim() : '';
  const name = context.nameInput ? context.nameInput.value.trim() : '';
  const attributes = context.attributesInput
    ? context.attributesInput.value.trim()
    : (typeof context.currentAttributes === 'string' ? context.currentAttributes.trim() : '');
  const segments = [];
  if (quantity) {
    segments.push(`${quantity}x`);
  }
  if (name) {
    segments.push(name);
  }
  let preview = segments.join(' ').trim();
  if (attributes) {
    preview = preview ? `${preview} (${attributes})` : `(${attributes})`;
  }
  return preview.trim();
}

function updateGearItemEditPreview(context) {
  if (!context) return '';
  const previewText = computeGearItemEditPreviewText(context);
  if (context.preview) {
    context.preview.textContent = previewText;
    context.preview.hidden = !previewText;
  }
  return previewText;
}

function updateGearItemEditExtraControls(context, active) {
  if (!context) return;
  const enabled = Boolean(active);
  if (context.extraPeriodContainer) {
    if (enabled) {
      context.extraPeriodContainer.hidden = false;
      context.extraPeriodContainer.removeAttribute('hidden');
    } else {
      context.extraPeriodContainer.hidden = true;
      context.extraPeriodContainer.setAttribute('hidden', '');
    }
  }
  if (context.extraStartInput) {
    context.extraStartInput.disabled = !enabled;
    if (!enabled) {
      context.extraStartInput.setAttribute('aria-disabled', 'true');
    } else {
      context.extraStartInput.removeAttribute('aria-disabled');
    }
  }
  if (context.extraEndInput) {
    context.extraEndInput.disabled = !enabled;
    if (!enabled) {
      context.extraEndInput.setAttribute('aria-disabled', 'true');
    } else {
      context.extraEndInput.removeAttribute('aria-disabled');
    }
  }
}

function updateGearItemEditResetState(context) {
  if (!context || !context.resetButton) {
    return;
  }
  const defaults = context.resetDefaults || { name: '', attributes: '' };
  const targetEntry = activeGearItemEditTarget && activeGearItemEditTarget.element;
  const hasStoredOriginal = Boolean(targetEntry && targetEntry.hasAttribute('data-gear-original-name'));
  const defaultName = typeof defaults.name === 'string' ? defaults.name.trim() : '';
  const defaultAttributes = typeof defaults.attributes === 'string' ? defaults.attributes.trim() : '';
  const currentName = context.nameInput ? context.nameInput.value.trim() : '';
  const currentAttributes = context.attributesInput
    ? context.attributesInput.value.trim()
    : (typeof context.currentAttributes === 'string' ? context.currentAttributes.trim() : '');
  const hasDefaults = hasStoredOriginal || Boolean(
    defaultName
    || defaultAttributes
    || currentAttributes
  );
  const matchesDefaults = currentName === defaultName && currentAttributes === defaultAttributes;
  const shouldDisable = !hasDefaults || matchesDefaults;
  context.resetButton.disabled = shouldDisable;
  context.resetButton.setAttribute('aria-disabled', shouldDisable ? 'true' : 'false');
}

function updateGearItemEditRentalControls(context, excluded, allowRentalToggle) {
  if (!context) return;
  const shouldExclude = Boolean(excluded);
  const canToggle = Boolean(allowRentalToggle);
  if (context.rentalCheckbox) {
    context.rentalCheckbox.checked = shouldExclude;
    context.rentalCheckbox.disabled = !canToggle;
    if (canToggle) {
      context.rentalCheckbox.removeAttribute('aria-disabled');
    } else {
      context.rentalCheckbox.setAttribute('aria-disabled', 'true');
    }
  }
  if (context.rentalSection) {
    context.rentalSection.hidden = !canToggle;
  }
  if (context.rentalDescription) {
    context.rentalDescription.hidden = !context.rentalDescription.textContent;
  }
}

function handleGearItemEditFieldInput() {
  const context = getGearItemEditContext();
  if (!context) return;
  if (context.extraCheckbox) {
    updateGearItemEditExtraControls(context, context.extraCheckbox.checked);
  }
  const previewText = updateGearItemEditPreview(context);
  const textsForDialog = getGearItemEditTexts();
  if (context.title) {
    context.title.textContent = previewText
      ? `${textsForDialog.dialogTitle} — ${previewText}`
      : textsForDialog.dialogTitle;
  }
  if (context.ownedCheckbox) {
    const hasName = Boolean(context.nameInput && context.nameInput.value.trim());
    context.ownedCheckbox.disabled = !hasName;
    if (context.ownedCheckbox.disabled) {
      context.ownedCheckbox.setAttribute('aria-disabled', 'true');
      context.ownedCheckbox.checked = false;
    } else {
      context.ownedCheckbox.removeAttribute('aria-disabled');
    }
  }
  updateGearItemEditResetState(context);
}

function handleGearItemEditRentalCheckboxChange() {
  const context = getGearItemEditContext();
  if (!context) return;
  const allowToggle = context.rentalCheckbox ? !context.rentalCheckbox.disabled : true;
  const nextState = context.rentalCheckbox ? context.rentalCheckbox.checked : false;
  updateGearItemEditRentalControls(context, nextState, allowToggle);
}

function handleGearItemEditOwnedChange() {
  const context = getGearItemEditContext();
  if (!context || !context.ownedCheckbox) {
    return;
  }
  const hasName = Boolean(context.nameInput && context.nameInput.value.trim());
  if (!hasName) {
    context.ownedCheckbox.checked = false;
    context.ownedCheckbox.disabled = true;
    context.ownedCheckbox.setAttribute('aria-disabled', 'true');
    return;
  }
  context.ownedCheckbox.disabled = false;
  context.ownedCheckbox.removeAttribute('aria-disabled');
  if (context.providerSelect) {
    if (context.ownedCheckbox.checked) {
      if (!context.providerSelect.value || context.providerSelect.value === 'rental-house') {
        context.providerSelect.value = 'user';
      }
    } else if (context.providerSelect.value === 'user') {
      context.providerSelect.value = 'rental-house';
    }
  }
}

function handleGearItemEditExtraChange() {
  const context = getGearItemEditContext();
  if (!context || !context.extraCheckbox) {
    return;
  }
  updateGearItemEditExtraControls(context, context.extraCheckbox.checked);
  handleGearItemEditFieldInput();
}

function handleGearItemEditResetClick(event) {
  if (event) {
    event.preventDefault();
  }
  const context = getGearItemEditContext();
  if (!context || !context.resetButton || context.resetButton.disabled) {
    return;
  }
  const defaults = context.resetDefaults || { name: '', attributes: '' };
  if (context.nameInput) {
    context.nameInput.value = defaults.name || '';
  }
  if (context.attributesInput) {
    context.attributesInput.value = defaults.attributes || '';
  } else {
    context.currentAttributes = typeof defaults.attributes === 'string' ? defaults.attributes : '';
  }
  handleGearItemEditFieldInput();
  if (context.nameInput && typeof context.nameInput.focus === 'function') {
    try {
      context.nameInput.focus({ preventScroll: true });
    } catch (error) {
      void error;
    }
  }
}

function handleGearItemEditDialogBackdropPointerDown(event) {
  if (!event) {
    return;
  }
  const context = getGearItemEditContext();
  if (!context || !context.dialog) {
    return;
  }
  if (event.target !== context.dialog) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  handleGearItemEditDialogCancel(event);
}

let gearItemEditDialogBound = false;
let activeGearItemEditTarget = null;

function handleGearItemEditFormSubmit(event) {
  event.preventDefault();
  const context = getGearItemEditContext();
  if (!context || !context.dialog) {
    return;
  }
  const targetEntry = activeGearItemEditTarget && activeGearItemEditTarget.element;
  const targetOptions = activeGearItemEditTarget && activeGearItemEditTarget.options;
  const allowRentalToggle = !targetOptions || targetOptions.allowRentalToggle !== false;
  if (!targetEntry || !targetEntry.isConnected) {
    context.dialog.close('cancel');
    activeGearItemEditTarget = null;
    return;
  }
  const data = {
    quantity: context.quantityInput ? context.quantityInput.value : '',
    name: context.nameInput ? context.nameInput.value : '',
    attributes: context.attributesInput
      ? context.attributesInput.value
      : (typeof context.currentAttributes === 'string' ? context.currentAttributes : ''),
    note: context.noteInput ? context.noteInput.value : '',
    rentalExcluded: allowRentalToggle && context.rentalCheckbox
      ? context.rentalCheckbox.checked
      : targetEntry.getAttribute('data-rental-excluded') === 'true',
    providedBy: context.providerSelect ? context.providerSelect.value : '',
    providerLabel: context.providerSelect && context.providerSelect.selectedOptions && context.providerSelect.selectedOptions.length
      ? getProviderOptionLabel(context.providerSelect.selectedOptions[0])
      : '',
    extra: context.extraCheckbox ? context.extraCheckbox.checked : Boolean(targetEntry.getAttribute('data-gear-extra') === 'true'),
    extraStart: context.extraStartInput ? context.extraStartInput.value : targetEntry.getAttribute('data-gear-extra-start') || '',
    extraEnd: context.extraEndInput ? context.extraEndInput.value : targetEntry.getAttribute('data-gear-extra-end') || '',
    cameraLink: '',
    cameraLinkLabel: '',
  };
  if (data.extra) {
    const sanitized = sanitizeExtraPeriod(data.extraStart, data.extraEnd);
    data.extraStart = sanitized.start;
    data.extraEnd = sanitized.end;
  } else {
    data.extraStart = '';
    data.extraEnd = '';
  }
  const hasNameForOwned = Boolean(data.name && data.name.trim());
  const wantsOwned = Boolean(context.ownedCheckbox && context.ownedCheckbox.checked && hasNameForOwned);
  if (wantsOwned && (!data.providedBy || data.providedBy === 'rental-house')) {
    if (context.providerSelect) {
      context.providerSelect.value = 'user';
      const selected = context.providerSelect.selectedOptions && context.providerSelect.selectedOptions[0];
      data.providedBy = context.providerSelect.value;
      data.providerLabel = selected ? getProviderOptionLabel(selected) : data.providerLabel;
    } else {
      data.providedBy = 'user';
    }
  }
  const isCameraItem = Boolean(context.isCameraItem);
  let cameraLinkSelection = '';
  let cameraLinkLabel = '';
  if (context.cameraLinkSelect) {
    cameraLinkSelection = context.cameraLinkSelect.value || '';
    const selectedOption = context.cameraLinkSelect.selectedOptions && context.cameraLinkSelect.selectedOptions[0];
    if (selectedOption) {
      cameraLinkLabel = selectedOption.getAttribute('data-camera-label')
        || (selectedOption.dataset ? selectedOption.dataset.cameraLabel : '')
        || '';
      if (!cameraLinkLabel) {
        const optionText = selectedOption.textContent || '';
        if (optionText) {
          cameraLinkLabel = optionText.replace(/\s*\([^)]*\)\s*$/, '').trim();
        }
      }
    }
  }
  const wantsCameraLink = isCameraItem || cameraLinkSelection === 'camera';
  if (wantsCameraLink) {
    data.cameraLink = 'camera';
    data.cameraLinkLabel = cameraLinkLabel || getActiveCameraDisplayName() || '';
  } else {
    data.cameraLink = '';
    data.cameraLinkLabel = '';
  }
  context.currentCameraLinkValue = data.cameraLink;
  applyGearItemData(targetEntry, data);
  markProjectFormDataDirty();
  const ownedSyncResult = wantsOwned || context.currentOwnedEntryId
    ? syncGearItemOwnedState(targetEntry, data, {
        wantsOwned,
        existingId: context.currentOwnedEntryId || targetEntry.getAttribute('data-gear-own-gear-id') || '',
      })
    : { id: '', changed: false };
  if (ownedSyncResult && Object.prototype.hasOwnProperty.call(ownedSyncResult, 'id')) {
    if (ownedSyncResult.id) {
      targetEntry.setAttribute('data-gear-own-gear-id', ownedSyncResult.id);
    } else {
      targetEntry.removeAttribute('data-gear-own-gear-id');
    }
    context.currentOwnedEntryId = ownedSyncResult.id || '';
    if (ownedSyncResult.changed) {
      ownGearNameCache = null;
    }
  }
  context.currentAttributes = typeof data.attributes === 'string' ? data.attributes : '';
  if (targetEntry.classList && targetEntry.classList.contains('gear-custom-item')) {
    persistCustomItemsChange();
  } else {
    if (typeof saveCurrentGearList === 'function') {
      saveCurrentGearList();
    }
    if (typeof saveCurrentSession === 'function') {
      saveCurrentSession();
    }
    if (typeof checkSetupChanged === 'function') {
      checkSetupChanged();
    }
  }
  context.dialog.close('save');
}

function handleGearItemEditDialogCancel(event) {
  if (event) {
    event.preventDefault();
  }
  const context = getGearItemEditContext();
  if (context && context.dialog) {
    context.dialog.close('cancel');
  }
}

function handleGearItemEditDialogClose() {
  const context = getGearItemEditContext();
  const targetEntry = activeGearItemEditTarget && activeGearItemEditTarget.element;
  const returnValue = context && context.dialog ? context.dialog.returnValue : '';
  if (context && context.form) {
    try {
      context.form.reset();
    } catch (error) {
      void error;
    }
  }
  if (context && context.nameInput) {
    context.nameInput.removeAttribute('list');
  }
  if (context && context.preview) {
    context.preview.textContent = '';
    context.preview.hidden = true;
  }
  if (context) {
    context.resetDefaults = null;
    context.currentAttributes = '';
    context.currentOwnedEntryId = '';
    context.currentCameraLinkValue = '';
    context.isCameraItem = false;
    if (context.resetButton) {
      context.resetButton.disabled = false;
      context.resetButton.setAttribute('aria-disabled', 'false');
    }
    if (context.ownedCheckbox) {
      context.ownedCheckbox.checked = false;
      context.ownedCheckbox.disabled = false;
      context.ownedCheckbox.removeAttribute('aria-disabled');
      context.ownedCheckbox.removeAttribute('aria-describedby');
    }
    if (context.cameraLinkSelect) {
      context.cameraLinkSelect.disabled = false;
      context.cameraLinkSelect.value = '';
      context.cameraLinkSelect.removeAttribute('aria-disabled');
    }
  }
  activeGearItemEditTarget = null;
  if (targetEntry && targetEntry.isConnected) {
    const editBtn = targetEntry.querySelector('[data-gear-edit]');
    if (editBtn && typeof editBtn.focus === 'function') {
      try {
        editBtn.focus({ preventScroll: true });
      } catch (error) {
        void error;
      }
    }
  }
}

function refreshGearItemEditProviderOptionsIfOpen() {
  const context = getGearItemEditContext();
  if (!context || !context.dialog || !context.providerSelect) {
    return;
  }
  const isDialogOpen = typeof context.dialog.open === 'boolean'
    ? context.dialog.open
    : !context.dialog.hasAttribute('hidden');
  if (!isDialogOpen) {
    return;
  }
  const targetEntry = activeGearItemEditTarget && activeGearItemEditTarget.element;
  const data = targetEntry ? getGearItemData(targetEntry) : {};
  updateGearItemEditProviderOptions(context, data);
}

function refreshGearItemEditCameraLinkOptionsIfOpen() {
  const context = getGearItemEditContext();
  if (!context || !context.dialog || !context.cameraLinkSelect) {
    return;
  }
  const isDialogOpen = typeof context.dialog.open === 'boolean'
    ? context.dialog.open
    : !context.dialog.hasAttribute('hidden');
  if (!isDialogOpen) {
    return;
  }
  const targetEntry = activeGearItemEditTarget && activeGearItemEditTarget.element;
  const data = targetEntry ? getGearItemData(targetEntry) : {};
  updateGearItemEditCameraLinkOptions(context, data);
  const isCameraItem = Boolean(context.isCameraItem || (targetEntry && isPrimaryCameraItem(targetEntry)));
  const nextValue = isCameraItem || data.cameraLink === 'camera' ? 'camera' : '';
  context.cameraLinkSelect.value = nextValue;
  if (isCameraItem) {
    context.cameraLinkSelect.disabled = true;
    context.cameraLinkSelect.setAttribute('aria-disabled', 'true');
  } else {
    context.cameraLinkSelect.disabled = false;
    context.cameraLinkSelect.removeAttribute('aria-disabled');
  }
}

function refreshGearItemOwnedStateIfOpen() {
  const context = getGearItemEditContext();
  if (!context || !context.dialog || !context.ownedCheckbox) {
    return;
  }
  const isDialogOpen = typeof context.dialog.open === 'boolean'
    ? context.dialog.open
    : !context.dialog.hasAttribute('hidden');
  if (!isDialogOpen) {
    return;
  }
  const targetEntry = activeGearItemEditTarget && activeGearItemEditTarget.element;
  if (!targetEntry || !targetEntry.isConnected) {
    return;
  }
  const currentInputName = context.nameInput ? context.nameInput.value.trim() : '';
  const fallbackData = getGearItemData(targetEntry);
  const lookupName = currentInputName || fallbackData.name || '';
  const existingId = context.currentOwnedEntryId || targetEntry.getAttribute('data-gear-own-gear-id') || '';
  const records = loadOwnGearRecordsForEditor();
  const { record } = lookupOwnGearRecord(records, existingId, lookupName);
  const hasName = Boolean(lookupName);
  context.ownedCheckbox.disabled = !hasName;
  if (context.ownedCheckbox.disabled) {
    context.ownedCheckbox.setAttribute('aria-disabled', 'true');
    context.ownedCheckbox.checked = false;
  } else {
    context.ownedCheckbox.removeAttribute('aria-disabled');
    context.ownedCheckbox.checked = Boolean(record);
  }
  if (record) {
    context.currentOwnedEntryId = record.id;
    targetEntry.setAttribute('data-gear-own-gear-id', record.id);
  } else {
    context.currentOwnedEntryId = '';
    targetEntry.removeAttribute('data-gear-own-gear-id');
  }
}

function bindGearItemEditDialog(context) {
  if (gearItemEditDialogBound) {
    return;
  }
  if (!context || !context.dialog) {
    return;
  }
  applyGearItemEditDialogTexts(context);
  if (context.form) {
    context.form.addEventListener('submit', handleGearItemEditFormSubmit);
  }
  if (context.cancelButton) {
    context.cancelButton.addEventListener('click', handleGearItemEditDialogCancel);
  }
  if (context.resetButton) {
    context.resetButton.addEventListener('click', handleGearItemEditResetClick);
  }
  context.dialog.addEventListener('cancel', handleGearItemEditDialogCancel);
  context.dialog.addEventListener('close', handleGearItemEditDialogClose);
  if ('onpointerdown' in context.dialog) {
    context.dialog.addEventListener('pointerdown', handleGearItemEditDialogBackdropPointerDown);
  } else {
    context.dialog.addEventListener('mousedown', handleGearItemEditDialogBackdropPointerDown);
    context.dialog.addEventListener('touchstart', handleGearItemEditDialogBackdropPointerDown);
  }
  const previewInputs = [context.quantityInput, context.nameInput];
  previewInputs.forEach(input => {
    if (!input) return;
    input.addEventListener('input', handleGearItemEditFieldInput);
    input.addEventListener('change', handleGearItemEditFieldInput);
  });
  if (context.rentalCheckbox) {
    context.rentalCheckbox.addEventListener('change', handleGearItemEditRentalCheckboxChange);
  }
  if (context.ownedCheckbox) {
    context.ownedCheckbox.addEventListener('change', handleGearItemEditOwnedChange);
  }
  if (context.extraCheckbox) {
    context.extraCheckbox.addEventListener('change', handleGearItemEditExtraChange);
  }
  [context.extraStartInput, context.extraEndInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', handleGearItemEditFieldInput);
    input.addEventListener('change', handleGearItemEditFieldInput);
  });
  if (context.cameraLinkSelect) {
    context.cameraLinkSelect.addEventListener('change', handleGearItemEditFieldInput);
  }
  gearItemEditDialogBound = true;
}

function openGearItemEditor(element, options = {}) {
  if (!element) return false;
  const context = getGearItemEditContext();
  if (!context || !context.dialog) {
    return false;
  }
  bindGearItemEditDialog(context);
  enhanceGearItemElement(element);
  if (element.classList && element.classList.contains('gear-custom-item')) {
    const container = element.closest('.gear-custom-items[data-gear-custom-list]');
    if (container) {
      const categoryKey = container.getAttribute('data-gear-custom-list') || '';
      const categoryLabel = container.getAttribute('data-gear-custom-category') || '';
      attachCustomItemSuggestions(element, categoryKey, categoryLabel);
    }
  }
  const data = getGearItemData(element);
  activeGearItemEditTarget = { element, options: options || {} };
  context.resetDefaults = getGearItemResetDefaults(element);
  context.currentAttributes = typeof data.attributes === 'string'
    ? data.attributes
    : String(data.attributes ?? '');
  if (context.resetButton) {
    context.resetButton.disabled = false;
    context.resetButton.setAttribute('aria-disabled', 'false');
  }
  applyGearItemEditDialogTexts(context);
  const existingOwnedId = element.getAttribute('data-gear-own-gear-id') || '';
  const ownedRecord = findOwnedRecordForGearItem(element, {
    name: data.name || '',
    existingId: existingOwnedId || context.currentOwnedEntryId || '',
  });
  context.currentOwnedEntryId = ownedRecord ? ownedRecord.id : '';
  const hasNameForOwned = Boolean(data.name && data.name.trim());
  if (context.ownedCheckbox) {
    context.ownedCheckbox.checked = Boolean(ownedRecord) && hasNameForOwned;
    context.ownedCheckbox.disabled = !hasNameForOwned;
    if (context.ownedCheckbox.disabled) {
      context.ownedCheckbox.setAttribute('aria-disabled', 'true');
    } else {
      context.ownedCheckbox.removeAttribute('aria-disabled');
    }
  }
  if (context.ownedContainer) {
    context.ownedContainer.hidden = false;
  }
  if (ownedRecord && element) {
    element.setAttribute('data-gear-own-gear-id', ownedRecord.id);
  } else if (existingOwnedId) {
    element.removeAttribute('data-gear-own-gear-id');
  }
  const allowRentalToggle = options && options.allowRentalToggle === false ? false : true;
  if (context.quantityInput) {
    context.quantityInput.value = data.quantity || '';
  }
  if (context.nameInput) {
    context.nameInput.value = data.name || '';
    const suggestionsId = element.getAttribute('data-gear-suggestions') || '';
    if (suggestionsId) {
      context.nameInput.setAttribute('list', suggestionsId);
    } else {
      context.nameInput.removeAttribute('list');
    }
  }
  if (context.noteInput) {
    context.noteInput.value = data.note || '';
  }
  if (context.extraCheckbox) {
    const extraActive = Boolean(data.extra);
    context.extraCheckbox.checked = extraActive;
    updateGearItemEditExtraControls(context, extraActive);
  }
  if (context.extraStartInput) {
    context.extraStartInput.value = data.extraStart || '';
  }
  if (context.extraEndInput) {
    context.extraEndInput.value = data.extraEnd || '';
  }
  if (context.extraPeriodContainer && !context.extraCheckbox) {
    context.extraPeriodContainer.hidden = true;
    context.extraPeriodContainer.setAttribute('hidden', '');
  }
  if (context.providerSelect) {
    updateGearItemEditProviderOptions(context, data);
  }
  const cameraLinked = data.cameraLink === 'camera';
  const isCameraItem = isPrimaryCameraItem(element);
  context.isCameraItem = isCameraItem;
  if (context.cameraLinkContainer) {
    context.cameraLinkContainer.hidden = false;
    context.cameraLinkContainer.removeAttribute('hidden');
  }
  if (context.cameraLinkSelect) {
    updateGearItemEditCameraLinkOptions(context, data);
    const nextValue = isCameraItem ? 'camera' : (cameraLinked ? 'camera' : '');
    context.cameraLinkSelect.value = nextValue;
    if (isCameraItem) {
      context.cameraLinkSelect.disabled = true;
      context.cameraLinkSelect.setAttribute('aria-disabled', 'true');
    } else {
      context.cameraLinkSelect.disabled = false;
      context.cameraLinkSelect.removeAttribute('aria-disabled');
    }
  }
  context.currentCameraLinkValue = isCameraItem || cameraLinked ? 'camera' : '';
  updateGearItemEditRentalControls(context, Boolean(data.rentalExcluded), allowRentalToggle);
  const fallbackPreview = (() => {
    const textNode = element.querySelector('.gear-item-text');
    if (textNode && textNode.textContent) {
      return textNode.textContent.trim();
    }
    return data.name || '';
  })();
  const computedPreview = updateGearItemEditPreview(context);
  const previewText = computedPreview || fallbackPreview;
  const textsForDialog = getGearItemEditTexts();
  if (context.preview && previewText) {
    context.preview.textContent = previewText;
    context.preview.hidden = false;
  }
  if (context.title) {
    context.title.textContent = previewText
      ? `${textsForDialog.dialogTitle} — ${previewText}`
      : textsForDialog.dialogTitle;
  }
  updateGearItemEditResetState(context);
  try {
    if (typeof context.dialog.showModal === 'function') {
      context.dialog.showModal();
    } else {
      context.dialog.hidden = false;
    }
  } catch (error) {
    console.warn('Failed to open gear item edit dialog', error);
    activeGearItemEditTarget = null;
    return false;
  }
  if (options.focusField === 'name' && context.nameInput) {
    try {
      context.nameInput.focus({ preventScroll: true });
    } catch (error) {
      void error;
    }
  } else if (context.quantityInput) {
    try {
      context.quantityInput.focus({ preventScroll: true });
    } catch (error) {
      void error;
    }
  }
  return true;
}

function buildCustomItemEntryElement(categoryKey, categoryLabel, data) {
  const doc = (gearListOutput && gearListOutput.ownerDocument) || (typeof document !== 'undefined' ? document : null);
  if (!doc) return null;
  const template = doc.createElement('template');
  const rawQuantity = data && Object.prototype.hasOwnProperty.call(data, 'quantity') ? data.quantity : '1';
  const rawName = data && Object.prototype.hasOwnProperty.call(data, 'name') ? data.name : '';
  const rawAttributes = data && Object.prototype.hasOwnProperty.call(data, 'attributes') ? data.attributes : '';
  const rawNote = data && Object.prototype.hasOwnProperty.call(data, 'note') ? data.note : '';
  const rawExtra = data && Object.prototype.hasOwnProperty.call(data, 'extra') ? data.extra : false;
  const rawExtraStart = data && Object.prototype.hasOwnProperty.call(data, 'extraStart') ? data.extraStart : '';
  const rawExtraEnd = data && Object.prototype.hasOwnProperty.call(data, 'extraEnd') ? data.extraEnd : '';
  const quantityValue = typeof rawQuantity === 'string' ? rawQuantity : String(rawQuantity ?? '');
  const nameValue = typeof rawName === 'string' ? rawName : String(rawName ?? '');
  const attributesValue = typeof rawAttributes === 'string' ? rawAttributes : String(rawAttributes ?? '');
  const noteValue = typeof rawNote === 'string' ? rawNote : String(rawNote ?? '');
  const extraValue = rawExtra === true || rawExtra === 'true' || rawExtra === 1 || rawExtra === '1';
  const extraStartValue = typeof rawExtraStart === 'string' ? rawExtraStart : String(rawExtraStart ?? '');
  const extraEndValue = typeof rawExtraEnd === 'string' ? rawExtraEnd : String(rawExtraEnd ?? '');
  const removeLabel = resolveGearListCustomText('gearListRemoveCustomItem', 'Remove');
  const removeAria = resolveGearListCustomText('gearListRemoveCustomItemFromCategory', 'Remove custom item from {category}', { category: categoryLabel });
  const editLabel = resolveGearListCustomText('gearListEditCustomItem', 'Edit custom item');
  const minusIcon = (typeof iconMarkup === 'function' && typeof ICON_GLYPHS === 'object')
    ? iconMarkup(ICON_GLYPHS.minus, { className: 'btn-icon' })
    : '';
  const editIcon = (typeof iconMarkup === 'function' && typeof ICON_GLYPHS === 'object')
    ? iconMarkup(ICON_GLYPHS.sliders, { className: 'btn-icon' })
    : '';
  const rentalTexts = getGearListRentalToggleTexts();
  const noteLabel = rentalTexts.noteLabel && rentalTexts.noteLabel.trim() ? rentalTexts.noteLabel : '';
  template.innerHTML = `
    <div class="gear-custom-item" data-gear-custom-entry="${escapeHtml(categoryKey)}">
      <div class="gear-custom-item-summary">
        <span class="gear-custom-item-preview" aria-hidden="true"></span>
        <span class="gear-item-note" hidden></span>
      </div>
      <div class="gear-custom-item-actions">
        <button
          type="button"
          class="gear-item-edit-btn"
          data-gear-edit
          aria-label="${escapeHtml(editLabel)}"
        >
          ${editIcon}
        </button>
        <button
          type="button"
          class="gear-custom-remove-btn"
          data-gear-custom-remove="${escapeHtml(categoryKey)}"
          data-gear-custom-category="${escapeHtml(categoryLabel)}"
          aria-label="${escapeHtml(removeAria)}"
        >
          ${minusIcon}<span>${escapeHtml(removeLabel)}</span>
        </button>
      </div>
    </div>
  `.trim();
  const element = template.content.firstElementChild;
  if (!element) return null;
  if (noteLabel) {
    element.setAttribute('data-rental-note', noteLabel);
  }
  element.setAttribute('data-gear-quantity', quantityValue);
  element.setAttribute('data-gear-label', nameValue);
  if (attributesValue) {
    element.setAttribute('data-gear-attributes', attributesValue);
  } else {
    element.removeAttribute('data-gear-attributes');
  }
  if (noteValue) {
    element.setAttribute('data-gear-note', noteValue);
  } else {
    element.removeAttribute('data-gear-note');
  }
  applyGearItemData(element, {
    quantity: quantityValue,
    name: nameValue,
    attributes: attributesValue,
    note: noteValue,
    rentalExcluded: data && (data.rentalExcluded === true || data.rentalExcluded === 'true'),
    providedBy: data && (data.providedBy || data.provider) ? (data.providedBy || data.provider) : '',
    providerLabel: data && data.providerLabel ? data.providerLabel : '',
    extra: extraValue,
    extraStart: extraStartValue,
    extraEnd: extraEndValue,
  });
  return element;
}

function persistCustomItemsChange() {
  markProjectFormDataDirty();
  if (typeof saveCurrentGearList === 'function') {
    saveCurrentGearList();
  }
  if (typeof saveCurrentSession === 'function') {
    saveCurrentSession();
  }
  if (typeof checkSetupChanged === 'function') {
    checkSetupChanged();
  }
}

function addCustomItemEntry(categoryKey, categoryLabel, data = {}, options = {}) {
  const container = getCustomItemsContainer(categoryKey);
  if (!container) return null;
  const entry = buildCustomItemEntryElement(categoryKey, categoryLabel, data);
  if (!entry) return null;
  container.appendChild(entry);
  attachCustomItemSuggestions(entry, categoryKey, categoryLabel);
  const extraValue = data && (data.extra === true || data.extra === 'true' || data.extra === 1 || data.extra === '1');
  const extraStartValue = data && Object.prototype.hasOwnProperty.call(data, 'extraStart')
    ? data.extraStart
    : '';
  const extraEndValue = data && Object.prototype.hasOwnProperty.call(data, 'extraEnd')
    ? data.extraEnd
    : '';
  applyGearItemData(entry, {
    quantity: data && Object.prototype.hasOwnProperty.call(data, 'quantity') ? data.quantity : '',
    name: data && Object.prototype.hasOwnProperty.call(data, 'name') ? data.name : '',
    attributes: data && Object.prototype.hasOwnProperty.call(data, 'attributes') ? data.attributes : '',
    note: data && Object.prototype.hasOwnProperty.call(data, 'note') ? data.note : '',
    rentalExcluded: data && (data.rentalExcluded === true || data.rentalExcluded === 'true'),
    providedBy: data && (data.providedBy || data.provider) ? (data.providedBy || data.provider) : '',
    providerLabel: data && data.providerLabel ? data.providerLabel : '',
    extra: extraValue,
    extraStart: extraStartValue,
    extraEnd: extraEndValue,
    cameraLink: data && Object.prototype.hasOwnProperty.call(data, 'cameraLink') ? data.cameraLink : '',
    cameraLinkLabel: data && Object.prototype.hasOwnProperty.call(data, 'cameraLinkLabel') ? data.cameraLinkLabel : '',
  }, { skipPreview: false });
  const wantsExcluded = Boolean(
    data && (data.rentalExcluded === true || data.rentalExcluded === 'true')
  );
  setRentalExclusionState(entry, wantsExcluded);
  if (!options.skipFocus) {
    const editBtn = entry.querySelector('[data-gear-edit]');
    if (editBtn) {
      editBtn.focus();
    }
  }
  if (!options.skipEditDialog && typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(() => {
      try {
        openGearItemEditor(entry, { focusField: 'name', allowRentalToggle: true });
      } catch (error) {
        console.warn('Failed to open gear item editor for new custom item', error);
      }
    });
  }
  if (!options.skipPersist) {
    persistCustomItemsChange();
  }
  return entry;
}

function addExtraGearItem(options = {}) {
  const container = ensureExtraGearCategory();
  if (!container) return null;
  const textsForExtra = getExtraGearUiTexts();
  const categoryLabel = container.getAttribute('data-gear-custom-category') || textsForExtra.categoryLabel || '';
  const entry = addCustomItemEntry(
    EXTRA_GEAR_CATEGORY_KEY,
    categoryLabel,
    {
      quantity: options && Object.prototype.hasOwnProperty.call(options, 'quantity') ? options.quantity : '1',
      name: options && Object.prototype.hasOwnProperty.call(options, 'name') ? options.name : '',
      attributes: options && Object.prototype.hasOwnProperty.call(options, 'attributes') ? options.attributes : '',
      note: options && Object.prototype.hasOwnProperty.call(options, 'note') ? options.note : '',
      extra: true,
      extraStart: options && Object.prototype.hasOwnProperty.call(options, 'extraStart') ? options.extraStart : '',
      extraEnd: options && Object.prototype.hasOwnProperty.call(options, 'extraEnd') ? options.extraEnd : '',
    },
    {
      skipFocus: Boolean(options && options.skipFocus),
      skipPersist: Boolean(options && options.skipPersist),
      skipEditDialog: Boolean(options && options.skipEditDialog),
    }
  );
  return entry;
}

function handleAddCustomItemRequest(button) {
  if (!button) return;
  const categoryKey = button.getAttribute('data-gear-custom-add') || '';
  if (!categoryKey) return;
  const categoryLabel = button.getAttribute('data-gear-custom-category') || '';
  if (button.hasAttribute('data-extra-gear') || categoryKey === EXTRA_GEAR_CATEGORY_KEY) {
    addExtraGearItem({ skipFocus: false, skipPersist: false, skipEditDialog: false });
    return;
  }
  addCustomItemEntry(categoryKey, categoryLabel, { quantity: '1', name: '' });
}

function handleRemoveCustomItemRequest(button) {
  if (!button) return;
  const entry = button.closest('.gear-custom-item');
  if (!entry) return;
  const categoryKey = button.getAttribute('data-gear-custom-remove')
    || entry.getAttribute('data-gear-custom-entry')
    || '';
  entry.remove();
  persistCustomItemsChange();
  if (categoryKey) {
    const addBtn = gearListOutput?.querySelector(`[data-gear-custom-add="${categoryKey}"]`);
    if (addBtn) {
      addBtn.focus();
    }
  }
}

function readCustomItemsState() {
  if (!gearListOutput) return {};
  const state = {};
  const containers = gearListOutput.querySelectorAll('.gear-custom-items[data-gear-custom-list]');
  containers.forEach(container => {
    const key = container.getAttribute('data-gear-custom-list');
    if (!key) return;
    const entries = [];
    container.querySelectorAll('.gear-custom-item').forEach(item => {
      const quantity = String(item.getAttribute('data-gear-quantity') || '');
      const name = String(
        item.getAttribute('data-gear-label')
        || item.getAttribute('data-gear-name')
        || ''
      );
      const attributes = String(item.getAttribute('data-gear-attributes') || '');
      const note = String(item.getAttribute('data-gear-note') || '');
      const rentalExcluded = item.getAttribute('data-rental-excluded') === 'true';
      const providedBy = String(item.getAttribute('data-gear-provider') || '');
      const providerLabel = String(item.getAttribute('data-gear-provider-label') || '');
      const extra = item.getAttribute('data-gear-extra') === 'true';
      const extraStart = String(item.getAttribute('data-gear-extra-start') || '');
      const extraEnd = String(item.getAttribute('data-gear-extra-end') || '');
      const cameraLink = String(item.getAttribute('data-gear-camera-link') || '');
      const cameraLinkLabel = String(item.getAttribute('data-gear-camera-link-label') || '');
      entries.push({
        quantity,
        name,
        attributes,
        note,
        rentalExcluded,
        providedBy,
        providerLabel,
        extra,
        extraStart,
        extraEnd,
        cameraLink,
        cameraLinkLabel,
      });
    });
    if (entries.length) {
      state[key] = entries;
    }
  });
  return state;
}

function applyCustomItemsState(state) {
  if (!gearListOutput) return;
  const normalizedState = (state && typeof state === 'object') ? state : {};
  const activeKeys = new Set(Object.keys(normalizedState));
  const containers = gearListOutput.querySelectorAll('.gear-custom-items[data-gear-custom-list]');
  containers.forEach(container => {
    const key = container.getAttribute('data-gear-custom-list');
    if (!key) return;
    if (!activeKeys.has(key)) {
      container.querySelectorAll('.gear-custom-item').forEach(item => item.remove());
    }
  });
  Object.entries(normalizedState).forEach(([key, entries]) => {
    const container = getCustomItemsContainer(key);
    if (!container) return;
    container.querySelectorAll('.gear-custom-item').forEach(item => item.remove());
    const categoryLabel = container.getAttribute('data-gear-custom-category') || '';
    if (Array.isArray(entries)) {
      entries.forEach(entry => {
        if (entry && typeof entry === 'object') {
          addCustomItemEntry(key, categoryLabel, entry, { skipFocus: true, skipPersist: true, skipEditDialog: true });
        } else {
          addCustomItemEntry(key, categoryLabel, { quantity: '', name: '' }, { skipFocus: true, skipPersist: true, skipEditDialog: true });
        }
      });
    }
  });
}

function gearListGenerateHtmlImpl(info = {}) {
    const getText = sel => sel && sel.options && sel.selectedIndex >= 0
        ? sel.options[sel.selectedIndex].text.trim()
        : '';
    const selectedNames = {
        camera: cameraSelect && cameraSelect.value && cameraSelect.value !== 'None' ? getText(cameraSelect) : '',
        monitor: monitorSelect && monitorSelect.value && monitorSelect.value !== 'None' ? getText(monitorSelect) : '',
        video: videoSelect && videoSelect.value && videoSelect.value !== 'None' ? getText(videoSelect) : '',
        motors: motorSelects
            .map(sel => sel && sel.value && sel.value !== 'None' ? getText(sel) : '')
            .filter(Boolean),
        controllers: controllerSelects
            .map(sel => sel && sel.value && sel.value !== 'None' ? getText(sel) : '')
            .filter(Boolean),
        distance: distanceSelect && distanceSelect.value && distanceSelect.value !== 'None' ? getText(distanceSelect) : '',
        cage: cageSelect && cageSelect.value && cageSelect.value !== 'None' ? getText(cageSelect) : '',
        battery: batterySelect && batterySelect.value && batterySelect.value !== 'None' ? getText(batterySelect) : ''
    };
    const normalizedCameraLinkLabel = typeof selectedNames.camera === 'string'
        ? selectedNames.camera.trim()
        : '';
    const hasCameraForLinking = Boolean(normalizedCameraLinkLabel);
    const cameraLinkTargets = new Set();
    const registerCameraLinkTarget = name => {
        if (!hasCameraForLinking) return;
        if (typeof name !== 'string') return;
        const normalized = normalizeGearNameForComparison(name);
        if (normalized) {
            cameraLinkTargets.add(normalized);
        }
    };
    const markEntryCameraLink = entry => {
        if (!entry || !hasCameraForLinking) return;
        entry.cameraLink = true;
        if (normalizedCameraLinkLabel && !entry.cameraLinkLabel) {
            entry.cameraLinkLabel = normalizedCameraLinkLabel;
        }
    };
    const applyCameraLinkFromTargets = ({ base, entry }) => {
        if (!hasCameraForLinking) return;
        try {
            const normalizedBase = normalizeGearNameForComparison(base);
            if (normalizedBase && cameraLinkTargets.has(normalizedBase)) {
                markEntryCameraLink(entry);
            }
        } catch (error) {
            void error;
        }
    };
    const buildCameraLinkAttributes = (labelOverride) => {
        if (!hasCameraForLinking) return '';
        const resolvedLabel = typeof labelOverride === 'string' && labelOverride.trim()
            ? labelOverride.trim()
            : normalizedCameraLinkLabel;
        const attrParts = ['data-gear-camera-link="camera"'];
        if (resolvedLabel) {
            attrParts.push(`data-gear-camera-link-label="${escapeHtml(resolvedLabel)}"`);
        }
        return attrParts.join(' ');
    };
    const hasMotor = selectedNames.motors.length > 0;
    const videoDistPrefs = info.videoDistribution
        ? info.videoDistribution.split(',').map(s => s.trim()).filter(Boolean)
        : [];
    const handheldPrefs = videoDistPrefs
        .map(p => {
            const m = p.match(/^(Director|Gaffer|DoP) Monitor (?:(\d+)" )?handheld$/);
            return m ? { role: m[1], size: m[2] ? parseFloat(m[2]) : undefined } : null;
        })
        .filter(Boolean);
    const largeMonitorPrefs = videoDistPrefs
        .map(p => {
            const m = p.match(/^(Director|Combo|DoP) Monitor 15-21"$/);
            return m ? { role: m[1] } : null;
        })
        .filter(Boolean);
    if (["Arri Alexa Mini", "Arri Amira"].includes(selectedNames.camera)) {
        selectedNames.viewfinder = "ARRI K2.75004.0 MVF-1 Viewfinder";
    } else {
        selectedNames.viewfinder = "";
    }
    const { cameraSupport: cameraSupportAcc, chargers: chargersAcc, fizCables: fizCableAcc, misc: miscAcc, monitoringSupport: monitoringSupportAcc, rigging: riggingAcc } = collectAccessories({ hasMotor, videoDistPrefs });
    const cagesDb = devices.accessories?.cages || {};
    const compatibleCages = [];
    if (cameraSelect && cameraSelect.value && cameraSelect.value !== 'None') {
        for (const [name, cage] of Object.entries(cagesDb)) {
            if (!cage.compatible || cage.compatible.includes(cameraSelect.value)) {
                compatibleCages.push(name);
            }
        }
    }
    const supportAccNoCages = cameraSupportAcc.filter(item => !compatibleCages.includes(item));
    if (selectedNames.viewfinder) {
        const normalizedSupport = new Set(supportAccNoCages.map(item => normalizeGearNameForComparison(item)));
        const normalizedViewfinder = normalizeGearNameForComparison(selectedNames.viewfinder);
        if (!normalizedSupport.has(normalizedViewfinder)) {
            supportAccNoCages.push(selectedNames.viewfinder);
        }
    }
    const scenarios = info.requiredScenarios
        ? info.requiredScenarios.split(',').map(s => s.trim()).filter(Boolean)
        : [];
    const hasSeededScenarioRules = hasSeededAutoGearDefaults();
    const allowLegacyScenarioGear = autoGearRules.length === 0 && !hasSeededScenarioRules;
    const isScenarioActive = scenario => allowLegacyScenarioGear && scenarios.includes(scenario);
    const isAnyScenarioActive = list => allowLegacyScenarioGear && list.some(value => scenarios.includes(value));
    const hasGimbal = isScenarioActive('Gimbal');
    if (isAnyScenarioActive(['Trinity', 'Steadicam'])) {
        for (let i = 0; i < 2; i++) {
            riggingAcc.push('D-Tap Splitter');
        }
        riggingAcc.push('D-Tap Extension 50 cm (Steadicam/Trinity)');
        riggingAcc.push('D-Tap Extension 50 cm (Spare)');
    }
    const handleSelections = info.cameraHandle
        ? info.cameraHandle.split(',').map(r => r.trim()).filter(Boolean)
        : [];
    const viewfinderExtSelections = info.viewfinderExtension
        ? info.viewfinderExtension.split(',').map(r => r.trim()).filter(Boolean)
        : [];
    const monitoringSettings = [
        ...(info.viewfinderSettings ? info.viewfinderSettings.split(',').map(s => s.trim()) : []),
        ...(info.frameGuides ? info.frameGuides.split(',').map(s => s.trim()) : []),
        ...(info.aspectMaskOpacity ? info.aspectMaskOpacity.split(',').map(s => s.trim()) : []),
        ...(info.monitoringSettings ? info.monitoringSettings.split(',').map(s => s.trim()) : []),
    ].filter(Boolean);
    const selectedLensNames = normalizeLensSelectionNames(info.lenses);
    const maxLensFront = selectedLensNames.reduce((max, name) => {
        const lens = devices.lenses && devices.lenses[name];
        return Math.max(max, lens && lens.frontDiameterMm || 0);
    }, 0);
    const parsedFilters = parseFilterTokens(info.filter);
    const filterTypes = parsedFilters.map(f => f.type);
    const needsSwingAway = filterTypes.some(t => t === 'ND Grad HE' || t === 'ND Grad SE');
    const filterEntries = buildFilterGearEntries(parsedFilters);
    let filterSelections = collectFilterAccessories(parsedFilters);
    if (filterEntries.length && filterSelections.length) {
        const filterNames = new Set(
            filterEntries.map(entry => normalizeGearNameForComparison(entry.gearName))
        );
        filterSelections = filterSelections.filter(item =>
            !filterNames.has(normalizeGearNameForComparison(item))
        );
    }
    const filterSelectHtml = buildFilterSelectHtml(parsedFilters, filterEntries);
    if (info.mattebox && !needsSwingAway) {
        const matteboxSelection = info.mattebox.toLowerCase();
        if (matteboxSelection.includes('clamp')) {
            const diameters = [...new Set(selectedLensNames
                .map(n => devices.lenses && devices.lenses[n] && devices.lenses[n].frontDiameterMm)
                .filter(Boolean))];
            diameters.forEach(d => filterSelections.push(`ARRI LMB 4x5 Clamp Adapter ${d}mm`));
        }
    }
    viewfinderExtSelections.forEach(vf => supportAccNoCages.push(vf));
    if (isAnyScenarioActive(['Rain Machine', 'Extreme rain'])) {
        filterSelections.push('Schulz Sprayoff Micro');
        filterSelections.push('Spare Disc (Schulz Sprayoff Micro)');
        riggingAcc.push('Fischer RS to D-Tap cable 0,5m');
        riggingAcc.push('Fischer RS to D-Tap cable 0,5m');
    }
    let gimbalSelectionsFinal = [];
    let selectedGimbal = '';
    if (hasGimbal) {
        const gimbalSelections = info.gimbal
            ? info.gimbal.split(',').map(s => s.trim()).filter(Boolean)
            : [];
        const bigLens = maxLensFront > 95;
        if (gimbalSelections.length) {
            gimbalSelectionsFinal = gimbalSelections.map(g => (/Ronin RS4 Pro/i.test(g) && bigLens ? 'DJI Ronin 2' : g));
            if (gimbalSelectionsFinal.length === 1) selectedGimbal = gimbalSelectionsFinal[0];
        } else {
            const cam = devices && devices.cameras && devices.cameras[selectedNames.camera];
            const weight = cam && cam.weight_g;
            const isSmall = weight != null ? weight < 2000 : /(FX3|FX6|R5)/i.test(selectedNames.camera);
            selectedGimbal = bigLens ? 'DJI Ronin 2' : (isSmall ? 'DJI Ronin RS4 Pro Combo' : 'DJI Ronin 2');
            gimbalSelectionsFinal = [selectedGimbal];
        }
        if (/Ronin RS4 Pro/i.test(selectedGimbal) && maxLensFront <= 95) {
            filterSelections.push('Tilta Mirage VND Kit');
            filterSelections.push('Tilta 95 mm Polarizer Filter für Tilta Mirage');
            filterSelections.push('Vaxis 95 mm IRND Filter 0.3 + 0.6 + 0.9 + 1.2 Filter');
            filterSelections.push('Vaxis 95mm Black Mist 1/4 + 1/8 Filter');
        } else {
            filterSelections.push('Arri KK.0038066 Flexible Sunshade Side Flag Holders Set');
        }
    }
    const receiverLabels = [];
    handheldPrefs.forEach(p => receiverLabels.push(`${p.role} handheld`));
    largeMonitorPrefs.forEach(p => receiverLabels.push(`${p.role} 15-21"`));
    if (hasMotor) receiverLabels.push('Focus');
    const receiverCount = receiverLabels.length;
    if (selectedNames.video) {
        monitoringSupportAcc.push('Antenna 5,8GHz 5dBi Long (spare)');
        const rxName = selectedNames.video.replace(/ TX\b/, ' RX');
        if (devices && devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
            const receivers = receiverCount || 1;
            for (let i = 0; i < receivers; i++) {
                monitoringSupportAcc.push('Antenna 5,8GHz 5dBi Long (spare)');
            }
        }
    }
    const addMonitorCables = label => {
        monitoringSupportAcc.push(
            `D-Tap to Lemo-2-pin Cable 0,3m (${label})`,
            `D-Tap to Lemo-2-pin Cable 0,3m (${label})`,
            `Ultraslim BNC Cable 0.3 m (${label})`,
            `Ultraslim BNC Cable 0.3 m (${label})`
        );
    };
    handheldPrefs.forEach(p => addMonitorCables(`${p.role} handheld`));
    const addLargeMonitorCables = label => {
        monitoringSupportAcc.push(
            `D-Tap to Lemo-2-pin Cable 0,5m (${label})`,
            `D-Tap to Lemo-2-pin Cable 0,5m (${label})`,
            `Ultraslim BNC Cable 0.5 m (${label})`,
            `Ultraslim BNC Cable 0.5 m (${label})`
        );
    };
    largeMonitorPrefs.forEach(p => addLargeMonitorCables(`${p.role} 15-21"`));
    const handleName = 'SHAPE Telescopic Handle ARRI Rosette Kit 12"';
    const addHandle = () => {
        if (!supportAccNoCages.includes(handleName)) {
            supportAccNoCages.push(handleName);
        }
    };
    if (isScenarioActive('Handheld') && isScenarioActive('Easyrig')) {
        addHandle();
    }
    if (handleSelections.includes('Hand Grips')) {
        addHandle();
    }
    if (handleSelections.includes('Handle Extension')) {
        supportAccNoCages.push('ARRI K2.0019797 HEX-3');
    }
    if (handleSelections.includes('L-Handle')) {
        supportAccNoCages.push('ARRI KK.0037820 Handle Extension Set');
    }

    const projectInfo = { ...info };
    const projectFormTexts = texts[currentLang]?.projectForm || texts.en?.projectForm || {};
    const projectLabels = texts[currentLang]?.projectFields || texts.en?.projectFields || {};
    const combinedProductionCompany = buildCombinedProductionCompanyDisplay(info, projectLabels);
    if (combinedProductionCompany) {
        projectInfo.productionCompany = combinedProductionCompany;
        [
            'productionCompanyAddress',
            'productionCompanyStreet',
            'productionCompanyStreet2',
            'productionCompanyCity',
            'productionCompanyRegion',
            'productionCompanyPostalCode',
            'productionCompanyCountry'
        ].forEach(key => {
            if (Object.prototype.hasOwnProperty.call(projectInfo, key)) {
                delete projectInfo[key];
            }
        });
    }
    const storageFallbackLabel = projectFormTexts.storageSummaryFallback
        || projectFormTexts.storageTypeLabel
        || 'Media';
    const crewRoleLabels = texts[currentLang]?.crewRoles || texts.en?.crewRoles || {};
    if (Array.isArray(info.people)) {
        const crewEntriesHtml = [];
        const crewEntriesText = [];
        info.people
            .filter(p => p.role && p.name)
            .forEach(p => {
                const roleLabel = crewRoleLabels[p.role] || p.role || '';
                const safeRole = escapeHtml(roleLabel);
                const nameValue = typeof p.name === 'string' ? p.name.trim() : (p.name ? String(p.name).trim() : '');
                if (!nameValue) {
                    return;
                }
                const safeName = escapeHtml(nameValue);
                const detailLinks = [];
                const detailText = [];
                const phoneValue = typeof p.phone === 'string' ? p.phone.trim() : (p.phone ? String(p.phone).trim() : '');
                if (phoneValue) {
                    const phoneHref = formatPhoneHref(phoneValue);
                    const safePhone = escapeHtml(phoneValue);
                    detailText.push(phoneValue);
                    if (phoneHref) {
                        detailLinks.push(`<a href="tel:${phoneHref}" class="req-contact-link">${safePhone}</a>`);
                    } else {
                        detailLinks.push(safePhone);
                    }
                }
                const emailValue = typeof p.email === 'string' ? p.email.trim() : (p.email ? String(p.email).trim() : '');
                if (emailValue) {
                    const emailHref = formatEmailHref(emailValue);
                    const safeEmail = escapeHtml(emailValue);
                    detailText.push(emailValue);
                    if (emailHref) {
                        detailLinks.push(`<a href="mailto:${emailHref}" class="req-contact-link">${safeEmail}</a>`);
                    } else {
                        detailLinks.push(safeEmail);
                    }
                }
                const linkDetails = detailLinks.length ? ` (${detailLinks.join(', ')})` : '';
                const plainDetails = detailText.length ? ` (${detailText.join(', ')})` : '';
                const rolePrefixHtml = roleLabel ? `${safeRole}: ` : '';
                const rolePrefixText = roleLabel ? `${roleLabel}: ` : '';
                crewEntriesHtml.push(`<span class="crew-entry">${rolePrefixHtml}${safeName}${linkDetails}</span>`);
                crewEntriesText.push(`${rolePrefixText}${nameValue}${plainDetails}`);
            });
        if (crewEntriesHtml.length) {
            projectInfo.crew = {
                __html: crewEntriesHtml.join('<br>'),
                text: crewEntriesText.join('\n')
            };
        }
    }
    delete projectInfo.people;
    if (Array.isArray(info.storageRequirements)) {
        const storageEntriesHtml = [];
        const storageEntriesText = [];
        info.storageRequirements.forEach(entry => {
            if (!entry || typeof entry !== 'object') return;
            const quantity = Number.isFinite(entry.quantity) && entry.quantity > 0 ? entry.quantity : null;
            const type = typeof entry.type === 'string' ? entry.type.trim() : '';
            const variant = typeof entry.variant === 'string' ? entry.variant.trim() : '';
            const notes = typeof entry.notes === 'string' ? entry.notes.trim() : '';
            if (!quantity && !type && !variant && !notes) return;
            let label = variant || type || '';
            if (variant && type && !variant.toLowerCase().includes(type.toLowerCase())) {
                label = `${variant} (${type})`;
            } else if (!label && type) {
                label = type;
            }
            if (notes) {
                label = label ? `${label} – ${notes}` : notes;
            }
            const display = label || storageFallbackLabel;
            const prefix = quantity ? `${quantity}x ` : '';
            const text = `${prefix}${display}`.trim();
            storageEntriesText.push(text);
            storageEntriesHtml.push(`<span class="storage-entry">${escapeHtml(text)}</span>`);
        });
        if (storageEntriesHtml.length) {
            projectInfo.storageRequirements = {
                __html: storageEntriesHtml.join('<br>'),
                text: storageEntriesText.join('\n')
            };
        }
    }
    if (Array.isArray(info.prepDays)) {
        projectInfo.prepDays = info.prepDays.join('\n');
    }
    if (Array.isArray(info.shootingDays)) {
        projectInfo.shootingDays = info.shootingDays.join('\n');
    }
    if (Array.isArray(info.returnDays)) {
        projectInfo.returnDays = info.returnDays.join('\n');
    }
    if (monitoringSettings.length) {
        projectInfo.monitoringSupport = monitoringSettings.join(', ');
    }
    delete projectInfo.monitoringSettings;
    delete projectInfo.viewfinderSettings;
    delete projectInfo.frameGuides;
    delete projectInfo.aspectMaskOpacity;
    const projectTitleSource = getCurrentProjectName() || info.projectName || '';
    const projectTitle = escapeHtml(projectTitleSource);
    const excludedFields = new Set([
        'cameraHandle',
        'viewfinderExtension',
        'mattebox',
        'videoDistribution',
        'monitoringConfiguration',
        'focusMonitor',
        'tripodHeadBrand',
        'tripodBowl',
        'tripodTypes',
        'tripodSpreader',
        'sliderBowl',
        'easyrig',
        'lenses',
        'viewfinderSettings',
        'frameGuides',
        'aspectMaskOpacity',
        'filter',
        'viewfinderEyeLeatherColor',
        'directorMonitor',
        'dopMonitor',
        'gafferMonitor',
        'directorMonitor15',
        'comboMonitor15',
        'dopMonitor15',
        'proGaffColor1',
        'proGaffWidth1',
        'proGaffColor2',
        'proGaffWidth2',
        'storageRequirements',
        'monitorBatteries',
        'lensSelections'
    ]);
    const infoEntries = Object.entries(projectInfo)
        .filter(([k, v]) =>
            v &&
            k !== 'projectName' &&
            !excludedFields.has(k) &&
            !k.endsWith('Manual')
        );
    const boxesHtml = infoEntries.length ? '<div class="requirements-grid">' +
        infoEntries.map(([k, v]) => {
            const value = formatRequirementValue(v);
            const label = projectLabels[k] || k;
            const iconHtml = iconMarkup(projectFieldIcons[k], {
                className: 'req-icon',
                size: 'var(--req-icon-size)'
            });
            return `<div class="requirement-box" data-field="${k}">${iconHtml}<span class="req-label">${escapeHtml(label)}</span><span class="req-value">${value}</span></div>`;
        }).join('') + '</div>' : '';
    const requirementsHeading = projectFormTexts.heading || 'Project Requirements';
    const infoHtml = infoEntries.length ? `<h3>${escapeHtml(requirementsHeading)}</h3>${boxesHtml}` : '';
    const rentalToggleTexts = getGearListRentalToggleTexts({ rentalHouse: info && info.rentalHouse });
    const rentalNoteAttr = rentalToggleTexts.noteLabel && rentalToggleTexts.noteLabel.trim()
        ? ` data-rental-note="${escapeHtml(rentalToggleTexts.noteLabel)}"`
        : '';
    const formatItems = (arr, options = {}) => {
        const entries = {};
        arr.filter(Boolean).map(addArriKNumber).forEach(rawItem => {
            const item = rawItem.trim();
            if (!item) return;
            const quantityMatch = item.match(/^(\d+)x\s+(.*)$/);
            const parsedQuantity = quantityMatch ? parseInt(quantityMatch[1], 10) : NaN;
            const quantity = Number.isFinite(parsedQuantity) && parsedQuantity > 0 ? parsedQuantity : 1;
            const namePart = quantityMatch ? quantityMatch[2] : item;
            const match = namePart.trim().match(/^(.*?)(?: \(([^()]+)\))?$/);
            const base = match ? match[1].trim() : namePart.trim();
            const ctx = match && match[2] ? match[2].trim() : '';
            if (!base) return;
            if (!entries[base]) {
                entries[base] = { total: 0, ctxCounts: {}, cameraLink: false, cameraLinkLabel: '' };
            }
            const entry = entries[base];
            entry.total += quantity;
            entry.ctxCounts[ctx] = (entry.ctxCounts[ctx] || 0) + quantity;
            if (typeof options.onItem === 'function') {
                try {
                    options.onItem({
                        rawItem: item,
                        base,
                        context: ctx,
                        quantity,
                        entry,
                    });
                } catch (error) {
                    if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
                        console.warn('formatItems onItem callback failed', error);
                    }
                }
            }
        });
        const rentalTexts = rentalToggleTexts;
        const noteAttr = rentalTexts.noteLabel && rentalTexts.noteLabel.trim()
            ? ` data-rental-note="${escapeHtml(rentalTexts.noteLabel)}"`
            : '';
        return Object.entries(entries)
            .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
            .map(([base, entry]) => {
                const total = entry.total;
                const ctxCounts = entry.ctxCounts;
                const ctxKeys = Object.keys(ctxCounts);
                const hasContext = ctxKeys.some(c => c);
                let ctxParts = [];
                if (hasContext) {
                    if (base === 'sand bag') {
                        const realEntries = Object.entries(ctxCounts)
                            .filter(([c]) => c && c.toLowerCase() !== 'spare')
                            .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                        const usedCount = realEntries.reduce((sum, [, count]) => sum + count, 0);
                        const spareCount = total - usedCount;
                        ctxParts = realEntries.map(([c, count]) => `${count}x ${c}`);
                        if (spareCount > 0) ctxParts.push(`${spareCount}x Spare`);
                    } else if (base.startsWith('Bebob ')) {
                        const realEntries = Object.entries(ctxCounts)
                            .filter(([c]) => c && c.toLowerCase() !== 'spare')
                            .map(([c, count]) => {
                                const qtyMatch = c.match(/^(\d+)x\s+(.*)$/i);
                                if (qtyMatch) {
                                    const [, qty, label] = qtyMatch;
                                    const qtyNum = parseInt(qty, 10);
                                    if (Number.isFinite(qtyNum) && qtyNum > 0) {
                                        return [label.trim(), count * qtyNum];
                                    }
                                }
                                return [c, count];
                            })
                            .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                        const usedCount = realEntries.reduce((sum, [, count]) => sum + count, 0);
                        const spareCount = total - usedCount;
                        ctxParts = realEntries.map(([c, count]) => `${count}x ${c}`);
                        if (spareCount > 0) ctxParts.push(`${spareCount}x Spare`);
                    } else {
                        const realEntries = Object.entries(ctxCounts)
                            .filter(([c]) => c && c.toLowerCase() !== 'spare')
                            .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                        const usedCount = realEntries.reduce((sum, [, count]) => sum + count, 0);
                        const spareCount = Object.entries(ctxCounts)
                            .filter(([c]) => c && c.toLowerCase() === 'spare')
                            .reduce((sum, [, count]) => sum + count, 0);
                        const countsUniform = realEntries.length > 0
                            && realEntries.every(([, count]) => count === realEntries[0][1]);
                        if (countsUniform && spareCount === 0) {
                            ctxParts = realEntries.map(([c]) => c);
                        } else {
                            ctxParts = realEntries.map(([c, count]) => `${count}x ${c}`);
                        }
                        if (spareCount > 0) {
                            ctxParts.push(`${spareCount}x Spare`);
                        } else if (base === 'D-Tap Extension 50 cm') {
                            const remaining = total - usedCount;
                            if (remaining > 0) ctxParts.push(`${remaining}x Spare`);
                        }
                    }
                }
                const ctxStr = ctxParts.length ? ` (${ctxParts.join(', ')})` : '';
                const translatedBase = gearItemTranslations[currentLang]?.[base] || base;
                const displayName = `${translatedBase}${ctxStr}`;
                const dataName = `${base}${ctxStr}`;
                const quantityAttr = ` data-gear-quantity="${escapeHtml(String(total))}"`;
                const labelAttr = ` data-gear-label="${escapeHtml(translatedBase)}"`;
                const attributesAttr = ctxParts.length ? ` data-gear-attributes="${escapeHtml(ctxParts.join(', '))}"` : '';
                const safeDataName = escapeHtml(dataName);
                const textContent = `${total}x ${displayName}`;
                const extraAttrParts = [];
                if (entry.cameraLink) {
                    const attr = buildCameraLinkAttributes(entry.cameraLinkLabel);
                    if (attr) {
                        extraAttrParts.push(attr);
                    }
                }
                const extraAttr = extraAttrParts.length ? ` ${extraAttrParts.join(' ')}` : '';
                return `<span class="gear-item" data-gear-name="${safeDataName}"${quantityAttr}${labelAttr}${attributesAttr}${noteAttr}${extraAttr}><span class="gear-item-text">${escapeHtml(textContent)}</span><span class="gear-item-note" hidden></span></span>`;
            })
            .join('<br>');
    };
    const wrapGearItemHtml = (contentHtml, options = {}) => {
        if (!contentHtml) return '';
        const {
            name = '',
            quantity = '',
            label = '',
            attributes = '',
            rentalNote = rentalNoteAttr,
            extraAttributes = ''
        } = options;
        const nameAttr = name
            ? ` data-gear-name="${escapeHtml(String(name))}"`
            : '';
        const quantityAttr = quantity
            ? ` data-gear-quantity="${escapeHtml(String(quantity))}"`
            : '';
        const labelAttr = label
            ? ` data-gear-label="${escapeHtml(String(label))}"`
            : '';
        const attributesAttr = attributes
            ? ` data-gear-attributes="${escapeHtml(String(attributes))}"`
            : '';
        const rentalAttr = typeof rentalNote === 'string' ? rentalNote : '';
        const extraAttr = extraAttributes
            ? ` ${extraAttributes.trim()}`
            : '';
        return `<span class="gear-item"${nameAttr}${quantityAttr}${labelAttr}${attributesAttr}${rentalAttr}${extraAttr}><span class="gear-item-text">${contentHtml}</span><span class="gear-item-note" hidden></span></span>`;
    };
    const ensureItems = (arr, categoryPath) => {
        if (typeof registerDevice !== 'function') return;
        const entries = {};
        arr.filter(Boolean).forEach(item => {
            const match = item.trim().match(/^(.*?)(?: \(([^()]+)\))?$/);
            const base = match ? match[1].trim() : item.trim();
            entries[base] = entries[base] || {};
        });
        if (Object.keys(entries).length) {
            registerDevice(categoryPath, entries);
        }
    };
    const categoryGroups = [];
    const addRow = (cat, items) => {
        const rawLabel = typeof cat === 'string' ? cat : String(cat ?? '');
        const categoryLabel = rawLabel.trim() || String(cat ?? '');
        const categoryKey = createCustomCategoryKey(categoryLabel);
        const safeLabel = escapeHtml(categoryLabel);
        const addLabel = resolveGearListCustomText('gearListAddCustomItem', 'Add custom item');
        const addAria = resolveGearListCustomText('gearListAddCustomItemToCategory', 'Add custom item to {category}', { category: categoryLabel });
        const glyph = typeof ICON_GLYPHS === 'object' && ICON_GLYPHS ? (ICON_GLYPHS.add || ICON_GLYPHS.plus) : null;
        const addIcon = (typeof iconMarkup === 'function' && glyph)
            ? iconMarkup(glyph, { className: 'btn-icon' })
            : '';
        const buttonContent = addIcon || escapeHtml('+');
        const addButtonHtml = `<button type="button" class="gear-custom-add-btn" data-gear-custom-add="${escapeHtml(categoryKey)}" data-gear-custom-category="${safeLabel}" aria-label="${escapeHtml(addAria)}" title="${escapeHtml(addLabel)}">${buttonContent}</button>`;
        const standardItemsHtml = items ? `<div class="gear-standard-items">${items}</div>` : '';
        const customSectionHtml = `<div class="gear-custom-section" data-gear-custom-key="${escapeHtml(categoryKey)}" data-gear-custom-category="${safeLabel}"><div class="gear-custom-items" data-gear-custom-list="${escapeHtml(categoryKey)}" data-gear-custom-category="${safeLabel}" aria-live="polite"></div></div>`;
        const rowContent = `${standardItemsHtml}${customSectionHtml}`;
        categoryGroups.push(
            `<tbody class="category-group" data-gear-table-category="${safeLabel}" data-gear-custom-key="${escapeHtml(categoryKey)}"><tr class="category-row"><td data-gear-category-label="${safeLabel}"><div class="gear-category-header"><span class="gear-category-label">${safeLabel}</span>${addButtonHtml}</div></td></tr><tr><td>${rowContent}</td></tr></tbody>`
        );
    };
    addRow('Camera', formatItems([selectedNames.camera]));
    const cameraSupportText = formatItems(supportAccNoCages);
    let cageSelectHtml = '';
    if (compatibleCages.length) {
        const options = compatibleCages
            .map(c => `<option value="${escapeHtml(c)}"${c === selectedNames.cage ? ' selected' : ''}>${escapeHtml(addArriKNumber(c))}</option>`)
            .join('');
        const cageLabelTextRaw = typeof localGetLocalizedText === 'function'
            ? localGetLocalizedText('category_cages')
            : '';
        const cageLabelText = cageLabelTextRaw && cageLabelTextRaw.trim()
            ? cageLabelTextRaw.trim()
            : 'Camera Cage';
        const ariaLabelAttr = cageLabelText
            ? ` aria-label="${escapeHtml(cageLabelText)}"`
            : '';
        const hiddenLabelHtml = cageLabelText
            ? `<span class="visually-hidden">${escapeHtml(cageLabelText)}</span>`
            : '';
        const wrapperHtml = `<span class="cage-select-wrapper"><span>1x</span>${hiddenLabelHtml}<select id="gearListCage"${ariaLabelAttr}>${options}</select></span>`;
        const attributesText = selectedNames.cage ? selectedNames.cage.trim() : '';
        const dataName = attributesText
            ? `${cageLabelText} (${attributesText})`
            : cageLabelText;
        const cageExtraAttributes = selectedNames.cage && hasCameraForLinking
            ? buildCameraLinkAttributes(selectedNames.cage)
            : '';
        cageSelectHtml = wrapGearItemHtml(wrapperHtml, {
            name: dataName,
            quantity: 1,
            label: cageLabelText,
            attributes: attributesText,
            extraAttributes: cageExtraAttributes,
        });
    }
    addRow('Camera Support', [cameraSupportText, cageSelectHtml].filter(Boolean).join('<br>'));
    const storageGearListItems = Array.isArray(info.storageRequirements)
        ? info.storageRequirements
            .map(entry => {
                if (!entry || typeof entry !== 'object') return '';
                const quantity = Number.isFinite(entry.quantity) && entry.quantity > 0 ? entry.quantity : null;
                const type = typeof entry.type === 'string' ? entry.type.trim() : '';
                const variant = typeof entry.variant === 'string' ? entry.variant.trim() : '';
                const notes = typeof entry.notes === 'string' ? entry.notes.trim() : '';
                if (!quantity && !type && !variant && !notes) return '';
                const contextParts = [];
                const normalizedType = type.toLowerCase();
                let display = variant || '';
                if (display) {
                    const normalizedVariant = display.toLowerCase();
                    if (normalizedType && !normalizedVariant.includes(normalizedType) && type) {
                        contextParts.push(type);
                    }
                } else if (type) {
                    display = type;
                }
                if (!display) {
                    display = storageFallbackLabel;
                }
                if (notes) {
                    contextParts.push(notes);
                }
                const context = contextParts.length ? ` (${contextParts.join(', ')})` : '';
                const prefix = quantity ? `${quantity}x ` : '';
                return `${prefix}${display}${context}`.trim();
            })
            .filter(Boolean)
        : [];
    const cam = devices && devices.cameras && selectedNames.camera
        ? devices.cameras[selectedNames.camera]
        : null;
    let mediaItems = '';
    if (storageGearListItems.length) {
        mediaItems = formatItems(storageGearListItems);
    } else {
        if (cam && Array.isArray(cam.recordingMedia) && cam.recordingMedia.length) {
            const sizeMap = {
                'CFexpress Type A': '320GB',
                'CFast 2.0': '512GB',
                'CFexpress Type B': '512GB',
                'Codex Compact Drive': '1TB',
                'AXS Memory A-Series slot': '1TB',
                'SD': '128GB',
                'SD Card': '128GB',
                'SDXC': '128GB',
                'XQD Card': '120GB',
                'RED MINI-MAG': '512GB',
                'REDMAG 1.8" SSD': '512GB',
                'Blackmagic Media Module': '8TB',
                'DJI PROSSD': '1TB',
                'USB-C 3.1 Gen 1 expansion port for external media': '1TB',
                'USB-C 3.1 Gen 2 expansion port for external media': '1TB',
                'USB-C to external SSD/HDD': '1TB'
            };
            mediaItems = cam.recordingMedia
                .slice(0, 1)
                .map(m => {
                    const type = m && m.type ? m.type : '';
                    if (!type) return '';
                    let size = '';
                    if (m.notes) {
                        const match = m.notes.match(/(\d+(?:\.\d+)?\s*(?:TB|GB))/i);
                        if (match) size = match[1].toUpperCase();
                    }
                    if (!size) size = sizeMap[type] || '512GB';
                    return `4x ${escapeHtml(size)} ${escapeHtml(type)}<br>2x ${escapeHtml(type)} reader with USB-C`;
                })
                .filter(Boolean)
                .join('<br>');
        }
    }
    addRow('Media', mediaItems);
    const cameraRequiredImageCircle = (() => {
        if (!cam) return null;
        const rawValue = cam.requiredImageCircleMm ?? cam.requiredImageCircle;
        const parsed = Number(rawValue);
        return Number.isFinite(parsed) ? parsed : null;
    })();
    const lensCoverageWarningText = resolveGearListCustomText(
        'gearListLensCoverageWarning',
        'This lens may not cover the full sensor of this camera!'
    );
    const normalizeFocusScaleValue = (value) => {
        if (typeof value !== 'string') {
            return '';
        }
        const normalized = value.trim().toLowerCase();
        return normalized === 'imperial' || normalized === 'metric' ? normalized : '';
    };
    const resolveFocusScaleMode = () => {
        const scope =
            (typeof globalThis !== 'undefined' && globalThis)
            || (typeof window !== 'undefined' && window)
            || (typeof self !== 'undefined' && self)
            || (typeof global !== 'undefined' && global)
            || null;
        const scopePreference = scope && typeof scope.focusScalePreference === 'string'
            ? scope.focusScalePreference
            : null;
        const rawPreference = scopePreference
            || (typeof focusScalePreference === 'string' ? focusScalePreference : null)
            || 'metric';
        const normalized = normalizeFocusScaleValue(rawPreference);
        return normalized || 'metric';
    };
    const focusScaleMode = resolveFocusScaleMode();
    const useImperialFocusScale = focusScaleMode === 'imperial';
    const resolveLensFocusScaleMode = (lens) => {
        if (!lens || typeof lens !== 'object') {
            return focusScaleMode;
        }
        const override = normalizeFocusScaleValue(lens.focusScale);
        return override || focusScaleMode;
    };
    const focusScaleLang = typeof currentLang === 'string' && currentLang.trim() ? currentLang : 'en';
    const formatLensNumber = (value, options = {}) => {
        const numeric = typeof value === 'string' ? Number(value) : value;
        if (!Number.isFinite(numeric)) {
            return '';
        }
        const maximumFractionDigits = typeof options.maximumFractionDigits === 'number'
            ? options.maximumFractionDigits
            : 0;
        const minimumFractionDigits = typeof options.minimumFractionDigits === 'number'
            ? options.minimumFractionDigits
            : Math.min(0, maximumFractionDigits);
        if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
            try {
                return new Intl.NumberFormat(focusScaleLang, {
                    maximumFractionDigits,
                    minimumFractionDigits,
                }).format(numeric);
            } catch (formatError) {
                void formatError;
            }
        }
        const digits = Math.max(minimumFractionDigits, Math.min(20, maximumFractionDigits));
        try {
            return numeric.toFixed(digits);
        } catch (toFixedError) {
            void toFixedError;
        }
        return String(numeric);
    };
    const formatLensWeight = (value, mode = focusScaleMode) => {
        const numeric = typeof value === 'string' ? Number(value) : value;
        if (!Number.isFinite(numeric)) {
            return '';
        }
        const useImperial = mode === 'imperial';
        if (useImperial) {
            const pounds = numeric / 453.59237;
            const digits = pounds >= 10 ? 1 : 2;
            const formatted = formatLensNumber(pounds, { maximumFractionDigits: digits, minimumFractionDigits: 0 });
            return formatted ? `${formatted} lb` : '';
        }
        const formatted = formatLensNumber(numeric, { maximumFractionDigits: 0, minimumFractionDigits: 0 });
        return formatted ? `${formatted} g` : '';
    };
    const formatLensDiameter = (value, mode = focusScaleMode) => {
        const numeric = typeof value === 'string' ? Number(value) : value;
        if (!Number.isFinite(numeric)) {
            return '';
        }
        const useImperial = mode === 'imperial';
        if (useImperial) {
            const inches = numeric / 25.4;
            const digits = inches >= 10 ? 1 : 2;
            const formatted = formatLensNumber(inches, { maximumFractionDigits: digits, minimumFractionDigits: 0 });
            return formatted ? `${formatted} in` : '';
        }
        const formatted = formatLensNumber(numeric, { maximumFractionDigits: 1, minimumFractionDigits: 0 });
        return formatted ? `${formatted} mm` : '';
    };
    const formatLensMinFocus = (value, mode = focusScaleMode) => {
        const numeric = typeof value === 'string' ? Number(value) : value;
        if (!Number.isFinite(numeric)) {
            return '';
        }
        const useImperial = mode === 'imperial';
        if (useImperial) {
            const feet = numeric * 3.280839895;
            const digits = feet < 10 ? 2 : 1;
            const formatted = formatLensNumber(feet, { maximumFractionDigits: digits, minimumFractionDigits: digits });
            return formatted ? `${formatted} ft` : '';
        }
        const digits = numeric < 1 ? 2 : 1;
        const formatted = formatLensNumber(numeric, { maximumFractionDigits: digits, minimumFractionDigits: digits });
        return formatted ? `${formatted} m` : '';
    };
    const formatRodLength = (value, mode = focusScaleMode) => {
        const numeric = typeof value === 'string' ? Number(value) : value;
        if (!Number.isFinite(numeric)) {
            return '';
        }
        const useImperial = mode === 'imperial';
        if (useImperial) {
            const inches = numeric / 2.54;
            const digits = inches >= 10 ? 1 : 2;
            const formatted = formatLensNumber(inches, { maximumFractionDigits: digits, minimumFractionDigits: 0 });
            return formatted ? `${formatted} in` : '';
        }
        const formatted = formatLensNumber(numeric, { maximumFractionDigits: 1, minimumFractionDigits: 0 });
        return formatted ? `${formatted} cm` : '';
    };

    const lensDisplayNames = selectedLensNames.map(name => {
        const lens = devices.lenses && devices.lenses[name];
        const base = addArriKNumber(name);
        if (!lens) return base;
        const lensFocusScaleMode = resolveLensFocusScaleMode(lens);
        const attrs = [];
        const formattedWeight = formatLensWeight(lens.weight_g, lensFocusScaleMode);
        if (formattedWeight) attrs.push(formattedWeight);
        if (lens.clampOn) {
            if (lens.frontDiameterMm) {
                const formattedDiameter = formatLensDiameter(lens.frontDiameterMm, lensFocusScaleMode);
                attrs.push(formattedDiameter ? `${formattedDiameter} clamp-on` : 'clamp-on');
            }
            else attrs.push('clamp-on');
        } else if (lens.clampOn === false) {
            attrs.push('no clamp-on');
        }
        const minFocus = lens.minFocusMeters ?? lens.minFocus ?? (lens.minFocusCm ? lens.minFocusCm / 100 : null);
        if (Number.isFinite(minFocus) && minFocus > 0) {
            const formattedMinFocus = formatLensMinFocus(minFocus, lensFocusScaleMode);
            if (formattedMinFocus) {
                attrs.push(`${formattedMinFocus} min focus`);
            }
        }
        const lensImageCircle = Number(lens.imageCircleMm ?? lens.imageCircle);
        const needsCoverageWarning = Number.isFinite(cameraRequiredImageCircle)
            && Number.isFinite(lensImageCircle)
            && lensImageCircle + 0.5 < cameraRequiredImageCircle;
        if (needsCoverageWarning && lensCoverageWarningText) {
            attrs.push(lensCoverageWarningText);
        }
        return attrs.length ? `${base} (${attrs.join(', ')})` : base;
    });
    addRow('Lens', formatItems(lensDisplayNames));
    const parseRodTypes = raw => {
        if (!raw && raw !== 0) return [];
        const values = Array.isArray(raw) ? raw : [raw];
        const rodSet = new Set();
        values.forEach(value => {
            const text = (value ?? '').toString().toLowerCase();
            if (!text) return;
            if (/\b15\s*mm\b/.test(text)) rodSet.add('15mm');
            if (/\b19\s*mm\b/.test(text)) rodSet.add('19mm');
        });
        const order = ['15mm', '19mm'];
        return order.filter(type => rodSet.has(type));
    };
    const lensSupportItems = [];
    const addedRodPairs = new Set();
    selectedLensNames.forEach(name => {
        const lens = devices.lenses && devices.lenses[name];
        if (!lens) return;
        const normalizedRodTypes = parseRodTypes(lens.rodStandard);
        const rodType = normalizedRodTypes[0] || (lens.rodStandard ? lens.rodStandard : '15mm');
        const baseRodType = normalizedRodTypes[0] || (rodType === '19mm' ? '19mm' : '15mm');
        const rodLength = lens.rodLengthCm || (baseRodType === '19mm' ? 45 : 30);
        const rodKey = `${baseRodType}-${rodLength}`;
        if (!addedRodPairs.has(rodKey)) {
            const formattedRodLength = formatRodLength(rodLength, resolveLensFocusScaleMode(lens));
            const rodLengthLabel = formattedRodLength || `${rodLength}cm`;
            lensSupportItems.push(`${baseRodType} rods ${rodLengthLabel}`);
            addedRodPairs.add(rodKey);
        }
        if (lens.needsLensSupport) {
            lensSupportItems.push(`${baseRodType} lens support`);
        }
    });
    addRow('Lens Support', formatItems(lensSupportItems));
    addRow('Matte box + filter', [filterSelectHtml, formatItems(filterSelections)].filter(Boolean).join('<br>'));
    const motorItems = [];
    const clmSpareAdded = { clm3: false, clm4: false, clm5: false };
    selectedNames.motors.forEach(name => {
        const lower = (name || '').toLowerCase();
        let primaryItem = '';
        if (/cforce\s*mini\s*rf|cforce\s*rf/.test(lower)) {
            primaryItem = 'ARRI KK.0040345 CFORCE MINI RF Basic Set 2';
            motorItems.push(primaryItem);
        } else if (/cforce\s*mini/.test(lower) && !/rf/.test(lower)) {
            primaryItem = 'ARRI KK.0040344 Cforce Mini Basic Set 2';
            motorItems.push(primaryItem);
        } else if (/cforce\s*plus/.test(lower)) {
            primaryItem = 'Arri KK.0008824 cforce plus Basic Set';
            motorItems.push(primaryItem);
            motorItems.push('ARRI K2.0009335 Cforce Plus Gear M0.8/32p, 60t');
        } else if (/clm-3/.test(lower)) {
            primaryItem = 'Arri KK.0005854 Controlled Lens Motor CLM-3 Basic Set';
            motorItems.push(primaryItem);
            if (!clmSpareAdded.clm3) {
                motorItems.push('Arri K2.65145.0, Cable CLM-3 (7p) - CLM/FIZ (12p) (0,8m/2.6ft) (spare)');
                clmSpareAdded.clm3 = true;
            }
        } else if (/clm-4/.test(lower)) {
            primaryItem = 'ARRI Controlled Lens Motor CLM-4, Basic Kit (KK.0005855)';
            motorItems.push(primaryItem);
            if (!clmSpareAdded.clm4) {
                motorItems.push('Arri K2.72099.0 CLM-4 Motor Cable (spare)');
                clmSpareAdded.clm4 = true;
            }
        } else if (/clm-5/.test(lower)) {
            primaryItem = 'Arri K2.0006361 Controlled Lens Motor CLM-5 Basic Set';
            motorItems.push(primaryItem);
            if (!clmSpareAdded.clm5) {
                motorItems.push('Arri K2.0006361 Controlled Lens Motor CLM-5 Basic Set (spare)');
                clmSpareAdded.clm5 = true;
            }
        }
        if (!primaryItem && name) {
            primaryItem = name;
            motorItems.push(name);
        }
        if (primaryItem) {
            registerCameraLinkTarget(primaryItem);
        }
    });
    selectedNames.controllers.forEach(registerCameraLinkTarget);
    const distanceItems = [];
    const distanceName = selectedNames.distance;
    if (distanceName) {
        const lowerName = distanceName.toLowerCase();
        if (lowerName === 'udm-1 + lcube') {
            const udmEntry = 'Arri KK.0005853 Ultrasonic Distance Measure UDM-1 Basic Set';
            distanceItems.push(udmEntry);
            registerCameraLinkTarget(udmEntry);
            const hasRiaController = selectedNames.controllers
                .some(ctrl => /ria-1/i.test(ctrl));
            const isAlexa35 = /alexa 35/i.test(selectedNames.camera || '');
            if (!hasRiaController && !isAlexa35) {
                const lcubeEntry = 'Arri KK.0009001 LCUBE CUB-1 Basic Set';
                distanceItems.push(lcubeEntry);
                registerCameraLinkTarget(lcubeEntry);
            }
        } else {
            distanceItems.push(distanceName);
            registerCameraLinkTarget(distanceName);
        }
    }
    addRow('LDS (FIZ)', formatItems([
        ...motorItems,
        ...selectedNames.controllers,
        ...distanceItems,
        ...fizCableAcc
    ], { onItem: applyCameraLinkFromTargets }));
    let batteryItems = '';
    if (selectedNames.battery) {
        registerCameraLinkTarget(selectedNames.battery);
        let count = batteryCountElem ? parseInt(batteryCountElem.textContent, 10) : NaN;
        if (!count || isNaN(count)) count = 1;
        const batteryEntries = [`${count}x ${selectedNames.battery}`];
        const swapName = hotswapSelect && hotswapSelect.value && hotswapSelect.value !== 'None' ? getText(hotswapSelect) : '';
        if (swapName) {
            batteryEntries.push(`1x ${swapName}`);
            registerCameraLinkTarget(swapName);
        }
        batteryItems = formatItems(batteryEntries, { onItem: applyCameraLinkFromTargets });
    }
    addRow('Camera Batteries', batteryItems);
    let monitoringItems = '';
    const monitorSizes = [];
    if (selectedNames.monitor) {
        const size = devices?.monitors?.[selectedNames.monitor]?.screenSizeInches;
        if (size) monitorSizes.push(size);
        const sizeHtml = size ? `${escapeHtml(String(size))}&quot; - ` : '';
        const monitorLabel = 'Onboard Monitor';
        const monitorName = addArriKNumber(selectedNames.monitor);
        const displayHtml = `1x <strong>${monitorLabel}</strong> - ${sizeHtml}${escapeHtml(monitorName)} - incl. Sunhood`;
        const attributeParts = [];
        if (size) attributeParts.push(`${size}"`);
        if (monitorName) attributeParts.push(monitorName);
        attributeParts.push('incl. Sunhood');
        const attributeText = attributeParts.filter(Boolean).join(' - ');
        const dataName = attributeText ? `${monitorLabel} (${attributeText})` : monitorLabel;
        const monitorExtraAttributes = hasCameraForLinking
            ? buildCameraLinkAttributes(selectedNames.monitor)
            : '';
        monitoringItems += (monitoringItems ? '<br>' : '') + wrapGearItemHtml(displayHtml, {
            name: dataName,
            quantity: 1,
            label: monitorLabel,
            attributes: attributeText,
            extraAttributes: monitorExtraAttributes
        });
    }
    handheldPrefs.forEach(({ role, size }) => {
        const monitorsDb = devices && devices.monitors ? devices.monitors : {};
        const names = Object.keys(monitorsDb)
            .filter(n => (!monitorsDb[n].wirelessTx || monitorsDb[n].wirelessRX))
            .sort(localeSort);
        const infoKey = role === 'DoP' ? 'dopMonitor' : `${role.toLowerCase()}Monitor`;
        const manualFlag = !!info[`${infoKey}Manual`];
        const infoValue = typeof info[infoKey] === 'string' ? info[infoKey].trim() : '';
        const autoDefault = getAutoGearMonitorDefault('handheld7');
        let candidate = '';
        if (manualFlag && infoValue) {
            candidate = infoValue;
        } else if (autoDefault) {
            candidate = autoDefault;
        } else if (infoValue) {
            candidate = infoValue;
        }
        const lowerNames = names.map(n => n.toLowerCase());
        let defaultName = '';
        if (candidate) {
            const matchIndex = lowerNames.indexOf(candidate.toLowerCase());
            if (matchIndex >= 0) {
                defaultName = names[matchIndex];
            }
        }
        if (!defaultName) {
            if (!manualFlag && size) {
                const sized = names.find(n => monitorsDb[n].screenSizeInches === size);
                if (size === 7 && names.includes('SmallHD Ultra 7')) {
                    defaultName = 'SmallHD Ultra 7';
                } else if (sized) {
                    defaultName = sized;
                }
            }
            if (!defaultName) {
                if (!manualFlag && !candidate && names.includes('SmallHD Ultra 7')) {
                    defaultName = 'SmallHD Ultra 7';
                } else if (names.length) {
                    defaultName = names[0];
                } else if (candidate) {
                    defaultName = candidate;
                }
            }
        }
        const optionValues = names.slice();
        if (candidate && !lowerNames.includes(candidate.toLowerCase())) {
            optionValues.unshift(candidate);
        }
        if (defaultName && !optionValues.some(value => value.toLowerCase() === defaultName.toLowerCase())) {
            optionValues.unshift(defaultName);
        }
        const seenOptions = new Set();
        const opts = optionValues
            .filter(Boolean)
            .filter(value => {
                const key = value.toLowerCase();
                if (seenOptions.has(key)) return false;
                seenOptions.add(key);
                return true;
            })
            .map(value => {
                const isSelected = value.toLowerCase() === (defaultName || '').toLowerCase();
                return `<option value="${escapeHtml(value)}"${isSelected ? ' selected' : ''}>${escapeHtml(addArriKNumber(value))}</option>`;
            })
            .join('');
        const idSuffix = role === 'DoP' ? 'Dop' : role;
        const labelRole = role.replace(/s$/, '');
        const resolvedName = Array.from(seenOptions.values()).find(value => value === (defaultName || '').toLowerCase())
            ? optionValues.find(value => value && value.toLowerCase() === (defaultName || '').toLowerCase())
            : defaultName;
        const selectedMonitor = resolvedName && monitorsDb[resolvedName]
            ? monitorsDb[resolvedName]
            : monitorsDb[defaultName] || monitorsDb[candidate] || null;
        const selectedSize = selectedMonitor?.screenSizeInches || '';
        const displayLabel = `${labelRole} Handheld Monitor`;
        const sizeSpanHtml = `<span id="monitorSize${idSuffix}">${escapeHtml(selectedSize ? String(selectedSize) : '')}&quot;</span>`;
        const selectHtml = `<select id="gearList${idSuffix}Monitor" data-auto-gear-manual="${manualFlag ? 'true' : 'false'}">${opts}</select>`;
        const displayHtml = `1x <strong>${escapeHtml(displayLabel)}</strong> - ${sizeSpanHtml} - ${selectHtml} incl. Directors cage, shoulder strap, sunhood, rigging for teradeks`;
        const attributeParts = [];
        if (selectedSize) attributeParts.push(`${selectedSize}"`);
        if (resolvedName) attributeParts.push(addArriKNumber(resolvedName));
        attributeParts.push('incl. Directors cage, shoulder strap, sunhood, rigging for teradeks');
        const attributeText = attributeParts.filter(Boolean).join(' - ');
        const dataName = attributeText ? `${displayLabel} (${attributeText})` : displayLabel;
        monitoringItems += (monitoringItems ? '<br>' : '') + wrapGearItemHtml(displayHtml, {
            name: dataName,
            quantity: 1,
            label: displayLabel,
            attributes: attributeText
        });
        if (selectedSize) monitorSizes.push(selectedSize);
    });
    largeMonitorPrefs.forEach(({ role }) => {
        const dirDb = devices && devices.directorMonitors ? devices.directorMonitors : {};
        const names = Object.keys(dirDb).filter(n => n !== 'None').sort(localeSort);
        const infoKey = role === 'DoP' ? 'dopMonitor15' : role === 'Combo' ? 'comboMonitor15' : 'directorMonitor15';
        const manualFlag = !!info[`${infoKey}Manual`];
        const infoValue = typeof info[infoKey] === 'string' ? info[infoKey].trim() : '';
        const defaultKey = role === 'Combo' ? 'combo15' : 'director15';
        const autoDefault = getAutoGearMonitorDefault(defaultKey);
        let candidate = '';
        if (manualFlag && infoValue) {
            candidate = infoValue;
        } else if (autoDefault) {
            candidate = autoDefault;
        } else if (infoValue) {
            candidate = infoValue;
        }
        const lowerNames = names.map(n => n.toLowerCase());
        let defaultName = '';
        if (candidate) {
            const matchIndex = lowerNames.indexOf(candidate.toLowerCase());
            if (matchIndex >= 0) {
                defaultName = names[matchIndex];
            }
        }
        if (!defaultName) {
            if (names.includes('SmallHD Cine 24" 4K High-Bright Monitor')) {
                defaultName = 'SmallHD Cine 24" 4K High-Bright Monitor';
            } else if (names.length) {
                defaultName = names[0];
            } else if (candidate) {
                defaultName = candidate;
            }
        }
        const optionValues = names.slice();
        if (candidate && !lowerNames.includes(candidate.toLowerCase())) {
            optionValues.unshift(candidate);
        }
        if (defaultName && !optionValues.some(value => value.toLowerCase() === defaultName.toLowerCase())) {
            optionValues.unshift(defaultName);
        }
        const seenOptions = new Set();
        const opts = optionValues
            .filter(Boolean)
            .filter(value => {
                const key = value.toLowerCase();
                if (seenOptions.has(key)) return false;
                seenOptions.add(key);
                return true;
            })
            .map(value => {
                const isSelected = value.toLowerCase() === (defaultName || '').toLowerCase();
                return `<option value="${escapeHtml(value)}"${isSelected ? ' selected' : ''}>${escapeHtml(addArriKNumber(value))}</option>`;
            })
            .join('');
        const idSuffix = role === 'DoP' ? 'Dop' : role;
        const resolvedName = Array.from(seenOptions.values()).find(value => value === (defaultName || '').toLowerCase())
            ? optionValues.find(value => value && value.toLowerCase() === (defaultName || '').toLowerCase())
            : defaultName;
        const size = resolvedName && dirDb[resolvedName]?.screenSizeInches
            ? dirDb[resolvedName].screenSizeInches
            : (dirDb[defaultName]?.screenSizeInches || dirDb[candidate]?.screenSizeInches || '');
        const displayLabel = `${role} Monitor`;
        const sizeSpanHtml = `<span id="monitorSize${idSuffix}15">${escapeHtml(size ? String(size) : '')}&quot;</span>`;
        const selectHtml = `<select id="gearList${idSuffix}Monitor15" data-auto-gear-manual="${manualFlag ? 'true' : 'false'}">${opts}</select>`;
        const displayHtml = `1x <strong>${escapeHtml(displayLabel)}</strong> - ${sizeSpanHtml} - ${selectHtml} incl. sunhood, V-Mount, AC Adapter and Wooden Camera Ultra QR Monitor Mount (Baby Pin, C-Stand)`;
        const attributeParts = [];
        if (size) attributeParts.push(`${size}"`);
        if (resolvedName) attributeParts.push(addArriKNumber(resolvedName));
        attributeParts.push('incl. sunhood, V-Mount, AC Adapter and Wooden Camera Ultra QR Monitor Mount (Baby Pin, C-Stand)');
        const attributeText = attributeParts.filter(Boolean).join(' - ');
        const dataName = attributeText ? `${displayLabel} (${attributeText})` : displayLabel;
        monitoringItems += (monitoringItems ? '<br>' : '') + wrapGearItemHtml(displayHtml, {
            name: dataName,
            quantity: 1,
            label: displayLabel,
            attributes: attributeText
        });
        if (size) monitorSizes.push(size);
    });
    if (hasMotor) {
        const monitorsDb = devices && devices.monitors ? devices.monitors : {};
        const names = Object.keys(monitorsDb)
            .filter(n => (!monitorsDb[n].wirelessTx || monitorsDb[n].wirelessRX))
            .sort(localeSort);
        const manualFlag = !!info.focusMonitorManual;
        const infoValue = typeof info.focusMonitor === 'string' ? info.focusMonitor.trim() : '';
        const autoDefault = getAutoGearMonitorDefault('focus');
        let candidate = '';
        if (manualFlag && infoValue) {
            candidate = infoValue;
        } else if (autoDefault) {
            candidate = autoDefault;
        } else if (infoValue) {
            candidate = infoValue;
        }
        const lowerNames = names.map(n => n.toLowerCase());
        let defaultName = '';
        if (candidate) {
            const matchIndex = lowerNames.indexOf(candidate.toLowerCase());
            if (matchIndex >= 0) {
                defaultName = names[matchIndex];
            }
        }
        if (!defaultName) {
            if (names.includes('TV Logic F7HS')) {
                defaultName = 'TV Logic F7HS';
            } else if (names.length) {
                defaultName = names[0];
            } else if (candidate) {
                defaultName = candidate;
            }
        }
        const optionValues = names.slice();
        if (candidate && !lowerNames.includes(candidate.toLowerCase())) {
            optionValues.unshift(candidate);
        }
        if (defaultName && !optionValues.some(value => value.toLowerCase() === defaultName.toLowerCase())) {
            optionValues.unshift(defaultName);
        }
        const seenOptions = new Set();
        const opts = optionValues
            .filter(Boolean)
            .filter(value => {
                const key = value.toLowerCase();
                if (seenOptions.has(key)) return false;
                seenOptions.add(key);
                return true;
            })
            .map(value => {
                const isSelected = value.toLowerCase() === (defaultName || '').toLowerCase();
                return `<option value="${escapeHtml(value)}"${isSelected ? ' selected' : ''}>${escapeHtml(addArriKNumber(value))}</option>`;
            })
            .join('');
        const resolvedName = Array.from(seenOptions.values()).find(value => value === (defaultName || '').toLowerCase())
            ? optionValues.find(value => value && value.toLowerCase() === (defaultName || '').toLowerCase())
            : defaultName;
        const selectedSize = resolvedName && monitorsDb[resolvedName]
            ? monitorsDb[resolvedName].screenSizeInches
            : (monitorsDb[defaultName]?.screenSizeInches || monitorsDb[candidate]?.screenSizeInches || '');
        const displayLabel = 'Focus Monitor';
        const sizeSpanHtml = `<span id="monitorSizeFocus">${escapeHtml(selectedSize ? String(selectedSize) : '')}&quot;</span>`;
        const selectHtml = `<select id="gearListFocusMonitor" data-auto-gear-manual="${manualFlag ? 'true' : 'false'}">${opts}</select>`;
        const displayHtml = `1x <strong>${escapeHtml(displayLabel)}</strong> - ${sizeSpanHtml} - ${selectHtml} incl Directors cage, shoulder strap, sunhood, rigging for teradeks`;
        const attributeParts = [];
        if (selectedSize) attributeParts.push(`${selectedSize}"`);
        if (resolvedName) attributeParts.push(addArriKNumber(resolvedName));
        attributeParts.push('incl Directors cage, shoulder strap, sunhood, rigging for teradeks');
        const attributeText = attributeParts.filter(Boolean).join(' - ');
        const dataName = attributeText ? `${displayLabel} (${attributeText})` : displayLabel;
        monitoringItems += (monitoringItems ? '<br>' : '') + wrapGearItemHtml(displayHtml, {
            name: dataName,
            quantity: 1,
            label: displayLabel,
            attributes: attributeText
        });
        if (selectedSize) monitorSizes.push(selectedSize);
    }
    const monitoringGear = [];
    const wirelessSize = monitorSizes.includes(5) ? 5 : null;
    if (selectedNames.video) {
        const wirelessSizeHtml = wirelessSize ? `${wirelessSize}&quot; - ` : '';
        const transmitterEntry = `Wireless Transmitter - ${wirelessSizeHtml}${addArriKNumber(selectedNames.video)}`;
        monitoringGear.push(transmitterEntry);
        registerCameraLinkTarget(transmitterEntry);
        const rxName = selectedNames.video.replace(/ TX\b/, ' RX');
        if (devices && devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
            receiverLabels.forEach(label => {
                const receiverEntry = `Wireless Receiver - ${wirelessSizeHtml}${addArriKNumber(rxName)} (${label})`;
                monitoringGear.push(receiverEntry);
                registerCameraLinkTarget(receiverEntry);
            });
        }
    }
    if (monitoringGear.length) {
        const gearHtml = formatItems(monitoringGear, { onItem: applyCameraLinkFromTargets })
            .replace(/>(\d+x )Wireless Transmitter/g, '>$1<strong>Wireless Transmitter</strong>')
            .replace(/>(\d+x )Wireless Receiver/g, '>$1<strong>Wireless Receiver</strong>')
            .replace(/&amp;quot;/g, '&quot;');
        monitoringItems += (monitoringItems ? '<br>' : '') + gearHtml;
    }
    const monitorBatterySelections = (() => {
        const source = info.monitorBatteries;
        if (!source || typeof source !== 'object' || Array.isArray(source)) return {};
        const entries = {};
        Object.entries(source).forEach(([key, value]) => {
            if (typeof key !== 'string') return;
            if (typeof value !== 'string') return;
            const trimmed = value.trim();
            if (!trimmed) return;
            entries[key] = trimmed;
        });
        return entries;
    })();
    const batteryDatabase = devices && devices.batteries ? devices.batteries : {};
    const baseBatteryOptions = Object.keys(batteryDatabase)
        .filter(name => name && name !== 'None')
        .sort(localeSort);
    const buildBatteryOptions = (selectedValue) => {
        const normalizedSelected = typeof selectedValue === 'string' ? selectedValue.trim() : '';
        const optionValues = baseBatteryOptions.slice();
        if (normalizedSelected && !optionValues.some(value => value.toLowerCase() === normalizedSelected.toLowerCase())) {
            optionValues.unshift(normalizedSelected);
        }
        const seen = new Set();
        return optionValues
            .filter(Boolean)
            .filter(value => {
                const key = value.toLowerCase();
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            })
            .map(value => {
                const isSelected = normalizedSelected && value.toLowerCase() === normalizedSelected.toLowerCase();
                return `<option value="${escapeHtml(value)}"${isSelected ? ' selected' : ''}>${escapeHtml(addArriKNumber(value))}</option>`;
            })
            .join('');
    };
    const monitoringBatteryItems = [];
    const bebob98 = Object.keys(batteryDatabase).find(n => /V98micro/i.test(n)) || 'Bebob V98micro';
    handheldPrefs.forEach((p, index) => {
        const roleNameRaw = typeof p.role === 'string' ? p.role : '';
        const roleName = roleNameRaw.trim();
        const contextLabel = `${roleName || 'Monitor'} handheld`;
        const key = `handheld:${roleName}:${index}`;
        const storedValue = monitorBatterySelections[key];
        const selectedValue = (typeof storedValue === 'string' && storedValue.trim()) || bebob98;
        if (!selectedValue) return;
        const roleId = (roleName || 'Monitor').replace(/[^A-Za-z0-9]/g, '') || 'Monitor';
        const selectId = `gearListMonitorBatteryHandheld${index}${roleId}`;
        const optionsHtml = buildBatteryOptions(selectedValue);
        const selectHtml = `<select id="${selectId}" data-monitor-battery-key="${escapeHtml(key)}" data-monitor-battery-type="handheld" data-monitor-battery-role="${escapeHtml(roleName)}">${optionsHtml}</select>`;
        const dataName = `Monitoring Battery ${contextLabel}`;
        const quantityAttr = ' data-gear-quantity="3"';
        const labelAttr = ' data-gear-label="Monitoring Battery"';
        const attributesAttr = contextLabel ? ` data-gear-attributes="${escapeHtml(contextLabel)}"` : '';
        const textHtml = `3x ${selectHtml} (${escapeHtml(contextLabel)})`;
        monitoringBatteryItems.push(
            `<span class="gear-item" data-gear-name="${escapeHtml(dataName)}"${quantityAttr}${labelAttr}${attributesAttr}${rentalNoteAttr}><span class="gear-item-text">${textHtml}</span><span class="gear-item-note" hidden></span></span>`
        );
    });
    const bebob290 = Object.keys(batteryDatabase).find(n => /V290RM-Cine/i.test(n)) || 'Bebob V290RM-Cine';
    largeMonitorPrefs.forEach((p, index) => {
        const roleNameRaw = typeof p.role === 'string' ? p.role : '';
        const roleName = roleNameRaw.trim();
        const contextLabel = `${roleName || 'Monitor'} 15-21"`;
        const key = `large:${roleName}:${index}`;
        const storedValue = monitorBatterySelections[key];
        const selectedValue = (typeof storedValue === 'string' && storedValue.trim()) || bebob290;
        if (!selectedValue) return;
        const roleId = (roleName || 'Monitor').replace(/[^A-Za-z0-9]/g, '') || 'Monitor';
        const selectId = `gearListMonitorBatteryLarge${index}${roleId}`;
        const optionsHtml = buildBatteryOptions(selectedValue);
        const selectHtml = `<select id="${selectId}" data-monitor-battery-key="${escapeHtml(key)}" data-monitor-battery-type="large" data-monitor-battery-role="${escapeHtml(roleName)}">${optionsHtml}</select>`;
        const dataName = `Monitoring Battery ${contextLabel}`;
        const quantityAttr = ' data-gear-quantity="2"';
        const labelAttr = ' data-gear-label="Monitoring Battery"';
        const attributesAttr = contextLabel ? ` data-gear-attributes="${escapeHtml(contextLabel)}"` : '';
        const textHtml = `2x ${selectHtml} (${escapeHtml(contextLabel)})`;
        monitoringBatteryItems.push(
            `<span class="gear-item" data-gear-name="${escapeHtml(dataName)}"${quantityAttr}${labelAttr}${attributesAttr}${rentalNoteAttr}><span class="gear-item-text">${textHtml}</span><span class="gear-item-note" hidden></span></span>`
        );
    });
    addRow('Monitoring Batteries', monitoringBatteryItems.length ? monitoringBatteryItems.join('<br>') : '');
    addRow('Chargers', formatItems(chargersAcc));
    addRow('Monitoring', monitoringItems);
    ensureItems(monitoringSupportAcc, 'accessories.monitoringSupport');
    const monitoringSupportHardware = formatItems(monitoringSupportAcc);
    const monitoringSupportItems = monitoringSupportHardware;
    addRow('Monitoring support', monitoringSupportItems);
    const cartsTransportationItems = [];
    ensureItems(cartsTransportationItems, 'accessories.carts');
    const gripItems = [];
    let needsStandardTripod = false;
    let sliderSelectHtml = '';
    let easyrigSelectHtml = '';
    handheldPrefs.forEach(p => {
        gripItems.push(`Avenger C-Stand Sliding Leg 20" (${p.role} handheld)`);
        gripItems.push(`Steelfingers Wheel C-Stand 3er Set (${p.role} handheld)`);
        gripItems.push(`Lite-Tite Swivel Aluminium Umbrella Adapter (${p.role} handheld)`);
        riggingAcc.push(`Spigot with male 3/8" and 1/4" (${p.role} handheld)`);
    });
    largeMonitorPrefs.forEach(p => {
        gripItems.push(`Matthews Monitor Stand II (249562) (${p.role} 15-21")`);
        gripItems.push(`Avenger C590 Conka Bonka Stativ-Verlängerungen Set (${p.role} 15-21")`);
        gripItems.push(`Impact Baby to Junior Receiver Adapter (${p.role} 15-21")`);
        gripItems.push(`Matthews BIG F'ING Monitor Wheel Set (3 pieces) (${p.role} 15-21")`);
        riggingAcc.push(`ULCS Bracket with 1/4" to 1/4" (${p.role} 15-21")`);
        gripItems.push(`Manfrotto 635 Quick-Action Super Clamp (${p.role} 15-21")`);
        riggingAcc.push(`Spigot with male 3/8" and 1/4" (${p.role} 15-21")`);
        riggingAcc.push(`Cine Quick Release (${p.role} 15-21")`);
        riggingAcc.push(`D-Tap Splitter (${p.role} 15-21")`);
        riggingAcc.push(`D-Tap Splitter (${p.role} 15-21")`);
    });
    if (isScenarioActive('Easyrig')) {
        const stabiliser = devices && devices.accessories && devices.accessories.cameraStabiliser && devices.accessories.cameraStabiliser['Easyrig 5 Vario'];
        const opts = stabiliser && Array.isArray(stabiliser.options) ? stabiliser.options : [];
        const options = ['no further stabilisation', ...opts];
        const optsHtml = options.map(o => `<option value="${escapeHtml(o)}">${escapeHtml(addArriKNumber(o))}</option>`).join('');
        easyrigSelectHtml = `1x Easyrig 5 Vario <select id="gearListEasyrig">${optsHtml}</select>`;
    }
    if (hasGimbal) {
        gripItems.push(...gimbalSelectionsFinal);
    }
    const frictionArmCount = hasGimbal ? 2 : 1;
    gripItems.push(...Array(frictionArmCount).fill('Manfrotto 244N Friktion Arm'));
    if (hasGimbal) {
        gripItems.push('Avenger D200B Grip Head');
        gripItems.push('Spigot with male 3/8" and 1/4"');
    }
    if (isScenarioActive('Cine Saddle')) gripItems.push('Cinekinetic Cinesaddle');
    if (isScenarioActive('Steadybag')) gripItems.push('Steadybag');
    if (isScenarioActive('Jib')) {
        gripItems.push('Pro Sup EJIb-Arm');
        gripItems.push('Jib counter weights');
        needsStandardTripod = true;
    }
    if (isScenarioActive('Slider')) {
        const options = ['', '75er bowl', '100er bowl', '150er bowl', 'Mitchell Mount'].map(o => `<option value="${escapeHtml(o)}"${o === info.sliderBowl ? ' selected' : ''}>${escapeHtml(addArriKNumber(o))}</option>`).join('');
        sliderSelectHtml = `1x Prosup Tango Roller <select id="gearListSliderBowl">${options}</select>`;
        gripItems.push('Avenger Combo Stand 10 A1010CS 64-100 cm black');
        gripItems.push('Avenger Combo Stand 10 A1010CS 64-100 cm black');
        gripItems.push('Avenger Combo Stand 20 A1020B 110-198 cm black');
        gripItems.push('Avenger Combo Stand 20 A1020B 110-198 cm black');
        gripItems.push('Apple Box Set / Bühnenkisten Set');
        gripItems.push('Apple Box Set / Bühnenkisten Set');
        gripItems.push('Paganini set');
        gripItems.push('Sand bag (Slider)');
        gripItems.push('Sand bag (Slider)');
        gripItems.push('Cable mat');
        gripItems.push('Cable mat');
        gripItems.push('Cable mat');
    }
    if (isScenarioActive('Slider') && isScenarioActive('Undersling mode')) {
        gripItems.push('Tango Beam');
    }
    if (isScenarioActive('Outdoor')) {
        riggingAcc.push('Spigot with male 3/8" and 1/4" (Focus Umbrella)');
    }
    if (isAnyScenarioActive(['Extreme heat', 'Extreme rain', 'Rain Machine'])) {
        gripItems.push('Large Umbrella');
        gripItems.push('Avenger A5036CS Roller 36 Low Base with Umbrella Mounting');
    }
    const tripodTypes = info.tripodTypes ? info.tripodTypes.split(',').map(s => s.trim()).filter(Boolean) : [];
    const bowlType = info.tripodBowl;
    const spreader = info.tripodSpreader;
    const headBrand = info.tripodHeadBrand;
    const headMap = {
        'OConnor': {
            '100mm bowl': "O'Connor Ultimate 1040 Fluid-Head",
            '150mm bowl': "O'Connor Ultimate 2560 Fluid-Head",
            'Mitchell Mount': "O'Connor Ultimate 2560 Fluid-Head"
        },
        'Sachtler': {
            '75mm bowl': 'Sachtler aktiv8T S2068T',
            '100mm bowl': 'Sachtler aktiv18T S2088T',
            '150mm bowl': 'Sachtler Cine 30 3007'
        }
    };
    const headName = headMap[headBrand] && headMap[headBrand][bowlType];
    if (headName) {
        gripItems.push(`${headName} ${bowlType}`);
    }
    tripodTypes.forEach(t => {
        const typeLabel = t === 'Hi-Head' ? 'Hi-Head' : `${t} Tripod`;
        const base = bowlType ? `${bowlType} ${typeLabel}` : typeLabel;
        if (t === 'Hi-Head') {
            gripItems.push(base);
        } else if (spreader) {
            gripItems.push(`${base} + ${spreader}`);
        } else {
            gripItems.push(base);
        }
        if (t === 'Short') {
            gripItems.push('Sand bag (Short Tripod)');
        }
        if (t === 'Hi-Head') {
            gripItems.push('Sand bag (Hi-Head)');
        }
    });
    if (needsStandardTripod && !gripItems.some(item => /Long Tripod/.test(item))) {
        gripItems.push('Long Tripod');
    }
    const standCount = gripItems.filter(item => /\bstand\b/i.test(item) && !/wheel/i.test(item)).length;
    if (standCount) {
        gripItems.push(...Array(standCount * 3).fill('Tennis ball'));
    }
    const maglinerCount = cartsTransportationItems.filter(item => /Magliner/i.test(item)).length;
    if (maglinerCount) {
        gripItems.push(...Array(maglinerCount * 2).fill('Wooden wedge'));
    }
    ensureItems(riggingAcc, 'accessories.rigging');
    ensureItems(gripItems, 'accessories.grip');
    const riggingItems = formatItems(riggingAcc);
    addRow('Rigging', riggingItems);
    const powerItems = [
        'Power Cable Drum 25-50 m',
        ...Array(2).fill('Power Cable 10 m'),
        ...Array(2).fill('Power Cable 5 m'),
        ...Array(3).fill('Power Strip'),
        ...Array(3).fill('PRCD-S (Portable Residual Current Device-Safety)'),
        ...Array(3).fill('Power Three Way Splitter')
    ];
    if (isScenarioActive('Studio')) {
        powerItems.push('Camera Power Supply');
    }
    ensureItems(powerItems, 'accessories.power');
    addRow('Power', formatItems(powerItems));
    addRow('Grip', [sliderSelectHtml, formatItems(gripItems), easyrigSelectHtml].filter(Boolean).join('<br>'));
    addRow('Carts and Transportation', formatItems(cartsTransportationItems));
    const miscExcluded = new Set([
        'D-Tap to LEMO 2-pin',
        'HDMI Cable',
        'BNC SDI Cable',
        'Ultraslim BNC Cable 0.5 m'
    ]);
    const miscItems = [...miscAcc].filter(item => !miscExcluded.has(item));
    const consumables = [];
    const hasViewfinder = Array.isArray(cam?.viewfinder) && cam.viewfinder.length > 0;
    let eyeLeatherColor = info.viewfinderEyeLeatherColor || 'red';
    const gaffTapeSelections = [
        { id: 1, color: info.proGaffColor1 || 'red', width: info.proGaffWidth1 || '24mm' },
        { id: 2, color: info.proGaffColor2 || 'blue', width: info.proGaffWidth2 || '24mm' }
    ];
    const baseConsumables = [
        { name: 'Kimtech Wipes', count: 1 },
        { name: 'Sprigs Red 1/4"', count: 1, noScale: true },
        { name: 'Clapper Stick', count: 2, klappen: true }
    ];
    let eyeLeatherCount = hasViewfinder ? 2 : 0;
    let shootDays = 0;
    let isWinterShoot = false;
    const shootRanges = Array.isArray(info.shootingDays)
        ? info.shootingDays
        : (info.shootingDays ? [info.shootingDays] : []);
    const winterMonths = new Set([9, 10, 11, 0, 1, 2, 3, 4]);
    shootRanges.forEach(r => {
        const parts = r.split(' to ');
        if (parts.length === 2) {
            const start = new Date(parts[0]);
            const end = new Date(parts[1]);
            if (!isNaN(start) && !isNaN(end)) {
                shootDays += Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
                if (!isWinterShoot) {
                    const m = new Date(start);
                    m.setHours(0, 0, 0, 0);
                    while (m <= end) {
                        if (winterMonths.has(m.getMonth())) {
                            isWinterShoot = true;
                            break;
                        }
                        m.setMonth(m.getMonth() + 1);
                    }
                }
            }
        }
    });
    let multiplier = 1;
    if (shootDays > 21) {
        multiplier = 4;
    } else if (shootDays > 14) {
        multiplier = 3;
    } else if (shootDays > 7) {
        multiplier = 2;
    }
    const klappenMultiplier = multiplier % 2 === 0 ? multiplier : Math.max(1, multiplier - 1);
    for (const item of baseConsumables) {
        let count = item.count;
        if (item.noScale) {
            // no scaling
        } else if (item.klappen) {
            count *= klappenMultiplier;
        } else {
            count *= multiplier;
        }
        for (let i = 0; i < count; i++) consumables.push(item.name);
    }
    if (eyeLeatherCount) eyeLeatherCount *= multiplier;
    const needsRainProtection = isAnyScenarioActive(['Outdoor', 'Extreme rain', 'Rain Machine']);
    if (needsRainProtection && selectedNames.camera) {
        miscItems.push(`Rain Cover ${addArriKNumber(selectedNames.camera)}`);
    }
    const needsUmbrellas = needsRainProtection || isScenarioActive('Extreme heat');
    if (needsUmbrellas) {
        if (!miscItems.includes('Umbrella for Focus Monitor')) miscItems.push('Umbrella for Focus Monitor');
        if (!miscItems.includes('Umbrella Magliner incl Mounting to Magliner')) miscItems.push('Umbrella Magliner incl Mounting to Magliner');
    }
    if (needsRainProtection) {
        const monitorSizes = [];
        if (monitorSelect && monitorSelect.value) {
            const m = devices.monitors[monitorSelect.value];
            if (m && m.screenSizeInches) monitorSizes.push(m.screenSizeInches);
        }
        const monitorsAbove10 = monitorSizes.filter(s => s > 10).length;
        const monitorsUnder10 = monitorSizes.filter(s => s <= 10).length;
        for (let i = 0; i < monitorsAbove10 + 2; i++) consumables.push('CapIt Large');
        for (let i = 0; i < monitorsUnder10 + 3; i++) consumables.push('CapIt Medium');
        for (let i = 0; i < 3; i++) consumables.push('CapIt Small');
        for (let i = 0; i < 10; i++) consumables.push('Shower Cap');
        consumables.push('Magliner Rain Cover Transparent');
    }
    const needsHairDryer =
        (isWinterShoot && isScenarioActive('Outdoor')) ||
        isScenarioActive('Extreme cold (snow)');
    const needsHandAndFeetWarmers = isScenarioActive('Extreme cold (snow)');
    if (needsHairDryer) {
        miscItems.push('Hair Dryer');
        if (["Sony Venice 2", "Sony Venice"].includes(selectedNames.camera)) {
            miscItems.push('Denz C0100072 Shut-Eye Heater für Sony');
        } else if (["Arri Alexa Mini", "Arri Amira"].includes(selectedNames.camera)) {
            miscItems.push('Arri K2.0003898 Heated Eyecup HE-7 for the MVF-1');
        }
    }
    if (needsHandAndFeetWarmers) {
        const warmersCount = Math.max(shootDays, 1) * 2;
        for (let i = 0; i < warmersCount; i++) miscItems.push('Hand Warmers');
        for (let i = 0; i < warmersCount; i++) miscItems.push('Feet Warmers');
    }
    const gaffColors = [
        ['red', 'Red'],
        ['blue', 'Blue'],
        ['green', 'Green'],
        ['yellow', 'Yellow'],
        ['black', 'Black'],
        ['pink', 'Pink'],
        ['orange', 'Orange'],
        ['violette', 'Violette'],
        ['white', 'White']
    ];
    const gaffWidths = ['6mm', '12mm', '19mm', '24mm', '48mm'];
    const proGaffCount = multiplier;
    const proGaffHtml = gaffTapeSelections.map(({ id, color, width }) => {
        const colorOpts = gaffColors
            .map(([val, label]) => `<option value="${val}"${val === color ? ' selected' : ''}>${label}</option>`)
            .join('');
        const widthOpts = gaffWidths
            .map(val => `<option value="${val}"${val === width ? ' selected' : ''}>${val}</option>`)
            .join('');
        const quantityAttr = ` data-gear-quantity="${escapeHtml(String(proGaffCount))}"`;
        const labelAttr = ' data-gear-label="Pro Gaff Tape"';
        const textHtml = `${escapeHtml(String(proGaffCount))}x Pro Gaff Tape <select id="gearListProGaffColor${id}">${colorOpts}</select> <select id="gearListProGaffWidth${id}">${widthOpts}</select>`;
        return `<span class="gear-item" data-gear-name="Pro Gaff Tape"${quantityAttr}${labelAttr}${rentalNoteAttr}><span class="gear-item-text">${textHtml}</span><span class="gear-item-note" hidden></span></span>`;
    }).join('<br>');
    let eyeLeatherHtml = '';
    if (eyeLeatherCount) {
        const colors = [
            ['red', 'Red'],
            ['blue', 'Blue'],
            ['natural', 'Natural'],
            ['green', 'Green'],
            ['purple', 'Purple'],
            ['orange', 'Orange'],
            ['gray', 'Gray'],
            ['yellow', 'Yellow'],
            ['jaguar', 'Jaguar'],
            ['killer bee', 'Killer Bee'],
            ['green rabbit', 'Green Rabbit'],
            ['black', 'Black']
        ];
        const options = colors.map(([val, label]) => `<option value="${val}"${val === eyeLeatherColor ? ' selected' : ''}>${label}</option>`).join('');
        const quantityAttr = ` data-gear-quantity="${escapeHtml(String(eyeLeatherCount))}"`;
        const labelAttr = ' data-gear-label="Bluestar eye leather made of microfiber oval, large"';
        const textHtml = `${escapeHtml(String(eyeLeatherCount))}x Bluestar eye leather made of microfiber oval, large <select id="gearListEyeLeatherColor">${options}</select>`;
        eyeLeatherHtml = `<span class="gear-item" data-gear-name="Bluestar eye leather made of microfiber oval, large"${quantityAttr}${labelAttr}${rentalNoteAttr}><span class="gear-item-text">${textHtml}</span><span class="gear-item-note" hidden></span></span>`;
    }
    addRow('Miscellaneous', formatItems(miscItems));
    addRow('Consumables', [eyeLeatherHtml, proGaffHtml, formatItems(consumables)].filter(Boolean).join('<br>'));
    let body = `<h2>${projectTitle}</h2>`;
    if (infoHtml) body += infoHtml;
    const tableHtml = '<table class="gear-table">' + categoryGroups.join('') + '</table>';
    const infoForRules = {
        ...info,
        cameraSelection: selectedNames.camera,
        monitorSelection: selectedNames.monitor,
        wirelessSelection: selectedNames.video,
        motorSelections: selectedNames.motors.slice(),
        controllerSelections: selectedNames.controllers.slice(),
        distanceSelection: selectedNames.distance,
    };
    const adjustedTable = applyAutoGearRulesToTableHtml(tableHtml, infoForRules);
    body += '<h3>Gear List</h3>' + adjustedTable;
    return body;
}


function gearListGetCurrentHtmlImpl() {
    if (!gearListOutput && !projectRequirementsOutput) return '';

    let projHtml = '';
    if (projectRequirementsOutput) {
        const projClone = projectRequirementsOutput.cloneNode(true);
        const editBtn = projClone.querySelector('#editProjectBtn');
        if (editBtn) editBtn.remove();
        const t = projClone.querySelector('h2');
        if (t) t.remove();
        projHtml = projClone.innerHTML.trim();
    }

    let gearHtml = '';
    if (gearListOutput) {
        const clone = gearListOutput.cloneNode(true);
        const actions = clone.querySelector('#gearListActions');
        if (actions) actions.remove();
        const editBtn = clone.querySelector('#editProjectBtn');
        if (editBtn) editBtn.remove();
        ['Director', 'Dop', 'Gaffer', 'Focus'].forEach(role => {
            const sel = clone.querySelector(`#gearList${role}Monitor`);
            if (sel) {
                const originalSel = gearListOutput.querySelector(`#gearList${role}Monitor`);
                const val = originalSel ? originalSel.value : sel.value;
                Array.from(sel.options).forEach(opt => {
                    if (opt.value === val) {
                        opt.setAttribute('selected', '');
                    } else {
                        opt.removeAttribute('selected');
                    }
                });
            }
        });
        ['Director', 'Combo', 'Dop'].forEach(role => {
            const sel = clone.querySelector(`#gearList${role}Monitor15`);
            if (sel) {
                const originalSel = gearListOutput.querySelector(`#gearList${role}Monitor15`);
                const val = originalSel ? originalSel.value : sel.value;
                Array.from(sel.options).forEach(opt => {
                    if (opt.value === val) {
                        opt.setAttribute('selected', '');
                    } else {
                        opt.removeAttribute('selected');
                    }
                });
            }
        });
        const cageSel = clone.querySelector('#gearListCage');
        if (cageSel) {
            const originalSel = gearListOutput.querySelector('#gearListCage');
            const val = originalSel ? originalSel.value : cageSel.value;
            Array.from(cageSel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        }
        const easyrigSel = clone.querySelector('#gearListEasyrig');
        if (easyrigSel) {
            const originalSel = gearListOutput.querySelector('#gearListEasyrig');
            const val = originalSel ? originalSel.value : easyrigSel.value;
            Array.from(easyrigSel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        }
        const sliderSel = clone.querySelector('#gearListSliderBowl');
        if (sliderSel) {
            const originalSel = gearListOutput.querySelector('#gearListSliderBowl');
            const val = originalSel ? originalSel.value : sliderSel.value;
            Array.from(sliderSel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        }
        const monitorBatterySelects = clone.querySelectorAll('select[data-monitor-battery-key]');
        monitorBatterySelects.forEach(sel => {
            if (!sel.id) return;
            const originalSel = gearListOutput.querySelector(`#${sel.id}`);
            const val = originalSel ? originalSel.value : sel.value;
            Array.from(sel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        });
        const eyeSel = clone.querySelector('#gearListEyeLeatherColor');
        if (eyeSel) {
            const originalSel = gearListOutput.querySelector('#gearListEyeLeatherColor');
            const val = originalSel ? originalSel.value : eyeSel.value;
            Array.from(eyeSel.options).forEach(opt => {
                if (opt.value === val) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        }
        [1, 2].forEach(i => {
            const colorSel = clone.querySelector(`#gearListProGaffColor${i}`);
            if (colorSel) {
                const originalSel = gearListOutput.querySelector(`#gearListProGaffColor${i}`);
                const val = originalSel ? originalSel.value : colorSel.value;
                Array.from(colorSel.options).forEach(opt => {
                    if (opt.value === val) {
                        opt.setAttribute('selected', '');
                    } else {
                        opt.removeAttribute('selected');
                    }
                });
            }
            const widthSel = clone.querySelector(`#gearListProGaffWidth${i}`);
            if (widthSel) {
                const originalSel = gearListOutput.querySelector(`#gearListProGaffWidth${i}`);
                const val = originalSel ? originalSel.value : widthSel.value;
                Array.from(widthSel.options).forEach(opt => {
                    if (opt.value === val) {
                        opt.setAttribute('selected', '');
                    } else {
                        opt.removeAttribute('selected');
                    }
                });
            }
        });
        clone.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            if (cb.checked) {
                cb.setAttribute('checked', '');
            } else {
                cb.removeAttribute('checked');
            }
        });
        clone.querySelectorAll('[data-gear-custom-input]').forEach(input => {
            if (input && typeof input.getAttribute === 'function') {
                input.setAttribute('value', input.value);
            }
        });
        convertCustomItemsForStaticOutput(clone);
        const table = clone.querySelector('.gear-table');
        gearHtml = table ? '<h3>Gear List</h3>' + table.outerHTML : '';
    }

    if (!projHtml && !gearHtml) {
        return '';
    }

    const projectName = getCurrentProjectName();
    const titleHtml = projectName ? `<h2>${projectName}</h2>` : '';
    const combined = `${titleHtml}${projHtml}${gearHtml}`.trim();
    if (combined && typeof globalThis !== 'undefined') {
        globalThis.__cineLastGearListHtml = combined;
    }
    return combined;
}

function getGearListSelectors() {
    const selectors = {};
    const collectSelectValue = (sel) => {
        if (!sel || !sel.id) return;
        if (sel.multiple) {
            const optionNodes = sel.selectedOptions && typeof sel.selectedOptions.length === 'number'
                ? Array.from(sel.selectedOptions)
                : Array.from(sel.options || []).filter(opt => opt.selected);
            selectors[sel.id] = optionNodes.map(opt => opt.value);
        } else {
            selectors[sel.id] = sel.value;
        }
    };
    if (gearListOutput) {
        gearListOutput.querySelectorAll('select[id]').forEach(sel => {
            collectSelectValue(sel);
        });
    }
    const filterStorage = typeof filterDetailsStorage !== 'undefined' ? filterDetailsStorage : null;
    if (filterStorage && typeof filterStorage.querySelectorAll === 'function') {
        filterStorage.querySelectorAll('select[id]').forEach(sel => {
            if (!sel || !sel.id || Object.prototype.hasOwnProperty.call(selectors, sel.id)) return;
            collectSelectValue(sel);
        });
    }
    const customState = readCustomItemsState();
    if (customState && Object.keys(customState).length) {
        selectors.__customItems = customState;
    }
    if (gearListOutput) {
        const rentalState = {};
        gearListOutput.querySelectorAll('.gear-item[data-gear-name]').forEach(span => {
            const name = span.getAttribute('data-gear-name');
            if (!name) return;
            if (span.getAttribute('data-rental-excluded') === 'true') {
                rentalState[name] = true;
            }
        });
        if (Object.keys(rentalState).length) {
            selectors.__rentalExclusions = rentalState;
        }
    }
    return selectors;
}

function cloneGearListSelectors(selectors) {
    if (!selectors || typeof selectors !== 'object') return {};
    const cloneValue = (value) => {
        if (Array.isArray(value)) {
            return value.map(item => cloneValue(item));
        }
        if (value && typeof value === 'object') {
            const nested = {};
            Object.entries(value).forEach(([key, nestedValue]) => {
                nested[key] = cloneValue(nestedValue);
            });
            return nested;
        }
        if (value === undefined || value === null) {
            return '';
        }
        return typeof value === 'string' ? value : String(value);
    };
    const clone = {};
    Object.entries(selectors).forEach(([id, value]) => {
        if (!id || typeof id !== 'string') return;
        clone[id] = cloneValue(value);
    });
    return clone;
}

function applyGearListSelectors(selectors) {
    if (!selectors) return;

    const setSelectValue = (id, value) => {
        if (typeof document === 'undefined') return;
        const sel = document.getElementById(id);
        if (!sel) return;
        if (sel.multiple) {
            const values = Array.isArray(value)
                ? value.map(item => (typeof item === 'string' ? item : String(item ?? '')))
                : [typeof value === 'string' ? value : String(value ?? '')];
            const normalized = new Set(values);
            Array.from(sel.options).forEach(opt => {
                const shouldSelect = normalized.has(opt.value);
                opt.selected = shouldSelect;
                if (shouldSelect) {
                    opt.setAttribute('selected', '');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        } else {
            const nextValue = Array.isArray(value) ? value[0] : value;
            if (nextValue !== undefined && nextValue !== null) {
                sel.value = typeof nextValue === 'string' ? nextValue : String(nextValue);
            } else {
                sel.value = '';
            }
        }
        try {
            sel.dispatchEvent(new Event('change'));
        } catch (dispatchError) {
            void dispatchError;
        }
    };

    Object.entries(selectors).forEach(([id, value]) => {
        if (id === '__customItems' || id === '__rentalExclusions') return;
        setSelectValue(id, value);
    });
    applyCustomItemsState(selectors.__customItems || {});
    applyRentalExclusionsState(selectors.__rentalExclusions || {});
}

function convertCustomItemsForStaticOutput(root) {
    if (!root) return;
    const doc = root.ownerDocument || (typeof document !== 'undefined' ? document : null);
    if (!doc) return;

    const isLiveDom = typeof root.isConnected === 'boolean'
        ? root.isConnected
        : (typeof doc.contains === 'function' && doc.contains(root));
    if (isLiveDom) {
        return;
    }

    const sections = root.querySelectorAll('.gear-custom-section');
    sections.forEach(section => {
        const itemsContainer = section.querySelector('.gear-custom-items');
        const parent = section.parentElement;
        if (!itemsContainer || !parent) {
            section.remove();
            return;
        }

        section.querySelectorAll('.gear-rental-toggle').forEach(btn => btn.remove());
        const previews = Array.from(itemsContainer.querySelectorAll('.gear-custom-item-preview'));
        const entriesWithValues = previews
            .map(preview => ({
                preview,
                value: (preview.textContent || '').replace(/\s+/g, ' ').trim(),
            }))
            .filter(entry => entry.value);

        let standardContainer = section.previousElementSibling;
        if (!standardContainer || !standardContainer.classList.contains('gear-standard-items')) {
            standardContainer = doc.createElement('div');
            standardContainer.className = 'gear-standard-items';
            parent.insertBefore(standardContainer, section);
        }

        if (entriesWithValues.length) {
            entriesWithValues.forEach(({ value, preview }) => {
                if (standardContainer.childNodes.length) {
                    const last = standardContainer.lastChild;
                    const isBreak = last && last.nodeType === 1 && last.tagName === 'BR';
                    if (!isBreak) {
                        standardContainer.appendChild(doc.createElement('br'));
                    }
                }
                const span = doc.createElement('span');
                span.className = 'gear-item';
                span.textContent = value;
                span.setAttribute('data-gear-name', value);
                span.setAttribute('data-gear-custom-output', 'true');
                const sourceEntry = preview.closest('.gear-custom-item');
                if (sourceEntry) {
                    const rentalNote = sourceEntry.getAttribute('data-rental-note');
                    if (rentalNote) {
                        span.setAttribute('data-rental-note', rentalNote);
                    }
                    if (sourceEntry.getAttribute('data-rental-excluded') === 'true') {
                        span.setAttribute('data-rental-excluded', 'true');
                        span.classList.add('gear-item-rental-excluded');
                    }
                }
                standardContainer.appendChild(span);
            });
        }

        section.remove();
    });

    root.querySelectorAll('.gear-custom-add-btn').forEach(btn => btn.remove());
    root.querySelectorAll('.gear-rental-toggle').forEach(btn => btn.remove());
    root.querySelectorAll('.gear-item-edit-btn').forEach(btn => btn.remove());
    root.querySelectorAll('.gear-custom-item-actions').forEach(actions => actions.remove());
}

function cloneProjectInfoForStorage(info) {
    if (info === undefined || info === null) {
        return null;
    }
    if (typeof info !== 'object') {
        return info;
    }
    if (typeof SETUPS_DEEP_CLONE === 'function') {
        try {
            return SETUPS_DEEP_CLONE(info);
        } catch (error) {
            console.warn('Failed to clone project info for storage', error);
        }
    }
    if (Array.isArray(info)) {
        return info.map(item => cloneProjectInfoForStorage(item));
    }
    const clone = {};
    Object.keys(info).forEach(key => {
        clone[key] = cloneProjectInfoForStorage(info[key]);
    });
    return clone;
}

function hasMeaningfulProjectInfoValue(value) {
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value === 'string') {
        return value.trim().length > 0;
    }
    if (typeof value === 'number') {
        return !Number.isNaN(value);
    }
    if (typeof value === 'boolean') {
        return value;
    }
    if (Array.isArray(value)) {
        return value.some(entry => hasMeaningfulProjectInfoValue(entry));
    }
    if (typeof value === 'object') {
        return Object.values(value).some(entry => hasMeaningfulProjectInfoValue(entry));
    }
    return false;
}

function mergeProjectInfoSnapshots(base, updates) {
    const baseHasData = hasMeaningfulProjectInfoValue(base);
    const updateHasData = hasMeaningfulProjectInfoValue(updates);

    if (!updateHasData) {
        return baseHasData ? cloneProjectInfoForStorage(base) : cloneProjectInfoForStorage(updates);
    }

    if (!baseHasData) {
        return cloneProjectInfoForStorage(updates);
    }

    if (Array.isArray(base) && Array.isArray(updates)) {
        return cloneProjectInfoForStorage(updates.length ? updates : base);
    }

    if (typeof base === 'object' && typeof updates === 'object') {
        const merged = cloneProjectInfoForStorage(base);
        Object.keys(updates).forEach(key => {
            merged[key] = mergeProjectInfoSnapshots(merged[key], updates[key]);
        });
        return merged;
    }

    return cloneProjectInfoForStorage(updates);
}

function normalizeRequirementNodeValue(node) {
    if (!node) return '';
    const textNodeType = typeof Node === 'undefined' ? 3 : Node.TEXT_NODE;
    const elementNodeType = typeof Node === 'undefined' ? 1 : Node.ELEMENT_NODE;
    if (node.nodeType === textNodeType) {
        return node.textContent || '';
    }
    if (node.nodeType === elementNodeType) {
        const tag = node.tagName ? node.tagName.toLowerCase() : '';
        if (tag === 'br') {
            return '\n';
        }
        return Array.from(node.childNodes || []).map(normalizeRequirementNodeValue).join('');
    }
    return '';
}

function collectProjectInfoFromRequirementsGrid() {
    if (!projectRequirementsOutput) return null;
    const boxes = Array.from(projectRequirementsOutput.querySelectorAll('.requirement-box'));
    if (!boxes.length) {
        return null;
    }
    const info = {};
    const projectLabels = texts[currentLang]?.projectFields || texts.en?.projectFields || {};
    boxes.forEach((box) => {
        if (!box || typeof box.getAttribute !== 'function') return;
        const field = box.getAttribute('data-field');
        if (!field) return;
        const valueEl = box.querySelector('.req-value');
        if (!valueEl) return;
        const rawValue = Array.from(valueEl.childNodes || [])
            .map(normalizeRequirementNodeValue)
            .join('');
        const normalized = rawValue
            .replace(/\r\n?/g, '\n')
            .split('\n')
            .map(segment => segment.replace(/\s+/g, ' ').trim())
            .filter(segment => segment);
        if (!normalized.length) return;
        const text = normalized.join('\n');
        if (!Object.prototype.hasOwnProperty.call(info, field)) {
            info[field] = text;
        }
        if (field === 'productionCompany') {
            const expanded = expandCombinedProductionCompanyInfo(text, projectLabels);
            if (expanded && typeof expanded === 'object') {
                Object.entries(expanded).forEach(([expandedField, expandedValue]) => {
                    if (expandedField === 'productionCompany') {
                        info.productionCompany = expandedValue;
                        return;
                    }
                    if (!Object.prototype.hasOwnProperty.call(info, expandedField)) {
                        info[expandedField] = expandedValue;
                    }
                });
            }
        }
    });
    return Object.keys(info).length ? info : null;
}

function saveCurrentGearList() {
    if (factoryResetInProgress) return;
    if (isProjectPersistenceSuspended()) return;
    const html = gearListGetCurrentHtmlImpl();
    const normalizedHtml = typeof html === 'string' ? html.trim() : '';
    const gearListGenerated = Boolean(normalizedHtml);
    const info = projectForm ? collectProjectFormData() : {};
    info.sliderBowl = getSetupsCoreValue('getSliderBowlValue');
    info.easyrig = getSetupsCoreValue('getEasyrigValue');
    const previousProjectInfo = (currentProjectInfo && typeof currentProjectInfo === 'object')
        ? currentProjectInfo
        : null;
    const requirementsVisible = Boolean(
        projectRequirementsOutput
        && projectRequirementsOutput.querySelector('.requirement-box')
    );
    let pendingProjectInfo = deriveProjectInfo(info);
    const powerSelectionSnapshot = getPowerSelectionSnapshot();
    const gearSelectorsRaw = getGearListSelectors();
    const gearSelectors = cloneGearListSelectors(gearSelectorsRaw);
    const hasGearSelectors = Object.keys(gearSelectors).length > 0;
    let nameState = typeof getSetupNameState === 'function'
        ? getSetupNameState()
        : null;
    if (typeof getProjectAutoSaveOverrides === 'function') {
        const overrides = getProjectAutoSaveOverrides();
        if (overrides && typeof overrides === 'object' && overrides.setupNameState && typeof overrides.setupNameState === 'object') {
            const normalize = (value) => (typeof value === 'string' ? value.trim() : '');
            const rawOverride = overrides.setupNameState;
            const overrideTyped = normalize(rawOverride.typedName);
            const overrideSelected = normalize(rawOverride.selectedName);
            const overrideStorage = normalize(
                typeof rawOverride.storageKey === 'string'
                    ? rawOverride.storageKey
                    : (overrideSelected || overrideTyped),
            );
            const renameOverride = typeof rawOverride.renameInProgress === 'boolean'
                ? rawOverride.renameInProgress
                : Boolean(
                    overrideSelected
                    && overrideTyped
                    && overrideTyped !== overrideSelected,
                );
            nameState = {
                typedName: overrideTyped,
                selectedName: overrideSelected,
                storageKey: overrideStorage,
                renameInProgress: renameOverride,
            };
        }
    }
    const fallbackNormalize = (value) => {
        if (typeof value !== 'string') return '';
        return value.trim();
    };
    const selectedStorageKey = nameState
        ? nameState.selectedName
        : fallbackNormalize(setupSelect && typeof setupSelect.value === 'string' ? setupSelect.value : '');
    const typedStorageKey = nameState
        ? nameState.typedName
        : fallbackNormalize(setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value : '');
    const projectStorageKey = nameState
        ? nameState.storageKey
        : (selectedStorageKey || typedStorageKey);
    const renameInProgress = nameState
        ? nameState.renameInProgress
        : Boolean(selectedStorageKey && typedStorageKey && selectedStorageKey !== typedStorageKey);
    const effectiveStorageKey = renameInProgress
        ? (selectedStorageKey || projectStorageKey)
        : projectStorageKey;
    if (!pendingProjectInfo && requirementsVisible) {
        if (previousProjectInfo && Object.keys(previousProjectInfo).length) {
            pendingProjectInfo = previousProjectInfo;
        } else if (typeof loadProject === 'function') {
            const fallbackKey = (typeof effectiveStorageKey === 'string')
                ? effectiveStorageKey
                : (typeof projectStorageKey === 'string' && projectStorageKey)
                    ? projectStorageKey
                    : (typeof selectedStorageKey === 'string'
                        ? selectedStorageKey
                        : '');
            if (typeof fallbackKey === 'string') {
                const existingProject = loadProject(fallbackKey);
                if (existingProject && existingProject.projectInfo && Object.keys(existingProject.projectInfo).length) {
                    pendingProjectInfo = cloneProjectInfoForStorage(existingProject.projectInfo);
                }
            }
        }
        if (!pendingProjectInfo) {
            const gridInfo = collectProjectInfoFromRequirementsGrid();
            if (gridInfo) {
                pendingProjectInfo = deriveProjectInfo(gridInfo) || gridInfo;
            }
        }
    }
    currentProjectInfo = pendingProjectInfo;
    const projectInfoForStorage = typeof createProjectInfoSnapshotForStorage === 'function'
        ? createProjectInfoSnapshotForStorage(currentProjectInfo, {
            projectNameOverride: renameInProgress ? (selectedStorageKey || projectStorageKey) : undefined,
        })
        : currentProjectInfo;
    const projectInfoSnapshot = cloneProjectInfoForStorage(projectInfoForStorage);
    const projectInfoSignature = projectInfoSnapshot ? stableStringify(projectInfoSnapshot) : '';
    const projectInfoSnapshotForSetups = projectInfoSnapshot ? cloneProjectInfoForStorage(projectInfoSnapshot) : null;
    const projectRulesRaw = getProjectScopedAutoGearRules();
    const projectRulesSnapshot = projectRulesRaw && projectRulesRaw.length
        ? cloneProjectInfoForStorage(projectRulesRaw)
        : null;
    const projectRulesSnapshotForSetups = projectRulesSnapshot
        ? cloneProjectInfoForStorage(projectRulesSnapshot)
        : null;
    let diagramPositionsSnapshot = null;
    let diagramPositionsSnapshotForSetups = null;
    if (typeof getDiagramManualPositions === 'function') {
        const positions = getDiagramManualPositions();
        if (positions && Object.keys(positions).length) {
            diagramPositionsSnapshot = cloneProjectInfoForStorage(positions);
            diagramPositionsSnapshotForSetups = cloneProjectInfoForStorage(diagramPositionsSnapshot);
        }
    }
    if (typeof saveProject === 'function' && typeof effectiveStorageKey === 'string') {
        if (typeof setActiveProjectCompressionHold === 'function') {
            setActiveProjectCompressionHold(effectiveStorageKey);
        }
        const payload = {
            projectInfo: projectInfoSnapshot,
            gearListAndProjectRequirementsGenerated: gearListGenerated
        };
        if (normalizedHtml) {
            payload.gearList = normalizedHtml;
        }
        if (powerSelectionSnapshot) {
            payload.powerSelection = powerSelectionSnapshot;
        }
        if (hasGearSelectors) {
            payload.gearSelectors = gearSelectors;
        }
        if (diagramPositionsSnapshot) {
            payload.diagramPositions = diagramPositionsSnapshot;
        }
        if (projectRulesSnapshot && projectRulesSnapshot.length) {
            payload.autoGearRules = projectRulesSnapshot;
        }
        saveProject(effectiveStorageKey, payload, { skipOverwriteBackup: true });
    }

    if (!selectedStorageKey) return;

    const setups = getSetups();
    const existing = setups[selectedStorageKey];
    if (
        !existing
        && !html
        && !currentProjectInfo
        && !(projectRulesSnapshot && projectRulesSnapshot.length)
        && !diagramPositionsSnapshot
    ) {
        return;
    }

    const setup = existing || {};
    let changed = false;

    const existingGearList = typeof setup.gearList === 'string' ? setup.gearList : '';
    if (normalizedHtml) {
        if (existingGearList !== normalizedHtml) {
            setup.gearList = normalizedHtml;
            changed = true;
        }
    } else if (Object.prototype.hasOwnProperty.call(setup, 'gearList')) {
        delete setup.gearList;
        changed = true;
    }

    if (setup.gearListAndProjectRequirementsGenerated !== gearListGenerated) {
        setup.gearListAndProjectRequirementsGenerated = gearListGenerated;
        changed = true;
    }

    if (projectInfoSignature) {
        const existingInfo = setup.projectInfo;
        const existingInfoSignature = existingInfo ? stableStringify(existingInfo) : '';
        if (existingInfoSignature !== projectInfoSignature) {
            setup.projectInfo = projectInfoSnapshotForSetups;
            changed = true;
        }
    } else if (projectInfoSnapshot === null) {
        if (setup.projectInfo !== null) {
            setup.projectInfo = null;
            changed = true;
        }
    } else if (Object.prototype.hasOwnProperty.call(setup, 'projectInfo')) {
        delete setup.projectInfo;
        changed = true;
    }

    if (diagramPositionsSnapshotForSetups) {
        const existingDiagramSig = setup.diagramPositions
            ? stableStringify(setup.diagramPositions)
            : '';
        const newDiagramSig = stableStringify(diagramPositionsSnapshotForSetups);
        if (existingDiagramSig !== newDiagramSig) {
            setup.diagramPositions = diagramPositionsSnapshotForSetups;
            changed = true;
        }
    } else if (Object.prototype.hasOwnProperty.call(setup, 'diagramPositions')) {
        delete setup.diagramPositions;
        changed = true;
    }

    const existingRules = setup.autoGearRules;
    const existingRulesSig = existingRules && existingRules.length ? stableStringify(existingRules) : '';
    const newRulesSig = projectRulesSnapshot && projectRulesSnapshot.length ? stableStringify(projectRulesSnapshot) : '';
    if (newRulesSig) {
        if (existingRulesSig !== newRulesSig) {
            setup.autoGearRules = projectRulesSnapshotForSetups;
            changed = true;
        }
    } else if (Object.prototype.hasOwnProperty.call(setup, 'autoGearRules')) {
        delete setup.autoGearRules;
        changed = true;
    }

    const existingSelectors = setup.gearSelectors;
    const existingSelectorsSig = existingSelectors ? stableStringify(existingSelectors) : '';
    const newSelectorsSig = hasGearSelectors ? stableStringify(gearSelectors) : '';
    if (newSelectorsSig) {
        if (existingSelectorsSig !== newSelectorsSig) {
            setup.gearSelectors = gearSelectors;
            changed = true;
        }
    } else if (Object.prototype.hasOwnProperty.call(setup, 'gearSelectors')) {
        delete setup.gearSelectors;
        changed = true;
    }
    const existingPowerSelectionSig = setup.powerSelection ? stableStringify(setup.powerSelection) : '';
    const newPowerSelectionSig = powerSelectionSnapshot ? stableStringify(powerSelectionSnapshot) : '';
    if (newPowerSelectionSig) {
        if (existingPowerSelectionSig !== newPowerSelectionSig) {
            setup.powerSelection = powerSelectionSnapshot;
            changed = true;
        }
    } else if (Object.prototype.hasOwnProperty.call(setup, 'powerSelection')) {
        delete setup.powerSelection;
        changed = true;
    }

    if (!existing) {
        setups[selectedStorageKey] = setup;
        storeSetups(setups);
    } else if (changed) {
        setups[selectedStorageKey] = setup;
        storeSetups(setups);
    }
    return changed;
}

function deleteCurrentGearList() {
    if (!confirm(texts[currentLang].confirmDeleteGearList)) return false;
    if (!confirm(texts[currentLang].confirmDeleteGearListAgain)) return false;
    const backupName = ensureAutoBackupBeforeDeletion('delete gear list');
    if (!backupName) return false;
    const storageKey = getCurrentProjectStorageKey();
    if (typeof deleteProject === 'function') {
        deleteProject(storageKey);
    } else if (typeof saveProject === 'function') {
        saveProject(storageKey, {
            projectInfo: null,
            gearListAndProjectRequirementsGenerated: false
        }, { skipOverwriteBackup: true });
    }
    const setups = getSetups();
    if (setups && typeof setups === 'object') {
        const existingSetup = setups[storageKey];
        if (existingSetup && typeof existingSetup === 'object') {
            let changed = false;
            if (Object.prototype.hasOwnProperty.call(existingSetup, 'gearList')) {
                delete existingSetup.gearList;
                changed = true;
            }
            ['projectInfo', 'autoGearRules', 'diagramPositions', 'powerSelection', 'gearSelectors', 'gearListAndProjectRequirementsGenerated']
                .forEach((prop) => {
                    if (Object.prototype.hasOwnProperty.call(existingSetup, prop)) {
                        delete existingSetup[prop];
                        changed = true;
                    }
                });
            if (changed) {
                storeSetups(setups);
            }
        }
    }
    if (gearListOutput) {
        gearListOutput.innerHTML = '';
        gearListOutput.classList.add('hidden');
        updateAutoGearHighlightToggleButton();
    }
    if (projectRequirementsOutput) {
        projectRequirementsOutput.innerHTML = '';
        projectRequirementsOutput.classList.add('hidden');
    }
    if (typeof globalThis !== 'undefined') {
        globalThis.__cineLastGearListHtml = '';
    }
    currentProjectInfo = null;
    if (projectForm) populateProjectForm({});
    storeSession({
        setupName: setupNameInput ? setupNameInput.value : '',
        setupSelect: setupSelect ? setupSelect.value : '',
        camera: cameraSelect ? cameraSelect.value : '',
        monitor: monitorSelect ? monitorSelect.value : '',
        video: videoSelect ? videoSelect.value : '',
        cage: cageSelect ? cageSelect.value : '',
        motors: motorSelects.map(sel => sel ? sel.value : ''),
        controllers: controllerSelects.map(sel => sel ? sel.value : ''),
        distance: distanceSelect ? distanceSelect.value : '',
        batteryPlate: normalizeBatteryPlateValue(
            batteryPlateSelect ? batteryPlateSelect.value : '',
            batterySelect ? batterySelect.value : ''
        ),
        battery: batterySelect ? batterySelect.value : '',
        batteryHotswap: hotswapSelect ? hotswapSelect.value : '',
        sliderBowl: getSetupsCoreValue('getSliderBowlValue'),
        easyrig: getSetupsCoreValue('getEasyrigValue'),
        projectInfo: null
    });
    if (typeof autoSaveCurrentSetup === 'function') {
        autoSaveCurrentSetup();
        if (storageKey) {
            const setupsAfterSave = getSetups();
            const savedSetup = setupsAfterSave && setupsAfterSave[storageKey];
            if (savedSetup && typeof savedSetup === 'object') {
                let resaved = false;
                if (Object.prototype.hasOwnProperty.call(savedSetup, 'gearList')) {
                    delete savedSetup.gearList;
                    resaved = true;
                }
                ['projectInfo', 'gearListAndProjectRequirementsGenerated', 'gearSelectors']
                    .forEach((prop) => {
                        if (Object.prototype.hasOwnProperty.call(savedSetup, prop)) {
                            delete savedSetup[prop];
                            resaved = true;
                        }
                    });
                if (resaved) {
                    storeSetups(setupsAfterSave);
                }
            }
        }
    }
    currentProjectInfo = null;
    updateGearListButtonVisibility();
    if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
        const eventDetail = { projectName: storageKey, backupName, source: 'deleteCurrentGearList' };
        try {
            document.dispatchEvent(new CustomEvent('gearlist:deleted', { detail: eventDetail }));
        } catch (error) {
            if (typeof document.createEvent === 'function') {
                const fallbackEvent = document.createEvent('CustomEvent');
                fallbackEvent.initCustomEvent('gearlist:deleted', false, false, eventDetail);
                document.dispatchEvent(fallbackEvent);
            } else {
                console.warn('Unable to dispatch gearlist:deleted event', error);
            }
        }
    }
    return true;
}

const AUTO_GEAR_HIGHLIGHT_CLASS = 'show-auto-gear-highlight';
const AUTO_GEAR_HIGHLIGHT_CONTEXT_CLASS = 'auto-gear-highlight-context';
const ONBOARD_MONITOR_RIGGING_ITEM_NAME = 'ULCS Arm mit 3/8" und 1/4" double';
const ONBOARD_MONITOR_RIGGING_ITEM_ID = 'autoGearMonitorRiggingItem';
const ONBOARD_MONITOR_RIGGING_RULE_ID = 'autoGearMonitorRiggingHighlight';
const AUTO_GEAR_HIGHLIGHT_ICON = '';
const AUTO_GEAR_HIGHLIGHT_LABEL_FALLBACK = 'Highlight automatic gear';
const AUTO_GEAR_HIGHLIGHT_HELP_FALLBACK =
    'Toggle a temporary color overlay for gear added by automatic rules. Useful while debugging gear rule behavior.';
const AUTO_GEAR_HIGHLIGHT_STATE_ON_FALLBACK = 'On';
const AUTO_GEAR_HIGHLIGHT_STATE_OFF_FALLBACK = 'Off';
const AUTO_GEAR_RULE_BADGE_NAMED_FALLBACK = 'Rule: %s';
const AUTO_GEAR_RULE_BADGE_UNNAMED_FALLBACK = 'Automatic rule';
const AUTO_GEAR_RULE_COLOR_PALETTE = Object.freeze([
    { bg: 'rgba(255, 210, 64, 0.35)', border: 'rgba(255, 181, 0, 0.7)' },
    { bg: 'rgba(88, 200, 255, 0.32)', border: 'rgba(0, 146, 214, 0.65)' },
    { bg: 'rgba(146, 232, 129, 0.32)', border: 'rgba(70, 180, 80, 0.65)' },
    { bg: 'rgba(255, 186, 222, 0.32)', border: 'rgba(230, 112, 190, 0.65)' },
    { bg: 'rgba(255, 214, 153, 0.32)', border: 'rgba(230, 156, 64, 0.65)' },
    { bg: 'rgba(201, 186, 255, 0.32)', border: 'rgba(146, 118, 230, 0.65)' },
    { bg: 'rgba(152, 219, 217, 0.32)', border: 'rgba(72, 182, 178, 0.65)' },
]);

function getAutoGearRuleColorKey(rule, dataset) {
    if (rule && typeof rule === 'object') {
        const ruleId = typeof rule.id === 'string' ? rule.id.trim() : '';
        if (ruleId) {
            return `id:${ruleId.toLowerCase()}`;
        }
        const label = getAutoGearRuleDisplayLabel(rule);
        if (label) {
            return `label:${label.toLowerCase()}`;
        }
    }
    if (dataset && typeof dataset === 'object') {
        const datasetId = typeof dataset.autoGearRuleId === 'string' ? dataset.autoGearRuleId.trim() : '';
        if (datasetId) {
            return `id:${datasetId.toLowerCase()}`;
        }
        const datasetLabel = typeof dataset.autoGearRuleLabel === 'string' ? dataset.autoGearRuleLabel.trim() : '';
        if (datasetLabel) {
            return `label:${datasetLabel.toLowerCase()}`;
        }
    }
    return '';
}

function getAutoGearRuleColorEntry(rule, dataset) {
    if (!AUTO_GEAR_RULE_COLOR_PALETTE.length) {
        return null;
    }
    const key = getAutoGearRuleColorKey(rule, dataset);
    if (!key) {
        const defaultEntry = AUTO_GEAR_RULE_COLOR_PALETTE[0];
        return { ...defaultEntry, index: 0 };
    }
    let hash = 0;
    for (let i = 0; i < key.length; i += 1) {
        hash = (hash * 31 + key.charCodeAt(i)) & 0x7fffffff;
    }
    const paletteIndex = Math.abs(hash) % AUTO_GEAR_RULE_COLOR_PALETTE.length;
    const paletteEntry = AUTO_GEAR_RULE_COLOR_PALETTE[paletteIndex] || AUTO_GEAR_RULE_COLOR_PALETTE[0];
    return { ...paletteEntry, index: paletteIndex };
}

function applyAutoGearRuleColors(span, rule) {
    if (!span || !span.style) {
        return;
    }
    const dataset = span.dataset || {};
    const entry = getAutoGearRuleColorEntry(rule, dataset);
    if (!entry) {
        span.style.removeProperty('--auto-gear-rule-bg');
        span.style.removeProperty('--auto-gear-rule-border');
        span.style.removeProperty('--auto-gear-rule-text');
        if (dataset && Object.prototype.hasOwnProperty.call(dataset, 'autoGearRuleColor')) {
            delete dataset.autoGearRuleColor;
        }
        return;
    }
    const { bg, border, text, index } = entry;
    if (bg) {
        span.style.setProperty('--auto-gear-rule-bg', bg);
    } else {
        span.style.removeProperty('--auto-gear-rule-bg');
    }
    if (border) {
        span.style.setProperty('--auto-gear-rule-border', border);
    } else {
        span.style.removeProperty('--auto-gear-rule-border');
    }
    if (text) {
        span.style.setProperty('--auto-gear-rule-text', text);
    } else {
        span.style.removeProperty('--auto-gear-rule-text');
    }
    if (dataset) {
        try {
            span.dataset.autoGearRuleColor = String(index);
        } catch (error) {
            console.warn('Failed to annotate automatic gear color index', error);
        }
    }
}

function getAutoGearRuleBadgeTemplates() {
    const langTexts = texts[currentLang] || texts.en || {};
    const named = langTexts.autoGearRuleBadgeNamed
        || texts.en?.autoGearRuleBadgeNamed
        || AUTO_GEAR_RULE_BADGE_NAMED_FALLBACK;
    const unnamed = langTexts.autoGearRuleBadgeUnnamed
        || texts.en?.autoGearRuleBadgeUnnamed
        || AUTO_GEAR_RULE_BADGE_UNNAMED_FALLBACK;
    return { named, unnamed };
}

function formatAutoGearRuleBadgeText(ruleLabel, ruleId) {
    const { named, unnamed } = getAutoGearRuleBadgeTemplates();
    const trimmedLabel = typeof ruleLabel === 'string' ? ruleLabel.trim() : '';
    if (trimmedLabel) {
        return named.replace('%s', trimmedLabel);
    }
    const trimmedId = typeof ruleId === 'string' ? ruleId.trim() : '';
    if (trimmedId) {
        return named.replace('%s', trimmedId);
    }
    return unnamed;
}

function refreshAutoGearRuleBadge(span) {
    if (!span || !span.classList || !span.classList.contains('auto-gear-item')) {
        return;
    }
    const sources = getAutoGearRuleSources(span);
    setAutoGearRuleSources(span, sources);
    applyAutoGearRuleColors(span);
    const badgeTexts = sources
        .map(source => formatAutoGearRuleBadgeText(source.label, source.id))
        .filter(Boolean);
    const existingBadges = Array.from(span.querySelectorAll('.auto-gear-rule-badge'));
    if (!badgeTexts.length) {
        existingBadges.forEach(node => node.remove());
        if (span.dataset && Object.prototype.hasOwnProperty.call(span.dataset, 'autoGearRuleBadge')) {
            delete span.dataset.autoGearRuleBadge;
        }
        const tooltip = buildAutoGearRuleTooltipFromSources(sources);
        if (tooltip) {
            span.title = tooltip;
        } else {
            span.removeAttribute('title');
        }
        return;
    }
    badgeTexts.forEach((text, index) => {
        let badge = existingBadges[index];
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'auto-gear-rule-badge';
            span.appendChild(badge);
        }
        badge.textContent = text;
    });
    if (existingBadges.length > badgeTexts.length) {
        existingBadges.slice(badgeTexts.length).forEach(node => node.remove());
    }
    if (span.dataset) {
        try {
            span.dataset.autoGearRuleBadge = JSON.stringify(badgeTexts);
        } catch (error) {
            console.warn('Failed to serialize automatic gear rule badge labels', error);
        }
    }
    const tooltip = buildAutoGearRuleTooltipFromSources(sources);
    if (tooltip) {
        span.title = tooltip;
    } else {
        span.removeAttribute('title');
    }
}

function updateAutoGearRuleBadges(container) {
    const scope = container || gearListOutput;
    if (!scope || typeof scope.querySelectorAll !== 'function') {
        return;
    }
    const autoGearItems = scope.querySelectorAll('.auto-gear-item');
    autoGearItems.forEach(item => refreshAutoGearRuleBadge(item));
}

function getAutoGearHighlightLabel() {
    const localized = typeof getLocalizedText === 'function'
        ? getLocalizedText('autoGearHighlightToggle')
        : '';
    if (typeof localized === 'string' && localized.trim()) {
        return localized.trim();
    }
    return AUTO_GEAR_HIGHLIGHT_LABEL_FALLBACK;
}

function getAutoGearHighlightHelp() {
    const localized = typeof getLocalizedText === 'function'
        ? getLocalizedText('autoGearHighlightToggleHelp')
        : '';
    if (typeof localized === 'string' && localized.trim()) {
        return localized.trim();
    }
    return AUTO_GEAR_HIGHLIGHT_HELP_FALLBACK;
}

function isAutoGearHighlightEnabled() {
    return !!(gearListOutput && gearListOutput.classList && gearListOutput.classList.contains(AUTO_GEAR_HIGHLIGHT_CLASS));
}

function canHighlightAutoGear() {
    if (!gearListOutput || !gearListOutput.classList) return false;
    return !gearListOutput.classList.contains('hidden');
}

function ensureAutoGearHighlightToggleStructure(toggle) {
    if (!toggle) return null;

    toggle.classList.add('auto-gear-highlight-toggle', 'gear-list-action-btn');

    const iconClass = 'auto-gear-highlight-icon';
    let icon = toggle.querySelector(`.${iconClass}`);
    if (!icon) {
        icon = document.createElement('span');
        icon.className = `btn-icon icon-glyph ${iconClass}`;
        icon.setAttribute('aria-hidden', 'true');
        icon.setAttribute('data-icon-font', 'uicons');
        icon.textContent = AUTO_GEAR_HIGHLIGHT_ICON;
        if (toggle.firstChild) {
            toggle.insertBefore(icon, toggle.firstChild);
        } else {
            toggle.appendChild(icon);
        }
    } else {
        if (!icon.classList.contains('btn-icon')) {
            icon.classList.add('btn-icon');
        }
        if (!icon.classList.contains('icon-glyph')) {
            icon.classList.add('icon-glyph');
        }
        if (!icon.classList.contains(iconClass)) {
            icon.classList.add(iconClass);
        }
        icon.setAttribute('aria-hidden', 'true');
        icon.setAttribute('data-icon-font', 'uicons');
        if (icon.textContent !== AUTO_GEAR_HIGHLIGHT_ICON) {
            icon.textContent = AUTO_GEAR_HIGHLIGHT_ICON;
        }
    }

    let label = toggle.querySelector('.auto-gear-highlight-label');
    if (!label) {
        label = document.createElement('span');
        label.className = 'auto-gear-highlight-label';
        toggle.appendChild(label);
    }

    let state = toggle.querySelector('.auto-gear-highlight-state');
    if (!state) {
        state = document.createElement('span');
        state.className = 'auto-gear-highlight-state';
        if (typeof label.after === 'function') {
            label.after(state);
        } else {
            toggle.appendChild(state);
        }
    }
    if (state) {
        state.setAttribute('aria-live', 'polite');
        state.setAttribute('aria-atomic', 'true');
    }

    const textNodes = Array.from(toggle.childNodes || [])
        .filter(node => node && node.nodeType === 3 && node.textContent && node.textContent.trim().length);
    textNodes.forEach(node => {
        toggle.removeChild(node);
    });

    if (state && typeof label !== 'undefined' && label && state.previousElementSibling !== label) {
        if (typeof label.after === 'function') {
            label.after(state);
        }
    }

    return { label, state };
}

function getAutoGearHighlightStateText(isActive) {
    const key = isActive ? 'autoGearHighlightToggleStateOn' : 'autoGearHighlightToggleStateOff';
    const fallback = isActive ? AUTO_GEAR_HIGHLIGHT_STATE_ON_FALLBACK : AUTO_GEAR_HIGHLIGHT_STATE_OFF_FALLBACK;
    const localized = typeof getLocalizedText === 'function'
        ? getLocalizedText(key)
        : '';
    if (typeof localized === 'string' && localized.trim()) {
        return localized.trim();
    }
    return fallback;
}

function applyAutoGearHighlightContext(isActive) {
    if (typeof document === 'undefined') {
        return;
    }
    const enable = !!isActive;
    const targets = [document.documentElement, document.body, document.getElementById('autoGearDraftImpact')];
    targets.forEach(node => {
        if (node && node.classList) {
            node.classList.toggle(AUTO_GEAR_HIGHLIGHT_CONTEXT_CLASS, enable);
        }
    });
}

function setAutoGearHighlightEnabled(enabled) {
    const nextState = !!enabled;
    if (gearListOutput && gearListOutput.classList) {
        gearListOutput.classList.toggle(AUTO_GEAR_HIGHLIGHT_CLASS, nextState);
    }
    updateAutoGearHighlightToggleButton();
}

function updateAutoGearHighlightToggleButton() {
    const toggle = document.getElementById('autoGearHighlightToggle');
    if (!toggle) return;
    const label = getAutoGearHighlightLabel();
    const help = getAutoGearHighlightHelp();
    const structure = ensureAutoGearHighlightToggleStructure(toggle);
    const labelContainer = structure && structure.label;
    const stateContainer = structure && structure.state;
    if (labelContainer) {
        labelContainer.textContent = label;
    } else if (typeof toggle.textContent === 'string') {
        toggle.textContent = label;
    } else {
        toggle.innerHTML = escapeHtml(label);
    }
    toggle.setAttribute('title', help);
    toggle.setAttribute('data-help', help);
    toggle.setAttribute('aria-label', help);
    const active = isAutoGearHighlightEnabled();
    applyAutoGearHighlightContext(active);
    const stateText = getAutoGearHighlightStateText(active);
    if (stateContainer) {
        stateContainer.textContent = stateText;
        stateContainer.setAttribute('data-state', active ? 'on' : 'off');
    }
    toggle.setAttribute('data-state', active ? 'on' : 'off');
    toggle.setAttribute('data-state-label', stateText);
    toggle.setAttribute('aria-pressed', active ? 'true' : 'false');
    toggle.classList.toggle('is-active', active);
    const available = canHighlightAutoGear();
    toggle.disabled = !available;
    if (available) {
        toggle.removeAttribute('aria-disabled');
    } else {
        toggle.setAttribute('aria-disabled', 'true');
    }
    updateAutoGearRuleBadges(gearListOutput);
}

function ensureGearListActions() {
    if (!gearListOutput) return;
    let actions = document.getElementById('gearListActions');
    if (!actions) {
        actions = document.createElement('div');
        actions.id = 'gearListActions';
        gearListOutput.appendChild(actions);
    }
    const existingDeleteBtn = actions.querySelector('#deleteGearListBtn');
    if (existingDeleteBtn) {
        existingDeleteBtn.removeEventListener('click', deleteCurrentGearList);
        existingDeleteBtn.remove();
    }
    let autoSaveNote = document.getElementById('gearListAutosaveNote');
    if (!autoSaveNote) {
        autoSaveNote = document.createElement('p');
        autoSaveNote.id = 'gearListAutosaveNote';
        autoSaveNote.className = 'gear-list-autosave-note';
        actions.appendChild(autoSaveNote);
    } else if (!actions.contains(autoSaveNote)) {
        actions.appendChild(autoSaveNote);
    }
    const noteText = (texts[currentLang] && texts[currentLang].gearListAutosaveNote) || '';
    const trimmedNoteText = typeof noteText === 'string' ? noteText.trim() : '';
    const hasNoteText = trimmedNoteText.length > 0;

    if (hasNoteText) {
        autoSaveNote.hidden = false;
        autoSaveNote.removeAttribute('hidden');
        autoSaveNote.textContent = trimmedNoteText;
        autoSaveNote.setAttribute('title', trimmedNoteText);
        autoSaveNote.setAttribute('data-help', trimmedNoteText);
    } else {
        autoSaveNote.textContent = '';
        autoSaveNote.setAttribute('title', '');
        autoSaveNote.setAttribute('data-help', '');
        autoSaveNote.hidden = true;
    }

    const deleteLabel =
        (texts[currentLang] && texts[currentLang].deleteGearListBtn)
            || (texts.en && texts.en.deleteGearListBtn)
            || 'Delete Gear List';
    const deleteHelp =
        (texts[currentLang]
            && (texts[currentLang].deleteGearListBtnHelp || texts[currentLang].deleteGearListBtn))
        || (texts.en && (texts.en.deleteGearListBtnHelp || texts.en.deleteGearListBtn))
        || deleteLabel;

    const deleteBtn = document.createElement('button');
    deleteBtn.id = 'deleteGearListBtn';
    deleteBtn.type = 'button';
    deleteBtn.className = 'gear-list-action-btn';
    if (typeof setButtonLabelWithIcon === 'function' && typeof ICON_GLYPHS === 'object') {
        setButtonLabelWithIcon(deleteBtn, deleteLabel, ICON_GLYPHS.trash);
    } else {
        const iconHtml = typeof iconMarkup === 'function' && typeof ICON_GLYPHS === 'object'
            ? iconMarkup(ICON_GLYPHS.trash, 'btn-icon')
            : '';
        deleteBtn.innerHTML = `${iconHtml}${escapeHtml(deleteLabel)}`;
    }
    deleteBtn.setAttribute('title', deleteHelp);
    deleteBtn.setAttribute('data-help', deleteHelp);
    deleteBtn.setAttribute('aria-label', deleteHelp);
    deleteBtn.setAttribute('data-feature-search', 'true');
    deleteBtn.setAttribute('data-feature-search-keywords', 'delete remove clear gear list project');
    deleteBtn.addEventListener('click', deleteCurrentGearList);

    const shouldHideDeleteBtn =
        !gearListOutput
        || gearListOutput.classList.contains('hidden')
        || gearListOutput.innerHTML.trim() === '';
    if (shouldHideDeleteBtn) {
        deleteBtn.hidden = true;
        deleteBtn.setAttribute('hidden', '');
    } else {
        deleteBtn.hidden = false;
        deleteBtn.removeAttribute('hidden');
    }

    if (autoSaveNote && autoSaveNote.parentElement === actions) {
        actions.insertBefore(deleteBtn, autoSaveNote);
    } else {
        actions.appendChild(deleteBtn);
    }

    const highlightToggle = document.getElementById('autoGearHighlightToggle');
    if (highlightToggle && !highlightToggle.dataset.gearListHighlightBound) {
        highlightToggle.addEventListener('click', () => {
            const nextState = !isAutoGearHighlightEnabled();
            setAutoGearHighlightEnabled(nextState);
            if (typeof saveCurrentSession === 'function') {
                saveCurrentSession({ skipGearList: true });
            }
        });
        highlightToggle.dataset.gearListHighlightBound = 'true';
    }
    updateAutoGearHighlightToggleButton();
    updateAutoGearRuleBadges(actions.closest('#gearListOutput') || gearListOutput);

    if (!gearListOutput._filterListenerBound) {
        gearListOutput.addEventListener('change', e => {
            const target = e.target;
            if (target && target.matches('select')) {
                adjustGearListSelectWidth(target);
            }
            let shouldSync = false;
            if (target.matches('.filter-values-container input[type="checkbox"]')) {
                const container = target.closest('.filter-values-container');
                const storageId = container && container.getAttribute('data-storage-values');
                const sel = container && container.querySelector('select');
                if (target.checked) {
                    target.setAttribute('checked', '');
                } else {
                    target.removeAttribute('checked');
                }
                if (storageId) {
                    syncGearListFilterValue(storageId, target.value, target.checked);
                } else if (sel) {
                    const opt = Array.from(sel.options).find(opt => opt.value === target.value);
                    if (opt) opt.selected = target.checked;
                    sel.dispatchEvent(new Event('change'));
                }
                shouldSync = true;
            } else if (target.matches('select[data-storage-id]')) {
                const storageId = target.getAttribute('data-storage-id');
                if (storageId) {
                    syncGearListFilterSize(storageId, target.value);
                }
                shouldSync = true;
            } else if (target.id && target.id.startsWith('filter-size-')) {
                shouldSync = true;
            } else if (target.id && target.id.startsWith('filter-values-')) {
                shouldSync = true;
            } else if (target.matches('input, select, textarea') && !target.closest('#gearListActions')) {
                shouldSync = true;
            }

            if (shouldSync) {
                saveCurrentGearList();
                saveCurrentSession();
                checkSetupChanged();
            }
        });
        gearListOutput._filterListenerBound = true;
    }

    if (!gearListOutput._inputListenerBound) {
        gearListOutput.addEventListener('input', e => {
            const target = e.target;
            if (!target) return;
            if (target.closest('#gearListActions')) return;
            if (target.closest('.gear-custom-item')) {
                updateCustomItemPreview(target.closest('.gear-custom-item'));
            }
            if (target.matches('input, textarea')) {
                saveCurrentGearList();
                saveCurrentSession();
                checkSetupChanged();
            }
        });
        gearListOutput._inputListenerBound = true;
    }

    if (!gearListOutput._customClickListenerBound) {
        gearListOutput.addEventListener('click', e => {
            const editBtn = e.target && e.target.closest('[data-gear-edit]');
            if (editBtn) {
                e.preventDefault();
                const targetItem = editBtn.closest('.gear-item, .gear-custom-item');
                if (targetItem) {
                    openGearItemEditor(targetItem, { allowRentalToggle: true });
                }
                return;
            }
            const toggleBtn = e.target && e.target.closest('.gear-rental-toggle');
            if (toggleBtn) {
                e.preventDefault();
                const targetItem = toggleBtn.closest('.gear-item, .gear-custom-item');
                if (!targetItem) return;
                const nextState = toggleBtn.getAttribute('aria-pressed') !== 'true';
                setRentalExclusionState(targetItem, nextState);
                if (targetItem.classList && targetItem.classList.contains('gear-custom-item')) {
                    persistCustomItemsChange();
                } else {
                    if (typeof saveCurrentGearList === 'function') {
                        saveCurrentGearList();
                    }
                    if (typeof saveCurrentSession === 'function') {
                        saveCurrentSession();
                    }
                    if (typeof checkSetupChanged === 'function') {
                        checkSetupChanged();
                    }
                }
                return;
            }
            const addBtn = e.target && e.target.closest('[data-gear-custom-add]');
            if (addBtn) {
                e.preventDefault();
                handleAddCustomItemRequest(addBtn);
                return;
            }
            const removeBtn = e.target && e.target.closest('[data-gear-custom-remove]');
            if (removeBtn) {
                e.preventDefault();
                handleRemoveCustomItemRequest(removeBtn);
            }
        });
        gearListOutput._customClickListenerBound = true;
    }
}

let gearDeleteRequestListenerBound = false;

if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
    if (!gearDeleteRequestListenerBound) {
        const handleGearDeleteRequest = () => {
            try {
                deleteCurrentGearList();
            } catch (error) {
                console.warn('Failed to handle gear list deletion request', error);
            }
        };
        document.addEventListener('gearlist:delete-requested', handleGearDeleteRequest);
        gearDeleteRequestListenerBound = true;
    }
}

function resolveGearListCageLabel() {
    const rawLabel = typeof localGetLocalizedText === 'function'
        ? localGetLocalizedText('category_cages')
        : '';
    const trimmed = typeof rawLabel === 'string' ? rawLabel.trim() : '';
    return trimmed || 'Camera Cage';
}

function syncGearListCageItem(select) {
    if (!select) return;
    const gearItem = select.closest('.gear-item');
    if (!gearItem) return;
    const option = select.options && select.selectedIndex >= 0
        ? select.options[select.selectedIndex]
        : null;
    const optionText = option && typeof option.text === 'string'
        ? option.text.trim()
        : (option && option.textContent ? option.textContent.trim() : '');
    const label = resolveGearListCageLabel();
    const combinedName = optionText
        ? `${label} (${optionText})`
        : label;
    gearItem.setAttribute('data-gear-quantity', '1');
    if (label) {
        gearItem.setAttribute('data-gear-label', label);
    } else {
        gearItem.removeAttribute('data-gear-label');
    }
    if (combinedName) {
        gearItem.setAttribute('data-gear-name', combinedName);
    } else {
        gearItem.removeAttribute('data-gear-name');
    }
    if (optionText) {
        gearItem.setAttribute('data-gear-attributes', optionText);
    } else {
        gearItem.removeAttribute('data-gear-attributes');
    }
}

function bindGearListCageListener() {
    if (!gearListOutput) return;
    const sel = gearListOutput.querySelector('#gearListCage');
    if (sel) {
        sel.addEventListener('change', e => {
            if (cageSelect) {
                cageSelect.value = e.target.value;
                cageSelect.dispatchEvent(new Event('change'));
            }
            syncGearListCageItem(sel);
            markProjectFormDataDirty();
            saveCurrentGearList();
        });
        syncGearListCageItem(sel);
    }
}

function bindGearListEasyrigListener() {
    if (!gearListOutput) return;
    const sel = gearListOutput.querySelector('#gearListEasyrig');
    if (sel) {
        sel.addEventListener('change', () => {
            markProjectFormDataDirty();
            saveCurrentGearList();
            saveCurrentSession();
            checkSetupChanged();
        });
    }
}

function bindGearListSliderBowlListener() {
    if (!gearListOutput) return;
    const sel = gearListOutput.querySelector('#gearListSliderBowl');
    if (sel) {
        sel.addEventListener('change', () => {
            markProjectFormDataDirty();
            saveCurrentGearList();
            saveCurrentSession();
            checkSetupChanged();
        });
    }
}

function bindGearListEyeLeatherListener() {
    if (!gearListOutput) return;
    const sel = gearListOutput.querySelector('#gearListEyeLeatherColor');
    if (sel) {
        sel.addEventListener('change', () => {
            markProjectFormDataDirty();
            saveCurrentGearList();
        });
    }
}

function bindGearListProGaffTapeListener() {
    if (!gearListOutput) return;
    [1, 2].forEach(i => {
        const colorSel = gearListOutput.querySelector(`#gearListProGaffColor${i}`);
        const widthSel = gearListOutput.querySelector(`#gearListProGaffWidth${i}`);
        [colorSel, widthSel].forEach(sel => {
            if (sel) {
                sel.addEventListener('change', () => {
                    markProjectFormDataDirty();
                    saveCurrentGearList();
                });
            }
        });
    });
}

function bindGearListDirectorMonitorListener() {
    if (!gearListOutput) return;
    ['Director', 'Dop', 'Gaffer', 'Focus'].forEach(role => {
        const sel = gearListOutput.querySelector(`#gearList${role}Monitor`);
        if (sel) {
            sel.addEventListener('change', () => {
                const monitorInfo = devices && devices.monitors && devices.monitors[sel.value];
                const span = gearListOutput.querySelector(`#monitorSize${role}`);
                if (span && monitorInfo && monitorInfo.screenSizeInches) {
                    span.textContent = `${monitorInfo.screenSizeInches}"`;
                }
                sel.dataset.autoGearManual = 'true';
                markProjectFormDataDirty();
                saveCurrentGearList();
                saveCurrentSession();
                checkSetupChanged();
            });
        }
    });
    ['Director', 'Combo', 'Dop'].forEach(role => {
        const sel = gearListOutput.querySelector(`#gearList${role}Monitor15`);
        if (sel) {
            sel.addEventListener('change', () => {
                const monitorInfo = devices && devices.directorMonitors && devices.directorMonitors[sel.value];
                const span = gearListOutput.querySelector(`#monitorSize${role}15`);
                if (span && monitorInfo && monitorInfo.screenSizeInches) {
                    span.textContent = `${monitorInfo.screenSizeInches}"`;
                }
                sel.dataset.autoGearManual = 'true';
                markProjectFormDataDirty();
                saveCurrentGearList();
                saveCurrentSession();
                checkSetupChanged();
            });
        }
    });
}


function refreshGearListIfVisible() {
    if (!gearListOutput || gearListOutput.classList.contains('hidden')) return;
    if (restoringSession) return;
    if (skipNextGearListRefresh) {
        skipNextGearListRefresh = false;
        return;
    }

    if (projectForm) {
        populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
        populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
        populateCodecDropdown(currentProjectInfo && currentProjectInfo.codec);
        const info = collectProjectFormData();
        info.sliderBowl = getSetupsCoreValue('getSliderBowlValue');
        info.easyrig = getSetupsCoreValue('getEasyrigValue');
        currentProjectInfo = deriveProjectInfo(info);
    } else {
        const info = {
            sliderBowl: getSetupsCoreValue('getSliderBowlValue'),
            easyrig: getSetupsCoreValue('getEasyrigValue')
        };
        currentProjectInfo = deriveProjectInfo(info);
    }

    const html = gearListGenerateHtmlImpl(currentProjectInfo || {});
    if (currentProjectInfo) {
        displayGearAndRequirements(html);
    } else {
        const { gearHtml } = gearListGetSafeHtmlSectionsImpl(html);
        gearListOutput.innerHTML = gearHtml;
        enhanceGearListItems(gearListOutput);
    }
    ensureGearListActions();
    bindGearListCageListener();
    bindGearListEasyrigListener();
    bindGearListSliderBowlListener();
    bindGearListEyeLeatherListener();
    bindGearListProGaffTapeListener();
    bindGearListDirectorMonitorListener();
    // Ensure both the gear list HTML and the associated session state are
    // saved whenever the visible list is refreshed so reloads keep it visible.
    saveCurrentSession();
}

if (typeof document !== 'undefined') {
  document.addEventListener('gearlist:add-extra-gear', () => {
    try {
      addExtraGearItem();
    } catch (error) {
      console.warn('Failed to add extra gear item from request', error);
    }
  });
  document.addEventListener('gear-provider-data-changed', () => {
    refreshGearItemProviderDisplays();
    refreshGearItemEditProviderOptionsIfOpen();
  });
    document.addEventListener('own-gear-data-changed', () => {
        ownGearNameCache = null;
        refreshGearItemProviderDisplays();
        refreshGearItemEditProviderOptionsIfOpen();
        refreshGearItemOwnedStateIfOpen();
    });
  document.addEventListener('camera-selection-changed', () => {
    refreshGearItemEditCameraLinkOptionsIfOpen();
  });
}

