// normalizeData.js - consolidate data cleanup and expansion utilities

const fs = require('fs');
const path = require('path');
let devices = require('../src/data');

const NORMALIZED_FLAG_KEY = '__normalized';

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
  { needles: ['hd', 'sdi'], value: '3G-SDI' },
  { needles: ['mini', 'bnc'], value: 'Mini BNC' },
  { needles: ['micro', 'hdmi'], value: 'Micro HDMI' },
  { needles: ['mini', 'hdmi'], value: 'Mini HDMI' },
  { needles: ['hdmi'], value: 'HDMI' },
  { needles: ['displayport'], value: 'DisplayPort' },
  { needles: ['display', 'port'], value: 'DisplayPort' },
  { needles: ['dp'], value: 'DisplayPort' }
];

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

const normalizeVideoType = memoizeNormalization((_, key) => {
  const match = VIDEO_TYPE_PATTERNS.find(({ needles }) =>
    needles.every(n => key.includes(n))
  );
  return match ? match.value : '';
});

function createMapNormalizer(map) {
  return memoizeNormalization((str, key) => map[key] || str);
}

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

const normalizeFizConnectorType = createMapNormalizer(FIZ_CONNECTOR_MAP);

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

const normalizeViewfinderType = createMapNormalizer(VIEWFINDER_TYPE_MAP);

const POWER_PORT_TYPE_MAP = {
  'lemo 8-pin (dc in / bat)': 'Bat LEMO 8-pin',
  'lemo 8-pin (bat)': 'Bat LEMO 8-pin',
  'bat (lemo 8-pin)': 'Bat LEMO 8-pin',
  'lemo 8-pin': 'Bat LEMO 8-pin',
  '2-pin dc-input': '2-pin DC-IN',
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
  'dc input': 'DC IN',
  'weipu sf610/s2 (12vdc) input': 'Weipu SF610/S2',
  '6-pin 1b dc-in / tb50 battery mount': '6-pin 1B DC-IN / TB50'
};

const mapPowerPortOne = createMapNormalizer(POWER_PORT_TYPE_MAP);

function normalizePowerPortType(type) {
  if (!type) return [];
  const toArray = val =>
    mapPowerPortOne(val)
      .split('/')
      .map(p => mapPowerPortOne(p))
      .filter(Boolean);
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

function forEachCamera(cb) {
  const cameras = devices.cameras;
  for (const key in cameras) {
    if (Object.prototype.hasOwnProperty.call(cameras, key)) {
      cb(cameras[key]);
    }
  }
}

function markBundleNormalized(bundle) {
  if (!bundle || typeof bundle !== 'object') return;
  try {
    Object.defineProperty(bundle, NORMALIZED_FLAG_KEY, {
      configurable: true,
      enumerable: true,
      value: true,
      writable: true
    });
  } catch (defineError) {
    void defineError;
    bundle[NORMALIZED_FLAG_KEY] = true;
  }
}

function normalizeRuntimeDevices(bundle) {
  if (!bundle || typeof bundle !== 'object') return bundle;

  Object.values(bundle.cameras || {}).forEach(cam => {
    if (!cam || typeof cam !== 'object') return;
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
          type: it?.type || '',
          mount: (it?.mount ? it.mount : (it?.native ? 'native' : (it?.adapted ? 'adapted' : 'native'))).toLowerCase(),
          notes: it?.notes || ''
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

  Object.values(bundle.lenses || {}).forEach(lens => {
    if (!lens || typeof lens !== 'object') return;
    const normalizeMountEntry = entry => {
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

    const pushNormalizedEntry = entry => {
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
    applyFixPowerInput(bundle[key]);
  });

  const fizGroups = bundle.fiz || {};
  ['motors', 'controllers', 'distance'].forEach(key => {
    applyFixPowerInput(fizGroups[key]);
  });

  Object.values(bundle.fiz?.motors || {}).forEach(m => {
    if (!m) return;
    if (m.connector && !m.fizConnector) {
      m.fizConnector = m.connector;
      delete m.connector;
    }
    if (m.fizConnector) {
      m.fizConnector = normalizeFizConnectorType(m.fizConnector);
    }
  });

  Object.values(bundle.fiz?.controllers || {}).forEach(c => {
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

  return bundle;
}

// -- Unify helper functions --
function unifyFizConnectorTypes() {
  const map = {
    'LEMO 4-pin (LBUS)': 'LBUS (LEMO 4-pin)',
    'Lemo 4-pin (LBUS)': 'LBUS (LEMO 4-pin)',
    'LBUS (4-pin Lemo)': 'LBUS (LEMO 4-pin)',
    'LBUS (4-pin Lemo for motors), CAM (7-pin Lemo for camera control)':
      'LBUS (LEMO 4-pin for motors), CAM (LEMO 7-pin for camera control)',
    '2x LBUS (4-pin Lemo for motors), 2x SERIAL (4-pin Lemo), CAM (7-pin Lemo), EXT (6-pin/16-pin depending on camera)':
      '2x LBUS (LEMO 4-pin for motors), 2x SERIAL (LEMO 4-pin), CAM (LEMO 7-pin), EXT (6-pin/16-pin depending on camera)',
    '2x LBUS (4-pin Lemo), 1x CAM (7-pin Lemo), 1x SERIAL (4-pin Lemo)':
      '2x LBUS (LEMO 4-pin), 1x CAM (LEMO 7-pin), 1x SERIAL (LEMO 4-pin)',
    '2x LBUS (4-pin Lemo)': '2x LBUS (LEMO 4-pin)',
    '3x Motor ports (4-pin Lemo), 1x Camera (7-pin Lemo), 1x EXT (4-pin Lemo)':
      '3x Motor ports (LEMO 4-pin), 1x Camera (LEMO 7-pin), 1x EXT (LEMO 4-pin)',
    'Multiple LBUS ports (4-pin Lemo)': 'Multiple LBUS ports (LEMO 4-pin)',
    '6x Motor ports (proprietary Lemo), 1x Camera (7-pin Lemo), 1x Accessory (4-pin Lemo), 1x Ethernet, 1x USB':
      '6x Motor ports (proprietary Lemo), 1x Camera (LEMO 7-pin), 1x Accessory (LEMO 4-pin), 1x Ethernet, 1x USB',
    'USB-C, LEMO 2-pin (power out), 4-pin Lemo (data to MDR)':
      'USB-C, LEMO 2-pin (power out), LEMO 4-pin (data to MDR)',
    'Lemo 4-pin (LBUS), 7-pin Lemo (CAM)': 'LBUS (LEMO 4-pin), CAM (LEMO 7-pin)',
    'EXT (LEMO 7-pin)': 'EXT LEMO 7-pin',
    'Hirose 12pin': 'Hirose 12-pin',
    '12-pin Hirose': 'Hirose 12-pin',
    '12pin broadcast connector': 'Hirose 12-pin',
    'Lens 12 pin': 'Hirose 12-pin',
    'Lens terminal 12-pin': 'Hirose 12-pin',
    'Lens terminal 12-pin jack': 'Hirose 12-pin',
    'Lens Terminal': 'Hirose 12-pin',
    'USB Type-C': 'USB-C',
    'USB Type-C®': 'USB-C',
    'USB-C (USB 3.2 / 3.1 Gen 1)': 'USB-C',
    'USB-C / Gigabit Ethernet (via adapter)': 'USB-C',
    'Active EF Mount': 'Active EF mount',
    'LANC (2.5mm stereo mini jack)': 'LANC',
    '2.5 mm Sub-Mini (LANC)': 'LANC',
    'REMOTE A (2.5mm)': 'REMOTE A connector',
    'Remote Control Terminal': 'REMOTE A connector',
    'Remote 8 pin': 'REMOTE B connector',
    'Lemo 4-pin': 'LEMO 4-pin',
    '4-pin Lemo': 'LEMO 4-pin',
    '4-pin 0B Lemo': 'LEMO 4-pin 0B',
    'Lemo 5-pin 0B': 'LEMO 5-pin 0B',
    '7-pin Lemo': 'LEMO 7-pin',
    '7-pin Lemo (LCS)': 'LEMO 7-pin (LCS)',
    'Lemo 7-pin 1B': 'LEMO 7-pin 1B',
    '2x Motor Ports (proprietary 7-pin Lemo), Serial (for Light Ranger 2), Analog (for Micro Force), USB (firmware)':
      '2x Motor Ports (proprietary LEMO 7-pin), Serial (for Light Ranger 2), Analog (for Micro Force), USB (firmware)'
  };
  forEachCamera(cam => {
    const list = cam.fizConnectors;
    if (Array.isArray(list)) {
      list.forEach(conn => {
        if (conn && conn.type && map[conn.type]) {
          conn.type = map[conn.type];
        }
      });
    }
  });

  const motors = devices.fiz?.motors || {};
  for (const key in motors) {
    const motor = motors[key];
    if (motor.fizConnector && map[motor.fizConnector]) {
      motor.fizConnector = map[motor.fizConnector];
    }
  }

  const controllers = devices.fiz?.controllers || {};
  for (const key in controllers) {
    const controller = controllers[key];
    if (controller.fizConnector && map[controller.fizConnector]) {
      controller.fizConnector = map[controller.fizConnector];
    }
  }
}

function unifyPowerDistTypes() {
  const map = {
    '2-pin LEMO': 'LEMO 2-pin',
    'Lemo 2-pin': 'LEMO 2-pin',
    'Lemo 2pin': 'LEMO 2-pin',
    '3-pin Fischer': 'Fischer 3-pin',
    'RS 3pin': 'Fischer 3-pin',
    'EXT (LEMO 7-pin)': 'EXT LEMO 7-pin',
    'Hirose 4pin': 'Hirose 4-pin',
    'Hirose 12pin': 'Hirose 12-pin',
    'Lens terminal 12-pin jack': 'Lens terminal 12-pin',
    'D-Tap / P-Tap': 'D-Tap',
    'P-Tap': 'D-Tap',
    'USB': 'USB-A',
    'USB Type-C 3.1 Gen 2': 'USB-C',
    'USB Type-C 3.1 Gen2': 'USB-C',
    'USB Type-C': 'USB-C',
    'USB Type-C®': 'USB-C',
    'USB-C 3.1 Gen 1': 'USB-C',
    'USB-C Data Terminal': 'USB-C',
    'USB-C Terminal (Grip)': 'USB-C',
    'USB-C Terminal (LCD Monitor)': 'USB-C'
  };
  forEachCamera(cam => {
    const list = cam.power?.powerDistributionOutputs;
    if (Array.isArray(list)) {
      list.forEach(output => {
        if (output && output.type && map[output.type]) {
          output.type = map[output.type];
        }
      });
    }
  });
}

function unifyPowerInputPortTypes() {
  const map = {
    'LEMO 8-pin (DC In / BAT)': 'Bat LEMO 8-pin',
    'LEMO 8-pin (BAT)': 'Bat LEMO 8-pin',
    'BAT (LEMO 8-pin)': 'Bat LEMO 8-pin',
    'LEMO 8-pin': 'Bat LEMO 8-pin',
    '2-pin DC-Input': '2-pin DC-IN',
    '2-pin XLR': 'XLR 2-pin',
    '2-pin locking connector': 'LEMO 2-pin',
    '2-pin locking connector / 2-pin LEMO': 'LEMO 2-pin',
    '4-pin XLR / DC IN 12V': 'XLR 4-pin',
    '4-pin XLR / V-Lock': 'XLR 4-pin',
    'XLR 4-pin jack': 'XLR 4-pin',
    'XLR 4-pin (main input)': 'XLR 4-pin',
    'XLR-type 4 pin (male) / Square-shaped 5 pin connector (Battery)': 'XLR 4-pin / Square 5-pin',
    '12-pin Molex connector (at battery plate rear) / 4-pin XLR (external power)': 'Molex 12-pin / XLR 4-pin',
    'USB-C (Power Delivery) / Battery Slot': 'Battery Slot / USB-C PD',
    'Battery Slot / USB Type-C®': 'Battery Slot / USB-C',
    'Battery Slot / USB-C': 'Battery Slot / USB-C',
    'Battery Slot / USB-C PD': 'Battery Slot / USB-C PD',
    'DC Input': 'DC IN',
    'Weipu SF610/S2 (12VDC) Input': 'Weipu SF610/S2',
    '6-pin 1B DC-IN / TB50 Battery Mount': '6-pin 1B DC-IN / TB50'
  };
  forEachCamera(cam => {
    const input = cam.power?.input;
    if (!input || !input.portType) return;
    const original = input.portType;
    const arr = ([]).concat(original).flatMap(val => {
      const mapped = map[val] || val;
      return mapped.split('/').map(p => map[p.trim()] || p.trim());
    });
    input.portType = arr.length > 1 ? arr : arr[0];
  });
}

function unifyRecordingMedia() {
  const map = {
    'CFast': { type: 'CFast 2.0', notes: '' },
    'CFast card slot': { type: 'CFast 2.0', notes: '' },
    'CFast 2.0 card slot': { type: 'CFast 2.0', notes: '' },
    'CFast 2.0 card slots': { type: 'CFast 2.0', notes: 'Dual Slots' },
    'CFast 2.0 memory cards': { type: 'CFast 2.0', notes: '' },
    'Dual CFexpress slots': { type: 'CFexpress Type B', notes: 'Dual Slots' },
    'SD CARD X2': { type: 'SD Card', notes: 'Dual Slots' },
    'Dual SD card slots for simultaneous recording': { type: 'SD Card', notes: 'Dual Slots' },
    'Dual slot recording function available [P2.1]': { type: 'SD Card', notes: 'UHS-II (Dual Slots)' },
    'SD card slot': { type: 'SD Card', notes: '' },
    'SD card slot (for proxy/backup)': { type: 'SD Card', notes: 'for proxy/backup' },
    'SD Card (SD / SDHC / SDXC)': { type: 'SD Card', notes: '' },
    'SD memory card / SDHC memory card / SDXC memory card (UHS-II V90 recommended)': { type: 'SD Card', notes: 'UHS-II V90 recommended' },
    'UHS-II SD': { type: 'SD Card', notes: 'UHS-II' },
    'SD UHS-II card slot': { type: 'SD Card', notes: 'UHS-II' },
    'SD UHS-II card slots': { type: 'SD Card', notes: 'UHS-II (Dual Slots)' },
    'CFexpress Type B (Dual Slots)': { type: 'CFexpress Type B', notes: 'Dual Slots' },
    'CFexpress Type B (via adapter)': { type: 'CFexpress Type B', notes: 'via adapter' }
  };
  function normalize(item) {
    if (!item) return null;
    if (typeof item === 'object' && item.type) {
      return { type: item.type, notes: item.notes || '' };
    }
    if (map[item]) return map[item];
    const m = String(item).match(/^(.*?)(?:\((.*)\))?$/);
    let type = m ? m[1].trim() : String(item);
    let notes = m && m[2] ? m[2].trim() : '';
    if (/^SD UHS-II$/i.test(type)) {
      type = 'SD Card';
      notes = notes ? `${notes}; UHS-II` : 'UHS-II';
    } else if (/^SD \(UHS-II\/UHS-I\)$/i.test(type)) {
      type = 'SD Card';
      notes = 'UHS-II/UHS-I';
    }
    return { type, notes };
  }
  forEachCamera(cam => {
    const list = cam.recordingMedia;
    if (Array.isArray(list)) {
      const result = [];
      const seen = new Set();
      for (const val of list) {
        const item = normalize(val);
        if (!item) continue;
        const key = `${item.type}|${item.notes}`;
        if (!seen.has(key)) {
          seen.add(key);
          result.push(item);
        }
      }
      cam.recordingMedia = result;
    }
  });
}

function unifyTimecodeTypes() {
  const map = {
    '3.5 mm TRS / mini jack': '3.5mm Stereo Input',
    'BNC (Timecode)': 'BNC',
    'BNC / HDMI': 'BNC',
    'BNC terminal': 'BNC',
    'Time code': 'BNC',
    'Timecode In/Out': 'BNC',
    'EXT (LEMO 7-pin)': 'EXT LEMO 7-pin',
    'Multi-function shoe': 'Multi-interface shoe',
    'DIN1.0 / 2.3': 'DIN 1.0/2.3',
    'Timecode interface': 'Timecode Interface'
  };
  forEachCamera(cam => {
    const list = cam.timecode;
    if (Array.isArray(list)) {
      list.forEach(tc => {
        if (tc && tc.type && map[tc.type]) {
          tc.type = map[tc.type];
        }
      });
    }
  });
}

function unifyViewfinderTypes() {
  const map = {
    'DSMC3 RED Touch 7" LCD (Optional)': 'RED Touch 7" LCD (Optional)',
    'RED Touch 7.0" LCD (Optional)': 'RED Touch 7" LCD (Optional)',
    'LCD Touch Panel': 'LCD touchscreen',
    'LCD Touchscreen': 'LCD touchscreen',
    'Native LCD Capacitive Touchscreen': 'LCD touchscreen',
    'Integrated Touchscreen LCD': 'LCD touchscreen',
    'Free-angle LCD': 'Vari-angle LCD',
    'LCD Monitor (Native)': 'Integrated LCD monitor',
    'Native LCD Viewfinder': 'Integrated LCD monitor',
    'LCD Monitor LM-V2 (Supplied)': 'LCD Monitor LM-V2',
    'Integrated Main Monitor': 'Integrated LCD monitor',
    'Optional EVF-V70 viewfinder': 'EVF-V70 (Optional)',
    'Optional EVF-V50': 'EVF-V50 (Optional)',
    'Optional OLED viewfinder': 'OLED EVF (Optional)',
    'Blackmagic Pocket Cinema Camera Pro EVF (Optional)': 'Blackmagic Pro EVF (Optional)',
    'External backlit LCD status display': 'LCD status display',
    'Built-in Fold-out LCD': 'Fold-out LCD',
    'OLED LVF (Live View Finder)': 'OLED EVF',
    'LCD capacitive touchscreen': 'LCD touchscreen',
    'LEMO 26 pin': 'LEMO 26-pin port'
  };
  forEachCamera(cam => {
    const list = cam.viewfinder;
    if (Array.isArray(list)) {
      list.forEach(vf => {
        if (vf && vf.type && map[vf.type]) {
          vf.type = map[vf.type];
        }
      });
    }
  });
}

function unifyLensMounts() {
  forEachCamera(cam => {
    const list = cam.lensMount;
    if (Array.isArray(list)) {
      const result = [];
      const seen = new Set();
      for (const val of list) {
        if (!val) continue;
        let type = '';
        let mount = 'native';
        let notes = '';
        if (typeof val === 'string') {
          const m = val.match(/([^()]+)(?:\(([^)]+)\))?(?:\s*-\s*(.*))?/);
          type = m ? m[1].trim() : val;
          mount = m && m[2] ? m[2].trim().toLowerCase() : /adapted|via adapter/i.test(val) ? 'adapted' : 'native';
          notes = m && m[3] ? m[3].trim() : (/via adapter/i.test(val) ? 'via adapter' : '');
        } else {
          type = val.type || '';
          mount = val.mount ? val.mount.toLowerCase() : 'native';
          notes = val.notes || '';
        }
        const key = `${type}|${mount}|${notes}`;
        if (!seen.has(key)) {
          seen.add(key);
          result.push({ type, mount, notes });
        }
      }
      cam.lensMount = result;
    }
  });
}

// -- Update helper functions --
function updatePowerDistribution() {
  forEachCamera(cam => {
    const outputs = cam.power?.powerDistributionOutputs;
    if (Array.isArray(outputs)) {
      const expanded = [];
      for (const entry of outputs) {
        const { count, ...rest } = entry;
        let num = 1;
        if (count !== undefined) {
          const n = parseInt(count, 10);
          if (!Number.isNaN(n)) {
            num = n;
          } else if (typeof count === 'string') {
            const lower = count.toLowerCase();
            if (lower.includes('multiple') || lower.includes('-')) {
              num = 2;
            }
          }
        }
        if (num < 1) num = 1;
        for (let i = 0; i < num; i++) {
          expanded.push({ ...rest });
        }
      }
      cam.power.powerDistributionOutputs = expanded;
    }
  });
}

function updateVideoOutputs() {
  forEachCamera(cam => {
    if (Array.isArray(cam.videoOutputs)) {
      const outputs = [];
      for (const entry of cam.videoOutputs) {
        const { count, ...rest } = entry;
        const n = parseInt(count, 10);
        if (!isNaN(n) && n > 1) {
          for (let i = 0; i < n; i++) {
            outputs.push({ ...rest });
          }
        } else {
          outputs.push(rest);
        }
      }
      cam.videoOutputs = outputs;
    }
  });
}

function normalizeBatteryCurrentValues() {
  const batteryGroups = [
    devices.batteries || {},
    (devices.accessories && devices.accessories.batteries) || {}
  ];

  batteryGroups.forEach(group => {
    Object.values(group).forEach(info => {
      if (!info || typeof info !== 'object') return;
      if (info.dtapA == null || typeof info.dtapA !== 'number' || Number.isNaN(info.dtapA)) {
        delete info.dtapA;
      }
      if (info.pinV != null && typeof info.pinV !== 'number') {
        const parsed = Number(info.pinV);
        if (Number.isFinite(parsed)) {
          info.pinV = parsed;
        } else {
          delete info.pinV;
        }
      }
      if (info.pinA != null && typeof info.pinA !== 'number') {
        const parsedPinA = Number(info.pinA);
        if (Number.isFinite(parsedPinA)) {
          info.pinA = parsedPinA;
        }
      }
    });
  });
}

const DEVICE_OUTPUT_DIR = path.join(__dirname, '../src/data/devices');

function buildGlobalAssignment(registerPath, varName) {
  const parts = registerPath.split('.');
  const lines = ['  globalThis.devices = globalThis.devices || {};'];
  let scope = 'globalThis.devices';
  for (let i = 0; i < parts.length - 1; i += 1) {
    scope += `.${parts[i]}`;
    lines.push(`  ${scope} = ${scope} || {};`);
  }
  lines.push(`  ${scope}.${parts[parts.length - 1]} = ${varName};`);
  return lines.join('\n');
}

function createDeviceModule({ varName, data, registerPath, suppressedVar }) {
  const dataString = JSON.stringify(data, null, 2);
  const suppressedSection = suppressedVar
    ? `\nconst ${suppressedVar} = [];\n\n${suppressedVar}.forEach(name => {\n  if (Object.prototype.hasOwnProperty.call(${varName}, name)) {\n    delete ${varName}[name];\n  }\n});\n`
    : '\n';
  const globalAssignment = buildGlobalAssignment(registerPath, varName);
  return [
    '/* global registerDevice */',
    '(() => {',
    `const ${varName} = ${dataString};`,
    suppressedSection.trimEnd(),
    "if (typeof registerDevice === 'function') {",
    "  if (typeof module !== 'undefined' && module.exports) {",
    `    module.exports = registerDevice('${registerPath}', ${varName});`,
    '  } else {',
    `    registerDevice('${registerPath}', ${varName});`,
    '  }',
    "} else if (typeof module !== 'undefined' && module.exports) {",
    `  module.exports = ${varName};`,
    '} else {',
    `${globalAssignment}`,
    '}',
    '})();',
    ''
  ].join('\n');
}

function createGearListModule(bundle) {
  const accessories = { ...(bundle.accessories || {}) };
  delete accessories.chargers;
  delete accessories.cages;
  const gear = {
    viewfinders: bundle.viewfinders || {},
    directorMonitors: bundle.directorMonitors || {},
    iosVideo: bundle.iosVideo || {},
    videoAssist: bundle.videoAssist || {},
    media: bundle.media || {},
    accessories,
    filterOptions: bundle.filterOptions || [],
    lenses: bundle.lenses || {}
  };
  const gearString = JSON.stringify(gear, null, 2);
  return [
    '/* global registerDevice */',
    '(() => {',
    `const gear = ${gearString};`,
    '',
    '// Expose lenses at the top level for easier access',
    'gear.lenses = gear.lenses || {};',
    '',
    '// Remove lenses from accessories to avoid duplicate entries',
    'if (gear.accessories && gear.accessories.lenses) {',
    '  delete gear.accessories.lenses;',
    '}',
    '',
    'const categories = {',
    '  viewfinders: gear.viewfinders,',
    '  directorMonitors: gear.directorMonitors,',
    '  iosVideo: gear.iosVideo,',
    '  videoAssist: gear.videoAssist,',
    '  media: gear.media,',
    '  lenses: gear.lenses,',
    '  accessories: gear.accessories,',
    '  filterOptions: gear.filterOptions',
    '};',
    '',
    "if (typeof registerDevice === 'function') {",
    '  Object.entries(categories).forEach(([name, data]) => registerDevice(name, data));',
    "  if (typeof module !== 'undefined' && module.exports) {",
    '    module.exports = gear;',
    '  }',
    "} else if (typeof module !== 'undefined' && module.exports) {",
    '  module.exports = gear;',
    '} else {',
    '  globalThis.devices = globalThis.devices || {};',
    '  Object.entries(categories).forEach(([name, data]) => {',
    "    if (name === 'accessories') {",
    '      globalThis.devices.accessories = Object.assign(globalThis.devices.accessories || {}, data);',
    '    } else {',
    '      globalThis.devices[name] = data;',
    '    }',
    '  });',
    '}',
    '})();',
    ''
  ].join('\n');
}

function writeDeviceBundles(bundle) {
  const outputs = [
    {
      fileName: 'cameras.js',
      content: createDeviceModule({
        varName: 'cameraData',
        data: bundle.cameras || {},
        registerPath: 'cameras',
        suppressedVar: 'suppressedCameras'
      })
    },
    {
      fileName: 'monitors.js',
      content: createDeviceModule({
        varName: 'monitorData',
        data: bundle.monitors || {},
        registerPath: 'monitors'
      })
    },
    {
      fileName: 'video.js',
      content: createDeviceModule({
        varName: 'videoData',
        data: bundle.video || {},
        registerPath: 'video'
      })
    },
    {
      fileName: 'fiz.js',
      content: createDeviceModule({
        varName: 'fizData',
        data: bundle.fiz || {},
        registerPath: 'fiz'
      })
    },
    {
      fileName: 'batteries.js',
      content: createDeviceModule({
        varName: 'batteryData',
        data: bundle.batteries || {},
        registerPath: 'batteries'
      })
    },
    {
      fileName: 'batteryHotswaps.js',
      content: createDeviceModule({
        varName: 'hotswapData',
        data: bundle.batteryHotswaps || {},
        registerPath: 'batteryHotswaps'
      })
    },
    {
      fileName: 'chargers.js',
      content: createDeviceModule({
        varName: 'chargerData',
        data: (bundle.accessories && bundle.accessories.chargers) || {},
        registerPath: 'accessories.chargers'
      })
    },
    {
      fileName: 'cages.js',
      content: createDeviceModule({
        varName: 'cageData',
        data: (bundle.accessories && bundle.accessories.cages) || {},
        registerPath: 'accessories.cages'
      })
    },
    {
      fileName: 'wirelessReceivers.js',
      content: createDeviceModule({
        varName: 'wirelessReceiversData',
        data: bundle.wirelessReceivers || {},
        registerPath: 'wirelessReceivers'
      })
    },
    {
      fileName: 'gearList.js',
      content: createGearListModule(bundle)
    }
  ];

  outputs.forEach(({ fileName, content }) => {
    const filePath = path.join(DEVICE_OUTPUT_DIR, fileName);
    fs.writeFileSync(filePath, content);
  });
}

function save() {
  const stubLines = [
    "const devices = require('./devices');",
    "const rentalHouses = require('./rental-houses');",
    '',
    "if (devices && !Object.prototype.hasOwnProperty.call(devices, 'rentalHouses')) {",
    "  Object.defineProperty(devices, 'rentalHouses', {",
    '    configurable: false,',
    '    enumerable: false,',
    '    value: rentalHouses,',
    '    writable: false',
    '  });',
    '}',
    '',
    'module.exports = devices;',
    ''
  ];
  const filePath = path.join(__dirname, '../src/data/index.js');
  fs.writeFileSync(filePath, stubLines.join('\n'));
}

function normalizeAll() {
  normalizeRuntimeDevices(devices);
  unifyFizConnectorTypes();
  unifyPowerDistTypes();
  unifyPowerInputPortTypes();
  unifyRecordingMedia();
  unifyTimecodeTypes();
  unifyViewfinderTypes();
  unifyLensMounts();
  updatePowerDistribution();
  updateVideoOutputs();
  normalizeBatteryCurrentValues();
  markBundleNormalized(devices);
  return devices;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log(
      [
        'Usage: node normalizeData.js [options]',
        '',
        'Cleans and expands device data, then refreshes device modules and src/data/index.js.',
        '',
        'What it does:',
        '  - Harmonizes connector names across cameras, motors and controllers (LBUS, LEMO, Hirose, etc.).',
        '  - Normalizes recording media, timecode generators, viewfinders and lens mounts.',
        '  - Rebuilds derived fields such as power distribution outputs and video port lists.',
        '',
        'Recommended workflow:',
        '  1. Run `npm run check-consistency` after editing src/data/devices/ files to catch missing metadata.',
        '  2. Run this script (`npm run normalize`) to regenerate derived values.',
        '  3. Follow up with `npm run unify-ports` so connector metadata stays aligned.',
        '  4. Finish with `npm run generate-schema` to refresh schema.json.',
        '',
        'The script modifies src/data/index.js in place. Review the diff and commit it together with schema updates.',
        '',
        'Examples:',
        '  npm run normalize',
        '  npm run normalize -- --help',
        '  node normalizeData.js --help',
        '',
        'Options:',
        '  -h, --help     Show this help message and exit.'
      ].join('\n')
    );
    process.exit(0);
  }
  const normalizedDevices = normalizeAll();
  writeDeviceBundles(normalizedDevices);
  save();
} else {
  module.exports = { normalizeAll, save };
}
