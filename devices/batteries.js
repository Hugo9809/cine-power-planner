(() => {
const batteryData = {
  "None": {
    "capacity": 0,
    "pinA": 0,
    "dtapA": 0,
    "mount_type": "N/A"
  },
  "Bebob V45micro": {
    "capacity": 43,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Bebob V98micro": {
    "capacity": 95,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 550
  },
  "Bebob V150micro": {
    "capacity": 143,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 770
  },
  "Bebob V200micro": {
    "capacity": 190,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Bebob V240micro": {
    "capacity": 238,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Bebob V90RM-Cine": {
    "capacity": 85,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Bebob V155RM-Cine": {
    "capacity": 156,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Bebob V290RM-Cine": {
    "capacity": 285,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 1390
  },
  "Bebob B90cine": {
    "capacity": 86,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "B-Mount"
  },
  "Bebob B155cine": {
    "capacity": 155,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "B-Mount",
    "weight_g": 1000
  },
  "Bebob B290cine": {
    "capacity": 294,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "B-Mount"
  },
  "Bebob B480cine": {
    "capacity": 475,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "B-Mount"
  },
  "Bebob B90cineML": {
    "capacity": 86,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "B-Mount"
  },
  "Bebob B155cineML": {
    "capacity": 156,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "B-Mount"
  },
  "Swit MINO-S70 (V-Mount)": {
    "capacity": 70,
    "pinA": 8.3,
    "dtapA": 6,
    "mount_type": "V-Mount"
  },
  "Swit MINO-S140 (V-Mount)": {
    "capacity": 140,
    "pinA": 12.5,
    "dtapA": 8,
    "mount_type": "V-Mount"
  },
  "Swit MINO-S210 (V-Mount)": {
    "capacity": 210,
    "pinA": 16,
    "dtapA": 10,
    "mount_type": "V-Mount"
  },
  "Swit PB-M98S (Mini V-Mount)": {
    "capacity": 98,
    "pinA": 10,
    "dtapA": 6,
    "mount_type": "V-Mount"
  },
  "Swit PB-R290S (V-Mount)": {
    "capacity": 290,
    "pinA": 18,
    "dtapA": 10,
    "mount_type": "V-Mount"
  },
  "Swit PB-H260S (V-Mount)": {
    "capacity": 260,
    "pinA": 18,
    "dtapA": 10,
    "mount_type": "V-Mount"
  },
  "Swit HB-A290B (B-Mount)": {
    "capacity": 290,
    "pinA": 10,
    "dtapA": 3.75,
    "mount_type": "B-Mount"
  },
  "Swit PB-H290B (B-Mount)": {
    "capacity": 290,
    "pinA": 10,
    "dtapA": 3.75,
    "mount_type": "B-Mount"
  },
  "Swit BIVO-98 (B-Mount)": {
    "capacity": 98,
    "pinA": 10,
    "dtapA": 10.4,
    "mount_type": "B-Mount"
  },
  "Swit BIVO-160 (B-Mount)": {
    "capacity": 160,
    "pinA": 10,
    "dtapA": 10.4,
    "mount_type": "B-Mount"
  },
  "Swit BIVO-200 (B-Mount)": {
    "capacity": 196,
    "pinA": 10,
    "dtapA": 10.4,
    "mount_type": "B-Mount"
  },
  "Swit CIMO-98S (V-Mount)": {
    "capacity": 98,
    "pinA": 12,
    "dtapA": 12,
    "mount_type": "V-Mount"
  },
  "Swit CIMO-160S (V-Mount)": {
    "capacity": 160,
    "pinA": 16,
    "dtapA": 16,
    "mount_type": "V-Mount"
  },
  "Swit CIMO-200S (V-Mount)": {
    "capacity": 196,
    "pinA": 16,
    "dtapA": 16,
    "mount_type": "V-Mount"
  },
  "Swit CIMO-290S (V-Mount)": {
    "capacity": 290,
    "pinA": 20,
    "dtapA": 20,
    "mount_type": "V-Mount"
  },
  "Anton/Bauer Titon 90 (V-Mount)": {
    "capacity": 92,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Anton/Bauer Titon 150 (V-Mount)": {
    "capacity": 144,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Anton/Bauer Titon 240 (V-Mount)": {
    "capacity": 240,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Anton/Bauer Dionic XT90 (V-Mount)": {
    "capacity": 99,
    "pinA": 12,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Anton/Bauer Dionic XT150 (V-Mount)": {
    "capacity": 156,
    "pinA": 12,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Anton/Bauer Dionic 240Wh (V-Mount)": {
    "capacity": 240,
    "pinA": 12,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Anton/Bauer Dionic 26V 98Wh (B-Mount)": {
    "capacity": 98,
    "pinA": 12,
    "dtapA": 0,
    "mount_type": "B-Mount"
  },
  "Anton/Bauer Dionic 26V 240Wh (B-Mount)": {
    "capacity": 240,
    "pinA": 12,
    "dtapA": 0,
    "mount_type": "B-Mount"
  },
  "Core SWX NANO Micro 98Wh (V-Mount)": {
    "capacity": 98,
    "pinA": 10,
    "dtapA": 10,
    "mount_type": "V-Mount"
  },
  "Core SWX NANO Micro 150Wh (V-Mount)": {
    "capacity": 150,
    "pinA": 10,
    "dtapA": 10,
    "mount_type": "V-Mount"
  },
  "Core SWX Helix Max 98Wh (V-Mount)": {
    "capacity": 98,
    "pinA": 20,
    "dtapA": 7.14,
    "mount_type": "V-Mount"
  },
  "Core SWX Helix Max 150Wh (V-Mount)": {
    "capacity": 147,
    "pinA": 20,
    "dtapA": 7.14,
    "mount_type": "V-Mount"
  },
  "Core SWX Helix Max 360Wh (V-Mount)": {
    "capacity": 360,
    "pinA": 20,
    "dtapA": 7.14,
    "mount_type": "V-Mount"
  },
  "Core SWX Helix Max 98Wh (B-Mount)": {
    "capacity": 98,
    "pinA": 10,
    "dtapA": 0,
    "mount_type": "B-Mount"
  },
  "Core SWX Helix Max 150Wh (B-Mount)": {
    "capacity": 147,
    "pinA": 10,
    "dtapA": 0,
    "mount_type": "B-Mount"
  },
  "Core SWX Apex 150 (V-Mount)": {
    "capacity": 150,
    "pinA": 16,
    "dtapA": 12,
    "mount_type": "V-Mount"
  },
  "Core SWX Apex 360 (V-Mount)": {
    "capacity": 360,
    "pinA": 16,
    "dtapA": 12,
    "mount_type": "V-Mount"
  },
  "IDX Imicro-98 (V-Mount)": {
    "capacity": 97,
    "pinA": 10,
    "dtapA": 5.56,
    "mount_type": "V-Mount"
  },
  "IDX Imicro-150 (V-Mount)": {
    "capacity": 145,
    "pinA": 10,
    "dtapA": 5.56,
    "mount_type": "V-Mount"
  },
  "IDX DUO-C98 (V-Mount)": {
    "capacity": 97,
    "pinA": 10,
    "dtapA": 5.56,
    "mount_type": "V-Mount"
  },
  "IDX DUO-C150 (V-Mount)": {
    "capacity": 143,
    "pinA": 14,
    "dtapA": 5.56,
    "mount_type": "V-Mount"
  },
  "IDX DUO-C198 (V-Mount)": {
    "capacity": 196,
    "pinA": 14,
    "dtapA": 5.56,
    "mount_type": "V-Mount"
  },
  "IDX CUE-D95 (V-Mount)": {
    "capacity": 91,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "IDX CUE-D150 (V-Mount)": {
    "capacity": 146,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "IDX HV-160B (B-Mount)": {
    "capacity": 160,
    "pinA": 15,
    "dtapA": 10,
    "mount_type": "B-Mount"
  },
  "IDX HV-320B (B-Mount)": {
    "capacity": 320,
    "pinA": 15,
    "dtapA": 10,
    "mount_type": "B-Mount"
  },
  "SmallRig VB50 mini (V-Mount)": {
    "capacity": 50,
    "pinA": 8,
    "dtapA": 10,
    "mount_type": "V-Mount"
  },
  "SmallRig VB99 mini (V-Mount)": {
    "capacity": 99,
    "pinA": 10,
    "dtapA": 10,
    "mount_type": "V-Mount"
  },
  "SmallRig VB155 mini (V-Mount)": {
    "capacity": 155,
    "pinA": 12,
    "dtapA": 10,
    "mount_type": "V-Mount"
  },
  "SmallRig VB210 mini (V-Mount)": {
    "capacity": 210,
    "pinA": 14,
    "dtapA": 10,
    "mount_type": "V-Mount"
  },
  "SmallRig VB99 Pro mini (V-Mount)": {
    "capacity": 99,
    "pinA": 10,
    "dtapA": 10,
    "mount_type": "V-Mount"
  },
  "SmallRig VB212 mini (V-Mount)": {
    "capacity": 212,
    "pinA": 14.7,
    "dtapA": 10,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods Mini V-Lok 50Wh": {
    "capacity": 50,
    "pinA": 6,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods Mini V-Lok 98Wh": {
    "capacity": 98,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods Mini V-Lok 150Wh": {
    "capacity": 150,
    "pinA": 12,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods Mini V-Lok 200Wh": {
    "capacity": 200,
    "pinA": 16,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods Mini V-Lok 250Wh": {
    "capacity": 250,
    "pinA": 16,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods V-Lok 95Wh (VL-95S)": {
    "capacity": 95,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods V-Lok 200Wh (VL-200S)": {
    "capacity": 200,
    "pinA": 16,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods V-Lok 350Wh (VL-350N High Performance)": {
    "capacity": 350,
    "pinA": 15,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods X-Lok 98Wh (XL-98)": {
    "capacity": 98,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods X-Lok 150Wh (XL-150)": {
    "capacity": 150,
    "pinA": 12,
    "dtapA": 5,
    "mount_type": "V-Mount"
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = batteryData;
} else {
  globalThis.devices = globalThis.devices || {};
  globalThis.devices.batteries = batteryData;
}
})();
