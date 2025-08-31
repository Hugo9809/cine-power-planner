let devices={
  "cameras": {
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
          "voltageRange": "10.5 - 34",
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
      ]
    },
    "Sony Venice 2": {
      "powerDrawWatts": 76,
      "power": {
        "input": {
          "voltageRange": "12 (11.0 to 17.0) / 24 (22.0 to 32.0)",
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
          "voltageRange": "12 (11.0 to 17.0) / 24 (22.0 to 32.0)",
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
      "timecode": []
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
          "voltageRange": "11.5 - 20",
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
          "voltageRange": "11.5 - 20",
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
      ]
    },
    "Blackmagic BMPCC 6K G2": {
      "powerDrawWatts": 26,
      "power": {
        "input": {
          "voltageRange": "12 - 20",
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
          "voltageRange": "+7 to +17",
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
      ]
    },
    "RED Komodo X": {
      "powerDrawWatts": 45,
      "power": {
        "input": {
          "voltageRange": "+7 to +17",
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
          "voltageRange": "12 (11.4 to 12.6)",
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
  },
  "monitors": {
    "SmallHD Ultra 7": {
      "screenSizeInches": 7,
      "brightnessNits": 2300,
      "powerDrawWatts": 37.5,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "type": "LEMO 2-pin"
        },
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "12G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "12G-SDI"
        }
      ]
    },
    "SmallHD Ultra 7 Bolt 6 TX": {
      "screenSizeInches": 7,
      "brightnessNits": 2300,
      "powerDrawWatts": 55,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "type": "LEMO 2-pin"
        },
        "output": null
      },
      "wirelessTx": true,
      "latencyMs": "< 1ms",
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "12G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "12G-SDI"
        }
      ]
    },
    "SmallHD Cine 7": {
      "screenSizeInches": 7,
      "brightnessNits": 1800,
      "powerDrawWatts": 30,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "type": "LEMO 2-pin"
        },
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ]
    },
    "SmallHD Cine 7 Bolt 4K TX": {
      "screenSizeInches": 7,
      "brightnessNits": 1800,
      "powerDrawWatts": 50,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "type": "LEMO 2-pin"
        },
        "output": null
      },
      "wirelessTx": true,
      "latencyMs": "< 1ms",
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ]
    },
    "SmallHD Indie 7": {
      "screenSizeInches": 7,
      "brightnessNits": 1000,
      "powerDrawWatts": 17.3,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "type": "LEMO 2-pin"
        },
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ]
    },
    "SmallHD Indie 7 Bolt 4K TX": {
      "screenSizeInches": 7,
      "brightnessNits": 1000,
      "powerDrawWatts": 37.3,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "type": "LEMO 2-pin"
        },
        "output": null
      },
      "wirelessTx": true,
      "latencyMs": "< 1ms",
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ]
    },
    "SmallHD Focus 7": {
      "screenSizeInches": 7,
      "brightnessNits": 1000,
      "powerDrawWatts": 9,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "type": "LEMO 2-pin"
        },
        "output": null
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "videoInputs": [
        {
          "type": "HDMI"
        }
      ],
      "videoOutputs": []
    },
    "SmallHD Ultra 5": {
      "screenSizeInches": 5,
      "brightnessNits": 3000,
      "powerDrawWatts": 31.5,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "type": "LEMO 2-pin"
        },
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ]
    },
    "SmallHD Ultra 5 Bolt 6 TX": {
      "screenSizeInches": 5,
      "brightnessNits": 3000,
      "powerDrawWatts": 50,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "type": "LEMO 2-pin"
        },
        "output": null
      },
      "wirelessTx": true,
      "latencyMs": "< 1ms",
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ]
    },
    "SmallHD Cine 5": {
      "screenSizeInches": 5,
      "brightnessNits": 2000,
      "powerDrawWatts": 24,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "type": "LEMO 2-pin"
        },
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ]
    },
    "SmallHD Cine 5 Bolt 6 TX": {
      "screenSizeInches": 5,
      "brightnessNits": 2000,
      "powerDrawWatts": 44,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "type": "LEMO 2-pin"
        },
        "output": null
      },
      "wirelessTx": true,
      "latencyMs": "< 1ms",
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ]
    },
    "SmallHD Indie 5": {
      "screenSizeInches": 5,
      "brightnessNits": 1000,
      "powerDrawWatts": 17.3,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "type": "LEMO 2-pin"
        },
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ]
    },
    "SmallHD Focus 5": {
      "screenSizeInches": 5,
      "brightnessNits": 800,
      "powerDrawWatts": 8,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "type": "LEMO 2-pin"
        },
        "output": null
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "videoInputs": [
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": []
    },
    "Hollyland Pyro 7 (RX/TX)": {
      "screenSizeInches": 7,
      "brightnessNits": 1200,
      "powerDrawWatts": 22,
      "power": {
        "input": {
          "voltageRange": "7-16",
          "type": "DC Barrel / NP-F"
        },
        "output": null
      },
      "wirelessTx": true,
      "latencyMs": "50ms",
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ]
    },
    "Hollyland Pyro 5 (RX/TX)": {
      "screenSizeInches": 5,
      "brightnessNits": 1500,
      "powerDrawWatts": 16.5,
      "power": {
        "input": {
          "voltageRange": "7-16",
          "type": "DC Barrel"
        },
        "output": null
      },
      "wirelessTx": true,
      "latencyMs": "50ms",
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        }
      ]
    },
    "Hollyland Mars M1 Enhanced (RX/TX)": {
      "screenSizeInches": 5.5,
      "brightnessNits": 1000,
      "powerDrawWatts": 16,
      "power": {
        "input": {
          "voltageRange": "7-16",
          "type": "DC Barrel / NP-F"
        },
        "output": null
      },
      "wirelessTx": true,
      "latencyMs": "< 80ms",
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        }
      ]
    },
    "Portkeys BM5 III": {
      "screenSizeInches": 5.5,
      "brightnessNits": 2200,
      "powerDrawWatts": 16,
      "power": {
        "input": {
          "voltageRange": "7-24",
          "type": "4-pin Aviation / NP-F"
        },
        "output": null
      },
      "wirelessTx": false,
      "bluetooth": {
        "portType": "Camera Control"
      },
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ]
    },
    "Portkeys LH5H": {
      "screenSizeInches": 5.2,
      "brightnessNits": 1700,
      "powerDrawWatts": 12,
      "power": {
        "input": {
          "voltageRange": "7-24",
          "type": "4-pin Aviation / NP-F"
        },
        "output": null
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "wireless": {
        "portType": "Bluetooth Camera Control"
      },
      "videoInputs": [
        {
          "type": "HDMI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        }
      ]
    },
    "Portkeys BM7 II DS": {
      "screenSizeInches": 7,
      "brightnessNits": 2200,
      "powerDrawWatts": 15,
      "power": {
        "input": {
          "voltageRange": "7-24",
          "type": "4-pin Aviation / NP-F"
        },
        "output": null
      },
      "wirelessTx": false,
      "wireless": {
        "portType": "Camera Control"
      },
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ]
    },
    "Portkeys PT5 II": {
      "screenSizeInches": 5,
      "brightnessNits": 500,
      "powerDrawWatts": 7,
      "power": {
        "input": {
          "voltageRange": "7-24",
          "type": "4-pin Aviation / NP-F"
        },
        "output": null
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "videoInputs": [
        {
          "type": "HDMI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        }
      ]
    },
    "Atomos Ninja V": {
      "screenSizeInches": 5,
      "brightnessNits": 1000,
      "powerDrawWatts": 22,
      "power": {
        "input": {
          "voltageRange": "6-16",
          "type": "DC Barrel / NP-F"
        },
        "output": null
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "audioIo": {
        "portType": "10-pin LEMO (analog audio)"
      },
      "videoInputs": [
        {
          "type": "HDMI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        }
      ]
    },
    "Atomos Ninja V+": {
      "screenSizeInches": 5,
      "brightnessNits": 1000,
      "powerDrawWatts": 22,
      "power": {
        "input": {
          "voltageRange": "6-16",
          "type": "DC Barrel / NP-F"
        },
        "output": null
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone"
      },
      "audioInput": {
        "portType": "3.5mm Mic/Line"
      },
      "videoInputs": [
        {
          "type": "HDMI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        }
      ]
    },
    "Atomos Shinobi 5": {
      "screenSizeInches": 5.2,
      "brightnessNits": 1000,
      "powerDrawWatts": 7,
      "power": {
        "input": {
          "voltageRange": "6-16",
          "type": "DC Barrel / NP-F"
        },
        "output": null
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": []
    },
    "Atomos Shinobi 7": {
      "screenSizeInches": 7,
      "brightnessNits": 2200,
      "powerDrawWatts": 7,
      "power": {
        "input": {
          "voltageRange": "6-16",
          "type": "DC Barrel / NP-F"
        },
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ]
    },
    "Feelworld FW568": {
      "screenSizeInches": 6,
      "brightnessNits": 450,
      "powerDrawWatts": 11,
      "power": {
        "input": {
          "voltageRange": "7-18",
          "type": "NP-F"
        },
        "output": null
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ]
    },
    "Feelworld F6 Plus": {
      "screenSizeInches": 6,
      "brightnessNits": 450,
      "powerDrawWatts": 9,
      "power": {
        "input": {
          "voltageRange": "7-18",
          "type": "NP-F"
        },
        "output": null
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone"
      },
      "videoInputs": [
        {
          "type": "HDMI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        }
      ]
    },
    "Andycine A6 Pro": {
      "screenSizeInches": 5.5,
      "brightnessNits": 500,
      "powerDrawWatts": 9,
      "power": {
        "input": {
          "voltageRange": "7-18",
          "type": "NP-F"
        },
        "output": null
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone"
      },
      "videoInputs": [
        {
          "type": "HDMI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        }
      ]
    },
    "Lilliput A7S": {
      "screenSizeInches": 7,
      "brightnessNits": 500,
      "powerDrawWatts": 12,
      "power": {
        "input": {
          "voltageRange": "7-18",
          "type": "NP-F"
        },
        "output": null
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "videoInputs": [
        {
          "type": "HDMI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        }
      ]
    },
    "None": {
      "powerDrawWatts": 0,
      "power": {
        "input": {
          "voltageRange": "",
          "type": ""
        },
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [],
      "videoOutputs": []
    }
  },
  "video": {
    "Teradek Bolt 6 LT TX": {
      "powerDrawWatts": 9,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "5.190-5.230 GHz (Non-DFS), 5.270-5.670 GHz (DFS), 5.755-5.795 GHz (Non-DFS), 5.945-6.425 GHz (6GHz/U-NII 5-8)",
      "latencyMs": "< 1ms",
      "power": {
        "input": {
          "type": "LEMO 2-pin",
          "notes": "6-28V"
        }
      }
    },
    "Teradek Bolt 6 XT TX": {
      "powerDrawWatts": 20,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "12G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "12G-SDI"
        }
      ],
      "frequency": "5.190-5.230 GHz (Non-DFS), 5.270-5.670 GHz (DFS), 5.755-5.795 GHz (Non-DFS), 5.945-6.425 GHz (6GHz/U-NII 5-8)",
      "latencyMs": "< 1ms",
      "power": {
        "input": [
          {
            "type": "LEMO 2-pin",
            "notes": "6-28V"
          },
          {
            "type": "Gold-mount"
          },
          {
            "type": "V-mount"
          }
        ]
      }
    },
    "Teradek Bolt 6 MAX TX": {
      "powerDrawWatts": 20,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "12G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "12G-SDI"
        }
      ],
      "frequency": "5.190-5.230 GHz (Non-DFS), 5.270-5.670 GHz (DFS), 5.755-5.795 GHz (Non-DFS), 5.945-6.425 GHz (6GHz/U-NII 5-8)",
      "latencyMs": "< 1ms",
      "power": {
        "input": [
          {
            "type": "LEMO 2-pin",
            "notes": "6-28V"
          },
          {
            "type": "Gold-mount"
          },
          {
            "type": "V-mount"
          }
        ]
      }
    },
    "Teradek Bolt 4K LT TX": {
      "powerDrawWatts": 9,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "5.190-5.230 GHz (Non-DFS), 5.270-5.670 GHz (DFS), 5.755-5.795 GHz (Non-DFS) (with Bluetooth 2.4 GHz for app control)",
      "latencyMs": "< 1ms",
      "power": {
        "input": {
          "type": "LEMO 2-pin",
          "notes": "6-28V"
        }
      }
    },
    "Teradek Bolt 4K XT TX": {
      "powerDrawWatts": 20,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "12G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "12G-SDI"
        }
      ],
      "frequency": "5.190-5.230 GHz (Non-DFS), 5.270-5.670 GHz (DFS), 5.755-5.795 GHz (Non-DFS) (with Bluetooth 2.4 GHz for app control)",
      "latencyMs": "< 1ms",
      "power": {
        "input": [
          {
            "type": "LEMO 2-pin",
            "notes": "6-28V"
          },
          {
            "type": "Gold-mount"
          },
          {
            "type": "V-mount"
          }
        ]
      }
    },
    "Teradek Bolt Pro 300 TX": {
      "powerDrawWatts": 6.5,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "5.19-5.23 GHz (Non-DFS), 5.27-5.55 GHz (DFS), 5.67 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms",
      "power": {
        "input": {
          "type": "LEMO 2-pin",
          "notes": "6-28V"
        }
      }
    },
    "Teradek Bolt Pro 600 TX": {
      "powerDrawWatts": 8,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "5.19-5.23 GHz (Non-DFS), 5.27-5.55 GHz (DFS), 5.67 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms",
      "power": {
        "input": {
          "type": "LEMO 2-pin",
          "notes": "6-28V"
        }
      }
    },
    "Teradek Bolt Pro 2000 TX": {
      "powerDrawWatts": 7.7,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "5.19-5.23 GHz (Non-DFS), 5.27-5.55 GHz (DFS), 5.67 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms",
      "power": {
        "input": {
          "type": "LEMO 2-pin",
          "notes": "6-28V"
        }
      }
    },
    "Teradek Bolt Pro 500 TX": {
      "powerDrawWatts": 7.3,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "5.19-5.23 GHz (Non-DFS), 5.27-5.55 GHz (DFS), 5.67 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms",
      "power": {
        "input": {
          "type": "LEMO 2-pin",
          "notes": "6-28V"
        }
      }
    },
    "Teradek Bolt Pro 750 TX": {
      "powerDrawWatts": 7.5,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "5.19-5.23 GHz (Non-DFS), 5.27-5.55 GHz (DFS), 5.67 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms",
      "power": {
        "input": {
          "type": "LEMO 2-pin",
          "notes": "6-28V"
        }
      }
    },
    "Teradek Bolt Pro 1000 TX": {
      "powerDrawWatts": 7.5,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "5.19-5.23 GHz (Non-DFS), 5.27-5.55 GHz (DFS), 5.67 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms",
      "power": {
        "input": {
          "type": "LEMO 2-pin",
          "notes": "6-28V"
        }
      }
    },
    "Teradek Bolt 3000 TX": {
      "powerDrawWatts": 7.5,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "5.19-5.23 GHz (Non-DFS), 5.27-5.55 GHz (DFS), 5.67 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms",
      "power": {
        "input": {
          "type": "LEMO 2-pin",
          "notes": "6-28V"
        }
      }
    },
    "Teradek Bolt 10000 TX": {
      "powerDrawWatts": 7.5,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "5.19-5.23 GHz (Non-DFS), 5.27-5.55 GHz (DFS), 5.67 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms",
      "power": {
        "input": {
          "type": "LEMO 2-pin",
          "notes": "6-28V"
        }
      }
    },
    "Hollyland Pyro S TX": {
      "powerDrawWatts": 11,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "2.412-2.484 GHz / 5.15-5.85 GHz (Dual-Band Wi-Fi 4)",
      "latencyMs": "50ms",
      "power": {
        "input": [
          {
            "type": "USB-C",
            "notes": "5V-12V"
          },
          {
            "type": "NP-F"
          },
          {
            "type": "DC Barrel",
            "notes": "6-16V"
          }
        ]
      }
    },
    "Hollyland Mars 300 Pro TX": {
      "powerDrawWatts": 11,
      "videoInputs": [
        {
          "type": "HDMI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        }
      ],
      "frequency": "5 GHz",
      "latencyMs": "< 80ms",
      "power": {
        "input": [
          {
            "type": "USB-C",
            "notes": "5-12V"
          },
          {
            "type": "NP-F"
          }
        ]
      }
    },
    "Hollyland Mars 400S Pro TX": {
      "powerDrawWatts": 11,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "5 GHz",
      "latencyMs": "< 80ms",
      "power": {
        "input": [
          {
            "type": "USB-C",
            "notes": "5-12V"
          },
          {
            "type": "NP-F"
          },
          {
            "type": "DC Barrel",
            "notes": "6-16V"
          }
        ]
      }
    },
    "DJI Transmission (TX)": {
      "powerDrawWatts": 11,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "2.4000-2.4835 GHz (Non-DFS), 5.470-5.725 GHz (DFS), 5.725-5.850 GHz (Non-DFS)",
      "latencyMs": "< 60ms",
      "power": {
        "input": [
          {
            "type": "DC-",
            "notes": "6-18V"
          },
          {
            "type": "NP-F"
          },
          {
            "type": "WB37"
          }
        ]
      }
    },
    "Vaxis Storm 800 TX": {
      "powerDrawWatts": 6,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "5.1-5.9 GHz",
      "latencyMs": "< 1ms",
      "power": {
        "input": {
          "type": "LEMO 2-pin",
          "notes": "6-18V"
        }
      }
    },
    "Vaxis Storm 1000 TX": {
      "powerDrawWatts": 6.5,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "5.1-5.9 GHz",
      "latencyMs": "< 1ms",
      "power": {
        "input": {
          "type": "LEMO 2-pin",
          "notes": "6-18V"
        }
      }
    },
    "Vaxis Storm 3000 TX": {
      "powerDrawWatts": 6,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "5.1-5.9 GHz",
      "latencyMs": "< 1ms",
      "power": {
        "input": {
          "type": "LEMO 2-pin",
          "notes": "6-18V"
        }
      }
    },
    "Dwarf Connection LR1 TX": {
      "powerDrawWatts": 6,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "5.1-5.9 GHz (ISM Band, Indoor use often specified due to DFS omission)",
      "latencyMs": "< 1ms",
      "power": {
        "input": {
          "type": "LEMO 2-pin",
          "notes": "6-18V"
        }
      }
    },
    "Accsoon CineEye 2S Pro TX": {
      "powerDrawWatts": 4.5,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        }
      ],
      "frequency": "2.4 GHz / 5 GHz (Dual-Band Wi-Fi)",
      "latencyMs": "< 60ms",
      "power": {
        "input": [
          {
            "type": "USB-C",
            "notes": "5V"
          },
          {
            "type": "NP-F battery"
          }
        ]
      }
    },
    "Accsoon CineEye II TX": {
      "powerDrawWatts": 3.5,
      "videoInputs": [
        {
          "type": "HDMI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        }
      ],
      "frequency": "2.4 GHz / 5 GHz (Dual-Band Wi-Fi)",
      "latencyMs": "< 60ms",
      "power": {
        "input": [
          {
            "type": "USB-C",
            "notes": "5V"
          },
          {
            "type": "NP-F battery"
          }
        ]
      }
    },
    "Accsoon CineView HE TX": {
      "powerDrawWatts": 4.5,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "2.412-2.472 GHz / 5.180-5.580 GHz / 5.660-5.825 MHz (Dual-Band Wi-Fi 5 with MU-MIMO)",
      "latencyMs": "< 60ms",
      "power": {
        "input": [
          {
            "type": "USB-C",
            "notes": "5V"
          },
          {
            "type": "NP-F battery"
          }
        ]
      }
    },
    "Accsoon CineView SE TX": {
      "powerDrawWatts": 4.5,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "2.4 GHz / 5 GHz (Dual-Band Wi-Fi)",
      "latencyMs": "< 60ms",
      "power": {
        "input": [
          {
            "type": "USB-C",
            "notes": "5V"
          },
          {
            "type": "NP-F battery"
          }
        ]
      }
    },
    "Accsoon CineView Nano TX": {
      "powerDrawWatts": 2.5,
      "videoInputs": [
        {
          "type": "HDMI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        }
      ],
      "frequency": "2.4 GHz / 5 GHz (Dual-Band Wi-Fi)",
      "latencyMs": "< 60ms",
      "power": {
        "input": [
          {
            "type": "USB-C",
            "notes": "5V"
          },
          {
            "type": "NP-F battery"
          }
        ]
      }
    },
    "Accsoon CineView Quad TX": {
      "powerDrawWatts": 4.5,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "frequency": "2.4 GHz / 5 GHz (Dual-Band Wi-Fi)",
      "latencyMs": "< 60ms",
      "power": {
        "input": [
          {
            "type": "USB-C",
            "notes": "5V"
          },
          {
            "type": "NP-F battery"
          }
        ]
      }
    },
    "Accsoon CineView Master 4K": {
      "powerDrawWatts": 15,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "12G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "12G-SDI"
        }
      ],
      "frequency": "2.4 GHz / 5 GHz / 6 GHz (Tri-Band Wi-Fi 6E)",
      "latencyMs": "< 60ms",
      "power": {
        "input": [
          {
            "type": "LEMO 2-pin",
            "notes": "7.4-16.8V"
          },
          {
            "type": "NP-F battery"
          }
        ]
      }
    },
    "None": {
      "powerDrawWatts": 0,
      "power": {
        "input": {
          "voltageRange": "",
          "type": ""
        }
      },
      "videoInputs": [],
      "videoOutputs": [],
      "frequency": "5 GHz",
      "latencyMs": null
    }
  },
  "fiz": {
    "motors": {
      "None": {
        "powerDrawWatts": 0,
        "fizConnector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Tilta Nucleus M": {
        "powerDrawWatts": 20,
        "internalController": true,
        "torqueNm": 2.5,
        "gearTypes": [
          "0.8 mod",
          "0.4 mod",
          "0.5 mod",
          "0.6 mod",
          "0.8 mod 29mm wide"
        ],
        "notes": "Rated 2.5 N·m at 14.8V. Can be daisy-chained for power and control. Uses a proprietary 7-pin LEMO cable to the camera’s FIZ port rather than ARRI LBUS. Supports a 29mm thick 0.8 mod gear for lenses with telescoping focus gears. Compatible with standard 0.8 mod lens gears of various diameters.",
        "fizConnectors": [
          {
            "type": "LEMO 7-pin"
          }
        ]
      },
      "Tilta Nucleus M II": {
        "powerDrawWatts": 50,
        "internalController": true,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod",
          "0.4 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "Higher torque than Nucleus M, designed for improved performance. Uses the same 7-pin LEMO connection to the camera FIZ port (not LBUS). The 50W rating is likely a max stall power. Compatible with standard 0.8 mod lens gears of various diameters.",
        "fizConnectors": [
          {
            "type": "LEMO 7-pin"
          }
        ]
      },
      "Tilta Nucleus Nano (Original)": {
        "powerDrawWatts": 5,
        "internalController": true,
        "torqueNm": 1,
        "gearTypes": [
          "0.8 mod"
        ],
        "notes": "Compact motor for lighter lenses. Torque rated at 0.65 N·m at 5.5V and 1 N·m at 14.8V. Compatible with standard 0.8 mod lens gears of various diameters.",
        "fizConnectors": [
          {
            "type": "Micro-USB"
          }
        ]
      },
      "Tilta Nucleus Nano II": {
        "powerDrawWatts": 37,
        "internalController": true,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "Enhanced version of the Nano. Power draw calculated at 2.5A max at 14.8V. USB-C for power and data. Compatible with standard 0.8 mod lens gears of various diameters.",
        "fizConnectors": [
          {
            "type": "USB-C"
          }
        ]
      },
      "Arri Cforce Mini": {
        "powerDrawWatts": 20,
        "internalController": false,
        "torqueNm": 0.5,
        "gearTypes": [
          "0.8 mod",
          "0.4 mod",
          "0.5 mod",
          "0.6 mod",
          "0.8 mod 25mm wide",
          "0.8 mod large diameter (e.g., 80T)"
        ],
        "notes": "Constant 0.3 Nm, maximum peak torque 0.5 Nm. Requires a motor controller such as RIA-1, Master Grips or a camera with built-in controller (ALEXA Mini/Mini LF/Alexa 35) or a cforce mini RF motor. Connects via ARRI LBUS. Supports a 0.8 mod gear with 25mm width and large diameter 0.8 mod gears up to 80 teeth.",
        "fizConnectors": [
          {
            "type": "LBUS (LEMO 4-pin)"
          }
        ]
      },
      "Arri Cforce Plus": {
        "powerDrawWatts": 32,
        "internalController": false,
        "torqueNm": 1,
        "gearTypes": [
          "0.8 mod",
          "0.4 mod",
          "0.5 mod",
          "0.6 mod",
          "0.8 mod 25mm wide",
          "0.8 mod large diameter (e.g., 80T)"
        ],
        "notes": "Constant 0.7 Nm, maximum peak torque 1.0 Nm. Requires a motor controller such as RIA-1, Master Grips or a camera with built-in controller (ALEXA Mini/Mini LF/Alexa 35) or a cforce mini RF motor. Connects via ARRI LBUS. Supports a 0.8 mod gear with 25mm width and large diameter 0.8 mod gears up to 80 teeth.",
        "fizConnectors": [
          {
            "type": "LBUS (LEMO 4-pin)"
          }
        ]
      },
      "Arri CLM-4 (K2.72114.0)": {
        "powerDrawWatts": 12,
        "internalController": false,
        "torqueNm": 0.5,
        "gearTypes": [
          "0.8 mod",
          "0.6 mod",
          "0.5 mod"
        ],
        "notes": "Standard digital lens motor for ARRI LCS. Requires a UMC-4 for control. The UMC-4 works only with the CLM-4 and CLM-5. Part no. K2.72114.0.",
        "fizConnectors": [
          {
            "type": "LEMO 7-pin"
          }
        ]
      },
      "Arri CLM-5 (K2.0006361)": {
        "powerDrawWatts": 24,
        "internalController": false,
        "torqueNm": 1.2,
        "gearTypes": [
          "0.8 mod",
          "0.6 mod",
          "0.5 mod"
        ],
        "notes": "High-torque lens motor for ARRI LCS. Requires a UMC-4 for control. The UMC-4 works only with the CLM-4 and CLM-5. Part no. K2.0006361.",
        "fizConnectors": [
          {
            "type": "LEMO 7-pin"
          }
        ]
      },
      "Arri cforce mini RF (KK.0040345)": {
        "powerDrawWatts": 20,
        "internalController": true,
        "torqueNm": 0.5,
        "gearTypes": [
          "0.8 mod",
          "0.4 mod",
          "0.5 mod",
          "0.6 mod",
          "0.8 mod 25mm wide",
          "0.8 mod large diameter (e.g., 80T)"
        ],
        "notes": "Lens motor with integrated RF receiver and controller. Provides one LBUS port and one CAM port similar to the RIA-1, allowing daisy-chaining of additional motors. When paired with ALEXA Mini/Mini LF/Alexa 35 it is typically powered via a CAM-to-LBUS connection; otherwise use a Cam to D-Tap cable for power.",
        "fizConnectors": [
          {
            "type": "LBUS (LEMO 4-pin), CAM (LEMO 7-pin)"
          }
        ]
      },
      "Teradek RT Motion FIZ (MOTR.S)": {
        "powerDrawWatts": 24,
        "internalController": false,
        "torqueNm": 0.95,
        "gearTypes": [
          "0.8 mod",
          "0.4 mod",
          "0.5 mod",
          "0.6 mod",
          "0.8 mod 12mm wide"
        ],
        "notes": "Max peak torque of 0.95 Nm. Requires a Teradek MDR for control. Max operating current 2A at up to 12V. Teradek offers a 12mm wide 0.8 mod gear. Compatible with standard 0.8 mod lens gears of various diameters.",
        "fizConnectors": [
          {
            "type": "LEMO 4-pin"
          }
        ]
      },
      "Preston DM1X": {
        "powerDrawWatts": 32.4,
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "Very high torque, often used for focus. Max current 2.7A, typically 12V system. No internal controller. Compatible with standard 0.8 mod lens gears of various diameters, including large ones.",
        "fizConnectors": [
          {
            "type": "LEMO 4-pin"
          }
        ]
      },
      "Preston DM2": {
        "powerDrawWatts": 22.2,
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "High torque, general purpose motor. Max current 2.7A, typically 12V system. No internal controller. Compatible with standard 0.8 mod lens gears of various diameters, including large ones.",
        "fizConnectors": [
          {
            "type": "LEMO 4-pin"
          }
        ]
      },
      "Preston DM2X": {
        "powerDrawWatts": 22.2,
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "Improved DM2 with higher torque capabilities and durability in the same physical size. Max current 2.7A, typically 12V system. No internal controller. Compatible with standard 0.8 mod lens gears of various diameters, including large ones.",
        "fizConnectors": [
          {
            "type": "LEMO 4-pin"
          }
        ]
      },
      "Preston DM-A": {
        "powerDrawWatts": 18,
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ],
        "notes": "Compact motor for iris/zoom or lighter focus. No internal controller. Peak power draw from source. Compatible with standard 0.8 mod lens gears of various diameters.",
        "fizConnectors": [
          {
            "type": "LEMO 4-pin"
          }
        ]
      },
      "Preston DM-C": {
        "powerDrawWatts": 18,
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ],
        "notes": "Designed for compact and lighter setups. No internal controller. Peak power draw from source. Compatible with standard 0.8 mod lens gears of various diameters.",
        "fizConnectors": [
          {
            "type": "LEMO 4-pin"
          }
        ]
      },
      "Chrosziel CDM-100 Digital": {
        "powerDrawWatts": 12,
        "internalController": false,
        "torqueNm": 0.5,
        "gearTypes": [
          "0.8 mod",
          "0.4 mod",
          "0.5 mod",
          "0.6 mod",
          "0.8 mod 16mm wide"
        ],
        "notes": "Max torque 0.5 Nm. Max 24V input. Power draw adjusted to typical max. No internal controller. Also supports 0.8 mod with 16mm width. Compatible with standard 0.8 mod lens gears of various diameters.",
        "fizConnectors": [
          {
            "type": "LEMO 7-pin"
          }
        ]
      },
      "Chrosziel CDM-M (Universal Zoom Servo Drive)": {
        "powerDrawWatts": 4.2,
        "internalController": false,
        "torqueNm": 0.5,
        "gearTypes": [
          "0.8 mod",
          "0.4 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "Designed primarily as a zoom servo. Torque 0.5 Nm. Max consumption approx. 350mAh at 12V. No internal controller. Compatible with standard 0.8 mod lens gears of various diameters.",
        "fizConnectors": [
          {
            "type": "LEMO 5-pin"
          }
        ]
      },
      "DJI Focus (Original)": {
        "powerDrawWatts": 21.6,
        "internalController": true,
        "torqueNm": 0.35,
        "gearTypes": [
          "0.8 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "Max torque 0.35 Nm. Max speed 192 rpm. Power draw estimated at 1.5A from 14.4V. Designed to work with standard 0.8 mod lens gears, including those with larger diameters for longer focus throws.",
        "fizConnectors": [
          {
            "type": "USB-C"
          }
        ]
      },
      "DJI RS Focus (2022)": {
        "powerDrawWatts": 22.5,
        "internalController": true,
        "torqueNm": 1,
        "gearTypes": [
          "0.8 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "Max torque 1.0 Nm at 8V. Stall current 2.8A at 8V. Quick-release structure. Designed to work with standard 0.8 mod lens gears, including those with larger diameters for longer focus throws.",
        "fizConnectors": [
          {
            "type": "USB-C"
          }
        ]
      },
      "DJI Focus Pro Motor": {
        "powerDrawWatts": 24,
        "internalController": true,
        "torqueNm": 1.2,
        "gearTypes": [
          "0.8 mod"
        ],
        "notes": "Motor for the DJI Focus Pro system. Used with the Focus Pro Handle and DJI LiDAR Range Finder.",
        "fizConnectors": [
          {
            "type": "USB-C"
          }
        ]
      },
      "Cmotion cPRO": {
        "powerDrawWatts": 24,
        "internalController": true,
        "torqueNm": 1.2,
        "gearTypes": [
          "0.8 mod",
          "0.4 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "Compact and lightweight with integrated RF module and camera interface. Rated 1.2 Nm. Max speed 240 teeth/sec. Compatible with standard 0.8 mod lens gears of various diameters.",
        "fizConnectors": [
          {
            "type": "LEMO 4-pin"
          }
        ]
      },
      "SmallRig Wireless Follow Focus": {
        "powerDrawWatts": 12,
        "internalController": true,
        "torqueNm": 0.43,
        "gearTypes": [
          "0.8 mod"
        ],
        "notes": "Peak torque of 4.3 kgf·cm (approx. 0.43 Nm). Supports PD and QC fast charging. Has built-in battery. Compatible with standard 0.8 mod lens gears of various diameters.",
        "fizConnectors": [
          {
            "type": "USB-C"
          }
        ]
      },
      "Redrock MicroRemote Torque": {
        "powerDrawWatts": 60,
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ],
        "notes": "High torque motor. Max current draw can be up to 5A at 12V. Requires a MicroRemote Basestation. Compatible with standard 0.8 mod lens gears of various diameters.",
        "fizConnectors": [
          {
            "type": "4-pin proprietary"
          }
        ]
      }
    },
    "controllers": {
      "None": {
        "powerDrawWatts": 0,
        "fizConnectors": [],
        "power_source": "N/A",
        "battery_type": "N/A",
        "connectivity": "N/A",
        "notes": "Placeholder for no controller."
      },
      "Arri OCU-1": {
        "powerDrawWatts": 1.32,
        "fizConnectors": [
          {
            "type": "LBUS (LEMO 4-pin)",
            "notes": "built-in cable"
          },
          {
            "type": "LBUS (LEMO 4-pin)",
            "notes": "daisy chain port"
          }
        ],
        "internalController": false,
        "power_source": "External (via LBUS)",
        "battery_type": "N/A",
        "connectivity": "Wired (LBUS) or Wireless (via ZMU-4/RIA-1/Master Grips)",
        "notes": "Single-axis FIZ control (override for WCU-4/Hi-5), compact, lightweight, three assignable user buttons, controls EF lenses without motors on ALEXA Mini/AMIRA, controls SRH-3 roll axis. Should be connected after the main motor controller for correct priority."
      },
      "Arri ZMU-4 (body only, wired)": {
        "powerDrawWatts": 1,
        "fizConnectors": [
          {
            "type": "LBUS (LEMO 4-pin)",
            "notes": "for motors"
          },
          {
            "type": "CAM (LEMO 7-pin)",
            "notes": "for camera control"
          }
        ],
        "internalController": false,
        "power_source": "External DC (10.5-34V via LBUS/CAM) or Internal Battery",
        "battery_type": "Sony NP-F550/750 compatible, ARRI LBP-3500",
        "connectivity": "Wired (LBUS, CAM) or Wireless (with optional RF module - 2400 MHz DSSS)",
        "notes": "Force-sensitive zoom knob, transflective TFT display, user buttons, can act as a radio module host for other LBUS devices (OCU-1, Master Grips), robust, weather-resistant, firmware update via USB-C, configurable camera control. Connect after the main motor controller for correct priority."
      },
      "Arri UMC-4": {
        "powerDrawWatts": 4,
        "fizConnectors": [
          {
            "type": "Serial (LEMO 7-pin)"
          },
          {
            "type": "Serial (LEMO 7-pin)"
          },
          {
            "type": "LCS (LEMO 7-pin)",
            "notes": "adapter available to LBUS"
          },
          {
            "type": "CAM (LEMO 7-pin)"
          },
          {
            "type": "RS (Fischer 3-pin)",
            "notes": "power via D-Tap"
          },
          {
            "type": "Timecode (LEMO 5-pin)"
          },
          {
            "type": "Motor (LEMO 12-pin)"
          },
          {
            "type": "Motor (LEMO 12-pin)"
          },
          {
            "type": "Motor (LEMO 12-pin)"
          }
        ],
        "internalController": true,
        "power_source": "External DC (via RS)",
        "battery_type": "N/A (no internal battery)",
        "connectivity": "Wireless (2.4 GHz ARRI radio, works with WCU-4/Hi-5) or Wired (LCS, CAM, Serial)",
        "notes": "3‑axis motor controller providing lens data and timecode. Works with CLM-4/5 motors and, via LCS‑to‑LBUS cable, with cforce motors."
      },
      "Arri RIA-1": {
        "powerDrawWatts": 2.5,
        "fizConnectors": [
          {
            "type": "LBUS (LEMO 4-pin)"
          },
          {
            "type": "CAM (LEMO 7-pin)"
          },
          {
            "type": "SERIAL (LEMO 4-pin)"
          }
        ],
        "internalController": true,
        "power_source": "External DC (10.5-34V via camera CAM port or Cam to D-Tap cable)",
        "battery_type": "N/A (no internal battery, draws power from camera or external source)",
        "connectivity": "Wireless (swappable ARRI radio modules: RF-EMIP, RF-2400, RF-900) or Wired (LBUS, CAM, SERIAL)",
        "notes": "Versatile receiver/transmitter/motor controller, extends wireless range of WCU-4/SXU-1, brings wireless functionality to Master Grips/OCU-1, supports distance measuring devices (CineRT, Focusbug, UDM-1, Cinetape), camera control (ARRI, Panavision, RED, Sony), compact and robust. Typically powered via a CAM-to-LBUS connection on ALEXA Mini/Mini LF/Alexa 35 cameras or via a Cam to D-Tap cable when used with other cameras. Can be supplemented with an LBUS to D-Tap cable to supply additional power for higher motor torque."
      },
      "Arri Master Grip (single unit)": {
        "powerDrawWatts": 0.72,
        "fizConnectors": [
          {
            "type": "LBUS (LEMO 4-pin)"
          }
        ],
        "internalController": true,
        "power_source": "External (12-34VDC via LBUS)",
        "battery_type": "N/A (no internal battery)",
        "connectivity": "Wired (LBUS) or Wireless (when connected to ZMU-4 or RIA-1 with radio module)",
        "notes": "Ergonomic cine-style handgrip with integrated lens and camera controls. Available in rocker (zoom) or thumbwheel (focus/iris) versions. Can control EF/ENG and cine lenses. Advanced camera control via LCUBE CUB-1 (for third-party cameras). Override function for WCU-4 and Hi-5. Assignable user buttons, multilingual display, focus tracking, adjustable speed control. Connect after the main motor controller for correct priority."
      },
      "Tilta Nucleus-M Hand Grip (single)": {
        "powerDrawWatts": 0.5,
        "fizConnectors": [
          {
            "type": "LEMO 7-pin"
          },
          {
            "type": "ARRI rosette or gimbal bar adapter"
          }
        ],
        "internalController": true,
        "power_source": "Internal Battery",
        "battery_type": "2x 18650 Li-ion (per grip, not included)",
        "connectivity": "Wireless (proprietary 2.4GHz RF, 1000ft/300m range)",
        "notes": "Wireless handgrip for Nucleus-M system. Left grip (focus) and Right grip (iris/zoom toggle). Can be mounted to ARRI rosettes or 25/30mm gimbal rods. Allows splitting FIZ control with the FIZ hand unit. Up to 48 hours battery life (idle)."
      },
      "Tilta Nucleus-M II Handle (single)": {
        "powerDrawWatts": 0.5,
        "fizConnectors": [
          {
            "type": "LEMO 7-pin"
          },
          {
            "type": "ARRI rosette or gimbal bar adapter"
          }
        ],
        "internalController": true,
        "power_source": "Internal Battery",
        "battery_type": "NP-F550 (single per handle)",
        "connectivity": "Wireless (proprietary 2.4GHz RF)",
        "notes": "Improved wireless handgrip for Nucleus-M II system. Supports up to 4 channels (FIZ + ND). Compatible with Nucleus M and Nano II systems. Adjustable damping on hand wheel. Left/Right hand switch for hand wheel. Camera control via Bluetooth or cable."
      },
      "DJI Focus Pro Handle": {
        "powerDrawWatts": 1,
        "fizConnectors": [
          {
            "type": "USB-C"
          }
        ],
        "internalController": true,
        "power_source": "Internal Battery",
        "battery_type": "Built-in rechargeable",
        "connectivity": "Wireless (DJI proprietary)",
        "notes": "Handle unit for the DJI Focus Pro kit. Works with Focus Pro Motors and the DJI LiDAR Range Finder."
      },
      "Preston MDR4": {
        "powerDrawWatts": 48,
        "fizConnectors": [
          {
            "type": "Motor Port (proprietary LEMO 7-pin)"
          },
          {
            "type": "Serial (for Light Ranger 2)"
          },
          {
            "type": "Analog (for Micro Force)"
          },
          {
            "type": "USB (firmware)"
          }
        ],
        "internalController": true,
        "power_source": "External DC (XLR 4-pin or D-Tap)",
        "battery_type": "N/A (no internal battery)",
        "connectivity": "Wireless (Preston G4 radio link to hand units), Wired (via specific cables for camera run/stop, Light Ranger 2)",
        "notes": "2-channel digital motor driver (Focus and Iris or Zoom). Compatible with all Preston hand units (e.g., HU4) and motors. Automatic lens calibration. Each channel has adjustable torque and direction. Supports camera run/stop for various film/video cameras. Compact and suitable for handheld/Steadicam/gimbal. Does not output lens metadata."
      },
      "Redrock microRemote Basestation": {
        "powerDrawWatts": 54,
        "fizConnectors": [
          {
            "type": "Motor port (proprietary 4-pin)"
          },
          {
            "type": "USB"
          },
          {
            "type": "AUX"
          },
          {
            "type": "LEMO 2-pin"
          }
        ],
        "internalController": true,
        "power_source": "External DC (6-18V via LEMO 2-pin)",
        "battery_type": "N/A (no internal battery)",
        "connectivity": "Wireless (proprietary Redrock RF, up to 300ft/90m range) or Wired (USB for firmware/control)",
        "notes": "Central receiver and motor driver for Redrock MicroRemote systems. Supports up to 3 motors (Focus, Iris, Zoom). Automatic or manual calibration. Compatible with various Redrock hand units (e.g., fingerwheel, handheld controller). Provides a single channel for focus, with optional expansion for iris/zoom. Compact and lightweight."
      },
      "Cmotion compact LCS receiver": {
        "powerDrawWatts": 20,
        "fizConnectors": [
          {
            "type": "Motor port (LEMO 4-pin)"
          },
          {
            "type": "Camera (LEMO 7-pin)"
          },
          {
            "type": "EXT (LEMO 4-pin)"
          }
        ],
        "internalController": true,
        "power_source": "External DC (10-34V via Camera port or EXT port)",
        "battery_type": "N/A (no internal battery)",
        "connectivity": "Wireless (proprietary cmotion RF, 2.4 GHz FHSS, up to 150m/500ft range) or Wired (CAM, EXT)",
        "notes": "Compact 3-axis lens control receiver. Compatible with cmotion hand units (e.g., cPRO hand unit, cvolution hand unit). Features an integrated camera run/stop control for various camera systems. Supports lens data communication. Suitable for gimbal, Steadicam, and drone applications due to its small size and lightweight design."
      },
      "Teradek RT Motion CTRL.3 Controller": {
        "powerDrawWatts": 15,
        "fizConnectors": [
          {
            "type": "USB-C"
          },
          {
            "type": "LEMO 2-pin",
            "notes": "power out"
          },
          {
            "type": "LEMO 4-pin",
            "notes": "data to MDR"
          }
        ],
        "internalController": true,
        "power_source": "Internal Battery (rechargeable) or External (USB-C)",
        "battery_type": "Internal Li-ion (proprietary, typically 1-2 hours runtime), charges via USB-C",
        "connectivity": "Wireless (Teradek RT FHSS, up to 5000ft/1500m range) or Wired (via MDR to camera/motors)",
        "notes": "3-axis wireless FIZ controller. Features a customizable focus knob with adjustable damping, iris slider, and zoom rocker. Integrated OLED display for lens data and settings. Supports lens mapping and virtual stops. Compatible with Teradek RT MDRs (e.g., MDR.S, MDR.M, MDR.X). USB-C for charging, firmware updates, and camera control."
      }
    },
    "distance": {
      "None": {
        "powerDrawWatts": 0,
        "connection_compatibility": "N/A",
        "measurement_method": "N/A",
        "measurement_range": "N/A",
        "accuracy": "N/A",
        "output_display": "N/A",
        "notes": "Placeholder for no distance measuring device."
      },
      "UDM-1 + LCube": {
        "powerDrawWatts": 6.24,
        "fizConnectors": [
          {
            "type": "Serial"
          },
          {
            "type": "LBUS (LEMO 4-pin)",
            "notes": "via LCube-1"
          },
          {
            "type": "LBUS (LEMO 4-pin)",
            "notes": "via LCube-1"
          }
        ],
        "connection_compatibility": "ARRI and cmotion systems (via LBUS through LCube CUB-1)",
        "measurement_method": "Ultrasonic (Sonar)",
        "measurement_range": "0.4m - 10m (1ft 4in - 33ft)",
        "accuracy": "High accuracy up close, decreases with distance.",
        "output_display": "Dedicated UDM-1 Display Unit, ARRI WCU-4/Hi-5, compatible ARRI cameras (via LDD/LBUS)",
        "notes": "The UDM-1 is the Ultrasonic Distance Measure. The LCube CUB-1 acts as a protocol converter, enabling the UDM-1 to connect to ARRI LBUS systems (like ALEXA Mini) or output serial data for other systems. It can be calibrated for film plane offset. Provides focus tracking with ARRI LDS equipment. Power draw: UDM-1 is ~6W, LCube CUB-1 is ~0.24W. Total combined power is listed as 6.24W."
      },
      "Focusbug Cine RT + LCube": {
        "powerDrawWatts": 15.24,
        "fizConnectors": [
          {
            "type": "Serial"
          },
          {
            "type": "LBUS (LEMO 4-pin)",
            "notes": "via LCube-1"
          },
          {
            "type": "LBUS (LEMO 4-pin)",
            "notes": "via LCube-1"
          }
        ],
        "connection_compatibility": "ARRI, cmotion, Preston and Teradek systems (via appropriate controllers and LCube CUB-1)",
        "measurement_method": "Ultrasonic (with optional 'Bug' transmitters)",
        "measurement_range": "1ft - 35ft+ (0.3 - 10.6+m) in Ranger mode; 1ft - 120ft (0.3 - 36.5m) with 'Bugs' or Handset Tape Mode",
        "accuracy": "Precision clocking and high sampling rates; high accuracy. Adjustable sensitivity and limits.",
        "output_display": "Handset Control Unit (touchscreen), High-Bright LED Display, ARRI WCU-4/Hi-5, Preston HU3, cmotion, Teradek, Heden LCS",
        "notes": "The Focusbug Cine RT is a comprehensive ultrasonic distance measuring system. The listed power draw is for the main system (Base Sensor + Handset/Display + Bug), with the LCube adding its own small draw. It offers advanced features like tracking multiple 'Bugs' (miniature transmitters), limits, lockout, and a 'Tape Mode' on the handset for quick measurements. The LCube CUB-1 is used for integrating the Cine RT's serial output into ARRI's LBUS ecosystem for seamless data flow."
      },
      "ARRI LCube": {
        "powerDrawWatts": 0.24
      },
      "Preston Light Ranger 2 (LR2) Main Sensor": {
        "powerDrawWatts": 20,
        "connection_compatibility": "Preston systems only (via MDR4)",
        "measurement_method": "LADAR (Laser Detection and Ranging)",
        "measurement_range": "2ft - 60ft (0.6m - 18.3m) with standard sensor; up to 200ft+ with optional long-range sensors.",
        "accuracy": "High precision, measures distance to multiple objects simultaneously.",
        "output_display": "Preston Hand Unit (HU3, HU4, etc.) graphic overlay (multi-point display), configurable display on monitor (via MDR), camera metadata",
        "notes": "The Light Ranger 2 is a multi-point LADAR system that provides real-time distance measurements to multiple objects in the frame. It's known for its robust performance, particularly in challenging environments. Designed to work seamlessly with Preston FIZ systems, displaying focus information directly on the hand unit and allowing for advanced focus pulling techniques."
      },
      "Teradek TOF.1 Range Finder Module": {
        "powerDrawWatts": 3.6,
        "connection_compatibility": "Teradek systems only (MDR.X/MDR.S/MDR.M)",
        "measurement_method": "LiDAR (Time-of-Flight Laser)",
        "measurement_range": "0.3m - 20m (1ft - 65ft)",
        "accuracy": "High accuracy, particularly for single-point measurement.",
        "output_display": "Teradek RT CTRL.3 hand unit, compatible Teradek RT MDRs, Bolt monitor overlays (via MDR)",
        "notes": "Compact and lightweight single-point LiDAR rangefinder. Designed to integrate seamlessly with the Teradek RT lens control ecosystem. Provides precise real-time distance data for automated or assisted focus. It offers strong performance even in low-light conditions and is suitable for various camera setups."
      },
      "DJI LiDAR Range Finder": {
        "powerDrawWatts": 6.8,
        "connection_compatibility": "DJI Ronin 4D or Focus Pro Handle with Focus Pro Motors",
        "measurement_method": "LiDAR (Light Detection and Ranging)",
        "measurement_range": "0.5m - 14m (1.6ft - 46ft)",
        "accuracy": "43,200 ranging points, up to 30Hz refresh rate, high accuracy.",
        "output_display": "DJI RS gimbal screen, DJI Focus Motor (visual focus assist), DJI RS Focus Motor, Ronin App",
        "notes": "Integrated LiDAR sensor designed for DJI RS series gimbals. It provides accurate and fast distance measurements, enabling autofocus for manual lenses (when paired with a DJI Focus Motor). Features a built-in camera that can recognize the subject and track focus. Ideal for solo operators seeking precise autofocus capabilities with cinema lenses."
      }
    }
  },
  "batteries": {
    "None": {
      "capacity": 0,
      "pinA": 0,
      "dtapA": 0,
      "mount_type": "N/A"
    },
    "Bebob V45micro": {
      "capacity": 43,
      "pinA": 10,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Bebob V98micro": {
      "capacity": 95,
      "pinA": 10,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Bebob V150micro": {
      "capacity": 143,
      "pinA": 10,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Bebob V200micro": {
      "capacity": 190,
      "pinA": 10,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Bebob V240micro": {
      "capacity": 238,
      "pinA": 10,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Bebob V90RM-Cine": {
      "capacity": 85,
      "pinA": 20,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Bebob V155RM-Cine": {
      "capacity": 156,
      "pinA": 20,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Bebob V290RM-Cine": {
      "capacity": 285,
      "pinA": 20,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Bebob B90cine": {
      "capacity": 86,
      "pinA": 20,
      "dtapA": 5,
      "mount_type": "B-Mount"
    },
    "Bebob B155cine": {
      "capacity": 155,
      "pinA": 20,
      "dtapA": 5,
      "mount_type": "B-Mount"
    },
    "Bebob B290cine": {
      "capacity": 294,
      "pinA": 20,
      "dtapA": 5,
      "mount_type": "B-Mount"
    },
    "Bebob B480cine": {
      "capacity": 475,
      "pinA": 20,
      "dtapA": 5,
      "mount_type": "B-Mount"
    },
    "Bebob B90cineML": {
      "capacity": 86,
      "pinA": 20,
      "dtapA": 5,
      "mount_type": "B-Mount"
    },
    "Bebob B155cineML": {
      "capacity": 156,
      "pinA": 20,
      "dtapA": 5,
      "mount_type": "B-Mount"
    },
    "Swit MINO-S70 (V-Mount)": {
      "capacity": 70,
      "pinA": 8.3,
      "dtapA": 6,
      "mount_type": "V-Mount"
    },
    "Swit MINO-S140 (V-Mount)": {
      "capacity": 140,
      "pinA": 12.5,
      "dtapA": 8,
      "mount_type": "V-Mount"
    },
    "Swit MINO-S210 (V-Mount)": {
      "capacity": 210,
      "pinA": 16,
      "dtapA": 10,
      "mount_type": "V-Mount"
    },
    "Swit PB-M98S (Mini V-Mount)": {
      "capacity": 98,
      "pinA": 10,
      "dtapA": 6,
      "mount_type": "V-Mount"
    },
    "Swit PB-R290S (V-Mount)": {
      "capacity": 290,
      "pinA": 18,
      "dtapA": 10,
      "mount_type": "V-Mount"
    },
    "Swit PB-H260S (V-Mount)": {
      "capacity": 260,
      "pinA": 18,
      "dtapA": 10,
      "mount_type": "V-Mount"
    },
    "Swit HB-A290B (B-Mount)": {
      "capacity": 290,
      "pinA": 10,
      "dtapA": 3.75,
      "mount_type": "B-Mount"
    },
    "Swit PB-H290B (B-Mount)": {
      "capacity": 290,
      "pinA": 10,
      "dtapA": 3.75,
      "mount_type": "B-Mount"
    },
    "Swit BIVO-98 (B-Mount)": {
      "capacity": 98,
      "pinA": 10,
      "dtapA": 10.4,
      "mount_type": "B-Mount"
    },
    "Swit BIVO-160 (B-Mount)": {
      "capacity": 160,
      "pinA": 10,
      "dtapA": 10.4,
      "mount_type": "B-Mount"
    },
    "Swit BIVO-200 (B-Mount)": {
      "capacity": 196,
      "pinA": 10,
      "dtapA": 10.4,
      "mount_type": "B-Mount"
    },
    "Swit CIMO-98S (V-Mount)": {
      "capacity": 98,
      "pinA": 12,
      "dtapA": 12,
      "mount_type": "V-Mount"
    },
    "Swit CIMO-160S (V-Mount)": {
      "capacity": 160,
      "pinA": 16,
      "dtapA": 16,
      "mount_type": "V-Mount"
    },
    "Swit CIMO-200S (V-Mount)": {
      "capacity": 196,
      "pinA": 16,
      "dtapA": 16,
      "mount_type": "V-Mount"
    },
    "Swit CIMO-290S (V-Mount)": {
      "capacity": 290,
      "pinA": 20,
      "dtapA": 20,
      "mount_type": "V-Mount"
    },
    "Anton/Bauer Titon 90 (V-Mount)": {
      "capacity": 92,
      "pinA": 10,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Anton/Bauer Titon 150 (V-Mount)": {
      "capacity": 144,
      "pinA": 10,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Anton/Bauer Titon 240 (V-Mount)": {
      "capacity": 240,
      "pinA": 10,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Anton/Bauer Dionic XT90 (V-Mount)": {
      "capacity": 99,
      "pinA": 12,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Anton/Bauer Dionic XT150 (V-Mount)": {
      "capacity": 156,
      "pinA": 12,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Anton/Bauer Dionic 240Wh (V-Mount)": {
      "capacity": 240,
      "pinA": 12,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Anton/Bauer Dionic 26V 98Wh (B-Mount)": {
      "capacity": 98,
      "pinA": 12,
      "dtapA": 0,
      "mount_type": "B-Mount"
    },
    "Anton/Bauer Dionic 26V 240Wh (B-Mount)": {
      "capacity": 240,
      "pinA": 12,
      "dtapA": 0,
      "mount_type": "B-Mount"
    },
    "Core SWX NANO Micro 98Wh (V-Mount)": {
      "capacity": 98,
      "pinA": 10,
      "dtapA": 10,
      "mount_type": "V-Mount"
    },
    "Core SWX NANO Micro 150Wh (V-Mount)": {
      "capacity": 150,
      "pinA": 10,
      "dtapA": 10,
      "mount_type": "V-Mount"
    },
    "Core SWX Helix Max 98Wh (V-Mount)": {
      "capacity": 98,
      "pinA": 20,
      "dtapA": 7.14,
      "mount_type": "V-Mount"
    },
    "Core SWX Helix Max 150Wh (V-Mount)": {
      "capacity": 147,
      "pinA": 20,
      "dtapA": 7.14,
      "mount_type": "V-Mount"
    },
    "Core SWX Helix Max 360Wh (V-Mount)": {
      "capacity": 360,
      "pinA": 20,
      "dtapA": 7.14,
      "mount_type": "V-Mount"
    },
    "Core SWX Helix Max 98Wh (B-Mount)": {
      "capacity": 98,
      "pinA": 10,
      "dtapA": 0,
      "mount_type": "B-Mount"
    },
    "Core SWX Helix Max 150Wh (B-Mount)": {
      "capacity": 147,
      "pinA": 10,
      "dtapA": 0,
      "mount_type": "B-Mount"
    },
    "Core SWX Apex 150 (V-Mount)": {
      "capacity": 150,
      "pinA": 16,
      "dtapA": 12,
      "mount_type": "V-Mount"
    },
    "Core SWX Apex 360 (V-Mount)": {
      "capacity": 360,
      "pinA": 16,
      "dtapA": 12,
      "mount_type": "V-Mount"
    },
    "IDX Imicro-98 (V-Mount)": {
      "capacity": 97,
      "pinA": 10,
      "dtapA": 5.56,
      "mount_type": "V-Mount"
    },
    "IDX Imicro-150 (V-Mount)": {
      "capacity": 145,
      "pinA": 10,
      "dtapA": 5.56,
      "mount_type": "V-Mount"
    },
    "IDX DUO-C98 (V-Mount)": {
      "capacity": 97,
      "pinA": 10,
      "dtapA": 5.56,
      "mount_type": "V-Mount"
    },
    "IDX DUO-C150 (V-Mount)": {
      "capacity": 143,
      "pinA": 14,
      "dtapA": 5.56,
      "mount_type": "V-Mount"
    },
    "IDX DUO-C198 (V-Mount)": {
      "capacity": 196,
      "pinA": 14,
      "dtapA": 5.56,
      "mount_type": "V-Mount"
    },
    "IDX CUE-D95 (V-Mount)": {
      "capacity": 91,
      "pinA": 10,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "IDX CUE-D150 (V-Mount)": {
      "capacity": 146,
      "pinA": 10,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "IDX HV-160B (B-Mount)": {
      "capacity": 160,
      "pinA": 15,
      "dtapA": 10,
      "mount_type": "B-Mount"
    },
    "IDX HV-320B (B-Mount)": {
      "capacity": 320,
      "pinA": 15,
      "dtapA": 10,
      "mount_type": "B-Mount"
    },
    "SmallRig VB50 mini (V-Mount)": {
      "capacity": 50,
      "pinA": 8,
      "dtapA": 10,
      "mount_type": "V-Mount"
    },
    "SmallRig VB99 mini (V-Mount)": {
      "capacity": 99,
      "pinA": 10,
      "dtapA": 10,
      "mount_type": "V-Mount"
    },
    "SmallRig VB155 mini (V-Mount)": {
      "capacity": 155,
      "pinA": 12,
      "dtapA": 10,
      "mount_type": "V-Mount"
    },
    "SmallRig VB210 mini (V-Mount)": {
      "capacity": 210,
      "pinA": 14,
      "dtapA": 10,
      "mount_type": "V-Mount"
    },
    "SmallRig VB99 Pro mini (V-Mount)": {
      "capacity": 99,
      "pinA": 10,
      "dtapA": 10,
      "mount_type": "V-Mount"
    },
    "SmallRig VB212 mini (V-Mount)": {
      "capacity": 212,
      "pinA": 14.7,
      "dtapA": 10,
      "mount_type": "V-Mount"
    },
    "Hawk-Woods Mini V-Lok 50Wh": {
      "capacity": 50,
      "pinA": 6,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Hawk-Woods Mini V-Lok 98Wh": {
      "capacity": 98,
      "pinA": 10,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Hawk-Woods Mini V-Lok 150Wh": {
      "capacity": 150,
      "pinA": 12,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Hawk-Woods Mini V-Lok 200Wh": {
      "capacity": 200,
      "pinA": 16,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Hawk-Woods Mini V-Lok 250Wh": {
      "capacity": 250,
      "pinA": 16,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Hawk-Woods V-Lok 95Wh (VL-95S)": {
      "capacity": 95,
      "pinA": 10,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Hawk-Woods V-Lok 200Wh (VL-200S)": {
      "capacity": 200,
      "pinA": 16,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Hawk-Woods V-Lok 350Wh (VL-350N High Performance)": {
      "capacity": 350,
      "pinA": 15,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Hawk-Woods X-Lok 98Wh (XL-98)": {
      "capacity": 98,
      "pinA": 10,
      "dtapA": 5,
      "mount_type": "V-Mount"
    },
    "Hawk-Woods X-Lok 150Wh (XL-150)": {
      "capacity": 150,
      "pinA": 12,
      "dtapA": 5,
      "mount_type": "V-Mount"
    }
  },
  "accessories": {
    "powerPlates": {
      "Generic V-Mount Plate": {
        "mount": "V-Mount"
      }
    },
    "cages": {
      "Universal Cage": {
        "compatible": ["Arri Alexa Mini", "Arri Alexa Mini LF"]
      },
      "Tilta Full Camera Cage for BMPCC 6K Pro/G2 (TA-T11-FCC)": {
        "brand": "Tilta",
        "compatible": ["Blackmagic Pocket Cinema Camera 6K Pro", "Blackmagic BMPCC 6K G2"],
        "material": null,
        "weight_g": null,
        "mounting_points": ["1/4\"-20", "3/8\"-16", "ARRI locating", "cold shoe", "NATO rail"],
        "top_handle_included": false,
        "side_plates": true,
        "notes": "Tilta full cage with NATO rails and rod ports.",
        "verified_source": "https://tilta.com/shop/full-camera-cage-for-bmpcc-6k-pro/"
      },
      "SmallRig Full Cage for BMPCC 4K/6K (2203B)": {
        "brand": "SmallRig",
        "compatible": ["Blackmagic BMPCC 4K", "Blackmagic BMPCC 6K"],
        "material": "aluminum",
        "weight_g": null,
        "mounting_points": ["1/4\"-20", "3/8\"-16", "cold shoe", "ARRI locating"],
        "top_handle_included": false,
        "side_plates": true,
        "notes": "Classic SmallRig cage for BMPCC 4K/6K.",
        "verified_source": "https://www.smallrig.com/smallrig-camera-cage-for-bmpcc-4k-2203b.html"
      },
      "Wooden Camera Camera Cage for BMPCC 6K Pro / 6K G2": {
        "brand": "Wooden Camera",
        "compatible": ["Blackmagic Pocket Cinema Camera 6K Pro", "Blackmagic BMPCC 6K G2"],
        "material": "aluminum",
        "weight_g": null,
        "mounting_points": ["3/8\"-16 (front)", "ARRI locating"],
        "top_handle_included": false,
        "side_plates": true,
        "notes": "ARRI locating pins compatible.",
        "verified_source": "https://woodencamera.com/products/blackmagic-pocket-cinema-camera-6k-pro-camera-cage"
      },
      "Tilta Full Camera Cage for Sony FX3/FX30 V2": {
        "brand": "Tilta",
        "compatible": ["Sony FX3", "Sony FX30"],
        "material": null,
        "weight_g": null,
        "mounting_points": ["ARCA QR plate", "1/4\"-20", "3/8\"-16", "cold shoe"],
        "top_handle_included": false,
        "side_plates": true,
        "notes": "Quick release ARCA base; modular system.",
        "verified_source": "https://tilta.com/shop/full-camera-cage-for-sony-fx3-fx30-v2/"
      },
      "SmallRig Camera Cage for Sony FX6 (3186)": {
        "brand": "SmallRig",
        "compatible": ["Sony FX6"],
        "material": null,
        "weight_g": null,
        "mounting_points": ["ARRI rosette", "1/4\"-20", "3/8\"-16"],
        "top_handle_included": false,
        "side_plates": true,
        "notes": "Fits FX6 body with rosette mounts.",
        "verified_source": "https://www.smallrig.com/smallrig-camera-cage-for-sony-fx6-3186.html"
      },
      "Bright Tangerine LeftField Baseplate & Cage Kit for Sony FX9": {
        "brand": "Bright Tangerine",
        "compatible": ["Sony FX9"],
        "material": null,
        "weight_g": null,
        "mounting_points": ["15mm LWS", "ARRI locating", "1/4\"-20", "3/8\"-16"],
        "top_handle_included": false,
        "side_plates": true,
        "notes": "Bright Tangerine LeftField support system for FX9.",
        "verified_source": "https://www.brighttangerine.com/"
      },
      "Tilta Full Camera Cage for Sony a7/a9 Series (TA-T17-FCC-G)": {
        "brand": "Tilta",
        "compatible": ["Sony A7", "Sony A7 II", "Sony A7 III", "Sony A7S", "Sony A7S II", "Sony A7R", "Sony A7R II", "Sony A7R III", "Sony A7R IV", "Sony A9"],
        "material": null,
        "weight_g": null,
        "mounting_points": ["cold shoe", "1/4\"-20", "3/8\"-16", "ARRI locating", "NATO rail"],
        "top_handle_included": false,
        "side_plates": true,
        "notes": "Tilta cage with NATO rail and ARRI locating points.",
        "verified_source": "https://www.amazon.com/dp/B081GZ7JGM"
      },
      "SmallRig Full Camera Cage for Sony A7R V / A7 IV / A7S III / A1 / A7R IV (3667B)": {
        "brand": "SmallRig",
        "compatible": ["Sony A7R V", "Sony A7 IV", "Sony A7S III", "Sony A1", "Sony A7R IV"],
        "material": "aluminum",
        "weight_g": null,
        "mounting_points": ["1/4\"-20", "ARRI 3/8\"-16 locating", "cold shoe", "NATO rail"],
        "top_handle_included": false,
        "side_plates": true,
        "notes": "Arca-Swiss base; triple lock.",
        "verified_source": "https://www.smallrigreseller.com/smallrig-full-cage-for-sony-alpha-7-iv-alpha-7s-iii-alpha-1-3667.html"
      },
      "ARRI Pro Set for Sony a7S II": {
        "brand": "ARRI",
        "compatible": ["Sony A7S II"],
        "material": null,
        "weight_g": null,
        "mounting_points": ["1/4\"-20", "3/8\"-16"],
        "top_handle_included": false,
        "side_plates": true,
        "notes": "ARRI PCA kit for a7S II.",
        "verified_source": "https://www.bhphotovideo.com/c/product/1287557-REG/arri_kk_0010079_pro_set_for_sony.html"
      },
      "SHAPE Canon C70 Cage with Top Handle": {
        "brand": "SHAPE",
        "compatible": ["Canon C70"],
        "material": null,
        "weight_g": null,
        "mounting_points": ["ARRI 3/8\"-16 anti-twist", "1/4\"-20", "cold shoe"],
        "top_handle_included": true,
        "side_plates": true,
        "notes": "C70 cage with ARRI-style threads and top handle.",
        "verified_source": "https://www.shapewlb.com/products/shape-canon-c70-camera-cage-with-top-handle"
      },
      "Kondor Blue Canon C70 Cage": {
        "brand": "Kondor Blue",
        "compatible": ["Canon C70"],
        "material": null,
        "weight_g": null,
        "mounting_points": ["dual NATO rails", "1/4\"-20", "ARRI 3/8\"-16", "cold shoe"],
        "top_handle_included": false,
        "side_plates": true,
        "notes": "Three-sided modular cage; compatible with Canon stock handle.",
        "verified_source": "https://kondorblue.com/products/canon-c70-cage"
      },
      "Bright Tangerine LeftField 3 Expert Kit for RED KOMODO & KOMODO-X": {
        "brand": "Bright Tangerine",
        "compatible": ["RED Komodo 6k", "RED Komodo X"],
        "material": null,
        "weight_g": null,
        "mounting_points": ["1/4\"-20", "3/8\"-16", "NATO rail"],
        "top_handle_included": false,
        "side_plates": true,
        "notes": "LeftField 3 kit with side rails & helicoil mounts.",
        "verified_source": "https://www.brighttangerine.com/product/leftfield-3-expert-kit-for-red-komodo-komodo-x-dji-rs-4-rs-3/"
      },
      "Wooden Camera Complete Cage Kit for RED KOMODO": {
        "brand": "Wooden Camera",
        "compatible": ["RED Komodo 6k"],
        "material": "aluminum",
        "weight_g": null,
        "mounting_points": ["ARRI locating", "1/4\"-20", "3/8\"-16"],
        "top_handle_included": true,
        "side_plates": true,
        "notes": "Wooden Camera RED KOMODO cage with top plate.",
        "verified_source": "https://woodencamera.com/products/komodo-camera-cage"
      },
      "ARRI Cage Support Kit for ALEXA Mini LF": {
        "brand": "ARRI",
        "compatible": ["Arri Alexa Mini", "Arri Alexa Mini LF"],
        "material": null,
        "weight_g": null,
        "mounting_points": ["15mm LWS", "ARRI locating", "3/8\"-16", "1/4\"-20"],
        "top_handle_included": true,
        "side_plates": true,
        "notes": "ARRI PCA kit including cage plates, top handle, and 15mm support.",
        "verified_source": "https://www.arri.com/en/camera-systems/accessories/pro-camera-accessories"
      },
      "Wooden Camera Cage Kit for ARRI ALEXA Mini / Mini LF": {
        "brand": "Wooden Camera",
        "compatible": ["Arri Alexa Mini", "Arri Alexa Mini LF"],
        "material": "aluminum",
        "weight_g": null,
        "mounting_points": ["ARRI locating", "1/4\"-20", "3/8\"-16"],
        "top_handle_included": true,
        "side_plates": true,
        "notes": "Complete Wooden Camera cage with top plate, side plates, and baseplate.",
        "verified_source": "https://woodencamera.com/products/camera-cage-for-arri-alexa-mini"
      },
      "Bright Tangerine LeftField Cage Kit for ARRI ALEXA Mini / Mini LF": {
        "brand": "Bright Tangerine",
        "compatible": ["Arri Alexa Mini", "Arri Alexa Mini LF"],
        "material": null,
        "weight_g": null,
        "mounting_points": ["ARRI locating", "15mm LWS", "3/8\"-16"],
        "top_handle_included": false,
        "side_plates": true,
        "notes": "LeftField 15mm baseplate and side cage system.",
        "verified_source": "https://www.brighttangerine.com/"
      },
      "Tilta Canon C300 Mark III / C500 Mark II Cage Kit": {
        "brand": "Tilta",
        "compatible": ["Canon C300 Mk III", "Canon C500 Mk II"],
        "material": null,
        "weight_g": null,
        "mounting_points": ["1/4\"-20", "3/8\"-16", "ARRI locating", "NATO rail"],
        "top_handle_included": true,
        "side_plates": true,
        "notes": "Tilta cage with top plate and quick release side plates.",
        "verified_source": "https://tilta.com/"
      },
      "SHAPE Canon C300 MkIII / C500 MkII Cage Kit": {
        "brand": "SHAPE",
        "compatible": ["Canon C300 Mk III", "Canon C500 Mk II"],
        "material": null,
        "weight_g": null,
        "mounting_points": ["ARRI anti-twist 3/8\"-16", "cold shoe", "1/4\"-20"],
        "top_handle_included": true,
        "side_plates": true,
        "notes": "Form fitting cage with top handle and ARRI threads.",
        "verified_source": "https://www.shapewlb.com/"
      },
      "ARRI Pro Camera Accessories Kit for RED DSMC2": {
        "brand": "ARRI",
        "compatible": ["RED DSMC2", "RED Ranger"],
        "material": null,
        "weight_g": null,
        "mounting_points": ["ARRI locating", "15mm LWS", "1/4\"-20", "3/8\"-16"],
        "top_handle_included": true,
        "side_plates": true,
        "notes": "ARRI PCA cage set for RED DSMC2 / Ranger.",
        "verified_source": "https://www.arri.com/"
      },
      "Wooden Camera Cage Kit for RED DSMC2": {
        "brand": "Wooden Camera",
        "compatible": ["RED DSMC2"],
        "material": "aluminum",
        "weight_g": null,
        "mounting_points": ["ARRI locating", "1/4\"-20", "3/8\"-16"],
        "top_handle_included": true,
        "side_plates": true,
        "notes": "Wooden Camera DSMC2 cage with top plate, side plates, baseplate.",
        "verified_source": "https://woodencamera.com/products/unified-camera-cage-for-red-dsmc2"
      },
      "Bright Tangerine Cage Support Kit for Sony VENICE / VENICE 2": {
        "brand": "Bright Tangerine",
        "compatible": ["Sony Venice", "Sony Venice 2"],
        "material": null,
        "weight_g": null,
        "mounting_points": ["ARRI locating", "3/8\"-16", "1/4\"-20", "15mm LWS"],
        "top_handle_included": true,
        "side_plates": true,
        "notes": "Professional cage kit with 15mm support for VENICE systems.",
        "verified_source": "https://www.brighttangerine.com/"
      }
    },
    "chargers": {
      "Dual V-Mount Charger": {
        "mount": "V-Mount",
        "slots": 2
      }
    },
    "cables": {
      "power": {
        "D-Tap to LEMO 2-pin": { "from": "D-Tap", "to": "LEMO 2-pin" }
      },
      "fiz": {
        "LBUS to LBUS": { "from": "LBUS (LEMO 4-pin)", "to": "LBUS (LEMO 4-pin)" }
      },
      "video": {
        "BNC SDI Cable": { "type": "3G-SDI" },
        "HDMI Cable": { "type": "HDMI" }
      },
      "cables": {
        "Cable CAM (10-pin) – EXT (7-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.0007730",
          "lengthM": 0.5,
          "connectors": ["CAM (10-pin)", "EXT (7-pin)"],
          "orientation": "straight",
          "useCase": ["Run/Stop", "Tally"],
          "compatibleControllers": ["SMC-1", "EMC-1", "AMC-1"],
          "compatibleCameras": ["ALEXA Mini", "ALEXA Mini LF"]
        },
        "Cable CAM (10-pin) – RS (3-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.0001606",
          "lengthM": 0.5,
          "connectors": ["CAM (10-pin)", "ARRI RS (3-pin)"],
          "orientation": "straight",
          "useCase": ["Run/Stop", "Tally"],
          "compatibleControllers": ["SMC-1", "EMC-1", "AMC-1"],
          "compatibleCameras": ["ALEXA", "AMIRA"]
        },
        "Cable CAM (10-pin) – D-Tap": {
          "brand": "ARRI",
          "kNumber": "K2.0002682",
          "lengthM": 0.5,
          "connectors": ["CAM (10-pin)", "D-Tap"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleControllers": ["SMC-1", "EMC-1", "AMC-1"]
        },
        "Cable CAM (10-pin) – LANC/D-Tap": {
          "brand": "ARRI",
          "kNumber": "K2.0001999",
          "lengthM": 0.5,
          "connectors": ["CAM (10-pin)", "LANC + D-Tap"],
          "orientation": "straight",
          "useCase": ["Run/Stop", "Tally", "Power"],
          "compatibleControllers": ["SMC-1", "EMC-1", "AMC-1"],
          "compatibleCameras": ["Canon C300/500", "Sony PXW-FS7"]
        },
        "Cable CAM (10-pin) – Sony F5/55": {
          "brand": "ARRI",
          "kNumber": "K2.0001997",
          "lengthM": 0.5,
          "connectors": ["CAM (10-pin)", "Sony Remote"],
          "orientation": "straight",
          "useCase": ["Run/Stop", "Tally"],
          "compatibleControllers": ["SMC-1", "EMC-1", "AMC-1"],
          "compatibleCameras": ["Sony F5", "Sony F55", "Sony Venice", "Panasonic Varicam 35"]
        },
        "Cable CAM (10-pin) – RED EPIC/D-Tap": {
          "brand": "ARRI",
          "kNumber": "K2.0001998",
          "lengthM": 1.0,
          "connectors": ["CAM (10-pin ×2)", "RED EPIC + D-Tap"],
          "orientation": "straight",
          "useCase": ["Run/Stop", "Power"],
          "compatibleControllers": ["SMC-1", "EMC-1", "AMC-1"],
          "compatibleCameras": ["RED EPIC", "RED Weapon"]
        },
        "Cable CAM (10-pin) – PSC": {
          "brand": "ARRI",
          "kNumber": "K2.0002727",
          "lengthM": 0.7,
          "connectors": ["CAM (10-pin)", "PSC"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleControllers": ["SMC-1", "EMC-1", "AMC-1"]
        },
        "Cable CAM (10-pin) – Open End": {
          "brand": "ARRI",
          "kNumber": "K2.0002725",
          "lengthM": 0.5,
          "connectors": ["CAM (10-pin)", "Open End"],
          "orientation": "straight",
          "useCase": ["Custom"],
          "compatibleControllers": ["SMC-1", "EMC-1", "AMC-1"]
        },
        "Cable Cooke/i Lens Control (16-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.65012.0",
          "lengthM": 0.7,
          "connectors": ["CAM (16-pin)", "Cooke/i"],
          "orientation": "straight",
          "useCase": ["Lens Control"],
          "compatibleControllers": ["Universal Motor Controller"]
        },
        "Battery Adapter VMicro (WVR-1s)": {
          "brand": "ARRI",
          "kNumber": "K2.0024373",
          "lengthM": null,
          "connectors": ["VMicro Battery", "Lemo 12 V Out (2-pin)"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleDevices": ["WVR-1s Wireless Video Receiver"]
        },
        "Battery Adapter AMicro (WVR-1s)": {
          "brand": "ARRI",
          "kNumber": "K2.0024374",
          "lengthM": null,
          "connectors": ["AMicro Battery", "Lemo 12 V Out (2-pin)"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleDevices": ["WVR-1s"]
        },
        "Receiver Power Supply (RPS-1)": {
          "brand": "ARRI",
          "kNumber": "K2.0014774",
          "lengthM": null,
          "connectors": ["AC In", "Output to WVR-1"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleDevices": ["WVR-1", "WVT-1", "UMC-4"]
        },
        "PWR OUT Lemo (2-pin) – RS/PWR IN Fischer (3-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.0014331",
          "lengthM": 0.5,
          "connectors": ["Lemo 2-pin", "Fischer 3-pin"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleDevices": ["WVR-1", "WVT-1", "UMC-4"]
        },
        "PWR OUT Lemo (2-pin) – XLR (4-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.0014342",
          "lengthM": 0.5,
          "connectors": ["Lemo 2-pin", "XLR 4-pin"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleDevices": ["Camera/Monitor from battery plate or WVR-1"]
        },
        "PWR OUT Lemo (2-pin) – MiniXLR (4-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.0014343",
          "lengthM": 0.5,
          "connectors": ["Lemo 2-pin", "MiniXLR 4-pin"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleDevices": ["External camera monitor"]
        },
        "PWR OUT Lemo (2-pin) – Hi (4-pin Hirose)": {
          "brand": "ARRI",
          "kNumber": "K2.0014344",
          "lengthM": 0.5,
          "connectors": ["Lemo 2-pin", "Hirose 4-pin"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleDevices": ["External camera monitor"]
        },
        "PWR OUT Lemo (2-pin) – Lemo 5-pin": {
          "brand": "ARRI",
          "kNumber": "K2.0014777",
          "lengthM": 0.5,
          "connectors": ["Lemo 2-pin", "Lemo 5-pin"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleDevices": ["Camera accessories"]
        },
        "PWR OUT Lemo (2-pin) – LCS (5-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.0024590",
          "lengthM": 0.3,
          "connectors": ["Lemo 2-pin", "LCS 5-pin"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleDevices": ["WCU-4", "SXU-1"]
        },
        "Monitor Power 12 V (Lemo 0B 2-pin to XLR 4-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.0010546",
          "lengthM": null,
          "connectors": ["Lemo 0B 2-pin", "XLR 4-pin"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleSystems": ["ARTEMIS/TRINITY"]
        },
        "Monitor Power 12 V (Lemo 0B 2-pin to Lemo 0B 2-pin Short)": {
          "brand": "ARRI",
          "kNumber": "K2.0041723",
          "lengthM": null,
          "connectors": ["Lemo 0B 2-pin", "Lemo 0B 2-pin"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleSystems": ["ARTEMIS/TRINITY"]
        },
        "360 EVO D-Tap / XLR Battery Power to RCP or Monitor": {
          "brand": "ARRI",
          "kNumber": "K2.0021422",
          "lengthM": 1.5,
          "connectors": ["D-Tap", "XLR 4-pin"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleSystems": ["360 EVO", "SRH-3", "SRH-360"]
        },
        "MTG Monitor Power (Lemo 0B 4-pin to Lemo 0B 2-pin, 24 V)": {
          "brand": "ARRI",
          "kNumber": "K2.0038998",
          "lengthM": null,
          "connectors": ["Lemo 0B 4-pin", "Lemo 0B 2-pin"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleSystems": ["Master Grip", "TRINITY 2"]
        },
        "MTG Monitor Power (Lemo 0B 4-pin to Lemo 0B 5-pin, 24 V)": {
          "brand": "ARRI",
          "kNumber": "K2.0038999",
          "lengthM": null,
          "connectors": ["Lemo 0B 4-pin", "Lemo 0B 5-pin"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleSystems": ["Master Grip", "TRINITY 2"]
        },
        "TRINITY 2 Joystick Cable": {
          "brand": "ARRI",
          "kNumber": "K2.0043861",
          "lengthM": 0.75,
          "connectors": ["Lemo 0B 4-pin", "Lemo 0B 4-pin"],
          "orientation": "straight",
          "useCase": ["Control"],
          "compatibleSystems": ["TRINITY 2"]
        },
        "SRH FS CAN Bus Cable": {
          "brand": "ARRI",
          "kNumber": "K2.0037788",
          "lengthM": 0.3,
          "connectors": ["FS CAN Bus"],
          "orientation": "straight",
          "useCase": ["Control"],
          "compatibleSystems": ["SRH-3", "SRH-360", "360 EVO"]
        },
        "SRH High-Capacity Battery Power Cable Set (12 V/24 V, 0.5 m)": {
          "brand": "ARRI",
          "kNumber": "K0.0021437",
          "lengthM": 0.5,
          "connectors": ["XLR 4-pin 12 V", "XLR 3-pin 24 V"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleSystems": ["SRH-3", "SRH-360", "360 EVO"]
        },
        "SRH High-Capacity Battery Power Cable 24 V, 20 m": {
          "brand": "ARRI",
          "kNumber": "K2.0021429",
          "lengthM": 20,
          "connectors": ["XLR 3-pin 24 V"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleSystems": ["SRH systems"]
        },
        "SRH High-Capacity Battery Power Cable 12 V, 20 m": {
          "brand": "ARRI",
          "kNumber": "K2.0021430",
          "lengthM": 20,
          "connectors": ["XLR 4-pin 12 V"],
          "orientation": "straight",
          "useCase": ["Power"],
          "compatibleSystems": ["SRH systems"]
        }
      }
    }
  }
};
if (typeof module !== "undefined" && module.exports) { module.exports = devices; }
