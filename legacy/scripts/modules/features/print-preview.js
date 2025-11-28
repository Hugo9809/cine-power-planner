function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var GLOBAL_SCOPE = typeof window !== 'undefined' ? window : this;
  function resolveModuleBase(scope) {
    if ((typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase) return cineModuleBase;
    if (scope && _typeof(scope.cineModuleBase) === 'object') return scope.cineModuleBase;
    return null;
  }
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE) || {
    freezeDeep: function freezeDeep(v) {
      return v;
    },
    exposeGlobal: function exposeGlobal(n, v, s) {
      if (s) s[n] = v;
    },
    registerOrQueueModule: function registerOrQueueModule() {}
  };
  var state = {
    isOpen: false,
    elements: {},
    preferences: {
      layout: 'rental',
      sections: {
        project: true,
        devices: true,
        diagram: true,
        gearList: true,
        battery: true
      }
    }
  };
  function initializeDomReferences() {
    if (typeof document === 'undefined') return false;
    state.elements = {
      modal: document.getElementById('printPreviewModal'),
      closeBtn: document.getElementById('closePrintPreviewBtn'),
      paper: document.getElementById('printPreviewPaper'),
      layoutToggle: document.getElementById('printLayoutRentalToggle'),
      sectionToggles: {
        project: document.getElementById('printSectionProject'),
        devices: document.getElementById('printSectionDevices'),
        diagram: document.getElementById('printSectionDiagram'),
        gearList: document.getElementById('printSectionGearList'),
        battery: document.getElementById('printSectionBattery')
      },
      exportBtn: document.getElementById('printPreviewExportBtn'),
      printBtn: document.getElementById('printPreviewPrintBtn')
    };
    return !!state.elements.modal;
  }
  function bindEvents() {
    if (!state.elements.modal) return;
    var newCloseBtn = state.elements.closeBtn.cloneNode(true);
    state.elements.closeBtn.parentNode.replaceChild(newCloseBtn, state.elements.closeBtn);
    state.elements.closeBtn = newCloseBtn;
    state.elements.closeBtn.addEventListener('click', closePreview);
    if (state.elements.layoutToggle) {
      state.elements.layoutToggle.addEventListener('change', function (e) {
        state.preferences.layout = e.target.checked ? 'rental' : 'standard';
        renderPreviewContent();
      });
    }
    Object.entries(state.elements.sectionToggles).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        el = _ref2[1];
      if (el) {
        el.addEventListener('change', function (e) {
          state.preferences.sections[key] = e.target.checked;
          updateSectionVisibility();
        });
      }
    });
    if (state.elements.printBtn) {
      var newPrintBtn = state.elements.printBtn.cloneNode(true);
      state.elements.printBtn.parentNode.replaceChild(newPrintBtn, state.elements.printBtn);
      state.elements.printBtn = newPrintBtn;
      state.elements.printBtn.addEventListener('click', function () {
        triggerNativePrint();
      });
    }
    if (state.elements.exportBtn) {
      var newExportBtn = state.elements.exportBtn.cloneNode(true);
      state.elements.exportBtn.parentNode.replaceChild(newExportBtn, state.elements.exportBtn);
      state.elements.exportBtn = newExportBtn;
      state.elements.exportBtn.addEventListener('click', function () {
        triggerNativePrint();
      });
    }
  }
  function generateRentalDeviceGrid() {
    var sourceDevs = document.getElementById('overviewDeviceSection');
    if (!sourceDevs) return '<p>No devices selected.</p>';
    var container = document.createElement('div');
    container.className = 'device-category-container';
    var children = Array.from(sourceDevs.children);
    var currentCategoryDiv = null;
    children.forEach(function (child) {
      if (child.tagName === 'H3') {
        currentCategoryDiv = document.createElement('div');
        currentCategoryDiv.className = 'device-category';
        var title = document.createElement('h3');
        title.innerHTML = child.innerHTML;
        currentCategoryDiv.appendChild(title);
        container.appendChild(currentCategoryDiv);
      } else if (child.classList.contains('device-block')) {
        if (!currentCategoryDiv) {
          currentCategoryDiv = document.createElement('div');
          currentCategoryDiv.className = 'device-category';
          var _title = document.createElement('h3');
          _title.textContent = 'Other';
          currentCategoryDiv.appendChild(_title);
          container.appendChild(currentCategoryDiv);
        }
        var clone = child.cloneNode(true);
        currentCategoryDiv.appendChild(clone);
      }
    });
    return container.outerHTML;
  }
  function generatePowerSummary() {
    var _document$getElementB, _document$getElementB2, _document$getElementB3, _document$getElementB4, _document$getElementB5;
    var totalWatt = ((_document$getElementB = document.getElementById('totalPower')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.textContent) || '0 W';
    var runtime = ((_document$getElementB2 = document.getElementById('batteryLife')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.textContent) || '—';
    var batteryCount = ((_document$getElementB3 = document.getElementById('batteryCount')) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.textContent) || '0';
    var batteryName = ((_document$getElementB4 = document.getElementById('batterySelect')) === null || _document$getElementB4 === void 0 || (_document$getElementB4 = _document$getElementB4.selectedOptions[0]) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4.text) || 'Battery';
    var peakLoad = ((_document$getElementB5 = document.getElementById('totalCurrent144Elem')) === null || _document$getElementB5 === void 0 ? void 0 : _document$getElementB5.textContent) || '';
    return "\n            <div style=\"display: flex; gap: 15px;\">\n                <div style=\"flex: 1; background: #f0fdf4; padding: 10px; border: 1px solid #bbf7d0; border-radius: 4px;\">\n                    <div style=\"font-size: 0.8em; color: #166534; text-transform: uppercase; font-weight: bold;\">Total Load</div>\n                    <div style=\"font-size: 1.5em; font-weight: bold; color: #14532d;\">".concat(totalWatt, "</div>\n                    <div style=\"font-size: 0.8em; color: #166534;\">").concat(peakLoad ? 'Peak: ' + peakLoad : '', "</div>\n                </div>\n                <div style=\"flex: 1; background: #eff6ff; padding: 10px; border: 1px solid #bfdbfe; border-radius: 4px;\">\n                    <div style=\"font-size: 0.8em; color: #1e40af; text-transform: uppercase; font-weight: bold;\">Est. Runtime</div>\n                    <div style=\"font-size: 1.5em; font-weight: bold; color: #1e3a8a;\">").concat(runtime, "</div>\n                    <div style=\"font-size: 0.8em; color: #1e40af;\">w/ ").concat(batteryName, "</div>\n                </div>\n                <div style=\"flex: 1; background: #fff7ed; padding: 10px; border: 1px solid #fed7aa; border-radius: 4px;\">\n                    <div style=\"font-size: 0.8em; color: #9a3412; text-transform: uppercase; font-weight: bold;\">Daily Needs</div>\n                    <div style=\"font-size: 1.5em; font-weight: bold; color: #7c2d12;\">").concat(batteryCount, " Batts</div>\n                    <div style=\"font-size: 0.8em; color: #9a3412;\">for 12h day</div>\n                </div>\n            </div>\n        ");
  }
  function renderPreviewContent() {
    var _document$getElementB6, _document$getElementB7;
    var paper = state.elements.paper;
    if (!paper) return;
    paper.innerHTML = '';
    var header = document.createElement('div');
    header.className = 'preview-header';
    var projectName = ((_document$getElementB6 = document.getElementById('setupName')) === null || _document$getElementB6 === void 0 ? void 0 : _document$getElementB6.value) || 'Untitled Project';
    var production = ((_document$getElementB7 = document.getElementById('productionInput')) === null || _document$getElementB7 === void 0 ? void 0 : _document$getElementB7.value) || '';
    var dateStr = new Date().toLocaleDateString();
    header.innerHTML = "\n            <h1>Overview</h1>\n            <p><strong>Project Name:</strong> ".concat(projectName, "</p>\n            <p><strong>Production:</strong> ").concat(production, " | <strong>Date:</strong> ").concat(dateStr, "</p>\n        ");
    paper.appendChild(header);
    var reqSection = document.createElement('section');
    reqSection.id = 'preview-section-project';
    reqSection.className = 'print-section project-requirements-section';
    var sourceReq = document.getElementById('projectRequirementsOutput');
    if (sourceReq) {
      reqSection.innerHTML = sourceReq.innerHTML;
    } else {
      reqSection.innerHTML = '<p><em>No project requirements data.</em></p>';
    }
    paper.appendChild(reqSection);
    var devSection = document.createElement('section');
    devSection.id = 'preview-section-devices';
    devSection.className = 'print-section';
    devSection.innerHTML = '<h2>Device Selection</h2>';
    if (state.preferences.layout === 'rental') {
      devSection.innerHTML += generateRentalDeviceGrid();
    } else {
      var sourceDevs = document.getElementById('overviewDeviceSection');
      if (sourceDevs) {
        devSection.innerHTML += sourceDevs.innerHTML;
      }
    }
    paper.appendChild(devSection);
    var diagSection = document.createElement('section');
    diagSection.id = 'preview-section-diagram';
    diagSection.className = 'print-section';
    diagSection.innerHTML = '<h2>Power Diagram</h2>';
    var sourceDiag = document.getElementById('setupDiagram');
    if (sourceDiag) {
      var svg = sourceDiag.querySelector('svg');
      if (svg) {
        diagSection.appendChild(svg.cloneNode(true));
      } else {
        diagSection.innerHTML += sourceDiag.innerHTML;
      }
    }
    paper.appendChild(diagSection);
    var powerSection = document.createElement('section');
    powerSection.id = 'preview-section-battery';
    powerSection.className = 'print-section';
    powerSection.style.marginTop = '20px';
    powerSection.innerHTML = '<h2>Power Summary</h2>';
    powerSection.innerHTML += generatePowerSummary();
    var sourceBatteryTable = document.getElementById('batteryComparison');
    if (sourceBatteryTable) {
      var batteryClone = sourceBatteryTable.cloneNode(true);
      var heading = batteryClone.querySelector('h2');
      if (heading) heading.remove();
      powerSection.appendChild(batteryClone);
    }
    paper.appendChild(powerSection);
    var gearSection = document.createElement('section');
    gearSection.id = 'preview-section-gearList';
    gearSection.className = 'print-section gear-list-section';
    gearSection.innerHTML = '<h2>Gear List</h2>';
    var sourceGear = document.getElementById('gearListOutput');
    if (sourceGear) {
      gearSection.innerHTML += sourceGear.innerHTML;
    }
    paper.appendChild(gearSection);
    updateSectionVisibility();
  }
  function updateSectionVisibility() {
    var map = {
      project: 'preview-section-project',
      devices: 'preview-section-devices',
      diagram: 'preview-section-diagram',
      gearList: 'preview-section-gearList',
      battery: 'preview-section-battery'
    };
    Object.entries(map).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        id = _ref4[1];
      var el = document.getElementById(id);
      if (el) {
        el.style.display = state.preferences.sections[key] ? 'block' : 'none';
      }
    });
  }
  function openPreview() {
    if (!state.elements.modal) initializeDomReferences();
    if (!state.elements.modal) return;
    bindEvents();
    renderPreviewContent();
    state.elements.modal.classList.remove('hidden');
    state.isOpen = true;
    document.body.style.overflow = 'hidden';
  }
  function closePreview() {
    if (!state.elements.modal) return;
    state.elements.modal.classList.add('hidden');
    state.isOpen = false;
    document.body.style.overflow = '';
  }
  function triggerNativePrint() {
    document.body.classList.add('printing-preview');
    window.print();
    document.body.classList.remove('printing-preview');
  }
  var api = {
    open: openPreview,
    close: closePreview
  };
  MODULE_BASE.registerOrQueueModule('cineFeaturePrintPreview', api, {
    category: 'feature',
    description: 'Print Preview Modal',
    connections: ['cineUi']
  });
  MODULE_BASE.exposeGlobal('cineFeaturePrintPreview', api);
})();