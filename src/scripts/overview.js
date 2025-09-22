/* global currentLang, texts, devices, escapeHtml, generateConnectorSummary, cameraSelect, monitorSelect, videoSelect, distanceSelect, motorSelects, controllerSelects, batterySelect, hotswapSelect, overviewSectionIcons, breakdownListElem, totalPowerElem, totalCurrent144Elem, totalCurrent12Elem, batteryLifeElem, batteryCountElem, pinWarnElem, dtapWarnElem, getCurrentGearListHtml, currentProjectInfo, generateGearListHtml, setupDiagramContainer, diagramLegend, diagramHint, getDiagramCss, openDialog, closeDialog, splitGearListHtml, iconMarkup, ICON_GLYPHS, deleteCurrentGearList */

function generatePrintableOverview() {
    const escapeHtmlSafe = (value) => (typeof escapeHtml === 'function' ? escapeHtml(value) : String(value ?? ''));
    const summarizeConnectors = (device) => (typeof generateConnectorSummary === 'function' ? generateConnectorSummary(device) : '');
    const setupNameField = typeof document !== 'undefined' ? document.getElementById('setupName') : null;
    const setupName = setupNameField ? setupNameField.value : '';
    const now = new Date();
    const localeMap = { de: 'de-DE', es: 'es-ES', fr: 'fr-FR', en: 'en-US', it: 'it-IT' };
    const lang = typeof currentLang === 'string' ? currentLang : 'en';
    const t = (typeof texts === 'object' && texts) ? (texts[lang] || texts.en || {}) : {};
    const locale = localeMap[lang] || 'en-US';
    const dateTimeString = now.toLocaleDateString(locale) + ' ' + now.toLocaleTimeString();
    const fallbackProjectName = currentProjectInfo && typeof currentProjectInfo.projectName === 'string'
        ? currentProjectInfo.projectName.trim()
        : '';
    const projectNameForTitle = setupName || fallbackProjectName;
    const sanitizeTitleSegment = (value) => {
        if (!value) return '';
        return String(value)
            .trim()
            .replace(/[\\/:*?"<>|]+/g, '')
            .replace(/\s+/g, ' ')
            .replace(/^\.+/, '')
            .replace(/\.+$/, '')
            .trim();
    };
    const padTwo = (value) => String(value).padStart(2, '0');
    const formattedDate = `${now.getFullYear()}-${padTwo(now.getMonth() + 1)}-${padTwo(now.getDate())}`;
    const formattedTime = `${padTwo(now.getHours())}-${padTwo(now.getMinutes())}-${padTwo(now.getSeconds())}`;
    const timestampLabel = `${formattedDate} ${formattedTime}`.trim();
    const safeTimestampLabel = sanitizeTitleSegment(timestampLabel) || timestampLabel;
    const projectTitleSegment = sanitizeTitleSegment(projectNameForTitle) || 'Project';
    const overviewLabel = sanitizeTitleSegment((t.overviewTitle || '').trim());
    const gearListLabel = sanitizeTitleSegment((t.gearListNav || '').trim());
    const suffixRaw = [overviewLabel, gearListLabel].filter(Boolean).join(' – ');
    const suffixSegment = sanitizeTitleSegment(suffixRaw) || 'Project Overview and Gear List';
    const printDocumentTitle = [safeTimestampLabel, projectTitleSegment, suffixSegment]
        .filter(Boolean)
        .join(' - ')
        .replace(/\s+/g, ' ')
        .trim();
    const originalDocumentTitle = typeof document !== 'undefined' ? document.title : '';
    const customLogo = typeof localStorage !== 'undefined' ? localStorage.getItem('customLogo') : null;
    const generatedOnLabel = t.generatedOnLabel || 'Generated on';
    const defaultPdfWarningHeading = t.pdfWarningsHeading || 'Warnings';
    const diagramPdfNote = t.diagramPdfNote
        || 'The visual connection diagram is not included in the PDF export. Open the print view to review the layout.';

    const ensureLabelSuffix = (label) => {
        const base = typeof label === 'string' ? label.trim() : '';
        if (!base) return '';
        return /[:：]$/.test(base) ? base : `${base}:`;
    };

    const normalizeForPdf = (value) => {
        if (value === null || value === undefined) {
            return '';
        }
        let text = String(value);
        if (typeof text.normalize === 'function') {
            text = text.normalize('NFKD');
        }
        text = text
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\u00DF/g, 'ss')
            .replace(/[\u00A0\u202F\u2007]/g, ' ')
            .replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, '-')
            .replace(/\u00B0/g, ' deg ')
            .replace(/\u00D7/g, 'x')
            .replace(/\u00B5/g, 'u')
            .replace(/\u2126/g, 'Ohm')
            .replace(/\u20AC/g, 'EUR')
            .replace(/\u00A3/g, 'GBP')
            .replace(/\u00A5/g, 'JPY')
            .replace(/\u00BD/g, '1/2')
            .replace(/\u00BC/g, '1/4')
            .replace(/\u00BE/g, '3/4')
            .replace(/\u2022/g, '-')
            .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
            .replace(/[\u201C\u201D\u201E\u201F]/g, '"');
        text = text.replace(/[^\x20-\x7E]/g, '?');
        return text.replace(/\s+/g, ' ').trim();
    };

    const wrapPdfText = (text, maxLength) => {
        const result = [];
        const limit = Math.max(10, maxLength || 80);
        const normalized = normalizeForPdf(text);
        if (!normalized) {
            return result;
        }
        const words = normalized.split(' ');
        let currentLine = '';
        for (let i = 0; i < words.length; i += 1) {
            const word = words[i];
            if (!word) {
                continue;
            }
            if (!currentLine) {
                if (word.length <= limit) {
                    currentLine = word;
                } else {
                    const chunks = [];
                    for (let start = 0; start < word.length; start += limit) {
                        chunks.push(word.slice(start, start + limit));
                    }
                    if (chunks.length) {
                        result.push(chunks[0]);
                        for (let c = 1; c < chunks.length - 1; c += 1) {
                            result.push(chunks[c]);
                        }
                        currentLine = chunks[chunks.length - 1];
                    }
                }
                continue;
            }
            const candidate = `${currentLine} ${word}`;
            if (candidate.length <= limit) {
                currentLine = candidate;
            } else if (word.length > limit) {
                result.push(currentLine);
                const chunks = [];
                for (let start = 0; start < word.length; start += limit) {
                    chunks.push(word.slice(start, start + limit));
                }
                if (chunks.length) {
                    for (let c = 0; c < chunks.length - 1; c += 1) {
                        result.push(chunks[c]);
                    }
                    currentLine = chunks[chunks.length - 1];
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

    const flattenPdfEntries = (entries) => {
        const lines = [];
        if (!Array.isArray(entries) || entries.length === 0) {
            return ['No data available'];
        }
        for (let i = 0; i < entries.length; i += 1) {
            const entry = entries[i];
            if (!entry) {
                continue;
            }
            if (entry.type === 'blank') {
                if (lines.length && lines[lines.length - 1] !== '') {
                    lines.push('');
                }
                continue;
            }
            const indent = Math.max(0, Math.min(40, entry.indent || 0));
            const indentStr = indent ? ' '.repeat(indent) : '';
            const normalized = normalizeForPdf(entry.text);
            if (!normalized) {
                continue;
            }
            const available = Math.max(10, 94 - indentStr.length);
            const wrapped = wrapPdfText(normalized, available);
            if (!wrapped.length) {
                continue;
            }
            for (let w = 0; w < wrapped.length; w += 1) {
                lines.push(indentStr + wrapped[w]);
            }
        }
        if (!lines.length) {
            lines.push('No data available');
        }
        return lines;
    };

    const splitLinesIntoPages = (lines, maxLinesPerPage) => {
        const pages = [];
        const limit = Math.max(1, maxLinesPerPage || 46);
        let current = [];
        for (let i = 0; i < lines.length; i += 1) {
            const line = lines[i];
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

    const pdfEscape = (text) => String(text)
        .replace(/\\/g, '\\\\')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/\r/g, ' ')
        .replace(/\n/g, ' ');

    const createTextOverviewPdfBlob = (entries, options = {}) => {
        const fontRefName = '/F1';
        const lines = flattenPdfEntries(entries);
        const pages = splitLinesIntoPages(lines, 46);
        const pageWidth = 612;
        const pageHeight = 792;
        const marginLeft = 72;
        const marginTop = 72;
        const fontSize = 12;
        const leading = 14;

        let nextObjectId = 1;
        const bodies = {};
        const order = [];

        const reserveObject = () => {
            const id = nextObjectId;
            nextObjectId += 1;
            order.push(id);
            bodies[id] = null;
            return id;
        };

        const setObjectBody = (id, body) => {
            bodies[id] = body;
        };

        const addObject = (body) => {
            const id = reserveObject();
            setObjectBody(id, body);
            return id;
        };

        const fontRef = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
        const pagesRef = reserveObject();
        const pageRefs = [];

        for (let p = 0; p < pages.length; p += 1) {
            const pageLines = pages[p];
            let content = 'BT\n';
            content += `${fontRefName} ${fontSize} Tf\n`;
            content += `${leading} TL\n`;
            content += `${marginLeft} ${pageHeight - marginTop} Td\n`;
            let firstLine = true;
            for (let l = 0; l < pageLines.length; l += 1) {
                const line = pageLines[l];
                if (!firstLine) {
                    content += 'T*\n';
                } else {
                    firstLine = false;
                }
                if (!line) {
                    continue;
                }
                content += `(${pdfEscape(line)}) Tj\n`;
            }
            content += 'ET';
            const streamBody = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
            const contentRef = addObject(streamBody);
            const pageBody = `<< /Type /Page /Parent ${pagesRef} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents ${contentRef} 0 R /Resources << /Font << ${fontRefName} ${fontRef} 0 R >> >> >>`;
            const pageRef = addObject(pageBody);
            pageRefs.push(pageRef);
        }

        const kids = pageRefs.map(ref => `${ref} 0 R`).join(' ');
        setObjectBody(pagesRef, `<< /Type /Pages /Count ${pageRefs.length} /Kids [${kids}] >>`);

        const creationDate = `D:${now.getFullYear()}${padTwo(now.getMonth() + 1)}${padTwo(now.getDate())}${padTwo(now.getHours())}${padTwo(now.getMinutes())}${padTwo(now.getSeconds())}`;
        const infoParts = [
            '/Producer (Cine Power Planner)',
            '/Creator (Cine Power Planner Overview Export)',
            `/CreationDate (${creationDate})`,
        ];
        if (options && options.title) {
            const normalizedTitle = normalizeForPdf(options.title);
            if (normalizedTitle) {
                infoParts.push(`/Title (${pdfEscape(normalizedTitle)})`);
            }
        }
        const infoRef = addObject(`<< ${infoParts.join(' ')} >>`);
        const catalogRef = addObject(`<< /Type /Catalog /Pages ${pagesRef} 0 R >>`);

        let pdf = '%PDF-1.4\n';
        const offsets = [0];
        let offset = pdf.length;
        for (let i = 0; i < order.length; i += 1) {
            const id = order[i];
            const body = bodies[id];
            if (body === null || body === undefined) {
                throw new Error('Missing PDF object body.');
            }
            const objectString = `${id} 0 obj\n${body}\nendobj\n`;
            offsets.push(offset);
            pdf += objectString;
            offset += objectString.length;
        }
        const startXref = offset;
        pdf += `xref\n0 ${order.length + 1}\n`;
        pdf += '0000000000 65535 f \n';
        for (let i = 1; i < offsets.length; i += 1) {
            pdf += `${offsets[i].toString().padStart(10, '0')} 00000 n \n`;
        }
        pdf += `trailer\n<< /Size ${order.length + 1} /Root ${catalogRef} 0 R /Info ${infoRef} 0 R >>\nstartxref\n${startXref}\n%%EOF`;
        return new Blob([pdf], { type: 'application/pdf' });
    };

    const downloadBlobAsFile = async (blob, filename) => {
        if (!(blob instanceof Blob)) {
            throw new Error('PDF export failed: invalid file data.');
        }
        const defaultName = filename || 'overview.pdf';
        if (typeof window !== 'undefined' && typeof window.showSaveFilePicker === 'function') {
            try {
                const handle = await window.showSaveFilePicker({
                    suggestedName: defaultName,
                    types: [
                        {
                            description: 'PDF',
                            accept: { 'application/pdf': ['.pdf'] }
                        }
                    ]
                });
                if (handle) {
                    const writable = await handle.createWritable();
                    await writable.write(blob);
                    await writable.close();
                    return true;
                }
            } catch (error) {
                if (error && error.name === 'AbortError') {
                    return false;
                }
                console.warn('Save file picker unavailable, falling back to download link.', error);
            }
        }
        const url = URL.createObjectURL(blob);
        try {
            const link = document.createElement('a');
            link.href = url;
            link.download = defaultName;
            link.rel = 'noopener';
            link.style.display = 'none';
            const parentNode = document.body || document.documentElement;
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
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 0);
        }
        return true;
    };

    const htmlToPlainTextLines = (html) => {
        if (!html) {
            return [];
        }
        const container = document.createElement('div');
        container.innerHTML = html;
        const blockSelectors = ['p', 'div', 'section', 'li', 'h1', 'h2', 'h3', 'h4', 'tr', 'table', 'thead', 'tbody', 'tfoot', 'caption'];
        for (let b = 0; b < blockSelectors.length; b += 1) {
            const elements = container.getElementsByTagName(blockSelectors[b]);
            for (let i = 0; i < elements.length; i += 1) {
                elements[i].appendChild(document.createTextNode('\n'));
            }
        }
        const lineBreaks = container.querySelectorAll('br');
        for (let i = 0; i < lineBreaks.length; i += 1) {
            const br = lineBreaks[i];
            if (br && br.parentNode) {
                br.parentNode.replaceChild(document.createTextNode('\n'), br);
            }
        }
        const text = container.textContent || '';
        return text
            .split('\n')
            .map(line => line.replace(/\s+/g, ' ').trim())
            .filter(Boolean);
    };

    const pdfEntries = [];
    const pdfPushLine = (text, indent = 0) => {
        if (text === null || text === undefined) {
            return;
        }
        const value = String(text);
        if (!value.trim()) {
            return;
        }
        pdfEntries.push({ type: 'line', text: value, indent });
    };

    const pdfPushBlank = () => {
        if (!pdfEntries.length || pdfEntries[pdfEntries.length - 1].type === 'blank') {
            return;
        }
        pdfEntries.push({ type: 'blank' });
    };

    const pdfPushSectionHeading = (text) => {
        if (!text) {
            return;
        }
        if (pdfEntries.length) {
            pdfPushBlank();
        }
        pdfPushLine(text);
    };

    const pdfPushList = (items, indent = 2, prefix = '- ') => {
        if (!Array.isArray(items)) {
            return;
        }
        for (let i = 0; i < items.length; i += 1) {
            const item = items[i];
            if (!item) {
                continue;
            }
            pdfPushLine(`${prefix}${item}`, indent);
        }
    };

    const mmToPt = (value) => (value * 72) / 25.4;
    const formatPdfNumber = (value) => {
        if (!Number.isFinite(value)) {
            return '0';
        }
        const rounded = Math.round(value * 1000) / 1000;
        if (Math.abs(rounded) < 1e-6) {
            return '0';
        }
        return rounded.toString();
    };

    const getTextEncoder = () => {
        if (typeof TextEncoder === 'function') {
            return new TextEncoder();
        }
        return null;
    };

    const encodeText = (text, encoder) => {
        if (encoder) {
            return encoder.encode(text);
        }
        const safeText = String(text || '');
        const bytes = new Uint8Array(safeText.length);
        for (let i = 0; i < safeText.length; i += 1) {
            bytes[i] = safeText.charCodeAt(i) & 0xFF;
        }
        return bytes;
    };

    const ensureFontsReady = async (doc) => {
        if (!doc || !doc.fonts || !doc.fonts.ready || typeof doc.fonts.ready.then !== 'function') {
            return;
        }
        try {
            await doc.fonts.ready;
        } catch (error) {
            console.warn('Font loading check failed during PDF export.', error);
        }
    };

    const waitForImagesToLoad = async (root) => {
        if (!root || typeof root.querySelectorAll !== 'function') {
            return;
        }
        const images = Array.from(root.querySelectorAll('img'));
        if (root.tagName === 'IMG') {
            images.push(root);
        }
        const promises = images.map(img => new Promise(resolve => {
            if (!img) {
                resolve();
                return;
            }
            if (img.complete && img.naturalWidth !== 0) {
                resolve();
                return;
            }
            const finalize = () => {
                img.removeEventListener('load', finalize);
                img.removeEventListener('error', finalize);
                resolve();
            };
            img.addEventListener('load', finalize, { once: true });
            img.addEventListener('error', finalize, { once: true });
        }));
        await Promise.all(promises);
    };

    const TEXT_NODE = typeof Node !== 'undefined' ? Node.TEXT_NODE : 3;
    const ELEMENT_NODE = typeof Node !== 'undefined' ? Node.ELEMENT_NODE : 1;

    const cloneNodeWithComputedStyles = (node) => {
        if (!node) {
            return null;
        }
        if (node.nodeType === TEXT_NODE) {
            return node.cloneNode(true);
        }
        if (node.nodeType !== ELEMENT_NODE) {
            return node.cloneNode(true);
        }
        const clone = node.cloneNode(false);
        const win = node.ownerDocument ? node.ownerDocument.defaultView : null;
        if (win && typeof win.getComputedStyle === 'function') {
            const computed = win.getComputedStyle(node);
            if (computed) {
                const styles = [];
                for (let i = 0; i < computed.length; i += 1) {
                    const prop = computed[i];
                    if (!prop) {
                        continue;
                    }
                    styles.push(`${prop}:${computed.getPropertyValue(prop)};`);
                }
                if (styles.length) {
                    clone.setAttribute('style', styles.join(''));
                }
            }
        }
        const childNodes = node.childNodes;
        for (let i = 0; i < childNodes.length; i += 1) {
            const childClone = cloneNodeWithComputedStyles(childNodes[i]);
            if (childClone) {
                clone.appendChild(childClone);
            }
        }
        return clone;
    };

    const renderElementToCanvas = async (element, options = {}) => {
        if (!element || typeof document === 'undefined' || typeof window === 'undefined') {
            return null;
        }
        const doc = element.ownerDocument || document;
        const rect = element.getBoundingClientRect();
        const width = Math.max(1, Math.ceil(rect.width));
        const height = Math.max(1, Math.ceil(element.scrollHeight || rect.height));
        const scale = Math.max(1, Math.min(3, options.scale || window.devicePixelRatio || 1));
        const clone = cloneNodeWithComputedStyles(element);
        if (!clone) {
            return null;
        }
        const wrapper = doc.createElement('div');
        wrapper.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
        wrapper.setAttribute('style', `position:relative;box-sizing:border-box;width:${width}px;height:auto;background:#ffffff;`);
        wrapper.appendChild(clone);
        const serialized = new XMLSerializer().serializeToString(wrapper);
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject width="100%" height="100%">${serialized}</foreignObject></svg>`;
        const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
        const image = new Image();
        image.decoding = 'async';
        image.src = svgUrl;
        await new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                resolve();
            }, 2000);
            image.onload = () => {
                clearTimeout(timer);
                resolve();
            };
            image.onerror = (error) => {
                clearTimeout(timer);
                reject(error);
            };
        });
        const canvas = doc.createElement('canvas');
        canvas.width = Math.max(1, Math.ceil(width * scale));
        canvas.height = Math.max(1, Math.ceil(height * scale));
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return null;
        }
        ctx.scale(scale, scale);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(image, 0, 0);
        return { canvas, width, height, scale };
    };

    const dataUrlToUint8 = (dataUrl) => {
        if (!dataUrl || typeof dataUrl !== 'string') {
            return new Uint8Array(0);
        }
        const commaIndex = dataUrl.indexOf(',');
        const base64 = commaIndex >= 0 ? dataUrl.slice(commaIndex + 1) : dataUrl;
        const binary = atob(base64);
        const length = binary.length;
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i += 1) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    };

    const createImageBasedPdf = (pages, metadata = {}) => {
        const pageWidthPt = metadata.pageWidthPt || mmToPt(210);
        const pageHeightPt = metadata.pageHeightPt || mmToPt(297);
        const marginPt = metadata.marginPt || mmToPt(10);
        const encoder = getTextEncoder();
        const objects = [];
        const registerObject = (factory) => {
            const id = objects.length + 1;
            objects.push({ id, factory });
            return id;
        };

        const pagesCount = pages.length;
        const imageIds = [];
        const contentIds = [];
        const pageIds = [];
        let pagesRootId = null;
        let blankPageContentId = null;
        let blankPageId = null;

        for (let i = 0; i < pagesCount; i += 1) {
            const page = pages[i];
            const imageId = registerObject(() => {
                const header = `<< /Type /XObject /Subtype /Image /Width ${page.pixelWidth} /Height ${page.pixelHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.data.length} >>\nstream\n`;
                return [
                    header,
                    page.data,
                    '\nendstream\n'
                ];
            });
            imageIds.push(imageId);

            const translateY = pageHeightPt - marginPt - page.heightPt;
            const stream = `q ${formatPdfNumber(page.widthPt)} 0 0 ${formatPdfNumber(page.heightPt)} ${formatPdfNumber(marginPt)} ${formatPdfNumber(translateY)} cm /Im${i} Do Q\n`;
            const contentId = registerObject(() => {
                return [
                    `<< /Length ${stream.length} >>\nstream\n`,
                    stream,
                    '\nendstream\n'
                ];
            });
            contentIds.push(contentId);

            const pageId = registerObject(() => {
                return [
                    `<< /Type /Page /Parent ${pagesRootId} 0 R /Resources << /XObject << /Im${i} ${imageId} 0 R >> /ProcSet [/PDF /ImageC] >> /MediaBox [0 0 ${formatPdfNumber(pageWidthPt)} ${formatPdfNumber(pageHeightPt)}] /Contents ${contentId} 0 R >>\n`
                ];
            });
            pageIds.push(pageId);
        }

        pagesRootId = registerObject(() => {
            if (!pageIds.length) {
                return [
                    `<< /Type /Pages /Count 1 /Kids [${blankPageId} 0 R] >>\n`
                ];
            }
            const kids = pageIds.map(id => `${id} 0 R`).join(' ');
            return [
                `<< /Type /Pages /Count ${pageIds.length} /Kids [${kids}] >>\n`
            ];
        });

        if (!pageIds.length) {
            blankPageContentId = registerObject(() => ['<< /Length 0 >>\nstream\n\nendstream\n']);
            blankPageId = registerObject(() => [
                `<< /Type /Page /Parent ${pagesRootId} 0 R /MediaBox [0 0 ${formatPdfNumber(pageWidthPt)} ${formatPdfNumber(pageHeightPt)}] /Contents ${blankPageContentId} 0 R >>\n`
            ]);
        }

        const infoId = registerObject(() => {
            const nowDate = new Date();
            const pad = (value) => String(value).padStart(2, '0');
            const creationDate = `D:${nowDate.getFullYear()}${pad(nowDate.getMonth() + 1)}${pad(nowDate.getDate())}${pad(nowDate.getHours())}${pad(nowDate.getMinutes())}${pad(nowDate.getSeconds())}`;
            const entries = [
                '/Producer (Camera Power Planner)',
                '/Creator (Camera Power Planner Overview Export)',
                `/CreationDate (${creationDate})`
            ];
            if (metadata.title) {
                const normalizedTitle = normalizeForPdf(metadata.title);
                if (normalizedTitle) {
                    entries.push(`/Title (${pdfEscape(normalizedTitle)})`);
                }
            }
            return [`<< ${entries.join(' ')} >>\n`];
        });

        const catalogId = registerObject(() => [`<< /Type /Catalog /Pages ${pagesRootId} 0 R >>\n`]);

        const chunks = [];
        let position = 0;
        const offsets = [0];
        const pushChunk = (chunk) => {
            chunks.push(chunk);
            position += chunk.length;
        };

        const writeString = (text) => {
            const bytes = encodeText(text, encoder);
            pushChunk(bytes);
        };

        writeString('%PDF-1.4\n');

        for (let i = 0; i < objects.length; i += 1) {
            const object = objects[i];
            offsets.push(position);
            writeString(`${object.id} 0 obj\n`);
            const parts = object.factory ? object.factory() : [];
            for (let j = 0; j < parts.length; j += 1) {
                const part = parts[j];
                if (typeof part === 'string') {
                    writeString(part);
                } else if (part instanceof Uint8Array) {
                    pushChunk(part);
                }
            }
            writeString('endobj\n');
        }

        const xrefPosition = position;
        writeString(`xref\n0 ${objects.length + 1}\n`);
        writeString('0000000000 65535 f \n');
        for (let i = 1; i < offsets.length; i += 1) {
            const line = `${offsets[i].toString().padStart(10, '0')} 00000 n \n`;
            writeString(line);
        }
        const trailerParts = [`trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R /Info ${infoId} 0 R >>\nstartxref\n${xrefPosition}\n%%EOF`];
        trailerParts.forEach(part => writeString(part));
        return new Blob(chunks, { type: 'application/pdf' });
    };

    const renderOverviewPdf = async (element, options = {}) => {
        if (!element || typeof window === 'undefined' || typeof document === 'undefined') {
            return null;
        }
        try {
            const doc = element.ownerDocument || document;
            await ensureFontsReady(doc);
            await waitForImagesToLoad(element);
            const pixelRatio = typeof window.devicePixelRatio === 'number' ? window.devicePixelRatio : 1;
            const renderScale = Math.max(1.5, Math.min(2.5, pixelRatio * 1.25));
            const rendered = await renderElementToCanvas(element, { scale: renderScale });
            if (!rendered) {
                return null;
            }
            const { canvas, width, height, scale } = rendered;
            const pageWidthPt = mmToPt(210);
            const pageHeightPt = mmToPt(297);
            const marginPt = mmToPt(10);
            const availableWidthPt = pageWidthPt - (marginPt * 2);
            const widthScale = availableWidthPt / Math.max(1, width);
            const availableHeightPt = pageHeightPt - (marginPt * 2);
            const pageHeightPxLimit = Math.max(1, Math.floor(availableHeightPt / widthScale));
            const pages = [];
            let offsetPx = 0;
            while (offsetPx < height) {
                const sliceHeightPx = Math.min(pageHeightPxLimit, height - offsetPx);
                const pageCanvas = doc.createElement('canvas');
                pageCanvas.width = Math.max(1, Math.ceil(width * scale));
                pageCanvas.height = Math.max(1, Math.ceil(sliceHeightPx * scale));
                const ctx = pageCanvas.getContext('2d');
                if (!ctx) {
                    break;
                }
                ctx.drawImage(
                    canvas,
                    0,
                    offsetPx * scale,
                    width * scale,
                    sliceHeightPx * scale,
                    0,
                    0,
                    width * scale,
                    sliceHeightPx * scale
                );
                const dataUrl = pageCanvas.toDataURL('image/jpeg', 0.92);
                pages.push({
                    data: dataUrlToUint8(dataUrl),
                    pixelWidth: pageCanvas.width,
                    pixelHeight: pageCanvas.height,
                    widthPt: availableWidthPt,
                    heightPt: sliceHeightPx * widthScale
                });
                offsetPx += sliceHeightPx;
            }
            if (!pages.length) {
                return createImageBasedPdf([], {
                    pageWidthPt,
                    pageHeightPt,
                    marginPt,
                    title: options.title
                });
            }
            return createImageBasedPdf(pages, {
                pageWidthPt,
                pageHeightPt,
                marginPt,
                title: options.title
            });
        } catch (error) {
            console.error('Unable to render overview PDF using layout capture.', error);
            return null;
        }
    };

    const addHtmlAsPdfLines = (html, indent = 2) => {
        const lines = htmlToPlainTextLines(html);
        for (let i = 0; i < lines.length; i += 1) {
            pdfPushLine(lines[i], indent);
        }
    };

    const generatedOnDisplayLabel = ensureLabelSuffix(generatedOnLabel);
    const setupNameDisplayLabel = ensureLabelSuffix(t.setupNameLabel || 'Project Name');

    pdfPushLine(t.overviewTitle || 'Project Overview');
    pdfPushBlank();
    pdfPushLine(`${setupNameDisplayLabel} ${setupName || '-'}`);
    pdfPushLine(`${generatedOnDisplayLabel} ${dateTimeString}`);

    const sectionTextMap = {};

    let deviceListHtml = '<div class="device-category-container">';
    const sections = {};
    const sectionOrder = [];
    const addToSection = (key, itemHtml) => {
        if (!sections[key]) {
            sections[key] = [];
            sectionOrder.push(key);
        }
        sections[key].push(itemHtml);
        if (!sectionTextMap[key]) {
            sectionTextMap[key] = [];
        }
        const textLines = htmlToPlainTextLines(itemHtml);
        if (textLines.length) {
            sectionTextMap[key].push(textLines.join(' — '));
        }
    };
    const processSelectForOverview = (selectElement, headingKey, category, subcategory = null) => {
        if (selectElement.value && selectElement.value !== "None") {
            const deviceKey = selectElement.value;
            const deviceName = selectElement.options[selectElement.selectedIndex].text;
            let deviceInfo;
            if (subcategory) {
                deviceInfo = devices[category] &&
                       devices[category][subcategory] &&
                       devices[category][subcategory][deviceKey];
            } else {
                deviceInfo = devices[category] && devices[category][deviceKey];
            }
            const safeName = escapeHtmlSafe(deviceName);
            let details = '';
            if (deviceInfo !== undefined && deviceInfo !== null) {
                const connectors = summarizeConnectors(deviceInfo);
                const latencyLabel = t.videoLatencyLabel || t.monitorLatencyLabel || 'Latency:';
                const frequencyLabel = t.videoFrequencyLabel || 'Frequency:';
                const infoBoxes =
                    (deviceInfo.latencyMs !== undefined ? `<div class="info-box video-conn"><strong>${escapeHtmlSafe(latencyLabel)}</strong> ${escapeHtmlSafe(String(deviceInfo.latencyMs))}</div>` : '') +
                    (deviceInfo.frequency ? `<div class="info-box video-conn"><strong>${escapeHtmlSafe(frequencyLabel)}</strong> ${escapeHtmlSafe(String(deviceInfo.frequency))}</div>` : '');
                details = connectors + infoBoxes;
            }
            addToSection(headingKey, `<div class="device-block"><strong>${safeName}</strong>${details}</div>`);
        }
    };

    processSelectForOverview(cameraSelect, 'category_cameras', 'cameras');
    processSelectForOverview(monitorSelect, 'category_monitors', 'monitors');
    processSelectForOverview(videoSelect, 'category_video', 'video'); // Original database uses 'video', not 'wirelessVideo'
    processSelectForOverview(distanceSelect, 'category_fiz_distance', 'fiz', 'distance');
    motorSelects.forEach(sel => processSelectForOverview(sel, 'category_fiz_motors', 'fiz', 'motors'));
    controllerSelects.forEach(sel => processSelectForOverview(sel, 'category_fiz_controllers', 'fiz', 'controllers'));
    processSelectForOverview(batterySelect, 'category_batteries', 'batteries'); // Handle battery separately for capacity
    processSelectForOverview(hotswapSelect, 'category_batteryHotswaps', 'batteryHotswaps');

    sectionOrder.forEach(key => {
      const heading = t[key] || key;
      const icon = overviewSectionIcons[key] || '';
      const iconHtml = icon && typeof iconMarkup === 'function'
        ? iconMarkup(icon, 'category-icon')
        : icon
          ? `<span class="category-icon icon-glyph" data-icon-font="uicons" aria-hidden="true">${icon}</span>`
          : '';
      const isFizList = key === 'category_fiz_motors' || key === 'category_fiz_controllers';
      const gridClasses = isFizList ? 'device-block-grid two-column fiz-single-column' : 'device-block-grid single-column';
      deviceListHtml += `<div class="device-category"><h3>${iconHtml}${heading}</h3><div class="${gridClasses}">${sections[key].join('')}</div></div>`;
    });
    deviceListHtml += '</div>';

    if (sectionOrder.length) {
        pdfPushSectionHeading(t.overviewDeviceSelectionHeading || t.deviceSelectionHeading || 'Camera Setup Devices');
        sectionOrder.forEach((key, index) => {
            const heading = t[key] || key;
            pdfPushLine(heading);
            pdfPushList(sectionTextMap[key] || [], 2);
            if (index < sectionOrder.length - 1) {
                pdfPushBlank();
            }
        });
    }

    const breakdownHtml = breakdownListElem.innerHTML;
    const batteryLifeUnitElem = document.getElementById("batteryLifeUnit");
    const powerDiagramElem = typeof document !== 'undefined'
        ? document.getElementById('powerDiagram')
        : null;
    let powerDiagramHtml = '';
    if (
        powerDiagramElem &&
        !powerDiagramElem.classList.contains('hidden') &&
        powerDiagramElem.innerHTML.trim().length > 0
    ) {
        const clone = powerDiagramElem.cloneNode(true);
        clone.id = 'powerDiagramOverview';
        clone.classList.remove('hidden');
        clone.classList.add('power-diagram');
        const bar = clone.querySelector('#powerDiagramBar');
        if (bar) {
            bar.id = 'powerDiagramBarOverview';
        }
        const legend = clone.querySelector('#powerDiagramLegend');
        if (legend) {
            legend.id = 'powerDiagramLegendOverview';
            legend.classList.add('power-diagram-legend');
        }
        const maxPowerText = clone.querySelector('#maxPowerText');
        if (maxPowerText) {
            maxPowerText.id = 'maxPowerTextOverview';
            maxPowerText.classList.add('power-diagram-note');
        }
        powerDiagramHtml = clone.outerHTML;
    }
    const resultsHtml = `
        <ul id="breakdownList">${breakdownHtml}</ul>
        ${powerDiagramHtml}
        <p><strong>${t.totalPowerLabel}</strong> ${totalPowerElem.textContent} W</p>
        <p><strong>${t.totalCurrent144Label}</strong> ${totalCurrent144Elem.textContent} A</p>
        <p><strong>${t.totalCurrent12Label}</strong> ${totalCurrent12Elem.textContent} A</p>
        <p><strong>${t.batteryLifeLabel}</strong> ${batteryLifeElem.textContent} ${batteryLifeUnitElem ? batteryLifeUnitElem.textContent : ''}</p>
        <p><strong>${t.batteryCountLabel}</strong> ${batteryCountElem.textContent}</p>
    `;

    // Get current warning messages with their colors
    const severityClassMap = {
        danger: 'status-message--danger',
        warning: 'status-message--warning',
        success: 'status-message--success',
        info: 'status-message--info'
    };
    const extractSeverityClass = (element) => {
        if (!element) return '';
        const datasetLevel = element.dataset ? element.dataset.statusLevel : element.getAttribute && element.getAttribute('data-status-level');
        if (datasetLevel && severityClassMap[datasetLevel]) {
            return severityClassMap[datasetLevel];
        }
        if (element.classList) {
            return Object.values(severityClassMap).find(cls => element.classList.contains(cls)) || '';
        }
        const classAttr = typeof element.getAttribute === 'function' ? element.getAttribute('class') : '';
        if (classAttr) {
            const classes = classAttr.split(/\s+/);
            return Object.values(severityClassMap).find(cls => classes.includes(cls)) || '';
        }
        return '';
    };
    const buildStatusMarkup = (element) => {
        if (!element || element.textContent.trim() === '') {
            return '';
        }
        const classes = ['status-message'];
        const severityClass = extractSeverityClass(element);
        if (severityClass) {
            classes.push(severityClass);
        }
        return `<p class="${classes.join(' ')}">${escapeHtmlSafe(element.textContent)}</p>`;
    };

    const warningHtml = buildStatusMarkup(pinWarnElem) + buildStatusMarkup(dtapWarnElem);

    const resultsSectionHtml = `
        <section id="resultsSection" class="results-section print-section">
            <h2>${t.resultsHeading}</h2>
            <div class="results-body">
                ${resultsHtml}
                ${warningHtml ? `<div class="results-warnings">${warningHtml}</div>` : ''}
            </div>
        </section>
    `;

    const resultsLinesForPdf = [
        `${ensureLabelSuffix(t.totalPowerLabel || 'Total Power')} ${totalPowerElem.textContent} W`,
        `${ensureLabelSuffix(t.totalCurrent144Label || 'Total Current (14.4V)')} ${totalCurrent144Elem.textContent} A`,
        `${ensureLabelSuffix(t.totalCurrent12Label || 'Total Current (12V)')} ${totalCurrent12Elem.textContent} A`,
        `${ensureLabelSuffix(t.batteryLifeLabel || 'Estimated Battery Life')} ${batteryLifeElem.textContent} ${batteryLifeUnitElem ? batteryLifeUnitElem.textContent : ''}`.trim(),
        `${ensureLabelSuffix(t.batteryCountLabel || 'Battery Count')} ${batteryCountElem.textContent}`,
    ].filter(line => line && line.trim());
    if (resultsLinesForPdf.length) {
        pdfPushSectionHeading(t.resultsHeading || 'Power Summary');
        resultsLinesForPdf.forEach(line => pdfPushLine(line, 2));
    }
    if (warningHtml) {
        const warningLines = htmlToPlainTextLines(warningHtml);
        if (warningLines.length) {
            pdfPushSectionHeading(defaultPdfWarningHeading);
            pdfPushList(warningLines, 2, '! ');
        }
    }

    const batteryComparisonSection = typeof document !== 'undefined'
        ? document.getElementById('batteryComparison')
        : null;
    const isSectionRenderable = section => {
        if (!section) return false;
        if (section.hasAttribute('hidden')) return false;
        if (section.classList && section.classList.contains('hidden')) return false;
        if (section.style && section.style.display === 'none') return false;
        if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
            const computed = window.getComputedStyle(section);
            if (computed.display === 'none' || computed.visibility === 'hidden') {
                return false;
            }
        }
        const table = section.querySelector('table');
        return table ? table.innerHTML.trim().length > 0 : false;
    };

    let batteryComparisonHtml = '';
    if (isSectionRenderable(batteryComparisonSection)) {
        const clone = batteryComparisonSection.cloneNode(true);
        clone.id = 'batteryComparisonOverview';
        clone.classList.add('print-section', 'battery-comparison-section');
        clone.removeAttribute('style');
        const heading = clone.querySelector('#batteryComparisonHeading');
        if (heading) {
            heading.id = 'batteryComparisonOverviewHeading';
        }
        const container = clone.querySelector('#batteryTableContainer');
        if (container) {
            container.id = 'batteryTableOverviewContainer';
        }
        const table = clone.querySelector('#batteryTable');
        if (table) {
            table.removeAttribute('id');
        }
        batteryComparisonHtml = `<div class="page-break"></div>${clone.outerHTML}`;
    }

    if (batteryComparisonHtml) {
        pdfPushSectionHeading(t.batteryComparisonHeading || 'Battery Comparison');
        addHtmlAsPdfLines(batteryComparisonHtml, 2);
    }

    const safeSetupName = escapeHtmlSafe(setupName);
    const diagramCss = getDiagramCss(false);

    let diagramAreaHtml = '';
    if (setupDiagramContainer) {
      const areaClone = setupDiagramContainer.cloneNode(true);
      const svg = areaClone.querySelector('svg');
      if (svg) {
        const style = document.createElement('style');
        style.textContent = diagramCss;
        svg.insertBefore(style, svg.firstChild);
      }
      diagramAreaHtml = areaClone.outerHTML;
    }
    const diagramLegendHtml = diagramLegend ? diagramLegend.outerHTML : '';
    const diagramHintHtml = diagramHint ? diagramHint.outerHTML : '';
    const diagramDescHtml = document.getElementById('diagramDesc') ? document.getElementById('diagramDesc').outerHTML : '';
    const diagramSectionHtml = diagramAreaHtml
        ? `<section id="setupDiagram" class="diagram-section print-section"><h2>${t.setupDiagramHeading}</h2>${diagramDescHtml}${diagramAreaHtml}${diagramLegendHtml}${diagramHintHtml}</section>`
        : '';

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
    // Only surface the gear list in the overview when the generator has
    // produced visible output in the main interface.
    const hasGeneratedGearList = (() => {
        if (typeof document === 'undefined') return false;
        const container = document.getElementById('gearListOutput');
        if (!container) return false;
        if (container.classList && container.classList.contains('hidden')) {
            return false;
        }
        const trimmed = typeof container.innerHTML === 'string'
            ? container.innerHTML.trim()
            : '';
        if (!trimmed) return false;
        if (typeof container.querySelector === 'function') {
            const table = container.querySelector('.gear-table');
            if (table) return true;
        }
        return true;
    })();

    let gearListCombined = getCurrentGearListHtml();
    if (!gearListCombined && currentProjectInfo) {
        gearListCombined = generateGearListHtml(currentProjectInfo);
    }
    let projectSectionHtml = '';
    let gearSectionHtml = '';
    if (gearListCombined) {
        const parts = typeof splitGearListHtml === 'function'
            ? splitGearListHtml(gearListCombined)
            : { projectHtml: '', gearHtml: '' };
        if (parts.projectHtml) {
            projectSectionHtml = `<section id="projectRequirementsOutput" class="print-section project-requirements-section">${parts.projectHtml}</section>`;
            pdfPushSectionHeading(t.projectRequirementsNav || 'Project Requirements');
            addHtmlAsPdfLines(parts.projectHtml, 2);
        }
        if (parts.gearHtml && hasGeneratedGearList) {
            gearSectionHtml = `<section id="gearListOutput" class="gear-list-section">${parts.gearHtml}</section>`;
            pdfPushSectionHeading(t.gearListNav || 'Gear List');
            addHtmlAsPdfLines(parts.gearHtml, 2);
        }
    }
    const gearListHtmlCombined = projectSectionHtml || gearSectionHtml
        ? `${projectSectionHtml || ''}${gearSectionHtml || ''}`
        : '';
    const deleteGearListLabel = t.deleteGearListBtn || 'Delete Gear List';
    const deleteGearListHelp = t.deleteGearListBtnHelp || deleteGearListLabel;
    const gearListActionsHtml = gearListHtmlCombined
        ? `<div class="overview-gear-actions"><button id="overviewDeleteGearListBtn" class="overview-delete-gear-btn" title="${escapeHtmlSafe(deleteGearListHelp)}" data-help="${escapeHtmlSafe(deleteGearListHelp)}"><span class="btn-icon icon-glyph" aria-hidden="true" data-icon-font="essential">&#xF254;</span>${escapeHtmlSafe(deleteGearListLabel)}</button></div>`
        : '';

    const logoHtml = customLogo ? `<img id="printLogo" src="${customLogo}" alt="Logo" />` : '';
    const contentClass = customLogo ? 'logo-present' : '';
    const generatedOnDisplay = `${escapeHtmlSafe(generatedOnDisplayLabel)} ${escapeHtmlSafe(dateTimeString)}`;
    const exportPdfLabel = t.exportPdfBtn || 'Export PDF';
    const exportIconHtml = (() => {
        if (typeof iconMarkup === 'function' && ICON_GLYPHS && ICON_GLYPHS.fileExport) {
            try {
                return iconMarkup(ICON_GLYPHS.fileExport, 'btn-icon');
            } catch (error) {
                console.warn('Unable to render export icon for overview dialog.', error);
            }
        }
        return '<span class="btn-icon icon-glyph" aria-hidden="true" data-icon-font="uicons">&#xE7AB;</span>';
    })();
    const overviewHtml = `
        <div id="overviewDialogContent" class="${contentClass}">
            <div class="overview-actions">
                <button id="closeOverviewBtn" class="back-btn"><span class="btn-icon icon-glyph" aria-hidden="true" data-icon-font="essential">&#xF131;</span>${escapeHtmlSafe(t.backToAppBtn)}</button>
                <button id="printOverviewBtn" class="print-btn"><span class="btn-icon icon-glyph" aria-hidden="true" data-icon-font="uicons">&#xE7AB;</span>${escapeHtmlSafe(t.printBtn)}</button>
                <button id="exportPdfBtn" class="print-btn export-pdf-btn">${exportIconHtml}${escapeHtmlSafe(exportPdfLabel)}</button>
            </div>
            ${logoHtml}
            <h1>${t.overviewTitle}</h1>
            <p><strong>${t.setupNameLabel}</strong> ${safeSetupName}</p>
            <p><em>${generatedOnDisplay}</em></p>

            <h2>${t.overviewDeviceSelectionHeading || t.deviceSelectionHeading}</h2>
            ${deviceListHtml}

            ${resultsSectionHtml}

            ${diagramSectionHtml}

            ${gearListHtmlCombined}
            ${gearListActionsHtml}
            ${batteryComparisonHtml}
        </div>
    `;

    const sanitizedProjectSegmentForFile = sanitizeTitleSegment(projectTitleSegment) || 'Project';
    const pdfFileName = `${formattedDate}_${formattedTime}_${sanitizedProjectSegmentForFile}_Overview.pdf`;
    const pdfExportConfig = {
        entries: pdfEntries.slice(),
        fileName: pdfFileName,
        title: printDocumentTitle,
    };

    const overviewDialog = document.getElementById('overviewDialog');
    overviewDialog.innerHTML = overviewHtml;
    const content = overviewDialog.querySelector('#overviewDialogContent');

    const applyThemeClasses = (target) => {
        if (!target || typeof document === 'undefined') return;
        const themeClasses = [
            'dark-mode',
            'light-mode',
            'pink-mode',
            'dark-accent-boost',
            'high-contrast',
            'reduce-motion',
            'relaxed-spacing',
        ];
        const activeClasses = new Set([
            ...(document.documentElement ? Array.from(document.documentElement.classList) : []),
            ...(document.body ? Array.from(document.body.classList) : []),
        ]);
        themeClasses.forEach(themeClass => {
            target.classList.toggle(themeClass, activeClasses.has(themeClass));
        });
    };

    applyThemeClasses(content);

    const closeBtn = overviewDialog.querySelector('#closeOverviewBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeDialog(overviewDialog);
        });
    }

    const overviewDeleteBtn = overviewDialog.querySelector('#overviewDeleteGearListBtn');
    if (overviewDeleteBtn) {
        const supportsCustomEvents = typeof document !== 'undefined' && typeof document.addEventListener === 'function';
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
            overviewDialog.addEventListener('close', cleanup, { once: true });
        }

        overviewDeleteBtn.addEventListener('click', event => {
            event.preventDefault();
            let usedFallback = false;
            if (typeof deleteCurrentGearList === 'function') {
                try {
                    const deleted = deleteCurrentGearList();
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
                    document.dispatchEvent(new CustomEvent('gearlist:delete-requested', { detail: { source: 'overview' } }));
                } catch (error) {
                    if (typeof document.createEvent === 'function') {
                        const fallbackEvent = document.createEvent('CustomEvent');
                        fallbackEvent.initCustomEvent('gearlist:delete-requested', false, false, { source: 'overview' });
                        document.dispatchEvent(fallbackEvent);
                    } else {
                        console.warn('Unable to request gear list deletion from overview', error);
                    }
                }
            }
        });
    }

    let removePrintMediaListener = null;
    let afterPrintRegistered = false;
    const closeAfterPrint = () => {
        if (removePrintMediaListener) {
            removePrintMediaListener();
            removePrintMediaListener = null;
        }
        if (afterPrintRegistered) {
            window.removeEventListener('afterprint', closeAfterPrint);
            afterPrintRegistered = false;
        }
        if (typeof document !== 'undefined' && document.title !== originalDocumentTitle) {
            document.title = originalDocumentTitle;
        }
        closeDialog(overviewDialog);
    };

    const openFallbackPrintView = () => {
        if (!content || typeof window === 'undefined') return false;
        const fallbackRoot = content.cloneNode(true);
        fallbackRoot.querySelectorAll('.print-btn, .back-btn').forEach(btn => btn.remove());
        const printWindow = window.open('', '_blank', 'noopener,noreferrer');
        if (!printWindow) {
            console.error('Unable to open a fallback print window. Please allow pop-ups and try again.');
            return false;
        }

        const doc = printWindow.document;
        const htmlElement = typeof document !== 'undefined' ? document.documentElement : null;
        const htmlClassName = htmlElement ? htmlElement.className : '';
        const htmlDir = htmlElement ? htmlElement.getAttribute('dir') || '' : '';
        const htmlLang = htmlElement ? htmlElement.getAttribute('lang') || 'en' : 'en';
        const htmlInlineStyle = htmlElement ? htmlElement.getAttribute('style') || '' : '';
        const bodyElement = typeof document !== 'undefined' ? document.body : null;
        const bodyClassName = bodyElement ? bodyElement.className : '';
        const bodyInlineStyle = bodyElement ? bodyElement.getAttribute('style') || '' : '';
        const escapedPrintDocumentTitle = escapeHtmlSafe(printDocumentTitle);
        doc.open();
        doc.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="color-scheme" content="light dark">
<title>${escapedPrintDocumentTitle}</title>
<link rel="stylesheet" href="src/styles/style.css">
<link rel="stylesheet" href="src/styles/overview.css">
<link rel="stylesheet" href="src/styles/overview-print.css" media="print">
<link rel="stylesheet" href="overview-print.css" media="screen">
</head>
<body></body>
</html>`);
        doc.close();

        doc.title = printDocumentTitle;

        const fallbackHtml = doc.documentElement;
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

        const fallbackBody = doc.body;
        if (fallbackBody) {
            if (bodyClassName) {
                fallbackBody.className = bodyClassName;
            }
            if (bodyInlineStyle) {
                fallbackBody.setAttribute('style', bodyInlineStyle);
            }
            fallbackBody.innerHTML = fallbackRoot.outerHTML;
        }

        const triggerPrint = () => {
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
            printWindow.addEventListener('load', triggerPrint, { once: true });
        }
        printWindow.addEventListener('afterprint', () => {
            printWindow.close();
        });

        return true;
    };

    const exportBtn = overviewDialog.querySelector('#exportPdfBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', async () => {
            if (exportBtn.disabled) {
                return;
            }
            exportBtn.disabled = true;
            try {
                let pdfBlob = null;
                if (content) {
                    pdfBlob = await renderOverviewPdf(content, { title: pdfExportConfig.title });
                }
                if (!pdfBlob) {
                    pdfBlob = createTextOverviewPdfBlob(pdfExportConfig.entries, { title: pdfExportConfig.title });
                }
                await downloadBlobAsFile(pdfBlob, pdfExportConfig.fileName);
            } catch (error) {
                console.error('Failed to export overview PDF.', error);
            } finally {
                exportBtn.disabled = false;
            }
        });
    }

    const printBtn = overviewDialog.querySelector('#printOverviewBtn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            const handlePrintError = (error) => {
                if (error && error.name === 'AbortError') {
                    return;
                }
                console.warn('window.print() failed; using fallback print window.', error);
                if (openFallbackPrintView()) {
                    closeAfterPrint();
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
                const result = window.print();
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
        const mql = window.matchMedia('print');
        const mqlListener = e => {
            if (!e.matches) {
                if (removePrintMediaListener) {
                    removePrintMediaListener();
                    removePrintMediaListener = null;
                }
                closeAfterPrint();
            }
        };
        if (mql.addEventListener) {
            mql.addEventListener('change', mqlListener);
            removePrintMediaListener = () => mql.removeEventListener('change', mqlListener);
        } else if (mql.addListener) {
            mql.addListener(mqlListener);
            removePrintMediaListener = () => mql.removeListener(mqlListener);
        }
    }
    window.addEventListener('afterprint', closeAfterPrint, { once: true });
    afterPrintRegistered = true;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generatePrintableOverview };
}
