/* global ICON_FONT_KEYS */
(function createCineIconsModule() {
    const globalScope =
        (typeof globalThis !== 'undefined' && globalThis) ||
        (typeof window !== 'undefined' && window) ||
        (typeof self !== 'undefined' && self) ||
        (typeof global !== 'undefined' && global) ||
        {};

    const VALID_ICON_FONTS = (function createValidIconFontSet() {
        // Ensure ICON_FONT_KEYS is available
        const keys = globalScope.ICON_FONT_KEYS || (typeof ICON_FONT_KEYS !== 'undefined' ? ICON_FONT_KEYS : null);

        if (typeof keys !== 'object' || !keys) {
            return new Set();
        }
        const fonts = Object.values(keys).filter(
            font => typeof font === 'string' && font,
        );
        return new Set(fonts);
    })();

    function toCodePointChar(value, radix) {
        const codePoint = parseInt(value, radix);
        if (!Number.isFinite(codePoint) || codePoint < 0) {
            return '';
        }
        if (typeof String.fromCodePoint === 'function') {
            try {
                return String.fromCodePoint(codePoint);
            } catch (rangeError) {
                void rangeError;
            }
        }
        if (codePoint <= 0xffff) {
            return String.fromCharCode(codePoint);
        }
        return '';
    }

    function normalizeGlyphChar(char) {
        if (typeof char !== 'string') {
            return '';
        }
        const trimmed = char.trim();
        if (!trimmed) {
            return '';
        }
        const unicodeMatch = trimmed.match(/^(?:\\)+u([0-9A-Fa-f]{4})$/);
        if (unicodeMatch) {
            const decoded = toCodePointChar(unicodeMatch[1], 16);
            if (decoded) {
                return decoded;
            }
        }
        const unicodeBraceMatch = trimmed.match(/^(?:\\)+u\{([0-9A-Fa-f]+)\}$/);
        if (unicodeBraceMatch) {
            const decoded = toCodePointChar(unicodeBraceMatch[1], 16);
            if (decoded) {
                return decoded;
            }
        }
        const hexEntityMatch = trimmed.match(/^&#x([0-9A-Fa-f]+);$/i);
        if (hexEntityMatch) {
            const decoded = toCodePointChar(hexEntityMatch[1], 16);
            if (decoded) {
                return decoded;
            }
        }
        const decimalEntityMatch = trimmed.match(/^&#(\d+);$/);
        if (decimalEntityMatch) {
            const decoded = toCodePointChar(decimalEntityMatch[1], 10);
            if (decoded) {
                return decoded;
            }
        }
        return trimmed;
    }

    function iconGlyph(char, font) {
        // Resolve font keys dynamically to handle load order
        const keys = globalScope.ICON_FONT_KEYS || (typeof ICON_FONT_KEYS !== 'undefined' ? ICON_FONT_KEYS : { UICONS: 'uicons' });
        const defaultFont = keys.UICONS || 'uicons';
        const requestedFont = font || defaultFont;

        const normalizedFont = VALID_ICON_FONTS.has(requestedFont) ? requestedFont : defaultFont;
        const normalizedChar = normalizeGlyphChar(char);
        const glyph = {
            char: normalizedChar,
            font: normalizedFont,
        };
        return typeof Object.freeze === 'function' ? Object.freeze(glyph) : glyph;
    }

    function resolveIconGlyph(glyph) {
        const keys = globalScope.ICON_FONT_KEYS || (typeof ICON_FONT_KEYS !== 'undefined' ? ICON_FONT_KEYS : { UICONS: 'uicons' });
        const defaultFont = keys.UICONS || 'uicons';

        if (!glyph) {
            return {
                char: '',
                font: defaultFont,
                className: '',
                size: undefined,
            };
        }
        if (glyph.markup) {
            const size = Number.isFinite(glyph.size) ? glyph.size : undefined;
            return {
                markup: glyph.markup,
                className: glyph.className || '',
                font: defaultFont,
                size,
            };
        }
        if (typeof glyph === 'string') {
            return {
                char: normalizeGlyphChar(glyph),
                font: defaultFont,
                className: '',
                size: undefined,
            };
        }
        if (typeof glyph === 'object') {
            const char = typeof glyph.char === 'string' ? normalizeGlyphChar(glyph.char) : '';
            const fontKey = glyph.font && VALID_ICON_FONTS.has(glyph.font) ? glyph.font : defaultFont;
            const className = typeof glyph.className === 'string' ? glyph.className : '';
            const size = Number.isFinite(glyph.size) ? glyph.size : undefined;
            if (glyph.markup) {
                return {
                    markup: glyph.markup,
                    className,
                    font: fontKey,
                    size,
                };
            }
            return {
                char,
                font: fontKey,
                className,
                size,
            };
        }
        return {
            char: '',
            font: defaultFont,
            className: '',
            size: undefined,
        };
    }

    function ensureSvgHasAriaHidden(markup) {
        if (typeof markup !== 'string') return '';
        if (markup.indexOf('aria-hidden="true"') !== -1) return markup;
        return markup.replace('<svg', '<svg aria-hidden="true"');
    }

    function applyIconGlyph(element, glyph) {
        if (!element) return;
        const resolved = resolveIconGlyph(glyph);
        if (resolved.markup) {
            element.innerHTML = ensureSvgHasAriaHidden(resolved.markup);
            element.setAttribute('aria-hidden', 'true');
            if (resolved.className) {
                resolved.className
                    .split(/\s+/)
                    .filter(Boolean)
                    .forEach(cls => element.classList.add(cls));
            }
            element.removeAttribute('data-icon-font');
            return;
        }
        const char = resolved.char || '';
        element.textContent = char;
        if (char) {
            element.setAttribute('data-icon-font', resolved.font);
        } else {
            element.removeAttribute('data-icon-font');
        }
    }

    function iconMarkup(glyph, className) {
        const resolved = resolveIconGlyph(glyph);
        const parts = [];
        if (resolved.className) parts.push(resolved.className);
        if (className) parts.push(className);
        const finalClass = parts.join(' ');

        if (resolved.markup) {
            let svg = ensureSvgHasAriaHidden(resolved.markup);
            if (finalClass) {
                if (svg.indexOf('class="') !== -1) {
                    svg = svg.replace('class="', `class="${finalClass} `);
                } else {
                    svg = svg.replace('<svg', `<svg class="${finalClass}"`);
                }
            }
            return svg;
        }

        const fontAttr = resolved.char ? `data-icon-font="${resolved.font}"` : '';
        return `<span class="icon-glyph ${finalClass}" aria-hidden="true" ${fontAttr}>${resolved.char}</span>`;
    }

    function formatSvgCoordinate(value) {
        if (!Number.isFinite(value)) return '0';
        const rounded = Math.round(value * 100) / 100;
        if (Number.isInteger(rounded)) return String(rounded);
        return rounded.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
    }

    function positionSvgMarkup(markup, centerX, centerY, size = 24) {
        if (typeof markup !== 'string') {
            return { markup: '', x: '0', y: '0' };
        }
        const trimmed = markup.trim();
        if (!trimmed) {
            return { markup: '', x: '0', y: '0' };
        }
        const half = size / 2;
        const x = formatSvgCoordinate(centerX);
        const y = formatSvgCoordinate(centerY);
        const width = formatSvgCoordinate(size);
        const height = formatSvgCoordinate(size);
        const cleaned = trimmed.replace(/<svg\b([^>]*)>/i, (match, attrs = '') => {
            let attrText = attrs
                .replace(/\s+x\s*=\s*"[^"]*"/gi, '')
                .replace(/\s+y\s*=\s*"[^"]*"/gi, '')
                .trim();
            const additions = [];
            if (!/(?:^|\s)width\s*=/i.test(attrText)) additions.push(`width="${width}"`);
            if (!/(?:^|\s)height\s*=/i.test(attrText)) additions.push(`height="${height}"`);
            additions.push(`x="-${formatSvgCoordinate(half)}"`);
            additions.push(`y="-${formatSvgCoordinate(half)}"`);
            attrText = [attrText].concat(additions).filter(Boolean).join(' ').trim();
            return attrText ? `<svg ${attrText}>` : '<svg>';
        });
        return { markup: cleaned, x, y };
    }

    const STAR_ICON_SVG = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 17.25 6.545 20.2 7.9 13.975 3 9.45l6.272-.7L12 3l2.728 5.75L21 9.45l-4.9 4.525 1.355 6.225Z"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="0"
      />
    </svg>
  `.trim();

    // We need to access ICON_FONT_KEYS from the global scope or where it's defined
    const keys = globalScope.ICON_FONT_KEYS || (typeof ICON_FONT_KEYS !== 'undefined' ? ICON_FONT_KEYS : {
        UICONS: 'uicons',
        ESSENTIAL: 'essential',
        GADGET: 'gadget',
        FILM: 'film',
        TEXT: 'text'
    });

    const ICON_GLYPHS = Object.freeze({
        batteryBolt: iconGlyph('\uE1A6', keys.UICONS),
        batteryFull: iconGlyph('\uE1A9', keys.UICONS),
        bolt: iconGlyph('\uF1F8', keys.ESSENTIAL),
        plug: iconGlyph('\uEE75', keys.UICONS),
        sliders: iconGlyph('\uF143', keys.ESSENTIAL),
        screen: iconGlyph('\uF11D', keys.GADGET),
        brightness: iconGlyph('\uE2B3', keys.UICONS),
        wifi: iconGlyph('\uF4AC', keys.UICONS),
        gears: iconGlyph('\uE8AF', keys.UICONS),
        controller: iconGlyph('\uF117', keys.GADGET),
        distance: iconGlyph('\uEFB9', keys.UICONS),
        sensor: iconGlyph('\uEC2B', keys.UICONS),
        viewfinder: iconGlyph('\uF114', keys.FILM),
        camera: iconGlyph('\uE333', keys.UICONS),
        trash: iconGlyph('\uF254', keys.ESSENTIAL),
        reload: iconGlyph('\uF202', keys.ESSENTIAL),
        load: iconGlyph('\uE0E0', keys.UICONS),
        installApp: iconGlyph('\uE9D4', keys.UICONS),
        add: Object.freeze({ char: '+', font: keys.TEXT, className: 'icon-text' }),
        minus: Object.freeze({ char: '−', font: keys.TEXT, className: 'icon-text' }),
        arrowLeft: Object.freeze({ char: '←', font: keys.TEXT, className: 'icon-text' }),
        check: iconGlyph('\uE3D8', keys.UICONS),
        fileExport: iconGlyph('\uE7AB', keys.UICONS),
        fileImport: iconGlyph('\uE7C7', keys.UICONS),
        save: iconGlyph('\uF207', keys.ESSENTIAL),
        share: iconGlyph('\uF219', keys.ESSENTIAL),
        paperPlane: iconGlyph('\uED67', keys.UICONS),
        magnet: iconGlyph('\uF1B5', keys.ESSENTIAL),
        codec: iconGlyph('\uE4CD', keys.UICONS),
        timecode: iconGlyph('\uF10E', keys.FILM),
        audioIn: iconGlyph('\uF1C3', keys.ESSENTIAL),
        audioOut: iconGlyph('\uF22F', keys.ESSENTIAL),
        note: iconGlyph('\uF13E', keys.ESSENTIAL),
        overview: iconGlyph('\uF1F5', keys.UICONS),
        gearList: iconGlyph('\uE467', keys.UICONS),
        contacts: iconGlyph('\uF404', keys.UICONS),
        feedback: iconGlyph('\uE791', keys.UICONS),
        resetView: iconGlyph('\uEB6D', keys.UICONS),
        pin: iconGlyph('\uF1EF', keys.ESSENTIAL),
        sun: iconGlyph('\uF1FE', keys.UICONS),
        moon: iconGlyph('\uEC7E', keys.UICONS),
        circleX: iconGlyph('\uF131', keys.ESSENTIAL),
        settingsGeneral: iconGlyph('\uE5A3', keys.UICONS),
        settingsAutoGear: iconGlyph('\uE8AF', keys.UICONS),
        settingsAccessibility: iconGlyph('\uF392', keys.UICONS),
        settingsBackup: iconGlyph('\uE5BD', keys.UICONS),
        settingsData: iconGlyph('\uE5C7', keys.UICONS),
        settingsAbout: iconGlyph('\uEA4F', keys.UICONS),
        star: Object.freeze({ markup: STAR_ICON_SVG, className: 'icon-svg favorite-star-icon' }),
        warning: iconGlyph('\uF26F', keys.ESSENTIAL),
    });

    // Expose to global scope
    globalScope.cineIcons = {
        VALID_ICON_FONTS,
        toCodePointChar,
        normalizeGlyphChar,
        iconGlyph,
        resolveIconGlyph,
        applyIconGlyph,
        iconMarkup,
        formatSvgCoordinate,
        positionSvgMarkup,
        STAR_ICON_SVG,
        ICON_GLYPHS,
    };

    // Expose individual functions for backward compatibility if needed, 
    // or just use cineIcons namespace. 
    // Based on app-core-new-1.js usage, these seem to be expected in the scope.
    globalScope.iconGlyph = iconGlyph;
    globalScope.resolveIconGlyph = resolveIconGlyph;
    globalScope.applyIconGlyph = applyIconGlyph;
    globalScope.iconMarkup = iconMarkup;
    globalScope.formatSvgCoordinate = formatSvgCoordinate;
    globalScope.positionSvgMarkup = positionSvgMarkup;
    globalScope.STAR_ICON_SVG = STAR_ICON_SVG;
    globalScope.ICON_GLYPHS = ICON_GLYPHS;

    if (typeof module !== 'undefined' && module && module.exports) {
        module.exports = globalScope.cineIcons;
    }

})();
