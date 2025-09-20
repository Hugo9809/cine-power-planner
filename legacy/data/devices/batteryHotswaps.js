(function () {
  var hotswapData = {
    "None": {
      capacity: 0,
      pinA: Infinity,
      mount_type: "N/A"
    },
    "bebob ML-120V/V-HL": {
      capacity: 0,
      pinA: 20,
      mount_type: "V-Mount"
    },
    "bebob ML-120V/V": {
      capacity: 0,
      pinA: 15,
      mount_type: "V-Mount"
    },
    "SHAPE HSP36 Hot Swap Power Box": {
      capacity: 36,
      pinA: 20,
      mount_type: "V-Mount"
    },
    "BlueShape MVQUICK Hot-Swap System": {
      capacity: 21,
      pinA: 10,
      mount_type: "V-Mount"
    },
    "FX-Lion NANO Dual V-Mount Hot-Swap Plate": {
      capacity: 0,
      pinA: 8,
      mount_type: "V-Mount"
    },
    "bebob B90cineML": {
      capacity: 86,
      pinA: 20,
      mount_type: "B-Mount"
    },
    "bebob B155cineML": {
      capacity: 156,
      pinA: 20,
      mount_type: "B-Mount"
    },
    "SWIT KA-B30B B-mount to B-mount Hot-Swap Plate": {
      capacity: 32,
      pinA: 7.14,
      mount_type: "B-Mount"
    },
    "SWIT KA-R31B B-mount Hot-Swap Plate": {
      capacity: 32,
      pinA: 7.14,
      mount_type: "B-Mount"
    },
    "IDX A-HS30B B-Mount to B-Mount Hot-Swap Plate": {
      capacity: 32,
      pinA: 7.14,
      mount_type: "B-Mount"
    }
  };
  registerDevice('batteryHotswaps', hotswapData);
})();