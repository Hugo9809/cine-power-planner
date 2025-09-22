function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function generatePrintableOverview() {
  var escapeHtmlSafe = function escapeHtmlSafe(value) {
    return typeof escapeHtml === 'function' ? escapeHtml(value) : String(value !== null && value !== void 0 ? value : '');
  };
  var summarizeConnectors = function summarizeConnectors(device) {
    return typeof generateConnectorSummary === 'function' ? generateConnectorSummary(device) : '';
  };
  var setupNameField = typeof document !== 'undefined' ? document.getElementById('setupName') : null;
  var setupName = setupNameField ? setupNameField.value : '';
  var now = new Date();
  var localeMap = {
    de: 'de-DE',
    es: 'es-ES',
    fr: 'fr-FR',
    en: 'en-US',
    it: 'it-IT'
  };
  var lang = typeof currentLang === 'string' ? currentLang : 'en';
  var locale = localeMap[lang] || 'en-US';
  var dateTimeString = now.toLocaleDateString(locale) + ' ' + now.toLocaleTimeString();
  var fallbackProjectName = currentProjectInfo && typeof currentProjectInfo.projectName === 'string' ? currentProjectInfo.projectName.trim() : '';
  var projectNameForTitle = setupName || fallbackProjectName;
  var sanitizeTitleSegment = function sanitizeTitleSegment(value) {
    if (!value) return '';
    return String(value).trim().replace(/[\\/:*?"<>|]+/g, '').replace(/\s+/g, ' ').replace(/^\.+/, '').replace(/\.+$/, '').trim();
  };
  var padTwo = function padTwo(value) {
    return String(value).padStart(2, '0');
  };
  var formattedDate = "".concat(now.getFullYear(), "-").concat(padTwo(now.getMonth() + 1), "-").concat(padTwo(now.getDate()));
  var formattedTime = "".concat(padTwo(now.getHours()), "-").concat(padTwo(now.getMinutes()), "-").concat(padTwo(now.getSeconds()));
  var timestampLabel = "".concat(formattedDate, " ").concat(formattedTime).trim();
  var projectTitleSegment = sanitizeTitleSegment(projectNameForTitle) || 'Project';
  var printDocumentTitle = [timestampLabel, projectTitleSegment, '- -', 'Project Overview and Gear List'].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
  var originalDocumentTitle = typeof document !== 'undefined' ? document.title : '';
  var t = (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts ? texts[lang] || texts.en || {} : {};
  var customLogo = typeof localStorage !== 'undefined' ? localStorage.getItem('customLogo') : null;
  var generatedOnLabel = t.generatedOnLabel || 'Generated on';
  var defaultPdfWarningHeading = t.pdfWarningsHeading || 'Warnings';
  var diagramPdfNote = t.diagramPdfNote || 'The visual connection diagram is not included in the PDF export. Open the print view to review the layout.';
  var ensureLabelSuffix = function ensureLabelSuffix(label) {
    var base = typeof label === 'string' ? label.trim() : '';
    if (!base) return '';
    return /[:：]$/.test(base) ? base : "".concat(base, ":");
  };
  var normalizeForPdf = function normalizeForPdf(value) {
    if (value === null || value === undefined) {
      return '';
    }
    var text = String(value);
    if (typeof text.normalize === 'function') {
      text = text.normalize('NFKD');
    }
    text = text.replace(/[\u0300-\u036f]/g, '').replace(/\u00DF/g, 'ss').replace(/[\u00A0\u202F\u2007]/g, ' ').replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, '-').replace(/\u00B0/g, ' deg ').replace(/\u00D7/g, 'x').replace(/\u00B5/g, 'u').replace(/\u2126/g, 'Ohm').replace(/\u20AC/g, 'EUR').replace(/\u00A3/g, 'GBP').replace(/\u00A5/g, 'JPY').replace(/\u00BD/g, '1/2').replace(/\u00BC/g, '1/4').replace(/\u00BE/g, '3/4').replace(/\u2022/g, '-').replace(/[\u2018\u2019\u201A\u201B]/g, "'").replace(/[\u201C\u201D\u201E\u201F]/g, '"');
    text = text.replace(/[^\x20-\x7E]/g, '?');
    return text.replace(/\s+/g, ' ').trim();
  };
  var wrapPdfText = function wrapPdfText(text, maxLength) {
    var result = [];
    var limit = Math.max(10, maxLength || 80);
    var normalized = normalizeForPdf(text);
    if (!normalized) {
      return result;
    }
    var words = normalized.split(' ');
    var currentLine = '';
    for (var i = 0; i < words.length; i += 1) {
      var word = words[i];
      if (!word) {
        continue;
      }
      if (!currentLine) {
        if (word.length <= limit) {
          currentLine = word;
        } else {
          var chunks = [];
          for (var start = 0; start < word.length; start += limit) {
            chunks.push(word.slice(start, start + limit));
          }
          if (chunks.length) {
            result.push(chunks[0]);
            for (var c = 1; c < chunks.length - 1; c += 1) {
              result.push(chunks[c]);
            }
            currentLine = chunks[chunks.length - 1];
          }
        }
        continue;
      }
      var candidate = "".concat(currentLine, " ").concat(word);
      if (candidate.length <= limit) {
        currentLine = candidate;
      } else if (word.length > limit) {
        result.push(currentLine);
        var _chunks = [];
        for (var _start = 0; _start < word.length; _start += limit) {
          _chunks.push(word.slice(_start, _start + limit));
        }
        if (_chunks.length) {
          for (var _c = 0; _c < _chunks.length - 1; _c += 1) {
            result.push(_chunks[_c]);
          }
          currentLine = _chunks[_chunks.length - 1];
        } else {
          currentLine = '';
        }
      } else {
        result.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) {
      result.push(currentLine);
    }
    return result;
  };
  var flattenPdfEntries = function flattenPdfEntries(entries) {
    var lines = [];
    if (!Array.isArray(entries) || entries.length === 0) {
      return ['No data available'];
    }
    for (var i = 0; i < entries.length; i += 1) {
      var entry = entries[i];
      if (!entry) {
        continue;
      }
      if (entry.type === 'blank') {
        if (lines.length && lines[lines.length - 1] !== '') {
          lines.push('');
        }
        continue;
      }
      var indent = Math.max(0, Math.min(40, entry.indent || 0));
      var indentStr = indent ? ' '.repeat(indent) : '';
      var normalized = normalizeForPdf(entry.text);
      if (!normalized) {
        continue;
      }
      var available = Math.max(10, 94 - indentStr.length);
      var wrapped = wrapPdfText(normalized, available);
      if (!wrapped.length) {
        continue;
      }
      for (var w = 0; w < wrapped.length; w += 1) {
        lines.push(indentStr + wrapped[w]);
      }
    }
    if (!lines.length) {
      lines.push('No data available');
    }
    return lines;
  };
  var splitLinesIntoPages = function splitLinesIntoPages(lines, maxLinesPerPage) {
    var pages = [];
    var limit = Math.max(1, maxLinesPerPage || 46);
    var current = [];
    for (var i = 0; i < lines.length; i += 1) {
      var line = lines[i];
      if (current.length >= limit) {
        pages.push(current);
        current = [];
      }
      if (line === '' && current.length === 0) {
        continue;
      }
      current.push(line);
    }
    if (current.length) {
      pages.push(current);
    }
    if (!pages.length) {
      pages.push(['No data available']);
    }
    return pages;
  };
  var pdfEscape = function pdfEscape(text) {
    return String(text).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\r/g, ' ').replace(/\n/g, ' ');
  };
  var createTextOverviewPdfBlob = function createTextOverviewPdfBlob(entries) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var fontRefName = '/F1';
    var lines = flattenPdfEntries(entries);
    var pages = splitLinesIntoPages(lines, 46);
    var pageWidth = 612;
    var pageHeight = 792;
    var marginLeft = 72;
    var marginTop = 72;
    var fontSize = 12;
    var leading = 14;
    var nextObjectId = 1;
    var bodies = {};
    var order = [];
    var reserveObject = function reserveObject() {
      var id = nextObjectId;
      nextObjectId += 1;
      order.push(id);
      bodies[id] = null;
      return id;
    };
    var setObjectBody = function setObjectBody(id, body) {
      bodies[id] = body;
    };
    var addObject = function addObject(body) {
      var id = reserveObject();
      setObjectBody(id, body);
      return id;
    };
    var fontRef = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
    var pagesRef = reserveObject();
    var pageRefs = [];
    for (var p = 0; p < pages.length; p += 1) {
      var pageLines = pages[p];
      var _content = 'BT\n';
      _content += "".concat(fontRefName, " ").concat(fontSize, " Tf\n");
      _content += "".concat(leading, " TL\n");
      _content += "".concat(marginLeft, " ").concat(pageHeight - marginTop, " Td\n");
      var firstLine = true;
      for (var l = 0; l < pageLines.length; l += 1) {
        var line = pageLines[l];
        if (!firstLine) {
          _content += 'T*\n';
        } else {
          firstLine = false;
        }
        if (!line) {
          continue;
        }
        _content += "(".concat(pdfEscape(line), ") Tj\n");
      }
      _content += 'ET';
      var streamBody = "<< /Length ".concat(_content.length, " >>\nstream\n").concat(_content, "\nendstream");
      var contentRef = addObject(streamBody);
      var pageBody = "<< /Type /Page /Parent ".concat(pagesRef, " 0 R /MediaBox [0 0 ").concat(pageWidth, " ").concat(pageHeight, "] /Contents ").concat(contentRef, " 0 R /Resources << /Font << ").concat(fontRefName, " ").concat(fontRef, " 0 R >> >> >>");
      var pageRef = addObject(pageBody);
      pageRefs.push(pageRef);
    }
    var kids = pageRefs.map(function (ref) {
      return "".concat(ref, " 0 R");
    }).join(' ');
    setObjectBody(pagesRef, "<< /Type /Pages /Count ".concat(pageRefs.length, " /Kids [").concat(kids, "] >>"));
    var creationDate = "D:".concat(now.getFullYear()).concat(padTwo(now.getMonth() + 1)).concat(padTwo(now.getDate())).concat(padTwo(now.getHours())).concat(padTwo(now.getMinutes())).concat(padTwo(now.getSeconds()));
    var infoParts = ['/Producer (Cine Power Planner)', '/Creator (Cine Power Planner Overview Export)', "/CreationDate (".concat(creationDate, ")")];
    if (options && options.title) {
      var normalizedTitle = normalizeForPdf(options.title);
      if (normalizedTitle) {
        infoParts.push("/Title (".concat(pdfEscape(normalizedTitle), ")"));
      }
    }
    var infoRef = addObject("<< ".concat(infoParts.join(' '), " >>"));
    var catalogRef = addObject("<< /Type /Catalog /Pages ".concat(pagesRef, " 0 R >>"));
    var pdf = '%PDF-1.4\n';
    var offsets = [0];
    var offset = pdf.length;
    for (var i = 0; i < order.length; i += 1) {
      var id = order[i];
      var body = bodies[id];
      if (body === null || body === undefined) {
        throw new Error('Missing PDF object body.');
      }
      var objectString = "".concat(id, " 0 obj\n").concat(body, "\nendobj\n");
      offsets.push(offset);
      pdf += objectString;
      offset += objectString.length;
    }
    var startXref = offset;
    pdf += "xref\n0 ".concat(order.length + 1, "\n");
    pdf += '0000000000 65535 f \n';
    for (var _i = 1; _i < offsets.length; _i += 1) {
      pdf += "".concat(offsets[_i].toString().padStart(10, '0'), " 00000 n \n");
    }
    pdf += "trailer\n<< /Size ".concat(order.length + 1, " /Root ").concat(catalogRef, " 0 R /Info ").concat(infoRef, " 0 R >>\nstartxref\n").concat(startXref, "\n%%EOF");
    return new Blob([pdf], {
      type: 'application/pdf'
    });
  };
  var downloadBlobAsFile = function () {
    var _ref = _asyncToGenerator(_regenerator().m(function _callee(blob, filename) {
      var defaultName, handle, writable, url, link, parentNode, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (blob instanceof Blob) {
              _context.n = 1;
              break;
            }
            throw new Error('PDF export failed: invalid file data.');
          case 1:
            defaultName = filename || 'overview.pdf';
            if (!(typeof window !== 'undefined' && typeof window.showSaveFilePicker === 'function')) {
              _context.n = 10;
              break;
            }
            _context.p = 2;
            _context.n = 3;
            return window.showSaveFilePicker({
              suggestedName: defaultName,
              types: [{
                description: 'PDF',
                accept: {
                  'application/pdf': ['.pdf']
                }
              }]
            });
          case 3:
            handle = _context.v;
            if (!handle) {
              _context.n = 7;
              break;
            }
            _context.n = 4;
            return handle.createWritable();
          case 4:
            writable = _context.v;
            _context.n = 5;
            return writable.write(blob);
          case 5:
            _context.n = 6;
            return writable.close();
          case 6:
            return _context.a(2, true);
          case 7:
            _context.n = 10;
            break;
          case 8:
            _context.p = 8;
            _t = _context.v;
            if (!(_t && _t.name === 'AbortError')) {
              _context.n = 9;
              break;
            }
            return _context.a(2, false);
          case 9:
            console.warn('Save file picker unavailable, falling back to download link.', _t);
          case 10:
            url = URL.createObjectURL(blob);
            try {
              link = document.createElement('a');
              link.href = url;
              link.download = defaultName;
              link.rel = 'noopener';
              link.style.display = 'none';
              parentNode = document.body || document.documentElement;
              if (parentNode) {
                parentNode.appendChild(link);
              }
              link.click();
              if (parentNode && link.parentNode === parentNode) {
                parentNode.removeChild(link);
              } else {
                link.remove();
              }
            } finally {
              setTimeout(function () {
                URL.revokeObjectURL(url);
              }, 0);
            }
            return _context.a(2, true);
        }
      }, _callee, null, [[2, 8]]);
    }));
    return function downloadBlobAsFile(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  var htmlToPlainTextLines = function htmlToPlainTextLines(html) {
    if (!html) {
      return [];
    }
    var container = document.createElement('div');
    container.innerHTML = html;
    var blockSelectors = ['p', 'div', 'section', 'li', 'h1', 'h2', 'h3', 'h4', 'tr', 'table', 'thead', 'tbody', 'tfoot', 'caption'];
    for (var b = 0; b < blockSelectors.length; b += 1) {
      var elements = container.getElementsByTagName(blockSelectors[b]);
      for (var i = 0; i < elements.length; i += 1) {
        elements[i].appendChild(document.createTextNode('\n'));
      }
    }
    var lineBreaks = container.querySelectorAll('br');
    for (var _i2 = 0; _i2 < lineBreaks.length; _i2 += 1) {
      var br = lineBreaks[_i2];
      if (br && br.parentNode) {
        br.parentNode.replaceChild(document.createTextNode('\n'), br);
      }
    }
    var text = container.textContent || '';
    return text.split('\n').map(function (line) {
      return line.replace(/\s+/g, ' ').trim();
    }).filter(Boolean);
  };
  var pdfEntries = [];
  var pdfPushLine = function pdfPushLine(text) {
    var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (text === null || text === undefined) {
      return;
    }
    var value = String(text);
    if (!value.trim()) {
      return;
    }
    pdfEntries.push({
      type: 'line',
      text: value,
      indent: indent
    });
  };
  var pdfPushBlank = function pdfPushBlank() {
    if (!pdfEntries.length || pdfEntries[pdfEntries.length - 1].type === 'blank') {
      return;
    }
    pdfEntries.push({
      type: 'blank'
    });
  };
  var pdfPushSectionHeading = function pdfPushSectionHeading(text) {
    if (!text) {
      return;
    }
    if (pdfEntries.length) {
      pdfPushBlank();
    }
    pdfPushLine(text);
  };
  var pdfPushList = function pdfPushList(items) {
    var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '- ';
    if (!Array.isArray(items)) {
      return;
    }
    for (var i = 0; i < items.length; i += 1) {
      var item = items[i];
      if (!item) {
        continue;
      }
      pdfPushLine("".concat(prefix).concat(item), indent);
    }
  };
  var mmToPt = function mmToPt(value) {
    return value * 72 / 25.4;
  };
  var formatPdfNumber = function formatPdfNumber(value) {
    if (!Number.isFinite(value)) {
      return '0';
    }
    var rounded = Math.round(value * 1000) / 1000;
    if (Math.abs(rounded) < 1e-6) {
      return '0';
    }
    return rounded.toString();
  };
  var getTextEncoder = function getTextEncoder() {
    if (typeof TextEncoder === 'function') {
      return new TextEncoder();
    }
    return null;
  };
  var encodeText = function encodeText(text, encoder) {
    if (encoder) {
      return encoder.encode(text);
    }
    var safeText = String(text || '');
    var bytes = new Uint8Array(safeText.length);
    for (var i = 0; i < safeText.length; i += 1) {
      bytes[i] = safeText.charCodeAt(i) & 0xFF;
    }
    return bytes;
  };
  var ensureFontsReady = function () {
    var _ref2 = _asyncToGenerator(_regenerator().m(function _callee2(doc) {
      var _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (!(!doc || !doc.fonts || !doc.fonts.ready || typeof doc.fonts.ready.then !== 'function')) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            _context2.p = 1;
            _context2.n = 2;
            return doc.fonts.ready;
          case 2:
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t2 = _context2.v;
            console.warn('Font loading check failed during PDF export.', _t2);
          case 4:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 3]]);
    }));
    return function ensureFontsReady(_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  var waitForImagesToLoad = function () {
    var _ref3 = _asyncToGenerator(_regenerator().m(function _callee3(root) {
      var images, promises;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (!(!root || typeof root.querySelectorAll !== 'function')) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            images = Array.from(root.querySelectorAll('img'));
            if (root.tagName === 'IMG') {
              images.push(root);
            }
            promises = images.map(function (img) {
              return new Promise(function (resolve) {
                if (!img) {
                  resolve();
                  return;
                }
                if (img.complete && img.naturalWidth !== 0) {
                  resolve();
                  return;
                }
                var _finalize = function finalize() {
                  img.removeEventListener('load', _finalize);
                  img.removeEventListener('error', _finalize);
                  resolve();
                };
                img.addEventListener('load', _finalize, {
                  once: true
                });
                img.addEventListener('error', _finalize, {
                  once: true
                });
              });
            });
            _context3.n = 2;
            return Promise.all(promises);
          case 2:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return function waitForImagesToLoad(_x4) {
      return _ref3.apply(this, arguments);
    };
  }();
  var TEXT_NODE = typeof Node !== 'undefined' ? Node.TEXT_NODE : 3;
  var ELEMENT_NODE = typeof Node !== 'undefined' ? Node.ELEMENT_NODE : 1;
  var _cloneNodeWithComputedStyles = function cloneNodeWithComputedStyles(node) {
    if (!node) {
      return null;
    }
    if (node.nodeType === TEXT_NODE) {
      return node.cloneNode(true);
    }
    if (node.nodeType !== ELEMENT_NODE) {
      return node.cloneNode(true);
    }
    var clone = node.cloneNode(false);
    var win = node.ownerDocument ? node.ownerDocument.defaultView : null;
    if (win && typeof win.getComputedStyle === 'function') {
      var computed = win.getComputedStyle(node);
      if (computed) {
        var styles = [];
        for (var i = 0; i < computed.length; i += 1) {
          var prop = computed[i];
          if (!prop) {
            continue;
          }
          styles.push("".concat(prop, ":").concat(computed.getPropertyValue(prop), ";"));
        }
        if (styles.length) {
          clone.setAttribute('style', styles.join(''));
        }
      }
    }
    var childNodes = node.childNodes;
    for (var _i3 = 0; _i3 < childNodes.length; _i3 += 1) {
      var childClone = _cloneNodeWithComputedStyles(childNodes[_i3]);
      if (childClone) {
        clone.appendChild(childClone);
      }
    }
    return clone;
  };
  var renderElementToCanvas = function () {
    var _ref4 = _asyncToGenerator(_regenerator().m(function _callee4(element) {
      var options,
        doc,
        rect,
        width,
        height,
        scale,
        clone,
        wrapper,
        serialized,
        svg,
        svgUrl,
        image,
        canvas,
        ctx,
        _args4 = arguments;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            if (!(!element || typeof document === 'undefined' || typeof window === 'undefined')) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2, null);
          case 1:
            doc = element.ownerDocument || document;
            rect = element.getBoundingClientRect();
            width = Math.max(1, Math.ceil(rect.width));
            height = Math.max(1, Math.ceil(element.scrollHeight || rect.height));
            scale = Math.max(1, Math.min(3, options.scale || window.devicePixelRatio || 1));
            clone = _cloneNodeWithComputedStyles(element);
            if (clone) {
              _context4.n = 2;
              break;
            }
            return _context4.a(2, null);
          case 2:
            wrapper = doc.createElement('div');
            wrapper.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
            wrapper.setAttribute('style', "position:relative;box-sizing:border-box;width:".concat(width, "px;height:auto;background:#ffffff;"));
            wrapper.appendChild(clone);
            serialized = new XMLSerializer().serializeToString(wrapper);
            svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"".concat(width, "\" height=\"").concat(height, "\"><foreignObject width=\"100%\" height=\"100%\">").concat(serialized, "</foreignObject></svg>");
            svgUrl = "data:image/svg+xml;charset=utf-8,".concat(encodeURIComponent(svg));
            image = new Image();
            image.decoding = 'async';
            image.src = svgUrl;
            _context4.n = 3;
            return new Promise(function (resolve, reject) {
              var timer = setTimeout(function () {
                resolve();
              }, 2000);
              image.onload = function () {
                clearTimeout(timer);
                resolve();
              };
              image.onerror = function (error) {
                clearTimeout(timer);
                reject(error);
              };
            });
          case 3:
            canvas = doc.createElement('canvas');
            canvas.width = Math.max(1, Math.ceil(width * scale));
            canvas.height = Math.max(1, Math.ceil(height * scale));
            ctx = canvas.getContext('2d');
            if (ctx) {
              _context4.n = 4;
              break;
            }
            return _context4.a(2, null);
          case 4:
            ctx.scale(scale, scale);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(image, 0, 0);
            return _context4.a(2, {
              canvas: canvas,
              width: width,
              height: height,
              scale: scale
            });
        }
      }, _callee4);
    }));
    return function renderElementToCanvas(_x5) {
      return _ref4.apply(this, arguments);
    };
  }();
  var dataUrlToUint8 = function dataUrlToUint8(dataUrl) {
    if (!dataUrl || typeof dataUrl !== 'string') {
      return new Uint8Array(0);
    }
    var commaIndex = dataUrl.indexOf(',');
    var base64 = commaIndex >= 0 ? dataUrl.slice(commaIndex + 1) : dataUrl;
    var binary = atob(base64);
    var length = binary.length;
    var bytes = new Uint8Array(length);
    for (var i = 0; i < length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  };
  var createImageBasedPdf = function createImageBasedPdf(pages) {
    var metadata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var pageWidthPt = metadata.pageWidthPt || mmToPt(210);
    var pageHeightPt = metadata.pageHeightPt || mmToPt(297);
    var marginPt = metadata.marginPt || mmToPt(10);
    var encoder = getTextEncoder();
    var objects = [];
    var registerObject = function registerObject(factory) {
      var id = objects.length + 1;
      objects.push({
        id: id,
        factory: factory
      });
      return id;
    };
    var pagesCount = pages.length;
    var imageIds = [];
    var contentIds = [];
    var pageIds = [];
    var pagesRootId = null;
    var blankPageContentId = null;
    var blankPageId = null;
    var _loop = function _loop(i) {
      var page = pages[i];
      var imageId = registerObject(function () {
        var header = "<< /Type /XObject /Subtype /Image /Width ".concat(page.pixelWidth, " /Height ").concat(page.pixelHeight, " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ").concat(page.data.length, " >>\nstream\n");
        return [header, page.data, '\nendstream\n'];
      });
      imageIds.push(imageId);
      var translateY = pageHeightPt - marginPt - page.heightPt;
      var stream = "q ".concat(formatPdfNumber(page.widthPt), " 0 0 ").concat(formatPdfNumber(page.heightPt), " ").concat(formatPdfNumber(marginPt), " ").concat(formatPdfNumber(translateY), " cm /Im").concat(i, " Do Q\n");
      var contentId = registerObject(function () {
        return ["<< /Length ".concat(stream.length, " >>\nstream\n"), stream, '\nendstream\n'];
      });
      contentIds.push(contentId);
      var pageId = registerObject(function () {
        return ["<< /Type /Page /Parent ".concat(pagesRootId, " 0 R /Resources << /XObject << /Im").concat(i, " ").concat(imageId, " 0 R >> /ProcSet [/PDF /ImageC] >> /MediaBox [0 0 ").concat(formatPdfNumber(pageWidthPt), " ").concat(formatPdfNumber(pageHeightPt), "] /Contents ").concat(contentId, " 0 R >>\n")];
      });
      pageIds.push(pageId);
    };
    for (var i = 0; i < pagesCount; i += 1) {
      _loop(i);
    }
    pagesRootId = registerObject(function () {
      if (!pageIds.length) {
        return ["<< /Type /Pages /Count 1 /Kids [".concat(blankPageId, " 0 R] >>\n")];
      }
      var kids = pageIds.map(function (id) {
        return "".concat(id, " 0 R");
      }).join(' ');
      return ["<< /Type /Pages /Count ".concat(pageIds.length, " /Kids [").concat(kids, "] >>\n")];
    });
    if (!pageIds.length) {
      blankPageContentId = registerObject(function () {
        return ['<< /Length 0 >>\nstream\n\nendstream\n'];
      });
      blankPageId = registerObject(function () {
        return ["<< /Type /Page /Parent ".concat(pagesRootId, " 0 R /MediaBox [0 0 ").concat(formatPdfNumber(pageWidthPt), " ").concat(formatPdfNumber(pageHeightPt), "] /Contents ").concat(blankPageContentId, " 0 R >>\n")];
      });
    }
    var infoId = registerObject(function () {
      var nowDate = new Date();
      var pad = function pad(value) {
        return String(value).padStart(2, '0');
      };
      var creationDate = "D:".concat(nowDate.getFullYear()).concat(pad(nowDate.getMonth() + 1)).concat(pad(nowDate.getDate())).concat(pad(nowDate.getHours())).concat(pad(nowDate.getMinutes())).concat(pad(nowDate.getSeconds()));
      var entries = ['/Producer (Camera Power Planner)', '/Creator (Camera Power Planner Overview Export)', "/CreationDate (".concat(creationDate, ")")];
      if (metadata.title) {
        var normalizedTitle = normalizeForPdf(metadata.title);
        if (normalizedTitle) {
          entries.push("/Title (".concat(pdfEscape(normalizedTitle), ")"));
        }
      }
      return ["<< ".concat(entries.join(' '), " >>\n")];
    });
    var catalogId = registerObject(function () {
      return ["<< /Type /Catalog /Pages ".concat(pagesRootId, " 0 R >>\n")];
    });
    var chunks = [];
    var position = 0;
    var offsets = [0];
    var pushChunk = function pushChunk(chunk) {
      chunks.push(chunk);
      position += chunk.length;
    };
    var writeString = function writeString(text) {
      var bytes = encodeText(text, encoder);
      pushChunk(bytes);
    };
    writeString('%PDF-1.4\n');
    for (var _i4 = 0; _i4 < objects.length; _i4 += 1) {
      var object = objects[_i4];
      offsets.push(position);
      writeString("".concat(object.id, " 0 obj\n"));
      var parts = object.factory ? object.factory() : [];
      for (var j = 0; j < parts.length; j += 1) {
        var part = parts[j];
        if (typeof part === 'string') {
          writeString(part);
        } else if (part instanceof Uint8Array) {
          pushChunk(part);
        }
      }
      writeString('endobj\n');
    }
    var xrefPosition = position;
    writeString("xref\n0 ".concat(objects.length + 1, "\n"));
    writeString('0000000000 65535 f \n');
    for (var _i5 = 1; _i5 < offsets.length; _i5 += 1) {
      var line = "".concat(offsets[_i5].toString().padStart(10, '0'), " 00000 n \n");
      writeString(line);
    }
    var trailerParts = ["trailer\n<< /Size ".concat(objects.length + 1, " /Root ").concat(catalogId, " 0 R /Info ").concat(infoId, " 0 R >>\nstartxref\n").concat(xrefPosition, "\n%%EOF")];
    trailerParts.forEach(function (part) {
      return writeString(part);
    });
    return new Blob(chunks, {
      type: 'application/pdf'
    });
  };
  var renderOverviewPdf = function () {
    var _ref5 = _asyncToGenerator(_regenerator().m(function _callee5(element) {
      var options,
        doc,
        pixelRatio,
        renderScale,
        rendered,
        canvas,
        width,
        height,
        scale,
        pageWidthPt,
        pageHeightPt,
        marginPt,
        availableWidthPt,
        widthScale,
        availableHeightPt,
        pageHeightPxLimit,
        pages,
        offsetPx,
        sliceHeightPx,
        pageCanvas,
        ctx,
        dataUrl,
        _args5 = arguments,
        _t3;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
            if (!(!element || typeof window === 'undefined' || typeof document === 'undefined')) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2, null);
          case 1:
            _context5.p = 1;
            doc = element.ownerDocument || document;
            _context5.n = 2;
            return ensureFontsReady(doc);
          case 2:
            _context5.n = 3;
            return waitForImagesToLoad(element);
          case 3:
            pixelRatio = typeof window.devicePixelRatio === 'number' ? window.devicePixelRatio : 1;
            renderScale = Math.max(1.5, Math.min(2.5, pixelRatio * 1.25));
            _context5.n = 4;
            return renderElementToCanvas(element, {
              scale: renderScale
            });
          case 4:
            rendered = _context5.v;
            if (rendered) {
              _context5.n = 5;
              break;
            }
            return _context5.a(2, null);
          case 5:
            canvas = rendered.canvas, width = rendered.width, height = rendered.height, scale = rendered.scale;
            pageWidthPt = mmToPt(210);
            pageHeightPt = mmToPt(297);
            marginPt = mmToPt(10);
            availableWidthPt = pageWidthPt - marginPt * 2;
            widthScale = availableWidthPt / Math.max(1, width);
            availableHeightPt = pageHeightPt - marginPt * 2;
            pageHeightPxLimit = Math.max(1, Math.floor(availableHeightPt / widthScale));
            pages = [];
            offsetPx = 0;
          case 6:
            if (!(offsetPx < height)) {
              _context5.n = 8;
              break;
            }
            sliceHeightPx = Math.min(pageHeightPxLimit, height - offsetPx);
            pageCanvas = doc.createElement('canvas');
            pageCanvas.width = Math.max(1, Math.ceil(width * scale));
            pageCanvas.height = Math.max(1, Math.ceil(sliceHeightPx * scale));
            ctx = pageCanvas.getContext('2d');
            if (ctx) {
              _context5.n = 7;
              break;
            }
            return _context5.a(3, 8);
          case 7:
            ctx.drawImage(canvas, 0, offsetPx * scale, width * scale, sliceHeightPx * scale, 0, 0, width * scale, sliceHeightPx * scale);
            dataUrl = pageCanvas.toDataURL('image/jpeg', 0.92);
            pages.push({
              data: dataUrlToUint8(dataUrl),
              pixelWidth: pageCanvas.width,
              pixelHeight: pageCanvas.height,
              widthPt: availableWidthPt,
              heightPt: sliceHeightPx * widthScale
            });
            offsetPx += sliceHeightPx;
            _context5.n = 6;
            break;
          case 8:
            if (pages.length) {
              _context5.n = 9;
              break;
            }
            return _context5.a(2, createImageBasedPdf([], {
              pageWidthPt: pageWidthPt,
              pageHeightPt: pageHeightPt,
              marginPt: marginPt,
              title: options.title
            }));
          case 9:
            return _context5.a(2, createImageBasedPdf(pages, {
              pageWidthPt: pageWidthPt,
              pageHeightPt: pageHeightPt,
              marginPt: marginPt,
              title: options.title
            }));
          case 10:
            _context5.p = 10;
            _t3 = _context5.v;
            console.error('Unable to render overview PDF using layout capture.', _t3);
            return _context5.a(2, null);
        }
      }, _callee5, null, [[1, 10]]);
    }));
    return function renderOverviewPdf(_x6) {
      return _ref5.apply(this, arguments);
    };
  }();
  var addHtmlAsPdfLines = function addHtmlAsPdfLines(html) {
    var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var lines = htmlToPlainTextLines(html);
    for (var i = 0; i < lines.length; i += 1) {
      pdfPushLine(lines[i], indent);
    }
  };
  var generatedOnDisplayLabel = ensureLabelSuffix(generatedOnLabel);
  var setupNameDisplayLabel = ensureLabelSuffix(t.setupNameLabel || 'Project Name');
  pdfPushLine(t.overviewTitle || 'Project Overview');
  pdfPushBlank();
  pdfPushLine("".concat(setupNameDisplayLabel, " ").concat(setupName || '-'));
  pdfPushLine("".concat(generatedOnDisplayLabel, " ").concat(dateTimeString));
  var sectionTextMap = {};
  var deviceListHtml = '<div class="device-category-container">';
  var sections = {};
  var sectionOrder = [];
  var addToSection = function addToSection(key, itemHtml) {
    if (!sections[key]) {
      sections[key] = [];
      sectionOrder.push(key);
    }
    sections[key].push(itemHtml);
    if (!sectionTextMap[key]) {
      sectionTextMap[key] = [];
    }
    var textLines = htmlToPlainTextLines(itemHtml);
    if (textLines.length) {
      sectionTextMap[key].push(textLines.join(' — '));
    }
  };
  var processSelectForOverview = function processSelectForOverview(selectElement, headingKey, category) {
    var subcategory = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    if (selectElement.value && selectElement.value !== "None") {
      var deviceKey = selectElement.value;
      var deviceName = selectElement.options[selectElement.selectedIndex].text;
      var deviceInfo;
      if (subcategory) {
        deviceInfo = devices[category] && devices[category][subcategory] && devices[category][subcategory][deviceKey];
      } else {
        deviceInfo = devices[category] && devices[category][deviceKey];
      }
      var safeName = escapeHtmlSafe(deviceName);
      var details = '';
      if (deviceInfo !== undefined && deviceInfo !== null) {
        var connectors = summarizeConnectors(deviceInfo);
        var latencyLabel = t.videoLatencyLabel || t.monitorLatencyLabel || 'Latency:';
        var frequencyLabel = t.videoFrequencyLabel || 'Frequency:';
        var infoBoxes = (deviceInfo.latencyMs !== undefined ? "<div class=\"info-box video-conn\"><strong>".concat(escapeHtmlSafe(latencyLabel), "</strong> ").concat(escapeHtmlSafe(String(deviceInfo.latencyMs)), "</div>") : '') + (deviceInfo.frequency ? "<div class=\"info-box video-conn\"><strong>".concat(escapeHtmlSafe(frequencyLabel), "</strong> ").concat(escapeHtmlSafe(String(deviceInfo.frequency)), "</div>") : '');
        details = connectors + infoBoxes;
      }
      addToSection(headingKey, "<div class=\"device-block\"><strong>".concat(safeName, "</strong>").concat(details, "</div>"));
    }
  };
  processSelectForOverview(cameraSelect, 'category_cameras', 'cameras');
  processSelectForOverview(monitorSelect, 'category_monitors', 'monitors');
  processSelectForOverview(videoSelect, 'category_video', 'video');
  processSelectForOverview(distanceSelect, 'category_fiz_distance', 'fiz', 'distance');
  motorSelects.forEach(function (sel) {
    return processSelectForOverview(sel, 'category_fiz_motors', 'fiz', 'motors');
  });
  controllerSelects.forEach(function (sel) {
    return processSelectForOverview(sel, 'category_fiz_controllers', 'fiz', 'controllers');
  });
  processSelectForOverview(batterySelect, 'category_batteries', 'batteries');
  processSelectForOverview(hotswapSelect, 'category_batteryHotswaps', 'batteryHotswaps');
  sectionOrder.forEach(function (key) {
    var heading = t[key] || key;
    var icon = overviewSectionIcons[key] || '';
    var iconHtml = icon && typeof iconMarkup === 'function' ? iconMarkup(icon, 'category-icon') : icon ? "<span class=\"category-icon icon-glyph\" data-icon-font=\"uicons\" aria-hidden=\"true\">".concat(icon, "</span>") : '';
    var isFizList = key === 'category_fiz_motors' || key === 'category_fiz_controllers';
    var gridClasses = isFizList ? 'device-block-grid two-column fiz-single-column' : 'device-block-grid single-column';
    deviceListHtml += "<div class=\"device-category\"><h3>".concat(iconHtml).concat(heading, "</h3><div class=\"").concat(gridClasses, "\">").concat(sections[key].join(''), "</div></div>");
  });
  deviceListHtml += '</div>';
  if (sectionOrder.length) {
    pdfPushSectionHeading(t.overviewDeviceSelectionHeading || t.deviceSelectionHeading || 'Camera Setup Devices');
    sectionOrder.forEach(function (key, index) {
      var heading = t[key] || key;
      pdfPushLine(heading);
      pdfPushList(sectionTextMap[key] || [], 2);
      if (index < sectionOrder.length - 1) {
        pdfPushBlank();
      }
    });
  }
  var breakdownHtml = breakdownListElem.innerHTML;
  var batteryLifeUnitElem = document.getElementById("batteryLifeUnit");
  var powerDiagramElem = typeof document !== 'undefined' ? document.getElementById('powerDiagram') : null;
  var powerDiagramHtml = '';
  if (powerDiagramElem && !powerDiagramElem.classList.contains('hidden') && powerDiagramElem.innerHTML.trim().length > 0) {
    var clone = powerDiagramElem.cloneNode(true);
    clone.id = 'powerDiagramOverview';
    clone.classList.remove('hidden');
    clone.classList.add('power-diagram');
    var bar = clone.querySelector('#powerDiagramBar');
    if (bar) {
      bar.id = 'powerDiagramBarOverview';
    }
    var legend = clone.querySelector('#powerDiagramLegend');
    if (legend) {
      legend.id = 'powerDiagramLegendOverview';
      legend.classList.add('power-diagram-legend');
    }
    var maxPowerText = clone.querySelector('#maxPowerText');
    if (maxPowerText) {
      maxPowerText.id = 'maxPowerTextOverview';
      maxPowerText.classList.add('power-diagram-note');
    }
    powerDiagramHtml = clone.outerHTML;
  }
  var resultsHtml = "\n        <ul id=\"breakdownList\">".concat(breakdownHtml, "</ul>\n        ").concat(powerDiagramHtml, "\n        <p><strong>").concat(t.totalPowerLabel, "</strong> ").concat(totalPowerElem.textContent, " W</p>\n        <p><strong>").concat(t.totalCurrent144Label, "</strong> ").concat(totalCurrent144Elem.textContent, " A</p>\n        <p><strong>").concat(t.totalCurrent12Label, "</strong> ").concat(totalCurrent12Elem.textContent, " A</p>\n        <p><strong>").concat(t.batteryLifeLabel, "</strong> ").concat(batteryLifeElem.textContent, " ").concat(batteryLifeUnitElem ? batteryLifeUnitElem.textContent : '', "</p>\n        <p><strong>").concat(t.batteryCountLabel, "</strong> ").concat(batteryCountElem.textContent, "</p>\n    ");
  var severityClassMap = {
    danger: 'status-message--danger',
    warning: 'status-message--warning',
    success: 'status-message--success',
    info: 'status-message--info'
  };
  var extractSeverityClass = function extractSeverityClass(element) {
    if (!element) return '';
    var datasetLevel = element.dataset ? element.dataset.statusLevel : element.getAttribute && element.getAttribute('data-status-level');
    if (datasetLevel && severityClassMap[datasetLevel]) {
      return severityClassMap[datasetLevel];
    }
    if (element.classList) {
      return Object.values(severityClassMap).find(function (cls) {
        return element.classList.contains(cls);
      }) || '';
    }
    var classAttr = typeof element.getAttribute === 'function' ? element.getAttribute('class') : '';
    if (classAttr) {
      var classes = classAttr.split(/\s+/);
      return Object.values(severityClassMap).find(function (cls) {
        return classes.includes(cls);
      }) || '';
    }
    return '';
  };
  var buildStatusMarkup = function buildStatusMarkup(element) {
    if (!element || element.textContent.trim() === '') {
      return '';
    }
    var classes = ['status-message'];
    var severityClass = extractSeverityClass(element);
    if (severityClass) {
      classes.push(severityClass);
    }
    return "<p class=\"".concat(classes.join(' '), "\">").concat(escapeHtmlSafe(element.textContent), "</p>");
  };
  var warningHtml = buildStatusMarkup(pinWarnElem) + buildStatusMarkup(dtapWarnElem);
  var resultsSectionHtml = "\n        <section id=\"resultsSection\" class=\"results-section print-section\">\n            <h2>".concat(t.resultsHeading, "</h2>\n            <div class=\"results-body\">\n                ").concat(resultsHtml, "\n                ").concat(warningHtml ? "<div class=\"results-warnings\">".concat(warningHtml, "</div>") : '', "\n            </div>\n        </section>\n    ");
  var resultsLinesForPdf = ["".concat(ensureLabelSuffix(t.totalPowerLabel || 'Total Power'), " ").concat(totalPowerElem.textContent, " W"), "".concat(ensureLabelSuffix(t.totalCurrent144Label || 'Total Current (14.4V)'), " ").concat(totalCurrent144Elem.textContent, " A"), "".concat(ensureLabelSuffix(t.totalCurrent12Label || 'Total Current (12V)'), " ").concat(totalCurrent12Elem.textContent, " A"), "".concat(ensureLabelSuffix(t.batteryLifeLabel || 'Estimated Battery Life'), " ").concat(batteryLifeElem.textContent, " ").concat(batteryLifeUnitElem ? batteryLifeUnitElem.textContent : '').trim(), "".concat(ensureLabelSuffix(t.batteryCountLabel || 'Battery Count'), " ").concat(batteryCountElem.textContent)].filter(function (line) {
    return line && line.trim();
  });
  if (resultsLinesForPdf.length) {
    pdfPushSectionHeading(t.resultsHeading || 'Power Summary');
    resultsLinesForPdf.forEach(function (line) {
      return pdfPushLine(line, 2);
    });
  }
  if (warningHtml) {
    var warningLines = htmlToPlainTextLines(warningHtml);
    if (warningLines.length) {
      pdfPushSectionHeading(defaultPdfWarningHeading);
      pdfPushList(warningLines, 2, '! ');
    }
  }
  var batteryComparisonSection = typeof document !== 'undefined' ? document.getElementById('batteryComparison') : null;
  var isSectionRenderable = function isSectionRenderable(section) {
    if (!section) return false;
    if (section.hasAttribute('hidden')) return false;
    if (section.classList && section.classList.contains('hidden')) return false;
    if (section.style && section.style.display === 'none') return false;
    if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
      var computed = window.getComputedStyle(section);
      if (computed.display === 'none' || computed.visibility === 'hidden') {
        return false;
      }
    }
    var table = section.querySelector('table');
    return table ? table.innerHTML.trim().length > 0 : false;
  };
  var batteryComparisonHtml = '';
  if (isSectionRenderable(batteryComparisonSection)) {
    var _clone = batteryComparisonSection.cloneNode(true);
    _clone.id = 'batteryComparisonOverview';
    _clone.classList.add('print-section', 'battery-comparison-section');
    _clone.removeAttribute('style');
    var heading = _clone.querySelector('#batteryComparisonHeading');
    if (heading) {
      heading.id = 'batteryComparisonOverviewHeading';
    }
    var container = _clone.querySelector('#batteryTableContainer');
    if (container) {
      container.id = 'batteryTableOverviewContainer';
    }
    var table = _clone.querySelector('#batteryTable');
    if (table) {
      table.removeAttribute('id');
    }
    batteryComparisonHtml = "<div class=\"page-break\"></div>".concat(_clone.outerHTML);
  }
  if (batteryComparisonHtml) {
    pdfPushSectionHeading(t.batteryComparisonHeading || 'Battery Comparison');
    addHtmlAsPdfLines(batteryComparisonHtml, 2);
  }
  var safeSetupName = escapeHtmlSafe(setupName);
  var diagramCss = getDiagramCss(false);
  var diagramAreaHtml = '';
  if (setupDiagramContainer) {
    var areaClone = setupDiagramContainer.cloneNode(true);
    var svg = areaClone.querySelector('svg');
    if (svg) {
      var style = document.createElement('style');
      style.textContent = diagramCss;
      svg.insertBefore(style, svg.firstChild);
    }
    diagramAreaHtml = areaClone.outerHTML;
  }
  var diagramLegendHtml = diagramLegend ? diagramLegend.outerHTML : '';
  var diagramHintHtml = diagramHint ? diagramHint.outerHTML : '';
  var diagramDescHtml = document.getElementById('diagramDesc') ? document.getElementById('diagramDesc').outerHTML : '';
  var diagramSectionHtml = diagramAreaHtml ? "<section id=\"setupDiagram\" class=\"diagram-section print-section\"><h2>".concat(t.setupDiagramHeading, "</h2>").concat(diagramDescHtml).concat(diagramAreaHtml).concat(diagramLegendHtml).concat(diagramHintHtml, "</section>") : '';
  if (diagramSectionHtml) {
    pdfPushSectionHeading(t.setupDiagramHeading || 'Connection Diagram');
    if (diagramDescHtml) {
      addHtmlAsPdfLines(diagramDescHtml, 2);
    }
    if (diagramLegendHtml) {
      addHtmlAsPdfLines(diagramLegendHtml, 2);
    }
    if (diagramHintHtml) {
      addHtmlAsPdfLines(diagramHintHtml, 2);
    }
    pdfPushLine(diagramPdfNote, 2);
  }
  var hasGeneratedGearList = function () {
    if (typeof document === 'undefined') return false;
    var container = document.getElementById('gearListOutput');
    if (!container) return false;
    if (container.classList && container.classList.contains('hidden')) {
      return false;
    }
    var trimmed = typeof container.innerHTML === 'string' ? container.innerHTML.trim() : '';
    if (!trimmed) return false;
    if (typeof container.querySelector === 'function') {
      var _table = container.querySelector('.gear-table');
      if (_table) return true;
    }
    return true;
  }();
  var gearListCombined = getCurrentGearListHtml();
  if (!gearListCombined && currentProjectInfo) {
    gearListCombined = generateGearListHtml(currentProjectInfo);
  }
  var projectSectionHtml = '';
  var gearSectionHtml = '';
  if (gearListCombined) {
    var parts = typeof splitGearListHtml === 'function' ? splitGearListHtml(gearListCombined) : {
      projectHtml: '',
      gearHtml: ''
    };
    if (parts.projectHtml) {
      projectSectionHtml = "<section id=\"projectRequirementsOutput\" class=\"print-section project-requirements-section\">".concat(parts.projectHtml, "</section>");
      pdfPushSectionHeading(t.projectRequirementsNav || 'Project Requirements');
      addHtmlAsPdfLines(parts.projectHtml, 2);
    }
    if (parts.gearHtml && hasGeneratedGearList) {
      gearSectionHtml = "<section id=\"gearListOutput\" class=\"gear-list-section\">".concat(parts.gearHtml, "</section>");
      pdfPushSectionHeading(t.gearListNav || 'Gear List');
      addHtmlAsPdfLines(parts.gearHtml, 2);
    }
  }
  var gearListHtmlCombined = projectSectionHtml || gearSectionHtml ? "".concat(projectSectionHtml || '').concat(gearSectionHtml || '') : '';
  var deleteGearListLabel = t.deleteGearListBtn || 'Delete Gear List';
  var deleteGearListHelp = t.deleteGearListBtnHelp || deleteGearListLabel;
  var gearListActionsHtml = gearListHtmlCombined ? "<div class=\"overview-gear-actions\"><button id=\"overviewDeleteGearListBtn\" class=\"overview-delete-gear-btn\" title=\"".concat(escapeHtmlSafe(deleteGearListHelp), "\" data-help=\"").concat(escapeHtmlSafe(deleteGearListHelp), "\"><span class=\"btn-icon icon-glyph\" aria-hidden=\"true\" data-icon-font=\"essential\">&#xF254;</span>").concat(escapeHtmlSafe(deleteGearListLabel), "</button></div>") : '';
  var logoHtml = customLogo ? "<img id=\"printLogo\" src=\"".concat(customLogo, "\" alt=\"Logo\" />") : '';
  var contentClass = customLogo ? 'logo-present' : '';
  var generatedOnDisplay = "".concat(escapeHtmlSafe(generatedOnDisplayLabel), " ").concat(escapeHtmlSafe(dateTimeString));
  var exportPdfLabel = t.exportPdfBtn || 'Export PDF';
  var exportIconHtml = function () {
    if (typeof iconMarkup === 'function' && ICON_GLYPHS && ICON_GLYPHS.fileExport) {
      try {
        return iconMarkup(ICON_GLYPHS.fileExport, 'btn-icon');
      } catch (error) {
        console.warn('Unable to render export icon for overview dialog.', error);
      }
    }
    return '<span class="btn-icon icon-glyph" aria-hidden="true" data-icon-font="uicons">&#xE7AB;</span>';
  }();
  var overviewHtml = "\n        <div id=\"overviewDialogContent\" class=\"".concat(contentClass, "\">\n            <div class=\"overview-actions\">\n                <button id=\"closeOverviewBtn\" class=\"back-btn\"><span class=\"btn-icon icon-glyph\" aria-hidden=\"true\" data-icon-font=\"essential\">&#xF131;</span>").concat(escapeHtmlSafe(t.backToAppBtn), "</button>\n                <button id=\"printOverviewBtn\" class=\"print-btn\"><span class=\"btn-icon icon-glyph\" aria-hidden=\"true\" data-icon-font=\"uicons\">&#xE7AB;</span>").concat(escapeHtmlSafe(t.printBtn), "</button>\n                <button id=\"exportPdfBtn\" class=\"print-btn export-pdf-btn\">").concat(exportIconHtml).concat(escapeHtmlSafe(exportPdfLabel), "</button>\n            </div>\n            ").concat(logoHtml, "\n            <h1>").concat(t.overviewTitle, "</h1>\n            <p><strong>").concat(t.setupNameLabel, "</strong> ").concat(safeSetupName, "</p>\n            <p><em>").concat(generatedOnDisplay, "</em></p>\n\n            <h2>").concat(t.overviewDeviceSelectionHeading || t.deviceSelectionHeading, "</h2>\n            ").concat(deviceListHtml, "\n\n            ").concat(resultsSectionHtml, "\n\n            ").concat(diagramSectionHtml, "\n\n            ").concat(gearListHtmlCombined, "\n            ").concat(gearListActionsHtml, "\n            ").concat(batteryComparisonHtml, "\n        </div>\n    ");
  var sanitizedProjectSegmentForFile = sanitizeTitleSegment(projectTitleSegment) || 'Project';
  var pdfFileName = "".concat(formattedDate, "_").concat(formattedTime, "_").concat(sanitizedProjectSegmentForFile, "_Overview.pdf");
  var pdfExportConfig = {
    entries: pdfEntries.slice(),
    fileName: pdfFileName,
    title: printDocumentTitle
  };
  var overviewDialog = document.getElementById('overviewDialog');
  overviewDialog.innerHTML = overviewHtml;
  var content = overviewDialog.querySelector('#overviewDialogContent');
  var applyThemeClasses = function applyThemeClasses(target) {
    if (!target || typeof document === 'undefined') return;
    var themeClasses = ['dark-mode', 'light-mode', 'pink-mode', 'dark-accent-boost', 'high-contrast', 'reduce-motion', 'relaxed-spacing'];
    var activeClasses = new Set([].concat(_toConsumableArray(document.documentElement ? Array.from(document.documentElement.classList) : []), _toConsumableArray(document.body ? Array.from(document.body.classList) : [])));
    themeClasses.forEach(function (themeClass) {
      target.classList.toggle(themeClass, activeClasses.has(themeClass));
    });
  };
  applyThemeClasses(content);
  var closeBtn = overviewDialog.querySelector('#closeOverviewBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      closeDialog(overviewDialog);
    });
  }
  var overviewDeleteBtn = overviewDialog.querySelector('#overviewDeleteGearListBtn');
  if (overviewDeleteBtn) {
    var supportsCustomEvents = typeof document !== 'undefined' && typeof document.addEventListener === 'function';
    if (supportsCustomEvents) {
      function cleanup() {
        document.removeEventListener('gearlist:deleted', handleGearListDeleted);
        overviewDialog.removeEventListener('close', cleanup);
      }
      function handleGearListDeleted() {
        cleanup();
        if (overviewDialog && overviewDialog.open) {
          generatePrintableOverview();
        }
      }
      document.addEventListener('gearlist:deleted', handleGearListDeleted);
      overviewDialog.addEventListener('close', cleanup, {
        once: true
      });
    }
    overviewDeleteBtn.addEventListener('click', function (event) {
      event.preventDefault();
      var usedFallback = false;
      if (typeof deleteCurrentGearList === 'function') {
        try {
          var deleted = deleteCurrentGearList();
          if (!supportsCustomEvents && deleted) {
            generatePrintableOverview();
          }
          return;
        } catch (error) {
          console.warn('Failed to delete gear list from overview button', error);
          usedFallback = true;
        }
      } else {
        usedFallback = true;
      }
      if ((usedFallback || typeof deleteCurrentGearList !== 'function') && supportsCustomEvents) {
        try {
          document.dispatchEvent(new CustomEvent('gearlist:delete-requested', {
            detail: {
              source: 'overview'
            }
          }));
        } catch (error) {
          if (typeof document.createEvent === 'function') {
            var fallbackEvent = document.createEvent('CustomEvent');
            fallbackEvent.initCustomEvent('gearlist:delete-requested', false, false, {
              source: 'overview'
            });
            document.dispatchEvent(fallbackEvent);
          } else {
            console.warn('Unable to request gear list deletion from overview', error);
          }
        }
      }
    });
  }
  var removePrintMediaListener = null;
  var afterPrintRegistered = false;
  var _closeAfterPrint = function closeAfterPrint() {
    if (removePrintMediaListener) {
      removePrintMediaListener();
      removePrintMediaListener = null;
    }
    if (afterPrintRegistered) {
      window.removeEventListener('afterprint', _closeAfterPrint);
      afterPrintRegistered = false;
    }
    if (typeof document !== 'undefined' && document.title !== originalDocumentTitle) {
      document.title = originalDocumentTitle;
    }
    closeDialog(overviewDialog);
  };
  var openFallbackPrintView = function openFallbackPrintView() {
    if (!content || typeof window === 'undefined') return false;
    var fallbackRoot = content.cloneNode(true);
    fallbackRoot.querySelectorAll('.print-btn, .back-btn').forEach(function (btn) {
      return btn.remove();
    });
    var printWindow = window.open('', '_blank', 'noopener,noreferrer');
    if (!printWindow) {
      console.error('Unable to open a fallback print window. Please allow pop-ups and try again.');
      return false;
    }
    var doc = printWindow.document;
    var htmlElement = typeof document !== 'undefined' ? document.documentElement : null;
    var htmlClassName = htmlElement ? htmlElement.className : '';
    var htmlDir = htmlElement ? htmlElement.getAttribute('dir') || '' : '';
    var htmlLang = htmlElement ? htmlElement.getAttribute('lang') || 'en' : 'en';
    var htmlInlineStyle = htmlElement ? htmlElement.getAttribute('style') || '' : '';
    var bodyElement = typeof document !== 'undefined' ? document.body : null;
    var bodyClassName = bodyElement ? bodyElement.className : '';
    var bodyInlineStyle = bodyElement ? bodyElement.getAttribute('style') || '' : '';
    doc.open();
    doc.write("<!DOCTYPE html>\n<html>\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"color-scheme\" content=\"light dark\">\n<title></title>\n<link rel=\"stylesheet\" href=\"src/styles/style.css\">\n<link rel=\"stylesheet\" href=\"src/styles/overview.css\">\n<link rel=\"stylesheet\" href=\"src/styles/overview-print.css\" media=\"print\">\n<link rel=\"stylesheet\" href=\"overview-print.css\" media=\"screen\">\n</head>\n<body></body>\n</html>");
    doc.close();
    doc.title = printDocumentTitle;
    var fallbackHtml = doc.documentElement;
    if (fallbackHtml) {
      fallbackHtml.setAttribute('lang', htmlLang || 'en');
      if (htmlDir) {
        fallbackHtml.setAttribute('dir', htmlDir);
      }
      if (htmlClassName) {
        fallbackHtml.className = htmlClassName;
      }
      if (htmlInlineStyle) {
        fallbackHtml.setAttribute('style', htmlInlineStyle);
      }
    }
    var fallbackBody = doc.body;
    if (fallbackBody) {
      if (bodyClassName) {
        fallbackBody.className = bodyClassName;
      }
      if (bodyInlineStyle) {
        fallbackBody.setAttribute('style', bodyInlineStyle);
      }
      fallbackBody.innerHTML = fallbackRoot.outerHTML;
    }
    var triggerPrint = function triggerPrint() {
      printWindow.focus();
      try {
        printWindow.print();
      } catch (error) {
        console.error('Failed to trigger print in fallback window.', error);
      }
    };
    if (printWindow.document.readyState === 'complete') {
      triggerPrint();
    } else {
      printWindow.addEventListener('load', triggerPrint, {
        once: true
      });
    }
    printWindow.addEventListener('afterprint', function () {
      printWindow.close();
    });
    return true;
  };
  var exportBtn = overviewDialog.querySelector('#exportPdfBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', _asyncToGenerator(_regenerator().m(function _callee6() {
      var pdfBlob, _t4;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            if (!exportBtn.disabled) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2);
          case 1:
            exportBtn.disabled = true;
            _context6.p = 2;
            pdfBlob = null;
            if (!content) {
              _context6.n = 4;
              break;
            }
            _context6.n = 3;
            return renderOverviewPdf(content, {
              title: pdfExportConfig.title
            });
          case 3:
            pdfBlob = _context6.v;
          case 4:
            if (!pdfBlob) {
              pdfBlob = createTextOverviewPdfBlob(pdfExportConfig.entries, {
                title: pdfExportConfig.title
              });
            }
            _context6.n = 5;
            return downloadBlobAsFile(pdfBlob, pdfExportConfig.fileName);
          case 5:
            _context6.n = 7;
            break;
          case 6:
            _context6.p = 6;
            _t4 = _context6.v;
            console.error('Failed to export overview PDF.', _t4);
          case 7:
            _context6.p = 7;
            exportBtn.disabled = false;
            return _context6.f(7);
          case 8:
            return _context6.a(2);
        }
      }, _callee6, null, [[2, 6, 7, 8]]);
    })));
  }
  var printBtn = overviewDialog.querySelector('#printOverviewBtn');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      var handlePrintError = function handlePrintError(error) {
        if (error && error.name === 'AbortError') {
          return;
        }
        console.warn('window.print() failed; using fallback print window.', error);
        if (openFallbackPrintView()) {
          _closeAfterPrint();
        }
      };
      if (typeof window.print !== 'function') {
        handlePrintError(new Error('Print API unavailable'));
        return;
      }
      try {
        if (typeof document !== 'undefined') {
          document.title = printDocumentTitle;
        }
        var result = window.print();
        if (result && typeof result.then === 'function') {
          result.catch(handlePrintError);
        }
      } catch (error) {
        handlePrintError(error);
      }
    });
  }
  openDialog(overviewDialog);
  if (typeof window.matchMedia === 'function') {
    var mql = window.matchMedia('print');
    var mqlListener = function mqlListener(e) {
      if (!e.matches) {
        if (removePrintMediaListener) {
          removePrintMediaListener();
          removePrintMediaListener = null;
        }
        _closeAfterPrint();
      }
    };
    if (mql.addEventListener) {
      mql.addEventListener('change', mqlListener);
      removePrintMediaListener = function removePrintMediaListener() {
        return mql.removeEventListener('change', mqlListener);
      };
    } else if (mql.addListener) {
      mql.addListener(mqlListener);
      removePrintMediaListener = function removePrintMediaListener() {
        return mql.removeListener(mqlListener);
      };
    }
  }
  window.addEventListener('afterprint', _closeAfterPrint, {
    once: true
  });
  afterPrintRegistered = true;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generatePrintableOverview: generatePrintableOverview
  };
}
