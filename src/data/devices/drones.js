
/* global registerDevice */
(() => {
    const dronesData = {
        "DJI Inspire 3": {
            "brand": "DJI",
            "powerDrawWatts": 500,
            "weight_g": 3995,
            "type": "Cinema Drone (8K Full-Frame)",
            "powerOptions": ["TB51 Intelligent Battery (Dual)"],
            "notes": "Approx. 500W average power draw during flight (based on 25 min flight time with 2x 98.8Wh batteries).",
            "verified_source": "https://www.dji.com/inspire-3/specs"
        },
        "DJI Inspire 2": {
            "brand": "DJI",
            "powerDrawWatts": 470,
            "weight_g": 3440,
            "type": "Cinema Drone (5.2K/6K)",
            "powerOptions": ["TB50 Intelligent Battery (Dual)"],
            "notes": "Approx. 470W average power draw during flight (based on 25 min flight time with 2x 97.58Wh batteries).",
            "verified_source": "https://www.dji.com/inspire-2/specs"
        },
        "DJI Mavic 3 Pro Cine": {
            "brand": "DJI",
            "powerDrawWatts": 100,
            "weight_g": 963,
            "type": "Cinema Drone (Triple Camera)",
            "powerOptions": ["Mavic 3 Intelligent Flight Battery (77Wh)"],
            "notes": "Max charging power 100W. Flight power draw varies significantly.",
            "verified_source": "https://www.dji.com/mavic-3-pro/specs"
        },
        "DJI Mavic 3 Cine": {
            "brand": "DJI",
            "powerDrawWatts": 65,
            "weight_g": 899,
            "type": "Cinema Drone (Dual Camera)",
            "powerOptions": ["Mavic 3 Intelligent Flight Battery (77Wh)"],
            "notes": "Max charging power 65W. Flight power draw varies significantly.",
            "verified_source": "https://www.dji.com/mavic-3/specs"
        },
        "DJI Air 3S": {
            "brand": "DJI",
            "powerDrawWatts": 80,
            "weight_g": 724,
            "type": "Drone (Dual Camera)",
            "powerOptions": ["Intelligent Flight Battery (4276mAh, 62.5Wh)"],
            "notes": "Power draw estimate based on battery capacity and flight time.",
            "verified_source": "https://www.dji.com/air-3s/specs"
        }
    };

    if (typeof registerDevice === 'function') {
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = registerDevice('drones', dronesData);
        } else {
            registerDevice('drones', dronesData);
        }
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = dronesData;
    } else {
        globalThis.devices = globalThis.devices || {};
        globalThis.devices.drones = dronesData;
    }
})();
