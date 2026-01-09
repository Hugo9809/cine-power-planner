(function (global) {
    'use strict';

    const V2_TEXTS = {
        en: {
            // Contacts View
            contactsViewTitle: 'Contacts',
            contactsViewSubtitle: 'Manage your crew and equipment suppliers.',
            buttonAddContact: 'Add Contact',
            contactsEmptyTitle: 'No contacts yet',
            contactsEmptyText: 'Add people and companies to your address book for quick access in projects.',
            buttonAddFirstContact: 'Add your first contact',
            linkWebsite: 'Website',
            contactUnnamed: 'Unnamed Contact',
            contactNoRole: 'No Role',
            buttonEdit: 'Edit',
            buttonDelete: 'Delete',
            modalTitleDeleteContact: 'Delete Contact',
            confirmDeleteContact: 'Are you sure you want to delete this contact? This action cannot be undone.',
            buttonDeleteRed: 'Delete',
            modalTitleNewContact: 'New Contact',
            modalTitleEditContact: 'Edit Contact',
            buttonUploadPhoto: 'Upload Photo',
            buttonRemovePhoto: 'Remove',
            labelName: 'Name',
            placeholderFullName: 'Full Name',
            labelRole: 'Role / Title',
            placeholderRole: 'e.g. Gaffer, Rental House',
            labelPhone: 'Phone',
            placeholderPhone: '+1 234 567 890',
            labelEmail: 'Email',
            placeholderEmail: 'email@example.com',
            labelWebsite: 'Website',
            placeholderWebsite: 'https://example.com',
            labelNotes: 'Notes',
            placeholderNotes: 'Additional details...',
            buttonCancel: 'Cancel',
            buttonSaveContact: 'Save Contact',
            alertEnterName: 'Please enter a name.',

            // Auto Gear Rules View
            rulesViewTitle: 'Auto Gear Rules',
            rulesViewSubtitle: 'Configure automatic gear suggestions based on shooting scenarios.',
            buttonAddRule: 'Add Rule',
            rulesEmptyTitle: 'No rules defined',
            rulesEmptyText: 'Create rules to automatically add accessories based on your camera and scenario.',
            ruleBadgeAlways: 'Always Active',
            ruleTagConditions: 'Conditions',
            ruleTagItemsAdded: 'Items Added',
            confirmDeleteRule: 'Are you sure you want to delete this rule?',
            buttonExportRules: 'Export Rules',
            buttonImportRules: 'Import Rules',
            buttonResetRules: 'Reset Default Rules',
            confirmResetRules: 'Reset all rules to defaults? This will overwrite your changes.',
            headingMonitorDefaults: 'Default Monitors',
            labelFocusMonitor: 'Focus Monitor',
            labelHandheldMonitor: 'Handheld Monitor',
            labelComboMonitor: 'Combo Monitor',
            labelDirectorMonitor: 'Director Monitor',
            optionNone: 'None',
            modalTitleCreateRule: 'Create Rule',
            modalTitleEditRule: 'Edit Rule',
            tabGeneral: 'General',
            tabContext: 'Context',
            tabCamera: 'Camera',
            tabMonitoring: 'Monitoring',
            tabSupport: 'Support',
            tabCrew: 'Crew',
            tabActions: 'Actions',
            labelRuleName: 'Rule Name',
            placeholderRuleName: 'e.g. Add Rain Cover when Outdoor',
            labelRuleEnabled: 'Enable Rule',
            labelRuleAlways: 'Always Apply',
            helpRuleAlways: 'If checked, this rule applies regardless of other conditions.',
            sectionScenarios: 'Scenarios',
            labelScenarioMode: 'Match Mode',
            optionScenarioAll: 'Match ALL selected',
            optionScenarioAny: 'Match ANY selected',
            optionScenarioMultiplier: 'Multiplier',
            labelScenarioFactor: 'Multiplier Factor',
            sectionShootingDays: 'Shooting Days',
            labelShootingDaysMode: 'Applies when days are:',
            optionDaysMinimum: 'Minimum',
            optionDaysMaximum: 'Maximum',
            optionDaysEvery: 'Every X Days',
            labelShootingDaysValue: 'Days Count',
            placeholderOptional: 'Optional',
            helpShootingDays: 'Leave empty to ignore shooting duration.',
            sectionCameraModels: 'Camera Models',
            sectionMatteboxes: 'Matteboxes',
            sectionViewfinders: 'Viewfinders',
            sectionMonitors: 'Monitors',
            sectionWireless: 'Wireless Video',
            sectionTripodHeads: 'Tripod Heads',
            sectionBowlSize: 'Bowl Size',
            sectionLegTypes: 'Leg Types',
            sectionSpreaders: 'Spreaders',
            sectionCrewPresent: 'Crew Present',
            sectionCrewAbsent: 'Crew Absent',
            sectionItemsToAdd: 'Add Items',
            sectionItemsToRemove: 'Remove Items',
            buttonAddItem: 'Add Item',
            labelItemName: 'Item Name',
            placeholderItemSearch: 'Search or enter name',
            labelCategory: 'Category',
            labelQty: 'Qty',
            buttonAdd: 'Add',
            textNoOptions: 'No options available.',
            textNoItems: 'No items configured.',
            buttonSaveRule: 'Save Rule',
            buttonCancel: 'Cancel',

            // Owned Gear
            ownGearViewTitle: 'Owned Gear',
            ownGearViewSubtitle: 'Manage your personal equipment inventory.',
            buttonAddGearItem: 'Add Item',
            ownGearEmptyTitle: 'Your inventory is empty',
            ownGearEmptyText: 'Add gear that you own to track it in projects.',
            buttonAddFirstGearItem: 'Add first item',
            labelQtyPrefix: 'Qty: ',
            labelSourcePrefix: 'Source: ',
            modalTitleNewGearItem: 'New Gear Item',
            modalTitleEditGearItem: 'Edit Gear Item',
            placeholderGearName: 'Item Name',
            labelQuantity: 'Quantity',
            placeholderGearQty: '1',
            placeholderGearNotes: 'Serial number, condition, etc.',
            buttonSaveGearItem: 'Save Item',
            alertSaveItemFailed: 'Failed to save item.',
            confirmDeleteGearItem: 'Delete this item?',
            alertInvalidItemData: 'Invalid item data.'
        }
    };

    // Safely merge V2 texts into potentially frozen target objects
    function safeMergeTexts(target, source) {
        if (!target || !source) return target;

        const isFrozen = Object.isFrozen && Object.isFrozen(target);

        Object.keys(source).forEach(key => {
            if (isFrozen) {
                // If frozen, we can't modify it - attempt via defineProperty as fallback
                try {
                    Object.defineProperty(target, key, {
                        configurable: true,
                        enumerable: true,
                        writable: true,
                        value: source[key]
                    });
                } catch (e) {
                    // Property is truly immutable - skip silently
                }
            } else {
                try {
                    target[key] = source[key];
                } catch (e) {
                    // Assignment failed - skip silently
                }
            }
        });

        return target;
    }

    // Inject into window.texts
    function injectTexts() {
        if (!global.texts) {
            global.texts = {};
        }
        if (!global.texts.en) {
            global.texts.en = {};
        }

        // Merge English texts safely
        safeMergeTexts(global.texts.en, V2_TEXTS.en);

        // Simple fallback for other languages to English for now
        ['de', 'es', 'fr', 'it'].forEach(lang => {
            if (!global.texts[lang]) {
                global.texts[lang] = {};
            }
            safeMergeTexts(global.texts[lang], V2_TEXTS.en);
        });

        console.log('[Translations] V2 texts injected');
    }

    injectTexts();

})(typeof window !== 'undefined' ? window : this);
