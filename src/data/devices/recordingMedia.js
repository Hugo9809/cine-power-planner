/* global registerDevice */
(() => {
    const brands = [
        "Angelbird",
        "Arri",
        "Axel Cine",
        "Blackmagic Design",
        "Canon",
        "CineGear",
        "Codex",
        "Delkin Devices",
        "Exascend",
        "FreeTail",
        "G-Technology",
        "Hoodman",
        "Integral",
        "Kingston",
        "Kinefinity",
        "LaCie",
        "Lexar",
        "OWC",
        "Panasonic",
        "Patriot",
        "PixelFlash",
        "PNY",
        "ProGrade Digital",
        "RED",
        "Samsung",
        "SanDisk",
        "Silicon Power",
        "Sony",
        "Team Group",
        "Toshiba",
        "Transcend",
        "Verbatim",
        "Wise Advanced",
        "Zitay"
    ];

    const sizes = [
        "16GB",
        "32GB",
        "64GB",
        "80GB",
        "120GB",
        "128GB",
        "160GB",
        "240GB",
        "256GB",
        "320GB",
        "480GB",
        "512GB",
        "640GB",
        "660GB",
        "960GB",
        "1TB",
        "1.3TB",
        "1.92TB",
        "2TB",
        "3.84TB",
        "4TB",
        "8TB"
    ];

    const media = {
        // --- Angelbird ---
        "Angelbird AV PRO CFexpress B SE 512GB": {
            brand: "Angelbird",
            model: "AV PRO CFexpress B SE",
            capacityGb: 512,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "Angelbird AV PRO CFexpress B SE 1TB": {
            brand: "Angelbird",
            model: "AV PRO CFexpress B SE",
            capacityTb: 1,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "Angelbird AV PRO CFexpress B MK2 1TB": {
            brand: "Angelbird",
            model: "AV PRO CFexpress B MK2",
            capacityTb: 1,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "Angelbird AV PRO CFexpress B MK2 2TB": {
            brand: "Angelbird",
            model: "AV PRO CFexpress B MK2",
            capacityTb: 2,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "Angelbird AV PRO CFexpress B MK2 4TB": {
            brand: "Angelbird",
            model: "AV PRO CFexpress B MK2",
            capacityTb: 4,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "Angelbird AV PRO CFexpress A SE 160GB": {
            brand: "Angelbird",
            model: "AV PRO CFexpress A SE",
            capacityGb: 160,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },
        "Angelbird AV PRO CFexpress A SE 330GB": {
            brand: "Angelbird",
            model: "AV PRO CFexpress A SE",
            capacityGb: 330,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },

        // --- Sony ---
        "Sony CFexpress Type A Tough 80GB": {
            brand: "Sony",
            model: "CFexpress Type A Tough",
            capacityGb: 80,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },
        "Sony CFexpress Type A Tough 160GB": {
            brand: "Sony",
            model: "CFexpress Type A Tough",
            capacityGb: 160,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },
        "Sony CFexpress Type A Tough 320GB": {
            brand: "Sony",
            model: "CFexpress Type A Tough",
            capacityGb: 320,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },
        "Sony CFexpress Type A Tough 640GB": {
            brand: "Sony",
            model: "CFexpress Type A Tough",
            capacityGb: 640,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },
        "Sony CFexpress Type A Tough 960GB": {
            brand: "Sony",
            model: "CFexpress Type A Tough",
            capacityGb: 960,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },
        "Sony CFexpress Type A Tough 1920GB": {
            brand: "Sony",
            model: "CFexpress Type A Tough",
            capacityTb: 1.92,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },

        // --- SanDisk ---
        "SanDisk Extreme Pro CFexpress Type B 64GB": {
            brand: "SanDisk",
            model: "Extreme Pro",
            capacityGb: 64,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "SanDisk Extreme Pro CFexpress Type B 128GB": {
            brand: "SanDisk",
            model: "Extreme Pro",
            capacityGb: 128,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "SanDisk Extreme Pro CFexpress Type B 256GB": {
            brand: "SanDisk",
            model: "Extreme Pro",
            capacityGb: 256,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "SanDisk Extreme Pro CFexpress Type B 512GB": {
            brand: "SanDisk",
            model: "Extreme Pro",
            capacityGb: 512,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },

        // --- ProGrade Digital ---
        "ProGrade Digital Cobalt CFexpress Type A 160GB": {
            brand: "ProGrade Digital",
            model: "Cobalt",
            capacityGb: 160,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },
        "ProGrade Digital Gold CFexpress Type A 240GB": {
            brand: "ProGrade Digital",
            model: "Gold",
            capacityGb: 240,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },
        "ProGrade Digital Gold CFexpress Type A 480GB": {
            brand: "ProGrade Digital",
            model: "Gold",
            capacityGb: 480,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },

        // --- Codex ---
        "Codex Compact Drive 1TB": {
            brand: "Codex",
            model: "Compact Drive",
            capacityTb: 1,
            interface: "Codex Compact Drive",
            supportedMedia: ["Codex Compact Drive"]
        },
        "Codex Compact Drive 2TB": {
            brand: "Codex",
            model: "Compact Drive",
            capacityTb: 2,
            interface: "Codex Compact Drive",
            supportedMedia: ["Codex Compact Drive"]
        },

        // --- RED ---
        "RED PRO CFast 2.0 512GB": {
            brand: "RED",
            model: "PRO CFast 2.0",
            capacityGb: 512,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
        },
        "RED MINI-MAG 480GB": {
            brand: "RED",
            model: "MINI-MAG",
            capacityGb: 480,
            interface: "RED MINI-MAG",
            supportedMedia: ["RED MINI-MAG"]
        },
        "RED MINI-MAG 960GB": {
            brand: "RED",
            model: "MINI-MAG",
            capacityGb: 960,
            interface: "RED MINI-MAG",
            supportedMedia: ["RED MINI-MAG"]
        },
    };

    registerDevice('recordingMediaBrands', brands);
    registerDevice('recordingMediaSizes', sizes);
    registerDevice('gearList.media', media);
})();
