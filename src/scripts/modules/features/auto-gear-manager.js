/**
 * Auto Gear Manager
 * Encapsulates logic for the Auto Gear feature, managing rules, scenarios, and presets.
 */

export const AutoGearManager = {
  // Dependencies resolved from window/global scope or LegacyInterop
  resolveDependencies() {
    return {
      // Core Logic
      normalizeAutoGearScenarioPrimary: (typeof window !== 'undefined' ? window.normalizeAutoGearScenarioPrimary : null),
      normalizeAutoGearScenarioMultiplier: (typeof window !== 'undefined' ? window.normalizeAutoGearScenarioMultiplier : null),
      removeAutoGearCondition: (typeof window !== 'undefined' ? window.removeAutoGearCondition : null),
      handleAutoGearConditionShortcut: (typeof window !== 'undefined' ? window.handleAutoGearConditionShortcut : null),
      handleAutoGearImportSelection: (typeof window !== 'undefined' ? window.handleAutoGearImportSelection : null),
      
      // State & UI
      setAutoGearSearchQuery: (typeof window !== 'undefined' ? window.setAutoGearSearchQuery : null),
      setAutoGearScenarioFilter: (typeof window !== 'undefined' ? window.setAutoGearScenarioFilter : null),
      clearAutoGearFilters: (typeof window !== 'undefined' ? window.clearAutoGearFilters : null),
      setAutoGearSummaryFocus: (typeof window !== 'undefined' ? window.setAutoGearSummaryFocus : null),
      handleAutoGearPresetSelection: (typeof window !== 'undefined' ? window.handleAutoGearPresetSelection : null),
      handleAutoGearSavePreset: (typeof window !== 'undefined' ? window.handleAutoGearSavePreset : null),
      handleAutoGearDeletePreset: (typeof window !== 'undefined' ? window.handleAutoGearDeletePreset : null),
      addAutoGearDraftItem: (typeof window !== 'undefined' ? window.addAutoGearDraftItem : null),
      saveAutoGearRuleFromEditor: (typeof window !== 'undefined' ? window.saveAutoGearRuleFromEditor : null),
      closeAutoGearEditor: (typeof window !== 'undefined' ? window.closeAutoGearEditor : null),
      renderAutoGearDraftLists: (typeof window !== 'undefined' ? window.renderAutoGearDraftLists : null),
      duplicateAutoGearRule: (typeof window !== 'undefined' ? window.duplicateAutoGearRule : null),
      
      // Editor & Backups
      openAutoGearEditor: (typeof window !== 'undefined' ? window.openAutoGearEditor : null),
      updateAutoGearBackupRestoreButtonState: (typeof window !== 'undefined' ? window.updateAutoGearBackupRestoreButtonState : null),
      handleAutoGearShowBackupsToggle: (typeof window !== 'undefined' ? window.handleAutoGearShowBackupsToggle : null),
      restoreAutoGearBackup: (typeof window !== 'undefined' ? window.restoreAutoGearBackup : null),
      
      // Updates & Sync
      syncAutoGearMonitorFieldVisibility: (typeof window !== 'undefined' ? window.syncAutoGearMonitorFieldVisibility : null),
      updateAutoGearMonitorCatalogOptions: (typeof window !== 'undefined' ? window.updateAutoGearMonitorCatalogOptions : null),
      clearAutoGearDraftItemEdit: (typeof window !== 'undefined' ? window.clearAutoGearDraftItemEdit : null),
      updateAutoGearCatalogOptions: (typeof window !== 'undefined' ? window.updateAutoGearCatalogOptions : null),
      beginAutoGearDraftItemEdit: (typeof window !== 'undefined' ? window.beginAutoGearDraftItemEdit : null),
    };
  },

  // Proxy methods to safely call dependencies
  
  normalizeScenarioPrimary(value) {
    const deps = this.resolveDependencies();
    if (typeof deps.normalizeAutoGearScenarioPrimary === 'function') {
      return deps.normalizeAutoGearScenarioPrimary(value);
    }
    return value;
  },

  normalizeScenarioMultiplier(value) {
    const deps = this.resolveDependencies();
    if (typeof deps.normalizeAutoGearScenarioMultiplier === 'function') {
      return deps.normalizeAutoGearScenarioMultiplier(value);
    }
    return value;
  },

  removeCondition(conditionId) {
    const deps = this.resolveDependencies();
    if (typeof deps.removeAutoGearCondition === 'function') {
      deps.removeAutoGearCondition(conditionId);
    }
  },

  handleConditionShortcut(event) {
    const deps = this.resolveDependencies();
    if (typeof deps.handleAutoGearConditionShortcut === 'function') {
      deps.handleAutoGearConditionShortcut(event);
    }
  },

  handleImportSelection(selection) {
    const deps = this.resolveDependencies();
    if (typeof deps.handleAutoGearImportSelection === 'function') {
      deps.handleAutoGearImportSelection(selection);
    }
  },

  setSearchQuery(query) {
    const deps = this.resolveDependencies();
    if (typeof deps.setAutoGearSearchQuery === 'function') {
      deps.setAutoGearSearchQuery(query);
    }
  },
  
  setScenarioFilter(filter) {
    const deps = this.resolveDependencies();
    if (typeof deps.setAutoGearScenarioFilter === 'function') {
      deps.setAutoGearScenarioFilter(filter);
    }
  },

  clearFilters() {
    const deps = this.resolveDependencies();
    if (typeof deps.clearAutoGearFilters === 'function') {
      deps.clearAutoGearFilters();
    }
  },
  
  setSummaryFocus(focus) {
    const deps = this.resolveDependencies();
    if (typeof deps.setAutoGearSummaryFocus === 'function') {
      deps.setAutoGearSummaryFocus(focus);
    }
  },

  handlePresetSelection(presetId) {
    const deps = this.resolveDependencies();
    if (typeof deps.handleAutoGearPresetSelection === 'function') {
      deps.handleAutoGearPresetSelection(presetId);
    }
  },

  handleSavePreset() {
    const deps = this.resolveDependencies();
    if (typeof deps.handleAutoGearSavePreset === 'function') {
      deps.handleAutoGearSavePreset();
    }
  },

  handleDeletePreset() {
    const deps = this.resolveDependencies();
    if (typeof deps.handleAutoGearDeletePreset === 'function') {
      deps.handleAutoGearDeletePreset();
    }
  },

  addDraftItem(item) {
    const deps = this.resolveDependencies();
    if (typeof deps.addAutoGearDraftItem === 'function') {
      deps.addAutoGearDraftItem(item);
    }
  },

  saveRuleFromEditor() {
    const deps = this.resolveDependencies();
    if (typeof deps.saveAutoGearRuleFromEditor === 'function') {
      deps.saveAutoGearRuleFromEditor();
    }
  },

  closeEditor() {
    const deps = this.resolveDependencies();
    if (typeof deps.closeAutoGearEditor === 'function') {
      deps.closeAutoGearEditor();
    }
  },

  renderDraftLists() {
    const deps = this.resolveDependencies();
    if (typeof deps.renderAutoGearDraftLists === 'function') {
      deps.renderAutoGearDraftLists();
    }
  },

  duplicateRule(ruleId) {
    const deps = this.resolveDependencies();
    if (typeof deps.duplicateAutoGearRule === 'function') {
      deps.duplicateAutoGearRule(ruleId);
    }
  },

  invokeOpenEditor(...args) {
    const deps = this.resolveDependencies();
    if (typeof deps.openAutoGearEditor === 'function') {
      return deps.openAutoGearEditor(...args);
    }
  },

  updateBackupRestoreButtonState() {
    const deps = this.resolveDependencies();
    if (typeof deps.updateAutoGearBackupRestoreButtonState === 'function') {
      deps.updateAutoGearBackupRestoreButtonState();
    }
  },

  handleShowBackupsToggle() {
    const deps = this.resolveDependencies();
    if (typeof deps.handleAutoGearShowBackupsToggle === 'function') {
      deps.handleAutoGearShowBackupsToggle();
    }
  },

  restoreBackup(backupId) {
    const deps = this.resolveDependencies();
    if (typeof deps.restoreAutoGearBackup === 'function') {
      deps.restoreAutoGearBackup(backupId);
    }
  },

  syncMonitorFieldVisibility() {
    const deps = this.resolveDependencies();
    if (typeof deps.syncAutoGearMonitorFieldVisibility === 'function') {
      deps.syncAutoGearMonitorFieldVisibility();
    }
  },

  updateMonitorCatalogOptions() {
    const deps = this.resolveDependencies();
    if (typeof deps.updateAutoGearMonitorCatalogOptions === 'function') {
      deps.updateAutoGearMonitorCatalogOptions();
    }
  },

  clearDraftItemEdit() {
    const deps = this.resolveDependencies();
    if (typeof deps.clearAutoGearDraftItemEdit === 'function') {
      deps.clearAutoGearDraftItemEdit();
    }
  },

  updateCatalogOptions() {
    const deps = this.resolveDependencies();
    if (typeof deps.updateAutoGearCatalogOptions === 'function') {
      deps.updateAutoGearCatalogOptions();
    }
  },

  beginDraftItemEdit(itemId) {
    const deps = this.resolveDependencies();
    if (typeof deps.beginAutoGearDraftItemEdit === 'function') {
      deps.beginAutoGearDraftItemEdit(itemId);
    }
  }
};
