/**
 * UI Population Manager
 * Handles the population of various UI elements like dropdowns, selects, and user buttons.
 */
import { DeviceCapabilityManager } from '../core/device-capability-manager.js';

export const UiPopulationManager = {
    // Dependencies resolved from window/global to handle legacy code
    resolveDependencies() {
        return {
            ensureFeedbackTemperatureOptionsSafe: (typeof window !== 'undefined' ? window.ensureFeedbackTemperatureOptionsSafe : null),
            updateFeedbackTemperatureOptionsSafe: (typeof window !== 'undefined' ? window.updateFeedbackTemperatureOptionsSafe : null),
            cineCoreUiHelpers: (typeof window !== 'undefined' ? window.cineCoreUiHelpers : null),
            lensSelect: (typeof window !== 'undefined' ? window.lensSelect : null),
            filterSelectElem: (typeof window !== 'undefined' ? window.filterSelectElem : null),
            renderFilterDetails: (typeof window !== 'undefined' ? window.renderFilterDetails : null),
            handleUserButtonAction: (typeof window !== 'undefined' ? window.handleUserButtonAction : null),
            // Proxies for session variables that might be needed
            sessionFocusScale: (typeof window !== 'undefined' ? window.sessionFocusScale : undefined),
            cameraSelect: (typeof window !== 'undefined' ? window.cameraSelect : null),
            recordingResolutionDropdown: (typeof window !== 'undefined' ? window.recordingResolutionDropdown : null),
            devices: (typeof window !== 'undefined' ? window.devices : {}),

            // Legacy populators that might still be needed if not fully extracted:
            // (None, we are moving the populators here)
        };
    },

    populateEnvironmentDropdowns() {
        const deps = this.resolveDependencies();
        const populate = (tempSelect) => {
            if (tempSelect) {
                if (typeof deps.ensureFeedbackTemperatureOptionsSafe === 'function') {
                    deps.ensureFeedbackTemperatureOptionsSafe(tempSelect);
                }
                if (typeof deps.updateFeedbackTemperatureOptionsSafe === 'function') {
                    deps.updateFeedbackTemperatureOptionsSafe();
                }
            }
        };

        const tempSelect = document.getElementById('fbTemperature');
        if (tempSelect) {
            populate(tempSelect);
        } else if (deps.cineCoreUiHelpers && typeof deps.cineCoreUiHelpers.whenElementAvailable === 'function') {
            deps.cineCoreUiHelpers.whenElementAvailable('fbTemperature', populate);
        }
    },

    populateLensDropdown() {
        const deps = this.resolveDependencies();
        const resolveLensSelect = () => {
            if (deps.lensSelect) return deps.lensSelect;
            if (typeof document !== 'undefined') return document.getElementById('lenses');
            return null;
        };

        const resolvedLensSelect = resolveLensSelect();

        if (!resolvedLensSelect) {
            if (deps.cineCoreUiHelpers && typeof deps.cineCoreUiHelpers.whenElementAvailable === 'function') {
                deps.cineCoreUiHelpers.whenElementAvailable('lenses', (el) => {
                    // Late binding if we found it
                    UiPopulationManager._performLensPopulation(el, deps);
                });
            }
            return;
        }

        this._performLensPopulation(resolvedLensSelect, deps);
    },

    _performLensPopulation(selectElement, deps) {
        const options = {
            devices: deps.devices,
            sessionFocusScale: deps.sessionFocusScale,
        };
        DeviceCapabilityManager.populateLensDropdown(selectElement, options);
    },

    populateFilterDropdown() {
        const deps = this.resolveDependencies();
        const populate = (select, elementReferenceName) => {
            const devices = deps.devices;
            if (select && devices && Array.isArray(devices.filterOptions)) {
                const fragment = document.createDocumentFragment();
                if (!select.multiple) {
                    const emptyOpt = document.createElement('option');
                    emptyOpt.value = '';
                    fragment.appendChild(emptyOpt);
                }
                for (let index = 0; index < devices.filterOptions.length; index += 1) {
                    const value = devices.filterOptions[index];
                    const opt = document.createElement('option');
                    opt.value = value;
                    opt.textContent = value;
                    fragment.appendChild(opt);
                }
                select.innerHTML = '';
                select.appendChild(fragment);
            }
        };

        const resolveFilterSelectElement = () => {
            if (deps.filterSelectElem) return deps.filterSelectElem;
            return document.querySelector('#filter'); // simplified selector check
        }

        const select = resolveFilterSelectElement();
        if (select) {
            populate(select);
        } else if (deps.cineCoreUiHelpers && typeof deps.cineCoreUiHelpers.whenElementAvailable === 'function') {
            deps.cineCoreUiHelpers.whenElementAvailable('filter', (el) => {
                // Update global if needed, usually managed elsewhere, but we can't write to window.filterSelectElem easily from here without a setter
                populate(el);
            });
        }
    },

    populateUserButtonDropdowns() {
        const deps = this.resolveDependencies();
        const userButtonContainers = document.querySelectorAll('.user-button-container');
        if (!userButtonContainers.length) return;

        const USER_BUTTON_FUNCTION_ITEMS = [
            { key: 'toggleLut', value: 'Toggle LUT' },
            { key: 'falseColor', value: 'False Color' },
            { key: 'peaking', value: 'Peaking' },
            { key: 'anamorphicDesqueeze', value: 'Anamorphic Desqueeze' },
            { key: 'surroundView', value: 'Surround View' },
            { key: 'oneToOneZoom', value: '1:1 Zoom' },
            { key: 'waveform', value: 'Waveform' },
            { key: 'histogram', value: 'Histogram' },
            { key: 'vectorscope', value: 'Vectorscope' },
            { key: 'zebra', value: 'Zebra' },
            { key: 'playback', value: 'Playback' },
            { key: 'record', value: 'Record' },
            { key: 'zoom', value: 'Zoom' },
            { key: 'frameLines', value: 'Frame Lines' },
            { key: 'frameGrab', value: 'Frame Grab' },
            { key: 'wb', value: 'WB' },
            { key: 'iso', value: 'ISO' },
            { key: 'nd', value: 'ND' },
            { key: 'fps', value: 'FPS' },
            { key: 'shutter', value: 'Shutter' }
        ];

        // Shim translation logic if available, otherwise default to value
        const items = USER_BUTTON_FUNCTION_ITEMS.map(item => ({
            label: item.value,
            value: item.key
        }));

        userButtonContainers.forEach((container, index) => {
            const select = container.querySelector('select');
            if (!select) return;

            select.innerHTML = '';
            const defaultOpt = document.createElement('option');
            defaultOpt.textContent = `User Button ${index + 1}`;
            defaultOpt.value = '';
            select.appendChild(defaultOpt);

            items.forEach(item => {
                const opt = document.createElement('option');
                opt.value = item.value;
                opt.textContent = item.label;
                select.appendChild(opt);
            });

            // Restore saved value? Usually handled by restoreSessionState, here we just populate options

            select.addEventListener('change', (e) => {
                const action = e.target.value;
                if (action && typeof deps.handleUserButtonAction === 'function') {
                    deps.handleUserButtonAction(action);
                }
            });
        });
    },

    // Forwarding specific camera property populators if we move them, 
    // but they rely heavily on scoped variables in app-session (cameraSelect, etc)
    // For now, we only extracted the top-level independent ones.
};
