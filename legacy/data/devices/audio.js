(function () {
  var audioData = {
    "Sound Devices MixPre-3 II": {
      "brand": "Sound Devices",
      "powerDrawWatts": 4,
      "weight_g": 480,
      "inputs": 3,
      "resolution": "32-bit float",
      "powerOptions": ["USB-C", "4x AA", "L-Mount"],
      "notes": "Compact 3-preamp recorder. Power draw is idle estimate.",
      "verified_source": "https://www.sounddevices.com/product/mixpre-3-ii/"
    },
    "Sound Devices MixPre-6 II": {
      "brand": "Sound Devices",
      "powerDrawWatts": 6,
      "weight_g": 560,
      "inputs": 4,
      "resolution": "32-bit float",
      "powerOptions": ["USB-C", "4x AA", "L-Mount", "Hirose (via adapter)"],
      "notes": "Versatile 4-preamp recorder. Power draw is max with phantom power.",
      "verified_source": "https://www.sounddevices.com/product/mixpre-6-ii/"
    },
    "Sound Devices MixPre-10 II": {
      "brand": "Sound Devices",
      "powerDrawWatts": 8,
      "weight_g": 910,
      "inputs": 8,
      "resolution": "32-bit float",
      "powerOptions": ["Hirose 4-pin (10-18V)", "8x AA", "L-Mount"],
      "notes": "8-preamp recorder. Power draw estimated based on MixPre-6 + 2 channels.",
      "verified_source": "https://www.sounddevices.com/product/mixpre-10-ii/"
    },
    "Sound Devices 633": {
      "brand": "Sound Devices",
      "powerDrawWatts": 7,
      "weight_g": 1100,
      "inputs": 6,
      "resolution": "24-bit",
      "powerOptions": ["Hirose 4-pin (10-18V)", "2x L-Mount", "6x AA"],
      "notes": "Compact 6-input mixer/recorder. Power draw estimate with phantom power.",
      "verified_source": "https://www.sounddevices.com/product/633/"
    },
    "Sound Devices 688": {
      "brand": "Sound Devices",
      "powerDrawWatts": 10,
      "weight_g": 2210,
      "inputs": 12,
      "resolution": "24-bit",
      "powerOptions": ["Hirose 4-pin (10-18V)", "5x AA", "SL-6 slot"],
      "notes": "12-input mixer/recorder. Power draw estimate with phantom power.",
      "verified_source": "https://www.sounddevices.com/product/688/"
    },
    "Sound Devices 888": {
      "brand": "Sound Devices",
      "powerDrawWatts": 16.6,
      "weight_g": 1830,
      "inputs": 16,
      "resolution": "32-bit float",
      "powerOptions": ["Hirose 4-pin (10-18V)", "2x L-Mount"],
      "notes": "16-channel portable mixer-recorder. Power draw max with Dante.",
      "verified_source": "https://www.sounddevices.com/product/888/"
    },
    "Sound Devices 664": {
      "brand": "Sound Devices",
      "powerDrawWatts": 15,
      "weight_g": 2150,
      "inputs": 12,
      "resolution": "24-bit",
      "powerOptions": ["Hirose 4-pin (10-18V)", "5x AA"],
      "notes": "12-input field production mixer. High power consumption noted.",
      "verified_source": "https://www.sounddevices.com/product/664/"
    },
    "Zoom F8n Pro": {
      "brand": "Zoom",
      "powerDrawWatts": 15,
      "weight_g": 1200,
      "inputs": 8,
      "resolution": "32-bit float",
      "powerOptions": ["4-pin Hirose (9-18V)", "8x AA", "AC Adapter"],
      "notes": "Professional 8-input field recorder.",
      "verified_source": "https://zoomcorp.com/en/us/field-recorders/field-recorders/f8n-pro/"
    },
    "Zoom F6": {
      "brand": "Zoom",
      "powerDrawWatts": 10,
      "weight_g": 520,
      "inputs": 6,
      "resolution": "32-bit float",
      "powerOptions": ["Sony L-Series", "4x AA", "USB-C"],
      "notes": "Ultra-compact 6-input field recorder.",
      "verified_source": "https://zoomcorp.com/en/us/field-recorders/field-recorders/f6/"
    },
    "Sennheiser MKH 416": {
      "brand": "Sennheiser",
      "powerDrawWatts": 0.1,
      "weight_g": 165,
      "type": "Shotgun (Supercardioid/Lobar)",
      "phantomPower": "48V (2mA)",
      "notes": "Industry standard short shotgun microphone.",
      "verified_source": "https://en-us.sennheiser.com/mkh-416-p48u3"
    },
    "Sennheiser MKH 50": {
      "brand": "Sennheiser",
      "powerDrawWatts": 0.1,
      "weight_g": 100,
      "type": "Supercardioid",
      "phantomPower": "48V (2mA)",
      "notes": "Ideal for indoor dialogue recording.",
      "verified_source": "https://en-us.sennheiser.com/mkh-50-p48"
    },
    "Schoeps CMIT 5U": {
      "brand": "Schoeps",
      "powerDrawWatts": 0.2,
      "weight_g": 89,
      "type": "Shotgun",
      "phantomPower": "48V (4.4mA)",
      "notes": "Lightweight blue shotgun microphone with low off-axis coloration.",
      "verified_source": "https://schoeps.de/en/products/shotgun-microphones/cmit-series/cmit-5.html"
    },
    "Sanken CS-3e": {
      "brand": "Sanken",
      "powerDrawWatts": 0.12,
      "weight_g": 120,
      "type": "Mono Shotgun",
      "phantomPower": "48V (2.5mA)",
      "notes": "Sharp directivity with 3-capsule design.",
      "verified_source": "https://www.sankenmicrophones.com/production/shotgun/cs-3e/"
    }
  };
  if (typeof registerDevice === 'function') {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = registerDevice('audio', audioData);
    } else {
      registerDevice('audio', audioData);
    }
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = audioData;
  } else {
    globalThis.devices = globalThis.devices || {};
    globalThis.devices.audio = audioData;
  }
})();