(function createCineDeviceNormalizationModule() {
    const globalScope =
        (typeof globalThis !== 'undefined' && globalThis) ||
        (typeof window !== 'undefined' && window) ||
        (typeof self !== 'undefined' && self) ||
        (typeof global !== 'undefined' && global) ||
        {};

    // Use a Set for O(1) lookups when validating video output types
    const VIDEO_OUTPUT_TYPES = new Set([
        '3G-SDI',
        '6G-SDI',
        '12G-SDI',
        'Mini BNC',
        'HDMI',
        'Mini HDMI',
        'Micro HDMI',
        'DisplayPort'
    ]);

    const NORMALIZED_FLAG_KEY = '__normalized';

    /**
     * Memoize a normalisation function for repeated lookups.
     *
     * The provided function receives both the original trimmed string and a
     * lowercase key. Results are cached to avoid recomputing normalisations for
     * the same input.
     *
     * @param {(value: string, key: string) => string} fn - Function that performs
     *   normalisation.
     * @returns {(value: string) => string} Wrapped function with memoisation and
     *   empty-string fallback for falsy inputs.
     */
    function memoizeNormalization(fn) {
        const cache = new Map();
        return value => {
            if (!value) return '';
            const str = String(value)
                .replace(/[™®]/g, '')
                .trim();
            const key = str.toLowerCase();
            if (!cache.has(key)) cache.set(key, fn(str, key));
            return cache.get(key);
        };
    }

    const VIDEO_TYPE_PATTERNS = [
        { needles: ['12g'], value: '12G-SDI' },
        { needles: ['6g'], value: '6G-SDI' },
        { needles: ['3g'], value: '3G-SDI' },
        // Accept both "HD-SDI" and "HD SDI" spellings
        { needles: ['hd', 'sdi'], value: '3G-SDI' },
        { needles: ['mini', 'bnc'], value: 'Mini BNC' },
        { needles: ['micro', 'hdmi'], value: 'Micro HDMI' },
        { needles: ['mini', 'hdmi'], value: 'Mini HDMI' },
        { needles: ['hdmi'], value: 'HDMI' },
        { needles: ['displayport'], value: 'DisplayPort' },
        { needles: ['display', 'port'], value: 'DisplayPort' },
        { needles: ['dp'], value: 'DisplayPort' }
    ];

    var normalizeVideoType = memoizeNormalization((_, key) => {
        const match = VIDEO_TYPE_PATTERNS.find(({ needles }) =>
            needles.every(n => key.includes(n))
        );
        return match ? match.value : '';
    });

    const FIZ_CONNECTOR_MAP = {
        'lemo 4-pin (lbus)': 'LBUS (LEMO 4-pin)',
        'lbus (lemo 4-pin)': 'LBUS (LEMO 4-pin)',
        'lbus (4-pin lemo)': 'LBUS (LEMO 4-pin)',
        'lbus (4-pin lemo for motors)': 'LBUS (LEMO 4-pin)',
        '4-pin lemo (lbus)': 'LBUS (LEMO 4-pin)',
        'lemo 4-pin': 'LEMO 4-pin',
        '4-pin lemo': 'LEMO 4-pin',
        'lemo 7-pin': 'LEMO 7-pin',
        'lemo 7-pin 1b': 'LEMO 7-pin',
        '7-pin lemo': 'LEMO 7-pin',
        '7-pin lemo (lcs)': 'LEMO 7-pin (LCS)',
        '7-pin lemo (cam)': 'LEMO 7-pin (CAM)',
        'ext (lemo 7-pin)': 'EXT LEMO 7-pin',
        'hirose 12pin': 'Hirose 12-pin',
        '12-pin hirose': 'Hirose 12-pin',
        '12pin broadcast connector': 'Hirose 12-pin',
        'lens 12 pin': 'Hirose 12-pin',
        'lens terminal 12-pin': 'Hirose 12-pin',
        'lens terminal 12-pin jack': 'Hirose 12-pin',
        'lens terminal': 'Hirose 12-pin',
        'usb type-c': 'USB-C',
        'usb-c': 'USB-C',
        'usb-c (usb 3.2 / 3.1 gen 1)': 'USB-C',
        'usb-c / gigabit ethernet (via adapter)': 'USB-C',
        'active ef mount': 'Active EF mount',
        'lanc (2.5mm stereo mini jack)': 'LANC',
        '2.5 mm sub-mini (lanc)': 'LANC',
        'remote a (2.5mm)': 'REMOTE A connector',
        'remote control terminal': 'REMOTE A connector',
        'remote 8 pin': 'REMOTE B connector'
    };

    function createMapNormalizer(map) {
        return memoizeNormalization((str, key) => map[key] || str);
    }

    var normalizeFizConnectorType = createMapNormalizer(FIZ_CONNECTOR_MAP);

    const VIEWFINDER_TYPE_MAP = {
        'dsmc3 red touch 7" lcd (optional)': 'RED Touch 7" LCD (Optional)',
        'red touch 7.0" lcd (optional)': 'RED Touch 7" LCD (Optional)',
        'lcd touch panel': 'LCD touchscreen',
        'lcd touchscreen': 'LCD touchscreen',
        'native lcd capacitive touchscreen': 'LCD touchscreen',
        'integrated touchscreen lcd': 'LCD touchscreen',
        'free-angle lcd': 'Vari-angle LCD',
        'lcd monitor (native)': 'Integrated LCD monitor',
        'native lcd viewfinder': 'Integrated LCD monitor',
        'lcd monitor lm-v2 (supplied)': 'LCD Monitor LM-V2',
        'integrated main monitor': 'Integrated LCD monitor',
        'optional evf-v70 viewfinder': 'EVF-V70 (Optional)',
        'optional evf-v50': 'EVF-V50 (Optional)',
        'optional oled viewfinder': 'OLED EVF (Optional)',
        'blackmagic pocket cinema camera pro evf (optional)': 'Blackmagic Pro EVF (Optional)',
        'external backlit lcd status display': 'LCD status display',
        'built-in fold-out lcd': 'Fold-out LCD',
        'oled lvf (live view finder)': 'OLED EVF',
        'lcd capacitive touchscreen': 'LCD touchscreen',
        'lemo 26 pin': 'LEMO 26-pin port'
    };

    var normalizeViewfinderType = createMapNormalizer(VIEWFINDER_TYPE_MAP);

    const POWER_PORT_TYPE_MAP = {
        'lemo 8-pin (dc in / bat)': 'Bat LEMO 8-pin',
        'lemo 8-pin (bat)': 'Bat LEMO 8-pin',
        'bat (lemo 8-pin)': 'Bat LEMO 8-pin',
        'lemo 8-pin': 'Bat LEMO 8-pin',
        '2-pin dc-input': '2-pin DC-IN',
        'dc-': 'DC IN',
        'dc': 'DC IN',
        '2-pin xlr': 'XLR 2-pin',
        '2-pin locking connector': 'LEMO 2-pin',
        '2-pin locking connector / 2-pin lemo': 'LEMO 2-pin',
        '4-pin xlr / dc in 12v': 'XLR 4-pin',
        '4-pin xlr / v-lock': 'XLR 4-pin',
        'xlr 4-pin jack': 'XLR 4-pin',
        'xlr 4-pin (main input)': 'XLR 4-pin',
        'xlr-type 4 pin (male) / square-shaped 5 pin connector (battery)': 'XLR 4-pin / Square 5-pin',
        '12-pin molex connector (at battery plate rear) / 4-pin xlr (external power)': 'Molex 12-pin / XLR 4-pin',
        'battery slot': 'Battery Slot',
        'usb-c': 'USB-C',
        'usb type-c': 'USB-C',
        'usb-c pd': 'USB-C PD',
        'usb-c (power delivery)': 'USB-C PD',
        'usb-c pd,dc coupler': 'USB-C PD / DC Coupler',
        'dc coupler': 'DC Coupler',
        'dc coupler (dr-e6c)': 'DC Coupler',
        'dc input': 'DC IN',
        'dc barrel': 'DC Barrel',
        'dc (barrel)': 'DC Barrel',
        'locking dc barrel': 'DC Barrel',
        'dc 24v terminal': 'DC Barrel',
        'weipu sf610/s2 (12vdc) input': 'Weipu SF610/S2',
        '6-pin 1b dc-in / tb50 battery mount': '6-pin 1B DC-IN',
        '6-pin 1b dc-,tb50': '6-pin 1B DC-IN'
    };

    const mapPowerPortOne = createMapNormalizer(POWER_PORT_TYPE_MAP);

    function normalizePowerPortType(type) {
        if (!type) return [];
        const toArray = val => {
            const normalized = mapPowerPortOne(val);
            if (!normalized) return [];
            return normalized
                .split(/[/,]/)
                .map(piece => mapPowerPortOne(piece.trim()))
                .map(piece => (piece && piece.trim()) || '')
                .filter(Boolean);
        };
        return Array.isArray(type) ? type.flatMap(toArray) : toArray(type);
    }

    function ensureList(list, defaults) {
        if (!Array.isArray(list)) return [];
        return list.map(item =>
            typeof item === 'string'
                ? { ...defaults, type: item }
                : { ...defaults, ...(item || {}) }
        );
    }

    function fixPowerInput(dev) {
        if (!dev) return;
        if (dev.powerInput && !dev.power?.input) {
            dev.power = { ...(dev.power || {}), input: { type: normalizePowerPortType(dev.powerInput) } };
            delete dev.powerInput;
        }
        const input = dev.power?.input;
        if (!input) return;
        const normalizeEntry = it => {
            if (typeof it === 'string') {
                return { type: normalizePowerPortType(it) };
            }
            if (it) {
                const { portType: pType, type: tType, ...rest } = it;
                const typeField = (!tType && pType) ? pType : tType;
                return { ...rest, type: typeField ? normalizePowerPortType(typeField) : [] };
            }
            return { type: [] };
        };
        dev.power.input = Array.isArray(input) ? input.map(normalizeEntry) : normalizeEntry(input);
    }

    function applyFixPowerInput(collection) {
        if (!collection || typeof collection !== 'object') return;
        Object.values(collection).forEach(fixPowerInput);
    }


    function hasNormalizedDevicesMarker(bundle) {
        return Boolean(
            bundle &&
            Object.prototype.hasOwnProperty.call(bundle, NORMALIZED_FLAG_KEY) &&
            bundle[NORMALIZED_FLAG_KEY]
        );
    }

    function markDevicesNormalized(bundle) {
        if (!bundle || typeof bundle !== 'object') {
            return bundle;
        }
        try {
            Object.defineProperty(bundle, NORMALIZED_FLAG_KEY, {
                configurable: true,
                enumerable: false,
                value: true,
                writable: true
            });
        } catch (defineNormalizedError) {
            void defineNormalizedError;
            bundle[NORMALIZED_FLAG_KEY] = true;
        }
        return bundle;
    }


    // Normalize various camera properties so downstream logic works with
    // consistent structures and value formats.
    function unifyDevices(devicesData, options) {
        if (!devicesData || typeof devicesData !== 'object') return devicesData;
        const force = Boolean(options && options.force);
        if (!force && hasNormalizedDevicesMarker(devicesData)) {
            return devicesData;
        }
        Object.values(devicesData.cameras || {}).forEach(cam => {
            if (cam.power?.input && cam.power.input.powerDrawWatts !== undefined) {
                delete cam.power.input.powerDrawWatts;
            }
            fixPowerInput(cam);
            if (Array.isArray(cam.power?.batteryPlateSupport)) {
                cam.power.batteryPlateSupport = cam.power.batteryPlateSupport.map(it => {
                    if (typeof it === 'string') {
                        const m = it.match(/([^()]+)(?:\(([^)]+)\))?(?:\s*-\s*(.*))?/);
                        const type = m ? m[1].trim() : it;
                        let mount = m && m[2] ? m[2].trim().toLowerCase() : '';
                        if (!mount) {
                            mount = /adapted|via adapter/i.test(it) ? 'adapted' : 'native';
                        } else if (/via adapter/i.test(mount)) {
                            mount = 'adapted';
                        }
                        const notes = m && m[3] ? m[3].trim() : (/via adapter/i.test(it) ? 'via adapter' : '');
                        return { type, mount, notes };
                    }
                    return {
                        type: it.type || '',
                        mount: (it.mount ? it.mount : (it.native ? 'native' : (it.adapted ? 'adapted' : 'native'))).toLowerCase(),
                        notes: it.notes || ''
                    };
                });
            }
            if (cam.power) {
                cam.power.powerDistributionOutputs = ensureList(cam.power.powerDistributionOutputs, {
                    type: '',
                    voltage: '',
                    current: '',
                    wattage: null,
                    notes: ''
                });
            }
            cam.videoOutputs = ensureList(cam.videoOutputs, { type: '', notes: '' }).flatMap(vo => {
                const { count, ...rest } = vo || {};
                const norm = normalizeVideoType(rest.type);
                if (!VIDEO_OUTPUT_TYPES.has(norm)) return [];
                const parsedCount = parseInt(count, 10);
                const num = Number.isFinite(parsedCount) && parsedCount > 0 ? parsedCount : 1;
                const base = { ...rest, type: norm, notes: rest.notes || '' };
                return Array.from({ length: num }, () => ({ ...base }));
            });
            cam.fizConnectors = ensureList(cam.fizConnectors, { type: '', notes: '' }).map(fc => {
                const { type, ...rest } = fc || {};
                return { ...rest, type: normalizeFizConnectorType(type) };
            });
            cam.viewfinder = ensureList(cam.viewfinder, { type: '', resolution: '', connector: '', notes: '' }).map(vf => {
                const { type, ...rest } = vf || {};
                return {
                    ...rest,
                    type: normalizeViewfinderType(type)
                };
            });
            cam.recordingMedia = ensureList(cam.recordingMedia, { type: '', notes: '' }).map(m => {
                let { type = '', notes = '' } = m || {};
                const match = type.match(/^(.*?)(?:\((.*)\))?$/);
                if (match) {
                    type = match[1].trim();
                    notes = notes || (match[2] ? match[2].trim() : '');
                }
                if (/^SD UHS-II$/i.test(type)) {
                    type = 'SD Card';
                    notes = notes ? `${notes}; UHS-II` : 'UHS-II';
                } else if (/^SD \(UHS-II\/UHS-I\)$/i.test(type)) {
                    type = 'SD Card';
                    notes = 'UHS-II/UHS-I';
                } else if (type === 'CFast 2.0 card slots') {
                    type = 'CFast 2.0';
                    notes = notes || 'Dual Slots';
                } else if (type === 'CFexpress Type B (Dual Slots)') {
                    type = 'CFexpress Type B';
                    notes = notes || 'Dual Slots';
                } else if (type === 'CFexpress Type B (via adapter)') {
                    type = 'CFexpress Type B';
                    notes = notes || 'via adapter';
                } else if (/^SD UHS-II \(Dual Slots\)$/i.test(type)) {
                    type = 'SD Card';
                    notes = notes ? `${notes}; UHS-II (Dual Slots)` : 'UHS-II (Dual Slots)';
                } else if (type === 'SD Card (Dual Slots)') {
                    type = 'SD Card';
                    notes = notes || 'Dual Slots';
                } else if (type === 'SD card slot (for proxy/backup)') {
                    type = 'SD Card';
                    notes = notes || 'for proxy/backup';
                }
                return { type, notes };
            });
            cam.timecode = ensureList(cam.timecode, { type: '', notes: '' });
            cam.lensMount = ensureList(cam.lensMount, { type: '', mount: 'native', notes: '' })
                .map(lm => ({
                    type: lm.type,
                    mount: (lm.mount ? lm.mount.toLowerCase() : 'native'),
                    notes: lm.notes || ''
                }))
                .filter((lm, idx, arr) =>
                    idx === arr.findIndex(o => o.type === lm.type && o.mount === lm.mount && o.notes === lm.notes)
                );
        });

        Object.values(devicesData.lenses || {}).forEach(lens => {
            if (!lens || typeof lens !== 'object') return;
            const normalizeMountEntry = (entry) => {
                if (!entry) return null;
                if (typeof entry === 'string') {
                    const trimmed = entry.trim();
                    if (!trimmed) return null;
                    return { type: trimmed, mount: 'native' };
                }
                const type = typeof entry.type === 'string' ? entry.type.trim() : '';
                if (!type) return null;
                const status = typeof entry.mount === 'string' ? entry.mount.trim().toLowerCase() : '';
                return { type, mount: status === 'adapted' ? 'adapted' : 'native' };
            };

            const existingMountOptions = lens.mountOptions;
            const normalizedOptions = [];

            const pushNormalizedEntry = (entry) => {
                const normalized = normalizeMountEntry(entry);
                if (normalized) {
                    normalizedOptions.push(normalized);
                }
            };

            if (Array.isArray(existingMountOptions)) {
                existingMountOptions.forEach(pushNormalizedEntry);
            } else if (existingMountOptions && typeof existingMountOptions === 'object') {
                pushNormalizedEntry(existingMountOptions);
            }

            if (!normalizedOptions.length && Array.isArray(lens.lensMount)) {
                lens.lensMount.forEach(pushNormalizedEntry);
                delete lens.lensMount;
            }

            if (!normalizedOptions.length) {
                const mountType = typeof lens.mount === 'string' ? lens.mount.trim() : '';
                if (mountType) {
                    pushNormalizedEntry({ type: mountType, mount: 'native' });
                }
            }

            const dedupedOptions = [];
            normalizedOptions.forEach(opt => {
                if (!opt || !opt.type) return;
                const mountState = opt.mount === 'adapted' ? 'adapted' : 'native';
                const alreadyPresent = dedupedOptions.some(existing => (
                    existing.type === opt.type && existing.mount === mountState
                ));
                if (!alreadyPresent) {
                    dedupedOptions.push({ type: opt.type, mount: mountState });
                }
            });

            const safeMountOptions = Array.isArray(dedupedOptions) ? dedupedOptions : [];
            lens.mountOptions = safeMountOptions;

            const mountOptions = Array.isArray(lens.mountOptions) ? lens.mountOptions : [];

            if (mountOptions.length) {
                const primary = mountOptions.find(opt => opt && opt.mount === 'native' && opt.type)
                    || mountOptions[0];
                const primaryType = primary && primary.type ? primary.type : '';
                if (primaryType) {
                    lens.mount = primaryType;
                } else if (typeof lens.mount === 'string') {
                    lens.mount = lens.mount.trim();
                }
            } else if (typeof lens.mount === 'string') {
                lens.mount = lens.mount.trim();
                if (!lens.mount) {
                    delete lens.mount;
                }
            }
        });

        ['monitors', 'video', 'viewfinders'].forEach(key => {
            applyFixPowerInput(devicesData[key]);
        });

        const fizGroups = devicesData.fiz || {};
        ['motors', 'controllers', 'distance'].forEach(key => {
            applyFixPowerInput(fizGroups[key]);
        });

        // Normalize FIZ motors
        Object.values(devicesData.fiz?.motors || {}).forEach(m => {
            if (!m) return;
            if (m.connector && !m.fizConnector) {
                m.fizConnector = m.connector;
                delete m.connector;
            }
            if (m.fizConnector) {
                m.fizConnector = normalizeFizConnectorType(m.fizConnector);
            }
        });

        // Normalize FIZ controllers
        Object.values(devicesData.fiz?.controllers || {}).forEach(c => {
            if (!c) return;
            if (c.FIZ_connector && !c.fizConnector && !c.fizConnectors) {
                c.fizConnector = c.FIZ_connector;
                delete c.FIZ_connector;
            }
            if (Array.isArray(c.fizConnectors)) {
                c.fizConnectors = c.fizConnectors.map(fc => {
                    if (!fc) return { type: '' };
                    const type = normalizeFizConnectorType(fc.type || fc);
                    const notes = fc.notes || undefined;
                    return notes ? { type, notes } : { type };
                });
            } else if (c.fizConnector) {
                const parts = String(c.fizConnector)
                    .split(',')
                    .map(s => s.trim())
                    .filter(Boolean);
                c.fizConnectors = parts.map(p => ({ type: normalizeFizConnectorType(p) }));
                delete c.fizConnector;
            } else {
                c.fizConnectors = [];
            }
        });

        markDevicesNormalized(devicesData);
        return devicesData;
    }

    function normalizeDevicesForPersistence(devicesData) {
        return unifyDevices(devicesData, { force: true });
    }

    // Expose to global scope
    globalScope.cineDeviceNormalization = {
        unifyDevices,
        normalizeDevicesForPersistence,
        // Expose helpers if needed for testing or advanced usage
        normalizeVideoType,
        normalizeFizConnectorType,
        normalizeViewfinderType,
        normalizePowerPortType
    };

    // Expose individual functions for backward compatibility if needed
    globalScope.unifyDevices = unifyDevices;
    globalScope.normalizeDevicesForPersistence = normalizeDevicesForPersistence;

    if (typeof module !== 'undefined' && module && module.exports) {
        module.exports = globalScope.cineDeviceNormalization;
    }

})();
