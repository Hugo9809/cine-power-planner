/* global registerDevice */
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
    "Directors Monitor 17\" (SmallHD/FSI)": {
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
    "Directors Monitor 13\" (SmallHD/FSI)": {
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
    "Sony PVM-A170 17\" OLED": {
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
  "wirelessReceivers": {
    "Teradek Bolt 6 XT RX": {
      "powerDrawWatts": 16,
      "videoInputs": [],
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
    "Teradek Bolt 4K RX": {
      "powerDrawWatts": 16,
      "videoInputs": [],
      "videoOutputs": [
        {
          "type": "HDMI"
        },
        {
          "type": "12G-SDI"
        }
      ],
      "frequency": "5.190-5.230 GHz (Non-DFS), 5.270-5.670 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
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
    "Teradek Bolt 4K LT 750 RX": {
      "powerDrawWatts": 10,
      "videoInputs": [],
      "videoOutputs": [
        { "type": "HDMI" },
        { "type": "12G-SDI" }
      ],
      "frequency": "5.190-5.230 GHz (Non-DFS), 5.270-5.670 GHz (DFS), 5.755-5.795 GHz (Non-DFS)",
      "latencyMs": "< 1ms",
      "power": {
        "input": [
          { "type": "LEMO 2-pin", "notes": "6-28V" },
          { "type": "Gold-mount" },
          { "type": "V-mount" }
        ]
      }
    },
    "Vaxis Storm 3000 RX": {
      "powerDrawWatts": 9,
      "videoInputs": [],
      "videoOutputs": [
        { "type": "HDMI" },
        { "type": "3G-SDI" }
      ],
      "frequency": "5 GHz",
      "latencyMs": "< 1ms",
      "power": {
        "input": [
          { "type": "LEMO 2-pin", "notes": "7-17V" },
          { "type": "Gold-mount" },
          { "type": "V-mount" }
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
      "ARRI Handle Extension Set": {
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
      "ARRI Tray Catcher": {
        "brand": "ARRI",
        "kNumber": "K2.66202.0",
        "compatible": [
          "LMB 4x5",
          "LMB-6"
        ]
      },
      "ARRI Diopter Frame 138mm": {
        "brand": "ARRI",
        "kNumber": "K2.0013740",
        "diameterMm": 138
      },
      "ARRI LMB Accessory Adapter": {
        "brand": "ARRI",
        "kNumber": "K2.0013014"
      }
    },
    "filters": {
      "ARRI Rota Pola Filter Holder": {
        "brand": "ARRI",
        "kNumber": "K2.0009434"
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
        "mount": "NP-F",
        "weight_g": 225
      },
      "Sony NP-F750": {
        "capacity": 33,
        "mount": "NP-F",
        "weight_g": 220
      },
      "Sony NP-F550": {
        "capacity": 16,
        "mount": "NP-F",
        "weight_g": 110
      }
    },
    "chargers": {
      "Single V-Mount Charger": {
        "mount": "V-Mount",
        "slots": 1
      },
      "Dual V-Mount Charger": {
        "mount": "V-Mount",
        "slots": 2
      },
      "Quad V-Mount Charger": {
        "mount": "V-Mount",
        "slots": 4
      },
      "Single B-Mount Charger": {
        "mount": "B-Mount",
        "slots": 1
      },
      "Dual B-Mount Charger": {
        "mount": "B-Mount",
        "slots": 2
      },
      "Quad B-Mount Charger": {
        "mount": "B-Mount",
        "slots": 4
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
        "Ultraslim BNC 0.3 m": {
          "type": "3G-SDI",
          "lengthM": 0.3
        },
        "Ultraslim BNC 0.5 m": {
          "type": "3G-SDI",
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
            "Lemo 2-pin"
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
            "Lemo 12 V Out (2-pin)"
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
            "Lemo 12 V Out (2-pin)"
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
            "Lemo 2-pin",
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
            "Lemo 2-pin",
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
            "Lemo 2-pin",
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
            "Lemo 2-pin",
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
            "Lemo 2-pin",
            "Lemo 5-pin"
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
            "Lemo 2-pin",
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
            "Lemo 0B 2-pin",
            "XLR 4-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleSystems": [
            "ARTEMIS/TRINITY"
          ]
        },
        "Monitor Power 12 V (Lemo 0B 2-pin to Lemo 0B 2-pin Short)": {
          "brand": "ARRI",
          "kNumber": "K2.0041723",
          "lengthM": null,
          "connectors": [
            "Lemo 0B 2-pin",
            "Lemo 0B 2-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleSystems": [
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
          "compatibleSystems": [
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
            "Lemo 0B 4-pin",
            "Lemo 0B 2-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleSystems": [
            "Master Grip",
            "TRINITY 2"
          ]
        },
        "MTG Monitor Power (Lemo 0B 4-pin to Lemo 0B 5-pin, 24 V)": {
          "brand": "ARRI",
          "kNumber": "K2.0038999",
          "lengthM": null,
          "connectors": [
            "Lemo 0B 4-pin",
            "Lemo 0B 5-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Power"
          ],
          "compatibleSystems": [
            "Master Grip",
            "TRINITY 2"
          ]
        },
        "TRINITY 2 Joystick Cable": {
          "brand": "ARRI",
          "kNumber": "K2.0043861",
          "lengthM": 0.75,
          "connectors": [
            "Lemo 0B 4-pin",
            "Lemo 0B 4-pin"
          ],
          "orientation": "straight",
          "useCase": [
            "Control"
          ],
          "compatibleSystems": [
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
          "compatibleSystems": [
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
          "compatibleSystems": [
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
          "compatibleSystems": [
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
          "compatibleSystems": [
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
        "tStop": 1.3
      },
      "ZEISS High Speed MK III 20mm T2.1": {
        "brand": "ZEISS",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 2.1
      },
      "ZEISS High Speed MK III 25mm T1.3": {
        "brand": "ZEISS",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 1.3
      },
      "ZEISS High Speed MK III 35mm T1.3": {
        "brand": "ZEISS",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 1.3
      },
      "ZEISS High Speed MK III 50mm T1.3": {
        "brand": "ZEISS",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 1.3
      },
      "ZEISS High Speed MK III 65mm T1.3": {
        "brand": "ZEISS",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 1.3
      },
      "ZEISS High Speed MK III 85mm T1.3": {
        "brand": "ZEISS",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 1.3
      },
      "ZEISS High Speed MK III 135mm T1.3": {
        "brand": "ZEISS",
        "frontDiameterMm": 80,
        "clampOn": true,
        "tStop": 1.3
      },
      "Angenieux Optimo 25-250mm T3.5 (PL)": {
        "brand": "Angénieux",
        "frontDiameterMm": 136,
        "clampOn": true,
        "tStop": 3.5,
        "mount": "PL"
      },
      "LOMO Anamorphic RF 35mm T2.5": {
        "brand": "LOMO",
        "frontDiameterMm": 141,
        "clampOn": true,
        "tStop": 2.5
      },
      "LOMO Anamorphic RF 50mm T2.4": {
        "brand": "LOMO",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.4
      },
      "LOMO Anamorphic RF 75mm T2.4": {
        "brand": "LOMO",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.4
      },
      "LOMO Anamorphic RF 100mm T3.2": {
        "brand": "LOMO",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 3.2
      },
      "Canon CN7x17 17-120mm T3.0-3.9": {
        "brand": "Canon",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 3.0,
        "mount": "PL"
      },
      "Angénieux Ultra Compact FF 37-102mm T2.9": {
        "brand": "Angénieux",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.9,
        "mount": "PL"
      },
      "Angénieux Ultra Compact FF 21-56mm T2.9": {
        "brand": "Angénieux",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 2.9,
        "mount": "PL"
      },
      "Angénieux Optimo Ultra 12x 36-435mm T4.2 (FF/VV)": {
        "brand": "Angénieux",
        "frontDiameterMm": 162,
        "clampOn": true,
        "tStop": 4.2,
        "mount": "PL"
      },
      "ARRI Signature Prime 15mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8
      },
      "ARRI Signature Prime 18mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8
      },
      "ARRI Signature Prime 21mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8
      },
      "ARRI Signature Prime 25mm T1.8": {
        "brand": "ARRI",
        "frontDiameterMm": 114,
        "clampOn": true,
        "tStop": 1.8
      },
      "ARRI/ZEISS Ultra Prime 16mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9
      },
      "ARRI/ZEISS Ultra Prime 20mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9
      },
      "ARRI/ZEISS Ultra Prime 24mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9
      },
      "ARRI/ZEISS Ultra Prime 32mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9
      },
      "ARRI/ZEISS Ultra Prime 40mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9
      },
      "ARRI/ZEISS Ultra Prime 50mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9
      },
      "ARRI/ZEISS Ultra Prime 65mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9
      },
      "ARRI/ZEISS Ultra Prime 85mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9
      },
      "ARRI/ZEISS Ultra Prime 100mm T1.9": {
        "brand": "ARRI/ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.9
      },
      "ZEISS Compact Zoom CZ.2 28-80mm T2.9": {
        "brand": "ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.9
      },
      "ZEISS Compact Zoom CZ.2 70-200mm T2.9": {
        "brand": "ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 2.9
      },
      "ZEISS Supreme Prime Radiance 50mm T1.5": {
        "brand": "ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5
      },
      "ZEISS Supreme Prime Radiance 85mm T1.5": {
        "brand": "ZEISS",
        "frontDiameterMm": 95,
        "clampOn": true,
        "tStop": 1.5
      },
      "Cooke Speed Panchro 18mm (P+S rehousing)": {
        "brand": "Cooke (P+S rehoused)",
        "frontDiameterMm": 100,
        "clampOn": true,
        "tStop": 2.3
      },
      "Cooke Speed Panchro 25mm (P+S rehousing)": {
        "brand": "Cooke (P+S rehoused)",
        "frontDiameterMm": 100,
        "clampOn": true,
        "tStop": 2.3
      },
      "Cooke Speed Panchro 35mm (P+S rehousing)": {
        "brand": "Cooke (P+S rehoused)",
        "frontDiameterMm": 100,
        "clampOn": true,
        "tStop": 2.3
      },
      "Cooke Speed Panchro 40mm (P+S rehousing)": {
        "brand": "Cooke (P+S rehoused)",
        "frontDiameterMm": 100,
        "clampOn": true,
        "tStop": 2.3
      },
      "Cooke Speed Panchro 75mm (P+S rehousing)": {
        "brand": "Cooke (P+S rehoused)",
        "frontDiameterMm": 100,
        "clampOn": true,
        "tStop": 2.3
      },
      "Laowa 24mm T8 2× Pro2be (3-lens set: Direct / 35° / Periscope)": {
        "brand": "Laowa",
        "frontDiameterMm": 30,
        "clampOn": true,
        "tStop": 8
      },
      "Sigma 18–35mm f/1.8 DC HSM Art": {
        "brand": "Sigma",
        "frontDiameterMm": 82,
        "clampOn": true,
        "tStop": 1.8
      },
      "Sony FE 24–70mm f/2.8 G Master II": {
        "brand": "Sony",
        "frontDiameterMm": 82,
        "clampOn": true,
        "tStop": 2.8
      },
      "Sony FE 70–200mm f/2.8 G Master II": {
        "brand": "Sony",
        "frontDiameterMm": 77,
        "clampOn": true,
        "tStop": 2.8
      },
      "Minolta 28mm f/2.8": {
        "brand": "Minolta",
        "frontDiameterMm": 55,
        "clampOn": true,
        "tStop": 2.8
      },
      "Minolta 35mm f/1.4": {
        "brand": "Minolta",
        "frontDiameterMm": 72,
        "clampOn": true,
        "tStop": 1.4
      },
      "Minolta 50mm f/1.4": {
        "brand": "Minolta",
        "frontDiameterMm": 55,
        "clampOn": true,
        "tStop": 1.4
      },
      "Minolta 85mm f/1.8": {
        "brand": "Minolta",
        "frontDiameterMm": 55,
        "clampOn": true,
        "tStop": 1.8
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
    "ND",
    "Polarizer",
    "Diffusion",
    "Clear",
    "UV",
    "Infrared",
    "Graduated ND",
    "Soft FX",
    "Pro-Mist"
  ]
};

if (typeof registerDevice === 'function') {
  registerDevice('viewfinders', gear.viewfinders);
  registerDevice('directorMonitors', gear.directorMonitors);
  registerDevice('iosVideo', gear.iosVideo);
  registerDevice('wirelessReceivers', gear.wirelessReceivers);
  registerDevice('videoAssist', gear.videoAssist);
  registerDevice('media', gear.media);
  registerDevice('lenses', gear.lenses);
  registerDevice('accessories', gear.accessories);
  registerDevice('filterOptions', gear.filterOptions);
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = gear;
  }
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = gear;
} else {
  globalThis.devices = globalThis.devices || {};
  globalThis.devices.viewfinders = gear.viewfinders;
  globalThis.devices.directorMonitors = gear.directorMonitors;
  globalThis.devices.iosVideo = gear.iosVideo;
  globalThis.devices.wirelessReceivers = gear.wirelessReceivers;
  globalThis.devices.videoAssist = gear.videoAssist;
  globalThis.devices.media = gear.media;
  globalThis.devices.lenses = gear.lenses;
  globalThis.devices.accessories = Object.assign(globalThis.devices.accessories || {}, gear.accessories);
  globalThis.devices.filterOptions = gear.filterOptions;
}
