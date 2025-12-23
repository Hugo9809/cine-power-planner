

describe('Media Options Logic', () => {

    let devices;

    // Helper to sort similar to the app
    const localeSort = (a, b) => a.localeCompare(b);

    // Reproduced logic from app-core-new-1.js for isolated testing
    function getAvailableStorageMediaTypes(cameraVal, devicesData) {
        const types = new Set();

        if (cameraVal && devicesData.cameras[cameraVal]) {
            const camera = devicesData.cameras[cameraVal];
            if (Array.isArray(camera.recordingMedia)) {
                camera.recordingMedia.forEach(m => types.add(m));
            }
        } else {
            // Collect from all cameras if none selected
            Object.values(devicesData.cameras).forEach(camera => {
                if (Array.isArray(camera.recordingMedia)) {
                    camera.recordingMedia.forEach(m => types.add(m));
                }
            });
            // Also include general media types
            if (devicesData.gearList && devicesData.gearList.media) {
                Object.keys(devicesData.gearList.media).forEach(m => types.add(m));
            }
        }
        return Array.from(types).sort(localeSort);
    }

    function getStorageVariantOptions(type, devicesData) {
        if (!type || !devicesData.gearList || !devicesData.gearList.media || !devicesData.gearList.media[type]) {
            return [];
        }
        const variants = [];
        const addVariant = (label) => {
            // Verification of the filtering logic:
            if (label === 'Dual Slots' || label === 'Slot 1' || label === 'Adapter') return;
            variants.push({ label, value: label });
        };
        Object.entries(devicesData.gearList.media[type]).forEach(([label]) => {
            addVariant(label);
        });
        return variants.sort((a, b) => localeSort(a.label, b.label));
    }



    beforeEach(() => {
        devices = {
            cameras: {
                'Alexa Mini': { recordingMedia: ['CFast 2.0'] },
                'Amira': { recordingMedia: ['CFast 2.0'] },
                'Venice': { recordingMedia: ['SxS', 'AXS Card'] }
            },
            gearList: {
                media: {
                    'CFast 2.0': { 'SanDisk 128GB': {} },
                    'SxS': { 'Sony 64GB': {}, 'Dual Slots': {} },
                    'SD Card': { 'SanDisk 64GB': {}, 'Adapter': {} }
                }
            }
        };
    });

    test('getAvailableStorageMediaTypes filters types based on selected camera', () => {
        // Venice selected
        let types = getAvailableStorageMediaTypes('Venice', devices);
        expect(types).toContain('SxS');
        expect(types).toContain('AXS Card');
        expect(types).not.toContain('CFast 2.0');

        // Alexa Mini selected
        types = getAvailableStorageMediaTypes('Alexa Mini', devices);
        expect(types).toContain('CFast 2.0');
        expect(types).not.toContain('SxS');
    });

    test('getAvailableStorageMediaTypes returns all types when no camera is selected', () => {
        let types = getAvailableStorageMediaTypes('', devices);
        expect(types).toContain('CFast 2.0');
        expect(types).toContain('SxS');
        expect(types).toContain('SD Card');
    });

    test('getStorageVariantOptions filters "Dual Slots", "Slot 1", and "Adapter"', () => {
        // Test SxS variants (should filter Dual Slots)
        let variants = getStorageVariantOptions('SxS', devices);
        let labels = variants.map(v => v.label);
        expect(labels).toContain('Sony 64GB');
        expect(labels).not.toContain('Dual Slots');

        // Test SD Card variants (should filter Adapter)
        variants = getStorageVariantOptions('SD Card', devices);
        labels = variants.map(v => v.label);
        expect(labels).toContain('SanDisk 64GB');
        expect(labels).not.toContain('Adapter');
    });
});
