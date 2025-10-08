function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
(function () {
  var gear = {
    "viewfinders": {
      "ARRI K2.75004.0 MVF-1 Viewfinder": {
        "brand": "ARRI",
        "model": "MVF-1",
        "kNumber": "K2.75004.0",
        "compatible": ["Arri Alexa Mini", "Arri Amira"],
        "isPersonalGear": false,
        "listOfOrigin": "250530_Equipmentliste_Gönrgy_Werbung.pdf"
      },
      "Sony DVF-EL200 OLED Viewfinder": {
        "brand": "Sony",
        "model": "DVF-EL200 OLED Viewfinder",
        "kNumber": "DVF-EL200",
        "compatible": ["Sony Venice", "Sony Venice 2", "Sony F55"],
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
        "videoInputs": [{
          "type": "HDMI"
        }, {
          "type": "3G-SDI"
        }],
        "videoOutputs": [{
          "type": "3G-SDI"
        }]
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
        "videoInputs": [{
          "type": "HDMI"
        }, {
          "type": "3G-SDI"
        }],
        "videoOutputs": [{
          "type": "3G-SDI"
        }]
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
        "videoInputs": [{
          "type": "HDMI"
        }, {
          "type": "12G-SDI"
        }],
        "videoOutputs": [{
          "type": "HDMI"
        }, {
          "type": "12G-SDI"
        }]
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
        "videoInputs": [{
          "type": "HDMI"
        }, {
          "type": "12G-SDI"
        }],
        "videoOutputs": [{
          "type": "HDMI"
        }, {
          "type": "12G-SDI"
        }]
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
        "videoInputs": [{
          "type": "HDMI"
        }, {
          "type": "3G-SDI"
        }],
        "videoOutputs": [{
          "type": "3G-SDI"
        }]
      },
      "SmallHD 1303 HDR": {
        "brand": "SmallHD",
        "model": "1303 HDR",
        "screenSizeInches": 13,
        "brightnessNits": 1500,
        "powerDrawWatts": 39,
        "power": {
          "input": [{
            "type": "XLR"
          }, {
            "type": "D-Tap"
          }],
          "output": null
        },
        "notes": "Typical draw ranges from 25-39 W depending on load.",
        "wirelessTx": false,
        "videoInputs": [{
          "type": "3G-SDI"
        }, {
          "type": "HDMI"
        }],
        "videoOutputs": [{
          "type": "3G-SDI"
        }, {
          "type": "HDMI"
        }]
      },
      "SmallHD Cine 13 UHD 4K": {
        "brand": "SmallHD",
        "model": "Cine 13 UHD 4K",
        "screenSizeInches": 13.3,
        "brightnessNits": 1500,
        "powerDrawWatts": 36.7,
        "power": {
          "input": [{
            "type": "XLR 4-pin"
          }, {
            "type": "V-Mount"
          }, {
            "type": "Gold-Mount"
          }],
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [{
          "type": "12G-SDI"
        }, {
          "type": "HDMI"
        }],
        "videoOutputs": [{
          "type": "12G-SDI"
        }, {
          "type": "HDMI"
        }]
      },
      "SEETEC P133-9HSD": {
        "brand": "SEETEC",
        "model": "P133-9HSD",
        "screenSizeInches": 13.3,
        "brightnessNits": 400,
        "powerDrawWatts": 12,
        "power": {
          "input": [{
            "type": "DC"
          }, {
            "type": "Battery Plate"
          }],
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [{
          "type": "3G-SDI"
        }, {
          "type": "HDMI"
        }, {
          "type": "Composite"
        }, {
          "type": "DVI-I"
        }],
        "videoOutputs": [{
          "type": "3G-SDI"
        }, {
          "type": "HDMI"
        }]
      },
      "SWIT BM-U175": {
        "brand": "SWIT",
        "model": "BM-U175",
        "screenSizeInches": 17.3,
        "brightnessNits": 300,
        "powerDrawWatts": 85,
        "power": {
          "input": [{
            "type": "XLR 4-pin"
          }, {
            "type": "AC"
          }, {
            "type": "V-Mount"
          }],
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [{
          "type": "12G-SDI",
          "notes": "4x"
        }, {
          "type": "HDMI 2.0"
        }, {
          "type": "SFP Fiber",
          "notes": "optional"
        }],
        "videoOutputs": [{
          "type": "12G-SDI",
          "notes": "4x"
        }]
      },
      "SWIT S-1173F": {
        "brand": "SWIT",
        "model": "S-1173F",
        "screenSizeInches": 17.3,
        "brightnessNits": 300,
        "powerDrawWatts": 32,
        "power": {
          "input": [{
            "type": "XLR 4-pin"
          }, {
            "type": "V-Mount"
          }, {
            "type": "Gold-Mount"
          }],
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [{
          "type": "3G-SDI",
          "notes": "2x"
        }, {
          "type": "HDMI"
        }, {
          "type": "Y/Pb/Pr"
        }, {
          "type": "VGA"
        }, {
          "type": "CVBS"
        }],
        "videoOutputs": [{
          "type": "3G-SDI",
          "notes": "loop"
        }, {
          "type": "HDMI",
          "notes": "loop"
        }]
      },
      "SWIT K15": {
        "brand": "SWIT",
        "model": "K15",
        "screenSizeInches": 15.4,
        "brightnessNits": 1500,
        "powerDrawWatts": null,
        "power": {
          "input": [{
            "type": "AC"
          }, {
            "type": "XLR"
          }, {
            "type": "V-Mount"
          }],
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [{
          "type": "3G-SDI",
          "notes": "2x in"
        }, {
          "type": "HDMI 1.4"
        }, {
          "type": "USB-A"
        }, {
          "type": "USB-C"
        }],
        "videoOutputs": [{
          "type": "3G-SDI",
          "notes": "2x out"
        }]
      },
      "SWIT K21": {
        "brand": "SWIT",
        "model": "K21",
        "screenSizeInches": 21.5,
        "brightnessNits": 1500,
        "powerDrawWatts": null,
        "power": {
          "input": [{
            "type": "AC"
          }, {
            "type": "XLR"
          }, {
            "type": "V-Mount"
          }],
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [{
          "type": "3G-SDI",
          "notes": "2x in"
        }, {
          "type": "HDMI 1.4"
        }, {
          "type": "USB-A"
        }, {
          "type": "USB-C"
        }],
        "videoOutputs": [{
          "type": "3G-SDI",
          "notes": "2x loop"
        }, {
          "type": "HDMI",
          "notes": "loop"
        }]
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
        "videoInputs": [{
          "type": "SDI"
        }, {
          "type": "HDMI"
        }],
        "videoOutputs": []
      },
      "Sony LMD-A170": {
        "brand": "Sony",
        "model": "LMD-A170",
        "screenSizeInches": 17,
        "brightnessNits": null,
        "powerDrawWatts": 42,
        "power": {
          "input": [{
            "type": "AC"
          }, {
            "type": "DC"
          }],
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [{
          "type": "3G-SDI"
        }, {
          "type": "HDMI"
        }, {
          "type": "Composite/Component"
        }],
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
        "videoInputs": [{
          "type": "RGB"
        }, {
          "type": "Composite"
        }],
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
        "videoInputs": [{
          "type": "3G-SDI",
          "notes": "2x"
        }, {
          "type": "DisplayPort"
        }, {
          "type": "DVI-D"
        }],
        "videoOutputs": [{
          "type": "3G-SDI",
          "notes": "2x"
        }]
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
        "videoInputs": [{
          "type": "3G-SDI"
        }],
        "videoOutputs": []
      },
      "Flanders Scientific XMP270": {
        "brand": "Flanders Scientific",
        "model": "XMP270",
        "screenSizeInches": 26.5,
        "brightnessNits": 1000,
        "powerDrawWatts": 220,
        "power": {
          "input": [{
            "type": "XLR 4-pin",
            "notes": "24V DC"
          }, {
            "type": "V-Mount",
            "notes": "optional plate"
          }],
          "output": null
        },
        "notes": "Consumes approximately 35-220 W depending on HDR mode.",
        "wirelessTx": false,
        "videoInputs": [{
          "type": "12G-SDI",
          "notes": "4x"
        }],
        "videoOutputs": [{
          "type": "12G-SDI",
          "notes": "4x loop"
        }]
      },
      "Tarion BM120-4KS": {
        "brand": "Tarion",
        "model": "BM120-4KS",
        "screenSizeInches": 12.5,
        "brightnessNits": null,
        "powerDrawWatts": 23,
        "power": {
          "input": [{
            "voltageRange": "10-24",
            "type": "DC"
          }, {
            "type": "V-Mount"
          }],
          "output": null
        },
        "wirelessTx": false,
        "videoInputs": [{
          "type": "HDMI"
        }, {
          "type": "SDI"
        }, {
          "type": "VGA"
        }],
        "videoOutputs": [{
          "type": "HDMI"
        }, {
          "type": "SDI"
        }, {
          "type": "VGA"
        }]
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
        "powerDrawWatts": 9,
        "videoInputs": [{
          "type": "HDMI"
        }, {
          "type": "3G-SDI"
        }],
        "videoOutputs": [],
        "frequency": "2.4 GHz / 5 GHz Wi-Fi",
        "latencyMs": "< 60ms",
        "power": {
          "input": [{
            "type": "LEMO 2-pin",
            "notes": "6-28V"
          }, {
            "type": "D-Tap"
          }]
        },
        "notes": "Streams to iOS devices for on-set monitoring"
      },
      "Teradek - Link AX WifiRouter/Access Point": {
        "powerDrawWatts": 9,
        "videoInputs": [{
          "type": "HDMI"
        }, {
          "type": "3G-SDI"
        }],
        "videoOutputs": [],
        "frequency": "2.4 GHz / 5 GHz Wi-Fi",
        "latencyMs": "< 60ms",
        "power": {
          "input": [{
            "type": "LEMO 2-pin",
            "notes": "6-28V"
          }, {
            "type": "D-Tap"
          }]
        },
        "notes": "Streams to iOS devices for on-set monitoring; includes Link AX Wi-Fi router/access point"
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
          "compatible": ["Sony FS7 II", "Sony FX9"],
          "rodStandard": "15mm"
        },
        "ARRI Base Plate (FS7II/FX9)": {
          "brand": "ARRI",
          "kNumber": "K2.0035830",
          "compatible": ["Sony FS7 II", "Sony FX9"]
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
          "compatible": ["Sony FS7 II", "Sony FX9"]
        },
        "ARRI Side Bracket Right (FS7II/FX9)": {
          "brand": "ARRI",
          "kNumber": "K2.0034709",
          "compatible": ["Sony FS7 II", "Sony FX9"]
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
          "compatible": ["Sony FS7 II", "Sony FX9"]
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
          "compatible": ["LMB 4x5", "LMB-6"],
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
            "to": "LEMO 2-pin",
            "lengthM": 0.5,
            "connectors": ["D-Tap", "LEMO 0B 2-pin"]
          },
          "D-Tap Splitter 3-way": {
            "from": "D-Tap",
            "to": ["D-Tap", "D-Tap", "D-Tap"],
            "lengthM": 0.2,
            "connectors": ["D-Tap input", "D-Tap outputs"]
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
            "connectors": ["LBUS 4-pin (LEMO)", "LBUS 4-pin (LEMO)"],
            "orientation": "straight-straight",
            "type": "LBUS data/power cable",
            "compatibleDevices": ["ARRI cforce mini", "ARRI cforce mini RF", "ARRI cforce plus", "ARRI Master Grips", "ARRI OCU-1", "ARRI RIA-1", "ARRI NIA-1"],
            "compatibleControllers": ["ARRI OCU-1", "ARRI Master Grips", "ARRI Hi-5 (via RIA-1/LCUBE)"],
            "compatibleCameras": ["ARRI ALEXA Mini", "ARRI ALEXA Mini LF", "ARRI ALEXA 35 (via RIA-1 / EF Mount LBUS)"],
            "notes": "Generic LBUS interconnect for chaining LBUS devices.",
            "useCase": ["Daisy-chain ARRI LBUS devices (e.g., cforce motors, RIA-1, NIA-1, LCUBE, Master Grips)"],
            "provenance": [{
              "url": "https://www.arri.com/en/camera-systems/electronic-control-system/lens-motors-and-encoders"
            }, {
              "url": "https://www.arri.com/en/camera-systems/camera-components/lens-mounts-and-adapters/arri-ef-mount-lbus"
            }, {
              "url": "https://shop.arri.com/Products/Camera-Stabilizer-Systems/"
            }]
          },
          "LBUS to LBUS 0,2m": {
            "brand": "ARRI",
            "kNumber": "K2.0006749",
            "from": "LBUS 4-pin (LEMO)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": ["LBUS 4-pin (LEMO)", "LBUS 4-pin (LEMO)"],
            "lengthM": 0.2,
            "orientation": "straight-straight",
            "type": "LBUS data/power cable",
            "compatibleDevices": ["ARRI cforce mini", "ARRI Master Grips", "ARRI OCU-1", "ARRI RIA-1", "ARRI NIA-1"],
            "compatibleControllers": ["ARRI OCU-1", "ARRI Master Grips", "ARRI Hi-5 (via RIA-1/LCUBE)"],
            "compatibleCameras": ["ARRI ALEXA Mini", "ARRI ALEXA Mini LF"],
            "notes": "Short jumper for closely mounted LBUS devices.",
            "useCase": ["Daisy-chain ARRI LBUS devices (e.g., cforce motors, RIA-1, NIA-1, LCUBE, Master Grips)"],
            "provenance": [{
              "url": "https://www.arri.com/en/camera-systems/camera-stabilizer-systems/trinity-2-and-artemis-2/trinity-2/trinity-2-cables"
            }]
          },
          "LBUS to LBUS 0,3m": {
            "brand": "ARRI",
            "kNumber": "K2.0006750",
            "from": "LBUS 4-pin (LEMO)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": ["LBUS 4-pin (LEMO)", "LBUS 4-pin (LEMO)"],
            "lengthM": 0.3,
            "orientation": "straight-straight",
            "type": "LBUS data/power cable",
            "compatibleDevices": ["ARRI cforce mini", "ARRI Master Grips", "ARRI OCU-1", "ARRI RIA-1", "ARRI NIA-1"],
            "compatibleControllers": ["ARRI OCU-1", "ARRI Master Grips"],
            "compatibleCameras": ["ARRI ALEXA Mini", "ARRI ALEXA Mini LF"],
            "useCase": ["Daisy-chain ARRI LBUS devices (e.g., cforce motors, RIA-1, NIA-1, LCUBE, Master Grips)"],
            "provenance": [{
              "url": "https://www.arri.com/en/camera-systems/camera-stabilizer-systems/trinity-2-and-artemis-2/trinity-2/trinity-2-cables"
            }]
          },
          "LBUS to LBUS 0,4m": {
            "brand": "ARRI",
            "from": "LBUS 4-pin (LEMO)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": ["LBUS 4-pin (LEMO)", "LBUS 4-pin (LEMO)"],
            "lengthM": 0.4,
            "orientation": "straight-straight",
            "type": "LBUS data/power cable",
            "compatibleDevices": ["ARRI cforce mini", "ARRI Master Grips", "ARRI OCU-1", "ARRI RIA-1", "ARRI NIA-1"],
            "compatibleControllers": ["ARRI OCU-1", "ARRI Master Grips"],
            "compatibleCameras": ["ARRI ALEXA Mini", "ARRI ALEXA Mini LF"],
            "notes": "ARRI lists 0.2/0.3/0.5/0.8/1.5 m as standard lengths; 0.4 m variant not found on manufacturer lists.",
            "useCase": ["Daisy-chain ARRI LBUS devices (e.g., cforce motors, RIA-1, NIA-1, LCUBE, Master Grips)"],
            "provenance": [{
              "url": "https://www.arri.com/en/camera-systems/camera-stabilizer-systems/trinity-2-and-artemis-2/trinity-2/trinity-2-cables"
            }]
          },
          "LBUS to LBUS 0,5m": {
            "brand": "ARRI",
            "kNumber": "K2.0006751",
            "from": "LBUS 4-pin (LEMO)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": ["LBUS 4-pin (LEMO)", "LBUS 4-pin (LEMO)"],
            "lengthM": 0.5,
            "orientation": "straight-straight",
            "type": "LBUS data/power cable",
            "compatibleDevices": ["ARRI cforce mini", "ARRI Master Grips", "ARRI OCU-1", "ARRI RIA-1", "ARRI NIA-1"],
            "compatibleControllers": ["ARRI OCU-1", "ARRI Master Grips"],
            "compatibleCameras": ["ARRI ALEXA Mini", "ARRI ALEXA Mini LF"],
            "useCase": ["Daisy-chain ARRI LBUS devices (e.g., cforce motors, RIA-1, NIA-1, LCUBE, Master Grips)"],
            "provenance": [{
              "url": "https://www.arri.com/en/camera-systems/camera-stabilizer-systems/trinity-2-and-artemis-2/trinity-2/trinity-2-cables"
            }]
          },
          "ARRI Right-Angle LBUS to LBUS 0,6m": {
            "brand": "ARRI",
            "kNumber": "K2.0013040",
            "connectors": ["LBUS 4-pin (LEMO) right-angle", "LBUS 4-pin (LEMO) right-angle"],
            "lengthM": 0.6,
            "from": "LBUS 4-pin (LEMO) right-angle",
            "to": "LBUS 4-pin (LEMO) right-angle",
            "orientation": "right-angle to right-angle",
            "type": "LBUS data/power cable",
            "compatibleDevices": ["ARRI Master Grips", "ARRI cforce mini", "ARRI OCU-1", "ARRI RIA-1", "ARRI NIA-1"],
            "compatibleControllers": ["ARRI OCU-1", "ARRI Master Grips"],
            "compatibleCameras": ["ARRI ALEXA family (via LBUS accessories)"],
            "useCase": ["Daisy-chain ARRI LBUS devices (e.g., cforce motors, RIA-1, NIA-1, LCUBE, Master Grips)"],
            "provenance": [{
              "url": "https://www.bhphotovideo.com/c/product/1310382-REG/arri_k2_0013040_cable_lbus_angled_to.html"
            }, {
              "url": "https://www.arri.com/en/camera-systems/electronic-control-system/lens-motors-and-encoders"
            }]
          },
          "Cable UDM – SERIAL (7p) 1,5m": {
            "brand": "ARRI",
            "kNumber": "K2.65144.0",
            "connectors": ["LEMO 7-pin (UDM Serial)", "LEMO 7-pin Serial"],
            "from": "ARRI UDM-1",
            "to": "ARRI UMC-4 / LCUBE Serial",
            "lengthM": 1.5,
            "orientation": "straight",
            "type": "UDM serial cable",
            "compatibleDevices": ["ARRI UDM-1", "ARRI LCUBE CUB-1", "ARRI UMC-4"],
            "compatibleControllers": ["ARRI UMC-4", "ARRI LCUBE CUB-1"],
            "notes": "Connects UDM-1 to UMC-4 or LCUBE CUB-1 serial.",
            "useCase": ["Connect ARRI UDM-1 to ARRI UMC / LCUBE CUB-1"],
            "provenance": [{
              "url": "https://www.arri.com/en/camera-systems/electronic-control-system/lcubes"
            }, {
              "url": "https://www.filmtools.com/arri-cable-udm-serial-7p-1-5m-5ft.html"
            }]
          },
          "Cable UDM – SERIAL (4p) 0,5m": {
            "brand": "ARRI",
            "kNumber": "K2.0025324",
            "connectors": ["LEMO 4-pin Serial", "LEMO 4-pin Serial"],
            "from": "ARRI UDM-1 Serial (LEMO 4-pin)",
            "to": "ARRI RIA-1 / ALEXA 35 Serial",
            "lengthM": 0.5,
            "orientation": "straight",
            "type": "UDM serial cable",
            "compatibleDevices": ["ARRI UDM-1"],
            "compatibleControllers": ["ARRI RIA-1"],
            "compatibleCameras": ["ARRI ALEXA 35 (front SERIAL port)"],
            "notes": "Connects UDM-1 to SERIAL on RIA-1 or ALEXA 35.",
            "useCase": ["Connect ARRI UDM-1 to SERIAL port on RIA-1 / ALEXA 35"],
            "provenance": [{
              "url": "https://www.bhphotovideo.com/c/product/1665189-REG/arri_k2_0025324_udm_serial_cable.html"
            }, {
              "url": "https://www.videocineimport.com/wp-content/uploads/2025/02/4.1.3-RIA-1-Cable-Guide.pdf"
            }]
          },
          "Cable CAM (7-pin) – LBUS 0,3m": {
            "brand": "ARRI",
            "from": "CAM (LEMO 7-pin)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": ["CAM 7-pin (LEMO)", "LBUS 4-pin (LEMO)"],
            "lengthM": 0.3,
            "orientation": "straight",
            "type": "CAM-to-LBUS interface cable",
            "compatibleDevices": ["ARRI cforce RF motor", "cmotion cPRO motor", "cmotion cPRO camin"],
            "notes": "Short length variant not listed with ARRI part number; 0.5 m version is K2.0015760.",
            "useCase": ["LBUS data and power bridge"],
            "provenance": [{
              "url": "https://hotrodcameras.com/products/arri-cable-cam-7p-lbus-1-6"
            }, {
              "url": "https://www.bhphotovideo.com/c/product/1405163-REG/arri_k2_0015760_cable_cam_7p_lbus.html"
            }]
          },
          "Cable CAM (7-pin) – LBUS 0,5m": {
            "brand": "ARRI",
            "kNumber": "K2.0015760",
            "from": "CAM (LEMO 7-pin)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": ["CAM 7-pin (LEMO)", "LBUS 4-pin (LEMO)"],
            "lengthM": 0.5,
            "orientation": "straight",
            "type": "CAM-to-LBUS interface cable",
            "compatibleDevices": ["ARRI cforce RF motor", "cmotion cPRO motor", "cmotion cPRO camin"],
            "useCase": ["LBUS data and power bridge"],
            "provenance": [{
              "url": "https://www.bhphotovideo.com/c/product/1405163-REG/arri_k2_0015760_cable_cam_7p_lbus.html"
            }, {
              "url": "https://hotrodcameras.com/products/arri-cable-cam-7p-lbus-1-6"
            }]
          },
          "Cable CAM (7-pin) – EXT (16-pin) 0,8m": {
            "brand": "ARRI",
            "kNumber": "K2.0015755",
            "from": "CAM (7-pin)",
            "to": "EXT (16-pin)",
            "lengthM": 0.8,
            "orientation": "straight",
            "useCase": ["Run/Stop", "Power", "Control"],
            "compatibleControllers": ["Arri RIA-1", "Arri cforce mini RF"],
            "compatibleCameras": ["Arri Alexa Classic EV", "Arri Alexa XT EV", "Arri Alexa SXT EV"],
            "notes": "Only for EV models, not ALEXA Plus."
          },
          "Cable CAM (7-pin) – EXT (6-pin) 0,6m": {
            "brand": "ARRI",
            "kNumber": "K2.0015756",
            "from": "CAM (7-pin)",
            "to": "EXT (6-pin)",
            "lengthM": 0.6,
            "orientation": "straight",
            "useCase": ["Run/Stop", "Power", "Control"],
            "compatibleControllers": ["Arri RIA-1", "Arri cforce mini RF"],
            "compatibleCameras": ["Arri Amira", "Arri Alexa Mini"],
            "notes": "For ALEXA Mini LF, use CAM-to-LBUS instead."
          },
          "Cable CAM (7-pin) – LCS (5-pin) 0,8m": {
            "brand": "ARRI",
            "kNumber": "K2.0034580",
            "from": "CAM (7-pin)",
            "to": "LCS (5-pin)",
            "lengthM": 0.8,
            "orientation": "straight",
            "useCase": ["Run/Stop", "Power", "Control"],
            "compatibleControllers": ["Arri RIA-1", "Arri cforce mini RF"],
            "compatibleCameras": ["Arri Alexa Plus", "Arri Alexa XT Plus", "Arri Alexa SXT Plus", "Arri Alexa LF", "Arri Alexa 65"]
          },
          "Cable CAM (7-pin) – RED CTRL/D-Tap 0,6m": {
            "brand": "ARRI",
            "kNumber": "K2.0015758",
            "connectors": ["CAM (7-pin)", "RED CTRL + D-Tap"],
            "lengthM": 0.6,
            "orientation": "straight",
            "useCase": ["Run/Stop", "Power", "Control"],
            "compatibleControllers": ["Arri RIA-1", "Arri cforce mini RF"],
            "compatibleCameras": ["RED DSMC2 HELIUM 8K S35", "RED DSMC2 MONSTRO 8K VV", "RED Epic-W (Helium 8K S35)", "RED Scarlet-W (Dragon Sensor)", "RED Weapon (Helium 8K S35)", "RED Weapon (Helium 8K VV)", "RED Komodo 6k", "RED Komodo X", "RED V-RAPTOR 8K S35", "RED V-RAPTOR 8K VV", "RED V-RAPTOR X 8K S35", "RED V-RAPTOR X 8K VV", "RED V-RAPTOR XL 8K VV", "RED V-RAPTOR XL 8K S35", "RED V-RAPTOR X XL 8K S35", "RED V-RAPTOR X XL 8K VV"],
            "notes": "Supports run/stop/tally on WCU-4 & Hi-5. For DSMC3 (Komodo/V-RAPTOR), use module or breakout from 9p Lemo EXT to RED CTRL. Hi-5 advanced control requires RED Camera Control License."
          },
          "Cable CAM (7-pin) – LANC/D-Tap 0,6m": {
            "brand": "ARRI",
            "kNumber": "K2.0015757",
            "connectors": ["CAM (7-pin)", "LANC + D-Tap"],
            "lengthM": 0.6,
            "orientation": "straight",
            "useCase": ["Run/Stop", "Power"],
            "compatibleControllers": ["Arri RIA-1", "Arri cforce mini RF"],
            "compatibleCameras": ["Sony PXW-FX9", "Sony PXW-FS7", "Sony FX6", "Sony FS5", "Sony PXW-Z90", "Sony HXR-NX80", "Sony HXR-NX5", "Sony HXR-NX5R", "Canon EOS C300 Mark I", "Canon EOS C300 Mark II", "Canon EOS C300 Mark III", "Canon EOS C500 Mark I", "Canon EOS C500 Mark II", "Canon EOS C400", "Canon XF705", "Canon XF405", "Canon XF400", "Canon XF305", "Blackmagic URSA Mini Pro"],
            "notes": "Requires a 2.5 mm LANC port (Remote A). Provides run/stop but no advanced camera control. Not compatible with Sony FX3 (uses Multi/Micro USB remote)."
          },
          "Cable CAM (7-pin) – Sony Venice/F55 CTRL/D-Tap 0,6m": {
            "brand": "ARRI",
            "kNumber": "K2.0018814",
            "connectors": ["CAM (7-pin)", "Sony CTRL + D-Tap"],
            "lengthM": 0.6,
            "orientation": "straight",
            "useCase": ["Run/Stop", "Power"],
            "compatibleControllers": ["Arri RIA-1", "Arri cforce mini RF"],
            "compatibleCameras": ["Sony F5", "Sony F55", "Sony Venice"],
            "notes": "Not compatible with Sony Venice 2 or Varicam."
          },
          "Cable CAM (7-pin) – Sony Remote (8-pin)/D-Tap 0,8m": {
            "brand": "ARRI",
            "kNumber": "K2.0047268",
            "connectors": ["CAM (7-pin)", "Sony Remote (8-pin) + D-Tap"],
            "lengthM": 0.8,
            "orientation": "straight",
            "useCase": ["Run/Stop", "Power", "Control"],
            "compatibleControllers": ["Arri RIA-1", "Arri cforce mini RF"],
            "compatibleCameras": ["Sony Venice", "Sony Venice 2"],
            "notes": "Run/stop/tally on both; additional Hi-5 camera control with Sony Camera Control License."
          },
          "Cable CAM (7-pin) – RS (3-pin) 0,3m": {
            "brand": "ARRI",
            "kNumber": "K2.0015754",
            "connectors": ["CAM (7-pin)", "ARRI RS (3-pin)"],
            "lengthM": 0.3,
            "orientation": "straight",
            "useCase": ["Run/Stop", "Tally", "Power"],
            "compatibleControllers": ["Arri RIA-1", "Arri cforce mini RF"],
            "compatibleCameras": ["Arri Alexa 35", "Arri Alexa Mini LF", "Arri Alexa Mini", "Arri Amira", "Arri Alexa Classic EV", "Arri Alexa XT EV", "Arri Alexa SXT EV", "Arri Alexa Plus", "Arri Alexa XT Plus", "Arri Alexa SXT Plus", "Arri Alexa LF", "Arri Alexa 65"],
            "notes": "Run/stop/tally on ARRI cameras with 3p Fischer. Can also power RIA-1 without a camera connection."
          },
          "Cable CAM (7-pin) – D-Tap 0,5m": {
            "brand": "ARRI",
            "kNumber": "K2.0018813",
            "connectors": ["CAM (7-pin)", "D-Tap"],
            "lengthM": 0.5,
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleControllers": ["Arri RIA-1", "Arri cforce mini RF"],
            "notes": "Use to power RIA-1 when no compatible camera control cable exists."
          },
          "Cable CAM (7-pin,f) – CAM (7-pin,m) 0,3m": {
            "brand": "ARRI",
            "kNumber": "K2.0023832",
            "connectors": ["CAM (7-pin,f)", "CAM (7-pin,m)"],
            "lengthM": 0.3,
            "orientation": "straight",
            "useCase": [],
            "compatibleControllers": ["Arri RIA-1", "Arri cforce mini RF"],
            "notes": "Extension for any CAM cable."
          },
          "Cable CAM (7-pin) – ENG (12-pin) 0,3m": {
            "brand": "ARRI",
            "kNumber": "K2.0015759",
            "connectors": ["CAM (7-pin)", "ENG (12-pin)"],
            "lengthM": 0.3,
            "orientation": "straight",
            "useCase": [],
            "compatibleControllers": ["Arri RIA-1", "Arri cforce mini RF"],
            "compatibleCameras": ["Sony Venice (LENS)", "Sony Venice 2 (LENS)"],
            "notes": "Injects lens metadata via LENS connector."
          },
          "Cable CineTape – SERIAL (4p) 0,8m": {
            "brand": "ARRI",
            "kNumber": "K2.0044396",
            "from": "SERIAL (LEMO 4-pin)",
            "to": "Serial",
            "connectors": ["LEMO 4-pin Serial", "LEMO 4-pin Serial"],
            "lengthM": 0.8,
            "orientation": "straight",
            "type": "Serial distance cable",
            "compatibleDevices": ["CineTape (Monitored by ARRI LCS)"],
            "compatibleControllers": ["ARRI RIA-1", "ARRI UMC-4 (via LCUBE)"],
            "compatibleCameras": ["ARRI ALEXA 35 (front SERIAL port)"],
            "notes": "Generic spec based on ARRI serial ecosystem; specific ARRI part number for CineTape cable not found.",
            "useCase": ["Serial distance data"],
            "provenance": [{
              "url": "https://www.arri.com/resource/blob/245986/fe6f9d9dbad1a92fc2440a4eff558b6b/4-1-8-hi-5-and-ria-1-sample-configurations-3rd-party-data.pdf"
            }]
          },
          "Cine RT to ARRI RIA-1 / ALEXA 35": {
            "brand": "Focusbug",
            "kNumber": "CRT-YSP-RIA (family)",
            "connectors": ["LEMO 6-pin right-angle + LEMO 2-pin right-angle", "LEMO 4-pin (straight, Serial)"],
            "from": "Cine RT Base (serial + power RA)",
            "to": "ARRI RIA-1 / ALEXA 35 SERIAL",
            "lengthM": 0.6,
            "orientation": "Right-angle on Cine RT side; straight on camera/RIA-1 side",
            "type": "Serial Y cable (with power)",
            "compatibleDevices": ["Focusbug Cine RT Base Sensor"],
            "compatibleControllers": ["ARRI RIA-1"],
            "compatibleCameras": ["ARRI ALEXA 35 (front SERIAL)"],
            "notes": "Provides serial data and filtered power from RIA-1/ALEXA 35 to Cine RT.",
            "useCase": ["Connect Cine RT Base to ARRI RIA-1 or ALEXA 35 SERIAL with power injection"],
            "provenance": [{
              "url": "https://www.focusbug.com/order/system-accessories-cables-order/"
            }, {
              "url": "https://cvp.com/product/focusbug-y-cable-cine-rt-lemo-cable-crt-ysp-ria-r2"
            }, {
              "url": "https://www.videocineimport.com/wp-content/uploads/2025/02/4.1.3-RIA-1-Cable-Guide.pdf"
            }]
          },
          "D-Tap to Lemo-2-pin Cable 0,3m": {
            "brand": "ARRI",
            "kNumber": "K2.0006758",
            "from": "D-Tap (Anton/Bauer 2-pin)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": ["D-Tap (Anton/Bauer 2-pin)", "LBUS 4-pin (LEMO)"],
            "lengthM": 0.3,
            "orientation": "straight",
            "type": "LBUS power cable",
            "compatibleDevices": ["ARRI Master Grips", "ARRI OCU-1", "ARRI cforce motors (LBUS power)"],
            "compatibleControllers": ["ARRI OCU-1", "ARRI Master Grips"],
            "notes": "Standard ARRI length is 0.8 m; 0.3 m variant not listed by ARRI—treated as short custom lead.",
            "useCase": ["Power"],
            "provenance": [{
              "url": "https://www.arri.com/resource/blob/296408/479a0d9b446577b2544678c534526107/master-grips-sup-2-0-2-release-notes-data.pdf"
            }, {
              "url": "https://www.arri.com/en/camera-systems/electronic-control-system/lcubes"
            }]
          },
          "D-Tap to Lemo-2-pin Cable 0,5m": {
            "brand": "ARRI",
            "kNumber": "K2.0006758",
            "from": "D-Tap (Anton/Bauer 2-pin)",
            "to": "LBUS 4-pin (LEMO)",
            "connectors": ["D-Tap (Anton/Bauer 2-pin)", "LBUS 4-pin (LEMO)"],
            "lengthM": 0.5,
            "orientation": "straight",
            "type": "LBUS power cable",
            "compatibleDevices": ["ARRI Master Grips", "ARRI OCU-1", "ARRI cforce motors (LBUS power)"],
            "compatibleControllers": ["ARRI OCU-1", "ARRI Master Grips"],
            "notes": "Standard ARRI length is 0.8 m; 0.5 m variant not listed by ARRI—treated as short custom lead.",
            "useCase": ["Power"],
            "provenance": [{
              "url": "https://www.arri.com/resource/blob/296408/479a0d9b446577b2544678c534526107/master-grips-sup-2-0-2-release-notes-data.pdf"
            }]
          },
          "ultra slim 3G-SDI BNC cable 0,3m": {
            "lengthM": 0.3,
            "connectors": ["BNC", "BNC"],
            "orientation": "straight",
            "type": "3G-SDI",
            "notes": "ultra slim",
            "useCase": ["Video"]
          },
          "ultra slim 3G-SDI BNC cable 0,5m": {
            "lengthM": 0.5,
            "connectors": ["BNC", "BNC"],
            "orientation": "straight",
            "type": "3G-SDI",
            "notes": "ultra slim",
            "useCase": ["Video"]
          },
          "Cable CAM (10-pin) – EXT (7-pin)": {
            "brand": "ARRI",
            "kNumber": "K2.0007730",
            "lengthM": 0.5,
            "connectors": ["CAM (10-pin)", "EXT (7-pin)"],
            "orientation": "straight",
            "useCase": ["Run/Stop", "Tally"],
            "compatibleControllers": ["SMC-1", "EMC-1", "AMC-1"],
            "compatibleCameras": ["ALEXA Mini", "ALEXA Mini LF"]
          },
          "Cable CAM (10-pin) – RS (3-pin)": {
            "brand": "ARRI",
            "kNumber": "K2.0001606",
            "lengthM": 0.5,
            "connectors": ["CAM (10-pin)", "ARRI RS (3-pin)"],
            "orientation": "straight",
            "useCase": ["Run/Stop", "Tally"],
            "compatibleControllers": ["SMC-1", "EMC-1", "AMC-1"],
            "compatibleCameras": ["ALEXA", "AMIRA"]
          },
          "Cable CAM (10-pin) – D-Tap": {
            "brand": "ARRI",
            "kNumber": "K2.0002682",
            "lengthM": 0.5,
            "connectors": ["CAM (10-pin)", "D-Tap"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleControllers": ["SMC-1", "EMC-1", "AMC-1"]
          },
          "Cable CAM (10-pin) – LANC/D-Tap": {
            "brand": "ARRI",
            "kNumber": "K2.0001999",
            "lengthM": 0.5,
            "connectors": ["CAM (10-pin)", "LANC + D-Tap"],
            "orientation": "straight",
            "useCase": ["Run/Stop", "Tally", "Power"],
            "compatibleControllers": ["SMC-1", "EMC-1", "AMC-1"],
            "compatibleCameras": ["Canon C300/500", "Sony PXW-FS7"]
          },
          "Cable CAM (10-pin) – Sony F5/55": {
            "brand": "ARRI",
            "kNumber": "K2.0001997",
            "lengthM": 0.5,
            "connectors": ["CAM (10-pin)", "Sony Remote"],
            "orientation": "straight",
            "useCase": ["Run/Stop", "Tally"],
            "compatibleControllers": ["SMC-1", "EMC-1", "AMC-1"],
            "compatibleCameras": ["Sony F5", "Sony F55", "Sony Venice", "Panasonic Varicam 35"]
          },
          "Cable CAM (10-pin) – RED EPIC/D-Tap": {
            "brand": "ARRI",
            "kNumber": "K2.0001998",
            "lengthM": 1,
            "connectors": ["CAM (10-pin ×2)", "RED EPIC + D-Tap"],
            "orientation": "straight",
            "useCase": ["Run/Stop", "Power"],
            "compatibleControllers": ["SMC-1", "EMC-1", "AMC-1"],
            "compatibleCameras": ["RED EPIC", "RED Weapon"]
          },
          "Cable CAM (10-pin) – PSC": {
            "brand": "ARRI",
            "kNumber": "K2.0002727",
            "lengthM": 0.7,
            "connectors": ["CAM (10-pin)", "PSC"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleControllers": ["SMC-1", "EMC-1", "AMC-1"]
          },
          "Cable CAM (10-pin) – Open End": {
            "brand": "ARRI",
            "kNumber": "K2.0002725",
            "lengthM": 0.5,
            "connectors": ["CAM (10-pin)", "Open End"],
            "orientation": "straight",
            "useCase": ["Custom"],
            "compatibleControllers": ["SMC-1", "EMC-1", "AMC-1"]
          },
          "Cable Cooke/i Lens Control (16-pin)": {
            "brand": "ARRI",
            "kNumber": "K2.65012.0",
            "lengthM": 0.7,
            "connectors": ["CAM (16-pin)", "Cooke/i"],
            "orientation": "straight",
            "useCase": ["Lens Control"],
            "compatibleControllers": ["Universal Motor Controller"]
          },
          "Battery Adapter VMicro (WVR-1s)": {
            "brand": "ARRI",
            "kNumber": "K2.0024373",
            "lengthM": null,
            "connectors": ["VMicro Battery", "LEMO 12 V Out (2-pin)"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleDevices": ["WVR-1s Wireless Video Receiver"]
          },
          "Battery Adapter AMicro (WVR-1s)": {
            "brand": "ARRI",
            "kNumber": "K2.0024374",
            "lengthM": null,
            "connectors": ["AMicro Battery", "LEMO 12 V Out (2-pin)"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleDevices": ["WVR-1s"]
          },
          "Receiver Power Supply (RPS-1)": {
            "brand": "ARRI",
            "kNumber": "K2.0014774",
            "lengthM": null,
            "connectors": ["AC In", "Output to WVR-1"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleDevices": ["WVR-1", "WVT-1", "UMC-4"]
          },
          "PWR OUT Lemo (2-pin) – RS/PWR IN Fischer (3-pin)": {
            "brand": "ARRI",
            "kNumber": "K2.0014331",
            "lengthM": 0.5,
            "connectors": ["LEMO 2-pin", "Fischer 3-pin"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleDevices": ["WVR-1", "WVT-1", "UMC-4"]
          },
          "PWR OUT Lemo (2-pin) – XLR (4-pin)": {
            "brand": "ARRI",
            "kNumber": "K2.0014342",
            "lengthM": 0.5,
            "connectors": ["LEMO 2-pin", "XLR 4-pin"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleDevices": ["Camera/Monitor from battery plate or WVR-1"]
          },
          "PWR OUT Lemo (2-pin) – MiniXLR (4-pin)": {
            "brand": "ARRI",
            "kNumber": "K2.0014343",
            "lengthM": 0.5,
            "connectors": ["LEMO 2-pin", "MiniXLR 4-pin"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleDevices": ["External camera monitor"]
          },
          "PWR OUT Lemo (2-pin) – Hi (4-pin Hirose)": {
            "brand": "ARRI",
            "kNumber": "K2.0014344",
            "lengthM": 0.5,
            "connectors": ["LEMO 2-pin", "Hirose 4-pin"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleDevices": ["External camera monitor"]
          },
          "PWR OUT Lemo (2-pin) – Lemo 5-pin": {
            "brand": "ARRI",
            "kNumber": "K2.0014777",
            "lengthM": 0.5,
            "connectors": ["LEMO 2-pin", "LEMO 5-pin"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleDevices": ["Camera accessories"]
          },
          "PWR OUT Lemo (2-pin) – LCS (5-pin)": {
            "brand": "ARRI",
            "kNumber": "K2.0024590",
            "lengthM": 0.3,
            "connectors": ["LEMO 2-pin", "LCS 5-pin"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleDevices": ["WCU-4", "SXU-1"]
          },
          "Monitor Power 12 V (Lemo 0B 2-pin to XLR 4-pin)": {
            "brand": "ARRI",
            "kNumber": "K2.0006760",
            "from": "LBUS 4-pin (LEMO 0B)",
            "to": "XLR 4-pin",
            "connectors": ["LBUS 4-pin (LEMO 0B)", "XLR 4-pin"],
            "lengthM": 0.8,
            "orientation": "straight",
            "type": "LBUS power breakout",
            "compatibleDevices": ["Monitors with XLR-4 12V input", "ARRI LBUS-powered accessories (as source)"],
            "notes": "LBUS power to XLR-4 (12 V) per ARRI LCUBE/UMC ecosystem cable list.",
            "useCase": ["Power"],
            "provenance": [{
              "url": "https://www.arri.com/en/camera-systems/electronic-control-system/lcubes"
            }]
          },
          "Monitor Power 12 V (Lemo 0B 2-pin to Lemo 0B 2-pin Short)": {
            "brand": "ARRI",
            "kNumber": "K2.0041723",
            "lengthM": null,
            "connectors": ["LEMO 0B 2-pin", "LEMO 0B 2-pin"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleDevices": ["ARTEMIS/TRINITY"]
          },
          "360 EVO D-Tap / XLR Battery Power to RCP or Monitor": {
            "brand": "ARRI",
            "kNumber": "K2.0021422",
            "lengthM": 1.5,
            "connectors": ["D-Tap", "XLR 4-pin"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleDevices": ["360 EVO", "SRH-3", "SRH-360"]
          },
          "MTG Monitor Power (Lemo 0B 4-pin to Lemo 0B 2-pin, 24 V)": {
            "brand": "ARRI",
            "kNumber": "K2.0038998",
            "lengthM": null,
            "connectors": ["LEMO 0B 4-pin", "LEMO 0B 2-pin"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleDevices": ["Master Grip", "TRINITY 2"]
          },
          "MTG Monitor Power (Lemo 0B 4-pin to Lemo 0B 5-pin, 24 V)": {
            "brand": "ARRI",
            "kNumber": "K2.0038999",
            "lengthM": null,
            "connectors": ["LEMO 0B 4-pin", "LEMO 0B 5-pin"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleDevices": ["Master Grip", "TRINITY 2"]
          },
          "TRINITY 2 Joystick Cable": {
            "brand": "ARRI",
            "kNumber": "K2.0043861",
            "lengthM": 0.75,
            "connectors": ["LEMO 0B 4-pin", "LEMO 0B 4-pin"],
            "orientation": "straight",
            "useCase": ["Control"],
            "compatibleDevices": ["TRINITY 2"]
          },
          "SRH FS CAN Bus Cable": {
            "brand": "ARRI",
            "kNumber": "K2.0037788",
            "lengthM": 0.3,
            "connectors": ["FS CAN Bus"],
            "orientation": "straight",
            "useCase": ["Control"],
            "compatibleDevices": ["SRH-3", "SRH-360", "360 EVO"]
          },
          "SRH High-Capacity Battery Power Cable Set (12 V/24 V, 0.5 m)": {
            "brand": "ARRI",
            "kNumber": "K0.0021437",
            "lengthM": 0.5,
            "connectors": ["XLR 4-pin 12 V", "XLR 3-pin 24 V"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleDevices": ["SRH-3", "SRH-360", "360 EVO"]
          },
          "SRH High-Capacity Battery Power Cable 24 V, 20 m": {
            "brand": "ARRI",
            "kNumber": "K2.0021429",
            "lengthM": 20,
            "connectors": ["XLR 3-pin 24 V"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleDevices": ["SRH systems"]
          },
          "SRH High-Capacity Battery Power Cable 12 V, 20 m": {
            "brand": "ARRI",
            "kNumber": "K2.0021430",
            "lengthM": 20,
            "connectors": ["XLR 4-pin 12 V"],
            "orientation": "straight",
            "useCase": ["Power"],
            "compatibleDevices": ["SRH systems"]
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
          "kNumber": "K2.0044880",
          "capacityGb": 960,
          "capacityTb": 1,
          "interface": "PCIe, sustained ~8 Gb/s write"
        },
        "ARRI Codex Compact Drive 2TB": {
          "brand": "ARRI",
          "model": "Codex Compact Drive 2TB",
          "kNumber": "K2.0044881",
          "capacityGb": 1920,
          "capacityTb": 2,
          "interface": "PCIe NVMe, up to 16 Gb/s write"
        },
        "ARRI Codex Compact Drive Express 1TB": {
          "brand": "ARRI",
          "model": "Codex Compact Drive Express 1TB",
          "kNumber": "K2.0046663",
          "capacityGb": 960,
          "capacityTb": 1,
          "interface": "PCIe (ProRes-only)"
        },
        "ARRI Codex Compact Drive Reader (USB-C)": {
          "brand": "ARRI",
          "kNumber": "K2.0024130",
          "interface": "USB 3.1 Gen 2 (USB-C, ~8 Gb/s), bus-powered"
        },
        "OWC Atlas Ultra CFexpress Type B 1TB": {
          "brand": "OWC",
          "model": "Atlas Ultra 1TB",
          "kNumber": "OWC CFXB1TBATLU",
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress Type B (PCIe)"
        },
        "ProGrade Digital CFexpress Type B 1TB Gold": {
          "brand": "ProGrade",
          "model": "CFexpress Type B Gold 1TB",
          "kNumber": "PGCFX128GBCE-GNAN (series uses capacity-specific SKUs)",
          "capacityGb": 1024,
          "capacityTb": 1,
          "interface": "CFexpress Type B (NVMe / PCIe)"
        },
        "RED MINI-MAG 480GB": {
          "brand": "RED",
          "model": "MINI-MAG 480GB",
          "kNumber": "750-0080",
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
          "kNumber": "AXS-AR1",
          "interface": "USB 3.0"
        },
        "Sony SxS PRO+ 64GB card (E-Series)": {
          "brand": "Sony",
          "model": "SBP64E",
          "kNumber": "SBS-64G1C",
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
          "lensType": "spherical",
          "minFocusMeters": 1.2,
          "weight_g": 7300,
          "imageCircleMm": 31.4,
          "lengthMm": 377.4
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
          "notes": "From ARRI Signature Prime technical data: MOD 0.35 m, length 239 mm, front Ø 134 mm."
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
          "notes": "From ARRI data: length 197 mm, front Ø 156 mm."
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
          "notes": "ARRI specs: length 178 mm, front Ø 114 mm."
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
          "notes": "From ARRI table: same length as 18mm, front Ø same."
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
          "notes": "From ARRI spec: 25 mm same length as 18/21 mm."
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
          "notes": "From ARRI spec."
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
          "notes": "ARRI spec: same as others, length 178 mm."
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
          "notes": "From ARRI spec."
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
          "notes": "B&H listing: front 114 mm, weight 4 lb (~1814 g), close focus 9\" (~0.23 m) from lens front."
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
          "notes": "From ARRI spec table."
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
          "notes": "ARRI spec table lists weight 1.9 kg."
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
          "notes": "ARRI spec table gives MOD 0.85 m."
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
          "notes": "From ARRI spec."
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
          "notes": "ARRI spec: length 208 mm, weight 3.25 kg."
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
          "notes": "From ARRI spec: length 218 mm for 200 mm T2.5."
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
          "notes": "ARRI spec: length 278 mm, front Ø 134 mm."
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
          "notes": "From ARRI technical data: 16-32 mm, MOD = 0.45 m."
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
          "notes": "ARRI technical data for length, weight, and MOD; LDS-2/Cooke /i metadata compatible."
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
          "notes": "ARRI technical data for 1 m MOD, 300 mm length, and 3.6 kg weight; LDS-2/Cooke /i metadata compatible."
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
          "notes": "ARRI lists 1.8 m MOD from sensor plane (1.337 m from lens front) with LDS-2/Cooke /i metadata."
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
          "minFocusMeters": 0.35,
          "weight_g": 2000,
          "lengthMm": 130
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
          "minFocusMeters": 0.35,
          "weight_g": 2900,
          "lengthMm": 172
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
          "minFocusMeters": 0.3,
          "weight_g": 2000,
          "lengthMm": 140
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
          "minFocusMeters": 0.22,
          "weight_g": 1800,
          "lengthMm": 112
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
          "lengthMm": 94
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
          "lengthMm": 91
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
          "mount": "PL",
          "rodStandard": "15mm",
          "rodLengthCm": 30,
          "needsLensSupport": false,
          "lensType": "spherical",
          "minFocusMeters": 0.38,
          "weight_g": 1000,
          "lengthMm": 91
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
          "lengthMm": 91
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
          "weight_g": 1100,
          "lengthMm": 91
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
          "lengthMm": 91
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
          "lengthMm": 91
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
          "minFocusMeters": 1.5,
          "weight_g": 1600,
          "lengthMm": 119
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
          "minFocusMeters": 2.6,
          "weight_g": 2600,
          "lengthMm": 166
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
          "notes": "Front Ø114 mm. Data from ZEISS Master Prime technical specifications."
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
          "lengthMm": 205
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
          "lensType": "spherical",
          "lengthMm": 189,
          "minFocusMeters": 0.45,
          "weight_g": 3500,
          "imageCircleMm": 46.31
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
          "lensType": "spherical",
          "minFocusMeters": 0.475,
          "weight_g": 3300,
          "lengthMm": 189,
          "imageCircleMm": 46.31,
          "notes": "T2.0-T22"
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
        "Sachtler flowtech 75 aktiv / 75 (MS/GS)": {
          "brand": "Sachtler",
          "model": "flowtech 75 aktiv / 75 (MS/GS)",
          "material": "Carbon Fiber",
          "stages": 2,
          "bowlSizeMm": 75,
          "bowlMount": [75],
          "payloadKg": 20,
          "heightRangeCm": "26–153",
          "weightKg": 2.9,
          "spreader": ["ground", "mid-level", "none"],
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
          "bowlMount": [100],
          "payloadKg": 30,
          "heightRangeCm": "26–153",
          "weightKg": 3.2,
          "spreader": ["ground", "mid-level", "none"],
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
          "bowlMount": [100],
          "payloadKg": 40,
          "heightRangeCm": "13–27",
          "weightKg": 1.5,
          "spreader": ["ground"],
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
          "bowlMount": [150],
          "payloadKg": 40,
          "heightRangeCm": "15–39",
          "weightKg": 3.1,
          "spreader": ["ground"],
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
          "bowlMount": [150],
          "payloadKg": 50,
          "heightRangeCm": "21–85",
          "weightKg": 3.9,
          "spreader": ["ground", "mid-level"],
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
          "bowlMount": [100],
          "payloadKg": 80,
          "heightRangeCm": "65–142",
          "weightKg": 4.4,
          "spreader": ["ground", "mid-level"],
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
          "bowlMount": [150],
          "payloadKg": 90,
          "heightRangeCm": "79–166",
          "weightKg": 5,
          "spreader": ["ground", "mid-level"],
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
          "bowlMount": [100],
          "payloadKg": 45,
          "heightRangeCm": "65–142",
          "weightKg": 2.4,
          "spreader": ["ground", "mid-level"],
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
          "bowlMount": [75],
          "payloadKg": 15,
          "heightRangeCm": "54–138",
          "weightKg": 2,
          "spreader": ["none"],
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
          "bowlMount": [100],
          "payloadKg": 95,
          "heightRangeCm": "56–157",
          "weightKg": 4,
          "spreader": ["mid-level", "ground"],
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
          "bowlMount": ["Mitchell", 150],
          "payloadKg": 95,
          "heightRangeCm": "58–154",
          "weightKg": 4.1,
          "spreader": ["mid-level", "ground"],
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
          "bowlMount": ["Mitchell", 150],
          "payloadKg": 140,
          "heightRangeCm": "85–176",
          "weightKg": 13.3,
          "spreader": ["ground"],
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
          "bowlMount": ["Mitchell", 150],
          "payloadKg": null,
          "heightRangeCm": "89–173",
          "weightKg": 10,
          "spreader": ["ground"],
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
          "bowlMount": ["Mitchell", 150],
          "payloadKg": null,
          "heightRangeCm": "25–85",
          "weightKg": 8.2,
          "spreader": ["ground"],
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
          "bowlMount": [150, "Mitchell", 100],
          "payloadKg": null,
          "heightRangeCm": "86–178",
          "weightKg": 6.4,
          "spreader": ["ground"],
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
          "bowlMount": [150, "Mitchell", 100],
          "payloadKg": null,
          "heightRangeCm": "18–91",
          "weightKg": 5,
          "spreader": ["ground"],
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
          "bowlMount": [100, 75],
          "payloadKg": null,
          "heightRangeCm": "73–157",
          "weightKg": 3.6,
          "spreader": ["mid-level", "ground"],
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
          "bowlMount": [75],
          "payloadKg": 20,
          "heightRangeCm": "29–155",
          "weightKg": 3.5,
          "spreader": ["mid-level"],
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
          "bowlMount": [100],
          "payloadKg": 45.4,
          "heightRangeCm": "44–153",
          "weightKg": 3.2,
          "spreader": ["mid-level", "ground"],
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
          "bowlMount": [100],
          "payloadKg": 22.7,
          "heightRangeCm": "25–52",
          "weightKg": null,
          "spreader": ["ground"],
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
          "bowlMount": [100],
          "payloadKg": 40,
          "heightRangeCm": "47–157",
          "weightKg": 3.1,
          "spreader": ["ground", "mid-level"],
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
          "bowlMount": [75],
          "payloadKg": 25,
          "heightRangeCm": "41–150",
          "weightKg": 2.6,
          "spreader": ["ground", "mid-level", "none"],
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
          "bowlMount": [75],
          "payloadKg": 25,
          "heightRangeCm": "59–149",
          "weightKg": 2.3,
          "spreader": ["mid-level", "ground"],
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
          "travelCm": [90, 190],
          "payloadHorizontalKg": 15,
          "bowlMount": [75, 100, 150, "Mitchell", "Flat"],
          "driveType": "manual (roller bearings)",
          "motorized": false,
          "weightKg": [7.6, 10.3],
          "material": "aluminum/steel",
          "features": "over/under-slung use; magnetic end-stops; modular extension",
          "dimensionsCm": ["126 × 14 × —", "226 × 14 × —"],
          "notes": "Base 120 cm rail: 90 cm travel, 7.6 kg. Extended 220 cm rail: 190 cm travel, 10.3 kg. Payload 15 kg."
        },
        "Kessler CineSlider 5 ft (60.5\")": {
          "brand": "Kessler",
          "model": "CineSlider 5 ft (60.5\")",
          "travelCm": 130,
          "payloadHorizontalKg": 36.3,
          "payloadVerticalKg": 15.9,
          "bowlMount": ["Flat", 100],
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
          "bowlMount": ["Flat"],
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
          "travelCm": [43, 79],
          "payloadHorizontalKg": 9.1,
          "bowlMount": ["Flat"],
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
          "travelCm": [64, 345],
          "payloadHorizontalKg": 68,
          "bowlMount": [75, 100, 150, "Mitchell", "Flat"],
          "driveType": "manual (hybrid rolling/sliding bearings)",
          "motorized": false,
          "weightKg": [7.7, 24.5],
          "material": "aluminum/brass/stainless",
          "features": "modular rail lengths; carriage uses hybrid bearings; wide footprint",
          "notes": "Travel 25–136″ (64–345 cm), payload 150 lb / 68 kg."
        },
        "Dana Dolly Universal Track Ends": {
          "brand": "Dana Dolly",
          "model": "Universal Track Ends",
          "bowlMount": [75, 100, "Mitchell", "Flat"],
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
          "bowlMount": ["Flat"],
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
          "bowlMount": ["Flat"],
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
          "bowlMount": ["Flat"],
          "driveType": "motorized",
          "motorized": true,
          "features": "motorized travel slider"
        },
        "iFootage Shark Slider Nano II": {
          "brand": "iFootage",
          "model": "Shark Slider Nano II",
          "travelCm": [23.3, 43.3],
          "payloadHorizontalKg": 7,
          "payloadVerticalKg": 3.5,
          "bowlMount": ["Flat"],
          "driveType": "motorized (brushless servo)",
          "motorized": true,
          "weightKg": [2.8, 3.1],
          "material": "aluminum + carbon fiber",
          "features": "dual-axis (pan + slide), app control",
          "dimensionsCm": ["463 × 133 × 99", "663 × 133 × 99"],
          "notes": "Payload 7 kg horizontal, 3.5 kg vertical."
        },
        "iFootage Shark Slider Mini": {
          "brand": "iFootage",
          "model": "Shark Slider Mini",
          "travelCm": 60,
          "payloadHorizontalKg": 2.5,
          "bowlMount": ["Flat"],
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
          "bowlMount": [75, 100, 150, "Mitchell", "Flat"],
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
          "bowlMount": ["Mitchell", "Flat"],
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
          "bowlMount": ["Mitchell", "Flat"],
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
          "bowlMount": [150, "Mitchell"],
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
          "bowlMount": ["Flat"],
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
          "bowlMount": ["Flat"],
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
          "bowlMount": ["Flat"],
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
          "bowlMount": ["Flat"],
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
          "options": ["FlowCine Serene Spring Arm", "Easyrig - STABIL G3"]
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
    "filterOptions": ["Clear", "IRND", "FSND", "Rota-Pol", "Pol", "ND Grad SE", "ND Grad HE", "BPM", "WPM", "PM", "HBM", "GG", "Pearl", "Soft FX", "Diopter"]
  };
  gear.lenses = gear.accessories.lenses;
  delete gear.accessories.lenses;
  var categories = {
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
    Object.entries(categories).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        data = _ref2[1];
      return registerDevice(name, data);
    });
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = gear;
    }
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = gear;
  } else {
    globalThis.devices = globalThis.devices || {};
    Object.entries(categories).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        name = _ref4[0],
        data = _ref4[1];
      if (name === 'accessories') {
        globalThis.devices.accessories = Object.assign(globalThis.devices.accessories || {}, data);
      } else {
        globalThis.devices[name] = data;
      }
    });
  }
})();