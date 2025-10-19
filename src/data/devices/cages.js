/* global registerDevice */
(() => {
const cageData = {
  "Tilta Full Camera Cage for BMPCC 6K Pro/G2 (TA-T11-FCC)": {
    "brand": "Tilta",
    "compatible": [
      "Blackmagic Pocket Cinema Camera 6K Pro",
      "Blackmagic BMPCC 6K G2"
    ],
    "material": "aluminum, steel",
    "weight_g": 187.3,
    "batteryMount": "none",
    "kNumber": "TA-T11-FCC",
    "rodStandard": [
      "15mm LWS (via bracket in kit)"
    ],
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "ARRI locating",
      "cold shoe",
      "NATO rail"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Tilta full cage with NATO rails and rod ports.",
    "verified_source": "https://tilta.com/shop/full-camera-cage-for-bmpcc-6k-pro/",
    "handle_extension_compatible": true
  },
  "SmallRig Full Cage for BMPCC 4K/6K (2203B)": {
    "brand": "SmallRig",
    "compatible": [
      "Blackmagic BMPCC 4K",
      "Blackmagic BMPCC 6K"
    ],
    "material": "aluminum alloy",
    "weight_g": 300,
    "kNumber": "2203B",
    "rodStandard": [
      "15mm LWS"
    ],
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "cold shoe",
      "ARRI locating"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Classic SmallRig cage for BMPCC 4K/6K.",
    "verified_source": "https://www.smallrig.com/smallrig-camera-cage-for-bmpcc-4k-2203b.html",
    "handle_extension_compatible": true
  },
  "Wooden Camera Camera Cage for BMPCC 6K Pro / 6K G2": {
    "brand": "Wooden Camera",
    "compatible": [
      "Blackmagic Pocket Cinema Camera 6K Pro",
      "Blackmagic BMPCC 6K G2"
    ],
    "material": "aluminum",
    "weight_g": 2268,
    "rodStandard": [
      "15mm LWS"
    ],
    "mounting_points": [
      "3/8\"-16 (front)",
      "ARRI locating"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "ARRI locating pins compatible.",
    "verified_source": "https://woodencamera.com/products/blackmagic-pocket-cinema-camera-6k-pro-camera-cage",
    "handle_extension_compatible": true
  },
  "Tilta Full Camera Cage for Sony FX3/FX30 V2": {
    "brand": "Tilta",
    "compatible": [
      "Sony FX3",
      "Sony FX30"
    ],
    "material": "aluminum, silicone",
    "weight_g": 160,
    "batteryMount": "none",
    "kNumber": "TA-T17-FCC-G",
    "rodStandard": [
      "15mm LWS (via single-rod holder / base options)"
    ],
    "mounting_points": [
      "ARCA QR plate",
      "1/4\"-20",
      "3/8\"-16",
      "cold shoe"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Quick release ARCA base; modular system.",
    "verified_source": "https://tilta.com/shop/full-camera-cage-for-sony-fx3-fx30-v2/",
    "handle_extension_compatible": true
  },
  "SmallRig Top Plate for Sony FX6 (3186)": {
    "brand": "SmallRig",
    "compatible": [
      "Sony FX6"
    ],
    "material": "Aluminum",
    "weight_g": 81,
    "kNumber": "3186",
    "mounting_points": [
      "ARRI rosette",
      "1/4\"-20",
      "3/8\"-16"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Fits FX6 body with rosette mounts.",
    "verified_source": "https://www.smallrig.com/smallrig-camera-cage-for-sony-fx6-3186.html",
    "handle_extension_compatible": true
  },
  "Bright Tangerine LeftField Baseplate & Cage Kit for Sony FX9": {
    "brand": "Bright Tangerine",
    "compatible": [
      "Sony FX9"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "15mm LWS",
      "ARRI locating",
      "1/4\"-20",
      "3/8\"-16"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Bright Tangerine LeftField support system for FX9.",
    "verified_source": "https://www.brighttangerine.com/",
    "handle_extension_compatible": true
  },
  "Tilta Full Camera Cage for Sony a7/a9 Series (TA-T17-FCC-G)": {
    "brand": "Tilta",
    "compatible": [
      "Sony A7",
      "Sony A7 II",
      "Sony A7 III",
      "Sony A7S",
      "Sony A7S II",
      "Sony A7R",
      "Sony A7R II",
      "Sony A7R III",
      "Sony A7R IV",
      "Sony A9"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "cold shoe",
      "1/4\"-20",
      "3/8\"-16",
      "ARRI locating",
      "NATO rail"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Tilta cage with NATO rail and ARRI locating points.",
    "verified_source": "https://www.amazon.com/dp/B081GZ7JGM",
    "handle_extension_compatible": true
  },
  "SmallRig Full Camera Cage for Sony A7R V / A7 IV / A7S III / A1 / A7R IV (3667B)": {
    "brand": "SmallRig",
    "compatible": [
      "Sony A7R V",
      "Sony A7 IV",
      "Sony A7S III",
      "Sony A1",
      "Sony A7R IV"
    ],
    "material": "aluminum alloy, stainless steel, silicone",
    "weight_g": 180,
    "mounting_points": [
      "1/4\"-20",
      "ARRI 3/8\"-16 locating",
      "cold shoe",
      "NATO rail"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Arca-Swiss base; triple lock.",
    "verified_source": "https://www.smallrigreseller.com/smallrig-full-cage-for-sony-alpha-7-iv-alpha-7s-iii-alpha-1-3667.html",
    "handle_extension_compatible": true
  },
  "Arri Sony a7S II Pro Set": {
    "brand": "ARRI",
    "compatible": [
      "Sony A7S II"
    ],
    "material": null,
    "weight_g": null,
    "batteryMount": "NP-FW50 adapter",
    "rodStandard": [
      "15mm LWS"
    ],
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "ARRI PCA kit for a7S II.",
    "verified_source": "https://www.bhphotovideo.com/c/product/1287557-REG/arri_kk_0010079_pro_set_for_sony.html",
    "handle_extension_compatible": true
  },
  "SmallRig Camera Cage for Panasonic Lumix S5 II / S5 IIX (4022)": {
    "brand": "SmallRig",
    "compatible": [
      "Panasonic Lumix S5 II",
      "Panasonic Lumix S5 IIX"
    ],
    "material": "aluminum alloy, stainless steel",
    "weight_g": 161,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "2 NATO rails",
      "2 cold shoes",
      "Arca-type quick release",
      "QD socket"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Three-point anti-twist, fits gimbals or tripods, ergonomic accessory mounting.",
    "verified_source": "https://www.bhphotovideo.com/c/product/1751740-REG/smallrig_4022_cage_for_panasonic_lumix.html",
    "handle_extension_compatible": true
  },
  "SmallRig Cage Kit for Panasonic Lumix S5 II / S5 IIX (4143)": {
    "brand": "SmallRig",
    "compatible": [
      "Panasonic Lumix S5 II",
      "Panasonic Lumix S5 IIX"
    ],
    "material": null,
    "weight_g": 303,
    "mounting_points": [
      "NATO clamp top handle",
      "cable clamp",
      "Arca-Swiss plate",
      "multiple mounting points"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Handheld kit includes quick-release top handle, HDMI/USB-C clamp.",
    "verified_source": "https://www.smallrig.com/SmallRig-Cage-Kit-for-Panasonic-LUMIX-S5-II-4143.html",
    "handle_extension_compatible": true
  },
  "SmallRig Black Mamba Cage for Panasonic Lumix S5 II / S5 IIX (4023)": {
    "brand": "SmallRig",
    "compatible": [
      "Panasonic Lumix S5 II",
      "Panasonic Lumix S5 IIX"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "Arca-Swiss compatibility",
      "anti-twist three-point lock",
      "multiple mounts"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Slim form factor; bionic design skin for protection.",
    "verified_source": "https://www.smallrig.com/uk/SmallRig-Black-Mamba-Cage-for-Panasonic-LUMIX-S5-II-4023.html",
    "handle_extension_compatible": true
  },
  "SHAPE Canon C70 Cage with Top Handle": {
    "brand": "SHAPE",
    "compatible": [
      "Canon C70"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "ARRI 3/8\"-16 anti-twist",
      "1/4\"-20",
      "cold shoe"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "C70 cage with ARRI-style threads and top handle.",
    "verified_source": "https://www.shapewlb.com/products/shape-canon-c70-camera-cage-with-top-handle",
    "handle_extension_compatible": true
  },
  "Kondor Blue Canon C70 Cage": {
    "brand": "Kondor Blue",
    "compatible": [
      "Canon C70"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "dual NATO rails",
      "1/4\"-20",
      "ARRI 3/8\"-16",
      "cold shoe"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Three-sided modular cage; compatible with Canon stock handle.",
    "verified_source": "https://kondorblue.com/products/canon-c70-cage",
    "handle_extension_compatible": true
  },
  "Bright Tangerine LeftField 3 Expert Kit for RED KOMODO & KOMODO-X": {
    "brand": "Bright Tangerine",
    "compatible": [
      "RED Komodo 6k",
      "RED Komodo X"
    ],
    "material": null,
    "rodStandard": [
      "15mm LWS"
    ],
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "NATO rail"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "LeftField 3 kit with side rails & helicoil mounts.",
    "verified_source": "https://www.brighttangerine.com/product/leftfield-3-expert-kit-for-red-komodo-komodo-x-dji-rs-4-rs-3/",
    "handle_extension_compatible": true
  },
  "Wooden Camera Complete Cage Kit for RED KOMODO": {
    "brand": "Wooden Camera",
    "compatible": [
      "RED Komodo 6k"
    ],
    "material": "aluminum",
    "weight_g": null,
    "mounting_points": [
      "ARRI locating",
      "1/4\"-20",
      "3/8\"-16"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Wooden Camera RED KOMODO cage with top plate.",
    "verified_source": "https://woodencamera.com/products/komodo-camera-cage",
    "handle_extension_compatible": true
  },
  "Tilta Camera Cage for RED V-RAPTOR / V-RAPTOR X Basic Kit": {
    "brand": "Tilta",
    "compatible": [
      "RED V-RAPTOR",
      "RED V-RAPTOR X",
      "RED V-RAPTOR 8K VV",
      "RED V-RAPTOR 8K S35"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "NATO rail",
      "ARRI rosette",
      "cold shoe",
      "1/4\"-20",
      "3/8\"-16"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Black walnut side handle; 15mm rod support and rugged cage armor.",
    "verified_source": "https://tilta.com/shop/camera-cage-for-red-v-raptor-basic-kit/?srsltid=AfmBOoq6NUGSlJqJv_fIuAE5L9KivRh1vJH5PbpxcquI_HljSX0mjhjx",
    "handle_extension_compatible": true
  },
  "Arri K0.0049871 ALEXA Mini LF Production Set 19": {
    "brand": "ARRI",
    "kNumber": "K0.0049871",
    "compatible": [
      "Arri Alexa Mini",
      "Arri Alexa Mini LF"
    ],
    "rodStandard": [
      "19mm Studio"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "19mm Studio",
      "15mm LWS",
      "ARRI locating",
      "3/8\"-16",
      "1/4\"-20"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "ARRI PCA kit including cage plates, top handle, and dedicated 19mm Studio rod support for Mini and Mini LF.",
    "verified_source": "https://www.arri.com/en/camera-systems/accessories/pro-camera-accessories",
    "handle_extension_compatible": true
  },
  "Arri KK.0015124 Studio 19mm Set ALEXA Mini V-Mount": {
    "brand": "ARRI",
    "compatible": [
      "Arri Alexa Mini",
      "Arri Alexa Mini LF"
    ],
    "kNumber": "KK.0015124",
    "rodStandard": [
      "19mm Studio"
    ],
    "batteryMount": "V-Mount",
    "mounting_points": [
      "19mm Studio",
      "15mm LWS",
      "ARRI locating",
      "3/8\"-16",
      "1/4\"-20"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "ARRI studio set focused on 19mm Studio rod support with integrated V-mount back.",
    "verified_source": "https://www.arri.com/en/camera-systems/accessories/pro-camera-accessories",
    "handle_extension_compatible": true
  },
  "Wooden Camera Cage Kit for ARRI ALEXA Mini / Mini LF": {
    "brand": "Wooden Camera",
    "compatible": [
      "Arri Alexa Mini",
      "Arri Alexa Mini LF"
    ],
    "material": "aluminum",
    "weight_g": null,
    "mounting_points": [
      "ARRI locating",
      "1/4\"-20",
      "3/8\"-16"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Complete Wooden Camera cage with top plate, side plates, and baseplate.",
    "verified_source": "https://woodencamera.com/products/camera-cage-for-arri-alexa-mini",
    "handle_extension_compatible": true
  },
  "Bright Tangerine LeftField Cage Kit for ARRI ALEXA Mini / Mini LF": {
    "brand": "Bright Tangerine",
    "compatible": [
      "Arri Alexa Mini",
      "Arri Alexa Mini LF"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "ARRI locating",
      "15mm LWS",
      "3/8\"-16"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "LeftField 15mm baseplate and side cage system.",
    "verified_source": "https://www.brighttangerine.com/",
    "handle_extension_compatible": true
  },
  "Tilta Canon C300 Mark III / C500 Mark II Cage Kit": {
    "brand": "Tilta",
    "compatible": [
      "Canon C300 Mk III",
      "Canon C500 Mk II"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "ARRI locating",
      "NATO rail"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Tilta cage with top plate and quick release side plates.",
    "verified_source": "https://tilta.com/",
    "handle_extension_compatible": true
  },
  "SHAPE Canon C300 MkIII / C500 MkII Cage Kit": {
    "brand": "SHAPE",
    "compatible": [
      "Canon C300 Mk III",
      "Canon C500 Mk II"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "ARRI anti-twist 3/8\"-16",
      "cold shoe",
      "1/4\"-20"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Form fitting cage with top handle and ARRI threads.",
    "verified_source": "https://www.shapewlb.com/",
    "handle_extension_compatible": true
  },
  "Arri RED DSMC2 Pro Camera Accessories Kit": {
    "brand": "ARRI",
    "compatible": [
      "RED DSMC2",
      "RED Ranger"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "ARRI locating",
      "15mm LWS",
      "1/4\"-20",
      "3/8\"-16"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "ARRI PCA cage set for RED DSMC2 / Ranger.",
    "verified_source": "https://www.arri.com/",
    "handle_extension_compatible": true
  },
  "Wooden Camera Cage Kit for RED DSMC2": {
    "brand": "Wooden Camera",
    "compatible": [
      "RED DSMC2"
    ],
    "material": "aluminum",
    "weight_g": null,
    "mounting_points": [
      "ARRI locating",
      "1/4\"-20",
      "3/8\"-16"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Wooden Camera DSMC2 cage with top plate, side plates, baseplate.",
    "verified_source": "https://woodencamera.com/products/unified-camera-cage-for-red-dsmc2",
    "handle_extension_compatible": true
  },
  "Bright Tangerine Cage Support Kit for Sony VENICE / VENICE 2": {
    "brand": "Bright Tangerine",
    "compatible": [
      "Sony Venice",
      "Sony Venice 2"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "ARRI locating",
      "3/8\"-16",
      "1/4\"-20",
      "15mm LWS"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Professional cage kit with 15mm support for VENICE systems.",
    "verified_source": "https://www.brighttangerine.com/",
    "handle_extension_compatible": true
  },
  "SmallRig Full Cage for Panasonic Lumix GH6 / GH7 (3784)": {
    "brand": "SmallRig",
    "compatible": [
      "Panasonic Lumix GH6",
      "Panasonic Lumix GH7"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "ARRI 3/8\"-16 locating",
      "Arca-Swiss QR",
      "multiple mounting points"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Form-fitting, two-point anti-twist, Arca-Swiss bottom, magnetic spanner.",
    "verified_source": "https://www.smallrig.com/full-camera-cage-for-panasonic-lumix-gh6-gh7-3784.html",
    "handle_extension_compatible": true
  },
  "SmallRig Camera Cage Kit for Panasonic Lumix GH6 (3785)": {
    "brand": "SmallRig",
    "compatible": [
      "Panasonic Lumix GH6"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "ARRI 3/8\"-16 locating",
      "cold shoe",
      "NATO rail",
      "cable clamps"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Handheld kit includes top handle, HDMI/USB-C clamp; two-point locking.",
    "verified_source": "https://www.smallrig.com/smallrig-camera-cage-kit-for-panasonic-lumix-gh6-3785.html",
    "handle_extension_compatible": true
  },
  "SmallRig HawkLock Quick Release Cage for Panasonic GH6 / GH7 (4824)": {
    "brand": "SmallRig",
    "compatible": [
      "Panasonic Lumix GH6",
      "Panasonic Lumix GH7"
    ],
    "material": "aluminum",
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "ARRI 3/8\"-16",
      "cold shoe",
      "NATO rail",
      "Arca-Swiss QR",
      "QD socket"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "HawkLock QR design; triple-point locking; cable clamps and accessory support.",
    "verified_source": "https://www.smallrigreseller.com/smallrig-hawklock-quick-release-cage-for-panasonic-lumix-gh7-gh6-4824.html",
    "handle_extension_compatible": true
  },
  "Tilta Full Camera Cage for Nikon Z9": {
    "brand": "Tilta",
    "compatible": [
      "Nikon Z9"
    ],
    "material": "aluminum, steel",
    "weight_g": 264.5,
    "mounting_points": [
      "cold shoe",
      "1/4\"-20 w/ locating pins",
      "NATO rail",
      "dual 15mm rod holder option"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Includes top handle, rod holder, silicone cushions, Arca-compatible base.",
    "verified_source": "https://www.adorama.com/iatat31ab.html",
    "handle_extension_compatible": true
  },
  "Tilta Camera Cage for Nikon Z9 – Pro Kit": {
    "brand": "Tilta",
    "compatible": [
      "Nikon Z9"
    ],
    "material": "aluminum alloy",
    "weight_g": null,
    "mounting_points": [
      "cold shoe",
      "1/4\"-20",
      "locating points",
      "NATO rail"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Premium expansion-ready kit for Nikon Z9.",
    "verified_source": "https://tilta.com/shop/camera-cage-for-nikon-z9-pro-kit-black/?srsltid=AfmBOoqSdzCbI--UMAiS65Dnygi3YAMivLea388wni80d57WiYc-xIa5",
    "handle_extension_compatible": true
  },
  "Bright Tangerine LeftField 15mm LWS Baseplate for ARRI Alexa 35": {
    "brand": "Bright Tangerine",
    "compatible": [
      "Arri Alexa 35"
    ],
    "material": null,
    "rodStandard": [
      "15mm LWS"
    ],
    "weight_g": 279,
    "mounting_points": [
      "15mm LWS",
      "ARRI BUD dovetail"
    ],
    "top_handle_included": false,
    "side_plates": false,
    "notes": "15mm baseplate compatible with Alexa 35 via BUD-1 system.",
    "verified_source": "https://www.brighttangerine.com/product/leftfield-3-arri-bud-compatible-15mm-lws-baseplate/?srsltid=AfmBOoptKXWYvXI963Zf7yXArAyQtJRmkjtcDQL4PjMZH1yjUFI42frl",
    "handle_extension_compatible": true
  },
  "SmallRig Camera Cage for Z CAM E2 (2264)": {
    "brand": "SmallRig",
    "compatible": [
      "Z CAM E2"
    ],
    "material": "aluminum",
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "ARRI 3/8\"-16",
      "NATO rail (side)",
      "Arca-Swiss bottom",
      "HDMI/USB-C clamp"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Modular cage with lens adapter support, side NATO rails, cable clamps.",
    "verified_source": "https://www.smallrig.com/smallrig-camera-cage-for-z-cam-e2-2264.html",
    "handle_extension_compatible": true
  },
  "SmallRig Camera Cage for Z CAM E2-S6/F6/F8/M4 (CVZ2423)": {
    "brand": "SmallRig",
    "compatible": [
      "Z CAM E2-S6",
      "Z CAM E2-F6",
      "Z CAM E2-F8",
      "Z CAM E2-M4"
    ],
    "material": "aluminum",
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "ARRI-style threads",
      "NATO rails (sides)",
      "ARRI rosette",
      "HDMI/USB-C clamp"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Designed for Z CAM cinema line with robust accessory integration.",
    "verified_source": "https://www.bhphotovideo.com/c/product/1542957-REG/smallrig_cvz2423_cage_for_z_cam.html/accessories",
    "handle_extension_compatible": true
  },
  "SmallRig Full Cage for Fujifilm X-H2 / X-H2S (3934)": {
    "brand": "SmallRig",
    "compatible": [
      "Fujifilm X-H2",
      "Fujifilm X-H2S"
    ],
    "material": "aluminum alloy",
    "weight_g": 178,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "ARRI locating",
      "NATO rail",
      "cold shoe",
      "H38 Arca-Swiss QR",
      "H18 cold shoe mount",
      "built-in HDMI clamp"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Three-point locking with locating pin and side lock; HawkLock quick-release interoperability; includes HDMI clamp and magnetic spanner.",
    "verified_source": "https://www.smallrig.com/SmallRig-Cage-for-FUJIFILM-X-H2S-3934.html",
    "handle_extension_compatible": true
  },
  "SmallRig Handheld Cage Kit for Fujifilm X-H2 / X-H2S (4097)": {
    "brand": "SmallRig",
    "compatible": [
      "Fujifilm X-H2",
      "Fujifilm X-H2S"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "ARRI locating",
      "NATO rail",
      "cold shoe",
      "Arca-Swiss QR",
      "HDMI clamp"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Includes quick-release top handle; cable clamp; ergonomic kit for handheld shooting.",
    "verified_source": "https://www.smallrig.com/SmallRig-Handheld-Kit-for-FUJIFILM-X-H2-X-H2S-Limited-Edition-4097.html",
    "handle_extension_compatible": true
  },
  "SmallRig Cage for Fujifilm X-H2S with FT-XH / VG-XH Battery Grip (3933)": {
    "brand": "SmallRig",
    "compatible": [
      "Fujifilm X-H2S"
    ],
    "material": "aluminum",
    "weight_g": 241,
    "mounting_points": [
      "1/4\"-20",
      "ARRI 3/8\"-16 anti-twist",
      "cold shoe",
      "Arca-Swiss QR bottom",
      "multiple 1/4\"-20/3/8\"-16 threads"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Form-fitting cage that accommodates Fujifilm vertical battery grip; built-in Arca base and two shoe mounts.",
    "verified_source": "https://www.bhphotovideo.com/c/product/1709406-REG/smallrig_3933_camera_cage_for_fujifilm.html",
    "handle_extension_compatible": true
  },
  "Tilta Rig for Panasonic VariCam LT (ES-T65)": {
    "brand": "Tilta",
    "compatible": [
      "Panasonic VariCam LT"
    ],
    "material": "CNC-machined aluminum",
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "15mm LWS rods",
      "ARRI rosette",
      "VCT-14 baseplate",
      "handle rosettes",
      "top handle",
      "side plate",
      "power distro outputs"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Complete rig with shoulder support, EVF bracket, power module (Gold-Mount or V-Mount), 15 mm rod support and modular plates.",
    "verified_source": "https://www.adorama.com/iaest65.html",
    "handle_extension_compatible": true
  },
  "Tilta Cage Rig for Panasonic VariCam 35 (ES-T75-AB)": {
    "brand": "Tilta",
    "compatible": [
      "Panasonic VariCam 35"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "15mm LWS rods",
      "ARRI rosette",
      "shoulder pad",
      "VCT-14 dovetail",
      "Gold-Mount battery plate",
      "power outputs",
      "EVF support",
      "quick-release top handle",
      "side plate",
      "bottom plate"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Full rig for VariCam 35 including shoulder support, battery power distro, multiple mounting points and EVF integration.",
    "verified_source": "https://www.bhphotovideo.com/c/product/1414427-REG/tilta_es_t75_ab_rig_for_panasonic.html",
    "handle_extension_compatible": true
  },
  "Tilta Full Camera Cage for DJI Ronin 4D / Flex": {
    "brand": "Tilta",
    "compatible": [
      "DJI Ronin 4D",
      "DJI Ronin 4D Flex"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "Manfrotto quick release",
      "dual 15mm rod mount",
      "lens adapter support",
      "1/4\"-20",
      "3/8\"-16"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Includes lens adapter support, rods, top handle, support plate.",
    "verified_source": "https://www.bhphotovideo.com/c/product/1775459-REG/tilta_es_t09_a_camera_cage_for_dji.html",
    "handle_extension_compatible": true
  },
  "Arri ALEXA 35 Production Support Set (19mm)": {
    "brand": "ARRI",
    "compatible": [
      "Arri Alexa 35"
    ],
    "rodStandard": [
      "19mm Studio"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "19mm Studio",
      "15mm LWS",
      "ARRI locating",
      "3/8\"-16",
      "1/4\"-20"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "ARRI Production Support for Alexa 35, includes top/side/bottom support components and both 15mm LWS and 19mm Studio rod support.",
    "verified_source": "https://www.arri.com/en/camera-systems/mechanical-accessories/camera-support-systems/support-systems-for-arri-cameras/support-systems-for-alexa-35",
    "handle_extension_compatible": true
  },
  "Arri ALEXA 35 Lightweight Expansion Set": {
    "brand": "ARRI",
    "compatible": [
      "Arri Alexa 35"
    ],
    "material": null,
    "rodStandard": [
      "15mm LWS"
    ],
    "weight_g": null,
    "mounting_points": [
      "15 mm LWS lightweight",
      "UAP-3 adapter plate",
      "handle mounting",
      "shoulder pad"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "ARRI lightweight expansion, includes adapter plate UAP-3, lightweight handle LCH-1 and shoulder pad.",
    "verified_source": "https://www.bhphotovideo.com/c/product/1708625-REG/arri_kk_0041530_alexa_35_lightweight_expansion.html",
    "handle_extension_compatible": true
  },
  "Tilta Camera Cage for Canon R5C": {
    "brand": "Tilta",
    "compatible": [
      "Canon EOS R5C"
    ],
    "material": "aluminum",
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "ARRI locating",
      "cold shoe"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Tilta form-fitting cage for R5C with NATO rails.",
    "verified_source": "https://tilta.com/shop/canon-r5c-cage/",
    "handle_extension_compatible": true
  },
  "Kondor Blue Canon R5C Cage": {
    "brand": "Kondor Blue",
    "compatible": [
      "Canon EOS R5C"
    ],
    "material": "aluminum",
    "weight_g": null,
    "mounting_points": [
      "dual NATO rails",
      "ARRI locating",
      "1/4\"-20",
      "cold shoe"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Kondor Blue modular R5C cage with bubble level and magnetic tool.",
    "verified_source": "https://kondorblue.com/products/canon-r5c-cage",
    "handle_extension_compatible": true
  },
  "Tilta Camera Cage Rig for Canon C200 (ES-T26-A)": {
    "brand": "Tilta",
    "compatible": [
      "Canon C200"
    ],
    "material": "aluminum",
    "weight_g": null,
    "mounting_points": [
      "15mm LWS rods",
      "ARRI rosette",
      "1/4\"-20",
      "3/8\"-16"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Complete Tilta ES-T20 cage with shoulder support and top handle.",
    "verified_source": "https://tilta.com/shop/es-t20-camera-rig-for-canon-c200/",
    "handle_extension_compatible": true
  },
  "Tilta Camera Cage Rig for Panasonic EVA1 (ES-T37)": {
    "brand": "Tilta",
    "compatible": [
      "Panasonic EVA1"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "15mm LWS rods",
      "ARRI rosette",
      "VCT baseplate",
      "1/4\"-20"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Tilta EVA1 cage with shoulder pad, rods, power distribution.",
    "verified_source": "https://tilta.com/shop/es-t37-camera-rig-for-panasonic-eva1/",
    "handle_extension_compatible": true
  },
  "SmallRig Camera Cage for Panasonic BGH1 (2988)": {
    "brand": "SmallRig",
    "compatible": [
      "Panasonic Lumix BGH1"
    ],
    "material": "aluminum",
    "weight_g": 270,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "ARRI locating",
      "cold shoe",
      "side NATO rails"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Compact box-camera cage with multiple NATO rails and mounting points.",
    "verified_source": "https://www.smallrig.com/smallrig-cage-for-panasonic-lumix-bgh1-2988.html",
    "handle_extension_compatible": true
  },
  "Tilta Full Cage for Panasonic BGH1": {
    "brand": "Tilta",
    "compatible": [
      "Panasonic Lumix BGH1"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "cold shoe",
      "ARRI locating"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Tilta modular cage for BGH1 box cinema camera.",
    "verified_source": "https://tilta.com/shop/panasonic-bgh1-cage/",
    "handle_extension_compatible": true
  },
  "SmallRig Camera Cage for Panasonic BS1H (3440)": {
    "brand": "SmallRig",
    "compatible": [
      "Panasonic Lumix BS1H"
    ],
    "material": "aluminum",
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "ARRI locating",
      "NATO rail"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Box-camera cage designed for Panasonic BS1H.",
    "verified_source": "https://www.smallrig.com/smallrig-cage-for-panasonic-lumix-bs1h-3440.html",
    "handle_extension_compatible": true
  },
  "SmallRig Camera Cage for Nikon Z8 (3940)": {
    "brand": "SmallRig",
    "compatible": [
      "Nikon Z8"
    ],
    "material": "aluminum",
    "weight_g": 203,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16 ARRI locating",
      "cold shoe",
      "Arca-Swiss bottom"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Form-fitting cage with multiple mounting points and Arca base.",
    "verified_source": "https://www.smallrig.com/smallrig-camera-cage-for-nikon-z8-3940.html",
    "handle_extension_compatible": true
  },
  "Tilta Camera Cage for Fujifilm GFX100": {
    "brand": "Tilta",
    "compatible": [
      "Fujifilm GFX100"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "ARRI locating",
      "cold shoe"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Tilta form-fitting cage for medium format Fujifilm GFX100.",
    "verified_source": "https://tilta.com/shop/fujifilm-gfx100-cage/",
    "handle_extension_compatible": true
  },
  "SmallRig Cage for Fujifilm X-T5 (4135)": {
    "brand": "SmallRig",
    "compatible": [
      "Fujifilm X-T5"
    ],
    "material": "aluminum",
    "weight_g": 158,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "cold shoe",
      "Arca-Swiss QR"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Slim X-T5 cage with Arca-Swiss bottom and cold shoe.",
    "verified_source": "https://www.bhphotovideo.com/c/product/1747241-REG/smallrig_4135_full_cage_for_fujifilm.html",
    "handle_extension_compatible": true
  },
  "Bright Tangerine V-RAPTOR XL Cage Kit": {
    "brand": "Bright Tangerine",
    "compatible": [
      "RED V-RAPTOR XL"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "15mm LWS",
      "ARRI dovetail",
      "ARRI locating",
      "1/4\"-20",
      "3/8\"-16"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Bright Tangerine professional cage with XL dovetail baseplate and handle support.",
    "verified_source": "https://www.brighttangerine.com/product/v-raptor-xl-cage/",
    "handle_extension_compatible": true
  },
  "Arri KK.0019637 Cine Pro Set for AMIRA": {
    "brand": "ARRI",
    "kNumber": "KK.0019637",
    "compatible": [
      "Arri Amira"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "ARRI locating",
      "15mm LWS",
      "1/4\"-20",
      "3/8\"-16"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Pro Camera Accessories kit for ARRI Amira with baseplate, side plates, handle.",
    "verified_source": "https://www.arri.com/en/camera-systems/accessories/pro-camera-accessories",
    "handle_extension_compatible": true
  },
  "Wooden Camera Rear Cage System for RED Komodo-X": {
    "brand": "Wooden Camera",
    "compatible": [
      "RED Komodo-X"
    ],
    "material": null,
    "weight_g": 123,
    "mounting_points": [
      "accessory rails",
      "ties into side rails"
    ],
    "top_handle_included": false,
    "side_plates": false,
    "notes": "Rear cage adds mounting points, accessory rail compatible; lightweight at 123 g.",
    "verified_source": "https://woodencamera.com/products/rear-cage-system-red-komodo-x",
    "handle_extension_compatible": true
  },
  "SmallRig Camera Cage for Nikon Z5/Z6/Z7/Z6II/Z7II (2926B)": {
    "brand": "SmallRig",
    "compatible": [
      "Nikon Z5",
      "Nikon Z6",
      "Nikon Z7",
      "Nikon Z6 II",
      "Nikon Z7 II"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "ARRI 3/8\"-16 locating",
      "cold shoe",
      "Arca-Swiss bottom",
      "NATO rail"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Full cage protection, dual-screw lock, Arca-Swiss compatibility, built-in screwdriver.",
    "verified_source": "https://www.smallrig.com/smallrig-camera-cage-for-nikon-z5-z6-z7-z6ii-z7ii-2926B.html",
    "handle_extension_compatible": true
  },
  "SmallRig Camera Cage Kit for Nikon Z6 III (4520)": {
    "brand": "SmallRig",
    "compatible": [
      "Nikon Z6 III"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "ARRI locating",
      "cold shoe",
      "Arca-Swiss quick-release",
      "NATO rail",
      "wrist/strap holes"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Ergonomic handheld kit with cable clamp, Arca-Swiss quick release.",
    "verified_source": "https://www.smallrig.com/Camera-Cage-Kit-for-Nikon-Z6III-4520.html",
    "handle_extension_compatible": true
  },
  "SmallRig Camera Cage for Panasonic S1H (CCP2488)": {
    "brand": "SmallRig",
    "compatible": [
      "Panasonic S1H"
    ],
    "material": "aluminum",
    "weight_g": 243,
    "mounting_points": [
      "1/4\"-20",
      "ARRI 3/8\"-16",
      "cold shoe",
      "NATO rail",
      "built-in screwdriver",
      "strap slots"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Protective cage with multiple mounting points and screwdriver for quick install.",
    "verified_source": "https://www.smallrig.com/smallrig-camera-cage-for-panasonic-s1h-ccp2488.html",
    "handle_extension_compatible": true
  },
  "Tilta Camera Cage for Sony FX6 Basic Kit (ES-T20-A)": {
    "brand": "Tilta",
    "compatible": [
      "Sony FX6"
    ],
    "material": "aluminum alloy, stainless steel",
    "weight_g": 1030,
    "mounting_points": [
      "ARRI rosette",
      "1/4\"-20",
      "3/8\"-16",
      "15 mm LWS rods",
      "lens support",
      "V-Mount/Gold-Mount interfaces"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Protective armor with rod support, top/side plates, battery options, quick-release baseplate.",
    "verified_source": "https://tilta.com/shop/camera-cage-for-sony-fx6-basic-kit-without-battery-plate/",
    "handle_extension_compatible": true
  },
  "Wooden Camera Unified Accessory Kit for Blackmagic URSA Mini / Mini Pro / 12K": {
    "brand": "Wooden Camera",
    "compatible": [
      "Blackmagic URSA Mini",
      "Blackmagic URSA Mini Pro",
      "Blackmagic URSA Mini 12K"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "15mm rods",
      "dovetail/Q-release",
      "adjustable top handle",
      "baseplate"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Advanced accessory kit with rods, ARCA dovetail, top handle, for URSA Mini family.",
    "verified_source": "https://transfilm.com/product/wooden-camera-blackmagic-ursa-mini-ursa-mini-pro-12k-unified-accessory-kit-advanced/",
    "handle_extension_compatible": true
  },
  "SmallRig Black Mamba Cage for Canon EOS R7 (4003B)": {
    "brand": "SmallRig",
    "compatible": [
      "Canon EOS R7"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16 locating",
      "cold shoe",
      "NATO rails",
      "Arca-Swiss QR bottom"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Slim, form-fitting cage with triple-point lock and Arca-Swiss quick-release base.",
    "verified_source": "https://www.smallrig.com/SmallRig-Black-Mamba-Cage-for-Canon-EOS-R7-4003.html",
    "handle_extension_compatible": true
  },
  "Tilta Full Camera Cage for Fujifilm X-T3 / X-T4 (TA-T04-FCC-B)": {
    "brand": "Tilta",
    "compatible": [
      "Fujifilm X-T3",
      "Fujifilm X-T4"
    ],
    "material": "aluminum alloy, stainless steel",
    "weight_g": 426,
    "mounting_points": [
      "1/4\"-20",
      "cold shoe (x2)",
      "NATO rail",
      "Type II baseplate compatible",
      "quick-release top handle"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Complete protective armor, hand strap, handles, and optional rod/power configs.",
    "verified_source": "https://www.bhphotovideo.com/c/product/1597944-REG/tilta_ta_t04_c_b_fujifilm_x_t3_x_t4_kit_c.html",
    "handle_extension_compatible": true
  },
  "SmallRig Full Cage for Canon EOS R3 (3884)": {
    "brand": "SmallRig",
    "compatible": [
      "Canon EOS R3"
    ],
    "material": "aluminum",
    "weight_g": 209,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16 locating",
      "cold shoe",
      "Arca-Swiss QR"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Form-fitting full cage with Arca base and cold shoe.",
    "verified_source": "https://www.smallrig.com/smallrig-camera-cage-for-canon-eos-r3-3884.html",
    "handle_extension_compatible": true
  },
  "SmallRig Full Cage for Canon EOS R10 (3947)": {
    "brand": "SmallRig",
    "compatible": [
      "Canon EOS R10"
    ],
    "material": "aluminum",
    "weight_g": 156,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "cold shoe",
      "Arca-Swiss bottom"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Lightweight Arca-compatible cage for Canon R10.",
    "verified_source": "https://www.smallrig.com/smallrig-full-cage-for-canon-eos-r10-3947.html",
    "handle_extension_compatible": true
  },
  "SmallRig Full Cage for Canon EOS R50 (4236)": {
    "brand": "SmallRig",
    "compatible": [
      "Canon EOS R50"
    ],
    "material": "aluminum",
    "weight_g": 129,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "cold shoe",
      "Arca-Swiss base"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Compact cage designed for R50 with cold shoe and multiple mounts.",
    "verified_source": "https://www.smallrig.com/smallrig-cage-for-canon-eos-r50-4236.html",
    "handle_extension_compatible": true
  },
  "SmallRig Cage for Sony ZV-E1 (4256)": {
    "brand": "SmallRig",
    "compatible": [
      "Sony ZV-E1"
    ],
    "material": "aluminum",
    "weight_g": 166,
    "mounting_points": [
      "1/4\"-20",
      "ARRI locating",
      "cold shoe",
      "Arca-Swiss base"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Form-fitting cage for ZV-E1 with Arca quick release.",
    "verified_source": "https://www.smallrig.com/SmallRig-Cage-for-Sony-ZV-E1-4256.html",
    "handle_extension_compatible": true
  },
  "SmallRig Camera Cage for Sony ZV-E10 (3531B)": {
    "brand": "SmallRig",
    "compatible": [
      "Sony ZV-E10"
    ],
    "material": "aluminum",
    "weight_g": 145,
    "mounting_points": [
      "1/4\"-20",
      "3/8\"-16",
      "cold shoe",
      "NATO rail"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Lightweight cage for Sony ZV-E10 with cold shoe and NATO.",
    "verified_source": "https://www.smallrig.com/smallrig-cage-for-sony-zv-e10-3529.html",
    "handle_extension_compatible": true
  },
  "Wooden Camera Camera Cage for Blackmagic Micro Cinema Camera": {
    "brand": "Wooden Camera",
    "compatible": [
      "Blackmagic Micro Cinema Camera"
    ],
    "material": "aluminum",
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "cold shoe"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Protective cage for the Micro Cinema Camera with multiple 1/4\"-20 mounts.",
    "verified_source": "https://woodencamera.com/products/micro-cinema-camera-accessory-kit",
    "handle_extension_compatible": true
  },
  "Wooden Camera Unified Accessory Kit for Blackmagic URSA Broadcast G2": {
    "brand": "Wooden Camera",
    "compatible": [
      "Blackmagic URSA Broadcast G2"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "15mm rods",
      "ARRI locating",
      "1/4\"-20",
      "3/8\"-16"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Accessory kit with rods, baseplate, and top handle for URSA Broadcast G2.",
    "verified_source": "https://woodencamera.com/products/unified-camera-cage-for-blackmagic-ursa-broadcast",
    "handle_extension_compatible": true
  },
  "SmallRig Camera Cage for Panasonic GH5 (2049)": {
    "brand": "SmallRig",
    "compatible": [
      "Panasonic GH5"
    ],
    "material": "aluminum",
    "weight_g": 270,
    "mounting_points": [
      "1/4\"-20",
      "ARRI locating",
      "cold shoe"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Classic SmallRig cage for GH5 with multiple mounts.",
    "verified_source": "https://www.smallrig.com/smallrig-gh5-cage-2049.html",
    "handle_extension_compatible": true
  },
  "SmallRig Camera Cage for Panasonic GH5 II (3188)": {
    "brand": "SmallRig",
    "compatible": [
      "Panasonic GH5 II"
    ],
    "material": "aluminum",
    "weight_g": 240,
    "mounting_points": [
      "1/4\"-20",
      "ARRI locating",
      "cold shoe",
      "NATO rail"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Updated cage designed specifically for GH5 Mark II.",
    "verified_source": "https://www.smallrig.com/smallrig-cage-for-panasonic-gh5-ii-3188.html",
    "handle_extension_compatible": true
  },
  "SmallRig Cage for Panasonic S1 / S1R (CCS2416)": {
    "brand": "SmallRig",
    "compatible": [
      "Panasonic S1",
      "Panasonic S1R"
    ],
    "material": "aluminum",
    "weight_g": 220,
    "mounting_points": [
      "1/4\"-20",
      "ARRI 3/8\"-16",
      "cold shoe"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Form-fitting cage with ARRI locating mounts and cold shoe.",
    "verified_source": "https://www.smallrig.com/smallrig-cage-for-panasonic-s1-s1r-ccs2416.html",
    "handle_extension_compatible": true
  },
  "SmallRig Half Cage for Fujifilm X100V (3126)": {
    "brand": "SmallRig",
    "compatible": [
      "Fujifilm X100V"
    ],
    "material": "aluminum",
    "weight_g": 104,
    "mounting_points": [
      "1/4\"-20",
      "cold shoe",
      "Arca-Swiss base"
    ],
    "top_handle_included": false,
    "side_plates": false,
    "notes": "Compact half cage for X100V with Arca-Swiss compatibility.",
    "verified_source": "https://www.smallrig.com/smallrig-l-bracket-for-fujifilm-x100v-3126.html",
    "handle_extension_compatible": true
  },
  "Wooden Camera Unified Accessory Kit for RED Ranger (Monstro/Gemini/Helium)": {
    "brand": "Wooden Camera",
    "compatible": [
      "RED Ranger Monstro",
      "RED Ranger Gemini",
      "RED Ranger Helium"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "15mm rods",
      "ARRI dovetail",
      "1/4\"-20",
      "3/8\"-16"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Unified Wooden Camera rig with top handle and baseplate for Ranger cameras.",
    "verified_source": "https://woodencamera.com/products/unified-camera-cage-for-red-ranger",
    "handle_extension_compatible": true
  },
  "Arri K0.0043086 ALEXA 35 Production Expansion Set (19mm)": {
    "brand": "ARRI",
    "kNumber": "K0.0043086",
    "compatible": [
      "Arri Alexa 35"
    ],
    "rodStandard": [
      "19mm Studio"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "19mm Studio",
      "15mm LWS",
      "ARRI locating",
      "3/8\"-16",
      "1/4\"-20"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "Production cage set for ALEXA 35 centered on 19mm Studio rod support and studio accessories.",
    "verified_source": "https://www.arri.com/",
    "handle_extension_compatible": true
  },
  "Arri ALEXA LF PCA Support Kit": {
    "brand": "ARRI",
    "compatible": [
      "Arri Alexa LF"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "15mm LWS",
      "ARRI locating",
      "3/8\"-16",
      "1/4\"-20"
    ],
    "top_handle_included": true,
    "side_plates": true,
    "notes": "ARRI PCA support package for full-size Alexa LF.",
    "verified_source": "https://www.arri.com/en/camera-systems/accessories/pro-camera-accessories",
    "handle_extension_compatible": true
  },
  "Tilta Cage Kit for DJI Inspire X7 Air Unit": {
    "brand": "Tilta",
    "compatible": [
      "DJI Inspire X7"
    ],
    "material": null,
    "weight_g": null,
    "mounting_points": [
      "1/4\"-20",
      "cold shoe",
      "lens adapter support"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Tilta cage kit for Inspire X7 camera module.",
    "verified_source": "https://tilta.com/shop/dji-inspire-x7-cage/",
    "handle_extension_compatible": true
  },
  "SmallRig Camera Cage for DJI Osmo / Zenmuse X5 (1889)": {
    "brand": "SmallRig",
    "compatible": [
      "DJI Osmo X5"
    ],
    "material": "aluminum",
    "weight_g": 250,
    "mounting_points": [
      "1/4\"-20",
      "cold shoe"
    ],
    "top_handle_included": false,
    "side_plates": true,
    "notes": "Protective cage for Osmo X5 gimbal camera with cold shoe.",
    "verified_source": "https://www.smallrig.com/smallrig-osmo-x5-cage-1889.html",
    "handle_extension_compatible": true
  },
  "Arri KK.0043759 Cine Pro Set for Sony Venice 1/2": {
    "brand": "ARRI",
    "kNumber": "KK.0043759",
    "compatible": [
      "Sony Venice 1",
      "Sony Venice 2"
    ],
    "handle_extension_compatible": true
  }
};

if (typeof registerDevice === 'function') {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = registerDevice('accessories.cages', cageData);
  } else {
    registerDevice('accessories.cages', cageData);
  }
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = cageData;
} else {
  globalThis.devices = globalThis.devices || {};
  globalThis.devices.accessories = globalThis.devices.accessories || {};
  globalThis.devices.accessories.cages = cageData;
}
})();
