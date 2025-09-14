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
      "powerDrawWatts": null,
      "power": {
        "input": [
          { "type": "XLR" },
          { "type": "D-Tap" }
        ],
        "output": null
      },
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
      "powerDrawWatts": null,
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
      "brightnessNits": null,
      "powerDrawWatts": null,
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
      "powerDrawWatts": null,
      "power": {
        "input": { "type": "AC" },
        "output": null
      },
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
      "powerDrawWatts": null,
      "power": {
        "input": { "type": "AC" },
        "output": null
      },
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
      "powerDrawWatts": null,
      "power": {
        "input": [
          { "type": "XLR 4-pin", "notes": "24V DC" },
          { "type": "V-Mount", "notes": "optional plate" }
        ],
        "output": null
      },
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
        "rodStandard": "19mm"
      },
      "ARRI SAB-2 Side Accessory Bracket": {
        "brand": "ARRI",
        "kNumber": "K2.0014088"
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
        ]
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
        "kNumber": "K2.0003899"
      },
      "ARRI 15mm LWS Rod Console": {
        "brand": "ARRI",
        "kNumber": "K2.65264.0"
      },
      "ARRI Support Rods 240mm/15mm": {
        "brand": "ARRI",
        "kNumber": "K2.66253.0",
        "lengthMm": 240,
        "diameterMm": 15
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
        "kNumber": "K2.0006186"
      },
      "ARRI 15mm Reduction Insert": {
        "brand": "ARRI",
        "kNumber": "K2.66255.0"
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
      "ARRI Bridge Plate BP-8/9": {
        "brand": "ARRI",
        "kNumber": "K2.0031436"
      },
      "ARRI Bridge Plate Adapter BPA-5": {
        "brand": "ARRI",
        "kNumber": "K2.0017138"
      },
      "ARRI Bottom Dovetail Plate 300mm": {
        "brand": "ARRI",
        "kNumber": "K2.0015896",
        "lengthMm": 300
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
        "kNumber": "KK.0015175",
        "stages": 3,
        "type": "Clamp-On"
      },
      "ARRI LMB 4x5 Pro Set": {
        "brand": "ARRI",
        "kNumber": "KK.0015177",
        "stages": 3,
        "type": "Swing Away"
      },
      "ARRI LMB 4x5 15mm LWS Set 3-Stage": {
        "brand": "ARRI",
        "kNumber": "KK.0015176",
        "stages": 3,
        "type": "Rod based"
      },
      "ARRI LMB 19mm Studio Rod Adapter": {
        "brand": "ARRI",
        "kNumber": "K2.0013432"
      },
      "ARRI LMB 4x5 / LMB-6 Tray Catcher": {
        "brand": "ARRI",
        "kNumber": "K2.66202.0",
        "compatible": [
          "LMB 4x5",
          "LMB-6"
        ],
        "traySize": "Accessory only (tray catcher)",
        "topFlag": false,
        "sideFlags": false,
        "provenance": "Listed as accessory only, no flags [oai_citation:2‡250211_Equipmentliste_Aktenzeichen_XY_Betrug_.pdf](file-service://file-CSmKG9jmaC5YFTscUZTnmU)"
      },
      "ARRI LMB 4x5 Side Flags": {
        "brand": "ARRI",
        "kNumber": "K2.0013750"
      },
      "ARRI LMB Flag Holders": {
        "brand": "ARRI",
        "kNumber": "K2.0013825"
      },
      "ARRI LMB 4x5 Set of Mattes spherical": {
        "brand": "ARRI",
        "kNumber": "K2.0000069"
      },
      "ARRI LMB Accessory Adapter": {
        "brand": "ARRI",
        "kNumber": "K2.0013014"
      },
      "ARRI LMB 4x5 Clamp Adapter Set Pro": {
        "brand": "ARRI",
        "kNumber": "KK.0015133"
      },
      "ARRI Anti-Reflection Frame 4x5.65": {
        "brand": "ARRI",
        "kNumber": "K2.0008133"
      },
      "ARRI Diopter Frame 138mm": {
        "brand": "ARRI",
        "kNumber": "K2.0013740",
        "diameterMm": 138
      },
      "ARRI LMB 6x6": {
        "brand": "ARRI",
        "traySize": "6.6x6.6",
        "topFlag": "optional",
        "sideFlags": "optional",
        "provenance": "ARRI site: modular mattebox, flags available as add-ons【web†source】"
      },
      "ARRI MMB-2": {
        "brand": "ARRI",
        "traySize": "4x4 / 4x5.65 / 4.5 round",
        "topFlag": true,
        "sideFlags": "optional",
        "provenance": "ARRI datasheet confirms top flag standard, side flags optional【web†source】"
      },
      "Tilta Mirage (MB-T16, 95mm system)": {
        "brand": "Tilta",
        "stages": 1,
        "type": "Clamp-On",
        "traySize": "95mm native (optional 4x5.65 trays)",
        "topFlag": true,
        "sideFlags": "optional",
        "provenance": "Tilta docs: top flag included, side flags sold separately [oai_citation:4‡250828_Equipmentliste_Zinema_Rent_2025.pdf](file-service://file-XGn1wNhzpzKYhGNKNy2UPM)"
      },
      "Tilta MB-T12 (Carbon Fiber 4x5.65)": {
        "brand": "Tilta",
        "stages": 3,
        "type": "Rod based",
        "traySize": "4x5.65 (3 stages)",
        "topFlag": true,
        "sideFlags": "optional",
        "provenance": "Tilta product page: 'Top Flag helps eliminate flares'【web†source】"
      },
      "Tilta MB12": {
        "brand": "Tilta",
        "traySize": "4x5.65",
        "topFlag": true,
        "sideFlags": false,
        "provenance": "Equipment list: 'incl. Top Flag + 80mm rear' [oai_citation:3‡250602_Equipmentliste_Gönrgy_Werbung.pdf](file-service://file-NLioL2MfohXGobdBCXVx63)"
      },
      "Bright Tangerine Misfit Six Core": {
        "brand": "Bright Tangerine",
        "traySize": "6.6x6.6 (also supports 4x5.65)",
        "topFlag": true,
        "sideFlags": true,
        "provenance": "3-Stage kit includes top and side flags【web†source】"
      },
      "Wooden Camera UMB-1 Universal Mattebox (Pro)": {
        "brand": "Wooden Camera",
        "traySize": "4x5.65 (2 rotating + optional 3rd stage)",
        "topFlag": true,
        "sideFlags": true,
        "provenance": "Product page: 'folding French flag … left and right side flags, bottom flag'【web†source】"
      },
      "Vocas MB-216": {
        "brand": "Vocas",
        "traySize": "3x3 – 4x6 (supports 4x5.65)",
        "topFlag": "optional",
        "sideFlags": "optional",
        "provenance": "Vocas datasheet: up to 114mm lens support, flags are optional【web†source】"
      },
      "SmallRig Mini Matte Box Pro (3680)": {
        "brand": "SmallRig",
        "traySize": "4x5.65 (two trays, stackable)",
        "topFlag": true,
        "sideFlags": "optional",
        "provenance": "SmallRig site: top flag included, no mention of side flags【web†source】"
      },
      "SmallRig Mini Matte Box Lite (3575 / 3196)": {
        "brand": "SmallRig",
        "traySize": "4x5.65",
        "topFlag": true,
        "sideFlags": false,
        "provenance": "Lite kits ship with only top flag【web†source】"
      },
      "NiSi Cinema C5": {
        "brand": "NiSi",
        "traySize": "95mm native (adapters for 67–82mm; rotating PL/VND optional)",
        "topFlag": "optional",
        "sideFlags": "optional",
        "provenance": "NiSi C5 Filmmaker Kit includes flags; base system does not【web†source】"
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
        "brand": "Tilta"
      },
      "Schneider CF DIOPTER FULL GEN2": {
        "brand": "Schneider"
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
      "cables": {
        "LBUS to LBUS": {
          "from": "LBUS (LEMO 4-pin)",
          "to": "LBUS (LEMO 4-pin)"
        },
        "Cable CAM (7-pin) – EXT (6-pin)": {
          "brand": "ARRI",
          "kNumber": "K2.015756",
          "lengthM": 0.6,
          "connectors": [
            "CAM (7-pin)",
            "EXT (6-pin)"
          ],
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Tally"
          ]
        },
        "Cable CAM (7-pin) – D-Tap": {
          "brand": "ARRI",
          "kNumber": "K2.0018813",
          "lengthM": 0.6,
          "connectors": [
            "CAM (7-pin)",
            "D-Tap"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ]
        },
        "Cable CAM (7-pin) – LANC/D-Tap": {
          "brand": "ARRI",
          "kNumber": "K2.0015757",
          "lengthM": 0.6,
          "connectors": [
            "CAM (7-pin)",
            "LANC + D-Tap"
          ],
          "orientation": "straight",
          "useCase": [
            "Run/Stop",
            "Power"
          ]
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
      "ARRI Codex Compact Drive 2TB": {
        "brand": "ARRI",
        "kNumber": "K2.0023447",
        "capacityTb": 2
      },
      "ARRI Codex Compact Drive Reader (USB-C)": {
        "brand": "ARRI",
        "kNumber": "K2.0024134",
        "interface": "USB-C"
      },
      "Sony AXS Memory Card 512GB": {
        "brand": "Sony",
        "capacityGb": 512
      },
      "Sony AXS-AR1 Card Reader": {
        "brand": "Sony",
        "model": "AXS-AR1 Card Reader",
        "interface": "USB 3.0"
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
          "lensType": "spherical"
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
          "lensType": "spherical"
        },
        "ZEISS High Speed MK III 35mm T1.3": {
          "brand": "ZEISS",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS High Speed MK III 50mm T1.3": {
          "brand": "ZEISS",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS High Speed MK III 65mm T1.3": {
          "brand": "ZEISS",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS High Speed MK III 85mm T1.3": {
          "brand": "ZEISS",
          "frontDiameterMm": 80,
          "clampOn": true,
          "tStop": 1.3,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "mount": "PL",
          "rodStandard": "19mm",
          "rodLengthCm": 60,
          "needsLensSupport": true,
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "lensType": "spherical"
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
        "ZEISS Master Prime 14mm T1.3": {
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
          "notes": "Full-frame coverage; T2.9–22. Source: ZEISS Cinema Zoom brochure (accessed 2025-09-14)."
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
          "notes": "Full-frame coverage; T2.9–22. Appears in your PDF gear list. Sources: ZEISS brochure (accessed 2025-09-14); internal list."
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
          "notes": "Full-frame coverage; T2.9–22. Appears in your PDF gear list. Source: ZEISS brochure (accessed 2025-09-14)."
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
          "notes": "ANSI Super 35 coverage; 11 iris blades; T2.9–22; front Ø 114 mm. Source: ZEISS technical data (accessed 2025-09-14)."
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
          "lensType": "spherical"
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
          "lensType": "spherical"
        },
        "ZEISS Supreme Prime Radiance 29mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS Supreme Prime Radiance 35mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "ZEISS Supreme Prime Radiance 40mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "lensType": "spherical"
        },
        "ZEISS Supreme Prime Radiance 135mm T1.5": {
          "brand": "ZEISS",
          "frontDiameterMm": 95,
          "clampOn": true,
          "tStop": 1.5,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "lensType": "spherical"
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
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.8,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 16mm T2.8": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.8,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 21mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 25mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 35mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 40mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 50mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 75mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 90mm T2.8 Macro": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.8,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 100mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime 125mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Retro 16mm T2.8": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.8,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Retro 25mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Retro 35mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Retro 50mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Retro 75mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Retro 100mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Retro 125mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Cyber 35mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 86,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Cyber 50mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 86,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Cyber 75mm T2.1": {
          "brand": "DZOFILM",
          "frontDiameterMm": 86,
          "clampOn": true,
          "tStop": 2.1,
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical"
        },
        "DZOFILM Vespid Prime II 18mm T1.9": {
          "brand": "DZOFILM",
          "frontDiameterMm": 77,
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
          "frontDiameterMm": 77,
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
          "frontDiameterMm": 77,
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
          "frontDiameterMm": 77,
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
          "frontDiameterMm": 77,
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
          "frontDiameterMm": 77,
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
