/* global registerDevice */
(() => {
const hotswapData = {
  "None": { capacity: 0, pinA: Infinity, mount_type: "N/A" },
  "bebob ML-120V/V-HL": { capacity: 0, pinA: 20, mount_type: "V-Mount" },
  "bebob ML-120V/V": { capacity: 0, pinA: 15, mount_type: "V-Mount" },
  "SHAPE HSP36 Hot Swap Power Box": { capacity: 36, pinA: 20, mount_type: "V-Mount" },
  "BlueShape MVQUICK Hot-Swap System": { capacity: 21, pinA: 10, mount_type: "V-Mount" },
  "FX-Lion NANO Dual V-Mount Hot-Swap Plate": { capacity: 0, pinA: 8, mount_type: "V-Mount" },
  "bebob B90cineML": { capacity: 86, pinA: 20, mount_type: "B-Mount" },
  "bebob B155cineML": { capacity: 156, pinA: 20, mount_type: "B-Mount" },
  "bebob B290cineML": { capacity: 294, pinA: 20, mount_type: "B-Mount" },
  "bebob B480cineML": { capacity: 475, pinA: 20, mount_type: "B-Mount" },
  "Core SWX HLX-TB-B Helix Max Hot Swap Plate": { capacity: 98, pinA: 20, mount_type: "B-Mount" },
  "Hawk-Woods BL-SF1 B-Lok Dual Hot Swap Plate": { capacity: 52, pinA: 10, mount_type: "B-Mount" },
  "Anton/Bauer B-Mount Hot Swap Bracket": { capacity: 26, pinA: 12, mount_type: "B-Mount" },
  "SWIT KA-B30B B-mount to B-mount Hot-Swap Plate": { capacity: 32, pinA: 7.14, mount_type: "B-Mount" },
  "SWIT KA-S30B B-mount Hot-Swap Plate": { capacity: 32, pinA: 7, mount_type: "B-Mount" },
  "SWIT KA-R31B B-mount Hot-Swap Plate": { capacity: 32, pinA: 7.14, mount_type: "B-Mount" },
  "IDX A-HS30B B-Mount to B-Mount Hot-Swap Plate": { capacity: 32, pinA: 7.14, mount_type: "B-Mount" }
};
registerDevice('batteryHotswaps', hotswapData);
})();
