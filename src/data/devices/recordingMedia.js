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

    registerDevice('recordingMediaBrands', brands);
    registerDevice('recordingMediaSizes', sizes);
})();
