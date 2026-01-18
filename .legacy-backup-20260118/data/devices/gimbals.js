(function () {
  var gimbalsData = {
    "DJI Ronin 2": {
      "brand": "DJI",
      "powerDrawWatts": 12,
      "weight_g": 5000,
      "payload_kg": 13.6,
      "powerOptions": ["TB50 Intelligent Battery (Dual)"],
      "notes": "Professional 3-axis gimbal. Weight is gimbal only. Supports 24V cameras.",
      "verified_source": "https://www.dji.com/ronin-2/info#specs"
    },
    "DJI RS 4 Pro": {
      "brand": "DJI",
      "powerDrawWatts": 5,
      "weight_g": 1242,
      "payload_kg": 4.5,
      "powerOptions": ["BG30 Grip (1950mAh, 30Wh)"],
      "notes": "Handheld gimbal. Weight is gimbal only. 2nd Gen Vertical Shooting.",
      "verified_source": "https://www.dji.com/rs-4-pro/specs"
    },
    "DJI RS 3 Pro": {
      "brand": "DJI",
      "powerDrawWatts": 5,
      "weight_g": 1143,
      "payload_kg": 4.5,
      "powerOptions": ["BG30 Grip (1950mAh, 30Wh)"],
      "notes": "Handheld gimbal. Weight is gimbal only.",
      "verified_source": "https://www.dji.com/rs-3-pro/specs"
    },
    "Freefly Mōvi Pro": {
      "brand": "Freefly",
      "powerDrawWatts": 10,
      "weight_g": 2650,
      "payload_kg": 6.8,
      "powerOptions": ["Mōvi Pro Battery (1.8Ah)", "SL4-Ground Battery (4.1Ah)"],
      "notes": "Professional 3-axis gimbal. Hot-swappable batteries.",
      "verified_source": "https://freeflysystems.com/movi-pro/specs"
    },
    "Zhiyun Crane 4": {
      "brand": "Zhiyun",
      "powerDrawWatts": 8,
      "weight_g": 1673,
      "payload_kg": 6,
      "powerOptions": ["Internal Battery (2600mAh)"],
      "notes": "3-axis handheld gimbal. Built-in fill light.",
      "verified_source": "https://www.zhiyun-tech.com/en/product/detail/702?type=website&page=second_nav&source=detail"
    },
    "DJI RS 4": {
      "brand": "DJI",
      "powerDrawWatts": 5,
      "weight_g": 1066,
      "payload_kg": 3,
      "powerOptions": ["Internal Battery (3000mAh, 21Wh)"],
      "notes": "Handheld gimbal. Weight is gimbal only. 2nd Gen Vertical Shooting.",
      "verified_source": "https://www.dji.com/rs-4/specs"
    }
  };
  if (typeof registerDevice === 'function') {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = registerDevice('gimbals', gimbalsData);
    } else {
      registerDevice('gimbals', gimbalsData);
    }
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = gimbalsData;
  } else {
    globalThis.devices = globalThis.devices || {};
    globalThis.devices.gimbals = gimbalsData;
  }
})();