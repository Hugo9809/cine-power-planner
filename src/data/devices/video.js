/* global registerDevice */
(() => {
const videoData = {
  "Teradek Bolt 6 LT TX": {
    "powerDrawWatts": 20,
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
        "notes": "6-28V",
        "type": [
          "LEMO 2-pin"
        ]
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
          "notes": "6-28V",
          "type": [
            "LEMO 2-pin"
          ]
        },
        {
          "type": [
            "Gold-Mount"
          ]
        },
        {
          "type": [
            "V-Mount"
          ]
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
          "notes": "6-28V",
          "type": [
            "LEMO 2-pin"
          ]
        },
        {
          "type": [
            "Gold-Mount"
          ]
        },
        {
          "type": [
            "V-Mount"
          ]
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
        "notes": "6-28V",
        "type": [
          "LEMO 2-pin"
        ]
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
          "notes": "6-28V",
          "type": [
            "LEMO 2-pin"
          ]
        },
        {
          "type": [
            "Gold-Mount"
          ]
        },
        {
          "type": [
            "V-Mount"
          ]
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
        "notes": "6-28V",
        "type": [
          "LEMO 2-pin"
        ]
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
        "notes": "6-28V",
        "type": [
          "LEMO 2-pin"
        ]
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
        "notes": "6-28V",
        "type": [
          "LEMO 2-pin"
        ]
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
        "notes": "6-28V",
        "type": [
          "LEMO 2-pin"
        ]
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
        "notes": "6-28V",
        "type": [
          "LEMO 2-pin"
        ]
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
        "notes": "6-28V",
        "type": [
          "LEMO 2-pin"
        ]
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
        "notes": "6-28V",
        "type": [
          "LEMO 2-pin"
        ]
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
        "notes": "6-28V",
        "type": [
          "LEMO 2-pin"
        ]
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
          "notes": "5V-12V",
          "type": [
            "USB-C"
          ]
        },
        {
          "type": [
            "NP-F"
          ]
        },
        {
          "notes": "6-16V",
          "type": [
            "DC Barrel"
          ]
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
          "notes": "5-12V",
          "type": [
            "USB-C"
          ]
        },
        {
          "type": [
            "NP-F"
          ]
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
          "notes": "5-12V",
          "type": [
            "USB-C"
          ]
        },
        {
          "type": [
            "NP-F"
          ]
        },
        {
          "notes": "6-16V",
          "type": [
            "DC Barrel"
          ]
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
          "notes": "6-18V",
          "type": [
            "DC-"
          ]
        },
        {
          "type": [
            "NP-F"
          ]
        },
        {
          "type": [
            "WB37"
          ]
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
        "notes": "6-18V",
        "type": [
          "LEMO 2-pin"
        ]
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
        "notes": "6-18V",
        "type": [
          "LEMO 2-pin"
        ]
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
        "notes": "6-18V",
        "type": [
          "LEMO 2-pin"
        ]
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
        "notes": "6-18V",
        "type": [
          "LEMO 2-pin"
        ]
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
          "notes": "5V",
          "type": [
            "USB-C"
          ]
        },
        {
          "type": [
            "NP-F battery"
          ]
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
          "notes": "5V",
          "type": [
            "USB-C"
          ]
        },
        {
          "type": [
            "NP-F battery"
          ]
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
          "notes": "5V",
          "type": [
            "USB-C"
          ]
        },
        {
          "type": [
            "NP-F battery"
          ]
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
          "notes": "5V",
          "type": [
            "USB-C"
          ]
        },
        {
          "type": [
            "NP-F battery"
          ]
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
          "notes": "5V",
          "type": [
            "USB-C"
          ]
        },
        {
          "type": [
            "NP-F battery"
          ]
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
          "notes": "5V",
          "type": [
            "USB-C"
          ]
        },
        {
          "type": [
            "NP-F battery"
          ]
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
          "notes": "7.4-16.8V",
          "type": [
            "LEMO 2-pin"
          ]
        },
        {
          "type": [
            "NP-F battery"
          ]
        }
      ]
    }
  },
  "ARRI WVT-1 TX": {
    "powerDrawWatts": 7,
    "videoInputs": [
      {
        "type": "3G-SDI"
      }
    ],
    "videoOutputs": [
      {
        "type": "3G-SDI",
        "notes": "loop"
      }
    ],
    "frequency": "5 GHz",
    "latencyMs": "< 1ms",
    "power": {
      "input": {
        "notes": "10.5-34V",
        "type": [
          "LEMO 2-pin"
        ]
      }
    }
  },
  "None": {
    "powerDrawWatts": 0,
    "power": {
      "input": {
        "voltageRange": "",
        "type": []
      }
    },
    "videoInputs": [],
    "videoOutputs": [],
    "frequency": "5 GHz",
    "latencyMs": null
  }
};

if (typeof registerDevice === 'function') {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = registerDevice('video', videoData);
  } else {
    registerDevice('video', videoData);
  }
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = videoData;
} else {
  globalThis.devices = globalThis.devices || {};
  globalThis.devices.video = videoData;
}
})();
