(function () {
  var monitorData = {
    "SmallHD Ultra 7": {
      "screenSizeInches": 7,
      "brightnessNits": 2300,
      "powerDrawWatts": 25,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": false,
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "12G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "12G-SDI"
      }]
    },
    "SmallHD Ultra 7 Bolt 6 TX": {
      "screenSizeInches": 7,
      "brightnessNits": 2300,
      "powerDrawWatts": 55,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": true,
      "latencyMs": "< 1ms",
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "12G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "12G-SDI"
      }]
    },
    "SmallHD Ultra 7 Bolt 6 RX": {
      "screenSizeInches": 7,
      "brightnessNits": 2300,
      "powerDrawWatts": 55,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": false,
      "wirelessRX": true,
      "latencyMs": "< 1ms",
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "12G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "12G-SDI"
      }]
    },
    "SmallHD Cine 7": {
      "screenSizeInches": 7,
      "brightnessNits": 1800,
      "powerDrawWatts": 30,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": false,
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "SmallHD Cine 7 Bolt 4K TX": {
      "screenSizeInches": 7,
      "brightnessNits": 1800,
      "powerDrawWatts": 50,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": true,
      "latencyMs": "< 1ms",
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "SmallHD Cine 7 Bolt 4K RX": {
      "screenSizeInches": 7,
      "brightnessNits": 1800,
      "powerDrawWatts": 50,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": false,
      "wirelessRX": true,
      "latencyMs": "< 1ms",
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "SmallHD Indie 7": {
      "screenSizeInches": 7,
      "brightnessNits": 1000,
      "powerDrawWatts": 17.3,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": false,
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "SmallHD Indie 7 Bolt 4K TX": {
      "screenSizeInches": 7,
      "brightnessNits": 1000,
      "powerDrawWatts": 37.3,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": true,
      "latencyMs": "< 1ms",
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "SmallHD Indie 7 Bolt 4K RX": {
      "screenSizeInches": 7,
      "brightnessNits": 1000,
      "powerDrawWatts": 37.3,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": false,
      "wirelessRX": true,
      "latencyMs": "< 1ms",
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "SmallHD Focus 7": {
      "screenSizeInches": 7,
      "brightnessNits": 1000,
      "powerDrawWatts": 9,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "videoInputs": [{
        "portType": "HDMI"
      }],
      "videoOutputs": []
    },
    "SmallHD Ultra 5": {
      "screenSizeInches": 5,
      "brightnessNits": 3000,
      "powerDrawWatts": 31.5,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": false,
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "SmallHD Ultra 5 Bolt 6 TX": {
      "screenSizeInches": 5,
      "brightnessNits": 3000,
      "powerDrawWatts": 50,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": true,
      "latencyMs": "< 1ms",
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "SmallHD Ultra 5 Bolt 6 RX": {
      "screenSizeInches": 5,
      "brightnessNits": 3000,
      "powerDrawWatts": 50,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": false,
      "wirelessRX": true,
      "latencyMs": "< 1ms",
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "SmallHD 1303 HDR": {
      "screenSizeInches": 13.3,
      "brightnessNits": 1500,
      "powerDrawWatts": 39,
      "power": {
        "input": {
          "voltageRange": "12-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": false,
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "SmallHD Cine 5": {
      "screenSizeInches": 5,
      "brightnessNits": 2000,
      "powerDrawWatts": 24,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": false,
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "SmallHD Cine 5 Bolt 6 TX": {
      "screenSizeInches": 5,
      "brightnessNits": 2000,
      "powerDrawWatts": 44,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": true,
      "latencyMs": "< 1ms",
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "SmallHD Cine 5 Bolt 6 RX": {
      "screenSizeInches": 5,
      "brightnessNits": 2000,
      "powerDrawWatts": 44,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": false,
      "wirelessRX": true,
      "latencyMs": "< 1ms",
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "SmallHD Indie 5": {
      "screenSizeInches": 5,
      "brightnessNits": 1000,
      "powerDrawWatts": 17.3,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": false,
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "SmallHD Focus 5": {
      "screenSizeInches": 5,
      "brightnessNits": 800,
      "powerDrawWatts": 8,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "videoInputs": [{
        "portType": "3G-SDI"
      }],
      "videoOutputs": []
    },
    "Hollyland Pyro 7 (RX/TX)": {
      "screenSizeInches": 7,
      "brightnessNits": 1200,
      "powerDrawWatts": 22,
      "power": {
        "input": {
          "voltageRange": "7-16",
          "portType": ["DC Barrel", "NP-F"]
        }
      },
      "wirelessTx": true,
      "wirelessRX": true,
      "latencyMs": "50ms",
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "Hollyland Pyro 5 (RX/TX)": {
      "screenSizeInches": 5,
      "brightnessNits": 1500,
      "powerDrawWatts": 16.5,
      "power": {
        "input": {
          "voltageRange": "7-16",
          "portType": "DC Barrel"
        }
      },
      "wirelessTx": true,
      "wirelessRX": true,
      "latencyMs": "50ms",
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }]
    },
    "Hollyland Mars M1 Enhanced (RX/TX)": {
      "screenSizeInches": 5.5,
      "brightnessNits": 1000,
      "powerDrawWatts": 16,
      "power": {
        "input": {
          "voltageRange": "7-16",
          "portType": ["DC Barrel", "NP-F"]
        }
      },
      "wirelessTx": true,
      "wirelessRX": true,
      "latencyMs": "< 80ms",
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }]
    },
    "Portkeys BM5 III": {
      "screenSizeInches": 5.5,
      "brightnessNits": 2200,
      "powerDrawWatts": 16,
      "power": {
        "input": {
          "voltageRange": "7-24",
          "portType": ["4-pin Aviation", "NP-F"]
        }
      },
      "wirelessTx": false,
      "bluetooth": {
        "portType": "Camera Control"
      },
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "Portkeys LH5H": {
      "screenSizeInches": 5.2,
      "brightnessNits": 1700,
      "powerDrawWatts": 12,
      "power": {
        "input": {
          "voltageRange": "7-24",
          "portType": ["4-pin Aviation", "NP-F"]
        }
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "wireless": {
        "portType": "Bluetooth Camera Control"
      },
      "videoInputs": [{
        "portType": "HDMI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }]
    },
    "Portkeys BM7 II DS": {
      "screenSizeInches": 7,
      "brightnessNits": 2200,
      "powerDrawWatts": 15,
      "power": {
        "input": {
          "voltageRange": "7-24",
          "portType": ["4-pin Aviation", "NP-F"]
        }
      },
      "wirelessTx": false,
      "wireless": {
        "portType": "Camera Control"
      },
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "Portkeys PT5 II": {
      "screenSizeInches": 5,
      "brightnessNits": 500,
      "powerDrawWatts": 7,
      "power": {
        "input": {
          "voltageRange": "7-24",
          "portType": ["4-pin Aviation", "NP-F"]
        }
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "videoInputs": [{
        "portType": "HDMI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }]
    },
    "Atomos Ninja V": {
      "screenSizeInches": 5,
      "brightnessNits": 1000,
      "powerDrawWatts": 22,
      "power": {
        "input": {
          "voltageRange": "6-16",
          "portType": ["DC Barrel", "NP-F"]
        }
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "audioIo": {
        "portType": "10-pin LEMO (analog audio)"
      },
      "videoInputs": [{
        "portType": "HDMI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }]
    },
    "Atomos Ninja V+": {
      "screenSizeInches": 5,
      "brightnessNits": 1000,
      "powerDrawWatts": 22,
      "power": {
        "input": {
          "voltageRange": "6-16",
          "portType": ["DC Barrel", "NP-F"]
        }
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone"
      },
      "audioInput": {
        "portType": "3.5mm Mic/Line"
      },
      "videoInputs": [{
        "portType": "HDMI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }]
    },
    "Atomos Shinobi 5": {
      "screenSizeInches": 5.2,
      "brightnessNits": 1000,
      "powerDrawWatts": 7,
      "power": {
        "input": {
          "voltageRange": "6-16",
          "portType": ["DC Barrel", "NP-F"]
        }
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": []
    },
    "Atomos Shinobi 7": {
      "screenSizeInches": 7,
      "brightnessNits": 2200,
      "powerDrawWatts": 7,
      "power": {
        "input": {
          "voltageRange": "6-16",
          "portType": ["DC Barrel", "NP-F"]
        }
      },
      "wirelessTx": false,
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "Atomos Shogun 7": {
      "screenSizeInches": 7,
      "brightnessNits": 1500,
      "powerDrawWatts": 33,
      "power": {
        "input": {
          "voltageRange": "6-16",
          "portType": ["DC Barrel", "NP-F"]
        }
      },
      "wirelessTx": false,
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "12G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "12G-SDI"
      }],
      "weight_g": 738
    },
    "Feelworld FW568": {
      "screenSizeInches": 6,
      "brightnessNits": 450,
      "powerDrawWatts": 11,
      "power": {
        "input": {
          "voltageRange": "7-18",
          "portType": "NP-F"
        }
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "Feelworld F6 Plus": {
      "screenSizeInches": 6,
      "brightnessNits": 450,
      "powerDrawWatts": 9,
      "power": {
        "input": {
          "voltageRange": "7-18",
          "portType": "NP-F"
        }
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone"
      },
      "videoInputs": [{
        "portType": "HDMI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }]
    },
    "Andycine A6 Pro": {
      "screenSizeInches": 5.5,
      "brightnessNits": 500,
      "powerDrawWatts": 9,
      "power": {
        "input": {
          "voltageRange": "7-18",
          "portType": "NP-F"
        }
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone"
      },
      "videoInputs": [{
        "portType": "HDMI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }]
    },
    "Lilliput A7S": {
      "screenSizeInches": 7,
      "brightnessNits": 500,
      "powerDrawWatts": 12,
      "power": {
        "input": {
          "voltageRange": "7-18",
          "portType": "NP-F"
        }
      },
      "wirelessTx": false,
      "audioOutput": {
        "portType": "3.5mm Headphone Jack"
      },
      "videoInputs": [{
        "portType": "HDMI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }]
    },
    "TVLogic F-5A 5\" Onboard": {
      "screenSizeInches": 5,
      "brightnessNits": 500,
      "powerDrawWatts": 12,
      "power": {
        "input": {
          "voltageRange": "12",
          "portType": "Mini XLR 3-pin"
        }
      },
      "wirelessTx": false,
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "3G-SDI"
      }]
    },
    "TVLogic VFM-058W": {
      "screenSizeInches": 5.5,
      "brightnessNits": 450,
      "powerDrawWatts": 9,
      "power": {
        "input": {
          "voltageRange": "6.8-12",
          "portType": ["DC Barrel", "D-Tap"]
        }
      },
      "wirelessTx": false,
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }]
    },
    "SmallHD 703 UltraBright": {
      "screenSizeInches": 7,
      "brightnessNits": 2200,
      "powerDrawWatts": 13,
      "power": {
        "input": {
          "voltageRange": "10-34",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": false,
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "3G-SDI"
      }]
    },
    "TV Logic F7HS": {
      "screenSizeInches": 7,
      "brightnessNits": 1800,
      "powerDrawWatts": 24,
      "power": {
        "input": {
          "voltageRange": "12-24",
          "portType": "Mini XLR 3-pin"
        }
      },
      "wirelessTx": false,
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "3G-SDI"
      }]
    },
    "TVLogic F-7H mkII": {
      "screenSizeInches": 7,
      "brightnessNits": 3600,
      "powerDrawWatts": 34,
      "power": {
        "input": {
          "voltageRange": "6-17",
          "portType": "LEMO 2-pin"
        }
      },
      "wirelessTx": false,
      "videoInputs": [{
        "portType": "HDMI"
      }, {
        "portType": "3G-SDI"
      }],
      "videoOutputs": [{
        "portType": "3G-SDI"
      }]
    },
    "None": {
      "powerDrawWatts": 0,
      "power": {
        "input": {
          "voltageRange": null,
          "portType": "N/A",
          "notes": "Placeholder entry representing no dedicated monitor"
        }
      },
      "wirelessTx": false,
      "videoInputs": [],
      "videoOutputs": []
    }
  };
  if (typeof registerDevice === 'function') {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = registerDevice('monitors', monitorData);
    } else {
      registerDevice('monitors', monitorData);
    }
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = monitorData;
  } else {
    globalThis.devices = globalThis.devices || {};
    globalThis.devices.monitors = monitorData;
  }
})();