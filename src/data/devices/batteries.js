/* global registerDevice */
(() => {
const batteryData = {
  "None": {
    "capacity": 0,
    "pinA": 0,
    "dtapA": 0,
    "mount_type": "N/A"
  },
  "Bebob V45micro (V-Mount)": {
    "capacity": 43,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 330
  },
  "Bebob V98micro (V-Mount)": {
    "capacity": 95,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 550
  },
  "Bebob V150micro (V-Mount)": {
    "capacity": 143,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 770
  },
  "Bebob V200micro (V-Mount)": {
    "capacity": 190,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 950
  },
  "Bebob V240micro (V-Mount)": {
    "capacity": 238,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 1180
  },
  "Bebob V90RM-Cine (V-Mount)": {
    "capacity": 85,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 820
  },
  "Bebob V155RM-Cine (V-Mount)": {
    "capacity": 156,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 1000
  },
  "Bebob V290RM-Cine (V-Mount)": {
    "capacity": 285,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 1390
  },
  "Bebob B90cine (B-Mount)": {
    "capacity": 86,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "B-Mount",
    "weight_g": 622
  },
  "Bebob B155cine (B-Mount)": {
    "capacity": 155,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "B-Mount",
    "weight_g": 1000
  },
  "Bebob B290cine (B-Mount)": {
    "capacity": 294,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "B-Mount",
    "weight_g": 1800
  },
  "Bebob B480cine (B-Mount)": {
    "capacity": 475,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "B-Mount",
    "weight_g": 2360
  },
  "Bebob B90cineML (B-Mount)": {
    "capacity": 86,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "B-Mount",
    "weight_g": 720
  },
  "Bebob B155cineML (B-Mount)": {
    "capacity": 156,
    "pinA": 20,
    "dtapA": 5,
    "mount_type": "B-Mount",
    "weight_g": 1040
  },
  "Swit MINO-S70 (V-Mount)": {
    "capacity": 70,
    "pinA": 8.3,
    "dtapA": 6,
    "mount_type": "V-Mount",
    "weight_g": 419
  },
  "Swit MINO-S140 (V-Mount)": {
    "capacity": 140,
    "pinA": 12.5,
    "dtapA": 8,
    "mount_type": "V-Mount",
    "weight_g": 713
  },
  "Swit MINO-S210 (V-Mount)": {
    "capacity": 210,
    "pinA": 16,
    "dtapA": 10,
    "mount_type": "V-Mount",
    "weight_g": 1020
  },
  "Swit PB-M98S (Mini V-Mount) (V-Mount)": {
    "capacity": 98,
    "pinA": 10,
    "dtapA": 6,
    "mount_type": "V-Mount",
    "weight_g": 510
  },
  "Swit PB-R290S (V-Mount)": {
    "capacity": 290,
    "pinA": 18,
    "dtapA": 10,
    "mount_type": "V-Mount",
    "weight_g": 1530
  },
  "Swit PB-H260S (V-Mount)": {
    "capacity": 260,
    "pinA": 18,
    "dtapA": 10,
    "mount_type": "V-Mount",
    "weight_g": 1500
  },
  "Swit HB-A290B (B-Mount)": {
    "capacity": 290,
    "pinA": 10,
    "dtapA": 3.75,
    "mount_type": "B-Mount",
    "weight_g": 1500
  },
  "Swit PB-H290B (B-Mount)": {
    "capacity": 290,
    "pinA": 10,
    "dtapA": 3.75,
    "mount_type": "B-Mount",
    "weight_g": 1578
  },
  "Swit BIVO-98 (B-Mount)": {
    "capacity": 98,
    "pinA": 10,
    "dtapA": 10.4,
    "mount_type": "B-Mount",
    "weight_g": 668
  },
  "Swit BIVO-160 (B-Mount)": {
    "capacity": 160,
    "pinA": 10,
    "dtapA": 10.4,
    "mount_type": "B-Mount",
    "weight_g": 1100
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
    "mount_type": "V-Mount",
    "weight_g": 798
  },
  "Anton/Bauer Titon 150 (V-Mount)": {
    "capacity": 144,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 1088
  },
  "Anton/Bauer Titon 240 (V-Mount)": {
    "capacity": 240,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 1740
  },
  "Anton/Bauer Dionic XT90 (V-Mount)": {
    "capacity": 99,
    "pinA": 12,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 800
  },
  "Anton/Bauer Dionic XT150 (V-Mount)": {
    "capacity": 156,
    "pinA": 12,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 1090
  },
  "Anton/Bauer Dionic 240Wh (V-Mount)": {
    "capacity": 240,
    "pinA": 12,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 1680
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
    "mount_type": "V-Mount",
    "weight_g": 544
  },
  "Core SWX NANO Micro 150Wh (V-Mount)": {
    "capacity": 150,
    "pinA": 10,
    "dtapA": 10,
    "mount_type": "V-Mount",
    "weight_g": 703
  },
  "Core SWX NANO X Micro 98Wh (V-Mount)": {
    "capacity": 98,
    "pinA": 10,
    "dtapA": 10,
    "mount_type": "V-Mount",
    "weight_g": 560
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
    "mount_type": "V-Mount",
    "weight_g": 998
  },
  "Core SWX Helix Max 360Wh (V-Mount)": {
    "capacity": 360,
    "pinA": 20,
    "dtapA": 7.14,
    "mount_type": "V-Mount",
    "weight_g": 1633
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
  "FXLion Nano One (V-Mount)": {
    "capacity": 50,
    "pinA": 8,
    "dtapA": 10,
    "mount_type": "V-Mount",
    "weight_g": 330
  },
  "FXLion Nano Two (V-Mount)": {
    "capacity": 98,
    "pinA": 10,
    "dtapA": 10,
    "mount_type": "V-Mount",
    "weight_g": 520
  },
  "FXLion Nano Three (V-Mount)": {
    "capacity": 150,
    "pinA": 12,
    "dtapA": 10,
    "mount_type": "V-Mount",
    "weight_g": 773
  },
  "FXLion Nano ONE Wireless (V-Mount)": {
    "capacity": 50,
    "pinA": 8,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 330
  },
  "FXLion Nano TWO Wireless (V-Mount)": {
    "capacity": 98,
    "pinA": 10,
    "dtapA": 10,
    "mount_type": "V-Mount",
    "weight_g": 520
  },
  "FXLion Nano THREE Wireless (V-Mount)": {
    "capacity": 150,
    "pinA": 10,
    "dtapA": 10,
    "mount_type": "V-Mount",
    "weight_g": 773
  },
  "FXLion BP-M98 Square Battery (V-Mount)": {
    "capacity": 98,
    "pinA": 7,
    "dtapA": 8,
    "mount_type": "V-Mount",
    "weight_g": 650
  },
  "FXLion BP-M150 Square Battery (V-Mount)": {
    "capacity": 148,
    "pinA": 8,
    "dtapA": 10,
    "mount_type": "V-Mount",
    "weight_g": 790
  },
  "FXLion BP-M200 Square Battery (V-Mount)": {
    "capacity": 198,
    "pinA": 12,
    "dtapA": 12,
    "mount_type": "V-Mount",
    "weight_g": 1040
  },
  "FXLion BP-M300 High Power Square Battery (V-Mount)": {
    "capacity": 300,
    "pinA": 18,
    "dtapA": 18,
    "mount_type": "V-Mount",
    "weight_g": 1700
  },
  "FXLion BP-HP600 High Power Waterproof Battery (V-Mount)": {
    "capacity": 559,
    "pinA": 30,
    "dtapA": 10,
    "mount_type": "V-Mount",
    "weight_g": 2784
  },
  "FXLion BP-7S230 26V Battery (V-Mount)": {
    "capacity": 230,
    "pinA": 15,
    "dtapA": 15,
    "mount_type": "V-Mount",
    "weight_g": 1180
  },
  "FXLion BP-7S270 26V Battery (V-Mount)": {
    "capacity": 270,
    "pinA": 15,
    "dtapA": 15,
    "mount_type": "V-Mount",
    "weight_g": 1190
  },
  "IDX Imicro-98 (V-Mount)": {
    "capacity": 97,
    "pinA": 10,
    "dtapA": 5.56,
    "mount_type": "V-Mount",
    "weight_g": 550
  },
  "IDX Imicro-98P (V-Mount)": {
    "capacity": 97,
    "pinA": 10,
    "dtapA": 5.56,
    "mount_type": "V-Mount",
    "weight_g": 380
  },
  "IDX Imicro-150 (V-Mount)": {
    "capacity": 145,
    "pinA": 10,
    "dtapA": 5.56,
    "mount_type": "V-Mount",
    "weight_g": 650
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
    "mount_type": "V-Mount",
    "weight_g": 910
  },
  "IDX DUO-C150P (V-Mount)": {
    "capacity": 143,
    "pinA": 14,
    "dtapA": 5.56,
    "mount_type": "V-Mount",
    "weight_g": 948
  },
  "IDX DUO-C198 (V-Mount)": {
    "capacity": 196,
    "pinA": 14,
    "dtapA": 5.56,
    "mount_type": "V-Mount",
    "weight_g": 1100
  },
  "IDX CUE-D95 (V-Mount)": {
    "capacity": 91,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 798
  },
  "IDX CUE-D150 (V-Mount)": {
    "capacity": 146,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "IDX CUE-J150 (V-Mount)": {
    "capacity": 146,
    "pinA": null,
    "dtapA": null,
    "mount_type": "V-Mount",
    "weight_g": 890
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
  "PAG PAGlink HC-PL150T (Gold Mount)": {
    "capacity": 150,
    "pinA": null,
    "dtapA": null,
    "mount_type": "Gold-Mount",
    "weight_g": 735
  },
  "PAG PAGlink HC-PL150T (V-Mount)": {
    "capacity": 150,
    "pinA": null,
    "dtapA": null,
    "mount_type": "V-Mount",
    "weight_g": 770
  },
  "PAG Mini PAGlink MPL50 (Gold Mount)": {
    "capacity": 50,
    "pinA": null,
    "dtapA": null,
    "mount_type": "Gold-Mount",
    "weight_g": 620
  },
  "PAG Mini PAGlink MPL50 (V-Mount)": {
    "capacity": 50,
    "pinA": null,
    "dtapA": null,
    "mount_type": "V-Mount",
    "weight_g": 620
  },
  "PAG L90 Slim (V-Mount)": {
    "capacity": 90,
    "pinA": null,
    "dtapA": null,
    "mount_type": "V-Mount",
    "weight_g": 567
  },
  "Rolux Dynasty III 150Wh (V-Mount)": {
    "capacity": 150,
    "pinA": null,
    "dtapA": null,
    "mount_type": "V-Mount",
    "weight_g": 900
  },
  "ZGCINE ZG-S150 (V-Mount)": {
    "capacity": 150,
    "pinA": null,
    "dtapA": null,
    "mount_type": "V-Mount",
    "weight_g": 940
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
    "mount_type": "V-Mount",
    "weight_g": 585
  },
  "SmallRig VB155 mini (V-Mount)": {
    "capacity": 155,
    "pinA": 12,
    "dtapA": 10,
    "mount_type": "V-Mount",
    "weight_g": 760
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
    "mount_type": "V-Mount",
    "weight_g": 1310
  },
  "SmallRig X-Touch X99 (V-Mount)": {
    "capacity": 99,
    "pinA": 6.8,
    "dtapA": 6.8,
    "mount_type": "V-Mount",
    "weight_g": 880
  },
  "Hawk-Woods Mini V-Lok 50Wh (V-Mount)": {
    "capacity": 50,
    "pinA": 6,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods Mini V-Lok 98Wh (V-Mount)": {
    "capacity": 98,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 500
  },
  "Hawk-Woods Mini V-Lok 150Wh (V-Mount)": {
    "capacity": 150,
    "pinA": 12,
    "dtapA": 5,
    "mount_type": "V-Mount",
    "weight_g": 710
  },
  "Hawk-Woods Mini V-Lok 200Wh (V-Mount)": {
    "capacity": 200,
    "pinA": 16,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods Mini V-Lok 250Wh (V-Mount)": {
    "capacity": 250,
    "pinA": 16,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods V-Lok 95Wh (VL-95S) (V-Mount)": {
    "capacity": 95,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods V-Lok 200Wh (VL-200S) (V-Mount)": {
    "capacity": 200,
    "pinA": 16,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods V-Lok 350Wh (VL-350N High Performance) (V-Mount)": {
    "capacity": 350,
    "pinA": 15,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods X-Lok 98Wh (XL-98) (V-Mount)": {
    "capacity": 98,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Hawk-Woods X-Lok 150Wh (XL-150) (V-Mount)": {
    "capacity": 150,
    "pinA": 12,
    "dtapA": 5,
    "mount_type": "V-Mount"
  },
  "Anton/Bauer Titon 90 (Gold-Mount)": {
    "capacity": 92,
    "pinA": 10,
    "dtapA": 10,
    "mount_type": "Gold-Mount"
  },
  "Anton/Bauer Titon 240 (Gold-Mount)": {
    "capacity": 238,
    "pinA": 10,
    "dtapA": 10,
    "mount_type": "Gold-Mount",
    "weight_g": 1320
  },
  "Anton/Bauer Dionic XT 90 (Gold-Mount)": {
    "capacity": 99,
    "pinA": 12,
    "dtapA": 12,
    "mount_type": "Gold-Mount"
  },
  "Anton/Bauer Dionic 26V 240 (Gold-Mount)": {
    "capacity": 240,
    "pinA": 12,
    "dtapA": 0,
    "mount_type": "Gold-Mount"
  },
  "Anton/Bauer Titon Micro 90 (Gold-Mount)": {
    "capacity": 94,
    "pinA": 10,
    "dtapA": 10,
    "mount_type": "Gold-Mount"
  },
  "Core SWX Hypercore NEO 150 Mini (Gold-Mount)": {
    "capacity": 147,
    "pinA": 12,
    "dtapA": 12,
    "mount_type": "Gold-Mount",
    "weight_g": 816
  },
  "Core SWX Helix Max 98 (Gold-Mount)": {
    "capacity": 98,
    "pinA": 20,
    "dtapA": 20,
    "mount_type": "Gold-Mount"
  },
  "Core SWX NANO Micro 98Wh (Gold-Mount)": {
    "capacity": 98,
    "pinA": 10,
    "dtapA": 10,
    "mount_type": "Gold-Mount",
    "weight_g": 544
  },
  "SWIT PB-S98A (Gold-Mount)": {
    "capacity": 98,
    "pinA": 12,
    "dtapA": 10,
    "mount_type": "Gold-Mount"
  },
  "SWIT PB-H290A (Gold-Mount)": {
    "capacity": 290,
    "pinA": 18,
    "dtapA": 10,
    "mount_type": "Gold-Mount"
  },
  "BLUESHAPE BG095HDmini (Gold-Mount)": {
    "capacity": 95,
    "pinA": 12,
    "dtapA": 10,
    "mount_type": "Gold-Mount"
  },
  "BLUESHAPE BV190HDplus (Gold-Mount)": {
    "capacity": 190,
    "pinA": 20,
    "dtapA": 12,
    "mount_type": "Gold-Mount"
  },
  "bebob A98micro (Gold-Mount)": {
    "capacity": 95,
    "pinA": 10,
    "dtapA": 5,
    "mount_type": "Gold-Mount",
    "weight_g": 550
  },
  "bebob A150 (Gold-Mount)": {
    "capacity": 143,
    "pinA": 16,
    "dtapA": 5,
    "mount_type": "Gold-Mount",
    "weight_g": 820
  },
  "Dynacore DM-155A (Gold-Mount)": {
    "capacity": 155,
    "pinA": 12,
    "dtapA": 10,
    "mount_type": "Gold-Mount",
    "weight_g": 820
  }
};

if (typeof registerDevice === 'function') {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = registerDevice('batteries', batteryData);
  } else {
    registerDevice('batteries', batteryData);
  }
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = batteryData;
} else {
  globalThis.devices = globalThis.devices || {};
  globalThis.devices.batteries = batteryData;
}
})();
