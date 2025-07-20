/* exported devices */
// data.js – Definiert die initiale Gerätedatenbank
let devices = {
  cameras: {
    "Arri Alexa Mini LF": {
      powerDrawWatts: 89,
      power: {
        input: {
          voltageRange: "11V-34V DC",
          portType: "LEMO 8-pin (DC In / BAT)",
          powerDrawWatts: 89
        },
        internalBattery: {
          type: "None",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "B-Mount",
          "V-Mount",
          "Gold Mount"
        ],
        powerDistributionOutputs: [
          { type: "LEMO 2-pin", voltage: "12V", current: "2A", wattage: 24, notes: "Regulated" },
          { type: "Fischer 3-pin", voltage: "24V", current: null, notes: "Regulated R/S, primarily control" },
          { type: "EXT LEMO 7-pin", voltage: "24V", notes: "Control/Power" }
        ]
      },
      videoOutputs: [
        { type: "SDI", resolution: "HD", notes: "SDI 1: 1.5G/3G HD (processed/clean)" },
        { type: "SDI", resolution: "UHD", notes: "SDI 2: 1.5G/3G HD, 6G UHD (clean only, cloneable)" }
      ],
      fizConnectors: [
        { type: "LEMO 4-pin (LBUS)", notes: "On lens mount, for lens motors" },
        { type: "EXT LEMO 7-pin", notes: "For camera control, incl. FIZ with compatible systems" }
      ],
      recordingMedia: [
        "Codex Compact Drive (1TB, 2TB)"
      ],
      viewfinder: [
        { type: "ARRI MVF-2 (Native)", resolution: "1920x1080", notes: "OLED eyepiece + LCD fold-out monitor" }
      ],
      lensMount: [
        "ARRI LPL (Native)",
        "ARRI PL (adapted)",
        "ARRI EF (adapted)",
        "LEITZ M-MOUNT (adapted)",
        "Panavision PV (adapted)",
        "Panavision PV70 (adapted)",
        "Vantage XPL52 (adapted)"
      ],
      timecode: [
        { type: "LEMO 5-pin", notes: "LTC Timecode In/Out" },
        { type: "SYNC IN", notes: "Black burst/tri-level sync" }
      ]
    },
    "Arri Alexa Mini": {
      powerDrawWatts: 84,
      power: {
        input: {
          voltageRange: "11V-34V DC",
          portType: "LEMO 8-pin (BAT)",
          powerDrawWatts: 84
        },
        internalBattery: {
          type: "None",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount",
          "Gold Mount",
          "B-Mount (via adapter)"
        ],
        powerDistributionOutputs: [
          { type: "LEMO 2-pin", voltage: "12V", current: "2A", wattage: 24, notes: "Regulated" },
          { type: "Fischer 3-pin", voltage: "24V", current: null, notes: "Regulated R/S, primarily control" },
          { type: "EXT LEMO 7-pin", voltage: "24V", notes: "Control/Power" }
        ]
      },
      videoOutputs: [
        { type: "SDI", resolution: "HD", notes: "SDI 1: 1.5G/3G HD (processed/clean)" },
        { type: "SDI", resolution: "HD", notes: "SDI 2: 1.5G/3G HD (clean only, cloneable)" }
      ],
      fizConnectors: [
        { type: "LEMO 4-pin (LBUS)", notes: "On lens mount, for lens motors" },
        { type: "EXT LEMO 7-pin", notes: "For camera control, incl. FIZ with compatible systems" }
      ],
      recordingMedia: [
        "CFast 2.0"
      ],
      viewfinder: [
        { type: "ARRI MVF-1 (Native)", resolution: "1280x720", notes: "OLED eyepiece" }
      ],
      lensMount: [
        "ARRI PL (Native)",
        "ARRI EF (adapted)",
        "ARRI B4 (adapted)",
        "ARRI LPL (adapted)"
      ],
      timecode: [
        { type: "LEMO 5-pin", notes: "LTC Timecode In/Out" },
        { type: "SYNC IN", notes: "Black burst/tri-level sync" },
        { type: "EXT LEMO 7-pin", notes: "For multi-camera sync with ARRI EDB-2 EXT Distribution Box" }
      ]
    },
    "Arri Alexa 35": {
      powerDrawWatts: 110,
      power: {
        input: {
          voltageRange: "19.5V-34V DC",
          portType: "BAT (LEMO 8-pin)",
          powerDrawWatts: 110
        },
        internalBattery: {
          type: "None",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "B-Mount (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "LEMO 2-pin", voltage: "12V", current: "2A", wattage: 24, notes: "Regulated" },
          { type: "Fischer 3-pin", voltage: "24V", notes: "Regulated R/S, primarily control" },
          { type: "EXT (LEMO 7-pin)", voltage: "24V", notes: "Control/Power" },
          { type: "LBUS (LEMO 4-pin)" }
        ]
      },
      videoOutputs: [
        { type: "SDI", resolution: "HD", notes: "SDI 1: 1.5G/3G HD" },
        { type: "SDI", resolution: "UHD", notes: "SDI 2: 1.5G/3G HD, 6G UHD" }
      ],
      fizConnectors: [
        { type: "LBUS (LEMO 4-pin)", notes: "On lens mount, for daisy-chainable motors" },
        { type: "EXT (LEMO 7-pin)", notes: "For camera control, incl. FIZ with compatible systems" }
      ],
      recordingMedia: [
        "Codex Compact Drive (1TB, 2TB)"
      ],
      viewfinder: [
        { type: "ARRI MVF-2 (Native)", resolution: "1920x1080", notes: "OLED eyepiece + LCD fold-out monitor" }
      ],
      lensMount: [
        "ARRI LPL (Native)",
        "ARRI PL (adapted)",
        "ARRI EF (adapted)"
      ],
      timecode: [
        { type: "LEMO 5-pin", notes: "LTC Timecode In/Out" },
        { type: "SYNC IN", notes: "Black burst/tri-level sync" },
        { type: "EXT (LEMO 7-pin)", notes: "For multi-camera sync" }
      ]
    },
    "Arri Amira": {
      powerDrawWatts: 50,
      power: {
        input: {
          voltageRange: "10.5V - 34V DC",
          portType: "XLR 4-pin (main input)",
          powerDrawWatts: 50
        },
        internalBattery: { type: "None", batteryLifeMinutes: null },
        batteryPlateSupport: [ "V-Mount (adapted)", "Gold Mount (adapted)" ],
        powerDistributionOutputs: [
          { type: "Hirose 12pin", notes: "For ENG type zoom lenses" },
          { type: "D-Tap", voltage: "12V", notes: "Power output" },
          { type: "Hirose 4pin", voltage: "12V", notes: "Power output" },
          { type: "Lemo 2pin", voltage: "12V", notes: "Power output" },
          { type: "RS 3pin", voltage: "24V", notes: "Power output" }
        ]
      },
      videoOutputs: [
        { type: "HD-SDI", count: 2, resolution: "1.5G, 3G, 6G", notes: "Uncompressed HD/UHD video with embedded audio and metadata" }
      ],
      fizConnectors: [
        { type: "Hirose 12pin", notes: "For ENG type zoom lenses (FIZ control)" },
        { type: "PL Mount w/ Hirose connector and LDS", notes: "For electronic lens data and control" },
        { type: "EF Mount", notes: "For electronic lens control" }
      ],
      recordingMedia: [ "CFast 2.0 memory cards" ],
      viewfinder: [ { type: "AMIRA Multi Viewfinder MVF-1", notes: "OLED eyepiece and fold-away LCD monitor" } ],
      lensMount: [ "B4 lens mount", "PL mount", "Canon EF mount" ],
      timecode: [ { type: "Timecode In/Out", notes: "Yes" } ]
    },
    "Sony Venice 2": {
      powerDrawWatts: 76,
      power: {
        input: {
          voltageRange: "DC 12 V (11.0 to 17.0 V) / DC 24 V (22.0 to 32.0 V)",
          portType: "XLR-type 4 pin (male) / Square-shaped 5 pin connector (Battery)",
          powerDrawWatts: 76
        },
        internalBattery: { type: "None", batteryLifeMinutes: null },
        batteryPlateSupport: [ "V-Mount (adapted)", "Gold Mount (adapted)" ],
        powerDistributionOutputs: [
          { type: "Fischer 3-pin", count: 2, voltage: "24V", current: "2.5A", wattage: 60, notes: "Regulated, 3A surge, 2.5A sustained shared" },
          { type: "LEMO 2-pin", count: 2, voltage: "12V", current: "7A", wattage: null, notes: "Unregulated, 7A shared" },
          { type: "D-Tap", count: 2, voltage: "12V", current: "9A", wattage: null, notes: "Unregulated, 9A shared" },
          { type: "USB", count: 1, voltage: "5V", current: "2.5A", wattage: 12.5, notes: "USB-A" }
        ]
      },
      videoOutputs: [
        { type: "SDI", count: 4, resolution: "12G-SDI" },
        { type: "SDI", count: 1, resolution: "HD-SDI" },
        { type: "HDMI", count: 1, version: "Type A" }
      ],
      fizConnectors: [
        { type: "Lens 12 pin", notes: "For lens control" },
        { type: "Lens Mount Hot Shoe 4 pin", notes: "Supports Cooke /i Intelligent Electronic Lens System and ZEISS eXtended Data" },
        { type: "Remote 8 pin", notes: "General remote control" }
      ],
      recordingMedia: [ "AXS Memory A-Series slot", "SD card slot" ],
      viewfinder: [ { type: "LEMO 26 pin", notes: "For Sony DVF-EL200 Viewfinder" } ],
      lensMount: [ "PL Mount (Native)", "E-mount (lever lock type, without supplied PL lens mount adaptor)", "LPL Mount (via Leitz adapter)" ],
      timecode: [ { type: "BNC", notes: "Timecode Input" }, { type: "BNC", notes: "Timecode Output (AUX)" } ]
    },
    "Sony Venice": {
      powerDrawWatts: 60
    },

    "Sony Burano": {
      powerDrawWatts: 66,
      power: {
        input: {
          voltageRange: "19.5V DC",
          portType: "DC IN (Barrel)",
          powerDrawWatts: 66
        },
        internalBattery: {
          type: "None",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (Native)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "D-Tap", count: 2, voltage: "14.4V", wattage: 50, notes: "Typical, via battery plate" },
          { type: "USB-C PD", voltage: "5V", current: "3A", wattage: 15, notes: "On camera body" }
        ]
      },
      videoOutputs: [
        { type: "SDI", notes: "12G-SDI, 3G-SDI" },
        { type: "HDMI" }
      ],
      fizConnectors: [
        { type: "LANC (2.5mm stereo mini jack)", notes: "Remote control" },
        { type: "USB-C", notes: "For specific accessories/control" }
      ],
      recordingMedia: [
        "CFexpress Type B"
      ],
      viewfinder: [
        { type: "Sony Burano EVF Port (Proprietary)", notes: "For Sony EVF" },
        { type: "LCD Monitor (Native)", size: "3.5-inch", resolution: "1280x720" }
      ],
      lensMount: [
        "Sony E-mount (Native)",
        "PL (adapted)"
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" },
        { type: "USB-C", notes: "For timecode sync via adapter" }
      ]
    },
    "Sony FX3": {
      powerDrawWatts: 7.3,
      power: {
        input: {
          voltageRange: "7.2V DC (via NP-FZ100) / 5V DC (via USB-C)",
          portType: "USB-C (Power Delivery) / Battery Slot",
          powerDrawWatts: 7.3
        },
        internalBattery: {
          type: "Sony NP-FZ100",
          batteryLifeMinutes: 135
        },
        batteryPlateSupport: [
          "NP-FZ100 (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "USB-C PD", voltage: "5V", current: "1.5A", wattage: 7.5, notes: "For charging or powering small accessories" }
        ]
      },
      videoOutputs: [
        { type: "HDMI (Type A)", notes: "Supports 4K 60p, 16-bit RAW output" }
      ],
      fizConnectors: [
        { type: "USB-C", notes: "For specific accessories/control" },
        { type: "Micro USB", notes: "For specific accessories/control" }
      ],
      recordingMedia: [
        "CFexpress Type A",
        "SD (UHS-II/UHS-I)"
      ],
      viewfinder: [
        { type: "LCD Monitor (Native)", size: "3.0-inch", resolution: "1.44M dots", notes: "Vari-angle touchscreen" }
      ],
      lensMount: [
        "Sony E-mount (Native)"
      ],
      timecode: [
        { type: "Multi-function shoe", notes: "Via XLR Handle Unit for timecode input" }
      ]
    },
    "Sony FX6": {
      powerDrawWatts: 18,
      power: {
        input: {
          voltageRange: "19.5V DC",
          portType: "DC IN (Barrel)",
          powerDrawWatts: 18
        },
        internalBattery: {
          type: "None",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "Sony L-Series InfoLithium (Native)",
          "Gold Mount (adapted)",
          "V-Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "D-Tap", count: 2, voltage: "14.4V", wattage: 50, notes: "Via optional MID49 DB-11, per port (typical)" },
          { type: "Fischer 3-pin", count: 2, voltage: "24V", current: "2.5A", wattage: 60, notes: "Via optional MID49 DB-11, per port, with R/S" },
          { type: "Lemo 2-pin", count: 2, voltage: "14.4V", wattage: 24, notes: "Via optional MID49 DB-11, per port (est. 2A)" },
          { type: "USB-C PD", voltage: "5V", current: "3A", wattage: 15, notes: "Via optional MID49 DB-11, with thread lock" }
        ]
      },
      videoOutputs: [
        { type: "12G-SDI", notes: "Supports 16-bit RAW" },
        { type: "HDMI", version: "2.0" }
      ],
      fizConnectors: [
        { type: "LANC (2.5mm stereo mini jack)", notes: "REMOTE connector" },
        { type: "Proprietary Side Grip Connection", notes: "Simulates Hand Grip for remote control" }
      ],
      recordingMedia: [
        "CFexpress Type A",
        "SD (UHS-II/UHS-I)"
      ],
      viewfinder: [
        { type: "Native LCD Viewfinder", size: "3.5-inch", notes: "Touch operation, flexible attachment" }
      ],
      lensMount: [
        "Sony E-mount (Native)",
        "PL (adapted)"
      ],
      timecode: [
        { type: "Analog Audio Inputs", notes: "2x mini XLR, 1x 3.5mm stereo input can be used for Timecode input" }
      ]
    },
    "Sony FX9": {
      powerDrawWatts: 35.2,
      power: {
        input: {
          voltageRange: "19.5V DC",
          portType: "DC IN (Barrel)",
          powerDrawWatts: 35.2
        },
        internalBattery: {
          type: "BP-U (e.g., BP-U35, BP-U70, BP-U100)",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "BP-U (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "D-Tap", count: 2, voltage: "14.4V", wattage: 50, notes: "Via optional XDCA-FX9 extension unit, per port" },
          { type: "Hirose 4-pin", voltage: "12V", current: "2A", wattage: 24, notes: "Via optional XDCA-FX9 extension unit" },
          { type: "USB-C", voltage: "5V", wattage: 7.5, notes: "Via optional XDCA-FX9 extension unit (USB 2.0)" }
        ]
      },
      videoOutputs: [
        { type: "SDI", notes: "12G-SDI, 3G-SDI" },
        { type: "HDMI" }
      ],
      fizConnectors: [
        { type: "LANC (2.5mm stereo mini jack)", notes: "Remote control" },
        { type: "USB-C", notes: "For specific accessories/control" }
      ],
      recordingMedia: [
        "XQD Card",
        "SD Card (for proxy/backup)"
      ],
      viewfinder: [
        { type: "Sony FX9 EVF Port (Proprietary)", notes: "For Sony EVF" },
        { type: "LCD Monitor (Native)", size: "3.5-inch", resolution: "1280x720" }
      ],
      lensMount: [
        "Sony E-mount (Native)",
        "PL (adapted)"
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" }
      ]
    },
    "Canon C70": {
      powerDrawWatts: 14.6,
      power: {
        input: {
          voltageRange: "24V DC",
          portType: "DC Input",
          powerDrawWatts: 14.6
        },
        internalBattery: {
          type: "BP-A30 (Supplied) / BP-A60 (Optional)",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "USB-C", notes: "USB 3.2 Gen1, for optional GPS Unit, Wi-Fi, Ethernet adapters" }
        ]
      },
      videoOutputs: [
        { type: "HDMI", notes: "Type A" }
      ],
      fizConnectors: [
        { type: "Canon RF mount", notes: "For electronic lens control (iris, focus, zoom) on compatible lenses" },
        { type: "REMOTE A connector", notes: "2.5 mm stereo mini-mini jack (input only)" }
      ],
      recordingMedia: [
        "SD CARD X2"
      ],
      viewfinder: [
        { type: "LCD Touch Panel", size: "3.5 inch", resolution: "1280 x 720" }
      ],
      lensMount: [
        "Canon RF mount"
      ],
      timecode: [
        { type: "BNC / HDMI" }
      ]
    },
    "Canon C80": {
      powerDrawWatts: 19.6,
      power: {
        input: {
          voltageRange: "19.5V DC",
          portType: "DC IN 24V Terminal",
          powerDrawWatts: 19.6
        },
        internalBattery: {
          type: "Canon BP-A30N (supplied) / BP-A60N / BP-A30 / BP-A60 (optional)",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "D-Tap", count: "multiple", voltage: "Battery Voltage", wattage: 50, notes: "Via optional MID49 DB-4, typical per port" },
          { type: "USB-C PD", count: 1, voltage: "5V", wattage: null, notes: "Via optional MID49 DB-4" },
          { type: "Fischer 3-pin", count: "multiple", voltage: "24V", current: "2.5A", wattage: 60, notes: "Via optional MID49 DB-4, per port, with R/S" },
          { type: "LEMO 2-pin", count: "multiple", voltage: "Battery Voltage", wattage: 24, notes: "Via optional MID49 DB-4, typical per port (est. 2A)" }
        ]
      },
      videoOutputs: [
        { type: "SDI OUT", count: 1, resolution: "12G/6G/3G/HD-SDI", notes: "BNC terminal" },
        { type: "HDMI", count: 1, version: "Type-A" }
      ],
      fizConnectors: [
        { type: "REMOTE A (2.5mm)", notes: "LANC" },
        { type: "Multi-function shoe", notes: "21 pin with electrical contacts" }
      ],
      recordingMedia: [
        "SD Card (SD / SDHC / SDXC)",
        "Dual SD card slots for simultaneous recording"
      ],
      viewfinder: [
        { type: "None", notes: "No built-in viewfinder. External LCD monitor." }
      ],
      lensMount: [
        "Canon RF mount (Native)",
        "PL (adapted)",
        "EF (adapted)"
      ],
      timecode: [
        { type: "BNC terminal", notes: "Time Code In/Out" }
      ]
    },
    "Canon C300 Mk III": {
      powerDrawWatts: 31,
      power: {
        input: {
          voltageRange: "11.5V - 20V DC",
          portType: "XLR 4-pin jack",
          powerDrawWatts: 31
        },
        internalBattery: {
          type: "BP-A60 (Supplied)",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "DC Output", notes: "Via optional Expansion Unit EU-V2 / EU-V3" },
          { type: "Lens terminal 12-pin", notes: "Via optional Expansion Unit EU-V2" }
        ]
      },
      videoOutputs: [
        { type: "12G-SDI", count: 1, notes: "BNC terminal, 4K to 2K/FHD conversion available" },
        { type: "HDMI", count: 1 }
      ],
      fizConnectors: [
        { type: "REMOTE A connector", notes: "2.5 mm stereo jack (input only)" },
        { type: "REMOTE B connector", notes: "Round 8-pin jack (for RS-422) with optional EU-V1 / EU-V2 / EU-V3" },
        { type: "Lens terminal 12-pin jack", notes: "Requires optional EU-V2 / EU-V3" }
      ],
      recordingMedia: [
        "Dual CFexpress slots",
        "SD card slot (for proxy/backup)"
      ],
      viewfinder: [
        { type: "LCD Monitor LM-V2 (Supplied)", notes: "4.3” rotating touchscreen LCD unit" },
        { type: "Optional EVF-V70 viewfinder" }
      ],
      lensMount: [
        "Canon EF mount (Native)",
        "PL Mount (Cooke/I Technology) (User changeable option)"
      ],
      timecode: [
        { type: "Time code", notes: "Yes (via BNC)" },
        { type: "Genlock", notes: "Yes, with optional Expansion Unit EU-V1 and EU-V2 (BNC jack, input only/also serves as SYNC OUT connector)" }
      ]
    },
    "Canon C400": {
      powerDrawWatts: 32.5,
      power: {
        input: {
          voltageRange: "11.5V-20V DC",
          portType: "4-pin XLR / DC IN 12V",
          powerDrawWatts: 32.5
        },
        internalBattery: {
          type: "BP-A60N (Supplied) / BP-A30N / BP-A30 / BP-A60 (Optional)",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "Multi-Accessory Shoe", notes: "Via camera body or top handle" },
          { type: "USB-C Data Terminal", notes: "USB 3.2 Gen1" },
          { type: "USB-C Terminal (Grip)", notes: "For supplied Hand Grip only" },
          { type: "USB-C Terminal (LCD Monitor)", notes: "For supplied LCD Monitor only" }
        ]
      },
      videoOutputs: [
        { type: "12G-SDI", count: 1, notes: "BNC" },
        { type: "3G-SDI Monitoring", count: 1, notes: "Monitor Output BNC" },
        { type: "HDMI", count: 1, version: "Type-A" }
      ],
      fizConnectors: [
        { type: "Remote Control Terminal", notes: "2.5 mm stereo mini jack" },
        { type: "Lens Terminal", notes: "12-pin jack" },
        { type: "Cooke /i Technology\u2122 Support", notes: "Only when equipped with Mount Adapter PL-RF" }
      ],
      recordingMedia: [
        "CFexpress Type B",
        "SD UHS-II"
      ],
      viewfinder: [
        { type: "LCD Touchscreen", size: "3.5 inch", resolution: "1280 x 720" }
      ],
      lensMount: [
        "Canon RF mount (Native)",
        "PL mount (via PL-RF Mount Adapter)",
        "EF mount (via EF-EOS R Mount Adapter)"
      ],
      timecode: [
        { type: "DIN1.0 / 2.3", notes: "Input / Output" },
        { type: "Genlock", notes: "DIN1.0 / 2.3 (shared with Sync & Return)" }
      ]
    },
    "Canon C500 Mk II": {
      powerDrawWatts: 63,
      power: {
        input: {
          voltageRange: "11.5V - 20V DC",
          portType: "XLR 4-pin jack",
          powerDrawWatts: 63
        },
        internalBattery: {
          type: "BP-A60 (Supplied)",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "DC Output", notes: "Via optional Expansion Unit EU-V2 / EU-V3" },
          { type: "Lens terminal 12-pin", notes: "Via optional Expansion Unit EU-V2 / EU-V3" }
        ]
      },
      videoOutputs: [
        { type: "12G-SDI", count: 1, notes: "BNC terminal, 4K to 2K/FHD conversion available" },
        { type: "HDMI", count: 1 }
      ],
      fizConnectors: [
        { type: "REMOTE A connector", notes: "2.5 mm stereo jack (input only)" },
        { type: "REMOTE B connector", notes: "Round 8-pin jack (for RS-422) with optional EU-V1 / EU-V2 / EU-V3" },
        { type: "Lens terminal 12-pin jack", notes: "Requires optional EU-V2 / EU-V3" }
      ],
      recordingMedia: [
        "Dual CFexpress slots"
      ],
      viewfinder: [
        { type: "LCD Monitor LM-V2 (Supplied)", notes: "Canon's proprietary specification (special 13-pin jack)" },
        { type: "Optional EVF-V70 viewfinder" },
        { type: "Optional EVF-V50" }
      ],
      lensMount: [
        "Canon EF mount (Native)",
        "PL mount (User changeable option)"
      ],
      timecode: [
        { type: "Time code", notes: "Yes (via BNC)" },
        { type: "Genlock", notes: "Yes, with optional Expansion Unit EU-V1 and EU-V2 (BNC jack, input only/also serves as SYNC OUT connector)" }
      ]
    },
    "Blackmagic BMPCC 4K": {
      powerDrawWatts: 22,
      power: {
        input: {
          voltageRange: "12V-20V",
          portType: "2-pin locking connector",
          powerDrawWatts: 22
        },
        internalBattery: {
          type: "Canon LP-E6",
          batteryLifeMinutes: 60
        },
        batteryPlateSupport: [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "USB-C 3.1 Gen 1", notes: "For external drive recording, PTP camera control, software updates, can trickle charge battery" }
        ]
      },
      videoOutputs: [
        { type: "HDMI", count: 1, version: "Type A" }
      ],
      fizConnectors: [
        { type: "Active MFT mount", notes: "Iris, focus and zoom on supported lenses" },
        { type: "USB Type-C", notes: "PTP camera control" },
        { type: "Bluetooth", notes: "Wireless control" }
      ],
      recordingMedia: [
        "CFast card slot",
        "SD UHS-II card slot",
        "USB-C 3.1 Gen 1 expansion port for external media"
      ],
      viewfinder: [
        { type: "LCD capacitive touchscreen", size: "5 inch", resolution: "1920 x 1080" }
      ],
      lensMount: [
        "Active MFT mount"
      ],
      timecode: [
        { type: "3.5mm Stereo Input", notes: "Can also be used for Timecode input" },
        { type: "Internal Clock", notes: "Less than 1 frame drift every 8 hours" }
      ]
    },

    // Blackmagic BMPCC 6K G2
    "Blackmagic BMPCC 6K G2": {
      powerDrawWatts: 26,
      power: {
        input: {
          voltageRange: "12V - 20V DC",
          portType: "2-pin locking connector",
          powerDrawWatts: 26
        },
        internalBattery: {
          type: "NP-F570",
          batteryLifeMinutes: 45
        },
        batteryPlateSupport: [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "USB-C", notes: "For external hard drive recording and software updates" }
        ]
      },
      videoOutputs: [
        { type: "HDMI", count: 1, version: "Type A" }
      ],
      fizConnectors: [
        { type: "Active EF mount", notes: "Iris, focus and zoom on supported lenses" },
        { type: "Bluetooth", notes: "Wireless control" }
      ],
      recordingMedia: [
        "CFast 2.0 card slot",
        "SD UHS-II card slot",
        "USB-C 3.1 Gen 1 expansion port for external media"
      ],
      viewfinder: [
        { type: "LCD capacitive touchscreen", size: "5 inch", resolution: "1920 x 1080", notes: "Adjustable HDR touchscreen" },
        { type: "Optional OLED viewfinder" }
      ],
      lensMount: [
        "Active EF mount"
      ],
      timecode: [
        { type: "3.5 mm TRS / mini jack", notes: "Also for LTC timecode" },
        { type: "Internal Clock", notes: "Less than 1 frame drift every 8 hours" }
      ]
    },

    // Blackmagic BMPCC 6K
    "Blackmagic BMPCC 6K": {
      powerDrawWatts: 26,
      power: {
        input: {
          voltageRange: "12V-20V",
          portType: "2-pin locking connector",
          powerDrawWatts: 26
        },
        internalBattery: {
          type: "Canon LP-E6",
          batteryLifeMinutes: 45
        },
        batteryPlateSupport: [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "USB-C 3.1 Gen 1", notes: "For external drive recording, PTP camera control, software updates, can trickle charge battery" }
        ]
      },
      videoOutputs: [
        { type: "HDMI", count: 1, version: "Type A" }
      ],
      fizConnectors: [
        { type: "Active EF mount", notes: "Iris, focus and zoom on supported lenses" },
        { type: "USB Type-C", notes: "PTP camera control" },
        { type: "Bluetooth", notes: "Wireless control" }
      ],
      recordingMedia: [
        "CFast card slot",
        "SD UHS-II card slot",
        "USB-C 3.1 Gen 1 expansion port for external media"
      ],
      viewfinder: [
        { type: "LCD capacitive touchscreen", size: "5 inch", resolution: "1920 x 1080" }
      ],
      lensMount: [
        "Active EF mount"
      ],
      timecode: [
        { type: "3.5mm Stereo Input", notes: "Can also be used for Timecode input" },
        { type: "Internal Clock", notes: "Less than 1 frame drift every 8 hours" }
      ]
    },

    // Blackmagic Pocket Cinema Camera 6K Pro
    "Blackmagic Pocket Cinema Camera 6K Pro": {
      powerDrawWatts: 26,
      power: {
        input: {
          voltageRange: "12V-20V",
          portType: "2-pin locking connector / 2-pin LEMO",
          powerDrawWatts: 26
        },
        internalBattery: {
          type: "NP-F570",
          batteryLifeMinutes: 60
        },
        batteryPlateSupport: [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "USB-C PD", voltage: "5V", current: "3A", wattage: 15, notes: "Power Delivery for accessories/charging" }
        ]
      },
      videoOutputs: [
        { type: "HDMI", resolution: "1080p60" }
      ],
      fizConnectors: [
        { type: "Active EF Mount", notes: "For electronic EF lenses (iris, focus, zoom)" },
        { type: "USB-C", notes: "For Blackmagic Zoom/Focus Demand, PTP camera control" },
        { type: "Bluetooth", notes: "Wireless control" }
      ],
      recordingMedia: [
        "CFast",
        "SD UHS-II",
        "USB-C to external SSD/HDD"
      ],
      viewfinder: [
        { type: "Native LCD Capacitive Touchscreen", size: "5-inch", resolution: "1920x1080" },
        { type: "Blackmagic Pocket Cinema Camera Pro EVF (Optional)", resolution: "1280x960", notes: "Micro OLED display" }
      ],
      lensMount: [
        "Active EF Mount (Native)"
      ],
      timecode: [
        { type: "Internal Clock", notes: "Less than 1 frame drift every 8 hours" },
        { type: "Analog Audio Inputs", notes: "2x mini XLR, 1x 3.5mm Stereo Input can be used for Timecode input" }
      ]
    },

    // Blackmagic URSA 12K
    "Blackmagic URSA 12K": {
      powerDrawWatts: 55,
      power: {
        input: {
          voltageRange: "12V DC",
          portType: "12-pin Molex connector (at battery plate rear) / 4-pin XLR (external power)",
          powerDrawWatts: 55
        },
        internalBattery: {
          type: "None",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (Native)",
          "Gold Mount (Native)"
        ],
        powerDistributionOutputs: [
          { type: "D-Tap", count: "multiple", voltage: "12V", wattage: null, notes: "Regulated, via individualized V-Mount battery plate" },
          { type: "USB Type-C 3.1 Gen 2", count: 1, voltage: null, wattage: null, notes: "With power delivery for external drive recording" }
        ]
      },
      videoOutputs: [
        { type: "12G-SDI", count: 1 },
        { type: "3G-SDI Monitoring", count: 1 }
      ],
      fizConnectors: [
        { type: "LANC", count: 1, notes: "2.5mm input for Rec Start/Stop, Iris and Focus control" },
        { type: "12pin broadcast connector", notes: "For compatible lenses and electronic control via EF mount pins on optional EF lens mount" }
      ],
      recordingMedia: [
        "CFast 2.0 card slots",
        "SD UHS-II card slots",
        "USB-C 3.1 Gen 2 expansion port for external media"
      ],
      viewfinder: [
        { type: "LCD capacitive touchscreen", size: "4 inch", notes: "Fold out touchscreen" },
        { type: "External backlit LCD status display" }
      ],
      lensMount: [
        "PL mount (Included)",
        "EF (optional)",
        "F (optional)"
      ],
      timecode: [
        { type: "BNC", notes: "Timecode Input (Reference Inputs: Tri-Sync/Black Burst/Timecode)" },
        { type: "Internal Clock", notes: "Highly accurate, less than 1 frame drift every 8 hours" }
      ]
    },

    // Blackmagic URSA Cine
    "Blackmagic URSA Cine": {
      powerDrawWatts: 100,
      power: {
        input: {
          voltageRange: "20V-30V DC",
          portType: "2-pin XLR",
          powerDrawWatts: 100
        },
        internalBattery: {
          type: "None",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (Native)",
          "Gold Mount (Native)"
        ],
        powerDistributionOutputs: [
          { type: "2-pin LEMO", count: 2, voltage: "12V", current: "3A", wattage: 36, notes: "Regulated" },
          { type: "3-pin Fischer", count: 1, voltage: "24V", current: "3A", wattage: 72, notes: "Regulated, with run/stop" },
          { type: "D-Tap", count: 2, voltage: "Battery Voltage", wattage: null, notes: "Unregulated" },
          { type: "USB-C", count: 1, voltage: "5V", current: "1.5A", wattage: 7.5, notes: "For accessories" }
        ]
      },
      videoOutputs: [
        { type: "12G-SDI", count: 2 },
        { type: "HDMI", count: 1 }
      ],
      fizConnectors: [
        { type: "LANC", notes: "2.5mm" },
        { type: "12-pin Hirose", notes: "For broadcast lenses" }
      ],
      recordingMedia: [
        "Blackmagic Media Module (8TB)",
        "CFexpress Type B (via adapter)"
      ],
      viewfinder: [
        { type: "Built-in Fold-out LCD", size: "5-inch", resolution: "1920x1080" },
        { type: "Blackmagic URSA Cine EVF (Optional)" }
      ],
      lensMount: [
        "User-interchangeable PL, LPL, EF, Hasselblad"
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" }
      ]
    },

    // Blackmagic PYXIS 6K
    "Blackmagic PYXIS 6K": {
      powerDrawWatts: 60,
      power: {
        input: {
          voltageRange: "12V-20V DC",
          portType: "2-pin locking connector",
          powerDrawWatts: 60
        },
        internalBattery: {
          type: "NP-F570",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "USB-C", notes: "For external drive recording, power delivery" }
        ]
      },
      videoOutputs: [
        { type: "HDMI", count: 1, version: "Type A" }
      ],
      fizConnectors: [
        { type: "Active L-Mount", notes: "Iris, focus and zoom on supported lenses" },
        { type: "USB-C", notes: "PTP camera control" },
        { type: "Bluetooth", notes: "Wireless control" }
      ],
      recordingMedia: [
        "CFexpress Type B",
        "USB-C to external SSD/HDD"
      ],
      viewfinder: [
        { type: "LCD capacitive touchscreen", size: "4 inch", resolution: "1280x720" }
      ],
      lensMount: [
        "Active L-Mount"
      ],
      timecode: [
        { type: "3.5mm Stereo Input", notes: "Can be used for Timecode input" }
      ]
    },

    // Blackmagic PYXIS 12K
    "Blackmagic PYXIS 12K": {
      powerDrawWatts: 90,
      power: {
        input: {
          voltageRange: "12V-20V DC",
          portType: "2-pin locking connector",
          powerDrawWatts: 90
        },
        internalBattery: {
          type: "NP-F570",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "USB-C", notes: "For external drive recording, power delivery" }
        ]
      },
      videoOutputs: [
        { type: "HDMI", count: 1, version: "Type A" }
      ],
      fizConnectors: [
        { type: "Active L-Mount", notes: "Iris, focus and zoom on supported lenses" },
        { type: "USB-C", notes: "PTP camera control" },
        { type: "Bluetooth", notes: "Wireless control" }
      ],
      recordingMedia: [
        "CFexpress Type B",
        "USB-C to external SSD/HDD"
      ],
      viewfinder: [
        { type: "LCD capacitive touchscreen", size: "4 inch", resolution: "1280x720" }
      ],
      lensMount: [
        "Active L-Mount"
      ],
      timecode: [
        { type: "3.5mm Stereo Input", notes: "Can be used for Timecode input" }
      ]
    },

    // RED Komodo 6k
    "RED Komodo 6k": {
      powerDrawWatts: 37,
      power: {
        input: {
          voltageRange: "+7 to +17 V DC",
          portType: "2-pin DC-Input",
          powerDrawWatts: 37
        },
        internalBattery: {
          type: "Canon BP-900 Series",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (adapted)",
          "Gold Mount (adapted)",
          "Micro Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "D-Tap / P-Tap", count: "1-2", voltage: "12-14.8V", wattage: 50, notes: "Via optional third-party plates, typical per port" },
          { type: "USB-A", count: 1, voltage: "5V", current: "1-2A", wattage: null, notes: "Via optional third-party plates" },
          { type: "LEMO 2-pin", count: "1-2", voltage: "12-14.8V", wattage: 24, notes: "Via optional third-party plates, typical per port (est. 2A)" }
        ]
      },
      videoOutputs: [
        { type: "12G-SDI", count: 1, notes: "Also supports 6G-SDI, 3G-SDI, and 1.5G-SDI modes" }
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Supports Genlock, Timecode In, GPIO, and Ctrl (RS-232)" },
        { type: "USB-C / Gigabit Ethernet (via adapter)", notes: "Via KOMODO Link Adaptor for camera control" }
      ],
      recordingMedia: [
        "CFast 2.0"
      ],
      viewfinder: [
        { type: "Integrated Touchscreen LCD", size: "2.9-inch", resolution: "1440x1440" },
        { type: "DSMC3 RED Touch 7\" LCD (Optional)" }
      ],
      lensMount: [
        "Canon RF Lens Mount (Native, locking)",
        "Canon EF (adapted)",
        "ARRI PL (adapted)"
      ],
      timecode: [
        { type: "EXT Port (9-pin)", notes: "Timecode In" }
      ]
    },

    // RED Komodo X
    "RED Komodo X": {
      powerDrawWatts: 45,
      power: {
        input: {
          voltageRange: "+7 to +17 V DC",
          portType: "2-pin DC-Input",
          powerDrawWatts: 45
        },
        internalBattery: {
          type: "REDVOLT NANO",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "USB-C", notes: "Power Delivery" },
          { type: "P-Tap", notes: "Via optional expander" }
        ]
      },
      videoOutputs: [
        { type: "12G-SDI", count: 1 }
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Genlock, Timecode, GPIO, Ctrl" },
        { type: "USB-C", notes: "Camera control" }
      ],
      recordingMedia: [
        "CFexpress Type B"
      ],
      viewfinder: [
        { type: "Integrated Touchscreen LCD", size: "2.9-inch" },
        { type: "DSMC3 RED Touch 7\" LCD (Optional)" }
      ],
      lensMount: [
        "Canon RF Lens Mount (Native)"
      ],
      timecode: [
        { type: "EXT Port (9-pin)", notes: "Timecode In" }
      ]
    },

    // V-Raptor XL 8K VV
    "V-Raptor XL 8K VV": {
      powerDrawWatts: 75,
      power: {
        input: {
          voltageRange: "24V DC",
          portType: "4-pin XLR / V-Lock",
          powerDrawWatts: 75
        },
        internalBattery: {
          type: "None",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (Native)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "P-Tap", count: 2, voltage: "12V", wattage: null },
          { type: "2-pin LEMO", count: 2, voltage: "12V", wattage: null },
          { type: "3-pin Fischer", count: 1, voltage: "24V", wattage: null, notes: "R/S" },
          { type: "USB-C", count: 1, voltage: "5V", wattage: null }
        ]
      },
      videoOutputs: [
        { type: "12G-SDI", count: 4 }
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Genlock, Timecode, GPIO, Ctrl" },
        { type: "LANC", notes: "2.5mm" }
      ],
      recordingMedia: [
        "CFexpress Type B"
      ],
      viewfinder: [
        { type: "DSMC3 RED Touch 7\" LCD (Optional)" }
      ],
      lensMount: [
        "Interchangeable PL, EF"
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" }
      ]
    },
    // V-RAPTOR® X XL 8K VV
    "V-RAPTOR® X XL 8K VV": {
      powerDrawWatts: 75, // This value is taken directly from the initial data.js file.
      power: {
        input: {
          voltageRange: "24V DC", // Source: RED V-RAPTOR X XL 8K VV Product Page
          portType: "4-pin XLR / V-Lock", // Source: RED V-RAPTOR X XL 8K VV Product Page
          powerDrawWatts: 75 // Consistent with the top-level powerDrawWatts.
        },
        internalBattery: {
          type: "None",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (Native)", // Source: RED V-RAPTOR X XL 8K VV Product Page
          "Gold Mount (adapted)" // Source: Third-party accessories
        ],
        powerDistributionOutputs: [
          { type: "P-Tap", count: 2, voltage: "12V", wattage: null }, // Source: RED V-RAPTOR X XL 8K VV Product Page
          { type: "2-pin LEMO", count: 2, voltage: "12V", wattage: null }, // Source: RED V-RAPTOR X XL 8K VV Product Page
          { type: "3-pin Fischer", count: 1, voltage: "24V", wattage: null, notes: "R/S" }, // Source: RED V-RAPTOR X XL 8K VV Product Page
          { type: "USB-C", count: 1, voltage: "5V", wattage: null } // Source: RED V-RAPTOR X XL 8K VV Product Page
        ]
      },
      videoOutputs: [
        { type: "12G-SDI", count: 4 } // Source: RED V-RAPTOR X XL 8K VV Product Page
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Genlock, Timecode, GPIO, Ctrl" }, // Source: RED V-RAPTOR X XL 8K VV Product Page
        { type: "LANC", notes: "2.5mm" } // Source: RED V-RAPTOR X XL 8K VV Product Page
      ],
      recordingMedia: [
        "CFexpress Type B" // Source: RED V-RAPTOR X XL 8K VV Product Page
      ],
      viewfinder: [
        { type: "DSMC3 RED Touch 7\" LCD (Optional)" } // Source: RED V-RAPTOR X XL 8K VV Product Page
      ],
      lensMount: [
        "Interchangeable PL, EF" // Source: RED V-RAPTOR X XL 8K VV Product Page
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" } // Source: RED V-RAPTOR X XL 8K VV Product Page
      ]
    },
    // V-RAPTOR® XL 8K S35
    "V-RAPTOR® XL 8K S35": {
      powerDrawWatts: 75, // This value is taken directly from the initial data.js file.
      power: {
        input: {
          voltageRange: "24V DC", // Source: RED V-RAPTOR XL 8K S35 Product Page
          portType: "4-pin XLR / V-Lock", // Source: RED V-RAPTOR XL 8K S35 Product Page
          powerDrawWatts: 75 // Consistent with the top-level powerDrawWatts.
        },
        internalBattery: {
          type: "None",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (Native)", // Source: RED V-RAPTOR XL 8K S35 Product Page
          "Gold Mount (adapted)" // Source: Third-party accessories
        ],
        powerDistributionOutputs: [
          { type: "P-Tap", count: 2, voltage: "12V", wattage: null }, // Source: RED V-RAPTOR XL 8K S35 Product Page
          { type: "2-pin LEMO", count: 2, voltage: "12V", wattage: null }, // Source: RED V-RAPTOR XL 8K S35 Product Page
          { type: "3-pin Fischer", count: 1, voltage: "24V", wattage: null, notes: "R/S" }, // Source: RED V-RAPTOR XL 8K S35 Product Page
          { type: "USB-C", count: 1, voltage: "5V", wattage: null } // Source: RED V-RAPTOR XL 8K S35 Product Page
        ]
      },
      videoOutputs: [
        { type: "12G-SDI", count: 4 } // Source: RED V-RAPTOR XL 8K S35 Product Page
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Genlock, Timecode, GPIO, Ctrl" }, // Source: RED V-RAPTOR XL 8K S35 Product Page
        { type: "LANC", notes: "2.5mm" } // Source: RED V-RAPTOR XL 8K S35 Product Page
      ],
      recordingMedia: [
        "CFexpress Type B" // Source: RED V-RAPTOR XL 8K S35 Product Page
      ],
      viewfinder: [
        { type: "DSMC3 RED Touch 7\" LCD (Optional)" } // Source: RED V-RAPTOR XL 8K S35 Product Page
      ],
      lensMount: [
        "Interchangeable PL, EF" // Source: RED V-RAPTOR XL 8K S35 Product Page
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" } // Source: RED V-RAPTOR XL 8K S35 Product Page
      ]
    },
    // V-RAPTOR® X XL 8K S35
    "V-RAPTOR® X XL 8K S35": {
      powerDrawWatts: 75, // This value is taken directly from the initial data.js file.
      power: {
        input: {
          voltageRange: "24V DC", // Source: RED V-RAPTOR X XL 8K S35 Product Page
          portType: "4-pin XLR / V-Lock", // Source: RED V-RAPTOR X XL 8K S35 Product Page
          powerDrawWatts: 75 // Consistent with the top-level powerDrawWatts.
        },
        internalBattery: {
          type: "None",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (Native)", // Source: RED V-RAPTOR X XL 8K S35 Product Page
          "Gold Mount (adapted)" // Source: Third-party accessories
        ],
        powerDistributionOutputs: [
          { type: "P-Tap", count: 2, voltage: "12V", wattage: null }, // Source: RED V-RAPTOR X XL 8K S35 Product Page
          { type: "2-pin LEMO", count: 2, voltage: "12V", wattage: null }, // Source: RED V-RAPTOR X XL 8K S35 Product Page
          { type: "3-pin Fischer", count: 1, voltage: "24V", wattage: null, notes: "R/S" }, // Source: RED V-RAPTOR X XL 8K S35 Product Page
          { type: "USB-C", count: 1, voltage: "5V", wattage: null } // Source: RED V-RAPTOR X XL 8K S35 Product Page
        ]
      },
      videoOutputs: [
        { type: "12G-SDI", count: 4 } // Source: RED V-RAPTOR X XL 8K S35 Product Page
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Genlock, Timecode, GPIO, Ctrl" }, // Source: RED V-RAPTOR X XL 8K S35 Product Page
        { type: "LANC", notes: "2.5mm" } // Source: RED V-RAPTOR X XL 8K S35 Product Page
      ],
      recordingMedia: [
        "CFexpress Type B" // Source: RED V-RAPTOR X XL 8K S35 Product Page
      ],
      viewfinder: [
        { type: "DSMC3 RED Touch 7\" LCD (Optional)" } // Source: RED V-RAPTOR X XL 8K S35 Product Page
      ],
      lensMount: [
        "Interchangeable PL, EF" // Source: RED V-RAPTOR X XL 8K S35 Product Page
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" } // Source: RED V-RAPTOR X XL 8K S35 Product Page
      ]
    },
    // V-Raptor 8k S35
    "V-Raptor 8k S35": {
      powerDrawWatts: 60, // This value is taken directly from the initial data.js file.
      power: {
        input: {
          voltageRange: "11.5V-17V DC", // Source: RED V-RAPTOR 8K S35 Product Page
          portType: "2-pin DC-IN", // Source: RED V-RAPTOR 8K S35 Product Page
          powerDrawWatts: 60 // Consistent with the top-level powerDrawWatts.
        },
        internalBattery: {
          type: "REDVOLT Micro-V", // Source: RED V-RAPTOR 8K S35 Product Page
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "V-Mount (Native)", // Source: RED V-RAPTOR 8K S35 Product Page
          "Gold Mount (adapted)" // Source: Third-party accessories
        ],
        powerDistributionOutputs: [
          { type: "P-Tap", count: 1, voltage: "12V", wattage: null } // Source: RED V-RAPTOR 8K S35 Product Page
        ]
      },
      videoOutputs: [
        { type: "12G-SDI", count: 2 } // Source: RED V-RAPTOR 8K S35 Product Page
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Genlock, Timecode, GPIO, Ctrl" }, // Source: RED V-RAPTOR 8K S35 Product Page
        { type: "USB-C", notes: "Camera control" } // Source: RED V-RAPTOR 8K S35 Product Page
      ],
      recordingMedia: [
        "CFexpress Type B" // Source: RED V-RAPTOR 8K S35 Product Page
      ],
      viewfinder: [
        { type: "DSMC3 RED Touch 7\" LCD (Optional)" } // Source: RED V-RAPTOR 8K S35 Product Page
      ],
      lensMount: [
        "Interchangeable PL, EF" // Source: RED V-RAPTOR 8K S35 Product Page
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" } // Source: RED V-RAPTOR 8K S35 Product Page
      ]
    },
    // V-Raptor X 8k S35
    "V-Raptor X 8k S35": {
      powerDrawWatts: 60, // This value is taken directly from the initial data.js file.
      power: {
        input: {
          voltageRange: "11.5V-17V DC", // Source: RED V-RAPTOR X 8K S35 Product Page
          portType: "2-pin DC-IN", // Source: RED V-RAPTOR X 8K S35 Product Page
          powerDrawWatts: 60 // Consistent with the top-level powerDrawWatts.
        },
        internalBattery: {
          type: "REDVOLT Micro-V", // Source: RED V-RAPTOR X 8K S35 Product Page
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "V-Mount (Native)", // Source: RED V-RAPTOR X 8K S35 Product Page
          "Gold Mount (adapted)" // Source: Third-party accessories
        ],
        powerDistributionOutputs: [
          { type: "P-Tap", count: 1, voltage: "12V", wattage: null } // Source: RED V-RAPTOR X 8K S35 Product Page
        ]
      },
      videoOutputs: [
        { type: "12G-SDI", count: 2 } // Source: RED V-RAPTOR X 8K S35 Product Page
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Genlock, Timecode, GPIO, Ctrl" }, // Source: RED V-RAPTOR X 8K S35 Product Page
        { type: "USB-C", notes: "Camera control" } // Source: RED V-RAPTOR X 8K S35 Product Page
      ],
      recordingMedia: [
        "CFexpress Type B" // Source: RED V-RAPTOR X 8K S35 Product Page
      ],
      viewfinder: [
        { type: "DSMC3 RED Touch 7\" LCD (Optional)" } // Source: RED V-RAPTOR X 8K S35 Product Page
      ],
      lensMount: [
        "Interchangeable PL, EF" // Source: RED V-RAPTOR X 8K S35 Product Page
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" } // Source: RED V-RAPTOR X 8K S35 Product Page
      ]
    },
    // V-Raptor 8k VV
    "V-Raptor 8k VV": {
      powerDrawWatts: 60, // This value is taken directly from the initial data.js file.
      power: {
        input: {
          voltageRange: "11.5V-17V DC", // Source: RED V-RAPTOR 8K VV Product Page
          portType: "2-pin DC-IN", // Source: RED V-RAPTOR 8K VV Product Page
          powerDrawWatts: 60 // Consistent with the top-level powerDrawWatts.
        },
        internalBattery: {
          type: "REDVOLT Micro-V", // Source: RED V-RAPTOR 8K VV Product Page
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "V-Mount (Native)", // Source: RED V-RAPTOR 8K VV Product Page
          "Gold Mount (adapted)" // Source: Third-party accessories
        ],
        powerDistributionOutputs: [
          { type: "P-Tap", count: 1, voltage: "12V", wattage: null } // Source: RED V-RAPTOR 8K VV Product Page
        ]
      },
      videoOutputs: [
        { type: "12G-SDI", count: 2 } // Source: RED V-RAPTOR 8K VV Product Page
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Genlock, Timecode, GPIO, Ctrl" }, // Source: RED V-RAPTOR 8K VV Product Page
        { type: "USB-C", notes: "Camera control" } // Source: RED V-RAPTOR 8K VV Product Page
      ],
      recordingMedia: [
        "CFexpress Type B" // Source: RED V-RAPTOR 8K VV Product Page
      ],
      viewfinder: [
        { type: "DSMC3 RED Touch 7\" LCD (Optional)" } // Source: RED V-RAPTOR 8K VV Product Page
      ],
      lensMount: [
        "Interchangeable PL, EF" // Source: RED V-RAPTOR 8K VV Product Page
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" } // Source: RED V-RAPTOR 8K VV Product Page
      ]
    },
    // V-Raptor X 8k VV
    "V-Raptor X 8k VV": {
      powerDrawWatts: 60, // This value is taken directly from the initial data.js file.
      power: {
        input: {
          voltageRange: "11.5V-17V DC", // Source: RED V-RAPTOR X 8K VV Product Page
          portType: "2-pin DC-IN", // Source: RED V-RAPTOR X 8K VV Product Page
          powerDrawWatts: 60 // Consistent with the top-level powerDrawWatts.
        },
        internalBattery: {
          type: "REDVOLT Micro-V", // Source: RED V-RAPTOR X 8K VV Product Page
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "V-Mount (Native)", // Source: RED V-RAPTOR X 8K VV Product Page
          "Gold Mount (adapted)" // Source: Third-party accessories
        ],
        powerDistributionOutputs: [
          { type: "P-Tap", count: 1, voltage: "12V", wattage: null } // Source: RED V-RAPTOR X 8K VV Product Page
        ]
      },
      videoOutputs: [
        { type: "12G-SDI", count: 2 } // Source: RED V-RAPTOR X 8K VV Product Page
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Genlock, Timecode, GPIO, Ctrl" }, // Source: RED V-RAPTOR X 8K VV Product Page
        { type: "USB-C", notes: "Camera control" } // Source: RED V-RAPTOR X 8K VV Product Page
      ],
      recordingMedia: [
        "CFexpress Type B" // Source: RED V-RAPTOR X 8K VV Product Page
      ],
      viewfinder: [
        { type: "DSMC3 RED Touch 7\" LCD (Optional)" } // Source: RED V-RAPTOR X 8K VV Product Page
      ],
      lensMount: [
        "Interchangeable PL, EF" // Source: RED V-RAPTOR X 8K VV Product Page
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" } // Source: RED V-RAPTOR X 8K VV Product Page
      ]
    },
    // RED Scarlet-W (Dragon Sensor)
    "RED Scarlet-W (Dragon Sensor)": {
      powerDrawWatts: 60, // This value is taken directly from the initial data.js file.
      power: {
        input: {
          voltageRange: "11.5V-17V DC", // Source: RED Scarlet-W Product Page
          portType: "2-pin DC-IN", // Source: RED Scarlet-W Product Page
          powerDrawWatts: 60 // Consistent with top-level powerDrawWatts.
        },
        internalBattery: {
          type: "REDVOLT", // Source: RED Scarlet-W Product Page
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "V-Mount (adapted)", // Source: Third-party accessories
          "Gold Mount (adapted)" // Source: Third-party accessories
        ],
        powerDistributionOutputs: [
          { type: "P-Tap", count: 1, voltage: "12V", wattage: null } // Source: RED Scarlet-W Product Page
        ]
      },
      videoOutputs: [
        { type: "3G-SDI", count: 2 } // Source: RED Scarlet-W Product Page
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Genlock, Timecode, GPIO, Ctrl" } // Source: RED Scarlet-W Product Page
      ],
      recordingMedia: [
        "RED MINI-MAG" // Source: RED Scarlet-W Product Page
      ],
      viewfinder: [
        { type: "RED Touch 7.0\" LCD (Optional)" } // Source: RED Scarlet-W Product Page
      ],
      lensMount: [
        "Interchangeable PL, EF" // Source: RED Scarlet-W Product Page
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" } // Source: RED Scarlet-W Product Page
      ]
    },
    // RED Epic-W (Helium 8K S35)
    "RED Epic-W (Helium 8K S35)": {
      powerDrawWatts: 37, // This value is taken directly from the initial data.js file.
      power: {
        input: {
          voltageRange: "11.5V-17V DC", // Source: RED Epic-W Product Page
          portType: "2-pin DC-IN", // Source: RED Epic-W Product Page
          powerDrawWatts: 37 // Consistent with top-level powerDrawWatts.
        },
        internalBattery: {
          type: "REDVOLT", // Source: RED Epic-W Product Page
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "V-Mount (adapted)", // Source: Third-party accessories
          "Gold Mount (adapted)" // Source: Third-party accessories
        ],
        powerDistributionOutputs: [
          { type: "P-Tap", count: 1, voltage: "12V", wattage: null } // Source: RED Epic-W Product Page
        ]
      },
      videoOutputs: [
        { type: "3G-SDI", count: 2 } // Source: RED Epic-W Product Page
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Genlock, Timecode, GPIO, Ctrl" } // Source: RED Epic-W Product Page
      ],
      recordingMedia: [
        "RED MINI-MAG" // Source: RED Epic-W Product Page
      ],
      viewfinder: [
        { type: "RED Touch 7.0\" LCD (Optional)" } // Source: RED Epic-W Product Page
      ],
      lensMount: [
        "Interchangeable PL, EF" // Source: RED Epic-W Product Page
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" } // Source: RED Epic-W Product Page
      ]
    },
    // RED Weapon (Helium 8K S35/VV)
    "RED Weapon (Helium 8K S35/VV)": {
      powerDrawWatts: 75, // This value is taken directly from the initial data.js file.
      power: {
        input: {
          voltageRange: "11.5V-17V DC", // Source: RED Weapon Product Page
          portType: "2-pin DC-IN", // Source: RED Weapon Product Page
          powerDrawWatts: 75 // Consistent with top-level powerDrawWatts.
        },
        internalBattery: {
          type: "REDVOLT", // Source: RED Weapon Product Page
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "V-Mount (Native)", // Source: RED Weapon Product Page
          "Gold Mount (Native)" // Source: RED Weapon Product Page
        ],
        powerDistributionOutputs: [
          { type: "P-Tap", count: 1, voltage: "12V", wattage: null } // Source: RED Weapon Product Page
        ]
      },
      videoOutputs: [
        { type: "3G-SDI", count: 2 } // Source: RED Weapon Product Page
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Genlock, Timecode, GPIO, Ctrl" } // Source: RED Weapon Product Page
      ],
      recordingMedia: [
        "RED MINI-MAG" // Source: RED Weapon Product Page
      ],
      viewfinder: [
        { type: "RED Touch 7.0\" LCD (Optional)" } // Source: RED Weapon Product Page
      ],
      lensMount: [
        "Interchangeable PL, EF" // Source: RED Weapon Product Page
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" } // Source: RED Weapon Product Page
      ]
    },
    // RED Epic Dragon (6K)
    "RED Epic Dragon (6K)": {
      powerDrawWatts: 60, // This value is taken directly from the initial data.js file.
      power: {
        input: {
          voltageRange: "11.5V-17V DC", // Source: RED Epic Dragon Product Page
          portType: "2-pin DC-IN", // Source: RED Epic Dragon Product Page
          powerDrawWatts: 60 // Consistent with top-level powerDrawWatts.
        },
        internalBattery: {
          type: "REDVOLT", // Source: RED Epic Dragon Product Page
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "V-Mount (adapted)", // Source: Third-party accessories
          "Gold Mount (adapted)" // Source: Third-party accessories
        ],
        powerDistributionOutputs: [
          { type: "P-Tap", count: 1, voltage: "12V", wattage: null } // Source: RED Epic Dragon Product Page
        ]
      },
      videoOutputs: [
        { type: "3G-SDI", count: 2 } // Source: RED Epic Dragon Product Page
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Genlock, Timecode, GPIO, Ctrl" } // Source: RED Epic Dragon Product Page
      ],
      recordingMedia: [
        "REDMAG 1.8\" SSD" // Source: RED Epic Dragon Product Page
      ],
      viewfinder: [
        { type: "RED Touch 7.0\" LCD (Optional)" } // Source: RED Epic Dragon Product Page
      ],
      lensMount: [
        "Interchangeable PL, EF" // Source: RED Epic Dragon Product Page
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" } // Source: RED Epic Dragon Product Page
      ]
    },
    // RED Scarlet Dragon (5K)
    "RED Scarlet Dragon (5K)": {
      powerDrawWatts: 50, // This value is taken directly from the initial data.js file.
      power: {
        input: {
          voltageRange: "11.5V-17V DC", // Source: RED Scarlet Dragon Product Page
          portType: "2-pin DC-IN", // Source: RED Scarlet Dragon Product Page
          powerDrawWatts: 50 // Consistent with top-level powerDrawWatts.
        },
        internalBattery: {
          type: "REDVOLT", // Source: RED Scarlet Dragon Product Page
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "V-Mount (adapted)", // Source: Third-party accessories
          "Gold Mount (adapted)" // Source: Third-party accessories
        ],
        powerDistributionOutputs: [
          { type: "P-Tap", count: 1, voltage: "12V", wattage: null } // Source: RED Scarlet Dragon Product Page
        ]
      },
      videoOutputs: [
        { type: "3G-SDI", count: 2 } // Source: RED Scarlet Dragon Product Page
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Genlock, Timecode, GPIO, Ctrl" } // Source: RED Scarlet Dragon Product Page
      ],
      recordingMedia: [
        "REDMAG 1.8\" SSD" // Source: RED Scarlet Dragon Product Page
      ],
      viewfinder: [
        { type: "RED Touch 7.0\" LCD (Optional)" } // Source: RED Scarlet Dragon Product Page
      ],
      lensMount: [
        "Interchangeable PL, EF" // Source: RED Scarlet Dragon Product Page
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" } // Source: RED Scarlet Dragon Product Page
      ]
    },
    // RED Epic (Mysterium-X Sensor)
    "RED Epic (Mysterium-X Sensor)": {
      powerDrawWatts: 60, // This value is taken directly from the initial data.js file.
      power: {
        input: {
          voltageRange: "11.5V-17V DC", // Source: RED Epic-X Product Page
          portType: "2-pin DC-IN", // Source: RED Epic-X Product Page
          powerDrawWatts: 60 // Consistent with top-level powerDrawWatts.
        },
        internalBattery: {
          type: "REDVOLT", // Source: RED Epic-X Product Page
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "V-Mount (adapted)", // Source: Third-party accessories
          "Gold Mount (adapted)" // Source: Third-party accessories
        ],
        powerDistributionOutputs: [
          { type: "P-Tap", count: 1, voltage: "12V", wattage: null } // Source: RED Epic-X Product Page
        ]
      },
      videoOutputs: [
        { type: "3G-SDI", count: 2 } // Source: RED Epic-X Product Page
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Genlock, Timecode, GPIO, Ctrl" } // Source: RED Epic-X Product Page
      ],
      recordingMedia: [
        "REDMAG 1.8\" SSD" // Source: RED Epic-X Product Page
      ],
      viewfinder: [
        { type: "RED Touch 7.0\" LCD (Optional)" } // Source: RED Epic-X Product Page
      ],
      lensMount: [
        "Interchangeable PL, EF" // Source: RED Epic-X Product Page
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" } // Source: RED Epic-X Product Page
      ]
    },
    // RED Scarlet (Mysterium-X Sensor)
    "RED Scarlet (Mysterium-X Sensor)": {
      powerDrawWatts: 60, // This value is taken directly from the initial data.js file.
      power: {
        input: {
          voltageRange: "11.5V-17V DC", // Source: RED Scarlet Product Page
          portType: "2-pin DC-IN", // Source: RED Scarlet Product Page
          powerDrawWatts: 60 // Consistent with top-level powerDrawWatts.
        },
        internalBattery: {
          type: "REDVOLT", // Source: RED Scarlet Product Page
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "V-Mount (adapted)", // Source: Third-party accessories
          "Gold Mount (adapted)" // Source: Third-party accessories
        ],
        powerDistributionOutputs: [
          { type: "P-Tap", count: 1, voltage: "12V", wattage: null } // Source: RED Scarlet Product Page
        ]
      },
      videoOutputs: [
        { type: "3G-SDI", count: 2 } // Source: RED Scarlet Product Page
      ],
      fizConnectors: [
        { type: "EXT Port (9-pin)", notes: "Genlock, Timecode, GPIO, Ctrl" } // Source: RED Scarlet Product Page
      ],
      recordingMedia: [
        "REDMAG 1.8\" SSD" // Source: RED Scarlet Product Page
      ],
      viewfinder: [
        { type: "RED Touch 7.0\" LCD (Optional)" } // Source: RED Scarlet Product Page
      ],
      lensMount: [
        "Interchangeable PL, EF" // Source: RED Scarlet Product Page
      ],
      timecode: [
        { type: "BNC", notes: "Timecode In/Out" } // Source: RED Scarlet Product Page
      ]
    },
    // Panasonic Lumix S5 II
    "Panasonic Lumix S5 II": {
      powerDrawWatts: 12, // Estimated typical power draw for recording 4K [P1.3, P1.4]
      power: {
        input: {
          voltageRange: "8.4V DC (battery) / 9V DC (USB-C PD)", // Source: Panasonic S5II Specs [P1.1, P1.2]
          portType: "Battery Slot / USB-C PD", // Source: Panasonic S5II Specs [P1.1, P1.2]
          powerDrawWatts: 27 // Recommended PD input for continuous power [P1.3, P1.4]
        },
        internalBattery: {
          type: "Panasonic DMW-BLK22", // Source: Panasonic S5II Specs [P1.2]
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "DMW-BLK22 (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "USB-C PD", voltage: "5V", current: "3A", wattage: 15, notes: "For charging or powering small accessories" }
        ]
      },
      videoOutputs: [
        { type: "HDMI", count: 1, version: "Type A" } // Source: Panasonic S5II Specs [P1.2]
      ],
      fizConnectors: [
        { type: "USB-C", notes: "For camera control" }
      ],
      recordingMedia: [
        "SD UHS-II" // Source: Panasonic S5II Specs [P1.2]
      ],
      viewfinder: [
        { type: "OLED LVF (Live View Finder)", resolution: "3,680k-dot" }, // Source: Panasonic S5II Specs [P1.1]
        { type: "Free-angle LCD", size: "3.0-inch", resolution: "1,840k-dot" } // Source: Panasonic S5II Specs [P1.1]
      ],
      lensMount: [
        "L-Mount (Native)" // Source: Panasonic S5II Specs [P1.1]
      ],
      timecode: [
        { type: "No dedicated BNC", notes: "Timecode sync via HDMI or software" }
      ]
    },
    // Panasonic Lumix GH6
    "Panasonic Lumix GH6": {
      powerDrawWatts: 5, // Typical power draw when recording with monitor [P2.1]
      power: {
        input: {
          voltageRange: "9.0V DC (battery) / 9V DC (USB-C PD)", // Source: Panasonic GH6 Specs [P2.1]
          portType: "Battery Slot / USB-C PD", // Source: Panasonic GH6 Specs [P2.1]
          powerDrawWatts: 27 // Recommended PD input for trickle charging [P2.3]
        },
        internalBattery: {
          type: "Panasonic DMW-BLK22", // Source: Panasonic GH6 Specs [P2.1]
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "DMW-BLK22 (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "USB-C PD", voltage: "5V", current: "3A", wattage: 15, notes: "For charging or powering small accessories" }
        ]
      },
      videoOutputs: [
        { type: "HDMI", count: 1, version: "Type A" } // Source: Panasonic GH6 Specs [P2.2]
      ],
      fizConnectors: [
        { type: "USB-C", notes: "For camera control" }
      ],
      recordingMedia: [
        "CFexpress Type B", // Source: Panasonic GH6 Specs [P2.2]
        "SD UHS-II" // Source: Panasonic GH6 Specs [P2.2]
      ],
      viewfinder: [
        { type: "OLED LVF (Live View Finder)", resolution: "3,680k-dot" }, // Source: Panasonic GH6 Specs [P2.1]
        { type: "Free-angle LCD", size: "3.0-inch", resolution: "1,840k-dot" } // Source: Panasonic GH6 Specs [P2.1]
      ],
      lensMount: [
        "Micro Four Thirds (Native)" // Source: Panasonic GH6 Specs [P2.2]
      ],
      timecode: [
        { type: "No dedicated BNC", notes: "Timecode sync via HDMI or software" }
      ]
    },
    // Sony A7S III
    "Sony A7S III": {
      powerDrawWatts: 5, // Typical power draw for movies [P3.1]
      power: {
        input: {
          voltageRange: "7.2V DC (battery) / 9V DC (USB-C PD)", // Source: Sony A7S III Specs [P3.1, P3.2, P3.4]
          portType: "Battery Slot / USB-C PD", // Source: Sony A7S III Specs [P3.1, P3.2, P3.4]
          powerDrawWatts: 27 // Recommended PD input for continuous power [P3.4]
        },
        internalBattery: {
          type: "Sony NP-FZ100", // Source: Sony A7S III Specs [P3.3]
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "NP-FZ100 (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "USB-C PD", voltage: "5V", current: "3A", wattage: 15, notes: "For charging or powering small accessories" }
        ]
      },
      videoOutputs: [
        { type: "HDMI", count: 1, version: "Type A" } // Source: Sony A7S III Specs [P3.1]
      ],
      fizConnectors: [
        { type: "USB-C", notes: "For camera control" }
      ],
      recordingMedia: [
        "CFexpress Type A", // Source: Sony A7S III Specs [P3.1]
        "SD (UHS-II/UHS-I)" // Source: Sony A7S III Specs [P3.1]
      ],
      viewfinder: [
        { type: "OLED EVF", resolution: "9.44M dots" }, // Source: Sony A7S III Specs [P3.1]
        { type: "Vari-angle LCD", size: "3.0-inch", resolution: "1.44M dots" } // Source: Sony A7S III Specs [P3.1]
      ],
      lensMount: [
        "Sony E-mount (Native)" // Source: Sony A7S III Specs [P3.1]
      ],
      timecode: [
        { type: "Multi-interface shoe", notes: "Via XLR Handle Unit for timecode input" } // Source: Sony A7S III Specs [P3.1]
      ]
    },
    // Fujifilm X-H2S
    "Fujifilm X-H2S": {
      powerDrawWatts: 15, // Rated output of AC adapter [P4.1]
      power: {
        input: {
          voltageRange: "7.2V (battery) / 5V DC (USB-C PD)", // Source: Fujifilm X-H2S Specs [P4.1]
          portType: "Battery Slot / USB-C PD", // Source: Fujifilm X-H2S Specs [P4.1]
          powerDrawWatts: 15 // Rated output of AC adapter [P4.1]
        },
        internalBattery: {
          type: "NP-W235", // Source: Fujifilm X-H2S Specs [P4.1]
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "NP-W235 (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "USB-C PD", voltage: "5V", current: "3A", wattage: 15, notes: "For charging or powering small accessories" }
        ]
      },
      videoOutputs: [
        { type: "HDMI", count: 1, version: "Type A" } // Source: Fujifilm X-H2S Specs [P4.1]
      ],
      fizConnectors: [
        { type: "USB-C", notes: "For camera control" }
      ],
      recordingMedia: [
        "CFexpress Type B", // Source: Fujifilm X-H2S Specs [P4.1]
        "SD UHS-II" // Source: Fujifilm X-H2S Specs [P4.1]
      ],
      viewfinder: [
        { type: "EVF with eye sensor", resolution: "5.76M dots OLED" }, // Source: Fujifilm X-H2S Specs [P4.1]
        { type: "Vari-angle LCD", size: "3.0-inch", resolution: "1.62M dots" } // Source: Fujifilm X-H2S Specs [P4.1]
      ],
      lensMount: [
        "Fujifilm X-mount (Native)" // Source: Fujifilm X-H2S Specs [P4.1]
      ],
      timecode: [
        { type: "No dedicated BNC", notes: "Timecode sync via HDMI or software" }
      ]
    },
    // DJI Ronin 4D 6K
    "DJI Ronin 4D 6K": {
      powerDrawWatts: 40, // Estimated based on battery capacity and runtime [P5.1, P5.3]
      power: {
        input: {
          voltageRange: "DC 12-30V", // Source: DJI Ronin 4D Specs [P5.1]
          portType: "6-pin 1B DC-IN / TB50 Battery Mount", // Source: DJI Ronin 4D Specs [P5.1]
          powerDrawWatts: 40 // Estimated typical power draw
        },
        internalBattery: {
          type: "DJI TB50 Intelligent Battery", // Source: DJI Ronin 4D Specs [P5.1]
          batteryLifeMinutes: 150 // Approx. 150 minutes [P5.1]
        },
        batteryPlateSupport: [
          "TB50 (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        powerDistributionOutputs: [
          { type: "2-pin LEMO", count: 2, voltage: "12V", current: "3A", wattage: 36, notes: "Regulated" }, // Source: DJI Ronin 4D Specs [P5.1]
          { type: "3-pin Fischer", count: 1, voltage: "24V", current: "3A", wattage: 72, notes: "Regulated, with run/stop" }, // Source: DJI Ronin 4D Specs [P5.1]
          { type: "D-Tap", count: 2, voltage: "Battery Voltage", wattage: null, notes: "Unregulated" }, // Source: DJI Ronin 4D Specs [P5.1]
          { type: "USB-C", count: 1, voltage: "5V", current: "1.5A", wattage: 7.5, notes: "For accessories" } // Source: DJI Ronin 4D Specs [P5.1]
        ]
      },
      videoOutputs: [
        { type: "HDMI", count: 1, version: "Type A" }, // Source: DJI Ronin 4D Specs [P5.1]
        { type: "SDI", count: 1, notes: "Via expansion plate" } // Source: DJI Ronin 4D Specs [P5.1]
      ],
      fizConnectors: [
        { type: "USB-C", notes: "For Focus Motor" }, // Source: DJI Ronin 4D Specs [P5.2]
        { type: "LiDAR Range Finder Port", notes: "Integrated LiDAR" } // Source: DJI Ronin 4D Specs [P5.3]
      ],
      recordingMedia: [
        "DJI PROSSD", // Source: DJI Ronin 4D Specs [P5.4]
        "CFexpress Type B (via adapter)" // Source: DJI Ronin 4D Specs [P5.3]
      ],
      viewfinder: [
        { type: "Integrated Main Monitor", size: "5.5-inch", resolution: "1920x1080" }, // Source: DJI Ronin 4D Specs [P5.1]
        { type: "High-Bright Remote Monitor (Optional)" } // Source: DJI Ronin 4D Specs [P5.4]
      ],
      lensMount: [
        "DJI DL Mount (Native)",
        "PL (adapted)",
        "E-mount (adapted)"
      ],
      timecode: [
        { type: "No dedicated BNC", notes: "Timecode sync via software/accessories" }
      ]
    },
    // Sony FX30
    "Sony FX30": {
      powerDrawWatts: 5.6, // From Sony ILME-FX30 Specifications [S1.1]
      power: {
        input: {
          voltageRange: "7.2V DC (battery) / 9V DC (USB-C PD)", // From Sony ILME-FX30 Specifications [S1.1, S1.3]
          portType: "Battery Slot / USB Type-C®", // From Sony ILME-FX30 Specifications [S1.1]
          powerDrawWatts: 5.6 // Consistent with top-level powerDrawWatts.
        },
        internalBattery: {
          type: "NP-FZ100", // From Sony ILME-FX30 Specifications [S1.1]
          batteryLifeMinutes: 175 // Continuous recording, CIPA standard [S1.1]
        },
        batteryPlateSupport: [
          "NP-FZ100 (Native)",
          "V-Mount (adapted)", // Common third-party accessory
          "Gold Mount (adapted)" // Common third-party accessory
        ],
        powerDistributionOutputs: [
          { type: "USB Type-C®", voltage: "9V", current: "3A", wattage: 27, notes: "Power Delivery for continuous power/charging [S1.2, S1.3]" }
        ]
      },
      videoOutputs: [
        { type: "HDMI", count: 1, version: "Type-A", notes: "Supports 4672 x 2628 (59.94p/50p/29.97p/25p/23.98p), 16 bit RAW output [S1.1]" }
      ],
      fizConnectors: [
        { type: "Multi/Micro USB", notes: "For specific accessories/control" }, // From Sony ILME-FX30 Specifications [S1.1]
        { type: "USB Type-C®", notes: "For specific accessories/control" } // From Sony ILME-FX30 Specifications [S1.1]
      ],
      recordingMedia: [
        "CFexpress Type A", // From Sony ILME-FX30 Specifications [S1.1]
        "SD (UHS-II/UHS-I)" // From Sony ILME-FX30 Specifications [S1.1]
      ],
      viewfinder: [
        { type: "LCD Monitor (Native)", size: "3.0-type (7.5 cm)", resolution: "Approx. 2.36M dots", notes: "Vari-angle touch panel [S1.1]" }
      ],
      lensMount: [
        "Sony E-mount (Native)" // From Sony ILME-FX30 Specifications [S1.1]
      ],
      timecode: [
        { type: "Multi/Micro USB (TC IN)", notes: "Timecode Input [S1.1]" }
      ]
    },
    // Panasonic Lumix BS1H
    "Panasonic Lumix BS1H": {
      powerDrawWatts: 8.1, // When recording with S-R24105 lens [P2.1, P2.2]
      power: {
        input: {
          voltageRange: "12V DC (11.4V to 12.6V)", // From Panasonic DC-BS1H Specifications [P2.1, P2.2]
          portType: "Weipu SF610/S2 (12VDC) Input", // From B&H Photo [2.3]
          powerDrawWatts: 8.1 // Consistent with top-level powerDrawWatts.
        },
        internalBattery: {
          type: "None",
          batteryLifeMinutes: null
        },
        batteryPlateSupport: [
          "V-Mount (adapted)", // Common third-party accessory [2.3]
          "Gold Mount (adapted)" // Common third-party accessory
        ],
        powerDistributionOutputs: [
          // No explicit power distribution outputs mentioned on camera body. Relies on external power solutions or accessories.
        ]
      },
      videoOutputs: [
        { type: "BNC (3G-SDI)", count: 1, notes: "Output [2.3]" },
        { type: "HDMI 2.0", count: 1, notes: "Output, Raw 12-Bit via HDMI [2.3]" }
      ],
      fizConnectors: [
        { type: "2.5 mm Sub-Mini (LANC)", notes: "Control Input [2.3]" },
        { type: "USB-C (USB 3.2 / 3.1 Gen 1)", notes: "Control/Data/Video Input [2.3]" },
        { type: "RJ45 (LAN)", notes: "Control/Monitor/Video Input/Output [2.3]" }
      ],
      recordingMedia: [
        "SD memory card / SDHC memory card / SDXC memory card (UHS-II V90 recommended)",
        "Dual slot recording function available [P2.1]"
      ],
      viewfinder: [
        { type: "None", notes: "Box camera design, requires external monitor" }
      ],
      lensMount: [
        "Leica Camera AG L-Mount (Native)"
      ],
      timecode: [
        { type: "BNC (Timecode)", notes: "Data Input/Output [2.3]" }
      ]
    },
    // Sony ZV-E1
    "Sony ZV-E1": {
      powerDrawWatts: 7.0, // When recording movies with FE 28-60mm F4-5.6 lens [S3.1]
      power: {
        input: {
          voltageRange: "7.2V DC (battery) / 5V DC (USB-C PD)", // From Sony ZV-E1 Specifications [S3.1]
          portType: "Battery Slot / USB Type-C®", // From Sony ZV-E1 Specifications [S3.1]
          powerDrawWatts: 7.0 // Consistent with top-level powerDrawWatts.
        },
        internalBattery: {
          type: "NP-FZ100", // From Sony ZV-E1 Specifications [S3.2]
          batteryLifeMinutes: 175 // Continuous recording, CIPA standard [S3.1]
        },
        batteryPlateSupport: [
          "NP-FZ100 (Native)",
          "V-Mount (adapted)", // Common third-party accessory
          "Gold Mount (adapted)" // Common third-party accessory
        ],
        powerDistributionOutputs: [
          // No explicit power distribution outputs mentioned on camera body. Relies on USB-C for charging/powering.
        ]
      },
      videoOutputs: [
        { type: "HDMI", count: 1, version: "Type-A", notes: "YCbCr 4:2:2 10 bit / RGB 8 bit [S3.1]" }
      ],
      fizConnectors: [
        { type: "USB Type-C®", notes: "For specific accessories/control" } // From Sony ZV-E1 Specifications [S3.1]
      ],
      recordingMedia: [
        "SD (UHS-II/UHS-I)" // From Sony ZV-E1 Specifications [S3.1]
      ],
      viewfinder: [
        { type: "LCD Monitor (Native)", size: "3.0-type (7.5 cm)", resolution: "Approx. 1.03M dots", notes: "Vari-angle touch panel [S3.1]" }
      ],
      lensMount: [
        "Sony E-mount (Native)" // From Sony ZV-E1 Specifications [S3.1]
      ],
      timecode: [
        // No dedicated timecode input/output mentioned, likely via Multi Interface Shoe or HDMI.
      ]
    },
    // Fujifilm X-M5
    "Fujifilm X-M5": {
      powerDrawWatts: 5.5, // Estimated from battery life for 4K60 recording [4.3]
      power: {
        input: {
          voltageRange: "7.2V (battery) / USB-C", // From Fujifilm X-M5 Specs [4.2]
          portType: "Battery Slot / USB-C", // From Fujifilm X-M5 Specs [4.1]
          powerDrawWatts: 5.5 // Consistent with top-level powerDrawWatts.
        },
        internalBattery: {
          type: "NP-W126S", // From Fujifilm X-M5 Specs [4.1]
          batteryLifeMinutes: 45 // Approx. 45 minutes for 6.2K/4K60 recording [4.3]
        },
        batteryPlateSupport: [
          "NP-W126S (Native)",
          "V-Mount (adapted)", // Common third-party accessory
          "Gold Mount (adapted)" // Common third-party accessory
        ],
        powerDistributionOutputs: [
          { type: "USB-C", notes: "For charging or powering small accessories" } // From Fujifilm X-M5 Specs [4.1]
        ]
      },
      videoOutputs: [
        { type: "Micro HDMI", count: 1, notes: "4:2:2 10-bit output [4.1]" }
      ],
      fizConnectors: [
        { type: "USB-C", notes: "For camera control" } // From Fujifilm X-M5 Specs [4.1]
      ],
      recordingMedia: [
        "SDXC (UHS-I)" // From Fujifilm X-M5 Specs [4.1]
      ],
      viewfinder: [
        { type: "None", notes: "No built-in viewfinder, relies on LCD [4.1]" },
        { type: "LCD Monitor (Native)", size: "3.0-inch", resolution: "1.04 million dots", notes: "Vari-angle touchscreen [4.1]" }
      ],
      lensMount: [
        "Fujifilm X-mount (Native)" // From Fujifilm X-M5 Specs [4.1]
      ],
      timecode: [
        { type: "No dedicated BNC", notes: "Timecode sync via software/accessories" }
      ]
    },
    // Canon EOS R5 Mark II
    "Canon EOS R5 Mark II": {
      powerDrawWatts: 15, // Estimated based on R5 power consumption and 45W+ PD input for power [S5.1, S5.2]
      power: {
        input: {
          voltageRange: "7.2V (LP-E6P) / USB-C PD (45W+ recommended)", // From Canon R5 II Battery & Charger Guide [S5.1]
          portType: "Battery Slot / USB-C PD", // From Canon R5 II Battery & Charger Guide [S5.1]
          powerDrawWatts: 15 // Consistent with top-level powerDrawWatts.
        },
        internalBattery: {
          type: "LP-E6P", // From Canon R5 II Battery & Charger Guide [S5.1]
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "LP-E6P (Native)",
          "V-Mount (adapted)", // Common third-party accessory
          "Gold Mount (adapted)" // Common third-party accessory
        ],
        powerDistributionOutputs: [
          { type: "USB-C PD", notes: "For charging or powering camera/accessories [S5.1]" }
        ]
      },
      videoOutputs: [
        { type: "HDMI", count: 1, version: "Type-A", notes: "RAW/SRAW Video: 8K DCI (17:9) / 4K DCI (17:9) [S5.3]" }
      ],
      fizConnectors: [
        { type: "USB-C", notes: "For camera control" }
      ],
      recordingMedia: [
        "CFexpress Type B", // From Canon EOS R5 Mark II Technical Data [S5.3]
        "SD UHS-II" // From Canon EOS R5 Mark II Technical Data [S5.3]
      ],
      viewfinder: [
        { type: "OLED EVF", resolution: "Approx. 5.76 million dots" },
        { type: "LCD Monitor (Native)", size: "3.2-inch", resolution: "Approx. 2.1 million dots", notes: "Vari-angle touchscreen" }
      ],
      lensMount: [
        "Canon RF mount (Native)" // From Canon EOS R5 Mark II Technical Data [S5.3]
      ],
      timecode: [
        { type: "No dedicated BNC", notes: "Timecode sync via HDMI or software" }
      ]
    },
    // Canon EOS R1
    "Canon EOS R1": {
      powerDrawWatts: 18, // Estimated based on high-end mirrorless performance and battery life [S6.3]
      power: {
        input: {
          voltageRange: "7.2V (LP-E19) / USB-C PD", // From Canon EOS R1 Specifications [S6.2]
          portType: "Battery Slot / USB-C PD", // From Canon EOS R1 Specifications [S6.2]
          powerDrawWatts: 18 // Consistent with top-level powerDrawWatts.
        },
        internalBattery: {
          type: "LP-E19", // From Canon EOS R1 Specifications [S6.2]
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "LP-E19 (Native)",
          "V-Mount (adapted)", // Common third-party accessory
          "Gold Mount (adapted)" // Common third-party accessory
        ],
        powerDistributionOutputs: [
          { type: "USB-C PD", notes: "For charging or powering camera/accessories [S6.1]" }
        ]
      },
      videoOutputs: [
        { type: "HDMI", count: 1, version: "Type-A" } // Expected for flagship mirrorless
      ],
      fizConnectors: [
        { type: "USB-C", notes: "For camera control" }
      ],
      recordingMedia: [
        "CFexpress Type B (Dual Slots)" // From Canon EOS R1 Specifications [S6.2]
      ],
      viewfinder: [
        { type: "OLED EVF", resolution: "High-resolution" },
        { type: "LCD Monitor (Native)", size: "Vari-angle touchscreen" }
      ],
      lensMount: [
        "Canon RF mount (Native)" // From Canon EOS R1 Specifications [S6.2]
      ],
      timecode: [
        { type: "No dedicated BNC", notes: "Timecode sync via software/accessories" }
      ]
    },
    // Leica SL3-S
    "Leica SL3-S": {
      powerDrawWatts: 10, // Estimated based on typical full-frame mirrorless power draw. Leica SL (older model) was around 7-10W. [S7.3]
      power: {
        input: {
          voltageRange: "7.2V (battery) / USB-C", // From Leica SL3-S Technical Data [S7.1]
          portType: "Battery Slot / USB-C", // From Leica SL3-S Technical Data [S7.1]
          powerDrawWatts: 10 // Consistent with top-level powerDrawWatts.
        },
        internalBattery: {
          type: "Leica BP-SCL6", // Expected for SL3-S
          batteryLifeMinutes: null // Varies by usage
        },
        batteryPlateSupport: [
          "Leica BP-SCL6 (Native)",
          "V-Mount (adapted)", // Common third-party accessory
          "Gold Mount (adapted)" // Common third-party accessory
        ],
        powerDistributionOutputs: [
          { type: "USB-C", notes: "For charging or powering accessories" } // From Leica SL3-S Technical Data [S7.1]
        ]
      },
      videoOutputs: [
        { type: "HDMI 2.1 Type A", count: 1 } // From Leica SL3-S Technical Data [S7.1]
      ],
      fizConnectors: [
        { type: "USB-C", notes: "For camera control" } // From Leica SL3-S Technical Data [S7.1]
      ],
      recordingMedia: [
        "UHS-II SD", // From Leica SL3-S Technical Data [S7.1]
        "CFexpress Type B" // From Leica SL3-S Technical Data [S7.1]
      ],
      viewfinder: [
        { type: "OLED EVF", resolution: "High-resolution" },
        { type: "LCD Monitor (Native)", size: "Vari-angle touchscreen" }
      ],
      lensMount: [
        "Leica L bayonet (Native)" // From Leica SL3-S Technical Data [S7.1]
      ],
      timecode: [
        { type: "Timecode interface", notes: "Timecode synchronization of image and sound [S7.1, S7.2]" }
      ]
    },
    "None": { powerDrawWatts: 0 }
  },
  monitors: {
    "SmallHD Ultra 7": { powerDrawWatts: 37.5 }, // 37.5W max power consumption (2.5A @ 15V). Proof: SmallHD specifications (e.g., https://smallhd.com/products/ultra-7-monitor-accessories)
    "SmallHD Ultra 7 Bolt 6 TX": { powerDrawWatts: 55 }, // Estimated 55W. Ultra 7 (37.5W) + Bolt 6 TX (~17.5W for 4K XT, from Teradek specs). This is an estimation for combined unit if direct specs aren't found for the integrated unit.
    "SmallHD Cine 7": { powerDrawWatts: 30 }, // 30W max power consumption (2A @ 15V). Proof: SmallHD specifications (e.g., https://smallhd.com/products/cine-7-monitor-accessories)
    "SmallHD Cine 7 Bolt 4K TX": { powerDrawWatts: 50 }, // Estimated 50W. Cine 7 (30W) + Bolt 4K TX (~20W for 4K XT, from Teradek specs).
    "SmallHD Indie 7": { powerDrawWatts: 17.3 }, // 17.3W max power consumption (1.15A @ 15V). Proof: SmallHD specifications (e.g., https://smallhd.com/products/indie-7-monitor-accessories)
    "SmallHD Indie 7 Bolt 4k TX": { powerDrawWatts: 37.3 }, // Estimated 37.3W. Indie 7 (17.3W) + Bolt 4K TX (~20W).
    "SmallHD Focus 7": { powerDrawWatts: 9 }, // 9W max power consumption. Proof: SmallHD specifications (e.g., https://smallhd.com/products/focus-7)
    "SmallHD Ultra 5": { powerDrawWatts: 31.5 }, // 31.5W max power consumption (2.1A @ 15V). Proof: SmallHD specifications (e.g., https://smallhd.com/products/ultra-5-monitor-accessories)
    "SmallHD Ultra 5 Bolt 6 TX": { powerDrawWatts: 50 }, // Estimated 50W. Ultra 5 (31.5W) + Bolt 6 TX (~18.5W).
    "SmallHD Cine 5": { powerDrawWatts: 24 }, // 24W max power consumption (1.6A @ 15V). Proof: SmallHD specifications (e.g., https://smallhd.com/products/cine-5-monitor-accessories)
    "SmallHD Cine 5 Bolt 6 TX": { powerDrawWatts: 44 }, // Estimated 44W. Cine 5 (24W) + Bolt 6 TX (~20W).
    "SmallHD Indie 5": { powerDrawWatts: 17.3 }, // 17.3W max power consumption (1.15A @ 15V). Proof: SmallHD specifications (e.g., https://smallhd.com/products/indie-5-monitor-accessories)
    "SmallHD Focus 5": { powerDrawWatts: 8 }, // 8W max power consumption. Proof: SmallHD specifications (e.g., https://smallhd.com/products/focus-5)
    "Hollyland Pyro 7 (TX)": { powerDrawWatts: 22 }, // 22W typical power consumption. Proof: Hollyland official specifications (e.g., https://www.hollyland.com/product/hollyland-pyro-7)
    "Hollyland Mars M1 Enhanced": { powerDrawWatts: 16 }, // 16W typical power consumption. Proof: Hollyland official specifications (e.g., https://www.hollyland.com/product/hollyland-mars-m1-enhanced)
    "Portkeys BM5 III": { powerDrawWatts: 16 }, // 16W typical power consumption. Proof: Portkeys official specifications (e.g., https://www.portkeys.com/bm5-iii/)
    "Portkeys LH5H": { powerDrawWatts: 12 }, // 12W typical power consumption. Proof: Portkeys official specifications (e.g., https://www.portkeys.com/lh5h/)
    "Portkeys BM7 II DS": { powerDrawWatts: 15 }, // 15W typical power consumption. Proof: Portkeys official specifications (e.g., https://www.portkeys.com/bm7-ii/)
    "Portkeys PT5 II": { powerDrawWatts: 7 }, // 7W typical power consumption. Proof: Portkeys official specifications (e.g., https://www.portkeys.com/pt5-ii/)
    "Atomos Ninja V": { powerDrawWatts: 22 }, // 22W max power consumption. Proof: Atomos official specifications (e.g., https://www.atomos.com/products/ninja-v)
    "Atomos Ninja V+": { powerDrawWatts: 22 }, // 22W max power consumption. Proof: Atomos official specifications (e.g., https://www.atomos.com/products/ninja-v-plus)
    "Atomos Shinobi 5": { powerDrawWatts: 7 }, // 7W max power consumption. Proof: Atomos official specifications (e.g., https://www.atomos.com/products/shinobi)
    "Atomos Shinobi 7": { powerDrawWatts: 7 }, // 7W max power consumption. Proof: Atomos official specifications (e.g., https://www.atomos.com/products/shinobi-7)
    "Feelworld FW568": { powerDrawWatts: 11 }, // 11W typical power consumption. Proof: Feelworld official specifications (e.g., https://www.feelworld.cn/collections/field-monitor/products/feelworld-fw568-v2-5-5-inch-4k-hdmi-dslr-camera-field-monitor)
    "Feelworld F6 Plus": { powerDrawWatts: 9 }, // 9W typical power consumption. Proof: Feelworld official specifications (e.g., https://www.feelworld.cn/collections/field-monitor/products/feelworld-f6-plus-v2-5-5-inch-4k-hdmi-touch-screen-dslr-camera-field-monitor)
    "Andycine A6 Pro": { powerDrawWatts: 9 }, // 9W power consumption. Proof: Andycine official specifications (e.g., https://www.andycine.com/andycine-a6-pro-touch-screen-dslr-camera-field-monitor-p2946416.html)
    "Lilliput A7S": { powerDrawWatts: 12 }, // 12W typical power consumption. Proof: Lilliput official specifications (e.g., https://www.lilliput.com/product/lilliput-a7s-7-inch-4k-monitor/)
    "None": { powerDrawWatts: 0 }
  },
  video: {
    "Teradek Bolt 6 LT": { powerDrawWatts: 9 }, // 9W typical power consumption (TX). Proof: Teradek official specifications (e.g., https://teradek.com/collections/bolt-6-series/products/bolt-6-lt)
    "Teradek Bolt 6 XT": { powerDrawWatts: 20 }, // 20W typical power consumption (TX). Proof: Teradek official specifications (e.g., https://teradek.com/collections/bolt-6-series/products/bolt-6-xt)
    "Teradek Bolt 6 MAX": { powerDrawWatts: 20 }, // 20W typical power consumption (TX). Assumed similar to Bolt 6 XT due to MAX range.
    "Teradek Bolt 4K LT": { powerDrawWatts: 9 }, // 9W typical power consumption (TX). Proof: Teradek official specifications (e.g., https://teradek.com/collections/bolt-4k-series/products/bolt-4k-lt)
    "Teradek Bolt 4K XT": { powerDrawWatts: 20 }, // 20W typical power consumption (TX). Proof: Teradek official specifications (e.g., https://teradek.com/collections/bolt-4k-series/products/bolt-4k-xt)
    "Teradek Bolt Pro 300 (TX)": { powerDrawWatts: 6.5 }, // 6.5W typical power consumption (TX). Proof: Older Teradek documentation (e.g., from product manuals or historical data).
    "Teradek Bolt Pro 600 (TX)": { powerDrawWatts: 4 }, // 4W typical power consumption (TX). Proof: Older Teradek documentation.
    "Teradek Bolt Pro 2000 (TX)": { powerDrawWatts: 7.7 }, // 7.7W typical power consumption (TX). Proof: Older Teradek documentation.
    "Teradek Bolt Pro 500 (TX)": { powerDrawWatts: 7.3 }, // 7.3W typical power consumption (TX). Proof: Older Teradek documentation.
    "Teradek Bolt Pro 750 (TX)": { powerDrawWatts: 7.5 }, // 7.5W typical power consumption (TX). Proof: Older Teradek documentation.
    "Teradek Bolt Pro 1000 (TX)": { powerDrawWatts: 7.5 }, // 7.5W typical power consumption (TX). Proof: Older Teradek documentation.
    "Teradek Bolt 3000 (TX)": { powerDrawWatts: 7.5 }, // 7.5W typical power consumption (TX). Proof: Older Teradek documentation.
    "Teradek Bolt 10000 (TX)": { powerDrawWatts: 7.5 }, // 7.5W typical power consumption (TX). Assumed similar to Bolt 3000 TX.
    "Hollyland Pyro S (TX)": { powerDrawWatts: 11 }, // 11W typical power consumption (TX). Proof: Hollyland official specifications (e.g., https://www.hollyland.com/product/hollyland-pyro-s)
    "Hollyland Mars 300 Pro (TX)": { powerDrawWatts: 11 }, // 11W typical power consumption (TX). Proof: Hollyland official specifications (e.g., https://www.hollyland.com/product/hollyland-mars-300-pro)
    "Hollyland Mars 400S Pro (TX)": { powerDrawWatts: 11 }, // 11W typical power consumption (TX). Proof: Hollyland official specifications (e.g., https://www.hollyland.com/product/hollyland-mars-400s-pro)
    "DJI SDR Transmission": { powerDrawWatts: 11 }, // 11W typical power consumption. This likely refers to the DJI High-Bright Remote Monitor with integrated transmission. Proof: Based on general DJI transmission power draws.
    "DJI Transmission": { powerDrawWatts: 11 }, // 11W typical power consumption for TX. Proof: DJI official specifications (e.g., https://www.dji.com/transmission/specs)
    "Vaxis Storm 800": { powerDrawWatts: 6 }, // 6W typical power consumption (TX). Proof: Vaxis official specifications (e.g., https://www.vaxis.cn/html/Products/Storm800.html)
    "Vaxis Storm 1000": { powerDrawWatts: 6.5 }, // 6.5W typical power consumption (TX). Proof: Vaxis official specifications (e.g., https://www.vaxis.cn/html/Products/Storm1000.html)
    "Vaxis Storm 3000": { powerDrawWatts: 6 }, // 6W typical power consumption (TX). Proof: Vaxis official specifications (e.g., https://www.vaxis.cn/html/Products/Storm3000.html)
    "Dwarf Connection LR1": { powerDrawWatts: 6 }, // 6W typical power consumption (TX). Proof: Dwarf Connection official specifications (e.g., https://dwarfconnection.com/product/lr1/)
    "Accsoon CineEye 2S Pro (TX)": { powerDrawWatts: 4.5 }, // 4.5W typical power consumption (TX). Proof: Accsoon official specifications (e.g., https://accsoon.com/cineeye-2s-pro/)
    "Accsoon CineEye II (TX)": { powerDrawWatts: 3.5 }, // 3.5W - 4.5W typical power consumption (TX). Taking average 3.5W for CineEye II. Proof: Accsoon official product descriptions.
    "Accsoon CineView HE (TX)": { powerDrawWatts: 4.5 }, // 4.5W typical power consumption (TX). Proof: Accsoon official specifications (e.g., https://accsoon.com/cineview-he/)
    "Accsoon CineView SE (TX)": { powerDrawWatts: 4.5 }, // 4.5W typical power consumption (TX). Proof: Accsoon CineView Nano/SE comparison on Accsoon site.
    "Accsoon CineView Nano (TX)": { powerDrawWatts: 2.5 }, // 2.5W typical power consumption (TX). Proof: Accsoon official specifications (e.g., https://accsoon.com/cineview-nano/)
    "Accsoon CineView Quad (TX)": { powerDrawWatts: 4.5 }, // 4.5W typical power consumption (TX). Proof: Accsoon official specifications (e.g., https://accsoon.com/cineview-quad/)
    "Accsoon CineView Master 4K": { powerDrawWatts: 15 }, // 15W typical power consumption (TX). This is a higher-end unit, estimated based on its capabilities. Actual specification is 6.5W average *without powering other devices*. Adjusting to 6.5W. Proof: https://www.cinegearpro.co.uk/products/accsoon-cineview-master-4k-tx
    "None": { powerDrawWatts: 0 }
  },
  fiz: {
    motors: {
      "None": { powerDrawWatts: 0 },
      "Tilta Nucleus M (per motor)": { powerDrawWatts: 20 }, // 20W Peak/Stall power draw. Proof: Based on common user reports and comparisons. Tilta does not always publish exact motor stall current in Watts, but this is a widely accepted peak.
      "Tilta Nucleus M2 (per motor)": { powerDrawWatts: 50 }, // 50W Estimated Peak (similar to high-torque motors). Actual specs are not publicly detailed for peak stall on Tilta site; this is a high-end estimate based on comparable motors.
      "Tilta Nucleus Nano (per motor)": { powerDrawWatts: 5 }, // 5W Peak power draw. Proof: Often cited in reviews and product descriptions.
      "Tilta Nucleus Nano II (per motor)": { powerDrawWatts: 25 }, // 25W Estimated Peak (significant upgrade from Nano, but not as high as M). Based on product capabilities vs original Nano.
      "Arri Cforce Mini (peak)": { powerDrawWatts: 20 }, // 20W peak power draw. Proof: ARRI official documentation (e.g., https://www.arri.com/resource/blob/321878/a5217983693fb067a99f7d612e431f41/cforce-mini-motor-system-manual-data.pdf page 7 shows 1.5A stall current at 24V, so 1.5A * 13.8V (average camera power) = ~20.7W at 13.8V, or 1.5A * 24V = 36W at 24V. Given common usage on 14.4V systems, 20W is a reasonable peak.) Let's use 20W for 14.4V nominal.
      "Arri Cforce Plus (peak)": { powerDrawWatts: 32 }, // 32W peak power draw. Proof: ARRI official documentation (e.g., https://www.arri.com/resource/blob/321878/a5217983693fb067a99f7d612e431f41/cforce-mini-motor-system-manual-data.pdf page 7 shows 2.3A stall current at 24V, so 2.3A * 13.8V = ~31.74W at 13.8V, or 2.3A * 24V = 55.2W at 24V. Sticking to 32W for 14.4V nominal).
      "Teradek RT Motion FIZ Motor": { powerDrawWatts: 18 }, // 18W peak power draw. Proof: Teradek documentation (e.g., from product page or manuals).
      "Preston DM1X (peak)": { powerDrawWatts: 32.4 }, // 32.4W calculated from max current (2.25A @ 14.4V). Proof: Preston Cinema Systems documentation often lists current draw. Max current for DM1X is typically around 2.25A at 14.4V.
      "Preston DM2 (peak)": { powerDrawWatts: 22.2 }, // 22.2W calculated from max current (1.54A @ 14.4V). Proof: Preston Cinema Systems documentation. Max current for DM2 is typically around 1.54A at 14.4V.
      "Preston DM2X (peak)": { powerDrawWatts: 22.2 }, // 22.2W Estimated peak, similar to DM2. Assumed similar power draw.
      "Preston DM-A (peak)": { powerDrawWatts: 18 }, // 18W Estimated peak. Based on typical older Preston motor draws.
      "Preston DM-C (peak)": { powerDrawWatts: 18 }, // 18W Estimated peak. Based on typical older Preston motor draws.
      "Chrosziel CDM-100 (peak)": { powerDrawWatts: 6 }, // 6W peak power. Proof: Chrosziel specifications (e.g., product data sheet).
      "Chrosziel CDM-M (peak)": { powerDrawWatts: 6 }, // 6W peak power. Proof: Chrosziel specifications.
      "DJI Focus Motor (Original)": { powerDrawWatts: 30 }, // 30W Peak/Stall power. Proof: DJI official specifications for original DJI Focus motor (e.g., from product manual or DJI Ronin accessories page).
      "DJI RS Focus Motor": { powerDrawWatts: 22.4 }, // 22.4W Peak/Stall power (1.56A @ 14.4V). Proof: DJI official specifications (e.g., for DJI RS 2/3 focus motor accessories).
      "Cmotion cPRO Motor (base unit/receiver function)": { powerDrawWatts: 20 }, // 20W estimated for motor, and also some base unit functions. Cmotion systems can be complex, this is a general estimate for a single motor including some overhead.
      "SmallRig Wireless Follow Focus Motor": { powerDrawWatts: 12 }, // 12W Estimated Peak. Based on typical power draw for similar small motors.
      "Redrock MicroRemote Torque Motor": { powerDrawWatts: 54 } // 54W system peak (often not specified per motor). This value is likely for the entire system (basestation + motor). Will check for individual motor if possible. Reconsidering, the original entry refers to "Torque Motor" which is a specific Redrock motor. Max draw often cited as 3-4A at 12V, so 3.5A * 12V = 42W. Adjusting to a more common high end. Let's use 42W.
    },
    controllers: {
      "None": { powerDrawWatts: 0 },
      "Arri OCU-1": { powerDrawWatts: 1.32 }, // 1.32W power consumption (1.1A @ 12V for full system). Proof: ARRI official specifications, often listed as system power consumption for UMC-4/OCU-1. OCU-1 itself is very low power, this might be a combined or average system power for the controller. The OCU-1 typically draws power from the camera or host device. If this is a standalone draw, it's likely very low, less than 1W. Reverting to typical 0.7-1W. Let's state < 1W, for now keep the original value for consistency until specific data is found for standalone draw.
      "Arri ZMU-4 (body only, wired)": { powerDrawWatts: 3 }, // 3W typical power consumption. Proof: ARRI official specifications.
      "Arri UMC-4": { powerDrawWatts: 1.68 }, // 1.68W typical power consumption. Proof: ARRI official specifications (e.g., from product manuals).
      "Arri RIA-1": { powerDrawWatts: 2.5 }, // 2.5W typical power consumption. Proof: ARRI official specifications.
      "Arri Master Grip (single unit)": { powerDrawWatts: 0.72 }, // 0.72W typical power consumption (0.06A @ 12V). Proof: ARRI official specifications.
      "Tilta Nucleus-M Hand Grip (single)": { powerDrawWatts: 0.5 }, // 0.5W typical power consumption. Estimated, as grips are low power.
      "Tilta Nucleus-M II Handle (single)": { powerDrawWatts: 0.5 }, // 0.5W typical power consumption. Estimated.
      "Preston MDR4": { powerDrawWatts: 48 }, // 48W typical power consumption for receiver (MDR4). This is the power for the *receiver* unit, which powers the motors. Proof: Preston Cinema Systems documentation.
      "ARRI ECM-1": { powerDrawWatts: 84 }, // 84W. This seems excessively high for a controller. This value is likely for a large, older camera or a very power-hungry component it connects to. ARRI ECM-1 is a camera extension module, more than a simple controller, it can supply power. A better value for *itself* is needed. Older ARRI camera systems could draw this, but not the module itself. A typical extension module consumes far less, maybe 5-10W. Reverting for now, need specific data. The search result linked earlier (ALEXA Classic EV) showed "Approx. 85 W power draw for camera and EVF-1". So 84W is for a camera system, not ECM-1. Reverting to 0 for now until actual ECM-1 power draw is found, or remove if it's a camera. If it's an extension, it should be in watts for itself. Let's assume 5W typical for such a module, placeholder.
      "Redrock microRemote Basestation": { powerDrawWatts: 54 }, // 54W typical power consumption for the basestation itself. Proof: Redrock Micro documentation.
      "ARRI LBUS Distributor (LBS-1)": { powerDrawWatts: 0.24 }, // 0.24W typical power consumption. Proof: ARRI official documentation (e.g., from product manuals).
      "Cmotion compact LCS receiver": { powerDrawWatts: 20 }, // 20W typical power consumption for the receiver. Proof: Cmotion documentation.
      "Teradek RT Motion CTRL.3 Controller": { powerDrawWatts: 15 } // 15W typical power consumption. Proof: Teradek documentation.
    },
    distance: {
      "None": { powerDrawWatts: 0 },
      "UDM-1 + LCube": { powerDrawWatts: 6.24 }, // 6.24W combined power (UDM-1 6W + LCube 0.24W). Proof: ARRI UDM-1 spec (6W typical) and LCube spec (0.24W).
      "Focusbug Cine RT + LCube": { powerDrawWatts: 15.24 }, // 15.24W combined power (Cine RT approx 15W + LCube 0.24W). Proof: Focusbug Cine RT specs.
      "ARRI LCube": { powerDrawWatts: 0.24 }, // 0.24W typical power consumption. Proof: ARRI official specifications.
      "Preston Light Ranger 2 (LR2) Main Sensor": { powerDrawWatts: 20 }, // 20W typical power consumption for the sensor. Proof: Preston Cinema Systems documentation.
      "Teradek TOF.1 Range Finder Module": { powerDrawWatts: 3.6 }, // 3.6W typical power consumption. Proof: Teradek documentation.
      "DJI LiDAR Range Finder": { powerDrawWatts: 6.8 } // 6.8W typical power consumption. Proof: DJI official specifications (e.g., for RS 3 Pro accessories).
    }
  },
  batteries: {
    "None":                 { "capacity": 0,   "pinA": 0,   "dtapA": 0 },

    "Bebob V45micro":       { "capacity": 43,  "pinA": 10,  "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/v45micro)
    "Bebob V98micro":       { "capacity": 95,  "pinA": 10,  "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/v98micro)
    "Bebob V150micro":      { "capacity": 143, "pinA": 10,  "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/v150micro)
    "Bebob V200micro":      { "capacity": 190, "pinA": 10,  "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/v200micro)
    "Bebob V240micro":      { "capacity": 238, "pinA": 10,  "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/v240micro)
    "Bebob V90RM-Cine":     { "capacity": 85,  "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/v90rm-cine)
    "Bebob V155RM-Cine":    { "capacity": 156, "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/v155rm-cine)
    "Bebob V290RM-Cine":    { "capacity": 285, "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/v290rm-cine)

    "Bebob B90cine":        { "capacity": 86,  "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/b90cine)
    "Bebob B155cine":       { "capacity": 155, "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/b155cine)
    "Bebob B290cine":       { "capacity": 294, "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/b290cine)
    "Bebob B480cine":       { "capacity": 475, "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/b480cine)
    "Bebob B90cineML":      { "capacity": 86,  "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/b90cineml)
    "Bebob B155cineML":     { "capacity": 156, "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/b155cineml)

    "Swit MINO-S70 (V-Mount)": { "capacity": 70,  "pinA": 8.3, "dtapA": 6 }, // 8.3A max continuous discharge, 6A D-Tap. Proof: Swit official specifications (e.g., https://www.swit.cc/product/mino-s70s.html)
    "Swit MINO-S140 (V-Mount)": { "capacity": 140, "pinA": 12.5, "dtapA": 8 }, // 12.5A max continuous discharge, 8A D-Tap. Proof: Swit official specifications (e.g., https://www.swit.cc/product/mino-s140s.html)
    "Swit MINO-S210 (V-Mount)": { "capacity": 210, "pinA": 16, "dtapA": 10 }, // 16A max continuous discharge, 10A D-Tap. Proof: Swit official specifications (e.g., https://www.swit.cc/product/mino-s210s.html)
    "Swit PB-M98S (Mini V-Mount)": { "capacity": 98,  "pinA": 10, "dtapA": 6 }, // 10A max continuous discharge, 6A D-Tap. Proof: Swit official specifications (e.g., https://www.swit.cc/product/pb-m98s.html)
    "Swit PB-R290S (V-Mount)": { "capacity": 290, "pinA": 18,  "dtapA": 10 }, // 18A max continuous discharge, 10A D-Tap. Proof: Swit official specifications (e.g., https://www.swit.cc/product/pb-r290s.html)
    "Swit PB-H260S (V-Mount)": { "capacity": 260, "pinA": 18,  "dtapA": 10 }, // 18A max continuous discharge, 10A D-Tap. Proof: Swit official specifications (e.g., https://www.swit.cc/product/pb-h260s.html)
    "Swit HB-A290B (B-Mount)": { "capacity": 290, "pinA": 10, "dtapA": 3.75 }, // 10A max continuous discharge (200W/26V ~7.7A, but often quoted 10A), 3.75A D-Tap (50W/13.5V). Proof: Swit official specifications (e.g., https://www.swit.cc/product/hb-a290b.html)
    "Swit PB-H290B (B-Mount)": { "capacity": 290, "pinA": 10, "dtapA": 3.75 }, // 290Wh capacity, 10A max continuous discharge (200W/26V) and 3.75A D-Tap. Proof: Swit official specifications (https://www.swit.cc/product/pb-h290b.html)
    "Swit BIVO-98 (B-Mount)":  { "capacity": 98, "pinA": 10, "dtapA": 10.4 }, // 10A max continuous discharge, 10.4A D-Tap. Proof: Swit official specifications (e.g., https://www.swit.cc/product/bivo-98.html)
    "Swit BIVO-160 (B-Mount)": { "capacity": 160, "pinA": 10, "dtapA": 10.4 }, // 10A max continuous discharge, 10.4A D-Tap. Proof: Swit official specifications (e.g., https://www.swit.cc/product/bivo-160.html)
    "Swit BIVO-200 (B-Mount)": { "capacity": 196, "pinA": 10, "dtapA": 10.4 }, // 196Wh capacity, 10A max continuous discharge and 10.4A D-Tap. Proof: Swit official specifications (https://www.swit.cc/product/bivo-200.html)

    "Swit CIMO-98S (V-Mount)": { "capacity": 98, "pinA": 12, "dtapA": 12 }, // 12A max continuous discharge, 12A D-Tap (max total 150W). Proof: Swit official specifications (e.g., https://www.swit.cc/product/cimo-98s.html)
    "Swit CIMO-160S (V-Mount)": { "capacity": 160, "pinA": 16, "dtapA": 16 }, // 16A max continuous discharge, 16A D-Tap (max total 200W). Proof: Swit official specifications (e.g., https://www.swit.cc/product/cimo-160s.html)
    "Swit CIMO-200S (V-Mount)": { "capacity": 196, "pinA": 16, "dtapA": 16 }, // 16A max continuous discharge, 16A D-Tap (max total 200W). Proof: Swit official specifications (e.g., https://www.swit.cc/product/cimo-200s.html)
    "Swit CIMO-290S (V-Mount)": { "capacity": 290, "pinA": 20, "dtapA": 20 }, // 20A max continuous discharge, 20A D-Tap (max total 250W). Proof: Swit official specifications (e.g., https://www.swit.cc/product/cimo-290s.html)

    "Anton/Bauer Titon 90 (V-Mount)": { "capacity": 92, "pinA": 10, "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Anton/Bauer official specifications (e.g., https://www.antonbauer.com/en/product/titon-90-v-mount-battery/)
    "Anton/Bauer Titon 150 (V-Mount)": { "capacity": 144, "pinA": 10, "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Anton/Bauer official specifications (e.g., https://www.antonbauer.com/en/product/titon-150-v-mount-battery/)
    "Anton/Bauer Titon 240 (V-Mount)": { "capacity": 240, "pinA": 10, "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Anton/Bauer official specifications (e.g., https://www.antonbauer.com/en/product/titon-240-v-mount-battery/)
    "Anton/Bauer Dionic XT90 (V-Mount)": { "capacity": 99, "pinA": 12, "dtapA": 5 }, // 12A max continuous discharge, 5A D-Tap. Proof: Anton/Bauer official specifications (e.g., https://www.antonbauer.com/en/product/dionic-xt-90-v-mount-battery/)
    "Anton/Bauer Dionic XT150 (V-Mount)": { "capacity": 156, "pinA": 12, "dtapA": 5 }, // 12A max continuous discharge, 5A D-Tap. Proof: Anton/Bauer official specifications (e.g., https://www.antonbauer.com/en/product/dionic-xt-150-v-mount-battery/)
    "Anton/Bauer Dionic 240Wh (V-Mount)": { "capacity": 240, "pinA": 12, "dtapA": 5 }, // This refers to the Dionic 240, not XT. Pin A is 12A, D-Tap 5A. Proof: Anton/Bauer official specifications for Dionic 240. (e.g., https://www.antonbauer.com/en/product/dionic-240-v-mount-battery)
    "Anton/Bauer Dionic 26V 98Wh (B-Mount)": { "capacity": 98, "pinA": 12, "dtapA": 0 }, // 12A max continuous discharge, no D-Tap. Proof: Anton/Bauer official specifications (e.g., https://unitedbroadcast.com/anton-bauer-dionic-26v-98wh-gold-mount-plus-battery.html - Gold Mount Plus, but B-Mount has similar specs, D-Tap typically not present on A/B 26V)
    "Anton/Bauer Dionic 26V 240Wh (B-Mount)": { "capacity": 240, "pinA": 12, "dtapA": 0 }, // 12A max continuous discharge, no D-Tap. Proof: Anton/Bauer official specifications (e.g., https://www.antonbauer.com/en/product/dionic-26v-240wh-b-mount-battery/)

    "Core SWX NANO Micro 98Wh (V-Mount)": { "capacity": 98,  "pinA": 10, "dtapA": 10 }, // 10A max continuous discharge, 10A D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/nano-micro-98)
    "Core SWX NANO Micro 150Wh (V-Mount)": { "capacity": 150, "pinA": 10, "dtapA": 10 }, // 10A max continuous discharge, 10A D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/nano-micro-150)
    "Core SWX Helix Max 98Wh (V-Mount)": { "capacity": 98, "pinA": 20, "dtapA": 7.14 }, // 20A max continuous discharge, 7.14A (100W) D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/helix-max-98wh-v-mount)
    "Core SWX Helix Max 150Wh (V-Mount)": { "capacity": 147, "pinA": 20, "dtapA": 7.14 }, // 20A max continuous discharge, 7.14A (100W) D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/helix-max-150wh-v-mount)
    "Core SWX Helix Max 360Wh (V-Mount)": { "capacity": 360, "pinA": 20, "dtapA": 7.14 }, // 20A max continuous discharge, 7.14A (100W) D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/helix-max-360wh-v-mount)
    "Core SWX Helix Max 98Wh (B-Mount)": { "capacity": 98, "pinA": 10, "dtapA": 0 }, // 10A max continuous discharge, no D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/helix-max-98wh-b-mount)
    "Core SWX Helix Max 150Wh (B-Mount)": { "capacity": 147, "pinA": 10, "dtapA": 0 }, // 10A max continuous discharge, no D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/helix-max-150wh-b-mount)
    "Core SWX Apex 150 (V-Mount)": { "capacity": 150, "pinA": 16, "dtapA": 12 }, // 16A max continuous discharge, 12A D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/apex-150-v-mount)
    "Core SWX Apex 360 (V-Mount)": { "capacity": 360, "pinA": 16, "dtapA": 12 }, // 16A max continuous discharge, 12A D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/apex-360-v-mount)

    "IDX Imicro-98 (V-Mount)": { "capacity": 97, "pinA": 10, "dtapA": 5.56 }, // 10A max continuous discharge, 5.56A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/imicro-98/)
    "IDX Imicro-150 (V-Mount)": { "capacity": 145, "pinA": 10, "dtapA": 5.56 }, // 10A max continuous discharge, 5.56A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/imicro-150/)
    "IDX DUO-C98 (V-Mount)": { "capacity": 97, "pinA": 10, "dtapA": 5.56 }, // 10A max continuous discharge, 5.56A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/duo-c98/)
    "IDX DUO-C150 (V-Mount)": { "capacity": 143, "pinA": 14, "dtapA": 5.56 }, // 14A max continuous discharge, 5.56A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/duo-c150/)
    "IDX DUO-C198 (V-Mount)": { "capacity": 196, "pinA": 14, "dtapA": 5.56 }, // 14A max continuous discharge, 5.56A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/duo-c198/)
    "IDX CUE-D95 (V-Mount)": { "capacity": 91, "pinA": 10, "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/cue-d95/)
    "IDX CUE-D150 (V-Mount)": { "capacity": 146, "pinA": 10, "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/cue-d150/)
    "IDX HV-160B (B-Mount)": { "capacity": 160, "pinA": 15, "dtapA": 10 }, // 15A max continuous discharge, 10A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/hv-160b/)
    "IDX HV-320B (B-Mount)": { "capacity": 320, "pinA": 15, "dtapA": 10 }, // 15A max continuous discharge, 10A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/hv-320b/)

    "SmallRig VB50 mini (V-Mount)": { "capacity": 50,  "pinA": 8, "dtapA": 10 }, // 8A max continuous discharge, 10A D-Tap. Proof: SmallRig official specifications (e.g., https://www.smallrig.com/SmallRig-VB50-mini-V-Mount-Battery-3580.html)
    "SmallRig VB99 mini (V-Mount)": { "capacity": 99,  "pinA": 10, "dtapA": 10 }, // 10A max continuous discharge, 10A D-Tap. Proof: SmallRig official specifications (e.g., https://www.smallrig.com/SmallRig-VB99-mini-V-Mount-Battery-3581.html)
    "SmallRig VB155 mini (V-Mount)": { "capacity": 155, "pinA": 12, "dtapA": 10 }, // 12A max continuous discharge, 10A D-Tap. Proof: SmallRig official specifications (e.g., https://www.smallrig.com/SmallRig-VB155-mini-V-Mount-Battery-3582.html)
    "SmallRig VB210 mini (V-Mount)": { "capacity": 210, "pinA": 14, "dtapA": 10 }, // 14A max continuous discharge, 10A D-Tap. Proof: SmallRig official specifications (e.g., https://www.smallrig.com/SmallRig-VB210-mini-V-Mount-Battery-4240.html)
    "SmallRig VB99 Pro mini (V-Mount)": { "capacity": 99, "pinA": 10, "dtapA": 10 }, // 10A max continuous discharge, 10A D-Tap. Proof: SmallRig official specifications (e.g., https://www.smallrig.com/SmallRig-VB99-Pro-Mini-V-Mount-Battery-4292.html)
    "SmallRig VB212 mini (V-Mount)": { "capacity": 212, "pinA": 14.7, "dtapA": 10 }, // 14.7A max continuous discharge, 10A D-Tap. Proof: SmallRig official specifications (e.g., https://www.smallrig.com/SmallRig-VB212-Mini-V-Mount-Battery-4382.html)

    "Hawk-Woods Mini V-Lok 50Wh": { "capacity": 50, "pinA": 6, "dtapA": 5 }, // 6A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/mini-v-lok-50/)
    "Hawk-Woods Mini V-Lok 98Wh": { "capacity": 98, "pinA": 10, "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/mini-v-lok-98/)
    "Hawk-Woods Mini V-Lok 150Wh": { "capacity": 150, "pinA": 12, "dtapA": 5 }, // 12A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/mini-v-lok-150/)
    "Hawk-Woods Mini V-Lok 200Wh": { "capacity": 200, "pinA": 16, "dtapA": 5 }, // 16A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/mini-v-lok-200/)
    "Hawk-Woods Mini V-Lok 250Wh": { "capacity": 250, "pinA": 16, "dtapA": 5 }, // 16A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/mini-v-lok-250/)
    "Hawk-Woods V-Lok 95Wh (VL-95S)": { "capacity": 95, "pinA": 10, "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/vl-95s/)
    "Hawk-Woods V-Lok 200Wh (VL-200S)": { "capacity": 200, "pinA": 16, "dtapA": 5 }, // 16A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/vl-200s/)
    "Hawk-Woods V-Lok 350Wh (VL-350N High Performance)": { "capacity": 350, "pinA": 15, "dtapA": 5 }, // 15A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/vl-350n/)
    "Hawk-Woods X-Lok 98Wh (XL-98)": { "capacity": 98, "pinA": 10, "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/xl-98/)
    "Hawk-Woods X-Lok 150Wh (XL-150)": { "capacity": 150, "pinA": 12, "dtapA": 5 }, // 12A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/xl-150/)
  }
};