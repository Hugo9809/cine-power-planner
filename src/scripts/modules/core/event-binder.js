/**
 * EventBinder Module
 * 
 * Centralizes the binding of global event listeners for the Cine Power Planner application.
 * decoupling UI event setup from the core session management logic.
 */

export const EventBinder = {
    /**
     * Binds global event listeners to the provided callbacks.
     * 
     * @param {Object} context - The context containing callback functions and DOM references.
     * @param {Object} context.callbacks - Object containing event handler functions.
     * @param {Function} context.callbacks.onSaveSession - Callback for session saving (debounced or immediate).
     * @param {Function} context.callbacks.onSaveGearList - Callback for gear list changes.
     * @param {Function} context.callbacks.onCheckSetupChanged - Callback to check if setup changed.
     * @param {Function} context.callbacks.onAutoSave - Callback for auto-saving.
     * @param {Function} context.callbacks.onExit - Callback for app exit/lifecycle events.
     * @param {Object} context.elements - Object containing DOM elements (optional, can fallback to global queries).
     */
    bindGlobalEvents({ callbacks, elements }) {
        if (!callbacks) {
            console.warn('EventBinder: no callbacks provided');
            return;
        }

        this._bindSetupNameInput(callbacks.onSaveSession, elements?.setupNameInput);
        this._bindLifecycleEvents(callbacks.onExit);

        // We expect the consumer to pass arrays of elements or we query them here?
        // To keep it simple and decoupled, we reused the helper logic if passed, 
        // or we accept arrays of elements to bind to.

        // For now, let's assume the consumer passes the arrays of elements to bind generic change listeners to.
        // However, app-session.js iterates over multiple lists (power, motor, controller).
        // Let's expose a helper methods to bind these common change patterns.
    },

    /**
     * Binds change listeners to a collection of select/input elements.
     * 
     * @param {Array<HTMLElement>|NodeList} elements - Elements to observe.
     * @param {Object} handlers - handlers for 'change' event.
     * @param {Function} [handlers.onChange] - Primary change handler.
     */
    bindChangeListeners(elements, handler) {
        if (!elements || !handler) return;
        const list = Array.isArray(elements) ? elements : Array.from(elements);
        list.forEach(el => {
            if (el && typeof el.addEventListener === 'function') {
                el.addEventListener('change', handler);
            }
        });
    },

    /**
     * Binds input listener for Setup Name with debounce logic.
     */
    _bindSetupNameInput(onSaveSession, inputElement) {
        const setupNameInput = inputElement || (typeof document !== 'undefined' ? document.getElementById('setupName') : null);
        const setupSelect = typeof document !== 'undefined' ? document.getElementById('setupSelect') : null;

        if (!setupNameInput) return;

        let setupNameInputDebounceTimer = null;
        const handleSetupNameInput = () => {
            if (setupNameInputDebounceTimer) {
                clearTimeout(setupNameInputDebounceTimer);
            }
            setupNameInputDebounceTimer = setTimeout(() => {
                const typedName = setupNameInput.value ? setupNameInput.value.trim() : '';
                const selectedName = setupSelect ? setupSelect.value : '';
                const renameInProgress = Boolean(selectedName && typedName && typedName !== selectedName);

                if (typeof onSaveSession === 'function') {
                    onSaveSession({ skipGearList: renameInProgress });
                }
            }, 500);
        };

        setupNameInput.addEventListener("input", handleSetupNameInput);
    },

    /**
     * Binds lifecycle events (beforeunload, pagehide, visibilitychange).
     */
    _bindLifecycleEvents(onExitHandler) {
        if (typeof onExitHandler !== 'function') return;

        if (typeof document !== 'undefined') {
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'hidden') {
                    onExitHandler({ reason: 'before-visibility-hidden' });
                }
            });
        }

        if (typeof window !== 'undefined') {
            ['pagehide', 'beforeunload', 'freeze'].forEach((eventName) => {
                window.addEventListener(eventName, onExitHandler);
            });
        }
    }
};

export default EventBinder;
