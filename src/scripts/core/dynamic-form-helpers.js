/**
 * Cine Power Planner - Dynamic Form Helpers
 * 
 * Re-implementation of missing dynamic form logic for Device Library.
 * These functions are required by app-events.js for device creation/editing.
 */

// Global accessors
const getScope = () => (typeof window !== 'undefined' ? window : globalThis);

/**
 * Clears the dynamic fields container.
 */
export function clearDynamicFields() {
    const container = document.getElementById('dynamicFields');
    if (container) {
        container.innerHTML = '';
        container.hidden = true;
    }
}

/**
 * Manages the visibility and state of the standard Wattage field.
 * @param {string} categoryKey 
 * @param {object} deviceData 
 */
export function placeWattField(categoryKey, deviceData) {
    const wattField = document.getElementById('wattField');
    if (!wattField) return;

    // Default behavior: show watt field unless specific category types override it later
    // app-events.js handles hiding it for batteries/cameras/etc in the switch statement.
    // This helper primarily ensures it's in the default state.

    wattField.style.display = '';

    // Attempt to update label if needed? (optional, sticking to simple visibility)
}

/**
 * Builds dynamic input fields based on category schema attributes.
 * @param {string} categoryKey 
 * @param {object} deviceData 
 * @param {string[]} excludedAttrs 
 */
export function buildDynamicFields(categoryKey, deviceData = {}, excludedAttrs = []) {
    const container = document.getElementById('dynamicFields');
    if (!container) return;

    // Resolve schema attributes
    const scope = getScope();
    const getAttrs = scope.getSchemaAttributesForCategory;

    if (typeof getAttrs !== 'function') {
        console.warn('getSchemaAttributesForCategory not found, skipping dynamic fields.');
        return;
    }

    const attributes = getAttrs(categoryKey) || [];

    // Filter attributes
    const visibleAttrs = attributes.filter(attr => {
        if (excludedAttrs.includes(attr)) return false;
        // Exclude standard fields widely handled by static HTML
        if (['powerDrawWatts', 'name', 'category', 'subcategory', 'notes'].includes(attr)) return false;
        // Exclude complex fields handled by specific subsections
        if (['power', 'video', 'recordingMedia', 'lensMount', 'fizConnectors'].includes(attr)) return false;
        return true;
    });

    if (visibleAttrs.length === 0) {
        container.hidden = true;
        return;
    }

    container.hidden = false;

    visibleAttrs.forEach(attr => {
        const wrapper = document.createElement('div');
        wrapper.className = 'form-row';

        const label = document.createElement('label');
        label.htmlFor = `dynamic_${attr}`;
        label.textContent = formatLabel(attr);

        let input;

        // Heuristic for input type
        if (attr.startsWith('is') || attr.startsWith('has')) {
            input = document.createElement('input');
            input.type = 'checkbox';
            input.id = `dynamic_${attr}`;
            input.checked = !!deviceData[attr];
        } else if (attr.includes('Count') || attr.includes('Amount') || attr === 'capacity' || attr === 'pinA' || attr === 'dtapA') {
            input = document.createElement('input');
            input.type = 'number';
            input.id = `dynamic_${attr}`;
            input.step = 'any';
            input.value = deviceData[attr] !== undefined ? deviceData[attr] : '';
        } else {
            input = document.createElement('input');
            input.type = 'text';
            input.id = `dynamic_${attr}`;
            input.value = deviceData[attr] || '';
        }

        // Add custom attribute to help data collection (if needed)
        input.dataset.dynamicAttr = attr;

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        container.appendChild(wrapper);
    });
}

// Helper to format camelCase to Title Case
function formatLabel(str) {
    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
}

// Attach to global scope for legacy compatibility
const globalScope = getScope();
if (globalScope) {
    globalScope.clearDynamicFields = clearDynamicFields;
    globalScope.placeWattField = placeWattField;
    globalScope.buildDynamicFields = buildDynamicFields;
}
