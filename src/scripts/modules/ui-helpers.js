/**
 * Cine Power Planner UI Helpers
 * 
 * Pure ESM module for DOM manipulation and escaping.
 * Extracted from app-core-ui-helpers.js during Vite migration.
 */

function detectDocument() {
    if (typeof document !== 'undefined') return document;
    return null;
}

export function escapeHtml(str) {
    let escapeDiv = null;
    const doc = detectDocument();
    if (doc) {
        escapeDiv = doc.createElement('div');
    }

    if (!escapeDiv) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    escapeDiv.textContent = str;
    return escapeDiv.innerHTML;
}

export function escapeButtonLabelSafely(text) {
    if (typeof text !== 'string' || text === '') {
        return '';
    }

    try {
        return escapeHtml(text);
    } catch (escapeError) {
        void escapeError;
    }

    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function isFiniteNumber(value) {
    if (typeof value !== 'number') {
        return false;
    }
    if (typeof Number.isFinite === 'function') {
        return Number.isFinite(value);
    }
    return isFinite(value);
}

function fallbackToCodePointChar(value, radix) {
    const codePoint = parseInt(value, radix);
    if (!isFiniteNumber(codePoint) || codePoint < 0) {
        return '';
    }
    try {
        if (typeof String.fromCodePoint === 'function') {
            return String.fromCodePoint(codePoint);
        }
    } catch (rangeError) {
        void rangeError;
    }
    if (codePoint <= 0xffff) {
        return String.fromCharCode(codePoint);
    }
    return '';
}

function fallbackNormalizeGlyphChar(char) {
    if (typeof char !== 'string') {
        return '';
    }

    const trimmed = char.trim();
    if (!trimmed) {
        return '';
    }

    const unicodeMatch = trimmed.match(/^(?:\\)+u([0-9A-Fa-f]{4})$/);
    if (unicodeMatch) {
        const decoded = fallbackToCodePointChar(unicodeMatch[1], 16);
        if (decoded) {
            return decoded;
        }
    }

    const unicodeBraceMatch = trimmed.match(/^(?:\\)+u\{([0-9A-Fa-f]+)\}$/);
    if (unicodeBraceMatch) {
        const decoded = fallbackToCodePointChar(unicodeBraceMatch[1], 16);
        if (decoded) {
            return decoded;
        }
    }

    const hexEntityMatch = trimmed.match(/^&#x([0-9A-Fa-f]+);$/i);
    if (hexEntityMatch) {
        const decoded = fallbackToCodePointChar(hexEntityMatch[1], 16);
        if (decoded) {
            return decoded;
        }
    }

    const decimalEntityMatch = trimmed.match(/^&#(\d+);$/);
    if (decimalEntityMatch) {
        const decoded = fallbackToCodePointChar(decimalEntityMatch[1], 10);
        if (decoded) {
            return decoded;
        }
    }

    return trimmed;
}

function fallbackEscapeAttribute(value) {
    if (typeof value === 'string') {
        return escapeButtonLabelSafely(value);
    }
    if (value === null || typeof value === 'undefined') {
        return '';
    }
    try {
        return escapeButtonLabelSafely(String(value));
    } catch (attributeError) {
        void attributeError;
    }
    return '';
}

function normalizeFallbackGlyphConfig(glyph) {
    if (!glyph) {
        return null;
    }

    if (typeof glyph === 'string') {
        const char = fallbackNormalizeGlyphChar(glyph);
        if (!char) {
            return null;
        }
        return { char, font: 'uicons', className: '' };
    }

    if (typeof glyph !== 'object') {
        return null;
    }

    const markup = typeof glyph.markup === 'string' ? glyph.markup.trim() : '';
    const className = typeof glyph.className === 'string' ? glyph.className : '';
    const style = typeof glyph.style === 'string' ? glyph.style : '';
    const size = glyph.size;
    const scale = glyph.scale;

    if (markup) {
        return { markup, className, style, size, scale };
    }

    const rawChar =
        typeof glyph.char === 'string' && glyph.char
            ? glyph.char
            : typeof glyph.character === 'string' && glyph.character
                ? glyph.character
                : typeof glyph.glyph === 'string' && glyph.glyph
                    ? glyph.glyph
                    : typeof glyph.unicode === 'string' && glyph.unicode
                        ? glyph.unicode
                        : '';

    const char = fallbackNormalizeGlyphChar(rawChar);
    if (!char) {
        return null;
    }

    const font = typeof glyph.font === 'string' && glyph.font.trim() ? glyph.font.trim() : 'uicons';

    return { char, font, className, style, size, scale };
}

function createFallbackIconMarkup(glyph, baseClassName) {
    const resolved = normalizeFallbackGlyphConfig(glyph);
    if (!resolved) {
        return '';
    }

    const classes = ['icon-glyph'];
    if (typeof baseClassName === 'string' && baseClassName) {
        classes.unshift(baseClassName);
    }

    if (resolved.className) {
        resolved.className
            .split(/\s+/)
            .filter(Boolean)
            .forEach(cls => {
                if (classes.indexOf(cls) === -1) {
                    classes.push(cls);
                }
            });
    }

    const styleParts = [];
    if (isFiniteNumber(resolved.size) && resolved.size > 0) {
        styleParts.push(`--icon-size: ${resolved.size}px`);
    } else if (typeof resolved.size === 'string' && resolved.size.trim()) {
        styleParts.push(`--icon-size: ${resolved.size.trim()}`);
    }

    if (isFiniteNumber(resolved.scale) && resolved.scale > 0) {
        styleParts.push(`--icon-scale: ${resolved.scale}`);
    } else if (typeof resolved.scale === 'string' && resolved.scale.trim()) {
        styleParts.push(`--icon-scale: ${resolved.scale.trim()}`);
    }

    if (typeof resolved.style === 'string' && resolved.style.trim()) {
        styleParts.push(resolved.style.trim());
    }

    const styleAttr = styleParts.length ? ` style="${styleParts.join(';')}"` : '';

    if (resolved.markup) {
        return `<span class="${classes.join(' ')}"${styleAttr} aria-hidden="true">${resolved.markup}</span>`;
    }

    const char = typeof resolved.char === 'string' ? resolved.char : '';
    if (!char) {
        return '';
    }

    const font = typeof resolved.font === 'string' ? resolved.font : 'uicons';
    const fontAttr = font ? ` data-icon-font="${fallbackEscapeAttribute(font)}"` : '';
    return `<span class="${classes.join(' ')}"${styleAttr}${fontAttr} aria-hidden="true">${escapeHtml(char)}</span>`;
}

// In a pure function, we can't easily rely on global `iconMarkup`.
// We pass it as an argument or accept that this module handles the fallback exclusively.
// For now, we'll keep the logic simple: this module provides the fallback and robust escaping.
// Complex implementations should inject the icon factory.

export function resolveButtonIconMarkup(glyph, iconFactory) {
    if (!glyph) {
        return '';
    }

    if (typeof iconFactory === 'function') {
        try {
            return iconFactory(glyph, 'btn-icon');
        } catch (iconError) {
            void iconError;
        }
    }

    // Pure fallback
    return createFallbackIconMarkup(glyph, 'btn-icon');
}

export function setButtonLabelWithIcon(button, label, glyph, iconFactory) {
    if (!button) {
        return;
    }

    const doc = detectDocument();
    const iconHtml = resolveButtonIconMarkup(glyph, iconFactory);
    const safeLabel = typeof label === 'string' ? label : '';

    if (button.firstChild) {
        while (button.firstChild) {
            button.removeChild(button.firstChild);
        }
    }

    if (doc && iconHtml) {
        const temp = doc.createElement('span');
        temp.innerHTML = iconHtml;
        while (temp.firstChild) {
            button.appendChild(temp.firstChild);
        }
    } else if (!doc && iconHtml && typeof button.innerHTML === 'string') {
        button.innerHTML = `${iconHtml}${escapeButtonLabelSafely(safeLabel)}`;
        return;
    }

    if (doc) {
        button.appendChild(doc.createTextNode(safeLabel));
    } else if (typeof button.textContent === 'string') {
        button.textContent = safeLabel;
    } else if (typeof button.innerHTML === 'string') {
        button.innerHTML = escapeButtonLabelSafely(safeLabel);
    }
}

export function whenElementAvailable(idOrSelector, onResolve, options = {}) {
    if (!idOrSelector || typeof onResolve !== 'function') {
        return false;
    }

    const doc = detectDocument();
    if (!doc) {
        return false;
    }

    const find = (query) => {
        let el = doc.getElementById(query);
        if (!el) {
            try {
                el = doc.querySelector(query);
            } catch (e) {
                void e;
            }
        }
        return el;
    };

    const initial = find(idOrSelector);
    if (initial) {
        try {
            onResolve(initial);
        } catch (handlerError) {
            if (typeof console !== 'undefined') console.error(`whenElementAvailable: handler for ${idOrSelector} failed`, handlerError);
        }
        return true;
    }

    const attemptsLimit = typeof options.maxAttempts === 'number' ? options.maxAttempts : 150;
    const interval = typeof options.interval === 'number' && options.interval > 0 ? options.interval : 100;

    let attempts = 0;
    const poll = () => {
        attempts += 1;
        const el = find(idOrSelector);
        if (el) {
            try {
                onResolve(el);
            } catch (handlerError) {
                if (typeof console !== 'undefined') console.error(`whenElementAvailable: polled handler for ${idOrSelector} failed`, handlerError);
            }
            return;
        }

        if (attempts < attemptsLimit) {
            setTimeout(poll, interval);
        } else if (typeof options.onTimeout === 'function') {
            try {
                options.onTimeout();
            } catch (timeoutError) {
                void timeoutError;
            }
        }
    };

    setTimeout(poll, interval);
    return true;
}
