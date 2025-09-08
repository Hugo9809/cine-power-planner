/* global setupNameInput, currentLang, texts, devices, escapeHtml, generateConnectorSummary, cameraSelect, monitorSelect, videoSelect, distanceSelect, motorSelects, controllerSelects, batterySelect, hotswapSelect, overviewSectionIcons, breakdownListElem, totalPowerElem, totalCurrent144Elem, totalCurrent12Elem, batteryLifeElem, batteryCountElem, pinWarnElem, dtapWarnElem, getSelectedPlate, supportsBMountCamera, getCurrentGearListHtml, currentProjectInfo, generateGearListHtml, setupDiagramContainer, diagramLegend, diagramHint, getDiagramCss, openDialog, closeDialog */

function generatePrintableOverview() {
    const setupName = setupNameInput.value;
    const now = new Date();
    const localeMap = { de: 'de-DE', es: 'es-ES', fr: 'fr-FR', en: 'en-US' };
    const locale = localeMap[currentLang] || 'en-US';
    const dateTimeString = now.toLocaleDateString(locale) + ' ' + now.toLocaleTimeString();
    const t = texts[currentLang];

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
            const safeName = escapeHtml(deviceName);
            let details = '';
            if (deviceInfo !== undefined && deviceInfo !== null) {
                const connectors = generateConnectorSummary(deviceInfo);
                const infoBoxes =
                    (deviceInfo.latencyMs !== undefined ? `<div class="info-box video-conn"><strong>Latency:</strong> ${escapeHtml(String(deviceInfo.latencyMs))}</div>` : '') +
                    (deviceInfo.frequency ? `<div class="info-box video-conn"><strong>Frequency:</strong> ${escapeHtml(String(deviceInfo.frequency))}</div>` : '');
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
          const iconHtml = icon ? `<span class="category-icon" aria-hidden="true">${icon}</span>` : '';
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
    let warningHtml = '';
    if (pinWarnElem.textContent.trim() !== '') {
        warningHtml += `<p style="color: ${pinWarnElem.style.color}; font-weight: bold;">${pinWarnElem.textContent}</p>`;
    }
    if (dtapWarnElem.textContent.trim() !== '') {
        warningHtml += `<p style="color: ${dtapWarnElem.style.color}; font-weight: bold;">${dtapWarnElem.textContent}</p>`;
    }

    // REGENERATE BATTERY TABLE HTML WITH BARS FOR OVERVIEW
    let batteryTableHtml = '';
    const totalWatt = parseFloat(totalPowerElem.textContent);
    if (totalWatt > 0) {
        const totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
        const selectedBatteryName = batterySelect.value;
        const camName = cameraSelect.value;
        const plateFilter = getSelectedPlate();
        const supportsB = supportsBMountCamera(camName);
        const bMountCam = plateFilter === 'B-Mount';
        let selectedCandidate = null;
        if (selectedBatteryName && selectedBatteryName !== 'None' && devices.batteries[selectedBatteryName]) {
            const selData = devices.batteries[selectedBatteryName];
            if ((!plateFilter || selData.mount_type === plateFilter) && (supportsB || selData.mount_type !== 'B-Mount')) {
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
            const canPin = totalCurrentLow <= battInfo.pinA;
            const canDTap = !bMountCam && totalCurrentLow <= battInfo.dtapA;
            if (!canPin && !canDTap) continue;
            const hours = battInfo.capacity / totalWatt;
            const method = canPin && canDTap ? 'both pins and D-Tap' : canPin ? 'pins' : 'dtap';
            if (canPin) pinsCandidates.push({ name: battName, hours, method });
            else dtapCandidates.push({ name: battName, hours, method });
        }
        const getMethodLabel = m => {
            if (m === 'both pins and D-Tap') return 'pins & D-Tap';
            if (m === 'pins') return 'pins';
            return 'D-Tap';
        };
        const getBarClass = m => {
            if (m === 'both pins and D-Tap') return 'dual';
            if (m === 'pins') return 'pins';
            return 'dtap';
        };
        pinsCandidates.sort((a, b) => b.hours - a.hours);
        dtapCandidates.sort((a, b) => b.hours - a.hours);
        let tableHtml = `<h2>${t.batteryLifeHeading}</h2><table class="battery-table"><tr><th>${t.batteryLabel}</th><th>${t.batteryLifeLabel}</th><th>${t.batteryLifeHeading}</th></tr>`;
        const maxHours = Math.max(
            selectedCandidate ? selectedCandidate.hours : 0,
            pinsCandidates[0] ? pinsCandidates[0].hours : 0,
            dtapCandidates[0] ? dtapCandidates[0].hours : 0
        );
        if (selectedCandidate) {
            tableHtml += `<tr class="selectedBatteryRow"><td>${escapeHtml(selectedCandidate.name)}</td><td>${selectedCandidate.hours.toFixed(2)}h (${getMethodLabel(selectedCandidate.method)})</td><td><div class="barContainer"><div class="${getBarClass(selectedCandidate.method)}" style="width: ${(selectedCandidate.hours / maxHours) * 100}%;"></div></div></td></tr>`;
        }
        pinsCandidates.forEach(candidate => {
            if (selectedCandidate && candidate.name === selectedCandidate.name) return;
            tableHtml += `<tr><td>${escapeHtml(candidate.name)}</td><td>${candidate.hours.toFixed(2)}h (${getMethodLabel(candidate.method)})</td><td><div class="barContainer"><div class="${getBarClass(candidate.method)}" style="width: ${(candidate.hours / maxHours) * 100}%;"></div></div></td></tr>`;
        });
        dtapCandidates.forEach(candidate => {
            if (selectedCandidate && candidate.name === selectedCandidate.name) return;
            const alreadyInPins = pinsCandidates.some(p => p.name === candidate.name);
            if (!alreadyInPins) {
                tableHtml += `<tr><td>${escapeHtml(candidate.name)}</td><td>${candidate.hours.toFixed(2)}h (${getMethodLabel(candidate.method)})</td><td><div class="barContainer"><div class="${getBarClass(candidate.method)}" style="width: ${(candidate.hours / maxHours) * 100}%;"></div></div></td></tr>`;
            }
        });
        tableHtml += `</table>`;
        batteryTableHtml = tableHtml;
    } else {
        batteryTableHtml = '';
    }

    const safeSetupName = escapeHtml(setupName);
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
    const diagramSectionHtml = diagramAreaHtml ? `<section id="setupDiagram"><h2>${t.setupDiagramHeading}</h2>${diagramDescHtml}${diagramAreaHtml}${diagramLegendHtml}${diagramControlsHtml}${diagramHintHtml}</section>` : '';
    const diagramSectionHtmlWithBreak = diagramSectionHtml ? `<div class="page-break"></div>${diagramSectionHtml}` : '';
    const batteryTableHtmlWithBreak = batteryTableHtml ? `<div class="page-break"></div>${batteryTableHtml}` : '';

    let gearListHtml = getCurrentGearListHtml();
    if (!gearListHtml && currentProjectInfo) {
        gearListHtml = generateGearListHtml(currentProjectInfo);
    }
    const gearListHtmlWithBreak = gearListHtml ? `<div class="page-break"></div>${gearListHtml}` : '';

    const overviewHtml = `
        <div id="overviewDialogContent">
            <button id="closeOverviewBtn" class="back-btn">${t.backToAppBtn}</button>
            <button onclick="window.print()" class="print-btn">${t.printBtn}</button>
            <h1>${t.overviewTitle}</h1>
            <p><strong>${t.setupNameLabel}</strong> ${safeSetupName}</p>
            <p><em>Generated on: ${dateTimeString}</em></p>

            <h2>${t.overviewDeviceSelectionHeading || t.deviceSelectionHeading}</h2>
            ${deviceListHtml}

            <div class="page-break"></div>

            <h2>${t.resultsHeading}</h2>
            ${resultsHtml}
            ${warningHtml}

            ${diagramSectionHtmlWithBreak}

            ${gearListHtmlWithBreak}
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
    openDialog(overviewDialog);

    const closeAfterPrint = () => {
        closeDialog(overviewDialog);
    };
    if (typeof window.matchMedia === 'function') {
        const mql = window.matchMedia('print');
        const mqlListener = e => {
            if (!e.matches) {
                if (mql.removeEventListener) {
                    mql.removeEventListener('change', mqlListener);
                } else if (mql.removeListener) {
                    mql.removeListener(mqlListener);
                }
                closeAfterPrint();
            }
        };
        if (mql.addEventListener) {
            mql.addEventListener('change', mqlListener);
        } else if (mql.addListener) {
            mql.addListener(mqlListener);
        }
    }
    window.addEventListener('afterprint', closeAfterPrint, { once: true });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generatePrintableOverview };
}
