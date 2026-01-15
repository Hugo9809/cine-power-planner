/**
 * Cine Power Planner V2 - Help Data
 * =================================
 * Content for the V2 Help Center.
 */

(function (global) {
    'use strict';

    const v2HelpData = [
        {
            id: 'v2-welcome',
            titleKey: 'helpV2WelcomeTitle',
            keywordsKey: 'helpV2WelcomeKeywords',
            iconKey: 'overview',
            contentKey: 'helpV2WelcomeContent'
        },
        {
            id: 'v2-projects',
            titleKey: 'helpV2ProjectsTitle',
            keywordsKey: 'helpV2ProjectsKeywords',
            iconKey: 'load',
            contentKey: 'helpV2ProjectsContent'
        },
        {
            id: 'v2-sidebar-search',
            titleKey: 'helpV2SidebarSearchTitle',
            keywordsKey: 'helpV2SidebarSearchKeywords',
            iconKey: 'distance',
            contentKey: 'helpV2SidebarSearchContent'
        },
        {
            id: 'v2-device-library',
            titleKey: 'helpV2DeviceLibraryTitle',
            keywordsKey: 'helpV2DeviceLibraryKeywords',
            iconKey: 'camera',
            contentKey: 'helpV2DeviceLibraryContent'
        },
        {
            id: 'v2-contacts',
            titleKey: 'helpV2ContactsTitle',
            keywordsKey: 'helpV2ContactsKeywords',
            iconKey: 'contacts',
            contentKey: 'helpV2ContactsContent'
        },
        {
            id: 'v2-settings',
            titleKey: 'helpV2SettingsTitle',
            keywordsKey: 'helpV2SettingsKeywords',
            iconKey: 'settingsData',
            contentKey: 'helpV2SettingsContent'
        },
        {
            id: 'v2-auto-gear',
            titleKey: 'helpV2AutoGearTitle',
            keywordsKey: 'helpV2AutoGearKeywords',
            iconKey: 'settingsAutoGear',
            contentKey: 'helpV2AutoGearContent'
        },
        {
            id: 'v2-print-export',
            titleKey: 'helpV2PrintExportTitle',
            keywordsKey: 'helpV2PrintExportKeywords',
            iconKey: 'fileExport',
            contentKey: 'helpV2PrintExportContent'
        }
    ];

    // Migrated Legacy Topics
    const migratedTopics = [
        {
            id: 'v2-quick-start',
            titleKey: 'helpV2QuickStartTitle',
            keywordsKey: 'helpV2QuickStartKeywords',
            iconKey: 'check',
            contentKey: 'helpV2QuickStartContent'
        },
        {
            id: 'v2-data-safety',
            titleKey: 'helpV2DataSafetyTitle',
            keywordsKey: 'helpV2DataSafetyKeywords',
            iconKey: 'settingsBackup',
            contentKey: 'helpV2DataSafetyContent'
        },
        {
            id: 'v2-shortcuts',
            titleKey: 'helpV2ShortcutsTitle',
            keywordsKey: 'helpV2ShortcutsKeywords',
            iconKey: 'resetView',
            contentKey: 'helpV2ShortcutsContent'
        },
        {
            id: 'v2-features',
            titleKey: 'helpV2FeaturesTitle',
            keywordsKey: 'helpV2FeaturesKeywords',
            iconKey: 'gearList',
            contentKey: 'helpV2FeaturesContent'
        }
    ];

    // Combine
    v2HelpData.push(...migratedTopics);

    // Expose
    global.cineV2HelpData = v2HelpData;

})(typeof window !== 'undefined' ? window : this);
