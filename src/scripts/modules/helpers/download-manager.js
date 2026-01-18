/**
 * Download Manager Helper
 * =======================
 * Centralizes file download logic to ensure consistent behavior across browsers
 * and prevent common "corruption" issues caused by premature revocation of Object URLs
 * or race conditions during the download trigger.
 * 
 * Capabilities:
 * - Supports modern File System Access API (showSaveFilePicker) where available.
 * - robust Blob/Anchor fallback with proper cleanup timing.
 * - Legacy IE11/Edge support via msSaveOrOpenBlob (optional).
 */

/**
 * Trigger a file download.
 * @param {string|Blob} content - The file content (string or Blob).
 * @param {string} fileName - The default file name.
 * @param {object} options - Configuration options.
 * @param {string} [options.mimeType='text/plain'] - MIME type of the content.
 * @param {string} [options.charset='utf-8'] - Charset (if content is string).
 * @returns {Promise<boolean>} - Resolves true if download triggered, false otherwise.
 */
export async function downloadFile(content, fileName, options = {}) {
    const config = {
        mimeType: 'text/plain',
        charset: 'utf-8',
        ...options
    };

    // 1. Normalize Content to Blob
    let blob;
    if (content instanceof Blob) {
        blob = content;
    } else {
        const type = `${config.mimeType};charset=${config.charset}`;
        try {
            blob = new Blob([content], { type });
        } catch (e) {
            console.warn('[DownloadManager] Blob creation failed', e);
            return false;
        }
    }

    // 2. Try File System Access API (Modern Secure Contexts)
    // Only works if triggered by user gesture.
    if (typeof window.showSaveFilePicker === 'function') {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: fileName,
                types: [{
                    description: 'File',
                    accept: { [config.mimeType]: ['.' + fileName.split('.').pop()] },
                }],
            });
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            return true;
        } catch (err) {
            // User cancelled or not supported (e.g. cross-origin iframe)
            if (err.name !== 'AbortError') {
                console.warn('[DownloadManager] File System Access API failed, falling back', err);
            } else {
                return false; // User explicitly cancelled
            }
        }
    }

    // 3. Fallback: msSaveOrOpenBlob (IE/Edge Legacy)
    if (typeof navigator !== 'undefined' && typeof navigator.msSaveOrOpenBlob === 'function') {
        return navigator.msSaveOrOpenBlob(blob, fileName);
    }

    // 4. Fallback: Classic Anchor Tag
    // We delay the revocation to ensure the browser has time to capture the download.
    try {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();

        // Cleanup with delay
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 2000); // 2s delay to be safe

        return true;
    } catch (e) {
        console.warn('[DownloadManager] Anchor download failed', e);
        return false;
    }
}
