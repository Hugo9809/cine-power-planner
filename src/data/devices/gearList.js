/* global registerDevice */
(() => {
const gear = {
  "viewfinders": {
    "ARRI K2.75004.0 MVF-1 Viewfinder": {
      "brand": "ARRI",
      "model": "MVF-1",
      "kNumber": "K2.75004.0",
      "compatible": [
        "Arri Alexa Mini",
        "Arri Amira"
      ],
      "isPersonalGear": false,
      "listOfOrigin": "250530_Equipmentliste_Gönrgy_Werbung.pdf"
    },
    "Sony DVF-EL200 OLED Viewfinder": {
      "brand": "Sony",
      "model": "DVF-EL200 OLED Viewfinder",
      "kNumber": "DVF-EL200",
      "compatible": [
        "Sony Venice",
        "Sony Venice 2",
        "Sony F55"
      ],
      "isPersonalGear": false,
      "listOfOrigin": "240315_Detective_von_Fock_Equpment_B-Cam_Rental.pdf"
    }
  },
  "directorMonitors": {
    "Director Monitor 17\" (SmallHD/FSI)": {
      "brand": "SmallHD/FSI",
      "model": "Director Monitor 17\"",
      "screenSizeInches": 17,
      "brightnessNits": 1000,
      "powerDrawWatts": 45,
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
          "type": "3G-SDI"
        }
      ]
    },
    "Director Monitor 13\" (SmallHD/FSI)": {
      "brand": "SmallHD/FSI",
      "model": "Director Monitor 13\"",
      "screenSizeInches": 13,
      "brightnessNits": 1000,
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
          "type": "3G-SDI"
        }
      ]
    },
    "Atomos Sumo 19SE": {
      "brand": "Atomos",
      "model": "Sumo 19SE",
      "screenSizeInches": 19,
      "brightnessNits": 1200,
      "powerDrawWatts": 75,
      "power": {
        "input": {
          "voltageRange": "12-16",
          "type": "XLR 4-pin"
        },
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        { "type": "HDMI" },
        { "type": "12G-SDI" }
      ],
      "videoOutputs": [
        { "type": "HDMI" },
        { "type": "12G-SDI" }
      ]
    },
    "SmallHD Cine 24\" 4K High-Bright Monitor": {
      "brand": "SmallHD",
      "model": "Cine 24",
      "screenSizeInches": 24,
      "brightnessNits": 1350,
      "powerDrawWatts": 110,
      "power": {
        "input": {
          "voltageRange": "12-34",
          "type": "XLR 3-pin"
        },
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        { "type": "HDMI" },
        { "type": "12G-SDI" }
      ],
      "videoOutputs": [
        { "type": "HDMI" },
        { "type": "12G-SDI" }
      ]
    },
    "Sony PVM-A170 17\" OLED": {
      "brand": "Sony",
      "model": "PVM-A170",
      "screenSizeInches": 17,
      "brightnessNits": 250,
      "powerDrawWatts": 54,
      "power": {
        "input": {
          "voltageRange": "12",
          "type": "XLR 4-pin"
        },
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        { "type": "HDMI" },
        { "type": "3G-SDI" }
      ],
      "videoOutputs": [
        { "type": "3G-SDI" }
      ]
    },
    "SmallHD 1303 HDR": {
      "brand": "SmallHD",
      "model": "1303 HDR",
      "screenSizeInches": 13,
      "brightnessNits": 1500,
      "powerDrawWatts": 39,
      "power": {
        "input": [
          { "type": "XLR" },
          { "type": "D-Tap" }
        ],
        "output": null
      },
      "notes": "Typical draw ranges from 25-39 W depending on load.",
      "wirelessTx": false,
      "videoInputs": [
        { "type": "3G-SDI" },
        { "type": "HDMI" }
      ],
      "videoOutputs": [
        { "type": "3G-SDI" },
        { "type": "HDMI" }
      ]
    },
    "SmallHD Cine 13 UHD 4K": {
      "brand": "SmallHD",
      "model": "Cine 13 UHD 4K",
      "screenSizeInches": 13.3,
      "brightnessNits": 1500,
      "powerDrawWatts": 36.7,
      "power": {
        "input": [
          { "type": "XLR 4-pin" },
          { "type": "V-Mount" },
          { "type": "Gold-Mount" }
        ],
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        { "type": "12G-SDI" },
        { "type": "HDMI" }
      ],
      "videoOutputs": [
        { "type": "12G-SDI" },
        { "type": "HDMI" }
      ]
    },
    "SEETEC P133-9HSD": {
      "brand": "SEETEC",
      "model": "P133-9HSD",
      "screenSizeInches": 13.3,
      "brightnessNits": 400,
      "powerDrawWatts": null,
      "power": {
        "input": [
          { "type": "DC" },
          { "type": "Battery Plate" }
        ],
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        { "type": "3G-SDI" },
        { "type": "HDMI" },
        { "type": "Composite" },
        { "type": "DVI-I" }
      ],
      "videoOutputs": [
        { "type": "3G-SDI" },
        { "type": "HDMI" }
      ]
    },
    "SWIT BM-U175": {
      "brand": "SWIT",
      "model": "BM-U175",
      "screenSizeInches": 17.3,
      "brightnessNits": 300,
      "powerDrawWatts": 85,
      "power": {
        "input": [
          { "type": "XLR 4-pin" },
          { "type": "AC" },
          { "type": "V-Mount" }
        ],
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        { "type": "12G-SDI", "notes": "4x" },
        { "type": "HDMI 2.0" },
        { "type": "SFP Fiber", "notes": "optional" }
      ],
      "videoOutputs": [
        { "type": "12G-SDI", "notes": "4x" }
      ]
    },
    "SWIT S-1173F": {
      "brand": "SWIT",
      "model": "S-1173F",
      "screenSizeInches": 17.3,
      "brightnessNits": null,
      "powerDrawWatts": null,
      "power": {
        "input": [
          { "type": "XLR 4-pin" },
          { "type": "V-Mount" },
          { "type": "Gold-Mount" }
        ],
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        { "type": "3G-SDI", "notes": "2x" },
        { "type": "HDMI" },
        { "type": "Y/Pb/Pr" },
        { "type": "VGA" },
        { "type": "CVBS" }
      ],
      "videoOutputs": [
        { "type": "3G-SDI", "notes": "loop" },
        { "type": "HDMI", "notes": "loop" }
      ]
    },
    "SWIT K15": {
      "brand": "SWIT",
      "model": "K15",
      "screenSizeInches": 15.4,
      "brightnessNits": 1500,
      "powerDrawWatts": null,
      "power": {
        "input": [
          { "type": "AC" },
          { "type": "XLR" },
          { "type": "V-Mount" }
        ],
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        { "type": "3G-SDI", "notes": "2x in" },
        { "type": "HDMI 1.4" },
        { "type": "USB-A" },
        { "type": "USB-C" }
      ],
      "videoOutputs": [
        { "type": "3G-SDI", "notes": "2x out" }
      ]
    },
    "SWIT K21": {
      "brand": "SWIT",
      "model": "K21",
      "screenSizeInches": 21.5,
      "brightnessNits": 1500,
      "powerDrawWatts": null,
      "power": {
        "input": [
          { "type": "AC" },
          { "type": "XLR" },
          { "type": "V-Mount" }
        ],
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        { "type": "3G-SDI", "notes": "2x in" },
        { "type": "HDMI 1.4" },
        { "type": "USB-A" },
        { "type": "USB-C" }
      ],
      "videoOutputs": [
        { "type": "3G-SDI", "notes": "2x loop" },
        { "type": "HDMI", "notes": "loop" }
      ]
    },
    "Sony PVM-X1800": {
      "brand": "Sony",
      "model": "PVM-X1800",
      "screenSizeInches": 18.4,
      "brightnessNits": 1000,
      "powerDrawWatts": 98,
      "power": {
        "input": { "type": "AC" },
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        { "type": "SDI" },
        { "type": "HDMI" }
      ],
      "videoOutputs": []
    },
    "Sony LMD-A170": {
      "brand": "Sony",
      "model": "LMD-A170",
      "screenSizeInches": 17,
      "brightnessNits": null,
      "powerDrawWatts": null,
      "power": {
        "input": [
          { "type": "AC" },
          { "type": "DC" }
        ],
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        { "type": "3G-SDI" },
        { "type": "HDMI" },
        { "type": "Composite/Component" }
      ],
      "videoOutputs": []
    },
    "Sony PVM-4300": {
      "brand": "Sony",
      "model": "PVM-4300",
      "screenSizeInches": 43,
      "brightnessNits": null,
      "powerDrawWatts": null,
      "power": {
        "input": { "type": "AC" },
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        { "type": "RGB" },
        { "type": "Composite" }
      ],
      "videoOutputs": []
    },
    "Flanders Scientific DM242": {
      "brand": "Flanders Scientific",
      "model": "DM242",
      "screenSizeInches": 24,
      "brightnessNits": 400,
      "powerDrawWatts": 35,
      "power": {
        "input": { "type": "AC" },
        "output": null
      },
      "notes": "Rated 23-35 W depending on settings.",
      "wirelessTx": false,
      "videoInputs": [
        { "type": "3G-SDI", "notes": "2x" },
        { "type": "DisplayPort" },
        { "type": "DVI-D" }
      ],
      "videoOutputs": [
        { "type": "3G-SDI", "notes": "2x" }
      ]
    },
    "Flanders Scientific DM170": {
      "brand": "Flanders Scientific",
      "model": "DM170",
      "screenSizeInches": 17,
      "brightnessNits": null,
      "powerDrawWatts": 32,
      "power": {
        "input": { "type": "AC" },
        "output": null
      },
      "notes": "Rated 21-32 W depending on configuration.",
      "wirelessTx": false,
      "videoInputs": [
        { "type": "3G-SDI" }
      ],
      "videoOutputs": []
    },
    "Flanders Scientific XMP270": {
      "brand": "Flanders Scientific",
      "model": "XMP270",
      "screenSizeInches": 26.5,
      "brightnessNits": 1000,
      "powerDrawWatts": 220,
      "power": {
        "input": [
          { "type": "XLR 4-pin", "notes": "24V DC" },
          { "type": "V-Mount", "notes": "optional plate" }
        ],
        "output": null
      },
      "notes": "Consumes approximately 35-220 W depending on HDR mode.",
      "wirelessTx": false,
      "videoInputs": [
        { "type": "12G-SDI", "notes": "4x" }
      ],
      "videoOutputs": [
        { "type": "12G-SDI", "notes": "4x loop" }
      ]
    },
    "Tarion BM120-4KS": {
      "brand": "Tarion",
      "model": "BM120-4KS",
      "screenSizeInches": 12.5,
      "brightnessNits": null,
      "powerDrawWatts": 23,
      "power": {
        "input": [
          { "voltageRange": "10-24", "type": "DC" },
          { "type": "V-Mount" }
        ],
        "output": null
      },
      "wirelessTx": false,
      "videoInputs": [
        { "type": "HDMI" },
        { "type": "SDI" },
        { "type": "VGA" }
      ],
      "videoOutputs": [
        { "type": "HDMI" },
        { "type": "SDI" },
        { "type": "VGA" }
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
  "iosVideo": {
    "Teradek Serv": {
      "powerDrawWatts": 9,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [],
      "frequency": "2.4 GHz / 5 GHz Wi-Fi",
      "latencyMs": "< 60ms",
      "power": {
        "input": [
          {
            "type": "LEMO 2-pin",
            "notes": "6-28V"
          },
          {
            "type": "D-Tap"
          }
        ]
      },
      "notes": "Streams to iOS devices for on-set monitoring"
    },
    "Teradek Serv + Link": {
      "powerDrawWatts": 9,
      "videoInputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "3G-SDI"
        }
      ],
      "videoOutputs": [],
      "frequency": "2.4 GHz / 5 GHz Wi-Fi",
      "latencyMs": "< 60ms",
      "power": {
        "input": [
          {
            "type": "LEMO 2-pin",
            "notes": "6-28V"
          },
          {
            "type": "D-Tap"
          }
        ]
      },
      "notes": "Streams to iOS devices for on-set monitoring; includes Link access point"
    }
  },
  "accessories": {
    "powerPlates": {
      "ARRI B-Mount Battery Adapter": {
        "brand": "ARRI",
        "kNumber": "K2.0023751",
        "mount": "B-Mount"
      },
      "Generic V-Mount Plate": {
        "mount": "V-Mount"
      }
    },
    "cameraSupport": {
      "ARRI CBP-3 Compact Bridge Plate": {
        "brand": "ARRI",
        "kNumber": "K2.0019580",
        "rodStandard": "15mm LWS / 19mm Studio"
      },
      "ARRI SAB-2 Side Accessory Bracket": {
        "brand": "ARRI",
        "kNumber": "K2.0014088",
        "dimensionsMm": "110 x 100 x 60"
      },
      "ARRI VEB-3 Viewfinder Extension Bracket": {
        "brand": "ARRI",
        "kNumber": "K2.74000.0"
      },
      "ARRI Dovetail Plate": {
        "brand": "ARRI",
        "kNumber": "K2.0043086"
      },
      "ARRI Top Plate (FS7II/FX9)": {
        "brand": "ARRI",
        "kNumber": "K2.0034691",
        "compatible": [
          "Sony FS7 II",
          "Sony FX9"
        ],
        "rodStandard": "15mm LWS"
      },
      "ARRI Base Plate (FS7II/FX9)": {
        "brand": "ARRI",
        "kNumber": "K2.0035830",
        "compatible": [
          "Sony FS7 II",
          "Sony FX9"
        ]
      },
      "ARRI Lens Adapter Support LAS-1": {
        "brand": "ARRI",
        "kNumber": "K2.0003899",
        "rodStandard": "15mm"
      },
      "ARRI 15mm LWS Rod Console": {
        "brand": "ARRI",
        "kNumber": "K2.65264.0",
        "rodStandard": "15mm LWS"
      },
      "ARRI Support Rods 240mm/15mm": {
        "brand": "ARRI",
        "kNumber": "K2.66253.0",
        "lengthMm": 240,
        "diameterMm": 15,
        "rodStandard": "15mm"
      },
      "ARRI Side Bracket Left (FS7II/FX9)": {
        "brand": "ARRI",
        "kNumber": "K2.0034727",
        "compatible": [
          "Sony FS7 II",
          "Sony FX9"
        ]
      },
      "ARRI Side Bracket Right (FS7II/FX9)": {
        "brand": "ARRI",
        "kNumber": "K2.0034709",
        "compatible": [
          "Sony FS7 II",
          "Sony FX9"
        ]
      },
      "ARRI E- to PL-Mount Support (Vocas)": {
        "brand": "ARRI",
        "kNumber": "K2.0034700"
      },
      "ARRI Camera Center Handle CCH-4": {
        "brand": "ARRI",
        "kNumber": "K2.0017270"
      },
      "ARRI Sliding Adapter (CCH-4)": {
        "brand": "ARRI",
        "kNumber": "K2.0019282"
      },
      "ARRI Rod Mounting Bracket RMB-3": {
        "brand": "ARRI",
        "kNumber": "K2.0006186",
        "rodStandard": "19mm (15mm via reduction insert)"
      },
      "ARRI 15mm Reduction Insert": {
        "brand": "ARRI",
        "kNumber": "K2.66255.0",
        "rodStandard": "15mm"
      },
      "ARRI Viewfinder Bracket (FS7II/FX9)": {
        "brand": "ARRI",
        "kNumber": "K2.0034657",
        "compatible": [
          "Sony FS7 II",
          "Sony FX9"
        ]
      },
      "ARRI Mini Side Bracket MSB-1": {
        "brand": "ARRI",
        "kNumber": "K2.0014957"
      },
      "ARRI KK.0037820 Handle Extension Set": {
        "brand": "ARRI",
        "kNumber": "KK.0037820"
      },
      "ARRI Video Transmitter Bracket": {
        "brand": "ARRI",
        "kNumber": "K2.0033676"
      },
      "ARRI Alexa Set for Ronin 2": {
        "brand": "ARRI",
        "kNumber": "K0.0049866"
      },
      "ARRI Camera Side Bracket CSB-1L": {
        "brand": "ARRI",
        "kNumber": "K2.0033573"
      },
      "ARRI Camera Side Bracket CSB-1R": {
        "brand": "ARRI",
        "kNumber": "K2.0033571"
      },
      "ARRI Rod Mounting Bracket RMB-7": {
        "brand": "ARRI",
        "kNumber": "K2.0023907"
      },
      "ARRI Stabilizer Adapter Mount SAM-6": {
        "brand": "ARRI",
        "kNumber": "K2.0024508"
      },
      "ARRI Stabilizer Adapter Mount SAM-9": {
        "brand": "ARRI",
        "kNumber": "K2.0041949"
      },
      "ARRI Viewfinder Adapter VFA-3": {
        "brand": "ARRI",
        "kNumber": "K2.0048079"
      },
      "ARRI Viewfinder Adapter VFA-4": {
        "brand": "ARRI",
        "kNumber": "K2.0048510"
      },
      "ARRI Bridge Plate BP-8": {
        "brand": "ARRI",
        "kNumber": "K2.0031436",
        "rodStandard": "19mm Studio"
      },
      "ARRI Bridge Plate BP-9": {
        "brand": "ARRI",
        "kNumber": "K2.0031436",
        "rodStandard": "15mm Studio"
      },
      "ARRI Bridge Plate Adapter BPA-5": {
        "brand": "ARRI",
        "kNumber": "K2.0017138"
      },
      "ARRI Bottom Dovetail Plate 300mm": {
        "brand": "ARRI",
        "kNumber": "K2.0015896",
        "lengthMm": 300,
        "rodStandard": "19mm Studio"
      },
      "ARRI Rosette Adapters RA-6": {
        "brand": "ARRI",
        "kNumber": "K2.0024574"
      },
      "ARRI K2.0019797 HEX-3": {
        "brand": "ARRI",
        "kNumber": "K2.0019797"
      },
      "ARRI Handle Extension HEX-4": {
        "brand": "ARRI",
        "kNumber": "K2.0019798"
      },
      "ARRI Viewfinder Adapter VFA-2": {
        "brand": "ARRI",
        "kNumber": "K2.0001222"
      },
      "ARRI Heated Eyecup HE-7": {
        "brand": "ARRI",
        "kNumber": "K2.0003898"
      },
      "SHAPE Telescopic Handle ARRI Rosette Kit 12\"": {
        "brand": "SHAPE"
      }
    },
    "matteboxes": {
      "ARRI LMB 4x5 Clamp-On (3-Stage)": {
        "brand": "ARRI",
        "model": "LMB 4x5 Clamp-On (3-Stage)",
        "kNumber": "KK.0015175",
        "stages": 3,
        "type": "Clamp-On",
        "traySize": "4x5.65",
        "compatible": "Requires LMB 4x5 clamp adapters (Ø80–162 mm incl. 156 mm adapter).",
        "topFlag": true,
        "sideFlags": false,
        "provenance": ":contentReference[oaicite:23]{index=23}"
      },
      "ARRI LMB 4x5 Pro Set": {
        "brand": "ARRI",
        "model": "LMB 4x5 Pro Set",
        "kNumber": "KK.0015177",
        "stages": 3,
        "type": "15mm LWS swing-away",
        "traySize": "4x5.65",
        "compatible": "Clamp-on via adapters Ø80–162 mm (plus Ø156); includes LWS console; side + top flags.",
        "topFlag": true,
        "sideFlags": true,
        "provenance": ":contentReference[oaicite:24]{index=24}"
      },
      "ARRI LMB 4x5 15mm LWS Set 3-Stage": {
        "brand": "ARRI",
        "model": "LMB 4x5 15mm LWS Set 3-Stage",
        "kNumber": "KK.0015176",
        "stages": 3,
        "type": "15mm LWS",
        "traySize": "4x5.65",
        "compatible": "Clamp-on diameters via adapters Ø80–162 mm (plus Ø156); includes LWS console, Tilt & Flex.",
        "topFlag": true,
        "sideFlags": false,
        "provenance": ":contentReference[oaicite:25]{index=25}"
      },
      "ARRI LMB 19mm Studio Rod Adapter": {
        "brand": "ARRI",
        "model": "LMB 19mm Studio Rod Adapter",
        "kNumber": "K2.0013432",
        "type": "Rod adapter",
        "compatible": "LMB 4x5 15mm LWS Console; LMB 4x5 Swing Away Tilt Module; LMB 6x6 Clamp Adapter 143mm.",
        "provenance": ":contentReference[oaicite:26]{index=26}"
      },
      "ARRI LMB 4x5 / LMB-6 Tray Catcher": {
        "brand": "ARRI",
        "model": "LMB 4x5 / LMB-6 Tray Catcher",
        "kNumber": "K2.66202.0",
        "type": "Accessory",
        "compatible": [
          "LMB 4x5",
          "LMB-6"
        ],
        "traySize": "Accessory only (tray catcher)",
        "topFlag": false,
        "sideFlags": false,
        "provenance": ":contentReference[oaicite:27]{index=27}"
      },
      "ARRI LMB 4x5 Side Flags": {
        "brand": "ARRI",
        "model": "LMB 4x5 Side Flags",
        "kNumber": "K2.0013750",
        "type": "Accessory",
        "compatible": "For LMB 4x5 (via Flag Holders K2.0013825).",
        "topFlag": false,
        "sideFlags": true,
        "provenance": ":contentReference[oaicite:28]{index=28}"
      },
      "ARRI LMB Flag Holders": {
        "brand": "ARRI",
        "model": "LMB Flag Holders",
        "kNumber": "K2.0013825",
        "type": "Accessory",
        "compatible": "Mount on top, bottom, or sides of LMB 4x5 & LMB 6x6; top of LMB-25 & LMB-6.",
        "topFlag": true,
        "sideFlags": true,
        "provenance": ":contentReference[oaicite:29]{index=29}"
      },
      "ARRI LMB 4x5 Set of Mattes spherical": {
        "brand": "ARRI",
        "model": "LMB 4x5 Set of Mattes spherical",
        "kNumber": "K2.0000069",
        "type": "Accessory",
        "compatible": "LMB 4x5/LMB-25",
        "provenance": ":contentReference[oaicite:30]{index=30}"
      },
      "ARRI LMB Accessory Adapter": {
        "brand": "ARRI",
        "model": "LMB Accessory Adapter",
        "kNumber": "K2.0013014",
        "type": "Accessory",
        "compatible": "LMB 4x5 / LMB 6x6 / LMB-25 / LMB-6; 3/8\"-16 accessory mount with sliding shoe.",
        "provenance": ":contentReference[oaicite:31]{index=31}"
      },
      "ARRI LMB 4x5 Clamp Adapter Set Pro": {
        "brand": "ARRI",
        "model": "LMB 4x5 Clamp Adapter Set Pro",
        "kNumber": "KK.0015133",
        "type": "Accessory",
        "compatible": "Set of clamp adapters covering Ø80–162 mm (+ Ø156).",
        "provenance": ":contentReference[oaicite:32]{index=32}"
      },
      "ARRI Anti-Reflection Frame 4x5.65": {
        "brand": "ARRI",
        "model": "Anti-Reflection Frame 4x5.65",
        "kNumber": "K2.0008133",
        "type": "Frame",
        "traySize": "4x5.65",
        "compatible": "Fits LMB 4x5 / LMB-25 / LMB-15 / LMB-5 (uses 2-stage slot).",
        "provenance": ":contentReference[oaicite:33]{index=33}"
      },
      "ARRI Diopter Frame 138mm": {
        "brand": "ARRI",
        "model": "Diopter Frame 138mm",
        "kNumber": "K2.0013740",
        "type": "Diopter frame",
        "diameterMm": 138,
        "compatible": "LMB 4x5 / LMB-25; occupies width of two 4x5.65 frames; fits 2- or 3-filter stage.",
        "provenance": ":contentReference[oaicite:34]{index=34}"
      },
      "ARRI LMB 6x6": {
        "brand": "ARRI",
        "model": "LMB 6x6",
        "stages": 2,
        "type": "Clamp-on / 15mm / 19mm studio (modular)",
        "traySize": "6.6x6.6",
        "compatible": "Clamp adapters 95–165 mm; expandable to 3 stages via extra stage.",
        "topFlag": true,
        "sideFlags": true,
        "provenance": ":contentReference[oaicite:35]{index=35}"
      },
      "ARRI MMB-2": {
        "brand": "ARRI",
        "model": "MMB-2",
        "kNumber": "KK.0005749 (114 Clamp-On Set)",
        "stages": 2,
        "type": "Clamp-on / 15mm LWS (via console)",
        "traySize": "4x5.65 / 4x4 (rear rotatable)",
        "diameterMm": 114,
        "compatible": "Clip-on to 114 mm lenses; 15mm LWS via console.",
        "topFlag": true,
        "sideFlags": "available",
        "provenance": ":contentReference[oaicite:36]{index=36}"
      },
      "Tilta Mirage (MB-T16, 95mm system)": {
        "brand": "Tilta",
        "model": "Mirage (MB-T16, 95mm system)",
        "stages": 1,
        "type": "Clamp-On",
        "traySize": "4x5.65 (optional front trays) / 95mm round",
        "diameterMm": 95,
        "compatible": "95 mm cine; thread adapters 67/72/77/82 mm; optional 4x5.65 stackable trays.",
        "topFlag": "optional",
        "sideFlags": "optional",
        "provenance": ":contentReference[oaicite:37]{index=37}"
      },
      "Tilta MB-T12 (Carbon Fiber 4x5.65)": {
        "brand": "Tilta",
        "model": "MB-T12 (Carbon Fiber 4x5.65)",
        "kNumber": "MB-T12",
        "stages": 3,
        "type": "Clamp-On / 15mm LWS",
        "traySize": "4x5.65",
        "diameterMm": 134,
        "compatible": "Includes clamp backs for 134/114/110/95/80 mm.",
        "topFlag": true,
        "sideFlags": "optional",
        "provenance": ":contentReference[oaicite:38]{index=38}"
      },
      "Tilta MB12": {
        "brand": "Tilta",
        "model": "MB12",
        "traySize": "4x5.65",
        "topFlag": true,
        "sideFlags": false,
        "note": "Unverified legacy model ‘MB12’ — likely Tilta ‘MB-12’ older 4x5.65 unit, but no current primary page found.",
        "provenance": "Equipment list: 'incl. Top Flag + 80mm rear' [oai_citation:3‡250602_Equipmentliste_Gönrgy_Werbung.pdf](file-service://file-NLioL2MfohXGobdBCXVx63)"
      },
      "Bright Tangerine Misfit Six Core": {
        "brand": "Bright Tangerine",
        "model": "Misfit Six Core",
        "stages": 2,
        "type": "Clamp-on / rod via bracket",
        "traySize": "6.6x6.6 (also supports 4x5.65)",
        "compatible": "Frame Safe clamp adapters (typ. 114–143 mm) + 15/19 mm via bracket; upgradeable to 3-stage.",
        "topFlag": "optional",
        "sideFlags": "optional",
        "provenance": ":contentReference[oaicite:39]{index=39}"
      },
      "Wooden Camera UMB-1 Universal Mattebox (Pro)": {
        "brand": "Wooden Camera",
        "model": "UMB-1 Universal Mattebox (Pro)",
        "kNumber": "SKU 202100",
        "stages": 2,
        "type": "15mm LWS (swing-away)",
        "traySize": "4x5.65 (2 rotating + optional 3rd stage)",
        "diameterMm": 143,
        "compatible": "Optional third stage; includes top, side, bottom flags; 143 mm opening with ARRI-style bellows 114 mm.",
        "topFlag": true,
        "sideFlags": true,
        "provenance": ":contentReference[oaicite:40]{index=40}"
      },
      "Vocas MB-216": {
        "brand": "Vocas",
        "model": "MB-216",
        "kNumber": "0200-0216",
        "stages": 2,
        "type": "Clip-on / 15mm LWS capable",
        "traySize": "4x4 (supports 3x3 to 4x6)",
        "diameterMm": 114,
        "compatible": "Quick-Lock for 114 mm; 1 rotatable + 1 fixed 4x4.",
        "topFlag": "optional",
        "sideFlags": "optional",
        "provenance": ":contentReference[oaicite:41]{index=41}"
      },
      "SmallRig Mini Matte Box Pro (3680)": {
        "brand": "SmallRig",
        "model": "Mini Matte Box Pro (3680)",
        "kNumber": "3680",
        "stages": 2,
        "type": "Clamp-on",
        "traySize": "4x5.65",
        "diameterMm": 95,
        "compatible": "Includes 67/72/77/82–95 mm rings; supports round filters ≤92.5 mm.",
        "topFlag": true,
        "sideFlags": true,
        "provenance": ":contentReference[oaicite:42]{index=42}"
      },
      "SmallRig Mini Matte Box Lite (3575 / 3196)": {
        "brand": "SmallRig",
        "model": "Mini Matte Box Lite (3575)",
        "kNumber": "3575",
        "stages": 1,
        "type": "Clamp-on",
        "traySize": "4x5.65 / 4x4",
        "diameterMm": 95,
        "compatible": "Adapter rings for 67/72/77/82 mm; multiple plug-in + circular filters.",
        "topFlag": true,
        "sideFlags": false,
        "provenance": ":contentReference[oaicite:43]{index=43}"
      },
      "NiSi Cinema C5": {
        "brand": "NiSi",
        "model": "Cinema C5",
        "stages": 2,
        "type": "Clamp-on",
        "traySize": "4x5.65 (side) / 4x4 (top)",
        "diameterMm": 95,
        "compatible": "Adapter rings 67/72/77/82 mm included in kits; top flag included.",
        "topFlag": true,
        "sideFlags": false,
        "provenance": ":contentReference[oaicite:44]{index=44}"
      }
    },
    "filters": {
      "ARRI Rota Pola Filter Frame": {
        "brand": "ARRI",
        "kNumber": "K2.0009434"
      },
      "ARRI Rota Pola Filter Frame (6x6)": {
        "brand": "ARRI",
        "kNumber": "K2.0017086"
      },
      "Tilta 95mm Polarizer Filter for Tilta Mirage": {
        "brand": "Tilta",
        "kNumber": "MB-T16-POL"
      },
      "Schneider CF DIOPTER FULL GEN2": {
        "brand": "Schneider",
        "kNumber": "68-000xxx"
      }
    },
    "rigging": {
      "Manfrotto 026 Lite-Tite": {
        "brand": "Manfrotto"
      },
      "Manfrotto 244N Friction Arm": {
        "brand": "Manfrotto"
      },
      "ULCS Bracket 1/4 to 1/4": {
        "brand": "ULCS"
      },
      "ULCS Bracket 3/8 to 1/4": {
        "brand": "ULCS"
      }
    },
    "batteries": {
      "Sony NP-F970": {
        "capacity": 47,
        "mount_type": "NP-F",
        "weight_g": 225,
        "pinA": 6,
        "pinV": 7.2
      },
      "Sony NP-F750": {
        "capacity": 33,
        "mount_type": "NP-F",
        "weight_g": 220,
        "pinA": 4,
        "pinV": 7.2
      },
      "Sony NP-F550": {
        "capacity": 16,
        "mount_type": "NP-F",
        "weight_g": 110,
        "pinA": 2,
        "pinV": 7.2
      }
    },
    "cables": {
      "power": {
        "D-Tap to LEMO 2-pin": {
          "from": "D-Tap",
          "to": "LEMO 2-pin"
        },
        "D-Tap Splitter 3-way": {
          "from": "D-Tap",
          "to": [
            "D-Tap",
            "D-Tap",
            "D-Tap"
          ]
        },
        "D-Tap to miniXLR (0.3 m)": {
          "from": "D-Tap",
          "to": "miniXLR",
          "lengthM": 0.3
        }
      },
      "video": {
        "BNC SDI Cable": {
          "type": "3G-SDI"
        },
        "HDMI Cable": {
          "type": "HDMI"
        },
        "Ultraslim BNC Cable 0.3 m": {
          "type": "3G-SDI",
          "lengthM": 0.3
        },
        "Ultraslim BNC Cable 0.5 m": {
          "type": "3G-SDI",
          "lengthM": 0.5
        },
        "Ultraslim HDMI 0.5 m": {
          "type": "HDMI",
          "lengthM": 0.5
        },
        "BNC Cable 0.5 m": {
          "type": "3G-SDI",
          "lengthM": 0.5
        },
        "BNC Cable 1 m": {
          "type": "3G-SDI",
          "lengthM": 1
        },
        "BNC Cable 5 m": {
          "type": "3G-SDI",
          "lengthM": 5
        },
        "BNC Cable 10 m": {
          "type": "3G-SDI",
          "lengthM": 10
        },
        "BNC Drum 25 m": {
          "type": "3G-SDI",
          "lengthM": 25,
          "notes": "drum"
        }
      },
      "fiz": {
        "LBUS to LBUS": {
          "brand": "ARRI",
          "from": "LBUS (LEMO 4-pin)",
          "to": "LBUS (LEMO 4-pin)",
          "connectors": [
            "LEMO 4-pin",
            "LEMO 4-pin"
          ],
          "orientation": "straight",
          "type": "LBUS cable",
          "useCase": [
            "Lens control daisy-chain"
          ]
        },
        "LBUS to LBUS 0,2m": {
          "brand": "ARRI",
          "kNumber": "K2.0006749",
          "from": "LBUS (LEMO 4-pin)",
          "to": "LBUS (LEMO 4-pin)",
          "connectors": [
            "LEMO 4-pin",
            "LEMO 4-pin"
          ],
          "lengthM": 0.2,
          "orientation": "straight",
          "type": "LBUS cable",
          "useCase": [
            "Lens control daisy-chain"
          ]
        },
        "LBUS to LBUS 0,3m": {
          "brand": "ARRI",
          "kNumber": "K2.0006750",
          "from": "LBUS (LEMO 4-pin)",
          "to": "LBUS (LEMO 4-pin)",
          "connectors": [
            "LEMO 4-pin",
            "LEMO 4-pin"
          ],
          "lengthM": 0.3,
          "orientation": "straight",
          "type": "LBUS cable",
          "useCase": [
            "Lens control daisy-chain"
          ]
        },
        "LBUS to LBUS 0,4m": {
          "from": "LBUS (LEMO 4-pin)",
          "to": "LBUS (LEMO 4-pin)",
          "lengthM": 0.4
        },
        "LBUS to LBUS 0,5m": {
          "brand": "ARRI",
          "kNumber": "K2.0006751",
          "from": "LBUS (LEMO 4-pin)",
          "to": "LBUS (LEMO 4-pin)",
          "connectors": [
            "LEMO 4-pin",
            "LEMO 4-pin"
          ],
          "lengthM": 0.5,
          "orientation": "straight",
          "type": "LBUS cable",
          "useCase": [
            "Lens control daisy-chain"
          ]
        },
        "ARRI Right-Angle LBUS to LBUS 0,6m": {
          "brand": "ARRI",
          "kNumber": "K2.0013040",
          "connectors": [
            "LEMO 4-pin RA",
            "LEMO 4-pin RA"
          ],
          "lengthM": 0.6,
          "orientation": "right-angle",
          "type": "LBUS cable",
          "useCase": [
            "Lens control daisy-chain"
          ]
        },
        "Cable UDM – SERIAL (7p) 1,5m": {
          "brand": "ARRI",
          "kNumber": "K2.65144.0",
          "from": "Serial (LEMO 7-pin)",
          "to": "Serial",
          "lengthM": 1.5
        },
        "Cable UDM – SERIAL (4p) 0,5m": {
          "brand": "ARRI",
          "kNumber": "K2.0025324",
          "from": "SERIAL (LEMO 4-pin)",
          "to": "Serial",
          "lengthM": 0.5
        },
        "Cable CAM (7-pin) – LBUS 0,3m": {
          "brand": "ARRI",
          "kNumber": "K2.0025027",
          "from": "CAM (7-pin)",
          "to": "LBUS (LEMO 4-pin)",
          "lengthM": 0.3,
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Power",
            "Control"
          ],
          "compatibleControllers": [
            "Arri RIA-1",
            "Arri cforce mini RF"
          ],
          "compatibleCameras": [
            "Arri Alexa 35",
            "Arri Alexa Mini LF"
          ]
        },
        "Cable CAM (7-pin) – LBUS 0,5m": {
          "brand": "ARRI",
          "kNumber": "K2.0015760",
          "from": "CAM (7-pin)",
          "to": "LBUS (LEMO 4-pin)",
          "lengthM": 0.5,
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Power",
            "Control"
          ],
          "compatibleControllers": [
            "Arri RIA-1",
            "Arri cforce mini RF"
          ],
          "compatibleCameras": [
            "Arri Alexa 35",
            "Arri Alexa Mini LF"
          ]
        },
        "Cable CAM (7-pin) – EXT (16-pin) 0,8m": {
          "brand": "ARRI",
          "kNumber": "K2.0015755",
          "from": "CAM (7-pin)",
          "to": "EXT (16-pin)",
          "lengthM": 0.8,
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Power",
            "Control"
          ],
          "compatibleControllers": [
            "Arri RIA-1",
            "Arri cforce mini RF"
          ],
          "compatibleCameras": [
            "Arri Alexa Classic EV",
            "Arri Alexa XT EV",
            "Arri Alexa SXT EV"
          ],
          "notes": "Only for EV models, not ALEXA Plus."
        },
        "Cable CAM (7-pin) – EXT (6-pin) 0,6m": {
          "brand": "ARRI",
          "kNumber": "K2.0015756",
          "from": "CAM (7-pin)",
          "to": "EXT (6-pin)",
          "lengthM": 0.6,
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Power",
            "Control"
          ],
          "compatibleControllers": [
            "Arri RIA-1",
            "Arri cforce mini RF"
          ],
          "compatibleCameras": [
            "Arri Amira",
            "Arri Alexa Mini"
          ],
          "notes": "For ALEXA Mini LF, use CAM-to-LBUS instead."
        },
        "Cable CAM (7-pin) – LCS (5-pin) 0,8m": {
          "brand": "ARRI",
          "kNumber": "K2.0034580",
          "from": "CAM (7-pin)",
          "to": "LCS (5-pin)",
          "lengthM": 0.8,
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Power",
            "Control"
          ],
          "compatibleControllers": [
            "Arri RIA-1",
            "Arri cforce mini RF"
          ],
          "compatibleCameras": [
            "Arri Alexa Plus",
            "Arri Alexa XT Plus",
            "Arri Alexa SXT Plus",
            "Arri Alexa LF",
            "Arri Alexa 65"
          ]
        },
        "Cable CAM (7-pin) – RED CTRL/D-Tap 0,6m": {
          "brand": "ARRI",
          "kNumber": "K2.0015758",
          "connectors": [
            "CAM (7-pin)",
            "RED CTRL + D-Tap"
          ],
          "lengthM": 0.6,
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Power",
            "Control"
          ],
          "compatibleControllers": [
            "Arri RIA-1",
            "Arri cforce mini RF"
          ],
          "compatibleCameras": [
            "RED DSMC2 HELIUM 8K S35",
            "RED DSMC2 MONSTRO 8K VV",
            "RED Epic-W (Helium 8K S35)",
            "RED Scarlet-W (Dragon Sensor)",
            "RED Weapon (Helium 8K S35)",
            "RED Weapon (Helium 8K VV)",
            "RED Komodo 6k",
            "RED Komodo X",
            "RED V-RAPTOR 8K S35",
            "RED V-RAPTOR 8K VV",
            "RED V-RAPTOR X 8K S35",
            "RED V-RAPTOR X 8K VV",
            "RED V-RAPTOR XL 8K VV",
            "RED V-RAPTOR XL 8K S35",
            "RED V-RAPTOR X XL 8K S35",
            "RED V-RAPTOR X XL 8K VV"
          ],
          "notes": "Supports run/stop/tally on WCU-4 & Hi-5. For DSMC3 (Komodo/V-RAPTOR), use module or breakout from 9p Lemo EXT to RED CTRL. Hi-5 advanced control requires RED Camera Control License."
        },
        "Cable CAM (7-pin) – LANC/D-Tap 0,6m": {
          "brand": "ARRI",
          "kNumber": "K2.0015757",
          "connectors": [
            "CAM (7-pin)",
            "LANC + D-Tap"
          ],
          "lengthM": 0.6,
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Power"
          ],
          "compatibleControllers": [
            "Arri RIA-1",
            "Arri cforce mini RF"
          ],
          "compatibleCameras": [
            "Sony PXW-FX9",
            "Sony PXW-FS7",
            "Sony FX6",
            "Sony FS5",
            "Sony PXW-Z90",
            "Sony HXR-NX80",
            "Sony HXR-NX5",
            "Sony HXR-NX5R",
            "Canon EOS C300 Mark I",
            "Canon EOS C300 Mark II",
            "Canon EOS C300 Mark III",
            "Canon EOS C500 Mark I",
            "Canon EOS C500 Mark II",
            "Canon EOS C400",
            "Canon XF705",
            "Canon XF405",
            "Canon XF400",
            "Canon XF305",
            "Blackmagic URSA Mini Pro"
          ],
          "notes": "Requires a 2.5 mm LANC port (Remote A). Provides run/stop but no advanced camera control. Not compatible with Sony FX3 (uses Multi/Micro USB remote)."
        },
        "Cable CAM (7-pin) – Sony Venice/F55 CTRL/D-Tap 0,6m": {
          "brand": "ARRI",
          "kNumber": "K2.0018814",
          "connectors": [
            "CAM (7-pin)",
            "Sony CTRL + D-Tap"
          ],
          "lengthM": 0.6,
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Power"
          ],
          "compatibleControllers": [
            "Arri RIA-1",
            "Arri cforce mini RF"
          ],
          "compatibleCameras": [
            "Sony F5",
            "Sony F55",
            "Sony Venice"
          ],
          "notes": "Not compatible with Sony Venice 2 or Varicam."
        },
        "Cable CAM (7-pin) – Sony Remote (8-pin)/D-Tap 0,8m": {
          "brand": "ARRI",
          "kNumber": "K2.0047268",
          "connectors": [
            "CAM (7-pin)",
            "Sony Remote (8-pin) + D-Tap"
          ],
          "lengthM": 0.8,
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Power",
            "Control"
          ],
          "compatibleControllers": [
            "Arri RIA-1",
            "Arri cforce mini RF"
          ],
          "compatibleCameras": [
            "Sony Venice",
            "Sony Venice 2"
          ],
          "notes": "Run/stop/tally on both; additional Hi-5 camera control with Sony Camera Control License."
        },
        "Cable CAM (7-pin) – RS (3-pin) 0,3m": {
          "brand": "ARRI",
          "kNumber": "K2.0015754",
          "connectors": [
            "CAM (7-pin)",
            "ARRI RS (3-pin)"
          ],
          "lengthM": 0.3,
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Tally",
            "Power"
          ],
          "compatibleControllers": [
            "Arri RIA-1",
            "Arri cforce mini RF"
          ],
          "compatibleCameras": [
            "Arri Alexa 35",
            "Arri Alexa Mini LF",
            "Arri Alexa Mini",
            "Arri Amira",
            "Arri Alexa Classic EV",
            "Arri Alexa XT EV",
            "Arri Alexa SXT EV",
            "Arri Alexa Plus",
            "Arri Alexa XT Plus",
            "Arri Alexa SXT Plus",
            "Arri Alexa LF",
            "Arri Alexa 65"
          ],
          "notes": "Run/stop/tally on ARRI cameras with 3p Fischer. Can also power RIA-1 without a camera connection."
        },
        "Cable CAM (7-pin) – D-Tap 0,5m": {
          "brand": "ARRI",
          "kNumber": "K2.0018813",
          "connectors": [
            "CAM (7-pin)",
            "D-Tap"
          ],
          "lengthM": 0.5,
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleControllers": [
            "Arri RIA-1",
            "Arri cforce mini RF"
          ],
          "notes": "Use to power RIA-1 when no compatible camera control cable exists."
        },
        "Cable CAM (7-pin,f) – CAM (7-pin,m) 0,3m": {
          "brand": "ARRI",
          "kNumber": "K2.0023832",
          "connectors": [
            "CAM (7-pin,f)",
            "CAM (7-pin,m)"
          ],
          "lengthM": 0.3,
          "orientation": "straight",
          "useCase": [],
          "compatibleControllers": [
            "Arri RIA-1",
            "Arri cforce mini RF"
          ],
          "notes": "Extension for any CAM cable."
        },
        "Cable CAM (7-pin) – ENG (12-pin) 0,3m": {
          "brand": "ARRI",
          "kNumber": "K2.0015759",
          "connectors": [
            "CAM (7-pin)",
            "ENG (12-pin)"
          ],
          "lengthM": 0.3,
          "orientation": "straight",
          "useCase": [],
          "compatibleControllers": [
            "Arri RIA-1",
            "Arri cforce mini RF"
          ],
          "compatibleCameras": [
            "Sony Venice (LENS)",
            "Sony Venice 2 (LENS)"
          ],
          "notes": "Injects lens metadata via LENS connector."
        },
        "Cable CineTape – SERIAL (4p) 0,8m": {
          "brand": "ARRI",
          "kNumber": "K2.0044396",
          "from": "SERIAL (LEMO 4-pin)",
          "to": "Serial",
          "lengthM": 0.8
        },
        "Cine RT to ARRI RIA-1 / ALEXA 35": {
          "brand": "Focusbug",
          "from": "SERIAL (LEMO 4-pin)",
          "to": "Serial",
          "lengthM": 0.8
        },
        "D-Tap to Lemo-2-pin Cable 0,3m": {
          "lengthM": 0.3,
          "connectors": [
            "D-Tap",
            "LEMO 2-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ]
        },
        "D-Tap to Lemo-2-pin Cable 0,5m": {
          "lengthM": 0.5,
          "connectors": [
            "D-Tap",
            "LEMO 2-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ]
        },
        "ultra slim 3G-SDI BNC cable 0,3m": {
          "lengthM": 0.3,
          "connectors": [
            "BNC",
            "BNC"
          ],
          "orientation": "straight",
          "type": "3G-SDI",
          "notes": "ultra slim",
          "useCase": [
            "Video"
          ]
        },
        "ultra slim 3G-SDI BNC cable 0,5m": {
          "lengthM": 0.5,
          "connectors": [
            "BNC",
            "BNC"
          ],
          "orientation": "straight",
          "type": "3G-SDI",
          "notes": "ultra slim",
          "useCase": [
            "Video"
          ]
        },
        "Cable CAM (10-pin) – EXT (7-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.0007730",
          "lengthM": 0.5,
          "connectors": [
            "CAM (10-pin)",
            "EXT (7-pin)"
          ],
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Tally"
          ],
          "compatibleControllers": [
            "SMC-1",
            "EMC-1",
            "AMC-1"
          ],
          "compatibleCameras": [
            "ALEXA Mini",
            "ALEXA Mini LF"
          ]
        },
        "Cable CAM (10-pin) – RS (3-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.0001606",
          "lengthM": 0.5,
          "connectors": [
            "CAM (10-pin)",
            "ARRI RS (3-pin)"
          ],
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Tally"
          ],
          "compatibleControllers": [
            "SMC-1",
            "EMC-1",
            "AMC-1"
          ],
          "compatibleCameras": [
            "ALEXA",
            "AMIRA"
          ]
        },
        "Cable CAM (10-pin) – D-Tap": {
          "brand": "ARRI",
          "kNumber": "K2.0002682",
          "lengthM": 0.5,
          "connectors": [
            "CAM (10-pin)",
            "D-Tap"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleControllers": [
            "SMC-1",
            "EMC-1",
            "AMC-1"
          ]
        },
        "Cable CAM (10-pin) – LANC/D-Tap": {
          "brand": "ARRI",
          "kNumber": "K2.0001999",
          "lengthM": 0.5,
          "connectors": [
            "CAM (10-pin)",
            "LANC + D-Tap"
          ],
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Tally",
            "Power"
          ],
          "compatibleControllers": [
            "SMC-1",
            "EMC-1",
            "AMC-1"
          ],
          "compatibleCameras": [
            "Canon C300/500",
            "Sony PXW-FS7"
          ]
        },
        "Cable CAM (10-pin) – Sony F5/55": {
          "brand": "ARRI",
          "kNumber": "K2.0001997",
          "lengthM": 0.5,
          "connectors": [
            "CAM (10-pin)",
            "Sony Remote"
          ],
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Tally"
          ],
          "compatibleControllers": [
            "SMC-1",
            "EMC-1",
            "AMC-1"
          ],
          "compatibleCameras": [
            "Sony F5",
            "Sony F55",
            "Sony Venice",
            "Panasonic Varicam 35"
          ]
        },
        "Cable CAM (10-pin) – RED EPIC/D-Tap": {
          "brand": "ARRI",
          "kNumber": "K2.0001998",
          "lengthM": 1,
          "connectors": [
            "CAM (10-pin ×2)",
            "RED EPIC + D-Tap"
          ],
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Power"
          ],
          "compatibleControllers": [
            "SMC-1",
            "EMC-1",
            "AMC-1"
          ],
          "compatibleCameras": [
            "RED EPIC",
            "RED Weapon"
          ]
        },
        "Cable CAM (10-pin) – PSC": {
          "brand": "ARRI",
          "kNumber": "K2.0002727",
          "lengthM": 0.7,
          "connectors": [
            "CAM (10-pin)",
            "PSC"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleControllers": [
            "SMC-1",
            "EMC-1",
            "AMC-1"
          ]
        },
        "Cable CAM (10-pin) – Open End": {
          "brand": "ARRI",
          "kNumber": "K2.0002725",
          "lengthM": 0.5,
          "connectors": [
            "CAM (10-pin)",
            "Open End"
          ],
          "orientation": "straight",
          "useCase": [
            "Custom"
          ],
          "compatibleControllers": [
            "SMC-1",
            "EMC-1",
            "AMC-1"
          ]
        },
        "Cable Cooke/i Lens Control (16-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.65012.0",
          "lengthM": 0.7,
          "connectors": [
            "CAM (16-pin)",
            "Cooke/i"
          ],
          "orientation": "straight",
          "useCase": [
            "Lens Control"
          ],
          "compatibleControllers": [
            "Universal Motor Controller"
          ]
        },
        "Battery Adapter VMicro (WVR-1s)": {
          "brand": "ARRI",
          "kNumber": "K2.0024373",
          "lengthM": null,
          "connectors": [
            "VMicro Battery",
            "LEMO 12 V Out (2-pin)"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "WVR-1s Wireless Video Receiver"
          ]
        },
        "Battery Adapter AMicro (WVR-1s)": {
          "brand": "ARRI",
          "kNumber": "K2.0024374",
          "lengthM": null,
          "connectors": [
            "AMicro Battery",
            "LEMO 12 V Out (2-pin)"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "WVR-1s"
          ]
        },
        "Receiver Power Supply (RPS-1)": {
          "brand": "ARRI",
          "kNumber": "K2.0014774",
          "lengthM": null,
          "connectors": [
            "AC In",
            "Output to WVR-1"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "WVR-1",
            "WVT-1",
            "UMC-4"
          ]
        },
        "PWR OUT Lemo (2-pin) – RS/PWR IN Fischer (3-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.0014331",
          "lengthM": 0.5,
          "connectors": [
            "LEMO 2-pin",
            "Fischer 3-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "WVR-1",
            "WVT-1",
            "UMC-4"
          ]
        },
        "PWR OUT Lemo (2-pin) – XLR (4-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.0014342",
          "lengthM": 0.5,
          "connectors": [
            "LEMO 2-pin",
            "XLR 4-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "Camera/Monitor from battery plate or WVR-1"
          ]
        },
        "PWR OUT Lemo (2-pin) – MiniXLR (4-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.0014343",
          "lengthM": 0.5,
          "connectors": [
            "LEMO 2-pin",
            "MiniXLR 4-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "External camera monitor"
          ]
        },
        "PWR OUT Lemo (2-pin) – Hi (4-pin Hirose)": {
          "brand": "ARRI",
          "kNumber": "K2.0014344",
          "lengthM": 0.5,
          "connectors": [
            "LEMO 2-pin",
            "Hirose 4-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "External camera monitor"
          ]
        },
        "PWR OUT Lemo (2-pin) – Lemo 5-pin": {
          "brand": "ARRI",
          "kNumber": "K2.0014777",
          "lengthM": 0.5,
          "connectors": [
            "LEMO 2-pin",
            "LEMO 5-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "Camera accessories"
          ]
        },
        "PWR OUT Lemo (2-pin) – LCS (5-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.0024590",
          "lengthM": 0.3,
          "connectors": [
            "LEMO 2-pin",
            "LCS 5-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "WCU-4",
            "SXU-1"
          ]
        },
        "Monitor Power 12 V (Lemo 0B 2-pin to XLR 4-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.0010546",
          "lengthM": null,
          "connectors": [
            "LEMO 0B 2-pin",
            "XLR 4-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "ARTEMIS/TRINITY"
          ]
        },
        "Monitor Power 12 V (Lemo 0B 2-pin to Lemo 0B 2-pin Short)": {
          "brand": "ARRI",
          "kNumber": "K2.0041723",
          "lengthM": null,
          "connectors": [
            "LEMO 0B 2-pin",
            "LEMO 0B 2-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "ARTEMIS/TRINITY"
          ]
        },
        "360 EVO D-Tap / XLR Battery Power to RCP or Monitor": {
          "brand": "ARRI",
          "kNumber": "K2.0021422",
          "lengthM": 1.5,
          "connectors": [
            "D-Tap",
            "XLR 4-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "360 EVO",
            "SRH-3",
            "SRH-360"
          ]
        },
        "MTG Monitor Power (Lemo 0B 4-pin to Lemo 0B 2-pin, 24 V)": {
          "brand": "ARRI",
          "kNumber": "K2.0038998",
          "lengthM": null,
          "connectors": [
            "LEMO 0B 4-pin",
            "LEMO 0B 2-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "Master Grip",
            "TRINITY 2"
          ]
        },
        "MTG Monitor Power (Lemo 0B 4-pin to Lemo 0B 5-pin, 24 V)": {
          "brand": "ARRI",
          "kNumber": "K2.0038999",
          "lengthM": null,
          "connectors": [
            "LEMO 0B 4-pin",
            "LEMO 0B 5-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "Master Grip",
            "TRINITY 2"
          ]
        },
        "TRINITY 2 Joystick Cable": {
          "brand": "ARRI",
          "kNumber": "K2.0043861",
          "lengthM": 0.75,
          "connectors": [
            "LEMO 0B 4-pin",
            "LEMO 0B 4-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Control"
          ],
          "compatibleDevices": [
            "TRINITY 2"
          ]
        },
        "SRH FS CAN Bus Cable": {
          "brand": "ARRI",
          "kNumber": "K2.0037788",
          "lengthM": 0.3,
          "connectors": [
            "FS CAN Bus"
          ],
          "orientation": "straight",
          "useCase": [
            "Control"
          ],
          "compatibleDevices": [
            "SRH-3",
            "SRH-360",
            "360 EVO"
          ]
        },
        "SRH High-Capacity Battery Power Cable Set (12 V/24 V, 0.5 m)": {
          "brand": "ARRI",
          "kNumber": "K0.0021437",
          "lengthM": 0.5,
          "connectors": [
            "XLR 4-pin 12 V",
            "XLR 3-pin 24 V"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "SRH-3",
            "SRH-360",
            "360 EVO"
          ]
        },
        "SRH High-Capacity Battery Power Cable 24 V, 20 m": {
          "brand": "ARRI",
          "kNumber": "K2.0021429",
          "lengthM": 20,
          "connectors": [
            "XLR 3-pin 24 V"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "SRH systems"
          ]
        },
        "SRH High-Capacity Battery Power Cable 12 V, 20 m": {
          "brand": "ARRI",
          "kNumber": "K2.0021430",
          "lengthM": 20,
          "connectors": [
            "XLR 4-pin 12 V"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleDevices": [
            "SRH systems"
          ]
        }
      }
    },
    "videoAssist": {
      "Ovide Smart Assist": {
        "brand": "Ovide"
      },
      "Video Devices PIX-E5 5\" Recorder": {
        "brand": "Video Devices",
        "screenSizeInches": 5
      }
    },
    "media": {
      "ARRI Codex Compact Drive 1TB": {
        "brand": "ARRI",
        "kNumber": "K2.0024130",
        "capacityGb": 960,
        "capacityTb": 1,
        "interface": "PCIe, sustained ~8 Gb/s write"
      },
      "ARRI Codex Compact Drive 2TB": {
        "brand": "ARRI",
        "kNumber": "K2.0023447",
        "capacityGb": 1920,
        "capacityTb": 2,
        "interface": "PCIe NVMe, up to 16 Gb/s write"
      },
      "ARRI Codex Compact Drive Express 1TB": {
        "brand": "ARRI",
        "kNumber": "K2.0053843",
        "capacityGb": 960,
        "capacityTb": 1,
        "interface": "PCIe (ProRes-only)"
      },
      "ARRI Codex Compact Drive Reader (USB-C)": {
        "brand": "ARRI",
        "kNumber": "K2.0024134",
        "interface": "USB 3.1 Gen 2 (USB-C, ~8 Gb/s), bus-powered"
      },
      "OWC Atlas Ultra CFexpress Type B 1TB": {
        "brand": "OWC",
        "model": "Atlas Ultra 1TB",
        "capacityGb": 1024,
        "capacityTb": 1,
        "interface": "CFexpress Type B (PCIe)"
      },
      "ProGrade Digital CFexpress Type B 1TB Gold": {
        "brand": "ProGrade",
        "model": "CFexpress Type B Gold 1TB",
        "capacityGb": 1024,
        "capacityTb": 1,
        "interface": "CFexpress Type B (NVMe / PCIe)"
      },
      "RED MINI-MAG 480GB": {
        "brand": "RED",
        "model": "MINI-MAG 480GB",
        "capacityGb": 480,
        "capacityTb": 0.48,
        "interface": "RED MINI-MAG proprietary module (300 MB/s write)"
      },
      "Sony AXS Memory Card 1TB (S24)": {
        "brand": "Sony",
        "model": "AXS-A1TS24",
        "kNumber": "AXS-A1TS24",
        "capacityGb": 1024,
        "capacityTb": 1,
        "interface": "AXS (S24, up to 2.4 Gb/s write)"
      },
      "Sony AXS Memory Card 512GB": {
        "brand": "Sony",
        "model": "AXS-A512S48",
        "kNumber": "AXS-A512S48",
        "capacityGb": 512,
        "capacityTb": 0.5,
        "interface": "AXS (S48, up to 4.8 Gb/s write)"
      },
      "Sony AXS-AR1 Card Reader": {
        "brand": "Sony",
        "model": "AXS-AR1 Card Reader",
        "interface": "USB 3.0"
      },
      "Sony SxS PRO+ 64GB card (E-Series)": {
        "brand": "Sony",
        "model": "SBP64E",
        "capacityGb": 64,
        "capacityTb": 0.064,
        "interface": "SxS PRO+ (ExpressCard/34, PCI Express)"
      }
    },
    "lenses": {
        "ZEISS High Speed MK III 18mm T1.3": {
          "brand": "ZEISS",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "mount": "PL",
          "lengthMm": 95,
          "minFocusMeters": 0.28,
          "weight_g": 1600,
          "notes": "Front Ø80 mm; S35; T1.3-T16"
        },
        "ZEISS High Speed MK III 20mm T2.1": {
          "brand": "ZEISS",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS High Speed MK III 25mm T1.3": {
          "brand": "ZEISS",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "mount": "PL",
          "lengthMm": 75,
          "minFocusMeters": 0.25,
          "weight_g": 1100,
          "notes": "Front Ø80 mm; S35"
        },
        "ZEISS High Speed MK III 35mm T1.3": {
          "brand": "ZEISS",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "mount": "PL",
          "lengthMm": 64,
          "minFocusMeters": 0.3,
          "weight_g": 700,
          "notes": "Front Ø80 mm; S35"
        },
        "ZEISS High Speed MK III 50mm T1.3": {
          "brand": "ZEISS",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "mount": "PL",
          "lengthMm": 62,
          "minFocusMeters": 0.6,
          "weight_g": 700,
          "notes": "Front Ø80 mm; S35"
        },
        "ZEISS High Speed MK III 65mm T1.3": {
          "brand": "ZEISS",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "mount": "PL",
          "lengthMm": 75,
          "minFocusMeters": 0.7,
          "weight_g": 1250,
          "notes": "Front Ø80 mm; S35"
        },
        "ZEISS High Speed MK III 85mm T1.3": {
          "brand": "ZEISS",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "mount": "PL",
          "lengthMm": 85,
          "minFocusMeters": 0.91,
          "weight_g": 1400,
          "notes": "Front Ø80 mm; S35"
        },
        "ZEISS High Speed MK III 135mm T1.3": {
          "brand": "ZEISS",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Angenieux Optimo 25-250mm T3.5 (PL)": {
          "brand": "Angénieux",
          "frontDiameterMm": 136,
          "clampOn": true,
          "tStop": 3.5,
          "mount": "PL",
          "rodStandard": "19mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical"
        },
        "LOMO Anamorphic RF 35mm T2.5": {
          "brand": "LOMO",
          "frontDiameterMm": 141,
          "clampOn": true,
          "tStop": 2.5,
          "rodStandard": "19mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical"
        },
        "LOMO Anamorphic RF 50mm T2.4": {
          "brand": "LOMO",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 2.4,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": true,
          "lensType": "spherical"
        },
        "LOMO Anamorphic RF 75mm T2.4": {
          "brand": "LOMO",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 2.4,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": true,
          "lensType": "spherical"
        },
        "LOMO Anamorphic RF 100mm T3.2": {
          "brand": "LOMO",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 3.2,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": true,
          "lensType": "spherical"
        },
        "Canon CN7x17 17-120mm T3.0-3.9": {
          "brand": "Canon",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 3,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 0.85,
          "weight_g": 2900,
          "lengthMm": 254.9,
          "notes": "Canon lists FOV for a 26.2 × 13.8 mm S35 sensor area; image circle not published."
        },
        "Canon CN-E Flex Zoom 14-35mm T1.7": {
          "brand": "Canon",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.7,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 0.6,
          "weight_g": 3400,
          "lengthMm": 233.3,
          "notes": "Constant T1.7 Flex Zoom for Super 35 coverage; Canon lists EF version at 241.3 mm / 3.4 kg."
        },
        "Canon CN-E Flex Zoom 31.5-95mm T1.7": {
          "brand": "Canon",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.7,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 1,
          "weight_g": 3500,
          "lengthMm": 238.4,
          "notes": "Constant T1.7 Flex Zoom for Super 35 coverage; Canon lists EF version at 246.4 mm / 3.5 kg."
        },
        "Angénieux Ultra Compact FF 37-102mm T2.9": {
          "brand": "Angénieux",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 2.9,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 0.6,
          "weight_g": 2600,
          "imageCircleMm": 46.3,
          "lengthMm": 235,
          "notes": "Full-frame/VV coverage with Cooke /i metadata; 114 mm front."
        },
        "Angénieux Ultra Compact FF 21-56mm T2.9": {
          "brand": "Angénieux",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 2.9,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical"
        },
        "Angénieux Optimo Ultra 12x 36-435mm T4.2 (FF/VV)": {
          "brand": "Angénieux",
          "frontDiameterMm": 162,
          "clampOn": true,
          "tStop": 4.2,
          "mount": "PL / LPL",
          "rodStandard": "19mm",
          "rodLengthCm": 60,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 1.52,
          "weight_g": 12750,
          "imageCircleMm": 46.3,
          "lengthMm": 523,
          "notes": "Front Ø162 mm; weight and length are the full-frame specification. Data from Angénieux Optimo Ultra 12x technical literature."
        },
        "Angénieux Optimo Ultra 12x 24-290mm T2.8 (S35)": {
          "brand": "Angénieux",
          "frontDiameterMm": 162,
          "clampOn": true,
          "tStop": 2.8,
          "mount": "PL / LPL",
          "rodStandard": "19mm",
          "rodLengthCm": 60,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 1.2,
          "weight_g": 12600,
          "imageCircleMm": 31.1,
          "lengthMm": 472,
          "notes": "Super 35 mode for the Optimo Ultra 12x system. Data from Angénieux Optimo Ultra 12x technical literature."
        },
        "Angénieux Optimo Ultra 12x 26-320mm T3.1 (Ultra 35)": {
          "brand": "Angénieux",
          "frontDiameterMm": 162,
          "clampOn": true,
          "tStop": 3.1,
          "mount": "PL / LPL",
          "rodStandard": "19mm",
          "rodLengthCm": 60,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 1.24,
          "weight_g": 12750,
          "imageCircleMm": 34.6,
          "lengthMm": 480,
          "notes": "Ultra 35 mode for the Optimo Ultra 12x system. Data from Angénieux Optimo Ultra 12x technical literature."
        },
        "Angénieux Type EZ-3 45-165mm T2.3-3.0 (S35)": {
          "brand": "Angénieux",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 2.3,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 1.2,
          "weight_g": 2600,
          "imageCircleMm": 30.4,
          "lengthMm": 265,
          "notes": "Convertible Type EZ-3 using Angénieux IRO: S35 block covers 30.4 mm image circle. Ships in PL with swaps to EF/E/RF."
        },
        "Angénieux Type EZ-3 68-250mm T3.5-4.5 (FF)": {
          "brand": "Angénieux",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 3.5,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 1.2,
          "weight_g": 2600,
          "imageCircleMm": 46.3,
          "lengthMm": 265,
          "notes": "Convertible Type EZ-3 using Angénieux IRO: FF/VV block covers 46.3 mm image circle. Ships in PL with swaps to EF/E/RF."
        },
        "ARRI Signature Prime 12mm T1.8": {
          "brand": "ARRI",
          "frontDiameterMm": 134,
          "clampOn": true,
          "tStop": 1.8,
          "mount": "LPL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI Signature Prime 15mm T1.8": {
          "brand": "ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.8,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI Signature Prime 18mm T1.8": {
          "brand": "ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.8,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI Signature Prime 21mm T1.8": {
          "brand": "ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.8,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI Signature Prime 25mm T1.8": {
          "brand": "ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.8,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI Signature Prime 29mm T1.8": {
          "brand": "ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.8,
          "mount": "LPL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI Signature Prime 35mm T1.8": {
          "brand": "ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.8,
          "mount": "LPL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI Signature Prime 40mm T1.8": {
          "brand": "ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.8,
          "mount": "LPL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI Signature Prime 47mm T1.8": {
          "brand": "ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.8,
          "mount": "LPL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI Signature Prime 58mm T1.8": {
          "brand": "ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.8,
          "mount": "LPL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI Signature Prime 75mm T1.8": {
          "brand": "ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.8,
          "mount": "LPL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI Signature Prime 95mm T1.8": {
          "brand": "ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.8,
          "mount": "LPL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI Signature Prime 125mm T1.8": {
          "brand": "ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.8,
          "mount": "LPL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI Signature Prime 150mm T1.8": {
          "brand": "ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.8,
          "mount": "LPL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI Signature Prime 200mm T2.5": {
          "brand": "ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 2.5,
          "mount": "LPL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI Signature Prime 280mm T2.8": {
          "brand": "ARRI",
          "frontDiameterMm": 134,
          "clampOn": true,
          "tStop": 2.8,
          "mount": "LPL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI Signature Zoom 16-32mm T2.8": {
          "brand": "ARRI",
          "frontDiameterMm": 156,
          "clampOn": true,
          "tStop": 2.8,
          "mount": "LPL",
          "rodStandard": "19mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 0.45,
          "weight_g": 3200,
          "imageCircleMm": 46,
          "lengthMm": 212,
          "notes": "ARRI states 46 mm image circle coverage with LDS-2/Cooke /i lens data in-family."
        },
        "ARRI Signature Zoom 24-75mm T2.8": {
          "brand": "ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 2.8,
          "mount": "LPL",
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 0.7,
          "weight_g": 3700,
          "imageCircleMm": 46,
          "lengthMm": 244,
          "notes": "ARRI technical data for length, weight, and MOD; LDS-2/Cooke /i metadata compatible."
        },
        "ARRI Signature Zoom 45-135mm T2.8": {
          "brand": "ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 2.8,
          "mount": "LPL",
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 1,
          "weight_g": 3600,
          "imageCircleMm": 46,
          "lengthMm": 300,
          "notes": "ARRI technical data for 1 m MOD, 300 mm length, and 3.6 kg weight; LDS-2/Cooke /i metadata compatible."
        },
        "ARRI Signature Zoom 65-300mm T2.8": {
          "brand": "ARRI",
          "frontDiameterMm": 156,
          "clampOn": true,
          "tStop": 2.8,
          "mount": "LPL",
          "rodStandard": "19mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 1.8,
          "weight_g": 8100,
          "imageCircleMm": 46,
          "lengthMm": 420,
          "notes": "ARRI lists 1.8 m MOD from sensor plane (1.337 m from lens front) with LDS-2/Cooke /i metadata."
        },
        "ARRI/ZEISS Ultra Prime 16mm T1.9": {
          "brand": "ARRI/ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.9,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI/ZEISS Ultra Prime 20mm T1.9": {
          "brand": "ARRI/ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.9,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI/ZEISS Ultra Prime 24mm T1.9": {
          "brand": "ARRI/ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.9,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI/ZEISS Ultra Prime 32mm T1.9": {
          "brand": "ARRI/ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.9,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI/ZEISS Ultra Prime 40mm T1.9": {
          "brand": "ARRI/ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.9,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI/ZEISS Ultra Prime 50mm T1.9": {
          "brand": "ARRI/ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.9,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI/ZEISS Ultra Prime 65mm T1.9": {
          "brand": "ARRI/ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.9,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI/ZEISS Ultra Prime 85mm T1.9": {
          "brand": "ARRI/ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.9,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ARRI/ZEISS Ultra Prime 100mm T1.9": {
          "brand": "ARRI/ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.9,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS Master Prime 12mm T1.3": {
          "brand": "ZEISS/ARRI",
          "frontDiameterMm": 156,
          "clampOn": true,
          "tStop": 1.3,
          "mount": "PL / LDS",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.4,
          "weight_g": 2900,
          "imageCircleMm": 46.3,
          "lengthMm": 197,
          "notes": "Front Ø156 mm; close focus measured from image plane. Data from ZEISS Master Prime technical specifications."
        },
        "ZEISS Master Prime 14mm T1.3": {
          "brand": "ZEISS/ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.3,
          "mount": "PL / LDS",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.35,
          "weight_g": 2400,
          "imageCircleMm": 46.3,
          "lengthMm": 172,
          "notes": "Front Ø114 mm. Data from ZEISS Master Prime technical specifications."
        },
        "ZEISS Master Prime 16mm T1.3": {
          "brand": "ZEISS/ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.3,
          "mount": "PL / LDS",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.35,
          "weight_g": 2200,
          "imageCircleMm": 46.3,
          "lengthMm": 153,
          "notes": "Front Ø114 mm. Data from ZEISS Master Prime technical specifications."
        },
        "ZEISS Master Prime 18mm T1.3": {
          "brand": "ZEISS/ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.3,
          "mount": "PL / LDS",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.35,
          "weight_g": 2200,
          "imageCircleMm": 46.3,
          "lengthMm": 153,
          "notes": "Front Ø114 mm. Data from ZEISS Master Prime technical specifications."
        },
        "ZEISS Master Prime 21mm T1.3": {
          "brand": "ZEISS/ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.3,
          "mount": "PL / LDS",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.35,
          "weight_g": 2400,
          "imageCircleMm": 46.3,
          "lengthMm": 153,
          "notes": "Front Ø114 mm. Data from ZEISS Master Prime technical specifications."
        },
        "ZEISS Master Prime 25mm T1.3": {
          "brand": "ZEISS/ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.3,
          "mount": "PL / LDS",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.35,
          "weight_g": 2300,
          "imageCircleMm": 46.3,
          "lengthMm": 153,
          "notes": "Front Ø114 mm. Data from ZEISS Master Prime technical specifications."
        },
        "ZEISS Master Prime 27mm T1.3": {
          "brand": "ZEISS/ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.3,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS Master Prime 40mm T1.3": {
          "brand": "ZEISS/ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.3,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS Master Prime 50mm T1.3": {
          "brand": "ZEISS/ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.3,
          "mount": "PL / LDS",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.5,
          "weight_g": 2700,
          "imageCircleMm": 46.3,
          "lengthMm": 153,
          "notes": "Front Ø114 mm. Data from ZEISS Master Prime technical specifications."
        },
        "ZEISS Master Prime 65mm T1.3": {
          "brand": "ZEISS/ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.3,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS Master Prime 100mm T1.3": {
          "brand": "ZEISS/ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.3,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS Master Prime 135mm T1.3": {
          "brand": "ZEISS/ARRI",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.3,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS Compact Zoom CZ.2 15-30mm T2.9": {
          "brand": "ZEISS",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 2.9,
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 0.55,
          "weight_g": 2600,
          "imageCircleMm": 43.3,
          "lengthMm": 198,
          "notes": "Full-frame coverage; T2.9–22. Source: ZEISS Cinema Zoom brochure (accessed 2025-09-14). Interchangeable Mount System supports PL/EF/F/E/MFT."
        },
        "ZEISS Compact Zoom CZ.2 28-80mm T2.9": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 2.9,
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 0.83,
          "weight_g": 2500,
          "imageCircleMm": 43.3,
          "lengthMm": 196,
          "notes": "Full-frame coverage; T2.9–22. Appears in your PDF gear list. Sources: ZEISS brochure (accessed 2025-09-14); internal list. Interchangeable Mount System supports PL/EF/F/E/MFT."
        },
        "ZEISS Compact Zoom CZ.2 70-200mm T2.9": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 2.9,
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 1.52,
          "weight_g": 2800,
          "imageCircleMm": 43.3,
          "lengthMm": 250,
          "notes": "Full-frame coverage; T2.9–22. Appears in your PDF gear list. Source: ZEISS brochure (accessed 2025-09-14). Interchangeable Mount System supports PL/EF/F/E/MFT."
        },
        "ZEISS Lightweight Zoom LWZ.3 21-100mm T2.9-3.9": {
          "brand": "ZEISS",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 2.9,
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 0.8,
          "weight_g": 2000,
          "imageCircleMm": 31.1,
          "lengthMm": 226,
          "notes": "ANSI Super 35 coverage; 11 iris blades; T2.9–22; front Ø 114 mm. Source: ZEISS technical data (accessed 2025-09-14). Interchangeable Mount System supports PL/EF/F/E/MFT."
        },
        "ZEISS Nano Prime 18mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS Nano Prime 24mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS Nano Prime 35mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS Nano Prime 50mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS Nano Prime 75mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS Nano Prime 100mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS Supreme Prime Radiance 18mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.35,
          "weight_g": 2270,
          "imageCircleMm": 46.3,
          "lengthMm": 163,
          "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14)."
        },
        "ZEISS Supreme Prime Radiance 21mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.35,
          "weight_g": 1500,
          "imageCircleMm": 46.3,
          "lengthMm": 119,
          "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14)."
        },
        "ZEISS Supreme Prime Radiance 25mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.26,
          "weight_g": 1420,
          "imageCircleMm": 46.3,
          "lengthMm": 119,
          "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14)."
        },
        "ZEISS Supreme Prime Radiance 29mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.33,
          "weight_g": 1610,
          "imageCircleMm": 46.3,
          "lengthMm": 121,
          "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14)."
        },
        "ZEISS Supreme Prime Radiance 35mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.32,
          "weight_g": 1400,
          "imageCircleMm": 46.3,
          "lengthMm": 119,
          "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14)."
        },
        "ZEISS Supreme Prime Radiance 40mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.42,
          "weight_g": 1490,
          "imageCircleMm": 46.3,
          "lengthMm": 121,
          "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14)."
        },
        "ZEISS Supreme Prime Radiance 50mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.45,
          "weight_g": 1220,
          "imageCircleMm": 46.3,
          "lengthMm": 119,
          "notes": "Appears in your PDF list. Source: ZEISS Radiance technical data (accessed 2025-09-14)."
        },
        "ZEISS Supreme Prime Radiance 65mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.6,
          "weight_g": 1630,
          "imageCircleMm": 46.3,
          "lengthMm": 121,
          "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14)."
        },
        "ZEISS Supreme Prime Radiance 85mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.84,
          "weight_g": 1420,
          "imageCircleMm": 46.3,
          "lengthMm": 119,
          "notes": "Appears in your PDF list. Source: ZEISS Radiance technical data (accessed 2025-09-14)."
        },
        "ZEISS Supreme Prime Radiance 100mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 1.1,
          "weight_g": 1700,
          "imageCircleMm": 46.3,
          "lengthMm": 119,
          "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14)."
        },
        "ZEISS Supreme Prime Radiance 135mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 1.4,
          "weight_g": 2270,
          "imageCircleMm": 46.3,
          "lengthMm": 146,
          "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14)."
        },
        "Leitz Summicron-C 15mm T2.0": {
          "brand": "Leitz",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 2,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "imageCircleMm": 36,
          "lengthMm": 118,
          "minFocusMeters": 0.3,
          "weight_g": 1800,
          "notes": "Front Ø95 mm"
        },
        "Leitz Summicron-C 18mm T2.0": {
          "brand": "Leitz",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 2,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "imageCircleMm": 36,
          "lengthMm": 101,
          "minFocusMeters": 0.3,
          "weight_g": 1300,
          "notes": "Front Ø95 mm"
        },
        "Leitz Summicron-C 21mm T2.0": {
          "brand": "Leitz",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 2,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "imageCircleMm": 36,
          "lengthMm": 101,
          "minFocusMeters": 0.3,
          "weight_g": 1300,
          "notes": "Front Ø95 mm"
        },
        "Leitz Summicron-C 25mm T2.0": {
          "brand": "Leitz",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 2,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "imageCircleMm": 36,
          "lengthMm": 101,
          "minFocusMeters": 0.3,
          "weight_g": 1500,
          "notes": "Front Ø95 mm"
        },
        "Leitz Summicron-C 35mm T2.0": {
          "brand": "Leitz",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 2,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Leitz Summicron-C 50mm T2.0": {
          "brand": "Leitz",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 2,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Leitz Summicron-C 75mm T2.0": {
          "brand": "Leitz",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 2,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Leitz Summicron-C 100mm T2.0": {
          "brand": "Leitz",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 2,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Cooke S7/i FF 25mm T2.0": {
          "brand": "Cooke",
          "frontDiameterMm": 110,
          "clampOn": true,
          "tStop": 2,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "lengthMm": 182,
          "minFocusMeters": 0.36,
          "weight_g": 3300,
          "imageCircleMm": 46.31
        },
        "Cooke S7/i FF 32mm T2.0": {
          "brand": "Cooke",
          "frontDiameterMm": 110,
          "clampOn": true,
          "tStop": 2,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "lengthMm": 189,
          "minFocusMeters": 0.35,
          "weight_g": 3400,
          "imageCircleMm": 46.31
        },
        "Cooke S7/i FF 40mm T2.0": {
          "brand": "Cooke",
          "frontDiameterMm": 110,
          "clampOn": true,
          "tStop": 2,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Cooke S7/i FF 50mm T2.0": {
          "brand": "Cooke",
          "frontDiameterMm": 110,
          "clampOn": true,
          "tStop": 2,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Cooke S7/i FF 60mm T2.5": {
          "brand": "Cooke",
          "frontDiameterMm": 110,
          "clampOn": true,
          "tStop": 2.5,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "lengthMm": 160,
          "minFocusMeters": 0.056,
          "weight_g": 2200,
          "imageCircleMm": 46.3,
          "notes": "T2.5-T22"
        },
        "Cooke S7/i FF 75mm T2.0": {
          "brand": "Cooke",
          "frontDiameterMm": 110,
          "clampOn": true,
          "tStop": 2,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Cooke S7/i FF 100mm T2.0": {
          "brand": "Cooke",
          "frontDiameterMm": 110,
          "clampOn": true,
          "tStop": 2,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Cooke S8/i FF 25mm T1.4": {
          "brand": "Cooke",
          "frontDiameterMm": 104,
          "clampOn": true,
          "tStop": 1.4,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Cooke S8/i FF 32mm T1.4": {
          "brand": "Cooke",
          "frontDiameterMm": 104,
          "clampOn": true,
          "tStop": 1.4,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Cooke S8/i FF 40mm T1.4": {
          "brand": "Cooke",
          "frontDiameterMm": 104,
          "clampOn": true,
          "tStop": 1.4,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Cooke S8/i FF 50mm T1.4": {
          "brand": "Cooke",
          "frontDiameterMm": 104,
          "clampOn": true,
          "tStop": 1.4,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Cooke S8/i FF 75mm T1.4": {
          "brand": "Cooke",
          "frontDiameterMm": 104,
          "clampOn": true,
          "tStop": 1.4,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Cooke S8/i FF 100mm T1.4": {
          "brand": "Cooke",
          "frontDiameterMm": 104,
          "clampOn": true,
          "tStop": 1.4,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Fujinon Premista 19-45mm T2.9": {
          "brand": "Fujinon",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 2.9,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 0.6,
          "weight_g": 3300,
          "imageCircleMm": 46.3,
          "lengthMm": 228,
          "notes": "Front Ø114 mm; full-frame/VV coverage."
        },
        "Fujinon Premista 28-100mm T2.9": {
          "brand": "Fujinon",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 2.9,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 0.8,
          "weight_g": 3800,
          "imageCircleMm": 46.3,
          "lengthMm": 255,
          "notes": "Front Ø114 mm; full-frame/VV coverage."
        },
        "Fujinon Premista 80-250mm T2.9-3.5": {
          "brand": "Fujinon",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 2.9,
          "mount": "PL",
          "rodStandard": "19mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical",
          "minFocusMeters": 1.5,
          "weight_g": 3800,
          "imageCircleMm": 46.3,
          "lengthMm": 255,
          "notes": "Front Ø114 mm; full-frame/VV coverage."
        },
        "DZOFilm Vespid 35mm T2.1": {
          "brand": "DZOFilm",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFilm Vespid 50mm T2.1": {
          "brand": "DZOFilm",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFilm Vespid 75mm T2.1": {
          "brand": "DZOFilm",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Meike FF Prime 24mm T2.1": {
          "brand": "Meike",
          "frontDiameterMm": 85,
          "clampOn": true,
          "tStop": 2.1,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Meike FF Prime 35mm T2.1": {
          "brand": "Meike",
          "frontDiameterMm": 85,
          "clampOn": true,
          "tStop": 2.1,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Cooke Speed Panchro TLS 18mm T2.2": {
          "brand": "Cooke",
          "frontDiameterMm": 110,
          "clampOn": true,
          "tStop": 2.2,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "lengthMm": 61,
          "minFocusMeters": 0.2,
          "weight_g": 820,
          "notes": "Front Ø110 mm; Super35; approx 2.40 in length"
        },
        "Cooke Speed Panchro TLS 25mm T2.2": {
          "brand": "Cooke",
          "frontDiameterMm": 110,
          "clampOn": true,
          "tStop": 2.2,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "lengthMm": 69,
          "minFocusMeters": 0.2,
          "weight_g": 860,
          "notes": "Front Ø110 mm; approx 2.70 in length"
        },
        "Cooke Speed Panchro TLS 32mm T2.3": {
          "brand": "Cooke",
          "frontDiameterMm": 110,
          "clampOn": true,
          "tStop": 2.3,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "lengthMm": 69,
          "minFocusMeters": 0.23,
          "weight_g": 820,
          "notes": "Front Ø110 mm"
        },
        "Cooke Speed Panchro TLS 40mm T2.3": {
          "brand": "Cooke",
          "frontDiameterMm": 110,
          "clampOn": true,
          "tStop": 2.3,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "lengthMm": 69,
          "minFocusMeters": 0.33,
          "weight_g": 1040,
          "notes": "Front Ø110 mm"
        },
        "Cooke Speed Panchro TLS 50mm T2.3": {
          "brand": "Cooke",
          "frontDiameterMm": 110,
          "clampOn": true,
          "tStop": 2.3,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.38,
          "weight_g": 1630,
          "notes": "Front Ø110 mm; longer prime"
        },
        "Cooke Speed Panchro 18mm (P+S rehousing)": {
          "brand": "Cooke (P+S rehoused)",
          "frontDiameterMm": 100,
          "clampOn": true,
          "tStop": 2.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Cooke Speed Panchro 25mm (P+S rehousing)": {
          "brand": "Cooke (P+S rehoused)",
          "frontDiameterMm": 100,
          "clampOn": true,
          "tStop": 2.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Cooke Speed Panchro 35mm (P+S rehousing)": {
          "brand": "Cooke (P+S rehoused)",
          "frontDiameterMm": 100,
          "clampOn": true,
          "tStop": 2.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Cooke Speed Panchro 40mm (P+S rehousing)": {
          "brand": "Cooke (P+S rehoused)",
          "frontDiameterMm": 100,
          "clampOn": true,
          "tStop": 2.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Cooke Speed Panchro 75mm (P+S rehousing)": {
          "brand": "Cooke (P+S rehoused)",
          "frontDiameterMm": 100,
          "clampOn": true,
          "tStop": 2.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Laowa 24mm T8 2× Pro2be (3-lens set: Direct / 35° / Periscope)": {
          "brand": "Laowa",
          "frontDiameterMm": 30,
          "clampOn": true,
          "tStop": 8,
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical"
        },
        "Laowa Ranger 28-75mm T2.9": {
          "brand": "Laowa",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.9,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical"
        },
        "Laowa Ranger 75-180mm T2.9": {
          "brand": "Laowa",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.9,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical"
        },
        "Sigma 18–35mm f/1.8 DC HSM Art": {
          "brand": "Sigma",
          "frontDiameterMm": 82,
          "clampOn": true,
          "tStop": 1.8,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Sony FE 24–70mm f/2.8 G Master II": {
          "brand": "Sony",
          "frontDiameterMm": 82,
          "clampOn": true,
          "tStop": 2.8,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Sony FE 70–200mm f/2.8 G Master II": {
          "brand": "Sony",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.8,
          "rodStandard": "15mm",
          "rodLengthCm": 45,
          "needsLensSupport": true,
          "lensType": "spherical"
        },
        "Minolta 28mm f/2.8": {
          "brand": "Minolta",
          "frontDiameterMm": 55,
          "clampOn": true,
          "tStop": 2.8,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Minolta 35mm f/1.4": {
          "brand": "Minolta",
          "frontDiameterMm": 72,
          "clampOn": true,
          "tStop": 1.4,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Minolta 50mm f/1.4": {
          "brand": "Minolta",
          "frontDiameterMm": 55,
          "clampOn": true,
          "tStop": 1.4,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Minolta 85mm f/1.8": {
          "brand": "Minolta",
          "frontDiameterMm": 55,
          "clampOn": true,
          "tStop": 1.8,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "SIGMA Aizu Prime Line 25mm T1.3 LF": {
          "brand": "SIGMA",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "SIGMA Aizu Prime Line 27mm T1.3 LF": {
          "brand": "SIGMA",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "SIGMA Aizu Prime Line 32mm T1.3 LF": {
          "brand": "SIGMA",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "SIGMA Aizu Prime Line 35mm T1.3 LF": {
          "brand": "SIGMA",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "SIGMA Aizu Prime Line 40mm T1.3 LF": {
          "brand": "SIGMA",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "SIGMA Aizu Prime Line 50mm T1.3 LF": {
          "brand": "SIGMA",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "SIGMA Aizu Prime Line 65mm T1.3 LF": {
          "brand": "SIGMA",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "SIGMA Aizu Prime Line 75mm T1.3 LF": {
          "brand": "SIGMA",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "NiSi AUREUS Prime 18mm T1.4": {
          "brand": "NiSi",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.4,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "NiSi AUREUS Prime 24mm T1.4": {
          "brand": "NiSi",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.4,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "NiSi AUREUS Prime 35mm T1.4": {
          "brand": "NiSi",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.4,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "NiSi AUREUS Prime 50mm T1.4": {
          "brand": "NiSi",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.4,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "NiSi AUREUS Prime 85mm T1.4": {
          "brand": "NiSi",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.4,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "SIRUI Vision Prime 1 24mm T1.4": {
          "brand": "SIRUI",
          "frontDiameterMm": 72,
          "clampOn": true,
          "tStop": 1.4,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "SIRUI Vision Prime 1 35mm T1.4": {
          "brand": "SIRUI",
          "frontDiameterMm": 72,
          "clampOn": true,
          "tStop": 1.4,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "SIRUI Vision Prime 1 50mm T1.4": {
          "brand": "SIRUI",
          "frontDiameterMm": 72,
          "clampOn": true,
          "tStop": 1.4,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "Tokina Cinema Vista-P 180mm T1.9": {
          "brand": "Tokina Cinema",
          "frontDiameterMm": 114,
          "clampOn": true,
          "tStop": 1.9,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": true,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 12mm T2.8": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.8,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 16mm T2.8": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.8,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 21mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 25mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 35mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 40mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 50mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 75mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 90mm T2.8 Macro": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.8,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 100mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 125mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Retro 16mm T2.8": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.8,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Retro 25mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Retro 35mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Retro 50mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Retro 75mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Retro 100mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Retro 125mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Cyber 35mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Cyber 50mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Cyber 75mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime II 18mm T1.9": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.9,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime II 24mm T1.9": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.9,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime II 35mm T1.9": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.9,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime II 50mm T1.9": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.9,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime II 85mm T1.9": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.9,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime II 105mm T1.9": {
          "brand": "DZOFILM",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.9,
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        }
    },

    "tripodHeads": {
      "OConnor 2560 Head": {
        "brand": "OConnor",
        "bowlSizeMm": 150,
        "material": "Aluminum"
      },
      "Sachtler FSB 8 Head": {
        "brand": "Sachtler",
        "bowlSizeMm": 75,
        "material": "Aluminum"
      },
      "Sachtler Cine 30": {
        "brand": "Sachtler",
        "bowlSizeMm": 150,
        "material": "Aluminum"
      },
      "Sachtler Video 20 S1": {
        "brand": "Sachtler",
        "bowlSizeMm": 100,
        "material": "Aluminum"
      },
      "OConnor Ultimate 1040": {
        "brand": "OConnor",
        "bowlSizeMm": 100,
        "material": "Aluminum"
      },
      "Manfrotto Nitrotech 608": {
        "brand": "Manfrotto",
        "bowlSizeMm": 75,
        "material": "Aluminum"
      }
    },
    "tripods": {
      "Sachtler EFP-2 CF Tripod (mid spreader)": {
        "brand": "Sachtler",
        "bowlSizeMm": 150,
        "material": "Carbon Fiber",
        "spreader": "mid"
      },
      "Sachtler Cine 150 Tripod (medium + spreader)": {
        "brand": "Sachtler",
        "bowlSizeMm": 150,
        "material": "Aluminum",
        "spreader": "medium"
      },
      "Sachtler Cine 2000 Tripod (short + spreader)": {
        "brand": "Sachtler",
        "bowlSizeMm": 150,
        "material": "Aluminum",
        "spreader": "short"
      }
    },
    "sliders": {
      "Hudson Spider Compound Slider X2": {
        "brand": "Hudson Spider"
      }
    },
    "cameraStabiliser": {
      "Easyrig 5 Vario": {
        "brand": "Easyrig",
        "options": [
          "FlowCine Serene Spring Arm",
          "Easyrig - STABIL G3"
        ]
      },
      "DJI Ronin RS4 Pro Combo": {
        "brand": "DJI"
      },
      "DJI Ronin 2": {
        "brand": "DJI"
      }
    },
    "grip": {
      "Cinekinetic Cinesaddle": {
        "brand": "Cinekinetic"
      },
      "Steadybag": {
        "brand": "Steadybag"
      }
    },
    "carts": {
      "Magliner Senior Videomagliner": {
        "brand": "Magliner"
      }
    }
  },
  "filterOptions": [
    "Clear",
    "IRND",
    "FSND",
    "Rota-Pol",
    "Pol",
    "ND Grad SE",
    "ND Grad HE",
    "BPM",
    "WPM",
    "PM",
    "HBM",
    "GG",
    "Pearl",
    "Soft FX",
    "Diopter"
  ]
};

// Expose lenses at the top level for easier access
gear.lenses = gear.accessories.lenses;
// Remove lenses from accessories to avoid duplicate entries
delete gear.accessories.lenses;

const categories = {
  viewfinders: gear.viewfinders,
  directorMonitors: gear.directorMonitors,
  iosVideo: gear.iosVideo,
  videoAssist: gear.videoAssist,
  media: gear.media,
  lenses: gear.lenses,
  accessories: gear.accessories,
  filterOptions: gear.filterOptions
};

if (typeof registerDevice === 'function') {
  Object.entries(categories).forEach(([name, data]) => registerDevice(name, data));
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = gear;
  }
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = gear;
} else {
  globalThis.devices = globalThis.devices || {};
  Object.entries(categories).forEach(([name, data]) => {
    if (name === 'accessories') {
      globalThis.devices.accessories = Object.assign(globalThis.devices.accessories || {}, data);
    } else {
      globalThis.devices[name] = data;
    }
  });
}
})();
