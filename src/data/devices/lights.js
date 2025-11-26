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
