/**
 * Diagram Export Manager
 * Handles SVG diagram export, clipboard operations, and file downloads
 */

/**
 * Copy text to clipboard using modern API or legacy fallback
 * @param {string} text - Text to copy to clipboard
 */
function copyTextToClipboardBestEffort(text) {
    if (typeof text !== 'string' || !text) {
        return;
    }

    // Modern Clipboard API
    if (
        typeof navigator !== 'undefined' &&
        navigator &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === 'function'
    ) {
        navigator.clipboard.writeText(text).catch(() => { });
        return;
    }

    // Legacy fallback using textarea
    if (
        typeof document === 'undefined' ||
        !document ||
        !document.body ||
        typeof document.createElement !== 'function'
    ) {
        return;
    }

    let textarea = null;
    const previousActiveElement = document.activeElement;

    try {
        textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);

        try {
            textarea.focus();
        } catch {
            // Ignore focus errors on platforms that disallow programmatic focus.
        }

        try {
            textarea.select();
            if (typeof textarea.setSelectionRange === 'function') {
                textarea.setSelectionRange(0, textarea.value.length);
            }
        } catch {
            // Ignore selection errors; execCommand may still succeed.
        }

        if (typeof document.execCommand === 'function') {
            try {
                document.execCommand('copy');
            } catch {
                // Ignore execCommand failures to avoid breaking the export flow.
            }
        }
    } catch {
        // Ignore clipboard fallback errors.
    } finally {
        if (textarea && textarea.parentNode) {
            textarea.parentNode.removeChild(textarea);
        }

        if (
            previousActiveElement &&
            typeof previousActiveElement.focus === 'function'
        ) {
            try {
                previousActiveElement.focus();
            } catch {
                // Ignore focus restoration errors.
            }
        }
    }
}

/**
 * Export the connection diagram as SVG with embedded styles
 * @param {HTMLElement} containerElement - Container element with diagram SVG
 * @param {Function} getDiagramCssFn - Function to get diagram CSS
 * @returns {string} Serialized SVG string
 */
function exportDiagramSvg(containerElement, getDiagramCssFn) {
    if (!containerElement) return '';
    const svgEl = containerElement.querySelector('svg');
    if (!svgEl) return '';

    const clone = svgEl.cloneNode(true);
    const labels = svgEl.querySelectorAll('.edge-label');
    const cloneLabels = clone.querySelectorAll('.edge-label');
    labels.forEach((lbl, idx) => {
        if (cloneLabels[idx]) {
            // innerHTML isn't consistently supported for SVG <text> elements in all browsers,
            // which could result in empty connection labels in the exported SVG. Using
            // textContent ensures the label text is preserved across environments.
            cloneLabels[idx].textContent = lbl.textContent;
        }
    });
    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    // Always export using the bright theme regardless of the current mode
    style.textContent = getDiagramCssFn ? getDiagramCssFn(false) : '';
    clone.insertBefore(style, clone.firstChild);
    const serializer = new XMLSerializer();
    return serializer.serializeToString(clone);
}

/**
 * Generate timestamped filename for diagram export
 * @param {string} projectName - Current project name
 * @returns {string} Base filename without extension
 */
function generateDiagramFilename(projectName) {
    const pad = n => String(n).padStart(2, '0');
    const now = new Date();
    const datePart = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}`;
    const namePart = (projectName || 'setup')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-_]/gi, '');
    return `${datePart}_${namePart}_diagram`;
}

/**
 * Download SVG as file
 * @param {string} svgContent - SVG content to download
 * @param {string} filename - Filename without extension
 */
function downloadSvg(svgContent, filename) {
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.svg`;
    a.click();
    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 60000);
}

/**
 * Convert SVG to JPEG and download
 * @param {string} svgContent - SVG content to convert
 * @param {string} filename - Filename without extension
 */
function downloadSvgAsJpeg(svgContent, filename) {
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}.jpg`;
            a.click();
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 60000);
        }, 'image/jpeg', 0.95);
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgContent);
}

/**
 * Handle diagram download with format selection (shift key for JPEG)
 * @param {Event} event - Click event
 * @param {HTMLElement} containerElement - Diagram container
 * @param {Function} getDiagramCssFn - Function to get diagram CSS
 * @param {string} projectName - Current project name
 */
function handleDiagramDownload(event, containerElement, getDiagramCssFn, projectName) {
    const source = exportDiagramSvg(containerElement, getDiagramCssFn);
    if (!source) return;

    copyTextToClipboardBestEffort(source);
    const baseName = generateDiagramFilename(projectName);

    if (event.shiftKey) {
        downloadSvgAsJpeg(source, baseName);
    } else {
        downloadSvg(source, baseName);
    }
}

/**
 * Bind download listener to diagram button
 * @param {HTMLElement} buttonElement - Download button element
 * @param {Function} clickHandler - Click handler function
 * @returns {boolean} Success status
 */
function bindDownloadDiagramListener(buttonElement, clickHandler) {
    if (!buttonElement) return false;

    // Remove existing to avoid double binding if called twice
    buttonElement.removeEventListener('click', clickHandler);
    buttonElement.addEventListener('click', clickHandler);
    return true;
}

export const DiagramExportManager = {
    copyTextToClipboardBestEffort,
    exportDiagramSvg,
    generateDiagramFilename,
    downloadSvg,
    downloadSvgAsJpeg,
    handleDiagramDownload,
    bindDownloadDiagramListener,
};
