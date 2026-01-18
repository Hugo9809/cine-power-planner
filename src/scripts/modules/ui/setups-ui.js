/**
 * Setups UI Helpers
 * 
 * UI utilities specific to the Setups module.
 * Wraps generic UI helpers with setup-specific fallbacks.
 */

import { setButtonLabelWithIcon } from '../ui-helpers.js';

export function setSetupButtonLabel(button, label, glyph, iconFactory) {
    if (!button) return;
    return setButtonLabelWithIcon(button, label, glyph, iconFactory);
}
