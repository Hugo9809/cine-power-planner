// script.js – Main logic for the Camera Power Planner app

// Store a deep copy of the initial 'devices' data as defined in data.js.
// This 'defaultDevices' will be used when reverting the database.
// Initialize defaultDevices only if it hasn't been declared yet, to prevent "already declared" errors
// if the script is loaded multiple times (e.g., in some development environments).
if (window.defaultDevices === undefined) {
  window.defaultDevices = JSON.parse(JSON.stringify(devices));
  unifyDevices(window.defaultDevices);
}

// Load any saved device data from localStorage
const storedDevices = loadDeviceData();
if (storedDevices) {
  devices = storedDevices;
}

function unifyDevices(data) {
  if (!data || typeof data !== 'object') return;
  const ensureList = (list, defaults) => {
    if (!Array.isArray(list)) return [];
    return list.map(item => {
      if (typeof item === 'string') {
        return Object.assign({}, defaults, { type: item });
      }
      return Object.assign({}, defaults, item || {});
    });
  };
  Object.values(data.cameras || {}).forEach(cam => {
    if (cam.power?.input && cam.power.input.powerDrawWatts !== undefined) {
      delete cam.power.input.powerDrawWatts;
    }
    if (Array.isArray(cam.power?.batteryPlateSupport)) {
      cam.power.batteryPlateSupport = cam.power.batteryPlateSupport.map(it => {
        if (typeof it === 'string') {
          const m = it.match(/([^()]+)(?:\((native|adapted)\))?/i);
          return {
            type: m ? m[1].trim() : it,
            mount: m && m[2] ? m[2].toLowerCase() : (/(adapted)/i.test(it) ? 'adapted' : 'native')
          };
        }
        return {
          type: it.type || '',
          mount: it.mount ? it.mount.toLowerCase() : (it.native ? 'native' : (it.adapted ? 'adapted' : 'native'))
        };
      });
    }
    if (cam.power) {
      cam.power.powerDistributionOutputs = ensureList(cam.power.powerDistributionOutputs, { type: '', voltage: '', current: '', wattage: null, notes: '' });
    }
    cam.videoOutputs = ensureList(cam.videoOutputs, { type: '', notes: '' });
    cam.fizConnectors = ensureList(cam.fizConnectors, { type: '', notes: '' });
    cam.viewfinder = ensureList(cam.viewfinder, { type: '', resolution: '', connector: '', notes: '' });
  });
}

unifyDevices(devices);


// Translation text for English and German
const texts = {
  en: {
    appTitle: "Camera Power Planner",
    appHeading: "Camera Power Consumption App",
    tagline: "Plan your camera setup and calculate power consumption & battery life.",

    setupManageHeading: "Manage Setup",
    deviceSelectionHeading: "Device Selection",
    resultsHeading: "Results",
    deviceManagerHeading: "Manage Device Database",
    batteryComparisonHeading: "Battery Comparison",

    savedSetupsLabel: "Saved Setups:",
    newSetupOption: "-- New Setup --",
    setupNameLabel: "Setup Name:",
    deleteSetupBtn: "Delete",
    saveSetupBtn: "Save",

    cameraLabel: "Camera:",
    monitorLabel: "Monitor:",
    videoLabel: "Wireless Video:",
    distanceLabel: "Distance Sensor:",
    batteryLabel: "V-Mount Battery:",

    fizLegend: "FIZ (Follow Focus) Systems",
    fizMotorsLabel: "FIZ Motors:",
    fizControllersLabel: "FIZ Controllers:",

    totalPowerLabel: "Total Consumption:",
    totalCurrent144Label: "Total Current (at 14.4V):",
    totalCurrent12Label: "Total Current (at 12V):",
    batteryLifeLabel: "Runtime (estimated):",

    warnPinExceeded: "WARNING: current draw ({current}A at ~12V) exceeds the battery's main output rating ({max}A)!",
    warnPinNear: "Note: current draw is close to the main output limit ({current}A of {max}A).",
    warnDTapExceeded: "WARNING: current draw ({current}A) exceeds the battery's D-Tap output ({max}A)!",
    warnDTapNear: "Note: current draw uses over 80% of the D-Tap capacity ({current}A of {max}A).",

    category_cameras: "Cameras",
    category_monitors: "Monitors",
    category_video: "Wireless Video",
    category_fiz_motors: "FIZ Motors",
    category_fiz_controllers: "FIZ Controllers",
    category_fiz_distance: "FIZ Distance",
    category_batteries: "V-Mount Batteries",

    addDeviceHeading: "Add New Device",
    categoryLabel: "Category:",
    deviceNameLabel: "Name:",
    consumptionLabel: "Consumption (W):",
    capacityLabel: "Capacity (Wh):",
    pinLabel: "Max Pin A:",
    dtapLabel: "Max D-Tap A:",
    cameraWattLabel: "Power Draw (W):",
    cameraVoltageLabel: "Voltage Range:",
    cameraPortTypeLabel: "Port Type:",
    cameraBatteryTypeLabel: "Internal Battery Type:",
    cameraBatteryLifeLabel: "Battery Life (min):",
    cameraPlatesLabel: "Battery Plates:",
    cameraMediaLabel: "Recording Media:",
    cameraLensMountLabel: "Lens Mount:",
    powerInputsHeading: "Power Inputs",
    powerDistributionHeading: "Power Distribution",
    videoOutputsHeading: "Video Outputs",
    fizConnectorHeading: "FIZ Connector",
    mediaHeading: "Media",
    viewfinderHeading: "Viewfinder",
    lensMountHeading: "Lens Mount",
    timecodeHeading: "Timecode",
    powerDistributionLabel: "Outputs (JSON):",
    videoOutputsLabel: "Outputs:",
    fizConnectorLabel: "Connectors:",
    viewfinderLabel: "Viewfinders:",
    timecodeLabel: "Timecode (JSON):",
    addDeviceBtn: "Add",
    updateDeviceBtn: "Update", // New key for update button
    editBtn: "Edit", // New key for Edit button in list
    deleteDeviceBtn: "Delete", // New key for Delete button in list
    exportDataBtn: "Export Database",
    importDataBtn: "Import Database",
    alertImportSuccess: "Database imported successfully! {num_devices} devices loaded.",
    alertImportError: "Failed to import database. Invalid file or data format.",
    confirmExportAndRevert: "Are you sure you want to export the current database AND then revert to the default database? This will overwrite your current saved data with the original defaults.",
    alertExportAndRevertSuccess: "Database exported and reverted to defaults successfully.",

    placeholder_deviceName: "Device name",
    placeholder_watt: "e.g. 12.5",
    placeholder_capacity: "e.g. 98",
    placeholder_pin: "e.g. 10",
    placeholder_dtap: "e.g. 5",
    placeholder_voltage: "11V-34V DC",
    placeholder_port: "LEMO 8-pin",
    placeholder_plates: '[{"type":"V-Mount","mount":"native"}]',
    placeholder_media: "CFast 2.0",
    placeholder_lensmount: "ARRI PL",
    placeholder_powerdist: "[{}]",
    placeholder_videooutputs: "[{}]",
    placeholder_fizconnector: "[{}]",
    placeholder_timecode: "[{}]",

    toggleDeviceManager: "Edit Device Data…",
    hideDeviceManager: "Hide Device Data",

    batteryTableLabel: "Battery",
    runtimeLabel: "Estimated Runtime (h)",
    batteryLifeUnit: "hrs",

    noBatterySupports: "No battery can supply this load.",

    alertSetupName: "Please enter a name for the setup.",
    alertSetupSaved: 'Setup "{name}" saved.',
    alertNoSetupSelected: "Please select a saved setup to delete.",
    confirmDeleteSetup: 'Really delete setup "{name}"?',
    // alertSetupDeleted not used
    confirmDeleteDevice: 'Really delete device "{name}"?',
    alertDeviceExists: "A device with this name already exists in this category.",
    alertDeviceAdded: 'Device "{name}" added to category "{category}".',
    alertDeviceUpdated: 'Device "{name}" updated in category "{category}".',
    alertDeviceFields: "Please provide valid values for capacity, Pin A and D-Tap A.",
    alertDeviceWatt: "Please enter a valid watt value.",
    alertDeviceName: "Device name cannot be empty.",
    alertInvalidCameraJSON: "Invalid JSON for camera details",

    // NEW TEXTS FOR SETUP MANAGEMENT START HERE
    setupActionsHeading: "Setup Actions",
    exportSetupsBtn: "Export All Setups",
    importSetupsBtn: "Import Setups",
    generateOverviewBtn: "Generate Overview",
    alertNoSetupsToExport: "There are no saved setups to export.",
    alertImportSetupsSuccess: "Successfully imported {num_setups} setups.",
    alertImportSetupsError: "Error: Could not import setups. The file may be invalid or corrupted.",
    alertSelectSetupForOverview: "Please select a saved setup to generate an overview.",
    overviewTitle: "Setup Overview",
    exportAndRevertBtn: "Export and Revert to default Database",
    // NEW TEXTS FOR SETUP MANAGEMENT END HERE
  },
  de: {
    appTitle: "Kamera Stromverbrauchs Planer",
    appHeading: "Kamera-Stromverbrauchs-App",
    tagline: "Plane dein Kamera-Setup und berechne Stromverbrauch und Akkulaufzeit.",

    setupManageHeading: "Setup verwalten",
    deviceSelectionHeading: "Geräte-Auswahl",
    resultsHeading: "Ergebnisse",
    deviceManagerHeading: "Geräte-Datenbank verwalten",
    batteryComparisonHeading: "Akkuvergleich",

    savedSetupsLabel: "Gespeicherte Setups:",
    newSetupOption: "-- Neues Setup --",
    setupNameLabel: "Setup-Name:",
    deleteSetupBtn: "Löschen",
    saveSetupBtn: "Speichern",

    cameraLabel: "Kamera:",
    monitorLabel: "Monitor:",
    videoLabel: "Videofunk:",
    distanceLabel: "Distanzmesser:",
    batteryLabel: "V-Mount Akku:",

    fizLegend: "FIZ (Follow Focus) Systeme",
    fizMotorsLabel: "FIZ Motoren:",
    fizControllersLabel: "FIZ Controller:",

    totalPowerLabel: "Gesamtverbrauch:",
    totalCurrent144Label: "Gesamtstrom (bei 14,4V):",
    totalCurrent12Label: "Gesamtstrom (bei 12V):",
    batteryLifeLabel: "Akkulaufzeit (geschätzt):",

    warnPinExceeded: "WARNUNG: Strombedarf ({current}A bei ~12V) übersteigt die Haupt-Pin-Ausgangsleistung ({max}A) des Akkus!",
    warnPinNear: "Hinweis: Strombedarf kommt nahe an die Pin-Grenze ({current}A von {max}A).",
    warnDTapExceeded: "WARNUNG: Strombedarf ({current}A) übersteigt die D-Tap-Leistung ({max}A) des Akkus!",
    warnDTapNear: "Hinweis: Strombedarf nutzt über 80% der D-Tap Kapazität ({current}A von {max}A).",

    category_cameras: "Kameras",
    category_monitors: "Monitore",
    category_video: "Videofunk",
    category_fiz_motors: "FIZ Motoren",
    category_fiz_controllers: "FIZ Controller",
    category_fiz_distance: "FIZ Distanz",
    category_batteries: "V-Mount Akkus",

    addDeviceHeading: "Neues Gerät hinzufügen",
    categoryLabel: "Kategorie:",
    deviceNameLabel: "Name:",
    consumptionLabel: "Verbrauch (W):",
    capacityLabel: "Kapazität (Wh):",
    pinLabel: "Max Pin A:",
    dtapLabel: "Max D-Tap A:",
    cameraWattLabel: "Leistungsaufnahme (W):",
    cameraVoltageLabel: "Spannungsbereich:",
    cameraPortTypeLabel: "Anschlussart:",
    cameraBatteryTypeLabel: "Interner Akkutyp:",
    cameraBatteryLifeLabel: "Akkulaufzeit (Min.):",
    cameraPlatesLabel: "Akkuschächte:",
    cameraMediaLabel: "Aufnahmemedien:",
    cameraLensMountLabel: "Objektivanschluss:",
    powerInputsHeading: "Stromversorgung",
    powerDistributionHeading: "Stromverteilung",
    videoOutputsHeading: "Videoausgänge",
    fizConnectorHeading: "FIZ-Anschluss",
    mediaHeading: "Medien",
    viewfinderHeading: "Sucher",
    lensMountHeading: "Objektivanschluss",
    timecodeHeading: "Timecode",
    powerDistributionLabel: "Ausgänge (JSON):",
    videoOutputsLabel: "Ausgänge:",
    fizConnectorLabel: "Anschlüsse:",
    viewfinderLabel: "Sucher:",
    timecodeLabel: "Timecode (JSON):",
    addDeviceBtn: "Hinzufügen",
    updateDeviceBtn: "Aktualisieren",
    editBtn: "Bearbeiten",
    deleteDeviceBtn: "Löschen",
    exportDataBtn: "Datenbank exportieren",
    importDataBtn: "Datenbank importieren",
    alertImportSuccess: "Datenbank erfolgreich importiert! {num_devices} Geräte geladen.",
    alertImportError: "Fehler beim Import der Datenbank. Ungültige Datei oder Datenformat.",
    confirmExportAndRevert: "Möchten Sie die aktuelle Datenbank exportieren UND dann auf die Standarddatenbank zurücksetzen? Dies wird Ihre aktuell gespeicherten Daten mit den ursprünglichen Standardwerten überschreiben.",
    alertExportAndRevertSuccess: "Datenbank exportiert und erfolgreich auf Standardwerte zurückgesetzt.",

    placeholder_deviceName: "Gerätename",
    placeholder_watt: "z.B. 12.5",
    placeholder_capacity: "z.B. 98",
    placeholder_pin: "z.B. 10",
    placeholder_dtap: "z.B. 5",
    placeholder_voltage: "11V-34V DC",
    placeholder_port: "LEMO 8-Pin",
    placeholder_plates: '[{"type":"V-Mount","mount":"native"}]',
    placeholder_media: "CFast 2.0",
    placeholder_lensmount: "ARRI PL",
    placeholder_powerdist: "[{}]",
    placeholder_videooutputs: "[{}]",
    placeholder_fizconnector: "[{}]",
    placeholder_timecode: "[{}]",

    toggleDeviceManager: "Gerätedaten bearbeiten…",
    hideDeviceManager: "Gerätedaten ausblenden",

    batteryTableLabel: "Akku",
    runtimeLabel: "Geschätzte Laufzeit (h)",
    batteryLifeUnit: "Std.",

    noBatterySupports: "Kein Akku kann diese Last liefern.",

    alertSetupName: "Bitte einen Namen für das Setup eingeben.",
    alertSetupSaved: 'Setup "{name}" gespeichert.',
    alertNoSetupSelected: "Wählen Sie ein gespeichertes Setup zum Löschen aus.",
    confirmDeleteSetup: 'Setup "{name}" wirklich löschen?',
    confirmDeleteDevice: 'Gerät "{name}" wirklich löschen?',
    alertDeviceExists: "Ein Gerät mit diesem Namen existiert in dieser Kategorie bereits.",
    alertDeviceAdded: 'Gerät "{name}" in Kategorie "{category}" hinzugefügt.',
    alertDeviceUpdated: 'Gerät "{name}" in Kategorie "{category}" aktualisiert.',
    alertDeviceFields: "Bitte geben Sie gültige Werte für Kapazität, Pin A und D-Tap A ein.",
    alertDeviceWatt: "Bitte geben Sie einen gültigen Watt-Wert ein.",
    alertDeviceName: "Der Gerätename darf nicht leer sein.",
    alertInvalidCameraJSON: "Ungültiges JSON für Kameradetails",
    // NEW TEXTS FOR SETUP MANAGEMENT START HERE
    setupActionsHeading: "Setup-Aktionen",
    exportSetupsBtn: "Alle Setups exportieren",
    importSetupsBtn: "Setups importieren",
    generateOverviewBtn: "Übersicht erstellen",
    alertNoSetupsToExport: "Es gibt keine gespeicherten Setups zum Exportieren.",
    alertImportSetupsSuccess: "{num_setups} Setups erfolgreich importiert.",
    alertImportSetupsError: "Fehler: Setups konnten nicht importiert werden. Die Datei ist möglicherweise ungültig oder beschädigt.",
    alertSelectSetupForOverview: "Bitte wählen Sie ein gespeichertes Setup, um eine Übersicht zu erstellen.",
    overviewTitle: "Setup-Übersicht",
    exportAndRevertBtn: "Exportieren und auf Standarddatenbank zurücksetzen",
    // NEW TEXTS FOR SETUP MANAGEMENT END HERE
  }
};

// Mapping for category values to display names (singular for form dropdown)
const categoryNames = {
  en: {
    "cameras": "Camera",
    "monitors": "Monitor",
    "video": "Wireless Video",
    "fiz.motors": "FIZ Motor",
    "fiz.controllers": "FIZ Controller",
    "fiz.distance": "FIZ Distance",
    "batteries": "V-Mount Battery"
  },
  de: {
    "cameras": "Kamera",
    "monitors": "Monitor",
    "video": "Videofunk",
    "fiz.motors": "FIZ Motoren",
    "fiz.controllers": "FIZ Controller",
    "fiz.distance": "FIZ Distanz",
    "batteries": "V-Mount Akku"
  }
};

// Determine initial language (default English)
let currentLang = "en";
try {
  const savedLang = localStorage.getItem("language");
  if (savedLang && (savedLang === "en" || savedLang === "de")) {
    currentLang = savedLang;
  }
} catch (e) {
  console.warn("Could not load language from localStorage", e);
}

// Helper to apply translations to all UI text
function setLanguage(lang) {
  currentLang = lang;
  // ensure dropdown reflects the active language
  if (languageSelect) {
    languageSelect.value = lang;
  }
  // update html lang attribute for better persistence
  document.documentElement.lang = lang;
  // Document title and main heading
  document.title = texts[lang].appTitle;
  document.getElementById("mainTitle").textContent = texts[lang].appHeading;
  document.getElementById("tagline").textContent = texts[lang].tagline;
  // Section headings
  document.getElementById("setupManageHeading").textContent = texts[lang].setupManageHeading;
  document.getElementById("deviceSelectionHeading").textContent = texts[lang].deviceSelectionHeading;
  document.getElementById("resultsHeading").textContent = texts[lang].resultsHeading; // Fixed typo here
  document.getElementById("deviceManagerHeading").textContent = texts[lang].deviceManagerHeading;
  document.getElementById("batteryComparisonHeading").textContent = texts[lang].batteryComparisonHeading;
  // Setup manager labels and buttons
  document.getElementById("savedSetupsLabel").textContent = texts[lang].savedSetupsLabel;
  document.getElementById("setupNameLabel").textContent = texts[lang].setupNameLabel;
  saveSetupBtn.textContent = texts[lang].saveSetupBtn;
  deleteSetupBtn.textContent = texts[lang].deleteSetupBtn;
  // Update the "-- New Setup --" option text
  if (setupSelect.options.length > 0) {
    setupSelect.options[0].textContent = texts[lang].newSetupOption;
  }
  // Device selection labels
  document.getElementById("cameraLabel").textContent = texts[lang].cameraLabel;
  document.getElementById("monitorLabel").textContent = texts[lang].monitorLabel;
  document.getElementById("videoLabel").textContent = texts[lang].videoLabel;
  document.getElementById("distanceLabel").textContent = texts[lang].distanceLabel;
  document.getElementById("batteryLabel").textContent = texts[lang].batteryLabel;
  // FIZ legend
  document.getElementById("fizLegend").textContent = texts[lang].fizLegend;
  // Results labels
  document.getElementById("totalPowerLabel").textContent = texts[lang].totalPowerLabel;
  document.getElementById("totalCurrent144Label").textContent = texts[lang].totalCurrent144Label;
  document.getElementById("totalCurrent12Label").textContent = texts[lang].totalCurrent12Label;
  document.getElementById("batteryLifeLabel").textContent = texts[lang].batteryLifeLabel;
  const unitElem = document.getElementById("batteryLifeUnit");
  if (unitElem) unitElem.textContent = texts[lang].batteryLifeUnit;
  // Device manager category headings
  document.getElementById("category_cameras").textContent = texts[lang].category_cameras;
  document.getElementById("category_monitors").textContent = texts[lang].category_monitors;
  document.getElementById("category_video").textContent = texts[lang].category_video;
  document.getElementById("category_fiz_motors").textContent = texts[lang].category_fiz_motors;
  document.getElementById("category_fiz_controllers").textContent = texts[lang].category_fiz_controllers;
  document.getElementById("category_fiz_distance").textContent = texts[lang].category_fiz_distance;
  document.getElementById("category_batteries").textContent = texts[lang].category_batteries;
  // Add device form labels and button
  document.getElementById("addDeviceHeading").textContent = texts[lang].addDeviceHeading;
  document.getElementById("categoryLabel").textContent = texts[lang].categoryLabel;
  document.getElementById("deviceNameLabel").textContent = texts[lang].deviceNameLabel;
  document.getElementById("consumptionLabel").textContent = texts[lang].consumptionLabel;
  document.getElementById("capacityLabel").textContent = texts[lang].capacityLabel;
  document.getElementById("pinLabel").textContent = texts[lang].pinLabel;
  document.getElementById("dtapLabel").textContent = texts[lang].dtapLabel;
  document.getElementById("cameraWattLabel").textContent = texts[lang].cameraWattLabel;
  document.getElementById("cameraVoltageLabel").textContent = texts[lang].cameraVoltageLabel;
  document.getElementById("cameraPortTypeLabel").textContent = texts[lang].cameraPortTypeLabel;
  document.getElementById("cameraBatteryTypeLabel").textContent = texts[lang].cameraBatteryTypeLabel;
  document.getElementById("cameraBatteryLifeLabel").textContent = texts[lang].cameraBatteryLifeLabel;
  document.getElementById("cameraPlatesLabel").textContent = texts[lang].cameraPlatesLabel;
  document.getElementById("cameraMediaLabel").textContent = texts[lang].cameraMediaLabel;
  document.getElementById("cameraLensMountLabel").textContent = texts[lang].cameraLensMountLabel;
  document.getElementById("cameraPowerDistLabel").textContent = texts[lang].powerDistributionLabel;
  document.getElementById("cameraVideoOutputsLabel").textContent = texts[lang].videoOutputsLabel;
  document.getElementById("cameraFIZConnectorLabel").textContent = texts[lang].fizConnectorLabel;
  document.getElementById("cameraViewfinderLabel").textContent = texts[lang].viewfinderLabel;
  document.getElementById("cameraTimecodeLabel").textContent = texts[lang].timecodeLabel;
  document.getElementById("powerInputsHeading").textContent = texts[lang].powerInputsHeading;
  document.getElementById("powerDistributionHeading").textContent = texts[lang].powerDistributionHeading;
  document.getElementById("videoOutputsHeading").textContent = texts[lang].videoOutputsHeading;
  document.getElementById("fizConnectorHeading").textContent = texts[lang].fizConnectorHeading;
  document.getElementById("mediaHeading").textContent = texts[lang].mediaHeading;
  document.getElementById("viewfinderHeading").textContent = texts[lang].viewfinderHeading;
  document.getElementById("lensMountHeading").textContent = texts[lang].lensMountHeading;
  document.getElementById("timecodeHeading").textContent = texts[lang].timecodeHeading;
  // Determine text for Add/Update button
  if (addDeviceBtn.dataset.mode === "edit") {
    addDeviceBtn.textContent = texts[lang].updateDeviceBtn;
  } else {
    addDeviceBtn.textContent = texts[lang].addDeviceBtn;
  }
  exportBtn.textContent = texts[lang].exportDataBtn;
  importDataBtn.textContent = texts[lang].importDataBtn; // New translation for import button
  // Placeholders for inputs
  setupNameInput.placeholder = texts[lang].setupNameLabel.replace(":", "");
  newNameInput.placeholder = texts[lang].placeholder_deviceName;
  newWattInput.placeholder = texts[lang].placeholder_watt;
  newCapacityInput.placeholder = texts[lang].placeholder_capacity;
  newPinAInput.placeholder = texts[lang].placeholder_pin;
  newDtapAInput.placeholder = texts[lang].placeholder_dtap;
  cameraVoltageInput.placeholder = texts[lang].placeholder_voltage;
  cameraPortTypeInput.placeholder = texts[lang].placeholder_port;
  cameraPlatesInput.placeholder = texts[lang].placeholder_plates;
  cameraMediaInput.placeholder = texts[lang].placeholder_media;
  cameraLensMountInput.placeholder = texts[lang].placeholder_lensmount;
  cameraPowerDistInput.placeholder = texts[lang].placeholder_powerdist;
  cameraTimecodeInput.placeholder = texts[lang].placeholder_timecode;
  // Toggle device manager button text (depends on current visibility)
  if (deviceManagerSection.style.display === "none") {
    toggleDeviceBtn.textContent = texts[lang].toggleDeviceManager;
  } else {
    toggleDeviceBtn.textContent = texts[lang].hideDeviceManager;
  }
  // Update newCategory select option texts
  Array.from(newCategorySelect.options).forEach(opt => {
    if (categoryNames[lang][opt.value] !== undefined) {
      opt.textContent = categoryNames[lang][opt.value];
    }
  });
  // Update "None" option text in all dropdowns
  document.querySelectorAll('select option[value="None"]').forEach(opt => {
    opt.textContent = (lang === "de") ? "Keine Auswahl" : "None";
  });
  // Save language preference
  try {
    localStorage.setItem("language", lang);
  } catch (e) {
    console.warn("Could not save language to localStorage", e);
  }
  // Recalculate and update dynamic content (results, breakdown, battery comparison)
  refreshDeviceLists(); // Call refreshDeviceLists to update Edit/Delete buttons in the list
  applyFilters();
  updateCalculations();

  // NEW SETUP MANAGEMENT BUTTONS TEXTS
  document.getElementById("setupActionsHeading").textContent = texts[lang].setupActionsHeading;
  document.getElementById("exportSetupsBtn").textContent = texts[lang].exportSetupsBtn;
  document.getElementById("importSetupsBtn").textContent = texts[lang].importSetupsBtn;
  document.getElementById("generateOverviewBtn").textContent = texts[lang].generateOverviewBtn;
  const exportRevert = document.getElementById("exportAndRevertBtn");
  if (exportRevert) exportRevert.textContent = texts[lang].exportAndRevertBtn;
}

// Reference elements (DOM Elements)
const cameraSelect    = document.getElementById("cameraSelect");
const monitorSelect   = document.getElementById("monitorSelect");
const videoSelect     = document.getElementById("videoSelect");
const motorSelects    = [
  document.getElementById("motor1Select"),
  document.getElementById("motor2Select"),
  document.getElementById("motor3Select"),
  document.getElementById("motor4Select")
];
const controllerSelects = [
  document.getElementById("controller1Select"),
  document.getElementById("controller2Select"),
  document.getElementById("controller3Select"),
  document.getElementById("controller4Select")
];
const distanceSelect = document.getElementById("distanceSelect");
const batterySelect  = document.getElementById("batterySelect");

const totalPowerElem      = document.getElementById("totalPower");
const totalCurrent144Elem = document.getElementById("totalCurrent144");
const totalCurrent12Elem  = document.getElementById("totalCurrent12");
const batteryLifeElem     = document.getElementById("batteryLife");
const pinWarnElem         = document.getElementById("pinWarning");
const dtapWarnElem        = document.getElementById("dtapWarning");

const setupSelect     = document.getElementById("setupSelect");
const setupNameInput  = document.getElementById("setupName");
const saveSetupBtn    = document.getElementById("saveSetupBtn");
const deleteSetupBtn  = document.getElementById("deleteSetupBtn");
const deviceManagerSection = document.getElementById("device-manager");
const toggleDeviceBtn = document.getElementById("toggleDeviceManager");
const cameraListElem  = document.getElementById("cameraList");
const monitorListElem = document.getElementById("monitorList");
const videoListElem   = document.getElementById("videoList");
const motorListElem   = document.getElementById("motorList");
const controllerListElem = document.getElementById("controllerList");
const distanceListElem   = document.getElementById("distanceList");
const batteryListElem    = document.getElementById("batteryList");
const newCategorySelect  = document.getElementById("newCategory");
const newNameInput    = document.getElementById("newName");
const newWattInput    = document.getElementById("newWatt");
const wattFieldDiv    = document.getElementById("wattField");
const cameraFieldsDiv = document.getElementById("cameraFields");
const cameraWattInput = document.getElementById("cameraWatt");
const cameraVoltageInput = document.getElementById("cameraVoltage");
const cameraPortTypeInput = document.getElementById("cameraPortType");
const cameraBatteryTypeInput = document.getElementById("cameraBatteryType");
const cameraBatteryLifeInput = document.getElementById("cameraBatteryLife");
const cameraPlatesInput = document.getElementById("cameraPlates");
const cameraMediaInput = document.getElementById("cameraMedia");
const cameraLensMountInput = document.getElementById("cameraLensMount");
const cameraPowerDistInput = document.getElementById("cameraPowerDist");
const videoOutputsContainer = document.getElementById("videoOutputsContainer");
const fizConnectorContainer = document.getElementById("fizConnectorContainer");
const viewfinderContainer = document.getElementById("viewfinderContainer");
const cameraTimecodeInput = document.getElementById("cameraTimecode");
const batteryFieldsDiv = document.getElementById("batteryFields");
const newCapacityInput = document.getElementById("newCapacity");
const newPinAInput    = document.getElementById("newPinA");
const newDtapAInput   = document.getElementById("newDtapA");
const addDeviceBtn    = document.getElementById("addDeviceBtn");
const exportBtn       = document.getElementById("exportDataBtn");
const exportOutput    = document.getElementById("exportOutput");
const importFileInput = document.getElementById("importFileInput");
const importDataBtn   = document.getElementById("importDataBtn");
const languageSelect  = document.getElementById("languageSelect");
const darkModeToggle  = document.getElementById("darkModeToggle");
const batteryComparisonSection = document.getElementById("batteryComparison");
const batteryTableElem = document.getElementById("batteryTable");
const breakdownListElem = document.getElementById("breakdownList");

// Filter inputs
const cameraFilterInput = document.getElementById("cameraFilter");
const monitorFilterInput = document.getElementById("monitorFilter");
const videoFilterInput = document.getElementById("videoFilter");
const motorFilterInput = document.getElementById("motorFilter");
const controllerFilterInput = document.getElementById("controllerFilter");
const distanceFilterInput = document.getElementById("distanceFilter");
const batteryFilterInput = document.getElementById("batteryFilter");

// List filters for existing device categories
const cameraListFilterInput = document.getElementById("cameraListFilter");
const monitorListFilterInput = document.getElementById("monitorListFilter");
const videoListFilterInput = document.getElementById("videoListFilter");
const motorListFilterInput = document.getElementById("motorListFilter");
const controllerListFilterInput = document.getElementById("controllerListFilter");
const distanceListFilterInput = document.getElementById("distanceListFilter");
const batteryListFilterInput = document.getElementById("batteryListFilter");

// NEW SETUP MANAGEMENT DOM ELEMENTS
const exportSetupsBtn = document.getElementById('exportSetupsBtn');
const importSetupsBtn = document.getElementById('importSetupsBtn');
const importSetupsInput = document.getElementById('importSetupsInput');
const generateOverviewBtn = document.getElementById('generateOverviewBtn');

const videoOutputOptions = [
  '3G-SDI',
  '6G-SDI',
  '12G-SDI',
  'Mini BNC',
  'HDMI',
  'Mini HDMI',
  'Micro HDMI'
];

function getAllFizConnectorTypes() {
  const types = new Set();
  Object.values(devices.cameras).forEach(cam => {
    if (Array.isArray(cam.fizConnectors)) {
      cam.fizConnectors.forEach(fc => {
        if (fc && fc.type) types.add(fc.type);
      });
    }
  });
  return Array.from(types).sort();
}

const fizConnectorOptions = getAllFizConnectorTypes();

function createVideoOutputRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'video-output-select';
  videoOutputOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  if (value) select.value = value;
  row.appendChild(select);
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createVideoOutputRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (videoOutputsContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setVideoOutputs(list) {
  videoOutputsContainer.innerHTML = '';
  if (Array.isArray(list) && list.length) {
    list.forEach(item => {
      const t = typeof item === 'string' ? item : item.type;
      videoOutputsContainer.appendChild(createVideoOutputRow(t));
    });
  } else {
    videoOutputsContainer.appendChild(createVideoOutputRow());
  }
}

function getVideoOutputs() {
  return Array.from(videoOutputsContainer.querySelectorAll('select')).map(sel => ({ type: sel.value }));
}

function clearVideoOutputs() {
  setVideoOutputs([]);
}

function createFizConnectorRow(value = '') {
  const row = document.createElement('div');
  row.className = 'form-row';
  const select = document.createElement('select');
  select.className = 'fiz-connector-select';
  fizConnectorOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    select.appendChild(opt);
  });
  if (value) select.value = value;
  row.appendChild(select);
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createFizConnectorRow());
  });
  row.appendChild(addBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (fizConnectorContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);
  return row;
}

function setFizConnectors(list) {
  fizConnectorContainer.innerHTML = '';
  if (Array.isArray(list) && list.length) {
    list.forEach(item => {
      const t = typeof item === 'string' ? item : item.type;
      fizConnectorContainer.appendChild(createFizConnectorRow(t));
    });
  } else {
    fizConnectorContainer.appendChild(createFizConnectorRow());
  }
}

function getFizConnectors() {
  return Array.from(fizConnectorContainer.querySelectorAll('select')).map(sel => ({ type: sel.value }));
}

function clearFizConnectors() {
  setFizConnectors([]);
}

function getAllViewfinderTypes() {
  const types = new Set();
  Object.values(devices.cameras).forEach(cam => {
    if (Array.isArray(cam.viewfinder)) {
      cam.viewfinder.forEach(vf => {
        if (vf && vf.type) types.add(vf.type);
      });
    }
  });
  return Array.from(types).sort();
}

function getAllViewfinderConnectors() {
  const conns = new Set();
  Object.values(devices.cameras).forEach(cam => {
    if (Array.isArray(cam.viewfinder)) {
      cam.viewfinder.forEach(vf => {
        if (vf && vf.connector) conns.add(vf.connector);
      });
    }
  });
  return Array.from(conns).filter(c => c).sort();
}

let viewfinderTypeOptions = getAllViewfinderTypes();
let viewfinderConnectorOptions = getAllViewfinderConnectors();

function createViewfinderRow(type = '', resolution = '', connector = '', notes = '') {
  const row = document.createElement('div');
  row.className = 'form-row';

  const typeSelect = document.createElement('select');
  typeSelect.className = 'viewfinder-type-select';
  viewfinderTypeOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    typeSelect.appendChild(opt);
  });
  if (type && !viewfinderTypeOptions.includes(type)) {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = type;
    typeSelect.appendChild(opt);
  }
  typeSelect.value = type;
  row.appendChild(typeSelect);

  const resInput = document.createElement('input');
  resInput.type = 'text';
  resInput.placeholder = 'Resolution';
  resInput.value = resolution;
  row.appendChild(resInput);

  const connSelect = document.createElement('select');
  connSelect.className = 'viewfinder-connector-select';
  viewfinderConnectorOptions.forEach(optVal => {
    const opt = document.createElement('option');
    opt.value = optVal;
    opt.textContent = optVal;
    connSelect.appendChild(opt);
  });
  if (connector && !viewfinderConnectorOptions.includes(connector)) {
    const opt = document.createElement('option');
    opt.value = connector;
    opt.textContent = connector;
    connSelect.appendChild(opt);
  }
  connSelect.value = connector;
  row.appendChild(connSelect);

  const notesInput = document.createElement('input');
  notesInput.type = 'text';
  notesInput.placeholder = 'Notes';
  notesInput.value = notes;
  row.appendChild(notesInput);

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    row.after(createViewfinderRow());
  });
  row.appendChild(addBtn);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', () => {
    if (viewfinderContainer.children.length > 1) row.remove();
  });
  row.appendChild(removeBtn);

  return row;
}

function setViewfinders(list) {
  viewfinderContainer.innerHTML = '';
  if (Array.isArray(list) && list.length) {
    list.forEach(item => {
      const { type = '', resolution = '', connector = '', notes = '' } = item || {};
      viewfinderContainer.appendChild(createViewfinderRow(type, resolution, connector, notes));
    });
  } else {
    viewfinderContainer.appendChild(createViewfinderRow());
  }
}

function getViewfinders() {
  return Array.from(viewfinderContainer.querySelectorAll('.form-row')).map(row => {
    const [typeSelect, resInput, connSelect, notesInput] = row.querySelectorAll('select, input');
    return {
      type: typeSelect.value,
      resolution: resInput.value,
      connector: connSelect.value,
      notes: notesInput.value
    };
  });
}

function clearViewfinders() {
  setViewfinders([]);
}


// Populate dropdowns with device options
function populateSelect(selectElem, optionsObj, includeNone=true) {
  selectElem.innerHTML = "";
  if (includeNone) {
    const noneOpt = document.createElement("option");
    noneOpt.value = "None";
    noneOpt.textContent = (currentLang === "de") ? "Keine Auswahl" : "None";
    selectElem.appendChild(noneOpt);
  }
  for (let name in optionsObj) {
    if (name === "None") continue; // "None" is added separately
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    selectElem.appendChild(opt);
  }
}

function filterSelect(selectElem, filterValue) {
  const text = filterValue.toLowerCase();
  Array.from(selectElem.options).forEach(opt => {
    if (opt.value === "None" || text === "" || opt.textContent.toLowerCase().includes(text)) {
      opt.hidden = false;
    } else {
      opt.hidden = true;
    }
  });
}

function filterDeviceList(listElem, filterValue) {
  const text = filterValue.toLowerCase();
  Array.from(listElem.querySelectorAll('li')).forEach(li => {
    if (text === '' || li.textContent.toLowerCase().includes(text)) {
      li.style.display = '';
    } else {
      li.style.display = 'none';
    }
  });
}

// Attach in-select search filtering for a dropdown
function attachSelectSearch(selectElem) {
  let searchStr = "";
  let timer;

  selectElem.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      searchStr = searchStr.slice(0, -1);
      filterSelect(selectElem, searchStr);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      searchStr = "";
      filterSelect(selectElem, searchStr);
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      searchStr += e.key.toLowerCase();
      filterSelect(selectElem, searchStr);
      e.preventDefault();
    } else {
      return;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      searchStr = "";
    }, 1000);
  });

  selectElem.addEventListener('blur', () => {
    searchStr = "";
    filterSelect(selectElem, "");
  });
}

function applyFilters() {
  filterSelect(cameraSelect, cameraFilterInput.value);
  filterSelect(monitorSelect, monitorFilterInput.value);
  filterSelect(videoSelect, videoFilterInput.value);
  motorSelects.forEach(sel => filterSelect(sel, motorFilterInput.value));
  controllerSelects.forEach(sel => filterSelect(sel, controllerFilterInput.value));
  filterSelect(distanceSelect, distanceFilterInput.value);
  filterSelect(batterySelect, batteryFilterInput.value);

  filterDeviceList(cameraListElem, cameraListFilterInput.value);
  filterDeviceList(monitorListElem, monitorListFilterInput.value);
  filterDeviceList(videoListElem, videoListFilterInput.value);
  filterDeviceList(motorListElem, motorListFilterInput.value);
  filterDeviceList(controllerListElem, controllerListFilterInput.value);
  filterDeviceList(distanceListElem, distanceListFilterInput.value);
  filterDeviceList(batteryListElem, batteryListFilterInput.value);
}

// Initialize device selection dropdowns
populateSelect(cameraSelect, devices.cameras, true);
populateSelect(monitorSelect, devices.monitors, true);
populateSelect(videoSelect, devices.video, true);
motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
populateSelect(distanceSelect, devices.fiz.distance, true);
populateSelect(batterySelect, devices.batteries, true);

// Enable search inside dropdowns
[cameraSelect, monitorSelect, videoSelect, distanceSelect, batterySelect]
  .forEach(sel => attachSelectSearch(sel));
motorSelects.forEach(sel => attachSelectSearch(sel));
controllerSelects.forEach(sel => attachSelectSearch(sel));
applyFilters();
setVideoOutputs([]);
setFizConnectors([]);

// Set default selections for dropdowns

// Kamera: Wenn Option „None“ existiert, dann setze sie – sonst erste Option
const noneCameraOption = Array.from(cameraSelect.options).find(opt => opt.value === "None");
if (noneCameraOption) {
  cameraSelect.value = "None";
} else {
  cameraSelect.selectedIndex = 0;
}

// Für die anderen Dropdowns
[monitorSelect, videoSelect, distanceSelect, batterySelect].forEach(sel => {
  const noneOption = Array.from(sel.options).find(opt => opt.value === "None");
  if (noneOption) {
    sel.value = "None";
  } else {
    sel.selectedIndex = 0;
  }
});

// FIZ Dropdowns
motorSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
controllerSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });

// Calculation function to update results and warnings
function updateCalculations() {
  // Gather selected values
  const camera      = cameraSelect.value;
  const monitor     = monitorSelect.value;
  const video       = videoSelect.value;
  const motors      = motorSelects.map(sel => sel.value);
  const controllers = controllerSelects.map(sel => sel.value);
  const distance    = distanceSelect.value;
  const battery     = batterySelect.value;

  // Calculate total power consumption (W)
  let cameraW = 0;
  if (devices.cameras[camera] !== undefined) {
    const camData = devices.cameras[camera];
    cameraW = typeof camData === 'object' ? camData.powerDrawWatts || 0 : camData;
  }
  let monitorW = 0;
  if (devices.monitors[monitor] !== undefined) {
    const mData = devices.monitors[monitor];
    monitorW = typeof mData === 'object' ? mData.powerDrawWatts || 0 : mData;
  }
  let videoW = 0;
  if (devices.video[video] !== undefined) {
    const vData = devices.video[video];
    videoW = typeof vData === 'object' ? vData.powerDrawWatts || 0 : vData;
  }
  let motorsW = 0;
  motors.forEach(m => {
    if (devices.fiz.motors[m] !== undefined) {
      const d = devices.fiz.motors[m];
      motorsW += typeof d === 'object' ? d.powerDrawWatts || 0 : d;
    }
  });
  let controllersW = 0;
  controllers.forEach(c => {
    if (devices.fiz.controllers[c] !== undefined) {
      const d = devices.fiz.controllers[c];
      controllersW += typeof d === 'object' ? d.powerDrawWatts || 0 : d;
    }
  });
  let distanceW = 0;
  if (devices.fiz.distance[distance] !== undefined) {
    const d = devices.fiz.distance[distance];
    distanceW = typeof d === 'object' ? d.powerDrawWatts || 0 : d;
  }

  const totalWatt = cameraW + monitorW + videoW + motorsW + controllersW + distanceW;
  totalPowerElem.textContent = totalWatt.toFixed(1);

  // Update breakdown by category
  breakdownListElem.innerHTML = "";
  if (cameraW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].cameraLabel}</strong> ${cameraW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }
  if (monitorW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].monitorLabel}</strong> ${monitorW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }
  if (videoW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].videoLabel}</strong> ${videoW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }
  if (motorsW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].fizMotorsLabel}</strong> ${motorsW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }
  if (controllersW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].fizControllersLabel}</strong> ${controllersW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }
  if (distanceW > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${texts[currentLang].distanceLabel}</strong> ${distanceW.toFixed(1)} W`;
    breakdownListElem.appendChild(li);
  }

  // Calculate currents at 14.4V and 12V
  let totalCurrent144 = 0;
  let totalCurrent12 = 0;
  if (totalWatt > 0) {
    totalCurrent144 = totalWatt / 14.4;
    totalCurrent12 = totalWatt / 12.0;
  }
  // Zeige Stromverbrauch unabhängig vom Akku
totalCurrent144Elem.textContent = totalCurrent144.toFixed(2);
totalCurrent12Elem.textContent = totalCurrent12.toFixed(2);

// Wenn kein Akku oder "None" ausgewählt ist: Laufzeit = nicht berechenbar, keine Warnungen
if (!battery || battery === "None" || !devices.batteries[battery]) {
  batteryLifeElem.textContent = "–";
  pinWarnElem.textContent = "";
  pinWarnElem.style.color = "";
  dtapWarnElem.textContent = "";
  dtapWarnElem.style.color = "";
} else {
    const battData = devices.batteries[battery];
    const capacityWh = battData.capacity;
    const maxPinA = battData.pinA;
    const maxDtapA = battData.dtapA;
    totalCurrent144Elem.textContent = totalCurrent144.toFixed(2);
    totalCurrent12Elem.textContent = totalCurrent12.toFixed(2);
    if (totalWatt === 0) {
      batteryLifeElem.textContent = "∞";
    } else {
      const hours = capacityWh / totalWatt;
      batteryLifeElem.textContent = hours.toFixed(2);
    }
    // Warnings about current draw vs battery limits
    pinWarnElem.textContent = "";
    dtapWarnElem.textContent = "";
    if (totalCurrent12 > maxPinA) {
      pinWarnElem.textContent = texts[currentLang].warnPinExceeded
        .replace("{current}", totalCurrent12.toFixed(2))
        .replace("{max}", maxPinA);
    } else if (totalCurrent12 > maxPinA * 0.8) {
      pinWarnElem.textContent = texts[currentLang].warnPinNear
        .replace("{current}", totalCurrent12.toFixed(2))
        .replace("{max}", maxPinA);
    }
    if (totalCurrent12 > maxDtapA) {
      dtapWarnElem.textContent = texts[currentLang].warnDTapExceeded
        .replace("{current}", totalCurrent12.toFixed(2))
        .replace("{max}", maxDtapA);
    } else if (totalCurrent12 > maxDtapA * 0.8) {
      dtapWarnElem.textContent = texts[currentLang].warnDTapNear
        .replace("{current}", totalCurrent12.toFixed(2))
        .replace("{max}", maxDtapA);
    }
    // Show max current capability and status (OK/Warning) for Pin and D-Tap
    if (pinWarnElem.textContent === "") {
      pinWarnElem.textContent = (currentLang === "de") ? `${maxPinA}A max – OK` : `${maxPinA}A max – OK`;
      pinWarnElem.style.color = "green";
    } else {
      if (pinWarnElem.textContent.startsWith("WARNING") || pinWarnElem.textContent.startsWith("WARNUNG")) {
        pinWarnElem.style.color = "red";
      } else if (pinWarnElem.textContent.startsWith("Note") || pinWarnElem.textContent.startsWith("Hinweis")) {
        pinWarnElem.style.color = "orange";
      } else {
        pinWarnElem.style.color = "";
      }
    }
    if (dtapWarnElem.textContent === "") {
      dtapWarnElem.textContent = (currentLang === "de") ? `${maxDtapA}A max – OK` : `${maxDtapA}A max – OK`;
      dtapWarnElem.style.color = "green";
    } else {
      if (dtapWarnElem.textContent.startsWith("WARNING") || dtapWarnElem.textContent.startsWith("WARNUNG")) {
        dtapWarnElem.style.color = "red";
      } else if (dtapWarnElem.textContent.startsWith("Note") || dtapWarnElem.textContent.startsWith("Hinweis")) {
        dtapWarnElem.style.color = "orange";
      } else {
        dtapWarnElem.style.color = "";
      }
    }
  }

  // Battery comparison table update
  if (totalWatt > 0) {
    // Build lists of batteries that can supply this current (via Pin or D-Tap)
    const selectedBatteryName = batterySelect.value;
    let selectedCandidate = null;
    if (selectedBatteryName && selectedBatteryName !== "None" && devices.batteries[selectedBatteryName]) {
      const selData = devices.batteries[selectedBatteryName];
      const pinOK_sel = totalCurrent12 <= selData.pinA;
      const dtapOK_sel = totalCurrent12 <= selData.dtapA;
      if (pinOK_sel || dtapOK_sel) {
        const selHours = selData.capacity / totalWatt;
        let selMethod;
        if (pinOK_sel && dtapOK_sel) selMethod = "both pins and D-Tap";
        else if (pinOK_sel) selMethod = "pins";
        else selMethod = "dtap";
        selectedCandidate = { name: selectedBatteryName, hours: selHours, method: selMethod };
      }
    }

    const pinsCandidates = [];
    const dtapCandidates = [];
    for (let battName in devices.batteries) {
      if (battName === "None") continue;
      if (selectedCandidate && battName === selectedCandidate.name) continue;

      const data = devices.batteries[battName];
      const canPin = totalCurrent12 <= data.pinA;
      const canDTap = totalCurrent12 <= data.dtapA;

      if (canPin) {
        const hours = data.capacity / totalWatt;
        const method = (canDTap ? "both pins and D-Tap" : "pins");
        pinsCandidates.push({ name: battName, hours: hours, method: method });
      } else if (canDTap) {
        const hours = data.capacity / totalWatt;
        dtapCandidates.push({ name: battName, hours: hours, method: "dtap" });
      }
    }

    // Sort by runtime (hours) descending within each group
    pinsCandidates.sort((a, b) => b.hours - a.hours);
    dtapCandidates.sort((a, b) => b.hours - a.hours);

    // Prepare table HTML
    let tableHtml = `<tr><th>${texts[currentLang].batteryTableLabel}</th><th>${texts[currentLang].runtimeLabel}</th><th></th></tr>`;

    if ((selectedCandidate ? 1 : 0) + pinsCandidates.length + dtapCandidates.length === 0) {
      // No battery can supply via either output
      tableHtml += `<tr><td colspan="3">${texts[currentLang].noBatterySupports}</td></tr>`;
    } else {
      const allCandidatesForMax = (selectedCandidate ? [selectedCandidate] : []).concat(pinsCandidates, dtapCandidates);
      const maxHours = Math.max(...allCandidatesForMax.map(c => c.hours)) || 1; // Ensure not dividing by zero

      // Helper function to get the correct bar class
      const getBarClass = (method) => {
          return method === "pins" ? "bar bar-pins-only" : "bar";
      };
      // Helper to display method label
      const getMethodLabel = (method) => {
          return method === "pins" ? "pins only!" : method;
      };

      // Add selected battery first, if it's a valid candidate
      if (selectedCandidate) {
        tableHtml += `<tr class="selectedBatteryRow">
                        <td>${selectedCandidate.name}</td>
                        <td>${selectedCandidate.hours.toFixed(2)}h (${getMethodLabel(selectedCandidate.method)})</td>
                        <td>
                          <div class="barContainer">
                            <div class="${getBarClass(selectedCandidate.method)}" style="width: ${(selectedCandidate.hours / maxHours) * 100}%;"></div>
                          </div>
                        </td>
                      </tr>`;
      }
      // Add other candidates
      pinsCandidates.forEach(candidate => {
        if (selectedCandidate && candidate.name === selectedCandidate.name) return; // Already added if selected
        tableHtml += `<tr>
                        <td>${candidate.name}</td>
                        <td>${candidate.hours.toFixed(2)}h (${getMethodLabel(candidate.method)})</td>
                        <td>
                          <div class="barContainer">
                            <div class="${getBarClass(candidate.method)}" style="width: ${(candidate.hours / maxHours) * 100}%;"></div>
                          </div>
                        </td>
                      </tr>`;
      });
       dtapCandidates.forEach(candidate => {
        if (selectedCandidate && candidate.name === selectedCandidate.name) return; // Already added if selected
        // Only add if not already in pinsCandidates (to avoid duplicates if a battery can do both but was only listed under dtapCandidates)
        const alreadyInPins = pinsCandidates.some(p => p.name === candidate.name);
        if (!alreadyInPins) {
            tableHtml += `<tr>
                            <td>${candidate.name}</td>
                            <td>${candidate.hours.toFixed(2)}h (${getMethodLabel(candidate.method)})</td>
                            <td>
                              <div class="barContainer">
                                <div class="${getBarClass(candidate.method)}" style="width: ${(candidate.hours / maxHours) * 100}%;"></div>
                              </div>
                            </td>
                          </tr>`;
        }
      });
    }
    batteryTableElem.innerHTML = tableHtml;
    batteryComparisonSection.style.display = "block";
  } else {
    batteryComparisonSection.style.display = "none";
  }
}

// Helper to render existing devices in the manager section
function renderDeviceList(categoryKey, ulElement) {
  ulElement.innerHTML = "";
  let categoryDevices = devices[categoryKey];
  // Handle nested FIZ categories
  if (categoryKey.includes('.')) {
    const [mainCat, subCat] = categoryKey.split('.');
    categoryDevices = devices[mainCat] && devices[mainCat][subCat];
  }
  if (!categoryDevices) return;

  for (let name in categoryDevices) {
    if (name === "None") continue;
    const deviceData = categoryDevices[name];
    let displayData = "";

    if (categoryKey === "batteries") {
      displayData = `(${deviceData.capacity} Wh, ${deviceData.pinA}A Pin, ${deviceData.dtapA}A D-Tap)`;
    } else {
      const watt = typeof deviceData === 'object' ? deviceData.powerDrawWatts : deviceData;
      displayData = `(${watt} W)`;
    }

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = `${name} ${displayData}`;
    li.appendChild(span);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.dataset.name = name;
    editBtn.dataset.category = categoryKey;
    editBtn.textContent = texts[currentLang].editBtn;
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.dataset.name = name;
    deleteBtn.dataset.category = categoryKey;
    deleteBtn.textContent = texts[currentLang].deleteDeviceBtn;
    li.appendChild(deleteBtn);

    ulElement.appendChild(li);
  }
}

function refreshDeviceLists() {
  renderDeviceList("cameras", cameraListElem);
  renderDeviceList("monitors", monitorListElem);
  renderDeviceList("video", videoListElem);
  renderDeviceList("fiz.motors", motorListElem);
  renderDeviceList("fiz.controllers", controllerListElem);
  renderDeviceList("fiz.distance", distanceListElem);
  renderDeviceList("batteries", batteryListElem);

  filterDeviceList(cameraListElem, cameraListFilterInput.value);
  filterDeviceList(monitorListElem, monitorListFilterInput.value);
  filterDeviceList(videoListElem, videoListFilterInput.value);
  filterDeviceList(motorListElem, motorListFilterInput.value);
  filterDeviceList(controllerListElem, controllerListFilterInput.value);
  filterDeviceList(distanceListElem, distanceListFilterInput.value);
  filterDeviceList(batteryListElem, batteryListFilterInput.value);
}

// Initial render of device lists
refreshDeviceLists();

// --- EVENT LISTENERS ---

// Language selection
languageSelect.addEventListener("change", (event) => {
  setLanguage(event.target.value);
});

// Filtering inputs
cameraFilterInput.addEventListener("input", () => filterSelect(cameraSelect, cameraFilterInput.value));
monitorFilterInput.addEventListener("input", () => filterSelect(monitorSelect, monitorFilterInput.value));
videoFilterInput.addEventListener("input", () => filterSelect(videoSelect, videoFilterInput.value));
motorFilterInput.addEventListener("input", () => motorSelects.forEach(sel => filterSelect(sel, motorFilterInput.value)));
controllerFilterInput.addEventListener("input", () => controllerSelects.forEach(sel => filterSelect(sel, controllerFilterInput.value)));
distanceFilterInput.addEventListener("input", () => filterSelect(distanceSelect, distanceFilterInput.value));
batteryFilterInput.addEventListener("input", () => filterSelect(batterySelect, batteryFilterInput.value));

cameraListFilterInput.addEventListener("input", () => filterDeviceList(cameraListElem, cameraListFilterInput.value));
monitorListFilterInput.addEventListener("input", () => filterDeviceList(monitorListElem, monitorListFilterInput.value));
videoListFilterInput.addEventListener("input", () => filterDeviceList(videoListElem, videoListFilterInput.value));
motorListFilterInput.addEventListener("input", () => filterDeviceList(motorListElem, motorListFilterInput.value));
controllerListFilterInput.addEventListener("input", () => filterDeviceList(controllerListElem, controllerListFilterInput.value));
distanceListFilterInput.addEventListener("input", () => filterDeviceList(distanceListElem, distanceListFilterInput.value));
batteryListFilterInput.addEventListener("input", () => filterDeviceList(batteryListElem, batteryListFilterInput.value));

// Setup management
saveSetupBtn.addEventListener("click", () => {
  const setupName = setupNameInput.value.trim();
  if (!setupName) {
    alert(texts[currentLang].alertSetupName);
    return;
  }
  const currentSetup = {
    camera: cameraSelect.value,
    monitor: monitorSelect.value,
    video: videoSelect.value,
    motors: motorSelects.map(sel => sel.value),
    controllers: controllerSelects.map(sel => sel.value),
    distance: distanceSelect.value,
    battery: batterySelect.value
  };
  let setups = loadSetups();
  setups[setupName] = currentSetup;
  saveSetups(setups);
  populateSetupSelect();
  setupSelect.value = setupName; // Select the newly saved setup
  alert(texts[currentLang].alertSetupSaved.replace("{name}", setupName));
});

deleteSetupBtn.addEventListener("click", () => {
  const setupName = setupSelect.value;
  if (!setupName) {
    alert(texts[currentLang].alertNoSetupSelected);
    return;
  }
  if (confirm(texts[currentLang].confirmDeleteSetup.replace("{name}", setupName))) {
    let setups = loadSetups();
    delete setups[setupName];
    saveSetups(setups);
    populateSetupSelect();
    setupNameInput.value = ""; // Clear setup name input
    // Reset dropdowns to "None" or first option after deleting current setup
    [cameraSelect, monitorSelect, videoSelect, distanceSelect, batterySelect].forEach(sel => {
      const noneOption = Array.from(sel.options).find(opt => opt.value === "None");
      if (noneOption) {
        sel.value = "None";
      } else {
        sel.selectedIndex = 0;
      }
    });
    motorSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    controllerSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    updateCalculations(); // Recalculate after clearing setup
  }
});

setupSelect.addEventListener("change", (event) => {
  const setupName = event.target.value;
  if (setupName === "") { // "-- New Setup --" selected
    setupNameInput.value = "";
    // Reset all dropdowns to "None" or first option
    [cameraSelect, monitorSelect, videoSelect, distanceSelect, batterySelect].forEach(sel => {
      const noneOption = Array.from(sel.options).find(opt => opt.value === "None");
      if (noneOption) {
        sel.value = "None";
      } else {
        sel.selectedIndex = 0;
      }
    });
    motorSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    controllerSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
  } else {
    let setups = loadSetups();
    const setup = setups[setupName];
    if (setup) {
      setupNameInput.value = setupName;
      cameraSelect.value = setup.camera;
      monitorSelect.value = setup.monitor;
      videoSelect.value = setup.video;
      setup.motors.forEach((val, i) => { if (motorSelects[i]) motorSelects[i].value = val; });
      setup.controllers.forEach((val, i) => { if (controllerSelects[i]) controllerSelects[i].value = val; });
      distanceSelect.value = setup.distance;
      batterySelect.value = setup.battery;
    }
  }
  updateCalculations();
});


function populateSetupSelect() {
  const setups = loadSetups();
  setupSelect.innerHTML = `<option value="">${texts[currentLang].newSetupOption}</option>`;
  for (const name in setups) {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    setupSelect.appendChild(opt);
  }
}
populateSetupSelect(); // Initial populate of setups


// Toggle device manager visibility
const toggleDeviceManagerButton = document.getElementById('toggleDeviceManager'); // Corrected ID reference
if (toggleDeviceManagerButton) { // Check if element exists before adding listener
    toggleDeviceManagerButton.addEventListener("click", () => {
        if (deviceManagerSection.style.display === "none") {
            deviceManagerSection.style.display = "block";
            toggleDeviceManagerButton.textContent = texts[currentLang].hideDeviceManager;
            refreshDeviceLists(); // Refresh lists when shown
            updateCalculations(); // Ensure calculations are up to date
        } else {
            deviceManagerSection.style.display = "none";
            toggleDeviceManagerButton.textContent = texts[currentLang].toggleDeviceManager;
        }
    });
}


// Handle "Edit" and "Delete" buttons in device lists (event delegation)
deviceManagerSection.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-btn")) {
    const name = event.target.dataset.name;
    const categoryKey = event.target.dataset.category;

    // Set form for editing
    newNameInput.value = name;
    newCategorySelect.value = categoryKey;
    newCategorySelect.disabled = true; // Prevent changing category during edit

    let deviceData;
    if (categoryKey.includes('.')) {
      const [mainCat, subCat] = categoryKey.split('.');
      deviceData = devices[mainCat][subCat][name];
    } else {
      deviceData = devices[categoryKey][name];
    }

    if (categoryKey === "batteries") {
      wattFieldDiv.style.display = "none";
      cameraFieldsDiv.style.display = "none";
      batteryFieldsDiv.style.display = "block";
      newCapacityInput.value = deviceData.capacity;
      newPinAInput.value = deviceData.pinA;
      newDtapAInput.value = deviceData.dtapA;
    } else if (categoryKey === "cameras") {
      wattFieldDiv.style.display = "none";
      batteryFieldsDiv.style.display = "none";
      cameraFieldsDiv.style.display = "block";
      cameraWattInput.value = deviceData.powerDrawWatts || '';
      cameraVoltageInput.value = deviceData.power?.input?.voltageRange || '';
      cameraPortTypeInput.value = deviceData.power?.input?.portType || '';
      cameraBatteryTypeInput.value = deviceData.power?.internalBattery?.type || '';
      cameraBatteryLifeInput.value = deviceData.power?.internalBattery?.batteryLifeMinutes || '';
      cameraPlatesInput.value = JSON.stringify(deviceData.power?.batteryPlateSupport || [], null, 2);
      cameraMediaInput.value = (deviceData.recordingMedia || []).join(',');
      cameraLensMountInput.value = (deviceData.lensMount || []).join(',');
      cameraPowerDistInput.value = JSON.stringify(deviceData.power?.powerDistributionOutputs || [] , null, 2);
      setVideoOutputs(deviceData.videoOutputs || []);
      setFizConnectors(deviceData.fizConnectors || []);
      setViewfinders(deviceData.viewfinder || []);
      cameraTimecodeInput.value = JSON.stringify(deviceData.timecode || [], null, 2);
    } else {
      wattFieldDiv.style.display = "block";
      batteryFieldsDiv.style.display = "none";
      cameraFieldsDiv.style.display = "none";
      const watt = typeof deviceData === 'object' ? deviceData.powerDrawWatts : deviceData;
      newWattInput.value = watt;
    }
    // Change button to "Update"
    addDeviceBtn.textContent = texts[currentLang].updateDeviceBtn;
    addDeviceBtn.dataset.mode = "edit";
    addDeviceBtn.dataset.originalName = name; // Store original name for update
  } else if (event.target.classList.contains("delete-btn")) {
    const name = event.target.dataset.name;
    const categoryKey = event.target.dataset.category;
    if (confirm(texts[currentLang].confirmDeleteDevice.replace("{name}", name))) {
      if (categoryKey.includes('.')) {
        const [mainCat, subCat] = categoryKey.split('.');
        delete devices[mainCat][subCat][name];
      } else {
        delete devices[categoryKey][name];
      }
      saveDeviceData(devices); // Save changes to localStorage
      viewfinderTypeOptions = getAllViewfinderTypes();
      viewfinderConnectorOptions = getAllViewfinderConnectors();
      refreshDeviceLists();
      // Re-populate all dropdowns and update calculations
      populateSelect(cameraSelect, devices.cameras, true);
      populateSelect(monitorSelect, devices.monitors, true);
      populateSelect(videoSelect, devices.video, true);
      motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
      controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
      populateSelect(distanceSelect, devices.fiz.distance, true);
      populateSelect(batterySelect, devices.batteries, true);
      applyFilters();
      updateCalculations();
    }
  }
});

// Category selection in add device form
newCategorySelect.addEventListener("change", () => {
  const val = newCategorySelect.value;
  if (val === "batteries") {
    wattFieldDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
    batteryFieldsDiv.style.display = "block";
  } else if (val === "cameras") {
    wattFieldDiv.style.display = "none";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "block";
  } else {
    wattFieldDiv.style.display = "block";
    batteryFieldsDiv.style.display = "none";
    cameraFieldsDiv.style.display = "none";
  }
  newWattInput.value = "";
  newCapacityInput.value = "";
  newPinAInput.value = "";
  newDtapAInput.value = "";
  cameraWattInput.value = "";
  cameraVoltageInput.value = "";
  cameraPortTypeInput.value = "";
  cameraBatteryTypeInput.value = "";
  cameraBatteryLifeInput.value = "";
  cameraPlatesInput.value = "";
  cameraMediaInput.value = "";
  cameraLensMountInput.value = "";
  cameraPowerDistInput.value = "";
  clearVideoOutputs();
  clearFizConnectors();
  clearViewfinders();
  cameraTimecodeInput.value = "";
  // Reset add/update button to "Add" and clear originalName in dataset
  addDeviceBtn.textContent = texts[currentLang].addDeviceBtn;
  addDeviceBtn.dataset.mode = "add";
  delete addDeviceBtn.dataset.originalName;
  newNameInput.value = ""; // Clear name to avoid accidental update
});


// Add/Update device logic
addDeviceBtn.addEventListener("click", () => {
  const name = newNameInput.value.trim();
  const category = newCategorySelect.value;
  const isEditing = addDeviceBtn.dataset.mode === "edit";
  const originalName = addDeviceBtn.dataset.originalName;

  if (!name) {
    alert(texts[currentLang].alertDeviceName);
    return;
  }

  let targetCategory;
  if (category.includes('.')) {
    const [mainCat, subCat] = category.split('.');
    if (!devices[mainCat]) devices[mainCat] = {};
    if (!devices[mainCat][subCat]) devices[mainCat][subCat] = {};
    targetCategory = devices[mainCat][subCat];
  } else {
    if (!devices[category]) devices[category] = {};
    targetCategory = devices[category];
  }

  // Check for duplicate name if adding, or if name changed during edit
  if ((!isEditing && targetCategory[name] !== undefined) || (isEditing && name !== originalName && targetCategory[name] !== undefined)) {
    alert(texts[currentLang].alertDeviceExists);
    return;
  }

  if (category === "batteries") {
    const capacity = parseFloat(newCapacityInput.value);
    const pinA = parseFloat(newPinAInput.value);
    const dtapA = parseFloat(newDtapAInput.value);
    if (isNaN(capacity) || isNaN(pinA) || isNaN(dtapA) || capacity <= 0 || pinA <= 0 || dtapA < 0) {
      alert(texts[currentLang].alertDeviceFields);
      return;
    }
    // Delete original name entry if name changed during edit
    if (isEditing && name !== originalName) {
        delete targetCategory[originalName];
    }
    targetCategory[name] = { capacity: capacity, pinA: pinA, dtapA: dtapA };
  } else if (category === "cameras") {
    const watt = parseFloat(cameraWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    if (isEditing && name !== originalName) {
      delete targetCategory[originalName];
    }
    let powerDist, videoOut, fizCon, viewfinder, timecode, plateSupport;
    try {
      powerDist = cameraPowerDistInput.value ? JSON.parse(cameraPowerDistInput.value) : [];
      videoOut = getVideoOutputs();
      fizCon = getFizConnectors();
      viewfinder = getViewfinders();
      timecode = cameraTimecodeInput.value ? JSON.parse(cameraTimecodeInput.value) : [];
      plateSupport = cameraPlatesInput.value ? JSON.parse(cameraPlatesInput.value) : [];
    } catch (e) {
      console.error("Invalid camera JSON input:", e);
      alert(texts[currentLang].alertInvalidCameraJSON);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      power: {
        input: {
          voltageRange: cameraVoltageInput.value,
          portType: cameraPortTypeInput.value
        },
        internalBattery: {
          type: cameraBatteryTypeInput.value,
          batteryLifeMinutes: cameraBatteryLifeInput.value ? parseFloat(cameraBatteryLifeInput.value) : null
        },
        batteryPlateSupport: plateSupport,
        powerDistributionOutputs: powerDist
      },
      videoOutputs: videoOut,
      fizConnectors: fizCon,
      recordingMedia: cameraMediaInput.value ? cameraMediaInput.value.split(',').map(s => s.trim()).filter(s => s) : [],
      viewfinder: viewfinder,
      lensMount: cameraLensMountInput.value ? cameraLensMountInput.value.split(',').map(s => s.trim()).filter(s => s) : [],
      timecode: timecode
    };
  } else {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    if (isEditing && name !== originalName) {
      delete targetCategory[originalName];
    }
    targetCategory[name] = { powerDrawWatts: watt };
  }

  // After adding/updating, reset form and refresh lists
  newNameInput.value = "";
  newWattInput.value = "";
  newCapacityInput.value = "";
  newPinAInput.value = "";
  newDtapAInput.value = "";
  cameraWattInput.value = "";
  cameraVoltageInput.value = "";
  cameraPortTypeInput.value = "";
  cameraBatteryTypeInput.value = "";
  cameraBatteryLifeInput.value = "";
  cameraPlatesInput.value = "";
  cameraMediaInput.value = "";
  cameraLensMountInput.value = "";
  cameraPowerDistInput.value = "";
  clearVideoOutputs();
  clearFizConnectors();
  clearViewfinders();
  cameraTimecodeInput.value = "";
  newCategorySelect.disabled = false; // Re-enable category select
  addDeviceBtn.textContent = texts[currentLang].addDeviceBtn; // Reset button text
  addDeviceBtn.dataset.mode = "add"; // Reset mode
  delete addDeviceBtn.dataset.originalName; // Clear original name

  saveDeviceData(devices); // Save changes to localStorage
  viewfinderTypeOptions = getAllViewfinderTypes();
  viewfinderConnectorOptions = getAllViewfinderConnectors();
  refreshDeviceLists();
  // Re-populate all dropdowns to include the new/updated device
  populateSelect(cameraSelect, devices.cameras, true);
  populateSelect(monitorSelect, devices.monitors, true);
  populateSelect(videoSelect, devices.video, true);
  motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
  controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
  populateSelect(distanceSelect, devices.fiz.distance, true);
  populateSelect(batterySelect, devices.batteries, true);
  applyFilters();
  updateCalculations(); // Update calculations after device data changes

  let categoryKey = category.replace(".", "_");
  let categoryDisplay = texts[currentLang]["category_" + categoryKey] || category;
  if (isEditing) {
      alert(texts[currentLang].alertDeviceUpdated.replace("{name}", name).replace("{category}", categoryDisplay));
  } else {
      alert(texts[currentLang].alertDeviceAdded.replace("{name}", name).replace("{category}", categoryDisplay));
  }
});

// Export device data
exportBtn.addEventListener("click", () => {
  const dataStr = JSON.stringify(devices, null, 2);
  exportOutput.style.display = "block";
  exportOutput.value = dataStr;
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "device_data_export.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

const exportAndRevertBtn = document.getElementById('exportAndRevertBtn'); 

if (exportAndRevertBtn) {
  exportAndRevertBtn.addEventListener('click', () => {
    // Step 1: Export the current database
    if (confirm(texts[currentLang].confirmExportAndRevert)) { // Confirmation for both actions
      // Reusing the export logic from the existing 'Export Database' button
      const dataStr = JSON.stringify(devices, null, 2);
      // For simplicity, let's just trigger a download directly.
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "device_data_backup_before_revert.json"; // Suggests it's a backup
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Give a small delay to ensure download prompt appears before next step
      setTimeout(() => {
        // Step 2: Revert to the default database
        devices = JSON.parse(JSON.stringify(window.defaultDevices)); // Use window.defaultDevices here
        saveDeviceData(devices); // Save the default data back to localStorage

        viewfinderTypeOptions = getAllViewfinderTypes();
        viewfinderConnectorOptions = getAllViewfinderConnectors();

        // Update the UI to reflect the reverted database
        populateSelect(cameraSelect, devices.cameras, true);
        populateSelect(monitorSelect, devices.monitors, true);
        populateSelect(videoSelect, devices.video, true);
        motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
        controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
        populateSelect(distanceSelect, devices.fiz.distance, true);
        populateSelect(batterySelect, devices.batteries, true);
        applyFilters();
        refreshDeviceLists(); // Refresh device manager lists
        updateCalculations();

        alert(texts[currentLang].alertExportAndRevertSuccess); // Success message for both actions
      }, 500); // 500ms delay
    }
  });
}

// Import device data
importDataBtn.addEventListener("click", () => {
  importFileInput.click(); // Trigger the file input click
});

importFileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target.result);
      // Basic validation: check if it has expected top-level keys
      const expectedKeys = ["cameras", "monitors", "video", "fiz", "batteries"];
      const hasAllKeys = expectedKeys.every(key => Object.prototype.hasOwnProperty.call(importedData, key));

      if (hasAllKeys && typeof importedData.fiz === 'object' &&
          Object.prototype.hasOwnProperty.call(importedData.fiz,'motors') &&
          Object.prototype.hasOwnProperty.call(importedData.fiz,'controllers') &&
          Object.prototype.hasOwnProperty.call(importedData.fiz,'distance')) {
        devices = importedData; // Overwrite current devices with imported data
        saveDeviceData(devices); // Persist to local storage
        viewfinderTypeOptions = getAllViewfinderTypes();
        viewfinderConnectorOptions = getAllViewfinderConnectors();
        refreshDeviceLists(); // Update device manager lists
        // Re-populate all dropdowns and update calculations
        populateSelect(cameraSelect, devices.cameras, true);
        populateSelect(monitorSelect, devices.monitors, true);
        populateSelect(videoSelect, devices.video, true);
        motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
        controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
        populateSelect(distanceSelect, devices.fiz.distance, true);
        populateSelect(batterySelect, devices.batteries, true);
        applyFilters();
        updateCalculations();

        // Count total devices imported for the alert message
        let deviceCount = 0;
        for (const category in importedData) {
            if (category === "fiz") {
                for (const subcategory in importedData.fiz) {
                    deviceCount += Object.keys(importedData.fiz[subcategory]).length;
                }
            } else {
                deviceCount += Object.keys(importedData[category]).length;
            }
        }
        alert(texts[currentLang].alertImportSuccess.replace("{num_devices}", deviceCount));
        exportOutput.style.display = "block"; // Show the textarea
        exportOutput.value = JSON.stringify(devices, null, 2); // Display the newly imported data
      } else {
        alert(texts[currentLang].alertImportError);
      }
    } catch (error) {
      console.error("Error parsing or importing data:", error);
      alert(texts[currentLang].alertImportError);
    }
  };
  reader.readAsText(file);
  event.target.value = ''; // Clear the file input for re-selection of the same file
});


// --- NEW SETUP MANAGEMENT FUNCTIONS ---

// Export all saved setups to a JSON file
exportSetupsBtn.addEventListener('click', () => {
    const setupsToExport = loadSetups(); // Assuming loadSetups is from storage.js
    if (Object.keys(setupsToExport).length === 0) {
        alert(texts[currentLang].alertNoSetupsToExport);
        return;
    }
    const dataStr = JSON.stringify(setupsToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'camera_power_setups.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});

// Trigger file input when "Import Setups" is clicked
importSetupsBtn.addEventListener('click', () => {
    importSetupsInput.click();
});

// Handle the file import for setups
importSetupsInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedSetups = JSON.parse(e.target.result);
            // Basic validation: must be a non-null object
            if (importedSetups && typeof importedSetups === 'object' && !Array.isArray(importedSetups)) {
                saveSetups(importedSetups); // Save to localStorage (assuming saveSetups is from storage.js)
                populateSetupSelect(); // Refresh dropdown
                alert(texts[currentLang].alertImportSetupsSuccess.replace("{num_setups}", Object.keys(importedSetups).length));
                // Reset form to "-- New Setup --" by clearing selection and
                // triggering the change handler that initializes a new setup
                setupSelect.value = "";
                setupSelect.dispatchEvent(new Event('change'));
            } else {
                throw new Error("Invalid format: not a valid setup object.");
            }
        } catch (error) {
            console.error("Error parsing or importing setups:", error);
            alert(texts[currentLang].alertImportSetupsError);
        }
    };
    reader.readAsText(file);
    event.target.value = ''; // Clear file input
});

// Generate a printable overview of the current selected setup in a new tab
generateOverviewBtn.addEventListener('click', () => {
    if (!setupSelect.value || setupSelect.value === "None") { // Ensure a setup is selected
        alert(texts[currentLang].alertSelectSetupForOverview);
        return;
    }
    generatePrintableOverview();
});

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function generatePrintableOverview() {
    const setupName = setupNameInput.value;
    const now = new Date();
    const dateTimeString = now.toLocaleDateString(currentLang.startsWith('de') ? 'de-DE' : 'en-US') + ' ' + now.toLocaleTimeString();
    const t = texts[currentLang];

    let deviceListHtml = '<ul>';
    const processSelectForOverview = (selectElement, category, subcategory = null) => {
        if (selectElement.value && selectElement.value !== "None") {
            const deviceKey = selectElement.value;
            const deviceName = selectElement.options[selectElement.selectedIndex].text;
            let consumption;
            if (subcategory) {
                consumption = devices[category] &&
                              devices[category][subcategory] &&
                              devices[category][subcategory][deviceKey];
            } else {
                consumption = devices[category] && devices[category][deviceKey];
            }
            const power = typeof consumption === 'object' ? consumption.power : consumption;
            const safeName = escapeHtml(deviceName);
            if (power !== undefined && power !== null) {
                 deviceListHtml += `<li>${safeName} (${power}W)</li>`;
            } else if (category === 'batteries') { // For batteries, just list name and capacity
                const capacity = devices.batteries[deviceKey].capacity;
                deviceListHtml += `<li>${safeName} (${capacity}Wh)</li>`;
            }
        }
    };

    processSelectForOverview(cameraSelect, 'cameras');
    processSelectForOverview(monitorSelect, 'monitors');
    processSelectForOverview(videoSelect, 'video'); // Original data.js uses 'video', not 'wirelessVideo'
    processSelectForOverview(distanceSelect, 'fiz', 'distance');
    motorSelects.forEach(sel => processSelectForOverview(sel, 'fiz', 'motors'));
    controllerSelects.forEach(sel => processSelectForOverview(sel, 'fiz', 'controllers'));
    processSelectForOverview(batterySelect, 'batteries'); // Handle battery separately for capacity
    deviceListHtml += '</ul>';

    const resultsHtml = `
        <p><strong>${t.totalPowerLabel}</strong> ${totalPowerElem.textContent}</p>
        <p><strong>${t.totalCurrent144Label}</strong> ${totalCurrent144Elem.textContent}</p>
        <p><strong>${t.totalCurrent12Label}</strong> ${totalCurrent12Elem.textContent}</p>
        <p><strong>${t.batteryLifeLabel}</strong> ${batteryLifeElem.textContent}</p>
    `;

    // Get current warning messages
    let warningHtml = '';
    // Check if pinWarnElem has content that is not just "OK"
    if (pinWarnElem.textContent.trim() !== '' && !pinWarnElem.textContent.includes("OK")) {
        warningHtml += `<p class="warning">${pinWarnElem.textContent}</p>`;
    }
    // Check if dtapWarnElem has content that is not just "OK"
    if (dtapWarnElem.textContent.trim() !== '' && !dtapWarnElem.textContent.includes("OK")) {
        warningHtml += `<p class="warning">${dtapWarnElem.textContent}</p>`;
    }
    if (warningHtml !== '') {
        warningHtml = `<h2>Warnings</h2>${warningHtml}`;
    }

    // REGENERATE BATTERY TABLE HTML WITH BARS FOR OVERVIEW
    let batteryTableHtml = '';
    const totalWatt = parseFloat(totalPowerElem.textContent); // Get current totalWatt from display

    // Only generate the battery table if a battery is selected, or if there are any batteries to compare
    const hasAnyBattery = Object.keys(devices.batteries).some(key => key !== "None");

    if ((batterySelect.value && batterySelect.value !== "None") || hasAnyBattery) {
        const selectedBatteryName = batterySelect.value;
        let selectedCandidate = null;
        const totalCurrent12 = parseFloat(totalCurrent12Elem.textContent); // Get current totalCurrent12 from display

        if (selectedBatteryName && selectedBatteryName !== "None" && devices.batteries[selectedBatteryName]) {
            const selData = devices.batteries[selectedBatteryName];
            const pinOK_sel = totalCurrent12 <= selData.pinA;
            const dtapOK_sel = totalCurrent12 <= selData.dtapA;
            
            let selHours = 0;
            if (totalWatt === 0) {
                selHours = Infinity; // Represent infinite runtime
            } else {
                selHours = selData.capacity / totalWatt;
            }

            if (pinOK_sel || dtapOK_sel || totalWatt === 0) { // If totalWatt is 0, it's always "OK"
                let selMethod;
                if (totalWatt === 0) selMethod = "infinite"; // Custom method for infinite
                else if (pinOK_sel && dtapOK_sel) selMethod = "both pins and D-Tap";
                else if (pinOK_sel) selMethod = "pins";
                else selMethod = "dtap";
                selectedCandidate = { name: selectedBatteryName, hours: selHours, method: selMethod };
            }
        }

        const pinsCandidates = [];
        const dtapCandidates = [];
        for (let battName in devices.batteries) {
            if (battName === "None") continue;
            // Don't add the selected battery again if it's already a candidate
            if (selectedCandidate && battName === selectedCandidate.name) continue;

            const data = devices.batteries[battName];
            const canPin = totalCurrent12 <= data.pinA;
            const canDTap = totalCurrent12 <= data.dtapA;

            if (totalWatt === 0) { // All batteries have infinite runtime if totalWatt is 0
                pinsCandidates.push({ name: battName, hours: Infinity, method: "infinite" });
            } else if (canPin) {
                const hours = data.capacity / totalWatt;
                const method = (canDTap ? "both pins and D-Tap" : "pins");
                pinsCandidates.push({ name: battName, hours: hours, method: method });
            } else if (canDTap) {
                const hours = data.capacity / totalWatt;
                dtapCandidates.push({ name: battName, hours: hours, method: "dtap" });
            }
        }

        // Sort by runtime (hours) descending within each group
        pinsCandidates.sort((a, b) => b.hours - a.hours);
        dtapCandidates.sort((a, b) => b.hours - a.hours);

        batteryTableHtml = `<h2>${t.batteryComparisonHeading}</h2><table border="1"><tr><th>${t.batteryTableLabel}</th><th>${t.runtimeLabel}</th><th></th></tr>`;

        const allCandidatesForMax = (selectedCandidate ? [selectedCandidate] : []).concat(pinsCandidates, dtapCandidates);
        const finiteHours = allCandidatesForMax.map(c => c.hours).filter(h => h !== Infinity);
        const maxHours = finiteHours.length ? Math.max(...finiteHours) : 1;

        const getBarClass = (method) => {
            if (method === "pins") return "bar bar-pins-only";
            if (method === "infinite") return "bar bar-infinite"; // New class for infinite
            return "bar";
        };

        const getMethodLabel = (method) => {
            return method === "pins" ? "pins only!" : method;
        };

        const getRuntimeDisplay = (hours) => {
            return hours === Infinity ? "∞" : hours.toFixed(2) + "h";
        };

        const getBarWidth = (hours) => {
            if (hours === Infinity) return "100%"; // Infinite runtime always 100% bar
            return ((hours / maxHours) * 100) + "%";
        };

        // Add selected battery first, if it's a valid candidate
        if (selectedCandidate) {
            batteryTableHtml += `<tr class="selectedBatteryRow">
                                    <td>${selectedCandidate.name}</td>
                                    <td>${getRuntimeDisplay(selectedCandidate.hours)} (${getMethodLabel(selectedCandidate.method)})</td>
                                    <td>
                                      <div class="barContainer">
                                        <div class="${getBarClass(selectedCandidate.method)}" style="width: ${getBarWidth(selectedCandidate.hours)};"></div>
                                      </div>
                                    </td>
                                  </tr>`;
        }
        // Add other candidates
        pinsCandidates.forEach(candidate => {
            if (selectedCandidate && candidate.name === selectedCandidate.name) return; // Already added if selected
            batteryTableHtml += `<tr>
                                    <td>${candidate.name}</td>
                                    <td>${getRuntimeDisplay(candidate.hours)} (${getMethodLabel(candidate.method)})</td>
                                    <td>
                                      <div class="barContainer">
                                        <div class="${getBarClass(candidate.method)}" style="width: ${getBarWidth(candidate.hours)};"></div>
                                      </div>
                                    </td>
                                  </tr>`;
        });
        dtapCandidates.forEach(candidate => {
            if (selectedCandidate && candidate.name === selectedCandidate.name) return;
            const alreadyInPins = pinsCandidates.some(p => p.name === candidate.name);
            if (!alreadyInPins) {
                batteryTableHtml += `<tr>
                                        <td>${candidate.name}</td>
                                        <td>${getRuntimeDisplay(candidate.hours)} (${getMethodLabel(candidate.method)})</td>
                                        <td>
                                          <div class="barContainer">
                                            <div class="${getBarClass(candidate.method)}" style="width: ${getBarWidth(candidate.hours)};"></div>
                                          </div>
                                        </td>
                                      </tr>`;
            }
        });
        batteryTableHtml += `</table>`;
    } else {
        batteryTableHtml = ''; // No table if no battery selected
    }
    
    const safeSetupName = escapeHtml(setupName);
    const overviewHtml = `
        <!DOCTYPE html>
        <html lang="${currentLang}">
        <head>
            <meta charset="UTF-8">
            <title>${t.overviewTitle} - ${safeSetupName}</title>
            <style>
                body { font-family: 'Open Sans', sans-serif; margin: 25px; color: #333; font-size: 0.9em; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                h1, h2, h3 { font-family: 'Open Sans', sans-serif; font-weight: 500; color: #001589; }
                h1 { font-size: 1.8em; margin-bottom: 0.2em; }
                h2 { font-size: 1.4em; margin-top: 1.3em; border-bottom: 2px solid #001589; padding-bottom: 5px;}
                h3 { font-size: 1.1em; margin-top: 1em; }
                p { line-height: 1.4em; }
                ul { list-style: none; margin: 5px 0; padding-left: 0; }
                li { margin: 3px 0; }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 5px;
                  table-layout: fixed; /* Crucial for fixed column widths */
                }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 0.9em; overflow: hidden; /* Hide overflowing text */ }
                th { background-color: #f2f2f2; }
                .warning { color: red; font-weight: bold; margin-top: 10px; }
                .print-btn { padding: 10px 20px; font-size: 1em; cursor: pointer; border-radius: 5px; border: 1px solid #ccc; background: #f0f0f0; margin-bottom: 20px; }
                /* Styles for Battery Comparison Bars in Overview */
                .barContainer {
                  width: 100%;
                  background-color: #e0e0e0;
                  border-radius: 3px;
                  overflow: hidden;
                  height: 15px; /* Height of the bar */
                }

                .bar {
                  height: 100%;
                  background-color: #4CAF50; /* Green color for the bar (both) */
                  width: 0%; /* Will be set by JS */
                  border-radius: 3px;
                  /* Removed border */
                  box-sizing: border-box; /* Ensure border doesn't add to width */
                }

                .bar-pins-only {
                  background-color: #FF9800; /* Orange color for pins only */
                }

                .bar-infinite {
                  background-color: #007bff; /* A distinct color for infinite runtime */
                }

                .selectedBatteryRow {
                    background-color: #e6f7ff; /* Light blue background for selected row */
                    font-weight: bold;
                }

                /* Adjusted column widths for the overview table */
                #batteryComparison table th:nth-child(1),
                #batteryComparison table td:nth-child(1) {
                  width: 10%; /* Battery Name */
                }

                #batteryComparison table th:nth-child(2),
                #batteryComparison table td:nth-child(2) {
                  width: 10%; /* Estimated Runtime */
                }

                #batteryComparison table th:nth-child(3),
                #batteryComparison table td:nth-child(3) {
                  width: 80%; /* Bar column, takes more space */
                }
                @media print {
                    .print-btn { display: none; }
                    body { margin: 1cm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    /* Styles for Battery Comparison Bars in Overview for Print */
                    .barContainer {
                      width: 100%;
                      background-color: #e0e0e0 !important; /* Explicitly set for print */
                      border-radius: 3px;
                      overflow: hidden;
                      height: 15px; /* Height of the bar */
                    }

                    .bar {
                      height: 100%;
                      background-color: #4CAF50 !important; /* Green color for the bar (both) */
                      /* REMOVED width: 0% !important; */
                      border-radius: 3px;
                      /* Removed border */
                      box-sizing: border-box; /* Ensure border doesn't add to width */
                    }

                    .bar-pins-only {
                      background-color: #FF9800 !important; /* Orange color for pins only */
                    }

                    .bar-infinite {
                      background-color: #007bff !important; /* A distinct color for infinite runtime */
                    }

                    .selectedBatteryRow {
                        background-color: #e6f7ff !important; /* Light blue background for selected row */
                        font-weight: bold;
                    }

                    /* Adjusted column widths for the overview table */
                    #batteryComparison table th:nth-child(1),
                    #batteryComparison table td:nth-child(1) {
                      width: 10%; /* Battery Name */
                    }

                    #batteryComparison table th:nth-child(2),
                    #batteryComparison table td:nth-child(2) {
                      width: 10%; /* Estimated Runtime */
                    }

                    #batteryComparison table th:nth-child(3),
                    #batteryComparison table td:nth-child(3) {
                      width: 80%; /* Bar column, takes more space */
                    }
                }
            </style>
        </head>
        <body>
            <button onclick="window.print()" class="print-btn">Print</button>
            <h1>${t.overviewTitle}</h1>
            <p><strong>${t.setupNameLabel}</strong> ${safeSetupName}</p>
            <p><em>Generated on: ${dateTimeString}</em></p>
            
            <h2>${t.deviceSelectionHeading}</h2>
            ${deviceListHtml}
            
            <h2>${t.resultsHeading}</h2>
            ${resultsHtml}
            ${warningHtml}
            
            ${batteryTableHtml}
        </body>
        </html>
    `;

    const overviewWindow = window.open('', '_blank');
    overviewWindow.document.write(overviewHtml);
    overviewWindow.document.close();
}


// --- EVENT LISTENERS FÜR NEUBERECHNUNG ---

// Sicherstellen, dass Änderungen an den Selects auch neu berechnen
[cameraSelect, monitorSelect, videoSelect, distanceSelect, batterySelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", updateCalculations); });

motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", updateCalculations); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", updateCalculations); });

// Dark mode handling
function applyDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.textContent = "☀";
  } else {
    document.body.classList.remove("dark-mode");
    if (darkModeToggle) darkModeToggle.textContent = "☾";
  }
}

let darkModeEnabled = false;
try {
  darkModeEnabled = localStorage.getItem("darkMode") === "true";
} catch (e) {
  console.warn("Could not load dark mode preference", e);
}
applyDarkMode(darkModeEnabled);

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    darkModeEnabled = !document.body.classList.contains("dark-mode");
    applyDarkMode(darkModeEnabled);
    try {
      localStorage.setItem("darkMode", darkModeEnabled);
    } catch (e) {
      console.warn("Could not save dark mode preference", e);
    }
  });
}

// Initial calculation and language set after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang);
  updateCalculations();
});

// Export functions for testing in Node environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = { setLanguage, updateCalculations };
}
