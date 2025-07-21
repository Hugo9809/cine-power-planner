let devices = {
  "cameras": {
    "Arri Alexa Mini LF": {
      "powerDrawWatts": 89,
      "power": {
        "input": {
          "voltageRange": "11V-34V DC",
          "portType": "LEMO 8-pin (DC In / BAT)",
          "powerDrawWatts": 89
        },
        "internalBattery": {
          "type": "None",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "B-Mount",
          "V-Mount",
          "Gold Mount"
        ],
        "powerDistributionOutputs": [
          {
            "type": "LEMO 2-pin",
            "voltage": "12V",
            "current": "2A",
            "wattage": 24,
            "notes": "Regulated"
          },
          {
            "type": "Fischer 3-pin",
            "voltage": "24V",
            "current": null,
            "notes": "Regulated R/S, primarily control"
          },
          {
            "type": "EXT LEMO 7-pin",
            "voltage": "24V",
            "notes": "Control/Power"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "3G-SDI",
          "notes": "SDI 1: 1.5G/3G HD (processed/clean)"
        },
        {
          "type": "6G-SDI",
          "notes": "SDI 2: 1.5G/3G HD, 6G UHD (clean only, cloneable)"
        }
      ],
      "fizConnectors": [
        {
          "type": "LEMO 4-pin (LBUS)",
          "notes": "On lens mount, for lens motors"
        },
        {
          "type": "EXT LEMO 7-pin",
          "notes": "For camera control, incl. FIZ with compatible systems"
        }
      ],
      "recordingMedia": [
        "Codex Compact Drive (1TB, 2TB)"
      ],
      "viewfinder": [
        {
          "type": "ARRI MVF-2 (Native)",
          "resolution": "1920x1080",
          "notes": "OLED eyepiece + LCD fold-out monitor"
        }
      ],
      "lensMount": [
        "ARRI LPL (Native)",
        "ARRI PL (adapted)",
        "ARRI EF (adapted)",
        "LEITZ M-MOUNT (adapted)",
        "Panavision PV (adapted)",
        "Panavision PV70 (adapted)",
        "Vantage XPL52 (adapted)"
      ],
      "timecode": [
        {
          "type": "LEMO 5-pin",
          "notes": "LTC Timecode In/Out"
        },
        {
          "type": "SYNC IN",
          "notes": "Black burst/tri-level sync"
        }
      ]
    },
    "Arri Alexa Mini": {
      "powerDrawWatts": 84,
      "power": {
        "input": {
          "voltageRange": "11V-34V DC",
          "portType": "LEMO 8-pin (BAT)",
          "powerDrawWatts": 84
        },
        "internalBattery": {
          "type": "None",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount",
          "Gold Mount",
          "B-Mount (via adapter)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "LEMO 2-pin",
            "voltage": "12V",
            "current": "2A",
            "wattage": 24,
            "notes": "Regulated"
          },
          {
            "type": "Fischer 3-pin",
            "voltage": "24V",
            "current": null,
            "notes": "Regulated R/S, primarily control"
          },
          {
            "type": "EXT LEMO 7-pin",
            "voltage": "24V",
            "notes": "Control/Power"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "3G-SDI",
          "notes": "SDI 1: 1.5G/3G HD (processed/clean)"
        },
        {
          "type": "3G-SDI",
          "notes": "SDI 2: 1.5G/3G HD (clean only, cloneable)"
        }
      ],
      "fizConnectors": [
        {
          "type": "LEMO 4-pin (LBUS)",
          "notes": "On lens mount, for lens motors"
        },
        {
          "type": "EXT LEMO 7-pin",
          "notes": "For camera control, incl. FIZ with compatible systems"
        }
      ],
      "recordingMedia": [
        "CFast 2.0"
      ],
      "viewfinder": [
        {
          "type": "ARRI MVF-1 (Native)",
          "resolution": "1280x720",
          "notes": "OLED eyepiece"
        }
      ],
      "lensMount": [
        "ARRI PL (Native)",
        "ARRI EF (adapted)",
        "ARRI B4 (adapted)",
        "ARRI LPL (adapted)"
      ],
      "timecode": [
        {
          "type": "LEMO 5-pin",
          "notes": "LTC Timecode In/Out"
        },
        {
          "type": "SYNC IN",
          "notes": "Black burst/tri-level sync"
        },
        {
          "type": "EXT LEMO 7-pin",
          "notes": "For multi-camera sync with ARRI EDB-2 EXT Distribution Box"
        }
      ]
    },
    "Arri Alexa 35": {
      "powerDrawWatts": 110,
      "power": {
        "input": {
          "voltageRange": "19.5V-34V DC",
          "portType": "BAT (LEMO 8-pin)",
          "powerDrawWatts": 110
        },
        "internalBattery": {
          "type": "None",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "B-Mount (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "LEMO 2-pin",
            "voltage": "12V",
            "current": "2A",
            "wattage": 24,
            "notes": "Regulated"
          },
          {
            "type": "Fischer 3-pin",
            "voltage": "24V",
            "notes": "Regulated R/S, primarily control"
          },
          {
            "type": "EXT (LEMO 7-pin)",
            "voltage": "24V",
            "notes": "Control/Power"
          },
          {
            "type": "LBUS (LEMO 4-pin)"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "3G-SDI",
          "notes": "SDI 1: 1.5G/3G HD"
        },
        {
          "type": "6G-SDI",
          "notes": "SDI 2: 1.5G/3G HD, 6G UHD"
        }
      ],
      "fizConnectors": [
        {
          "type": "LBUS (LEMO 4-pin)",
          "notes": "On lens mount, for daisy-chainable motors"
        },
        {
          "type": "EXT (LEMO 7-pin)",
          "notes": "For camera control, incl. FIZ with compatible systems"
        }
      ],
      "recordingMedia": [
        "Codex Compact Drive (1TB, 2TB)"
      ],
      "viewfinder": [
        {
          "type": "ARRI MVF-2 (Native)",
          "resolution": "1920x1080",
          "notes": "OLED eyepiece + LCD fold-out monitor"
        }
      ],
      "lensMount": [
        "ARRI LPL (Native)",
        "ARRI PL (adapted)",
        "ARRI EF (adapted)"
      ],
      "timecode": [
        {
          "type": "LEMO 5-pin",
          "notes": "LTC Timecode In/Out"
        },
        {
          "type": "SYNC IN",
          "notes": "Black burst/tri-level sync"
        },
        {
          "type": "EXT (LEMO 7-pin)",
          "notes": "For multi-camera sync"
        }
      ]
    },
    "Arri Amira": {
      "powerDrawWatts": 50,
      "power": {
        "input": {
          "voltageRange": "10.5V - 34V DC",
          "portType": "XLR 4-pin (main input)",
          "powerDrawWatts": 50
        },
        "internalBattery": {
          "type": "None",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "Hirose 12pin",
            "notes": "For ENG type zoom lenses"
          },
          {
            "type": "D-Tap",
            "voltage": "12V",
            "notes": "Power output"
          },
          {
            "type": "Hirose 4pin",
            "voltage": "12V",
            "notes": "Power output"
          },
          {
            "type": "Lemo 2pin",
            "voltage": "12V",
            "notes": "Power output"
          },
          {
            "type": "RS 3pin",
            "voltage": "24V",
            "notes": "Power output"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HD-SDI",
          "count": 2,
          "notes": "Uncompressed HD/UHD video with embedded audio and metadata"
        }
      ],
      "fizConnectors": [
        {
          "type": "Hirose 12pin",
          "notes": "For ENG type zoom lenses (FIZ control)"
        },
        {
          "type": "PL Mount w/ Hirose connector and LDS",
          "notes": "For electronic lens data and control"
        },
        {
          "type": "EF Mount",
          "notes": "For electronic lens control"
        }
      ],
      "recordingMedia": [
        "CFast 2.0 memory cards"
      ],
      "viewfinder": [
        {
          "type": "AMIRA Multi Viewfinder MVF-1",
          "notes": "OLED eyepiece and fold-away LCD monitor"
        }
      ],
      "lensMount": [
        "B4 lens mount",
        "PL mount",
        "Canon EF mount"
      ],
      "timecode": [
        {
          "type": "Timecode In/Out",
          "notes": "Yes"
        }
      ]
    },
    "Sony Venice 2": {
      "powerDrawWatts": 76,
      "power": {
        "input": {
          "voltageRange": "DC 12 V (11.0 to 17.0 V) / DC 24 V (22.0 to 32.0 V)",
          "portType": "XLR-type 4 pin (male) / Square-shaped 5 pin connector (Battery)",
          "powerDrawWatts": 76
        },
        "internalBattery": {
          "type": "None",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "Fischer 3-pin",
            "count": 2,
            "voltage": "24V",
            "current": "2.5A",
            "wattage": 60,
            "notes": "Regulated, 3A surge, 2.5A sustained shared"
          },
          {
            "type": "LEMO 2-pin",
            "count": 2,
            "voltage": "12V",
            "current": "7A",
            "wattage": null,
            "notes": "Unregulated, 7A shared"
          },
          {
            "type": "D-Tap",
            "count": 2,
            "voltage": "12V",
            "current": "9A",
            "wattage": null,
            "notes": "Unregulated, 9A shared"
          },
          {
            "type": "USB",
            "count": 1,
            "voltage": "5V",
            "current": "2.5A",
            "wattage": 12.5,
            "notes": "USB-A"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 4
        },
        {
          "type": "HD-SDI",
          "count": 1
        },
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type A"
        }
      ],
      "fizConnectors": [
        {
          "type": "Lens 12 pin",
          "notes": "For lens control"
        },
        {
          "type": "Lens Mount Hot Shoe 4 pin",
          "notes": "Supports Cooke /i Intelligent Electronic Lens System and ZEISS eXtended Data"
        },
        {
          "type": "Remote 8 pin",
          "notes": "General remote control"
        }
      ],
      "recordingMedia": [
        "AXS Memory A-Series slot",
        "SD card slot"
      ],
      "viewfinder": [
        {
          "type": "LEMO 26 pin",
          "notes": "For Sony DVF-EL200 Viewfinder"
        }
      ],
      "lensMount": [
        "PL Mount (Native)",
        "E-mount (lever lock type, without supplied PL lens mount adaptor)",
        "LPL Mount (via Leitz adapter)"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode Input"
        },
        {
          "type": "BNC",
          "notes": "Timecode Output (AUX)"
        }
      ]
    },
    "Sony Venice": {
      "powerDrawWatts": 60
    },
    "Sony Burano": {
      "powerDrawWatts": 66,
      "power": {
        "input": {
          "voltageRange": "19.5V DC",
          "portType": "DC IN (Barrel)",
          "powerDrawWatts": 66
        },
        "internalBattery": {
          "type": "None",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (Native)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "D-Tap",
            "count": 2,
            "voltage": "14.4V",
            "wattage": 50,
            "notes": "Typical, via battery plate"
          },
          {
            "type": "USB-C PD",
            "voltage": "5V",
            "current": "3A",
            "wattage": 15,
            "notes": "On camera body"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "notes": "12G-SDI, 3G-SDI"
        },
        {
          "type": "HDMI"
        }
      ],
      "fizConnectors": [
        {
          "type": "LANC (2.5mm stereo mini jack)",
          "notes": "Remote control"
        },
        {
          "type": "USB-C",
          "notes": "For specific accessories/control"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B"
      ],
      "viewfinder": [
        {
          "type": "Sony Burano EVF Port (Proprietary)",
          "notes": "For Sony EVF"
        },
        {
          "type": "LCD Monitor (Native)",
          "size": "3.5-inch",
          "resolution": "1280x720"
        }
      ],
      "lensMount": [
        "Sony E-mount (Native)",
        "PL (adapted)"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        },
        {
          "type": "USB-C",
          "notes": "For timecode sync via adapter"
        }
      ]
    },
    "Sony FX3": {
      "powerDrawWatts": 7.3,
      "power": {
        "input": {
          "voltageRange": "7.2V DC (via NP-FZ100) / 5V DC (via USB-C)",
          "portType": "USB-C (Power Delivery) / Battery Slot",
          "powerDrawWatts": 7.3
        },
        "internalBattery": {
          "type": "Sony NP-FZ100",
          "batteryLifeMinutes": 135
        },
        "batteryPlateSupport": [
          "NP-FZ100 (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C PD",
            "voltage": "5V",
            "current": "1.5A",
            "wattage": 7.5,
            "notes": "For charging or powering small accessories"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "version": "Type A",
          "notes": "Supports 4K 60p, 16-bit RAW output"
        }
      ],
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "For specific accessories/control"
        },
        {
          "type": "Micro USB",
          "notes": "For specific accessories/control"
        }
      ],
      "recordingMedia": [
        "CFexpress Type A",
        "SD (UHS-II/UHS-I)"
      ],
      "viewfinder": [
        {
          "type": "LCD Monitor (Native)",
          "size": "3.0-inch",
          "resolution": "1.44M dots",
          "notes": "Vari-angle touchscreen"
        }
      ],
      "lensMount": [
        "Sony E-mount (Native)"
      ],
      "timecode": [
        {
          "type": "Multi-function shoe",
          "notes": "Via XLR Handle Unit for timecode input"
        }
      ]
    },
    "Sony FX6": {
      "powerDrawWatts": 18,
      "power": {
        "input": {
          "voltageRange": "19.5V DC",
          "portType": "DC IN (Barrel)",
          "powerDrawWatts": 18
        },
        "internalBattery": {
          "type": "None",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "Sony L-Series InfoLithium (Native)",
          "Gold Mount (adapted)",
          "V-Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "D-Tap",
            "count": 2,
            "voltage": "14.4V",
            "wattage": 50,
            "notes": "Via optional MID49 DB-11, per port (typical)"
          },
          {
            "type": "Fischer 3-pin",
            "count": 2,
            "voltage": "24V",
            "current": "2.5A",
            "wattage": 60,
            "notes": "Via optional MID49 DB-11, per port, with R/S"
          },
          {
            "type": "Lemo 2-pin",
            "count": 2,
            "voltage": "14.4V",
            "wattage": 24,
            "notes": "Via optional MID49 DB-11, per port (est. 2A)"
          },
          {
            "type": "USB-C PD",
            "voltage": "5V",
            "current": "3A",
            "wattage": 15,
            "notes": "Via optional MID49 DB-11, with thread lock"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "notes": "Supports 16-bit RAW"
        },
        {
          "type": "HDMI",
          "version": "2.0"
        }
      ],
      "fizConnectors": [
        {
          "type": "LANC (2.5mm stereo mini jack)",
          "notes": "REMOTE connector"
        },
        {
          "type": "Proprietary Side Grip Connection",
          "notes": "Simulates Hand Grip for remote control"
        }
      ],
      "recordingMedia": [
        "CFexpress Type A",
        "SD (UHS-II/UHS-I)"
      ],
      "viewfinder": [
        {
          "type": "Native LCD Viewfinder",
          "size": "3.5-inch",
          "notes": "Touch operation, flexible attachment"
        }
      ],
      "lensMount": [
        "Sony E-mount (Native)",
        "PL (adapted)"
      ],
      "timecode": [
        {
          "type": "Analog Audio Inputs",
          "notes": "2x mini XLR, 1x 3.5mm stereo input can be used for Timecode input"
        }
      ]
    },
    "Sony FX9": {
      "powerDrawWatts": 35.2,
      "power": {
        "input": {
          "voltageRange": "19.5V DC",
          "portType": "DC IN (Barrel)",
          "powerDrawWatts": 35.2
        },
        "internalBattery": {
          "type": "BP-U (e.g., BP-U35, BP-U70, BP-U100)",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "BP-U (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "D-Tap",
            "count": 2,
            "voltage": "14.4V",
            "wattage": 50,
            "notes": "Via optional XDCA-FX9 extension unit, per port"
          },
          {
            "type": "Hirose 4-pin",
            "voltage": "12V",
            "current": "2A",
            "wattage": 24,
            "notes": "Via optional XDCA-FX9 extension unit"
          },
          {
            "type": "USB-C",
            "voltage": "5V",
            "wattage": 7.5,
            "notes": "Via optional XDCA-FX9 extension unit (USB 2.0)"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "notes": "12G-SDI, 3G-SDI"
        },
        {
          "type": "HDMI"
        }
      ],
      "fizConnectors": [
        {
          "type": "LANC (2.5mm stereo mini jack)",
          "notes": "Remote control"
        },
        {
          "type": "USB-C",
          "notes": "For specific accessories/control"
        }
      ],
      "recordingMedia": [
        "XQD Card",
        "SD Card (for proxy/backup)"
      ],
      "viewfinder": [
        {
          "type": "Sony FX9 EVF Port (Proprietary)",
          "notes": "For Sony EVF"
        },
        {
          "type": "LCD Monitor (Native)",
          "size": "3.5-inch",
          "resolution": "1280x720"
        }
      ],
      "lensMount": [
        "Sony E-mount (Native)",
        "PL (adapted)"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "Canon C70": {
      "powerDrawWatts": 14.6,
      "power": {
        "input": {
          "voltageRange": "24V DC",
          "portType": "DC Input",
          "powerDrawWatts": 14.6
        },
        "internalBattery": {
          "type": "BP-A30 (Supplied) / BP-A60 (Optional)",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C",
            "notes": "USB 3.2 Gen1, for optional GPS Unit, Wi-Fi, Ethernet adapters"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "notes": "Type A"
        }
      ],
      "fizConnectors": [
        {
          "type": "Canon RF mount",
          "notes": "For electronic lens control (iris, focus, zoom) on compatible lenses"
        },
        {
          "type": "REMOTE A connector",
          "notes": "2.5 mm stereo mini-mini jack (input only)"
        }
      ],
      "recordingMedia": [
        "SD CARD X2"
      ],
      "viewfinder": [
        {
          "type": "LCD Touch Panel",
          "size": "3.5 inch",
          "resolution": "1280 x 720"
        }
      ],
      "lensMount": [
        "Canon RF mount"
      ],
      "timecode": [
        {
          "type": "BNC / HDMI"
        }
      ]
    },
    "Canon C80": {
      "powerDrawWatts": 19.6,
      "power": {
        "input": {
          "voltageRange": "19.5V DC",
          "portType": "DC IN 24V Terminal",
          "powerDrawWatts": 19.6
        },
        "internalBattery": {
          "type": "Canon BP-A30N (supplied) / BP-A60N / BP-A30 / BP-A60 (optional)",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "D-Tap",
            "count": "multiple",
            "voltage": "Battery Voltage",
            "wattage": 50,
            "notes": "Via optional MID49 DB-4, typical per port"
          },
          {
            "type": "USB-C PD",
            "count": 1,
            "voltage": "5V",
            "wattage": null,
            "notes": "Via optional MID49 DB-4"
          },
          {
            "type": "Fischer 3-pin",
            "count": "multiple",
            "voltage": "24V",
            "current": "2.5A",
            "wattage": 60,
            "notes": "Via optional MID49 DB-4, per port, with R/S"
          },
          {
            "type": "LEMO 2-pin",
            "count": "multiple",
            "voltage": "Battery Voltage",
            "wattage": 24,
            "notes": "Via optional MID49 DB-4, typical per port (est. 2A)"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 1,
          "notes": "BNC terminal"
        },
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type-A"
        }
      ],
      "fizConnectors": [
        {
          "type": "REMOTE A (2.5mm)",
          "notes": "LANC"
        },
        {
          "type": "Multi-function shoe",
          "notes": "21 pin with electrical contacts"
        }
      ],
      "recordingMedia": [
        "SD Card (SD / SDHC / SDXC)",
        "Dual SD card slots for simultaneous recording"
      ],
      "viewfinder": [
        {
          "type": "None",
          "notes": "No built-in viewfinder. External LCD monitor."
        }
      ],
      "lensMount": [
        "Canon RF mount (Native)",
        "PL (adapted)",
        "EF (adapted)"
      ],
      "timecode": [
        {
          "type": "BNC terminal",
          "notes": "Time Code In/Out"
        }
      ]
    },
    "Canon C300 Mk III": {
      "powerDrawWatts": 31,
      "power": {
        "input": {
          "voltageRange": "11.5V - 20V DC",
          "portType": "XLR 4-pin jack",
          "powerDrawWatts": 31
        },
        "internalBattery": {
          "type": "BP-A60 (Supplied)",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "DC Output",
            "notes": "Via optional Expansion Unit EU-V2 / EU-V3"
          },
          {
            "type": "Lens terminal 12-pin",
            "notes": "Via optional Expansion Unit EU-V2"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 1,
          "notes": "BNC terminal, 4K to 2K/FHD conversion available"
        },
        {
          "type": "HDMI",
          "count": 1
        }
      ],
      "fizConnectors": [
        {
          "type": "REMOTE A connector",
          "notes": "2.5 mm stereo jack (input only)"
        },
        {
          "type": "REMOTE B connector",
          "notes": "Round 8-pin jack (for RS-422) with optional EU-V1 / EU-V2 / EU-V3"
        },
        {
          "type": "Lens terminal 12-pin jack",
          "notes": "Requires optional EU-V2 / EU-V3"
        }
      ],
      "recordingMedia": [
        "Dual CFexpress slots",
        "SD card slot (for proxy/backup)"
      ],
      "viewfinder": [
        {
          "type": "LCD Monitor LM-V2 (Supplied)",
          "notes": "4.3” rotating touchscreen LCD unit"
        },
        {
          "type": "Optional EVF-V70 viewfinder"
        }
      ],
      "lensMount": [
        "Canon EF mount (Native)",
        "PL Mount (Cooke/I Technology) (User changeable option)"
      ],
      "timecode": [
        {
          "type": "Time code",
          "notes": "Yes (via BNC)"
        },
        {
          "type": "Genlock",
          "notes": "Yes, with optional Expansion Unit EU-V1 and EU-V2 (BNC jack, input only/also serves as SYNC OUT connector)"
        }
      ]
    },
    "Canon C400": {
      "powerDrawWatts": 32.5,
      "power": {
        "input": {
          "voltageRange": "11.5V-20V DC",
          "portType": "4-pin XLR / DC IN 12V",
          "powerDrawWatts": 32.5
        },
        "internalBattery": {
          "type": "BP-A60N (Supplied) / BP-A30N / BP-A30 / BP-A60 (Optional)",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "Multi-Accessory Shoe",
            "notes": "Via camera body or top handle"
          },
          {
            "type": "USB-C Data Terminal",
            "notes": "USB 3.2 Gen1"
          },
          {
            "type": "USB-C Terminal (Grip)",
            "notes": "For supplied Hand Grip only"
          },
          {
            "type": "USB-C Terminal (LCD Monitor)",
            "notes": "For supplied LCD Monitor only"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 1,
          "notes": "BNC"
        },
        {
          "type": "3G-SDI",
          "count": 1,
          "notes": "Monitor Output BNC; Monitoring"
        },
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type-A"
        }
      ],
      "fizConnectors": [
        {
          "type": "Remote Control Terminal",
          "notes": "2.5 mm stereo mini jack"
        },
        {
          "type": "Lens Terminal",
          "notes": "12-pin jack"
        },
        {
          "type": "Cooke /i Technology™ Support",
          "notes": "Only when equipped with Mount Adapter PL-RF"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B",
        "SD UHS-II"
      ],
      "viewfinder": [
        {
          "type": "LCD Touchscreen",
          "size": "3.5 inch",
          "resolution": "1280 x 720"
        }
      ],
      "lensMount": [
        "Canon RF mount (Native)",
        "PL mount (via PL-RF Mount Adapter)",
        "EF mount (via EF-EOS R Mount Adapter)"
      ],
      "timecode": [
        {
          "type": "DIN1.0 / 2.3",
          "notes": "Input / Output"
        },
        {
          "type": "Genlock",
          "notes": "DIN1.0 / 2.3 (shared with Sync & Return)"
        }
      ]
    },
    "Canon C500 Mk II": {
      "powerDrawWatts": 63,
      "power": {
        "input": {
          "voltageRange": "11.5V - 20V DC",
          "portType": "XLR 4-pin jack",
          "powerDrawWatts": 63
        },
        "internalBattery": {
          "type": "BP-A60 (Supplied)",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "DC Output",
            "notes": "Via optional Expansion Unit EU-V2 / EU-V3"
          },
          {
            "type": "Lens terminal 12-pin",
            "notes": "Via optional Expansion Unit EU-V2 / EU-V3"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 1,
          "notes": "BNC terminal, 4K to 2K/FHD conversion available"
        },
        {
          "type": "HDMI",
          "count": 1
        }
      ],
      "fizConnectors": [
        {
          "type": "REMOTE A connector",
          "notes": "2.5 mm stereo jack (input only)"
        },
        {
          "type": "REMOTE B connector",
          "notes": "Round 8-pin jack (for RS-422) with optional EU-V1 / EU-V2 / EU-V3"
        },
        {
          "type": "Lens terminal 12-pin jack",
          "notes": "Requires optional EU-V2 / EU-V3"
        }
      ],
      "recordingMedia": [
        "Dual CFexpress slots"
      ],
      "viewfinder": [
        {
          "type": "LCD Monitor LM-V2 (Supplied)",
          "notes": "Canon's proprietary specification (special 13-pin jack)"
        },
        {
          "type": "Optional EVF-V70 viewfinder"
        },
        {
          "type": "Optional EVF-V50"
        }
      ],
      "lensMount": [
        "Canon EF mount (Native)",
        "PL mount (User changeable option)"
      ],
      "timecode": [
        {
          "type": "Time code",
          "notes": "Yes (via BNC)"
        },
        {
          "type": "Genlock",
          "notes": "Yes, with optional Expansion Unit EU-V1 and EU-V2 (BNC jack, input only/also serves as SYNC OUT connector)"
        }
      ]
    },
    "Blackmagic BMPCC 4K": {
      "powerDrawWatts": 22,
      "power": {
        "input": {
          "voltageRange": "12V-20V",
          "portType": "2-pin locking connector",
          "powerDrawWatts": 22
        },
        "internalBattery": {
          "type": "Canon LP-E6",
          "batteryLifeMinutes": 60
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C 3.1 Gen 1",
            "notes": "For external drive recording, PTP camera control, software updates, can trickle charge battery"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type A"
        }
      ],
      "fizConnectors": [
        {
          "type": "Active MFT mount",
          "notes": "Iris, focus and zoom on supported lenses"
        },
        {
          "type": "USB Type-C",
          "notes": "PTP camera control"
        },
        {
          "type": "Bluetooth",
          "notes": "Wireless control"
        }
      ],
      "recordingMedia": [
        "CFast card slot",
        "SD UHS-II card slot",
        "USB-C 3.1 Gen 1 expansion port for external media"
      ],
      "viewfinder": [
        {
          "type": "LCD capacitive touchscreen",
          "size": "5 inch",
          "resolution": "1920 x 1080"
        }
      ],
      "lensMount": [
        "Active MFT mount"
      ],
      "timecode": [
        {
          "type": "3.5mm Stereo Input",
          "notes": "Can also be used for Timecode input"
        },
        {
          "type": "Internal Clock",
          "notes": "Less than 1 frame drift every 8 hours"
        }
      ]
    },
    "Blackmagic BMPCC 6K G2": {
      "powerDrawWatts": 26,
      "power": {
        "input": {
          "voltageRange": "12V - 20V DC",
          "portType": "2-pin locking connector",
          "powerDrawWatts": 26
        },
        "internalBattery": {
          "type": "NP-F570",
          "batteryLifeMinutes": 45
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C",
            "notes": "For external hard drive recording and software updates"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type A"
        }
      ],
      "fizConnectors": [
        {
          "type": "Active EF mount",
          "notes": "Iris, focus and zoom on supported lenses"
        },
        {
          "type": "Bluetooth",
          "notes": "Wireless control"
        }
      ],
      "recordingMedia": [
        "CFast 2.0 card slot",
        "SD UHS-II card slot",
        "USB-C 3.1 Gen 1 expansion port for external media"
      ],
      "viewfinder": [
        {
          "type": "LCD capacitive touchscreen",
          "size": "5 inch",
          "resolution": "1920 x 1080",
          "notes": "Adjustable HDR touchscreen"
        },
        {
          "type": "Optional OLED viewfinder"
        }
      ],
      "lensMount": [
        "Active EF mount"
      ],
      "timecode": [
        {
          "type": "3.5 mm TRS / mini jack",
          "notes": "Also for LTC timecode"
        },
        {
          "type": "Internal Clock",
          "notes": "Less than 1 frame drift every 8 hours"
        }
      ]
    },
    "Blackmagic BMPCC 6K": {
      "powerDrawWatts": 26,
      "power": {
        "input": {
          "voltageRange": "12V-20V",
          "portType": "2-pin locking connector",
          "powerDrawWatts": 26
        },
        "internalBattery": {
          "type": "Canon LP-E6",
          "batteryLifeMinutes": 45
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C 3.1 Gen 1",
            "notes": "For external drive recording, PTP camera control, software updates, can trickle charge battery"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type A"
        }
      ],
      "fizConnectors": [
        {
          "type": "Active EF mount",
          "notes": "Iris, focus and zoom on supported lenses"
        },
        {
          "type": "USB Type-C",
          "notes": "PTP camera control"
        },
        {
          "type": "Bluetooth",
          "notes": "Wireless control"
        }
      ],
      "recordingMedia": [
        "CFast card slot",
        "SD UHS-II card slot",
        "USB-C 3.1 Gen 1 expansion port for external media"
      ],
      "viewfinder": [
        {
          "type": "LCD capacitive touchscreen",
          "size": "5 inch",
          "resolution": "1920 x 1080"
        }
      ],
      "lensMount": [
        "Active EF mount"
      ],
      "timecode": [
        {
          "type": "3.5mm Stereo Input",
          "notes": "Can also be used for Timecode input"
        },
        {
          "type": "Internal Clock",
          "notes": "Less than 1 frame drift every 8 hours"
        }
      ]
    },
    "Blackmagic Pocket Cinema Camera 6K Pro": {
      "powerDrawWatts": 26,
      "power": {
        "input": {
          "voltageRange": "12V-20V",
          "portType": "2-pin locking connector / 2-pin LEMO",
          "powerDrawWatts": 26
        },
        "internalBattery": {
          "type": "NP-F570",
          "batteryLifeMinutes": 60
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C PD",
            "voltage": "5V",
            "current": "3A",
            "wattage": 15,
            "notes": "Power Delivery for accessories/charging"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI"
        }
      ],
      "fizConnectors": [
        {
          "type": "Active EF Mount",
          "notes": "For electronic EF lenses (iris, focus, zoom)"
        },
        {
          "type": "USB-C",
          "notes": "For Blackmagic Zoom/Focus Demand, PTP camera control"
        },
        {
          "type": "Bluetooth",
          "notes": "Wireless control"
        }
      ],
      "recordingMedia": [
        "CFast",
        "SD UHS-II",
        "USB-C to external SSD/HDD"
      ],
      "viewfinder": [
        {
          "type": "Native LCD Capacitive Touchscreen",
          "size": "5-inch",
          "resolution": "1920x1080"
        },
        {
          "type": "Blackmagic Pocket Cinema Camera Pro EVF (Optional)",
          "resolution": "1280x960",
          "notes": "Micro OLED display"
        }
      ],
      "lensMount": [
        "Active EF Mount (Native)"
      ],
      "timecode": [
        {
          "type": "Internal Clock",
          "notes": "Less than 1 frame drift every 8 hours"
        },
        {
          "type": "Analog Audio Inputs",
          "notes": "2x mini XLR, 1x 3.5mm Stereo Input can be used for Timecode input"
        }
      ]
    },
    "Blackmagic URSA 12K": {
      "powerDrawWatts": 55,
      "power": {
        "input": {
          "voltageRange": "12V DC",
          "portType": "12-pin Molex connector (at battery plate rear) / 4-pin XLR (external power)",
          "powerDrawWatts": 55
        },
        "internalBattery": {
          "type": "None",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (Native)",
          "Gold Mount (Native)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "D-Tap",
            "count": "multiple",
            "voltage": "12V",
            "wattage": null,
            "notes": "Regulated, via individualized V-Mount battery plate"
          },
          {
            "type": "USB Type-C 3.1 Gen 2",
            "count": 1,
            "voltage": null,
            "wattage": null,
            "notes": "With power delivery for external drive recording"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 1
        },
        {
          "type": "3G-SDI",
          "count": 1,
          "notes": "Monitoring"
        }
      ],
      "fizConnectors": [
        {
          "type": "LANC",
          "count": 1,
          "notes": "2.5mm input for Rec Start/Stop, Iris and Focus control"
        },
        {
          "type": "12pin broadcast connector",
          "notes": "For compatible lenses and electronic control via EF mount pins on optional EF lens mount"
        }
      ],
      "recordingMedia": [
        "CFast 2.0 card slots",
        "SD UHS-II card slots",
        "USB-C 3.1 Gen 2 expansion port for external media"
      ],
      "viewfinder": [
        {
          "type": "LCD capacitive touchscreen",
          "size": "4 inch",
          "notes": "Fold out touchscreen"
        },
        {
          "type": "External backlit LCD status display"
        }
      ],
      "lensMount": [
        "PL mount (Included)",
        "EF (optional)",
        "F (optional)"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode Input (Reference Inputs: Tri-Sync/Black Burst/Timecode)"
        },
        {
          "type": "Internal Clock",
          "notes": "Highly accurate, less than 1 frame drift every 8 hours"
        }
      ]
    },
    "Blackmagic URSA Cine": {
      "powerDrawWatts": 100,
      "power": {
        "input": {
          "voltageRange": "20V-30V DC",
          "portType": "2-pin XLR",
          "powerDrawWatts": 100
        },
        "internalBattery": {
          "type": "None",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (Native)",
          "Gold Mount (Native)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "2-pin LEMO",
            "count": 2,
            "voltage": "12V",
            "current": "3A",
            "wattage": 36,
            "notes": "Regulated"
          },
          {
            "type": "3-pin Fischer",
            "count": 1,
            "voltage": "24V",
            "current": "3A",
            "wattage": 72,
            "notes": "Regulated, with run/stop"
          },
          {
            "type": "D-Tap",
            "count": 2,
            "voltage": "Battery Voltage",
            "wattage": null,
            "notes": "Unregulated"
          },
          {
            "type": "USB-C",
            "count": 1,
            "voltage": "5V",
            "current": "1.5A",
            "wattage": 7.5,
            "notes": "For accessories"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 2
        },
        {
          "type": "HDMI",
          "count": 1
        }
      ],
      "fizConnectors": [
        {
          "type": "LANC",
          "notes": "2.5mm"
        },
        {
          "type": "12-pin Hirose",
          "notes": "For broadcast lenses"
        }
      ],
      "recordingMedia": [
        "Blackmagic Media Module (8TB)",
        "CFexpress Type B (via adapter)"
      ],
      "viewfinder": [
        {
          "type": "Built-in Fold-out LCD",
          "size": "5-inch",
          "resolution": "1920x1080"
        },
        {
          "type": "Blackmagic URSA Cine EVF (Optional)"
        }
      ],
      "lensMount": [
        "User-interchangeable PL, LPL, EF, Hasselblad"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "Blackmagic PYXIS 6K": {
      "powerDrawWatts": 60,
      "power": {
        "input": {
          "voltageRange": "12V-20V DC",
          "portType": "2-pin locking connector",
          "powerDrawWatts": 60
        },
        "internalBattery": {
          "type": "NP-F570",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C",
            "notes": "For external drive recording, power delivery"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type A"
        }
      ],
      "fizConnectors": [
        {
          "type": "Active L-Mount",
          "notes": "Iris, focus and zoom on supported lenses"
        },
        {
          "type": "USB-C",
          "notes": "PTP camera control"
        },
        {
          "type": "Bluetooth",
          "notes": "Wireless control"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B",
        "USB-C to external SSD/HDD"
      ],
      "viewfinder": [
        {
          "type": "LCD capacitive touchscreen",
          "size": "4 inch",
          "resolution": "1280x720"
        }
      ],
      "lensMount": [
        "Active L-Mount"
      ],
      "timecode": [
        {
          "type": "3.5mm Stereo Input",
          "notes": "Can be used for Timecode input"
        }
      ]
    },
    "Blackmagic PYXIS 12K": {
      "powerDrawWatts": 90,
      "power": {
        "input": {
          "voltageRange": "12V-20V DC",
          "portType": "2-pin locking connector",
          "powerDrawWatts": 90
        },
        "internalBattery": {
          "type": "NP-F570",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C",
            "notes": "For external drive recording, power delivery"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type A"
        }
      ],
      "fizConnectors": [
        {
          "type": "Active L-Mount",
          "notes": "Iris, focus and zoom on supported lenses"
        },
        {
          "type": "USB-C",
          "notes": "PTP camera control"
        },
        {
          "type": "Bluetooth",
          "notes": "Wireless control"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B",
        "USB-C to external SSD/HDD"
      ],
      "viewfinder": [
        {
          "type": "LCD capacitive touchscreen",
          "size": "4 inch",
          "resolution": "1280x720"
        }
      ],
      "lensMount": [
        "Active L-Mount"
      ],
      "timecode": [
        {
          "type": "3.5mm Stereo Input",
          "notes": "Can be used for Timecode input"
        }
      ]
    },
    "RED Komodo 6k": {
      "powerDrawWatts": 37,
      "power": {
        "input": {
          "voltageRange": "+7 to +17 V DC",
          "portType": "2-pin DC-Input",
          "powerDrawWatts": 37
        },
        "internalBattery": {
          "type": "Canon BP-900 Series",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)",
          "Micro Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "D-Tap / P-Tap",
            "count": "1-2",
            "voltage": "12-14.8V",
            "wattage": 50,
            "notes": "Via optional third-party plates, typical per port"
          },
          {
            "type": "USB-A",
            "count": 1,
            "voltage": "5V",
            "current": "1-2A",
            "wattage": null,
            "notes": "Via optional third-party plates"
          },
          {
            "type": "LEMO 2-pin",
            "count": "1-2",
            "voltage": "12-14.8V",
            "wattage": 24,
            "notes": "Via optional third-party plates, typical per port (est. 2A)"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 1,
          "notes": "Also supports 6G-SDI, 3G-SDI, and 1.5G-SDI modes"
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Supports Genlock, Timecode In, GPIO, and Ctrl (RS-232)"
        },
        {
          "type": "USB-C / Gigabit Ethernet (via adapter)",
          "notes": "Via KOMODO Link Adaptor for camera control"
        }
      ],
      "recordingMedia": [
        "CFast 2.0"
      ],
      "viewfinder": [
        {
          "type": "Integrated Touchscreen LCD",
          "size": "2.9-inch",
          "resolution": "1440x1440"
        },
        {
          "type": "DSMC3 RED Touch 7\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Canon RF Lens Mount (Native, locking)",
        "Canon EF (adapted)",
        "ARRI PL (adapted)"
      ],
      "timecode": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Timecode In"
        }
      ]
    },
    "RED Komodo X": {
      "powerDrawWatts": 45,
      "power": {
        "input": {
          "voltageRange": "+7 to +17 V DC",
          "portType": "2-pin DC-Input",
          "powerDrawWatts": 45
        },
        "internalBattery": {
          "type": "REDVOLT NANO",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C",
            "notes": "Power Delivery"
          },
          {
            "type": "P-Tap",
            "notes": "Via optional expander"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 1
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Genlock, Timecode, GPIO, Ctrl"
        },
        {
          "type": "USB-C",
          "notes": "Camera control"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B"
      ],
      "viewfinder": [
        {
          "type": "Integrated Touchscreen LCD",
          "size": "2.9-inch"
        },
        {
          "type": "DSMC3 RED Touch 7\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Canon RF Lens Mount (Native)"
      ],
      "timecode": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Timecode In"
        }
      ]
    },
    "V-Raptor XL 8K VV": {
      "powerDrawWatts": 75,
      "power": {
        "input": {
          "voltageRange": "24V DC",
          "portType": "4-pin XLR / V-Lock",
          "powerDrawWatts": 75
        },
        "internalBattery": {
          "type": "None",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (Native)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "P-Tap",
            "count": 2,
            "voltage": "12V",
            "wattage": null
          },
          {
            "type": "2-pin LEMO",
            "count": 2,
            "voltage": "12V",
            "wattage": null
          },
          {
            "type": "3-pin Fischer",
            "count": 1,
            "voltage": "24V",
            "wattage": null,
            "notes": "R/S"
          },
          {
            "type": "USB-C",
            "count": 1,
            "voltage": "5V",
            "wattage": null
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 4
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Genlock, Timecode, GPIO, Ctrl"
        },
        {
          "type": "LANC",
          "notes": "2.5mm"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B"
      ],
      "viewfinder": [
        {
          "type": "DSMC3 RED Touch 7\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Interchangeable PL, EF"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "V-RAPTOR® X XL 8K VV": {
      "powerDrawWatts": 75,
      "power": {
        "input": {
          "voltageRange": "24V DC",
          "portType": "4-pin XLR / V-Lock",
          "powerDrawWatts": 75
        },
        "internalBattery": {
          "type": "None",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (Native)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "P-Tap",
            "count": 2,
            "voltage": "12V",
            "wattage": null
          },
          {
            "type": "2-pin LEMO",
            "count": 2,
            "voltage": "12V",
            "wattage": null
          },
          {
            "type": "3-pin Fischer",
            "count": 1,
            "voltage": "24V",
            "wattage": null,
            "notes": "R/S"
          },
          {
            "type": "USB-C",
            "count": 1,
            "voltage": "5V",
            "wattage": null
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 4
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Genlock, Timecode, GPIO, Ctrl"
        },
        {
          "type": "LANC",
          "notes": "2.5mm"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B"
      ],
      "viewfinder": [
        {
          "type": "DSMC3 RED Touch 7\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Interchangeable PL, EF"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "V-RAPTOR® XL 8K S35": {
      "powerDrawWatts": 75,
      "power": {
        "input": {
          "voltageRange": "24V DC",
          "portType": "4-pin XLR / V-Lock",
          "powerDrawWatts": 75
        },
        "internalBattery": {
          "type": "None",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (Native)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "P-Tap",
            "count": 2,
            "voltage": "12V",
            "wattage": null
          },
          {
            "type": "2-pin LEMO",
            "count": 2,
            "voltage": "12V",
            "wattage": null
          },
          {
            "type": "3-pin Fischer",
            "count": 1,
            "voltage": "24V",
            "wattage": null,
            "notes": "R/S"
          },
          {
            "type": "USB-C",
            "count": 1,
            "voltage": "5V",
            "wattage": null
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 4
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Genlock, Timecode, GPIO, Ctrl"
        },
        {
          "type": "LANC",
          "notes": "2.5mm"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B"
      ],
      "viewfinder": [
        {
          "type": "DSMC3 RED Touch 7\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Interchangeable PL, EF"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "V-RAPTOR® X XL 8K S35": {
      "powerDrawWatts": 75,
      "power": {
        "input": {
          "voltageRange": "24V DC",
          "portType": "4-pin XLR / V-Lock",
          "powerDrawWatts": 75
        },
        "internalBattery": {
          "type": "None",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (Native)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "P-Tap",
            "count": 2,
            "voltage": "12V",
            "wattage": null
          },
          {
            "type": "2-pin LEMO",
            "count": 2,
            "voltage": "12V",
            "wattage": null
          },
          {
            "type": "3-pin Fischer",
            "count": 1,
            "voltage": "24V",
            "wattage": null,
            "notes": "R/S"
          },
          {
            "type": "USB-C",
            "count": 1,
            "voltage": "5V",
            "wattage": null
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 4
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Genlock, Timecode, GPIO, Ctrl"
        },
        {
          "type": "LANC",
          "notes": "2.5mm"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B"
      ],
      "viewfinder": [
        {
          "type": "DSMC3 RED Touch 7\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Interchangeable PL, EF"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "V-Raptor 8k S35": {
      "powerDrawWatts": 60,
      "power": {
        "input": {
          "voltageRange": "11.5V-17V DC",
          "portType": "2-pin DC-IN",
          "powerDrawWatts": 60
        },
        "internalBattery": {
          "type": "REDVOLT Micro-V",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (Native)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "P-Tap",
            "count": 1,
            "voltage": "12V",
            "wattage": null
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 2
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Genlock, Timecode, GPIO, Ctrl"
        },
        {
          "type": "USB-C",
          "notes": "Camera control"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B"
      ],
      "viewfinder": [
        {
          "type": "DSMC3 RED Touch 7\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Interchangeable PL, EF"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "V-Raptor X 8k S35": {
      "powerDrawWatts": 60,
      "power": {
        "input": {
          "voltageRange": "11.5V-17V DC",
          "portType": "2-pin DC-IN",
          "powerDrawWatts": 60
        },
        "internalBattery": {
          "type": "REDVOLT Micro-V",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (Native)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "P-Tap",
            "count": 1,
            "voltage": "12V",
            "wattage": null
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 2
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Genlock, Timecode, GPIO, Ctrl"
        },
        {
          "type": "USB-C",
          "notes": "Camera control"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B"
      ],
      "viewfinder": [
        {
          "type": "DSMC3 RED Touch 7\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Interchangeable PL, EF"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "V-Raptor 8k VV": {
      "powerDrawWatts": 60,
      "power": {
        "input": {
          "voltageRange": "11.5V-17V DC",
          "portType": "2-pin DC-IN",
          "powerDrawWatts": 60
        },
        "internalBattery": {
          "type": "REDVOLT Micro-V",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (Native)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "P-Tap",
            "count": 1,
            "voltage": "12V",
            "wattage": null
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 2
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Genlock, Timecode, GPIO, Ctrl"
        },
        {
          "type": "USB-C",
          "notes": "Camera control"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B"
      ],
      "viewfinder": [
        {
          "type": "DSMC3 RED Touch 7\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Interchangeable PL, EF"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "V-Raptor X 8k VV": {
      "powerDrawWatts": 60,
      "power": {
        "input": {
          "voltageRange": "11.5V-17V DC",
          "portType": "2-pin DC-IN",
          "powerDrawWatts": 60
        },
        "internalBattery": {
          "type": "REDVOLT Micro-V",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (Native)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "P-Tap",
            "count": 1,
            "voltage": "12V",
            "wattage": null
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "12G-SDI",
          "count": 2
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Genlock, Timecode, GPIO, Ctrl"
        },
        {
          "type": "USB-C",
          "notes": "Camera control"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B"
      ],
      "viewfinder": [
        {
          "type": "DSMC3 RED Touch 7\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Interchangeable PL, EF"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "RED Scarlet-W (Dragon Sensor)": {
      "powerDrawWatts": 60,
      "power": {
        "input": {
          "voltageRange": "11.5V-17V DC",
          "portType": "2-pin DC-IN",
          "powerDrawWatts": 60
        },
        "internalBattery": {
          "type": "REDVOLT",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "P-Tap",
            "count": 1,
            "voltage": "12V",
            "wattage": null
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "3G-SDI",
          "count": 2
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Genlock, Timecode, GPIO, Ctrl"
        }
      ],
      "recordingMedia": [
        "RED MINI-MAG"
      ],
      "viewfinder": [
        {
          "type": "RED Touch 7.0\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Interchangeable PL, EF"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "RED Epic-W (Helium 8K S35)": {
      "powerDrawWatts": 37,
      "power": {
        "input": {
          "voltageRange": "11.5V-17V DC",
          "portType": "2-pin DC-IN",
          "powerDrawWatts": 37
        },
        "internalBattery": {
          "type": "REDVOLT",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "P-Tap",
            "count": 1,
            "voltage": "12V",
            "wattage": null
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "3G-SDI",
          "count": 2
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Genlock, Timecode, GPIO, Ctrl"
        }
      ],
      "recordingMedia": [
        "RED MINI-MAG"
      ],
      "viewfinder": [
        {
          "type": "RED Touch 7.0\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Interchangeable PL, EF"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "RED Weapon (Helium 8K S35/VV)": {
      "powerDrawWatts": 75,
      "power": {
        "input": {
          "voltageRange": "11.5V-17V DC",
          "portType": "2-pin DC-IN",
          "powerDrawWatts": 75
        },
        "internalBattery": {
          "type": "REDVOLT",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (Native)",
          "Gold Mount (Native)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "P-Tap",
            "count": 1,
            "voltage": "12V",
            "wattage": null
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "3G-SDI",
          "count": 2
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Genlock, Timecode, GPIO, Ctrl"
        }
      ],
      "recordingMedia": [
        "RED MINI-MAG"
      ],
      "viewfinder": [
        {
          "type": "RED Touch 7.0\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Interchangeable PL, EF"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "RED Epic Dragon (6K)": {
      "powerDrawWatts": 60,
      "power": {
        "input": {
          "voltageRange": "11.5V-17V DC",
          "portType": "2-pin DC-IN",
          "powerDrawWatts": 60
        },
        "internalBattery": {
          "type": "REDVOLT",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "P-Tap",
            "count": 1,
            "voltage": "12V",
            "wattage": null
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "3G-SDI",
          "count": 2
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Genlock, Timecode, GPIO, Ctrl"
        }
      ],
      "recordingMedia": [
        "REDMAG 1.8\" SSD"
      ],
      "viewfinder": [
        {
          "type": "RED Touch 7.0\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Interchangeable PL, EF"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "RED Scarlet Dragon (5K)": {
      "powerDrawWatts": 50,
      "power": {
        "input": {
          "voltageRange": "11.5V-17V DC",
          "portType": "2-pin DC-IN",
          "powerDrawWatts": 50
        },
        "internalBattery": {
          "type": "REDVOLT",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "P-Tap",
            "count": 1,
            "voltage": "12V",
            "wattage": null
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "3G-SDI",
          "count": 2
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Genlock, Timecode, GPIO, Ctrl"
        }
      ],
      "recordingMedia": [
        "REDMAG 1.8\" SSD"
      ],
      "viewfinder": [
        {
          "type": "RED Touch 7.0\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Interchangeable PL, EF"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "RED Epic (Mysterium-X Sensor)": {
      "powerDrawWatts": 60,
      "power": {
        "input": {
          "voltageRange": "11.5V-17V DC",
          "portType": "2-pin DC-IN",
          "powerDrawWatts": 60
        },
        "internalBattery": {
          "type": "REDVOLT",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "P-Tap",
            "count": 1,
            "voltage": "12V",
            "wattage": null
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "3G-SDI",
          "count": 2
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Genlock, Timecode, GPIO, Ctrl"
        }
      ],
      "recordingMedia": [
        "REDMAG 1.8\" SSD"
      ],
      "viewfinder": [
        {
          "type": "RED Touch 7.0\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Interchangeable PL, EF"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "RED Scarlet (Mysterium-X Sensor)": {
      "powerDrawWatts": 60,
      "power": {
        "input": {
          "voltageRange": "11.5V-17V DC",
          "portType": "2-pin DC-IN",
          "powerDrawWatts": 60
        },
        "internalBattery": {
          "type": "REDVOLT",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "P-Tap",
            "count": 1,
            "voltage": "12V",
            "wattage": null
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "3G-SDI",
          "count": 2
        }
      ],
      "fizConnectors": [
        {
          "type": "EXT Port (9-pin)",
          "notes": "Genlock, Timecode, GPIO, Ctrl"
        }
      ],
      "recordingMedia": [
        "REDMAG 1.8\" SSD"
      ],
      "viewfinder": [
        {
          "type": "RED Touch 7.0\" LCD (Optional)"
        }
      ],
      "lensMount": [
        "Interchangeable PL, EF"
      ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ]
    },
    "Panasonic Lumix S5 II": {
      "powerDrawWatts": 12,
      "power": {
        "input": {
          "voltageRange": "8.4V DC (battery) / 9V DC (USB-C PD)",
          "portType": "Battery Slot / USB-C PD",
          "powerDrawWatts": 27
        },
        "internalBattery": {
          "type": "Panasonic DMW-BLK22",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "DMW-BLK22 (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C PD",
            "voltage": "5V",
            "current": "3A",
            "wattage": 15,
            "notes": "For charging or powering small accessories"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type A"
        }
      ],
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "For camera control"
        }
      ],
      "recordingMedia": [
        "SD UHS-II"
      ],
      "viewfinder": [
        {
          "type": "OLED LVF (Live View Finder)",
          "resolution": "3,680k-dot"
        },
        {
          "type": "Free-angle LCD",
          "size": "3.0-inch",
          "resolution": "1,840k-dot"
        }
      ],
      "lensMount": [
        "L-Mount (Native)"
      ],
      "timecode": [
        {
          "type": "No dedicated BNC",
          "notes": "Timecode sync via HDMI or software"
        }
      ]
    },
    "Panasonic Lumix GH6": {
      "powerDrawWatts": 5,
      "power": {
        "input": {
          "voltageRange": "9.0V DC (battery) / 9V DC (USB-C PD)",
          "portType": "Battery Slot / USB-C PD",
          "powerDrawWatts": 27
        },
        "internalBattery": {
          "type": "Panasonic DMW-BLK22",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "DMW-BLK22 (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C PD",
            "voltage": "5V",
            "current": "3A",
            "wattage": 15,
            "notes": "For charging or powering small accessories"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type A"
        }
      ],
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "For camera control"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B",
        "SD UHS-II"
      ],
      "viewfinder": [
        {
          "type": "OLED LVF (Live View Finder)",
          "resolution": "3,680k-dot"
        },
        {
          "type": "Free-angle LCD",
          "size": "3.0-inch",
          "resolution": "1,840k-dot"
        }
      ],
      "lensMount": [
        "Micro Four Thirds (Native)"
      ],
      "timecode": [
        {
          "type": "No dedicated BNC",
          "notes": "Timecode sync via HDMI or software"
        }
      ]
    },
    "Sony A7S III": {
      "powerDrawWatts": 5,
      "power": {
        "input": {
          "voltageRange": "7.2V DC (battery) / 9V DC (USB-C PD)",
          "portType": "Battery Slot / USB-C PD",
          "powerDrawWatts": 27
        },
        "internalBattery": {
          "type": "Sony NP-FZ100",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "NP-FZ100 (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C PD",
            "voltage": "5V",
            "current": "3A",
            "wattage": 15,
            "notes": "For charging or powering small accessories"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type A"
        }
      ],
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "For camera control"
        }
      ],
      "recordingMedia": [
        "CFexpress Type A",
        "SD (UHS-II/UHS-I)"
      ],
      "viewfinder": [
        {
          "type": "OLED EVF",
          "resolution": "9.44M dots"
        },
        {
          "type": "Vari-angle LCD",
          "size": "3.0-inch",
          "resolution": "1.44M dots"
        }
      ],
      "lensMount": [
        "Sony E-mount (Native)"
      ],
      "timecode": [
        {
          "type": "Multi-interface shoe",
          "notes": "Via XLR Handle Unit for timecode input"
        }
      ]
    },
    "Fujifilm X-H2S": {
      "powerDrawWatts": 15,
      "power": {
        "input": {
          "voltageRange": "7.2V (battery) / 5V DC (USB-C PD)",
          "portType": "Battery Slot / USB-C PD",
          "powerDrawWatts": 15
        },
        "internalBattery": {
          "type": "NP-W235",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "NP-W235 (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C PD",
            "voltage": "5V",
            "current": "3A",
            "wattage": 15,
            "notes": "For charging or powering small accessories"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type A"
        }
      ],
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "For camera control"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B",
        "SD UHS-II"
      ],
      "viewfinder": [
        {
          "type": "EVF with eye sensor",
          "resolution": "5.76M dots OLED"
        },
        {
          "type": "Vari-angle LCD",
          "size": "3.0-inch",
          "resolution": "1.62M dots"
        }
      ],
      "lensMount": [
        "Fujifilm X-mount (Native)"
      ],
      "timecode": [
        {
          "type": "No dedicated BNC",
          "notes": "Timecode sync via HDMI or software"
        }
      ]
    },
    "DJI Ronin 4D 6K": {
      "powerDrawWatts": 40,
      "power": {
        "input": {
          "voltageRange": "DC 12-30V",
          "portType": "6-pin 1B DC-IN / TB50 Battery Mount",
          "powerDrawWatts": 40
        },
        "internalBattery": {
          "type": "DJI TB50 Intelligent Battery",
          "batteryLifeMinutes": 150
        },
        "batteryPlateSupport": [
          "TB50 (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "2-pin LEMO",
            "count": 2,
            "voltage": "12V",
            "current": "3A",
            "wattage": 36,
            "notes": "Regulated"
          },
          {
            "type": "3-pin Fischer",
            "count": 1,
            "voltage": "24V",
            "current": "3A",
            "wattage": 72,
            "notes": "Regulated, with run/stop"
          },
          {
            "type": "D-Tap",
            "count": 2,
            "voltage": "Battery Voltage",
            "wattage": null,
            "notes": "Unregulated"
          },
          {
            "type": "USB-C",
            "count": 1,
            "voltage": "5V",
            "current": "1.5A",
            "wattage": 7.5,
            "notes": "For accessories"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type A"
        },
        {
          "type": "SDI",
          "count": 1,
          "notes": "Via expansion plate"
        }
      ],
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "For Focus Motor"
        },
        {
          "type": "LiDAR Range Finder Port",
          "notes": "Integrated LiDAR"
        }
      ],
      "recordingMedia": [
        "DJI PROSSD",
        "CFexpress Type B (via adapter)"
      ],
      "viewfinder": [
        {
          "type": "Integrated Main Monitor",
          "size": "5.5-inch",
          "resolution": "1920x1080"
        },
        {
          "type": "High-Bright Remote Monitor (Optional)"
        }
      ],
      "lensMount": [
        "DJI DL Mount (Native)",
        "PL (adapted)",
        "E-mount (adapted)"
      ],
      "timecode": [
        {
          "type": "No dedicated BNC",
          "notes": "Timecode sync via software/accessories"
        }
      ]
    },
    "Sony FX30": {
      "powerDrawWatts": 5.6,
      "power": {
        "input": {
          "voltageRange": "7.2V DC (battery) / 9V DC (USB-C PD)",
          "portType": "Battery Slot / USB Type-C®",
          "powerDrawWatts": 5.6
        },
        "internalBattery": {
          "type": "NP-FZ100",
          "batteryLifeMinutes": 175
        },
        "batteryPlateSupport": [
          "NP-FZ100 (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB Type-C®",
            "voltage": "9V",
            "current": "3A",
            "wattage": 27,
            "notes": "Power Delivery for continuous power/charging [S1.2, S1.3]"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type-A",
          "notes": "Supports 4672 x 2628 (59.94p/50p/29.97p/25p/23.98p), 16 bit RAW output [S1.1]"
        }
      ],
      "fizConnectors": [
        {
          "type": "Multi/Micro USB",
          "notes": "For specific accessories/control"
        },
        {
          "type": "USB Type-C®",
          "notes": "For specific accessories/control"
        }
      ],
      "recordingMedia": [
        "CFexpress Type A",
        "SD (UHS-II/UHS-I)"
      ],
      "viewfinder": [
        {
          "type": "LCD Monitor (Native)",
          "size": "3.0-type (7.5 cm)",
          "resolution": "Approx. 2.36M dots",
          "notes": "Vari-angle touch panel [S1.1]"
        }
      ],
      "lensMount": [
        "Sony E-mount (Native)"
      ],
      "timecode": [
        {
          "type": "Multi/Micro USB (TC IN)",
          "notes": "Timecode Input [S1.1]"
        }
      ]
    },
    "Panasonic Lumix BS1H": {
      "powerDrawWatts": 8.1,
      "power": {
        "input": {
          "voltageRange": "12V DC (11.4V to 12.6V)",
          "portType": "Weipu SF610/S2 (12VDC) Input",
          "powerDrawWatts": 8.1
        },
        "internalBattery": {
          "type": "None",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": []
      },
      "videoOutputs": [
        {
          "type": "3G-SDI",
          "count": 1,
          "notes": "Output [2.3]"
        },
        {
          "type": "HDMI 2.0",
          "count": 1,
          "notes": "Output, Raw 12-Bit via HDMI [2.3]"
        }
      ],
      "fizConnectors": [
        {
          "type": "2.5 mm Sub-Mini (LANC)",
          "notes": "Control Input [2.3]"
        },
        {
          "type": "USB-C (USB 3.2 / 3.1 Gen 1)",
          "notes": "Control/Data/Video Input [2.3]"
        },
        {
          "type": "RJ45 (LAN)",
          "notes": "Control/Monitor/Video Input/Output [2.3]"
        }
      ],
      "recordingMedia": [
        "SD memory card / SDHC memory card / SDXC memory card (UHS-II V90 recommended)",
        "Dual slot recording function available [P2.1]"
      ],
      "viewfinder": [
        {
          "type": "None",
          "notes": "Box camera design, requires external monitor"
        }
      ],
      "lensMount": [
        "Leica Camera AG L-Mount (Native)"
      ],
      "timecode": [
        {
          "type": "BNC (Timecode)",
          "notes": "Data Input/Output [2.3]"
        }
      ]
    },
    "Sony ZV-E1": {
      "powerDrawWatts": 7,
      "power": {
        "input": {
          "voltageRange": "7.2V DC (battery) / 5V DC (USB-C PD)",
          "portType": "Battery Slot / USB Type-C®",
          "powerDrawWatts": 7
        },
        "internalBattery": {
          "type": "NP-FZ100",
          "batteryLifeMinutes": 175
        },
        "batteryPlateSupport": [
          "NP-FZ100 (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": []
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type-A",
          "notes": "YCbCr 4:2:2 10 bit / RGB 8 bit [S3.1]"
        }
      ],
      "fizConnectors": [
        {
          "type": "USB Type-C®",
          "notes": "For specific accessories/control"
        }
      ],
      "recordingMedia": [
        "SD (UHS-II/UHS-I)"
      ],
      "viewfinder": [
        {
          "type": "LCD Monitor (Native)",
          "size": "3.0-type (7.5 cm)",
          "resolution": "Approx. 1.03M dots",
          "notes": "Vari-angle touch panel [S3.1]"
        }
      ],
      "lensMount": [
        "Sony E-mount (Native)"
      ],
      "timecode": []
    },
    "Fujifilm X-M5": {
      "powerDrawWatts": 5.5,
      "power": {
        "input": {
          "voltageRange": "7.2V (battery) / USB-C",
          "portType": "Battery Slot / USB-C",
          "powerDrawWatts": 5.5
        },
        "internalBattery": {
          "type": "NP-W126S",
          "batteryLifeMinutes": 45
        },
        "batteryPlateSupport": [
          "NP-W126S (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C",
            "notes": "For charging or powering small accessories"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "Micro HDMI",
          "count": 1,
          "notes": "4:2:2 10-bit output [4.1]"
        }
      ],
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "For camera control"
        }
      ],
      "recordingMedia": [
        "SDXC (UHS-I)"
      ],
      "viewfinder": [
        {
          "type": "None",
          "notes": "No built-in viewfinder, relies on LCD [4.1]"
        },
        {
          "type": "LCD Monitor (Native)",
          "size": "3.0-inch",
          "resolution": "1.04 million dots",
          "notes": "Vari-angle touchscreen [4.1]"
        }
      ],
      "lensMount": [
        "Fujifilm X-mount (Native)"
      ],
      "timecode": [
        {
          "type": "No dedicated BNC",
          "notes": "Timecode sync via software/accessories"
        }
      ]
    },
    "Canon EOS R5 Mark II": {
      "powerDrawWatts": 15,
      "power": {
        "input": {
          "voltageRange": "7.2V (LP-E6P) / USB-C PD (45W+ recommended)",
          "portType": "Battery Slot / USB-C PD",
          "powerDrawWatts": 15
        },
        "internalBattery": {
          "type": "LP-E6P",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "LP-E6P (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C PD",
            "notes": "For charging or powering camera/accessories [S5.1]"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type-A",
          "notes": "RAW/SRAW Video: 8K DCI (17:9) / 4K DCI (17:9) [S5.3]"
        }
      ],
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "For camera control"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B",
        "SD UHS-II"
      ],
      "viewfinder": [
        {
          "type": "OLED EVF",
          "resolution": "Approx. 5.76 million dots"
        },
        {
          "type": "LCD Monitor (Native)",
          "size": "3.2-inch",
          "resolution": "Approx. 2.1 million dots",
          "notes": "Vari-angle touchscreen"
        }
      ],
      "lensMount": [
        "Canon RF mount (Native)"
      ],
      "timecode": [
        {
          "type": "No dedicated BNC",
          "notes": "Timecode sync via HDMI or software"
        }
      ]
    },
    "Canon EOS R1": {
      "powerDrawWatts": 18,
      "power": {
        "input": {
          "voltageRange": "7.2V (LP-E19) / USB-C PD",
          "portType": "Battery Slot / USB-C PD",
          "powerDrawWatts": 18
        },
        "internalBattery": {
          "type": "LP-E19",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "LP-E19 (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C PD",
            "notes": "For charging or powering camera/accessories [S6.1]"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "count": 1,
          "version": "Type-A"
        }
      ],
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "For camera control"
        }
      ],
      "recordingMedia": [
        "CFexpress Type B (Dual Slots)"
      ],
      "viewfinder": [
        {
          "type": "OLED EVF",
          "resolution": "High-resolution"
        },
        {
          "type": "LCD Monitor (Native)",
          "size": "Vari-angle touchscreen"
        }
      ],
      "lensMount": [
        "Canon RF mount (Native)"
      ],
      "timecode": [
        {
          "type": "No dedicated BNC",
          "notes": "Timecode sync via software/accessories"
        }
      ]
    },
    "Leica SL3-S": {
      "powerDrawWatts": 10,
      "power": {
        "input": {
          "voltageRange": "7.2V (battery) / USB-C",
          "portType": "Battery Slot / USB-C",
          "powerDrawWatts": 10
        },
        "internalBattery": {
          "type": "Leica BP-SCL6",
          "batteryLifeMinutes": null
        },
        "batteryPlateSupport": [
          "Leica BP-SCL6 (Native)",
          "V-Mount (adapted)",
          "Gold Mount (adapted)"
        ],
        "powerDistributionOutputs": [
          {
            "type": "USB-C",
            "notes": "For charging or powering accessories"
          }
        ]
      },
      "videoOutputs": [
        {
          "type": "HDMI",
          "count": 1,
          "version": "2.1 Type A"
        }
      ],
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "For camera control"
        }
      ],
      "recordingMedia": [
        "UHS-II SD",
        "CFexpress Type B"
      ],
      "viewfinder": [
        {
          "type": "OLED EVF",
          "resolution": "High-resolution"
        },
        {
          "type": "LCD Monitor (Native)",
          "size": "Vari-angle touchscreen"
        }
      ],
      "lensMount": [
        "Leica L bayonet (Native)"
      ],
      "timecode": [
        {
          "type": "Timecode interface",
          "notes": "Timecode synchronization of image and sound [S7.1, S7.2]"
        }
      ]
    },
    "None": {
      "powerDrawWatts": 0
    }
  },
  "monitors": {
    "SmallHD Ultra 7": {
      "powerDrawWatts": 37.5
    },
    "SmallHD Ultra 7 Bolt 6 TX": {
      "powerDrawWatts": 55
    },
    "SmallHD Cine 7": {
      "powerDrawWatts": 30
    },
    "SmallHD Cine 7 Bolt 4K TX": {
      "powerDrawWatts": 50
    },
    "SmallHD Indie 7": {
      "powerDrawWatts": 17.3
    },
    "SmallHD Indie 7 Bolt 4k TX": {
      "powerDrawWatts": 37.3
    },
    "SmallHD Focus 7": {
      "powerDrawWatts": 9
    },
    "SmallHD Ultra 5": {
      "powerDrawWatts": 31.5
    },
    "SmallHD Ultra 5 Bolt 6 TX": {
      "powerDrawWatts": 50
    },
    "SmallHD Cine 5": {
      "powerDrawWatts": 24
    },
    "SmallHD Cine 5 Bolt 6 TX": {
      "powerDrawWatts": 44
    },
    "SmallHD Indie 5": {
      "powerDrawWatts": 17.3
    },
    "SmallHD Focus 5": {
      "powerDrawWatts": 8
    },
    "Hollyland Pyro 7 (TX)": {
      "powerDrawWatts": 22
    },
    "Hollyland Mars M1 Enhanced": {
      "powerDrawWatts": 16
    },
    "Portkeys BM5 III": {
      "powerDrawWatts": 16
    },
    "Portkeys LH5H": {
      "powerDrawWatts": 12
    },
    "Portkeys BM7 II DS": {
      "powerDrawWatts": 15
    },
    "Portkeys PT5 II": {
      "powerDrawWatts": 7
    },
    "Atomos Ninja V": {
      "powerDrawWatts": 22
    },
    "Atomos Ninja V+": {
      "powerDrawWatts": 22
    },
    "Atomos Shinobi 5": {
      "powerDrawWatts": 7
    },
    "Atomos Shinobi 7": {
      "powerDrawWatts": 7
    },
    "Feelworld FW568": {
      "powerDrawWatts": 11
    },
    "Feelworld F6 Plus": {
      "powerDrawWatts": 9
    },
    "Andycine A6 Pro": {
      "powerDrawWatts": 9
    },
    "Lilliput A7S": {
      "powerDrawWatts": 12
    },
    "None": {
      "powerDrawWatts": 0
    }
  },
  "video": {
    "Teradek Bolt 6 LT": {
      "powerDrawWatts": 9
    },
    "Teradek Bolt 6 XT": {
      "powerDrawWatts": 20
    },
    "Teradek Bolt 6 MAX": {
      "powerDrawWatts": 20
    },
    "Teradek Bolt 4K LT": {
      "powerDrawWatts": 9
    },
    "Teradek Bolt 4K XT": {
      "powerDrawWatts": 20
    },
    "Teradek Bolt Pro 300 (TX)": {
      "powerDrawWatts": 6.5
    },
    "Teradek Bolt Pro 600 (TX)": {
      "powerDrawWatts": 4
    },
    "Teradek Bolt Pro 2000 (TX)": {
      "powerDrawWatts": 7.7
    },
    "Teradek Bolt Pro 500 (TX)": {
      "powerDrawWatts": 7.3
    },
    "Teradek Bolt Pro 750 (TX)": {
      "powerDrawWatts": 7.5
    },
    "Teradek Bolt Pro 1000 (TX)": {
      "powerDrawWatts": 7.5
    },
    "Teradek Bolt 3000 (TX)": {
      "powerDrawWatts": 7.5
    },
    "Teradek Bolt 10000 (TX)": {
      "powerDrawWatts": 7.5
    },
    "Hollyland Pyro S (TX)": {
      "powerDrawWatts": 11
    },
    "Hollyland Mars 300 Pro (TX)": {
      "powerDrawWatts": 11
    },
    "Hollyland Mars 400S Pro (TX)": {
      "powerDrawWatts": 11
    },
    "DJI SDR Transmission": {
      "powerDrawWatts": 11
    },
    "DJI Transmission": {
      "powerDrawWatts": 11
    },
    "Vaxis Storm 800": {
      "powerDrawWatts": 6
    },
    "Vaxis Storm 1000": {
      "powerDrawWatts": 6.5
    },
    "Vaxis Storm 3000": {
      "powerDrawWatts": 6
    },
    "Dwarf Connection LR1": {
      "powerDrawWatts": 6
    },
    "Accsoon CineEye 2S Pro (TX)": {
      "powerDrawWatts": 4.5
    },
    "Accsoon CineEye II (TX)": {
      "powerDrawWatts": 3.5
    },
    "Accsoon CineView HE (TX)": {
      "powerDrawWatts": 4.5
    },
    "Accsoon CineView SE (TX)": {
      "powerDrawWatts": 4.5
    },
    "Accsoon CineView Nano (TX)": {
      "powerDrawWatts": 2.5
    },
    "Accsoon CineView Quad (TX)": {
      "powerDrawWatts": 4.5
    },
    "Accsoon CineView Master 4K": {
      "powerDrawWatts": 15
    },
    "None": {
      "powerDrawWatts": 0
    }
  },
  "fiz": {
    "motors": {
      "None": {
        "powerDrawWatts": 0
      },
      "Tilta Nucleus M (per motor)": {
        "powerDrawWatts": 20
      },
      "Tilta Nucleus M2 (per motor)": {
        "powerDrawWatts": 50
      },
      "Tilta Nucleus Nano (per motor)": {
        "powerDrawWatts": 5
      },
      "Tilta Nucleus Nano II (per motor)": {
        "powerDrawWatts": 25
      },
      "Arri Cforce Mini (peak)": {
        "powerDrawWatts": 20
      },
      "Arri Cforce Plus (peak)": {
        "powerDrawWatts": 32
      },
      "Teradek RT Motion FIZ Motor": {
        "powerDrawWatts": 18
      },
      "Preston DM1X (peak)": {
        "powerDrawWatts": 32.4
      },
      "Preston DM2 (peak)": {
        "powerDrawWatts": 22.2
      },
      "Preston DM2X (peak)": {
        "powerDrawWatts": 22.2
      },
      "Preston DM-A (peak)": {
        "powerDrawWatts": 18
      },
      "Preston DM-C (peak)": {
        "powerDrawWatts": 18
      },
      "Chrosziel CDM-100 (peak)": {
        "powerDrawWatts": 6
      },
      "Chrosziel CDM-M (peak)": {
        "powerDrawWatts": 6
      },
      "DJI Focus Motor (Original)": {
        "powerDrawWatts": 30
      },
      "DJI RS Focus Motor": {
        "powerDrawWatts": 22.4
      },
      "Cmotion cPRO Motor (base unit/receiver function)": {
        "powerDrawWatts": 20
      },
      "SmallRig Wireless Follow Focus Motor": {
        "powerDrawWatts": 12
      },
      "Redrock MicroRemote Torque Motor": {
        "powerDrawWatts": 54
      }
    },
    "controllers": {
      "None": {
        "powerDrawWatts": 0
      },
      "Arri OCU-1": {
        "powerDrawWatts": 1.32
      },
      "Arri ZMU-4 (body only, wired)": {
        "powerDrawWatts": 3
      },
      "Arri UMC-4": {
        "powerDrawWatts": 1.68
      },
      "Arri RIA-1": {
        "powerDrawWatts": 2.5
      },
      "Arri Master Grip (single unit)": {
        "powerDrawWatts": 0.72
      },
      "Tilta Nucleus-M Hand Grip (single)": {
        "powerDrawWatts": 0.5
      },
      "Tilta Nucleus-M II Handle (single)": {
        "powerDrawWatts": 0.5
      },
      "Preston MDR4": {
        "powerDrawWatts": 48
      },
      "ARRI ECM-1": {
        "powerDrawWatts": 84
      },
      "Redrock microRemote Basestation": {
        "powerDrawWatts": 54
      },
      "ARRI LBUS Distributor (LBS-1)": {
        "powerDrawWatts": 0.24
      },
      "Cmotion compact LCS receiver": {
        "powerDrawWatts": 20
      },
      "Teradek RT Motion CTRL.3 Controller": {
        "powerDrawWatts": 15
      }
    },
    "distance": {
      "None": {
        "powerDrawWatts": 0
      },
      "UDM-1 + LCube": {
        "powerDrawWatts": 6.24
      },
      "Focusbug Cine RT + LCube": {
        "powerDrawWatts": 15.24
      },
      "ARRI LCube": {
        "powerDrawWatts": 0.24
      },
      "Preston Light Ranger 2 (LR2) Main Sensor": {
        "powerDrawWatts": 20
      },
      "Teradek TOF.1 Range Finder Module": {
        "powerDrawWatts": 3.6
      },
      "DJI LiDAR Range Finder": {
        "powerDrawWatts": 6.8
      }
    }
  },
  "batteries": {
    "None": {
      "capacity": 0,
      "pinA": 0,
      "dtapA": 0
    },
    "Bebob V45micro": {
      "capacity": 43,
      "pinA": 10,
      "dtapA": 5
    },
    "Bebob V98micro": {
      "capacity": 95,
      "pinA": 10,
      "dtapA": 5
    },
    "Bebob V150micro": {
      "capacity": 143,
      "pinA": 10,
      "dtapA": 5
    },
    "Bebob V200micro": {
      "capacity": 190,
      "pinA": 10,
      "dtapA": 5
    },
    "Bebob V240micro": {
      "capacity": 238,
      "pinA": 10,
      "dtapA": 5
    },
    "Bebob V90RM-Cine": {
      "capacity": 85,
      "pinA": 20,
      "dtapA": 5
    },
    "Bebob V155RM-Cine": {
      "capacity": 156,
      "pinA": 20,
      "dtapA": 5
    },
    "Bebob V290RM-Cine": {
      "capacity": 285,
      "pinA": 20,
      "dtapA": 5
    },
    "Bebob B90cine": {
      "capacity": 86,
      "pinA": 20,
      "dtapA": 5
    },
    "Bebob B155cine": {
      "capacity": 155,
      "pinA": 20,
      "dtapA": 5
    },
    "Bebob B290cine": {
      "capacity": 294,
      "pinA": 20,
      "dtapA": 5
    },
    "Bebob B480cine": {
      "capacity": 475,
      "pinA": 20,
      "dtapA": 5
    },
    "Bebob B90cineML": {
      "capacity": 86,
      "pinA": 20,
      "dtapA": 5
    },
    "Bebob B155cineML": {
      "capacity": 156,
      "pinA": 20,
      "dtapA": 5
    },
    "Swit MINO-S70 (V-Mount)": {
      "capacity": 70,
      "pinA": 8.3,
      "dtapA": 6
    },
    "Swit MINO-S140 (V-Mount)": {
      "capacity": 140,
      "pinA": 12.5,
      "dtapA": 8
    },
    "Swit MINO-S210 (V-Mount)": {
      "capacity": 210,
      "pinA": 16,
      "dtapA": 10
    },
    "Swit PB-M98S (Mini V-Mount)": {
      "capacity": 98,
      "pinA": 10,
      "dtapA": 6
    },
    "Swit PB-R290S (V-Mount)": {
      "capacity": 290,
      "pinA": 18,
      "dtapA": 10
    },
    "Swit PB-H260S (V-Mount)": {
      "capacity": 260,
      "pinA": 18,
      "dtapA": 10
    },
    "Swit HB-A290B (B-Mount)": {
      "capacity": 290,
      "pinA": 10,
      "dtapA": 3.75
    },
    "Swit PB-H290B (B-Mount)": {
      "capacity": 290,
      "pinA": 10,
      "dtapA": 3.75
    },
    "Swit BIVO-98 (B-Mount)": {
      "capacity": 98,
      "pinA": 10,
      "dtapA": 10.4
    },
    "Swit BIVO-160 (B-Mount)": {
      "capacity": 160,
      "pinA": 10,
      "dtapA": 10.4
    },
    "Swit BIVO-200 (B-Mount)": {
      "capacity": 196,
      "pinA": 10,
      "dtapA": 10.4
    },
    "Swit CIMO-98S (V-Mount)": {
      "capacity": 98,
      "pinA": 12,
      "dtapA": 12
    },
    "Swit CIMO-160S (V-Mount)": {
      "capacity": 160,
      "pinA": 16,
      "dtapA": 16
    },
    "Swit CIMO-200S (V-Mount)": {
      "capacity": 196,
      "pinA": 16,
      "dtapA": 16
    },
    "Swit CIMO-290S (V-Mount)": {
      "capacity": 290,
      "pinA": 20,
      "dtapA": 20
    },
    "Anton/Bauer Titon 90 (V-Mount)": {
      "capacity": 92,
      "pinA": 10,
      "dtapA": 5
    },
    "Anton/Bauer Titon 150 (V-Mount)": {
      "capacity": 144,
      "pinA": 10,
      "dtapA": 5
    },
    "Anton/Bauer Titon 240 (V-Mount)": {
      "capacity": 240,
      "pinA": 10,
      "dtapA": 5
    },
    "Anton/Bauer Dionic XT90 (V-Mount)": {
      "capacity": 99,
      "pinA": 12,
      "dtapA": 5
    },
    "Anton/Bauer Dionic XT150 (V-Mount)": {
      "capacity": 156,
      "pinA": 12,
      "dtapA": 5
    },
    "Anton/Bauer Dionic 240Wh (V-Mount)": {
      "capacity": 240,
      "pinA": 12,
      "dtapA": 5
    },
    "Anton/Bauer Dionic 26V 98Wh (B-Mount)": {
      "capacity": 98,
      "pinA": 12,
      "dtapA": 0
    },
    "Anton/Bauer Dionic 26V 240Wh (B-Mount)": {
      "capacity": 240,
      "pinA": 12,
      "dtapA": 0
    },
    "Core SWX NANO Micro 98Wh (V-Mount)": {
      "capacity": 98,
      "pinA": 10,
      "dtapA": 10
    },
    "Core SWX NANO Micro 150Wh (V-Mount)": {
      "capacity": 150,
      "pinA": 10,
      "dtapA": 10
    },
    "Core SWX Helix Max 98Wh (V-Mount)": {
      "capacity": 98,
      "pinA": 20,
      "dtapA": 7.14
    },
    "Core SWX Helix Max 150Wh (V-Mount)": {
      "capacity": 147,
      "pinA": 20,
      "dtapA": 7.14
    },
    "Core SWX Helix Max 360Wh (V-Mount)": {
      "capacity": 360,
      "pinA": 20,
      "dtapA": 7.14
    },
    "Core SWX Helix Max 98Wh (B-Mount)": {
      "capacity": 98,
      "pinA": 10,
      "dtapA": 0
    },
    "Core SWX Helix Max 150Wh (B-Mount)": {
      "capacity": 147,
      "pinA": 10,
      "dtapA": 0
    },
    "Core SWX Apex 150 (V-Mount)": {
      "capacity": 150,
      "pinA": 16,
      "dtapA": 12
    },
    "Core SWX Apex 360 (V-Mount)": {
      "capacity": 360,
      "pinA": 16,
      "dtapA": 12
    },
    "IDX Imicro-98 (V-Mount)": {
      "capacity": 97,
      "pinA": 10,
      "dtapA": 5.56
    },
    "IDX Imicro-150 (V-Mount)": {
      "capacity": 145,
      "pinA": 10,
      "dtapA": 5.56
    },
    "IDX DUO-C98 (V-Mount)": {
      "capacity": 97,
      "pinA": 10,
      "dtapA": 5.56
    },
    "IDX DUO-C150 (V-Mount)": {
      "capacity": 143,
      "pinA": 14,
      "dtapA": 5.56
    },
    "IDX DUO-C198 (V-Mount)": {
      "capacity": 196,
      "pinA": 14,
      "dtapA": 5.56
    },
    "IDX CUE-D95 (V-Mount)": {
      "capacity": 91,
      "pinA": 10,
      "dtapA": 5
    },
    "IDX CUE-D150 (V-Mount)": {
      "capacity": 146,
      "pinA": 10,
      "dtapA": 5
    },
    "IDX HV-160B (B-Mount)": {
      "capacity": 160,
      "pinA": 15,
      "dtapA": 10
    },
    "IDX HV-320B (B-Mount)": {
      "capacity": 320,
      "pinA": 15,
      "dtapA": 10
    },
    "SmallRig VB50 mini (V-Mount)": {
      "capacity": 50,
      "pinA": 8,
      "dtapA": 10
    },
    "SmallRig VB99 mini (V-Mount)": {
      "capacity": 99,
      "pinA": 10,
      "dtapA": 10
    },
    "SmallRig VB155 mini (V-Mount)": {
      "capacity": 155,
      "pinA": 12,
      "dtapA": 10
    },
    "SmallRig VB210 mini (V-Mount)": {
      "capacity": 210,
      "pinA": 14,
      "dtapA": 10
    },
    "SmallRig VB99 Pro mini (V-Mount)": {
      "capacity": 99,
      "pinA": 10,
      "dtapA": 10
    },
    "SmallRig VB212 mini (V-Mount)": {
      "capacity": 212,
      "pinA": 14.7,
      "dtapA": 10
    },
    "Hawk-Woods Mini V-Lok 50Wh": {
      "capacity": 50,
      "pinA": 6,
      "dtapA": 5
    },
    "Hawk-Woods Mini V-Lok 98Wh": {
      "capacity": 98,
      "pinA": 10,
      "dtapA": 5
    },
    "Hawk-Woods Mini V-Lok 150Wh": {
      "capacity": 150,
      "pinA": 12,
      "dtapA": 5
    },
    "Hawk-Woods Mini V-Lok 200Wh": {
      "capacity": 200,
      "pinA": 16,
      "dtapA": 5
    },
    "Hawk-Woods Mini V-Lok 250Wh": {
      "capacity": 250,
      "pinA": 16,
      "dtapA": 5
    },
    "Hawk-Woods V-Lok 95Wh (VL-95S)": {
      "capacity": 95,
      "pinA": 10,
      "dtapA": 5
    },
    "Hawk-Woods V-Lok 200Wh (VL-200S)": {
      "capacity": 200,
      "pinA": 16,
      "dtapA": 5
    },
    "Hawk-Woods V-Lok 350Wh (VL-350N High Performance)": {
      "capacity": 350,
      "pinA": 15,
      "dtapA": 5
    },
    "Hawk-Woods X-Lok 98Wh (XL-98)": {
      "capacity": 98,
      "pinA": 10,
      "dtapA": 5
    },
    "Hawk-Woods X-Lok 150Wh (XL-150)": {
      "capacity": 150,
      "pinA": 12,
      "dtapA": 5
    }
  }
};
if (typeof module !== "undefined" && module.exports) {
  module.exports = devices;
}
