/* global currentLang, texts, devices, escapeHtml, generateConnectorSummary, cameraSelect, monitorSelect, videoSelect, distanceSelect, motorSelects, controllerSelects, batterySelect, hotswapSelect, overviewSectionIcons, breakdownListElem, totalPowerElem, totalCurrent144Elem, totalCurrent12Elem, batteryLifeElem, batteryCountElem, pinWarnElem, dtapWarnElem, getCurrentGearListHtml, currentProjectInfo, generateGearListHtml, setupDiagramContainer, diagramLegend, diagramHint, getDiagramCss, openDialog, closeDialog, splitGearListHtml, iconMarkup, ICON_GLYPHS, deleteCurrentGearList */

function generatePrintableOverview(config = {}) {
    const safeConfig = (config && typeof config === 'object') ? config : {};
    const { autoPrint = false } = safeConfig;
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

    processSelectForOverview(cameraSelect, 'category_cameras', 'cameras');
    processSelectForOverview(monitorSelect, 'category_monitors', 'monitors');
    processSelectForOverview(videoSelect, 'category_video', 'video'); // Original database uses 'video', not 'wirelessVideo'
    processSelectForOverview(distanceSelect, 'category_fiz_distance', 'fiz', 'distance');
    motorSelects.forEach(sel => processSelectForOverview(sel, 'category_fiz_motors', 'fiz', 'motors'));
    controllerSelects.forEach(sel => processSelectForOverview(sel, 'category_fiz_controllers', 'fiz', 'controllers'));
    processSelectForOverview(batterySelect, 'category_batteries', 'batteries'); // Handle battery separately for capacity
    processSelectForOverview(hotswapSelect, 'category_batteryHotswaps', 'batteryHotswaps');

    sectionOrder.forEach(key => {
      const heading = t[key] || key;
      const icon = overviewSectionIcons[key] || '';
      const iconHtml = icon && typeof iconMarkup === 'function'
        ? iconMarkup(icon, 'category-icon')
        : icon
          ? `<span class="category-icon icon-glyph" data-icon-font="uicons" aria-hidden="true">${icon}</span>`
          : '';
      const isFizList = key === 'category_fiz_motors' || key === 'category_fiz_controllers';
      const gridClasses = isFizList ? 'device-block-grid two-column fiz-single-column' : 'device-block-grid single-column';
      deviceListHtml += `<div class="device-category"><h3>${iconHtml}${heading}</h3><div class="${gridClasses}">${sections[key].join('')}</div></div>`;
    });
    deviceListHtml += '</div>';

    const breakdownHtml = breakdownListElem.innerHTML;
    const batteryLifeUnitElem = document.getElementById("batteryLifeUnit");
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
    const resultsHtml = `
        <ul id="breakdownList">${breakdownHtml}</ul>
        ${powerDiagramHtml}
        <p><strong>${t.totalPowerLabel}</strong> ${totalPowerElem.textContent} W</p>
        <p><strong>${t.totalCurrent144Label}</strong> ${totalCurrent144Elem.textContent} A</p>
        <p><strong>${t.totalCurrent12Label}</strong> ${totalCurrent12Elem.textContent} A</p>
        <p><strong>${t.batteryLifeLabel}</strong> ${batteryLifeElem.textContent} ${batteryLifeUnitElem ? batteryLifeUnitElem.textContent : ''}</p>
        <p><strong>${t.batteryCountLabel}</strong> ${batteryCountElem.textContent}</p>
    `;

    // Get current warning messages with their colors
    const severityClassMap = {
        danger: 'status-message--danger',
        warning: 'status-message--warning',
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
    const diagramCss = typeof getDiagramCss === 'function' ? getDiagramCss(false) : '';

    let diagramAreaHtml = '';
    const hasSetupDiagramContainer =
        typeof setupDiagramContainer !== 'undefined' && setupDiagramContainer;
    if (hasSetupDiagramContainer) {
        const areaClone = setupDiagramContainer.cloneNode(true);
        const svg = areaClone.querySelector('svg');
        if (svg) {
            const style = document.createElement('style');
            style.textContent = diagramCss;
            svg.insertBefore(style, svg.firstChild);
        }
        diagramAreaHtml = areaClone.outerHTML;
    }
    const diagramLegendHtml = diagramLegend ? diagramLegend.outerHTML : '';
    const diagramHintHtml = diagramHint ? diagramHint.outerHTML : '';
    const diagramDescHtml = document.getElementById('diagramDesc') ? document.getElementById('diagramDesc').outerHTML : '';
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
        const parts = typeof splitGearListHtml === 'function'
            ? splitGearListHtml(gearListCombined)
            : { projectHtml: '', gearHtml: '' };
        if (parts.projectHtml) {
            projectSectionHtml = `<section id="projectRequirementsOutput" class="print-section project-requirements-section">${parts.projectHtml}</section>`;
        }
        if (parts.gearHtml && hasGeneratedGearList) {
            gearSectionHtml = `<section id="gearListOutput" class="gear-list-section">${parts.gearHtml}</section>`;
        }
    }
    const projectRequirementsHtml = projectSectionHtml || '';
    const gearListHtml = gearSectionHtml || '';
    const deleteGearListLabel = t.deleteGearListBtn || 'Delete Gear List';
    const deleteGearListHelp = t.deleteGearListBtnHelp || deleteGearListLabel;
    const gearListActionsHtml = gearListHtml
        ? `<div class="overview-gear-actions"><button id="overviewDeleteGearListBtn" class="overview-delete-gear-btn" title="${escapeHtmlSafe(deleteGearListHelp)}" data-help="${escapeHtmlSafe(deleteGearListHelp)}"><span class="btn-icon icon-glyph" aria-hidden="true" data-icon-font="essential">&#xF254;</span>${escapeHtmlSafe(deleteGearListLabel)}</button></div>`
        : '';

    const logoHtml = customLogo ? `<img id="printLogo" src="${customLogo}" alt="Logo" />` : '';
    const contentClass = customLogo ? 'logo-present' : '';
    const generatedOnDisplay = `${escapeHtmlSafe(generatedOnDisplayLabel)} ${escapeHtmlSafe(dateTimeString)}`;
    const exportPdfLabel = t.exportPdfBtn || 'Export PDF';
    const exportIconHtml = (() => {
        if (typeof iconMarkup === 'function' && ICON_GLYPHS && ICON_GLYPHS.fileExport) {
            try {
                return iconMarkup(ICON_GLYPHS.fileExport, 'btn-icon');
            } catch (error) {
                console.warn('Unable to render export icon for overview dialog.', error);
            }
        }
        return '<span class="btn-icon icon-glyph" aria-hidden="true" data-icon-font="uicons">&#xE7AB;</span>';
    })();
    const overviewHtml = `
        <div id="overviewDialogContent" class="${contentClass}">
            <div class="overview-actions">
                <button id="closeOverviewBtn" class="back-btn"><span class="btn-icon icon-glyph" aria-hidden="true" data-icon-font="essential">&#xF131;</span>${escapeHtmlSafe(t.backToAppBtn)}</button>
                <button id="printOverviewBtn" class="print-btn"><span class="btn-icon icon-glyph" aria-hidden="true" data-icon-font="uicons">&#xE7AB;</span>${escapeHtmlSafe(t.printBtn)}</button>
                <button id="exportPdfBtn" class="print-btn export-pdf-btn">${exportIconHtml}${escapeHtmlSafe(exportPdfLabel)}</button>
            </div>
            ${logoHtml}
            <h1>${t.overviewTitle}</h1>
            <p><strong>${t.setupNameLabel}</strong> ${safeSetupName}</p>
            <p><em>${generatedOnDisplay}</em></p>

            ${projectRequirementsHtml}

            <h2>${t.overviewDeviceSelectionHeading || t.deviceSelectionHeading}</h2>
            ${deviceListHtml}

            ${resultsSectionHtml}

            ${diagramSectionHtml}

            ${gearListHtml}
            ${gearListActionsHtml}
            ${batteryComparisonHtml}
        </div>
    `;

    const overviewDialog = document.getElementById('overviewDialog');
    overviewDialog.innerHTML = overviewHtml;
    const content = overviewDialog.querySelector('#overviewDialogContent');

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
                    console.warn('Failed to delete gear list from overview button', error);
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
                        console.warn('Unable to request gear list deletion from overview', error);
                    }
                }
            }
        });
    }

    let removePrintMediaListener = null;
    let afterPrintRegistered = false;
    const closeAfterPrint = () => {
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

    const openFallbackPrintView = () => {
        if (!content || typeof window === 'undefined') return false;
        const fallbackRoot = content.cloneNode(true);
        fallbackRoot.querySelectorAll('.print-btn, .back-btn').forEach(btn => btn.remove());
        const printWindow = window.open('', '_blank', 'noopener,noreferrer');
        if (!printWindow) {
            console.error('Unable to open a fallback print window. Please allow pop-ups and try again.');
            return false;
        }

        const doc = printWindow.document;
        const htmlElement = typeof document !== 'undefined' ? document.documentElement : null;
        const htmlClassName = htmlElement ? htmlElement.className : '';
        const htmlDir = htmlElement ? htmlElement.getAttribute('dir') || '' : '';
        const htmlLang = htmlElement ? htmlElement.getAttribute('lang') || 'en' : 'en';
        const htmlInlineStyle = htmlElement ? htmlElement.getAttribute('style') || '' : '';
        const bodyElement = typeof document !== 'undefined' ? document.body : null;
        const bodyClassName = bodyElement ? bodyElement.className : '';
        const bodyInlineStyle = bodyElement ? bodyElement.getAttribute('style') || '' : '';
        const escapedPrintDocumentTitle = escapeHtmlSafe(printDocumentTitle);
        doc.open();
        doc.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="color-scheme" content="light dark">
<title>${escapedPrintDocumentTitle}</title>
<link rel="stylesheet" href="src/styles/style.css">
<link rel="stylesheet" href="src/styles/overview.css">
<link rel="stylesheet" href="src/styles/overview-print.css" media="print">
<link rel="stylesheet" href="overview-print.css" media="screen">
</head>
<body></body>
</html>`);
        doc.close();

        doc.title = printDocumentTitle;

        const fallbackHtml = doc.documentElement;
        if (fallbackHtml) {
            fallbackHtml.setAttribute('lang', htmlLang || 'en');
            if (htmlDir) {
                fallbackHtml.setAttribute('dir', htmlDir);
            }
            if (htmlClassName) {
                fallbackHtml.className = htmlClassName;
            }
            if (htmlInlineStyle) {
                fallbackHtml.setAttribute('style', htmlInlineStyle);
            }
        }

        const fallbackBody = doc.body;
        if (fallbackBody) {
            if (bodyClassName) {
                fallbackBody.className = bodyClassName;
            }
            if (bodyInlineStyle) {
                fallbackBody.setAttribute('style', bodyInlineStyle);
            }
            fallbackBody.innerHTML = fallbackRoot.outerHTML;
        }

        const triggerPrint = () => {
            printWindow.focus();
            try {
                printWindow.print();
            } catch (error) {
                console.error('Failed to trigger print in fallback window.', error);
            }
        };

        if (printWindow.document.readyState === 'complete') {
            triggerPrint();
        } else {
            printWindow.addEventListener('load', triggerPrint, { once: true });
        }
        printWindow.addEventListener('afterprint', () => {
            printWindow.close();
        });

        return true;
    };

    const triggerPrintWorkflow = (options = {}) => {
        const { preferFallback = false, reason = 'print' } = options;
        const logPrefix = reason === 'export' ? 'Overview PDF export' : 'Overview print';
        let fallbackAttempts = 0;

        const attemptFallback = (error) => {
            fallbackAttempts += 1;
            if (error && error.name !== 'AbortError') {
                console.warn(`${logPrefix}: falling back to print window.`, error);
            }
            const opened = openFallbackPrintView();
            if (opened) {
                closeAfterPrint();
                return true;
            }
            if (error && error.name !== 'AbortError') {
                console.error(`${logPrefix}: unable to open fallback print window.`, error);
            }
            return false;
        };

        const attemptNative = () => {
            if (typeof window === 'undefined' || typeof window.print !== 'function') {
                return false;
            }
            try {
                if (typeof document !== 'undefined') {
                    document.title = printDocumentTitle;
                }
                const result = window.print();
                if (result && typeof result.then === 'function') {
                    result.catch(error => {
                        if (!fallbackAttempts) {
                            attemptFallback(error);
                        }
                    });
                }
                return true;
            } catch (error) {
                return attemptFallback(error);
            }
        };

        let success = false;

        if (preferFallback) {
            success = attemptFallback();
            if (!success) {
                success = attemptNative();
            }
        } else {
            success = attemptNative();
        }

        if (!success && fallbackAttempts === 0) {
            success = attemptFallback();
        }

        if (!success && typeof document !== 'undefined' && document.title === printDocumentTitle) {
            document.title = originalDocumentTitle;
        }

        return success;
    };

    const exportBtn = overviewDialog.querySelector('#exportPdfBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            if (exportBtn.disabled) {
                return;
            }
            exportBtn.disabled = true;
            try {
                const printStarted = triggerPrintWorkflow({ preferFallback: true, reason: 'export' });
                if (!printStarted) {
                    console.error('Unable to start the PDF export print workflow. Please enable pop-ups and try again.');
                }
            } catch (error) {
                console.error('Failed to export overview PDF via print workflow.', error);
            } finally {
                exportBtn.disabled = false;
            }
        });
    }

    const printBtn = overviewDialog.querySelector('#printOverviewBtn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            const success = triggerPrintWorkflow({ reason: 'print' });
            if (!success) {
                console.error('Unable to open the print dialog. Please check your browser settings and try again.');
            }
        });
    }
    openDialog(overviewDialog);

    if (autoPrint) {
        const printed = triggerPrintWorkflow({ reason: 'generate' });
        if (!printed) {
            console.error('Unable to open the print dialog. Please check your browser settings and try again.');
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generatePrintableOverview };
}
