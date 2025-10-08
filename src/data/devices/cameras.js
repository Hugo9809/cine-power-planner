/* global registerDevice */
(() => {
const cameraData = {
  "Arri Alexa Mini LF": {
    "powerDrawWatts": 89,
    "requiredImageCircleMm": 44.71,
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
    ],
    "frameRates": [
      "4.5K LF Open Gate: 0.75–40 fps",
      "4.5K LF 16:9: up to 60 fps",
      "4.5K LF 2.39:1: up to 90 fps",
      "S35 3.2K/16:9: up to 90 fps",
      "S35 HD: up to 200 fps"
    ]
  },
  "Arri Alexa Mini": {
    "powerDrawWatts": 84,
    "requiredImageCircleMm": 33.59,
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
    ],
    "frameRates": [
      "ARRIRAW 3.4K: up to 30 fps",
      "ProRes 3.2K: up to 60 fps",
      "ARRIRAW 2.8K: up to 200 fps",
      "ProRes 2K/HD: up to 200 fps"
    ]
  },
  "Arri Alexa 35": {
    "powerDrawWatts": 110,
    "requiredImageCircleMm": 33.9,
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
    ],
    "weight_g": 2900,
    "recordingCodecs": [
      "ARRIRAW MXF",
      "Apple ProRes 4444 XQ",
      "Apple ProRes 4444",
      "Apple ProRes 422 HQ",
      "Apple ProRes 422",
      "Apple ProRes 422 LT"
    ],
    "sensorModes": [
      "4.6K 3:2 Open Gate",
      "4.6K 16:9",
      "4K 16:9",
      "4K 2:1",
      "3.8K 16:9",
      "3.3K 6:5",
      "3K 1:1",
      "2.7K 8:9",
      "2K 16:9 S16"
    ],
    "resolutions": [
      "4608x3164",
      "4608x2592",
      "4096x2304",
      "4096x2048",
      "3840x2160",
      "3328x2790",
      "3072x3072",
      "2743x3086",
      "2048x1152"
    ],
    "frameRates": [
      "4.6K Open Gate 3:2: up to 75 fps",
      "4.6K 16:9: up to 120 fps",
      "4K 2.39:1: up to 160 fps",
      "3K crop modes: up to 200 fps",
      "HD/S35 high speed: up to 240 fps"
    ]
  },
  "Arri Alexa 35 Xtreme": {
    "powerDrawWatts": 121.5,
    "requiredImageCircleMm": 33.9,
    "power": {
      "input": {
        "voltageRange": "20.5-33.6",
        "type": "Bat LEMO 8-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "B-Mount",
          "mount": "native",
          "notes": ""
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "Fischer 3-pin",
          "voltage": "24V",
          "notes": "Regulated accessory power with start/stop and shutter pulse"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "notes": "Regulated accessory power output"
        },
        {
          "type": "LBUS (LEMO 4-pin)",
          "voltage": "24V",
          "notes": "Daisy-chainable lens and accessory power"
        },
        {
          "type": "LEMO 6-pin (Audio)",
          "voltage": "12V",
          "notes": "Balanced stereo line input with 12V accessory power"
        },
        {
          "type": "LEMO 10-pin (ETH)",
          "voltage": "24V",
          "notes": "Ethernet remote/control connector with regulated accessory power"
        },
        {
          "type": "Rear Interface",
          "notes": "Accessory modules like PDM-1 add 4×24V, 2×12V and D-Tap; LPS-1 adds extra 24V/12V feeds"
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "12G-SDI",
        "notes": "Two independent 12G SDI outputs supporting 1.5G/3G/6G/12G HD and UHD (4:2:2 and 4:4:4)"
      }
    ],
    "fizConnectors": [
      {
        "type": "LBUS (LEMO 4-pin)",
        "notes": "Lens motors and accessories"
      },
      {
        "type": "SERIAL (LEMO 4-pin)",
        "notes": "Distance measuring accessories"
      },
      {
        "type": "ETH (LEMO 10-pin)",
        "notes": "Camera Access Protocol, remote control and accessory power"
      }
    ],
    "recordingMedia": [
      {
        "type": "Codex Compact Drive 1TB",
        "notes": "CA08-1024"
      },
      {
        "type": "Codex Compact Drive 2TB",
        "notes": "CB16-2048"
      },
      {
        "type": "Codex Compact Drive Express 1TB",
        "notes": "CP08-1024"
      }
    ],
    "viewfinder": [
      {
        "type": "ARRI MVF-2 (Native)",
        "resolution": "1920x1080",
        "notes": "OLED eyepiece with 4\" flip-out LCD"
      }
    ],
    "lensMount": [
      {
        "type": "LPL (LBUS)",
        "mount": "native",
        "notes": "Includes PL-to-LPL adapter"
      },
      {
        "type": "PL (LBUS)",
        "mount": "adapted",
        "notes": "Supports ARRI LDS and Cooke /i lens data"
      },
      {
        "type": "PL (Hirose)",
        "mount": "adapted",
        "notes": "Alternate PL mount with Hirose lens interface"
      },
      {
        "type": "EF (LBUS)",
        "mount": "adapted",
        "notes": "Supports Canon EF electronic communication"
      },
      {
        "type": "Leitz M Mount for ARRI",
        "mount": "adapted",
        "notes": "Mechanical mount for rangefinder glass"
      }
    ],
    "timecode": [
      {
        "type": "LEMO 5-pin",
        "notes": "LTC timecode In/Out"
      },
      {
        "type": "SYNC IN (BNC)",
        "notes": "Genlock synchronization"
      },
      {
        "type": "RET IN (BNC)",
        "notes": "Switchable on SDI 2 for return feed"
      }
    ],
    "weight_g": 3000,
    "recordingCodecs": [
      "ARRIRAW MXF",
      "ARRICORE MXF",
      "Apple ProRes 4444 XQ",
      "Apple ProRes 4444",
      "Apple ProRes 422 HQ",
      "Apple ProRes 422",
      "Apple ProRes 422 LT"
    ],
    "sensorModes": [
      "4.6K 3:2 Open Gate",
      "4.6K 16:9",
      "4K 16:9",
      "4K 2:1",
      "3.8K 16:9",
      "3.3K 6:5",
      "3K 1:1",
      "2.7K 8:9",
      "2K 16:9 S16"
    ],
    "resolutions": [
      "4608x3164",
      "4608x2592",
      "4096x2304",
      "4096x2048",
      "3840x2160",
      "3840x1608",
      "3328x2790",
      "3072x3072",
      "2743x3086",
      "2048x1152",
      "1920x1080"
    ],
    "frameRates": [
      "4.6K Open Gate 3:2: up to 75 fps",
      "4.6K 16:9: up to 120 fps",
      "4K 2.39:1: up to 160 fps",
      "3K crop modes: up to 200 fps",
      "HD/S35 high speed: up to 240 fps"
    ]
  },
  "Arri Amira": {
    "powerDrawWatts": 50,
    "requiredImageCircleMm": 30.3,
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
        "type": "EXT LEMO 7-pin",
        "notes": "For electronic lens data and control"
      },
      {
        "type": "Hirose 12-pin",
        "notes": "For ENG type zoom lenses (FIZ control)"
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
    ],
    "frameRates": [
      "4K UHD: up to 60 fps",
      "2K/HD ProRes: up to 200 fps",
      "Sensor slow motion license: 0.75–200 fps"
    ]
  },
  "Sony Venice 2": {
    "powerDrawWatts": 76,
    "requiredImageCircleMm": 43.27,
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
    ],
    "weight_g": 4300,
    "recordingCodecs": [
      "X-OCN XT/ST/LT",
      "Apple ProRes 4444 XQ/4444/422 HQ (to 4K)"
    ],
    "sensorModes": [
      "6K 3:2 Open Gate",
      "6K 17:9",
      "S35 4K"
    ],
    "resolutions": [
      "6048×4032 (6K 3:2)",
      "4096×2160 (DCI 4K)",
      "3840×2160 (UHD)",
      "1920×1080 (HD)"
    ],
    "frameRates": [
      "8.6K full-frame: up to 60 fps",
      "5.8K Super 35: up to 90 fps",
      "4K 17:9: up to 120 fps",
      "2K 17:9: up to 120 fps"
    ]
  },
  "Sony Venice": {
    "powerDrawWatts": 60,
    "requiredImageCircleMm": 43.5,
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
    ],
    "weight_g": 3900,
    "recordingCodecs": [
      "X-OCN XT/ST/LT (with AXS-R7)",
      "16-bit RAW (with AXS-R7)",
      "XAVC (QFHD classes)",
      "Apple ProRes 4444/422 HQ (HD)"
    ],
    "sensorModes": [
      "Full-Frame 3:2 6K",
      "Super 35 4K"
    ],
    "resolutions": [
      "6048×4032 (6K 3:2)",
      "4096×2160 (DCI 4K)",
      "3840×2160 (UHD)",
      "1920×1080 (HD)"
    ],
    "frameRates": [
      "6K full-frame: up to 60 fps",
      "6K 2.39: up to 90 fps",
      "4K 17:9: up to 120 fps",
      "2K 17:9: up to 120 fps"
    ]
  },
  "Sony Burano": {
    "powerDrawWatts": 66,
    "requiredImageCircleMm": 43.27,
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
    ],
    "weight_g": 2400,
    "recordingCodecs": [
      "X-OCN LT (16-bit)",
      "XAVC H Intra HQ",
      "XAVC H Intra SQ",
      "XAVC H Long",
      "XAVC Intra",
      "XAVC Long"
    ],
    "sensorModes": [
      "Full Frame 8.6K 3:2 (Open Gate)",
      "Full Frame 8.2K 17:9",
      "Super 35 5.8K"
    ],
    "resolutions": [
      "8632x4856",
      "8192x4320",
      "5792x3056",
      "4096x2160",
      "3840x2160",
      "1920x1080"
    ],
    "frameRates": [
      "8.6K full-frame: up to 60 fps",
      "6K 17:9: up to 60 fps",
      "6K 2.39: up to 100 fps",
      "4K 17:9: up to 120 fps"
    ]
  },
  "Sony FX3": {
    "powerDrawWatts": 7.3,
    "requiredImageCircleMm": 42.82,
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
    ],
    "frameRates": [
      "UHD 4K: 23.98–120 fps",
      "Full HD: up to 240 fps"
    ]
  },
  "Sony FX6": {
    "powerDrawWatts": 18,
    "requiredImageCircleMm": 42.82,
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
    ],
    "frameRates": [
      "UHD 4K: 23.98–120 fps",
      "Full HD: up to 240 fps"
    ]
  },
  "Sony FX9": {
    "powerDrawWatts": 35.2,
    "requiredImageCircleMm": 40.35,
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
    ],
    "frameRates": [
      "6K oversampled 4K: up to 60 fps",
      "4K S&Q mode: up to 120 fps",
      "Full HD: up to 180 fps"
    ]
  },
  "Sony FS7 II": {
    "powerDrawWatts": 19,
    "requiredImageCircleMm": 29.89,
    "power": {
      "input": {
        "voltageRange": "12-17",
        "type": "XLR 4-pin"
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
      {
        "type": "3G-SDI"
      },
      {
        "type": "HDMI"
      }
    ],
    "fizConnectors": [
      {
        "type": "LANC",
        "notes": "Remote control"
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
        "type": "Sony FS7 EVF Port (Proprietary)",
        "notes": "For Sony viewfinder"
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
        "notes": "Timecode In/Out via XDCA-FS7"
      }
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
    ],
    "frameRates": [
      "DCI/UHD 4K: up to 60 fps",
      "Full HD: up to 180 fps"
    ]
  },
  "Canon C70": {
    "powerDrawWatts": 14.6,
    "requiredImageCircleMm": 29.62,
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
    ],
    "frameRates": [
      "4K DCI/UHD: up to 120 fps",
      "2K/HD crop: up to 180 fps"
    ]
  },
  "Canon C80": {
    "powerDrawWatts": 19.6,
    "requiredImageCircleMm": 43.27,
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
    ],
    "weight_g": 1300,
    "recordingCodecs": [
      "Cinema RAW Light (6K)",
      "XF-HEVC S (H.265 4:2:2/4:2:0 10-bit)",
      "XF-AVC S (H.264 4:2:0 8-bit)"
    ],
    "sensorModes": [
      "Full Frame",
      "Super 35 (crop)"
    ],
    "resolutions": [
      "6008x3164 (6K)",
      "4096x2160 (DCI 4K)",
      "3840x2160 (UHD 4K)",
      "2048x1080 (DCI 2K)",
      "1920x1080 (FHD)"
    ],
    "frameRates": [
      "4K DCI/UHD: up to 120 fps",
      "2K/HD crop: up to 180 fps"
    ]
  },
  "Canon C300 Mk III": {
    "powerDrawWatts": 31,
    "requiredImageCircleMm": 29.6,
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
    ],
    "frameRates": [
      "4K DCI/UHD: up to 120 fps",
      "2K/HD crop: up to 180 fps"
    ]
  },
  "Canon C400": {
    "powerDrawWatts": 32.5,
    "requiredImageCircleMm": 40.7,
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
    ],
    "weight_g": 1550,
    "recordingCodecs": [
      "Cinema RAW Light (LT/ST/HQ)",
      "XF-AVC",
      "XF-AVC S",
      "XF-HEVC S"
    ],
    "sensorModes": [
      "Full Frame 6K",
      "Super 35",
      "Super 16"
    ],
    "resolutions": [
      "6K",
      "4K DCI",
      "4K UHD",
      "2K/HD"
    ],
    "frameRates": [
      "6K full-frame: up to 60 fps",
      "4K oversampled: up to 120 fps",
      "2K/HD crop: up to 180 fps"
    ]
  },
  "Canon C500 Mk II": {
    "powerDrawWatts": 63,
    "requiredImageCircleMm": 43.9,
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
    ],
    "frameRates": [
      "5.9K full-frame: up to 60 fps",
      "4K DCI: up to 60 fps",
      "2K/HD crop: up to 120 fps"
    ]
  },
  "Canon EOS C700 FF": {
    "powerDrawWatts": 61,
    "requiredImageCircleMm": 43.1,
    "power": {
      "input": {
        "voltageRange": "11-17",
        "type": "XLR 4-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": "Factory configuration ships with integrated V-Mount back"
        },
        {
          "type": "Gold-Mount",
          "mount": "native",
          "notes": "Factory swappable AB Gold Mount version available"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "Hirose 4-pin",
          "voltage": "12V",
          "current": "1.5A",
          "notes": "Regulated DC OUT for accessories"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "24V",
          "current": "2A",
          "notes": "Regulated 24V DC OUT (for lens/remote heads)"
        }
      ]
    },
    "videoOutputs": [],
    "fizConnectors": [],
    "recordingMedia": [],
    "viewfinder": [],
    "lensMount": [],
    "timecode": [],
    "weight_g": 3455,
    "recordingCodecs": [
      "Cinema RAW (with Codex CDX-36150)",
      "ProRes 4444 XQ",
      "ProRes 4444",
      "ProRes 422 HQ",
      "ProRes 422",
      "XF-AVC Intra 10-bit 4:2:2",
      "XF-AVC LongGOP 10-bit 4:2:2",
      "XF-AVC RGB 12-bit 4:4:4"
    ],
    "sensorModes": [
      "Full Frame 5.9K",
      "Super 35 (crop) 4K/UHD",
      "Super 16 (crop) 2K/FHD"
    ],
    "resolutions": [
      "5952×3140",
      "4096×2160",
      "3840×2160",
      "2048×1080",
      "1920×1080"
    ],
    "frameRates": [
      "5.9K full-frame: up to 60 fps",
      "4K ProRes: up to 72 fps",
      "2K crop: up to 168 fps"
    ]
  },
  "Blackmagic BMPCC 4K": {
    "powerDrawWatts": 22,
    "requiredImageCircleMm": 21.64,
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
    ],
    "frameRates": [
      "DCI 4K: up to 60 fps",
      "Full HD (windowed): up to 120 fps"
    ]
  },
  "Blackmagic BMPCC 6K G2": {
    "powerDrawWatts": 26,
    "requiredImageCircleMm": 26.5,
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
    ],
    "weight_g": 1200,
    "recordingCodecs": [
      "Blackmagic RAW (Constant Bitrate 3:1/5:1/8:1/12:1; Constant Quality Q0/Q1/Q3/Q5)",
      "Apple ProRes (up to 4K)"
    ],
    "sensorModes": [
      "Super 35 6K",
      "Windowed 4K/HD"
    ],
    "resolutions": [
      "6144x3456 (6K 16:9)",
      "6144x2560 (6K 2.4:1)",
      "4096x2160 (DCI 4K)",
      "3840x2160 (UHD 4K)",
      "1920x1080 (HD)"
    ],
    "frameRates": [
      "6K 17:9: up to 50 fps",
      "6K 2.4:1: up to 60 fps",
      "2.8K anamorphic: up to 120 fps"
    ]
  },
  "Blackmagic BMPCC 6K": {
    "powerDrawWatts": 26,
    "requiredImageCircleMm": 26.5,
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
    ],
    "weight_g": 900,
    "recordingCodecs": [
      "Blackmagic RAW",
      "Apple ProRes"
    ],
    "sensorModes": [
      "Super 35"
    ],
    "resolutions": [
      "6144x3456",
      "6144x2560",
      "5744x3024",
      "4096x2160",
      "3840x2160",
      "3728x3104",
      "2868x1512",
      "1920x1080"
    ],
    "frameRates": [
      "6K 17:9: up to 50 fps",
      "6K 2.4:1: up to 60 fps",
      "2.8K anamorphic: up to 120 fps"
    ]
  },
  "Blackmagic Pocket Cinema Camera 6K Pro": {
    "powerDrawWatts": 26,
    "requiredImageCircleMm": 26.5,
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
    ],
    "weight_g": 1238,
    "recordingCodecs": [
      "Blackmagic RAW",
      "Apple ProRes 422 family"
    ],
    "sensorModes": [
      "S35 6K 16:9",
      "S35 6K 2.4:1",
      "2.8K window (HFR)"
    ],
    "resolutions": [
      "6144×3456 (6K 16:9)",
      "6144×2560 (6K 2.4:1)",
      "2868×1512 (2.8K 17:9)",
      "1920×1080 (HD)"
    ],
    "frameRates": [
      "6K 17:9: up to 50 fps",
      "6K 2.4:1: up to 60 fps",
      "2.8K anamorphic: up to 120 fps"
    ]
  },
  "Blackmagic URSA 12K": {
    "powerDrawWatts": 55,
    "requiredImageCircleMm": 30.56,
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
    ],
    "weight_g": 2700,
    "recordingCodecs": [
      "Blackmagic RAW"
    ],
    "sensorModes": [
      "Super 35"
    ],
    "resolutions": [
      "12288x6480",
      "8192x4320",
      "6144x3240",
      "4096x2160",
      "2048x1080"
    ],
    "frameRates": [
      "12K 17:9: up to 60 fps",
      "8K 16:9: up to 120 fps",
      "4K Super 16: up to 240 fps"
    ]
  },
  "Blackmagic URSA Cine": {
    "powerDrawWatts": 100,
    "requiredImageCircleMm": 55.9,
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
    ],
    "weight_g": 3955,
    "recordingCodecs": [
      "Blackmagic RAW (up to 12K)",
      "H.264 Proxies"
    ],
    "sensorModes": [
      "Full Frame 36x24mm (12K LF)",
      "S35 windowed modes"
    ],
    "resolutions": [
      "12288x8040 (12K)",
      "8192x4320 (8K)",
      "4096x2160 (DCI 4K)",
      "3840x2160 (UHD 4K)",
      "2048x1080 (DCI 2K)"
    ],
    "frameRates": [
      "12K 17:9: up to 60 fps",
      "8K 16:9: up to 120 fps",
      "4K Super 16: up to 240 fps"
    ]
  },
  "Blackmagic URSA Cine 17K 65": {
    "powerDrawWatts": 100,
    "requiredImageCircleMm": 56.4,
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
    ],
    "weight_g": 3950,
    "recordingCodecs": [
      "Blackmagic RAW",
      "H.264 Proxies"
    ],
    "sensorModes": [
      "17,520×8040 (17K 2.2:1 open gate)",
      "11,680×5360 (8K 2.2:1 open gate)",
      "8K 3:2",
      "8K 16:9",
      "8K 17:9"
    ],
    "resolutions": [
      "17520x8040 (17K)",
      "11680x5360 (8K)",
      "8192x5461 (8K 3:2)",
      "8192x4320 (8K 16:9)",
      "8192x4320 (8K 17:9)"
    ],
    "frameRates": [
      "Frame-rate specifications pending final release"
    ]
  },
  "Blackmagic PYXIS 6K": {
    "powerDrawWatts": 60,
    "requiredImageCircleMm": 43.27,
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
    ],
    "weight_g": 1700,
    "recordingCodecs": [
      "Blackmagic RAW",
      "H.264 Proxy (sidecar)"
    ],
    "sensorModes": [
      "Full Frame 6K 3:2 (Open Gate)",
      "FF 17:9/16:9 windows"
    ],
    "resolutions": [
      "6048x4032 (6K 3:2)",
      "6000x3164 (6K 17:9)",
      "4096x2160 (DCI 4K)",
      "3840x2160 (UHD 4K)",
      "1920x1080 (HD)"
    ],
    "frameRates": [
      "6K 17:9: up to 60 fps",
      "4K DCI: up to 120 fps",
      "2K crop: up to 240 fps"
    ]
  },
  "Blackmagic PYXIS 12K": {
    "powerDrawWatts": 90,
    "requiredImageCircleMm": 43.27,
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
    ],
    "weight_g": 2100,
    "recordingCodecs": [
      "Blackmagic RAW (12K)",
      "H.264 Proxy (sidecar)"
    ],
    "sensorModes": [
      "Full Frame 12K 3:2 (Open Gate)",
      "FF 17:9/16:9 windows"
    ],
    "resolutions": [
      "12288x8040 (12K 3:2)",
      "8192x4320 (8K)",
      "4096x2160 (DCI 4K)",
      "3840x2160 (UHD 4K)"
    ],
    "frameRates": [
      "12K 17:9: up to 60 fps",
      "8K 16:9: up to 120 fps",
      "4K Super 16: up to 240 fps"
    ]
  },
  "RED Komodo 6k": {
    "powerDrawWatts": 37,
    "requiredImageCircleMm": 30.56,
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
    ],
    "frameRates": [
      "6K 17:9: up to 40 fps",
      "6K 2.4:1: up to 50 fps",
      "4K 17:9: up to 60 fps",
      "2K 17:9: up to 120 fps"
    ]
  },
  "RED Komodo X": {
    "powerDrawWatts": 45,
    "requiredImageCircleMm": 30.56,
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
    ],
    "frameRates": [
      "6K 17:9: up to 80 fps",
      "6K 2.4:1: up to 100 fps",
      "4K 17:9: up to 120 fps",
      "2K 17:9: up to 240 fps"
    ]
  },
  "Red V-Raptor XL 8K VV": {
    "powerDrawWatts": 75,
    "requiredImageCircleMm": 46.31,
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
    ],
    "weight_g": 3620,
    "recordingCodecs": [
      "REDCODE RAW (HQ/MQ/LQ)",
      "Apple ProRes 4444 XQ/4444/422HQ/422/422LT (up to 4K)"
    ],
    "sensorModes": [
      "VV 8K (17:9, 2.4:1, 1:1)",
      "S35 window (6K, 5K, 4K)"
    ],
    "resolutions": [
      "8192x4320 (8K)",
      "7168x3780 (7K)",
      "6144x3240 (6K)",
      "5120x2700 (5K)",
      "4096x2160 (4K)",
      "2048x1080 (2K)"
    ],
    "frameRates": [
      "8K 17:9: up to 120 fps",
      "8K 2.4:1: up to 150 fps",
      "6K 17:9: up to 160 fps",
      "4K 17:9: up to 240 fps"
    ]
  },
  "Red V-RAPTOR® X XL 8K VV": {
    "powerDrawWatts": 75,
    "requiredImageCircleMm": 46.31,
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
    ],
    "weight_g": 3620,
    "recordingCodecs": [
      "REDCODE RAW (HQ/MQ/LQ)",
      "Apple ProRes 4444 XQ/4444/422HQ/422/422LT (up to 4K)"
    ],
    "sensorModes": [
      "VV 8K (global shutter)",
      "S35 window (6K/4K)"
    ],
    "resolutions": [
      "8192x4320 (8K)",
      "7168x3780 (7K)",
      "6144x3240 (6K)",
      "4096x2160 (4K)",
      "2048x1080 (2K)"
    ],
    "frameRates": [
      "8K 17:9: up to 120 fps",
      "8K 2.4:1: up to 150 fps",
      "6K 17:9: up to 160 fps",
      "4K 17:9: up to 240 fps"
    ]
  },
  "Red V-RAPTOR® XL 8K S35": {
    "powerDrawWatts": 75,
    "requiredImageCircleMm": 33.8,
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
    ],
    "weight_g": 3620,
    "recordingCodecs": [
      "REDCODE RAW (HQ/MQ/LQ)",
      "Apple ProRes 4444 XQ/4444/422HQ/422/422LT (up to 4K)"
    ],
    "sensorModes": [
      "Super 35 8K (17:9, 2.4:1, 1:1)"
    ],
    "resolutions": [
      "8192x4320 (8K S35)",
      "7168x3780 (7K)",
      "6144x3240 (6K)",
      "4096x2160 (4K)",
      "2048x1080 (2K)"
    ],
    "frameRates": [
      "6K 17:9: up to 160 fps",
      "6K 2.4:1: up to 200 fps",
      "4K 17:9: up to 240 fps"
    ]
  },
  "Red V-RAPTOR® X XL 8K S35": {
    "powerDrawWatts": 75,
    "requiredImageCircleMm": 33.8,
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
    ],
    "weight_g": 3620,
    "recordingCodecs": [
      "REDCODE RAW (HQ/MQ/LQ)",
      "Apple ProRes 4444 XQ/4444/422HQ/422/422LT (up to 4K)"
    ],
    "sensorModes": [
      "Super 35 8K (global shutter)"
    ],
    "resolutions": [
      "8192x4320 (8K S35)",
      "7168x3780 (7K)",
      "6144x3240 (6K)",
      "4096x2160 (4K)",
      "2048x1080 (2K)"
    ],
    "frameRates": [
      "6K 17:9: up to 160 fps",
      "6K 2.4:1: up to 200 fps",
      "4K 17:9: up to 240 fps"
    ]
  },
  "Red V-Raptor 8k S35": {
    "powerDrawWatts": 60,
    "requiredImageCircleMm": 33.8,
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
    ],
    "weight_g": 1814,
    "recordingCodecs": [
      "REDCODE RAW",
      "Apple ProRes (up to 4K)"
    ],
    "sensorModes": [
      "S35 8K",
      "Lower-resolution S35 windows"
    ],
    "resolutions": [
      "8192x4320",
      "4096x2160",
      "2048x1080"
    ],
    "frameRates": [
      "6K 17:9: up to 160 fps",
      "6K 2.4:1: up to 200 fps",
      "4K 17:9: up to 240 fps"
    ]
  },
  "Red V-Raptor X 8k S35": {
    "powerDrawWatts": 60,
    "requiredImageCircleMm": 33.8,
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
    ],
    "weight_g": 1814,
    "recordingCodecs": [
      "REDCODE RAW (HQ/MQ/LQ)",
      "Apple ProRes 4444 XQ/4444/422HQ/422/422LT (up to 4K)"
    ],
    "sensorModes": [
      "Super 35 8K (global shutter)"
    ],
    "resolutions": [
      "8192x4320 (8K S35)",
      "6144x3240 (6K)",
      "4096x2160 (4K)",
      "2048x1080 (2K)"
    ],
    "frameRates": [
      "6K 17:9: up to 160 fps",
      "6K 2.4:1: up to 200 fps",
      "4K 17:9: up to 240 fps"
    ]
  },
  "Red V-Raptor 8k VV": {
    "powerDrawWatts": 60,
    "requiredImageCircleMm": 46.31,
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
    ],
    "weight_g": 1800,
    "recordingCodecs": [
      "REDCODE RAW (HQ/MQ/LQ)",
      "Apple ProRes 4444 XQ/4444/422HQ/422/422LT (up to 4K)"
    ],
    "sensorModes": [
      "8K 8192×4320 up to 120 fps",
      "4K up to 240 fps",
      "8K 17:9",
      "8K 16:9",
      "8K 2:1"
    ],
    "resolutions": [
      "8192x4320 (8K)",
      "7168x3780 (7K)",
      "6144x3240 (6K)",
      "4096x2160 (4K)",
      "2048x1080 (2K)"
    ],
    "frameRates": [
      "8K 17:9: up to 120 fps",
      "8K 2.4:1: up to 150 fps",
      "6K 17:9: up to 160 fps",
      "4K 17:9: up to 240 fps"
    ]
  },
  "Red V-Raptor X 8k VV": {
    "powerDrawWatts": 60,
    "requiredImageCircleMm": 46.31,
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
    ],
    "weight_g": 1800,
    "recordingCodecs": [
      "REDCODE RAW (HQ/MQ/LQ)",
      "Apple ProRes 4444 XQ/4444/422HQ/422/422LT (up to 4K)"
    ],
    "sensorModes": [
      "VV 8K (global shutter)",
      "S35 window (6K/4K)"
    ],
    "resolutions": [
      "8192x4320 (8K)",
      "7168x3780 (7K)",
      "6144x3240 (6K)",
      "4096x2160 (4K)",
      "2048x1080 (2K)"
    ],
    "frameRates": [
      "8K 17:9: up to 120 fps",
      "8K 2.4:1: up to 150 fps",
      "6K 17:9: up to 160 fps",
      "4K 17:9: up to 240 fps"
    ]
  },
  "RED Scarlet-W (Dragon Sensor)": {
    "powerDrawWatts": 60,
    "requiredImageCircleMm": 28.9,
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
    ],
    "weight_g": 1588,
    "recordingCodecs": [
      "REDCODE RAW",
      "Apple ProRes 422/422LT (up to 4K30)",
      "Apple ProRes 422HQ/422/422LT (2K up to 60p)",
      "Avid DNxHR (up to 4K30)",
      "DNxHD (1080 up to 60p)"
    ],
    "sensorModes": [
      "Super 35 5K",
      "Windowed 4K/3K/2K"
    ],
    "resolutions": [
      "5120x2700 (5K)",
      "4096x2160 (4K)",
      "3072x1620 (3K)",
      "2048x1080 (2K)"
    ],
    "frameRates": [
      "5K 2.4:1: up to 60 fps",
      "4K 17:9: up to 150 fps",
      "2K 17:9: up to 300 fps"
    ]
  },
  "RED Epic-W (Helium 8K S35)": {
    "powerDrawWatts": 37,
    "requiredImageCircleMm": 33.8,
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
    ],
    "weight_g": 1520,
    "recordingCodecs": [
      "REDCODE RAW",
      "Apple ProRes 422HQ/422/422LT (up to 4K30)",
      "ProRes 4444 XQ/4444 (2K up to 120p)",
      "Avid DNxHR (up to 4K30)"
    ],
    "sensorModes": [
      "Super 35 8K",
      "Windowed 7K/6K/5K/4K/2K"
    ],
    "resolutions": [
      "8192x4320 (8K)",
      "7168x3780 (7K)",
      "6144x3240 (6K)",
      "5120x2700 (5K)",
      "4096x2160 (4K)"
    ],
    "frameRates": [
      "8K 17:9: up to 60 fps",
      "8K 2.4:1: up to 75 fps",
      "4K 17:9: up to 150 fps",
      "2K 17:9: up to 300 fps"
    ]
  },
  "RED Weapon (Helium 8K S35/VV)": {
    "powerDrawWatts": 75,
    "requiredImageCircleMm": 46.31,
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
    ],
    "weight_g": 1520,
    "recordingCodecs": [
      "REDCODE RAW",
      "Apple ProRes (selected sub-resolutions)"
    ],
    "sensorModes": [
      "8K S35 (Helium)",
      "8K VV (VistaVision, where equipped)"
    ],
    "resolutions": [
      "8192x4320 (8K)",
      "6144x3240 (6K)",
      "4096x2160 (4K)"
    ],
    "frameRates": [
      "8K S35 17:9: up to 60 fps",
      "8K VV 2.4:1: up to 75 fps",
      "4K 17:9: up to 150 fps",
      "2K 17:9: up to 300 fps"
    ]
  },
  "RED Epic Dragon (6K)": {
    "powerDrawWatts": 60,
    "requiredImageCircleMm": 34.5,
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
    ],
    "weight_g": 2200,
    "recordingCodecs": [
      "REDCODE RAW"
    ],
    "sensorModes": [
      "Super 35 6K",
      "Windowed 5K/4K/3K/2K"
    ],
    "resolutions": [
      "6144x3160 (6K)",
      "5120x2700 (5K)",
      "4096x2160 (4K)",
      "3072x1620 (3K)",
      "2048x1080 (2K)"
    ],
    "frameRates": [
      "6K 17:9: up to 75 fps",
      "6K 2.4:1: up to 100 fps",
      "4K 17:9: up to 150 fps",
      "2K 17:9: up to 200 fps"
    ]
  },
  "RED Scarlet Dragon (5K)": {
    "powerDrawWatts": 50,
    "requiredImageCircleMm": 34.5,
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
    ],
    "weight_g": 2268,
    "recordingCodecs": [
      "REDCODE RAW"
    ],
    "sensorModes": [
      "S35 6K / 5K windows (per mode)"
    ],
    "resolutions": [
      "6144x3160",
      "5120x2700",
      "4096x2160",
      "2048x1080"
    ],
    "frameRates": [
      "5K 2.4:1: up to 60 fps",
      "4K 17:9: up to 150 fps",
      "2K 17:9: up to 200 fps"
    ]
  },
  "RED Epic (Mysterium-X Sensor)": {
    "powerDrawWatts": 60,
    "requiredImageCircleMm": 31.4,
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
    ],
    "weight_g": 2200,
    "recordingCodecs": [
      "REDCODE RAW"
    ],
    "sensorModes": [
      "Super 35 5K",
      "Windowed 4K/3K/2K"
    ],
    "resolutions": [
      "5120x2700 (5K)",
      "4096x2160 (4K)",
      "3072x1620 (3K)",
      "2048x1080 (2K)"
    ],
    "frameRates": [
      "5K 2.4:1: up to 60 fps",
      "4K 17:9: up to 120 fps",
      "3K 17:9: up to 150 fps",
      "2K 17:9: up to 300 fps"
    ]
  },
  "RED Scarlet (Mysterium-X Sensor)": {
    "powerDrawWatts": 60,
    "requiredImageCircleMm": 31.4,
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
    ],
    "weight_g": 2268,
    "recordingCodecs": [
      "REDCODE RAW"
    ],
    "sensorModes": [
      "S35 5K"
    ],
    "resolutions": [
      "5120x2700",
      "4096x2160",
      "2048x1080"
    ],
    "frameRates": [
      "4K 16:9: up to 30 fps",
      "3K 16:9: up to 48 fps",
      "2K 16:9: up to 60 fps",
      "1K 16:9: up to 120 fps"
    ]
  },
  "Panasonic Lumix S5 II": {
    "powerDrawWatts": 12,
    "requiredImageCircleMm": 42.82,
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
    "timecode": [],
    "weight_g": 657,
    "recordingCodecs": [
      "H.265/HEVC",
      "H.264/AVC"
    ],
    "sensorModes": [
      "FF 3:2 Open Gate",
      "FF 17:9/16:9"
    ],
    "resolutions": [
      "5952x3968",
      "5888x3312",
      "4096x2160",
      "3840x2160",
      "1920x1080"
    ],
    "frameRates": [
      "6K 3:2: up to 30 fps",
      "5.9K 16:9: up to 60 fps",
      "4K 10-bit: up to 60 fps",
      "FHD VFR: up to 180 fps"
    ]
  },
  "Panasonic Lumix GH6": {
    "powerDrawWatts": 5,
    "requiredImageCircleMm": 21.64,
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
    "timecode": [],
    "weight_g": 739,
    "recordingCodecs": [
      "Apple ProRes 422 HQ",
      "Apple ProRes 422",
      "H.265/HEVC",
      "H.264/AVC"
    ],
    "sensorModes": [
      "MFT 17:9",
      "MFT 4:3 Anamorphic"
    ],
    "resolutions": [
      "5728x3024",
      "5760x4320",
      "4096x2160",
      "3840x2160",
      "1920x1080"
    ],
    "frameRates": [
      "5.7K ProRes: up to 60 fps",
      "4K DCI: up to 120 fps",
      "FHD VFR: up to 240 fps"
    ]
  },
  "Sony A7S III": {
    "powerDrawWatts": 5,
    "requiredImageCircleMm": 42.82,
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
    "timecode": [],
    "weight_g": 699,
    "recordingCodecs": [
      "XAVC S-I 10-bit 4:2:2",
      "XAVC HS (H.265)",
      "XAVC S (H.264)"
    ],
    "sensorModes": [
      "Full-Frame 4K",
      "APS-C/S35 crop 4K",
      "Full-Frame HD"
    ],
    "resolutions": [
      "3840×2160",
      "1920×1080"
    ],
    "frameRates": [
      "UHD 4K XAVC S-I: up to 120 fps",
      "Full HD S&Q: up to 240 fps"
    ]
  },
  "Fujifilm X-H2S": {
    "powerDrawWatts": 15,
    "requiredImageCircleMm": 28.21,
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
    "timecode": [],
    "weight_g": 660,
    "recordingCodecs": [
      "Apple ProRes 422 HQ/422/LT (internal, CFexpress)",
      "H.265/HEVC 10-bit 4:2:2/4:2:0",
      "H.264/AVC"
    ],
    "sensorModes": [
      "APS-C (open-gate 3:2 and cropped 16:9)"
    ],
    "resolutions": [
      "6240x4160 (6.2K 3:2)",
      "4096x2160 (DCI 4K)",
      "3840x2160 (UHD 4K)",
      "1920x1080 (FHD)"
    ],
    "frameRates": [
      "6.2K 3:2: up to 30 fps",
      "4K DCI: up to 120 fps",
      "Full HD high speed: up to 240 fps"
    ]
  },
  "DJI Ronin 4D 6K": {
    "powerDrawWatts": 40,
    "requiredImageCircleMm": 43.27,
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
    "timecode": [],
    "weight_g": 1450,
    "recordingCodecs": [
      "Apple ProRes 422 HQ/LT",
      "H.264",
      "Apple ProRes RAW (with RAW License to PROSSD)"
    ],
    "sensorModes": [
      "Full-Frame 6K",
      "C4K",
      "2K"
    ],
    "resolutions": [
      "4096×2160 (C4K)",
      "2048×1080 (2K)",
      "6K up to 60p"
    ],
    "frameRates": [
      "6K: up to 60 fps",
      "4K: up to 120 fps"
    ]
  },
  "Sony FX30": {
    "powerDrawWatts": 5.6,
    "requiredImageCircleMm": 28.21,
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
    ],
    "weight_g": 646,
    "recordingCodecs": [
      "XAVC S-I 10-bit 4:2:2",
      "XAVC S (H.264)",
      "XAVC HS (H.265)"
    ],
    "sensorModes": [
      "Super 35 6K oversample → 4K",
      "Super 35 HD"
    ],
    "resolutions": [
      "3840×2160 (UHD)",
      "1920×1080 (HD)"
    ],
    "frameRates": [
      "Super35 4K: up to 120 fps",
      "Full HD: up to 240 fps"
    ]
  },
  "Panasonic Lumix BS1H": {
    "powerDrawWatts": 8.1,
    "requiredImageCircleMm": 42.82,
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
    ],
    "weight_g": 585,
    "recordingCodecs": [
      "H.265/HEVC 10-bit",
      "H.264/AVC 10-bit/8-bit",
      "ProRes RAW/Blackmagic RAW via HDMI (external)"
    ],
    "sensorModes": [
      "Full Frame",
      "APS-C/S35 crop (4K/HD)"
    ],
    "resolutions": [
      "5952x3968 (5.9K 3:2)",
      "5888x3312 (5.9K 16:9)",
      "5472x3648 (5.4K 3:2 anamorphic)",
      "4096x2160 (DCI 4K)",
      "3840x2160 (UHD 4K)",
      "1920x1080 (FHD)"
    ],
    "frameRates": [
      "6K 3:2: up to 24 fps",
      "5.9K 16:9: up to 30 fps",
      "4K 17:9: up to 60 fps",
      "Full HD VFR: up to 180 fps"
    ]
  },
  "Sony ZV-E1": {
    "powerDrawWatts": 7,
    "requiredImageCircleMm": 42.82,
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
    "timecode": [],
    "weight_g": 483,
    "recordingCodecs": [
      "XAVC S-I (All-Intra)",
      "XAVC S (H.264)",
      "XAVC HS (H.265)"
    ],
    "sensorModes": [
      "FF 16:9/UHD"
    ],
    "resolutions": [
      "3840x2160",
      "1920x1080"
    ],
    "frameRates": [
      "UHD 4K: up to 120 fps",
      "Full HD: up to 240 fps"
    ]
  },
  "Fujifilm X-M5": {
    "powerDrawWatts": 5.5,
    "requiredImageCircleMm": 28.21,
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
    "timecode": [],
    "weight_g": 355,
    "recordingCodecs": [
      "H.264",
      "H.265 10-bit 4:2:2",
      "RAW external"
    ],
    "sensorModes": [
      "6.2K open gate 25/30p",
      "Uncropped 4K/DCI 25/30p",
      "Cropped 4K/DCI 50/60p",
      "FHD 240p"
    ],
    "resolutions": [
      "6240x4160 (6.2K)",
      "4096x2160 (DCI 4K)",
      "3840x2160 (UHD 4K)",
      "1920x1080 (FHD)"
    ],
    "frameRates": [
      "6.2K open gate: up to 30 fps",
      "4K HQ: up to 60 fps",
      "Full HD high speed: up to 240 fps"
    ]
  },
  "Canon EOS R5 Mark II": {
    "powerDrawWatts": 15,
    "requiredImageCircleMm": 43.27,
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
    "timecode": [],
    "weight_g": 588,
    "recordingCodecs": [
      "RAW (internal)",
      "XF-HEVC S (H.265)",
      "XF-AVC S (H.264)"
    ],
    "sensorModes": [
      "Full Frame (oversampled 4K/8K)",
      "Super 35/APS-C crop"
    ],
    "resolutions": [
      "8192x4320 (8K)",
      "4096x2160 (DCI 4K)",
      "3840x2160 (UHD 4K)",
      "1920x1080 (FHD)"
    ],
    "frameRates": [
      "8K RAW: up to 60 fps",
      "4K oversampled: up to 120 fps",
      "Full HD S&Q: up to 240 fps"
    ]
  },
  "Canon EOS R1": {
    "powerDrawWatts": 18,
    "requiredImageCircleMm": 43.27,
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
    "timecode": [],
    "weight_g": 920,
    "recordingCodecs": [
      "RAW (up to 6K)",
      "XF-HEVC S (H.265 10-bit 4:2:2/4:2:0)",
      "XF-AVC S (H.264 8-bit 4:2:0)"
    ],
    "sensorModes": [
      "Full Frame",
      "APS-C (crop)"
    ],
    "resolutions": [
      "6000-class (6K RAW)",
      "4096x2160 (DCI 4K)",
      "3840x2160 (UHD 4K)",
      "2048x1080 (DCI 2K)",
      "1920x1080 (FHD)"
    ],
    "frameRates": [
      "Official video frame rates pending"
    ]
  },
  "Sony PXW-FS7": {
    "powerDrawWatts": 19,
    "requiredImageCircleMm": 29.89,
    "power": {
      "input": {
        "voltageRange": "11-17",
        "type": "XLR 4-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "Sony BP-U",
          "mount": "native",
          "notes": "Supports BP-U30/60/90 series packs"
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": "Requires XDCA-FS7 extension unit"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "Hirose 4-pin",
          "voltage": "12V",
          "current": "0.5A",
          "notes": "DC OUT on camera body"
        },
        {
          "type": "USB-A",
          "voltage": "5V",
          "current": "1.5A",
          "notes": "USB host port powers accessories/data"
        }
      ]
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
    ],
    "frameRates": [
      "DCI/UHD 4K: up to 60 fps",
      "Full HD: up to 180 fps"
    ]
  },
  "Canon C200": {
    "powerDrawWatts": 19.3,
    "requiredImageCircleMm": 27.57,
    "power": {
      "input": {
        "voltageRange": "11-17",
        "type": "XLR 4-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "Canon BP-A",
          "mount": "native",
          "notes": "Supports BP-A30/BP-A60 packs"
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": "Requires third-party plate or expansion back"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "Hirose 4-pin",
          "voltage": "12V",
          "current": "1.5A",
          "notes": "Regulated DC OUT"
        },
        {
          "type": "USB-A",
          "voltage": "5V",
          "current": "0.5A",
          "notes": "USB terminal for accessories/Wi-Fi"
        }
      ]
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
    ],
    "frameRates": [
      "4K DCI: up to 60 fps",
      "2K/HD crop: up to 120 fps"
    ]
  },
  "Panasonic AU-EVA1": {
    "powerDrawWatts": 19,
    "requiredImageCircleMm": 26.57,
    "power": {
      "input": {
        "voltageRange": "10.5-17",
        "type": "XLR 4-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "Panasonic AG-VBR",
          "mount": "native",
          "notes": "Supports AG-VBR59/89/118 packs"
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": "Requires third-party plate"
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": "Requires third-party plate"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "Hirose 4-pin",
          "voltage": "12V",
          "current": "2A",
          "notes": "Regulated DC OUT"
        },
        {
          "type": "USB-A",
          "voltage": "5V",
          "current": "0.5A",
          "notes": "USB host/control port"
        }
      ]
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
    ],
    "frameRates": [
      "5.7K RAW: up to 60 fps",
      "4K 10-bit: up to 60 fps",
      "2K/HD VFR: up to 240 fps"
    ]
  },
  "Panasonic VariCam LT": {
    "powerDrawWatts": 47,
    "requiredImageCircleMm": 27.78,
    "power": {
      "input": {
        "voltageRange": "10-18",
        "type": "XLR 4-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": "Integrated V-Mount back"
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": "Optional plate swap"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "12V",
          "current": "2A",
          "notes": "Accessory D-Tap"
        },
        {
          "type": "D-Tap",
          "voltage": "12V",
          "current": "2A",
          "notes": "Accessory D-Tap"
        },
        {
          "type": "Hirose 4-pin",
          "voltage": "12V",
          "current": "2A",
          "notes": "Regulated DC OUT"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "24V",
          "current": "2A",
          "notes": "Regulated 24V for lens/remote"
        }
      ]
    },
    "videoOutputs": [],
    "fizConnectors": [],
    "recordingMedia": [],
    "viewfinder": [],
    "lensMount": [],
    "timecode": [],
    "weight_g": 2700,
    "recordingCodecs": [
      "AVC-Intra 4K",
      "AVC-Intra 2K444",
      "AVC-Intra 2K422",
      "AVC-Intra 2K-LT",
      "AVC-Intra 444",
      "AVC-Intra 422",
      "AVC-Intra 100",
      "AVC-Intra LT",
      "ProRes 4444",
      "ProRes 422 HQ"
    ],
    "sensorModes": [
      "S35 4K 4096×2160",
      "S35 UHD 3840×2160",
      "2K 2048×1080 (crop for HFR)",
      "HD 1920×1080"
    ],
    "resolutions": [
      "4096×2160",
      "3840×2160",
      "2048×1080",
      "1920×1080"
    ],
    "frameRates": [
      "4K 17:9: up to 60 fps",
      "2K/HD: up to 240 fps"
    ]
  },
  "RED V-RAPTOR 8K VV": {
    "powerDrawWatts": 60,
    "requiredImageCircleMm": 46.31,
    "power": {
      "input": {
        "voltageRange": "11.5-32",
        "type": "LEMO 6-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "Micro V-Mount",
          "mount": "native",
          "notes": "Integrated micro V-lock interface"
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": "Full-size plates via adapters"
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": "Requires third-party adapter/backplate"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "3A",
          "notes": "Aux PWR 1"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "3A",
          "notes": "Aux PWR 2"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "24V",
          "current": "3A",
          "notes": "Aux PWR 24V"
        },
        {
          "type": "USB-C PD",
          "voltage": "5-20V",
          "wattage": 45,
          "notes": "USB-C PD on camera body"
        }
      ]
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
    ],
    "frameRates": [
      "8K 17:9: up to 120 fps",
      "8K 2.4:1: up to 150 fps",
      "6K 17:9: up to 160 fps",
      "4K 17:9: up to 240 fps"
    ]
  },
  "RED V-RAPTOR [X] 8K VV": {
    "powerDrawWatts": 75,
    "requiredImageCircleMm": 46.31,
    "power": {
      "input": {
        "voltageRange": "11.5-32",
        "type": "LEMO 6-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "Micro V-Mount",
          "mount": "native",
          "notes": "Integrated micro V-lock interface"
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": "Full-size plates via adapters"
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": "Requires third-party adapter/backplate"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "3A",
          "notes": "Aux PWR 1"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "3A",
          "notes": "Aux PWR 2"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "24V",
          "current": "3A",
          "notes": "Aux PWR 24V"
        },
        {
          "type": "USB-C PD",
          "voltage": "5-20V",
          "wattage": 45,
          "notes": "USB-C PD on camera body"
        }
      ]
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
    ],
    "frameRates": [
      "8K 17:9: up to 120 fps",
      "8K 2.4:1: up to 150 fps",
      "6K 17:9: up to 160 fps",
      "4K 17:9: up to 240 fps"
    ]
  },
  "RED V-RAPTOR 8K S35": {
    "powerDrawWatts": 70,
    "requiredImageCircleMm": 33.8,
    "power": {
      "input": {
        "voltageRange": "11.5-32",
        "type": "LEMO 6-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "Micro V-Mount",
          "mount": "native",
          "notes": "Integrated micro V-lock interface"
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": "Full-size plates via adapters"
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": "Requires third-party adapter/backplate"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "3A",
          "notes": "Aux PWR 1"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "3A",
          "notes": "Aux PWR 2"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "24V",
          "current": "3A",
          "notes": "Aux PWR 24V"
        },
        {
          "type": "USB-C PD",
          "voltage": "5-20V",
          "wattage": 45,
          "notes": "USB-C PD on camera body"
        }
      ]
    },
    "videoOutputs": [],
    "fizConnectors": [],
    "recordingMedia": [],
    "viewfinder": [],
    "lensMount": [],
    "timecode": [],
    "weight_g": 1814,
    "recordingCodecs": [
      "REDCODE RAW",
      "ProRes 4444 XQ (to 4K)",
      "ProRes 4444 (to 4K)",
      "ProRes 422 HQ (to 4K)",
      "ProRes 422 (to 4K)",
      "ProRes 422 LT (to 4K)"
    ],
    "sensorModes": [
      "S35 8K 17:9",
      "S35 8K 2.4:1",
      "S35 7K 17:9",
      "S35 7K 2.4:1",
      "S35 6K 17:9",
      "S35 6K 2.4:1"
    ],
    "resolutions": [
      "8192×4320",
      "8192×3456",
      "7168×3780",
      "7168×3024",
      "6144×3240",
      "6144×2592",
      "5120×2700",
      "5120×2160",
      "4096×2160",
      "4096×1728",
      "3072×1620",
      "3072×1296",
      "2048×1080",
      "2048×864"
    ],
    "frameRates": [
      "6K 17:9: up to 160 fps",
      "6K 2.4:1: up to 200 fps",
      "4K 17:9: up to 240 fps"
    ]
  },
  "Blackmagic Cinema Camera 6K": {
    "powerDrawWatts": 30,
    "requiredImageCircleMm": 26.5,
    "power": {
      "input": {
        "voltageRange": "12-20",
        "type": "Locking DC barrel"
      },
      "batteryPlateSupport": [
        {
          "type": "NP-F570",
          "mount": "native",
          "notes": "Sony L-Series type"
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": "Requires battery grip or adapter"
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": "Requires battery grip or adapter"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "USB-C",
          "voltage": "5V",
          "current": "1.5A",
          "notes": "USB-C expansion port powers external drives"
        }
      ]
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
    ],
    "frameRates": [
      "6K open gate: up to 36 fps",
      "6K 2.4:1: up to 60 fps",
      "4K DCI: up to 60 fps",
      "1080p: up to 120 fps"
    ]
  },
  "Leica SL3-S": {
    "powerDrawWatts": 10,
    "requiredImageCircleMm": 43.27,
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
    "timecode": [],
    "weight_g": 768,
    "recordingCodecs": [
      "Apple ProRes 422 HQ (SSD)",
      "H.265/HEVC",
      "H.264/AVC"
    ],
    "sensorModes": [
      "FF 3:2 Open Gate",
      "FF 16:9"
    ],
    "resolutions": [
      "6K",
      "4K",
      "1920x1080"
    ],
    "frameRates": [
      "8K 10-bit: up to 30 fps",
      "4K 10-bit: up to 60 fps",
      "Full HD slow motion: up to 180 fps"
    ]
  },
  "Canon EOS R5 C": {
    "powerDrawWatts": 13.3,
    "requiredImageCircleMm": 43.27,
    "power": {
      "input": {
        "voltageRange": "9-15",
        "type": "USB-C PD,DC Coupler"
      },
      "batteryPlateSupport": [
        {
          "type": "Canon LP-E6NH",
          "mount": "native",
          "notes": "Also accepts LP-E6N/LP-E6 packs"
        },
        {
          "type": "DC Coupler (DR-E6C)",
          "mount": "native",
          "notes": "Used with CA-946 AC adapter"
        },
        {
          "type": "V-Mount",
          "mount": "adapted",
          "notes": "Requires external plate feeding USB-C PD or coupler"
        }
      ],
      "powerDistributionOutputs": []
    },
    "videoOutputs": [],
    "fizConnectors": [],
    "recordingMedia": [],
    "viewfinder": [],
    "lensMount": [],
    "timecode": [],
    "weight_g": 680,
    "recordingCodecs": [
      "Cinema RAW Light (CRM) 12-bit",
      "XF-AVC (MXF) 4:2:2 10-bit (ALL-I/Long GOP)",
      "HEVC/H.265 4:2:2 10-bit / 4:2:0 10-bit",
      "H.264/AVC 4:2:0 8-bit"
    ],
    "sensorModes": [
      "Full-Frame 8K",
      "Super 35 (5.9K crop)",
      "Super 16 (2.9K crop)"
    ],
    "resolutions": [
      "8192×4320 (8K)",
      "5952×3140 (5.9K)",
      "2976×1570 (2.9K)",
      "4096×2160 (DCI 4K)",
      "3840×2160 (UHD)",
      "1920×1080 (HD)"
    ],
    "frameRates": [
      "8K Cinema RAW Light: up to 60 fps",
      "4K DCI/UHD: up to 120 fps",
      "2K/HD: up to 180 fps"
    ]
  },
  "Blackmagic URSA Broadcast G2": {
    "powerDrawWatts": 100,
    "requiredImageCircleMm": 26.51,
    "power": {
      "input": {
        "voltageRange": "12-20",
        "type": "XLR 4-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": "Integrated plate"
        },
        {
          "type": "Gold-Mount",
          "mount": "adapted",
          "notes": "Optional accessory plate"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "2A",
          "notes": "Accessory power 1"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "2A",
          "notes": "Accessory power 2"
        },
        {
          "type": "Hirose 12-pin",
          "voltage": "12V",
          "current": "2A",
          "notes": "Lens power/control connector"
        },
        {
          "type": "USB-C",
          "voltage": "5V",
          "current": "1.5A",
          "notes": "USB-C expansion port"
        }
      ]
    },
    "videoOutputs": [],
    "fizConnectors": [],
    "recordingMedia": [],
    "viewfinder": [],
    "lensMount": [],
    "timecode": [],
    "weight_g": 3550,
    "recordingCodecs": [
      "Blackmagic RAW",
      "Apple ProRes",
      "H.265/HEVC",
      "H.264/AVC"
    ],
    "sensorModes": [
      "6K film (digital film mode)",
      "UHD 4K video",
      "HD"
    ],
    "resolutions": [
      "3840×2160 (UHD)",
      "1920×1080 (HD)"
    ],
    "frameRates": [
      "6K BRAW: up to 50 fps",
      "UHD ProRes: up to 60 fps",
      "HD windowed: up to 120 fps"
    ]
  },
  "Kinefinity MAVO Edge 6K": {
    "powerDrawWatts": 32,
    "requiredImageCircleMm": 43.27,
    "power": {
      "input": {
        "voltageRange": "10.5-34",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": "Hybrid plate accepts standard 14.8V packs"
        },
        {
          "type": "BP-U",
          "mount": "native",
          "notes": "Supports GripBAT 4S batteries for compact builds"
        },
        {
          "type": "NP-F",
          "mount": "optional",
          "notes": "GripBAT 2S via UPS baseplate can supply backup power"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "D-Tap",
          "voltage": "14.8V",
          "notes": "Unregulated output on camera body"
        },
        {
          "type": "RS (LEMO 2-pin)",
          "voltage": "12V",
          "notes": "Regulated 12V accessory rail"
        },
        {
          "type": "Lens port (LEMO 7-pin)",
          "voltage": "12V",
          "notes": "Lens/control port with 12V accessory power"
        }
      ]
    },
    "videoOutputs": [],
    "fizConnectors": [],
    "recordingMedia": [],
    "viewfinder": [],
    "lensMount": [],
    "timecode": [],
    "weight_g": 1600,
    "recordingCodecs": [
      "Apple ProRes 422 LT/422/422 HQ",
      "Apple ProRes 4444/4444 XQ",
      "CinemaDNG (uncompressed RAW)"
    ],
    "sensorModes": [
      "Full-Frame 3:2 6K Open Gate",
      "FF 6K 2.4:1",
      "FF 5.7K 3:2",
      "S35/APS-C modes"
    ],
    "resolutions": [
      "6016×2520 (6K 2.4:1)",
      "5760×3700 (5.7K 3:2)",
      "5120×2700 (5K DCI)",
      "3840×2160 (UHD)"
    ],
    "frameRates": [
      "6K 3:2: up to 75 fps",
      "6K 17:9: up to 60 fps",
      "4K 17:9: up to 150 fps",
      "2K 17:9: up to 290 fps"
    ]
  },
  "Z CAM E2-F6": {
    "powerDrawWatts": 50,
    "requiredImageCircleMm": 43.27,
    "power": {
      "input": {
        "voltageRange": "12-16.8",
        "type": "LEMO 2-pin",
        "notes": "DC input"
      },
      "batteryPlateSupport": [
        {
          "type": "Sony NP-F (L-Series)",
          "mount": "native",
          "notes": "Integrated L-Series battery sled"
        },
        {
          "type": "V-Mount",
          "mount": "optional",
          "notes": "Available via optional power module"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "2A",
          "notes": "Regulated accessory power output"
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "HDMI",
        "version": "2.0 Type A",
        "notes": "4K up to 59.94p, 10-bit 4:2:2"
      },
      {
        "type": "12G-SDI",
        "notes": "BNC, up to 4K60 10-bit 4:2:2"
      }
    ],
    "fizConnectors": [
      {
        "type": "2.5mm LANC",
        "notes": "Remote control port"
      },
      {
        "type": "Serial CTRL",
        "notes": "Dedicated accessory control port"
      }
    ],
    "recordingMedia": [
      {
        "type": "CFast 2.0",
        "notes": "Dual slots"
      },
      {
        "type": "ZBlade",
        "notes": "Optional NVMe media module"
      }
    ],
    "viewfinder": [
      {
        "type": "5\" Touchscreen LCD",
        "resolution": "1920x1080",
        "notes": "Included monitor powered via control cable"
      }
    ],
    "lensMount": [
      {
        "type": "EF",
        "mount": "native",
        "notes": "Optional adapters support M, MFT, PL, and LPL"
      }
    ],
    "timecode": [
      {
        "type": "BNC (TC/Genlock)",
        "notes": "Shared LTC and tri-level sync input"
      }
    ],
    "weight_g": 1090,
    "recordingCodecs": [
      "ZRAW 12-bit",
      "Apple ProRes 422 Proxy",
      "Apple ProRes 422 LT",
      "Apple ProRes 422",
      "Apple ProRes 422 HQ",
      "H.265/HEVC",
      "H.264/AVC"
    ],
    "sensorModes": [
      "Full-Frame 6K Open Gate",
      "C6K",
      "6K 2.4:1",
      "6K UHD",
      "5K 4:3",
      "C5K",
      "4K UHD"
    ],
    "resolutions": [
      "6064×4040 (Open Gate)",
      "6064×3196 (C6K)",
      "6064×2560 (6K 2.4:1)",
      "5760×3240 (6K UHD)",
      "5376×4032 (5K 4:3)",
      "5120×2700 (C5K)",
      "4096×2160 (DCI 4K)",
      "3840×2160 (UHD)",
      "2112×1188 (S16 16:9)",
      "1920×1080 (FHD)"
    ],
    "frameRates": [
      "6K 17:9: up to 60 fps",
      "4K 17:9: up to 120 fps",
      "2K 17:9: up to 240 fps"
    ]
  },
  "Z CAM E2-F6 Pro / Mark II": {
    "powerDrawWatts": 50,
    "requiredImageCircleMm": 43.27,
    "power": {
      "input": {
        "voltageRange": "12-18",
        "type": "LEMO 2-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": "Integrated 14.8V plate on Pro body"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "2A",
          "notes": "AUX DC output"
        }
      ]
    },
    "videoOutputs": [
      {
        "type": "HDMI",
        "version": "2.0 Type A",
        "notes": "4K up to 59.94p, 10-bit 4:2:2"
      },
      {
        "type": "12G-SDI",
        "notes": "BNC, up to 4K60 10-bit 4:2:2"
      }
    ],
    "fizConnectors": [
      {
        "type": "2.5mm LANC",
        "notes": "Remote control port"
      },
      {
        "type": "Serial CTRL",
        "notes": "Dedicated accessory control port"
      }
    ],
    "recordingMedia": [
      {
        "type": "CFast 2.0",
        "notes": "Dual slots"
      },
      {
        "type": "ZBlade",
        "notes": "Optional NVMe media module"
      }
    ],
    "viewfinder": [
      {
        "type": "5\" Touchscreen LCD",
        "resolution": "1920x1080",
        "notes": "Included monitor powered via control cable"
      }
    ],
    "lensMount": [
      {
        "type": "EF",
        "mount": "native",
        "notes": "Optional adapters support M, MFT, PL, and LPL"
      }
    ],
    "timecode": [
      {
        "type": "BNC (TC/Genlock)",
        "notes": "Shared LTC and tri-level sync input"
      }
    ],
    "weight_g": 1390,
    "recordingCodecs": [
      "ProRes 422 Proxy",
      "ProRes 422 LT",
      "ProRes 422",
      "ProRes 422 HQ"
    ],
    "sensorModes": [
      "Full-Frame 6K Open Gate",
      "C6K",
      "6K 2.4:1",
      "6K UHD",
      "5K 4:3",
      "C5K",
      "4K UHD"
    ],
    "resolutions": [
      "6064×4040 (Open Gate)",
      "6064×3196 (C6K)",
      "6064×2560 (6K 2.4:1)",
      "5760×3240 (6K UHD)",
      "5376×4032 (5K 4:3)",
      "5120×2700 (C5K)",
      "4096×2160 (DCI 4K)",
      "3840×2160 (UHD)",
      "2112×1188 (S16 16:9)",
      "1920×1080 (FHD)"
    ],
    "frameRates": [
      "6K 17:9: up to 60 fps",
      "4K 17:9: up to 120 fps",
      "2K 17:9: up to 240 fps"
    ]
  },
  "RED DSMC2 MONSTRO 8K VV": {
    "powerDrawWatts": 60,
    "requiredImageCircleMm": 46.31,
    "power": {
      "input": {
        "voltageRange": "11.5-32",
        "type": "LEMO 6-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": "Supports DSMC2 V-Lock battery and I/O expanders"
        },
        {
          "type": "Gold-Mount",
          "mount": "native",
          "notes": "Compatible with DSMC2 Gold Mount battery module"
        },
        {
          "type": "REDVOLT Micro-V",
          "mount": "native",
          "notes": "Dual-battery expander provides compact onboard power"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "LEMO 2-pin",
          "voltage": "14V",
          "current": "3A",
          "notes": "DC OUT from DSMC2 I/O expander"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "3A",
          "notes": "Aux PWR rail on expander"
        }
      ]
    },
    "videoOutputs": [],
    "fizConnectors": [],
    "recordingMedia": [],
    "viewfinder": [],
    "lensMount": [],
    "timecode": [],
    "weight_g": 1520,
    "recordingCodecs": [
      "REDCODE RAW (R3D)",
      "Apple ProRes 422 HQ/422/422 LT (to 2K)",
      "Avid DNxHR/HD"
    ],
    "sensorModes": [
      "Full-Frame/VV 8K"
    ],
    "resolutions": [
      "8192×4320 (8K 17:9)",
      "8192×3456 (8K 2.4:1)",
      "4096×2160 (4K)",
      "2048×1080 (2K)"
    ],
    "frameRates": [
      "8K 17:9: up to 60 fps",
      "8K 2.4:1: up to 75 fps",
      "6K 17:9: up to 100 fps",
      "4K 17:9: up to 120 fps"
    ]
  },
  "RED DSMC2 HELIUM 8K S35": {
    "powerDrawWatts": 45,
    "requiredImageCircleMm": 33.8,
    "power": {
      "input": {
        "voltageRange": "11.5-32",
        "type": "LEMO 6-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": "Supports DSMC2 V-Lock battery and I/O expanders"
        },
        {
          "type": "Gold-Mount",
          "mount": "native",
          "notes": "Compatible with DSMC2 Gold Mount battery module"
        },
        {
          "type": "REDVOLT Micro-V",
          "mount": "native",
          "notes": "Dual-battery expander provides compact onboard power"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "LEMO 2-pin",
          "voltage": "14V",
          "current": "3A",
          "notes": "DC OUT from DSMC2 I/O expander"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "3A",
          "notes": "Aux PWR rail on expander"
        }
      ]
    },
    "videoOutputs": [],
    "fizConnectors": [],
    "recordingMedia": [],
    "viewfinder": [],
    "lensMount": [],
    "timecode": [],
    "weight_g": 1520,
    "recordingCodecs": [
      "REDCODE RAW (R3D)",
      "Apple ProRes",
      "Avid DNxHR/HD"
    ],
    "sensorModes": [
      "Super 35 8K"
    ],
    "resolutions": [
      "8192×4320 (8K 17:9)",
      "8192×3456 (8K 2.4:1)",
      "4096×2160 (4K)",
      "2048×1080 (2K)"
    ],
    "frameRates": [
      "8K 17:9: up to 75 fps",
      "6K 17:9: up to 100 fps",
      "4K 17:9: up to 150 fps",
      "2K 17:9: up to 300 fps"
    ]
  },
  "RED DSMC2 GEMINI 5K S35": {
    "powerDrawWatts": 63,
    "requiredImageCircleMm": 34.5,
    "power": {
      "input": {
        "voltageRange": "11.5-32",
        "type": "LEMO 6-pin"
      },
      "batteryPlateSupport": [
        {
          "type": "V-Mount",
          "mount": "native",
          "notes": "Supports DSMC2 V-Lock battery and I/O expanders"
        },
        {
          "type": "Gold-Mount",
          "mount": "native",
          "notes": "Compatible with DSMC2 Gold Mount battery module"
        },
        {
          "type": "REDVOLT Micro-V",
          "mount": "native",
          "notes": "Dual-battery expander provides compact onboard power"
        }
      ],
      "powerDistributionOutputs": [
        {
          "type": "LEMO 2-pin",
          "voltage": "14V",
          "current": "3A",
          "notes": "DC OUT from DSMC2 I/O expander"
        },
        {
          "type": "LEMO 2-pin",
          "voltage": "12V",
          "current": "3A",
          "notes": "Aux PWR rail on expander"
        }
      ]
    },
    "videoOutputs": [],
    "fizConnectors": [],
    "recordingMedia": [],
    "viewfinder": [],
    "lensMount": [],
    "timecode": [],
    "weight_g": 1520,
    "recordingCodecs": [
      "REDCODE RAW (R3D)",
      "Apple ProRes 4444/422 HQ/422/422 LT (to 4K/2K)",
      "Avid DNxHR/HD"
    ],
    "sensorModes": [
      "Super 35 5K"
    ],
    "resolutions": [
      "5120×3000 (5K 17:9)",
      "4096×2160 (4K)",
      "2048×1080 (2K)"
    ],
    "frameRates": [
      "5K 17:9: up to 96 fps",
      "4K 17:9: up to 120 fps",
      "2K 17:9: up to 240 fps"
    ]
  },
  "None": {
    "powerDrawWatts": 0,
    "requiredImageCircleMm": null,
    "power": {
      "input": {
        "voltageRange": null,
        "type": "N/A",
        "notes": "Placeholder entry representing no camera body"
      },
      "batteryPlateSupport": [],
      "powerDistributionOutputs": []
    },
    "videoOutputs": [],
    "fizConnectors": [],
    "recordingMedia": [],
    "viewfinder": [],
    "lensMount": [],
    "timecode": [],
    "frameRates": []
  }
};

const suppressedCameras = [];

suppressedCameras.forEach(name => {
  if (Object.prototype.hasOwnProperty.call(cameraData, name)) {
    delete cameraData[name];
  }
});

if (typeof registerDevice === 'function') {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = registerDevice('cameras', cameraData);
  } else {
    registerDevice('cameras', cameraData);
  }
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = cameraData;
} else {
  globalThis.devices = globalThis.devices || {};
  globalThis.devices.cameras = cameraData;
}
})();
