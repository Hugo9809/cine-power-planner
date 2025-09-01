(() => {
const cameraData = {
  "Arri Alexa Mini LF": {
    "powerDrawWatts": 89,
    "power": {
      "input": {
        "voltageRange": "11-34",
        "type": "Bat LEMO 8-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "B-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "native",
          "notes": ""
        }
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
        "type": "LBUS (LEMO 4-pin)",
        "notes": "On lens mount, for lens motors"
      },
      {
        "type": "EXT LEMO 7-pin",
        "notes": "For camera control, incl. FIZ with compatible systems"
      }
    ],
    "recordingMedia": [
      {
        "type": "Codex Compact Drive",
        "notes": "1TB, 2TB"
      }
    ],
    "viewfinder": [
      {
        "type": "ARRI MVF-2 (Native)",
        "resolution": "1920x1080",
        "notes": "OLED eyepiece + LCD fold-out monitor"
      }
    ],
    "lensMount": [
      {
        "type": "LPL",
        "mount": "native",
        "notes": "Supports ARRI LDS-2 and Cooke /i lens data"
      },
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "PL",
        "mount": "adapted",
        "notes": "No ARRI LDS or Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "adapted",
        "notes": "Supports Canon EF electronic lens data"
      },
      {
        "type": "M",
        "mount": "adapted",
        "notes": "No electronic lens communication"
      },
      {
        "type": "PV",
        "mount": "adapted",
        "notes": "Supports Panavision lens data"
      },
      {
        "type": "PV70",
        "mount": "adapted",
        "notes": "Supports Panavision lens data"
      },
      {
        "type": "XPL52",
        "mount": "adapted",
        "notes": "No ARRI LDS or Cooke /i lens data"
      }
    ],
    "timecode": [
      {
        "type": "LEMO 5-pin",
        "notes": "LTC Timecode In/Out"
      },
      {
        "type": "SYNC",
        "notes": "Black burst/tri-level sync"
      }
    ],
    "weight_g": 2600,
    "recordingCodecs": [
      "MXF/ARRIRAW",
      "ProRes 4444 XQ",
      "ProRes 4444",
      "ProRes 422 HQ",
      "ProRes 422"
    ],
    "sensorModes": [
      "LF Open Gate 4.5K (3:2)",
      "LF 16:9",
      "LF 2.39:1",
      "S35 3:2",
      "S35 16:9"
    ],
    "resolutions": [
      "4448×3096",
      "3840×2160",
      "4448×1856",
      "3424×2202",
      "3200×1800",
      "2880×1620",
      "2048×1152",
      "1920×1080"
    ]
  },
  "Arri Alexa Mini": {
    "powerDrawWatts": 84,
    "power": {
      "input": {
        "voltageRange": "11-34",
        "type": "Bat LEMO 8-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "B-Mount",
          "mount": "adapted",
          "notes": "via adapter"
        }
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
        "type": "LBUS (LEMO 4-pin)",
        "notes": "On lens mount, for lens motors"
      },
      {
        "type": "EXT LEMO 7-pin",
        "notes": "For camera control, incl. FIZ with compatible systems"
      }
    ],
    "recordingMedia": [
      {
        "type": "CFast 2.0",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "ARRI MVF-1 (Native)",
        "resolution": "1280x720",
        "notes": "OLED eyepiece"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "adapted",
        "notes": "Supports Canon EF electronic lens data"
      },
      {
        "type": "B4",
        "mount": "adapted",
        "notes": "Analog servo connectors, limited lens data"
      },
      {
        "type": "LPL",
        "mount": "adapted",
        "notes": "No ARRI LDS or Cooke /i lens data"
      },
      {
        "type": "PL",
        "mount": "adapted",
        "notes": "No ARRI LDS or Cooke /i lens data"
      }
    ],
      "timecode": [
        {
          "type": "LEMO 5-pin",
          "notes": "LTC Timecode In/Out"
        },
        {
          "type": "SYNC",
          "notes": "Black burst/tri-level sync"
        },
        {
          "type": "EXT LEMO 7-pin",
          "notes": "For multi-camera sync with ARRI EDB-2 EXT Distribution Box"
        }
      ],
      "weight_g": 2300,
      "recordingCodecs": [
        "ARRIRAW",
        "ProRes 4444 XQ",
        "ProRes 4444",
        "ProRes 422 HQ",
        "ProRes 422",
        "ProRes 422 LT"
      ],
      "sensorModes": [
        "S16 HD 1600×900",
        "HD 2880×1620",
        "2K 2868×1612",
        "3.2K 3200×1800",
        "UHD 3840×2160 (upsampled from 3.2K)",
        "4:3 2.8K 2880×2160",
        "ARRIRAW 16:9 2.8K 2880×1620",
        "ARRIRAW Open Gate 3.4K 3424×2202"
      ],
      "resolutions": [
        "HD 1920×1080",
        "2K 2048×1152",
        "3.2K 3200×1800",
        "UHD 3840×2160"
      ]
    },
  "Arri Alexa 35": {
    "powerDrawWatts": 110,
    "power": {
      "input": {
        "voltageRange": "19.5-34",
        "type": "Bat LEMO 8-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "B-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
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
          "type": "EXT LEMO 7-pin",
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
        "type": "EXT LEMO 7-pin",
        "notes": "For camera control, incl. FIZ with compatible systems"
      }
    ],
    "recordingMedia": [
      {
        "type": "Codex Compact Drive",
        "notes": "1TB, 2TB"
      }
    ],
    "viewfinder": [
      {
        "type": "ARRI MVF-2 (Native)",
        "resolution": "1920x1080",
        "notes": "OLED eyepiece + LCD fold-out monitor"
      }
    ],
    "lensMount": [
      {
        "type": "LPL",
        "mount": "native",
        "notes": "Supports ARRI LDS-2 and Cooke /i lens data"
      },
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "PL",
        "mount": "adapted",
        "notes": "No ARRI LDS or Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "adapted",
        "notes": "Supports Canon EF electronic lens data"
      }
    ],
    "timecode": [
      {
        "type": "LEMO 5-pin",
        "notes": "LTC Timecode In/Out"
      },
      {
        "type": "SYNC",
        "notes": "Black burst/tri-level sync"
      },
      {
        "type": "EXT LEMO 7-pin",
        "notes": "For multi-camera sync"
      }
    ]
  },
  "Arri Amira": {
    "powerDrawWatts": 50,
    "power": {
      "input": {
        "voltageRange": "10.5-34",
        "type": "XLR 4-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "Hirose 12-pin",
          "notes": "For ENG type zoom lenses"
        },
        {
          "type": "D-Tap",
          "voltage": "12V",
          "notes": "Power output"
        },
        {
          "type": "Hirose 4-pin",
          "voltage": "12V",
          "notes": "Power output"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "notes": "Power output"
        },
        {
          "type": "Fischer 3-pin",
          "voltage": "24V",
          "notes": "Power output"
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "3G-SDI",
        "notes": "Uncompressed HD/UHD video with embedded audio and metadata"
      },
      {
        "type": "3G-SDI",
        "notes": "Uncompressed HD/UHD video with embedded audio and metadata"
      }
    ],
    "fizConnectors": [
      {
        "type": "Hirose 12-pin",
        "notes": "For ENG type zoom lenses (FIZ control)"
      },
      {
        "type": "Hirose 12-pin",
        "notes": "For electronic lens data and control"
      }
    ],
    "recordingMedia": [
      {
        "type": "CFast 2.0",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "AMIRA Multi Viewfinder MVF-1",
        "notes": "OLED eyepiece and fold-away LCD monitor"
      }
    ],
    "lensMount": [
      {
        "type": "B4",
        "mount": "native",
        "notes": "Analog servo connectors, limited lens data"
      },
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      },
      {
        "type": "F",
        "mount": "native",
        "notes": "Supports Nikon F electronic lens data when available"
      }
    ],
    "timecode": [
      {
        "type": "BNC",
        "notes": "Yes"
      }
    ],
    "weight_g": 4100,
    "recordingCodecs": [
      "ProRes 4444 XQ",
      "ProRes 4444",
      "ProRes 422 HQ",
      "ProRes 422",
      "ProRes 422 LT",
      "MPEG-2 (AMIRA only)"
    ],
    "sensorModes": [
      "S16 HD 1600×900",
      "HD 2880×1620",
      "2K 2868×1612",
      "3.2K 3200×1800",
      "4K UHD 3200×1800 (UHD option)",
      "ARRIRAW 16:9 2.8K 2880×1620"
    ],
    "resolutions": [
      "HD 1920×1080",
      "2K 2048×1152",
      "3.2K 3200×1800",
      "UHD 3840×2160 (with UHD option)"
    ]
  },
  "Sony Venice 2": {
    "powerDrawWatts": 76,
    "power": {
      "input": {
        "voltageRange": "12 (11.0-17.0) / 24 (22.0-32.0)",
        "type": "XLR 4-pin,Square 5-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "Fischer 3-pin",
          "voltage": "24V",
          "current": "2.5A",
          "wattage": 60,
          "notes": "Regulated, 3A surge, 2.5A sustained shared"
        },
        {
          "type": "Fischer 3-pin",
          "voltage": "24V",
          "current": "2.5A",
          "wattage": 60,
          "notes": "Regulated, 3A surge, 2.5A sustained shared"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "7A",
          "wattage": null,
          "notes": "Unregulated, 7A shared"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "7A",
          "wattage": null,
          "notes": "Unregulated, 7A shared"
        },
        {
          "type": "D-Tap",
          "voltage": "12V",
          "current": "9A",
          "wattage": null,
          "notes": "Unregulated, 9A shared"
        },
        {
          "type": "D-Tap",
          "voltage": "12V",
          "current": "9A",
          "wattage": null,
          "notes": "Unregulated, 9A shared"
        },
        {
          "type": "USB-A",
          "voltage": "5V",
          "current": "2.5A",
          "wattage": 12.5,
          "notes": "USB-A"
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
      },
      {
        "type": "3G-SDI"
      },
      {
        "type": "HDMI",
        "version": "Type A"
      }
    ],
    "fizConnectors": [
      {
        "type": "Hirose 12-pin",
        "notes": "For lens control"
      },
      {
        "type": "REMOTE B connector",
        "notes": "General remote control"
      }
    ],
    "recordingMedia": [
      {
        "type": "AXS Memory A-Series slot",
        "notes": ""
      },
      {
        "type": "SD Card",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "LEMO 26-pin port",
        "notes": "For Sony DVF-EL200 Viewfinder"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "E-mount",
        "mount": "native",
        "notes": "Supports Sony E-mount electronic lens data"
      },
      {
        "type": "LPL",
        "mount": "native",
        "notes": "Supports ARRI LDS-2 and Cooke /i lens data"
      }
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
    "powerDrawWatts": 60,
    "power": {
      "input": {
        "voltageRange": "12 (11.0-17.0) / 24 (22.0-32.0)",
        "type": "XLR 4-pin,Square 5-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "Fischer 3-pin",
          "voltage": "24V",
          "current": "2.5A",
          "wattage": 60,
          "notes": "Regulated, 3A surge, 2.5A sustained shared"
        },
        {
          "type": "Fischer 3-pin",
          "voltage": "24V",
          "current": "2.5A",
          "wattage": 60,
          "notes": "Regulated, 3A surge, 2.5A sustained shared"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "7A",
          "wattage": null,
          "notes": "Unregulated, 7A shared"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "7A",
          "wattage": null,
          "notes": "Unregulated, 7A shared"
        },
        {
          "type": "D-Tap",
          "voltage": "12V",
          "current": "9A",
          "wattage": null,
          "notes": "Unregulated, 9A shared"
        },
        {
          "type": "D-Tap",
          "voltage": "12V",
          "current": "9A",
          "wattage": null,
          "notes": "Unregulated, 9A shared"
        },
        {
          "type": "USB-A",
          "voltage": "5V",
          "current": "2.5A",
          "wattage": 12.5,
          "notes": "USB-A"
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
      },
      {
        "type": "3G-SDI"
      },
      {
        "type": "HDMI",
        "version": "Type A"
      }
    ],
    "fizConnectors": [
      {
        "type": "Hirose 12-pin",
        "notes": "For lens control"
      },
      {
        "type": "REMOTE B connector",
        "notes": "General remote control"
      }
    ],
    "recordingMedia": [
      {
        "type": "AXS Memory A-Series slot",
        "notes": ""
      },
      {
        "type": "SD Card",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "LEMO 26-pin port",
        "notes": "For Sony DVF-EL200 Viewfinder"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "E-mount",
        "mount": "native",
        "notes": "Supports Sony E-mount electronic lens data"
      },
      {
        "type": "LPL",
        "mount": "native",
        "notes": "Supports ARRI LDS-2 and Cooke /i lens data"
      }
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
  "Sony Burano": {
    "powerDrawWatts": 66,
    "power": {
      "input": {
        "voltageRange": "19.5",
        "type": "DC (Barrel)"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "14.4V",
          "wattage": 50,
          "notes": "Typical, via battery plate"
        },
        {
          "type": "D-Tap",
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
        "type": "LANC",
        "notes": "Remote control"
      },
      {
        "type": "USB-C",
        "notes": "For specific accessories/control"
      }
    ],
    "recordingMedia": [
      {
        "type": "CFexpress Type B",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "Sony Burano EVF Port (Proprietary)",
        "notes": "For Sony EVF"
      },
      {
        "type": "Integrated LCD monitor",
        "size": "3.5-inch",
        "resolution": "1280x720"
      }
    ],
    "lensMount": [
      {
        "type": "E-mount",
        "mount": "native",
        "notes": "Supports Sony E-mount electronic lens data"
      },
      {
        "type": "PL",
        "mount": "adapted",
        "notes": "No ARRI LDS or Cooke /i lens data"
      }
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
        "voltageRange": "7.2 (ia NP-FZ100) / 5 (ia USB-C)",
        "type": "Battery Slot,USB-C PD"
      },
      "batteryPlateSupport": [
        {
          "type": "NP-FZ100",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
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
      {
        "type": "CFexpress Type A",
        "notes": ""
      },
      {
        "type": "SD",
        "notes": "UHS-II/UHS-I"
      }
    ],
    "viewfinder": [
      {
        "type": "Integrated LCD monitor",
        "size": "3.0-inch",
        "resolution": "1.44M dots",
        "notes": "Vari-angle touchscreen"
      }
    ],
    "lensMount": [
      {
        "type": "E-mount",
        "mount": "native",
        "notes": "Supports Sony E-mount electronic lens data"
      }
    ],
    "timecode": [],
    "weight_g": 715,
    "recordingCodecs": [
      "XAVC S-I 10-bit 4:2:2",
      "XAVC S (H.264)",
      "XAVC HS (H.265)"
    ],
    "sensorModes": [
      "Full-Frame 4K (oversampled)",
      "Full-Frame HD",
      "S35 crop 4K"
    ],
    "resolutions": [
      "UHD 3840×2160 (up to 120p)",
      "HD 1920×1080 (up to 240p)"
    ]
  },
  "Sony FX6": {
    "powerDrawWatts": 18,
    "power": {
      "input": {
        "voltageRange": "19.5",
        "type": "DC (Barrel)"
      },
      "batteryPlateSupport": [
        {
          "type": "Sony L-Series InfoLithium",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "14.4V",
          "wattage": 50,
          "notes": "Via optional MID49 DB-11, per port (typical)"
        },
        {
          "type": "D-Tap",
          "voltage": "14.4V",
          "wattage": 50,
          "notes": "Via optional MID49 DB-11, per port (typical)"
        },
        {
          "type": "Fischer 3-pin",
          "voltage": "24V",
          "current": "2.5A",
          "wattage": 60,
          "notes": "Via optional MID49 DB-11, per port, with R/S"
        },
        {
          "type": "Fischer 3-pin",
          "voltage": "24V",
          "current": "2.5A",
          "wattage": 60,
          "notes": "Via optional MID49 DB-11, per port, with R/S"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "14.4V",
          "wattage": 24,
          "notes": "Via optional MID49 DB-11, per port (est. 2A)"
        },
        {
          "type": "LEMO 2-pin",
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
        "type": "LANC",
        "notes": "REMOTE connector"
      }
    ],
    "recordingMedia": [
      {
        "type": "CFexpress Type A",
        "notes": ""
      },
      {
        "type": "SD",
        "notes": "UHS-II/UHS-I"
      }
    ],
    "viewfinder": [
      {
        "type": "Integrated LCD monitor",
        "size": "3.5-inch",
        "notes": "Touch operation, flexible attachment"
      }
    ],
    "lensMount": [
      {
        "type": "E-mount",
        "mount": "native",
        "notes": "Supports Sony E-mount electronic lens data"
      },
      {
        "type": "PL",
        "mount": "adapted",
        "notes": "No ARRI LDS or Cooke /i lens data"
      }
    ],
    "timecode": [
      {
        "type": "Analog Audio Inputs",
        "notes": "2x mini XLR, 1x 3.5mm stereo input can be used for Timecode input"
      }
    ],
    "weight_g": 890,
    "recordingCodecs": [
      "XAVC-I",
      "XAVC-L"
    ],
    "sensorModes": [
      "Full Frame (DCI 4K/UHD/HD)",
      "Super 35 crop (HD)"
    ],
    "resolutions": [
      "4096×2160",
      "3840×2160",
      "1920×1080"
    ]
  },
  "Sony FX9": {
    "powerDrawWatts": 35.2,
    "power": {
      "input": {
        "voltageRange": "19.5",
        "type": "DC (Barrel)"
      },
      "batteryPlateSupport": [
        {
          "type": "BP-U",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "14.4V",
          "wattage": 50,
          "notes": "Via optional XDCA-FX9 extension unit, per port"
        },
        {
          "type": "D-Tap",
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
        "type": "LANC",
        "notes": "Remote control"
      },
      {
        "type": "USB-C",
        "notes": "For specific accessories/control"
      }
    ],
    "recordingMedia": [
      {
        "type": "XQD Card",
        "notes": ""
      },
      {
        "type": "SD Card",
        "notes": "for proxy/backup"
      }
    ],
    "viewfinder": [
      {
        "type": "Sony FX9 EVF Port (Proprietary)",
        "notes": "For Sony EVF"
      },
      {
        "type": "Integrated LCD monitor",
        "size": "3.5-inch",
        "resolution": "1280x720"
      }
    ],
    "lensMount": [
      {
        "type": "E-mount",
        "mount": "native",
        "notes": "Supports Sony E-mount electronic lens data"
      },
      {
        "type": "PL",
        "mount": "adapted",
        "notes": "No ARRI LDS or Cooke /i lens data"
      }
    ],
      "timecode": [
        {
          "type": "BNC",
          "notes": "Timecode In/Out"
        }
      ],
      "weight_g": 2000,
      "recordingCodecs": [
        "XAVC-I 4:2:2 10-bit",
        "XAVC-L 4:2:2 10-bit",
        "MPEG HD 422"
      ],
      "sensorModes": [
        "FF 6K oversample→4K",
        "S35 4K (DCI)",
        "FF HD",
        "S35 UHD"
      ],
      "resolutions": [
        "DCI 4K 4096×2160 (S35)",
        "UHD 3840×2160",
        "HD 1920×1080"
      ]
    },
  "Sony FS7 II": {
    "powerDrawWatts": 19,
    "power": {
      "input": {
        "voltageRange": "12-17",
        "type": "XLR 4-pin"
      },
      "batteryPlateSupport": [
        { "type": "BP-U", "mount": "native", "notes": "" },
        { "type": "V-Mount", "mount": "adapted", "notes": "" },
        { "type": "Gold-Mount", "mount": "adapted", "notes": "" }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "14.4V",
          "wattage": 50,
          "notes": "Via optional XDCA-FS7 extension unit, per port"
        },
        {
          "type": "D-Tap",
          "voltage": "14.4V",
          "wattage": 50,
          "notes": "Via optional XDCA-FS7 extension unit, per port"
        }
      ]
    },
    "videoOutputs": [
      { "type": "3G-SDI" },
      { "type": "HDMI" }
    ],
    "fizConnectors": [
      { "type": "LANC", "notes": "Remote control" }
    ],
    "recordingMedia": [
      { "type": "XQD Card", "notes": "" },
      { "type": "SD Card", "notes": "for proxy/backup" }
    ],
    "viewfinder": [
      { "type": "Sony FS7 EVF Port (Proprietary)", "notes": "For Sony viewfinder" },
      { "type": "Integrated LCD monitor", "size": "3.5-inch", "resolution": "1280x720" }
    ],
    "lensMount": [
      { "type": "E-mount", "mount": "native", "notes": "Supports Sony E-mount electronic lens data" },
      { "type": "PL", "mount": "adapted", "notes": "No ARRI LDS or Cooke /i lens data" }
    ],
    "timecode": [
      { "type": "BNC", "notes": "Timecode In/Out via XDCA-FS7" }
    ],
    "weight_g": 2070,
    "recordingCodecs": [
      "XAVC-I 4:2:2 10-bit",
      "XAVC-L 4:2:2 10-bit",
      "MPEG HD422"
    ],
    "sensorModes": [
      "Super35 4K (DCI)",
      "UHD 3840×2160",
      "HD 1920×1080"
    ],
    "resolutions": [
      "DCI 4K 4096×2160",
      "UHD 3840×2160",
      "HD 1920×1080"
    ]
  },
  "Canon C70": {
    "powerDrawWatts": 14.6,
    "power": {
      "input": {
        "voltageRange": "24",
        "type": "DC"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
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
        "type": "REMOTE A connector",
        "notes": "2.5 mm stereo mini-mini jack (input only)"
      }
    ],
    "recordingMedia": [
      {
        "type": "SD Card",
        "notes": "Dual Slots"
      }
    ],
    "viewfinder": [
      {
        "type": "LCD touchscreen",
        "size": "3.5-inch",
        "resolution": "1280 x 720"
      }
    ],
    "lensMount": [
      {
        "type": "RF",
        "mount": "native",
        "notes": "Supports Canon RF electronic lens data"
      },
      {
        "type": "F",
        "mount": "native",
        "notes": "Supports Nikon F electronic lens data when available"
      }
    ],
    "timecode": [
      {
        "type": "BNC"
      }
    ],
    "weight_g": 1170,
    "recordingCodecs": [
      "Cinema RAW Light (HQ/ST/LT)",
      "XF-AVC (H.264)",
      "MP4 HEVC (H.265)",
      "MP4 H.264"
    ],
    "sensorModes": [
      "Super 35 4K (DCI/UHD)",
      "Super 16 crop (2K/HD)"
    ],
    "resolutions": [
      "4096×2160",
      "3840×2160",
      "2048×1080",
      "1920×1080"
    ]
  },
  "Canon C80": {
    "powerDrawWatts": 19.6,
    "power": {
      "input": {
        "voltageRange": "19.5",
        "type": "DC 24V Terminal"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "Battery Voltage",
          "wattage": 50,
          "notes": "Via optional MID49 DB-4, typical per port"
        },
        {
          "type": "D-Tap",
          "voltage": "Battery Voltage",
          "wattage": 50,
          "notes": "Via optional MID49 DB-4, typical per port"
        },
        {
          "type": "USB-C PD",
          "voltage": "5V",
          "wattage": null,
          "notes": "Via optional MID49 DB-4"
        },
        {
          "type": "Fischer 3-pin",
          "voltage": "24V",
          "current": "2.5A",
          "wattage": 60,
          "notes": "Via optional MID49 DB-4, per port, with R/S"
        },
        {
          "type": "Fischer 3-pin",
          "voltage": "24V",
          "current": "2.5A",
          "wattage": 60,
          "notes": "Via optional MID49 DB-4, per port, with R/S"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "Battery Voltage",
          "wattage": 24,
          "notes": "Via optional MID49 DB-4, typical per port (est. 2A)"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "Battery Voltage",
          "wattage": 24,
          "notes": "Via optional MID49 DB-4, typical per port (est. 2A)"
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI",
        "notes": "BNC terminal"
      },
      {
        "type": "HDMI",
        "version": "Type-A"
      }
    ],
    "fizConnectors": [
      {
        "type": "REMOTE A connector",
        "notes": "LANC"
      },
      {
        "type": "Multi-function shoe",
        "notes": "21 pin with electrical contacts"
      }
    ],
    "recordingMedia": [
      {
        "type": "SD Card",
        "notes": ""
      },
      {
        "type": "SD Card",
        "notes": "Dual Slots"
      }
    ],
    "viewfinder": [
      {
        "type": "None",
        "notes": "No built-in viewfinder. External LCD monitor."
      }
    ],
    "lensMount": [
      {
        "type": "RF",
        "mount": "native",
        "notes": "Supports Canon RF electronic lens data"
      },
      {
        "type": "F",
        "mount": "native",
        "notes": "Supports Nikon F electronic lens data when available"
      },
      {
        "type": "PL",
        "mount": "adapted",
        "notes": "No ARRI LDS or Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "adapted",
        "notes": "Supports Canon EF electronic lens data"
      }
    ],
    "timecode": [
      {
        "type": "BNC",
        "notes": "Time Code In/Out"
      }
    ]
  },
  "Canon C300 Mk III": {
    "powerDrawWatts": 31,
    "power": {
      "input": {
        "voltageRange": "11.5-20",
        "type": "XLR 4-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "DC",
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
        "notes": "BNC terminal, 4K to 2K/FHD conversion available"
      },
      {
        "type": "HDMI"
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
        "type": "Hirose 12-pin",
        "notes": "Requires optional EU-V2 / EU-V3"
      }
    ],
    "recordingMedia": [
      {
        "type": "CFexpress Type B",
        "notes": "Dual Slots"
      },
      {
        "type": "SD Card",
        "notes": "for proxy/backup"
      }
    ],
    "viewfinder": [
      {
        "type": "LCD Monitor LM-V2",
        "notes": "4.3” rotating touchscreen LCD unit"
      },
      {
        "type": "EVF-V70 (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      },
      {
        "type": "F",
        "mount": "native",
        "notes": "Supports Nikon F electronic lens data when available"
      },
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      }
    ],
    "timecode": [
      {
        "type": "BNC",
        "notes": "Yes (via BNC)"
      },
      {
        "type": "Genlock",
        "notes": "Yes, with optional Expansion Unit EU-V1 and EU-V2 (BNC jack, input only/also serves as SYNC OUT connector)"
      }
    ],
    "weight_g": 1750,
    "recordingCodecs": [
      "Cinema RAW Light",
      "XF-AVC Intra 4:2:2 10-bit",
      "XF-AVC Long GOP 4:2:2 10-bit"
    ],
    "sensorModes": [
      "Super35 4K DCI",
      "Super35 4K UHD",
      "2K crop"
    ],
    "resolutions": [
      "DCI 4K 4096×2160",
      "UHD 3840×2160",
      "2K 2048×1080",
      "HD 1920×1080"
    ]
  },
  "Canon C400": {
    "powerDrawWatts": 32.5,
    "power": {
      "input": {
        "voltageRange": "11.5-20",
        "type": "XLR 4-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "Multi-Accessory Shoe",
          "notes": "Via camera body or top handle"
        },
        {
          "type": "USB-C",
          "notes": "USB 3.2 Gen1"
        },
        {
          "type": "USB-C",
          "notes": "For supplied Hand Grip only"
        },
        {
          "type": "USB-C",
          "notes": "For supplied LCD Monitor only"
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI",
        "notes": "BNC"
      },
      {
        "type": "3G-SDI",
        "notes": "Monitor Output BNC; Monitoring"
      },
      {
        "type": "HDMI",
        "version": "Type-A"
      }
    ],
    "fizConnectors": [
      {
        "type": "REMOTE A connector",
        "notes": "2.5 mm stereo mini jack"
      },
      {
        "type": "Hirose 12-pin",
        "notes": "12-pin jack"
      }
    ],
    "recordingMedia": [
      {
        "type": "CFexpress Type B",
        "notes": ""
      },
      {
        "type": "SD Card",
        "notes": "UHS-II"
      }
    ],
    "viewfinder": [
      {
        "type": "LCD touchscreen",
        "size": "3.5-inch",
        "resolution": "1280 x 720"
      }
    ],
    "lensMount": [
      {
        "type": "RF",
        "mount": "native",
        "notes": "Supports Canon RF electronic lens data"
      },
      {
        "type": "F",
        "mount": "native",
        "notes": "Supports Nikon F electronic lens data when available"
      },
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      }
    ],
    "timecode": [
      {
        "type": "DIN 1.0/2.3",
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
        "voltageRange": "11.5-20",
        "type": "XLR 4-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "DC",
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
        "notes": "BNC terminal, 4K to 2K/FHD conversion available"
      },
      {
        "type": "HDMI"
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
        "type": "Hirose 12-pin",
        "notes": "Requires optional EU-V2 / EU-V3"
      }
    ],
    "recordingMedia": [
      {
        "type": "CFexpress Type B",
        "notes": "Dual Slots"
      }
    ],
    "viewfinder": [
      {
        "type": "LCD Monitor LM-V2",
        "notes": "Canon's proprietary specification (special 13-pin jack)"
      },
      {
        "type": "EVF-V70 (Optional)"
      },
      {
        "type": "EVF-V50 (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      },
      {
        "type": "F",
        "mount": "native",
        "notes": "Supports Nikon F electronic lens data when available"
      },
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      }
    ],
    "timecode": [
      {
        "type": "BNC",
        "notes": "Yes (via BNC)"
      },
      {
        "type": "Genlock",
        "notes": "Yes, with optional Expansion Unit EU-V1 and EU-V2 (BNC jack, input only/also serves as SYNC OUT connector)"
      }
    ],
    "weight_g": 1750,
    "recordingCodecs": [
      "Cinema RAW Light",
      "XF-AVC Intra 4:2:2 10-bit"
    ],
    "sensorModes": [
      "Full-Frame 5.9K",
      "Super35 4K crop",
      "Super16 HD crop"
    ],
    "resolutions": [
      "5.9K 5952×3140",
      "DCI 4K 4096×2160",
      "UHD 3840×2160",
      "2K 2048×1080",
      "HD 1920×1080"
    ]
  },
  "Blackmagic BMPCC 4K": {
    "powerDrawWatts": 22,
    "power": {
      "input": {
        "voltageRange": "12-20",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "USB-C",
          "notes": "For external drive recording, PTP camera control, software updates, can trickle charge battery"
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "HDMI",
        "version": "Type A"
      }
    ],
    "fizConnectors": [
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
      {
        "type": "CFast 2.0",
        "notes": ""
      },
      {
        "type": "SD Card",
        "notes": "UHS-II"
      },
      {
        "type": "USB-C 3.1 Gen 1 expansion port for external media",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "LCD touchscreen",
        "size": "5-inch",
        "resolution": "1920 x 1080"
      }
    ],
    "lensMount": [
      {
        "type": "MFT",
        "mount": "native",
        "notes": "Supports Micro Four Thirds electronic lens data"
      }
    ],
    "timecode": [
      {
        "type": "3.5mm Stereo",
        "notes": "Can also be used for Timecode input"
      }
    ],
    "weight_g": 680,
    "recordingCodecs": [
      "Blackmagic RAW",
      "Apple ProRes 422 family"
    ],
    "sensorModes": [
      "MFT 4K DCI",
      "UHD 4K",
      "HD (windowed high-fps)"
    ],
    "resolutions": [
      "DCI 4K 4096×2160",
      "UHD 3840×2160",
      "HD 1920×1080"
    ]
  },
  "Blackmagic BMPCC 6K G2": {
    "powerDrawWatts": 26,
    "power": {
      "input": {
        "voltageRange": "12-20",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
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
        "version": "Type A"
      }
    ],
    "fizConnectors": [
      {
        "type": "Bluetooth",
        "notes": "Wireless control"
      }
    ],
    "recordingMedia": [
      {
        "type": "CFast 2.0",
        "notes": ""
      },
      {
        "type": "SD Card",
        "notes": "UHS-II"
      },
      {
        "type": "USB-C 3.1 Gen 1 expansion port for external media",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "LCD touchscreen",
        "size": "5-inch",
        "resolution": "1920 x 1080",
        "notes": "Adjustable HDR touchscreen"
      },
      {
        "type": "OLED EVF (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      },
      {
        "type": "F",
        "mount": "native",
        "notes": "Supports Nikon F electronic lens data when available"
      }
    ],
    "timecode": [
      {
        "type": "3.5mm Stereo",
        "notes": "Also for LTC timecode"
      }
    ]
  },
  "Blackmagic BMPCC 6K": {
    "powerDrawWatts": 26,
    "power": {
      "input": {
        "voltageRange": "12-20",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "USB-C",
          "notes": "For external drive recording, PTP camera control, software updates, can trickle charge battery"
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "HDMI",
        "version": "Type A"
      }
    ],
    "fizConnectors": [
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
      {
        "type": "CFast 2.0",
        "notes": ""
      },
      {
        "type": "SD Card",
        "notes": "UHS-II"
      },
      {
        "type": "USB-C 3.1 Gen 1 expansion port for external media",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "LCD touchscreen",
        "size": "5-inch",
        "resolution": "1920 x 1080"
      }
    ],
    "lensMount": [
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      },
      {
        "type": "F",
        "mount": "native",
        "notes": "Supports Nikon F electronic lens data when available"
      }
    ],
    "timecode": [
      {
        "type": "3.5mm Stereo",
        "notes": "Can also be used for Timecode input"
      }
    ]
  },
  "Blackmagic Pocket Cinema Camera 6K Pro": {
    "powerDrawWatts": 26,
    "power": {
      "input": {
        "voltageRange": "12-20",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
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
        "type": "USB-C",
        "notes": "For Blackmagic Zoom/Focus Demand, PTP camera control"
      },
      {
        "type": "Bluetooth",
        "notes": "Wireless control"
      }
    ],
    "recordingMedia": [
      {
        "type": "CFast 2.0",
        "notes": ""
      },
      {
        "type": "SD Card",
        "notes": "UHS-II"
      },
      {
        "type": "USB-C to external SSD/HDD",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "LCD touchscreen",
        "size": "5-inch",
        "resolution": "1920x1080"
      },
      {
        "type": "Blackmagic Pro EVF (Optional)",
        "resolution": "1280x960",
        "notes": "Micro OLED display"
      }
    ],
    "lensMount": [
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      },
      {
        "type": "F",
        "mount": "native",
        "notes": "Supports Nikon F electronic lens data when available"
      }
    ],
    "timecode": [
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
        "voltageRange": "12",
        "type": "Molex 12-pin,XLR 4-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "native",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null,
          "notes": "Regulated, via individualized V-Mount battery plate"
        },
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null,
          "notes": "Regulated, via individualized V-Mount battery plate"
        },
        {
          "type": "USB-C",
          "voltage": null,
          "wattage": null,
          "notes": "With power delivery for external drive recording"
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI"
      },
      {
        "type": "3G-SDI",
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
        "type": "Hirose 12-pin",
        "notes": "For compatible lenses and electronic control via EF mount pins on optional EF lens mount"
      }
    ],
    "recordingMedia": [
      {
        "type": "CFast 2.0",
        "notes": ""
      },
      {
        "type": "SD Card",
        "notes": "Dual Slots; UHS-II"
      },
      {
        "type": "USB-C 3.1 Gen 2 expansion port for external media",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "LCD touchscreen",
        "size": "4-inch",
        "notes": "Fold out touchscreen"
      },
      {
        "type": "LCD status display"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      },
      {
        "type": "F",
        "mount": "native",
        "notes": "Supports Nikon F electronic lens data when available"
      }
    ],
    "timecode": [
      {
        "type": "BNC",
        "notes": "Timecode Input (Reference Inputs: Tri-Sync/Black Burst/Timecode)"
      }
    ]
  },
  "Blackmagic URSA Cine": {
    "powerDrawWatts": 100,
    "power": {
      "input": {
        "voltageRange": "20-30",
        "type": "XLR 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "B-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": "Limited functionality"
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": "Limited functionality"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "3A",
          "wattage": 36,
          "notes": "Regulated"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "3A",
          "wattage": 36,
          "notes": "Regulated"
        },
        {
          "type": "Fischer 3-pin",
          "voltage": "24V",
          "current": "3A",
          "wattage": 72,
          "notes": "Regulated, with run/stop"
        },
        {
          "type": "D-Tap",
          "voltage": "Battery Voltage",
          "wattage": null,
          "notes": "Unregulated"
        },
        {
          "type": "D-Tap",
          "voltage": "Battery Voltage",
          "wattage": null,
          "notes": "Unregulated"
        },
        {
          "type": "USB-C",
          "voltage": "5V",
          "current": "1.5A",
          "wattage": 7.5,
          "notes": "For accessories"
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
      },
      {
        "type": "HDMI"
      }
    ],
    "fizConnectors": [
      {
        "type": "LANC",
        "notes": "2.5mm"
      },
      {
        "type": "Hirose 12-pin",
        "notes": "For broadcast lenses"
      }
    ],
    "recordingMedia": [
      {
        "type": "Blackmagic Media Module",
        "notes": "8TB"
      },
      {
        "type": "CFexpress Type B",
        "notes": "via adapter"
      }
    ],
    "viewfinder": [
      {
        "type": "Fold- LCD",
        "size": "5-inch",
        "resolution": "1920x1080"
      },
      {
        "type": "Blackmagic URSA Cine EVF (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "LPL",
        "mount": "native",
        "notes": "Supports ARRI LDS-2 and Cooke /i lens data"
      },
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      },
      {
        "type": "Hasselblad",
        "mount": "native",
        "notes": "Supports Hasselblad electronic lens data"
      }
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
        "voltageRange": "12-20",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
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
        "version": "Type A"
      }
    ],
    "fizConnectors": [
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
      {
        "type": "CFexpress Type B",
        "notes": ""
      },
      {
        "type": "USB-C to external SSD/HDD",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "LCD touchscreen",
        "size": "4-inch",
        "resolution": "1280x720"
      }
    ],
    "lensMount": [
      {
        "type": "L-Mount",
        "mount": "native",
        "notes": "Supports L-Mount electronic lens data"
      }
    ],
    "timecode": [
      {
        "type": "3.5mm Stereo",
        "notes": "Can be used for Timecode input"
      }
    ]
  },
  "Blackmagic PYXIS 12K": {
    "powerDrawWatts": 90,
    "power": {
      "input": {
        "voltageRange": "12-20",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
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
        "version": "Type A"
      }
    ],
    "fizConnectors": [
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
      {
        "type": "CFexpress Type B",
        "notes": ""
      },
      {
        "type": "USB-C to external SSD/HDD",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "LCD touchscreen",
        "size": "4-inch",
        "resolution": "1280x720"
      }
    ],
    "lensMount": [
      {
        "type": "L-Mount",
        "mount": "native",
        "notes": "Supports L-Mount electronic lens data"
      }
    ],
    "timecode": [
      {
        "type": "3.5mm Stereo",
        "notes": "Can be used for Timecode input"
      }
    ]
  },
  "RED Komodo 6k": {
    "powerDrawWatts": 37,
    "power": {
      "input": {
        "voltageRange": "+7-+17",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Micro Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12-14.8V",
          "wattage": 50,
          "notes": "Via optional third-party plates, typical per port"
        },
        {
          "type": "USB-A",
          "voltage": "5V",
          "current": "1-2A",
          "wattage": null,
          "notes": "Via optional third-party plates"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12-14.8V",
          "wattage": 24,
          "notes": "Via optional third-party plates, typical per port (est. 2A)"
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI",
        "notes": "Also supports 6G-SDI, 3G-SDI, and 1.5G-SDI modes"
      }
    ],
    "fizConnectors": [
      {
        "type": "EXT Port (9-pin)",
        "notes": "Supports Genlock, Timecode In, GPIO, and Ctrl (RS-232)"
      },
      {
        "type": "USB-C",
        "notes": "Via KOMODO Link Adaptor for camera control"
      }
    ],
    "recordingMedia": [
      {
        "type": "CFast 2.0",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "LCD touchscreen",
        "size": "2.9-inch",
        "resolution": "1440x1440"
      },
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "RF",
        "mount": "native",
        "notes": "Supports Canon RF electronic lens data"
      },
      {
        "type": "EF",
        "mount": "adapted",
        "notes": "Supports Canon EF electronic lens data"
      },
      {
        "type": "PL",
        "mount": "adapted",
        "notes": "No ARRI LDS or Cooke /i lens data"
      }
    ],
    "timecode": [
      {
        "type": "EXT Port (9-pin)",
        "notes": "Timecode In"
      }
    ],
    "weight_g": 950,
    "recordingCodecs": [
      "REDCODE RAW (R3D)",
      "ProRes 422 HQ",
      "ProRes 422"
    ],
    "sensorModes": [
      "Super35 6K",
      "S35 4K crop",
      "S35 2K crop"
    ],
    "resolutions": [
      "6K 6144×3240",
      "5K 5120×2700",
      "4K 4096×2160",
      "2K 2048×1080"
    ]
  },
  "RED Komodo X": {
    "powerDrawWatts": 45,
    "power": {
      "input": {
        "voltageRange": "+7-+17",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "USB-C",
          "notes": "Power Delivery"
        },
        {
          "type": "D-Tap",
          "notes": "Via optional expander"
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI"
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
      {
        "type": "CFexpress Type B",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "LCD touchscreen",
        "size": "2.9-inch"
      },
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "RF",
        "mount": "native",
        "notes": "Supports Canon RF electronic lens data"
      }
    ],
    "timecode": [
      {
        "type": "EXT Port (9-pin)",
        "notes": "Timecode In"
      }
    ],
    "weight_g": 1188,
    "recordingCodecs": [
      "REDCODE RAW",
      "ProRes 4444 XQ (to 4K)",
      "ProRes 4444 (to 4K)",
      "ProRes 422 HQ",
      "ProRes 422",
      "ProRes 422 LT"
    ],
    "sensorModes": [
      "6K S35",
      "5K S35",
      "4K S35",
      "2K S16"
    ],
    "resolutions": [
      "6144×3240",
      "5120×2700",
      "4096×2160",
      "2048×1080"
    ]
  },
  "V-Raptor XL 8K VV": {
    "powerDrawWatts": 75,
    "power": {
      "input": {
        "voltageRange": "24",
        "type": "XLR 4-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        },
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "wattage": null
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "wattage": null
        },
        {
          "type": "Fischer 3-pin",
          "voltage": "24V",
          "wattage": null,
          "notes": "R/S"
        },
        {
          "type": "USB-C",
          "voltage": "5V",
          "wattage": null
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
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
      {
        "type": "CFexpress Type B",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      }
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
        "voltageRange": "24",
        "type": "XLR 4-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        },
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "wattage": null
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "wattage": null
        },
        {
          "type": "Fischer 3-pin",
          "voltage": "24V",
          "wattage": null,
          "notes": "R/S"
        },
        {
          "type": "USB-C",
          "voltage": "5V",
          "wattage": null
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
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
      {
        "type": "CFexpress Type B",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      }
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
        "voltageRange": "24",
        "type": "XLR 4-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        },
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "wattage": null
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "wattage": null
        },
        {
          "type": "Fischer 3-pin",
          "voltage": "24V",
          "wattage": null,
          "notes": "R/S"
        },
        {
          "type": "USB-C",
          "voltage": "5V",
          "wattage": null
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
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
      {
        "type": "CFexpress Type B",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      }
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
        "voltageRange": "24",
        "type": "XLR 4-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        },
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "wattage": null
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "wattage": null
        },
        {
          "type": "Fischer 3-pin",
          "voltage": "24V",
          "wattage": null,
          "notes": "R/S"
        },
        {
          "type": "USB-C",
          "voltage": "5V",
          "wattage": null
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
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
      {
        "type": "CFexpress Type B",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      }
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
        "voltageRange": "11.5-17",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
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
      {
        "type": "CFexpress Type B",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      }
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
        "voltageRange": "11.5-17",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
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
      {
        "type": "CFexpress Type B",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      }
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
        "voltageRange": "11.5-17",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
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
      {
        "type": "CFexpress Type B",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      }
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
        "voltageRange": "11.5-17",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI"
      },
      {
        "type": "12G-SDI"
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
      {
        "type": "CFexpress Type B",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      }
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
        "voltageRange": "11.5-17",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "3G-SDI"
      },
      {
        "type": "3G-SDI"
      }
    ],
    "fizConnectors": [
      {
        "type": "EXT Port (9-pin)",
        "notes": "Genlock, Timecode, GPIO, Ctrl"
      }
    ],
    "recordingMedia": [
      {
        "type": "RED MINI-MAG",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      }
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
        "voltageRange": "11.5-17",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "3G-SDI"
      },
      {
        "type": "3G-SDI"
      }
    ],
    "fizConnectors": [
      {
        "type": "EXT Port (9-pin)",
        "notes": "Genlock, Timecode, GPIO, Ctrl"
      }
    ],
    "recordingMedia": [
      {
        "type": "RED MINI-MAG",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      }
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
        "voltageRange": "11.5-17",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "native",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "3G-SDI"
      },
      {
        "type": "3G-SDI"
      }
    ],
    "fizConnectors": [
      {
        "type": "EXT Port (9-pin)",
        "notes": "Genlock, Timecode, GPIO, Ctrl"
      }
    ],
    "recordingMedia": [
      {
        "type": "RED MINI-MAG",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      }
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
        "voltageRange": "11.5-17",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "3G-SDI"
      },
      {
        "type": "3G-SDI"
      }
    ],
    "fizConnectors": [
      {
        "type": "EXT Port (9-pin)",
        "notes": "Genlock, Timecode, GPIO, Ctrl"
      }
    ],
    "recordingMedia": [
      {
        "type": "REDMAG 1.8\" SSD",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      }
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
        "voltageRange": "11.5-17",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "3G-SDI"
      },
      {
        "type": "3G-SDI"
      }
    ],
    "fizConnectors": [
      {
        "type": "EXT Port (9-pin)",
        "notes": "Genlock, Timecode, GPIO, Ctrl"
      }
    ],
    "recordingMedia": [
      {
        "type": "REDMAG 1.8\" SSD",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      }
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
        "voltageRange": "11.5-17",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "3G-SDI"
      },
      {
        "type": "3G-SDI"
      }
    ],
    "fizConnectors": [
      {
        "type": "EXT Port (9-pin)",
        "notes": "Genlock, Timecode, GPIO, Ctrl"
      }
    ],
    "recordingMedia": [
      {
        "type": "REDMAG 1.8\" SSD",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      }
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
        "voltageRange": "11.5-17",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "wattage": null
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "3G-SDI"
      },
      {
        "type": "3G-SDI"
      }
    ],
    "fizConnectors": [
      {
        "type": "EXT Port (9-pin)",
        "notes": "Genlock, Timecode, GPIO, Ctrl"
      }
    ],
    "recordingMedia": [
      {
        "type": "REDMAG 1.8\" SSD",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "RED Touch 7\" LCD (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "PL",
        "mount": "native",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "EF",
        "mount": "native",
        "notes": "Supports Canon EF electronic lens data"
      }
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
        "voltageRange": "8.4 (battery) / 9 (USB-C PD)",
        "powerDrawWatts": 27,
        "type": "Battery Slot,USB-C PD"
      },
      "batteryPlateSupport": [
        {
          "type": "DMW-BLK22",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
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
      {
        "type": "SD Card",
        "notes": "UHS-II"
      }
    ],
    "viewfinder": [
      {
        "type": "OLED EVF",
        "resolution": "3,680k-dot"
      },
      {
        "type": "Vari-angle LCD",
        "size": "3.0-inch",
        "resolution": "1,840k-dot"
      }
    ],
    "lensMount": [
      {
        "type": "L-Mount",
        "mount": "native",
        "notes": "Supports L-Mount electronic lens data"
      }
    ],
    "timecode": []
  },
  "Panasonic Lumix GH6": {
    "powerDrawWatts": 5,
    "power": {
      "input": {
        "voltageRange": "9.0 (battery) / 9 (USB-C PD)",
        "powerDrawWatts": 27,
        "type": "Battery Slot,USB-C PD"
      },
      "batteryPlateSupport": [
        {
          "type": "DMW-BLK22",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
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
      {
        "type": "CFexpress Type B",
        "notes": ""
      },
      {
        "type": "SD Card",
        "notes": "UHS-II"
      }
    ],
    "viewfinder": [
      {
        "type": "OLED EVF",
        "resolution": "3,680k-dot"
      },
      {
        "type": "Vari-angle LCD",
        "size": "3.0-inch",
        "resolution": "1,840k-dot"
      }
    ],
    "lensMount": [
      {
        "type": "MFT",
        "mount": "native",
        "notes": "Supports Micro Four Thirds electronic lens data"
      }
    ],
    "timecode": []
  },
  "Sony A7S III": {
    "powerDrawWatts": 5,
    "power": {
      "input": {
        "voltageRange": "7.2 (battery) / 9 (USB-C PD)",
        "powerDrawWatts": 27,
        "type": "Battery Slot,USB-C PD"
      },
      "batteryPlateSupport": [
        {
          "type": "NP-FZ100",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
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
      {
        "type": "CFexpress Type A",
        "notes": ""
      },
      {
        "type": "SD",
        "notes": "UHS-II/UHS-I"
      }
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
      {
        "type": "E-mount",
        "mount": "native",
        "notes": "Supports Sony E-mount electronic lens data"
      }
    ],
    "timecode": []
  },
  "Fujifilm X-H2S": {
    "powerDrawWatts": 15,
    "power": {
      "input": {
        "voltageRange": "7.2 (battery) / 5 (USB-C PD)",
        "type": "Battery Slot,USB-C PD"
      },
      "batteryPlateSupport": [
        {
          "type": "NP-W235",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
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
      {
        "type": "CFexpress Type B",
        "notes": ""
      },
      {
        "type": "SD Card",
        "notes": "UHS-II"
      }
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
      {
        "type": "X-mount",
        "mount": "native",
        "notes": "Supports Fujifilm X electronic lens data"
      }
    ],
    "timecode": []
  },
  "DJI Ronin 4D 6K": {
    "powerDrawWatts": 40,
    "power": {
      "input": {
        "voltageRange": "12-30",
        "type": "6-pin 1B DC-,TB50"
      },
      "batteryPlateSupport": [
        {
          "type": "TB50",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "3A",
          "wattage": 36,
          "notes": "Regulated"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "3A",
          "wattage": 36,
          "notes": "Regulated"
        },
        {
          "type": "Fischer 3-pin",
          "voltage": "24V",
          "current": "3A",
          "wattage": 72,
          "notes": "Regulated, with run/stop"
        },
        {
          "type": "D-Tap",
          "voltage": "Battery Voltage",
          "wattage": null,
          "notes": "Unregulated"
        },
        {
          "type": "D-Tap",
          "voltage": "Battery Voltage",
          "wattage": null,
          "notes": "Unregulated"
        },
        {
          "type": "USB-C",
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
        "version": "Type A"
      },
      {
        "type": "3G-SDI",
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
      {
        "type": "DJI PROSSD",
        "notes": ""
      },
      {
        "type": "CFexpress Type B",
        "notes": "via adapter"
      }
    ],
    "viewfinder": [
      {
        "type": "Integrated LCD monitor",
        "size": "5.5-inch",
        "resolution": "1920x1080"
      },
      {
        "type": "High-Bright Remote Monitor (Optional)"
      }
    ],
    "lensMount": [
      {
        "type": "DL",
        "mount": "native",
        "notes": "Supports DJI electronic lens data"
      },
      {
        "type": "PL",
        "mount": "adapted",
        "notes": "No ARRI LDS or Cooke /i lens data"
      },
      {
        "type": "E-mount",
        "mount": "adapted",
        "notes": "Supports Sony E-mount electronic lens data"
      }
    ],
    "timecode": []
  },
  "Sony FX30": {
    "powerDrawWatts": 5.6,
    "power": {
      "input": {
        "voltageRange": "7.2 (battery) / 9 (USB-C PD)",
        "type": "Battery Slot,USB-C"
      },
      "batteryPlateSupport": [
        {
          "type": "NP-FZ100",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "USB-C",
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
        "type": "USB-C",
        "notes": "For specific accessories/control"
      }
    ],
    "recordingMedia": [
      {
        "type": "CFexpress Type A",
        "notes": ""
      },
      {
        "type": "SD",
        "notes": "UHS-II/UHS-I"
      }
    ],
    "viewfinder": [
      {
        "type": "Integrated LCD monitor",
        "size": "3.0-type (7.5 cm)",
        "resolution": "Approx. 2.36M dots",
        "notes": "Vari-angle touch panel [S1.1]"
      }
    ],
    "lensMount": [
      {
        "type": "E-mount",
        "mount": "native",
        "notes": "Supports Sony E-mount electronic lens data"
      }
    ],
    "timecode": [
      {
        "type": "Multi/Micro USB (TC )",
        "notes": "Timecode Input [S1.1]"
      }
    ]
  },
  "Panasonic Lumix BS1H": {
    "powerDrawWatts": 8.1,
    "power": {
      "input": {
        "voltageRange": "12 (11.4-12.6)",
        "type": "Weipu SF610,S2"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": []
    },
    "videoOutputs": [
      {
        "type": "3G-SDI",
        "notes": "Output [2.3]"
      },
      {
        "type": "HDMI",
        "notes": "Output, Raw 12-Bit via HDMI [2.3]"
      }
    ],
    "fizConnectors": [
      {
        "type": "LANC",
        "notes": "Control Input [2.3]"
      },
      {
        "type": "USB-C",
        "notes": "Control/Data/Video Input [2.3]"
      },
      {
        "type": "RJ45 (LAN)",
        "notes": "Control/Monitor/Video Input/Output [2.3]"
      }
    ],
    "recordingMedia": [
      {
        "type": "SD Card",
        "notes": "UHS-II"
      },
      {
        "type": "SD Card",
        "notes": "Dual Slots; UHS-II"
      }
    ],
    "viewfinder": [
      {
        "type": "None",
        "notes": "Box camera design, requires external monitor"
      }
    ],
    "lensMount": [
      {
        "type": "L-Mount",
        "mount": "native",
        "notes": "Supports L-Mount electronic lens data"
      }
    ],
    "timecode": [
      {
        "type": "BNC",
        "notes": "Data Input/Output [2.3]"
      }
    ]
  },
  "Sony ZV-E1": {
    "powerDrawWatts": 7,
    "power": {
      "input": {
        "voltageRange": "7.2 (battery) / 5 (USB-C PD)",
        "type": "Battery Slot,USB-C"
      },
      "batteryPlateSupport": [
        {
          "type": "NP-FZ100",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": []
    },
    "videoOutputs": [
      {
        "type": "HDMI",
        "version": "Type-A",
        "notes": "YCbCr 4:2:2 10 bit / RGB 8 bit [S3.1]"
      }
    ],
    "fizConnectors": [
      {
        "type": "USB-C",
        "notes": "For specific accessories/control"
      }
    ],
    "recordingMedia": [
      {
        "type": "SD",
        "notes": "UHS-II/UHS-I"
      }
    ],
    "viewfinder": [
      {
        "type": "Integrated LCD monitor",
        "size": "3.0-type (7.5 cm)",
        "resolution": "Approx. 1.03M dots",
        "notes": "Vari-angle touch panel [S3.1]"
      }
    ],
    "lensMount": [
      {
        "type": "E-mount",
        "mount": "native",
        "notes": "Supports Sony E-mount electronic lens data"
      }
    ],
    "timecode": []
  },
  "Fujifilm X-M5": {
    "powerDrawWatts": 5.5,
    "power": {
      "input": {
        "voltageRange": "7.2 (battery) / USB-C",
        "type": "Battery Slot,USB-C"
      },
      "batteryPlateSupport": [
        {
          "type": "NP-W126S",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
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
      {
        "type": "SDXC",
        "notes": "UHS-I"
      }
    ],
    "viewfinder": [
      {
        "type": "None",
        "notes": "No built-in viewfinder, relies on LCD [4.1]"
      },
      {
        "type": "Integrated LCD monitor",
        "size": "3.0-inch",
        "resolution": "1.04 million dots",
        "notes": "Vari-angle touchscreen [4.1]"
      }
    ],
    "lensMount": [
      {
        "type": "X-mount",
        "mount": "native",
        "notes": "Supports Fujifilm X electronic lens data"
      }
    ],
    "timecode": []
  },
  "Canon EOS R5 Mark II": {
    "powerDrawWatts": 15,
    "power": {
      "input": {
        "voltageRange": "7.2 (LP-E6P) / USB-C PD (45W+ recommended)",
        "type": "Battery Slot,USB-C PD"
      },
      "batteryPlateSupport": [
        {
          "type": "LP-E6P",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
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
      {
        "type": "CFexpress Type B",
        "notes": ""
      },
      {
        "type": "SD Card",
        "notes": "UHS-II"
      }
    ],
    "viewfinder": [
      {
        "type": "OLED EVF",
        "resolution": "Approx. 5.76 million dots"
      },
      {
        "type": "Integrated LCD monitor",
        "size": "3.2-inch",
        "resolution": "Approx. 2.1 million dots",
        "notes": "Vari-angle touchscreen"
      }
    ],
    "lensMount": [
      {
        "type": "RF",
        "mount": "native",
        "notes": "Supports Canon RF electronic lens data"
      },
      {
        "type": "F",
        "mount": "native",
        "notes": "Supports Nikon F electronic lens data when available"
      }
    ],
    "timecode": []
  },
  "Canon EOS R1": {
    "powerDrawWatts": 18,
    "power": {
      "input": {
        "voltageRange": "7.2 (LP-E19) / USB-C PD",
        "type": "Battery Slot,USB-C PD"
      },
      "batteryPlateSupport": [
        {
          "type": "LP-E19",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
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
      {
        "type": "CFexpress Type B",
        "notes": "Dual Slots"
      }
    ],
    "viewfinder": [
      {
        "type": "OLED EVF",
        "resolution": "High-resolution"
      },
      {
        "type": "Integrated LCD monitor",
        "size": "Vari-angle touchscreen"
      }
    ],
    "lensMount": [
      {
        "type": "RF",
        "mount": "native",
        "notes": "Supports Canon RF electronic lens data"
      },
      {
        "type": "F",
        "mount": "native",
        "notes": "Supports Nikon F electronic lens data when available"
      }
    ],
    "timecode": []
  },
  "Sony PXW-FS7": {
    "powerDrawWatts": 0,
    "power": {
      "input": { "voltageRange": null, "type": null },
      "batteryPlateSupport": [],
      "powerDistributionOutputs": []
    },
    "videoOutputs": [],
    "fizConnectors": [],
    "recordingMedia": [],
    "viewfinder": [],
    "lensMount": [],
    "timecode": [],
    "weight_g": 2000,
    "recordingCodecs": [
      "XAVC-I",
      "XAVC-L",
      "MPEG HD 422"
    ],
    "sensorModes": [
      "Super 35 4K (DCI/UHD)",
      "Super 35 HD"
    ],
    "resolutions": [
      "4096×2160",
      "3840×2160",
      "1920×1080",
      "1280×720"
    ]
  },
  "Canon C200": {
    "powerDrawWatts": 0,
    "power": {
      "input": { "voltageRange": null, "type": null },
      "batteryPlateSupport": [],
      "powerDistributionOutputs": []
    },
    "videoOutputs": [],
    "fizConnectors": [],
    "recordingMedia": [],
    "viewfinder": [],
    "lensMount": [],
    "timecode": [],
    "weight_g": 1430,
    "recordingCodecs": [
      "Cinema RAW Light",
      "XF-AVC",
      "MP4"
    ],
    "sensorModes": [
      "Super 35 4K (DCI/UHD)",
      "2K/HD"
    ],
    "resolutions": [
      "4096×2160",
      "3840×2160",
      "2048×1080",
      "1920×1080"
    ]
  },
  "Panasonic AU-EVA1": {
    "powerDrawWatts": 0,
    "power": {
      "input": { "voltageRange": null, "type": null },
      "batteryPlateSupport": [],
      "powerDistributionOutputs": []
    },
    "videoOutputs": [],
    "fizConnectors": [],
    "recordingMedia": [],
    "viewfinder": [],
    "lensMount": [],
    "timecode": [],
    "weight_g": 1200,
    "recordingCodecs": [
      "AVC-Intra 4:2:2 10-bit",
      "AVC-LongGOP 4:2:2 10-bit",
      "AVCHD"
    ],
    "sensorModes": [
      "Super 35 4K (DCI/UHD)",
      "Super 35 2K/HD"
    ],
    "resolutions": [
      "4096×2160",
      "3840×2160",
      "2048×1080",
      "1920×1080"
    ]
  },
  "RED V-RAPTOR 8K VV": {
    "powerDrawWatts": 0,
    "power": {
      "input": { "voltageRange": null, "type": null },
      "batteryPlateSupport": [],
      "powerDistributionOutputs": []
    },
    "videoOutputs": [],
    "fizConnectors": [],
    "recordingMedia": [],
    "viewfinder": [],
    "lensMount": [],
    "timecode": [],
    "weight_g": 1828,
    "recordingCodecs": [
      "REDCODE RAW (16-bit)",
      "ProRes 4444 XQ (to 4K)",
      "ProRes 4444 (to 4K)",
      "ProRes 422 HQ (to 4K)",
      "ProRes 422 (to 4K)",
      "ProRes 422 LT (to 4K)"
    ],
    "sensorModes": [
      "8K VV (Full Frame)",
      "6K S35",
      "4K S35"
    ],
    "resolutions": [
      "8192×4320",
      "6144×3240",
      "4096×2160",
      "2048×1080"
    ]
  },
  "Blackmagic Cinema Camera 6K": {
    "powerDrawWatts": 0,
    "power": {
      "input": { "voltageRange": null, "type": null },
      "batteryPlateSupport": [],
      "powerDistributionOutputs": []
    },
    "videoOutputs": [],
    "fizConnectors": [],
    "recordingMedia": [],
    "viewfinder": [],
    "lensMount": [],
    "timecode": [],
    "weight_g": 1200,
    "recordingCodecs": [
      "Blackmagic RAW",
      "H.264 Proxy (1080p)"
    ],
    "sensorModes": [
      "Full Frame 3:2 Open Gate",
      "6K DCI 17:9",
      "6K 2.4:1",
      "Super 35 4:3",
      "4K DCI 17:9",
      "Super 16 16:9"
    ],
    "resolutions": [
      "6048×4032",
      "4832×4032",
      "6048×3200",
      "6048×2520",
      "4096×3072",
      "4096×2160",
      "2112×1184",
      "1920×1080"
    ]
  },
  "Leica SL3-S": {
    "powerDrawWatts": 10,
    "power": {
      "input": {
        "voltageRange": "7.2 (battery) / USB-C",
        "type": "Battery Slot,USB-C"
      },
      "batteryPlateSupport": [
        {
          "type": "Leica BP-SCL6",
          "mount": "native",
          "notes": ""
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": ""
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": ""
        }
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
      {
        "type": "SD Card",
        "notes": "UHS-II"
      },
      {
        "type": "CFexpress Type B",
        "notes": ""
      }
    ],
    "viewfinder": [
      {
        "type": "OLED EVF",
        "resolution": "High-resolution"
      },
      {
        "type": "Integrated LCD monitor",
        "size": "Vari-angle touchscreen"
      }
    ],
    "lensMount": [
      {
        "type": "L-Mount",
        "mount": "native",
        "notes": "Supports L-Mount electronic lens data"
      }
    ],
    "timecode": []
  },
  "None": {
    "powerDrawWatts": 0,
    "power": {
      "input": {
        "voltageRange": null,
        "type": null
      },
      "batteryPlateSupport": [],
      "powerDistributionOutputs": []
    },
    "videoOutputs": [],
    "fizConnectors": [],
    "recordingMedia": [],
    "viewfinder": [],
    "lensMount": [],
    "timecode": []
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = cameraData;
} else {
  globalThis.devices = globalThis.devices || {};
  globalThis.devices.cameras = cameraData;
}
})();
