/**
 * UI Feedback Module
 * Provides a global loading overlay for long-running operations.
 */

const OVERLAY_ID = 'cineGlobalOperationOverlay';
const OVERLAY_TEXT_ID = 'cineGlobalOperationText';
const SPINNER_CLASS = 'cine-notification__spinner';

let overlayElement = null;
let textElement = null;

function ensureOverlay() {
    if (overlayElement && document.contains(overlayElement)) {
        return;
    }

    // Check if it exists in DOM but we lost reference
    overlayElement = document.getElementById(OVERLAY_ID);

    if (!overlayElement) {
        overlayElement = document.createElement('div');
        overlayElement.id = OVERLAY_ID;
        overlayElement.className = 'cine-notification cine-notification--loading cine-notification--overlay';
        // Style directly or rely on CSS. Let's add some inline styles to ensure visibility 
        // without waiting for CSS deployment if possible, but class-based is better.
        // We'll reuse the classes from loading-indicator-bootstrap if possible, or add new ones.
        // borrowing styles from the bootstrap loader for consistency
        Object.assign(overlayElement.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '10000',
            backgroundColor: 'var(--bg-surface, #222)',
            color: 'var(--text-primary, #fff)',
            padding: '1rem 2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            minWidth: '200px',
            justifyContent: 'center',
            pointerEvents: 'none', // Allow clicks to pass through? No, we probably want to block interaction.
            // But purely visual for now. If we want to block, we need a backdrop.
        });

        // Add backdrop logic if we want to block interaction? 
        // validDeviceData might be huge, so blocking is good. 
        // For now, let's just make it a nice toast-like overlay.
    }

    if (!textElement || !overlayElement.contains(textElement)) {
        // Clear content if rebuilding
        overlayElement.innerHTML = '';

        const spinner = document.createElement('span');
        spinner.className = SPINNER_CLASS;
        // Add simple CSS spinner if css class not available
        if (!document.querySelector('style#cine-spinner-style')) {
            const style = document.createElement('style');
            style.id = 'cine-spinner-style';
            style.textContent = `
            .@keyframes cine-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            .${SPINNER_CLASS} {
                display: inline-block;
                width: 1rem;
                height: 1rem;
                border: 2px solid currentColor;
                border-right-color: transparent;
                border-radius: 50%;
                animation: cine-spin 0.75s linear infinite;
            }
            .cine-notification--overlay {
                transition: opacity 0.2s ease-in-out;
            }
        `;
            document.head.appendChild(style);
        }
        overlayElement.appendChild(spinner);

        textElement = document.createElement('span');
        textElement.id = OVERLAY_TEXT_ID;
        overlayElement.appendChild(textElement);
    }

    if (!overlayElement.parentNode) {
        document.body.appendChild(overlayElement);
    }
}

function showLoading(message = 'Loading...') {
    if (typeof document === 'undefined') return;

    ensureOverlay();
    if (textElement) {
        textElement.textContent = message;
    }
    if (overlayElement) {
        overlayElement.style.opacity = '1';
        overlayElement.hidden = false;
    }
}

function hideLoading() {
    if (typeof document === 'undefined') return;

    if (overlayElement) {
        overlayElement.style.opacity = '0';
        // Remove after transition
        setTimeout(() => {
            if (overlayElement) overlayElement.hidden = true;
        }, 300);
    }
}

// Expose globally for classic scripts
if (typeof window !== 'undefined') {
    window.cineUiFeedback = {
        showLoading,
        hideLoading
    };
}
