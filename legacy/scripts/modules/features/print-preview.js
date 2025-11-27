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
      state.elements.printBtn.addEventListener('click', function () {
        triggerNativePrint();
      });
    }
    if (state.elements.exportBtn) {
      state.elements.exportBtn.addEventListener('click', function () {
        triggerNativePrint();
      });
    }
  }
  function renderPreviewContent() {
    var _document$getElementB, _document$getElementB2;
    var paper = state.elements.paper;
    if (!paper) return;
    paper.innerHTML = '';
    var header = document.createElement('div');
    header.className = 'preview-header';
    var projectName = ((_document$getElementB = document.getElementById('setupName')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || 'Untitled Project';
    var production = ((_document$getElementB2 = document.getElementById('productionInput')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.value) || '';
    var dateStr = new Date().toLocaleDateString();
    header.innerHTML = "\n            <h1>Overview</h1>\n            <p><strong>Project Name:</strong> ".concat(projectName, "</p>\n            <p><strong>Production:</strong> ").concat(production, " | <strong>Date:</strong> ").concat(dateStr, "</p>\n        ");
    paper.appendChild(header);
    if (state.preferences.sections.project) {
      var reqSection = document.createElement('section');
      reqSection.id = 'preview-section-project';
      reqSection.className = 'print-section';
      var sourceReq = document.getElementById('projectRequirementsOutput');
      if (sourceReq) {
        reqSection.innerHTML = sourceReq.innerHTML;
      } else {
        reqSection.innerHTML = '<p><em>No project requirements data.</em></p>';
      }
      paper.appendChild(reqSection);
    }
    if (state.preferences.sections.devices) {
      var devSection = document.createElement('section');
      devSection.id = 'preview-section-devices';
      devSection.className = 'print-section';
      devSection.innerHTML = '<h2>Device Selection</h2>';
      if (state.preferences.layout === 'rental') {
        var grid = document.createElement('div');
        grid.className = 'device-category-container';
        var sourceDevs = document.getElementById('overviewDeviceSection');
        if (sourceDevs) {
          grid.innerHTML = sourceDevs.innerHTML;
        }
        devSection.appendChild(grid);
      } else {
        var _sourceDevs = document.getElementById('overviewDeviceSection');
        if (_sourceDevs) {
          devSection.innerHTML += _sourceDevs.innerHTML;
        }
      }
      paper.appendChild(devSection);
    }
    if (state.preferences.sections.diagram) {
      var diagSection = document.createElement('section');
      diagSection.id = 'preview-section-diagram';
      diagSection.className = 'print-section';
      diagSection.innerHTML = '<h2>Power Diagram</h2>';
      var sourceDiag = document.getElementById('setupDiagram');
      if (sourceDiag) {
        var canvas = sourceDiag.querySelector('canvas');
        if (canvas) {
          var img = document.createElement('img');
          img.src = canvas.toDataURL();
          img.style.maxWidth = '100%';
          diagSection.appendChild(img);
        } else {
          diagSection.innerHTML += sourceDiag.innerHTML;
        }
      }
      paper.appendChild(diagSection);
    }
    if (state.preferences.sections.battery) {
      var powerSection = document.createElement('section');
      powerSection.className = 'print-section';
      powerSection.innerHTML = '<h2>Power Summary</h2>';
      var sourceResults = document.getElementById('resultsSection');
      if (sourceResults) {
        powerSection.innerHTML += sourceResults.innerHTML;
      }
      paper.appendChild(powerSection);
    }
    if (state.preferences.sections.gearList) {
      var gearSection = document.createElement('section');
      gearSection.id = 'preview-section-gearList';
      gearSection.className = 'print-section';
      gearSection.innerHTML = '<h2>Gear List</h2>';
      var sourceGear = document.getElementById('gearListOutput');
      if (sourceGear) {
        gearSection.innerHTML += sourceGear.innerHTML;
      }
      paper.appendChild(gearSection);
    }
    updateSectionVisibility();
  }
  function updateSectionVisibility() {
    var map = {
      project: 'preview-section-project',
      devices: 'preview-section-devices',
      diagram: 'preview-section-diagram',
      gearList: 'preview-section-gearList'
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