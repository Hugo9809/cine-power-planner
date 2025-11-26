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
        "powerDrawWatts": 3,
        "compatible": [
          "Sony Venice",
          "Sony Venice 2",
          "Sony F55"
        ],
        "isPersonalGear": false,
        "listOfOrigin": "240315_Detective_von_Fock_Equipment_B-Cam_Rental.pdf"
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
      "SmallHD Cine 24\" 4K High-Bright Monitor": {
        "brand": "SmallHD",
        "model": "Cine 24",
        "screenSizeInches": 24,
        "brightnessNits": 1350,
        "powerDrawWatts": 128,
        "power": {
          "input": {
            "voltageRange": "12-34",
            "type": "XLR 3-pin"
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
      "SmallHD 1303 HDR": {
        "brand": "SmallHD",
        "model": "1303 HDR",
        "screenSizeInches": 13,
        "brightnessNits": 1500,
        "powerDrawWatts": 39,
        "power": {
          "input": [
            {
              "type": "XLR"
            },
            {
              "type": "D-Tap"
            }
          ],
          "output": null
        },
        "notes": "Typical draw ranges from 25-39 W depending on load.",
        "wirelessTx": false,
        "videoInputs": [
          {
            "type": "3G-SDI"
          },
          {
            "type": "HDMI"
          }
        ],
        "videoOutputs": [
          {
            "type": "3G-SDI"
          },
          {
            "type": "HDMI"
          }
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
            {
              "type": "XLR 4-pin"
            },
            {
              "type": "V-Mount"
            },
            {
              "type": "Gold-Mount"
            }
          ],
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [
          {
            "type": "12G-SDI"
          },
          {
            "type": "HDMI"
          }
        ],
        "videoOutputs": [
          {
            "type": "12G-SDI"
          },
          {
            "type": "HDMI"
          }
        ]
      },
      "SEETEC P133-9HSD": {
        "brand": "SEETEC",
        "model": "P133-9HSD",
        "screenSizeInches": 13.3,
        "brightnessNits": 400,
        "powerDrawWatts": 12,
        "power": {
          "input": [
            {
              "type": "DC"
            },
            {
              "type": "Battery Plate"
            }
          ],
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [
          {
            "type": "3G-SDI"
          },
          {
            "type": "HDMI"
          },
          {
            "type": "Composite"
          },
          {
            "type": "DVI-I"
          }
        ],
        "videoOutputs": [
          {
            "type": "3G-SDI"
          },
          {
            "type": "HDMI"
          }
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
            {
              "type": "XLR 4-pin"
            },
            {
              "type": "AC"
            },
            {
              "type": "V-Mount"
            }
          ],
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [
          {
            "type": "12G-SDI",
            "notes": "4x"
          },
          {
            "type": "HDMI 2.0"
          },
          {
            "type": "SFP Fiber",
            "notes": "optional"
          }
        ],
        "videoOutputs": [
          {
            "type": "12G-SDI",
            "notes": "4x"
          }
        ]
      },
      "SWIT S-1173F": {
        "brand": "SWIT",
        "model": "S-1173F",
        "screenSizeInches": 17.3,
        "brightnessNits": 300,
        "powerDrawWatts": 32,
        "power": {
          "input": [
            {
              "type": "XLR 4-pin"
            },
            {
              "type": "V-Mount"
            },
            {
              "type": "Gold-Mount"
            }
          ],
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [
          {
            "type": "3G-SDI",
            "notes": "2x"
          },
          {
            "type": "HDMI"
          },
          {
            "type": "Y/Pb/Pr"
          },
          {
            "type": "VGA"
          },
          {
            "type": "CVBS"
          }
        ],
        "videoOutputs": [
          {
            "type": "3G-SDI",
            "notes": "loop"
          },
          {
            "type": "HDMI",
            "notes": "loop"
          }
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
            {
              "type": "AC"
            },
            {
              "type": "XLR"
            },
            {
              "type": "V-Mount"
            }
          ],
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [
          {
            "type": "3G-SDI",
            "notes": "2x in"
          },
          {
            "type": "HDMI 1.4"
          },
          {
            "type": "USB-A"
          },
          {
            "type": "USB-C"
          }
        ],
        "videoOutputs": [
          {
            "type": "3G-SDI",
            "notes": "2x out"
          }
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
            {
              "type": "AC"
            },
            {
              "type": "XLR"
            },
            {
              "type": "V-Mount"
            }
          ],
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [
          {
            "type": "3G-SDI",
            "notes": "2x in"
          },
          {
            "type": "HDMI 1.4"
          },
          {
            "type": "USB-A"
          },
          {
            "type": "USB-C"
          }
        ],
        "videoOutputs": [
          {
            "type": "3G-SDI",
            "notes": "2x loop"
          },
          {
            "type": "HDMI",
            "notes": "loop"
          }
        ]
      },
      "Sony PVM-X1800": {
        "brand": "Sony",
        "model": "PVM-X1800",
        "screenSizeInches": 18.4,
        "brightnessNits": 1000,
        "powerDrawWatts": 98,
        "power": {
          "input": {
            "type": "AC"
          },
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [
          {
            "type": "SDI"
          },
          {
            "type": "HDMI"
          }
        ],
        "videoOutputs": []
      },
      "Sony LMD-A170": {
        "brand": "Sony",
        "model": "LMD-A170",
        "screenSizeInches": 17,
        "brightnessNits": null,
        "powerDrawWatts": 42,
        "power": {
          "input": [
            {
              "type": "AC"
            },
            {
              "type": "DC"
            }
          ],
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [
          {
            "type": "3G-SDI"
          },
          {
            "type": "HDMI"
          },
          {
            "type": "Composite/Component"
          }
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
          "input": {
            "type": "AC"
          },
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [
          {
            "type": "RGB"
          },
          {
            "type": "Composite"
          }
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
          "input": {
            "type": "AC"
          },
          "output": null
        },
        "notes": "Rated 23-35 W depending on settings.",
        "wirelessTx": false,
        "videoInputs": [
          {
            "type": "3G-SDI",
            "notes": "2x"
          },
          {
            "type": "DisplayPort"
          },
          {
            "type": "DVI-D"
          }
        ],
        "videoOutputs": [
          {
            "type": "3G-SDI",
            "notes": "2x"
          }
        ]
      },
      "Flanders Scientific DM170": {
        "brand": "Flanders Scientific",
        "model": "DM170",
        "screenSizeInches": 17,
        "brightnessNits": null,
        "powerDrawWatts": 32,
        "power": {
          "input": {
            "type": "AC"
          },
          "output": null
        },
        "notes": "Rated 21-32 W depending on configuration.",
        "wirelessTx": false,
        "videoInputs": [
          {
            "type": "3G-SDI"
          }
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
            {
              "type": "XLR 4-pin",
              "notes": "24V DC"
            },
            {
              "type": "V-Mount",
              "notes": "optional plate"
            }
          ],
          "output": null
        },
        "notes": "Consumes approximately 35-220 W depending on HDR mode.",
        "wirelessTx": false,
        "videoInputs": [
          {
            "type": "12G-SDI",
            "notes": "4x"
          }
        ],
        "videoOutputs": [
          {
            "type": "12G-SDI",
            "notes": "4x loop"
          }
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
            {
              "voltageRange": "10-24",
              "type": "DC"
            },
            {
              "type": "V-Mount"
            }
          ],
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [
          {
            "type": "HDMI"
          },
          {
            "type": "SDI"
          },
          {
            "type": "VGA"
          }
        ],
        "videoOutputs": [
          {
            "type": "HDMI"
          },
          {
            "type": "SDI"
          },
          {
            "type": "VGA"
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
    "iosVideo": {
      "Teradek - Serv 4K v2": {
        "powerDrawWatts": 18,
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
      "Teradek - Link AX WifiRouter/Access Point": {
        "powerDrawWatts": 17.5,
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
        "notes": "Streams to iOS devices for on-set monitoring; includes Link AX Wi-Fi router/access point"
      }
    },
    "videoAssist": {},
    "media": {},
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
          "rodStandard": "15mm"
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
          "rodStandard": "15mm"
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
          "weight_g": 707,
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
          "weight_g": 2272,
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
          "weight_g": 893,
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
        "BPM Filter Set": {
          "brand": "Tiffen"
        },
        "WPM Filter Set": {
          "brand": "Tiffen"
        },
        "PM Filter Set": {
          "brand": "Tiffen"
        },
        "IRND Filter Set": {
          "brand": "ARRI"
        },
        "FSND Filter Set": {
          "brand": "ARRI"
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
          "capacity": 21.6,
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
            "to": "LEMO 2-pin",
            "lengthM": 0.5,
            "connectors": [
              "D-Tap",
              "LEMO 0B 2-pin"
            ]
          },
          "D-Tap Splitter 3-way": {
            "from": "D-Tap",
            "to": [
              "D-Tap",
              "D-Tap",
              "D-Tap"
            ],
            "lengthM": 0.2,
            "connectors": [
              "D-Tap input",
              "D-Tap outputs"
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
            "type": "3G/6G-SDI",
            "lengthM": 1,
            "notes": "75 Ω, 3G/6G-SDI rated (typical)"
          },
          "HDMI Cable": {
            "type": "HDMI",
            "lengthM": 1,
            "notes": "High Speed/18 Gbps (typical set use)"
          },
          "Ultraslim BNC Cable 0.3 m": {
            "type": "3G-SDI",
            "lengthM": 0.3,
            "notes": "OD ~2.5–3.0 mm micro-coax for lightweight rigging"
          },
          "Ultraslim BNC Cable 0.5 m": {
            "type": "3G-SDI",
            "lengthM": 0.5,
            "notes": "OD ~2.5–3.0 mm micro-coax for lightweight rigging"
          },
          "Ultraslim HDMI 0.5 m": {
            "type": "HDMI",
            "lengthM": 0.5,
            "notes": "Flexible thin cable for gimbal/cage routing"
          },
          "BNC Cable 0.5 m": {
            "type": "3G-SDI",
            "lengthM": 0.5,
            "notes": "75 Ω SDI patch"
          },
          "BNC Cable 1 m": {
            "type": "3G-SDI",
            "lengthM": 1,
            "notes": "75 Ω SDI patch"
          },
          "BNC Cable 5 m": {
            "type": "3G-SDI",
            "lengthM": 5,
            "notes": "75 Ω SDI run"
          },
          "BNC Cable 10 m": {
            "type": "3G-SDI",
            "lengthM": 10,
            "notes": "75 Ω SDI run"
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
            "from": "LBUS 4-pin (LEMO)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": [
              "LBUS 4-pin (LEMO)",
              "LBUS 4-pin (LEMO)"
            ],
            "orientation": "straight-straight",
            "type": "LBUS data/power cable",
            "compatibleDevices": [
              "ARRI cforce mini",
              "ARRI cforce mini RF",
              "ARRI cforce plus",
              "ARRI Master Grips",
              "ARRI OCU-1",
              "ARRI RIA-1",
              "ARRI NIA-1"
            ],
            "compatibleControllers": [
              "ARRI OCU-1",
              "ARRI Master Grips",
              "ARRI Hi-5 (via RIA-1/LCUBE)"
            ],
            "compatibleCameras": [
              "ARRI ALEXA Mini",
              "ARRI ALEXA Mini LF",
              "ARRI ALEXA 35 (via RIA-1 / EF Mount LBUS)"
            ],
            "notes": "Generic LBUS interconnect for chaining LBUS devices.",
            "useCase": [
              "Daisy-chain ARRI LBUS devices (e.g., cforce motors, RIA-1, NIA-1, LCUBE, Master Grips)"
            ],
            "provenance": [
              {
                "url": "https://www.arri.com/en/camera-systems/electronic-control-system/lens-motors-and-encoders"
              },
              {
                "url": "https://www.arri.com/en/camera-systems/camera-components/lens-mounts-and-adapters/arri-ef-mount-lbus"
              },
              {
                "url": "https://shop.arri.com/Products/Camera-Stabilizer-Systems/"
              }
            ]
          },
          "LBUS to LBUS 0,2m": {
            "brand": "ARRI",
            "kNumber": "K2.0006749",
            "from": "LBUS 4-pin (LEMO)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": [
              "LBUS 4-pin (LEMO)",
              "LBUS 4-pin (LEMO)"
            ],
            "lengthM": 0.2,
            "orientation": "straight-straight",
            "type": "LBUS data/power cable",
            "compatibleDevices": [
              "ARRI cforce mini",
              "ARRI Master Grips",
              "ARRI OCU-1",
              "ARRI RIA-1",
              "ARRI NIA-1"
            ],
            "compatibleControllers": [
              "ARRI OCU-1",
              "ARRI Master Grips",
              "ARRI Hi-5 (via RIA-1/LCUBE)"
            ],
            "compatibleCameras": [
              "ARRI ALEXA Mini",
              "ARRI ALEXA Mini LF"
            ],
            "notes": "Short jumper for closely mounted LBUS devices.",
            "useCase": [
              "Daisy-chain ARRI LBUS devices (e.g., cforce motors, RIA-1, NIA-1, LCUBE, Master Grips)"
            ],
            "provenance": [
              {
                "url": "https://www.arri.com/en/camera-systems/camera-stabilizer-systems/trinity-2-and-artemis-2/trinity-2/trinity-2-cables"
              }
            ]
          },
          "LBUS to LBUS 0,3m": {
            "brand": "ARRI",
            "kNumber": "K2.0006750",
            "from": "LBUS 4-pin (LEMO)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": [
              "LBUS 4-pin (LEMO)",
              "LBUS 4-pin (LEMO)"
            ],
            "lengthM": 0.3,
            "orientation": "straight-straight",
            "type": "LBUS data/power cable",
            "compatibleDevices": [
              "ARRI cforce mini",
              "ARRI Master Grips",
              "ARRI OCU-1",
              "ARRI RIA-1",
              "ARRI NIA-1"
            ],
            "compatibleControllers": [
              "ARRI OCU-1",
              "ARRI Master Grips"
            ],
            "compatibleCameras": [
              "ARRI ALEXA Mini",
              "ARRI ALEXA Mini LF"
            ],
            "useCase": [
              "Daisy-chain ARRI LBUS devices (e.g., cforce motors, RIA-1, NIA-1, LCUBE, Master Grips)"
            ],
            "provenance": [
              {
                "url": "https://www.arri.com/en/camera-systems/camera-stabilizer-systems/trinity-2-and-artemis-2/trinity-2/trinity-2-cables"
              }
            ]
          },
          "LBUS to LBUS 0,4m": {
            "brand": "ARRI",
            "from": "LBUS 4-pin (LEMO)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": [
              "LBUS 4-pin (LEMO)",
              "LBUS 4-pin (LEMO)"
            ],
            "lengthM": 0.4,
            "orientation": "straight-straight",
            "type": "LBUS data/power cable",
            "compatibleDevices": [
              "ARRI cforce mini",
              "ARRI Master Grips",
              "ARRI OCU-1",
              "ARRI RIA-1",
              "ARRI NIA-1"
            ],
            "compatibleControllers": [
              "ARRI OCU-1",
              "ARRI Master Grips"
            ],
            "compatibleCameras": [
              "ARRI ALEXA Mini",
              "ARRI ALEXA Mini LF"
            ],
            "notes": "ARRI lists 0.2/0.3/0.5/0.8/1.5 m as standard lengths; 0.4 m variant not found on manufacturer lists.",
            "useCase": [
              "Daisy-chain ARRI LBUS devices (e.g., cforce motors, RIA-1, NIA-1, LCUBE, Master Grips)"
            ],
            "provenance": [
              {
                "url": "https://www.arri.com/en/camera-systems/camera-stabilizer-systems/trinity-2-and-artemis-2/trinity-2/trinity-2-cables"
              }
            ]
          },
          "LBUS to LBUS 0,5m": {
            "brand": "ARRI",
            "kNumber": "K2.0006751",
            "from": "LBUS 4-pin (LEMO)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": [
              "LBUS 4-pin (LEMO)",
              "LBUS 4-pin (LEMO)"
            ],
            "lengthM": 0.5,
            "orientation": "straight-straight",
            "type": "LBUS data/power cable",
            "compatibleDevices": [
              "ARRI cforce mini",
              "ARRI Master Grips",
              "ARRI OCU-1",
              "ARRI RIA-1",
              "ARRI NIA-1"
            ],
            "compatibleControllers": [
              "ARRI OCU-1",
              "ARRI Master Grips"
            ],
            "compatibleCameras": [
              "ARRI ALEXA Mini",
              "ARRI ALEXA Mini LF"
            ],
            "useCase": [
              "Daisy-chain ARRI LBUS devices (e.g., cforce motors, RIA-1, NIA-1, LCUBE, Master Grips)"
            ],
            "provenance": [
              {
                "url": "https://www.arri.com/en/camera-systems/camera-stabilizer-systems/trinity-2-and-artemis-2/trinity-2/trinity-2-cables"
              }
            ]
          },
          "ARRI Right-Angle LBUS to LBUS 0,6m": {
            "brand": "ARRI",
            "kNumber": "K2.0013040",
            "connectors": [
              "LBUS 4-pin (LEMO) right-angle",
              "LBUS 4-pin (LEMO) right-angle"
            ],
            "lengthM": 0.6,
            "from": "LBUS 4-pin (LEMO) right-angle",
            "to": "LBUS 4-pin (LEMO) right-angle",
            "orientation": "right-angle to right-angle",
            "type": "LBUS data/power cable",
            "compatibleDevices": [
              "ARRI Master Grips",
              "ARRI cforce mini",
              "ARRI OCU-1",
              "ARRI RIA-1",
              "ARRI NIA-1"
            ],
            "compatibleControllers": [
              "ARRI OCU-1",
              "ARRI Master Grips"
            ],
            "compatibleCameras": [
              "ARRI ALEXA family (via LBUS accessories)"
            ],
            "useCase": [
              "Daisy-chain ARRI LBUS devices (e.g., cforce motors, RIA-1, NIA-1, LCUBE, Master Grips)"
            ],
            "provenance": [
              {
                "url": "https://www.bhphotovideo.com/c/product/1310382-REG/arri_k2_0013040_cable_lbus_angled_to.html"
              },
              {
                "url": "https://www.arri.com/en/camera-systems/electronic-control-system/lens-motors-and-encoders"
              }
            ]
          },
          "Cable UDM – SERIAL (7p) 1,5m": {
            "brand": "ARRI",
            "kNumber": "K2.65144.0",
            "connectors": [
              "LEMO 7-pin (UDM Serial)",
              "LEMO 7-pin Serial"
            ],
            "from": "ARRI UDM-1",
            "to": "ARRI UMC-4 / LCUBE Serial",
            "lengthM": 1.5,
            "orientation": "straight",
            "type": "UDM serial cable",
            "compatibleDevices": [
              "ARRI UDM-1",
              "ARRI LCUBE CUB-1",
              "ARRI UMC-4"
            ],
            "compatibleControllers": [
              "ARRI UMC-4",
              "ARRI LCUBE CUB-1"
            ],
            "notes": "Connects UDM-1 to UMC-4 or LCUBE CUB-1 serial.",
            "useCase": [
              "Connect ARRI UDM-1 to ARRI UMC / LCUBE CUB-1"
            ],
            "provenance": [
              {
                "url": "https://www.arri.com/en/camera-systems/electronic-control-system/lcubes"
              },
              {
                "url": "https://www.filmtools.com/arri-cable-udm-serial-7p-1-5m-5ft.html"
              }
            ]
          },
          "Cable UDM – SERIAL (4p) 0,5m": {
            "brand": "ARRI",
            "kNumber": "K2.0025324",
            "connectors": [
              "LEMO 4-pin Serial",
              "LEMO 4-pin Serial"
            ],
            "from": "ARRI UDM-1 Serial (LEMO 4-pin)",
            "to": "ARRI RIA-1 / ALEXA 35 Serial",
            "lengthM": 0.5,
            "orientation": "straight",
            "type": "UDM serial cable",
            "compatibleDevices": [
              "ARRI UDM-1"
            ],
            "compatibleControllers": [
              "ARRI RIA-1"
            ],
            "compatibleCameras": [
              "ARRI ALEXA 35 (front SERIAL port)"
            ],
            "notes": "Connects UDM-1 to SERIAL on RIA-1 or ALEXA 35.",
            "useCase": [
              "Connect ARRI UDM-1 to SERIAL port on RIA-1 / ALEXA 35"
            ],
            "provenance": [
              {
                "url": "https://www.bhphotovideo.com/c/product/1665189-REG/arri_k2_0025324_udm_serial_cable.html"
              },
              {
                "url": "https://www.videocineimport.com/wp-content/uploads/2025/02/4.1.3-RIA-1-Cable-Guide.pdf"
              }
            ]
          },
          "Cable CAM (7-pin) – LBUS 0,3m": {
            "brand": "ARRI",
            "from": "CAM (LEMO 7-pin)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": [
              "CAM 7-pin (LEMO)",
              "LBUS 4-pin (LEMO)"
            ],
            "lengthM": 0.3,
            "orientation": "straight",
            "type": "CAM-to-LBUS interface cable",
            "compatibleDevices": [
              "ARRI cforce RF motor",
              "cmotion cPRO motor",
              "cmotion cPRO camin"
            ],
            "notes": "Short length variant not listed with ARRI part number; 0.5 m version is K2.0015760.",
            "useCase": [
              "LBUS data and power bridge"
            ],
            "provenance": [
              {
                "url": "https://hotrodcameras.com/products/arri-cable-cam-7p-lbus-1-6"
              },
              {
                "url": "https://www.bhphotovideo.com/c/product/1405163-REG/arri_k2_0015760_cable_cam_7p_lbus.html"
              }
            ]
          },
          "Cable CAM (7-pin) – LBUS 0,5m": {
            "brand": "ARRI",
            "kNumber": "K2.0015760",
            "from": "CAM (LEMO 7-pin)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": [
              "CAM 7-pin (LEMO)",
              "LBUS 4-pin (LEMO)"
            ],
            "lengthM": 0.5,
            "orientation": "straight",
            "type": "CAM-to-LBUS interface cable",
            "compatibleDevices": [
              "ARRI cforce RF motor",
              "cmotion cPRO motor",
              "cmotion cPRO camin"
            ],
            "useCase": [
              "LBUS data and power bridge"
            ],
            "provenance": [
              {
                "url": "https://www.bhphotovideo.com/c/product/1405163-REG/arri_k2_0015760_cable_cam_7p_lbus.html"
              },
              {
                "url": "https://hotrodcameras.com/products/arri-cable-cam-7p-lbus-1-6"
              }
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
            "connectors": [
              "LEMO 4-pin Serial",
              "LEMO 4-pin Serial"
            ],
            "lengthM": 0.8,
            "orientation": "straight",
            "type": "Serial distance cable",
            "compatibleDevices": [
              "CineTape (Monitored by ARRI LCS)"
            ],
            "compatibleControllers": [
              "ARRI RIA-1",
              "ARRI UMC-4 (via LCUBE)"
            ],
            "compatibleCameras": [
              "ARRI ALEXA 35 (front SERIAL port)"
            ],
            "notes": "Generic spec based on ARRI serial ecosystem; specific ARRI part number for CineTape cable not found.",
            "useCase": [
              "Serial distance data"
            ],
            "provenance": [
              {
                "url": "https://www.arri.com/resource/blob/245986/fe6f9d9dbad1a92fc2440a4eff558b6b/4-1-8-hi-5-and-ria-1-sample-configurations-3rd-party-data.pdf"
              }
            ]
          },
          "Cine RT to ARRI RIA-1 / ALEXA 35": {
            "brand": "Focusbug",
            "kNumber": "CRT-YSP-RIA (family)",
            "connectors": [
              "LEMO 6-pin right-angle + LEMO 2-pin right-angle",
              "LEMO 4-pin (straight, Serial)"
            ],
            "from": "Cine RT Base (serial + power RA)",
            "to": "ARRI RIA-1 / ALEXA 35 SERIAL",
            "lengthM": 0.6,
            "orientation": "Right-angle on Cine RT side; straight on camera/RIA-1 side",
            "type": "Serial Y cable (with power)",
            "compatibleDevices": [
              "Focusbug Cine RT Base Sensor"
            ],
            "compatibleControllers": [
              "ARRI RIA-1"
            ],
            "compatibleCameras": [
              "ARRI ALEXA 35 (front SERIAL)"
            ],
            "notes": "Provides serial data and filtered power from RIA-1/ALEXA 35 to Cine RT.",
            "useCase": [
              "Connect Cine RT Base to ARRI RIA-1 or ALEXA 35 SERIAL with power injection"
            ],
            "provenance": [
              {
                "url": "https://www.focusbug.com/order/system-accessories-cables-order/"
              },
              {
                "url": "https://cvp.com/product/focusbug-y-cable-cine-rt-lemo-cable-crt-ysp-ria-r2"
              },
              {
                "url": "https://www.videocineimport.com/wp-content/uploads/2025/02/4.1.3-RIA-1-Cable-Guide.pdf"
              }
            ]
          },
          "D-Tap to Lemo-2-pin Cable 0,3m": {
            "brand": "ARRI",
            "kNumber": "K2.0006758",
            "from": "D-Tap (Anton/Bauer 2-pin)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": [
              "D-Tap (Anton/Bauer 2-pin)",
              "LBUS 4-pin (LEMO)"
            ],
            "lengthM": 0.3,
            "orientation": "straight",
            "type": "LBUS power cable",
            "compatibleDevices": [
              "ARRI Master Grips",
              "ARRI OCU-1",
              "ARRI cforce motors (LBUS power)"
            ],
            "compatibleControllers": [
              "ARRI OCU-1",
              "ARRI Master Grips"
            ],
            "notes": "Standard ARRI length is 0.8 m; 0.3 m variant not listed by ARRI—treated as short custom lead.",
            "useCase": [
              "Power"
            ],
            "provenance": [
              {
                "url": "https://www.arri.com/resource/blob/296408/479a0d9b446577b2544678c534526107/master-grips-sup-2-0-2-release-notes-data.pdf"
              },
              {
                "url": "https://www.arri.com/en/camera-systems/electronic-control-system/lcubes"
              }
            ]
          },
          "D-Tap to Lemo-2-pin Cable 0,5m": {
            "brand": "ARRI",
            "kNumber": "K2.0006758",
            "from": "D-Tap (Anton/Bauer 2-pin)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": [
              "D-Tap (Anton/Bauer 2-pin)",
              "LBUS 4-pin (LEMO)"
            ],
            "lengthM": 0.5,
            "orientation": "straight",
            "type": "LBUS power cable",
            "compatibleDevices": [
              "ARRI Master Grips",
              "ARRI OCU-1",
              "ARRI cforce motors (LBUS power)"
            ],
            "compatibleControllers": [
              "ARRI OCU-1",
              "ARRI Master Grips"
            ],
            "notes": "Standard ARRI length is 0.8 m; 0.5 m variant not listed by ARRI—treated as short custom lead.",
            "useCase": [
              "Power"
            ],
            "provenance": [
              {
                "url": "https://www.arri.com/resource/blob/296408/479a0d9b446577b2544678c534526107/master-grips-sup-2-0-2-release-notes-data.pdf"
              }
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
            "kNumber": "K2.0006760",
            "from": "LBUS 4-pin (LEMO 0B)",
            "to": "XLR 4-pin",
            "connectors": [
              "LBUS 4-pin (LEMO 0B)",
              "XLR 4-pin"
            ],
            "lengthM": 0.8,
            "orientation": "straight",
            "type": "LBUS power breakout",
            "compatibleDevices": [
              "Monitors with XLR-4 12V input",
              "ARRI LBUS-powered accessories (as source)"
            ],
            "notes": "LBUS power to XLR-4 (12 V) per ARRI LCUBE/UMC ecosystem cable list.",
            "useCase": [
              "Power"
            ],
            "provenance": [
              {
                "url": "https://www.arri.com/en/camera-systems/electronic-control-system/lcubes"
              }
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
          "brand": "Ovide",
          "screenSizeInches": 17
        },
        "Video Devices PIX-E5 5\" Recorder": {
          "brand": "Video Devices",
          "screenSizeInches": 5
        }
      },
      "media": {
        "ARRI Codex Compact Drive 1TB": {
          "brand": "ARRI",
          "model": "Codex Compact Drive 1TB",
          "sourceUrl": "https://www.arri.com/en/camera-systems/camera-components/recording-media/codex-compact-drive",
          "kNumber": "K2.0044880",
          "capacityGb": 960,
          "capacityTb": 1,
          "interface": "PCIe, sustained ~8 Gb/s write"
        },
        "ARRI Codex Compact Drive 2TB": {
          "brand": "ARRI",
          "model": "Codex Compact Drive 2TB",
          "sourceUrl": "https://www.arri.com/en/camera-systems/camera-components/recording-media/codex-compact-drive",
          "kNumber": "K2.0044881",
          "capacityGb": 1920,
          "capacityTb": 2,
          "interface": "PCIe NVMe, up to 16 Gb/s write"
        },
        "ARRI Codex Compact Drive Express 1TB": {
          "brand": "ARRI",
          "model": "Codex Compact Drive Express 1TB",
          "sourceUrl": "https://www.arri.com/en/camera-systems/camera-components/recording-media/codex-compact-drive",
          "kNumber": "K2.0046663",
          "capacityGb": 960,
          "capacityTb": 1,
          "interface": "PCIe (ProRes-only)"
        },
        "Angelbird AV PRO CFexpress Type A 256GB (v4)": {
          "brand": "Angelbird",
          "model": "AV PRO CFexpress A 256GB (v4)",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFexpress Type A (v4, PCIe 4.0)",
          "notes": "Angelbird v4 Type A card delivering 1800 MB/s read and 1650 MB/s write"
        },
        "Angelbird AV PRO CFexpress Type A 512GB (v4)": {
          "brand": "Angelbird",
          "model": "AV PRO CFexpress A 512GB (v4)",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type A (v4, PCIe 4.0)",
          "notes": "Same high-performance v4 technology"
        },
        "Angelbird AV PRO CFexpress Type A 1TB": {
          "brand": "Angelbird",
          "model": "AV PRO CFexpress A 1TB",
          "sourceUrl": "https://www.angelbird.com/prod/av-pro-cfexpress-a-3444/",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress Type A (v4)",
          "notes": "High-capacity v4 Type A card"
        },
        "Angelbird AV PRO SE CFexpress Type A 160GB": {
          "brand": "Angelbird",
          "model": "AV PRO SE CFexpress A 160GB",
          "sourceUrl": "https://www.angelbird.com/prod/av-pro-se-cfexpress-a-3448/",
          "kNumber": null,
          "capacityGb": 160,
          "capacityTb": 0.16,
          "interface": "CFexpress Type A (2.0)"
        },
        "Angelbird AV PRO SE CFexpress Type A 330GB": {
          "brand": "Angelbird",
          "model": "AV PRO SE CFexpress A 330GB",
          "sourceUrl": "https://www.angelbird.com/prod/av-pro-se-cfexpress-a-3448/",
          "kNumber": null,
          "capacityGb": 330,
          "capacityTb": 0.33,
          "interface": "CFexpress Type A (2.0)"
        },
        "Angelbird AV PRO SE CFexpress Type B 512GB (v4 Mk2)": {
          "brand": "Angelbird",
          "model": "AV PRO SE CFexpress B v4 Mk2 512GB",
          "sourceUrl": "https://www.angelbird.com/prod/av-pro-se-cfexpress-b-v4-mk2-3513/",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type B (v4)"
        },
        "Angelbird AV PRO SE CFexpress Type B 1TB (v4 Mk2)": {
          "brand": "Angelbird",
          "model": "AV PRO SE CFexpress B v4 Mk2 1TB",
          "sourceUrl": "https://www.angelbird.com/prod/av-pro-se-cfexpress-b-v4-mk2-3513/",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress Type B (v4)"
        },
        "Angelbird AV PRO SE CFexpress Type B 2TB (v4 Mk2)": {
          "brand": "Angelbird",
          "model": "AV PRO SE CFexpress B v4 Mk2 2TB",
          "sourceUrl": "https://www.angelbird.com/prod/av-pro-se-cfexpress-b-v4-mk2-3513/",
          "kNumber": null,
          "capacityGb": 2048,
          "capacityTb": 2,
          "interface": "CFexpress Type B (v4)"
        },
        "Angelbird AV PRO SE CFexpress Type B 4TB (v4 Mk2)": {
          "brand": "Angelbird",
          "model": "AV PRO SE CFexpress B v4 Mk2 4TB",
          "sourceUrl": "https://www.angelbird.com/prod/av-pro-se-cfexpress-b-v4-mk2-3513/",
          "kNumber": null,
          "capacityGb": 4096,
          "capacityTb": 4,
          "interface": "CFexpress Type B (v4)"
        },
        "Angelbird AV PRO CF CFast 512GB": {
          "brand": "Angelbird",
          "model": "AV PRO CF 512GB (CFast 2.0)",
          "sourceUrl": "https://www.angelbird.com/prod/av-pro-cf-1350/",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFast 2.0"
        },
        "Angelbird AV PRO CF CFast 1TB": {
          "brand": "Angelbird",
          "model": "AV PRO CF 1TB (CFast 2.0)",
          "sourceUrl": "https://www.angelbird.com/prod/av-pro-cf-1350/",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFast 2.0"
        },
        "Angelbird AV PRO SE CF CFast 256GB": {
          "brand": "Angelbird",
          "model": "AV PRO SE CF 256GB (CFast 2.0)",
          "sourceUrl": "https://www.angelbird.com/prod/av-pro-cf-se-3417/",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFast 2.0"
        },
        "Angelbird AV PRO SD V90 64GB": {
          "brand": "Angelbird",
          "model": "AV PRO SD V90 64GB",
          "sourceUrl": "https://www.angelbird.com/prod/av-pro-sd-v90-mk2-2400/",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "SDXC UHS-II (V90)"
        },
        "Angelbird AV PRO SD V90 128GB": {
          "brand": "Angelbird",
          "model": "AV PRO SD V90 128GB",
          "sourceUrl": "https://www.angelbird.com/prod/av-pro-sd-v90-mk2-2400/",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "SDXC UHS-II (V90)"
        },
        "Angelbird AV PRO SD V90 256GB": {
          "brand": "Angelbird",
          "model": "AV PRO SD V90 256GB",
          "sourceUrl": "https://www.angelbird.com/prod/av-pro-sd-v90-mk2-2400/",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "SDXC UHS-II (V90)"
        },
        "Angelbird AV PRO SD V90 512GB": {
          "brand": "Angelbird",
          "model": "AV PRO SD V90 512GB",
          "sourceUrl": "https://www.angelbird.com/prod/av-pro-sd-v90-mk2-2400/",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "SDXC UHS-II (V90)"
        },
        "Angelbird AV PRO SD V30 64GB": {
          "brand": "Angelbird",
          "model": "AV PRO SD V30 64GB",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "SDXC UHS-I (V30)",
          "notes": "Angelbird’s V30 SD card uses a UHS-I bus and guarantees sustained write speeds around 50 MB/s"
        },
        "Angelbird AV PRO SD V30 128GB": {
          "brand": "Angelbird",
          "model": "AV PRO SD V30 128GB",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "SDXC UHS-I (V30)",
          "notes": "Part of the same V30 line, supporting the same interface and performance"
        },
        "Angelbird AV PRO SD V30 256GB": {
          "brand": "Angelbird",
          "model": "AV PRO SD V30 256GB",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "SDXC UHS-I (V30)",
          "notes": "Largest capacity in the V30 series with the same V30 rating"
        },
        "Angelbird AV PRO SD V60 64GB (MK2)": {
          "brand": "Angelbird",
          "model": "AV PRO SD V60 (MK2) 64GB",
          "sourceUrl": "https://www.angelbird.com/category/sdxctm-uhs-i-uhs-ii-38/",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "SDXC UHS-II (V60)"
        },
        "Angelbird AV PRO SD V60 128GB (MK2)": {
          "brand": "Angelbird",
          "model": "AV PRO SD V60 (MK2) 128GB",
          "sourceUrl": "https://www.angelbird.com/category/sdxctm-uhs-i-uhs-ii-38/",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "SDXC UHS-II (V60)"
        },
        "Angelbird AV PRO SD V60 256GB (MK2)": {
          "brand": "Angelbird",
          "model": "AV PRO SD V60 (MK2) 256GB",
          "sourceUrl": "https://www.angelbird.com/category/sdxctm-uhs-i-uhs-ii-38/",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "SDXC UHS-II (V60)"
        },
        "Angelbird AV PRO SD V60 512GB (MK2)": {
          "brand": "Angelbird",
          "model": "AV PRO SD V60 (MK2) 512GB",
          "sourceUrl": "https://www.angelbird.com/category/sdxctm-uhs-i-uhs-ii-38/",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "SDXC UHS-II (V60)"
        },
        "Angelbird AV PRO SD V60 1TB (MK2)": {
          "brand": "Angelbird",
          "model": "AV PRO SD V60 (MK2) 1TB",
          "sourceUrl": "https://www.angelbird.com/category/sdxctm-uhs-i-uhs-ii-38/",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "SDXC UHS-II (V60)"
        },
        "Angelbird AV PRO microSD V30 128GB": {
          "brand": "Angelbird",
          "model": "AV PRO microSD V30 128GB",
          "sourceUrl": "https://www.angelbird.com/creative-freedom-hub/microsd-v30-uhs-i-14/",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "microSDXC UHS-I (V30, A2)"
        },
        "Angelbird AV PRO microSD V30 256GB": {
          "brand": "Angelbird",
          "model": "AV PRO microSD V30 256GB",
          "sourceUrl": "https://www.angelbird.com/creative-freedom-hub/microsd-v30-uhs-i-14/",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "microSDXC UHS-I (V30, A2)"
        },
        "Angelbird AV PRO microSD V30 512GB": {
          "brand": "Angelbird",
          "model": "AV PRO microSD V30 512GB",
          "sourceUrl": "https://www.angelbird.com/creative-freedom-hub/microsd-v30-uhs-i-14/",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "microSDXC UHS-I (V30, A2)"
        },
        "OWC Atlas Pro CFexpress Type A 240GB (v4)": {
          "brand": "OWC",
          "model": "Atlas Pro CFexpress Type A 240GB (v4)",
          "kNumber": null,
          "capacityGb": 240,
          "capacityTb": 0.24,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Atlas Pro Type A card with 1850 MB/s read, 1700 MB/s write, 400 MB/s sustained"
        },
        "OWC Atlas Pro CFexpress Type A 480GB (v4)": {
          "brand": "OWC",
          "model": "Atlas Pro CFexpress Type A 480GB (v4)",
          "kNumber": null,
          "capacityGb": 480,
          "capacityTb": 0.48,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Same performance as 240GB version"
        },
        "OWC Atlas Pro CFexpress Type A 960GB (v4)": {
          "brand": "OWC",
          "model": "Atlas Pro CFexpress Type A 960GB (v4)",
          "kNumber": null,
          "capacityGb": 960,
          "capacityTb": 0.96,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Same performance as other Atlas Pro Type A cards"
        },
        "OWC Atlas Pro CFexpress Type B 256GB (v4)": {
          "brand": "OWC",
          "model": "Atlas Pro CFexpress Type B 256GB (v4)",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Atlas Pro Type B card with 3650 MB/s read, 3000 MB/s write, 800 MB/s sustained"
        },
        "OWC Atlas Pro CFexpress Type B 512GB (v4)": {
          "brand": "OWC",
          "model": "Atlas Pro CFexpress Type B 512GB (v4)",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Same performance as 256GB version"
        },
        "OWC Atlas Ultra CFexpress Type B 1TB": {
          "brand": "OWC",
          "model": "Atlas Ultra CFexpress Type B 1TB",
          "kNumber": "OWC CFXB1TBATLU",
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress Type B (v4, PCIe 4.0)",
          "notes": "Atlas Ultra card with 3650 MB/s read, 3000 MB/s write, 1500 MB/s sustained"
        },
        "OWC Atlas Ultra CFexpress Type B 2TB": {
          "brand": "OWC",
          "model": "Atlas Ultra CFexpress Type B 2TB",
          "kNumber": null,
          "capacityGb": 2048,
          "capacityTb": 2,
          "interface": "CFexpress Type B (v4, PCIe 4.0)",
          "notes": "Same performance as 1TB version"
        },
        "ProGrade CFexpress Type B Gold 512GB (v4)": {
          "brand": "ProGrade",
          "model": "CFexpress Type B Gold 512GB (v4)",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress 4.0 Type B",
          "notes": "Gold series card with 3400 MB/s read, 3000 MB/s write, 850 MB/s sustained"
        },
        "ProGrade CFexpress Type B Gold 1TB (v4)": {
          "brand": "ProGrade",
          "model": "CFexpress Type B Gold 1TB (v4)",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress 4.0 Type B",
          "notes": "Same speeds as 512GB but with 1500 MB/s sustained"
        },
        "ProGrade CFexpress Type B Gold 2TB (v4)": {
          "brand": "ProGrade",
          "model": "CFexpress Type B Gold 2TB (v4)",
          "kNumber": null,
          "capacityGb": 2048,
          "capacityTb": 2,
          "interface": "CFexpress 4.0 Type B",
          "notes": "Same performance as 1TB version"
        },
        "ProGrade CFexpress Type B Iridium 400GB (v4)": {
          "brand": "ProGrade",
          "model": "CFexpress Type B Iridium 400GB (v4)",
          "kNumber": null,
          "capacityGb": 400,
          "capacityTb": 0.4,
          "interface": "CFexpress 4.0 Type B",
          "notes": "Iridium card with 3550 MB/s read, 3000 MB/s write, 850 MB/s sustained and VPG-400"
        },
        "ProGrade CFexpress Type B Iridium 800GB (v4)": {
          "brand": "ProGrade",
          "model": "CFexpress Type B Iridium 800GB (v4)",
          "kNumber": null,
          "capacityGb": 800,
          "capacityTb": 0.8,
          "interface": "CFexpress 4.0 Type B",
          "notes": "Same speeds but sustained 1500 MB/s"
        },
        "ProGrade CFexpress Type B Iridium 1.6TB (v4)": {
          "brand": "ProGrade",
          "model": "CFexpress Type B Iridium 1.6TB (v4)",
          "kNumber": null,
          "capacityGb": 1600,
          "capacityTb": 1.6,
          "interface": "CFexpress 4.0 Type B",
          "notes": "Largest Iridium card with same speeds and sustained 1500 MB/s"
        },
        "Sony CEA-G Series CFexpress Type A 80GB": {
          "brand": "Sony",
          "model": "CEA-G Series CFexpress Type A 80GB",
          "sourceUrl": "https://www.sony.com/electronics/support/articles/00252738",
          "kNumber": null,
          "capacityGb": 80,
          "capacityTb": 0.08,
          "interface": "CFexpress Type A"
        },
        "Sony CEA-G Series CFexpress Type A 160GB": {
          "brand": "Sony",
          "model": "CEA-G Series CFexpress Type A 160GB",
          "sourceUrl": "https://www.sony.com/electronics/support/articles/00252738",
          "kNumber": null,
          "capacityGb": 160,
          "capacityTb": 0.16,
          "interface": "CFexpress Type A"
        },
        "Sony CEA-G Series CFexpress Type A 240GB (4.0)": {
          "brand": "Sony",
          "model": "CEA-G Series CFexpress Type A 240GB (4.0)",
          "kNumber": null,
          "capacityGb": 240,
          "capacityTb": 0.24,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "CFexpress 4.0 Type A card rated for 1800 MB/s read and 1700 MB/s write"
        },
        "Sony CEA-G Series CFexpress Type A 320GB": {
          "brand": "Sony",
          "model": "CEA-G Series CFexpress Type A 320GB",
          "sourceUrl": "https://www.sony.com/electronics/support/articles/00252738",
          "kNumber": null,
          "capacityGb": 320,
          "capacityTb": 0.32,
          "interface": "CFexpress Type A"
        },
        "Sony CEA-G Series CFexpress Type A 480GB": {
          "brand": "Sony",
          "model": "CEA-G Series CFexpress Type A 480GB",
          "sourceUrl": "https://www.sony.com/electronics/support/articles/00252738",
          "kNumber": null,
          "capacityGb": 480,
          "capacityTb": 0.48,
          "interface": "CFexpress Type A"
        },
        "Sony CEA-G Series CFexpress Type A 640GB": {
          "brand": "Sony",
          "model": "CEA-G Series CFexpress Type A 640GB",
          "sourceUrl": "https://www.sony.com/electronics/support/articles/00252738",
          "kNumber": null,
          "capacityGb": 640,
          "capacityTb": 0.64,
          "interface": "CFexpress Type A"
        },
        "Sony CEA-G Series CFexpress Type A 960GB": {
          "brand": "Sony",
          "model": "CEA-G Series CFexpress Type A 960GB",
          "sourceUrl": "https://www.sony.com/electronics/support/articles/00252738",
          "kNumber": null,
          "capacityGb": 960,
          "capacityTb": 0.96,
          "interface": "CFexpress Type A"
        },
        "Sony CEA-G Series CFexpress Type A 1920GB": {
          "brand": "Sony",
          "model": "CEA-G Series CFexpress Type A 1920GB",
          "sourceUrl": "https://www.sony.com/electronics/support/articles/00252738",
          "kNumber": null,
          "capacityGb": 1920,
          "capacityTb": 1.92,
          "interface": "CFexpress Type A"
        },
        "Sony CEA-M Series CFexpress Type A 960GB": {
          "brand": "Sony",
          "model": "CEA-M Series CFexpress Type A 960GB",
          "sourceUrl": "https://www.sony.com/lr/electronics/sd-cards/cea-m960t-cea-m1920t",
          "kNumber": null,
          "capacityGb": 960,
          "capacityTb": 0.96,
          "interface": "CFexpress Type A"
        },
        "Sony CEA-M Series CFexpress Type A 1920GB": {
          "brand": "Sony",
          "model": "CEA-M Series CFexpress Type A 1920GB",
          "sourceUrl": "https://www.sony.com/lr/electronics/sd-cards/cea-m960t-cea-m1920t",
          "kNumber": null,
          "capacityGb": 1920,
          "capacityTb": 1.92,
          "interface": "CFexpress Type A"
        },
        "Sony CEB-G Series CFexpress Type B 128GB": {
          "brand": "Sony",
          "model": "CEB-G Series CFexpress Type B 128GB",
          "sourceUrl": "https://www.sony.com/za/electronics/xqd-memory-cards/cfexpress-type-b-memory-card/specifications",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "CFexpress Type B"
        },
        "Sony CEB-G Series CFexpress Type B 240GB": {
          "brand": "Sony",
          "model": "CEB-G Series CFexpress Type B 240GB",
          "sourceUrl": "https://www.sony.com/za/electronics/xqd-memory-cards/cfexpress-type-b-memory-card/specifications",
          "kNumber": null,
          "capacityGb": 240,
          "capacityTb": 0.24,
          "interface": "CFexpress Type B"
        },
        "Sony CEB-G Series CFexpress Type B 256GB": {
          "brand": "Sony",
          "model": "CEB-G Series CFexpress Type B 256GB",
          "sourceUrl": "https://www.sony.com/za/electronics/xqd-memory-cards/cfexpress-type-b-memory-card/specifications",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFexpress Type B"
        },
        "Sony CEB-G Series CFexpress Type B 480GB": {
          "brand": "Sony",
          "model": "CEB-G Series CFexpress Type B 480GB",
          "sourceUrl": "https://www.sony.com/za/electronics/xqd-memory-cards/cfexpress-type-b-memory-card/specifications",
          "kNumber": null,
          "capacityGb": 480,
          "capacityTb": 0.48,
          "interface": "CFexpress Type B"
        },
        "Sony CEB-G Series CFexpress Type B 512GB": {
          "brand": "Sony",
          "model": "CEB-G Series CFexpress Type B 512GB",
          "sourceUrl": "https://www.sony.com/za/electronics/xqd-memory-cards/cfexpress-type-b-memory-card/specifications",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type B"
        },
        "Sony SF-G TOUGH SDXC V90 32GB": {
          "brand": "Sony",
          "model": "SF-G TOUGH SDXC V90 32GB",
          "sourceUrl": "https://www.sony.com/ug/electronics/sd-cards/sf-gt-series",
          "kNumber": null,
          "capacityGb": 32,
          "capacityTb": 0.032,
          "interface": "SDXC UHS-II (V90)"
        },
        "Sony SF-G TOUGH SDXC V90 64GB": {
          "brand": "Sony",
          "model": "SF-G TOUGH SDXC V90 64GB",
          "sourceUrl": "https://www.sony.com/ug/electronics/sd-cards/sf-gt-series",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "SDXC UHS-II (V90)"
        },
        "Sony SF-G TOUGH SDXC V90 128GB": {
          "brand": "Sony",
          "model": "SF-G TOUGH SDXC V90 128GB",
          "sourceUrl": "https://www.sony.com/ug/electronics/sd-cards/sf-gt-series",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "SDXC UHS-II (V90)"
        },
        "Sony XQD G Series 32GB": {
          "brand": "Sony",
          "model": "XQD G Series 32GB",
          "sourceUrl": "https://pro.sony.com/bbsc/ssr/micro-xdcam/cat-broadcastcameras/product-QDAEX1%2FSC1/",
          "kNumber": null,
          "capacityGb": 32,
          "capacityTb": 0.032,
          "interface": "XQD"
        },
        "Sony XQD G Series 64GB": {
          "brand": "Sony",
          "model": "XQD G Series 64GB",
          "sourceUrl": "https://pro.sony.com/bbsc/ssr/micro-xdcam/cat-broadcastcameras/product-QDAEX1%2FSC1/",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "XQD"
        },
        "Sony XQD G Series 120GB": {
          "brand": "Sony",
          "model": "XQD G Series 120GB",
          "sourceUrl": "https://pro.sony.com/bbsc/ssr/micro-xdcam/cat-broadcastcameras/product-QDAEX1%2FSC1/",
          "kNumber": null,
          "capacityGb": 120,
          "capacityTb": 0.12,
          "interface": "XQD"
        },
        "Sony XQD G Series 128GB": {
          "brand": "Sony",
          "model": "XQD G Series 128GB",
          "sourceUrl": "https://pro.sony.com/bbsc/ssr/micro-xdcam/cat-broadcastcameras/product-QDAEX1%2FSC1/",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "XQD"
        },
        "Sony XQD G Series 240GB": {
          "brand": "Sony",
          "model": "XQD G Series 240GB",
          "sourceUrl": "https://pro.sony.com/bbsc/ssr/micro-xdcam/cat-broadcastcameras/product-QDAEX1%2FSC1/",
          "kNumber": null,
          "capacityGb": 240,
          "capacityTb": 0.24,
          "interface": "XQD"
        },
        "Sony XQD G Series 256GB": {
          "brand": "Sony",
          "model": "XQD G Series 256GB",
          "sourceUrl": "https://pro.sony.com/bbsc/ssr/micro-xdcam/cat-broadcastcameras/product-QDAEX1%2FSC1/",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "XQD"
        },
        "RED MINI-MAG 120GB": {
          "brand": "RED",
          "model": "MINI-MAG 120GB",
          "sourceUrl": "https://docs.red.com/955-0047/MediaOperationGuide/Content/A_Technical_Specifications/RED_MINI-MAG.htm",
          "kNumber": null,
          "capacityGb": 120,
          "capacityTb": 0.12,
          "interface": "RED MINI-MAG proprietary module (300 MB/s write)"
        },
        "RED MINI-MAG 240GB": {
          "brand": "RED",
          "model": "MINI-MAG 240GB",
          "sourceUrl": "https://docs.red.com/955-0047/MediaOperationGuide/Content/A_Technical_Specifications/RED_MINI-MAG.htm",
          "kNumber": null,
          "capacityGb": 240,
          "capacityTb": 0.24,
          "interface": "RED MINI-MAG proprietary module (300 MB/s write)"
        },
        "RED MINI-MAG 480GB": {
          "brand": "RED",
          "model": "MINI-MAG 480GB",
          "sourceUrl": "https://docs.red.com/955-0047/MediaOperationGuide/Content/A_Technical_Specifications/RED_MINI-MAG.htm",
          "kNumber": "750-0080",
          "capacityGb": 480,
          "capacityTb": 0.48,
          "interface": "RED MINI-MAG proprietary module (300 MB/s write)"
        },
        "RED MINI-MAG 960GB": {
          "brand": "RED",
          "model": "MINI-MAG 960GB",
          "sourceUrl": "https://docs.red.com/955-0047/MediaOperationGuide/Content/A_Technical_Specifications/RED_MINI-MAG.htm",
          "kNumber": null,
          "capacityGb": 960,
          "capacityTb": 0.96,
          "interface": "RED MINI-MAG proprietary module (300 MB/s write)"
        },
        "RED MINI-MAG 1TB": {
          "brand": "RED",
          "model": "MINI-MAG 1TB",
          "sourceUrl": "https://docs.red.com/955-0047/MediaOperationGuide/Content/A_Technical_Specifications/RED_MINI-MAG.htm",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
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
        "Sony SxS PRO+ 64GB card (E-Series)": {
          "brand": "Sony",
          "model": "SBP64E",
          "kNumber": "SBS-64G1C",
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "SxS PRO+ (ExpressCard/34, PCI Express)"
        },
        "SanDisk Extreme PRO CFexpress Type B 64GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO CFexpress Type B 64GB",
          "sourceUrl": "https://shop.sandisk.com/en-in/products/memory-cards/cfast-cfexpress-compactflash/sandisk-extreme-pro-cfexpress-type-b",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "CFexpress Type B"
        },
        "SanDisk Extreme PRO CFexpress Type B 128GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO CFexpress Type B 128GB",
          "sourceUrl": "https://shop.sandisk.com/en-in/products/memory-cards/cfast-cfexpress-compactflash/sandisk-extreme-pro-cfexpress-type-b",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "CFexpress Type B"
        },
        "SanDisk Extreme PRO CFexpress Type B 256GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO CFexpress Type B 256GB",
          "sourceUrl": "https://shop.sandisk.com/en-in/products/memory-cards/cfast-cfexpress-compactflash/sandisk-extreme-pro-cfexpress-type-b",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFexpress Type B"
        },
        "SanDisk Extreme PRO CFexpress Type B 512GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO CFexpress Type B 512GB",
          "sourceUrl": "https://shop.sandisk.com/en-in/products/memory-cards/cfast-cfexpress-compactflash/sandisk-extreme-pro-cfexpress-type-b",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type B"
        },
        "SanDisk Extreme PRO CFast 2.0 64GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO CFast 2.0 64GB",
          "sourceUrl": "https://shop.sandisk.com/tools/documentRequestHandler?docPath=%2Fcontent%2Fdam%2Fdoc-library%2Fen_us%2Fassets%2Fpublic%2Fsandisk%2Fproduct%2Fmemory-cards%2Fextreme-pro-cfast-2-0%2Fdata-sheet-extreme-pro-cfast-2-0.pdf",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "CFast 2.0"
        },
        "SanDisk Extreme PRO CFast 2.0 128GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO CFast 2.0 128GB",
          "sourceUrl": "https://shop.sandisk.com/tools/documentRequestHandler?docPath=%2Fcontent%2Fdam%2Fdoc-library%2Fen_us%2Fassets%2Fpublic%2Fsandisk%2Fproduct%2Fmemory-cards%2Fextreme-pro-cfast-2-0%2Fdata-sheet-extreme-pro-cfast-2-0.pdf",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "CFast 2.0"
        },
        "SanDisk Extreme PRO CFast 2.0 256GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO CFast 2.0 256GB",
          "sourceUrl": "https://shop.sandisk.com/tools/documentRequestHandler?docPath=%2Fcontent%2Fdam%2Fdoc-library%2Fen_us%2Fassets%2Fpublic%2Fsandisk%2Fproduct%2Fmemory-cards%2Fextreme-pro-cfast-2-0%2Fdata-sheet-extreme-pro-cfast-2-0.pdf",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFast 2.0"
        },
        "SanDisk Extreme PRO CFast 2.0 512GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO CFast 2.0 512GB",
          "sourceUrl": "https://shop.sandisk.com/tools/documentRequestHandler?docPath=%2Fcontent%2Fdam%2Fdoc-library%2Fen_us%2Fassets%2Fpublic%2Fsandisk%2Fproduct%2Fmemory-cards%2Fextreme-pro-cfast-2-0%2Fdata-sheet-extreme-pro-cfast-2-0.pdf",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFast 2.0"
        },
        "SanDisk Extreme PRO SD UHS-I 32GB (200MB/s)": {
          "brand": "SanDisk",
          "model": "Extreme PRO SD UHS-I 32GB (200MB/s)",
          "sourceUrl": "https://shop.sandisk.com/en-ca/tools/documentRequestHandler?docPath=%2Fcontent%2Fdam%2Fdoc-library%2Fen_us%2Fassets%2Fpublic%2Fsandisk%2Fproduct%2Fmemory-cards%2Fextreme-pro-uhs-i-sd%2Fdata-sheet-extreme-pro-uhs-i-sd-200mbps.pdf",
          "kNumber": null,
          "capacityGb": 32,
          "capacityTb": 0.032,
          "interface": "SDHC/SDXC UHS-I"
        },
        "SanDisk Extreme PRO SD UHS-I 64GB (200MB/s)": {
          "brand": "SanDisk",
          "model": "Extreme PRO SD UHS-I 64GB (200MB/s)",
          "sourceUrl": "https://shop.sandisk.com/en-ca/tools/documentRequestHandler?docPath=%2Fcontent%2Fdam%2Fdoc-library%2Fen_us%2Fassets%2Fpublic%2Fsandisk%2Fproduct%2Fmemory-cards%2Fextreme-pro-uhs-i-sd%2Fdata-sheet-extreme-pro-uhs-i-sd-200mbps.pdf",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "SDHC/SDXC UHS-I"
        },
        "SanDisk Extreme PRO SD UHS-I 128GB (200MB/s)": {
          "brand": "SanDisk",
          "model": "Extreme PRO SD UHS-I 128GB (200MB/s)",
          "sourceUrl": "https://shop.sandisk.com/en-ca/tools/documentRequestHandler?docPath=%2Fcontent%2Fdam%2Fdoc-library%2Fen_us%2Fassets%2Fpublic%2Fsandisk%2Fproduct%2Fmemory-cards%2Fextreme-pro-uhs-i-sd%2Fdata-sheet-extreme-pro-uhs-i-sd-200mbps.pdf",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "SDHC/SDXC UHS-I"
        },
        "SanDisk Extreme PRO SD UHS-I 256GB (200MB/s)": {
          "brand": "SanDisk",
          "model": "Extreme PRO SD UHS-I 256GB (200MB/s)",
          "sourceUrl": "https://shop.sandisk.com/en-ca/tools/documentRequestHandler?docPath=%2Fcontent%2Fdam%2Fdoc-library%2Fen_us%2Fassets%2Fpublic%2Fsandisk%2Fproduct%2Fmemory-cards%2Fextreme-pro-uhs-i-sd%2Fdata-sheet-extreme-pro-uhs-i-sd-200mbps.pdf",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "SDHC/SDXC UHS-I"
        },
        "SanDisk Extreme PRO SD UHS-I 512GB (200MB/s)": {
          "brand": "SanDisk",
          "model": "Extreme PRO SD UHS-I 512GB (200MB/s)",
          "sourceUrl": "https://shop.sandisk.com/en-ca/tools/documentRequestHandler?docPath=%2Fcontent%2Fdam%2Fdoc-library%2Fen_us%2Fassets%2Fpublic%2Fsandisk%2Fproduct%2Fmemory-cards%2Fextreme-pro-uhs-i-sd%2Fdata-sheet-extreme-pro-uhs-i-sd-200mbps.pdf",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "SDHC/SDXC UHS-I"
        },
        "SanDisk Extreme PRO SD UHS-I 1TB (200MB/s)": {
          "brand": "SanDisk",
          "model": "Extreme PRO SD UHS-I 1TB (200MB/s)",
          "sourceUrl": "https://shop.sandisk.com/en-ca/tools/documentRequestHandler?docPath=%2Fcontent%2Fdam%2Fdoc-library%2Fen_us%2Fassets%2Fpublic%2Fsandisk%2Fproduct%2Fmemory-cards%2Fextreme-pro-uhs-i-sd%2Fdata-sheet-extreme-pro-uhs-i-sd-200mbps.pdf",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "SDHC/SDXC UHS-I"
        },
        "SanDisk Extreme microSD UHS-I 64GB": {
          "brand": "SanDisk",
          "model": "Extreme microSD UHS-I 64GB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/microsd-cards/sandisk-extreme-uhs-i-microsd?sku=SDSQXAV-2T00-GN6MA",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "microSDXC UHS-I (V30, A2)"
        },
        "SanDisk Extreme microSD UHS-I 128GB": {
          "brand": "SanDisk",
          "model": "Extreme microSD UHS-I 128GB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/microsd-cards/sandisk-extreme-uhs-i-microsd?sku=SDSQXAV-2T00-GN6MA",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "microSDXC UHS-I (V30, A2)"
        },
        "SanDisk Extreme microSD UHS-I 256GB": {
          "brand": "SanDisk",
          "model": "Extreme microSD UHS-I 256GB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/microsd-cards/sandisk-extreme-uhs-i-microsd?sku=SDSQXAV-2T00-GN6MA",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "microSDXC UHS-I (V30, A2)"
        },
        "SanDisk Extreme microSD UHS-I 512GB": {
          "brand": "SanDisk",
          "model": "Extreme microSD UHS-I 512GB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/microsd-cards/sandisk-extreme-uhs-i-microsd?sku=SDSQXAV-2T00-GN6MA",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "microSDXC UHS-I (V30, A2)"
        },
        "SanDisk Extreme microSD UHS-I 1TB": {
          "brand": "SanDisk",
          "model": "Extreme microSD UHS-I 1TB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/microsd-cards/sandisk-extreme-uhs-i-microsd?sku=SDSQXAV-2T00-GN6MA",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "microSDXC UHS-I (V30, A2)"
        },
        "SanDisk Extreme microSD UHS-I 2TB": {
          "brand": "SanDisk",
          "model": "Extreme microSD UHS-I 2TB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/microsd-cards/sandisk-extreme-uhs-i-microsd?sku=SDSQXAV-2T00-GN6MA",
          "kNumber": null,
          "capacityGb": 2048,
          "capacityTb": 2,
          "interface": "microSDXC UHS-I (V30, A2)"
        },
        "SanDisk Extreme PRO microSD UHS-I 64GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO microSD UHS-I 64GB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/microsd-cards/sandisk-extreme-pro-uhs-i-microsd",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "microSDXC UHS-I (V30, A2)"
        },
        "SanDisk Extreme PRO microSD UHS-I 128GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO microSD UHS-I 128GB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/microsd-cards/sandisk-extreme-pro-uhs-i-microsd",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "microSDXC UHS-I (V30, A2)"
        },
        "SanDisk Extreme PRO microSD UHS-I 256GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO microSD UHS-I 256GB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/microsd-cards/sandisk-extreme-pro-uhs-i-microsd",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "microSDXC UHS-I (V30, A2)"
        },
        "SanDisk Extreme PRO microSD UHS-I 400GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO microSD UHS-I 400GB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/microsd-cards/sandisk-extreme-pro-uhs-i-microsd",
          "kNumber": null,
          "capacityGb": 400,
          "capacityTb": 0.4,
          "interface": "microSDXC UHS-I (V30, A2)"
        },
        "SanDisk Extreme PRO microSD UHS-I 512GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO microSD UHS-I 512GB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/microsd-cards/sandisk-extreme-pro-uhs-i-microsd",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "microSDXC UHS-I (V30, A2)"
        },
        "SanDisk Extreme PRO microSD UHS-I 1TB": {
          "brand": "SanDisk",
          "model": "Extreme PRO microSD UHS-I 1TB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/microsd-cards/sandisk-extreme-pro-uhs-i-microsd",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "microSDXC UHS-I (V30, A2)"
        },
        "SanDisk Extreme PRO microSD UHS-I 2TB": {
          "brand": "SanDisk",
          "model": "Extreme PRO microSD UHS-I 2TB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/microsd-cards/sandisk-extreme-pro-uhs-i-microsd",
          "kNumber": null,
          "capacityGb": 2048,
          "capacityTb": 2,
          "interface": "microSDXC UHS-I (V30, A2)"
        },
        "SanDisk Extreme PRO SD UHS-II V90 64GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO SD UHS-II V90 64GB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/sd-cards/sandisk-extreme-pro-uhs-ii-v90-sd",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "SDXC UHS-II (V90)"
        },
        "SanDisk Extreme PRO SD UHS-II V90 128GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO SD UHS-II V90 128GB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/sd-cards/sandisk-extreme-pro-uhs-ii-v90-sd",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "SDXC UHS-II (V90)"
        },
        "SanDisk Extreme PRO SD UHS-II V90 256GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO SD UHS-II V90 256GB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/sd-cards/sandisk-extreme-pro-uhs-ii-v90-sd",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "SDXC UHS-II (V90)"
        },
        "SanDisk Extreme PRO SD UHS-II V90 512GB": {
          "brand": "SanDisk",
          "model": "Extreme PRO SD UHS-II V90 512GB",
          "sourceUrl": "https://shop.sandisk.com/products/memory-cards/sd-cards/sandisk-extreme-pro-uhs-ii-v90-sd",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "SDXC UHS-II (V90)"
        },
        "Samsung PRO Plus microSD 128GB": {
          "brand": "Samsung",
          "model": "PRO Plus microSD 128GB",
          "sourceUrl": "https://semiconductor.samsung.com/consumer-storage/memory-card/micro-sd-pro-plus/",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "microSDXC UHS-I"
        },
        "Samsung PRO Plus microSD 256GB": {
          "brand": "Samsung",
          "model": "PRO Plus microSD 256GB",
          "sourceUrl": "https://semiconductor.samsung.com/consumer-storage/memory-card/micro-sd-pro-plus/",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "microSDXC UHS-I"
        },
        "Samsung PRO Plus microSD 512GB": {
          "brand": "Samsung",
          "model": "PRO Plus microSD 512GB",
          "sourceUrl": "https://semiconductor.samsung.com/consumer-storage/memory-card/micro-sd-pro-plus/",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "microSDXC UHS-I"
        },
        "Samsung PRO Plus microSD 1TB": {
          "brand": "Samsung",
          "model": "PRO Plus microSD 1TB",
          "sourceUrl": "https://semiconductor.samsung.com/consumer-storage/memory-card/micro-sd-pro-plus/",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "microSDXC UHS-I"
        },
        "Samsung PRO Plus SD 64GB": {
          "brand": "Samsung",
          "model": "PRO Plus SD 64GB",
          "sourceUrl": "https://semiconductor.samsung.com/consumer-storage/memory-card/sd-pro-plus/",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "SDXC UHS-I"
        },
        "Samsung PRO Plus SD 128GB": {
          "brand": "Samsung",
          "model": "PRO Plus SD 128GB",
          "sourceUrl": "https://semiconductor.samsung.com/consumer-storage/memory-card/sd-pro-plus/",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "SDXC UHS-I"
        },
        "Samsung PRO Plus SD 256GB": {
          "brand": "Samsung",
          "model": "PRO Plus SD 256GB",
          "sourceUrl": "https://semiconductor.samsung.com/consumer-storage/memory-card/sd-pro-plus/",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "SDXC UHS-I"
        },
        "Samsung PRO Plus SD 512GB": {
          "brand": "Samsung",
          "model": "PRO Plus SD 512GB",
          "sourceUrl": "https://semiconductor.samsung.com/consumer-storage/memory-card/sd-pro-plus/",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "SDXC UHS-I"
        },
        "Lexar Professional DIAMOND CFexpress Type B 128GB (v4)": {
          "brand": "Lexar",
          "model": "Professional DIAMOND CFexpress Type B 128GB (v4)",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "CFexpress 4.0 Type B",
          "notes": "Lexar DIAMOND card with 3700 MB/s read, 3400 MB/s write and 3200 MB/s sustained"
        },
        "Lexar Professional DIAMOND CFexpress Type B 256GB (v4)": {
          "brand": "Lexar",
          "model": "Professional DIAMOND CFexpress Type B 256GB (v4)",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFexpress 4.0 Type B",
          "notes": "Same performance as 128GB but bigger capacity"
        },
        "Lexar Professional DIAMOND CFexpress Type B 512GB (v4)": {
          "brand": "Lexar",
          "model": "Professional DIAMOND CFexpress Type B 512GB (v4)",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress 4.0 Type B",
          "notes": "High-capacity DIAMOND with the same speeds"
        },
        "Lexar Professional DIAMOND CFexpress Type B 1TB (v4)": {
          "brand": "Lexar",
          "model": "Professional DIAMOND CFexpress Type B 1TB (v4)",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress 4.0 Type B",
          "notes": "Largest DIAMOND card with same speeds"
        },
        "Lexar Professional CFexpress 4.0 Type B GOLD 512GB": {
          "brand": "Lexar",
          "model": "Professional CFexpress 4.0 Type B GOLD 512GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-gold-cfexpress-4-0-type-b-card/",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type B (v4.0)",
          "notes": "Gold Type B card with 3600 MB/s read, 3300 MB/s write and 3000 MB/s sustained"
        },
        "Lexar Professional CFexpress 4.0 Type B GOLD 1TB": {
          "brand": "Lexar",
          "model": "Professional CFexpress 4.0 Type B GOLD 1TB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-gold-cfexpress-4-0-type-b-card/",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress Type B (v4.0)",
          "notes": "1 TB Gold Type B card"
        },
        "Lexar Professional CFexpress 4.0 Type B GOLD 2TB": {
          "brand": "Lexar",
          "model": "Professional CFexpress 4.0 Type B GOLD 2TB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-gold-cfexpress-4-0-type-b-card/",
          "kNumber": null,
          "capacityGb": 2048,
          "capacityTb": 2,
          "interface": "CFexpress Type B (v4.0)",
          "notes": "2 TB Gold Type B card"
        },
        "Lexar Professional CFexpress 4.0 Type B GOLD 4TB": {
          "brand": "Lexar",
          "model": "Professional CFexpress 4.0 Type B GOLD 4TB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-gold-cfexpress-4-0-type-b-card/",
          "kNumber": null,
          "capacityGb": 4096,
          "capacityTb": 4,
          "interface": "CFexpress Type B (v4.0)",
          "notes": "4 TB Gold Type B card"
        },
        "Lexar Professional CFexpress Type B GOLD 128GB": {
          "brand": "Lexar",
          "model": "Professional CFexpress Type B GOLD 128GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-cfexpress-type-b-card-gold-series/",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "CFexpress Type B (2.0)"
        },
        "Lexar Professional CFexpress Type B GOLD 256GB": {
          "brand": "Lexar",
          "model": "Professional CFexpress Type B GOLD 256GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-cfexpress-type-b-card-gold-series/",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFexpress Type B (2.0)"
        },
        "Lexar Professional CFexpress Type A GOLD 80GB": {
          "brand": "Lexar",
          "model": "Professional CFexpress Type A GOLD 80GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-cfexpress-type-a-card-gold-series/",
          "kNumber": null,
          "capacityGb": 80,
          "capacityTb": 0.08,
          "interface": "CFexpress Type A"
        },
        "Lexar Professional CFexpress Type A GOLD 160GB": {
          "brand": "Lexar",
          "model": "Professional CFexpress Type A GOLD 160GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-cfexpress-type-a-card-gold-series/",
          "kNumber": null,
          "capacityGb": 160,
          "capacityTb": 0.16,
          "interface": "CFexpress Type A"
        },
        "Lexar Professional CFexpress Type A GOLD 320GB": {
          "brand": "Lexar",
          "model": "Professional CFexpress Type A GOLD 320GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-cfexpress-type-a-card-gold-series/",
          "kNumber": null,
          "capacityGb": 320,
          "capacityTb": 0.32,
          "interface": "CFexpress Type A"
        },
        "Lexar Professional GOLD CFexpress Type A 640GB (v4)": {
          "brand": "Lexar",
          "model": "Professional GOLD CFexpress Type A 640GB (v4)",
          "kNumber": null,
          "capacityGb": 640,
          "capacityTb": 0.64,
          "interface": "CFexpress 4.0 Type A",
          "notes": "Gold Type A card with 1800 MB/s read, 1650 MB/s write, sustained 1400 MB/s"
        },
        "Lexar Professional GOLD CFexpress Type A 1TB (v4)": {
          "brand": "Lexar",
          "model": "Professional GOLD CFexpress Type A 1TB (v4)",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress 4.0 Type A",
          "notes": "1 TB Gold Type A card with same speed specs"
        },
        "Lexar Professional 3500x CFast 2.0 64GB": {
          "brand": "Lexar",
          "model": "Professional 3500x CFast 2.0 64GB",
          "sourceUrl": "https://media.accutechdata.com/resources/downloads/Lexar-ProductSheet-Pro-3500x-CFast.pdf",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "CFast 2.0"
        },
        "Lexar Professional 3500x CFast 2.0 128GB": {
          "brand": "Lexar",
          "model": "Professional 3500x CFast 2.0 128GB",
          "sourceUrl": "https://media.accutechdata.com/resources/downloads/Lexar-ProductSheet-Pro-3500x-CFast.pdf",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "CFast 2.0"
        },
        "Lexar Professional 3500x CFast 2.0 256GB": {
          "brand": "Lexar",
          "model": "Professional 3500x CFast 2.0 256GB",
          "sourceUrl": "https://media.accutechdata.com/resources/downloads/Lexar-ProductSheet-Pro-3500x-CFast.pdf",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFast 2.0"
        },
        "Lexar Professional 3500x CFast 2.0 512GB": {
          "brand": "Lexar",
          "model": "Professional 3500x CFast 2.0 512GB",
          "sourceUrl": "https://media.accutechdata.com/resources/downloads/Lexar-ProductSheet-Pro-3500x-CFast.pdf",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFast 2.0"
        },
        "Lexar Professional 2000x SD GOLD 64GB": {
          "brand": "Lexar",
          "model": "Professional 2000x SD GOLD 64GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-2000x-sdhc-sdxc-uhs-ii-card-gold-series/",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "SDHC/SDXC UHS-II (V90)"
        },
        "Lexar Professional 2000x SD GOLD 128GB": {
          "brand": "Lexar",
          "model": "Professional 2000x SD GOLD 128GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-2000x-sdhc-sdxc-uhs-ii-card-gold-series/",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "SDHC/SDXC UHS-II (V90)"
        },
        "Lexar Professional 2000x SD GOLD 256GB": {
          "brand": "Lexar",
          "model": "Professional 2000x SD GOLD 256GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-2000x-sdhc-sdxc-uhs-ii-card-gold-series/",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "SDHC/SDXC UHS-II (V90)"
        },
        "Lexar Professional 2000x SD GOLD 512GB": {
          "brand": "Lexar",
          "model": "Professional 2000x SD GOLD 512GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-2000x-sdhc-sdxc-uhs-ii-card-gold-series/",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "SDHC/SDXC UHS-II (V90)"
        },
        "Lexar Professional 1800x SDXC UHS-II 64GB": {
          "brand": "Lexar",
          "model": "Professional 1800x SDXC UHS-II 64GB",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "SDXC UHS-II (V60)",
          "notes": "Read up to 280 MB/s, write up to 210 MB/s"
        },
        "Lexar Professional 1800x SDXC UHS-II 128GB": {
          "brand": "Lexar",
          "model": "Professional 1800x SDXC UHS-II 128GB",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "SDXC UHS-II (V60)",
          "notes": "Same speed as the 64 GB version"
        },
        "Lexar Professional 1800x SDXC UHS-II 256GB": {
          "brand": "Lexar",
          "model": "Professional 1800x SDXC UHS-II 256GB",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "SDXC UHS-II (V60)",
          "notes": "Read up to 280 MB/s, write up to 205 MB/s"
        },
        "Lexar Professional 1800x SDXC UHS-II 512GB": {
          "brand": "Lexar",
          "model": "Professional 1800x SDXC UHS-II 512GB",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "SDXC UHS-II (V60)",
          "notes": "Same as 256GB version"
        },
        "Lexar Professional 1800x SDXC UHS-II 1TB": {
          "brand": "Lexar",
          "model": "Professional 1800x SDXC UHS-II 1TB",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "SDXC UHS-II (V60)",
          "notes": "Largest card in the series"
        },
        "Lexar Professional 1066x microSD SILVER 64GB": {
          "brand": "Lexar",
          "model": "Professional 1066x microSD SILVER 64GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-1066x-microsdxc-uhs-i-card-silver-series/",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "microSDXC UHS-I"
        },
        "Lexar Professional 1066x microSD SILVER 128GB": {
          "brand": "Lexar",
          "model": "Professional 1066x microSD SILVER 128GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-1066x-microsdxc-uhs-i-card-silver-series/",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "microSDXC UHS-I"
        },
        "Lexar Professional 1066x microSD SILVER 256GB": {
          "brand": "Lexar",
          "model": "Professional 1066x microSD SILVER 256GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-1066x-microsdxc-uhs-i-card-silver-series/",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "microSDXC UHS-I"
        },
        "Lexar Professional 1066x microSD SILVER 512GB": {
          "brand": "Lexar",
          "model": "Professional 1066x microSD SILVER 512GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-1066x-microsdxc-uhs-i-card-silver-series/",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "microSDXC UHS-I"
        },
        "Lexar Professional 1066x microSD SILVER 1TB": {
          "brand": "Lexar",
          "model": "Professional 1066x microSD SILVER 1TB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-1066x-microsdxc-uhs-i-card-silver-series/",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "microSDXC UHS-I"
        },
        "Lexar Professional GOLD microSDXC UHS-II 128GB": {
          "brand": "Lexar",
          "model": "Professional GOLD microSDXC UHS-II 128GB",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "microSDXC UHS-II (V60, A1)",
          "notes": "Reads up to 280 MB/s, writes up to 100 MB/s"
        },
        "Lexar Professional GOLD microSDXC UHS-II 256GB": {
          "brand": "Lexar",
          "model": "Professional GOLD microSDXC UHS-II 256GB",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "microSDXC UHS-II (V60, A1)",
          "notes": "Reads up to 280 MB/s, writes up to 180 MB/s"
        },
        "Lexar Professional 1066x SD SILVER 64GB": {
          "brand": "Lexar",
          "model": "Professional 1066x SD SILVER 64GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-1066x-sdxc-uhs-i-card-silver-series/",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "SDXC UHS-I (V30)"
        },
        "Lexar Professional 1066x SD SILVER 128GB": {
          "brand": "Lexar",
          "model": "Professional 1066x SD SILVER 128GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-1066x-sdxc-uhs-i-card-silver-series/",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "SDXC UHS-I (V30)"
        },
        "Lexar Professional 1066x SD SILVER 256GB": {
          "brand": "Lexar",
          "model": "Professional 1066x SD SILVER 256GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-1066x-sdxc-uhs-i-card-silver-series/",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "SDXC UHS-I (V30)"
        },
        "Lexar Professional 1066x SD SILVER 512GB": {
          "brand": "Lexar",
          "model": "Professional 1066x SD SILVER 512GB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-1066x-sdxc-uhs-i-card-silver-series/",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "SDXC UHS-I (V30)"
        },
        "Lexar Professional 1066x SD SILVER 1TB": {
          "brand": "Lexar",
          "model": "Professional 1066x SD SILVER 1TB",
          "sourceUrl": "https://americas.lexar.com/product/lexar-professional-1066x-sdxc-uhs-i-card-silver-series/",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "SDXC UHS-I (V30)"
        },
        "Lexar Professional SILVER PLUS microSDXC UHS-I 64GB": {
          "brand": "Lexar",
          "model": "Professional SILVER PLUS microSDXC UHS-I 64GB",
          "kNumber": null,
          "capacityGb": 64,
          "capacityTb": 0.064,
          "interface": "microSDXC UHS-I (V30, A2)",
          "notes": "Read 205 MB/s, write 100 MB/s"
        },
        "Lexar Professional SILVER PLUS microSDXC UHS-I 128GB": {
          "brand": "Lexar",
          "model": "Professional SILVER PLUS microSDXC UHS-I 128GB",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "microSDXC UHS-I (V30, A2)",
          "notes": "Read 205 MB/s, write 150 MB/s"
        },
        "Lexar Professional SILVER PLUS microSDXC UHS-I 256GB": {
          "brand": "Lexar",
          "model": "Professional SILVER PLUS microSDXC UHS-I 256GB",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "microSDXC UHS-I (V30, A2)",
          "notes": "Same as 128GB version"
        },
        "Lexar Professional SILVER PLUS microSDXC UHS-I 512GB": {
          "brand": "Lexar",
          "model": "Professional SILVER PLUS microSDXC UHS-I 512GB",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "microSDXC UHS-I (V30, A2)",
          "notes": "Same as 128GB version"
        },
        "Lexar Professional SILVER PLUS microSDXC UHS-I 1TB": {
          "brand": "Lexar",
          "model": "Professional SILVER PLUS microSDXC UHS-I 1TB",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "microSDXC UHS-I (V30, A2)",
          "notes": "Largest capacity in the Silver Plus line"
        },
        "Lexar PLAY PRO microSD Express 256GB": {
          "brand": "Lexar",
          "model": "PLAY PRO microSD Express 256GB",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "microSD Express (PCIe/NVMe)",
          "notes": "Next-gen microSD Express card with 900 MB/s read and 600 MB/s write"
        },
        "Lexar PLAY PRO microSD Express 512GB": {
          "brand": "Lexar",
          "model": "PLAY PRO microSD Express 512GB",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "microSD Express (PCIe/NVMe)",
          "notes": "Same performance as 256GB version"
        },
        "Lexar PLAY PRO microSD Express 1TB": {
          "brand": "Lexar",
          "model": "PLAY PRO microSD Express 1TB",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "microSD Express (PCIe/NVMe)",
          "notes": "Largest capacity with same speeds"
        },
        "Wise Advanced CFexpress 4.0 Type A 256GB": {
          "brand": "Wise Advanced",
          "model": "CFexpress 4.0 Type A 256GB",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Max read ~1865 MB/s, max write ~1750 MB/s, minimum sustained write 400 MB/s; VPG-400 certified for high-resolution video"
        },
        "Wise Advanced CFexpress 4.0 Type A 512GB": {
          "brand": "Wise Advanced",
          "model": "CFexpress 4.0 Type A 512GB",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Same 1865 MB/s read, 1750 MB/s write, and 400 MB/s sustained performance as the 256GB card"
        },
        "Wise Advanced CFexpress 4.0 Type A 1TB": {
          "brand": "Wise Advanced",
          "model": "CFexpress 4.0 Type A 1TB",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "High-capacity Type A card with identical speed and VPG-400 rating"
        },
        "Wise Advanced CFexpress 4.0 Type B PRO Mark II 660GB": {
          "brand": "Wise Advanced",
          "model": "CFexpress 4.0 Type B PRO Mark II 660GB",
          "kNumber": null,
          "capacityGb": 660,
          "capacityTb": 0.66,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Max read ~3700 MB/s, max write ~3600 MB/s, sustained write ~3400 MB/s for demanding 8K workflows"
        },
        "Wise Advanced CFexpress 4.0 Type B PRO Mark II 1.3TB": {
          "brand": "Wise Advanced",
          "model": "CFexpress 4.0 Type B PRO Mark II 1.3TB",
          "kNumber": null,
          "capacityGb": 1300,
          "capacityTb": 1.3,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Same 3700 MB/s read and 3600 MB/s write speeds with 3400 MB/s sustained performance"
        },
        "Nextorage NX-A2PRO 160GB": {
          "brand": "Nextorage",
          "model": "NX-A2PRO 160GB",
          "kNumber": null,
          "capacityGb": 160,
          "capacityTb": 0.16,
          "interface": "CFexpress Type A (PCIe 4.0 x1)",
          "notes": "VPG-800 card with up to 1950 MB/s read, 1900 MB/s write and 1900 MB/s sustained write"
        },
        "Nextorage NX-A2PRO 320GB": {
          "brand": "Nextorage",
          "model": "NX-A2PRO 320GB",
          "kNumber": null,
          "capacityGb": 320,
          "capacityTb": 0.32,
          "interface": "CFexpress Type A (PCIe 4.0 x1)",
          "notes": "Shares the same 1950/1900 MB/s read/write speeds and 1900 MB/s sustained performance as the 160GB version"
        },
        "Nextorage NX-A2PRO 640GB": {
          "brand": "Nextorage",
          "model": "NX-A2PRO 640GB",
          "kNumber": null,
          "capacityGb": 640,
          "capacityTb": 0.64,
          "interface": "CFexpress Type A (PCIe 4.0 x1)",
          "notes": "High-capacity VPG-800 card with 1950 MB/s read, 1900 MB/s write and 1900 MB/s sustained speeds"
        },
        "Nextorage NX-A2SE 256GB": {
          "brand": "Nextorage",
          "model": "NX-A2SE 256GB",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "VPG-200 card offering 1900 MB/s read, 1700 MB/s write and 1500 MB/s sustained write"
        },
        "Nextorage NX-A2SE 512GB": {
          "brand": "Nextorage",
          "model": "NX-A2SE 512GB",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Same 1900/1700 MB/s read/write speeds with 1500 MB/s sustained write"
        },
        "Nextorage NX-A2SE 1TB": {
          "brand": "Nextorage",
          "model": "NX-A2SE 1TB",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Largest capacity in the A2SE series, maintaining 1900 MB/s read and 1700 MB/s write with VPG-200 certification"
        },
        "Nextorage NX-A2AE 500GB": {
          "brand": "Nextorage",
          "model": "NX-A2AE 500GB",
          "kNumber": null,
          "capacityGb": 500,
          "capacityTb": 0.5,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "VPG-400 card rated at 1950 MB/s read, 1900 MB/s write with 1400 MB/s sustained write"
        },
        "Nextorage NX-A2AE 1TB": {
          "brand": "Nextorage",
          "model": "NX-A2AE 1TB",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Same performance as the 500GB version but with double capacity"
        },
        "Nextorage NX-A2AE 2TB": {
          "brand": "Nextorage",
          "model": "NX-A2AE 2TB",
          "kNumber": null,
          "capacityGb": 2000,
          "capacityTb": 2,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Large-capacity VPG-400 card with 1950 MB/s read, 1900 MB/s write and 1400 MB/s sustained speeds"
        },
        "Nextorage NX-B3AE 500GB": {
          "brand": "Nextorage",
          "model": "NX-B3AE 500GB",
          "kNumber": null,
          "capacityGb": 500,
          "capacityTb": 0.5,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Max read ~3900 MB/s, max write ~3400 MB/s and sustained write 850 MB/s"
        },
        "Nextorage NX-B3AE 1TB": {
          "brand": "Nextorage",
          "model": "NX-B3AE 1TB",
          "kNumber": null,
          "capacityGb": 1000,
          "capacityTb": 1,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "High-performance card with 3900 MB/s read, 3600 MB/s write and 1700 MB/s sustained write"
        },
        "Nextorage NX-B3AE 2TB": {
          "brand": "Nextorage",
          "model": "NX-B3AE 2TB",
          "kNumber": null,
          "capacityGb": 2000,
          "capacityTb": 2,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Large capacity with 3700 MB/s read, 3500 MB/s write and 1700 MB/s sustained performance"
        },
        "Nextorage NX-B3SE 256GB": {
          "brand": "Nextorage",
          "model": "NX-B3SE 256GB",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Entry CFexpress 4.0 card: 3900 MB/s read, 2000 MB/s write and 400 MB/s sustained write"
        },
        "Nextorage NX-B3SE 512GB": {
          "brand": "Nextorage",
          "model": "NX-B3SE 512GB",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Offers 3900 MB/s read, 3400 MB/s write and 850 MB/s sustained write"
        },
        "Nextorage NX-B3SE 1TB": {
          "brand": "Nextorage",
          "model": "NX-B3SE 1TB",
          "kNumber": null,
          "capacityGb": 1000,
          "capacityTb": 1,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Top model with 3900 MB/s read, 3500 MB/s write and 1700 MB/s sustained write"
        },
        "Nextorage NX-B2PRO 165GB": {
          "brand": "Nextorage",
          "model": "NX-B2PRO 165GB",
          "kNumber": null,
          "capacityGb": 165,
          "capacityTb": 0.165,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Pro card using pSLC: ~3900 MB/s read, 3600 MB/s write and 3400 MB/s sustained write"
        },
        "Nextorage NX-B2PRO 330GB": {
          "brand": "Nextorage",
          "model": "NX-B2PRO 330GB",
          "kNumber": null,
          "capacityGb": 330,
          "capacityTb": 0.33,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Similar 3900 MB/s read, 3600 MB/s write and 3400 MB/s sustained performance"
        },
        "Nextorage NX-B2PRO 660GB": {
          "brand": "Nextorage",
          "model": "NX-B2PRO 660GB",
          "kNumber": null,
          "capacityGb": 660,
          "capacityTb": 0.66,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Delivers 3700 MB/s read, 3600 MB/s write and 3400 MB/s sustained write"
        },
        "Nextorage NX-B2PRO 1.33TB": {
          "brand": "Nextorage",
          "model": "NX-B2PRO 1.33TB",
          "kNumber": null,
          "capacityGb": 1330,
          "capacityTb": 1.33,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "High-capacity pSLC card with 3700 MB/s read, 3600 MB/s write and 3200 MB/s sustained write"
        },
        "Nextorage NX-B2SE 128GB": {
          "brand": "Nextorage",
          "model": "NX-B2SE 128GB",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "CFexpress Type B (CFexpress 2.0)",
          "notes": "Max read 1100 MB/s, max write 1000 MB/s with 200 MB/s sustained write"
        },
        "Nextorage NX-B2SE 256GB": {
          "brand": "Nextorage",
          "model": "NX-B2SE 256GB",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFexpress Type B (CFexpress 2.0)",
          "notes": "Max read 1950 MB/s, write 1750 MB/s with 400 MB/s sustained write"
        },
        "Nextorage NX-B2SE 512GB": {
          "brand": "Nextorage",
          "model": "NX-B2SE 512GB",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type B (CFexpress 2.0)",
          "notes": "Max read 1950 MB/s, write 1900 MB/s with 800 MB/s sustained write"
        },
        "Nextorage NX-B1SE 128GB": {
          "brand": "Nextorage",
          "model": "NX-B1SE 128GB",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "CFexpress Type B (CFexpress 2.0)",
          "notes": "Entry-level card with 1100 MB/s read, 550 MB/s write and 100 MB/s sustained write"
        },
        "Nextorage NX-B1SE 256GB": {
          "brand": "Nextorage",
          "model": "NX-B1SE 256GB",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFexpress Type B (CFexpress 2.0)",
          "notes": "Improved version offering 1950 MB/s read, 1100 MB/s write and 200 MB/s sustained write"
        },
        "Nextorage NX-B1PRO 165GB": {
          "brand": "Nextorage",
          "model": "NX-B1PRO 165GB",
          "kNumber": null,
          "capacityGb": 165,
          "capacityTb": 0.165,
          "interface": "CFexpress Type B (PCIe 3.0 x2)",
          "notes": "VPG-400 pSLC card with 1950 MB/s read, 1900 MB/s write and 1800 MB/s sustained write"
        },
        "Nextorage NX-B1PRO 330GB": {
          "brand": "Nextorage",
          "model": "NX-B1PRO 330GB",
          "kNumber": null,
          "capacityGb": 330,
          "capacityTb": 0.33,
          "interface": "CFexpress Type B (PCIe 3.0 x2)",
          "notes": "Same performance as 165GB version"
        },
        "Nextorage NX-B1PRO 660GB": {
          "brand": "Nextorage",
          "model": "NX-B1PRO 660GB",
          "kNumber": null,
          "capacityGb": 660,
          "capacityTb": 0.66,
          "interface": "CFexpress Type B (PCIe 3.0 x2)",
          "notes": "Greater capacity with identical 1950 MB/s read, 1900 MB/s write and 1800 MB/s sustained write"
        },
        "Nextorage NX-B1PRO 1.33TB": {
          "brand": "Nextorage",
          "model": "NX-B1PRO 1.33TB",
          "kNumber": null,
          "capacityGb": 1330,
          "capacityTb": 1.33,
          "interface": "CFexpress Type B (PCIe 3.0 x2)",
          "notes": "Largest capacity in the B1PRO series with the same pSLC performance"
        },
        "SanDisk PRO-CINEMA CFexpress Type A 480GB": {
          "brand": "SanDisk",
          "model": "PRO-CINEMA CFexpress Type A 480GB",
          "kNumber": null,
          "capacityGb": 480,
          "capacityTb": 0.48,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Read up to 1800 MB/s and write up to 1650 MB/s; VPG-200 certified with IP57 dust/water resistance"
        },
        "SanDisk PRO-CINEMA CFexpress Type A 960GB": {
          "brand": "SanDisk",
          "model": "PRO-CINEMA CFexpress Type A 960GB",
          "kNumber": null,
          "capacityGb": 960,
          "capacityTb": 0.96,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Same 1800 MB/s read and 1650 MB/s write speeds with VPG-200 certification"
        },
        "Delkin BLACK CFexpress Type B 512GB (4.0)": {
          "brand": "Delkin Devices",
          "model": "BLACK CFexpress Type B 512GB (4.0)",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "High-performance card with up to 3600 MB/s read, 3200 MB/s write and 2040 MB/s sustained write; VPG-400 certified"
        },
        "Delkin BLACK CFexpress Type B 1TB (4.0)": {
          "brand": "Delkin Devices",
          "model": "BLACK CFexpress Type B 1TB (4.0)",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Up to 3700 MB/s read and 3220 MB/s write with VPG-400 and rugged design"
        },
        "Delkin BLACK CFexpress Type B 2TB (4.0)": {
          "brand": "Delkin Devices",
          "model": "BLACK CFexpress Type B 2TB (4.0)",
          "kNumber": null,
          "capacityGb": 2048,
          "capacityTb": 2,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Large-capacity VPG-400 card with similar 3700/3220 MB/s read/write performance and 48-hour replacement warranty"
        },
        "Exascend Nitro Pro CFexpress Type B 512GB": {
          "brand": "Exascend",
          "model": "Nitro Pro CFexpress Type B 512GB",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "pSLC card delivering up to 3750 MB/s read and 3300 MB/s sustained write; VPG-400, IP67-rated"
        },
        "Exascend Nitro Pro CFexpress Type B 1TB": {
          "brand": "Exascend",
          "model": "Nitro Pro CFexpress Type B 1TB",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Same 3750 MB/s read and 3300 MB/s sustained write with rugged pSLC design"
        },
        "Exascend Essential Pro CFexpress Type B 256GB": {
          "brand": "Exascend",
          "model": "Essential Pro CFexpress Type B 256GB",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Read up to 3700 MB/s, write up to 3150 MB/s and sustained write 900 MB/s"
        },
        "Exascend Essential Pro CFexpress Type B 512GB": {
          "brand": "Exascend",
          "model": "Essential Pro CFexpress Type B 512GB",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Offers 3750 MB/s read, 3350 MB/s write and 1750 MB/s sustained write"
        },
        "Exascend Essential Pro CFexpress Type B 1TB": {
          "brand": "Exascend",
          "model": "Essential Pro CFexpress Type B 1TB",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Same 3750 MB/s read and 3350 MB/s write with sustained write 1750 MB/s"
        },
        "Exascend Essential Pro CFexpress Type B 2TB": {
          "brand": "Exascend",
          "model": "Essential Pro CFexpress Type B 2TB",
          "kNumber": null,
          "capacityGb": 2048,
          "capacityTb": 2,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Largest card in the series with 3750 MB/s read, 3350 MB/s write and 3000 MB/s sustained write"
        },
        "Exascend Essential Pro CFexpress Type A 256GB": {
          "brand": "Exascend",
          "model": "Essential Pro CFexpress Type A 256GB",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Max read 1800 MB/s, max write 1650 MB/s with 850 MB/s sustained write"
        },
        "Exascend Essential Pro CFexpress Type A 512GB": {
          "brand": "Exascend",
          "model": "Essential Pro CFexpress Type A 512GB",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Same 1800/1650 MB/s read/write speeds with 850 MB/s sustained write"
        },
        "Exascend Essential Pro CFexpress Type A 1TB": {
          "brand": "Exascend",
          "model": "Essential Pro CFexpress Type A 1TB",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Flagship Type A card with 1800 MB/s read, 1650 MB/s write and 1650 MB/s sustained write"
        },
        "Pergear Master CFexpress Type A 256GB (4.0)": {
          "brand": "Pergear",
          "model": "Master CFexpress Type A 256GB (4.0)",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Up to 1780 MB/s read and 1600 MB/s write with 700 MB/s sustained write; VPG-200 certified"
        },
        "Pergear Master CFexpress Type A 512GB (4.0)": {
          "brand": "Pergear",
          "model": "Master CFexpress Type A 512GB (4.0)",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Same 1780/1600 MB/s read/write with 700 MB/s sustained performance"
        },
        "Pergear Master CFexpress Type A 1TB (4.0)": {
          "brand": "Pergear",
          "model": "Master CFexpress Type A 1TB (4.0)",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Highest capacity card with identical 1780 MB/s read and 1600 MB/s write speeds"
        },
        "Pergear CFexpress Type B 512GB (4.0)": {
          "brand": "Pergear",
          "model": "CFexpress Type B 512GB (4.0)",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Delivers up to 3500 MB/s read, 3400 MB/s write and 800 MB/s sustained write"
        },
        "Pergear CFexpress Type B 1TB (4.0)": {
          "brand": "Pergear",
          "model": "CFexpress Type B 1TB (4.0)",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress Type B (PCIe 4.0)",
          "notes": "Same 3500/3400 MB/s read/write speeds with 1500 MB/s sustained write"
        },
        "Chipfancier CFexpress Type A 256GB (4.0)": {
          "brand": "Chipfancier",
          "model": "CFexpress Type A 256GB (4.0)",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "IP68-rated card with max read 1780 MB/s and max write 1750 MB/s; supports 8K/4K120P recording"
        },
        "Chipfancier CFexpress Type A 512GB (4.0)": {
          "brand": "Chipfancier",
          "model": "CFexpress Type A 512GB (4.0)",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Same 1780/1750 MB/s read/write speeds and rugged build"
        },
        "Chipfancier CFexpress Type A 1TB (4.0)": {
          "brand": "Chipfancier",
          "model": "CFexpress Type A 1TB (4.0)",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress Type A (PCIe 4.0)",
          "notes": "Largest capacity card with identical speed and IP68 waterproofing"
        },
        "Samsung microSD Express 256GB": {
          "brand": "Samsung",
          "model": "microSD Express 256GB",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "microSD Express (PCIe Gen3 x1, NVMe 1.3)",
          "notes": "Sequential read up to 800 MB/s in SD Express mode and 90 MB/s when used in UHS-I; V30 rated"
        },
        "PNY microSD Express 512GB": {
          "brand": "PNY",
          "model": "microSD Express 512GB",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "microSD Express (PCIe Gen3 x1)",
          "notes": "High-performance microSD Express card with read up to 890 MB/s and write up to 810 MB/s"
        },
        "PNY microSD Express 256GB": {
          "brand": "PNY",
          "model": "microSD Express 256GB",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "microSD Express (PCIe Gen3 x1)",
          "notes": "Offers 890 MB/s read and 750 MB/s write speeds according to PNY’s announcement"
        },
        "PNY microSD Express 128GB": {
          "brand": "PNY",
          "model": "microSD Express 128GB",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "microSD Express (PCIe Gen3 x1)",
          "notes": "Provides 890 MB/s read and 550 MB/s write speeds"
        },
        "TeamGroup APEX SD7.1 microSD Express 128GB": {
          "brand": "TeamGroup",
          "model": "APEX SD7.1 microSD Express 128GB",
          "kNumber": null,
          "capacityGb": 128,
          "capacityTb": 0.128,
          "interface": "microSD Express (PCIe)",
          "notes": "Read up to 800 MB/s and write up to 500 MB/s; UHS-I fallback of 100 MB/s read and 90 MB/s write"
        },
        "TeamGroup APEX SD7.1 microSD Express 256GB": {
          "brand": "TeamGroup",
          "model": "APEX SD7.1 microSD Express 256GB",
          "kNumber": null,
          "capacityGb": 256,
          "capacityTb": 0.256,
          "interface": "microSD Express (PCIe)",
          "notes": "Delivers 800 MB/s read and 700 MB/s write; backwards compatible with UHS-I at 100/90 MB/s"
        },
        "TeamGroup APEX SD7.1 microSD Express 512GB": {
          "brand": "TeamGroup",
          "model": "APEX SD7.1 microSD Express 512GB",
          "kNumber": null,
          "capacityGb": 512,
          "capacityTb": 0.512,
          "interface": "microSD Express (PCIe)",
          "notes": "Same 800/700 MB/s performance as the 256GB version"
        },
        "TeamGroup APEX SD7.1 microSD Express 1TB": {
          "brand": "TeamGroup",
          "model": "APEX SD7.1 microSD Express 1TB",
          "kNumber": null,
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "microSD Express (PCIe)",
          "notes": "High-capacity card with 800 MB/s read and 700 MB/s write; lifetime warranty"
        }
      },
      "cardReaders": {
        "Angelbird CFexpress Type A Reader": {
          "brand": "Angelbird",
          "model": "CFexpress Type A Reader",
          "supportedMedia": [
            "CFexpress Type A"
          ],
          "interface": "USB 3.2 Gen 2 (USB-C, 10 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Thermal conductive aluminium housing with protective rubber pads; ships with USB-C to USB-C and USB-C to USB-A cables."
        },
        "Angelbird CFexpress Type B & CFast 2.0 Reader": {
          "brand": "Angelbird",
          "model": "CFexpress Type B & CFast Reader",
          "supportedMedia": [
            "CFexpress Type B",
            "CFast 2.0"
          ],
          "interface": "USB 3.2 Gen 2 (USB-C, 10 Gb/s)",
          "slots": 2,
          "busPowered": true,
          "notes": "Dual-slot reader with USB-C and USB-A cables included; supports simultaneous card access."
        },
        "Angelbird CFexpress Type B Card Reader (USB 4.0)": {
          "brand": "Angelbird",
          "model": "CFexpress Type B Card Reader (USB 4.0)",
          "supportedMedia": [
            "CFexpress Type B"
          ],
          "interface": "USB 4.0 Gen 3x2 (40 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Card reader with up to 40 Gb/s transfer rate and Solid Connect technology"
        },
        "ARRI Codex Compact Drive Reader (USB-C)": {
          "brand": "ARRI",
          "model": "Codex Compact Drive Reader",
          "kNumber": "K2.0024130",
          "supportedMedia": [
            "Codex Compact Drive"
          ],
          "interface": "USB 3.1 Gen 2 (USB-C, ~8 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Designed for Codex Compact Drive media; includes USB-C to USB-C cable."
        },
        "Lexar Professional CFexpress Type A / SD USB 3.2 Reader": {
          "brand": "Lexar",
          "model": "Professional CFexpress Type A / SD Reader",
          "supportedMedia": [
            "CFexpress Type A",
            "SD UHS-II",
            "SD UHS-I"
          ],
          "interface": "USB 3.2 Gen 2 (USB-C, 10 Gb/s)",
          "slots": 2,
          "busPowered": true,
          "notes": "Dual-slot reader with angled base for desk use; includes USB-C to USB-C and USB-C to USB-A cables."
        },
        "Lexar Workflow CFexpress Type B Reader (USB 4.0)": {
          "brand": "Lexar",
          "model": "Workflow CFexpress Type B Reader (USB 4.0)",
          "supportedMedia": [
            "CFexpress 4.0 Type B"
          ],
          "interface": "USB 4.0 (40 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Reader for CFexpress Type B cards with up to 40 Gbps transfer"
        },
        "Lexar Workflow CFexpress Type A Reader (USB 4.0)": {
          "brand": "Lexar",
          "model": "Workflow CFexpress Type A Reader (USB 4.0)",
          "supportedMedia": [
            "CFexpress 4.0 Type A"
          ],
          "interface": "USB 4.0 (40 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Reader for CFexpress Type A cards with up to 1800 MB/s transfer"
        },
        "Lexar microSD Express Card Reader": {
          "brand": "Lexar",
          "model": "microSD Express Card Reader",
          "supportedMedia": [
            "microSD Express",
            "microSD UHS-I",
            "microSD UHS-II"
          ],
          "interface": "USB 3.2 Gen 2 (10 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Reader with internal fan and up to 900 MB/s transfer speed"
        },
        "Lexar Professional CFexpress Type B USB 3.2 Gen 2x2 Reader": {
          "brand": "Lexar",
          "model": "Professional CFexpress Type B USB 3.2 Gen 2x2 Reader",
          "supportedMedia": [
            "CFexpress Type B"
          ],
          "interface": "USB 3.2 Gen 2x2 (20 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Reader delivering up to 1900 MB/s"
        },
        "Lexar Professional XQD 2.0 USB 3.0 Reader": {
          "brand": "Lexar",
          "model": "Professional XQD 2.0",
          "supportedMedia": [
            "XQD"
          ],
          "interface": "USB 3.0 (USB 3.1 Gen 1 Micro-B)",
          "slots": 1,
          "busPowered": true,
          "notes": "Compact reader for XQD 2.0 cards; ships with USB Type-C and USB Type-A cables."
        },
        "Panasonic AU-XPD3 ExpressP2 / microP2 Reader": {
          "brand": "Panasonic",
          "model": "AU-XPD3",
          "supportedMedia": [
            "ExpressP2",
            "microP2"
          ],
          "interface": "Thunderbolt 3 (40 Gb/s)",
          "slots": 2,
          "busPowered": false,
          "notes": "Dual-slot Thunderbolt reader with metal chassis; supports daisy-chaining and optional PCIe adapter."
        },
        "RED Station CFexpress Type B (USB-C)": {
          "brand": "RED",
          "model": "RED Station CFexpress Type B",
          "supportedMedia": [
            "RED CFexpress",
            "CFexpress Type B"
          ],
          "interface": "USB 3.2 Gen 2 (USB-C, 10 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Bus-powered aluminium reader tailored for KOMODO-X and V-RAPTOR CFexpress media."
        },
        "RED Station RED MINI-MAG (USB-C)": {
          "brand": "RED",
          "model": "RED Station RED MINI-MAG",
          "supportedMedia": [
            "RED MINI-MAG"
          ],
          "interface": "USB 3.1 Gen 2 (USB-C, 10 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Tool-free reader compatible with RED MINI-MAG media; includes USB-C to USB-C cable."
        },
        "Sony AXS-AR1 Card Reader": {
          "brand": "Sony",
          "model": "AXS-AR1",
          "kNumber": "AXS-AR1",
          "supportedMedia": [
            "Sony AXS"
          ],
          "interface": "USB 3.0 (USB 3.1 Gen 1 Type-B)",
          "slots": 1,
          "busPowered": true,
          "notes": "Single-slot reader for AXS A series media; backward compatible with AXS-R series."
        },
        "Sony SBAC-US30 SxS Reader": {
          "brand": "Sony",
          "model": "SBAC-US30",
          "supportedMedia": [
            "SxS PRO+",
            "SxS PRO X",
            "SxS-1"
          ],
          "interface": "USB 3.0 (USB 3.1 Gen 1 Micro-B)",
          "slots": 1,
          "busPowered": true,
          "notes": "Durable single-slot SxS reader with locking USB cable; backward compatible with legacy SxS media."
        },
        "Sony MRW-G2 CFexpress Type A / SD Reader": {
          "brand": "Sony",
          "model": "MRW-G2",
          "supportedMedia": [
            "CFexpress Type A",
            "SD UHS-II",
            "SD UHS-I"
          ],
          "interface": "USB 3.2 Gen 2 (USB-C)",
          "slots": 2,
          "busPowered": true,
          "notes": "Dual-slot reader supporting CFexpress Type A and SD cards; ships with USB-C and USB-A cables."
        },
        "Sony MRW-G3 CFexpress Type A Reader": {
          "brand": "Sony",
          "model": "MRW-G3",
          "supportedMedia": [
            "CFexpress Type A",
            "SDXC UHS-II"
          ],
          "interface": "USB4 (40 Gb/s)",
          "slots": 2,
          "busPowered": true,
          "notes": "Supports CFexpress Type A 4.0 cards and SD cards"
        },
        "ProGrade Digital CFexpress Type B & SD Reader (Thunderbolt 4)": {
          "brand": "ProGrade",
          "model": "PG04",
          "supportedMedia": [
            "CFexpress Type B",
            "SD UHS-II",
            "SD UHS-I"
          ],
          "interface": "Thunderbolt 4 (40 Gb/s)",
          "slots": 2,
          "busPowered": true,
          "notes": "Aluminium enclosure with detachable 0.5m cable; supports simultaneous card access."
        },
        "SanDisk Professional PRO-READER SD & microSD": {
          "brand": "SanDisk Professional",
          "model": "PRO-READER SD and microSD",
          "supportedMedia": [
            "SD UHS-II",
            "SD UHS-I",
            "microSD UHS-I",
            "microSD UHS-II"
          ],
          "interface": "USB 3.2 Gen 2 (USB-C, 10 Gb/s)",
          "slots": 2,
          "busPowered": true,
          "notes": "Aluminium reader with heat-dissipating design; supports the PRO-DOCK 4 modular workflow."
        },
        "Blackmagic Design USB-C CFast 2.0 Reader": {
          "brand": "Blackmagic Design",
          "model": "CFast 2.0 Reader",
          "supportedMedia": [
            "CFast 2.0"
          ],
          "interface": "USB 3.1 Gen 2 (USB-C, 10 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Compact aluminium housing; designed for CFast-based URSA Mini workflows."
        },
        "DJI CINESSD Station (Thunderbolt 3)": {
          "brand": "DJI",
          "model": "CINESSD Station Thunderbolt 3",
          "supportedMedia": [
            "DJI CINESSD"
          ],
          "interface": "Thunderbolt 3 (40 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Tool-free slot for Inspire 2 CINESSD media; draws power directly over Thunderbolt."
        },
        "Panasonic AJ-PCD30 Triple P2 Reader": {
          "brand": "Panasonic",
          "model": "AJ-PCD30",
          "supportedMedia": [
            "P2"
          ],
          "interface": "USB 3.0 (USB 3.1 Gen 1, 5 Gb/s)",
          "slots": 3,
          "busPowered": false,
          "notes": "Triple-slot desktop reader for legacy P2 media; includes locking DC power supply for studio racks."
        },
        "Sony SBAC-T40 Dual SxS Reader": {
          "brand": "Sony",
          "model": "SBAC-T40",
          "supportedMedia": [
            "SxS PRO+",
            "SxS PRO X",
            "SxS-1"
          ],
          "interface": "Thunderbolt 3 (40 Gb/s)",
          "slots": 2,
          "busPowered": false,
          "notes": "Dual-slot desktop reader with Thunderbolt daisy-chain support; includes integrated AC power."
        },
        "Sonnet SF3 Series – CFexpress/XQD Pro Card Reader": {
          "brand": "Sonnet",
          "model": "SF3 Series CFexpress/XQD Pro Card Reader",
          "supportedMedia": [
            "CFexpress Type B",
            "XQD"
          ],
          "interface": "Thunderbolt 3 (40 Gb/s)",
          "slots": 2,
          "busPowered": true,
          "notes": "Dual-slot Thunderbolt reader that supports mixed CFexpress Type B and XQD workflows."
        },
        "SanDisk Professional PRO-READER CFexpress Type B": {
          "brand": "SanDisk Professional",
          "model": "PRO-READER CFexpress Type B",
          "supportedMedia": [
            "CFexpress Type B"
          ],
          "interface": "USB 3.2 Gen 2 (USB-C, 10 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Aluminium heat-sink shell designed for sustained transfers; includes 0.5 m USB-C cable and mates with PRO-DOCK 4."
        },
        "Wise Advanced CFexpress Type B & SD Dual Reader": {
          "brand": "Wise Advanced",
          "model": "CFexpress Type B & SD Dual Reader",
          "supportedMedia": [
            "CFexpress Type B",
            "SD UHS-II",
            "SD UHS-I"
          ],
          "interface": "USB 3.2 Gen 2 (USB-C, 10 Gb/s)",
          "slots": 2,
          "busPowered": true,
          "notes": "Magnetic metal enclosure with included USB-C to USB-C and USB-C to USB-A cables."
        },
        "Delkin Devices CFexpress Type B & SD UHS-II Reader": {
          "brand": "Delkin Devices",
          "model": "DDREADER-54",
          "supportedMedia": [
            "CFexpress Type B",
            "SD UHS-II",
            "SD UHS-I"
          ],
          "interface": "USB 3.2 Gen 2 (USB-C, 10 Gb/s)",
          "slots": 2,
          "busPowered": true,
          "notes": "Rugged metal housing with non-slip rubber foot; ships with reversible USB-C to USB-C and USB-C to USB-A cables."
        },
        "Atomos USB-C 3.1 Docking Station": {
          "brand": "Atomos",
          "model": "Docking Station USB-C 3.1",
          "supportedMedia": [
            "AtomX SSDmini",
            "Master Caddy II"
          ],
          "interface": "USB 3.1 Gen 2 (USB-C, 10 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Tool-free dock for AtomX SSDmini and Master Caddy media; includes 80 cm USB-C to USB-C cable."
        },
        "Blackjet UX-1 Cinema Dock": {
          "brand": "Blackjet",
          "model": "UX-1 Cinema Dock",
          "supportedMedia": [
            "CFast 2.0",
            "XQD",
            "SxS",
            "Red MINI-MAG",
            "SD UHS-II",
            "microSD UHS-I"
          ],
          "interface": "Thunderbolt 3 (40 Gb/s)",
          "slots": 6,
          "busPowered": false,
          "notes": "Modular desktop dock with swappable media modules; dual Thunderbolt 3 ports support daisy-chaining."
        },
        "OWC Atlas CFexpress Type B Card Reader": {
          "brand": "OWC",
          "model": "Atlas CFexpress Type B Card Reader",
          "supportedMedia": [
            "CFexpress 4.0 Type B"
          ],
          "interface": "USB4 (40 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Card reader with up to 5000 MB/s transfer speed"
        },
        "OWC Atlas FXR CFexpress Type B Reader": {
          "brand": "OWC",
          "model": "Atlas FXR",
          "supportedMedia": [
            "CFexpress Type B"
          ],
          "interface": "USB 3.2 Gen 2 (USB-C, 10 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Pocket-sized aluminium reader with integrated heat sink; includes USB-C to USB-C and USB-C to USB-A cables."
        },
        "Wise Advanced RD-40CXB CFexpress Type B Reader": {
          "brand": "Wise Advanced",
          "model": "RD-40CXB CFexpress Type B Reader",
          "supportedMedia": [
            "CFexpress Type B"
          ],
          "interface": "USB4 (40 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Single-slot reader; includes USB4 cable and uses an aluminium chassis for heat dissipation"
        },
        "Nextorage NX-SA1PRO CFexpress Type A Reader": {
          "brand": "Nextorage",
          "model": "NX-SA1PRO CFexpress Type A Reader",
          "supportedMedia": [
            "CFexpress Type A"
          ],
          "interface": "USB4 (40 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Reader supports up to 5 GB/s transfers with a large heat sink and is supplied with a Thunderbolt cable"
        },
        "Nextorage NX-SB1PRO CFexpress Type B Reader": {
          "brand": "Nextorage",
          "model": "NX-SB1PRO CFexpress Type B Reader",
          "supportedMedia": [
            "CFexpress Type B"
          ],
          "interface": "USB4 (40 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "40 Gb/s reader with a large heat sink and data transfer up to 3300 MB/s; includes a USB4 cable"
        },
        "ProGrade Digital PGM12 Mobile CFexpress Type A Reader": {
          "brand": "ProGrade",
          "model": "PGM12 Mobile CFexpress Type A Reader",
          "supportedMedia": [
            "CFexpress Type A"
          ],
          "interface": "USB 3.2 Gen 2 (10 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Portable reader with magnetic base for mounting to a phone or rig; delivers up to 1.25 GB/s transfer speeds"
        },
        "Exascend Nitro CFexpress Type B Reader": {
          "brand": "Exascend",
          "model": "Nitro CFexpress Type B Reader",
          "supportedMedia": [
            "CFexpress Type B"
          ],
          "interface": "USB4 (40 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Single-slot reader with 40 Gb/s USB-C interface; includes magnetic mounting and cable"
        },
        "Exascend CFexpress Type B Reader 20 Gbps": {
          "brand": "Exascend",
          "model": "CFexpress Type B Reader 20 Gbps",
          "supportedMedia": [
            "CFexpress Type B"
          ],
          "interface": "USB 3.2 Gen 2x2 (20 Gb/s)",
          "slots": 1,
          "busPowered": true,
          "notes": "Reader provides transfers around 2000 MB/s; a higher-bandwidth 40 Gbps version is forthcoming"
        },
        "Chipfancier CFexpress Type-A/B 2-in-1 Card Reader": {
          "brand": "Chipfancier",
          "model": "CFexpress Type-A/B 2-in-1 Card Reader",
          "supportedMedia": [
            "CFexpress Type A",
            "CFexpress Type B"
          ],
          "interface": "USB4 / Thunderbolt 3/4 (40 Gb/s)",
          "slots": 2,
          "busPowered": true,
          "notes": "Dual-slot reader that runs at 40 Gbps via USB4 or Thunderbolt; falls back to 20 Gbps on USB 3.2 Gen2x2"
        }
      },
      "tripodHeads": {
        "OConnor 2560 Head": {
          "brand": "OConnor",
          "bowlSizeMm": 150,
          "material": "Aluminum",
          "weightKg": 8.2
        },
        "Sachtler FSB 8 Head": {
          "brand": "Sachtler",
          "bowlSizeMm": 75,
          "material": "Aluminum",
          "weightKg": 2.6
        },
        "Sachtler Cine 30": {
          "brand": "Sachtler",
          "bowlSizeMm": 150,
          "material": "Aluminum",
          "weightKg": 6.7
        },
        "Sachtler Video 20 S1": {
          "brand": "Sachtler",
          "bowlSizeMm": 100,
          "material": "Aluminum",
          "weightKg": 4.1
        },
        "OConnor Ultimate 1040": {
          "brand": "OConnor",
          "bowlSizeMm": 100,
          "material": "Aluminum",
          "weightKg": 4.8
        },
        "Manfrotto Nitrotech 608": {
          "brand": "Manfrotto",
          "bowlSizeMm": 75,
          "material": "Aluminum"
        },
        "Cartoni Maxima 40 Head": {
          "brand": "Cartoni",
          "bowlSizeMm": 150,
          "material": "Magnesium"
        },
        "Miller CX18 Fluid Head": {
          "brand": "Miller",
          "bowlSizeMm": 75,
          "material": "Magnesium"
        },
        "Libec RH45D Head": {
          "brand": "Libec",
          "bowlSizeMm": 100,
          "material": "Aluminum"
        },
        "Vinten Vision 10AS Head": {
          "brand": "Vinten",
          "bowlSizeMm": 100,
          "material": "Aluminum"
        }
      },
      "tripods": {
        "Sachtler flowtech 75 aktiv / 75 (MS/GS)": {
          "brand": "Sachtler",
          "model": "flowtech 75 aktiv / 75 (MS/GS)",
          "material": "Carbon Fiber",
          "stages": 2,
          "bowlSizeMm": 75,
          "bowlMount": [
            75
          ],
          "payloadKg": 20,
          "heightRangeCm": "26–153",
          "weightKg": 2.9,
          "spreader": [
            "ground",
            "mid-level",
            "none"
          ],
          "features": "hinge-lock design; spreaderless mode; optional spreaders",
          "dimensionsCm": "transport length 68",
          "sizeClass": "long",
          "notes": "Flowtech overview PDF: payload 20 kg, weight 2.9 kg, height 26–153 cm.",
          "sourceUrl": "https://www.avc-group.com/assets/products/Sachtler/pdf/Sachtler-Flowtech-Overview.pdf"
        },
        "Sachtler flowtech 100 / aktiv (MS/GS)": {
          "brand": "Sachtler",
          "model": "flowtech 100 / aktiv (MS/GS)",
          "material": "Carbon Fiber",
          "stages": 2,
          "bowlSizeMm": 100,
          "bowlMount": [
            100
          ],
          "payloadKg": 30,
          "heightRangeCm": "26–153",
          "weightKg": 3.2,
          "spreader": [
            "ground",
            "mid-level",
            "none"
          ],
          "features": "hinge-lock; spreaderless or with mid/ground spreaders",
          "dimensionsCm": "transport length 68",
          "sizeClass": "long",
          "notes": "Flowtech overview: payload 30 kg, weight 3.2 kg, height 26–153 cm.",
          "sourceUrl": "https://www.avc-group.com/assets/products/Sachtler/pdf/Sachtler-Flowtech-Overview.pdf"
        },
        "Sachtler DA 100 K": {
          "brand": "Sachtler",
          "model": "DA 100 K",
          "material": "Aluminum",
          "stages": 1,
          "bowlSizeMm": 100,
          "bowlMount": [
            100
          ],
          "payloadKg": 40,
          "heightRangeCm": "13–27",
          "weightKg": 1.5,
          "spreader": [
            "ground"
          ],
          "features": "mini ENG-style baby tripod",
          "dimensionsCm": "transport 22",
          "sizeClass": "short",
          "notes": "Spec PDF: height 13–27 cm, weight 1.5 kg, payload 40 kg.",
          "sourceUrl": "https://www.sachtler.com/en/product/tripod-da-100-k/?print-products=pdf"
        },
        "Sachtler DA 150 K": {
          "brand": "Sachtler",
          "model": "DA 150 K",
          "material": "Aluminum",
          "stages": 1,
          "bowlSizeMm": 150,
          "bowlMount": [
            150
          ],
          "payloadKg": 40,
          "heightRangeCm": "15–39",
          "weightKg": 3.1,
          "spreader": [
            "ground"
          ],
          "features": "low-angle baby tripod",
          "dimensionsCm": "transport 32",
          "sizeClass": "short",
          "notes": "Height 15–39 cm; payload 40 kg; weight 3.1 kg.",
          "sourceUrl": "https://www.sachtler.com/en/product/tripod-da-150-k/?print-products=pdf"
        },
        "Sachtler DA 150 Medium": {
          "brand": "Sachtler",
          "model": "DA 150 Medium",
          "material": "Aluminum",
          "stages": 1,
          "bowlSizeMm": 150,
          "bowlMount": [
            150
          ],
          "payloadKg": 50,
          "heightRangeCm": "21–85",
          "weightKg": 3.9,
          "spreader": [
            "ground",
            "mid-level"
          ],
          "features": "mid-size 150 mm leg",
          "dimensionsCm": "transport 57",
          "sizeClass": "medium",
          "notes": "Height 21–85 cm; payload 50 kg; weight 3.9 kg.",
          "sourceUrl": "https://www.sachtler.com/en/product/tripod-da-150-medium/"
        },
        "Sachtler DA 100 HD": {
          "brand": "Sachtler",
          "model": "DA 100 HD",
          "material": "Aluminum",
          "stages": 1,
          "bowlSizeMm": 100,
          "bowlMount": [
            100
          ],
          "payloadKg": 80,
          "heightRangeCm": "65–142",
          "weightKg": 4.4,
          "spreader": [
            "ground",
            "mid-level"
          ],
          "features": "heavy-duty single-extension 100 mm",
          "dimensionsCm": "transport 82",
          "sizeClass": "medium",
          "notes": "Height 65–142 cm; payload 80 kg; weight 4.4 kg.",
          "sourceUrl": "https://d17bck4wpaw2mg.cloudfront.net/att/a/0/0/i/a00iy5/sachtler-da-100-hd.pdf"
        },
        "Sachtler DA 150 L": {
          "brand": "Sachtler",
          "model": "DA 150 L",
          "material": "Aluminum",
          "stages": 1,
          "bowlSizeMm": 150,
          "bowlMount": [
            150
          ],
          "payloadKg": 90,
          "heightRangeCm": "79–166",
          "weightKg": 5,
          "spreader": [
            "ground",
            "mid-level"
          ],
          "features": "long 150 mm leg",
          "dimensionsCm": "transport 92",
          "sizeClass": "long",
          "notes": "Height 79–166 cm; payload 90 kg; weight 5.0 kg.",
          "sourceUrl": "https://d17bck4wpaw2mg.cloudfront.net/att/a/0/0/j/a00jt5/sachtler-da-150-l.pdf"
        },
        "Sachtler DA 100 L (CF 100 L)": {
          "brand": "Sachtler",
          "model": "DA 100 L (CF 100 L)",
          "material": "Carbon Fiber",
          "stages": 1,
          "bowlSizeMm": 100,
          "bowlMount": [
            100
          ],
          "payloadKg": 45,
          "heightRangeCm": "65–142",
          "weightKg": 2.4,
          "spreader": [
            "ground",
            "mid-level"
          ],
          "features": "carbon fibre long version",
          "dimensionsCm": "",
          "sizeClass": "medium",
          "notes": "Height 65–142 cm; payload 45 kg; weight 2.4 kg.",
          "sourceUrl": "https://www.sachtler.com/en/product/tripod-cf-100-l/?print-products=pdf"
        },
        "Sachtler DA 75 (4183)": {
          "brand": "Sachtler",
          "model": "DA 75 (4183)",
          "material": "Aluminum",
          "stages": 1,
          "bowlSizeMm": 75,
          "bowlMount": [
            75
          ],
          "payloadKg": 15,
          "heightRangeCm": "54–138",
          "weightKg": 2,
          "spreader": [
            "none"
          ],
          "features": "single extension 75 mm tripod",
          "dimensionsCm": "folded 81.5",
          "sizeClass": "medium",
          "notes": "Height 54–138 cm; payload 15 kg; weight 2.0 kg.",
          "sourceUrl": "https://www.bhphotovideo.com/c/product/413477-REG/Sachtler_4183_DA_75_Tripod.html"
        },
        "Sachtler EFP-2 CF Tripod (mid spreader)": {
          "brand": "Sachtler",
          "material": "Carbon Fiber",
          "bowlSizeMm": 150,
          "spreader": "mid"
        },
        "Sachtler Cine 150 Tripod (medium + spreader)": {
          "brand": "Sachtler",
          "material": "Aluminum",
          "bowlSizeMm": 150,
          "spreader": "medium"
        },
        "Sachtler Cine 2000 Tripod (short + spreader)": {
          "brand": "Sachtler",
          "material": "Aluminum",
          "bowlSizeMm": 150,
          "spreader": "short"
        },
        "OConnor 30L (100mm)": {
          "brand": "OConnor",
          "model": "30L (100mm)",
          "material": "Carbon Fiber",
          "stages": 2,
          "bowlSizeMm": 100,
          "bowlMount": [
            100
          ],
          "payloadKg": 95,
          "heightRangeCm": "56–157",
          "weightKg": 4,
          "spreader": [
            "mid-level",
            "ground"
          ],
          "features": "quick clamping; integral spreader system",
          "dimensionsCm": "collapsed 75",
          "sizeClass": "long",
          "notes": "Payload up to 95 kg; height 56–157 cm; weight 4 kg.",
          "sourceUrl": "https://www.ocon.com/products/tripods/30l/"
        },
        "OConnor 60L (Mitchell/150mm)": {
          "brand": "OConnor",
          "model": "60L (Mitchell/150mm)",
          "material": "Carbon Fiber",
          "stages": 2,
          "bowlSizeMm": 150,
          "bowlMount": [
            "Mitchell",
            150
          ],
          "payloadKg": 95,
          "heightRangeCm": "58–154",
          "weightKg": 4.1,
          "spreader": [
            "mid-level",
            "ground"
          ],
          "features": "Mitchell or 150 mm bowl; quick clamps",
          "dimensionsCm": "collapsed 76",
          "sizeClass": "long",
          "notes": "Height 58–154 cm; weight 4.1 kg.",
          "sourceUrl": "https://www.ocon.com/products/tripods/60l/"
        },
        "OConnor Cine HD Tall (Mitchell/150mm)": {
          "brand": "OConnor",
          "model": "Cine HD Tall (Mitchell/150mm)",
          "material": "Aluminum",
          "stages": 2,
          "bowlSizeMm": 150,
          "bowlMount": [
            "Mitchell",
            150
          ],
          "payloadKg": 140,
          "heightRangeCm": "85–176",
          "weightKg": 13.3,
          "spreader": [
            "ground"
          ],
          "features": "heavy-duty cine tripod",
          "dimensionsCm": "collapsed 103",
          "sizeClass": "long",
          "notes": "Payload 140 kg; height 85–176 cm; weight 13.3 kg.",
          "sourceUrl": "https://www.ocon.com/products/tripods/cine-hd/"
        },
        "Ronford-Baker Heavy Duty Tall": {
          "brand": "Ronford-Baker",
          "model": "Heavy Duty Tall",
          "material": "Aluminum",
          "stages": 1,
          "bowlSizeMm": 150,
          "bowlMount": [
            "Mitchell",
            150
          ],
          "payloadKg": null,
          "heightRangeCm": "89–173",
          "weightKg": 10,
          "spreader": [
            "ground"
          ],
          "features": "integral spreader; 1\" alloy tubes",
          "dimensionsCm": "",
          "sizeClass": "long",
          "notes": "Height 89–173 cm; weight 10 kg. RB catalog.",
          "sourceUrl": "https://www.nacinc.jp/wp-content/uploads/2014/12/ronford_catalog.pdf"
        },
        "Ronford-Baker Heavy Duty Short": {
          "brand": "Ronford-Baker",
          "model": "Heavy Duty Short",
          "material": "Aluminum",
          "stages": 1,
          "bowlSizeMm": 150,
          "bowlMount": [
            "Mitchell",
            150
          ],
          "payloadKg": null,
          "heightRangeCm": "25–85",
          "weightKg": 8.2,
          "spreader": [
            "ground"
          ],
          "features": "short version; integral spreader",
          "dimensionsCm": "",
          "sizeClass": "medium",
          "notes": "Max height 85 cm → medium class. RB catalog.",
          "sourceUrl": "https://www.nacinc.jp/wp-content/uploads/2014/12/ronford_catalog.pdf"
        },
        "Ronford-Baker Medium Duty Tall": {
          "brand": "Ronford-Baker",
          "model": "Medium Duty Tall",
          "material": "Aluminum",
          "stages": 1,
          "bowlSizeMm": 150,
          "bowlMount": [
            150,
            "Mitchell",
            100
          ],
          "payloadKg": null,
          "heightRangeCm": "86–178",
          "weightKg": 6.4,
          "spreader": [
            "ground"
          ],
          "features": "150 mm bowl standard; Mitchell/100 mm optional",
          "dimensionsCm": "",
          "sizeClass": "long",
          "notes": "Height 86–178 cm; weight 6.4 kg.",
          "sourceUrl": "https://www.nacinc.jp/wp-content/uploads/2014/12/ronford_catalog.pdf"
        },
        "Ronford-Baker Medium Duty Short": {
          "brand": "Ronford-Baker",
          "model": "Medium Duty Short",
          "material": "Aluminum",
          "stages": 1,
          "bowlSizeMm": 150,
          "bowlMount": [
            150,
            "Mitchell",
            100
          ],
          "payloadKg": null,
          "heightRangeCm": "18–91",
          "weightKg": 5,
          "spreader": [
            "ground"
          ],
          "features": "short variant; integral spreader",
          "dimensionsCm": "",
          "sizeClass": "medium",
          "notes": "Height 18–91 cm; weight 5 kg.",
          "sourceUrl": "https://www.nacinc.jp/wp-content/uploads/2014/12/ronford_catalog.pdf"
        },
        "Manfrotto 645 FAST Twin CF (MVTTWINFC)": {
          "brand": "Manfrotto",
          "model": "645 FAST Twin CF (MVTTWINFC)",
          "material": "Carbon Fiber",
          "stages": 2,
          "bowlSizeMm": 100,
          "bowlMount": [
            100,
            75
          ],
          "payloadKg": null,
          "heightRangeCm": "73–157",
          "weightKg": 3.6,
          "spreader": [
            "mid-level",
            "ground"
          ],
          "features": "FAST lock system; adapter for 75 mm",
          "dimensionsCm": "closed 73",
          "sizeClass": "long",
          "notes": "Height 73–157 cm; weight 3.6 kg.",
          "sourceUrl": "https://www.manfrotto.com/us-en/645-fast-twin-leg-carbon-tripod-mvttwinfcus/"
        },
        "Manfrotto 635 FAST Single CF (MVTSNGFC)": {
          "brand": "Manfrotto",
          "model": "635 FAST Single CF (MVTSNGFC)",
          "material": "Carbon Fiber",
          "stages": 3,
          "bowlSizeMm": 75,
          "bowlMount": [
            75
          ],
          "payloadKg": 20,
          "heightRangeCm": "29–155",
          "weightKg": 3.5,
          "spreader": [
            "mid-level"
          ],
          "features": "single leg; 75 mm bowl",
          "dimensionsCm": "closed 73.5",
          "sizeClass": "long",
          "notes": "Height 29–155 cm; payload 20 kg.",
          "sourceUrl": "https://www.manfrotto.com/global/manfrotto-635-fast-single-tripod-carbon-fiber-mvtsngfc/"
        },
        "Miller Sprinter II 2-Stage CF (1576)": {
          "brand": "Miller",
          "model": "Sprinter II 2-Stage CF (1576)",
          "material": "Carbon Fiber",
          "stages": 2,
          "bowlSizeMm": 100,
          "bowlMount": [
            100
          ],
          "payloadKg": 45.4,
          "heightRangeCm": "44–153",
          "weightKg": 3.2,
          "spreader": [
            "mid-level",
            "ground"
          ],
          "features": "Sprinter quick locks; mid-level spreader ready",
          "dimensionsCm": "transport 70",
          "sizeClass": "long",
          "notes": "Height 44–153 cm; payload 45.4 kg.",
          "sourceUrl": "https://www.millertripods.com/product/sprinter-ii-2-stage-tripod-cf/"
        },
        "Miller Baby Aluminum 2-Stage (455)": {
          "brand": "Miller",
          "model": "Baby Aluminum 2-Stage (455)",
          "material": "Aluminum",
          "stages": 2,
          "bowlSizeMm": 100,
          "bowlMount": [
            100
          ],
          "payloadKg": 22.7,
          "heightRangeCm": "25–52",
          "weightKg": null,
          "spreader": [
            "ground"
          ],
          "features": "toggle locks; ground spreader",
          "dimensionsCm": "",
          "sizeClass": "short",
          "notes": "Height 25–52 cm; payload ~22.7 kg (dealer claim). Needs manufacturer confirmation.",
          "sourceUrl": "https://www.filmtools.com/miller-baby-aluminum-2-stage-tripod-legs-100mm-bowl-455.html"
        },
        "Libec RT50B (100mm)": {
          "brand": "Libec",
          "model": "RT50B (100mm)",
          "material": "Aluminum",
          "stages": 2,
          "bowlSizeMm": 100,
          "bowlMount": [
            100
          ],
          "payloadKg": 40,
          "heightRangeCm": "47–157",
          "weightKg": 3.1,
          "spreader": [
            "ground",
            "mid-level"
          ],
          "features": "ENG tripod; 100 mm bowl",
          "dimensionsCm": "",
          "sizeClass": "long",
          "notes": "Height 47–157 cm; payload 40 kg.",
          "sourceUrl": "https://www.libecsales.com/products/tripods/RT50B.html"
        },
        "Libec RT30B (75mm)": {
          "brand": "Libec",
          "model": "RT30B (75mm)",
          "material": "Aluminum",
          "stages": 2,
          "bowlSizeMm": 75,
          "bowlMount": [
            75
          ],
          "payloadKg": 25,
          "heightRangeCm": "41–150",
          "weightKg": 2.6,
          "spreader": [
            "ground",
            "mid-level",
            "none"
          ],
          "features": "rotating lock levers; spiked feet",
          "dimensionsCm": "folded 71",
          "sizeClass": "medium",
          "notes": "Height 41–150 cm; payload 25 kg.",
          "sourceUrl": "https://www.bhphotovideo.com/c/product/688731-REG/Libec_RT30B_RT30B_2_Stage_Aluminum_Tripod.html"
        },
        "Libec TH-Z T (75mm)": {
          "brand": "Libec",
          "model": "TH-Z T (75mm)",
          "material": "Aluminum",
          "stages": 2,
          "bowlSizeMm": 75,
          "bowlMount": [
            75
          ],
          "payloadKg": 25,
          "heightRangeCm": "59–149",
          "weightKg": 2.3,
          "spreader": [
            "mid-level",
            "ground"
          ],
          "features": "ENG tripod; 2-stage",
          "dimensionsCm": "",
          "sizeClass": "medium",
          "notes": "Height 59–149 cm; payload 25 kg.",
          "sourceUrl": "https://www.libecsales.com/products/tripods/TH-Z_T.html"
        }
      },
      "sliders": {
        "ProSup Tango Roller (120/220)": {
          "brand": "ProSup",
          "model": "Tango Roller (120/220)",
          "travelCm": [
            90,
            190
          ],
          "payloadHorizontalKg": 15,
          "bowlMount": [
            75,
            100,
            150,
            "Mitchell",
            "Flat"
          ],
          "driveType": "manual (roller bearings)",
          "motorized": false,
          "weightKg": [
            7.6,
            10.3
          ],
          "material": "aluminum/steel",
          "features": "over/under-slung use; magnetic end-stops; modular extension",
          "dimensionsCm": [
            "126 × 14 × —",
            "226 × 14 × —"
          ],
          "notes": "Base 120 cm rail: 90 cm travel, 7.6 kg. Extended 220 cm rail: 190 cm travel, 10.3 kg. Payload 15 kg."
        },
        "Kessler CineSlider 5 ft (60.5\")": {
          "brand": "Kessler",
          "model": "CineSlider 5 ft (60.5\")",
          "travelCm": 130,
          "payloadHorizontalKg": 36.3,
          "payloadVerticalKg": 15.9,
          "bowlMount": [
            "Flat",
            100
          ],
          "driveType": "belt/roller, motion-control ready",
          "motorized": false,
          "weightKg": 5.4,
          "material": "reinforced aluminum",
          "features": "adjustable drag; crank optional; integrates with Kessler motion control system",
          "dimensionsCm": "154 × 12.7 × 12.7",
          "notes": "Horizontal 80 lb / 36.3 kg, vertical 35 lb / 15.9 kg."
        },
        "Edelkrone SliderONE v3 (Motorized)": {
          "brand": "Edelkrone",
          "model": "SliderONE v3",
          "travelCm": 20,
          "payloadHorizontalKg": 9,
          "payloadVerticalKg": 2.3,
          "bowlMount": [
            "Flat"
          ],
          "driveType": "motorized (leadscrew)",
          "motorized": true,
          "weightKg": 1.1,
          "material": "aluminum",
          "features": "wireless app control; vertical/incline capable within rated load",
          "dimensionsCm": "27 × 9.5 × 5",
          "notes": "Payload 9 kg horizontal, 2.3 kg incline/vertical."
        },
        "Edelkrone SliderPLUS v5 PRO Long": {
          "brand": "Edelkrone",
          "model": "SliderPLUS v5 PRO Long",
          "travelCm": [
            43,
            79
          ],
          "payloadHorizontalKg": 9.1,
          "bowlMount": [
            "Flat"
          ],
          "driveType": "manual (telescopic rails), motion-control optional",
          "motorized": false,
          "weightKg": 1.84,
          "material": "aluminum",
          "features": "telescopic design doubles travel on tripod; supports Slide/Vertical modules",
          "notes": "Tripod travel ≈2.6', ground travel ≈1.3' with higher payload."
        },
        "MYT Works Glide Large Camera Slider": {
          "brand": "MYT Works",
          "model": "Glide Large Camera Slider",
          "travelCm": [
            64,
            345
          ],
          "payloadHorizontalKg": 68,
          "bowlMount": [
            75,
            100,
            150,
            "Mitchell",
            "Flat"
          ],
          "driveType": "manual (hybrid rolling/sliding bearings)",
          "motorized": false,
          "weightKg": [
            7.7,
            24.5
          ],
          "material": "aluminum/brass/stainless",
          "features": "modular rail lengths; carriage uses hybrid bearings; wide footprint",
          "notes": "Travel 25–136″ (64–345 cm), payload 150 lb / 68 kg."
        },
        "Dana Dolly Universal Track Ends": {
          "brand": "Dana Dolly",
          "model": "Universal Track Ends",
          "bowlMount": [
            75,
            100,
            "Mitchell",
            "Flat"
          ],
          "driveType": "manual (skate wheels on speed rail)",
          "motorized": false,
          "material": "aluminum",
          "features": "uses standard 1¼\" pipe/speed rail; portable kit; 16-wheel trucks",
          "notes": "Payload varies by rail/support."
        },
        "Rhino Slider Carbon 42\"": {
          "brand": "Rhino",
          "model": "Slider Carbon 42\"",
          "travelCm": 90,
          "payloadHorizontalKg": 4.54,
          "bowlMount": [
            "Flat"
          ],
          "driveType": "belt",
          "motorized": false,
          "weightKg": 2.15,
          "material": "carbon/stainless steel",
          "features": "interchangeable rails; all-terrain legs; optional motor modules",
          "dimensionsCm": "114 × 18 × 9",
          "notes": "Load 10 lb / 4.54 kg, travel 90 cm."
        },
        "Rhino Slider Carbon 24\"": {
          "brand": "Rhino",
          "model": "Slider Carbon 24\"",
          "travelCm": 45,
          "payloadHorizontalKg": 1.81,
          "bowlMount": [
            "Flat"
          ],
          "driveType": "belt",
          "motorized": false,
          "weightKg": 0.54,
          "material": "carbon/stainless steel",
          "features": "lightweight rail; interchangeable system",
          "dimensionsCm": "68 × 18 × 9",
          "notes": "Load 4 lb / 1.81 kg, travel 45 cm."
        },
        "Rhino RŌV PRO Traveler 16\" Motorized": {
          "brand": "Rhino",
          "model": "RŌV PRO Traveler 16\"",
          "travelCm": 40.6,
          "bowlMount": [
            "Flat"
          ],
          "driveType": "motorized",
          "motorized": true,
          "features": "motorized travel slider"
        },
        "iFootage Shark Slider Nano II": {
          "brand": "iFootage",
          "model": "Shark Slider Nano II",
          "travelCm": [
            23.3,
            43.3
          ],
          "payloadHorizontalKg": 7,
          "payloadVerticalKg": 3.5,
          "bowlMount": [
            "Flat"
          ],
          "driveType": "motorized (brushless servo)",
          "motorized": true,
          "weightKg": [
            2.8,
            3.1
          ],
          "material": "aluminum + carbon fiber",
          "features": "dual-axis (pan + slide), app control",
          "dimensionsCm": [
            "463 × 133 × 99",
            "663 × 133 × 99"
          ],
          "notes": "Payload 7 kg horizontal, 3.5 kg vertical."
        },
        "iFootage Shark Slider Mini": {
          "brand": "iFootage",
          "model": "Shark Slider Mini",
          "travelCm": 60,
          "payloadHorizontalKg": 2.5,
          "bowlMount": [
            "Flat"
          ],
          "driveType": "manual",
          "motorized": false,
          "weightKg": 1.9,
          "material": "aluminum + alloy",
          "features": "modular track extension, compact",
          "dimensionsCm": "840 × 45 × 25",
          "notes": "Effective travel 600 mm."
        },
        "GFM GF-Slider System": {
          "brand": "GFM (Grip Factory Munich)",
          "model": "GF-Slider System",
          "bowlMount": [
            75,
            100,
            150,
            "Mitchell",
            "Flat"
          ],
          "driveType": "manual (modular rails/carriage)",
          "motorized": false,
          "material": "aluminum/steel",
          "features": "tracking carriage supports Mitchell/bowl/Euro adapters",
          "notes": "Available in multiple lengths."
        },
        "Proaim Flyking Precision 4 ft": {
          "brand": "Proaim",
          "model": "Flyking Precision (4 ft)",
          "travelCm": 99,
          "payloadHorizontalKg": 70,
          "bowlMount": [
            "Mitchell",
            "Flat"
          ],
          "driveType": "manual (roller bearings)",
          "motorized": false,
          "weightKg": 12,
          "material": "aluminum",
          "features": "Mitchell base; travel scale",
          "dimensionsCm": "122 × — × —"
        },
        "Proaim Flyking Precision 6 ft": {
          "brand": "Proaim",
          "model": "Flyking Precision (6 ft)",
          "travelCm": 160,
          "payloadHorizontalKg": 70,
          "bowlMount": [
            "Mitchell",
            "Flat"
          ],
          "driveType": "manual (roller bearings)",
          "motorized": false,
          "weightKg": 13.4,
          "material": "aluminum",
          "features": "Mitchell base; adjustable height",
          "dimensionsCm": "183 × — × —"
        },
        "That Cat Silent Cat 4000 (4')": {
          "brand": "That Cat",
          "model": "Silent Cat 4000 (4')",
          "travelCm": 94,
          "bowlMount": [
            150,
            "Mitchell"
          ],
          "driveType": "manual (roller)",
          "motorized": false,
          "weightKg": 19,
          "material": "aluminum/steel",
          "features": "low-profile build; Mitchell or 150 mm bowl",
          "dimensionsCm": "128 × — × —",
          "notes": "Build height: 13 cm (Mitchell) / 16 cm (150 bowl)."
        },
        "Axler Carbon 30\" Slider": {
          "brand": "Axler",
          "model": "Carbon 30\" Slider",
          "travelCm": 76,
          "payloadHorizontalKg": 22.7,
          "bowlMount": [
            "Flat"
          ],
          "driveType": "roller bearings",
          "motorized": false,
          "material": "carbon fiber",
          "features": "lightweight rails, 1/4 and 3/8 threads"
        },
        "Glide Gear DEV-1000": {
          "brand": "Glide Gear",
          "model": "DEV-1000",
          "travelCm": 61,
          "payloadHorizontalKg": 9.1,
          "bowlMount": [
            "Flat"
          ],
          "driveType": "belt / manual",
          "motorized": false,
          "material": "aluminum",
          "features": "compact 24\" slider, 20 lb spec"
        },
        "Hague EDGE Slider": {
          "brand": "Hague",
          "model": "EDGE Slider",
          "driveType": "manual",
          "motorized": false,
          "features": "studio/classic slider"
        },
        "Manfrotto 60 cm Slider": {
          "brand": "Manfrotto",
          "model": "60 cm Slider",
          "travelCm": 60,
          "bowlMount": [
            "Flat"
          ],
          "driveType": "manual",
          "motorized": false,
          "weightKg": 1.5,
          "material": "aluminum",
          "features": "flat 3/8\" mounting thread; compact travel size",
          "dimensionsCm": "60 × 12 × 6"
        },
        "GVM GT-J80D Motorized Slider": {
          "brand": "GVM",
          "model": "GT-J80D Motorized Slider",
          "travelCm": 80,
          "bowlMount": [
            "Flat"
          ],
          "driveType": "motorized",
          "motorized": true,
          "material": "aluminum",
          "features": "app control, motor torque adjustment"
        },
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
        "Inovativ Voyager 30 EVO X": { "brand": "Inovativ" },
        "Inovativ Voyager 36 EVO X": { "brand": "Inovativ" },
        "Inovativ Voyager 42 EVO X": { "brand": "Inovativ" },
        "Inovativ Apollo 40 EVO": { "brand": "Inovativ" },
        "Inovativ Apollo 52 EVO": { "brand": "Inovativ" },
        "Inovativ Echo 36 Workstation Cart": { "brand": "Inovativ" },
        "Inovativ Echo 48 Workstation Cart": { "brand": "Inovativ" },
        "Adicam MINI Camera Cart": { "brand": "Adicam" },
        "Adicam STANDARD Camera Cart": { "brand": "Adicam" },
        "Adicam STANDARD+ Camera Cart": { "brand": "Adicam" },
        "Adicam MAX Camera Cart": { "brand": "Adicam" },
        "SmallRig MD4573 36\" Lightweight Video Production Camera Cart": { "brand": "SmallRig" },
        "Tilta Boulder 36\" Camera Cart": { "brand": "Tilta" },
        "Backstage Magliner Junior 24\" Film Cart (8\" Conversion Kit)": { "brand": "Backstage" },
        "Backstage Magliner Senior 24\" Film Cart (8\" Conversion Kit)": { "brand": "Backstage" }
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
    ],
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
        "imageCircleMm": 31.14,
        "mount": "PL",
        "lengthMm": 95,
        "minFocusMeters": 0.28,
        "weight_g": 1200,
        "notes": "Front Ø80 mm; S35; T1.3-T16",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ZEISS High Speed MK III 20mm T2.1": {
        "brand": "ZEISS",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.1,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "mountOptions": []
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
        "imageCircleMm": 31.14,
        "mount": "PL",
        "lengthMm": 75,
        "minFocusMeters": 0.25,
        "weight_g": 1100,
        "notes": "Front Ø80 mm; S35",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "imageCircleMm": 31.14,
        "mount": "PL",
        "lengthMm": 64,
        "minFocusMeters": 0.3,
        "weight_g": 800,
        "notes": "Front Ø80 mm; S35",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "imageCircleMm": 31.14,
        "mount": "PL",
        "lengthMm": 62,
        "minFocusMeters": 0.6,
        "weight_g": 700,
        "notes": "Front Ø80 mm; S35",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "imageCircleMm": 31.14,
        "mount": "PL",
        "lengthMm": 75,
        "minFocusMeters": 0.7,
        "weight_g": 1250,
        "notes": "Front Ø80 mm; S35",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "imageCircleMm": 31.14,
        "mount": "PL",
        "lengthMm": 85,
        "minFocusMeters": 0.91,
        "weight_g": 1400,
        "notes": "Front Ø80 mm; S35",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ZEISS High Speed MK III 135mm T1.3": {
        "brand": "ZEISS",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 1.3,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "mountOptions": []
      },
      "Tokina Vista One 18mm T1.5": {
        "brand": "Tokina",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 46.7,
        "minFocusMeters": 0.28,
        "weight_g": 2300,
        "notes": "Single-coated Vista One edition; 300° focus rotation and large-format coverage",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Tokina Vista One 25mm T1.5": {
        "brand": "Tokina",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 46.7,
        "minFocusMeters": 0.35,
        "weight_g": 2200,
        "notes": "Large-format Vista One prime with character single coating and matching 114 mm fronts",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Tokina Vista One 35mm T1.5": {
        "brand": "Tokina",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 46.7,
        "minFocusMeters": 0.38,
        "weight_g": 2100,
        "notes": "Covers VistaVision sensors; single-coated for flare control and gentle halation",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Tokina Vista One 50mm T1.5": {
        "brand": "Tokina",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 46.7,
        "minFocusMeters": 0.45,
        "weight_g": 2100,
        "notes": "Vista One 50 mm maintains T1.5 speed with unified gear positions",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "IB/E Raptor Macro 60mm T2.9": {
        "brand": "IB/E Optics",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.9,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 50,
        "minFocusMeters": 0.24,
        "weight_g": 1600,
        "notes": "Full-frame 1:1 macro prime; includes LDS metadata contacts",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "IB/E Raptor Macro 100mm T2.9": {
        "brand": "IB/E Optics",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.9,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 50,
        "minFocusMeters": 0.31,
        "weight_g": 1750,
        "notes": "Full-frame macro with user-swappable mount options and 300° focus rotation",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "IB/E Raptor Macro 150mm T3.5": {
        "brand": "IB/E Optics",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 3.5,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 50,
        "minFocusMeters": 0.41,
        "weight_g": 1900,
        "notes": "Long macro prime covering full frame with extended close focus",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Angénieux Optimo 15-40mm T2.6": {
        "brand": "Angénieux",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.6,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.61,
        "weight_g": 1920,
        "imageCircleMm": 31.4,
        "lengthMm": 186,
        "notes": "Compact Optimo zoom with S35+ coverage (≈31.4 mm diagonal).",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Angénieux Optimo 45-120mm T2.8": {
        "brand": "Angénieux",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.8,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.94,
        "weight_g": 1950,
        "imageCircleMm": 31.4,
        "lengthMm": 203,
        "notes": "Matches the 15-40mm Optimo compact zoom; S35+ coverage.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "minFocusMeters": 1.2,
        "weight_g": 7300,
        "imageCircleMm": 31.4,
        "lengthMm": 377.4,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "LOMO Anamorphic RF 35mm T2.5": {
        "brand": "LOMO",
        "frontDiameterMm": 141,
        "clampOn": true,
        "tStop": 2.5,
        "rodStandard": "19mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "weight_g": 3200,
        "mountOptions": []
      },
      "LOMO Anamorphic RF 50mm T2.4": {
        "brand": "LOMO",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.4,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "weight_g": 2725,
        "mountOptions": []
      },
      "LOMO Anamorphic RF 75mm T2.4": {
        "brand": "LOMO",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.4,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "weight_g": 2050,
        "mountOptions": []
      },
      "LOMO Anamorphic RF 100mm T3.2": {
        "brand": "LOMO",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 3.2,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "weight_g": 2500,
        "mountOptions": []
      },
      "Canon CN7x17 17-120mm T2.95-3.9": {
        "brand": "Canon",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.95,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 31.4,
        "minFocusMeters": 0.85,
        "weight_g": 2900,
        "lengthMm": 254.9,
        "notes": "T2.95 from 17–91 mm, ramping to T3.9 by 120 mm; 11-blade iris and servo unit included. Canon lists FOV for a 26.2 × 13.8 mm S35 sensor area (≈31.4 mm image circle).",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "imageCircleMm": 31.4,
        "minFocusMeters": 0.6,
        "weight_g": 3500,
        "lengthMm": 233.3,
        "notes": "Constant T1.7 Flex Zoom for Super 35 coverage; Canon lists EF version at 241.3 mm / 3.4 kg.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "imageCircleMm": 31.4,
        "minFocusMeters": 1,
        "weight_g": 3500,
        "lengthMm": 238.4,
        "notes": "Constant T1.7 Flex Zoom for Super 35 coverage; Canon lists EF version at 246.4 mm / 3.5 kg.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Canon Sumire Prime 14mm T3.1": {
        "brand": "Canon",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 3.1,
        "mount": "PL / EF (convertible)",
        "rodStandard": "15mm",
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.203,
        "weight_g": 1200,
        "imageCircleMm": 43.3,
        "notes": "Sumire 14mm T3.1 FP X. Series constant Ø114 mm, 300° focus rotation. 14 mm has no 105 mm front thread.",
        "mountOptions": [
          {
            "type": "PL / EF (convertible)",
            "mount": "native"
          }
        ]
      },
      "Canon Sumire Prime 20mm T1.5": {
        "brand": "Canon",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 10,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.3,
        "weight_g": 1200,
        "imageCircleMm": 43.3,
        "lengthMm": 102,
        "notes": "Sumire Prime 20mm T1.5 FP X. Series uses Ø114 mm fronts; per Canon spec weight ≈1.2 kg.",
        "mountOptions": [
          {
            "type": "PL / EF (convertible)",
            "mount": "native"
          }
        ]
      },
      "Canon Sumire Prime 24mm T1.5": {
        "brand": "Canon",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 10,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.3,
        "weight_g": 1200,
        "imageCircleMm": 43.3,
        "lengthMm": 102,
        "notes": "Sumire Prime 24mm T1.5 FP X. Canon table lists 1.2 kg weight and 1' close focus.",
        "mountOptions": [
          {
            "type": "PL / EF (convertible)",
            "mount": "native"
          }
        ]
      },
      "Canon Sumire Prime 35mm T1.5": {
        "brand": "Canon",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 10,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.46,
        "weight_g": 1100,
        "imageCircleMm": 43.3,
        "lengthMm": 115,
        "notes": "Sumire Prime 35mm T1.5 FP X. Canon table: 1.1 kg; CF 1'6\".",
        "mountOptions": [
          {
            "type": "PL / EF (convertible)",
            "mount": "native"
          }
        ]
      },
      "Canon Sumire Prime 50mm T1.3": {
        "brand": "Canon",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.3,
        "mount": "PL / EF (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 10,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.46,
        "weight_g": 1100,
        "imageCircleMm": 43.3,
        "lengthMm": 115,
        "notes": "Sumire Prime 50mm T1.3 FP X. Canon table: 1.1 kg; CF 1'6\".",
        "mountOptions": [
          {
            "type": "PL / EF (convertible)",
            "mount": "native"
          }
        ]
      },
      "Canon Sumire Prime 85mm T1.3": {
        "brand": "Canon",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.3,
        "mount": "PL / EF (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 10,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.95,
        "weight_g": 1300,
        "imageCircleMm": 43.3,
        "lengthMm": 118,
        "notes": "Sumire Prime 85mm T1.3 FP X. Canon table: 1.3 kg; CF 3'2\".",
        "mountOptions": [
          {
            "type": "PL / EF (convertible)",
            "mount": "native"
          }
        ]
      },
      "Canon Sumire Prime 135mm T2.2": {
        "brand": "Canon",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.2,
        "mount": "PL / EF (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 10,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 1,
        "weight_g": 1400,
        "imageCircleMm": 43.3,
        "lengthMm": 118,
        "notes": "Sumire Prime 135mm T2.2 FP X. Canon table: 1.4 kg; CF 3'3\".",
        "mountOptions": [
          {
            "type": "PL / EF (convertible)",
            "mount": "native"
          }
        ]
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
        "notes": "Full-frame/VV coverage with Cooke /i metadata; 114 mm front.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 46.3,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "notes": "Front Ø162 mm; weight and length are the full-frame specification. Data from Angénieux Optimo Ultra 12x technical literature.",
        "mountOptions": [
          {
            "type": "PL / LPL",
            "mount": "native"
          }
        ]
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
        "notes": "Super 35 mode for the Optimo Ultra 12x system. Data from Angénieux Optimo Ultra 12x technical literature.",
        "mountOptions": [
          {
            "type": "PL / LPL",
            "mount": "native"
          }
        ]
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
        "notes": "Ultra 35 mode for the Optimo Ultra 12x system. Data from Angénieux Optimo Ultra 12x technical literature.",
        "mountOptions": [
          {
            "type": "PL / LPL",
            "mount": "native"
          }
        ]
      },
      "Angénieux Type EZ-1 30-90mm T2.0 (S35)": {
        "brand": "Angénieux",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.6,
        "weight_g": 2150,
        "imageCircleMm": 30,
        "lengthMm": 226,
        "notes": "Optimo Type EZ-1 in Super 35 configuration. Ships in PL with Angénieux IRO support for EF/E/RF mounts and converts to the FF/VV 45-135mm block without tools.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Angénieux Type EZ-1 45-135mm T3.0 (FF)": {
        "brand": "Angénieux",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 3,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.6,
        "weight_g": 2200,
        "imageCircleMm": 46.3,
        "lengthMm": 231,
        "notes": "Full-frame/VV IRO block for the Optimo Type EZ-1. Maintains the same Ø114 mm front and close focus while stretching coverage to 46.3 mm.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Angénieux Type EZ-2 15-40mm T2.0 (S35)": {
        "brand": "Angénieux",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.6,
        "weight_g": 2100,
        "imageCircleMm": 30,
        "lengthMm": 226,
        "notes": "Optimo Type EZ-2 wide zoom covering Super 35. Shares the Angénieux IRO quick-swap system for EF/E/RF mounts and drop-in rear filters.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Angénieux Type EZ-2 22-60mm T3.0 (FF)": {
        "brand": "Angénieux",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 3,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.6,
        "weight_g": 2150,
        "imageCircleMm": 46.3,
        "lengthMm": 231,
        "notes": "Full-frame/VV configuration for the Optimo Type EZ-2. Retains Ø114 mm fronts and the same close-focus distance when converted with the IRO kit.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "notes": "Convertible Type EZ-3 using Angénieux IRO: S35 block covers 30.4 mm image circle. Ships in PL with swaps to EF/E/RF.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "notes": "Convertible Type EZ-3 using Angénieux IRO: FF/VV block covers 46.3 mm image circle. Ships in PL with swaps to EF/E/RF.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Prime 12mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 134,
        "clampOn": true,
        "tStop": 1.8,
        "tStopRange": "T1.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 25,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 2800,
        "imageCircleMm": 44.7,
        "lengthMm": 239,
        "notes": "From ARRI Signature Prime technical data: MOD 0.35 m, length 239 mm, front Ø 134 mm.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Prime 15mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 156,
        "clampOn": true,
        "tStop": 1.8,
        "tStopRange": "T1.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 2800,
        "imageCircleMm": 44.7,
        "lengthMm": 197,
        "notes": "From ARRI data: length 197 mm, front Ø 156 mm.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Prime 18mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "tStopRange": "T1.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 2000,
        "imageCircleMm": 44.7,
        "lengthMm": 178,
        "notes": "ARRI specs: length 178 mm, front Ø 114 mm.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Prime 21mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "tStopRange": "T1.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 1900,
        "imageCircleMm": 44.7,
        "lengthMm": 178,
        "notes": "From ARRI table: same length as 18mm, front Ø same.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Prime 25mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "tStopRange": "T1.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 1900,
        "imageCircleMm": 44.7,
        "lengthMm": 178,
        "notes": "From ARRI spec: 25 mm same length as 18/21 mm.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Prime 29mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "tStopRange": "T1.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 1800,
        "imageCircleMm": 44.7,
        "lengthMm": 178,
        "notes": "From ARRI spec.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Prime 35mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "tStopRange": "T1.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 1700,
        "imageCircleMm": 44.7,
        "lengthMm": 178,
        "notes": "ARRI spec: same as others, length 178 mm.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Prime 40mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "tStopRange": "T1.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 1800,
        "imageCircleMm": 44.7,
        "lengthMm": 178,
        "notes": "From ARRI spec.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Prime 47mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "tStopRange": "T1.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.45,
        "weight_g": 1814,
        "imageCircleMm": 44.7,
        "lengthMm": 178,
        "notes": "B&H listing: front 114 mm, weight 4 lb (~1814 g), close focus 9\" (~0.23 m) from lens front.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Prime 58mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "tStopRange": "T1.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.45,
        "weight_g": 2000,
        "imageCircleMm": 44.7,
        "lengthMm": 178,
        "notes": "From ARRI spec table.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Prime 75mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "tStopRange": "T1.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.65,
        "weight_g": 1900,
        "imageCircleMm": 44.7,
        "lengthMm": 178,
        "notes": "ARRI spec table lists weight 1.9 kg.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Prime 95mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "tStopRange": "T1.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.85,
        "weight_g": 1900,
        "imageCircleMm": 44.7,
        "lengthMm": 178,
        "notes": "ARRI spec table gives MOD 0.85 m.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Prime 125mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "tStopRange": "T1.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 1,
        "weight_g": 2300,
        "imageCircleMm": 44.7,
        "lengthMm": 178,
        "notes": "From ARRI spec.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Prime 150mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "tStopRange": "T1.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 1.5,
        "weight_g": 3250,
        "imageCircleMm": 44.7,
        "lengthMm": 208,
        "notes": "ARRI spec: length 208 mm, weight 3.25 kg.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Prime 200mm T2.5": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.5,
        "tStopRange": "T2.5–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 1.8,
        "weight_g": 3100,
        "imageCircleMm": 44.7,
        "lengthMm": 218,
        "notes": "From ARRI spec: length 218 mm for 200 mm T2.5.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Prime 280mm T2.8": {
        "brand": "ARRI",
        "frontDiameterMm": 134,
        "clampOn": true,
        "tStop": 2.8,
        "tStopRange": "T2.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 25,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 2.5,
        "weight_g": 4300,
        "imageCircleMm": 44.7,
        "lengthMm": 278,
        "notes": "ARRI spec: length 278 mm, front Ø 134 mm.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Zoom 16-32mm T2.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.8,
        "tStopRange": "T2.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.45,
        "weight_g": 3200,
        "imageCircleMm": 46,
        "lengthMm": 195,
        "notes": "From ARRI technical data: 16-32 mm, MOD = 0.45 m.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Zoom 24-75mm T2.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.8,
        "tStopRange": "T2.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.7,
        "weight_g": 3700,
        "imageCircleMm": 46,
        "lengthMm": 244,
        "notes": "ARRI technical data for length, weight, and MOD; LDS-2/Cooke /i metadata compatible.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Zoom 45-135mm T2.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.8,
        "tStopRange": "T2.8–T22",
        "mount": "LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1,
        "weight_g": 3600,
        "imageCircleMm": 46,
        "lengthMm": 300,
        "notes": "ARRI technical data for 1 m MOD, 300 mm length, and 3.6 kg weight; LDS-2/Cooke /i metadata compatible.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI Signature Zoom 65-300mm T2.8": {
        "brand": "ARRI",
        "frontDiameterMm": 156,
        "clampOn": true,
        "tStop": 2.8,
        "tStopRange": "T2.8–T22",
        "mount": "LPL",
        "rodStandard": "19mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1.8,
        "weight_g": 8100,
        "imageCircleMm": 46,
        "lengthMm": 420,
        "notes": "ARRI lists 1.8 m MOD from sensor plane (1.337 m from lens front) with LDS-2/Cooke /i metadata.",
        "mountOptions": [
          {
            "type": "LPL",
            "mount": "native"
          }
        ]
      },
      "ARRI/FUJINON Alura 15.5-45mm T2.8": {
        "brand": "ARRI/FUJINON",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.8,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 31.5,
        "minFocusMeters": 0.6,
        "lengthMm": 228,
        "notes": "Lightweight zoom covering Super 35; constant T2.8 with LDS metadata support.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/FUJINON Alura 30-80mm T2.8": {
        "brand": "ARRI/FUJINON",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.8,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 31.5,
        "minFocusMeters": 0.6,
        "lengthMm": 228,
        "notes": "Matches the 15.5-45mm Alura in size and balance; Super 35 coverage with constant T2.8.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/ZEISS Ultra Prime 8mm T2.8": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 134,
        "clampOn": true,
        "tStop": 2.8,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "minFocusMeters": 0.35,
        "weight_g": 2000,
        "lengthMm": 130,
        "notes": "Manufacturer lists ≥31.14 mm image circle coverage for Super 35 sensors.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/ZEISS Ultra Prime 10mm T2.1": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 156,
        "clampOn": true,
        "tStop": 2.1,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "minFocusMeters": 0.35,
        "weight_g": 2900,
        "lengthMm": 172,
        "notes": "Manufacturer lists ≥31.14 mm image circle coverage for Super 35 sensors.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/ZEISS Ultra Prime 12mm T2.0": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 156,
        "clampOn": true,
        "tStop": 2,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "minFocusMeters": 0.3,
        "weight_g": 2000,
        "lengthMm": 140,
        "notes": "Manufacturer lists ≥31.14 mm image circle coverage for Super 35 sensors.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/ZEISS Ultra Prime 14mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.9,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "minFocusMeters": 0.22,
        "weight_g": 1800,
        "lengthMm": 112,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/ZEISS Ultra Prime 16mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.25,
        "weight_g": 1200,
        "lengthMm": 94,
        "imageCircleMm": 31.1,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/ZEISS Ultra Prime 20mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.28,
        "weight_g": 1200,
        "lengthMm": 91,
        "imageCircleMm": 31.1,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/ZEISS Ultra Prime 24mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.3,
        "weight_g": 1000,
        "lengthMm": 91,
        "imageCircleMm": 31.1,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/ZEISS Ultra Prime 28mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.28,
        "weight_g": 1000,
        "lengthMm": 91,
        "imageCircleMm": 31.1,
        "notes": "ZEISS technical table lists 0.28 m MOD, 91 mm length, 1.0 kg weight, and PL reference for Ultra Prime 28 mm.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/ZEISS Ultra Prime 32mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 1100,
        "lengthMm": 91,
        "imageCircleMm": 31.1,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/ZEISS Ultra Prime 40mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.38,
        "weight_g": 1000,
        "lengthMm": 91,
        "imageCircleMm": 31.1,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/ZEISS Ultra Prime 50mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.6,
        "weight_g": 1000,
        "lengthMm": 91,
        "imageCircleMm": 31.1,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/ZEISS Ultra Prime 65mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.65,
        "weight_g": 1200,
        "lengthMm": 91,
        "imageCircleMm": 31.1,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/ZEISS Ultra Prime 85mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.9,
        "weight_g": 1200,
        "lengthMm": 91,
        "imageCircleMm": 31.1,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/ZEISS Ultra Prime 100mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 1,
        "weight_g": 1200,
        "lengthMm": 91,
        "imageCircleMm": 31.1,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/ZEISS Ultra Prime 135mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "minFocusMeters": 1.5,
        "weight_g": 1600,
        "lengthMm": 119,
        "notes": "Manufacturer lists ≥31.14 mm image circle coverage for Super 35 sensors.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ARRI/ZEISS Ultra Prime 180mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.9,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "minFocusMeters": 2.6,
        "weight_g": 2600,
        "lengthMm": 166,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "notes": "Front Ø156 mm; close focus measured from image plane. Data from ZEISS Master Prime technical specifications.",
        "mountOptions": [
          {
            "type": "PL / LDS",
            "mount": "native"
          }
        ]
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
        "notes": "Front Ø114 mm. Data from ZEISS Master Prime technical specifications.",
        "mountOptions": [
          {
            "type": "PL / LDS",
            "mount": "native"
          }
        ]
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
        "notes": "Front Ø114 mm. Data from ZEISS Master Prime technical specifications.",
        "mountOptions": [
          {
            "type": "PL / LDS",
            "mount": "native"
          }
        ]
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
        "notes": "Front Ø114 mm. Data from ZEISS Master Prime technical specifications.",
        "mountOptions": [
          {
            "type": "PL / LDS",
            "mount": "native"
          }
        ]
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
        "notes": "Front Ø114 mm. Data from ZEISS Master Prime technical specifications.",
        "mountOptions": [
          {
            "type": "PL / LDS",
            "mount": "native"
          }
        ]
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
        "notes": "Front Ø114 mm. Data from ZEISS Master Prime technical specifications.",
        "mountOptions": [
          {
            "type": "PL / LDS",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "notes": "Front Ø114 mm. Data from ZEISS Master Prime technical specifications.",
        "mountOptions": [
          {
            "type": "PL / LDS",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "ZEISS Master Prime 75mm T1.3": {
        "brand": "ZEISS/ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.3,
        "mount": "PL / LDS",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.8,
        "weight_g": 2800,
        "imageCircleMm": 46.3,
        "lengthMm": 153,
        "notes": "Front Ø114 mm. Data from ZEISS Master Prime technical specifications.",
        "mountOptions": [
          {
            "type": "PL / LDS",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "minFocusMeters": 1,
        "weight_g": 2900,
        "imageCircleMm": 31.14,
        "lengthMm": 205,
        "notes": "ZEISS lists ≥31.14 mm image circle; optimized for Super 35 coverage.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "notes": "Full-frame coverage; T2.9–22. Source: ZEISS Cinema Zoom brochure (accessed 2025-09-14). Interchangeable Mount System supports PL/EF/F/E/MFT.",
        "mountOptions": []
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
        "notes": "Full-frame coverage; T2.9–22. Appears in your PDF gear list. Sources: ZEISS brochure (accessed 2025-09-14); internal list. Interchangeable Mount System supports PL/EF/F/E/MFT.",
        "mountOptions": []
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
        "notes": "Full-frame coverage; T2.9–22. Appears in your PDF gear list. Source: ZEISS brochure (accessed 2025-09-14). Interchangeable Mount System supports PL/EF/F/E/MFT.",
        "mountOptions": []
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
        "notes": "ANSI Super 35 coverage; 11 iris blades; T2.9–22; front Ø 114 mm. Source: ZEISS technical data (accessed 2025-09-14). Interchangeable Mount System supports PL/EF/F/E/MFT.",
        "mountOptions": []
      },
      "ZEISS Nano Prime 18mm T1.5": {
        "brand": "ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.3,
        "mountOptions": []
      },
      "ZEISS Nano Prime 24mm T1.5": {
        "brand": "ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.3,
        "mountOptions": []
      },
      "ZEISS Nano Prime 35mm T1.5": {
        "brand": "ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.3,
        "mountOptions": []
      },
      "ZEISS Nano Prime 50mm T1.5": {
        "brand": "ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.3,
        "mountOptions": []
      },
      "ZEISS Nano Prime 75mm T1.5": {
        "brand": "ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.3,
        "mountOptions": []
      },
      "ZEISS Nano Prime 100mm T1.5": {
        "brand": "ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.3,
        "mountOptions": []
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
        "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14).",
        "mountOptions": []
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
        "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14).",
        "mountOptions": []
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
        "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14).",
        "mountOptions": []
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
        "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14).",
        "mountOptions": []
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
        "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14).",
        "mountOptions": []
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
        "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14).",
        "mountOptions": []
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
        "minFocusMeters": 0.457,
        "weight_g": 1220,
        "imageCircleMm": 46.3,
        "lengthMm": 119,
        "notes": "Appears in your PDF list. Source: ZEISS Radiance technical data (accessed 2025-09-14).",
        "mountOptions": []
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
        "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14).",
        "mountOptions": []
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
        "notes": "Appears in your PDF list. Source: ZEISS Radiance technical data (accessed 2025-09-14).",
        "mountOptions": []
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
        "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14).",
        "mountOptions": []
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
        "notes": "T1.5–22; FF coverage. Source: ZEISS Radiance technical data (accessed 2025-09-14).",
        "mountOptions": []
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
        "notes": "Front Ø95 mm",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "notes": "Front Ø95 mm",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "notes": "Front Ø95 mm",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "notes": "Front Ø95 mm",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Leitz Summicron-C 29mm T2.0": {
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
        "notes": "Leitz technical table lists 0.3 m MOD, 101 mm length, and 1.3 kg weight for the 29 mm Summicron-C.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 36,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Leitz Summicron-C 40mm T2.0": {
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
        "minFocusMeters": 0.45,
        "weight_g": 1300,
        "notes": "Leitz technical table lists 0.45 m MOD, 101 mm length, and 1.3 kg weight for the 40 mm Summicron-C.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "minFocusMeters": 0.6,
        "weight_g": 1500,
        "lengthMm": 101,
        "imageCircleMm": 36,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "minFocusMeters": 0.8,
        "weight_g": 1200,
        "lengthMm": 101,
        "imageCircleMm": 36,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 36,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Leitz Summicron-C 135mm T2.0": {
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
        "minFocusMeters": 1.35,
        "weight_g": 1800,
        "notes": "Leitz technical table lists 1.35 m MOD, 118 mm length, and 1.8 kg weight for the 135 mm Summicron-C.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Leitz Elsie 15mm T2.1": {
        "brand": "Leitz",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.1,
        "mount": "LPL (Cooke /i, LDS-2)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 2400,
        "imageCircleMm": 46.5,
        "lengthMm": 160,
        "notes": "ELSIE 15mm T2.1. No front thread on 15–25 mm; 160 mm length per Leitz technical table.",
        "mountOptions": [
          {
            "type": "LPL (Cooke /i, LDS-2)",
            "mount": "native"
          }
        ]
      },
      "Leitz Elsie 18mm T2.1": {
        "brand": "Leitz",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.1,
        "mount": "LPL (Cooke /i, LDS-2)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 2400,
        "imageCircleMm": 46.5,
        "lengthMm": 160,
        "notes": "ELSIE 18mm T2.1. No front thread on 15–25 mm.",
        "mountOptions": [
          {
            "type": "LPL (Cooke /i, LDS-2)",
            "mount": "native"
          }
        ]
      },
      "Leitz Elsie 21mm T2.1": {
        "brand": "Leitz",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.1,
        "mount": "LPL (Cooke /i, LDS-2)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 2400,
        "imageCircleMm": 46.5,
        "lengthMm": 160,
        "notes": "ELSIE 21mm T2.1. No front thread on 15–25 mm.",
        "mountOptions": [
          {
            "type": "LPL (Cooke /i, LDS-2)",
            "mount": "native"
          }
        ]
      },
      "Leitz Elsie 25mm T2.1": {
        "brand": "Leitz",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.1,
        "mount": "LPL (Cooke /i, LDS-2)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 2400,
        "imageCircleMm": 46.5,
        "lengthMm": 160,
        "notes": "ELSIE 25mm T2.1. No front thread on 15–25 mm; 160 mm length per Leitz technical table.",
        "mountOptions": [
          {
            "type": "LPL (Cooke /i, LDS-2)",
            "mount": "native"
          }
        ]
      },
      "Leitz Elsie 29mm T2.1": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.1,
        "mount": "LPL (Cooke /i, LDS-2)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 2100,
        "imageCircleMm": 46.5,
        "lengthMm": 160,
        "notes": "ELSIE 29mm T2.1. Front filter M92×1 on 29–100 mm.",
        "mountOptions": [
          {
            "type": "LPL (Cooke /i, LDS-2)",
            "mount": "native"
          }
        ]
      },
      "Leitz Elsie 35mm T2.1": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.1,
        "mount": "LPL (Cooke /i, LDS-2)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 2100,
        "imageCircleMm": 46.5,
        "lengthMm": 160,
        "notes": "ELSIE 35mm T2.1. Front filter M92×1.",
        "mountOptions": [
          {
            "type": "LPL (Cooke /i, LDS-2)",
            "mount": "native"
          }
        ]
      },
      "Leitz Elsie 40mm T2.1": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.1,
        "mount": "LPL (Cooke /i, LDS-2)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 2100,
        "imageCircleMm": 46.5,
        "lengthMm": 160,
        "notes": "ELSIE 40mm T2.1. Front filter M92×1.",
        "mountOptions": [
          {
            "type": "LPL (Cooke /i, LDS-2)",
            "mount": "native"
          }
        ]
      },
      "Leitz Elsie 50mm T2.1": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.1,
        "mount": "LPL (Cooke /i, LDS-2)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.508,
        "weight_g": 1996,
        "imageCircleMm": 46.5,
        "lengthMm": 160,
        "notes": "ELSIE 50mm T2.1. BandPro listing notes 20\" (0.508 m) MOD, 160 mm length, and ~4.4 lb (1996 g).",
        "mountOptions": [
          {
            "type": "LPL (Cooke /i, LDS-2)",
            "mount": "native"
          }
        ]
      },
      "Leitz Elsie 65mm T2.1": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.1,
        "mount": "LPL (Cooke /i, LDS-2)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.65,
        "weight_g": 2100,
        "imageCircleMm": 46.5,
        "lengthMm": 160,
        "notes": "ELSIE 65mm T2.1. Front filter M92×1.",
        "mountOptions": [
          {
            "type": "LPL (Cooke /i, LDS-2)",
            "mount": "native"
          }
        ]
      },
      "Leitz Elsie 75mm T2.1": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.1,
        "mount": "LPL (Cooke /i, LDS-2)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.75,
        "weight_g": 2100,
        "imageCircleMm": 46.5,
        "lengthMm": 160,
        "notes": "ELSIE 75mm T2.1. Front filter M92×1.",
        "mountOptions": [
          {
            "type": "LPL (Cooke /i, LDS-2)",
            "mount": "native"
          }
        ]
      },
      "Leitz Elsie 100mm T2.1": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.1,
        "mount": "LPL (Cooke /i, LDS-2)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.85,
        "weight_g": 2100,
        "imageCircleMm": 46.5,
        "lengthMm": 160,
        "notes": "ELSIE 100mm T2.1. Front filter M92×1.",
        "mountOptions": [
          {
            "type": "LPL (Cooke /i, LDS-2)",
            "mount": "native"
          }
        ]
      },
      "Leitz Elsie 125mm T2.1": {
        "brand": "Leitz",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.1,
        "mount": "LPL (Cooke /i, LDS-2)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 1.27,
        "weight_g": 2404,
        "imageCircleMm": 46.5,
        "lengthMm": 160,
        "notes": "ELSIE 125mm T2.1. BandPro listing notes 50\" (1.27 m) MOD, 160 mm length, and ~5.3 lb (2404 g).",
        "mountOptions": [
          {
            "type": "LPL (Cooke /i, LDS-2)",
            "mount": "native"
          }
        ]
      },
      "Leitz Elsie 150mm T2.1": {
        "brand": "Leitz",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.1,
        "mount": "LPL (Cooke /i, LDS-2)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 1.5,
        "weight_g": 2400,
        "imageCircleMm": 46.5,
        "lengthMm": 160,
        "notes": "ELSIE 150mm T2.1. Front filter M112×1.5 on 125–150 mm.",
        "mountOptions": [
          {
            "type": "LPL (Cooke /i, LDS-2)",
            "mount": "native"
          }
        ]
      },
      "Leitz HUGO 18mm T1.5": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "LPL / Leica L / Leica M",
        "rodStandard": "15mm",
        "rodLengthCm": 5,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.22,
        "weight_g": 1040,
        "imageCircleMm": 43.3,
        "lengthMm": 71,
        "notes": "Specs from B&H: 2.8\" / 71 mm length, 95 mm front, 1040 g weight.",
        "mountOptions": [
          {
            "type": "LPL / Leica L / Leica M",
            "mount": "native"
          }
        ]
      },
      "Leitz HUGO 24mm T1.5": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "LPL / Leica L / Leica M",
        "rodStandard": "15mm",
        "rodLengthCm": 5,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.3,
        "weight_g": 860,
        "imageCircleMm": 43.3,
        "lengthMm": 68,
        "notes": "Band Pro listing: 2.7\" / 68 mm length, approximately 860 g weight.",
        "mountOptions": [
          {
            "type": "LPL / Leica L / Leica M",
            "mount": "native"
          }
        ]
      },
      "Leitz HUGO 40mm T1.5": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "LPL / Leica L / Leica M",
        "rodStandard": "15mm",
        "rodLengthCm": 5,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.36,
        "weight_g": 870,
        "imageCircleMm": 43.3,
        "lengthMm": 68,
        "notes": "Announced specifications: 2.7\" / 68 mm length, 0.87 kg weight, close focus 0.36 m.",
        "mountOptions": [
          {
            "type": "LPL / Leica L / Leica M",
            "mount": "native"
          }
        ]
      },
      "Leitz HUGO 135mm T1.9": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9,
        "mount": "LPL / Leica L / Leica M",
        "rodStandard": "15mm",
        "rodLengthCm": 10,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1,
        "weight_g": 1590,
        "imageCircleMm": 43.3,
        "lengthMm": 121,
        "notes": "Manufacturer specs: 4.8\" / 121 mm length, 1.59 kg weight, close focus 1 m.",
        "mountOptions": [
          {
            "type": "LPL / Leica L / Leica M",
            "mount": "native"
          }
        ]
      },
      "Leitz Thalia 24mm T3.6": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 3.6,
        "mount": "PL / LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 60,
        "lengthMm": 124.5,
        "minFocusMeters": 0.2,
        "weight_g": 1420,
        "notes": "Thalia prime set; 92 mm thread except wides; 270° focus rotation. Specs from Leitz THALIA datasheet.",
        "mountOptions": [
          {
            "type": "PL / LPL",
            "mount": "native"
          }
        ]
      },
      "Leitz Thalia 30mm T2.9": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.9,
        "mount": "PL / LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 60,
        "lengthMm": 131.5,
        "minFocusMeters": 0.5,
        "weight_g": 1500,
        "notes": "Thalia 30 mm; datasheet lists close focus 0.5 m.",
        "mountOptions": [
          {
            "type": "PL / LPL",
            "mount": "native"
          }
        ]
      },
      "Leitz Thalia 35mm T2.6": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.6,
        "mount": "PL / LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 60,
        "lengthMm": 131.5,
        "minFocusMeters": 0.55,
        "weight_g": 1400,
        "notes": "Thalia 35 mm; close focus 0.55 m per spec.",
        "mountOptions": [
          {
            "type": "PL / LPL",
            "mount": "native"
          }
        ]
      },
      "Leitz Thalia 45mm T2.9": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.9,
        "mount": "PL / LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 60,
        "lengthMm": 131.5,
        "minFocusMeters": 0.6,
        "weight_g": 1460,
        "notes": "Thalia 45 mm; close focus 0.6 m per spec.",
        "mountOptions": [
          {
            "type": "PL / LPL",
            "mount": "native"
          }
        ]
      },
      "Leitz Thalia 55mm T2.8": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.8,
        "mount": "PL / LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 60,
        "lengthMm": 154.5,
        "minFocusMeters": 0.3,
        "weight_g": 1640,
        "notes": "Thalia 55 mm macro; spec gives close focus 0.3 m.",
        "mountOptions": [
          {
            "type": "PL / LPL",
            "mount": "native"
          }
        ]
      },
      "Leitz Thalia 70mm T2.6": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.6,
        "mount": "PL / LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 60,
        "lengthMm": 124.5,
        "minFocusMeters": 0.5,
        "weight_g": 1060,
        "notes": "Thalia 70 mm; spec gives length 124.5 mm and close focus 0.5 m.",
        "mountOptions": [
          {
            "type": "PL / LPL",
            "mount": "native"
          }
        ]
      },
      "Leitz Thalia 90mm T2.2 (Thalia-T variant)": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.2,
        "mount": "PL / LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 60,
        "lengthMm": 124.5,
        "minFocusMeters": 0.9,
        "weight_g": 1050,
        "notes": "Thalia-T 90 mm variant with dual \"soft/hard\" character. Datasheet lists 0.9 m close focus.",
        "mountOptions": [
          {
            "type": "PL / LPL",
            "mount": "native"
          }
        ]
      },
      "Leitz Thalia 100mm T2.2": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.2,
        "mount": "PL / LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 60,
        "lengthMm": 124.5,
        "minFocusMeters": 0.7,
        "weight_g": 1160,
        "notes": "Thalia 100 mm; spec gives close focus 0.7 m.",
        "mountOptions": [
          {
            "type": "PL / LPL",
            "mount": "native"
          }
        ]
      },
      "Leitz Thalia 120mm T2.6": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.6,
        "mount": "PL / LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 60,
        "lengthMm": 175,
        "minFocusMeters": 0.57,
        "weight_g": 1660,
        "notes": "Thalia 120 mm macro; spec length 175 mm and close focus 0.57 m.",
        "mountOptions": [
          {
            "type": "PL / LPL",
            "mount": "native"
          }
        ]
      },
      "Leitz Thalia 180mm T3.6": {
        "brand": "Leitz",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 3.6,
        "mount": "PL / LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 60,
        "lengthMm": 154.5,
        "minFocusMeters": 1.5,
        "weight_g": 1620,
        "notes": "Thalia 180 mm; spec gives length 154.5 mm and close focus 1.5 m.",
        "mountOptions": [
          {
            "type": "PL / LPL",
            "mount": "native"
          }
        ]
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
        "imageCircleMm": 46.31,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S7/i FF 27mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "mount": "PL or LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 3300,
        "imageCircleMm": 46.3,
        "lengthMm": 182,
        "notes": "Cooke spec lists 0.35 m close focus, 182 mm length, Ø110 mm front, and PL or LPL mount options.",
        "mountOptions": [
          {
            "type": "PL or LPL",
            "mount": "native"
          }
        ]
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
        "imageCircleMm": 46.31,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "lengthMm": 189,
        "minFocusMeters": 0.45,
        "weight_g": 3500,
        "imageCircleMm": 46.31,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 46.31,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "notes": "T2.5-T22",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "minFocusMeters": 0.475,
        "weight_g": 3300,
        "lengthMm": 189,
        "imageCircleMm": 46.31,
        "notes": "T2.0-T22",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 46.31,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S7/i FF 300mm T3.3": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 3.3,
        "mount": "PL or LPL",
        "rodStandard": "19mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 2.1,
        "weight_g": 4400,
        "imageCircleMm": 46.3,
        "lengthMm": 256,
        "notes": "Cooke spec states 2.1 m close focus, 256 mm length, ~4.4 kg weight, Ø110 mm front, and includes a support bracket.",
        "mountOptions": [
          {
            "type": "PL or LPL",
            "mount": "native"
          }
        ]
      },
      "Cooke S8/i FF 18mm T1.4": {
        "brand": "Cooke",
        "frontDiameterMm": 136,
        "clampOn": true,
        "tStop": 1.4,
        "mount": "PL or LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.6,
        "weight_g": 3400,
        "imageCircleMm": 43.3,
        "lengthMm": 200,
        "notes": "Cooke S8/i FF 18mm T1.4 ships with a support bracket; Cooke warns of Ø136 mm clamp-on vignette risk.",
        "mountOptions": [
          {
            "type": "PL or LPL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 46.31,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S8/i FF 27mm T1.4": {
        "brand": "Cooke",
        "frontDiameterMm": 104,
        "clampOn": true,
        "tStop": 1.4,
        "mount": "PL or LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.6,
        "weight_g": 2600,
        "imageCircleMm": 46.3,
        "lengthMm": 162,
        "notes": "Cooke S8/i FF 27mm T1.4 supports PL or LPL mounts with M99×0.75 filter thread and 0.6 m MOD.",
        "mountOptions": [
          {
            "type": "PL or LPL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 46.31,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 46.31,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 46.31,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S8/i FF 65mm T1.4": {
        "brand": "Cooke",
        "frontDiameterMm": 104,
        "clampOn": true,
        "tStop": 1.4,
        "mount": "PL or LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.75,
        "weight_g": 2600,
        "imageCircleMm": 46.3,
        "lengthMm": 157,
        "notes": "Cooke S8/i FF 65mm T1.4 supports PL or LPL mounts with M99×0.75 filter thread and 0.75 m MOD.",
        "mountOptions": [
          {
            "type": "PL or LPL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 46.31,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 46.31,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke Varotal/i FF 19-40mm T2.9": {
        "brand": "Cooke",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.9,
        "mount": "PL or LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.6,
        "weight_g": 3500,
        "imageCircleMm": 46.3,
        "lengthMm": 280,
        "notes": "Cooke Varotal/i FF wide zoom with /i metadata, matched Ø114 mm front and 11-blade iris across the set.",
        "mountOptions": [
          {
            "type": "PL or LPL",
            "mount": "native"
          }
        ]
      },
      "Cooke Varotal/i FF 30-95mm T2.9": {
        "brand": "Cooke",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.9,
        "mount": "PL or LPL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.8,
        "weight_g": 3700,
        "imageCircleMm": 46.3,
        "lengthMm": 290,
        "notes": "Mid-range Varotal/i FF zoom covering full frame/VV with consistent mechanics and Cooke /i data contacts.",
        "mountOptions": [
          {
            "type": "PL or LPL",
            "mount": "native"
          }
        ]
      },
      "Cooke Varotal/i FF 85-215mm T2.9": {
        "brand": "Cooke",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.9,
        "mount": "PL or LPL",
        "rodStandard": "19mm",
        "rodLengthCm": 60,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1.2,
        "weight_g": 4100,
        "imageCircleMm": 46.3,
        "lengthMm": 320,
        "notes": "Tele Varotal/i FF zoom matched to the 19-40 and 30-95mm lenses; supports Cooke /i metadata and full-frame coverage.",
        "mountOptions": [
          {
            "type": "PL or LPL",
            "mount": "native"
          }
        ]
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
        "notes": "Front Ø114 mm; full-frame/VV coverage.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "notes": "Front Ø114 mm; full-frame/VV coverage.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "notes": "Front Ø114 mm; full-frame/VV coverage.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Fujinon MK18-55mm T2.9": {
        "brand": "Fujinon",
        "frontDiameterMm": 85,
        "clampOn": true,
        "tStop": 2.9,
        "mount": "Sony E",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.9,
        "weight_g": 980,
        "imageCircleMm": 28.5,
        "lengthMm": 206,
        "notes": "MK18–55mm T2.9 (S35). Manufacturer states <1 kg; B&H lists 0.98 kg.",
        "mountOptions": [
          {
            "type": "Sony E",
            "mount": "native"
          }
        ]
      },
      "Fujinon MK50-135mm T2.9": {
        "brand": "Fujinon",
        "frontDiameterMm": 85,
        "clampOn": true,
        "tStop": 2.9,
        "mount": "Sony E",
        "rodStandard": "15mm",
        "rodLengthCm": 20,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 1.2,
        "weight_g": 980,
        "imageCircleMm": 28.5,
        "lengthMm": 206,
        "notes": "MK50–135mm T2.9 (S35). Fujifilm page lists 206.3 mm length, 980 g.",
        "mountOptions": [
          {
            "type": "Sony E",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 46.5,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 46.5,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 46.5,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 45,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 45,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 12mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.3,
        "weight_g": 2600,
        "imageCircleMm": 31,
        "lengthMm": 160,
        "notes": "Cooke S4/i technical data lists Ø110 mm fronts, 0.3 m MOD, and 2.6 kg weight for the 12 mm.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 14mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.2,
        "weight_g": 2500,
        "imageCircleMm": 31,
        "lengthMm": 144,
        "notes": "Cooke specifications show the 14 mm sharing the Ø110 mm front, 0.2 m close focus, and ~2.5 kg build.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 16mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.2,
        "weight_g": 1800,
        "imageCircleMm": 31,
        "lengthMm": 120,
        "notes": "S4/i 16 mm prime: 0.2 m MOD, 1.8 kg mass, and Ø110 mm clamp-on profile.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 18mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.25,
        "weight_g": 1970,
        "imageCircleMm": 31,
        "lengthMm": 137,
        "notes": "Cooke publishes a 0.25 m minimum focus, 137 mm length, and 1.97 kg weight for the 18 mm S4/i.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 21mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.25,
        "weight_g": 1700,
        "imageCircleMm": 31,
        "lengthMm": 118,
        "notes": "S4/i 21 mm spec: Ø110 mm front, 0.25 m MOD, ≈1.7 kg weight per Cooke datasheet.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 25mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.25,
        "weight_g": 1580,
        "imageCircleMm": 31,
        "lengthMm": 104,
        "notes": "Cooke S4/i 25 mm: 0.25 m MOD with 104 mm length and 1.58 kg weight.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 27mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.25,
        "weight_g": 1550,
        "imageCircleMm": 31,
        "lengthMm": 104,
        "notes": "Cooke datasheet lists the 27 mm at 1.55 kg with a 0.25 m close focus.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 32mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.3,
        "weight_g": 1590,
        "imageCircleMm": 31,
        "lengthMm": 104,
        "notes": "Cooke S4/i 32 mm: 0.3 m MOD, 1.59 kg weight, Ø110 mm front.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 35mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.3,
        "weight_g": 1520,
        "imageCircleMm": 31,
        "lengthMm": 104,
        "notes": "Cooke S4/i 35 mm shares the compact 104 mm length with 0.3 m MOD and ~1.52 kg weight.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 40mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.38,
        "weight_g": 1650,
        "imageCircleMm": 31,
        "lengthMm": 104,
        "notes": "Cooke publishes a 0.38 m close focus and ~1.65 kg mass for the 40 mm S4/i prime.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 50mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.41,
        "weight_g": 1650,
        "imageCircleMm": 31,
        "lengthMm": 104,
        "notes": "Cooke S4/i 50 mm: 0.41 m MOD, 104 mm overall length, around 1.65 kg.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 65mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.61,
        "weight_g": 1750,
        "imageCircleMm": 31,
        "lengthMm": 112,
        "notes": "Cooke spec lists the 65 mm at 0.61 m close focus with ~1.75 kg weight.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 75mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.76,
        "weight_g": 1900,
        "imageCircleMm": 31,
        "lengthMm": 125,
        "notes": "Cooke S4/i 75 mm: 0.76 m MOD and ~1.9 kg, still Ø110 mm clamp-on.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 100mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.91,
        "weight_g": 2350,
        "imageCircleMm": 31,
        "lengthMm": 138,
        "notes": "Cooke data: 0.91 m close focus, 138 mm length, and ≈2.35 kg for the 100 mm S4/i.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 135mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "19mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1.37,
        "weight_g": 2900,
        "imageCircleMm": 31,
        "lengthMm": 170,
        "notes": "Cooke lists the 135 mm with 1.37 m MOD, 170 mm length, and roughly 2.9 kg weight.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 150mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "19mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1.52,
        "weight_g": 3100,
        "imageCircleMm": 31,
        "lengthMm": 170,
        "notes": "Cooke S4/i 150 mm: ~1.52 m close focus, 3.1 kg weight, Ø110 mm front.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 180mm T2.0": {
        "brand": "Cooke",
        "frontDiameterMm": 110,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "19mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1.83,
        "weight_g": 3400,
        "imageCircleMm": 31,
        "lengthMm": 182,
        "notes": "Cooke technical table: 1.83 m MOD and roughly 3.4 kg for the 180 mm S4/i prime.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke S4/i 300mm T3.0": {
        "brand": "Cooke",
        "frontDiameterMm": 136,
        "clampOn": true,
        "tStop": 3,
        "tStopRange": "T3.0–T22",
        "mount": "PL",
        "rodStandard": "19mm",
        "rodLengthCm": 60,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 3.66,
        "weight_g": 5800,
        "imageCircleMm": 31,
        "lengthMm": 320,
        "notes": "Cooke S4/i 300 mm tele: larger Ø136 mm front, ~5.8 kg, and 3.66 m minimum focus.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "imageCircleMm": 31.14,
        "lengthMm": 61,
        "minFocusMeters": 0.2,
        "weight_g": 820,
        "notes": "Front Ø110 mm; Super35; approx 2.40 in length",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "imageCircleMm": 31.14,
        "lengthMm": 69,
        "minFocusMeters": 0.2,
        "weight_g": 860,
        "notes": "Front Ø110 mm; approx 2.70 in length",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "imageCircleMm": 31.14,
        "lengthMm": 69,
        "minFocusMeters": 0.23,
        "weight_g": 820,
        "notes": "Front Ø110 mm",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "imageCircleMm": 31.14,
        "lengthMm": 69,
        "minFocusMeters": 0.33,
        "weight_g": 1040,
        "notes": "Front Ø110 mm",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "imageCircleMm": 55,
        "minFocusMeters": 0.38,
        "weight_g": 1630,
        "notes": "Front Ø110 mm; longer prime; manufacturer rates 55 mm image circle at infinity and 62 mm at close focus.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Cooke Speed Panchro 18mm (P+S rehousing)": {
        "brand": "Cooke (P+S rehoused)",
        "frontDiameterMm": 100,
        "clampOn": true,
        "tStop": 2.3,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "mountOptions": []
      },
      "Cooke Speed Panchro 25mm (P+S rehousing)": {
        "brand": "Cooke (P+S rehoused)",
        "frontDiameterMm": 100,
        "clampOn": true,
        "tStop": 2.3,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "mountOptions": []
      },
      "Cooke Speed Panchro 35mm (P+S rehousing)": {
        "brand": "Cooke (P+S rehoused)",
        "frontDiameterMm": 100,
        "clampOn": true,
        "tStop": 2.3,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "mountOptions": []
      },
      "Cooke Speed Panchro 40mm (P+S rehousing)": {
        "brand": "Cooke (P+S rehoused)",
        "frontDiameterMm": 100,
        "clampOn": true,
        "tStop": 2.3,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "mountOptions": []
      },
      "Cooke Speed Panchro 75mm (P+S rehousing)": {
        "brand": "Cooke (P+S rehoused)",
        "frontDiameterMm": 100,
        "clampOn": true,
        "tStop": 2.3,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 31.14,
        "mountOptions": []
      },
      "P+S Technik Kowa Prominar 40mm T2.3": {
        "brand": "P+S Technik",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.3,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 10,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1,
        "weight_g": 1180,
        "imageCircleMm": 31.1,
        "lengthMm": 95,
        "notes": "Kowa 40mm T2.3 PS-rehousing; 77 mm filter thread on all focal lengths.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "P+S Technik Kowa Prominar 50mm T2.3": {
        "brand": "P+S Technik",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.3,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 10,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1.1,
        "weight_g": 1300,
        "imageCircleMm": 31.1,
        "lengthMm": 105,
        "notes": "Kowa 50mm T2.3 PS-rehousing; 77 mm filter thread.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "P+S Technik Kowa Prominar 75mm T2.8": {
        "brand": "P+S Technik",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.8,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1,
        "weight_g": 1560,
        "imageCircleMm": 31.1,
        "lengthMm": 134,
        "notes": "Kowa 75mm T2.8 PS-rehousing; 77 mm filter thread.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "P+S Technik Kowa Prominar 100mm T3.4": {
        "brand": "P+S Technik",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 3.4,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1.7,
        "weight_g": 1760,
        "imageCircleMm": 31.1,
        "lengthMm": 164,
        "notes": "Kowa 100mm T3.4 PS-rehousing; 77 mm filter thread.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Laowa 24mm T8 2× Pro2be (3-lens set: Direct / 35° / Periscope)": {
        "brand": "Laowa",
        "frontDiameterMm": 30,
        "clampOn": true,
        "tStop": 8,
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.005,
        "imageCircleMm": 43.3,
        "notes": "Macro probe set with 0°, 35° and 90° modules; waterproof tip and 2× magnification.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 43.2,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 43.2,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Sigma Cine FF High Speed Prime 14mm T2": {
        "brand": "Sigma",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2,
        "mount": "PL / EF / E (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.27,
        "weight_g": 1190,
        "imageCircleMm": 43.3,
        "lengthMm": 126,
        "notes": "Full-frame high-speed prime with interchangeable mounts and 0.8 mod gears.",
        "mountOptions": [
          {
            "type": "PL / EF / E (convertible)",
            "mount": "native"
          }
        ]
      },
      "Sigma Cine FF High Speed Prime 20mm T1.5": {
        "brand": "Sigma",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.28,
        "weight_g": 1430,
        "imageCircleMm": 43.3,
        "lengthMm": 138,
        "notes": "High-speed wide with unified 0.8 mod gears; optional lightweight support recommended for gimbals.",
        "mountOptions": [
          {
            "type": "PL / EF / E (convertible)",
            "mount": "native"
          }
        ]
      },
      "Sigma Cine FF High Speed Prime 24mm T1.5": {
        "brand": "Sigma",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.3,
        "weight_g": 1360,
        "imageCircleMm": 43.3,
        "lengthMm": 124,
        "notes": "Matches Sigma FF housing with 95 mm front and consistent gear spacing for matte box swaps.",
        "mountOptions": [
          {
            "type": "PL / EF / E (convertible)",
            "mount": "native"
          }
        ]
      },
      "Sigma Cine FF High Speed Prime 28mm T1.5": {
        "brand": "Sigma",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.3,
        "weight_g": 1300,
        "imageCircleMm": 43.3,
        "lengthMm": 122,
        "notes": "Standard wide FF prime with interchangeable mounts and 95 mm clip-on matte box compatibility.",
        "mountOptions": [
          {
            "type": "PL / EF / E (convertible)",
            "mount": "native"
          }
        ]
      },
      "Sigma Cine FF High Speed Prime 35mm T1.5": {
        "brand": "Sigma",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 1250,
        "imageCircleMm": 43.3,
        "lengthMm": 118,
        "notes": "Go-to focal with matching focus/iris positions for fast swaps across the Sigma FF set.",
        "mountOptions": [
          {
            "type": "PL / EF / E (convertible)",
            "mount": "native"
          }
        ]
      },
      "Sigma Cine FF High Speed Prime 40mm T1.5": {
        "brand": "Sigma",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.4,
        "weight_g": 1210,
        "imageCircleMm": 43.3,
        "lengthMm": 118,
        "notes": "Large-format ready normal with consistent 95 mm front for clip-on matte boxes.",
        "mountOptions": [
          {
            "type": "PL / EF / E (convertible)",
            "mount": "native"
          }
        ]
      },
      "Sigma Cine FF High Speed Prime 50mm T1.5": {
        "brand": "Sigma",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.4,
        "weight_g": 1180,
        "imageCircleMm": 43.3,
        "lengthMm": 117,
        "notes": "Standard Sigma FF prime with LDS and /i contacts in PL for metadata-enabled shoots.",
        "mountOptions": [
          {
            "type": "PL / EF / E (convertible)",
            "mount": "native"
          }
        ]
      },
      "Sigma Cine FF High Speed Prime 85mm T1.5": {
        "brand": "Sigma",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.95,
        "weight_g": 1220,
        "imageCircleMm": 43.3,
        "lengthMm": 125,
        "notes": "Portrait-length FF prime with 300° focus travel; add clip-on support ring for extended builds.",
        "mountOptions": [
          {
            "type": "PL / EF / E (convertible)",
            "mount": "native"
          }
        ]
      },
      "Sigma Cine FF High Speed Prime 105mm T1.5": {
        "brand": "Sigma",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 1,
        "weight_g": 1620,
        "imageCircleMm": 43.3,
        "lengthMm": 134,
        "notes": "Compact FF prime with LDS and /i metadata support in PL mount plus matched gear positions.",
        "mountOptions": [
          {
            "type": "PL / EF / E (convertible)",
            "mount": "native"
          }
        ]
      },
      "Sigma Cine FF High Speed Prime 135mm T2": {
        "brand": "Sigma",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2,
        "mount": "PL / EF / E (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1.1,
        "weight_g": 1840,
        "imageCircleMm": 43.3,
        "lengthMm": 156,
        "notes": "Long telephoto prime best paired with 15 mm support bridge or studio rods for steadiness.",
        "mountOptions": [
          {
            "type": "PL / EF / E (convertible)",
            "mount": "native"
          }
        ]
      },
      "Sigma Cine FF Zoom 28-45mm T2": {
        "brand": "Sigma",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2,
        "mount": "PL / EF (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.61,
        "weight_g": 4490,
        "imageCircleMm": 46.3,
        "lengthMm": 226,
        "notes": "Full-frame Sigma cinema zoom covering wide-to-standard angles with consistent 0.8 mod gears and Cooke /i-compatible metadata pads.",
        "mountOptions": [
          {
            "type": "PL / EF (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "Sigma Cine High Speed Zoom 50-100mm T2": {
        "brand": "Sigma",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2,
        "mount": "PL / EF (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1.1,
        "weight_g": 1970,
        "imageCircleMm": 31,
        "lengthMm": 197,
        "notes": "Super 35 companion zoom to the 18-35mm with matching 95 mm fronts, long focus throw, and durable cine housing.",
        "mountOptions": [
          {
            "type": "PL / EF (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "Sigma Cine High Speed Zoom 18-35mm T2": {
        "brand": "Sigma",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2,
        "mount": "PL / EF (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.28,
        "weight_g": 1870,
        "imageCircleMm": 31,
        "lengthMm": 196,
        "notes": "Super 35 high-speed zoom optimized for gimbals and handheld use while retaining 0.8 mod cine gears and 95 mm fronts.",
        "mountOptions": [
          {
            "type": "PL / EF (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "Tokina Vista 18mm T1.5": {
        "brand": "Tokina",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.3,
        "weight_g": 3200,
        "imageCircleMm": 46.7,
        "lengthMm": 188,
        "notes": "Ultra-wide Vista prime with generous image circle; use 15 mm rods with yoke-style lens support.",
        "mountOptions": [
          {
            "type": "PL / EF / E (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "Tokina Vista 21mm T1.5": {
        "brand": "Tokina",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.3,
        "weight_g": 2400,
        "imageCircleMm": 46.7,
        "lengthMm": 179,
        "notes": "Vista large-format prime with 46.7 mm image circle and matched gear spacing.",
        "mountOptions": [
          {
            "type": "PL / EF / E (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "Tokina Vista 25mm T1.5": {
        "brand": "Tokina",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.35,
        "weight_g": 2500,
        "imageCircleMm": 46.7,
        "lengthMm": 179,
        "notes": "Fast full-frame wide with matching focus/iris gear placement across the Vista range.",
        "mountOptions": [
          {
            "type": "PL / EF / E (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "Tokina Vista 35mm T1.5": {
        "brand": "Tokina",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.38,
        "weight_g": 2380,
        "imageCircleMm": 46.7,
        "lengthMm": 179,
        "notes": "Large-format normal prime with 300° focus travel and shared 114 mm front.",
        "mountOptions": [
          {
            "type": "PL / EF / E (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "Tokina Vista 40mm T1.5": {
        "brand": "Tokina",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.38,
        "weight_g": 2300,
        "imageCircleMm": 46.7,
        "lengthMm": 179,
        "notes": "Tokina Vista full-frame prime with 300° focus rotation and 0.8 mod gears.",
        "mountOptions": [
          {
            "type": "PL / EF / E (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "Tokina Vista 50mm T1.5": {
        "brand": "Tokina",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.6,
        "weight_g": 2320,
        "imageCircleMm": 46.7,
        "lengthMm": 179,
        "notes": "Vista 50 mm maintains even gear spacing and benefits from 15 mm lens support on longer takes.",
        "mountOptions": [
          {
            "type": "PL / EF / E (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "Tokina Vista 65mm T1.5": {
        "brand": "Tokina",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.65,
        "weight_g": 2450,
        "imageCircleMm": 46.7,
        "lengthMm": 179,
        "notes": "Longer Tokina Vista prime covering VistaVision with unified housing dimensions.",
        "mountOptions": [
          {
            "type": "PL / EF / E (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "Tokina Vista 85mm T1.5": {
        "brand": "Tokina",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.95,
        "weight_g": 2350,
        "imageCircleMm": 46.7,
        "lengthMm": 179,
        "notes": "Telephoto Vista prime—pair with 15 mm rods and lens support foot for steadier pulls.",
        "mountOptions": [
          {
            "type": "PL / EF / E (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "Tokina Vista 105mm T1.5": {
        "brand": "Tokina",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.5,
        "mount": "PL / EF / E (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1,
        "weight_g": 2420,
        "imageCircleMm": 46.7,
        "lengthMm": 179,
        "notes": "Long Vista tele prime covering full-frame and VistaVision with identical gear positions.",
        "mountOptions": [
          {
            "type": "PL / EF / E (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "Cooke SP3 25mm T2.4": {
        "brand": "Cooke",
        "frontDiameterMm": 81,
        "clampOn": true,
        "tStop": 2.4,
        "mount": "E / RF / L (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.25,
        "weight_g": 700,
        "imageCircleMm": 43.3,
        "lengthMm": 87,
        "notes": "Wide Cooke SP3 prime with native mirrorless mounts and 77 mm front threads for lightweight matte boxes.",
        "mountOptions": [
          {
            "type": "E / RF / L (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "Cooke SP3 32mm T2.4": {
        "brand": "Cooke",
        "frontDiameterMm": 81,
        "clampOn": true,
        "tStop": 2.4,
        "mount": "E / RF / L (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.29,
        "weight_g": 690,
        "imageCircleMm": 43.3,
        "lengthMm": 87,
        "notes": "Mirrorless-native Cooke SP3 with interchangeable bayonet mounts and 77 mm threads.",
        "mountOptions": [
          {
            "type": "E / RF / L (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "Cooke SP3 50mm T2.4": {
        "brand": "Cooke",
        "frontDiameterMm": 81,
        "clampOn": true,
        "tStop": 2.4,
        "mount": "E / RF / L (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.45,
        "weight_g": 730,
        "imageCircleMm": 43.3,
        "lengthMm": 94,
        "notes": "Standard SP3 prime retaining Cooke Look micro-contrast with lightweight build.",
        "mountOptions": [
          {
            "type": "E / RF / L (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "Cooke SP3 75mm T2.4": {
        "brand": "Cooke",
        "frontDiameterMm": 81,
        "clampOn": true,
        "tStop": 2.4,
        "mount": "E / RF / L (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.7,
        "weight_g": 760,
        "imageCircleMm": 43.3,
        "lengthMm": 99,
        "notes": "Compact SP3 telephoto prime, matched housing with Cooke Look rendering.",
        "mountOptions": [
          {
            "type": "E / RF / L (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "Cooke SP3 100mm T2.4": {
        "brand": "Cooke",
        "frontDiameterMm": 81,
        "clampOn": true,
        "tStop": 2.4,
        "mount": "E / RF / L (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 1,
        "weight_g": 840,
        "imageCircleMm": 43.3,
        "lengthMm": 118,
        "notes": "Longest SP3 focal—add optional support foot for extended rods without sacrificing handheld agility.",
        "mountOptions": [
          {
            "type": "E / RF / L (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "TRIBE7 Blackwing7 T-Tune 27mm T1.8": {
        "brand": "TRIBE7",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "mount": "PL / LPL (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.3,
        "weight_g": 1880,
        "imageCircleMm": 46.6,
        "lengthMm": 178,
        "notes": "Wide Blackwing7 T-Tune with swappable tuning modules; brace with 15 mm rods for accessories.",
        "mountOptions": [
          {
            "type": "PL / LPL (convertible)",
            "mount": "native"
          }
        ]
      },
      "TRIBE7 Blackwing7 T-Tune 37mm T1.8": {
        "brand": "TRIBE7",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "mount": "PL / LPL (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.45,
        "weight_g": 1900,
        "imageCircleMm": 46.6,
        "lengthMm": 178,
        "notes": "Blackwing7 T-Tune prime with modular contrast tuning and large-format coverage.",
        "mountOptions": [
          {
            "type": "PL / LPL (convertible)",
            "mount": "native"
          }
        ]
      },
      "TRIBE7 Blackwing7 T-Tune 47mm T1.8": {
        "brand": "TRIBE7",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "mount": "PL / LPL (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.55,
        "weight_g": 1920,
        "imageCircleMm": 46.6,
        "lengthMm": 178,
        "notes": "Normal Blackwing7 T-Tune prime—pair with clip-on matte boxes or 114 mm donut.",
        "mountOptions": [
          {
            "type": "PL / LPL (convertible)",
            "mount": "native"
          }
        ]
      },
      "TRIBE7 Blackwing7 T-Tune 57mm T1.8": {
        "brand": "TRIBE7",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "mount": "PL / LPL (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.65,
        "weight_g": 1950,
        "imageCircleMm": 46.6,
        "lengthMm": 178,
        "notes": "Blackwing7 T-Tune mid-tele prime tuned for lower contrast and halation.",
        "mountOptions": [
          {
            "type": "PL / LPL (convertible)",
            "mount": "native"
          }
        ]
      },
      "TRIBE7 Blackwing7 T-Tune 77mm T1.8": {
        "brand": "TRIBE7",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "mount": "PL / LPL (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.85,
        "weight_g": 2050,
        "imageCircleMm": 46.6,
        "lengthMm": 178,
        "notes": "Short telephoto Blackwing7 with tuned flare behavior; secure with lens support when rigged with motors.",
        "mountOptions": [
          {
            "type": "PL / LPL (convertible)",
            "mount": "native"
          }
        ]
      },
      "TRIBE7 Blackwing7 T-Tune 107mm T1.8": {
        "brand": "TRIBE7",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8,
        "mount": "PL / LPL (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1.2,
        "weight_g": 2150,
        "imageCircleMm": 46.6,
        "lengthMm": 185,
        "notes": "Long Blackwing7 tele tuned for expressive falloff—run on 15 mm or 19 mm studio rods with solid support.",
        "mountOptions": [
          {
            "type": "PL / LPL (convertible)",
            "mount": "native"
          }
        ]
      },
      "Atlas Mercury 36mm T2.2 1.5x": {
        "brand": "Atlas",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.2,
        "mount": "LPL / PL (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "anamorphic",
        "minFocusMeters": 0.4,
        "weight_g": 1700,
        "imageCircleMm": 36,
        "lengthMm": 145,
        "notes": "Widest Mercury 1.5x prime; prefer 15 mm bridge support when stacking clip-on matte boxes.",
        "mountOptions": [
          {
            "type": "LPL / PL (convertible)",
            "mount": "native"
          }
        ]
      },
      "Atlas Mercury 42mm T2.2 1.5x": {
        "brand": "Atlas",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.2,
        "mount": "LPL / PL (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "anamorphic",
        "minFocusMeters": 0.55,
        "weight_g": 1800,
        "imageCircleMm": 36,
        "lengthMm": 150,
        "notes": "Mercury Series 1.5x anamorphic covering Open Gate sensors with built-in close focus.",
        "mountOptions": [
          {
            "type": "LPL / PL (convertible)",
            "mount": "native"
          }
        ]
      },
      "Atlas Mercury 54mm T2.2 1.5x": {
        "brand": "Atlas",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.2,
        "mount": "LPL / PL (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "anamorphic",
        "minFocusMeters": 0.7,
        "weight_g": 1900,
        "imageCircleMm": 36,
        "lengthMm": 160,
        "notes": "Mercury Series normal with rear net slot; support on rods when pairing with dual motors.",
        "mountOptions": [
          {
            "type": "LPL / PL (convertible)",
            "mount": "native"
          }
        ]
      },
      "Atlas Mercury 72mm T2.2 1.5x": {
        "brand": "Atlas",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.2,
        "mount": "LPL / PL (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "anamorphic",
        "minFocusMeters": 0.9,
        "weight_g": 2000,
        "imageCircleMm": 36,
        "lengthMm": 170,
        "notes": "Mercury Series 1.5x anamorphic mid-tele with LPL base mount and drop-in rear filter slot.",
        "mountOptions": [
          {
            "type": "LPL / PL (convertible)",
            "mount": "native"
          }
        ]
      },
      "Atlas Mercury 95mm T2.2 1.5x": {
        "brand": "Atlas",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.2,
        "mount": "LPL / PL (convertible)",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "anamorphic",
        "minFocusMeters": 1.1,
        "weight_g": 2150,
        "imageCircleMm": 36,
        "lengthMm": 185,
        "notes": "Tele Mercury 1.5x prime—pair with sturdy 15 mm or studio rods for rock-solid framing.",
        "mountOptions": [
          {
            "type": "LPL / PL (convertible)",
            "mount": "native"
          }
        ]
      },
      "Atlas Orion 32mm T2.0 2x": {
        "brand": "Atlas",
        "frontDiameterMm": 136,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "anamorphic",
        "anamorphicSqueeze": 2,
        "minFocusMeters": 0.76,
        "weight_g": 3600,
        "imageCircleMm": 31,
        "lengthMm": 210,
        "notes": "Atlas Orion Silver Edition wide: Ø136 mm front, 0.76 m close focus, 3.6 kg weight.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Atlas Orion 40mm T2.0 2x": {
        "brand": "Atlas",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "anamorphic",
        "anamorphicSqueeze": 2,
        "minFocusMeters": 0.61,
        "weight_g": 3100,
        "imageCircleMm": 31,
        "lengthMm": 197,
        "notes": "Atlas Orion A-set 40 mm: 0.61 m MOD, Ø114 mm front, approx. 3.1 kg.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Atlas Orion 50mm T2.0 2x": {
        "brand": "Atlas",
        "frontDiameterMm": 136,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "anamorphic",
        "anamorphicSqueeze": 2,
        "minFocusMeters": 0.7,
        "weight_g": 3400,
        "imageCircleMm": 31,
        "lengthMm": 210,
        "notes": "Atlas Orion B-set 50 mm: 0.7 m close focus, 210 mm length, 3.4 kg mass.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Atlas Orion 65mm T2.0 2x": {
        "brand": "Atlas",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "anamorphic",
        "anamorphicSqueeze": 2,
        "minFocusMeters": 0.76,
        "weight_g": 3200,
        "imageCircleMm": 31,
        "lengthMm": 197,
        "notes": "Atlas Orion A-set 65 mm: Ø114 mm clamp-on, 0.76 m MOD, roughly 3.2 kg.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Atlas Orion 80mm T2.0 2x": {
        "brand": "Atlas",
        "frontDiameterMm": 136,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "anamorphic",
        "anamorphicSqueeze": 2,
        "minFocusMeters": 0.91,
        "weight_g": 3500,
        "imageCircleMm": 31,
        "lengthMm": 210,
        "notes": "Atlas Orion B-set 80 mm: 0.91 m close focus with ~3.5 kg heft.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Atlas Orion 100mm T2.0 2x": {
        "brand": "Atlas",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2,
        "tStopRange": "T2.0–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "anamorphic",
        "anamorphicSqueeze": 2,
        "minFocusMeters": 1,
        "weight_g": 3600,
        "imageCircleMm": 31,
        "lengthMm": 210,
        "notes": "Atlas Orion A-set 100 mm: 1 m close focus, 210 mm length, approx. 3.6 kg.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Atlas Orion 135mm T2.2 2x": {
        "brand": "Atlas",
        "frontDiameterMm": 136,
        "clampOn": true,
        "tStop": 2.2,
        "tStopRange": "T2.2–T22",
        "mount": "PL",
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "anamorphic",
        "anamorphicSqueeze": 2,
        "minFocusMeters": 1.52,
        "weight_g": 4000,
        "imageCircleMm": 31,
        "lengthMm": 230,
        "notes": "Atlas Orion C-set 135 mm: T2.2 speed, 1.52 m close focus, roughly 4 kg.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Atlas Orion 180mm T2.2 2x": {
        "brand": "Atlas",
        "frontDiameterMm": 136,
        "clampOn": true,
        "tStop": 2.2,
        "tStopRange": "T2.2–T22",
        "mount": "PL",
        "rodStandard": "19mm",
        "rodLengthCm": 60,
        "needsLensSupport": true,
        "lensType": "anamorphic",
        "anamorphicSqueeze": 2,
        "minFocusMeters": 1.83,
        "weight_g": 4200,
        "imageCircleMm": 31,
        "lengthMm": 240,
        "notes": "Atlas Orion 180 mm tele: larger Ø136 mm front, ~4.2 kg, 1.83 m minimum focus.",
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "Sigma 18–35mm f/1.8 DC HSM Art": {
        "brand": "Sigma",
        "frontDiameterMm": 82,
        "clampOn": true,
        "tStop": 1.8,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 28.2,
        "mountOptions": []
      },
      "Sony FE 24–70mm f/2.8 G Master II": {
        "brand": "Sony",
        "frontDiameterMm": 82,
        "clampOn": true,
        "tStop": 2.8,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 43.27,
        "mountOptions": []
      },
      "Sony FE 70–200mm f/2.8 G Master II": {
        "brand": "Sony",
        "frontDiameterMm": 77,
        "clampOn": true,
        "tStop": 2.8,
        "rodStandard": "15mm",
        "rodLengthCm": 45,
        "needsLensSupport": true,
        "lensType": "spherical",
        "imageCircleMm": 43.27,
        "mountOptions": []
      },
      "Minolta 28mm f/2.8": {
        "brand": "Minolta",
        "frontDiameterMm": 55,
        "clampOn": true,
        "tStop": 2.8,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 43.27,
        "mountOptions": []
      },
      "Minolta 35mm f/1.4": {
        "brand": "Minolta",
        "frontDiameterMm": 72,
        "clampOn": true,
        "tStop": 1.4,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 43.27,
        "mountOptions": []
      },
      "Minolta 50mm f/1.4": {
        "brand": "Minolta",
        "frontDiameterMm": 55,
        "clampOn": true,
        "tStop": 1.4,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 43.27,
        "mountOptions": []
      },
      "Minolta 85mm f/1.8": {
        "brand": "Minolta",
        "frontDiameterMm": 55,
        "clampOn": true,
        "tStop": 1.8,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 43.27,
        "mountOptions": []
      },
      "SIGMA Aizu Prime Line 25mm T1.3 LF": {
        "brand": "SIGMA",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.3,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.3,
        "mountOptions": []
      },
      "SIGMA Aizu Prime Line 27mm T1.3 LF": {
        "brand": "SIGMA",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.3,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.3,
        "mountOptions": []
      },
      "SIGMA Aizu Prime Line 32mm T1.3 LF": {
        "brand": "SIGMA",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.3,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.3,
        "mountOptions": []
      },
      "SIGMA Aizu Prime Line 35mm T1.3 LF": {
        "brand": "SIGMA",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.3,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.3,
        "mountOptions": []
      },
      "SIGMA Aizu Prime Line 40mm T1.3 LF": {
        "brand": "SIGMA",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.3,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.3,
        "mountOptions": []
      },
      "SIGMA Aizu Prime Line 50mm T1.3 LF": {
        "brand": "SIGMA",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.3,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.3,
        "mountOptions": []
      },
      "SIGMA Aizu Prime Line 65mm T1.3 LF": {
        "brand": "SIGMA",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.3,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.3,
        "mountOptions": []
      },
      "SIGMA Aizu Prime Line 75mm T1.3 LF": {
        "brand": "SIGMA",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.3,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.3,
        "mountOptions": []
      },
      "NiSi AUREUS Prime 18mm T1.4": {
        "brand": "NiSi",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 1.4,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46,
        "mountOptions": []
      },
      "NiSi AUREUS Prime 24mm T1.4": {
        "brand": "NiSi",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 1.4,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46,
        "mountOptions": []
      },
      "NiSi AUREUS Prime 35mm T1.4": {
        "brand": "NiSi",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 1.4,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46,
        "mountOptions": []
      },
      "NiSi AUREUS Prime 50mm T1.4": {
        "brand": "NiSi",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 1.4,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46,
        "mountOptions": []
      },
      "NiSi AUREUS Prime 85mm T1.4": {
        "brand": "NiSi",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 1.4,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46,
        "mountOptions": []
      },
      "IRIX Cine 150mm T3.0 Macro 1:1": {
        "brand": "IRIX",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 3,
        "mount": "PL / EF / RF / L / Z / E / MFT / X",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.36,
        "weight_g": 1102,
        "imageCircleMm": 43.3,
        "lengthMm": 136,
        "notes": "Cine 150mm T3.0 Macro 1:1; internal focus; 86 mm filter thread.",
        "mountOptions": [
          {
            "type": "PL / EF / RF / L / Z / E / MFT / X",
            "mount": "native"
          }
        ]
      },
      "SIRUI Vision Prime 1 24mm T1.4": {
        "brand": "SIRUI",
        "frontDiameterMm": 72,
        "clampOn": true,
        "tStop": 1.4,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46,
        "mountOptions": []
      },
      "SIRUI Vision Prime 1 35mm T1.4": {
        "brand": "SIRUI",
        "frontDiameterMm": 72,
        "clampOn": true,
        "tStop": 1.4,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46,
        "mountOptions": []
      },
      "SIRUI Vision Prime 1 50mm T1.4": {
        "brand": "SIRUI",
        "frontDiameterMm": 72,
        "clampOn": true,
        "tStop": 1.4,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46,
        "mountOptions": []
      },
      "DJI DL-S 16mm F2.8 ASPH ND": {
        "brand": "DJI",
        "frontDiameterMm": 55,
        "clampOn": false,
        "tStop": 2.8,
        "mount": "DJI DL-S",
        "rodStandard": null,
        "rodLengthCm": 5,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.4,
        "weight_g": 178,
        "imageCircleMm": 28.5,
        "lengthMm": 71,
        "notes": "DL-S 16mm F2.8 ND ASPH for Zenmuse X7/X9; 46 mm filter; built-in ND.",
        "mountOptions": [
          {
            "type": "DJI DL-S",
            "mount": "native"
          }
        ]
      },
      "DJI DL 24mm F2.8 LS ASPH": {
        "brand": "DJI",
        "frontDiameterMm": 55,
        "clampOn": false,
        "tStop": 2.8,
        "mount": "DJI DL",
        "rodStandard": null,
        "rodLengthCm": 5,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.85,
        "weight_g": 180,
        "imageCircleMm": 43.3,
        "lengthMm": 71,
        "notes": "DL 24mm F2.8 LS ASPH for Zenmuse X7/X9; 46 mm filter.",
        "mountOptions": [
          {
            "type": "DJI DL",
            "mount": "native"
          }
        ]
      },
      "DJI DL 35mm F2.8 LS ASPH": {
        "brand": "DJI",
        "frontDiameterMm": 55,
        "clampOn": false,
        "tStop": 2.8,
        "mount": "DJI DL",
        "rodStandard": null,
        "rodLengthCm": 5,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.85,
        "weight_g": 180,
        "imageCircleMm": 43.3,
        "lengthMm": 71,
        "notes": "DL 35mm F2.8 LS ASPH for Zenmuse X7/X9; 46 mm filter. Barrel φ55×71.2 mm.",
        "mountOptions": [
          {
            "type": "DJI DL",
            "mount": "native"
          }
        ]
      },
      "DJI DL 50mm F2.8 LS ASPH": {
        "brand": "DJI",
        "frontDiameterMm": 55,
        "clampOn": false,
        "tStop": 2.8,
        "mount": "DJI DL",
        "rodStandard": null,
        "rodLengthCm": 5,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.85,
        "weight_g": 180,
        "imageCircleMm": 43.3,
        "lengthMm": 71,
        "notes": "DL 50mm F2.8 LS ASPH for Zenmuse X7/X9; 46 mm filter.",
        "mountOptions": [
          {
            "type": "DJI DL",
            "mount": "native"
          }
        ]
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
        "lensType": "spherical",
        "imageCircleMm": 46.7,
        "mountOptions": [
          {
            "type": "PL",
            "mount": "native"
          }
        ]
      },
      "DZOFILM Pictor 12-25mm T2.8": {
        "brand": "DZOFILM",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.8,
        "mount": "PL / EF (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.4,
        "weight_g": 1600,
        "imageCircleMm": 31.5,
        "lengthMm": 150,
        "notes": "Pictor 12–25mm T2.8 (S35) parfocal zoom; DZO lists PL/EF mounts, Ø95 mm front, and 0.4 m MOD.",
        "mountOptions": [
          {
            "type": "PL / EF (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "DZOFILM Pictor 14-30mm T2.8": {
        "brand": "DZOFILM",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.8,
        "mount": "PL / EF (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.6,
        "weight_g": 1880,
        "imageCircleMm": 31.5,
        "lengthMm": 173,
        "notes": "Pictor 14–30mm T2.8 (S35) parfocal zoom; DZO lists PL/EF mounts, Ø95 mm front, and 0.6 m MOD.",
        "mountOptions": [
          {
            "type": "PL / EF (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "DZOFILM Pictor 20-55mm T2.8": {
        "brand": "DZOFILM",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.8,
        "mount": "PL / EF (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 0.6,
        "weight_g": 1520,
        "imageCircleMm": 31.1,
        "lengthMm": 164,
        "notes": "Pictor 20–55mm T2.8 (S35) parfocal; 16-blade iris; 86 mm filter thread.",
        "mountOptions": [
          {
            "type": "PL / EF (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "DZOFILM Pictor 50-125mm T2.8": {
        "brand": "DZOFILM",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.8,
        "mount": "PL / EF (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 15,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1.1,
        "weight_g": 1700,
        "imageCircleMm": 31.1,
        "lengthMm": 175,
        "notes": "Pictor 50–125mm T2.8 (S35) parfocal; 16-blade iris; 86 mm filter thread.",
        "mountOptions": [
          {
            "type": "PL / EF (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "DZOFILM Catta Ace 18-35mm T2.9": {
        "brand": "DZOFILM",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.9,
        "mount": "PL / EF (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.51,
        "weight_g": 1530,
        "imageCircleMm": 43.5,
        "lengthMm": 195,
        "notes": "Full-frame Catta Ace wide zoom with lightweight 80 mm fronts and quick-change PL/EF mounts for run-and-gun rigs.",
        "mountOptions": [
          {
            "type": "PL / EF (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "DZOFILM Catta Ace 35-80mm T2.9": {
        "brand": "DZOFILM",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.9,
        "mount": "PL / EF (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "minFocusMeters": 0.75,
        "weight_g": 1650,
        "imageCircleMm": 43.5,
        "lengthMm": 199,
        "notes": "Mid-range Catta Ace zoom balancing compact housing with unified gear spacing and rear drop-in filter slot.",
        "mountOptions": [
          {
            "type": "PL / EF (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "DZOFILM Catta Ace 70-135mm T2.9": {
        "brand": "DZOFILM",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.9,
        "mount": "PL / EF (interchangeable)",
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": true,
        "lensType": "spherical",
        "minFocusMeters": 1.1,
        "weight_g": 1750,
        "imageCircleMm": 43.5,
        "lengthMm": 203,
        "notes": "Telephoto Catta Ace zoom maintaining 80 mm fronts—add lightweight lens support when motors or matte boxes are installed.",
        "mountOptions": [
          {
            "type": "PL / EF (interchangeable)",
            "mount": "native"
          }
        ]
      },
      "DZOFILM Vespid Prime 12mm T2.8": {
        "brand": "DZOFILM",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.8,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.5,
        "mountOptions": []
      },
      "DZOFILM Vespid Prime 16mm T2.8": {
        "brand": "DZOFILM",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.8,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.5,
        "mountOptions": []
      },
      "DZOFILM Vespid Prime 21mm T2.1": {
        "brand": "DZOFILM",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.1,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.5,
        "mountOptions": []
      },
      "DZOFILM Vespid Prime 25mm T2.1": {
        "brand": "DZOFILM",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.1,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.5,
        "mountOptions": []
      },
      "DZOFILM Vespid Prime 35mm T2.1": {
        "brand": "DZOFILM",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.1,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.5,
        "mountOptions": []
      },
      "DZOFILM Vespid Prime 40mm T2.1": {
        "brand": "DZOFILM",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.1,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.5,
        "mountOptions": []
      },
      "DZOFILM Vespid Prime 50mm T2.1": {
        "brand": "DZOFILM",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.1,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.5,
        "mountOptions": []
      },
      "DZOFILM Vespid Prime 75mm T2.1": {
        "brand": "DZOFILM",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.1,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.5,
        "mountOptions": []
      },
      "DZOFILM Vespid Prime 90mm T2.8 Macro": {
        "brand": "DZOFILM",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.8,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.5,
        "mountOptions": []
      },
      "DZOFILM Vespid Prime 100mm T2.1": {
        "brand": "DZOFILM",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.1,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.5,
        "mountOptions": []
      },
      "DZOFILM Vespid Prime 125mm T2.1": {
        "brand": "DZOFILM",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.1,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.5,
        "mountOptions": []
      },
      "DZOFILM Vespid Retro 16mm T2.8": {
        "brand": "DZOFILM",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.8,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.5,
        "mountOptions": []
      },
      "DZOFILM Vespid Retro 25mm T2.1": {
        "brand": "DZOFILM",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.1,
        "rodStandard": "15mm",
        "rodLengthCm": 30,
        "needsLensSupport": false,
        "lensType": "spherical",
        "imageCircleMm": 46.5,
   