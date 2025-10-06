/* global escapeHtml, formatDateString, iconMarkup, ICON_GLYPHS */
(function () {
  function detectScope() {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof window !== 'undefined') return window;
    if (typeof self !== 'undefined') return self;
    if (typeof global !== 'undefined') return global;
    return {};
  }

  const scope = detectScope();
  const elementCache = new Map();
  const runtimeFeedbackDefaults = {
    loadFeedback: null,
    saveFeedback: null,
    onAfterDelete: null,
    texts: null,
    currentLang: null,
    devices: null,
    cameraSelect: null,
    monitorSelect: null,
    videoSelect: null,
    distanceSelect: null,
    motorSelects: null,
    controllerSelects: null
  };

  function resolveElement(cacheKey, provided, fallbackId) {
    if (provided) {
      elementCache.set(cacheKey, provided);
      return provided;
    }
    if (elementCache.has(cacheKey)) {
      return elementCache.get(cacheKey);
    }
    if (!fallbackId || typeof document === 'undefined') {
      return null;
    }
    const element = document.getElementById(fallbackId);
    if (element) {
      elementCache.set(cacheKey, element);
    }
    return element || null;
  }

  function formatPower(value) {
    if (!Number.isFinite(value)) return '0.0';
    return value.toFixed(1);
  }

  function formatCurrent(value) {
    if (!Number.isFinite(value)) return '0.00';
    return value.toFixed(2);
  }

  function formatRuntimeDisplay(hours) {
    if (hours === null || typeof hours === 'undefined') return '–';
    if (hours === Infinity) return '∞';
    if (!Number.isFinite(hours)) return '–';
    return hours.toFixed(2);
  }

  function updateResultsSection(options = {}) {
    const {
      breakdown = [],
      totals = {},
      currents = {},
      runtime = {},
      elements = {},
      texts,
      currentLang
    } = options;

    const breakdownElem = resolveElement('breakdown', elements.breakdown, 'breakdownList');
    const totalPowerElem = resolveElement('totalPower', elements.totalPower, 'totalPower');
    const totalCurrentHighElem = resolveElement('totalCurrentHigh', elements.totalCurrentHigh, 'totalCurrent144');
    const totalCurrentLowElem = resolveElement('totalCurrentLow', elements.totalCurrentLow, 'totalCurrent12');
    const batteryLifeElem = resolveElement('batteryLife', elements.batteryLife, 'batteryLife');
    const batteryLifeLabelElem = resolveElement('batteryLifeLabel', elements.batteryLifeLabel, 'batteryLifeLabel');
    const runtimeAverageNoteElem = resolveElement('runtimeAverageNote', elements.runtimeAverageNote, 'runtimeAverageNote');
    const batteryCountElem = resolveElement('batteryCount', elements.batteryCount, 'batteryCount');

    if (breakdownElem && typeof breakdownElem.innerHTML !== 'undefined') {
      breakdownElem.innerHTML = '';
      if (Array.isArray(breakdown) && breakdown.length) {
        breakdown.forEach(entry => {
          if (!entry || !Number.isFinite(entry.power) || entry.power <= 0) return;
          const li = document.createElement('li');
          const strong = document.createElement('strong');
          strong.textContent = entry.label || '';
          li.appendChild(strong);
          li.appendChild(document.createTextNode(` ${formatPower(entry.power)} W`));
          breakdownElem.appendChild(li);
        });
      }
    }

    if (totalPowerElem) {
      totalPowerElem.textContent = formatPower(totals.totalWatt);
    }
    if (totalCurrentHighElem) {
      totalCurrentHighElem.textContent = formatCurrent(currents.high);
    }
    if (totalCurrentLowElem) {
      totalCurrentLowElem.textContent = formatCurrent(currents.low);
    }

    if (batteryLifeElem) {
      const displayText = typeof runtime.displayText === 'string'
        ? runtime.displayText
        : formatRuntimeDisplay(runtime.hours);
      batteryLifeElem.textContent = displayText;
    }

    if (batteryCountElem && typeof runtime.batteryCountDisplay !== 'undefined') {
      batteryCountElem.textContent = runtime.batteryCountDisplay;
    }

    if (batteryLifeLabelElem) {
      const labelText = runtime.batteryLifeLabelText || runtime.defaultBatteryLifeLabel || '';
      if (labelText) {
        batteryLifeLabelElem.textContent = labelText;
      }
      if (runtime.batteryLifeHelp && typeof batteryLifeLabelElem.setAttribute === 'function') {
        batteryLifeLabelElem.setAttribute('data-help', runtime.batteryLifeHelp);
      } else if (texts && currentLang && texts[currentLang] && texts[currentLang].batteryLifeHelp && typeof batteryLifeLabelElem.setAttribute === 'function') {
        batteryLifeLabelElem.setAttribute('data-help', texts[currentLang].batteryLifeHelp);
      }
    }

    if (runtimeAverageNoteElem) {
      runtimeAverageNoteElem.textContent = runtime.runtimeAverageNoteText || '';
    }
  }

  function configureRuntimeFeedback(options = {}) {
    if (options.loadFeedback) runtimeFeedbackDefaults.loadFeedback = options.loadFeedback;
    if (options.saveFeedback) runtimeFeedbackDefaults.saveFeedback = options.saveFeedback;
    if (options.onAfterDelete) runtimeFeedbackDefaults.onAfterDelete = options.onAfterDelete;
    if (options.texts) runtimeFeedbackDefaults.texts = options.texts;
    if (options.currentLang) runtimeFeedbackDefaults.currentLang = options.currentLang;
    if (options.devices) runtimeFeedbackDefaults.devices = options.devices;
    if (options.cameraSelect) runtimeFeedbackDefaults.cameraSelect = options.cameraSelect;
    if (options.monitorSelect) runtimeFeedbackDefaults.monitorSelect = options.monitorSelect;
    if (options.videoSelect) runtimeFeedbackDefaults.videoSelect = options.videoSelect;
    if (options.distanceSelect) runtimeFeedbackDefaults.distanceSelect = options.distanceSelect;
    if (options.motorSelects) runtimeFeedbackDefaults.motorSelects = options.motorSelects;
    if (options.controllerSelects) runtimeFeedbackDefaults.controllerSelects = options.controllerSelects;
  }

  function getConfigValue(options, key, fallback) {
    if (options && typeof options[key] !== 'undefined') {
      return options[key];
    }
    if (typeof runtimeFeedbackDefaults[key] !== 'undefined' && runtimeFeedbackDefaults[key] !== null) {
      return runtimeFeedbackDefaults[key];
    }
    return fallback;
  }

  function renderRuntimeFeedbackTable(currentKey, options = {}) {
    if (!currentKey) return null;

    const loadFeedback = getConfigValue(options, 'loadFeedback', () => ({}));
    const saveFeedback = getConfigValue(options, 'saveFeedback', () => {});
    const onAfterDelete = getConfigValue(options, 'onAfterDelete', null);

    const texts = options.texts
      || runtimeFeedbackDefaults.texts
      || scope.texts
      || {};
    const currentLang = options.currentLang
      || runtimeFeedbackDefaults.currentLang
      || scope.currentLang
      || 'en';

    const devices = options.devices
      || runtimeFeedbackDefaults.devices
      || scope.devices
      || {};
    const cameraSelect = options.cameraSelect
      || runtimeFeedbackDefaults.cameraSelect
      || scope.cameraSelect;
    const monitorSelect = options.monitorSelect
      || runtimeFeedbackDefaults.monitorSelect
      || scope.monitorSelect;
    const videoSelect = options.videoSelect
      || runtimeFeedbackDefaults.videoSelect
      || scope.videoSelect;
    const distanceSelect = options.distanceSelect
      || runtimeFeedbackDefaults.distanceSelect
      || scope.distanceSelect;
    const motorSelects = options.motorSelects
      || runtimeFeedbackDefaults.motorSelects
      || scope.motorSelects
      || [];
    const controllerSelects = options.controllerSelects
      || runtimeFeedbackDefaults.controllerSelects
      || scope.controllerSelects
      || [];

    const container = typeof document !== 'undefined'
      ? (options.container || document.getElementById('feedbackTableContainer'))
      : null;
    const table = typeof document !== 'undefined'
      ? (options.table || document.getElementById('userFeedbackTable'))
      : null;

    const feedbackData = typeof loadFeedback === 'function' ? loadFeedback() : {};
    const entries = (feedbackData[currentKey] || []).map(entry => {
      const rest = { ...entry };
      delete rest.location;
      return rest;
    });

    if (!entries.length) {
      if (table) {
        table.innerHTML = '';
        if (table.classList && typeof table.classList.add === 'function') {
          table.classList.add('hidden');
        }
      }
      if (container && container.classList && typeof container.classList.add === 'function') {
        container.classList.add('hidden');
      }
      return null;
    }

    const columns = [
      { key: 'username', label: 'User' },
      { key: 'date', label: 'Date' },
      { key: 'cameraWifi', label: 'WIFI' },
      { key: 'resolution', label: 'Res' },
      { key: 'codec', label: 'Codec' },
      { key: 'framerate', label: 'FPS' },
      { key: 'firmware', label: 'Firmware' },
      { key: 'batteryAge', label: 'Battery Age' },
      { key: 'monitorBrightness', label: 'Monitor Brightness' },
      { key: 'temperature', label: 'temp' },
      { key: 'charging', label: 'Charging' },
      { key: 'runtime', label: 'runtime' },
      { key: 'batteriesPerDay', label: 'batteries a day' },
      { key: 'weighting', label: 'weight' }
    ];

    const parseResolution = str => {
      if (!str) return null;
      const s = String(str).toLowerCase();
      const kMatch = s.match(/(\d+(?:\.\d+)?)\s*k/);
      if (kMatch) return parseFloat(kMatch[1]) * 1000;
      const pMatch = s.match(/(\d{3,4})p/);
      if (pMatch) return parseInt(pMatch[1], 10);
      const xMatch = s.match(/x\s*(\d{3,4})/);
      if (xMatch) return parseInt(xMatch[1], 10);
      const numMatch = s.match(/(\d{3,4})/);
      return numMatch ? parseInt(numMatch[1], 10) : null;
    };

    const parseFramerate = str => {
      if (!str) return null;
      const m = String(str).match(/\d+(?:\.\d+)?/);
      return m ? parseFloat(m[0]) : null;
    };

    const tempFactor = temp => {
      if (Number.isNaN(temp)) return 1;
      if (temp >= 25) return 1;
      if (temp >= 0) return 1 + (25 - temp) * 0.01;
      if (temp >= -10) return 1.25 + (-temp) * 0.035;
      if (temp >= -20) return 1.6 + (-10 - temp) * 0.04;
      return 2;
    };

    const selectedCamera = cameraSelect && typeof cameraSelect.value === 'string'
      ? cameraSelect.value
      : '';
    const selectedMonitor = monitorSelect && typeof monitorSelect.value === 'string'
      ? monitorSelect.value
      : '';
    const selectedVideo = videoSelect && typeof videoSelect.value === 'string'
      ? videoSelect.value
      : '';
    const selectedDistance = distanceSelect && typeof distanceSelect.value === 'string'
      ? distanceSelect.value
      : '';

    const camPower = devices?.cameras?.[selectedCamera]?.powerDrawWatts || 0;
    const monitorPower = devices?.monitors?.[selectedMonitor]?.powerDrawWatts || 0;
    const videoPower = devices?.video?.[selectedVideo]?.powerDrawWatts || 0;
    const motorPower = Array.from(motorSelects || []).reduce(
      (sum, sel) => sum + (devices?.fiz?.motors?.[sel?.value]?.powerDrawWatts || 0),
      0
    );
    const controllerPower = Array.from(controllerSelects || []).reduce(
      (sum, sel) => sum + (devices?.fiz?.controllers?.[sel?.value]?.powerDrawWatts || 0),
      0
    );
    const distancePower = devices?.fiz?.distance?.[selectedDistance]?.powerDrawWatts || 0;
    const otherPower = videoPower + motorPower + controllerPower + distancePower;
    const totalPower = camPower + monitorPower + otherPower;
    const specBrightness = devices?.monitors?.[selectedMonitor]?.brightnessNits;

    let weightedSum = 0;
    let weightTotal = 0;
    let count = 0;

    const breakdown = entries.map(e => {
      const rt = parseFloat(e.runtime);
      if (Number.isNaN(rt)) return null;

      let camFactor = 1;
      let monitorFactor = 1;

      const res = parseResolution(e.resolution);
      if (res) camFactor *= (() => {
        if (res >= 12000) return 3;
        if (res >= 8000) return 2;
        if (res >= 4000) return 1.5;
        if (res >= 1080) return 1;
        return res / 1080;
      })();

      const fps = parseFramerate(e.framerate);
      if (fps) camFactor *= fps / 24;

      const wifi = (e.cameraWifi || '').toLowerCase();
      if (wifi.includes('on')) camFactor *= 1.1;

      const codec = e.codec;
      if (codec) {
        const c = String(codec).toLowerCase();
        if (/(prores\s*raw|braw|arriraw|r3d|redcode|cinema\s*dng|cdng|canon\s*raw|x-ocn|raw)/.test(c)) {
          camFactor *= 1;
        } else if (/prores/.test(c)) {
          camFactor *= 1.1;
        } else if (/dnx|avid/.test(c)) {
          camFactor *= 1.2;
        } else if (/\ball[\s-]?i\b|all\s*intra|intra/.test(c)) {
          camFactor *= 1.3;
        } else if (/h265|h\.265|hevc|xavc\s*hs|xhevc/.test(c)) {
          camFactor *= 1.7;
        } else if (/h264|h\.264|avc|xavc|avchd|mpeg-4/.test(c)) {
          camFactor *= 1.5;
        }
      }

      const entryBrightness = parseFloat(e.monitorBrightness);
      if (!Number.isNaN(entryBrightness) && specBrightness) {
        const ratio = entryBrightness / specBrightness;
        if (ratio < 1) monitorFactor *= ratio;
      }

      let weight = 1;
      if (totalPower > 0) {
        weight = (
          camFactor * camPower +
          monitorFactor * monitorPower +
          otherPower
        ) / totalPower;
      }

      const temp = parseFloat(e.temperature);
      const tempMul = tempFactor(temp);
      const adjustedRuntime = rt * tempMul;

      weightedSum += adjustedRuntime * weight;
      weightTotal += weight;
      count++;

      return {
        temperature: tempMul,
        resolution: res ? (() => {
          if (res >= 12000) return 3;
          if (res >= 8000) return 2;
          if (res >= 4000) return 1.5;
          if (res >= 1080) return 1;
          return res / 1080;
        })() : 1,
        framerate: fps ? fps / 24 : 1,
        wifi: wifi.includes('on') ? 1.1 : 1,
        codec: codec ? (() => {
          const c = String(codec).toLowerCase();
          if (/(prores\s*raw|braw|arriraw|r3d|redcode|cinema\s*dng|cdng|canon\s*raw|x-ocn|raw)/.test(c)) return 1;
          if (/prores/.test(c)) return 1.1;
          if (/dnx|avid/.test(c)) return 1.2;
          if (/\ball[\s-]?i\b|all\s*intra|intra/.test(c)) return 1.3;
          if (/h265|h\.265|hevc|xavc\s*hs|xhevc/.test(c)) return 1.7;
          if (/h264|h\.264|avc|xavc|avchd|mpeg-4/.test(c)) return 1.5;
          return 1;
        })() : 1,
        monitor: monitorFactor,
        weight
      };
    });

    if (!table) {
      return count >= 3 && weightTotal > 0
        ? { runtime: weightedSum / weightTotal, count, weight: weightTotal }
        : null;
    }

    let html = '<tr>' + columns.map(c => `<th>${typeof escapeHtml === 'function' ? escapeHtml(c.label) : c.label}</th>`).join('') + '<th></th></tr>';
    const deleteFeedbackLabel = texts[currentLang]?.deleteSetupBtn
      || texts.en?.deleteSetupBtn
      || 'Delete';

    const maxWeight = Math.max(...breakdown.filter(Boolean).map(b => b.weight), 0);

    entries.forEach((entry, index) => {
      html += '<tr>';
      columns.forEach(c => {
        if (c.key === 'weighting') {
          const b = breakdown[index];
          if (b) {
            const percent = maxWeight ? (b.weight / maxWeight) * 100 : 0;
            const share = b.weight * 100;
            const tooltip =
              `Temp ×${b.temperature.toFixed(2)}\n`
              + `Res ×${b.resolution.toFixed(2)}\n`
              + `FPS ×${b.framerate.toFixed(2)}\n`
              + `Codec ×${b.codec.toFixed(2)}\n`
              + `Wi-Fi ×${b.wifi.toFixed(2)}\n`
              + `Monitor ×${b.monitor.toFixed(2)}\n`
              + `Share ${share.toFixed(1)}%`;
            const esc = typeof escapeHtml === 'function' ? escapeHtml : String;
            html += `<td><div class="weightingRow"><div class="barContainer"><div class="weightBar" style="width:${percent}%" title="${esc(tooltip)}"></div></div><span class="weightingPercent">${share.toFixed(1)}%</span></div></td>`;
          } else {
            html += '<td></td>';
          }
        } else if (c.key === 'date') {
          const value = typeof formatDateString === 'function'
            ? formatDateString(entry[c.key])
            : entry[c.key];
          const esc = typeof escapeHtml === 'function' ? escapeHtml : String;
          html += `<td>${esc(value || '')}</td>`;
        } else {
          const esc = typeof escapeHtml === 'function' ? escapeHtml : String;
          html += `<td>${esc(entry[c.key] || '')}</td>`;
        }
      });
      const icon = typeof iconMarkup === 'function'
        ? iconMarkup(scope.ICON_GLYPHS ? scope.ICON_GLYPHS.trash : null, 'btn-icon')
        : '';
      html += `<td><button data-key="${encodeURIComponent(currentKey)}" data-index="${index}" class="deleteFeedbackBtn">${icon}${typeof escapeHtml === 'function' ? escapeHtml(deleteFeedbackLabel) : deleteFeedbackLabel}</button></td>`;
      html += '</tr>';
    });

    table.innerHTML = html;
    if (table.classList && typeof table.classList.remove === 'function') {
      table.classList.remove('hidden');
    }
    if (container && container.classList && typeof container.classList.remove === 'function') {
      container.classList.remove('hidden');
    }

    const buttons = table.querySelectorAll('.deleteFeedbackBtn');
    buttons.forEach(btn => {
      btn.setAttribute('aria-label', deleteFeedbackLabel);
      btn.setAttribute('title', deleteFeedbackLabel);
      btn.addEventListener('click', () => {
        const key = decodeURIComponent(btn.dataset.key || '');
        const idx = parseInt(btn.dataset.index || '0', 10);
        if (typeof loadFeedback !== 'function' || typeof saveFeedback !== 'function') {
          return;
        }
        const data = loadFeedback();
        if (data[key]) {
          data[key].splice(idx, 1);
          if (!data[key].length) {
            delete data[key];
          }
          saveFeedback(data);
          if (typeof onAfterDelete === 'function') {
            try {
              onAfterDelete();
            } catch (error) {
              if (scope.console && typeof scope.console.error === 'function') {
                console.error('Failed to refresh results after deleting runtime feedback', error);
              }
            }
          }
        }
      });
    });

    if (count >= 3 && weightTotal > 0) {
      return { runtime: weightedSum / weightTotal, count, weight: weightTotal };
    }
    return null;
  }

  scope.cineResults = scope.cineResults || {};
  scope.cineResults.updateResultsSection = updateResultsSection;
  scope.cineResults.renderRuntimeFeedbackTable = renderRuntimeFeedbackTable;
  scope.cineResults.configureRuntimeFeedback = configureRuntimeFeedback;
})();
