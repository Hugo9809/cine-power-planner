let devices={
  "cameras": {
    "Arri Alexa Mini LF": {
      "powerDrawWatts": 89,
      "power": {
        "input": {
          "voltageRange": "11V-34V DC",
          "portType": "Bat LEMO 8-pin",
          "powerDrawWatts": 89
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
          "notes": "Supports ARRI LDS and Cooke /i lens data"
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
          "type": "PL",
          "mount": "adapted",
          "notes": "Supports ARRI LDS and Cooke /i lens data"
        },
        {
          "type": "XPL52",
          "mount": "adapted",
          "notes": "Supports ARRI LDS and Cooke /i lens data"
        }
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
          "portType": "Bat LEMO 8-pin",
          "powerDrawWatts": 84
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
          "notes": "Supports ARRI LDS-2 and Cooke /i lens data"
        },
        {
          "type": "PL",
          "mount": "adapted",
          "notes": "Supports ARRI LDS and Cooke /i lens data"
        }
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
          "portType": "Bat LEMO 8-pin",
          "powerDrawWatts": 110
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
          "notes": "Supports ARRI LDS and Cooke /i lens data"
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
          "type": "SYNC IN",
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
          "voltageRange": "10.5V - 34V DC",
          "portType": "XLR 4-pin",
          "powerDrawWatts": 50
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
          "voltageRange": "DC 12 V (11.0 to 17.0 V) / DC 24 V (22.0 to 32.0 V)",
          "portType": [
            "XLR 4-pin",
            "Square 5-pin"
          ],
          "powerDrawWatts": 76
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
          "voltageRange": "DC 12 V (11.0 to 17.0 V) / DC 24 V (22.0 to 32.0 V)",
          "portType": [
            "XLR 4-pin",
            "Square 5-pin"
          ],
          "powerDrawWatts": 60
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
          "voltageRange": "19.5V DC",
          "portType": "DC IN (Barrel)",
          "powerDrawWatts": 66
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
          "notes": "Supports ARRI LDS and Cooke /i lens data"
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
          "voltageRange": "7.2V DC (via NP-FZ100) / 5V DC (via USB-C)",
          "portType": [
            "Battery Slot",
            "USB-C PD"
          ],
          "powerDrawWatts": 7.3
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
          "voltageRange": "19.5V DC",
          "portType": "DC IN (Barrel)",
          "powerDrawWatts": 18
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
          "notes": "Supports ARRI LDS and Cooke /i lens data"
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
          "voltageRange": "19.5V DC",
          "portType": "DC IN (Barrel)",
          "powerDrawWatts": 35.2
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
          "notes": "Supports ARRI LDS and Cooke /i lens data"
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
          "voltageRange": "24V DC",
          "portType": "DC IN",
          "powerDrawWatts": 14.6
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
          "size": "3.5 inch",
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
          "voltageRange": "19.5V DC",
          "portType": "DC IN 24V Terminal",
          "powerDrawWatts": 19.6
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
          "notes": "Supports ARRI LDS and Cooke /i lens data"
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
          "voltageRange": "11.5V - 20V DC",
          "portType": "XLR 4-pin",
          "powerDrawWatts": 31
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
          "voltageRange": "11.5V-20V DC",
          "portType": "XLR 4-pin",
          "powerDrawWatts": 32.5
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
          "size": "3.5 inch",
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
          "voltageRange": "11.5V - 20V DC",
          "portType": "XLR 4-pin",
          "powerDrawWatts": 63
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
          "voltageRange": "12V-20V",
          "portType": "LEMO 2-pin",
          "powerDrawWatts": 22
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
          "size": "5 inch",
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
          "type": "3.5mm Stereo Input",
          "notes": "Can also be used for Timecode input"
        }
      ]
    },
    "Blackmagic BMPCC 6K G2": {
      "powerDrawWatts": 26,
      "power": {
        "input": {
          "voltageRange": "12V - 20V DC",
          "portType": "LEMO 2-pin",
          "powerDrawWatts": 26
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
          "size": "5 inch",
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
          "type": "3.5mm Stereo Input",
          "notes": "Also for LTC timecode"
        }
      ]
    },
    "Blackmagic BMPCC 6K": {
      "powerDrawWatts": 26,
      "power": {
        "input": {
          "voltageRange": "12V-20V",
          "portType": "LEMO 2-pin",
          "powerDrawWatts": 26
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
          "size": "5 inch",
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
          "type": "3.5mm Stereo Input",
          "notes": "Can also be used for Timecode input"
        }
      ]
    },
    "Blackmagic Pocket Cinema Camera 6K Pro": {
      "powerDrawWatts": 26,
      "power": {
        "input": {
          "voltageRange": "12V-20V",
          "portType": "LEMO 2-pin",
          "powerDrawWatts": 26
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
          "voltageRange": "12V DC",
          "portType": [
            "Molex 12-pin",
            "XLR 4-pin"
          ],
          "powerDrawWatts": 55
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
          "size": "4 inch",
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
          "voltageRange": "20V-30V DC",
          "portType": "XLR 2-pin",
          "powerDrawWatts": 100
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
          "type": "Fold-out LCD",
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
          "voltageRange": "12V-20V DC",
          "portType": "LEMO 2-pin",
          "powerDrawWatts": 60
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
          "size": "4 inch",
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
          "portType": "LEMO 2-pin",
          "powerDrawWatts": 90
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
          "size": "4 inch",
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
          "portType": "LEMO 2-pin-IN",
          "powerDrawWatts": 37
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
          "notes": "Supports ARRI LDS and Cooke /i lens data"
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
          "voltageRange": "+7 to +17 V DC",
          "portType": "LEMO 2-pin-IN",
          "powerDrawWatts": 45
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
          "voltageRange": "24V DC",
          "portType": "XLR 4-pin",
          "powerDrawWatts": 75
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
          "voltageRange": "24V DC",
          "portType": "XLR 4-pin",
          "powerDrawWatts": 75
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
          "voltageRange": "24V DC",
          "portType": "XLR 4-pin",
          "powerDrawWatts": 75
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
          "voltageRange": "24V DC",
          "portType": "XLR 4-pin",
          "powerDrawWatts": 75
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
          "voltageRange": "11.5V-17V DC",
          "portType": "LEMO 2-pin-IN",
          "powerDrawWatts": 60
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
          "voltageRange": "11.5V-17V DC",
          "portType": "LEMO 2-pin-IN",
          "powerDrawWatts": 60
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
          "voltageRange": "11.5V-17V DC",
          "portType": "LEMO 2-pin-IN",
          "powerDrawWatts": 60
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
          "voltageRange": "11.5V-17V DC",
          "portType": "LEMO 2-pin-IN",
          "powerDrawWatts": 60
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
          "voltageRange": "11.5V-17V DC",
          "portType": "LEMO 2-pin-IN",
          "powerDrawWatts": 60
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
          "voltageRange": "11.5V-17V DC",
          "portType": "LEMO 2-pin-IN",
          "powerDrawWatts": 37
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
          "voltageRange": "11.5V-17V DC",
          "portType": "LEMO 2-pin-IN",
          "powerDrawWatts": 75
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
          "voltageRange": "11.5V-17V DC",
          "portType": "LEMO 2-pin-IN",
          "powerDrawWatts": 60
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
          "voltageRange": "11.5V-17V DC",
          "portType": "LEMO 2-pin-IN",
          "powerDrawWatts": 50
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
          "voltageRange": "11.5V-17V DC",
          "portType": "LEMO 2-pin-IN",
          "powerDrawWatts": 60
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
          "voltageRange": "11.5V-17V DC",
          "portType": "LEMO 2-pin-IN",
          "powerDrawWatts": 60
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
          "voltageRange": "8.4V DC (battery) / 9V DC (USB-C PD)",
          "portType": [
            "Battery Slot",
            "USB-C PD"
          ],
          "powerDrawWatts": 27
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
          "voltageRange": "9.0V DC (battery) / 9V DC (USB-C PD)",
          "portType": [
            "Battery Slot",
            "USB-C PD"
          ],
          "powerDrawWatts": 27
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
          "voltageRange": "7.2V DC (battery) / 9V DC (USB-C PD)",
          "portType": [
            "Battery Slot",
            "USB-C PD"
          ],
          "powerDrawWatts": 27
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
          "voltageRange": "7.2V (battery) / 5V DC (USB-C PD)",
          "portType": [
            "Battery Slot",
            "USB-C PD"
          ],
          "powerDrawWatts": 15
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
          "voltageRange": "DC 12-30V",
          "portType": [
            "6-pin 1B DC-IN",
            "TB50"
          ],
          "powerDrawWatts": 40
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
          "notes": "Supports ARRI LDS and Cooke /i lens data"
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
          "voltageRange": "7.2V DC (battery) / 9V DC (USB-C PD)",
          "portType": [
            "Battery Slot",
            "USB-C"
          ],
          "powerDrawWatts": 5.6
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
          "portType": [
            "Weipu SF610",
            "S2"
          ],
          "powerDrawWatts": 8.1
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
          "voltageRange": "7.2V DC (battery) / 5V DC (USB-C PD)",
          "portType": [
            "Battery Slot",
            "USB-C"
          ],
          "powerDrawWatts": 7
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
          "voltageRange": "7.2V (battery) / USB-C",
          "portType": [
            "Battery Slot",
            "USB-C"
          ],
          "powerDrawWatts": 5.5
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
          "voltageRange": "7.2V (LP-E6P) / USB-C PD (45W+ recommended)",
          "portType": [
            "Battery Slot",
            "USB-C PD"
          ],
          "powerDrawWatts": 15
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
          "voltageRange": "7.2V (LP-E19) / USB-C PD",
          "portType": [
            "Battery Slot",
            "USB-C PD"
          ],
          "powerDrawWatts": 18
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
          "voltageRange": "7.2V (battery) / USB-C",
          "portType": [
            "Battery Slot",
            "USB-C"
          ],
          "powerDrawWatts": 10
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
          "portType": null,
          "powerDrawWatts": 0
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
          "portType": "LEMO 2-pin",
          "voltageRange": "10-34V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "12G-SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "12G-SDI"
          }
        ]
      },
      "wirelessTx": false
    },
    "SmallHD Ultra 7 Bolt 6 TX": {
      "screenSizeInches": 7,
      "brightnessNits": 2300,
      "powerDrawWatts": 55,
      "power": {
        "input": {
          "portType": "LEMO 2-pin",
          "voltageRange": "10-34V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "12G-SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "12G-SDI"
          }
        ]
      },
      "wirelessTx": true
    },
    "SmallHD Cine 7": {
      "screenSizeInches": 7,
      "brightnessNits": 1800,
      "powerDrawWatts": 30,
      "power": {
        "input": {
          "portType": "LEMO 2-pin",
          "voltageRange": "10-34V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI",
            "details": "2x inputs, one selectable as input/output"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI",
            "details": "One input can double as loop out"
          }
        ]
      },
      "wirelessTx": false
    },
    "SmallHD Cine 7 Bolt 4K TX": {
      "screenSizeInches": 7,
      "brightnessNits": 1800,
      "powerDrawWatts": 50,
      "power": {
        "input": {
          "portType": "LEMO 2-pin",
          "voltageRange": "10-34V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ]
      },
      "wirelessTx": true
    },
    "SmallHD Indie 7": {
      "screenSizeInches": 7,
      "brightnessNits": 1000,
      "powerDrawWatts": 17.3,
      "power": {
        "input": {
          "portType": "LEMO 2-pin",
          "voltageRange": "10-34V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ]
      },
      "wirelessTx": false
    },
    "SmallHD Indie 7 Bolt 4K TX": {
      "screenSizeInches": 7,
      "brightnessNits": 1000,
      "powerDrawWatts": 37.3,
      "power": {
        "input": {
          "portType": "LEMO 2-pin",
          "voltageRange": "10-34V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ]
      },
      "wirelessTx": true
    },
    "SmallHD Focus 7": {
      "screenSizeInches": 7,
      "brightnessNits": 1000,
      "powerDrawWatts": 9,
      "power": {
        "input": {
          "portType": "LEMO 2-pin",
          "voltageRange": "10-34V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          }
        ],
        "outputs": []
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      }
    },
    "SmallHD Ultra 5": {
      "screenSizeInches": 5,
      "brightnessNits": 3000,
      "powerDrawWatts": 31.5,
      "power": {
        "input": {
          "portType": "LEMO 2-pin",
          "voltageRange": "10-34V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ]
      },
      "wirelessTx": false
    },
    "SmallHD Ultra 5 Bolt 6 TX": {
      "screenSizeInches": 5,
      "brightnessNits": 3000,
      "powerDrawWatts": 50,
      "power": {
        "input": {
          "portType": "LEMO 2-pin",
          "voltageRange": "10-34V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ]
      },
      "wirelessTx": true
    },
    "SmallHD Cine 5": {
      "screenSizeInches": 5,
      "brightnessNits": 2000,
      "powerDrawWatts": 24,
      "power": {
        "input": {
          "portType": "LEMO 2-pin",
          "voltageRange": "10-34V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ]
      },
      "wirelessTx": false
    },
    "SmallHD Cine 5 Bolt 6 TX": {
      "screenSizeInches": 5,
      "brightnessNits": 2000,
      "powerDrawWatts": 44,
      "power": {
        "input": {
          "portType": "LEMO 2-pin",
          "voltageRange": "10-34V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ]
      },
      "wirelessTx": true
    },
    "SmallHD Indie 5": {
      "screenSizeInches": 5,
      "brightnessNits": 1000,
      "powerDrawWatts": 17.3,
      "power": {
        "input": {
          "portType": "LEMO 2-pin",
          "voltageRange": "10-34V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ]
      },
      "wirelessTx": false
    },
    "SmallHD Focus 5": {
      "screenSizeInches": 5,
      "brightnessNits": 800,
      "powerDrawWatts": 8,
      "power": {
        "input": {
          "portType": "LEMO 2-pin",
          "voltageRange": "10-34V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "3G-SDI"
          }
        ],
        "outputs": []
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      }
    },
    "Hollyland Pyro 7 (TX)": {
      "screenSizeInches": 7,
      "brightnessNits": 1200,
      "powerDrawWatts": 22,
      "power": {
        "input": {
          "portType": "DC Barrel / NP-F",
          "voltageRange": "7-16V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ]
      },
      "wirelessTx": true
    },
    "Hollyland Mars M1 Enhanced": {
      "screenSizeInches": 5.5,
      "brightnessNits": 1000,
      "powerDrawWatts": 16,
      "power": {
        "input": {
          "portType": "DC Barrel / NP-F",
          "voltageRange": "7-16V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          }
        ]
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      }
    },
    "Portkeys BM5 III": {
      "screenSizeInches": 5.5,
      "brightnessNits": 2200,
      "powerDrawWatts": 16,
      "power": {
        "input": {
          "portType": "4-pin Aviation / NP-F",
          "voltageRange": "7-24V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ]
      },
      "wirelessTx": false,
      "bluetooth": {
        "portType": "Camera Control"
      }
    },
    "Portkeys LH5H": {
      "screenSizeInches": 5.2,
      "brightnessNits": 1700,
      "powerDrawWatts": 12,
      "power": {
        "input": {
          "portType": "4-pin Aviation / NP-F",
          "voltageRange": "7-24V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          }
        ]
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "wireless": {
        "portType": "Bluetooth Camera Control"
      }
    },
    "Portkeys BM7 II DS": {
      "screenSizeInches": 7,
      "brightnessNits": 2200,
      "powerDrawWatts": 15,
      "power": {
        "input": {
          "portType": "4-pin Aviation / NP-F",
          "voltageRange": "7-24V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI",
            "details": "2x SDI inputs"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ]
      },
      "wirelessTx": false,
      "wireless": {
        "portType": "Camera Control"
      }
    },
    "Portkeys PT5 II": {
      "screenSizeInches": 5,
      "brightnessNits": 500,
      "powerDrawWatts": 7,
      "power": {
        "input": {
          "portType": "4-pin Aviation / NP-F",
          "voltageRange": "7-24V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          }
        ]
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      }
    },
    "Atomos Ninja V": {
      "screenSizeInches": 5,
      "brightnessNits": 1000,
      "powerDrawWatts": 22,
      "power": {
        "input": {
          "portType": "DC Barrel / NP-F",
          "voltageRange": "6-16V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          }
        ]
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "audioIo": {
        "portType": "10-pin LEMO (analog audio)"
      }
    },
    "Atomos Ninja V+": {
      "screenSizeInches": 5,
      "brightnessNits": 1000,
      "powerDrawWatts": 22,
      "power": {
        "input": {
          "portType": "DC Barrel / NP-F",
          "voltageRange": "6-16V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          }
        ]
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone"
      },
      "audioInput": {
        "portType": "3.5mm Mic/Line"
      }
    },
    "Atomos Shinobi 5": {
      "screenSizeInches": 5.2,
      "brightnessNits": 1000,
      "powerDrawWatts": 7,
      "power": {
        "input": {
          "portType": "DC Barrel / NP-F",
          "voltageRange": "6-16V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ],
        "outputs": []
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      }
    },
    "Atomos Shinobi 7": {
      "screenSizeInches": 7,
      "brightnessNits": 2200,
      "powerDrawWatts": 7,
      "power": {
        "input": {
          "portType": "DC Barrel / NP-F",
          "voltageRange": "6-16V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ]
      },
      "wirelessTx": false
    },
    "Feelworld FW568": {
      "screenSizeInches": 6,
      "brightnessNits": 450,
      "powerDrawWatts": 11,
      "power": {
        "input": {
          "portType": "NP-F",
          "voltageRange": "7-18V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G-SDI"
          }
        ]
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      }
    },
    "Feelworld F6 Plus": {
      "screenSizeInches": 6,
      "brightnessNits": 450,
      "powerDrawWatts": 9,
      "power": {
        "input": {
          "portType": "NP-F",
          "voltageRange": "7-18V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          }
        ]
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone"
      }
    },
    "Andycine A6 Pro": {
      "screenSizeInches": 5.5,
      "brightnessNits": 500,
      "powerDrawWatts": 9,
      "power": {
        "input": {
          "portType": "NP-F",
          "voltageRange": "7-18V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          }
        ]
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone"
      }
    },
    "Lilliput A7S": {
      "screenSizeInches": 7,
      "brightnessNits": 500,
      "powerDrawWatts": 12,
      "power": {
        "input": {
          "portType": "NP-F",
          "voltageRange": "7-18V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          }
        ]
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      }
    },
    "None": {
      "powerDrawWatts": 0,
      "power": {
        "input": {
          "portType": "",
          "voltageRange": ""
        },
        "output": null
      },
      "video": {
        "inputs": [],
        "outputs": []
      },
      "wirelessTx": false
    }
  },
  "video": {
    "Teradek Bolt 6 LT TX": {
      "powerDrawWatts": 9,
      "powerInput": "LEMO 2-pin (6-28V)",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "5.190-5.230 GHz (Non-DFS), 5.270-5.670 GHz (DFS), 5.755-5.795 GHz (Non-DFS), 5.945-6.425 GHz (6GHz/U-NII 5-8)",
      "latencyMs": "< 1ms"
    },
    "Teradek Bolt 6 XT TX": {
      "powerDrawWatts": 20,
      "powerInput": "LEMO 2-pin (6-28V) / Gold-mount / V-mount",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "12G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "12G-SDI"
        }
      ],
      "frequency": "5.190-5.230 GHz (Non-DFS), 5.270-5.670 GHz (DFS), 5.755-5.795 GHz (Non-DFS), 5.945-6.425 GHz (6GHz/U-NII 5-8)",
      "latencyMs": "< 1ms"
    },
    "Teradek Bolt 6 MAX TX": {
      "powerDrawWatts": 20,
      "powerInput": "LEMO 2-pin (6-28V) / Gold-mount / V-mount",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "12G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "12G-SDI"
        }
      ],
      "frequency": "5.190-5.230 GHz (Non-DFS), 5.270-5.670 GHz (DFS), 5.755-5.795 GHz (Non-DFS), 5.945-6.425 GHz (6GHz/U-NII 5-8)",
      "latencyMs": "< 1ms"
    },
    "Teradek Bolt 4K LT TX": {
      "powerDrawWatts": 9,
      "powerInput": "LEMO 2-pin (6-28V)",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "5.190-5.230 GHz (Non-DFS), 5.270-5.670 GHz (DFS), 5.755-5.795 GHz (Non-DFS) (with Bluetooth 2.4 GHz for app control)",
      "latencyMs": "< 1ms"
    },
    "Teradek Bolt 4K XT TX": {
      "powerDrawWatts": 20,
      "powerInput": "LEMO 2-pin (6-28V) / Gold-mount / V-mount",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "12G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "12G-SDI"
        }
      ],
      "frequency": "5.190-5.230 GHz (Non-DFS), 5.270-5.670 GHz (DFS), 5.755-5.795 GHz (Non-DFS) (with Bluetooth 2.4 GHz for app control)",
      "latencyMs": "< 1ms"
    },
    "Teradek Bolt Pro 300 TX": {
      "powerDrawWatts": 6.5,
      "powerInput": "LEMO 2-pin (6-28V)",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "5.19-5.23 GHz (Non-DFS), 5.27-5.55 GHz (DFS), 5.67 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms"
    },
    "Teradek Bolt Pro 600 TX": {
      "powerDrawWatts": 8,
      "powerInput": "LEMO 2-pin (6-28V)",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "5.19-5.23 GHz (Non-DFS), 5.27-5.55 GHz (DFS), 5.67 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms"
    },
    "Teradek Bolt Pro 2000 TX": {
      "powerDrawWatts": 7.7,
      "powerInput": "LEMO 2-pin (6-28V)",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "5.19-5.23 GHz (Non-DFS), 5.27-5.55 GHz (DFS), 5.67 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms"
    },
    "Teradek Bolt Pro 500 TX": {
      "powerDrawWatts": 7.3,
      "powerInput": "LEMO 2-pin (6-28V)",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "5.19-5.23 GHz (Non-DFS), 5.27-5.55 GHz (DFS), 5.67 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms"
    },
    "Teradek Bolt Pro 750 TX": {
      "powerDrawWatts": 7.5,
      "powerInput": "LEMO 2-pin (6-28V)",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "5.19-5.23 GHz (Non-DFS), 5.27-5.55 GHz (DFS), 5.67 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms"
    },
    "Teradek Bolt Pro 1000 TX": {
      "powerDrawWatts": 7.5,
      "powerInput": "LEMO 2-pin (6-28V)",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "5.19-5.23 GHz (Non-DFS), 5.27-5.55 GHz (DFS), 5.67 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms"
    },
    "Teradek Bolt 3000 TX": {
      "powerDrawWatts": 7.5,
      "powerInput": "LEMO 2-pin (6-28V)",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "5.19-5.23 GHz (Non-DFS), 5.27-5.55 GHz (DFS), 5.67 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms"
    },
    "Teradek Bolt 10000 TX": {
      "powerDrawWatts": 7.5,
      "powerInput": "LEMO 2-pin (6-28V)",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "5.19-5.23 GHz (Non-DFS), 5.27-5.55 GHz (DFS), 5.67 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms"
    },
    "Hollyland Pyro S TX": {
      "powerDrawWatts": 11,
      "powerInput": "USB-C (5V-12V) / NP-F / DC Barrel (6-16V)",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "2.412-2.484 GHz / 5.15-5.85 GHz (Dual-Band Wi-Fi 4)",
      "latencyMs": "50ms"
    },
    "Hollyland Mars 300 Pro TX": {
      "powerDrawWatts": 11,
      "powerInput": "USB-C (5-12V) / NP-F",
      "videoInputs": [
        {
          "portType": "HDMI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        }
      ],
      "frequency": "5 GHz",
      "latencyMs": "< 80ms"
    },
    "Hollyland Mars 400S Pro TX": {
      "powerDrawWatts": 11,
      "powerInput": "USB-C (5-12V) / NP-F / DC Barrel (6-16V)",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "5 GHz",
      "latencyMs": "< 80ms"
    },
    "DJI Transmission (TX)": {
      "powerDrawWatts": 11,
      "powerInput": "DC-In (6-18V) / NP-F / WB37",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "2.4000-2.4835 GHz (Non-DFS), 5.470-5.725 GHz (DFS), 5.725-5.850 GHz (Non-DFS)",
      "latencyMs": "< 60ms"
    },
    "Vaxis Storm 800 TX": {
      "powerDrawWatts": 6,
      "powerInput": "LEMO 2-pin (6-18V)",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "5.1-5.9 GHz",
      "latencyMs": "< 1ms"
    },
    "Vaxis Storm 1000 TX": {
      "powerDrawWatts": 6.5,
      "powerInput": "LEMO 2-pin (6-18V)",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "5.1-5.9 GHz",
      "latencyMs": "< 1ms"
    },
    "Vaxis Storm 3000 TX": {
      "powerDrawWatts": 6,
      "powerInput": "LEMO 2-pin (6-18V)",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "5.1-5.9 GHz",
      "latencyMs": "< 1ms"
    },
    "Dwarf Connection LR1 TX": {
      "powerDrawWatts": 6,
      "powerInput": "LEMO 2-pin (6-18V)",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "5.1-5.9 GHz (ISM Band, Indoor use often specified due to DFS omission)",
      "latencyMs": "< 1ms"
    },
    "Accsoon CineEye 2S Pro TX": {
      "powerDrawWatts": 4.5,
      "powerInput": "USB-C (5V) / NP-F battery",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        }
      ],
      "frequency": "2.4 GHz / 5 GHz (Dual-Band Wi-Fi)",
      "latencyMs": "< 60ms"
    },
    "Accsoon CineEye II TX": {
      "powerDrawWatts": 3.5,
      "powerInput": "USB-C (5V) / NP-F battery",
      "videoInputs": [
        {
          "portType": "HDMI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        }
      ],
      "frequency": "2.4 GHz / 5 GHz (Dual-Band Wi-Fi)",
      "latencyMs": "< 60ms"
    },
    "Accsoon CineView HE TX": {
      "powerDrawWatts": 4.5,
      "powerInput": "USB-C (5V) / NP-F battery",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "2.412-2.472 GHz / 5.180-5.580 GHz / 5.660-5.825 MHz (Dual-Band Wi-Fi 5 with MU-MIMO)",
      "latencyMs": "< 60ms"
    },
    "Accsoon CineView SE TX": {
      "powerDrawWatts": 4.5,
      "powerInput": "USB-C (5V) / NP-F battery",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "2.4 GHz / 5 GHz (Dual-Band Wi-Fi)",
      "latencyMs": "< 60ms"
    },
    "Accsoon CineView Nano TX": {
      "powerDrawWatts": 2.5,
      "powerInput": "USB-C (5V) / NP-F battery",
      "videoInputs": [
        {
          "portType": "HDMI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        }
      ],
      "frequency": "2.4 GHz / 5 GHz (Dual-Band Wi-Fi)",
      "latencyMs": "< 60ms"
    },
    "Accsoon CineView Quad TX": {
      "powerDrawWatts": 4.5,
      "powerInput": "USB-C (5V) / NP-F battery",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "3G-SDI"
        }
      ],
      "frequency": "2.4 GHz / 5 GHz (Dual-Band Wi-Fi)",
      "latencyMs": "< 60ms"
    },
    "Accsoon CineView Master 4K": {
      "powerDrawWatts": 15,
      "powerInput": "LEMO 2-pin (7.4-16.8V) / NP-F battery",
      "videoInputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "12G-SDI"
        }
      ],
      "videoOutputs": [
        {
          "portType": "HDMI"
        },
        {
          "portType": "12G-SDI"
        }
      ],
      "frequency": "2.4 GHz / 5 GHz / 6 GHz (Tri-Band Wi-Fi 6E)",
      "latencyMs": "< 60ms"
    },
    "None": {
      "powerDrawWatts": 0,
      "powerInput": "",
      "videoInput": "3G-SDI",
      "videoOutput": "3G-SDI",
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
        "fizConnector": "LEMO 7-pin",
        "internalController": true,
        "torqueNm": 2.5,
        "gearTypes": [
          "0.8 mod",
          "0.4 mod",
          "0.5 mod",
          "0.6 mod",
          "0.8 mod 29mm wide"
        ],
        "notes": "Rated 2.5 N·m at 14.8V. Can be daisy-chained for power and control. Supports a 29mm thick 0.8 mod gear for lenses with telescoping focus gears. Compatible with standard 0.8 mod lens gears of various diameters."
      },
      "Tilta Nucleus M II": {
        "powerDrawWatts": 50,
        "fizConnector": "LEMO 7-pin",
        "internalController": true,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod",
          "0.4 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "Higher torque than Nucleus M, designed for improved performance. The 50W rating is likely a max stall power. Compatible with standard 0.8 mod lens gears of various diameters."
      },
      "Tilta Nucleus Nano (Original)": {
        "powerDrawWatts": 5,
        "fizConnector": "Micro-USB",
        "internalController": true,
        "torqueNm": 1,
        "gearTypes": [
          "0.8 mod"
        ],
        "notes": "Compact motor for lighter lenses. Torque rated at 0.65 N·m at 5.5V and 1 N·m at 14.8V. Compatible with standard 0.8 mod lens gears of various diameters."
      },
      "Tilta Nucleus Nano II": {
        "powerDrawWatts": 37,
        "fizConnector": "USB-C",
        "internalController": true,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "Enhanced version of the Nano. Power draw calculated at 2.5A max at 14.8V. USB-C for power and data. Compatible with standard 0.8 mod lens gears of various diameters."
      },
      "Arri Cforce Mini": {
        "powerDrawWatts": 20,
        "fizConnector": "LBUS (LEMO 4-pin)",
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
        "notes": "Constant 0.3 Nm, maximum peak torque 0.5 Nm. Requires a motor controller such as RIA-1, Master Grips or a camera with built-in controller (ALEXA Mini/Mini LF/Alexa 35) or a cforce mini RF motor. Connects via ARRI LBUS. Supports a 0.8 mod gear with 25mm width and large diameter 0.8 mod gears up to 80 teeth."
      },
      "Arri Cforce Plus": {
        "powerDrawWatts": 32,
        "fizConnector": "LBUS (LEMO 4-pin)",
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
        "notes": "Constant 0.7 Nm, maximum peak torque 1.0 Nm. Requires a motor controller such as RIA-1, Master Grips or a camera with built-in controller (ALEXA Mini/Mini LF/Alexa 35) or a cforce mini RF motor. Connects via ARRI LBUS. Supports a 0.8 mod gear with 25mm width and large diameter 0.8 mod gears up to 80 teeth."
      },
      "Arri CLM-4 (K2.72114.0)": {
        "powerDrawWatts": 12,
        "fizConnector": "LEMO 7-pin (LCS)",
        "internalController": false,
        "torqueNm": 0.5,
        "gearTypes": [
          "0.8 mod",
          "0.6 mod",
          "0.5 mod"
        ],
        "notes": "Standard digital lens motor for ARRI LCS. Requires a UMC-4 for control. The UMC-4 works only with the CLM-4 and CLM-5. Part no. K2.72114.0."
      },
      "Arri CLM-5 (K2.0006361)": {
        "powerDrawWatts": 24,
        "fizConnector": "LEMO 7-pin (LCS)",
        "internalController": false,
        "torqueNm": 1.2,
        "gearTypes": [
          "0.8 mod",
          "0.6 mod",
          "0.5 mod"
        ],
        "notes": "High-torque lens motor for ARRI LCS. Requires a UMC-4 for control. The UMC-4 works only with the CLM-4 and CLM-5. Part no. K2.0006361."
      },
      "Arri cforce mini RF (KK.0040345)": {
        "powerDrawWatts": 20,
        "fizConnector": "LBUS (LEMO 4-pin), CAM (LEMO 7-pin)",
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
        "notes": "Lens motor with integrated RF receiver and controller. Provides one LBUS port and one CAM port similar to the RIA-1, allowing daisy-chaining of additional motors."
      },
      "Teradek RT Motion FIZ (MOTR.S)": {
        "powerDrawWatts": 24,
        "fizConnector": "LEMO 4-pin 0B",
        "internalController": false,
        "torqueNm": 0.95,
        "gearTypes": [
          "0.8 mod",
          "0.4 mod",
          "0.5 mod",
          "0.6 mod",
          "0.8 mod 12mm wide"
        ],
        "notes": "Max peak torque of 0.95 Nm. Requires a Teradek MDR for control. Max operating current 2A at up to 12V. Teradek offers a 12mm wide 0.8 mod gear. Compatible with standard 0.8 mod lens gears of various diameters."
      },
      "Preston DM1X": {
        "powerDrawWatts": 32.4,
        "fizConnector": "LEMO 4-pin",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "Very high torque, often used for focus. Max current 2.7A, typically 12V system. No internal controller. Compatible with standard 0.8 mod lens gears of various diameters, including large ones."
      },
      "Preston DM2": {
        "powerDrawWatts": 22.2,
        "fizConnector": "LEMO 4-pin",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "High torque, general purpose motor. Max current 2.7A, typically 12V system. No internal controller. Compatible with standard 0.8 mod lens gears of various diameters, including large ones."
      },
      "Preston DM2X": {
        "powerDrawWatts": 22.2,
        "fizConnector": "LEMO 4-pin",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "Improved DM2 with higher torque capabilities and durability in the same physical size. Max current 2.7A, typically 12V system. No internal controller. Compatible with standard 0.8 mod lens gears of various diameters, including large ones."
      },
      "Preston DM-A": {
        "powerDrawWatts": 18,
        "fizConnector": "LEMO 4-pin",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ],
        "notes": "Compact motor for iris/zoom or lighter focus. No internal controller. Peak power draw from source. Compatible with standard 0.8 mod lens gears of various diameters."
      },
      "Preston DM-C": {
        "powerDrawWatts": 18,
        "fizConnector": "LEMO 4-pin",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ],
        "notes": "Designed for compact and lighter setups. No internal controller. Peak power draw from source. Compatible with standard 0.8 mod lens gears of various diameters."
      },
      "Chrosziel CDM-100 Digital": {
        "powerDrawWatts": 12,
        "fizConnector": "LEMO 7-pin 1B",
        "internalController": false,
        "torqueNm": 0.5,
        "gearTypes": [
          "0.8 mod",
          "0.4 mod",
          "0.5 mod",
          "0.6 mod",
          "0.8 mod 16mm wide"
        ],
        "notes": "Max torque 0.5 Nm. Max 24V input. Power draw adjusted to typical max. No internal controller. Also supports 0.8 mod with 16mm width. Compatible with standard 0.8 mod lens gears of various diameters."
      },
      "Chrosziel CDM-M (Universal Zoom Servo Drive)": {
        "powerDrawWatts": 4.2,
        "fizConnector": "LEMO 5-pin 0B",
        "internalController": false,
        "torqueNm": 0.5,
        "gearTypes": [
          "0.8 mod",
          "0.4 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "Designed primarily as a zoom servo. Torque 0.5 Nm. Max consumption approx. 350mAh at 12V. No internal controller. Compatible with standard 0.8 mod lens gears of various diameters."
      },
      "DJI Focus (Original)": {
        "powerDrawWatts": 21.6,
        "fizConnector": "USB-C",
        "internalController": true,
        "torqueNm": 0.35,
        "gearTypes": [
          "0.8 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "Max torque 0.35 Nm. Max speed 192 rpm. Power draw estimated at 1.5A from 14.4V. Designed to work with standard 0.8 mod lens gears, including those with larger diameters for longer focus throws."
      },
      "DJI RS Focus (2022)": {
        "powerDrawWatts": 22.5,
        "fizConnector": "USB-C",
        "internalController": true,
        "torqueNm": 1,
        "gearTypes": [
          "0.8 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "Max torque 1.0 Nm at 8V. Stall current 2.8A at 8V. Quick-release structure. Designed to work with standard 0.8 mod lens gears, including those with larger diameters for longer focus throws."
      },
      "DJI Focus Pro Motor": {
        "powerDrawWatts": 24,
        "fizConnector": "USB-C",
        "internalController": true,
        "torqueNm": 1.2,
        "gearTypes": [
          "0.8 mod"
        ],
        "notes": "Motor for the DJI Focus Pro system. Used with the Focus Pro Handle and DJI LiDAR Range Finder."
      },
      "Cmotion cPRO": {
        "powerDrawWatts": 24,
        "fizConnector": "LEMO 4-pin",
        "internalController": true,
        "torqueNm": 1.2,
        "gearTypes": [
          "0.8 mod",
          "0.4 mod",
          "0.5 mod",
          "0.6 mod"
        ],
        "notes": "Compact and lightweight with integrated RF module and camera interface. Rated 1.2 Nm. Max speed 240 teeth/sec. Compatible with standard 0.8 mod lens gears of various diameters."
      },
      "SmallRig Wireless Follow Focus": {
        "powerDrawWatts": 12,
        "fizConnector": "USB-C",
        "internalController": true,
        "torqueNm": 0.43,
        "gearTypes": [
          "0.8 mod"
        ],
        "notes": "Peak torque of 4.3 kgf·cm (approx. 0.43 Nm). Supports PD and QC fast charging. Has built-in battery. Compatible with standard 0.8 mod lens gears of various diameters."
      },
      "Redrock MicroRemote Torque": {
        "powerDrawWatts": 60,
        "fizConnector": "4-pin proprietary",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ],
        "notes": "High torque motor. Max current draw can be up to 5A at 12V. Requires a MicroRemote Basestation. Compatible with standard 0.8 mod lens gears of various diameters."
      }
    },
    "controllers": {
      "None": {
        "powerDrawWatts": 0,
        "fizConnector": null,
        "power_source": "N/A",
        "battery_type": "N/A",
        "connectivity": "N/A",
        "notes": "Placeholder for no controller."
      },
      "Arri OCU-1": {
        "powerDrawWatts": 1.32,
        "fizConnector": "LBUS (LEMO 4-pin)",
        "power_source": "External (via LBUS)",
        "battery_type": "N/A",
        "connectivity": "Wired (LBUS) or Wireless (via ZMU-4/RIA-1/Master Grips)",
        "notes": "Single-axis FIZ control (override for WCU-4/Hi-5), compact, lightweight, three assignable user buttons, controls EF lenses without motors on ALEXA Mini/AMIRA, controls SRH-3 roll axis."
      },
      "Arri ZMU-4 (body only, wired)": {
        "powerDrawWatts": 1,
        "fizConnector": "LBUS (LEMO 4-pin for motors), CAM (LEMO 7-pin for camera control)",
        "power_source": "External DC (10.5-34V via LBUS/CAM) or Internal Battery",
        "battery_type": "Sony NP-F550/750 compatible, ARRI LBP-3500",
        "connectivity": "Wired (LBUS, CAM) or Wireless (with optional RF module - 2400 MHz DSSS)",
        "notes": "Force-sensitive zoom knob, transflective TFT display, user buttons, can act as a radio module host for other LBUS devices (OCU-1, Master Grips), robust, weather-resistant, firmware update via USB-C, configurable camera control."
      },
      "Arri UMC-4": {
        "powerDrawWatts": 1.68,
        "fizConnector": "2x LBUS (LEMO 4-pin for motors), 2x SERIAL (LEMO 4-pin), CAM (LEMO 7-pin), EXT (6-pin/16-pin depending on camera)",
        "power_source": "External DC (via CAM or LBUS chain)",
        "battery_type": "N/A (no internal battery)",
        "connectivity": "Wireless (proprietary ARRI radio system, works with WCU-4, SXU-1, Master Grips, cmotion pan-bar zoom), Wired (LBUS, CAM, SERIAL)",
        "notes": "3-axis motor controller, LDS Lens Data Archive integration (frame-accurate lens data, mapping, depth-of-field), supports internal/external timecode, multiple interfaces for peripherals (e.g., UDM-1, motion control), override function support. Only compatible with ARRI CLM-4 and CLM-5 motors, which require a UMC-4 for operation."
      },
      "Arri RIA-1": {
        "powerDrawWatts": 2.5,
        "fizConnector": "2x LBUS (LEMO 4-pin), 1x CAM (LEMO 7-pin), 1x SERIAL (LEMO 4-pin)",
        "power_source": "External DC (10.5-34V, can be powered via camera CAM port)",
        "battery_type": "N/A (no internal battery, draws power from camera or external source)",
        "connectivity": "Wireless (swappable ARRI radio modules: RF-EMIP, RF-2400, RF-900) or Wired (LBUS, CAM, SERIAL)",
        "notes": "Versatile receiver/transmitter/motor controller, extends wireless range of WCU-4/SXU-1, brings wireless functionality to Master Grips/OCU-1, supports distance measuring devices (CineRT, Focusbug, UDM-1, Cinetape), camera control (ARRI, Panavision, RED, Sony), compact and robust. Can be supplemented with an LBUS to D-Tap cable to supply additional power for higher motor torque."
      },
      "Arri Master Grip (single unit)": {
        "powerDrawWatts": 0.72,
        "fizConnector": "2x LBUS (LEMO 4-pin)",
        "power_source": "External (12-34VDC via LBUS)",
        "battery_type": "N/A (no internal battery)",
        "connectivity": "Wired (LBUS) or Wireless (when connected to ZMU-4 or RIA-1 with radio module)",
        "notes": "Ergonomic cine-style handgrip with integrated lens and camera controls. Available in rocker (zoom) or thumbwheel (focus/iris) versions. Can control EF/ENG and cine lenses. Advanced camera control via LCUBE CUB-1 (for third-party cameras). Override function for WCU-4 and Hi-5. Assignable user buttons, multilingual display, focus tracking, adjustable speed control."
      },
      "Tilta Nucleus-M Hand Grip (single)": {
        "powerDrawWatts": 0.5,
        "fizConnector": "Proprietary 7-pin (to motor) / ARRI rosette or gimbal bar adapter",
        "power_source": "Internal Battery",
        "battery_type": "2x 18650 Li-ion (per grip, not included)",
        "connectivity": "Wireless (proprietary 2.4GHz RF, 1000ft/300m range)",
        "notes": "Wireless handgrip for Nucleus-M system. Left grip (focus) and Right grip (iris/zoom toggle). Can be mounted to ARRI rosettes or 25/30mm gimbal rods. Allows splitting FIZ control with the FIZ hand unit. Up to 48 hours battery life (idle)."
      },
      "Tilta Nucleus-M II Handle (single)": {
        "powerDrawWatts": 0.5,
        "fizConnector": "Proprietary 7-pin (to motor) / ARRI rosette or gimbal bar adapter",
        "power_source": "Internal Battery",
        "battery_type": "NP-F550 (single per handle)",
        "connectivity": "Wireless (proprietary 2.4GHz RF)",
        "notes": "Improved wireless handgrip for Nucleus-M II system. Supports up to 4 channels (FIZ + ND). Compatible with Nucleus M and Nano II systems. Adjustable damping on hand wheel. Left/Right hand switch for hand wheel. Camera control via Bluetooth or cable."
      },
      "DJI Focus Pro Handle": {
        "powerDrawWatts": 1,
        "fizConnector": "USB-C",
        "power_source": "Internal Battery",
        "battery_type": "Built-in rechargeable",
        "connectivity": "Wireless (DJI proprietary)",
        "notes": "Handle unit for the DJI Focus Pro kit. Works with Focus Pro Motors and the DJI LiDAR Range Finder."
      },
      "Preston MDR4": {
        "powerDrawWatts": 48,
        "fizConnector": "2x Motor Ports (proprietary LEMO 7-pin), Serial (for Light Ranger 2), Analog (for Micro Force), USB (firmware)",
        "power_source": "External DC (4-pin XLR or D-Tap)",
        "battery_type": "N/A (no internal battery)",
        "connectivity": "Wireless (Preston G4 radio link to hand units), Wired (via specific cables for camera run/stop, Light Ranger 2)",
        "notes": "2-channel digital motor driver (Focus and Iris or Zoom). Compatible with all Preston hand units (e.g., HU4) and motors. Automatic lens calibration. Each channel has adjustable torque and direction. Supports camera run/stop for various film/video cameras. Compact and suitable for handheld/Steadicam/gimbal. Does not output lens metadata."
      },
      "ARRI ECM-1": {
        "powerDrawWatts": 84,
        "fizConnector": "6x Motor ports (proprietary Lemo), 1x Camera (LEMO 7-pin), 1x Accessory (LEMO 4-pin), 1x Ethernet, 1x USB",
        "power_source": "External DC (LEMO 2-pin or 4-pin XLR)",
        "battery_type": "N/A (no internal battery)",
        "connectivity": "Wired (Ethernet, Camera cable to ALEXA 65/LF/Mini LF/35, USB) or Wireless (integrated Wi-Fi and ARRI White Radio)",
        "notes": "Extended Control Module for ALEXA 65/LF/Mini LF/35. Highly advanced and powerful lens and camera control. Provides 6 motor ports for advanced FIZ and iris/zoom control. Allows connection of multiple accessories and expands camera functionality. Enables advanced lens data functions and is often used for virtual production or complex setups."
      },
      "Redrock microRemote Basestation": {
        "powerDrawWatts": 54,
        "fizConnector": "3x Motor ports (proprietary 4-pin), 1x USB, 1x AUX, 1x Power (LEMO 2-pin)",
        "power_source": "External DC (6-18V via LEMO 2-pin)",
        "battery_type": "N/A (no internal battery)",
        "connectivity": "Wireless (proprietary Redrock RF, up to 300ft/90m range) or Wired (USB for firmware/control)",
        "notes": "Central receiver and motor driver for Redrock MicroRemote systems. Supports up to 3 motors (Focus, Iris, Zoom). Automatic or manual calibration. Compatible with various Redrock hand units (e.g., fingerwheel, handheld controller). Provides a single channel for focus, with optional expansion for iris/zoom. Compact and lightweight."
      },
      "ARRI LBUS Distributor (LBS-1)": {
        "powerDrawWatts": 0.24,
        "fizConnector": "Multiple LBUS ports (LEMO 4-pin)",
        "power_source": "External (via any LBUS connection)",
        "battery_type": "N/A (passive device)",
        "connectivity": "Wired (LBUS)",
        "notes": "A simple hub for LBUS devices, allowing multiple LBUS accessories (motors, hand units, rangefinders) to be connected to a single LBUS chain from a camera or power source. Facilitates power and data distribution within the LBUS network. Passive device, requires power from connected LBUS source."
      },
      "Cmotion compact LCS receiver": {
        "powerDrawWatts": 20,
        "fizConnector": "3x Motor ports (LEMO 4-pin), 1x Camera (LEMO 7-pin), 1x EXT (LEMO 4-pin)",
        "power_source": "External DC (10-34V via Camera port or EXT port)",
        "battery_type": "N/A (no internal battery)",
        "connectivity": "Wireless (proprietary cmotion RF, 2.4 GHz FHSS, up to 150m/500ft range) or Wired (CAM, EXT)",
        "notes": "Compact 3-axis lens control receiver. Compatible with cmotion hand units (e.g., cPRO hand unit, cvolution hand unit). Features an integrated camera run/stop control for various camera systems. Supports lens data communication. Suitable for gimbal, Steadicam, and drone applications due to its small size and lightweight design."
      },
      "Teradek RT Motion CTRL.3 Controller": {
        "powerDrawWatts": 15,
        "fizConnector": "USB-C, LEMO 2-pin (power out), LEMO 4-pin (data to MDR)",
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
        "connection_compatibility": "ARRI and cmotion systems (via LBUS through LCube CUB-1)",
        "measurement_method": "Ultrasonic (Sonar)",
        "measurement_range": "0.4m - 10m (1ft 4in - 33ft)",
        "accuracy": "High accuracy up close, decreases with distance.",
        "output_display": "Dedicated UDM-1 Display Unit, ARRI WCU-4/Hi-5, compatible ARRI cameras (via LDD/LBUS)",
        "notes": "The UDM-1 is the Ultrasonic Distance Measure. The LCube CUB-1 acts as a protocol converter, enabling the UDM-1 to connect to ARRI LBUS systems (like ALEXA Mini) or output serial data for other systems. It can be calibrated for film plane offset. Provides focus tracking with ARRI LDS equipment. Power draw: UDM-1 is ~6W, LCube CUB-1 is ~0.24W. Total combined power is listed as 6.24W."
      },
      "Focusbug Cine RT + LCube": {
        "powerDrawWatts": 15.24,
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
  }
};
if (typeof module !== "undefined" && module.exports) { module.exports = devices; }
