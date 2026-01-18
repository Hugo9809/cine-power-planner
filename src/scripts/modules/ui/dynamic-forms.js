/**
 * @fileoverview UI MODULE: Dynamic Forms
 * 
 * Logic to dynamically build form fields based on device schema attributes.
 * Replaces global pollution in `dynamic-form-helpers.js`.
 * 
 * @module modules/ui/dynamic-forms
 */

// Helper to format camelCase to Title Case
function formatLabel(str) {
    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
}

/**
 * Clears the dynamic fields container.
 * @param {Document} doc - Optional document injection for testing.
 */
export function clearDynamicFields(doc = document) {
    const container = doc.getElementById('dynamicFields');
    if (container) {
        container.innerHTML = '';
        container.hidden = true;
    }
}

/**
 * Manages the visibility and state of the standard Wattage field.
 * @param {string} categoryKey 
 * @param {object} deviceData 
 * @param {Document} doc
 */
export function placeWattField(categoryKey, deviceData, doc = document) {
    const wattField = doc.getElementById('wattField');
    if (!wattField) return;

    // Default behavior: show watt field
    wattField.style.display = '';
}

/**
 * Builds dynamic input fields based on category schema attributes.
 * @param {string} categoryKey 
 * @param {object} deviceData 
 * @param {string[]} excludedAttrs 
 * @param {object} scope - Logic scope providing `getSchemaAttributesForCategory`.
 * @param {Document} doc
 */
export function buildDynamicFields(categoryKey, deviceData = {}, excludedAttrs = [], scope = window, doc = document) {
    const container = doc.getElementById('dynamicFields');
    if (!container) return;

    // Resolve schema attributes via injected scope
    const getAttrs = scope && typeof scope.getSchemaAttributesForCategory === 'function'
        ? scope.getSchemaAttributesForCategory
        : null;

    if (!getAttrs) {
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
        const wrapper = doc.createElement('div');
        wrapper.className = 'form-row';

        const label = doc.createElement('label');
        label.htmlFor = `dynamic_${attr}`;
        label.textContent = formatLabel(attr);

        let input;

        // Heuristic for input type
        if (attr.startsWith('is') || attr.startsWith('has')) {
            input = doc.createElement('input');
            input.type = 'checkbox';
            input.id = `dynamic_${attr}`;
            input.checked = !!deviceData[attr];
        } else if (attr.includes('Count') || attr.includes('Amount') || attr === 'capacity' || attr === 'pinA' || attr === 'dtapA') {
            input = doc.createElement('input');
            input.type = 'number';
            input.id = `dynamic_${attr}`;
            input.step = 'any';
            input.value = deviceData[attr] !== undefined ? deviceData[attr] : '';
        } else {
            input = doc.createElement('input');
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
