/* global registerDevice */
(() => {
  const brandAccessories = {
    "Inovativ": [
      {
        "name": "Inovativ 5/8\" Baby Pin Mast Adapter",
        "accessoryKind": "mount",
        "compatibleSeries": ["Voyager EVO", "Apollo", "Echo"],
        "notes": "Clamp-on mast system with 5/8\" baby pin support for monitors, lights or antennas."
      },
      {
        "name": "Inovativ Center Mast Bracket",
        "accessoryKind": "mount",
        "compatibleSeries": ["Voyager EVO", "Apollo", "Echo"],
        "notes": "Brackets the mast to the cart frame and accessory channels for rigid installs."
      },
      {
        "name": "Inovativ Accessory Crossbar & Channel Blocks",
        "accessoryKind": "support",
        "compatibleSeries": ["Voyager EVO", "Apollo", "Echo"],
        "notes": "Spanning crossbars with 3/8\"-16 / 1/4\"-20 points for cable management and rigging."
      },
      {
        "name": "Inovativ Hydraulic Brake System",
        "accessoryKind": "wheel/brake",
        "compatibleSeries": ["Echo"],
        "notes": "Hydraulic foot brake upgrade dedicated to Echo carts for hill holding and precision stops."
      },
      {
        "name": "Inovativ Threaded Rail Plate",
        "accessoryKind": "mount",
        "compatibleSeries": ["Apollo"],
        "notes": "Threaded rail plates with 1/4\"-20 and 3/8\"-16 patterns for monitor/computer mounting on Apollo frames."
      }
    ],
    "Adicam": [
      {
        "name": "Adicam Short Top Shelf Crossbar",
        "accessoryKind": "support",
        "compatibleSeries": ["MINI", "STANDARD", "STANDARD+", "MAX"],
        "notes": "Compact crossbar that adds threaded points along the top shelf edge."
      },
      {
        "name": "Adicam Long Top Shelf Crossbar",
        "accessoryKind": "support",
        "compatibleSeries": ["MINI", "STANDARD", "STANDARD+", "MAX"],
        "notes": "Longer crossbar spanning the cart width for clamps and cable routing."
      },
      {
        "name": "Adicam Ball/Bowl Mount System",
        "accessoryKind": "bowl_mount",
        "compatibleSeries": ["STANDARD", "STANDARD+", "MAX"],
        "notes": "75/100/150 mm bowl kits that clamp to the frame for mounting fluid heads."
      },
      {
        "name": "Adicam Tripod/Light Stand Holders",
        "accessoryKind": "holder",
        "compatibleSeries": ["MINI", "STANDARD", "STANDARD+", "MAX"],
        "notes": "Side-mounted clamps to secure tripods, C-stands or light stands while rolling."
      },
      {
        "name": "Adicam Steadicam/Gimbal Mounts",
        "accessoryKind": "gimbal/Steadicam",
        "compatibleSeries": ["STANDARD", "STANDARD+", "MAX"],
        "notes": "Docking brackets for Steadicam or gimbal rigs that bolt to the frame."
      },
      {
        "name": "Adicam Utility Boxes and Drawers",
        "accessoryKind": "storage",
        "compatibleSeries": ["STANDARD", "STANDARD+", "MAX"],
        "notes": "Under-shelf storage modules for filters, batteries and tools."
      },
      {
        "name": "Adicam Premium Wheel Systems",
        "accessoryKind": "wheel_system",
        "compatibleSeries": ["MINI", "STANDARD", "STANDARD+", "MAX"],
        "notes": "9\" and 10\" premium wheel sets with lighter hubs and smoother rolling resistance."
      }
    ],
    "Backstage": [
      {
        "name": "Backstage Tripod Holder with 5/8\" Baby Pin",
        "accessoryKind": "holder",
        "compatibleSeries": ["Magliner Junior", "Magliner Senior"],
        "notes": "Side-mounted tripod cradle featuring an integrated 5/8\" pin."
      },
      {
        "name": "Backstage Steadicam Riser, Swing Handles & Vest Holder",
        "accessoryKind": "gimbal/Steadicam",
        "compatibleSeries": ["Magliner Junior", "Magliner Senior"],
        "notes": "Complete Steadicam docking kit with riser, swing handles and vest storage."
      },
      {
        "name": "Backstage Net Baskets",
        "accessoryKind": "storage",
        "compatibleSeries": ["Magliner Junior", "Magliner Senior"],
        "notes": "Wire/net baskets sized for Backstage carts to hold flags, nets or grip gear."
      },
      {
        "name": "Backstage Mag Grip/Light Caddy & C-Stand Holder",
        "accessoryKind": "holder",
        "compatibleSeries": ["Magliner Junior", "Magliner Senior"],
        "notes": "Dedicated mounts for grip heads, light stands and C-stands."
      },
      {
        "name": "Backstage Magliner Middle/Sliding Shelf Kits",
        "accessoryKind": "shelf",
        "compatibleSeries": ["Magliner Junior", "Magliner Senior"],
        "notes": "Add-on shelves, including sliding variants, for additional work surfaces."
      },
      {
        "name": "Backstage Wheel Conversion Kits",
        "accessoryKind": "wheel_system",
        "compatibleSeries": ["Magliner Junior", "Magliner Senior"],
        "notes": "8\" and 10\" pneumatic caster upgrades tailored to Backstage frames."
      }
    ],
    "Tilta": [
      {
        "name": "Tilta Boulder Side Table / Utility Shelf",
        "accessoryKind": "shelf",
        "compatibleSeries": ["Boulder"],
        "notes": "Add-on side shelf for extra monitor or laptop space on Boulder carts."
      },
      {
        "name": "Tilta Boulder Monitor Mount Kit",
        "accessoryKind": "monitor_mount",
        "compatibleSeries": ["Boulder"],
        "notes": "Monitor mounting hardware that clamps to the top rails with standard 1/4\"-20 / 3/8\"-16."
      },
      {
        "name": "Tilta Boulder Rail Mounting System",
        "accessoryKind": "rail",
        "compatibleSeries": ["Boulder"],
        "notes": "Extended rail segments and brackets for additional clamps and tool racks."
      },
      {
        "name": "Tilta Accessory Brackets and Tool Racks",
        "accessoryKind": "storage",
        "compatibleSeries": ["Boulder"],
        "notes": "Utility plates, hooks and racks for cables, filters or tool rolls."
      }
    ],
    "SmallRig": [
      {
        "name": "SmallRig Clamp- and Arm-Based Mounting Ecosystem",
        "accessoryKind": "mount",
        "compatibleSeries": ["MD4573"],
        "notes": "Magic arms, monitor mounts and clamps that bolt to the cart's threaded rails."
      },
      {
        "name": "SmallRig Cable Hook / Organizer Kits",
        "accessoryKind": "storage",
        "compatibleSeries": ["MD4573"],
        "notes": "Cable hooks and organizers that attach directly to the cart frame."
      }
    ]
  };

  function cloneBrandAccessories(brand) {
    const entries = brandAccessories[brand];
    return Array.isArray(entries) ? entries.map(item => ({ ...item })) : undefined;
  }

  const cartData = {
    "Inovativ Voyager 30 EVO X": {
      "brand": "Inovativ",
      "series": "Voyager EVO",
      "model": "30",
      "dimensionsCm": {
        "assembled": { "length": 86, "width": 53, "height": 127 },
        "collapsed": { "length": 86, "width": 53, "height": 20 }
      },
      "weightKg": 26.3,
      "payloadCapacityKg": 181,
      "wheelConfig": {
        "standard": {
          "diameterIn": 10,
          "system": "EVO",
          "tireType": "pneumatic",
          "notes": "Ships with Inovativ EVO sealed-bearing 10\" pneumatic wheels."
        },
        "options": [
          {
            "name": "NXT open-bearing wheels",
            "notes": "Lower-cost open-bearing wheel set offered as a separate SKU."
          }
        ]
      },
      "config": {
        "twoShelves": true,
        "collapsible": true,
        "toolFreeAssembly": true,
        "heightAdjustableTopShelf": true
      },
      "notes": "Smallest Voyager with 30\" class top shelf and 400 lb frame rating. Packs down to roughly 8.25\" depth with integrated wheel bags.",
      "accessories": [
        "Inovativ Accessory Crossbar",
        "Inovativ Accessory Channel Blocks",
        "Inovativ 5/8\" Baby Pin Mast Adapter",
        "Inovativ Center Mast Bracket",
        "Inovativ Monitor/Keyboard Workstation Accessories"
      ],
      "brandAccessories": cloneBrandAccessories("Inovativ")
    },
    "Inovativ Voyager 36 EVO X": {
      "brand": "Inovativ",
      "series": "Voyager EVO",
      "model": "36",
      "dimensionsCm": {
        "assembled": { "length": 101, "width": 63, "height": 129 },
        "collapsed": { "length": 101, "width": 63, "height": 20 }
      },
      "weightKg": 34.5,
      "payloadCapacityKg": 272,
      "wheelConfig": {
        "standard": {
          "diameterIn": 10,
          "system": "EVO",
          "tireType": "pneumatic",
          "notes": "10\" EVO sealed-bearing pneumatic wheels."
        },
        "options": [
          {
            "name": "NXT wheel set",
            "notes": "Open-bearing wheels available as a lower-cost configuration."
          }
        ]
      },
      "config": {
        "twoShelves": true,
        "collapsible": true,
        "toolFreeAssembly": true,
        "heightAdjustableTopShelf": true
      },
      "notes": "Most common Voyager format (36\" top shelf) with ~600 lb frame rating and 200 lb top shelf rating.",
      "accessories": [
        "Inovativ Keyboard-Friendly Top Shelf Lip",
        "Inovativ 5/8\" Baby Pin Mast Adapter",
        "Inovativ Center Mast Bracket",
        "Inovativ Quick Grips",
        "Inovativ Umbrella/Monitor Shade Mount",
        "Inovativ Drawers and Brackets",
        "Inovativ Threaded Rail Plates"
      ],
      "brandAccessories": cloneBrandAccessories("Inovativ")
    },
    "Inovativ Voyager 42 EVO X": {
      "brand": "Inovativ",
      "series": "Voyager EVO",
      "model": "42",
      "dimensionsCm": {
        "assembled": { "length": 116, "width": 63, "height": 129 },
        "collapsed": { "length": 116, "width": 63, "height": 20 }
      },
      "weightKg": 35.4,
      "payloadCapacityKg": 272,
      "wheelConfig": {
        "standard": {
          "diameterIn": 10,
          "system": "EVO",
          "tireType": "pneumatic",
          "notes": "10\" EVO wheel system with sealed bearings bolted through the lower shelf."
        },
        "options": [
          {
            "name": "NXT wheel set",
            "notes": "Alternate open-bearing wheels supplied under separate SKUs."
          }
        ]
      },
      "config": {
        "twoShelves": true,
        "collapsible": true,
        "toolFreeAssembly": true,
        "heightAdjustableTopShelf": true
      },
      "notes": "Largest Voyager with 42\" work surface while keeping the 600 lb frame rating.",
      "accessories": [
        "Inovativ Accessory Crossbar (Long)",
        "Inovativ Quick Grips",
        "Inovativ 5/8\" Baby Pin Mast Adapter",
        "Inovativ Center Mast Bracket",
        "Inovativ Steadicam/Gimbal Dock Accessories"
      ],
      "brandAccessories": cloneBrandAccessories("Inovativ")
    },
    "Inovativ Apollo 40 EVO": {
      "brand": "Inovativ",
      "series": "Apollo",
      "model": "40",
      "dimensionsCm": {
        "assembled": { "length": 106.6, "width": 66, "height": 101.6 },
        "collapsed": { "length": 106.6, "width": 66, "height": 19 }
      },
      "weightKg": 46,
      "payloadCapacityKg": 540,
      "wheelConfig": {
        "standard": {
          "diameterIn": 10,
          "system": "EVO",
          "tireType": "pneumatic",
          "notes": "Heavy-duty EVO pneumatic wheels shared with the Echo platform."
        }
      },
      "config": {
        "twoShelves": true,
        "collapsible": true,
        "toolFreeAssembly": true,
        "heightAdjustableTopShelf": true
      },
      "notes": "Heavy-duty collapsible workstation rated for ~1,200 lb payload with drop or raised lip modes on the top shelf.",
      "accessories": [
        "Inovativ Threaded Rail Plates",
        "Inovativ Keyboard Top Shelf Lip",
        "Inovativ 5/8\" Baby Pin Mast Adapter",
        "Inovativ Center Mast Bracket",
        "Inovativ Monitor Mounts",
        "Inovativ Umbrella/Shade Mount",
        "Inovativ Drawer Kits"
      ],
      "brandAccessories": cloneBrandAccessories("Inovativ")
    },
    "Inovativ Apollo 52 EVO": {
      "brand": "Inovativ",
      "series": "Apollo",
      "model": "52",
      "dimensionsCm": {
        "assembled": { "length": 137.1, "width": 66, "height": 101.6 },
        "collapsed": { "length": 137.1, "width": 66, "height": 19 }
      },
      "weightKg": 52,
      "payloadCapacityKg": 540,
      "wheelConfig": {
        "standard": {
          "diameterIn": 10,
          "system": "EVO",
          "tireType": "pneumatic",
          "notes": "10\" sealed-bearing EVO wheels mounted to the reinforced lower shelf."
        }
      },
      "config": {
        "twoShelves": true,
        "collapsible": true,
        "toolFreeAssembly": true,
        "heightAdjustableTopShelf": true
      },
      "notes": "Largest Apollo variant with 52\" surface and ~150 lb top shelf rating due to the span.",
      "accessories": [
        "Inovativ Threaded Rail Plates",
        "Inovativ Monitor/Computer Mounting Kits",
        "Inovativ Baby Pin Mounts",
        "Inovativ Center Mast Bracket",
        "Inovativ Cable Management Ports",
        "Inovativ Drawer and Rack Mount Options"
      ],
      "brandAccessories": cloneBrandAccessories("Inovativ")
    },
    "Inovativ Echo 36 Workstation Cart": {
      "brand": "Inovativ",
      "series": "Echo",
      "model": "36",
      "dimensionsCm": {
        "assembled": { "length": 111.7, "width": 64.1, "height": 101.2 },
        "collapsed": { "length": 102.8, "width": 64.1, "height": 55.8 }
      },
      "weightKg": 42.2,
      "payloadCapacityKg": 450,
      "wheelConfig": {
        "standard": {
          "diameterIn": 10,
          "system": "EVO",
          "tireType": "pneumatic",
          "notes": "Permanently attached EVO wheels with optional hydraulic brake upgrade."
        }
      },
      "config": {
        "twoShelves": true,
        "semiCollapsible": true,
        "toolFreeAssembly": true,
        "heightAdjustableTopShelf": true,
        "integratedDrawers": true
      },
      "notes": "Semi-collapsible workstation with SLAS adjustable top shelf (38.25\"–48.25\") and combo-locking drawers.",
      "accessories": [
        "Inovativ Hydraulic Brake System (Echo only)",
        "Inovativ Quick Grips",
        "Inovativ Accessory Crossbars",
        "Inovativ 5/8\" Baby Pin Mast Adapter",
        "Inovativ Center Mast Bracket",
        "Inovativ Monitor Arms and VESA Mounts"
      ],
      "brandAccessories": cloneBrandAccessories("Inovativ")
    },
    "Inovativ Echo 48 Workstation Cart": {
      "brand": "Inovativ",
      "series": "Echo",
      "model": "48",
      "dimensionsCm": {
        "assembled": { "length": 121.9, "width": 64.1, "height": 101.2 },
        "collapsed": { "length": 133.3, "width": 64.1, "height": 55.8 }
      },
      "weightKg": 52.2,
      "payloadCapacityKg": 450,
      "wheelConfig": {
        "standard": {
          "diameterIn": 10,
          "system": "EVO",
          "tireType": "pneumatic",
          "notes": "Permanent EVO wheels identical to the Echo 36 system."
        }
      },
      "config": {
        "twoShelves": true,
        "semiCollapsible": true,
        "toolFreeAssembly": true,
        "heightAdjustableTopShelf": true,
        "integratedDrawers": true
      },
      "notes": "Echo workstation with 48\" top shelf and integrated drawers with cable pass-through.",
      "accessories": [
        "Inovativ Hydraulic Brake System (Echo only)",
        "Inovativ Quick Grips",
        "Inovativ Accessory Crossbars",
        "Inovativ 5/8\" Baby Pin Mast Adapter",
        "Inovativ Center Mast Bracket",
        "Inovativ Monitor Arms and VESA Mounts"
      ],
      "brandAccessories": cloneBrandAccessories("Inovativ")
    },
    "Adicam MINI Camera Cart": {
      "brand": "Adicam",
      "series": "MINI",
      "model": "MINI",
      "dimensionsCm": {
        "assembled": { "length": 86, "width": 63, "height": 98 },
        "collapsed": { "length": 86, "width": 63, "height": 15 }
      },
      "weightKg": 28.5,
      "payloadCapacityKg": 150,
      "wheelConfig": {
        "standard": {
          "diameterIn": 8,
          "tireType": "pneumatic",
          "notes": "8\" (Ø200 mm) pneumatic wheels with sealed bearings and two brakes on swivel wheels."
        },
        "options": [
          {
            "diameterIn": 9,
            "tireType": "pneumatic",
            "notes": "9\" upgrade adds ~6.7 kg and ~20 mm of height while remaining case compatible."
          },
          {
            "diameterIn": 10,
            "tireType": "pneumatic",
            "notes": "10\" wheels add ~7.5 kg and ~50 mm of height but do not fit inside the folded case."
          }
        ]
      },
      "config": {
        "twoShelves": true,
        "collapsible": true,
        "toolFreeAssembly": true
      },
      "notes": "Suitcase-style foldable cart rated for ~150 kg loads and focused on tight locations.",
      "accessories": [
        "Adicam Short Top Shelf Crossbar",
        "Adicam Long Top Shelf Crossbar",
        "Adicam Tripod Holder",
        "Adicam Monitor/TV Mount",
        "Adicam Ball Mount / Bowl Adapter System",
        "Adicam Cable Hooks & Accessory Brackets"
      ],
      "brandAccessories": cloneBrandAccessories("Adicam")
    },
    "Adicam STANDARD Camera Cart": {
      "brand": "Adicam",
      "series": "STANDARD",
      "model": "STANDARD",
      "dimensionsCm": {
        "assembled": { "length": 104.5, "width": 63, "height": 102.5 },
        "collapsed": { "length": 104.5, "width": 63, "height": 17.5 }
      },
      "weightKg": 38,
      "payloadCapacityKg": 200,
      "wheelConfig": {
        "standard": {
          "diameterIn": 9,
          "tireType": "pneumatic",
          "notes": "9\" (Ø225 mm) pneumatic wheels with foot brakes on the swivels."
        },
        "options": [
          {
            "diameterIn": 10,
            "tireType": "pneumatic",
            "notes": "10\" pneumatic wheel option for improved rough-terrain travel."
          },
          {
            "diameterIn": 9,
            "tireType": "pneumatic (premium)",
            "notes": "9\" Premium wheels roughly 20% lighter than standard."
          },
          {
            "diameterIn": 10,
            "tireType": "pneumatic (premium)",
            "notes": "10\" Premium wheel set with integrated foot brakes and lower rolling resistance."
          }
        ]
      },
      "config": {
        "twoShelves": true,
        "collapsible": true,
        "toolFreeAssembly": true,
        "heightAdjustableLegs": true
      },
      "notes": "Workhorse double-shelf cart with threaded accessory points across the frame.",
      "accessories": [
        "Adicam Short/Long Top Shelf Crossbars",
        "Adicam Ball Mount / Bowl Mount System",
        "Adicam Tripod/Light Stand Holders",
        "Adicam Steadicam/Gimbal Mount",
        "Adicam Monitor VESA Mount",
        "Adicam Accessory Hooks & Brackets",
        "Adicam Premium Wheel System (9\" / 10\")"
      ],
      "brandAccessories": cloneBrandAccessories("Adicam")
    },
    "Adicam STANDARD+ Camera Cart": {
      "brand": "Adicam",
      "series": "STANDARD+",
      "model": "STANDARD+",
      "dimensionsCm": {
        "assembled": { "length": 104.5, "width": 63, "height": 102.5 },
        "collapsed": { "length": 104.5, "width": 63, "height": 17.5 }
      },
      "weightKg": 39.5,
      "payloadCapacityKg": 200,
      "wheelConfig": {
        "standard": {
          "diameterIn": 9,
          "tireType": "pneumatic (premium)",
          "notes": "Ships with the lighter premium 9\" wheel system."
        },
        "options": [
          {
            "diameterIn": 10,
            "tireType": "pneumatic (premium or standard)",
            "notes": "Factory 10\" configurations available with premium or standard hubs."
          }
        ]
      },
      "config": {
        "twoShelves": true,
        "collapsible": true,
        "toolFreeAssembly": true,
        "heightAdjustableLegs": true
      },
      "notes": "Premium wheel version of the Standard cart with smoother rolling resistance.",
      "accessories": [
        "Adicam Short/Long Top Shelf Crossbars",
        "Adicam Ball/Bowl Mount System",
        "Adicam Tripod/Light Stand Holders",
        "Adicam Steadicam/Gimbal Mounts",
        "Adicam Monitor VESA Mounts",
        "Adicam Utility Boxes and Drawer Modules",
        "Adicam Accessory Hangers and Cable Hooks"
      ],
      "brandAccessories": cloneBrandAccessories("Adicam")
    },
    "Adicam MAX Camera Cart": {
      "brand": "Adicam",
      "series": "MAX",
      "model": "MAX",
      "dimensionsCm": {
        "assembled": { "length": 126, "width": 63, "height": 103.5 },
        "collapsed": { "length": 126, "width": 63, "height": 18 }
      },
      "weightKg": 42.5,
      "payloadCapacityKg": 250,
      "wheelConfig": {
        "standard": {
          "diameterIn": 10,
          "tireType": "pneumatic",
          "notes": "10\" pneumatic wheels are the common configuration for MAX builds."
        },
        "options": [
          {
            "diameterIn": 9,
            "tireType": "pneumatic",
            "notes": "9\" pneumatic wheels for lower working height."
          },
          {
            "diameterIn": 9,
            "tireType": "pneumatic (premium)",
            "notes": "9\" Premium wheels for lighter rolling mass."
          },
          {
            "diameterIn": 10,
            "tireType": "pneumatic (premium)",
            "notes": "10\" Premium wheels with the best shock absorption and rolling resistance."
          }
        ]
      },
      "config": {
        "twoShelves": true,
        "collapsible": true,
        "toolFreeAssembly": true,
        "heightAdjustableLegs": true
      },
      "notes": "Largest Adicam platform (~580 x 1020 mm shelf) rated for ~250 kg loads.",
      "accessories": [
        "Adicam Ball/Bowl Mount System",
        "Adicam Steadicam/Gimbal Mounts",
        "Adicam Tripod/Light Stand Holders",
        "Adicam Monitor Mounts",
        "Adicam Utility Boxes / Drawers",
        "Adicam Crossbars and Rail Extensions",
        "Adicam Premium Wheel Systems (9\" / 10\")"
      ],
      "brandAccessories": cloneBrandAccessories("Adicam")
    },
    "SmallRig MD4573 36\" Lightweight Video Production Camera Cart": {
      "brand": "SmallRig",
      "series": "MD4573",
      "model": "MD4573-36",
      "dimensionsCm": null,
      "weightKg": null,
      "payloadCapacityKg": null,
      "wheelConfig": {
        "standard": {
          "diameterIn": 8,
          "tireType": "pneumatic",
          "notes": "Four large pneumatic wheels with two locking casters (approx. 8\" class)."
        }
      },
      "config": {
        "twoShelves": true,
        "collapsible": true,
        "toolFreeAssembly": true,
        "heightAdjustableHandles": true
      },
      "notes": "Steel/aluminum foldable cart with 36\" shelves, adjustable push handles and threaded mounting points across the rails.",
      "accessories": [
        "SmallRig Super Clamps and Magic Arms",
        "SmallRig V-Mount Battery Plates",
        "SmallRig Monitor Mounts / NATO Rail Mounts",
        "SmallRig Cable Management Hooks"
      ],
      "brandAccessories": cloneBrandAccessories("SmallRig")
    },
    "Tilta Boulder 36\" Camera Cart": {
      "brand": "Tilta",
      "series": "Boulder",
      "model": "Boulder 36",
      "dimensionsCm": null,
      "weightKg": null,
      "payloadCapacityKg": 400,
      "wheelConfig": {
        "standard": {
          "diameterIn": 9,
          "tireType": "pneumatic",
          "notes": "Four 9\" pneumatic wheels (two fixed, two swivel with brakes)."
        }
      },
      "config": {
        "twoShelves": true,
        "collapsible": true,
        "toolFreeAssembly": true,
        "heightAdjustableHandles": true,
        "sideRails": true
      },
      "notes": "Modular cart platform rated around 400 kg with integrated side rails and threaded points for Tilta accessories.",
      "kits": [
        {
          "name": "Tilta Boulder Base Set",
          "notes": "Core cart with two shelves, 9\" wheels and basic side rails."
        },
        {
          "name": "Tilta Boulder Indie/Studio Set",
          "notes": "Adds a side table, monitor mounting hardware and expanded accessory rails."
        }
      ],
      "accessories": [
        "Tilta Boulder Side Table / Utility Shelf",
        "Tilta Monitor Mounts and Spigots",
        "Tilta 15mm/19mm Rail Adapters",
        "Tilta Accessory Brackets",
        "Tilta Tool / Accessory Trays"
      ],
      "brandAccessories": cloneBrandAccessories("Tilta")
    },
    "Backstage Magliner Junior 24\" Film Cart (8\" Conversion Kit)": {
      "brand": "Backstage",
      "series": "Magliner Junior",
      "model": "MAG-01 JR-8X 24",
      "dimensionsCm": {
        "assembled": { "length": 120, "width": 62, "height": 105 },
        "collapsed": { "length": 41, "width": 67, "height": 117 }
      },
      "weightKg": 40,
      "payloadCapacityKg": 362,
      "wheelConfig": {
        "standard": {
          "diameterMainMm": 260,
          "casterDiameterMm": 200,
          "tireType": "pneumatic",
          "notes": "Standard Magliner main wheels with Backstage 8\" pneumatic caster kit."
        },
        "options": [
          {
            "name": "Backstage 10\" Wheel Conversion Kit",
            "diameterMainMm": 260,
            "casterDiameterMm": 250,
            "notes": "10\" caster upgrade for rougher terrain and curb clearance."
          }
        ]
      },
      "config": {
        "twoShelves": true,
        "collapsible": true,
        "toolFreeAssembly": true,
        "adjustableHandle": true
      },
      "notes": "Industry-standard modified Magliner Junior with ~925 x 600 mm internal shelf size and 800 lb capacity.",
      "accessories": [
        "Backstage Tripod Holder with 5/8\" Baby Pin",
        "Backstage Dovetail / Camera Plate Mounts",
        "Backstage Steadicam Riser Unit & Swing Handles",
        "Backstage Steadicam Vest Holder",
        "Backstage Magliner HD Nose Variants",
        "Backstage Magliner Middle Shelf & Sliding Shelf Kits",
        "Backstage Monitor & Whaley Rail Frames",
        "Backstage Net Baskets and Utility Boxes"
      ],
      "brandAccessories": cloneBrandAccessories("Backstage")
    },
    "Backstage Magliner Senior 24\" Film Cart (8\" Conversion Kit)": {
      "brand": "Backstage",
      "series": "Magliner Senior",
      "model": "MAG-01 SR-8X 24",
      "dimensionsCm": null,
      "weightKg": null,
      "payloadCapacityKg": 362,
      "wheelConfig": {
        "standard": {
          "diameterMainMm": 260,
          "casterDiameterMm": 200,
          "tireType": "pneumatic",
          "notes": "Magliner main wheels paired with Backstage 8\" pneumatic casters on the handle end."
        },
        "options": [
          {
            "name": "Backstage 10\" Wheel Conversion Kit",
            "diameterMainMm": 260,
            "casterDiameterMm": 250,
            "notes": "Upgrades casters to 10\" pneumatic wheels for rough surfaces."
          }
        ]
      },
      "config": {
        "twoShelves": true,
        "collapsible": true,
        "toolFreeAssembly": true
      },
      "notes": "Longer Magliner Senior frame with ~1255 x 600 mm shelf and 800 lb capacity.",
      "accessories": [
        "Backstage Mag Grip/Light Caddy",
        "Backstage Mag C-Stand Holder",
        "Backstage Tripod Holder with Baby Pin",
        "Backstage Monitor Mounts / Whaley Rail Frames",
        "Backstage Net Baskets",
        "Backstage Nose Loading Handles",
        "Backstage Magliner HD Tent and Weather Covers"
      ],
      "brandAccessories": cloneBrandAccessories("Backstage")
    },
    "Proaim Victor V1.1 (36\")": {
      "brand": "Proaim",
      "series": "Victor",
      "model": "V1.1 36",
      "dimensionsCm": {
        "assembled": { "length": 101, "width": 63, "height": 104 },
        "collapsed": { "length": 101, "width": 63, "height": 18 }
      },
      "weightKg": 40,
      "payloadCapacityKg": 200,
      "wheelConfig": {
        "standard": {
          "diameterIn": 9,
          "tireType": "pneumatic",
          "notes": "9\" pneumatic wheels."
        }
      },
      "config": {
        "twoShelves": true,
        "collapsible": true,
        "toolFreeAssembly": true
      },
      "notes": "Tool-free assembly production cart. 200kg capacity.",
      "accessories": [],
      "brandAccessories": []
    },
    "Proaim Bowado (36\")": {
      "brand": "Proaim",
      "series": "Bowado",
      "model": "Bowado 36",
      "dimensionsCm": {
        "assembled": { "length": 101, "width": 63, "height": 104 },
        "collapsed": { "length": 101, "width": 63, "height": 18 }
      },
      "weightKg": 35.7,
      "payloadCapacityKg": 200,
      "wheelConfig": {
        "standard": {
          "diameterIn": 9,
          "tireType": "pneumatic",
          "notes": "9\" pneumatic wheels."
        }
      },
      "config": {
        "twoShelves": true,
        "collapsible": true,
        "toolFreeAssembly": true
      },
      "notes": "Lightweight production cart. 200kg capacity.",
      "accessories": [],
      "brandAccessories": []
    },
    "Backstage TR-04 Camera Cart": {
      "brand": "Backstage",
      "series": "TR-04",
      "model": "TR-04",
      "dimensionsCm": {
        "assembled": { "length": 128, "width": 61, "height": 99 },
        "collapsed": { "length": 128, "width": 61, "height": 15 }
      },
      "weightKg": 40,
      "payloadCapacityKg": 450,
      "wheelConfig": {
        "standard": {
          "diameterIn": 10,
          "tireType": "pneumatic",
          "notes": "10\" pneumatic wheels."
        }
      },
      "config": {
        "twoShelves": true,
        "collapsible": true,
        "toolFreeAssembly": true
      },
      "notes": "Vertical collapsible camera cart. 1000 lbs total capacity.",
      "accessories": [],
      "brandAccessories": cloneBrandAccessories("Backstage")
    }
  };

  registerDevice('carts', cartData);
})();
