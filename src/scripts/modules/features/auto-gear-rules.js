/* global cineModuleBase */

(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return {};
  }

  const GLOBAL_SCOPE = detectGlobalScope();

  function resolveModuleBase(scope) {
    if (typeof cineModuleBase === 'object' && cineModuleBase) {
      return cineModuleBase;
    }

    if (typeof require === 'function') {
      try {
        const required = require('../base.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (scope && typeof scope.cineModuleBase === 'object') {
      return scope.cineModuleBase;
    }

    return null;
  }

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }

  const freezeDeep = typeof MODULE_BASE.freezeDeep === 'function'
    ? MODULE_BASE.freezeDeep
    : function fallbackFreezeDeep(value) {
        if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
          return value;
        }
        const seen = new WeakSet();
        function freeze(target) {
          if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
            return target;
          }
          if (seen.has(target)) {
            return target;
          }
          seen.add(target);
          try {
            const keys = Object.getOwnPropertyNames(target);
            for (let index = 0; index < keys.length; index += 1) {
              const key = keys[index];
              const descriptor = Object.getOwnPropertyDescriptor(target, key);
              if (!descriptor || descriptor.get || descriptor.set) {
                continue;
              }
              freeze(descriptor.value);
            }
            Object.freeze(target);
          } catch (error) {
            void error;
          }
          return target;
        }
        return freeze(value);
      };

  const exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function'
    ? function expose(name, value, options) {
        return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options || {});
      }
    : function fallbackExpose(name, value) {
        try {
          GLOBAL_SCOPE[name] = value;
          return true;
        } catch (error) {
          void error;
          return false;
        }
      };

  const moduleRegistry = typeof MODULE_BASE.getModuleRegistry === 'function'
    ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE)
    : null;

  const registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function'
    ? function register(name, api, options, onError) {
        return MODULE_BASE.registerOrQueueModule(
          name,
          api,
          options,
          onError,
          GLOBAL_SCOPE,
          moduleRegistry,
        );
      }
    : function fallbackRegister() {
        return false;
      };

  let factoryAutoGearRulesSnapshot = null;
  let factoryAutoGearSeedContext = null;

function cloneAutoGearItems(items) {
  return items
    .map(item => {
      const normalized = normalizeAutoGearItem(item);
      if (!normalized) return null;
      return { ...normalized };
    })
    .filter(Boolean);
}

function cloneAutoGearRuleItem(item) {
  if (!item || typeof item !== 'object') {
    return {
      id: '',
      name: '',
      category: '',
      quantity: 0,
      screenSize: '',
      selectorType: 'none',
      selectorDefault: '',
      selectorEnabled: false,
      notes: '',
      contextNotes: [],
    };
  }
  return {
    id: typeof item.id === 'string' ? item.id : '',
    name: typeof item.name === 'string' ? item.name : '',
    category: typeof item.category === 'string' ? item.category : '',
    quantity: normalizeAutoGearQuantity(item.quantity),
    screenSize: typeof item.screenSize === 'string' ? item.screenSize : '',
    selectorType: typeof item.selectorType === 'string' ? item.selectorType : 'none',
    selectorDefault: typeof item.selectorDefault === 'string' ? item.selectorDefault : '',
    selectorEnabled: !!item.selectorEnabled,
    notes: typeof item.notes === 'string' ? item.notes : '',
    contextNotes: Array.isArray(item.contextNotes) ? item.contextNotes.filter(Boolean) : [],
  };
}

function cloneAutoGearRule(rule) {
  if (!rule || typeof rule !== 'object') return null;
  return {
    id: typeof rule.id === 'string' ? rule.id : '',
    label: typeof rule.label === 'string' ? rule.label : '',
    always: Boolean(rule.always),
    scenarios: Array.isArray(rule.scenarios) ? rule.scenarios.slice() : [],
    mattebox: Array.isArray(rule.mattebox) ? rule.mattebox.slice() : [],
    cameraHandle: Array.isArray(rule.cameraHandle) ? rule.cameraHandle.slice() : [],
    viewfinderExtension: Array.isArray(rule.viewfinderExtension)
      ? rule.viewfinderExtension.slice()
      : [],
    videoDistribution: Array.isArray(rule.videoDistribution)
      ? rule.videoDistribution.slice()
      : [],
    camera: Array.isArray(rule.camera) ? rule.camera.slice() : [],
    monitor: Array.isArray(rule.monitor) ? rule.monitor.slice() : [],
    tripodHeadBrand: Array.isArray(rule.tripodHeadBrand) ? rule.tripodHeadBrand.slice() : [],
    tripodBowl: Array.isArray(rule.tripodBowl) ? rule.tripodBowl.slice() : [],
    tripodTypes: Array.isArray(rule.tripodTypes) ? rule.tripodTypes.slice() : [],
    tripodSpreader: Array.isArray(rule.tripodSpreader) ? rule.tripodSpreader.slice() : [],
    crewPresent: Array.isArray(rule.crewPresent) ? rule.crewPresent.slice() : [],
    crewAbsent: Array.isArray(rule.crewAbsent) ? rule.crewAbsent.slice() : [],
    wireless: Array.isArray(rule.wireless) ? rule.wireless.slice() : [],
    motors: Array.isArray(rule.motors) ? rule.motors.slice() : [],
    controllers: Array.isArray(rule.controllers) ? rule.controllers.slice() : [],
    distance: Array.isArray(rule.distance) ? rule.distance.slice() : [],
    shootingDays: normalizeAutoGearShootingDaysCondition(rule.shootingDays),
    add: Array.isArray(rule.add) ? rule.add.map(cloneAutoGearRuleItem) : [],
    remove: Array.isArray(rule.remove) ? rule.remove.map(cloneAutoGearRuleItem) : [],
  };
}

function cloneAutoGearRules(rules) {
  return Array.isArray(rules)
    ? rules.map(cloneAutoGearRule).filter(Boolean)
    : [];
}

function setFactoryAutoGearRulesSnapshot(rules) {
  if (!Array.isArray(rules)) {
    factoryAutoGearRulesSnapshot = null;
    return;
  }
  factoryAutoGearRulesSnapshot = cloneAutoGearRules(rules);
}

function subtractScenarioContributions(diff, scenarioKeys, scenarioDiffMap) {
  const adjust = (items, type) => items
    .map(item => {
      let remaining = normalizeAutoGearQuantity(item.quantity);
      scenarioKeys.forEach(key => {
        const scenarioDiff = scenarioDiffMap.get(key);
        if (!scenarioDiff) return;
        const match = scenarioDiff[type].find(entry => entry.name === item.name && entry.category === item.category);
        if (match) {
          remaining -= normalizeAutoGearQuantity(match.quantity);
        }
      });
      remaining = Math.max(remaining, 0);
      if (remaining <= 0) return null;
      const normalized = normalizeAutoGearItem(item);
      if (!normalized) return null;
      return { ...normalized, quantity: remaining };
    })
    .filter(Boolean);
  return { add: adjust(diff.add, 'add'), remove: adjust(diff.remove, 'remove') };
}

function extractAutoGearSelections(value) {
  if (typeof value !== 'string') return [];
  return value
    .split(',')
    .map(part => part.trim())
    .filter(Boolean);
}

function buildCameraHandleAutoRules(baseInfo, baselineMap) {
  if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
    return [];
  }

  const selections = extractAutoGearSelections(baseInfo && baseInfo.cameraHandle);
  const selectionSet = new Set(selections);
  const optionValues = [];

  if (typeof document !== 'undefined') {
    const handleSelect = document.getElementById('cameraHandle');
    if (handleSelect) {
      Array.from(handleSelect.options || []).forEach(option => {
        const value = typeof option.value === 'string' ? option.value.trim() : '';
        if (value) optionValues.push(value);
      });
    }
  }

  const candidates = Array.from(new Set(
    selections
      .concat(optionValues)
      .map(value => (typeof value === 'string' ? value.trim() : ''))
      .filter(Boolean)
  ));

  if (!candidates.length) return [];

  const rules = [];

  candidates.forEach(candidate => {
    const trimmed = candidate.trim();
    if (!trimmed) return;

    let variantHandles;
    let diff;

    if (selectionSet.has(trimmed)) {
      variantHandles = selections.filter(value => value !== trimmed);
      const variantInfo = { ...baseInfo, cameraHandle: variantHandles.join(', ') };
      const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
      const variantMap = parseGearTableForAutoRules(variantHtml);
      if (!variantMap) return;
      diff = diffGearTableMaps(variantMap, baselineMap);
    } else {
      variantHandles = selections.slice();
      variantHandles.push(trimmed);
      const variantInfo = { ...baseInfo, cameraHandle: variantHandles.join(', ') };
      const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
      const variantMap = parseGearTableForAutoRules(variantHtml);
      if (!variantMap) return;
      diff = diffGearTableMaps(baselineMap, variantMap);
    }

    if (!diff || (!diff.add.length && !diff.remove.length)) return;

    const additions = cloneAutoGearItems(diff.add);
    if (!additions.length) return;
    const removals = cloneAutoGearItems(diff.remove);

    rules.push({
      id: generateAutoGearId('rule'),
      label: trimmed,
      scenarios: [],
      mattebox: [],
      cameraHandle: [trimmed],
      viewfinderExtension: [],
      videoDistribution: [],
      add: additions,
      remove: removals,
    });
  });

  return rules;
}

function buildViewfinderExtensionAutoRules(baseInfo, baselineMap) {
  if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
    return [];
  }

  const selections = extractAutoGearSelections(baseInfo && baseInfo.viewfinderExtension);
  if (!selections.length) return [];

  const uniqueSelections = Array.from(new Set(selections));
  const rules = [];

  uniqueSelections.forEach(selection => {
    const trimmed = selection.trim();
    if (!trimmed) return;

    const remainingSelections = selections.filter(value => value !== trimmed);
    const variantInfo = { ...baseInfo, viewfinderExtension: remainingSelections.join(', ') };
    const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
    const variantMap = parseGearTableForAutoRules(variantHtml);
    if (!variantMap) return;

    const diff = diffGearTableMaps(variantMap, baselineMap);
    if (!diff.add.length && !diff.remove.length) return;

    const additions = cloneAutoGearItems(diff.add);
    if (!additions.length) return;
    const removals = cloneAutoGearItems(diff.remove);

    rules.push({
      id: generateAutoGearId('rule'),
      label: getViewfinderFallbackLabel(trimmed),
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [trimmed],
      videoDistribution: [],
      add: additions,
      remove: removals,
    });
  });

  return rules;
}

function buildVideoDistributionAutoRules(baseInfo, baselineMap) {
  if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
    return [];
  }

  const selections = extractAutoGearSelections(baseInfo && baseInfo.videoDistribution);
  if (!selections.length) return [];

  const uniqueSelections = Array.from(new Set(selections));
  const rules = [];

  uniqueSelections.forEach(selection => {
    const trimmed = selection.trim();
    if (!trimmed) return;
    const lower = trimmed.toLowerCase();
    if (lower === '__none__' || lower === 'none') return;

    const remainingSelections = selections.filter(value => value !== trimmed);
    const variantInfo = { ...baseInfo, videoDistribution: remainingSelections.join(', ') };
    const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
    const variantMap = parseGearTableForAutoRules(variantHtml);
    if (!variantMap) return;

    const diff = diffGearTableMaps(variantMap, baselineMap);
    if (!diff.add.length && !diff.remove.length) return;

    const additions = cloneAutoGearItems(diff.add);
    if (!additions.length) return;
    const removals = cloneAutoGearItems(diff.remove);

    rules.push({
      id: generateAutoGearId('rule'),
      label: getVideoDistributionFallbackLabel(trimmed),
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      videoDistribution: [trimmed],
      add: additions,
      remove: removals,
    });
  });

  return rules;
}

function buildOnboardMonitorRiggingAutoGearRules() {
  const select = typeof monitorSelect !== 'undefined' ? monitorSelect : null;
  if (!select || !select.options) {
    return [];
  }

  const monitorLabels = [];
  const seen = new Set();

  Array.from(select.options).forEach(option => {
    if (!option) return;
    const rawValue = typeof option.value === 'string' ? option.value.trim() : '';
    if (!rawValue || rawValue === 'None') return;
    const label = typeof option.textContent === 'string' ? option.textContent.trim() : '';
    if (!label) return;
    const normalized = normalizeAutoGearTriggerValue(label);
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    monitorLabels.push(label);
  });

  if (!monitorLabels.length) {
    return [];
  }

  const monitorLabelText = (typeof texts === 'object' && texts)
    ? ((texts[currentLang] && texts[currentLang].autoGearMonitorLabel)
      || (texts.en && texts.en.autoGearMonitorLabel)
      || 'Onboard monitors')
    : 'Onboard monitors';
  const contextNote = monitorLabelText;

  return [
    {
      id: generateAutoGearId('rule'),
      label: monitorLabelText,
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      videoDistribution: [],
      camera: [],
      monitor: monitorLabels.slice(),
      crewPresent: [],
      crewAbsent: [],
      wireless: [],
      motors: [],
      controllers: [],
      distance: [],
      add: [
        {
          id: generateAutoGearId('item'),
          name: 'ULCS Arm mit 3/8" und 1/4" double',
          category: 'Rigging',
          quantity: 1,
          contextNotes: [contextNote],
        },
      ],
      remove: [],
    },
  ];
}

function buildTripodPreferenceAutoGearRules(baseInfo = {}) {
  const brand = typeof baseInfo.tripodHeadBrand === 'string' ? baseInfo.tripodHeadBrand.trim() : '';
  const bowl = typeof baseInfo.tripodBowl === 'string' ? baseInfo.tripodBowl.trim() : '';
  if (!brand || !bowl) return [];

  const normalizedBrand = normalizeAutoGearTriggerValue(brand);
  const normalizedBowl = normalizeAutoGearTriggerValue(bowl);
  if (!normalizedBrand || !normalizedBowl) return [];

  const combos = [
    {
      brand: "O'Connor",
      entries: [
        { bowl: '100mm bowl', item: "O'Connor Ultimate 1040 Fluid-Head 100mm bowl" },
        { bowl: '150mm bowl', item: "O'Connor Ultimate 2560 Fluid-Head 150mm bowl" },
        { bowl: 'Mitchell Mount', item: "O'Connor Ultimate 2560 Fluid-Head Mitchell Mount" },
      ],
    },
    {
      brand: 'Sachtler',
      entries: [
        { bowl: '75mm bowl', item: 'Sachtler aktiv8 head 75mm bowl' },
        { bowl: '100mm bowl', item: 'Sachtler aktiv18T head 100mm bowl' },
        { bowl: '150mm bowl', item: 'Sachtler Cine 30 head 150mm bowl' },
        { bowl: 'Mitchell Mount', item: 'Sachtler Cine 30 head Mitchell mount' },
      ],
    },
  ];

  const matchedBrand = combos.find(entry => normalizeAutoGearTriggerValue(entry.brand) === normalizedBrand);
  if (!matchedBrand) return [];

  const matchingEntries = matchedBrand.entries.filter(entry => {
    return normalizeAutoGearTriggerValue(entry.bowl) === normalizedBowl;
  });
  if (!matchingEntries.length) return [];

  return matchingEntries.map(entry => {
    const itemName = entry.item;
    const contextNotes = ['Tripod preferences'];
    return {
      id: generateAutoGearId('rule'),
      label: `Tripod head: ${itemName}`,
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      deliveryResolution: [],
      videoDistribution: [],
      camera: [],
      cameraWeight: null,
      monitor: [],
      tripodHeadBrand: [matchedBrand.brand],
      tripodBowl: [entry.bowl],
      tripodTypes: [],
      tripodSpreader: [],
      crewPresent: [],
      crewAbsent: [],
      wireless: [],
      motors: [],
      controllers: [],
      distance: [],
      shootingDays: null,
      add: [{
        id: generateAutoGearId('item'),
        name: itemName,
        category: 'Grip',
        quantity: 1,
        screenSize: '',
        selectorType: 'tripodHeadBrand',
        selectorDefault: itemName,
        selectorEnabled: true,
        notes: '',
        contextNotes,
      }],
      remove: [],
    };
  });
}

function buildDefaultVideoDistributionAutoGearRules(baseInfo = {}) {
  if (typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
    return [];
  }

  const select = document.getElementById('videoDistribution');
  if (!select) return [];

  const optionValues = [];
  const seen = new Set();
  Array.from(select.options || []).forEach(option => {
    if (!option) return;
    const rawValue = typeof option.value === 'string' ? option.value.trim() : '';
    const normalized = normalizeVideoDistributionOptionValue(rawValue);
    if (!normalized || normalized === '__none__') return;
    if (seen.has(normalized)) return;
    seen.add(normalized);
    optionValues.push(rawValue);
  });

  if (!optionValues.length) return [];

  const baseProjectInfo = { ...(baseInfo || {}) };
  delete baseProjectInfo.videoDistribution;
  const emptyHtml = generateGearListHtml({ ...baseProjectInfo, requiredScenarios: '' });
  const emptyMap = parseGearTableForAutoRules(emptyHtml);
  if (!emptyMap) return [];

  const generatedRules = [];
  const handledTriggers = new Set();

  optionValues.forEach(rawValue => {
    const trimmed = typeof rawValue === 'string' ? rawValue.trim() : '';
    if (!trimmed) return;
    const normalized = normalizeVideoDistributionOptionValue(trimmed);
    if (!normalized || handledTriggers.has(normalized)) return;
    handledTriggers.add(normalized);

    const infoForSelection = { ...(baseInfo || {}), videoDistribution: trimmed };
    const selectionHtml = generateGearListHtml({ ...infoForSelection, requiredScenarios: '' });
    const selectionMap = parseGearTableForAutoRules(selectionHtml);
    if (!selectionMap) return;

    const diff = diffGearTableMaps(emptyMap, selectionMap);
    const additions = cloneAutoGearItems(diff.add);
    const removals = cloneAutoGearItems(diff.remove);
    if (!additions.length && !removals.length) return;

    generatedRules.push({
      id: generateAutoGearId('rule'),
      label: getVideoDistributionFallbackLabel(trimmed),
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      videoDistribution: [trimmed],
      add: additions,
      remove: removals,
    });
  });

  const hasIosOption = optionValues.some(value => value && value.toLowerCase() === 'ios video');
  if (hasIosOption) {
    const iosLabel = optionValues.find(value => value && value.toLowerCase() === 'ios video') || 'IOS Video';
    const normalizedIos = normalizeAutoGearTriggerValue(iosLabel);
    const hasGeneratedIosRule = generatedRules.some(rule =>
      Array.isArray(rule.videoDistribution)
        && rule.videoDistribution.some(value => normalizeAutoGearTriggerValue(value) === normalizedIos)
    );
    if (!hasGeneratedIosRule) {
      const createdNames = new Set();
      const createItem = (name, category, quantity = 1) => {
        if (!name || !category || quantity <= 0) return null;
        const key = `${name}|${category}`;
        if (createdNames.has(key)) return null;
        createdNames.add(key);
        return {
          id: generateAutoGearId('item'),
          name,
          category,
          quantity,
          screenSize: '',
          selectorType: 'none',
          selectorDefault: '',
          selectorEnabled: false,
          notes: '',
        };
      };

      const additions = [];
      const iosDevices = devices && typeof devices === 'object' ? devices.iosVideo : null;
      if (iosDevices && typeof iosDevices === 'object') {
        Object.keys(iosDevices).forEach(deviceName => {
          const item = createItem(deviceName, 'Monitoring');
          if (item) additions.push(item);
        });
      }

      if (!additions.length) {
        const fallback = createItem('Teradek - Link AX WifiRouter/Access Point', 'Monitoring');
        if (fallback) additions.push(fallback);
      }

      const pushSupport = (name, category, quantity = 1) => {
        const item = createItem(name, category, quantity);
        if (item) additions.push(item);
      };

      pushSupport('Apple iPad Air 5 or better', 'Monitoring', 1);
      pushSupport('USB-C Charger (iOS Video)', 'Monitoring support', 2);
      pushSupport('Wi-Fi Router (iOS Video Village)', 'Monitoring support');

      if (additions.length) {
        generatedRules.push({
          id: generateAutoGearId('rule'),
          label: getVideoDistributionFallbackLabel(iosLabel),
          scenarios: [],
          mattebox: [],
          cameraHandle: [],
          viewfinderExtension: [],
          videoDistribution: [iosLabel],
          add: additions,
          remove: [],
        });
      }
    }
  }

  return generatedRules;
}

function buildDefaultMatteboxAutoGearRules() {
  const category = 'Matte box + filter';
  const createItems = names => names.map(name => ({
    id: generateAutoGearId('item'),
    name,
    category,
    quantity: 1,
  }));
  return [
    {
      id: generateAutoGearId('rule'),
      label: 'Mattebox: Swing Away',
      scenarios: [],
      mattebox: ['Swing Away'],
      add: createItems([
        'ARRI LMB 4x5 Pro Set',
        'ARRI LMB 19mm Studio Rod Adapter',
        'ARRI LMB 4x5 / LMB-6 Tray Catcher',
      ]),
      remove: [],
    },
    {
      id: generateAutoGearId('rule'),
      label: 'Mattebox: Rod based',
      scenarios: [],
      mattebox: ['Rod based'],
      add: createItems([
        'ARRI LMB 4x5 15mm LWS Set 3-Stage',
        'ARRI LMB 19mm Studio Rod Adapter',
        'ARRI LMB 4x5 / LMB-6 Tray Catcher',
        'ARRI LMB 4x5 Side Flags',
        'ARRI LMB Flag Holders',
        'ARRI LMB 4x5 Set of Mattes spherical',
        'ARRI LMB Accessory Adapter',
        'ARRI Anti-Reflection Frame 4x5.65',
      ]),
      remove: [],
    },
    {
      id: generateAutoGearId('rule'),
      label: 'Mattebox: Clamp On',
      scenarios: [],
      mattebox: ['Clamp On'],
      add: createItems([
        'ARRI LMB 4x5 Clamp-On (3-Stage)',
        'ARRI LMB 4x5 / LMB-6 Tray Catcher',
        'ARRI LMB 4x5 Side Flags',
        'ARRI LMB Flag Holders',
        'ARRI LMB 4x5 Set of Mattes spherical',
        'ARRI LMB Accessory Adapter',
        'ARRI Anti-Reflection Frame 4x5.65',
        'ARRI LMB 4x5 Clamp Adapter Set Pro',
      ]),
      remove: [],
    }
  ];
}

function buildAutoGearAnyMotorRule() {
  if (typeof captureSetupSelectValues !== 'function') return null;
  const setupValues = captureSetupSelectValues();
  const selectedMotors = Array.isArray(setupValues?.motors)
    ? setupValues.motors.filter(value => typeof value === 'string' && value && value !== 'None')
    : [];
  if (!selectedMotors.length) return null;

  const createItem = (name, category, quantity = 1) => {
    if (!name || !category || quantity <= 0) return null;
    return {
      id: generateAutoGearId('item'),
      name,
      category,
      quantity,
      screenSize: '',
      selectorType: 'none',
      selectorDefault: '',
      selectorEnabled: false,
      notes: '',
    };
  };

  const additions = [];
  const pushItem = (name, category, quantity = 1) => {
    const item = createItem(name, category, quantity);
    if (item) additions.push(item);
  };

  pushItem('Avenger C-Stand Sliding Leg 20" (Focus)', 'Grip');
  pushItem('Steelfingers Wheel C-Stand 3er Set (Focus)', 'Grip');
  pushItem('Lite-Tite Swivel Aluminium Umbrella Adapter (Focus)', 'Grip');
  pushItem('Tennis ball', 'Grip', 3);
  pushItem('D-Tap to Mini XLR 3-pin Cable 0,3m (Focus)', 'Monitoring support', 2);
  pushItem('Ultraslim BNC Cable 0.3 m (Focus)', 'Monitoring support', 2);
  pushItem('Bebob V150micro (V-Mount) (Focus)', 'Monitoring Batteries', 3);

  if (!additions.length) return null;

  return {
    id: generateAutoGearId('rule'),
    label: 'FIZ motor support kit',
    scenarios: [],
    mattebox: [],
    cameraHandle: [],
    viewfinderExtension: [],
    deliveryResolution: [],
    videoDistribution: [],
    camera: [],
    monitor: [],
    crewPresent: [],
    crewAbsent: [],
    wireless: [],
    motors: [AUTO_GEAR_ANY_MOTOR_TOKEN],
    controllers: [],
    distance: [],
    add: additions,
    remove: [],
  };
}

function buildAlwaysAutoGearRule() {
  const createItem = (name, category, quantity = 1, options = {}) => {
    if (!name || !category || quantity <= 0) return null;
    return {
      id: generateAutoGearId('item'),
      name,
      category,
      quantity,
      screenSize: typeof options.screenSize === 'string' ? options.screenSize : '',
      selectorType: typeof options.selectorType === 'string' ? options.selectorType : 'none',
      selectorDefault: typeof options.selectorDefault === 'string' ? options.selectorDefault : '',
      selectorEnabled: options.selectorEnabled === true,
      notes: typeof options.notes === 'string' ? options.notes : '',
    };
  };
  const additions = [];
  const pushItem = (name, category, quantity, options) => {
    const item = createItem(name, category, quantity, options);
    if (item) additions.push(item);
  };
  [
    ['BNC Cable 0.5 m', 'Monitoring support', 1],
    ['BNC Cable 1 m', 'Monitoring support', 1],
    ['BNC Cable 5 m', 'Monitoring support', 1],
    ['BNC Cable 10 m', 'Monitoring support', 1],
    ['BNC Drum 25 m', 'Monitoring support', 1],
    ['ULCS Bracket with 1/4" to 1/4"', 'Rigging', 2],
    ['ULCS Bracket with 3/8" to 1/4"', 'Rigging', 2],
    ['Noga Arm', 'Rigging', 2],
    ['Mini Magic Arm', 'Rigging', 2],
    ['Cine Quick Release', 'Rigging', 4],
    ['SmallRig - Super lightweight 15mm RailBlock', 'Rigging', 1],
    ['Spigot with male 3/8" and 1/4"', 'Rigging', 3],
    ['Clapper Stick', 'Rigging', 2],
    ['D-Tap Splitter', 'Rigging', 2],
    ['Magliner Senior - with quick release mount + tripod holder + utility tray + O‘Connor-Aufhängung', 'Carts and Transportation', 1],
    ['Securing Straps (25mm wide)', 'Carts and Transportation', 10],
    ['Loading Ramp (pair, 420kg)', 'Carts and Transportation', 1],
    ['Ring Fitting for Airline Rails', 'Carts and Transportation', 20],
    ['Power Cable Drum 25-50 m', 'Power', 1],
    ['Power Cable 10 m', 'Power', 2],
    ['Power Cable 5 m', 'Power', 2],
    ['Power Strip', 'Power', 3],
    ['Power Three Way Splitter', 'Power', 3],
    ['PRCD-S (Portable Residual Current Device-Safety)', 'Power', 3],
  ].forEach(([name, category, quantity]) => pushItem(name, category, quantity));

  if (!additions.length) return null;

  return {
    id: generateAutoGearId('rule'),
    label: 'Always',
    always: true,
    scenarios: [],
    mattebox: [],
    cameraHandle: [],
    viewfinderExtension: [],
    videoDistribution: [],
    camera: [],
    monitor: [],
    wireless: [],
    motors: [],
    controllers: [],
    distance: [],
    add: additions,
    remove: [],
  };
}

function buildFiveDayConsumablesAutoGearRule() {
  const createItem = (name, category, quantity = 1, options = {}) => {
    if (!name || !category || quantity <= 0) return null;
    return {
      id: generateAutoGearId('item'),
      name,
      category,
      quantity,
      screenSize: typeof options.screenSize === 'string' ? options.screenSize : '',
      selectorType: typeof options.selectorType === 'string' ? options.selectorType : 'none',
      selectorDefault: typeof options.selectorDefault === 'string' ? options.selectorDefault : '',
      selectorEnabled: options.selectorEnabled === true,
      notes: typeof options.notes === 'string' ? options.notes : '',
    };
  };

  const additions = [];
  const pushItem = (name, category, quantity, options) => {
    const item = createItem(name, category, quantity, options);
    if (item) additions.push(item);
  };

  pushItem('Bluestar eye leather made of microfiber oval, large', 'Consumables', 4);
  pushItem('Pro Gaff Tape', 'Consumables', 2, { notes: 'Primary color roll' });
  pushItem('Pro Gaff Tape', 'Consumables', 2, { notes: 'Secondary color roll' });
  pushItem('Clapper Stick', 'Rigging', 4);
  pushItem('Kimtech Wipes', 'Consumables', 2);
  pushItem('Sprigs Red 1/4"', 'Consumables', 1);

  if (!additions.length) return null;

  return {
    id: generateAutoGearId('rule'),
    label: 'Every 5 shooting days',
    scenarios: [],
    mattebox: [],
    cameraHandle: [],
    viewfinderExtension: [],
    deliveryResolution: [],
    videoDistribution: [],
    camera: [],
    monitor: [],
    crewPresent: [],
    crewAbsent: [],
    wireless: [],
    motors: [],
    controllers: [],
    distance: [],
    shootingDays: { mode: 'every', value: 5 },
    add: additions,
    remove: [],
  };
}

function ensureDefaultMatteboxAutoGearRules() {
  const defaults = buildDefaultMatteboxAutoGearRules();
  if (!defaults.length) return false;
  const existingKeys = new Set(
    autoGearRules
      .map(autoGearRuleMatteboxKey)
      .filter(Boolean)
  );
  const additions = defaults.filter(rule => {
    const key = autoGearRuleMatteboxKey(rule);
    if (!key) return false;
    if (existingKeys.has(key)) return false;
    existingKeys.add(key);
    return true;
  });
  if (!additions.length) return false;
  setAutoGearRules(autoGearRules.concat(additions));
  return true;
}

function captureSetupSelectValues() {
  const captureList = list => list.map(sel => (sel && typeof sel.value === 'string') ? sel.value : '');
  const captured = {
    camera: cameraSelect && typeof cameraSelect.value === 'string' ? cameraSelect.value : '',
    monitor: monitorSelect && typeof monitorSelect.value === 'string' ? monitorSelect.value : '',
    video: videoSelect && typeof videoSelect.value === 'string' ? videoSelect.value : '',
    cage: cageSelect && typeof cageSelect.value === 'string' ? cageSelect.value : '',
    distance: distanceSelect && typeof distanceSelect.value === 'string' ? distanceSelect.value : '',
    battery: batterySelect && typeof batterySelect.value === 'string' ? batterySelect.value : '',
    batteryPlate: batteryPlateSelect && typeof batteryPlateSelect.value === 'string'
      ? batteryPlateSelect.value
      : '',
    hotswap: hotswapSelect && typeof hotswapSelect.value === 'string' ? hotswapSelect.value : '',
    motors: captureList(motorSelects),
    controllers: captureList(controllerSelects),
    sliderBowl: typeof getSliderBowlValue === 'function' ? getSliderBowlValue() : '',
    easyrig: typeof getEasyrigValue === 'function' ? getEasyrigValue() : '',
  };
  return finalizeCapturedSetupValues(captured);
}

function finalizeCapturedSetupValues(values) {
  if (!values || typeof values !== 'object') {
    return values;
  }
  values.batteryPlate = normalizeBatteryPlateValue(values.batteryPlate, values.battery);
  return values;
}

function applySetupSelectValues(values) {
  if (!values || typeof values !== 'object') return;
  if (cameraSelect) {
    setSelectValue(cameraSelect, values.camera);
    if (typeof updateBatteryPlateVisibility === 'function') {
      updateBatteryPlateVisibility();
    }
    if (typeof updateBatteryOptions === 'function') {
      updateBatteryOptions();
    }
  }
  if (batteryPlateSelect) setSelectValue(batteryPlateSelect, values.batteryPlate);
  if (values && typeof values.battery === 'string') {
    applyBatteryPlateSelectionFromBattery(values.battery, batteryPlateSelect ? batteryPlateSelect.value : '');
  }
  if (monitorSelect) setSelectValue(monitorSelect, values.monitor);
  if (videoSelect) setSelectValue(videoSelect, values.video);
  if (cageSelect) setSelectValue(cageSelect, values.cage);
  if (distanceSelect) setSelectValue(distanceSelect, values.distance);
  if (Array.isArray(values.motors)) {
    values.motors.forEach((val, index) => {
      if (motorSelects[index]) setSelectValue(motorSelects[index], val);
    });
  }
  if (Array.isArray(values.controllers)) {
    values.controllers.forEach((val, index) => {
      if (controllerSelects[index]) setSelectValue(controllerSelects[index], val);
    });
  }
  if (batterySelect) setSelectValue(batterySelect, values.battery);
  if (hotswapSelect) setSelectValue(hotswapSelect, values.hotswap);
  if (typeof setSliderBowlValue === 'function') setSliderBowlValue(values.sliderBowl);
  if (typeof setEasyrigValue === 'function') setEasyrigValue(values.easyrig);
}

function captureAutoGearSeedContext() {
  if (factoryAutoGearSeedContext) return;
  if (typeof collectProjectFormData !== 'function') return;
  const baseInfo = collectProjectFormData() || {};
  let projectDataClone;
  try {
    projectDataClone = JSON.parse(JSON.stringify(baseInfo));
  } catch (cloneError) {
    void cloneError;
    projectDataClone = { ...baseInfo };
  }
  const scenarioValues = requiredScenariosSelect
    ? Array.from(requiredScenariosSelect.options || [])
        .map(opt => opt && typeof opt.value === 'string' ? opt.value : '')
        .filter(value => value)
    : [];
  factoryAutoGearSeedContext = {
    projectFormData: projectDataClone,
    scenarioValues,
    setupValues: captureSetupSelectValues(),
  };
}

function buildAutoGearRulesFromBaseInfo(baseInfo, scenarioValues) {
  const rules = [];
  const canGenerateRules = typeof generateGearListHtml === 'function'
    && typeof parseGearTableForAutoRules === 'function';
  const scenarios = Array.isArray(scenarioValues)
    ? scenarioValues.filter(value => typeof value === 'string' && value)
    : [];

  let baselineMap = null;
  if (canGenerateRules) {
    const baselineHtml = generateGearListHtml({ ...baseInfo, requiredScenarios: '' });
    baselineMap = parseGearTableForAutoRules(baselineHtml);

    if (baselineMap && scenarios.length) {
      const scenarioDiffMap = new Map();
      scenarios.forEach(value => {
        const scenarioHtml = generateGearListHtml({ ...baseInfo, requiredScenarios: value });
        const scenarioMap = parseGearTableForAutoRules(scenarioHtml);
        if (!scenarioMap) return;
        const diff = diffGearTableMaps(baselineMap, scenarioMap);
        let add = cloneAutoGearItems(diff.add);
        let remove = cloneAutoGearItems(diff.remove);
        if (!add.length && !remove.length) return;
        scenarioDiffMap.set(value, { add, remove });
        rules.push({
          id: generateAutoGearId('rule'),
          label: value,
          scenarios: [value],
          add,
          remove,
        });
      });

      const comboCandidates = [
        ['Handheld', 'Easyrig'],
        ['Slider', 'Undersling mode']
      ].filter(combo => combo.every(value => scenarios.includes(value)));

      comboCandidates.forEach(combo => {
        const combinedLabel = combo.join(' + ');
        const scenarioHtml = generateGearListHtml({
          ...baseInfo,
          requiredScenarios: combo.join(', ')
        });
        const scenarioMap = parseGearTableForAutoRules(scenarioHtml);
        if (!scenarioMap) return;
        const diff = diffGearTableMaps(baselineMap, scenarioMap);
        const adjusted = subtractScenarioContributions({
          add: cloneAutoGearItems(diff.add),
          remove: cloneAutoGearItems(diff.remove)
        }, combo, scenarioDiffMap);
        if (!adjusted.add.length && !adjusted.remove.length) return;
        rules.push({
          id: generateAutoGearId('rule'),
          label: combinedLabel,
          scenarios: combo.slice(),
          add: adjusted.add,
          remove: adjusted.remove,
        });
      });

      const rainOverlapKeys = ['Extreme rain', 'Rain Machine'];
      const hasRainOverlap = rainOverlapKeys.every(key => scenarioDiffMap.has(key));
      if (hasRainOverlap) {
        const overlapRemovals = [
          { name: 'Schulz Sprayoff Micro', quantity: 1, category: 'Matte box + filter' },
          { name: 'Fischer RS to D-Tap cable 0,5m', quantity: 2, category: 'Rigging' },
          { name: 'Spare Disc (Schulz Sprayoff Micro)', quantity: 1, category: 'Matte box + filter' },
        ].map(entry => ({
          id: generateAutoGearId('item'),
          name: entry.name,
          category: entry.category,
          quantity: entry.quantity,
        }));
        rules.push({
          id: generateAutoGearId('rule'),
          label: 'Extreme rain + Rain Machine overlap',
          scenarios: rainOverlapKeys.slice(),
          add: [],
          remove: overlapRemovals,
        });
      }
    }
  }

  if (baselineMap) {
    buildCameraHandleAutoRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));
    buildViewfinderExtensionAutoRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));
    buildVideoDistributionAutoRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));

    const existingSignatures = new Set(
      rules
        .map(autoGearRuleSignature)
        .filter(signature => typeof signature === 'string' && signature)
    );

    const appendUniqueRules = additionalRules => {
      if (!Array.isArray(additionalRules) || !additionalRules.length) {
        return;
      }
      additionalRules.forEach(rule => {
        const signature = autoGearRuleSignature(rule);
        if (!signature || existingSignatures.has(signature)) return;
        rules.push(rule);
        existingSignatures.add(signature);
      });
    };

    appendUniqueRules(buildDefaultVideoDistributionAutoGearRules(baseInfo));
    appendUniqueRules(buildOnboardMonitorRiggingAutoGearRules());
    appendUniqueRules(buildTripodPreferenceAutoGearRules(baseInfo));
  }

  const anyMotorRule = buildAutoGearAnyMotorRule();
  if (anyMotorRule) {
    const targetSignature = autoGearRuleSignature(anyMotorRule);
    const exists = rules.some(rule => autoGearRuleSignature(rule) === targetSignature);
    if (!exists) {
      rules.push(anyMotorRule);
    }
  }

  const alwaysRule = buildAlwaysAutoGearRule();
  if (alwaysRule) {
    rules.push(alwaysRule);
  }

  const fiveDayRule = buildFiveDayConsumablesAutoGearRule();
  if (fiveDayRule) {
    rules.push(fiveDayRule);
  }

  buildDefaultMatteboxAutoGearRules().forEach(rule => rules.push(rule));
  return rules;
}

function computeFactoryAutoGearRules() {
  captureAutoGearSeedContext();
  const context = factoryAutoGearSeedContext;
  if (!context) return null;

  const previousSelectValues = captureSetupSelectValues();
  const seededBeforeCompute = hasSeededAutoGearDefaults();
  const savedAutoGearRules = autoGearRules.slice();
  const savedBaseAutoGearRules = baseAutoGearRulesState.slice();
  const savedProjectScopedRules = projectScopedAutoGearRules
    ? projectScopedAutoGearRules.slice()
    : null;
  const savedBackupSignature = autoGearRulesLastBackupSignature;
  const savedPersistedSignature = autoGearRulesLastPersistedSignature;
  const savedDirtyFlag = autoGearRulesDirtySinceBackup;
  try {
    if (seededBeforeCompute) {
      clearAutoGearDefaultsSeeded();
    }
    assignAutoGearRules([]);
    baseAutoGearRulesState = [];
    projectScopedAutoGearRules = null;
    autoGearRulesLastBackupSignature = savedBackupSignature;
    autoGearRulesLastPersistedSignature = savedPersistedSignature;
    autoGearRulesDirtySinceBackup = savedDirtyFlag;
    applySetupSelectValues(context.setupValues);
    const baseInfoSource = context.projectFormData || {};
    let baseInfo;
    try {
      baseInfo = JSON.parse(JSON.stringify(baseInfoSource));
    } catch (cloneErr) {
      void cloneErr;
      baseInfo = { ...baseInfoSource };
    }
    const rules = buildAutoGearRulesFromBaseInfo(baseInfo, context.scenarioValues || []);
    if (rules.length) {
      setFactoryAutoGearRulesSnapshot(rules);
    }
    return rules;
  } finally {
    applySetupSelectValues(previousSelectValues);
    assignAutoGearRules(savedAutoGearRules);
    baseAutoGearRulesState = savedBaseAutoGearRules.slice();
    projectScopedAutoGearRules = savedProjectScopedRules
      ? savedProjectScopedRules.slice()
      : null;
    autoGearRulesLastBackupSignature = savedBackupSignature;
    autoGearRulesLastPersistedSignature = savedPersistedSignature;
    autoGearRulesDirtySinceBackup = savedDirtyFlag;
    if (seededBeforeCompute) {
      markAutoGearDefaultsSeeded();
    }
  }
}

function seedAutoGearRulesFromCurrentProject() {
  captureAutoGearSeedContext();
  const seededBefore = hasSeededAutoGearDefaults();

  if (autoGearRules.length) {
    const addedDefaults = ensureDefaultMatteboxAutoGearRules();
    if (addedDefaults && !seededBefore) {
      markAutoGearDefaultsSeeded();
      setFactoryAutoGearRulesSnapshot(getAutoGearRules());
    } else if (!factoryAutoGearRulesSnapshot) {
      setFactoryAutoGearRulesSnapshot(getAutoGearRules());
    }
    return;
  }

  if (seededBefore) {
    const addedDefaults = ensureDefaultMatteboxAutoGearRules();
    if (addedDefaults && !factoryAutoGearRulesSnapshot) {
      setFactoryAutoGearRulesSnapshot(getAutoGearRules());
    }
    return;
  }

  const baseInfo = factoryAutoGearSeedContext && factoryAutoGearSeedContext.projectFormData
    ? { ...factoryAutoGearSeedContext.projectFormData }
    : (collectProjectFormData ? collectProjectFormData() : {});
  const scenarioValues = factoryAutoGearSeedContext && Array.isArray(factoryAutoGearSeedContext.scenarioValues)
    ? factoryAutoGearSeedContext.scenarioValues
    : (requiredScenariosSelect
        ? Array.from(requiredScenariosSelect.options || [])
            .map(opt => opt && opt.value)
            .filter(Boolean)
        : []);

  const rules = buildAutoGearRulesFromBaseInfo(baseInfo, scenarioValues);
  if (!rules.length) {
    const addedDefaults = ensureDefaultMatteboxAutoGearRules();
    if (addedDefaults) {
      markAutoGearDefaultsSeeded();
      setFactoryAutoGearRulesSnapshot(getAutoGearRules());
    }
    return;
  }
  setAutoGearRules(rules);
  markAutoGearDefaultsSeeded();
  setFactoryAutoGearRulesSnapshot(rules);
}

function resetAutoGearRulesToFactoryAdditions() {
  const langTexts = texts[currentLang] || texts.en || {};
  const confirmation = langTexts.autoGearResetFactoryConfirm
    || texts.en?.autoGearResetFactoryConfirm
    || 'Replace your automatic gear rules with the default additions?';
  if (typeof confirm === 'function' && !confirm(confirmation)) {
    return;
  }

  const backupName = ensureAutoBackupBeforeDeletion('reset automatic gear rules');
  if (!backupName) {
    return;
  }

  const fallbackTexts = texts.en || {};
  const successMessage = langTexts.autoGearResetFactoryDone
    || fallbackTexts.autoGearResetFactoryDone
    || 'Automatic gear rules restored to factory additions.';
  const emptyMessage = langTexts.autoGearResetFactoryEmpty
    || fallbackTexts.autoGearResetFactoryEmpty
    || 'Factory additions unavailable. Automatic gear rules cleared.';
  const failureMessage = langTexts.autoGearResetFactoryError
    || fallbackTexts.autoGearResetFactoryError
    || 'Reset failed. Please try again.';

  try {
    const factoryRules = computeFactoryAutoGearRules();
    if (Array.isArray(factoryRules) && factoryRules.length) {
      setAutoGearRules(factoryRules);
      markAutoGearDefaultsSeeded();
      setFactoryAutoGearRulesSnapshot(getAutoGearRules());
      if (typeof showNotification === 'function') {
        showNotification('success', successMessage);
      }
      return;
    }

    setAutoGearRules([]);
    setFactoryAutoGearRulesSnapshot(null);
    clearAutoGearDefaultsSeeded();
    const addedDefaults = ensureDefaultMatteboxAutoGearRules();
    if (addedDefaults) {
      markAutoGearDefaultsSeeded();
      setFactoryAutoGearRulesSnapshot(getAutoGearRules());
      if (typeof showNotification === 'function') {
        showNotification('success', successMessage);
      }
      return;
    }
    if (typeof showNotification === 'function') {
      showNotification('info', emptyMessage);
    }
  } catch (error) {
    console.error('Failed to reset automatic gear rules to factory additions', error);
    if (typeof showNotification === 'function') {
      showNotification('error', failureMessage);
    }
    if (backupName && typeof notifyAutoSaveFromBackup === 'function') {
      try {
        notifyAutoSaveFromBackup(failureMessage, backupName);
      } catch (notifyError) {
        console.warn('Failed to announce automatic backup after reset failure', notifyError);
      }
    }
  }
}

  const autoGearRulesAPI = freezeDeep({
    getFactoryAutoGearRulesSnapshot: function getFactoryAutoGearRulesSnapshot() {
      return factoryAutoGearRulesSnapshot
        ? cloneAutoGearRules(factoryAutoGearRulesSnapshot)
        : null;
    },
    getFactoryAutoGearSeedContext: function getFactoryAutoGearSeedContext() {
      if (!factoryAutoGearSeedContext) {
        return null;
      }
      try {
        return JSON.parse(JSON.stringify(factoryAutoGearSeedContext));
      } catch (error) {
        void error;
        return { ...factoryAutoGearSeedContext };
      }
    },
    setFactoryAutoGearRulesSnapshot,
    cloneAutoGearItems,
    cloneAutoGearRuleItem,
    cloneAutoGearRule,
    cloneAutoGearRules,
    subtractScenarioContributions,
    extractAutoGearSelections,
    buildCameraHandleAutoRules,
    buildViewfinderExtensionAutoRules,
    buildVideoDistributionAutoRules,
    buildOnboardMonitorRiggingAutoGearRules,
    buildTripodPreferenceAutoGearRules,
    buildDefaultVideoDistributionAutoGearRules,
    buildDefaultMatteboxAutoGearRules,
    buildAutoGearAnyMotorRule,
    buildAlwaysAutoGearRule,
    buildFiveDayConsumablesAutoGearRule,
    ensureDefaultMatteboxAutoGearRules,
    captureAutoGearSeedContext,
    buildAutoGearRulesFromBaseInfo,
    computeFactoryAutoGearRules,
    seedAutoGearRulesFromCurrentProject,
    resetAutoGearRulesToFactoryAdditions,
  });

  registerOrQueueModule(
    'cineFeatureAutoGearRules',
    autoGearRulesAPI,
    {
      category: 'feature',
      description: 'Automatic gear rule cloning, factory defaults and seeding helpers.',
      replace: true,
      connections: ['cineModuleBase', 'cineModuleContext', 'cinePersistence'],
    },
    (error) => {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to register cineFeatureAutoGearRules module.', error);
      }
    }
  );

  const globalExports = [
    ['cineFeatureAutoGearRules', autoGearRulesAPI],
    ['cloneAutoGearItems', cloneAutoGearItems],
    ['cloneAutoGearRuleItem', cloneAutoGearRuleItem],
    ['cloneAutoGearRule', cloneAutoGearRule],
    ['cloneAutoGearRules', cloneAutoGearRules],
    ['setFactoryAutoGearRulesSnapshot', setFactoryAutoGearRulesSnapshot],
    ['ensureDefaultMatteboxAutoGearRules', ensureDefaultMatteboxAutoGearRules],
    ['captureAutoGearSeedContext', captureAutoGearSeedContext],
    ['buildAutoGearRulesFromBaseInfo', buildAutoGearRulesFromBaseInfo],
    ['computeFactoryAutoGearRules', computeFactoryAutoGearRules],
    ['seedAutoGearRulesFromCurrentProject', seedAutoGearRulesFromCurrentProject],
    ['resetAutoGearRulesToFactoryAdditions', resetAutoGearRulesToFactoryAdditions],
    ['factoryAutoGearRulesSnapshot', null],
    ['factoryAutoGearSeedContext', null],
  ];

  globalExports.forEach(([name, value]) => {
    if (name === 'factoryAutoGearRulesSnapshot') {
      Object.defineProperty(GLOBAL_SCOPE, name, {
        configurable: true,
        get() {
          return factoryAutoGearRulesSnapshot;
        },
        set(next) {
          factoryAutoGearRulesSnapshot = Array.isArray(next)
            ? cloneAutoGearRules(next)
            : null;
        },
      });
      return;
    }
    if (name === 'factoryAutoGearSeedContext') {
      Object.defineProperty(GLOBAL_SCOPE, name, {
        configurable: true,
        get() {
          return factoryAutoGearSeedContext;
        },
        set(next) {
          factoryAutoGearSeedContext = next && typeof next === 'object'
            ? next
            : null;
        },
      });
      return;
    }
    exposeGlobal(name, value, { configurable: true, writable: true });
  });
})();
