/* global registerDevice */
(() => {
const fizData = {
  "motors": {
    "None": {
      "powerDrawWatts": 0,
      "fizConnectors": [],
      "internalController": false,
      "torqueNm": null,
      "gearTypes": [
        "0.8 mod"
      ]
    },
    "Tilta Nucleus M": {
      "powerDrawWatts": 20,
      "internalController": true,
      "torqueNm": 2.5,
      "gearTypes": [
        "0.8 mod",
        "0.4 mod",
        "0.5 mod",
        "0.6 mod",
        "0.8 mod 29mm wide"
      ],
      "notes": "Rated 2.5 N·m at 14.8V. Can be daisy-chained for power and control. Uses a proprietary 7-pin LEMO cable to the camera’s FIZ port rather than ARRI LBUS. Supports a 29mm thick 0.8 mod gear for lenses with telescoping focus gears. Compatible with standard 0.8 mod lens gears of various diameters.",
      "fizConnectors": [
        {
          "type": "LEMO 7-pin"
        }
      ]
    },
    "Tilta Nucleus M II": {
      "powerDrawWatts": 50,
      "internalController": true,
      "torqueNm": null,
      "gearTypes": [
        "0.8 mod",
        "0.4 mod",
        "0.5 mod",
        "0.6 mod"
      ],
      "notes": "Higher torque than Nucleus M, designed for improved performance. Uses the same 7-pin LEMO connection to the camera FIZ port (not LBUS). The 50W rating is likely a max stall power. Compatible with standard 0.8 mod lens gears of various diameters.",
      "fizConnectors": [
        {
          "type": "LEMO 7-pin"
        }
      ]
    },
    "Tilta Nucleus Nano (Original)": {
      "powerDrawWatts": 5,
      "internalController": true,
      "torqueNm": 1,
      "gearTypes": [
        "0.8 mod"
      ],
      "notes": "Compact motor for lighter lenses. Torque rated at 0.65 N·m at 5.5V and 1 N·m at 14.8V. Compatible with standard 0.8 mod lens gears of various diameters.",
      "fizConnectors": [
        {
          "type": "Micro-USB"
        }
      ]
    },
    "Tilta Nucleus Nano II": {
      "powerDrawWatts": 37,
      "internalController": true,
      "torqueNm": null,
      "gearTypes": [
        "0.8 mod"
      ],
      "notes": "Enhanced version of the Nano. Power draw calculated at 2.5A max at 14.8V. USB-C for power and data. Ships with Tilta's fixed 0.8 mod gear ring and does not support swapping to other gear rings.",
      "fizConnectors": [
        {
          "type": "USB-C"
        }
      ]
    },
    "Arri Cforce Mini": {
      "powerDrawWatts": 20,
      "internalController": false,
      "torqueNm": 0.5,
      "weight_g": 192,
      "gearTypes": [
        "0.8 mod",
        "0.4 mod",
        "0.5 mod",
        "0.6 mod",
        "0.8 mod 25mm wide",
        "0.8 mod large diameter (e.g., 80T)"
      ],
      "notes": "Constant 0.3 Nm, maximum peak torque 0.5 Nm. Requires a motor controller such as RIA-1, Master Grips or a camera with built-in controller (ALEXA Mini/Mini LF/Alexa 35) or a cforce mini RF motor. Connects via ARRI LBUS. Supports a 0.8 mod gear with 25mm width and large diameter 0.8 mod gears up to 80 teeth.",
      "fizConnectors": [
        {
          "type": "LBUS (LEMO 4-pin)"
        }
      ]
    },
    "Arri Cforce Plus": {
      "powerDrawWatts": 32,
      "internalController": false,
      "torqueNm": 0.7,
      "weight_g": 325,
      "gearTypes": [
        "0.8 mod",
        "0.4 mod",
        "0.5 mod",
        "0.6 mod",
        "0.8 mod 25mm wide",
        "0.8 mod large diameter (e.g., 80T)"
      ],
      "notes": "Constant 0.7 Nm, maximum peak torque 1.0 Nm. Requires a motor controller such as RIA-1, Master Grips or a camera with built-in controller (ALEXA Mini/Mini LF/Alexa 35) or a cforce mini RF motor. Connects via ARRI LBUS. Supports a 0.8 mod gear with 25mm width and large diameter 0.8 mod gears up to 80 teeth.",
      "fizConnectors": [
        {
          "type": "LBUS (LEMO 4-pin)"
        }
      ]
    },
    "Arri CLM-3": {
      "powerDrawWatts": 12,
      "internalController": false,
      "torqueNm": 0.5,
      "gearTypes": [
        "0.8 mod",
        "0.6 mod",
        "0.5 mod"
      ],
      "notes": "Classic digital lens motor for ARRI LCS. Requires a UMC-4 (or earlier UMC-3) for control. Uses a 7-pin LEMO cable to connect to ARRI FIZ controllers.",
      "fizConnectors": [
        {
          "type": "LEMO 7-pin"
        }
      ]
    },
    "Arri CLM-4 (K2.72114.0)": {
      "powerDrawWatts": 12,
      "internalController": false,
      "torqueNm": 0.5,
      "gearTypes": [
        "0.8 mod",
        "0.6 mod",
        "0.5 mod"
      ],
      "notes": "Standard digital lens motor for ARRI LCS. Requires a UMC-4 for control. The UMC-4 works only with the CLM-4 and CLM-5. Part no. K2.72114.0.",
      "fizConnectors": [
        {
          "type": "LEMO 7-pin"
        }
      ]
    },
    "Arri CLM-5 (K2.0006361)": {
      "powerDrawWatts": 15,
      "internalController": false,
      "torqueNm": 0.5,
      "weight_g": 205,
      "gearTypes": [
        "0.8 mod",
        "0.6 mod",
        "0.5 mod"
      ],
      "notes": "High-torque lens motor for ARRI LCS. Requires a UMC-4 for control. The UMC-4 works only with the CLM-4 and CLM-5. Part no. K2.0006361.",
      "fizConnectors": [
        {
          "type": "LEMO 7-pin"
        }
      ]
    },
    "Arri cforce mini RF (KK.0040345)": {
      "powerDrawWatts": 20,
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
      "notes": "Lens motor with integrated RF receiver and controller. Provides one LBUS port and one CAM port similar to the RIA-1, allowing daisy-chaining of additional motors. When paired with ALEXA Mini/Mini LF/Alexa 35 it is typically powered via a CAM-to-LBUS connection; otherwise use a Cam to D-Tap cable for power.",
      "fizConnectors": [
        {
          "type": "LBUS (LEMO 4-pin), CAM (LEMO 7-pin)"
        }
      ]
    },
    "Teradek RT Motion FIZ (MOTR.S)": {
      "powerDrawWatts": 24,
      "internalController": false,
      "torqueNm": 0.95,
      "gearTypes": [
        "0.8 mod",
        "0.4 mod",
        "0.5 mod",
        "0.6 mod",
        "0.8 mod 12mm wide"
      ],
      "notes": "Max peak torque of 0.95 Nm. Requires a Teradek MDR for control. Max operating current 2A at up to 12V. Teradek offers a 12mm wide 0.8 mod gear. Compatible with standard 0.8 mod lens gears of various diameters.",
      "fizConnectors": [
        {
          "type": "LEMO 4-pin"
        }
      ]
    },
    "Preston DM1X": {
      "powerDrawWatts": 32.4,
      "internalController": false,
      "torqueNm": null,
      "weight_g": 465,
      "gearTypes": [
        "0.8 mod",
        "0.5 mod",
        "0.6 mod"
      ],
      "notes": "Very high torque, often used for focus. Max current 2.7A, typically 12V system. No internal controller. Compatible with standard 0.8 mod lens gears of various diameters, including large ones.",
      "fizConnectors": [
        {
          "type": "LEMO 4-pin"
        }
      ]
    },
    "Preston DM2": {
      "powerDrawWatts": 22.2,
      "internalController": false,
      "torqueNm": null,
      "gearTypes": [
        "0.8 mod",
        "0.5 mod",
        "0.6 mod"
      ],
      "notes": "High torque, general purpose motor. Max current 2.7A, typically 12V system. No internal controller. Compatible with standard 0.8 mod lens gears of various diameters, including large ones.",
      "fizConnectors": [
        {
          "type": "LEMO 4-pin"
        }
      ]
    },
    "Preston DM2X": {
      "powerDrawWatts": 22.2,
      "internalController": false,
      "torqueNm": null,
      "gearTypes": [
        "0.8 mod",
        "0.5 mod",
        "0.6 mod"
      ],
      "notes": "Improved DM2 with higher torque capabilities and durability in the same physical size. Max current 2.7A, typically 12V system. No internal controller. Compatible with standard 0.8 mod lens gears of various diameters, including large ones.",
      "fizConnectors": [
        {
          "type": "LEMO 4-pin"
        }
      ]
    },
    "Preston DM-A": {
      "powerDrawWatts": 18,
      "internalController": false,
      "torqueNm": null,
      "gearTypes": [
        "0.8 mod"
      ],
      "notes": "Compact motor for iris/zoom or lighter focus. No internal controller. Peak power draw from source. Compatible with standard 0.8 mod lens gears of various diameters.",
      "fizConnectors": [
        {
          "type": "LEMO 4-pin"
        }
      ]
    },
    "Preston DM-C": {
      "powerDrawWatts": 18,
      "internalController": false,
      "torqueNm": null,
      "gearTypes": [
        "0.8 mod"
      ],
      "notes": "Designed for compact and lighter setups. No internal controller. Peak power draw from source. Compatible with standard 0.8 mod lens gears of various diameters.",
      "fizConnectors": [
        {
          "type": "LEMO 4-pin"
        }
      ]
    },
    "Chrosziel CDM-100 Digital": {
      "powerDrawWatts": 12,
      "internalController": false,
      "torqueNm": 0.5,
      "gearTypes": [
        "0.8 mod",
        "0.4 mod",
        "0.5 mod",
        "0.6 mod",
        "0.8 mod 16mm wide"
      ],
      "notes": "Max torque 0.5 Nm. Max 24V input. Power draw adjusted to typical max. No internal controller. Also supports 0.8 mod with 16mm width. Compatible with standard 0.8 mod lens gears of various diameters.",
      "fizConnectors": [
        {
          "type": "LEMO 7-pin"
        }
      ]
    },
    "Chrosziel CDM-M (Universal Zoom Servo Drive)": {
      "powerDrawWatts": 4.2,
      "internalController": false,
      "torqueNm": 0.5,
      "gearTypes": [
        "0.8 mod",
        "0.4 mod",
        "0.5 mod",
        "0.6 mod"
      ],
      "notes": "Designed primarily as a zoom servo. Torque 0.5 Nm. Max consumption approx. 350mAh at 12V. No internal controller. Compatible with standard 0.8 mod lens gears of various diameters.",
      "fizConnectors": [
        {
          "type": "LEMO 5-pin"
        }
      ]
    },
    "DJI Focus (Original)": {
      "powerDrawWatts": 21.6,
      "internalController": true,
      "torqueNm": 0.35,
      "gearTypes": [
        "0.8 mod",
        "0.5 mod",
        "0.6 mod"
      ],
      "notes": "Max torque 0.35 Nm. Max speed 192 rpm. Power draw estimated at 1.5A from 14.4V. Designed to work with standard 0.8 mod lens gears, including those with larger diameters for longer focus throws.",
      "fizConnectors": [
        {
          "type": "USB-C"
        }
      ]
    },
    "DJI RS Focus (2022)": {
      "powerDrawWatts": 22.5,
      "internalController": true,
      "torqueNm": 1,
      "gearTypes": [
        "0.8 mod",
        "0.5 mod",
        "0.6 mod"
      ],
      "notes": "Max torque 1.0 Nm at 8V. Stall current 2.8A at 8V. Quick-release structure. Designed to work with standard 0.8 mod lens gears, including those with larger diameters for longer focus throws.",
      "fizConnectors": [
        {
          "type": "USB-C"
        }
      ]
    },
    "DJI Focus Pro Motor": {
      "powerDrawWatts": 24,
      "internalController": true,
      "torqueNm": 1.2,
      "gearTypes": [
        "0.8 mod"
      ],
      "notes": "Motor for the DJI Focus Pro system. Used with the Focus Pro Handle and DJI LiDAR Range Finder.",
      "fizConnectors": [
        {
          "type": "USB-C"
        }
      ]
    },
    "Cmotion cPRO": {
      "powerDrawWatts": 24,
      "internalController": true,
      "torqueNm": 1.2,
      "gearTypes": [
        "0.8 mod",
        "0.4 mod",
        "0.5 mod",
        "0.6 mod"
      ],
      "notes": "Compact and lightweight with integrated RF module and camera interface. Rated 1.2 Nm. Max speed 240 teeth/sec. Compatible with standard 0.8 mod lens gears of various diameters.",
      "fizConnectors": [
        {
          "type": "LEMO 4-pin"
        }
      ]
    },
    "SmallRig Wireless Follow Focus": {
      "powerDrawWatts": 12,
      "internalController": true,
      "torqueNm": 0.43,
      "gearTypes": [
        "0.8 mod"
      ],
      "notes": "Peak torque of 4.3 kgf·cm (approx. 0.43 Nm). Supports PD and QC fast charging. Has built-in battery. Compatible with standard 0.8 mod lens gears of various diameters.",
      "fizConnectors": [
        {
          "type": "USB-C"
        }
      ]
    },
    "Redrock MicroRemote Torque": {
      "powerDrawWatts": 60,
      "internalController": false,
      "torqueNm": null,
      "gearTypes": [
        "0.8 mod"
      ],
      "notes": "High torque motor. Max current draw can be up to 5A at 12V. Requires a MicroRemote Basestation. Compatible with standard 0.8 mod lens gears of various diameters.",
      "fizConnectors": [
        {
          "type": "4-pin proprietary"
        }
      ]
    }
  },
  "handUnits": {
    "None": {
      "powerDrawWatts": 0,
      "fizConnectors": [],
      "powerSource": "N/A",
      "batteryType": "N/A",
      "connectivity": "N/A",
      "notes": "Placeholder for no hand unit."
    },
    "Arri Hi-5": {
      "powerDrawWatts": 6,
      "fizConnectors": [
        {
          "type": "LBUS (LEMO 4-pin)"
        },
        {
          "type": "USB-C",
          "notes": "charging/config"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (ARRI LBP-3500) or External (LBUS)",
      "batteryType": "ARRI LBP-3500",
      "connectivity": "Wireless (swappable ARRI radio modules) or Wired (LBUS)",
      "notes": "3-axis hand unit with daylight-readable touchscreen and hot-swappable battery."
    },
    "Arri SXU-1": {
      "powerDrawWatts": 5,
      "fizConnectors": [
        {
          "type": "LCS (LEMO 4-pin)"
        },
        {
          "type": "USB",
          "notes": "firmware"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (ARRI LBP-3500) or External (LCS)",
      "batteryType": "ARRI LBP-3500",
      "connectivity": "Wireless (swappable ARRI radio modules) or Wired (LCS)",
      "notes": "Single-axis wireless control unit.",
    },
    "Arri WCU-4": {
      "powerDrawWatts": 8,
      "fizConnectors": [
        {
          "type": "LCS (LEMO 4-pin)"
        },
        {
          "type": "USB",
          "notes": "firmware"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (ARRI LBP-3500) or External (LCS)",
      "batteryType": "ARRI LBP-3500",
      "connectivity": "Wireless (swappable ARRI radio modules) or Wired (LCS)",
      "notes": "3-axis wireless compact unit with integrated lens mapping."
    },
    "Tilta Nucleus-M FIZ Hand Unit": {
      "powerDrawWatts": null,
      "fizConnectors": [
        {
          "type": "LEMO 7-pin",
          "notes": "Optional tether for hardline camera control"
        },
        {
          "type": "Micro-USB",
          "notes": "Charging and configuration"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (2x 18650) or External via tether",
      "batteryType": "2x 18650 Li-ion (user supplied)",
      "connectivity": "Wireless (proprietary 2.4 GHz Tilta link) or Wired (7-pin tether)",
      "notes": "Original Nucleus-M 3-axis FIZ hand unit with adjustable focus wheel tension, illuminated marks, and direct motor control when tethered. Compatible with legacy and current Nucleus-M motors."
    },
    "Tilta Nucleus-M II FIZ Hand Unit": {
      "powerDrawWatts": null,
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "Charging and configuration"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (Sony NP-F550) or External USB-C",
      "batteryType": "Sony NP-F550",
      "connectivity": "Wireless (compatible with Nucleus-series controllers and motors) or Wired (USB-C for updates)",
      "notes": "Updated hand unit with adjustable hand wheel damping, electronic focus marking disc, built-in lens mapping and expanded camera control options."
    },
    "Tilta Nucleus Nano Hand Wheel Controller": {
      "powerDrawWatts": null,
      "fizConnectors": [
        {
          "type": "Micro-USB",
          "notes": "Charging and firmware"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (14500 Li-ion) or External 5V via Micro-USB",
      "batteryType": "14500 Li-ion",
      "connectivity": "Wireless (2.4 GHz link to Nano motor) or Wired (Micro-USB for configuration)",
      "notes": "Compact single-knob controller for the original Nucleus Nano ecosystem with adjustable damping and quick lens calibration."
    },
    "Tilta Nucleus Nano II Hand Controller": {
      "powerDrawWatts": null,
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "Charging, configuration and wired camera control"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (built-in Li-ion) or External USB-C",
      "batteryType": "Integrated Li-ion (7.4 V, 3400 mAh equivalent)",
      "connectivity": "Wireless (Bluetooth LE and 2.4 GHz link to Nano II motors) or Wired (USB-C tether)",
      "notes": "Next-generation Nano II controller with full-color display, assignable buttons, lens mapping storage and support for focus, iris and zoom control."
    },
    "Preston Hand Unit 4 (HU4)": {
      "powerDrawWatts": 5,
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "Charging and configuration"
        },
        {
          "type": "LEMO 7-pin",
          "notes": "Optional hardline to MDR for power and data"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (Canon LP-E6N) or External (wired to MDR/RS)",
      "batteryType": "Canon LP-E6N",
      "connectivity": "Wireless (Preston G4 2.4 GHz FHSS) or Wired (serial tether to MDR)",
      "notes": "Fourth-generation Preston hand unit with high-brightness display, force-adjustable focus knob, assignable user keys, and native Light Ranger 2 overlays."
    },
    "cmotion cPRO hand unit": {
      "powerDrawWatts": 6,
      "fizConnectors": [
        {
          "type": "LBUS (LEMO 4-pin)",
          "notes": "Hardline or daisy-chain connection"
        },
        {
          "type": "USB-C",
          "notes": "Charging and configuration"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (Sony NP-FM50/NP-F570) or External LBUS",
      "batteryType": "Sony NP-FM50/NP-F570",
      "connectivity": "Wireless (cPRO 2.4 GHz FHSS) or Wired (LBUS)",
      "notes": "Ergonomic 3-axis controller with lens data, customizable force feedback, focus tracking tools, and compatibility with cPRO and cvolution receivers."
    },
    "Chrosziel MagNum Hand Unit (MN-100R)": {
      "powerDrawWatts": null,
      "fizConnectors": [
        {
          "type": "LEMO 4-pin",
          "notes": "Serial link to MagNum receivers"
        },
        {
          "type": "USB",
          "notes": "Charging and firmware"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (Sony NP-FM500H) or External via receiver tether",
      "batteryType": "Sony NP-FM500H",
      "connectivity": "Wireless (2.4 GHz MagNum link) or Wired (LEMO serial tether)",
      "notes": "Modular three-channel MagNum hand unit with bright status display, force-adjustable focus knob and hot-swappable batteries for Chrosziel CDM series motors."
    },
    "Teradek RT CTRL.3": {
      "powerDrawWatts": 5,
      "fizConnectors": [
        {
          "type": "LEMO 4-pin",
          "notes": "Hardwired link to MDR.X/MDR.S"
        },
        {
          "type": "USB-C",
          "notes": "Charging, configuration, camera control"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (Canon LP-E6/LP-E6N) or External USB-C",
      "batteryType": "Canon LP-E6/LP-E6N",
      "connectivity": "Wireless (Teradek RT FHSS up to ~1500 m) or Wired (LEMO 4-pin to MDR)",
      "notes": "3-axis wireless hand unit with adjustable focus knob damping, swappable iris slider and zoom rocker, integrated OLED lens data display, and full lens mapping support."
    },
    "DJI Focus Hand Unit": {
      "powerDrawWatts": 4,
      "fizConnectors": [
        {
          "type": "USB",
          "notes": "Charging and firmware"
        },
        {
          "type": "LEMO 7-pin",
          "notes": "Optional wired tether to Focus motor"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (built-in Li-ion) or External via tether",
      "batteryType": "Integrated Li-ion (3400 mAh)",
      "connectivity": "Wireless (DJI 2.4/5.8 GHz FHSS) or Wired (7-pin tether)",
      "notes": "Legacy DJI Focus controller with adjustable wheel tension, hard stops and camera run/stop support for Ronin gimbals and Inspire rigs."
    },
    "DJI Focus Pro Hand Unit": {
      "powerDrawWatts": 4,
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "Charging and firmware"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (built-in Li-ion) or External USB-C",
      "batteryType": "Integrated Li-ion (2600 mAh)",
      "connectivity": "Wireless (DJI 2.4/5.8 GHz link with Focus Pro ecosystem) or Wired (USB-C for updates)",
      "notes": "Compact controller for the Focus Pro ecosystem with customizable focus wheel tension, vibration feedback for range alerts, and direct pairing to the LiDAR Range Finder."
    },
    "DJI RS Focus Wheel (2022)": {
      "powerDrawWatts": null,
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "Powered and controlled via Ronin gimbals"
        }
      ],
      "internalController": false,
      "powerSource": "External (powered by compatible DJI RS gimbal)",
      "batteryType": "N/A (draws power from gimbal)",
      "connectivity": "Wired (USB-C pass-through via gimbal, wireless hop handled by gimbal to motor)",
      "notes": "Detachable RS-series focus wheel with programmable endpoints, photo/video trigger buttons and native control over the 2022 RS Focus motor through the gimbal bus."
    },
    "Hedén YMER-3 Hand Control": {
      "powerDrawWatts": null,
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "Charging and configuration"
        },
        {
          "type": "LEMO 7-pin",
          "notes": "Optional tether to YMER receiver for power/data"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (Sony NP-FM500H) or External (wired to receiver)",
      "batteryType": "Sony NP-FM500H",
      "connectivity": "Wireless (dual-band FHSS Hedén link) or Wired (RS-422 style tether via 7-pin)",
      "notes": "Precision Swedish-built controller with adjustable focus wheel tension, integrated lens data display, and Light Ranger compatibility when paired with Hedén receivers."
    },
    "Freefly Pilot Pro Hand Controller": {
      "powerDrawWatts": null,
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "Charging, configuration and tethered data"
        },
        {
          "type": "CAN (Hirose 6-pin)",
          "notes": "Optional wired control to Freefly ecosystems"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (Sony NP-F550/NP-F570) or External via CAN bus",
      "batteryType": "Sony NP-F550/NP-F570",
      "connectivity": "Wireless (Freefly Pilot Pro 2.4 GHz link) or Wired (CAN bus tether)",
      "notes": "Next-generation Pilot controller with high-brightness status display, dual-stage focus knob damping, assignable sliders and buttons, and deep integration with MōVI and Ember camera control."
    },
    "Redrock microRemote Hand Controller": {
      "powerDrawWatts": null,
      "fizConnectors": [
        {
          "type": "LEMO 5-pin",
          "notes": "Wired link to microRemote BaseStation"
        },
        {
          "type": "USB",
          "notes": "Charging and firmware"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (Canon LP-E6) or External via BaseStation",
      "batteryType": "Canon LP-E6",
      "connectivity": "Wireless (2.4 GHz microRemote link) or Wired (LEMO 5-pin to BaseStation)",
      "notes": "Programmable hand controller with illuminated marking disk, adjustable hard stops, and multi-axis expansion when paired with Redrock's thumb and finger controllers."
    },
    "SmallRig MagicFIZ Wireless Handgrip": {
      "powerDrawWatts": null,
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "Charging, configuration and pass-through power"
        }
      ],
      "internalController": false,
      "powerSource": "Internal Battery (1400 mAh Li-ion) or External USB-C",
      "batteryType": "Integrated Li-ion (1400 mAh)",
      "connectivity": "Wireless (2.4 GHz MagicFIZ link) or Wired (USB-C for tethered control)",
      "notes": "Lightweight handgrip controller for SmallRig MagicFIZ motors featuring OLED status display, start/stop trigger, configurable A/B points and gimbal mounting brackets."
    }
  },
  "controllers": {
    "None": {
      "powerDrawWatts": 0,
      "fizConnectors": [],
      "powerSource": "N/A",
      "batteryType": "N/A",
      "connectivity": "N/A",
      "notes": "Placeholder for no controller."
    },
    "Arri OCU-1": {
      "powerDrawWatts": 1.32,
      "fizConnectors": [
        {
          "type": "LBUS (LEMO 4-pin)",
          "notes": "built-in cable"
        },
        {
          "type": "LBUS (LEMO 4-pin)",
          "notes": "daisy chain port"
        }
      ],
      "internalController": false,
      "powerSource": "External (via LBUS)",
      "batteryType": "N/A",
      "connectivity": "Wired (LBUS) or Wireless (via ZMU-4/RIA-1/Master Grips)",
      "notes": "Single-axis FIZ control (override for WCU-4/Hi-5), compact, lightweight, three assignable user buttons, controls EF lenses without motors on ALEXA Mini/AMIRA, controls SRH-3 roll axis. Should be connected after the main motor controller for correct priority."
    },
    "Arri ZMU-4 (body only, wired)": {
      "powerDrawWatts": 1,
      "fizConnectors": [
        {
          "type": "LBUS (LEMO 4-pin)",
          "notes": "for motors"
        },
        {
          "type": "CAM (LEMO 7-pin)",
          "notes": "for camera control"
        }
      ],
      "internalController": false,
      "powerSource": "External DC (10.5-34V via LBUS/CAM) or Internal Battery",
      "batteryType": "Sony NP-F550/750 compatible, ARRI LBP-3500",
      "connectivity": "Wired (LBUS, CAM) or Wireless (with optional RF module - 2400 MHz DSSS)",
      "notes": "Force-sensitive zoom knob, transflective TFT display, user buttons, can act as a radio module host for other LBUS devices (OCU-1, Master Grips), robust, weather-resistant, firmware update via USB-C, configurable camera control. Connect after the main motor controller for correct priority."
    },
    "Arri UMC-4": {
      "powerDrawWatts": 4,
      "fizConnectors": [
        {
          "type": "Serial (LEMO 7-pin)"
        },
        {
          "type": "Serial (LEMO 7-pin)"
        },
        {
          "type": "LCS (LEMO 7-pin)",
          "notes": "adapter available to LBUS"
        },
        {
          "type": "CAM (LEMO 7-pin)"
        },
        {
          "type": "RS (Fischer 3-pin)",
          "notes": "power via D-Tap"
        },
        {
          "type": "Timecode (LEMO 5-pin)"
        },
        {
          "type": "Motor (LEMO 12-pin)"
        },
        {
          "type": "Motor (LEMO 12-pin)"
        },
        {
          "type": "Motor (LEMO 12-pin)"
        }
      ],
      "internalController": true,
      "powerSource": "External DC (via RS)",
      "batteryType": "N/A (no internal battery)",
      "connectivity": "Wireless (2.4 GHz ARRI radio, works with WCU-4/Hi-5) or Wired (LCS, CAM, Serial)",
      "notes": "3‑axis motor controller providing lens data and timecode. Works with CLM-3/4/5 motors and, via LCS‑to‑LBUS cable, with cforce motors."
    },
    "Arri RIA-1": {
      "powerDrawWatts": 2.5,
      "fizConnectors": [
        {
          "type": "LBUS (LEMO 4-pin)"
        },
        {
          "type": "CAM (LEMO 7-pin)"
        },
        {
          "type": "SERIAL (LEMO 4-pin)"
        }
      ],
      "internalController": true,
      "powerSource": "External DC (10.5-34V via camera CAM port or Cam to D-Tap cable)",
      "batteryType": "N/A (no internal battery, draws power from camera or external source)",
      "connectivity": "Wireless (swappable ARRI radio modules: RF-EMIP, RF-2400, RF-900) or Wired (LBUS, CAM, SERIAL)",
      "notes": "Versatile receiver/transmitter/motor controller, extends wireless range of WCU-4/SXU-1, brings wireless functionality to Master Grips/OCU-1, supports distance measuring devices (CineRT, Focusbug, UDM-1, Cinetape), camera control (ARRI, Panavision, RED, Sony), compact and robust. Typically powered via a CAM-to-LBUS connection on ALEXA Mini/Mini LF/Alexa 35 cameras or via a Cam to D-Tap cable when used with other cameras. Can be supplemented with an LBUS to D-Tap cable to supply additional power for higher motor torque."
    },
    "Arri NIA-1": {
      "powerDrawWatts": 5,
      "fizConnectors": [
        {
          "type": "LBUS (LEMO 4-pin)",
          "notes": "LBUS 1 (bidirectional power/data)"
        },
        {
          "type": "LBUS (LEMO 4-pin)",
          "notes": "LBUS 2 (bidirectional power/data)"
        },
        {
          "type": "Ethernet (RJ45 8-pin)",
          "notes": "100 Mbit network"
        },
        {
          "type": "USB-C",
          "notes": "Power, firmware updates, supported USB peripherals"
        }
      ],
      "internalController": false,
      "powerSource": "External DC (6.3-34V via LBUS) or USB-C (4.75-5.25V)",
      "batteryType": "N/A (no internal battery)",
      "connectivity": "Wired (Ethernet up to 100 Mbit) plus LBUS pass-through; USB-C for updates/peripherals",
      "notes": "Network interface adapter that bridges ARRI ECS to IP networks. Provides dual LBUS ports for powering and daisy-chaining LBUS devices, 100 Mbit Ethernet for remote operation and USB-C for updates or auxiliary power. Draws approx. 5 W when self-powered (up to 10 W when powering a USB-C device) and will not feed LBUS power if running solely from USB-C."
    },
    "Arri Master Grip (single unit)": {
      "powerDrawWatts": 0.72,
      "fizConnectors": [
        {
          "type": "LBUS (LEMO 4-pin)"
        }
      ],
      "internalController": true,
      "powerSource": "External (12-34VDC via LBUS)",
      "batteryType": "N/A (no internal battery)",
      "connectivity": "Wired (LBUS) or Wireless (when connected to ZMU-4 or RIA-1 with radio module)",
      "notes": "Ergonomic cine-style handgrip with integrated lens and camera controls. Available in rocker (zoom) or thumbwheel (focus/iris) versions. Can control EF/ENG and cine lenses. Advanced camera control via LCUBE CUB-1 (for third-party cameras). Override function for WCU-4 and Hi-5. Assignable user buttons, multilingual display, focus tracking, adjustable speed control. Connect after the main motor controller for correct priority."
    },
    "Tilta Nucleus-M Hand Grip (single)": {
      "powerDrawWatts": 0.5,
      "fizConnectors": [
        {
          "type": "LEMO 7-pin"
        },
        {
          "type": "ARRI rosette or gimbal bar adapter"
        }
      ],
      "internalController": true,
      "powerSource": "Internal Battery",
      "batteryType": "2x 18650 Li-ion (per grip, not included)",
      "connectivity": "Wireless (proprietary 2.4GHz RF, 1000ft/300m range)",
      "notes": "Wireless handgrip for Nucleus-M system. Left grip (focus) and Right grip (iris/zoom toggle). Can be mounted to ARRI rosettes or 25/30mm gimbal rods. Allows splitting FIZ control with the FIZ hand unit. Up to 48 hours battery life (idle)."
    },
    "Tilta Nucleus-M II Handle (single)": {
      "powerDrawWatts": 0.5,
      "fizConnectors": [
        {
          "type": "LEMO 7-pin"
        },
        {
          "type": "ARRI rosette or gimbal bar adapter"
        }
      ],
      "internalController": true,
      "powerSource": "Internal Battery",
      "batteryType": "NP-F550 (single per handle)",
      "connectivity": "Wireless (proprietary 2.4GHz RF)",
      "notes": "Improved wireless handgrip for Nucleus-M II system. Supports up to 4 channels (FIZ + ND). Compatible with Nucleus M and Nano II systems. Adjustable damping on hand wheel. Left/Right hand switch for hand wheel. Camera control via Bluetooth or cable."
    },
    "DJI Focus Pro Handle": {
      "powerDrawWatts": 1,
      "fizConnectors": [
        {
          "type": "USB-C"
        }
      ],
      "internalController": true,
      "powerSource": "Internal Battery",
      "batteryType": "Built-in rechargeable",
      "connectivity": "Wireless (DJI proprietary)",
      "notes": "Handle unit for the DJI Focus Pro kit. Works with Focus Pro Motors and the DJI LiDAR Range Finder."
    },
    "Preston MDR4": {
      "powerDrawWatts": 48,
      "fizConnectors": [
        {
          "type": "Motor Port (proprietary LEMO 7-pin)"
        },
        {
          "type": "Serial (for Light Ranger 2)"
        },
        {
          "type": "Analog (for Micro Force)"
        },
        {
          "type": "USB (firmware)"
        }
      ],
      "internalController": true,
      "powerSource": "External DC (XLR 4-pin or D-Tap)",
      "batteryType": "N/A (no internal battery)",
      "connectivity": "Wireless (Preston G4 radio link to hand units), Wired (via specific cables for camera run/stop, Light Ranger 2)",
      "notes": "2-channel digital motor driver (Focus and Iris or Zoom). Compatible with all Preston hand units (e.g., HU4) and motors. Automatic lens calibration. Each channel has adjustable torque and direction. Supports camera run/stop for various film/video cameras. Compact and suitable for handheld/Steadicam/gimbal. Does not output lens metadata."
    },
    "Redrock microRemote Basestation": {
      "powerDrawWatts": 54,
      "fizConnectors": [
        {
          "type": "Motor port (proprietary 4-pin)"
        },
        {
          "type": "USB"
        },
        {
          "type": "AUX"
        },
        {
          "type": "LEMO 2-pin"
        }
      ],
      "internalController": true,
      "powerSource": "External DC (6-18V via LEMO 2-pin)",
      "batteryType": "N/A (no internal battery)",
      "connectivity": "Wireless (proprietary Redrock RF, up to 300ft/90m range) or Wired (USB for firmware/control)",
      "notes": "Central receiver and motor driver for Redrock MicroRemote systems. Supports up to 3 motors (Focus, Iris, Zoom). Automatic or manual calibration. Compatible with various Redrock hand units (e.g., fingerwheel, handheld controller). Provides a single channel for focus, with optional expansion for iris/zoom. Compact and lightweight."
    },
    "Cmotion compact LCS receiver": {
      "powerDrawWatts": 20,
      "fizConnectors": [
        {
          "type": "Motor port (LEMO 4-pin)"
        },
        {
          "type": "Camera (LEMO 7-pin)"
        },
        {
          "type": "EXT (LEMO 4-pin)"
        }
      ],
      "internalController": true,
      "powerSource": "External DC (10-34V via Camera port or EXT port)",
      "batteryType": "N/A (no internal battery)",
      "connectivity": "Wireless (proprietary cmotion RF, 2.4 GHz FHSS, up to 150m/500ft range) or Wired (CAM, EXT)",
      "notes": "Compact 3-axis lens control receiver. Compatible with cmotion hand units (e.g., cPRO hand unit, cvolution hand unit). Features an integrated camera run/stop control for various camera systems. Supports lens data communication. Suitable for gimbal, Steadicam, and drone applications due to its small size and lightweight design."
    },
    "Teradek RT Motion CTRL.3 Controller": {
      "powerDrawWatts": 15,
      "fizConnectors": [
        {
          "type": "USB-C"
        },
        {
          "type": "LEMO 2-pin",
          "notes": "power out"
        },
        {
          "type": "LEMO 4-pin",
          "notes": "data to MDR"
        }
      ],
      "internalController": true,
      "powerSource": "Internal Battery (rechargeable) or External (USB-C)",
      "batteryType": "Internal Li-ion (proprietary, typically 1-2 hours runtime), charges via USB-C",
      "connectivity": "Wireless (Teradek RT FHSS, up to 5000ft/1500m range) or Wired (via MDR to camera/motors)",
      "notes": "3-axis wireless FIZ controller. Features a customizable focus knob with adjustable damping, iris slider, and zoom rocker. Integrated OLED display for lens data and settings. Supports lens mapping and virtual stops. Compatible with Teradek RT MDRs (e.g., MDR.S, MDR.M, MDR.X). USB-C for charging, firmware updates, and camera control."
    }
  },
  "distance": {
    "None": {
      "powerDrawWatts": 0,
      "connectionCompatibility": "N/A",
      "measurementMethod": "N/A",
      "measurementRange": "N/A",
      "accuracy": "N/A",
      "outputDisplay": "N/A",
      "notes": "Placeholder for no distance measuring device."
    },
    "UDM-1 + LCube": {
      "powerDrawWatts": 6.24,
      "fizConnectors": [
        {
          "type": "Serial"
        },
        {
          "type": "LBUS (LEMO 4-pin)",
          "notes": "via LCube-1"
        },
        {
          "type": "LBUS (LEMO 4-pin)",
          "notes": "via LCube-1"
        }
      ],
      "connectionCompatibility": "ARRI and cmotion systems (via LBUS through LCube CUB-1)",
      "measurementMethod": "Ultrasonic (Sonar)",
      "measurementRange": "0.4m - 10m (1ft 4in - 33ft)",
      "accuracy": "High accuracy up close, decreases with distance.",
      "outputDisplay": "Dedicated UDM-1 Display Unit, ARRI WCU-4/Hi-5, compatible ARRI cameras (via LDD/LBUS)",
      "notes": "The UDM-1 is the Ultrasonic Distance Measure. The LCube CUB-1 acts as a protocol converter, enabling the UDM-1 to connect to ARRI LBUS systems (like ALEXA Mini) or output serial data for other systems. It can be calibrated for film plane offset. Provides focus tracking with ARRI LDS equipment. Power draw: UDM-1 is ~6W, LCube CUB-1 is ~0.24W. Total combined power is listed as 6.24W."
    },
    "Focusbug Cine RT + LCube": {
      "powerDrawWatts": 15.24,
      "fizConnectors": [
        {
          "type": "Serial"
        },
        {
          "type": "LBUS (LEMO 4-pin)",
          "notes": "via LCube-1"
        },
        {
          "type": "LBUS (LEMO 4-pin)",
          "notes": "via LCube-1"
        }
      ],
      "connectionCompatibility": "ARRI, cmotion, Preston and Teradek systems (via appropriate controllers and LCube CUB-1)",
      "measurementMethod": "Ultrasonic (with optional 'Bug' transmitters)",
      "measurementRange": "1ft - 35ft+ (0.3 - 10.6+m) in Ranger mode; 1ft - 120ft (0.3 - 36.5m) with 'Bugs' or Handset Tape Mode",
      "accuracy": "Precision clocking and high sampling rates; high accuracy. Adjustable sensitivity and limits.",
      "outputDisplay": "Handset Control Unit (touchscreen), High-Bright LED Display, ARRI WCU-4/Hi-5, Preston HU3, cmotion, Teradek, Heden LCS",
      "notes": "The Focusbug Cine RT is a comprehensive ultrasonic distance measuring system. The listed power draw is for the main system (Base Sensor + Handset/Display + Bug), with the LCube adding its own small draw. It offers advanced features like tracking multiple 'Bugs' (miniature transmitters), limits, lockout, and a 'Tape Mode' on the handset for quick measurements. The LCube CUB-1 is used for integrating the Cine RT's serial output into ARRI's LBUS ecosystem for seamless data flow."
    },
    "Preston Light Ranger 2 (LR2) Main Sensor": {
      "powerDrawWatts": 20,
      "fizConnectors": [
        {
          "type": "Serial",
          "notes": "connects to MDR3/MDR4 serial port"
        }
      ],
      "connectionCompatibility": "Preston systems only (via MDR3/MDR4)",
      "measurementMethod": "LADAR (Laser Detection and Ranging)",
      "measurementRange": "2ft - 60ft (0.6m - 18.3m) with standard sensor; up to 200ft+ with optional long-range sensors.",
      "accuracy": "High precision, measures distance to multiple objects simultaneously.",
      "outputDisplay": "Preston Hand Unit (HU3, HU4, etc.) graphic overlay (multi-point display), configurable display on monitor (via MDR), camera metadata",
      "notes": "The Light Ranger 2 is a multi-point LADAR system that provides real-time distance measurements to multiple objects in the frame. It's known for its robust performance, particularly in challenging environments. Designed to work seamlessly with Preston FIZ systems, displaying focus information directly on the hand unit and allowing for advanced focus pulling techniques."
    },
    "Teradek TOF.1 Range Finder Module": {
      "powerDrawWatts": 3.6,
      "fizConnectors": [
        {
          "type": "LEMO 7-pin",
          "notes": "motor cable to MDR.X middle motor input"
        }
      ],
      "connectionCompatibility": "Teradek systems only (MDR.X/MDR.S/MDR.M)",
      "measurementMethod": "LiDAR (Time-of-Flight Laser)",
      "measurementRange": "0.3m - 20m (1ft - 65ft)",
      "accuracy": "High accuracy, particularly for single-point measurement.",
      "outputDisplay": "Teradek RT CTRL.3 hand unit, compatible Teradek RT MDRs, Bolt monitor overlays (via MDR)",
      "notes": "Compact and lightweight single-point LiDAR rangefinder. Designed to integrate seamlessly with the Teradek RT lens control ecosystem. Provides precise real-time distance data for automated or assisted focus. It offers strong performance even in low-light conditions and is suitable for various camera setups."
    },
    "DJI LiDAR Range Finder": {
      "powerDrawWatts": 6.8,
      "fizConnectors": [
        {
          "type": "USB-C",
          "notes": "LiDAR connection"
        },
        {
          "type": "USB-C",
          "notes": "Focus Motor connection"
        }
      ],
      "connectionCompatibility": "DJI Ronin 4D or Focus Pro Handle with Focus Pro Motors",
      "measurementMethod": "LiDAR (Light Detection and Ranging)",
      "measurementRange": "0.5m - 14m (1.6ft - 46ft)",
      "accuracy": "43,200 ranging points, up to 30Hz refresh rate, high accuracy.",
      "outputDisplay": "DJI RS gimbal screen, DJI Focus Motor (visual focus assist), DJI RS Focus Motor, Ronin App",
      "notes": "Integrated LiDAR sensor designed for DJI RS series gimbals. It provides accurate and fast distance measurements, enabling autofocus for manual lenses (when paired with a DJI Focus Motor). Features a built-in camera that can recognize the subject and track focus. Ideal for solo operators seeking precise autofocus capabilities with cinema lenses."
    }
  }
};

if (typeof registerDevice === 'function') {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = registerDevice('fiz', fizData);
  } else {
    registerDevice('fiz', fizData);
  }
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = fizData;
} else {
  globalThis.devices = globalThis.devices || {};
  globalThis.devices.fiz = fizData;
}
})();
