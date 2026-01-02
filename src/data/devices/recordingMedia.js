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
        "Zitay",
        "Crucial",
        "Digiera",
        "Integral",
        "OWC",
        "Pergear",
        "Nikon"
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

        "Angelbird AV PRO CF 256GB": {
            brand: "Angelbird",
            model: "AV PRO CF",
            capacityGb: 256,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
        },
        "Angelbird AV PRO CF 512GB": {
            brand: "Angelbird",
            model: "AV PRO CF",
            capacityGb: 512,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
        },
        "Angelbird AV PRO CF 1TB": {
            brand: "Angelbird",
            model: "AV PRO CF",
            capacityTb: 1,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
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
        "SanDisk Pro-Cinema CFexpress Type B 320GB": {
            brand: "SanDisk",
            model: "Pro-Cinema",
            capacityGb: 320,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "SanDisk Pro-Cinema CFexpress Type B 640GB": {
            brand: "SanDisk",
            model: "Pro-Cinema",
            capacityGb: 640,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },

        // --- Lexar (CFexpress Type B) ---
        "Lexar Professional GOLD CFexpress Type B 128GB": {
            brand: "Lexar",
            model: "Professional GOLD",
            capacityGb: 128,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "Lexar Professional GOLD CFexpress Type B 512GB": {
            brand: "Lexar",
            model: "Professional GOLD",
            capacityGb: 512,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "Lexar Professional GOLD CFexpress Type B 1TB": {
            brand: "Lexar",
            model: "Professional GOLD",
            capacityTb: 1,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "Lexar Professional DIAMOND CFexpress Type B 128GB": {
            brand: "Lexar",
            model: "Professional DIAMOND",
            capacityGb: 128,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "Lexar Professional DIAMOND CFexpress Type B 256GB": {
            brand: "Lexar",
            model: "Professional DIAMOND",
            capacityGb: 256,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },

        // --- Delkin Devices (CFexpress Type B) ---
        "Delkin Devices Black CFexpress Type B 150GB": {
            brand: "Delkin Devices",
            model: "Black",
            capacityGb: 150,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "Delkin Devices Black CFexpress Type B 325GB": {
            brand: "Delkin Devices",
            model: "Black",
            capacityGb: 325,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "Delkin Devices Black CFexpress Type B 512GB": {
            brand: "Delkin Devices",
            model: "Black",
            capacityGb: 512,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "Delkin Devices POWER CFexpress Type B 128GB": {
            brand: "Delkin Devices",
            model: "POWER",
            capacityGb: 128,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "Delkin Devices POWER CFexpress Type B 512GB": {
            brand: "Delkin Devices",
            model: "POWER",
            capacityGb: 512,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "Delkin Devices POWER CFexpress Type B 1TB": {
            brand: "Delkin Devices",
            model: "POWER",
            capacityTb: 1,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },

        // --- Sony (CFexpress Type B) ---
        "Sony CEB-G Series CFexpress Type B 128GB": {
            brand: "Sony",
            model: "CEB-G Series",
            capacityGb: 128,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "Sony CEB-G Series CFexpress Type B 512GB": {
            brand: "Sony",
            model: "CEB-G Series",
            capacityGb: 512,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },

        // --- OWC (CFexpress Type B) ---
        "OWC Atlas Ultra CFexpress Type B 650GB": {
            brand: "OWC",
            model: "Atlas Ultra",
            capacityGb: 650,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "OWC Atlas Ultra CFexpress Type B 1TB": {
            brand: "OWC",
            model: "Atlas Ultra",
            capacityTb: 1,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },

        // --- Integral (CFexpress Type B) ---
        "Integral UltimaPro X2 CFexpress Type B 512GB": {
            brand: "Integral",
            model: "UltimaPro X2",
            capacityGb: 512,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },
        "Integral UltimaPro X2 CFexpress Type B 1TB": {
            brand: "Integral",
            model: "UltimaPro X2",
            capacityTb: 1,
            interface: "CFexpress Type B",
            supportedMedia: ["CFexpress Type B"]
        },

        "SanDisk Extreme Pro CFast 2.0 64GB": {
            brand: "SanDisk",
            model: "Extreme Pro CFast 2.0",
            capacityGb: 64,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
        },
        "SanDisk Extreme Pro CFast 2.0 128GB": {
            brand: "SanDisk",
            model: "Extreme Pro CFast 2.0",
            capacityGb: 128,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
        },
        "SanDisk Extreme Pro CFast 2.0 256GB": {
            brand: "SanDisk",
            model: "Extreme Pro CFast 2.0",
            capacityGb: 256,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
        },
        "SanDisk Extreme Pro CFast 2.0 512GB": {
            brand: "SanDisk",
            model: "Extreme Pro CFast 2.0",
            capacityGb: 512,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
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

        // --- Lexar ---
        "Lexar Professional 3500x CFast 2.0 64GB": {
            brand: "Lexar",
            model: "Professional 3500x",
            capacityGb: 64,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
        },
        "Lexar Professional 3500x CFast 2.0 128GB": {
            brand: "Lexar",
            model: "Professional 3500x",
            capacityGb: 128,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
        },
        "Lexar Professional 3500x CFast 2.0 256GB": {
            brand: "Lexar",
            model: "Professional 3500x",
            capacityGb: 256,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
        },
        "Lexar Professional 3500x CFast 2.0 512GB": {
            brand: "Lexar",
            model: "Professional 3500x",
            capacityGb: 512,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
        },

        // --- Silicon Power ---
        "Silicon Power Cinema PRO CFX310 128GB": {
            brand: "Silicon Power",
            model: "Cinema PRO CFX310",
            capacityGb: 128,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
        },
        "Silicon Power Cinema PRO CFX310 256GB": {
            brand: "Silicon Power",
            model: "Cinema PRO CFX310",
            capacityGb: 256,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
        },
        "Silicon Power Cinema PRO CFX310 512GB": {
            brand: "Silicon Power",
            model: "Cinema PRO CFX310",
            capacityGb: 512,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
        },

        // --- Wise Advanced ---
        "Wise Advanced CFast 2.0 256GB": {
            brand: "Wise Advanced",
            model: "CFast 2.0",
            capacityGb: 256,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
        },
        "Wise Advanced CFast 2.0 512GB": {
            brand: "Wise Advanced",
            model: "CFast 2.0",
            capacityGb: 512,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
        },
        "Wise Advanced CFast 2.0 1TB": {
            brand: "Wise Advanced",
            model: "CFast 2.0",
            capacityTb: 1,
            interface: "CFast 2.0",
            supportedMedia: ["CFast 2.0"]
        },

        // --- SD UHS-II Cards ---

        // --- Sony (SD) ---
        "Sony SF-G Tough UHS-II SDXC 64GB": {
            brand: "Sony",
            model: "SF-G Tough",
            capacityGb: 64,
            interface: "SD UHS-II",
            supportedMedia: ["SD UHS-II", "SDXC"]
        },
        "Sony SF-G Tough UHS-II SDXC 128GB": {
            brand: "Sony",
            model: "SF-G Tough",
            capacityGb: 128,
            interface: "SD UHS-II",
            supportedMedia: ["SD UHS-II", "SDXC"]
        },

        // --- SanDisk (SD) ---
        "SanDisk Extreme PRO UHS-II SDXC 64GB": {
            brand: "SanDisk",
            model: "Extreme PRO UHS-II",
            capacityGb: 64,
            interface: "SD UHS-II",
            supportedMedia: ["SD UHS-II", "SDXC"]
        },
        "SanDisk Extreme PRO UHS-II SDXC 128GB": {
            brand: "SanDisk",
            model: "Extreme PRO UHS-II",
            capacityGb: 128,
            interface: "SD UHS-II",
            supportedMedia: ["SD UHS-II", "SDXC"]
        },

        // --- Lexar (SD) ---
        "Lexar Professional 2000x UHS-II SDXC 64GB": {
            brand: "Lexar",
            model: "Professional 2000x",
            capacityGb: 64,
            interface: "SD UHS-II",
            supportedMedia: ["SD UHS-II", "SDXC"]
        },
        "Lexar Professional 2000x UHS-II SDXC 128GB": {
            brand: "Lexar",
            model: "Professional 2000x",
            capacityGb: 128,
            interface: "SD UHS-II",
            supportedMedia: ["SD UHS-II", "SDXC"]
        },
        "Lexar Professional 1800x UHS-II SDXC 128GB": {
            brand: "Lexar",
            model: "Professional 1800x",
            capacityGb: 128,
            interface: "SD UHS-II",
            supportedMedia: ["SD UHS-II", "SDXC"]
        },
        "Lexar Professional 1800x UHS-II SDXC 256GB": {
            brand: "Lexar",
            model: "Professional 1800x",
            capacityGb: 256,
            interface: "SD UHS-II",
            supportedMedia: ["SD UHS-II", "SDXC"]
        },

        // --- ProGrade Digital (SD) ---
        "ProGrade Digital UHS-II V90 SDXC 128GB": {
            brand: "ProGrade Digital",
            model: "UHS-II V90",
            capacityGb: 128,
            interface: "SD UHS-II",
            supportedMedia: ["SD UHS-II", "SDXC"]
        },
        "ProGrade Digital UHS-II V90 SDXC 256GB": {
            brand: "ProGrade Digital",
            model: "UHS-II V90",
            capacityGb: 256,
            interface: "SD UHS-II",
            supportedMedia: ["SD UHS-II", "SDXC"]
        },

        // --- Digiera (SD) ---
        "Digiera LSU200 UHS-II V90 SDXC 128GB": {
            brand: "Digiera",
            model: "LSU200",
            capacityGb: 128,
            interface: "SD UHS-II",
            supportedMedia: ["SD UHS-II", "SDXC"]
        },
        "Digiera LSU200 UHS-II V90 SDXC 256GB": {
            brand: "Digiera",
            model: "LSU200",
            capacityGb: 256,
            interface: "SD UHS-II",
            supportedMedia: ["SD UHS-II", "SDXC"]
        },

        // --- External SSDs ---

        // --- Samsung ---
        "Samsung T7 Shield 1TB": {
            brand: "Samsung",
            model: "T7 Shield",
            capacityTb: 1,
            interface: "USB-C",
            supportedMedia: ["USB-C SSD"]
        },
        "Samsung T7 Shield 2TB": {
            brand: "Samsung",
            model: "T7 Shield",
            capacityTb: 2,
            interface: "USB-C",
            supportedMedia: ["USB-C SSD"]
        },
        "Samsung T7 Shield 4TB": {
            brand: "Samsung",
            model: "T7 Shield",
            capacityTb: 4,
            interface: "USB-C",
            supportedMedia: ["USB-C SSD"]
        },
        "Samsung T5 500GB": {
            brand: "Samsung",
            model: "T5",
            capacityGb: 500,
            interface: "USB-C",
            supportedMedia: ["USB-C SSD"]
        },
        "Samsung T5 1TB": {
            brand: "Samsung",
            model: "T5",
            capacityTb: 1,
            interface: "USB-C",
            supportedMedia: ["USB-C SSD"]
        },
        "Samsung T5 2TB": {
            brand: "Samsung",
            model: "T5",
            capacityTb: 2,
            interface: "USB-C",
            supportedMedia: ["USB-C SSD"]
        },

        // --- SanDisk (SSD) ---
        "SanDisk Extreme PRO Portable SSD V2 1TB": {
            brand: "SanDisk",
            model: "Extreme PRO Portable V2",
            capacityTb: 1,
            interface: "USB-C",
            supportedMedia: ["USB-C SSD"]
        },
        "SanDisk Extreme PRO Portable SSD V2 2TB": {
            brand: "SanDisk",
            model: "Extreme PRO Portable V2",
            capacityTb: 2,
            interface: "USB-C",
            supportedMedia: ["USB-C SSD"]
        },
        "SanDisk Extreme Portable SSD 1TB": {
            brand: "SanDisk",
            model: "Extreme Portable",
            capacityTb: 1,
            interface: "USB-C",
            supportedMedia: ["USB-C SSD"]
        },

        // --- Crucial (SSD) ---
        "Crucial X8 Portable SSD 1TB": {
            brand: "Crucial",
            model: "X8",
            capacityTb: 1,
            interface: "USB-C",
            supportedMedia: ["USB-C SSD"]
        },
        "Crucial X8 Portable SSD 2TB": {
            brand: "Crucial",
            model: "X8",
            capacityTb: 2,
            interface: "USB-C",
            supportedMedia: ["USB-C SSD"]
        },

        // --- Wise Advanced (SSD) ---
        "Wise Portable SSD 512GB": {
            brand: "Wise Advanced",
            model: "Portable SSD",
            capacityGb: 512,
            interface: "USB-C",
            supportedMedia: ["USB-C SSD"]
        },
        "Wise Portable SSD 1TB": {
            brand: "Wise Advanced",
            model: "Portable SSD",
            capacityTb: 1,
            interface: "USB-C",
            supportedMedia: ["USB-C SSD"]
        },
        "Wise Portable SSD 2TB": {
            brand: "Wise Advanced",
            model: "Portable SSD",
            capacityTb: 2,
            interface: "USB-C",
            supportedMedia: ["USB-C SSD"]
        },

        // --- Angelbird (SSD) ---
        "Angelbird SSD2GO PKT 512GB": {
            brand: "Angelbird",
            model: "SSD2GO PKT",
            capacityGb: 512,
            interface: "USB-C",
            supportedMedia: ["USB-C SSD"]
        },
        "Angelbird SSD2GO PKT 1TB": {
            brand: "Angelbird",
            model: "SSD2GO PKT",
            capacityTb: 1,
            interface: "USB-C",
            supportedMedia: ["USB-C SSD"]
        },

        // --- CFexpress Type A (Additional) ---

        // --- Delkin Devices (Type A) ---
        "Delkin Devices BLACK CFexpress Type A 80GB": {
            brand: "Delkin Devices",
            model: "BLACK CFexpress Type A",
            capacityGb: 80,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },
        "Delkin Devices BLACK CFexpress Type A 160GB": {
            brand: "Delkin Devices",
            model: "BLACK CFexpress Type A",
            capacityGb: 160,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },
        "Delkin Devices POWER CFexpress Type A 80GB": {
            brand: "Delkin Devices",
            model: "POWER CFexpress Type A",
            capacityGb: 80,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },
        "Delkin Devices POWER CFexpress Type A 160GB": {
            brand: "Delkin Devices",
            model: "POWER CFexpress Type A",
            capacityGb: 160,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },

        // --- Lexar (Type A) ---
        "Lexar Professional GOLD CFexpress Type A 160GB": {
            brand: "Lexar",
            model: "Professional GOLD Type A",
            capacityGb: 160,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },
        "Lexar Professional GOLD CFexpress Type A 320GB": {
            brand: "Lexar",
            model: "Professional GOLD Type A",
            capacityGb: 320,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },
        "Lexar Professional SILVER CFexpress Type A 160GB": {
            brand: "Lexar",
            model: "Professional SILVER Type A",
            capacityGb: 160,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },
        "Lexar Professional SILVER CFexpress Type A 320GB": {
            brand: "Lexar",
            model: "Professional SILVER Type A",
            capacityGb: 320,
            interface: "CFexpress Type A",
            supportedMedia: ["CFexpress Type A"]
        },

        // --- XQD Cards ---

        // --- Sony (XQD) ---
        "Sony G Series XQD 32GB": {
            brand: "Sony",
            model: "G Series XQD",
            capacityGb: 32,
            interface: "XQD",
            supportedMedia: ["XQD"]
        },
        "Sony G Series XQD 64GB": {
            brand: "Sony",
            model: "G Series XQD",
            capacityGb: 64,
            interface: "XQD",
            supportedMedia: ["XQD"]
        },
        "Sony G Series XQD 120GB": {
            brand: "Sony",
            model: "G Series XQD",
            capacityGb: 120,
            interface: "XQD",
            supportedMedia: ["XQD"]
        },
        "Sony G Series XQD 240GB": {
            brand: "Sony",
            model: "G Series XQD",
            capacityGb: 240,
            interface: "XQD",
            supportedMedia: ["XQD"]
        },
        "Sony M Series XQD 32GB": {
            brand: "Sony",
            model: "M Series XQD",
            capacityGb: 32,
            interface: "XQD",
            supportedMedia: ["XQD"]
        },
        "Sony M Series XQD 64GB": {
            brand: "Sony",
            model: "M Series XQD",
            capacityGb: 64,
            interface: "XQD",
            supportedMedia: ["XQD"]
        },

        // --- Nikon (XQD) ---
        "Nikon XQD 64GB": {
            brand: "Nikon",
            model: "XQD",
            capacityGb: 64,
            interface: "XQD",
            supportedMedia: ["XQD"]
        },
        "Nikon XQD 120GB": {
            brand: "Nikon",
            model: "XQD",
            capacityGb: 120,
            interface: "XQD",
            supportedMedia: ["XQD"]
        },

        // --- Lexar (XQD) ---
        "Lexar Professional 2933x XQD 32GB": {
            brand: "Lexar",
            model: "Professional 2933x XQD",
            capacityGb: 32,
            interface: "XQD",
            supportedMedia: ["XQD"]
        },
        "Lexar Professional 2933x XQD 64GB": {
            brand: "Lexar",
            model: "Professional 2933x XQD",
            capacityGb: 64,
            interface: "XQD",
            supportedMedia: ["XQD"]
        },
        "Lexar Professional 2933x XQD 128GB": {
            brand: "Lexar",
            model: "Professional 2933x XQD",
            capacityGb: 128,
            interface: "XQD",
            supportedMedia: ["XQD"]
        },

        // --- MicroSD Cards ---

        // --- SanDisk (MicroSD) ---
        "SanDisk Extreme Pro MicroSDXC UHS-I 64GB": {
            brand: "SanDisk",
            model: "Extreme Pro MicroSDXC",
            capacityGb: 64,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },
        "SanDisk Extreme Pro MicroSDXC UHS-I 128GB": {
            brand: "SanDisk",
            model: "Extreme Pro MicroSDXC",
            capacityGb: 128,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },
        "SanDisk Extreme Pro MicroSDXC UHS-I 256GB": {
            brand: "SanDisk",
            model: "Extreme Pro MicroSDXC",
            capacityGb: 256,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },
        "SanDisk Extreme Pro MicroSDXC UHS-I 512GB": {
            brand: "SanDisk",
            model: "Extreme Pro MicroSDXC",
            capacityGb: 512,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },
        "SanDisk Extreme Pro MicroSDXC UHS-I 1TB": {
            brand: "SanDisk",
            model: "Extreme Pro MicroSDXC",
            capacityTb: 1,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },

        // --- Samsung (MicroSD) ---
        "Samsung PRO Plus MicroSDXC 128GB": {
            brand: "Samsung",
            model: "PRO Plus MicroSDXC",
            capacityGb: 128,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },
        "Samsung PRO Plus MicroSDXC 256GB": {
            brand: "Samsung",
            model: "PRO Plus MicroSDXC",
            capacityGb: 256,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },
        "Samsung PRO Plus MicroSDXC 512GB": {
            brand: "Samsung",
            model: "PRO Plus MicroSDXC",
            capacityGb: 512,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },
        "Samsung PRO Ultimate MicroSDXC 128GB": {
            brand: "Samsung",
            model: "PRO Ultimate MicroSDXC",
            capacityGb: 128,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },
        "Samsung PRO Ultimate MicroSDXC 256GB": {
            brand: "Samsung",
            model: "PRO Ultimate MicroSDXC",
            capacityGb: 256,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },
        "Samsung PRO Ultimate MicroSDXC 512GB": {
            brand: "Samsung",
            model: "PRO Ultimate MicroSDXC",
            capacityGb: 512,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },

        // --- Angelbird (MicroSD) ---
        "Angelbird AV PRO MicroSD V60 128GB": {
            brand: "Angelbird",
            model: "AV PRO MicroSD V60",
            capacityGb: 128,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },
        "Angelbird AV PRO MicroSD V60 256GB": {
            brand: "Angelbird",
            model: "AV PRO MicroSD V60",
            capacityGb: 256,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },

        // --- Lexar (MicroSD) ---
        "Lexar Professional 1066x MicroSDXC 128GB": {
            brand: "Lexar",
            model: "Professional 1066x MicroSDXC",
            capacityGb: 128,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },
        "Lexar Professional 1066x MicroSDXC 256GB": {
            brand: "Lexar",
            model: "Professional 1066x MicroSDXC",
            capacityGb: 256,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },
        "Lexar Professional GOLD MicroSDXC 128GB": {
            brand: "Lexar",
            model: "Professional GOLD MicroSDXC",
            capacityGb: 128,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },
        "Lexar Professional GOLD MicroSDXC 256GB": {
            brand: "Lexar",
            model: "Professional GOLD MicroSDXC",
            capacityGb: 256,
            interface: "MicroSD",
            supportedMedia: ["MicroSD", "MicroSDXC"]
        },
    };

    registerDevice('recordingMediaBrands', brands);
    registerDevice('recordingMediaSizes', sizes);
    registerDevice('gearList.media', media);
})();
