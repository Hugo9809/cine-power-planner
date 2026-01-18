/**
 * Cine Power Planner V2 - Avatar Editor Modal
 * ============================================
 * Provides a modal for cropping and zooming profile/contact avatars.
 * Features: drag-to-pan, zoom slider, keyboard navigation, touch support.
 */

(function (global) {
    'use strict';

    // =====================
    // CONSTANTS
    // =====================
    const AVATAR_MAX_DIMENSION = 256;
    const AVATAR_VIEWPORT_SIZE = 200;
    const ZOOM_MIN = 50;
    const ZOOM_MAX = 250;
    const ZOOM_STEP = 5;

    // =====================
    // STATE
    // =====================
    let isOpen = false;
    let modalElement = null;
    let editState = null;
    let onSaveCallback = null;
    let onDeleteCallback = null;
    let onCancelCallback = null;

    // =====================
    // HELPER: Translation
    // =====================
    function _t(key) {
        // Fallback defaults for avatar editor specific keys
        const defaults = {
            'avatarEditorTitle': 'Edit Photo',
            'avatarEditorDescription': 'Drag to reposition, use slider to zoom',
            'avatarEditorZoom': 'Zoom',
            'buttonCancel': 'Cancel',
            'buttonSave': 'Save',
            'buttonRemovePhoto': 'Remove Photo',
            'avatarUploadHint': 'Drop or click to upload'
        };

        if (typeof window !== 'undefined' && window.texts) {
            const langSelect = document.getElementById('languageSelect');
            const lang = (langSelect && langSelect.value) ||
                (typeof window.currentLanguage === 'string' && window.currentLanguage) ||
                'en';
            const dict = window.texts[lang] || window.texts['en'];
            if (dict) {
                // Support nested keys with dot notation
                const value = key.split('.').reduce((o, i) => (o ? o[i] : null), dict);
                if (value && typeof value === 'string') {
                    return value;
                }
            }
        }
        return defaults[key] || key;
    }

    // =====================
    // ESCAPE HTML
    // =====================
    function escapeHtml(str) {
        if (typeof str !== 'string') return '';
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // =====================
    // CREATE MODAL HTML
    // =====================
    function createModalHtml(hasExistingAvatar) {
        return `
            <div class="avatar-editor-modal" role="dialog" aria-modal="true" aria-labelledby="avatar-editor-title">
                <div class="avatar-editor-backdrop"></div>
                <div class="avatar-editor-surface">
                    <header class="avatar-editor-header">
                        <div class="avatar-editor-header-main">
                            <h2 id="avatar-editor-title" class="avatar-editor-title">${escapeHtml(_t('avatarEditorTitle'))}</h2>
                            <p class="avatar-editor-description">${escapeHtml(_t('avatarEditorDescription'))}</p>
                        </div>
                        <button type="button" class="avatar-editor-close" aria-label="Close">
                            <span class="icon">close</span>
                        </button>
                    </header>
                    <div class="avatar-editor-body">
                        <div class="avatar-editor-viewport" id="avatarEditorViewport" tabindex="0">
                            <img class="avatar-editor-image" id="avatarEditorImage" alt="" draggable="false" />
                            <div class="avatar-editor-placeholder" id="avatarEditorPlaceholder">
                                <span class="icon">add_a_photo</span>
                                <span>${escapeHtml(_t('avatarUploadHint'))}</span>
                            </div>
                            <input type="file" id="avatarEditorFileInput" accept="image/png,image/jpeg,image/webp,image/gif" class="visually-hidden" tabindex="-1" />
                        </div>
                        <div class="avatar-editor-controls" id="avatarEditorControls">
                            <label class="avatar-editor-zoom-label">
                                <span class="icon">zoom_out</span>
                                <input type="range" id="avatarEditorZoom" min="${ZOOM_MIN}" max="${ZOOM_MAX}" step="${ZOOM_STEP}" value="100" aria-label="${escapeHtml(_t('avatarEditorZoom'))}" />
                                <span class="icon">zoom_in</span>
                            </label>
                        </div>
                    </div>
                    <footer class="avatar-editor-footer">
                        <button type="button" class="avatar-editor-btn avatar-editor-btn-danger" id="avatarEditorDelete" ${hasExistingAvatar ? '' : 'disabled'}>
                            ${escapeHtml(_t('buttonRemovePhoto'))}
                        </button>
                        <div class="avatar-editor-primary-actions">
                            <button type="button" class="avatar-editor-btn avatar-editor-btn-secondary" id="avatarEditorCancel">
                                ${escapeHtml(_t('buttonCancel'))}
                            </button>
                            <button type="button" class="avatar-editor-btn avatar-editor-btn-primary" id="avatarEditorSave">
                                ${escapeHtml(_t('buttonSave'))}
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        `;
    }

    // =====================
    // EDIT STATE MANAGEMENT
    // =====================
    function initializeEditState(dataUrl, image) {
        const viewportSize = AVATAR_VIEWPORT_SIZE;
        const baseScale = Math.max(
            viewportSize / image.naturalWidth,
            viewportSize / image.naturalHeight
        );

        editState = {
            active: true,
            dataUrl,
            image,
            mime: parseDataUrlMimeType(dataUrl),
            viewportSize,
            baseScale,
            zoom: 1,
            offsetX: (viewportSize - image.naturalWidth * baseScale) / 2,
            offsetY: (viewportSize - image.naturalHeight * baseScale) / 2,
            pointerId: null,
            pointerStartX: 0,
            pointerStartY: 0,
            offsetStartX: 0,
            offsetStartY: 0,
            displayWidth: 0,
            displayHeight: 0
        };

        updateEditMetrics();
    }

    function parseDataUrlMimeType(dataUrl) {
        if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) return 'image/png';
        const mimeEnd = dataUrl.indexOf(';');
        if (mimeEnd === -1) return 'image/png';
        return dataUrl.substring(5, mimeEnd) || 'image/png';
    }

    function clampOffsets() {
        if (!editState) return;
        const minX = Math.min(0, editState.viewportSize - editState.displayWidth);
        const minY = Math.min(0, editState.viewportSize - editState.displayHeight);
        editState.offsetX = Math.max(minX, Math.min(0, editState.offsetX));
        editState.offsetY = Math.max(minY, Math.min(0, editState.offsetY));
    }

    function updateEditMetrics() {
        if (!editState || !editState.image) return;

        const width = editState.image.naturalWidth || editState.image.width || 0;
        const height = editState.image.naturalHeight || editState.image.height || 0;
        const displayWidth = width * editState.baseScale * editState.zoom;
        const displayHeight = height * editState.baseScale * editState.zoom;

        editState.displayWidth = displayWidth;
        editState.displayHeight = displayHeight;
        clampOffsets();

        const imageEl = document.getElementById('avatarEditorImage');
        if (imageEl) {
            imageEl.style.width = `${displayWidth}px`;
            imageEl.style.height = `${displayHeight}px`;
            imageEl.style.transform = `translate(${editState.offsetX}px, ${editState.offsetY}px)`;
        }
    }

    // =====================
    // CROP & EXPORT
    // =====================
    function exportCroppedResult() {
        if (!editState || !editState.image) return '';

        const scale = editState.baseScale * editState.zoom;
        if (!scale) return '';

        const cropSize = editState.viewportSize / scale;
        const sourceX = Math.max(0, Math.min(
            editState.image.naturalWidth - cropSize,
            (-editState.offsetX) / scale
        ));
        const sourceY = Math.max(0, Math.min(
            editState.image.naturalHeight - cropSize,
            (-editState.offsetY) / scale
        ));

        const canvas = document.createElement('canvas');
        canvas.width = AVATAR_MAX_DIMENSION;
        canvas.height = AVATAR_MAX_DIMENSION;
        const ctx = canvas.getContext('2d');
        if (!ctx) return '';

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            editState.image,
            sourceX,
            sourceY,
            cropSize,
            cropSize,
            0,
            0,
            canvas.width,
            canvas.height
        );

        const mime = editState.mime && editState.mime.startsWith('image/')
            ? editState.mime
            : 'image/png';

        try {
            return canvas.toDataURL(mime);
        } catch (error) {
            try {
                return canvas.toDataURL('image/png');
            } catch (fallbackError) {
                return '';
            }
        }
    }

    // =====================
    // EVENT HANDLERS
    // =====================
    function handleZoomChange(event) {
        if (!editState || !editState.active) return;

        const value = Number(event?.target?.value) || 100;
        const normalized = Math.max(ZOOM_MIN, value) / 100;

        // Keep center point stable
        const prevWidth = editState.displayWidth || 1;
        const prevHeight = editState.displayHeight || 1;
        const centerX = -editState.offsetX + editState.viewportSize / 2;
        const centerY = -editState.offsetY + editState.viewportSize / 2;
        const ratioX = centerX / prevWidth;
        const ratioY = centerY / prevHeight;

        editState.zoom = normalized;
        updateEditMetrics();

        const targetCenterX = editState.displayWidth * ratioX;
        const targetCenterY = editState.displayHeight * ratioY;
        editState.offsetX = -(targetCenterX - editState.viewportSize / 2);
        editState.offsetY = -(targetCenterY - editState.viewportSize / 2);
        clampOffsets();
        updateEditMetrics();
    }

    function handlePointerDown(event) {
        if (!editState || !editState.active) return;
        if (editState.pointerId !== null) return;

        const viewport = document.getElementById('avatarEditorViewport');
        if (!viewport) return;

        editState.pointerId = event.pointerId;
        editState.pointerStartX = event.clientX;
        editState.pointerStartY = event.clientY;
        editState.offsetStartX = editState.offsetX;
        editState.offsetStartY = editState.offsetY;

        try {
            viewport.setPointerCapture(event.pointerId);
        } catch (error) {
            void error;
        }
        event.preventDefault();
    }

    function handlePointerMove(event) {
        if (!editState || !editState.active) return;
        if (editState.pointerId !== event.pointerId) return;

        const deltaX = event.clientX - editState.pointerStartX;
        const deltaY = event.clientY - editState.pointerStartY;
        editState.offsetX = editState.offsetStartX + deltaX;
        editState.offsetY = editState.offsetStartY + deltaY;
        clampOffsets();
        updateEditMetrics();
        event.preventDefault();
    }

    function handlePointerUp(event) {
        if (!editState || !editState.active) return;
        if (editState.pointerId !== event.pointerId) return;

        editState.pointerId = null;
        const viewport = document.getElementById('avatarEditorViewport');
        if (viewport) {
            try {
                viewport.releasePointerCapture(event.pointerId);
            } catch (error) {
                void error;
            }
        }
        event.preventDefault();
    }

    function handleKeyDown(event) {
        if (!editState || !editState.active) return;

        const step = event.shiftKey ? 10 : 2;
        let moved = false;

        switch (event.key) {
            case 'ArrowUp':
                editState.offsetY += step;
                moved = true;
                break;
            case 'ArrowDown':
                editState.offsetY -= step;
                moved = true;
                break;
            case 'ArrowLeft':
                editState.offsetX += step;
                moved = true;
                break;
            case 'ArrowRight':
                editState.offsetX -= step;
                moved = true;
                break;
            default:
                break;
        }

        if (moved) {
            clampOffsets();
            updateEditMetrics();
            event.preventDefault();
        }
    }

    function handleFileSelect(event) {
        const file = event?.target?.files?.[0];
        if (!file) return;

        loadImageFile(file);
        if (event.target) event.target.value = '';
    }

    function handleDrop(event) {
        event.preventDefault();
        event.stopPropagation();

        const viewport = document.getElementById('avatarEditorViewport');
        if (viewport) viewport.classList.remove('drag-over');

        const file = event.dataTransfer?.files?.[0];
        if (file) {
            loadImageFile(file);
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        const viewport = document.getElementById('avatarEditorViewport');
        if (viewport) viewport.classList.add('drag-over');
    }

    function handleDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        const viewport = document.getElementById('avatarEditorViewport');
        if (viewport) viewport.classList.remove('drag-over');
    }

    function loadImageFile(file) {
        // Use profile module if available for optimization
        if (global.CINE_CONTACTS_PROFILE_MODULE && typeof global.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile === 'function') {
            global.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile(
                file,
                (dataUrl) => loadImageFromDataUrl(dataUrl),
                (error) => console.warn('Failed to read avatar file:', error)
            );
        } else {
            // Fallback to FileReader
            const reader = new FileReader();
            reader.onload = (e) => {
                if (typeof e.target?.result === 'string') {
                    loadImageFromDataUrl(e.target.result);
                }
            };
            reader.onerror = () => console.warn('Failed to read file');
            reader.readAsDataURL(file);
        }
    }

    function loadImageFromDataUrl(dataUrl) {
        if (!dataUrl) return;

        const image = new Image();
        image.decoding = 'async';
        image.onload = () => {
            if (!image.naturalWidth || !image.naturalHeight) {
                console.warn('Invalid image dimensions');
                return;
            }

            initializeEditState(dataUrl, image);

            const imageEl = document.getElementById('avatarEditorImage');
            const placeholder = document.getElementById('avatarEditorPlaceholder');
            const controls = document.getElementById('avatarEditorControls');
            const viewport = document.getElementById('avatarEditorViewport');
            const zoomInput = document.getElementById('avatarEditorZoom');
            const deleteBtn = document.getElementById('avatarEditorDelete');

            if (imageEl) imageEl.src = dataUrl;
            if (placeholder) placeholder.classList.add('hidden');
            if (viewport) viewport.classList.add('has-image');
            if (controls) controls.classList.remove('hidden');
            if (zoomInput) zoomInput.value = '100';
            if (deleteBtn) deleteBtn.disabled = false;
        };
        image.onerror = () => console.warn('Failed to load image');
        image.src = dataUrl;
    }

    // =====================
    // PUBLIC API
    // =====================
    function open(options = {}) {
        if (isOpen) close();

        const {
            avatar = '',
            onSave = null,
            onDelete = null,
            onCancel = null
        } = options;

        onSaveCallback = onSave;
        onDeleteCallback = onDelete;
        onCancelCallback = onCancel;

        const hasAvatar = Boolean(avatar);
        const container = document.createElement('div');
        container.innerHTML = createModalHtml(hasAvatar);
        modalElement = container.firstElementChild;
        document.body.appendChild(modalElement);

        // Bind events
        const backdrop = modalElement.querySelector('.avatar-editor-backdrop');
        const closeBtn = modalElement.querySelector('.avatar-editor-close');
        const cancelBtn = document.getElementById('avatarEditorCancel');
        const saveBtn = document.getElementById('avatarEditorSave');
        const deleteBtn = document.getElementById('avatarEditorDelete');
        const viewport = document.getElementById('avatarEditorViewport');
        const zoomInput = document.getElementById('avatarEditorZoom');
        const fileInput = document.getElementById('avatarEditorFileInput');

        if (backdrop) backdrop.addEventListener('click', () => close());
        if (closeBtn) closeBtn.addEventListener('click', () => close());
        if (cancelBtn) cancelBtn.addEventListener('click', handleCancel);
        if (saveBtn) saveBtn.addEventListener('click', handleSave);
        if (deleteBtn) deleteBtn.addEventListener('click', handleDelete);

        if (viewport) {
            viewport.addEventListener('pointerdown', handlePointerDown);
            viewport.addEventListener('pointermove', handlePointerMove);
            viewport.addEventListener('pointerup', handlePointerUp);
            viewport.addEventListener('pointercancel', handlePointerUp);
            viewport.addEventListener('keydown', handleKeyDown);
            viewport.addEventListener('drop', handleDrop);
            viewport.addEventListener('dragover', handleDragOver);
            viewport.addEventListener('dragleave', handleDragLeave);
            viewport.addEventListener('click', (e) => {
                if (!editState?.active && fileInput) {
                    fileInput.click();
                }
            });
        }

        if (zoomInput) zoomInput.addEventListener('input', handleZoomChange);
        if (fileInput) fileInput.addEventListener('change', handleFileSelect);

        // Load existing avatar if provided
        if (avatar) {
            loadImageFromDataUrl(avatar);
        }

        // Show modal with animation
        requestAnimationFrame(() => {
            if (modalElement) modalElement.classList.add('open');
        });

        isOpen = true;

        // Focus viewport for keyboard navigation
        setTimeout(() => {
            if (viewport) viewport.focus();
        }, 100);
    }

    function close() {
        if (!isOpen || !modalElement) return;

        modalElement.classList.remove('open');
        setTimeout(() => {
            if (modalElement && modalElement.parentNode) {
                modalElement.parentNode.removeChild(modalElement);
            }
            modalElement = null;
            editState = null;
            isOpen = false;
            onSaveCallback = null;
            onDeleteCallback = null;
            onCancelCallback = null;
        }, 200);
    }

    function handleSave() {
        let result = '';
        if (editState && editState.active) {
            result = exportCroppedResult();
        }
        if (typeof onSaveCallback === 'function') {
            onSaveCallback(result);
        }
        close();
    }

    function handleDelete() {
        if (typeof onDeleteCallback === 'function') {
            onDeleteCallback();
        }
        close();
    }

    function handleCancel() {
        if (typeof onCancelCallback === 'function') {
            onCancelCallback();
        }
        close();
    }

    // =====================
    // EXPORT
    // =====================
    const AvatarEditorModal = {
        open,
        close,
        isOpen: () => isOpen
    };

    global.cineAvatarEditorModal = AvatarEditorModal;

})(typeof window !== 'undefined' ? window : this);
