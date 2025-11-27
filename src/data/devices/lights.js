/* global registerDevice */
(() => {
    const lightsData = {
        "Aputure LS 600d Pro": {
            "brand": "Aputure",
            "powerDrawWatts": 720,
            "weight_g": 10440,
            "type": "COB LED (Daylight)",
            "mount": "Bowens",
            "powerOptions": ["AC", "48V DC (3-pin XLR)", "V-Mount/Gold Mount (14.4V/26V/28.8V)"],
            "notes": "High-output 600W COB LED. Weight includes head + control box.",
            "verified_source": "https://www.aputure.com/products/ls-600d-pro/"
        },
        "Aputure LS 300d II": {
            "brand": "Aputure",
            "powerDrawWatts": 350,
            "weight_g": 5500,
            "type": "COB LED (Daylight)",
            "mount": "Bowens",
            "powerOptions": ["AC", "V-Mount/Gold Mount"],
            "notes": "300W COB LED. Weight includes head + control box.",
            "verified_source": "https://www.aputure.com/products/ls-300d-ii/"
        },
        "Aputure LS 120d II": {
            "brand": "Aputure",
            "powerDrawWatts": 180,
            "weight_g": 4000,
            "type": "COB LED (Daylight)",
            "mount": "Bowens",
            "powerOptions": ["AC", "V-Mount/Gold Mount"],
            "notes": "120W COB LED. Weight includes head + control box.",
            "verified_source": "https://www.aputure.com/products/ls-120d-ii/"
        },
        "Aputure MC": {
            "brand": "Aputure",
            "powerDrawWatts": 5,
            "weight_g": 130,
            "type": "Mini RGBWW LED",
            "mount": "Magnetic / 1/4-20",
            "powerOptions": ["Internal Battery (2600mAh)", "USB-C (PD)", "Qi Wireless"],
            "notes": "Pocket-sized RGBWW light. Approx 2h runtime at max brightness.",
            "verified_source": "https://www.aputure.com/products/mc/"
        },
        "Astera Titan Tube (FP1)": {
            "brand": "Astera",
            "powerDrawWatts": 48,
            "weight_g": 1350,
            "type": "LED Tube (RGBMintAmber)",
            "length": "1035mm",
            "powerOptions": ["Internal Battery", "24V DC (2A)"],
            "notes": "72W LED power. Approx 1h 45m runtime at max brightness.",
            "verified_source": "https://astera-led.com/titan/"
        },
        "Astera Helios Tube (FP2)": {
            "brand": "Astera",
            "powerDrawWatts": 24,
            "weight_g": 760,
            "type": "LED Tube (RGBMintAmber)",
            "length": "550mm",
            "powerOptions": ["Internal Battery", "24V DC"],
            "notes": "36W LED power. Approx 1h 45m runtime at max brightness.",
            "verified_source": "https://astera-led.com/helios/"
        },
        "ARRI SkyPanel S60-C": {
            "brand": "ARRI",
            "powerDrawWatts": 450,
            "weight_g": 16000,
            "type": "LED Soft Light",
            "mount": "Junior Pin",
            "powerOptions": ["AC", "DC (23-36V) via 3-pin XLR"],
            "notes": "Industry standard soft light. Weight includes head + PSU/ballast.",
            "verified_source": "https://www.arri.com/en/lighting/led/skypanel/s60-c"
        },
        "Nanlite PavoTube II 30C": {
            "brand": "Nanlite",
            "powerDrawWatts": 55,
            "weight_g": 1400,
            "type": "LED Tube (RGBW)",
            "length": "4ft",
            "powerOptions": ["Internal Battery", "15V DC", "AC Adapter"],
            "notes": "Approx 2h 13m runtime at 100% brightness.",
            "verified_source": "https://nanliteus.com/collections/tubes/products/nanlite-pavotube-30c-4-rgbw-led-tube-with-internal-battery"
        },
        "Aputure Amaran 100d S": {
            "brand": "Aputure",
            "powerDrawWatts": 111,
            "weight_g": 1420,
            "type": "COB LED (Daylight)",
            "mount": "Bowens",
            "powerOptions": ["AC", "48V DC"],
            "notes": "100W Output. Weight is lamp head only.",
            "verified_source": "https://www.aputure.com/products/amaran-100d-s/"
        },
        "Aputure Amaran 200d S": {
            "brand": "Aputure",
            "powerDrawWatts": 221,
            "weight_g": 1560,
            "type": "COB LED (Daylight)",
            "mount": "Bowens",
            "powerOptions": ["AC", "48V DC"],
            "notes": "200W Output. Weight is lamp head only.",
            "verified_source": "https://www.aputure.com/products/amaran-200d-s/"
        },
        "Nanlite Forza 60B II": {
            "brand": "Nanlite",
            "powerDrawWatts": 72,
            "weight_g": 700,
            "type": "COB LED (Bi-Color)",
            "mount": "FM Mount (Bowens Adapter inc.)",
            "powerOptions": ["AC", "15V DC (NP-F/V-Mount Handle)"],
            "notes": "Compact 60W Bi-Color. Weight is lamp head only.",
            "verified_source": "https://nanliteus.com/products/nanlite-forza-60b-ii-bi-color-led-monolight"
        },
        "Nanlite Forza 300B II": {
            "brand": "Nanlite",
            "powerDrawWatts": 350,
            "weight_g": 2900,
            "type": "COB LED (Bi-Color)",
            "mount": "Bowens",
            "powerOptions": ["AC", "14.8V DC (V-Mount)"],
            "notes": "300W Bi-Color. Weight is lamp head only.",
            "verified_source": "https://nanliteus.com/products/nanlite-forza-300b-ii-bi-color-led-monolight"
        },
        "ARRI SkyPanel S30-C": {
            "brand": "ARRI",
            "powerDrawWatts": 220,
            "weight_g": 9500,
            "type": "LED Soft Light",
            "mount": "Junior Pin",
            "powerOptions": ["AC", "DC (23-36V)"],
            "notes": "200W Soft Light. Weight includes head + PSU.",
            "verified_source": "https://www.arri.com/en/lighting/led/skypanel/s30-c"
        },
        "ARRI SkyPanel S120-C": {
            "brand": "ARRI",
            "powerDrawWatts": 430,
            "weight_g": 17500,
            "type": "LED Soft Light",
            "mount": "Junior Pin",
            "powerOptions": ["AC", "DC (23-36V)"],
            "notes": "400W Soft Light (Long). Weight includes head + PSU.",
            "verified_source": "https://www.arri.com/en/lighting/led/skypanel/s120-c"
        },
        "ARRI Orbiter": {
            "brand": "ARRI",
            "powerDrawWatts": 500,
            "weight_g": 11700,
            "type": "Directional LED",
            "mount": "QLM (Changeable Optics)",
            "powerOptions": ["AC", "48V DC (3-pin XLR)"],
            "notes": "Versatile directional LED. Weight is fixture only.",
            "verified_source": "https://www.arri.com/en/lighting/led/orbiter"
        },
        "Aputure LS 600c Pro": {
            "brand": "Aputure",
            "powerDrawWatts": 720,
            "weight_g": 11070,
            "type": "COB LED (RGBWW)",
            "mount": "Bowens",
            "powerOptions": ["AC", "48V DC"],
            "notes": "600W RGBWW. Weight includes head + control box.",
            "verified_source": "https://www.aputure.com/products/ls-600c-pro/"
        },
        "Aputure LS 1200d Pro": {
            "brand": "Aputure",
            "powerDrawWatts": 1440,
            "weight_g": 14750,
            "type": "COB LED (Daylight)",
            "mount": "Bowens",
            "powerOptions": ["AC", "48V DC (Dual)"],
            "notes": "1200W Daylight. Weight includes head + control box.",
            "verified_source": "https://www.aputure.com/products/ls-1200d-pro/"
        },
        "Aputure Nova P300c": {
            "brand": "Aputure",
            "powerDrawWatts": 360,
            "weight_g": 10350,
            "type": "LED Panel (RGBWW)",
            "mount": "Junior Pin",
            "powerOptions": ["AC", "24-48V DC"],
            "notes": "300W RGBWW Panel. Weight is fixture only.",
            "verified_source": "https://www.aputure.com/products/nova-p300c/"
        },
        "Aputure Nova P600c": {
            "brand": "Aputure",
            "powerDrawWatts": 720,
            "weight_g": 13740,
            "type": "LED Panel (RGBWW)",
            "mount": "Junior Pin",
            "powerOptions": ["AC", "48V DC"],
            "notes": "600W RGBWW Panel. Weight is fixture only.",
            "verified_source": "https://www.aputure.com/products/nova-p600c/"
        },
        "ARRI L7-C": {
            "brand": "ARRI",
            "powerDrawWatts": 220,
            "weight_g": 10000,
            "type": "LED Fresnel (Tunable)",
            "mount": "Junior Pin",
            "powerOptions": ["AC", "DC (23-36V)"],
            "notes": "Tunable LED Fresnel. Weight is Pole Op version.",
            "verified_source": "https://www.arri.com/en/lighting/led/l-series/l7-c"
        },
        "ARRI L5-C": {
            "brand": "ARRI",
            "powerDrawWatts": 115,
            "weight_g": 5100,
            "type": "LED Fresnel (Tunable)",
            "mount": "Baby Pin",
            "powerOptions": ["AC", "DC (23-36V)"],
            "notes": "Compact Tunable LED Fresnel.",
            "verified_source": "https://www.arri.com/en/lighting/led/l-series/l5-c"
        },
        "Aputure Amaran F21c": {
            "brand": "Aputure",
            "powerDrawWatts": 120,
            "weight_g": 1800,
            "type": "Flexible LED Mat (RGBWW)",
            "mount": "X-Bracket (Baby Pin)",
            "powerOptions": ["AC", "48V DC (V-Mount)"],
            "notes": "2x1 Flexible Mat. Weight includes mat + control box.",
            "verified_source": "https://www.aputure.com/products/amaran-f21c/"
        },
        "Aputure Amaran F22c": {
            "brand": "Aputure",
            "powerDrawWatts": 240,
            "weight_g": 3000,
            "type": "Flexible LED Mat (RGBWW)",
            "mount": "X-Bracket (Baby Pin)",
            "powerOptions": ["AC", "48V DC (V-Mount)"],
            "notes": "2x2 Flexible Mat. Weight includes mat + control box.",
            "verified_source": "https://www.aputure.com/products/amaran-f22c/"
        },
        "Aputure Infinibar PB6": {
            "brand": "Aputure",
            "powerDrawWatts": 20,
            "weight_g": 1000,
            "type": "LED Pixel Bar",
            "length": "2ft",
            "powerOptions": ["AC", "Internal Battery (29.6Wh)"],
            "notes": "2ft Pixel Bar. Can be spliced.",
            "verified_source": "https://www.aputure.com/products/infinibar-pb6/"
        },
        "Aputure Infinibar PB12": {
            "brand": "Aputure",
            "powerDrawWatts": 40,
            "weight_g": 2000,
            "type": "LED Pixel Bar",
            "length": "4ft",
            "powerOptions": ["AC", "Internal Battery (59.2Wh)"],
            "notes": "4ft Pixel Bar. Can be spliced.",
            "verified_source": "https://www.aputure.com/products/infinibar-pb12/"
        },
        "Astera Hyperion Tube (FP3)": {
            "brand": "Astera",
            "powerDrawWatts": 92,
            "weight_g": 2900,
            "type": "LED Tube (RGBMintAmber)",
            "length": "2031mm",
            "powerOptions": ["Internal Battery", "24V DC"],
            "notes": "2m Tube. Approx 1h 45m runtime at max brightness.",
            "verified_source": "https://astera-led.com/hyperion/"
        },
        "Litepanels Gemini 2x1 Hard": {
            "brand": "Litepanels",
            "powerDrawWatts": 500,
            "weight_g": 11500,
            "type": "RGBWW LED Panel",
            "mount": "Junior Pin",
            "powerOptions": ["AC", "DC (26-33V)"],
            "notes": "High output 2x1 panel. Weight includes yoke + PSU.",
            "verified_source": "https://www.litepanels.com/en/products/gemini-2x1-hard/"
        },
        "Litepanels Gemini 1x1 Hard": {
            "brand": "Litepanels",
            "powerDrawWatts": 200,
            "weight_g": 6000,
            "type": "RGBWW LED Panel",
            "mount": "Baby Pin",
            "powerOptions": ["AC", "DC (13-28V)"],
            "notes": "High output 1x1 panel. Weight includes yoke + PSU.",
            "verified_source": "https://www.litepanels.com/en/products/gemini-1x1-hard/"
        },
        "Kino Flo Select 20 DMX": {
            "brand": "Kino Flo",
            "powerDrawWatts": 150,
            "weight_g": 6500,
            "type": "LED Panel (Tunable)",
            "mount": "Baby Pin",
            "powerOptions": ["AC", "24V DC"],
            "notes": "Tunable LED. Weight includes fixture + ballast.",
            "verified_source": "https://kinoflo.com/select-20-dmx/"
        },
        "Kino Flo Select 30 DMX": {
            "brand": "Kino Flo",
            "powerDrawWatts": 150,
            "weight_g": 5000,
            "type": "LED Panel (Tunable)",
            "mount": "Baby Pin",
            "powerOptions": ["AC", "24V DC"],
            "notes": "Tunable LED. Weight is fixture only.",
            "verified_source": "https://kinoflo.com/select-30-dmx/"
        },
        "Kino Flo FreeStyle 31": {
            "brand": "Kino Flo",
            "powerDrawWatts": 150,
            "weight_g": 7000,
            "type": "LED Panel (Tunable)",
            "mount": "Baby Pin",
            "powerOptions": ["AC", "24V DC"],
            "notes": "Tunable LED. Weight includes fixture + barndoors.",
            "verified_source": "https://kinoflo.com/freestyle-31/"
        },
        "Creamsource Vortex8": {
            "brand": "Creamsource",
            "powerDrawWatts": 650,
            "weight_g": 16000,
            "type": "RGBW LED Panel (IP65)",
            "mount": "Junior Pin",
            "powerOptions": ["AC", "48V DC"],
            "notes": "High power 2x1 IP65 panel. Weight includes yoke.",
            "verified_source": "https://creamsource.com/product/vortex8/"
        },
        "Creamsource Vortex4": {
            "brand": "Creamsource",
            "powerDrawWatts": 325,
            "weight_g": 10700,
            "type": "RGBW LED Panel (IP65)",
            "mount": "Junior Pin",
            "powerOptions": ["AC", "48V DC"],
            "notes": "High power 1x1 IP65 panel. Weight includes yoke.",
            "verified_source": "https://creamsource.com/product/vortex4/"
        },
        "ARRI SkyPanel S360-C": {
            "brand": "ARRI",
            "powerDrawWatts": 1600,
            "weight_g": 41000,
            "type": "LED Soft Light",
            "mount": "Junior Pin (28mm)",
            "powerOptions": ["AC (Integrated)", "54V DC"],
            "notes": "Massive output soft light. Weight is manual version.",
            "verified_source": "https://www.arri.com/en/lighting/led/skypanel/s360-c"
        },
        "Aputure Amaran 300c": {
            "brand": "Aputure",
            "powerDrawWatts": 360,
            "weight_g": 2630,
            "type": "COB LED (RGBWW)",
            "mount": "Bowens",
            "powerOptions": ["AC", "48V DC"],
            "notes": "300W RGBWW. Weight is lamp head only.",
            "verified_source": "https://www.aputure.com/products/amaran-300c/"
        },
        "Godox KNOWLED MG1200Bi": {
            "brand": "Godox",
            "powerDrawWatts": 1400,
            "weight_g": 16000,
            "type": "COB LED (Bi-Color)",
            "mount": "Godox G-Mount",
            "powerOptions": ["AC"],
            "notes": "1200W Bi-Color. Weight is light body only.",
            "verified_source": "https://www.godox.com/product-d/MG1200Bi.html"
        },
        "Godox KNOWLED M600D": {
            "brand": "Godox",
            "powerDrawWatts": 740,
            "weight_g": 4500,
            "type": "COB LED (Daylight)",
            "mount": "Bowens",
            "powerOptions": ["AC", "V-Mount (x2)"],
            "notes": "600W Daylight. Weight is light body only.",
            "verified_source": "https://www.godox.com/product-d/M600D.html"
        },
        "Godox VL300": {
            "brand": "Godox",
            "powerDrawWatts": 300,
            "weight_g": 2640,
            "type": "COB LED (Daylight)",
            "mount": "Bowens",
            "powerOptions": ["AC", "V-Mount"],
            "notes": "300W Daylight. Weight is light body only.",
            "verified_source": "https://www.godox.com/product-d/VL300.html"
        },
        "Aputure Amaran 150c": {
            "brand": "Aputure",
            "powerDrawWatts": 180,
            "weight_g": 2660,
            "type": "COB LED (RGBWW)",
            "mount": "Bowens",
            "powerOptions": ["AC", "48V DC"],
            "notes": "150W RGBWW. Weight is lamp head only.",
            "verified_source": "https://www.aputure.com/products/amaran-150c/"
        },
        "Aputure Electro Storm CS15": {
            "brand": "Aputure",
            "powerDrawWatts": 1800,
            "weight_g": 18000,
            "type": "COB LED (RGB)",
            "mount": "Aputure Mount (Electronic)",
            "powerOptions": ["AC"],
            "notes": "1500W High Output RGB. Weight is lamp head only.",
            "verified_source": "https://www.aputure.com/products/electro-storm-cs15/"
        },
        "Godox KNOWLED TP2R": {
            "brand": "Godox",
            "powerDrawWatts": 33,
            "weight_g": 840,
            "type": "LED Pixel Tube (RGBWW)",
            "length": "2ft",
            "powerOptions": ["Internal Battery", "20V DC"],
            "notes": "2ft Pixel Tube. Weight is fixture only.",
            "verified_source": "https://www.godox.com/product-d/TP2R.html"
        },
        "Godox KNOWLED TP4R": {
            "brand": "Godox",
            "powerDrawWatts": 64,
            "weight_g": 1500,
            "type": "LED Pixel Tube (RGBWW)",
            "length": "4ft",
            "powerOptions": ["Internal Battery", "20V DC"],
            "notes": "4ft Pixel Tube. Weight is fixture only.",
            "verified_source": "https://www.godox.com/product-d/TP4R.html"
        },
        "ARRI L10-C": {
            "brand": "ARRI",
            "powerDrawWatts": 510,
            "weight_g": 19700,
            "type": "LED Fresnel (Tunable)",
            "mount": "Junior Pin",
            "powerOptions": ["AC"],
            "notes": "High power Tunable LED Fresnel. Weight is manual version.",
            "verified_source": "https://www.arri.com/en/lighting/led/l-series/l10-c"
        }
    };

    if (typeof registerDevice === 'function') {
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = registerDevice('lights', lightsData);
        } else {
            registerDevice('lights', lightsData);
        }
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = lightsData;
    } else {
        globalThis.devices = globalThis.devices || {};
        globalThis.devices.lights = lightsData;
    }
})();
