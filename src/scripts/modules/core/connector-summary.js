/**
 * Connector Summary Module
 * 
 * Generates the connector summary view for devices and Setup helpers.
 * Extracted from app-setups.js.
 */

import { createFallbackIconMarkup } from '../ui-helpers.js';

// --- Helpers ---

function safeIconMarkup(glyph, cls, factory) {
    if (typeof factory === 'function') {
        try {
            return factory(glyph, cls);
        } catch { /* ignore */ }
    }
    return createFallbackIconMarkup(glyph, cls);
}

function renderInfoLabel(text) {
    return text ? `<span class="info-label-inline">${text}: </span>` : '';
}

function connectorBlocks(items, icon, cls, label, dir, iconFactory) {
    if (!Array.isArray(items) || items.length === 0) return '';
    const entries = items.map(p => {
        if (!p) return '';
        const name = p.type || p.name || 'Unknown';
        const volt = p.voltage || p.voltageRange ? ` (${p.voltage || p.voltageRange}V)` : '';
        const maxA = p.maxA ? ` ${p.maxA}A` : '';
        const note = p.notes ? ` [${p.notes}]` : '';
        return `${name}${volt}${maxA}${note}`;
    }).filter(Boolean);

    if (entries.length === 0) return '';

    // HTML Escape entries? 'items' usually come from schema which is trusted or needs escaping.
    // app-setups.js didn't explicitly escape these in 'connectorBlocks' loop but let's be safe if we can.
    // For now keeping parity with legacy logic which just joined them.

    const labelText = label ? `${label}${dir ? ` ${dir}` : ''}` : '';
    const labelHtml = renderInfoLabel(labelText);
    const iconHtml = safeIconMarkup(icon, 'connector-icon', iconFactory);
    return `<span class="connector-block ${cls}">${iconHtml}${labelHtml}${entries.join(', ')}</span>`;
}

// --- Exports ---

export function suggestChargerCounts(total) {
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

export function addArriKNumber(name, { devices } = {}) {
    if (!name) return name;
    const d = devices || {};
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

export const formatFizCable = (name, context) => {
    const cleaned = sanitizeFizContext(context);
    return cleaned ? `${name} (${cleaned})` : name;
};

export function suggestArriFizCables(config = {}) {
    const {
        camera = '',
        motors = [],
        controllers = [],
        distance = '',
        devices = {},
    } = config;

    const CABLE_LBUS_05 = 'LBUS to LBUS 0,5m';
    const CABLE_UDM_SERIAL_4P = 'Cable UDM – SERIAL (4p) 0,5m';
    const CABLE_UDM_SERIAL_7P = 'Cable UDM – SERIAL (7p) 1,5m';
    const cables = [];
    const lbusLengths = [];
    const camSpare = [];

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

export function generateConnectorSummary(device, dependencies = {}) {
    if (!device || typeof device !== 'object') return '';

    const {
        focusScalePreference,
        normalizeFocusScale,
        currentLang = 'en',
        diagramConnectorIcons = {},
        powerInputTypes = () => [],
        ICON_GLYPHS = {},
        DIAGRAM_MONITOR_ICON,
        parseBatteryCurrentLimit = val => Number(val),
        iconMarkup = createFallbackIconMarkup
    } = dependencies;

    const normalizeFocusScaleValue = (value) => {
        if (typeof value !== 'string') {
            return '';
        }
        const normalized = value.trim().toLowerCase();
        return normalized === 'imperial' || normalized === 'metric' ? normalized : '';
    };

    const resolveFocusScaleMode = () => {
        const rawPreference = focusScalePreference || 'metric';
        if (typeof normalizeFocusScale === 'function') {
            try {
                const normalized = normalizeFocusScale(rawPreference);
                if (normalized === 'imperial' || normalized === 'metric') {
                    return normalized;
                }
            } catch { /* ignore */ }
        }
        const normalized = normalizeFocusScaleValue(rawPreference);
        return normalized || 'metric';
    };

    const focusScaleMode = resolveFocusScaleMode();

    const formatNumber = (value, options = {}) => {
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
                return new Intl.NumberFormat(currentLang, {
                    maximumFractionDigits,
                    minimumFractionDigits,
                }).format(numeric);
            } catch { /* ignore */ }
        }

        const digits = Math.max(minimumFractionDigits, Math.min(20, maximumFractionDigits));
        try {
            return numeric.toFixed(digits);
        } catch { /* ignore */ }

        return String(numeric);
    };

    const formatWeight = (grams, mode = focusScaleMode) => {
        const numeric = typeof grams === 'string' ? Number(grams) : grams;
        if (!Number.isFinite(numeric)) {
            return '';
        }
        const useImperial = mode === 'imperial';
        if (useImperial) {
            const pounds = numeric / 453.59237;
            const digits = pounds >= 10 ? 1 : 2;
            const formatted = formatNumber(pounds, { maximumFractionDigits: digits, minimumFractionDigits: 0 });
            return formatted ? `${formatted} lb` : '';
        }
        const formatted = formatNumber(numeric, { maximumFractionDigits: 0, minimumFractionDigits: 0 });
        return formatted ? `${formatted} g` : '';
    };

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
        portHtml += connectorBlocks(items, icon, cls, label, dir, iconMarkup);
    }

    let specHtml = '';
    // Replicating spec blocks...
    const escape = (str) => String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);

    if (typeof device.powerDrawWatts === 'number') {
        specHtml += `<span class="info-box power-conn">${safeIconMarkup(diagramConnectorIcons.powerSpec, '', iconMarkup)}${renderInfoLabel('Power')}${device.powerDrawWatts} W</span>`;
    }
    if (device.power?.input?.voltageRange) {
        specHtml += `<span class="info-box power-conn">${safeIconMarkup(ICON_GLYPHS.batteryBolt, '', iconMarkup)}${renderInfoLabel('Voltage')}${escape(String(device.power.input.voltageRange))}V</span>`;
    }
    if (typeof device.weight_g === 'number') {
        const weightLabel = formatWeight(device.weight_g);
        if (weightLabel) {
            specHtml += `<span class="info-box neutral-conn">${safeIconMarkup(ICON_GLYPHS.gears, '', iconMarkup)}${renderInfoLabel('Weight')}${escape(weightLabel)}</span>`;
        }
    }
    if (typeof device.capacity === 'number') {
        specHtml += `<span class="info-box power-conn">${safeIconMarkup(ICON_GLYPHS.batteryFull, '', iconMarkup)}${renderInfoLabel('Capacity')}${device.capacity} Wh</span>`;
    }
    const pinLimit = parseBatteryCurrentLimit(device.pinA);
    if (Number.isFinite(pinLimit) && pinLimit > 0) {
        specHtml += `<span class="info-box power-conn">${renderInfoLabel('Pins')}${pinLimit}A</span>`;
    }
    if (typeof device.dtapA === 'number') {
        specHtml += `<span class="info-box power-conn">${renderInfoLabel('D-Tap')}${device.dtapA}A</span>`;
    }
    if (device.mount_type) {
        specHtml += `<span class="info-box power-conn">${renderInfoLabel('Mount')}${escape(String(device.mount_type))}</span>`;
    }
    if (typeof device.screenSizeInches === 'number') {
        specHtml += `<span class="info-box video-conn">${safeIconMarkup(DIAGRAM_MONITOR_ICON, '', iconMarkup)}${renderInfoLabel('Screen')}${device.screenSizeInches}"</span>`;
    }
    if (typeof device.brightnessNits === 'number') {
        specHtml += `<span class="info-box video-conn">${safeIconMarkup(ICON_GLYPHS.brightness, '', iconMarkup)}${renderInfoLabel('Brightness')}${device.brightnessNits} nits</span>`;
    }
    if (typeof device.wirelessTx === 'boolean') {
        specHtml += `<span class="info-box video-conn">${safeIconMarkup(ICON_GLYPHS.wifi, '', iconMarkup)}${renderInfoLabel('Wireless')}${device.wirelessTx}</span>`;
    }
    if (device.internalController) {
        specHtml += `<span class="info-box fiz-conn">${safeIconMarkup(diagramConnectorIcons.controller, '', iconMarkup)}${renderInfoLabel('Controller')}Internal</span>`;
    }
    if (typeof device.torqueNm === 'number') {
        specHtml += `<span class="info-box fiz-conn">${safeIconMarkup(diagramConnectorIcons.torque, '', iconMarkup)}${renderInfoLabel('Torque')}${device.torqueNm} Nm</span>`;
    }
    if (device.powerSource) {
        specHtml += `<span class="info-box power-conn">${safeIconMarkup(diagramConnectorIcons.powerSource, '', iconMarkup)}${renderInfoLabel('Power Source')}${escape(String(device.powerSource))}</span>`;
    }

    const uniqueList = list => {
        if (!Array.isArray(list)) return [];
        const seen = new Set();
        const values = [];
        list.forEach(entry => {
            const str = entry != null ? String(entry).trim() : '';
            if (!str || seen.has(str)) return;
            seen.add(str);
            values.push(escape(str));
        });
        return values;
    };

    const appendListBox = (html, values, label, cls, icon) => {
        const formatted = uniqueList(values);
        if (!formatted.length) return html;
        const iconHtml = safeIconMarkup(icon, '', iconMarkup);
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
            const mount = p.mount ? ` (${escape(p.mount)})` : '';
            return `${escape(p.type)}${mount}`;
        });
        extraHtml += `<span class="info-box power-conn">${renderInfoLabel('Battery Plate')}${types.join(', ')}</span>`;
    }
    if (Array.isArray(device.viewfinder) && device.viewfinder.length) {
        const types = device.viewfinder.map(v => escape(v.type));
        extraHtml += `<span class="info-box video-conn">${renderInfoLabel('Viewfinder')}${types.join(', ')}</span>`;
    }
    if (Array.isArray(device.gearTypes) && device.gearTypes.length) {
        const types = device.gearTypes.map(g => escape(g));
        extraHtml += `<span class="info-box fiz-conn">${renderInfoLabel('Gear')}${types.join(', ')}</span>`;
    }
    if (device.connectivity) {
        extraHtml += `<span class="info-box video-conn">${renderInfoLabel('Connectivity')}${escape(String(device.connectivity))}</span>`;
    }
    if (device.notes) {
        extraHtml += `<span class="info-box neutral-conn">${renderInfoLabel('Notes')}${escape(String(device.notes))}</span>`;
    }

    let lensHtml = '';
    if (Array.isArray(device.lensMount)) {
        const boxes = device.lensMount.map(lm => {
            const mount = lm.mount ? ` (${escape(lm.mount)})` : '';
            return `<span class="info-box neutral-conn">${escape(lm.type)}${mount}</span>`;
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

    // Automatically handle any remaining attributes not explicitly covered above
    const handledKeys = new Set([
        'power', 'powerDrawWatts', 'weight_g', 'capacity', 'pinA', 'dtapA', 'mount_type',
        'screenSizeInches', 'brightnessNits', 'wirelessTx', 'internalController', 'torqueNm', 'powerSource',
        'sensorModes', 'resolutions', 'frameRates', 'recordingCodecs', 'recordingMedia',
        'viewfinder', 'gearTypes', 'connectivity', 'notes', 'lensMount',
        'video', 'videoInputs', 'videoOutputs', 'fizConnectors', 'timecode',
        'audioInput', 'audioOutput', 'audioIo'
    ]);

    let otherHtml = '';
    const formatKeyLabel = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .replace(/_/g, ' ')
            .trim();
    };

    Object.entries(device).forEach(([key, value]) => {
        if (handledKeys.has(key)) return;
        if (value === null || value === undefined || value === '') return;

        if (key === 'verified_source') {
            const url = String(value);
            otherHtml += `<span class="info-box neutral-conn"><a href="${escape(url)}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;">Source</a></span>`;
            return;
        }

        const label = formatKeyLabel(key);

        if (Array.isArray(value)) {
            const safeValues = value.map(v => typeof v === 'string' ? v : JSON.stringify(v));
            if (safeValues.length) {
                const valuesHtml = `<span class="info-box-values">${safeValues.map(escape).join(', ')}</span>`;
                const iconHtml = (ICON_GLYPHS && ICON_GLYPHS.fileText) ? safeIconMarkup(ICON_GLYPHS.fileText, '', iconMarkup) : '';
                otherHtml += `<span class="info-box neutral-conn info-box-list">${iconHtml}${renderInfoLabel(label)}${valuesHtml}</span>`;
            }
        } else if (typeof value === 'object') {
            // Skip complex objects
        } else {
            let displayValue = String(value);
            if (typeof value === 'boolean') {
                displayValue = value ? 'Yes' : 'No';
            }
            otherHtml += `<span class="info-box neutral-conn">${renderInfoLabel(label)}${escape(displayValue)}</span>`;
        }
    });

    if (otherHtml) {
        html += section('Other Attributes', otherHtml);
    }

    return html ? `<div class="connector-summary">${html}</div>` : '';
}
