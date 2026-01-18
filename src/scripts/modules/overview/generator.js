/* global currentLang, texts, devices, escapeHtml, generateConnectorSummary, cameraSelect, monitorSelect, videoSelect, distanceSelect, motorSelects, controllerSelects, batterySelect, hotswapSelect, lensSelect, overviewSectionIcons, breakdownListElem, pinWarnElem, dtapWarnElem, getCurrentGearListHtml, currentProjectInfo, generateGearListHtml, getDiagramCss, openDialog, closeDialog, splitGearListHtml, getSafeGearListHtmlSections, iconMarkup, ICON_GLYPHS, deleteCurrentGearList, focusScalePreference, resolveOverviewGearListSections, cineFeaturesConnectionDiagram */

import { createOverviewPrintWorkflow, triggerOverviewPrintWorkflow } from '../features/print-workflow.js';
import { logOverview, createOverviewLoggerProxy } from './logging.js';
import { convertGearListSelectorsToPlainText, resolveOverviewGearListSections } from './gear-list.js';
import {
    runPendingPrintCleanup,
    setPendingPrintCleanup,
    getPrintSectionConfig,
    loadPrintPreferences,
    savePrintPreferences,
    getPrintOptionsDialogContext,
    populatePrintOptionsDialog
} from './print-manager.js';

const createOverviewPrintWorkflowModule = createOverviewPrintWorkflow;
const triggerOverviewPrintWorkflowModule = triggerOverviewPrintWorkflow;

export function generatePrintableOverview(config = {}) {

    const safeConfig = (config && typeof config === 'object') ? config : {};
    const { autoPrint = false } = safeConfig;
    runPendingPrintCleanup('overview-init');
    const escapeHtmlSafe = (value) => (typeof escapeHtml === 'function' ? escapeHtml(value) : String(value ?? ''));
    const summarizeConnectors = (device) => (typeof generateConnectorSummary === 'function' ? generateConnectorSummary(device) : '');
    const setupNameField = typeof document !== 'undefined' ? document.getElementById('setupName') : null;
    const setupName = setupNameField ? setupNameField.value : '';
    const now = new Date();
    const localeMap = { de: 'de-DE', es: 'es-ES', fr: 'fr-FR', en: 'en-US', it: 'it-IT' };
    const lang = typeof currentLang === 'string' ? currentLang : 'en';
    const t = (typeof texts === 'object' && texts) ? (texts[lang] || texts.en || {}) : {};
    const locale = localeMap[lang] || 'en-US';
    const dateTimeString = now.toLocaleDateString(locale) + ' ' + now.toLocaleTimeString();
    const fallbackProjectName = currentProjectInfo && typeof currentProjectInfo.projectName === 'string'
        ? currentProjectInfo.projectName.trim()
        : '';
    const projectNameForTitle = setupName || fallbackProjectName;
    const sanitizeTitleSegment = (value) => {
        if (!value) return '';
        return String(value)
            .trim()
            .replace(/[\\/:*?"<>|]+/g, '')
            .replace(/\s+/g, ' ')
            .replace(/^\.+/, '')
            .replace(/\.+$/, '')
            .trim();
    };
    const padTwo = (value) => String(value).padStart(2, '0');
    const formattedDate = `${now.getFullYear()}-${padTwo(now.getMonth() + 1)}-${padTwo(now.getDate())}`;
    const formattedTime = `${padTwo(now.getHours())}-${padTwo(now.getMinutes())}-${padTwo(now.getSeconds())}`;
    const timestampLabel = `${formattedDate} ${formattedTime}`.trim();
    const safeTimestampLabel = sanitizeTitleSegment(timestampLabel) || timestampLabel;
    const projectTitleSegment = sanitizeTitleSegment(projectNameForTitle) || 'Project';
    const overviewLabel = sanitizeTitleSegment((t.overviewTitle || '').trim());
    const gearListLabel = sanitizeTitleSegment((t.gearListNav || '').trim());
    const projectRequirementsLabel = sanitizeTitleSegment((t.projectRequirementsNav || '').trim());
    const preferredSuffix = sanitizeTitleSegment((t.overviewExportTitleSuffix || '').trim());
    let suffixSegment = preferredSuffix;
    if (!suffixSegment) {
        const combinedNavLabels = [];
        if (gearListLabel) combinedNavLabels.push(gearListLabel);
        if (projectRequirementsLabel) combinedNavLabels.push(projectRequirementsLabel);
        if (combinedNavLabels.length === 2) {
            suffixSegment = sanitizeTitleSegment(combinedNavLabels.join(' and '));
        }
    }
    if (!suffixSegment) {
        const fallbackLabels = [overviewLabel, gearListLabel].filter(Boolean);
        suffixSegment = fallbackLabels.length
            ? sanitizeTitleSegment(fallbackLabels.join(' – '))
            : '';
    }
    if (!suffixSegment) {
        suffixSegment = 'Gear List and Project Requirements';
    }
    suffixSegment = sanitizeTitleSegment(suffixSegment) || 'Gear List and Project Requirements';
    const printDocumentTitle = [safeTimestampLabel, projectTitleSegment, suffixSegment]
        .filter(Boolean)
        .join(' - ')
        .replace(/\s+/g, ' ')
        .trim();
    const originalDocumentTitle = typeof document !== 'undefined' ? document.title : '';
    const customLogo = typeof localStorage !== 'undefined' ? localStorage.getItem('customLogo') : null;
    const generatedOnLabel = t.generatedOnLabel || 'Generated on';
    const ensureLabelSuffix = (label) => {
        const base = typeof label === 'string' ? label.trim() : '';
        if (!base) return '';
        return /[:：]$/.test(base) ? base : `${base}:`;
    };

    const generatedOnDisplayLabel = ensureLabelSuffix(generatedOnLabel);

    let deviceListHtml = '<div class="device-category-container">';
    const sections = {};
    const sectionOrder = [];
    const addToSection = (key, itemHtml) => {
        if (!sections[key]) {
            sections[key] = [];
            sectionOrder.push(key);
        }
        sections[key].push(itemHtml);
    };
    const processSelectForOverview = (selectElement, headingKey, category, subcategory = null) => {
        if (selectElement.value && selectElement.value !== "None") {
            const deviceKey = selectElement.value;
            const deviceName = selectElement.options[selectElement.selectedIndex].text;
            let deviceInfo;
            if (subcategory) {
                deviceInfo = devices[category] &&
                    devices[category][subcategory] &&
                    devices[category][subcategory][deviceKey];
            } else {
                deviceInfo = devices[category] && devices[category][deviceKey];
            }
            const safeName = escapeHtmlSafe(deviceName);
            let details = '';
            if (deviceInfo !== undefined && deviceInfo !== null) {
                const connectors = summarizeConnectors(deviceInfo);
                const latencyLabel = t.videoLatencyLabel || t.monitorLatencyLabel || 'Latency:';
                const frequencyLabel = t.videoFrequencyLabel || 'Frequency:';
                const infoBoxes =
                    (deviceInfo.latencyMs !== undefined ? `<div class="info-box video-conn"><strong>${escapeHtmlSafe(latencyLabel)}</strong> ${escapeHtmlSafe(String(deviceInfo.latencyMs))}</div>` : '') +
                    (deviceInfo.frequency ? `<div class="info-box video-conn"><strong>${escapeHtmlSafe(frequencyLabel)}</strong> ${escapeHtmlSafe(String(deviceInfo.frequency))}</div>` : '');
                details = connectors + infoBoxes;
            }
            addToSection(headingKey, `<div class="device-block"><strong>${safeName}</strong>${details}</div>`);
        }
    };

    const lensSelectElement = (typeof lensSelect !== 'undefined' && lensSelect && typeof lensSelect === 'object') ? lensSelect : null;
    const resolveLensDataset = () => {
        if (!devices || typeof devices !== 'object') {
            return null;
        }
        if (devices.lenses && Object.keys(devices.lenses).length) {
            return devices.lenses;
        }
        if (devices.accessories && devices.accessories.lenses) {
            return devices.accessories.lenses;
        }
        return null;
    };
    const lensDataset = resolveLensDataset();
    const fallbackTexts = (texts && typeof texts === 'object' && texts.en) || {};
    const numberFormatterCache = new Map();
    const getNumberFormatter = (options) => {
        const key = JSON.stringify(options || {});
        if (numberFormatterCache.has(key)) {
            return numberFormatterCache.get(key);
        }
        let formatter = null;
        try {
            formatter = typeof Intl === 'object' && Intl && typeof Intl.NumberFormat === 'function'
                ? new Intl.NumberFormat(locale, options)
                : null;
        } catch (error) {
            void error;
            formatter = null;
        }
        numberFormatterCache.set(key, formatter);
        return formatter;
    };
    const formatNumber = (value, options = {}) => {
        const num = typeof value === 'string' ? Number(value) : value;
        if (!Number.isFinite(num)) {
            return '';
        }
        const formatter = getNumberFormatter(options);
        if (formatter) {
            return formatter.format(num);
        }
        const maximumFractionDigits = typeof options.maximumFractionDigits === 'number' ? options.maximumFractionDigits : 0;
        return num.toFixed(maximumFractionDigits);
    };
    const normalizeFocusScaleValue = (value) => {
        if (typeof value !== 'string') {
            return '';
        }
        const normalized = value.trim().toLowerCase();
        return normalized === 'imperial' || normalized === 'metric' ? normalized : '';
    };
    const resolveFocusScalePreference = () => {
        const scope = resolveOverviewCloneScope();
        const scopePreference = scope && typeof scope.focusScalePreference === 'string'
            ? scope.focusScalePreference
            : null;
        const rawPreference = scopePreference
            || (typeof focusScalePreference === 'string' ? focusScalePreference : null)
            || 'metric';
        return normalizeFocusScaleValue(rawPreference) || 'metric';
    };
    const resolveLensFocusScaleMode = (lensInfo) => {
        if (lensInfo && typeof lensInfo === 'object') {
            const override = normalizeFocusScaleValue(lensInfo.focusScale);
            if (override) {
                return override;
            }
        }
        return resolveFocusScalePreference();
    };
    const formatFocusScalePreference = (lensInfo) => {
        const preference = resolveLensFocusScaleMode(lensInfo);
        const key = preference === 'imperial' ? 'focusScaleImperial' : 'focusScaleMetric';
        const labelFromLang = t && typeof t[key] === 'string' ? t[key].trim() : '';
        if (labelFromLang) {
            return labelFromLang;
        }
        const labelFromFallback = typeof fallbackTexts[key] === 'string' ? fallbackTexts[key].trim() : '';
        if (labelFromFallback) {
            return labelFromFallback;
        }
        return preference === 'imperial' ? 'Imperial' : 'Metric';
    };
    const useImperialFocusScale = (lensInfo = null) => resolveLensFocusScaleMode(lensInfo) === 'imperial';
    const formatLengthMm = (value, lensInfo = null) => {
        const numeric = typeof value === 'string' ? Number(value) : value;
        if (!Number.isFinite(numeric)) {
            return '';
        }
        if (useImperialFocusScale(lensInfo)) {
            const inches = numeric / 25.4;
            const fractionDigits = inches >= 10 ? 1 : 2;
            const formatted = formatNumber(inches, {
                maximumFractionDigits: fractionDigits,
                minimumFractionDigits: 0,
            });
            return formatted ? `${formatted} in` : '';
        }
        const formatted = formatNumber(numeric, { maximumFractionDigits: 1, minimumFractionDigits: 0 });
        return formatted ? `${formatted} mm` : '';
    };
    const formatRodLength = (value, lensInfo = null) => {
        const numeric = typeof value === 'string' ? Number(value) : value;
        if (!Number.isFinite(numeric)) {
            return '';
        }
        if (useImperialFocusScale(lensInfo)) {
            const inches = numeric / 2.54;
            const fractionDigits = inches >= 10 ? 1 : 2;
            const formatted = formatNumber(inches, {
                maximumFractionDigits: fractionDigits,
                minimumFractionDigits: 0,
            });
            return formatted ? `${formatted} in` : '';
        }
        const formatted = formatNumber(numeric, { maximumFractionDigits: 1, minimumFractionDigits: 0 });
        return formatted ? `${formatted} cm` : '';
    };
    const formatWeight = (value, lensInfo = null) => {
        const numeric = typeof value === 'string' ? Number(value) : value;
        if (!Number.isFinite(numeric)) {
            return '';
        }
        if (useImperialFocusScale(lensInfo)) {
            const pounds = numeric / 453.59237;
            const fractionDigits = pounds >= 10 ? 1 : 2;
            const formatted = formatNumber(pounds, {
                maximumFractionDigits: fractionDigits,
                minimumFractionDigits: 0,
            });
            return formatted ? `${formatted} lb` : '';
        }
        const formatted = formatNumber(numeric, { maximumFractionDigits: 0, minimumFractionDigits: 0 });
        return formatted ? `${formatted} g` : '';
    };
    const resolveMinFocusMeters = (lensInfo) => {
        if (!lensInfo || typeof lensInfo !== 'object') {
            return null;
        }
        if (typeof lensInfo.minFocusMeters !== 'undefined') {
            return lensInfo.minFocusMeters;
        }
        if (typeof lensInfo.minFocus !== 'undefined') {
            return lensInfo.minFocus;
        }
        if (typeof lensInfo.minFocusCm !== 'undefined') {
            const cmValue = Number(lensInfo.minFocusCm);
            if (Number.isFinite(cmValue)) {
                return cmValue / 100;
            }
        }
        return null;
    };
    const formatDistanceMeters = (value, lensInfo = null) => {
        const num = typeof value === 'string' ? Number(value) : value;
        if (!Number.isFinite(num)) {
            return '';
        }
        if (useImperialFocusScale(lensInfo)) {
            const feet = num * 3.280839895;
            const digits = feet < 10 ? 2 : 1;
            const formatted = formatNumber(feet, { maximumFractionDigits: digits, minimumFractionDigits: digits });
            return formatted ? `${formatted} ft` : '';
        }
        const digits = num < 1 ? 2 : 1;
        const formatted = formatNumber(num, { maximumFractionDigits: digits, minimumFractionDigits: digits });
        return formatted ? `${formatted} m` : '';
    };
    const formatTStop = (value) => {
        const num = typeof value === 'string' ? Number(value) : value;
        if (!Number.isFinite(num)) {
            return '';
        }
        const formatted = formatNumber(num, { maximumFractionDigits: 1, minimumFractionDigits: 0 });
        return formatted ? `T${formatted}` : '';
    };
    const normalizeStringValue = (rawValue) => {
        if (Array.isArray(rawValue)) {
            return rawValue.map(item => normalizeStringValue(item)).filter(Boolean).join(', ');
        }
        if (rawValue === null || typeof rawValue === 'undefined') {
            return '';
        }
        const str = String(rawValue).trim();
        return str;
    };
    const formatLensType = (value) => {
        const str = normalizeStringValue(value);
        if (!str) {
            return '';
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const formatClampOn = (value) => {
        if (value === null || typeof value === 'undefined') {
            return '';
        }
        const yesLabel = t.lensSpecYes || 'Yes';
        const noLabel = t.lensSpecNo || 'No';
        if (value === true || (typeof value === 'string' && value.toLowerCase() === 'true')) {
            return yesLabel;
        }
        if (value === false || (typeof value === 'string' && value.toLowerCase() === 'false')) {
            return noLabel;
        }
        return t.lensSpecUnknownValue || 'Unknown';
    };
    const formatSupport = (value) => {
        if (value === null || typeof value === 'undefined') {
            return '';
        }
        if (value === true || (typeof value === 'string' && value.toLowerCase() === 'true')) {
            return t.lensSpecSupportRequired || 'Required';
        }
        if (value === false || (typeof value === 'string' && value.toLowerCase() === 'false')) {
            return t.lensSpecSupportNotRequired || 'Not required';
        }
        return t.lensSpecUnknownValue || 'Unknown';
    };
    const formatRodStandard = (value) => normalizeStringValue(value);
    const formatMount = (value) => normalizeStringValue(value);
    const formatNotes = (value) => normalizeStringValue(value);
    const createLensInfoHtml = (lensInfo) => {
        if (!lensInfo || typeof lensInfo !== 'object') {
            return '';
        }
        const lensInfoCategories = [
            { key: 'general', labelKey: 'lensSpecCategoryGeneralLabel', boxes: [] },
            { key: 'optics', labelKey: 'lensSpecCategoryOpticsLabel', boxes: [] },
            { key: 'physical', labelKey: 'lensSpecCategoryPhysicalLabel', boxes: [] },
            { key: 'support', labelKey: 'lensSpecCategorySupportLabel', boxes: [] },
            { key: 'notes', labelKey: 'lensSpecCategoryNotesLabel', boxes: [] }
        ];
        const categoryLookup = lensInfoCategories.reduce((acc, category) => {
            acc[category.key] = category;
            return acc;
        }, {});
        const categoryFallbackLabels = {
            lensSpecCategoryGeneralLabel: 'General',
            lensSpecCategoryOpticsLabel: 'Optics',
            lensSpecCategoryPhysicalLabel: 'Physical',
            lensSpecCategorySupportLabel: 'Support',
            lensSpecCategoryNotesLabel: 'Notes'
        };
        const addLensBox = (labelKey, rawValue, formatter = null, categoryKey = 'general') => {
            const targetCategory = categoryLookup[categoryKey] || lensInfoCategories[0];
            let formattedValue = rawValue;
            if (formatter) {
                formattedValue = formatter(rawValue, lensInfo);
            }
            if (formattedValue === null || typeof formattedValue === 'undefined') {
                return;
            }
            if (typeof formattedValue === 'string') {
                if (!formattedValue.trim()) {
                    return;
                }
            }
            const valueText = typeof formattedValue === 'string' ? formattedValue : String(formattedValue);
            if (!valueText.trim()) {
                return;
            }
            const label = t[labelKey] || labelKey;
            targetCategory.boxes.push(`<span class="info-box neutral-conn"><span class="info-box-label">${escapeHtmlSafe(label)}</span><span class="info-box-values">${escapeHtmlSafe(valueText)}</span></span>`);
        };
        addLensBox('lensSpecBrandLabel', lensInfo.brand, normalizeStringValue, 'general');
        addLensBox('lensSpecTypeLabel', lensInfo.lensType, formatLensType, 'general');
        addLensBox('lensSpecMountLabel', lensInfo.mount, formatMount, 'general');
        addLensBox('lensSpecFocusScaleLabel', lensInfo, formatFocusScalePreference, 'general');
        addLensBox('lensSpecTStopLabel', lensInfo.tStop, formatTStop, 'optics');
        addLensBox('lensSpecImageCircleLabel', lensInfo.imageCircleMm, formatLengthMm, 'optics');
        addLensBox('lensSpecMinFocusLabel', resolveMinFocusMeters(lensInfo), formatDistanceMeters, 'optics');
        addLensBox('lensSpecFrontDiameterLabel', lensInfo.frontDiameterMm, formatLengthMm, 'physical');
        addLensBox('lensSpecLengthLabel', lensInfo.lengthMm, formatLengthMm, 'physical');
        addLensBox('lensSpecWeightLabel', lensInfo.weight_g, formatWeight, 'physical');
        addLensBox('lensSpecRodStandardLabel', lensInfo.rodStandard, formatRodStandard, 'support');
        addLensBox('lensSpecRodLengthLabel', lensInfo.rodLengthCm, formatRodLength, 'support');
        if (Object.prototype.hasOwnProperty.call(lensInfo, 'clampOn')) {
            addLensBox('lensSpecClampOnLabel', lensInfo.clampOn, formatClampOn, 'support');
        }
        if (Object.prototype.hasOwnProperty.call(lensInfo, 'needsLensSupport')) {
            addLensBox('lensSpecSupportLabel', lensInfo.needsLensSupport, formatSupport, 'support');
        }
        addLensBox('lensSpecNotesLabel', lensInfo.notes, formatNotes, 'notes');
        const categoriesWithContent = lensInfoCategories.filter(category => category.boxes.length > 0);
        if (!categoriesWithContent.length) {
            return '';
        }
        const categoriesHtml = categoriesWithContent.map(category => {
            const labelKey = category.labelKey;
            const categoryLabel = t[labelKey] || categoryFallbackLabels[labelKey] || labelKey;
            const safeLabel = categoryLabel ? `<span class="lens-info-category__title">${escapeHtmlSafe(categoryLabel)}</span>` : '';
            return `<div class="lens-info-category">${safeLabel}<div class="info-box-list lens-info-grid">${category.boxes.join('')}</div></div>`;
        }).join('');
        return `<div class="lens-info-categories">${categoriesHtml}</div>`;
    };
    const processLensesForOverview = (selectElement, headingKey) => {
        if (!selectElement) {
            return;
        }
        const selectedOptions = Array.from(selectElement.selectedOptions || [])
            .filter(opt => opt && typeof opt.value === 'string' && opt.value.trim() !== '' && opt.value !== 'None');
        if (!selectedOptions.length) {
            return;
        }
        selectedOptions.forEach(opt => {
            const lensKey = opt.value;
            const lensInfo = lensDataset && lensDataset[lensKey] ? lensDataset[lensKey] : null;
            const displayName = lensKey || opt.text || '';
            const safeName = escapeHtmlSafe(displayName);
            const details = lensInfo ? createLensInfoHtml(lensInfo) : '';
            addToSection(headingKey, `<div class="device-block lens-device-block"><strong>${safeName}</strong>${details}</div>`);
        });
    };

    processSelectForOverview(cameraSelect, 'category_cameras', 'cameras');
    processSelectForOverview(monitorSelect, 'category_monitors', 'monitors');
    processSelectForOverview(videoSelect, 'category_video', 'video'); // Original database uses 'video', not 'wirelessVideo'
    processSelectForOverview(distanceSelect, 'category_fiz_distance', 'fiz', 'distance');
    motorSelects.forEach(sel => processSelectForOverview(sel, 'category_fiz_motors', 'fiz', 'motors'));
    controllerSelects.forEach(sel => processSelectForOverview(sel, 'category_fiz_controllers', 'fiz', 'controllers'));
    processSelectForOverview(batterySelect, 'category_batteries', 'batteries'); // Handle battery separately for capacity
    processSelectForOverview(hotswapSelect, 'category_batteryHotswaps', 'batteryHotswaps');
    processLensesForOverview(lensSelectElement, 'category_lenses');

    sectionOrder.forEach(key => {
        const heading = t[key] || key;
        const icon = overviewSectionIcons[key] || '';
        const iconHtml = icon && typeof iconMarkup === 'function'
            ? iconMarkup(icon, 'category-icon')
            : icon
                ? `<span class="category-icon icon-glyph" data-icon-font="uicons" aria-hidden="true">${icon}</span>`
                : '';
        const isFizList = key === 'category_fiz_motors' || key === 'category_fiz_controllers';
        const isLensList = key === 'category_lenses';
        const gridClasses = isFizList
            ? 'device-block-grid two-column fiz-single-column'
            : isLensList
                ? 'device-block-grid two-column lens-device-grid'
                : 'device-block-grid single-column';

        const categoryClasses = isLensList ? 'device-category device-category--full' : 'device-category';

        deviceListHtml += `<div class="${categoryClasses}"><h3>${iconHtml}${heading}</h3><div class="${gridClasses}">${sections[key].join('')}</div></div>`;
    });
    deviceListHtml += '</div>';
    const deviceSectionHeading = deviceListHtml
        ? (t.overviewDeviceSelectionHeading || t.deviceSelectionHeading || 'Device Selection')
        : '';
    const deviceSectionHtml = deviceListHtml
        ? `<section id="overviewDeviceSection" class="device-overview-section print-section"><h2>${escapeHtmlSafe(deviceSectionHeading)}</h2>${deviceListHtml}</section>`
        : '';

    const breakdownHtml = breakdownListElem.innerHTML;
    // batteryLifeUnitElem is no longer needed as heroRuntime includes units
    const powerDiagramElem = typeof document !== 'undefined'
        ? document.getElementById('powerDiagram')
        : null;
    let powerDiagramHtml = '';
    if (
        powerDiagramElem &&
        !powerDiagramElem.classList.contains('hidden') &&
        powerDiagramElem.innerHTML.trim().length > 0
    ) {
        const clone = powerDiagramElem.cloneNode(true);
        clone.id = 'powerDiagramOverview';
        clone.classList.remove('hidden');
        clone.classList.add('power-diagram');
        const bar = clone.querySelector('#powerDiagramBar');
        if (bar) {
            bar.id = 'powerDiagramBarOverview';
        }
        const legend = clone.querySelector('#powerDiagramLegend');
        if (legend) {
            legend.id = 'powerDiagramLegendOverview';
            legend.classList.add('power-diagram-legend');
        }
        const maxPowerText = clone.querySelector('#maxPowerText');
        if (maxPowerText) {
            maxPowerText.id = 'maxPowerTextOverview';
            maxPowerText.classList.add('power-diagram-note');
        }
        powerDiagramHtml = clone.outerHTML;
    }
    const getElemText = (id) => {
        const el = document.getElementById(id);
        return el ? el.textContent : '';
    };

    const resultsHtml = `
        <ul id="breakdownList">${breakdownHtml}</ul>
        ${powerDiagramHtml}
        <p><strong>${t.totalPowerLabel}</strong> ${escapeHtmlSafe(getElemText('heroTotalDraw'))}</p>
        <p><strong>${t.totalCurrent144Label}</strong> ${escapeHtmlSafe(getElemText('heroCurrent144'))}</p>
        <p><strong>${t.totalCurrent12Label}</strong> ${escapeHtmlSafe(getElemText('heroCurrent12'))}</p>
        <p><strong>${t.batteryLifeLabel}</strong> ${escapeHtmlSafe(getElemText('heroRuntime'))}</p>
        <p><strong>${t.batteryCountLabel}</strong> ${escapeHtmlSafe(getElemText('heroBatteryCount'))}</p>
    `;

    // Get current warning messages with their colors
    const severityClassMap = {
        danger: 'status-message--danger',
        warning: 'status-message--warning',
        note: 'status-message--note',
        success: 'status-message--success',
        info: 'status-message--info'
    };
    const extractSeverityClass = (element) => {
        if (!element) return '';
        const datasetLevel = element.dataset ? element.dataset.statusLevel : element.getAttribute && element.getAttribute('data-status-level');
        if (datasetLevel && severityClassMap[datasetLevel]) {
            return severityClassMap[datasetLevel];
        }
        if (element.classList) {
            return Object.values(severityClassMap).find(cls => element.classList.contains(cls)) || '';
        }
        const classAttr = typeof element.getAttribute === 'function' ? element.getAttribute('class') : '';
        if (classAttr) {
            const classes = classAttr.split(/\s+/);
            return Object.values(severityClassMap).find(cls => classes.includes(cls)) || '';
        }
        return '';
    };
    const buildStatusMarkup = (element) => {
        if (!element || element.textContent.trim() === '') {
            return '';
        }
        const classes = ['status-message'];
        const severityClass = extractSeverityClass(element);
        if (severityClass) {
            classes.push(severityClass);
        }
        return `<p class="${classes.join(' ')}">${escapeHtmlSafe(element.textContent)}</p>`;
    };

    const warningHtml = buildStatusMarkup(pinWarnElem) + buildStatusMarkup(dtapWarnElem);

    const resultsSectionHtml = `
        <section id="resultsSection" class="results-section print-section">
            <h2>${t.resultsHeading}</h2>
            <div class="results-body">
                ${resultsHtml}
                ${warningHtml ? `<div class="results-warnings">${warningHtml}</div>` : ''}
            </div>
        </section>
    `;

    const batteryComparisonSection = typeof document !== 'undefined'
        ? document.getElementById('batteryComparison')
        : null;
    const isSectionRenderable = section => {
        if (!section) return false;
        if (section.hasAttribute('hidden')) return false;
        if (section.classList && section.classList.contains('hidden')) return false;
        if (section.style && section.style.display === 'none') return false;
        if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
            const computed = window.getComputedStyle(section);
            if (computed.display === 'none' || computed.visibility === 'hidden') {
                return false;
            }
        }
        const table = section.querySelector('table');
        return table ? table.innerHTML.trim().length > 0 : false;
    };

    let batteryComparisonHtml = '';
    if (isSectionRenderable(batteryComparisonSection)) {
        const clone = batteryComparisonSection.cloneNode(true);
        clone.id = 'batteryComparisonOverview';
        clone.classList.add('print-section', 'battery-comparison-section');
        clone.removeAttribute('style');
        const heading = clone.querySelector('#batteryComparisonHeading');
        if (heading) {
            heading.id = 'batteryComparisonOverviewHeading';
        }
        const container = clone.querySelector('#batteryTableContainer');
        if (container) {
            container.id = 'batteryTableOverviewContainer';
        }
        const table = clone.querySelector('#batteryTable');
        if (table) {
            table.removeAttribute('id');
        }
        batteryComparisonHtml = `<div class="page-break"></div>${clone.outerHTML}`;
    }

    const safeSetupName = escapeHtmlSafe(setupName);
    let getDiagramCssFn = typeof getDiagramCss === 'function' ? getDiagramCss : null;
    if (!getDiagramCssFn && typeof cineFeaturesConnectionDiagram === 'object' && typeof cineFeaturesConnectionDiagram.getDiagramCss === 'function') {
        getDiagramCssFn = cineFeaturesConnectionDiagram.getDiagramCss;
    }
    const diagramCss = getDiagramCssFn ? getDiagramCssFn(false) : '';

    const resolveDiagramElement = (fallbackId, globalRefName) => {
        if (globalRefName) {
            try {
                if (typeof globalThis !== 'undefined' && globalRefName in globalThis) {
                    const value = globalThis[globalRefName];
                    if (value) return value;
                }
            } catch (resolveGlobalError) {
                void resolveGlobalError;
            }
        }
        if (typeof document !== 'undefined' && typeof document.getElementById === 'function') {
            try {
                return document.getElementById(fallbackId);
            } catch (resolveDomError) {
                void resolveDomError;
            }
        }
        return null;
    };

    const diagramContainer = resolveDiagramElement('diagramArea', 'setupDiagramContainer');
    let diagramAreaHtml = '';
    let diagramLegendHtml = '';
    let diagramHintHtml = '';
    let diagramDescHtml = '';
    if (diagramContainer) {
        const areaClone = diagramContainer.cloneNode(true);
        areaClone.id = 'diagramAreaOverview';
        areaClone.setAttribute('data-diagram-area', 'overview');
        const describedBy = areaClone.getAttribute('aria-describedby');
        if (describedBy) {
            const ids = describedBy.split(/\s+/).filter(Boolean);
            const updated = ids.map(id => (id === 'diagramDesc' ? 'diagramDescOverview' : id));
            areaClone.setAttribute('aria-describedby', updated.join(' '));
        } else {
            areaClone.setAttribute('aria-describedby', 'diagramDescOverview');
        }

        const popupClone = areaClone.querySelector('#diagramPopup');
        if (popupClone) {
            popupClone.id = 'diagramPopupOverview';
            popupClone.setAttribute('data-diagram-popup', 'overview');
            popupClone.style.position = 'static';
            popupClone.style.display = 'none';
        }

        const svg = areaClone.querySelector('svg');
        if (svg) {
            const style = document.createElement('style');
            style.textContent = diagramCss;
            svg.insertBefore(style, svg.firstChild);
        }
        diagramAreaHtml = areaClone.outerHTML;
    }

    const sourceDiagramLegend = resolveDiagramElement('diagramLegend', 'diagramLegend');
    if (sourceDiagramLegend) {
        const legendClone = sourceDiagramLegend.cloneNode(true);
        legendClone.id = 'diagramLegendOverview';
        legendClone.setAttribute('data-diagram-legend', 'overview');
        diagramLegendHtml = legendClone.outerHTML;
    }

    // Intentionally omit the interactive drag hint from the overview/print output
    // so the static summary focuses on content that applies outside of the live
    // editor.

    const diagramDescElem = typeof document !== 'undefined'
        ? document.getElementById('diagramDesc')
        : null;
    if (diagramDescElem) {
        const descClone = diagramDescElem.cloneNode(true);
        descClone.id = 'diagramDescOverview';
        descClone.setAttribute('data-diagram-description', 'overview');
        diagramDescHtml = descClone.outerHTML;
    }
    const diagramSectionHtml = diagramAreaHtml
        ? `<section id="setupDiagram" class="diagram-section print-section"><h2>${t.setupDiagramHeading}</h2>${diagramDescHtml}${diagramAreaHtml}${diagramLegendHtml}${diagramHintHtml}</section>`
        : '';

    // Only surface the gear list in the overview when the generator has
    // produced visible output in the main interface.
    const hasGeneratedGearList = (() => {
        if (typeof document === 'undefined') return false;
        const container = document.getElementById('gearListOutput');
        if (!container) return false;
        if (container.classList && container.classList.contains('hidden')) {
            return false;
        }
        const trimmed = typeof container.innerHTML === 'string'
            ? container.innerHTML.trim()
            : '';
        if (!trimmed) return false;
        if (typeof container.querySelector === 'function') {
            const table = container.querySelector('.gear-table');
            if (table) return true;
        }
        return true;
    })();

    let gearListCombined = getCurrentGearListHtml();
    if (!gearListCombined && currentProjectInfo) {
        gearListCombined = generateGearListHtml(currentProjectInfo);
    }
    let projectSectionHtml = '';
    let gearSectionHtml = '';
    if (gearListCombined) {
        const resolveGearSections = (() => {
            const localResolver = (typeof resolveOverviewGearListSections === 'function')
                ? resolveOverviewGearListSections
                : null;
            if (localResolver) {
                return localResolver;
            }

            const globalScope = (typeof globalThis !== 'undefined' && globalThis)
                || (typeof window !== 'undefined' && window)
                || (typeof self !== 'undefined' && self)
                || (typeof global !== 'undefined' && global)
                || null;

            if (globalScope && typeof globalScope.resolveOverviewGearListSections === 'function') {
                return globalScope.resolveOverviewGearListSections;
            }

            return (html) => ({
                projectHtml: '',
                gearHtml: typeof html === 'string' ? html : '',
            });
        })();

        const parts = resolveGearSections(gearListCombined);
        if (parts.projectHtml) {
            projectSectionHtml = `<section id="projectRequirementsOutput" class="print-section project-requirements-section">${parts.projectHtml}</section>`;
        }
        if (parts.gearHtml) {
            const shouldRenderGearList = hasGeneratedGearList || (() => {
                const trimmed = parts.gearHtml.trim();
                if (!trimmed) return false;
                if (typeof document === 'undefined' || typeof document.createElement !== 'function') {
                    return true;
                }
                const template = document.createElement('template');
                template.innerHTML = trimmed;
                const table = template.content.querySelector('.gear-table');
                if (!table) {
                    return trimmed.length > 0;
                }
                const rows = table.querySelectorAll('tbody tr');
                if (!rows.length) {
                    return false;
                }
                return Array.from(rows).some(row => row.textContent && row.textContent.trim().length > 0);
            })();
            if (shouldRenderGearList) {
                gearSectionHtml = `<section id="gearListOutput" class="gear-list-section print-section">${parts.gearHtml}</section>`;
            }
        }
    }
    const projectRequirementsHtml = projectSectionHtml || '';
    const gearListHtml = gearSectionHtml || '';
    const gearListActionsHtml = '';

    const logoHtml = customLogo ? `<img id="printLogo" src="${customLogo}" alt="Logo" />` : '';
    const contentClass = customLogo ? 'logo-present' : '';
    const generatedOnDisplay = `${escapeHtmlSafe(generatedOnDisplayLabel)} ${escapeHtmlSafe(dateTimeString)}`;
    const exportPdfLabel = t.exportPdfBtn || 'Export PDF / Print';
    const exportIconHtml = (() => {
        if (typeof iconMarkup === 'function' && ICON_GLYPHS && ICON_GLYPHS.fileExport) {
            try {
                return iconMarkup(ICON_GLYPHS.fileExport, 'btn-icon');
            } catch (error) {
                logOverview('warn', 'Unable to render export icon for overview dialog.', error, {
                    action: 'render-icon',
                    icon: 'fileExport',
                });
            }
        }
        return '<span class="btn-icon icon-glyph" aria-hidden="true" data-icon-font="uicons">&#xE7AB;</span>';
    })();
    const overviewHtml = `
        <div id="overviewDialogContent" class="${contentClass}">
            <div class="overview-actions">
                <button id="closeOverviewBtn" class="back-btn"><span class="btn-icon icon-glyph" aria-hidden="true" data-icon-font="essential">&#xF131;</span>${escapeHtmlSafe(t.backToAppBtn)}</button>
                <button id="openPrintOptionsBtn" class="print-btn export-pdf-btn" data-feature-search="true" data-feature-search-keywords="export pdf print rental" title="${escapeHtmlSafe(exportPdfLabel)}">${exportIconHtml}${escapeHtmlSafe(exportPdfLabel)}</button>
            </div>
            ${logoHtml}
            <h1>${t.overviewTitle}</h1>
            <p><strong>${t.setupNameLabel}</strong> ${safeSetupName}</p>
            <p><em>${generatedOnDisplay}</em></p>

            ${projectRequirementsHtml}

            ${deviceSectionHtml}

            ${resultsSectionHtml}

            ${diagramSectionHtml}

            ${gearListHtml}
            ${gearListActionsHtml}
            ${batteryComparisonHtml}
        </div>
    `;

    const overviewDialog = document.getElementById('overviewDialog');
    overviewDialog.innerHTML = overviewHtml;

    if (overviewDialog && !overviewDialog.hasAttribute('data-overview-outside-close')) {
        overviewDialog.addEventListener('click', event => {
            if (event.target === overviewDialog) {
                closeDialog(overviewDialog);
            }
        });
        overviewDialog.addEventListener('cancel', event => {
            event.preventDefault();
            closeDialog(overviewDialog);
        });
        overviewDialog.setAttribute('data-overview-outside-close', '');
    }
    const content = overviewDialog.querySelector('#overviewDialogContent');

    if (content) {
        const overviewGearActions = content.querySelector('.overview-gear-actions');
        if (overviewGearActions) {
            overviewGearActions.remove();
        }

        const addItemButtons = content.querySelectorAll('.gear-custom-add-btn, [data-gear-custom-add]');
        addItemButtons.forEach(button => {
            if (button && typeof button.remove === 'function') {
                button.remove();
            }
        });

        convertGearListSelectorsToPlainText(content);
    }

    const runConfiguredPrintWorkflow = (options = {}) => {
        if (!overviewDialog || !content) {
            logOverview('warn', 'Overview dialog is unavailable for exporting or printing.', undefined, {
                action: 'print-workflow',
                stage: 'dialog-missing',
            });
            return false;
        }

        runPendingPrintCleanup('pre-configured-print');

        const normalizedOptions = (options && typeof options === 'object') ? options : {};
        const prefs = normalizedOptions.preferences && typeof normalizedOptions.preferences === 'object'
            ? normalizedOptions.preferences
            : normalizedOptions;
        const sectionSelections = prefs.sections && typeof prefs.sections === 'object'
            ? prefs.sections
            : {};
        const layoutPreference = typeof prefs.layout === 'string' ? prefs.layout : 'standard';
        const mode = normalizedOptions.mode === 'print' ? 'print' : 'export';

        const cleanupTasks = [];
        const sectionConfig = getPrintSectionConfig();

        sectionConfig.forEach(section => {
            const target = content.querySelector(section.selector);
            if (!target) {
                return;
            }
            const shouldShow = Object.prototype.hasOwnProperty.call(sectionSelections, section.id)
                ? sectionSelections[section.id] !== false
                : section.defaultVisible;
            const hiddenClass = 'print-section-hidden';
            const wasHidden = target.classList.contains(hiddenClass);
            if (!shouldShow && !wasHidden) {
                target.classList.add(hiddenClass);
                cleanupTasks.push(() => target.classList.remove(hiddenClass));
            } else if (shouldShow && wasHidden) {
                target.classList.remove(hiddenClass);
                cleanupTasks.push(() => target.classList.add(hiddenClass));
            }
        });

        const hadRentalMode = content.classList.contains('rental-print-mode');
        if (layoutPreference === 'rental' && !hadRentalMode) {
            content.classList.add('rental-print-mode');
            cleanupTasks.push(() => content.classList.remove('rental-print-mode'));
        } else if (layoutPreference !== 'rental' && hadRentalMode) {
            content.classList.remove('rental-print-mode');
            cleanupTasks.push(() => content.classList.add('rental-print-mode'));
        }

        setPendingPrintCleanup(() => {
            while (cleanupTasks.length) {
                const task = cleanupTasks.pop();
                try {
                    task();
                } catch (cleanupError) {
                    logOverview('warn', 'Failed to restore print state.', cleanupError, {
                        action: 'print-cleanup',
                    });
                }
            }
            setPendingPrintCleanup(null);
        });

        const reason = layoutPreference === 'rental' && mode !== 'print' ? 'rental-export' : mode;
        const workflowOptions = { reason };
        if (mode !== 'print') {
            workflowOptions.preferFallback = true;
        }

        const success = triggerPrintWorkflow(workflowOptions);
        if (!success) {
            const failureMessage = mode === 'print'
                ? 'Unable to open the print dialog. Please check your browser settings and try again.'
                : 'Unable to start the PDF export workflow. Please enable pop-ups and try again.';
            logOverview('error', failureMessage, undefined, {
                action: 'print-workflow',
                stage: 'trigger',
                result: 'not-started',
                mode,
                layout: layoutPreference,
            });
            runPendingPrintCleanup('configured-print-failed');
            return false;
        }

        const ensureCleanup = () => runPendingPrintCleanup('overview-closed');
        overviewDialog.addEventListener('close', ensureCleanup, { once: true });
        return true;
    };

    // Exposed for V2 UI to trigger the same dialog
    const openLegacyPrintDialog = () => {
        // New Print Preview Integration - check if we should be using the new module
        // (Leaving this check if we ever want to switch back, but currently we want V1 dialog)
        /*
        const globalScope = (typeof window !== 'undefined' ? window : this);
        if (globalScope.cineFeaturePrintPreview && typeof globalScope.cineFeaturePrintPreview.open === 'function' && false) {
            // Disabled for now to force V1 dialog as requested
            globalScope.cineFeaturePrintPreview.open();
            return;
        }
        */

        const storedPreferences = loadPrintPreferences() || { sections: {}, layout: 'standard' };
        const dialogContext = getPrintOptionsDialogContext();
        const onConfirm = (result) => {
            const confirmedMode = result && result.mode === 'print' ? 'print' : 'export';
            const confirmedPreferences = result && result.preferences ? result.preferences : storedPreferences;
            runConfiguredPrintWorkflow({
                mode: confirmedMode,
                preferences: confirmedPreferences,
            });
        };
        if (dialogContext && dialogContext.dialog) {
            populatePrintOptionsDialog(dialogContext, storedPreferences, onConfirm);
            openDialog(dialogContext.dialog);
        } else {
            console.warn('Legacy print dialog not found in DOM');
            onConfirm({ mode: 'export', preferences: storedPreferences });
        }
    };

    if (typeof window !== 'undefined') {
        window.openLegacyPrintDialog = openLegacyPrintDialog;
    }

    const openOptionsBtn = overviewDialog.querySelector('#openPrintOptionsBtn');
    if (openOptionsBtn) {
        openOptionsBtn.addEventListener('click', () => {
            openLegacyPrintDialog();
        });
    }

    const applyThemeClasses = (target) => {
        if (!target || typeof document === 'undefined') return;
        const themeClasses = [
            'dark-mode',
            'light-mode',
            'pink-mode',
            'dark-accent-boost',
            'high-contrast',
            'reduce-motion',
            'relaxed-spacing',
        ];
        const activeClasses = new Set([
            ...(document.documentElement ? Array.from(document.documentElement.classList) : []),
            ...(document.body ? Array.from(document.body.classList) : []),
        ]);
        themeClasses.forEach(themeClass => {
            target.classList.toggle(themeClass, activeClasses.has(themeClass));
        });
    };

    applyThemeClasses(content);

    const closeBtn = overviewDialog.querySelector('#closeOverviewBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeDialog(overviewDialog);
        });
    }

    const overviewDeleteBtn = overviewDialog.querySelector('#overviewDeleteGearListBtn');
    if (overviewDeleteBtn) {
        const supportsCustomEvents = typeof document !== 'undefined' && typeof document.addEventListener === 'function';
        if (supportsCustomEvents) {
            function cleanup() {
                document.removeEventListener('gearlist:deleted', handleGearListDeleted);
                overviewDialog.removeEventListener('close', cleanup);
            }
            function handleGearListDeleted() {
                cleanup();
                if (overviewDialog && overviewDialog.open) {
                    generatePrintableOverview();
                }
            }
            document.addEventListener('gearlist:deleted', handleGearListDeleted);
            overviewDialog.addEventListener('close', cleanup, { once: true });
        }

        overviewDeleteBtn.addEventListener('click', event => {
            event.preventDefault();
            let usedFallback = false;
            if (typeof deleteCurrentGearList === 'function') {
                try {
                    const deleted = deleteCurrentGearList();
                    if (!supportsCustomEvents && deleted) {
                        generatePrintableOverview();
                    }
                    return;
                } catch (error) {
                    logOverview('warn', 'Failed to delete gear list from overview button', error, {
                        action: 'delete-gear-list',
                        method: 'direct-call',
                    });
                    usedFallback = true;
                }
            } else {
                usedFallback = true;
            }
            if ((usedFallback || typeof deleteCurrentGearList !== 'function') && supportsCustomEvents) {
                try {
                    document.dispatchEvent(new CustomEvent('gearlist:delete-requested', { detail: { source: 'overview' } }));
                } catch (error) {
                    if (typeof document.createEvent === 'function') {
                        const fallbackEvent = document.createEvent('CustomEvent');
                        fallbackEvent.initCustomEvent('gearlist:delete-requested', false, false, { source: 'overview' });
                        document.dispatchEvent(fallbackEvent);
                    } else {
                        logOverview('warn', 'Unable to request gear list deletion from overview', error, {
                            action: 'delete-gear-list',
                            method: 'event-dispatch',
                        });
                    }
                }
            }
        });
    }

    let removePrintMediaListener = null;
    let afterPrintRegistered = false;
    const closeAfterPrint = () => {
        runPendingPrintCleanup('close-after-print');
        if (removePrintMediaListener) {
            removePrintMediaListener();
            removePrintMediaListener = null;
        }
        if (afterPrintRegistered) {
            window.removeEventListener('afterprint', closeAfterPrint);
            afterPrintRegistered = false;
        }
        if (typeof document !== 'undefined' && document.title !== originalDocumentTitle) {
            document.title = originalDocumentTitle;
        }
        closeDialog(overviewDialog);
    };

    const printWorkflowLoggerMeta = {
        action: 'print-workflow',
        source: 'overview-dialog',
    };
    if (setupName) {
        printWorkflowLoggerMeta.setupName = setupName;
    } else if (fallbackProjectName) {
        printWorkflowLoggerMeta.projectName = fallbackProjectName;
    }
    const printWorkflowLogger = createOverviewLoggerProxy(printWorkflowLoggerMeta);

    const openFallbackPrintView = () => {
        if (!content || typeof document === 'undefined') return false;

        const hostWindow = typeof window !== 'undefined' ? window : null;
        const hostDocument = document;
        const hostBody = hostDocument.body;

        if (!hostBody) {
            logOverview('error', 'Unable to prepare the fallback print view because the document body is unavailable.', undefined, {
                action: 'print-workflow',
                stage: 'fallback-view-host',
                result: 'unavailable',
            });
            return false;
        }

        const fallbackRoot = content.cloneNode(true);
        fallbackRoot.querySelectorAll('.print-btn, .back-btn').forEach(btn => {
            if (btn && typeof btn.remove === 'function') {
                btn.remove();
            } else if (btn && btn.parentNode) {
                btn.parentNode.removeChild(btn);
            }
        });

        const htmlElement = hostDocument.documentElement;
        const htmlClassName = htmlElement ? htmlElement.className : '';
        const htmlDir = htmlElement ? htmlElement.getAttribute('dir') || '' : '';
        const htmlLang = htmlElement ? htmlElement.getAttribute('lang') || 'en' : 'en';
        const htmlInlineStyle = htmlElement ? htmlElement.getAttribute('style') || '' : '';
        const bodyElement = hostBody;
        const bodyClassName = bodyElement ? bodyElement.className : '';
        const bodyInlineStyle = bodyElement ? bodyElement.getAttribute('style') || '' : '';
        const escapedPrintDocumentTitle = escapeHtmlSafe(printDocumentTitle);

        const htmlAttributes = [
            `lang="${escapeHtmlSafe(htmlLang || 'en')}"`,
        ];
        if (htmlDir) {
            htmlAttributes.push(`dir="${escapeHtmlSafe(htmlDir)}"`);
        }
        if (htmlClassName) {
            htmlAttributes.push(`class="${escapeHtmlSafe(htmlClassName)}"`);
        }
        if (htmlInlineStyle) {
            htmlAttributes.push(`style="${escapeHtmlSafe(htmlInlineStyle)}"`);
        }

        const bodyAttributes = [];
        if (bodyClassName) {
            bodyAttributes.push(`class="${escapeHtmlSafe(bodyClassName)}"`);
        }
        if (bodyInlineStyle) {
            bodyAttributes.push(`style="${escapeHtmlSafe(bodyInlineStyle)}"`);
        }

        const fallbackDocumentHtml = `<!DOCTYPE html>
<html ${htmlAttributes.join(' ')}>
<head>
<meta charset="utf-8">
<meta name="color-scheme" content="light dark">
<title>${escapedPrintDocumentTitle}</title>
<link rel="stylesheet" href="src/styles/style.css">
<link rel="stylesheet" href="src/styles/overview.css">
<link rel="stylesheet" href="src/styles/overview-print.css" media="print">
<link rel="stylesheet" href="overview-print.css" media="screen">
</head>
<body${bodyAttributes.length ? ` ${bodyAttributes.join(' ')}` : ''}>
${fallbackRoot.outerHTML}
</body>
</html>`;

        const existingFallback = hostDocument.querySelector('iframe[data-print-fallback="true"]');
        if (existingFallback) {
            if (typeof existingFallback.remove === 'function') {
                existingFallback.remove();
            } else if (existingFallback.parentNode) {
                existingFallback.parentNode.removeChild(existingFallback);
            }
        }

        const fallbackIframe = hostDocument.createElement('iframe');
        fallbackIframe.setAttribute('data-print-fallback', 'true');
        fallbackIframe.setAttribute('aria-hidden', 'true');
        fallbackIframe.setAttribute('tabindex', '-1');
        fallbackIframe.style.position = 'fixed';
        fallbackIframe.style.width = '0';
        fallbackIframe.style.height = '0';
        fallbackIframe.style.border = '0';
        fallbackIframe.style.margin = '0';
        fallbackIframe.style.padding = '0';
        fallbackIframe.style.opacity = '0';
        fallbackIframe.style.pointerEvents = 'none';
        fallbackIframe.style.clipPath = 'inset(50%)';
        fallbackIframe.style.clip = 'rect(0 0 0 0)';
        fallbackIframe.style.overflow = 'hidden';

        let printWindowRef = null;
        let cleanupTimer = null;
        let cleanedUp = false;
        let printScheduled = false;
        let detachDocListeners = null;

        const clearCleanupTimer = () => {
            if (cleanupTimer !== null && hostWindow && typeof hostWindow.clearTimeout === 'function') {
                hostWindow.clearTimeout(cleanupTimer);
                cleanupTimer = null;
            }
        };

        const cleanupIframe = () => {
            if (cleanedUp) {
                return;
            }
            cleanedUp = true;
            clearCleanupTimer();
            fallbackIframe.removeEventListener('load', handleIframeLoad);
            fallbackIframe.removeEventListener('error', handleIframeError);
            if (fallbackIframe.parentNode) {
                fallbackIframe.parentNode.removeChild(fallbackIframe);
            }
            if (printWindowRef) {
                printWindowRef.removeEventListener('afterprint', handleAfterPrint, true);
                printWindowRef.removeEventListener('pagehide', handleAfterPrint, true);
                if (detachDocListeners) {
                    detachDocListeners();
                }
            }
            detachDocListeners = null;
            printWindowRef = null;
        };

        const handleAfterPrint = () => {
            cleanupIframe();
        };

        const triggerPrint = () => {
            if (!printWindowRef) {
                return;
            }
            try {
                if (typeof printWindowRef.focus === 'function') {
                    printWindowRef.focus();
                }
            } catch (focusError) {
                logOverview('warn', 'Unable to focus the fallback print view before printing.', focusError, {
                    action: 'print-workflow',
                    stage: 'fallback-view-focus',
                });
            }

            if (typeof printWindowRef.print !== 'function') {
                logOverview('error', 'Fallback print view is missing a print method.', undefined, {
                    action: 'print-workflow',
                    stage: 'fallback-view-print',
                    result: 'unavailable',
                });
                cleanupIframe();
                return;
            }

            try {
                printWindowRef.print();
            } catch (error) {
                logOverview('error', 'Failed to trigger print in fallback view.', error, {
                    action: 'print-workflow',
                    stage: 'fallback-view-print',
                });
            }
        };

        const scheduleTriggerPrint = () => {
            if (printScheduled) {
                return;
            }
            printScheduled = true;
            if (hostWindow && typeof hostWindow.setTimeout === 'function') {
                hostWindow.setTimeout(triggerPrint, 0);
            } else {
                triggerPrint();
            }
        };

        const handleIframeLoad = () => {
            printWindowRef = fallbackIframe.contentWindow;
            if (!printWindowRef || !printWindowRef.document) {
                cleanupIframe();
                logOverview('error', 'Unable to prepare the fallback print view.', undefined, {
                    action: 'print-workflow',
                    stage: 'fallback-view-window',
                    result: 'unavailable',
                });
                return;
            }

            const fallbackDoc = printWindowRef.document;
            try {
                fallbackDoc.title = printDocumentTitle;
            } catch (titleError) {
                void titleError;
            }

            const onReadyStateChange = () => {
                if (fallbackDoc.readyState === 'complete') {
                    fallbackDoc.removeEventListener('readystatechange', onReadyStateChange, true);
                    scheduleTriggerPrint();
                }
            };

            fallbackDoc.addEventListener('readystatechange', onReadyStateChange, true);

            const onWindowLoad = () => {
                scheduleTriggerPrint();
            };

            printWindowRef.addEventListener('load', onWindowLoad, { once: true });

            printWindowRef.addEventListener('afterprint', handleAfterPrint, true);
            printWindowRef.addEventListener('pagehide', handleAfterPrint, true);

            if (fallbackDoc.readyState === 'complete') {
                scheduleTriggerPrint();
            }

            detachDocListeners = () => {
                fallbackDoc.removeEventListener('readystatechange', onReadyStateChange, true);
                printWindowRef.removeEventListener('load', onWindowLoad);
            };
        };

        const handleIframeError = (errorEvent) => {
            cleanupIframe();
            logOverview('error', 'Unable to load the fallback print view.', errorEvent, {
                action: 'print-workflow',
                stage: 'fallback-view-load',
                result: 'failed',
            });
        };

        fallbackIframe.addEventListener('load', handleIframeLoad, { once: true });
        fallbackIframe.addEventListener('error', handleIframeError, { once: true });

        hostBody.appendChild(fallbackIframe);

        const assignContentToIframe = () => {
            if ('srcdoc' in fallbackIframe) {
                fallbackIframe.srcdoc = fallbackDocumentHtml;
                return true;
            }

            const candidateWindow = fallbackIframe.contentWindow;
            if (!candidateWindow || !candidateWindow.document) {
                return false;
            }
            const candidateDoc = candidateWindow.document;
            candidateDoc.open();
            candidateDoc.write(fallbackDocumentHtml);
            candidateDoc.close();
            return true;
        };

        const contentAssigned = assignContentToIframe();
        if (!contentAssigned) {
            cleanupIframe();
            logOverview('error', 'Unable to prepare the fallback print view.', undefined, {
                action: 'print-workflow',
                stage: 'fallback-view-content',
                result: 'unavailable',
            });
            return false;
        }

        if (hostWindow && typeof hostWindow.setTimeout === 'function') {
            cleanupTimer = hostWindow.setTimeout(() => {
                cleanupIframe();
            }, 2 * 60 * 1000);
        }

        return true;
    };

    const fallbackTriggerPrintWorkflow = (context, options = {}) => {
        const optionsObject = options && typeof options === 'object' ? options : {};
        const preferFallback = optionsObject.preferFallback === true;
        const reason = typeof optionsObject.reason === 'string' ? optionsObject.reason : '';
        const isExportReason = reason === 'export' || reason === 'rental-export';
        const preferFallbackFirst = preferFallback && !isExportReason;
        const windowRef = context && context.windowRef ? context.windowRef : (typeof window !== 'undefined' ? window : null);
        const documentRef = context && context.documentRef ? context.documentRef : (typeof document !== 'undefined' ? document : null);
        const openFallback = context && typeof context.openFallbackPrintView === 'function'
            ? context.openFallbackPrintView
            : () => false;
        const cleanup = context && typeof context.closeAfterPrint === 'function'
            ? context.closeAfterPrint
            : () => { };
        const printTitle = context && typeof context.printDocumentTitle === 'string'
            ? context.printDocumentTitle
            : '';
        const originalTitle = context && typeof context.originalDocumentTitle === 'string'
            ? context.originalDocumentTitle
            : (documentRef && typeof documentRef.title === 'string' ? documentRef.title : '');

        const attemptNative = () => {
            if (!windowRef || typeof windowRef.print !== 'function') {
                return false;
            }
            try {
                if (documentRef && printTitle) {
                    documentRef.title = printTitle;
                }
                windowRef.print();
                return true;
            } catch (error) {
                void error;
                return false;
            }
        };

        const openFallbackAndCleanup = () => {
            const opened = openFallback();
            if (opened) {
                cleanup();
            }
            return opened;
        };

        let success = false;
        if (preferFallbackFirst) {
            success = openFallbackAndCleanup();
        } else {
            success = attemptNative();
        }

        if (!success) {
            success = preferFallbackFirst ? attemptNative() : openFallbackAndCleanup();
        }

        if (!success && documentRef && printTitle && documentRef.title === printTitle) {
            try {
                documentRef.title = originalTitle;
            } catch (restoreError) {
                void restoreError;
            }
        }

        return success;
    };

    const printWorkflowContext = {
        windowRef: typeof window !== 'undefined' ? window : null,
        documentRef: typeof document !== 'undefined' ? document : null,
        printDocumentTitle,
        originalDocumentTitle,
        openFallbackPrintView,
        closeAfterPrint,
        logger: printWorkflowLogger,
    };

    const resolvedPrintWorkflow = typeof createOverviewPrintWorkflowModule === 'function'
        ? createOverviewPrintWorkflowModule(printWorkflowContext)
        : null;

    const triggerPrintWorkflow = (options = {}) => {
        if (resolvedPrintWorkflow && typeof resolvedPrintWorkflow.trigger === 'function') {
            return resolvedPrintWorkflow.trigger(options);
        }
        if (typeof triggerOverviewPrintWorkflowModule === 'function') {
            return triggerOverviewPrintWorkflowModule(printWorkflowContext, options);
        }
        return fallbackTriggerPrintWorkflow(printWorkflowContext, options);
    };

    openDialog(overviewDialog);

    if (autoPrint) {
        const printed = triggerPrintWorkflow({ reason: 'generate' });
        if (!printed) {
            logOverview('error', 'Unable to open the print dialog. Please check your browser settings and try again.', undefined, {
                action: 'print-workflow',
                stage: 'trigger',
                reason: 'generate',
                result: 'not-started',
            });
        }
    }

    if (typeof window.matchMedia === 'function') {
        const mql = window.matchMedia('print');
        const mqlListener = e => {
            if (!e.matches) {
                if (removePrintMediaListener) {
                    removePrintMediaListener();
                    removePrintMediaListener = null;
                }
                closeAfterPrint();
            }
        };
        if (mql.addEventListener) {
            mql.addEventListener('change', mqlListener);
            removePrintMediaListener = () => mql.removeEventListener('change', mqlListener);
        } else if (mql.addListener) {
            mql.addListener(mqlListener);
            removePrintMediaListener = () => mql.removeListener(mqlListener);
        }
    }
    window.addEventListener('afterprint', closeAfterPrint, { once: true });
    afterPrintRegistered = true;
}

const openLegacyPrintDialog = function () {
    generatePrintableOverview(true);
};

export { openLegacyPrintDialog, generatePrintableOverview };
console.log('✅ Overview module loaded (ESM)');
