/* global registerDevice */
(() => {
const wirelessReceiversData = {
  "Teradek Bolt 6 XT RX": {
    "powerDrawWatts": 18,
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
      "input": {
        "type": "LEMO 2-pin",
        "voltageRange": "6-28",
        "notes": "Regulated DC input"
      },
      "batteryPlateSupport": [
        {
          "type": "Gold-Mount",
          "mount": "optional"
        },
        {
          "type": "V-Mount",
          "mount": "optional"
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
      "input": {
        "type": "LEMO 2-pin",
        "voltageRange": "6-28",
        "notes": "Regulated DC input"
      },
      "batteryPlateSupport": [
        {
          "type": "Gold-Mount",
          "mount": "optional"
        },
        {
          "type": "V-Mount",
          "mount": "optional"
        }
      ]
    }
  },
  "Teradek Bolt 4K LT 750 RX": {
    "powerDrawWatts": 10,
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
      "input": {
        "type": "LEMO 2-pin",
        "voltageRange": "6-28",
        "notes": "Regulated DC input"
      },
      "batteryPlateSupport": [
        {
          "type": "Gold-Mount",
          "mount": "optional"
        },
        {
          "type": "V-Mount",
          "mount": "optional"
        }
      ]
    }
  },
  "Vaxis Storm 3000 RX": {
    "powerDrawWatts": 9,
    "videoInputs": [],
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
        "voltageRange": "7-17",
        "notes": "Regulated DC input"
      },
      "batteryPlateSupport": [
        {
          "type": "Gold-Mount",
          "mount": "optional"
        },
        {
          "type": "V-Mount",
          "mount": "optional"
        }
      ]
    }
  },
  "None": {
    "powerDrawWatts": 0,
    "power": {
      "input": {
        "voltageRange": null,
        "type": "N/A",
        "notes": "Placeholder entry representing no wireless receiver"
      }
    },
    "videoInputs": [],
    "videoOutputs": [],
    "frequency": "5 GHz",
    "latencyMs": null
  },
  "Teradek Bolt 6 LT RX": {
    "powerDrawWatts": 18,
    "videoInputs": [],
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
        "voltageRange": "6-28",
        "notes": "Regulated DC input"
      }
    }
  },
  "Teradek Bolt 6 MAX RX": {
    "powerDrawWatts": 20,
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
      "input": {
        "type": "LEMO 2-pin",
        "voltageRange": "6-28",
        "notes": "Regulated DC input"
      },
      "batteryPlateSupport": [
        {
          "type": "Gold-Mount",
          "mount": "optional"
        },
        {
          "type": "V-Mount",
          "mount": "optional"
        }
      ]
    }
  },
  "Teradek Bolt 4K LT RX": {
    "powerDrawWatts": 9,
    "videoInputs": [],
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
        "voltageRange": "6-28",
        "notes": "Regulated DC input"
      }
    }
  },
  "Teradek Bolt 4K XT RX": {
    "powerDrawWatts": 20,
    "videoInputs": [],
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
      "input": {
        "type": "LEMO 2-pin",
        "voltageRange": "6-28",
        "notes": "Regulated DC input"
      },
      "batteryPlateSupport": [
        {
          "type": "Gold-Mount",
          "mount": "optional"
        },
        {
          "type": "V-Mount",
          "mount": "optional"
        }
      ]
    }
  },
  "Teradek Bolt Pro 300 RX": {
    "powerDrawWatts": 6.5,
    "videoInputs": [],
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
        "voltageRange": "6-28",
        "notes": "Regulated DC input"
      }
    }
  },
  "Teradek Bolt Pro 600 RX": {
    "powerDrawWatts": 8,
    "videoInputs": [],
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
        "voltageRange": "6-28",
        "notes": "Regulated DC input"
      }
    }
  },
  "Teradek Bolt Pro 2000 RX": {
    "powerDrawWatts": 7.7,
    "videoInputs": [],
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
        "voltageRange": "6-28",
        "notes": "Regulated DC input"
      }
    }
  },
  "Teradek Bolt Pro 500 RX": {
    "powerDrawWatts": 7.3,
    "videoInputs": [],
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
        "voltageRange": "6-28",
        "notes": "Regulated DC input"
      }
    }
  },
  "Teradek Bolt Pro 750 RX": {
    "powerDrawWatts": 7.5,
    "videoInputs": [],
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
        "voltageRange": "6-28",
        "notes": "Regulated DC input"
      }
    }
  },
  "Teradek Bolt Pro 1000 RX": {
    "powerDrawWatts": 7.5,
    "videoInputs": [],
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
        "voltageRange": "6-28",
        "notes": "Regulated DC input"
      }
    }
  },
  "Teradek Bolt 3000 RX": {
    "powerDrawWatts": 7.5,
    "videoInputs": [],
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
        "voltageRange": "6-28",
        "notes": "Regulated DC input"
      }
    }
  },
  "Teradek Bolt 10000 RX": {
    "powerDrawWatts": 7.5,
    "videoInputs": [],
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
        "voltageRange": "6-28",
        "notes": "Regulated DC input"
      }
    }
  },
  "Hollyland Pyro S RX": {
    "powerDrawWatts": 11,
    "videoInputs": [],
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
      "input": {
        "type": "DC Barrel",
        "voltageRange": "6-16",
        "notes": "Locking coaxial DC input"
      },
      "alternateInputs": [
        {
          "type": "USB-C",
          "voltageRange": "5-12",
          "notes": "USB-C PD"
        }
      ],
      "batteryPlateSupport": [
        {
          "type": "NP-F",
          "mount": "integrated"
        }
      ]
    }
  },
  "Hollyland Mars 300 Pro RX": {
    "powerDrawWatts": 11,
    "videoInputs": [],
    "videoOutputs": [
      {
        "type": "HDMI"
      }
    ],
    "frequency": "5 GHz",
    "latencyMs": "< 80ms",
    "power": {
      "input": {
        "type": "DC Barrel",
        "voltageRange": "6-16",
        "notes": "Locking coaxial DC input"
      },
      "alternateInputs": [
        {
          "type": "USB-C",
          "voltageRange": "5-12",
          "notes": "USB-C PD"
        }
      ],
      "batteryPlateSupport": [
        {
          "type": "NP-F",
          "mount": "integrated"
        }
      ]
    }
  },
  "Hollyland Mars 400S Pro RX": {
    "powerDrawWatts": 11,
    "videoInputs": [],
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
      "input": {
        "type": "DC Barrel",
        "voltageRange": "6-16",
        "notes": "Locking coaxial DC input"
      },
      "alternateInputs": [
        {
          "type": "USB-C",
          "voltageRange": "5-12",
          "notes": "USB-C PD"
        }
      ],
      "batteryPlateSupport": [
        {
          "type": "NP-F",
          "mount": "integrated"
        }
      ]
    }
  },
  "DJI Transmission (RX)": {
    "powerDrawWatts": 11,
    "videoInputs": [],
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
      "input": {
        "type": "DC Barrel",
        "voltageRange": "6-18",
        "notes": "Coaxial power input"
      },
      "batteryPlateSupport": [
        {
          "type": "NP-F",
          "mount": "integrated"
        },
        {
          "type": "DJI WB37",
          "mount": "integrated"
        }
      ]
    }
  },
  "Vaxis Storm 800 RX": {
    "powerDrawWatts": 6,
    "videoInputs": [],
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
        "voltageRange": "6-18",
        "notes": "Regulated DC input"
      }
    }
  },
  "Vaxis Storm 1000 RX": {
    "powerDrawWatts": 6.5,
    "videoInputs": [],
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
        "voltageRange": "6-18",
        "notes": "Regulated DC input"
      }
    }
  },
  "Dwarf Connection LR1 RX": {
    "powerDrawWatts": 6,
    "videoInputs": [],
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
        "voltageRange": "6-18",
        "notes": "Regulated DC input"
      }
    }
  },
  "Accsoon CineEye 2S Pro RX": {
    "powerDrawWatts": 4.5,
    "videoInputs": [],
    "videoOutputs": [
      {
        "type": "HDMI"
      }
    ],
    "frequency": "2.4 GHz / 5 GHz (Dual-Band Wi-Fi)",
    "latencyMs": "< 60ms",
    "power": {
      "input": {
        "type": "USB-C",
        "voltageRange": "5",
        "notes": "USB-C PD"
      },
      "batteryPlateSupport": [
        {
          "type": "NP-F",
          "mount": "integrated"
        }
      ]
    }
  },
  "Accsoon CineEye II RX": {
    "powerDrawWatts": 3.5,
    "videoInputs": [],
    "videoOutputs": [
      {
        "type": "HDMI"
      }
    ],
    "frequency": "2.4 GHz / 5 GHz (Dual-Band Wi-Fi)",
    "latencyMs": "< 60ms",
    "power": {
      "input": {
        "type": "USB-C",
        "voltageRange": "5",
        "notes": "USB-C PD"
      },
      "batteryPlateSupport": [
        {
          "type": "NP-F",
          "mount": "integrated"
        }
      ]
    }
  },
  "Accsoon CineView HE RX": {
    "powerDrawWatts": 4.5,
    "videoInputs": [],
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
      "input": {
        "type": "USB-C",
        "voltageRange": "5",
        "notes": "USB-C PD"
      },
      "batteryPlateSupport": [
        {
          "type": "NP-F",
          "mount": "integrated"
        }
      ]
    }
  },
  "Accsoon CineView SE RX": {
    "powerDrawWatts": 4.5,
    "videoInputs": [],
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
      "input": {
        "type": "USB-C",
        "voltageRange": "5",
        "notes": "USB-C PD"
      },
      "batteryPlateSupport": [
        {
          "type": "NP-F",
          "mount": "integrated"
        }
      ]
    }
  },
  "Accsoon CineView Nano RX": {
    "powerDrawWatts": 2.5,
    "videoInputs": [],
    "videoOutputs": [
      {
        "type": "HDMI"
      }
    ],
    "frequency": "2.4 GHz / 5 GHz (Dual-Band Wi-Fi)",
    "latencyMs": "< 60ms",
    "power": {
      "input": {
        "type": "USB-C",
        "voltageRange": "5",
        "notes": "USB-C PD"
      },
      "batteryPlateSupport": [
        {
          "type": "NP-F",
          "mount": "integrated"
        }
      ]
    }
  },
  "Accsoon CineView Quad RX": {
    "powerDrawWatts": 4.5,
    "videoInputs": [],
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
      "input": {
        "type": "USB-C",
        "voltageRange": "5",
        "notes": "USB-C PD"
      },
      "batteryPlateSupport": [
        {
          "type": "NP-F",
          "mount": "integrated"
        }
      ]
    }
  },
  "ARRI WVR-1 RX": {
    "powerDrawWatts": 7,
    "videoInputs": [],
    "videoOutputs": [
      {
        "type": "3G-SDI"
      },
      {
        "type": "3G-SDI"
      }
    ],
    "frequency": "5 GHz",
    "latencyMs": "< 1ms",
    "power": {
      "input": {
        "type": "LEMO 2-pin",
        "voltageRange": "10.5-34",
        "notes": "Regulated DC input"
      },
      "output": {
        "type": "LEMO 2-pin",
        "voltageRange": "12",
        "notes": "Max 2.0A accessory feed"
      }
    }
  },
  "ARRI WVR-1s RX": {
    "powerDrawWatts": 7,
    "videoInputs": [],
    "videoOutputs": [
      {
        "type": "3G-SDI"
      }
    ],
    "frequency": "5 GHz",
    "latencyMs": "< 1ms",
    "power": {
      "input": {
        "type": "LEMO 2-pin",
        "voltageRange": "10.5-34",
        "notes": "Regulated DC input"
      },
      "output": {
        "type": "LEMO 2-pin",
        "voltageRange": "12",
        "notes": "Max 2.0A accessory feed"
      }
    }
  }
};

if (typeof registerDevice === 'function') {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = registerDevice('wirelessReceivers', wirelessReceiversData);
  } else {
    registerDevice('wirelessReceivers', wirelessReceiversData);
  }
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = wirelessReceiversData;
} else {
  globalThis.devices = globalThis.devices || {};
  globalThis.devices.wirelessReceivers = wirelessReceiversData;
}
})();
