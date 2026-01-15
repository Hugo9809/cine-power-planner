/**
 * Cine Power Planner V2 - Help Service
 * ====================================
 * Single source of truth for help content, merging V2 guides and V1 reference topics.
 */

(function (global) {
    'use strict';

    // V2 "Getting Started" Content (Hardcoded for now, could be moved to localization later)
    // V2 Content (Loaded from help-data.js)
    const V2_TOPICS = global.cineV2HelpData || [];
    const DEFAULT_HELP_ICON = 'overview';
    // Map help topics to local Uicon glyph keys for consistent iconography.
    const HELP_ICON_KEYS = {
        projectManagement: 'load',
        saveShareBackup: 'settingsBackup',
        deviceConfiguration: 'camera',
        powerCalculation: 'batteryBolt',
        connectionDiagram: 'plug',
        gearList: 'gearList',
        contacts: 'contacts',
        ownGear: 'camera',
        settings: 'settingsGeneral',
        offlineUse: 'wifi',
        troubleshooting: 'feedback',
        shortcuts: 'resetView',
        pinkMode: 'sun'
    };

    function getTranslations() {
        if (!global.texts) return null;
        const lang =
            global.currentLanguage ||
            global.currentLang ||
            global.document?.documentElement?.lang ||
            'en';
        return global.texts[lang] || global.texts.en || null;
    }

    function translate(key) {
        const translations = getTranslations();
        if (!translations) return key;
        return translations[key] || key;
    }

    function resolveHelpIcon(iconKey) {
        const iconSet = global.ICON_GLYPHS;
        if (iconSet && iconKey && iconSet[iconKey]) {
            return iconSet[iconKey];
        }
        if (iconSet && iconSet[DEFAULT_HELP_ICON]) {
            return iconSet[DEFAULT_HELP_ICON];
        }
        return null;
    }

    function normalizeV2Topic(topic) {
        const title = topic.titleKey ? translate(topic.titleKey) : topic.title;
        const keywords = topic.keywordsKey ? translate(topic.keywordsKey) : topic.keywords;
        const content = topic.contentKey ? translate(topic.contentKey) : topic.content;
        return {
            ...topic,
            title,
            keywords,
            content,
            icon: resolveHelpIcon(topic.iconKey || topic.icon || DEFAULT_HELP_ICON)
        };
    }

    // Helper to categorize topics
    function getCategorizedV2Topics() {
        const essentials = ['v2-quick-start', 'v2-shortcuts', 'v2-data-safety', 'v2-features'];

        const v2Topics = V2_TOPICS.map(normalizeV2Topic);
        return {
            essentials: v2Topics.filter(t => essentials.includes(t.id)),
            guides: v2Topics.filter(t => !essentials.includes(t.id))
        };
    }

    /**
     * Parse simple Markdown-like syntax from translation strings into HTML
     */
    function parseMarkdown(text) {
        if (!text) return '';
        // Basic inline formatting
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>');

        // Split by double newlines to handle paragraphs and lists
        return html.split(/\n\n+/).map(block => {
            if (block.trim().startsWith('- ')) {
                const items = block.trim().split(/\n/).map(line => {
                    return `<li>${line.replace(/^- /, '')}</li>`;
                }).join('');
                return `<ul>${items}</ul>`;
            }
            return `<p>${block}</p>`;
        }).join('');
    }

    /**
     * Get V1 help topics from localization system
     */
    function getV1Topics() {
        // Try to access the localization helper globally
        // It might be 'cineCoreLocalization' or a similar exposure
        let localization = global.cineCoreLocalization ||
            global.cineCoreLocalizationBridge || // Agent: Added bridge check
            (global.cineModuleBase && global.cineModuleBase.resolveLocalization && global.cineModuleBase.resolveLocalization());

        if (!localization || typeof localization.getString !== 'function') {
            // Fallback 1: global.getText
            if (typeof global.getText === 'function') {
                localization = {
                    getString: (key) => global.getText(key)
                };
            }
            // Fallback 2: global.texts (Direct access)
            else if (global.texts) {
                // Helper to resolve dot notation
                const resolveKey = (obj, path) => {
                    return path.split('.').reduce((prev, curr) => prev && prev[curr], obj);
                };

                const lang = global.currentLanguage || global.currentLang || 'en';
                const texts = global.texts[lang] || global.texts.en;

                localization = {
                    getString: (key) => resolveKey(texts, key) || ''
                };
            }
            else {
                console.warn('[HelpService] Localization module not found. V1 topics unavailable.');
                return [];
            }
        }

        const topicOrder = [
            'projectManagement',
            'saveShareBackup',
            'deviceConfiguration',
            'powerCalculation',
            'connectionDiagram',
            'gearList',
            'contacts',
            'ownGear',
            'settings',
            'offlineUse',
            'troubleshooting',
            'shortcuts',
            'pinkMode'
        ];

        const lang = global.currentLanguage || global.currentLang || global.document?.documentElement?.lang || 'en';
        const localizedTexts = global.texts && (global.texts[lang] || global.texts.en);
        const localizedHelpTopics = localizedTexts && localizedTexts.helpTopics;
        const availableKeys = localizedHelpTopics && typeof localizedHelpTopics === 'object'
            ? Object.keys(localizedHelpTopics)
            : [];
        const orderedKeys = availableKeys.length
            ? [
                ...topicOrder.filter(key => availableKeys.includes(key)),
                ...availableKeys.filter(key => !topicOrder.includes(key))
            ]
            : topicOrder;

        return orderedKeys.map(key => {
            const localizedTopic = localizedHelpTopics && localizedHelpTopics[key];
            const title = (localizedTopic && localizedTopic.title) || localization.getString(`helpTopics.${key}.title`);
            const content = (localizedTopic && localizedTopic.content) || localization.getString(`helpTopics.${key}.content`);

            if (!title) return null;

            return {
                id: `v1-${key}`,
                category: 'reference',
                title: title,
                // Keywords could be enriched here if we had a mapping, for now title + content is search source
                keywords: title,
                icon: resolveHelpIcon(HELP_ICON_KEYS[key] || DEFAULT_HELP_ICON),
                content: parseMarkdown(content)
            };
        }).filter(item => item !== null);
    }

    /**
     * Get all help sections, organized or flat
     */
    function getAllSections() {
        const guideTopics = V2_TOPICS.map(normalizeV2Topic);
        const refTopics = getV1Topics();

        return [
            ...guideTopics,
            ...refTopics
        ];
    }

    /**
     * Get sections grouped by category for sidebar
     */
    function getGroupedSections() {
        const v2 = getCategorizedV2Topics();

        return {
            essentials: {
                title: translate('helpGroupEssentials'),
                items: v2.essentials
            },
            guide: {
                title: translate('helpGroupGuides'),
                items: v2.guides
            },
            reference: {
                title: translate('helpGroupReference'),
                items: getV1Topics()
            }
        };
    }

    // Public API
    global.cineHelpService = {
        getAllSections,
        getGroupedSections
    };

})(typeof window !== 'undefined' ? window : this);
