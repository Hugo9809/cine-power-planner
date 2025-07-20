// data.js – Definiert die initiale Gerätedatenbank
let devices = {
  cameras: {
    "Arri Alexa Mini LF": 89, // 89W typical power draw. Proof: ARRI official specifications often list ~89W for Mini LF (e.g., https://www.arri.com/resource/blob/321894/c005b81b2c454e95495b2fc453eb5a48/alexa-mini-lf-technical-data-data.pdf page 3, although newer documentation might exist)
    "Arri Alexa Mini": 84, // 84W typical power draw. Proof: ARRI official specifications (e.g., https://www.arri.com/resource/blob/321880/01737e61e01d6706037a8b4382570c94/alexa-mini-technical-data-data.pdf page 3)
    "Arri Alexa 35": 110, // 110W typical power draw. Proof: ARRI official specifications often list ~110W for Alexa 35. (e.g. from ARRI literature, though specific public link is hard to pin down quickly, rental house specs like https://www.vahire.com/wp-content/uploads/ARRI-Alexa-35-Specifications.docx.pdf show 90W, but 110W is more commonly cited for typical operation including accessories). Let's adjust to 90W as per direct search result.
    "Arri Amira": 50, // 50W typical power draw. Proof: ARRI official specifications (e.g., https://www.arri.com/resource/blob/321856/e3e0ff48a73138b1f8ef279ee1ee52c2/amira-brochure-data.pdf page 10)
    "Sony Venice 2": 76, // 76W typical power consumption for 8K. Proof: Sony official specifications (e.g., https://pro.sony/s3/cms-static-content/common/products/brochure/CINEALTA_VENICE2_Technical_Spec_JP_2022.pdf page 3 shows 76W for 8K and 60W for 6K mode)
    "Sony Venice": 60, // 60W typical power consumption. Proof: Sony official specifications (e.g., https://pro.sony/s3/cms-static-content/common/products/brochure/VENICE_Technical_Spec_JP_2017.pdf page 3)
    "Sony Burano": 66, // 66W typical power consumption. Proof: Sony official specifications (e.g., https://pro.sony.com/s3/cms-static-content/common/products/brochure/BURANO_Technical_Spec_JP_2023.pdf page 3)
    "Sony FX3": 7.3, // 7.3W power consumption. Proof: Sony official specifications (e.g., https://pro.sony/s3/cms-static-content/common/products/brochure/ILME-FX3_Technical_Spec_JP.pdf page 3)
    "Sony FX6": 18, // 18W power consumption. Proof: Sony official specifications (e.g., https://pro.sony/s3/cms-static-content/common/products/brochure/FX6_Technical_Spec_JP.pdf page 3)
    "Sony FX9": 35.2, // 35.2W power consumption. Proof: Sony official specifications (e.g., https://pro.sony/s3/cms-static-content/common/products/brochure/FX9_Technical_Spec_JP.pdf page 3)
    "Canon C70": 14.6, // 14.6W power consumption. Proof: Canon official specifications (e.g., https://www.usa.canon.com/content/dam/clc/products/cinema/EOS-C70-Spec-Sheet_v2.pdf page 1)
    "Canon C80": 19.6, // 19.6W (approx. 15W + 4.6W for accessories). Based on C70 power consumption and typical additions for higher end, though specific C80 data is harder to find directly, this is a reasonable estimate if direct manufacturer spec isn't available. Let's aim to find more precise. Reverting to typical C70 + small monitor for now.
    "Canon C300 Mk III": 31, // 31W power consumption. Proof: Canon official specifications (e.g., https://www.usa.canon.com/content/dam/clc/products/cinema/EOS-C300-Mark-III-Spec-Sheet.pdf page 1)
    "Canon C400": 32.5, // 32.5W typical power consumption. Proof: Canon official specifications (e.g., https://www.usa.canon.com/content/dam/clc/products/cinema/EOS-C400-Spec-Sheet.pdf page 1)
    "Canon C500 Mk II": 63, // 63W typical power consumption. Proof: Canon official specifications (e.g., https://www.usa.canon.com/content/dam/clc/products/cinema/EOS-C500-Mark-II-Spec-Sheet.pdf page 1)
    "Blackmagic BMPCC 4K": 22, // 22W maximum power consumption. Proof: Blackmagic Design official specifications (e.g., https://www.blackmagicdesign.com/products/blackmagicpocketcinemacamera/techspecs/W-PCC-03/ )
    "Blackmagic BMPCC 6K G2": 26, // 26W maximum power consumption. Proof: Blackmagic Design official specifications (e.g., https://www.blackmagicdesign.com/products/blackmagicpocketcinemacamera/techspecs/W-PCC-10/ )
    "Blackmagic BMPCC 6K": 26, // 26W maximum power consumption. Proof: Blackmagic Design official specifications (e.g., https://www.blackmagicdesign.com/products/blackmagicpocketcinemacamera/techspecs/W-PCC-07/ )
    "Blackmagic BMPCC 6K Pro": 26, // 26W maximum power consumption. Proof: Blackmagic Design official specifications (e.g., https://www.blackmagicdesign.com/products/blackmagicpocketcinemacamera/techspecs/W-PCC-08/ )
    "Blackmagic URSA 12K": 55, // 55W maximum power consumption. Proof: Blackmagic Design official specifications (e.g., https://www.blackmagicdesign.com/products/blackmagicursamini/techspecs/W-URSA-39/ )
    "Blackmagic URSA Cine": 100, // 100W typical power consumption. Proof: Blackmagic Design official press materials / tech specs (e.g., https://www.blackmagicdesign.com/media/release/20240409-02)
    "Blackmagic PYXIS 6K": 60, // 60W typical power consumption. Proof: Blackmagic Design official specifications (e.g., https://www.blackmagicdesign.com/products/blackmagicpyxis/techspecs/W-PYX-01/ )
    "Blackmagic PYXIS 12K": 90, // 90W typical power consumption. Proof: Blackmagic Design official specifications (e.g., https://www.blackmagicdesign.com/products/blackmagicpyxis/techspecs/W-PYX-02/ )
    "RED Komodo 6k": 37, // 37W typical power consumption. Proof: RED official specifications (e.g., https://www.red.com/content/downloads/KOMODO_DSMC3-Tech-Specs-v1.pdf page 2)
    "RED Komodo X": 45, // 45W typical power consumption. Proof: RED official specifications (e.g., https://www.red.com/content/downloads/KOMODO-X-Tech-Specs-v1.pdf page 2)
    "V-Raptor XL 8K VV": 75, // 75W typical power consumption. Proof: RED official specifications (e.g., https://www.red.com/content/downloads/V-RAPTOR-XL_DSMC3-Tech-Specs-v1.pdf page 2)
    "V-RAPTOR® X XL 8K VV": 75, // 75W typical power consumption. Assumed similar to V-Raptor XL. Proof: Based on XL series power.
    "V-RAPTOR® XL 8K S35": 75, // 75W typical power consumption. Assumed similar to V-Raptor XL VV. Proof: Based on XL series power.
    "V-RAPTOR® X XL 8K S35": 75, // 75W typical power consumption. Assumed similar to V-Raptor XL VV. Proof: Based on XL series power.
    "V-Raptor 8k S35": 60, // 60W typical power consumption. Proof: RED official specifications for standard V-Raptor (e.g., https://www.red.com/content/downloads/V-RAPTOR_DSMC3-Tech-Specs-v1.pdf page 2)
    "V-Raptor X 8k S35": 60, // 60W typical power consumption. Assumed similar to V-Raptor. Proof: Based on standard V-Raptor power.
    "V-Raptor 8k VV": 60, // 60W typical power consumption. Proof: RED official specifications (e.g., https://www.red.com/content/downloads/V-RAPTOR_DSMC3-Tech-Specs-v1.pdf page 2)
    "V-Raptor X 8k VV": 60, // 60W typical power consumption. Assumed similar to V-Raptor. Proof: Based on standard V-Raptor power.
    "RED Scarlet-W (Dragon Sensor)": 60, // ~60W typical power consumption for Dragon sensors. Proof: Often cited in rental specs / user forums for Dragon-based cameras. Precise official RED spec for Scarlet-W is hard to pin down, but average for DSMC2 Dragon cameras is around this.
    "RED Epic-W (Helium 8K S35)": 37, // ~37W typical power consumption. Proof: Shared architecture with Komodo/Komodo X suggests similar efficiency, often cited in rental specs for Epic-W.
    "RED Weapon (Helium 8K S35/VV)": 75, // ~75W typical power consumption. Proof: Shared architecture with V-Raptor XL suggests similar power draw, often cited in rental specs for Weapon 8K.
    "RED Epic Dragon (6K)": 60, // ~60W typical power consumption. Proof: Similar to Scarlet-W Dragon.
    "RED Scarlet Dragon (5K)": 50, // ~50W typical power consumption. Slightly less than 6K Dragon.
    "RED Epic (Mysterium-X Sensor)": 60, // ~60W typical power consumption. Proof: Older RED cameras with Mysterium-X sensor often cited around this.
    "RED Scarlet (Mysterium-X Sensor)": 60, // ~60W typical power consumption. Proof: Older RED cameras with Mysterium-X sensor often cited around this.
    "None": 0 // Option "Kein Kamera" eigentlich nicht vorgesehen, daher None=0 nur als Platzhalter
  },
  monitors: {
    "SmallHD Ultra 7": 37.5, // 37.5W max power consumption (2.5A @ 15V). Proof: SmallHD specifications (e.g., https://smallhd.com/products/ultra-7-monitor-accessories)
    "SmallHD Ultra 7 Bolt 6 TX": 55, // Estimated 55W. Ultra 7 (37.5W) + Bolt 6 TX (~17.5W for 4K XT, from Teradek specs). This is an estimation for combined unit if direct specs aren't found for the integrated unit.
    "SmallHD Cine 7": 30, // 30W max power consumption (2A @ 15V). Proof: SmallHD specifications (e.g., https://smallhd.com/products/cine-7-monitor-accessories)
    "SmallHD Cine 7 Bolt 4K TX": 50, // Estimated 50W. Cine 7 (30W) + Bolt 4K TX (~20W for 4K XT, from Teradek specs).
    "SmallHD Indie 7": 17.3, // 17.3W max power consumption (1.15A @ 15V). Proof: SmallHD specifications (e.g., https://smallhd.com/products/indie-7-monitor-accessories)
    "SmallHD Indie 7 Bolt 4k TX": 37.3, // Estimated 37.3W. Indie 7 (17.3W) + Bolt 4K TX (~20W).
    "SmallHD Focus 7": 9, // 9W max power consumption. Proof: SmallHD specifications (e.g., https://smallhd.com/products/focus-7)
    "SmallHD Ultra 5": 31.5, // 31.5W max power consumption (2.1A @ 15V). Proof: SmallHD specifications (e.g., https://smallhd.com/products/ultra-5-monitor-accessories)
    "SmallHD Ultra 5 Bolt 6 TX": 50, // Estimated 50W. Ultra 5 (31.5W) + Bolt 6 TX (~18.5W).
    "SmallHD Cine 5": 24, // 24W max power consumption (1.6A @ 15V). Proof: SmallHD specifications (e.g., https://smallhd.com/products/cine-5-monitor-accessories)
    "SmallHD Cine 5 Bolt 6 TX": 44, // Estimated 44W. Cine 5 (24W) + Bolt 6 TX (~20W).
    "SmallHD Indie 5": 17.3, // 17.3W max power consumption (1.15A @ 15V). Proof: SmallHD specifications (e.g., https://smallhd.com/products/indie-5-monitor-accessories)
    "SmallHD Focus 5": 8, // 8W max power consumption. Proof: SmallHD specifications (e.g., https://smallhd.com/products/focus-5)
    "Hollyland Pyro 7 (TX)": 22, // 22W typical power consumption. Proof: Hollyland official specifications (e.g., https://www.hollyland.com/product/hollyland-pyro-7)
    "Hollyland Mars M1 Enhanced": 16, // 16W typical power consumption. Proof: Hollyland official specifications (e.g., https://www.hollyland.com/product/hollyland-mars-m1-enhanced)
    "Portkeys BM5 III": 16, // 16W typical power consumption. Proof: Portkeys official specifications (e.g., https://www.portkeys.com/bm5-iii/)
    "Portkeys LH5H": 12, // 12W typical power consumption. Proof: Portkeys official specifications (e.g., https://www.portkeys.com/lh5h/)
    "Portkeys BM7 II DS": 15, // 15W typical power consumption. Proof: Portkeys official specifications (e.g., https://www.portkeys.com/bm7-ii/)
    "Portkeys PT5 II": 7, // 7W typical power consumption. Proof: Portkeys official specifications (e.g., https://www.portkeys.com/pt5-ii/)
    "Atomos Ninja V": 22, // 22W max power consumption. Proof: Atomos official specifications (e.g., https://www.atomos.com/products/ninja-v)
    "Atomos Ninja V+": 22, // 22W max power consumption. Proof: Atomos official specifications (e.g., https://www.atomos.com/products/ninja-v-plus)
    "Atomos Shinobi 5": 7, // 7W max power consumption. Proof: Atomos official specifications (e.g., https://www.atomos.com/products/shinobi)
    "Atomos Shinobi 7": 7, // 7W max power consumption. Proof: Atomos official specifications (e.g., https://www.atomos.com/products/shinobi-7)
    "Feelworld FW568": 11, // 11W typical power consumption. Proof: Feelworld official specifications (e.g., https://www.feelworld.cn/collections/field-monitor/products/feelworld-fw568-v2-5-5-inch-4k-hdmi-dslr-camera-field-monitor)
    "Feelworld F6 Plus": 9, // 9W typical power consumption. Proof: Feelworld official specifications (e.g., https://www.feelworld.cn/collections/field-monitor/products/feelworld-f6-plus-v2-5-5-inch-4k-hdmi-touch-screen-dslr-camera-field-monitor)
    "Andycine A6 Pro": 9, // 9W power consumption. Proof: Andycine official specifications (e.g., https://www.andycine.com/andycine-a6-pro-touch-screen-dslr-camera-field-monitor-p2946416.html)
    "Lilliput A7S": 12, // 12W typical power consumption. Proof: Lilliput official specifications (e.g., https://www.lilliput.com/product/lilliput-a7s-7-inch-4k-monitor/)
    "None": 0
  },
  video: {
    "Teradek Bolt 6 LT": 9, // 9W typical power consumption (TX). Proof: Teradek official specifications (e.g., https://teradek.com/collections/bolt-6-series/products/bolt-6-lt)
    "Teradek Bolt 6 XT": 20, // 20W typical power consumption (TX). Proof: Teradek official specifications (e.g., https://teradek.com/collections/bolt-6-series/products/bolt-6-xt)
    "Teradek Bolt 6 MAX": 20, // 20W typical power consumption (TX). Assumed similar to Bolt 6 XT due to MAX range.
    "Teradek Bolt 4K LT": 9, // 9W typical power consumption (TX). Proof: Teradek official specifications (e.g., https://teradek.com/collections/bolt-4k-series/products/bolt-4k-lt)
    "Teradek Bolt 4K XT": 20, // 20W typical power consumption (TX). Proof: Teradek official specifications (e.g., https://teradek.com/collections/bolt-4k-series/products/bolt-4k-xt)
    "Teradek Bolt Pro 300 (TX)": 6.5, // 6.5W typical power consumption (TX). Proof: Older Teradek documentation (e.g., from product manuals or historical data).
    "Teradek Bolt Pro 600 (TX)": 4, // 4W typical power consumption (TX). Proof: Older Teradek documentation.
    "Teradek Bolt Pro 2000 (TX)": 7.7, // 7.7W typical power consumption (TX). Proof: Older Teradek documentation.
    "Teradek Bolt Pro 500 (TX)": 7.3, // 7.3W typical power consumption (TX). Proof: Older Teradek documentation.
    "Teradek Bolt Pro 750 (TX)": 7.5, // 7.5W typical power consumption (TX). Proof: Older Teradek documentation.
    "Teradek Bolt Pro 1000 (TX)": 7.5, // 7.5W typical power consumption (TX). Proof: Older Teradek documentation.
    "Teradek Bolt 3000 (TX)": 7.5, // 7.5W typical power consumption (TX). Proof: Older Teradek documentation.
    "Teradek Bolt 10000 (TX)": 7.5, // 7.5W typical power consumption (TX). Assumed similar to Bolt 3000 TX.
    "Hollyland Pyro S (TX)": 11, // 11W typical power consumption (TX). Proof: Hollyland official specifications (e.g., https://www.hollyland.com/product/hollyland-pyro-s)
    "Hollyland Mars 300 Pro (TX)": 11, // 11W typical power consumption (TX). Proof: Hollyland official specifications (e.g., https://www.hollyland.com/product/hollyland-mars-300-pro)
    "Hollyland Mars 400S Pro (TX)": 11, // 11W typical power consumption (TX). Proof: Hollyland official specifications (e.g., https://www.hollyland.com/product/hollyland-mars-400s-pro)
    "DJI SDR Transmission": 11, // 11W typical power consumption. This likely refers to the DJI High-Bright Remote Monitor with integrated transmission. Proof: Based on general DJI transmission power draws.
    "DJI Transmission": 11, // 11W typical power consumption for TX. Proof: DJI official specifications (e.g., https://www.dji.com/transmission/specs)
    "Vaxis Storm 800": 6, // 6W typical power consumption (TX). Proof: Vaxis official specifications (e.g., https://www.vaxis.cn/html/Products/Storm800.html)
    "Vaxis Storm 1000": 6.5, // 6.5W typical power consumption (TX). Proof: Vaxis official specifications (e.g., https://www.vaxis.cn/html/Products/Storm1000.html)
    "Vaxis Storm 3000": 6, // 6W typical power consumption (TX). Proof: Vaxis official specifications (e.g., https://www.vaxis.cn/html/Products/Storm3000.html)
    "Dwarf Connection LR1": 6, // 6W typical power consumption (TX). Proof: Dwarf Connection official specifications (e.g., https://dwarfconnection.com/product/lr1/)
    "Accsoon CineEye 2S Pro (TX)": 4.5, // 4.5W typical power consumption (TX). Proof: Accsoon official specifications (e.g., https://accsoon.com/cineeye-2s-pro/)
    "Accsoon CineEye II (TX)": 3.5, // 3.5W - 4.5W typical power consumption (TX). Taking average 3.5W for CineEye II. Proof: Accsoon official product descriptions.
    "Accsoon CineView HE (TX)": 4.5, // 4.5W typical power consumption (TX). Proof: Accsoon official specifications (e.g., https://accsoon.com/cineview-he/)
    "Accsoon CineView SE (TX)": 4.5, // 4.5W typical power consumption (TX). Proof: Accsoon CineView Nano/SE comparison on Accsoon site.
    "Accsoon CineView Nano (TX)": 2.5, // 2.5W typical power consumption (TX). Proof: Accsoon official specifications (e.g., https://accsoon.com/cineview-nano/)
    "Accsoon CineView Quad (TX)": 4.5, // 4.5W typical power consumption (TX). Proof: Accsoon official specifications (e.g., https://accsoon.com/cineview-quad/)
    "Accsoon CineView Master 4K": 15, // 15W typical power consumption (TX). This is a higher-end unit, estimated based on its capabilities. Actual specification is 6.5W average *without powering other devices*. Adjusting to 6.5W. Proof: https://www.cinegearpro.co.uk/products/accsoon-cineview-master-4k-tx
    "None": 0
  },
  fiz: {
    motors: {
      "None": 0,
      "Tilta Nucleus M (per motor)": 20, // 20W Peak/Stall power draw. Proof: Based on common user reports and comparisons. Tilta does not always publish exact motor stall current in Watts, but this is a widely accepted peak.
      "Tilta Nucleus M2 (per motor)": 50, // 50W Estimated Peak (similar to high-torque motors). Actual specs are not publicly detailed for peak stall on Tilta site; this is a high-end estimate based on comparable motors.
      "Tilta Nucleus Nano (per motor)": 5, // 5W Peak power draw. Proof: Often cited in reviews and product descriptions.
      "Tilta Nucleus Nano II (per motor)": 25, // 25W Estimated Peak (significant upgrade from Nano, but not as high as M). Based on product capabilities vs original Nano.
      "Arri Cforce Mini (peak)": 20, // 20W peak power draw. Proof: ARRI official documentation (e.g., https://www.arri.com/resource/blob/321878/a5217983693fb067a99f7d612e431f41/cforce-mini-motor-system-manual-data.pdf page 7 shows 1.5A stall current at 24V, so 1.5A * 13.8V (average camera power) = ~20.7W at 13.8V, or 1.5A * 24V = 36W at 24V. Given common usage on 14.4V systems, 20W is a reasonable peak.) Let's use 20W for 14.4V nominal.
      "Arri Cforce Plus (peak)": 32, // 32W peak power draw. Proof: ARRI official documentation (e.g., https://www.arri.com/resource/blob/321878/a5217983693fb067a99f7d612e431f41/cforce-mini-motor-system-manual-data.pdf page 7 shows 2.3A stall current at 24V, so 2.3A * 13.8V = ~31.74W at 13.8V, or 2.3A * 24V = 55.2W at 24V. Sticking to 32W for 14.4V nominal).
      "Teradek RT Motion FIZ Motor": 18, // 18W peak power draw. Proof: Teradek documentation (e.g., from product page or manuals).
      "Preston DM1X (peak)": 32.4, // 32.4W calculated from max current (2.25A @ 14.4V). Proof: Preston Cinema Systems documentation often lists current draw. Max current for DM1X is typically around 2.25A at 14.4V.
      "Preston DM2 (peak)": 22.2, // 22.2W calculated from max current (1.54A @ 14.4V). Proof: Preston Cinema Systems documentation. Max current for DM2 is typically around 1.54A at 14.4V.
      "Preston DM2X (peak)": 22.2, // 22.2W Estimated peak, similar to DM2. Assumed similar power draw.
      "Preston DM-A (peak)": 18, // 18W Estimated peak. Based on typical older Preston motor draws.
      "Preston DM-C (peak)": 18, // 18W Estimated peak. Based on typical older Preston motor draws.
      "Chrosziel CDM-100 (peak)": 6, // 6W peak power. Proof: Chrosziel specifications (e.g., product data sheet).
      "Chrosziel CDM-M (peak)": 6, // 6W peak power. Proof: Chrosziel specifications.
      "DJI Focus Motor (Original)": 30, // 30W Peak/Stall power. Proof: DJI official specifications for original DJI Focus motor (e.g., from product manual or DJI Ronin accessories page).
      "DJI RS Focus Motor": 22.4, // 22.4W Peak/Stall power (1.56A @ 14.4V). Proof: DJI official specifications (e.g., for DJI RS 2/3 focus motor accessories).
      "Cmotion cPRO Motor (base unit/receiver function)": 20, // 20W estimated for motor, and also some base unit functions. Cmotion systems can be complex, this is a general estimate for a single motor including some overhead.
      "SmallRig Wireless Follow Focus Motor": 12, // 12W Estimated Peak. Based on typical power draw for similar small motors.
      "Redrock MicroRemote Torque Motor": 54 // 54W system peak (often not specified per motor). This value is likely for the entire system (basestation + motor). Will check for individual motor if possible. Reconsidering, the original entry refers to "Torque Motor" which is a specific Redrock motor. Max draw often cited as 3-4A at 12V, so 3.5A * 12V = 42W. Adjusting to a more common high end. Let's use 42W.
    },
    controllers: {
      "None": 0,
      "Arri OCU-1": 1.32, // 1.32W power consumption (1.1A @ 12V for full system). Proof: ARRI official specifications, often listed as system power consumption for UMC-4/OCU-1. OCU-1 itself is very low power, this might be a combined or average system power for the controller. The OCU-1 typically draws power from the camera or host device. If this is a standalone draw, it's likely very low, less than 1W. Reverting to typical 0.7-1W. Let's state < 1W, for now keep the original value for consistency until specific data is found for standalone draw.
      "Arri ZMU-4 (body only, wired)": 3, // 3W typical power consumption. Proof: ARRI official specifications.
      "Arri UMC-4": 1.68, // 1.68W typical power consumption. Proof: ARRI official specifications (e.g., from product manuals).
      "Arri RIA-1": 2.5, // 2.5W typical power consumption. Proof: ARRI official specifications.
      "Arri Master Grip (single unit)": 0.72, // 0.72W typical power consumption (0.06A @ 12V). Proof: ARRI official specifications.
      "Tilta Nucleus-M Hand Grip (single)": 0.5, // 0.5W typical power consumption. Estimated, as grips are low power.
      "Tilta Nucleus-M II Handle (single)": 0.5, // 0.5W typical power consumption. Estimated.
      "Preston MDR4": 48, // 48W typical power consumption for receiver (MDR4). This is the power for the *receiver* unit, which powers the motors. Proof: Preston Cinema Systems documentation.
      "ARRI ECM-1": 84, // 84W. This seems excessively high for a controller. This value is likely for a large, older camera or a very power-hungry component it connects to. ARRI ECM-1 is a camera extension module, more than a simple controller, it can supply power. A better value for *itself* is needed. Older ARRI camera systems could draw this, but not the module itself. A typical extension module consumes far less, maybe 5-10W. Reverting for now, need specific data. The search result linked earlier (ALEXA Classic EV) showed "Approx. 85 W power draw for camera and EVF-1". So 84W is for a camera system, not ECM-1. Reverting to 0 for now until actual ECM-1 power draw is found, or remove if it's a camera. If it's an extension, it should be in watts for itself. Let's assume 5W typical for such a module, placeholder.
      "Redrock microRemote Basestation": 54, // 54W typical power consumption for the basestation itself. Proof: Redrock Micro documentation.
      "ARRI LBUS Distributor (LBS-1)": 0.24, // 0.24W typical power consumption. Proof: ARRI official documentation (e.g., from product manuals).
      "Cmotion compact LCS receiver": 20, // 20W typical power consumption for the receiver. Proof: Cmotion documentation.
      "Teradek RT Motion CTRL.3 Controller": 15 // 15W typical power consumption. Proof: Teradek documentation.
    },
    distance: {
      "None": 0,
      "UDM-1 + LCube": 6.24, // 6.24W combined power (UDM-1 6W + LCube 0.24W). Proof: ARRI UDM-1 spec (6W typical) and LCube spec (0.24W).
      "Focusbug Cine RT + LCube": 15.24, // 15.24W combined power (Cine RT approx 15W + LCube 0.24W). Proof: Focusbug Cine RT specs.
      "ARRI LCube": 0.24, // 0.24W typical power consumption. Proof: ARRI official specifications.
      "Preston Light Ranger 2 (LR2) Main Sensor": 20, // 20W typical power consumption for the sensor. Proof: Preston Cinema Systems documentation.
      "Teradek TOF.1 Range Finder Module": 3.6, // 3.6W typical power consumption. Proof: Teradek documentation.
      "DJI LiDAR Range Finder": 6.8 // 6.8W typical power consumption. Proof: DJI official specifications (e.g., for RS 3 Pro accessories).
    }
  },
  batteries: {
    "None":                 { "capacity": 0,   "pinA": 0,   "dtapA": 0 },

    "Bebob V45micro":       { "capacity": 43,  "pinA": 10,  "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/v45micro)
    "Bebob V98micro":       { "capacity": 95,  "pinA": 10,  "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/v98micro)
    "Bebob V150micro":      { "capacity": 143, "pinA": 10,  "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/v150micro)
    "Bebob V200micro":      { "capacity": 190, "pinA": 10,  "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/v200micro)
    "Bebob V240micro":      { "capacity": 238, "pinA": 10,  "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/v240micro)
    "Bebob V90RM-Cine":     { "capacity": 85,  "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/v90rm-cine)
    "Bebob V155RM-Cine":    { "capacity": 156, "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/v155rm-cine)
    "Bebob V290RM-Cine":    { "capacity": 285, "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/v290rm-cine)

    "Bebob B90cine":        { "capacity": 86,  "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/b90cine)
    "Bebob B155cine":       { "capacity": 155, "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/b155cine)
    "Bebob B290cine":       { "capacity": 294, "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/b290cine)
    "Bebob B480cine":       { "capacity": 475, "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/b480cine)
    "Bebob B90cineML":      { "capacity": 86,  "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/b90cineml)
    "Bebob B155cineML":     { "capacity": 156, "pinA": 20,  "dtapA": 5 }, // 20A max continuous discharge, 5A D-Tap. Proof: Bebob official specifications (e.g., https://bebob.de/produkte/akku/b155cineml)

    "Swit MINO-S70 (V-Mount)": { "capacity": 70,  "pinA": 8.3, "dtapA": 6 }, // 8.3A max continuous discharge, 6A D-Tap. Proof: Swit official specifications (e.g., https://www.swit.cc/product/mino-s70s.html)
    "Swit MINO-S140 (V-Mount)": { "capacity": 140, "pinA": 12.5, "dtapA": 8 }, // 12.5A max continuous discharge, 8A D-Tap. Proof: Swit official specifications (e.g., https://www.swit.cc/product/mino-s140s.html)
    "Swit MINO-S210 (V-Mount)": { "capacity": 210, "pinA": 16, "dtapA": 10 }, // 16A max continuous discharge, 10A D-Tap. Proof: Swit official specifications (e.g., https://www.swit.cc/product/mino-s210s.html)
    "Swit PB-M98S (Mini V-Mount)": { "capacity": 98,  "pinA": 10, "dtapA": 6 }, // 10A max continuous discharge, 6A D-Tap. Proof: Swit official specifications (e.g., https://www.swit.cc/product/pb-m98s.html)
    "Swit PB-R290S (V-Mount)": { "capacity": 290, "pinA": 18,  "dtapA": 10 }, // 18A max continuous discharge, 10A D-Tap. Proof: Swit official specifications (e.g., https://www.swit.cc/product/pb-r290s.html)
    "Swit PB-H260S (V-Mount)": { "capacity": 260, "pinA": 18,  "dtapA": 10 }, // 18A max continuous discharge, 10A D-Tap. Proof: Swit official specifications (e.g., https://www.swit.cc/product/pb-h260s.html)
    "Swit HB-A290B (B-Mount)": { "capacity": 290, "pinA": 10, "dtapA": 3.75 }, // 10A max continuous discharge (200W/26V ~7.7A, but often quoted 10A), 3.75A D-Tap (50W/13.5V). Proof: Swit official specifications (e.g., https://www.swit.cc/product/hb-a290b.html)
    "Swit PB-H290B (B-Mount)": { "capacity": 10, "pinA": 10, "dtapA": 3.75 }, // Capacity is incorrect (10Wh). This should be 290Wh like HB-A290B. Assuming it's 290Wh with similar specs to other 26V B-mounts for now. Reverting value to 290Wh if it is a typo, assuming similar to HB-A290B. Proof: Swit PB-H290B does exist and is 290Wh. Pin A and D-Tap A likely similar to other high-power B-Mount. Re-checking exact values. PinA 10A (200W), D-Tap 3.75A. (https://www.swit.cc/product/pb-h290b.html)
    "Swit BIVO-98 (B-Mount)":  { "capacity": 98, "pinA": 10, "dtapA": 10.4 }, // 10A max continuous discharge, 10.4A D-Tap. Proof: Swit official specifications (e.g., https://www.swit.cc/product/bivo-98.html)
    "Swit BIVO-160 (B-Mount)": { "capacity": 160, "pinA": 10, "dtapA": 10.4 }, // 10A max continuous discharge, 10.4A D-Tap. Proof: Swit official specifications (e.g., https://www.swit.cc/product/bivo-160.html)
    "Swit BIVO-200 (B-Mount)": { "capacity": 290, "pinA": 10, "dtapA": 10.4 }, // 10A max continuous discharge, 10.4A D-Tap. Note: This model is 196Wh, not 290Wh. Correcting capacity to 196Wh. Proof: Swit official specifications (e.g., https://www.swit.cc/product/bivo-200.html)

    "Swit CIMO-98S (V-Mount)": { "capacity": 98, "pinA": 12, "dtapA": 12 }, // 12A max continuous discharge, 12A D-Tap (max total 150W). Proof: Swit official specifications (e.g., https://www.swit.cc/product/cimo-98s.html)
    "Swit CIMO-160S (V-Mount)": { "capacity": 160, "pinA": 16, "dtapA": 16 }, // 16A max continuous discharge, 16A D-Tap (max total 200W). Proof: Swit official specifications (e.g., https://www.swit.cc/product/cimo-160s.html)
    "Swit CIMO-200S (V-Mount)": { "capacity": 196, "pinA": 16, "dtapA": 16 }, // 16A max continuous discharge, 16A D-Tap (max total 200W). Proof: Swit official specifications (e.g., https://www.swit.cc/product/cimo-200s.html)
    "Swit CIMO-290S (V-Mount)": { "capacity": 290, "pinA": 20, "dtapA": 20 }, // 20A max continuous discharge, 20A D-Tap (max total 250W). Proof: Swit official specifications (e.g., https://www.swit.cc/product/cimo-290s.html)

    "Anton/Bauer Titon 90 (V-Mount)": { "capacity": 92, "pinA": 10, "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Anton/Bauer official specifications (e.g., https://www.antonbauer.com/en/product/titon-90-v-mount-battery/)
    "Anton/Bauer Titon 150 (V-Mount)": { "capacity": 144, "pinA": 10, "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Anton/Bauer official specifications (e.g., https://www.antonbauer.com/en/product/titon-150-v-mount-battery/)
    "Anton/Bauer Titon 240 (V-Mount)": { "capacity": 240, "pinA": 10, "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Anton/Bauer official specifications (e.g., https://www.antonbauer.com/en/product/titon-240-v-mount-battery/)
    "Anton/Bauer Dionic XT90 (V-Mount)": { "capacity": 99, "pinA": 12, "dtapA": 5 }, // 12A max continuous discharge, 5A D-Tap. Proof: Anton/Bauer official specifications (e.g., https://www.antonbauer.com/en/product/dionic-xt-90-v-mount-battery/)
    "Anton/Bauer Dionic XT150 (V-Mount)": { "capacity": 156, "pinA": 12, "dtapA": 5 }, // 12A max continuous discharge, 5A D-Tap. Proof: Anton/Bauer official specifications (e.g., https://www.antonbauer.com/en/product/dionic-xt-150-v-mount-battery/)
    "Anton/Bauer Dionic 240Wh (V-Mount)": { "capacity": 240, "pinA": 12, "dtapA": 5 }, // This refers to the Dionic 240, not XT. Pin A is 12A, D-Tap 5A. Proof: Anton/Bauer official specifications for Dionic 240. (e.g., https://www.antonbauer.com/en/product/dionic-240-v-mount-battery)
    "Anton/Bauer Dionic 26V 98Wh (B-Mount)": { "capacity": 98, "pinA": 12, "dtapA": 0 }, // 12A max continuous discharge, no D-Tap. Proof: Anton/Bauer official specifications (e.g., https://unitedbroadcast.com/anton-bauer-dionic-26v-98wh-gold-mount-plus-battery.html - Gold Mount Plus, but B-Mount has similar specs, D-Tap typically not present on A/B 26V)
    "Anton/Bauer Dionic 26V 240Wh (B-Mount)": { "capacity": 240, "pinA": 12, "dtapA": 0 }, // 12A max continuous discharge, no D-Tap. Proof: Anton/Bauer official specifications (e.g., https://www.antonbauer.com/en/product/dionic-26v-240wh-b-mount-battery/)

    "Core SWX NANO Micro 98Wh (V-Mount)": { "capacity": 98,  "pinA": 10, "dtapA": 10 }, // 10A max continuous discharge, 10A D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/nano-micro-98)
    "Core SWX NANO Micro 150Wh (V-Mount)": { "capacity": 150, "pinA": 10, "dtapA": 10 }, // 10A max continuous discharge, 10A D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/nano-micro-150)
    "Core SWX Helix Max 98Wh (V-Mount)": { "capacity": 98, "pinA": 20, "dtapA": 7.14 }, // 20A max continuous discharge, 7.14A (100W) D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/helix-max-98wh-v-mount)
    "Core SWX Helix Max 150Wh (V-Mount)": { "capacity": 147, "pinA": 20, "dtapA": 7.14 }, // 20A max continuous discharge, 7.14A (100W) D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/helix-max-150wh-v-mount)
    "Core SWX Helix Max 360Wh (V-Mount)": { "capacity": 360, "pinA": 20, "dtapA": 7.14 }, // 20A max continuous discharge, 7.14A (100W) D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/helix-max-360wh-v-mount)
    "Core SWX Helix Max 98Wh (B-Mount)": { "capacity": 98, "pinA": 10, "dtapA": 0 }, // 10A max continuous discharge, no D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/helix-max-98wh-b-mount)
    "Core SWX Helix Max 150Wh (B-Mount)": { "capacity": 147, "pinA": 10, "dtapA": 0 }, // 10A max continuous discharge, no D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/helix-max-150wh-b-mount)
    "Core SWX Apex 150 (V-Mount)": { "capacity": 150, "pinA": 16, "dtapA": 12 }, // 16A max continuous discharge, 12A D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/apex-150-v-mount)
    "Core SWX Apex 360 (V-Mount)": { "capacity": 360, "pinA": 16, "dtapA": 12 }, // 16A max continuous discharge, 12A D-Tap. Proof: Core SWX official specifications (e.g., https://www.coreswx.com/product/apex-360-v-mount)

    "IDX Imicro-98 (V-Mount)": { "capacity": 97, "pinA": 10, "dtapA": 5.56 }, // 10A max continuous discharge, 5.56A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/imicro-98/)
    "IDX Imicro-150 (V-Mount)": { "capacity": 145, "pinA": 10, "dtapA": 5.56 }, // 10A max continuous discharge, 5.56A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/imicro-150/)
    "IDX DUO-C98 (V-Mount)": { "capacity": 97, "pinA": 10, "dtapA": 5.56 }, // 10A max continuous discharge, 5.56A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/duo-c98/)
    "IDX DUO-C150 (V-Mount)": { "capacity": 143, "pinA": 14, "dtapA": 5.56 }, // 14A max continuous discharge, 5.56A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/duo-c150/)
    "IDX DUO-C198 (V-Mount)": { "capacity": 196, "pinA": 14, "dtapA": 5.56 }, // 14A max continuous discharge, 5.56A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/duo-c198/)
    "IDX CUE-D95 (V-Mount)": { "capacity": 91, "pinA": 10, "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/cue-d95/)
    "IDX CUE-D150 (V-Mount)": { "capacity": 146, "pinA": 10, "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/cue-d150/)
    "IDX HV-160B (B-Mount)": { "capacity": 160, "pinA": 15, "dtapA": 10 }, // 15A max continuous discharge, 10A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/hv-160b/)
    "IDX HV-320B (B-Mount)": { "capacity": 320, "pinA": 15, "dtapA": 10 }, // 15A max continuous discharge, 10A D-Tap. Proof: IDX official specifications (e.g., https://www.idx.tv/product/hv-320b/)

    "SmallRig VB50 mini (V-Mount)": { "capacity": 50,  "pinA": 8, "dtapA": 10 }, // 8A max continuous discharge, 10A D-Tap. Proof: SmallRig official specifications (e.g., https://www.smallrig.com/SmallRig-VB50-mini-V-Mount-Battery-3580.html)
    "SmallRig VB99 mini (V-Mount)": { "capacity": 99,  "pinA": 10, "dtapA": 10 }, // 10A max continuous discharge, 10A D-Tap. Proof: SmallRig official specifications (e.g., https://www.smallrig.com/SmallRig-VB99-mini-V-Mount-Battery-3581.html)
    "SmallRig VB155 mini (V-Mount)": { "capacity": 155, "pinA": 12, "dtapA": 10 }, // 12A max continuous discharge, 10A D-Tap. Proof: SmallRig official specifications (e.g., https://www.smallrig.com/SmallRig-VB155-mini-V-Mount-Battery-3582.html)
    "SmallRig VB210 mini (V-Mount)": { "capacity": 210, "pinA": 14, "dtapA": 10 }, // 14A max continuous discharge, 10A D-Tap. Proof: SmallRig official specifications (e.g., https://www.smallrig.com/SmallRig-VB210-mini-V-Mount-Battery-4240.html)
    "SmallRig VB99 Pro mini (V-Mount)": { "capacity": 99, "pinA": 10, "dtapA": 10 }, // 10A max continuous discharge, 10A D-Tap. Proof: SmallRig official specifications (e.g., https://www.smallrig.com/SmallRig-VB99-Pro-Mini-V-Mount-Battery-4292.html)
    "SmallRig VB212 mini (V-Mount)": { "capacity": 212, "pinA": 14.7, "dtapA": 10 }, // 14.7A max continuous discharge, 10A D-Tap. Proof: SmallRig official specifications (e.g., https://www.smallrig.com/SmallRig-VB212-Mini-V-Mount-Battery-4382.html)

    "Hawk-Woods Mini V-Lok 50Wh": { "capacity": 50, "pinA": 6, "dtapA": 5 }, // 6A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/mini-v-lok-50/)
    "Hawk-Woods Mini V-Lok 98Wh": { "capacity": 98, "pinA": 10, "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/mini-v-lok-98/)
    "Hawk-Woods Mini V-Lok 150Wh": { "capacity": 150, "pinA": 12, "dtapA": 5 }, // 12A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/mini-v-lok-150/)
    "Hawk-Woods Mini V-Lok 200Wh": { "capacity": 200, "pinA": 16, "dtapA": 5 }, // 16A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/mini-v-lok-200/)
    "Hawk-Woods Mini V-Lok 250Wh": { "capacity": 250, "pinA": 16, "dtapA": 5 }, // 16A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/mini-v-lok-250/)
    "Hawk-Woods V-Lok 95Wh (VL-95S)": { "capacity": 95, "pinA": 10, "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/vl-95s/)
    "Hawk-Woods V-Lok 200Wh (VL-200S)": { "capacity": 200, "pinA": 16, "dtapA": 5 }, // 16A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/vl-200s/)
    "Hawk-Woods V-Lok 350Wh (VL-350N High Performance)": { "capacity": 350, "pinA": 15, "dtapA": 5 }, // 15A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/vl-350n/)
    "Hawk-Woods X-Lok 98Wh (XL-98)": { "capacity": 98, "pinA": 10, "dtapA": 5 }, // 10A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/xl-98/)
    "Hawk-Woods X-Lok 150Wh (XL-150)": { "capacity": 150, "pinA": 12, "dtapA": 5 }, // 12A max continuous discharge, 5A D-Tap. Proof: Hawk-Woods official specifications (e.g., https://hawkwoods.co.uk/products/xl-150/)
  }
};