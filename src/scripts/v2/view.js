/**
 * Cine Power Planner V2 - Base View Class
 * ========================================
 * Base class for V2 views to handle common lifecycle and registration.
 */

export class View {
    constructor(viewId) {
        this.viewId = viewId;
        this.container = null;
        this.isInitialized = false;
    }

    /**
     * Initialize the view
     * - Finds or creates container
     * - Registers with ViewManager
     */
    init() {
        if (this.isInitialized) return;

        console.log(`[View: ${this.viewId}] Initializing...`);

        this.container = document.getElementById(this.viewId);

        // Auto-create if missing (optional, but helpful)
        if (!this.container) {
            const app = document.querySelector('.v2-app') || document.body;
            this.container = document.createElement('div');
            this.container.id = this.viewId;
            this.container.className = 'app-view';
            app.appendChild(this.container);
        }

        // Register with ViewManager
        // Map view-rules -> rules, view-settings -> settings, etc.
        const shortName = this.viewId.replace(/^view-/, '');

        if (window.cineViewManager) {
            window.cineViewManager.registerView(shortName, {
                onEnter: (params) => this.render(params),
                onLeave: () => this.onLeave && this.onLeave()
            });
        }

        this.isInitialized = true;
    }

    /**
     * Render the view content
     * @param {object} params - Route parameters
     */
    render(params) {
        console.warn(`[View: ${this.viewId}] Render method not implemented`);
    }

    /**
     * Called when leaving the view
     */
    onLeave() {
        // Optional override
    }

    /**
     * Helper to escape HTML safely
     */
    escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
}
