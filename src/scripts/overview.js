/* global currentLang, texts, devices, escapeHtml, generateConnectorSummary, cameraSelect, monitorSelect, videoSelect, distanceSelect, motorSelects, controllerSelects, batterySelect, hotswapSelect, overviewSectionIcons, breakdownListElem, totalPowerElem, totalCurrent144Elem, totalCurrent12Elem, batteryLifeElem, batteryCountElem, pinWarnElem, dtapWarnElem, getSelectedPlate, supportsBMountCamera, supportsGoldMountCamera, getCurrentGearListHtml, currentProjectInfo, generateGearListHtml, setupDiagramContainer, diagramLegend, diagramHint, getDiagramCss, openDialog, closeDialog, splitGearListHtml, getCssVariableValue, iconMarkup */

const getCssVarValue = (typeof getCssVariableValue === 'function'
    ? getCssVariableValue
    : (name, fallback = '') => {
        if (typeof document === 'undefined') return fallback;
        const root = document.documentElement;
        if (!root) return fallback;
        const computed = typeof window !== 'undefined' && typeof window.getComputedStyle === 'function'
            ? window.getComputedStyle(root).getPropertyValue(name).trim()
            : '';
        if (computed) return computed;
        const inline = root.style.getPropertyValue(name).trim();
        return inline || fallback;
    });

function generatePrintableOverview() {
    const escapeHtmlSafe = (value) => (typeof escapeHtml === 'function' ? escapeHtml(value) : String(value ?? ''));
    const summarizeConnectors = (device) => (typeof generateConnectorSummary === 'function' ? generateConnectorSummary(device) : '');
    const setupNameField = typeof document !== 'undefined' ? document.getElementById('setupName') : null;
    const setupName = setupNameField ? setupNameField.value : '';
    const now = new Date();
    const localeMap = { de: 'de-DE', es: 'es-ES', fr: 'fr-FR', en: 'en-US', it: 'it-IT' };
    const lang = typeof currentLang === 'string' ? currentLang : 'en';
    const locale = localeMap[lang] || 'en-US';
    const dateTimeString = now.toLocaleDateString(locale) + ' ' + now.toLocaleTimeString();
    const t = (typeof texts === 'object' && texts) ? (texts[lang] || texts.en || {}) : {};
    const customLogo = typeof localStorage !== 'undefined' ? localStorage.getItem('customLogo') : null;

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
          const gridClasses = (key === 'category_fiz_motors' || key === 'category_fiz_controllers') ? 'device-block-grid two-column' : 'device-block-grid single-column';
        deviceListHtml += `<div class="device-category"><h3>${iconHtml}${heading}</h3><div class="${gridClasses}">${sections[key].join('')}</div></div>`;
      });
      deviceListHtml += '</div>';

    const breakdownHtml = breakdownListElem.innerHTML;
    const batteryLifeUnitElem = document.getElementById("batteryLifeUnit");
    const resultsHtml = `
        <ul id="breakdownList">${breakdownHtml}</ul>
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

    // REGENERATE BATTERY TABLE HTML WITH BARS FOR OVERVIEW
    let batteryTableHtml = '';
    const totalWatt = parseFloat(totalPowerElem.textContent);
    if (totalWatt > 0) {
        const totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
        const selectedBatteryName = batterySelect.value;
        const camName = cameraSelect.value;
        const plateFilter = getSelectedPlate();
        const supportsB = supportsBMountCamera(camName);
        const supportsGold = supportsGoldMountCamera(camName);
        const bMountCam = plateFilter === 'B-Mount';
        let selectedCandidate = null;
        if (selectedBatteryName && selectedBatteryName !== 'None' && devices.batteries[selectedBatteryName]) {
            const selData = devices.batteries[selectedBatteryName];
            if (
                (!plateFilter || selData.mount_type === plateFilter) &&
                (supportsB || selData.mount_type !== 'B-Mount') &&
                (supportsGold || selData.mount_type !== 'Gold-Mount')
            ) {
                const pinOK_sel = totalCurrentLow <= selData.pinA;
                const dtapOK_sel = !bMountCam && totalCurrentLow <= selData.dtapA;
                if (pinOK_sel || dtapOK_sel) {
                    const selHours = selData.capacity / totalWatt;
                    let selMethod;
                    if (pinOK_sel && dtapOK_sel) selMethod = 'both pins and D-Tap';
                    else if (pinOK_sel) selMethod = 'pins';
                    else selMethod = 'dtap';
                    selectedCandidate = { name: selectedBatteryName, hours: selHours, method: selMethod };
                }
            }
        }

        const pinsCandidates = [];
        const dtapCandidates = [];
        for (let battName in devices.batteries) {
            if (battName === 'None') continue;
            if (selectedCandidate && battName === selectedCandidate.name) continue;
            const battInfo = devices.batteries[battName];
            if (plateFilter && battInfo.mount_type !== plateFilter) continue;
            if (!plateFilter && !supportsB && battInfo.mount_type === 'B-Mount') continue;
            if (!plateFilter && !supportsGold && battInfo.mount_type === 'Gold-Mount') continue;
            const canPin = totalCurrentLow <= battInfo.pinA;
            const canDTap = !bMountCam && totalCurrentLow <= battInfo.dtapA;
            if (!canPin && !canDTap) continue;
            const hours = battInfo.capacity / totalWatt;
            const method = canPin && canDTap ? 'both pins and D-Tap' : canPin ? 'pins' : 'dtap';
            if (canPin) pinsCandidates.push({ name: battName, hours, method });
            else dtapCandidates.push({ name: battName, hours, method });
        }
        const getMethodLabel = method => {
            const colorMap = {
                pins: { var: '--warning-color', fallback: '#FF9800', text: t.methodPinsOnly },
                'both pins and D-Tap': { var: '--success-color', fallback: '#4CAF50', text: t.methodPinsAndDTap },
                infinite: { var: '--info-color', fallback: '#007bff', text: t.methodInfinite }
            };
            const entry = colorMap[method];
            if (entry) {
                const color = getCssVarValue(entry.var, entry.fallback);
                return `<span style="color:${color};">${entry.text}</span>`;
            }
            return method === 'dtap' ? 'D-Tap' : method;
        };
        const getBarClass = method => {
            return method === 'pins' ? 'bar bar-pins-only' : 'bar';
        };
        pinsCandidates.sort((a, b) => b.hours - a.hours);
        dtapCandidates.sort((a, b) => b.hours - a.hours);
        const runtimeHeading = t.batteryLifeHeading || t.batteryComparisonHeading || 'Runtime comparison';
        let tableHtml = `<h2>${runtimeHeading}</h2><table class="battery-table"><tr><th>${t.batteryLabel}</th><th>${t.batteryLifeLabel}</th><th>${runtimeHeading}</th></tr>`;
        const maxHours = Math.max(
            selectedCandidate ? selectedCandidate.hours : 0,
            pinsCandidates[0] ? pinsCandidates[0].hours : 0,
            dtapCandidates[0] ? dtapCandidates[0].hours : 0
        );
        if (selectedCandidate) {
            tableHtml += `<tr class="selectedBatteryRow"><td>${escapeHtmlSafe(selectedCandidate.name)}</td><td>${selectedCandidate.hours.toFixed(2)}h (${getMethodLabel(selectedCandidate.method)})</td><td><div class="barContainer"><div class="${getBarClass(selectedCandidate.method)}" style="width: ${(selectedCandidate.hours / maxHours) * 100}%;"></div></div></td></tr>`;
        }
        pinsCandidates.forEach(candidate => {
            if (selectedCandidate && candidate.name === selectedCandidate.name) return;
            tableHtml += `<tr><td>${escapeHtmlSafe(candidate.name)}</td><td>${candidate.hours.toFixed(2)}h (${getMethodLabel(candidate.method)})</td><td><div class="barContainer"><div class="${getBarClass(candidate.method)}" style="width: ${(candidate.hours / maxHours) * 100}%;"></div></div></td></tr>`;
        });
        dtapCandidates.forEach(candidate => {
            if (selectedCandidate && candidate.name === selectedCandidate.name) return;
            const alreadyInPins = pinsCandidates.some(p => p.name === candidate.name);
            if (!alreadyInPins) {
                tableHtml += `<tr><td>${escapeHtmlSafe(candidate.name)}</td><td>${candidate.hours.toFixed(2)}h (${getMethodLabel(candidate.method)})</td><td><div class="barContainer"><div class="${getBarClass(candidate.method)}" style="width: ${(candidate.hours / maxHours) * 100}%;"></div></div></td></tr>`;
            }
        });
        tableHtml += `</table>`;
        batteryTableHtml = tableHtml;
    } else {
        batteryTableHtml = '';
    }

    const safeSetupName = escapeHtmlSafe(setupName);
    const diagramCss = getDiagramCss(false);

    let diagramAreaHtml = '';
    if (setupDiagramContainer) {
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
    const diagramControlsHtml = document.querySelector('.diagram-controls') ? document.querySelector('.diagram-controls').outerHTML : '';
    const diagramHintHtml = diagramHint ? diagramHint.outerHTML : '';
    const diagramDescHtml = document.getElementById('diagramDesc') ? document.getElementById('diagramDesc').outerHTML : '';
    const diagramSectionHtml = diagramAreaHtml
        ? `<section id="setupDiagram" class="diagram-section print-section"><h2>${t.setupDiagramHeading}</h2>${diagramDescHtml}${diagramAreaHtml}${diagramLegendHtml}${diagramControlsHtml}${diagramHintHtml}</section>`
        : '';
    const batteryTableHtmlWithBreak = batteryTableHtml ? `<div class="page-break"></div>${batteryTableHtml}` : '';

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
        if (parts.gearHtml) {
            gearSectionHtml = `<section id="gearListOutput" class="gear-list-section">${parts.gearHtml}</section>`;
        }
    }
    const gearListHtmlCombined = projectSectionHtml || gearSectionHtml
        ? `${projectSectionHtml || ''}${gearSectionHtml || ''}`
        : '';

    const logoHtml = customLogo ? `<img id="printLogo" src="${customLogo}" alt="Logo" />` : '';
    const contentClass = customLogo ? 'logo-present' : '';
    const overviewHtml = `
        <div id="overviewDialogContent" class="${contentClass}">
            <div class="overview-actions">
                <button id="closeOverviewBtn" class="back-btn">${t.backToAppBtn}</button>
                <button id="printOverviewBtn" class="print-btn">${t.printBtn}</button>
            </div>
            ${logoHtml}
            <h1>${t.overviewTitle}</h1>
            <p><strong>${t.setupNameLabel}</strong> ${safeSetupName}</p>
            <p><em>Generated on: ${dateTimeString}</em></p>

            <h2>${t.overviewDeviceSelectionHeading || t.deviceSelectionHeading}</h2>
            ${deviceListHtml}

            ${resultsSectionHtml}

            ${diagramSectionHtml}

            ${gearListHtmlCombined}
            ${batteryTableHtmlWithBreak}
        </div>
    `;

    const overviewDialog = document.getElementById('overviewDialog');
    overviewDialog.innerHTML = overviewHtml;
    const content = overviewDialog.querySelector('#overviewDialogContent');

    // Match current theme for on-screen overview; print stylesheet will override
    if (document.body.classList.contains('dark-mode')) {
        content.classList.add('dark-mode');
    }
    if (document.body.classList.contains('pink-mode')) {
        content.classList.add('pink-mode');
    }

    const closeBtn = overviewDialog.querySelector('#closeOverviewBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeDialog(overviewDialog);
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
        const overviewTitle = t.overviewTitle || 'Overview';

        doc.open();
        doc.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="color-scheme" content="light dark">
<title></title>
<link rel="stylesheet" href="src/styles/style.css">
<link rel="stylesheet" href="src/styles/overview.css">
<link rel="stylesheet" href="src/styles/overview-print.css" media="print">
<link rel="stylesheet" href="overview-print.css" media="screen">
</head>
<body></body>
</html>`);
        doc.close();

        doc.title = overviewTitle;

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

    const printBtn = overviewDialog.querySelector('#printOverviewBtn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            const handlePrintError = (error) => {
                if (error && error.name === 'AbortError') {
                    return;
                }
                console.warn('window.print() failed; using fallback print window.', error);
                if (openFallbackPrintView()) {
                    closeAfterPrint();
                }
            };

            if (typeof window.print !== 'function') {
                handlePrintError(new Error('Print API unavailable'));
                return;
            }

            try {
                const result = window.print();
                if (result && typeof result.then === 'function') {
                    result.catch(handlePrintError);
                }
            } catch (error) {
                handlePrintError(error);
            }
        });
    }
    openDialog(overviewDialog);

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
