/* global registerDevice */
(() => {
const chargerData = {
  "Anton/Bauer LP4 Gold Mount Charger": {
    mount: "Gold-Mount",
    slots: 4,
    inputVoltageV: "100-240",
    inputConnector: "AC IEC",
    perBayCurrentA: 4,
    chargingSpeedAmps: 4,
    totalPowerW: null,
    chargeModes: ["Simultaneous"],
    dimensions_mm: [292, 216, 118],
    weight_g: 2700,
    provenance: [
      {
        quote: "Simultaneously charge up to four Gold Mount batteries. Input: 100-240 VAC. Charge current: 4A per channel.",
        url: "https://www.antonbauer.com/en/product/lp4-gold-mount-charger/",
        access_date: "2025-09-14"
      }
    ]
  },
  "Anton/Bauer LP2 Gold Mount Charger": {
    mount: "Gold-Mount",
    slots: 2,
    inputVoltageV: "100-240",
    inputConnector: "AC IEC",
    perBayCurrentA: 4,
    chargingSpeedAmps: 4,
    totalPowerW: null,
    chargeModes: ["Simultaneous"],
    dimensions_mm: [140, 216, 118],
    weight_g: 1300,
    provenance: [
      {
        quote: "Dual Gold Mount battery charger. Input: 100-240 VAC. Charge current: 4A per channel.",
        url: "https://www.antonbauer.com/en/product/lp2-gold-mount-charger/",
        access_date: "2025-09-14"
      }
    ]
  },
  "Anton/Bauer LP2 Gold Mount Plus Charger": {
    mount: "Gold-Mount",
    notes: "Gold Mount Plus 26V charger",
    slots: 2,
    inputVoltageV: "100-240",
    inputConnector: "AC IEC",
    perBayCurrentA: 4,
    chargingSpeedAmps: 4,
    totalPowerW: null,
    chargeModes: ["Simultaneous"],
    dimensions_mm: [140, 216, 118],
    weight_g: 1400,
    provenance: [
      {
        quote: "LP2 Gold Mount Plus Charger designed for Anton/Bauer Dionic 26V batteries. Input 100-240VAC, 4A per channel.",
        url: "https://www.antonbauer.com/en/product/lp2-gold-mount-plus-charger/",
        access_date: "2025-09-14"
      }
    ]
  },
  "Anton/Bauer Performance Quad Gold Mount Charger": {
    mount: "Gold-Mount",
    slots: 4,
    inputVoltageV: "100-240",
    inputConnector: "AC IEC",
    perBayCurrentA: 4,
    chargingSpeedAmps: 4,
    chargeModes: ["Simultaneous", "Discharge"],
    dimensions_mm: [292, 216, 118],
    weight_g: 3000,
    provenance: [
      {
        quote: "Performance Quad Charger Gold Mount — simultaneous 4-position fast charger with integrated discharge and battery management.",
        url: "https://www.antonbauer.com/en/product/performance-quad-gold-mount-charger/",
        access_date: "2025-09-14"
      }
    ]
  },
  "Anton/Bauer Performance Dual Gold Mount Charger": {
    mount: "Gold-Mount",
    slots: 2,
    inputVoltageV: "100-240",
    inputConnector: "AC IEC",
    perBayCurrentA: 4,
    chargingSpeedAmps: 4,
    chargeModes: ["Simultaneous", "Discharge"],
    dimensions_mm: [140, 216, 118],
    weight_g: 2000,
    provenance: [
      {
        quote: "Performance Dual Charger Gold Mount — two-position simultaneous, multi-chemistry charger with discharge mode.",
        url: "https://www.antonbauer.com/en/product/performance-dual-gold-mount-charger/",
        access_date: "2025-09-14"
      }
    ]
  },
  "Anton/Bauer GM4 4-Position Micro Gold Mount Charger": {
    mount: "Gold-Mount",
    notes: "Micro Gold Mount charger",
    slots: 4,
    inputVoltageV: "100-240",
    perBayCurrentA: null,
    chargeModes: ["Simultaneous"],
    provenance: [
      {
        quote: "GM4 4-Position Micro Battery Charger Gold Mount — charges 4 micro or 2 full-size batteries simultaneously.",
        url: "https://www.antonbauer.com/en/product/gm4-4-position-micro-battery-charger-gold-mount/",
        access_date: "2025-09-14"
      }
    ]
  },
  "Core SWX Fleet Micro 3S Gold Mount": {
    mount: "Gold-Mount",
    slots: 3,
    inputVoltageV: "90-240",
    inputConnector: "AC IEC",
    perBayCurrentA: 3,
    chargingSpeedAmps: 3,
    provenance: [
      {
        quote: "Fleet Micro series… available in 3 position (3S) Gold Mount… Input: 90-240VAC, charge current 3A per bay.",
        url: "https://coreswx.com/product/fleet-micro-3s/",
        access_date: "2025-09-14"
      }
    ]
  },
  "Core SWX Fleet Micro 4S Gold Mount": {
    mount: "Gold-Mount",
    slots: 4,
    inputVoltageV: "90-240",
    inputConnector: "AC IEC",
    perBayCurrentA: 3,
    chargingSpeedAmps: 3,
    provenance: [
      {
        quote: "Fleet Micro 4S charger… four position simultaneous Gold Mount… Input 90-240VAC, 3A charge current per bay.",
        url: "https://coreswx.com/product/fleet-micro-4s/",
        access_date: "2025-09-14"
      }
    ]
  },
  "Core SWX Fleet D2A Dual Gold Mount Charger": {
    mount: "Gold-Mount",
    slots: 2,
    inputVoltageV: "90-240",
    perBayCurrentA: 3,
    chargingSpeedAmps: 3,
    provenance: [
      {
        quote: "Fleet-D2A Dual Gold Mount charger — Input: 90-240VAC, charge current 3A per bay.",
        url: "https://coreswx.com/product/fleet-d2a/",
        access_date: "2025-09-14"
      }
    ]
  },
  "Core SWX Fleet Q4A Gold Mount Charger": {
    mount: "Gold-Mount",
    slots: 4,
    inputVoltageV: "90-240",
    perBayCurrentA: 3,
    chargingSpeedAmps: 3,
    provenance: [
      {
        quote: "Fleet Q Gold Mount four-position charger… 3A charging current, can charge four 98Wh batteries in about 2.5 hours.",
        url: "https://omegabroadcast.com/core-swx-fleet-q-gold-mount-four-position-charger/",
        access_date: "2025-09-14"
      }
    ]
  },
  "Core SWX X4 Micro Quad Charger Gold Mount": {
    mount: "Gold-Mount",
    slots: 4,
    inputVoltageV: "90-240",
    perBayCurrentA: 2.6,
    chargingSpeedAmps: 2.6,
    provenance: [
      {
        quote: "X4 Micro Quad Charger Gold Mount… 2.6A when charging 4 batteries, 3A when charging fewer.",
        url: "https://hotrodcameras.com/products/core-swx-x4-micro-quad-charger-gold-mount",
        access_date: "2025-09-14"
      }
    ]
  },
  "Core SWX Mach4 Dual Gold Mount Charger": {
    mount: "Gold-Mount",
    slots: 2,
    inputVoltageV: "90-240",
    perBayCurrentA: 4,
    chargingSpeedAmps: 4,
    provenance: [
      {
        quote: "Mach4 Dual Gold Mount Charger… 4A simultaneous charge current.",
        url: "https://www.filmtools.com/core-swx-gold-mount-mach4-dual-charger.html",
        access_date: "2025-09-14"
      }
    ]
  },
  "bebob AS2-RL": {
    mount: "Gold-Mount",
    notes: "A-Mount (Gold-Mount compatible)",
    slots: 2,
    inputVoltageV: "90-264",
    perBayCurrentA: 2.5,
    chargingSpeedAmps: 2.5,
    totalPowerW: 82,
    outputs: ["XLR 4-pin DC 16.5V / 5A"],
    weight_g: 1000,
    dimensions_mm: [100, 231, 141],
    provenance: [
      {
        quote: "2-Channel A-Mount (Gold-Mount compatible)… Charging Current 16.8V/2.5A… Built-in AC Adapter 82W… Weight 1kg… Dimensions 100 x 231 x 141 mm",
        url: "https://bebob.de/en/as2-rl.html",
        access_date: "2025-09-14"
      }
    ]
  },
  "bebob AS2": {
    mount: "Gold-Mount",
    notes: "A-Mount (Gold-Mount compatible)",
    slots: 2,
    inputVoltageV: "90-264",
    perBayCurrentA: 2.5,
    chargingSpeedAmps: 2.5,
    totalPowerW: 82,
    outputs: ["XLR 4-pin DC 16.5V / 5A"],
    weight_g: 1000,
    dimensions_mm: [100, 231, 141],
    provenance: [
      {
        quote: "2-Channel A-Mount (Gold-Mount compatible)… Charging Current 16.8V/2.5A… Built-in AC Adapter 82W… Weight 1kg… Dimensions 100 x 231 x 141 mm",
        url: "https://bebob.de/en/as2.html",
        access_date: "2025-09-14"
      }
    ]
  },
  "bebob AS2MICRO": {
    mount: "Gold-Mount",
    notes: "Gold Mount Micro charger",
    slots: 2,
    inputVoltageV: "90-264",
    perBayCurrentA: 2.5,
    chargingSpeedAmps: 2.5,
    weight_g: 530,
    dimensions_mm: [92, 66, 45],
    provenance: [
      {
        quote: "Charger Compatibility: Gold Mount… 2-Channel… AC Adapter to D-Tap DC Plug… 16.8V, 2.5A charge current… Dimensions 92 x 66 x 45 mm… Weight 530 g… Recharge Time: 1.5 to 3.5 Hours",
        url: "https://www.bhphotovideo.com/c/product/803238240-USE/bebob_as2micro_2_channel_gold_mount_simultaneous.html",
        access_date: "2025-09-14"
      }
    ]
  },
  "bebob AS4Micro": {
    mount: "Gold-Mount",
    notes: "Gold Mount Micro charger",
    slots: 4,
    inputVoltageV: null,
    perBayCurrentA: null,
    outputs: ["XLR DC out"],
    provenance: [
      {
        quote: "4-Channel AS4Micro Charger from Bebob… compatible with Gold mount… built-in AC adapter, 4-pin XLR DC output, and cooling fan.",
        url: "https://www.fivepennypictures.com/product-page/bebob-as4micro-gold-mount-4-channel-charger-with-4-pin-xlr-out",
        access_date: "2025-09-14"
      }
    ]
  },
  "bebob AGN4 Wall Charger": {
    mount: "Gold-Mount",
    notes: "A-Mount (Gold-Mount compatible)",
    slots: 4,
    inputVoltageV: "90-264",
    perBayCurrentA: 2.5,
    chargingSpeedAmps: 2.5,
    totalPowerW: 168,
    weight_g: 3870,
    dimensions_mm: [270, 67.5, 410],
    provenance: [
      {
        quote: "Wall-mounted chargers… provide 168 watts… 16.8V or 10A total (4 channels at 2.5A)… for A-Mount batteries… Weight approx 4kg… Dimensions 270 x 67.5 x 410 mm",
        url: "https://www.globalbroadcastindustry.news/bebob-launches-4-or-8-channel-wall-chargers-for-complete-battery-portfolio-gn4-8",
        access_date: "2025-09-14"
      }
    ]
  }
};
if (typeof registerDevice === "function") {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = registerDevice("accessories.chargers", chargerData);
  } else {
    registerDevice("accessories.chargers", chargerData);
  }
} else if (typeof module !== "undefined" && module.exports) {
  module.exports = chargerData;
} else {
  globalThis.devices = globalThis.devices || {};
  globalThis.devices.accessories = globalThis.devices.accessories || {};
  globalThis.devices.accessories.chargers = chargerData;
}
})();
