/**
 * Cine Power Planner V2 - Help Service
 * ====================================
 * Single source of truth for help content, merging V2 guides and V1 reference topics.
 */

(function (global) {
    'use strict';

    // V2 Content (Loaded from help-data.js)
    const V2_TOPICS = global.cineV2HelpData || [];

    function getLocalizationHelper() {
        let localization = global.cineCoreLocalization ||
            global.cineCoreLocalizationBridge ||
            (global.cineModuleBase && global.cineModuleBase.resolveLocalization && global.cineModuleBase.resolveLocalization());

        if (localization && typeof localization.getString === 'function') {
            return localization;
        }

        if (typeof global.getText === 'function') {
            return {
                getString: (key) => global.getText(key)
            };
        }

        if (global.texts) {
            const resolveKey = (obj, path) => {
                return path.split('.').reduce((prev, curr) => prev && prev[curr], obj);
            };

            const lang = global.currentLanguage || global.currentLang || 'en';
            const texts = global.texts[lang] || global.texts.en;

            return {
                getString: (key) => resolveKey(texts, key) || ''
            };
        }

        return null;
    }

    function resolveV2Topic(topic, localization) {
        if (!topic) return topic;
        if (!localization || typeof localization.getString !== 'function') {
            return topic;
        }

        const resolvedTitle = topic.titleKey ? localization.getString(topic.titleKey) : '';
        const resolvedContent = topic.contentKey ? localization.getString(topic.contentKey) : '';
        const resolvedKeywords = topic.keywordsKey ? localization.getString(topic.keywordsKey) : '';

        return {
            ...topic,
            title: resolvedTitle || topic.title,
            content: resolvedContent || topic.content,
            keywords: resolvedKeywords || topic.keywords
        };
    }

    function getLocalizedV2Topics() {
        const localization = getLocalizationHelper();
        return V2_TOPICS.map(topic => resolveV2Topic(topic, localization));
    }

    // Helper to categorize topics
    function getCategorizedV2Topics() {
        const essentials = ['v2-quick-start', 'v2-shortcuts', 'v2-data-safety', 'v2-features'];
        const localizedTopics = getLocalizedV2Topics();

        return {
            essentials: localizedTopics.filter(t => essentials.includes(t.id)),
            guides: localizedTopics.filter(t => !essentials.includes(t.id))
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
        let localization = getLocalizationHelper();
        if (!localization || typeof localization.getString !== 'function') {
            console.warn('[HelpService] Localization module not found. V1 topics unavailable.');
            return [];
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

        const iconMap = {
            projectManagement: '📂',
            saveShareBackup: '💾',
            deviceConfiguration: '⚙️',
            powerCalculation: '⚡',
            connectionDiagram: '🔌',
            gearList: '📋',
            contacts: '👥',
            ownGear: '📷',
            settings: '🛠️',
            offlineUse: '📡',
            troubleshooting: '❓',
            shortcuts: '⌨️',
            pinkMode: '🌸'
        };

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
                keywords: `legacy reference v1 ${key}`,
                icon: iconMap[key] || '📄', // Default icon if key missing
                content: parseMarkdown(content)
            };
        }).filter(item => item !== null);
    }

    /**
     * Get all help sections, organized or flat
     */
    function getAllSections() {
        const guideTopics = getLocalizedV2Topics();
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
                title: 'Essentials',
                items: v2.essentials
            },
            guide: {
                title: 'Guides',
                items: v2.guides
            },
            reference: {
                title: 'Topic Reference',
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
