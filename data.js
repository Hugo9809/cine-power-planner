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
          "portType": "2-pin DC-IN",
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
          "portType": "2-pin DC-IN",
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
          "portType": "2-pin DC-IN",
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
          "portType": "2-pin DC-IN",
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
          "portType": "2-pin DC-IN",
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
          "portType": "2-pin DC-IN",
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
          "portType": "2-pin DC-IN",
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
          "portType": "2-pin DC-IN",
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
          "portType": "2-pin DC-IN",
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
          "portType": "2-pin DC-IN",
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
          "portType": "2-pin DC-IN",
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
          "portType": "2-pin DC-IN",
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
          "portType": "2-pin DC-IN",
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
            "portType": "12G SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "12G SDI"
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
            "portType": "12G SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "12G SDI"
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
            "portType": "3G SDI",
            "details": "2x inputs, one selectable as input/output"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G SDI",
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
            "portType": "3G SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G SDI"
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
            "portType": "3G SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G SDI"
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
            "portType": "3G SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G SDI"
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
            "portType": "3G SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G SDI"
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
            "portType": "3G SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G SDI"
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
            "portType": "HDMI 2.0 (4Kp30)"
          },
          {
            "portType": "3G SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI 2.0 (4Kp30)"
          },
          {
            "portType": "3G SDI"
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
            "portType": "3G SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G SDI"
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
            "portType": "3G SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "3G SDI"
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
            "portType": "3G SDI"
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
          "portType": "NP-F / USB-C",
          "voltageRange": "7-16V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI 1.4b"
          },
          {
            "portType": "3G SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI 1.4b"
          },
          {
            "portType": "3G SDI"
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
          "portType": "NP-F / USB-C",
          "voltageRange": "7-16V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI 1.4b"
          },
          {
            "portType": "3G SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI 1.4b Loopout"
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
          "portType": "Barrel 2.1mm / NP-F",
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
            "portType": "HD SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "HD SDI"
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
          "portType": "Barrel 2.1mm / NP-F",
          "voltageRange": "7-24V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "4K HDMI"
          }
        ],
        "outputs": [
          {
            "portType": "4K HDMI"
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
          "portType": "Barrel 2.1mm / NP-F",
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
            "portType": "SDI",
            "details": "2x SDI inputs"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "SDI"
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
          "portType": "Barrel 2.1mm / NP-F",
          "voltageRange": "7-24V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "4K HDMI"
          }
        ],
        "outputs": [
          {
            "portType": "4K HDMI"
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
          "portType": "Barrel 2.1mm / NP-F",
          "voltageRange": "6-16V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI 2.0"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI 2.0"
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
          "portType": "Barrel 2.1mm / NP-F",
          "voltageRange": "6-16V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI 2.0"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI 2.0"
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
          "portType": "Barrel 2.1mm / NP-F",
          "voltageRange": "6-16V"
        },
        "output": null
      },
      "video": {
        "inputs": [
          {
            "portType": "HDMI 2.0"
          },
          {
            "portType": "3G SDI"
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
          "portType": "Barrel 2.1mm / NP-F",
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
            "portType": "SDI"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI"
          },
          {
            "portType": "SDI"
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
            "portType": "4K HDMI"
          },
          {
            "portType": "3G SDI"
          }
        ],
        "outputs": [
          {
            "portType": "4K HDMI"
          },
          {
            "portType": "3G SDI"
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
            "portType": "4K HDMI"
          }
        ],
        "outputs": [
          {
            "portType": "4K HDMI"
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
            "portType": "4K HDMI"
          }
        ],
        "outputs": [
          {
            "portType": "4K HDMI"
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
            "portType": "HDMI 1.4"
          }
        ],
        "outputs": [
          {
            "portType": "HDMI 1.4"
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
    "Teradek Bolt 6 LT": {
      "powerDrawWatts": 9,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "6 GHz",
      "latencyMs": null
    },
    "Teradek Bolt 6 XT": {
      "powerDrawWatts": 20,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "6 GHz",
      "latencyMs": null
    },
    "Teradek Bolt 6 MAX": {
      "powerDrawWatts": 20,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "6 GHz",
      "latencyMs": null
    },
    "Teradek Bolt 4K LT": {
      "powerDrawWatts": 9,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Teradek Bolt 4K XT": {
      "powerDrawWatts": 20,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Teradek Bolt Pro 300 (TX)": {
      "powerDrawWatts": 6.5,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Teradek Bolt Pro 600 (TX)": {
      "powerDrawWatts": 4,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "6 GHz",
      "latencyMs": null
    },
    "Teradek Bolt Pro 2000 (TX)": {
      "powerDrawWatts": 7.7,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Teradek Bolt Pro 500 (TX)": {
      "powerDrawWatts": 7.3,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Teradek Bolt Pro 750 (TX)": {
      "powerDrawWatts": 7.5,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Teradek Bolt Pro 1000 (TX)": {
      "powerDrawWatts": 7.5,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Teradek Bolt 3000 (TX)": {
      "powerDrawWatts": 7.5,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Teradek Bolt 10000 (TX)": {
      "powerDrawWatts": 7.5,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Hollyland Pyro S (TX)": {
      "powerDrawWatts": 11,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Hollyland Mars 300 Pro (TX)": {
      "powerDrawWatts": 11,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Hollyland Mars 400S Pro (TX)": {
      "powerDrawWatts": 11,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "DJI SDR Transmission": {
      "powerDrawWatts": 11,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "DJI Transmission": {
      "powerDrawWatts": 11,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Vaxis Storm 800": {
      "powerDrawWatts": 6,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Vaxis Storm 1000": {
      "powerDrawWatts": 6.5,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Vaxis Storm 3000": {
      "powerDrawWatts": 6,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Dwarf Connection LR1": {
      "powerDrawWatts": 6,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Accsoon CineEye 2S Pro (TX)": {
      "powerDrawWatts": 4.5,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Accsoon CineEye II (TX)": {
      "powerDrawWatts": 3.5,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Accsoon CineView HE (TX)": {
      "powerDrawWatts": 4.5,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Accsoon CineView SE (TX)": {
      "powerDrawWatts": 4.5,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Accsoon CineView Nano (TX)": {
      "powerDrawWatts": 2.5,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Accsoon CineView Quad (TX)": {
      "powerDrawWatts": 4.5,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "Accsoon CineView Master 4K": {
      "powerDrawWatts": 15,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    },
    "None": {
      "powerDrawWatts": 0,
      "powerInput": "",
      "videoInput": "SDI",
      "videoOutput": "SDI",
      "frequency": "5 GHz",
      "latencyMs": null
    }
  },
  "fiz": {
    "motors": {
      "None": {
        "powerDrawWatts": 0,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Tilta Nucleus M (per motor)": {
        "powerDrawWatts": 20,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Tilta Nucleus M2 (per motor)": {
        "powerDrawWatts": 50,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Tilta Nucleus Nano (per motor)": {
        "powerDrawWatts": 5,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Tilta Nucleus Nano II (per motor)": {
        "powerDrawWatts": 25,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Arri Cforce Mini (peak)": {
        "powerDrawWatts": 20,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Arri Cforce Plus (peak)": {
        "powerDrawWatts": 32,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Teradek RT Motion FIZ Motor": {
        "powerDrawWatts": 18,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Preston DM1X (peak)": {
        "powerDrawWatts": 32.4,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Preston DM2 (peak)": {
        "powerDrawWatts": 22.2,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Preston DM2X (peak)": {
        "powerDrawWatts": 22.2,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Preston DM-A (peak)": {
        "powerDrawWatts": 18,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Preston DM-C (peak)": {
        "powerDrawWatts": 18,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Chrosziel CDM-100 (peak)": {
        "powerDrawWatts": 6,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Chrosziel CDM-M (peak)": {
        "powerDrawWatts": 6,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "DJI Focus Motor (Original)": {
        "powerDrawWatts": 30,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "DJI RS Focus Motor": {
        "powerDrawWatts": 22.4,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Cmotion cPRO Motor (base unit/receiver function)": {
        "powerDrawWatts": 20,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "SmallRig Wireless Follow Focus Motor": {
        "powerDrawWatts": 12,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
      },
      "Redrock MicroRemote Torque Motor": {
        "powerDrawWatts": 54,
        "connector": "",
        "internalController": false,
        "torqueNm": null,
        "gearTypes": [
          "0.8 mod"
        ]
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
if (typeof module!=="undefined" && module.exports){module.exports=devices;}
